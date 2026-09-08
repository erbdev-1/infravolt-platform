import { describe, expect, it } from "vitest";

import { referenceSystemsForMarket, type ReferenceSystem } from "./index";

const RUSSIA_WORD_PATTERN = /\brussia(?:n)?\b/i;
const IRAN_WORD_PATTERN = /\biran(?:ian)?\b/i;
// Turkish İ isn't ASCII, so \b can't safely bound "İran"/"İRAN" — real place
// names like "VİRANŞEHİR" embed that exact substring. Use Unicode letter/
// number lookaround instead, mirroring the production pattern in index.ts.
const IRAN_TURKISH_WORD_PATTERN = /(?<![\p{L}\p{N}])(?:İran|İRAN)(?![\p{L}\p{N}])/u;
const KURGAN_BALT_PATTERN = /kurgan[\s‐-―-]*balt|курган[\s‐-―-]*балт/iu;

function flattenPublicText(systems: readonly ReferenceSystem[]): readonly string[] {
  const texts: string[] = [];
  for (const system of systems) {
    for (const tab of system.tabs) {
      for (const row of tab.rows ?? []) {
        texts.push(...row.cells);
      }
      for (const company of tab.companies ?? []) {
        texts.push(company.name);
        if (company.logoIdentity) texts.push(company.logoIdentity);
      }
    }
  }
  return texts;
}

function findRowsContaining(systems: readonly ReferenceSystem[], needle: string) {
  const hits: { systemKey: string; tabId: string; cells: readonly string[] }[] = [];
  for (const system of systems) {
    for (const tab of system.tabs) {
      for (const row of tab.rows ?? []) {
        if (row.cells.some((cell) => cell.includes(needle))) {
          hits.push({ systemKey: system.key, tabId: tab.id, cells: row.cells });
        }
      }
    }
  }
  return hits;
}

describe.each(["uk", "ua"] as const)("referenceSystemsForMarket(%s) — public exclusion policy", (market) => {
  const systems = referenceSystemsForMarket(market);
  const allText = flattenPublicText(systems);
  const joined = allText.join(" • ");

  it("contains no Russia references (word boundary, RUSYA, Cyrillic root, known aliases)", () => {
    expect(RUSSIA_WORD_PATTERN.test(joined)).toBe(false);
    expect(/\brusya\b/i.test(joined)).toBe(false);
    expect(/\brossiya\b|\brossia\b/i.test(joined)).toBe(false);
    expect(/росси/iu.test(joined)).toBe(false);
    expect(joined).not.toContain("Russian Federation");
  });

  it("contains no Iran references (word boundary + Turkish İRAN form)", () => {
    expect(IRAN_WORD_PATTERN.test(joined)).toBe(false);
    expect(IRAN_TURKISH_WORD_PATTERN.test(joined)).toBe(false);
  });

  it("does not exclude the VİRANŞEHİR (Şanlıurfa) project merely for embedding the substring İRAN", () => {
    // Regression guard for the word-boundary bug found during this task: a plain
    // substring/backslash-b check on "İran"/"İRAN" would wrongly exclude this
    // genuine Turkish domestic reference, since JS's \b is ASCII-only and can't
    // bound the Turkish dotted İ. UK market transliterates the project text
    // (VİRANŞEHİR -> ASCII), so check the always-source-verbatim UA market.
    const uaJoined = flattenPublicText(referenceSystemsForMarket("ua")).join(" • ");
    expect(uaJoined).toContain("VİRANŞEHİR");
  });

  it("contains no Kurgan-Balt company/reference mark, Latin or Cyrillic", () => {
    expect(KURGAN_BALT_PATTERN.test(joined)).toBe(false);
    expect(joined).not.toContain("КУРГАН-БАЛТ");
    expect(joined).not.toContain("Kurgan-Balt");
  });

  it("contains no TRAKYA CAM RUSYA (regression target, already-known exclusion)", () => {
    expect(joined).not.toContain("TRAKYA CAM RUSYA");
  });

  it("contains none of the known Iran regression-target rows", () => {
    for (const needle of [
      "GASTECH INTERNATIONAL FZCO. PJ/9113",
      "SOUTH PARS GAS FIELD DEVELOPMENT PHASE 14",
      "ALMAS TABRIZ",
      "FADAK 1&2",
      "FOLAD SHAR",
      "GOGHNOS",
    ]) {
      expect(joined).not.toContain(needle);
    }
  });

  it("contains none of the known Russia regression-target rows", () => {
    for (const needle of ["LUKOIL, VGO PROJECT", "VOLVOGRADO VGO DEEP CONVERSION COMPLEX", "SHATURA PROJECT", "ZAO GERSAN-R"]) {
      expect(joined).not.toContain(needle);
    }
  });

  it("does not exclude Russia/Iran-adjacent excluded rows' non-excluded neighbours (filter is not over-broad)", () => {
    // A genuine, unrelated Istanbul district project containing the substring "Balt" —
    // must survive since only the specific Kurgan-Balt mark is excluded.
    expect(joined).toContain("BALTA");
    // Neighbouring non-excluded rows in the same catalogue sections as the excluded ones.
    expect(joined).toContain("ADNOC");
    expect(joined).toContain("SONATRACH");
  });

  it("does not exclude a generic 'Balt' company/value unless it is specifically Kurgan-Balt", () => {
    expect(KURGAN_BALT_PATTERN.test("BALTALİMANI ATIKSU ARITMA TESİSİ")).toBe(false);
    expect(KURGAN_BALT_PATTERN.test("Kurgan-Balt")).toBe(true);
    expect(KURGAN_BALT_PATTERN.test("КУРГАН-БАЛТ")).toBe(true);
    expect(KURGAN_BALT_PATTERN.test("Kurgan Balt")).toBe(true);
  });

  it("excludes Russia/Iran from every geography-tagged (country/city-region) tab's location column", () => {
    for (const system of systems) {
      for (const tab of system.tabs) {
        if (!tab.geography || !tab.columns || !tab.rows) continue;
        const locationKey = tab.geographyColumnKey ?? "location";
        const locationIndex = tab.columns.findIndex((column) => column.key === locationKey);
        if (locationIndex === -1) continue;
        for (const row of tab.rows) {
          const location = row.cells[locationIndex] ?? "";
          expect(RUSSIA_WORD_PATTERN.test(location)).toBe(false);
          expect(IRAN_WORD_PATTERN.test(location)).toBe(false);
        }
      }
    }
  });

  it("derives every system total from its own filtered public tabs (rows + companies)", () => {
    for (const system of systems) {
      const derivedTotal = system.tabs.reduce(
        (sum, tab) => sum + (tab.rows?.length ?? 0) + (tab.companies?.length ?? 0),
        0,
      );
      expect(system.total).toBe(derivedTotal);
    }
  });

  it("still classifies Türkiye/domestic locations correctly (existing behaviour preserved)", () => {
    const busbar = systems.find((system) => system.key === "busbar");
    expect(busbar).toBeDefined();
    const domesticTab = busbar!.tabs.find((tab) => tab.id === "domestic-regional");
    expect(domesticTab?.rows?.length ?? 0).toBeGreaterThan(0);
  });

  it("keeps Ukraine localisation intact where the market provides it", () => {
    if (market === "ua") {
      const content = referenceSystemsForMarket("ua");
      expect(content.find((s) => s.key === "busbar")?.label).toBe("Шинопроводи");
    } else {
      const content = referenceSystemsForMarket("uk");
      expect(content.find((s) => s.key === "busbar")?.label).toBe("Busbar");
    }
  });

  it("adds a genuinely-new Busduct supplemental row exactly once", () => {
    const hits = findRowsContaining(systems, "Hassi R'Mel Gas Compr. Boosting PhaseIII");
    expect(hits.length).toBe(1);
    expect(hits[0]?.systemKey).toBe("busbar");
  });

  it("does not duplicate a Busduct row already present in the existing site data", () => {
    const hits = findRowsContaining(systems, "NISHAN TOWER COM-19- LUSAIL MARINA-QATAR 4B+G+3P+24F.");
    expect(hits.length).toBe(1);
  });

  it("adds a genuinely-new CMS supplemental row exactly once, in the detail tab", () => {
    const hits = findRowsContaining(systems, "RAIZEN/BANDEJA/1BD1055C");
    expect(hits.length).toBe(1);
    expect(hits[0]?.tabId).toBe("detailed-project-references");
  });

  it("does not duplicate a CMS row already present in the existing site data", () => {
    const hits = findRowsContaining(systems, "02230 TOTAL RAFFINADERIJ ANTWERPEN OPTARA");
    // May still appear once from the pre-existing Cable Management relationships table,
    // but must never appear a second time via the new supplemental detail tab.
    expect(hits.filter((hit) => hit.tabId === "detailed-project-references").length).toBe(0);
  });

  it("never surfaces the excluded Russia-linked CMS rows (Gazprom, Lukoil) anywhere", () => {
    expect(joined).not.toContain("GAZPROM");
    expect(joined).not.toContain("NEFT BADRA");
    expect(joined).not.toContain("LUKOIL");
  });
});

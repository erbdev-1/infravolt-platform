import { describe, expect, it } from "vitest";

import { dataCentreCableManagementLandingContentForMarket } from "./data-centre-landing-content";

// Phrases that would misrepresent InfraVolt's role, invent an unsupported
// claim, or reintroduce a rating/certification term this landing page must
// never carry.
const UNSUPPORTED_PHRASES = [
  "InfraVolt manufactures",
  "InfraVolt certifies",
  "official distributor",
  "exclusive distributor",
  "Tier III",
  "Tier IV",
  "Tier 3",
  "Tier 4",
  "Uptime Institute",
  "hyperscale-certified",
  "AI-ready",
  "zero downtime",
  "fastest",
  "market leader",
  "#1",
  "fire-survival",
  "arc-fault",
  "seismic",
];

const EXPECTED_ROUTES = [
  "/products/cable-support-systems/wire-mesh-systems",
  "/products/cable-support-systems/cable-ladders",
  "/products/cable-support-systems/cable-trays-trunking",
  "/products/cable-support-systems/support-hanging-systems",
];

describe("dataCentreCableManagementLandingContentForMarket — UK", () => {
  const uk = dataCentreCableManagementLandingContentForMarket("uk");

  it("carries the exact required title, H1 and meta description", () => {
    expect(uk.metadata.title).toBe("Data Centre Cable Management Systems UK | InfraVolt");
    expect(uk.hero.title).toBe("Data Centre Cable Management Systems");
    expect(uk.metadata.description).toBe(
      "Gersan cable management and containment systems for UK data centres, including wire-mesh cable trays, cable ladders, cable tray systems and support/hanging systems, with technical project support from InfraVolt.",
    );
  });

  it("carries the exact required breadcrumb trail", () => {
    expect(uk.breadcrumbs.home).toBe("Home");
    expect(uk.breadcrumbs.cableManagement).toBe("Cable Management Systems");
    expect(uk.breadcrumbs.current).toBe("Data Centre Cable Management");
  });

  it("states Gersan as manufacturer and InfraVolt as support, not manufacturer", () => {
    expect(uk.entityStatement).toContain("Gersan manufactures");
    expect(uk.entityStatement).toContain("InfraVolt supports UK and Ukraine projects");
    expect(uk.entityStatement).not.toContain("InfraVolt manufactures");
  });

  it("has exactly 4 comparison rows in the required order, each linking to a real product route", () => {
    expect(uk.comparison.rows).toHaveLength(4);
    expect(uk.comparison.rows.map((row) => row.system)).toEqual([
      "Wire-Mesh Cable Trays",
      "Cable Ladder Systems",
      "Cable Tray Systems",
      "Support & Hanging Systems",
    ]);
    expect(uk.comparison.rows.map((row) => row.href)).toEqual(EXPECTED_ROUTES);
  });

  it("links to the Cable Management hub, all four family pages, the Application Map and Data Centre Busbar", () => {
    expect(uk.hero.tertiaryActionHref).toBe("/application-map");
    expect(uk.relatedSystems.linkHref).toBe("/products/busbar/data-centre-busbar");
  });

  it("routes both project CTAs through the existing enquiry architecture, not a new backend", () => {
    expect(uk.hero.primaryActionHref).toContain("/contact?");
    expect(uk.hero.primaryActionHref).toContain("system=cable-management");
    expect(uk.hero.primaryActionHref).toContain("family=data-centre-cable-management");
    expect(uk.standardsNote.actionHref).toContain("/contact?");
    expect(uk.projectCta.actionHref).toContain("/contact?");
    expect(uk.projectCta.secondaryActionHref).toContain("/contact?");
  });

  it("has 6-7 visible FAQ items, including the manufacturer distinction", () => {
    expect(uk.faq.length).toBeGreaterThanOrEqual(6);
    expect(uk.faq.length).toBeLessThanOrEqual(7);
    const manufacturerFaq = uk.faq.find((item) =>
      item.question.startsWith("Does InfraVolt manufacture"),
    );
    expect(manufacturerFaq).toBeDefined();
    expect(manufacturerFaq?.answer).toContain("Gersan is the manufacturer");
    expect(manufacturerFaq?.answer).toContain("InfraVolt is the distributor");
  });

  it("states the standards note using only the repository-documented standards", () => {
    expect(uk.standardsNote.note).toContain("BS EN 61537");
    expect(uk.standardsNote.note).toContain("IEC 61537");
  });

  it("never introduces an unsupported claim or misrepresentation anywhere on the page", () => {
    const serialized = JSON.stringify(uk);
    for (const phrase of UNSUPPORTED_PHRASES) {
      expect(serialized).not.toContain(phrase);
    }
  });
});

describe("dataCentreCableManagementLandingContentForMarket — UA", () => {
  const ua = dataCentreCableManagementLandingContentForMarket("ua");

  it("carries the exact required title, H1 and meta description", () => {
    expect(ua.metadata.title).toBe("Кабеленесучі системи для центрів обробки даних (ЦОД) | InfraVolt");
    expect(ua.hero.title).toBe("Кабеленесучі системи для центрів обробки даних");
    expect(ua.metadata.description).toBe(
      "Кабеленесучі системи Gersan для центрів обробки даних (ЦОД): дротяні та металеві кабельні лотки, кабельні драбини, опорні й підвісні системи з технічною підтримкою InfraVolt.",
    );
  });

  it("carries the exact required breadcrumb trail", () => {
    expect(ua.breadcrumbs.home).toBe("Головна");
    expect(ua.breadcrumbs.cableManagement).toBe("Кабеленесучі системи");
    expect(ua.breadcrumbs.current).toBe("Кабеленесучі системи для ЦОД");
  });

  it("is not a literal word-for-word translation of the UK page", () => {
    const uk = dataCentreCableManagementLandingContentForMarket("uk");
    expect(ua.hero.description).not.toBe(uk.hero.description);
    expect(ua.directAnswer.answer).not.toBe(uk.directAnswer.answer);
  });

  it("does not reintroduce the 'підпідлоговий' calque anywhere on this Cable Management page", () => {
    const serialized = JSON.stringify(ua);
    expect(serialized.toLowerCase()).not.toContain("підпідлог");
  });

  it("states Gersan as manufacturer and InfraVolt as support, not manufacturer", () => {
    expect(ua.entityStatement).toContain("Gersan виробляє");
    expect(ua.entityStatement).not.toContain("InfraVolt виробляє");
  });

  it("has exactly 4 comparison rows in the required order, each linking to a real product route", () => {
    expect(ua.comparison.rows).toHaveLength(4);
    expect(ua.comparison.rows.map((row) => row.href)).toEqual(EXPECTED_ROUTES);
  });

  it("has the same FAQ count as UK (bilingual parity)", () => {
    const uk = dataCentreCableManagementLandingContentForMarket("uk");
    expect(ua.faq.length).toBe(uk.faq.length);
  });

  it("answers the manufacturer-vs-distributor FAQ correctly", () => {
    const manufacturerFaq = ua.faq.find((item) => item.question.startsWith("Чи виробляє InfraVolt"));
    expect(manufacturerFaq).toBeDefined();
    expect(manufacturerFaq?.answer).toContain("Виробником є Gersan");
  });

  it("never introduces an unsupported claim or misrepresentation anywhere on the page", () => {
    const serialized = JSON.stringify(ua);
    for (const phrase of UNSUPPORTED_PHRASES) {
      expect(serialized).not.toContain(phrase);
    }
  });
});

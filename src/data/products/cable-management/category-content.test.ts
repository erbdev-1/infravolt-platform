import { describe, expect, it } from "vitest";

import { cableManagementCategoryContentForMarket } from "./category-content";
import { cableLaddersContentForMarket } from "./cable-ladders-content";
import { cableTraysTrunkingContentForMarket } from "./cable-trays-trunking-content";
import { heavyDutyCableLaddersContentForMarket } from "./cable-ladders-detail-content";
import { normalTypeCableTraysContentForMarket } from "./normal-type-strengthened-content";
import { wireMeshSystemsContentForMarket } from "./wire-mesh-content";

describe("Cable Management UK Phase 1A SEO — unchanged by the later UA Phase 1A work", () => {
  it("hub title carries the UK suffix in the title tag only, H1 (title field) stays the broad primary category", () => {
    const uk = cableManagementCategoryContentForMarket("uk");
    expect(uk.title).toBe("Cable Management Systems");
    expect(uk.metaTitle).toBe("Cable Management Systems UK");
    expect(uk.description).toContain("cable containment");
    expect(uk.description).toContain("cable support");
  });

  it("Cable Tray umbrella owns the broad 'cable tray systems' intent (resolves the five-way cannibalisation)", () => {
    const uk = cableTraysTrunkingContentForMarket("uk");
    expect(uk.title).toBe("Cable Tray Systems");
    expect(uk.description.toLowerCase()).toContain("cable tray systems");
    expect(uk.description.toLowerCase()).toContain("trunking");
  });

  it("Normal Type Cable Trays keeps its genuine catalogue naming — already non-cannibalising, no forced keyword change", () => {
    const uk = normalTypeCableTraysContentForMarket("uk");
    expect(uk.title).toBe("Normal Type Cable Trays");
    expect(uk.description).toContain("Standard-duty");
  });

  it("Cable Ladder umbrella carries 'cable ladder systems' as its primary phrase", () => {
    const uk = cableLaddersContentForMarket("uk");
    expect(uk.title).toBe("Cable Ladder Systems");
    expect(uk.description.toLowerCase()).toContain("cable ladder systems");
  });

  it("Heavy Duty Cable Ladders (UK): improved title/description unchanged", () => {
    const uk = heavyDutyCableLaddersContentForMarket("uk");
    expect(uk.title).toBe("Heavy Duty Cable Ladders");
    expect(uk.description.toLowerCase()).toContain("heavy duty cable ladder systems");
    expect(uk.description.toLowerCase()).toContain("hot-dip galvanized");
  });

  it("Wire-Mesh Cable Trays keeps its H1 and 'cable basket' mention", () => {
    const uk = wireMeshSystemsContentForMarket("uk");
    expect(uk.title).toBe("Wire-Mesh Cable Trays");
    expect(uk.heroDescription.toLowerCase()).toContain("wire mesh cable tray");
    expect(uk.heroDescription.toLowerCase()).toContain("cable basket");
  });

  it("hub's own nav cards still match their destination pages' real titles", () => {
    const uk = cableManagementCategoryContentForMarket("uk");
    const trayCard = uk.macroGroups.find((group) => group.slug === "cable-trays-trunking");
    const ladderCard = uk.macroGroups.find((group) => group.slug === "cable-ladders");
    const wireMeshCard = uk.macroGroups.find((group) => group.slug === "wire-mesh-systems");

    expect(trayCard?.title).toBe("Cable Tray Systems");
    expect(ladderCard?.title).toBe("Cable Ladder Systems");
    expect(wireMeshCard?.title).toBe("Wire-Mesh Cable Trays");
  });
});

describe("Cable Management UA Phase 1A SEO (own natural Ukrainian keyword strategy, not a translation of UK copy)", () => {
  it("hub already matched its preferred primary term — title/H1 unchanged, description now also names 'системи прокладання кабелю'", () => {
    const ua = cableManagementCategoryContentForMarket("ua");
    expect(ua.title).toBe("Кабеленесучі системи");
    expect(ua.metaTitle).toBeUndefined();
    expect(ua.description).toContain("системи прокладання кабелю");
  });

  it("Cable Tray umbrella now owns the broad, unqualified 'Кабельні лотки' intent (resolves the UA five-way cannibalisation)", () => {
    const ua = cableTraysTrunkingContentForMarket("ua");
    expect(ua.title).toBe("Кабельні лотки");
    expect(ua.description).toContain("Кабельні лотки");
    // Genuine "короби" (trunking) coverage stays honestly represented in
    // the description, just not the H1 — same pattern as the UK page.
    expect(ua.description).toContain("короби");
    // Breadcrumb no longer leaks English "Home" / "Cable Management Systems".
    expect(ua.breadcrumbs[0]?.label).toBe("Головна");
    expect(ua.breadcrumbs[1]?.label).toBe("Кабеленесучі системи");
  });

  it("Normal Type Cable Trays keeps its genuine catalogue naming — already matched the preferred term, no forced keyword change", () => {
    const ua = normalTypeCableTraysContentForMarket("ua");
    expect(ua.title).toBe("Кабельні лотки стандартного типу");
  });

  it("Heavy Duty Cable Trays deliberately keeps 'важкого типу', NOT 'посилені' — that term already belongs to the separate Strengthened Cable Trays series", () => {
    const ua = cableTraysTrunkingContentForMarket("ua");
    const heavyDutySeries = ua.series.find((series) => series.slug === "heavy-duty-cable-trays");
    expect(heavyDutySeries?.label).toBe("Кабельні лотки важкого типу");
  });

  it("Aluminium Cable Trays already matched its preferred term with genuinely-evidenced 'lightweight' framing — no change needed", () => {
    const ua = cableTraysTrunkingContentForMarket("ua");
    const aluminiumSeries = ua.series.find((series) => series.slug === "aluminium-cable-trays");
    expect(aluminiumSeries?.label).toBe("Алюмінієві кабельні лотки");
  });

  it("Cable Ladder umbrella already matched its preferred term — title/H1 unchanged, breadcrumb no longer leaks English", () => {
    const ua = cableLaddersContentForMarket("ua");
    expect(ua.title).toBe("Кабельні драбини");
    expect(ua.breadcrumbs[0]?.label).toBe("Головна");
    expect(ua.breadcrumbs[1]?.label).toBe("Кабеленесучі системи");
  });

  it("Heavy Duty Cable Ladders (UA): 'важкого типу' used instead of unevidenced 'Посилені' — only a wider H range is evidenced, not genuine reinforcement", () => {
    const ua = heavyDutyCableLaddersContentForMarket("ua");
    expect(ua.title).toBe("Кабельні драбини важкого типу");
    expect(ua.title).not.toContain("Посилені");
    expect(ua.description).toContain("лотки драбинного типу");
    expect(ua.description).toContain("гарячеоцинкованої сталі");
    expect(ua.breadcrumbs.map((crumb) => crumb.label)).toEqual([
      "Головна",
      "Кабеленесучі системи",
      "Кабельні драбини",
      "Кабельні драбини важкого типу",
    ]);

    // UK stays on its own, separately-worded object.
    const uk = heavyDutyCableLaddersContentForMarket("uk");
    expect(uk.title).toBe("Heavy Duty Cable Ladders");
    expect(ua).not.toBe(uk);
  });

  it("Wire-Mesh: primary switched to 'Дротяні кабельні лотки' per UA market research, 'сітчасті' kept as secondary — UK 'cable basket' wording never appears", () => {
    const ua = wireMeshSystemsContentForMarket("ua");
    expect(ua.title).toBe("Дротяні кабельні лотки");
    expect(ua.heroDescription).toContain("дротяні кабельні лотки");
    expect(ua.heroDescription).toContain("сітчасті");
    expect(ua.heroDescription).not.toContain("cable basket");
  });

  it("hub's own nav cards match their destination pages' real UA titles (fixes the flagged label mismatch)", () => {
    const ua = cableManagementCategoryContentForMarket("ua");
    const trayCard = ua.macroGroups.find((group) => group.slug === "cable-trays-trunking");
    const wireMeshCard = ua.macroGroups.find((group) => group.slug === "wire-mesh-systems");

    expect(trayCard?.title).toBe("Кабельні лотки");
    expect(wireMeshCard?.title).toBe("Дротяні кабельні лотки");
  });

  it("Conduit & Pipe Systems keeps its already-accurate Ukrainian wording, not forced into generic 'кабельні труби'", () => {
    const ua = cableManagementCategoryContentForMarket("ua");
    const conduitCard = ua.macroGroups.find((group) => group.slug === "conduit-pipe-systems");
    expect(conduitCard?.title).toBe("Трубні та кабелепровідні системи");
  });
});

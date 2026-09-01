import { describe, expect, it } from "vitest";

import { cableManagementCategoryContentForMarket } from "./category-content";
import { cableLaddersContentForMarket } from "./cable-ladders-content";
import { cableTraysTrunkingContentForMarket } from "./cable-trays-trunking-content";
import { heavyDutyCableLaddersContentForMarket } from "./cable-ladders-detail-content";
import { normalTypeCableTraysContentForMarket } from "./normal-type-strengthened-content";
import { wireMeshSystemsContentForMarket } from "./wire-mesh-content";

describe("Cable Management UK Phase 1A SEO", () => {
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
    // Genuine trunking coverage (Pregalvanized Trunking is one of its 6
    // series) stays honestly represented in the description, just not the H1.
    expect(uk.description.toLowerCase()).toContain("trunking");
  });

  it("Normal Type Cable Trays keeps its genuine catalogue naming — already non-cannibalising, no forced keyword change", () => {
    const uk = normalTypeCableTraysContentForMarket("uk");
    expect(uk.title).toBe("Normal Type Cable Trays");
    // "Standard-duty" is the genuinely-supported differentiator (perforated
    // and galvanised are shared attributes across the whole tray family,
    // so neither was forced in as if unique to this page).
    expect(uk.description).toContain("Standard-duty");
  });

  it("Cable Ladder umbrella carries 'cable ladder systems' as its primary phrase", () => {
    const uk = cableLaddersContentForMarket("uk");
    expect(uk.title).toBe("Cable Ladder Systems");
    expect(uk.description.toLowerCase()).toContain("cable ladder systems");
  });

  it("Heavy Duty Cable Ladders (UK): improved title/description, without disturbing the UA-fallback object", () => {
    const uk = heavyDutyCableLaddersContentForMarket("uk");
    expect(uk.title).toBe("Heavy Duty Cable Ladders");
    expect(uk.description.toLowerCase()).toContain("heavy duty cable ladder systems");
    expect(uk.description.toLowerCase()).toContain("hot-dip galvanized");

    // UA must still resolve to the original, byte-for-byte-unchanged,
    // English-only object (no bilingual pass happened in this task).
    const ua = heavyDutyCableLaddersContentForMarket("ua");
    expect(ua.title).toBe("Heavy Duty Type Cable Ladders");
    expect(ua).not.toBe(uk);
  });

  it("Wire-Mesh Cable Trays keeps its H1 and now naturally mentions 'cable basket' as the legitimate UK-market synonym", () => {
    const uk = wireMeshSystemsContentForMarket("uk");
    expect(uk.title).toBe("Wire-Mesh Cable Trays");
    expect(uk.heroDescription.toLowerCase()).toContain("wire mesh cable tray");
    expect(uk.heroDescription.toLowerCase()).toContain("cable basket");
  });

  it("hub's own nav cards now match their destination pages' real titles (fixes the flagged label mismatches)", () => {
    const uk = cableManagementCategoryContentForMarket("uk");
    const trayCard = uk.macroGroups.find((group) => group.slug === "cable-trays-trunking");
    const ladderCard = uk.macroGroups.find((group) => group.slug === "cable-ladders");
    const wireMeshCard = uk.macroGroups.find((group) => group.slug === "wire-mesh-systems");

    expect(trayCard?.title).toBe("Cable Tray Systems");
    expect(ladderCard?.title).toBe("Cable Ladder Systems");
    expect(wireMeshCard?.title).toBe("Wire-Mesh Cable Trays");
  });
});

describe("Cable Management — UA content is untouched by the UK Phase 1A edits", () => {
  it("hub keeps its own (non-English) title/description, no UK-only metaTitle leak", () => {
    const ua = cableManagementCategoryContentForMarket("ua");
    expect(ua.title).toBe("Кабеленесучі системи");
    expect(ua.metaTitle).toBeUndefined();
  });

  it("Cable Tray umbrella keeps its own Ukrainian title, unaffected by the UK rename", () => {
    const ua = cableTraysTrunkingContentForMarket("ua");
    expect(ua.title).toBe("Кабельні лотки та короби");
  });

  it("Cable Ladder umbrella keeps its own Ukrainian title, unaffected by the UK rename", () => {
    const ua = cableLaddersContentForMarket("ua");
    expect(ua.title).toBe("Кабельні драбини");
  });

  it("Wire-Mesh keeps its own Ukrainian description, without the UK-only 'cable basket' addition", () => {
    const ua = wireMeshSystemsContentForMarket("ua");
    expect(ua.heroDescription).not.toContain("cable basket");
    expect(ua.heroDescription).toContain("сітчасті кабельні лотки");
  });
});

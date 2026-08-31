import { describe, expect, it } from "vitest";

import { busbarCatalogContentForMarket } from "./catalog-content";

describe("busbarCatalogContentForMarket — UK Phase 1A SEO", () => {
  const uk = busbarCatalogContentForMarket("uk");

  it("hub title carries the UK commercial-localisation suffix, H1 stays unchanged", () => {
    expect(uk.metadata.title).toBe("Busbar Trunking Systems UK | InfraVolt");
    expect(uk.metadata.description.toLowerCase()).toContain("uk projects");
    expect(uk.hero.title).toBe("Busbar Trunking Systems");
  });

  it("hub H1 and breadcrumb leaf are consistent with each other (not with the UK-suffixed title)", () => {
    expect(uk.hero.title).toBe("Busbar Trunking Systems");
    expect(uk.breadcrumbs.current).toBe("Busbar Trunking Systems");
  });

  it("GS Super Compact name (title/H1 source) carries the high power busbar keyword", () => {
    expect(uk.systems["gs-super-compact"].name).toBe("GS Super Compact High Power Busbar");
    expect(uk.systems["gs-super-compact"].description.toLowerCase()).toContain("high power busbar");
  });

  it("GR Cast Resin already matched its primary keyword and is left as-is", () => {
    expect(uk.systems["gr-cast-resin"].name).toBe("GR Cast Resin Busbar");
    expect(uk.systems["gr-cast-resin"].description.toLowerCase()).toContain("cast resin busbar");
  });

  it("GGD carries rising-main intent in its title-only override, while name (H1 source) keeps its Medium Power identity", () => {
    expect(uk.systems["ggd-medium-power-busbar"].name).toBe("GGD Medium Power Busbar");
    expect(uk.systems["ggd-medium-power-busbar"].metaTitle).toBe(
      "GGD Medium Power & Rising Main Busbar",
    );
    expect(uk.systems["ggd-medium-power-busbar"].description.toLowerCase()).toContain("rising main");
  });

  it("GL is the preferred lighting busbar page: description carries the full trunking phrase", () => {
    expect(uk.systems["gl-lighting-busbar"].description.toLowerCase()).toContain(
      "lighting busbar trunking",
    );
  });

  // "raised-floor supply points" is the exact phrase already present, pre-existing,
  // in this system's own heroDescription (series/gnl.ts) and independently
  // corroborated by its Ukrainian translation ("точок підключення в
  // фальшпідлогах" — raised/false-floor connection points) — not an invented
  // differentiator. See series/gnl.ts for the source.
  it("GNL is repositioned toward its genuinely-sourced raised-floor-supply-point intent, not duplicating GL's head phrase", () => {
    const gnlDescription = uk.systems["gnl-lighting-busbar"].description.toLowerCase();
    expect(gnlDescription).toContain("raised-floor supply points");
    expect(gnlDescription).not.toContain("lighting busbar trunking");
  });

  it("has a related-systems label for the sibling cross-link block", () => {
    expect(uk.relatedSystemsLabel).toBe("Related busbar systems:");
  });

  it("has a Data Centre Application Map label for the reciprocal link", () => {
    expect(uk.dataCentreApplicationMapLabel.length).toBeGreaterThan(0);
  });
});

describe("busbarCatalogContentForMarket — UA content is untouched by the UK Phase 1A edits", () => {
  const ua = busbarCatalogContentForMarket("ua");

  it("keeps its own (non-English) hub title, H1 and breadcrumb", () => {
    expect(ua.metadata.title).toBe("Шинопровідні системи для проєктів в Україні | InfraVolt");
    expect(ua.hero.title).toBe("Шинопровідні системи");
    expect(ua.breadcrumbs.current).toBe("Шинопровідні системи");
  });

  it("keeps its own system names and descriptions, not the UK English text", () => {
    expect(ua.systems["gs-super-compact"].name).toBe("GS Super Compact");
    expect(ua.systems["gr-cast-resin"].name).toBe("Шинопровід GR з литою ізоляцією");
    expect(ua.systems["gnl-lighting-busbar"].description).not.toContain("raised-floor");
  });

  it("does not carry the UK-only 'UK' title suffix or the UK-only GGD rising-main metaTitle override", () => {
    expect(ua.metadata.title).not.toContain(" UK ");
    expect(ua.systems["ggd-medium-power-busbar"].metaTitle).toBeUndefined();
    expect(ua.systems["ggd-medium-power-busbar"].name).toBe("Шинопровід середньої потужності GGD");
  });

  it("has its own (non-English) related-systems and data-centre-map labels", () => {
    expect(ua.relatedSystemsLabel).toBe("Суміжні шинопровідні системи:");
    expect(ua.dataCentreApplicationMapLabel.length).toBeGreaterThan(0);
    expect(ua.dataCentreApplicationMapLabel).not.toBe(
      busbarCatalogContentForMarket("uk").dataCentreApplicationMapLabel,
    );
  });
});

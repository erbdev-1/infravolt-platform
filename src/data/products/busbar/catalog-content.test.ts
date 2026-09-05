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

  it("the Data centres application card links to the Phase 2 landing page; every other card is unchanged", () => {
    const dataCentresItem = uk.applications.items.find((item) => item.id === "data-centres");
    expect(dataCentresItem?.href).toBe("/products/busbar/data-centre-busbar");
    expect(dataCentresItem?.linkLabel?.length).toBeGreaterThan(0);

    for (const item of uk.applications.items) {
      if (item.id !== "data-centres") {
        expect(item.href).toBeUndefined();
        expect(item.linkLabel).toBeUndefined();
      }
    }
  });
});

describe("busbarCatalogContentForMarket — UA Busbar Phase 1A SEO (own natural Ukrainian keyword strategy, not a translation of UK copy)", () => {
  const ua = busbarCatalogContentForMarket("ua");

  it("hub title/H1/breadcrumb carry the UA primary intent (mainline & power busbars)", () => {
    expect(ua.metadata.title).toBe("Магістральні та силові шинопроводи в Україні | InfraVolt");
    expect(ua.hero.title).toBe("Магістральні та силові шинопроводи");
    expect(ua.breadcrumbs.current).toBe("Магістральні та силові шинопроводи");
    // Full category breadth (incl. lighting) stays honestly represented in
    // the meta description even though the H1 narrows to the priority intent.
    expect(ua.metadata.description).toContain("освітлювальні");
  });

  it("GS carries the UA high-power-busbar keyword while keeping the GS Super Compact identity", () => {
    expect(ua.systems["gs-super-compact"].name).toBe(
      "GS Super Compact — силовий шинопровід високої потужності",
    );
    expect(ua.systems["gs-super-compact"].description.toLowerCase()).toContain(
      "силовий шинопровід високої потужності",
    );
    expect(ua.systems["gs-super-compact"].description).not.toContain("високої напруги");
  });

  it("GR already matched its UA primary/secondary keywords (cast-insulation + IP68) and is left as-is", () => {
    expect(ua.systems["gr-cast-resin"].name).toBe("Шинопровід GR з литою ізоляцією");
    expect(ua.systems["gr-cast-resin"].description).toContain("з литою ізоляцією");
    expect(ua.systems["gr-cast-resin"].description).toContain("IP68");
  });

  it("GGD carries mainline/medium-power identity and vertical-distribution intent, with no English 'rising main' text", () => {
    expect(ua.systems["ggd-medium-power-busbar"].name).toBe(
      "Магістральний шинопровід середньої потужності GGD",
    );
    expect(ua.systems["ggd-medium-power-busbar"].metaTitle).toBeUndefined();
    expect(ua.systems["ggd-medium-power-busbar"].description).toContain("вертикального розподілу");
    expect(ua.systems["ggd-medium-power-busbar"].description.toLowerCase()).not.toContain("rising main");
  });

  it("GL is the preferred broad UA lighting-busbar page, with industrial/commercial context (not decorative/retail)", () => {
    expect(ua.systems["gl-lighting-busbar"].name).toBe("Освітлювальний шинопровід GL");
    expect(ua.systems["gl-lighting-busbar"].description).toContain("промислових і комерційних");
  });

  // "точок підключення в фальшпідлогах" (raised-floor connection points) is the
  // exact phrase already present, pre-existing, in this system's own Ukrainian
  // heroDescription (series/gnl.ts) — not a translation of the English UK
  // copy, and not an invented differentiator. See series/gnl.ts for the source.
  it("GNL is repositioned toward its genuinely-sourced compact/raised-floor intent, not duplicating GL's broad head phrase", () => {
    expect(ua.systems["gnl-lighting-busbar"].name).toBe("Компактний освітлювальний шинопровід GNL");
    expect(ua.systems["gnl-lighting-busbar"].description).toContain("фальшпідлогах");
    expect(ua.systems["gnl-lighting-busbar"].description).not.toBe(
      ua.systems["gl-lighting-busbar"].description,
    );
  });

  it("does not carry the UK-only 'UK' title suffix", () => {
    expect(ua.metadata.title).not.toContain(" UK ");
    expect(ua.metadata.title).not.toContain("InfraVolt UK");
  });

  it("has its own (non-English) related-systems and data-centre-map labels, unchanged from Phase 1A", () => {
    expect(ua.relatedSystemsLabel).toBe("Суміжні шинопровідні системи:");
    expect(ua.dataCentreApplicationMapLabel.length).toBeGreaterThan(0);
    expect(ua.dataCentreApplicationMapLabel).not.toBe(
      busbarCatalogContentForMarket("uk").dataCentreApplicationMapLabel,
    );
  });

  it("the Data centres application card links to the Phase 2 landing page in its own natural UA wording", () => {
    const dataCentresItem = ua.applications.items.find((item) => item.id === "data-centres");
    expect(dataCentresItem?.href).toBe("/products/busbar/data-centre-busbar");
    expect(dataCentresItem?.linkLabel?.length).toBeGreaterThan(0);
  });
});

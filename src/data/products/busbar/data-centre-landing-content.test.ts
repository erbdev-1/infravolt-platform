import { describe, expect, it } from "vitest";

import { dataCentreBusbarLandingContentForMarket } from "./data-centre-landing-content";

// Phrases that would misrepresent InfraVolt's role, invent an unsupported
// claim, or reintroduce a compliance/rating term this landing page must
// never carry (see the Phase 2 entity-positioning and technical-claim-
// safety requirements this content was written against).
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
  "ATEX",
  "IECEx",
  "explosion-proof",
  "hyperscale-certified",
  "AI-ready",
  "zero downtime",
];

describe("dataCentreBusbarLandingContentForMarket — UK", () => {
  const uk = dataCentreBusbarLandingContentForMarket("uk");

  it("carries the exact required title, H1 and meta description", () => {
    expect(uk.metadata.title).toBe("Data Centre Busbar Trunking Systems UK | InfraVolt");
    expect(uk.hero.title).toBe("Data Centre Busbar Trunking Systems");
    expect(uk.metadata.description).toBe(
      "Gersan busbar trunking systems for UK data centre power distribution — GS high-current, GGD medium-power and GR cast-resin systems, with technical project support from InfraVolt.",
    );
  });

  it("carries the exact required breadcrumb trail", () => {
    expect(uk.breadcrumbs.home).toBe("Home");
    expect(uk.breadcrumbs.products).toBe("Products");
    expect(uk.breadcrumbs.busbar).toBe("Busbar Trunking Systems");
    expect(uk.breadcrumbs.current).toBe("Data Centre Busbar");
  });

  it("states Gersan as manufacturer and InfraVolt as UK/Ukraine project support, not manufacturer", () => {
    expect(uk.entityStatement).toContain("Gersan manufactures");
    expect(uk.entityStatement).toContain("InfraVolt supports UK and Ukraine projects");
    expect(uk.entityStatement).not.toContain("InfraVolt manufactures");
  });

  it("links out to all three product pages (GS, GGD, GR) from the comparison table", () => {
    const hrefs = uk.comparison.rows.map((row) => row.href);
    expect(hrefs).toContain("/products/busbar/gs-super-compact");
    expect(hrefs).toContain("/products/busbar/ggd-medium-power-busbar");
    expect(hrefs).toContain("/products/busbar/gr-cast-resin");
  });

  it("links to the Busbar hub and the Data Centre Application Map", () => {
    expect(uk.breadcrumbs.busbar).toBeTruthy();
    expect(uk.hero.tertiaryActionHref).toBe("/application-map");
    expect(uk.applicationMap.linkLabel.length).toBeGreaterThan(0);
  });

  it("routes both project CTAs through the existing /contact enquiry architecture, not a new backend", () => {
    expect(uk.hero.primaryActionHref).toContain("/contact?");
    expect(uk.projectCta.actionHref).toContain("/contact?");
    expect(uk.projectCta.secondaryActionHref).toContain("/contact?");
  });

  it("answers the Q5 manufacturer-vs-distributor FAQ correctly", () => {
    const manufacturerFaq = uk.faq.find((item) =>
      item.question.startsWith("Does InfraVolt manufacture"),
    );
    expect(manufacturerFaq).toBeDefined();
    expect(manufacturerFaq?.answer).toContain("Gersan is the manufacturer");
    expect(manufacturerFaq?.answer).toContain("InfraVolt is the distributor");
  });

  it("has 4-6 visible FAQ items", () => {
    expect(uk.faq.length).toBeGreaterThanOrEqual(4);
    expect(uk.faq.length).toBeLessThanOrEqual(6);
  });

  it("never introduces an unsupported claim or misrepresentation anywhere on the page", () => {
    const serialized = JSON.stringify(uk);
    for (const phrase of UNSUPPORTED_PHRASES) {
      expect(serialized).not.toContain(phrase);
    }
  });
});

describe("dataCentreBusbarLandingContentForMarket — UA", () => {
  const ua = dataCentreBusbarLandingContentForMarket("ua");

  it("carries the exact required title, H1 and meta description", () => {
    expect(ua.metadata.title).toBe("Шинопроводи для центрів обробки даних (ЦОД) | InfraVolt");
    expect(ua.hero.title).toBe("Шинопроводи для центрів обробки даних");
    expect(ua.metadata.description).toBe(
      "Силові шинопроводи Gersan для розподілу електроенергії в центрах обробки даних (ЦОД): GS високої потужності, GGD середньої потужності та GR з литою ізоляцією, з технічною підтримкою InfraVolt.",
    );
  });

  it("carries the exact required breadcrumb trail", () => {
    expect(ua.breadcrumbs.home).toBe("Головна");
    expect(ua.breadcrumbs.products).toBe("Продукція");
    expect(ua.breadcrumbs.busbar).toBe("Магістральні та силові шинопроводи");
    expect(ua.breadcrumbs.current).toBe("Шинопроводи для ЦОД");
  });

  it("uses Phase 1-established UA series terminology, not new/awkward phrasing", () => {
    expect(ua.directAnswer.answer).toContain("GS Super Compact");
    expect(ua.comparison.rows[0].system).toBe("GS Super Compact");
    expect(ua.comparison.rows[1].system).toBe("GGD середньої потужності");
    expect(ua.comparison.rows[2].system).toBe("GR з литою ізоляцією");
  });

  it("does not reintroduce the 'підпідлоговий' calque or any Underfloor terminology on this Busbar page", () => {
    const serialized = JSON.stringify(ua);
    expect(serialized.toLowerCase()).not.toContain("підпідлог");
  });

  it("states Gersan as manufacturer and InfraVolt as UK/Ukraine project support, not manufacturer", () => {
    expect(ua.entityStatement).toContain("Gersan виробляє");
    expect(ua.entityStatement).not.toContain("InfraVolt виробляє");
  });

  it("links out to all three product pages (GS, GGD, GR) from the comparison table", () => {
    const hrefs = ua.comparison.rows.map((row) => row.href);
    expect(hrefs).toContain("/products/busbar/gs-super-compact");
    expect(hrefs).toContain("/products/busbar/ggd-medium-power-busbar");
    expect(hrefs).toContain("/products/busbar/gr-cast-resin");
  });

  it("answers the Q5 manufacturer-vs-distributor FAQ correctly", () => {
    const manufacturerFaq = ua.faq.find((item) => item.question.startsWith("Чи виробляє InfraVolt"));
    expect(manufacturerFaq).toBeDefined();
    expect(manufacturerFaq?.answer).toContain("Виробником є Gersan");
  });

  it("has the same FAQ count as UK (bilingual parity)", () => {
    const uk = dataCentreBusbarLandingContentForMarket("uk");
    expect(ua.faq.length).toBe(uk.faq.length);
  });

  it("never introduces an unsupported claim or misrepresentation anywhere on the page", () => {
    const serialized = JSON.stringify(ua);
    for (const phrase of UNSUPPORTED_PHRASES) {
      expect(serialized).not.toContain(phrase);
    }
  });
});

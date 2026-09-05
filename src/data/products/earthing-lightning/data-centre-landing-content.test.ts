import { describe, expect, it } from "vitest";

import { dataCentreEarthingLandingContentForMarket } from "./data-centre-landing-content";

// Phrases that would misrepresent InfraVolt's role, invent an unsupported
// claim, or reintroduce a rating/certification/resistance-target term this
// landing page must never carry.
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
  "guaranteed earth resistance",
  "Ω",
  "ohms",
];

const EXPECTED_ROUTES = [
  "/products/earthing-and-lightning-protection/equipotential-earth-bars",
  "/products/earthing-and-lightning-protection/conductors-tapes",
  "/products/earthing-and-lightning-protection/clamps-connectors",
  "/products/earthing-and-lightning-protection/earthing-electrodes-plates",
  "/products/earthing-and-lightning-protection/lightning-protection",
];

describe("dataCentreEarthingLandingContentForMarket — UK", () => {
  const uk = dataCentreEarthingLandingContentForMarket("uk");

  it("carries the exact required title, H1 and meta description", () => {
    expect(uk.metadata.title).toBe("Data Centre Earthing & Bonding Systems UK | InfraVolt");
    expect(uk.hero.title).toBe("Data Centre Earthing & Bonding Systems");
    expect(uk.metadata.description).toBe(
      "Gersan earthing, equipotential bonding and lightning protection components for UK data centres, including earth bars, conductors, clamps and electrodes, with technical project support from InfraVolt.",
    );
  });

  it("carries the exact required breadcrumb trail", () => {
    expect(uk.breadcrumbs.home).toBe("Home");
    expect(uk.breadcrumbs.earthingLightning).toBe("Earthing & Lightning Protection");
    expect(uk.breadcrumbs.current).toBe("Data Centre Earthing");
  });

  it("states Gersan as manufacturer and InfraVolt as support, not manufacturer", () => {
    expect(uk.entityStatement).toBe(
      "Gersan manufactures the earthing and lightning-protection components shown on this page. InfraVolt supports UK and Ukraine projects with product selection, technical-commercial coordination and enquiries.",
    );
    expect(uk.entityStatement).not.toContain("InfraVolt manufactures");
  });

  it("has exactly 5 comparison rows in the required order, each linking to a real product route", () => {
    expect(uk.comparison.rows).toHaveLength(5);
    expect(uk.comparison.rows.map((row) => row.system)).toEqual([
      "Equipotential Earth Bars",
      "Conductors & Earthing Tapes",
      "Clamps & Connectors",
      "Earthing Electrodes & Plates",
      "Lightning Protection Products",
    ]);
    expect(uk.comparison.rows.map((row) => row.href)).toEqual(EXPECTED_ROUTES);
  });

  it("links to the Application Map and both related Data Centre systems", () => {
    expect(uk.hero.tertiaryActionHref).toBe("/application-map");
    const relatedHrefs = uk.relatedSystems.links.map((link) => link.href);
    expect(relatedHrefs).toContain("/products/busbar/data-centre-busbar");
    expect(relatedHrefs).toContain("/products/cable-support-systems/data-centre-cable-management");
  });

  it("routes both project CTAs through the existing enquiry architecture, not a new backend", () => {
    expect(uk.hero.primaryActionHref).toContain("/contact?");
    expect(uk.hero.primaryActionHref).toContain("system=earthing-lightning");
    expect(uk.hero.primaryActionHref).toContain("family=data-centre-earthing");
    expect(uk.standardsNote.actionHref).toContain("/contact?");
    expect(uk.projectCta.actionHref).toContain("/contact?");
    expect(uk.projectCta.secondaryActionHref).toContain("/contact?");
  });

  it("has exactly 7 visible FAQ items, including the manufacturer distinction", () => {
    expect(uk.faq).toHaveLength(7);
    const manufacturerFaq = uk.faq.find((item) =>
      item.question.startsWith("Does InfraVolt manufacture"),
    );
    expect(manufacturerFaq).toBeDefined();
    expect(manufacturerFaq?.answer).toContain("Gersan is the manufacturer");
    expect(manufacturerFaq?.answer).toContain("InfraVolt is the distributor");
  });

  it("states the standards note using only the repository-documented standards, with no blanket certification claim", () => {
    expect(uk.standardsNote.note).toContain("IEC/EN 62561 Series");
    expect(uk.standardsNote.note).toContain("IEC 62305");
    expect(uk.standardsNote.note).toContain("BS 7430");
    expect(uk.standardsNote.note.toLowerCase()).not.toContain("certified to");
  });

  it("never introduces an unsupported claim, numeric resistance target or misrepresentation anywhere on the page", () => {
    const serialized = JSON.stringify(uk);
    for (const phrase of UNSUPPORTED_PHRASES) {
      expect(serialized).not.toContain(phrase);
    }
  });
});

describe("dataCentreEarthingLandingContentForMarket — UA", () => {
  const ua = dataCentreEarthingLandingContentForMarket("ua");

  it("carries the exact required title, H1 and meta description", () => {
    expect(ua.metadata.title).toBe("Заземлення та зрівнювання потенціалів для ЦОД | InfraVolt");
    expect(ua.hero.title).toBe("Заземлення та зрівнювання потенціалів для центрів обробки даних");
    expect(ua.metadata.description).toBe(
      "Компоненти Gersan для заземлення, зрівнювання потенціалів і блискавкозахисту центрів обробки даних (ЦОД): шини заземлення, провідники, затискачі та електроди з технічною підтримкою InfraVolt.",
    );
  });

  it("carries the exact required breadcrumb trail", () => {
    expect(ua.breadcrumbs.home).toBe("Головна");
    expect(ua.breadcrumbs.earthingLightning).toBe("Заземлення та блискавкозахист");
    expect(ua.breadcrumbs.current).toBe("Заземлення для ЦОД");
  });

  it("is not a literal word-for-word translation of the UK page", () => {
    const uk = dataCentreEarthingLandingContentForMarket("uk");
    expect(ua.hero.description).not.toBe(uk.hero.description);
    expect(ua.directAnswer.answer).not.toBe(uk.directAnswer.answer);
  });

  it("states Gersan as manufacturer and InfraVolt as support, not manufacturer", () => {
    expect(ua.entityStatement).toContain("Gersan виробляє");
    expect(ua.entityStatement).not.toContain("InfraVolt виробляє");
  });

  it("has exactly 5 comparison rows in the required order, each linking to a real product route", () => {
    expect(ua.comparison.rows).toHaveLength(5);
    expect(ua.comparison.rows.map((row) => row.href)).toEqual(EXPECTED_ROUTES);
  });

  it("has the same FAQ count as UK (bilingual parity)", () => {
    const uk = dataCentreEarthingLandingContentForMarket("uk");
    expect(ua.faq.length).toBe(uk.faq.length);
    expect(ua.faq).toHaveLength(7);
  });

  it("answers the manufacturer-vs-distributor FAQ correctly", () => {
    const manufacturerFaq = ua.faq.find((item) => item.question.startsWith("Чи виробляє InfraVolt"));
    expect(manufacturerFaq).toBeDefined();
    expect(manufacturerFaq?.answer).toContain("Виробником є Gersan");
  });

  it("links to both related Data Centre systems", () => {
    const relatedHrefs = ua.relatedSystems.links.map((link) => link.href);
    expect(relatedHrefs).toContain("/products/busbar/data-centre-busbar");
    expect(relatedHrefs).toContain("/products/cable-support-systems/data-centre-cable-management");
  });

  it("never introduces an unsupported claim, numeric resistance target or misrepresentation anywhere on the page", () => {
    const serialized = JSON.stringify(ua);
    for (const phrase of UNSUPPORTED_PHRASES) {
      expect(serialized).not.toContain(phrase);
    }
  });
});

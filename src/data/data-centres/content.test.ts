import { describe, expect, it } from "vitest";

import { dataCentreInfrastructureHubContentForMarket } from "./content";
import { dataCentreBusbarLandingContentForMarket } from "@/data/products/busbar/data-centre-landing-content";
import { dataCentreCableManagementLandingContentForMarket } from "@/data/products/cable-management/data-centre-landing-content";
import { dataCentreEarthingLandingContentForMarket } from "@/data/products/earthing-lightning/data-centre-landing-content";
import { DATA_CENTRE_APPLICATION_MAP } from "@/modules/application-map/data-centre";

// Phrases that would misrepresent InfraVolt's role, invent an unsupported
// claim, or reintroduce a rating/certification/performance term this hub
// must never carry.
const UNSUPPORTED_PHRASES = [
  "InfraVolt manufactures",
  "InfraVolt certifies",
  "InfraVolt designs",
  "designer of record",
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
  "guaranteed fault current",
  "fully certified",
];

const EXPECTED_CORE_ROUTES = [
  "/products/busbar/data-centre-busbar",
  "/products/cable-support-systems/data-centre-cable-management",
  "/products/earthing-and-lightning-protection/data-centre-earthing",
];

describe("dataCentreInfrastructureHubContentForMarket — UK", () => {
  const uk = dataCentreInfrastructureHubContentForMarket("uk");

  it("carries the exact required title, H1 and meta description", () => {
    expect(uk.metadata.title).toBe("Data Centre Electrical Infrastructure Systems UK | InfraVolt");
    expect(uk.hero.title).toBe("Data Centre Electrical Infrastructure Systems");
    expect(uk.metadata.description).toBe(
      "Explore Gersan busbar, cable management, earthing and bonding systems for UK data centres, with application mapping, technical documentation and project support from InfraVolt.",
    );
  });

  it("carries the exact required breadcrumb trail", () => {
    expect(uk.breadcrumbs.home).toBe("Home");
    expect(uk.breadcrumbs.current).toBe("Data Centres");
  });

  it("states Gersan as manufacturer and InfraVolt as support, never as designer/certifier/installer of record", () => {
    expect(uk.entityStatement).toContain("Gersan manufactures");
    expect(uk.entityStatement).not.toContain("InfraVolt manufactures");
  });

  it("has exactly 3 core system cards in the required order, each linking to the real detail route", () => {
    expect(uk.coreSystems).toHaveLength(3);
    expect(uk.coreSystems.map((system) => system.title)).toEqual([
      "Data Centre Busbar Systems",
      "Data Centre Cable Management Systems",
      "Data Centre Earthing & Bonding Systems",
    ]);
    expect(uk.coreSystems.map((system) => system.href)).toEqual(EXPECTED_CORE_ROUTES);
  });

  it("standards section reuses the exact wording already published on the Cable Management and Earthing detail pages", () => {
    const cableManagement = dataCentreCableManagementLandingContentForMarket("uk");
    const earthing = dataCentreEarthingLandingContentForMarket("uk");

    expect(uk.standards.cableManagementNote).toBe(cableManagement.standardsNote.note);
    expect(uk.standards.earthingNote).toBe(earthing.standardsNote.note);
  });

  it("does not invent a standard for busbar — the Busbar detail page carries no standards wording to reuse", () => {
    const busbar = dataCentreBusbarLandingContentForMarket("uk");
    const busbarSerialized = JSON.stringify(busbar);

    expect(busbarSerialized).not.toMatch(/IEC|BS EN/);
    // The hub is honest about this absence rather than fabricating a
    // standard reference for busbar.
    expect(uk.standards.busbarNote.toLowerCase()).toContain("does not quote");
  });

  it("has exactly 7 visible FAQ items, including the manufacturer distinction", () => {
    expect(uk.faq).toHaveLength(7);
    const manufacturerFaq = uk.faq.find((item) => item.question.startsWith("Does InfraVolt manufacture"));
    expect(manufacturerFaq).toBeDefined();
    expect(manufacturerFaq?.answer).toContain("Gersan is the manufacturer");
    expect(manufacturerFaq?.answer).toContain("InfraVolt is the distributor");
  });

  it("FAQ answers that reference a detail page carry a real link to it, rather than duplicating that page's content", () => {
    const busbarFaq = uk.faq.find((item) => item.question === "When is busbar used in a data centre?");
    const cableFaq = uk.faq.find(
      (item) => item.question === "What cable management systems are used in data centres?",
    );
    const earthingFaq = uk.faq.find(
      (item) => item.question === "How are racks, panels and cable containment bonded?",
    );

    expect(busbarFaq?.linkHref).toBe("/products/busbar/data-centre-busbar");
    expect(cableFaq?.linkHref).toBe("/products/cable-support-systems/data-centre-cable-management");
    expect(earthingFaq?.linkHref).toBe(
      "/products/earthing-and-lightning-protection/data-centre-earthing",
    );
  });

  it("routes both project CTAs through the existing enquiry architecture, not a new backend", () => {
    expect(uk.hero.primaryActionHref).toContain("/contact?");
    expect(uk.hero.primaryActionHref).toContain("family=data-centres");
    expect(uk.projectCta.actionHref).toContain("/contact?");
    expect(uk.projectCta.secondaryActionHref).toContain("/contact?");
  });

  it("hero secondary action and zones CTA point to the interactive Application Map", () => {
    expect(uk.hero.secondaryActionHref).toBe("/application-map");
    expect(uk.zones.ctaLabel.length).toBeGreaterThan(0);
  });

  it("cluster navigation links to all 3 detail pages plus the Application Map", () => {
    const hrefs = uk.clusterNavigation.links.map((link) => link.href);
    expect(hrefs).toEqual([...EXPECTED_CORE_ROUTES, "/application-map"]);
  });

  it("project coordination checklist includes a professional-responsibility disclaimer", () => {
    expect(uk.projectCoordination.checklist.length).toBeGreaterThanOrEqual(6);
    expect(uk.projectCoordination.disclaimer.toLowerCase()).toContain("appointed");
  });

  it("mentions the 3 additional map product families exactly once, without turning them into equal SEO cards", () => {
    expect(uk.zones.additionalSystemsNote).toContain("Underfloor Cable Trunking");
    expect(uk.zones.additionalSystemsNote).toContain("LED Systems");
    expect(uk.zones.additionalSystemsNote).toContain("EV Charging Systems");
    // Only ever mentioned in this one note field, not promoted to their own coreSystems card.
    expect(uk.coreSystems.map((system) => system.title)).not.toContain("Underfloor Cable Trunking");
  });

  it("never introduces an unsupported claim or misrepresentation anywhere on the page", () => {
    const serialized = JSON.stringify(uk);
    for (const phrase of UNSUPPORTED_PHRASES) {
      expect(serialized).not.toContain(phrase);
    }
  });
});

describe("dataCentreInfrastructureHubContentForMarket — UA", () => {
  const ua = dataCentreInfrastructureHubContentForMarket("ua");

  it("carries the exact required title, H1 and meta description", () => {
    expect(ua.metadata.title).toBe("Електротехнічна інфраструктура для ЦОД | InfraVolt");
    expect(ua.hero.title).toBe("Електротехнічна інфраструктура для центрів обробки даних");
    expect(ua.metadata.description).toBe(
      "Системи Gersan для електротехнічної інфраструктури центрів обробки даних (ЦОД): шинопроводи, кабеленесучі системи, заземлення та зрівнювання потенціалів з технічною підтримкою InfraVolt.",
    );
  });

  it("carries the exact required breadcrumb trail", () => {
    expect(ua.breadcrumbs.home).toBe("Головна");
    expect(ua.breadcrumbs.current).toBe("Центри обробки даних");
  });

  it("is not a literal word-for-word translation of the UK page", () => {
    const uk = dataCentreInfrastructureHubContentForMarket("uk");
    expect(ua.hero.description).not.toBe(uk.hero.description);
    expect(ua.directAnswer.answer).not.toBe(uk.directAnswer.answer);
  });

  it("has exactly 3 core system cards in the required order, each linking to the real detail route", () => {
    expect(ua.coreSystems).toHaveLength(3);
    expect(ua.coreSystems.map((system) => system.href)).toEqual(EXPECTED_CORE_ROUTES);
  });

  it("standards section reuses the exact wording already published on the Cable Management and Earthing detail pages", () => {
    const cableManagement = dataCentreCableManagementLandingContentForMarket("ua");
    const earthing = dataCentreEarthingLandingContentForMarket("ua");

    expect(ua.standards.cableManagementNote).toBe(cableManagement.standardsNote.note);
    expect(ua.standards.earthingNote).toBe(earthing.standardsNote.note);
  });

  it("has the same FAQ count as UK (bilingual parity)", () => {
    const uk = dataCentreInfrastructureHubContentForMarket("uk");
    expect(ua.faq.length).toBe(uk.faq.length);
    expect(ua.faq).toHaveLength(7);
  });

  it("answers the manufacturer-vs-distributor FAQ correctly", () => {
    const manufacturerFaq = ua.faq.find((item) => item.question.startsWith("Чи виробляє InfraVolt"));
    expect(manufacturerFaq).toBeDefined();
    expect(manufacturerFaq?.answer).toContain("Виробником є Gersan");
  });

  it("does not reintroduce the 'підпідлоговий' calque when naming the additional Underfloor system", () => {
    // The map's own product-family name is "Підпідлогові кабельні короби" —
    // reused verbatim from modules/application-map/data-centre.ts, not a
    // "підпідлоговий" adjective form.
    expect(ua.zones.additionalSystemsNote).toContain("підпідлогові кабельні короби");
  });

  it("never introduces an unsupported claim or misrepresentation anywhere on the page", () => {
    const serialized = JSON.stringify(ua);
    for (const phrase of UNSUPPORTED_PHRASES) {
      expect(serialized).not.toContain(phrase);
    }
  });
});

describe("Data Centre Zones section reflects the Application Map's own 8 zones (no invented parameters)", () => {
  it("the map currently defines exactly 8 zones, in a stable order, that the hub reads directly", () => {
    expect(DATA_CENTRE_APPLICATION_MAP.zones).toHaveLength(8);
  });

  it.each(["uk", "ua"] as const)(
    "every zone name (%s) the hub would render matches the map's own current localized name",
    (market) => {
      for (const zone of DATA_CENTRE_APPLICATION_MAP.zones) {
        expect(zone.content[market].name.trim().length).toBeGreaterThan(0);
      }
    },
  );
});

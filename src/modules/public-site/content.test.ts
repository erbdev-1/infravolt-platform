import { describe, expect, it } from "vitest";

import { publicSiteContentForMarket } from "./content";

describe("publicSiteContentForMarket — UK footer registered office address", () => {
  it("UK shell carries the registered office label and address lines", () => {
    const uk = publicSiteContentForMarket("uk");

    expect(uk.shell.registeredOffice).toEqual({
      label: "Registered Office",
      lines: [
        "HTS Building, Tyne View Terrace",
        "Wallsend, Tyne and Wear",
        "NE28 6SG, United Kingdom",
      ],
    });
  });

  it("UA shell does not carry a registered office address (UK-only legal detail)", () => {
    const ua = publicSiteContentForMarket("ua");

    expect(ua.shell.registeredOffice).toBeUndefined();
  });
});

describe("publicSiteContentForMarket — UA footer Odesa office address", () => {
  it("UA shell carries the neutral office-address label and the exact Odesa address lines", () => {
    const ua = publicSiteContentForMarket("ua");

    expect(ua.shell.officeAddress).toEqual({
      label: "Офіс в Одесі",
      lines: ["вул. Рішельєвська, 40", "Одеса, Одеська область", "65000, Україна"],
    });
  });

  it("UK shell does not carry an officeAddress field (UA-only)", () => {
    const uk = publicSiteContentForMarket("uk");

    expect(uk.shell.officeAddress).toBeUndefined();
  });
});

describe("publicSiteContentForMarket — homepage Data Centres industry card (Phase 2)", () => {
  it("UK: the Data Centres card now links to the dedicated /data-centres hub, with a truthful custom action label", () => {
    const uk = publicSiteContentForMarket("uk");
    const dataCentresCard = uk.industries.items.find((item) => item.id === "data-centres");

    expect(dataCentresCard?.href).toBe("/data-centres");
    expect(dataCentresCard?.actionLabel).toBe("Explore Data Centre Systems");
    // Title/description/imageAlt are unchanged — only the destination and its label were added.
    expect(dataCentresCard?.title).toBe("Data Centres");
    expect(dataCentresCard?.description).toBe(
      "System coordination for dense, continuity-focused technical environments.",
    );
  });

  it("UA: the Data Centres card links to the same hub with a natural Ukrainian action label, title/description unchanged", () => {
    const ua = publicSiteContentForMarket("ua");
    const dataCentresCard = ua.industries.items.find((item) => item.id === "data-centres");

    expect(dataCentresCard?.href).toBe("/data-centres");
    expect(dataCentresCard?.actionLabel).toBe("Системи для ЦОД");
    expect(dataCentresCard?.title).toBe("Центри обробки даних");
  });

  it("every other industry card keeps its original Application Map destination and no actionLabel override, both markets", () => {
    for (const market of ["uk", "ua"] as const) {
      const content = publicSiteContentForMarket(market);
      const otherCards = content.industries.items.filter((item) => item.id !== "data-centres");

      expect(otherCards).toHaveLength(7);
      for (const card of otherCards) {
        expect(card.href).toMatch(/^\/application-map/);
        expect(card.actionLabel).toBeUndefined();
      }
    }
  });

  it("the separate Featured Application Map homepage CTA still points to /application-map, both markets", () => {
    for (const market of ["uk", "ua"] as const) {
      const content = publicSiteContentForMarket(market);
      expect(content.applicationMap.action.href).toBe("/application-map");
    }
  });
});

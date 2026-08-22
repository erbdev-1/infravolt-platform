import { describe, expect, it } from "vitest";

import { ledLightingHubContentForMarket } from "./content";
import {
  SPECIAL_HAZARDOUS_HERO_FOREGROUND,
  specialHazardousEnvironmentLightingContentForMarket,
} from "./special-hazardous-environment-lighting";

const EXPECTED_FAMILY_SLUGS = [
  "gersan-exproof-led-lighting-systems",
  "gersan-sera-led-greenhouse-luminaires",
  "gersan-tex-led-lighting-systems",
  "gersan-auto-led-lighting-systems",
] as const;

describe("Special & Hazardous Environment Lighting category", () => {
  it("keeps the umbrella category to four distinct catalogue families", () => {
    const content = specialHazardousEnvironmentLightingContentForMarket("uk");

    expect(content.series.map(({ slug }) => slug)).toEqual(EXPECTED_FAMILY_SLUGS);
    expect(content.series.map(({ href }) => href)).toEqual(
      EXPECTED_FAMILY_SLUGS.map(
        (slug) => `/products/led-systems/special-hazardous-environment-lighting/${slug}`,
      ),
    );
    expect(content.series[0]?.description).toContain("GSL EXP-150W");
    expect(content.series[0]?.description).toContain("LED-BUS LDBEXP8");
    expect(content.series[1]?.description).toContain("LED-BUS-S180W");
  });

  it("uses the prepared family product composition in the hero foreground", () => {
    expect(SPECIAL_HAZARDOUS_HERO_FOREGROUND).toBe(
      "/assets/products/led-lighting/category/special&hazardous/hero/special-hazardous-environment-lighting-hero-foreground-products.webp",
    );
  });

  it("represents the category breadth with six full application cards", () => {
    const content = specialHazardousEnvironmentLightingContentForMarket("uk");

    expect(content.applications).toHaveLength(6);
    expect(content.applications.every(({ description }) => Boolean(description))).toBe(true);
    expect(content.applications.map(({ title }) => title)).toContain("Greenhouses");
    expect(content.applications.map(({ title }) => title)).toContain("Vehicle Paint Inspection");
  });

  it("does not publish unsupported universal or certification claims", () => {
    const serialized = JSON.stringify(specialHazardousEnvironmentLightingContentForMarket("uk"));

    expect(serialized).not.toMatch(/ATEX|IECEx|all products are IP66|universal warranty/i);
    expect(serialized).not.toMatch(/365 nm|395 nm|UVA|UVB|UVC/i);
  });

  it("connects the LED hub card to the live category in both markets", () => {
    for (const market of ["uk", "ua"] as const) {
      const category = ledLightingHubContentForMarket(market).categories.find(
        ({ slug }) => slug === "special-hazardous-environment-lighting",
      );

      expect(category?.href).toBe("/products/led-systems/special-hazardous-environment-lighting");
      expect(category?.image).toContain("special-hazardous-environment-lighting-category-card.webp");
    }
  });
});

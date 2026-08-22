import { describe, expect, it } from "vitest";

import { smartLightingAutomationContentForMarket } from "../smart-lighting-automation";
import { gBusPlcAutomationContentForMarket } from "./g-bus-plc-automation";
import { gerLedSmartStreetLightingContentForMarket } from "./ger-led-smart-street-lighting";

const EXPECTED_G_BUS_CODES = [
  "730-RCV",
  "730-RCVRM",
  "730-TRM",
  "730-TRMRM",
  "730-GBUSKP7",
  "730-GBUSTP7",
  "730-GBUSPLADP",
  "730-GBUSPLADPRM",
  "730-INP",
  "730-RCV485",
  "730-DIM",
  "730-GBUSPC",
  "730-GIS",
  "730-HS",
  "730-GBUSTP7SW",
  "730-GBUSPCSW",
  "730-GBUSTDE",
] as const;

const EXPECTED_GSL_CODES = [
  "GSL1 C35W",
  "GSL2 C50W",
  "GSL3 C70W",
  "GSL4 C105W",
  "GSL5 C125W",
  "GSL6 C150W",
  "GSL7 C185W",
  "GSL8 C200W",
  "GSL9 C250W",
] as const;

describe("Smart Lighting & Automation catalogue data", () => {
  it("retains every verified G-BUS stock code without luminaire-only model fields", () => {
    const content = gBusPlcAutomationContentForMarket("uk");

    expect(content.componentSchedule?.items.map(({ code }) => code)).toEqual(EXPECTED_G_BUS_CODES);
    expect(content.models).toBeUndefined();
    expect(content.technicalInformation.map(({ title }) => title)).not.toContain("Luminous Flux");
  });

  it("retains the exact GER-LED C-series schedule and catalogue discrepancy", () => {
    const content = gerLedSmartStreetLightingContentForMarket("uk");

    expect(content.models?.map(({ model }) => model)).toEqual(EXPECTED_GSL_CODES);
    expect(content.models?.find(({ model }) => model === "GSL4 C105W")?.powerW).toBe(100);
    expect(content.controlsIntroduction).toContain("project-dependent");
  });

  it("links both category cards to their live series routes in both markets", () => {
    for (const market of ["uk", "ua"] as const) {
      const hrefs = smartLightingAutomationContentForMarket(market).series.map(({ href }) => href);

      expect(hrefs).toEqual([
        "/products/led-systems/smart-lighting-automation/g-bus-plc-automation",
        "/products/led-systems/smart-lighting-automation/ger-led-smart-street-lighting",
      ]);
    }
  });

  it("omits technical assets on the G-BUS PLC Automation page (control hardware, not a luminaire)", () => {
    for (const market of ["uk", "ua"] as const) {
      const content = gBusPlcAutomationContentForMarket(market);

      expect(content.photometricHeading).toBeUndefined();
      expect(content.technicalAssets).toBeUndefined();
      expect(content.dimensionNote).toBeUndefined();
    }
  });

  it("renders Photometric & Technical Data on the GER-LED Smart Street Lighting page", () => {
    for (const market of ["uk", "ua"] as const) {
      const content = gerLedSmartStreetLightingContentForMarket(market);

      expect(content.photometricHeading).toBeTruthy();
      expect(content.technicalAssets).toHaveLength(2);
      for (const asset of content.technicalAssets ?? []) {
        expect(asset.image).toBeTruthy();
        expect(asset.imageAlt).toBeTruthy();
      }
      expect(content.dimensionNote).toBeTruthy();
    }
  });

  it("renders real application photo cards on the G-BUS PLC Automation page", () => {
    for (const market of ["uk", "ua"] as const) {
      const content = gBusPlcAutomationContentForMarket(market);

      expect(content.applications.length).toBe(4);
      for (const application of content.applications) {
        expect(application.image).toBeDefined();
        expect(application.imageAlt).toBeDefined();
      }
    }
  });

  it("renders real application photo cards on the GER-LED Smart Street Lighting page", () => {
    for (const market of ["uk", "ua"] as const) {
      const content = gerLedSmartStreetLightingContentForMarket(market);

      expect(content.applications.length).toBe(7);
      for (const application of content.applications) {
        expect(application.image).toBeDefined();
        expect(application.imageAlt).toBeDefined();
        expect(application.description).toBeDefined();
      }
    }
  });
});

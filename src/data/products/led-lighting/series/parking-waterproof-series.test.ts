import { describe, expect, it } from "vitest";

import { parkingWaterproofLightingContentForMarket } from "../parking-waterproof-lighting";
import { ledBusEtangeCarparkContentForMarket } from "./led-bus-etange-carpark";
import { ledBusEtanjPcContentForMarket } from "./led-bus-etanj-pc";
import { ledBusStepdimWaterproofContentForMarket } from "./led-bus-stepdim-waterproof";

const ETANGE_CODES = [
  "LED-BUS LDB111", "LED-BUS LDB118", "LED-BUS LDB118-102", "LED-BUS LDB118-120", "LED-BUS LDB118E-102", "LED-BUS LDB210", "LED-BUS LDB211", "LED-BUS LDB212", "LED-BUS LDB212E-120", "LED-BUS LDB213", "LED-BUS LDB213-120", "LED-BUS LDB215", "LED-BUS LDB215-120", "LED-BUS LDB217-102", "LED-BUS LDB218-120", "LED-BUS LDB220-152", "LED-BUS LDB219", "LED-BUS LDB220-120", "LED-BUS LDB225", "LED-BUS LDB227", "LED-BUS LDB322-152", "LED-BUS LDB235", "LED-BUS LDB235-152", "LED-BUS LDB235-350",
] as const;

const STEPDIM_CODES = ["LDB212-120", "LDB217-120", "LDB225-150", "LDB230-150"] as const;

const ETANJ_CODES = [
  "730-LDB11-60/PC", "730-LDB118-60/PC", "730-LDB210-60/PC", "730-LDB211-100/PC", "730-LDB212-100/PC", "730-LDB213-120/PC", "730-LDB215-120/PC", "730-LDB216-120/PC", "730-LDB218-120/PC", "730-LDB217-152/PC", "730-LDB219-120/PC", "730-LDB220-120/PC", "730-LDB225-150/PC", "730-LDB227-150/PC", "730-LDB230-150/PC", "730-LDB235-150/PC", "730-LDB250-150/PC", "730-LDB220-120-SD/PC",
] as const;

describe("Parking & Waterproof catalogue series", () => {
  it("retains every verified Etange Carpark model and reference values", () => {
    const content = ledBusEtangeCarparkContentForMarket("uk");
    expect(content.models?.map(({ model }) => model)).toEqual(ETANGE_CODES);
    expect(content.models?.find(({ model }) => model === "LED-BUS LDB235-350")).toMatchObject({ powerW: 70, luminousFluxLm: "13,000 lm", efficiencyLmW: "185.7 lm/W", voltage: "220–240 Vac", ip: "IP65", weightKg: "4.95 kg" });
  });

  it("keeps StepDIM to its four catalogue models, omits unsupported fields and uses its dedicated technical assets", () => {
    const content = ledBusStepdimWaterproofContentForMarket("uk");
    expect(content.models?.map(({ model }) => model)).toEqual(STEPDIM_CODES);
    expect(content.models?.every(({ luminousFluxLm, ip, weightKg }) => luminousFluxLm === undefined && ip === undefined && weightKg === undefined)).toBe(true);
    expect(content.familyTechnicalSection?.settings).toHaveLength(5);
    expect(content.photometricHeading).toBe("Photometric & Technical Data");
    expect(content.technicalAssets?.map(({ title, image }) => ({ title, image }))).toEqual([
      {
        title: "Photometric Data",
        image: "/assets/products/led-lighting/category/parking-waterproof/photometric/stepdim-photometric-data.png",
      },
      {
        title: "Technical Data",
        image: "/assets/products/led-lighting/category/parking-waterproof/technical/stepdim-technical-data.png",
      },
    ]);
    expect(content.familyTechnicalSection?.assets.map(({ image }) => image)).toEqual([
      "/assets/products/led-lighting/category/parking-waterproof/technical/stepdim/led-bus-stepdim-waterproof-control-settings.png",
      "/assets/products/led-lighting/category/parking-waterproof/technical/stepdim/led-bus-stepdim-waterproof-component-detail.png",
      "/assets/products/led-lighting/category/parking-waterproof/technical/stepdim/led-bus-stepdim-waterproof-sensor-coverage.png",
      "/assets/products/led-lighting/category/parking-waterproof/technical/stepdim/led-bus-stepdim-waterproof-led-module-installation.png",
    ]);
  });

  it("retains every verified Etanj PC code and does not display the anomalous CRI field", () => {
    const content = ledBusEtanjPcContentForMarket("uk");
    expect(content.models?.map(({ model }) => model)).toEqual(ETANJ_CODES);
    expect(content.models?.find(({ model }) => model === "730-LDB225-150/PC")).toMatchObject({ powerW: 50, luminousFluxLm: "7,250 lm", efficiencyLmW: "145 lm/W", voltage: "220–240 Vac", ip: "IP65" });
    expect(content.modelsColumns?.cri).toBeUndefined();
    expect(content.models?.every(({ cri }) => cri === undefined)).toBe(true);
  });

  it("links all category cards to live family routes in both markets", () => {
    const expected = [
      "/products/led-systems/parking-waterproof-lighting/led-bus-etange-carpark",
      "/products/led-systems/parking-waterproof-lighting/led-bus-stepdim-waterproof",
      "/products/led-systems/parking-waterproof-lighting/led-bus-etanj-pc",
    ];
    for (const market of ["uk", "ua"] as const) {
      expect(parkingWaterproofLightingContentForMarket(market).series.map(({ href }) => href)).toEqual(expected);
    }
  });

  it("uses only family-specific technical assets and never a catalogue table image", () => {
    for (const content of [ledBusEtangeCarparkContentForMarket("uk"), ledBusEtanjPcContentForMarket("uk")]) {
      expect(content.technicalAssets?.map(({ image }) => image)).toHaveLength(2);
      expect(content.technicalAssets?.some(({ image }) => image.toLowerCase().includes("table"))).toBe(false);
    }
  });
});

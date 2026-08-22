import { describe, expect, it } from "vitest";

import {
  kmxLightingConfigurationsForMarket,
  projectorLightingConfigurationsForMarket,
  streetLightingConfigurationsForMarket,
  wallWasherSeriesContentForMarket,
} from "./outdoor-infrastructure-series";

describe("GER-LED Wall Washer catalogue data", () => {
  it("preserves the complete eight-row catalogue schedule", () => {
    const content = wallWasherSeriesContentForMarket("uk");

    expect(content.models).toEqual([
      expect.objectContaining({ model: "GSL-WWM12", powerW: 6, luminousFluxLm: "1,080 lm", dimensions: "19 cm", weightKg: "0.8 kg" }),
      expect.objectContaining({ model: "GSL-WWM18", powerW: 12, luminousFluxLm: "1,440 lm", dimensions: "34 cm", weightKg: "1.3 kg" }),
      expect.objectContaining({ model: "GSL-WWM24", powerW: 18, luminousFluxLm: "2,160 lm", dimensions: "49 cm", weightKg: "1.8 kg" }),
      expect.objectContaining({ model: "GSL-WWM36", powerW: 24, luminousFluxLm: "2,880 lm", dimensions: "64 cm", weightKg: "2.6 kg" }),
      expect.objectContaining({ model: "GSL-WWM48", powerW: 36, luminousFluxLm: "4,320 lm", dimensions: "94 cm", weightKg: "3.1 kg" }),
      expect.objectContaining({ model: "GSL-WWMX36-DMX", powerW: 48, luminousFluxLm: "5,760 lm", dimensions: "124 cm", weightKg: "3.6 kg" }),
      expect.objectContaining({ model: "GSL-WWMX45-DMX22", powerW: 36, luminousFluxLm: "4PX", dimensions: "94 cm", weightKg: "3.1 kg" }),
      expect.objectContaining({ model: "GSL-WWMX45-DMX22", powerW: 45, luminousFluxLm: "5PX", dimensions: "116 cm", weightKg: "3.0 kg" }),
    ]);
  });

  it("keeps source-backed family specifications and protection caveat", () => {
    const content = wallWasherSeriesContentForMarket("uk");
    const serialized = JSON.stringify(content);

    expect(serialized).toContain("6–48 W");
    expect(serialized).toContain("19–124 cm");
    expect(serialized).toContain("−30 °C to +50 °C");
    expect(serialized).toContain("IK08");
    expect(serialized).toContain("Ra >85");
    expect(serialized).toContain("3-step MacAdam");
    expect(serialized).toContain("1–10V");
    expect(serialized).toContain("Up to 12 m");
    expect(content.sourceNote).toContain("IP20 / IP44 / IP66 configuration icons");
    expect(content.sourceNote).toContain("not universal ratings");
  });
});

describe("Outdoor family assurance data", () => {
  it("shows only family-backed protection ratings in the compact assurance row", () => {
    const street = streetLightingConfigurationsForMarket("uk").map(({ content }) => content);
    const projector = projectorLightingConfigurationsForMarket("uk").map(({ content }) => content);
    const kmx = kmxLightingConfigurationsForMarket("uk").map(({ content }) => content);
    const wallWasher = wallWasherSeriesContentForMarket("uk");

    for (const content of [...street, ...projector]) {
      expect(content.technicalAssurance).toEqual([
        { icon: "compliance", label: "Compliance", value: "IP66" },
        { icon: "warranty", label: "Warranty", value: "7-Year Warranty" },
      ]);
    }

    for (const content of kmx) {
      expect(content.technicalAssurance).toEqual([
        { icon: "colour-finish", label: "Colour & Finish", value: "Aluminium die-cast body · fabricated steel front frame" },
        { icon: "compliance", label: "Compliance", value: "IP66 · IK08" },
        { icon: "warranty", label: "Warranty", value: "7-Year Warranty" },
      ]);
    }

    expect(wallWasher.technicalAssurance).toEqual([
      { icon: "colour-finish", label: "Colour & Finish", value: "Aluminium extrusion body" },
      { icon: "compliance", label: "Compliance", value: "IP66 · IK08" },
      { icon: "warranty", label: "Warranty", value: "5-Year Warranty" },
    ]);

    const assuranceText = JSON.stringify([
      ...street,
      ...projector,
      ...kmx,
      wallWasher,
    ].flatMap(({ technicalAssurance }) => technicalAssurance));

    expect(assuranceText).not.toMatch(/RAL|RoHS|\bCE\b/);
  });
});

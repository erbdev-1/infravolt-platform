import { describe, expect, it } from "vitest";

import {
  RENEWABLE_ENERGY_APPLICATION_MAP,
  RENEWABLE_ENERGY_ZONE_IDS,
} from "./renewable-energy";
import { PRODUCT_FAMILY_IDS } from "./types";
import { validateApplicationMap } from "./validation";

function findZone(id: string) {
  const zone = RENEWABLE_ENERGY_APPLICATION_MAP.zones.find(
    (candidate) => candidate.id === id,
  );

  if (!zone) {
    throw new Error(`Zone "${id}" not found`);
  }

  return zone;
}

function busbarHotspotsIn(zoneId: string) {
  return findZone(zoneId).hotspots.filter(
    (hotspot) => hotspot.productFamilyId === "busbar",
  );
}

function realBusbarProductName(hotspot: {
  nameOverride?: Readonly<Record<"uk" | "ua", string>>;
}) {
  return hotspot.nameOverride?.uk;
}

describe("RENEWABLE_ENERGY_APPLICATION_MAP", () => {
  it("passes all static invariant checks", () => {
    const errors = validateApplicationMap(
      RENEWABLE_ENERGY_APPLICATION_MAP,
      RENEWABLE_ENERGY_ZONE_IDS,
    );

    expect(errors).toEqual([]);
  });

  it("defines exactly the six canonical product families, in the stable order", () => {
    const ids = RENEWABLE_ENERGY_APPLICATION_MAP.productFamilies.map(
      (family) => family.id,
    );

    expect(ids).toEqual([...PRODUCT_FAMILY_IDS]);
  });

  it("defines exactly the eight canonical zones", () => {
    const ids = RENEWABLE_ENERGY_APPLICATION_MAP.zones.map((zone) => zone.id);

    expect(new Set(ids)).toEqual(new Set(RENEWABLE_ENERGY_ZONE_IDS));
    expect(ids).toHaveLength(8);
  });

  it("gives every UK product-family entry a matching UA equivalent", () => {
    for (const family of RENEWABLE_ENERGY_APPLICATION_MAP.productFamilies) {
      expect(family.content.uk.name.trim()).not.toBe("");
      expect(family.content.ua.name.trim()).not.toBe("");
      expect(family.content.uk.actions.length).toBe(
        family.content.ua.actions.length,
      );
    }
  });

  it("gives every hotspot a UK and UA accessible label and usage explanation", () => {
    for (const zone of RENEWABLE_ENERGY_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.accessibleLabel.uk.trim()).not.toBe("");
        expect(hotspot.accessibleLabel.ua.trim()).not.toBe("");
        expect(hotspot.usedHereFor.uk.trim()).not.toBe("");
        expect(hotspot.usedHereFor.ua.trim()).not.toBe("");
      }
    }
  });

  it("stores every hotspot coordinate (zone and overview) as a percentage between 0 and 100", () => {
    for (const zone of RENEWABLE_ENERGY_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.x).toBeGreaterThanOrEqual(0);
        expect(hotspot.x).toBeLessThanOrEqual(100);
        expect(hotspot.y).toBeGreaterThanOrEqual(0);
        expect(hotspot.y).toBeLessThanOrEqual(100);
      }
    }

    for (const hotspot of RENEWABLE_ENERGY_APPLICATION_MAP.overview.hotspots) {
      expect(hotspot.x).toBeGreaterThanOrEqual(0);
      expect(hotspot.x).toBeLessThanOrEqual(100);
      expect(hotspot.y).toBeGreaterThanOrEqual(0);
      expect(hotspot.y).toBeLessThanOrEqual(100);
    }
  });

  it("references only canonical public media assets, and never a .webp.png path", () => {
    const imagePaths = [
      RENEWABLE_ENERGY_APPLICATION_MAP.overview.image,
      ...RENEWABLE_ENERGY_APPLICATION_MAP.zones.map((zone) => zone.image),
    ];

    for (const imagePath of imagePaths) {
      expect(imagePath.endsWith(".webp.png")).toBe(false);
      expect(imagePath).toMatch(
        /^(?:\/assets|https:\/\/[^/]+)\/application-map\/[a-z0-9./-]+\.(?:png|webp)$/,
      );
    }
  });

  it("keeps every busbar hotspot's accessible label generic (\"Busbar Systems\"), never a product code", () => {
    for (const zone of RENEWABLE_ENERGY_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        if (hotspot.productFamilyId !== "busbar") {
          continue;
        }

        expect(hotspot.accessibleLabel.uk.startsWith("Busbar Systems")).toBe(true);
      }
    }
  });

  it("no zone automatically receives every one of the six global categories", () => {
    for (const zone of RENEWABLE_ENERGY_APPLICATION_MAP.zones) {
      expect(zone.approvedProductFamilyIds.length).toBeLessThan(6);
    }
  });

  it("overview contains exactly eight zone hotspots, numbered by zone, with no product-family hotspots", () => {
    const zoneIds = new Set(
      RENEWABLE_ENERGY_APPLICATION_MAP.zones.map((zone) => zone.id),
    );

    expect(RENEWABLE_ENERGY_APPLICATION_MAP.overview.hotspots).toHaveLength(8);

    for (const hotspot of RENEWABLE_ENERGY_APPLICATION_MAP.overview.hotspots) {
      expect(zoneIds.has(hotspot.zoneId)).toBe(true);
      expect(hotspot).not.toHaveProperty("productFamilyId");
    }

    const overviewZoneIds = new Set(
      RENEWABLE_ENERGY_APPLICATION_MAP.overview.hotspots.map(
        (hotspot) => hotspot.zoneId,
      ),
    );

    expect(overviewZoneIds).toEqual(zoneIds);
  });

  describe("Categories present/absent and busbar product mapping", () => {
    it("Main Electrical Room: category 2 opens GGD Medium Power", () => {
      const hotspots = busbarHotspotsIn("main-electrical-room");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GGD Medium Power Busbar");
    });

    it("BESS Power Conversion & Distribution: category 2 opens GGD Medium Power", () => {
      const hotspots = busbarHotspotsIn("bess-power-conversion-distribution");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GGD Medium Power Busbar");
    });

    it("Solar PV Inverter & Transformer Interface: category 2 opens GS Super Compact, no LED", () => {
      const zone = findZone("solar-inverter-transformer-interface");
      const hotspots = busbarHotspotsIn("solar-inverter-transformer-interface");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GS Super Compact");
      expect(zone.approvedProductFamilyIds).not.toContain("led-systems");
    });

    it("Wind Turbine Tower Base & Converter Room: category 2 opens GS Super Compact", () => {
      const hotspots = busbarHotspotsIn("wind-turbine-tower-base");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GS Super Compact");
    });

    it("Hydro Turbine & Pump Hall: category 2 opens GR Cast Resin", () => {
      const hotspots = busbarHotspotsIn("hydro-turbine-pump-hall");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GR Cast Resin Busbar");
    });

    it("Grid Connection Substation has no Busbar Systems category", () => {
      const zone = findZone("grid-connection-substation");

      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
      expect(
        zone.hotspots.some((hotspot) => hotspot.productFamilyId === "busbar"),
      ).toBe(false);
    });

    it("Control & Monitoring Building: category 2 opens GNL Lighting Busbar, category 3 present, category 2 and 5 differ", () => {
      const zone = findZone("control-monitoring-building");
      const busbar = zone.hotspots.filter((h) => h.productFamilyId === "busbar");
      const underfloor = zone.hotspots.filter(
        (h) => h.productFamilyId === "underfloor",
      );
      const led = zone.hotspots.filter((h) => h.productFamilyId === "led-systems");

      expect(busbar).toHaveLength(1);
      expect(realBusbarProductName(busbar[0]!)).toBe("GNL Lighting Busbar");
      expect(underfloor).toHaveLength(1);
      expect(led).toHaveLength(1);
      expect(busbar[0]!.id).not.toBe(led[0]!.id);
    });

    it("EV Charging & Renewable Integration has no Busbar Systems category and opens EV Charging Systems", () => {
      const zone = findZone("ev-charging-integration");
      const evHotspot = zone.hotspots.find(
        (hotspot) => hotspot.productFamilyId === "ev-charging",
      );

      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
      expect(evHotspot).toBeDefined();
    });
  });
});

import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  COMMERCIAL_BUILDING_APPLICATION_MAP,
  COMMERCIAL_BUILDING_ZONE_IDS,
} from "./commercial-building";
import { PRODUCT_FAMILY_IDS } from "./types";
import { validateApplicationMap } from "./validation";

const REPO_ROOT = join(__dirname, "..", "..", "..");

function findZone(id: string) {
  const zone = COMMERCIAL_BUILDING_APPLICATION_MAP.zones.find(
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

describe("COMMERCIAL_BUILDING_APPLICATION_MAP", () => {
  it("passes all static invariant checks", () => {
    const errors = validateApplicationMap(
      COMMERCIAL_BUILDING_APPLICATION_MAP,
      COMMERCIAL_BUILDING_ZONE_IDS,
    );

    expect(errors).toEqual([]);
  });

  it("defines exactly the six canonical product families, in the stable order", () => {
    const ids = COMMERCIAL_BUILDING_APPLICATION_MAP.productFamilies.map(
      (family) => family.id,
    );

    expect(ids).toEqual([...PRODUCT_FAMILY_IDS]);
  });

  it("defines exactly the seven canonical zones", () => {
    const ids = COMMERCIAL_BUILDING_APPLICATION_MAP.zones.map((zone) => zone.id);

    expect(new Set(ids)).toEqual(new Set(COMMERCIAL_BUILDING_ZONE_IDS));
    expect(ids).toHaveLength(7);
  });

  it("gives every UK product-family entry a matching UA equivalent", () => {
    for (const family of COMMERCIAL_BUILDING_APPLICATION_MAP.productFamilies) {
      expect(family.content.uk.name.trim()).not.toBe("");
      expect(family.content.ua.name.trim()).not.toBe("");
      expect(family.content.uk.actions.length).toBe(
        family.content.ua.actions.length,
      );
    }
  });

  it("gives every hotspot a UK and UA accessible label and usage explanation", () => {
    for (const zone of COMMERCIAL_BUILDING_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.accessibleLabel.uk.trim()).not.toBe("");
        expect(hotspot.accessibleLabel.ua.trim()).not.toBe("");
        expect(hotspot.usedHereFor.uk.trim()).not.toBe("");
        expect(hotspot.usedHereFor.ua.trim()).not.toBe("");
      }
    }
  });

  it("stores every hotspot coordinate (zone and overview) as a percentage between 0 and 100", () => {
    for (const zone of COMMERCIAL_BUILDING_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.x).toBeGreaterThanOrEqual(0);
        expect(hotspot.x).toBeLessThanOrEqual(100);
        expect(hotspot.y).toBeGreaterThanOrEqual(0);
        expect(hotspot.y).toBeLessThanOrEqual(100);
      }
    }

    for (const hotspot of COMMERCIAL_BUILDING_APPLICATION_MAP.overview.hotspots) {
      expect(hotspot.x).toBeGreaterThanOrEqual(0);
      expect(hotspot.x).toBeLessThanOrEqual(100);
      expect(hotspot.y).toBeGreaterThanOrEqual(0);
      expect(hotspot.y).toBeLessThanOrEqual(100);
    }
  });

  it("references only image assets that exist on disk", () => {
    const imagePaths = [
      COMMERCIAL_BUILDING_APPLICATION_MAP.overview.image,
      ...COMMERCIAL_BUILDING_APPLICATION_MAP.zones.map((zone) => zone.image),
    ];

    for (const imagePath of imagePaths) {
      const absolutePath = join(REPO_ROOT, "public", imagePath);

      expect(existsSync(absolutePath), `Missing asset: ${imagePath}`).toBe(true);
    }
  });

  it("keeps every busbar hotspot's accessible label generic (\"Busbar Systems\"), never a product code", () => {
    for (const zone of COMMERCIAL_BUILDING_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        if (hotspot.productFamilyId !== "busbar") {
          continue;
        }

        expect(hotspot.accessibleLabel.uk.startsWith("Busbar Systems")).toBe(true);
      }
    }
  });

  it("no zone automatically receives every one of the six global categories", () => {
    for (const zone of COMMERCIAL_BUILDING_APPLICATION_MAP.zones) {
      expect(zone.approvedProductFamilyIds.length).toBeLessThan(6);
    }
  });

  it("never maps GR Cast Resin anywhere in this sector", () => {
    for (const zone of COMMERCIAL_BUILDING_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(realBusbarProductName(hotspot)).not.toBe("GR Cast Resin Busbar");
      }
    }
  });

  it("overview contains only zone hotspots, one per zone, no product-family numbers", () => {
    const zoneIds = new Set(
      COMMERCIAL_BUILDING_APPLICATION_MAP.zones.map((zone) => zone.id),
    );

    expect(COMMERCIAL_BUILDING_APPLICATION_MAP.overview.hotspots).toHaveLength(7);

    for (const hotspot of COMMERCIAL_BUILDING_APPLICATION_MAP.overview.hotspots) {
      expect(zoneIds.has(hotspot.zoneId)).toBe(true);
      expect(hotspot).not.toHaveProperty("productFamilyId");
    }

    const overviewZoneIds = new Set(
      COMMERCIAL_BUILDING_APPLICATION_MAP.overview.hotspots.map(
        (hotspot) => hotspot.zoneId,
      ),
    );

    expect(overviewZoneIds).toEqual(zoneIds);
  });

  it("Vertical Riser / Service Shaft overview hotspot targets the right-hand side of the overview image", () => {
    const riserHotspot = COMMERCIAL_BUILDING_APPLICATION_MAP.overview.hotspots.find(
      (hotspot) => hotspot.zoneId === "vertical-riser-service-shaft",
    );

    expect(riserHotspot).toBeDefined();
    expect(riserHotspot!.x).toBeGreaterThan(75);
  });

  describe("Categories present/absent and busbar product mapping", () => {
    it("Main Electrical Room opens GGD Medium Power for category 2", () => {
      const zone = findZone("main-electrical-room");
      const hotspots = busbarHotspotsIn("main-electrical-room");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining([
          "cable-management",
          "busbar",
          "earthing-lightning",
          "led-systems",
        ]),
      );
      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GGD Medium Power Busbar");
    });

    it("Office Floor & Lighting opens GNL (LEDBUS) for category 2 and keeps LED Systems and Underfloor separate", () => {
      const zone = findZone("office-floor-lighting");
      const busbar = zone.hotspots.filter((h) => h.productFamilyId === "busbar");
      const underfloor = zone.hotspots.filter(
        (h) => h.productFamilyId === "underfloor",
      );
      const led = zone.hotspots.filter((h) => h.productFamilyId === "led-systems");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining([
          "cable-management",
          "busbar",
          "underfloor",
          "led-systems",
        ]),
      );
      expect(busbar).toHaveLength(1);
      expect(realBusbarProductName(busbar[0]!)).toBe("GNL Lighting Busbar");
      expect(underfloor).toHaveLength(1);
      expect(led).toHaveLength(1);
      expect(busbar[0]!.id).not.toBe(led[0]!.id);
    });

    it("Underfloor Distribution has no Busbar Systems hotspot or selector", () => {
      const zone = findZone("underfloor-distribution");

      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
      expect(
        zone.hotspots.some((hotspot) => hotspot.productFamilyId === "busbar"),
      ).toBe(false);
      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining(["cable-management", "underfloor", "earthing-lightning"]),
      );
    });

    it("Vertical Riser / Service Shaft opens GGD Medium Power for category 2 and uses its own dedicated image", () => {
      const zone = findZone("vertical-riser-service-shaft");
      const hotspots = busbarHotspotsIn("vertical-riser-service-shaft");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GGD Medium Power Busbar");
      expect(zone.image).toContain("vertical-riser-service-shaft");
    });

    it("Rooftop Plant has no Busbar Systems and no GR Cast Resin", () => {
      const zone = findZone("rooftop-plant");

      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining(["cable-management", "earthing-lightning"]),
      );
    });

    it("External Utilities / Building Service Yard opens GS Super Compact for category 2, never GGD/GR/LEDBUS", () => {
      const hotspots = busbarHotspotsIn("external-utilities-yard");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GS Super Compact");
    });

    it("Parking & EV Charging opens EV Charging Systems, has no Busbar Systems, and the charger hotspot targets the charger body id", () => {
      const zone = findZone("parking-ev-charging");
      const evHotspot = zone.hotspots.find(
        (hotspot) => hotspot.productFamilyId === "ev-charging",
      );

      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
      expect(zone.approvedProductFamilyIds).toContain("ev-charging");
      expect(evHotspot).toBeDefined();
      expect(evHotspot!.id).toBe("parking-ev-charging-ev-charging");
    });
  });
});

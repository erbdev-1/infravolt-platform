import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  INFRASTRUCTURE_UTILITIES_APPLICATION_MAP,
  INFRASTRUCTURE_UTILITIES_ZONE_IDS,
} from "./infrastructure-utilities";
import { PRODUCT_FAMILY_IDS } from "./types";
import { validateApplicationMap } from "./validation";

const REPO_ROOT = join(__dirname, "..", "..", "..");

function findZone(id: string) {
  const zone = INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.zones.find(
    (candidate) => candidate.id === id,
  );

  if (!zone) {
    throw new Error(`Zone "${id}" not found`);
  }

  return zone;
}

function familyIdsIn(zoneId: string) {
  return findZone(zoneId).hotspots.map((hotspot) => hotspot.productFamilyId);
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

describe("INFRASTRUCTURE_UTILITIES_APPLICATION_MAP", () => {
  it("passes all static invariant checks", () => {
    const errors = validateApplicationMap(
      INFRASTRUCTURE_UTILITIES_APPLICATION_MAP,
      INFRASTRUCTURE_UTILITIES_ZONE_IDS,
    );

    expect(errors).toEqual([]);
  });

  it("defines exactly the six canonical product families, in the stable order", () => {
    const ids = INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.productFamilies.map(
      (family) => family.id,
    );

    expect(ids).toEqual([...PRODUCT_FAMILY_IDS]);
  });

  it("defines exactly the eight canonical zones", () => {
    const ids = INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.zones.map(
      (zone) => zone.id,
    );

    expect(new Set(ids)).toEqual(new Set(INFRASTRUCTURE_UTILITIES_ZONE_IDS));
    expect(ids).toHaveLength(8);
  });

  it("gives every UK product-family entry a matching UA equivalent", () => {
    for (const family of INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.productFamilies) {
      expect(family.content.uk.name.trim()).not.toBe("");
      expect(family.content.ua.name.trim()).not.toBe("");
      expect(family.content.uk.actions.length).toBe(
        family.content.ua.actions.length,
      );
    }
  });

  it("gives every hotspot a UK and UA accessible label and usage explanation", () => {
    for (const zone of INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.accessibleLabel.uk.trim()).not.toBe("");
        expect(hotspot.accessibleLabel.ua.trim()).not.toBe("");
        expect(hotspot.usedHereFor.uk.trim()).not.toBe("");
        expect(hotspot.usedHereFor.ua.trim()).not.toBe("");
      }
    }
  });

  it("stores every hotspot coordinate (zone and overview) as a percentage between 0 and 100", () => {
    for (const zone of INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.x).toBeGreaterThanOrEqual(0);
        expect(hotspot.x).toBeLessThanOrEqual(100);
        expect(hotspot.y).toBeGreaterThanOrEqual(0);
        expect(hotspot.y).toBeLessThanOrEqual(100);
      }
    }

    for (const hotspot of INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.overview
      .hotspots) {
      expect(hotspot.x).toBeGreaterThanOrEqual(0);
      expect(hotspot.x).toBeLessThanOrEqual(100);
      expect(hotspot.y).toBeGreaterThanOrEqual(0);
      expect(hotspot.y).toBeLessThanOrEqual(100);
    }
  });

  it("references only image assets that exist on disk", () => {
    const imagePaths = [
      INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.overview.image,
      ...INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.zones.map((zone) => zone.image),
    ];

    for (const imagePath of imagePaths) {
      const absolutePath = join(REPO_ROOT, "public", imagePath);

      expect(existsSync(absolutePath), `Missing asset: ${imagePath}`).toBe(
        true,
      );
    }
  });

  it("keeps every busbar hotspot's accessible label generic (\"Busbar Systems\"), never a product code", () => {
    for (const zone of INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        if (hotspot.productFamilyId !== "busbar") {
          continue;
        }

        expect(hotspot.accessibleLabel.uk.startsWith("Busbar Systems")).toBe(
          true,
        );
      }
    }
  });

  it("no zone automatically receives every one of the six global categories", () => {
    for (const zone of INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.zones) {
      expect(zone.approvedProductFamilyIds.length).toBeLessThan(6);
    }
  });

  it("never shows EV Charging Systems anywhere in this sector", () => {
    for (const zone of INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.zones) {
      expect(zone.approvedProductFamilyIds).not.toContain("ev-charging");

      for (const hotspot of zone.hotspots) {
        expect(hotspot.productFamilyId).not.toBe("ev-charging");
      }
    }
  });

  describe("Categories present/absent match the final zone-to-product mapping", () => {
    it("Water Treatment Plant has 1, 4, 5 and no busbar/underfloor/EV", () => {
      const zone = findZone("water-treatment-plant");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining(["cable-management", "earthing-lightning", "led-systems"]),
      );
      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
      expect(zone.approvedProductFamilyIds).not.toContain("underfloor");
    });

    it("Pumping Station has 1, 2, 4, 5 and Busbar opens GR Cast Resin", () => {
      const zone = findZone("pumping-station");
      const hotspots = busbarHotspotsIn("pumping-station");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining([
          "cable-management",
          "busbar",
          "earthing-lightning",
          "led-systems",
        ]),
      );
      expect(zone.approvedProductFamilyIds).not.toContain("underfloor");
      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GR Cast Resin Busbar");
    });

    it("Power Distribution Building has 1, 2, 4, 5 and Busbar opens GGD Medium Power", () => {
      const zone = findZone("power-distribution-building");
      const hotspots = busbarHotspotsIn("power-distribution-building");

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

    it("Transformer Connection has 1, 2, 4 only and Busbar opens GS Super Compact", () => {
      const zone = findZone("transformer-connection");
      const hotspots = busbarHotspotsIn("transformer-connection");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining(["cable-management", "busbar", "earthing-lightning"]),
      );
      expect(zone.approvedProductFamilyIds).not.toContain("underfloor");
      expect(zone.approvedProductFamilyIds).not.toContain("led-systems");
      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GS Super Compact");
    });

    it("Electrical Substation Yard has 1 and 4 only, no busbar", () => {
      const zone = findZone("electrical-substation-yard");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining(["cable-management", "earthing-lightning"]),
      );
      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
    });

    it("Water Storage & Tanks has 1 and 4 only, no busbar/underfloor/led/EV", () => {
      const zone = findZone("water-storage-tanks");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining(["cable-management", "earthing-lightning"]),
      );
      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
      expect(zone.approvedProductFamilyIds).not.toContain("led-systems");
    });

    it("Outdoor Infrastructure has 1 and 5 only", () => {
      const zone = findZone("outdoor-infrastructure");
      const familyIds = familyIdsIn("outdoor-infrastructure");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining(["cable-management", "led-systems"]),
      );
      expect(zone.approvedProductFamilyIds).not.toContain("earthing-lightning");
      expect(familyIds).not.toContain("earthing-lightning");
    });

    it("Control & Operations Building has 1, 2, 3, 4, 5 with Busbar opening GNL Lighting Busbar, separate from LED Systems", () => {
      const zone = findZone("control-operations-building");
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
          "earthing-lightning",
          "led-systems",
        ]),
      );
      expect(busbar).toHaveLength(1);
      expect(realBusbarProductName(busbar[0]!)).toBe("GNL Lighting Busbar");
      expect(underfloor).toHaveLength(1);
      expect(led).toHaveLength(1);
      expect(busbar[0]!.id).not.toBe(led[0]!.id);
    });
  });

  it("overview contains only zone hotspots, one per zone, each referencing a real zone", () => {
    const zoneIds = new Set(
      INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.zones.map((zone) => zone.id),
    );

    for (const hotspot of INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.overview
      .hotspots) {
      expect(zoneIds.has(hotspot.zoneId)).toBe(true);
    }

    expect(
      INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.overview.hotspots,
    ).toHaveLength(8);

    const overviewZoneIds = new Set(
      INFRASTRUCTURE_UTILITIES_APPLICATION_MAP.overview.hotspots.map(
        (hotspot) => hotspot.zoneId,
      ),
    );

    expect(overviewZoneIds).toEqual(zoneIds);
  });
});

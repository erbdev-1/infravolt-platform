import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP,
  TRANSPORT_INFRASTRUCTURE_ZONE_IDS,
} from "./transport-infrastructure";
import { PRODUCT_FAMILY_IDS } from "./types";
import { validateApplicationMap } from "./validation";

const REPO_ROOT = join(__dirname, "..", "..", "..");

function findZone(id: string) {
  const zone = TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.zones.find(
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

describe("TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP", () => {
  it("passes all static invariant checks", () => {
    const errors = validateApplicationMap(
      TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP,
      TRANSPORT_INFRASTRUCTURE_ZONE_IDS,
    );

    expect(errors).toEqual([]);
  });

  it("defines exactly the six canonical product families, in the stable order", () => {
    const ids = TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.productFamilies.map(
      (family) => family.id,
    );

    expect(ids).toEqual([...PRODUCT_FAMILY_IDS]);
  });

  it("defines exactly the seven currently-available zones (Electrical Riser / Service Shaft pending a real image asset)", () => {
    const ids = TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.zones.map((zone) => zone.id);

    expect(new Set(ids)).toEqual(new Set(TRANSPORT_INFRASTRUCTURE_ZONE_IDS));
    expect(ids).toHaveLength(7);
    expect(ids).not.toContain("electrical-riser-service-shaft");
  });

  it("gives every UK product-family entry a matching UA equivalent", () => {
    for (const family of TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.productFamilies) {
      expect(family.content.uk.name.trim()).not.toBe("");
      expect(family.content.ua.name.trim()).not.toBe("");
      expect(family.content.uk.actions.length).toBe(
        family.content.ua.actions.length,
      );
    }
  });

  it("gives every hotspot a UK and UA accessible label and usage explanation", () => {
    for (const zone of TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.accessibleLabel.uk.trim()).not.toBe("");
        expect(hotspot.accessibleLabel.ua.trim()).not.toBe("");
        expect(hotspot.usedHereFor.uk.trim()).not.toBe("");
        expect(hotspot.usedHereFor.ua.trim()).not.toBe("");
      }
    }
  });

  it("stores every hotspot coordinate (zone and overview) as a percentage between 0 and 100", () => {
    for (const zone of TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.x).toBeGreaterThanOrEqual(0);
        expect(hotspot.x).toBeLessThanOrEqual(100);
        expect(hotspot.y).toBeGreaterThanOrEqual(0);
        expect(hotspot.y).toBeLessThanOrEqual(100);
      }
    }

    for (const hotspot of TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.overview
      .hotspots) {
      expect(hotspot.x).toBeGreaterThanOrEqual(0);
      expect(hotspot.x).toBeLessThanOrEqual(100);
      expect(hotspot.y).toBeGreaterThanOrEqual(0);
      expect(hotspot.y).toBeLessThanOrEqual(100);
    }
  });

  it("references only image assets that exist on disk, and never a .webp.png path", () => {
    const imagePaths = [
      TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.overview.image,
      ...TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.zones.map((zone) => zone.image),
    ];

    for (const imagePath of imagePaths) {
      expect(imagePath.endsWith(".webp.png")).toBe(false);

      const absolutePath = join(REPO_ROOT, "public", imagePath);

      expect(existsSync(absolutePath), `Missing asset: ${imagePath}`).toBe(true);
    }
  });

  it("keeps every busbar hotspot's accessible label generic (\"Busbar Systems\"), never a product code", () => {
    for (const zone of TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        if (hotspot.productFamilyId !== "busbar") {
          continue;
        }

        expect(hotspot.accessibleLabel.uk.startsWith("Busbar Systems")).toBe(true);
      }
    }
  });

  it("no zone automatically receives every one of the six global categories", () => {
    for (const zone of TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.zones) {
      expect(zone.approvedProductFamilyIds.length).toBeLessThan(6);
    }
  });

  it("overview contains only zone hotspots, one per zone, no product-family numbers", () => {
    const zoneIds = new Set(
      TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.zones.map((zone) => zone.id),
    );

    for (const hotspot of TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.overview
      .hotspots) {
      expect(zoneIds.has(hotspot.zoneId)).toBe(true);
      expect(hotspot).not.toHaveProperty("productFamilyId");
    }

    expect(
      TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.overview.hotspots,
    ).toHaveLength(7);

    const overviewZoneIds = new Set(
      TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP.overview.hotspots.map(
        (hotspot) => hotspot.zoneId,
      ),
    );

    expect(overviewZoneIds).toEqual(zoneIds);
  });

  describe("Categories present/absent and busbar product mapping", () => {
    it("Main Electrical Room: 1, 2, 4, 5 present; 3 and 6 absent; category 2 opens GGD Medium Power", () => {
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
      expect(zone.approvedProductFamilyIds).not.toContain("underfloor");
      expect(zone.approvedProductFamilyIds).not.toContain("ev-charging");
      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GGD Medium Power Busbar");
    });

    it("Terminal Concourse & Passenger Services: 1, 2, 3, 5 present; category 2 opens GNL Lighting Busbar; 2 and 5 differ", () => {
      const zone = findZone("terminal-concourse-passenger-services");
      const busbar = zone.hotspots.filter((h) => h.productFamilyId === "busbar");
      const underfloor = zone.hotspots.filter(
        (h) => h.productFamilyId === "underfloor",
      );
      const led = zone.hotspots.filter((h) => h.productFamilyId === "led-systems");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining(["cable-management", "busbar", "underfloor", "led-systems"]),
      );
      expect(zone.approvedProductFamilyIds).not.toContain("ev-charging");
      expect(busbar).toHaveLength(1);
      expect(realBusbarProductName(busbar[0]!)).toBe("GNL Lighting Busbar");
      expect(underfloor).toHaveLength(1);
      expect(led).toHaveLength(1);
      expect(busbar[0]!.id).not.toBe(led[0]!.id);
    });

    it("Baggage Handling & Conveyor Hall: 1, 2, 4, 5 present; 3 and 6 absent; category 2 opens GGD Medium Power", () => {
      const zone = findZone("baggage-handling-conveyor-hall");
      const hotspots = busbarHotspotsIn("baggage-handling-conveyor-hall");

      expect(zone.approvedProductFamilyIds).not.toContain("underfloor");
      expect(zone.approvedProductFamilyIds).not.toContain("ev-charging");
      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GGD Medium Power Busbar");
    });

    it("Central Plant Room: 1, 2, 4, 5 present; category 2 opens GR Cast Resin", () => {
      const zone = findZone("central-plant-room");
      const hotspots = busbarHotspotsIn("central-plant-room");

      expect(zone.approvedProductFamilyIds).not.toContain("underfloor");
      expect(zone.approvedProductFamilyIds).not.toContain("ev-charging");
      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GR Cast Resin Busbar");
    });

    it("Transformer & Utility Power Interface: 1, 2, 4 present; 3, 5, 6 absent; category 2 opens GS Super Compact", () => {
      const zone = findZone("transformer-utility-power-interface");
      const hotspots = busbarHotspotsIn("transformer-utility-power-interface");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining(["cable-management", "busbar", "earthing-lightning"]),
      );
      expect(zone.approvedProductFamilyIds).not.toContain("underfloor");
      expect(zone.approvedProductFamilyIds).not.toContain("led-systems");
      expect(zone.approvedProductFamilyIds).not.toContain("ev-charging");
      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GS Super Compact");
    });

    it("Airfield & Apron Infrastructure: 1, 4, 5 present; 2, 3, 6 absent", () => {
      const zone = findZone("airfield-apron-infrastructure");

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining(["cable-management", "earthing-lightning", "led-systems"]),
      );
      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
      expect(zone.approvedProductFamilyIds).not.toContain("underfloor");
      expect(zone.approvedProductFamilyIds).not.toContain("ev-charging");
    });

    it("Parking, Fleet & EV Charging: 1, 4, 5, 6 present; 2 and 3 absent; category 6 opens EV Charging Systems", () => {
      const zone = findZone("parking-fleet-ev-charging");
      const evHotspot = zone.hotspots.find(
        (hotspot) => hotspot.productFamilyId === "ev-charging",
      );

      expect(zone.approvedProductFamilyIds).toEqual(
        expect.arrayContaining([
          "cable-management",
          "earthing-lightning",
          "led-systems",
          "ev-charging",
        ]),
      );
      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
      expect(zone.approvedProductFamilyIds).not.toContain("underfloor");
      expect(evHotspot).toBeDefined();
    });
  });
});

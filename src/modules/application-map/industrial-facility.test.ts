import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  INDUSTRIAL_FACILITY_APPLICATION_MAP,
  INDUSTRIAL_FACILITY_ZONE_IDS,
} from "./industrial-facility";
import { PRODUCT_FAMILY_IDS } from "./types";
import { validateApplicationMap } from "./validation";

const REPO_ROOT = join(__dirname, "..", "..", "..");

function findZone(id: string) {
  const zone = INDUSTRIAL_FACILITY_APPLICATION_MAP.zones.find(
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

describe("INDUSTRIAL_FACILITY_APPLICATION_MAP", () => {
  it("passes all static invariant checks", () => {
    const errors = validateApplicationMap(
      INDUSTRIAL_FACILITY_APPLICATION_MAP,
      INDUSTRIAL_FACILITY_ZONE_IDS,
    );

    expect(errors).toEqual([]);
  });

  it("defines exactly the six canonical product families, in the stable order", () => {
    const ids = INDUSTRIAL_FACILITY_APPLICATION_MAP.productFamilies.map(
      (family) => family.id,
    );

    expect(ids).toEqual([...PRODUCT_FAMILY_IDS]);
  });

  it("defines exactly the eleven canonical zones", () => {
    const ids = INDUSTRIAL_FACILITY_APPLICATION_MAP.zones.map((zone) => zone.id);

    expect(new Set(ids)).toEqual(new Set(INDUSTRIAL_FACILITY_ZONE_IDS));
    expect(ids).toHaveLength(11);
  });

  it("gives every UK product-family entry a matching UA equivalent", () => {
    for (const family of INDUSTRIAL_FACILITY_APPLICATION_MAP.productFamilies) {
      expect(family.content.uk.name.trim()).not.toBe("");
      expect(family.content.ua.name.trim()).not.toBe("");
      expect(family.content.uk.actions.length).toBe(
        family.content.ua.actions.length,
      );
    }
  });

  it("gives every hotspot a UK and UA accessible label and usage explanation", () => {
    for (const zone of INDUSTRIAL_FACILITY_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.accessibleLabel.uk.trim()).not.toBe("");
        expect(hotspot.accessibleLabel.ua.trim()).not.toBe("");
        expect(hotspot.usedHereFor.uk.trim()).not.toBe("");
        expect(hotspot.usedHereFor.ua.trim()).not.toBe("");
      }
    }
  });

  it("stores every hotspot coordinate (zone and overview) as a percentage between 0 and 100", () => {
    for (const zone of INDUSTRIAL_FACILITY_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.x).toBeGreaterThanOrEqual(0);
        expect(hotspot.x).toBeLessThanOrEqual(100);
        expect(hotspot.y).toBeGreaterThanOrEqual(0);
        expect(hotspot.y).toBeLessThanOrEqual(100);
      }
    }

    for (const hotspot of INDUSTRIAL_FACILITY_APPLICATION_MAP.overview
      .hotspots) {
      expect(hotspot.x).toBeGreaterThanOrEqual(0);
      expect(hotspot.x).toBeLessThanOrEqual(100);
      expect(hotspot.y).toBeGreaterThanOrEqual(0);
      expect(hotspot.y).toBeLessThanOrEqual(100);
    }
  });

  it("references only image assets that exist on disk", () => {
    const imagePaths = [
      INDUSTRIAL_FACILITY_APPLICATION_MAP.overview.image,
      ...INDUSTRIAL_FACILITY_APPLICATION_MAP.zones.map((zone) => zone.image),
    ];

    for (const imagePath of imagePaths) {
      const absolutePath = join(REPO_ROOT, "public", imagePath);

      expect(existsSync(absolutePath), `Missing asset: ${imagePath}`).toBe(
        true,
      );
    }
  });

  // Sabit numaralandırma: sol seçici/hotspot etiketi HER ZAMAN jenerik aile
  // adını ("Busbar Systems") kullanır — somut ürün adı asla dışarıdaki
  // etikette görünmez (yalnız panel açıldıktan sonra nameOverride ile).
  it("keeps every busbar hotspot's accessible label generic (\"Busbar Systems\"), never a product code", () => {
    for (const zone of INDUSTRIAL_FACILITY_APPLICATION_MAP.zones) {
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
    for (const zone of INDUSTRIAL_FACILITY_APPLICATION_MAP.zones) {
      expect(zone.approvedProductFamilyIds.length).toBeLessThan(6);
    }
  });

  describe("Busbar Systems opens the correct real product per zone", () => {
    it("Main Electrical Room opens GGD Medium Power", () => {
      const hotspots = busbarHotspotsIn("main-electrical-room");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GGD Medium Power Busbar");
    });

    it("Production Line contains separate GGD and GNL (LEDBUS) busbar hotspots", () => {
      const hotspots = busbarHotspotsIn("production-line");
      const names = hotspots.map((hotspot) => realBusbarProductName(hotspot));

      expect(hotspots).toHaveLength(2);
      expect(names).toContain("GGD Medium Power Busbar");
      expect(names).toContain("GNL Lighting Busbar");
    });

    it("Process Area opens GR Cast Resin", () => {
      const hotspots = busbarHotspotsIn("process-area");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GR Cast Resin Busbar");
    });

    it("Control Room opens GNL Lighting Busbar and keeps Underfloor Cable Trunking as its own family", () => {
      const zone = findZone("control-room");
      const busbar = zone.hotspots.filter((h) => h.productFamilyId === "busbar");
      const underfloor = zone.hotspots.filter(
        (h) => h.productFamilyId === "underfloor",
      );

      expect(busbar).toHaveLength(1);
      expect(realBusbarProductName(busbar[0]!)).toBe("GNL Lighting Busbar");
      expect(underfloor).toHaveLength(1);
    });

    it("External Utilities Yard opens GS Super Compact and keeps EV Charging as its own family", () => {
      const zone = findZone("external-utilities-yard");
      const busbar = zone.hotspots.filter((h) => h.productFamilyId === "busbar");
      const evCharging = zone.hotspots.filter(
        (h) => h.productFamilyId === "ev-charging",
      );

      expect(busbar).toHaveLength(1);
      expect(realBusbarProductName(busbar[0]!)).toBe("GS Super Compact");
      expect(evCharging).toHaveLength(1);
    });

    it("Tank Farm opens GR Cast Resin", () => {
      const hotspots = busbarHotspotsIn("tank-farm");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GR Cast Resin Busbar");
    });

    it("Warehouse / Logistics Hall contains separate GGD, GNL and LED Systems selections", () => {
      const zone = findZone("warehouse-logistics-hall");
      const busbar = zone.hotspots.filter((h) => h.productFamilyId === "busbar");
      const led = zone.hotspots.filter((h) => h.productFamilyId === "led-systems");
      const names = busbar.map((hotspot) => realBusbarProductName(hotspot));

      expect(busbar).toHaveLength(2);
      expect(names).toContain("GGD Medium Power Busbar");
      expect(names).toContain("GNL Lighting Busbar");
      expect(led).toHaveLength(1);
    });

    it("Transformer Connection opens GS Super Compact", () => {
      const hotspots = busbarHotspotsIn("transformer-connection");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GS Super Compact");
    });

    it("Pump & Motor Room opens GR Cast Resin", () => {
      const hotspots = busbarHotspotsIn("pump-motor-room");

      expect(hotspots).toHaveLength(1);
      expect(realBusbarProductName(hotspots[0]!)).toBe("GR Cast Resin Busbar");
    });

    it("Factory Lighting & Assembly Hall opens GNL Lighting Busbar and keeps LED Systems separate", () => {
      const zone = findZone("factory-lighting-assembly-hall");
      const busbar = zone.hotspots.filter((h) => h.productFamilyId === "busbar");
      const led = zone.hotspots.filter((h) => h.productFamilyId === "led-systems");

      expect(busbar).toHaveLength(1);
      expect(realBusbarProductName(busbar[0]!)).toBe("GNL Lighting Busbar");
      expect(led).toHaveLength(1);
    });

    it("Industrial Street & Loading Yard contains LED Systems but no Busbar or EV Charging hotspot", () => {
      const zone = findZone("industrial-street-loading-yard");
      const familyIds = zone.hotspots.map((hotspot) => hotspot.productFamilyId);

      expect(familyIds).toContain("led-systems");
      expect(familyIds).not.toContain("busbar");
      expect(familyIds).not.toContain("ev-charging");
      expect(zone.approvedProductFamilyIds).not.toContain("busbar");
      expect(zone.approvedProductFamilyIds).not.toContain("ev-charging");
    });
  });

  // Overview yalnız ZONE hotspot'ları içerir (OverviewHotspot<TZoneId> her
  // zaman zoneId taşır, hiçbir zaman productFamilyId taşımaz) — bu tip
  // seviyesinde zaten garanti edilir. Burada ek olarak her overview
  // hotspot'unun GERÇEK bir zone'a işaret ettiği (uydurma olmadığı)
  // doğrulanır.
  it("overview contains only zone hotspots, each referencing a real zone", () => {
    const zoneIds = new Set(
      INDUSTRIAL_FACILITY_APPLICATION_MAP.zones.map((zone) => zone.id),
    );

    expect(
      INDUSTRIAL_FACILITY_APPLICATION_MAP.overview.hotspots.length,
    ).toBeGreaterThan(0);

    for (const hotspot of INDUSTRIAL_FACILITY_APPLICATION_MAP.overview
      .hotspots) {
      expect(zoneIds.has(hotspot.zoneId)).toBe(true);
    }

    // Tüm 11 bölge overview'de temsil edilir; dördü (Production Line,
    // Control Room, Pump & Motor Room, Factory Lighting & Assembly Hall)
    // kullanıcının onayıyla YAKLAŞIK konumlandırıldı (bkz.
    // industrial-facility.ts'teki "APPROXIMATE" notu) çünkü tek gece
    // havadan çekimi bu iç mekanları dıştan ayırt edilebilir göstermiyor.
    expect(INDUSTRIAL_FACILITY_APPLICATION_MAP.overview.hotspots).toHaveLength(
      11,
    );

    const overviewZoneIds = new Set(
      INDUSTRIAL_FACILITY_APPLICATION_MAP.overview.hotspots.map(
        (hotspot) => hotspot.zoneId,
      ),
    );

    expect(overviewZoneIds).toEqual(zoneIds);
  });
});

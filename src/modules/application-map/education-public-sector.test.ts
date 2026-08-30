import { describe, expect, it } from "vitest";

import {
  EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP,
  EDUCATION_PUBLIC_SECTOR_ZONE_IDS,
} from "./education-public-sector";
import { PRODUCT_FAMILY_IDS } from "./types";
import { validateApplicationMap } from "./validation";

function findZone(id: string) {
  const zone = EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.zones.find(
    (candidate) => candidate.id === id,
  );

  if (!zone) {
    throw new Error(`Zone "${id}" not found`);
  }

  return zone;
}

describe("EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP", () => {
  it("passes all static invariant checks", () => {
    const errors = validateApplicationMap(
      EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP,
      EDUCATION_PUBLIC_SECTOR_ZONE_IDS,
    );

    expect(errors).toEqual([]);
  });

  it("defines exactly the six canonical product families, in the stable order", () => {
    const ids = EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.productFamilies.map(
      (family) => family.id,
    );

    expect(ids).toEqual([...PRODUCT_FAMILY_IDS]);
  });

  it("defines exactly the eight canonical zones", () => {
    const ids = EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.zones.map(
      (zone) => zone.id,
    );

    expect(new Set(ids)).toEqual(new Set(EDUCATION_PUBLIC_SECTOR_ZONE_IDS));
    expect(ids).toHaveLength(8);
  });

  it("gives every UK product-family entry a matching UA equivalent", () => {
    for (const family of EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.productFamilies) {
      expect(family.content.uk.name.trim()).not.toBe("");
      expect(family.content.ua.name.trim()).not.toBe("");
      expect(family.content.uk.actions.length).toBe(
        family.content.ua.actions.length,
      );
    }
  });

  it("gives every hotspot a UK and UA accessible label and usage explanation", () => {
    for (const zone of EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.accessibleLabel.uk.trim()).not.toBe("");
        expect(hotspot.accessibleLabel.ua.trim()).not.toBe("");
        expect(hotspot.usedHereFor.uk.trim()).not.toBe("");
        expect(hotspot.usedHereFor.ua.trim()).not.toBe("");
      }
    }
  });

  it("keeps hotspot coordinates within the 0-100 bound", () => {
    for (const zone of EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.x).toBeGreaterThanOrEqual(0);
        expect(hotspot.x).toBeLessThanOrEqual(100);
        expect(hotspot.y).toBeGreaterThanOrEqual(0);
        expect(hotspot.y).toBeLessThanOrEqual(100);
      }
    }

    for (const hotspot of EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.overview
      .hotspots) {
      expect(hotspot.x).toBeGreaterThanOrEqual(0);
      expect(hotspot.x).toBeLessThanOrEqual(100);
      expect(hotspot.y).toBeGreaterThanOrEqual(0);
      expect(hotspot.y).toBeLessThanOrEqual(100);
    }
  });

  it("references only canonical public media assets", () => {
    const imagePaths = [
      EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.overview.image,
      ...EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.zones.map((zone) => zone.image),
    ];

    for (const imagePath of imagePaths) {
      expect(imagePath).toMatch(
        /^(?:\/assets|https:\/\/[^/]+)\/application-map\/[a-z0-9./-]+\.(?:png|webp)$/,
      );
    }
  });

  // Busbar Systems (family 2) sabit numaralandırmayla her zone'da aynı isimle
  // görünür, ama gerçek ürün zone bağlamına göre değişir: Main Electrical
  // Room'da güç dağıtımı için GS Super Compact, Classroom gibi aydınlatma
  // bölgelerinde GL Lighting Busbar. Bu ikisi asla aynı panel içeriğini
  // paylaşmamalı.
  describe("Busbar Systems is zone-specific (GS vs GL Lighting Busbar)", () => {
    it("shows the GS power busbar in Main Electrical Room, with no per-hotspot override", () => {
      const zone = findZone("main-electrical-room");
      const busbarHotspot = zone.hotspots.find(
        (hotspot) => hotspot.productFamilyId === "busbar",
      );

      expect(busbarHotspot).toBeDefined();
      expect(busbarHotspot?.imageOverride).toBeUndefined();
      expect(busbarHotspot?.actionsOverride).toBeUndefined();

      const busbarFamily =
        EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.productFamilies.find(
          (family) => family.id === "busbar",
        );

      expect(busbarFamily?.content.uk.image).toContain("/busbar/gs/");
    });

    it("shows the GL lighting busbar in Classroom via a per-hotspot override", () => {
      const zone = findZone("classroom");
      const busbarHotspot = zone.hotspots.find(
        (hotspot) => hotspot.productFamilyId === "busbar",
      );

      expect(busbarHotspot).toBeDefined();
      expect(busbarHotspot?.imageOverride).toContain("/busbar/gl/");
      expect(
        busbarHotspot?.actionsOverride?.uk.some((action) =>
          action.href.includes("gl-lighting-busbar"),
        ),
      ).toBe(true);
    });

    it("never applies the GL override outside zones with a visibly credible lighting busbar", () => {
      for (const zone of EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.zones) {
        if (zone.id === "classroom") {
          continue;
        }

        for (const hotspot of zone.hotspots) {
          if (hotspot.productFamilyId === "busbar") {
            expect(hotspot.imageOverride).toBeUndefined();
          }
        }
      }
    });
  });

  // LED Systems (family 5) her zaman ayrı bir seçim olarak kalmalı — Busbar
  // Systems (family 2) ile aynı panelde birleştirilmemeli, ikisi birlikte
  // aynı zone'da var olabilir ama farklı ürünleri temsil eder.
  it("keeps LED Systems as a distinct selection from Busbar Systems in Classroom", () => {
    const zone = findZone("classroom");
    const familyIds = zone.hotspots.map((hotspot) => hotspot.productFamilyId);

    expect(familyIds).toContain("busbar");
    expect(familyIds).toContain("led-systems");

    const ledHotspot = zone.hotspots.find(
      (hotspot) => hotspot.productFamilyId === "led-systems",
    );

    expect(ledHotspot?.imageOverride).toBeUndefined();
    expect(ledHotspot?.actionsOverride).toBeUndefined();
  });

  it("only approves EV Charging Systems for the EV Charging Area zone", () => {
    for (const zone of EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP.zones) {
      const approvesEvCharging = (
        zone.approvedProductFamilyIds as readonly string[]
      ).includes("ev-charging");

      if (zone.id === "ev-charging-area") {
        expect(approvesEvCharging).toBe(true);
      } else {
        expect(approvesEvCharging).toBe(false);
      }
    }
  });
});

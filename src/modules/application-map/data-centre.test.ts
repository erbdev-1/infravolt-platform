import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { DATA_CENTRE_APPLICATION_MAP } from "./data-centre";
import { PRODUCT_FAMILY_IDS, ZONE_IDS } from "./types";
import { validateDataCentreApplicationMap } from "./validation";

const REPO_ROOT = join(__dirname, "..", "..", "..");

describe("DATA_CENTRE_APPLICATION_MAP", () => {
  it("passes all static invariant checks", () => {
    const errors = validateDataCentreApplicationMap(DATA_CENTRE_APPLICATION_MAP);

    expect(errors).toEqual([]);
  });

  it("defines exactly the six canonical product families, in the stable order", () => {
    const ids = DATA_CENTRE_APPLICATION_MAP.productFamilies.map(
      (family) => family.id,
    );

    expect(ids).toEqual([...PRODUCT_FAMILY_IDS]);
  });

  it("defines exactly the eight canonical zones", () => {
    const ids = DATA_CENTRE_APPLICATION_MAP.zones.map((zone) => zone.id);

    expect(new Set(ids)).toEqual(new Set(ZONE_IDS));
    expect(ids).toHaveLength(8);
  });

  it("only approves EV Charging Systems for the Parking & EV Services zone", () => {
    for (const zone of DATA_CENTRE_APPLICATION_MAP.zones) {
      const approvesEvCharging = (
        zone.approvedProductFamilyIds as readonly string[]
      ).includes("ev-charging");

      if (zone.id === "parking-ev-services") {
        expect(approvesEvCharging).toBe(true);
      } else {
        expect(approvesEvCharging).toBe(false);
      }
    }
  });

  it("never exposes a contextual/generic equipment ID as a product family", () => {
    const disallowedIds = [
      "distribution-panel",
      "distribution-panels",
      "switchboard",
      "outdoor-enclosure",
      "cooling",
      "pump",
      "server-rack",
      "junction-box",
      "support-systems",
      "surge-protection",
      "mechanical",
    ];

    const familyIds = DATA_CENTRE_APPLICATION_MAP.productFamilies.map(
      (family) => family.id,
    );

    for (const disallowedId of disallowedIds) {
      expect(familyIds).not.toContain(disallowedId);
    }
  });

  it("gives every UK product-family entry a matching UA equivalent", () => {
    for (const family of DATA_CENTRE_APPLICATION_MAP.productFamilies) {
      expect(family.content.uk.name.trim()).not.toBe("");
      expect(family.content.ua.name.trim()).not.toBe("");
      expect(family.content.uk.actions.length).toBe(
        family.content.ua.actions.length,
      );
    }
  });

  it("gives every hotspot a UK and UA accessible label and usage explanation", () => {
    for (const zone of DATA_CENTRE_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.accessibleLabel.uk.trim()).not.toBe("");
        expect(hotspot.accessibleLabel.ua.trim()).not.toBe("");
        expect(hotspot.usedHereFor.uk.trim()).not.toBe("");
        expect(hotspot.usedHereFor.ua.trim()).not.toBe("");
      }
    }
  });

  it("keeps hotspot coordinates within the 0-100 bound", () => {
    for (const zone of DATA_CENTRE_APPLICATION_MAP.zones) {
      for (const hotspot of zone.hotspots) {
        expect(hotspot.x).toBeGreaterThanOrEqual(0);
        expect(hotspot.x).toBeLessThanOrEqual(100);
        expect(hotspot.y).toBeGreaterThanOrEqual(0);
        expect(hotspot.y).toBeLessThanOrEqual(100);
      }
    }

    for (const hotspot of DATA_CENTRE_APPLICATION_MAP.overview.hotspots) {
      expect(hotspot.x).toBeGreaterThanOrEqual(0);
      expect(hotspot.x).toBeLessThanOrEqual(100);
      expect(hotspot.y).toBeGreaterThanOrEqual(0);
      expect(hotspot.y).toBeLessThanOrEqual(100);
    }
  });

  it("rejects data with duplicate hotspot IDs", () => {
    const withDuplicate = {
      ...DATA_CENTRE_APPLICATION_MAP,
      zones: [
        DATA_CENTRE_APPLICATION_MAP.zones[0]!,
        {
          ...DATA_CENTRE_APPLICATION_MAP.zones[1]!,
          hotspots: [
            DATA_CENTRE_APPLICATION_MAP.zones[0]!.hotspots[0]!,
            ...DATA_CENTRE_APPLICATION_MAP.zones[1]!.hotspots,
          ],
        },
        ...DATA_CENTRE_APPLICATION_MAP.zones.slice(2),
      ],
    };

    const errors = validateDataCentreApplicationMap(withDuplicate);

    expect(
      errors.some((message) => message.includes("Duplicate hotspot ID")),
    ).toBe(true);
  });

  it("references only image assets that exist on disk", () => {
    const imagePaths = [
      DATA_CENTRE_APPLICATION_MAP.overview.image,
      ...DATA_CENTRE_APPLICATION_MAP.zones.map((zone) => zone.image),
    ];

    for (const imagePath of imagePaths) {
      const absolutePath = join(REPO_ROOT, "public", imagePath);

      expect(existsSync(absolutePath), `Missing asset: ${imagePath}`).toBe(
        true,
      );
    }
  });
});

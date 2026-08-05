import { PRODUCT_FAMILY_IDS, ZONE_IDS } from "./types";

import type { ApplicationMap, DataCentreApplicationMap } from "./types";

const KNOWN_ROUTE_PREFIXES = ["/products/", "/uk-support", "/application-map"];

function isSafeActionHref(href: string): boolean {
  if (href === "#" || href.trim() === "") {
    return false;
  }

  return KNOWN_ROUTE_PREFIXES.some((prefix) => href.startsWith(prefix));
}

// Statik Application Map verisini derleme zamanı tipinin ötesinde denetler.
// Burada yakalanan bir hata, yanlışlıkla eklenmiş bir ürün ailesini, bozuk
// bir hotspot koordinatını veya kırık bir aksiyon linkini üretime çıkmadan
// önce ortaya çıkarır. Sektörden bağımsızdır — geçerli bölge kimlikleri
// çağıran taraftan (zoneIds) gelir.
export function validateApplicationMap<TZoneId extends string>(
  map: ApplicationMap<TZoneId>,
  zoneIds: readonly TZoneId[],
): readonly string[] {
  const errors: string[] = [];

  const familyIds = map.productFamilies.map((family) => family.id);

  if (familyIds.length !== 6) {
    errors.push(
      `Expected exactly six product families, found ${familyIds.length}.`,
    );
  }

  const uniqueFamilyIds = new Set(familyIds);
  if (uniqueFamilyIds.size !== familyIds.length) {
    errors.push("Duplicate product-family IDs detected.");
  }

  for (const id of familyIds) {
    if (!(PRODUCT_FAMILY_IDS as readonly string[]).includes(id)) {
      errors.push(`Unsupported product-family ID present: "${id}".`);
    }
  }

  const actualZoneIds = map.zones.map((zone) => zone.id);
  const uniqueZoneIds = new Set(actualZoneIds);
  if (uniqueZoneIds.size !== actualZoneIds.length) {
    errors.push("Duplicate zone IDs detected.");
  }

  for (const id of actualZoneIds) {
    if (!(zoneIds as readonly string[]).includes(id)) {
      errors.push(`Unsupported zone ID present: "${id}".`);
    }
  }

  const allHotspotIds = new Set<string>();

  for (const zone of map.zones) {
    for (const familyId of zone.approvedProductFamilyIds) {
      if (!uniqueFamilyIds.has(familyId)) {
        errors.push(
          `Zone "${zone.id}" approves unknown product family "${familyId}".`,
        );
      }
    }

    for (const hotspot of zone.hotspots) {
      if (allHotspotIds.has(hotspot.id)) {
        errors.push(`Duplicate hotspot ID detected: "${hotspot.id}".`);
      }
      allHotspotIds.add(hotspot.id);

      if (hotspot.x < 0 || hotspot.x > 100 || hotspot.y < 0 || hotspot.y > 100) {
        errors.push(
          `Hotspot "${hotspot.id}" has coordinates outside the 0-100 bounds.`,
        );
      }

      if (!uniqueFamilyIds.has(hotspot.productFamilyId)) {
        errors.push(
          `Hotspot "${hotspot.id}" references unknown product family "${hotspot.productFamilyId}".`,
        );
      }

      if (!zone.approvedProductFamilyIds.includes(hotspot.productFamilyId)) {
        errors.push(
          `Hotspot "${hotspot.id}" references a product family not approved for zone "${zone.id}".`,
        );
      }

      if (!hotspot.accessibleLabel.uk.trim() || !hotspot.accessibleLabel.ua.trim()) {
        errors.push(`Hotspot "${hotspot.id}" is missing a UK or UA label.`);
      }

      if (!hotspot.usedHereFor.uk.trim() || !hotspot.usedHereFor.ua.trim()) {
        errors.push(`Hotspot "${hotspot.id}" is missing UK or UA usage text.`);
      }
    }
  }

  for (const hotspot of map.overview.hotspots) {
    if (hotspot.x < 0 || hotspot.x > 100 || hotspot.y < 0 || hotspot.y > 100) {
      errors.push(
        `Overview hotspot "${hotspot.id}" has coordinates outside the 0-100 bounds.`,
      );
    }

    if (!uniqueZoneIds.has(hotspot.zoneId)) {
      errors.push(
        `Overview hotspot "${hotspot.id}" references unknown zone "${hotspot.zoneId}".`,
      );
    }
  }

  for (const family of map.productFamilies) {
    if (!family.content.uk.name.trim() || !family.content.ua.name.trim()) {
      errors.push(`Product family "${family.id}" is missing a UK or UA name.`);
    }

    for (const market of ["uk", "ua"] as const) {
      for (const action of family.content[market].actions) {
        if (!isSafeActionHref(action.href)) {
          errors.push(
            `Product family "${family.id}" (${market}) has an unsafe action href: "${action.href}".`,
          );
        }
      }
    }
  }

  return errors;
}

// Data Centre'ye özgü sarmalayıcı: genel doğrulamaya ek olarak, yalnız bu
// sektörde geçerli olan "EV Charging yalnız Parking & EV Services'te
// onaylanabilir" kuralını uygular.
export function validateDataCentreApplicationMap(
  map: DataCentreApplicationMap,
): readonly string[] {
  const errors = [...validateApplicationMap(map, ZONE_IDS)];

  for (const zone of map.zones) {
    if (
      zone.id !== "parking-ev-services" &&
      zone.approvedProductFamilyIds.includes("ev-charging")
    ) {
      errors.push(
        `EV Charging Systems must only appear in "parking-ev-services", found in "${zone.id}".`,
      );
    }
  }

  return errors;
}

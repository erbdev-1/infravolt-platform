import type { MarketCode } from "@/modules/markets/types";

import type {
  ApplicationMap,
  DataCentreApplicationMap,
  ProductAction,
  ProductFamilyId,
  ZoneId,
} from "./types";

export type ResolvedHotspot = Readonly<{
  id: string;
  productFamilyId: ProductFamilyId;
  x: number;
  y: number;
  label: string;
  usedHereFor: string;
  // Bkz. types.ts Hotspot.imageOverride/actionsOverride/nameOverride —
  // belirtilmişse panel bunları, belirtilmemişse aile içeriğini kullanır.
  image?: string;
  imageAlt?: string;
  actions?: readonly ProductAction[];
  applicationPoints?: readonly string[];
  benefits?: readonly string[];
  name?: string;
}>;

export type ResolvedZone<TZoneId extends string = ZoneId> = Readonly<{
  id: TZoneId;
  number: number;
  name: string;
  image: string;
  imageAlt: string;
  approvedProductFamilyIds: readonly ProductFamilyId[];
  hotspots: readonly ResolvedHotspot[];
}>;

export type ResolvedOverviewHotspot<TZoneId extends string = ZoneId> =
  Readonly<{
    id: string;
    zoneId: TZoneId;
    x: number;
    y: number;
    label: string;
  }>;

export type ResolvedProductFamily = Readonly<{
  id: ProductFamilyId;
  number: number;
  name: string;
  applicationPoints: readonly string[];
  benefits: readonly string[];
  actions: readonly ProductAction[];
  image?: string;
  imageAlt?: string;
}>;

// Sektörden bağımsız çözümlenmiş harita şekli.
export type ResolvedApplicationMap<TZoneId extends string = ZoneId> =
  Readonly<{
    overview: Readonly<{
      image: string;
      imageAlt: string;
      hotspots: readonly ResolvedOverviewHotspot<TZoneId>[];
    }>;
    zones: readonly ResolvedZone<TZoneId>[];
    productFamilies: readonly ResolvedProductFamily[];
  }>;

// Geriye dönük uyumluluk için korunan, Data Centre'ye özgü isim.
export type ResolvedDataCentreApplicationMap = ResolvedApplicationMap<ZoneId>;

// İki dilli statik veriyi tek pazara indirger. Saf bir veri dönüşümüdür,
// "server-only" bağımlılığı taşımaz; bu yüzden hem sayfa (server) bileşeninde
// hem gerekirse testlerde güvenle çağrılabilir. Sektörden bağımsızdır —
// Data Centre dışındaki sektörler (ör. Healthcare) de bunu doğrudan kullanır.
export function resolveApplicationMap<TZoneId extends string>(
  map: ApplicationMap<TZoneId>,
  market: MarketCode,
): ResolvedApplicationMap<TZoneId> {
  return {
    overview: {
      image: map.overview.image,
      imageAlt: map.overview.imageAlt[market],
      hotspots: map.overview.hotspots.map((hotspot) => ({
        id: hotspot.id,
        zoneId: hotspot.zoneId,
        x: hotspot.x,
        y: hotspot.y,
        label: hotspot.accessibleLabel[market],
      })),
    },
    zones: map.zones.map((zone) => ({
      id: zone.id,
      number: zone.number,
      name: zone.content[market].name,
      image: zone.image,
      imageAlt: zone.imageAlt[market],
      approvedProductFamilyIds: zone.approvedProductFamilyIds,
      hotspots: zone.hotspots.map((hotspot) => ({
        id: hotspot.id,
        productFamilyId: hotspot.productFamilyId,
        x: hotspot.x,
        y: hotspot.y,
        label: hotspot.accessibleLabel[market],
        usedHereFor: hotspot.usedHereFor[market],
        image: hotspot.imageOverride,
        imageAlt: hotspot.imageAltOverride?.[market],
        actions: hotspot.actionsOverride?.[market],
        applicationPoints: hotspot.applicationPointsOverride?.[market],
        benefits: hotspot.benefitsOverride?.[market],
        name: hotspot.nameOverride?.[market],
      })),
    })),
    productFamilies: map.productFamilies.map((family) => ({
      id: family.id,
      number: family.number,
      name: family.content[market].name,
      applicationPoints: family.content[market].applicationPoints,
      benefits: family.content[market].benefits,
      actions: family.content[market].actions,
      image: family.content[market].image,
      imageAlt: family.content[market].imageAlt,
    })),
  };
}

export function resolveDataCentreApplicationMap(
  map: DataCentreApplicationMap,
  market: MarketCode,
): ResolvedDataCentreApplicationMap {
  return resolveApplicationMap(map, market);
}

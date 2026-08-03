import type { MarketCode } from "@/modules/markets/types";

import type {
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
}>;

export type ResolvedZone = Readonly<{
  id: ZoneId;
  number: number;
  name: string;
  image: string;
  imageAlt: string;
  approvedProductFamilyIds: readonly ProductFamilyId[];
  hotspots: readonly ResolvedHotspot[];
}>;

export type ResolvedOverviewHotspot = Readonly<{
  id: string;
  zoneId: ZoneId;
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

export type ResolvedDataCentreApplicationMap = Readonly<{
  overview: Readonly<{
    image: string;
    imageAlt: string;
    hotspots: readonly ResolvedOverviewHotspot[];
  }>;
  zones: readonly ResolvedZone[];
  productFamilies: readonly ResolvedProductFamily[];
}>;

// İki dilli statik veriyi tek pazara indirger. Saf bir veri dönüşümüdür,
// "server-only" bağımlılığı taşımaz; bu yüzden hem sayfa (server) bileşeninde
// hem gerekirse testlerde güvenle çağrılabilir.
export function resolveDataCentreApplicationMap(
  map: DataCentreApplicationMap,
  market: MarketCode,
): ResolvedDataCentreApplicationMap {
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

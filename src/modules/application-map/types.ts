import type { MarketCode } from "@/modules/markets/types";

// Altı ürün ailesi InfraVolt'un mevcut, gerçekten satılan portföyünü temsil eder.
// Bu liste ürün kataloğu genişlemeden büyümemeli.
export const PRODUCT_FAMILY_IDS = [
  "cable-management",
  "busbar",
  "underfloor",
  "earthing-lightning",
  "led-systems",
  "ev-charging",
] as const;

export type ProductFamilyId = (typeof PRODUCT_FAMILY_IDS)[number];

// Her ailenin numarası tüm bölgelerde sabit kalır (hotspot numaralandırması).
export const PRODUCT_FAMILY_NUMBERS = {
  "cable-management": 1,
  busbar: 2,
  underfloor: 3,
  "earthing-lightning": 4,
  "led-systems": 5,
  "ev-charging": 6,
} as const satisfies Readonly<Record<ProductFamilyId, number>>;

// Overview, seçilebilir yedi bölgeden ayrı bir başlangıç durumudur (zone değil).
export const ZONE_IDS = [
  "main-electrical-room",
  "server-hall",
  "raised-floor-services",
  "mechanical-electrical-plant-room",
  "rooftop-cooling-electrical",
  "external-utility-area",
  "parking-ev-services",
] as const;

export type ZoneId = (typeof ZONE_IDS)[number];

export type SceneId = "overview" | ZoneId;

export type ProductAction = Readonly<{
  label: string;
  href: string;
  type: "page" | "request" | "question";
}>;

// Bir alt küme (localized) — pazar bazlı metinler.
export type LocalizedProductFamily = Readonly<{
  name: string;
  applicationPoints: readonly string[];
  benefits: readonly string[];
  actions: readonly ProductAction[];
  image?: string;
  imageAlt?: string;
}>;

// Ürün ailesinin sahne bağlamından bağımsız sabit kimliği.
export type ProductFamily = Readonly<{
  id: ProductFamilyId;
  number: number;
  content: Readonly<Record<MarketCode, LocalizedProductFamily>>;
}>;

export type LocalizedZone = Readonly<{
  name: string;
  instructions?: string;
}>;

export type Hotspot = Readonly<{
  id: string;
  productFamilyId: ProductFamilyId;
  x: number;
  y: number;
  accessibleLabel: Readonly<Record<MarketCode, string>>;
  // Bölgeye özel "Used here for" açıklaması — aynı ürün ailesi farklı
  // bölgelerde farklı şekilde kullanılabildiği için sabit değil.
  usedHereFor: Readonly<Record<MarketCode, string>>;
}>;

export type Zone = Readonly<{
  id: ZoneId;
  number: number;
  image: string;
  imageAlt: Readonly<Record<MarketCode, string>>;
  content: Readonly<Record<MarketCode, LocalizedZone>>;
  // Bu bölgede onaylı ürün ailelerinin sırası (navigasyon ve doğrulama için).
  approvedProductFamilyIds: readonly ProductFamilyId[];
  hotspots: readonly Hotspot[];
}>;

export type OverviewHotspot = Readonly<{
  id: string;
  zoneId: ZoneId;
  x: number;
  y: number;
  accessibleLabel: Readonly<Record<MarketCode, string>>;
}>;

export type Overview = Readonly<{
  image: string;
  imageAlt: Readonly<Record<MarketCode, string>>;
  hotspots: readonly OverviewHotspot[];
}>;

export type DataCentreApplicationMap = Readonly<{
  overview: Overview;
  zones: readonly Zone[];
  productFamilies: readonly ProductFamily[];
}>;

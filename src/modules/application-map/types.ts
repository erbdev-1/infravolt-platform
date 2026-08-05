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

// Aşağıdaki tipler TZoneId üzerinde geneldir — Data Centre dışındaki
// sektörler (ör. Healthcare) kendi bölge kimlik union'larını geçirerek
// aynı modeli yeniden kullanır. Varsayılan tip parametresi sayesinde mevcut
// Data Centre kullanım noktaları (tip argümanı vermeden `Zone`, `Overview`
// vb.) değişmeden çalışmaya devam eder.
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
  // Nadir durum: aynı ürün ailesi numarası (ör. "Busbar Systems") farklı
  // bölgelerde farklı somut ürünü temsil edebilir (ör. GS Super Compact
  // vs GL Lighting Busbar). Bu alanlar verilirse panel, aile seviyesindeki
  // varsayılan görsel/CTA'lar yerine bunları kullanır; verilmezse aile
  // içeriği değişmeden kullanılmaya devam eder (geriye dönük uyumlu).
  imageOverride?: string;
  imageAltOverride?: Readonly<Record<MarketCode, string>>;
  actionsOverride?: Readonly<Record<MarketCode, readonly ProductAction[]>>;
  // Aile seviyesindeki applicationPoints/benefits de birden fazla somut
  // ürünü aynı aile numarası altında barındıran zone'larda (ör. Busbar
  // Systems altında GGD/GS/GR/GNL) yanıltıcı olabilir — bu iki alan
  // verilirse panel bunları, verilmezse aile içeriğini kullanır.
  applicationPointsOverride?: Readonly<Record<MarketCode, readonly string[]>>;
  benefitsOverride?: Readonly<Record<MarketCode, readonly string[]>>;
  // Panel başlığını (H2) aile adı yerine somut ürün adıyla değiştirir (ör.
  // "GGD Medium Power Busbar"). Sol seçici/hotspot etiketi HER ZAMAN aile
  // adını ("Busbar Systems") kullanmaya devam eder — bu yalnız panel AÇILDIKTAN
  // sonraki başlığı etkiler. Bir zone'da aynı aileye ait BİRDEN FAZLA hotspot
  // varsa (ör. GGD + GNL busbar), seçim listesindeki her satırın etiketi de
  // buradan gelir.
  nameOverride?: Readonly<Record<MarketCode, string>>;
}>;

export type Zone<TZoneId extends string = ZoneId> = Readonly<{
  id: TZoneId;
  number: number;
  image: string;
  imageAlt: Readonly<Record<MarketCode, string>>;
  content: Readonly<Record<MarketCode, LocalizedZone>>;
  // Bu bölgede onaylı ürün ailelerinin sırası (navigasyon ve doğrulama için).
  approvedProductFamilyIds: readonly ProductFamilyId[];
  hotspots: readonly Hotspot[];
}>;

export type OverviewHotspot<TZoneId extends string = ZoneId> = Readonly<{
  id: string;
  zoneId: TZoneId;
  x: number;
  y: number;
  accessibleLabel: Readonly<Record<MarketCode, string>>;
}>;

export type Overview<TZoneId extends string = ZoneId> = Readonly<{
  image: string;
  imageAlt: Readonly<Record<MarketCode, string>>;
  hotspots: readonly OverviewHotspot<TZoneId>[];
}>;

// Sektörden bağımsız temel harita şekli — her sektör kendi TZoneId'siyle
// bunu somutlaştırır (bkz. healthcare.ts).
export type ApplicationMap<TZoneId extends string = ZoneId> = Readonly<{
  overview: Overview<TZoneId>;
  zones: readonly Zone<TZoneId>[];
  productFamilies: readonly ProductFamily[];
}>;

// Geriye dönük uyumluluk için korunan, Data Centre'ye özgü isim.
export type DataCentreApplicationMap = ApplicationMap<ZoneId>;

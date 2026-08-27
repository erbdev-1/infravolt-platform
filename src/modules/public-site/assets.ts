import { publicMediaUrl } from "@/modules/storage/asset-url";

export type ProductId =
  | "busbar"
  | "cable-management"
  | "earthing-lightning"
  | "underfloor"
  | "led-bus lighting"
  | "ev-charging";

export type IndustryId =
  | "data-centres"
  | "commercial-buildings"
  | "industrial-facilities"
  | "infrastructure-utilities"
  | "renewable-energy"
  | "healthcare"
  | "transport-infrastructure"
  | "education-public-sector";

export type CapabilityId =
  | "documentation"
  | "project-support"
  | "specification"
  | "market";

type ProductAsset = Readonly<{
  // `image` resolves through publicMediaUrl() — either a local `/assets/...` path
  // or an absolute Cloudflare R2 URL, so it can't stay a `/`-rooted branded type.
  image: string;
  icon: `/${string}.svg`;
}>;

type IndustryAsset = Readonly<{
  image: string;
}>;

export const MEDIA_ASSETS = Object.freeze({
  hero: {
    video: publicMediaUrl("media/home/infravolt-home-hero-00-20-final.mp4"),
  },

  aboutGersan: {
    video: publicMediaUrl("media/about-gersan/infravolt-about-gersan-00-25-to-01-15-final.mp4"),
    poster: publicMediaUrl("media/about-gersan/infravolt-about-gersan-poster.webp"),
  },
} as const);

export const COMPANY_ASSETS = Object.freeze({
  showroom: {
    image: publicMediaUrl("company/showroom/uk-showroom-technical-demo.webp"),
  },

  warehouse: {
    image: publicMediaUrl("company/warehouse/hts-warehouse-exterior.webp"),
  },
} as const);

export const CAPABILITY_ICONS = Object.freeze({
  documentation: "/assets/icons/actions/icon-technical-pack.svg",
  "project-support": "/assets/icons/actions/icon-quote.svg",
  specification: "/assets/icons/actions/icon-cad.svg",
  market: "/assets/icons/actions/icon-question.svg",
} as const satisfies Readonly<Record<CapabilityId, `/${string}.svg`>>);

// Eşleme çalışma anında dosya keşfi yapmayarak yalnız önceden incelenmiş public asset'lerin kullanılmasını sağlar.
export const PRODUCT_ASSETS = Object.freeze({
  busbar: {
    image: publicMediaUrl("products/thumbnails/product-busbar-systems.webp"),
    icon: "/assets/icons/products/icon-busbar.svg",
  },

  "cable-management": {
    image: publicMediaUrl("products/thumbnails/cable-tray-and-ladder.webp"),
    icon: "/assets/icons/products/icon-cable-tray.svg",
  },

  "earthing-lightning": {
    image: publicMediaUrl("products/thumbnails/earthing-lighting.webp"),
    icon: "/assets/icons/products/icon-earthing.svg",
  },

  underfloor: {
    image: publicMediaUrl("products/thumbnails/product-underfloor-systems.webp"),
    icon: "/assets/icons/products/icon-support-system.svg",
  },

  "led-bus lighting": {
    image: publicMediaUrl("products/thumbnails/product-ledbus-systems.webp"),
    icon: "/assets/icons/products/icon-lighting-busbar.svg",
  },

  "ev-charging": {
    image: publicMediaUrl("products/thumbnails/product-ev-charging-systems.webp"),
    icon: "/assets/icons/products/icon-ev-charging.svg",
  },
} as const satisfies Readonly<Record<ProductId, ProductAsset>>);

export const PRODUCT_PAGE_HREFS = {
  busbar: "/products/busbar",
  "cable-management": "/products/cable-support-systems",
  "earthing-lightning": "/products/earthing-and-lightning-protection",
  underfloor: "/products/underfloor-systems",
  "led-bus lighting": "/products/led-systems",
  "ev-charging": "https://g-charge.com.tr/en/",
} as const satisfies Readonly<Record<ProductId, string>>;

export const INDUSTRY_ASSETS = Object.freeze({
  "data-centres": {
    image: publicMediaUrl("industries/cards/data-centres.webp"),
  },
  "commercial-buildings": {
    image: publicMediaUrl("industries/cards/commercial-buildings.webp"),
  },
  "industrial-facilities": {
    image: publicMediaUrl("industries/cards/industrial-facilities.webp"),
  },
  "infrastructure-utilities": {
    image: publicMediaUrl("industries/cards/infrastructure-utilities.webp"),
  },
  "renewable-energy": {
    image: publicMediaUrl("industries/cards/renewable-energy.webp"),
  },
  healthcare: {
    image: publicMediaUrl("industries/cards/healthcare.webp"),
  },
  "transport-infrastructure": {
    image: publicMediaUrl("industries/cards/transport-infrastructure.webp"),
  },
  "education-public-sector": {
    image: publicMediaUrl("industries/cards/education-public-sector.webp"),
  },
} as const satisfies Readonly<Record<IndustryId, IndustryAsset>>);

export const GERSAN_COMPANY_ASSETS = Object.freeze({
  factoryExterior: publicMediaUrl("company/gersan/gersan-factory-exterior.webp"),
  tuzlaFactory:
    publicMediaUrl("company/gersan-tuzla-istanbul-head-office-factory.webp"),
  zonguldakFactory: publicMediaUrl("company/gersan-zonguldak-factory.webp"),
  omanFactory: publicMediaUrl("company/gersan-sultanate-of-oman-factory.webp"),
} as const);

export const TECHNICAL_RESOURCE_ICONS = Object.freeze({
  datasheets: "/assets/icons/technical-resources/icon-datasheets.svg",

  certificatesTests:
    "/assets/icons/technical-resources/icon-certificates-tests.svg",

  installationGuidance:
    "/assets/icons/technical-resources/icon-installation-guidance.svg",

  bimCad: "/assets/icons/technical-resources/icon-bim-cad.svg",

  specificationSupport:
    "/assets/icons/technical-resources/icon-specification-support.svg",
} as const);

export const GERSAN_QUALITY_ASSETS = Object.freeze({
  lovag: publicMediaUrl("company/gersan/certifications/lovag.svg"),
  asta: publicMediaUrl("company/gersan/certifications/asta.svg"),
  cesi: publicMediaUrl("company/gersan/certifications/cesi.svg"),
  iphBerlin: publicMediaUrl("company/gersan/certifications/iph-berlin.svg"),
  kema: publicMediaUrl("company/gersan/certifications/kema.svg"),
  tse: publicMediaUrl("company/gersan/certifications/tse.svg"),
  ce: publicMediaUrl("company/gersan/certifications/ce.svg"),
  ul: publicMediaUrl("company/gersan/certifications/ul.svg"),
  tuv: publicMediaUrl("company/gersan/certifications/tuv.svg"),
  isoManagementSystems:
    publicMediaUrl("company/gersan/certifications/iso-management-systems.svg"),
} as const);

export const CERTIFICATION_ASSETS = Object.freeze([
  {
    label: "CE",
    image: publicMediaUrl("certifications/marks/ce.svg"),
  },
  {
    label: "IEC",
    image: publicMediaUrl("certifications/marks/iec.svg"),
  },
  {
    label: "LOVAG–ACAE",
    image: publicMediaUrl("certifications/marks/lovag-acae.svg"),
  },
  {
    label: "ISO 9001",
    image: publicMediaUrl("certifications/marks/iso-9001.svg"),
  },
  {
    label: "ISO 14001",
    image: publicMediaUrl("certifications/marks/iso-14001.svg"),
  },
  {
    label: "ISO 45001",
    image: publicMediaUrl("certifications/marks/iso-45001.svg"),
  },
] as const);

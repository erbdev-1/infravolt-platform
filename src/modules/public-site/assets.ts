const ASSET_BASE_URL = (process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "").replace(
  /\/$/u,
  "",
);

function mediaAsset(path: `/${string}`): string {
  return `${ASSET_BASE_URL}${path}`;
}

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
  image: `/${string}.webp`;
  icon: `/${string}.svg`;
}>;

type IndustryAsset = Readonly<{
  image: `/${string}.webp`;
}>;

export const MEDIA_ASSETS = Object.freeze({
  hero: {
    video: mediaAsset("/assets/media/home/infravolt-home-hero-00-20-final.mp4"),
    poster: mediaAsset("/assets/media/home/infravolt-home-hero-poster.webp"),
  },

  aboutGersan: {
    video: mediaAsset(
      "/assets/media/about-gersan/infravolt-about-gersan-00-25-to-01-15-final.mp4",
    ),
    poster: mediaAsset(
      "/assets/media/about-gersan/infravolt-about-gersan-poster.webp",
    ),
  },
} as const);

export const COMPANY_ASSETS = Object.freeze({
  showroom: {
    image: "/assets/company/showroom/uk-showroom-technical-demo.webp",
  },

  warehouse: {
    image: "/assets/company/warehouse/hts-warehouse-exterior.webp",
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
    image: "/assets/products/thumbnails/product-busbar-systems.webp",
    icon: "/assets/icons/products/icon-busbar.svg",
  },

  "cable-management": {
    image: "/assets/products/thumbnails/cable-tray-and-ladder.webp",
    icon: "/assets/icons/products/icon-cable-tray.svg",
  },

  "earthing-lightning": {
    image: "/assets/products/thumbnails/earthing-lighting.webp",
    icon: "/assets/icons/products/icon-earthing.svg",
  },

  underfloor: {
    image: "/assets/products/thumbnails/product-underfloor-systems.webp",
    icon: "/assets/icons/products/icon-support-system.svg",
  },

  "led-bus lighting": {
    image: "/assets/products/thumbnails/product-ledbus-systems.webp",
    icon: "/assets/icons/products/icon-lighting-busbar.svg",
  },

  "ev-charging": {
    image: "/assets/products/thumbnails/product-ev-charging-systems.webp",
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
    image: "/assets/industries/cards/data-centres.webp",
  },
  "commercial-buildings": {
    image: "/assets/industries/cards/commercial-buildings.webp",
  },
  "industrial-facilities": {
    image: "/assets/industries/cards/industrial-facilities.webp",
  },
  "infrastructure-utilities": {
    image: "/assets/industries/cards/infrastructure-utilities.webp",
  },
  "renewable-energy": {
    image: "/assets/industries/cards/renewable-energy.webp",
  },
  healthcare: {
    image: "/assets/industries/cards/healthcare.webp",
  },
  "transport-infrastructure": {
    image: "/assets/industries/cards/transport-infrastructure.webp",
  },
  "education-public-sector": {
    image: "/assets/industries/cards/education-public-sector.webp",
  },
} as const satisfies Readonly<Record<IndustryId, IndustryAsset>>);

export const GERSAN_COMPANY_ASSETS = Object.freeze({
  factoryExterior: "/assets/company/gersan/gersan-factory-exterior.webp",
  tuzlaFactory: "/assets/company/gersan-tuzla-istanbul-head-office-factory.webp",
  zonguldakFactory: "/assets/company/gersan-zonguldak-factory.webp",
  omanFactory: "/assets/company/gersan-sultanate-of-oman-factory.webp",
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
  lovag: "/assets/company/gersan/certifications/lovag.svg",
  asta: "/assets/company/gersan/certifications/asta.svg",
  cesi: "/assets/company/gersan/certifications/cesi.svg",
  iphBerlin: "/assets/company/gersan/certifications/iph-berlin.svg",
  kema: "/assets/company/gersan/certifications/kema.svg",
  tse: "/assets/company/gersan/certifications/tse.svg",
  ce: "/assets/company/gersan/certifications/ce.svg",
  ul: "/assets/company/gersan/certifications/ul.svg",
  tuv: "/assets/company/gersan/certifications/tuv.svg",
  isoManagementSystems:
    "/assets/company/gersan/certifications/iso-management-systems.svg",
} as const);

export const CERTIFICATION_ASSETS = Object.freeze([
  {
    label: "CE",
    image: "/assets/certifications/marks/ce.svg",
  },
  {
    label: "IEC",
    image: "/assets/certifications/marks/iec.svg",
  },
  {
    label: "LOVAG–ACAE",
    image: "/assets/certifications/marks/lovag-acae.svg",
  },
  {
    label: "ISO 9001",
    image: "/assets/certifications/marks/iso-9001.svg",
  },
  {
    label: "ISO 14001",
    image: "/assets/certifications/marks/iso-14001.svg",
  },
  {
    label: "ISO 45001",
    image: "/assets/certifications/marks/iso-45001.svg",
  },
] as const);

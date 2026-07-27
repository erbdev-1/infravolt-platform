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
    video: mediaAsset("/media/home/infravolt-home-hero-00-20-final.mp4"),
    poster: mediaAsset("/media/home/infravolt-home-hero-poster.webp"),
  },

  aboutGersan: {
    video: mediaAsset(
      "/media/about-gersan/infravolt-about-gersan-00-25-to-01-15-final.mp4",
    ),
    poster: mediaAsset(
      "/media/about-gersan/infravolt-about-gersan-poster.webp",
    ),
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

export const INDUSTRY_ASSETS = Object.freeze({
  "data-centres": {
    image: "/assets/industries/data-centres/zones/data-centre-server-hall.webp",
  },
  "commercial-buildings": {
    image:
      "/assets/industries/commercial-buildings/zones/commercial-building-office-floor.webp",
  },
  "industrial-facilities": {
    image:
      "/assets/industries/industrial-facilities/zones/industrial-production-line.webp",
  },
  "infrastructure-utilities": {
    image:
      "/assets/industries/infrastructure-utilities/zones/infrastructure-pumping-station.webp",
  },
  "renewable-energy": {
    image:
      "/assets/industries/renewable-energy/zones/solar-array-electrical-enclosure.webp",
  },
  healthcare: {
    image: "/assets/industries/healthcare/zones/healthcare-patient-ward.webp",
  },
  "transport-infrastructure": {
    image:
      "/assets/industries/transport-infrastructure/airport/zones/airport-terminal-building-zone.webp",
  },
  "education-public-sector": {
    image:
      "/assets/industries/education-public-sector/zones/education-library.webp",
  },
} as const satisfies Readonly<Record<IndustryId, IndustryAsset>>);

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

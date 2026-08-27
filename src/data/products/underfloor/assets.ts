import { publicMediaUrl } from "@/modules/storage/asset-url";
import type {
  UnderfloorApplicationIconName,
  UnderfloorSeriesSlug,
} from "./types";

const UNDERFLOOR_ASSET_BASE = publicMediaUrl("products/underfloor");

export const UNDERFLOOR_HUB_HERO_BACKGROUND =
  `${UNDERFLOOR_ASSET_BASE}/hero/underfloor-cable-trunking-hero-background.webp`;

export const UNDERFLOOR_HUB_HERO_FOREGROUND =
  `${UNDERFLOOR_ASSET_BASE}/hero/underfloor-cable-trunking-hero-foreground-products.webp`;

type UnderfloorSeriesAssets = Readonly<{
  background: string;
  foreground: string;
  categoryCard: string;
}>;

const SERIES_ASSET_BASE = `${UNDERFLOOR_ASSET_BASE}/series`;

export const UNDERFLOOR_SERIES_ASSETS = {
  "underfloor-junction-boxes": {
    background: `${SERIES_ASSET_BASE}/background/underfloor-junction-boxes-hero-background.webp`,
    foreground: `${SERIES_ASSET_BASE}/foreground/underfloor-junction-boxes-hero-foreground-products.webp`,
    categoryCard: `${SERIES_ASSET_BASE}/card/underfloor-junction-boxes-category-card.webp`,
  },
  "socket-data-accessories": {
    background: `${SERIES_ASSET_BASE}/background/underfloor-socket-data-accessories-hero-background.webp`,
    foreground: `${SERIES_ASSET_BASE}/foreground/underfloor-socket-data-accessories-hero-foreground-products.webp`,
    categoryCard: `${SERIES_ASSET_BASE}/card/underfloor-socket-data-accessories-category-card.webp`,
  },
  "underfloor-cable-trays": {
    background: `${SERIES_ASSET_BASE}/background/underfloor-cable-trays-hero-background.webp`,
    foreground: `${SERIES_ASSET_BASE}/foreground/underfloor-cable-trays-hero-foreground-products.webp`,
    categoryCard: `${SERIES_ASSET_BASE}/card/underfloor-cable-trays-category-card.webp`,
  },
  "raised-floor-trunking": {
    background: `${SERIES_ASSET_BASE}/background/raised-floor-trunking-hero-background.webp`,
    foreground: `${SERIES_ASSET_BASE}/foreground/raised-floor-trunking-hero-foreground-products.webp`,
    categoryCard: `${SERIES_ASSET_BASE}/card/raised-floor-trunking-category-card.webp`,
  },
  "aluminium-trunking": {
    background: `${SERIES_ASSET_BASE}/background/aluminium-trunking-hero-background.webp`,
    foreground: `${SERIES_ASSET_BASE}/foreground/aluminium-trunking-hero-foreground-products.webp`,
    categoryCard: `${SERIES_ASSET_BASE}/card/aluminium-trunking-category-card.webp`,
  },
  "tray-accessories": {
    background: `${SERIES_ASSET_BASE}/background/underfloor-tray-accessories-hero-background.webp`,
    foreground: `${SERIES_ASSET_BASE}/foreground/underfloor-tray-accessories-hero-foreground-products.webp`,
    categoryCard: `${SERIES_ASSET_BASE}/card/underfloor-tray-accessories-category-card.webp`,
  },
} as const satisfies Readonly<Record<UnderfloorSeriesSlug, UnderfloorSeriesAssets>>;

const APPLICATION_ASSET_BASE = `${UNDERFLOOR_ASSET_BASE}/applications`;

export const UNDERFLOOR_APPLICATION_IMAGES = {
  office: `${APPLICATION_ASSET_BASE}/underfloor-application-offices-workspaces.webp`,
  "commercial-building": `${APPLICATION_ASSET_BASE}/underfloor-application-commercial-buildings.webp`,
  "meeting-room": `${APPLICATION_ASSET_BASE}/underfloor-application-meeting-conference-spaces.webp`,
  education: `${APPLICATION_ASSET_BASE}/underfloor-application-education-facilities.webp`,
  retail: `${APPLICATION_ASSET_BASE}/underfloor-application-retail-interiors.webp`,
  "flexible-workspace": `${APPLICATION_ASSET_BASE}/underfloor-application-control-flexible-work-areas.webp`,
} as const satisfies Readonly<Record<UnderfloorApplicationIconName, string>>;

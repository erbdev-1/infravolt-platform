import type { MarketCode } from "@/modules/markets/types";

import type { EnquiryItem, EnquirySystemKey } from "./types";

export type EnquiryProductOption = Readonly<{
  value: string;
  label: string;
  meta?: string;
  item: EnquiryItem;
}>;

export type EnquiryProductFamily = Readonly<{
  value: string;
  label: string;
  options: readonly EnquiryProductOption[];
  familyItem?: EnquiryItem;
}>;

// Canonical Contact product-system taxonomy (six primary systems). G-BUS
// remains a valid internal EnquirySystemKey for Application Map/product
// context, but is intentionally excluded here — it is not a seventh primary
// Contact product group.
export const CONTACT_PRODUCT_SYSTEMS = [
  "busbar",
  "cable-management",
  "earthing-lightning",
  "underfloor",
  "led-systems",
  "ev-charging",
] as const satisfies readonly EnquirySystemKey[];

export async function loadEnquiryProductFamilies(system: EnquirySystemKey, market: MarketCode): Promise<readonly EnquiryProductFamily[]> {
  switch (system) {
    case "busbar": return (await import("./product-catalog/busbar")).busbarFamilies(market);
    case "cable-management": return (await import("./product-catalog/cable-management")).cableManagementFamilies();
    case "earthing-lightning": return (await import("./product-catalog/earthing-lightning")).earthingFamilies(market);
    case "underfloor": return (await import("./product-catalog/underfloor")).underfloorFamilies(market);
    case "led-systems": return (await import("./product-catalog/led-systems")).ledFamilies(market);
    case "ev-charging": return (await import("./product-catalog/ev-charging")).evChargingFamilies(market);
    default: return [];
  }
}


import { underfloorHubContentForMarket } from "@/data/products/underfloor/content";
import type { MarketCode } from "@/modules/markets/types";

import type { EnquiryProductFamily } from "../product-catalog";

export function underfloorFamilies(market: MarketCode): readonly EnquiryProductFamily[] {
  const content = underfloorHubContentForMarket(market);
  const sourceRoute = "/products/underfloor-cable-trunking";
  return content.series.map((series) => ({
    value: series.slug,
    label: series.name,
    options: [],
    familyItem: {
      id: `underfloor:${series.slug}`,
      title: series.name,
      system: "underfloor",
      categoryLabel: market === "ua" ? "Підпідлогові кабельні системи" : "Underfloor Cable Trunking",
      sourceRoute,
    },
  }));
}


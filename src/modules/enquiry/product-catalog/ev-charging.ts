import type { MarketCode } from "@/modules/markets/types";

import type { EnquiryProductFamily } from "../product-catalog";

/**
 * No dedicated EV Charging product/model catalogue exists yet (unlike Busbar,
 * Cable Management, Earthing & Lightning, Underfloor and LED Systems, which
 * all have real per-model data). EV Charging is still a primary InfraVolt
 * system (see Application Map sector data and the site product-systems
 * taxonomy), so it must be selectable in the Contact product builder — just
 * at system level only, never with invented models/order codes.
 */
export function evChargingFamilies(market: MarketCode): readonly EnquiryProductFamily[] {
  const sourceRoute = "/#product-systems";
  return [
    {
      value: "ev-charging-systems",
      label: market === "ua" ? "Системи зарядки електромобілів" : "EV Charging Systems",
      options: [],
      familyItem: {
        id: "ev-charging:ev-charging-systems",
        title: market === "ua" ? "Системи зарядки електромобілів" : "EV Charging Systems",
        system: "ev-charging",
        categoryLabel: market === "ua" ? "Заряджання електромобілів" : "EV Charging",
        sourceRoute,
      },
    },
  ];
}

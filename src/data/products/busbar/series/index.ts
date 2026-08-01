import type { MarketCode } from "@/modules/markets/types";

import type { BusbarSystemSlug } from "../catalog-content";
import { GNL_SYSTEM_DETAIL } from "./gnl";
import type { BusbarSystemDetail, BusbarSystemDetailByMarket } from "./types";

const BUSBAR_SERIES_DETAIL: Partial<
  Record<BusbarSystemSlug, BusbarSystemDetailByMarket>
> = {
  "gnl-lighting-busbar": GNL_SYSTEM_DETAIL,
};

export function getBusbarSystemDetail(
  slug: string,
  market: MarketCode,
): BusbarSystemDetail | undefined {
  return BUSBAR_SERIES_DETAIL[slug as BusbarSystemSlug]?.[market];
}

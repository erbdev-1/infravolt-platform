import type { MarketCode } from "@/modules/markets/types";

import type { BusbarSystemSlug } from "../catalog-content";
import { GL_SYSTEM_DETAIL } from "./gl";
import { GM_SYSTEM_DETAIL } from "./gm";
import { GNL_SYSTEM_DETAIL } from "./gnl";
import type { BusbarSystemDetail, BusbarSystemDetailByMarket } from "./types";

const BUSBAR_SERIES_DETAIL: Partial<
  Record<BusbarSystemSlug, BusbarSystemDetailByMarket>
> = {
  "gnl-lighting-busbar": GNL_SYSTEM_DETAIL,
  "gl-lighting-busbar": GL_SYSTEM_DETAIL,
  "gm-low-power-busbar": GM_SYSTEM_DETAIL,
};

export function getBusbarSystemDetail(
  slug: string,
  market: MarketCode,
): BusbarSystemDetail | undefined {
  return BUSBAR_SERIES_DETAIL[slug as BusbarSystemSlug]?.[market];
}

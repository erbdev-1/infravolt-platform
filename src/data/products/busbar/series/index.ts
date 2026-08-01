import type { MarketCode } from "@/modules/markets/types";

import type { BusbarSystemSlug } from "../catalog-content";
import { GGD_SYSTEM_DETAIL } from "./ggd";
import { GL_SYSTEM_DETAIL } from "./gl";
import { GNL_SYSTEM_DETAIL } from "./gnl";
import type { BusbarSystemDetail, BusbarSystemDetailByMarket } from "./types";

const BUSBAR_SERIES_DETAIL: Partial<
  Record<BusbarSystemSlug, BusbarSystemDetailByMarket>
> = {
  "gnl-lighting-busbar": GNL_SYSTEM_DETAIL,
  "gl-lighting-busbar": GL_SYSTEM_DETAIL,
  "ggd-medium-power-busbar": GGD_SYSTEM_DETAIL,
};

export function getBusbarSystemDetail(
  slug: string,
  market: MarketCode,
): BusbarSystemDetail | undefined {
  return BUSBAR_SERIES_DETAIL[slug as BusbarSystemSlug]?.[market];
}

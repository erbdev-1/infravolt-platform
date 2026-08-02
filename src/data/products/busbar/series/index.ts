import type { MarketCode } from "@/modules/markets/types";

import type { BusbarSystemSlug } from "../catalog-content";
import { GGD_SYSTEM_DETAIL } from "./ggd";
import { GL_SYSTEM_DETAIL } from "./gl";
import { GM_SYSTEM_DETAIL } from "./gm";
import { GNL_SYSTEM_DETAIL } from "./gnl";
import { GR_SYSTEM_DETAIL } from "./gr";
import { GS_SYSTEM_DETAIL } from "./gs";
import type { BusbarSystemDetail, BusbarSystemDetailByMarket } from "./types";

const BUSBAR_SERIES_DETAIL: Partial<
  Record<BusbarSystemSlug, BusbarSystemDetailByMarket>
> = {
  "gnl-lighting-busbar": GNL_SYSTEM_DETAIL,
  "gl-lighting-busbar": GL_SYSTEM_DETAIL,
  "gm-low-power-busbar": GM_SYSTEM_DETAIL,
  "ggd-medium-power-busbar": GGD_SYSTEM_DETAIL,
  "gs-super-compact": GS_SYSTEM_DETAIL,
  "gr-cast-resin": GR_SYSTEM_DETAIL,
};

export function getBusbarSystemDetail(
  slug: string,
  market: MarketCode,
): BusbarSystemDetail | undefined {
  return BUSBAR_SERIES_DETAIL[slug as BusbarSystemSlug]?.[market];
}

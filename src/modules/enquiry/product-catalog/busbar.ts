import { getBusbarSystemDetail } from "@/data/products/busbar/series";
import { BUSBAR_SYSTEMS } from "@/data/products/busbar/systems";
import type { MarketCode } from "@/modules/markets/types";

import type { EnquiryProductFamily } from "../product-catalog";

export function busbarFamilies(market: MarketCode): readonly EnquiryProductFamily[] {
  return BUSBAR_SYSTEMS.flatMap((system) => {
    const detail = getBusbarSystemDetail(system.slug, market);
    if (!detail?.components.length) return [];
    const sourceRoute = `/products/busbar-systems/${system.slug}`;
    return [{
      value: system.slug,
      label: system.name,
      options: detail.components.map((component) => ({
        value: component.slug,
        label: component.name,
        meta: component.orderCode,
        item: {
          id: `busbar:${system.slug}:${component.slug}:${encodeURIComponent(component.orderCode)}`,
          title: component.name,
          system: "busbar" as const,
          model: component.orderCode,
          categoryLabel: system.name,
          sourceRoute,
        },
      })),
    }];
  });
}


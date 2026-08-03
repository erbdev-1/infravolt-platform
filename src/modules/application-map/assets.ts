import { PRODUCT_ASSETS, type ProductId } from "@/modules/public-site/assets";

import type { ProductFamilyId } from "./types";

// Application Map'in kararlı iç kimlikleri (types.ts) ile homepage'in
// mevcut ProductId sözlüğü arasındaki tek fark "led-systems" / "led-bus
// lighting" yazımıdır. Homepage verisini yeniden adlandırmak yerine (kapsam
// dışı, ilgisiz bir geniş migrasyon olurdu) burada açık bir eşleme tutulur.
const PRODUCT_FAMILY_TO_PRODUCT_ID: Readonly<Record<ProductFamilyId, ProductId>> = {
  "cable-management": "cable-management",
  busbar: "busbar",
  underfloor: "underfloor",
  "earthing-lightning": "earthing-lightning",
  "led-systems": "led-bus lighting",
  "ev-charging": "ev-charging",
};

export function productFamilyIcon(id: ProductFamilyId): string {
  return PRODUCT_ASSETS[PRODUCT_FAMILY_TO_PRODUCT_ID[id]].icon;
}

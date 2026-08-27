import { publicMediaUrl } from "@/modules/storage/asset-url";
import {
  PRODUCT_ASSETS,
  PRODUCT_PAGE_HREFS,
  type ProductId,
} from "@/modules/public-site/assets";

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

type CategoryLinkedProductFamilyId = Exclude<ProductFamilyId, "busbar">;

// Application-map cards use the same canonical category media and routes as
// the public product-system cards. Busbar is deliberately absent: its map
// entries retain their existing family-specific image and action overrides.
const CATEGORY_LINKED_PRODUCT_IDS = {
  "cable-management": "cable-management",
  underfloor: "underfloor",
  "earthing-lightning": "earthing-lightning",
  "led-systems": "led-bus lighting",
  "ev-charging": "ev-charging",
} as const satisfies Readonly<
  Record<CategoryLinkedProductFamilyId, ProductId>
>;

const CATEGORY_LINKED_PRODUCT_IMAGES = {
  "cable-management":
    publicMediaUrl("products/application-map/cable-management-category-transparent.png"),
  underfloor:
    publicMediaUrl("products/application-map/underfloor-systems-category-transparent.png"),
  "earthing-lightning":
    publicMediaUrl("products/application-map/earthing-lightning-category-transparent.png"),
  "led-systems":
    publicMediaUrl("products/application-map/led-systems-category-transparent.png"),
  "ev-charging":
    publicMediaUrl("products/application-map/ev-charging-category-transparent.png"),
} as const satisfies Readonly<Record<CategoryLinkedProductFamilyId, string>>;

export type ApplicationMapCategoryPresentation = Readonly<{
  image: string;
  href: string;
}>;

export function productFamilyIcon(id: ProductFamilyId): string {
  return PRODUCT_ASSETS[PRODUCT_FAMILY_TO_PRODUCT_ID[id]].icon;
}

export function productFamilyCategoryPresentation(
  id: ProductFamilyId,
): ApplicationMapCategoryPresentation | undefined {
  if (id === "busbar") {
    return undefined;
  }

  const productId = CATEGORY_LINKED_PRODUCT_IDS[id];

  return {
    image: CATEGORY_LINKED_PRODUCT_IMAGES[id],
    href: PRODUCT_PAGE_HREFS[productId],
  };
}

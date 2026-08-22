import { earthingHubContentForMarket } from "@/data/products/earthing-lightning/content";
import { EARTHING_CATEGORY_VARIANTS } from "@/data/products/earthing-lightning/variants";
import { earthingEnquiryItem } from "@/modules/enquiry/item-builders";
import type { MarketCode } from "@/modules/markets/types";

import type { EnquiryProductFamily } from "../product-catalog";

function familySlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function earthingFamilies(market: MarketCode): readonly EnquiryProductFamily[] {
  const localized = earthingHubContentForMarket(market);
  const canonical = earthingHubContentForMarket("uk");
  return canonical.categories.flatMap((category, categoryIndex) => {
    const localizedCategory = localized.categories[categoryIndex] ?? category;
    const variantsByFamily = EARTHING_CATEGORY_VARIANTS[category.slug];
    if (!variantsByFamily) return [];
    return category.families.flatMap((family, familyIndex) => {
      const variants = variantsByFamily[family.name];
      if (!variants?.length) return [];
      const localizedFamily = localizedCategory.families[familyIndex]?.name ?? family.name;
      const sourceRoute = `/products/earthing-and-lightning-protection/${category.slug}`;
      const slug = familySlug(family.name);
      return [{
        value: `${category.slug}:${slug}`,
        label: localizedFamily,
        options: variants.map((variant, index) => ({
          value: `${variant.stockCode}:${variant.model}:${index}`,
          label: variant.name,
          meta: `${variant.model} · ${variant.stockCode}`,
          item: earthingEnquiryItem(category.slug, slug, localizedFamily, variant, sourceRoute),
        })),
      }];
    });
  });
}


import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableCategoryPage } from "@/components/public/products/cable-management/cable-category-page";
import { cableManagementCategoryContentForMarket } from "@/data/products/cable-management/category-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = cableManagementCategoryContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/cable-support-systems",
    title: `${content.metaTitle ?? content.title} | InfraVolt`,
    description: content.description,
  });
}

export default async function CableSupportSystemsIndexPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <CableCategoryPage market={marketContext.market} />;
}

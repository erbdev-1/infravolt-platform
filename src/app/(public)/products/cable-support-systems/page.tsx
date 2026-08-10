import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableCategoryPage } from "@/components/public/products/cable-management/cable-category-page";
import { cableManagementCategoryContentForMarket } from "@/data/products/cable-management/category-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = cableManagementCategoryContentForMarket(marketContext.market);

  return {
    title: `${content.title} | InfraVolt`,
    description: content.description,
    alternates: {
      canonical: new URL("/products/cable-support-systems", marketContext.publicSiteUrl),
    },
  };
}

export default async function CableSupportSystemsIndexPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <CableCategoryPage market={marketContext.market} />;
}

import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPage } from "@/components/public/products/led-lighting/led-category-detail-page";
import { industrialHighBayLightingContentForMarket } from "@/data/products/led-lighting/industrial-high-bay-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = industrialHighBayLightingContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/products/led-systems/industrial-high-bay-lighting",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function IndustrialHighBayLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPage market={marketContext.market} />;
}

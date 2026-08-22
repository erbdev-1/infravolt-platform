import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageDecorative } from "@/components/public/products/led-lighting/led-category-detail-page-decorative";
import { decorativeLightingContentForMarket } from "@/data/products/led-lighting/decorative-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = decorativeLightingContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/products/led-systems/decorative-lighting", marketContext.publicSiteUrl),
    },
  };
}

export default async function DecorativeLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageDecorative market={marketContext.market} />;
}

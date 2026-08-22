import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageLinearTrunking } from "@/components/public/products/led-lighting/led-category-detail-page-linear-trunking";
import { linearTrunkingLightingContentForMarket } from "@/data/products/led-lighting/linear-trunking-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = linearTrunkingLightingContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/products/led-systems/linear-trunking-lighting",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function LinearTrunkingLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageLinearTrunking market={marketContext.market} />;
}

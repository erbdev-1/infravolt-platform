import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageLinearTrunking } from "@/components/public/products/led-lighting/led-category-detail-page-linear-trunking";
import { linearTrunkingLightingContentForMarket } from "@/data/products/led-lighting/linear-trunking-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = linearTrunkingLightingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/led-systems/linear-trunking-lighting",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function LinearTrunkingLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageLinearTrunking market={marketContext.market} />;
}

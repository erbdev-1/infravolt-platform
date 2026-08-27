import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageOutdoorInfrastructure } from "@/components/public/products/led-lighting/led-category-detail-page-outdoor-infrastructure";
import { outdoorInfrastructureLightingContentForMarket } from "@/data/products/led-lighting/outdoor-infrastructure-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = outdoorInfrastructureLightingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/led-systems/outdoor-infrastructure-lighting",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function OutdoorInfrastructureLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageOutdoorInfrastructure market={marketContext.market} />;
}

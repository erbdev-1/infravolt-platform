import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageOutdoorInfrastructure } from "@/components/public/products/led-lighting/led-category-detail-page-outdoor-infrastructure";
import { outdoorInfrastructureLightingContentForMarket } from "@/data/products/led-lighting/outdoor-infrastructure-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = outdoorInfrastructureLightingContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/products/led-systems/outdoor-infrastructure-lighting",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function OutdoorInfrastructureLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageOutdoorInfrastructure market={marketContext.market} />;
}

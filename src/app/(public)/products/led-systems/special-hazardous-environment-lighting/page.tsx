import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageSpecialHazardous } from "@/components/public/products/led-lighting/led-category-detail-page-special-hazardous";
import { specialHazardousEnvironmentLightingContentForMarket } from "@/data/products/led-lighting/special-hazardous-environment-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const CATEGORY_HREF = "/products/led-systems/special-hazardous-environment-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = specialHazardousEnvironmentLightingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: CATEGORY_HREF,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function SpecialHazardousEnvironmentLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageSpecialHazardous market={marketContext.market} />;
}

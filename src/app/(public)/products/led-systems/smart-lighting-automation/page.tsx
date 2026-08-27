import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageSmartLightingAutomation } from "@/components/public/products/led-lighting/led-category-detail-page-smart-lighting-automation";
import { smartLightingAutomationContentForMarket } from "@/data/products/led-lighting/smart-lighting-automation";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = smartLightingAutomationContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/led-systems/smart-lighting-automation",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function SmartLightingAutomationPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageSmartLightingAutomation market={marketContext.market} />;
}

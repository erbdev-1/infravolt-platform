import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageSmartLightingAutomation } from "@/components/public/products/led-lighting/led-category-detail-page-smart-lighting-automation";
import { smartLightingAutomationContentForMarket } from "@/data/products/led-lighting/smart-lighting-automation";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = smartLightingAutomationContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/products/led-systems/smart-lighting-automation",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function SmartLightingAutomationPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageSmartLightingAutomation market={marketContext.market} />;
}

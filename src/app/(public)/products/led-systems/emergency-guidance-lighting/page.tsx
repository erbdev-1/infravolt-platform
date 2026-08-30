import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageEmergencyGuidance } from "@/components/public/products/led-lighting/led-category-detail-page-emergency-guidance";
import { emergencyGuidanceLightingContentForMarket } from "@/data/products/led-lighting/emergency-guidance-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = emergencyGuidanceLightingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/led-systems/emergency-guidance-lighting",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function EmergencyGuidanceLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageEmergencyGuidance market={marketContext.market} />;
}

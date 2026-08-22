import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageEmergencyGuidance } from "@/components/public/products/led-lighting/led-category-detail-page-emergency-guidance";
import { emergencyGuidanceLightingContentForMarket } from "@/data/products/led-lighting/emergency-guidance-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = emergencyGuidanceLightingContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/products/led-systems/emergency-guidance-lighting",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function EmergencyGuidanceLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageEmergencyGuidance market={marketContext.market} />;
}

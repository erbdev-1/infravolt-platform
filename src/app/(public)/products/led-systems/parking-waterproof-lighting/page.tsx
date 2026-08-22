import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageParkingWaterproof } from "@/components/public/products/led-lighting/led-category-detail-page-parking-waterproof";
import { parkingWaterproofLightingContentForMarket } from "@/data/products/led-lighting/parking-waterproof-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = parkingWaterproofLightingContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/products/led-systems/parking-waterproof-lighting",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function ParkingWaterproofLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageParkingWaterproof market={marketContext.market} />;
}

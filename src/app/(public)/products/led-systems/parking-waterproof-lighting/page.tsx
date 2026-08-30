import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageParkingWaterproof } from "@/components/public/products/led-lighting/led-category-detail-page-parking-waterproof";
import { parkingWaterproofLightingContentForMarket } from "@/data/products/led-lighting/parking-waterproof-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = parkingWaterproofLightingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/led-systems/parking-waterproof-lighting",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function ParkingWaterproofLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageParkingWaterproof market={marketContext.market} />;
}

import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageTrackDownlight } from "@/components/public/products/led-lighting/led-category-detail-page-track-downlight";
import { trackDownlightContentForMarket } from "@/data/products/led-lighting/track-downlight";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = trackDownlightContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/products/led-systems/track-downlight", marketContext.publicSiteUrl),
    },
  };
}

export default async function TrackDownlightPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPageTrackDownlight market={marketContext.market} />;
}

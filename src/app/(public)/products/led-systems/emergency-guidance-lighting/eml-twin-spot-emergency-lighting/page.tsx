import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { EMERGENCY_GUIDANCE_CATEGORY_HREF, emlTwinSpotContentForMarket } from "@/data/products/led-lighting/series/emergency-guidance-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "eml-twin-spot-emergency-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = emlTwinSpotContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: `${EMERGENCY_GUIDANCE_CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function EmlTwinSpotEmergencyLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = emlTwinSpotContentForMarket(marketContext.market);

  return <LedSeriesDetailPage categoryHref={EMERGENCY_GUIDANCE_CATEGORY_HREF} content={content} seriesSlug={SERIES_SLUG} />;
}

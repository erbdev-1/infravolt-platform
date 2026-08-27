import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { EMERGENCY_GUIDANCE_CATEGORY_HREF, srsExitGuidanceContentForMarket } from "@/data/products/led-lighting/series/emergency-guidance-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "srs-exit-guidance-series";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = srsExitGuidanceContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: `${EMERGENCY_GUIDANCE_CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function SrsExitGuidanceSeriesPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = srsExitGuidanceContentForMarket(marketContext.market);

  return <LedSeriesDetailPage categoryHref={EMERGENCY_GUIDANCE_CATEGORY_HREF} content={content} seriesSlug={SERIES_SLUG} />;
}

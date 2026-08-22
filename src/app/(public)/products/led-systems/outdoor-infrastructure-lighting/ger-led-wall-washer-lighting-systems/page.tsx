import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import {
  OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF,
  wallWasherSeriesContentForMarket,
} from "@/data/products/led-lighting/series/outdoor-infrastructure-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const SERIES_SLUG = "ger-led-wall-washer-lighting-systems";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = wallWasherSeriesContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        `${OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}/${SERIES_SLUG}`,
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function GerLedWallWasherLightingSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = wallWasherSeriesContentForMarket(marketContext.market);

  return (
    <LedSeriesDetailPage
      categoryHref={OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}
      content={content}
      seriesSlug={SERIES_SLUG}
    />
  );
}

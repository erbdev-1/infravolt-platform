import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import {
  mcrhConfigurationsForMarket,
  TRACK_DOWNLIGHT_CATEGORY_HREF,
} from "@/data/products/led-lighting/series/track-downlight-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "mcrh-downlights";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = mcrhConfigurationsForMarket(marketContext.market)[0].content;

  return marketPageMetadata({
    market: marketContext.market,
    pathname: `${TRACK_DOWNLIGHT_CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function McrhDownlightsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <LedConfiguredSeriesDetailPage
      categoryHref={TRACK_DOWNLIGHT_CATEGORY_HREF}
      configurations={mcrhConfigurationsForMarket(marketContext.market)}
      market={marketContext.market}
      selectorLabel="Body configuration"
      seriesSlug={SERIES_SLUG}
    />
  );
}

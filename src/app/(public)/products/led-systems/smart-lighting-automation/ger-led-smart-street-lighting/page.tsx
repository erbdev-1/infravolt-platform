import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { gerLedSmartStreetLightingContentForMarket } from "@/data/products/led-lighting/series/ger-led-smart-street-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "ger-led-smart-street-lighting";
const CATEGORY_HREF = "/products/led-systems/smart-lighting-automation";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = gerLedSmartStreetLightingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: `${CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function GerLedSmartStreetLightingSeriesPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = gerLedSmartStreetLightingContentForMarket(marketContext.market);

  return <LedSeriesDetailPage categoryHref={CATEGORY_HREF} content={content} seriesSlug={SERIES_SLUG} />;
}

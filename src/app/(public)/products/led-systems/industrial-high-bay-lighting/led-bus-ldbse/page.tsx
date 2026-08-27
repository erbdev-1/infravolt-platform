import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { ledBusLdbseContentForMarket } from "@/data/products/led-lighting/series/led-bus-ldbse";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "led-bus-ldbse";
const CATEGORY_HREF = "/products/led-systems/industrial-high-bay-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = ledBusLdbseContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: `${CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function LedBusLdbseSeriesPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = ledBusLdbseContentForMarket(marketContext.market);

  return <LedSeriesDetailPage categoryHref={CATEGORY_HREF} content={content} seriesSlug={SERIES_SLUG} />;
}

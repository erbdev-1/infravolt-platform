import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { seraLedSeriesContentForMarket, SPECIAL_HAZARDOUS_CATEGORY_HREF } from "@/data/products/led-lighting/series/special-hazardous-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "gersan-sera-led-greenhouse-luminaires";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = seraLedSeriesContentForMarket(marketContext.market);
  return marketPageMetadata({
    market: marketContext.market,
    pathname: `${SPECIAL_HAZARDOUS_CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function SeraLedSeriesPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = seraLedSeriesContentForMarket(marketContext.market);
  return <LedSeriesDetailPage categoryHref={SPECIAL_HAZARDOUS_CATEGORY_HREF} content={content} seriesSlug={SERIES_SLUG} />;
}

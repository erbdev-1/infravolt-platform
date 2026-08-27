import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedExproofSeriesDetailPage } from "@/components/public/products/led-lighting/led-exproof-series-detail-page";
import { exproofSeriesContentForMarket, SPECIAL_HAZARDOUS_CATEGORY_HREF } from "@/data/products/led-lighting/series/special-hazardous-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "gersan-exproof-led-lighting-systems";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const { ldbexp } = exproofSeriesContentForMarket(marketContext.market);
  return marketPageMetadata({
    market: marketContext.market,
    pathname: `${SPECIAL_HAZARDOUS_CATEGORY_HREF}/${SERIES_SLUG}`,
    title: ldbexp.metadata.title,
    description: ldbexp.metadata.description,
  });
}

export default async function ExproofSeriesPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = exproofSeriesContentForMarket(marketContext.market);
  return <LedExproofSeriesDetailPage categoryHref={SPECIAL_HAZARDOUS_CATEGORY_HREF} gslExp={content.gslExp} ldbexp={content.ldbexp} market={marketContext.market} seriesSlug={SERIES_SLUG} />;
}

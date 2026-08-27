import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { SPECIAL_HAZARDOUS_CATEGORY_HREF, texLedSeriesContentForMarket } from "@/data/products/led-lighting/series/special-hazardous-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "gersan-tex-led-lighting-systems";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = texLedSeriesContentForMarket(marketContext.market);
  return marketPageMetadata({
    market: marketContext.market,
    pathname: `${SPECIAL_HAZARDOUS_CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function TexLedSeriesPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = texLedSeriesContentForMarket(marketContext.market);
  return <LedSeriesDetailPage categoryHref={SPECIAL_HAZARDOUS_CATEGORY_HREF} content={content} seriesSlug={SERIES_SLUG} />;
}

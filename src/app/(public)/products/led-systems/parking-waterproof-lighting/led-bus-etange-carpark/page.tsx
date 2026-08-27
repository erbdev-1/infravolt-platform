import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { ledBusEtangeCarparkContentForMarket } from "@/data/products/led-lighting/series/led-bus-etange-carpark";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "led-bus-etange-carpark";
const CATEGORY_HREF = "/products/led-systems/parking-waterproof-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const context = resolveTrustedMarketContext(await headers());
  const content = ledBusEtangeCarparkContentForMarket(context.market);
  return marketPageMetadata({
    market: context.market,
    pathname: `${CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function LedBusEtangeCarparkPage() {
  const context = resolveTrustedMarketContext(await headers());
  return <LedSeriesDetailPage categoryHref={CATEGORY_HREF} content={ledBusEtangeCarparkContentForMarket(context.market)} seriesSlug={SERIES_SLUG} />;
}

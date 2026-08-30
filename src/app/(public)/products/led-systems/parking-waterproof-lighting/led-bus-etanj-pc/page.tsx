import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { ledBusEtanjPcContentForMarket } from "@/data/products/led-lighting/series/led-bus-etanj-pc";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "led-bus-etanj-pc";
const CATEGORY_HREF = "/products/led-systems/parking-waterproof-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const context = resolveTrustedMarketContext(await headers());
  const content = ledBusEtanjPcContentForMarket(context.market);
  return marketPageMetadata({
    market: context.market,
    pathname: `${CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function LedBusEtanjPcPage() {
  const context = resolveTrustedMarketContext(await headers());
  return <LedSeriesDetailPage categoryHref={CATEGORY_HREF} content={ledBusEtanjPcContentForMarket(context.market)} seriesSlug={SERIES_SLUG} />;
}

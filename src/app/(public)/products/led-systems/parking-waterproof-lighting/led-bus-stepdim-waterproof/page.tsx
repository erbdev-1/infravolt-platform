import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { ledBusStepdimWaterproofContentForMarket } from "@/data/products/led-lighting/series/led-bus-stepdim-waterproof";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "led-bus-stepdim-waterproof";
const CATEGORY_HREF = "/products/led-systems/parking-waterproof-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const context = resolveTrustedMarketContext(await headers());
  const content = ledBusStepdimWaterproofContentForMarket(context.market);
  return marketPageMetadata({
    market: context.market,
    pathname: `${CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function LedBusStepdimWaterproofPage() {
  const context = resolveTrustedMarketContext(await headers());
  return <LedSeriesDetailPage categoryHref={CATEGORY_HREF} content={ledBusStepdimWaterproofContentForMarket(context.market)} seriesSlug={SERIES_SLUG} />;
}

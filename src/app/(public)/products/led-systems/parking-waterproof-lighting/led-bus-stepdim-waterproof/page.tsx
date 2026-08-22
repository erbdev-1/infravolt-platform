import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { ledBusStepdimWaterproofContentForMarket } from "@/data/products/led-lighting/series/led-bus-stepdim-waterproof";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const SERIES_SLUG = "led-bus-stepdim-waterproof";
const CATEGORY_HREF = "/products/led-systems/parking-waterproof-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const context = resolveTrustedMarketContext(await headers());
  const content = ledBusStepdimWaterproofContentForMarket(context.market);
  return { title: content.metadata.title, description: content.metadata.description, alternates: { canonical: new URL(`${CATEGORY_HREF}/${SERIES_SLUG}`, context.publicSiteUrl) } };
}

export default async function LedBusStepdimWaterproofPage() {
  const context = resolveTrustedMarketContext(await headers());
  return <LedSeriesDetailPage categoryHref={CATEGORY_HREF} content={ledBusStepdimWaterproofContentForMarket(context.market)} seriesSlug={SERIES_SLUG} />;
}

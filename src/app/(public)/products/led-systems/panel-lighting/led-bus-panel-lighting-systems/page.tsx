import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { ledBusPanelContentForMarket, PANEL_CATEGORY_HREF } from "@/data/products/led-lighting/series/panel-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const SERIES_SLUG = "led-bus-panel-lighting-systems";

export async function generateMetadata(): Promise<Metadata> {
  const market = resolveTrustedMarketContext(await headers());
  const content = ledBusPanelContentForMarket(market.market);
  return { title: content.metadata.title, description: content.metadata.description, alternates: { canonical: new URL(`${PANEL_CATEGORY_HREF}/${SERIES_SLUG}`, market.publicSiteUrl) } };
}

export default async function LedBusPanelLightingSystemsPage() {
  const market = resolveTrustedMarketContext(await headers());
  return <LedSeriesDetailPage categoryHref={PANEL_CATEGORY_HREF} content={ledBusPanelContentForMarket(market.market)} seriesSlug={SERIES_SLUG} />;
}

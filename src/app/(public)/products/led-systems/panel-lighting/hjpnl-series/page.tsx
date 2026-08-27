import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import { hjpnlConfigurationsForMarket, PANEL_CATEGORY_HREF } from "@/data/products/led-lighting/series/panel-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
const SERIES_SLUG = "hjpnl-series";
export async function generateMetadata(): Promise<Metadata> { const market = resolveTrustedMarketContext(await headers()); const content = hjpnlConfigurationsForMarket(market.market)[0].content; return marketPageMetadata({
  market: market.market,
  pathname: `${PANEL_CATEGORY_HREF}/${SERIES_SLUG}`,
  title: content.metadata.title,
  description: content.metadata.description,
}); }
export default async function HjpnlSeriesPage() { const market = resolveTrustedMarketContext(await headers()); return <LedConfiguredSeriesDetailPage categoryHref={PANEL_CATEGORY_HREF} configurations={hjpnlConfigurationsForMarket(market.market)} market={market.market} selectorLabel="Mounting configuration" seriesSlug={SERIES_SLUG} />; }

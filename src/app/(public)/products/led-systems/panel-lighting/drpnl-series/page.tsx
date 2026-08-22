import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import { drpnlConfigurationsForMarket, PANEL_CATEGORY_HREF } from "@/data/products/led-lighting/series/panel-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
const SERIES_SLUG = "drpnl-series";
export async function generateMetadata(): Promise<Metadata> { const market = resolveTrustedMarketContext(await headers()); const content = drpnlConfigurationsForMarket(market.market)[0].content; return { title: content.metadata.title, description: content.metadata.description, alternates: { canonical: new URL(`${PANEL_CATEGORY_HREF}/${SERIES_SLUG}`, market.publicSiteUrl) } }; }
export default async function DrpnlSeriesPage() { const market = resolveTrustedMarketContext(await headers()); return <LedConfiguredSeriesDetailPage categoryHref={PANEL_CATEGORY_HREF} configurations={drpnlConfigurationsForMarket(market.market)} market={market.market} selectorLabel="Mounting configuration" seriesSlug={SERIES_SLUG} />; }

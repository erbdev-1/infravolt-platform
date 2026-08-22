import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import { LINEAR_TRUNKING_CATEGORY_HREF, lwConfigurationsForMarket } from "@/data/products/led-lighting/series/linear-trunking-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
const SERIES_SLUG = "lw-wp-architectural-linear";
export async function generateMetadata(): Promise<Metadata> { const market = resolveTrustedMarketContext(await headers()); const content = lwConfigurationsForMarket(market.market)[0].content; return { title: content.metadata.title, description: content.metadata.description, alternates: { canonical: new URL(`${LINEAR_TRUNKING_CATEGORY_HREF}/${SERIES_SLUG}`, market.publicSiteUrl) } }; }
export default async function LwWpArchitecturalLinearPage() { const market = resolveTrustedMarketContext(await headers()); return <LedConfiguredSeriesDetailPage categoryHref={LINEAR_TRUNKING_CATEGORY_HREF} configurations={lwConfigurationsForMarket(market.market)} market={market.market} selectorLabel="Product configuration" seriesSlug={SERIES_SLUG} />; }

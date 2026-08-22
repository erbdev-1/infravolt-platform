import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import { LINEAR_TRUNKING_CATEGORY_HREF, lnr55ConfigurationsForMarket } from "@/data/products/led-lighting/series/linear-trunking-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
const SERIES_SLUG = "linner-lnr55";
export async function generateMetadata(): Promise<Metadata> { const market = resolveTrustedMarketContext(await headers()); const content = lnr55ConfigurationsForMarket(market.market)[0].content; return { title: content.metadata.title, description: content.metadata.description, alternates: { canonical: new URL(`${LINEAR_TRUNKING_CATEGORY_HREF}/${SERIES_SLUG}`, market.publicSiteUrl) } }; }
export default async function LinnerLnr55Page() { const market = resolveTrustedMarketContext(await headers()); return <LedConfiguredSeriesDetailPage categoryHref={LINEAR_TRUNKING_CATEGORY_HREF} configurations={lnr55ConfigurationsForMarket(market.market)} market={market.market} selectorLabel="Lighting configuration" seriesSlug={SERIES_SLUG} />; }

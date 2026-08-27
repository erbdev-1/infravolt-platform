import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import { LINEAR_TRUNKING_CATEGORY_HREF, lnr33dConfigurationsForMarket } from "@/data/products/led-lighting/series/linear-trunking-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
const SERIES_SLUG = "linner-lnr33d";
export async function generateMetadata(): Promise<Metadata> { const market = resolveTrustedMarketContext(await headers()); const content = lnr33dConfigurationsForMarket(market.market)[0].content; return marketPageMetadata({
  market: market.market,
  pathname: `${LINEAR_TRUNKING_CATEGORY_HREF}/${SERIES_SLUG}`,
  title: content.metadata.title,
  description: content.metadata.description,
}); }
export default async function LinnerLnr33dPage() { const market = resolveTrustedMarketContext(await headers()); return <LedConfiguredSeriesDetailPage categoryHref={LINEAR_TRUNKING_CATEGORY_HREF} configurations={lnr33dConfigurationsForMarket(market.market)} market={market.market} selectorLabel="Optical configuration" seriesSlug={SERIES_SLUG} />; }

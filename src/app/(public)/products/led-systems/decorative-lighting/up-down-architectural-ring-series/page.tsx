import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { architecturalRingContentForMarket, DECORATIVE_CATEGORY_HREF } from "@/data/products/led-lighting/series/decorative-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
const SERIES_SLUG = "up-down-architectural-ring-series";
export async function generateMetadata(): Promise<Metadata> { const market = resolveTrustedMarketContext(await headers()); const content = architecturalRingContentForMarket(market.market); return marketPageMetadata({
  market: market.market,
  pathname: `${DECORATIVE_CATEGORY_HREF}/${SERIES_SLUG}`,
  title: content.metadata.title,
  description: content.metadata.description,
}); }
export default async function ArchitecturalRingSeriesPage() { const market = resolveTrustedMarketContext(await headers()); return <LedSeriesDetailPage categoryHref={DECORATIVE_CATEGORY_HREF} content={architecturalRingContentForMarket(market.market)} seriesSlug={SERIES_SLUG} />; }

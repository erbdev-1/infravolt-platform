import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { DECORATIVE_CATEGORY_HREF, decorativeBollardContentForMarket } from "@/data/products/led-lighting/series/decorative-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
const SERIES_SLUG = "decorative-bollard-lighting";
export async function generateMetadata(): Promise<Metadata> { const market = resolveTrustedMarketContext(await headers()); const content = decorativeBollardContentForMarket(market.market); return marketPageMetadata({
  market: market.market,
  pathname: `${DECORATIVE_CATEGORY_HREF}/${SERIES_SLUG}`,
  title: content.metadata.title,
  description: content.metadata.description,
}); }
export default async function DecorativeBollardPage() { const market = resolveTrustedMarketContext(await headers()); return <LedSeriesDetailPage categoryHref={DECORATIVE_CATEGORY_HREF} content={decorativeBollardContentForMarket(market.market)} seriesSlug={SERIES_SLUG} />; }

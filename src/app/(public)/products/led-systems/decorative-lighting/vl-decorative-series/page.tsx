import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { DECORATIVE_CATEGORY_HREF, vlDecorativeContentForMarket } from "@/data/products/led-lighting/series/decorative-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
const SERIES_SLUG = "vl-decorative-series";
export async function generateMetadata(): Promise<Metadata> { const market = resolveTrustedMarketContext(await headers()); const content = vlDecorativeContentForMarket(market.market); return { title: content.metadata.title, description: content.metadata.description, alternates: { canonical: new URL(`${DECORATIVE_CATEGORY_HREF}/${SERIES_SLUG}`, market.publicSiteUrl) } }; }
export default async function VlDecorativeSeriesPage() { const market = resolveTrustedMarketContext(await headers()); return <LedSeriesDetailPage categoryHref={DECORATIVE_CATEGORY_HREF} content={vlDecorativeContentForMarket(market.market)} seriesSlug={SERIES_SLUG} />; }

import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { cylpConfigurationsForMarket, TRACK_DOWNLIGHT_CATEGORY_HREF } from "@/data/products/led-lighting/series/track-downlight-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
const SLUG="cylp-pendant-track-series";
export async function generateMetadata():Promise<Metadata>{const m=resolveTrustedMarketContext(await headers());const c=cylpConfigurationsForMarket(m.market)[0].content;return marketPageMetadata({
  market: m.market,
  pathname: `${TRACK_DOWNLIGHT_CATEGORY_HREF}/${SLUG}`,
  title: c.metadata.title,
  description: c.metadata.description,
});}
export default async function Page(){const m=resolveTrustedMarketContext(await headers());return <LedSeriesDetailPage categoryHref={TRACK_DOWNLIGHT_CATEGORY_HREF} content={cylpConfigurationsForMarket(m.market)[0].content} seriesSlug={SLUG}/>;}

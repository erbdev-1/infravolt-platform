import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import { compactConfigurationsForMarket, TRACK_DOWNLIGHT_CATEGORY_HREF } from "@/data/products/led-lighting/series/track-downlight-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
const SLUG="compact-standard-downlights";
export async function generateMetadata():Promise<Metadata>{const m=resolveTrustedMarketContext(await headers());const c=compactConfigurationsForMarket(m.market)[0].content;return marketPageMetadata({
  market: m.market,
  pathname: `${TRACK_DOWNLIGHT_CATEGORY_HREF}/${SLUG}`,
  title: c.metadata.title,
  description: c.metadata.description,
});}
export default async function Page(){const m=resolveTrustedMarketContext(await headers());return <LedConfiguredSeriesDetailPage categoryHref={TRACK_DOWNLIGHT_CATEGORY_HREF} configurations={compactConfigurationsForMarket(m.market)} market={m.market} selectorLabel="Downlight family" seriesSlug={SLUG}/>;}

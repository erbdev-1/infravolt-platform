import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import { boomBoltonConfigurationsForMarket, TRACK_DOWNLIGHT_CATEGORY_HREF } from "@/data/products/led-lighting/series/track-downlight-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
const SLUG="boom-bolton-adjustable-downlights";
export async function generateMetadata():Promise<Metadata>{const m=resolveTrustedMarketContext(await headers());const c=boomBoltonConfigurationsForMarket(m.market)[0].content;return{title:c.metadata.title,description:c.metadata.description,alternates:{canonical:new URL(`${TRACK_DOWNLIGHT_CATEGORY_HREF}/${SLUG}`,m.publicSiteUrl)}};}
export default async function Page(){const m=resolveTrustedMarketContext(await headers());return <LedConfiguredSeriesDetailPage categoryHref={TRACK_DOWNLIGHT_CATEGORY_HREF} configurations={boomBoltonConfigurationsForMarket(m.market)} market={m.market} selectorLabel="Product configuration" seriesSlug={SLUG}/>;}

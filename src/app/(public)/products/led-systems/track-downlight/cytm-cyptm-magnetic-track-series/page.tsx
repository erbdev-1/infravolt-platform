import type { Metadata } from "next";
import { headers } from "next/headers";
import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import { cytmCyptmConfigurationsForMarket, TRACK_DOWNLIGHT_CATEGORY_HREF } from "@/data/products/led-lighting/series/track-downlight-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
const SLUG="cytm-cyptm-magnetic-track-series";
export async function generateMetadata():Promise<Metadata>{const m=resolveTrustedMarketContext(await headers());const c=cytmCyptmConfigurationsForMarket(m.market)[0].content;return{title:c.metadata.title,description:c.metadata.description,alternates:{canonical:new URL(`${TRACK_DOWNLIGHT_CATEGORY_HREF}/${SLUG}`,m.publicSiteUrl)}};}
export default async function Page(){const m=resolveTrustedMarketContext(await headers());return <LedConfiguredSeriesDetailPage categoryHref={TRACK_DOWNLIGHT_CATEGORY_HREF} configurations={cytmCyptmConfigurationsForMarket(m.market)} market={m.market} selectorLabel="Luminaire configuration" seriesSlug={SLUG}/>;}

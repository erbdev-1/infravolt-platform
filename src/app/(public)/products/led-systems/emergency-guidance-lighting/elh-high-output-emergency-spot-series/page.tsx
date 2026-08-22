import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { elhHighOutputContentForMarket, EMERGENCY_GUIDANCE_CATEGORY_HREF } from "@/data/products/led-lighting/series/emergency-guidance-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const SERIES_SLUG = "elh-high-output-emergency-spot-series";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = elhHighOutputContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(`${EMERGENCY_GUIDANCE_CATEGORY_HREF}/${SERIES_SLUG}`, marketContext.publicSiteUrl),
    },
  };
}

export default async function ElhHighOutputEmergencySpotSeriesPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = elhHighOutputContentForMarket(marketContext.market);

  return <LedSeriesDetailPage categoryHref={EMERGENCY_GUIDANCE_CATEGORY_HREF} content={content} seriesSlug={SERIES_SLUG} />;
}

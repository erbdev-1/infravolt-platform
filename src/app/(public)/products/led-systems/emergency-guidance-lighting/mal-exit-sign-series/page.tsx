import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { EMERGENCY_GUIDANCE_CATEGORY_HREF, malExitSignContentForMarket } from "@/data/products/led-lighting/series/emergency-guidance-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const SERIES_SLUG = "mal-exit-sign-series";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = malExitSignContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(`${EMERGENCY_GUIDANCE_CATEGORY_HREF}/${SERIES_SLUG}`, marketContext.publicSiteUrl),
    },
  };
}

export default async function MalExitSignSeriesPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = malExitSignContentForMarket(marketContext.market);

  return <LedSeriesDetailPage categoryHref={EMERGENCY_GUIDANCE_CATEGORY_HREF} content={content} seriesSlug={SERIES_SLUG} />;
}

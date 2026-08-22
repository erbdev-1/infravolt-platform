import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import {
  kmxLightingConfigurationsForMarket,
  OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF,
} from "@/data/products/led-lighting/series/outdoor-infrastructure-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const SERIES_SLUG = "led-bus-ldb-kmx-canopy-lighting-systems";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const configurations = kmxLightingConfigurationsForMarket(marketContext.market);
  const content = configurations[0].content;

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        `${OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}/${SERIES_SLUG}`,
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function LedBusLdbKmxCanopyLightingSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <LedConfiguredSeriesDetailPage
      categoryHref={OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}
      configurations={kmxLightingConfigurationsForMarket(marketContext.market)}
      market={marketContext.market}
      selectorLabel="Body configuration"
      seriesSlug={SERIES_SLUG}
    />
  );
}

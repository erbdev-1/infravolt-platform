import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import {
  OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF,
  streetLightingConfigurationsForMarket,
} from "@/data/products/led-lighting/series/outdoor-infrastructure-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const SERIES_SLUG = "ger-led-street-lighting-systems";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const configurations = streetLightingConfigurationsForMarket(marketContext.market);
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

export default async function GerLedStreetLightingSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <LedConfiguredSeriesDetailPage
      categoryHref={OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}
      configurations={streetLightingConfigurationsForMarket(marketContext.market)}
      market={marketContext.market}
      selectorLabel="Product configuration"
      seriesSlug={SERIES_SLUG}
    />
  );
}

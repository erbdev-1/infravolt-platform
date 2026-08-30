import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedConfiguredSeriesDetailPage } from "@/components/public/products/led-lighting/led-configured-series-detail-page";
import {
  OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF,
  projectorLightingConfigurationsForMarket,
} from "@/data/products/led-lighting/series/outdoor-infrastructure-series";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

const SERIES_SLUG = "ger-led-projector-lighting-systems";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const configurations = projectorLightingConfigurationsForMarket(marketContext.market);
  const content = configurations[0].content;

  return marketPageMetadata({
    market: marketContext.market,
    pathname: `${OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}/${SERIES_SLUG}`,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function GerLedProjectorLightingSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <LedConfiguredSeriesDetailPage
      categoryHref={OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}
      configurations={projectorLightingConfigurationsForMarket(marketContext.market)}
      market={marketContext.market}
      selectorLabel="Product configuration"
      seriesSlug={SERIES_SLUG}
    />
  );
}

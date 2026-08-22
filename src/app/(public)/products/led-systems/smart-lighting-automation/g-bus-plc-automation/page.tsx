import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { gBusPlcAutomationContentForMarket } from "@/data/products/led-lighting/series/g-bus-plc-automation";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const SERIES_SLUG = "g-bus-plc-automation";
const CATEGORY_HREF = "/products/led-systems/smart-lighting-automation";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = gBusPlcAutomationContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(`${CATEGORY_HREF}/${SERIES_SLUG}`, marketContext.publicSiteUrl),
    },
  };
}

export default async function GBusPlcAutomationSeriesPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = gBusPlcAutomationContentForMarket(marketContext.market);

  return <LedSeriesDetailPage categoryHref={CATEGORY_HREF} content={content} seriesSlug={SERIES_SLUG} />;
}

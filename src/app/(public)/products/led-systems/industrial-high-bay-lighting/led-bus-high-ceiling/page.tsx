import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedSeriesDetailPage } from "@/components/public/products/led-lighting/led-series-detail-page";
import { ledBusHighCeilingContentForMarket } from "@/data/products/led-lighting/series/led-bus-high-ceiling";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const SERIES_SLUG = "led-bus-high-ceiling";
const CATEGORY_HREF = "/products/led-systems/industrial-high-bay-lighting";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = ledBusHighCeilingContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        `${CATEGORY_HREF}/${SERIES_SLUG}`,
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function LedBusHighCeilingSeriesPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = ledBusHighCeilingContentForMarket(marketContext.market);

  return <LedSeriesDetailPage categoryHref={CATEGORY_HREF} content={content} seriesSlug={SERIES_SLUG} />;
}

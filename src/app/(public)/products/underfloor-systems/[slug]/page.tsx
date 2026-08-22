import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { UnderfloorSeriesDetailPage } from "@/components/public/products/underfloor/underfloor-series-detail-page";
import { underfloorSeriesDetailForMarket } from "@/data/products/underfloor/series-detail-content";
import { underfloorHubContentForMarket } from "@/data/products/underfloor/content";
import type { UnderfloorSeriesSlug } from "@/data/products/underfloor/types";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const UNDERFLOOR_SERIES_SLUGS: readonly UnderfloorSeriesSlug[] = [
  "underfloor-junction-boxes",
  "socket-data-accessories",
  "underfloor-cable-trays",
  "raised-floor-trunking",
  "aluminium-trunking",
  "tray-accessories",
];

type RouteParams = Readonly<{ slug: string }>;

export function generateStaticParams(): RouteParams[] {
  return UNDERFLOOR_SERIES_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<RouteParams>;
}>): Promise<Metadata> {
  const { slug } = await params;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = underfloorHubContentForMarket(marketContext.market);
  const series = content.series.find((item) => item.slug === slug);

  if (!series) {
    return {};
  }

  return {
    title: `${series.name} | InfraVolt`,
    description: series.description,
    alternates: {
      canonical: new URL(
        `/products/underfloor-systems/${slug}`,
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function UnderfloorSeriesPage({
  params,
}: Readonly<{
  params: Promise<RouteParams>;
}>) {
  const { slug } = await params;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = underfloorHubContentForMarket(marketContext.market);
  const series = content.series.find((item) => item.slug === slug);
  const detail = underfloorSeriesDetailForMarket(slug, marketContext.market);

  if (!series || !detail) {
    notFound();
  }

  return (
    <UnderfloorSeriesDetailPage
      content={content}
      detail={detail}
      market={marketContext.market}
      series={series}
    />
  );
}

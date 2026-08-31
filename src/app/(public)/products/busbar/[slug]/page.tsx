import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { BusbarSystemDetailPage } from "@/components/public/products/busbar/busbar-system-detail-page";
import {
  busbarCatalogContentForMarket,
  type BusbarSystemSlug,
} from "@/data/products/busbar/catalog-content";
import { getBusbarSystemDetail } from "@/data/products/busbar/series";
import { getBusbarSystemBySlug } from "@/data/products/busbar/systems";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

type RouteParams = Readonly<{ slug: string }>;

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<RouteParams>;
}>): Promise<Metadata> {
  const { slug } = await params;
  const marketContext = resolveTrustedMarketContext(await headers());
  const system = getBusbarSystemBySlug(slug);
  const detail = getBusbarSystemDetail(slug, marketContext.market);

  if (!system || !detail) {
    return {};
  }

  const content = busbarCatalogContentForMarket(marketContext.market);
  const systemCopy = content.systems[system.slug as BusbarSystemSlug];

  return marketPageMetadata({
    market: marketContext.market,
    pathname: `/products/busbar/${slug}`,
    title: `${systemCopy.metaTitle ?? systemCopy.name} | InfraVolt`,
    description: systemCopy.description,
  });
}

export default async function BusbarSeriesPage({
  params,
}: Readonly<{
  params: Promise<RouteParams>;
}>) {
  const { slug } = await params;
  const marketContext = resolveTrustedMarketContext(await headers());
  const system = getBusbarSystemBySlug(slug);
  const detail = getBusbarSystemDetail(slug, marketContext.market);

  if (!system || !detail) {
    notFound();
  }

  return (
    <BusbarSystemDetailPage
      detail={detail}
      market={marketContext.market}
      system={system}
    />
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { BusbarSystemDetailPage } from "@/components/public/products/busbar/busbar-system-detail-page";
import {
  busbarCatalogContentForMarket,
  type BusbarSystemSlug,
} from "@/data/products/busbar/catalog-content";
import { getBusbarSystemDetail } from "@/data/products/busbar/series";
import { getBusbarSystemBySlug } from "@/data/products/busbar/systems";
import { resolveTrustedMarketContext, runtimePublicSiteUrls } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
import { buildBreadcrumbListJsonLd, jsonLdGraph } from "@/modules/seo/structured-data";

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
  const market = marketContext.market;
  const system = getBusbarSystemBySlug(slug);
  const detail = getBusbarSystemDetail(slug, market);

  if (!system || !detail) {
    notFound();
  }

  const content = busbarCatalogContentForMarket(market);
  const systemCopy = content.systems[system.slug as BusbarSystemSlug];
  const origin = runtimePublicSiteUrls()[market].origin;
  const pageUrl = `${origin}/products/busbar/${slug}`;

  const graph = jsonLdGraph([
    buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      { name: content.breadcrumbs.current, url: `${origin}/products/busbar` },
      { name: systemCopy.name, url: pageUrl },
    ]),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <BusbarSystemDetailPage
        detail={detail}
        market={market}
        system={system}
      />
    </>
  );
}

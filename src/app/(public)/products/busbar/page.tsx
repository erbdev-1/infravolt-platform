import type { Metadata } from "next";
import { headers } from "next/headers";

import { BusbarCatalogPage } from "@/components/public/products/busbar/busbar-catalog-page";
import { busbarCatalogContentForMarket } from "@/data/products/busbar/catalog-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = busbarCatalogContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/busbar",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function BusbarPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <BusbarCatalogPage market={marketContext.market} />;
}

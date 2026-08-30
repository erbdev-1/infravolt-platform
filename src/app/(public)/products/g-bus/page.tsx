import type { Metadata } from "next";
import { headers } from "next/headers";

import { GBusPage } from "@/components/public/products/g-bus/g-bus-page";
import { gBusContentForMarket } from "@/data/products/g-bus/content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = gBusContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/g-bus",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function GBusRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <GBusPage market={marketContext.market} />;
}

import type { Metadata } from "next";
import { headers } from "next/headers";

import { GBusPage } from "@/components/public/products/g-bus/g-bus-page";
import { gBusContentForMarket } from "@/data/products/g-bus/content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = gBusContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/products/g-bus", marketContext.publicSiteUrl),
    },
  };
}

export default async function GBusRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <GBusPage market={marketContext.market} />;
}

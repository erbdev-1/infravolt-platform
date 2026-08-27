import type { Metadata } from "next";
import { headers } from "next/headers";

import { ResourcesPage } from "@/components/public/resources/resources-page";
import { resourcesContentForMarket } from "@/data/resources";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = resourcesContentForMarket(marketContext.market);
  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/resources",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function ResourcesRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  return <ResourcesPage market={marketContext.market} />;
}

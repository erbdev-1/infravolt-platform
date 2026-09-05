import type { Metadata } from "next";
import { headers } from "next/headers";

import { DataCentreBusbarLandingPage } from "@/components/public/products/busbar/data-centre-busbar-landing-page";
import { dataCentreBusbarLandingContentForMarket } from "@/data/products/busbar/data-centre-landing-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = dataCentreBusbarLandingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/busbar/data-centre-busbar",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function DataCentreBusbarPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <DataCentreBusbarLandingPage market={marketContext.market} />;
}

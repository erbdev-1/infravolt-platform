import type { Metadata } from "next";
import { headers } from "next/headers";

import { EarthingLightningHubPage } from "@/components/public/products/earthing-lightning/earthing-lightning-hub-page";
import { earthingHubContentForMarket } from "@/data/products/earthing-lightning/content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = earthingHubContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/earthing-and-lightning-protection",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function EarthingLightningProtectionPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <EarthingLightningHubPage market={marketContext.market} />;
}

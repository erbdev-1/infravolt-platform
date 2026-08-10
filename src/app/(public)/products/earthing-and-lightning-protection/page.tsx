import type { Metadata } from "next";
import { headers } from "next/headers";

import { EarthingLightningHubPage } from "@/components/public/products/earthing-lightning/earthing-lightning-hub-page";
import { earthingHubContentForMarket } from "@/data/products/earthing-lightning/content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = earthingHubContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/products/earthing-and-lightning-protection",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function EarthingLightningProtectionPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <EarthingLightningHubPage market={marketContext.market} />;
}

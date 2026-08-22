import type { Metadata } from "next";
import { headers } from "next/headers";

import { UnderfloorHubPage } from "@/components/public/products/underfloor/underfloor-hub-page";
import { underfloorHubContentForMarket } from "@/data/products/underfloor/content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = underfloorHubContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/products/underfloor-systems",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function UnderfloorSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <UnderfloorHubPage market={marketContext.market} />;
}

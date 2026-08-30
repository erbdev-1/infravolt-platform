import type { Metadata } from "next";
import { headers } from "next/headers";

import { UnderfloorHubPage } from "@/components/public/products/underfloor/underfloor-hub-page";
import { underfloorHubContentForMarket } from "@/data/products/underfloor/content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = underfloorHubContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/underfloor-systems",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function UnderfloorSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <UnderfloorHubPage market={marketContext.market} />;
}

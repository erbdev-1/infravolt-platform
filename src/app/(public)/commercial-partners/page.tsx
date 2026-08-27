import type { Metadata } from "next";
import { headers } from "next/headers";

import { CommercialPartnersPage } from "@/components/public/commercial-partners/commercial-partners-page";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { commercialPartnersContentForMarket } from "@/modules/public-site/commercial-partners-content";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = commercialPartnersContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/commercial-partners",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function CommercialPartnersRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <CommercialPartnersPage market={marketContext.market} />;
}

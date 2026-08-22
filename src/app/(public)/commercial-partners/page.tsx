import type { Metadata } from "next";
import { headers } from "next/headers";

import { CommercialPartnersPage } from "@/components/public/trade-account/commercial-partners-page";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { commercialPartnersContentForMarket } from "@/modules/public-site/trade-account-content";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = commercialPartnersContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/commercial-partners", marketContext.publicSiteUrl),
    },
  };
}

export default async function CommercialPartnersRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <CommercialPartnersPage market={marketContext.market} />;
}

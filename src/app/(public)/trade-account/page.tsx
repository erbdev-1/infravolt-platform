import type { Metadata } from "next";
import { headers } from "next/headers";

import { TradeAccountPage } from "@/components/public/trade-account/trade-account-page";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { tradeAccountStatusContentForMarket } from "@/modules/public-site/trade-account-status-content";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = tradeAccountStatusContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/trade-account", marketContext.publicSiteUrl),
    },
  };
}

export default async function TradeAccountRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <TradeAccountPage market={marketContext.market} />;
}

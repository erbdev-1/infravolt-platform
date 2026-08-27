import type { Metadata } from "next";
import { headers } from "next/headers";

import { TradeAccountPage } from "@/components/public/trade-account/trade-account-page";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { tradeAccountStatusContentForMarket } from "@/modules/public-site/trade-account-status-content";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = tradeAccountStatusContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/trade-account",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function TradeAccountRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <TradeAccountPage market={marketContext.market} />;
}

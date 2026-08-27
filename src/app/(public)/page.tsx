import type { Metadata } from "next";
import { headers } from "next/headers";

import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { HomePageView } from "@/modules/public-site/home-page";
import { publicSiteContentForMarket } from "@/modules/public-site/content";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = publicSiteContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function HomePage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <HomePageView market={marketContext.market} />;
}

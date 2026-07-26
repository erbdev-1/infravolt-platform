import type { Metadata } from "next";
import { headers } from "next/headers";

import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { HomePageView } from "@/modules/public-site/home-page";
import { publicSiteContentForMarket } from "@/modules/public-site/content";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = publicSiteContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/", marketContext.publicSiteUrl),
    },
  };
}

export default async function HomePage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <HomePageView market={marketContext.market} />;
}

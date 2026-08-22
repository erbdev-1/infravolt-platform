import type { Metadata } from "next";
import { headers } from "next/headers";

import { AboutPageView } from "@/components/public/about/about-page";
import { aboutPageContentForMarket } from "@/modules/public-site/about-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = aboutPageContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/about", marketContext.publicSiteUrl),
    },
  };
}

export default async function AboutPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <AboutPageView market={marketContext.market} />;
}

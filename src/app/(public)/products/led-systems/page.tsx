import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedLightingHubPage } from "@/components/public/products/led-lighting/led-lighting-hub-page";
import { ledLightingHubContentForMarket } from "@/data/products/led-lighting/content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = ledLightingHubContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/products/led-systems", marketContext.publicSiteUrl),
    },
  };
}

export default async function LedSystemsIndexPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedLightingHubPage market={marketContext.market} />;
}

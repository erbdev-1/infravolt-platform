import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedLightingHubPage } from "@/components/public/products/led-lighting/led-lighting-hub-page";
import { ledLightingHubContentForMarket } from "@/data/products/led-lighting/content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = ledLightingHubContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/led-systems",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function LedSystemsIndexPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedLightingHubPage market={marketContext.market} />;
}

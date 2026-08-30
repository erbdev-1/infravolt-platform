import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPagePanel } from "@/components/public/products/led-lighting/led-category-detail-page-panel";
import { panelLightingContentForMarket } from "@/data/products/led-lighting/panel-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = panelLightingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/led-systems/panel-lighting",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function PanelLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPagePanel market={marketContext.market} />;
}

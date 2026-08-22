import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPagePanel } from "@/components/public/products/led-lighting/led-category-detail-page-panel";
import { panelLightingContentForMarket } from "@/data/products/led-lighting/panel-lighting";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = panelLightingContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/products/led-systems/panel-lighting", marketContext.publicSiteUrl),
    },
  };
}

export default async function PanelLightingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return <LedCategoryDetailPagePanel market={marketContext.market} />;
}

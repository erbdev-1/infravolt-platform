import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableMacroFamilyPage } from "@/components/public/products/cable-management/cable-macro-family-page";
import { cableLaddersContentForMarket } from "@/data/products/cable-management/cable-ladders-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

// Static route, sibling to the [slug] dynamic family-detail route — Next.js
// resolves this exact segment before falling back to [slug], so no change
// to that route is needed. Hierarchy: Cable Management Systems (parent) ->
// Cable Ladders (this page) -> individual series pages (none built yet).
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = cableLaddersContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/cable-support-systems/cable-ladders",
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.description,
  });
}

export default async function CableLaddersPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <CableMacroFamilyPage
      content={cableLaddersContentForMarket(marketContext.market)}
      market={marketContext.market}
    />
  );
}

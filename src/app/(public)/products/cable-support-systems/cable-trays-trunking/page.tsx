import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableMacroFamilyPage } from "@/components/public/products/cable-management/cable-macro-family-page";
import { cableTraysTrunkingContentForMarket } from "@/data/products/cable-management/cable-trays-trunking-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

// Static route, sibling to the [slug] dynamic family-detail route — Next.js
// resolves this exact segment before falling back to [slug], so no change
// to that route is needed. Hierarchy: Cable Management Systems (parent) ->
// Cable Trays & Trunking (this page) -> individual series pages (only
// heavy-duty-cable-trays-h60 built so far).
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = cableTraysTrunkingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/cable-support-systems/cable-trays-trunking",
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.description,
  });
}

export default async function CableTraysTrunkingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <CableMacroFamilyPage
      content={cableTraysTrunkingContentForMarket(marketContext.market)}
      market={marketContext.market}
    />
  );
}

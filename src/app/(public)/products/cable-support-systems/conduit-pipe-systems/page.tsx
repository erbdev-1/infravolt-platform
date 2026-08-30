import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableMacroFamilyPage } from "@/components/public/products/cable-management/cable-macro-family-page";
import { conduitPipeSystemsContentForMarket } from "@/data/products/cable-management/conduit-pipe-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

// Static route, sibling to the [slug] dynamic family-detail route — Next.js
// resolves this exact segment before falling back to [slug], so no change
// to that route is needed. Hierarchy: Cable Management Systems (parent) ->
// Conduit & Pipe Systems (this page) -> individual series pages (none
// built yet).
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = conduitPipeSystemsContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/cable-support-systems/conduit-pipe-systems",
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.description,
  });
}

export default async function ConduitPipeSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <CableMacroFamilyPage
      content={conduitPipeSystemsContentForMarket(marketContext.market)}
      market={marketContext.market}
    />
  );
}

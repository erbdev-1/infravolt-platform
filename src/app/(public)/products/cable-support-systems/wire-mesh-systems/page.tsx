import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableMacroFamilyPage } from "@/components/public/products/cable-management/cable-macro-family-page";
import { wireMeshSystemsContentForMarket } from "@/data/products/cable-management/wire-mesh-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

// Static route, sibling to the [slug] dynamic family-detail route — Next.js
// resolves this exact segment before falling back to [slug], so no change
// to that route is needed. Hierarchy: Cable Management Systems (parent) ->
// Wire-Mesh Systems (this page) -> individual series pages (none built yet).
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = wireMeshSystemsContentForMarket(marketContext.market);

  return {
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.description,
    alternates: {
      canonical: new URL(
        "/products/cable-support-systems/wire-mesh-systems",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function WireMeshSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <CableMacroFamilyPage
      content={wireMeshSystemsContentForMarket(marketContext.market)}
      market={marketContext.market}
    />
  );
}

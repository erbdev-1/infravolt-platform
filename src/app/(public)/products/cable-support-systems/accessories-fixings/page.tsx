import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableMacroFamilyPage } from "@/components/public/products/cable-management/cable-macro-family-page";
import { accessoriesFixingsContentForMarket } from "@/data/products/cable-management/accessories-fixings-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

// Static route, sibling to the [slug] dynamic family-detail route — Next.js
// resolves this exact segment before falling back to [slug], so no change
// to that route is needed. Hierarchy: Cable Management Systems (parent) ->
// Accessories & Fixings (this page) -> individual series pages (none
// built yet).
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = accessoriesFixingsContentForMarket(marketContext.market);

  return {
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.description,
    alternates: {
      canonical: new URL(
        "/products/cable-support-systems/accessories-fixings",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function AccessoriesFixingsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <CableMacroFamilyPage
      content={accessoriesFixingsContentForMarket(marketContext.market)}
      market={marketContext.market}
    />
  );
}

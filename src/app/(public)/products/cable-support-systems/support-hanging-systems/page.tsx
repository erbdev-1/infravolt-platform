import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableMacroFamilyPage } from "@/components/public/products/cable-management/cable-macro-family-page";
import { supportHangingSystemsContentForMarket } from "@/data/products/cable-management/support-hanging-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

// Static route, sibling to the [slug] dynamic family-detail route — Next.js
// resolves this exact segment before falling back to [slug], so no change
// to that route is needed. Hierarchy: Cable Management Systems (parent) ->
// Support & Hanging Systems (this page) -> individual series pages
// (future [slug] entries, e.g. npi-80-support-system).
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = supportHangingSystemsContentForMarket(marketContext.market);

  return {
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.description,
    alternates: {
      canonical: new URL(
        "/products/cable-support-systems/support-hanging-systems",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function SupportHangingSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <CableMacroFamilyPage
      content={supportHangingSystemsContentForMarket(marketContext.market)}
      market={marketContext.market}
    />
  );
}

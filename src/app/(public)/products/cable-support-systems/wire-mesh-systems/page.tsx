import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableVariantFamilyTemplate } from "@/components/public/products/cable-management/cable-variant-family-template";
import { wireMeshSystemsContentForMarket } from "@/data/products/cable-management/wire-mesh-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

// Static route using the shared Cable Trays & Trunking family-detail
// template. The catalogue-backed TTK sub-families remain searchable within
// this schedule rather than linking to unimplemented child routes.
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = wireMeshSystemsContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/cable-support-systems/wire-mesh-systems",
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.heroDescription,
  });
}

export default async function WireMeshSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <CableVariantFamilyTemplate
      content={wireMeshSystemsContentForMarket(marketContext.market)}
      market={marketContext.market}
    />
  );
}

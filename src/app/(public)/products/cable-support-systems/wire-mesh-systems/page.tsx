import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableVariantFamilyTemplate } from "@/components/public/products/cable-management/cable-variant-family-template";
import { wireMeshSystemsContentForMarket } from "@/data/products/cable-management/wire-mesh-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

// Static route using the shared Cable Trays & Trunking family-detail
// template. The catalogue-backed TTK sub-families remain searchable within
// this schedule rather than linking to unimplemented child routes.
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = wireMeshSystemsContentForMarket(marketContext.market);

  return {
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.heroDescription,
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
    <CableVariantFamilyTemplate
      content={wireMeshSystemsContentForMarket(marketContext.market)}
      market={marketContext.market}
    />
  );
}

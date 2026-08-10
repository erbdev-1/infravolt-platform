import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableVariantFamilyTemplate } from "@/components/public/products/cable-management/cable-variant-family-template";
import { aluminiumCableTraysTemplateContentForMarket } from "@/data/products/cable-management/aluminium-trays-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

// Static route, sibling to the [slug] dynamic family-detail route. One
// URL, two edge-height tabs (H=70/100mm) via the shared
// CableVariantFamilyTemplate.
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = aluminiumCableTraysTemplateContentForMarket(marketContext.market);

  return {
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.heroDescription,
    alternates: {
      canonical: new URL(
        "/products/cable-support-systems/aluminium-cable-trays",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

type RouteSearchParams = Readonly<{ variant?: string }>;

export default async function AluminiumCableTraysPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<RouteSearchParams>;
}>) {
  const { variant } = await searchParams;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = aluminiumCableTraysTemplateContentForMarket(marketContext.market);

  return <CableVariantFamilyTemplate content={content} initialActiveId={variant} market={marketContext.market} />;
}

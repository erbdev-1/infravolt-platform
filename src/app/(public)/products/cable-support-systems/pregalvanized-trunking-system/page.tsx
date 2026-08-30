import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableVariantFamilyTemplate } from "@/components/public/products/cable-management/cable-variant-family-template";
import { pregalvanizedTrunkingTemplateContentForMarket } from "@/data/products/cable-management/pregalvanized-trunking-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

// Static route, sibling to the [slug] dynamic family-detail route. One
// URL, four edge-height tabs (H=50/75/100/150mm) via the shared
// CableVariantFamilyTemplate.
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = pregalvanizedTrunkingTemplateContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/cable-support-systems/pregalvanized-trunking-system",
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.heroDescription,
  });
}

type RouteSearchParams = Readonly<{ variant?: string }>;

export default async function PregalvanizedTrunkingSystemPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<RouteSearchParams>;
}>) {
  const { variant } = await searchParams;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = pregalvanizedTrunkingTemplateContentForMarket(marketContext.market);

  return <CableVariantFamilyTemplate content={content} initialActiveId={variant} market={marketContext.market} />;
}

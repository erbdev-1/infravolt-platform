import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableVariantFamilyTemplate } from "@/components/public/products/cable-management/cable-variant-family-template";
import { normalTypeStrengthenedTemplateContentForMarket } from "@/data/products/cable-management/normal-type-strengthened-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

// Static route, sibling to the [slug] dynamic family-detail route. One URL,
// five tabs (Normal Type, Strengthened H=40/50/60/100mm) via the shared
// CableVariantFamilyTemplate — Strengthened is no longer a separate
// top-level category card, so it's exposed here instead of as its own
// route (see cable-trays-trunking-content.ts).
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = normalTypeStrengthenedTemplateContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/products/cable-support-systems/normal-type-cable-trays",
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.heroDescription,
  });
}

type RouteSearchParams = Readonly<{ variant?: string }>;

export default async function NormalTypeCableTraysPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<RouteSearchParams>;
}>) {
  const { variant } = await searchParams;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = normalTypeStrengthenedTemplateContentForMarket(marketContext.market);

  return <CableVariantFamilyTemplate content={content} initialActiveId={variant} market={marketContext.market} />;
}

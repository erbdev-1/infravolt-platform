import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableVariantFamilyTemplate } from "@/components/public/products/cable-management/cable-variant-family-template";
import { marineLightingFixtureTemplateContentForMarket } from "@/data/products/cable-management/marine-lighting-fixture-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

// Static route, sibling to the [slug] dynamic family-detail route. One
// URL, two tabs (Marine Type, Lighting Fixture Type) via the shared
// CableVariantFamilyTemplate — these are not separate top-level category
// cards, see cable-trays-trunking-content.ts.
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = marineLightingFixtureTemplateContentForMarket(marketContext.market);

  return {
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.heroDescription,
    alternates: {
      canonical: new URL(
        "/products/cable-support-systems/marine-lighting-fixture-cable-trays",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

type RouteSearchParams = Readonly<{ variant?: string }>;

export default async function MarineLightingFixtureCableTraysPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<RouteSearchParams>;
}>) {
  const { variant } = await searchParams;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = marineLightingFixtureTemplateContentForMarket(marketContext.market);

  return <CableVariantFamilyTemplate content={content} initialActiveId={variant} market={marketContext.market} />;
}

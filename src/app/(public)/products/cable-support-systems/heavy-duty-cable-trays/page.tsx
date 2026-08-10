import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableVariantFamilyTemplate } from "@/components/public/products/cable-management/cable-variant-family-template";
import { heavyDutyCableTraysTemplateContentForMarket } from "@/data/products/cable-management/heavy-duty-cable-trays-template-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

// Static route, sibling to the [slug] dynamic family-detail route — Next.js
// resolves this exact segment before falling back to [slug]. This is the
// canonical Heavy Duty Cable Trays page: one URL, five edge-height tabs
// (H=40/50/60/100mm, GKT-CE) via the shared CableVariantFamilyTemplate,
// replacing what would otherwise be five separate routes. The old
// standalone heavy-duty-cable-trays-h60 route (via [slug]) still resolves
// if bookmarked but is no longer linked to internally.
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = heavyDutyCableTraysTemplateContentForMarket(marketContext.market);

  return {
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.heroDescription,
    alternates: {
      canonical: new URL(
        "/products/cable-support-systems/heavy-duty-cable-trays",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

type RouteSearchParams = Readonly<{ variant?: string }>;

export default async function HeavyDutyCableTraysPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<RouteSearchParams>;
}>) {
  const { variant } = await searchParams;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = heavyDutyCableTraysTemplateContentForMarket(marketContext.market);

  return <CableVariantFamilyTemplate content={content} initialActiveId={variant} market={marketContext.market} />;
}

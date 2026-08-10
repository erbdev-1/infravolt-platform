import type { Metadata } from "next";
import { headers } from "next/headers";

import { CableVariantFamilyTemplate } from "@/components/public/products/cable-management/cable-variant-family-template";
import { clampingLidTemplateContentForMarket } from "@/data/products/cable-management/clamping-lid-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

// Static route, sibling to the [slug] dynamic family-detail route.
export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = clampingLidTemplateContentForMarket(marketContext.market);

  return {
    title: `${content.title} | Cable Management Systems | InfraVolt`,
    description: content.heroDescription,
    alternates: {
      canonical: new URL(
        "/products/cable-support-systems/cable-tray-clamping-lid",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

type RouteSearchParams = Readonly<{ variant?: string }>;

export default async function CableTrayClampingLidPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<RouteSearchParams>;
}>) {
  const { variant } = await searchParams;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = clampingLidTemplateContentForMarket(marketContext.market);

  return <CableVariantFamilyTemplate content={content} initialActiveId={variant} market={marketContext.market} />;
}

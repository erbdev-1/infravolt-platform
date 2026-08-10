import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { EarthingCategoryDetailPage } from "@/components/public/products/earthing-lightning/earthing-category-detail-page";
import { earthingHubContentForMarket } from "@/data/products/earthing-lightning/content";
import type { EarthingCategorySlug } from "@/data/products/earthing-lightning/types";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const EARTHING_CATEGORY_SLUGS: readonly EarthingCategorySlug[] = [
  "lightning-protection",
  "earthing-electrodes-plates",
  "conductors-tapes",
  "clamps-connectors",
  "equipotential-earth-bars",
  "exothermic-welding",
  "inspection-ground-enhancement",
  "static-ex-proof-grounding",
];

type RouteParams = Readonly<{ slug: string }>;

export function generateStaticParams(): RouteParams[] {
  return EARTHING_CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<RouteParams>;
}>): Promise<Metadata> {
  const { slug } = await params;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = earthingHubContentForMarket(marketContext.market);
  const category = content.categories.find((item) => item.slug === slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} | InfraVolt`,
    description: category.description,
    alternates: {
      canonical: new URL(
        `/products/earthing-and-lightning-protection/${slug}`,
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function EarthingCategoryPage({
  params,
}: Readonly<{
  params: Promise<RouteParams>;
}>) {
  const { slug } = await params;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = earthingHubContentForMarket(marketContext.market);
  const category = content.categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <EarthingCategoryDetailPage category={category} market={marketContext.market} />
  );
}

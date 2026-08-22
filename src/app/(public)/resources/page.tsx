import type { Metadata } from "next";
import { headers } from "next/headers";

import { ResourcesPage } from "@/components/public/resources/resources-page";
import { resourcesContentForMarket } from "@/data/resources";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = resourcesContentForMarket(marketContext.market);
  return { title: content.metadata.title, description: content.metadata.description, alternates: { canonical: new URL("/resources", marketContext.publicSiteUrl) } };
}

export default async function ResourcesRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  return <ResourcesPage market={marketContext.market} />;
}

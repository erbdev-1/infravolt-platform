import type { Metadata } from "next";
import { headers } from "next/headers";

import { ReferencesPage } from "@/components/public/references/references-page";
import {
  isReferenceSystemKey,
  referencesContentForMarket,
} from "@/data/references";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = referencesContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/references",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function ReferencesRoute({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ system?: string | string[] }>;
}>) {
  const marketContext = resolveTrustedMarketContext(await headers());
  const parameters = await searchParams;
  const requestedSystem = Array.isArray(parameters.system)
    ? parameters.system[0]
    : parameters.system;

  return (
    <ReferencesPage
      activeSystemKey={
        isReferenceSystemKey(requestedSystem) ? requestedSystem : undefined
      }
      market={marketContext.market}
    />
  );
}

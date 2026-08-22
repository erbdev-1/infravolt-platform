import type { Metadata } from "next";
import { headers } from "next/headers";

import { ReferencesPage } from "@/components/public/references/references-page";
import {
  isReferenceSystemKey,
  referencesContentForMarket,
} from "@/data/references";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = referencesContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/references", marketContext.publicSiteUrl),
    },
  };
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

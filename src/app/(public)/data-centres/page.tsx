import type { Metadata } from "next";
import { headers } from "next/headers";

import { JsonLd } from "@/components/seo/json-ld";
import { DataCentreInfrastructureHub } from "@/components/public/data-centres/data-centre-infrastructure-hub";
import { dataCentreInfrastructureHubContentForMarket } from "@/data/data-centres/content";
import { resolveTrustedMarketContext, runtimePublicSiteUrls } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
import {
  buildBreadcrumbListJsonLd,
  buildCollectionPageJsonLd,
  jsonLdGraph,
} from "@/modules/seo/structured-data";

const PATHNAME = "/data-centres";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = dataCentreInfrastructureHubContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: PATHNAME,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function DataCentresHubPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const market = marketContext.market;
  const content = dataCentreInfrastructureHubContentForMarket(market);
  const origin = runtimePublicSiteUrls()[market].origin;
  const pageUrl = `${origin}${PATHNAME}`;
  const inLanguage = market === "uk" ? "en-GB" : "uk-UA";

  const graph = jsonLdGraph([
    buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      { name: content.breadcrumbs.current, url: pageUrl },
    ]),
    buildCollectionPageJsonLd({
      origin,
      pageUrl,
      name: content.metadata.title,
      description: content.metadata.description,
      inLanguage,
      // Reuses the page's own visible core-systems card order/rows — no
      // re-sorted or separately-authored list.
      items: content.coreSystems.map((system) => ({
        name: system.title,
        url: `${origin}${system.href}`,
      })),
    }),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <DataCentreInfrastructureHub market={market} />
    </>
  );
}

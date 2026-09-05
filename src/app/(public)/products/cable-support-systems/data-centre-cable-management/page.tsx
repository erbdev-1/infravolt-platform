import type { Metadata } from "next";
import { headers } from "next/headers";

import { JsonLd } from "@/components/seo/json-ld";
import { DataCentreCableManagementLandingPage } from "@/components/public/products/cable-management/data-centre-cable-management-landing-page";
import { dataCentreCableManagementLandingContentForMarket } from "@/data/products/cable-management/data-centre-landing-content";
import { resolveTrustedMarketContext, runtimePublicSiteUrls } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
import {
  buildBreadcrumbListJsonLd,
  buildCollectionPageJsonLd,
  jsonLdGraph,
} from "@/modules/seo/structured-data";

const PATHNAME = "/products/cable-support-systems/data-centre-cable-management";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = dataCentreCableManagementLandingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: PATHNAME,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function DataCentreCableManagementPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const market = marketContext.market;
  const content = dataCentreCableManagementLandingContentForMarket(market);
  const origin = runtimePublicSiteUrls()[market].origin;
  const pageUrl = `${origin}${PATHNAME}`;
  const inLanguage = market === "uk" ? "en-GB" : "uk-UA";

  const graph = jsonLdGraph([
    buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      { name: content.breadcrumbs.cableManagement, url: `${origin}/products/cable-support-systems` },
      { name: content.breadcrumbs.current, url: pageUrl },
    ]),
    buildCollectionPageJsonLd({
      origin,
      pageUrl,
      name: content.metadata.title,
      description: content.metadata.description,
      inLanguage,
      // Reuses the page's own visible comparison-table order/rows — no
      // re-sorted or separately-authored list.
      items: content.comparison.rows.map((row) => ({
        name: row.system,
        url: `${origin}${row.href}`,
      })),
    }),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <DataCentreCableManagementLandingPage market={market} />
    </>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";

import { JsonLd } from "@/components/seo/json-ld";
import { DataCentreBusbarLandingPage } from "@/components/public/products/busbar/data-centre-busbar-landing-page";
import { dataCentreBusbarLandingContentForMarket } from "@/data/products/busbar/data-centre-landing-content";
import { resolveTrustedMarketContext, runtimePublicSiteUrls } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
import {
  buildBreadcrumbListJsonLd,
  buildCollectionPageJsonLd,
  jsonLdGraph,
} from "@/modules/seo/structured-data";

const PATHNAME = "/products/busbar/data-centre-busbar";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = dataCentreBusbarLandingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: PATHNAME,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function DataCentreBusbarPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const market = marketContext.market;
  const content = dataCentreBusbarLandingContentForMarket(market);
  const origin = runtimePublicSiteUrls()[market].origin;
  const pageUrl = `${origin}${PATHNAME}`;
  const inLanguage = market === "uk" ? "en-GB" : "uk-UA";

  const graph = jsonLdGraph([
    buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      { name: content.breadcrumbs.busbar, url: `${origin}/products/busbar` },
      { name: content.breadcrumbs.current, url: pageUrl },
    ]),
    buildCollectionPageJsonLd({
      origin,
      pageUrl,
      name: content.metadata.title,
      description: content.metadata.description,
      inLanguage,
      // Reuses the page's own visible comparison-table order/rows —
      // no re-sorted or separately-authored list.
      items: content.comparison.rows.map((row) => ({
        name: row.system,
        url: `${origin}${row.href}`,
      })),
    }),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <DataCentreBusbarLandingPage market={market} />
    </>
  );
}

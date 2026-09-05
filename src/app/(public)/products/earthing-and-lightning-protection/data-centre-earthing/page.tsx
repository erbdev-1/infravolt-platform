import type { Metadata } from "next";
import { headers } from "next/headers";

import { JsonLd } from "@/components/seo/json-ld";
import { DataCentreEarthingLandingPage } from "@/components/public/products/earthing-lightning/data-centre-earthing-landing-page";
import { dataCentreEarthingLandingContentForMarket } from "@/data/products/earthing-lightning/data-centre-landing-content";
import { resolveTrustedMarketContext, runtimePublicSiteUrls } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
import {
  buildBreadcrumbListJsonLd,
  buildCollectionPageJsonLd,
  jsonLdGraph,
} from "@/modules/seo/structured-data";

const PATHNAME = "/products/earthing-and-lightning-protection/data-centre-earthing";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = dataCentreEarthingLandingContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: PATHNAME,
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function DataCentreEarthingPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const market = marketContext.market;
  const content = dataCentreEarthingLandingContentForMarket(market);
  const origin = runtimePublicSiteUrls()[market].origin;
  const pageUrl = `${origin}${PATHNAME}`;
  const inLanguage = market === "uk" ? "en-GB" : "uk-UA";

  const graph = jsonLdGraph([
    buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      {
        name: content.breadcrumbs.earthingLightning,
        url: `${origin}/products/earthing-and-lightning-protection`,
      },
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
      <DataCentreEarthingLandingPage market={market} />
    </>
  );
}

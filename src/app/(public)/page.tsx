import type { Metadata } from "next";
import { headers } from "next/headers";

import { JsonLd } from "@/components/seo/json-ld";
import { resolveTrustedMarketContext, runtimePublicSiteUrls } from "@/modules/markets/server";
import type { MarketCode } from "@/modules/markets/types";
import { HomePageView } from "@/modules/public-site/home-page";
import { publicSiteContentForMarket } from "@/modules/public-site/content";
import { marketPageMetadata } from "@/modules/seo/market-metadata";
import {
  absoluteAssetUrl,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  jsonLdGraph,
  type OrganizationAddressInput,
} from "@/modules/seo/structured-data";
import { publicMediaUrl } from "@/modules/storage/asset-url";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = publicSiteContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

// Every value below is reused from existing, already-published market
// content (footer registered-office address, contact-form emails) —
// nothing here is a new business fact. See structured-data.ts for why the
// UK-only address, and no telephone/sameAs/legalName, are intentional.
const CONTACT_EMAIL: Readonly<Record<MarketCode, string>> = {
  uk: "info@infravolt.co.uk",
  ua: "info@infravolt.com.ua",
};

const AREA_SERVED_COUNTRY: Readonly<Record<MarketCode, string>> = {
  uk: "United Kingdom",
  ua: "Ukraine",
};

const HOME_LANGUAGE: Readonly<Record<MarketCode, string>> = {
  uk: "en-GB",
  ua: "uk-UA",
};

// Matches the footer's Registered Office lines verbatim
// (modules/public-site/content.ts) — UK only; Ukraine has no
// currently-verified public registered address to encode.
const UK_REGISTERED_OFFICE: OrganizationAddressInput = {
  streetAddress: "HTS Building, Tyne View Terrace",
  addressLocality: "Wallsend",
  addressRegion: "Tyne and Wear",
  postalCode: "NE28 6SG",
  addressCountry: "GB",
};

export default async function HomePage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const market = marketContext.market;
  const content = publicSiteContentForMarket(market);
  const origin = runtimePublicSiteUrls()[market].origin;

  const graph = jsonLdGraph([
    buildOrganizationJsonLd({
      origin,
      name: "InfraVolt",
      logoUrl: absoluteAssetUrl(
        origin,
        publicMediaUrl("brand/infravolt-wordmark-transparent.webp"),
      ),
      description: content.metadata.description,
      email: CONTACT_EMAIL[market],
      areaServedCountry: AREA_SERVED_COUNTRY[market],
      address: market === "uk" ? UK_REGISTERED_OFFICE : undefined,
    }),
    buildWebSiteJsonLd({
      origin,
      name: "InfraVolt",
      inLanguage: HOME_LANGUAGE[market],
    }),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <HomePageView market={market} />
    </>
  );
}

import "server-only";

import type { Metadata } from "next";

import { runtimePublicSiteUrls } from "@/modules/markets/server";
import type { MarketCode } from "@/modules/markets/types";

const OPEN_GRAPH_LOCALES = Object.freeze({
  uk: "en_GB",
  ua: "uk_UA",
} as const satisfies Readonly<Record<MarketCode, string>>);

type MarketSiteUrls = Readonly<Record<MarketCode, URL>>;

type MarketPageMetadataInput = Readonly<{
  market: MarketCode;
  pathname: string;
  title: string;
  description: string;
  siteUrls?: MarketSiteUrls;
  socialImage?: Readonly<{
    url: string | URL;
    alt?: string;
    width?: number;
    height?: number;
  }>;
}>;

function pageUrl(origin: URL, pathname: string): URL {
  return new URL(pathname, origin);
}

export function marketPageMetadata({
  market,
  pathname,
  title,
  description,
  siteUrls = runtimePublicSiteUrls(),
  socialImage,
}: MarketPageMetadataInput): Metadata {
  const canonical = pageUrl(siteUrls[market], pathname);
  const openGraphImages = socialImage
    ? [
        {
          url: socialImage.url,
          alt: socialImage.alt,
          width: socialImage.width,
          height: socialImage.height,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": pageUrl(siteUrls.uk, pathname),
        "uk-UA": pageUrl(siteUrls.ua, pathname),
      },
    },
    openGraph: {
      type: "website",
      siteName: "InfraVolt",
      title,
      description,
      url: canonical,
      locale: OPEN_GRAPH_LOCALES[market],
      images: openGraphImages,
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title,
      description,
      images: socialImage ? [socialImage.url] : undefined,
    },
  };
}

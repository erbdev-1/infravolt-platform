import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { isSiteIndexingEnabled } from "@/config/site-indexing";
import { createRuntimeMarketResolver } from "@/modules/markets/server";
import { PUBLIC_ROUTE_PATHS } from "@/modules/seo/public-route-manifest";

export function buildMarketSitemap(publicSiteUrl: URL): MetadataRoute.Sitemap {
  return PUBLIC_ROUTE_PATHS.map((pathname) => ({
    url: new URL(pathname, publicSiteUrl).href,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isSiteIndexingEnabled()) return [];

  const requestHeaders = await headers();
  const resolution = createRuntimeMarketResolver().resolve(
    requestHeaders.get("host") ?? "",
  );

  return buildMarketSitemap(resolution.context.publicSiteUrl);
}

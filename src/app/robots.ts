import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { isSiteIndexingEnabled } from "@/config/site-indexing";
import { createRuntimeMarketResolver } from "@/modules/markets/server";

// Belt-and-suspenders with the noindex/nofollow meta tag in layout.tsx —
// robots.txt stops crawling, the meta tag stops indexing even of a URL
// discovered elsewhere. The explicit launch flag and Vercel Production
// signal must both be present; Preview remains closed even if the flag is
// copied there accidentally.
export function buildRobots(
  indexingEnabled: boolean,
  publicSiteUrl?: URL,
): MetadataRoute.Robots {
  return {
    rules: indexingEnabled
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap:
      indexingEnabled && publicSiteUrl
        ? new URL("/sitemap.xml", publicSiteUrl).href
        : undefined,
  };
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const indexingEnabled = isSiteIndexingEnabled();
  if (!indexingEnabled) return buildRobots(false);

  const requestHeaders = await headers();
  const resolution = createRuntimeMarketResolver().resolve(
    requestHeaders.get("host") ?? "",
  );

  return buildRobots(true, resolution.context.publicSiteUrl);
}

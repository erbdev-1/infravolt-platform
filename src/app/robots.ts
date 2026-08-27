import type { MetadataRoute } from "next";

import { isSiteIndexingEnabled } from "@/config/site-indexing";

// Belt-and-suspenders with the noindex/nofollow meta tag in layout.tsx —
// robots.txt stops crawling, the meta tag stops indexing even of a URL
// discovered elsewhere. Gated on the explicit SITE_INDEXING_ENABLED flag
// (see src/config/site-indexing.ts), not VERCEL_ENV — the real production
// domain is connected before SEO launch is approved, so "is this a real
// Vercel Production deployment" is no longer the right question. Sitemap
// submission is a later SEO-launch milestone, not part of this one — no
// sitemap reference here yet.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: isSiteIndexingEnabled()
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
  };
}

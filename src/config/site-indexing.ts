import "server-only";

/**
 * Explicit feature flag controlling whether the site is indexable —
 * It fails closed unless both the exact string "true" and Vercel's trusted
 * Production environment signal are present. Preview/staging therefore
 * remain noindex even if the feature flag is copied there accidentally.
 * Server-side only by design, never a NEXT_PUBLIC_ variable, so it can
 * never be read or spoofed from the client bundle. Flip to indexable by
 * setting SITE_INDEXING_ENABLED=true in Vercel Production and redeploying
 * — no code change needed.
 */
export function isSiteIndexingEnabled(): boolean {
  return (
    process.env.SITE_INDEXING_ENABLED === "true" &&
    process.env.VERCEL_ENV === "production"
  );
}

/**
 * GA4 configuration — measurement ID and the production-host allowlist.
 * Mirrors the direct-`process.env` pattern already used by
 * `src/modules/storage/asset-url.ts` for other optional NEXT_PUBLIC_*
 * feature flags, rather than routing through the central Zod-validated
 * client environment schema: this variable is genuinely optional forever
 * (analytics stays inert without it) and must never fail a build.
 */

/** Exact production hostnames analytics may ever contact. No wildcards, no *.vercel.app, no localhost. */
const ALLOWED_ANALYTICS_HOSTS = ["infravolt.co.uk", "infravolt.com.ua"] as const;

export function gaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return id && id.trim() !== "" ? id.trim() : undefined;
}

export function isAllowedAnalyticsHost(hostname: string): boolean {
  return (ALLOWED_ANALYTICS_HOSTS as readonly string[]).includes(hostname);
}

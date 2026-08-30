/**
 * Low-level Google tag (gtag.js) wrapper. No consent or React knowledge —
 * see consent-store.ts (state) and tracker.ts (the gated, typed event API
 * everything else in the app should actually call).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

let scriptRequested = false;
let configuredOnce = false;

/**
 * Sets Consent Mode v2 defaults. Safe to call unconditionally and early —
 * this only ever pushes plain objects onto `window.dataLayer` (a bare
 * array until gtag.js is present), so it causes no network request by
 * itself. Advertising signals stay denied everywhere: this task does not
 * implement Google Ads.
 */
export function queueConsentDefaults(): void {
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
}

export function updateAnalyticsConsent(granted: boolean): void {
  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

/** Appends the gtag.js <script> tag once. Caller is responsible for consent/host gating. */
export function loadGtagScript(measurementId: string): void {
  if (scriptRequested) return;
  if (typeof document === "undefined") return;

  if (document.querySelector(`script[data-ga-measurement-id="${measurementId}"]`)) {
    scriptRequested = true;
    return;
  }

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.async = true;
  script.dataset.gaMeasurementId = measurementId;
  document.head.appendChild(script);
  scriptRequested = true;
}

/** `gtag('js', ...)` + `gtag('config', ...)` — exactly once per page session. */
export function initGtagOnce(measurementId: string): void {
  if (configuredOnce) return;
  configuredOnce = true;

  gtag("js", new Date());
  // send_page_view: false — page views are sent explicitly per App Router
  // route change (see tracker.ts), so the automatic pageview never fires
  // and never duplicates the explicit one.
  gtag("config", measurementId, { send_page_view: false });
}

export function sendGtagEvent(name: string, params: Readonly<Record<string, unknown>>): void {
  gtag("event", name, params);
}

export function hasRequestedScript(): boolean {
  return scriptRequested;
}

/** Test-only: resets module-level "loaded once" flags between test cases. */
export function resetGtagLifecycleForTests(): void {
  scriptRequested = false;
  configuredOnce = false;
}

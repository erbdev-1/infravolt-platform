import { useSyncExternalStore } from "react";

// Namespaced, versioned key — bump the suffix if the stored shape ever
// changes so old values are never misread as the new shape.
const STORAGE_KEY = "infravolt.consent.analytics.v1";
const CHANGE_EVENT = "infravolt:analytics-consent-change";

export type ConsentStatus = "granted" | "denied";

export type ConsentRecord = Readonly<{
  status: ConsentStatus;
  /** When the choice was made — informational only, not used for re-prompt logic here. */
  decidedAt: number;
}>;

/** `null` means no choice has been made yet (default state: analytics denied). */
export type ConsentState = ConsentRecord | null;

function parseConsent(raw: string | null): ConsentState {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      ((parsed as ConsentRecord).status === "granted" || (parsed as ConsentRecord).status === "denied") &&
      typeof (parsed as ConsentRecord).decidedAt === "number"
    ) {
      return parsed as ConsentRecord;
    }
    return null;
  } catch {
    return null;
  }
}

// getSnapshot() must return a referentially stable value when nothing
// changed, or useSyncExternalStore re-renders forever — so this caches the
// last parsed record alongside the raw string it came from, and only
// re-parses when the raw localStorage value actually differs (same
// pattern as src/modules/enquiry/store.ts).
let cachedRaw: string | null | undefined;
let cachedState: ConsentState = null;

export function getConsentState(): ConsentState {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedState;

  cachedRaw = raw;
  cachedState = parseConsent(raw);
  return cachedState;
}

function writeConsent(status: ConsentStatus): void {
  if (typeof window === "undefined") return;

  const record: ConsentRecord = { status, decidedAt: Date.now() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function grantAnalyticsConsent(): void {
  writeConsent("granted");
}

export function denyAnalyticsConsent(): void {
  writeConsent("denied");
}

export function subscribeToConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot(): ConsentState {
  return null;
}

export function useConsentState(): ConsentState {
  return useSyncExternalStore(subscribeToConsent, getConsentState, getServerSnapshot);
}

// --- Preference-panel visibility (not persisted — resets on reload) ---
// A separate tiny singleton (same subscribe/notify shape) so the footer's
// "Cookie settings" trigger can reopen the banner without prop-drilling a
// callback through PublicSiteShell -> SiteFooter, and without adding a
// Context provider for a single boolean.

let preferencesOpen = false;
const PREFERENCES_CHANGE_EVENT = "infravolt:analytics-preferences-visibility-change";

export function openConsentPreferences(): void {
  if (typeof window === "undefined") return;
  preferencesOpen = true;
  window.dispatchEvent(new Event(PREFERENCES_CHANGE_EVENT));
}

export function closeConsentPreferences(): void {
  if (typeof window === "undefined") return;
  preferencesOpen = false;
  window.dispatchEvent(new Event(PREFERENCES_CHANGE_EVENT));
}

function getPreferencesOpenSnapshot(): boolean {
  return preferencesOpen;
}

function getPreferencesOpenServerSnapshot(): boolean {
  return false;
}

function subscribeToPreferencesVisibility(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(PREFERENCES_CHANGE_EVENT, callback);
  return () => window.removeEventListener(PREFERENCES_CHANGE_EVENT, callback);
}

export function useConsentPreferencesOpen(): boolean {
  return useSyncExternalStore(subscribeToPreferencesVisibility, getPreferencesOpenSnapshot, getPreferencesOpenServerSnapshot);
}

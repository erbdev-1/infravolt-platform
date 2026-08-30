import { gaMeasurementId, isAllowedAnalyticsHost } from "./config";
import { getConsentState } from "./consent-store";
import { initGtagOnce, loadGtagScript, queueConsentDefaults, sendGtagEvent, updateAnalyticsConsent } from "./gtag";

import type { EnquiryType } from "@/modules/enquiry/types";
import type { LocaleCode, MarketCode } from "@/modules/markets/types";

export type CommonEventContext = Readonly<{
  market: MarketCode;
  locale: LocaleCode;
}>;

type CtaParams = Readonly<{
  cta_name: string;
  cta_location: string;
  product_family?: string;
  product_slug?: string;
}>;

type ProductContextParams = Readonly<{
  product_family?: string;
  product_slug?: string;
}>;

type LeadParams = Readonly<{
  lead_type: EnquiryType;
  source_path?: string;
  product_family?: string;
  product_slug?: string;
}>;

type DocumentParams = Readonly<{
  document_slug?: string;
  document_type?: string;
  product_family?: string;
  product_slug?: string;
}>;

function currentHostname(): string | null {
  if (typeof window === "undefined") return null;
  return window.location.hostname;
}

/** True only when: a measurement ID is configured, the host is an exact allowed production host, and analytics consent is currently granted. */
export function isAnalyticsTrackingAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if (!gaMeasurementId()) return false;

  const hostname = currentHostname();
  if (!hostname || !isAllowedAnalyticsHost(hostname)) return false;

  return getConsentState()?.status === "granted";
}

/**
 * Always safe to call regardless of consent/host — pushes Consent Mode v2
 * defaults (no network effect on its own). Call once as early as possible
 * (see AnalyticsProvider).
 */
export function primeConsentDefaults(): void {
  queueConsentDefaults();
}

/**
 * Activates GA4 for this page session: loads gtag.js and configures it.
 * No-ops unless the measurement ID is set and the host is an exact
 * allowed production host — this is the single gate that decides whether
 * the script tag is ever appended to the document.
 */
export function activateAnalyticsIfAllowed(): void {
  const measurementId = gaMeasurementId();
  if (!measurementId) return;

  const hostname = currentHostname();
  if (!hostname || !isAllowedAnalyticsHost(hostname)) return;

  updateAnalyticsConsent(true);
  loadGtagScript(measurementId);
  initGtagOnce(measurementId);
}

/** Tells gtag (if it was ever loaded) that analytics storage consent was withdrawn. Safe to call even if the script was never loaded. */
export function deactivateAnalytics(): void {
  updateAnalyticsConsent(false);
}

function cleanParams(params: Readonly<Record<string, unknown>>): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    cleaned[key] = value;
  }
  return cleaned;
}

function emit(name: string, common: CommonEventContext, params: Readonly<Record<string, unknown>>): void {
  if (!isAnalyticsTrackingAllowed()) return;
  sendGtagEvent(name, cleanParams({ ...common, ...params }));
}

export function trackPageView(common: CommonEventContext, sourcePath: string): void {
  emit("page_view", common, { source_path: sourcePath });
}

export function trackCtaClick(common: CommonEventContext, params: CtaParams): void {
  emit("cta_click", common, params);
}

export function trackAddToEnquiry(common: CommonEventContext, params: ProductContextParams): void {
  emit("add_to_enquiry", common, params);
}

export function trackRequestQuote(common: CommonEventContext, sourcePath: string, params: ProductContextParams = {}): void {
  emit("request_quote", common, { source_path: sourcePath, ...params });
}

export function trackTechnicalEnquiry(common: CommonEventContext, sourcePath: string, params: ProductContextParams = {}): void {
  emit("technical_enquiry", common, { source_path: sourcePath, ...params });
}

export function trackTechnicalDocumentEnquiry(
  common: CommonEventContext,
  sourcePath: string,
  params: DocumentParams = {},
): void {
  emit("technical_document_enquiry", common, { source_path: sourcePath, ...params });
}

export function trackGenerateLead(common: CommonEventContext, params: LeadParams): void {
  emit("generate_lead", common, params);
}

"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { ConsentBanner } from "./consent-banner";
import {
  closeConsentPreferences,
  denyAnalyticsConsent,
  grantAnalyticsConsent,
  useConsentPreferencesOpen,
  useConsentState,
} from "./consent-store";
import { activateAnalyticsIfAllowed, deactivateAnalytics, isAnalyticsTrackingAllowed, primeConsentDefaults, trackPageView } from "./tracker";

import { localeForMarket } from "@/modules/markets/locale";
import type { MarketCode } from "@/modules/markets/types";

// Runs once per page load, in the browser only ("use client" module — this
// never executes during SSR). Queues Consent Mode v2 defaults as early as
// possible; see gtag.ts — this has no network effect on its own.
primeConsentDefaults();

type AnalyticsProviderProps = Readonly<{
  market: MarketCode;
  children: ReactNode;
}>;

export function AnalyticsProvider({ market, children }: AnalyticsProviderProps) {
  const locale = localeForMarket(market);
  const pathname = usePathname();
  const consentState = useConsentState();
  const preferencesOpen = useConsentPreferencesOpen();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (consentState?.status === "granted") {
      activateAnalyticsIfAllowed();
    } else if (consentState?.status === "denied") {
      deactivateAnalytics();
    }
  }, [consentState?.status]);

  useEffect(() => {
    if (!pathname) return;
    if (!isAnalyticsTrackingAllowed()) return;
    if (lastTrackedPathRef.current === pathname) return;

    lastTrackedPathRef.current = pathname;
    trackPageView({ market, locale }, pathname);
    // consentState?.status is a dependency (not just pathname) so that
    // accepting consent on the current page fires the first page_view
    // immediately, without needing an unrelated route change first.
  }, [pathname, market, locale, consentState?.status]);

  function handleAccept() {
    grantAnalyticsConsent();
    closeConsentPreferences();
  }

  function handleReject() {
    denyAnalyticsConsent();
    closeConsentPreferences();
  }

  const showBanner = consentState === null || preferencesOpen;

  return (
    <>
      {children}
      {showBanner ? <ConsentBanner market={market} onAccept={handleAccept} onReject={handleReject} /> : null}
    </>
  );
}

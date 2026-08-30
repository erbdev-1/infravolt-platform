import { beforeEach, describe, expect, it } from "vitest";

import {
  closeConsentPreferences,
  denyAnalyticsConsent,
  getConsentState,
  grantAnalyticsConsent,
  openConsentPreferences,
} from "./consent-store";

beforeEach(() => {
  window.localStorage.clear();
  closeConsentPreferences();
});

describe("consent-store", () => {
  it("defaults to no decision (analytics denied) when nothing is persisted", () => {
    expect(getConsentState()).toBeNull();
  });

  it("persists an explicit grant", () => {
    grantAnalyticsConsent();

    const state = getConsentState();
    expect(state?.status).toBe("granted");
    expect(typeof state?.decidedAt).toBe("number");
  });

  it("persists an explicit denial", () => {
    denyAnalyticsConsent();

    expect(getConsentState()?.status).toBe("denied");
  });

  it("respects a previously persisted grant on a later read (simulated new page load)", () => {
    grantAnalyticsConsent();

    // getConsentState() re-reads from localStorage every call — nothing is
    // cached across what would be separate page loads in the browser.
    expect(getConsentState()?.status).toBe("granted");
  });

  it("respects a previously persisted denial on a later read", () => {
    denyAnalyticsConsent();

    expect(getConsentState()?.status).toBe("denied");
  });

  it("treats a corrupted stored value as no decision rather than throwing", () => {
    window.localStorage.setItem("infravolt.consent.analytics.v1", "{not valid json");

    expect(getConsentState()).toBeNull();
  });

  it("treats an unrecognised stored shape as no decision", () => {
    window.localStorage.setItem("infravolt.consent.analytics.v1", JSON.stringify({ status: "maybe" }));

    expect(getConsentState()).toBeNull();
  });

  it("a later denial overwrites an earlier grant (withdrawal)", () => {
    grantAnalyticsConsent();
    expect(getConsentState()?.status).toBe("granted");

    denyAnalyticsConsent();
    expect(getConsentState()?.status).toBe("denied");
  });
});

describe("consent preferences visibility (reopen)", () => {
  it("open then close round-trips without throwing", () => {
    // The visible/hidden behaviour itself is exercised end-to-end in
    // analytics-provider.test.tsx (via useConsentPreferencesOpen inside a
    // real component); this only guards the underlying singleton against
    // throwing outside a React tree.
    expect(() => {
      openConsentPreferences();
      closeConsentPreferences();
    }).not.toThrow();
  });
});

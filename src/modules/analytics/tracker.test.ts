import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockGaMeasurementId = vi.fn<() => string | undefined>();
const mockIsAllowedAnalyticsHost = vi.fn<(hostname: string) => boolean>();
const mockGetConsentState = vi.fn<() => { status: "granted" | "denied"; decidedAt: number } | null>();

vi.mock("./config", () => ({
  gaMeasurementId: () => mockGaMeasurementId(),
  isAllowedAnalyticsHost: (hostname: string) => mockIsAllowedAnalyticsHost(hostname),
}));

vi.mock("./consent-store", () => ({
  getConsentState: () => mockGetConsentState(),
}));

const mockSendGtagEvent = vi.fn();
const mockLoadGtagScript = vi.fn();
const mockInitGtagOnce = vi.fn();
const mockUpdateAnalyticsConsent = vi.fn();
const mockQueueConsentDefaults = vi.fn();

vi.mock("./gtag", () => ({
  sendGtagEvent: (...args: unknown[]) => mockSendGtagEvent(...args),
  loadGtagScript: (...args: unknown[]) => mockLoadGtagScript(...args),
  initGtagOnce: (...args: unknown[]) => mockInitGtagOnce(...args),
  updateAnalyticsConsent: (...args: unknown[]) => mockUpdateAnalyticsConsent(...args),
  queueConsentDefaults: (...args: unknown[]) => mockQueueConsentDefaults(...args),
}));

import {
  activateAnalyticsIfAllowed,
  deactivateAnalytics,
  isAnalyticsTrackingAllowed,
  trackAddToEnquiry,
  trackCtaClick,
  trackGenerateLead,
  trackPageView,
  trackRequestQuote,
  trackTechnicalDocumentEnquiry,
  trackTechnicalEnquiry,
} from "./tracker";

const COMMON = { market: "uk" as const, locale: "en-GB" as const };

function setHostname(hostname: string) {
  Object.defineProperty(window, "location", {
    value: { ...window.location, hostname },
    writable: true,
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockGaMeasurementId.mockReturnValue("G-TEST123");
  mockIsAllowedAnalyticsHost.mockReturnValue(true);
  mockGetConsentState.mockReturnValue({ status: "granted", decidedAt: Date.now() });
  setHostname("infravolt.co.uk");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("isAnalyticsTrackingAllowed", () => {
  it("is true when id present, host allowed, and consent granted", () => {
    expect(isAnalyticsTrackingAllowed()).toBe(true);
  });

  it("is false when no measurement id is configured", () => {
    mockGaMeasurementId.mockReturnValue(undefined);
    expect(isAnalyticsTrackingAllowed()).toBe(false);
  });

  it("is false on a disallowed host even with consent granted", () => {
    mockIsAllowedAnalyticsHost.mockReturnValue(false);
    setHostname("uk.infravolt.localhost");
    expect(isAnalyticsTrackingAllowed()).toBe(false);
  });

  it("is false when consent has not been decided", () => {
    mockGetConsentState.mockReturnValue(null);
    expect(isAnalyticsTrackingAllowed()).toBe(false);
  });

  it("is false when consent was explicitly denied", () => {
    mockGetConsentState.mockReturnValue({ status: "denied", decidedAt: Date.now() });
    expect(isAnalyticsTrackingAllowed()).toBe(false);
  });
});

describe("activateAnalyticsIfAllowed / deactivateAnalytics", () => {
  it("loads the script and updates consent to granted on an allowed host", () => {
    activateAnalyticsIfAllowed();

    expect(mockUpdateAnalyticsConsent).toHaveBeenCalledWith(true);
    expect(mockLoadGtagScript).toHaveBeenCalledWith("G-TEST123");
    expect(mockInitGtagOnce).toHaveBeenCalledWith("G-TEST123");
  });

  it("does not load the script on a disallowed host", () => {
    mockIsAllowedAnalyticsHost.mockReturnValue(false);

    activateAnalyticsIfAllowed();

    expect(mockLoadGtagScript).not.toHaveBeenCalled();
    expect(mockInitGtagOnce).not.toHaveBeenCalled();
  });

  it("does not load the script when no measurement id is configured", () => {
    mockGaMeasurementId.mockReturnValue(undefined);

    activateAnalyticsIfAllowed();

    expect(mockLoadGtagScript).not.toHaveBeenCalled();
  });

  it("deactivateAnalytics tells gtag consent was withdrawn", () => {
    deactivateAnalytics();
    expect(mockUpdateAnalyticsConsent).toHaveBeenCalledWith(false);
  });
});

describe("event emission — gated on consent/host/id", () => {
  it("sends page_view with market/locale/source_path when allowed", () => {
    trackPageView(COMMON, "/about");

    expect(mockSendGtagEvent).toHaveBeenCalledWith("page_view", {
      market: "uk",
      locale: "en-GB",
      source_path: "/about",
    });
  });

  it("does not send any event once consent is denied", () => {
    mockGetConsentState.mockReturnValue({ status: "denied", decidedAt: Date.now() });

    trackPageView(COMMON, "/about");
    trackCtaClick(COMMON, { cta_name: "request_quote", cta_location: "hero" });
    trackAddToEnquiry(COMMON, { product_family: "busbar" });
    trackRequestQuote(COMMON, "/contact");
    trackTechnicalEnquiry(COMMON, "/contact");
    trackTechnicalDocumentEnquiry(COMMON, "/contact");
    trackGenerateLead(COMMON, { lead_type: "quote", source_path: "/contact" });

    expect(mockSendGtagEvent).not.toHaveBeenCalled();
  });

  it("does not send any event before a consent decision exists", () => {
    mockGetConsentState.mockReturnValue(null);

    trackPageView(COMMON, "/about");

    expect(mockSendGtagEvent).not.toHaveBeenCalled();
  });

  it("does not send events on a disallowed host even with consent granted", () => {
    mockIsAllowedAnalyticsHost.mockReturnValue(false);

    trackPageView(COMMON, "/about");

    expect(mockSendGtagEvent).not.toHaveBeenCalled();
  });

  it("cta_click carries cta_name/cta_location and optional product context", () => {
    trackCtaClick(COMMON, { cta_name: "request_quote", cta_location: "hero", product_family: "busbar" });

    expect(mockSendGtagEvent).toHaveBeenCalledWith("cta_click", {
      market: "uk",
      locale: "en-GB",
      cta_name: "request_quote",
      cta_location: "hero",
      product_family: "busbar",
    });
  });

  it("strips undefined/empty optional parameters instead of sending them as noise", () => {
    trackCtaClick(COMMON, { cta_name: "contact", cta_location: "header_nav", product_family: undefined, product_slug: "" });

    const [, params] = mockSendGtagEvent.mock.calls[0] as [string, Record<string, unknown>];
    expect(params).not.toHaveProperty("product_family");
    expect(params).not.toHaveProperty("product_slug");
  });

  it("generate_lead carries lead_type and only known-safe fields — no arbitrary keys leak through", () => {
    trackGenerateLead(COMMON, {
      lead_type: "quote",
      source_path: "/contact",
      product_family: "busbar",
      product_slug: "GS-400A",
    });

    const [name, params] = mockSendGtagEvent.mock.calls[0] as [string, Record<string, unknown>];
    expect(name).toBe("generate_lead");
    expect(Object.keys(params).sort()).toEqual(
      ["locale", "lead_type", "market", "product_family", "product_slug", "source_path"].sort(),
    );
  });
});

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  hasRequestedScript,
  initGtagOnce,
  loadGtagScript,
  queueConsentDefaults,
  resetGtagLifecycleForTests,
  sendGtagEvent,
  updateAnalyticsConsent,
} from "./gtag";

function scriptTags(): HTMLScriptElement[] {
  return Array.from(document.querySelectorAll("script[data-ga-measurement-id]"));
}

beforeEach(() => {
  resetGtagLifecycleForTests();
  window.dataLayer = [];
  document.querySelectorAll("script[data-ga-measurement-id]").forEach((el) => el.remove());
});

afterEach(() => {
  document.querySelectorAll("script[data-ga-measurement-id]").forEach((el) => el.remove());
});

describe("queueConsentDefaults", () => {
  it("pushes deny-all defaults, including advertising signals, onto dataLayer without any script tag existing", () => {
    queueConsentDefaults();

    expect(scriptTags()).toHaveLength(0);
    const pushed = window.dataLayer?.find((entry) => Array.isArray(entry) && entry[0] === "consent" && entry[1] === "default");
    expect(pushed).toEqual([
      "consent",
      "default",
      {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      },
    ]);
  });
});

describe("loadGtagScript", () => {
  it("appends exactly one script tag for the measurement id", () => {
    loadGtagScript("G-TEST123");

    expect(scriptTags()).toHaveLength(1);
    expect(scriptTags()[0]?.src).toContain("googletagmanager.com/gtag/js?id=G-TEST123");
  });

  it("does not append a second script tag when called again", () => {
    loadGtagScript("G-TEST123");
    loadGtagScript("G-TEST123");
    loadGtagScript("G-TEST123");

    expect(scriptTags()).toHaveLength(1);
    expect(hasRequestedScript()).toBe(true);
  });
});

describe("initGtagOnce", () => {
  it("pushes js + config with send_page_view: false exactly once even if called repeatedly", () => {
    initGtagOnce("G-TEST123");
    initGtagOnce("G-TEST123");
    initGtagOnce("G-TEST123");

    const configPushes = (window.dataLayer ?? []).filter(
      (entry) => Array.isArray(entry) && entry[0] === "config",
    );
    expect(configPushes).toHaveLength(1);
    expect(configPushes[0]).toEqual(["config", "G-TEST123", { send_page_view: false }]);
  });
});

describe("updateAnalyticsConsent", () => {
  it("pushes analytics_storage: granted", () => {
    updateAnalyticsConsent(true);

    const pushed = window.dataLayer?.find((entry) => Array.isArray(entry) && entry[0] === "consent" && entry[1] === "update");
    expect(pushed).toEqual(["consent", "update", { analytics_storage: "granted" }]);
  });

  it("pushes analytics_storage: denied", () => {
    updateAnalyticsConsent(false);

    const pushed = window.dataLayer?.find((entry) => Array.isArray(entry) && entry[0] === "consent" && entry[1] === "update");
    expect(pushed).toEqual(["consent", "update", { analytics_storage: "denied" }]);
  });
});

describe("sendGtagEvent", () => {
  it("pushes an event command with the given params", () => {
    sendGtagEvent("cta_click", { market: "uk", cta_name: "request_quote" });

    const pushed = window.dataLayer?.find((entry) => Array.isArray(entry) && entry[0] === "event");
    expect(pushed).toEqual(["event", "cta_click", { market: "uk", cta_name: "request_quote" }]);
  });
});

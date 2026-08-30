import { afterEach, describe, expect, it, vi } from "vitest";

import { gaMeasurementId, isAllowedAnalyticsHost } from "./config";

describe("gaMeasurementId", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns undefined when unset", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    expect(gaMeasurementId()).toBeUndefined();
  });

  it("returns the trimmed id when set", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "  G-5CF79FYEG3  ");
    expect(gaMeasurementId()).toBe("G-5CF79FYEG3");
  });
});

describe("isAllowedAnalyticsHost", () => {
  it("allows the exact UK production host", () => {
    expect(isAllowedAnalyticsHost("infravolt.co.uk")).toBe(true);
  });

  it("allows the exact UA production host", () => {
    expect(isAllowedAnalyticsHost("infravolt.com.ua")).toBe(true);
  });

  it("rejects localhost", () => {
    expect(isAllowedAnalyticsHost("localhost")).toBe(false);
  });

  it("rejects market-prefixed local dev hosts", () => {
    expect(isAllowedAnalyticsHost("uk.infravolt.localhost")).toBe(false);
  });

  it("rejects Vercel preview hosts", () => {
    expect(isAllowedAnalyticsHost("infravolt-platform-git-feature.vercel.app")).toBe(false);
  });

  it("rejects an unrelated subdomain (no wildcard match)", () => {
    expect(isAllowedAnalyticsHost("www.infravolt.co.uk")).toBe(false);
    expect(isAllowedAnalyticsHost("admin.infravolt.co.uk")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isAllowedAnalyticsHost("")).toBe(false);
  });
});

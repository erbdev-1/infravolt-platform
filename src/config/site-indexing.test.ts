import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { isSiteIndexingEnabled } from "./site-indexing";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("isSiteIndexingEnabled — fails closed", () => {
  it("is false when unset", () => {
    vi.stubEnv("SITE_INDEXING_ENABLED", undefined);
    expect(isSiteIndexingEnabled()).toBe(false);
  });

  it.each(["false", "TRUE", "1", "yes", ""])("is false for %j (only the exact string \"true\" enables it)", (value) => {
    vi.stubEnv("SITE_INDEXING_ENABLED", value);
    expect(isSiteIndexingEnabled()).toBe(false);
  });

  it("is true only for the exact string \"true\"", () => {
    vi.stubEnv("SITE_INDEXING_ENABLED", "true");
    expect(isSiteIndexingEnabled()).toBe(true);
  });
});

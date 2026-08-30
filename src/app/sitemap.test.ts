import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { buildMarketSitemap } from "./sitemap";

describe("buildMarketSitemap", () => {
  it.each([
    "https://infravolt.co.uk",
    "https://infravolt.com.ua",
  ])("contains only current-market canonical URLs for %s", (origin) => {
    const sitemap = buildMarketSitemap(new URL(origin));

    expect(sitemap).toHaveLength(147);
    expect(sitemap.every((entry) => entry.url.startsWith(`${origin}/`))).toBe(true);
    expect(sitemap.every((entry) => !entry.url.includes("?") && !entry.url.includes("#"))).toBe(true);
    expect(sitemap.some((entry) => entry.url.includes("mcrh-mcrks-downlights"))).toBe(false);
  });
});

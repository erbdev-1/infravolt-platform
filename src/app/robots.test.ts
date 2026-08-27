import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { buildRobots } from "./robots";

describe("buildRobots", () => {
  it("disallows all crawling and omits sitemap while indexing is disabled", () => {
    expect(buildRobots(false)).toEqual({
      rules: { userAgent: "*", disallow: "/" },
      sitemap: undefined,
    });
  });

  it("allows crawling and advertises only the current market sitemap when enabled", () => {
    expect(buildRobots(true, new URL("https://infravolt.com.ua"))).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://infravolt.com.ua/sitemap.xml",
    });
  });
});

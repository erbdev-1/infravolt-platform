import { describe, expect, it } from "vitest";

import { PUBLIC_ROUTE_PATHS } from "./public-route-manifest";

describe("PUBLIC_ROUTE_PATHS", () => {
  it("contains only bounded canonical pathnames", () => {
    expect(PUBLIC_ROUTE_PATHS).toHaveLength(147);
    expect(new Set(PUBLIC_ROUTE_PATHS).size).toBe(PUBLIC_ROUTE_PATHS.length);
    expect(PUBLIC_ROUTE_PATHS.every((pathname) => pathname.startsWith("/"))).toBe(true);
    expect(PUBLIC_ROUTE_PATHS.every((pathname) => !pathname.includes("?") && !pathname.includes("#"))).toBe(true);
    expect(PUBLIC_ROUTE_PATHS.every((pathname) => !pathname.includes("["))).toBe(true);
  });

  it("excludes redirects and superseded route variants", () => {
    expect(PUBLIC_ROUTE_PATHS).not.toContain(
      "/products/led-systems/track-downlight/mcrh-mcrks-downlights",
    );
    expect(PUBLIC_ROUTE_PATHS).not.toContain(
      "/products/cable-support-systems/heavy-duty-cable-trays-h60",
    );
  });
});

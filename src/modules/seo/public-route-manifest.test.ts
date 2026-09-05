import { describe, expect, it } from "vitest";

import { PUBLIC_ROUTE_PATHS } from "./public-route-manifest";

describe("PUBLIC_ROUTE_PATHS", () => {
  it("contains only bounded canonical pathnames", () => {
    expect(PUBLIC_ROUTE_PATHS).toHaveLength(150);
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

  it("includes the Phase 2 Data Centre Busbar landing page exactly once", () => {
    const matches = PUBLIC_ROUTE_PATHS.filter(
      (pathname) => pathname === "/products/busbar/data-centre-busbar",
    );
    expect(matches).toHaveLength(1);
  });

  it("includes the Phase 2 Data Centre Cable Management landing page exactly once", () => {
    const matches = PUBLIC_ROUTE_PATHS.filter(
      (pathname) => pathname === "/products/cable-support-systems/data-centre-cable-management",
    );
    expect(matches).toHaveLength(1);
  });

  it("includes the Phase 2 Data Centre Earthing landing page exactly once", () => {
    const matches = PUBLIC_ROUTE_PATHS.filter(
      (pathname) => pathname === "/products/earthing-and-lightning-protection/data-centre-earthing",
    );
    expect(matches).toHaveLength(1);
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// server.ts imports "server-only", which throws under Vitest's jsdom
// resolution (it resolves the throwing browser build, not Next.js's
// server-condition build) — stub it out rather than weakening the real
// "server-only" guard in source.
vi.mock("server-only", () => ({}));

import { createMarketResolver, UntrustedHostError } from "./server";

const PUBLIC_SITE_URLS = {
  uk: new URL("https://infravolt.co.uk"),
  ua: new URL("https://infravolt.ua"),
};

describe("createMarketResolver — preview hosts", () => {
  it("trusts a configured preview host and resolves it to the given market without redirecting", () => {
    const resolver = createMarketResolver({
      publicSiteUrls: PUBLIC_SITE_URLS,
      previewSiteUrls: { uk: [new URL("https://infravolt-platform-abc123.vercel.app")] },
    });

    const resolution = resolver.resolve("infravolt-platform-abc123.vercel.app");

    expect(resolution.context.market).toBe("uk");
    expect(resolution.redirectToCanonical).toBe(false);
  });

  it("still rejects a completely unknown host as untrusted", () => {
    const resolver = createMarketResolver({
      publicSiteUrls: PUBLIC_SITE_URLS,
      previewSiteUrls: { uk: [new URL("https://infravolt-platform-abc123.vercel.app")] },
    });

    expect(() => resolver.resolve("some-random-host.example.com")).toThrow(UntrustedHostError);
  });
});

describe("createRuntimeMarketResolver — Vercel preview host wiring", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL_UK", "https://infravolt.co.uk");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL_UA", "https://infravolt.ua");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("trusts VERCEL_URL as a uk-market host so a raw preview deployment doesn't 404", async () => {
    vi.stubEnv("VERCEL_URL", "infravolt-platform-git-feat-xyz.vercel.app");
    const { createRuntimeMarketResolver } = await import("./server");

    const resolution = createRuntimeMarketResolver().resolve("infravolt-platform-git-feat-xyz.vercel.app");

    expect(resolution.context.market).toBe("uk");
  });

  it("never crashes when VERCEL_URL is unset (non-Vercel hosting)", async () => {
    const { createRuntimeMarketResolver, UntrustedHostError: ImportedError } = await import("./server");

    expect(() => createRuntimeMarketResolver()).not.toThrow();
    expect(() => createRuntimeMarketResolver().resolve("some-other-host.example.com")).toThrow(ImportedError);
  });
});

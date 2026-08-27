import { afterEach, describe, expect, it, vi } from "vitest";

import { publicDocumentUrl, publicMediaUrl } from "./asset-url";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("publicMediaUrl / publicDocumentUrl — pre-migration fallback", () => {
  it("falls back to today's local /assets path when NEXT_PUBLIC_ASSET_BASE_URL is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_ASSET_BASE_URL", "");

    expect(publicMediaUrl("products/busbar/gr/card/gr-main-product.webp")).toBe(
      "/assets/products/busbar/gr/card/gr-main-product.webp",
    );
    expect(publicDocumentUrl("catalogues/gersan-led-systems-catalogue.pdf")).toBe(
      "/assets/catalogues/gersan-led-systems-catalogue.pdf",
    );
  });

  it("strips a leading slash from the given path either way", () => {
    vi.stubEnv("NEXT_PUBLIC_ASSET_BASE_URL", "");

    expect(publicMediaUrl("/products/busbar/gr/card/gr-main-product.webp")).toBe(
      "/assets/products/busbar/gr/card/gr-main-product.webp",
    );
  });
});

describe("publicMediaUrl / publicDocumentUrl — Cloudflare R2 public URL", () => {
  it("builds a direct custom-domain URL once NEXT_PUBLIC_ASSET_BASE_URL is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_ASSET_BASE_URL", "https://assets.infravolt.com");

    expect(publicMediaUrl("products/busbar/gr/card/gr-main-product.webp")).toBe(
      "https://assets.infravolt.com/products/busbar/gr/card/gr-main-product.webp",
    );
    expect(publicDocumentUrl("catalogues/gersan-led-systems-catalogue.pdf")).toBe(
      "https://assets.infravolt.com/catalogues/gersan-led-systems-catalogue.pdf",
    );
  });

  it("tolerates a trailing slash on the configured base URL", () => {
    vi.stubEnv("NEXT_PUBLIC_ASSET_BASE_URL", "https://assets.infravolt.com/");

    expect(publicMediaUrl("company/hts-warehouse-exterior.webp")).toBe(
      "https://assets.infravolt.com/company/hts-warehouse-exterior.webp",
    );
  });

  it("resolves publicMediaUrl and publicDocumentUrl through the same base (no bucket name in the URL)", () => {
    vi.stubEnv("NEXT_PUBLIC_ASSET_BASE_URL", "https://assets.infravolt.com");

    expect(publicMediaUrl("same/path.webp")).toBe(publicDocumentUrl("same/path.webp"));
  });
});

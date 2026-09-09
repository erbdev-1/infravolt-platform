import { afterEach, describe, expect, it, vi } from "vitest";

import { canonicalCatalogueFilename, canonicalCatalogueHref } from "./canonical-catalogues";

import type { ResourceSystemKey } from "./index";

const EXPECTED_FILENAMES: Record<ResourceSystemKey, string> = {
  busbar: "gersan-busbar-systems-catalogue.pdf",
  cable: "gersan-cable-management-systems-catalogue.pdf",
  earthing: "gersan-earthing-lightning-protection-systems-catalogue.pdf",
  gbus: "gersan-g-bus-automation-systems-catalogue.pdf",
  led: "gersan-led-systems-catalogue.pdf",
  underfloor: "gersan-underfloor-cable-trunking-catalogue.pdf",
};

const OLD_STALE_PATHS = [
  "documents/busbar/gersan-busbar-systems-catalogue.pdf",
  "documents/cable-support/cable_support.pdf",
  "documents/earthing-lightning/gersan-earthing-lightning-protection-catalogue-2026.pdf",
  "documents/g-bus/g-bus.pdf",
  "resources/catalogues/gersan-led-systems-catalogue.pdf",
  "resources/catalogues/gersan-underfloor-cable-trunking-catalogue.pdf",
];

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("canonicalCatalogueHref", () => {
  it("resolves every system key to the exact canonical filename under production base URL", () => {
    vi.stubEnv("NEXT_PUBLIC_ASSET_BASE_URL", "https://assets.infravolt.co.uk");

    for (const [key, filename] of Object.entries(EXPECTED_FILENAMES) as [ResourceSystemKey, string][]) {
      expect(canonicalCatalogueHref(key)).toBe(`https://assets.infravolt.co.uk/documents/${filename}`);
    }
  });

  it("never returns one of the old, superseded public paths", () => {
    vi.stubEnv("NEXT_PUBLIC_ASSET_BASE_URL", "https://assets.infravolt.co.uk");

    const keys = Object.keys(EXPECTED_FILENAMES) as ResourceSystemKey[];
    for (const key of keys) {
      const href = canonicalCatalogueHref(key);
      for (const stalePath of OLD_STALE_PATHS) {
        expect(href).not.toContain(stalePath);
      }
    }
  });

  it("falls back to the local /assets path when no base URL is configured, using the same canonical filename", () => {
    vi.stubEnv("NEXT_PUBLIC_ASSET_BASE_URL", "");

    expect(canonicalCatalogueHref("busbar")).toBe("/assets/documents/gersan-busbar-systems-catalogue.pdf");
  });
});

describe("canonicalCatalogueFilename", () => {
  it("returns the exact six canonical filenames", () => {
    for (const [key, filename] of Object.entries(EXPECTED_FILENAMES) as [ResourceSystemKey, string][]) {
      expect(canonicalCatalogueFilename(key)).toBe(filename);
    }
  });
});

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const REPO_ROOT = join(__dirname, "..", "..", "..");
const SRC_ROOT = join(REPO_ROOT, "src");

/**
 * Regression guard for the "systemic CTA routing bug" fixed across Busbar,
 * Cable Management, Earthing & Lightning, Underfloor and LED Systems:
 * every enquiry/technical-pack CTA used to build a `/uk-support?request=...`
 * or `/uk-support?product=...` href that the (real, unrelated) /uk-support
 * page never consumed, silently dropping the user's product context. All
 * such CTAs must now go through `buildEnquiryHref()` to a real `/contact`
 * route instead. Application Map sector data files are the one deliberate
 * exception — they still author raw `request=` hrefs, but those are
 * rewritten to canonical `/contact` hrefs at render time by
 * `routeApplicationMapActions()` before ever reaching the DOM.
 */
const APPLICATION_MAP_EXCEPTION = join(SRC_ROOT, "modules", "application-map");

const PRODUCT_FAMILY_DIRS = [
  join(SRC_ROOT, "data", "products", "busbar"),
  join(SRC_ROOT, "data", "products", "cable-management"),
  join(SRC_ROOT, "data", "products", "earthing-lightning"),
  join(SRC_ROOT, "data", "products", "underfloor"),
  join(SRC_ROOT, "data", "products", "led-lighting"),
  join(SRC_ROOT, "components", "public", "products", "busbar"),
  join(SRC_ROOT, "components", "public", "products", "cable-management"),
  join(SRC_ROOT, "components", "public", "products", "earthing-lightning"),
  join(SRC_ROOT, "components", "public", "products", "underfloor"),
  join(SRC_ROOT, "components", "public", "products", "led-lighting"),
];

const BROKEN_HREF_PATTERNS: readonly RegExp[] = [
  /\/uk-support\?request=/,
  /\/uk-support\?product=/,
  /\/ua-support\?product=/,
];

function walk(dir: string): readonly string[] {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) return walk(fullPath);
    return fullPath.endsWith(".ts") || fullPath.endsWith(".tsx") ? [fullPath] : [];
  });
}

function findBrokenHrefs(dir: string): readonly string[] {
  return walk(dir).flatMap((file) => {
    const content = readFileSync(file, "utf-8");
    return BROKEN_HREF_PATTERNS.some((pattern) => pattern.test(content)) ? [file] : [];
  });
}

describe("CTA routing regression sweep", () => {
  it.each(PRODUCT_FAMILY_DIRS)("no file under %s routes through the legacy /uk-support or /ua-support pattern", (dir) => {
    expect(findBrokenHrefs(dir)).toEqual([]);
  });

  it("does not accidentally flag the Application Map's own legacy-compat data (rewritten at render time)", () => {
    // Sanity check that the exception path itself still exists and does
    // contain the legacy pattern — if this ever goes to zero, the
    // application-map exclusion above should be removed, not silently kept.
    expect(findBrokenHrefs(APPLICATION_MAP_EXCEPTION).length).toBeGreaterThan(0);
  });

  it("routes every rendered LED PDF catalogue CTA through the canonical catalogue resource", () => {
    const consumers = walk(
      join(SRC_ROOT, "components", "public", "products", "led-lighting"),
    ).filter((file) => {
      const content = readFileSync(file, "utf-8");
      return content.includes("content.hero.secondaryAction");
    });
    const offenders = consumers.filter((file) => {
      const content = readFileSync(file, "utf-8");
      return !content.includes('href={canonicalCatalogueHref("led")}');
    });

    expect(consumers.length).toBeGreaterThan(0);
    expect(offenders).toEqual([]);
  });

  it("no GR Cast Resin CTA points at the non-existent /ua-support route", () => {
    const grFile = join(SRC_ROOT, "data", "products", "busbar", "series", "gr.ts");
    const content = readFileSync(grFile, "utf-8");

    expect(content).not.toMatch(/\/ua-support/);
  });
});

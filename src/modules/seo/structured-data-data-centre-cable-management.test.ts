import { describe, expect, it } from "vitest";

import { dataCentreCableManagementLandingContentForMarket } from "@/data/products/cable-management/data-centre-landing-content";

import {
  buildBreadcrumbListJsonLd,
  buildCollectionPageJsonLd,
  jsonLdGraph,
} from "./structured-data";

// Mirrors exactly what
// src/app/(public)/products/cable-support-systems/data-centre-cable-management/page.tsx
// composes — kept in sync by asserting against the real content module the
// page itself reads from, not hardcoded duplicate copy.
const PRODUCTION_ORIGINS = { uk: "https://infravolt.co.uk", ua: "https://infravolt.com.ua" } as const;
const PATHNAME = "/products/cable-support-systems/data-centre-cable-management";

function buildGraph(market: "uk" | "ua") {
  const origin = PRODUCTION_ORIGINS[market];
  const content = dataCentreCableManagementLandingContentForMarket(market);
  const pageUrl = `${origin}${PATHNAME}`;
  const inLanguage = market === "uk" ? "en-GB" : "uk-UA";

  return jsonLdGraph([
    buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      { name: content.breadcrumbs.cableManagement, url: `${origin}/products/cable-support-systems` },
      { name: content.breadcrumbs.current, url: pageUrl },
    ]),
    buildCollectionPageJsonLd({
      origin,
      pageUrl,
      name: content.metadata.title,
      description: content.metadata.description,
      inLanguage,
      items: content.comparison.rows.map((row) => ({ name: row.system, url: `${origin}${row.href}` })),
    }),
  ]);
}

describe("Data Centre Cable Management structured data — UK", () => {
  const graph = buildGraph("uk");
  const nodes = graph["@graph"] as readonly Record<string, unknown>[];
  const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList")!;
  const collectionPage = nodes.find((node) => node["@type"] === "CollectionPage")!;

  it("contains exactly one BreadcrumbList and one CollectionPage", () => {
    expect(nodes).toHaveLength(2);
  });

  it("BreadcrumbList has the exact 3 UK visible labels in order, with absolute URLs", () => {
    const items = breadcrumb.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(items.map((item) => item.name)).toEqual([
      "Home",
      "Cable Management Systems",
      "Data Centre Cable Management",
    ]);
    expect(items.map((item) => item.item)).toEqual([
      "https://infravolt.co.uk/",
      "https://infravolt.co.uk/products/cable-support-systems",
      "https://infravolt.co.uk/products/cable-support-systems/data-centre-cable-management",
    ]);
  });

  it("CollectionPage has the correct @id/url/inLanguage/publisher/breadcrumb references", () => {
    expect(collectionPage["@id"]).toBe(
      "https://infravolt.co.uk/products/cable-support-systems/data-centre-cable-management#webpage",
    );
    expect(collectionPage.url).toBe(
      "https://infravolt.co.uk/products/cable-support-systems/data-centre-cable-management",
    );
    expect(collectionPage.inLanguage).toBe("en-GB");
    expect(collectionPage.publisher).toEqual({ "@id": "https://infravolt.co.uk/#organization" });
    expect(collectionPage.isPartOf).toEqual({ "@id": "https://infravolt.co.uk/#website" });
    expect(collectionPage.breadcrumb).toEqual({
      "@id": "https://infravolt.co.uk/products/cable-support-systems/data-centre-cable-management#breadcrumb",
    });
  });

  it("ItemList has exactly 4 items, positions 1..4, matching the visible comparison order and URLs", () => {
    const mainEntity = collectionPage.mainEntity as Record<string, unknown>;
    expect(mainEntity.numberOfItems).toBe(4);
    const items = mainEntity.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.position)).toEqual([1, 2, 3, 4]);
    expect(items.map((item) => item.name)).toEqual([
      "Wire-Mesh Cable Trays",
      "Cable Ladder Systems",
      "Cable Tray Systems",
      "Support & Hanging Systems",
    ]);
    expect(items.map((item) => item.url)).toEqual([
      "https://infravolt.co.uk/products/cable-support-systems/wire-mesh-systems",
      "https://infravolt.co.uk/products/cable-support-systems/cable-ladders",
      "https://infravolt.co.uk/products/cable-support-systems/cable-trays-trunking",
      "https://infravolt.co.uk/products/cable-support-systems/support-hanging-systems",
    ]);
  });

  it("contains no Product/ProductGroup/Offer/AggregateRating/Review/FAQPage types, and InfraVolt appears only as publisher", () => {
    const serialized = JSON.stringify(graph);
    for (const disallowed of ["Product", "ProductGroup", "Offer", "AggregateRating", "Review", "FAQPage"]) {
      expect(serialized).not.toContain(disallowed);
    }
    expect(serialized).not.toContain("manufacturer");
  });
});

describe("Data Centre Cable Management structured data — UA", () => {
  const graph = buildGraph("ua");
  const nodes = graph["@graph"] as readonly Record<string, unknown>[];
  const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList")!;
  const collectionPage = nodes.find((node) => node["@type"] === "CollectionPage")!;

  it("BreadcrumbList has the exact 3 UA visible labels in order, with absolute UA URLs", () => {
    const items = breadcrumb.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.name)).toEqual([
      "Головна",
      "Кабеленесучі системи",
      "Кабеленесучі системи для ЦОД",
    ]);
    expect(items.map((item) => item.item)).toEqual([
      "https://infravolt.com.ua/",
      "https://infravolt.com.ua/products/cable-support-systems",
      "https://infravolt.com.ua/products/cable-support-systems/data-centre-cable-management",
    ]);
  });

  it("CollectionPage uses UA inLanguage and UA-market @id/publisher, never leaking a UK URL", () => {
    expect(collectionPage.inLanguage).toBe("uk-UA");
    expect(collectionPage.publisher).toEqual({ "@id": "https://infravolt.com.ua/#organization" });
    const serialized = JSON.stringify(collectionPage);
    expect(serialized).not.toContain("infravolt.co.uk");
  });

  it("ItemList has exactly 4 items with UA-market product-page URLs (locale-neutral slugs, same order)", () => {
    const mainEntity = collectionPage.mainEntity as Record<string, unknown>;
    expect(mainEntity.numberOfItems).toBe(4);
    const items = mainEntity.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.url)).toEqual([
      "https://infravolt.com.ua/products/cable-support-systems/wire-mesh-systems",
      "https://infravolt.com.ua/products/cable-support-systems/cable-ladders",
      "https://infravolt.com.ua/products/cable-support-systems/cable-trays-trunking",
      "https://infravolt.com.ua/products/cable-support-systems/support-hanging-systems",
    ]);
  });

  it("contains no Product/ProductGroup/Offer/AggregateRating/Review/FAQPage types", () => {
    const serialized = JSON.stringify(graph);
    for (const disallowed of ["Product", "ProductGroup", "Offer", "AggregateRating", "Review", "FAQPage"]) {
      expect(serialized).not.toContain(disallowed);
    }
  });
});

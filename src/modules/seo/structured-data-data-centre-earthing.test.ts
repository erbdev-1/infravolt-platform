import { describe, expect, it } from "vitest";

import { dataCentreEarthingLandingContentForMarket } from "@/data/products/earthing-lightning/data-centre-landing-content";

// Mirrors exactly what
// src/app/(public)/products/earthing-and-lightning-protection/data-centre-earthing/page.tsx
// composes — kept in sync by asserting against the real content module the
// page itself reads from, not hardcoded duplicate copy.
import {
  buildBreadcrumbListJsonLd,
  buildCollectionPageJsonLd,
  jsonLdGraph,
} from "./structured-data";

const PRODUCTION_ORIGINS = { uk: "https://infravolt.co.uk", ua: "https://infravolt.com.ua" } as const;
const PATHNAME = "/products/earthing-and-lightning-protection/data-centre-earthing";

function buildGraph(market: "uk" | "ua") {
  const origin = PRODUCTION_ORIGINS[market];
  const content = dataCentreEarthingLandingContentForMarket(market);
  const pageUrl = `${origin}${PATHNAME}`;
  const inLanguage = market === "uk" ? "en-GB" : "uk-UA";

  return jsonLdGraph([
    buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      {
        name: content.breadcrumbs.earthingLightning,
        url: `${origin}/products/earthing-and-lightning-protection`,
      },
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

describe("Data Centre Earthing structured data — UK", () => {
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
      "Earthing & Lightning Protection",
      "Data Centre Earthing",
    ]);
    expect(items.map((item) => item.item)).toEqual([
      "https://infravolt.co.uk/",
      "https://infravolt.co.uk/products/earthing-and-lightning-protection",
      "https://infravolt.co.uk/products/earthing-and-lightning-protection/data-centre-earthing",
    ]);
  });

  it("CollectionPage has the correct @id/url/inLanguage/publisher/breadcrumb references", () => {
    expect(collectionPage["@id"]).toBe(
      "https://infravolt.co.uk/products/earthing-and-lightning-protection/data-centre-earthing#webpage",
    );
    expect(collectionPage.url).toBe(
      "https://infravolt.co.uk/products/earthing-and-lightning-protection/data-centre-earthing",
    );
    expect(collectionPage.inLanguage).toBe("en-GB");
    expect(collectionPage.publisher).toEqual({ "@id": "https://infravolt.co.uk/#organization" });
    expect(collectionPage.isPartOf).toEqual({ "@id": "https://infravolt.co.uk/#website" });
    expect(collectionPage.breadcrumb).toEqual({
      "@id": "https://infravolt.co.uk/products/earthing-and-lightning-protection/data-centre-earthing#breadcrumb",
    });
  });

  it("ItemList has exactly 5 items, positions 1..5, matching the visible comparison order and URLs", () => {
    const mainEntity = collectionPage.mainEntity as Record<string, unknown>;
    expect(mainEntity.numberOfItems).toBe(5);
    const items = mainEntity.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.position)).toEqual([1, 2, 3, 4, 5]);
    expect(items.map((item) => item.name)).toEqual([
      "Equipotential Earth Bars",
      "Conductors & Earthing Tapes",
      "Clamps & Connectors",
      "Earthing Electrodes & Plates",
      "Lightning Protection Products",
    ]);
    expect(items.map((item) => item.url)).toEqual([
      "https://infravolt.co.uk/products/earthing-and-lightning-protection/equipotential-earth-bars",
      "https://infravolt.co.uk/products/earthing-and-lightning-protection/conductors-tapes",
      "https://infravolt.co.uk/products/earthing-and-lightning-protection/clamps-connectors",
      "https://infravolt.co.uk/products/earthing-and-lightning-protection/earthing-electrodes-plates",
      "https://infravolt.co.uk/products/earthing-and-lightning-protection/lightning-protection",
    ]);
  });

  it("contains no Product/ProductGroup/Offer/AggregateRating/Review/FAQPage @type nodes, and InfraVolt appears only as publisher", () => {
    const serialized = JSON.stringify(graph);
    // Matches the @type value precisely, not a substring — "Lightning
    // Protection Products" is a real, visible comparison-row name on this
    // page and legitimately contains "Product" as plain text.
    for (const disallowedType of ["Product", "ProductGroup", "Offer", "AggregateRating", "Review", "FAQPage"]) {
      expect(serialized).not.toContain(`"@type":"${disallowedType}"`);
    }
    expect(serialized).not.toContain("manufacturer");
  });
});

describe("Data Centre Earthing structured data — UA", () => {
  const graph = buildGraph("ua");
  const nodes = graph["@graph"] as readonly Record<string, unknown>[];
  const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList")!;
  const collectionPage = nodes.find((node) => node["@type"] === "CollectionPage")!;

  it("BreadcrumbList has the exact 3 UA visible labels in order, with absolute UA URLs", () => {
    const items = breadcrumb.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.name)).toEqual([
      "Головна",
      "Заземлення та блискавкозахист",
      "Заземлення для ЦОД",
    ]);
    expect(items.map((item) => item.item)).toEqual([
      "https://infravolt.com.ua/",
      "https://infravolt.com.ua/products/earthing-and-lightning-protection",
      "https://infravolt.com.ua/products/earthing-and-lightning-protection/data-centre-earthing",
    ]);
  });

  it("CollectionPage uses UA inLanguage and UA-market @id/publisher, never leaking a UK URL", () => {
    expect(collectionPage.inLanguage).toBe("uk-UA");
    expect(collectionPage.publisher).toEqual({ "@id": "https://infravolt.com.ua/#organization" });
    const serialized = JSON.stringify(collectionPage);
    expect(serialized).not.toContain("infravolt.co.uk");
  });

  it("ItemList has exactly 5 items with UA-market product-page URLs (locale-neutral slugs, same order)", () => {
    const mainEntity = collectionPage.mainEntity as Record<string, unknown>;
    expect(mainEntity.numberOfItems).toBe(5);
    const items = mainEntity.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.url)).toEqual([
      "https://infravolt.com.ua/products/earthing-and-lightning-protection/equipotential-earth-bars",
      "https://infravolt.com.ua/products/earthing-and-lightning-protection/conductors-tapes",
      "https://infravolt.com.ua/products/earthing-and-lightning-protection/clamps-connectors",
      "https://infravolt.com.ua/products/earthing-and-lightning-protection/earthing-electrodes-plates",
      "https://infravolt.com.ua/products/earthing-and-lightning-protection/lightning-protection",
    ]);
  });

  it("contains no Product/ProductGroup/Offer/AggregateRating/Review/FAQPage @type nodes", () => {
    const serialized = JSON.stringify(graph);
    for (const disallowedType of ["Product", "ProductGroup", "Offer", "AggregateRating", "Review", "FAQPage"]) {
      expect(serialized).not.toContain(`"@type":"${disallowedType}"`);
    }
  });
});

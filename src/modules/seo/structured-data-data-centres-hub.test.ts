import { describe, expect, it } from "vitest";

import { dataCentreInfrastructureHubContentForMarket } from "@/data/data-centres/content";

// Mirrors exactly what src/app/(public)/data-centres/page.tsx composes —
// kept in sync by asserting against the real content module the page
// itself reads from, not hardcoded duplicate copy.
import {
  buildBreadcrumbListJsonLd,
  buildCollectionPageJsonLd,
  jsonLdGraph,
} from "./structured-data";

const PRODUCTION_ORIGINS = { uk: "https://infravolt.co.uk", ua: "https://infravolt.com.ua" } as const;
const PATHNAME = "/data-centres";

function buildGraph(market: "uk" | "ua") {
  const origin = PRODUCTION_ORIGINS[market];
  const content = dataCentreInfrastructureHubContentForMarket(market);
  const pageUrl = `${origin}${PATHNAME}`;
  const inLanguage = market === "uk" ? "en-GB" : "uk-UA";

  return jsonLdGraph([
    buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      { name: content.breadcrumbs.current, url: pageUrl },
    ]),
    buildCollectionPageJsonLd({
      origin,
      pageUrl,
      name: content.metadata.title,
      description: content.metadata.description,
      inLanguage,
      items: content.coreSystems.map((system) => ({ name: system.title, url: `${origin}${system.href}` })),
    }),
  ]);
}

describe("Data Centre Infrastructure Hub structured data — UK", () => {
  const graph = buildGraph("uk");
  const nodes = graph["@graph"] as readonly Record<string, unknown>[];
  const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList")!;
  const collectionPage = nodes.find((node) => node["@type"] === "CollectionPage")!;

  it("contains exactly one BreadcrumbList and one CollectionPage", () => {
    expect(nodes).toHaveLength(2);
  });

  it("BreadcrumbList has the exact 2 UK visible labels in order, with absolute URLs", () => {
    const items = breadcrumb.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.position)).toEqual([1, 2]);
    expect(items.map((item) => item.name)).toEqual(["Home", "Data Centres"]);
    expect(items.map((item) => item.item)).toEqual([
      "https://infravolt.co.uk/",
      "https://infravolt.co.uk/data-centres",
    ]);
  });

  it("CollectionPage has the correct @id/url/inLanguage/publisher/breadcrumb references", () => {
    expect(collectionPage["@id"]).toBe("https://infravolt.co.uk/data-centres#webpage");
    expect(collectionPage.url).toBe("https://infravolt.co.uk/data-centres");
    expect(collectionPage.inLanguage).toBe("en-GB");
    expect(collectionPage.publisher).toEqual({ "@id": "https://infravolt.co.uk/#organization" });
    expect(collectionPage.isPartOf).toEqual({ "@id": "https://infravolt.co.uk/#website" });
    expect(collectionPage.breadcrumb).toEqual({
      "@id": "https://infravolt.co.uk/data-centres#breadcrumb",
    });
  });

  it("ItemList has exactly 3 items, positions 1..3, matching the visible core-system card order and required names/URLs", () => {
    const mainEntity = collectionPage.mainEntity as Record<string, unknown>;
    expect(mainEntity.numberOfItems).toBe(3);
    const items = mainEntity.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(items.map((item) => item.name)).toEqual([
      "Data Centre Busbar Systems",
      "Data Centre Cable Management Systems",
      "Data Centre Earthing & Bonding Systems",
    ]);
    expect(items.map((item) => item.url)).toEqual([
      "https://infravolt.co.uk/products/busbar/data-centre-busbar",
      "https://infravolt.co.uk/products/cable-support-systems/data-centre-cable-management",
      "https://infravolt.co.uk/products/earthing-and-lightning-protection/data-centre-earthing",
    ]);
  });

  it("contains no Product/ProductGroup/Offer/AggregateRating/Review/FAQPage/Service @type nodes, and InfraVolt appears only as publisher", () => {
    const serialized = JSON.stringify(graph);
    for (const disallowedType of [
      "Product",
      "ProductGroup",
      "Offer",
      "AggregateRating",
      "Review",
      "FAQPage",
      "Service",
    ]) {
      expect(serialized).not.toContain(`"@type":"${disallowedType}"`);
    }
    expect(serialized).not.toContain("manufacturer");
  });
});

describe("Data Centre Infrastructure Hub structured data — UA", () => {
  const graph = buildGraph("ua");
  const nodes = graph["@graph"] as readonly Record<string, unknown>[];
  const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList")!;
  const collectionPage = nodes.find((node) => node["@type"] === "CollectionPage")!;

  it("BreadcrumbList has the exact 2 UA visible labels in order, with absolute UA URLs", () => {
    const items = breadcrumb.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.name)).toEqual(["Головна", "Центри обробки даних"]);
    expect(items.map((item) => item.item)).toEqual([
      "https://infravolt.com.ua/",
      "https://infravolt.com.ua/data-centres",
    ]);
  });

  it("CollectionPage uses UA inLanguage and UA-market @id/publisher, never leaking a UK URL", () => {
    expect(collectionPage.inLanguage).toBe("uk-UA");
    expect(collectionPage.publisher).toEqual({ "@id": "https://infravolt.com.ua/#organization" });
    const serialized = JSON.stringify(collectionPage);
    expect(serialized).not.toContain("infravolt.co.uk");
  });

  it("ItemList has exactly 3 items with localized UA names and UA-market URLs (same order)", () => {
    const mainEntity = collectionPage.mainEntity as Record<string, unknown>;
    expect(mainEntity.numberOfItems).toBe(3);
    const items = mainEntity.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.name)).toEqual([
      "Шинопроводи для ЦОД",
      "Кабеленесучі системи для ЦОД",
      "Заземлення та зрівнювання потенціалів для ЦОД",
    ]);
    expect(items.map((item) => item.url)).toEqual([
      "https://infravolt.com.ua/products/busbar/data-centre-busbar",
      "https://infravolt.com.ua/products/cable-support-systems/data-centre-cable-management",
      "https://infravolt.com.ua/products/earthing-and-lightning-protection/data-centre-earthing",
    ]);
  });

  it("contains no Product/ProductGroup/Offer/AggregateRating/Review/FAQPage/Service @type nodes", () => {
    const serialized = JSON.stringify(graph);
    for (const disallowedType of [
      "Product",
      "ProductGroup",
      "Offer",
      "AggregateRating",
      "Review",
      "FAQPage",
      "Service",
    ]) {
      expect(serialized).not.toContain(`"@type":"${disallowedType}"`);
    }
  });
});

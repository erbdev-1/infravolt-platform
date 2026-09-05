import { describe, expect, it } from "vitest";

import {
  absoluteAssetUrl,
  buildBreadcrumbListJsonLd,
  buildCollectionPageJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  jsonLdGraph,
} from "./structured-data";

describe("jsonLdGraph", () => {
  it("wraps nodes in a single @context/@graph envelope", () => {
    const graph = jsonLdGraph([{ "@type": "Organization" }, { "@type": "WebSite" }]);

    expect(graph["@context"]).toBe("https://schema.org");
    expect(graph["@graph"]).toHaveLength(2);
  });
});

describe("buildOrganizationJsonLd", () => {
  it("builds the exact required fields and never includes sameAs/telephone/legalName", () => {
    const node = buildOrganizationJsonLd({
      origin: "https://infravolt.co.uk",
      name: "InfraVolt",
      logoUrl: "https://infravolt.co.uk/assets/brand/infravolt-wordmark-transparent.webp",
      description: "Gersan electrical infrastructure systems for the UK market.",
      email: "info@infravolt.co.uk",
      areaServedCountry: "United Kingdom",
      address: {
        streetAddress: "HTS Building, Tyne View Terrace",
        addressLocality: "Wallsend",
        addressRegion: "Tyne and Wear",
        postalCode: "NE28 6SG",
        addressCountry: "GB",
      },
    });

    expect(node["@type"]).toBe("Organization");
    expect(node["@id"]).toBe("https://infravolt.co.uk/#organization");
    expect(node.url).toBe("https://infravolt.co.uk/");
    expect(node.email).toBe("info@infravolt.co.uk");
    expect(node.areaServed).toEqual({ "@type": "Country", name: "United Kingdom" });
    expect(node.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "HTS Building, Tyne View Terrace",
      addressLocality: "Wallsend",
      addressRegion: "Tyne and Wear",
      postalCode: "NE28 6SG",
      addressCountry: "GB",
    });

    expect(node).not.toHaveProperty("sameAs");
    expect(node).not.toHaveProperty("telephone");
    expect(node).not.toHaveProperty("legalName");
  });

  it("omits address entirely when none is provided (Ukraine market)", () => {
    const node = buildOrganizationJsonLd({
      origin: "https://infravolt.com.ua",
      name: "InfraVolt",
      logoUrl: "https://infravolt.com.ua/assets/brand/infravolt-wordmark-transparent.webp",
      description: "Системи електричної інфраструктури Gersan для України.",
      email: "info@infravolt.com.ua",
      areaServedCountry: "Ukraine",
    });

    expect(node).not.toHaveProperty("address");
    expect(node.areaServed).toEqual({ "@type": "Country", name: "Ukraine" });
  });
});

describe("buildWebSiteJsonLd", () => {
  it("publishes with a Country-scoped Organization @id reference, not an inline duplicate", () => {
    const node = buildWebSiteJsonLd({
      origin: "https://infravolt.co.uk",
      name: "InfraVolt",
      inLanguage: "en-GB",
    });

    expect(node["@type"]).toBe("WebSite");
    expect(node["@id"]).toBe("https://infravolt.co.uk/#website");
    expect(node.url).toBe("https://infravolt.co.uk/");
    expect(node.publisher).toEqual({ "@id": "https://infravolt.co.uk/#organization" });
    expect(node).not.toHaveProperty("potentialAction");
  });
});

describe("buildBreadcrumbListJsonLd", () => {
  it("builds sequential positions from 1 with absolute item URLs", () => {
    const node = buildBreadcrumbListJsonLd("https://infravolt.co.uk/products/busbar/gs-super-compact", [
      { name: "Home", url: "https://infravolt.co.uk/" },
      { name: "Busbar Trunking Systems", url: "https://infravolt.co.uk/products/busbar" },
      { name: "GS Super Compact High Power Busbar", url: "https://infravolt.co.uk/products/busbar/gs-super-compact" },
    ]);

    expect(node["@id"]).toBe("https://infravolt.co.uk/products/busbar/gs-super-compact#breadcrumb");
    const items = node.itemListElement as readonly Record<string, unknown>[];
    expect(items).toHaveLength(3);
    expect(items.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(items[0]?.item).toBe("https://infravolt.co.uk/");
  });
});

describe("buildCollectionPageJsonLd", () => {
  it("references breadcrumb/website/publisher by @id and never contains Product/Offer types", () => {
    const node = buildCollectionPageJsonLd({
      origin: "https://infravolt.co.uk",
      pageUrl: "https://infravolt.co.uk/products/busbar/data-centre-busbar",
      name: "Data Centre Busbar Trunking Systems UK | InfraVolt",
      description: "Gersan busbar trunking systems for UK data centre power distribution.",
      inLanguage: "en-GB",
      items: [
        { name: "GS Super Compact", url: "https://infravolt.co.uk/products/busbar/gs-super-compact" },
        { name: "GGD Medium Power", url: "https://infravolt.co.uk/products/busbar/ggd-medium-power-busbar" },
        { name: "GR Cast Resin", url: "https://infravolt.co.uk/products/busbar/gr-cast-resin" },
      ],
    });

    expect(node["@type"]).toBe("CollectionPage");
    expect(node["@id"]).toBe("https://infravolt.co.uk/products/busbar/data-centre-busbar#webpage");
    expect(node.isPartOf).toEqual({ "@id": "https://infravolt.co.uk/#website" });
    expect(node.publisher).toEqual({ "@id": "https://infravolt.co.uk/#organization" });
    expect(node.breadcrumb).toEqual({
      "@id": "https://infravolt.co.uk/products/busbar/data-centre-busbar#breadcrumb",
    });

    const mainEntity = node.mainEntity as Record<string, unknown>;
    expect(mainEntity["@type"]).toBe("ItemList");
    expect(mainEntity.numberOfItems).toBe(3);
    const listItems = mainEntity.itemListElement as readonly Record<string, unknown>[];
    expect(listItems.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(listItems.map((item) => item.name)).toEqual([
      "GS Super Compact",
      "GGD Medium Power",
      "GR Cast Resin",
    ]);

    const serialized = JSON.stringify(node);
    expect(serialized).not.toContain("Product");
    expect(serialized).not.toContain("ProductGroup");
    expect(serialized).not.toContain("Offer");
    expect(serialized).not.toContain("AggregateRating");
    expect(serialized).not.toContain("Review");
    expect(serialized).not.toContain("FAQPage");
  });
});

describe("absoluteAssetUrl", () => {
  it("resolves a root-relative path against the market origin", () => {
    expect(absoluteAssetUrl("https://infravolt.co.uk", "/assets/brand/infravolt-wordmark-transparent.webp")).toBe(
      "https://infravolt.co.uk/assets/brand/infravolt-wordmark-transparent.webp",
    );
  });

  it("leaves an already-absolute URL unchanged", () => {
    expect(
      absoluteAssetUrl("https://infravolt.co.uk", "https://cdn.infravolt.co.uk/brand/infravolt-wordmark-transparent.webp"),
    ).toBe("https://cdn.infravolt.co.uk/brand/infravolt-wordmark-transparent.webp");
  });
});

import { describe, expect, it } from "vitest";

import { busbarCatalogContentForMarket } from "@/data/products/busbar/catalog-content";
import { dataCentreBusbarLandingContentForMarket } from "@/data/products/busbar/data-centre-landing-content";
import { publicSiteContentForMarket } from "@/modules/public-site/content";
import { publicMediaUrl } from "@/modules/storage/asset-url";

import {
  absoluteAssetUrl,
  buildBreadcrumbListJsonLd,
  buildCollectionPageJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  jsonLdGraph,
  type OrganizationAddressInput,
} from "./structured-data";

// Mirrors exactly what src/app/(public)/page.tsx composes — kept in sync by
// asserting against the real content modules the page itself reads from,
// not hardcoded duplicate copy.
const CONTACT_EMAIL = { uk: "info@infravolt.co.uk", ua: "info@infravolt.com.ua" } as const;
const AREA_SERVED_COUNTRY = { uk: "United Kingdom", ua: "Ukraine" } as const;
const HOME_LANGUAGE = { uk: "en-GB", ua: "uk-UA" } as const;
const UK_REGISTERED_OFFICE: OrganizationAddressInput = {
  streetAddress: "HTS Building, Tyne View Terrace",
  addressLocality: "Wallsend",
  addressRegion: "Tyne and Wear",
  postalCode: "NE28 6SG",
  addressCountry: "GB",
};

const PRODUCTION_ORIGINS = { uk: "https://infravolt.co.uk", ua: "https://infravolt.com.ua" } as const;

function buildHomeGraph(market: "uk" | "ua") {
  const origin = PRODUCTION_ORIGINS[market];
  const content = publicSiteContentForMarket(market);

  return jsonLdGraph([
    buildOrganizationJsonLd({
      origin,
      name: "InfraVolt",
      logoUrl: absoluteAssetUrl(origin, publicMediaUrl("brand/infravolt-wordmark-transparent.webp")),
      description: content.metadata.description,
      email: CONTACT_EMAIL[market],
      areaServedCountry: AREA_SERVED_COUNTRY[market],
      address: market === "uk" ? UK_REGISTERED_OFFICE : undefined,
    }),
    buildWebSiteJsonLd({ origin, name: "InfraVolt", inLanguage: HOME_LANGUAGE[market] }),
  ]);
}

describe("Home page structured data — UK", () => {
  const graph = buildHomeGraph("uk");
  const nodes = graph["@graph"] as readonly Record<string, unknown>[];
  const organization = nodes.find((node) => node["@type"] === "Organization")!;
  const website = nodes.find((node) => node["@type"] === "WebSite")!;

  it("contains exactly one Organization and one WebSite", () => {
    expect(nodes).toHaveLength(2);
  });

  it("uses the UK market @ids/url/name/email/inLanguage", () => {
    expect(organization["@id"]).toBe("https://infravolt.co.uk/#organization");
    expect(organization.url).toBe("https://infravolt.co.uk/");
    expect(organization.name).toBe("InfraVolt");
    expect(organization.email).toBe("info@infravolt.co.uk");
    expect(website["@id"]).toBe("https://infravolt.co.uk/#website");
    expect(website.inLanguage).toBe("en-GB");
  });

  it("WebSite.publisher references the same-market Organization by @id", () => {
    expect(website.publisher).toEqual({ "@id": "https://infravolt.co.uk/#organization" });
  });

  it("carries the exact UK registered-office address", () => {
    expect(organization.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "HTS Building, Tyne View Terrace",
      addressLocality: "Wallsend",
      addressRegion: "Tyne and Wear",
      postalCode: "NE28 6SG",
      addressCountry: "GB",
    });
  });

  it("never encodes InfraVolt as a manufacturer, never adds sameAs/telephone", () => {
    expect(organization).not.toHaveProperty("manufacturer");
    expect(organization).not.toHaveProperty("sameAs");
    expect(organization).not.toHaveProperty("telephone");
  });

  it("uses only production URLs — no localhost/www", () => {
    const serialized = JSON.stringify(graph);
    expect(serialized).not.toContain("localhost");
    expect(serialized).not.toContain("www.");
  });
});

describe("Home page structured data — UA", () => {
  const graph = buildHomeGraph("ua");
  const nodes = graph["@graph"] as readonly Record<string, unknown>[];
  const organization = nodes.find((node) => node["@type"] === "Organization")!;
  const website = nodes.find((node) => node["@type"] === "WebSite")!;

  it("contains exactly one Organization and one WebSite", () => {
    expect(nodes).toHaveLength(2);
  });

  it("uses the UA market @ids/url/name/email/inLanguage", () => {
    expect(organization["@id"]).toBe("https://infravolt.com.ua/#organization");
    expect(organization.url).toBe("https://infravolt.com.ua/");
    expect(organization.email).toBe("info@infravolt.com.ua");
    expect(website["@id"]).toBe("https://infravolt.com.ua/#website");
    expect(website.inLanguage).toBe("uk-UA");
  });

  it("WebSite.publisher references the same-market (UA) Organization, not UK's", () => {
    expect(website.publisher).toEqual({ "@id": "https://infravolt.com.ua/#organization" });
  });

  it("has no address — no currently-verified public UA registered address", () => {
    expect(organization).not.toHaveProperty("address");
  });

  it("never encodes InfraVolt as a manufacturer, never adds sameAs/telephone", () => {
    expect(organization).not.toHaveProperty("manufacturer");
    expect(organization).not.toHaveProperty("sameAs");
    expect(organization).not.toHaveProperty("telephone");
  });

  it("uses only production URLs — no localhost/www", () => {
    const serialized = JSON.stringify(graph);
    expect(serialized).not.toContain("localhost");
    expect(serialized).not.toContain("www.");
  });
});

function buildDataCentreGraph(market: "uk" | "ua") {
  const origin = PRODUCTION_ORIGINS[market];
  const content = dataCentreBusbarLandingContentForMarket(market);
  const pageUrl = `${origin}/products/busbar/data-centre-busbar`;
  const inLanguage = market === "uk" ? "en-GB" : "uk-UA";

  return jsonLdGraph([
    buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      { name: content.breadcrumbs.busbar, url: `${origin}/products/busbar` },
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

describe("Data Centre Busbar structured data — UK", () => {
  const graph = buildDataCentreGraph("uk");
  const nodes = graph["@graph"] as readonly Record<string, unknown>[];
  const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList")!;
  const collectionPage = nodes.find((node) => node["@type"] === "CollectionPage")!;

  it("BreadcrumbList has the exact 3 UK visible labels in order, with absolute URLs", () => {
    const items = breadcrumb.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.name)).toEqual([
      "Home",
      "Busbar Trunking Systems",
      "Data Centre Busbar",
    ]);
    expect(items.map((item) => item.item)).toEqual([
      "https://infravolt.co.uk/",
      "https://infravolt.co.uk/products/busbar",
      "https://infravolt.co.uk/products/busbar/data-centre-busbar",
    ]);
  });

  it("CollectionPage has the correct @id/url/inLanguage/publisher/breadcrumb references", () => {
    expect(collectionPage["@id"]).toBe(
      "https://infravolt.co.uk/products/busbar/data-centre-busbar#webpage",
    );
    expect(collectionPage.url).toBe("https://infravolt.co.uk/products/busbar/data-centre-busbar");
    expect(collectionPage.inLanguage).toBe("en-GB");
    expect(collectionPage.publisher).toEqual({ "@id": "https://infravolt.co.uk/#organization" });
    expect(collectionPage.isPartOf).toEqual({ "@id": "https://infravolt.co.uk/#website" });
    expect(collectionPage.breadcrumb).toEqual({
      "@id": "https://infravolt.co.uk/products/busbar/data-centre-busbar#breadcrumb",
    });
  });

  it("ItemList has exactly 3 items, positions 1..3, matching the visible GS/GGD/GR order and URLs", () => {
    const mainEntity = collectionPage.mainEntity as Record<string, unknown>;
    expect(mainEntity.numberOfItems).toBe(3);
    const items = mainEntity.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(items.map((item) => item.url)).toEqual([
      "https://infravolt.co.uk/products/busbar/gs-super-compact",
      "https://infravolt.co.uk/products/busbar/ggd-medium-power-busbar",
      "https://infravolt.co.uk/products/busbar/gr-cast-resin",
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

describe("Data Centre Busbar structured data — UA", () => {
  const graph = buildDataCentreGraph("ua");
  const nodes = graph["@graph"] as readonly Record<string, unknown>[];
  const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList")!;
  const collectionPage = nodes.find((node) => node["@type"] === "CollectionPage")!;

  it("BreadcrumbList has the exact 3 UA visible labels in order, with absolute UA URLs", () => {
    const items = breadcrumb.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.name)).toEqual([
      "Головна",
      "Магістральні та силові шинопроводи",
      "Шинопроводи для ЦОД",
    ]);
    expect(items.map((item) => item.item)).toEqual([
      "https://infravolt.com.ua/",
      "https://infravolt.com.ua/products/busbar",
      "https://infravolt.com.ua/products/busbar/data-centre-busbar",
    ]);
  });

  it("CollectionPage uses UA inLanguage and UA-market @id/publisher, never leaking a UK URL", () => {
    expect(collectionPage.inLanguage).toBe("uk-UA");
    expect(collectionPage.publisher).toEqual({ "@id": "https://infravolt.com.ua/#organization" });
    const serialized = JSON.stringify(collectionPage);
    expect(serialized).not.toContain("infravolt.co.uk");
  });

  it("ItemList has exactly 3 items with UA product-page URLs (locale-neutral slugs, same order)", () => {
    const mainEntity = collectionPage.mainEntity as Record<string, unknown>;
    expect(mainEntity.numberOfItems).toBe(3);
    const items = mainEntity.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.url)).toEqual([
      "https://infravolt.com.ua/products/busbar/gs-super-compact",
      "https://infravolt.com.ua/products/busbar/ggd-medium-power-busbar",
      "https://infravolt.com.ua/products/busbar/gr-cast-resin",
    ]);
  });
});

describe("Busbar series BreadcrumbList — representative markets", () => {
  it("GS Super Compact (UK): Home > Busbar Trunking Systems > localized series name", () => {
    const origin = PRODUCTION_ORIGINS.uk;
    const content = busbarCatalogContentForMarket("uk");
    const systemCopy = content.systems["gs-super-compact"];
    const pageUrl = `${origin}/products/busbar/gs-super-compact`;

    const node = buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      { name: content.breadcrumbs.current, url: `${origin}/products/busbar` },
      { name: systemCopy.name, url: pageUrl },
    ]);

    const items = node.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.name)).toEqual([
      "Home",
      "Busbar Trunking Systems",
      "GS Super Compact High Power Busbar",
    ]);
    expect(items[2]?.item).toBe("https://infravolt.co.uk/products/busbar/gs-super-compact");
  });

  it("GGD Medium Power (UA): Головна > Магістральні та силові шинопроводи > localized series name", () => {
    const origin = PRODUCTION_ORIGINS.ua;
    const content = busbarCatalogContentForMarket("ua");
    const systemCopy = content.systems["ggd-medium-power-busbar"];
    const pageUrl = `${origin}/products/busbar/ggd-medium-power-busbar`;

    const node = buildBreadcrumbListJsonLd(pageUrl, [
      { name: content.breadcrumbs.home, url: `${origin}/` },
      { name: content.breadcrumbs.current, url: `${origin}/products/busbar` },
      { name: systemCopy.name, url: pageUrl },
    ]);

    const items = node.itemListElement as readonly Record<string, unknown>[];
    expect(items.map((item) => item.name)).toEqual([
      "Головна",
      "Магістральні та силові шинопроводи",
      "Магістральний шинопровід середньої потужності GGD",
    ]);
    expect(items[2]?.item).toBe("https://infravolt.com.ua/products/busbar/ggd-medium-power-busbar");
  });

  it("never emits a Product type for any series breadcrumb", () => {
    const serialized = JSON.stringify(
      buildBreadcrumbListJsonLd("https://infravolt.co.uk/products/busbar/gs-super-compact", [
        { name: "Home", url: "https://infravolt.co.uk/" },
      ]),
    );
    expect(serialized).not.toContain("Product");
  });
});

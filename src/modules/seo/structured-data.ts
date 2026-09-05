// Phase 2 structured-data foundation — pure JSON-LD node builders.
//
// Deliberately minimal: schema.org nodes are represented as
// `Record<string, unknown>` rather than a full typed schema.org package
// (no new dependency), while every builder's *input* is a well-typed,
// narrow interface so call sites stay safe. Every value a builder emits is
// either a stable identifier string (an @id/url derived from the market's
// own canonical origin) or content already sourced from an existing
// market-content module — nothing here invents copy or business facts.
//
// Scope for this PR: Organization + WebSite (home page only),
// BreadcrumbList (Busbar cluster pilot) and CollectionPage (Data Centre
// Busbar landing page only). No Product/Offer/FAQPage/LocalBusiness — see
// the callers for why each is intentionally absent.

export type JsonLdNode = Readonly<Record<string, unknown>>;

/** Wraps one or more JSON-LD nodes in a single `@graph`, the shape every
 * page in this PR emits (never multiple separate <script> tags per page,
 * and never more than one Organization/WebSite pair site-wide). */
export function jsonLdGraph(nodes: readonly JsonLdNode[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export type OrganizationAddressInput = Readonly<{
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  /** ISO 3166-1 alpha-2, e.g. "GB". */
  addressCountry: string;
}>;

export type OrganizationJsonLdInput = Readonly<{
  /** Canonical market origin, no trailing slash — e.g. "https://infravolt.co.uk". */
  origin: string;
  name: string;
  /** Absolute image URL — see absoluteAssetUrl() for local/relative-path normalisation. */
  logoUrl: string;
  /** Reused verbatim from the market's own homepage metadata description. */
  description: string;
  email: string;
  /** schema.org Country name, e.g. "United Kingdom" / "Ukraine". */
  areaServedCountry: string;
  /** UK-only today — the Ukraine market has no currently-verified public
   * registered address, so callers must omit this rather than guess one. */
  address?: OrganizationAddressInput;
}>;

export function buildOrganizationJsonLd(input: OrganizationJsonLdInput): JsonLdNode {
  const node: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${input.origin}/#organization`,
    name: input.name,
    url: `${input.origin}/`,
    logo: input.logoUrl,
    description: input.description,
    email: input.email,
    areaServed: {
      "@type": "Country",
      name: input.areaServedCountry,
    },
  };

  if (input.address) {
    node.address = {
      "@type": "PostalAddress",
      ...input.address,
    };
  }

  return node;
}

export type WebSiteJsonLdInput = Readonly<{
  origin: string;
  name: string;
  /** BCP 47 tag, e.g. "en-GB" / "uk-UA". */
  inLanguage: string;
}>;

export function buildWebSiteJsonLd(input: WebSiteJsonLdInput): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": `${input.origin}/#website`,
    url: `${input.origin}/`,
    name: input.name,
    inLanguage: input.inLanguage,
    publisher: { "@id": `${input.origin}/#organization` },
  };
}

export type BreadcrumbItem = Readonly<{
  /** Must match the page's own visible breadcrumb label — never a
   * paraphrase, so structured data and rendered copy can never drift. */
  name: string;
  url: string;
}>;

export function buildBreadcrumbListJsonLd(
  pageUrl: string,
  items: readonly BreadcrumbItem[],
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export type CollectionPageItem = Readonly<{
  name: string;
  url: string;
}>;

export type CollectionPageJsonLdInput = Readonly<{
  origin: string;
  pageUrl: string;
  name: string;
  description: string;
  inLanguage: string;
  /** Rendered in the same order as the page's own visible comparison —
   * never a re-sorted/re-ranked view. */
  items: readonly CollectionPageItem[];
}>;

export function buildCollectionPageJsonLd(input: CollectionPageJsonLdInput): JsonLdNode {
  return {
    "@type": "CollectionPage",
    "@id": `${input.pageUrl}#webpage`,
    url: input.pageUrl,
    name: input.name,
    description: input.description,
    inLanguage: input.inLanguage,
    isPartOf: { "@id": `${input.origin}/#website` },
    publisher: { "@id": `${input.origin}/#organization` },
    breadcrumb: { "@id": `${input.pageUrl}#breadcrumb` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.items.length,
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

/** Normalises publicMediaUrl()'s output to an absolute URL against the
 * given market origin. publicMediaUrl() returns a root-relative
 * "/assets/…" path until NEXT_PUBLIC_ASSET_BASE_URL is configured (see
 * modules/storage/asset-url.ts) — schema.org logo/image values should
 * always be fully-qualified, in every environment, so this always resolves
 * against `origin` rather than assuming the CDN base is already absolute. */
export function absoluteAssetUrl(origin: string, assetPath: string): string {
  return new URL(assetPath, `${origin}/`).href;
}

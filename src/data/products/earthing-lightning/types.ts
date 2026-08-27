export type EarthingCategorySlug =
  | "lightning-protection"
  | "earthing-electrodes-plates"
  | "conductors-tapes"
  | "clamps-connectors"
  | "equipotential-earth-bars"
  | "exothermic-welding"
  | "inspection-ground-enhancement"
  | "static-ex-proof-grounding";

export type EarthingSolutionPathwayId =
  | "complete-earthing-systems"
  | "external-lightning-protection"
  | "equipotential-bonding"
  | "industrial-hazardous-grounding";

export type LocalizedEarthingSolutionPathway = Readonly<{
  id: EarthingSolutionPathwayId;
  title: string;
  description: string;
}>;

// Icon names map to concrete components inside the presentation layer
// (TechnicalSnapshotStrip / earthing-icons.tsx) — kept as plain strings
// here so this stays serializable content data, not JSX.
export type TechnicalSnapshotIconName =
  | "shield"
  | "layers"
  | "network"
  | "support"
  | "clock"
  | "weld"
  | "document"
  | "hazard"
  | "gauge"
  | "bond";

export type LocalizedTechnicalSnapshotItem = Readonly<{
  icon: TechnicalSnapshotIconName;
  label: string;
  /** A single value renders as one line; multiple items (e.g. a list of
   * standards or materials) render as a stacked list instead of a
   * dot-separated string — see TechnicalSnapshotStrip. */
  value: string | readonly string[];
  /** Always rendered visibly — never hidden behind hover/tooltip-only. */
  note?: string;
  /** Extra clarification, also always rendered visibly (see
   * TechnicalSnapshotStrip) — "tooltip" names its role, not a hover-only
   * mechanism, per the accessibility requirement that essential
   * clarification (e.g. "design life is not a warranty") must reach
   * keyboard and touch users too. */
  tooltip?: string;
}>;

export type LocalizedEarthingProductFamily = Readonly<{
  /** Stable, locale-independent identifier — English kebab-case, shared
   * verbatim between the uk/ua blocks in content.ts, derived from the
   * family's own image filename. This is the ONLY key used to look up
   * EARTHING_CATEGORY_VARIANTS (see earthing-category-detail-page.tsx) and
   * to build the order-code anchor slug (see earthing-variant-table.tsx) —
   * `name` is display-only and must never be used for either, since it's
   * translated per market and would silently break the UA lookup (this
   * was exactly the bug this field fixes). */
  id: string;
  name: string;
  description: string;
  /** Optional representative product photo for the family card's media
   * area (src/components/.../earthing-category-detail-page.tsx
   * .familyMedia). Renders as a plain CSS gradient with no photo when
   * unset — fill in per family as transparent assets become available. */
  image?: string;
  imageAlt?: string;
}>;

export type EarthingProductVariant = Readonly<{
  name: string;
  model: string;
  orderCode?: string;
  stockCode: string;
  material?: string;
  dimensions?: string;
  weight?: string;
}>;

export type LocalizedEarthingCategory = Readonly<{
  slug: EarthingCategorySlug;
  name: string;
  description: string;
  materials: string;
  familyCount: string;
  image: string;
  imageAlt: string;
  /** Optional alpha-transparent cutout for the category hero (see
   * earthing-category-detail-page.tsx .heroVisual). Falls back to
   * `image` — the opaque studio card photo — when not set, so this can
   * be filled in per category as transparent assets become available. */
  heroImage?: string;
  /** Four-item strip rendered below this category's own hero (see
   * TechnicalSnapshotStrip). Content is page-specific — see the
   * per-category values in content.ts, not shared/derived from the hub's. */
  technicalSnapshot: readonly LocalizedTechnicalSnapshotItem[];
  families: readonly LocalizedEarthingProductFamily[];
}>;

export type LocalizedEarthingGuidanceItem = Readonly<{
  title: string;
  description: string;
}>;

export type LocalizedEarthingApplication = Readonly<{
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}>;

export type EarthingHubContent = Readonly<{
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  breadcrumbs: Readonly<{
    home: string;
    products: string;
    current: string;
  }>;
  backToHomeLabel: string;
  hero: Readonly<{
    title: string;
    subtitle: string;
    description: string;
    primaryAction: string;
    videoLabel: string;
  }>;
  /** Shared across the hub hero and every category-page hero — the PDF
   * itself is one asset (see EARTHING_CATALOGUE_PDF_HREF in content.ts),
   * only these labels are localized. */
  downloadCatalogueAction: string;
  downloadCatalogueAccessibleName: string;
  downloadCatalogueMeta: string;
  /** Four-item strip below the hub hero (see TechnicalSnapshotStrip).
   * Category pages have their own per-category equivalent — see
   * LocalizedEarthingCategory.technicalSnapshot. */
  technicalSnapshot: readonly LocalizedTechnicalSnapshotItem[];
  pathwaysHeading: string;
  pathways: readonly LocalizedEarthingSolutionPathway[];
  categoriesHeading: string;
  categoriesIntroduction: string;
  categories: readonly LocalizedEarthingCategory[];
  viewProducts: string;
  guidanceHeading: string;
  guidanceIntroduction: string;
  guidance: readonly LocalizedEarthingGuidanceItem[];
  principlesHeading: string;
  principles: readonly string[];
  applicationsHeading: string;
  applicationsIntroduction: string;
  applications: readonly LocalizedEarthingApplication[];
  exploreApplicationMap: string;
  applicationsPreviousLabel: string;
  applicationsNextLabel: string;
  support: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  }>;
  categoryDetail: Readonly<{
    backLabel: string;
    familiesHeading: string;
    familiesIntroduction: string;
    familyViewProductsAction: string;
    familyTechnicalOnRequestAction: string;
    requestPackAction: string;
    requestPackDescription: string;
    variantsHeading: string;
    variantsIntroduction: string;
    variantsAllMaterials: string;
    variantsCountSuffix: string;
    variantsColumnModel: string;
    variantsColumnStockCode: string;
    variantsColumnMaterial: string;
    variantsColumnDimensions: string;
    variantsColumnWeight: string;
    variantsColumnAction: string;
    /** CSV-only columns — not shown in the on-screen table, which has no
     * room for a repeated family name or a separate description column. */
    variantsColumnFamily: string;
    variantsColumnDescription: string;
    /** e.g. "codes" in "307 codes · 4 product families". */
    variantsMetaCodesLabel: string;
    variantsMetaFamiliesLabel: string;
    variantsSearchLabel: string;
    variantsSearchPlaceholder: string;
    variantsClearSearchAction: string;
    variantsMaterialFilterLabel: string;
    /** Mobile-only filter drawer — the material chip wall collapses behind
     * this button below the tablet breakpoint; tablet/desktop keep the
     * chips visible inline and never render the drawer. */
    variantsFiltersButtonLabel: string;
    variantsFiltersDrawerTitle: string;
    variantsFiltersClearAllAction: string;
    /** Accessible label prefix for the single active-filter chip shown on
     * mobile, e.g. "Remove filter" + ": Copper". */
    variantsFiltersRemoveAction: string;
    /** Batched-results control inside an expanded family panel, e.g.
     * "Show more" — the remaining count is appended in parentheses at
     * render time, not part of this string. */
    variantsShowMoreAction: string;
    /** e.g. "Show" — combined with the live count as
     * "{variantsFiltersShowResultsAction} {n} {variantsCountSuffix}". */
    variantsFiltersShowResultsAction: string;
    variantsFiltersCloseAction: string;
    /** "Showing {n} {variantsOfLabel} {total} {variantsCountSuffix}" while a
     * search or material filter is active. */
    variantsShowingLabel: string;
    variantsOfLabel: string;
    variantsDownloadCsvAction: string;
    variantsDownloadAllCsvAction: string;
    variantsCopyStockCodeAction: string;
    variantsCopiedLabel: string;
    variantsNoResults: string;
    /** Per-family count suffix while search/filter is active, e.g.
     * "12 matching codes" instead of "66 order codes". */
    variantsMatchingCountSuffix: string;
    /** Defensive-only: shown if a family is ever rendered with zero
     * records (a data mismatch) — not expected in normal operation, since
     * record-less families are filtered out upstream. */
    variantsNoRecordsForFamily: string;
    enquiryHeading: string;
    enquiryAddAction: string;
    enquiryRemoveAction: string;
    enquiryCountSuffix: string;
    enquiryClearAction: string;
  }>;
}>;

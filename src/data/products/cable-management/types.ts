export type CableManagementFamilySlug =
  | "heavy-duty-cable-trays-h40"
  | "heavy-duty-cable-trays-h50"
  | "heavy-duty-cable-trays-h60"
  | "heavy-duty-cable-trays-h100"
  | "heavy-duty-cable-trays-gkt-ce"
  | "normal-type-cable-trays"
  | "strengthened-cable-trays"
  | "strengthened-cable-trays-h40"
  | "strengthened-cable-trays-h50"
  | "strengthened-cable-trays-h60"
  | "strengthened-cable-trays-h100"
  | "cable-tray-clamping-lid"
  | "pregalvanized-trunking-system"
  | "pregalvanized-trunking-h50"
  | "pregalvanized-trunking-h75"
  | "pregalvanized-trunking-h100"
  | "pregalvanized-trunking-h150"
  | "marine-type-cable-trays"
  | "lighting-fixture-cable-trays"
  | "aluminium-cable-trays-h70"
  | "aluminium-cable-trays-h100"
  | "cable-ladder-c-profile-rung"
  | "heavy-duty-cable-ladders"
  | "gcmc-concave-convex-ladder"
  | "gmie-cable-ladders"
  | "npi-80-support-system"
  | "u-z-l-w-profile-hanging-systems"
  | "threaded-rod-tray-carriers"
  | "c-profile-support-systems"
  | "threaded-rods-anchors-fixings"
  | "emt-imc-rsc-conduit-systems"
  | "socket-fuse-fixing-unit"
  | "pipe-clamps"
  | "screw-sets-threaded-rods-anchors"
  | "cover-cable-tray-cover-clamps"
  | "reducers"
  | "separator-end-cap-level-direction-changer"
  | "aluminium-cable-cleats"
  | "cable-crochets"
  | "granite-mounting-elements"
  | "cable-drum-support-equipment"
  | "mechanical-dilatation-element"
  | "shaft-access-cover"
  | "wire-mesh-systems";

export type CableManagementSnapshotIconName = "shield" | "layers" | "system" | "support";

export type CableManagementSnapshotItem = Readonly<{
  icon: CableManagementSnapshotIconName;
  label: string;
  /** Single value renders as one line; multiple items render as a stacked
   * list (see TechnicalSnapshotStrip in the earthing-lightning line, whose
   * pattern this mirrors). */
  value: string | readonly string[];
  note?: string;
}>;

/** One row from the Gersan Cable Support catalogue (product-data.csv) —
 * see src/data/products/cable-management/variants/. Fields are optional
 * where the source catalogue leaves them blank for a given component type
 * (e.g. accessories have no lengthMm). */
export type CableManagementVariant = Readonly<{
  name: string;
  model: string;
  stockCode: string;
  material: string;
  /** Optional catalogue sub-family used by schedules that combine several
   * closely related product families in one table (for example TTK-A/B/C). */
  family?: string;
  /** Optional row classification used when a schedule intentionally combines
   * primary products with their catalogue-backed jointing/support items. */
  productType?: string;
  /** English translation of the catalogue's component_type column — groups
   * rows into "Compatible Accessories" categories (Flat Bend, Tee, Reducer,
   * etc.) separately from the family's own straight-length rows. */
  accessoryGroup: string;
  widthMm?: number;
  heightMm?: number;
  thicknessMm?: number;
  lengthMm?: number;
  weight?: string;
}>;

/** Selects one of the small line icons in cable-icons.tsx for the
 * photo-free sibling-card style (siblingCardVariant="icon" on
 * CableFamilyBody — currently Support & Hanging Systems only). */
export type CableFamilySiblingIconName =
  | "support"
  | "profile"
  | "hanging-rod"
  | "c-profile"
  | "anchor"
  | "ladder"
  | "pipe"
  | "cover";

/** Minimal, real metadata for a related family — used by the "Product
 * families in this category" cards. Only families with a `slug` present in
 * CABLE_MANAGEMENT_VARIANTS (see variants/index.ts) have a real detail page
 * to link to; others render as informational, non-clickable cards until
 * their own detail page/data is built — never a fabricated link. */
export type CableManagementRelatedFamily = Readonly<{
  slug: CableManagementFamilySlug;
  name: string;
  image?: string;
  imageAlt?: string;
  /** Real catalogue row count for this family (see variants/index.ts and
   * catalog-source/cable-support) — never invented. */
  orderCodeCount: number;
  /** Overrides the "{orderCodeCount} {countSuffix}" render with a literal
   * label — for families with no order/stock codes at all (custom
   * made-to-order, or real size variants published without a code), so the
   * card never has to show a misleading "0 order codes". */
  countLabel?: string;
  /** One-line descriptor — only read by the photo-free sibling-card style
   * (siblingCardVariant="icon"); the photo-based "Product families in this
   * category" grid ignores it. */
  subtitle?: string;
  /** Only read by the photo-free sibling-card style — see subtitle. */
  icon?: CableFamilySiblingIconName;
}>;

/** A compact "Other <macro-group> Families" navigation card (see
 * CableFamilyBody's siblingFamilies section) — just enough to link and
 * display, not tied to CableManagementFamilySlug/CABLE_MANAGEMENT_VARIANTS
 * the way CableManagementRelatedFamily is. Needed because some sibling
 * pages route through their own static segment (e.g. the Cable Trays &
 * Trunking variant-tab pages: "heavy-duty-cable-trays",
 * "aluminium-cable-trays") rather than through a CableManagementFamilySlug
 * entry in the [slug] route. */
export type CableFamilySiblingLink = Readonly<{
  slug: string;
  name: string;
  image?: string;
  imageAlt?: string;
  /** Present when this list was built from CableManagementRelatedFamily
   * (see [slug]/page.tsx) — read only by the photo-free "icon" card style. */
  subtitle?: string;
  icon?: CableFamilySiblingIconName;
  orderCodeCount?: number;
  countLabel?: string;
  /** Renders the shared card as non-routing product-family information when
   * a dedicated child route does not exist. */
  informational?: boolean;
}>;

export type CableManagementScheduleColumnLabels = Readonly<{
  family?: string;
  type?: string;
  stockCode?: string;
  width?: string;
  height?: string;
  thickness?: string;
  length?: string;
  weight?: string;
}>;

export type CableManagementResource = Readonly<{
  label: string;
  description: string;
  href?: string;
  download?: boolean;
  /** Set when no real file exists yet for this resource — card renders
   * disabled rather than linking to a fabricated document. */
  unavailable?: boolean;
}>;

export type CableManagementCatalogueDocument = Readonly<{
  label: string;
  meta: string;
  href: string;
  accessibleName: string;
}>;

/** Maps a family's own real accessoryGroup values (see CableManagementVariant
 * above) into one consolidated "Compatible Accessories" card. A group is
 * only ever rendered once its computed count (from the actual variants
 * array) is > 0, so this config can never imply compatibility the data
 * doesn't support. `image` is intentionally optional — where no dedicated
 * product photo exists yet for that accessory type, the card shows a
 * neutral placeholder rather than a mismatched or invented photo. */
export type CableAccessoryDisplayGroup = Readonly<{
  slug: string;
  label: string;
  image?: string;
  matches: readonly string[];
}>;

/** One real, catalogue-verified size/dimension variant published without an
 * order or stock code (see aluminium-cable-cleats-sizes.ts) — rendered by
 * CableSizeVariantTable instead of the standard order-code
 * CableFamilyVariantTable, since "N order codes" would misrepresent data
 * that the catalogue never assigned a code to. */
export type CableSizeVariant = Readonly<{
  model: string;
  type: string;
  range: string;
  dimensions: string;
  material: string;
}>;

export type CableManagementFamilyContent = Readonly<{
  slug: CableManagementFamilySlug;
  eyebrow: string;
  title: string;
  titleQualifier: string;
  description: string;
  image: string;
  imageAlt: string;
  breadcrumbs: readonly Readonly<{ label: string; href?: string }>[];
  requestPackAction: string;
  requestPackHref: string;
  catalogueDocument: CableManagementCatalogueDocument;
  technicalSnapshot: readonly CableManagementSnapshotItem[];
  snapshotFootnote?: string;
  relatedFamiliesHeading: string;
  relatedFamilies: readonly CableManagementRelatedFamily[];
  scheduleHeading: string;
  scheduleIntroduction: string;
  standardLabel: string;
  /** Optional per-family technical notation while retaining the shared
   * schedule component (for example Wire / e instead of sheet thickness). */
  scheduleColumnLabels?: CableManagementScheduleColumnLabels;
  /** Present only for a family whose catalogue rows are real, verified size
   * variants that were never assigned an order/stock code — rendered
   * instead of the standard schedule table (see aluminium-cable-cleats). */
  sizeVariants?: readonly CableSizeVariant[];
  /** Present only for a genuinely custom / made-to-order family with no
   * catalogue order-code table at all — each string is one explanatory
   * paragraph rendered in place of the schedule table (see
   * shaft-access-cover). */
  customSpecNote?: readonly string[];
  accessoriesHeading: string;
  accessoriesIntroduction: string;
  accessoryDisplayGroups: readonly CableAccessoryDisplayGroup[];
  resourcesHeading: string;
  resources: readonly CableManagementResource[];
  supportHeading: string;
  supportDescription: string;
  supportAction: string;
  supportHref: string;
}>;

export type CableManagementLabels = Readonly<{
  searchLabel: string;
  searchPlaceholder: string;
  clearSearchAction: string;
  materialFilterLabel: string;
  familyFilterLabel: string;
  typeFilterLabel: string;
  widthFilterLabel: string;
  heightFilterLabel: string;
  thicknessFilterLabel: string;
  filterPanelTitle: string;
  clearAllAction: string;
  applyFiltersAction: string;
  allMaterialsLabel: string;
  showingLabel: string;
  ofLabel: string;
  countSuffix: string;
  matchingCountSuffix: string;
  noResults: string;
  downloadCsvAction: string;
  downloadAllCsvAction: string;
  copyStockCodeAction: string;
  copiedLabel: string;
  columnModel: string;
  columnFamily: string;
  columnType: string;
  columnStockCode: string;
  columnWidth: string;
  columnHeight: string;
  columnThickness: string;
  columnLength: string;
  columnWeight: string;
  columnMaterial: string;
  columnAction: string;
  enquiryAddAction: string;
  enquiryRemoveAction: string;
  currentFamilyLabel: string;
  viewOrderCodesAction: string;
  viewProductAction: string;
  viewAllAccessoriesAction: string;
  comingSoonLabel: string;
  /** CableVariantFamilyTemplate's own back button (goes to Cable Trays &
   * Trunking, not Cable Management Systems — distinct from
   * CableMacroFamilyLabels.backButtonLabel) and variant-pill pending note. */
  backToCableTraysTrunkingLabel: string;
  dataOnRequestLabel: string;
  productVariantLabel: string;
  technicalInformationSuffix: string;
  /** "Other <macro-group> Families" compact sibling-navigation cards — see
   * CableFamilyBody's siblingFamilies section. */
  viewSeriesLabel: string;
  /** Count suffix used by CableSizeVariantTable instead of countSuffix
   * ("order codes") — these rows are real size variants, never assigned an
   * order/stock code by the catalogue, so labelling them "order codes"
   * would misrepresent the data. */
  sizeVariantCountSuffix: string;
  /** Label shown where an order/stock code would normally appear, for a
   * real catalogue size variant the catalogue never assigned one to — see
   * CableSizeVariantTable / aluminium-cable-cleats. */
  onRequestLabel: string;
  /** Mobile-only results-collapse toggle (CableFamilyVariantTable /
   * CableSizeVariantTable) — composed at render time as
   * "{prefix} {count} {resultNoun}", e.g. "View All 95 Order Codes" /
   * "View 23 Order Codes"; mobileHideResultsPrefix composes as "{prefix}
   * {resultNoun}", e.g. "Hide Order Codes". Desktop always shows results
   * expanded and never renders this control. resultNoun is
   * mobileOrderCodesLabel (CableFamilyVariantTable) or
   * mobileSizeVariantsLabel (CableSizeVariantTable) — never countSuffix/
   * sizeVariantCountSuffix directly, so Aluminium Cable Cleats' toggle never
   * says "order codes" for a family with no published order codes. */
  mobileViewAllResultsPrefix: string;
  mobileViewFilteredResultsPrefix: string;
  mobileHideResultsPrefix: string;
  /** Title-Case noun for CableFamilyVariantTable's mobile results toggle —
   * see mobileViewAllResultsPrefix. */
  mobileOrderCodesLabel: string;
  /** Title-Case noun for CableSizeVariantTable's mobile results toggle —
   * see mobileViewAllResultsPrefix. */
  mobileSizeVariantsLabel: string;
  /** Accessible label for a mobile active-filter chip's remove (×) button —
   * combined with the chip's own value, e.g. "Remove filter: Steel". */
  removeFilterAction: string;
  previousAction: string;
  nextAction: string;
}>;

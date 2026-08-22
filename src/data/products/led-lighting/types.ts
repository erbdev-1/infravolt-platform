export type LedCategorySlug =
  | "smart-lighting-automation"
  | "industrial-high-bay-lighting"
  | "parking-waterproof-lighting"
  | "special-hazardous-environment-lighting"
  | "outdoor-infrastructure-lighting"
  | "linear-trunking-lighting"
  | "panel-lighting"
  | "track-downlight"
  | "decorative-lighting"
  | "emergency-guidance-lighting";

// Icon names map to concrete components inside the presentation layer
// (led-icons.tsx) — kept as plain strings here so this stays serializable
// content data, not JSX.
export type LedValueIconName =
  | "portfolio"
  | "data"
  | "applications"
  | "automation";

export type LedTrustIconName =
  | "support"
  | "applications"
  | "automation"
  | "certified";

export type LocalizedLedCategory = Readonly<{
  slug: LedCategorySlug;
  /** Display number "01".."10", matching the fixed brief order — not
   * derived from array index so it stays stable if the array is ever
   * re-sorted. */
  number: string;
  name: string;
  description: string;
  /** Optional representative product/application photo for the category
   * card. Renders with a plain "Coming soon" placeholder treatment when
   * unset — see led-lighting-hub-page.tsx. */
  image?: string;
  imageAlt?: string;
  /** Present only for categories with a real detail page — currently just
   * `industrial-high-bay-lighting`. Card renders as a working Link when
   * set, otherwise as an informational "Coming soon" article. */
  href?: string;
}>;

export type LocalizedLedValueItem = Readonly<{
  icon: LedValueIconName;
  title: string;
  description: string;
}>;

export type LocalizedLedStep = Readonly<{
  number: string;
  title: string;
  description: string;
}>;

export type LocalizedLedTrustItem = Readonly<{
  icon: LedTrustIconName;
  title: string;
  description: string;
}>;

export type LedHubContent = Readonly<{
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
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  }>;
  valueStrip: Readonly<{
    heading: string;
    items: readonly LocalizedLedValueItem[];
  }>;
  categoriesHeading: string;
  categoriesIntroduction: string;
  categories: readonly LocalizedLedCategory[];
  categoryComingSoonLabel: string;
  viewCategoryLabel: string;
  howItWorksHeading: string;
  howItWorksIntroduction: string;
  steps: readonly LocalizedLedStep[];
  bottomCta: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  }>;
  trustHeading: string;
  trustItems: readonly LocalizedLedTrustItem[];
}>;

/* =========================================================
   Category detail pages (e.g. Industrial & High-Bay Lighting) —
   one level below the hub: hero, technical snapshot, real catalogue
   product series, application photography, support CTA. Deliberately
   simpler than EarthingHubContent's categoryDetail: no order-code
   schedule/variant table here — that belongs to series detail pages,
   which are out of scope until those routes exist.
   ========================================================= */

export type LedTechnicalSnapshotIconName = "power" | "output" | "protection" | "control";

export type LedTechnicalSnapshotItem = Readonly<{
  icon: LedTechnicalSnapshotIconName;
  label: string;
  value: string;
  /** Optional small secondary line under the value — e.g. "Series-dependent"
   * or a representative list of options. Never presented as a single-SKU
   * spec; see industrial-high-bay-lighting.ts for the catalogue grounding
   * behind each value. */
  caption?: string;
}>;

// Icon names map to concrete components inside the presentation layer
// (led-icons.tsx) — kept as plain strings here so this stays serializable
// content data, not JSX. Deliberately a curated differentiator vocabulary,
// not a full spec-sheet — each series shows only its 3 most distinguishing
// features (see led-category-detail-page.tsx).
export type LedProductFeatureIconName =
  | "busbar-connect"
  | "suspension"
  | "high-output"
  | "optics"
  | "multi-lens"
  | "mounting-options"
  | "slim-body"
  | "efficiency"
  | "tempered-glass"
  | "control"
  | "rugged-body"
  | "protection"
  | "adjustable-angle"
  | "applications"
  | "surface-mount"
  | "camera"
  | "powerline-comms";

export type LocalizedLedProductFeature = Readonly<{
  icon: LedProductFeatureIconName;
  label: string;
}>;

export type LedProductSeries = Readonly<{
  slug: string;
  number: string;
  name: string;
  description: string;
  /** Exactly the 3 features that best differentiate this series from the
   * other 5 — catalogue-grounded only, never fabricated. Rendered as a
   * small icon + label row, not a badge/chip. */
  features: readonly LocalizedLedProductFeature[];
  image: string;
  imageAlt: string;
  /** Matches this photo's own studio backdrop so the product sits on the
   * card without a visible background seam (these are real catalogue
   * photos, not alpha-transparent cutouts) — "light" (white) unless set.
   * See led-category-detail-page.module.css .seriesImage/.seriesImageDark. */
  imageBackground?: "light" | "dark";
  /** Optional CSS object-position override (e.g. "center 30%") for
   * full-bleed cover-fit card photography whose subject isn't centred —
   * set per-card only when the default "center" crops the subject
   * awkwardly. Ignored by categories still using object-fit: contain. */
  imagePosition?: string;
  /** Set only once a real series detail route exists — otherwise the
   * card renders as a non-clickable, "Coming soon" informational card
   * (same convention as LocalizedLedCategory.href). */
  href?: string;
}>;

export type LedApplicationCard = Readonly<{
  title: string;
  /** Optional short copy for category implementations that use the
   * image-above/content-below application-card treatment. */
  description?: string;
  /** Omitted when no genuine catalogue application photo exists for
   * this application — renders as an icon/text-only card rather than a
   * mismatched or invented image. */
  image?: string;
  imageAlt?: string;
}>;

export type LedCategoryDetailContent = Readonly<{
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  breadcrumbs: Readonly<{
    home: string;
    products: string;
    ledSystems: string;
    current: string;
  }>;
  backToLedSystemsLabel: string;
  hero: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  }>;
  technicalSnapshotHeading: string;
  technicalSnapshot: readonly LedTechnicalSnapshotItem[];
  seriesHeading: string;
  seriesIntroduction: string;
  series: readonly LedProductSeries[];
  /** Optional labels that partition one Product Series section without
   * creating separate page sections or changing the shared card system. */
  seriesGroups?: readonly Readonly<{
    heading: string;
    seriesSlugs: readonly string[];
    /** Optional, explicit subcategory destination displayed beside the
     * group heading. Individual series cards retain their own hrefs. */
    href?: string;
    actionLabel?: string;
  }>[];
  viewSeriesLabel: string;
  seriesComingSoonLabel: string;
  applicationsHeading: string;
  applications: readonly LedApplicationCard[];
  supportCta: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  }>;
}>;

/* =========================================================
   Series detail pages (e.g. LED-BUS High Ceiling Lighting
   Systems) — one level below the category. This is the shared
   LED product-series-detail content shape: every future series
   page (LDBE, LDBSE, LDB-FL, GER-LED Industrial, GER-LED High
   Ceiling) reuses LedSeriesDetailContent + LedSeriesDetailPage,
   only the data changes. The 4-card Technical Information system
   (Performance / Light Quality / Protection & Electrical /
   Construction & Installation) is the fixed LED standard — card
   count and icons stay constant, only the value lines inside each
   card vary per family, and a line is omitted rather than
   invented when a field isn't available.
   ========================================================= */

export type LedTechnicalInfoCardIconName =
  | "performance"
  | "light-quality"
  | "protection-electrical"
  | "construction"
  | "communication"
  | "control-system"
  | "integration"
  | "monitoring";

export type LedTechnicalInfoCardValue = Readonly<{
  label: string;
  /** Omitted for a standalone claim line (e.g. "Uniform Illumination")
   * that isn't itself a label/value pair — rendered as a single bolded
   * line instead of a small-label-then-value pair. */
  value?: string;
}>;

export type LedTechnicalInfoCard = Readonly<{
  icon: LedTechnicalInfoCardIconName;
  title: string;
  /** 2–4 concise label/value lines. Omit a line entirely rather than
   * inventing a placeholder when a field isn't catalogue-verified for
   * this family — see LedTechnicalInfoCards' equal-height layout, which
   * does not require every card to be equally full. */
  values: readonly LedTechnicalInfoCardValue[];
}>;

export type LedSeriesModel = Readonly<{
  model: string;
  /** Raw watts — used both for display ("50 W") and for the power
   * filter's discrete chip values, which must match real catalogue
   * models exactly (never a synthesised range). */
  powerW: number;
  /** Exact catalogue display for configurations that publish separate
   * direct/indirect power values. `powerW` remains the filter value. */
  powerDisplay?: string;
  luminousFluxLm?: string;
  voltage?: string;
  frequency?: string;
  powerFactor?: string;
  operatingTemperature?: string;
  /** Optional per-family columns — set only when the source catalogue
   * actually provides the value for this family (e.g. LED-BUS High
   * Ceiling has efficiency but no dimensions; LDBE has dimensions/lens
   * but no verified efficiency figure; LDB-FL has no IP/weight columns
   * at all since IP is constant across the family and weight isn't
   * catalogue-provided). The models table renders a column only when
   * the corresponding modelsColumns label is set, so omitting a field
   * here is enough to drop it from the table — never fill it with an
   * invented value to keep columns uniform. */
  ip?: string;
  ik?: string;
  weightKg?: string;
  efficiencyLmW?: string;
  lens?: string;
  cri?: string;
  colourTemperature?: string;
  /** LED quantity per fixture — also doubles as the discrete filter-chip
   * value for the optional LED Quantity filter (e.g. GER-LED Industrial
   * High Ceiling). */
  ledQty?: number;
  /** Installation configuration (e.g. "Suspended" / "Surface Mounted")
   * for families whose catalogue models split by mounting type (e.g.
   * GER-LED High Ceiling) — also doubles as the discrete filter-chip
   * value for the optional Mounting Type filter. */
  mountingType?: string;
  /** Also doubles as the discrete filter-chip value for the optional
   * Dimensions filter (LedSeriesModelsTable), matching real catalogue
   * sizes exactly. */
  dimensions?: string;
  /** Raw catalogue ceiling-cut field, kept separate from body dimensions. */
  ceilingCut?: string;
  /** Optional short discrete value (e.g. "1200 mm") for the optional
   * Length filter — kept separate from `dimensions` so the table cell
   * can show the full "W × L × H" string while the filter chip stays
   * short (see LedSeriesModelsTable's Length filter group). */
  length?: string;
}>;

export type LedMountingOptionIconName = "busbar-connect" | "suspension" | "mounting-options" | "wall-mount";

export type LedMountingOption = Readonly<{
  icon: LedMountingOptionIconName;
  title: string;
  description: string;
}>;

/** Mounting Configurations — a distinct, richer section from the generic
 * mountingOptions cards above, for families whose catalogue defines
 * genuinely separate installation configurations with their own product
 * photo and spec set (e.g. GER-LED High Ceiling's Suspended vs Surface
 * Mounted). Rendered as large product-visual cards, not small icon
 * cards, and positioned before Models & Technical Schedule rather than
 * after it — see LedSeriesDetailPage. Omitted entirely (both fields
 * together) for families without this data. */
export type LedMountingConfigurationIconName = "suspended" | "surface-mount" | "standard-body" | "corner-body";

export type LedMountingConfiguration = Readonly<{
  icon: LedMountingConfigurationIconName;
  title: string;
  image: string;
  imageAlt: string;
  description: string;
  /** Short catalogue-backed facts (e.g. "150 W", "18,754 lm", "Ø434 mm")
   * shown as a compact list/chip row — not full label/value pairs. */
  facts: readonly string[];
}>;

export type LedControlOptionIconName =
  | "control-plc"
  | "control-dali"
  | "control-dimmer"
  | "control-signal"
  | "control-emergency"
  | "control-sensor"
  | "control-touch-dim"
  | "control-casambi";

export type LedControlOption = Readonly<{
  icon: LedControlOptionIconName;
  label: string;
  /** Optional short secondary line under the label (e.g. "Analogue
   * Dimming" under "1–10 V") — omit when the label is self-explanatory. */
  secondaryLabel?: string;
}>;

export type LedOpticalOptionIconName = "multi-lens" | "beam-angle";

export type LedOpticalOption = Readonly<{
  icon: LedOpticalOptionIconName;
  label: string;
}>;

/** Serviceability & Adjustment — an optional family-specific section for
 * families with catalogue-backed modular/serviceable construction (e.g.
 * GER-LED Industrial High Ceiling's plug-and-remove LED/driver modules
 * and adjustable-angle mechanism). Omitted entirely for families without
 * this kind of catalogue data — see LedSeriesDetailPage, which skips the
 * whole section when serviceabilityItems is absent. */
export type LedServiceabilityIconName = "connector" | "led-module" | "driver-module" | "adjustable-angle";

export type LedServiceabilityItem = Readonly<{
  icon: LedServiceabilityIconName;
  title: string;
  description: string;
}>;

/** Controls & Smart Integration — Smart Integration group. An optional,
 * second icon-card group shown alongside the existing controlOptions
 * ("Lighting Controls") for families whose catalogue lists advanced
 * building/network-level smart-integration capabilities distinct from
 * per-fixture lighting-control protocols (e.g. GER-LED Industrial High
 * Ceiling's PLC/IP-camera/3G/TCP-IP/sensing/monitoring feature set).
 * Omitted entirely for families without this catalogue data. */
export type LedSmartIntegrationIconName =
  | "plc"
  | "camera"
  | "wireless"
  | "network"
  | "power-dim"
  | "environment"
  | "motion-daylight"
  | "fault-monitoring"
  | "scenario-control";

export type LedSmartIntegrationItem = Readonly<{
  icon: LedSmartIntegrationIconName;
  label: string;
  secondaryLabel?: string;
}>;

/** Optional capability cards placed between Technical Information and the
 * model/component schedule. They let control systems and smart luminaires
 * use the established series-detail visual system without inventing
 * luminaire fields for non-luminaire hardware. */
export type LedKeyCapabilityItem = Readonly<{
  icon: LedSmartIntegrationIconName;
  title: string;
  description: string;
}>;

/** Catalogue component schedule for automation/control families whose
 * stock-coded rows are hardware, software and services rather than
 * wattage/lumen variants. */
export type LedSystemComponent = Readonly<{
  code: string;
  category: string;
  description: string;
  image?: string;
  imageAlt?: string;
}>;

export type LedSystemComponentSchedule = Readonly<{
  codeColumnLabel: string;
  componentColumnLabel: string;
  categoryColumnLabel: string;
  items: readonly LedSystemComponent[];
}>;

export type LedTechnicalAsset = Readonly<{
  title: string;
  image: string;
  imageAlt: string;
}>;

export type LedFamilyTechnicalSetting = Readonly<{
  label: string;
  value: string;
  description: string;
}>;

/** Optional, catalogue-backed family differentiator shown immediately
 * after the model schedule. Omitted families retain the existing flow. */
export type LedFamilyTechnicalSection = Readonly<{
  heading: string;
  introduction: string;
  settings: readonly LedFamilyTechnicalSetting[];
  assets: readonly LedTechnicalAsset[];
}>;

/** One selectable real catalogue beam/photometric distribution graph
 * (e.g. "20°", "130x60°") within a technical-asset variant's Photometric
 * Data card — rendered as a compact selector when a variant provides
 * more than one. Never a substitute for `photometric`, which stays the
 * card's title/fallback image for variants with a single distribution. */
export type LedPhotometricOption = Readonly<{
  id: string;
  label: string;
  image: string;
  imageAlt: string;
}>;

/** A configuration-specific set of technical assets (e.g. GER-LED High
 * Ceiling's separate Suspended vs Surface Mounted photometric/drawing
 * pairs) — rendered via a tabbed selector instead of the flat
 * technicalAssets grid when present. Reusable for any future family with
 * per-configuration technical documentation, not just this one. */
export type LedTechnicalAssetVariant = Readonly<{
  id: string;
  label: string;
  photometric: LedTechnicalAsset;
  /** Real catalogue beam-angle distribution graphs for this variant
   * (e.g. GER-LED High Ceiling's 20/60/90/120/130x60 set). When present,
   * the Photometric Data card renders a beam-angle selector and shows
   * the selected option's image instead of `photometric.image`, while
   * `photometric.title` still supplies the card heading. */
  photometricOptions?: readonly LedPhotometricOption[];
  drawing: LedTechnicalAsset;
  /** Optional small third card (e.g. a real installation-sequence
   * photo) — shown only for variants that have one; never a substitute
   * for a full Assembly Details gallery. */
  installationOverview?: LedTechnicalAsset;
}>;

export type LedTechnicalAssuranceIconName = "colour-finish" | "compliance" | "warranty";

/** Colour/finish, compliance and warranty — folded into the Technical
 * Information section as one compact row directly beneath the 4 main
 * cards, rather than a separate large section. */
export type LedTechnicalAssuranceItem = Readonly<{
  icon: LedTechnicalAssuranceIconName;
  label: string;
  value: string;
}>;

export type LedSeriesApplicationIconName =
  | "hangar"
  | "warehouse"
  | "port"
  | "aircraft-maintenance"
  | "industrial-facility"
  | "petrochemical"
  | "mining"
  | "high-ceiling"
  | "tunnel"
  | "prison"
  | "biogas"
  | "busbar-distribution"
  | "lighting-control"
  | "network-monitoring"
  | "street"
  | "airport"
  | "motorway"
  | "parks"
  | "residential"
  | "shopping-centre"
  | "public-square"
  | "parking"
  | "office"
  | "retail"
  | "education"
  | "corridor";

export type LedSeriesApplicationItem = Readonly<{
  icon: LedSeriesApplicationIconName;
  title: string;
  /** Optional per-application photo + short caption for the Applications
   * card-grid layout. When at least one application in the family sets
   * an image, the whole section renders as an image-led card grid
   * (icon-only card for any item that omits it); when none do, the
   * section falls back to the legacy single applicationImage + icon-list
   * layout. Never point this at an unrelated real photo just to fill the
   * slot — omit it instead. */
  image?: string;
  imageAlt?: string;
  description?: string;
}>;

export type LedSiblingFamily = Readonly<{
  slug: string;
  name: string;
  subtitle: string;
  /** Omitted for the current family — rendered highlighted, non-clickable,
   * with a "current family" badge instead of "View Series →". Omitted for
   * families without a detail page yet — rendered as an informational,
   * non-clickable card (same convention used elsewhere in this file). */
  href?: string;
  isCurrent?: boolean;
}>;

export type LedSeriesDetailContent = Readonly<{
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  breadcrumbs: Readonly<{
    home: string;
    products: string;
    ledSystems: string;
    category: string;
    current: string;
  }>;
  backToCategoryLabel: string;
  hero: Readonly<{
    eyebrow: string;
    category: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  }>;
  heroImage: string;
  heroImageAlt: string;
  heroBackgroundImage: string;
  heroBackgroundImageAlt: string;
  technicalInformationHeading: string;
  technicalInformation: readonly LedTechnicalInfoCard[];
  technicalAssurance: readonly LedTechnicalAssuranceItem[];
  /** Optional restrained catalogue/source statement — e.g. a claim the
   * source text makes without a corresponding certification reference
   * shown on the same page (see GER-LED Industrial High Ceiling's
   * Zone 1/Zone 2 wording). Rendered as a small, plain note; never
   * treated as a compliance badge, never placed in technicalAssurance or
   * the hero. Omit when there's nothing to flag. */
  sourceNote?: string;
  keyCapabilitiesHeading?: string;
  keyCapabilitiesIntroduction?: string;
  keyCapabilities?: readonly LedKeyCapabilityItem[];
  modelsHeading: string;
  modelsIntroduction: string;
  models?: readonly LedSeriesModel[];
  componentSchedule?: LedSystemComponentSchedule;
  /** Optional small, non-intrusive note shown directly under the models
   * table — e.g. flagging a catalogue order-code character that's
   * visually ambiguous between "O" and "0" (see LDB-FL). Never a large
   * warning banner; omit entirely when there's nothing to flag. */
  modelsNote?: string;
  modelsColumns?: Readonly<{
    model: string;
    power: string;
    luminousFlux?: string;
    voltage?: string;
    frequency?: string;
    powerFactor?: string;
    operatingTemperature?: string;
    /** Omit the whole column when the family has no verified efficiency
     * figure (e.g. LDBE) rather than showing an empty column. */
    efficiency?: string;
    /** Set only for families with verified optical/lens data (e.g. LDBE's
     * 30°/60°/90° lens options). */
    lens?: string;
    /** Set only for families with a catalogue-verified CRI/colour-
     * temperature spread across models (e.g. LDB-FL). */
    cri?: string;
    colourTemperature?: string;
    /** Set only for families with a per-model LED-quantity figure (e.g.
     * GER-LED Industrial High Ceiling). */
    ledQty?: string;
    /** Set only for families whose models split by installation
     * configuration (e.g. GER-LED High Ceiling's Suspended / Surface
     * Mounted rows) — rendered as the first column when present. */
    mountingType?: string;
    /** Set only for families with catalogue-backed model dimensions
     * (e.g. LDBE's 30×60/30×90/30×120 cm). */
    dimensions?: string;
    ceilingCut?: string;
    /** IP and weight are omitted entirely (not just left blank) for
     * families where the catalogue doesn't provide a per-model value —
     * e.g. LDB-FL has one constant IP65 for the whole family (already
     * shown in Technical Information/Assurance) and no weight figures
     * at all. */
    ip?: string;
    ik?: string;
    weight?: string;
  }>;
  modelsFilters?: Readonly<{
    searchLabel: string;
    searchPlaceholder: string;
    powerFilterLabel: string;
    allPowersLabel: string;
    /** Present only when the family has a meaningful, small set of
     * discrete catalogue dimensions to filter by (see
     * LedSeriesModel.dimensions) — omit entirely rather than showing an
     * empty/inactive filter group. */
    dimensionsFilterLabel?: string;
    /** Present only when the family has a meaningful, small set of
     * discrete catalogue lengths to filter by (see LedSeriesModel.length)
     * — a shorter, filter-only counterpart to dimensionsFilterLabel for
     * families whose Dimensions column shows a fuller "W × L × H" string
     * than makes sense as a filter chip (e.g. LDB-FL). */
    lengthFilterLabel?: string;
    /** Present only when the family has a small set of discrete
     * catalogue LED-quantity values worth filtering by (see
     * LedSeriesModel.ledQty). */
    ledQtyFilterLabel?: string;
    /** Present only when weight is itself a meaningful differentiator
     * across a small set of discrete values (see LedSeriesModel.weightKg)
     * — most families show weight as a plain column without a filter. */
    weightFilterLabel?: string;
    /** Present only when the family's models split by installation
     * configuration (see LedSeriesModel.mountingType). */
    mountingTypeFilterLabel?: string;
    clearFiltersLabel: string;
    noResultsLabel: string;
    downloadCsvLabel: string;
    mobileFiltersToggleLabel: string;
    mobileApplyFiltersLabel: string;
    mobileViewAllPrefix: string;
    mobileViewFilteredPrefix: string;
    mobileHidePrefix: string;
    modelsCountSuffix: string;
    /** Copy-to-clipboard control on the Model / Catalogue Code cell,
     * mirroring cable-management's CableManagementLabels. */
    copyModelCodeAction: string;
    copiedLabel: string;
    /** Trailing "Add to Enquiry" table column, mirroring
     * cable-management's columnAction / enquiryAddAction pattern. */
    enquiryColumnLabel: string;
    enquiryAddAction: string;
    enquiryRemoveAction: string;
  }>;
  familyTechnicalSection?: LedFamilyTechnicalSection;
  /** Optional family-specific section shown directly after Models &
   * Technical Schedule (see LedSeriesDetailPage) — omitted entirely
   * (all three fields together) for families without catalogue-backed
   * modular/serviceable construction data. */
  serviceabilityHeading?: string;
  serviceabilityIntroduction?: string;
  serviceabilityItems?: readonly LedServiceabilityItem[];
  /** Optional family-specific section shown before Models & Technical
   * Schedule (see LedSeriesDetailPage) — omitted entirely (both fields
   * together) for families without genuinely distinct installation
   * configurations (most families). */
  mountingConfigurationsHeading?: string;
  mountingConfigurations?: readonly LedMountingConfiguration[];
  /** Both omitted together for families with no catalogue-backed,
   * dedicated mounting/accessory dataset (e.g. LDB-FL) — the whole
   * Mounting & Integration Options section (including any assembly
   * gallery) is skipped entirely rather than rendered empty. */
  mountingHeading?: string;
  mountingOptions?: readonly LedMountingOption[];
  /** Optional real installation-assembly photography, shown as a small,
   * neutrally-captioned gallery beneath the mounting cards rather than
   * mislabelling individual images when the exact per-image mounting
   * mapping isn't clearly verifiable from the catalogue extraction. */
  assemblyGallery?: Readonly<{
    heading: string;
    note: string;
    images: readonly Readonly<{ image: string; imageAlt: string }>[];
  }>;
  controlsHeading: string;
  controlsIntroduction: string;
  controlOptions: readonly LedControlOption[];
  /** Small sub-label shown above the controls chip row — only rendered
   * when opticalOptionItems is also present (two-group layout). */
  controlsGroupLabel?: string;
  /** Compact icon+label optical chips (e.g. "Multi-Lens Design", "30°"),
   * visually grouped apart from controlOptions within the same section —
   * distinct from the older opticalOptions descriptive-bullet list below,
   * which stays available for families whose optics are prose rather
   * than discrete options. */
  opticsGroupLabel?: string;
  opticalOptionItems?: readonly LedOpticalOption[];
  opticalOptionsHeading?: string;
  opticalOptions?: readonly string[];
  /** Second, distinct icon-card group within the same Controls section
   * (see controlsHeading) for families with catalogue-listed advanced
   * building/network-level smart-integration capabilities — e.g. GER-LED
   * Industrial High Ceiling's PLC/IP-camera/3G/TCP-IP/sensing feature
   * set. All three fields are omitted together for families without
   * this data (most families). */
  smartIntegrationHeading?: string;
  smartIntegrationIntroduction?: string;
  smartIntegrationItems?: readonly LedSmartIntegrationItem[];
  /** Omit the complete group when a series page has no approved
   * photometric/technical-assets section. */
  photometricHeading?: string;
  technicalAssets?: readonly LedTechnicalAsset[];
  /** When present, the Photometric & Technical Data section renders a
   * tabbed Suspended/Surface-style selector over these instead of the
   * flat technicalAssets grid (which stays populated as a harmless
   * fallback/unused field in that case). */
  technicalAssetVariants?: readonly LedTechnicalAssetVariant[];
  technicalAssetVariantsDefaultId?: string;
  dimensionNote?: string;
  applicationsHeading: string;
  applicationImage?: string;
  applicationImageAlt?: string;
  applications: readonly LedSeriesApplicationItem[];
  /** Keeps application items in one compact, equal-width desktop row
   * beside the optional application image. Existing series retain the
   * standard applications layout unless they opt in. */
  compactApplicationsRow?: boolean;
  /** Forces the image-led application-card layout even when every card
   * intentionally has a neutral media area because no verified family
   * application photograph is available. */
  applicationCardsAlways?: boolean;
  siblingFamiliesHeading: string;
  siblingViewSeriesLabel: string;
  currentFamilyBadgeLabel: string;
  siblingFamilies: readonly LedSiblingFamily[];
  supportCta: Readonly<{
    title: string;
    description: string;
    action: string;
  }>;
}>;

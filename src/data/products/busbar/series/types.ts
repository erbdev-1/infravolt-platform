import type { BusbarSystemSlug } from "../catalog-content";

export type BusbarSpecColumn = Readonly<{
  id: string;
  label: string;
}>;

export type BusbarSpecRow = Readonly<{
  parameter: string;
  values: Readonly<Record<string, string>>;
}>;

export type BusbarSpecVariant = Readonly<{
  id: string;
  label: string;
  columns: readonly BusbarSpecColumn[];
  rows: readonly BusbarSpecRow[];
}>;

export type BusbarSystemDetailFacts = readonly [
  Readonly<{
    value: string;
    label: string;
  }>,
  Readonly<{
    value: string;
    label: string;
  }>,
  Readonly<{
    value: string;
    label: string;
  }>,
  Readonly<{
    value: string;
    label: string;
  }>,
];

export type BusbarSystemApplication = Readonly<{
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}>;

export type BusbarSystemComponent = Readonly<{
  slug: string;
  name: string;
  orderCode: string;
  description: string;
  image: string;
  imageAlt: string;
}>;

export type BusbarHeroImage = Readonly<{
  image: string;
  imageAlt: string;
  label?: string;
  fit?: "contain" | "cover";
  crop?: "default" | "tight";
}>;

export type BusbarDocument = Readonly<{
  title: string;
  description: string;
  fileLabel: string;
  href: string;
  downloadLabel: string;
}>;

export type BusbarSmartAutomationFeature = Readonly<{
  title: string;
  description: string;
}>;

// Optional G-BUS cross-sell section shown between Applications and the
// Engineering support CTA, only for series G-BUS is compatible with
// (GNL, GL, GGD, GS per the G-BUS catalogue).
export type BusbarSmartAutomationSection = Readonly<{
  eyebrow: string;
  heading: string;
  description: string;
  compatibilityLine: string;
  features: readonly [
    BusbarSmartAutomationFeature,
    BusbarSmartAutomationFeature,
    BusbarSmartAutomationFeature,
  ];
  image: string;
  imageAlt: string;
  primaryActionLabel: string;
  primaryActionHref: string;
}>;

export type BusbarSystemDetail = Readonly<{
  slug: BusbarSystemSlug;
  categoryEyebrow: string;
  heroDescription: string;

  heroFeatureImage: string;
  heroFeatureImageAlt: string;
  // Optional certification-style seal shown over the hero visual (e.g. "IP68").
  heroBadge?: string;

  heroImages: readonly BusbarHeroImage[];
  heroPreviousLabel: string;
  heroNextLabel: string;
  heroGalleryLabel: string;
  heroFullscreenLabel: string;
  heroCloseLabel: string;

  facts: BusbarSystemDetailFacts;

  overviewEyebrow: string;
  overviewHighlights: readonly string[];

  applicationsEyebrow: string;
  applicationsHeading: string;
  applicationsDescription: string;
  applications: readonly BusbarSystemApplication[];

  smartAutomation?: BusbarSmartAutomationSection;

  technicalDataEyebrow: string;
  technicalDataHeading: string;
  parameterHeading: string;
  // Single-table series (GNL, GL, GM) provide specColumns/specRows directly.
  // Series with multiple conductor variants that need separate current
  // ranges/cross-sections (e.g. GGD-A vs GGD-C) provide specVariants instead.
  specColumns?: readonly BusbarSpecColumn[];
  specRows?: readonly BusbarSpecRow[];
  specVariants?: readonly BusbarSpecVariant[];

  componentsEyebrow: string;
  componentsHeadingPrefix: string;
  components: readonly BusbarSystemComponent[];

  documentsTabLabel: string;
  documents: readonly BusbarDocument[];

  requestQuoteHref: string;
  requestDocumentationHref: string;
}>;

export type BusbarSystemDetailByMarket = Readonly<
  Record<"uk" | "ua", BusbarSystemDetail>
>;

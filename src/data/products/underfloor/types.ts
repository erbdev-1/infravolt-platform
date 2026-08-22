// Underfloor Cable Trunking Systems — category hub page content shape.
// Deliberately self-contained (not reusing LED's types.ts) since this is
// a sibling top-level product line, not an LED Systems sub-category.

export type UnderfloorOverviewIconName = "distribution" | "integration" | "access" | "adaptable";

export type UnderfloorOverviewItem = Readonly<{
  icon: UnderfloorOverviewIconName;
  title: string;
  description: string;
}>;

export type UnderfloorSeriesFeatureIconName =
  | "protection"
  | "material"
  | "configuration"
  | "capacity"
  | "compliance"
  | "mounting";

export type UnderfloorSeriesFeature = Readonly<{
  icon: UnderfloorSeriesFeatureIconName;
  label: string;
}>;

export type UnderfloorSeriesSlug =
  | "underfloor-junction-boxes"
  | "socket-data-accessories"
  | "underfloor-cable-trays"
  | "raised-floor-trunking"
  | "aluminium-trunking"
  | "tray-accessories";

export type UnderfloorProductSeries = Readonly<{
  slug: UnderfloorSeriesSlug;
  number: string;
  name: string;
  description: string;
  /** Max 3 concise, catalogue-verified feature lines — never padded to a
   * fixed count when fewer are genuinely supported. */
  features: readonly UnderfloorSeriesFeature[];
  /** Dedicated site-ready category-card composition for this family. */
  image?: string;
  imageAlt?: string;
  /** Set only once a real series detail route exists. */
  href?: string;
}>;

export type UnderfloorSystemStepIconName = "trunking" | "junction" | "outlet";

export type UnderfloorSystemStep = Readonly<{
  icon: UnderfloorSystemStepIconName;
  title: string;
  description: string;
}>;

export type UnderfloorConstructionOption = Readonly<{
  title: string;
  description: string;
}>;

export type UnderfloorApplicationIconName =
  | "office"
  | "commercial-building"
  | "meeting-room"
  | "education"
  | "retail"
  | "flexible-workspace";

export type UnderfloorApplicationCard = Readonly<{
  icon: UnderfloorApplicationIconName;
  title: string;
  description: string;
  /** Site-ready application image prepared for this application card. */
  image?: string;
  imageAlt?: string;
}>;

export type UnderfloorHubContent = Readonly<{
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
    description: string;
    primaryAction: string;
    secondaryAction: string;
  }>;
  heroVisualImage: string;
  heroVisualImageAlt: string;
  overviewHeading: string;
  overview: readonly UnderfloorOverviewItem[];
  seriesHeading: string;
  seriesIntroduction: string;
  viewSeriesLabel: string;
  seriesComingSoonLabel: string;
  series: readonly UnderfloorProductSeries[];
  systemHeading: string;
  systemIntroduction: string;
  systemSteps: readonly UnderfloorSystemStep[];
  constructionHeading: string;
  constructionOptions: readonly UnderfloorConstructionOption[];
  applicationsHeading: string;
  applications: readonly UnderfloorApplicationCard[];
  supportCta: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  }>;
  seriesDetail: Readonly<{
    backLabel: string;
    codesCountSuffix: string;
    addToEnquiryLabel: string;
    removeFromEnquiryLabel: string;
  }>;
}>;

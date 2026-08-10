import type { CableManagementSnapshotItem } from "./types";

export type MacroGroupSlug =
  | "support-hanging-systems"
  | "cable-trays-trunking"
  | "cable-ladders"
  | "wire-mesh-systems"
  | "conduit-pipe-systems"
  | "accessories-fixings";

/** One row from catalog-source/cable-support/catalog-map.md — the
 * catalogue's own authoritative index of all 36 extracted series. Two rows
 * (Transport & Storage instructions, Certificates & References) aren't
 * product series and are intentionally excluded from macro-group mapping;
 * see CableManagementCategoryContent.excludedFromCatalogue. */
export type CableManagementCatalogueSeries = Readonly<{
  name: string;
  macroGroup: MacroGroupSlug;
  /** Real route to a built family-detail page — only set where one exists
   * (currently just Heavy Duty Cable Trays H=60mm). Absent otherwise; never
   * a link to a page that doesn't exist. */
  href?: string;
}>;

export type CableManagementMacroGroup = Readonly<{
  slug: MacroGroupSlug;
  index: number;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  /** Real route to a built family-detail page for this group — only set
   * where one exists (currently just Cable Trays & Trunking, via Heavy
   * Duty H=60mm). Absent otherwise; the card then falls back to the
   * technical-pack request form rather than a link to a page that
   * doesn't exist. */
  href?: string;
}>;

/** One "which system do I need" card in the decision helper — a
 * requirement or scenario mapped to a recommended series/family. `href`
 * always points at a real destination: a family-detail page where one
 * exists, otherwise the technical-pack request form — never a filtered
 * search (there is no in-page browse/search surface to land on). */
export type CableManagementDecisionScenario = Readonly<{
  scenario: string;
  recommendation: string;
  description: string;
  ctaLabel: string;
  href: string;
}>;

/** One industry/sector card in the Applications section. `href` is only
 * set for sectors with a real, built Application Map route (see
 * src/app/(public)/application-map/**) — absent otherwise, rendering as
 * a non-link "coming soon" card rather than a link to a page that
 * doesn't exist. */
export type CableManagementApplication = Readonly<{
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href?: string;
  viewLabel: string;
}>;

/** One "what we provide" card — a service or document. `href` set only
 * for the real downloadable catalogue; the rest are consultative
 * services (no artifact to download), rendered as plain informational
 * cards rather than a broken "not yet available" download link. */
export type CableManagementProvisionItem = Readonly<{
  label: string;
  description: string;
  href?: string;
  download?: boolean;
}>;

export type CableManagementCategoryContent = Readonly<{
  /** Small page-chrome strings that don't belong under any one section —
   * kept in content (not hardcoded in the component) so the whole page
   * stays market-driven, same as every other field here. */
  homeLabel: string;
  /** Back-button label above the hero, matching the back-button pattern on
   * every macro/family page below this one (e.g. macro-family-labels.ts'
   * backButtonLabel) — this page's own "back" destination is the site home
   * page rather than a parent category page. */
  backHomeLabel: string;
  technicalSnapshotLabel: string;
  seriesCountSuffix: string;
  comingSoonLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  requestPackAction: string;
  requestPackHref: string;
  catalogueDocument: Readonly<{
    label: string;
    meta: string;
    href: string;
    accessibleName: string;
  }>;
  heroVideoLabel: string;
  technicalSnapshot: readonly CableManagementSnapshotItem[];
  /** Omitted at category level — no supplementary caveat needed once every
   * item's own value list already speaks for itself. Family-detail pages
   * (CableManagementFamilyContent.snapshotFootnote) still require one. */
  snapshotFootnote?: string;
  exploreHeading: string;
  exploreIntroduction: string;
  macroGroups: readonly CableManagementMacroGroup[];
  decisionHelperHeading: string;
  decisionHelperIntroduction: string;
  decisionScenarios: readonly CableManagementDecisionScenario[];
  applicationsHeading: string;
  applicationsIntroduction: string;
  applications: readonly CableManagementApplication[];
  allSeries: readonly CableManagementCatalogueSeries[];
  provideHeading: string;
  provideIntroduction: string;
  provide: readonly CableManagementProvisionItem[];
  supportHeading: string;
  supportDescription: string;
  supportAction: string;
  supportHref: string;
}>;

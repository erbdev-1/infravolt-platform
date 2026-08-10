import type { CableManagementSnapshotItem } from "./types";

/** One catalogue series card in "Product Series in This System". */
export type CableSupportSeriesCard = Readonly<{
  slug: string;
  /** Simplified website-navigation label. */
  label: string;
  /** Original Gersan catalogue series name (catalog-map.csv) — always kept
   * alongside the simplified label, never replaced by it. */
  catalogueName: string;
  description: string;
  /** Absent where no extracted image exists yet — the card then renders a
   * plain placeholder media area rather than a broken image. */
  image?: string;
  imageAlt?: string;
  /** Real row count from the series' product-data.csv — absent (never
   * invented) where that series hasn't been extracted yet. */
  orderCodeCount?: number;
  /** Real route to a built series-detail page — absent until that page
   * exists; the card then renders as a non-link "coming soon" card rather
   * than a link to a page that doesn't exist. */
  href?: string;
}>;

/** One "Choose by ..." option (installation type, duty rating, etc. —
 * whatever axis fits the macro group). Routes to a real destination,
 * never a fabricated compatibility claim. */
export type CableMacroFamilyChoiceOption = Readonly<{
  label: string;
  description: string;
  href: string;
}>;

/** One "Compatible Systems" card — a real cable-containment macro group or
 * family this range is used with. */
export type CableMacroFamilyCompatibleSystem = Readonly<{
  label: string;
  description: string;
  href: string;
}>;

/** Small page-chrome strings shared by every macro-family page (button
 * labels, empty-state text) — identical wording across all six macro
 * groups, so kept once here instead of repeated in every *-content.ts file.
 * Mirrors the CableManagementLabels pattern already used by the
 * variant-family/schedule-table side of this product line. */
export type CableMacroFamilyLabels = Readonly<{
  backButtonLabel: string;
  technicalSnapshotSuffix: string;
  imageOnRequestLabel: string;
  orderCodesOnRequestLabel: string;
  orderCodeCountSuffix: string;
  viewSeriesLabel: string;
  seriesComingSoonLabel: string;
  viewCompatibleLabel: string;
}>;

/** Content for one Cable Management *macro-family* page — one level below
 * the Cable Management Systems category page and one level above the
 * individual series pages. Shared shape reused by every macro group (see
 * support-hanging-content.ts, cable-trays-trunking-content.ts, ...) so the
 * template (CableMacroFamilyPage) is written once. */
export type CableMacroFamilyContent = Readonly<{
  breadcrumbs: readonly Readonly<{ label: string; href?: string }>[];
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
  heroImage: string;
  heroImageAlt: string;
  technicalSnapshot: readonly CableManagementSnapshotItem[];
  seriesHeading: string;
  seriesIntroduction: string;
  series: readonly CableSupportSeriesCard[];
  /** "Choose by ..." section — omitted entirely (not just an empty array)
   * where the macro group has no real distinguishing destination to route
   * to yet; see CableMacroFamilyPage. */
  chooseHeading?: string;
  chooseIntroduction?: string;
  chooseOptions?: readonly CableMacroFamilyChoiceOption[];
  compatibleHeading: string;
  compatibleIntroduction: string;
  compatibleSystems: readonly CableMacroFamilyCompatibleSystem[];
  supportHeading: string;
  supportDescription: string;
  supportAction: string;
  supportHref: string;
}>;

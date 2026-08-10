import type {
  CableFamilySiblingLink,
  CableManagementCatalogueDocument,
  CableManagementFamilyContent,
  CableManagementSnapshotItem,
} from "./types";

/** One tab in a variant-switcher family page (edge height, sub-type, etc).
 * Every tab renders through the same schedule/accessories layout
 * (CableFamilyBody) — where a tab's own order-code dataset hasn't been
 * verified yet, `content` still exists but resolves to zero variants, so
 * the table shows its normal "no results" empty state rather than a
 * fabricated schedule. */
export type CableVariantFamilyTab = Readonly<{
  id: string;
  tabLabel: string;
  content: CableManagementFamilyContent;
  /** False for tabs with no verified order-code dataset yet — shows a
   * small "Data on request" note on the tab card itself. */
  verifiedData: boolean;
}>;

/** Content for the shared variant-family template (cable-variant-family-template.tsx)
 * — one page, one URL, N tabs instead of N separate routes. Hero + Technical
 * Information are variant-independent by design: the title/description never
 * imply a specific variant, only the tab selection below does. */
export type CableVariantFamilyTemplateContent = Readonly<{
  breadcrumbs: readonly Readonly<{ label: string; href?: string }>[];
  eyebrow: string;
  title: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  /** "frameless" = direct-on-background transparent PNG artwork with the
   * premium parallax/idle-float treatment (see cable-hero-parallax.tsx) —
   * only for families with a verified transparent hero render. "framed" =
   * the boxed product-card hero (CableFamilyDetailPage's original
   * treatment) for families whose only available art is an opaque product
   * photo, never stretched frameless onto the background. */
  heroVisualMode: "framed" | "frameless";
  requestPackAction: string;
  requestPackHref: string;
  catalogueDocument: CableManagementCatalogueDocument;
  /** Static "Technical Information" strip shown once, above the variant
   * selector — not swapped per tab. */
  technicalSnapshot: readonly CableManagementSnapshotItem[];
  /** Defaults to true (hidden) — most families here are a single material/
   * finish, so a sidebar filter would be a permanently-checked non-choice.
   * Set false only where the dataset has a genuine, meaningful multi-
   * material split worth filtering by. */
  hideMaterialFilter?: boolean;
  /** Accessible group label for the compact Product Variant pills rendered
   * inside the Filter & Search sidebar — a single tab hides the group
   * entirely ("only where relevant"). */
  tabsHeading: string;
  tabs: readonly CableVariantFamilyTab[];
  /** Heading for the compact "Other <macro-group> Families" section
   * rendered after the order-code schedule — see CableFamilyBody. */
  siblingFamiliesHeading?: string;
  /** Every family page in the same macro group, including this page's own
   * — the "icon" siblingCardVariant renders the current one highlighted
   * rather than omitting it (see currentFamilySlug below). */
  siblingFamilies?: readonly CableFamilySiblingLink[];
  /** "photo" (default) or "icon" — see CableFamilyBody. Cable Trays &
   * Trunking uses "icon", the standard style across Cable Management. */
  siblingCardVariant?: "photo" | "icon";
  /** This route's own identity within siblingFamilies (e.g.
   * "heavy-duty-cable-trays") — distinct from any one tab's own
   * CableManagementFamilyContent.slug (e.g. "heavy-duty-cable-trays-h60"),
   * which is what CableFamilyBody would otherwise compare against for the
   * "icon" variant's current-family highlight. See
   * CableFamilyBody.currentFamilySlug. */
  currentFamilySlug?: string;
  supportHeading: string;
  supportDescription: string;
  supportAction: string;
  supportHref: string;
}>;

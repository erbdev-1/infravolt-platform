import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type {
  CableFamilySiblingIconName,
  CableFamilySiblingLink,
  CableManagementFamilyContent,
} from "@/data/products/cable-management/types";
import { cableManagementLabelsForMarket } from "@/data/products/cable-management/content";
import { CABLE_MANAGEMENT_VARIANTS } from "@/data/products/cable-management/variants";
import type { MarketCode } from "@/modules/markets/types";

import { computeAccessoryGroups } from "./cable-accessory-groups";
import { CableFamilyVariantTable } from "./cable-family-variant-table";
import { CableSizeVariantTable } from "./cable-size-variant-table";
import {
  IconAnchorBolt,
  IconCProfileBracket,
  IconChannelProfile,
  IconCover,
  IconDocument,
  IconDownload,
  IconHangingRod,
  IconPipe,
  IconSupport,
  IconSystem,
} from "./cable-icons";
import styles from "./cable-management-page.module.css";
import { CableTechnicalSnapshot } from "./cable-technical-snapshot";

// Icon lookup for the photo-free sibling-card style (siblingCardVariant
// "icon") — see CableFamilySiblingIconName. "support" is the fallback for
// any family without an explicit icon. "ladder" reuses IconSystem (parallel
// rails with rungs) rather than a new bespoke icon — it already reads as a
// cable ladder/tray cross-section.
const SIBLING_ICONS: Readonly<Record<CableFamilySiblingIconName, (props: Readonly<{ className?: string }>) => ReactNode>> = {
  support: IconSupport,
  profile: IconChannelProfile,
  "hanging-rod": IconHangingRod,
  "c-profile": IconCProfileBracket,
  ladder: IconSystem,
  pipe: IconPipe,
  cover: IconCover,
  anchor: IconAnchorBolt,
};

// Resolves a "?group=<slug>" query param (set by an accessory card's "View
// order codes" link) into a starting search term for the schedule table —
// see cable-accessory-groups.ts. Kept in sync with that file's slugs; if
// the param doesn't match a real group it's simply ignored (empty search).
const GROUP_SEARCH_TERMS: Readonly<Record<string, string>> = {
  "flat-bends": "Flat Bend",
  tees: "Tee",
  crossings: "Crossing",
  reducers: "Reducer",
  "reducer-covers": "Reducer Cover",
  "vertical-bends": "Vertical Bend",
  "jointing-pieces": "Jointing Piece",
};

// Everything on a family-detail page below the hero (up to, but not
// including, the final support CTA) — technical snapshot, related
// families, order-code schedule, compatible accessories and resources.
// Extracted out of CableFamilyDetailPage so the shared variant-switcher
// template (which needs its own breadcrumb/hero/tab bar above this, and a
// single shared CTA below it rather than one that swaps per variant) can
// reuse it without duplicating this section list — see
// cable-variant-family-template.tsx. The standalone per-slug family pages
// (e.g. heavy-duty-cable-trays-h60) use every section at its default
// (nothing hidden); the variant-family template opts out of the ones
// that would otherwise duplicate content it already shows itself.
export function CableFamilyBody({
  content,
  market,
  initialAccessoryGroupSlug,
  hideTechnicalSnapshot,
  hideRelatedFamilies,
  hideResources,
  hideAccessories,
  hideMaterialFilter,
  variantSelector,
  siblingFamiliesHeading,
  siblingFamilies,
  siblingCardVariant = "photo",
  currentFamilySlug,
}: Readonly<{
  content: CableManagementFamilyContent;
  market: MarketCode;
  /** Resolved server-side from the route's own searchParams — see
   * src/app/(public)/products/cable-support-systems/[slug]/page.tsx. */
  initialAccessoryGroupSlug?: string;
  /** The Heavy Duty template shows its own single, variant-independent
   * technical information row above the variant selector — this
   * component's own per-variant CableTechnicalSnapshot would otherwise
   * duplicate it every time a tab is selected. */
  hideTechnicalSnapshot?: boolean;
  /** A "Product families in this category" grid inside what is itself a
   * family-detail page reads as repetition once the parent Cable Trays &
   * Trunking category page already shows those same families. */
  hideRelatedFamilies?: boolean;
  /** The Heavy Duty template drops the Technical Resources block entirely
   * for a more focused variant/technical-selection/order-codes page. */
  hideResources?: boolean;
  /** Cable Trays & Trunking drops "Compatible Accessories" entirely —
   * Accessories & Fixings is now its own product system, so repeating that
   * grid on every tray/trunking family page duplicated it. The bends/tees/
   * crossings/reducers/covers this grid used to preview are still real
   * rows in this family's own Order Codes & Technical Schedule table
   * (computed from the same variants array) — hiding the grid only removes
   * the separate preview cards, not the underlying data. */
  hideAccessories?: boolean;
  /** The Heavy Duty template's variant selector already fixes the edge
   * height and every dataset it swaps between has a single material
   * (Hot-Dip Galvanized), so a Material/Finish sidebar filter would be a
   * single, always-checked, non-choice. */
  hideMaterialFilter?: boolean;
  /** Compact Product Variant pills — see CableFamilyVariantTable. */
  variantSelector?: ReactNode;
  /** Heading for the compact sibling-families section below — only
   * rendered when siblingFamilies is a non-empty array. */
  siblingFamiliesHeading?: string;
  /** Compact "Other <macro-group> Families" cards shown after the
   * order-code schedule — small image, name, "View series" link. Smaller
   * and simpler than the .familyGrid cards used by the related-families
   * section above. In the default "photo" variant callers exclude the
   * current family (only siblings); the "icon" variant (currently Support &
   * Hanging Systems only) expects the full family list including the
   * current one, so it can render highlighted. */
  siblingFamilies?: readonly CableFamilySiblingLink[];
  /** "photo" (default) keeps the existing image-based compact card. "icon"
   * renders the photo-free info-card style instead (small line icon,
   * subtitle, order-code count, current-family highlight) — see
   * SIBLING_ICONS. This is the standard style across Cable Management; only
   * routes with no sibling section at all (nothing in
   * MACRO_GROUP_SIBLING_HEADINGS) still fall back to "photo". */
  siblingCardVariant?: "photo" | "icon";
  /** Overrides content.slug for the "icon" sibling-card current-family
   * match. Needed by CableVariantFamilyTemplate routes, where content here
   * is the active TAB's own CableManagementFamilyContent (e.g.
   * "heavy-duty-cable-trays-h60") rather than the route-level identity the
   * sibling list actually uses (e.g. "heavy-duty-cable-trays") — see
   * CableVariantFamilyTemplateContent.currentFamilySlug. Standalone
   * [slug]/page.tsx routes never need this; content.slug already matches. */
  currentFamilySlug?: string;
}>) {
  const variants = CABLE_MANAGEMENT_VARIANTS[content.slug] ?? [];
  const accessoryGroups = computeAccessoryGroups(variants, content.accessoryDisplayGroups);
  const initialQuery = initialAccessoryGroupSlug ? GROUP_SEARCH_TERMS[initialAccessoryGroupSlug] : undefined;
  const labels = cableManagementLabelsForMarket(market);
  const currentSlug = currentFamilySlug ?? content.slug;

  return (
    <>
      {hideTechnicalSnapshot ? null : (
        <CableTechnicalSnapshot
          footnote={content.snapshotFootnote}
          items={content.technicalSnapshot}
          label={`${content.title} technical snapshot`}
        />
      )}

      {hideRelatedFamilies ? null : (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <h2 className={styles.sectionHeading}>{content.relatedFamiliesHeading}</h2>

            <div className={styles.familyGrid}>
              {content.relatedFamilies.map((family) => {
                const isCurrent = family.slug === content.slug;
                const hasDetailPage = Boolean(CABLE_MANAGEMENT_VARIANTS[family.slug]);
                const cardClassName = isCurrent
                  ? `${styles.familyCard} ${styles.familyCardCurrent}`
                  : styles.familyCard;

                const media = (
                  <div className={styles.familyMedia}>
                    {family.image ? (
                      <Image
                        alt={family.imageAlt ?? family.name}
                        className={styles.familyImage}
                        fill
                        sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 90vw"
                        src={family.image}
                      />
                    ) : (
                      <div className={styles.familyMediaEmpty}>{labels.comingSoonLabel}</div>
                    )}
                  </div>
                );

                const body = (
                  <div className={styles.familyBody}>
                    <h3>{family.name}</h3>
                    <p className={styles.familyCount}>
                      {family.countLabel ?? `${family.orderCodeCount} ${labels.countSuffix}`}
                    </p>
                    {!hasDetailPage && !isCurrent ? (
                      <p className={styles.familyComingSoon}>{labels.comingSoonLabel}</p>
                    ) : null}
                  </div>
                );

                if (isCurrent) {
                  return (
                    <div className={cardClassName} key={family.slug}>
                      <span className={styles.currentBadge}>{labels.currentFamilyLabel}</span>
                      {media}
                      {body}
                    </div>
                  );
                }

                if (!hasDetailPage) {
                  // Real family, real count — but no detail page/data exists
                  // yet, so this renders as an informational card, never a
                  // link to a page that doesn't exist.
                  return (
                    <div className={cardClassName} key={family.slug}>
                      {media}
                      {body}
                    </div>
                  );
                }

                return (
                  <Link
                    className={cardClassName}
                    href={`/products/cable-support-systems/${family.slug}`}
                    key={family.slug}
                  >
                    {media}
                    {body}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className={styles.scheduleSection} id="schedule-panel">
        <div className={styles.scheduleHeading}>
          <h2 className={styles.sectionHeading}>{content.scheduleHeading}</h2>
          {content.customSpecNote ? null : (
            <div className={styles.scheduleMeta}>
              <span>
                {content.sizeVariants ? content.sizeVariants.length : variants.length}{" "}
                {content.sizeVariants ? labels.sizeVariantCountSuffix : labels.countSuffix}
              </span>
              <span aria-hidden="true">·</span>
              <span>{content.title}</span>
              <span aria-hidden="true">·</span>
              <span>{content.standardLabel}</span>
            </div>
          )}
          <p className={styles.scheduleIntroduction}>{content.scheduleIntroduction}</p>
        </div>

        {content.customSpecNote ? (
          <div className={styles.customSpecNote}>
            {content.customSpecNote.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : content.sizeVariants ? (
          <CableSizeVariantTable familySlug={content.slug} labels={labels} variants={content.sizeVariants} />
        ) : (
          <CableFamilyVariantTable
            familyName={content.title}
            familySlug={content.slug}
            hideMaterialFilter={hideMaterialFilter}
            initialQuery={initialQuery}
            labels={labels}
            market={market}
            columnLabels={content.scheduleColumnLabels}
            sourceRoute={`/products/cable-support-systems/${currentSlug}`}
            variants={variants}
            variantSelector={variantSelector}
          />
        )}
      </section>

      {siblingFamilies && siblingFamilies.length > 0 ? (
        <section className={styles.siblingFamiliesSection}>
          <h2 className={styles.sectionHeading}>{siblingFamiliesHeading}</h2>

          {siblingCardVariant === "icon" ? (
            <div className={styles.siblingIconGrid}>
              {siblingFamilies.map((family) => {
                const isCurrent = family.slug === currentSlug;
                const Icon = SIBLING_ICONS[family.icon ?? "support"];
                const cardClassName = [
                  styles.siblingIconCard,
                  isCurrent ? styles.siblingIconCardCurrent : "",
                  family.informational ? styles.siblingIconCardInformational : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                const inner = (
                  <>
                    <div className={styles.siblingIconHeader}>
                      <div className={styles.siblingIconGlyph}>
                        <Icon className={styles.siblingIconGlyphIcon} />
                      </div>
                      <h3 className={styles.siblingIconTitle} title={family.name}>
                        {family.name}
                      </h3>
                    </div>
                    {isCurrent ? (
                      <span className={styles.siblingIconCurrentBadge}>{labels.currentFamilyLabel}</span>
                    ) : null}
                    {family.subtitle ? (
                      <p className={styles.siblingIconSubtitle} title={family.subtitle}>
                        {family.subtitle}
                      </p>
                    ) : null}
                    <span className={styles.siblingIconMeta}>
                      {family.countLabel ?? `${family.orderCodeCount ?? 0} ${labels.countSuffix}`}
                    </span>
                    {isCurrent || family.informational ? null : (
                      <span className={styles.siblingIconFooter}>{labels.viewSeriesLabel}</span>
                    )}
                  </>
                );

                if (isCurrent || family.informational) {
                  return (
                    <div className={cardClassName} key={family.slug}>
                      {inner}
                    </div>
                  );
                }

                return (
                  <Link
                    className={cardClassName}
                    href={`/products/cable-support-systems/${family.slug}`}
                    key={family.slug}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={styles.siblingFamilyGrid}>
              {siblingFamilies.map((family) => (
                <Link
                  className={styles.siblingFamilyCard}
                  href={`/products/cable-support-systems/${family.slug}`}
                  key={family.slug}
                >
                  <div className={styles.siblingFamilyMedia}>
                    {family.image ? (
                      <Image
                        alt={family.imageAlt ?? family.name}
                        className={styles.siblingFamilyImage}
                        fill
                        sizes="(min-width: 1100px) 12vw, (min-width: 640px) 30vw, 45vw"
                        src={family.image}
                      />
                    ) : (
                      <span className={styles.accessoryMediaEmpty}>{labels.comingSoonLabel}</span>
                    )}
                  </div>
                  <div className={styles.siblingFamilyBody}>
                    <h3>{family.name}</h3>
                  </div>
                  <span className={styles.siblingFamilyFooter}>{labels.viewSeriesLabel}</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {!hideAccessories && accessoryGroups.length > 0 ? (
        <section className={styles.accessoriesSection}>
          <div className={styles.accessoriesInner}>
            <div className={styles.accessoriesHeader}>
              <h2 className={styles.sectionHeading}>{content.accessoriesHeading}</h2>
              <a className={styles.accessoriesViewAllLink} href="#schedule-panel">
                {labels.viewAllAccessoriesAction}
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className={styles.accessoriesIntroduction}>{content.accessoriesIntroduction}</p>

            <div className={styles.accessoryGrid}>
              {accessoryGroups.map((group) => (
                <Link className={styles.accessoryCard} href={`?group=${group.slug}#schedule-panel`} key={group.slug}>
                  <div className={styles.accessoryMedia}>
                    {group.image ? (
                      <Image
                        alt={`${group.label} — ${content.title} ${content.titleQualifier}, technical catalogue drawing`}
                        className={styles.accessoryImage}
                        fill
                        sizes="(min-width: 1100px) 12vw, (min-width: 640px) 30vw, 45vw"
                        src={group.image}
                      />
                    ) : (
                      <span className={styles.accessoryMediaEmpty}>{labels.comingSoonLabel}</span>
                    )}
                  </div>
                  <div className={styles.accessoryBody}>
                    <h3>{group.label}</h3>
                    {content.titleQualifier ? (
                      <p className={styles.accessoryMeta}>({content.titleQualifier})</p>
                    ) : null}
                  </div>
                  <span className={styles.accessoryFooter}>
                    {labels.viewProductAction}
                    <span aria-hidden="true" className={styles.accessoryFooterArrow}>
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {hideResources ? null : (
        <section className={styles.resourcesSection}>
          <h2 className={styles.sectionHeading}>{content.resourcesHeading}</h2>

          <div className={styles.resourceGrid}>
            {content.resources.map((resource) =>
              resource.unavailable || !resource.href ? (
                <div className={styles.resourceCardDisabled} key={resource.label}>
                  <IconDocument aria-hidden="true" className={styles.resourceIcon} />
                  <div className={styles.resourceBody}>
                    <h3>{resource.label}</h3>
                    <p>{resource.description}</p>
                    <span className={styles.resourceUnavailable}>Not yet available</span>
                  </div>
                </div>
              ) : (
                <a
                  className={styles.resourceCard}
                  download={resource.download}
                  href={resource.href}
                  key={resource.label}
                >
                  <IconDownload aria-hidden="true" className={styles.resourceIcon} />
                  <div className={styles.resourceBody}>
                    <h3>{resource.label}</h3>
                    <p>{resource.description}</p>
                  </div>
                </a>
              ),
            )}
          </div>
        </section>
      )}
    </>
  );
}

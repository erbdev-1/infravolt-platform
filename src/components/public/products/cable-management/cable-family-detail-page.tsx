import Image from "next/image";
import Link from "next/link";

import type { CableFamilySiblingLink, CableManagementFamilyContent } from "@/data/products/cable-management/types";
import type { MarketCode } from "@/modules/markets/types";

import { CableFamilyBody } from "./cable-family-body";
import { CableHeroParallax } from "./cable-hero-parallax";
import { IconDownload } from "./cable-icons";
import styles from "./cable-management-page.module.css";

export function CableFamilyDetailPage({
  content,
  market,
  initialAccessoryGroupSlug,
  hideRelatedFamilies,
  hideResources,
  siblingFamiliesHeading,
  siblingFamilies,
  siblingCardVariant,
  heroVisualMode = "framed",
}: Readonly<{
  content: CableManagementFamilyContent;
  market: MarketCode;
  /** Resolved server-side from the route's own searchParams — see
   * src/app/(public)/products/cable-support-systems/[slug]/page.tsx. */
  initialAccessoryGroupSlug?: string;
  /** Opts a family out of the large "Product families in this category"
   * grid — used by Support & Hanging Systems detail pages, which show the
   * compact siblingFamilies section instead. */
  hideRelatedFamilies?: boolean;
  /** Opts a family out of the "Technical Resources" section. */
  hideResources?: boolean;
  /** Heading for the compact sibling-families section rendered after the
   * order-code schedule — see CableFamilyBody. */
  siblingFamiliesHeading?: string;
  /** Compact "Other <macro-group> Families" cards — small image, name and
   * a "View series" link, deliberately smaller than the familyGrid cards
   * used by the related-families section above. */
  siblingFamilies?: readonly CableFamilySiblingLink[];
  /** "photo" (default) or "icon" — see CableFamilyBody. */
  siblingCardVariant?: "photo" | "icon";
  /** "framed" (default) = the boxed white product-card hero, for families
   * whose only art is an opaque photo. "frameless" = direct-on-background
   * transparent PNG artwork with the parallax/idle-float treatment (see
   * CableHeroParallax and the macro/CableVariantFamilyTemplate heroes) —
   * only pass this for a family with a verified transparent hero render;
   * a white boxed card behind a transparent PNG just reproduces the same
   * white background the transparency was meant to remove. */
  heroVisualMode?: "framed" | "frameless";
}>) {
  // Get the parent breadcrumb href (second-to-last breadcrumb has the parent category link)
  const parentBreadcrumb = content.breadcrumbs[content.breadcrumbs.length - 2];
  const backButtonHref = parentBreadcrumb?.href || "/products/cable-support-systems";
  // The arrow itself comes from .backButton::before (see
  // cable-management-page.module.css) — the label text must not repeat it.
  const backButtonLabel = parentBreadcrumb?.label
    ? `Back to ${parentBreadcrumb.label}`
    : "Back to Cable Support Systems";

  return (
    <main className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        {content.breadcrumbs.map((crumb, index) => {
          const isLast = index === content.breadcrumbs.length - 1;

          return (
            <span key={crumb.label}>
              {index > 0 ? <span aria-hidden="true"> / </span> : null}
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span className={isLast ? styles.breadcrumbCurrent : undefined}>{crumb.label}</span>
              )}
            </span>
          );
        })}
      </nav>

      <div className={styles.backButtonWrapper}>
        <Link className={styles.backButton} href={backButtonHref}>
          {backButtonLabel}
        </Link>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>

            <h1>
              {content.title}
              <span className={styles.heroQualifier}>{content.titleQualifier}</span>
            </h1>

            <p className={styles.heroDescription}>{content.description}</p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href={content.requestPackHref}>
                {content.requestPackAction}
              </Link>

              <a
                aria-label={content.catalogueDocument.accessibleName}
                className={styles.catalogueButton}
                download
                href={content.catalogueDocument.href}
              >
                <IconDownload aria-hidden="true" className={styles.catalogueButtonIcon} />
                <span>{content.catalogueDocument.label}</span>
              </a>
            </div>
          </div>

          {heroVisualMode === "frameless" ? (
            <div className={styles.supportHeroVisual}>
              <div aria-hidden="true" className={styles.heroVisualGlow} />
              <div className={styles.supportHeroVisualFloat}>
                <CableHeroParallax className={styles.supportHeroVisualParallax}>
                  <div aria-hidden="true" className={styles.supportHeroVisualSweep} />
                  <Image
                    alt={content.imageAlt}
                    className={styles.supportHeroVisualImage}
                    fill
                    priority
                    sizes="(min-width: 1100px) 44vw, 90vw"
                    src={content.image}
                  />
                </CableHeroParallax>
              </div>
            </div>
          ) : (
            <div className={styles.heroVisual}>
              <div aria-hidden="true" className={styles.heroVisualGlow} />
              <div className={styles.heroVisualEnter}>
                <div className={styles.heroVisualFloat}>
                  <div className={styles.heroVisualCard}>
                    <Image
                      alt={content.imageAlt}
                      className={styles.heroVisualImage}
                      fill
                      priority
                      sizes="(min-width: 1100px) 44vw, 90vw"
                      src={content.image}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <CableFamilyBody
        content={content}
        hideRelatedFamilies={hideRelatedFamilies}
        hideResources={hideResources}
        initialAccessoryGroupSlug={initialAccessoryGroupSlug}
        market={market}
        siblingCardVariant={siblingCardVariant}
        siblingFamilies={siblingFamilies}
        siblingFamiliesHeading={siblingFamiliesHeading}
      />

      <section className={styles.supportSection}>
        <div className={styles.supportContent}>
          <div>
            <h2>{content.supportHeading}</h2>
            <p>{content.supportDescription}</p>
          </div>

          <Link className={styles.supportAction} href={content.supportHref}>
            {content.supportAction}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <div className={styles.pageEnd} />
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cableManagementLabelsForMarket } from "@/data/products/cable-management/content";
import type { CableVariantFamilyTemplateContent } from "@/data/products/cable-management/variant-family-template-types";
import type { MarketCode } from "@/modules/markets/types";

import { CableFamilyBody } from "./cable-family-body";
import { CableHeroParallax } from "./cable-hero-parallax";
import { IconDownload } from "./cable-icons";
import styles from "./cable-management-page.module.css";
import { CableTechnicalSnapshot } from "./cable-technical-snapshot";

const CABLE_TRAYS_TRUNKING_HREF = "/products/cable-support-systems/cable-trays-trunking";

// Shared variant-switcher family page template — one page, one URL, N tabs
// (edge heights, sub-types, etc) instead of N separate routes. This is the
// approved Heavy Duty Cable Trays page's own template, generalized so every
// Cable Trays & Trunking family page reuses the exact same architecture,
// styling and interaction pattern — only the content/config passed in
// differs. Hero + Technical Information are variant-independent by design
// (don't imply a specific variant until the user picks one via the
// selector). Every tab renders the schedule via the same CableFamilyBody
// used by the standalone family-detail template, with its own technical
// snapshot / related-families / material filter / resources sections
// turned off here (this page already shows a single static technical
// block, its parent category page already shows the family grid, and
// Technical Resources is out of scope for this template) — see the hideX
// props below. Tabs with no verified order-code dataset yet still render
// through the same layout with zero variants, so the table shows an honest
// "no results" empty state rather than a fabricated schedule.
//
// Product Variant selection lives inside the Filter & Search sidebar (see
// variantSelector below, rendered by CableFamilyVariantTable) rather than
// as its own full-width section between Technical Information and Order
// Codes — this component still owns the active-tab state (so switching
// variant updates the schedule, filters and Compatible Accessories
// together, same page, no navigation) but only renders compact pills, not
// a separate section.
export function CableVariantFamilyTemplate({
  content,
  market,
  initialActiveId,
}: Readonly<{
  content: CableVariantFamilyTemplateContent;
  market: MarketCode;
  /** Resolved server-side from the route's own searchParams (?variant=).
   * Falls back to the first tab when absent or not a real tab id. */
  initialActiveId?: string;
}>) {
  const labels = cableManagementLabelsForMarket(market);
  const [activeId, setActiveId] = useState(
    content.tabs.some((tab) => tab.id === initialActiveId) ? initialActiveId! : content.tabs[0].id,
  );
  const active = content.tabs.find((tab) => tab.id === activeId) ?? content.tabs[0];
  const showVariantSelector = content.tabs.length > 1;

  const variantSelector = showVariantSelector ? (
    <div aria-label={content.tabsHeading} className={styles.filterGroup} role="group">
      <h3 className={styles.filterGroupLabel}>{labels.productVariantLabel}</h3>
      <div className={styles.variantPillGroup} role="tablist">
        {content.tabs.map((tab) => {
          const isActive = tab.id === activeId;

          return (
            <button
              aria-selected={isActive}
              className={isActive ? styles.variantPillActive : styles.variantPill}
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              role="tab"
              type="button"
            >
              {tab.tabLabel}
              {!tab.verifiedData ? <span className={styles.variantPillPending}>{labels.dataOnRequestLabel}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  ) : null;

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
        <Link className={styles.backButton} href={CABLE_TRAYS_TRUNKING_HREF}>
          {labels.backToCableTraysTrunkingLabel}
        </Link>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>

            <h1>{content.title}</h1>

            <p className={styles.heroDescription}>{content.heroDescription}</p>

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

          {content.heroVisualMode === "frameless" ? (
            <div className={styles.supportHeroVisual}>
              <div aria-hidden="true" className={styles.heroVisualGlow} />
              <div className={styles.supportHeroVisualFloat}>
                <CableHeroParallax className={styles.supportHeroVisualParallax}>
                  <div aria-hidden="true" className={styles.supportHeroVisualSweep} />
                  <Image
                    alt={content.heroImageAlt}
                    className={styles.supportHeroVisualImage}
                    fill
                    priority
                    sizes="(min-width: 1100px) 46vw, 92vw"
                    src={content.heroImage}
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
                      alt={content.heroImageAlt}
                      className={styles.heroVisualImage}
                      fill
                      priority
                      sizes="(min-width: 1100px) 44vw, 90vw"
                      src={content.heroImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className={styles.supportSnapshotWrapper}>
        <CableTechnicalSnapshot
          items={content.technicalSnapshot}
          label={`${content.title} ${labels.technicalInformationSuffix}`}
        />
      </div>

      <CableFamilyBody
        content={active.content}
        currentFamilySlug={content.currentFamilySlug}
        hideAccessories
        hideMaterialFilter={content.hideMaterialFilter ?? true}
        hideRelatedFamilies
        hideResources
        hideTechnicalSnapshot
        key={active.id}
        market={market}
        siblingCardVariant={content.siblingCardVariant}
        siblingFamilies={content.siblingFamilies}
        siblingFamiliesHeading={content.siblingFamiliesHeading}
        variantSelector={variantSelector}
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

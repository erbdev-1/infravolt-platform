import Image from "next/image";
import Link from "next/link";

import { cableManagementCategoryContentForMarket } from "@/data/products/cable-management/category-content";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";
import { publicMediaUrl } from "@/modules/storage/asset-url";

import { CableApplicationsSelector } from "./cable-applications-selector";
import { IconDocument, IconDownload } from "./cable-icons";
import styles from "./cable-management-page.module.css";
import { CableTechnicalSnapshot } from "./cable-technical-snapshot";

// Real destination for any macro group / decision-helper scenario without
// its own built family-detail page — never a link to a page that doesn't
// exist.
const TECHNICAL_PACK_REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "cable-management-systems",
  source: "/products/cable-support-systems",
});

// The reusable Cable Management Systems *category* landing page — distinct
// from CableFamilyDetailPage (the individual product-family template, e.g.
// Heavy Duty Cable Trays H=60mm). This page introduces the whole category
// and routes users into family pages; it never renders an order-code table
// itself. `market` resolves the whole bilingual content tree here (same
// pattern as EarthingLightningHubPage/BusbarCatalogPage) rather than the
// route resolving it and passing a `content` prop.
export function CableCategoryPage({
  market,
}: Readonly<{
  market: MarketCode;
}>) {
  const content = cableManagementCategoryContentForMarket(market);
  const seriesCountByGroup = new Map<string, number>();
  for (const series of content.allSeries) {
    seriesCountByGroup.set(series.macroGroup, (seriesCountByGroup.get(series.macroGroup) ?? 0) + 1);
  }

  return (
    <main className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link href="/">{content.homeLabel}</Link>
        <span aria-hidden="true"> / </span>
        <span className={styles.breadcrumbCurrent}>{content.title}</span>
      </nav>

      <div className={styles.backButtonWrapper}>
        <Link className={styles.backButton} href="/">
          {content.backHomeLabel}
        </Link>
      </div>

      <section className={styles.hero}>
        <div className={styles.categoryHeroGrid}>
          <div className={`${styles.heroContent} ${styles.categoryHeroContentPad}`}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h1>{content.title}</h1>
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

          <div className={styles.categoryHeroVisual}>
            <video
              aria-label={content.heroVideoLabel}
              autoPlay
              className={styles.heroVideo}
              loop
              muted
              playsInline
              poster={publicMediaUrl("media/products/cable-management-systems/infravolt-cable-support-poster.webp")}
              preload="metadata"
            >
              <source
                src={publicMediaUrl("media/products/cable-management-systems/infravolt-cable-support.mp4")}
                type="video/mp4"
              />
            </video>

            <div aria-hidden="true" className={styles.heroVideoOverlay} />
          </div>
        </div>
      </section>

      <CableTechnicalSnapshot
        footnote={content.snapshotFootnote}
        items={content.technicalSnapshot}
        label={content.technicalSnapshotLabel}
      />

      <section className={styles.exploreSection} id="explore-cable-management-systems">
        <div className={styles.exploreInner}>
          <h2 className={styles.sectionHeading}>{content.exploreHeading}</h2>
          <p className={styles.sectionIntroduction}>{content.exploreIntroduction}</p>

          <div className={styles.macroGrid}>
            {content.macroGroups.map((group) => {
              const count = seriesCountByGroup.get(group.slug) ?? 0;

              return (
                <Link
                  className={styles.macroCard}
                  href={group.href ?? TECHNICAL_PACK_REQUEST_HREF}
                  key={group.slug}
                >
                  <span className={styles.macroIndex}>{String(group.index).padStart(2, "0")}</span>
                  <div className={styles.macroMedia}>
                    {group.image ? (
                      <Image
                        alt={group.imageAlt ?? group.title}
                        className={styles.macroImage}
                        fill
                        sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 90vw"
                        src={group.image}
                      />
                    ) : null}
                  </div>
                  <div className={styles.macroBody}>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                  <div className={styles.macroFooter}>
                    <span>
                      {count} {content.seriesCountSuffix}
                    </span>
                    <span aria-hidden="true" className={styles.macroFooterArrow}>
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.decisionSection}>
        <h2 className={styles.sectionHeading}>{content.decisionHelperHeading}</h2>
        <p className={styles.sectionIntroduction}>{content.decisionHelperIntroduction}</p>

        {/* Desktop: full card grid (unchanged). Mobile/tablet: the same
            content as a native <details> accordion instead — collapsed by
            default so this section doesn't add another long stack of tall
            cards under the six family cards above it. Both render in the
            DOM; only one is visible at a time via the shared breakpoint
            (see .decisionGrid / .decisionAccordion in the CSS module),
            same "render both, toggle by CSS" pattern already used for the
            schedule table's mobile filter panel. */}
        <div className={styles.decisionGrid}>
          {content.decisionScenarios.map((item) => (
            <div className={styles.decisionCard} key={item.scenario}>
              <p className={styles.decisionScenario}>{item.scenario}</p>
              <h3 className={styles.decisionRecommendation}>{item.recommendation}</h3>
              <p className={styles.decisionDescription}>{item.description}</p>
              <Link className={styles.decisionAction} href={item.href}>
                {item.ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.decisionAccordion}>
          {content.decisionScenarios.map((item) => (
            <details className={styles.decisionAccordionItem} key={item.scenario}>
              <summary className={styles.decisionAccordionSummary}>
                <span className={styles.decisionAccordionText}>
                  <span className={styles.decisionScenario}>{item.scenario}</span>
                  <span className={styles.decisionAccordionRecommendation}>{item.recommendation}</span>
                </span>
                <span aria-hidden="true" className={styles.decisionAccordionChevron} />
              </summary>
              <div className={styles.decisionAccordionBody}>
                <p className={styles.decisionDescription}>{item.description}</p>
                <Link className={styles.decisionAction} href={item.href}>
                  {item.ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.provideSection}>
        <h2 className={styles.sectionHeading}>{content.provideHeading}</h2>
        <p className={styles.sectionIntroduction}>{content.provideIntroduction}</p>

        <div className={styles.provideGrid}>
          {content.provide.map((item) =>
            item.href ? (
              <a className={styles.provideCard} download={item.download} href={item.href} key={item.label}>
                <IconDownload aria-hidden="true" className={styles.provideIcon} />
                <div className={styles.provideBody}>
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
                </div>
              </a>
            ) : (
              <div className={styles.provideCard} key={item.label}>
                <IconDocument aria-hidden="true" className={styles.provideIcon} />
                <div className={styles.provideBody}>
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <section className={styles.applicationsSection}>
        <div className={styles.applicationsInner}>
          <h2 className={styles.sectionHeading}>{content.applicationsHeading}</h2>
          <p className={styles.sectionIntroduction}>{content.applicationsIntroduction}</p>

          <CableApplicationsSelector applications={content.applications} comingSoonLabel={content.comingSoonLabel} />
        </div>
      </section>

      <section className={styles.supportSection}>
        <div className={styles.supportContent}>
          <div>
            <h2>{content.supportHeading}</h2>
            <p>{content.supportDescription}</p>
          </div>

          <div className={styles.supportActions}>
            <Link className={styles.supportAction} href={content.supportHref}>
              {content.supportAction}
              <span aria-hidden="true">→</span>
            </Link>
            <a
              aria-label={content.catalogueDocument.accessibleName}
              className={styles.supportActionSecondary}
              download
              href={content.catalogueDocument.href}
            >
              {content.catalogueDocument.label}
            </a>
          </div>
        </div>
      </section>

      <div className={styles.pageEnd} />
    </main>
  );
}

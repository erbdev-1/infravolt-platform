import Image from "next/image";
import Link from "next/link";

import { cableManagementCategoryContentForMarket } from "@/data/products/cable-management/category-content";
import type { MarketCode } from "@/modules/markets/types";

import { IconDocument, IconDownload } from "./cable-icons";
import styles from "./cable-management-page.module.css";
import { CableTechnicalSnapshot } from "./cable-technical-snapshot";

// Real destination for any macro group / decision-helper scenario without
// its own built family-detail page — never a link to a page that doesn't
// exist.
const TECHNICAL_PACK_REQUEST_HREF = "/uk-support?request=technical-pack&product=cable-management-systems";

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
                <span>
                  {content.catalogueDocument.label}
                  <small>{content.catalogueDocument.meta}</small>
                </span>
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
              poster="/assets/media/products/cable-management-systems/infravolt-cable-support-poster.webp"
              preload="metadata"
            >
              <source
                src="/assets/media/products/cable-management-systems/infravolt-cable-support.mp4"
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

          <div className={styles.applicationsGrid}>
            {content.applications.map((application) => {
              const media = (
                <div className={styles.applicationMedia}>
                  <Image
                    alt={application.imageAlt}
                    className={styles.applicationImage}
                    fill
                    sizes="(min-width: 1050px) 12vw, (min-width: 640px) 24vw, 45vw"
                    src={application.image}
                  />
                </div>
              );

              if (application.href) {
                return (
                  <Link
                    className={styles.applicationCard}
                    href={application.href}
                    key={application.slug}
                    title={application.description}
                  >
                    {media}
                    <div className={styles.applicationBody}>
                      <h3>{application.title}</h3>
                    </div>
                    <span className={styles.applicationFooter}>
                      {application.viewLabel}
                      <span aria-hidden="true" className={styles.applicationFooterArrow}>
                        →
                      </span>
                    </span>
                  </Link>
                );
              }

              return (
                <div className={styles.applicationCardDisabled} key={application.slug} title={application.description}>
                  {media}
                  <div className={styles.applicationBody}>
                    <h3>{application.title}</h3>
                  </div>
                  <span className={styles.applicationComingSoon}>{content.comingSoonLabel}</span>
                </div>
              );
            })}
          </div>
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

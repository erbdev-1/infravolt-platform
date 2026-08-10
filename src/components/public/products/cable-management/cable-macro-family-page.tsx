import Image from "next/image";
import Link from "next/link";

import { cableMacroFamilyLabelsForMarket } from "@/data/products/cable-management/macro-family-labels";
import type { CableMacroFamilyContent } from "@/data/products/cable-management/macro-family-types";
import type { MarketCode } from "@/modules/markets/types";

import { CableHeroParallax } from "./cable-hero-parallax";
import { IconDownload } from "./cable-icons";
import styles from "./cable-management-page.module.css";
import { CableTechnicalSnapshot } from "./cable-technical-snapshot";

const CABLE_MANAGEMENT_HREF = "/products/cable-support-systems";

// Reusable Cable Management *macro-family* page template — one level below
// the Cable Management Systems category page and one level above the
// individual series pages (most not built yet, see CableSupportSeriesCard).
// It explains the whole macro group, shows its catalogue series, and
// routes into series pages once they exist. It never renders an
// order-code table itself — see CableFamilyDetailPage for that. `content`
// is entirely data-driven and already market-resolved by the route (each
// macro group has its own xContentForMarket selector — see
// support-hanging-content.ts, cable-trays-trunking-content.ts, ...);
// `market` here only selects the shared page-chrome labels (button/
// empty-state text identical across every macro group — see
// macro-family-labels.ts), the same two-prop split
// EarthingCategoryDetailPage uses for its own per-slug content + shared
// labels.
export function CableMacroFamilyPage({
  content,
  market,
}: Readonly<{
  content: CableMacroFamilyContent;
  market: MarketCode;
}>) {
  const labels = cableMacroFamilyLabelsForMarket(market);

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
        <Link className={styles.backButton} href={CABLE_MANAGEMENT_HREF}>
          {labels.backButtonLabel}
        </Link>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
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
        </div>
      </section>

      <div className={styles.supportSnapshotWrapper}>
        <CableTechnicalSnapshot
          items={content.technicalSnapshot}
          label={`${content.title} ${labels.technicalSnapshotSuffix}`}
        />
      </div>

      <section className={styles.supportSeriesSection}>
        <h2 className={styles.sectionHeading}>{content.seriesHeading}</h2>
        <p className={styles.sectionIntroduction}>{content.seriesIntroduction}</p>

        <div className={styles.supportSeriesGrid}>
          {content.series.map((series) => {
            const media = (
              <div className={styles.supportSeriesMedia}>
                {series.image ? (
                  <Image
                    alt={series.imageAlt ?? series.label}
                    className={styles.supportSeriesImage}
                    fill
                    sizes="(min-width: 1100px) 28vw, (min-width: 640px) 45vw, 92vw"
                    src={series.image}
                  />
                ) : (
                  <div className={styles.supportSeriesMediaEmpty}>{labels.imageOnRequestLabel}</div>
                )}
              </div>
            );

            const body = (
              <div className={styles.supportSeriesBody}>
                <h3>{series.label}</h3>
                <p className={styles.supportSeriesCatalogueName}>{series.catalogueName}</p>
                <p>{series.description}</p>
              </div>
            );

            const countLabel =
              series.orderCodeCount === undefined
                ? labels.orderCodesOnRequestLabel
                : `${series.orderCodeCount} ${labels.orderCodeCountSuffix}`;

            if (series.href) {
              return (
                <Link className={styles.supportSeriesCard} href={series.href} key={series.slug}>
                  {media}
                  {body}
                  <div className={styles.supportSeriesFooter}>
                    <span>{countLabel}</span>
                    <span aria-hidden="true">{labels.viewSeriesLabel}</span>
                  </div>
                </Link>
              );
            }

            return (
              <div className={styles.supportSeriesCard} key={series.slug}>
                {media}
                {body}
                <div className={styles.supportSeriesFooter}>
                  <span>{countLabel}</span>
                  <span className={styles.supportSeriesSoon}>{labels.seriesComingSoonLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {content.chooseHeading && content.chooseOptions ? (
        <section className={styles.installationSection}>
          <h2 className={styles.sectionHeading}>{content.chooseHeading}</h2>
          <p className={styles.sectionIntroduction}>{content.chooseIntroduction}</p>

          <div className={styles.installationGrid}>
            {content.chooseOptions.map((option) => (
              <Link className={styles.installationCard} href={option.href} key={option.label}>
                <span className={styles.installationLabel}>{option.label}</span>
                <span className={styles.installationDescription}>{option.description}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.compatibleSection}>
        <h2 className={styles.sectionHeading}>{content.compatibleHeading}</h2>
        <p className={styles.sectionIntroduction}>{content.compatibleIntroduction}</p>

        <div className={styles.compatibleGrid}>
          {content.compatibleSystems.map((system) => (
            <Link className={styles.compatibleCard} href={system.href} key={system.label}>
              <h3>{system.label}</h3>
              <p>{system.description}</p>
              <span aria-hidden="true">{labels.viewCompatibleLabel}</span>
            </Link>
          ))}
        </div>
      </section>

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

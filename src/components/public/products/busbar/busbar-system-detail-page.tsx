import Link from "next/link";

import {
  busbarCatalogContentForMarket,
  type BusbarSystemSlug,
} from "@/data/products/busbar/catalog-content";
import type { BusbarSystemDetail } from "@/data/products/busbar/series/types";
import type { BusbarSystem } from "@/data/products/busbar/types";
import type { MarketCode } from "@/modules/markets/types";

import { BusbarApplicationsSection } from "./busbar-applications-section";
import { BusbarDetailTabs } from "./busbar-detail-tabs";
import { BusbarProductHeroVisual } from "./busbar-product-hero-visual";
import { BusbarSmartAutomationSection } from "./busbar-smart-automation-section";
import styles from "./busbar-system-detail-page.module.css";

// Two closely-adjacent systems to surface as "related" on each detail page
// — grouped by current tier/segment (high-current, medium-power, lighting)
// so the suggestion is genuinely relevant, not just "every other system".
const RELATED_SYSTEM_SLUGS: Readonly<Record<BusbarSystemSlug, readonly BusbarSystemSlug[]>> = {
  "gs-super-compact": ["gr-cast-resin", "ggd-medium-power-busbar"],
  "gr-cast-resin": ["gs-super-compact", "ggd-medium-power-busbar"],
  "ggd-medium-power-busbar": ["gs-super-compact", "gr-cast-resin"],
  "gl-lighting-busbar": ["gnl-lighting-busbar", "ggd-medium-power-busbar"],
  "gnl-lighting-busbar": ["gl-lighting-busbar", "ggd-medium-power-busbar"],
  "gm-low-power-busbar": ["ggd-medium-power-busbar", "gnl-lighting-busbar"],
};

export function BusbarSystemDetailPage({
  market,
  system,
  detail,
}: Readonly<{
  market: MarketCode;
  system: BusbarSystem;
  detail: BusbarSystemDetail;
}>) {
  const content = busbarCatalogContentForMarket(market);
  const systemCopy = content.systems[system.slug as BusbarSystemSlug];
  const heroFeatureImage = detail.heroImages[0];
  const relatedSlugs = RELATED_SYSTEM_SLUGS[system.slug as BusbarSystemSlug] ?? [];
  const showsDataCentreApplication = detail.applications.some(
    (application) => application.slug === "data-centres",
  );
  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbs.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products/busbar">{content.breadcrumbs.current}</Link>
        <span aria-hidden="true">/</span>
        <span>{systemCopy.name}</span>
      </div>

      <div className={styles.backNav}>
        <Link className={styles.backButton} href="/products/busbar">
          <span aria-hidden="true">←</span>
          {content.breadcrumbs.back}
        </Link>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{detail.categoryEyebrow}</p>

          <h1>{systemCopy.name}</h1>

          <p className={styles.heroDescription}>{detail.heroDescription}</p>

          {relatedSlugs.length > 0 ? (
            <p className={styles.relatedSystems}>
              {content.relatedSystemsLabel}{" "}
              {relatedSlugs.map((relatedSlug, index) => (
                <span key={relatedSlug}>
                  {index > 0 ? ", " : ""}
                  <Link href={`/products/busbar/${relatedSlug}`}>
                    {content.systems[relatedSlug].name}
                  </Link>
                </span>
              ))}
            </p>
          ) : null}

          <div className={styles.heroActions}>
            <Link
              className={styles.primaryButton}
              href={detail.requestQuoteHref}
            >
              {content.projectSupport.action}
            </Link>

            <Link
              className={styles.secondaryButton}
              href={detail.requestDocumentationHref}
            >
              {content.sidebar.technicalAction}
            </Link>
          </div>
        </div>

        {heroFeatureImage ? (
          <div className={styles.heroVisual}>
            <BusbarProductHeroVisual
              image={detail.heroFeatureImage}
              imageAlt={detail.heroFeatureImageAlt}
              priority
              slug={system.slug as BusbarSystemSlug}
            />

            {detail.heroBadge ? (
              <div aria-hidden="true" className={styles.heroBadge}>
                <span className={styles.heroBadgeRing}>
                  <strong>{detail.heroBadge}</strong>
                  <small>Protection Rating</small>
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section aria-label={systemCopy.name} className={styles.factStrip}>
        {detail.facts.map((fact) => (
          <article key={fact.label}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </article>
        ))}
      </section>

      <BusbarDetailTabs
        detail={detail}
        documentsActionLabel={content.sidebar.technicalAction}
        documentsDescription={content.sidebar.technicalDescription}
        documentsTitle={content.sidebar.technicalTitle}
        market={market}
        shortName={system.shortName}
        systemDescription={systemCopy.description}
        systemName={systemCopy.name}
      />

      <BusbarSmartAutomationSection detail={detail} />

      <BusbarApplicationsSection detail={detail} />

      {showsDataCentreApplication ? (
        <p className={styles.relatedSystems}>
          <Link href="/application-map">
            {content.dataCentreApplicationMapLabel}
          </Link>
        </p>
      ) : null}

      <section className={styles.projectSupport}>
        <div>
          <p className={styles.eyebrow}>{content.projectSupport.eyebrow}</p>
          <h2>{content.projectSupport.title}</h2>
          <p>{content.projectSupport.description}</p>
        </div>

        <Link href={detail.requestQuoteHref}>
          {content.projectSupport.action}
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}

import Link from "next/link";

import {
  busbarCatalogContentForMarket,
  type BusbarSystemSlug,
} from "@/data/products/busbar/catalog-content";
import type { BusbarSystem } from "@/data/products/busbar/types";
import type { BusbarSystemDetail } from "@/data/products/busbar/series/types";
import type { MarketCode } from "@/modules/markets/types";

import { BusbarDetailTabs } from "./busbar-detail-tabs";
import { BusbarHeroCarousel } from "./busbar-hero-carousel";
import styles from "./busbar-system-detail-page.module.css";

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

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbs.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products/busbar">{content.breadcrumbs.current}</Link>
        <span aria-hidden="true">/</span>
        <span>{systemCopy.name}</span>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{detail.categoryEyebrow}</p>

          <h1>{systemCopy.name}</h1>

          <p className={styles.heroDescription}>{detail.heroDescription}</p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href={detail.requestQuoteHref}>
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

        <div className={styles.heroVisual}>
          <BusbarHeroCarousel
            images={detail.heroImages}
            nextLabel={detail.heroNextLabel}
            previousLabel={detail.heroPreviousLabel}
          />
        </div>
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
        shortName={system.shortName}
        systemDescription={systemCopy.description}
        systemName={systemCopy.name}
      />

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

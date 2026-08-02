import Image from "next/image";
import Link from "next/link";

import { gBusContentForMarket } from "@/data/products/g-bus/content";
import type { MarketCode } from "@/modules/markets/types";

import { GBusTabs } from "./g-bus-tabs";
import styles from "./g-bus-page.module.css";

export function GBusPage({
  market,
}: Readonly<{
  market: MarketCode;
}>) {
  const content = gBusContentForMarket(market);

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbs.home}</Link>
        <span aria-hidden="true">/</span>
        <span>{content.breadcrumbs.current}</span>
      </div>

      <div className={styles.backNav}>
        <Link className={styles.backButton} href="/">
          <span aria-hidden="true">←</span>
          {content.breadcrumbs.home}
        </Link>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1>{content.hero.heading}</h1>
          <p className={styles.heroDescription}>{content.hero.description}</p>

          <Link className={styles.primaryButton} href={content.hero.actionHref}>
            {content.hero.actionLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.heroVisual}>
          <Image
            alt={content.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            src={content.hero.image}
          />
        </div>
      </section>

      <section aria-label={content.breadcrumbs.current} className={styles.factStrip}>
        {content.facts.map((fact) => (
          <article key={fact.label}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </article>
        ))}
      </section>

      <GBusTabs content={content} />

      <section
        aria-label={content.applicationsEyebrow}
        className={styles.applicationsSection}
      >
        <header className={styles.applicationsHeader}>
          <p className={styles.eyebrow}>{content.applicationsEyebrow}</p>
          <h2>{content.applicationsHeading}</h2>
          <p className={styles.applicationsDescription}>
            {content.applicationsDescription}
          </p>
        </header>

        <div className={styles.applicationsGrid}>
          {content.applications.map((application) => (
            <article className={styles.applicationCard} key={application.slug}>
              <div className={styles.applicationVisual}>
                <Image
                  alt={application.imageAlt}
                  className={styles.applicationImage}
                  fill
                  sizes="(min-width: 1100px) 19vw, (min-width: 700px) 48vw, 100vw"
                  src={application.image}
                />
              </div>

              <div className={styles.applicationContent}>
                <h3>{application.title}</h3>
                <p>{application.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.projectSupport}>
        <div>
          <p className={styles.eyebrow}>{content.projectSupport.eyebrow}</p>
          <h2>{content.projectSupport.title}</h2>
          <p>{content.projectSupport.description}</p>
        </div>

        <Link href={content.projectSupport.href}>
          {content.projectSupport.action}
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}

import Link from "next/link";

import {
  referenceSystemsForMarket,
  referencesContentForMarket,
  type ReferenceSystemKey,
} from "@/data/references";
import type { MarketCode } from "@/modules/markets/types";

import { ReferenceDirectory } from "./reference-directory";
import styles from "./references-page.module.css";

export function ReferencesPage({
  market,
  activeSystemKey,
}: Readonly<{
  market: MarketCode;
  activeSystemKey?: ReferenceSystemKey;
}>) {
  const content = referencesContentForMarket(market);
  const systems = referenceSystemsForMarket(market);
  const activeSystem = systems.find((system) => system.key === activeSystemKey) ?? systems[0];

  return (
    <main className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbHome}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{content.breadcrumbCurrent}</span>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p>{content.eyebrow}</p>
          <h1>{content.heading}</h1>
          <span>{content.introduction}</span>
        </div>
        <div aria-hidden="true" className={styles.heroGrid} />
      </section>

      <section aria-labelledby="references-by-system" className={styles.systemSection}>
        <header className={styles.sectionHeader}>
          <p>{content.selectorEyebrow}</p>
          <h2 id="references-by-system">{content.selectorHeading}</h2>
          <span>{content.selectorDescription}</span>
        </header>

        <nav aria-label={content.selectorHeading} className={styles.systemGrid}>
          {systems.map((system) => {
            const isActive = system.key === activeSystem.key;
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={isActive ? styles.systemCardActive : styles.systemCard}
                href={`/references?system=${system.key}#reference-directory`}
                key={system.key}
              >
                <span className={styles.systemNumber}>{system.number}</span>
                <strong>{system.label}</strong>
                <span className={styles.systemCount}>
                  {system.total.toLocaleString()} {content.referencePlural}
                </span>
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            );
          })}
        </nav>
      </section>

      <section className={styles.activeSystem} id="reference-directory">
        <header className={styles.activeSystemHeader}>
          <p>{activeSystem.title}</p>
          <h2>{content.referenceDirectoryLabel}</h2>
          <span>
            {activeSystem.total.toLocaleString()} {content.cataloguedCountLabel}
          </span>
          <small>
            {content.sourceLabel}: {activeSystem.source}
          </small>
          {activeSystem.tabs.length > 1 ? (
            <dl className={styles.activeSystemBreakdown}>
              {activeSystem.tabs.map((tab) => (
                <div key={tab.id}>
                  <dt>{tab.label}</dt>
                  <dd>{(tab.rows?.length ?? tab.companies?.length ?? 0).toLocaleString()}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </header>

        {activeSystem.tabs.length > 0 ? (
          <ReferenceDirectory content={content} key={activeSystem.key} market={market} system={activeSystem} />
        ) : (
          <div className={styles.noSystemData}>
            <p>{content.noDataBody}</p>
          </div>
        )}
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

import {
  referenceSectorsForMarket,
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
  const sectors = referenceSectorsForMarket(market);

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

      <section aria-labelledby="references-sectors" className={styles.sectorsSection}>
        <header className={styles.sectorsHeader}>
          <div className={styles.sectorsHeaderCopy}>
            <p>{sectors.eyebrow}</p>
            <h2 id="references-sectors">{sectors.heading}</h2>
            <span>{sectors.description}</span>
          </div>
        </header>

        <div className={styles.sectorGrid}>
          {sectors.sectors.map((sector) => {
            const hasStats = sector.referencesValue !== undefined && sector.countriesValue !== undefined;
            return (
              <a className={styles.sectorCard} href="#reference-directory" key={sector.id}>
                <span className={styles.sectorCardMedia}>
                  <Image
                    alt=""
                    aria-hidden="true"
                    className={styles.sectorCardImage}
                    fill
                    sizes="(min-width: 1100px) 20vw, (min-width: 640px) 33vw, 50vw"
                    src={sector.image}
                  />
                  <span aria-hidden="true" className={styles.sectorCardScrim} />
                  <strong className={styles.sectorCardTitle}>{sector.title}</strong>
                </span>

                {hasStats ? (
                  <dl className={styles.sectorCardStats}>
                    <div>
                      <dt>{sectors.cardReferencesLabel}</dt>
                      <dd>{sector.referencesValue}</dd>
                    </div>
                    <div>
                      <dt>{sectors.cardCountryLabel}</dt>
                      <dd>{sector.countriesValue}</dd>
                    </div>
                  </dl>
                ) : (
                  <span aria-hidden="true" className={styles.sectorCardStatsPlaceholder} />
                )}
              </a>
            );
          })}
        </div>
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

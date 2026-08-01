"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  BUSBAR_CATEGORY_OPTIONS,
  BUSBAR_SYSTEMS,
} from "@/data/products/busbar/systems";
import {
  busbarCatalogContentForMarket,
  type BusbarApplicationId,
  type BusbarSystemSlug,
} from "@/data/products/busbar/catalog-content";
import type {
  BusbarCatalogView,
  BusbarConductor,
} from "@/data/products/busbar/types";
import type { MarketCode } from "@/modules/markets/types";

import { BusbarCinematicIntro } from "./busbar-cinematic-intro";
import styles from "./busbar-catalog-page.module.css";

type CategoryFilter = BusbarCatalogView;
type ConductorFilter = "all" | BusbarConductor;
type CurrentFilter = "all" | "up-to-100" | "100-to-1000" | "above-1000";
type IpFilter = "all" | "ip55" | "ip68";

const APPLICATION_ICONS = {
  "data-centres": "/assets/icons/products/busbar/applications/data-centres.svg",
  "industrial-facilities":
    "/assets/icons/products/busbar/applications/industrial-facilities.svg",
  "warehouses-logistics":
    "/assets/icons/products/busbar/applications/warehouses-logistics.svg",
  "commercial-buildings":
    "/assets/icons/products/busbar/applications/commercial-buildings.svg",
  "transport-infrastructure":
    "/assets/icons/products/busbar/applications/transport-infrastructure.svg",
  "energy-utilities":
    "/assets/icons/products/busbar/applications/energy-utilities.svg",
} as const satisfies Readonly<Record<BusbarApplicationId, string>>;

function matchesCurrentFilter(
  currentMin: number,
  currentMax: number,
  filter: CurrentFilter,
): boolean {
  if (filter === "up-to-100") {
    return currentMin <= 100;
  }

  if (filter === "100-to-1000") {
    return currentMax >= 100 && currentMin <= 1000;
  }

  if (filter === "above-1000") {
    return currentMax > 1000;
  }

  return true;
}

function formatSystemCount(
  count: number,
  market: MarketCode,
  forms: Readonly<{
    one: string;
    few: string;
    many: string;
  }>,
): string {
  if (market === "uk") {
    return `${count} ${count === 1 ? forms.one : forms.many}`;
  }

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return `${count} ${forms.one}`;
  }

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return `${count} ${forms.few}`;
  }

  return `${count} ${forms.many}`;
}

export function BusbarCatalogPage({
  market,
}: Readonly<{
  market: MarketCode;
}>) {
  const content = busbarCatalogContentForMarket(market);
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [conductor, setConductor] = useState<ConductorFilter>("all");
  const [currentRange, setCurrentRange] = useState<CurrentFilter>("all");
  const [ipRating, setIpRating] = useState<IpFilter>("all");

  const filteredSystems = useMemo(() => {
    const selectedSystemCategory =
      category === "all" || category === "components" ? null : category;

    return BUSBAR_SYSTEMS.filter((system) => {
      const categoryMatches =
        selectedSystemCategory === null ||
        system.category === selectedSystemCategory;

      const conductorOptions =
        system.conductorOptions as readonly BusbarConductor[];

      const conductorMatches =
        conductor === "all" || conductorOptions.includes(conductor);

      const currentMatches = matchesCurrentFilter(
        system.currentMin,
        system.currentMax,
        currentRange,
      );

      const normalizedIpRating = system.ipRating.toLowerCase();

      const ipMatches =
        ipRating === "all" ||
        (ipRating === "ip55" && normalizedIpRating.includes("ip55")) ||
        (ipRating === "ip68" && normalizedIpRating.includes("ip68"));

      return categoryMatches && conductorMatches && currentMatches && ipMatches;
    });
  }, [category, conductor, currentRange, ipRating]);

  function clearFilters() {
    setCategory("all");
    setConductor("all");
    setCurrentRange("all");
    setIpRating("all");
  }

  return (
    <>
      <BusbarCinematicIntro />

      <main className={styles.page}>
        <div className={styles.breadcrumbs}>
          <Link href="/">{content.breadcrumbs.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#product-systems">{content.breadcrumbs.products}</Link>
          <span aria-hidden="true">/</span>
          <span>{content.breadcrumbs.current}</span>
        </div>

        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.manufacturerLockup}>
              <Image
                alt="Gersan"
                className={styles.gersanLogo}
                height={42}
                priority
                src="/assets/brand/gersan-logo.png"
                width={170}
              />
            </div>

            <h1>{content.hero.title}</h1>

            <p className={styles.heroDescription}>{content.hero.description}</p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="#systems">
                {content.hero.primaryAction}
              </Link>

              <Link className={styles.secondaryButton} href="/#project-support">
                {content.hero.secondaryAction}
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <video
              aria-label={content.hero.videoLabel}
              autoPlay
              className={styles.heroVideo}
              loop
              muted
              playsInline
              poster="/assets/media/products/busbar/infravolt-busbar-poster.webp"
              preload="metadata"
            >
              <source
                src="/assets/media/products/busbar/infravolt-busbar.mp4"
                type="video/mp4"
              />
            </video>

            <div className={styles.heroVideoOverlay} />
          </div>
        </section>

        <section
          aria-label={content.breadcrumbs.current}
          className={styles.factStrip}
        >
          {content.facts.map((fact) => (
            <article key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </article>
          ))}
        </section>

        <section className={styles.catalog} id="systems">
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeading}>
              <p>{content.sidebar.productGroups}</p>
            </div>

            <nav
              aria-label={content.sidebar.productGroups}
              className={styles.categoryNavigation}
            >
              {BUSBAR_CATEGORY_OPTIONS.filter(
                (option) => option.value !== "components",
              ).map((option) => {
                const optionContent = content.categories[option.value];

                return (
                  <button
                    aria-pressed={category === option.value}
                    className={
                      category === option.value
                        ? styles.categoryButtonActive
                        : styles.categoryButton
                    }
                    key={option.value}
                    onClick={() => setCategory(option.value)}
                    type="button"
                  >
                    <span>
                      <strong>{optionContent.label}</strong>
                      <small>{optionContent.description}</small>
                    </span>

                    <span aria-hidden="true">→</span>
                  </button>
                );
              })}
            </nav>

            <div className={styles.filterHeading}>
              <p>{content.sidebar.filters}</p>

              <button onClick={clearFilters} type="button">
                {content.sidebar.clearAll}
              </button>
            </div>

            <label className={styles.filterField}>
              <span>{content.sidebar.conductor}</span>

              <select
                onChange={(event) =>
                  setConductor(event.target.value as ConductorFilter)
                }
                value={conductor}
              >
                <option value="all">{content.sidebar.allConductors}</option>
                <option value="aluminium">{content.sidebar.aluminium}</option>
                <option value="copper">{content.sidebar.copper}</option>
              </select>
            </label>

            <label className={styles.filterField}>
              <span>{content.sidebar.currentRange}</span>

              <select
                onChange={(event) =>
                  setCurrentRange(event.target.value as CurrentFilter)
                }
                value={currentRange}
              >
                <option value="all">{content.sidebar.allCurrentRanges}</option>
                <option value="up-to-100">{content.sidebar.upTo100}</option>
                <option value="100-to-1000">
                  {content.sidebar.from100To1000}
                </option>
                <option value="above-1000">{content.sidebar.above1000}</option>
              </select>
            </label>

            <label className={styles.filterField}>
              <span>{content.sidebar.ipRating}</span>

              <select
                onChange={(event) =>
                  setIpRating(event.target.value as IpFilter)
                }
                value={ipRating}
              >
                <option value="all">{content.sidebar.allIpRatings}</option>
                <option value="ip55">{content.sidebar.includesIp55}</option>
                <option value="ip68">{content.sidebar.includesIp68}</option>
              </select>
            </label>

            <div className={styles.technicalPack}>
              <p>{content.sidebar.technicalTitle}</p>

              <span>{content.sidebar.technicalDescription}</span>

              <Link href="/#technical-documents">
                {content.sidebar.technicalAction}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>

          <div className={styles.results}>
            <div className={styles.resultsHeading}>
              <div>
                <p className={styles.eyebrow}>{content.results.eyebrow}</p>
                <h2>{content.results.title}</h2>
              </div>

              <p>
                {formatSystemCount(filteredSystems.length, market, {
                  one: content.results.countOne,
                  few: content.results.countFew,
                  many: content.results.countMany,
                })}
              </p>
            </div>

            {filteredSystems.length > 0 ? (
              <div className={styles.grid}>
                {filteredSystems.map((system) => {
                  const localizedSystem =
                    content.systems[system.slug as BusbarSystemSlug];

                  return (
                    <article className={styles.card} key={system.slug}>
                      <Link
                        aria-label={`${content.results.viewSystem}: ${localizedSystem.name}`}
                        className={styles.cardImage}
                        href={`/products/busbar/${system.slug}`}
                      >
                        <Image
                          alt={localizedSystem.imageAlt}
                          className={styles.cardProductImage}
                          fill
                          priority={system.featured}
                          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 100vw"
                          src={system.image}
                        />
                      </Link>

                      <div className={styles.cardContent}>
                        <div className={styles.cardMeta}>
                          <span>{system.shortName}</span>
                          <span>{system.ipRating}</span>
                        </div>

                        <h3>
                          <Link href={`/products/busbar/${system.slug}`}>
                            {localizedSystem.name}
                          </Link>
                        </h3>

                        <p className={styles.currentRange}>
                          {system.currentLabel}
                        </p>

                        <p className={styles.cardDescription}>
                          {localizedSystem.description}
                        </p>

                        <div className={styles.cardFooter}>
                          <span>{localizedSystem.conductorLabel}</span>

                          <Link href={`/products/busbar/${system.slug}`}>
                            {content.results.viewSystem}
                            <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h3>{content.results.emptyTitle}</h3>
                <p>{content.results.emptyDescription}</p>

                <button onClick={clearFilters} type="button">
                  {content.results.clearFilters}
                </button>
              </div>
            )}

            {category === "all" ? (
              <section
                aria-labelledby="busbar-applications-title"
                className={styles.applicationsSection}
                id="applications"
              >
                <div className={styles.applicationsHeading}>
                  <div>
                    <p className={styles.eyebrow}>
                      {content.applications.eyebrow}
                    </p>

                    <h2 id="busbar-applications-title">
                      {content.applications.title}
                    </h2>
                  </div>

                  <p>{content.applications.introduction}</p>
                </div>

                <div className={styles.applicationsGrid}>
                  {content.applications.items.map((application) => (
                    <article
                      className={styles.applicationCard}
                      key={application.id}
                    >
                      <div className={styles.applicationIcon}>
                        <Image
                          alt=""
                          aria-hidden="true"
                          className={styles.applicationIconImage}
                          height={52}
                          src={APPLICATION_ICONS[application.id]}
                          width={52}
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
            ) : null}
          </div>
        </section>

        <section className={styles.projectSupport}>
          <div>
            <div className={styles.supportBrandRow}>
              <div className={styles.supportBrand}>
                <Image
                  alt="InfraVolt"
                  className={styles.infravoltWordmark}
                  height={30}
                  src="/assets/brand/infravolt-wordmark-primary.webp"
                  width={154}
                />
              </div>

              <p className={styles.eyebrow}>{content.projectSupport.eyebrow}</p>
            </div>

            <h2>{content.projectSupport.title}</h2>

            <p>{content.projectSupport.description}</p>
          </div>

          <Link href="/#project-support">
            {content.projectSupport.action}
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
    </>
  );
}

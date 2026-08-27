"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { resolveOwnerCountry, resolveReferenceLocation } from "@/modules/references/geography";
import { transliterateTurkish } from "@/modules/references/english-display";
import type {
  ReferenceCompany,
  ReferenceGeography,
  ReferenceSystem,
  ReferenceTab,
  ReferenceTableRow,
  ReferencesUiContent,
} from "@/data/references";
import type { MarketCode } from "@/modules/markets/types";
import { publicMediaUrl } from "@/modules/storage/asset-url";

import styles from "./references-page.module.css";

const PAGE_SIZE = 30;

const DIACRITIC_PATTERN = new RegExp("[\\u0300-\\u036f]", "g");

function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(DIACRITIC_PATTERN, "")
    .toLocaleLowerCase();
}

function compare(a: string, b: string, locale: string) {
  return a.localeCompare(b, locale, { numeric: true, sensitivity: "base" });
}

function resultLabel(count: number, singular: string, plural: string) {
  return `${count.toLocaleString()} ${count === 1 ? singular : plural}`;
}

function resolveReferenceCompanyLogo(logo: string | undefined): string | undefined {
  if (!logo || /^https?:\/\//iu.test(logo)) return logo;
  return logo.startsWith("/assets/") ? publicMediaUrl(logo.slice("/assets/".length)) : logo;
}

/** Resolves a geography display label from a cell's raw value, matching the tab's declared geography kind.
 * UA: the cell value passed in here is already the Ukrainian-localised display text produced by
 * referenceSystemsForMarket's locationDisplay() at data-build time, so it's returned as-is — re-resolving
 * it through the (Latin-keyed) alias tables below would never match Ukrainian text. */
function resolveGeoDisplay(raw: string, geography: ReferenceGeography, market: MarketCode): string | undefined {
  if (market === "ua") return raw;
  if (geography === "country") {
    const country = resolveOwnerCountry(raw);
    return country && market === "uk" ? transliterateTurkish(country).replace(/\bTurkiye\b/gu, "Turkey") : country;
  }
  const resolved = resolveReferenceLocation(raw);
  if (resolved.kind !== "turkiye") return undefined;
  return market === "uk" ? transliterateTurkish(resolved.display) : resolved.display;
}

function EmptyState({ content, onClear }: Readonly<{ content: ReferencesUiContent; onClear: () => void }>) {
  return (
    <div className={styles.emptyState}>
      <p className={styles.emptyStateTitle}>{content.noResultsTitle}</p>
      <p className={styles.emptyStateBody}>{content.noResultsBody}</p>
      <button onClick={onClear} type="button">
        {content.clearFiltersLabel}
      </button>
    </div>
  );
}

/** Shown when a tab genuinely has zero source records — distinct from a search/filter matching nothing. */
function NoDataState({ content }: Readonly<{ content: ReferencesUiContent }>) {
  return (
    <div className={styles.noSystemData}>
      <p>{content.noDataBody}</p>
    </div>
  );
}

function DirectoryToolbar({
  content,
  query,
  onQueryChange,
  searchCompanies,
  geoOptions,
  geoLabel,
  allGeoLabel,
  geoValue,
  onGeoChange,
  resultCount,
  resultSingular,
  resultPlural,
}: Readonly<{
  content: ReferencesUiContent;
  query: string;
  onQueryChange: (value: string) => void;
  searchCompanies: boolean;
  geoOptions: readonly { value: string; label: string }[];
  geoLabel: string | null;
  allGeoLabel: string;
  geoValue: string;
  onGeoChange: (value: string) => void;
  resultCount: number;
  resultSingular: string;
  resultPlural: string;
}>) {
  return (
    <div className={styles.toolbar}>
      <label className={styles.searchField} htmlFor="reference-search">
        <span>{searchCompanies ? content.searchCompaniesLabel : content.searchLabel}</span>
        <div className={styles.searchControl}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
          </svg>
          <input
            autoComplete="off"
            id="reference-search"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={searchCompanies ? content.searchCompaniesPlaceholder : content.searchPlaceholder}
            type="search"
            value={query}
          />
          {query ? (
            <button onClick={() => onQueryChange("")} type="button">
              {content.clearSearch}
            </button>
          ) : null}
        </div>
      </label>

      {geoLabel ? (
        <label className={styles.filterField}>
          <span>{geoLabel}</span>
          <select onChange={(event) => onGeoChange(event.target.value)} value={geoValue}>
            <option value="all">{allGeoLabel}</option>
            {geoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <p aria-live="polite" className={styles.resultCount}>
        {resultLabel(resultCount, resultSingular, resultPlural)}
      </p>
    </div>
  );
}

function geoCopy(content: ReferencesUiContent, geography: ReferenceGeography | undefined) {
  if (geography === "country") {
    return { label: content.countryLabel, allLabel: content.allCountriesLabel };
  }
  if (geography === "city-region") {
    return { label: content.cityRegionLabel, allLabel: content.allCitiesRegionsLabel };
  }
  return { label: null, allLabel: "" };
}

function ReferenceTable({
  content,
  tab,
  market,
}: Readonly<{
  content: ReferencesUiContent;
  tab: ReferenceTab;
  market: MarketCode;
}>) {
  const locale = market === "ua" ? "uk" : "en";
  const [query, setQuery] = useState("");
  const [geoValue, setGeoValue] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const geoColumnKey = tab.geographyColumnKey ?? "location";
  const geoColumnIndex = tab.columns?.findIndex((column) => column.key === geoColumnKey) ?? -1;
  const hasGeography = Boolean(tab.geography) && geoColumnIndex >= 0;
  const { label: geoLabel, allLabel: allGeoLabel } = geoCopy(content, tab.geography);

  const geoOptions = useMemo(() => {
    if (!hasGeography || !tab.geography) return [];
    const geography = tab.geography;
    const seen = new Map<string, string>();
    for (const row of tab.rows ?? []) {
      const raw = row.cells[geoColumnIndex]?.trim();
      if (!raw) continue;
      const display = resolveGeoDisplay(raw, geography, market);
      if (!display) continue;
      const key = normalise(display);
      if (!seen.has(key)) seen.set(key, display);
    }
    return [...seen.values()].sort((a, b) => compare(a, b, locale)).map((label) => ({ value: label, label }));
  }, [geoColumnIndex, hasGeography, locale, market, tab.geography, tab.rows]);

  function resetPaging() {
    setVisibleCount(PAGE_SIZE);
  }

  function changeQuery(value: string) {
    setQuery(value);
    resetPaging();
  }

  function changeGeo(value: string) {
    setGeoValue(value);
    resetPaging();
  }

  function clearFilters() {
    setQuery("");
    setGeoValue("all");
    resetPaging();
  }

  const filteredRows = useMemo(() => {
    const term = normalise(query.trim());
    let rows = tab.rows ?? [];
    if (term) {
      rows = rows.filter((row) => normalise(row.cells.join(" ")).includes(term));
    }
    if (hasGeography && tab.geography && geoValue !== "all") {
      const geography = tab.geography;
      rows = rows.filter((row) => {
        const raw = row.cells[geoColumnIndex]?.trim();
        return raw ? resolveGeoDisplay(raw, geography, market) === geoValue : false;
      });
    }
    const sorted = [...rows];
    sorted.sort((a: ReferenceTableRow, b: ReferenceTableRow) => compare(a.cells[0] ?? "", b.cells[0] ?? "", locale));
    return sorted;
  }, [geoColumnIndex, geoValue, hasGeography, locale, market, query, tab.geography, tab.rows]);

  const rows = filteredRows.slice(0, visibleCount);

  if ((tab.rows ?? []).length === 0) {
    return <NoDataState content={content} />;
  }

  return (
    <>
      <DirectoryToolbar
        allGeoLabel={allGeoLabel}
        content={content}
        geoLabel={geoLabel}
        geoOptions={geoOptions}
        geoValue={geoValue}
        onGeoChange={changeGeo}
        onQueryChange={changeQuery}
        query={query}
        resultCount={filteredRows.length}
        resultPlural={content.referencePlural}
        resultSingular={content.referenceSingular}
        searchCompanies={false}
      />
      {rows.length ? (
        <div className={styles.tableFrame}>
          <table>
            <caption className={styles.srOnly}>{tab.heading}</caption>
            <thead>
              <tr>
                {tab.columns?.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {row.cells.map((cell, index) => (
                    <td data-label={tab.columns?.[index]?.label} key={`${row.id}-${index}`}>
                      {cell || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState content={content} onClear={clearFilters} />
      )}
      <LoadMore
        content={content}
        onLoadMore={() => setVisibleCount((count) => count + PAGE_SIZE)}
        shown={rows.length}
        total={filteredRows.length}
      />
    </>
  );
}

function LogoGrid({
  companies,
  content,
  market,
}: Readonly<{
  companies: readonly ReferenceCompany[];
  content: ReferencesUiContent;
  market: MarketCode;
}>) {
  const locale = market === "ua" ? "uk" : "en";
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  function resetPaging() {
    setVisibleCount(PAGE_SIZE);
  }

  function changeQuery(value: string) {
    setQuery(value);
    resetPaging();
  }

  function clearFilters() {
    setQuery("");
    resetPaging();
  }

  const filteredCompanies = useMemo(() => {
    const term = normalise(query.trim());
    let list = companies;
    if (term) {
      list = list.filter((company) => normalise(`${company.name} ${company.logoIdentity ?? ""}`).includes(term));
    }
    const sorted = [...list];
    sorted.sort((a, b) => {
      const an = a.name.trim();
      const bn = b.name.trim();
      if (!an && !bn) return 0;
      if (!an) return 1;
      if (!bn) return -1;
      return compare(an, bn, locale);
    });
    return sorted;
  }, [companies, locale, query]);

  const visibleCompanies = filteredCompanies.slice(0, visibleCount);

  return (
    <>
      <DirectoryToolbar
        allGeoLabel=""
        content={content}
        geoLabel={null}
        geoOptions={[]}
        geoValue=""
        onGeoChange={() => undefined}
        onQueryChange={changeQuery}
        query={query}
        resultCount={filteredCompanies.length}
        resultPlural={content.companyPlural}
        resultSingular={content.companySingular}
        searchCompanies
      />
      {visibleCompanies.length ? (
        <ul className={styles.logoGrid}>
          {visibleCompanies.map((company, index) => {
            const accessibleName = company.name || `${content.catalogueMark} ${index + 1}`;
            const logo = resolveReferenceCompanyLogo(company.logo);
            return (
              <li className={styles.logoCard} key={company.id}>
                {logo ? (
                  <div className={styles.logoImage}>
                    <Image
                      alt={accessibleName}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1200px) 18vw, (min-width: 760px) 25vw, 46vw"
                      src={logo}
                    />
                  </div>
                ) : null}
                {company.name ? <span>{company.name}</span> : <span className={styles.srOnly}>{accessibleName}</span>}
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState content={content} onClear={clearFilters} />
      )}
      <LoadMore
        content={content}
        onLoadMore={() => setVisibleCount((count) => count + PAGE_SIZE)}
        shown={visibleCompanies.length}
        total={filteredCompanies.length}
      />
    </>
  );
}

function LoadMore({
  content,
  shown,
  total,
  onLoadMore,
}: Readonly<{
  content: ReferencesUiContent;
  shown: number;
  total: number;
  onLoadMore: () => void;
}>) {
  if (!total) return null;

  return (
    <div className={styles.loadMoreRow}>
      <p>
        {content.showingLabel} {shown.toLocaleString()} / {total.toLocaleString()}
      </p>
      {shown < total ? (
        <button onClick={onLoadMore} type="button">
          {content.loadMore}
          <span aria-hidden="true">+</span>
        </button>
      ) : null}
    </div>
  );
}

export function ReferenceDirectory({
  content,
  system,
  market,
}: Readonly<{
  content: ReferencesUiContent;
  system: ReferenceSystem;
  market: MarketCode;
}>) {
  const tabIdPrefix = useId();
  const subTabsRef = useRef<HTMLDivElement>(null);
  const [activeTabId, setActiveTabId] = useState(
    system.tabs.find((tab) => tab.id === "worldwide-companies")?.id ?? system.tabs[0]?.id,
  );
  const activeTab = system.tabs.find((tab) => tab.id === activeTabId) ?? system.tabs[0];

  useEffect(() => {
    const tabList = subTabsRef.current;
    const selectedTab = tabList?.querySelector<HTMLElement>('[aria-pressed="true"]');

    if (!tabList || !selectedTab || tabList.scrollWidth <= tabList.clientWidth) return;

    const listBounds = tabList.getBoundingClientRect();
    const tabBounds = selectedTab.getBoundingClientRect();
    const isOutsideVisibleArea = tabBounds.left < listBounds.left || tabBounds.right > listBounds.right;

    if (isOutsideVisibleArea) {
      tabList.scrollTo({
        behavior: "smooth",
        left: Math.max(0, tabList.scrollLeft + tabBounds.left - listBounds.left - 8),
      });
    }
  }, [activeTabId, system.key]);

  if (!activeTab) return null;

  return (
    <div className={styles.directory}>
      {system.tabs.length > 1 ? (
        <div aria-label={system.title} className={styles.subTabs} ref={subTabsRef}>
          {system.tabs.map((tab) => (
            <button
              aria-controls={`${tabIdPrefix}-${tab.id}-panel`}
              aria-pressed={tab.id === activeTab.id}
              id={`${tabIdPrefix}-${tab.id}-tab`}
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : null}

      <section
        aria-labelledby={`${tabIdPrefix}-${activeTab.id}-heading`}
        id={`${tabIdPrefix}-${activeTab.id}-panel`}
        key={activeTab.id}
      >
        <header className={styles.directoryHeader}>
          <p>{activeTab.kind === "logos" ? content.logoDirectoryLabel : content.referenceDirectoryLabel}</p>
          <h3 id={`${tabIdPrefix}-${activeTab.id}-heading`}>{activeTab.heading}</h3>
          <span>{activeTab.description}</span>
        </header>

        {activeTab.kind === "table" ? (
          <ReferenceTable content={content} market={market} tab={activeTab} />
        ) : (
          <LogoGrid companies={activeTab.companies ?? []} content={content} market={market} />
        )}
      </section>
    </div>
  );
}

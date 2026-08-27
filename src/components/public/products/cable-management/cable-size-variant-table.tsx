"use client";

import { useMemo, useState } from "react";

import type { CableManagementLabels, CableSizeVariant } from "@/data/products/cable-management/types";

import { downloadCsv } from "./cable-variant-csv";
import { IconClose, IconDownload, IconFilter, IconSearch } from "./cable-icons";
import styles from "./cable-management-page.module.css";

function toCsvField(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function buildSizeVariantCsv(variants: readonly CableSizeVariant[]): string {
  const lines = [
    [toCsvField("Model"), toCsvField("Type"), toCsvField("Clamping Range"), toCsvField("Key Dimensions (mm)"), toCsvField("Material")].join(","),
    ...variants.map((v) =>
      [toCsvField(v.model), toCsvField(v.type), toCsvField(v.range), toCsvField(v.dimensions), toCsvField(v.material)].join(","),
    ),
  ];

  return lines.join("\r\n");
}

// A different, simpler table for a family whose catalogue rows are real,
// verified size variants that were never assigned an order/stock code (see
// aluminium-cable-cleats-sizes.ts) — rendered in place of
// CableFamilyVariantTable in the schedule section. No copy/enquiry actions
// (there is no code to copy or quote against) and no width/height/thickness
// filters (this family's sizing is a clamping range, not those fields).
// Mirrors CableFamilyVariantTable's mobile collapse behaviour (filter panel
// + results both start collapsed on mobile, expanded unconditionally on
// desktop via the shared *MobileOpen/*MobileClosed CSS classes).
export function CableSizeVariantTable({
  familySlug,
  variants,
  labels,
}: Readonly<{
  familySlug: string;
  variants: readonly CableSizeVariant[];
  labels: CableManagementLabels;
}>) {
  const [query, setQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState<ReadonlySet<string>>(() => new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [typeGroupOpen, setTypeGroupOpen] = useState(true);

  const types = useMemo(() => {
    const set = new Set<string>();
    for (const variant of variants) set.add(variant.type);
    return Array.from(set).sort();
  }, [variants]);

  const normalizedQuery = query.trim().toLowerCase();
  const isFiltering = normalizedQuery !== "" || activeTypes.size > 0;

  const filtered = variants.filter((variant) => {
    const haystack = `${variant.model} ${variant.type} ${variant.range} ${variant.dimensions} ${variant.material}`.toLowerCase();
    return (
      (normalizedQuery === "" || haystack.includes(normalizedQuery)) &&
      (activeTypes.size === 0 || activeTypes.has(variant.type))
    );
  });

  function toggleType(type: string) {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  function clearAll() {
    setQuery("");
    setActiveTypes(new Set());
  }

  function handleDownload() {
    downloadCsv(`${familySlug}-size-variants.csv`, buildSizeVariantCsv(filtered));
  }

  const chips: Array<Readonly<{ key: string; label: string; onRemove: () => void }>> = [];
  if (normalizedQuery !== "") {
    chips.push({ key: "query", label: query, onRemove: () => setQuery("") });
  }
  for (const type of activeTypes) {
    chips.push({ key: `type-${type}`, label: type, onRemove: () => toggleType(type) });
  }

  return (
    <div>
      <button
        aria-expanded={filtersOpen}
        className={styles.mobileFilterToggle}
        onClick={() => setFiltersOpen((open) => !open)}
        type="button"
      >
        <IconFilter aria-hidden="true" className={styles.mobileFilterToggleIcon} />
        Filter & Search
        {isFiltering ? <span className={styles.mobileFilterBadge}>{filtered.length}</span> : null}
      </button>

      <div className={styles.scheduleLayout}>
        <div className={filtersOpen ? styles.filterPanelMobileOpen : styles.filterPanelMobileClosed}>
          <div className={styles.filterPanel}>
            <div className={styles.filterPanelHeader}>
              <h2 className={styles.filterPanelTitle}>Filter & Search</h2>
              <button className={styles.clearAllButton} disabled={!isFiltering} onClick={clearAll} type="button">
                Clear All
              </button>
            </div>

            <div className={styles.searchField}>
              <IconSearch aria-hidden="true" className={styles.searchIcon} />
              <input
                aria-label={labels.searchLabel}
                className={styles.searchInput}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={labels.searchPlaceholder}
                type="text"
                value={query}
              />
            </div>

            {types.length > 1 ? (
              <details
                className={styles.filterGroup}
                onToggle={(event) => setTypeGroupOpen(event.currentTarget.open)}
                open={typeGroupOpen}
              >
                <summary className={styles.filterGroupSummary}>
                  <span className={styles.filterGroupLabel}>Type</span>
                  {activeTypes.size > 0 ? (
                    <span className={styles.filterGroupCount}>{activeTypes.size}</span>
                  ) : null}
                  <span aria-hidden="true" className={styles.filterGroupChevron} />
                </summary>
                <div className={styles.filterCheckList}>
                  {types.map((type) => (
                    <label className={styles.filterCheckOption} key={type}>
                      <input checked={activeTypes.has(type)} onChange={() => toggleType(type)} type="checkbox" />
                      <span className={styles.filterCheckValue}>{type}</span>
                    </label>
                  ))}
                </div>
              </details>
            ) : null}

            <button className={styles.applyFiltersButton} onClick={() => setFiltersOpen(false)} type="button">
              Apply Filters
            </button>
          </div>
        </div>

        <div className={styles.scheduleResults}>
          <div className={styles.scheduleToolbar}>
            <p aria-live="polite" className={styles.resultsLine}>
              {isFiltering
                ? `${labels.showingLabel} ${filtered.length} ${labels.ofLabel} ${variants.length} ${labels.sizeVariantCountSuffix}`
                : `${variants.length} ${labels.sizeVariantCountSuffix}`}
            </p>

            <div className={styles.csvActions}>
              <button
                aria-label={`${labels.downloadCsvAction} (${filtered.length} ${labels.sizeVariantCountSuffix})`}
                className={styles.csvButton}
                disabled={filtered.length === 0}
                onClick={handleDownload}
                type="button"
              >
                <IconDownload aria-hidden="true" className={styles.csvButtonIcon} />
                {labels.downloadCsvAction}
              </button>
            </div>
          </div>

          {chips.length > 0 ? (
            <div className={styles.mobileFilterChips}>
              {chips.map((chip) => (
                <button
                  aria-label={`${labels.removeFilterAction}: ${chip.label}`}
                  className={styles.filterChip}
                  key={chip.key}
                  onClick={chip.onRemove}
                  type="button"
                >
                  {chip.label}
                  <IconClose aria-hidden="true" className={styles.filterChipIcon} />
                </button>
              ))}
            </div>
          ) : null}

          {filtered.length === 0 ? (
            <p className={styles.scheduleEmpty}>{labels.noResults}</p>
          ) : (
            <>
              <button
                aria-expanded={resultsOpen}
                className={styles.mobileResultsToggle}
                onClick={() => setResultsOpen((open) => !open)}
                type="button"
              >
                {resultsOpen
                  ? `${labels.mobileHideResultsPrefix} ${labels.mobileSizeVariantsLabel}`
                  : `${isFiltering ? labels.mobileViewFilteredResultsPrefix : labels.mobileViewAllResultsPrefix} ${filtered.length} ${labels.mobileSizeVariantsLabel}`}
                <span aria-hidden="true" className={styles.mobileResultsToggleArrow}>
                  {resultsOpen ? "↑" : "↓"}
                </span>
              </button>

              <div className={resultsOpen ? styles.resultsMobileOpen : styles.resultsMobileClosed}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th scope="col">{labels.columnModel}</th>
                        <th scope="col">Type</th>
                        <th scope="col">Clamping Range</th>
                        <th scope="col">Key Dimensions (mm)</th>
                        <th scope="col">{labels.columnMaterial}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((variant) => (
                        <tr key={`${variant.model}-${variant.type}-${variant.range}`}>
                          <td data-label={labels.columnModel}>
                            <strong>{variant.model}</strong>
                          </td>
                          <td data-label="Type">{variant.type}</td>
                          <td data-label="Clamping Range">{variant.range}</td>
                          <td data-label="Key Dimensions (mm)">{variant.dimensions}</td>
                          <td data-label={labels.columnMaterial}>{variant.material}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

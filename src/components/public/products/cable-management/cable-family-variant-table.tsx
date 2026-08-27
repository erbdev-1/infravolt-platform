"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import {
  EnquiryAddedConfirmation,
  EnquiryToolbarSummary,
} from "@/components/public/enquiry/enquiry-feedback";
import type {
  CableManagementLabels,
  CableManagementScheduleColumnLabels,
  CableManagementVariant,
} from "@/data/products/cable-management/types";
import { addEnquiryItem, removeEnquiryItem, useEnquiryItems } from "@/modules/enquiry/store";
import { cableEnquiryItem } from "@/modules/enquiry/item-builders";
import type { MarketCode } from "@/modules/markets/types";

import { buildVariantCsv, downloadCsv } from "./cable-variant-csv";
import { IconCheck, IconClose, IconCopy, IconDownload, IconFilter, IconSearch } from "./cable-icons";
import styles from "./cable-management-page.module.css";

const PAGE_SIZE = 50;

function buildHaystack(variant: CableManagementVariant): string {
  return [
    variant.name,
    variant.model,
    variant.stockCode,
    variant.material,
    variant.accessoryGroup,
    variant.family,
    variant.productType,
    variant.widthMm,
    variant.heightMm,
    variant.thicknessMm,
    variant.lengthMm,
    variant.weight,
  ]
    .filter((part): part is string | number => part !== undefined)
    .join(" ")
    .toLowerCase();
}

function toggleInSet<T>(set: ReadonlySet<T>, value: T): ReadonlySet<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

const UA_PRODUCT_TYPE_LABELS: Readonly<Record<string, string>> = {
  Tray: "Лоток",
  "Jointing Piece": "З'єднувальний елемент",
  "Support Console": "Опорна консоль",
};

function productTypeLabel(productType: string, market: MarketCode): string {
  if (market !== "ua") return productType;
  return UA_PRODUCT_TYPE_LABELS[productType] ?? productType;
}

type CableFamilyVariantTableProps = Readonly<{
  familySlug: string;
  familyName: string;
  market: MarketCode;
  sourceRoute: string;
  variants: readonly CableManagementVariant[];
  labels: CableManagementLabels;
  /** Set by "View order codes" on an accessory card — pre-fills the search
   * with that accessory group's own text (e.g. "Flat Bend") rather than
   * requiring a second, separate filter mechanism. */
  initialQuery?: string;
  /** Set by the Heavy Duty Cable Trays template — every dataset it swaps
   * between has a single material, so the filter group would always be a
   * single, permanently-checked non-choice; still computed from real data
   * (never assumed), just not rendered. */
  hideMaterialFilter?: boolean;
  /** Compact Product Variant pills (built by CableVariantFamilyTemplate,
   * which owns the active-tab state) rendered as the first group in the
   * sidebar, above Search — variant-switcher family pages only. Absent on
   * the standalone single-family pages, which have no variant to pick. */
  variantSelector?: ReactNode;
  columnLabels?: CableManagementScheduleColumnLabels;
}>;

// On variant-switcher family pages the edge height is usually already
// chosen one level up via the tab bar, so this only renders (heights.length
// > 1) for families whose own schedule genuinely mixes multiple heights in
// one table — e.g. the Cable Ladders series, which are not tab-switched.
export function CableFamilyVariantTable({
  familySlug,
  familyName,
  market,
  sourceRoute,
  variants,
  labels,
  initialQuery,
  hideMaterialFilter,
  variantSelector,
  columnLabels,
}: CableFamilyVariantTableProps) {
  const enriched = useMemo(
    () => variants.map((variant) => ({ variant, haystack: buildHaystack(variant) })),
    [variants],
  );

  const materials = useMemo(() => {
    const set = new Set<string>();
    for (const variant of variants) set.add(variant.material);
    return Array.from(set).sort();
  }, [variants]);

  const families = useMemo(() => {
    const set = new Set<string>();
    for (const variant of variants) {
      if (variant.family) set.add(variant.family);
    }
    return Array.from(set).sort();
  }, [variants]);

  const productTypes = useMemo(() => {
    const set = new Set<string>();
    for (const variant of variants) {
      if (variant.productType) set.add(variant.productType);
    }
    const order: Readonly<Record<string, number>> = { Tray: 0, "Jointing Piece": 1, "Support Console": 2 };
    return Array.from(set).sort((a, b) => (order[a] ?? 99) - (order[b] ?? 99));
  }, [variants]);

  const widths = useMemo(() => {
    const set = new Set<number>();
    for (const variant of variants) {
      if (variant.widthMm !== undefined) set.add(variant.widthMm);
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [variants]);

  const heights = useMemo(() => {
    const set = new Set<number>();
    for (const variant of variants) {
      if (variant.heightMm !== undefined) set.add(variant.heightMm);
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [variants]);

  const thicknesses = useMemo(() => {
    const set = new Set<number>();
    for (const variant of variants) {
      if (variant.thicknessMm !== undefined) set.add(variant.thicknessMm);
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [variants]);

  const [query, setQuery] = useState(initialQuery ?? "");
  const [activeMaterials, setActiveMaterials] = useState<ReadonlySet<string>>(() => new Set());
  const [activeFamilies, setActiveFamilies] = useState<ReadonlySet<string>>(() => new Set());
  const [activeProductTypes, setActiveProductTypes] = useState<ReadonlySet<string>>(() => new Set());
  const [activeWidths, setActiveWidths] = useState<ReadonlySet<number>>(() => new Set());
  const [activeHeights, setActiveHeights] = useState<ReadonlySet<number>>(() => new Set());
  const [activeThicknesses, setActiveThicknesses] = useState<ReadonlySet<number>>(() => new Set());
  const [page, setPage] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Readonly<{ id: string; title: string }> | null>(null);
  const [expandedRows, setExpandedRows] = useState<ReadonlySet<string>>(() => new Set());

  // Compact filter accordion — only the first group that actually renders
  // starts open, the rest are collapsed, so the sidebar doesn't grow tall
  // just because a family happens to have many filterable fields. Order
  // matches the group render order below. Tracked in state (not a static
  // `open={}` literal) because React reconciles the `open` prop on every
  // render — an uncontrolled literal would snap a user-opened group shut
  // the instant any other filter/search state changes.
  const firstOpenGroupKey = useMemo(() => {
    if (families.length > 1) return "family";
    if (productTypes.length > 1) return "type";
    if (!hideMaterialFilter && materials.length > 1) return "material";
    if (widths.length > 1) return "width";
    if (heights.length > 1) return "height";
    if (thicknesses.length > 1) return "thickness";
    return null;
  }, [families, productTypes, hideMaterialFilter, materials, widths, heights, thicknesses]);
  const [openGroups, setOpenGroups] = useState<ReadonlySet<string>>(
    () => new Set(firstOpenGroupKey ? [firstOpenGroupKey] : []),
  );

  function toggleRowSpecs(rowKey: string) {
    setExpandedRows((prev) => toggleInSet(prev, rowKey));
  }

  function setGroupOpen(key: string, isOpen: boolean) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (isOpen) next.add(key);
      else next.delete(key);
      return next;
    });
  }
  const enquiryItems = useEnquiryItems();
  const enquiryItemIds = useMemo(() => new Set(enquiryItems.map((item) => item.id)), [enquiryItems]);
  const hasCurrentPageEnquiryItem = enquiryItems.some(
    (item) => item.system === "cable-management" && item.sourceRoute === sourceRoute,
  );
  // Mobile-only: both start collapsed so a long schedule never dumps a full
  // filter panel + 50-100 rows onto the page on load. Neither state has any
  // effect on desktop — filterPanelMobileOpen/Closed and
  // resultsMobileOpen/Closed are `display: contents` above the mobile
  // breakpoint (see cable-management-page.module.css), so desktop always
  // renders the panel and results expanded regardless of these values.
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const isFiltering =
    normalizedQuery !== "" ||
    activeMaterials.size > 0 ||
    activeFamilies.size > 0 ||
    activeProductTypes.size > 0 ||
    activeWidths.size > 0 ||
    activeHeights.size > 0 ||
    activeThicknesses.size > 0;

  const searchOnly =
    normalizedQuery === "" ? enriched : enriched.filter(({ haystack }) => haystack.includes(normalizedQuery));

  const materialCounts = new Map<string, number>();
  const familyCounts = new Map<string, number>();
  const productTypeCounts = new Map<string, number>();
  const widthCounts = new Map<number, number>();
  const heightCounts = new Map<number, number>();
  const thicknessCounts = new Map<number, number>();
  for (const { variant } of searchOnly) {
    materialCounts.set(variant.material, (materialCounts.get(variant.material) ?? 0) + 1);
    if (variant.family) familyCounts.set(variant.family, (familyCounts.get(variant.family) ?? 0) + 1);
    if (variant.productType) {
      productTypeCounts.set(variant.productType, (productTypeCounts.get(variant.productType) ?? 0) + 1);
    }
    if (variant.widthMm !== undefined) {
      widthCounts.set(variant.widthMm, (widthCounts.get(variant.widthMm) ?? 0) + 1);
    }
    if (variant.heightMm !== undefined) {
      heightCounts.set(variant.heightMm, (heightCounts.get(variant.heightMm) ?? 0) + 1);
    }
    if (variant.thicknessMm !== undefined) {
      thicknessCounts.set(variant.thicknessMm, (thicknessCounts.get(variant.thicknessMm) ?? 0) + 1);
    }
  }

  const filtered = enriched.filter(
    ({ variant, haystack }) =>
      (normalizedQuery === "" || haystack.includes(normalizedQuery)) &&
      (activeMaterials.size === 0 || activeMaterials.has(variant.material)) &&
      (activeFamilies.size === 0 || (variant.family !== undefined && activeFamilies.has(variant.family))) &&
      (activeProductTypes.size === 0 ||
        (variant.productType !== undefined && activeProductTypes.has(variant.productType))) &&
      (activeWidths.size === 0 || (variant.widthMm !== undefined && activeWidths.has(variant.widthMm))) &&
      (activeHeights.size === 0 || (variant.heightMm !== undefined && activeHeights.has(variant.heightMm))) &&
      (activeThicknesses.size === 0 ||
        (variant.thicknessMm !== undefined && activeThicknesses.has(variant.thicknessMm))),
  );

  // Mobile-only active-filter chips (see .mobileFilterChips) — lets a user
  // see and remove one filter at a time without reopening the whole panel.
  const chips: Array<Readonly<{ key: string; label: string; onRemove: () => void }>> = [];
  if (normalizedQuery !== "") {
    chips.push({ key: "query", label: query, onRemove: () => updateFilterState(() => setQuery("")) });
  }
  for (const material of activeMaterials) {
    chips.push({
      key: `material-${material}`,
      label: material,
      onRemove: () => updateFilterState(() => setActiveMaterials((prev) => toggleInSet(prev, material))),
    });
  }
  for (const family of activeFamilies) {
    chips.push({
      key: `family-${family}`,
      label: family,
      onRemove: () => updateFilterState(() => setActiveFamilies((prev) => toggleInSet(prev, family))),
    });
  }
  for (const productType of activeProductTypes) {
    chips.push({
      key: `type-${productType}`,
      label: productTypeLabel(productType, market),
      onRemove: () =>
        updateFilterState(() => setActiveProductTypes((prev) => toggleInSet(prev, productType))),
    });
  }
  for (const width of activeWidths) {
    chips.push({
      key: `width-${width}`,
      label: `${width} mm`,
      onRemove: () => updateFilterState(() => setActiveWidths((prev) => toggleInSet(prev, width))),
    });
  }
  for (const height of activeHeights) {
    chips.push({
      key: `height-${height}`,
      label: `${height} mm`,
      onRemove: () => updateFilterState(() => setActiveHeights((prev) => toggleInSet(prev, height))),
    });
  }
  for (const thickness of activeThicknesses) {
    chips.push({
      key: `thickness-${thickness}`,
      label: `${thickness} mm`,
      onRemove: () => updateFilterState(() => setActiveThicknesses((prev) => toggleInSet(prev, thickness))),
    });
  }

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const pageStart = currentPage * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  function updateFilterState(update: () => void) {
    update();
    setPage(0);
  }

  function clearAll() {
    updateFilterState(() => {
      setQuery("");
      setActiveMaterials(new Set());
      setActiveFamilies(new Set());
      setActiveProductTypes(new Set());
      setActiveWidths(new Set());
      setActiveHeights(new Set());
      setActiveThicknesses(new Set());
    });
  }

  function handleCopy(stockCode: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;

    navigator.clipboard
      .writeText(stockCode)
      .then(() => {
        setCopiedCode(stockCode);
        window.setTimeout(() => {
          setCopiedCode((current) => (current === stockCode ? null : current));
        }, 1500);
      })
      .catch(() => {
        // Clipboard permission denied or unavailable — non-critical.
      });
  }

  function toggleEnquiry(variant: CableManagementVariant) {
    const item = cableEnquiryItem(familySlug, familyName, variant, sourceRoute);
    const { id } = item;

    if (enquiryItemIds.has(id)) {
      removeEnquiryItem(id);
      setConfirmation((current) => (current?.id === id ? null : current));
      return;
    }

    addEnquiryItem(item);
    setConfirmation({ id, title: `${variant.model} · ${variant.stockCode}` });
  }

  function handleDownloadFiltered() {
    downloadCsv(`${familySlug}-order-codes-filtered.csv`, buildVariantCsv(filtered.map((f) => f.variant)));
  }

  function handleDownloadAll() {
    downloadCsv(`${familySlug}-order-codes-all.csv`, buildVariantCsv(variants));
  }

  const filterPanel = (
    <div className={styles.filterPanel}>
      <div className={styles.filterPanelHeader}>
        <h2 className={styles.filterPanelTitle}>{labels.filterPanelTitle}</h2>
        <button
          className={styles.clearAllButton}
          disabled={!isFiltering}
          onClick={clearAll}
          type="button"
        >
          {labels.clearAllAction}
        </button>
      </div>

      {families.length > 1 ? (
        <details
          className={styles.filterGroup}
          onToggle={(event) => setGroupOpen("family", event.currentTarget.open)}
          open={openGroups.has("family")}
        >
          <summary className={styles.filterGroupSummary}>
            <span className={styles.filterGroupLabel}>{labels.familyFilterLabel}</span>
            {activeFamilies.size > 0 ? (
              <span className={styles.filterGroupCount}>{activeFamilies.size}</span>
            ) : null}
            <span aria-hidden="true" className={styles.filterGroupChevron} />
          </summary>
          <div className={styles.filterCheckList}>
            {families.map((family) => (
              <label className={styles.filterCheckOption} key={family}>
                <input
                  checked={activeFamilies.has(family)}
                  onChange={() => updateFilterState(() => setActiveFamilies((prev) => toggleInSet(prev, family)))}
                  type="checkbox"
                />
                <span className={styles.filterCheckValue}>{family}</span>
                <span className={styles.filterCheckCount}>{familyCounts.get(family) ?? 0}</span>
              </label>
            ))}
          </div>
        </details>
      ) : null}

      {productTypes.length > 1 ? (
        <details
          className={styles.filterGroup}
          onToggle={(event) => setGroupOpen("type", event.currentTarget.open)}
          open={openGroups.has("type")}
        >
          <summary className={styles.filterGroupSummary}>
            <span className={styles.filterGroupLabel}>{labels.typeFilterLabel}</span>
            {activeProductTypes.size > 0 ? (
              <span className={styles.filterGroupCount}>{activeProductTypes.size}</span>
            ) : null}
            <span aria-hidden="true" className={styles.filterGroupChevron} />
          </summary>
          <div className={styles.filterCheckList}>
            {productTypes.map((productType) => (
              <label className={styles.filterCheckOption} key={productType}>
                <input
                  checked={activeProductTypes.has(productType)}
                  onChange={() =>
                    updateFilterState(() =>
                      setActiveProductTypes((prev) => toggleInSet(prev, productType)),
                    )
                  }
                  type="checkbox"
                />
                <span className={styles.filterCheckValue}>{productTypeLabel(productType, market)}</span>
                <span className={styles.filterCheckCount}>{productTypeCounts.get(productType) ?? 0}</span>
              </label>
            ))}
          </div>
        </details>
      ) : null}

      {variantSelector}

      <div className={styles.searchField}>
        <IconSearch aria-hidden="true" className={styles.searchIcon} />
        <input
          aria-label={labels.searchLabel}
          className={styles.searchInput}
          onChange={(event) => updateFilterState(() => setQuery(event.target.value))}
          placeholder={labels.searchPlaceholder}
          type="text"
          value={query}
        />
        {query ? (
          <button
            aria-label={labels.clearSearchAction}
            className={styles.searchClear}
            onClick={() => updateFilterState(() => setQuery(""))}
            type="button"
          >
            <IconClose aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {!hideMaterialFilter && materials.length > 1 ? (
        <details
          className={styles.filterGroup}
          onToggle={(event) => setGroupOpen("material", event.currentTarget.open)}
          open={openGroups.has("material")}
        >
          <summary className={styles.filterGroupSummary}>
            <span className={styles.filterGroupLabel}>{labels.materialFilterLabel}</span>
            {activeMaterials.size > 0 ? (
              <span className={styles.filterGroupCount}>{activeMaterials.size}</span>
            ) : null}
            <span aria-hidden="true" className={styles.filterGroupChevron} />
          </summary>
          <div className={styles.filterCheckList}>
            {materials.map((material) => (
              <label className={styles.filterCheckOption} key={material}>
                <input
                  checked={activeMaterials.has(material)}
                  onChange={() => updateFilterState(() => setActiveMaterials((prev) => toggleInSet(prev, material)))}
                  type="checkbox"
                />
                <span className={styles.filterCheckValue}>{material}</span>
                <span className={styles.filterCheckCount}>{materialCounts.get(material) ?? 0}</span>
              </label>
            ))}
          </div>
        </details>
      ) : null}

      {widths.length > 1 ? (
        <details
          className={styles.filterGroup}
          onToggle={(event) => setGroupOpen("width", event.currentTarget.open)}
          open={openGroups.has("width")}
        >
          <summary className={styles.filterGroupSummary}>
            <span className={styles.filterGroupLabel}>{columnLabels?.width ?? labels.widthFilterLabel}</span>
            {activeWidths.size > 0 ? <span className={styles.filterGroupCount}>{activeWidths.size}</span> : null}
            <span aria-hidden="true" className={styles.filterGroupChevron} />
          </summary>
          <div className={styles.filterCheckList}>
            {widths.map((width) => (
              <label className={styles.filterCheckOption} key={width}>
                <input
                  checked={activeWidths.has(width)}
                  onChange={() => updateFilterState(() => setActiveWidths((prev) => toggleInSet(prev, width)))}
                  type="checkbox"
                />
                <span className={styles.filterCheckValue}>{width}</span>
                <span className={styles.filterCheckCount}>{widthCounts.get(width) ?? 0}</span>
              </label>
            ))}
          </div>
        </details>
      ) : null}

      {heights.length > 1 ? (
        <details
          className={styles.filterGroup}
          onToggle={(event) => setGroupOpen("height", event.currentTarget.open)}
          open={openGroups.has("height")}
        >
          <summary className={styles.filterGroupSummary}>
            <span className={styles.filterGroupLabel}>{columnLabels?.height ?? labels.heightFilterLabel}</span>
            {activeHeights.size > 0 ? <span className={styles.filterGroupCount}>{activeHeights.size}</span> : null}
            <span aria-hidden="true" className={styles.filterGroupChevron} />
          </summary>
          <div className={styles.filterCheckList}>
            {heights.map((height) => (
              <label className={styles.filterCheckOption} key={height}>
                <input
                  checked={activeHeights.has(height)}
                  onChange={() => updateFilterState(() => setActiveHeights((prev) => toggleInSet(prev, height)))}
                  type="checkbox"
                />
                <span className={styles.filterCheckValue}>{height}</span>
                <span className={styles.filterCheckCount}>{heightCounts.get(height) ?? 0}</span>
              </label>
            ))}
          </div>
        </details>
      ) : null}

      {thicknesses.length > 1 ? (
        <details
          className={styles.filterGroup}
          onToggle={(event) => setGroupOpen("thickness", event.currentTarget.open)}
          open={openGroups.has("thickness")}
        >
          <summary className={styles.filterGroupSummary}>
            <span className={styles.filterGroupLabel}>
              {columnLabels?.thickness ?? labels.thicknessFilterLabel}
            </span>
            {activeThicknesses.size > 0 ? (
              <span className={styles.filterGroupCount}>{activeThicknesses.size}</span>
            ) : null}
            <span aria-hidden="true" className={styles.filterGroupChevron} />
          </summary>
          <div className={styles.filterCheckList}>
            {thicknesses.map((thickness) => (
              <label className={styles.filterCheckOption} key={thickness}>
                <input
                  checked={activeThicknesses.has(thickness)}
                  onChange={() =>
                    updateFilterState(() => setActiveThicknesses((prev) => toggleInSet(prev, thickness)))
                  }
                  type="checkbox"
                />
                <span className={styles.filterCheckValue}>{thickness}</span>
                <span className={styles.filterCheckCount}>{thicknessCounts.get(thickness) ?? 0}</span>
              </label>
            ))}
          </div>
        </details>
      ) : null}

      <button className={styles.applyFiltersButton} onClick={() => setFiltersOpen(false)} type="button">
        {labels.applyFiltersAction}
      </button>
    </div>
  );

  return (
    <div>
      <button
        aria-expanded={filtersOpen}
        className={styles.mobileFilterToggle}
        onClick={() => setFiltersOpen((open) => !open)}
        type="button"
      >
        <IconFilter aria-hidden="true" className={styles.mobileFilterToggleIcon} />
        {labels.filterPanelTitle}
        {isFiltering ? <span className={styles.mobileFilterBadge}>{filtered.length}</span> : null}
      </button>

      <div className={styles.scheduleLayout}>
        <div className={filtersOpen ? styles.filterPanelMobileOpen : styles.filterPanelMobileClosed}>
          {filterPanel}
        </div>

        <div className={styles.scheduleResults}>
          <div className={styles.scheduleToolbar}>
            <p aria-live="polite" className={styles.resultsLine}>
              {isFiltering
                ? `${labels.showingLabel} ${filtered.length} ${labels.ofLabel} ${variants.length} ${labels.countSuffix}`
                : `${variants.length} ${labels.countSuffix}`}
            </p>

            <div className={styles.scheduleToolbarActions}>
              {hasCurrentPageEnquiryItem ? (
                <EnquiryToolbarSummary count={enquiryItems.length} market={market} />
              ) : null}
              <div className={styles.csvActions}>
                <button
                  aria-label={`${labels.downloadCsvAction} (${filtered.length} ${labels.countSuffix})`}
                  className={styles.csvButton}
                  disabled={filtered.length === 0}
                  onClick={handleDownloadFiltered}
                  type="button"
                >
                  <IconDownload aria-hidden="true" className={styles.csvButtonIcon} />
                  {labels.downloadCsvAction}
                </button>
                {isFiltering ? (
                  <button
                    aria-label={`${labels.downloadAllCsvAction} (${variants.length} ${labels.countSuffix})`}
                    className={styles.csvButtonSecondary}
                    onClick={handleDownloadAll}
                    type="button"
                  >
                    {labels.downloadAllCsvAction}
                  </button>
                ) : null}
              </div>
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
                  ? `${labels.mobileHideResultsPrefix} ${labels.mobileOrderCodesLabel}`
                  : `${isFiltering ? labels.mobileViewFilteredResultsPrefix : labels.mobileViewAllResultsPrefix} ${filtered.length} ${labels.mobileOrderCodesLabel}`}
                <span aria-hidden="true" className={styles.mobileResultsToggleArrow}>
                  {resultsOpen ? "↑" : "↓"}
                </span>
              </button>

              <div className={resultsOpen ? styles.resultsMobileOpen : styles.resultsMobileClosed}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {families.length > 0 ? <th scope="col">{columnLabels?.family ?? labels.columnFamily}</th> : null}
                        <th scope="col">{labels.columnModel}</th>
                        <th scope="col">{columnLabels?.stockCode ?? labels.columnStockCode}</th>
                        <th scope="col">{columnLabels?.width ?? labels.columnWidth}</th>
                        <th scope="col">{columnLabels?.height ?? labels.columnHeight}</th>
                        <th scope="col">{columnLabels?.thickness ?? labels.columnThickness}</th>
                        <th scope="col">{labels.columnMaterial}</th>
                        {productTypes.length > 0 ? <th scope="col">{columnLabels?.type ?? labels.columnType}</th> : null}
                        <th className={styles.tableActionHeader} scope="col">
                          {labels.columnAction}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageItems.map(({ variant }) => {
                        const isCopied = copiedCode === variant.stockCode;
                        const isEnquired = enquiryItemIds.has(
                          cableEnquiryItem(familySlug, familyName, variant, sourceRoute).id,
                        );
                        const rowKey = `${familyName}-${variant.model}-${variant.stockCode}`;
                        const hasMoreSpecs = variant.lengthMm !== undefined || variant.weight !== undefined;
                        const rowExpanded = expandedRows.has(rowKey);

                        return (
                          <tr key={rowKey}>
                            {families.length > 0 ? (
                              <td className={styles.tableFamilyCell} data-label={columnLabels?.family ?? labels.columnFamily}>
                                {variant.family ?? "—"}
                              </td>
                            ) : null}
                            <td className={styles.tableModelCell} data-label={labels.columnModel}>
                              <strong>{variant.model}</strong>
                              {variant.name !== variant.model ? (
                                <span className={styles.tableSecondaryLine}>{variant.name}</span>
                              ) : null}
                              {hasMoreSpecs ? (
                                <button
                                  aria-expanded={rowExpanded}
                                  className={styles.tableMoreSpecsToggle}
                                  onClick={() => toggleRowSpecs(rowKey)}
                                  type="button"
                                >
                                  <span aria-hidden="true" className={styles.tableMoreSpecsToggleGlyph}>
                                    {rowExpanded ? "−" : "+"}
                                  </span>
                                  {columnLabels?.length ?? labels.columnLength} · {columnLabels?.weight ?? labels.columnWeight}
                                </button>
                              ) : null}
                              {hasMoreSpecs && rowExpanded ? (
                                <div className={styles.tableMoreSpecsPanel}>
                                  {variant.lengthMm !== undefined ? (
                                    <span>
                                      {columnLabels?.length ?? labels.columnLength}: <strong>{variant.lengthMm}</strong>
                                    </span>
                                  ) : null}
                                  {variant.weight !== undefined ? (
                                    <span>
                                      {columnLabels?.weight ?? labels.columnWeight}: <strong>{variant.weight}</strong>
                                    </span>
                                  ) : null}
                                </div>
                              ) : null}
                            </td>
                            <td data-label={columnLabels?.stockCode ?? labels.columnStockCode}>
                              <span className={styles.stockCodeCell}>
                                <span>{variant.stockCode}</span>
                                <button
                                  aria-label={isCopied ? labels.copiedLabel : labels.copyStockCodeAction}
                                  className={styles.copyButton}
                                  onClick={() => handleCopy(variant.stockCode)}
                                  type="button"
                                >
                                  {isCopied ? (
                                    <IconCheck aria-hidden="true" className={styles.copyIcon} />
                                  ) : (
                                    <IconCopy aria-hidden="true" className={styles.copyIcon} />
                                  )}
                                </button>
                              </span>
                            </td>
                            <td data-label={columnLabels?.width ?? labels.columnWidth}>{variant.widthMm ?? "—"}</td>
                            <td data-label={columnLabels?.height ?? labels.columnHeight}>{variant.heightMm ?? "—"}</td>
                            <td data-label={columnLabels?.thickness ?? labels.columnThickness}>{variant.thicknessMm ?? "—"}</td>
                            <td data-label={labels.columnMaterial}>{variant.material}</td>
                            {productTypes.length > 0 ? (
                              <td data-label={columnLabels?.type ?? labels.columnType}>
                                {variant.productType ? productTypeLabel(variant.productType, market) : "—"}
                              </td>
                            ) : null}
                            <td className={styles.tableActionCell} data-label={labels.columnAction}>
                              <button
                                aria-pressed={isEnquired}
                                className={isEnquired ? styles.enquiredButton : styles.enquiryButton}
                                onClick={() => toggleEnquiry(variant)}
                                type="button"
                              >
                                {isEnquired ? labels.enquiryRemoveAction : labels.enquiryAddAction}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {pageCount > 1 ? (
                  <nav aria-label="Order code schedule pages" className={styles.pagination}>
                    <button
                      className={styles.paginationButton}
                      disabled={currentPage === 0}
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      type="button"
                    >
                      {labels.previousAction}
                    </button>
                    <span className={styles.paginationStatus}>
                      {pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, filtered.length)} of {filtered.length}
                    </span>
                    <button
                      className={styles.paginationButton}
                      disabled={currentPage >= pageCount - 1}
                      onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                      type="button"
                    >
                      {labels.nextAction}
                    </button>
                  </nav>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>

      {confirmation ? (
        <EnquiryAddedConfirmation
          count={enquiryItems.length}
          itemLabel={confirmation.title}
          market={market}
          onContinue={() => setConfirmation(null)}
        />
      ) : null}
    </div>
  );
}

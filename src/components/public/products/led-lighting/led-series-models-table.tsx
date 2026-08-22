"use client";

import { useMemo, useState } from "react";

import {
  EnquiryAddedConfirmation,
  EnquiryToolbarSummary,
} from "@/components/public/enquiry/enquiry-feedback";
import type { LedSeriesDetailContent, LedSeriesModel } from "@/data/products/led-lighting/types";
import { addEnquiryItem, removeEnquiryItem, useEnquiryItems } from "@/modules/enquiry/store";
import { ledEnquiryItem } from "@/modules/enquiry/item-builders";

import { buildSeriesModelsCsv, downloadCsv } from "./led-series-csv";
import { IconCheck, IconClose, IconCopy, IconDownload, IconFilter, IconSearch } from "./led-icons";
import styles from "./led-series-detail-page.module.css";

// Mirrors CableSizeVariantTable's mobile collapse behaviour (filter panel
// + results both start collapsed on mobile, expanded unconditionally on
// desktop via the shared *MobileOpen/*MobileClosed CSS classes) — this is
// the standard LED series models table, reused by every future series page
// with only `models`/`seriesSlug`/`columns`/`filters` (localized labels)
// changing.
export function LedSeriesModelsTable({
  seriesSlug,
  seriesTitle,
  sourceRoute,
  models,
  columns,
  filters,
}: Readonly<{
  seriesSlug: string;
  seriesTitle: string;
  sourceRoute: string;
  models: readonly LedSeriesModel[];
  columns: NonNullable<LedSeriesDetailContent["modelsColumns"]>;
  filters: NonNullable<LedSeriesDetailContent["modelsFilters"]>;
}>) {
  const [query, setQuery] = useState("");
  const [activePowers, setActivePowers] = useState<ReadonlySet<number>>(() => new Set());
  const [activeDimensions, setActiveDimensions] = useState<ReadonlySet<string>>(() => new Set());
  const [activeLengths, setActiveLengths] = useState<ReadonlySet<string>>(() => new Set());
  const [activeLedQty, setActiveLedQty] = useState<ReadonlySet<number>>(() => new Set());
  const [activeWeights, setActiveWeights] = useState<ReadonlySet<string>>(() => new Set());
  const [activeMountingTypes, setActiveMountingTypes] = useState<ReadonlySet<string>>(() => new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [copiedModel, setCopiedModel] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Readonly<{ id: string; title: string }> | null>(null);
  const enquiryItems = useEnquiryItems();
  const enquiryItemIds = useMemo(() => new Set(enquiryItems.map((item) => item.id)), [enquiryItems]);
  const isUkrainian = /[А-Яа-яІіЇїЄє]/u.test(filters.enquiryColumnLabel);
  const market = isUkrainian ? "ua" : "uk";

  const powers = useMemo(() => {
    const set = new Set<number>();
    for (const model of models) set.add(model.powerW);
    return Array.from(set).sort((a, b) => a - b);
  }, [models]);

  const showDimensionsFilter = Boolean(filters.dimensionsFilterLabel);
  const showLengthFilter = Boolean(filters.lengthFilterLabel);
  const showLedQtyFilter = Boolean(filters.ledQtyFilterLabel);
  const showWeightFilter = Boolean(filters.weightFilterLabel);
  const showMountingTypeFilter = Boolean(filters.mountingTypeFilterLabel);

  const dimensionsList = useMemo(() => {
    const set = new Set<string>();
    for (const model of models) if (model.dimensions) set.add(model.dimensions);
    return Array.from(set);
  }, [models]);

  const lengthsList = useMemo(() => {
    const set = new Set<string>();
    for (const model of models) if (model.length) set.add(model.length);
    return Array.from(set);
  }, [models]);

  const ledQtyList = useMemo(() => {
    const set = new Set<number>();
    for (const model of models) if (model.ledQty !== undefined) set.add(model.ledQty);
    return Array.from(set).sort((a, b) => a - b);
  }, [models]);

  const weightsList = useMemo(() => {
    const set = new Set<string>();
    for (const model of models) if (model.weightKg) set.add(model.weightKg);
    return Array.from(set);
  }, [models]);

  const mountingTypesList = useMemo(() => {
    const set = new Set<string>();
    for (const model of models) if (model.mountingType) set.add(model.mountingType);
    return Array.from(set);
  }, [models]);

  const normalizedQuery = query.trim().toLowerCase();
  const isFiltering =
    normalizedQuery !== "" ||
    activePowers.size > 0 ||
    activeDimensions.size > 0 ||
    activeLengths.size > 0 ||
    activeLedQty.size > 0 ||
    activeWeights.size > 0 ||
    activeMountingTypes.size > 0;

  const filtered = models.filter((model) => {
    const haystack = model.model.toLowerCase();
    return (
      (normalizedQuery === "" || haystack.includes(normalizedQuery)) &&
      (activePowers.size === 0 || activePowers.has(model.powerW)) &&
      (activeDimensions.size === 0 || (model.dimensions !== undefined && activeDimensions.has(model.dimensions))) &&
      (activeLengths.size === 0 || (model.length !== undefined && activeLengths.has(model.length))) &&
      (activeLedQty.size === 0 || (model.ledQty !== undefined && activeLedQty.has(model.ledQty))) &&
      (activeWeights.size === 0 || (model.weightKg !== undefined && activeWeights.has(model.weightKg))) &&
      (activeMountingTypes.size === 0 || (model.mountingType !== undefined && activeMountingTypes.has(model.mountingType)))
    );
  });

  function togglePower(power: number) {
    setActivePowers((prev) => {
      const next = new Set(prev);
      if (next.has(power)) next.delete(power);
      else next.add(power);
      return next;
    });
  }

  function toggleDimensions(dimensions: string) {
    setActiveDimensions((prev) => {
      const next = new Set(prev);
      if (next.has(dimensions)) next.delete(dimensions);
      else next.add(dimensions);
      return next;
    });
  }

  function toggleLength(length: string) {
    setActiveLengths((prev) => {
      const next = new Set(prev);
      if (next.has(length)) next.delete(length);
      else next.add(length);
      return next;
    });
  }

  function toggleLedQty(ledQty: number) {
    setActiveLedQty((prev) => {
      const next = new Set(prev);
      if (next.has(ledQty)) next.delete(ledQty);
      else next.add(ledQty);
      return next;
    });
  }

  function toggleWeight(weight: string) {
    setActiveWeights((prev) => {
      const next = new Set(prev);
      if (next.has(weight)) next.delete(weight);
      else next.add(weight);
      return next;
    });
  }

  function toggleMountingType(mountingType: string) {
    setActiveMountingTypes((prev) => {
      const next = new Set(prev);
      if (next.has(mountingType)) next.delete(mountingType);
      else next.add(mountingType);
      return next;
    });
  }

  function clearAll() {
    setQuery("");
    setActivePowers(new Set());
    setActiveDimensions(new Set());
    setActiveLengths(new Set());
    setActiveLedQty(new Set());
    setActiveWeights(new Set());
    setActiveMountingTypes(new Set());
  }

  function handleDownload() {
    downloadCsv(`${seriesSlug}-models.csv`, buildSeriesModelsCsv(filtered));
  }

  function handleCopy(model: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;

    navigator.clipboard
      .writeText(model)
      .then(() => {
        setCopiedModel(model);
        window.setTimeout(() => {
          setCopiedModel((current) => (current === model ? null : current));
        }, 1500);
      })
      .catch(() => {
        // Clipboard permission denied or unavailable — non-critical.
      });
  }

  function toggleEnquiry(model: LedSeriesModel, modelIndex: number) {
    const item = ledEnquiryItem(seriesSlug, seriesTitle, model, modelIndex, sourceRoute);
    const { id } = item;

    if (enquiryItemIds.has(id)) {
      removeEnquiryItem(id);
      setConfirmation((current) => (current?.id === id ? null : current));
      return;
    }

    addEnquiryItem(item);
    setConfirmation({ id, title: model.model });
  }

  const chips: Array<Readonly<{ key: string; label: string; onRemove: () => void }>> = [];
  if (normalizedQuery !== "") {
    chips.push({ key: "query", label: query, onRemove: () => setQuery("") });
  }
  for (const power of activePowers) {
    chips.push({ key: `power-${power}`, label: `${power} W`, onRemove: () => togglePower(power) });
  }
  for (const dimensions of activeDimensions) {
    chips.push({ key: `dimensions-${dimensions}`, label: dimensions, onRemove: () => toggleDimensions(dimensions) });
  }
  for (const length of activeLengths) {
    chips.push({ key: `length-${length}`, label: length, onRemove: () => toggleLength(length) });
  }
  for (const ledQty of activeLedQty) {
    chips.push({ key: `ledqty-${ledQty}`, label: `${ledQty}`, onRemove: () => toggleLedQty(ledQty) });
  }
  for (const weight of activeWeights) {
    chips.push({ key: `weight-${weight}`, label: weight, onRemove: () => toggleWeight(weight) });
  }
  for (const mountingType of activeMountingTypes) {
    chips.push({ key: `mountingtype-${mountingType}`, label: mountingType, onRemove: () => toggleMountingType(mountingType) });
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
        {filters.mobileFiltersToggleLabel}
        {isFiltering ? <span className={styles.mobileFilterBadge}>{filtered.length}</span> : null}
      </button>

      <div className={styles.scheduleLayout}>
        <div className={filtersOpen ? styles.filterPanelMobileOpen : styles.filterPanelMobileClosed}>
          <div className={styles.filterPanel}>
            <div className={styles.filterPanelHeader}>
              <h3 className={styles.filterPanelTitle}>{filters.mobileFiltersToggleLabel}</h3>
              <button className={styles.clearAllButton} disabled={!isFiltering} onClick={clearAll} type="button">
                {filters.clearFiltersLabel}
              </button>
            </div>

            <div className={styles.searchField}>
              <IconSearch aria-hidden="true" className={styles.searchIcon} />
              <input
                aria-label={filters.searchLabel}
                className={styles.searchInput}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={filters.searchPlaceholder}
                type="text"
                value={query}
              />
            </div>

            {showMountingTypeFilter && mountingTypesList.length > 1 ? (
              <div aria-label={filters.mountingTypeFilterLabel} className={styles.filterGroup} role="group">
                <h4 className={styles.filterGroupLabel}>{filters.mountingTypeFilterLabel}</h4>
                <div className={styles.filterCheckList}>
                  {mountingTypesList.map((mountingType) => (
                    <label className={styles.filterCheckOption} key={mountingType}>
                      <input
                        checked={activeMountingTypes.has(mountingType)}
                        onChange={() => toggleMountingType(mountingType)}
                        type="checkbox"
                      />
                      <span className={styles.filterCheckValue}>{mountingType}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {powers.length > 1 ? (
              <div aria-label={filters.powerFilterLabel} className={styles.filterGroup} role="group">
                <h4 className={styles.filterGroupLabel}>{filters.powerFilterLabel}</h4>
                <div className={styles.filterCheckList}>
                  {powers.map((power) => (
                    <label className={styles.filterCheckOption} key={power}>
                      <input checked={activePowers.has(power)} onChange={() => togglePower(power)} type="checkbox" />
                      <span className={styles.filterCheckValue}>{power} W</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {showDimensionsFilter && dimensionsList.length > 1 ? (
              <div aria-label={filters.dimensionsFilterLabel} className={styles.filterGroup} role="group">
                <h4 className={styles.filterGroupLabel}>{filters.dimensionsFilterLabel}</h4>
                <div className={styles.filterCheckList}>
                  {dimensionsList.map((dimensions) => (
                    <label className={styles.filterCheckOption} key={dimensions}>
                      <input
                        checked={activeDimensions.has(dimensions)}
                        onChange={() => toggleDimensions(dimensions)}
                        type="checkbox"
                      />
                      <span className={styles.filterCheckValue}>{dimensions}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {showLengthFilter && lengthsList.length > 1 ? (
              <div aria-label={filters.lengthFilterLabel} className={styles.filterGroup} role="group">
                <h4 className={styles.filterGroupLabel}>{filters.lengthFilterLabel}</h4>
                <div className={styles.filterCheckList}>
                  {lengthsList.map((length) => (
                    <label className={styles.filterCheckOption} key={length}>
                      <input checked={activeLengths.has(length)} onChange={() => toggleLength(length)} type="checkbox" />
                      <span className={styles.filterCheckValue}>{length}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {showLedQtyFilter && ledQtyList.length > 1 ? (
              <div aria-label={filters.ledQtyFilterLabel} className={styles.filterGroup} role="group">
                <h4 className={styles.filterGroupLabel}>{filters.ledQtyFilterLabel}</h4>
                <div className={styles.filterCheckList}>
                  {ledQtyList.map((ledQty) => (
                    <label className={styles.filterCheckOption} key={ledQty}>
                      <input checked={activeLedQty.has(ledQty)} onChange={() => toggleLedQty(ledQty)} type="checkbox" />
                      <span className={styles.filterCheckValue}>{ledQty}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {showWeightFilter && weightsList.length > 1 ? (
              <div aria-label={filters.weightFilterLabel} className={styles.filterGroup} role="group">
                <h4 className={styles.filterGroupLabel}>{filters.weightFilterLabel}</h4>
                <div className={styles.filterCheckList}>
                  {weightsList.map((weight) => (
                    <label className={styles.filterCheckOption} key={weight}>
                      <input checked={activeWeights.has(weight)} onChange={() => toggleWeight(weight)} type="checkbox" />
                      <span className={styles.filterCheckValue}>{weight}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            <button className={styles.applyFiltersButton} onClick={() => setFiltersOpen(false)} type="button">
              {filters.mobileApplyFiltersLabel}
            </button>
          </div>
        </div>

        <div className={styles.scheduleResults}>
          <div className={styles.scheduleToolbar}>
            <p aria-live="polite" className={styles.resultsLine}>
              {filtered.length} {filters.modelsCountSuffix}
            </p>

            <div className={styles.scheduleToolbarActions}>
              <EnquiryToolbarSummary count={enquiryItems.length} market={market} />
              <div className={styles.csvActions}>
                <button
                  aria-label={`${filters.downloadCsvLabel} (${filtered.length} ${filters.modelsCountSuffix})`}
                  className={styles.csvButton}
                  disabled={filtered.length === 0}
                  onClick={handleDownload}
                  type="button"
                >
                  <IconDownload aria-hidden="true" className={styles.csvButtonIcon} />
                  {filters.downloadCsvLabel}
                </button>
              </div>
            </div>
          </div>

          {chips.length > 0 ? (
            <div className={styles.mobileFilterChips}>
              {chips.map((chip) => (
                <button className={styles.filterChip} key={chip.key} onClick={chip.onRemove} type="button">
                  {chip.label}
                  <IconClose aria-hidden="true" className={styles.filterChipIcon} />
                </button>
              ))}
            </div>
          ) : null}

          {filtered.length === 0 ? (
            <p className={styles.scheduleEmpty}>{filters.noResultsLabel}</p>
          ) : (
            <>
              <button
                aria-expanded={resultsOpen}
                className={styles.mobileResultsToggle}
                onClick={() => setResultsOpen((open) => !open)}
                type="button"
              >
                {resultsOpen
                  ? filters.mobileHidePrefix
                  : `${isFiltering ? filters.mobileViewFilteredPrefix : filters.mobileViewAllPrefix} ${filtered.length} ${filters.modelsCountSuffix}`}
                <span aria-hidden="true" className={styles.mobileResultsToggleArrow}>
                  {resultsOpen ? "↑" : "↓"}
                </span>
              </button>

              <div className={resultsOpen ? styles.resultsMobileOpen : styles.resultsMobileClosed}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {columns.mountingType ? <th scope="col">{columns.mountingType}</th> : null}
                        <th scope="col">{columns.model}</th>
                        <th scope="col">{columns.power}</th>
                        {columns.ledQty ? <th scope="col">{columns.ledQty}</th> : null}
                        {columns.luminousFlux ? <th scope="col">{columns.luminousFlux}</th> : null}
                        {columns.voltage ? <th scope="col">{columns.voltage}</th> : null}
                        {columns.frequency ? <th scope="col">{columns.frequency}</th> : null}
                        {columns.powerFactor ? <th scope="col">{columns.powerFactor}</th> : null}
                        {columns.operatingTemperature ? <th scope="col">{columns.operatingTemperature}</th> : null}
                        {columns.efficiency ? <th scope="col">{columns.efficiency}</th> : null}
                        {columns.cri ? <th scope="col">{columns.cri}</th> : null}
                        {columns.colourTemperature ? <th scope="col">{columns.colourTemperature}</th> : null}
                        {columns.lens ? <th scope="col">{columns.lens}</th> : null}
                        {columns.dimensions ? <th scope="col">{columns.dimensions}</th> : null}
                        {columns.ceilingCut ? <th scope="col">{columns.ceilingCut}</th> : null}
                        {columns.ip ? <th scope="col">{columns.ip}</th> : null}
                        {columns.ik ? <th scope="col">{columns.ik}</th> : null}
                        {columns.weight ? <th scope="col">{columns.weight}</th> : null}
                        <th scope="col">{filters.enquiryColumnLabel}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((model) => {
                        const modelIndex = models.indexOf(model);
                        const rowId = `${model.model}::${model.powerW}::${model.luminousFluxLm ?? ""}::${modelIndex}`;
                        const enquiryId = `led-systems:${seriesSlug}:${model.model}:${model.powerW}:${modelIndex}`;
                        const isCopied = copiedModel === model.model;
                        const isEnquired = enquiryItemIds.has(enquiryId);

                        return (
                          <tr key={rowId}>
                            {columns.mountingType ? (
                              <td data-label={columns.mountingType}>{model.mountingType}</td>
                            ) : null}
                            <td data-label={columns.model}>
                              <span className={styles.stockCodeCell}>
                                <strong>{model.model}</strong>
                                <button
                                  aria-label={isCopied ? filters.copiedLabel : filters.copyModelCodeAction}
                                  className={styles.copyButton}
                                  onClick={() => handleCopy(model.model)}
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
                            <td data-label={columns.power}>{model.powerDisplay ?? `${model.powerW} W`}</td>
                            {columns.ledQty ? <td data-label={columns.ledQty}>{model.ledQty}</td> : null}
                            {columns.luminousFlux ? (
                              <td data-label={columns.luminousFlux}>{model.luminousFluxLm}</td>
                            ) : null}
                            {columns.voltage ? <td data-label={columns.voltage}>{model.voltage}</td> : null}
                            {columns.frequency ? <td data-label={columns.frequency}>{model.frequency}</td> : null}
                            {columns.powerFactor ? <td data-label={columns.powerFactor}>{model.powerFactor}</td> : null}
                            {columns.operatingTemperature ? (
                              <td data-label={columns.operatingTemperature}>{model.operatingTemperature}</td>
                            ) : null}
                            {columns.efficiency ? (
                              <td data-label={columns.efficiency}>{model.efficiencyLmW}</td>
                            ) : null}
                            {columns.cri ? <td data-label={columns.cri}>{model.cri}</td> : null}
                            {columns.colourTemperature ? (
                              <td data-label={columns.colourTemperature}>{model.colourTemperature}</td>
                            ) : null}
                            {columns.lens ? <td data-label={columns.lens}>{model.lens}</td> : null}
                            {columns.dimensions ? (
                              <td data-label={columns.dimensions}>{model.dimensions}</td>
                            ) : null}
                            {columns.ceilingCut ? (
                              <td data-label={columns.ceilingCut}>{model.ceilingCut}</td>
                            ) : null}
                            {columns.ip ? <td data-label={columns.ip}>{model.ip}</td> : null}
                            {columns.ik ? <td data-label={columns.ik}>{model.ik}</td> : null}
                            {columns.weight ? <td data-label={columns.weight}>{model.weightKg}</td> : null}
                            <td data-label={filters.enquiryColumnLabel}>
                              <button
                                aria-pressed={isEnquired}
                                className={isEnquired ? styles.enquiredButton : styles.enquiryButton}
                                onClick={() => toggleEnquiry(model, modelIndex)}
                                type="button"
                              >
                                {isEnquired ? filters.enquiryRemoveAction : filters.enquiryAddAction}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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

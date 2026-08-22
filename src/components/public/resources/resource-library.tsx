"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { KeyboardEvent } from "react";

import type { ResourceSystemKey, ResourceType, ResourcesUiContent, TechnicalResource } from "@/data/resources";

import styles from "./resources-page.module.css";

const PAGE_SIZE = 18;
const resourceTypes: readonly ResourceType[] = ["certificate", "catalogue", "technical"];
const resourceSystems: readonly ResourceSystemKey[] = ["busbar", "cable", "earthing", "underfloor", "led", "gbus"];

type SystemSelection = ResourceSystemKey | "all";

function normalise(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
}

export function ResourceLibrary({ content, resources }: Readonly<{ content: ResourcesUiContent; resources: readonly TechnicalResource[] }>) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ResourceType | "all">("certificate");
  const [system, setSystem] = useState<SystemSelection>("all");
  const [systemMenuOpen, setSystemMenuOpen] = useState(false);
  const [activeSystemIndex, setActiveSystemIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const systemSelectRef = useRef<HTMLDivElement>(null);
  const systemTriggerRef = useRef<HTMLButtonElement>(null);
  const systemListRef = useRef<HTMLDivElement>(null);
  const systems = useMemo(
    () => resourceSystems.filter((key) => resources.some((resource) => resource.productSystemKey === key)),
    [resources],
  );
  const systemOptions = useMemo(
    () => [
      { label: content.allSystems, value: "all" as const },
      ...systems.map((key) => ({ label: content.systemLabels[key], value: key })),
    ],
    [content.allSystems, content.systemLabels, systems],
  );
  const selectedSystemLabel = systemOptions.find((option) => option.value === system)?.label ?? content.allSystems;
  const filtered = useMemo(() => {
    const term = normalise(query.trim());
    return resources.filter((resource) =>
      (type === "all" || resource.documentType === type) &&
      (system === "all" || resource.productSystemKey === system) &&
      (!term || normalise(resource.searchText).includes(term)),
    );
  }, [query, resources, system, type]);
  const visible = filtered.slice(0, visibleCount);

  useEffect(() => {
    function applyOverviewFilter(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>("[data-resource-type]");
      const requestedType = trigger?.dataset.resourceType;
      if (!requestedType || !resourceTypes.includes(requestedType as ResourceType)) return;
      setType(requestedType as ResourceType);
      setVisibleCount(PAGE_SIZE);
    }

    document.addEventListener("click", applyOverviewFilter);
    return () => document.removeEventListener("click", applyOverviewFilter);
  }, []);

  useEffect(() => {
    if (!systemMenuOpen) return;

    const frame = window.requestAnimationFrame(() => systemListRef.current?.focus());

    function closeOnOutsidePress(event: PointerEvent) {
      if (!systemSelectRef.current?.contains(event.target as Node)) setSystemMenuOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [systemMenuOpen]);

  function resetCount() {
    setVisibleCount(PAGE_SIZE);
  }

  function resetFilters() {
    setQuery("");
    setType("certificate");
    setSystem("all");
    setVisibleCount(PAGE_SIZE);
  }

  function selectSystem(value: SystemSelection) {
    setSystem(value);
    setSystemMenuOpen(false);
    setActiveSystemIndex(systemOptions.findIndex((option) => option.value === value));
    resetCount();
    systemTriggerRef.current?.focus();
  }

  function toggleSystemMenu() {
    const selectedIndex = systemOptions.findIndex((option) => option.value === system);
    setActiveSystemIndex(Math.max(0, selectedIndex));
    setSystemMenuOpen((open) => !open);
  }

  function handleSystemTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const selectedIndex = systemOptions.findIndex((option) => option.value === system);
    setActiveSystemIndex(Math.max(0, selectedIndex));
    setSystemMenuOpen(true);
  }

  function handleSystemListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" || event.key === "Tab") {
      setSystemMenuOpen(false);
      if (event.key === "Escape") {
        event.preventDefault();
        systemTriggerRef.current?.focus();
      }
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveSystemIndex((current) => {
        if (event.key === "Home") return 0;
        if (event.key === "End") return systemOptions.length - 1;
        const direction = event.key === "ArrowDown" ? 1 : -1;
        return (current + direction + systemOptions.length) % systemOptions.length;
      });
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const activeOption = systemOptions[activeSystemIndex];
      if (activeOption) selectSystem(activeOption.value);
    }
  }

  return (
    <div className={styles.libraryControlsAndResults}>
      <div className={styles.controls}>
        <label className={styles.searchField}>
          <span>{content.searchLabel}</span>
          <div>
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" /></svg>
            <input onChange={(event) => { setQuery(event.target.value); resetCount(); }} placeholder={content.searchPlaceholder} type="search" value={query} />
            {query ? <button onClick={() => { setQuery(""); resetCount(); }} type="button">{content.clearSearch}</button> : null}
          </div>
        </label>
        <fieldset className={styles.typeFilters}>
          <legend>{content.documentTypeLabel}</legend>
          <div>
            {resourceTypes.map((key) => <button aria-pressed={type === key} key={key} onClick={() => { setType(key); resetCount(); }} type="button">{content.typeLabels[key]}</button>)}
          </div>
        </fieldset>
        <div className={styles.systemFilter} ref={systemSelectRef}>
          <span id="resource-system-label">{content.productSystemLabel}</span>
          <div className={styles.systemSelectShell}>
            <button
              aria-controls="resource-system-options"
              aria-expanded={systemMenuOpen}
              aria-haspopup="listbox"
              aria-labelledby="resource-system-label resource-system-value"
              className={styles.systemSelectTrigger}
              onClick={toggleSystemMenu}
              onKeyDown={handleSystemTriggerKeyDown}
              ref={systemTriggerRef}
              type="button"
            >
              <span id="resource-system-value">{selectedSystemLabel}</span>
              <svg aria-hidden="true" viewBox="0 0 16 16"><path d="m3 6 5 5 5-5" /></svg>
            </button>
            {systemMenuOpen ? (
              <div
                aria-activedescendant={`resource-system-option-${systemOptions[activeSystemIndex]?.value ?? "all"}`}
                aria-labelledby="resource-system-label"
                className={styles.systemSelectMenu}
                id="resource-system-options"
                onKeyDown={handleSystemListKeyDown}
                ref={systemListRef}
                role="listbox"
                tabIndex={0}
              >
                {systemOptions.map((option, index) => (
                  <button
                    aria-selected={system === option.value}
                    className={styles.systemSelectOption}
                    data-active={activeSystemIndex === index}
                    id={`resource-system-option-${option.value}`}
                    key={option.value}
                    onClick={() => selectSystem(option.value)}
                    onMouseEnter={() => setActiveSystemIndex(index)}
                    role="option"
                    tabIndex={-1}
                    type="button"
                  >
                    <span>{option.label}</span>
                    {system === option.value ? <b aria-hidden="true">✓</b> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div aria-live="polite" className={styles.resultSummary}>{filtered.length.toLocaleString()} {filtered.length === 1 ? content.resultSingular : content.resultPlural}</div>
      {visible.length ? (
        <div className={styles.resourceGrid}>
          {visible.map((resource) => (
            <article className={styles.resourceCard} key={resource.id}>
              <div aria-hidden="true" className={styles.documentIcon}><span>PDF</span></div>
              <div className={styles.resourceBody}>
                <p className={styles.resourceType}>{content.typeLabels[resource.documentType]}</p>
                <h3>{resource.title}</h3>
                <p className={styles.resourceSystem}>{content.systemLabels[resource.productSystemKey]}</p>
                <dl>
                  {resource.issuer ? <div><dt className={styles.srOnly}>Issuer</dt><dd>{resource.issuer}</dd></div> : null}
                  {resource.documentNumber ? <div><dt>{content.referenceNumberLabel}</dt><dd>{resource.documentNumber}</dd></div> : null}
                </dl>
                <div className={styles.resourceFooter}>
                  <span>{resource.fileType} · {resource.fileSize}</span>
                  <a aria-label={`${content.downloadLabel}: ${resource.title}`} download href={resource.downloadPath}>
                    {content.downloadLabel}
                    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3v12m-5-5 5 5 5-5M5 21h14" /></svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>{content.noResults}</p>
          <button onClick={resetFilters} type="button">{content.resetFiltersLabel}</button>
        </div>
      )}
      <div className={styles.loadMore}>
        <span>{content.showingLabel} {visible.length.toLocaleString()} / {filtered.length.toLocaleString()}</span>
        {visible.length < filtered.length ? <button onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} type="button">{content.loadMoreLabel}<span aria-hidden="true">+</span></button> : null}
      </div>
      <p className={styles.sourceNote}>{content.sourceNote}</p>
    </div>
  );
}

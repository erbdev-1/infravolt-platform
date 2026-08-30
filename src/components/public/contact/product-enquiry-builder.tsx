"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { CONTACT_PRODUCT_SYSTEMS, loadEnquiryProductFamilies, type EnquiryProductFamily } from "@/modules/enquiry/product-catalog";
import { addEnquiryItem, useEnquiryItems } from "@/modules/enquiry/store";
import { enquirySystemLabel, type EnquirySystemKey } from "@/modules/enquiry/types";
import type { MarketCode } from "@/modules/markets/types";

import styles from "./contact-page.module.css";

type Option = Readonly<{ value: string; label: string; meta?: string }>;

const COPY = {
  uk: {
    heading: "Add products to your enquiry",
    intro: "Choose a product system, family and real catalogue model. You can add products from more than one system.",
    system: "Product System *",
    family: "Product / Series *",
    model: "Model / Code (optional)",
    select: "Select an option",
    loading: "Loading catalogue products…",
    add: "Add to Enquiry",
    added: "Added to your enquiry.",
    duplicate: "This product is already in your enquiry.",
    close: "Close product selector",
    search: "Search options",
    noOptions: "No matching options",
  },
  ua: {
    heading: "Додати продукти до запиту",
    intro: "Оберіть систему, серію та реальну каталожну модель. Можна додавати продукти з кількох систем.",
    system: "Система продукції *",
    family: "Продукт / Серія *",
    model: "Модель / Код (необов’язково)",
    select: "Оберіть варіант",
    loading: "Завантаження каталожних продуктів…",
    add: "Додати до запиту",
    added: "Додано до вашого запиту.",
    duplicate: "Цей продукт уже є у вашому запиті.",
    close: "Закрити вибір продукту",
    search: "Пошук варіантів",
    noOptions: "Варіантів не знайдено",
  },
} as const;

function filterOptions(options: readonly Option[], needle: string): readonly Option[] {
  const trimmed = needle.trim().toLocaleLowerCase();
  if (!trimmed) return options;
  return options.filter((option) => `${option.label} ${option.meta ?? ""}`.toLocaleLowerCase().includes(trimmed));
}

function CustomSelect({ id, label, value, options, placeholder, disabled, searchLabel, noOptionsLabel, onChange }: Readonly<{
  id: string;
  label: string;
  value: string;
  options: readonly Option[];
  placeholder: string;
  disabled?: boolean;
  searchLabel: string;
  noOptionsLabel: string;
  onChange: (value: string) => void;
}>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((option) => option.value === value);
  const filtered = useMemo(() => filterOptions(options, query), [options, query]);
  // Index 0 is the synthetic "placeholder / clear selection" row, only
  // rendered while not searching — every real option shifts by one to match.
  const rowCount = (query ? 0 : 1) + filtered.length;

  // The active (keyboard-highlighted) row for a given query, computed
  // synchronously at the point the list opens or the search text changes —
  // not in an effect, since that would cascade a second render every time.
  function activeIndexForQuery(nextQuery: string): number {
    const nextFiltered = filterOptions(options, nextQuery);
    if (nextQuery) return nextFiltered.length > 0 ? 0 : -1;
    const selectedFilteredIndex = nextFiltered.findIndex((option) => option.value === value);
    return selectedFilteredIndex >= 0 ? selectedFilteredIndex + 1 : 0;
  }

  useEffect(() => {
    if (!open) return;
    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  function commitRow(rowIndex: number) {
    if (rowIndex < 0 || rowIndex >= rowCount) return;
    if (!query && rowIndex === 0) {
      onChange("");
    } else {
      const option = filtered[query ? rowIndex : rowIndex - 1];
      if (!option) return;
      onChange(option.value);
    }
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(true);
        setActiveIndex(activeIndexForQuery(query));
      }
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, rowCount - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(rowCount - 1);
        break;
      case "Enter":
        event.preventDefault();
        commitRow(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        setQuery("");
        triggerRef.current?.focus();
        break;
      default:
        break;
    }
  }

  const activeOptionId = open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined;

  return (
    <div className={styles.field} onKeyDown={handleKeyDown} ref={rootRef}>
      <span className={styles.fieldLabel} id={`${id}-label`}>{label}</span>
      <div className={styles.customSelect}>
        <button
          aria-activedescendant={activeOptionId}
          aria-controls={`${id}-listbox`}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-labelledby={`${id}-label ${id}-value`}
          className={styles.customSelectTrigger}
          disabled={disabled}
          id={id}
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (next) setActiveIndex(activeIndexForQuery(query));
          }}
          ref={triggerRef}
          role="combobox"
          type="button"
        >
          <span data-placeholder={!selected || undefined} id={`${id}-value`}>
            {selected?.label ?? placeholder}
            {selected?.meta ? <small>{selected.meta}</small> : null}
          </span>
          <svg aria-hidden="true" viewBox="0 0 16 16"><path d="m3 6 5 5 5-5" /></svg>
        </button>
        {open ? (
          <div className={styles.customSelectPanel}>
            {options.length > 12 ? (
              <input
                aria-label={searchLabel}
                autoFocus
                className={styles.customSelectSearch}
                onChange={(event) => {
                  const nextQuery = event.target.value;
                  setQuery(nextQuery);
                  setActiveIndex(activeIndexForQuery(nextQuery));
                }}
                placeholder={searchLabel}
                type="search"
                value={query}
              />
            ) : null}
            <div aria-labelledby={`${id}-label`} className={styles.customSelectOptions} id={`${id}-listbox`} role="listbox">
              {!query ? (
                <button
                  aria-selected={!value}
                  className={activeIndex === 0 ? styles.customSelectOptionFocused : !value ? styles.customSelectOptionActive : styles.customSelectOption}
                  id={`${id}-option-0`}
                  onClick={() => commitRow(0)}
                  role="option"
                  tabIndex={-1}
                  type="button"
                >
                  <span>{placeholder}</span>
                </button>
              ) : null}
              {filtered.map((option, index) => {
                const rowIndex = query ? index : index + 1;
                const isActiveRow = activeIndex === rowIndex;
                const isSelected = option.value === value;
                return (
                  <button
                    aria-selected={isSelected}
                    className={isActiveRow ? styles.customSelectOptionFocused : isSelected ? styles.customSelectOptionActive : styles.customSelectOption}
                    id={`${id}-option-${rowIndex}`}
                    key={option.value}
                    onClick={() => commitRow(rowIndex)}
                    onMouseEnter={() => setActiveIndex(rowIndex)}
                    role="option"
                    tabIndex={-1}
                    type="button"
                  >
                    <span>{option.label}</span>
                    {option.meta ? <small>{option.meta}</small> : null}
                  </button>
                );
              })}
              {filtered.length === 0 ? <p className={styles.customSelectEmpty}>{noOptionsLabel}</p> : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ProductEnquiryBuilder({ market, onClose }: Readonly<{ market: MarketCode; onClose: () => void }>) {
  const copy = COPY[market];
  const prefix = useId();
  const items = useEnquiryItems();
  const [system, setSystem] = useState<EnquirySystemKey | "">("");
  const [families, setFamilies] = useState<readonly EnquiryProductFamily[]>([]);
  const [familyValue, setFamilyValue] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!system) {
      return;
    }
    let cancelled = false;
    loadEnquiryProductFamilies(system, market)
      .then((nextFamilies) => { if (!cancelled) setFamilies(nextFamilies); })
      .catch(() => { if (!cancelled) setFamilies([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [market, system]);

  const family = families.find((item) => item.value === familyValue);
  const selectedOption = family?.options.find((option) => option.value === optionValue);
  const familyOnlyItem = system && family
    ? family.familyItem ?? {
        id: `${system}:family:${encodeURIComponent(family.value)}`,
        title: family.label,
        system,
        categoryLabel: family.label,
      }
    : undefined;
  const selectedItem = selectedOption?.item ?? familyOnlyItem;
  const duplicate = selectedItem ? items.some((item) => item.id === selectedItem.id) : false;

  function addSelectedItem() {
    if (!selectedItem || duplicate) return;
    addEnquiryItem(selectedItem, market);
    setMessage(copy.added);
    setSystem("");
    setFamilies([]);
    setFamilyValue("");
    setOptionValue("");
  }

  return (
    <section aria-labelledby={`${prefix}-heading`} className={styles.productBuilder}>
      <div className={styles.productBuilderHeader}>
        <div>
          <h3 id={`${prefix}-heading`}>{copy.heading}</h3>
          <p>{copy.intro}</p>
        </div>
        <button aria-label={copy.close} onClick={onClose} type="button">×</button>
      </div>
      <div className={styles.productBuilderFields}>
        <CustomSelect
          id={`${prefix}-system`} label={copy.system} noOptionsLabel={copy.noOptions}
          onChange={(value) => {
            const next = value as EnquirySystemKey;
            setSystem(next);
            setFamilyValue("");
            setOptionValue("");
            setMessage("");
            if (next) {
              setLoading(true);
            } else {
              setFamilies([]);
              setLoading(false);
            }
          }}
          options={CONTACT_PRODUCT_SYSTEMS.map((key) => ({ value: key, label: enquirySystemLabel(key, market) }))}
          placeholder={copy.select} searchLabel={copy.search} value={system}
        />
        <CustomSelect
          disabled={!system || loading} id={`${prefix}-family`} label={copy.family} noOptionsLabel={copy.noOptions}
          onChange={(value) => { setFamilyValue(value); setOptionValue(""); setMessage(""); }}
          options={families.map((item) => ({ value: item.value, label: item.label }))}
          placeholder={loading ? copy.loading : copy.select} searchLabel={copy.search} value={familyValue}
        />
        {family?.options.length ? (
          <CustomSelect
            id={`${prefix}-model`} label={copy.model} noOptionsLabel={copy.noOptions}
            onChange={(value) => { setOptionValue(value); setMessage(""); }}
            options={family.options} placeholder={copy.select} searchLabel={copy.search} value={optionValue}
          />
        ) : null}
      </div>
      <div className={styles.productBuilderActions}>
        <p aria-live="polite">{duplicate ? copy.duplicate : message}</p>
        <button disabled={!selectedItem || duplicate} onClick={addSelectedItem} type="button">{copy.add}</button>
      </div>
    </section>
  );
}

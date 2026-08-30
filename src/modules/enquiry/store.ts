import { useSyncExternalStore } from "react";

import { trackAddToEnquiry } from "@/modules/analytics/tracker";
import { localeForMarket } from "@/modules/markets/locale";

import type { MarketCode } from "@/modules/markets/types";
import type { EnquiryItem } from "./types";

const STORAGE_KEY = "infravolt.enquiry.items";
const CHANGE_EVENT = "infravolt:enquiry-change";
const EMPTY: readonly EnquiryItem[] = [];

// getSnapshot() must return a referentially stable value when nothing
// changed, or useSyncExternalStore re-renders forever — so this caches the
// last parsed array alongside the raw string it came from, and only
// re-parses when the raw localStorage value actually differs.
let cachedRaw: string | null = null;
let cachedItems: readonly EnquiryItem[] = EMPTY;

function readAll(): readonly EnquiryItem[] {
  if (typeof window === "undefined") return EMPTY;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedItems;

  cachedRaw = raw;
  cachedItems = parseItems(raw);
  return cachedItems;
}

function parseItems(raw: string | null): readonly EnquiryItem[] {
  if (!raw) return EMPTY;

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as EnquiryItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeAll(items: readonly EnquiryItem[]): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function getEnquiryItems(): readonly EnquiryItem[] {
  return readAll();
}

export function isInEnquiry(id: string): boolean {
  return readAll().some((item) => item.id === id);
}

/**
 * `market` is required (not inferred) so `add_to_enquiry` always carries a
 * trusted, server-resolved market rather than guessing one client-side —
 * every call site already has it as a prop/local variable.
 */
export function addEnquiryItem(item: EnquiryItem, market: MarketCode): void {
  const items = readAll();
  if (items.some((existing) => existing.id === item.id)) return;

  writeAll([...items, item]);
  trackAddToEnquiry(
    { market, locale: localeForMarket(market) },
    { product_family: item.system, product_slug: item.model },
  );
}

export function removeEnquiryItem(id: string): void {
  writeAll(readAll().filter((item) => item.id !== id));
}

export function updateEnquiryItemQuantity(id: string, quantity: string): void {
  const normalized = quantity.trim();
  if (normalized && !/^\d+(?:\.\d*)?$/.test(normalized)) return;
  writeAll(readAll().map((item) => (item.id === id ? { ...item, quantity: normalized } : item)));
}

export function clearEnquiry(): void {
  writeAll([]);
}

export function subscribeToEnquiry(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot(): readonly EnquiryItem[] {
  return EMPTY;
}

export function useEnquiryItems(): readonly EnquiryItem[] {
  return useSyncExternalStore(subscribeToEnquiry, getEnquiryItems, getServerSnapshot);
}

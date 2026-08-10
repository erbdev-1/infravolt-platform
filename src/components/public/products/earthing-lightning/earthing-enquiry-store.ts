import { useSyncExternalStore } from "react";

const STORAGE_KEY = "infravolt.earthing.enquiry";
const CHANGE_EVENT = "infravolt:earthing-enquiry-change";
const EMPTY: readonly EarthingEnquiryItem[] = [];

export type EarthingEnquiryItem = Readonly<{
  stockCode: string;
  model: string;
  name: string;
  familyName: string;
  categorySlug: string;
  categoryName: string;
}>;

// getSnapshot() must return a referentially stable value when nothing
// changed, or useSyncExternalStore re-renders forever — so this caches the
// last parsed array alongside the raw string it came from, and only
// re-parses when the raw localStorage value actually differs.
let cachedRaw: string | null = null;
let cachedItems: readonly EarthingEnquiryItem[] = EMPTY;

function readAll(): readonly EarthingEnquiryItem[] {
  if (typeof window === "undefined") return EMPTY;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedItems;

  cachedRaw = raw;
  cachedItems = parseItems(raw);
  return cachedItems;
}

function parseItems(raw: string | null): readonly EarthingEnquiryItem[] {
  if (!raw) return EMPTY;

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as EarthingEnquiryItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeAll(items: readonly EarthingEnquiryItem[]): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function getEnquiryItems(): readonly EarthingEnquiryItem[] {
  return readAll();
}

export function isInEnquiry(stockCode: string): boolean {
  return readAll().some((item) => item.stockCode === stockCode);
}

export function addToEnquiry(item: EarthingEnquiryItem): void {
  const items = readAll();
  if (items.some((existing) => existing.stockCode === item.stockCode)) return;
  writeAll([...items, item]);
}

export function removeFromEnquiry(stockCode: string): void {
  writeAll(readAll().filter((item) => item.stockCode !== stockCode));
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

function getServerSnapshot(): readonly EarthingEnquiryItem[] {
  return EMPTY;
}

export function useEarthingEnquiry(): readonly EarthingEnquiryItem[] {
  return useSyncExternalStore(subscribeToEnquiry, getEnquiryItems, getServerSnapshot);
}

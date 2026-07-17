import type { LocaleCode, MarketCode } from "./types";

export const MARKET_LOCALES = Object.freeze({
  uk: "en-GB",
  ua: "uk-UA",
} as const satisfies Readonly<Record<MarketCode, LocaleCode>>);

export function localeForMarket(market: MarketCode): LocaleCode {
  return MARKET_LOCALES[market];
}

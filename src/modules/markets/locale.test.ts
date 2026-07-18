import { describe, expect, it } from "vitest";

import { localeForMarket } from "./locale";

describe("localeForMarket", () => {
  it.each([
    ["uk", "en-GB"],
    ["ua", "uk-UA"],
  ] as const)("maps the %s market to the %s locale", (market, locale) => {
    expect(localeForMarket(market)).toBe(locale);
  });
});

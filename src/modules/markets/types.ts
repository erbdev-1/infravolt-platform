export type MarketCode = "uk" | "ua";
export type LocaleCode = "en-GB" | "uk-UA";

export type MarketContext = Readonly<{
  market: MarketCode;
  locale: LocaleCode;
  host: string;
  publicSiteUrl: URL;
}>;

export type MarketResolution = Readonly<{
  context: MarketContext;
  redirectToCanonical: boolean;
}>;

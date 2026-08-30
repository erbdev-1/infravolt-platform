import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { marketPageMetadata } from "./market-metadata";

const SITE_URLS = {
  uk: new URL("https://infravolt.co.uk"),
  ua: new URL("https://infravolt.com.ua"),
} as const;

describe("marketPageMetadata", () => {
  it.each([
    ["uk", "https://infravolt.co.uk/about", "en_GB"],
    ["ua", "https://infravolt.com.ua/about", "uk_UA"],
  ] as const)("builds the %s self-canonical and localized social text", (market, canonical, locale) => {
    const metadata = marketPageMetadata({
      market,
      pathname: "/about",
      title: "Localized title",
      description: "Localized description",
      siteUrls: SITE_URLS,
    });

    expect(metadata.alternates?.canonical).toEqual(new URL(canonical));
    expect(metadata.openGraph).toMatchObject({
      title: "Localized title",
      description: "Localized description",
      url: new URL(canonical),
      locale,
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary",
      title: "Localized title",
      description: "Localized description",
    });
  });

  it("maps reciprocal hreflang correctly and never adds x-default", () => {
    const metadata = marketPageMetadata({
      market: "ua",
      pathname: "/resources",
      title: "Ресурси",
      description: "Технічні ресурси",
      siteUrls: SITE_URLS,
    });
    const languages = metadata.alternates?.languages;

    expect(languages?.["en-GB"]).toEqual(
      new URL("https://infravolt.co.uk/resources"),
    );
    expect(languages?.["uk-UA"]).toEqual(
      new URL("https://infravolt.com.ua/resources"),
    );
    expect(languages).not.toHaveProperty("x-default");
  });
});

import "server-only";

import { readClientEnvironment } from "../../config/env/client.ts";
import {
  normalizeConfiguredHost,
  normalizeConfiguredUrl,
} from "../../config/env/url.ts";
import { localeForMarket } from "./locale.ts";

import type { EnvironmentMode } from "../../config/env/validation.ts";
import type {
  MarketCode,
  MarketContext,
  MarketResolution,
} from "./types";

export const TRUSTED_MARKET_HEADERS = Object.freeze({
  host: "x-infravolt-host",
  locale: "x-infravolt-locale",
  market: "x-infravolt-market",
} as const);

const LOCAL_SITE_URLS = Object.freeze({
  uk: new URL("http://uk.infravolt.localhost:3000"),
  ua: new URL("http://ua.infravolt.localhost:3000"),
} as const satisfies Readonly<Record<MarketCode, URL>>);

type MarketUrlMap = Readonly<Record<MarketCode, URL>>;
type MarketHostMap = Readonly<Partial<Record<MarketCode, readonly string[]>>>;
type MarketPreviewUrlMap = Readonly<
  Partial<Record<MarketCode, readonly URL[]>>
>;

export type MarketResolverConfiguration = Readonly<{
  publicSiteUrls: MarketUrlMap;
  aliases?: MarketHostMap;
  previewSiteUrls?: MarketPreviewUrlMap;
  allowLocalHosts?: boolean;
}>;

export type MarketResolver = Readonly<{
  resolve: (host: string) => MarketResolution;
}>;

type HeaderReader = Readonly<{
  get: (name: string) => string | null;
}>;

type TrustedHost = Readonly<{
  market: MarketCode;
  publicSiteUrl: URL;
  redirectToCanonical: boolean;
}>;

export class UntrustedHostError extends Error {
  constructor() {
    super("Unknown or untrusted host");
    this.name = "UntrustedHostError";
  }
}

export class MarketConfigurationError extends Error {
  constructor(field: "NODE_ENV" | "trustedHosts" | "publicSiteUrls") {
    super(`Invalid market configuration: ${field}`);
    this.name = "MarketConfigurationError";
  }
}

function normalizeTrustedHost(host: string): string {
  try {
    return normalizeConfiguredHost(host);
  } catch {
    throw new UntrustedHostError();
  }
}

function validatePublicSiteUrl(url: URL): URL {
  try {
    return normalizeConfiguredUrl(url.href);
  } catch {
    throw new MarketConfigurationError("publicSiteUrls");
  }
}

function hostnameFromNormalizedHost(host: string): string {
  try {
    return new URL(`http://${host}`).hostname;
  } catch {
    throw new UntrustedHostError();
  }
}

function runtimeEnvironmentMode(): EnvironmentMode {
  switch (process.env.NODE_ENV) {
    case "development":
    case "production":
    case "test":
      return process.env.NODE_ENV;
    default:
      throw new MarketConfigurationError("NODE_ENV");
  }
}

function runtimeAliases(
  market: MarketCode,
  publicSiteUrl: URL,
): readonly string[] {
  if (publicSiteUrl.port || publicSiteUrl.hostname.startsWith("www.")) {
    return [];
  }

  if (
    (market === "uk" && publicSiteUrl.hostname === "infravolt.co.uk") ||
    (market === "ua" && publicSiteUrl.hostname.endsWith(".ua"))
  ) {
    return [`www.${publicSiteUrl.hostname}`];
  }

  return [];
}

export function createMarketResolver(
  configuration: MarketResolverConfiguration,
): MarketResolver {
  const trustedHosts = new Map<string, TrustedHost>();
  const publicSiteUrls = {
    uk: validatePublicSiteUrl(configuration.publicSiteUrls.uk),
    ua: validatePublicSiteUrl(configuration.publicSiteUrls.ua),
  } as const satisfies MarketUrlMap;

  function addTrustedHost(
    host: string,
    market: MarketCode,
    publicSiteUrl: URL,
    redirectToCanonical: boolean,
  ): void {
    const normalizedHost = normalizeTrustedHost(host);
    const existingHost = trustedHosts.get(normalizedHost);

    if (existingHost) {
      if (
        existingHost.market === market &&
        existingHost.publicSiteUrl.href === publicSiteUrl.href &&
        existingHost.redirectToCanonical === redirectToCanonical
      ) {
        return;
      }

      throw new MarketConfigurationError("trustedHosts");
    }

    trustedHosts.set(normalizedHost, {
      market,
      publicSiteUrl: new URL(publicSiteUrl.href),
      redirectToCanonical,
    });
  }

  for (const market of ["uk", "ua"] as const) {
    const publicSiteUrl = publicSiteUrls[market];

    addTrustedHost(publicSiteUrl.host, market, publicSiteUrl, false);

    for (const alias of configuration.aliases?.[market] ?? []) {
      addTrustedHost(alias, market, publicSiteUrl, true);
    }

    for (const previewUrl of configuration.previewSiteUrls?.[market] ?? []) {
      const normalizedPreviewUrl = validatePublicSiteUrl(previewUrl);
      addTrustedHost(
        normalizedPreviewUrl.host,
        market,
        normalizedPreviewUrl,
        false,
      );
    }
  }

  if (configuration.allowLocalHosts) {
    for (const market of ["uk", "ua"] as const) {
      addTrustedHost(
        LOCAL_SITE_URLS[market].host,
        market,
        LOCAL_SITE_URLS[market],
        false,
      );
    }
  }

  return Object.freeze({
    resolve(host: string): MarketResolution {
      const normalizedHost = normalizeTrustedHost(host);
      const hostname = hostnameFromNormalizedHost(normalizedHost);
      const localMarket =
        configuration.allowLocalHosts &&
        hostname === "uk.infravolt.localhost"
          ? "uk"
          : configuration.allowLocalHosts &&
              hostname === "ua.infravolt.localhost"
            ? "ua"
            : undefined;
      const trustedHost =
        trustedHosts.get(normalizedHost) ??
        (localMarket === undefined
          ? undefined
          : {
              market: localMarket,
              publicSiteUrl: LOCAL_SITE_URLS[localMarket],
              redirectToCanonical: false,
            });

      if (!trustedHost) {
        throw new UntrustedHostError();
      }

      const context: MarketContext = Object.freeze({
        market: trustedHost.market,
        locale: localeForMarket(trustedHost.market),
        host: normalizedHost,
        publicSiteUrl: new URL(trustedHost.publicSiteUrl.href),
      });

      return Object.freeze({
        context,
        redirectToCanonical: trustedHost.redirectToCanonical,
      });
    },
  });
}

export function createRuntimeMarketResolver(): MarketResolver {
  const mode = runtimeEnvironmentMode();
  const environment = readClientEnvironment(mode);
  const publicSiteUrls = {
    uk: environment.NEXT_PUBLIC_SITE_URL_UK ?? LOCAL_SITE_URLS.uk,
    ua: environment.NEXT_PUBLIC_SITE_URL_UA ?? LOCAL_SITE_URLS.ua,
  } as const satisfies MarketUrlMap;

  return createMarketResolver({
    publicSiteUrls,
    aliases: {
      uk: runtimeAliases("uk", publicSiteUrls.uk),
      ua: runtimeAliases("ua", publicSiteUrls.ua),
    },
    allowLocalHosts: mode !== "production",
  });
}

export function createTrustedMarketHeaders(
  incomingHeaders: Headers,
  context: MarketContext,
): Headers {
  const headers = new Headers(incomingHeaders);

  headers.delete("forwarded");
  headers.delete("x-forwarded-host");
  headers.delete(TRUSTED_MARKET_HEADERS.host);
  headers.delete(TRUSTED_MARKET_HEADERS.locale);
  headers.delete(TRUSTED_MARKET_HEADERS.market);
  headers.set(TRUSTED_MARKET_HEADERS.host, context.host);
  headers.set(TRUSTED_MARKET_HEADERS.locale, context.locale);
  headers.set(TRUSTED_MARKET_HEADERS.market, context.market);

  return headers;
}

export function resolveTrustedMarketContext(
  headers: HeaderReader,
  resolver: MarketResolver = createRuntimeMarketResolver(),
): MarketContext {
  const host = headers.get(TRUSTED_MARKET_HEADERS.host);
  const locale = headers.get(TRUSTED_MARKET_HEADERS.locale);
  const market = headers.get(TRUSTED_MARKET_HEADERS.market);

  if (!host || !locale || !market) {
    throw new UntrustedHostError();
  }

  const context = resolver.resolve(host).context;

  if (context.locale !== locale || context.market !== market) {
    throw new UntrustedHostError();
  }

  return context;
}

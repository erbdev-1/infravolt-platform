import "server-only";

import { readServerEnvironment } from "@/config/env/server";

const MARKET_DATA_REVALIDATE_SECONDS = 12 * 60 * 60;
const DOVIZ_API_GEREL_ENDPOINT = "https://doviz-api.onrender.com/api/GEREL";
const EODHD_GERLF_SYMBOL = "GERLF.US";

export type MarketMovement = "down" | "flat" | "up";

export type GersanMarketQuote = Readonly<{
  change: number | null;
  currency: "TRY" | "USD";
  exchange: "BIST" | "OTCQX";
  movement: MarketMovement | null;
  percentChange: number | null;
  price: number | null;
  symbol: "GEREL" | "GERLF";
}>;

export type GersanMarketData = Readonly<{
  gerel: GersanMarketQuote;
  gerlf: GersanMarketQuote;
}>;

const UNAVAILABLE_MARKET_DATA: GersanMarketData = {
  gerel: unavailableQuote("GEREL", "BIST", "TRY"),
  gerlf: unavailableQuote("GERLF", "OTCQX", "USD"),
};

function unavailableQuote(
  symbol: GersanMarketQuote["symbol"],
  exchange: GersanMarketQuote["exchange"],
  currency: GersanMarketQuote["currency"],
): GersanMarketQuote {
  return {
    change: null,
    currency,
    exchange,
    movement: null,
    percentChange: null,
    price: null,
    symbol,
  };
}

function finiteNumber(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function turkishMarketNumber(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;

  const compact = value
    .trim()
    .replace(/\s|\u00a0/gu, "")
    .replace(/[₺%]/gu, "")
    .replace(/−/gu, "-");
  const normalized = compact.includes(",")
    ? compact.replace(/\./gu, "").replace(",", ".")
    : compact;

  if (!/^[+-]?\d+(?:\.\d+)?$/u.test(normalized)) return null;

  return finiteNumber(normalized);
}

function movementFor(change: number): MarketMovement {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "flat";
}

function recordFrom(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function absoluteChangeFromPercent(
  price: number,
  percentChange: number,
): number | null {
  const denominator = 1 + percentChange / 100;
  if (denominator === 0) return null;

  const change = price - price / denominator;
  return Number.isFinite(change) ? change : null;
}

function quoteFromDovizApi(value: unknown): GersanMarketQuote | null {
  const payload = recordFrom(value);
  if (!payload || payload.success !== true || !Array.isArray(payload.data)) {
    return null;
  }

  const gerel = payload.data
    .map(recordFrom)
    .find(
      (item) =>
        typeof item?.name === "string" && item.name.trim().toUpperCase() === "GEREL",
    );
  if (!gerel) return null;

  const price = turkishMarketNumber(gerel.price);
  const percentChange = turkishMarketNumber(gerel.change);
  if (price === null || percentChange === null) return null;

  return {
    change: absoluteChangeFromPercent(price, percentChange),
    currency: "TRY",
    exchange: "BIST",
    movement: movementFor(percentChange),
    percentChange,
    price,
    symbol: "GEREL",
  };
}

function quoteFromEodhd(value: unknown): GersanMarketQuote | null {
  const payload = recordFrom(value);
  if (!payload || payload.code !== EODHD_GERLF_SYMBOL) return null;

  const price = finiteNumber(payload.close);
  const change = finiteNumber(payload.change);
  const percentChange = finiteNumber(payload.change_p);
  if (price === null || change === null || percentChange === null) return null;

  return {
    change,
    currency: "USD",
    exchange: "OTCQX",
    movement: movementFor(change),
    percentChange,
    price,
    symbol: "GERLF",
  };
}

async function fetchGerel(): Promise<GersanMarketQuote> {
  try {
    const response = await fetch(DOVIZ_API_GEREL_ENDPOINT, {
      next: {
        revalidate: MARKET_DATA_REVALIDATE_SECONDS,
        tags: ["gersan-market-data", "gersan-market-data-GEREL"],
      },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) return UNAVAILABLE_MARKET_DATA.gerel;

    return quoteFromDovizApi(await response.json()) ?? UNAVAILABLE_MARKET_DATA.gerel;
  } catch {
    return UNAVAILABLE_MARKET_DATA.gerel;
  }
}

async function fetchGerlf(apiKey: string | undefined): Promise<GersanMarketQuote> {
  if (!apiKey) return UNAVAILABLE_MARKET_DATA.gerlf;

  const endpoint = new URL(`https://eodhd.com/api/real-time/${EODHD_GERLF_SYMBOL}`);
  endpoint.searchParams.set("fmt", "json");
  endpoint.searchParams.set("api_token", apiKey);

  try {
    const response = await fetch(endpoint, {
      next: {
        revalidate: MARKET_DATA_REVALIDATE_SECONDS,
        tags: ["gersan-market-data", "gersan-market-data-GERLF"],
      },
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) return UNAVAILABLE_MARKET_DATA.gerlf;

    return quoteFromEodhd(await response.json()) ?? UNAVAILABLE_MARKET_DATA.gerlf;
  } catch {
    return UNAVAILABLE_MARKET_DATA.gerlf;
  }
}

export async function getGersanMarketData(): Promise<GersanMarketData> {
  const { EODHD_API_KEY: apiKey } = readServerEnvironment();
  const [gerel, gerlf] = await Promise.all([fetchGerel(), fetchGerlf(apiKey)]);

  return { gerel, gerlf };
}

import { strict as assert } from "node:assert";

import { NextRequest } from "next/server.js";

import { localeForMarket, MARKET_LOCALES } from "../src/modules/markets/locale.ts";
import {
  createMarketResolver,
  resolveTrustedMarketContext,
  createTrustedMarketHeaders,
  TRUSTED_MARKET_HEADERS,
  UntrustedHostError,
} from "../src/modules/markets/server.ts";

type Check = Readonly<{
  name: string;
  run: () => void | Promise<void>;
}>;

const resolver = createMarketResolver({
  publicSiteUrls: {
    uk: new URL("https://uk.example.test"),
    ua: new URL("https://ua.example.test"),
  },
  aliases: {
    uk: ["www.uk.example.test"],
    ua: ["www.ua.example.test"],
  },
  previewSiteUrls: {
    uk: [new URL("https://branch-preview.example.test")],
  },
  allowLocalHosts: true,
});

function expectUntrustedHost(host: string): void {
  assert.throws(
    () => resolver.resolve(host),
    (error: unknown) => {
      assert(error instanceof UntrustedHostError);
      assert(!error.message.includes(host));
      return true;
    },
  );
}

async function withProcessEnvironment(
  values: Readonly<Record<string, string | undefined>>,
  run: () => void | Promise<void>,
): Promise<void> {
  const previousValues = Object.fromEntries(
    Object.keys(values).map((variable) => [variable, process.env[variable]]),
  );

  for (const [variable, value] of Object.entries(values)) {
    if (value === undefined) {
      delete process.env[variable];
    } else {
      process.env[variable] = value;
    }
  }

  try {
    await run();
  } finally {
    for (const [variable, value] of Object.entries(previousValues)) {
      if (value === undefined) {
        delete process.env[variable];
      } else {
        process.env[variable] = value;
      }
    }
  }
}

const checks: readonly Check[] = [
  {
    name: "UK and UA configured hosts resolve their required locales",
    run: () => {
      const uk = resolver.resolve("UK.EXAMPLE.TEST.").context;
      const ua = resolver.resolve("ua.example.test").context;

      assert.equal(uk.market, "uk");
      assert.equal(uk.locale, "en-GB");
      assert.equal(uk.host, "uk.example.test");
      assert.equal(uk.publicSiteUrl.href, "https://uk.example.test/");
      assert.equal(ua.market, "ua");
      assert.equal(ua.locale, "uk-UA");
      assert.equal(ua.publicSiteUrl.href, "https://ua.example.test/");
    },
  },
  {
    name: "www aliases resolve to the canonical market and require redirect",
    run: () => {
      const ukAlias = resolver.resolve("www.uk.example.test");
      const uaAlias = resolver.resolve("www.ua.example.test");

      assert.equal(ukAlias.context.market, "uk");
      assert.equal(ukAlias.redirectToCanonical, true);
      assert.equal(ukAlias.context.publicSiteUrl.host, "uk.example.test");
      assert.equal(uaAlias.context.market, "ua");
      assert.equal(uaAlias.redirectToCanonical, true);
      assert.equal(uaAlias.context.publicSiteUrl.host, "ua.example.test");
    },
  },
  {
    name: "approved local aliases accept explicit ports without cross-market fallback",
    run: () => {
      const uk = resolver.resolve("uk.infravolt.localhost:3100").context;
      const ua = resolver.resolve("UA.INFRAVOLT.LOCALHOST.:3200").context;

      assert.equal(uk.market, "uk");
      assert.equal(uk.locale, "en-GB");
      assert.equal(uk.host, "uk.infravolt.localhost:3100");
      assert.equal(ua.market, "ua");
      assert.equal(ua.locale, "uk-UA");
      assert.equal(ua.host, "ua.infravolt.localhost:3200");
      expectUntrustedHost("localhost:3000");
    },
  },
  {
    name: "preview hosts require explicit configuration and remain market-bound",
    run: () => {
      const preview = resolver.resolve("branch-preview.example.test");

      assert.equal(preview.context.market, "uk");
      assert.equal(preview.context.locale, "en-GB");
      assert.equal(preview.redirectToCanonical, false);
      expectUntrustedHost("arbitrary-preview.example.test");
    },
  },
  {
    name: "unknown and malformed hosts fail safely without value disclosure",
    run: () => {
      for (const host of [
        "unknown.example.test",
        "https://uk.example.test/private",
        "uk.example.test,ua.example.test",
        "user@uk.example.test",
      ]) {
        expectUntrustedHost(host);
      }
    },
  },
  {
    name: "trusted headers overwrite spoofed market and locale values",
    run: () => {
      const incoming = new Headers({
        [TRUSTED_MARKET_HEADERS.host]: "ua.example.test",
        [TRUSTED_MARKET_HEADERS.locale]: "uk-UA",
        [TRUSTED_MARKET_HEADERS.market]: "ua",
        "x-forwarded-host": "malformed forwarded host",
      });
      const headers = createTrustedMarketHeaders(
        incoming,
        resolver.resolve("uk.example.test").context,
      );

      assert.equal(headers.get(TRUSTED_MARKET_HEADERS.host), "uk.example.test");
      assert.equal(headers.get(TRUSTED_MARKET_HEADERS.locale), "en-GB");
      assert.equal(headers.get(TRUSTED_MARKET_HEADERS.market), "uk");
      assert.equal(headers.get("x-forwarded-host"), null);
    },
  },
  {
    name: "locale contract is exact and market-owned",
    run: () => {
      assert.deepEqual(MARKET_LOCALES, { uk: "en-GB", ua: "uk-UA" });
      assert.equal(localeForMarket("uk"), "en-GB");
      assert.equal(localeForMarket("ua"), "uk-UA");
    },
  },
  {
    name: "trusted server context is revalidated before locale consumption",
    run: () => {
      const uaContext = resolver.resolve("ua.example.test").context;
      const headers = createTrustedMarketHeaders(new Headers(), uaContext);

      assert.equal(resolveTrustedMarketContext(headers, resolver).locale, "uk-UA");

      headers.set(TRUSTED_MARKET_HEADERS.market, "uk");
      assert.throws(
        () => resolveTrustedMarketContext(headers, resolver),
        UntrustedHostError,
      );
    },
  },
  {
    name: "returned URLs cannot mutate future resolver results",
    run: () => {
      const first = resolver.resolve("uk.example.test").context;

      first.publicSiteUrl.hostname = "mutated.example.test";

      assert.equal(
        resolver.resolve("uk.example.test").context.publicSiteUrl.hostname,
        "uk.example.test",
      );
    },
  },
  {
    name: "production proxy rejects unknown hosts without query or host disclosure",
    run: () =>
      withProcessEnvironment(
        {
          NODE_ENV: "production",
          NEXT_PUBLIC_SITE_URL_UK: "https://infravolt.co.uk",
          NEXT_PUBLIC_SITE_URL_UA: "https://ua.example.test",
        },
        async () => {
          const { proxy } = await import("../src/proxy.ts");
          const request = new NextRequest(
            "https://unknown.example.test/?market=uk&private=fixture",
            { headers: { host: "unknown.example.test" } },
          );
          const response = proxy(request);
          const body = await response.text();

          assert.equal(response.status, 404);
          assert.equal(response.headers.get("cache-control"), "no-store");
          assert.equal(body, "Not Found");
          assert(!body.includes("unknown.example.test"));
          assert(!body.includes("private=fixture"));
        },
      ),
  },
  {
    name: "production proxy redirects the UK www alias to its canonical origin",
    run: () =>
      withProcessEnvironment(
        {
          NODE_ENV: "production",
          NEXT_PUBLIC_SITE_URL_UK: "https://infravolt.co.uk",
          NEXT_PUBLIC_SITE_URL_UA: "https://ua.example.test",
        },
        async () => {
          const { proxy } = await import("../src/proxy.ts");
          const request = new NextRequest(
            "https://www.infravolt.co.uk/products?ref=safe-fixture",
            { headers: { host: "www.infravolt.co.uk" } },
          );
          const response = proxy(request);

          assert.equal(response.status, 308);
          assert.equal(
            response.headers.get("location"),
            "https://infravolt.co.uk/products?ref=safe-fixture",
          );
        },
      ),
  },
  {
    name: "query, form, forwarded and internal headers cannot override request host",
    run: () =>
      withProcessEnvironment(
        {
          NODE_ENV: "development",
          NEXT_PUBLIC_SITE_URL_UK: undefined,
          NEXT_PUBLIC_SITE_URL_UA: undefined,
        },
        async () => {
          const { proxy } = await import("../src/proxy.ts");
          const request = new NextRequest(
            "http://uk.infravolt.localhost:3000/?market=ua",
            {
              method: "POST",
              body: "market=ua",
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                host: "uk.infravolt.localhost:3000",
                "x-forwarded-host": "ua.infravolt.localhost:3000",
                [TRUSTED_MARKET_HEADERS.locale]: "uk-UA",
                [TRUSTED_MARKET_HEADERS.market]: "ua",
              },
            },
          );
          const response = proxy(request);

          assert.equal(response.status, 200);
          assert.equal(
            response.headers.get(
              `x-middleware-request-${TRUSTED_MARKET_HEADERS.market}`,
            ),
            "uk",
          );
          assert.equal(
            response.headers.get(
              `x-middleware-request-${TRUSTED_MARKET_HEADERS.locale}`,
            ),
            "en-GB",
          );
        },
      ),
  },
];

for (const check of checks) {
  await check.run();
  console.log(`PASS: ${check.name}`);
}

console.log(`Market context verification passed (${checks.length} checks).`);

import { strict as assert } from "node:assert";

import { FEATURE_FLAG_REGISTRY } from "../src/config/features/registry.ts";
import {
  createFeatureFlagResolver,
  FeatureFlagError,
  isFeatureEnabled,
  resolveFeatureFlags,
} from "../src/config/features/server.ts";
import { createMarketResolver } from "../src/modules/markets/server.ts";

import type {
  FeatureFlagContext,
  FeatureFlagName,
  FeatureFlagOverrides,
} from "../src/config/features/types.ts";

type Check = Readonly<{
  name: string;
  run: () => void;
}>;

const expectedFlagNames = [
  "ukraineMarketEnabled",
  "partnerPortalEnabled",
  "productComparatorEnabled",
] as const satisfies readonly FeatureFlagName[];

const marketResolver = createMarketResolver({
  publicSiteUrls: {
    uk: new URL("https://uk.example.test"),
    ua: new URL("https://ua.example.test"),
  },
});
const ukContext = marketResolver.resolve("uk.example.test").context;
const uaContext = marketResolver.resolve("ua.example.test").context;

function expectFeatureFlagError(
  run: () => unknown,
  code: FeatureFlagError["code"],
  forbiddenValue?: string,
): void {
  assert.throws(run, (error: unknown) => {
    assert(error instanceof FeatureFlagError);
    assert.equal(error.code, code);

    if (forbiddenValue) {
      assert(!error.message.includes(forbiddenValue));
    }

    return true;
  });
}

const checks: readonly Check[] = [
  {
    name: "canonical registry exposes only the approved literal flag names",
    run: () => {
      assert.deepEqual(Object.keys(FEATURE_FLAG_REGISTRY), expectedFlagNames);
    },
  },
  {
    name: "all canonical flags resolve disabled by default in both markets",
    run: () => {
      assert.deepEqual(resolveFeatureFlags(ukContext), {
        ukraineMarketEnabled: false,
        partnerPortalEnabled: false,
        productComparatorEnabled: false,
      });
      assert.deepEqual(resolveFeatureFlags(uaContext), {
        ukraineMarketEnabled: false,
        partnerPortalEnabled: false,
        productComparatorEnabled: false,
      });

      for (const flagName of expectedFlagNames) {
        assert.equal(isFeatureEnabled(flagName, ukContext), false);
        assert.equal(isFeatureEnabled(flagName, uaContext), false);
      }
    },
  },
  {
    name: "unknown flag names fail safely without value disclosure",
    run: () => {
      const unknownFlag = "unknown-private-fixture";

      expectFeatureFlagError(
        () => isFeatureEnabled(unknownFlag as FeatureFlagName, ukContext),
        "UNKNOWN_FLAG",
        unknownFlag,
      );
    },
  },
  {
    name: "unknown and invalid server overrides fail without value disclosure",
    run: () => {
      const unknownFlag = "unknown-override-private-fixture";
      const invalidValue = "enabled-private-fixture";

      expectFeatureFlagError(
        () =>
          createFeatureFlagResolver({
            [unknownFlag]: true,
          } as FeatureFlagOverrides),
        "INVALID_OVERRIDE",
        unknownFlag,
      );
      expectFeatureFlagError(
        () =>
          createFeatureFlagResolver({
            partnerPortalEnabled: invalidValue,
          } as unknown as FeatureFlagOverrides),
        "INVALID_OVERRIDE",
        invalidValue,
      );
    },
  },
  {
    name: "Ukraine release override remains disabled outside the UA market",
    run: () => {
      const resolver = createFeatureFlagResolver({
        ukraineMarketEnabled: true,
      });

      assert.equal(
        resolver.isFeatureEnabled("ukraineMarketEnabled", uaContext),
        true,
      );
      assert.equal(
        resolver.isFeatureEnabled("ukraineMarketEnabled", ukContext),
        false,
      );
    },
  },
  {
    name: "server-owned overrides enable only explicitly named release flags",
    run: () => {
      const resolver = createFeatureFlagResolver({
        partnerPortalEnabled: true,
      });
      const resolved = resolver.resolveFeatureFlags(ukContext);

      assert.deepEqual(resolved, {
        ukraineMarketEnabled: false,
        partnerPortalEnabled: true,
        productComparatorEnabled: false,
      });
    },
  },
  {
    name: "query, form, cookie and header values cannot override defaults",
    run: () => {
      const hostileContext = {
        ...ukContext,
        query: { partnerPortalEnabled: "true" },
        form: { productComparatorEnabled: "true" },
        cookie: "ukraineMarketEnabled=true",
        forwarded: "partnerPortalEnabled=true",
        headers: { "x-feature-flag": "productComparatorEnabled" },
      } as const satisfies FeatureFlagContext & Record<string, unknown>;

      assert.deepEqual(resolveFeatureFlags(hostileContext), {
        ukraineMarketEnabled: false,
        partnerPortalEnabled: false,
        productComparatorEnabled: false,
      });
    },
  },
  {
    name: "invalid market context fails safely",
    run: () => {
      const invalidMarket = "private-market-fixture";

      expectFeatureFlagError(
        () =>
          resolveFeatureFlags({
            market: invalidMarket,
          } as unknown as FeatureFlagContext),
        "INVALID_CONTEXT",
        invalidMarket,
      );
    },
  },
  {
    name: "registry, metadata, resolver and resolution objects are immutable",
    run: () => {
      const resolver = createFeatureFlagResolver();
      const resolved = resolver.resolveFeatureFlags(ukContext);

      assert(Object.isFrozen(FEATURE_FLAG_REGISTRY));
      assert(
        Object.values(FEATURE_FLAG_REGISTRY).every(
          (definition) =>
            Object.isFrozen(definition) &&
            Object.isFrozen(definition.allowedMarkets),
        ),
      );
      assert(Object.isFrozen(resolver));
      assert(Object.isFrozen(resolved));
      assert.throws(() => {
        (resolved as { partnerPortalEnabled: boolean }).partnerPortalEnabled =
          true;
      });
    },
  },
  {
    name: "registry contains release controls rather than operational config",
    run: () => {
      assert(
        Object.values(FEATURE_FLAG_REGISTRY).every(
          (definition) =>
            definition.kind === "release" &&
            definition.defaultEnabled === false &&
            definition.cleanupOwner === "product-owner",
        ),
      );
      assert(
        Object.keys(FEATURE_FLAG_REGISTRY).every(
          (flagName) => !flagName.startsWith("NEXT_PUBLIC_"),
        ),
      );
    },
  },
];

for (const check of checks) {
  check.run();
  console.log(`PASS: ${check.name}`);
}

console.log(`Feature flag verification passed (${checks.length} checks).`);

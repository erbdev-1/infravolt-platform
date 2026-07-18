import "server-only";

import { FEATURE_FLAG_REGISTRY } from "./registry.ts";

import type {
  FeatureFlagContext,
  FeatureFlagName,
  FeatureFlagOverrides,
  FeatureFlagResolver,
  ResolvedFeatureFlags,
} from "./types";

const FEATURE_FLAG_NAMES = Object.freeze(
  Object.keys(FEATURE_FLAG_REGISTRY) as FeatureFlagName[],
);

export type FeatureFlagErrorCode =
  | "INVALID_CONTEXT"
  | "INVALID_OVERRIDE"
  | "UNKNOWN_FLAG";

export class FeatureFlagError extends Error {
  readonly code: FeatureFlagErrorCode;

  constructor(code: FeatureFlagErrorCode) {
    super(`Feature flag evaluation failed: ${code}`);
    this.name = "FeatureFlagError";
    this.code = code;
  }
}

function isFeatureFlagName(value: unknown): value is FeatureFlagName {
  return (
    typeof value === "string" &&
    Object.hasOwn(FEATURE_FLAG_REGISTRY, value)
  );
}

function validateContext(context: FeatureFlagContext): void {
  if (
    typeof context !== "object" ||
    context === null ||
    typeof context.host !== "string" ||
    context.host.length === 0 ||
    !(context.publicSiteUrl instanceof URL) ||
    (context.market === "uk" && context.locale !== "en-GB") ||
    (context.market === "ua" && context.locale !== "uk-UA") ||
    (context.market !== "uk" && context.market !== "ua")
  ) {
    throw new FeatureFlagError("INVALID_CONTEXT");
  }
}

function validateOverrides(
  overrides: FeatureFlagOverrides,
): FeatureFlagOverrides {
  if (
    typeof overrides !== "object" ||
    overrides === null ||
    Array.isArray(overrides) ||
    (Object.getPrototypeOf(overrides) !== Object.prototype &&
      Object.getPrototypeOf(overrides) !== null)
  ) {
    throw new FeatureFlagError("INVALID_OVERRIDE");
  }

  const validatedOverrides: Partial<Record<FeatureFlagName, boolean>> = {};

  for (const [flagName, value] of Object.entries(overrides)) {
    if (!isFeatureFlagName(flagName) || typeof value !== "boolean") {
      throw new FeatureFlagError("INVALID_OVERRIDE");
    }

    validatedOverrides[flagName] = value;
  }

  return Object.freeze(validatedOverrides);
}

export function createFeatureFlagResolver(
  overrides: FeatureFlagOverrides = {},
): FeatureFlagResolver {
  const validatedOverrides = validateOverrides(overrides);

  function isFeatureEnabled(
    flagName: FeatureFlagName,
    context: FeatureFlagContext,
  ): boolean {
    if (!isFeatureFlagName(flagName)) {
      throw new FeatureFlagError("UNKNOWN_FLAG");
    }

    validateContext(context);

    const definition = FEATURE_FLAG_REGISTRY[flagName];

    if (!definition.allowedMarkets.includes(context.market)) {
      return false;
    }

    return validatedOverrides[flagName] ?? definition.defaultEnabled;
  }

  function resolveFeatureFlags(
    context: FeatureFlagContext,
  ): ResolvedFeatureFlags {
    validateContext(context);

    return Object.freeze(
      Object.fromEntries(
        FEATURE_FLAG_NAMES.map((flagName) => [
          flagName,
          isFeatureEnabled(flagName, context),
        ]),
      ) as Record<FeatureFlagName, boolean>,
    );
  }

  return Object.freeze({ isFeatureEnabled, resolveFeatureFlags });
}

const defaultFeatureFlagResolver = createFeatureFlagResolver();

export function isFeatureEnabled(
  flagName: FeatureFlagName,
  context: FeatureFlagContext,
): boolean {
  return defaultFeatureFlagResolver.isFeatureEnabled(flagName, context);
}

export function resolveFeatureFlags(
  context: FeatureFlagContext,
): ResolvedFeatureFlags {
  return defaultFeatureFlagResolver.resolveFeatureFlags(context);
}

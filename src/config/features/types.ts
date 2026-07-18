import type { FEATURE_FLAG_REGISTRY } from "./registry";
import type { MarketContext } from "../../modules/markets/types";

export type FeatureFlagName = keyof typeof FEATURE_FLAG_REGISTRY;

export type FeatureFlagContext = MarketContext;

export type FeatureFlagOverrides = Readonly<
  Partial<Record<FeatureFlagName, boolean>>
>;

export type ResolvedFeatureFlags = Readonly<
  Record<FeatureFlagName, boolean>
>;

export type FeatureFlagResolver = Readonly<{
  isFeatureEnabled: (
    flagName: FeatureFlagName,
    context: FeatureFlagContext,
  ) => boolean;
  resolveFeatureFlags: (context: FeatureFlagContext) => ResolvedFeatureFlags;
}>;

import "server-only";

import type { MarketCode } from "../../modules/markets/types";

type FeatureReleaseStage = "R2" | "R3" | "R4/V1";
type FeatureReviewMilestone = "G7" | "R3" | "R4/V1";

type FeatureFlagDefinition = Readonly<{
  kind: "release";
  defaultEnabled: false;
  releaseStage: FeatureReleaseStage;
  allowedMarkets: readonly MarketCode[];
  description: string;
  cleanupOwner: "product-owner";
  reviewMilestone: FeatureReviewMilestone;
}>;

function releaseFlag(
  definition: Omit<FeatureFlagDefinition, "kind" | "defaultEnabled">,
): FeatureFlagDefinition {
  return Object.freeze({
    kind: "release",
    defaultEnabled: false,
    ...definition,
    allowedMarkets: Object.freeze([...definition.allowedMarkets]),
  });
}

export const FEATURE_FLAG_REGISTRY = Object.freeze({
  ukraineMarketEnabled: releaseFlag({
    releaseStage: "R2",
    allowedMarkets: ["ua"],
    description: "Controls the gated Ukraine market release.",
    cleanupOwner: "product-owner",
    reviewMilestone: "G7",
  }),
  partnerPortalEnabled: releaseFlag({
    releaseStage: "R3",
    allowedMarkets: ["uk", "ua"],
    description: "Controls the gated company-scoped partner portal release.",
    cleanupOwner: "product-owner",
    reviewMilestone: "R3",
  }),
  productComparatorEnabled: releaseFlag({
    releaseStage: "R4/V1",
    allowedMarkets: ["uk", "ua"],
    description: "Controls the deferred product comparator release.",
    cleanupOwner: "product-owner",
    reviewMilestone: "R4/V1",
  }),
} as const satisfies Readonly<Record<string, FeatureFlagDefinition>>);

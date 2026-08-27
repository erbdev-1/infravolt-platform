import type { CableManagementVariant } from "@/data/products/cable-management/types";
import type { EarthingProductVariant } from "@/data/products/earthing-lightning/types";
import type { LedSeriesModel } from "@/data/products/led-lighting/types";
import type { UnderfloorVariant } from "@/data/products/underfloor/series-detail-types";

import type { EnquiryItem } from "./types";

function encodedIdentity(parts: readonly unknown[]): string {
  return parts.map((part) => encodeURIComponent(String(part ?? ""))).join(":");
}

export function cableEnquiryItem(familySlug: string, familyName: string, variant: CableManagementVariant, sourceRoute: string): EnquiryItem {
  const canonicalFamilySlug = familySlug === "threaded-rods-anchors-fixings"
    ? "screw-sets-threaded-rods-anchors"
    : familySlug;
  const identity = encodedIdentity([
    canonicalFamilySlug,
    variant.stockCode,
    variant.model,
    variant.widthMm,
    variant.heightMm,
    variant.thicknessMm,
    variant.lengthMm,
    variant.material,
  ]);
  return {
    id: `cable-management:${identity}`,
    title: variant.family ? `${variant.name} · ${variant.family}` : variant.name,
    system: "cable-management",
    model: `${variant.model} · ${variant.stockCode}`,
    categoryLabel: familyName,
    sourceRoute,
  };
}

export function earthingEnquiryItem(categorySlug: string, familySlug: string, familyName: string, variant: EarthingProductVariant, sourceRoute: string): EnquiryItem {
  const identity = encodedIdentity([
    categorySlug,
    familySlug,
    variant.stockCode,
    variant.model,
    variant.dimensions,
    variant.material,
    variant.weight,
  ]);
  return {
    id: `earthing-lightning:${identity}`,
    title: variant.name,
    system: "earthing-lightning",
    model: `${variant.model} · ${variant.stockCode}`,
    categoryLabel: familyName,
    sourceRoute,
  };
}

export function ledEnquiryItem(seriesSlug: string, seriesTitle: string, model: LedSeriesModel, modelIndex: number, sourceRoute: string): EnquiryItem {
  return {
    id: `led-systems:${seriesSlug}:${model.model}:${model.powerW}:${modelIndex}`,
    title: model.model,
    system: "led-systems",
    model: model.powerDisplay ?? `${model.powerW} W`,
    categoryLabel: seriesTitle,
    sourceRoute,
  };
}

// groupId must be the stable UnderfloorVariantGroup.id, never the
// translated group.name — the identity has to stay identical for the
// same physical part regardless of market/locale (see
// UnderfloorVariantGroup.id in series-detail-types.ts).
export function underfloorEnquiryItem(seriesSlug: string, seriesName: string, groupId: string, variant: UnderfloorVariant, sourceRoute: string): EnquiryItem {
  const identity = encodedIdentity([seriesSlug, groupId, variant.stockCode, variant.model]);
  return {
    id: `underfloor:${identity}`,
    title: variant.productName,
    system: "underfloor",
    model: `${variant.model} · ${variant.stockCode}`,
    categoryLabel: seriesName,
    sourceRoute,
  };
}

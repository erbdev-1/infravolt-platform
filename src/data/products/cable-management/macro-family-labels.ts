import type { MarketCode } from "@/modules/markets/types";

import type { CableMacroFamilyLabels } from "./macro-family-types";

// Shared chrome text for every macro-family page (Support & Hanging, Cable
// Trays & Trunking, Cable Ladders, Wire-Mesh, Conduit & Pipe, Accessories
// & Fixings) — identical wording across all six groups, so defined once
// and selected by market the same way CABLE_MANAGEMENT_LABELS is for the
// variant-family/schedule-table side of this product line.
const CABLE_MACRO_FAMILY_LABELS_BY_MARKET: Readonly<Record<MarketCode, CableMacroFamilyLabels>> = {
  uk: {
    backButtonLabel: "Back to Cable Management Systems",
    technicalSnapshotSuffix: "technical snapshot",
    imageOnRequestLabel: "Image on request",
    orderCodesOnRequestLabel: "Order codes on request",
    orderCodeCountSuffix: "order codes",
    viewSeriesLabel: "View series →",
    seriesComingSoonLabel: "Series page coming soon",
    viewCompatibleLabel: "View →",
  },
  ua: {
    backButtonLabel: "До кабеленесучих систем",
    technicalSnapshotSuffix: "технічний огляд",
    imageOnRequestLabel: "Зображення на запит",
    orderCodesOnRequestLabel: "Коди замовлення на запит",
    orderCodeCountSuffix: "кодів замовлення",
    viewSeriesLabel: "Переглянути серію →",
    seriesComingSoonLabel: "Сторінка серії незабаром",
    viewCompatibleLabel: "Переглянути →",
  },
};

export function cableMacroFamilyLabelsForMarket(market: MarketCode): CableMacroFamilyLabels {
  return CABLE_MACRO_FAMILY_LABELS_BY_MARKET[market];
}

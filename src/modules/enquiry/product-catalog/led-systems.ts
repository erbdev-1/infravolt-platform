import type { LedSeriesDetailContent } from "@/data/products/led-lighting/types";
import { architecturalRingContentForMarket, decorativeBollardContentForMarket, decorativePoleContentForMarket, parkLandscapeContentForMarket, rnDecorativeContentForMarket, roundRingContentForMarket, squareRingContentForMarket, vlDecorativeContentForMarket } from "@/data/products/led-lighting/series/decorative-series";
import { arlExitSignContentForMarket, elhHighOutputContentForMarket, emergencyLinearBulkheadContentForMarket, emlTwinSpotContentForMarket, hplExitGuidanceContentForMarket, malExitSignContentForMarket, srsExitGuidanceContentForMarket } from "@/data/products/led-lighting/series/emergency-guidance-series";
import { gerLedHighCeilingContentForMarket } from "@/data/products/led-lighting/series/ger-led-high-ceiling";
import { gerLedIndustrialHighCeilingContentForMarket } from "@/data/products/led-lighting/series/ger-led-industrial-high-ceiling";
import { gerLedSmartStreetLightingContentForMarket } from "@/data/products/led-lighting/series/ger-led-smart-street-lighting";
import { gBusPlcAutomationContentForMarket } from "@/data/products/led-lighting/series/g-bus-plc-automation";
import { gslTunnelLightingSystemsContentForMarket } from "@/data/products/led-lighting/series/gsl-tunnel-lighting-systems";
import { ledBusEtangeCarparkContentForMarket } from "@/data/products/led-lighting/series/led-bus-etange-carpark";
import { ledBusEtanjPcContentForMarket } from "@/data/products/led-lighting/series/led-bus-etanj-pc";
import { ledBusHighCeilingContentForMarket } from "@/data/products/led-lighting/series/led-bus-high-ceiling";
import { ledBusLdbFlContentForMarket } from "@/data/products/led-lighting/series/led-bus-ldb-fl";
import { ledBusLdbeContentForMarket } from "@/data/products/led-lighting/series/led-bus-ldbe";
import { ledBusLdbseContentForMarket } from "@/data/products/led-lighting/series/led-bus-ldbse";
import { ledBusStepdimWaterproofContentForMarket } from "@/data/products/led-lighting/series/led-bus-stepdim-waterproof";
import { lnr105ConfigurationsForMarket, lnr33dConfigurationsForMarket, lnr55ConfigurationsForMarket, lnr85ConfigurationsForMarket, lnrConfigurationsForMarket, lwConfigurationsForMarket, multilineConfigurationsForMarket } from "@/data/products/led-lighting/series/linear-trunking-series";
import { kmxLightingConfigurationsForMarket, projectorLightingConfigurationsForMarket, streetLightingConfigurationsForMarket, wallWasherSeriesContentForMarket } from "@/data/products/led-lighting/series/outdoor-infrastructure-series";
import { dpnlConfigurationsForMarket, drpnlConfigurationsForMarket, hjpnlConfigurationsForMarket, ipnlConfigurationsForMarket, ledBusPanelContentForMarket, pnlConfigurationsForMarket, twpnlConfigurationsForMarket } from "@/data/products/led-lighting/series/panel-series";
import { autoLedSeriesContentForMarket, exproofSeriesContentForMarket, seraLedSeriesContentForMarket, texLedSeriesContentForMarket } from "@/data/products/led-lighting/series/special-hazardous-series";
import { boomBoltonConfigurationsForMarket, compactConfigurationsForMarket, cylConfigurationsForMarket, cylpConfigurationsForMarket, cytmCyptmConfigurationsForMarket, frameConfigurationsForMarket, lnrtConfigurationsForMarket, mcrhConfigurationsForMarket, mcrsConfigurationsForMarket, moonJptConfigurationsForMarket, stnConfigurationsForMarket } from "@/data/products/led-lighting/series/track-downlight-series";
import { ledEnquiryItem } from "@/modules/enquiry/item-builders";
import type { MarketCode } from "@/modules/markets/types";

import type { EnquiryProductFamily, EnquiryProductOption } from "../product-catalog";

type SeriesSource = Readonly<{ slug: string; category: string; contents: readonly LedSeriesDetailContent[] }>;

function familyFromSource(source: SeriesSource): EnquiryProductFamily | undefined {
  const primary = source.contents[0];
  if (!primary) return undefined;
  const sourceRoute = `/products/led-systems/${source.category}/${source.slug}`;
  const seen = new Set<string>();
  const options: EnquiryProductOption[] = [];
  for (const content of source.contents) {
    content.models?.forEach((model, modelIndex) => {
      const item = ledEnquiryItem(source.slug, primary.hero.title, model, modelIndex, sourceRoute);
      if (seen.has(item.id)) return;
      seen.add(item.id);
      options.push({ value: item.id, label: model.model, meta: model.powerDisplay ?? `${model.powerW} W`, item });
    });
    content.componentSchedule?.items.forEach((component, index) => {
      const item = {
        id: `led-systems:${source.slug}:component:${component.code}:${index}`,
        title: component.description,
        system: "led-systems" as const,
        model: component.code,
        categoryLabel: primary.hero.title,
        sourceRoute,
      };
      if (seen.has(item.id)) return;
      seen.add(item.id);
      options.push({ value: item.id, label: component.description, meta: component.code, item });
    });
  }
  return options.length ? { value: source.slug, label: primary.hero.title, options } : undefined;
}

export function ledFamilies(market: MarketCode): readonly EnquiryProductFamily[] {
  const config = <T extends ReadonlyArray<{ content: LedSeriesDetailContent }>>(items: T) => items.map((item) => item.content);
  const exproof = exproofSeriesContentForMarket(market);
  const sources: readonly SeriesSource[] = [
    { slug: "led-bus-ldbe", category: "industrial-high-bay-lighting", contents: [ledBusLdbeContentForMarket(market)] },
    { slug: "led-bus-ldbse", category: "industrial-high-bay-lighting", contents: [ledBusLdbseContentForMarket(market)] },
    { slug: "led-bus-ldb-fl", category: "industrial-high-bay-lighting", contents: [ledBusLdbFlContentForMarket(market)] },
    { slug: "led-bus-high-ceiling", category: "industrial-high-bay-lighting", contents: [ledBusHighCeilingContentForMarket(market)] },
    { slug: "ger-led-high-ceiling", category: "industrial-high-bay-lighting", contents: [gerLedHighCeilingContentForMarket(market)] },
    { slug: "ger-led-industrial-high-ceiling", category: "industrial-high-bay-lighting", contents: [gerLedIndustrialHighCeilingContentForMarket(market)] },
    { slug: "led-bus-panel-lighting-systems", category: "panel-lighting", contents: [ledBusPanelContentForMarket(market)] },
    { slug: "dpnl-series", category: "panel-lighting", contents: config(dpnlConfigurationsForMarket(market)) },
    { slug: "drpnl-series", category: "panel-lighting", contents: config(drpnlConfigurationsForMarket(market)) },
    { slug: "hjpnl-series", category: "panel-lighting", contents: config(hjpnlConfigurationsForMarket(market)) },
    { slug: "ipnl-series", category: "panel-lighting", contents: config(ipnlConfigurationsForMarket(market)) },
    { slug: "pnl-series", category: "panel-lighting", contents: config(pnlConfigurationsForMarket(market)) },
    { slug: "twpnl-series", category: "panel-lighting", contents: config(twpnlConfigurationsForMarket(market)) },
    { slug: "linner-lnr-lnrsa", category: "linear-trunking-lighting", contents: config(lnrConfigurationsForMarket(market)) },
    { slug: "linner-lnr55", category: "linear-trunking-lighting", contents: config(lnr55ConfigurationsForMarket(market)) },
    { slug: "linner-lnr85", category: "linear-trunking-lighting", contents: config(lnr85ConfigurationsForMarket(market)) },
    { slug: "linner-lnr105", category: "linear-trunking-lighting", contents: config(lnr105ConfigurationsForMarket(market)) },
    { slug: "linner-lnr33d", category: "linear-trunking-lighting", contents: config(lnr33dConfigurationsForMarket(market)) },
    { slug: "lw-wp-architectural-linear", category: "linear-trunking-lighting", contents: config(lwConfigurationsForMarket(market)) },
    { slug: "multiline-45", category: "linear-trunking-lighting", contents: config(multilineConfigurationsForMarket(market)) },
    { slug: "ger-led-street-lighting-systems", category: "outdoor-infrastructure-lighting", contents: config(streetLightingConfigurationsForMarket(market)) },
    { slug: "ger-led-projector-lighting-systems", category: "outdoor-infrastructure-lighting", contents: config(projectorLightingConfigurationsForMarket(market)) },
    { slug: "led-bus-ldb-kmx-canopy-lighting-systems", category: "outdoor-infrastructure-lighting", contents: config(kmxLightingConfigurationsForMarket(market)) },
    { slug: "ger-led-wall-washer-lighting-systems", category: "outdoor-infrastructure-lighting", contents: [wallWasherSeriesContentForMarket(market)] },
    { slug: "gsl-tunnel-lighting-systems", category: "outdoor-infrastructure-lighting", contents: [gslTunnelLightingSystemsContentForMarket(market)] },
    { slug: "led-bus-etange-carpark", category: "parking-waterproof-lighting", contents: [ledBusEtangeCarparkContentForMarket(market)] },
    { slug: "led-bus-etanj-pc", category: "parking-waterproof-lighting", contents: [ledBusEtanjPcContentForMarket(market)] },
    { slug: "led-bus-stepdim-waterproof", category: "parking-waterproof-lighting", contents: [ledBusStepdimWaterproofContentForMarket(market)] },
    { slug: "g-bus-plc-automation", category: "smart-lighting-automation", contents: [gBusPlcAutomationContentForMarket(market)] },
    { slug: "ger-led-smart-street-lighting", category: "smart-lighting-automation", contents: [gerLedSmartStreetLightingContentForMarket(market)] },
    { slug: "gersan-exproof-led-lighting-systems", category: "special-hazardous-environment-lighting", contents: [exproof.ldbexp, exproof.gslExp] },
    { slug: "gersan-sera-led-greenhouse-luminaires", category: "special-hazardous-environment-lighting", contents: [seraLedSeriesContentForMarket(market)] },
    { slug: "gersan-tex-led-lighting-systems", category: "special-hazardous-environment-lighting", contents: [texLedSeriesContentForMarket(market)] },
    { slug: "gersan-auto-led-lighting-systems", category: "special-hazardous-environment-lighting", contents: [autoLedSeriesContentForMarket(market)] },
    { slug: "rn-decorative-series", category: "decorative-lighting", contents: [rnDecorativeContentForMarket(market)] },
    { slug: "vl-decorative-series", category: "decorative-lighting", contents: [vlDecorativeContentForMarket(market)] },
    { slug: "round-ring-series", category: "decorative-lighting", contents: [roundRingContentForMarket(market)] },
    { slug: "square-ring-series", category: "decorative-lighting", contents: [squareRingContentForMarket(market)] },
    { slug: "up-down-architectural-ring-series", category: "decorative-lighting", contents: [architecturalRingContentForMarket(market)] },
    { slug: "decorative-bollard-lighting", category: "decorative-lighting", contents: [decorativeBollardContentForMarket(market)] },
    { slug: "decorative-pole-lighting", category: "decorative-lighting", contents: [decorativePoleContentForMarket(market)] },
    { slug: "park-landscape-pole-systems", category: "decorative-lighting", contents: [parkLandscapeContentForMarket(market)] },
    { slug: "arl-exit-sign-series", category: "emergency-guidance-lighting", contents: [arlExitSignContentForMarket(market)] },
    { slug: "mal-exit-sign-series", category: "emergency-guidance-lighting", contents: [malExitSignContentForMarket(market)] },
    { slug: "hpl-exit-guidance-series", category: "emergency-guidance-lighting", contents: [hplExitGuidanceContentForMarket(market)] },
    { slug: "srs-exit-guidance-series", category: "emergency-guidance-lighting", contents: [srsExitGuidanceContentForMarket(market)] },
    { slug: "eml-twin-spot-emergency-lighting", category: "emergency-guidance-lighting", contents: [emlTwinSpotContentForMarket(market)] },
    { slug: "elh-high-output-emergency-spot-series", category: "emergency-guidance-lighting", contents: [elhHighOutputContentForMarket(market)] },
    { slug: "15w-emergency-linear-bulkhead-luminaires", category: "emergency-guidance-lighting", contents: [emergencyLinearBulkheadContentForMarket(market)] },
    { slug: "cyl-track-spot-series", category: "track-downlight", contents: config(cylConfigurationsForMarket(market)) },
    { slug: "cytm-cyptm-magnetic-track-series", category: "track-downlight", contents: config(cytmCyptmConfigurationsForMarket(market)) },
    { slug: "cylp-pendant-track-series", category: "track-downlight", contents: config(cylpConfigurationsForMarket(market)) },
    { slug: "lnrt-linear-track-series", category: "track-downlight", contents: config(lnrtConfigurationsForMarket(market)) },
    { slug: "stn-std-sty-track-spot-series", category: "track-downlight", contents: config(stnConfigurationsForMarket(market)) },
    { slug: "boom-bolton-adjustable-downlights", category: "track-downlight", contents: config(boomBoltonConfigurationsForMarket(market)) },
    { slug: "mcrs-recessed-downlights", category: "track-downlight", contents: config(mcrsConfigurationsForMarket(market)) },
    { slug: "mcrh-mcrks-downlights", category: "track-downlight", contents: config(mcrhConfigurationsForMarket(market)) },
    { slug: "moon-jpt-downlights", category: "track-downlight", contents: config(moonJptConfigurationsForMarket(market)) },
    { slug: "frame-multi-head-spotlights", category: "track-downlight", contents: config(frameConfigurationsForMarket(market)) },
    { slug: "compact-standard-downlights", category: "track-downlight", contents: config(compactConfigurationsForMarket(market)) },
  ];
  return sources.flatMap((source) => {
    const family = familyFromSource(source);
    return family ? [family] : [];
  });
}


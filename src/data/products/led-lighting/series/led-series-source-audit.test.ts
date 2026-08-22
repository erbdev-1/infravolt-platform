import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import type { LedSeriesDetailContent } from "../types";
import {
  architecturalRingContentForMarket,
  decorativeBollardContentForMarket,
  decorativePoleContentForMarket,
  parkLandscapeContentForMarket,
  rnDecorativeContentForMarket,
  roundRingContentForMarket,
  squareRingContentForMarket,
  vlDecorativeContentForMarket,
} from "./decorative-series";
import { gBusPlcAutomationContentForMarket } from "./g-bus-plc-automation";
import { gerLedHighCeilingContentForMarket } from "./ger-led-high-ceiling";
import { gerLedIndustrialHighCeilingContentForMarket } from "./ger-led-industrial-high-ceiling";
import { gerLedSmartStreetLightingContentForMarket } from "./ger-led-smart-street-lighting";
import { gslTunnelLightingSystemsContentForMarket } from "./gsl-tunnel-lighting-systems";
import { ledBusEtangeCarparkContentForMarket } from "./led-bus-etange-carpark";
import { ledBusEtanjPcContentForMarket } from "./led-bus-etanj-pc";
import { ledBusHighCeilingContentForMarket } from "./led-bus-high-ceiling";
import { ledBusLdbFlContentForMarket } from "./led-bus-ldb-fl";
import { ledBusLdbeContentForMarket } from "./led-bus-ldbe";
import { ledBusLdbseContentForMarket } from "./led-bus-ldbse";
import { ledBusStepdimWaterproofContentForMarket } from "./led-bus-stepdim-waterproof";
import {
  lnr105ConfigurationsForMarket,
  lnr33dConfigurationsForMarket,
  lnr55ConfigurationsForMarket,
  lnr85ConfigurationsForMarket,
  lnrConfigurationsForMarket,
  lwConfigurationsForMarket,
  multilineConfigurationsForMarket,
} from "./linear-trunking-series";
import {
  kmxLightingConfigurationsForMarket,
  projectorLightingConfigurationsForMarket,
  streetLightingConfigurationsForMarket,
  wallWasherSeriesContentForMarket,
} from "./outdoor-infrastructure-series";
import {
  dpnlConfigurationsForMarket,
  drpnlConfigurationsForMarket,
  hjpnlConfigurationsForMarket,
  ipnlConfigurationsForMarket,
  ledBusPanelContentForMarket,
  pnlConfigurationsForMarket,
  twpnlConfigurationsForMarket,
} from "./panel-series";
import {
  autoLedSeriesContentForMarket,
  exproofSeriesContentForMarket,
  seraLedSeriesContentForMarket,
  texLedSeriesContentForMarket,
} from "./special-hazardous-series";
import {
  boomBoltonConfigurationsForMarket,
  compactConfigurationsForMarket,
  cylConfigurationsForMarket,
  cylpConfigurationsForMarket,
  cytmCyptmConfigurationsForMarket,
  frameConfigurationsForMarket,
  lnrtConfigurationsForMarket,
  mcrhConfigurationsForMarket,
  mcrsConfigurationsForMarket,
  moonJptConfigurationsForMarket,
  stnConfigurationsForMarket,
} from "./track-downlight-series";

type NamedContent = Readonly<{ name: string; content: LedSeriesDetailContent }>;
type Configuration = Readonly<{ id: string; label: string; content: LedSeriesDetailContent }>;

function configured(name: string, configurations: readonly Configuration[]): NamedContent[] {
  return configurations.map(({ id, content }) => ({ name: `${name}:${id}`, content }));
}

function localAssetExists(asset: string): boolean {
  return asset.startsWith("/") && existsSync(join(process.cwd(), "public", asset.replace(/^\//, "")));
}

function contentAssets(content: LedSeriesDetailContent): string[] {
  return [
    content.heroImage,
    content.heroBackgroundImage,
    content.applicationImage,
    ...content.applications.map(({ image }) => image),
    ...(content.technicalAssets?.map(({ image }) => image) ?? []),
    ...(content.familyTechnicalSection?.assets.map(({ image }) => image) ?? []),
    ...(content.mountingConfigurations?.map(({ image }) => image) ?? []),
    ...(content.assemblyGallery?.images.map(({ image }) => image) ?? []),
    ...(content.technicalAssetVariants?.flatMap((variant) => [
      variant.photometric.image,
      variant.drawing.image,
      variant.installationOverview?.image,
      ...(variant.photometricOptions?.map(({ image }) => image) ?? []),
    ]) ?? []),
  ].filter((asset): asset is string => Boolean(asset));
}

const exproof = exproofSeriesContentForMarket("uk");

const SERIES: NamedContent[] = [
  { name: "g-bus-plc", content: gBusPlcAutomationContentForMarket("uk") },
  { name: "ger-led-smart-street", content: gerLedSmartStreetLightingContentForMarket("uk") },
  { name: "led-bus-high-ceiling", content: ledBusHighCeilingContentForMarket("uk") },
  { name: "ger-led-industrial-high-ceiling", content: gerLedIndustrialHighCeilingContentForMarket("uk") },
  { name: "ger-led-high-ceiling", content: gerLedHighCeilingContentForMarket("uk") },
  { name: "led-bus-ldb-fl", content: ledBusLdbFlContentForMarket("uk") },
  { name: "led-bus-ldbe", content: ledBusLdbeContentForMarket("uk") },
  { name: "led-bus-ldbse", content: ledBusLdbseContentForMarket("uk") },
  { name: "etange-carpark", content: ledBusEtangeCarparkContentForMarket("uk") },
  { name: "stepdim", content: ledBusStepdimWaterproofContentForMarket("uk") },
  { name: "etanj-pc", content: ledBusEtanjPcContentForMarket("uk") },
  { name: "exproof:ldbexp", content: exproof.ldbexp },
  { name: "exproof:gsl-exp", content: exproof.gslExp },
  { name: "sera-led", content: seraLedSeriesContentForMarket("uk") },
  { name: "tex-led", content: texLedSeriesContentForMarket("uk") },
  { name: "auto-led", content: autoLedSeriesContentForMarket("uk") },
  ...configured("street", streetLightingConfigurationsForMarket("uk")),
  ...configured("projector", projectorLightingConfigurationsForMarket("uk")),
  ...configured("kmx", kmxLightingConfigurationsForMarket("uk")),
  { name: "gsl-tunnel", content: gslTunnelLightingSystemsContentForMarket("uk") },
  { name: "wall-washer", content: wallWasherSeriesContentForMarket("uk") },
  ...configured("lnr", lnrConfigurationsForMarket("uk")),
  ...configured("lnr55", lnr55ConfigurationsForMarket("uk")),
  ...configured("lnr85", lnr85ConfigurationsForMarket("uk")),
  ...configured("lnr105", lnr105ConfigurationsForMarket("uk")),
  ...configured("lnr33d", lnr33dConfigurationsForMarket("uk")),
  ...configured("lw-wp", lwConfigurationsForMarket("uk")),
  ...configured("multiline", multilineConfigurationsForMarket("uk")),
  { name: "led-bus-panel", content: ledBusPanelContentForMarket("uk") },
  ...configured("dpnl", dpnlConfigurationsForMarket("uk")),
  ...configured("drpnl", drpnlConfigurationsForMarket("uk")),
  ...configured("hjpnl", hjpnlConfigurationsForMarket("uk")),
  ...configured("ipnl", ipnlConfigurationsForMarket("uk")),
  ...configured("pnl", pnlConfigurationsForMarket("uk")),
  ...configured("twpnl", twpnlConfigurationsForMarket("uk")),
  ...configured("cyl", cylConfigurationsForMarket("uk")),
  ...configured("cytm-cyptm", cytmCyptmConfigurationsForMarket("uk")),
  ...configured("cylp", cylpConfigurationsForMarket("uk")),
  ...configured("lnrt", lnrtConfigurationsForMarket("uk")),
  ...configured("stn-std-sty", stnConfigurationsForMarket("uk")),
  ...configured("boom-bolton", boomBoltonConfigurationsForMarket("uk")),
  ...configured("mcrs", mcrsConfigurationsForMarket("uk")),
  ...configured("mcrh-mcrks", mcrhConfigurationsForMarket("uk")),
  ...configured("moon-jpt", moonJptConfigurationsForMarket("uk")),
  ...configured("frame", frameConfigurationsForMarket("uk")),
  ...configured("compact", compactConfigurationsForMarket("uk")),
  { name: "rn-decorative", content: rnDecorativeContentForMarket("uk") },
  { name: "vl-decorative", content: vlDecorativeContentForMarket("uk") },
  { name: "round-ring", content: roundRingContentForMarket("uk") },
  { name: "square-ring", content: squareRingContentForMarket("uk") },
  { name: "architectural-ring", content: architecturalRingContentForMarket("uk") },
  { name: "decorative-bollard", content: decorativeBollardContentForMarket("uk") },
  { name: "decorative-pole", content: decorativePoleContentForMarket("uk") },
  { name: "park-landscape", content: parkLandscapeContentForMarket("uk") },
];

describe("LED series source and completeness audit", () => {
  it("covers every renderable series configuration", () => {
    expect(SERIES).toHaveLength(91);
  });

  it.each(SERIES)("keeps $name technically complete without empty optional sections", ({ content }) => {
    expect(content.technicalInformation).toHaveLength(4);
    expect(content.technicalInformation.every((card) => card.title.trim() && card.values.length > 0)).toBe(true);
    expect(content.technicalInformation.flatMap(({ values }) => values).every(({ label, value }) => label.trim() || value?.trim())).toBe(true);
    expect(content.technicalAssurance.every(({ label, value }) => label.trim() && value.trim())).toBe(true);
    expect((content.models?.length ?? 0) + (content.componentSchedule?.items.length ?? 0)).toBeGreaterThan(0);
    expect(content.applications.length).toBeGreaterThan(0);
    expect(content.siblingFamilies.length).toBeGreaterThan(0);

    if (content.familyTechnicalSection) {
      expect(content.familyTechnicalSection.heading.trim()).toBeTruthy();
      expect(content.familyTechnicalSection.introduction.trim()).toBeTruthy();
      expect(content.familyTechnicalSection.settings.length + content.familyTechnicalSection.assets.length).toBeGreaterThan(0);
      expect(content.familyTechnicalSection.settings.every(({ label, value, description }) => label.trim() && value.trim() && description.trim())).toBe(true);
    }

    if (content.controlOptions.length > 0 || content.opticalOptionItems?.length || content.smartIntegrationItems?.length) {
      expect(content.controlsHeading.trim()).toBeTruthy();
      expect(content.controlsIntroduction.trim()).toBeTruthy();
    }
  });

  it.each(SERIES)("uses existing local assets for $name", ({ content }) => {
    const missing = contentAssets(content).filter((asset) => !localAssetExists(asset));
    expect(missing).toEqual([]);
  });

  it("does not publish unsupported hazardous-certification claims", () => {
    expect(JSON.stringify(SERIES)).not.toMatch(/\bATEX\b|\bIECEx\b/i);
  });

  it("preserves model-specific DPNL efficacy datasets", () => {
    const configurations = configured("dpnl", dpnlConfigurationsForMarket("uk"));
    const dpnl = configurations.flatMap(({ content }) => content.models ?? []);

    expect(dpnl.some(({ efficiencyLmW }) => efficiencyLmW === ">100 lm/W")).toBe(true);
    expect(dpnl.some(({ efficiencyLmW }) => efficiencyLmW === ">115 lm/W")).toBe(true);
    expect(dpnl.every(({ efficiencyLmW }) => efficiencyLmW !== ">100 or >115 lm/W by catalogue row")).toBe(true);

    for (const { content } of configurations) {
      const technicalValues = content.technicalInformation.flatMap(({ values }) => values);
      expect(technicalValues).toContainEqual({ label: "Housing", value: "Electrostatic powder-coated aluminium injection body" });
      expect(technicalValues).toContainEqual({ label: "Diffuser", value: "PS / PMMA opal · prismatic / microprismatic options" });
    }
  });

  it("does not flatten contradictory DRPNL housing records into a family-wide claim", () => {
    for (const { content } of configured("drpnl", drpnlConfigurationsForMarket("uk"))) {
      const labels = content.technicalInformation.flatMap(({ values }) => values.map(({ label }) => label));
      expect(labels).not.toContain("Housing");
    }
  });

  it("keeps the catalogue-backed HJPNL efficacy on both mounting configurations", () => {
    for (const { content } of configured("hjpnl", hjpnlConfigurationsForMarket("uk"))) {
      expect(content.models?.every(({ efficiencyLmW }) => efficiencyLmW === ">110 lm/W")).toBe(true);
    }
  });
});

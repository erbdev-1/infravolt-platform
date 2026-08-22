"use client";

import { useState } from "react";

import type { LedSeriesDetailContent } from "@/data/products/led-lighting/types";
import type { MarketCode } from "@/modules/markets/types";

import { LedSeriesDetailPage } from "./led-series-detail-page";
import styles from "./led-series-detail-page.module.css";

export type LedSeriesConfiguration = Readonly<{
  id: string;
  label: string;
  content: LedSeriesDetailContent;
}>;

// The English selectorLabel passed in from each page.tsx call site (e.g.
// "Mounting configuration", "Track spot configuration") doubles as the
// lookup key here — every distinct label used across the LED configured
// series pages must have a UA entry so the selector never falls back to
// English on the ua market. Single source of truth for this string
// instead of duplicating a `market === "ua" ? ... : ...` in every caller.
const SELECTOR_LABEL_UA: Readonly<Record<string, string>> = {
  "Body configuration": "Конфігурація корпусу",
  "Downlight family": "Сімейство даунлайтів",
  "FRAME configuration": "Конфігурація FRAME",
  "Lighting configuration": "Конфігурація освітлення",
  "Luminaire configuration": "Конфігурація світильника",
  "Mounting configuration": "Конфігурація монтажу",
  "Optical configuration": "Оптична конфігурація",
  "Product configuration": "Конфігурація продукту",
  "Product family": "Продуктова серія",
  "System configuration": "Конфігурація системи",
  "Track spot configuration": "Конфігурація трекового спота",
};

export function LedConfiguredSeriesDetailPage({
  configurations,
  selectorLabel,
  seriesSlug,
  categoryHref,
  market,
}: Readonly<{
  configurations: readonly LedSeriesConfiguration[];
  selectorLabel: string;
  seriesSlug: string;
  categoryHref: string;
  market: MarketCode;
}>) {
  const [configurationId, setConfigurationId] = useState(configurations[0]?.id);
  const configuration = configurations.find((item) => item.id === configurationId) ?? configurations[0];
  const resolvedSelectorLabel = market === "ua" ? (SELECTOR_LABEL_UA[selectorLabel] ?? selectorLabel) : selectorLabel;

  if (!configuration) return null;

  return (
    <LedSeriesDetailPage
      categoryHref={categoryHref}
      configurationSelector={(
        <section aria-label={resolvedSelectorLabel} className={styles.configurationSelector}>
          <div className={styles.configurationSelectorInner}>
            <span className={styles.configurationSelectorLabel}>{resolvedSelectorLabel}</span>
            <div className={styles.configurationSelectorTabs} role="tablist">
              {configurations.map((item) => (
                <button
                  aria-selected={item.id === configuration.id}
                  className={item.id === configuration.id ? styles.configurationSelectorTabActive : styles.configurationSelectorTab}
                  key={item.id}
                  onClick={() => setConfigurationId(item.id)}
                  role="tab"
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      content={configuration.content}
      seriesSlug={seriesSlug}
    />
  );
}

"use client";

import { useState } from "react";

import type { LedSeriesDetailContent } from "@/data/products/led-lighting/types";
import type { MarketCode } from "@/modules/markets/types";

import { LedSeriesDetailPage } from "./led-series-detail-page";
import styles from "./led-series-detail-page.module.css";

export function LedExproofSeriesDetailPage({
  ldbexp,
  gslExp,
  seriesSlug,
  categoryHref,
  market,
}: Readonly<{
  ldbexp: LedSeriesDetailContent;
  gslExp: LedSeriesDetailContent;
  seriesSlug: string;
  categoryHref: string;
  market: MarketCode;
}>) {
  const [configuration, setConfiguration] = useState<"ldbexp" | "gsl-exp">("ldbexp");
  const content = configuration === "ldbexp" ? ldbexp : gslExp;
  const selectorLabel = market === "ua" ? "Конфігурація продукту" : "Product configuration";

  return (
    <LedSeriesDetailPage
      categoryHref={categoryHref}
      configurationSelector={(
        <section aria-label={selectorLabel} className={styles.configurationSelector}>
          <div className={styles.configurationSelectorInner}>
            <span className={styles.configurationSelectorLabel}>{selectorLabel}</span>
            <div className={styles.configurationSelectorTabs} role="tablist">
              <button
                aria-selected={configuration === "ldbexp"}
                className={configuration === "ldbexp" ? styles.configurationSelectorTabActive : styles.configurationSelectorTab}
                onClick={() => setConfiguration("ldbexp")}
                role="tab"
                type="button"
              >
                LED-BUS LDBEXP
              </button>
              <button
                aria-selected={configuration === "gsl-exp"}
                className={configuration === "gsl-exp" ? styles.configurationSelectorTabActive : styles.configurationSelectorTab}
                onClick={() => setConfiguration("gsl-exp")}
                role="tab"
                type="button"
              >
                GSL EXP
              </button>
            </div>
          </div>
        </section>
      )}
      content={content}
      seriesSlug={seriesSlug}
    />
  );
}

"use client";

import { consentCopyForMarket } from "./consent-copy";

import type { MarketCode } from "@/modules/markets/types";

import styles from "./consent-banner.module.css";

type ConsentBannerProps = Readonly<{
  market: MarketCode;
  onAccept: () => void;
  onReject: () => void;
}>;

export function ConsentBanner({ market, onAccept, onReject }: ConsentBannerProps) {
  const copy = consentCopyForMarket(market);

  return (
    <div aria-label={copy.preferencesTriggerLabel} className={styles.banner} role="region">
      <p className={styles.message}>{copy.message}</p>

      <div className={styles.actions}>
        <button className={styles.reject} onClick={onReject} type="button">
          {copy.rejectLabel}
        </button>
        <button className={styles.accept} onClick={onAccept} type="button">
          {copy.acceptLabel}
        </button>
      </div>
    </div>
  );
}

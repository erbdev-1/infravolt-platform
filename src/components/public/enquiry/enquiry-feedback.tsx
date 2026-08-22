"use client";

import Link from "next/link";

import { PRODUCT_ENQUIRY_REVIEW_HREF } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import styles from "./enquiry-feedback.module.css";

function itemCountLabel(count: number, market: MarketCode): string {
  if (market === "uk") return `${count} ${count === 1 ? "item" : "items"} in your enquiry`;

  const lastTwo = count % 100;
  const lastOne = count % 10;
  const noun =
    lastTwo >= 11 && lastTwo <= 14
      ? "позицій"
      : lastOne === 1
        ? "позиція"
        : lastOne >= 2 && lastOne <= 4
          ? "позиції"
          : "позицій";

  return `${count} ${noun} у вашому запиті`;
}

export function EnquiryToolbarSummary({ count, market }: Readonly<{ count: number; market: MarketCode }>) {
  if (count === 0) return null;

  return (
    <div className={styles.summary}>
      <span>{itemCountLabel(count, market)}</span>
      <Link href={PRODUCT_ENQUIRY_REVIEW_HREF}>
        {market === "ua" ? "Переглянути запит →" : "View Enquiry →"}
      </Link>
    </div>
  );
}

export function EnquiryAddedConfirmation({
  count,
  itemLabel,
  market,
  onContinue,
}: Readonly<{
  count: number;
  itemLabel: string;
  market: MarketCode;
  onContinue: () => void;
}>) {
  return (
    <aside aria-live="polite" className={styles.confirmation}>
      <div className={styles.confirmationMessage}>
        <span aria-hidden="true">✓</span>
        <div>
          <strong>{market === "ua" ? "Додано до вашого запиту" : "Added to your enquiry"}</strong>
          <p>
            {itemLabel} {market === "ua" ? "додано." : "added."}
          </p>
        </div>
      </div>
      <p className={styles.confirmationCount}>{itemCountLabel(count, market)}</p>
      <div className={styles.confirmationActions}>
        <button onClick={onContinue} type="button">
          {market === "ua" ? "Продовжити перегляд" : "Continue Browsing"}
        </button>
        <Link href={PRODUCT_ENQUIRY_REVIEW_HREF}>
          {market === "ua" ? "Переглянути запит →" : "View Enquiry →"}
        </Link>
      </div>
    </aside>
  );
}

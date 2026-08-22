"use client";

import { useState } from "react";

import { ENQUIRY_REVIEW_ANCHOR } from "@/modules/enquiry/routing";
import { removeEnquiryItem, updateEnquiryItemQuantity, useEnquiryItems } from "@/modules/enquiry/store";
import { enquirySystemLabel } from "@/modules/enquiry/types";
import type { MarketCode } from "@/modules/markets/types";
import type { ContactPageContent } from "@/modules/public-site/contact-content";

import styles from "./contact-page.module.css";
import { ProductEnquiryBuilder } from "./product-enquiry-builder";

function selectedItemCountLabel(count: number, market: MarketCode): string {
  if (market === "uk") return `${count} ${count === 1 ? "item" : "items"}`;
  const lastTwo = count % 100;
  const lastOne = count % 10;
  const noun = lastTwo >= 11 && lastTwo <= 14
    ? "позицій"
    : lastOne === 1
      ? "позиція"
      : lastOne >= 2 && lastOne <= 4
        ? "позиції"
        : "позицій";
  return `${count} ${noun}`;
}

export function SelectedProductsPanel({
  content,
  market,
}: Readonly<{
  content: ContactPageContent;
  market: MarketCode;
}>) {
  const items = useEnquiryItems();
  const [builderOpen, setBuilderOpen] = useState(false);
  const quantityLabel = market === "ua" ? "Кількість" : "Quantity";

  return (
    <div className={styles.selectedProductsArea} id={ENQUIRY_REVIEW_ANCHOR}>
      {items.length === 0 ? (
        <div className={styles.selectedProductsEmpty}>
          <div>
            <h3>{content.selectedProducts.heading}</h3>
            <p>{content.selectedProducts.emptyText}</p>
          </div>
          <button onClick={() => setBuilderOpen(true)} type="button">
            {content.selectedProducts.addProductsLabel}<span aria-hidden="true">→</span>
          </button>
        </div>
      ) : (
        <div className={styles.selectedProducts}>
          <div className={styles.selectedProductsHeader}>
            <div>
              <h3>{content.selectedProducts.heading}</h3>
              <span aria-live="polite" className={styles.selectedProductsCount}>
                {selectedItemCountLabel(items.length, market)}
              </span>
            </div>
            <button onClick={() => setBuilderOpen((current) => !current)} type="button">
              {content.selectedProducts.addMoreLabel}<span aria-hidden="true">→</span>
            </button>
          </div>
          <ul className={styles.selectedProductsList}>
            {items.map((item) => (
              <li key={item.id}>
                <div className={styles.selectedProductIdentity}>
                  <strong>{item.title}</strong>
                  <span>
                    {enquirySystemLabel(item.system, market)}
                    {item.categoryLabel ? ` · ${item.categoryLabel}` : ""}
                    {item.model ? ` · ${item.model}` : ""}
                  </span>
                </div>
                <label className={styles.selectedProductQuantity}>
                  <span>{quantityLabel}</span>
                  <input
                    inputMode="decimal"
                    min="0"
                    onChange={(event) => updateEnquiryItemQuantity(item.id, event.target.value)}
                    step="any"
                    type="number"
                    value={item.quantity ?? ""}
                  />
                </label>
                <button
                  aria-label={`${content.selectedProducts.removeLabel}: ${item.title}`}
                  onClick={() => removeEnquiryItem(item.id)}
                  type="button"
                >
                  {content.selectedProducts.removeLabel}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {builderOpen ? <ProductEnquiryBuilder market={market} onClose={() => setBuilderOpen(false)} /> : null}
    </div>
  );
}

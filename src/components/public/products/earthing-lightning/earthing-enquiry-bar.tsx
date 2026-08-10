"use client";

import Link from "next/link";
import { useState } from "react";

import {
  clearEnquiry,
  removeFromEnquiry,
  useEarthingEnquiry,
} from "./earthing-enquiry-store";
import styles from "./earthing-category-detail-page.module.css";

type EarthingEnquiryBarProps = Readonly<{
  heading: string;
  countSuffix: string;
  removeAction: string;
  clearAction: string;
  submitAction: string;
}>;

export function EarthingEnquiryBar({
  heading,
  countSuffix,
  removeAction,
  clearAction,
  submitAction,
}: EarthingEnquiryBarProps) {
  const items = useEarthingEnquiry();
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const codes = items.map((item) => item.stockCode).join(",");
  const submitHref = `/uk-support?request=rfq&product=earthing-rfq&codes=${encodeURIComponent(codes)}`;

  return (
    <div className={styles.enquiryBar} data-expanded={expanded ? "true" : "false"}>
      {expanded ? (
        <div className={styles.enquiryPanel}>
          <div className={styles.enquiryPanelHeading}>
            <h3>{heading}</h3>
            <button
              className={styles.enquiryClear}
              onClick={() => clearEnquiry()}
              type="button"
            >
              {clearAction}
            </button>
          </div>

          <ul className={styles.enquiryList}>
            {items.map((item) => (
              <li key={item.stockCode}>
                <div>
                  <strong>{item.model}</strong>
                  <span>{item.stockCode}</span>
                </div>
                <button
                  aria-label={`${removeAction}: ${item.model}`}
                  className={styles.enquiryRemove}
                  onClick={() => removeFromEnquiry(item.stockCode)}
                  type="button"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={styles.enquiryBarRow}>
        <button
          aria-expanded={expanded}
          className={styles.enquiryToggle}
          onClick={() => setExpanded((value) => !value)}
          type="button"
        >
          <strong>{items.length}</strong> {countSuffix}
          <span aria-hidden="true">{expanded ? "▾" : "▴"}</span>
        </button>

        <Link className={styles.enquirySubmit} href={submitHref}>
          {submitAction}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

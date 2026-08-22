"use client";

import type { EnquiryType } from "@/modules/enquiry/types";
import type { EnquiryTypeOption } from "@/modules/public-site/contact-content";

import styles from "./contact-page.module.css";

const TYPE_ICON_PATHS: Record<EnquiryType, string> = {
  product: "M4 7h16M4 12h16M4 17h10",
  quote: "M9 3h6l1 4H8l1-4Zm-3 4h12l1 13H5L6 7Zm3 4v6m6-6v6",
  technical: "M12 3v4m0 10v4M3 12h4m10 0h4M6.34 6.34l2.83 2.83m5.66 5.66 2.83 2.83M6.34 17.66l2.83-2.83m5.66-5.66 2.83-2.83",
  "technical-document": "M6 3h9l5 5v13H6V3Zm9 0v5h5M9 12h8M9 16h8M9 8h3",
  project: "M4 20V6a2 2 0 0 1 2-2h7l6 6v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z M13 4v6h6",
  general: "M4 5h16v11H8l-4 4V5Z",
};

export function EnquiryTypeSelector({
  options,
  active,
  onSelect,
}: Readonly<{
  options: readonly EnquiryTypeOption[];
  active: EnquiryType;
  onSelect: (type: EnquiryType) => void;
}>) {
  return (
    <div className={styles.typeGrid} role="radiogroup">
      {options.map((option) => {
        const isActive = option.id === active;
        return (
          <button
            aria-checked={isActive}
            className={isActive ? styles.typeCardActive : styles.typeCard}
            key={option.id}
            onClick={() => onSelect(option.id)}
            role="radio"
            type="button"
          >
            {isActive ? (
              <span aria-hidden="true" className={styles.typeCardIndicator}>
                <svg viewBox="0 0 16 16">
                  <path d="m3 8 3.5 3.5L13 5" />
                </svg>
              </span>
            ) : null}
            <svg aria-hidden="true" className={styles.typeIcon} viewBox="0 0 24 24">
              <path d={TYPE_ICON_PATHS[option.id]} />
            </svg>
            <span className={styles.typeCardTitle}>{option.label}</span>
            <span className={styles.typeCardHelper}>{option.helper}</span>
          </button>
        );
      })}
    </div>
  );
}

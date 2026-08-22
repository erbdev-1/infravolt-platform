import type { LedTechnicalAssuranceItem, LedTechnicalInfoCard } from "@/data/products/led-lighting/types";

import {
  IconCertified,
  IconEfficiency,
  IconHighOutput,
  IconLayers,
  IconPalette,
  IconProtection,
  IconSmartFault,
  IconSmartNetwork,
  IconSmartPlc,
  IconSmartScenario,
  IconWarrantyBadge,
} from "./led-icons";
import styles from "./led-series-detail-page.module.css";

// The shared LED series-detail "Technical Information" standard — exactly
// 4 cards (Performance / Light Quality / Protection & Electrical /
// Construction & Installation), same icon set, same card shape, on every
// future LED product-series page. Card count and icons are fixed; only the
// value lines inside each card vary per family (a line is omitted rather
// than invented when a field isn't catalogue-verified for that family).
// Colour & Finish / Compliance / Warranty fold into this same section as a
// compact "Technical Assurance" row directly beneath the 4 cards, rather
// than separate large sections.
const TECHNICAL_INFO_ICONS = {
  performance: IconEfficiency,
  "light-quality": IconHighOutput,
  "protection-electrical": IconProtection,
  construction: IconLayers,
  communication: IconSmartNetwork,
  "control-system": IconSmartPlc,
  integration: IconSmartScenario,
  monitoring: IconSmartFault,
} as const;

const TECHNICAL_ASSURANCE_ICONS = {
  "colour-finish": IconPalette,
  compliance: IconCertified,
  warranty: IconWarrantyBadge,
} as const;

export function LedTechnicalInfoCards({
  heading,
  cards,
  assurance,
}: Readonly<{
  heading: string;
  cards: readonly LedTechnicalInfoCard[];
  assurance: readonly LedTechnicalAssuranceItem[];
}>) {
  // Never render an assurance icon on its own — an item only counts as
  // real content once it has a visible label and value; if none of the
  // items qualify, the whole row (and the vertical space it would
  // otherwise reserve) is skipped entirely.
  const visibleAssurance = assurance.filter((item) => Boolean(item.label?.trim()) && Boolean(item.value?.trim()));

  return (
    <section className={styles.technicalInfo}>
      <h2 className={styles.srOnlyHeading}>{heading}</h2>

      <div className={styles.technicalInfoGrid}>
        {cards.map((card) => {
          const CardIcon = TECHNICAL_INFO_ICONS[card.icon];

          return (
            <article className={styles.technicalInfoCard} key={card.title}>
              <div className={styles.technicalInfoHeader}>
                <span aria-hidden="true" className={styles.technicalInfoIconBadge}>
                  <CardIcon className={styles.technicalInfoIcon} />
                </span>
                <h3 className={styles.technicalInfoTitle}>{card.title}</h3>
              </div>

              <div className={styles.technicalInfoValues}>
                {card.values.map((item) =>
                  item.value ? (
                    <div className={styles.technicalInfoValueRow} key={item.label}>
                      <span className={styles.technicalInfoValueLabel}>{item.label}</span>
                      <span className={styles.technicalInfoValueValue}>{item.value}</span>
                    </div>
                  ) : (
                    <div className={styles.technicalInfoValueRow} key={item.label}>
                      <span className={styles.technicalInfoValueStandalone}>{item.label}</span>
                    </div>
                  ),
                )}
              </div>
            </article>
          );
        })}
      </div>

      {visibleAssurance.length > 0 ? (
        <div
          className={`${styles.technicalAssuranceRow} ${visibleAssurance.length === 1 ? styles.technicalAssuranceRowSingle : visibleAssurance.length === 2 ? styles.technicalAssuranceRowDouble : ""}`}
        >
          {visibleAssurance.map((item) => {
            const ItemIcon = TECHNICAL_ASSURANCE_ICONS[item.icon];
            const isWarranty = item.icon === "warranty";

            return (
              <div
                className={isWarranty ? styles.technicalAssuranceItemWarranty : styles.technicalAssuranceItem}
                key={item.label}
              >
                <ItemIcon aria-hidden="true" className={styles.technicalAssuranceIcon} />
                <div className={styles.technicalAssuranceBody}>
                  <span className={styles.technicalAssuranceLabel}>{item.label}</span>
                  <span className={styles.technicalAssuranceValue}>{item.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

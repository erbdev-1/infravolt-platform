import type { LocalizedTechnicalSnapshotItem } from "@/data/products/earthing-lightning/types";

import {
  IconBondLink,
  IconClock,
  IconDocument,
  IconGauge,
  IconHazard,
  IconLayers,
  IconNodes,
  IconShieldCheck,
  IconSupport,
  IconWeld,
} from "./earthing-icons";
import styles from "./technical-snapshot-strip.module.css";

// Serializable content data (content.ts) names icons as plain strings —
// this is the one place that maps them to the actual SVG components, so
// no JSX ever has to live inside the shared uk/ua content objects.
const SNAPSHOT_ICONS = {
  shield: IconShieldCheck,
  layers: IconLayers,
  network: IconNodes,
  support: IconSupport,
  clock: IconClock,
  weld: IconWeld,
  document: IconDocument,
  hazard: IconHazard,
  gauge: IconGauge,
  bond: IconBondLink,
} as const satisfies Record<LocalizedTechnicalSnapshotItem["icon"], unknown>;

type TechnicalSnapshotStripProps = Readonly<{
  items: readonly LocalizedTechnicalSnapshotItem[];
  /** Accessible label for the <section> — e.g. "Technical snapshot". */
  label: string;
}>;

// Server-renderable — no client-side state. The only reason a tooltip
// would normally require "use client" (hover/focus toggling) doesn't
// apply here: note/tooltip text is always rendered in the DOM (see
// LocalizedTechnicalSnapshotItem in types.ts), not revealed on
// hover — required so keyboard and touch users get the same
// clarification as mouse users, per the Design Life warranty caveat.
//
// Layout is icon+label together as one heading row, then the value
// centred below it, then an optional note — DOM order now matches visual
// order directly (no CSS `order` needed, unlike the previous bottom-label
// layout this replaced).
export function TechnicalSnapshotStrip({ items, label }: TechnicalSnapshotStripProps) {
  return (
    <section aria-label={label} className={styles.strip}>
      <div className={styles.grid}>
        {items.map((item) => {
          const Icon = SNAPSHOT_ICONS[item.icon];
          const valueLines = Array.isArray(item.value) ? item.value : [item.value as string];
          const isList = valueLines.length > 1;

          return (
            <article className={styles.cell} key={item.label}>
              <div className={styles.header}>
                <span aria-hidden="true" className={styles.iconBadge}>
                  <Icon className={styles.icon} />
                </span>
                <span className={styles.headerLabel}>{item.label}</span>
              </div>
              <strong className={isList ? `${styles.value} ${styles.valueList}` : styles.value}>
                {valueLines.map((line) => (
                  <span className={isList ? styles.valueListLine : styles.valueLine} key={line}>
                    {line}
                  </span>
                ))}
              </strong>
              {item.note ? <span className={styles.note}>{item.note}</span> : null}
              {item.tooltip ? <span className={styles.tooltip}>{item.tooltip}</span> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

import type { CableManagementSnapshotIconName, CableManagementSnapshotItem } from "@/data/products/cable-management/types";

import { IconLayers, IconShieldCheck, IconSupport, IconSystem } from "./cable-icons";
import styles from "./cable-management-page.module.css";

const SNAPSHOT_ICONS = {
  shield: IconShieldCheck,
  layers: IconLayers,
  system: IconSystem,
  support: IconSupport,
} as const satisfies Record<CableManagementSnapshotIconName, unknown>;

type CableTechnicalSnapshotProps = Readonly<{
  items: readonly CableManagementSnapshotItem[];
  footnote?: string;
  label: string;
}>;

// Reusable across every Cable Management family-detail page — mirrors the
// stacked-value pattern proven on the earthing-lightning line's
// TechnicalSnapshotStrip, restyled with --cable-* tokens. A separate
// component/module (not a shared import) so nothing here can affect that
// line.
export function CableTechnicalSnapshot({ items, footnote, label }: CableTechnicalSnapshotProps) {
  return (
    <section aria-label={label} className={styles.snapshotSection}>
      <div className={styles.snapshotGrid}>
        {items.map((item) => {
          const Icon = SNAPSHOT_ICONS[item.icon];
          const valueLines = Array.isArray(item.value) ? item.value : [item.value];
          const isList = valueLines.length > 1;

          return (
            <article className={styles.snapshotCell} key={item.label}>
              <div className={styles.snapshotHeader}>
                <span aria-hidden="true" className={styles.snapshotIconBadge}>
                  <Icon className={styles.snapshotIcon} />
                </span>
                <span className={styles.snapshotLabel}>{item.label}</span>
              </div>
              <strong
                className={isList ? `${styles.snapshotValue} ${styles.snapshotValueList}` : styles.snapshotValue}
              >
                {valueLines.map((line) => (
                  <span className={styles.snapshotValueLine} key={line}>
                    {line}
                  </span>
                ))}
              </strong>
              {item.note ? <span className={styles.snapshotNote}>{item.note}</span> : null}
            </article>
          );
        })}
      </div>
      {footnote ? <p className={styles.snapshotFootnote}>{footnote}</p> : null}
    </section>
  );
}

"use client";

import { useState } from "react";

import {
  IconBondLink,
  IconChevronDown,
  IconElectrode,
  IconInspection,
  IconLayers,
  IconLightningRod,
  IconSoilLayers,
} from "./earthing-icons";
import styles from "./earthing-lightning-hub-page.module.css";

type GuidanceItem = Readonly<{
  title: string;
  description: string;
}>;

type GuidanceAccordionProps = Readonly<{
  items: readonly GuidanceItem[];
}>;

// Icon components must live in this client module, not be passed in as a
// prop from the (server) hub page — React Server Components can't
// serialize function/component references across that boundary ("Functions
// cannot be passed directly to Client Components"). Positional, same order
// as content.guidance in content.ts — matches the hub page's own
// GUIDANCE_ICONS mapping.
const GUIDANCE_ICONS = [
  IconElectrode,
  IconLayers,
  IconSoilLayers,
  IconBondLink,
  IconLightningRod,
  IconInspection,
] as const;

// Same pattern as the mobile filter drawer / applications selector
// elsewhere in this section: both the desktop grid and the mobile
// accordion render from the same data, CSS decides which is visible at
// which breakpoint (see .guidanceGrid / .guidanceAccordion), so there is
// never a second, independently-maintained copy of the guidance content.
export function EarthingGuidanceAccordion({ items }: GuidanceAccordionProps) {
  const icons = GUIDANCE_ICONS;
  // One open at a time, per the brief — collapsing to null (all closed)
  // is intentional default state, not a bug.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className={styles.guidanceGrid}>
        {items.map((item, index) => {
          const Icon = icons[index];

          return (
            <article className={styles.guidanceCard} key={item.title}>
              {Icon ? <Icon className={styles.guidanceIcon} /> : null}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          );
        })}
      </div>

      <div className={styles.guidanceAccordion}>
        {items.map((item, index) => {
          const Icon = icons[index];
          const isOpen = openIndex === index;
          const panelId = `guidance-panel-${index}`;
          const triggerId = `guidance-trigger-${index}`;

          return (
            <div className={styles.guidanceAccordionItem} key={item.title}>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={styles.guidanceAccordionTrigger}
                id={triggerId}
                onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                type="button"
              >
                <span className={styles.guidanceAccordionTitle}>
                  {Icon ? <Icon aria-hidden="true" className={styles.guidanceAccordionIcon} /> : null}
                  {item.title}
                </span>
                <IconChevronDown
                  aria-hidden="true"
                  className={isOpen ? styles.guidanceAccordionChevronOpen : styles.guidanceAccordionChevron}
                />
              </button>

              <div
                aria-labelledby={triggerId}
                className={styles.guidanceAccordionPanel}
                data-expanded={isOpen}
                id={panelId}
                role="region"
              >
                <p className={styles.guidanceAccordionDescription}>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

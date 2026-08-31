"use client";

import Image from "next/image";
import { useState } from "react";

import type { BusbarSystemDetail } from "@/data/products/busbar/series/types";

import styles from "./busbar-system-detail-page.module.css";

// Mobile/tablet: one active application card + a compact selector grid,
// same interaction pattern established for Earthing & Lightning and
// Underfloor (each product line keeps its own copy of this component
// rather than sharing one — the established convention in this codebase,
// see earthing-applications-carousel.tsx / underfloor-applications-selector.tsx).
// Desktop (>1024px) keeps the original static image-card grid unchanged,
// rendered from the same data in the same component — CSS decides which
// block is visible at which width, so there is only ever one source of
// truth for the application list.
export function BusbarApplicationsSection({
  detail,
}: Readonly<{
  detail: BusbarSystemDetail;
}>) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (detail.applications.length === 0) {
    return null;
  }

  const active = detail.applications[activeIndex] ?? detail.applications[0];

  return (
    <section
      aria-label={detail.applicationsEyebrow}
      className={styles.applicationsSection}
    >
      <header className={styles.applicationsHeader}>
        <p className={styles.eyebrow}>{detail.applicationsEyebrow}</p>

        <h2>{detail.applicationsHeading}</h2>

        <p className={styles.applicationsDescription}>
          {detail.applicationsDescription}
        </p>
      </header>

      <div className={styles.applicationsGrid}>
        {detail.applications.map((application) => (
          <article className={styles.applicationCard} key={application.slug}>
            <div className={styles.applicationVisual}>
              <Image
                alt={application.imageAlt}
                className={styles.applicationImage}
                fill
                sizes="(max-width: 768px) 46vw, (min-width: 1100px) 31vw, (min-width: 769px) 48vw, 100vw"
                src={application.image}
              />
            </div>

            <div className={styles.applicationContent}>
              <h3>{application.title}</h3>
              <p>{application.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.applicationSelector}>
        <div className={styles.applicationActiveCard}>
          <div className={styles.applicationActiveVisual}>
            <Image
              alt={active.imageAlt}
              className={styles.applicationImage}
              fill
              sizes="(max-width: 1024px) 100vw, 0px"
              src={active.image}
            />
          </div>

          <div className={styles.applicationActiveContent}>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
          </div>
        </div>

        <div
          aria-label={active.title}
          className={styles.applicationSelectorGrid}
          role="group"
        >
          {detail.applications.map((application, index) => (
            <button
              aria-pressed={index === activeIndex}
              className={
                index === activeIndex
                  ? styles.applicationSelectorItemActive
                  : styles.applicationSelectorItem
              }
              key={application.slug}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              {application.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

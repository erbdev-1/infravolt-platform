"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { CableManagementApplication } from "@/data/products/cable-management/category-types";

import styles from "./cable-management-page.module.css";

type CableApplicationsSelectorProps = Readonly<{
  applications: readonly CableManagementApplication[];
  comingSoonLabel: string;
}>;

// Desktop/tablet keep the existing photo grid (.applicationsGrid) exactly
// as before — it's simply hidden below 640px (see the CSS module). Mobile
// gets one active presentation card + a compact 2-column selector grid
// that swaps it in place, same proven pattern as the Earthing hub's
// ApplicationsCarousel (earthing-applications-carousel.tsx), adapted to
// Cable Management's own data shape (`slug`, optional per-item `href`)
// and the existing .applicationsGrid card markup rather than duplicating
// it as a separate scroller.
export function CableApplicationsSelector({ applications, comingSoonLabel }: CableApplicationsSelectorProps) {
  const [activeSlug, setActiveSlug] = useState(applications[0]?.slug);
  const active = applications.find((application) => application.slug === activeSlug) ?? applications[0];

  if (!active) {
    return null;
  }

  const activeMedia = (
    <div className={styles.applicationActiveVisual}>
      <Image alt={active.imageAlt} className={styles.applicationImage} fill sizes="100vw" src={active.image} />
    </div>
  );

  const activeContent = (
    <div className={styles.applicationActiveContent}>
      <h3>{active.title}</h3>
      <p>{active.description}</p>
      {active.href ? (
        <span className={styles.applicationAction}>
          {active.viewLabel}
          <span aria-hidden="true">→</span>
        </span>
      ) : (
        <span className={styles.applicationActiveComingSoon}>{comingSoonLabel}</span>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop/tablet — unchanged photo grid, hidden below 640px. */}
      <div className={styles.applicationsGrid}>
        {applications.map((application) => {
          const media = (
            <div className={styles.applicationMedia}>
              <Image
                alt={application.imageAlt}
                className={styles.applicationImage}
                fill
                sizes="(min-width: 1050px) 12vw, (min-width: 640px) 24vw, 45vw"
                src={application.image}
              />
            </div>
          );

          if (application.href) {
            return (
              <Link
                className={styles.applicationCard}
                href={application.href}
                key={application.slug}
                title={application.description}
              >
                {media}
                <div className={styles.applicationBody}>
                  <h3>{application.title}</h3>
                </div>
                <span className={styles.applicationFooter}>
                  {application.viewLabel}
                  <span aria-hidden="true" className={styles.applicationFooterArrow}>
                    →
                  </span>
                </span>
              </Link>
            );
          }

          return (
            <div className={styles.applicationCardDisabled} key={application.slug} title={application.description}>
              {media}
              <div className={styles.applicationBody}>
                <h3>{application.title}</h3>
              </div>
              <span className={styles.applicationComingSoon}>{comingSoonLabel}</span>
            </div>
          );
        })}
      </div>

      {/* Mobile only — one active presentation card + a compact selector
          grid, replacing the photo-card wall above (hidden below 640px). */}
      <div className={styles.applicationSelector}>
        {active.href ? (
          <Link className={styles.applicationActiveCard} href={active.href}>
            {activeMedia}
            {activeContent}
          </Link>
        ) : (
          <div className={styles.applicationActiveCard}>
            {activeMedia}
            {activeContent}
          </div>
        )}

        <div aria-label={active.title} className={styles.applicationSelectorGrid} role="tablist">
          {applications.map((application) => (
            <button
              aria-selected={application.slug === active.slug}
              className={
                application.slug === active.slug
                  ? styles.applicationSelectorItemActive
                  : styles.applicationSelectorItem
              }
              key={application.slug}
              onClick={() => setActiveSlug(application.slug)}
              role="tab"
              type="button"
            >
              {application.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

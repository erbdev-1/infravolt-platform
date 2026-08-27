"use client";

import Image from "next/image";
import { useState } from "react";

import type { UnderfloorApplicationCard } from "@/data/products/underfloor/types";

import {
  IconCommercialBuilding,
  IconEducation,
  IconFlexibleWorkspace,
  IconImagePending,
  IconMeetingRoom,
  IconOffice,
  IconRetail,
} from "./underfloor-icons";
import styles from "./underfloor-hub-page.module.css";

// Icon components must live in this client module, not be passed in as a
// prop from the (server) hub page — React Server Components can't
// serialize function/component references across that boundary. Same fix
// applied to earthing-lightning's EarthingGuidanceAccordion.
const APPLICATION_ICONS = {
  office: IconOffice,
  "commercial-building": IconCommercialBuilding,
  "meeting-room": IconMeetingRoom,
  education: IconEducation,
  retail: IconRetail,
  "flexible-workspace": IconFlexibleWorkspace,
} as const;

type ApplicationsSelectorProps = Readonly<{
  applications: readonly UnderfloorApplicationCard[];
}>;

// Same pattern as earthing-lightning's ApplicationsCarousel rewrite: the
// desktop/tablet grid renders unchanged (hidden on mobile via CSS), and a
// new mobile-only active-card + selector grid renders from the same data
// (hidden above 640px), sharing one render — never two independently
// maintained copies of the application content.
export function UnderfloorApplicationsSelector({ applications }: ApplicationsSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = applications[activeIndex];

  if (!active) return null;

  const ActiveIcon = APPLICATION_ICONS[active.icon];

  return (
    <>
      <div className={styles.applicationsGrid}>
        {applications.map((application) => {
          const ApplicationIcon = APPLICATION_ICONS[application.icon];

          return (
            <article className={styles.applicationCard} key={application.title}>
              <div className={styles.applicationMedia}>
                {application.image ? (
                  <Image
                    alt={application.imageAlt ?? application.title}
                    fill
                    sizes="(min-width: 900px) 25vw, (min-width: 640px) 50vw, 100vw"
                    src={application.image}
                  />
                ) : (
                  <div className={styles.applicationMediaEmpty}>
                    <IconImagePending className={styles.applicationMediaEmptyIcon} />
                  </div>
                )}
              </div>

              <div className={styles.applicationBody}>
                <div className={styles.applicationTitleRow}>
                  <ApplicationIcon aria-hidden="true" className={styles.applicationIcon} />
                  <span className={styles.applicationTitle}>{application.title}</span>
                </div>
                <p className={styles.applicationDescription}>{application.description}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.applicationSelector}>
        <div className={styles.applicationActiveCard}>
          <div className={styles.applicationActiveVisual}>
            {active.image ? (
              <Image alt={active.imageAlt ?? active.title} fill sizes="100vw" src={active.image} />
            ) : (
              <div className={styles.applicationMediaEmpty}>
                <IconImagePending className={styles.applicationMediaEmptyIcon} />
              </div>
            )}
          </div>

          <div className={styles.applicationActiveContent}>
            <div className={styles.applicationTitleRow}>
              <ActiveIcon aria-hidden="true" className={styles.applicationIcon} />
              <span className={styles.applicationTitle}>{active.title}</span>
            </div>
            <p className={styles.applicationDescription}>{active.description}</p>
          </div>
        </div>

        <div aria-label={active.title} className={styles.applicationSelectorGrid} role="group">
          {applications.map((application, index) => (
            <button
              aria-pressed={index === activeIndex}
              className={index === activeIndex ? styles.applicationSelectorItemActive : styles.applicationSelectorItem}
              key={application.title}
              onClick={() => setActiveIndex(index)}
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

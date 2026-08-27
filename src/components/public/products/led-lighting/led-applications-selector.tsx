"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { LedSeriesApplicationIconName } from "@/data/products/led-lighting/types";

import {
  IconAircraftMaintenance,
  IconApplications,
  IconAutomation,
  IconBiogas,
  IconBusbarConnect,
  IconFactory,
  IconHangar,
  IconHighCeiling,
  IconImagePending,
  IconMining,
  IconParking,
  IconPetrochemical,
  IconPort,
  IconPrison,
  IconSmartCity,
  IconSmartEnvironment,
  IconSmartNetwork,
  IconStreetLight,
  IconTunnel,
  IconWarehouse,
} from "./led-icons";
import styles from "./led-applications-selector.module.css";

// Resolved client-side, never passed in as a prop — a Server Component
// cannot hand a Client Component a function reference (RSC serialization
// forbids it), so every caller passes the plain string key from
// LedSeriesApplicationIconName instead and this map turns it back into a
// real icon component here, inside the client boundary. Category pages
// (whose desktop grids use positional, non-semantic icon arrays with no
// stable key to send) simply omit `icon` — the active card renders fine
// without one, per LedApplicationSelectorItem's optional field.
const ICON_MAP: Readonly<Record<LedSeriesApplicationIconName, typeof IconApplications>> = {
  hangar: IconHangar,
  warehouse: IconWarehouse,
  port: IconPort,
  "aircraft-maintenance": IconAircraftMaintenance,
  "industrial-facility": IconFactory,
  petrochemical: IconPetrochemical,
  mining: IconMining,
  "high-ceiling": IconHighCeiling,
  tunnel: IconTunnel,
  prison: IconPrison,
  biogas: IconBiogas,
  "busbar-distribution": IconBusbarConnect,
  "lighting-control": IconAutomation,
  "network-monitoring": IconSmartNetwork,
  street: IconStreetLight,
  airport: IconHangar,
  motorway: IconStreetLight,
  parks: IconSmartEnvironment,
  residential: IconApplications,
  "shopping-centre": IconApplications,
  "public-square": IconSmartCity,
  parking: IconParking,
  office: IconApplications,
  retail: IconApplications,
  education: IconApplications,
  corridor: IconApplications,
};

export type LedApplicationSelectorItem = Readonly<{
  /** Stable, locale-independent key (e.g. the source icon enum value, or a
   * fixed array index) — never the translated title, so UK/UA selection
   * state and interaction stay consistent regardless of copy length. */
  id: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  /** LedSeriesApplicationIconName key — resolved to a real icon component
   * inside this client module (see ICON_MAP). Omit when the caller has no
   * stable semantic key for this item (e.g. category pages). */
  icon?: LedSeriesApplicationIconName;
  /** Real navigation target if this application links out (e.g. to the
   * Application Map) — omitted for purely informational entries. */
  href?: string;
}>;

type LedApplicationsSelectorProps = Readonly<{
  applications: readonly LedApplicationSelectorItem[];
}>;

// Shared mobile/tablet companion to whichever image-led application card
// grid the caller renders for desktop (hidden below 640px there) — one
// active presentation card + a compact 2-column selector that swaps it in
// place. Used by both the series/detail template and all LED category
// pages, so the interaction is identical everywhere instead of being
// re-implemented per page. See led-applications-selector.module.css.
export function LedApplicationsSelector({ applications }: LedApplicationsSelectorProps) {
  const [activeId, setActiveId] = useState(applications[0]?.id);
  const active = applications.find((application) => application.id === activeId) ?? applications[0];

  if (!active) {
    return null;
  }

  const ActiveIcon = active.icon ? ICON_MAP[active.icon] : undefined;

  const media = (
    <div className={styles.applicationActiveVisual}>
      {active.image ? (
        <Image
          alt={active.imageAlt ?? active.title}
          fill
          sizes="100vw"
          src={active.image}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className={styles.applicationMediaEmpty}>
          <IconImagePending aria-hidden="true" className={styles.applicationMediaEmptyIcon} />
        </div>
      )}
    </div>
  );

  const content = (
    <div className={styles.applicationActiveContent}>
      <div className={styles.applicationActiveHeading}>
        {ActiveIcon ? <ActiveIcon aria-hidden="true" className={styles.applicationActiveIcon} /> : null}
        <span className={styles.applicationActiveTitle}>{active.title}</span>
      </div>
      {active.description ? <p className={styles.applicationActiveDescription}>{active.description}</p> : null}
    </div>
  );

  return (
    <div className={styles.applicationSelector}>
      {active.href ? (
        <Link className={styles.applicationActiveCard} href={active.href}>
          {media}
          {content}
        </Link>
      ) : (
        <div className={styles.applicationActiveCard}>
          {media}
          {content}
        </div>
      )}

      <div aria-label={active.title} className={styles.applicationSelectorGrid} role="tablist">
        {applications.map((application) => (
          <button
            aria-selected={application.id === active.id}
            className={application.id === active.id ? styles.applicationSelectorItemActive : styles.applicationSelectorItem}
            key={application.id}
            onClick={() => setActiveId(application.id)}
            role="tab"
            type="button"
          >
            {application.title}
          </button>
        ))}
      </div>
    </div>
  );
}

import Image from "next/image";

import type { BusbarSystemDetail } from "@/data/products/busbar/series/types";

import styles from "./busbar-system-detail-page.module.css";

export function BusbarApplicationsSection({
  detail,
}: Readonly<{
  detail: BusbarSystemDetail;
}>) {
  if (detail.applications.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={detail.applicationsEyebrow}
      className={styles.applicationsSection}
    >
      <header className={styles.applicationsHeader}>
        <p className={styles.eyebrow}>{detail.applicationsEyebrow}</p>

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
                sizes="(min-width: 1100px) 31vw, (min-width: 700px) 48vw, 100vw"
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
    </section>
  );
}

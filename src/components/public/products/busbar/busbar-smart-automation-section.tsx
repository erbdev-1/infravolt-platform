import Image from "next/image";
import Link from "next/link";

import type { BusbarSystemDetail } from "@/data/products/busbar/series/types";

import styles from "./busbar-system-detail-page.module.css";

const FEATURE_ICONS = [
  "/assets/icons/products/busbar/g-bus/icon-powerline-communication.svg",
  "/assets/icons/products/busbar/g-bus/icon-remote-monitoring.svg",
  "/assets/icons/products/busbar/g-bus/icon-measurement-scheduling.svg",
] as const;

export function BusbarSmartAutomationSection({
  detail,
}: Readonly<{
  detail: BusbarSystemDetail;
}>) {
  const { smartAutomation } = detail;

  if (!smartAutomation) {
    return null;
  }

  return (
    <section
      aria-label={smartAutomation.eyebrow}
      className={styles.smartAutomationSection}
    >
      <div className={styles.smartAutomationContent}>
        <p className={styles.eyebrow}>{smartAutomation.eyebrow}</p>
        <h2>{smartAutomation.heading}</h2>
        <p className={styles.smartAutomationDescription}>
          {smartAutomation.description}
        </p>

        <p className={styles.smartAutomationCompatibility}>
          <Image
            alt=""
            aria-hidden="true"
            height={18}
            src="/assets/icons/products/busbar/g-bus/icon-check-circle.svg"
            width={18}
          />
          {smartAutomation.compatibilityLine}
        </p>

        <div className={styles.smartAutomationFeatures}>
          {smartAutomation.features.map((feature, index) => (
            <article className={styles.smartAutomationCard} key={feature.title}>
              <Image
                alt=""
                aria-hidden="true"
                height={28}
                src={FEATURE_ICONS[index]}
                width={28}
              />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.smartAutomationActions}>
          <Link
            className={styles.smartAutomationPrimaryButton}
            href={smartAutomation.primaryActionHref}
          >
            {smartAutomation.primaryActionLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className={styles.smartAutomationVisual}>
        <Image
          alt={smartAutomation.imageAlt}
          fill
          sizes="(min-width: 1024px) 46vw, 100vw"
          src={smartAutomation.image}
        />
      </div>
    </section>
  );
}

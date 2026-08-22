import Image from "next/image";
import Link from "next/link";

import {
  PARKING_WATERPROOF_HERO_BACKGROUND,
  PARKING_WATERPROOF_HERO_BACKGROUND_ALT,
  PARKING_WATERPROOF_HERO_FOREGROUND,
  PARKING_WATERPROOF_HERO_FOREGROUND_ALT,
  PARKING_WATERPROOF_SUPPORT_CTA_IMAGE,
  PARKING_WATERPROOF_SUPPORT_CTA_IMAGE_ALT,
  parkingWaterproofLightingContentForMarket,
} from "@/data/products/led-lighting/parking-waterproof-lighting";
import type { MarketCode } from "@/modules/markets/types";

import {
  IconAdjustableAngle,
  IconApplications,
  IconAutomation,
  IconBusbarConnect,
  IconEfficiency,
  IconHighOutput,
  IconImagePending,
  IconMountingOptions,
  IconMultiLens,
  IconMultiStorey,
  IconOptics,
  IconParking,
  IconProtection,
  IconRuggedBody,
  IconSlimBody,
  IconSmartCamera,
  IconSmartNetwork,
  IconSurfaceMount,
  IconSuspension,
  IconTemperedGlass,
  IconWarehouse,
} from "./led-icons";
import styles from "./led-category-detail-page.module.css";

// Dedicated category component for Parking & Waterproof Lighting —
// mirrors led-category-detail-page.tsx's structure exactly (same shared
// .module.css, same section order) but reads its own data/asset
// constants, since that component is hardcoded to the Industrial &
// High-Bay category's own data and is left untouched by this addition.
const APPLICATION_ICONS = [IconParking, IconMultiStorey, IconWarehouse, IconApplications] as const;

// LedProductFeatureIconName is a shared, category-agnostic union (see
// types.ts) — the full map is required even though this category's own
// data only exercises "protection" / "efficiency" / "control" /
// "mounting-options" / "applications", same as
// led-category-detail-page.tsx's own FEATURE_ICONS.
const FEATURE_ICONS = {
  "busbar-connect": IconBusbarConnect,
  suspension: IconSuspension,
  "high-output": IconHighOutput,
  optics: IconOptics,
  "multi-lens": IconMultiLens,
  "mounting-options": IconMountingOptions,
  "slim-body": IconSlimBody,
  efficiency: IconEfficiency,
  "tempered-glass": IconTemperedGlass,
  control: IconAutomation,
  "rugged-body": IconRuggedBody,
  protection: IconProtection,
  "adjustable-angle": IconAdjustableAngle,
  applications: IconApplications,
  "surface-mount": IconSurfaceMount,
  camera: IconSmartCamera,
  "powerline-comms": IconSmartNetwork,
} as const;

const TECHNICAL_SNAPSHOT_ICONS = {
  power: IconEfficiency,
  output: IconHighOutput,
  protection: IconProtection,
  control: IconAutomation,
} as const;

const SUPPORT_REQUEST_HREF = "/uk-support?request=technical-pack&product=parking-waterproof-lighting";

export function LedCategoryDetailPageParkingWaterproof({
  market,
}: Readonly<{
  market: MarketCode;
}>) {
  const content = parkingWaterproofLightingContentForMarket(market);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          alt={PARKING_WATERPROOF_HERO_BACKGROUND_ALT}
          className={styles.heroBackground}
          fill
          priority
          sizes="100vw"
          src={PARKING_WATERPROOF_HERO_BACKGROUND}
        />
        <div className={styles.heroScrim} />

        <div className={styles.heroForeground}>
          <Image
            alt={PARKING_WATERPROOF_HERO_FOREGROUND_ALT}
            fill
            priority
            sizes="(min-width: 1100px) 46vw, 90vw"
            src={PARKING_WATERPROOF_HERO_FOREGROUND}
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>

        <div className={styles.heroTop}>
          <Link className={styles.backButton} href="/products/led-systems">
            <span aria-hidden="true">←</span>
            {content.backToLedSystemsLabel}
          </Link>

          <div className={styles.breadcrumbs}>
            <Link href="/">{content.breadcrumbs.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#product-systems">{content.breadcrumbs.products}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products/led-systems">{content.breadcrumbs.ledSystems}</Link>
            <span aria-hidden="true">/</span>
            <span>{content.breadcrumbs.current}</span>
          </div>
        </div>

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className={styles.heroDescription}>{content.hero.description}</p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href={SUPPORT_REQUEST_HREF}>
              {content.hero.primaryAction}
              <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.secondaryButton} href={SUPPORT_REQUEST_HREF}>
              {content.hero.secondaryAction}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.technicalStrip}>
        <h2 className={styles.srOnlyHeading}>{content.technicalSnapshotHeading}</h2>

        <div className={styles.technicalGrid}>
          {content.technicalSnapshot.map((item) => {
            const SnapshotIcon = TECHNICAL_SNAPSHOT_ICONS[item.icon];

            return (
              <div className={styles.technicalCell} key={item.label}>
                <span aria-hidden="true" className={styles.technicalIconBadge}>
                  <SnapshotIcon className={styles.technicalIcon} />
                </span>

                <div className={styles.technicalCellBody}>
                  <span className={styles.technicalLabel}>{item.label}</span>
                  <span className={styles.technicalValue}>{item.value}</span>
                  {item.caption ? (
                    <span className={styles.technicalCaption}>{item.caption}</span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.series}>
        <div className={styles.seriesHeading}>
          <h2>{content.seriesHeading}</h2>
          <p>{content.seriesIntroduction}</p>
        </div>

        <div className={styles.seriesGrid}>
          {content.series.map((series) => {
            const media = (
              <Image
                alt={series.imageAlt}
                fill
                sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw"
                src={series.image}
              />
            );

            const body = (
              <>
                <div
                  className={
                    series.imageBackground === "dark"
                      ? `${styles.seriesImage} ${styles.seriesImageDark}`
                      : styles.seriesImage
                  }
                >
                  {media}
                  <span className={styles.seriesNumber}>{series.number}</span>
                </div>

                <div className={styles.seriesContent}>
                  <h3>{series.name}</h3>
                  <p className={styles.seriesDescription}>{series.description}</p>

                  <ul className={styles.seriesFeatures}>
                    {series.features.map((feature) => {
                      const FeatureIcon = FEATURE_ICONS[feature.icon];

                      return (
                        <li key={feature.label}>
                          <FeatureIcon className={styles.seriesFeatureIcon} />
                          <span>{feature.label}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {series.href ? (
                    <span className={styles.seriesLinkAction}>
                      {content.viewSeriesLabel}
                      <span aria-hidden="true">→</span>
                    </span>
                  ) : (
                    <span className={styles.seriesBadge}>{content.seriesComingSoonLabel}</span>
                  )}
                </div>
              </>
            );

            return series.href ? (
              <Link className={styles.seriesCard} href={series.href} key={series.slug}>
                {body}
              </Link>
            ) : (
              <article className={styles.seriesCard} key={series.slug}>
                {body}
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.applications}>
        <h2>{content.applicationsHeading}</h2>

        <div className={styles.applicationsGrid}>
          {content.applications.map((application, index) => {
            const ApplicationIcon = APPLICATION_ICONS[index];

            return (
              <article className={styles.applicationCard} key={application.title}>
                <div className={styles.applicationVisual}>
                  {application.image ? (
                    <>
                      <Image
                        alt={application.imageAlt ?? application.title}
                        fill
                        sizes="(min-width: 900px) 25vw, (min-width: 640px) 50vw, 100vw"
                        src={application.image}
                      />
                      <div className={styles.applicationScrim} />
                    </>
                  ) : (
                    <div className={styles.applicationPlaceholder}>
                      <IconImagePending className={styles.applicationPendingIcon} />
                    </div>
                  )}

                  <span className={styles.applicationBadge}>
                    {ApplicationIcon ? <ApplicationIcon className={styles.applicationIcon} /> : null}
                    {application.title}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.supportCta}>
        <Image
          alt={PARKING_WATERPROOF_SUPPORT_CTA_IMAGE_ALT}
          className={styles.supportCtaImage}
          fill
          sizes="100vw"
          src={PARKING_WATERPROOF_SUPPORT_CTA_IMAGE}
        />
        <div className={styles.supportCtaScrim} />

        <div className={styles.supportCtaContent}>
          <p className={styles.supportCtaEyebrow}>{content.supportCta.eyebrow}</p>
          <h2>{content.supportCta.title}</h2>
          <p>{content.supportCta.description}</p>

          <Link className={styles.supportCtaAction} href={SUPPORT_REQUEST_HREF}>
            {content.supportCta.action}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

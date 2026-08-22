import Image from "next/image";
import Link from "next/link";

import {
  UNDERFLOOR_HUB_HERO_BACKGROUND,
  UNDERFLOOR_HUB_HERO_FOREGROUND,
} from "@/data/products/underfloor/assets";
import { underfloorHubContentForMarket } from "@/data/products/underfloor/content";
import type { MarketCode } from "@/modules/markets/types";

import {
  IconAccess,
  IconAdaptable,
  IconCapacity,
  IconCommercialBuilding,
  IconCompliance,
  IconConfiguration,
  IconDistribution,
  IconEducation,
  IconFlexibleWorkspace,
  IconImagePending,
  IconIntegration,
  IconJunction,
  IconMaterial,
  IconMeetingRoom,
  IconMounting,
  IconOffice,
  IconOutlet,
  IconProtection,
  IconRetail,
  IconTrunking,
} from "./underfloor-icons";
import styles from "./underfloor-hub-page.module.css";

const OVERVIEW_ICONS = {
  distribution: IconDistribution,
  integration: IconIntegration,
  access: IconAccess,
  adaptable: IconAdaptable,
} as const;

const SERIES_FEATURE_ICONS = {
  protection: IconProtection,
  material: IconMaterial,
  configuration: IconConfiguration,
  capacity: IconCapacity,
  compliance: IconCompliance,
  mounting: IconMounting,
} as const;

const SYSTEM_STEP_ICONS = {
  trunking: IconTrunking,
  junction: IconJunction,
  outlet: IconOutlet,
} as const;

const APPLICATION_ICONS = {
  office: IconOffice,
  "commercial-building": IconCommercialBuilding,
  "meeting-room": IconMeetingRoom,
  education: IconEducation,
  retail: IconRetail,
  "flexible-workspace": IconFlexibleWorkspace,
} as const;

const SUPPORT_REQUEST_HREF = "/uk-support?request=technical-pack&product=underfloor-systems";

// The Underfloor Cable Trunking category hub page — a sibling top-level
// product line (like Busbar, Cable Management, Earthing & Lightning),
// not an LED Systems sub-category. Its own dark navy/amber theme lives
// entirely in underfloor-hub-page.module.css; no shared LED/Busbar/
// Cable Management component or styles are touched.
export function UnderfloorHubPage({
  market,
}: Readonly<{
  market: MarketCode;
}>) {
  const content = underfloorHubContentForMarket(market);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          alt=""
          aria-hidden="true"
          className={styles.heroBackground}
          fill
          priority
          sizes="100vw"
          src={UNDERFLOOR_HUB_HERO_BACKGROUND}
        />
        <div className={styles.heroScrim} />

        <div className={styles.heroTop}>
          <Link className={styles.backButton} href="/">
            <span aria-hidden="true">←</span>
            {content.backToHomeLabel}
          </Link>

          <div className={styles.breadcrumbs}>
            <Link href="/">{content.breadcrumbs.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#product-systems">{content.breadcrumbs.products}</Link>
            <span aria-hidden="true">/</span>
            <span>{content.breadcrumbs.current}</span>
          </div>
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>{content.hero.eyebrow}</p>
            <h1>{content.hero.title}</h1>
            <p className={styles.heroDescription}>{content.hero.description}</p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="#series">
                {content.hero.primaryAction}
                <span aria-hidden="true">→</span>
              </Link>
              <Link className={styles.secondaryButton} href={SUPPORT_REQUEST_HREF}>
                {content.hero.secondaryAction}
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <Image
              alt={content.heroVisualImageAlt}
              fill
              priority
              sizes="(min-width: 1100px) 46vw, 90vw"
              src={content.heroVisualImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.overview}>
        <h2 className={styles.srOnlyHeading}>{content.overviewHeading}</h2>

        <div className={styles.overviewGrid}>
          {content.overview.map((item) => {
            const ItemIcon = OVERVIEW_ICONS[item.icon];

            return (
              <div className={styles.overviewCell} key={item.title}>
                <span aria-hidden="true" className={styles.overviewIconBadge}>
                  <ItemIcon className={styles.overviewIcon} />
                </span>

                <div className={styles.overviewCellBody}>
                  <span className={styles.overviewTitle}>{item.title}</span>
                  <span className={styles.overviewDescription}>{item.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.series} id="series">
        <div className={styles.sectionHeading}>
          <h2>{content.seriesHeading}</h2>
          <p>{content.seriesIntroduction}</p>
        </div>

        <div className={styles.seriesGrid}>
          {content.series.map((series) => {
            const body = (
              <>
                <div className={styles.seriesImage}>
                  {series.image ? (
                    <Image
                      alt={series.imageAlt ?? series.name}
                      fill
                      sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw"
                      src={series.image}
                    />
                  ) : (
                    <div className={styles.seriesImageEmpty}>
                      <IconImagePending className={styles.seriesImageEmptyIcon} />
                    </div>
                  )}
                  <span className={styles.seriesNumber}>{series.number}</span>
                </div>

                <div className={styles.seriesContent}>
                  <h3>{series.name}</h3>
                  <p className={styles.seriesDescription}>{series.description}</p>

                  <ul className={styles.seriesFeatures}>
                    {series.features.map((feature) => {
                      const FeatureIcon = SERIES_FEATURE_ICONS[feature.icon];

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

      <section className={styles.systemSection}>
        <div className={styles.sectionHeading}>
          <h2>{content.systemHeading}</h2>
          <p>{content.systemIntroduction}</p>
        </div>

        <div className={styles.systemFlow}>
          {content.systemSteps.map((step, index) => {
            const StepIcon = SYSTEM_STEP_ICONS[step.icon];

            return (
              <div className={styles.systemStep} key={step.title}>
                <span aria-hidden="true" className={styles.systemStepNumber}>
                  <StepIcon />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < content.systemSteps.length - 1 ? (
                  <span aria-hidden="true" className={styles.systemConnector}>
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      {content.constructionOptions.length > 0 ? (
        <section className={styles.construction}>
          <div className={styles.sectionHeading}>
            <h2>{content.constructionHeading}</h2>
          </div>

          <div className={styles.constructionGrid}>
            {content.constructionOptions.map((option) => (
              <div className={styles.constructionCard} key={option.title}>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.applications}>
        <div className={styles.sectionHeading}>
          <h2>{content.applicationsHeading}</h2>
        </div>

        <div className={styles.applicationsGrid}>
          {content.applications.map((application) => {
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
      </section>

      <section className={styles.supportCta}>
        <div className={styles.supportCtaInner}>
          <div className={styles.supportCtaCopy}>
            <div className={styles.supportCtaEyebrowRow}>
              <span aria-hidden="true" className={styles.supportCtaAccent} />
              <p className={styles.supportCtaEyebrow}>{content.supportCta.eyebrow}</p>
            </div>
            <h2>{content.supportCta.title}</h2>
            <p className={styles.supportCtaDescription}>{content.supportCta.description}</p>

            <Link className={styles.supportCtaAction} href={SUPPORT_REQUEST_HREF}>
              {content.supportCta.action}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.supportCtaVisual}>
            <Image
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1100px) 38vw, 90vw"
              src={UNDERFLOOR_HUB_HERO_FOREGROUND}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

import {
  LED_HERO_IMAGE,
  LED_HERO_IMAGE_ALT,
  LED_SUPPORT_CTA_IMAGE,
  LED_SUPPORT_CTA_IMAGE_ALT,
  ledLightingHubContentForMarket,
} from "@/data/products/led-lighting/content";
import type { MarketCode } from "@/modules/markets/types";

import {
  IconApplications,
  IconAutomation,
  IconCertified,
  IconData,
  IconImagePending,
  IconPortfolio,
  IconSupport,
} from "./led-icons";
import styles from "./led-lighting-hub-page.module.css";

const VALUE_ICONS = {
  portfolio: IconPortfolio,
  data: IconData,
  applications: IconApplications,
  automation: IconAutomation,
} as const;

const TRUST_ICONS = {
  support: IconSupport,
  applications: IconApplications,
  automation: IconAutomation,
  certified: IconCertified,
} as const;

export function LedLightingHubPage({
  market,
}: Readonly<{
  market: MarketCode;
}>) {
  const content = ledLightingHubContentForMarket(market);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          alt={LED_HERO_IMAGE_ALT}
          className={styles.heroImage}
          fill
          priority
          sizes="100vw"
          src={LED_HERO_IMAGE}
        />
        <div className={styles.heroScrim} />
        <div aria-hidden="true" className={styles.heroGlow} />

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

        <div className={styles.heroContent}>
          <div className={styles.manufacturerLockup}>
            <span className={styles.gersanLogoChip}>
              <Image
                alt="Gersan"
                className={styles.gersanLogo}
                height={34}
                priority
                src="/assets/brand/gersan-logo.png"
                width={140}
              />
            </span>
            <p className={styles.heroEyebrow}>{content.hero.eyebrow}</p>
          </div>

          <h1>{content.hero.title}</h1>
          <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>
          <p className={styles.heroDescription}>{content.hero.description}</p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="#categories">
              {content.hero.primaryAction}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              className={styles.secondaryButton}
              href="/uk-support?request=technical-question&product=led-systems"
            >
              {content.hero.secondaryAction}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.valueStrip}>
        <h2 className={styles.srOnlyHeading}>{content.valueStrip.heading}</h2>

        <div className={styles.valueGrid}>
          {content.valueStrip.items.map((item) => {
            const ValueIcon = VALUE_ICONS[item.icon];

            return (
              <article className={styles.valueCard} key={item.title}>
                <span aria-hidden="true" className={styles.valueIcon}>
                  <ValueIcon className={styles.valueIconSvg} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.categories} id="categories">
        <div className={styles.categoriesHeading}>
          <h2>{content.categoriesHeading}</h2>
          <p>{content.categoriesIntroduction}</p>
        </div>

        <div className={styles.categoriesGrid}>
          {content.categories.map((category) => {
            const media = category.image ? (
              <Image
                alt={category.imageAlt ?? category.name}
                fill
                sizes="(min-width: 900px) 25vw, (min-width: 640px) 50vw, 100vw"
                src={category.image}
              />
            ) : (
              <div className={styles.categoryImagePlaceholder}>
                <IconImagePending className={styles.categoryImagePendingIcon} />
              </div>
            );

            const body = (
              <>
                <div className={styles.categoryImage}>
                  {media}
                  <span className={styles.categoryNumber}>{category.number}</span>
                </div>

                <div className={styles.categoryContent}>
                  <h3>{category.name}</h3>
                  <p className={styles.categoryDescription}>{category.description}</p>
                  {category.href ? (
                    <span className={styles.categoryLinkAction}>
                      {content.viewCategoryLabel}
                      <span aria-hidden="true">→</span>
                    </span>
                  ) : (
                    <span className={styles.categoryBadge}>{content.categoryComingSoonLabel}</span>
                  )}
                </div>
              </>
            );

            return category.href ? (
              <Link className={styles.categoryCard} href={category.href} key={category.slug}>
                {body}
              </Link>
            ) : (
              <article className={styles.categoryCard} key={category.slug}>
                {body}
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.howItWorksHeading}>
          <h2>{content.howItWorksHeading}</h2>
          <p>{content.howItWorksIntroduction}</p>
        </div>

        <ol className={styles.stepsList}>
          {content.steps.map((step, index) => (
            <li className={styles.stepItem} key={step.number}>
              <div className={styles.stepCard}>
                <span aria-hidden="true" className={styles.stepNumber}>
                  {step.number}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              {index < content.steps.length - 1 ? (
                <span aria-hidden="true" className={styles.stepArrow}>
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.trustStrip}>
        <h2 className={styles.srOnlyHeading}>{content.trustHeading}</h2>

        <div className={styles.trustGrid}>
          {content.trustItems.map((item) => {
            const TrustIcon = TRUST_ICONS[item.icon];

            return (
              <article className={styles.trustCard} key={item.title}>
                <TrustIcon className={styles.trustIcon} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.bottomCta}>
        <Image
          alt={LED_SUPPORT_CTA_IMAGE_ALT}
          className={styles.bottomCtaImage}
          fill
          sizes="100vw"
          src={LED_SUPPORT_CTA_IMAGE}
        />
        <div className={styles.bottomCtaScrim} />

        <div className={styles.bottomCtaContent}>
          <div className={styles.bottomCtaBrand}>
            <Image
              alt="InfraVolt"
              className={styles.infravoltWordmark}
              height={26}
              src="/assets/brand/infravolt-wordmark-transparent.webp"
              width={134}
            />
            <p className={styles.bottomCtaEyebrow}>{content.bottomCta.eyebrow}</p>
          </div>

          <h2>{content.bottomCta.title}</h2>
          <p>{content.bottomCta.description}</p>

          <Link
            className={styles.bottomCtaAction}
            href="/uk-support?request=technical-question&product=led-systems"
          >
            {content.bottomCta.action}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

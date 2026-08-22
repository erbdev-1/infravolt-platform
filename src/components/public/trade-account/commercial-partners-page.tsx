import Link from "next/link";

import { InfraVoltLogo } from "@/components/brand/infravolt-logo";
import type { MarketCode } from "@/modules/markets/types";
import { commercialPartnersContentForMarket } from "@/modules/public-site/trade-account-content";

import { TradeApplicationForm } from "./trade-application-form";
import styles from "./trade-account-page.module.css";

export function CommercialPartnersPage({ market }: Readonly<{ market: MarketCode }>) {
  const content = commercialPartnersContentForMarket(market);

  return (
    <main className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbHome}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{content.breadcrumbCurrent}</span>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLogo}>
            <InfraVoltLogo
              accessibleLabel={content.hero.logoLabel}
              href="/"
              placement="footer"
              variant="transparent"
            />
          </div>
          <p className={styles.heroEyebrow}>{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className={styles.heroDescription}>{content.hero.description}</p>
          <p className={styles.heroSupporting}>{content.hero.supportingLine}</p>

          <div className={styles.heroReviewNote}>
            <span aria-hidden="true" className={styles.heroReviewMark} />
            {content.hero.reviewNote}
          </div>

          <ul className={styles.heroBenefits}>
            {content.hero.benefits.map((benefit) => (
              <li key={benefit}>
                <span aria-hidden="true">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden="true" className={styles.heroGrid} />
      </section>

      <section className={styles.audience} aria-labelledby="audience-heading">
        <h2 className={styles.audienceHeading} id="audience-heading">
          {content.audience.heading}
        </h2>
        <div className={styles.audienceRow}>
          {content.audience.items.map((item) => (
            <div className={styles.audienceItem} key={item.title}>
              <span aria-hidden="true" className={styles.audienceIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M5 19h14M7 19V9l5-4 5 4v10M10 19v-5h4v5" />
                </svg>
              </span>
              <div>
                <p className={styles.audienceTitle}>{item.title}</p>
                <p className={styles.audienceDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TradeApplicationForm content={content} market={market} />

      <section className={styles.review} aria-labelledby="review-heading">
        <div className={styles.reviewHeading}>
          <p className={styles.reviewEyebrow}>{content.review.eyebrow}</p>
          <h2 id="review-heading">{content.review.heading}</h2>
        </div>
        <ol className={styles.reviewSteps}>
          {content.review.steps.map((step) => (
            <li className={styles.reviewStep} key={step.number}>
              <span className={styles.reviewStepNumber}>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.supportStrip}>
        <div className={styles.supportStripInner}>
          <div>
            <p className={styles.supportStripTitle}>{content.supportStrip.title}</p>
            <p className={styles.supportStripDescription}>{content.supportStrip.description}</p>
          </div>
          <Link className={styles.supportStripAction} href="/contact?type=general">
            {content.supportStrip.action}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

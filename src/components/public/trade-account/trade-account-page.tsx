import Image from "next/image";
import Link from "next/link";

import { LinkButton } from "@/components/ui/link-button";
import type { MarketCode } from "@/modules/markets/types";
import { tradeAccountStatusContentForMarket } from "@/modules/public-site/trade-account-status-content";

import styles from "./trade-account-status-page.module.css";

export function TradeAccountPage({ market }: Readonly<{ market: MarketCode }>) {
  const content = tradeAccountStatusContentForMarket(market);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="trade-account-title">
        <div className={styles.technicalField} aria-hidden="true">
          <span className={styles.traceRed} />
          <span className={styles.traceBlue} />
          <span className={styles.traceNodeOne} />
          <span className={styles.traceNodeTwo} />
        </div>

        <div className={styles.content}>
          <Link aria-label={content.logoLabel} className={styles.logoLink} href="/">
            <Image
              alt=""
              aria-hidden="true"
              className={styles.logo}
              height={235}
              priority
              src="/assets/brand/infravolt-wordmark-transparent.webp"
              unoptimized
              width={1040}
            />
          </Link>

          <div className={styles.identityRow}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <p className={styles.status}>
              <span aria-hidden="true" />
              {content.status}
            </p>
          </div>

          <h1 id="trade-account-title">{content.title}</h1>
          <p className={styles.description}>{content.description}</p>
          <p className={styles.secondaryDescription}>
            {content.secondaryDescription}
          </p>

          <div className={styles.features}>
            <h2>{content.featureHeading}</h2>
            <ul>
              {content.features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.meantime}>
            <p className={styles.meantimeLabel}>{content.meantimeLabel}</p>
            <p>{content.meantimeBody}</p>
          </div>

          <div className={styles.actions}>
            <LinkButton href={content.primaryAction.href} variant="accent">
              {content.primaryAction.label}
            </LinkButton>
            <LinkButton href={content.secondaryAction.href} variant="light-outline">
              {content.secondaryAction.label}
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}

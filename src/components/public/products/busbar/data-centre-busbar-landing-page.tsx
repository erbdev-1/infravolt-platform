import Image from "next/image";
import Link from "next/link";

import { dataCentreBusbarLandingContentForMarket } from "@/data/products/busbar/data-centre-landing-content";
import type { MarketCode } from "@/modules/markets/types";
import { publicMediaUrl } from "@/modules/storage/asset-url";

import styles from "./data-centre-busbar-landing-page.module.css";

// Reuses the same GS Super Compact transparent product render already
// approved for the Data Centre Application Map's "Busbar Systems" product
// family card (modules/application-map/data-centre.ts) — no new or
// duplicated asset for this page.
const HERO_IMAGE = publicMediaUrl(
  "products/busbar/gs/card/gs-main-transparent-product.webp",
);

export function DataCentreBusbarLandingPage({
  market,
}: Readonly<{
  market: MarketCode;
}>) {
  const content = dataCentreBusbarLandingContentForMarket(market);

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbs.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products/busbar">{content.breadcrumbs.busbar}</Link>
        <span aria-hidden="true">/</span>
        <span>{content.breadcrumbs.current}</span>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className={styles.heroDescription}>{content.hero.description}</p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href={content.hero.primaryActionHref}>
              {content.hero.primaryAction}
            </Link>
            <Link className={styles.secondaryButton} href={content.hero.secondaryActionHref}>
              {content.hero.secondaryAction}
            </Link>
          </div>

          <p className={styles.tertiaryLink}>
            <Link href={content.hero.tertiaryActionHref}>{content.hero.tertiaryAction}</Link>
          </p>
        </div>

        <div className={styles.heroVisual}>
          <Image
            alt="Gersan GS Super Compact busbar system"
            height={520}
            priority
            src={HERO_IMAGE}
            width={520}
          />
        </div>
      </section>

      <p className={styles.entityStatement}>{content.entityStatement}</p>

      <section className={styles.directAnswer}>
        <h2>{content.directAnswer.heading}</h2>
        <p>{content.directAnswer.answer}</p>
      </section>

      <section className={styles.useCases}>
        <h2>{content.useCasesHeading}</h2>
        <div className={styles.useCasesGrid}>
          {content.useCases.map((useCase) => (
            <article key={useCase.title}>
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.comparison} id="system-comparison">
        <h2>{content.comparison.heading}</h2>
        <p className={styles.comparisonIntroduction}>{content.comparison.introduction}</p>

        <div className={styles.tableWrap}>
          <table>
            <caption className={styles.srOnly}>{content.comparison.heading}</caption>
            <thead>
              <tr>
                <th scope="col">{content.comparison.columnLabels.system}</th>
                <th scope="col">{content.comparison.columnLabels.currentRange}</th>
                <th scope="col">{content.comparison.columnLabels.conductorOptions}</th>
                <th scope="col">{content.comparison.columnLabels.role}</th>
                <th scope="col">{content.comparison.columnLabels.protectionNote}</th>
                <th scope="col">{content.comparison.columnLabels.action}</th>
              </tr>
            </thead>
            <tbody>
              {content.comparison.rows.map((row) => (
                <tr key={row.system}>
                  <th data-label={content.comparison.columnLabels.system} scope="row">
                    {row.system}
                  </th>
                  <td data-label={content.comparison.columnLabels.currentRange}>{row.currentRange}</td>
                  <td data-label={content.comparison.columnLabels.conductorOptions}>
                    {row.conductorOptions}
                  </td>
                  <td data-label={content.comparison.columnLabels.role}>{row.role}</td>
                  <td data-label={content.comparison.columnLabels.protectionNote}>
                    {row.protectionNote}
                  </td>
                  <td data-label={content.comparison.columnLabels.action}>
                    <Link href={row.href}>{row.system}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.whyBusbar}>
        <h2>{content.whyBusbarHeading}</h2>
        <ul>
          {content.whyBusbar.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.checklist}>
        <h2>{content.checklistHeading}</h2>
        <ul>
          {content.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.faq}>
        <h2>{content.faqHeading}</h2>
        {content.faq.map((item) => (
          <div className={styles.faqItem} key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>

      <section className={styles.applicationMap}>
        <div>
          <h2>{content.applicationMap.heading}</h2>
          <p>{content.applicationMap.description}</p>
        </div>
        <Link className={styles.secondaryButton} href="/application-map">
          {content.applicationMap.linkLabel}
        </Link>
      </section>

      <section className={styles.projectSupport}>
        <div>
          <p className={styles.eyebrow}>{content.projectCta.eyebrow}</p>
          <h2>{content.projectCta.title}</h2>
          <p>{content.projectCta.description}</p>
        </div>

        <div className={styles.projectSupportActions}>
          <Link className={styles.primaryButton} href={content.projectCta.actionHref}>
            {content.projectCta.action}
          </Link>
          <Link className={styles.secondaryButton} href={content.projectCta.secondaryActionHref}>
            {content.projectCta.secondaryAction}
          </Link>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

import { dataCentreCableManagementLandingContentForMarket } from "@/data/products/cable-management/data-centre-landing-content";
import type { MarketCode } from "@/modules/markets/types";
import { publicMediaUrl } from "@/modules/storage/asset-url";

import styles from "./data-centre-cable-management-landing-page.module.css";

// Wire-Mesh Cable Trays are the strongest evidence-backed data-hall/
// overhead-structured-cabling option on this page (the Data Centre
// Application Map explicitly shows wire-mesh tray above the server rack
// rows) — reusing that family's existing transparent product render, same
// pattern as the Data Centre Busbar landing page. No new or duplicated
// asset for this page.
const HERO_IMAGE = publicMediaUrl(
  "products/cable-management/wire-mesh-cable-systems/hero/wire-mesh-systems-transparent-hero.png",
);

export function DataCentreCableManagementLandingPage({
  market,
}: Readonly<{
  market: MarketCode;
}>) {
  const content = dataCentreCableManagementLandingContentForMarket(market);

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbs.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products/cable-support-systems">{content.breadcrumbs.cableManagement}</Link>
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
            alt="Gersan wire-mesh cable tray system"
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
                <th scope="col">{content.comparison.columnLabels.role}</th>
                <th scope="col">{content.comparison.columnLabels.constructionNote}</th>
                <th scope="col">{content.comparison.columnLabels.action}</th>
              </tr>
            </thead>
            <tbody>
              {content.comparison.rows.map((row) => (
                <tr key={row.system}>
                  <th data-label={content.comparison.columnLabels.system} scope="row">
                    {row.system}
                  </th>
                  <td data-label={content.comparison.columnLabels.role}>{row.role}</td>
                  <td data-label={content.comparison.columnLabels.constructionNote}>
                    {row.constructionNote}
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

      <section className={styles.checklist}>
        <h2>{content.checklistHeading}</h2>
        <ul>
          {content.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.standardsNote}>
        <div>
          <h2>{content.standardsNote.heading}</h2>
          <p>{content.standardsNote.note}</p>
        </div>
        <Link className={styles.secondaryButton} href={content.standardsNote.actionHref}>
          {content.standardsNote.actionLabel}
        </Link>
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

      <section className={styles.relatedSystems}>
        <div>
          <h2>{content.relatedSystems.heading}</h2>
          <p>{content.relatedSystems.description}</p>
        </div>
        <Link className={styles.secondaryButton} href={content.relatedSystems.linkHref}>
          {content.relatedSystems.linkLabel}
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

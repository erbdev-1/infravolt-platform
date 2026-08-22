import Link from "next/link";

import type { MarketCode } from "@/modules/markets/types";
import type { EnquirySourceContext, EnquiryType } from "@/modules/enquiry/types";
import { contactPageContentForMarket } from "@/modules/public-site/contact-content";

import { EnquiryWorkspace } from "./enquiry-workspace";
import styles from "./contact-page.module.css";

export function ContactPage({
  market,
  initialType,
  initialContext,
}: Readonly<{
  market: MarketCode;
  initialType: EnquiryType;
  initialContext: EnquirySourceContext;
}>) {
  const content = contactPageContentForMarket(market);

  return (
    <main className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbHome}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{content.breadcrumbCurrent}</span>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p>{content.hero.eyebrow}</p>
            <h1>{content.hero.heading}</h1>
            <span>{content.hero.description}</span>
            <div className={styles.heroMarket}>{content.hero.market}</div>
          </div>

          <aside aria-label={content.hero.contactDetails.heading} className={styles.heroContactPanel}>
            <p>{content.hero.contactDetails.heading}</p>
            {content.hero.contactDetails.email ? (
              <a className={styles.heroEmail} href={`mailto:${content.hero.contactDetails.email}`}>
                <strong>{content.hero.contactDetails.email}</strong>
              </a>
            ) : null}
          </aside>
        </div>
        <div aria-hidden="true" className={styles.heroGrid} />
      </section>

      <div className={styles.body}>
        <EnquiryWorkspace content={content} initialContext={initialContext} initialType={initialType} market={market} />
      </div>
    </main>
  );
}

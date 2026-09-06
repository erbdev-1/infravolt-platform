import Image from "next/image";
import Link from "next/link";

import { dataCentreInfrastructureHubContentForMarket } from "@/data/data-centres/content";
import { DATA_CENTRE_APPLICATION_MAP } from "@/modules/application-map/data-centre";
import type { MarketCode } from "@/modules/markets/types";
import { publicMediaUrl } from "@/modules/storage/asset-url";

import styles from "./data-centre-infrastructure-hub.module.css";

// Reuses the Data Centre Application Map's own overview image — already an
// approved, illustrative asset for exactly this sector-level context. No
// new or duplicated asset for this page.
const HERO_IMAGE = publicMediaUrl("application-map/data-centre/overview/data-centre-overview.webp");

const HERO_IMAGE_ALT: Readonly<Record<MarketCode, string>> = {
  uk: "Aerial night view of a Data Centre campus showing the substation, main building, generator hall and EV charging area",
  ua: "Нічний вигляд з висоти на кампус центру обробки даних із підстанцією, головною будівлею, залою генераторів та зоною зарядки електромобілів",
};

export function DataCentreInfrastructureHub({
  market,
}: Readonly<{
  market: MarketCode;
}>) {
  const content = dataCentreInfrastructureHubContentForMarket(market);
  // Zone names are read directly from the Application Map's own data, in
  // its own canonical order — never duplicated or invented here.
  const zones = DATA_CENTRE_APPLICATION_MAP.zones;

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbs.home}</Link>
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
        </div>

        <div className={styles.heroVisual}>
          <Image alt={HERO_IMAGE_ALT[market]} height={420} priority src={HERO_IMAGE} width={640} />
        </div>
      </section>

      <p className={styles.entityStatement}>{content.entityStatement}</p>

      <section className={styles.directAnswer}>
        <h2>{content.directAnswer.heading}</h2>
        <p>{content.directAnswer.answer}</p>
      </section>

      <section className={styles.coreSystems}>
        <h2>{content.coreSystemsHeading}</h2>
        <p className={styles.coreSystemsIntroduction}>{content.coreSystemsIntroduction}</p>

        <div className={styles.coreSystemsGrid}>
          {content.coreSystems.map((system) => (
            <article className={styles.coreSystemCard} key={system.title}>
              <h3>{system.title}</h3>
              <p>{system.purpose}</p>
              <ul>
                {system.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link href={system.href}>{system.linkLabel}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.zones}>
        <h2>{content.zones.heading}</h2>
        <p className={styles.zonesIntroduction}>{content.zones.introduction}</p>

        <div className={styles.zonesGrid}>
          {zones.map((zone) => (
            <span className={styles.zoneChip} key={zone.id}>
              {zone.content[market].name}
            </span>
          ))}
        </div>

        <p className={styles.zonesAdditionalNote}>{content.zones.additionalSystemsNote}</p>

        <Link className={styles.secondaryButton} href="/application-map">
          {content.zones.ctaLabel}
        </Link>
      </section>

      <section className={styles.applicationMapCta}>
        <div>
          <h2>{content.applicationMapCta.heading}</h2>
          <p>{content.applicationMapCta.description}</p>
        </div>
        <Link className={styles.secondaryButton} href="/application-map">
          {content.applicationMapCta.linkLabel}
        </Link>
      </section>

      <section className={styles.projectCoordination}>
        <h2>{content.projectCoordination.heading}</h2>
        <p className={styles.projectCoordinationIntroduction}>{content.projectCoordination.introduction}</p>
        <ul>
          {content.projectCoordination.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.disclaimer}>{content.projectCoordination.disclaimer}</p>
      </section>

      <section className={styles.standards}>
        <h2>{content.standards.heading}</h2>
        <p className={styles.standardsIntroduction}>{content.standards.introduction}</p>

        <div className={styles.standardsGrid}>
          <div className={styles.standardsCard}>
            <h3>{content.standards.busbarLabel}</h3>
            <p>{content.standards.busbarNote}</p>
          </div>
          <div className={styles.standardsCard}>
            <h3>{content.standards.cableManagementLabel}</h3>
            <p>{content.standards.cableManagementNote}</p>
          </div>
          <div className={styles.standardsCard}>
            <h3>{content.standards.earthingLabel}</h3>
            <p>{content.standards.earthingNote}</p>
          </div>
        </div>

        <p className={styles.standardsClosingNote}>{content.standards.closingNote}</p>
      </section>

      <section className={styles.faq}>
        <h2>{content.faqHeading}</h2>
        {content.faq.map((item) => (
          <div className={styles.faqItem} key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
            {item.linkHref && item.linkLabel ? (
              <Link href={item.linkHref}>{item.linkLabel}</Link>
            ) : null}
          </div>
        ))}
      </section>

      <section className={styles.clusterNavigation}>
        <h2>{content.clusterNavigation.heading}</h2>
        <p>{content.clusterNavigation.description}</p>
        <div className={styles.clusterNavigationLinks}>
          {content.clusterNavigation.links.map((link) => (
            <Link className={styles.secondaryButton} href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
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

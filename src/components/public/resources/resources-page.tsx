import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { preload } from "react-dom";

import { resourcesContentForMarket, technicalResources } from "@/data/resources";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import { TECHNICAL_RESOURCE_ICONS } from "@/modules/public-site/assets";
import type { MarketCode } from "@/modules/markets/types";
import { publicMediaUrl } from "@/modules/storage/asset-url";

import { ResourceLibrary } from "./resource-library";
import styles from "./resources-page.module.css";

const HERO_BACKGROUND_DESKTOP_URL = publicMediaUrl("resources/technical-resources-hero-background.webp");
const HERO_BACKGROUND_MOBILE_URL = publicMediaUrl("resources/technical-resources-hero-background-mobile.webp");

const heroStyle = {
  "--hero-background-image": `url(${HERO_BACKGROUND_DESKTOP_URL})`,
  "--hero-mobile-background-image": `url(${HERO_BACKGROUND_MOBILE_URL})`,
} as CSSProperties;

const overviewIcons = {
  certificate: TECHNICAL_RESOURCE_ICONS.certificatesTests,
  catalogue: TECHNICAL_RESOURCE_ICONS.datasheets,
  technical: TECHNICAL_RESOURCE_ICONS.installationGuidance,
} as const;

export function ResourcesPage({ market }: Readonly<{ market: MarketCode }>) {
  const content = resourcesContentForMarket(market);

  // Confirmed LCP element (see docs/performance audit) — preload only the
  // variant the current viewport will actually use, matching the .hero
  // background-image media query below, so we never fetch both.
  preload(HERO_BACKGROUND_DESKTOP_URL, { as: "image", media: "(min-width: 761px)" });
  preload(HERO_BACKGROUND_MOBILE_URL, { as: "image", media: "(max-width: 760px)" });

  return (
    <main className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbHome}</Link><span aria-hidden="true">/</span><span aria-current="page">{content.breadcrumbCurrent}</span>
      </nav>
      <section className={styles.hero} style={heroStyle}>
        <div className={styles.heroInner}>
          <p>{content.eyebrow}</p><h1>{content.heading}</h1><span>{content.introduction}</span>
          <div className={styles.heroActions}>
            <a className={styles.heroPrimary} href="#resource-library">{content.browseLabel}</a>
            <a className={styles.heroSecondary} href="#request-technical-information">{content.requestLabel}</a>
          </div>
        </div>
        <div aria-hidden="true" className={styles.heroGrid} />
      </section>

      <section aria-label={content.libraryHeading} className={styles.overview}>
        {content.overview.map((item) => (
          <a className={styles.overviewCard} data-resource-type={item.type} href="#resource-library" key={item.type}>
            <span aria-hidden="true" className={styles.overviewIcon}>
              <Image alt="" height={26} src={overviewIcons[item.type]} unoptimized width={26} />
            </span>
            <h2>{item.title}</h2><p>{item.description}</p><span className={styles.overviewAction}>{item.action}<b aria-hidden="true">→</b></span>
          </a>
        ))}
      </section>

      <section className={styles.library} id="resource-library">
        <header className={styles.sectionHeader}><p>{content.libraryEyebrow}</p><h2>{content.libraryHeading}</h2><span>{content.libraryDescription}</span></header>
        <ResourceLibrary content={content} resources={technicalResources} />
      </section>

      <section className={styles.request} id="request-technical-information">
        <div><p>{content.requestEyebrow}</p><h2>{content.requestHeading}</h2><span>{content.requestDescription}</span><a href={buildEnquiryHref("technical-document", { source: "/resources" })}>{content.requestAction}<b aria-hidden="true">→</b></a></div>
        <ul>{content.requestItems.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

import { EARTHING_CATALOGUE_PDF_HREF, earthingHubContentForMarket } from "@/data/products/earthing-lightning/content";
import type { EarthingSolutionPathwayId } from "@/data/products/earthing-lightning/types";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";
import { publicMediaUrl } from "@/modules/storage/asset-url";

import { ApplicationsCarousel } from "./earthing-applications-carousel";
import { EarthingGuidanceAccordion } from "./earthing-guidance-accordion";
import {
  IconBondingBar,
  IconBondLink,
  IconCapacity,
  IconDownload,
  IconElectrode,
  IconHazard,
  IconLightningRod,
  IconResistance,
} from "./earthing-icons";
import styles from "./earthing-lightning-hub-page.module.css";
import { TechnicalSnapshotStrip } from "./technical-snapshot-strip";

function categoryProductHref(slug: string): string {
  return `/products/earthing-and-lightning-protection/${slug}`;
}

const PATHWAY_ICONS = {
  "complete-earthing-systems": IconElectrode,
  "external-lightning-protection": IconLightningRod,
  "equipotential-bonding": IconBondingBar,
  "industrial-hazardous-grounding": IconHazard,
} as const satisfies Record<
  EarthingSolutionPathwayId,
  typeof IconElectrode
>;

const PRINCIPLE_ICONS = [IconResistance, IconCapacity, IconBondLink] as const;

export function EarthingLightningHubPage({
  market,
}: Readonly<{
  market: MarketCode;
}>) {
  const content = earthingHubContentForMarket(market);

  return (
    <main className={styles.page}>
      <div className={styles.backNav}>
        <Link className={styles.backButton} href="/">
          <span aria-hidden="true">←</span>
          {content.backToHomeLabel}
        </Link>
      </div>

      <div className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbs.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#product-systems">{content.breadcrumbs.products}</Link>
        <span aria-hidden="true">/</span>
        <span>{content.breadcrumbs.current}</span>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.manufacturerLockup}>
            <Image
              alt="Gersan"
              className={styles.gersanLogo}
              height={42}
              priority
              src="/assets/brand/gersan-logo.png"
              width={170}
            />
          </div>

          <h1>{content.hero.title}</h1>

          <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>
          <p className={styles.heroDescription}>{content.hero.description}</p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="#categories">
              {content.hero.primaryAction}
            </Link>

            <a
              aria-label={content.downloadCatalogueAccessibleName}
              className={styles.catalogueButton}
              download
              href={EARTHING_CATALOGUE_PDF_HREF}
            >
              <IconDownload aria-hidden="true" className={styles.catalogueButtonIcon} />
              <span>
                {content.downloadCatalogueAction}
                <small>{content.downloadCatalogueMeta}</small>
              </span>
            </a>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <video
            aria-label={content.hero.videoLabel}
            autoPlay
            className={styles.heroVideo}
            loop
            muted
            playsInline
            poster={publicMediaUrl("media/products/earthing-lightning/infravolt-earthing-lightning-poster.webp")}
            preload="metadata"
          >
            <source
              src={publicMediaUrl("media/products/earthing-lightning/infravolt-earthing-lightning.mp4")}
              type="video/mp4"
            />
          </video>

          <div className={styles.heroVideoOverlay} />
        </div>
      </section>

      <TechnicalSnapshotStrip items={content.technicalSnapshot} label={content.breadcrumbs.current} />

      <section className={styles.pathways}>
        <h2>{content.pathwaysHeading}</h2>

        <div className={styles.pathwaysGrid}>
          {content.pathways.map((pathway) => {
            const PathwayIcon = PATHWAY_ICONS[pathway.id];

            return (
              <article className={styles.pathwayCard} key={pathway.id}>
                <PathwayIcon className={styles.pathwayIcon} />
                <h3>{pathway.title}</h3>
                <p>{pathway.description}</p>
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
          {content.categories.map((category) => (
            <Link
              className={styles.categoryCard}
              href={categoryProductHref(category.slug)}
              key={category.slug}
            >
              <div className={styles.categoryImage}>
                <Image
                  alt={category.imageAlt}
                  fill
                  sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw"
                  src={category.image}
                />
              </div>

              <div className={styles.categoryContent}>
                <h3>{category.name}</h3>
                <p className={styles.categoryDescription}>{category.description}</p>
                <p className={styles.categoryFamilyCount}>{category.familyCount}</p>
              </div>

              <span className={styles.categoryAction}>
                {content.viewProducts}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.principlesSection}>
        <div className={styles.principles}>
          <h2>{content.principlesHeading}</h2>

          <ol className={styles.principlesList}>
            {content.principles.map((principle, index) => {
              const PrincipleIcon = PRINCIPLE_ICONS[index];

              return (
                <li key={principle}>
                  {PrincipleIcon ? (
                    <span aria-hidden="true" className={styles.principleIcon}>
                      <PrincipleIcon />
                    </span>
                  ) : null}
                  <span>{principle}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className={styles.guidance}>
        <div className={styles.guidanceHeading}>
          <h2>{content.guidanceHeading}</h2>
          <p>{content.guidanceIntroduction}</p>
        </div>

        <EarthingGuidanceAccordion items={content.guidance} />
      </section>

      <section className={styles.applicationsSection}>
        <div className={styles.applicationsHeading}>
          <h2>{content.applicationsHeading}</h2>
          <p>{content.applicationsIntroduction}</p>
        </div>

        <ApplicationsCarousel
          applications={content.applications}
          exploreLabel={content.exploreApplicationMap}
          nextLabel={content.applicationsNextLabel}
          previousLabel={content.applicationsPreviousLabel}
        />
      </section>

      <section className={styles.projectSupport}>
        <div>
          <div className={styles.supportIdentity}>
            <div className={styles.supportBrand}>
              <Image
                alt="InfraVolt"
                className={styles.infravoltWordmark}
                height={30}
                src="/assets/brand/infravolt-wordmark-primary.webp"
                width={154}
              />
            </div>
            <p className={styles.supportEyebrow}>{content.support.eyebrow}</p>
          </div>

          <h2>{content.support.title}</h2>
          <p>{content.support.description}</p>
        </div>

        <Link
          href={buildEnquiryHref("technical-document", {
            system: "earthing-lightning",
            source: "/products/earthing-and-lightning-protection",
          })}
        >
          {content.support.action}
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}

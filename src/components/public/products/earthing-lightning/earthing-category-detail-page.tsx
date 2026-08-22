import Image from "next/image";
import Link from "next/link";

import { EARTHING_CATALOGUE_PDF_HREF, earthingHubContentForMarket } from "@/data/products/earthing-lightning/content";
import type { LocalizedEarthingCategory } from "@/data/products/earthing-lightning/types";
import { EARTHING_CATEGORY_VARIANTS } from "@/data/products/earthing-lightning/variants";
import type { MarketCode } from "@/modules/markets/types";

import { IconDownload } from "./earthing-icons";
import { slugifyFamilyName } from "./earthing-family-slug";
import { EarthingHeroEffects } from "./earthing-hero-effects";
import { EarthingHeroParallax } from "./earthing-hero-parallax";
import { EarthingVariantTable } from "./earthing-variant-table";
import styles from "./earthing-category-detail-page.module.css";
import { TechnicalSnapshotStrip } from "./technical-snapshot-strip";

function familyRequestHref(categorySlug: string, familyName: string): string {
  const family = encodeURIComponent(familyName);

  return `/uk-support?request=technical-pack&product=earthing-${categorySlug}&family=${family}`;
}

export function EarthingCategoryDetailPage({
  market,
  category,
}: Readonly<{
  market: MarketCode;
  category: LocalizedEarthingCategory;
}>) {
  const content = earthingHubContentForMarket(market);
  const detail = content.categoryDetail;
  const categoryRequestHref = `/uk-support?request=technical-pack&product=earthing-${category.slug}`;
  const categoryVariants = EARTHING_CATEGORY_VARIANTS[category.slug];
  const variantGroups = categoryVariants
    ? category.families
        .map((family) => ({
          familyName: family.name,
          variants: categoryVariants[family.name] ?? [],
          image: family.image,
          imageAlt: family.imageAlt,
        }))
        .filter((group) => group.variants.length > 0)
    : [];
  // Reused as-is from the snapshot strip already on this page — never a
  // separate/fabricated claim, and absent for the categories (Exothermic
  // Welding, Inspection & Ground Enhancement) with no "shield" item.
  const standardSnapshotItem = category.technicalSnapshot.find((item) => item.icon === "shield");
  const standardLabel = standardSnapshotItem
    ? Array.isArray(standardSnapshotItem.value)
      ? standardSnapshotItem.value[0]
      : standardSnapshotItem.value
    : undefined;

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href="/">{content.breadcrumbs.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products/earthing-and-lightning-protection">
          {content.breadcrumbs.current}
        </Link>
        <span aria-hidden="true">/</span>
        <span>{category.name}</span>
      </div>

      <div className={styles.backNav}>
        <Link
          className={styles.backButton}
          href="/products/earthing-and-lightning-protection#categories"
        >
          <span aria-hidden="true">←</span>
          {detail.backLabel}
        </Link>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{content.categoriesHeading}</p>

          <h1>{category.name}</h1>

          <p className={styles.heroDescription}>{category.description}</p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href={categoryRequestHref}>
              {detail.requestPackAction}
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

        <div className={styles.heroVisual} data-family={category.slug}>
          <div aria-hidden="true" className={styles.heroVisualGlow} />

          {category.slug === "inspection-ground-enhancement" ? (
            <div aria-hidden="true" className={styles.groundingGlow} />
          ) : null}

          <div className={styles.heroVisualFloat}>
            <EarthingHeroParallax className={styles.heroVisualParallax}>
              <div
                className={
                  category.slug === "conductors-tapes"
                    ? styles.heroVisualDriftLayer
                    : styles.heroVisualStaticLayer
                }
              >
                <Image
                  alt={category.imageAlt}
                  className={styles.heroVisualImage}
                  fill
                  priority
                  sizes="(min-width: 1100px) 42vw, 100vw"
                  src={category.heroImage ?? category.image}
                />

                {category.slug === "conductors-tapes" ? (
                  <span aria-hidden="true" className={styles.coilGlow} />
                ) : null}
              </div>

              <span aria-hidden="true" className={styles.heroVisualSweep} />
              <EarthingHeroEffects slug={category.slug} />
            </EarthingHeroParallax>
          </div>
        </div>
      </section>

      <TechnicalSnapshotStrip items={category.technicalSnapshot} label={category.name} />

      <section className={styles.families}>
        <div className={styles.familiesHeading}>
          <h2>{detail.familiesHeading}</h2>
          <p>{detail.familiesIntroduction}</p>
        </div>

        <div className={styles.familiesGrid}>
          {category.families.map((family, index) => {
            const indexLabel = String(index + 1).padStart(2, "0");
            const hasVariants = Boolean(categoryVariants?.[family.name]?.length);

            const cardContent = (
              <>
                <div className={styles.familyMedia}>
                  <span className={styles.familyIndex} aria-hidden="true">
                    {indexLabel}
                  </span>

                  {family.image ? (
                    <Image
                      alt={family.imageAlt ?? family.name}
                      className={styles.familyImage}
                      fill
                      sizes="(min-width: 1100px) 22vw, (min-width: 640px) 45vw, 90vw"
                      src={family.image}
                    />
                  ) : null}
                </div>

                <div className={styles.familyBody}>
                  <h3>{family.name}</h3>
                  <p>{family.description}</p>
                </div>

                <div className={styles.familyFooter}>
                  <span>
                    {hasVariants ? detail.familyViewProductsAction : detail.familyTechnicalOnRequestAction}
                  </span>
                  <span aria-hidden="true" className={styles.familyFooterArrow}>
                    →
                  </span>
                </div>
              </>
            );

            // Two genuinely different destinations: a same-page anchor into
            // the order-code accordion below (a plain <a>, not next/link —
            // Link's client-side routing for a hash-only href was the
            // actual cause of the "navigates away" bug), or a real route to
            // the technical-pack request form when this family has no
            // catalogue data yet.
            return hasVariants ? (
              <a className={styles.familyCard} href={`#${slugifyFamilyName(family.name)}`} key={family.name}>
                {cardContent}
              </a>
            ) : (
              <Link
                className={styles.familyCard}
                href={familyRequestHref(category.slug, family.name)}
                key={family.name}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>

      {variantGroups.length > 0 ? (
        <EarthingVariantTable
          categoryName={category.name}
          categorySlug={category.slug}
          groups={variantGroups}
          labels={detail}
          market={market}
          standardLabel={standardLabel}
        />
      ) : null}

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
          <p>{detail.requestPackDescription}</p>
        </div>

        <Link href={categoryRequestHref}>
          {content.support.action}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

    </main>
  );
}

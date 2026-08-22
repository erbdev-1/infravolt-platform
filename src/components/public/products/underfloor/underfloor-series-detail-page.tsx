"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { EnquiryAddedConfirmation, EnquiryToolbarSummary } from "@/components/public/enquiry/enquiry-feedback";
import { UNDERFLOOR_SERIES_ASSETS } from "@/data/products/underfloor/assets";
import type { UnderfloorSeriesDetail, UnderfloorVariant } from "@/data/products/underfloor/series-detail-types";
import type { UnderfloorHubContent, UnderfloorProductSeries } from "@/data/products/underfloor/types";
import { underfloorEnquiryItem } from "@/modules/enquiry/item-builders";
import { addEnquiryItem, removeEnquiryItem, useEnquiryItems } from "@/modules/enquiry/store";
import type { MarketCode } from "@/modules/markets/types";

import styles from "./underfloor-series-detail-page.module.css";

const SUPPORT_REQUEST_HREF = "/uk-support?request=technical-pack&product=underfloor-systems";

export function UnderfloorSeriesDetailPage({
  content,
  series,
  detail,
  market,
}: Readonly<{
  content: UnderfloorHubContent;
  series: UnderfloorProductSeries;
  detail: UnderfloorSeriesDetail;
  market: MarketCode;
}>) {
  const sourceRoute = `/products/underfloor-systems/${series.slug}`;
  const enquiryItems = useEnquiryItems();
  const enquiryItemIds = useMemo(() => new Set(enquiryItems.map((item) => item.id)), [enquiryItems]);
  const [confirmation, setConfirmation] = useState<Readonly<{ id: string; title: string }> | null>(null);
  const heroAssets = UNDERFLOOR_SERIES_ASSETS[series.slug];

  const totalVariants = detail.groups.reduce((sum, group) => sum + group.variants.length, 0);

  function toggleEnquiry(variant: UnderfloorVariant, groupName: string) {
    const item = underfloorEnquiryItem(series.slug, series.name, groupName, variant, sourceRoute);
    const { id } = item;

    if (enquiryItemIds.has(id)) {
      removeEnquiryItem(id);
      setConfirmation((current) => (current?.id === id ? null : current));
      return;
    }

    addEnquiryItem(item);
    setConfirmation({ id, title: `${variant.model} · ${variant.stockCode}` });
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          alt=""
          aria-hidden="true"
          className={styles.heroBackground}
          fill
          priority
          sizes="100vw"
          src={heroAssets.background}
        />
        <div className={styles.heroScrim} />

        <div className={styles.heroTop}>
          <Link className={styles.backButton} href="/products/underfloor-systems">
            <span aria-hidden="true">←</span>
            {content.seriesDetail.backLabel}
          </Link>

          <div className={styles.breadcrumbs}>
            <Link href="/">{content.breadcrumbs.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products/underfloor-systems">{content.breadcrumbs.current}</Link>
            <span aria-hidden="true">/</span>
            <span>{series.name}</span>
          </div>
        </div>

        <div className={styles.heroStage}>
          <div className={styles.heroInner}>
            <h1>{series.name}</h1>
            <p className={styles.heroDescription}>{series.description}</p>

            <ul className={styles.heroFeatures}>
              {series.features.map((feature) => (
                <li key={feature.label}>{feature.label}</li>
              ))}
            </ul>
          </div>

          <div className={styles.heroForeground}>
            <Image
              alt={series.name}
              fill
              priority
              sizes="(min-width: 1100px) 46vw, 90vw"
              src={heroAssets.foreground}
            />
          </div>
        </div>
      </section>

      <section className={styles.variants}>
        <div className={styles.variantsToolbar}>
          <p className={styles.variantsCount}>
            {totalVariants} {content.seriesDetail.codesCountSuffix}
          </p>

          {enquiryItems.length > 0 ? <EnquiryToolbarSummary count={enquiryItems.length} market={market} /> : null}
        </div>

        {detail.groups.map((group) => (
          <div className={styles.variantGroup} key={group.name}>
            <h2>{group.name}</h2>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">{detail.columnLabels.model}</th>
                    <th scope="col">{detail.columnLabels.productName}</th>
                    <th scope="col">{detail.columnLabels.orderCode}</th>
                    <th scope="col">{detail.columnLabels.stockCode}</th>
                    <th scope="col">{detail.columnLabels.dimensions}</th>
                    <th scope="col">{detail.columnLabels.weight}</th>
                    <th scope="col">{detail.columnLabels.action}</th>
                  </tr>
                </thead>
                <tbody>
                  {group.variants.map((variant) => {
                    const inEnquiry = enquiryItemIds.has(
                      underfloorEnquiryItem(series.slug, series.name, group.name, variant, sourceRoute).id,
                    );

                    return (
                      <tr key={variant.model}>
                        <th data-label={detail.columnLabels.model} scope="row">
                          <div className={styles.variantModel}>
                            {variant.image ? (
                              <span className={styles.variantThumb}>
                                <Image
                                  alt={variant.imageAlt ?? variant.model}
                                  fill
                                  sizes="3rem"
                                  src={variant.image}
                                  style={{ objectFit: "contain" }}
                                />
                              </span>
                            ) : null}
                            {variant.model}
                          </div>
                        </th>
                        <td data-label={detail.columnLabels.productName}>{variant.productName}</td>
                        <td data-label={detail.columnLabels.orderCode}>{variant.orderCode ?? "—"}</td>
                        <td data-label={detail.columnLabels.stockCode}>{variant.stockCode}</td>
                        <td data-label={detail.columnLabels.dimensions}>{variant.dimensions ?? "—"}</td>
                        <td data-label={detail.columnLabels.weight}>{variant.weight ?? "—"}</td>
                        <td data-label={detail.columnLabels.action}>
                          <button
                            aria-pressed={inEnquiry}
                            className={inEnquiry ? styles.enquiredButton : styles.enquiryButton}
                            onClick={() => toggleEnquiry(variant, group.name)}
                            type="button"
                          >
                            {inEnquiry ? content.seriesDetail.removeFromEnquiryLabel : content.seriesDetail.addToEnquiryLabel}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.supportCta}>
        <div className={styles.supportCtaInner}>
          <div className={styles.supportCtaCopy}>
            <div className={styles.supportCtaEyebrowRow}>
              <span aria-hidden="true" className={styles.supportCtaAccent} />
              <p className={styles.supportCtaEyebrow}>{content.supportCta.eyebrow}</p>
            </div>
            <h2>{content.supportCta.title}</h2>
            <p className={styles.supportCtaDescription}>{content.supportCta.description}</p>

            <Link className={styles.supportCtaAction} href={SUPPORT_REQUEST_HREF}>
              {content.supportCta.action}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.supportCtaVisual}>
            <Image
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1100px) 38vw, 90vw"
              src={heroAssets.foreground}
            />
          </div>
        </div>
      </section>

      {confirmation ? (
        <EnquiryAddedConfirmation
          count={enquiryItems.length}
          itemLabel={confirmation.title}
          market={market}
          onContinue={() => setConfirmation(null)}
        />
      ) : null}
    </main>
  );
}

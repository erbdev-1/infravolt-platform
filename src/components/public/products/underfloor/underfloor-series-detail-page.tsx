"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { EnquiryAddedConfirmation, EnquiryToolbarSummary } from "@/components/public/enquiry/enquiry-feedback";
import { UNDERFLOOR_SERIES_ASSETS } from "@/data/products/underfloor/assets";
import type { UnderfloorSeriesDetail, UnderfloorVariant } from "@/data/products/underfloor/series-detail-types";
import type { UnderfloorHubContent, UnderfloorProductSeries } from "@/data/products/underfloor/types";
import { underfloorEnquiryItem } from "@/modules/enquiry/item-builders";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import { addEnquiryItem, removeEnquiryItem, useEnquiryItems } from "@/modules/enquiry/store";
import type { MarketCode } from "@/modules/markets/types";

import { IconChevronDown } from "./underfloor-icons";
import styles from "./underfloor-series-detail-page.module.css";

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
  const supportRequestHref = buildEnquiryHref("technical-document", {
    system: "underfloor",
    family: series.slug,
    label: series.name,
    source: sourceRoute,
  });
  const enquiryItems = useEnquiryItems();
  const enquiryItemIds = useMemo(() => new Set(enquiryItems.map((item) => item.id)), [enquiryItems]);
  const [confirmation, setConfirmation] = useState<Readonly<{ id: string; title: string }> | null>(null);
  const heroAssets = UNDERFLOOR_SERIES_ASSETS[series.slug];

  const totalVariants = detail.groups.reduce((sum, group) => sum + group.variants.length, 0);

  // Family accordion — every group used to render fully expanded with all
  // of its models at once, which for a 20-model series like GYDK trunking
  // produced an extremely long page (worst on mobile, but the same static
  // markup regardless of viewport). All groups now start collapsed;
  // opening one reveals only a batch of models (see
  // visibleCountFor/showMore) — applied at every breakpoint, same as the
  // earthing-lightning order-code panels this mirrors.
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => new Set());
  const MODELS_BATCH_SIZE = 8;
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

  function toggleGroup(groupId: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  }

  function visibleCountFor(groupId: string) {
    return visibleCounts[groupId] ?? MODELS_BATCH_SIZE;
  }

  function showMore(groupId: string) {
    setVisibleCounts((prev) => ({ ...prev, [groupId]: visibleCountFor(groupId) + MODELS_BATCH_SIZE }));
  }

  function toggleEnquiry(variant: UnderfloorVariant, groupId: string) {
    const item = underfloorEnquiryItem(series.slug, series.name, groupId, variant, sourceRoute);
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

        {detail.groups.map((group) => {
          const isExpanded = expandedGroups.has(group.id);
          const panelId = `underfloor-group-panel-${group.id}`;
          const triggerId = `underfloor-group-trigger-${group.id}`;
          const visibleVariants = group.variants.slice(0, visibleCountFor(group.id));
          const remaining = group.variants.length - visibleVariants.length;

          return (
            <div className={styles.variantGroup} id={group.id} key={group.id}>
              <button
                aria-controls={panelId}
                aria-expanded={isExpanded}
                className={styles.variantGroupTrigger}
                id={triggerId}
                onClick={() => toggleGroup(group.id)}
                type="button"
              >
                <span className={styles.variantGroupName}>{group.name}</span>
                <span className={styles.variantGroupMeta}>
                  <span className={styles.variantGroupCount}>
                    {group.variants.length} {content.seriesDetail.modelsCountSuffix}
                  </span>
                  <IconChevronDown
                    aria-hidden="true"
                    className={isExpanded ? styles.variantGroupChevronOpen : styles.variantGroupChevron}
                  />
                </span>
              </button>

              <div
                aria-labelledby={triggerId}
                className={styles.variantGroupPanel}
                data-expanded={isExpanded}
                id={panelId}
                role="region"
              >
                <div className={styles.variantGroupPanelInner}>
                  {isExpanded ? (
                    <>
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
                            {visibleVariants.map((variant) => {
                              const inEnquiry = enquiryItemIds.has(
                                underfloorEnquiryItem(series.slug, series.name, group.id, variant, sourceRoute).id,
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
                                      onClick={() => toggleEnquiry(variant, group.id)}
                                      type="button"
                                    >
                                      {inEnquiry
                                        ? content.seriesDetail.removeFromEnquiryLabel
                                        : content.seriesDetail.addToEnquiryLabel}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {remaining > 0 ? (
                        <button
                          className={styles.showMoreButton}
                          onClick={() => showMore(group.id)}
                          type="button"
                        >
                          {content.seriesDetail.showMoreAction} ({remaining})
                        </button>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {content.series.filter((other) => other.slug !== series.slug && other.href).length > 0 ? (
        <section className={styles.relatedSeries}>
          <div className={styles.sectionHeading}>
            <h2>{content.seriesDetail.relatedSeriesHeading}</h2>
          </div>

          <div className={styles.relatedSeriesList}>
            {content.series
              .filter((other) => other.slug !== series.slug && other.href)
              .map((other) => (
                <Link className={styles.relatedSeriesRow} href={other.href!} key={other.slug}>
                  <span className={styles.relatedSeriesImage}>
                    {other.image ? (
                      <Image alt={other.imageAlt ?? other.name} fill sizes="3.25rem" src={other.image} />
                    ) : null}
                  </span>

                  <span className={styles.relatedSeriesBody}>
                    <span className={styles.relatedSeriesName}>{other.name}</span>
                    <span className={styles.relatedSeriesDescription}>{other.description}</span>
                  </span>

                  <span aria-hidden="true" className={styles.relatedSeriesAction}>
                    {content.viewSeriesLabel}
                    <span>→</span>
                  </span>
                </Link>
              ))}
          </div>
        </section>
      ) : null}

      <section className={styles.supportCta}>
        <div className={styles.supportCtaInner}>
          <div className={styles.supportCtaCopy}>
            <div className={styles.supportCtaEyebrowRow}>
              <span aria-hidden="true" className={styles.supportCtaAccent} />
              <p className={styles.supportCtaEyebrow}>{content.supportCta.eyebrow}</p>
            </div>
            <h2>{content.supportCta.title}</h2>
            <p className={styles.supportCtaDescription}>{content.supportCta.description}</p>

            <Link className={styles.supportCtaAction} href={supportRequestHref}>
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

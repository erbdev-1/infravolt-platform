"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

import { BusbarHeroCarousel } from "./busbar-hero-carousel";

import type { BusbarSystemDetail } from "@/data/products/busbar/series/types";
import type { MarketCode } from "@/modules/markets/types";

import styles from "./busbar-system-detail-page.module.css";

type TabId = "overview" | "technical-data" | "components" | "documents";

export function BusbarDetailTabs({
  detail,
  shortName,
  systemName,
  systemDescription,
  documentsTitle,
  documentsDescription,
  documentsActionLabel,
  market,
}: Readonly<{
  detail: BusbarSystemDetail;
  shortName: string;
  systemName: string;
  systemDescription: string;
  documentsTitle: string;
  documentsDescription: string;
  documentsActionLabel: string;
  market: MarketCode;
}>) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [activeSpecVariant, setActiveSpecVariant] = useState(
    detail.specVariants?.[0]?.id,
  );
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const baseId = useId();
  const featureListId = `${baseId}-overview-features`;

  const specColumns =
    detail.specVariants?.find((variant) => variant.id === activeSpecVariant)
      ?.columns ?? detail.specColumns ?? [];
  const specRows =
    detail.specVariants?.find((variant) => variant.id === activeSpecVariant)
      ?.rows ?? detail.specRows ?? [];

  const tabs: readonly Readonly<{ id: TabId; label: string }>[] = [
    { id: "overview", label: detail.overviewEyebrow },
    { id: "technical-data", label: detail.technicalDataEyebrow },
    { id: "components", label: detail.componentsEyebrow },
    { id: "documents", label: detail.documentsTabLabel },
  ];

  return (
    <section className={styles.tabsSection}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => {
          const selected = tab.id === activeTab;

          return (
            <button
              aria-controls={`${baseId}-panel-${tab.id}`}
              aria-selected={selected}
              className={selected ? styles.tabButtonActive : styles.tabButton}
              id={`${baseId}-tab-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby={`${baseId}-tab-overview`}
        className={styles.tabPanel}
        hidden={activeTab !== "overview"}
        id={`${baseId}-panel-overview`}
        role="tabpanel"
      >
        <div className={styles.overviewLayout}>
          <div className={styles.overviewCarousel}>
            <BusbarHeroCarousel
              closeLabel={detail.heroCloseLabel}
              fullscreenLabel={detail.heroFullscreenLabel}
              galleryLabel={detail.heroGalleryLabel}
              images={detail.heroImages}
              nextLabel={detail.heroNextLabel}
              previousLabel={detail.heroPreviousLabel}
            />
          </div>

          <div className={styles.overviewContent}>
            <h2>{systemName}</h2>

            <p className={styles.overviewDescription}>{systemDescription}</p>

            <ul className={styles.highlightList} id={featureListId}>
              {detail.overviewHighlights.map((highlight, index) => (
                <li
                  className={
                    index >= 4 && !showAllFeatures
                      ? styles.highlightCollapsedMobile
                      : undefined
                  }
                  key={highlight}
                >
                  {highlight}
                </li>
              ))}
            </ul>

            {detail.overviewHighlights.length > 4 ? (
              <button
                aria-controls={featureListId}
                aria-expanded={showAllFeatures}
                className={styles.featureToggle}
                onClick={() => setShowAllFeatures((isOpen) => !isOpen)}
                type="button"
              >
                {showAllFeatures
                  ? market === "ua"
                    ? "Показати менше характеристик"
                    : "View fewer features"
                  : market === "ua"
                    ? "Переглянути всі характеристики"
                    : "View all features"}
                <span aria-hidden="true">{showAllFeatures ? "−" : "+"}</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div
        aria-labelledby={`${baseId}-tab-technical-data`}
        className={styles.tabPanel}
        hidden={activeTab !== "technical-data"}
        id={`${baseId}-panel-technical-data`}
        role="tabpanel"
      >
        <h2>{detail.technicalDataHeading}</h2>

        {detail.specVariants && detail.specVariants.length > 1 ? (
          <div className={styles.specVariantToggle} role="tablist">
            {detail.specVariants.map((variant) => {
              const selected = variant.id === activeSpecVariant;

              return (
                <button
                  aria-selected={selected}
                  className={
                    selected
                      ? styles.specVariantButtonActive
                      : styles.specVariantButton
                  }
                  key={variant.id}
                  onClick={() => setActiveSpecVariant(variant.id)}
                  role="tab"
                  type="button"
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        ) : null}

        <div className={styles.tableWrapper}>
          <table className={styles.specTable}>
            <thead>
              <tr>
                <th scope="col">{detail.parameterHeading}</th>
                {specColumns.map((column) => (
                  <th key={column.id} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {specRows.map((row) => (
                <tr key={row.parameter}>
                  <th scope="row">{row.parameter}</th>
                  {specColumns.map((column) => (
                    <td key={column.id}>{row.values[column.id]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        aria-labelledby={`${baseId}-tab-components`}
        className={styles.tabPanel}
        hidden={activeTab !== "components"}
        id={`${baseId}-panel-components`}
        role="tabpanel"
      >
        <h2>
          {detail.componentsHeadingPrefix} {shortName}
        </h2>

        <div className={styles.componentsGrid}>
          {detail.components.map((component) => (
            <article className={styles.componentCard} key={component.slug}>
              <div className={styles.componentVisual}>
                <Image
                  alt={component.imageAlt}
                  fill
                  sizes="(min-width: 900px) 25vw, 50vw"
                  src={component.image}
                />
              </div>

              <div className={styles.componentContent}>
                <p className={styles.componentOrderCode}>
                  {component.orderCode}
                </p>
                <h3>{component.name}</h3>
                <p>{component.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        aria-labelledby={`${baseId}-tab-documents`}
        className={styles.tabPanel}
        hidden={activeTab !== "documents"}
        id={`${baseId}-panel-documents`}
        role="tabpanel"
      >
        <div className={styles.documentsGrid}>
          {detail.documents.map((document) => (
            <article className={styles.documentCard} key={document.title}>
              <div className={styles.documentIcon} aria-hidden="true">
                <svg fill="none" height="28" viewBox="0 0 24 24" width="28">
                  <path
                    d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M15 2v5h5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>

              <div className={styles.documentContent}>
                <h3>{document.title}</h3>
                <p>{document.description}</p>
                <span className={styles.documentFileLabel}>
                  {document.fileLabel}
                </span>
              </div>

              <a
                className={styles.documentAction}
                download
                href={document.href}
              >
                {document.downloadLabel}
                <span aria-hidden="true">↓</span>
              </a>
            </article>
          ))}
        </div>

        <div className={styles.documentation}>
          <div>
            <p className={styles.eyebrow}>{documentsTitle}</p>
            <p className={styles.documentationDescription}>
              {documentsDescription}
            </p>
          </div>

          <Link
            className={styles.documentationAction}
            href={detail.requestDocumentationHref}
          >
            {documentsActionLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

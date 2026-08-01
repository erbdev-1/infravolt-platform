"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

import type { BusbarSystemDetail } from "@/data/products/busbar/series/types";

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
}: Readonly<{
  detail: BusbarSystemDetail;
  shortName: string;
  systemName: string;
  systemDescription: string;
  documentsTitle: string;
  documentsDescription: string;
  documentsActionLabel: string;
}>) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const baseId = useId();

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
        <h2>{systemName}</h2>

        <div className={styles.overviewLayout}>
          <p className={styles.overviewDescription}>{systemDescription}</p>

          <ul className={styles.highlightList}>
            {detail.overviewHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
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

        <div className={styles.tableWrapper}>
          <table className={styles.specTable}>
            <thead>
              <tr>
                <th scope="col">{detail.parameterHeading}</th>
                {detail.specColumns.map((column) => (
                  <th key={column.id} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {detail.specRows.map((row) => (
                <tr key={row.parameter}>
                  <th scope="row">{row.parameter}</th>
                  {detail.specColumns.map((column) => (
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

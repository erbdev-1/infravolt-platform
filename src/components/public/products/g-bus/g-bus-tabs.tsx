"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

import { BusbarHeroCarousel } from "@/components/public/products/busbar/busbar-hero-carousel";
import type { GBusPageContent } from "@/data/products/g-bus/content";

import styles from "./g-bus-page.module.css";

type TabId = "overview" | "modules" | "documents";

export function GBusTabs({
  content,
}: Readonly<{
  content: GBusPageContent;
}>) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const baseId = useId();

  const tabs: readonly Readonly<{ id: TabId; label: string }>[] = [
    { id: "overview", label: content.overviewEyebrow },
    { id: "modules", label: content.modulesEyebrow },
    { id: "documents", label: content.documentsTabLabel },
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
              closeLabel={content.heroCloseLabel}
              fullscreenLabel={content.heroFullscreenLabel}
              galleryLabel={content.heroGalleryLabel}
              images={content.heroImages}
              nextLabel={content.heroNextLabel}
              previousLabel={content.heroPreviousLabel}
            />
          </div>

          <div className={styles.overviewContent}>
            <h2>{content.overviewHeading}</h2>
            <p className={styles.overviewDescription}>
              {content.overviewDescription}
            </p>

            <ul className={styles.highlightList}>
              {content.overviewHighlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.compatibleBlock}>
          <p className={styles.compatibleLabel}>{content.compatibleHeading}</p>

          <div className={styles.compatibleGrid}>
            {content.compatibleSystems.map((system) => (
              <Link
                className={styles.compatibleCard}
                href={`/products/busbar/${system.slug}`}
                key={system.slug}
              >
                <h3>{system.name}</h3>
                <p>{system.description}</p>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-labelledby={`${baseId}-tab-modules`}
        className={styles.tabPanel}
        hidden={activeTab !== "modules"}
        id={`${baseId}-panel-modules`}
        role="tabpanel"
      >
        <h2>{content.modulesHeading}</h2>
        <p className={styles.tabPanelDescription}>{content.modulesDescription}</p>

        <div className={styles.modulesGrid}>
          {content.modules.map((item) => (
            <article className={styles.moduleCard} key={item.stockCode}>
              {item.image ? (
                <div className={styles.moduleVisual}>
                  <Image
                    alt={item.imageAlt ?? ""}
                    height={96}
                    src={item.image}
                    width={96}
                  />
                </div>
              ) : null}

              <div className={styles.moduleContent}>
                <p className={styles.moduleStockCode}>{item.stockCode}</p>
                <h3>{item.name}</h3>
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
          {content.documents.map((document) => (
            <article className={styles.documentCard} key={document.title}>
              <div aria-hidden="true" className={styles.documentIcon}>
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
      </div>
    </section>
  );
}

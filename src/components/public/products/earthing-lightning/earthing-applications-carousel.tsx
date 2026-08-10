"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { EarthingHubContent } from "@/data/products/earthing-lightning/types";

import styles from "./earthing-lightning-hub-page.module.css";

// Her uygulama kartı, o sektör için gerçekten inşa edilmiş bir Application
// Map varsa oraya gider. Henüz inşa edilmemiş sektörler için kırık link
// oluşturmamak adına ana sayfadaki "#application-map" bölümüne (Featured
// Data Centre) düşer — sitedeki mevcut "Industries We Serve" kartlarıyla
// aynı, kanıtlanmış davranış.
const APPLICATION_MAP_HREFS: Readonly<Record<string, string>> = {
  "data-centres": "/application-map",
  "industrial-facilities": "/application-map/industrial-facility",
  healthcare: "/application-map/healthcare",
  "utilities-substations": "/application-map/infrastructure-utilities",
};

function applicationHref(id: string): string {
  return APPLICATION_MAP_HREFS[id] ?? "/#application-map";
}

type ApplicationsCarouselProps = Readonly<{
  applications: EarthingHubContent["applications"];
  exploreLabel: string;
  previousLabel: string;
  nextLabel: string;
}>;

// 8 uygulama tek satırda erişilebilir olmalı (grid'e bölünüp 2 satıra
// taşmak yerine) — ApplicationZoneStrip (application-map) ile aynı,
// kanıtlanmış desen: doğal kaydırma/dokunmatik/trackpad korunur, AYRICA
// görünür ok butonları eklenir.
export function ApplicationsCarousel({
  applications,
  exploreLabel,
  previousLabel,
  nextLabel,
}: ApplicationsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollBounds = useCallback(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

    setCanScrollPrev(scroller.scrollLeft > 1);
    setCanScrollNext(scroller.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    updateScrollBounds();

    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.addEventListener("scroll", updateScrollBounds, { passive: true });
    window.addEventListener("resize", updateScrollBounds);

    return () => {
      scroller.removeEventListener("scroll", updateScrollBounds);
      window.removeEventListener("resize", updateScrollBounds);
    };
  }, [updateScrollBounds]);

  function scrollByGroup(direction: 1 | -1) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    scroller.scrollBy({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      left: direction * scroller.clientWidth * 0.9,
    });
  }

  return (
    <div className={styles.applicationsCarousel}>
      <button
        aria-label={previousLabel}
        className={styles.applicationsArrow}
        disabled={!canScrollPrev}
        onClick={() => scrollByGroup(-1)}
        type="button"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div className={styles.applicationsRow} ref={scrollerRef}>
        {applications.map((application) => (
          <Link
            className={styles.applicationPhotoCard}
            href={applicationHref(application.id)}
            key={application.id}
          >
            <div className={styles.applicationPhotoVisual}>
              <Image
                alt={application.imageAlt}
                className={styles.applicationPhotoImage}
                fill
                sizes="18rem"
                src={application.image}
              />
            </div>

            <div className={styles.applicationPhotoContent}>
              <h3>{application.title}</h3>
              <p>{application.description}</p>

              <span className={styles.applicationAction}>
                {exploreLabel}
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <button
        aria-label={nextLabel}
        className={styles.applicationsArrow}
        disabled={!canScrollNext}
        onClick={() => scrollByGroup(1)}
        type="button"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}

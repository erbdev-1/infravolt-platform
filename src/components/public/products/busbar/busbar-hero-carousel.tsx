"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { BusbarHeroImage } from "@/data/products/busbar/series/types";

import styles from "./busbar-system-detail-page.module.css";

const AUTOPLAY_INTERVAL_MS = 3000;

export function BusbarHeroCarousel({
  images,
  previousLabel,
  nextLabel,
}: Readonly<{
  images: readonly BusbarHeroImage[];
  previousLabel: string;
  nextLabel: string;
}>) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [images.length, isPaused]);

  if (images.length === 0) {
    return null;
  }

  function goTo(nextIndex: number) {
    setIndex((nextIndex + images.length) % images.length);
  }

  return (
    <div
      className={styles.heroCarousel}
      onBlur={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((image, slideIndex) => (
        <div
          className={
            slideIndex === index
              ? styles.heroCarouselSlideActive
              : styles.heroCarouselSlide
          }
          key={image.image}
        >
          {image.accentGlow ? (
            // Product hero shot: static image with CSS-only energy light trails.
            <div className={styles.gnlHeroVisual}>
              {/* Layer 2: large soft ambient background glow */}
              <div
                aria-hidden="true"
                className={`${styles.gnlEnergyGlow} ${styles.gnlEnergyGlowBlue}`}
              />
              <div
                aria-hidden="true"
                className={`${styles.gnlEnergyGlow} ${styles.gnlEnergyGlowOrange}`}
              />

              {/* Layer 3: main animated light trails (orbit + sweep) */}
              <div
                aria-hidden="true"
                className={`${styles.gnlEnergyLayer} ${styles.gnlEnergyLayerBlue}`}
              />
              <div
                aria-hidden="true"
                className={`${styles.gnlEnergyLayer} ${styles.gnlEnergyLayerOrange}`}
              />

              {/* Layer 4: the product itself — always static, always sharp */}
              <div className={styles.gnlProductImageWrap}>
                <Image
                  alt={image.imageAlt}
                  className={styles.gnlProductImage}
                  fill
                  priority={slideIndex === 0}
                  sizes="(min-width: 900px) 45vw, 100vw"
                  src={image.image}
                />
              </div>
            </div>
          ) : (
            <div className={styles.heroCarouselImageWrap}>
              <Image
                alt={image.imageAlt}
                className={styles.heroImage}
                fill
                priority={slideIndex === 0}
                sizes="(min-width: 900px) 45vw, 100vw"
                src={image.image}
              />
            </div>
          )}
        </div>
      ))}

      <div className={styles.heroCarouselOverlay} />

      {images.length > 1 ? (
        <>
          <button
            aria-label={previousLabel}
            className={`${styles.heroCarouselControl} ${styles.heroCarouselPrevious}`}
            onClick={() => goTo(index - 1)}
            type="button"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <button
            aria-label={nextLabel}
            className={`${styles.heroCarouselControl} ${styles.heroCarouselNext}`}
            onClick={() => goTo(index + 1)}
            type="button"
          >
            <span aria-hidden="true">›</span>
          </button>

          <div className={styles.heroCarouselDots}>
            {images.map((image, dotIndex) => (
              <button
                aria-current={dotIndex === index}
                aria-label={`${dotIndex + 1}`}
                className={
                  dotIndex === index
                    ? styles.heroCarouselDotActive
                    : styles.heroCarouselDot
                }
                key={image.image}
                onClick={() => goTo(dotIndex)}
                type="button"
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

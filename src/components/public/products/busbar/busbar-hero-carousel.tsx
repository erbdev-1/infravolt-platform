"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

import type { BusbarHeroImage } from "@/data/products/busbar/series/types";

import styles from "./busbar-system-detail-page.module.css";

export function BusbarHeroCarousel({
  images,
  previousLabel,
  nextLabel,
  galleryLabel,
  fullscreenLabel,
  closeLabel,
}: Readonly<{
  images: readonly BusbarHeroImage[];
  previousLabel: string;
  nextLabel: string;
  galleryLabel: string;
  fullscreenLabel: string;
  closeLabel: string;
}>) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (images.length === 0) {
    return null;
  }

  const activeIndex = index % images.length;
  const activeImage = images[activeIndex]!;
  const activeLabel = activeImage.label ?? `${galleryLabel} ${activeIndex + 1}`;
  const activeImageFit = activeImage.fit ?? "contain";

  function goTo(nextIndex: number) {
    const normalizedIndex =
      ((nextIndex % images.length) + images.length) % images.length;

    setIndex(normalizedIndex);
  }

  function openFullscreen() {
    dialogRef.current?.showModal();
  }

  function closeFullscreen() {
    dialogRef.current?.close();
  }

  function handleGalleryKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  }

  function handleDialogBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeFullscreen();
    }
  }

  return (
    <>
      <div
        aria-label={galleryLabel}
        className={styles.productGallery}
        onKeyDown={handleGalleryKeyDown}
        role="region"
      >
        <div
          aria-label={`${galleryLabel} thumbnails`}
          className={styles.galleryRail}
        >
          {images.map((image, thumbnailIndex) => {
            const isActive = thumbnailIndex === activeIndex;
            const thumbnailLabel =
              image.label ?? `${galleryLabel} ${thumbnailIndex + 1}`;

            return (
              <button
                aria-label={`${thumbnailLabel}, ${thumbnailIndex + 1} / ${
                  images.length
                }`}
                aria-pressed={isActive}
                className={
                  isActive
                    ? styles.galleryThumbnailActive
                    : styles.galleryThumbnail
                }
                key={image.image}
                onClick={() => goTo(thumbnailIndex)}
                type="button"
              >
                <span className={styles.galleryThumbnailImageWrap}>
                  <Image
                    alt=""
                    className={styles.galleryThumbnailImage}
                    fill
                    sizes="96px"
                    src={image.image}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.galleryViewport}>
          <div className={styles.galleryStage}>
            <div className={styles.galleryImageWrap} key={activeImage.image}>
              <Image
                alt={activeImage.imageAlt}
                className={`${styles.galleryImage} ${
                  activeImageFit === "cover"
                    ? styles.galleryImageCover
                    : styles.galleryImageContain
                }`}
                fill
                priority={activeIndex === 0}
                sizes="(min-width: 1000px) 48vw, 100vw"
                src={activeImage.image}
              />
            </div>
          </div>
          <div className={styles.galleryImageOverlay}>
            <strong>{activeLabel}</strong>

            <button
              aria-label={fullscreenLabel}
              className={styles.galleryFullscreenOverlay}
              onClick={openFullscreen}
              type="button"
            >
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path
                  d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>

              <span>{fullscreenLabel}</span>
            </button>
          </div>
        </div>
      </div>

      <dialog
        aria-label={activeLabel}
        className={styles.galleryDialog}
        onClick={handleDialogBackdropClick}
        ref={dialogRef}
      >
        <div className={styles.galleryDialogInner}>
          <div className={styles.galleryDialogTopbar}>
            <div>
              <strong>{activeLabel}</strong>
              <span>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </div>

            <button
              aria-label={closeLabel}
              className={styles.galleryDialogClose}
              onClick={closeFullscreen}
              type="button"
            >
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
          </div>

          <div className={styles.galleryDialogImageWrap}>
            <Image
              alt={activeImage.imageAlt}
              className={`${styles.galleryDialogImage} ${
                activeImageFit === "cover"
                  ? styles.galleryDialogImageCover
                  : styles.galleryDialogImageContain
              } ${
                activeImage.crop === "tight"
                  ? styles.galleryDialogImageTightCrop
                  : ""
              }`}
              fill
              sizes="100vw"
              src={activeImage.image}
            />
          </div>

          {images.length > 1 ? (
            <>
              <button
                aria-label={previousLabel}
                className={`${styles.galleryDialogControl} ${styles.galleryDialogPrevious}`}
                onClick={() => goTo(activeIndex - 1)}
                type="button"
              >
                ‹
              </button>

              <button
                aria-label={nextLabel}
                className={`${styles.galleryDialogControl} ${styles.galleryDialogNext}`}
                onClick={() => goTo(activeIndex + 1)}
                type="button"
              >
                ›
              </button>
            </>
          ) : null}
        </div>
      </dialog>
    </>
  );
}

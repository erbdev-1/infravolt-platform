"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { publicMediaUrl } from "@/modules/storage/asset-url";

import styles from "./busbar-cinematic-intro.module.css";

const INTRO_STORAGE_KEY = "infravolt:busbar-intro-seen";
const INTRO_DURATION_MS = 5000; // was 3400ms — held longer before exit

export function BusbarCinematicIntro() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const hasSeenIntro =
      window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (prefersReducedMotion || hasSeenIntro) {
      const frameId = window.requestAnimationFrame(() => {
        setIsVisible(false);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const hideTimeoutId = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");

      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;

      setIsVisible(false);
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(hideTimeoutId);

      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div aria-hidden="true" className={styles.intro}>
      <Image
        alt=""
        className={styles.image}
        fill
        priority
        sizes="100vw"
        src={publicMediaUrl("media/products/busbar/busbar-cinematic-intro.png")}
      />

      <div className={styles.darkLayer} />
      <div className={styles.energySweepPrimary} />
      <div className={styles.energySweepSecondary} />
      <div className={styles.energyPulse} />

      <div className={styles.brand}>
        <span>GERSAN × INFRAVOLT</span>
        <strong>Busbar Systems</strong>
        <div className={styles.brandLine} />
      </div>
    </div>
  );
}

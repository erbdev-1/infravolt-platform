"use client";

import Image from "next/image";
import type { PointerEvent } from "react";

import type { BusbarSystemSlug } from "@/data/products/busbar/catalog-content";

import { BusbarHeroEffects } from "./busbar-hero-effects";
import styles from "./busbar-product-hero-visual.module.css";

type BusbarProductHeroVisualProps = Readonly<{
  image: string;
  imageAlt: string;
  slug: BusbarSystemSlug;
  priority?: boolean;
}>;

const MAX_SHIFT_X = 10;
const MAX_SHIFT_Y = 6;

function canParallax(): boolean {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function BusbarProductHeroVisual({
  image,
  imageAlt,
  slug,
  priority = false,
}: BusbarProductHeroVisualProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !canParallax()) {
      return;
    }

    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    element.style.setProperty("--hero-x", `${x * MAX_SHIFT_X}px`);
    element.style.setProperty("--hero-y", `${y * MAX_SHIFT_Y}px`);
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--hero-x", "0px");
    event.currentTarget.style.setProperty("--hero-y", "0px");
  }

  return (
    <div
      className={styles.stage}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <div aria-hidden="true" className={styles.glow} />

      <div className={styles.motion}>
        <div className={styles.float}>
          <Image
            alt={imageAlt}
            className={styles.image}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (min-width: 1000px) 55vw, 60vw"
            src={image}
          />

          <span aria-hidden="true" className={styles.sweep} />
          <BusbarHeroEffects slug={slug} />
        </div>
      </div>
    </div>
  );
}

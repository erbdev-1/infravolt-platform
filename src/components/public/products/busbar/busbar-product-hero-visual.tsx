"use client";

import Image from "next/image";
import type { PointerEvent } from "react";

import styles from "./busbar-product-hero-visual.module.css";

type BusbarProductHeroVisualProps = Readonly<{
  image: string;
  imageAlt: string;
  priority?: boolean;
}>;

const MAX_SHIFT_X = 10;
const MAX_SHIFT_Y = 6;

export function BusbarProductHeroVisual({
  image,
  imageAlt,
  priority = false,
}: BusbarProductHeroVisualProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") {
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
      <div className={styles.motion}>
        <div className={styles.float}>
          <Image
            alt={imageAlt}
            className={styles.image}
            fill
            priority={priority}
            sizes="(min-width: 1000px) 55vw, 100vw"
            src={image}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./data-centre-application-map.module.css";

export type ZoneThumbnailItem = Readonly<{
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  active: boolean;
}>;

type ApplicationZoneStripProps = Readonly<{
  label: string;
  items: readonly ZoneThumbnailItem[];
  onSelect: (id: string) => void;
  previousLabel: string;
  nextLabel: string;
}>;

// Overview + yedi bölgeyi tek yatay şerit halinde gösteren premium
// thumbnail navigasyonu. Ok butonları görünür bir "kart grubu" kadar
// kaydırır; scroll sınırına ulaşıldığında ilgili ok devre dışı kalır.
export function ApplicationZoneStrip({
  label,
  items,
  onSelect,
  previousLabel,
  nextLabel,
}: ApplicationZoneStripProps) {
  const activeRef = useRef<HTMLButtonElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
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
  }, [updateScrollBounds, items]);

  function scrollByGroup(direction: 1 | -1) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Bir "kart grubu" olarak görünür genişliğin ~%90'ı kadar kaydırılır;
    // tam genişlik kullanılsaydı bir sonraki kartın kenarı görünmez olurdu.
    scroller.scrollBy({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      left: direction * scroller.clientWidth * 0.9,
    });
  }

  return (
    <nav aria-label={label} className={styles.zoneStrip}>
      <button
        aria-label={previousLabel}
        className={styles.zoneStripArrow}
        disabled={!canScrollPrev}
        onClick={() => scrollByGroup(-1)}
        type="button"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <ul className={styles.zoneStripList} ref={scrollerRef}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              aria-current={item.active ? "true" : undefined}
              aria-label={item.name}
              className={
                item.active
                  ? `${styles.zoneStripItem} ${styles.zoneStripItemActive}`
                  : styles.zoneStripItem
              }
              onClick={() => onSelect(item.id)}
              ref={item.active ? activeRef : undefined}
              type="button"
            >
              <span className={styles.zoneStripName}>{item.name}</span>
              <span className={styles.zoneStripThumb}>
                <Image
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="140px"
                  src={item.image}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <button
        aria-label={nextLabel}
        className={styles.zoneStripArrow}
        disabled={!canScrollNext}
        onClick={() => scrollByGroup(1)}
        type="button"
      >
        <span aria-hidden="true">›</span>
      </button>
    </nav>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { ProductAction } from "@/modules/application-map/types";

import styles from "./data-centre-application-map.module.css";

export type ApplicationProductPanelLabels = Readonly<{
  usedHereForHeading: string;
  applicationPointsHeading: string;
  benefitsHeading: string;
  closeLabel: string;
}>;

type ApplicationProductPanelProps = Readonly<{
  number: number;
  name: string;
  usedHereFor: string;
  applicationPoints: readonly string[];
  benefits: readonly string[];
  actions: readonly ProductAction[];
  icon: string;
  image?: string;
  imageAlt?: string;
  labels: ApplicationProductPanelLabels;
  restoreFocusId: string;
  onClose: () => void;
}>;

export function ApplicationProductPanel({
  number,
  name,
  usedHereFor,
  applicationPoints,
  benefits,
  actions,
  icon,
  image,
  imageAlt,
  labels,
  restoreFocusId,
  onClose,
}: ApplicationProductPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // preventScroll:true olmadan focus() tarayıcıyı odaklanan elemanı
    // görünür alana kaydırmaya zorlar; panel her zaman normal sayfa
    // akışında olduğu için bu, ürün seçildiğinde küçük bir sayfa
    // sıçramasına yol açıyordu. Odak taşınır ama scroll konumu sabit kalır.
    closeButtonRef.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    // Panelin dışına tıklayınca kapat — ama panelin İÇİNE veya ürün
    // ailesi seçici/hotspot gibi "kontrol" alanlarına tıklamayı hariç
    // tut. Bu kontroller kendi onClick'leriyle zaten seçimi değiştirir;
    // onları da kapatma tetikleyicisi sayarsak, aynı tıklamada hem yeni
    // seçim hem de onClose() çakışıp yanlış sonuca yol açabilir (bkz.
    // data-app-map-controls işaretli alanlar, data-centre-application-map.tsx).
    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (panelRef.current?.contains(target)) {
        return;
      }

      if (target instanceof Element && target.closest("[data-app-map-controls]")) {
        return;
      }

      onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.getElementById(restoreFocusId)?.focus({ preventScroll: true });
    };
    // Panel yalnız ürün ailesi değiştiğinde yeniden takılır (number anahtar
    // görevi görür); onClose/restoreFocusId her render'da referans
    // değiştirse de efektin yeniden çalışmasına gerek yoktur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  return (
    <aside aria-label={name} className={styles.panel} ref={panelRef} role="dialog">
      <div className={styles.panelHeader}>
        <span aria-hidden="true" className={styles.panelNumber}>
          {number}
        </span>
        <h2>{name}</h2>

        <button
          aria-label={labels.closeLabel}
          className={styles.panelClose}
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className={styles.panelBody}>
        <div className={styles.panelMedia}>
          {image ? (
            <Image
              alt={imageAlt ?? ""}
              className={styles.panelMediaImage}
              fill
              sizes="380px"
              src={image}
            />
          ) : (
            <Image
              alt=""
              aria-hidden="true"
              className={styles.panelMediaIcon}
              height={64}
              src={icon}
              width={64}
            />
          )}
        </div>

        <div className={styles.panelSection}>
          <h3>{labels.usedHereForHeading}</h3>
          <p>{usedHereFor}</p>
        </div>

        {applicationPoints.length > 0 ? (
          <div className={styles.panelSection}>
            <h3>{labels.applicationPointsHeading}</h3>
            <ul className={styles.panelList}>
              {applicationPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {benefits.length > 0 ? (
          <div className={styles.panelSection}>
            <h3>{labels.benefitsHeading}</h3>
            <ul className={styles.panelList}>
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className={styles.panelActions}>
          {actions.map((action, index) => (
            <Link
              className={
                index === 0
                  ? `${styles.panelAction} ${styles.panelActionPrimary}`
                  : styles.panelAction
              }
              href={action.href}
              key={action.label}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

import type { LedTechnicalAssetVariant } from "@/data/products/led-lighting/types";

import styles from "./led-series-detail-page.module.css";

// Tabbed Suspended/Surface-style selector over per-configuration
// photometric + drawing (+ optional installation-overview) asset pairs —
// reused by any future family with configuration-specific technical
// documentation, not just GER-LED High Ceiling. Reuses the exact same
// .photometricGrid/.photometricCard/.photometricImage visual language as
// the flat technicalAssets grid so both render identically card-for-card.
//
// When a variant provides `photometricOptions` (real catalogue beam-angle
// graphs, e.g. GER-LED High Ceiling's 20/60/90/120/130x60 set), the
// Photometric Data card additionally renders a compact beam-angle
// selector and swaps in the selected option's image; variants without
// `photometricOptions` render exactly as before, using `photometric`
// directly.
export function LedTechnicalAssetVariants({
  variants,
  defaultVariantId,
}: Readonly<{
  variants: readonly LedTechnicalAssetVariant[];
  defaultVariantId?: string;
}>) {
  const initial = variants.find((variant) => variant.id === defaultVariantId) ?? variants[0];
  const [activeId, setActiveId] = useState(initial?.id);
  const active = variants.find((variant) => variant.id === activeId) ?? initial;

  const [activeBeamId, setActiveBeamId] = useState(initial?.photometricOptions?.[0]?.id);
  const activeBeam = active?.photometricOptions?.find((option) => option.id === activeBeamId) ?? active?.photometricOptions?.[0];

  if (!active) return null;

  const photometricAsset = activeBeam
    ? { title: active.photometric.title, image: activeBeam.image, imageAlt: activeBeam.imageAlt }
    : active.photometric;
  const otherAssets = [active.drawing, ...(active.installationOverview ? [active.installationOverview] : [])];

  return (
    <div>
      <div className={styles.technicalAssetTabs} role="tablist">
        {variants.map((variant) => (
          <button
            aria-selected={variant.id === active.id}
            className={variant.id === active.id ? styles.technicalAssetTabActive : styles.technicalAssetTab}
            key={variant.id}
            onClick={() => {
              setActiveId(variant.id);
              setActiveBeamId(variant.photometricOptions?.[0]?.id);
            }}
            role="tab"
            type="button"
          >
            {variant.label}
          </button>
        ))}
      </div>

      <div className={styles.photometricGrid}>
        <div className={styles.photometricCard}>
          <h3>{photometricAsset.title}</h3>

          {active.photometricOptions && active.photometricOptions.length > 0 ? (
            <div className={styles.beamAngleTabs} role="tablist">
              {active.photometricOptions.map((option) => (
                <button
                  aria-selected={option.id === activeBeam?.id}
                  className={option.id === activeBeam?.id ? styles.beamAngleTabActive : styles.beamAngleTab}
                  key={option.id}
                  onClick={() => setActiveBeamId(option.id)}
                  role="tab"
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}

          <div className={styles.photometricImage}>
            <Image alt={photometricAsset.imageAlt} fill sizes="(min-width: 900px) 45vw, 100vw" src={photometricAsset.image} style={{ objectFit: "contain" }} />
          </div>
        </div>

        {otherAssets.map((asset) => (
          <div className={styles.photometricCard} key={asset.title}>
            <h3>{asset.title}</h3>
            <div className={styles.photometricImage}>
              <Image alt={asset.imageAlt} fill sizes="(min-width: 900px) 45vw, 100vw" src={asset.image} style={{ objectFit: "contain" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

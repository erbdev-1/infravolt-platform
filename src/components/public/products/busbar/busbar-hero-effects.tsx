import type { CSSProperties } from "react";

import type { BusbarSystemSlug } from "@/data/products/busbar/catalog-content";

import styles from "./busbar-product-hero-visual.module.css";

// Most busbar hero images (GNL, GM, GGD, GS, GR — see
// public/assets/products/busbar/*/card/*-transparent*.webp) already have a
// dual amber/blue energy-ribbon effect and a soft studio background baked
// directly into the pixels by whoever produced them — despite the
// "transparent" filenames, none of these are actually isolated alpha
// cutouts (verified: RGBA PNGs, but the background is fully opaque pixel
// content, not transparent). Layering a second CSS-drawn ribbon on top of
// an image that already has one would look redundant and cluttered, and
// "product sits directly on the page background" isn't achievable with
// these particular source files.
//
// So this component stays deliberately light for those five: the shared
// glow + travelling sweep in busbar-product-hero-visual.module.css already
// covers "very light idle motion" / "travelling highlight across the
// product" for all six series. This file only adds genuinely additive,
// non-duplicating touches:
// - GL has no baked effect at all (plain opaque studio photo) — it gets a
//   real CSS energy-flow trace, the one series that actually needs one.
// - GM / GGD get one or two small point highlights over features that are
//   visually real in their specific photos (a joint stud, a tap-off/
//   connector end) — these don't exist as baked light already.
// - GNL / GS / GR intentionally get nothing extra here — for GR
//   especially, "keep movement very restrained" argues for less, not more.
//
// All positions are hand-measured against one specific source photo per
// series; re-measure if that file is ever replaced or re-cropped. Percent
// positions + a fixed rotation angle stay aligned at any render size only
// because the hero stage keeps a consistent aspect ratio at every
// breakpoint (see busbar-product-hero-visual.module.css).

type Trace = Readonly<{
  key: string;
  left: string;
  top: string;
  width: string;
  angleDeg: number;
  delayMs: number;
}>;

type Flash = Readonly<{
  key: string;
  left: string;
  top: string;
  delayMs: number;
  size?: number;
}>;

type SeriesConfig = Readonly<{
  traces?: readonly Trace[];
  flashes?: readonly Flash[];
}>;

// GL: no baked-in effect on the source photo, so this is a real
// CSS-drawn linear energy-flow line along the duct, rear (dark connector
// end, lower-left) toward the far end (upper-right).
const GL: SeriesConfig = {
  traces: [{ key: "flow-line", left: "17%", top: "62%", width: "78%", angleDeg: -33, delayMs: 350 }],
};

// GM: baked ribbon already present. Two small highlights over the visible
// mounting studs along the housing top.
const GM: SeriesConfig = {
  flashes: [
    { key: "joint-1", left: "58%", top: "49%", delayMs: 700, size: 14 },
    { key: "joint-2", left: "66%", top: "42%", delayMs: 820, size: 14 },
  ],
};

// GGD: baked ribbon already present. One highlight over the copper
// tap-off/connector fins at the near end.
const GGD: SeriesConfig = {
  flashes: [{ key: "tap-off", left: "20%", top: "62%", delayMs: 700, size: 20 }],
};

const SERIES_CONFIG: Partial<Record<BusbarSystemSlug, SeriesConfig>> = {
  "gl-lighting-busbar": GL,
  "gm-low-power-busbar": GM,
  "ggd-medium-power-busbar": GGD,
};

export function BusbarHeroEffects({ slug }: Readonly<{ slug: BusbarSystemSlug }>) {
  const config = SERIES_CONFIG[slug];
  if (!config) return null;

  return (
    <div aria-hidden="true" className={styles.effects}>
      {config.traces?.map((trace) => {
        const style = {
          left: trace.left,
          top: trace.top,
          width: trace.width,
          animationDelay: `${trace.delayMs}ms`,
          "--trace-angle": `${trace.angleDeg}deg`,
        } as CSSProperties;

        return <span className={styles.trace} key={trace.key} style={style} />;
      })}

      {config.flashes?.map((flash) => {
        const size = flash.size ?? 16;
        const style: CSSProperties = {
          left: flash.left,
          top: flash.top,
          animationDelay: `${flash.delayMs}ms`,
          height: `${size}px`,
          width: `${size}px`,
        };

        return <span className={styles.tipFlash} key={flash.key} style={style} />;
      })}
    </div>
  );
}

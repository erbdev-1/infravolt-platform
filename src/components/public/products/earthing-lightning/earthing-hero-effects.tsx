import type { CSSProperties } from "react";

import type { EarthingCategorySlug } from "@/data/products/earthing-lightning/types";

import styles from "./earthing-category-detail-page.module.css";

// Every position below is hand-measured against one specific source photo
// (public/assets/products/earthing-lightning/<slug>/card/*-hero.webp).
// Because .heroVisual keeps a fixed aspect-ratio at every breakpoint (see
// the CSS), percentage positions + a fixed rotation angle stay visually
// aligned at any render size — no per-breakpoint recalculation needed. If
// a hero photo is ever replaced or re-cropped, these need re-measuring.

type Trace = Readonly<{
  key: string;
  left: string;
  top: string;
  width: string;
  angleDeg: number;
  delayMs: number;
  durationMs?: number;
}>;

type Flash = Readonly<{
  key: string;
  left: string;
  top: string;
  delayMs: number;
  size?: number;
}>;

type FamilyPulseConfig = Readonly<{
  traces?: readonly Trace[];
  flashes?: readonly Flash[];
}>;

const TRACE_DURATION_MS = 700;
const TIP_OVERLAP_MS = 100;

// lightning-protection: three-pronged air termination rod. Left/right
// prongs splay outward from the base collar, centre prong is shorter and
// near-vertical.
const LIGHTNING_PROTECTION: FamilyPulseConfig = {
  traces: [
    { key: "left-prong", left: "44%", top: "62%", width: "46%", angleDeg: -128, delayMs: 300 },
    { key: "centre-prong", left: "54%", top: "60%", width: "21%", angleDeg: -85, delayMs: 400 },
    { key: "right-prong", left: "58%", top: "62%", width: "44%", angleDeg: -54, delayMs: 500 },
  ],
  flashes: [
    { key: "left-tip", left: "16%", top: "8%", delayMs: 300 + TRACE_DURATION_MS - TIP_OVERLAP_MS },
    { key: "centre-tip", left: "56%", top: "29%", delayMs: 400 + TRACE_DURATION_MS - TIP_OVERLAP_MS },
    { key: "right-tip", left: "84%", top: "8%", delayMs: 500 + TRACE_DURATION_MS - TIP_OVERLAP_MS },
  ],
};

// earthing-electrodes-plates: two diagonal copper-bonded rods, brass tips
// lower-right. Re-measured against the transparent hero cutout (1536x1024)
// — different framing to the opaque studio card photo this used to share.
const EARTHING_ELECTRODES_PLATES: FamilyPulseConfig = {
  traces: [
    { key: "rear-rod", left: "19%", top: "7%", width: "70%", angleDeg: 32, delayMs: 300 },
    { key: "front-rod", left: "12%", top: "32%", width: "69%", angleDeg: 34, delayMs: 400 },
  ],
  flashes: [
    { key: "rear-tip", left: "78%", top: "63%", delayMs: 300 + TRACE_DURATION_MS - TIP_OVERLAP_MS },
    { key: "front-tip", left: "70%", top: "90%", delayMs: 400 + TRACE_DURATION_MS - TIP_OVERLAP_MS },
  ],
};

// clamps-connectors: one conductivity highlight along the flat copper
// conductor bar running through the brass clamp body.
const CLAMPS_CONNECTORS: FamilyPulseConfig = {
  traces: [{ key: "conductor-bar", left: "10%", top: "86%", width: "97%", angleDeg: -31, delayMs: 300 }],
};

// equipotential-earth-bars: one sweep along the bar, plus small highlights
// over the visible connection holes (5 of the 7, evenly sampled).
const EQUIPOTENTIAL_EARTH_BARS: FamilyPulseConfig = {
  traces: [{ key: "bar-sweep", left: "26%", top: "45%", width: "58%", angleDeg: -25, delayMs: 300 }],
  flashes: [
    { key: "hole-1", left: "33%", top: "40%", delayMs: 850, size: 12 },
    { key: "hole-2", left: "45%", top: "35%", delayMs: 950, size: 12 },
    { key: "hole-3", left: "57%", top: "30%", delayMs: 1050, size: 12 },
    { key: "hole-4", left: "68%", top: "26%", delayMs: 1150, size: 12 },
    { key: "hole-5", left: "78%", top: "22%", delayMs: 1250, size: 12 },
  ],
};

// exothermic-welding: two short entry traces along the visible cable
// segments either side of the mould, plus one warm ignition flash at the
// open lid.
const EXOTHERMIC_WELDING: FamilyPulseConfig = {
  traces: [
    { key: "left-cable", left: "34%", top: "70%", width: "24%", angleDeg: 34, delayMs: 300, durationMs: 500 },
    { key: "right-cable", left: "70%", top: "58%", width: "24%", angleDeg: -18, delayMs: 400, durationMs: 500 },
  ],
  flashes: [{ key: "ignition", left: "68%", top: "20%", delayMs: 750, size: 30 }],
};

// static-ex-proof-grounding: single discharge pulse at the exposed brass
// threaded stud.
const STATIC_EX_PROOF_GROUNDING: FamilyPulseConfig = {
  flashes: [{ key: "stud-discharge", left: "27%", top: "89%", delayMs: 350, size: 22 }],
};

const FAMILY_PULSE_CONFIG: Partial<Record<EarthingCategorySlug, FamilyPulseConfig>> = {
  "lightning-protection": LIGHTNING_PROTECTION,
  "earthing-electrodes-plates": EARTHING_ELECTRODES_PLATES,
  "clamps-connectors": CLAMPS_CONNECTORS,
  "equipotential-earth-bars": EQUIPOTENTIAL_EARTH_BARS,
  "exothermic-welding": EXOTHERMIC_WELDING,
  "static-ex-proof-grounding": STATIC_EX_PROOF_GROUNDING,
};

export function EarthingHeroEffects({ slug }: Readonly<{ slug: EarthingCategorySlug }>) {
  const config = FAMILY_PULSE_CONFIG[slug];
  if (!config) return null;

  return (
    <div aria-hidden="true" className={styles.familyPulse}>
      {config.traces?.map((trace) => {
        const style = {
          left: trace.left,
          top: trace.top,
          width: trace.width,
          animationDelay: `${trace.delayMs}ms`,
          animationDuration: `${trace.durationMs ?? TRACE_DURATION_MS}ms`,
          "--pulse-angle": `${trace.angleDeg}deg`,
        } as CSSProperties;

        return <span className={styles.pulseTrace} key={trace.key} style={style} />;
      })}

      {config.flashes?.map((flash) => {
        const size = flash.size ?? 22;
        const style: CSSProperties = {
          left: flash.left,
          top: flash.top,
          animationDelay: `${flash.delayMs}ms`,
          height: `${size}px`,
          width: `${size}px`,
        };

        return <span className={styles.pulseTipFlash} key={flash.key} style={style} />;
      })}
    </div>
  );
}

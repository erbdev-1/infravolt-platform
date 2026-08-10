// Küçük, tek renkli (currentColor) çizgi ikon seti — Topraklama & Yıldırımdan
// Korunma hub sayfasına özel. Sitenin mevcut "app icon" tarzı SVG'leri
// (navy kare + kırmızı aksan, bkz. /assets/icons/products/icon-earthing.svg)
// bu bakır/turuncu temayla görsel olarak çakışıyor; bu yüzden bu sayfaya
// özel, tutarlı ve sade bir çizgi ikon dili kullanılıyor. Aynı ikonlar fact
// strip / solution pathways / guidance / principles arasında bilinçli
// olarak paylaşılıyor (ör. IconElectrode hem "Complete Earthing Systems"
// hem "How an Earthing System Works" için) — ayrı bir görsel kelime
// dağarcığı icat etmek yerine tekrar kullanılabilir bir sistem kuruluyor.

type IconProps = Readonly<{ className?: string }>;

const BASE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.6,
  viewBox: "0 0 24 24",
};

export function IconShieldCheck({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconLayers({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </svg>
  );
}

export function IconNodes({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 7l-5.2 10M12 7l5.2 10M7 19h10" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="20" r="2" />
      <circle cx="19" cy="20" r="2" />
    </svg>
  );
}

export function IconSupport({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect height="6" rx="1.5" width="4" x="3" y="13" />
      <rect height="6" rx="1.5" width="4" x="17" y="13" />
      <path d="M20 19v1a3 3 0 0 1-3 3h-3" />
    </svg>
  );
}

export function IconElectrode({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3v10" />
      <path d="M12 13l-3 8h6l-3-8z" />
      <path d="M5 21h14" />
      <path d="M7.3 8.3a6.7 6.7 0 0 1 9.4 0" opacity="0.55" />
      <path d="M4.6 5.6a10.5 10.5 0 0 1 14.8 0" opacity="0.3" />
    </svg>
  );
}

export function IconLightningRod({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 2v5" />
      <path d="M12.5 9 6 15h4.5L10 22l7.5-9H13l0.5-4z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBondingBar({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="4" rx="1" width="16" x="4" y="10" />
      <path d="M7 10V6M12 10V4M17 10V6" />
      <circle cx="7" cy="6" fill="currentColor" r="1" stroke="none" />
      <circle cx="12" cy="4" fill="currentColor" r="1" stroke="none" />
      <circle cx="17" cy="6" fill="currentColor" r="1" stroke="none" />
    </svg>
  );
}

export function IconHazard({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3l9 9-9 9-9-9 9-9z" />
      <path d="M12 8.5v4.5" />
      <circle cx="12" cy="16" fill="currentColor" r="0.7" stroke="none" />
    </svg>
  );
}

export function IconSoilLayers({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 2v6" />
      <path d="M9.5 8h5l1 3h-7l1-3z" />
      <path d="M3 12h18" opacity="0.85" />
      <path d="M3 16h18" opacity="0.55" />
      <path d="M3 20h18" opacity="0.3" />
    </svg>
  );
}

export function IconResistance({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M2 12h3l1.6-4.5 3 9 3-9 3 9 1.6-4.5H22" />
    </svg>
  );
}

export function IconCapacity({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 14a8 8 0 0 1 16 0" />
      <path d="M12 14l4.5-5.5" />
      <circle cx="12" cy="14" fill="currentColor" r="1.1" stroke="none" />
    </svg>
  );
}

export function IconBondLink({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="7" cy="12" r="3.2" />
      <circle cx="17" cy="12" r="3.2" />
      <path d="M10.2 12h3.6" />
    </svg>
  );
}

export function IconInspection({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 20.5 20.5" />
    </svg>
  );
}

// Added for the technical-snapshot strip (TechnicalSnapshotStrip) —
// Design Life / Operating Life Expectancy.
export function IconClock({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

// Operating Conditions (temperature / environmental range).
export function IconGauge({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3a2 2 0 0 0-2 2v9.5a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2z" />
      <path d="M12 14V8" />
    </svg>
  );
}

// System Type (exothermic welding).
export function IconWeld({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 2.5c2.6 3.4-1.6 4.4-1.6 7.3a3.6 3.6 0 1 0 7.2 0c0-1-.5-1.7-.9-2.3" />
      <path d="M9 13.5a3 3 0 1 0 6 0" />
    </svg>
  );
}

// Technical Documentation.
export function IconDocument({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 12.5h5M9.5 15.5h5M9.5 9.5h2" />
    </svg>
  );
}

// Download PDF Catalogue CTA (hero button icon, not a snapshot icon).
export function IconDownload({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

// Order-codes schedule search input.
export function IconSearch({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 20.5 20.5" />
    </svg>
  );
}

// Family accordion expand/collapse indicator — rotated via [open] in CSS.
export function IconChevronDown({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// Copy-stock-code row action.
export function IconCopy({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="13" rx="1.6" width="13" x="8" y="8" />
      <path d="M5.5 16H5a1.6 1.6 0 0 1-1.6-1.6V5a1.6 1.6 0 0 1 1.6-1.6h9.4A1.6 1.6 0 0 1 16 5v.5" />
    </svg>
  );
}

// Confirmation state after a copy action succeeds.
export function IconCheck({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  );
}

// Clear-search button inside the schedule search input.
export function IconClose({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

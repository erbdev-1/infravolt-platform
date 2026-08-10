// Small, single-colour (currentColor) line icon set for the Cable Management
// family-detail template — deliberately separate from the earthing-lightning
// icon set (src/.../earthing-lightning/earthing-icons.tsx) so this product
// line's components stay self-contained and the earthing pages are never
// touched by changes here.

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

// Cable tray / routed system — parallel rails with rungs.
export function IconSystem({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 8h18M3 16h18" />
      <path d="M6 8v8M10 8v8M14 8v8M18 8v8" opacity="0.55" />
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

export function IconSearch({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 20.5 20.5" />
    </svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconCopy({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="13" rx="1.6" width="13" x="8" y="8" />
      <path d="M5.5 16H5a1.6 1.6 0 0 1-1.6-1.6V5a1.6 1.6 0 0 1 1.6-1.6h9.4A1.6 1.6 0 0 1 16 5v.5" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconDownload({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

export function IconDocument({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 12.5h5M9.5 15.5h5M9.5 9.5h2" />
    </svg>
  );
}

export function IconFilter({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 5h16" />
      <path d="M7 12h10" />
      <path d="M10.5 19h3" />
    </svg>
  );
}

// Bent channel profile (U/Z/L/W cross-section) — used by the photo-free
// sibling-card style (see CableFamilySiblingIconName).
export function IconChannelProfile({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M6 4h8v6h4v6h-8v-6H6z" />
    </svg>
  );
}

// Threaded rod hanging from a ceiling fixing, with a hook — used by the
// photo-free sibling-card style (see CableFamilySiblingIconName).
export function IconHangingRod({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M5 4h14" />
      <path d="M12 4v11" opacity="0.55" />
      <path d="M9.5 7h5M9.5 9.5h5M9.5 12h5" opacity="0.55" />
      <path d="M10 18a2 2 0 1 0 4 0v-3" />
    </svg>
  );
}

// Open "C" channel bracket — used by the photo-free sibling-card style (see
// CableFamilySiblingIconName).
export function IconCProfileBracket({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M16 5H9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
    </svg>
  );
}

// Hex-head anchor bolt with a threaded shaft — used by the photo-free
// sibling-card style (see CableFamilySiblingIconName).
export function IconAnchorBolt({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3l3.5 2v4L12 11l-3.5-2V5L12 3z" />
      <path d="M12 11v10" />
      <path d="M9.5 14h5M9.5 16.5h5M9.5 19h5" opacity="0.55" />
    </svg>
  );
}

// Cylindrical pipe/conduit segment — used by the photo-free sibling-card
// style (see CableFamilySiblingIconName).
export function IconPipe({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 8h16M4 16h16" />
      <path d="M4 8v8M20 8v8" opacity="0.55" />
    </svg>
  );
}

// Roofed cover / cap over a flat base — used by the photo-free sibling-card
// style (see CableFamilySiblingIconName).
export function IconCover({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 18h16" />
      <path d="M6 18v-4a6 6 0 0 1 12 0v4" />
    </svg>
  );
}

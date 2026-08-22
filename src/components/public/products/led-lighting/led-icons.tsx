// Small, single-colour (currentColor) line icon set for the LED Systems
// hub page — mirrors the pattern established in
// earthing-lightning/earthing-icons.tsx (own icon language per
// product-line theme, reused across sections rather than one-off SVGs).

type IconProps = Readonly<{ className?: string }>;

const BASE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.6,
  viewBox: "0 0 24 24",
};

// Models-table toolbar icons — same shapes as
// cable-management/cable-icons.tsx, redeclared here per this repo's
// one-icon-file-per-product-line convention.

export function IconSearch({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 20.5 20.5" />
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

export function IconFilter({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 5h16" />
      <path d="M7 12h10" />
      <path d="M10.5 19h3" />
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

export function IconPortfolio({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="14" rx="1.5" width="18" x="3" y="6" />
      <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6" />
      <path d="M3 11h18" />
    </svg>
  );
}

export function IconData({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M6 20V10M12 20V4M18 20v-7" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function IconApplications({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 21l7-13 4 6.5L18 8l3 13" />
      <path d="M3 21h18" />
    </svg>
  );
}

export function IconAutomation({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
    </svg>
  );
}

export function IconImagePending({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="16" rx="1.5" width="20" x="2" y="4" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="M4 17l4.5-4.5a1.5 1.5 0 0 1 2.1 0L14 16l1.5-1.5a1.5 1.5 0 0 1 2.1 0L20 17" />
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

export function IconCertified({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconFactory({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 21V11l5 3.5V11l5 3.5V11l5 3.5V21" />
      <path d="M3 21h18" />
      <path d="M8 6V3h2v3" />
    </svg>
  );
}

export function IconWarehouse({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 9v11h14V9" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function IconHangar({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M2 20V11a10 10 0 0 1 20 0v9" />
      <path d="M2 20h20" />
      <path d="M6 20v-7M18 20v-7" />
    </svg>
  );
}

export function IconPort({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 21h16" />
      <path d="M6 21v-7l3-2 3 2v7" />
      <path d="M14 21v-9l3-2 3 2v9" />
      <path d="M9 12V4" />
    </svg>
  );
}

export function IconAircraftMaintenance({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M2 16l7-2 5-7 2-1 1 1-3 6 5-1 2-2 1 1-2 3-8 2-4 4-2-1 2-3-6-1z" />
    </svg>
  );
}

// Technical Assurance row icons (led-series-detail-page.tsx) — colour &
// finish, compliance and warranty, folded into the Technical Information
// section as a compact row rather than separate large sections.

export function IconPalette({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3a9 6.5 0 1 0 0 13c1.1 0 1.5-.7 1.5-1.4 0-.4-.2-.7-.4-1-.2-.3-.4-.6-.4-1 0-.7.6-1.1 1.3-1.1H15a6 5 0 0 0 6-5C21 4.6 17 3 12 3z" />
      <circle cx="8" cy="9.5" r="1" />
      <circle cx="11.5" cy="7" r="1" />
      <circle cx="15.5" cy="8" r="1" />
    </svg>
  );
}

export function IconWarrantyBadge({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14.5 7.5 21l4.5-2.5L16.5 21 15 14.5" />
      <path d="M9.5 9 11 10.5 14.5 7" />
    </svg>
  );
}

export function IconWallMount({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 3v18" />
      <path d="M3 8h6l7 5" />
      <path d="M16 13h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-4z" />
      <path d="M3 15.5a4.5 4.5 0 0 0 4.5-4.5" strokeDasharray="2 2.2" />
    </svg>
  );
}

// Series-detail page icons (led-series-detail-page.tsx) — Technical
// Information card icons, control-option icons, and construction/layers.

export function IconLayers({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </svg>
  );
}

export function IconControlPlc({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M5 7v4a3 3 0 0 0 3 3h1M19 7v4a3 3 0 0 1-3 3h-1M12 14v3" />
    </svg>
  );
}

export function IconControlDali({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M6 20V10M12 20V4M18 20v-7" />
      <circle cx="6" cy="8" r="1.4" />
      <circle cx="12" cy="14" r="1.4" />
      <circle cx="18" cy="11" r="1.4" />
    </svg>
  );
}

export function IconControlDimmer({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 13V8" />
      <path d="M9 3h6" />
    </svg>
  );
}

export function IconControlSignal({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 18a11 11 0 0 1 16 0" />
      <path d="M7.5 14.5a6 6 0 0 1 9 0" />
      <circle cx="12" cy="18.5" r="1.2" />
    </svg>
  );
}

export function IconControlEmergency({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
      <path d="M4 4l16 16" />
    </svg>
  );
}

export function IconControlSensor({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="12" r="1.6" />
      <path d="M8.5 8.5a5 5 0 0 1 7 0M5.5 5.5a9 9 0 0 1 13 0" />
    </svg>
  );
}

export function IconControlTouchDim({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v4l3 2" />
      <path d="M12 3v2M12 19v2" />
    </svg>
  );
}

export function IconControlCasambi({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M7.7 11 16.3 7M7.7 13l8.6 4" />
    </svg>
  );
}

// Product-series differentiator icons (led-category-detail-page.tsx) — a
// small, curated set of mounting/optical/build icons distinct from the
// value-strip and application icons above.

export function IconBusbarConnect({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="4" rx="1" width="18" x="3" y="4" />
      <path d="M7 8v4M12 8v8M17 8v4" />
      <path d="M5 20h4M10 20h4M15 20h4" />
    </svg>
  );
}

export function IconSuspension({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M6 3v7M18 3v4" />
      <path d="M6 10 18 7" />
      <rect height="4" rx="1" width="14" x="5" y="14" />
    </svg>
  );
}

export function IconHighOutput({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export function IconOptics({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3v3" />
      <path d="M12 6 5 20h14L12 6z" />
      <path d="M8.5 14h7" />
    </svg>
  );
}

export function IconMultiLens({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="8" cy="12" r="4" />
      <circle cx="16" cy="12" r="4" />
    </svg>
  );
}

export function IconMountingOptions({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 5h18" />
      <path d="M7 5v6l-3 8h4l2-6h4l2 6h4l-3-8V5" />
    </svg>
  );
}

export function IconSlimBody({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="6" rx="1.5" width="18" x="3" y="9" />
      <path d="M6 15v2M18 15v2" />
    </svg>
  );
}

export function IconEfficiency({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

export function IconTemperedGlass({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="18" rx="1.5" width="14" x="5" y="3" />
      <path d="M9 3v18M15 3v18" />
    </svg>
  );
}

export function IconRuggedBody({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z" />
    </svg>
  );
}

export function IconProtection({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 13v-2a3 3 0 0 1 6 0v2" />
      <rect height="4.5" rx="1" width="8" x="8" y="13" />
    </svg>
  );
}

export function IconAdjustableAngle({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 20h6l8-8-6-6-8 8z" />
      <path d="M13 7l4 4" />
      <path d="M4 20 2.5 21.5" />
      <path d="M15 3a6 6 0 0 1 6 6" strokeDasharray="2.5 2.5" />
    </svg>
  );
}

export function IconSurfaceMount({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 8h18" />
      <rect height="8" rx="1.5" width="12" x="6" y="8" />
      <path d="M6 20h12" />
    </svg>
  );
}

// Serviceability & Adjustment icons (led-series-detail-page.tsx) — GER-LED
// Industrial's plug-and-remove modular construction.

export function IconConnector({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="8" rx="1.2" width="9" x="3" y="8" />
      <path d="M6 8V5.5M9 8V5.5" />
      <path d="M12 12h9" />
      <circle cx="21" cy="12" r="1.4" />
    </svg>
  );
}

export function IconElectricalModule({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="12" rx="1.2" width="14" x="5" y="6" />
      <path d="M9 6V3M15 6V3M9 21v-3M15 21v-3M5 10H2M5 14H2M22 10h-3M22 14h-3" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// Applications icons — Petrochemical & Gas Stations, Coal & Mining.

export function IconPetrochemical({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M6 21V9l3-2 3 2v12" />
      <path d="M15 21V6l3-2 3 2v15" />
      <path d="M3 21h18" />
      <path d="M6 13h3M15 10h3" />
    </svg>
  );
}

export function IconMining({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 21 9 8l4 6 3-4 5 11z" />
      <path d="M3 21h18" />
      <circle cx="7" cy="5" r="1.4" />
    </svg>
  );
}

export function IconHighCeiling({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 4h18" />
      <path d="M12 4v3" />
      <circle cx="12" cy="9.5" r="2.5" />
      <path d="M8 21l2.5-8h3L16 21" />
    </svg>
  );
}

export function IconTunnel({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 21V12a9 9 0 0 1 18 0v9" />
      <path d="M3 21h4M17 21h4M9 21h6" />
      <path d="M3 15h4M17 15h4" />
    </svg>
  );
}

export function IconPrison({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 3v18M9 3v18M14 3v18M19 3v18" />
      <path d="M2 7h4M2 12h4M2 17h4" />
    </svg>
  );
}

export function IconStandardBody({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="8" rx="1.5" width="18" x="3" y="8" />
      <path d="M7 8V6M17 8V6" />
    </svg>
  );
}

export function IconCornerBody({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 16V8h10l7 7" />
      <path d="M13 8v8h7" />
    </svg>
  );
}

export function IconBiogas({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3c2.5 3 4 5.5 4 8a4 4 0 0 1-8 0c0-2.5 1.5-5 4-8Z" />
      <path d="M3 21h18" />
      <path d="M6 21v-3a2 2 0 0 1 2-2h1M18 21v-2a2 2 0 0 0-2-2h-1" />
    </svg>
  );
}

export function IconStreetLight({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M5 21h6M8 21V9" />
      <path d="M8 9 5 3h3l2 6" />
      <circle cx="17" cy="6" r="1.4" />
      <path d="M17 7.4V11M14 9.5l1.8 1.5M20 9.5l-1.8 1.5" />
    </svg>
  );
}

export function IconSmartCity({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 21V9l4-3 4 3v12" />
      <path d="M11 21V5l4-2 4 2v16" />
      <path d="M3 21h18" />
      <path d="M6 12h1M6 16h1M14 8h1M14 12h1M14 16h1" />
    </svg>
  );
}

export function IconParking({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="18" rx="2" width="18" x="3" y="3" />
      <path d="M9 16V7h3.5a2.5 2.5 0 0 1 0 5H9" />
    </svg>
  );
}

export function IconMultiStorey({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 21V11l8-6 8 6v10" />
      <path d="M4 15h16M4 11h16" />
      <path d="M9 21v-4h6v4" />
    </svg>
  );
}

// Controls & Smart Integration — Smart Integration group icons
// (led-series-detail-page.tsx). Deliberately distinct from the Lighting
// Controls icon set (control-dali/-dimmer/-signal/-emergency/-sensor)
// even where the underlying concept is related (e.g. PLC here is the
// building's power-line/network layer, not a per-fixture control
// protocol chip).

export function IconSmartPlc({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 12h4l2-4 2 8 2-6 2 4h4" />
      <circle cx="3" cy="12" r="1.4" />
      <circle cx="21" cy="12" r="1.4" />
    </svg>
  );
}

export function IconSmartCamera({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="10" rx="1.5" width="16" x="3" y="8" />
      <path d="M9 8 11 5h2l2 3" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

export function IconSmartWireless({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="19" r="1.3" />
      <path d="M8.5 15.5a5 5 0 0 1 7 0M5 12a10 10 0 0 1 14 0" />
    </svg>
  );
}

export function IconSmartNetwork({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 6.5v5M12 11.5 5 17M12 11.5l7 5.5" />
    </svg>
  );
}

export function IconSmartPowerDim({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 6.5V12" />
      <path d="M8.5 8a5.5 5.5 0 1 0 7 0" />
    </svg>
  );
}

export function IconSmartEnvironment({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M14 3v9.5a3.5 3.5 0 1 1-4 0V3z" />
      <path d="M12 6h2" />
      <path d="M20 14a3 4.5 0 1 1-6 0c0-2.5 3-6 3-6s3 3.5 3 6z" />
    </svg>
  );
}

export function IconSmartMotion({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="8" cy="8" r="3" />
      <path d="M8 11v2M2 21c0-3.5 2.7-6 6-6s6 2.5 6 6" />
      <path d="M17 5v3M22 8h-3M20.5 3.5 18 6M14.5 3.5 17 6" />
    </svg>
  );
}

export function IconSmartFault({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3 3 20h18z" />
      <path d="M12 9v5" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSmartScenario({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="5" rx="1" width="6" x="3" y="4" />
      <rect height="5" rx="1" width="6" x="15" y="4" />
      <rect height="5" rx="1" width="6" x="9" y="15" />
      <path d="M6 9v3a3 3 0 0 0 3 3M18 9v3a3 3 0 0 1-3 3" />
    </svg>
  );
}

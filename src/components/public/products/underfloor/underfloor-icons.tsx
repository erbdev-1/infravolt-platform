// Small, single-colour (currentColor) line icon set for the Underfloor
// Cable Trunking category page — mirrors the pattern established in
// earthing-lightning/earthing-icons.tsx and led-lighting/led-icons.tsx
// (own icon language per product-line, reused across sections rather
// than one-off SVGs).

type IconProps = Readonly<{ className?: string }>;

const BASE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.6,
  viewBox: "0 0 24 24",
};

export function IconDistribution({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3v6" />
      <path d="M4 21v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
      <circle cx="12" cy="9" r="3" />
      <path d="M4 21h16" />
    </svg>
  );
}

export function IconIntegration({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="7" rx="1.4" width="7" x="3" y="3" />
      <rect height="7" rx="1.4" width="7" x="14" y="14" />
      <path d="M9.5 10v4a2 2 0 0 0 2 2H14M17.5 14v-4a2 2 0 0 0-2-2H10" />
    </svg>
  );
}

export function IconAccess({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="10" rx="1.4" width="14" x="5" y="10" />
      <path d="M5 10V8a2 2 0 0 1 2-2h2M12 4v6" />
      <circle cx="12" cy="15" r="1.6" />
    </svg>
  );
}

export function IconAdaptable({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 8h6M3 12h10M3 16h6" />
      <path d="M16 6l4 3-4 3M16 12l4 3-4 3" />
    </svg>
  );
}

export function IconProtection({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    </svg>
  );
}

export function IconMaterial({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 8l9-5 9 5-9 5-9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
    </svg>
  );
}

export function IconConfiguration({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
    </svg>
  );
}

export function IconCapacity({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 20V10M10 20V4M16 20v-7M20 20v-3" />
      <path d="M2 20h20" />
    </svg>
  );
}

export function IconCompliance({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5 11 15l4.5-5.5" />
    </svg>
  );
}

export function IconMounting({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 21V11l8-6 8 6v10" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

export function IconTrunking({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M3 16h18v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3Z" />
      <path d="M3 16V9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7" />
    </svg>
  );
}

export function IconJunction({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="12" rx="1.4" width="16" x="4" y="6" />
      <path d="M4 6l8 5 8-5" />
    </svg>
  );
}

export function IconOutlet({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="14" rx="2" width="14" x="5" y="5" />
      <circle cx="9.5" cy="12" r="1.3" />
      <circle cx="14.5" cy="12" r="1.3" />
    </svg>
  );
}

export function IconOffice({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="16" rx="1" width="12" x="6" y="4" />
      <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function IconCommercialBuilding({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M9 20v-6h6v6" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function IconMeetingRoom({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <ellipse cx="12" cy="12" rx="7" ry="4" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}

export function IconEducation({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M2 9 12 4l10 5-10 5-10-5Z" />
      <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    </svg>
  );
}

export function IconRetail({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <path d="M4 8l1.5-4h13L20 8" />
      <path d="M4 8v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8" />
      <path d="M9 12a3 3 0 0 0 6 0" />
    </svg>
  );
}

export function IconFlexibleWorkspace({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="10" rx="1.4" width="18" x="3" y="4" />
      <path d="M8 20h8M12 14v6" />
    </svg>
  );
}

export function IconImagePending({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} {...BASE_PROPS}>
      <rect height="16" rx="1.5" width="18" x="3" y="4" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m3 17 5-5 4 4 3-3 6 6" />
    </svg>
  );
}

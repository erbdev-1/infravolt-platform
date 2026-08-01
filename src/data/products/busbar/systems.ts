import type {
  BusbarCategoryOption,
  BusbarSystem,
} from "@/data/products/busbar/types";

export const BUSBAR_CATEGORY_OPTIONS = [
  {
    value: "all",
    label: "All Busbar Systems",
    description: "View every Gersan busbar system",
  },
  {
    value: "lighting",
    label: "Lighting & Low Power",
    description: "Lighting distribution and low-current applications",
  },
  {
    value: "power-distribution",
    label: "Power Distribution",
    description: "Low and medium-power electrical distribution",
  },
  {
    value: "high-power",
    label: "High Power",
    description: "Compact high-current power distribution",
  },
  {
    value: "special-environments",
    label: "Special Environments",
    description: "IP68 cast-resin systems for demanding locations",
  },
  {
    value: "components",
    label: "Components & Accessories",
    description: "Tap-off, feed, connection and installation components",
  },
] as const satisfies readonly BusbarCategoryOption[];

export const BUSBAR_SYSTEMS: readonly BusbarSystem[] = [
  {
    slug: "gnl-lighting-busbar",
    name: "GNL Lighting Busbar",
    shortName: "GNL",
    category: "lighting",
    description:
      "Compact lighting busbar system for flexible lighting distribution and fixture connections.",
    currentMin: 25,
    currentMax: 40,
    currentLabel: "25–40 A",
    conductorOptions: ["copper"],
    conductorLabel: "Copper conductors",
    ipRating: "IP55",
    applications: [
      "Commercial lighting",
      "Retail environments",
      "Industrial lighting",
    ],
    image: "/assets/products/busbar/gnl/card/gnl-main-product.webp",
    imageAlt: "Gersan GNL lighting busbar system",
  },
  {
    slug: "gl-lighting-busbar",
    name: "GL Lighting Busbar",
    shortName: "GL",
    category: "lighting",
    description:
      "Lighting busbar system with aluminium and copper conductor options for industrial and commercial projects.",
    currentMin: 40,
    currentMax: 100,
    currentLabel: "40–100 A",
    conductorOptions: ["aluminium", "copper"],
    conductorLabel: "Aluminium or copper",
    ipRating: "IP55",
    applications: ["Factories", "Warehouses", "Commercial buildings"],
    image: "/assets/products/busbar/gl/applications/gl-main-product-01.webp",
    imageAlt: "Gersan GL lighting busbar installation",
  },
  {
    slug: "gm-low-power-busbar",
    name: "GM Low Power Busbar",
    shortName: "GM",
    category: "power-distribution",
    description:
      "Low power busbar system for distributing electrical power across commercial and industrial facilities.",
    currentMin: 100,
    currentMax: 400,
    currentLabel: "100–400 A",
    conductorOptions: ["aluminium", "copper"],
    conductorLabel: "Aluminium or copper",
    ipRating: "IP55",
    applications: [
      "Commercial buildings",
      "Industrial facilities",
      "Distribution networks",
    ],
    image: "/assets/products/busbar/gm/card/gm-main-product.webp",
    imageAlt: "Gersan GM low power busbar system",
  },
  {
    slug: "ggd-medium-power-busbar",
    name: "GGD Medium Power Busbar",
    shortName: "GGD",
    category: "power-distribution",
    description:
      "Medium-power busbar system with extensive feed, elbow, offset, expansion and tap-off options.",
    currentMin: 160,
    currentMax: 1000,
    currentLabel: "160–1000 A",
    conductorOptions: ["aluminium", "copper"],
    conductorLabel: "Aluminium or copper",
    ipRating: "IP50 / IP55 option",
    applications: [
      "Industrial power",
      "Commercial distribution",
      "Vertical rising mains",
    ],
    image: "/assets/products/busbar/ggd/card/ggd-main-product.webp",
    imageAlt: "Gersan GGD medium power busbar system",
    featured: true,
  },
  {
    slug: "gs-compact-high-power-busbar",
    name: "GS Compact High Power Busbar",
    shortName: "GS",
    category: "high-power",
    description:
      "Compact high-current busbar system for major infrastructure, transformer and switchboard connections.",
    currentMin: 400,
    currentMax: 6300,
    currentLabel: "400–6300 A",
    conductorOptions: ["aluminium", "copper"],
    conductorLabel: "Aluminium or copper",
    ipRating: "IP55 / IP65–68 option",
    applications: [
      "Data centres",
      "Large industrial facilities",
      "Critical infrastructure",
    ],
    image: "/assets/products/busbar/gs/card/gs-main-product.webp",
    imageAlt: "Gersan GS Super Compact transformer installation",
    featured: true,
  },
  {
    slug: "gr-resin-busbar",
    name: "GR Resin Busbar",
    shortName: "GR",
    category: "special-environments",
    description:
      "IP68 cast-resin busbar system developed for humid, saline and demanding operating environments.",
    currentMin: 500,
    currentMax: 6300,
    currentLabel: "500–6300 A",
    conductorOptions: ["aluminium", "copper"],
    conductorLabel: "Aluminium or copper",
    ipRating: "IP68",
    applications: [
      "Outdoor infrastructure",
      "Humid environments",
      "Corrosive locations",
    ],
    image: "/assets/products/busbar/gr/card/gr-main-product.webp",
    imageAlt: "Gersan GR cast resin busbar system",
  },
];

export function getBusbarSystemBySlug(slug: string): BusbarSystem | undefined {
  return BUSBAR_SYSTEMS.find((system) => system.slug === slug);
}

import type { ApplicationProductSystem, ApplicationScene } from "./types";

export const productSystems = [
  {
    id: "busbar",
    number: 1,
    name: "Busbar Trunking Systems",
    shortName: "Busbar",
    description:
      "High-capacity power distribution systems designed for efficient and flexible electrical distribution.",
    application:
      "Used between transformers, generators, switchboards, UPS systems and data hall distribution equipment.",
    image: "/images/application-map/products/busbar.webp",
    benefits: [
      "Compact power distribution",
      "Reduced installation time",
      "Flexible tap-off configuration",
      "Suitable for high-current applications",
    ],
    standards: ["IEC 61439-6"],
    actions: [
      {
        label: "Product Page",
        href: "/products/busbar",
        type: "page",
      },
      {
        label: "Request Technical Pack",
        href: "/contact?request=technical-pack&product=busbar",
        type: "request",
      },
      {
        label: "Request Quote",
        href: "/contact?request=quote&product=busbar",
        type: "request",
      },
      {
        label: "Ask Technical Question",
        href: "/contact?request=technical-question&product=busbar",
        type: "question",
      },
    ],
  },
  {
    id: "cable-tray",
    number: 2,
    name: "Cable Tray Systems",
    shortName: "Cable Tray",
    description:
      "Cable management systems for structured routing and support of power and data cabling.",
    application:
      "Used within electrical rooms, plant areas, corridors and data centre service zones.",
    image: "/images/application-map/products/cable-tray.webp",
    benefits: [
      "Organised cable routing",
      "Multiple material options",
      "Easy system expansion",
      "Suitable for complex installations",
    ],
    standards: ["IEC 61537"],
    actions: [
      {
        label: "Product Page",
        href: "/products/cable-support-systems",
        type: "page",
      },
      {
        label: "Request Quote",
        href: "/contact?request=quote&product=cable-tray",
        type: "request",
      },
    ],
  },
  {
    id: "cable-ladder",
    number: 3,
    name: "Cable Ladder Systems",
    shortName: "Cable Ladder",
    description:
      "Heavy-duty cable support systems for high cable loads and long installation spans.",
    application:
      "Used for power cabling in electrical rooms, generator areas and external plant zones.",
    image: "/images/application-map/products/cable-ladder.webp",
    benefits: [
      "High load capacity",
      "Long support spans",
      "Improved cable ventilation",
      "Suitable for heavy power cables",
    ],
    standards: ["IEC 61537"],
    actions: [
      {
        label: "Product Page",
        href: "/products/cable-support-systems",
        type: "page",
      },
      {
        label: "Request Quote",
        href: "/contact?request=quote&product=cable-ladder",
        type: "request",
      },
    ],
  },
  {
    id: "distribution-panel",
    number: 4,
    name: "Distribution Panels",
    shortName: "Panels",
    description:
      "Electrical distribution and control panels for structured power management.",
    application:
      "Used in electrical rooms, mechanical plant areas and local distribution points.",
    image: "/images/application-map/products/distribution-panel.webp",
    benefits: [
      "Configurable architecture",
      "Structured circuit protection",
      "Indoor and project-specific options",
      "Integration with electrical distribution systems",
    ],
    standards: ["IEC 61439-1", "IEC 61439-2"],
    actions: [
      {
        label: "Request Technical Pack",
        href: "/contact?request=technical-pack&product=distribution-panel",
        type: "request",
      },
      {
        label: "Request Quote",
        href: "/contact?request=quote&product=distribution-panel",
        type: "request",
      },
    ],
  },
  {
    id: "earthing",
    number: 5,
    name: "Earthing & Bonding Systems",
    shortName: "Earthing",
    description:
      "Earthing and equipotential bonding products for electrical safety and system protection.",
    application:
      "Used throughout the building, electrical installation and external earthing network.",
    image: "/images/application-map/products/earthing.webp",
    benefits: [
      "Electrical safety support",
      "Equipotential bonding",
      "Multiple conductor and connection options",
      "Suitable for infrastructure environments",
    ],
    standards: ["IEC 62561"],
    actions: [
      {
        label: "Product Page",
        href: "/products/earthing-and-lightning-protection",
        type: "page",
      },
      {
        label: "Request Quote",
        href: "/contact?request=quote&product=earthing",
        type: "request",
      },
    ],
  },
  {
    id: "lightning-protection",
    number: 6,
    name: "Lightning Protection Systems",
    shortName: "Lightning",
    description:
      "External lightning protection products for roof and building protection systems.",
    application:
      "Used on rooftops, façades, down-conductor routes and external earthing systems.",
    image: "/images/application-map/products/lightning-protection.webp",
    benefits: [
      "Roof-level protection",
      "Down-conductor system support",
      "Integration with earthing systems",
      "Project-specific component selection",
    ],
    standards: ["IEC 62305", "IEC 62561"],
    actions: [
      {
        label: "Product Page",
        href: "/products/earthing-and-lightning-protection",
        type: "page",
      },
      {
        label: "Ask Technical Question",
        href: "/contact?request=technical-question&product=lightning-protection",
        type: "question",
      },
    ],
  },
  {
    id: "led-bus lighting",
    number: 7,
    name: "Led-Bus Lighting  Systems",
    shortName: "Lighting Systems",
    description:
      "Plug-in lighting distribution systems for adaptable lighting installations.",
    application:
      "Used in technical spaces, corridors, plant rooms and service areas.",
    image: "/images/application-map/products/led-bus lighting.webp",
    benefits: [
      "Fast lighting installation",
      "Flexible luminaire positioning",
      "Reduced cabling requirements",
      "Easy system reconfiguration",
    ],
    standards: ["IEC 61439-6"],
    actions: [
      {
        label: "Product Page",
        href: "/products/led-bus lighting",
        type: "page",
      },
      {
        label: "Request Quote",
        href: "/contact?request=quote&product=led-bus lighting",
        type: "request",
      },
    ],
  },
] as const satisfies readonly ApplicationProductSystem[];

export const applicationScenes = [
  {
    zone: "overview",
    name: "Overview",
    image: "/images/application-map/data-centre-overview.webp",
    hotspots: [
      {
        id: "overview-busbar",
        productId: "busbar",
        zone: "overview",
        x: 43.5,
        y: 34.2,
        label: "Busbar Trunking",
      },
      {
        id: "overview-cable-tray",
        productId: "cable-tray",
        zone: "overview",
        x: 59,
        y: 42,
        label: "Cable Tray",
      },
      {
        id: "overview-cable-ladder",
        productId: "cable-ladder",
        zone: "overview",
        x: 29,
        y: 57,
        label: "Cable Ladder",
      },
      {
        id: "overview-panel",
        productId: "distribution-panel",
        zone: "overview",
        x: 19,
        y: 43,
        label: "Distribution Panel",
      },
      {
        id: "overview-earthing",
        productId: "earthing",
        zone: "overview",
        x: 51,
        y: 77,
        label: "Earthing",
      },
      {
        id: "overview-lightning",
        productId: "lightning-protection",
        zone: "overview",
        x: 72,
        y: 17,
        label: "Lightning Protection",
      },
      {
        id: "overview-led-bus lighting",
        productId: "led-bus lighting",
        zone: "overview",
        x: 69,
        y: 49,
        label: "Lighting Busbar",
      },
    ],
  },
  {
    zone: "gray-space",
    name: "Gray Space",
    image: "/images/application-map/data-centre-gray-space.webp",
    hotspots: [
      {
        id: "gray-busbar",
        productId: "busbar",
        zone: "gray-space",
        x: 46,
        y: 31,
        label: "Busbar Trunking",
      },
      {
        id: "gray-panel",
        productId: "distribution-panel",
        zone: "gray-space",
        x: 22,
        y: 51,
        label: "Distribution Panel",
      },
      {
        id: "gray-cable-ladder",
        productId: "cable-ladder",
        zone: "gray-space",
        x: 64,
        y: 43,
        label: "Cable Ladder",
      },
    ],
  },
  {
    zone: "white-space",
    name: "White Space",
    image: "/images/application-map/data-centre-white-space.webp",
    hotspots: [
      {
        id: "white-busbar",
        productId: "busbar",
        zone: "white-space",
        x: 55,
        y: 28,
        label: "Overhead Busbar",
      },
      {
        id: "white-cable-tray",
        productId: "cable-tray",
        zone: "white-space",
        x: 39,
        y: 38,
        label: "Cable Tray",
      },
      {
        id: "white-led-bus lighting",
        productId: "led-bus lighting",
        zone: "white-space",
        x: 69,
        y: 25,
        label: "Lighting Busbar",
      },
    ],
  },
] as const satisfies readonly ApplicationScene[];

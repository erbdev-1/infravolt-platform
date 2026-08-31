import { publicDocumentUrl, publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";

import type { BusbarSystemDetailByMarket } from "./types";

const SOURCE_ROUTE = "/products/busbar-systems/ggd-medium-power-busbar";
const REQUEST_QUOTE_HREF = buildEnquiryHref("quote", { system: "busbar", family: "ggd-medium-power-busbar", source: SOURCE_ROUTE });
const REQUEST_DOCUMENTATION_HREF = buildEnquiryHref("technical-document", { system: "busbar", family: "ggd-medium-power-busbar", source: SOURCE_ROUTE });

const IMAGE_BASE = publicMediaUrl("products/busbar/ggd");

const SPEC_COLUMNS_GGDA = [
  { id: "c160", label: "160A" },
  { id: "c250", label: "250A" },
  { id: "c315", label: "315A" },
  { id: "c400", label: "400A" },
  { id: "c500", label: "500A" },
  { id: "c630", label: "630A" },
  { id: "c800", label: "800A" },
  { id: "c1000", label: "1000A" },
] as const;

const SPEC_COLUMNS_GGDC = [
  { id: "c160", label: "160A" },
  { id: "c250", label: "250A" },
  { id: "c315", label: "315A" },
  { id: "c400", label: "400A" },
  { id: "c500", label: "500A" },
  { id: "c630", label: "630A" },
  { id: "c800", label: "800A" },
] as const;

export const GGD_SYSTEM_DETAIL = {
  uk: {
    slug: "ggd-medium-power-busbar",
    categoryEyebrow: "Medium Power Busbar System",
    heroDescription:
      "GGD is a 160 A to 1000 A medium power busbar trunking system for industrial and commercial power distribution, available in aluminium (GGD-A, up to 1000 A) and copper (GGD-C, up to 800 A) conductor variants, with a one-bolt monoblock joint system, dedicated vertical riser hangers for rising main installations, and an extensive range of elbow, offset, expansion, feed and tap-off accessories.",
    heroFeatureImage: `${IMAGE_BASE}/card/ggd-main-transparent-product.webp`,
    heroFeatureImageAlt: "GGD medium power busbar system cutaway view",
    heroImages: [
      {
        image: `${IMAGE_BASE}/applications/ggd-system-overview-render.webp`,
        imageAlt:
          "GGD busbar system overview render showing feed unit, elbow and switchboard connection",
        label: "System overview",
        fit: "contain",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-overhead-installation.webp`,
        imageAlt: "GGD busbar installed overhead in an industrial facility",
        label: "Overhead installation",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-industrial-installation.webp`,
        imageAlt: "GGD busbar installed in an industrial facility",
        label: "Industrial installation",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-high-current-installation-gallery.webp`,
        imageAlt:
          "GGD busbar run with tap-off boxes installed along a facility wall",
        label: "High-current installation",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-high-current-installation-gallery-02.webp`,
        imageAlt:
          "GGD busbar run installed along a technical corridor ceiling",
        label: "Technical corridor installation",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-high-current-installation-gallery-03.webp`,
        imageAlt: "GGD copper conductor being drawn through the manufacturing line",
        label: "Copper conductor production",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-high-current-installation-gallery-04.webp`,
        imageAlt:
          "GGD tap-off boxes installed along a busbar run in an industrial facility",
        label: "Tap-off box installation",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-high-current-installation-gallery-05.webp`,
        imageAlt: "GGD overhead busway installed in a large industrial facility",
        label: "Industrial facility installation",
        fit: "cover",
      },
    ],
    heroPreviousLabel: "Previous image",
    heroNextLabel: "Next image",
    heroGalleryLabel: "GGD product gallery",
    heroFullscreenLabel: "View full screen",
    heroCloseLabel: "Close full-screen image",
    facts: [
      { value: "160–1000 A", label: "Current rating" },
      { value: "IP50 / IP55", label: "Protection degree" },
      { value: "1000 V", label: "Insulation voltage (Ui)" },
      { value: "4000 mm", label: "Standard element length" },
    ],
    overviewEyebrow: "Overview",
    overviewHighlights: [
      "Aluminium (GGD-A, 160–1000 A) or copper (GGD-C, 160–800 A) conductor options",
      "Aluminium housing with a one-bolt monoblock joint system",
      "3P+N+1/2 PE phase configuration across the range",
      "Tightening torque of 30 Nm (GGD-A 160–400 A), 60 Nm (GGD-C 160–800 A) or 90 Nm (GGD-A 500–1000 A)",
      "Horizontal and vertical elbow, T, offset, expansion and reduction elements for routing and building movement",
      "Switchboard feed, feed and centre-feed units for connecting the busbar run to distribution panels",
      "NH, SPB, MCB and MCCB type tap-off boxes for protected sub-circuit connections",
      "IP50 as standard, with IP55 accessories available to order",
      "Recommended support hanger spacing of 1500–2000 mm, plus dedicated vertical riser hangers",
    ],
    applicationsEyebrow: "Applications",
    applicationsHeading: "Where GGD is used",
    applicationsDescription:
      "GGD delivers extensive, high-current power distribution for industrial and commercial facilities that need a wide choice of routing, feed and tap-off accessories.",
    applications: [
      {
        slug: "data-centres",
        title: "Data Centres",
        description:
          "Reliable, high-current power distribution up to 1000 A for data centre server halls.",
        image: publicMediaUrl("industries/cards/data-centres.webp"),
        imageAlt: "Data centre server room with rows of server racks",
      },
      {
        slug: "infrastructure-utilities",
        title: "Infrastructure & Utilities",
        description:
          "Robust power distribution for utility plants and other essential-service facilities.",
        image: publicMediaUrl("industries/cards/infrastructure-utilities.webp"),
        imageAlt: "Industrial utility plant with pumps and piping",
      },
      {
        slug: "industrial-facilities",
        title: "Industrial Facilities",
        description:
          "High-current power distribution for production areas and high-ceiling industrial spaces requiring up to 1000 A capacity.",
        image: publicMediaUrl("industries/cards/industrial-facilities.webp"),
        imageAlt: "Industrial production facility interior",
      },
      {
        slug: "commercial-buildings",
        title: "Commercial Buildings",
        description:
          "Adaptable power distribution for offices, retail units and mixed-use commercial interiors.",
        image: publicMediaUrl("industries/cards/commercial-buildings.webp"),
        imageAlt: "Illuminated commercial office towers at dusk",
      },
      {
        slug: "warehouses-logistics",
        title: "Warehouses & Logistics",
        description:
          "Continuous power distribution above storage aisles, picking areas and logistics operations.",
        image: publicMediaUrl("products/busbar/applications/busbar-application-warehouse.webp"),
        imageAlt:
          "Industrial warehouse with continuous overhead lighting above storage and logistics areas",
      },
      {
        slug: "parking-structures",
        title: "Parking Structures",
        description:
          "Robust power distribution for lighting, EV charging and ventilation infrastructure in parking facilities.",
        image: publicMediaUrl("products/busbar/applications/busbar-application-parking.webp"),
        imageAlt: "Parking structure with overhead lighting and power distribution",
      },
      {
        slug: "healthcare",
        title: "Healthcare",
        description:
          "Resilient power distribution for wards, plant rooms and clinical support areas.",
        image: publicMediaUrl("industries/cards/healthcare.webp"),
        imageAlt: "Hospital corridor with continuous ceiling lighting",
      },
      {
        slug: "transport-infrastructure",
        title: "Transport Infrastructure",
        description:
          "Power distribution for airports, rail stations and other major transport hubs.",
        image: publicMediaUrl("industries/cards/transport-infrastructure.webp"),
        imageAlt: "Airport terminal and transit infrastructure at night",
      },
    ],
    smartAutomation: {
      eyebrow: "SMART AUTOMATION",
      heading: "Monitor and control your busbar network with G-BUS",
      description:
        "G-BUS is Gersan's automation and monitoring layer for compatible busbar systems—bringing visibility, control and intelligence to your power distribution network.",
      compatibilityLine: "Compatible with selected GNL, GL, GGD and GS systems",
      features: [
        {
          title: "No separate data cabling",
          description:
            "Uses the busbar itself for data communication—fast installation with lower complexity.",
        },
        {
          title: "Remote monitoring & control",
          description:
            "Secure access from anywhere to monitor status, receive alerts and operate with confidence.",
        },
        {
          title: "Measurements, switching and scheduling",
          description:
            "Track key electrical parameters, automate switching and schedule operations with ease.",
        },
      ],
      image: publicMediaUrl("products/g-bus/g-bus-smart-rail-dashboard.webp"),
      imageAlt:
        "G-BUS automation dashboard overlay on a Gersan busbar with receiver modules",
      primaryActionLabel: "Explore G-BUS Automation",
      primaryActionHref: "/products/g-bus",
    },
    technicalDataEyebrow: "Technical data",
    technicalDataHeading: "Ratings & specification",
    parameterHeading: "Parameter",
    specVariants: [
      {
        id: "ggd-a",
        label: "GGD-A (Aluminium)",
        columns: SPEC_COLUMNS_GGDA,
        rows: [
          {
            parameter: "Rated current (In)",
            values: {
              c160: "160 A",
              c250: "250 A",
              c315: "315 A",
              c400: "400 A",
              c500: "500 A",
              c630: "630 A",
              c800: "800 A",
              c1000: "1000 A",
            },
          },
          {
            parameter: "Rated operational voltage (Ue)",
            values: {
              c160: "1000 V",
              c250: "1000 V",
              c315: "1000 V",
              c400: "1000 V",
              c500: "1000 V",
              c630: "1000 V",
              c800: "1000 V",
              c1000: "1000 V",
            },
          },
          {
            parameter: "Insulation voltage (Ui)",
            values: {
              c160: "1000 V",
              c250: "1000 V",
              c315: "1000 V",
              c400: "1000 V",
              c500: "1000 V",
              c630: "1000 V",
              c800: "1000 V",
              c1000: "1000 V",
            },
          },
          {
            parameter: "Frequency (fn)",
            values: {
              c160: "50/60 Hz",
              c250: "50/60 Hz",
              c315: "50/60 Hz",
              c400: "50/60 Hz",
              c500: "50/60 Hz",
              c630: "50/60 Hz",
              c800: "50/60 Hz",
              c1000: "50/60 Hz",
            },
          },
          {
            parameter: "Phase conductor cross-section (SF)",
            values: {
              c160: "144 mm²",
              c250: "144 mm²",
              c315: "144 mm²",
              c400: "144 mm²",
              c500: "500 mm²",
              c630: "500 mm²",
              c800: "600 mm²",
              c1000: "700 mm²",
            },
          },
          {
            parameter: "Neutral conductor cross-section (SN)",
            values: {
              c160: "144 mm²",
              c250: "144 mm²",
              c315: "144 mm²",
              c400: "144 mm²",
              c500: "500 mm²",
              c630: "500 mm²",
              c800: "600 mm²",
              c1000: "700 mm²",
            },
          },
          {
            parameter: "Earth bar cross-section (SH)",
            values: {
              c160: "200 mm²",
              c250: "200 mm²",
              c315: "200 mm²",
              c400: "200 mm²",
              c500: "350 mm²",
              c630: "350 mm²",
              c800: "350 mm²",
              c1000: "350 mm²",
            },
          },
          {
            parameter: "Aluminium housing cross-section (SPE)",
            values: {
              c160: "1083 mm²",
              c250: "1083 mm²",
              c315: "1083 mm²",
              c400: "1083 mm²",
              c500: "1200 mm²",
              c630: "1200 mm²",
              c800: "1200 mm²",
              c1000: "1200 mm²",
            },
          },
          {
            parameter: "Phase short-circuit withstand current, 1s (Icw)",
            values: {
              c160: "13 kA",
              c250: "13 kA",
              c315: "13 kA",
              c400: "13 kA",
              c500: "25 kA",
              c630: "25 kA",
              c800: "35 kA",
              c1000: "40 kA",
            },
          },
          {
            parameter: "Phase peak withstand current (Ipk)",
            values: {
              c160: "26 kA",
              c250: "26 kA",
              c315: "26 kA",
              c400: "26 kA",
              c500: "53 kA",
              c630: "53 kA",
              c800: "80 kA",
              c1000: "90 kA",
            },
          },
          {
            parameter: "Neutral short-circuit withstand current, 1s (Icw)",
            values: {
              c160: "8 kA",
              c250: "8 kA",
              c315: "8 kA",
              c400: "8 kA",
              c500: "15 kA",
              c630: "15 kA",
              c800: "22 kA",
              c1000: "24 kA",
            },
          },
          {
            parameter: "Neutral peak withstand current (Ipk)",
            values: {
              c160: "14 kA",
              c250: "16 kA",
              c315: "14 kA",
              c400: "14 kA",
              c500: "30 kA",
              c630: "30 kA",
              c800: "44 kA",
              c1000: "50 kA",
            },
          },
          {
            parameter: "Phase resistance (R20)",
            values: {
              c160: "0.193 mΩ/m",
              c250: "0.193 mΩ/m",
              c315: "0.193 mΩ/m",
              c400: "0.193 mΩ/m",
              c500: "0.058 mΩ/m",
              c630: "0.058 mΩ/m",
              c800: "0.048 mΩ/m",
              c1000: "0.041 mΩ/m",
            },
          },
          {
            parameter: "Phase resistance (R1)",
            values: {
              c160: "0.338 mΩ/m",
              c250: "0.338 mΩ/m",
              c315: "0.338 mΩ/m",
              c400: "0.338 mΩ/m",
              c500: "0.098 mΩ/m",
              c630: "0.098 mΩ/m",
              c800: "0.080 mΩ/m",
              c1000: "0.045 mΩ/m",
            },
          },
          {
            parameter: "Phase reactance (X1)",
            values: {
              c160: "0.094 mΩ/m",
              c250: "0.094 mΩ/m",
              c315: "0.094 mΩ/m",
              c400: "0.094 mΩ/m",
              c500: "0.014 mΩ/m",
              c630: "0.014 mΩ/m",
              c800: "0.010 mΩ/m",
              c1000: "0.007 mΩ/m",
            },
          },
          {
            parameter: "Phase impedance (Z1)",
            values: {
              c160: "0.351 mΩ/m",
              c250: "0.351 mΩ/m",
              c315: "0.351 mΩ/m",
              c400: "0.351 mΩ/m",
              c500: "0.099 mΩ/m",
              c630: "0.099 mΩ/m",
              c800: "0.080 mΩ/m",
              c1000: "0.046 mΩ/m",
            },
          },
          {
            parameter: "Conductor material",
            values: {
              c160: "Aluminium (EC Grade)",
              c250: "Aluminium (EC Grade)",
              c315: "Aluminium (EC Grade)",
              c400: "Aluminium (EC Grade)",
              c500: "Aluminium (EC Grade)",
              c630: "Aluminium (EC Grade)",
              c800: "Aluminium (EC Grade)",
              c1000: "Aluminium (EC Grade)",
            },
          },
          {
            parameter: "Protection degree",
            values: {
              c160: "IP50",
              c250: "IP50",
              c315: "IP50",
              c400: "IP50",
              c500: "IP50",
              c630: "IP50",
              c800: "IP50",
              c1000: "IP50",
            },
          },
          {
            parameter: "Standard element length",
            values: {
              c160: "4000 mm",
              c250: "4000 mm",
              c315: "4000 mm",
              c400: "4000 mm",
              c500: "4000 mm",
              c630: "4000 mm",
              c800: "4000 mm",
              c1000: "4000 mm",
            },
          },
          {
            parameter: "Joint tightening torque",
            values: {
              c160: "30 Nm",
              c250: "30 Nm",
              c315: "30 Nm",
              c400: "30 Nm",
              c500: "90 Nm",
              c630: "90 Nm",
              c800: "90 Nm",
              c1000: "90 Nm",
            },
          },
        ],
      },
      {
        id: "ggd-c",
        label: "GGD-C (Copper)",
        columns: SPEC_COLUMNS_GGDC,
        rows: [
          {
            parameter: "Rated current (In)",
            values: {
              c160: "160 A",
              c250: "250 A",
              c315: "315 A",
              c400: "400 A",
              c500: "500 A",
              c630: "630 A",
              c800: "800 A",
            },
          },
          {
            parameter: "Rated operational voltage (Ue)",
            values: {
              c160: "1000 V",
              c250: "1000 V",
              c315: "1000 V",
              c400: "1000 V",
              c500: "1000 V",
              c630: "1000 V",
              c800: "1000 V",
            },
          },
          {
            parameter: "Insulation voltage (Ui)",
            values: {
              c160: "1000 V",
              c250: "1000 V",
              c315: "1000 V",
              c400: "1000 V",
              c500: "1000 V",
              c630: "1000 V",
              c800: "1000 V",
            },
          },
          {
            parameter: "Frequency (fn)",
            values: {
              c160: "50/60 Hz",
              c250: "50/60 Hz",
              c315: "50/60 Hz",
              c400: "50/60 Hz",
              c500: "50/60 Hz",
              c630: "50/60 Hz",
              c800: "50/60 Hz",
            },
          },
          {
            parameter: "Phase conductor cross-section (SF)",
            values: {
              c160: "144 mm²",
              c250: "144 mm²",
              c315: "144 mm²",
              c400: "144 mm²",
              c500: "250 mm²",
              c630: "250 mm²",
              c800: "400 mm²",
            },
          },
          {
            parameter: "Neutral conductor cross-section (SN)",
            values: {
              c160: "144 mm²",
              c250: "144 mm²",
              c315: "144 mm²",
              c400: "144 mm²",
              c500: "250 mm²",
              c630: "250 mm²",
              c800: "400 mm²",
            },
          },
          {
            parameter: "Earth bar cross-section (SH)",
            values: {
              c160: "200 mm²",
              c250: "200 mm²",
              c315: "200 mm²",
              c400: "200 mm²",
              c500: "200 mm²",
              c630: "200 mm²",
              c800: "200 mm²",
            },
          },
          {
            parameter: "Aluminium housing cross-section (SPE)",
            values: {
              c160: "1083 mm²",
              c250: "1083 mm²",
              c315: "1083 mm²",
              c400: "1083 mm²",
              c500: "1083 mm²",
              c630: "1083 mm²",
              c800: "1083 mm²",
            },
          },
          {
            parameter: "Phase short-circuit withstand current, 1s (Icw)",
            values: {
              c160: "20 kA",
              c250: "20 kA",
              c315: "20 kA",
              c400: "20 kA",
              c500: "25 kA",
              c630: "25 kA",
              c800: "35 kA",
            },
          },
          {
            parameter: "Phase peak withstand current (Ipk)",
            values: {
              c160: "44 kA",
              c250: "44 kA",
              c315: "44 kA",
              c400: "44 kA",
              c500: "53 kA",
              c630: "53 kA",
              c800: "74 kA",
            },
          },
          {
            parameter: "Neutral short-circuit withstand current, 1s (Icw)",
            values: {
              c160: "12 kA",
              c250: "12 kA",
              c315: "12 kA",
              c400: "12 kA",
              c500: "15 kA",
              c630: "15 kA",
              c800: "22 kA",
            },
          },
          {
            parameter: "Neutral peak withstand current (Ipk)",
            values: {
              c160: "24 kA",
              c250: "24 kA",
              c315: "24 kA",
              c400: "24 kA",
              c500: "30 kA",
              c630: "30 kA",
              c800: "44 kA",
            },
          },
          {
            parameter: "Phase resistance (R20)",
            values: {
              c160: "0.105 mΩ/m",
              c250: "0.105 mΩ/m",
              c315: "0.105 mΩ/m",
              c400: "0.105 mΩ/m",
              c500: "0.072 mΩ/m",
              c630: "0.072 mΩ/m",
              c800: "0.045 mΩ/m",
            },
          },
          {
            parameter: "Phase resistance (R1)",
            values: {
              c160: "0.138 mΩ/m",
              c250: "0.138 mΩ/m",
              c315: "0.138 mΩ/m",
              c400: "0.138 mΩ/m",
              c500: "0.108 mΩ/m",
              c630: "0.108 mΩ/m",
              c800: "0.068 mΩ/m",
            },
          },
          {
            parameter: "Phase reactance (X1)",
            values: {
              c160: "0.021 mΩ/m",
              c250: "0.021 mΩ/m",
              c315: "0.021 mΩ/m",
              c400: "0.021 mΩ/m",
              c500: "0.018 mΩ/m",
              c630: "0.018 mΩ/m",
              c800: "0.010 mΩ/m",
            },
          },
          {
            parameter: "Phase impedance (Z1)",
            values: {
              c160: "0.139 mΩ/m",
              c250: "0.139 mΩ/m",
              c315: "0.139 mΩ/m",
              c400: "0.165 mΩ/m",
              c500: "0.136 mΩ/m",
              c630: "0.136 mΩ/m",
              c800: "0.080 mΩ/m",
            },
          },
          {
            parameter: "Conductor material",
            values: {
              c160: "Electrolytic copper (99.9%)",
              c250: "Electrolytic copper (99.9%)",
              c315: "Electrolytic copper (99.9%)",
              c400: "Electrolytic copper (99.9%)",
              c500: "Electrolytic copper (99.9%)",
              c630: "Electrolytic copper (99.9%)",
              c800: "Electrolytic copper (99.9%)",
            },
          },
          {
            parameter: "Protection degree",
            values: {
              c160: "IP50",
              c250: "IP50",
              c315: "IP50",
              c400: "IP50",
              c500: "IP50",
              c630: "IP50",
              c800: "IP50",
            },
          },
          {
            parameter: "Standard element length",
            values: {
              c160: "4000 mm",
              c250: "4000 mm",
              c315: "4000 mm",
              c400: "4000 mm",
              c500: "4000 mm",
              c630: "4000 mm",
              c800: "4000 mm",
            },
          },
          {
            parameter: "Joint tightening torque",
            values: {
              c160: "60 Nm",
              c250: "60 Nm",
              c315: "60 Nm",
              c400: "60 Nm",
              c500: "60 Nm",
              c630: "60 Nm",
              c800: "60 Nm",
            },
          },
        ],
      },
    ],
    componentsEyebrow: "System components",
    componentsHeadingPrefix: "Components for",
    components: [
      {
        slug: "standard-length-element",
        name: "Standard Length Element",
        orderCode:
          "GGD-A 201000 / 202000 / 203100 / 204100 / 205000 / 206000 / 208000 / 210000 · GGD-C 201000 / 202000 / 203000 / 204000 / 205000 / 206000 / 208000",
        description:
          "4000 mm aluminium-housing busbar element in 3P+N+1/2 PE configuration, available with aluminium (GGD-A, 160–1000 A) or copper (GGD-C, 160–800 A) conductors.",
        image: `${IMAGE_BASE}/components/ggd-standard-length-element.webp`,
        imageAlt: "GGD standard length busbar element render",
      },
      {
        slug: "non-standard-length-element",
        name: "Non-Standard Length Element",
        orderCode:
          "GGD-A 201001 / 202001 / 203101 / 204101 / 205001 / 206001 / 208001 / 210001 · GGD-C 201001 / 202001 / 203001 / 204001 / 205001 / 206001 / 208001",
        description:
          "Custom-length element (400–3999 mm) for non-standard runs; X/Y dimensions specified at order.",
        image: `${IMAGE_BASE}/components/ggd-non-standard-length-element.webp`,
        imageAlt: "GGD non-standard length element render",
      },
      {
        slug: "one-bolt-joint-set",
        name: "One-Bolt Joint Set",
        orderCode: "GGD-A 6135 · GGD-C 6135",
        description:
          "Monoblock one-bolt joint set connecting two busbar elements; side and joint covers restore IP55 protection.",
        image: `${IMAGE_BASE}/components/ggd-one-bolt-joint-set.webp`,
        imageAlt: "GGD one-bolt joint set render",
      },
      {
        slug: "horizontal-elbow-right",
        name: "90° Horizontal Elbow Element — Right",
        orderCode: "GGD-A 200102 / 200106 · GGD-C 200102",
        description:
          "90° horizontal direction-change element; custom angles between 88°–179° available to order.",
        image: `${IMAGE_BASE}/components/ggd-horizontal-elbow-right.webp`,
        imageAlt: "GGD horizontal elbow right render",
      },
      {
        slug: "horizontal-elbow-left",
        name: "90° Horizontal Elbow Element — Left",
        orderCode: "GGD-A 200101 / 200105 · GGD-C 200101",
        description:
          "90° horizontal direction-change element; custom angles between 88°–179° available to order.",
        image: `${IMAGE_BASE}/components/ggd-horizontal-elbow-left.webp`,
        imageAlt: "GGD horizontal elbow left render",
      },
      {
        slug: "vertical-elbow-right",
        name: "90° Vertical Elbow Element — Right",
        orderCode: "GGD-A 200104 / 200108 · GGD-C 200104",
        description:
          "90° vertical direction-change element; custom angles between 88°–179° available to order.",
        image: `${IMAGE_BASE}/components/ggd-vertical-elbow-right.webp`,
        imageAlt: "GGD vertical elbow right render",
      },
      {
        slug: "vertical-elbow-left",
        name: "90° Vertical Elbow Element — Left",
        orderCode: "GGD-A 200103 / 200107 · GGD-C 200103",
        description:
          "90° vertical direction-change element; custom angles between 88°–179° available to order.",
        image: `${IMAGE_BASE}/components/ggd-vertical-elbow-left.webp`,
        imageAlt: "GGD vertical elbow left render",
      },
      {
        slug: "t-element-right",
        name: "T Element — Right",
        orderCode: "GGD-A 200111 / 200112 · GGD-C 200104",
        description:
          "T-branch element for splitting the busbar run in a third direction.",
        image: `${IMAGE_BASE}/components/ggd-t-element-right.webp`,
        imageAlt: "GGD T element right render",
      },
      {
        slug: "t-element-left",
        name: "T Element — Left",
        orderCode: "GGD-A 200109 / 200110 · GGD-C 200109",
        description:
          "T-branch element for splitting the busbar run in a third direction.",
        image: `${IMAGE_BASE}/components/ggd-t-element-left.webp`,
        imageAlt: "GGD T element left render",
      },
      {
        slug: "mechanical-dilatation",
        name: "Mechanical Dilatation Element",
        orderCode: "GGD-A 204009 / 210009 · GGD-C 204009",
        description:
          "Absorbs building structural movement; installed at structural expansion points.",
        image: `${IMAGE_BASE}/components/ggd-mechanical-dilatation.webp`,
        imageAlt: "GGD mechanical dilatation element render",
      },
      {
        slug: "horizontal-expansion",
        name: "Horizontal Expansion Element",
        orderCode: "GGD-A 204011 / 210011 · GGD-C 204011",
        description:
          "Absorbs thermal expansion on long straight runs; recommended approximately every 40 m.",
        image: `${IMAGE_BASE}/components/ggd-horizontal-expansion.webp`,
        imageAlt: "GGD horizontal expansion element render",
      },
      {
        slug: "vertical-expansion",
        name: "Vertical Expansion Element",
        orderCode: "GGD-A 204010 / 210010 · GGD-C 204010",
        description: "Absorbs thermal expansion on long vertical runs.",
        image: `${IMAGE_BASE}/components/ggd-vertical-expansion.webp`,
        imageAlt: "GGD vertical expansion element render",
      },
      {
        slug: "switchboard-feed-right",
        name: "Switchboard Feed Unit — Right",
        orderCode: "GGD-A 200030 / 200031 · GGD-C 200030",
        description:
          "Right-hand connection module for feeding the busbar run directly from a distribution panel.",
        image: `${IMAGE_BASE}/components/ggd-switchboard-feed-right.webp`,
        imageAlt: "GGD switchboard feed unit right render",
      },
      {
        slug: "switchboard-feed-left",
        name: "Switchboard Feed Unit — Left",
        orderCode: "GGD-A 200032 / 200033 · GGD-C 200030",
        description:
          "Left-hand connection module for feeding the busbar run directly from a distribution panel.",
        image: `${IMAGE_BASE}/components/ggd-switchboard-feed-left.webp`,
        imageAlt: "GGD switchboard feed unit left render",
      },
      {
        slug: "feed-unit-right",
        name: "Feed Unit — Right",
        orderCode: "GGD-A 200021 / 200023 · GGD-C 200021",
        description:
          "Right-hand feed unit for supplying the busbar run; switch-fused version available to order.",
        image: `${IMAGE_BASE}/components/ggd-feed-unit-right.webp`,
        imageAlt: "GGD feed unit right render",
      },
      {
        slug: "feed-unit-left",
        name: "Feed Unit — Left",
        orderCode: "GGD-A 200020 / 200022 · GGD-C 200020",
        description:
          "Left-hand feed unit for supplying the busbar run; switch-fused version available to order.",
        image: `${IMAGE_BASE}/components/ggd-feed-unit-left.webp`,
        imageAlt: "GGD feed unit left render",
      },
      {
        slug: "centre-feed-unit",
        name: "Centre Feed Unit",
        orderCode: "GGD-A 200024 / 200025 · GGD-C 200024",
        description:
          "Feeds the busbar run from a mid-span point; switch-fused version available to order.",
        image: `${IMAGE_BASE}/components/ggd-centre-feed-unit.webp`,
        imageAlt: "GGD centre feed unit render",
      },
      {
        slug: "horizontal-offset-right",
        name: "90° Horizontal Offset Element — Right",
        orderCode: "GGD-A 200124 / 200128 · GGD-C 200124",
        description:
          "Shifts the run onto a parallel horizontal axis; X/Y/Z dimensions specified at order.",
        image: `${IMAGE_BASE}/components/ggd-horizontal-offset-right.webp`,
        imageAlt: "GGD horizontal offset right render",
      },
      {
        slug: "horizontal-offset-left",
        name: "90° Horizontal Offset Element — Left",
        orderCode: "GGD-A 200123 / 200127 · GGD-C 200123",
        description:
          "Shifts the run onto a parallel horizontal axis; X/Y/Z dimensions specified at order.",
        image: `${IMAGE_BASE}/components/ggd-horizontal-offset-left.webp`,
        imageAlt: "GGD horizontal offset left render",
      },
      {
        slug: "vertical-offset-right",
        name: "90° Vertical Offset Element — Right",
        orderCode: "GGD-A 200126 / 200130 · GGD-C 200126",
        description:
          "Shifts the run onto a parallel vertical axis; X/Y/Z dimensions specified at order.",
        image: `${IMAGE_BASE}/components/ggd-vertical-offset-right.webp`,
        imageAlt: "GGD vertical offset right render",
      },
      {
        slug: "vertical-offset-left",
        name: "90° Vertical Offset Element — Left",
        orderCode: "GGD-A 200125 / 200129 · GGD-C 200126",
        description:
          "Shifts the run onto a parallel vertical axis; X/Y/Z dimensions specified at order.",
        image: `${IMAGE_BASE}/components/ggd-vertical-offset-left.webp`,
        imageAlt: "GGD vertical offset left render",
      },
      {
        slug: "reduction-element",
        name: "Reduction Element",
        orderCode: "GGD-A RED01 / RED02",
        description:
          "Steps down between current ratings (400–1000 A) within the same busbar run.",
        image: `${IMAGE_BASE}/components/ggd-reduction-element.webp`,
        imageAlt: "GGD reduction element technical drawing",
      },
      {
        slug: "fire-barrier",
        name: "Fire Barrier",
        orderCode: "GGD-A 204006 / 210006 · GGD-C 208006",
        description:
          "Fire barrier element for busbar penetrations through fire-rated walls and floors.",
        image: `${IMAGE_BASE}/components/ggd-fire-barrier.webp`,
        imageAlt: "GGD fire barrier technical drawing",
      },
      {
        slug: "end-cap",
        name: "End Cap",
        orderCode: "GGD 100028 (160–400 A) / 100029 (500–1000 A)",
        description: "Closes the open end of a feed unit at the end of a run.",
        image: `${IMAGE_BASE}/components/ggd-end-cap.webp`,
        imageAlt: "GGD end cap technical drawing",
      },
      {
        slug: "ip55-sticky-cover",
        name: "IP55 Sticky Plug Outlet Cover",
        orderCode: "GGD 500002",
        description:
          "Sticky plug cover for sealing unused plug-in outlet windows to IP55.",
        image: `${IMAGE_BASE}/components/ggd-ip55-sticky-cover.webp`,
        imageAlt: "GGD IP55 sticky plug outlet cover render",
      },
      {
        slug: "ip55-outlet-cover",
        name: "IP55 Outlet Cover",
        orderCode: "GGD 500003",
        description:
          "Outlet cover restoring IP55 ingress protection at an open plug-in window.",
        image: `${IMAGE_BASE}/components/ggd-ip55-outlet-cover.webp`,
        imageAlt: "GGD IP55 outlet cover render",
      },
      {
        slug: "fixing-hanger",
        name: "Fixing Hanger",
        orderCode:
          "GGD 010001 / 010004 (160–400 A) · GGD 020001 / 010005 (500–1000 A)",
        description:
          "Support hanger for the busbar run; recommended spacing is 1500–2000 mm.",
        image: `${IMAGE_BASE}/components/ggd-fixing-hanger.webp`,
        imageAlt: "GGD fixing hanger render",
      },
      {
        slug: "vertical-riser-hanger",
        name: "Hanger for Vertical Riser",
        orderCode: "GGD 010002 (160–400 A) / 010003 (500–1000 A)",
        description:
          "Spring hanger for vertical risers; one hanger per vertical outlet and per 150 kg of busbar, in addition to standard fixing hangers.",
        image: `${IMAGE_BASE}/components/ggd-vertical-riser-hanger.webp`,
        imageAlt: "GGD vertical riser hanger technical drawing",
      },
      {
        slug: "tap-off-box-nh",
        name: "Tap-off Box NH Type",
        orderCode: "GGD 400631 (25–80 A) / 401251 (25–125 A)",
        description:
          "NH fuse-type tap-off box for protected sub-circuit connections from the busbar run.",
        image: `${IMAGE_BASE}/components/ggd-tap-off-box-nh.webp`,
        imageAlt: "GGD tap-off box NH type render",
      },
      {
        slug: "tap-off-box-spb",
        name: "Tap-off Box SPB Type",
        orderCode: "GGD 401160 / 402500 / 404000 / 406300 (160–630 A)",
        description:
          "SPB fuse-type tap-off box for higher-current protected sub-circuit connections.",
        image: `${IMAGE_BASE}/components/ggd-tap-off-box-spb.webp`,
        imageAlt: "GGD tap-off box SPB type render",
      },
      {
        slug: "tap-off-box-mcb",
        name: "Tap-off Box MCB Type",
        orderCode:
          "GGD 400630 (25–40 A) / 400632 (25–80 A) / 401252 (25–125 A)",
        description:
          "MCB-type tap-off box for protected sub-circuit connections from the busbar run.",
        image: `${IMAGE_BASE}/components/ggd-tap-off-box-mcb.webp`,
        imageAlt: "GGD tap-off box MCB type render",
      },
      {
        slug: "tap-off-box-mccb",
        name: "Tap-off Box MCCB Version",
        orderCode: "GGD 401253 / 401162 / 402502 / 404002 / 406302 (25–630 A)",
        description:
          "MCCB-version tap-off box for higher-current protected sub-circuit connections.",
        image: `${IMAGE_BASE}/components/ggd-tap-off-box-mccb.webp`,
        imageAlt: "GGD tap-off box MCCB version render",
      },
    ],
    documentsTabLabel: "Documents",
    documents: [
      {
        title: "Gersan Busbar Systems Catalogue",
        description:
          "Full product catalogue covering all Gersan busbar trunking systems, including GGD technical data, order codes and dimensional drawings.",
        fileLabel: "PDF · 25.1 MB",
        href: publicDocumentUrl("documents/busbar/gersan-busbar-systems-catalogue.pdf"),
        downloadLabel: "Download catalogue",
      },
      {
        title: "GGD Installation Guide",
        description:
          "Quick reference for joining two GGD busbar elements: alignment, one-bolt joint tightening torque and closing the joint covers.",
        fileLabel: "PDF",
        href: `${IMAGE_BASE}/installation/ggd-busbar-installation-guide.pdf`,
        downloadLabel: "Download installation guide",
      },
    ],
    requestQuoteHref: REQUEST_QUOTE_HREF,
    requestDocumentationHref: REQUEST_DOCUMENTATION_HREF,
  },
  ua: {
    slug: "ggd-medium-power-busbar",
    categoryEyebrow: "Шинопровідна система середньої потужності",
    heroDescription:
      "GGD — шинопровідна система середньої потужності на 160–1000 А для промислового та комерційного розподілу електроенергії. Доступна у варіантах з алюмінієвими (GGD-A, до 1000 А) або мідними (GGD-C, до 800 А) провідниками, з одноболтовою моноблочною системою з'єднання та широким асортиментом кутових, зміщувальних, компенсаційних, ввідних та відгалужувальних аксесуарів.",
    heroFeatureImage: `${IMAGE_BASE}/card/ggd-main-transparent-product.webp`,
    heroFeatureImageAlt: "Розрізний вигляд шинопровідної системи GGD",
    heroImages: [
      {
        image: `${IMAGE_BASE}/applications/ggd-system-overview-render.webp`,
        imageAlt:
          "Загальна схема системи GGD із ввідним елементом, поворотом та підключенням до щита",
        label: "Схема системи",
        fit: "contain",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-overhead-installation.webp`,
        imageAlt: "Шинопровід GGD, змонтований під стелею промислового об'єкта",
        label: "Стельовий монтаж",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-industrial-installation.webp`,
        imageAlt: "Шинопровід GGD у промисловому приміщенні",
        label: "Промисловий монтаж",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-high-current-installation-gallery.webp`,
        imageAlt:
          "Лінія GGD із відгалужувальними коробками, змонтована вздовж стіни об'єкта",
        label: "Монтаж високострумової лінії",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-high-current-installation-gallery-02.webp`,
        imageAlt: "Лінія GGD, змонтована під стелею технічного коридору",
        label: "Монтаж у технічному коридорі",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-high-current-installation-gallery-03.webp`,
        imageAlt: "Витягування мідного провідника GGD на виробничій лінії",
        label: "Виробництво мідного провідника",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-high-current-installation-gallery-04.webp`,
        imageAlt: "Відгалужувальні коробки GGD, змонтовані вздовж лінії шинопроводу на промисловому об'єкті",
        label: "Монтаж відгалужувальних коробок",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/ggd-high-current-installation-gallery-05.webp`,
        imageAlt: "Надземний шинопровід GGD, змонтований на великому промисловому об'єкті",
        label: "Монтаж на промисловому об'єкті",
        fit: "cover",
      },
    ],
    heroPreviousLabel: "Попереднє зображення",
    heroNextLabel: "Наступне зображення",
    heroGalleryLabel: "Галерея продукції GGD",
    heroFullscreenLabel: "Переглянути на весь екран",
    heroCloseLabel: "Закрити повноекранне зображення",
    facts: [
      { value: "160–1000 А", label: "Номінальний струм" },
      { value: "IP50 / IP55", label: "Ступінь захисту" },
      { value: "1000 В", label: "Ізоляційна напруга (Ui)" },
      { value: "4000 мм", label: "Стандартна довжина елемента" },
    ],
    overviewEyebrow: "Огляд",
    overviewHighlights: [
      "Алюмінієві (GGD-A, 160–1000 А) або мідні (GGD-C, 160–800 А) провідники на вибір",
      "Алюмінієвий корпус з одноболтовою моноблочною системою з'єднання",
      "Конфігурація 3P+N+1/2 PE в усьому діапазоні",
      "Момент затяжки з'єднання: 30 Нм (GGD-A 160–400 А), 60 Нм (GGD-C 160–800 А) або 90 Нм (GGD-A 500–1000 А)",
      "Горизонтальні й вертикальні кутові, T-подібні, зміщувальні, компенсаційні та редукційні елементи для трас і будівельних рухів",
      "Ввідні модулі пано, ввідні елементи та елементи центрального живлення для підключення лінії до розподільних щитів",
      "Відгалужувальні коробки типу NH, SPB, MCB та MCCB для захищеного підключення підсхем",
      "IP50 як стандарт, аксесуари IP55 доступні за запитом",
      "Рекомендована відстань між опорними підвісами 1500–2000 мм, а також спеціальні підвіси для вертикальних систем",
    ],
    applicationsEyebrow: "Застосування",
    applicationsHeading: "Де використовується GGD",
    applicationsDescription:
      "GGD забезпечує потужний розподіл електроенергії для промислових і комерційних об'єктів, де потрібен широкий вибір трасувальних, ввідних та відгалужувальних аксесуарів.",
    applications: [
      {
        slug: "data-centres",
        title: "Дата-центри",
        description:
          "Надійний розподіл живлення до 1000 А для серверних залів дата-центрів.",
        image: publicMediaUrl("industries/cards/data-centres.webp"),
        imageAlt: "Серверна зала дата-центру з рядами серверних стійок",
      },
      {
        slug: "infrastructure-utilities",
        title: "Інфраструктура та комунальне господарство",
        description:
          "Надійний розподіл живлення для об'єктів комунального господарства та інших об'єктів життєзабезпечення.",
        image: publicMediaUrl("industries/cards/infrastructure-utilities.webp"),
        imageAlt: "Промисловий об'єкт комунального господарства з насосами та трубопроводами",
      },
      {
        slug: "industrial-facilities",
        title: "Промислові об'єкти",
        description:
          "Розподіл потужного струму для виробничих зон та промислових приміщень з ємністю до 1000 А.",
        image: publicMediaUrl("industries/cards/industrial-facilities.webp"),
        imageAlt: "Інтер'єр промислового виробничого об'єкта",
      },
      {
        slug: "commercial-buildings",
        title: "Комерційні будівлі",
        description:
          "Адаптивний розподіл живлення для офісів, торговельних приміщень та багатофункціональних комерційних об'єктів.",
        image: publicMediaUrl("industries/cards/commercial-buildings.webp"),
        imageAlt: "Освітлені комерційні офісні вежі в сутінках",
      },
      {
        slug: "warehouses-logistics",
        title: "Склади та логістичні центри",
        description:
          "Безперервний розподіл живлення над складськими проходами та логістичними ділянками.",
        image: publicMediaUrl("products/busbar/applications/busbar-application-warehouse.webp"),
        imageAlt: "Промисловий склад із безперервним освітленням над стелажами",
      },
      {
        slug: "parking-structures",
        title: "Паркінги",
        description:
          "Надійний розподіл живлення для освітлення, зарядки електромобілів та вентиляції в паркінгах.",
        image: publicMediaUrl("products/busbar/applications/busbar-application-parking.webp"),
        imageAlt: "Паркінг з надстельовим освітленням та розподілом живлення",
      },
      {
        slug: "healthcare",
        title: "Охорона здоров'я",
        description:
          "Надійний розподіл живлення для палат, технічних приміщень та клінічних допоміжних зон.",
        image: publicMediaUrl("industries/cards/healthcare.webp"),
        imageAlt: "Лікарняний коридор з безперервним стельовим освітленням",
      },
      {
        slug: "transport-infrastructure",
        title: "Транспортна інфраструктура",
        description:
          "Розподіл живлення для аеропортів, залізничних станцій та інших великих транспортних вузлів.",
        image: publicMediaUrl("industries/cards/transport-infrastructure.webp"),
        imageAlt: "Термінал аеропорту та транспортна інфраструктура вночі",
      },
    ],
    smartAutomation: {
      eyebrow: "РОЗУМНА АВТОМАТИЗАЦІЯ",
      heading: "Моніторинг і керування шинопроводом за допомогою G-BUS",
      description:
        "G-BUS — це рівень автоматизації та моніторингу Gersan для сумісних шинопровідних систем, що надає видимість, керування та інтелектуальні можливості вашій мережі розподілу живлення.",
      compatibilityLine: "Сумісно з обраними системами GNL, GL, GGD та GS",
      features: [
        {
          title: "Без окремого кабелю передачі даних",
          description:
            "Використовує сам шинопровід для передачі даних — швидкий монтаж і менша складність.",
        },
        {
          title: "Віддалений моніторинг і керування",
          description:
            "Безпечний доступ звідусіль для контролю стану, отримання сповіщень та впевненого керування.",
        },
        {
          title: "Вимірювання, перемикання та планування",
          description:
            "Відстежуйте ключові електричні параметри, автоматизуйте перемикання та плануйте операції.",
        },
      ],
      image: publicMediaUrl("products/g-bus/g-bus-smart-rail-dashboard.webp"),
      imageAlt:
        "Панель автоматизації G-BUS поверх шинопроводу Gersan з приймальними модулями",
      primaryActionLabel: "Дізнатися про G-BUS Automation",
      primaryActionHref: "/products/g-bus",
    },
    technicalDataEyebrow: "Технічні дані",
    technicalDataHeading: "Параметри та характеристики",
    parameterHeading: "Параметр",
    specVariants: [
      {
        id: "ggd-a",
        label: "GGD-A (Алюміній)",
        columns: SPEC_COLUMNS_GGDA,
        rows: [
          {
            parameter: "Номінальний струм (In)",
            values: {
              c160: "160 А",
              c250: "250 А",
              c315: "315 А",
              c400: "400 А",
              c500: "500 А",
              c630: "630 А",
              c800: "800 А",
              c1000: "1000 А",
            },
          },
          {
            parameter: "Номінальна робоча напруга (Ue)",
            values: {
              c160: "1000 В",
              c250: "1000 В",
              c315: "1000 В",
              c400: "1000 В",
              c500: "1000 В",
              c630: "1000 В",
              c800: "1000 В",
              c1000: "1000 В",
            },
          },
          {
            parameter: "Ізоляційна напруга (Ui)",
            values: {
              c160: "1000 В",
              c250: "1000 В",
              c315: "1000 В",
              c400: "1000 В",
              c500: "1000 В",
              c630: "1000 В",
              c800: "1000 В",
              c1000: "1000 В",
            },
          },
          {
            parameter: "Частота (fn)",
            values: {
              c160: "50/60 Гц",
              c250: "50/60 Гц",
              c315: "50/60 Гц",
              c400: "50/60 Гц",
              c500: "50/60 Гц",
              c630: "50/60 Гц",
              c800: "50/60 Гц",
              c1000: "50/60 Гц",
            },
          },
          {
            parameter: "Переріз фазного провідника (SF)",
            values: {
              c160: "144 мм²",
              c250: "144 мм²",
              c315: "144 мм²",
              c400: "144 мм²",
              c500: "500 мм²",
              c630: "500 мм²",
              c800: "600 мм²",
              c1000: "700 мм²",
            },
          },
          {
            parameter: "Переріз нульового провідника (SN)",
            values: {
              c160: "144 мм²",
              c250: "144 мм²",
              c315: "144 мм²",
              c400: "144 мм²",
              c500: "500 мм²",
              c630: "500 мм²",
              c800: "600 мм²",
              c1000: "700 мм²",
            },
          },
          {
            parameter: "Переріз шини заземлення (SH)",
            values: {
              c160: "200 мм²",
              c250: "200 мм²",
              c315: "200 мм²",
              c400: "200 мм²",
              c500: "350 мм²",
              c630: "350 мм²",
              c800: "350 мм²",
              c1000: "350 мм²",
            },
          },
          {
            parameter: "Переріз алюмінієвого корпусу (SPE)",
            values: {
              c160: "1083 мм²",
              c250: "1083 мм²",
              c315: "1083 мм²",
              c400: "1083 мм²",
              c500: "1200 мм²",
              c630: "1200 мм²",
              c800: "1200 мм²",
              c1000: "1200 мм²",
            },
          },
          {
            parameter: "Струм короткого замикання фази, 1 с (Icw)",
            values: {
              c160: "13 кА",
              c250: "13 кА",
              c315: "13 кА",
              c400: "13 кА",
              c500: "25 кА",
              c630: "25 кА",
              c800: "35 кА",
              c1000: "40 кА",
            },
          },
          {
            parameter: "Піковий витримуваний струм фази (Ipk)",
            values: {
              c160: "26 кА",
              c250: "26 кА",
              c315: "26 кА",
              c400: "26 кА",
              c500: "53 кА",
              c630: "53 кА",
              c800: "80 кА",
              c1000: "90 кА",
            },
          },
          {
            parameter: "Струм короткого замикання нуля, 1 с (Icw)",
            values: {
              c160: "8 кА",
              c250: "8 кА",
              c315: "8 кА",
              c400: "8 кА",
              c500: "15 кА",
              c630: "15 кА",
              c800: "22 кА",
              c1000: "24 кА",
            },
          },
          {
            parameter: "Піковий витримуваний струм нуля (Ipk)",
            values: {
              c160: "14 кА",
              c250: "16 кА",
              c315: "14 кА",
              c400: "14 кА",
              c500: "30 кА",
              c630: "30 кА",
              c800: "44 кА",
              c1000: "50 кА",
            },
          },
          {
            parameter: "Опір фази (R20)",
            values: {
              c160: "0,193 мОм/м",
              c250: "0,193 мОм/м",
              c315: "0,193 мОм/м",
              c400: "0,193 мОм/м",
              c500: "0,058 мОм/м",
              c630: "0,058 мОм/м",
              c800: "0,048 мОм/м",
              c1000: "0,041 мОм/м",
            },
          },
          {
            parameter: "Опір фази (R1)",
            values: {
              c160: "0,338 мОм/м",
              c250: "0,338 мОм/м",
              c315: "0,338 мОм/м",
              c400: "0,338 мОм/м",
              c500: "0,098 мОм/м",
              c630: "0,098 мОм/м",
              c800: "0,080 мОм/м",
              c1000: "0,045 мОм/м",
            },
          },
          {
            parameter: "Реактивний опір фази (X1)",
            values: {
              c160: "0,094 мОм/м",
              c250: "0,094 мОм/м",
              c315: "0,094 мОм/м",
              c400: "0,094 мОм/м",
              c500: "0,014 мОм/м",
              c630: "0,014 мОм/м",
              c800: "0,010 мОм/м",
              c1000: "0,007 мОм/м",
            },
          },
          {
            parameter: "Повний опір фази (Z1)",
            values: {
              c160: "0,351 мОм/м",
              c250: "0,351 мОм/м",
              c315: "0,351 мОм/м",
              c400: "0,351 мОм/м",
              c500: "0,099 мОм/м",
              c630: "0,099 мОм/м",
              c800: "0,080 мОм/м",
              c1000: "0,046 мОм/м",
            },
          },
          {
            parameter: "Матеріал провідника",
            values: {
              c160: "Алюміній (EC Grade)",
              c250: "Алюміній (EC Grade)",
              c315: "Алюміній (EC Grade)",
              c400: "Алюміній (EC Grade)",
              c500: "Алюміній (EC Grade)",
              c630: "Алюміній (EC Grade)",
              c800: "Алюміній (EC Grade)",
              c1000: "Алюміній (EC Grade)",
            },
          },
          {
            parameter: "Ступінь захисту",
            values: {
              c160: "IP50",
              c250: "IP50",
              c315: "IP50",
              c400: "IP50",
              c500: "IP50",
              c630: "IP50",
              c800: "IP50",
              c1000: "IP50",
            },
          },
          {
            parameter: "Стандартна довжина елемента",
            values: {
              c160: "4000 мм",
              c250: "4000 мм",
              c315: "4000 мм",
              c400: "4000 мм",
              c500: "4000 мм",
              c630: "4000 мм",
              c800: "4000 мм",
              c1000: "4000 мм",
            },
          },
          {
            parameter: "Момент затяжки з'єднання",
            values: {
              c160: "30 Нм",
              c250: "30 Нм",
              c315: "30 Нм",
              c400: "30 Нм",
              c500: "90 Нм",
              c630: "90 Нм",
              c800: "90 Нм",
              c1000: "90 Нм",
            },
          },
        ],
      },
      {
        id: "ggd-c",
        label: "GGD-C (Мідь)",
        columns: SPEC_COLUMNS_GGDC,
        rows: [
          {
            parameter: "Номінальний струм (In)",
            values: {
              c160: "160 А",
              c250: "250 А",
              c315: "315 А",
              c400: "400 А",
              c500: "500 А",
              c630: "630 А",
              c800: "800 А",
            },
          },
          {
            parameter: "Номінальна робоча напруга (Ue)",
            values: {
              c160: "1000 В",
              c250: "1000 В",
              c315: "1000 В",
              c400: "1000 В",
              c500: "1000 В",
              c630: "1000 В",
              c800: "1000 В",
            },
          },
          {
            parameter: "Ізоляційна напруга (Ui)",
            values: {
              c160: "1000 В",
              c250: "1000 В",
              c315: "1000 В",
              c400: "1000 В",
              c500: "1000 В",
              c630: "1000 В",
              c800: "1000 В",
            },
          },
          {
            parameter: "Частота (fn)",
            values: {
              c160: "50/60 Гц",
              c250: "50/60 Гц",
              c315: "50/60 Гц",
              c400: "50/60 Гц",
              c500: "50/60 Гц",
              c630: "50/60 Гц",
              c800: "50/60 Гц",
            },
          },
          {
            parameter: "Переріз фазного провідника (SF)",
            values: {
              c160: "144 мм²",
              c250: "144 мм²",
              c315: "144 мм²",
              c400: "144 мм²",
              c500: "250 мм²",
              c630: "250 мм²",
              c800: "400 мм²",
            },
          },
          {
            parameter: "Переріз нульового провідника (SN)",
            values: {
              c160: "144 мм²",
              c250: "144 мм²",
              c315: "144 мм²",
              c400: "144 мм²",
              c500: "250 мм²",
              c630: "250 мм²",
              c800: "400 мм²",
            },
          },
          {
            parameter: "Переріз шини заземлення (SH)",
            values: {
              c160: "200 мм²",
              c250: "200 мм²",
              c315: "200 мм²",
              c400: "200 мм²",
              c500: "200 мм²",
              c630: "200 мм²",
              c800: "200 мм²",
            },
          },
          {
            parameter: "Переріз алюмінієвого корпусу (SPE)",
            values: {
              c160: "1083 мм²",
              c250: "1083 мм²",
              c315: "1083 мм²",
              c400: "1083 мм²",
              c500: "1083 мм²",
              c630: "1083 мм²",
              c800: "1083 мм²",
            },
          },
          {
            parameter: "Струм короткого замикання фази, 1 с (Icw)",
            values: {
              c160: "20 кА",
              c250: "20 кА",
              c315: "20 кА",
              c400: "20 кА",
              c500: "25 кА",
              c630: "25 кА",
              c800: "35 кА",
            },
          },
          {
            parameter: "Піковий витримуваний струм фази (Ipk)",
            values: {
              c160: "44 кА",
              c250: "44 кА",
              c315: "44 кА",
              c400: "44 кА",
              c500: "53 кА",
              c630: "53 кА",
              c800: "74 кА",
            },
          },
          {
            parameter: "Струм короткого замикання нуля, 1 с (Icw)",
            values: {
              c160: "12 кА",
              c250: "12 кА",
              c315: "12 кА",
              c400: "12 кА",
              c500: "15 кА",
              c630: "15 кА",
              c800: "22 кА",
            },
          },
          {
            parameter: "Піковий витримуваний струм нуля (Ipk)",
            values: {
              c160: "24 кА",
              c250: "24 кА",
              c315: "24 кА",
              c400: "24 кА",
              c500: "30 кА",
              c630: "30 кА",
              c800: "44 кА",
            },
          },
          {
            parameter: "Опір фази (R20)",
            values: {
              c160: "0,105 мОм/м",
              c250: "0,105 мОм/м",
              c315: "0,105 мОм/м",
              c400: "0,105 мОм/м",
              c500: "0,072 мОм/м",
              c630: "0,072 мОм/м",
              c800: "0,045 мОм/м",
            },
          },
          {
            parameter: "Опір фази (R1)",
            values: {
              c160: "0,138 мОм/м",
              c250: "0,138 мОм/м",
              c315: "0,138 мОм/м",
              c400: "0,138 мОм/м",
              c500: "0,108 мОм/м",
              c630: "0,108 мОм/м",
              c800: "0,068 мОм/м",
            },
          },
          {
            parameter: "Реактивний опір фази (X1)",
            values: {
              c160: "0,021 мОм/м",
              c250: "0,021 мОм/м",
              c315: "0,021 мОм/м",
              c400: "0,021 мОм/м",
              c500: "0,018 мОм/м",
              c630: "0,018 мОм/м",
              c800: "0,010 мОм/м",
            },
          },
          {
            parameter: "Повний опір фази (Z1)",
            values: {
              c160: "0,139 мОм/м",
              c250: "0,139 мОм/м",
              c315: "0,139 мОм/м",
              c400: "0,165 мОм/м",
              c500: "0,136 мОм/м",
              c630: "0,136 мОм/м",
              c800: "0,080 мОм/м",
            },
          },
          {
            parameter: "Матеріал провідника",
            values: {
              c160: "Електролітична мідь (99.9%)",
              c250: "Електролітична мідь (99.9%)",
              c315: "Електролітична мідь (99.9%)",
              c400: "Електролітична мідь (99.9%)",
              c500: "Електролітична мідь (99.9%)",
              c630: "Електролітична мідь (99.9%)",
              c800: "Електролітична мідь (99.9%)",
            },
          },
          {
            parameter: "Ступінь захисту",
            values: {
              c160: "IP50",
              c250: "IP50",
              c315: "IP50",
              c400: "IP50",
              c500: "IP50",
              c630: "IP50",
              c800: "IP50",
            },
          },
          {
            parameter: "Стандартна довжина елемента",
            values: {
              c160: "4000 мм",
              c250: "4000 мм",
              c315: "4000 мм",
              c400: "4000 мм",
              c500: "4000 мм",
              c630: "4000 мм",
              c800: "4000 мм",
            },
          },
          {
            parameter: "Момент затяжки з'єднання",
            values: {
              c160: "60 Нм",
              c250: "60 Нм",
              c315: "60 Нм",
              c400: "60 Нм",
              c500: "60 Нм",
              c630: "60 Нм",
              c800: "60 Нм",
            },
          },
        ],
      },
    ],
    componentsEyebrow: "Компоненти системи",
    componentsHeadingPrefix: "Компоненти для",
    components: [
      {
        slug: "standard-length-element",
        name: "Стандартний елемент",
        orderCode:
          "GGD-A 201000 / 202000 / 203100 / 204100 / 205000 / 206000 / 208000 / 210000 · GGD-C 201000 / 202000 / 203000 / 204000 / 205000 / 206000 / 208000",
        description:
          "4000 мм елемент шинопроводу в алюмінієвому корпусі в конфігурації 3P+N+1/2 PE, з алюмінієвими (GGD-A, 160–1000 А) або мідними (GGD-C, 160–800 А) провідниками.",
        image: `${IMAGE_BASE}/components/ggd-standard-length-element.webp`,
        imageAlt: "Рендер стандартного елемента GGD",
      },
      {
        slug: "non-standard-length-element",
        name: "Ара боу елемент",
        orderCode:
          "GGD-A 201001 / 202001 / 203101 / 204101 / 205001 / 206001 / 208001 / 210001 · GGD-C 201001 / 202001 / 203001 / 204001 / 205001 / 206001 / 208001",
        description:
          "Елемент довільної довжини (400–3999 мм) для нестандартних трас; розміри X/Y вказуються при замовленні.",
        image: `${IMAGE_BASE}/components/ggd-non-standard-length-element.webp`,
        imageAlt: "Рендер ара боу елемента GGD",
      },
      {
        slug: "one-bolt-joint-set",
        name: "Одноболтовий комплект з'єднання",
        orderCode: "GGD-A 6135 · GGD-C 6135",
        description:
          "Моноблочний одноболтовий комплект з'єднання двох елементів шинопроводу; бічні та кришки з'єднання відновлюють захист IP55.",
        image: `${IMAGE_BASE}/components/ggd-one-bolt-joint-set.webp`,
        imageAlt: "Рендер одноболтового комплекту з'єднання GGD",
      },
      {
        slug: "horizontal-elbow-right",
        name: "Поворот 90° горизонтальний — правий",
        orderCode: "GGD-A 200102 / 200106 · GGD-C 200102",
        description:
          "Елемент зміни горизонтального напрямку на 90°; спеціальні кути 88°–179° доступні за запитом.",
        image: `${IMAGE_BASE}/components/ggd-horizontal-elbow-right.webp`,
        imageAlt: "Рендер правого горизонтального повороту GGD",
      },
      {
        slug: "horizontal-elbow-left",
        name: "Поворот 90° горизонтальний — лівий",
        orderCode: "GGD-A 200101 / 200105 · GGD-C 200101",
        description:
          "Елемент зміни горизонтального напрямку на 90°; спеціальні кути 88°–179° доступні за запитом.",
        image: `${IMAGE_BASE}/components/ggd-horizontal-elbow-left.webp`,
        imageAlt: "Рендер лівого горизонтального повороту GGD",
      },
      {
        slug: "vertical-elbow-right",
        name: "Поворот 90° вертикальний — правий",
        orderCode: "GGD-A 200104 / 200108 · GGD-C 200104",
        description:
          "Елемент зміни вертикального напрямку на 90°; спеціальні кути 88°–179° доступні за запитом.",
        image: `${IMAGE_BASE}/components/ggd-vertical-elbow-right.webp`,
        imageAlt: "Рендер правого вертикального повороту GGD",
      },
      {
        slug: "vertical-elbow-left",
        name: "Поворот 90° вертикальний — лівий",
        orderCode: "GGD-A 200103 / 200107 · GGD-C 200103",
        description:
          "Елемент зміни вертикального напрямку на 90°; спеціальні кути 88°–179° доступні за запитом.",
        image: `${IMAGE_BASE}/components/ggd-vertical-elbow-left.webp`,
        imageAlt: "Рендер лівого вертикального повороту GGD",
      },
      {
        slug: "t-element-right",
        name: "T-подібний елемент — правий",
        orderCode: "GGD-A 200111 / 200112 · GGD-C 200104",
        description:
          "T-подібний елемент для розгалуження лінії шинопроводу в третьому напрямку.",
        image: `${IMAGE_BASE}/components/ggd-t-element-right.webp`,
        imageAlt: "Рендер правого T-подібного елемента GGD",
      },
      {
        slug: "t-element-left",
        name: "T-подібний елемент — лівий",
        orderCode: "GGD-A 200109 / 200110 · GGD-C 200109",
        description:
          "T-подібний елемент для розгалуження лінії шинопроводу в третьому напрямку.",
        image: `${IMAGE_BASE}/components/ggd-t-element-left.webp`,
        imageAlt: "Рендер лівого T-подібного елемента GGD",
      },
      {
        slug: "mechanical-dilatation",
        name: "Механічний дилатаційний елемент",
        orderCode: "GGD-A 204009 / 210009 · GGD-C 204009",
        description:
          "Компенсує будівельні структурні рухи; встановлюється в точках структурного розширення.",
        image: `${IMAGE_BASE}/components/ggd-mechanical-dilatation.webp`,
        imageAlt: "Рендер механічного дилатаційного елемента GGD",
      },
      {
        slug: "horizontal-expansion",
        name: "Горизонтальний компенсаційний елемент",
        orderCode: "GGD-A 204011 / 210011 · GGD-C 204011",
        description:
          "Компенсує теплове розширення на довгих прямих трасах; рекомендовано приблизно кожні 40 м.",
        image: `${IMAGE_BASE}/components/ggd-horizontal-expansion.webp`,
        imageAlt:
          "Рендер горизонтального компенсаційного елемента GGD",
      },
      {
        slug: "vertical-expansion",
        name: "Вертикальний компенсаційний елемент",
        orderCode: "GGD-A 204010 / 210010 · GGD-C 204010",
        description: "Компенсує теплове розширення на довгих вертикальних трасах.",
        image: `${IMAGE_BASE}/components/ggd-vertical-expansion.webp`,
        imageAlt: "Рендер вертикального компенсаційного елемента GGD",
      },
      {
        slug: "switchboard-feed-right",
        name: "Ввідний модуль пано — правий",
        orderCode: "GGD-A 200030 / 200031 · GGD-C 200030",
        description:
          "Правий модуль підключення для живлення лінії шинопроводу безпосередньо від розподільного щита.",
        image: `${IMAGE_BASE}/components/ggd-switchboard-feed-right.webp`,
        imageAlt: "Рендер правого ввідного модуля пано GGD",
      },
      {
        slug: "switchboard-feed-left",
        name: "Ввідний модуль пано — лівий",
        orderCode: "GGD-A 200032 / 200033 · GGD-C 200030",
        description:
          "Лівий модуль підключення для живлення лінії шинопроводу безпосередньо від розподільного щита.",
        image: `${IMAGE_BASE}/components/ggd-switchboard-feed-left.webp`,
        imageAlt: "Рендер лівого ввідного модуля пано GGD",
      },
      {
        slug: "feed-unit-right",
        name: "Ввідний елемент — правий",
        orderCode: "GGD-A 200021 / 200023 · GGD-C 200021",
        description:
          "Правий ввідний елемент для живлення лінії шинопроводу; версія з вимикачем доступна за запитом.",
        image: `${IMAGE_BASE}/components/ggd-feed-unit-right.webp`,
        imageAlt: "Рендер правого ввідного елемента GGD",
      },
      {
        slug: "feed-unit-left",
        name: "Ввідний елемент — лівий",
        orderCode: "GGD-A 200020 / 200022 · GGD-C 200020",
        description:
          "Лівий ввідний елемент для живлення лінії шинопроводу; версія з вимикачем доступна за запитом.",
        image: `${IMAGE_BASE}/components/ggd-feed-unit-left.webp`,
        imageAlt: "Рендер лівого ввідного елемента GGD",
      },
      {
        slug: "centre-feed-unit",
        name: "Центральний ввідний елемент",
        orderCode: "GGD-A 200024 / 200025 · GGD-C 200024",
        description:
          "Живить лінію шинопроводу з проміжної точки; версія з вимикачем доступна за запитом.",
        image: `${IMAGE_BASE}/components/ggd-centre-feed-unit.webp`,
        imageAlt: "Рендер центрального ввідного елемента GGD",
      },
      {
        slug: "horizontal-offset-right",
        name: "Зміщення 90° горизонтальне — праве",
        orderCode: "GGD-A 200124 / 200128 · GGD-C 200124",
        description:
          "Зміщує трасу на паралельну горизонтальну вісь; розміри X/Y/Z вказуються при замовленні.",
        image: `${IMAGE_BASE}/components/ggd-horizontal-offset-right.webp`,
        imageAlt: "Рендер правого горизонтального зміщення GGD",
      },
      {
        slug: "horizontal-offset-left",
        name: "Зміщення 90° горизонтальне — ліве",
        orderCode: "GGD-A 200123 / 200127 · GGD-C 200123",
        description:
          "Зміщує трасу на паралельну горизонтальну вісь; розміри X/Y/Z вказуються при замовленні.",
        image: `${IMAGE_BASE}/components/ggd-horizontal-offset-left.webp`,
        imageAlt: "Рендер лівого горизонтального зміщення GGD",
      },
      {
        slug: "vertical-offset-right",
        name: "Зміщення 90° вертикальне — праве",
        orderCode: "GGD-A 200126 / 200130 · GGD-C 200126",
        description:
          "Зміщує трасу на паралельну вертикальну вісь; розміри X/Y/Z вказуються при замовленні.",
        image: `${IMAGE_BASE}/components/ggd-vertical-offset-right.webp`,
        imageAlt: "Рендер правого вертикального зміщення GGD",
      },
      {
        slug: "vertical-offset-left",
        name: "Зміщення 90° вертикальне — ліве",
        orderCode: "GGD-A 200125 / 200129 · GGD-C 200126",
        description:
          "Зміщує трасу на паралельну вертикальну вісь; розміри X/Y/Z вказуються при замовленні.",
        image: `${IMAGE_BASE}/components/ggd-vertical-offset-left.webp`,
        imageAlt: "Рендер лівого вертикального зміщення GGD",
      },
      {
        slug: "reduction-element",
        name: "Редукційний елемент",
        orderCode: "GGD-A RED01 / RED02",
        description:
          "Переходить між номінальними струмами (400–1000 А) в межах однієї лінії шинопроводу.",
        image: `${IMAGE_BASE}/components/ggd-reduction-element.webp`,
        imageAlt: "Технічне креслення редукційного елемента GGD",
      },
      {
        slug: "fire-barrier",
        name: "Протипожежний бар'єр",
        orderCode: "GGD-A 204006 / 210006 · GGD-C 208006",
        description:
          "Протипожежний елемент для проходів шинопроводу через вогнестійкі стіни та перекриття.",
        image: `${IMAGE_BASE}/components/ggd-fire-barrier.webp`,
        imageAlt: "Технічне креслення протипожежного бар'єру GGD",
      },
      {
        slug: "end-cap",
        name: "Заглушка",
        orderCode: "GGD 100028 (160–400 А) / 100029 (500–1000 А)",
        description: "Закриває відкритий кінець ввідного елемента в кінці лінії.",
        image: `${IMAGE_BASE}/components/ggd-end-cap.webp`,
        imageAlt: "Технічне креслення заглушки GGD",
      },
      {
        slug: "ip55-sticky-cover",
        name: "Липка кришка IP55",
        orderCode: "GGD 500002",
        description:
          "Липка кришка для герметизації невикористаних відгалужувальних вікон до IP55.",
        image: `${IMAGE_BASE}/components/ggd-ip55-sticky-cover.webp`,
        imageAlt: "Рендер липкої кришки IP55 GGD",
      },
      {
        slug: "ip55-outlet-cover",
        name: "Кришка виходу IP55",
        orderCode: "GGD 500003",
        description:
          "Кришка виходу, що відновлює захист IP55 у відкритому відгалужувальному вікні.",
        image: `${IMAGE_BASE}/components/ggd-ip55-outlet-cover.webp`,
        imageAlt: "Рендер кришки виходу IP55 GGD",
      },
      {
        slug: "fixing-hanger",
        name: "Підвіс для кріплення",
        orderCode:
          "GGD 010001 / 010004 (160–400 А) · GGD 020001 / 010005 (500–1000 А)",
        description:
          "Опорний підвіс для лінії шинопроводу; рекомендована відстань — 1500–2000 мм.",
        image: `${IMAGE_BASE}/components/ggd-fixing-hanger.webp`,
        imageAlt: "Рендер підвісу для кріплення GGD",
      },
      {
        slug: "vertical-riser-hanger",
        name: "Підвіс для вертикальних систем",
        orderCode: "GGD 010002 (160–400 А) / 010003 (500–1000 А)",
        description:
          "Пружинний підвіс для вертикальних ліній; один підвіс на кожен вертикальний вихід та кожні 150 кг шинопроводу, додатково до стандартних підвісів.",
        image: `${IMAGE_BASE}/components/ggd-vertical-riser-hanger.webp`,
        imageAlt: "Технічне креслення підвісу для вертикальних систем GGD",
      },
      {
        slug: "tap-off-box-nh",
        name: "Відгалужувальна коробка типу NH",
        orderCode: "GGD 400631 (25–80 А) / 401251 (25–125 А)",
        description:
          "Відгалужувальна коробка із запобіжниками NH для захищеного підключення підсхем від лінії шинопроводу.",
        image: `${IMAGE_BASE}/components/ggd-tap-off-box-nh.webp`,
        imageAlt: "Рендер відгалужувальної коробки NH GGD",
      },
      {
        slug: "tap-off-box-spb",
        name: "Відгалужувальна коробка типу SPB",
        orderCode: "GGD 401160 / 402500 / 404000 / 406300 (160–630 А)",
        description:
          "Відгалужувальна коробка із запобіжниками SPB для підключення підсхем більшого струму.",
        image: `${IMAGE_BASE}/components/ggd-tap-off-box-spb.webp`,
        imageAlt: "Рендер відгалужувальної коробки SPB GGD",
      },
      {
        slug: "tap-off-box-mcb",
        name: "Відгалужувальна коробка типу MCB",
        orderCode:
          "GGD 400630 (25–40 А) / 400632 (25–80 А) / 401252 (25–125 А)",
        description:
          "Відгалужувальна коробка типу MCB для захищеного підключення підсхем від лінії шинопроводу.",
        image: `${IMAGE_BASE}/components/ggd-tap-off-box-mcb.webp`,
        imageAlt: "Рендер відгалужувальної коробки MCB GGD",
      },
      {
        slug: "tap-off-box-mccb",
        name: "Відгалужувальна коробка типу MCCB",
        orderCode: "GGD 401253 / 401162 / 402502 / 404002 / 406302 (25–630 А)",
        description:
          "Відгалужувальна коробка типу MCCB для підключення підсхем більшого струму.",
        image: `${IMAGE_BASE}/components/ggd-tap-off-box-mccb.webp`,
        imageAlt: "Рендер відгалужувальної коробки MCCB GGD",
      },
    ],
    documentsTabLabel: "Документи",
    documents: [
      {
        title: "Каталог шинопровідних систем Gersan",
        description:
          "Повний каталог з усіма шинопровідними системами Gersan, включно з технічними даними GGD.",
        fileLabel: "PDF · 25,1 МБ",
        href: publicDocumentUrl("documents/busbar/gersan-busbar-systems-catalogue.pdf"),
        downloadLabel: "Завантажити каталог",
      },
      {
        title: "Інструкція з монтажу GGD",
        description:
          "Короткий довідник із з'єднання двох елементів шинопроводу GGD: вирівнювання, момент затяжки одноболтового з'єднання та закриття кришок з'єднання.",
        fileLabel: "PDF",
        href: `${IMAGE_BASE}/installation/ggd-busbar-installation-guide.pdf`,
        downloadLabel: "Завантажити інструкцію з монтажу",
      },
    ],
    requestQuoteHref: REQUEST_QUOTE_HREF,
    requestDocumentationHref: REQUEST_DOCUMENTATION_HREF,
  },
} as const satisfies BusbarSystemDetailByMarket;

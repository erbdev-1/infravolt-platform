import { publicDocumentUrl, publicMediaUrl } from "@/modules/storage/asset-url";

import type { EarthingHubContent } from "./types";

import type { MarketCode } from "@/modules/markets/types";

const IMAGE_BASE = publicMediaUrl("products/earthing-lightning");

// Same asset for both markets — see public/assets/documents/earthing-lightning/.
// Follows the existing busbar/g-bus convention
// (public/assets/documents/busbar/gersan-busbar-systems-catalogue.pdf),
// not the /downloads/ path floated during planning — that path doesn't
// exist anywhere else on the site.
export const EARTHING_CATALOGUE_PDF_HREF =
  publicDocumentUrl("documents/earthing-lightning/gersan-earthing-lightning-protection-catalogue-2026.pdf");

const EARTHING_HUB_CONTENT = {
  uk: {
    metadata: {
      title: "Earthing & Lightning Protection Systems | InfraVolt",
      description:
        "Engineered conductors, electrodes, clamps, earth bars and installation components for safe, durable and standards-aligned earthing and lightning protection systems.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      current: "Earthing & Lightning Protection",
    },
    backToHomeLabel: "Back to Home",
    hero: {
      title: "Earthing & Lightning Protection Systems",
      subtitle:
        "Complete earthing, lightning protection and equipotential bonding solutions for commercial, industrial and infrastructure projects.",
      description:
        "Engineered conductors, electrodes, clamps, earth bars and installation components for safe, durable and standards-aligned protection systems.",
      primaryAction: "Explore Product Families",
      videoLabel: "InfraVolt earthing and lightning protection systems overview",
    },
    downloadCatalogueAction: "Download PDF Catalogue",
    downloadCatalogueAccessibleName:
      "Download the 2026 Gersan Earthing and Lightning Protection catalogue PDF",
    downloadCatalogueMeta: "PDF · 2026 Catalogue",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Product-Specific Standards Referenced",
        value: ["IEC/EN 62561 Series", "IEC 62305", "BS 7430"],
      },
      {
        icon: "layers",
        label: "Materials",
        value: ["Copper", "Tinned Copper", "Galvanized Steel", "Aluminium", "Brass"],
      },
      {
        icon: "network",
        label: "System Scope",
        value: ["Earthing", "Lightning Protection", "Bonding", "Static & Ex-Proof"],
      },
      {
        icon: "clock",
        label: "Design Life",
        value: "10 years",
      },
    ],
    pathwaysHeading: "What are you installing?",
    pathways: [
      {
        id: "complete-earthing-systems",
        title: "Complete Earthing Systems",
        description:
          "Electrodes, conductors, connection clamps, ground enhancement material and inspection pits.",
      },
      {
        id: "external-lightning-protection",
        title: "External Lightning Protection",
        description:
          "Air termination rods, active lightning rods, mounting bases, down conductors and fixing components.",
      },
      {
        id: "equipotential-bonding",
        title: "Equipotential Bonding",
        description:
          "Copper, tinned copper and galvanized equipotential bars with test and disconnecting links.",
      },
      {
        id: "industrial-hazardous-grounding",
        title: "Industrial & Hazardous-Area Earthing",
        description:
          "Static discharge, tanker and aircraft earthing, heavy-duty clamps and Ex-proof solutions.",
      },
    ],
    categoriesHeading: "Product families",
    categoriesIntroduction:
      "Eight engineered product families covering earthing, lightning protection and equipotential bonding, built from the full Gersan earthing and lightning protection catalogue.",
    categories: [
      {
        slug: "lightning-protection",
        name: "Lightning Protection Products",
        description:
          "Air termination rods, active lightning rods, mounting bases and down-conductor fixing components for complete rooftop capture systems.",
        materials: "Copper · Aluminium · Galvanized Steel",
        familyCount: "4 product families",
        image: `${IMAGE_BASE}/lightning-protection/card/gty-700-copper-multiple-point.webp`,
        heroImage: `${IMAGE_BASE}/lightning-protection/card/gty-700-copper-multiple-point-hero.webp`,
        imageAlt: "Gersan copper multiple-point air termination rod",
        technicalSnapshot: [
          { icon: "shield", label: "Applicable Standards", value: ["IEC/EN 62561 Series", "IEC 62305"] },
          { icon: "layers", label: "Materials", value: ["Copper", "Aluminium", "Galvanized Steel"] },
          { icon: "network", label: "Applications", value: ["Roof", "Wall", "Ridge", "Pole Installations"] },
          {
            icon: "support",
            label: "Technical Support",
            value: ["Selection", "Technical Data", "Installation Guidance"],
          },
        ],
        families: [
          {
            name: "Active Lightning Rod & Mounting Material",
            description:
              "Active air termination rods, lightning strike counters, mounting poles, protective pipes, bases and fixing clamps.",
            id: "active-lightning-rod-mounting-material",
            image: `${IMAGE_BASE}/lightning-protection/family/active-lightning-rod-mounting-material.webp`,
            imageAlt: "Gersan active air termination rod",
          },
          {
            name: "Lightning Arrester",
            description:
              "Air termination rods in copper, aluminium, stainless steel and galvanized finishes, with chrome-nickel coated variants.",
            id: "lightning-arrester",
            image: `${IMAGE_BASE}/lightning-protection/family/lightning-arrester.webp`,
            imageAlt: "Gersan copper lightning arrester rods",
          },
          {
            name: "Lightning Arrester Base",
            description:
              "Mounting bases connecting air termination rods to roof, wall, ridge, tile and pole arrangements.",
            id: "lightning-arrester-base",
            image: `${IMAGE_BASE}/lightning-protection/family/lightning-arrester-base.webp`,
            imageAlt: "Gersan copper lightning arrester mounting base",
          },
          {
            name: "Down Conductor Clamps & Fixing Elements",
            description:
              "Down-conductor holder clamps, crochets and fixing elements for wall and roof installation.",
            id: "down-conductor-clamps-fixing-elements",
            image: `${IMAGE_BASE}/lightning-protection/family/down-conductor-clamps-fixing-elements.webp`,
            imageAlt: "Gersan copper down-conductor holder clamp",
          },
        ],
      },
      {
        slug: "earthing-electrodes-plates",
        name: "Earthing Electrodes & Plates",
        description:
          "Copper-bonded, copper and galvanized electrode and plate solutions designed to dissipate fault and lightning currents safely into the ground.",
        materials: "Copper · Copper-bonded Steel · Galvanized Steel",
        familyCount: "2 product families",
        image: `${IMAGE_BASE}/earthing-electrodes-plates/card/copper-earthing-electrodes.webp`,
        heroImage: `${IMAGE_BASE}/earthing-electrodes-plates/card/copper-earthing-electrodes-hero.webp`,
        imageAlt: "Gersan copper earthing electrodes",
        technicalSnapshot: [
          {
            icon: "shield",
            label: "Applicable Standards",
            value: ["IEC/EN 62561-2", "BS 7430", "IEEE 80"],
          },
          { icon: "layers", label: "Materials", value: ["Copper", "Copper-bonded Steel", "Galvanized Steel"] },
          {
            icon: "network",
            label: "Product Scope",
            value: ["Electrodes", "Couplings", "Plates", "Driving Accessories"],
          },
          {
            icon: "support",
            label: "Installation Support",
            value: ["Selection", "Spacing", "Earthing Layout Guidance"],
          },
        ],
        families: [
          {
            name: "Earthing Electrodes",
            description:
              "Earthing electrode and rod variants for driving fault and lightning currents into the ground.",
            id: "earthing-electrodes",
            image: `${IMAGE_BASE}/earthing-electrodes-plates/family/earthing-electrodes.webp`,
            imageAlt: "Gersan copper earthing electrode",
          },
          {
            name: "Earth Plate – Lattice Copper",
            description:
              "Lattice-type copper earth plates for shallow or space-constrained earthing installations.",
            id: "earth-plate-lattice-copper",
            image: `${IMAGE_BASE}/earthing-electrodes-plates/family/earth-plate-lattice-copper.webp`,
            imageAlt: "Gersan lattice-type copper earth plate",
          },
        ],
      },
      {
        slug: "conductors-tapes",
        name: "Conductors & Earthing Tapes",
        description:
          "Bare and insulated copper and aluminium conductors, galvanized wires and earthing tapes for above-ground and underground routing.",
        materials: "Copper · Aluminium · Galvanized Steel",
        familyCount: "5 product families",
        image: `${IMAGE_BASE}/conductors-tapes/card/bare-solid-copper-conductor-coil.webp`,
        heroImage: `${IMAGE_BASE}/conductors-tapes/card/bare-solid-copper-conductor-coil-hero.webp`,
        imageAlt: "Gersan bare solid copper conductor coil",
        technicalSnapshot: [
          {
            icon: "shield",
            label: "Applicable Standards",
            value: "IEC/EN 62561 Series",
          },
          { icon: "layers", label: "Materials", value: ["Copper", "Aluminium", "Galvanized Steel"] },
          {
            icon: "network",
            label: "Product Scope",
            value: ["Conductors", "Earthing Tapes", "Steel Wire Rope", "Flexible Bars"],
          },
          {
            icon: "support",
            label: "Technical Support",
            value: ["Selection", "Technical Data", "Installation Guidance"],
          },
        ],
        families: [
          {
            name: "Copper & Aluminium Conductor",
            description:
              "Insulated and non-insulated copper and aluminium conductors for above-ground and underground routing.",
            id: "copper-aluminium-conductor",
            image: `${IMAGE_BASE}/conductors-tapes/family/copper-aluminium-conductor.webp`,
            imageAlt: "Gersan bare solid copper conductor coil",
          },
          {
            name: "Galvanized Mono Wires & Stranded Conductor",
            description:
              "Galvanized mono wires and stranded conductor for earthing and bonding runs.",
            id: "galvanized-mono-wires-stranded-conductor",
            image: `${IMAGE_BASE}/conductors-tapes/family/galvanized-mono-wires-stranded-conductor.webp`,
            imageAlt: "Gersan galvanized mono wire coil",
          },
          {
            name: "Galvanized Earthing Tapes",
            description: "Galvanized earthing tapes for surface-mounted conductor runs.",
            id: "galvanized-earthing-tapes",
            image: `${IMAGE_BASE}/conductors-tapes/family/galvanized-earthing-tapes.webp`,
            imageAlt: "Gersan galvanized earthing tape strip",
          },
          {
            name: "Steel Wire Rope",
            description:
              "Steel wire rope and accessories for lightning protection down-conductor and tensioning applications.",
            id: "steel-wire-rope",
            image: `${IMAGE_BASE}/conductors-tapes/family/steel-wire-rope.webp`,
            imageAlt: "Gersan galvanized steel wire rope",
          },
          {
            name: "Flexible Bars",
            description:
              "Flexible copper bars for bonding connections across movement joints and enclosures.",
            id: "flexible-bars",
            image: `${IMAGE_BASE}/conductors-tapes/family/flexible-bars.webp`,
            imageAlt: "Gersan bare copper flexible bars",
          },
        ],
      },
      {
        slug: "clamps-connectors",
        name: "Clamps & Connectors",
        description:
          "Electrode, conductor, transition and test clamps engineered for reliable, standards-compliant bonding connections.",
        materials: "Copper · Tinned Copper · Galvanized Steel · Brass",
        familyCount: "9 product families",
        image: `${IMAGE_BASE}/clamps-connectors/card/gft-100-application.webp`,
        heroImage: `${IMAGE_BASE}/clamps-connectors/card/gft-100-application-hero.webp`,
        imageAlt: "Gersan copper electrode fixing clamp on a copper conductor",
        technicalSnapshot: [
          {
            icon: "shield",
            label: "Applicable Standards",
            value: "IEC/EN 62561 Series",
          },
          {
            icon: "layers",
            label: "Materials",
            value: ["Copper", "Tinned Copper", "Galvanized Steel", "Brass"],
          },
          {
            icon: "network",
            label: "Connection Scope",
            value: ["Electrodes", "Conductors", "Cable Trays", "Transitions"],
          },
          {
            icon: "support",
            label: "Technical Support",
            value: ["Selection", "Technical Data", "Installation Guidance"],
          },
        ],
        families: [
          {
            name: "Test Clamps",
            description:
              "Test clamps providing accessible disconnection points for earth resistance measurement.",
            id: "test-clamps",
            image: `${IMAGE_BASE}/clamps-connectors/family/test-clamps.webp`,
            imageAlt: "Gersan open-type copper test clamp",
          },
          {
            name: "Electrode Fixing Clamps",
            description: "Clamps connecting conductors directly to earthing electrodes.",
            id: "electrode-fixing-clamps",
            image: `${IMAGE_BASE}/clamps-connectors/family/electrode-fixing-clamps.webp`,
            imageAlt: "Gersan electrode fixing clamp, GFT series",
          },
          {
            name: "Cable Tray Fixing Clamps",
            description: "Fixing clamps bonding cable trays into the earthing system.",
            id: "cable-tray-fixing-clamps",
            image: `${IMAGE_BASE}/clamps-connectors/family/cable-tray-fixing-clamps.webp`,
            imageAlt: "Gersan cable tray fixing clamp family, GIT series",
          },
          {
            name: "Galvanized & Copper Fixing Clamps",
            description: "Fixing clamps for galvanized and copper conductor connections.",
            id: "galvanized-copper-fixing-clamps",
            image: `${IMAGE_BASE}/clamps-connectors/family/galvanized-copper-fixing-clamps.webp`,
            imageAlt: "Gersan galvanized vertical fixing connector",
          },
          {
            name: "Transition Clamps (Galvanized + Copper)",
            description: "Transition clamps connecting galvanized and copper conductors.",
            id: "transition-clamps-galvanized-copper",
            image: `${IMAGE_BASE}/clamps-connectors/family/transition-clamps-galvanized-copper.webp`,
            imageAlt: "Gersan galvanized-to-copper transition clamp",
          },
          {
            name: "Brass Connectors for Soldering",
            description: "Brass cable-joint sleeves for soldered conductor connections.",
            id: "brass-connectors-for-soldering",
            image: `${IMAGE_BASE}/clamps-connectors/family/brass-connectors-for-soldering.webp`,
            imageAlt: "Gersan brass connector for soldering",
          },
          {
            name: "Fixing Clamps (Deadend, U, H & C)",
            description: "Deadend, U, H and C-type fixing clamps for conductor termination.",
            id: "fixing-clamps-deadend-u-h-c",
            image: `${IMAGE_BASE}/clamps-connectors/family/fixing-clamps-deadend-u-h-c.webp`,
            imageAlt: "Gersan brass deadend fixing clamps",
          },
          {
            name: "Cable Lugs",
            description: "Cable lugs for terminating conductors at earth bars and equipment.",
            id: "cable-lugs",
            image: `${IMAGE_BASE}/clamps-connectors/family/cable-lugs.webp`,
            imageAlt: "Gersan cable lug family, GIP series",
          },
          {
            name: "Flat Bar Connector",
            description: "Flat bar connectors joining conductors to busbars and flat connections.",
            id: "flat-bar-connector",
            image: `${IMAGE_BASE}/clamps-connectors/family/flat-bar-connector.webp`,
            imageAlt: "Gersan horizontal flat bar connector",
          },
        ],
      },
      {
        slug: "equipotential-earth-bars",
        name: "Equipotential Earth Bars",
        description:
          "Copper, tinned copper and galvanized equipotential bars in single and double disconnecting-link configurations, with custom lengths available.",
        materials: "Copper · Tinned Copper · Galvanized Steel",
        familyCount: "1 product family",
        image: `${IMAGE_BASE}/equipotential-earth-bars/card/equal-potential-bar-copper-geb-t.webp`,
        heroImage: `${IMAGE_BASE}/equipotential-earth-bars/card/equal-potential-bar-copper-geb-t-hero.webp`,
        imageAlt: "Gersan copper equipotential earth bar, GEB-T series",
        technicalSnapshot: [
          {
            icon: "shield",
            label: "Applicable Standards",
            value: "IEC/EN 62561 Series",
          },
          { icon: "layers", label: "Materials", value: ["Copper", "Tinned Copper", "Galvanized Steel"] },
          {
            icon: "bond",
            label: "Bonding Applications",
            value: "Single & Double Disconnecting-Link Configurations",
          },
          {
            icon: "document",
            label: "Technical Documentation",
            value: ["Product Data", "Installation Guidance"],
          },
        ],
        families: [
          {
            name: "Equal Potential Bar",
            description:
              "Equipotential bars and accessories with single and double disconnecting-link configurations.",
            id: "equal-potential-bar",
            image: `${IMAGE_BASE}/equipotential-earth-bars/family/equal-potential-bar.webp`,
            imageAlt: "Gersan copper equipotential earth bar, GEB-T series",
          },
        ],
      },
      {
        slug: "exothermic-welding",
        name: "Exothermic Welding",
        description:
          "Moulds, welding powder and ignition equipment for permanent, low-resistance exothermic connections between conductors and electrodes.",
        materials: "Graphite Moulds · Copper Alloy Powder",
        familyCount: "1 product family",
        image: `${IMAGE_BASE}/exothermic-welding/card/thermoweld-step-4-ignite.webp`,
        heroImage: `${IMAGE_BASE}/exothermic-welding/card/thermoweld-step-4-ignite-hero.webp`,
        imageAlt: "Exothermic welding connection being made on a copper conductor",
        technicalSnapshot: [
          { icon: "weld", label: "System Type", value: "Exothermic (Thermoweld) Connection" },
          {
            icon: "network",
            label: "Connection Scope",
            value: ["Conductor-to-Conductor", "Conductor-to-Electrode"],
          },
          { icon: "bond", label: "Applications", value: ["Earthing", "Bonding", "Substation Connections"] },
          {
            icon: "support",
            label: "Installation Support",
            value: ["Mould Selection", "Technical Data", "Installation Guidance"],
          },
        ],
        families: [
          {
            name: "Thermoweld",
            description:
              "Exothermic welding moulds, welding powder and ignition equipment for permanent conductor-to-electrode connections.",
            id: "thermoveld",
            image: `${IMAGE_BASE}/exothermic-welding/family/thermoveld.webp`,
            imageAlt: "Gersan thermoweld mould cup",
          },
        ],
      },
      {
        slug: "inspection-ground-enhancement",
        name: "Inspection & Ground Enhancement",
        description:
          "Inspection pits, ground enhancement material and pipe-fixing components for accessible, low-resistance earthing installations.",
        materials: "Galvanized Steel · Plastic · Concrete",
        familyCount: "3 product families",
        image: `${IMAGE_BASE}/inspection-ground-enhancement/card/gte-300-p1-plastic-earthing-pit.webp`,
        heroImage: `${IMAGE_BASE}/inspection-ground-enhancement/card/gte-300-p1-plastic-earthing-pit-hero.webp`,
        imageAlt: "Gersan plastic earthing inspection pit",
        technicalSnapshot: [
          {
            icon: "network",
            label: "Product Scope",
            value: ["Inspection Pits", "Ground Enhancement Material", "Pipe Clamps"],
          },
          { icon: "layers", label: "Materials / Construction", value: ["Galvanized Steel", "Plastic", "Concrete"] },
          { icon: "bond", label: "Earthing Application", value: "Low-Resistance Earthing Access Points" },
          {
            icon: "support",
            label: "Technical Support",
            value: ["Selection", "Technical Data", "Installation Guidance"],
          },
        ],
        families: [
          {
            name: "Ground Enhancement Material",
            description:
              "Resistance-reducing backfill material improving earth resistance in poor soil conditions.",
            id: "ground-enhancement-material",
            image: `${IMAGE_BASE}/inspection-ground-enhancement/family/ground-enhancement-material.webp`,
            imageAlt: "Gersan GEM ground enhancement material bag",
          },
          {
            name: "Earthing Pits",
            description: "Inspection pits providing accessible test points for earthing installations.",
            id: "earthing-pits",
            image: `${IMAGE_BASE}/inspection-ground-enhancement/family/earthing-pits.webp`,
            imageAlt: "Gersan plastic earthing inspection pit",
          },
          {
            name: "Pipe Clamps & U-Bolts",
            description: "Pipe clamps and U-bolts for fixing conductors and equipment to pipework.",
            id: "pipe-clamps-u-bolts",
            image: `${IMAGE_BASE}/inspection-ground-enhancement/family/pipe-clamps-u-bolts.webp`,
            imageAlt: "Gersan single-ear pipe clamp",
          },
        ],
      },
      {
        slug: "static-ex-proof-grounding",
        name: "Static & Ex-Proof Earthing",
        description:
          "Static discharge receptacles, heavy-duty earthing clamps and Ex-proof earthing devices for hazardous-area, tanker and aircraft applications.",
        materials: "Bronze · Brass · Stainless Steel",
        familyCount: "2 product families",
        image: `${IMAGE_BASE}/static-ex-proof-grounding/card/gst-1-bronze-static-earth-receptacle.webp`,
        heroImage: `${IMAGE_BASE}/static-ex-proof-grounding/card/gst-1-bronze-static-earth-receptacle-hero.webp`,
        imageAlt: "Gersan bronze static earth discharge receptacle",
        technicalSnapshot: [
          { icon: "shield", label: "Standards", value: ["EN 60079-0", "EN 60079-1", "EN 60079-31"] },
          {
            icon: "hazard",
            label: "Classification",
            value: ["II 2G Ex d[ia] IIB T6 Gb", "II 2D Ex t[ia] IIIC Tmax 85°C Db", "IP65"],
          },
          { icon: "gauge", label: "Operating Conditions", value: ["AC 220/240V", "50Hz", "-20°C to +40°C"] },
          {
            icon: "clock",
            label: "Design Life",
            value: "10 years",
          },
        ],
        families: [
          {
            name: "Static Electric Earthing Equipment",
            description: "Static discharge clips, reels and plates for controlled static earthing.",
            id: "static-electric-earthing-equipment",
            image: `${IMAGE_BASE}/static-ex-proof-grounding/family/static-electric-earthing-equipment.webp`,
            imageAlt: "Gersan bronze static earth discharge receptacle",
          },
          {
            name: "Ex-Proof Earthing System",
            description:
              "Ex-proof earthing devices and connection schemes for hazardous-area installations.",
            id: "ex-proof-grounding-system",
            image: `${IMAGE_BASE}/static-ex-proof-grounding/family/ex-proof-grounding-system.webp`,
            imageAlt: "Gersan PTC.1000 Ex-proof earthing system",
          },
        ],
      },
    ],
    viewProducts: "View Products",
    guidanceHeading: "Engineering guidance",
    guidanceIntroduction:
      "Short technical context for teams specifying an earthing or lightning protection system.",
    guidance: [
      {
        title: "How an Earthing System Works",
        description:
          "How fault and lightning currents are safely conducted into the ground through electrodes, conductors and bonding connections.",
      },
      {
        title: "Selecting Conductor Materials",
        description:
          "How soil conditions, corrosion risk and dissimilar-metal contact influence the choice between copper, tinned copper and galvanized steel.",
      },
      {
        title: "Earthing Electrodes and Soil Conditions",
        description:
          "How electrode type, depth and soil resistivity affect earth resistance in practice.",
      },
      {
        title: "Equipotential Bonding Principles",
        description:
          "Why bonding all conductive parts to a common reference point is a core requirement, not an optional extra.",
      },
      {
        title: "Lightning Protection System Components",
        description:
          "How air termination, down-conductor and earth-termination systems work together as a complete lightning protection system.",
      },
      {
        title: "Inspection and Maintenance",
        description:
          "Why accessible test points and inspection pits matter for verifying an earthing system over its service life.",
      },
    ],
    principlesHeading: "Three principles of an effective earthing system",
    principles: [
      "Low and stable earth resistance",
      "Adequate current-carrying capacity",
      "Effective equipotential bonding",
    ],
    applicationsHeading: "Applications",
    applicationsIntroduction:
      "Earthing and lightning protection systems engineered for the demands of each project environment.",
    applications: [
      {
        id: "commercial-buildings",
        title: "Commercial Buildings",
        description:
          "Lightning protection, earthing electrodes and equipotential bonding for offices, retail and mixed-use developments.",
        image: `${IMAGE_BASE}/applications/earthing-application-commercial-buildings.webp`,
        imageAlt: "Commercial office towers at dusk",
      },
      {
        id: "industrial-facilities",
        title: "Industrial Facilities",
        description:
          "Earthing, bonding and lightning protection for production halls, process areas and technical plant rooms.",
        image: `${IMAGE_BASE}/applications/earthing-application-industrial-facilities.webp`,
        imageAlt: "Interior of an industrial production facility",
      },
      {
        id: "data-centres",
        title: "Data Centres",
        description:
          "Low-resistance earthing and equipotential bonding supporting sensitive electrical and IT infrastructure.",
        image: `${IMAGE_BASE}/applications/earthing-application-data-centres.webp`,
        imageAlt: "Data centre server hall aisle",
      },
      {
        id: "utilities-substations",
        title: "Utilities and Substations",
        description:
          "Copper-bonded electrodes, earth bars, test clamps and exothermic welding for substation earthing grids.",
        image: `${IMAGE_BASE}/applications/earthing-application-utilities-substations.webp`,
        imageAlt: "Utility pumping station with industrial motors and piping",
      },
      {
        id: "renewable-energy",
        title: "Renewable Energy",
        description:
          "Earthing and lightning protection for solar and wind installations exposed to open-field conditions.",
        image: `${IMAGE_BASE}/applications/earthing-application-renewable-energy.webp`,
        imageAlt: "Solar panel array with wind turbines in the background",
      },
      {
        id: "oil-gas-petrochemical",
        title: "Oil, Gas and Petrochemical",
        description:
          "Static earthing, Ex-proof earthing devices and corrosion-resistant earthing components for hazardous-area installations.",
        image: `${IMAGE_BASE}/applications/earthing-application-oil-gas-petrochemical.webp`,
        imageAlt: "Petrochemical tank farm with elevated pipe racks",
      },
      {
        id: "warehouses-logistics",
        title: "Warehouses and Logistics",
        description:
          "Earthing, bonding and lightning protection for large-span warehouse and distribution facilities.",
        image: `${IMAGE_BASE}/applications/earthing-application-warehouses-logistics.webp`,
        imageAlt: "Warehouse and logistics hall interior",
      },
      {
        id: "healthcare",
        title: "Healthcare",
        description:
          "Earthing and equipotential bonding for hospitals and clinical buildings with sensitive medical electrical systems.",
        image: `${IMAGE_BASE}/applications/earthing-application-healthcare.webp`,
        imageAlt: "Hospital corridor interior",
      },
    ],
    exploreApplicationMap: "Explore Application Map",
    applicationsPreviousLabel: "Show previous applications",
    applicationsNextLabel: "Show next applications",
    support: {
      eyebrow: "Project Support",
      title: "Engineering support for earthing and lightning protection projects",
      description:
        "From electrode selection to complete equipotential bonding schemes, our team supports specification, technical data and installation guidance.",
      action: "Request Technical Pack",
    },
    categoryDetail: {
      backLabel: "Back to Earthing & Lightning Protection",
      familiesHeading: "Product families in this category",
      familiesIntroduction:
        "Every family below is drawn from the full Gersan earthing and lightning protection catalogue.",
      familyViewProductsAction: "View products",
      familyTechnicalOnRequestAction: "Technical data on request",
      requestPackAction: "Request Technical Pack",
      requestPackDescription:
        "Get order codes, dimensions and weights for this product family.",
      variantsHeading: "Order codes & technical schedule",
      variantsIntroduction:
        "Every order code, stock code, dimension and weight below is drawn directly from the Gersan catalogue.",
      variantsAllMaterials: "All materials",
      variantsCountSuffix: "order codes",
      variantsColumnModel: "Model",
      variantsColumnStockCode: "Stock Code",
      variantsColumnMaterial: "Material",
      variantsColumnDimensions: "Dimensions",
      variantsColumnWeight: "Weight",
      variantsColumnAction: "Action",
      variantsColumnFamily: "Family",
      variantsColumnDescription: "Description",
      variantsMetaCodesLabel: "codes",
      variantsMetaFamiliesLabel: "product families",
      variantsSearchLabel: "Search order codes",
      variantsSearchPlaceholder: "Search product, code or material",
      variantsClearSearchAction: "Clear search",
      variantsMaterialFilterLabel: "Filter by material",
      variantsFiltersButtonLabel: "Filters",
      variantsFiltersDrawerTitle: "Filter by material",
      variantsFiltersClearAllAction: "Clear all",
      variantsFiltersRemoveAction: "Remove filter",
      variantsShowMoreAction: "Show more",
      variantsFiltersShowResultsAction: "Show",
      variantsFiltersCloseAction: "Close filters",
      variantsShowingLabel: "Showing",
      variantsOfLabel: "of",
      variantsDownloadCsvAction: "Download CSV",
      variantsDownloadAllCsvAction: "Download all as CSV",
      variantsCopyStockCodeAction: "Copy stock code",
      variantsCopiedLabel: "Copied",
      variantsNoResults: "No matching order codes",
      variantsMatchingCountSuffix: "matching codes",
      variantsNoRecordsForFamily: "No catalogue records are currently available for this product family.",
      enquiryHeading: "Enquiry list",
      enquiryAddAction: "Add to Enquiry",
      enquiryRemoveAction: "Remove from Enquiry",
      enquiryCountSuffix: "products selected",
      enquiryClearAction: "Clear list",
    },
  },
  ua: {
    metadata: {
      title: "Системи заземлення та блискавкозахисту | InfraVolt",
      description:
        "Інженерні провідники, електроди, клеми, шини заземлення та монтажні компоненти для безпечних, довговічних систем заземлення та блискавкозахисту, що відповідають стандартам.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      current: "Заземлення та блискавкозахист",
    },
    backToHomeLabel: "На головну",
    hero: {
      title: "Системи заземлення та блискавкозахисту",
      subtitle:
        "Комплексні рішення заземлення, блискавкозахисту та зрівнювання потенціалів для комерційних, промислових та інфраструктурних проєктів.",
      description:
        "Інженерні провідники, електроди, клеми, шини заземлення та монтажні компоненти для безпечних, довговічних систем захисту, що відповідають стандартам.",
      primaryAction: "Переглянути продуктові сімейства",
      videoLabel: "Огляд систем заземлення та блискавкозахисту InfraVolt",
    },
    downloadCatalogueAction: "Завантажити PDF каталог",
    downloadCatalogueAccessibleName:
      "Завантажити PDF каталог Gersan «Заземлення та блискавкозахист» 2026",
    downloadCatalogueMeta: "PDF · Каталог 2026",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Стандарти, зазначені для окремих продуктів",
        value: ["Серія IEC/EN 62561", "IEC 62305", "BS 7430"],
      },
      {
        icon: "layers",
        label: "Матеріали",
        value: ["Мідь", "Луджена мідь", "Оцинкована сталь", "Алюміній", "Латунь"],
      },
      {
        icon: "network",
        label: "Сфера застосування",
        value: ["Заземлення", "Блискавкозахист", "Зрівнювання потенціалів", "Статичне та Ex-proof"],
      },
      {
        icon: "clock",
        label: "Термін служби",
        value: "10 років",
      },
    ],
    pathwaysHeading: "Що ви монтуєте?",
    pathways: [
      {
        id: "complete-earthing-systems",
        title: "Комплексні системи заземлення",
        description:
          "Електроди, провідники, з'єднувальні клеми, матеріал для зниження опору заземлення та оглядові колодязі.",
      },
      {
        id: "external-lightning-protection",
        title: "Зовнішній блискавкозахист",
        description:
          "Стрижні уловлювання, активні блискавковідводи, монтажні основи, струмовідводи та кріпильні компоненти.",
      },
      {
        id: "equipotential-bonding",
        title: "Зрівнювання потенціалів",
        description:
          "Мідні, луджені мідні та оцинковані шини зрівнювання потенціалів з тестовими та роз'єднувальними перемичками.",
      },
      {
        id: "industrial-hazardous-grounding",
        title: "Промислове та вибухонебезпечне заземлення",
        description:
          "Статичне заземлення, заземлення цистерн та повітряних суден, важкі затискачі та Ex-proof рішення.",
      },
    ],
    categoriesHeading: "Продуктові сімейства",
    categoriesIntroduction:
      "Вісім інженерних продуктових сімейств для заземлення, блискавкозахисту та зрівнювання потенціалів, побудованих на основі повного каталогу заземлення та блискавкозахисту Gersan.",
    categories: [
      {
        slug: "lightning-protection",
        name: "Компоненти блискавкозахисту",
        description:
          "Стрижні уловлювання, активні блискавковідводи, монтажні основи та кріпильні компоненти струмовідводів для повних дахових систем уловлювання.",
        materials: "Мідь · Алюміній · Оцинкована сталь",
        familyCount: "4 продуктові сімейства",
        image: `${IMAGE_BASE}/lightning-protection/card/gty-700-copper-multiple-point.webp`,
        heroImage: `${IMAGE_BASE}/lightning-protection/card/gty-700-copper-multiple-point-hero.webp`,
        imageAlt: "Мідний багатоточковий стрижень уловлювання Gersan",
        technicalSnapshot: [
          { icon: "shield", label: "Застосовні стандарти", value: ["Серія IEC/EN 62561", "IEC 62305"] },
          { icon: "layers", label: "Матеріали", value: ["Мідь", "Алюміній", "Оцинкована сталь"] },
          { icon: "network", label: "Застосування", value: ["Дах", "Стіна", "Конік", "Монтаж на щоглі"] },
          {
            icon: "support",
            label: "Технічна підтримка",
            value: ["Підбір", "Технічні дані", "Підтримка монтажу"],
          },
        ],
        families: [
          {
            name: "Активний блискавковідвід та монтажні матеріали",
            description:
              "Активні блискавковідводи, лічильники ударів блискавки, монтажні щогли, захисні труби, основи та кріпильні клеми.",
            id: "active-lightning-rod-mounting-material",
            image: `${IMAGE_BASE}/lightning-protection/family/active-lightning-rod-mounting-material.webp`,
            imageAlt: "Активний стрижень уловлювання блискавки Gersan",
          },
          {
            name: "Стрижні уловлювання",
            description:
              "Стрижні уловлювання з міді, алюмінію, нержавіючої сталі та оцинкованого покриття, включно з хромонікельованими варіантами.",
            id: "lightning-arrester",
            image: `${IMAGE_BASE}/lightning-protection/family/lightning-arrester.webp`,
            imageAlt: "Мідні стрижні уловлювання блискавки Gersan",
          },
          {
            name: "Основи стрижнів уловлювання",
            description:
              "Монтажні основи, що з'єднують стрижні уловлювання з дахом, стіною, коником та щоглою.",
            id: "lightning-arrester-base",
            image: `${IMAGE_BASE}/lightning-protection/family/lightning-arrester-base.webp`,
            imageAlt: "Мідна монтажна основа стрижня уловлювання Gersan",
          },
          {
            name: "Клеми струмовідводу та кріпильні елементи",
            description:
              "Тримальні клеми струмовідводу, кронштейни та кріпильні елементи для монтажу на стіні та даху.",
            id: "down-conductor-clamps-fixing-elements",
            image: `${IMAGE_BASE}/lightning-protection/family/down-conductor-clamps-fixing-elements.webp`,
            imageAlt: "Мідна тримальна клема струмовідводу Gersan",
          },
        ],
      },
      {
        slug: "earthing-electrodes-plates",
        name: "Електроди та пластини заземлення",
        description:
          "Мідно-плаковані, мідні та оцинковані електроди й пластини, розроблені для безпечного відведення струмів короткого замикання та блискавки в землю.",
        materials: "Мідь · Мідно-плакована сталь · Оцинкована сталь",
        familyCount: "2 продуктові сімейства",
        image: `${IMAGE_BASE}/earthing-electrodes-plates/card/copper-earthing-electrodes.webp`,
        heroImage: `${IMAGE_BASE}/earthing-electrodes-plates/card/copper-earthing-electrodes-hero.webp`,
        imageAlt: "Мідні електроди заземлення Gersan",
        technicalSnapshot: [
          { icon: "shield", label: "Застосовні стандарти", value: ["IEC/EN 62561-2", "BS 7430", "IEEE 80"] },
          { icon: "layers", label: "Матеріали", value: ["Мідь", "Мідно-плакована сталь", "Оцинкована сталь"] },
          {
            icon: "network",
            label: "Асортимент продукції",
            value: ["Електроди", "Муфти", "Пластини", "Аксесуари для забивання"],
          },
          {
            icon: "support",
            label: "Підтримка монтажу",
            value: ["Підбір", "Відстані", "Схема заземлення"],
          },
        ],
        families: [
          {
            name: "Електроди заземлення",
            description:
              "Електроди та стрижні заземлення для відведення струмів короткого замикання та блискавки в землю.",
            id: "earthing-electrodes",
            image: `${IMAGE_BASE}/earthing-electrodes-plates/family/earthing-electrodes.webp`,
            imageAlt: "Мідний електрод заземлення Gersan",
          },
          {
            name: "Пластина заземлення – ґратчаста мідна",
            description:
              "Ґратчасті мідні пластини заземлення для неглибокого монтажу або обмеженого простору.",
            id: "earth-plate-lattice-copper",
            image: `${IMAGE_BASE}/earthing-electrodes-plates/family/earth-plate-lattice-copper.webp`,
            imageAlt: "Ґратчаста мідна пластина заземлення Gersan",
          },
        ],
      },
      {
        slug: "conductors-tapes",
        name: "Провідники та стрічки заземлення",
        description:
          "Голі та ізольовані мідні й алюмінієві провідники, оцинковані дроти та стрічки заземлення для надземної та підземної прокладки.",
        materials: "Мідь · Алюміній · Оцинкована сталь",
        familyCount: "5 продуктових сімейств",
        image: `${IMAGE_BASE}/conductors-tapes/card/bare-solid-copper-conductor-coil.webp`,
        heroImage: `${IMAGE_BASE}/conductors-tapes/card/bare-solid-copper-conductor-coil-hero.webp`,
        imageAlt: "Бухта голого суцільного мідного провідника Gersan",
        technicalSnapshot: [
          {
            icon: "shield",
            label: "Застосовні стандарти",
            value: "Серія IEC/EN 62561",
          },
          { icon: "layers", label: "Матеріали", value: ["Мідь", "Алюміній", "Оцинкована сталь"] },
          {
            icon: "network",
            label: "Асортимент продукції",
            value: ["Провідники", "Стрічки заземлення", "Сталевий трос", "Гнучкі шини"],
          },
          {
            icon: "support",
            label: "Технічна підтримка",
            value: ["Підбір", "Технічні дані", "Підтримка монтажу"],
          },
        ],
        families: [
          {
            name: "Мідний та алюмінієвий провідник",
            description:
              "Ізольовані та неізольовані мідні й алюмінієві провідники для надземної та підземної прокладки.",
            id: "copper-aluminium-conductor",
            image: `${IMAGE_BASE}/conductors-tapes/family/copper-aluminium-conductor.webp`,
            imageAlt: "Бухта голого суцільного мідного провідника Gersan",
          },
          {
            name: "Оцинковані моно-дроти та багатодротовий провідник",
            description: "Оцинковані моно-дроти та багатодротовий провідник для ліній заземлення та зрівнювання потенціалів.",
            id: "galvanized-mono-wires-stranded-conductor",
            image: `${IMAGE_BASE}/conductors-tapes/family/galvanized-mono-wires-stranded-conductor.webp`,
            imageAlt: "Бухта оцинкованого моно-дроту Gersan",
          },
          {
            name: "Оцинковані стрічки заземлення",
            description: "Оцинковані стрічки заземлення для прокладки провідника поверхневим монтажем.",
            id: "galvanized-earthing-tapes",
            image: `${IMAGE_BASE}/conductors-tapes/family/galvanized-earthing-tapes.webp`,
            imageAlt: "Оцинкована стрічка заземлення Gersan",
          },
          {
            name: "Сталевий трос",
            description:
              "Сталевий трос та аксесуари для струмовідводу блискавкозахисту та натяжних застосувань.",
            id: "steel-wire-rope",
            image: `${IMAGE_BASE}/conductors-tapes/family/steel-wire-rope.webp`,
            imageAlt: "Оцинкований сталевий трос Gersan",
          },
          {
            name: "Гнучкі шини",
            description:
              "Гнучкі мідні шини для з'єднань зрівнювання потенціалів через деформаційні шви та корпуси обладнання.",
            id: "flexible-bars",
            image: `${IMAGE_BASE}/conductors-tapes/family/flexible-bars.webp`,
            imageAlt: "Гнучкі мідні шини Gersan",
          },
        ],
      },
      {
        slug: "clamps-connectors",
        name: "Клеми та з'єднувачі",
        description:
          "Клеми для електродів, провідників, перехідні та тестові клеми, розроблені для надійних з'єднань зрівнювання потенціалів згідно зі стандартами.",
        materials: "Мідь · Луджена мідь · Оцинкована сталь · Латунь",
        familyCount: "9 продуктових сімейств",
        image: `${IMAGE_BASE}/clamps-connectors/card/gft-100-application.webp`,
        heroImage: `${IMAGE_BASE}/clamps-connectors/card/gft-100-application-hero.webp`,
        imageAlt: "Мідна затискна клема електрода на мідному провіднику Gersan",
        technicalSnapshot: [
          {
            icon: "shield",
            label: "Застосовні стандарти",
            value: "Серія IEC/EN 62561",
          },
          {
            icon: "layers",
            label: "Матеріали",
            value: ["Мідь", "Луджена мідь", "Оцинкована сталь", "Латунь"],
          },
          {
            icon: "network",
            label: "Сфера з'єднань",
            value: ["Електроди", "Провідники", "Кабельні лотки", "Перехідні з'єднання"],
          },
          {
            icon: "support",
            label: "Технічна підтримка",
            value: ["Підбір", "Технічні дані", "Підтримка монтажу"],
          },
        ],
        families: [
          {
            name: "Тестові клеми",
            description: "Тестові клеми, що забезпечують доступні точки роз'єднання для вимірювання опору заземлення.",
            id: "test-clamps",
            image: `${IMAGE_BASE}/clamps-connectors/family/test-clamps.webp`,
            imageAlt: "Відкрита мідна тестова клема Gersan",
          },
          {
            name: "Клеми кріплення електрода",
            description: "Клеми, що з'єднують провідники безпосередньо з електродами заземлення.",
            id: "electrode-fixing-clamps",
            image: `${IMAGE_BASE}/clamps-connectors/family/electrode-fixing-clamps.webp`,
            imageAlt: "Клема кріплення електрода Gersan, серія GFT",
          },
          {
            name: "Клеми кріплення кабельних лотків",
            description: "Кріпильні клеми, що приєднують кабельні лотки до системи заземлення.",
            id: "cable-tray-fixing-clamps",
            image: `${IMAGE_BASE}/clamps-connectors/family/cable-tray-fixing-clamps.webp`,
            imageAlt: "Родина клем кріплення кабельних лотків Gersan, серія GIT",
          },
          {
            name: "Оцинковані та мідні кріпильні клеми",
            description: "Кріпильні клеми для з'єднань оцинкованого та мідного провідника.",
            id: "galvanized-copper-fixing-clamps",
            image: `${IMAGE_BASE}/clamps-connectors/family/galvanized-copper-fixing-clamps.webp`,
            imageAlt: "Оцинкований вертикальний кріпильний з'єднувач Gersan",
          },
          {
            name: "Перехідні клеми (оцинковані + мідні)",
            description: "Перехідні клеми, що з'єднують оцинкований та мідний провідник.",
            id: "transition-clamps-galvanized-copper",
            image: `${IMAGE_BASE}/clamps-connectors/family/transition-clamps-galvanized-copper.webp`,
            imageAlt: "Перехідна клема оцинк.-мідь Gersan",
          },
          {
            name: "Латунні з'єднувачі для пайки",
            description: "Латунні муфти для паяних з'єднань провідника.",
            id: "brass-connectors-for-soldering",
            image: `${IMAGE_BASE}/clamps-connectors/family/brass-connectors-for-soldering.webp`,
            imageAlt: "Латунний з'єднувач для паяння Gersan",
          },
          {
            name: "Кріпильні клеми (тирнаклі, U, H та C)",
            description: "Кріпильні клеми типу тирнаклі, U, H та C для завершення провідника.",
            id: "fixing-clamps-deadend-u-h-c",
            image: `${IMAGE_BASE}/clamps-connectors/family/fixing-clamps-deadend-u-h-c.webp`,
            imageAlt: "Латунні тупикові кріпильні клеми Gersan",
          },
          {
            name: "Кабельні наконечники",
            description: "Кабельні наконечники для завершення провідників на шинах заземлення та обладнанні.",
            id: "cable-lugs",
            image: `${IMAGE_BASE}/clamps-connectors/family/cable-lugs.webp`,
            imageAlt: "Родина кабельних наконечників Gersan, серія GIP",
          },
          {
            name: "Тримач плоскої шини",
            description: "Тримачі плоскої шини, що з'єднують провідники з шинопроводами та плоскими з'єднаннями.",
            id: "flat-bar-connector",
            image: `${IMAGE_BASE}/clamps-connectors/family/flat-bar-connector.webp`,
            imageAlt: "Горизонтальний з'єднувач плоскої шини Gersan",
          },
        ],
      },
      {
        slug: "equipotential-earth-bars",
        name: "Шини зрівнювання потенціалів",
        description:
          "Мідні, луджені мідні та оцинковані шини зрівнювання потенціалів з одинарними та подвійними роз'єднувальними перемичками, можливе виготовлення нестандартної довжини.",
        materials: "Мідь · Луджена мідь · Оцинкована сталь",
        familyCount: "1 продуктове сімейство",
        image: `${IMAGE_BASE}/equipotential-earth-bars/card/equal-potential-bar-copper-geb-t.webp`,
        heroImage: `${IMAGE_BASE}/equipotential-earth-bars/card/equal-potential-bar-copper-geb-t-hero.webp`,
        imageAlt: "Мідна шина зрівнювання потенціалів Gersan, серія GEB-T",
        technicalSnapshot: [
          {
            icon: "shield",
            label: "Застосовні стандарти",
            value: "Серія IEC/EN 62561",
          },
          { icon: "layers", label: "Матеріали", value: ["Мідь", "Луджена мідь", "Оцинкована сталь"] },
          {
            icon: "bond",
            label: "Застосування зрівнювання потенціалів",
            value: "Одинарна та подвійна конфігурація роз'єднувальних перемичок",
          },
          {
            icon: "document",
            label: "Технічна документація",
            value: ["Технічні дані", "Підтримка монтажу"],
          },
        ],
        families: [
          {
            name: "Шина зрівнювання потенціалів",
            description:
              "Шини зрівнювання потенціалів та аксесуари в одинарній та подвійній конфігурації роз'єднувальних перемичок.",
            id: "equal-potential-bar",
            image: `${IMAGE_BASE}/equipotential-earth-bars/family/equal-potential-bar.webp`,
            imageAlt: "Мідна еквіпотенціальна шина заземлення Gersan, серія GEB-T",
          },
        ],
      },
      {
        slug: "exothermic-welding",
        name: "Екзотермічне зварювання",
        description:
          "Форми, зварювальний порошок та обладнання для запалювання для постійних з'єднань з низьким опором між провідниками та електродами.",
        materials: "Графітові форми · Мідний сплавний порошок",
        familyCount: "1 продуктове сімейство",
        image: `${IMAGE_BASE}/exothermic-welding/card/thermoweld-step-4-ignite.webp`,
        heroImage: `${IMAGE_BASE}/exothermic-welding/card/thermoweld-step-4-ignite-hero.webp`,
        imageAlt: "Екзотермічне зварне з'єднання на мідному провіднику",
        technicalSnapshot: [
          { icon: "weld", label: "Тип системи", value: "Екзотермічне (термозварне) з'єднання" },
          {
            icon: "network",
            label: "Сфера з'єднань",
            value: ["Провідник-провідник", "Провідник-електрод"],
          },
          { icon: "bond", label: "Застосування", value: ["Заземлення", "Зрівнювання потенціалів", "З'єднання підстанцій"] },
          {
            icon: "support",
            label: "Підтримка монтажу",
            value: ["Підбір форми", "Технічні дані", "Підтримка монтажу"],
          },
        ],
        families: [
          {
            name: "Thermoweld",
            description:
              "Форми для екзотермічного зварювання, зварювальний порошок та обладнання для запалювання постійних з'єднань провідник-електрод.",
            id: "thermoveld",
            image: `${IMAGE_BASE}/exothermic-welding/family/thermoveld.webp`,
            imageAlt: "Тигель форми для термозварювання Gersan",
          },
        ],
      },
      {
        slug: "inspection-ground-enhancement",
        name: "Огляд та зниження опору заземлення",
        description:
          "Оглядові колодязі, матеріал для зниження опору заземлення та компоненти кріплення труб для доступних систем заземлення з низьким опором.",
        materials: "Оцинкована сталь · Пластик · Бетон",
        familyCount: "3 продуктові сімейства",
        image: `${IMAGE_BASE}/inspection-ground-enhancement/card/gte-300-p1-plastic-earthing-pit.webp`,
        heroImage: `${IMAGE_BASE}/inspection-ground-enhancement/card/gte-300-p1-plastic-earthing-pit-hero.webp`,
        imageAlt: "Пластиковий оглядовий колодязь заземлення Gersan",
        technicalSnapshot: [
          {
            icon: "network",
            label: "Асортимент продукції",
            value: ["Оглядові колодязі", "Матеріал для зниження опору", "Трубні хомути"],
          },
          { icon: "layers", label: "Матеріали / Конструкція", value: ["Оцинкована сталь", "Пластик", "Бетон"] },
          { icon: "bond", label: "Застосування заземлення", value: "Точки доступу для заземлення з низьким опором" },
          {
            icon: "support",
            label: "Технічна підтримка",
            value: ["Підбір", "Технічні дані", "Підтримка монтажу"],
          },
        ],
        families: [
          {
            name: "Матеріал для зниження опору заземлення",
            description:
              "Засипний матеріал, що знижує опір заземлення в умовах поганого ґрунту.",
            id: "ground-enhancement-material",
            image: `${IMAGE_BASE}/inspection-ground-enhancement/family/ground-enhancement-material.webp`,
            imageAlt: "Мішок матеріалу для покращення заземлення Gersan GEM",
          },
          {
            name: "Оглядові колодязі заземлення",
            description: "Оглядові колодязі, що забезпечують доступні точки тестування для систем заземлення.",
            id: "earthing-pits",
            image: `${IMAGE_BASE}/inspection-ground-enhancement/family/earthing-pits.webp`,
            imageAlt: "Пластиковий оглядовий колодязь заземлення Gersan",
          },
          {
            name: "Кроше для труб та U-подібні болти",
            description: "Кроше для труб та U-подібні болти для кріплення провідників та обладнання до трубопроводів.",
            id: "pipe-clamps-u-bolts",
            image: `${IMAGE_BASE}/inspection-ground-enhancement/family/pipe-clamps-u-bolts.webp`,
            imageAlt: "Одновухий трубний хомут Gersan",
          },
        ],
      },
      {
        slug: "static-ex-proof-grounding",
        name: "Статичне та Ex-proof заземлення",
        description:
          "Розетки статичного розряду, важкі затискачі заземлення та Ex-proof пристрої заземлення для вибухонебезпечних зон, цистерн та повітряних суден.",
        materials: "Бронза · Латунь · Нержавіюча сталь",
        familyCount: "2 продуктові сімейства",
        image: `${IMAGE_BASE}/static-ex-proof-grounding/card/gst-1-bronze-static-earth-receptacle.webp`,
        heroImage: `${IMAGE_BASE}/static-ex-proof-grounding/card/gst-1-bronze-static-earth-receptacle-hero.webp`,
        imageAlt: "Бронзова розетка статичного розряду заземлення Gersan",
        technicalSnapshot: [
          { icon: "shield", label: "Стандарти", value: ["EN 60079-0", "EN 60079-1", "EN 60079-31"] },
          {
            icon: "hazard",
            label: "Класифікація",
            value: ["II 2G Ex d[ia] IIB T6 Gb", "II 2D Ex t[ia] IIIC Tmax 85°C Db", "IP65"],
          },
          { icon: "gauge", label: "Умови експлуатації", value: ["AC 220/240В", "50Гц", "від -20°C до +40°C"] },
          {
            icon: "clock",
            label: "Термін служби",
            value: "10 років",
          },
        ],
        families: [
          {
            name: "Обладнання статичного заземлення",
            description: "Затискачі, котушки та пластини статичного розряду для контрольованого статичного заземлення.",
            id: "static-electric-earthing-equipment",
            image: `${IMAGE_BASE}/static-ex-proof-grounding/family/static-electric-earthing-equipment.webp`,
            imageAlt: "Бронзова розетка статичного розряду заземлення Gersan",
          },
          {
            name: "Система Ex-proof заземлення",
            description:
              "Пристрої Ex-proof заземлення та схеми з'єднання для вибухонебезпечних зон.",
            id: "ex-proof-grounding-system",
            image: `${IMAGE_BASE}/static-ex-proof-grounding/family/ex-proof-grounding-system.webp`,
            imageAlt: "Вибухозахищена система заземлення Gersan PTC.1000",
          },
        ],
      },
    ],
    viewProducts: "Переглянути продукцію",
    guidanceHeading: "Технічні рекомендації",
    guidanceIntroduction:
      "Короткий технічний контекст для команд, що проєктують систему заземлення або блискавкозахисту.",
    guidance: [
      {
        title: "Як працює система заземлення",
        description:
          "Як струми короткого замикання та блискавки безпечно відводяться в землю через електроди, провідники та з'єднання зрівнювання потенціалів.",
      },
      {
        title: "Вибір матеріалу провідників",
        description:
          "Як умови ґрунту, ризик корозії та контакт різнорідних металів впливають на вибір між міддю, лудженою міддю та оцинкованою сталлю.",
      },
      {
        title: "Електроди заземлення та умови ґрунту",
        description:
          "Як тип електрода, глибина занурення та питомий опір ґрунту впливають на опір заземлення на практиці.",
      },
      {
        title: "Принципи зрівнювання потенціалів",
        description:
          "Чому з'єднання всіх струмопровідних частин у спільній точці є основною, а не додатковою вимогою.",
      },
      {
        title: "Компоненти системи блискавкозахисту",
        description:
          "Як системи уловлювання, струмовідводу та заземлення працюють разом як повна система блискавкозахисту.",
      },
      {
        title: "Огляд та обслуговування",
        description:
          "Чому доступні точки тестування та оглядові колодязі важливі для перевірки системи заземлення протягом усього терміну служби.",
      },
    ],
    principlesHeading: "Три принципи ефективної системи заземлення",
    principles: [
      "Низький та стабільний опір заземлення",
      "Достатня струмонесуча здатність",
      "Ефективне зрівнювання потенціалів",
    ],
    applicationsHeading: "Застосування",
    applicationsIntroduction:
      "Системи заземлення та блискавкозахисту, розроблені відповідно до вимог кожного проєктного середовища.",
    applications: [
      {
        id: "commercial-buildings",
        title: "Комерційні будівлі",
        description:
          "Блискавкозахист, електроди заземлення та зрівнювання потенціалів для офісів, торгових та багатофункціональних об'єктів.",
        image: `${IMAGE_BASE}/applications/earthing-application-commercial-buildings.webp`,
        imageAlt: "Комерційні офісні вежі у сутінках",
      },
      {
        id: "industrial-facilities",
        title: "Промислові об'єкти",
        description:
          "Заземлення, зрівнювання потенціалів та блискавкозахист для виробничих цехів, технологічних зон та технічних приміщень.",
        image: `${IMAGE_BASE}/applications/earthing-application-industrial-facilities.webp`,
        imageAlt: "Інтер'єр промислового виробничого об'єкта",
      },
      {
        id: "data-centres",
        title: "Центри обробки даних",
        description:
          "Заземлення з низьким опором та зрівнювання потенціалів для чутливої електротехнічної та ІТ-інфраструктури.",
        image: `${IMAGE_BASE}/applications/earthing-application-data-centres.webp`,
        imageAlt: "Ряд серверних шаф у центрі обробки даних",
      },
      {
        id: "utilities-substations",
        title: "Інженерні мережі та підстанції",
        description:
          "Мідно-плаковані електроди, шини заземлення, тестові клеми та екзотермічне зварювання для контурів заземлення підстанцій.",
        image: `${IMAGE_BASE}/applications/earthing-application-utilities-substations.webp`,
        imageAlt: "Насосна станція з промисловими двигунами та трубопроводами",
      },
      {
        id: "renewable-energy",
        title: "Відновлювана енергетика",
        description:
          "Заземлення та блискавкозахист для сонячних та вітрових установок, розташованих на відкритій місцевості.",
        image: `${IMAGE_BASE}/applications/earthing-application-renewable-energy.webp`,
        imageAlt: "Сонячні панелі на тлі вітрових турбін",
      },
      {
        id: "oil-gas-petrochemical",
        title: "Нафтогазова та нафтохімічна галузь",
        description:
          "Статичне заземлення, Ex-proof пристрої заземлення та стійкі до корозії компоненти заземлення для вибухонебезпечних зон.",
        image: `${IMAGE_BASE}/applications/earthing-application-oil-gas-petrochemical.webp`,
        imageAlt: "Нафтохімічний резервуарний парк з піднятими трубопровідними естакадами",
      },
      {
        id: "warehouses-logistics",
        title: "Склади та логістика",
        description:
          "Заземлення, зрівнювання потенціалів та блискавкозахист для складських і логістичних об'єктів великого прольоту.",
        image: `${IMAGE_BASE}/applications/earthing-application-warehouses-logistics.webp`,
        imageAlt: "Інтер'єр складського та логістичного центру",
      },
      {
        id: "healthcare",
        title: "Охорона здоров'я",
        description:
          "Заземлення та зрівнювання потенціалів для лікарень і клінічних будівель з чутливими медичними електротехнічними системами.",
        image: `${IMAGE_BASE}/applications/earthing-application-healthcare.webp`,
        imageAlt: "Інтер'єр лікарняного коридору",
      },
    ],
    exploreApplicationMap: "Переглянути карту застосувань",
    applicationsPreviousLabel: "Показати попередні застосування",
    applicationsNextLabel: "Показати наступні застосування",
    support: {
      eyebrow: "Підтримка проєктів",
      title: "Технічна підтримка проєктів заземлення та блискавкозахисту",
      description:
        "Від вибору електродів до повних схем зрівнювання потенціалів — наша команда підтримує специфікацію, технічні дані та монтажні рекомендації.",
      action: "Запросити технічний пакет",
    },
    categoryDetail: {
      backLabel: "Назад до заземлення та блискавкозахисту",
      familiesHeading: "Продуктові сімейства цієї категорії",
      familiesIntroduction:
        "Кожне сімейство нижче взято з повного каталогу заземлення та блискавкозахисту Gersan.",
      familyViewProductsAction: "Переглянути продукцію",
      familyTechnicalOnRequestAction: "Технічні дані за запитом",
      requestPackAction: "Запросити технічний пакет",
      requestPackDescription:
        "Отримайте коди замовлення, розміри та вагу для цього продуктового сімейства.",
      variantsHeading: "Коди замовлення та технічний довідник",
      variantsIntroduction:
        "Кожен код замовлення, код складу, розмір та вага нижче взяті безпосередньо з каталогу Gersan.",
      variantsAllMaterials: "Усі матеріали",
      variantsCountSuffix: "кодів замовлення",
      variantsColumnModel: "Модель",
      variantsColumnStockCode: "Код складу",
      variantsColumnMaterial: "Матеріал",
      variantsColumnDimensions: "Розміри",
      variantsColumnWeight: "Вага",
      variantsColumnAction: "Дія",
      variantsColumnFamily: "Сімейство",
      variantsColumnDescription: "Опис",
      variantsMetaCodesLabel: "кодів",
      variantsMetaFamiliesLabel: "продуктових сімейств",
      variantsSearchLabel: "Пошук кодів замовлення",
      variantsSearchPlaceholder: "Пошук за товаром, кодом або матеріалом",
      variantsClearSearchAction: "Очистити пошук",
      variantsMaterialFilterLabel: "Фільтр за матеріалом",
      variantsFiltersButtonLabel: "Фільтри",
      variantsFiltersDrawerTitle: "Фільтр за матеріалом",
      variantsFiltersClearAllAction: "Очистити все",
      variantsFiltersRemoveAction: "Прибрати фільтр",
      variantsShowMoreAction: "Показати ще",
      variantsFiltersShowResultsAction: "Показати",
      variantsFiltersCloseAction: "Закрити фільтри",
      variantsShowingLabel: "Показано",
      variantsOfLabel: "з",
      variantsDownloadCsvAction: "Завантажити CSV",
      variantsDownloadAllCsvAction: "Завантажити все як CSV",
      variantsCopyStockCodeAction: "Копіювати код складу",
      variantsCopiedLabel: "Скопійовано",
      variantsNoResults: "Немає відповідних кодів замовлення",
      variantsMatchingCountSuffix: "відповідних кодів",
      variantsNoRecordsForFamily: "Наразі немає каталожних записів для цього продуктового сімейства.",
      enquiryHeading: "Список запиту",
      enquiryAddAction: "Додати до запиту",
      enquiryRemoveAction: "Прибрати із запиту",
      enquiryCountSuffix: "товарів обрано",
      enquiryClearAction: "Очистити список",
    },
  },
} as const satisfies Readonly<Record<MarketCode, EarthingHubContent>>;

export function earthingHubContentForMarket(market: MarketCode): EarthingHubContent {
  return EARTHING_HUB_CONTENT[market];
}

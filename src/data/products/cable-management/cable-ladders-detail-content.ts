import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { CableAccessoryDisplayGroup, CableManagementFamilyContent, CableManagementRelatedFamily } from "./types";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF, heavyDutyCableTraysH60ContentForMarket } from "./content";

// Not yet routed to a page (see cable-ladders-content.ts for the built
// macro page) — kept English/flat like the rest of this file until it's
// wired into an actual route and bilingualized together with it.
const HEAVY_DUTY_CABLE_TRAYS_H60_CONTENT = heavyDutyCableTraysH60ContentForMarket("uk");

const IMAGE_BASE = publicMediaUrl("products/cable-management");
const REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "cable-ladders",
  source: "/products/cable-support-systems",
});

// Real order-code datasets extracted from the Gersan catalogue's own
// per-series reports (catalog-source/cable-support/catalog-package/) — see
// variants/heavy-duty-cable-ladders.ts, variants/gcmc-concave-convex-ladder.ts
// and variants/cable-ladder-c-profile-rung.ts for the extraction notes.
// GMIE Type Cable Ladders has no dedicated, correctly-attributed report in
// the source package (the only "gmie"-titled report file in the catalogue
// package actually contains GCMC ladder rows, a source-side mislabeling —
// see the heavy-duty-cable-trays-gkt-ce revert note in content.ts), so this
// series intentionally has no variants entry and renders an honest empty
// schedule rather than reusing another series' data under its name.
const RELATED_LADDERS: readonly CableManagementRelatedFamily[] = [
  {
    slug: "cable-ladder-c-profile-rung",
    name: "Cable Ladder With C-Profile Rung",
    image: `${IMAGE_BASE}/cable-ladders/family/cable-ladder-c-profile-rung-card.png`,
    imageAlt: "Gersan cable ladder with C-profile rung, product photograph",
    orderCodeCount: 621,
    subtitle: "C-profile rung cable ladder and accessories",
    icon: "c-profile",
  },
  {
    slug: "heavy-duty-cable-ladders",
    name: "Heavy Duty Type Cable Ladders",
    image: `${IMAGE_BASE}/cable-ladders/family/heavy-duty-cable-ladders-card.png`,
    imageAlt: "Gersan heavy duty type cable ladder, product photograph",
    orderCodeCount: 455,
    subtitle: "High-capacity ladder for heavy cable loading",
    icon: "ladder",
  },
  {
    slug: "gcmc-concave-convex-ladder",
    name: "GCMC Concave-Convex Ladder and Covers",
    image: `${IMAGE_BASE}/cable-ladders/family/gcmc-concave-convex-ladder-covers-card.png`,
    imageAlt: "Gersan GCMC concave-convex cable ladder, product photograph",
    orderCodeCount: 382,
    subtitle: "Concave-convex ladder sections and covers",
    icon: "ladder",
  },
  {
    slug: "gmie-cable-ladders",
    name: "GMIE Type Cable Ladders",
    image: `${IMAGE_BASE}/cable-ladders/family/gmie-type-cable-ladders-card.png`,
    imageAlt: "Gersan GMIE type cable ladder, product photograph",
    orderCodeCount: 0,
    subtitle: "GMIE type cable ladder",
    icon: "ladder",
  },
];

const HEAVY_DUTY_LADDERS_ACCESSORY_DISPLAY_GROUPS: readonly CableAccessoryDisplayGroup[] = [
  { slug: "90-bends", label: "90° Bends", matches: ["90° Bends"] },
  { slug: "90-bend-covers", label: "90° Bend Covers", matches: ["90° Bend Covers"] },
  { slug: "tees", label: "Tees", matches: ["Tees"] },
  { slug: "tee-covers", label: "Tee Covers", matches: ["Tee Covers"] },
  { slug: "crossings", label: "Crossings", matches: ["Crossings"] },
  { slug: "crossing-covers", label: "Crossing Covers", matches: ["Crossing Covers"] },
  { slug: "internal-risers", label: "Internal Risers", matches: ["Internal Risers"] },
  { slug: "internal-riser-covers", label: "Internal Riser Covers", matches: ["Internal Riser Covers"] },
  { slug: "external-risers", label: "External Risers", matches: ["External Risers"] },
  { slug: "external-riser-covers", label: "External Riser Covers", matches: ["External Riser Covers"] },
  { slug: "135-bends", label: "135° Bends", matches: ["135° Bends"] },
  { slug: "135-bend-covers", label: "135° Bend Covers", matches: ["135° Bend Covers"] },
  { slug: "cable-crochets", label: "Cable Crochets", matches: ["Cable Crochets"] },
  { slug: "cable-holders", label: "Cable Holders", matches: ["Cable Holders"] },
  { slug: "fixing-units", label: "Fixing Units", matches: ["Fixing Units"] },
  { slug: "joint-elements", label: "Joint Elements", matches: ["Joint Elements"] },
  { slug: "cable-carriers", label: "Cable Carriers", matches: ["Cable Carriers"] },
  { slug: "dilatation-elements", label: "Dilatation Elements", matches: ["Dilatation Elements"] },
];

const GCMC_LADDER_ACCESSORY_DISPLAY_GROUPS: readonly CableAccessoryDisplayGroup[] = [
  { slug: "90-bends", label: "90° Bends", matches: ["90° Bends"] },
  { slug: "90-bend-covers", label: "90° Bend Covers", matches: ["90° Bend Covers"] },
  { slug: "tees", label: "Tees", matches: ["Tees"] },
  { slug: "tee-covers", label: "Tee Covers", matches: ["Tee Covers"] },
  { slug: "crossings", label: "Crossings", matches: ["Crossings"] },
  { slug: "crossing-covers", label: "Crossing Covers", matches: ["Crossing Covers"] },
  { slug: "135-bends", label: "135° Bends", matches: ["135° Bends"] },
  { slug: "135-bend-covers", label: "135° Bend Covers", matches: ["135° Bend Covers"] },
  { slug: "internal-risers", label: "Internal Risers", matches: ["Internal Risers"] },
  { slug: "internal-riser-covers", label: "Internal Riser Covers", matches: ["Internal Riser Covers"] },
  { slug: "external-risers", label: "External Risers", matches: ["External Risers"] },
  { slug: "external-riser-covers", label: "External Riser Covers", matches: ["External Riser Covers"] },
  { slug: "ladder-covers", label: "Ladder Covers", matches: ["Ladder Covers"] },
  { slug: "roofed-covers", label: "Roofed Covers", matches: ["Roofed Covers"] },
  { slug: "ventilated-covers", label: "Ventilated Covers", matches: ["Ventilated Covers"] },
  { slug: "cover-clamps", label: "Cover Clamps", matches: ["Cover Clamps"] },
  { slug: "fixing-elements", label: "Fixing Elements", matches: ["Fixing Elements"] },
  { slug: "joint-elements", label: "Joint Elements", matches: ["Joint Elements"] },
];

const C_PROFILE_RUNG_ACCESSORY_DISPLAY_GROUPS: readonly CableAccessoryDisplayGroup[] = [
  { slug: "90-bends", label: "90° Bends", matches: ["90° Bends"] },
  { slug: "90-bend-covers", label: "90° Bend Covers", matches: ["90° Bend Covers"] },
  { slug: "tees", label: "Tees", matches: ["Tees"] },
  { slug: "tee-covers", label: "Tee Covers", matches: ["Tee Covers"] },
  { slug: "crossings", label: "Crossings", matches: ["Crossings"] },
  { slug: "crossing-covers", label: "Crossing Covers", matches: ["Crossing Covers"] },
  { slug: "135-bends", label: "135° Bends", matches: ["135° Bends"] },
  { slug: "135-bend-covers", label: "135° Bend Covers", matches: ["135° Bend Covers"] },
  { slug: "internal-external-risers", label: "Internal-External Risers", matches: ["Internal-External Risers"] },
  { slug: "outlet-elements", label: "Outlet Elements", matches: ["Outlet Elements"] },
  { slug: "cable-crochets", label: "Cable Crochets", matches: ["Cable Crochets"] },
  { slug: "joint-elements", label: "Joint Elements", matches: ["Joint Elements"] },
];

export const HEAVY_DUTY_CABLE_LADDERS_CONTENT: CableManagementFamilyContent = {
  slug: "heavy-duty-cable-ladders",
  eyebrow: "Cable Management Systems",
  title: "Heavy Duty Type Cable Ladders",
  titleQualifier: "H = 70–200 mm",
  description:
    "Heavy-duty ladder construction for demanding industrial cable loads, h=70 to h=200 mm edge heights, with a full range of bends, tees, crossings, riser elements and covers in the same system.",
  image: `${IMAGE_BASE}/cable-ladders/family/heavy-duty-cable-ladders-transparent-card.png`,
  imageAlt: "Gersan heavy duty type cable ladder, product photograph",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Cable Management Systems" },
    { label: "Cable Ladders" },
    { label: "Heavy Duty Type Cable Ladders" },
  ],
  requestPackAction: "Request Technical Pack",
  requestPackHref: `${REQUEST_HREF}-heavy-duty`,
  catalogueDocument: {
    label: "Download PDF Catalogue",
    meta: "PDF Catalogue",
    href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
    accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
  },
  technicalSnapshot: [
    { icon: "shield", label: "Applicable Standards", value: ["BS EN 61537", "IEC 61537"] },
    { icon: "layers", label: "Material & Finish", value: ["Hot-Dip Galvanized Steel"] },
    {
      icon: "system",
      label: "Key Features",
      value: ["H=70–200 mm Edge Heights", "200–600 mm Width Range", "Full Accessory Range"],
    },
    {
      icon: "support",
      label: "Engineering Support",
      value: ["Load & Support Data", "Technical Drawings", "Custom Dimensions", "Installation Guidance"],
    },
  ],
  relatedFamiliesHeading: "Product series in this category",
  relatedFamilies: RELATED_LADDERS,
  scheduleHeading: "Order Codes & Technical Schedule",
  scheduleIntroduction:
    "Every model, stock code, dimension and weight below is drawn directly from the Gersan Cable Support catalogue.",
  standardLabel: "BS EN 61537",
  accessoriesHeading: "Compatible Accessories",
  accessoriesIntroduction: "Bends, tees, crossings, riser elements and covers from the same ladder system.",
  accessoryDisplayGroups: HEAVY_DUTY_LADDERS_ACCESSORY_DISPLAY_GROUPS,
  resourcesHeading: "Technical Resources",
  resources: HEAVY_DUTY_CABLE_TRAYS_H60_CONTENT.resources,
  supportHeading: "Need help selecting a cable ladder system?",
  supportDescription:
    "Get technical support with ladder sizing, load ratings, materials, finishes and project-specific configurations.",
  supportAction: "Request Technical Support",
  supportHref: `${REQUEST_HREF}-heavy-duty`,
};

export const GCMC_CONCAVE_CONVEX_LADDER_CONTENT: CableManagementFamilyContent = {
  slug: "gcmc-concave-convex-ladder",
  eyebrow: "Cable Management Systems",
  title: "GCMC Concave-Convex Ladder and Covers",
  titleQualifier: "H = 100–175 mm",
  description:
    "Concave and convex ladder sections with matching covers for level changes, h=100 to h=175 mm edge heights, with bends, tees, crossings, riser elements and a full cover range.",
  image: `${IMAGE_BASE}/cable-ladders/family/gcmc-concave-convex-ladder-covers-transparent-card.png`,
  imageAlt: "Gersan GCMC concave-convex cable ladder, product photograph",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Cable Management Systems" },
    { label: "Cable Ladders" },
    { label: "GCMC Concave-Convex Ladder and Covers" },
  ],
  requestPackAction: "Request Technical Pack",
  requestPackHref: `${REQUEST_HREF}-gcmc`,
  catalogueDocument: {
    label: "Download PDF Catalogue",
    meta: "PDF Catalogue",
    href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
    accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
  },
  technicalSnapshot: [
    { icon: "shield", label: "Applicable Standards", value: ["BS EN 61537", "IEC 61537"] },
    { icon: "layers", label: "Material & Finish", value: ["Hot-Dip Galvanized Steel"] },
    {
      icon: "system",
      label: "Key Features",
      value: ["H=100–175 mm Edge Heights", "Concave & Convex Sections", "Full Cover Range"],
    },
    {
      icon: "support",
      label: "Engineering Support",
      value: ["Load & Support Data", "Technical Drawings", "Custom Dimensions", "Installation Guidance"],
    },
  ],
  relatedFamiliesHeading: "Product series in this category",
  relatedFamilies: RELATED_LADDERS,
  scheduleHeading: "Order Codes & Technical Schedule",
  scheduleIntroduction:
    "Every model, stock code, dimension and weight below is drawn directly from the Gersan Cable Support catalogue.",
  standardLabel: "BS EN 61537",
  accessoriesHeading: "Compatible Accessories",
  accessoriesIntroduction: "Bends, tees, crossings, riser elements and covers from the same GCMC ladder system.",
  accessoryDisplayGroups: GCMC_LADDER_ACCESSORY_DISPLAY_GROUPS,
  resourcesHeading: "Technical Resources",
  resources: HEAVY_DUTY_CABLE_TRAYS_H60_CONTENT.resources,
  supportHeading: "Need help selecting a cable ladder system?",
  supportDescription:
    "Get technical support with ladder sizing, load ratings, materials, finishes and project-specific configurations.",
  supportAction: "Request Technical Support",
  supportHref: `${REQUEST_HREF}-gcmc`,
};

export const CABLE_LADDER_C_PROFILE_RUNG_CONTENT: CableManagementFamilyContent = {
  slug: "cable-ladder-c-profile-rung",
  eyebrow: "Cable Management Systems",
  title: "Cable Ladder With C-Profile Rung",
  titleQualifier: "H = 70–100 mm",
  description:
    "C-profile rung ladder system with a full range of directional accessories, h=70 and h=100 mm edge heights, with bends, tees, crossings and riser elements in the same system.",
  image: `${IMAGE_BASE}/cable-ladders/family/cable-ladder-c-profile-rung-transparent-card.png`,
  imageAlt: "Gersan cable ladder with C-profile rung, product photograph",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Cable Management Systems" },
    { label: "Cable Ladders" },
    { label: "Cable Ladder With C-Profile Rung" },
  ],
  requestPackAction: "Request Technical Pack",
  requestPackHref: `${REQUEST_HREF}-c-profile-rung`,
  catalogueDocument: {
    label: "Download PDF Catalogue",
    meta: "PDF Catalogue",
    href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
    accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
  },
  technicalSnapshot: [
    { icon: "shield", label: "Applicable Standards", value: ["BS EN 61537", "IEC 61537"] },
    { icon: "layers", label: "Material & Finish", value: ["Hot-Dip Galvanized Steel"] },
    {
      icon: "system",
      label: "Key Features",
      value: ["H=70–100 mm Edge Heights", "C-Profile Rung", "Full Accessory Range"],
    },
    {
      icon: "support",
      label: "Engineering Support",
      value: ["Load & Support Data", "Technical Drawings", "Custom Dimensions", "Installation Guidance"],
    },
  ],
  relatedFamiliesHeading: "Product series in this category",
  relatedFamilies: RELATED_LADDERS,
  scheduleHeading: "Order Codes & Technical Schedule",
  scheduleIntroduction:
    "Every model, stock code, dimension and weight below is drawn directly from the Gersan Cable Support catalogue.",
  standardLabel: "BS EN 61537",
  accessoriesHeading: "Compatible Accessories",
  accessoriesIntroduction: "Bends, tees, crossings and riser elements from the same C-profile rung ladder system.",
  accessoryDisplayGroups: C_PROFILE_RUNG_ACCESSORY_DISPLAY_GROUPS,
  resourcesHeading: "Technical Resources",
  resources: HEAVY_DUTY_CABLE_TRAYS_H60_CONTENT.resources,
  supportHeading: "Need help selecting a cable ladder system?",
  supportDescription:
    "Get technical support with ladder sizing, load ratings, materials, finishes and project-specific configurations.",
  supportAction: "Request Technical Support",
  supportHref: `${REQUEST_HREF}-c-profile-rung`,
};

// GMIE Type Cable Ladders — no dedicated, correctly-attributed order-code
// report currently exists in the source catalogue package (see the header
// comment above), so this page intentionally has no variants entry in
// variants/index.ts and its schedule renders the standard, honest empty
// state rather than fabricated or borrowed rows.
const GMIE_CABLE_LADDERS_CONTENT: CableManagementFamilyContent = {
  slug: "gmie-cable-ladders",
  eyebrow: "Cable Management Systems",
  title: "GMIE Type Cable Ladders",
  titleQualifier: "",
  description: "GMIE-type ladder system with its accessory range.",
  image: `${IMAGE_BASE}/cable-ladders/family/gmie-type-cable-ladders-transparent-card.png`,
  imageAlt: "Gersan GMIE type cable ladder, product photograph",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Cable Management Systems" },
    { label: "Cable Ladders" },
    { label: "GMIE Type Cable Ladders" },
  ],
  requestPackAction: "Request Technical Pack",
  requestPackHref: `${REQUEST_HREF}-gmie`,
  catalogueDocument: {
    label: "Download PDF Catalogue",
    meta: "PDF Catalogue",
    href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
    accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
  },
  technicalSnapshot: [
    { icon: "shield", label: "Applicable Standards", value: ["BS EN 61537", "IEC 61537"] },
    { icon: "layers", label: "Material & Finish", value: ["Hot-Dip Galvanized Steel"] },
    { icon: "system", label: "Key Features", value: ["GMIE-Type Ladder System"] },
    {
      icon: "support",
      label: "Engineering Support",
      value: ["Load & Support Data", "Technical Drawings", "Custom Dimensions", "Installation Guidance"],
    },
  ],
  relatedFamiliesHeading: "Product series in this category",
  relatedFamilies: RELATED_LADDERS,
  scheduleHeading: "Order Codes & Technical Schedule",
  scheduleIntroduction: "The full order-code schedule for this series is being verified against the source catalogue.",
  standardLabel: "BS EN 61537",
  accessoriesHeading: "Compatible Accessories",
  accessoriesIntroduction: "",
  accessoryDisplayGroups: [],
  resourcesHeading: "Technical Resources",
  resources: HEAVY_DUTY_CABLE_TRAYS_H60_CONTENT.resources,
  supportHeading: "Need help selecting a cable ladder system?",
  supportDescription:
    "Get technical support with ladder sizing, load ratings, materials, finishes and project-specific configurations.",
  supportAction: "Request Technical Support",
  supportHref: `${REQUEST_HREF}-gmie`,
};

// Market-parameterized content factories (currently English-only; Ukraine copy
// will be added during the bilingualization pass)
export function heavyDutyCableLaddersContentForMarket(_market: MarketCode): CableManagementFamilyContent {
  return HEAVY_DUTY_CABLE_LADDERS_CONTENT;
}

export function gcmcConcaveConvexLadderContentForMarket(_market: MarketCode): CableManagementFamilyContent {
  return GCMC_CONCAVE_CONVEX_LADDER_CONTENT;
}

export function cableLatderCProfileRugContentForMarket(_market: MarketCode): CableManagementFamilyContent {
  return CABLE_LADDER_C_PROFILE_RUNG_CONTENT;
}

export function gmieCableLaddersContentForMarket(_market: MarketCode): CableManagementFamilyContent {
  return GMIE_CABLE_LADDERS_CONTENT;
}

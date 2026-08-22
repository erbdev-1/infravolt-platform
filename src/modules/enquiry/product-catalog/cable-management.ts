import { CABLE_MANAGEMENT_VARIANTS } from "@/data/products/cable-management/variants";
import { cableEnquiryItem } from "@/modules/enquiry/item-builders";

import type { EnquiryProductFamily } from "../product-catalog";

const FAMILY_LABELS: Readonly<Record<string, string>> = {
  "heavy-duty-cable-trays-h40": "Heavy Duty Cable Trays — H = 40 mm",
  "heavy-duty-cable-trays-h50": "Heavy Duty Cable Trays — H = 50 mm",
  "heavy-duty-cable-trays-h60": "Heavy Duty Cable Trays — H = 60 mm",
  "heavy-duty-cable-trays-h100": "Heavy Duty Cable Trays — H = 100 mm",
  "normal-type-cable-trays": "Normal Type Cable Trays",
  "strengthened-cable-trays-h40": "Strengthened Cable Trays — H = 40 mm",
  "strengthened-cable-trays-h50": "Strengthened Cable Trays — H = 50 mm",
  "strengthened-cable-trays-h60": "Strengthened Cable Trays — H = 60 mm",
  "strengthened-cable-trays-h100": "Strengthened Cable Trays — H = 100 mm",
  "cable-tray-clamping-lid": "Cable Tray With Clamping Lid",
  "pregalvanized-trunking-h50": "Pregalvanized Trunking — H = 50 mm",
  "pregalvanized-trunking-h75": "Pregalvanized Trunking — H = 75 mm",
  "pregalvanized-trunking-h100": "Pregalvanized Trunking — H = 100 mm",
  "pregalvanized-trunking-h150": "Pregalvanized Trunking — H = 150 mm",
  "marine-type-cable-trays": "Marine Type Cable Trays",
  "lighting-fixture-cable-trays": "Lighting Fixture Type Cable Trays",
  "aluminium-cable-trays-h70": "Aluminium Cable Trays — H = 70 mm",
  "aluminium-cable-trays-h100": "Aluminium Cable Trays — H = 100 mm",
  "cable-ladder-c-profile-rung": "Cable Ladder With C-Profile Rung",
  "heavy-duty-cable-ladders": "Heavy Duty Type Cable Ladders",
  "gcmc-concave-convex-ladder": "GCMC Concave-Convex Ladder and Covers",
  "npi-80-support-system": "NPI-80 Support System",
  "u-z-l-w-profile-hanging-systems": "U-Z-L-W Profile and Bracket Hanging Systems",
  "threaded-rod-tray-carriers": "Tray Carriers Used With Threaded Rods — Special Brackets",
  "c-profile-support-systems": "C Profile — Support and Mounting Elements",
  "threaded-rods-anchors-fixings": "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector",
  "screw-sets-threaded-rods-anchors": "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector",
  "emt-imc-rsc-conduit-systems": "EMT / IMC / RSC Conduit Systems",
  "socket-fuse-fixing-unit": "Socket and Fuse Fixing Unit on the Tray — Pipe System",
  "pipe-clamps": "Pipe Clamps — With Rubber Insulation, for Threaded Rods",
  "cover-cable-tray-cover-clamps": "Cover for Cable Tray and Cover Clamps",
  reducers: "Reducers",
  "separator-end-cap-level-direction-changer": "Separator, End Cap, Level Changer, Direction Changer",
  "aluminium-cable-cleats": "Aluminium Cable Cleats",
  "cable-crochets": "Cable Crochets (C Profile / Angle)",
  "granite-mounting-elements": "Granite Mounting Elements",
  "cable-drum-support-equipment": "Cable Drum Support Equipment",
  "mechanical-dilatation-element": "Mechanical Dilatation Element",
  "shaft-access-cover": "Shaft Access Cover",
};

const DIRECT_ROUTES = new Set([
  "heavy-duty-cable-trays-h60", "cable-ladder-c-profile-rung", "heavy-duty-cable-ladders",
  "gcmc-concave-convex-ladder", "npi-80-support-system", "u-z-l-w-profile-hanging-systems",
  "threaded-rod-tray-carriers", "c-profile-support-systems", "threaded-rods-anchors-fixings",
  "emt-imc-rsc-conduit-systems", "socket-fuse-fixing-unit", "pipe-clamps",
  "screw-sets-threaded-rods-anchors", "cover-cable-tray-cover-clamps", "reducers",
  "separator-end-cap-level-direction-changer", "aluminium-cable-cleats", "cable-crochets",
  "granite-mounting-elements", "cable-drum-support-equipment", "mechanical-dilatation-element",
  "shaft-access-cover",
]);

export function cableManagementFamilies(): readonly EnquiryProductFamily[] {
  return Object.entries(CABLE_MANAGEMENT_VARIANTS).flatMap(([slug, variants]) => {
    const label = FAMILY_LABELS[slug];
    if (!label) return [];
    const sourceRoute = DIRECT_ROUTES.has(slug) ? `/products/cable-support-systems/${slug}` : "/products/cable-support-systems";
    if (!variants?.length) {
      return [{
        value: slug,
        label,
        options: [],
        familyItem: {
          id: `cable-management:family:${slug}`,
          title: label,
          system: "cable-management" as const,
          categoryLabel: label,
          sourceRoute,
        },
      }];
    }
    return [{
      value: slug,
      label,
      options: variants.map((variant, index) => ({
        value: `${variant.stockCode}:${variant.model}:${index}`,
        label: variant.name,
        meta: `${variant.model} · ${variant.stockCode}`,
        item: cableEnquiryItem(slug, label, variant, sourceRoute),
      })),
    }];
  });
}


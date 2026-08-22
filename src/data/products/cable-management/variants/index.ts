import type { CableManagementFamilySlug, CableManagementVariant } from "../types";

import { ALUMINIUM_CABLE_TRAYS_H70_CORE_VARIANTS } from "./aluminium-cable-trays-h70-core";
import { ALUMINIUM_CABLE_TRAYS_H100_CORE_VARIANTS } from "./aluminium-cable-trays-h100-core";
import { ALUMINIUM_CABLE_TRAYS_SHARED_ACCESSORY_VARIANTS } from "./aluminium-cable-trays-shared-accessories";
import { CABLE_TRAY_CLAMPING_LID_VARIANTS } from "./cable-tray-clamping-lid";
import { CABLE_LADDER_C_PROFILE_RUNG_VARIANTS } from "./cable-ladder-c-profile-rung";
import { GCMC_CONCAVE_CONVEX_LADDER_VARIANTS } from "./gcmc-concave-convex-ladder";
import { HEAVY_DUTY_CABLE_LADDERS_VARIANTS } from "./heavy-duty-cable-ladders";
import { NPI_80_SUPPORT_SYSTEM_VARIANTS } from "./npi-80-destek-elemanlari";
import { U_Z_L_W_PROFILE_HANGING_SYSTEMS_VARIANTS } from "./u-z-l-w-profil-ve-konsol-aski-sistemleri";
import { THREADED_ROD_TRAY_CARRIERS_VARIANTS } from "./tijle-kanal-tasiyici-ozel-aski-sistemleri";
import { C_PROFILE_SUPPORT_SYSTEMS_VARIANTS } from "./c-profil-profil-destek-ve-baglanti-elemanlari";
import { SCREW_SETS_THREADED_RODS_ANCHORS_VARIANTS } from "./screw-sets-threaded-rods-anchors";
import { EMT_IMC_RSC_CONDUIT_SYSTEMS_VARIANTS } from "./emt-imc-rsc-conduit-systems";
import { SOCKET_FUSE_FIXING_UNIT_VARIANTS } from "./socket-fuse-fixing-unit";
import { PIPE_CLAMPS_VARIANTS } from "./pipe-clamps";
import { COVER_CABLE_TRAY_COVER_CLAMPS_VARIANTS } from "./cover-cable-tray-cover-clamps";
import { REDUCERS_VARIANTS } from "./reducers";
import { SEPARATOR_END_CAP_LEVEL_DIRECTION_CHANGER_VARIANTS } from "./separator-end-cap-level-direction-changer";
import { ALUMINIUM_CABLE_CLEATS_VARIANTS } from "./aluminium-cable-cleats";
import { CABLE_CROCHETS_VARIANTS } from "./cable-crochets";
import { GRANITE_MOUNTING_ELEMENTS_VARIANTS } from "./granite-mounting-elements";
import { CABLE_DRUM_SUPPORT_EQUIPMENT_VARIANTS } from "./cable-drum-support-equipment";
import { MECHANICAL_DILATATION_ELEMENT_VARIANTS } from "./mechanical-dilatation-element";
import { SHAFT_ACCESS_COVER_VARIANTS } from "./shaft-access-cover";
import { HEAVY_DUTY_CABLE_TRAYS_H40_VARIANTS } from "./heavy-duty-cable-trays-h40";
import { HEAVY_DUTY_CABLE_TRAYS_H50_VARIANTS } from "./heavy-duty-cable-trays-h50";
import { HEAVY_DUTY_CABLE_TRAYS_H60_VARIANTS } from "./heavy-duty-cable-trays-h60";
import { HEAVY_DUTY_CABLE_TRAYS_H100_VARIANTS } from "./heavy-duty-cable-trays-h100";
import { LIGHTING_FIXTURE_CABLE_TRAYS_BODY_VARIANTS } from "./lighting-fixture-cable-trays-body";
import { LIGHTING_FIXTURE_THREADED_ROD_ELEMENTS_VARIANTS } from "./lighting-fixture-threaded-rod-elements";
import { MARINE_TYPE_CABLE_TRAYS_VARIANTS } from "./marine-type-cable-trays";
import { NORMAL_TYPE_CABLE_TRAYS_VARIANTS } from "./normal-type-cable-trays";
import { PREGALVANIZED_TRUNKING_H50_VARIANTS } from "./pregalvanized-trunking-h50";
import { PREGALVANIZED_TRUNKING_H75_VARIANTS } from "./pregalvanized-trunking-h75";
import { PREGALVANIZED_TRUNKING_H100_VARIANTS } from "./pregalvanized-trunking-h100";
import { PREGALVANIZED_TRUNKING_H150_VARIANTS } from "./pregalvanized-trunking-h150";
import { STRENGTHENED_CABLE_TRAYS_H40_VARIANTS } from "./strengthened-cable-trays-h40";
import { STRENGTHENED_CABLE_TRAYS_H50_VARIANTS } from "./strengthened-cable-trays-h50";
import { STRENGTHENED_CABLE_TRAYS_H60_VARIANTS } from "./strengthened-cable-trays-h60";
import { STRENGTHENED_CABLE_TRAYS_H100_VARIANTS } from "./strengthened-cable-trays-h100";
import { WIRE_MESH_SYSTEMS_VARIANTS } from "./wire-mesh-systems";

// Only families with a real, fully-extracted order-code dataset have a
// non-empty entry here. The other real families referenced by
// RelatedFamilyCards (see content.ts) have real names/images/counts but no
// entry yet — adding one is: extract its product-data.csv the same way as
// h40/h50/h60, add the resulting file here, and its detail page + schedule
// will render automatically through the shared template
// (CableFamilyDetailPage). H=100mm and GKT-CE were previously registered
// with an empty array because their raw product-data.csv mixes bend-radius
// values into the thickness column for accessory rows. Both series' own
// *-report.md (in catalog-source/cable-support/catalog-package/) already
// separates the catalogue's raw X/Y/Z/weight values per row with a
// KATALOGDAN DOĞRULANDI verification status, so the two datasets below are
// extracted from that report instead of the raw CSV — `thicknessMm` is
// omitted (not fabricated) on any accessory row whose third dimension is a
// bend radius or 135°-bend depth rather than a material gauge; see the
// header comment in each variants file for the full extraction notes.
export const CABLE_MANAGEMENT_VARIANTS: Readonly<
  Partial<Record<CableManagementFamilySlug, readonly CableManagementVariant[]>>
> = {
  "heavy-duty-cable-trays-h40": HEAVY_DUTY_CABLE_TRAYS_H40_VARIANTS,
  "heavy-duty-cable-trays-h50": HEAVY_DUTY_CABLE_TRAYS_H50_VARIANTS,
  "heavy-duty-cable-trays-h60": HEAVY_DUTY_CABLE_TRAYS_H60_VARIANTS,
  "heavy-duty-cable-trays-h100": HEAVY_DUTY_CABLE_TRAYS_H100_VARIANTS,
  "normal-type-cable-trays": NORMAL_TYPE_CABLE_TRAYS_VARIANTS,
  "strengthened-cable-trays-h40": STRENGTHENED_CABLE_TRAYS_H40_VARIANTS,
  "strengthened-cable-trays-h50": STRENGTHENED_CABLE_TRAYS_H50_VARIANTS,
  "strengthened-cable-trays-h60": STRENGTHENED_CABLE_TRAYS_H60_VARIANTS,
  "strengthened-cable-trays-h100": STRENGTHENED_CABLE_TRAYS_H100_VARIANTS,
  "cable-tray-clamping-lid": CABLE_TRAY_CLAMPING_LID_VARIANTS,
  "pregalvanized-trunking-h50": PREGALVANIZED_TRUNKING_H50_VARIANTS,
  "pregalvanized-trunking-h75": PREGALVANIZED_TRUNKING_H75_VARIANTS,
  "pregalvanized-trunking-h100": PREGALVANIZED_TRUNKING_H100_VARIANTS,
  "pregalvanized-trunking-h150": PREGALVANIZED_TRUNKING_H150_VARIANTS,
  "marine-type-cable-trays": MARINE_TYPE_CABLE_TRAYS_VARIANTS,
  // Straight tray body (dedicated series file) + threaded-rod mounting
  // brackets (a real but separately-extracted accessory for this same
  // family, see lighting-fixture-threaded-rod-elements.ts) combined into
  // one dataset for the single "Lighting Fixture Type" tab.
  "lighting-fixture-cable-trays": [
    ...LIGHTING_FIXTURE_CABLE_TRAYS_BODY_VARIANTS,
    ...LIGHTING_FIXTURE_THREADED_ROD_ELEMENTS_VARIANTS,
  ],
  // Real GNM (h70) / GNM-A (h100) / GNM-B (h70) / GNM-C (h100) structural
  // sub-series (see aluminium-cable-trays-h70-core.ts) stay distinguishable
  // via their own Model codes in the schedule table rather than becoming
  // four separate tabs — only the two real edge heights (h70/h100) do.
  // Covers/separators/clamps aren't height-specific, so the same shared
  // set is included in both tabs.
  "aluminium-cable-trays-h70": [
    ...ALUMINIUM_CABLE_TRAYS_H70_CORE_VARIANTS,
    ...ALUMINIUM_CABLE_TRAYS_SHARED_ACCESSORY_VARIANTS,
  ],
  "aluminium-cable-trays-h100": [
    ...ALUMINIUM_CABLE_TRAYS_H100_CORE_VARIANTS,
    ...ALUMINIUM_CABLE_TRAYS_SHARED_ACCESSORY_VARIANTS,
  ],
  "cable-ladder-c-profile-rung": CABLE_LADDER_C_PROFILE_RUNG_VARIANTS,
  "heavy-duty-cable-ladders": HEAVY_DUTY_CABLE_LADDERS_VARIANTS,
  "gcmc-concave-convex-ladder": GCMC_CONCAVE_CONVEX_LADDER_VARIANTS,
  "npi-80-support-system": NPI_80_SUPPORT_SYSTEM_VARIANTS,
  "u-z-l-w-profile-hanging-systems": U_Z_L_W_PROFILE_HANGING_SYSTEMS_VARIANTS,
  "threaded-rod-tray-carriers": THREADED_ROD_TRAY_CARRIERS_VARIANTS,
  "c-profile-support-systems": C_PROFILE_SUPPORT_SYSTEMS_VARIANTS,
  // "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector" is
  // the same real catalogue series (civata-takimlari + aski-tijleri +
  // celik-dubeller + plastik-bant, 95 rows) referenced under two
  // navigation entry points — Support & Hanging Systems and Accessories &
  // Fixings — so both slugs share this one dataset rather than duplicating
  // it or inventing two different products.
  "threaded-rods-anchors-fixings": SCREW_SETS_THREADED_RODS_ANCHORS_VARIANTS,
  "screw-sets-threaded-rods-anchors": SCREW_SETS_THREADED_RODS_ANCHORS_VARIANTS,
  "emt-imc-rsc-conduit-systems": EMT_IMC_RSC_CONDUIT_SYSTEMS_VARIANTS,
  "socket-fuse-fixing-unit": SOCKET_FUSE_FIXING_UNIT_VARIANTS,
  "pipe-clamps": PIPE_CLAMPS_VARIANTS,
  "cover-cable-tray-cover-clamps": COVER_CABLE_TRAY_COVER_CLAMPS_VARIANTS,
  "reducers": REDUCERS_VARIANTS,
  "separator-end-cap-level-direction-changer": SEPARATOR_END_CAP_LEVEL_DIRECTION_CHANGER_VARIANTS,
  // No real order/stock codes exist in the catalogue for this series
  // (every row's verification_note states "Sipariş ve stok kodları
  // katalogda bulunamadı") — honest empty schedule, not fabricated codes.
  "aluminium-cable-cleats": ALUMINIUM_CABLE_CLEATS_VARIANTS,
  "cable-crochets": CABLE_CROCHETS_VARIANTS,
  "granite-mounting-elements": GRANITE_MOUNTING_ELEMENTS_VARIANTS,
  "cable-drum-support-equipment": CABLE_DRUM_SUPPORT_EQUIPMENT_VARIANTS,
  "mechanical-dilatation-element": MECHANICAL_DILATATION_ELEMENT_VARIANTS,
  "shaft-access-cover": SHAFT_ACCESS_COVER_VARIANTS,
  "wire-mesh-systems": WIRE_MESH_SYSTEMS_VARIANTS,
};

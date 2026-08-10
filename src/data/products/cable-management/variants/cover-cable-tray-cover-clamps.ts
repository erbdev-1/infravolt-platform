import type { CableManagementVariant } from "../types";

// Only real Cover for Cable Tray (GKT), Duct Type Roofed Cover (GKT SPC)
// and Cover Clamps (GKK / GKK-A) rows belong to this family. Crossing/
// Inside-Outside Vertical With Clamping Lid (GGDB/GGIB) already have their
// own correct family — cable-tray-clamping-lid.ts — and were duplicated
// here by mistake; Separator (Cable/Ladder) and End Cap rows belong to
// separator-end-cap-level-direction-changer.ts; GKK-B D is already correctly
// listed once, on that same Separator/End Cap page.
export const COVER_CABLE_TRAY_COVER_CLAMPS_VARIANTS: readonly CableManagementVariant[] = [
  { name: "Cover for Cable Tray", model: "GKT-5K D", stockCode: "1301005019140", material: "Aluminium", accessoryGroup: "Kablo Kanal Kapağı", widthMm: 53, heightMm: 9, thicknessMm: 1, weight: "0.550 Kg/m" },
  { name: "Cover for Cable Tray", model: "GKT-10K D", stockCode: "1301010019140", material: "Aluminium", accessoryGroup: "Kablo Kanal Kapağı", widthMm: 103, heightMm: 9, thicknessMm: 1, weight: "1.000 Kg/m" },
  { name: "Cover for Cable Tray", model: "GKT-20K D", stockCode: "1301020019140", material: "Aluminium", accessoryGroup: "Kablo Kanal Kapağı", widthMm: 203, heightMm: 9, thicknessMm: 1, weight: "1.700 Kg/m" },
  { name: "Cover for Cable Tray", model: "GKT-30K D", stockCode: "1301030019140", material: "Aluminium", accessoryGroup: "Kablo Kanal Kapağı", widthMm: 305, heightMm: 9, thicknessMm: 1, weight: "2.550 Kg/m" },
  { name: "Cover for Cable Tray", model: "GKT-30-2K D", stockCode: "1301030229140", material: "Aluminium", accessoryGroup: "Kablo Kanal Kapağı", widthMm: 305, heightMm: 9, thicknessMm: 1.5, weight: "3.800 Kg/m" },
  { name: "Cover for Cable Tray", model: "GKT-40K D", stockCode: "1301040029140", material: "Aluminium", accessoryGroup: "Kablo Kanal Kapağı", widthMm: 405, heightMm: 9, thicknessMm: 1.5, weight: "4.940 Kg/m" },
  { name: "Cover for Cable Tray", model: "D GKT-K D GKT-50K D", stockCode: "1301050029140", material: "Aluminium", accessoryGroup: "Kablo Kanal Kapağı", widthMm: 505, heightMm: 9, thicknessMm: 1.5, weight: "6.150 Kg/m" },
  { name: "Cover for Cable Tray", model: "GKT-5K-V D GKT-60K D", stockCode: "1301060029140", material: "Aluminium", accessoryGroup: "Kablo Kanal Kapağı", widthMm: 605, heightMm: 9, thicknessMm: 1.5, weight: "7.300 Kg/m" },
  { name: "Duct Type Roofed Cover", model: "GKT-10K SPC C D", stockCode: "1312001019140", material: "Aluminium", accessoryGroup: "Kanal Tipi Çatılı Kapak", widthMm: 105, heightMm: 9, thicknessMm: 1, weight: "1.190 Kg/m" },
  { name: "Duct Type Roofed Cover", model: "GKT-20K SPC C D", stockCode: "1312002019140", material: "Aluminium", accessoryGroup: "Kanal Tipi Çatılı Kapak", widthMm: 205, heightMm: 9, thicknessMm: 1, weight: "1.860 Kg/m" },
  { name: "Duct Type Roofed Cover", model: "GKT-30K SPC C D", stockCode: "1312003019140", material: "Aluminium", accessoryGroup: "Kanal Tipi Çatılı Kapak", widthMm: 305, heightMm: 9, thicknessMm: 1, weight: "2.620 Kg/m" },
  { name: "Duct Type Roofed Cover", model: "A GKT-40K SPC C D", stockCode: "1312004039140", material: "Aluminium", accessoryGroup: "Kanal Tipi Çatılı Kapak", widthMm: 405, heightMm: 9, thicknessMm: 1.5, weight: "5.060 Kg/m" },
  { name: "Duct Type Roofed Cover", model: "GKT-50K SPC C D", stockCode: "1312005039140", material: "Aluminium", accessoryGroup: "Kanal Tipi Çatılı Kapak", widthMm: 505, heightMm: 9, thicknessMm: 1.5, weight: "6.210 Kg/m" },
  { name: "Duct Type Roofed Cover", model: "GKT-60K SPC C D", stockCode: "1312006039140", material: "Aluminium", accessoryGroup: "Kanal Tipi Çatılı Kapak", widthMm: 605, heightMm: 9, thicknessMm: 1.5, weight: "7.390 Kg/m" },
  { name: "Cover Clamps", model: "GKK-45 D", stockCode: "1303004539141", material: "Aluminium", accessoryGroup: "Kapak Kelepçeleri", widthMm: 45, heightMm: 2, thicknessMm: 0.055, weight: "300 Kg/pc" },
  { name: "Cover Clamps", model: "GKK-55 D", stockCode: "1303005539141", material: "Aluminium", accessoryGroup: "Kapak Kelepçeleri", widthMm: 55, heightMm: 2, weight: "0.060 Kg/pc" },
  { name: "Cover Clamps", model: "GKK-65 D", stockCode: "1303006539141", material: "Aluminium", accessoryGroup: "Kapak Kelepçeleri", widthMm: 65, heightMm: 2, weight: "0.065 Kg/pc" },
  { name: "Cover Clamps", model: "GKK-75 D", stockCode: "1303007539141", material: "Aluminium", accessoryGroup: "Kapak Kelepçeleri", widthMm: 75, heightMm: 2, weight: "0.070 Kg/pc" },
  { name: "Cover Clamps", model: "GKK- D GKK-105 D", stockCode: "1303010539141", material: "Aluminium", accessoryGroup: "Kapak Kelepçeleri", widthMm: 105, heightMm: 2, weight: "0.075 Kg/pc" },
  { name: "Cover Clamps", model: "GKK-A45 D", stockCode: "1302004539141", material: "Aluminium", accessoryGroup: "Kapak Kelepçeleri", widthMm: 45, heightMm: 2, thicknessMm: 0.045, weight: "300 Kg/pc" },
  { name: "Cover Clamps", model: "GKK-A55 D", stockCode: "1302005539141", material: "Aluminium", accessoryGroup: "Kapak Kelepçeleri", widthMm: 55, heightMm: 2, thicknessMm: 0.05, weight: "150 Kg/pc" },
  { name: "Cover Clamps", model: "GKK-A65 D", stockCode: "1302006539141", material: "Aluminium", accessoryGroup: "Kapak Kelepçeleri", widthMm: 65, heightMm: 2, weight: "0.055 Kg/pc" },
  { name: "Cover Clamps", model: "GKK- A D GKK-A75 D", stockCode: "1302007539141", material: "Aluminium", accessoryGroup: "Kapak Kelepçeleri", widthMm: 75, heightMm: 2, weight: "0.060 Kg/pc" },
  { name: "Cover Clamps", model: "GKK-A105 D", stockCode: "1302010539141", material: "Aluminium", accessoryGroup: "Kapak Kelepçeleri", widthMm: 105, heightMm: 2, weight: "0.065 Kg/pc" },
];

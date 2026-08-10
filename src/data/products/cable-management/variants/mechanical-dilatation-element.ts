import type { CableManagementVariant } from "../types";

// GH-820/* D rows previously included here are Cover Clamps, not Mechanical
// Dilatation Elements — they already correctly live in
// separator-end-cap-level-direction-changer.ts (see its own "Cover Clamps"
// rows). Only the real G1-*EXP D expansion-joint elements belong to this
// family (10 rows).
export const MECHANICAL_DILATATION_ELEMENT_VARIANTS: readonly CableManagementVariant[] = [
  { name: "Mechanical Dilatation Element", model: "G1-40 EXP D", stockCode: "1310004039141", material: "Aluminium", accessoryGroup: "Mekanik Dilatasyon Elemanı", widthMm: 40, heightMm: 2, weight: "0.390 Kg/pc" },
  { name: "Mechanical Dilatation Element", model: "G1-50 EXP D", stockCode: "1310005039141", material: "Aluminium", accessoryGroup: "Mekanik Dilatasyon Elemanı", widthMm: 50, heightMm: 2, weight: "0.460 Kg/pc" },
  { name: "Mechanical Dilatation Element", model: "G1-60 EXP D", stockCode: "1310006039141", material: "Aluminium", accessoryGroup: "Mekanik Dilatasyon Elemanı", widthMm: 60, heightMm: 2, weight: "0.530 Kg/pc" },
  { name: "Mechanical Dilatation Element", model: "G1-70 EXP D", stockCode: "1310007039141", material: "Aluminium", accessoryGroup: "Mekanik Dilatasyon Elemanı", widthMm: 70, heightMm: 2, weight: "0.600 Kg/pc" },
  { name: "Mechanical Dilatation Element", model: "G1-100 EXP D", stockCode: "13100100039141", material: "Aluminium", accessoryGroup: "Mekanik Dilatasyon Elemanı", widthMm: 100, heightMm: 2, weight: "0.800 Kg/pc" },
  { name: "Mechanical Dilatation Element", model: "G1-A40 EXP D", stockCode: "1310A04039140", material: "Aluminium", accessoryGroup: "Mekanik Dilatasyon Elemanı", widthMm: 46, heightMm: 2, weight: "0.520 Kg/pc" },
  { name: "Mechanical Dilatation Element", model: "G1-A50 EXP D", stockCode: "1310A05039140", material: "Aluminium", accessoryGroup: "Mekanik Dilatasyon Elemanı", widthMm: 56, heightMm: 2, weight: "0.590 Kg/pc" },
  { name: "Mechanical Dilatation Element", model: "G1-A60 EXP D", stockCode: "1310A06039140", material: "Aluminium", accessoryGroup: "Mekanik Dilatasyon Elemanı", widthMm: 66, heightMm: 2, weight: "0.660 Kg/pc" },
  { name: "Mechanical Dilatation Element", model: "G1-A70 EXP D", stockCode: "1310A07039140", material: "Aluminium", accessoryGroup: "Mekanik Dilatasyon Elemanı", widthMm: 76, heightMm: 2, weight: "0.730 Kg/pc" },
  { name: "Mechanical Dilatation Element", model: "G1-A100 EXP D", stockCode: "1310A100039140", material: "Aluminium", accessoryGroup: "Mekanik Dilatasyon Elemanı", widthMm: 106, heightMm: 2, weight: "0.930 Kg/pc" },
];

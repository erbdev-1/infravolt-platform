import type { CableManagementVariant } from "../types";

const TRAY_MATERIAL = "Hot-Dip Galvanised Steel / Wire";
const SUPPORT_MATERIAL = "Hot-Dip Galvanised Steel";

function tray(
  family: string,
  name: string,
  model: string,
  stockCode: string,
  widthMm: number,
  heightMm: number,
  weight: string,
): CableManagementVariant {
  return {
    family,
    name,
    model,
    stockCode,
    widthMm,
    heightMm,
    thicknessMm: 4,
    weight: `${weight} kg/m`,
    material: TRAY_MATERIAL,
    accessoryGroup: "Tray",
    productType: "Tray",
  };
}

function jointingPiece(model: string, stockCode: string, weight: string): CableManagementVariant {
  return {
    name: "Wire-Mesh Jointing Piece",
    model,
    stockCode,
    weight: `${weight} kg/unit`,
    material: SUPPORT_MATERIAL,
    accessoryGroup: "Jointing Piece",
    productType: "Jointing Piece",
  };
}

function supportConsole(
  model: string,
  stockCode: string,
  lengthMm: number,
  thicknessMm: number,
): CableManagementVariant {
  return {
    name: "Wire Cable Duct Support Console",
    model,
    stockCode,
    lengthMm,
    thicknessMm,
    material: SUPPORT_MATERIAL,
    accessoryGroup: "Support Console",
    productType: "Support Console",
  };
}

/**
 * Catalogue-backed Wire-Mesh Cable Tray range: 24 tray variants, three
 * jointing pieces and six GTKD support consoles. Tray weight is published
 * per metre; jointing-piece weight is published per unit. The catalogue
 * gives 1.5 mm for the three smaller GTKD consoles and 2 mm for the three
 * larger consoles; it does not publish a console weight in the supplied
 * schedule, so no weight is inferred for those rows.
 */
export const WIRE_MESH_SYSTEMS_VARIANTS = [
  tray("TTK", "Standard Wire-Mesh Cable Tray", "TTK-10 D", "1001010049140", 104, 55, "0.900"),
  tray("TTK", "Standard Wire-Mesh Cable Tray", "TTK-20 D", "1001020049140", 204, 55, "1.300"),
  tray("TTK", "Standard Wire-Mesh Cable Tray", "TTK-30 D", "1001030049140", 304, 55, "1.700"),
  tray("TTK", "Standard Wire-Mesh Cable Tray", "TTK-40 D", "1001040049140", 404, 55, "2.100"),
  tray("TTK", "Standard Wire-Mesh Cable Tray", "TTK-50 D", "1001050049140", 504, 55, "2.500"),
  tray("TTK", "Standard Wire-Mesh Cable Tray", "TTK-60 D", "1001060049140", 604, 55, "2.940"),

  tray("TTK-A", "Medium-Depth Wire-Mesh Cable Tray", "TTK-A10 D", "1001a10049140", 104, 60, "1.200"),
  tray("TTK-A", "Medium-Depth Wire-Mesh Cable Tray", "TTK-A20 D", "1001a20049140", 204, 60, "1.550"),
  tray("TTK-A", "Medium-Depth Wire-Mesh Cable Tray", "TTK-A30 D", "1001a30049140", 304, 60, "1.900"),
  tray("TTK-A", "Medium-Depth Wire-Mesh Cable Tray", "TTK-A40 D", "1001a40049140", 404, 60, "2.250"),
  tray("TTK-A", "Medium-Depth Wire-Mesh Cable Tray", "TTK-A50 D", "1001a50049140", 504, 60, "2.750"),
  tray("TTK-A", "Medium-Depth Wire-Mesh Cable Tray", "TTK-A60 D", "1001a60049140", 604, 60, "3.100"),

  tray("TTK-B", "Deep Wire-Mesh Cable Tray", "TTK-B10 D", "1001b10049140", 104, 88, "1.100"),
  tray("TTK-B", "Deep Wire-Mesh Cable Tray", "TTK-B20 D", "1001b20049140", 204, 88, "1.670"),
  tray("TTK-B", "Deep Wire-Mesh Cable Tray", "TTK-B30 D", "1001b30049140", 304, 88, "2.250"),
  tray("TTK-B", "Deep Wire-Mesh Cable Tray", "TTK-B40 D", "1001b40049140", 404, 88, "2.800"),
  tray("TTK-B", "Deep Wire-Mesh Cable Tray", "TTK-B50 D", "1001b50049140", 504, 88, "3.400"),
  tray("TTK-B", "Deep Wire-Mesh Cable Tray", "TTK-B60 D", "1001b60049140", 604, 88, "3.900"),

  tray("TTK-C", "High-Side Wire-Mesh Cable Tray", "TTK-C20 D", "1001C20049140", 204, 120, "1.800"),
  tray("TTK-C", "High-Side Wire-Mesh Cable Tray", "TTK-C30 D", "1001C30049140", 304, 120, "2.200"),
  tray("TTK-C", "High-Side Wire-Mesh Cable Tray", "TTK-C40 D", "1001C40049140", 404, 120, "2.600"),
  tray("TTK-C", "High-Side Wire-Mesh Cable Tray", "TTK-C50 D", "1001C50049140", 504, 120, "3.000"),
  tray("TTK-C", "High-Side Wire-Mesh Cable Tray", "TTK-C60 D", "1001C60049140", 604, 120, "3.400"),

  tray("TTK-L", "Narrow Wire-Mesh Cable Tray", "TTK-L D", "1002000149140", 85, 55, "0.650"),

  jointingPiece("TTK-MP D", "1002000229141", "0.070"),
  jointingPiece("TTK-P D", "1002000329141", "0.060"),
  jointingPiece("TTK-LP D", "1002000459141", "0.300"),

  supportConsole("GTKD-10 D", "0302T0109140", 140, 1.5),
  supportConsole("GTKD-20 D", "0302T0209140", 240, 1.5),
  supportConsole("GTKD-30 D", "0302T0309140", 340, 1.5),
  supportConsole("GTKD-40 D", "0302T0409140", 440, 2),
  supportConsole("GTKD-50 D", "0302T0509140", 540, 2),
  supportConsole("GTKD-60 D", "0302T0609140", 640, 2),
] as const satisfies readonly CableManagementVariant[];

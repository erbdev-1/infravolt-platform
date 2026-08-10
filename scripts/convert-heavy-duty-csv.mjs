#!/usr/bin/env node
// One-off converter: catalog-source product-data.csv -> CableManagementVariant[]
// TS file, mirroring the exact shape/style of
// src/data/products/cable-management/variants/heavy-duty-cable-trays-h60.ts.
// Usage: node scripts/convert-heavy-duty-csv.mjs <csv-path> <h-label e.g. H40>

import fs from "node:fs";

const [, , csvPath, hLabel] = process.argv;
if (!csvPath || !hLabel) {
  console.error("Usage: node convert-heavy-duty-csv.mjs <csv-path> <hLabel>");
  process.exit(1);
}

const ACCESSORY_GROUP_MAP = {
  "Heavy Duty Cable Tray": "Straight Cable Tray",
  "Non Perforated Heavy Duty Cable Tray with Cover": "Cable Tray with Cover",
  "Jointing Piece": "Jointing Piece",
  "90° Heavy Duty Flat Bend": "Flat Bend",
  "90° Heavy Duty Flat Bend Radius 300": "Flat Bend",
  "90° Heavy Duty Flat Bend Radius 450": "Flat Bend",
  "90° Heavy Duty Flat Bend Radius 600": "Flat Bend",
  "Radiused 90° Flat Bend": "Radiused Flat Bend",
  "135° Heavy Duty Flat Bend": "135° Flat Bend",
  "Heavy Duty Tee “T”": "Tee",
  "Heavy Duty Tee “T” Radius 300": "Tee",
  "Heavy Duty Tee “T” Radius 450": "Tee",
  "Heavy Duty Tee “T” Radius 600": "Tee",
  "Radiused Tee “T”": "Radiused Tee",
  "Heavy Duty Crossing": "Crossing",
  "Heavy Duty Crossing Radius 300": "Crossing",
  "Heavy Duty Crossing Radius 450": "Crossing",
  "Heavy Duty Crossing Radius 600": "Crossing",
  "Radiused Crossing Element": "Radiused Crossing",
  "Vertical Tee Center": "Vertical Tee",
  "Vertical Tee Wall": "Vertical Tee",
  "Radiused Inside Vertical Bend": "Inside Vertical Bend",
  "Radiused Outside Vertical Bend": "Outside Vertical Bend",
  "Heavy Duty Type Duct Middle Reducer": "Middle Reducer",
  "Heavy Duty Type Duct Middle Reducer Cover": "Middle Reducer Cover",
  "Heavy Duty Type Duct Right Reducer": "Right Reducer",
  "Heavy Duty Type Duct Right Reducer Cover": "Right Reducer Cover",
  "Heavy Duty Type Duct Left Reducer": "Left Reducer",
  "Heavy Duty Type Duct Left Reducer Cover": "Left Reducer Cover",
  "Heavy Duty Outside Vertical Bend": "Outside Vertical Bend",
  "Heavy Duty Outside Vertical Bend Cover": "Vertical Bend / Cover",
  "Heavy Duty Inside Vertical Bend": "Inside Vertical Bend",
  "Heavy Duty Inside Vertical Bend Cover": "Vertical Bend / Cover",
};

function parseCsvLine(line) {
  const fields = [];
  let idx = 0;
  while (idx <= line.length) {
    if (line[idx] === '"') {
      const end = line.indexOf('"', idx + 1);
      fields.push(line.slice(idx + 1, end));
      idx = end + 2;
    } else {
      let end = line.indexOf(",", idx);
      if (end === -1) end = line.length;
      fields.push(line.slice(idx, end));
      idx = end + 1;
    }
    if (idx > line.length) break;
  }
  return fields;
}

function turkishNumber(value) {
  if (!value) return undefined;
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : undefined;
}

const raw = fs.readFileSync(csvPath, "utf8");
const lines = raw.split(/\r?\n/).filter((l) => l.trim() !== "");
const rows = lines.slice(1).map(parseCsvLine);

const variants = rows.map((f) => {
  const productNameEn = f[4];
  const model = f[5];
  const stockCode = f[7];
  const material = f[10];
  const lengthMm = turkishNumber(f[15]);
  const widthMm = turkishNumber(f[16]);
  const heightMm = turkishNumber(f[17]);
  const thicknessMm = turkishNumber(f[18]);
  const weightValue = f[19];
  const weightUnit = f[20];

  const accessoryGroup = ACCESSORY_GROUP_MAP[productNameEn] ?? productNameEn;
  const materialEn = /galvaniz/i.test(material) ? "Steel, Hot-Dip Galvanized" : material;
  const weight = weightValue
    ? `${weightValue.replace(",", ".")} ${weightUnit.toLowerCase()}`
    : undefined;

  const parts = [
    `name: ${JSON.stringify(productNameEn)}`,
    `model: ${JSON.stringify(model)}`,
    `stockCode: ${JSON.stringify(stockCode)}`,
    `material: ${JSON.stringify(materialEn)}`,
    `accessoryGroup: ${JSON.stringify(accessoryGroup)}`,
  ];
  if (widthMm !== undefined) parts.push(`widthMm: ${widthMm}`);
  if (heightMm !== undefined) parts.push(`heightMm: ${heightMm}`);
  if (thicknessMm !== undefined) parts.push(`thicknessMm: ${thicknessMm}`);
  if (lengthMm !== undefined) parts.push(`lengthMm: ${lengthMm}`);
  if (weight !== undefined) parts.push(`weight: ${JSON.stringify(weight)}`);

  return `  { ${parts.join(", ")} },`;
});

const constName = `HEAVY_DUTY_CABLE_TRAYS_${hLabel.toUpperCase()}_VARIANTS`;
const out = `// Auto-generated from ${csvPath.replace(/\\/g, "/")} (${variants.length} verified\n// catalogue rows). Do not hand-edit — regenerate from the source CSV if the\n// catalogue changes.\nimport type { CableManagementVariant } from "../types";\n\nexport const ${constName}: readonly CableManagementVariant[] = [\n${variants.join("\n")}\n];\n`;

process.stdout.write(out);

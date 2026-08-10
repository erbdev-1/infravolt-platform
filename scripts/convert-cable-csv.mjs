#!/usr/bin/env node
// Reusable converter: catalog-source product-data.csv -> CableManagementVariant[]
// TS file, mirroring the exact shape/style established by
// src/data/products/cable-management/variants/heavy-duty-cable-trays-h60.ts.
// Generalizes what was scripts/convert-heavy-duty-csv.mjs (kept for that
// family's own history) so every Cable Trays & Trunking family can reuse
// the same conversion logic.
//
// Usage:
//   node scripts/convert-cable-csv.mjs <csv-path> <CONST_NAME> \
//     [--filter=<regex on model/product_name_en column, include-only>] \
//     [--exclude-names=<comma-separated exact product_name_en values to drop>] \
//     [--max-thickness=<mm>  drop rows whose z_mm exceeds this — real sheet\
//        gauge in this catalogue is always <5mm; anything bigger is almost\
//        always a width/radius value that leaked into the wrong column for\
//        that specific row (verified per-family with audit-cable-csv.mjs\
//        before using this flag — don't use it blindly)] \
//     [--height=<mm>  keep only rows whose y_mm equals this value — for\
//        splitting one product_name_en category into per-height tabs when\
//        the height isn't already encoded in the name itself] \
//     [--map=<path-to-json-file-of-{englishProductName: groupLabel}>]
//
// The CSV schema (Turkish catalogue export) is fixed across every
// cable-support product-data.csv: product_name_en is column 4 (0-indexed),
// model 5, stock_code 7, material 10, component_type (Turkish, not used —
// product_name_en is the English source of truth) 14, length_mm 15,
// x_mm (width) 16, y_mm (height) 17, z_mm (thickness) 18, weight_value 19,
// weight_unit 20 — see any file's header row.

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const [csvPath, constName] = positional;
const filterArg = args.find((a) => a.startsWith("--filter="));
const modelFilter = filterArg ? new RegExp(filterArg.slice("--filter=".length)) : null;
const excludeArg = args.find((a) => a.startsWith("--exclude-names="));
const excludeNames = excludeArg ? new Set(excludeArg.slice("--exclude-names=".length).split(",")) : null;
const maxThicknessArg = args.find((a) => a.startsWith("--max-thickness="));
const maxThickness = maxThicknessArg ? Number(maxThicknessArg.slice("--max-thickness=".length)) : null;
const mapArg = args.find((a) => a.startsWith("--map="));
const groupMap = mapArg ? JSON.parse(fs.readFileSync(path.resolve(mapArg.slice("--map=".length)), "utf8")) : {};
const heightArg = args.find((a) => a.startsWith("--height="));
const heightMm = heightArg ? Number(heightArg.slice("--height=".length)) : null;

if (!csvPath || !constName) {
  console.error(
    "Usage: node convert-cable-csv.mjs <csv-path> <CONST_NAME> [--filter=<regex>] [--map=<json-path>]",
  );
  process.exit(1);
}

// RFC4180-aware: a doubled quote ("") inside a quoted field is a literal
// quote character, not the end of the field. A naive indexOf('"') scan
// (the original version of this function) breaks on any product name that
// contains a literal straight quote character (e.g. a Tee "T" With
// Clamping product name using ASCII quotes rather than typographic curly
// quotes) — it truncates the field early and shifts every column after it
// for that row, which looks exactly like the width/thickness corruption
// bug this same toolchain exists to catch. Always use this version.
function parseCsvLine(line) {
  const fields = [];
  let idx = 0;
  while (idx <= line.length) {
    if (line[idx] === '"') {
      let value = "";
      idx++;
      while (idx < line.length) {
        if (line[idx] === '"') {
          if (line[idx + 1] === '"') {
            value += '"';
            idx += 2;
            continue;
          }
          idx++;
          break;
        }
        value += line[idx];
        idx++;
      }
      fields.push(value);
      if (line[idx] === ",") idx++;
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

// Source rows mostly use Turkish comma-decimal formatting ("1,5"), but some
// files inconsistently use a plain dot decimal instead ("1.5") — since no
// dimension in this catalogue ever needs thousands-grouping (max ~600mm),
// a dot is only ever a decimal point, never a thousands separator, so it's
// only stripped when a comma is also present (e.g. "1.234,5" -> 1234.5).
function turkishNumber(value) {
  if (!value) return undefined;
  const normalized = value.includes(",") ? value.replace(/\./g, "").replace(",", ".") : value;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : undefined;
}

const raw = fs.readFileSync(csvPath, "utf8");
const lines = raw.split(/\r?\n/).filter((l) => l.trim() !== "");
let rows = lines.slice(1).map(parseCsvLine);

if (modelFilter) {
  rows = rows.filter((f) => modelFilter.test(f[5]) || modelFilter.test(f[4]));
}
if (excludeNames) {
  rows = rows.filter((f) => !excludeNames.has(f[4]));
}
if (maxThickness !== null) {
  rows = rows.filter((f) => {
    const t = turkishNumber(f[18]);
    return t === undefined || t <= maxThickness;
  });
}
if (heightMm !== null) {
  rows = rows.filter((f) => turkishNumber(f[17]) === heightMm);
}

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

  const accessoryGroup = groupMap[productNameEn] ?? productNameEn;
  const materialEn = /galvaniz/i.test(material)
    ? "Steel, Hot-Dip Galvanized"
    : /alüminyum|aluminium/i.test(material)
      ? "Aluminium"
      : /paslanmaz|stainless/i.test(material)
        ? "Stainless Steel"
        : material;
  const weight = weightValue ? `${weightValue.replace(",", ".")} ${weightUnit.toLowerCase()}` : undefined;

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

const out = `// Auto-generated from ${csvPath.replace(/\\/g, "/")} (${variants.length} verified\n// catalogue rows). Do not hand-edit — regenerate from the source CSV if the\n// catalogue changes.\nimport type { CableManagementVariant } from "../types";\n\nexport const ${constName}: readonly CableManagementVariant[] = [\n${variants.join("\n")}\n];\n`;

process.stdout.write(out);

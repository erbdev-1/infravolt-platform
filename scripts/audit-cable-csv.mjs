#!/usr/bin/env node
// Diagnostic: flags product_name_en groups whose z_mm (thickness) column
// contains implausible values (>5mm — real sheet-steel/aluminium gauge in
// this catalogue never exceeds ~3mm; anything bigger is almost always a
// width/height/radius value that leaked into the wrong column for that
// row, the same corruption pattern found in the H100 dataset). Use this
// before converting any new family CSV so corrupted rows can be excluded
// rather than published as fabricated-looking dimensions.
// Usage: node scripts/audit-cable-csv.mjs <csv-path>

import fs from "node:fs";

const [, , csvPath] = process.argv;
if (!csvPath) {
  console.error("Usage: node audit-cable-csv.mjs <csv-path>");
  process.exit(1);
}

// RFC4180-aware — see convert-cable-csv.mjs for why the naive version broke.
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

function turkishNumber(value) {
  if (!value) return undefined;
  const normalized = value.includes(",") ? value.replace(/\./g, "").replace(",", ".") : value;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : undefined;
}

const raw = fs.readFileSync(csvPath, "utf8");
const lines = raw.split(/\r?\n/).filter((l) => l.trim() !== "");
const rows = lines.slice(1).map(parseCsvLine);

const byName = {};
for (const f of rows) {
  const name = f[4];
  const thicknessMm = turkishNumber(f[18]);
  if (!byName[name]) byName[name] = { total: 0, bad: 0, badSamples: new Set() };
  byName[name].total++;
  if (thicknessMm !== undefined && thicknessMm > 5) {
    byName[name].bad++;
    byName[name].badSamples.add(thicknessMm);
  }
}

console.log(`${csvPath} — ${rows.length} rows total\n`);
let anyBad = false;
for (const [name, info] of Object.entries(byName)) {
  if (info.bad > 0) {
    anyBad = true;
    console.log(`FLAGGED  ${info.bad}/${info.total}\t${name}\tsample thicknessMm: [${[...info.badSamples].slice(0, 5).join(", ")}]`);
  }
}
if (!anyBad) console.log("No implausible thickness values found — dataset looks clean.");

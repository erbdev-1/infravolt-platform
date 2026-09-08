// Computes which Busduct-overall and CMS supplemental rows are genuinely new
// versus already represented in the existing site reference data, and writes
// that verdict back onto each record as `duplicateOfExisting`. Comparison is
// by normalised (Unicode NFKC, casefolded, whitespace/punctuation-collapsed)
// project + counterpart-company + location/owner key — see normaliseKey().
// This does not decide public visibility (Russia/Iran/Kurgan-Balt exclusion
// stays a separate, PUBLIC ASSEMBLY-layer concern in src/data/references/index.ts).
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "..");
const generatedDirectory = resolve(root, "src", "data", "references", "generated");

const references = JSON.parse(readFileSync(resolve(generatedDirectory, "references.json"), "utf8"));
const busductPath = resolve(generatedDirectory, "busduct-overall-reference-list.json");
const cmsPath = resolve(generatedDirectory, "cms-reference-list.json");
const busduct = JSON.parse(readFileSync(busductPath, "utf8"));
const cms = JSON.parse(readFileSync(cmsPath, "utf8"));

function normaliseKey(...parts) {
  return parts
    .map((part) =>
      (part ?? "")
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .trim()
        .replace(/\s+/g, " "),
    )
    .join("|");
}

// --- Existing Busbar source keys (customerProjects + projectContractors) ---
const existingBusbarKeys = new Set([
  ...references.busbar.customerProjects.map((item) => normaliseKey(item.project, item.customer, item.location)),
  ...references.busbar.projectContractors.map((item) => normaliseKey(item.project, item.contractor, item.location)),
]);

// --- Existing Cable Management source keys (relationships) ---
const existingCableKeys = new Set(
  references.cableManagement.relationships.map((item) => normaliseKey(item.contractor, item.project, item.owner)),
);

function dedupeAgainst(records, existingKeySet, keyFn) {
  const seenWithinBatch = new Set();
  let duplicateOfExisting = 0;
  let duplicateWithinBatch = 0;
  let genuinelyNew = 0;

  const out = records.map((record) => {
    const key = keyFn(record);
    const isExistingDuplicate = existingKeySet.has(key);
    const isBatchDuplicate = !isExistingDuplicate && seenWithinBatch.has(key);
    seenWithinBatch.add(key);

    if (isExistingDuplicate) duplicateOfExisting += 1;
    else if (isBatchDuplicate) duplicateWithinBatch += 1;
    else genuinelyNew += 1;

    return { ...record, duplicateOfExisting: isExistingDuplicate || isBatchDuplicate };
  });

  return { out, duplicateOfExisting, duplicateWithinBatch, genuinelyNew };
}

const busductResult = dedupeAgainst(busduct.records, existingBusbarKeys, (record) =>
  normaliseKey(record.project, record.client, record.location),
);
busduct.records = busductResult.out;

const cmsFlatRecords = [];
for (const page of cms.pages) {
  page.rows.forEach((row, index) => {
    cmsFlatRecords.push({ page: page.page, index, contractor: row[0], project: row[1], endClient: row[2], product: row[3] });
  });
}
const cmsResult = dedupeAgainst(cmsFlatRecords, existingCableKeys, (record) =>
  normaliseKey(record.contractor, record.project, record.endClient),
);
// Write the duplicate verdict back per-page/per-row without changing the compact tuple shape.
let cursor = 0;
for (const page of cms.pages) {
  page.duplicateOfExisting = page.rows.map(() => cmsResult.out[cursor++].duplicateOfExisting);
}

writeFileSync(busductPath, `${JSON.stringify(busduct, null, 2)}\n`, "utf8");
writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`, "utf8");

console.log(
  JSON.stringify(
    {
      busduct: {
        totalParsed: busduct.records.length,
        duplicateOfExisting: busductResult.duplicateOfExisting,
        duplicateWithinBatch: busductResult.duplicateWithinBatch,
        genuinelyNew: busductResult.genuinelyNew,
      },
      cms: {
        totalParsed: cmsFlatRecords.length,
        duplicateOfExisting: cmsResult.duplicateOfExisting,
        duplicateWithinBatch: cmsResult.duplicateWithinBatch,
        genuinelyNew: cmsResult.genuinelyNew,
      },
    },
    null,
    2,
  ),
);

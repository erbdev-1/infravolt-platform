import type { EarthingProductVariant } from "@/data/products/earthing-lightning/types";

function toCsvField(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function toCsvRow(fields: readonly string[]): string {
  return fields.map(toCsvField).join(",");
}

// One row per variant, catalogue order preserved (callers pass records in
// the order they should appear — this never sorts).
export function buildVariantCsv(
  records: readonly Readonly<{ familyName: string; variant: EarthingProductVariant }>[],
  headers: Readonly<{
    family: string;
    model: string;
    name: string;
    stockCode: string;
    material: string;
    dimensions: string;
    weight: string;
  }>,
): string {
  const lines = [
    toCsvRow([
      headers.family,
      headers.model,
      headers.name,
      headers.stockCode,
      headers.material,
      headers.dimensions,
      headers.weight,
    ]),
    ...records.map(({ familyName, variant }) =>
      toCsvRow([
        familyName,
        variant.model,
        variant.name,
        variant.stockCode,
        variant.material ?? "",
        variant.dimensions ?? "",
        variant.weight ?? "",
      ]),
    ),
  ];

  // CRLF + UTF-8 BOM: opens with correct encoding (Cyrillic material/
  // dimension text) directly in Excel, not just spec-compliant CSV readers.
  return lines.join("\r\n");
}

const UTF8_BOM = "﻿";

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob([UTF8_BOM + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

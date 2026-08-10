import type { CableManagementVariant } from "@/data/products/cable-management/types";

function toCsvField(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function toCsvRow(fields: readonly string[]): string {
  return fields.map(toCsvField).join(",");
}

export function buildVariantCsv(variants: readonly CableManagementVariant[]): string {
  const lines = [
    toCsvRow(["Model", "Description", "Stock Code", "Width (mm)", "Height (mm)", "Thickness (mm)", "Length (mm)", "Weight", "Material / Finish"]),
    ...variants.map((v) =>
      toCsvRow([
        v.model,
        v.name,
        v.stockCode,
        v.widthMm !== undefined ? String(v.widthMm) : "",
        v.heightMm !== undefined ? String(v.heightMm) : "",
        v.thicknessMm !== undefined ? String(v.thicknessMm) : "",
        v.lengthMm !== undefined ? String(v.lengthMm) : "",
        v.weight ?? "",
        v.material,
      ]),
    ),
  ];

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

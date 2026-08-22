import type { LedSeriesModel } from "@/data/products/led-lighting/types";

function toCsvField(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function toCsvRow(fields: readonly string[]): string {
  return fields.map(toCsvField).join(",");
}

export function buildSeriesModelsCsv(models: readonly LedSeriesModel[]): string {
  const hasMountingType = models.some((model) => model.mountingType !== undefined);
  const hasLedQty = models.some((model) => model.ledQty !== undefined);
  const hasLuminousFlux = models.some((model) => model.luminousFluxLm !== undefined);
  const hasVoltage = models.some((model) => model.voltage !== undefined);
  const hasFrequency = models.some((model) => model.frequency !== undefined);
  const hasPowerFactor = models.some((model) => model.powerFactor !== undefined);
  const hasOperatingTemperature = models.some((model) => model.operatingTemperature !== undefined);
  const hasEfficiency = models.some((model) => model.efficiencyLmW !== undefined);
  const hasCri = models.some((model) => model.cri !== undefined);
  const hasColourTemperature = models.some((model) => model.colourTemperature !== undefined);
  const hasLens = models.some((model) => model.lens !== undefined);
  const hasDimensions = models.some((model) => model.dimensions !== undefined);
  const hasCeilingCut = models.some((model) => model.ceilingCut !== undefined);
  const hasIp = models.some((model) => model.ip !== undefined);
  const hasIk = models.some((model) => model.ik !== undefined);
  const hasWeight = models.some((model) => model.weightKg !== undefined);

  const header: string[] = [];
  if (hasMountingType) header.push("Mounting Type");
  header.push("Model / Catalogue Code", "Power (W)");
  if (hasLedQty) header.push("LED Qty");
  if (hasLuminousFlux) header.push("Luminous Flux");
  if (hasVoltage) header.push("Voltage");
  if (hasFrequency) header.push("Frequency");
  if (hasPowerFactor) header.push("Power Factor");
  if (hasOperatingTemperature) header.push("Operating Temperature");
  if (hasEfficiency) header.push("Efficiency");
  if (hasCri) header.push("CRI");
  if (hasColourTemperature) header.push("Colour Temp.");
  if (hasLens) header.push("Lens");
  if (hasDimensions) header.push("Dimensions");
  if (hasCeilingCut) header.push("Ceiling Cut");
  if (hasIp) header.push("IP");
  if (hasIk) header.push("IK");
  if (hasWeight) header.push("Weight");

  const lines = [
    toCsvRow(header),
    ...models.map((model) => {
      const row: string[] = [];
      if (hasMountingType) row.push(model.mountingType ?? "");
      row.push(model.model, model.powerDisplay ?? `${model.powerW} W`);
      if (hasLedQty) row.push(model.ledQty !== undefined ? `${model.ledQty}` : "");
      if (hasLuminousFlux) row.push(model.luminousFluxLm ?? "");
      if (hasVoltage) row.push(model.voltage ?? "");
      if (hasFrequency) row.push(model.frequency ?? "");
      if (hasPowerFactor) row.push(model.powerFactor ?? "");
      if (hasOperatingTemperature) row.push(model.operatingTemperature ?? "");
      if (hasEfficiency) row.push(model.efficiencyLmW ?? "");
      if (hasCri) row.push(model.cri ?? "");
      if (hasColourTemperature) row.push(model.colourTemperature ?? "");
      if (hasLens) row.push(model.lens ?? "");
      if (hasDimensions) row.push(model.dimensions ?? "");
      if (hasCeilingCut) row.push(model.ceilingCut ?? "");
      if (hasIp) row.push(model.ip ?? "");
      if (hasIk) row.push(model.ik ?? "");
      if (hasWeight) row.push(model.weightKg ?? "");
      return toCsvRow(row);
    }),
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

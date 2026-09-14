import { describe, expect, it } from "vitest";

import { referenceSystemsForMarket } from "./index";

const NEW_PROJECTS = [
  "Allerton",
  "Cambridge House",
  "Regent Bupa",
  "Menai Science",
  "Pall Europe",
  "The Strand",
  "Hatton Cross",
  "Albion House-1",
  "Fruit and Veg Phase 2",
  "Bupa Stage-3",
  "Senator House",
  "Glenthorne Road",
  "Albion House-2",
  "Skelhorne Student Acc.",
  "Axis Apartments Risers",
] as const;

function busbarInternationalRows(market: "uk" | "ua") {
  const systems = referenceSystemsForMarket(market);
  const busbar = systems.find((system) => system.key === "busbar")!;
  return busbar.tabs.find((tab) => tab.id === "international")!.rows!;
}

describe.each(["uk", "ua"] as const)("UK Busbar reference additions — %s market", (market) => {
  const rows = busbarInternationalRows(market);

  it("includes all 16 new rows exactly once", () => {
    for (const project of NEW_PROJECTS) {
      const matches = rows.filter((row) => row.cells.includes(project));
      expect(matches.length, `expected exactly one row for "${project}"`).toBe(1);
    }
    const arenaRows = rows.filter((row) => row.cells.includes("ARENA ELECTRICAL SERVICES"));
    expect(arenaRows.length).toBe(1);
  });

  it("shows only Client / Project / Country for the new rows — no Type, Ampere or Year", () => {
    const row = rows.find((r) => r.cells.includes("Allerton"))!;
    expect(row.cells).toHaveLength(3);
    expect(row.cells).toEqual(["POWER AND LIGHT", "Allerton", market === "uk" ? "United Kingdom" : "Велика Британія"]);
    for (const cell of row.cells) {
      expect(cell).not.toMatch(/^GSA$|^GGD-[AC]$|^GS-C$/);
      expect(cell).not.toMatch(/^\d{2,5}A$/);
      expect(cell).not.toMatch(/^20(16|17|18)$/);
    }
  });

  it("row 16 (ARENA ELECTRICAL SERVICES) uses an em dash placeholder, not an invented project name", () => {
    const row = rows.find((r) => r.cells.includes("ARENA ELECTRICAL SERVICES"))!;
    expect(row.cells).toEqual(["ARENA ELECTRICAL SERVICES", "—", market === "uk" ? "United Kingdom" : "Велика Британія"]);
  });

  it("localises Country per market using the existing geography display convention", () => {
    for (const project of NEW_PROJECTS) {
      const row = rows.find((r) => r.cells.includes(project))!;
      const country = row.cells[2];
      expect(country).toBe(market === "uk" ? "United Kingdom" : "Велика Британія");
    }
  });
});

describe("UK Busbar reference additions — duplicate check", () => {
  it("adds each of the 16 new Client+Project pairs exactly once (no duplicate introduced by this batch)", () => {
    const rows = busbarInternationalRows("uk");
    const normalise = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    const newPairs = [...NEW_PROJECTS.map((project) => ["POWER AND LIGHT", project] as const), ["ARENA ELECTRICAL SERVICES", "—"] as const];

    for (const [client, project] of newPairs) {
      const key = `${normalise(client)}|${normalise(project)}`;
      const matches = rows.filter((row) => `${normalise(row.cells[0]!)}|${normalise(row.cells[1]!)}` === key);
      expect(matches.length, `expected exactly one row for ${client} / ${project}`).toBe(1);
    }
  });
});

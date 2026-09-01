import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { titleQualifierForTitleTag } from "./page";

describe("titleQualifierForTitleTag", () => {
  it("wraps a bare dimension qualifier in a single pair of parentheses (unchanged behaviour)", () => {
    expect(titleQualifierForTitleTag("H = 70–200 mm")).toBe("(H = 70–200 mm)");
  });

  it("does not double-wrap a qualifier that already carries its own parentheses — the reported bug", () => {
    expect(titleQualifierForTitleTag("(220 Items)")).toBe("(220 Items)");
  });

  // Every "(N Items)" qualifier found across the Cable Management family —
  // proves the fix covers all of them, not just EMT/IMC/RSC.
  it.each([
    "(220 Items)",
    "(22 Items)",
    "(63 Items)",
    "(122 Items)",
    "(76 Items)",
    "(48 Items)",
    "(238 Items)",
    "(95 Items)",
  ])("does not double-wrap %s", (qualifier) => {
    expect(titleQualifierForTitleTag(qualifier)).toBe(qualifier);
  });

  it("does not double-wrap a non-numeric pre-wrapped qualifier", () => {
    expect(titleQualifierForTitleTag("(Made to Order)")).toBe("(Made to Order)");
  });

  it("preserves the existing (imperfect) empty-string behaviour — not this task's bug to fix", () => {
    expect(titleQualifierForTitleTag("")).toBe("()");
  });

  it("still wraps other bare qualifier shapes seen in this family (GKT-CE, TTK list)", () => {
    expect(titleQualifierForTitleTag("GKT-CE")).toBe("(GKT-CE)");
  });
});

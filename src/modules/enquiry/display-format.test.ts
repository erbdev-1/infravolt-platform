import { describe, expect, it } from "vitest";

import { cleanText, formatCompanyName, formatEnquiryType, formatJobTitle, formatMarket, formatPersonName, trimOnly } from "./display-format";

describe("formatPersonName", () => {
  it("title-cases a plain lowercase name", () => {
    expect(formatPersonName("erhan", "baydi")).toBe("Erhan Baydi");
  });

  it("normalizes shouting/mixed case input", () => {
    expect(formatPersonName("JANE", "dOE")).toBe("Jane Doe");
  });

  it("capitalizes after hyphens and apostrophes", () => {
    expect(formatPersonName("mary-jane", "o'brien")).toBe("Mary-Jane O'Brien");
  });

  it("trims and collapses stray whitespace", () => {
    expect(formatPersonName("  erhan  ", "baydi")).toBe("Erhan Baydi");
  });
});

describe("formatJobTitle", () => {
  it("uppercases known acronyms", () => {
    expect(formatJobTitle("ceo")).toBe("CEO");
    expect(formatJobTitle("cto")).toBe("CTO");
    expect(formatJobTitle("cfo")).toBe("CFO");
    expect(formatJobTitle("md")).toBe("MD");
    expect(formatJobTitle("qa")).toBe("QA");
    expect(formatJobTitle("hr")).toBe("HR");
  });

  it("title-cases everything else", () => {
    expect(formatJobTitle("project manager")).toBe("Project Manager");
    expect(formatJobTitle("procurement lead")).toBe("Procurement Lead");
  });

  it("mixes acronyms and regular words in the same title", () => {
    expect(formatJobTitle("hr manager")).toBe("HR Manager");
  });

  it("returns empty string unchanged", () => {
    expect(formatJobTitle("")).toBe("");
    expect(formatJobTitle("   ")).toBe("");
  });
});

describe("formatCompanyName", () => {
  it("normalizes the InfraVolt brand name regardless of input casing", () => {
    expect(formatCompanyName("infravolt")).toBe("InfraVolt");
    expect(formatCompanyName("INFRAVOLT Ltd")).toBe("InfraVolt Ltd");
  });

  it("preserves the company's own casing otherwise (never blindly title-cased)", () => {
    expect(formatCompanyName("PwC")).toBe("PwC");
    expect(formatCompanyName("eBay UK")).toBe("eBay UK");
  });

  it("trims and collapses whitespace only", () => {
    expect(formatCompanyName("  Acme   Contractors  ")).toBe("Acme Contractors");
  });
});

describe("formatMarket", () => {
  it("never returns the raw market code", () => {
    expect(formatMarket("uk")).toBe("United Kingdom");
    expect(formatMarket("ua")).toBe("Ukraine");
  });
});

describe("formatEnquiryType", () => {
  it("never returns the raw enum value", () => {
    expect(formatEnquiryType("general", "uk")).toBe("General Enquiry");
    expect(formatEnquiryType("quote", "uk")).toBe("Request a Quote");
    expect(formatEnquiryType("technical", "uk")).toBe("Technical Information");
    expect(formatEnquiryType("technical-document", "uk")).toBe("Technical Documents");
    expect(formatEnquiryType("project", "uk")).toBe("Project Support");
    expect(formatEnquiryType("product", "uk")).toBe("Product Enquiry");
  });

  it("uses the Ukrainian labels for the ua market", () => {
    expect(formatEnquiryType("general", "ua")).toBe("Загальний запит");
  });
});

describe("cleanText / trimOnly", () => {
  it("cleanText trims and collapses duplicate internal spaces", () => {
    expect(cleanText("  New   Data  Centre  ")).toBe("New Data Centre");
  });

  it("cleanText never touches casing", () => {
    expect(cleanText("GGD  GNL   TEX-LED")).toBe("GGD GNL TEX-LED");
  });

  it("trimOnly trims but never collapses internal spacing (phone/email safety)", () => {
    expect(trimOnly("  +44 20 1234  5678  ")).toBe("+44 20 1234  5678");
  });
});

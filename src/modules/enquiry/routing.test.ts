import { describe, expect, it } from "vitest";

import { buildEnquiryHref, parseEnquiryContext } from "./routing";
import { ENQUIRY_TYPES } from "./types";

describe("ENQUIRY_TYPES", () => {
  it("defines exactly the six canonical enquiry types", () => {
    expect(ENQUIRY_TYPES).toEqual(["product", "quote", "technical", "technical-document", "project", "general"]);
  });
});

describe("buildEnquiryHref", () => {
  it("builds a bare /contact URL with just the type when no context is given", () => {
    expect(buildEnquiryHref("general")).toBe("/contact?type=general");
  });

  it("includes every provided context field as a query param", () => {
    const href = buildEnquiryHref("technical-document", {
      system: "cable-management",
      family: "cable-ladders",
      model: "GKT-100",
      label: "Cable Ladders",
      industry: "data-centre",
      industryLabel: "Data Centre",
      zone: "server-hall",
      zoneLabel: "Server Hall",
      hotspot: "server-hall-cable-tray",
      source: "/application-map/data-centre",
    });
    const url = new URL(href, "https://infravolt.invalid");

    expect(url.searchParams.get("type")).toBe("technical-document");
    expect(url.searchParams.get("system")).toBe("cable-management");
    expect(url.searchParams.get("family")).toBe("cable-ladders");
    expect(url.searchParams.get("model")).toBe("GKT-100");
    expect(url.searchParams.get("label")).toBe("Cable Ladders");
    expect(url.searchParams.get("industry")).toBe("data-centre");
    expect(url.searchParams.get("zone")).toBe("server-hall");
    expect(url.searchParams.get("hotspot")).toBe("server-hall-cable-tray");
    expect(url.searchParams.get("source")).toBe("/application-map/data-centre");
  });

  it("omits query params for context fields that are absent", () => {
    const href = buildEnquiryHref("quote", { system: "busbar" });

    expect(href).toBe("/contact?type=quote&system=busbar");
  });
});

describe("parseEnquiryContext", () => {
  it("falls back to general for a missing type", () => {
    expect(parseEnquiryContext({}).type).toBe("general");
  });

  it("falls back to general for an unrecognised type value", () => {
    expect(parseEnquiryContext({ type: "checkout" }).type).toBe("general");
  });

  it("accepts every canonical enquiry type", () => {
    for (const type of ENQUIRY_TYPES) {
      expect(parseEnquiryContext({ type }).type).toBe(type);
    }
  });

  it("only accepts a known EnquirySystemKey for system", () => {
    expect(parseEnquiryContext({ system: "cable-management" }).context.system).toBe("cable-management");
    expect(parseEnquiryContext({ system: "not-a-real-system" }).context.system).toBeUndefined();
  });

  it("rejects industry/zone/hotspot values that aren't safe slugs", () => {
    expect(parseEnquiryContext({ industry: "data-centre" }).context.industry).toBe("data-centre");
    expect(parseEnquiryContext({ industry: "<script>alert(1)</script>" }).context.industry).toBeUndefined();
    expect(parseEnquiryContext({ zone: "Server Hall!" }).context.zone).toBeUndefined();
    expect(parseEnquiryContext({ hotspot: "../../etc/passwd" }).context.hotspot).toBeUndefined();
  });

  it("only accepts a source that looks like a safe internal path", () => {
    expect(parseEnquiryContext({ source: "/resources" }).context.source).toBe("/resources");
    expect(parseEnquiryContext({ source: "https://evil.example/phish" }).context.source).toBeUndefined();
    expect(parseEnquiryContext({ source: "javascript:alert(1)" }).context.source).toBeUndefined();
  });

  it("accepts real catalogue-style family and model identifiers with spaces, hyphens and mixed case", () => {
    const result = parseEnquiryContext({ family: "TTK Wire-Mesh Trays", model: "GS-400A" });

    expect(result.context.family).toBe("TTK Wire-Mesh Trays");
    expect(result.context.model).toBe("GS-400A");
  });

  it("rejects oversized or control-character family/model/label payloads", () => {
    const tooLong = "x".repeat(200);

    expect(parseEnquiryContext({ family: tooLong }).context.family).toBeUndefined();
    expect(parseEnquiryContext({ model: "bad\x00value" }).context.model).toBeUndefined();
    expect(parseEnquiryContext({ label: tooLong }).context.label).toBeUndefined();
  });

  it("trims and caps industryLabel/zoneLabel to a sane display length", () => {
    expect(parseEnquiryContext({ industryLabel: "  Data Centre  " }).context.industryLabel).toBe("Data Centre");
    expect(parseEnquiryContext({ industryLabel: "x".repeat(200) }).context.industryLabel).toBeUndefined();
  });

  it("takes the first value when a param is duplicated in the query string", () => {
    expect(parseEnquiryContext({ type: ["quote", "general"] }).type).toBe("quote");
  });
});

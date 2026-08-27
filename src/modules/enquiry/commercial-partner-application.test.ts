import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { submitCommercialPartnerApplication, type CommercialPartnerApplicationDraft } from "./commercial-partner-application";

const DRAFT: CommercialPartnerApplicationDraft = {
  type: "commercial-partner",
  market: "uk",
  companyName: "Acme Contractors Ltd",
  website: "",
  companyLocation: "",
  yearsTrading: "",
  businessType: "electrical-contractor",
  partnershipInterest: "contractor-partner",
  contactName: "Jordan Smith",
  jobTitle: "Procurement Manager",
  email: "jordan@acme-contractors.co.uk",
  phone: "+44 20 1234 5678",
  currentSalesServiceCoverage: ["Nationwide UK"],
  requestedDealershipTerritory: { scale: "region", regions: [], cities: "" },
  productSystemInterests: ["Busbar Systems"],
  industryInterests: [],
  commercialRequirements: "",
  declarationAccepted: true,
  sourcePath: "/commercial-partners",
};

describe("submitCommercialPartnerApplication", () => {
  it("never fakes a success result while no backend is configured", async () => {
    const result = await submitCommercialPartnerApplication(DRAFT);
    expect(result).toEqual({ ok: false, error: "not-configured" });
  });
});

describe("submitCommercialPartnerApplication — configured backend", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://project.supabase.test");
    vi.stubEnv("SUPABASE_SECRET_KEY", "test-secret-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("rejects an unaccepted declaration without ever calling the RPC", async () => {
    const mock = vi.fn();
    vi.stubGlobal("fetch", mock);

    const result = await submitCommercialPartnerApplication({ ...DRAFT, declarationAccepted: false });

    expect(result).toEqual({ ok: false, error: "network" });
    expect(mock).not.toHaveBeenCalled();
  });

  it("rejects an invalid business type without ever calling the RPC (defence in depth against a tampered client call)", async () => {
    const mock = vi.fn();
    vi.stubGlobal("fetch", mock);

    const result = await submitCommercialPartnerApplication({ ...DRAFT, businessType: "distributor" });

    expect(result).toEqual({ ok: false, error: "network" });
    expect(mock).not.toHaveBeenCalled();
  });

  it("trims/normalizes free-text fields and lower-cases the email before calling the RPC", async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "",
      json: async () => "IV-CP-2026-000045",
    });
    vi.stubGlobal("fetch", mock);

    const result = await submitCommercialPartnerApplication({
      ...DRAFT,
      companyName: "  Acme   Contractors Ltd  ",
      email: "  Jordan@Acme-Contractors.co.uk  ",
    });

    expect(result).toEqual({ ok: true, referenceNo: "IV-CP-2026-000045" });
    const [, init] = mock.mock.calls[0] as [string, { body: string }];
    const body = JSON.parse(init.body) as Record<string, unknown>;
    expect(body.p_company_name).toBe("Acme Contractors Ltd");
    expect(body.p_email).toBe("jordan@acme-contractors.co.uk");
  });

  it("never leaks the RPC error body — a rejected submission (e.g. rate limit) always collapses to the generic network error", async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      text: async () => "submit_commercial_partner_application: rate limit exceeded for this email",
      json: async () => ({}),
    });
    vi.stubGlobal("fetch", mock);

    const result = await submitCommercialPartnerApplication(DRAFT);

    expect(result).toEqual({ ok: false, error: "network" });
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { CommercialPartnerApplicationDraft } from "./commercial-partner-application";
import { sendCommercialPartnerApplicationEmails } from "./commercial-partner-email";

const DRAFT: CommercialPartnerApplicationDraft = {
  type: "commercial-partner",
  market: "uk",
  companyName: "  acme contractors ltd  ",
  website: "https://acme-contractors.co.uk",
  companyLocation: "Cambridge, UK",
  yearsTrading: "12",
  businessType: "dealer-reseller",
  partnershipInterest: "authorised-dealer",
  contactName: "jordan smith",
  jobTitle: "ceo",
  email: "jordan@acme-contractors.co.uk",
  phone: "+44 20 1234 5678",
  currentSalesServiceCoverage: ["Nationwide UK"],
  requestedDealershipTerritory: { scale: "region", regions: ["Midlands"], cities: "Birmingham" },
  productSystemInterests: ["Busbar Systems"],
  industryInterests: ["Data Centres"],
  commercialRequirements: "Purchasing at scale from Q3.",
  declarationAccepted: true,
  sourcePath: "/commercial-partners",
};

function fetchMock() {
  return vi.fn().mockImplementation(async () => ({ ok: true, text: async () => "", json: async () => ({}) }));
}

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("EMAIL_FROM_UK", "InfraVolt <no-reply@infravolt.test>");
  vi.stubEnv("EMAIL_REPLY_TO_UK", "sales@infravolt.test");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function resendCallMatching(mock: ReturnType<typeof fetchMock>, recipient: string) {
  return mock.mock.calls.find((call) => {
    const body = JSON.parse(call[1].body as string);
    return Array.isArray(body.to) && body.to[0] === recipient;
  });
}

async function captureInternalEmailBody() {
  const mock = fetchMock();
  vi.stubGlobal("fetch", mock);
  await sendCommercialPartnerApplicationEmails(DRAFT, "IV-CP-2026-000045");
  const call = resendCallMatching(mock, "sales@infravolt.test");
  if (!call) throw new Error("internal notification call not found");
  return JSON.parse(call[1].body as string) as { subject: string; html: string; text: string };
}

async function captureAcknowledgementEmailBody() {
  const mock = fetchMock();
  vi.stubGlobal("fetch", mock);
  await sendCommercialPartnerApplicationEmails(DRAFT, "IV-CP-2026-000045");
  const call = resendCallMatching(mock, DRAFT.email);
  if (!call) throw new Error("acknowledgement call not found");
  return JSON.parse(call[1].body as string) as { subject: string; html: string; text: string };
}

describe("sendCommercialPartnerApplicationEmails — no-op behaviour", () => {
  it("attempts no request when RESEND_API_KEY is unset", async () => {
    vi.unstubAllEnvs();
    const mock = fetchMock();
    vi.stubGlobal("fetch", mock);
    await sendCommercialPartnerApplicationEmails(DRAFT, "IV-CP-2026-000045");
    expect(mock).not.toHaveBeenCalled();
  });

  it("attempts no request for a market with no configured mailbox (UA today)", async () => {
    const mock = fetchMock();
    vi.stubGlobal("fetch", mock);
    await sendCommercialPartnerApplicationEmails({ ...DRAFT, market: "ua" }, "IV-CP-2026-000045");
    expect(mock).not.toHaveBeenCalled();
  });
});

describe("sendCommercialPartnerApplicationEmails — internal notification", () => {
  it("shows human-readable labels, never raw enum codes, for business type and partnership interest", async () => {
    const body = await captureInternalEmailBody();
    expect(body.html).toContain("Dealer / Reseller");
    expect(body.html).toContain("Authorised Dealer");
    expect(body.html).not.toContain(">dealer-reseller<");
    expect(body.html).not.toContain(">authorised-dealer<");
  });

  it("shows the professionally formatted company name, contact name and uppercased job-title acronym", async () => {
    const body = await captureInternalEmailBody();
    expect(body.html).toContain("Acme Contractors Ltd");
    expect(body.html).toContain("Jordan Smith");
    expect(body.html).toContain(">CEO<");
  });

  it("includes territory, product and industry interest fields", async () => {
    const body = await captureInternalEmailBody();
    expect(body.html).toContain("Nationwide UK");
    expect(body.html).toContain("Midlands");
    expect(body.html).toContain("Birmingham");
    expect(body.html).toContain("Busbar Systems");
    expect(body.html).toContain("Data Centres");
    expect(body.text).toContain("Purchasing at scale from Q3.");
  });

  it("records declaration acceptance and never exposes a secret key", async () => {
    const body = await captureInternalEmailBody();
    expect(body.html).toContain("Accepted");
    expect(body.html).not.toContain("test-secret-key");
    expect(body.html).not.toContain("service_role");
  });
});

describe("sendCommercialPartnerApplicationEmails — applicant acknowledgement", () => {
  it("confirms receipt and states clearly that submission is not an appointment", async () => {
    const body = await captureAcknowledgementEmailBody();
    expect(body.html).toContain("IV-CP-2026-000045");
    expect(body.html).toContain("Acme Contractors Ltd");
    expect(body.html).toMatch(/does not constitute appointment/);
    expect(body.html).toMatch(/written confirmation/);
    expect(body.text).toMatch(/does not constitute appointment/);
  });

  it("never exposes internal detail: no source path, no raw business-type code, no coverage/requirements internals", async () => {
    const body = await captureAcknowledgementEmailBody();
    expect(body.html).not.toContain("/commercial-partners");
    expect(body.html).not.toContain("dealer-reseller");
    expect(body.html).not.toContain("Purchasing at scale from Q3.");
    expect(body.text).not.toContain("/commercial-partners");
  });
});

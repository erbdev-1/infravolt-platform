import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { EnquiryDraft } from "./draft";
import { sendEnquiryEmails } from "./email";

const BASE_DRAFT: EnquiryDraft = {
  type: "quote",
  market: "uk",
  subject: "",
  contact: {
    firstName: "Jane",
    lastName: "Doe",
    company: "Acme <Contractors>",
    jobTitle: "Buyer",
    email: "jane@example.test",
    phone: "+44 7700 900000",
  },
  project: {
    projectName: "",
    projectLocation: "",
    projectType: "",
    projectStage: "",
    estimatedQuantity: "",
    requiredDate: "",
    interestedSystems: [],
  },
  technical: {
    productSystem: "",
    productSeries: "",
    modelCode: "",
    informationRequired: [],
    documentsRequired: [],
  },
  selectedItems: [],
  attachmentNames: [],
  message: "Line one\nLine two",
  sourceContext: {},
};

type AttachmentFixture = Readonly<{
  file_name: string;
  storage_object_path: string;
  content_type: string | null;
  size_bytes: number | null;
  scan_status: "pending" | "clean" | "infected" | "scan_failed";
}>;

/**
 * URL-aware: mocks list_enquiry_attachments_for_email and
 * get_clean_attachment_for_download (the two RPCs sendEnquiryEmails now
 * queries directly, instead of trusting a caller-supplied attachment
 * list), the Storage sign endpoint, and falls back to a generic ok:true
 * response for Resend calls. get_clean_attachment_for_download only ever
 * returns a row for a fixture whose scan_status is "clean" — mirroring
 * the real DB-enforced gate.
 */
function fetchMock(attachmentFixtures: readonly AttachmentFixture[] = []) {
  return vi.fn().mockImplementation(async (url: string, init?: { body?: string }) => {
    if (url.includes("/rest/v1/rpc/list_enquiry_attachments_for_email")) {
      return { ok: true, text: async () => "", json: async () => attachmentFixtures };
    }
    if (url.includes("/rest/v1/rpc/get_clean_attachment_for_download")) {
      const body = init?.body ? (JSON.parse(init.body) as { p_storage_object_path?: string }) : {};
      const match = attachmentFixtures.find(
        (row) => row.storage_object_path === body.p_storage_object_path && row.scan_status === "clean",
      );
      return {
        ok: true,
        text: async () => "",
        json: async () => (match ? [{ file_name: match.file_name, content_type: match.content_type }] : []),
      };
    }
    if (url.includes("/storage/v1/object/sign/")) {
      const path = url.split("/storage/v1/object/sign/")[1];
      return {
        ok: true,
        text: async () => "",
        json: async () => ({ signedURL: `/object/sign/${path}?token=mock-signed-token` }),
      };
    }
    return { ok: true, text: async () => "", json: async () => ({}) };
  });
}

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("EMAIL_FROM_UK", "InfraVolt <no-reply@infravolt.test>");
  vi.stubEnv("EMAIL_REPLY_TO_UK", "sales@infravolt.test");
  vi.stubEnv("EMAIL_FROM_UA", "InfraVolt <no-reply@infravolt.test>");
  vi.stubEnv("EMAIL_REPLY_TO_UA", "sales@infravolt.test");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL_UK", "https://uk.infravolt.test");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL_UA", "https://ua.infravolt.test");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://project.supabase.test");
  vi.stubEnv("SUPABASE_SECRET_KEY", "test-secret-key");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function resendCallMatching(mock: ReturnType<typeof fetchMock>, recipient: string) {
  return mock.mock.calls.find((call) => {
    if (typeof call[0] === "string" && call[0].includes("/storage/v1/")) return false;
    try {
      const body = JSON.parse(call[1].body as string);
      return Array.isArray(body.to) && body.to[0] === recipient;
    } catch {
      return false;
    }
  });
}

async function captureInternalEmailBody(draft: EnquiryDraft, attachmentFixtures: readonly AttachmentFixture[] = []) {
  const mock = fetchMock(attachmentFixtures);
  vi.stubGlobal("fetch", mock);
  await sendEnquiryEmails(draft, "IV-2026-000123");
  const internalCall = resendCallMatching(mock, "sales@infravolt.test");
  if (!internalCall) throw new Error("internal notification call not found");
  return JSON.parse(internalCall[1].body as string) as { subject: string; html: string; text: string };
}

async function captureAcknowledgementEmailBody(draft: EnquiryDraft, attachmentFixtures: readonly AttachmentFixture[] = []) {
  const mock = fetchMock(attachmentFixtures);
  vi.stubGlobal("fetch", mock);
  await sendEnquiryEmails(draft, "IV-2026-000123");
  const ackCall = resendCallMatching(mock, draft.contact.email);
  if (!ackCall) throw new Error("acknowledgement call not found");
  return JSON.parse(ackCall[1].body as string) as { subject: string; html: string; text: string };
}

describe("sendEnquiryEmails — customer acknowledgement", () => {
  it("shows the reference, human-readable enquiry type and market — never raw codes", async () => {
    const body = await captureAcknowledgementEmailBody(BASE_DRAFT);
    expect(body.subject).toContain("Enquiry Received");
    expect(body.subject).toContain("IV-2026-000123");
    expect(body.html).toContain("IV-2026-000123");
    expect(body.html).toContain("Request a Quote"); // type: "quote" -> human label
    expect(body.html).not.toContain(">quote<");
    expect(body.html).toContain("United Kingdom");
    expect(body.html).not.toContain(">uk<");
  });

  it("includes the InfraVolt logo as an absolute URL and the response-time wording", async () => {
    const body = await captureAcknowledgementEmailBody(BASE_DRAFT);
    expect(body.html).toContain('src="https://uk.infravolt.test/assets/brand/infravolt-wordmark-primary.webp"');
    expect(body.html).toContain("24–48 business hours");
    expect(body.text).toContain("24–48 business hours");
  });

  it("never includes the customer's message, phone number or basket items", async () => {
    const draftWithBasketAndPhone: EnquiryDraft = {
      ...BASE_DRAFT,
      selectedItems: [{ id: "a", title: "GS Busbar 630A", system: "busbar", quantity: "2" }],
      message: "This is my detailed project message that should stay internal only.",
    };
    const body = await captureAcknowledgementEmailBody(draftWithBasketAndPhone);
    expect(body.html).not.toContain("GS Busbar 630A");
    expect(body.html).not.toContain("This is my detailed project message");
    expect(body.html).not.toContain(draftWithBasketAndPhone.contact.phone);
    expect(body.text).not.toContain("GS Busbar 630A");
    expect(body.text).not.toContain(draftWithBasketAndPhone.contact.phone);
  });

  it("uses the Ukraine market team phrasing and labels for a ua submission", async () => {
    const uaDraft: EnquiryDraft = { ...BASE_DRAFT, market: "ua" };
    const body = await captureAcknowledgementEmailBody(uaDraft);
    expect(body.html).toContain("Україні");
    expect(body.html).toContain("Ukraine");
    expect(body.subject).toContain("Запит отримано");
  });

  it("never includes an attachment download link, even when a clean attachment exists", async () => {
    const body = await captureAcknowledgementEmailBody(BASE_DRAFT, [
      {
        file_name: "floor-plan.pdf",
        storage_object_path: "quarantine/IV-2026-000123/x/floor-plan.pdf",
        content_type: "application/pdf",
        size_bytes: 245_000,
        scan_status: "clean",
      },
    ]);
    expect(body.html).not.toContain("Download attachment");
    expect(body.html).not.toContain("floor-plan.pdf");
    expect(body.html).not.toContain("object/sign");
    expect(body.text).not.toContain("Download attachment");
    expect(body.text).not.toContain("object/sign");
  });
});

describe("sendEnquiryEmails — internal notification", () => {
  it("no-ops without attempting a request when Resend env vars are unset", async () => {
    vi.unstubAllEnvs();
    const mock = fetchMock();
    vi.stubGlobal("fetch", mock);
    await sendEnquiryEmails(BASE_DRAFT, "IV-2026-000123");
    expect(mock).not.toHaveBeenCalled();
  });

  it("includes the reference number prominently and escapes HTML-unsafe contact fields", async () => {
    const body = await captureInternalEmailBody(BASE_DRAFT);
    expect(body.subject).toContain("IV-2026-000123");
    expect(body.html).toContain("IV-2026-000123");
    expect(body.html).toContain("Acme &lt;Contractors&gt;");
    expect(body.html).not.toContain("Acme <Contractors>");
  });

  it("renders clickable mailto/tel links for contact email and phone", async () => {
    const body = await captureInternalEmailBody(BASE_DRAFT);
    expect(body.html).toContain('href="mailto:jane@example.test"');
    expect(body.html).toContain('href="tel:+447700900000"');
  });

  it("preserves message line breaks and omits empty optional sections", async () => {
    const body = await captureInternalEmailBody(BASE_DRAFT);
    expect(body.html).toContain("Line one\nLine two");
    // No project/product fields were set, so that section must not appear.
    expect(body.html).not.toContain("Project / Product Details");
    // No subject was set.
    expect(body.html).not.toContain(">Subject<");
  });

  it("shows the no-products fallback when the basket is empty", async () => {
    const body = await captureInternalEmailBody(BASE_DRAFT);
    expect(body.html).toContain("No products were added to this enquiry.");
    expect(body.text).toContain("No products were added to this enquiry.");
  });

  it("renders one table row per basket item with product/system/model/category/quantity", async () => {
    const draftWithItems: EnquiryDraft = {
      ...BASE_DRAFT,
      selectedItems: [
        { id: "a", title: "GS Busbar 630A", system: "busbar", model: "GS-630", categoryLabel: "Busbar Systems", quantity: "2" },
        { id: "b", title: "GNL Trunking", system: "cable-management", quantity: "1" },
      ],
    };
    const body = await captureInternalEmailBody(draftWithItems);
    expect(body.html).toContain("GS Busbar 630A");
    expect(body.html).toContain("GS-630");
    expect(body.html).toContain("Busbar Systems");
    expect(body.html).toContain("GNL Trunking");
    expect(body.html).not.toContain("No products were added");
    expect(body.text).toContain("GS Busbar 630A");
  });

  it("shows project/product detail fields only when populated, and never a source route or item id", async () => {
    const draftWithProject: EnquiryDraft = {
      ...BASE_DRAFT,
      project: { ...BASE_DRAFT.project, projectName: "New Data Centre", projectLocation: "" },
      technical: { ...BASE_DRAFT.technical, modelCode: "GS-630" },
      selectedItems: [
        { id: "internal-id-123", title: "GS Busbar 630A", system: "busbar", sourceRoute: "/products/busbar/gs", quantity: "2" },
      ],
    };
    const body = await captureInternalEmailBody(draftWithProject);
    expect(body.html).toContain("Project / Product Details");
    expect(body.html).toContain("New Data Centre");
    expect(body.html).not.toContain("Project Location");
    expect(body.html).not.toContain("internal-id-123");
    expect(body.html).not.toContain("/products/busbar/gs");
  });

  it("renders a clickable download link with a signed URL for a clean attachment", async () => {
    const objectPath = "quarantine/IV-2026-000123/attach-uuid-1/floor-plan.pdf";
    const body = await captureInternalEmailBody(BASE_DRAFT, [
      { file_name: "floor-plan.pdf", storage_object_path: objectPath, content_type: "application/pdf", size_bytes: 245_000, scan_status: "clean" },
    ]);
    expect(body.html).toContain("floor-plan.pdf");
    expect(body.html).toContain("Download attachment");
    expect(body.html).toContain("expires in 7 days");
    expect(body.html).toContain(
      `href="https://project.supabase.test/storage/v1/object/sign/private-enquiry-attachments/${objectPath}?token=mock-signed-token"`,
    );
    // the raw object path is legitimately part of the download href, but must
    // never also appear as separate, readable plain text in the email body
    expect(body.html).not.toMatch(/>[^<]*attach-uuid-1/);
    // the middot separator (contentType/size) must render as an entity, not literal escaped text
    expect(body.html).not.toContain("&amp;middot;");
    expect(body.text).toContain("floor-plan.pdf");
    expect(body.text).toContain("expires in 7 days");
    expect(body.text).toContain(
      `https://project.supabase.test/storage/v1/object/sign/private-enquiry-attachments/${objectPath}?token=mock-signed-token`,
    );
  });

  it("never renders an Attachments section when the enquiry has no recorded attachments", async () => {
    const body = await captureInternalEmailBody(BASE_DRAFT, []);
    expect(body.html).not.toContain("Download attachment");
    expect(body.html).not.toContain("Attachments");
  });

  it("never exposes the Supabase secret key or a raw service-role credential in either email", async () => {
    const objectPath = "quarantine/IV-2026-000123/attach-uuid-2/spec.pdf";
    const fixtures: readonly AttachmentFixture[] = [
      { file_name: "spec.pdf", storage_object_path: objectPath, content_type: "application/pdf", size_bytes: 1000, scan_status: "clean" },
    ];
    const internalBody = await captureInternalEmailBody(BASE_DRAFT, fixtures);
    const ackBody = await captureAcknowledgementEmailBody(BASE_DRAFT, fixtures);
    for (const body of [internalBody.html, internalBody.text, ackBody.html, ackBody.text]) {
      expect(body).not.toContain("test-secret-key");
      expect(body).not.toContain("service_role");
    }
  });
});

describe("sendEnquiryEmails — attachment scan-state gating", () => {
  it("shows a pending message and no link for an attachment still awaiting scan", async () => {
    const body = await captureInternalEmailBody(BASE_DRAFT, [
      {
        file_name: "drawing.dwg",
        storage_object_path: "quarantine/IV-2026-000123/p/drawing.dwg",
        content_type: "application/octet-stream",
        size_bytes: 50_000,
        scan_status: "pending",
      },
    ]);
    expect(body.html).toContain("drawing.dwg");
    expect(body.html).toContain("Security scan pending");
    expect(body.html).not.toContain("Download attachment");
    expect(body.text).toContain("Security scan pending");
  });

  it("shows a blocked message, no link, and no object path for an infected attachment", async () => {
    const body = await captureInternalEmailBody(BASE_DRAFT, [
      {
        file_name: "invoice.exe.zip",
        storage_object_path: "quarantine/IV-2026-000123/i/invoice.exe.zip",
        content_type: "application/zip",
        size_bytes: 12_000,
        scan_status: "infected",
      },
    ]);
    expect(body.html).toContain("Blocked by security scan");
    expect(body.html).not.toContain("Download attachment");
    expect(body.html).not.toMatch(/>[^<]*quarantine\/IV-2026-000123/);
    expect(body.text).toContain("Blocked by security scan");
  });

  it("shows a scan-failed message and no link when the scanner could not complete", async () => {
    const body = await captureInternalEmailBody(BASE_DRAFT, [
      {
        file_name: "spec-sheet.pdf",
        storage_object_path: "quarantine/IV-2026-000123/f/spec-sheet.pdf",
        content_type: "application/pdf",
        size_bytes: 30_000,
        scan_status: "scan_failed",
      },
    ]);
    expect(body.html).toContain("Security scan could not be completed");
    expect(body.html).not.toContain("Download attachment");
    expect(body.text).toContain("Security scan could not be completed");
  });

  it("never signs a download URL when the clean-only authorization check itself returns no match (defence in depth)", async () => {
    // list_ reports "clean", but the object path used for authorization
    // deliberately doesn't match any fixture, so get_clean_attachment_for_download
    // returns zero rows — mirrors a real gate rejecting a stale/mismatched
    // status rather than trusting the list query alone.
    const mock = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes("/rest/v1/rpc/list_enquiry_attachments_for_email")) {
        return {
          ok: true,
          text: async () => "",
          json: async () => [
            {
              file_name: "mismatched.pdf",
              storage_object_path: "quarantine/IV-2026-000123/m/mismatched.pdf",
              content_type: "application/pdf",
              size_bytes: 1000,
              scan_status: "clean",
            },
          ],
        };
      }
      if (url.includes("/rest/v1/rpc/get_clean_attachment_for_download")) {
        return { ok: true, text: async () => "", json: async () => [] };
      }
      return { ok: true, text: async () => "", json: async () => ({}) };
    });
    vi.stubGlobal("fetch", mock);
    await sendEnquiryEmails(BASE_DRAFT, "IV-2026-000123");
    const internalCall = resendCallMatching(mock, "sales@infravolt.test");
    if (!internalCall) throw new Error("internal notification call not found");
    const body = JSON.parse(internalCall[1].body as string) as { html: string };
    expect(body.html).not.toContain("Download attachment");
    expect(body.html).toContain("mismatched.pdf");
  });
});

describe("sendEnquiryEmails — internal and customer emails use identical display formatting", () => {
  const messyDraft: EnquiryDraft = {
    ...BASE_DRAFT,
    type: "technical-document",
    contact: {
      ...BASE_DRAFT.contact,
      firstName: "erhan",
      lastName: "baydi",
      jobTitle: "ceo",
      company: "  infravolt   solutions  ",
    },
  };

  it("shows a title-cased name, uppercase job-title acronym, and normalised brand casing in the internal email", async () => {
    const body = await captureInternalEmailBody(messyDraft);
    expect(body.html).toContain("Erhan Baydi");
    expect(body.html).not.toContain(">erhan baydi<");
    expect(body.html).toContain(">CEO<");
    expect(body.html).toContain("InfraVolt Solutions");
  });

  it("shows the same title-cased name in the customer acknowledgement, and never a raw enquiry type or market code in either email", async () => {
    const ackBody = await captureAcknowledgementEmailBody(messyDraft);
    const internalBody = await captureInternalEmailBody(messyDraft);

    expect(ackBody.html).toContain("Erhan Baydi");
    expect(ackBody.html).toContain("Technical Documents");
    expect(ackBody.html).toContain("United Kingdom");
    expect(ackBody.text).toContain("Technical Documents");

    expect(internalBody.html).toContain("Technical Documents");
    expect(internalBody.html).toContain("United Kingdom");
    expect(internalBody.text).toContain("Technical Documents");
    expect(internalBody.text).toContain("United Kingdom");

    for (const body of [ackBody.html, ackBody.text, internalBody.html, internalBody.text]) {
      expect(body).not.toContain("technical-document");
      // The old bug rendered the market as a bare cell/line value ">UK<" or "Market: UK" —
      // check for that specific shape, not a blanket "uk" substring (the acknowledgement
      // footer legitimately shows the site hostname, e.g. "uk.infravolt.test").
      expect(body).not.toContain(">UK<");
      expect(body).not.toContain("Market: UK");
    }
  });

  it("never rewrites product/system technical identifiers (no blind title-casing)", async () => {
    const draftWithTechnicalItem: EnquiryDraft = {
      ...BASE_DRAFT,
      technical: { ...BASE_DRAFT.technical, modelCode: "GNL-630 TEX-LED IP66" },
      selectedItems: [{ id: "a", title: "GGD Busbar", system: "busbar", model: "LDB-FL", quantity: "1" }],
    };
    const body = await captureInternalEmailBody(draftWithTechnicalItem);
    expect(body.html).toContain("GNL-630 TEX-LED IP66");
    expect(body.html).toContain("GGD Busbar");
    expect(body.html).toContain("LDB-FL");
  });
});

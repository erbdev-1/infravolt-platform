"use server";

import type { MarketCode } from "@/modules/markets/types";

import { sendEnquiryEmails } from "./email";
import { isEnquiryType } from "./types";
import type { EnquiryItem, EnquirySourceContext, EnquiryType } from "./types";

export type EnquiryContactDetails = Readonly<{
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
}>;

export type EnquiryProjectDetails = Readonly<{
  projectName: string;
  projectLocation: string;
  projectType: string;
  projectStage: string;
  estimatedQuantity: string;
  requiredDate: string;
  interestedSystems: readonly string[];
}>;

export type EnquiryTechnicalDetails = Readonly<{
  productSystem: string;
  productSeries: string;
  modelCode: string;
  informationRequired: readonly string[];
  documentsRequired: readonly string[];
}>;

/**
 * Frontend-only submission model. Intentionally decoupled from the database
 * schema shape — see supabase/migrations/20260823080000_enquiries_partners_accounts_foundation.sql
 * and .../20260823090000_submit_enquiry_rpc.sql for how this maps onto
 * private.enquiries / private.enquiry_items.
 */
export type EnquiryDraft = Readonly<{
  type: EnquiryType;
  market: MarketCode;
  /** Only meaningful for "general" enquiries today; carried for every type rather than dropped. */
  subject: string;
  contact: EnquiryContactDetails;
  project: EnquiryProjectDetails;
  technical: EnquiryTechnicalDetails;
  selectedItems: readonly EnquiryItem[];
  attachmentNames: readonly string[];
  message: string;
  sourceContext: EnquirySourceContext;
}>;

export type EnquirySubmitResult =
  | Readonly<{ ok: true; referenceNo: string }>
  | Readonly<{ ok: false; error: "not-configured" | "network" }>;

function isNonEmptyString(value: string): boolean {
  return value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidMarket(value: MarketCode): boolean {
  return value === "uk" || value === "ua";
}

/**
 * Defence-in-depth server-side validation. The Contact UI already validates
 * before calling this action; this guards the database against a malformed
 * or bypassed call rather than duplicating the full client-side UX rules.
 */
function isValidDraft(draft: EnquiryDraft): boolean {
  if (!isEnquiryType(draft.type)) return false;
  if (!isValidMarket(draft.market)) return false;

  const { firstName, lastName, company, jobTitle, email, phone } = draft.contact;
  if (![firstName, lastName, company, jobTitle, phone].every(isNonEmptyString)) return false;
  if (!isValidEmail(email)) return false;

  return true;
}

type SubmitEnquiryRpcParams = Readonly<{
  p_type: EnquiryType;
  p_market: MarketCode;
  p_subject: string;
  p_first_name: string;
  p_last_name: string;
  p_company: string;
  p_job_title: string;
  p_email: string;
  p_phone: string;
  p_project_name: string;
  p_project_location: string;
  p_project_type: string;
  p_project_stage: string;
  p_estimated_quantity: string;
  p_required_date: string;
  p_interested_systems: readonly string[];
  p_product_system: string;
  p_product_series: string;
  p_model_code: string;
  p_information_required: readonly string[];
  p_documents_required: readonly string[];
  p_message: string;
  p_source_context: EnquirySourceContext;
  p_items: readonly Readonly<{
    clientItemId: string;
    title: string;
    system: string;
    model: string | null;
    categoryLabel: string | null;
    sourceRoute: string | null;
    quantity: string | null;
    sortOrder: number;
  }>[];
}>;

function toRpcParams(draft: EnquiryDraft): SubmitEnquiryRpcParams {
  return {
    p_type: draft.type,
    p_market: draft.market,
    p_subject: draft.subject,
    p_first_name: draft.contact.firstName,
    p_last_name: draft.contact.lastName,
    p_company: draft.contact.company,
    p_job_title: draft.contact.jobTitle,
    p_email: draft.contact.email,
    p_phone: draft.contact.phone,
    p_project_name: draft.project.projectName,
    p_project_location: draft.project.projectLocation,
    p_project_type: draft.project.projectType,
    p_project_stage: draft.project.projectStage,
    p_estimated_quantity: draft.project.estimatedQuantity,
    p_required_date: draft.project.requiredDate,
    p_interested_systems: draft.project.interestedSystems,
    p_product_system: draft.technical.productSystem,
    p_product_series: draft.technical.productSeries,
    p_model_code: draft.technical.modelCode,
    p_information_required: draft.technical.informationRequired,
    p_documents_required: draft.technical.documentsRequired,
    p_message: draft.message,
    p_source_context: draft.sourceContext,
    p_items: draft.selectedItems.map((item, index) => ({
      clientItemId: item.id,
      title: item.title,
      system: item.system,
      model: item.model ?? null,
      categoryLabel: item.categoryLabel ?? null,
      sourceRoute: item.sourceRoute ?? null,
      quantity: item.quantity ?? null,
      sortOrder: index,
    })),
  };
}

/**
 * Persists an enquiry via the public.submit_enquiry() RPC (SECURITY DEFINER
 * — the only write path into private.enquiries / private.enquiry_items; see
 * the migration for why direct table access isn't possible). Runs
 * server-side only: this file is a Server Action module ("use server"), so
 * SUPABASE_SECRET_KEY never reaches the client bundle, and the browser has
 * no way to call Supabase directly — only this action can.
 *
 * Website attachment upload is currently disabled, so after persistence
 * this same trusted server request can trigger the best-effort enquiry
 * emails before returning the reference number. Email delivery failure is
 * logged without changing the successful persistence result.
 */
export async function submitEnquiry(draft: EnquiryDraft): Promise<EnquirySubmitResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    return { ok: false, error: "not-configured" };
  }

  if (!isValidDraft(draft)) {
    return { ok: false, error: "network" };
  }

  let referenceNo: string;

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/rpc/submit_enquiry`, {
      method: "POST",
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toRpcParams(draft)),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("submitEnquiry: Supabase RPC request failed", response.status, body.slice(0, 500));
      return { ok: false, error: "network" };
    }

    const parsed: unknown = await response.json();
    if (typeof parsed !== "string" || parsed.length === 0) {
      console.error("submitEnquiry: unexpected RPC response shape");
      return { ok: false, error: "network" };
    }

    referenceNo = parsed;
  } catch (error) {
    console.error("submitEnquiry: request threw", error);
    return { ok: false, error: "network" };
  }

  try {
    await sendEnquiryEmails(draft, referenceNo);
  } catch (error) {
    console.error("submitEnquiry: saved enquiry but email delivery threw", {
      referenceNo,
      error,
    });
  }

  return { ok: true, referenceNo };
}

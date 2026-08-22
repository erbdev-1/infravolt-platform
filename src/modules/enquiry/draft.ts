import type { MarketCode } from "@/modules/markets/types";

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
 * Frontend-only submission model. Intentionally decoupled from any eventual
 * database schema — a future backend maps this onto `enquiries` /
 * `enquiry_items` / `enquiry_attachments` tables without this shape changing.
 */
export type EnquiryDraft = Readonly<{
  type: EnquiryType;
  market: MarketCode;
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

/**
 * No backend is wired up yet. This stub exists so the form/UI architecture
 * is final and the eventual Supabase/email integration only has to replace
 * this one function body — never call a persistence API directly from a
 * presentation component.
 */
export async function submitEnquiry(_draft: EnquiryDraft): Promise<EnquirySubmitResult> {
  return { ok: false, error: "not-configured" };
}

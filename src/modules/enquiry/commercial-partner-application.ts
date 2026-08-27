"use server";

import type { MarketCode } from "@/modules/markets/types";

/**
 * Frontend-only submission model for the Commercial Partner Application
 * (/commercial-partners) — deliberately separate from EnquiryDraft (draft.ts,
 * the /contact page's typed enquiries) and from any future Trade Account
 * submission model (/trade-account is a distinct, still-in-development
 * feature with its own route and content). A submitted application is an
 * expression of interest only: it never implies appointment, authorisation,
 * pricing or a credit relationship until InfraVolt reviews it and confirms
 * in writing — see `declarationAccepted`.
 */
export type CommercialPartnerApplicationDraft = Readonly<{
  type: "commercial-partner";
  market: MarketCode;
  companyName: string;
  website: string;
  /** Free-text city/country — kept light; this is not a KYB/registered-address collection step. */
  companyLocation: string;
  /** Optional signal of business maturity — never required. */
  yearsTrading: string;
  businessType: string;
  /** Filtered by businessType in the form (see PARTNERSHIP_INTEREST_GROUPS) — never offers InfraVolt's own distributor role. */
  partnershipInterest: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  /** Where the applicant already sells/supplies/supports today. */
  currentSalesServiceCoverage: readonly string[];
  /** What the applicant is asking InfraVolt for — kept structurally distinct from currentSalesServiceCoverage above. */
  requestedDealershipTerritory: Readonly<{
    scale: string;
    regions: readonly string[];
    cities: string;
  }>;
  productSystemInterests: readonly string[];
  industryInterests: readonly string[];
  commercialRequirements: string;
  declarationAccepted: boolean;
  sourcePath: string;
}>;

export type CommercialPartnerApplicationSubmitResult =
  | Readonly<{ ok: true; referenceNo: string }>
  | Readonly<{ ok: false; error: "not-configured" | "network" }>;

// Mirrors the fixed businessTypeOptions in commercial-partners-content.ts —
// defence in depth against a tampered client call (the form itself only
// ever offers one of these). Keep in sync if that list changes.
const BUSINESS_TYPES = new Set([
  "electrical-contractor",
  "me-contractor",
  "main-epc-contractor",
  "electrical-wholesaler",
  "dealer-reseller",
  "consultant-specifier",
  "developer",
  "facilities-maintenance",
  "other",
]);

const MAX_LENGTHS = {
  companyName: 200,
  website: 300,
  companyLocation: 200,
  yearsTrading: 50,
  jobTitle: 150,
  contactName: 200,
  email: 320,
  phone: 50,
  listItem: 100,
  requestedCities: 500,
  commercialRequirements: 5000,
  sourcePath: 200,
} as const;

const MAX_LIST_ITEMS = 20;

function isNonEmptyString(value: string): boolean {
  return value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidMarket(value: MarketCode): boolean {
  return value === "uk" || value === "ua";
}

/** Trim + collapse internal whitespace + hard length cap — safe normalization for any free-text field going to the DB. */
function clean(value: string, maxLength: number): string {
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanList(values: readonly string[], maxLength: number): readonly string[] {
  return values
    .slice(0, MAX_LIST_ITEMS)
    .map((value) => clean(value, maxLength))
    .filter((value) => value.length > 0);
}

/**
 * Defence-in-depth server-side validation. The Commercial Partners form
 * already validates before calling this action; this guards the database
 * against a malformed or bypassed call rather than duplicating the full
 * client-side UX rules.
 */
function isValidDraft(draft: CommercialPartnerApplicationDraft): boolean {
  if (!isValidMarket(draft.market)) return false;
  if (!isNonEmptyString(draft.companyName)) return false;
  if (!BUSINESS_TYPES.has(draft.businessType)) return false;
  if (!isNonEmptyString(draft.partnershipInterest)) return false;
  if (draft.currentSalesServiceCoverage.length === 0) return false;
  if (!isNonEmptyString(draft.requestedDealershipTerritory.scale)) return false;
  if (draft.productSystemInterests.length === 0) return false;
  if (!isNonEmptyString(draft.contactName)) return false;
  if (!isNonEmptyString(draft.jobTitle)) return false;
  if (!isValidEmail(draft.email)) return false;
  if (!isNonEmptyString(draft.phone)) return false;
  if (!draft.declarationAccepted) return false;
  return true;
}

type SubmitCommercialPartnerApplicationRpcParams = Readonly<{
  p_market: MarketCode;
  p_company_name: string;
  p_website: string;
  p_company_location: string;
  p_years_trading: string;
  p_business_type: string;
  p_partnership_interest: string;
  p_contact_name: string;
  p_job_title: string;
  p_email: string;
  p_phone: string;
  p_current_sales_service_coverage: readonly string[];
  p_requested_dealership_scale: string;
  p_requested_dealership_regions: readonly string[];
  p_requested_dealership_cities: string;
  p_product_system_interests: readonly string[];
  p_industry_interests: readonly string[];
  p_commercial_requirements: string;
  p_declaration_accepted: boolean;
  p_source_path: string;
}>;

function toRpcParams(draft: CommercialPartnerApplicationDraft): SubmitCommercialPartnerApplicationRpcParams {
  return {
    p_market: draft.market,
    p_company_name: clean(draft.companyName, MAX_LENGTHS.companyName),
    p_website: clean(draft.website, MAX_LENGTHS.website),
    p_company_location: clean(draft.companyLocation, MAX_LENGTHS.companyLocation),
    p_years_trading: clean(draft.yearsTrading, MAX_LENGTHS.yearsTrading),
    p_business_type: draft.businessType,
    p_partnership_interest: clean(draft.partnershipInterest, MAX_LENGTHS.listItem),
    p_contact_name: clean(draft.contactName, MAX_LENGTHS.contactName),
    p_job_title: clean(draft.jobTitle, MAX_LENGTHS.jobTitle),
    p_email: draft.email.trim().toLowerCase().slice(0, MAX_LENGTHS.email),
    p_phone: clean(draft.phone, MAX_LENGTHS.phone),
    p_current_sales_service_coverage: cleanList(draft.currentSalesServiceCoverage, MAX_LENGTHS.listItem),
    p_requested_dealership_scale: clean(draft.requestedDealershipTerritory.scale, MAX_LENGTHS.listItem),
    p_requested_dealership_regions: cleanList(draft.requestedDealershipTerritory.regions, MAX_LENGTHS.listItem),
    p_requested_dealership_cities: clean(draft.requestedDealershipTerritory.cities, MAX_LENGTHS.requestedCities),
    p_product_system_interests: cleanList(draft.productSystemInterests, MAX_LENGTHS.listItem),
    p_industry_interests: cleanList(draft.industryInterests, MAX_LENGTHS.listItem),
    p_commercial_requirements: clean(draft.commercialRequirements, MAX_LENGTHS.commercialRequirements),
    p_declaration_accepted: draft.declarationAccepted,
    p_source_path: clean(draft.sourcePath, MAX_LENGTHS.sourcePath),
  };
}

/**
 * Persists an application via the public.submit_commercial_partner_application()
 * RPC (SECURITY DEFINER — the only write path into
 * private.commercial_partner_applications; see
 * supabase/migrations/20260823130000_commercial_partner_application_rpc.sql
 * for why direct table access isn't possible, and for the rate-limit /
 * duplicate-submission guard enforced inside that same transaction). Runs
 * server-side only: this file is a Server Action module ("use server"), so
 * SUPABASE_SECRET_KEY never reaches the client bundle.
 *
 * Initial status is always 'pending_review' — this function has no way to
 * mark an application approved/declined, by design; that only ever happens
 * through InfraVolt's own internal review process. Email sending is a
 * deliberately separate step, called by the caller
 * (commercial-partner-application-form.tsx) after this resolves — not from
 * here — matching the /contact submission pattern (see
 * src/modules/enquiry/draft.ts). Errors never leak SQL/Supabase internals —
 * every failure collapses to the same generic "network" result.
 */
export async function submitCommercialPartnerApplication(
  draft: CommercialPartnerApplicationDraft,
): Promise<CommercialPartnerApplicationSubmitResult> {
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
    const response = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/rpc/submit_commercial_partner_application`, {
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
      console.error("submitCommercialPartnerApplication: Supabase RPC request failed", response.status, body.slice(0, 500));
      return { ok: false, error: "network" };
    }

    const parsed: unknown = await response.json();
    if (typeof parsed !== "string" || parsed.length === 0) {
      console.error("submitCommercialPartnerApplication: unexpected RPC response shape");
      return { ok: false, error: "network" };
    }

    referenceNo = parsed;
  } catch (error) {
    console.error("submitCommercialPartnerApplication: request threw", error);
    return { ok: false, error: "network" };
  }

  return { ok: true, referenceNo };
}

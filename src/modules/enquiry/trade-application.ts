import type { MarketCode } from "@/modules/markets/types";

/**
 * Frontend-only submission model for the Commercial Partner Application
 * (/commercial-partners) — deliberately separate from EnquiryDraft (draft.ts)
 * since a commercial application carries a materially different field set
 * (company registration, VAT, turnover, distribution profile) and is not
 * one of the /contact page's EnquiryType tabs. Named "trade" to match the
 * project's existing enquiry-type naming convention.
 */
export type TradeApplicationDraft = Readonly<{
  type: "trade";
  market: MarketCode;
  companyLegalName: string;
  tradingName: string;
  companyRegistrationNumber: string;
  vatTaxNumber: string;
  registeredAddress: string;
  tradingAddress: string;
  website: string;
  yearEstablished: string;
  annualTurnoverBand: string;
  employeeBand: string;
  companyBranchCount: string;
  companyWarehouseCapability: string;
  salesTeamSize: string;
  technicalTeamCapability: string;
  businessType: string;
  // "Relationship the applicant is requesting" — dynamically filtered by
  // businessType in the form (see PARTNERSHIP_INTEREST_GROUPS). Deliberately
  // never offers InfraVolt's own UK/Ukraine distributor role as an option.
  partnershipInterest: string;
  // Market itself is never asked — it is the trusted market this draft was
  // built under (see `market` above, from resolveTrustedMarketContext).
  coverageRegions: readonly string[];
  mainAreasServed: string;
  territoryType: string;
  requestedRegions: readonly string[];
  requestedCities: string;
  primaryIndustries: readonly string[];
  productSystems: readonly string[];
  contactName: string;
  jobTitle: string;
  workEmail: string;
  phone: string;
  accountsEmail: string;
  expectedAnnualPurchasing: string;
  expectedStart: string;
  purchasingPattern: string;
  // Dealer / wholesaler / reseller branch only — "" when not applicable.
  existingBrands: string;
  holdsStock: string;
  salesChannels: readonly string[];
  customerBase: readonly string[];
  // Contractor/project-partner and consultant/specifier branches share this
  // shape — "" when neither branch is showing for this applicant.
  hasCurrentProject: string;
  projectName: string;
  projectLocation: string;
  projectStage: string;
  requiredDate: string;
  projectRequirement: string;
  // Consultant / specifier branch only — "" when not applicable.
  commercialProjectRole: string;
  additionalInformation: string;
  attachmentNames: readonly string[];
  sourcePage: string;
}>;

export type TradeApplicationSubmitResult =
  | Readonly<{ ok: true; referenceNo: string }>
  | Readonly<{ ok: false; error: "not-configured" | "network" }>;

/**
 * No backend is wired up yet — mirrors submitEnquiry (draft.ts) 1:1 so the
 * eventual Supabase/email integration only has to replace this one
 * function body. Never call a persistence API directly from a
 * presentation component; never fake a saved/approved state here.
 */
export async function submitTradeApplication(
  _draft: TradeApplicationDraft,
): Promise<TradeApplicationSubmitResult> {
  return { ok: false, error: "not-configured" };
}

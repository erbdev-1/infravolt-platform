import { isEnquirySystemKey, isEnquiryType, type EnquirySourceContext, type EnquiryType } from "./types";

export const ENQUIRY_REVIEW_ANCHOR = "your-enquiry";
export const PRODUCT_ENQUIRY_REVIEW_HREF = `/contact?type=product#${ENQUIRY_REVIEW_ANCHOR}`;

/** Builds a safe /contact URL carrying only short canonical identifiers — never raw product data. */
export function buildEnquiryHref(type: EnquiryType, context?: EnquirySourceContext): string {
  const params = new URLSearchParams();
  params.set("type", type);
  if (context?.system) params.set("system", context.system);
  if (context?.family) params.set("family", context.family);
  if (context?.model) params.set("model", context.model);
  if (context?.label) params.set("label", context.label);
  if (context?.industry) params.set("industry", context.industry);
  if (context?.industryLabel) params.set("industryLabel", context.industryLabel);
  if (context?.zone) params.set("zone", context.zone);
  if (context?.zoneLabel) params.set("zoneLabel", context.zoneLabel);
  if (context?.hotspot) params.set("hotspot", context.hotspot);
  if (context?.source) params.set("source", context.source);
  return `/contact?${params.toString()}`;
}

export type ContactRouteSearchParams = Readonly<{
  type?: string | string[];
  system?: string | string[];
  family?: string | string[];
  model?: string | string[];
  label?: string | string[];
  industry?: string | string[];
  industryLabel?: string | string[];
  zone?: string | string[];
  zoneLabel?: string | string[];
  hotspot?: string | string[];
  source?: string | string[];
}>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function canonicalIdentifier(value: string | string[] | undefined): string | undefined {
  const candidate = firstValue(value);
  return candidate && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate)
    ? candidate
    : undefined;
}

function shortDisplayLabel(value: string | string[] | undefined): string | undefined {
  const candidate = firstValue(value)?.trim();
  return candidate && candidate.length <= 120 ? candidate : undefined;
}

function safeSourcePath(value: string | string[] | undefined): string | undefined {
  const candidate = firstValue(value);
  return candidate && /^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(candidate)
    ? candidate
    : undefined;
}

export type ParsedEnquiryContext = Readonly<{
  type: EnquiryType;
  context: EnquirySourceContext;
}>;

/** Validates and narrows raw route searchParams into a trusted enquiry type + source context. */
export function parseEnquiryContext(searchParams: ContactRouteSearchParams): ParsedEnquiryContext {
  const rawType = firstValue(searchParams.type);
  const type = isEnquiryType(rawType) ? rawType : "general";

  const rawSystem = firstValue(searchParams.system);
  const system = isEnquirySystemKey(rawSystem) ? rawSystem : undefined;

  return {
    type,
    context: {
      system,
      family: firstValue(searchParams.family),
      model: firstValue(searchParams.model),
      label: firstValue(searchParams.label),
      industry: canonicalIdentifier(searchParams.industry),
      industryLabel: shortDisplayLabel(searchParams.industryLabel),
      zone: canonicalIdentifier(searchParams.zone),
      zoneLabel: shortDisplayLabel(searchParams.zoneLabel),
      hotspot: canonicalIdentifier(searchParams.hotspot),
      source: safeSourcePath(searchParams.source),
    },
  };
}

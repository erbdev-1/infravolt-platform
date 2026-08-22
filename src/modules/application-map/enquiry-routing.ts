import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type {
  EnquirySourceContext,
  EnquirySystemKey,
  EnquiryType,
} from "@/modules/enquiry/types";

import type { ProductAction } from "./types";

const LEGACY_REQUEST_TYPES: Readonly<Record<string, EnquiryType>> = {
  "technical-pack": "technical-document",
  "technical-question": "technical",
  quote: "quote",
  project: "project",
  "project-support": "project",
  "discuss-project": "project",
  general: "general",
};

export type ApplicationMapEnquiryContext = Readonly<{
  industry: string;
  industryLabel: string;
  zone: string;
  zoneLabel: string;
  hotspot: string;
  system: EnquirySystemKey;
  source: string;
  family?: string;
  label?: string;
}>;

function enquiryTypeForAction(action: ProductAction): EnquiryType | undefined {
  if (action.type === "page") {
    return undefined;
  }

  const legacyUrl = new URL(action.href, "https://infravolt.invalid");
  const legacyRequest = legacyUrl.searchParams.get("request");

  if (legacyRequest && LEGACY_REQUEST_TYPES[legacyRequest]) {
    return LEGACY_REQUEST_TYPES[legacyRequest];
  }

  if (action.type === "question") {
    return "technical";
  }

  const normalizedLabel = action.label.toLocaleLowerCase("en-GB");
  if (normalizedLabel.includes("technical pack")) return "technical-document";
  if (normalizedLabel.includes("quote")) return "quote";
  if (normalizedLabel.includes("technical")) return "technical";
  if (normalizedLabel.includes("project")) return "project";
  if (normalizedLabel.includes("general")) return "general";

  return undefined;
}

/** Keeps navigation CTAs intact and routes enquiry CTAs through the central Contact workspace. */
export function routeApplicationMapActions(
  actions: readonly ProductAction[],
  context: ApplicationMapEnquiryContext,
): readonly ProductAction[] {
  return actions.map((action) => {
    const enquiryType = enquiryTypeForAction(action);
    if (!enquiryType) return action;

    const sourceContext: EnquirySourceContext = context;
    return {
      ...action,
      href: buildEnquiryHref(enquiryType, sourceContext),
    };
  });
}

/** Returns a canonical product-family slug only when an existing product CTA proves it. */
export function productFamilySlugFromActions(
  actions: readonly ProductAction[],
  system: EnquirySystemKey,
): string | undefined {
  const prefix = `/products/${system}/`;
  const familyAction = actions.find(
    (action) => action.type === "page" && action.href.startsWith(prefix),
  );

  if (!familyAction) return undefined;

  const slug = familyAction.href.slice(prefix.length).split(/[?#/]/, 1)[0];
  return slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : undefined;
}

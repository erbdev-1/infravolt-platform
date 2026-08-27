import type { MarketCode } from "@/modules/markets/types";
import { contactPageContentForMarket } from "@/modules/public-site/contact-content";

import type { EnquiryType } from "./types";

/**
 * Central display-formatting rules for Contact data — the single source of
 * truth so the internal notification email, the customer acknowledgement
 * email, and the Contact success screen can never develop separate
 * formatting logic. Formats at the presentation layer only: nothing here
 * touches stored/submitted values (EnquiryDraft, the database, or the
 * Resend request itself) — every function is a pure string -> string
 * transform applied only where a value is rendered for a human to read.
 */

const JOB_TITLE_ACRONYMS = new Set(["ceo", "cto", "cfo", "md", "qa", "hr"]);

/** Trim + collapse duplicate internal whitespace. Safe for any short display field. */
export function cleanText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

/**
 * Trim only — never collapses internal whitespace or touches casing. Use
 * for values whose exact content must be preserved (email addresses, phone
 * numbers) — a phone number's internal spacing (e.g. "+44 20 1234 5678")
 * is meaningful and must not be altered beyond trimming stray edges.
 */
export function trimOnly(value: string): string {
  return value.trim();
}

function capitalizeSegment(segment: string): string {
  if (!segment) return segment;
  return segment[0].toUpperCase() + segment.slice(1).toLowerCase();
}

/** Title-cases each word, capitalizing after internal hyphens/apostrophes too (O'Brien, Mary-Jane). */
function toTitleCase(value: string): string {
  return value
    .split(" ")
    .map((word) =>
      word
        .split(/(['-])/)
        .map((part) => (part === "-" || part === "'" ? part : capitalizeSegment(part)))
        .join(""),
    )
    .join(" ");
}

/** "erhan baydi" -> "Erhan Baydi" */
export function formatPersonName(firstName: string, lastName: string): string {
  return toTitleCase(cleanText(`${firstName} ${lastName}`));
}

/**
 * "ceo" -> "CEO", "project manager" -> "Project Manager". Common
 * acronyms/short forms are preserved uppercase; everything else gets
 * sensible title case.
 */
export function formatJobTitle(jobTitle: string): string {
  const cleaned = cleanText(jobTitle);
  if (!cleaned) return cleaned;
  return cleaned
    .split(" ")
    .map((word) => (JOB_TITLE_ACRONYMS.has(word.toLowerCase()) ? word.toUpperCase() : toTitleCase(word)))
    .join(" ");
}

function isAllUpperCase(word: string): boolean {
  return word === word.toUpperCase() && word !== word.toLowerCase();
}

function isAllLowerCase(word: string): boolean {
  return word === word.toLowerCase() && word !== word.toUpperCase();
}

/**
 * Rewrites an all-lowercase word ("solutions" -> "Solutions") or a long
 * all-caps word that reads as shouting rather than an abbreviation
 * ("SOLUTIONS" -> "Solutions"). A short all-caps word (UK, US, EU, LTD,
 * PLC) is left as typed — short all-caps is almost always a deliberate
 * abbreviation, not accidental caps-lock (mirrors the same reasoning as
 * the job-title acronym list above). A word with genuine mixed case (PwC,
 * eBay, McKinsey, iOS) is always left completely untouched, since blindly
 * title-casing it would corrupt a real brand's own casing.
 */
function formatCompanyWord(word: string): string {
  if (isAllLowerCase(word)) return capitalizeSegment(word);
  if (isAllUpperCase(word) && word.length > 3) return capitalizeSegment(word);
  return word;
}

/**
 * Trims/collapses whitespace, presents an all-caps or all-lowercase
 * company name in title case, and normalises the InfraVolt brand name's
 * casing specifically ("infravolt" -> "InfraVolt"). Genuinely mixed-case
 * input (PwC, eBay) is preserved exactly as entered — never blindly
 * title-cased, which would corrupt it.
 */
export function formatCompanyName(company: string): string {
  const titled = cleanText(company).split(" ").map(formatCompanyWord).join(" ");
  return titled.replace(/\binfravolt\b/gi, "InfraVolt");
}

/** "uk" -> "United Kingdom", "ua" -> "Ukraine" — never the raw market code. */
export function formatMarket(market: MarketCode): string {
  return market === "ua" ? "Ukraine" : "United Kingdom";
}

/**
 * "quote" -> "Request a Quote", "technical-document" -> "Technical
 * Documents", etc. Reuses the exact labels already shown on the Contact
 * page itself (contactPageContentForMarket's typeOptions) rather than a
 * second, independent enum->label map — so the site UI, the success
 * screen, and both emails can never drift apart on enquiry-type wording.
 */
export function formatEnquiryType(type: EnquiryType, market: MarketCode): string {
  const content = contactPageContentForMarket(market);
  return content.typeOptions.find((option) => option.id === type)?.label ?? type;
}

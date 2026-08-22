import type { MarketCode } from "@/modules/markets/types";

export const ENQUIRY_TYPES = [
  "product",
  "quote",
  "technical",
  "technical-document",
  "project",
  "general",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export function isEnquiryType(value: string | undefined): value is EnquiryType {
  return ENQUIRY_TYPES.includes(value as EnquiryType);
}

export const ENQUIRY_SYSTEM_KEYS = [
  "busbar",
  "cable-management",
  "earthing-lightning",
  "underfloor",
  "led-systems",
  "ev-charging",
  "g-bus",
] as const;

export type EnquirySystemKey = (typeof ENQUIRY_SYSTEM_KEYS)[number];

export function isEnquirySystemKey(value: string | undefined): value is EnquirySystemKey {
  return ENQUIRY_SYSTEM_KEYS.includes(value as EnquirySystemKey);
}

const SYSTEM_LABELS: Record<MarketCode, Record<EnquirySystemKey, string>> = {
  uk: {
    busbar: "Busbar Systems",
    "cable-management": "Cable Management",
    "earthing-lightning": "Earthing & Lightning Protection",
    underfloor: "Underfloor Cable Trunking",
    "led-systems": "LED Systems",
    "ev-charging": "EV Charging",
    "g-bus": "G-BUS Automation",
  },
  ua: {
    busbar: "Шинопровідні системи",
    "cable-management": "Кабельні системи",
    "earthing-lightning": "Заземлення та блискавкозахист",
    underfloor: "Підпідлогові кабельні системи",
    "led-systems": "LED-системи",
    "ev-charging": "Заряджання електромобілів",
    "g-bus": "G-BUS Automation",
  },
};

export function enquirySystemLabel(system: EnquirySystemKey, market: MarketCode): string {
  return SYSTEM_LABELS[market][system];
}

export function enquirySystemLabelsForMarket(market: MarketCode): readonly { key: EnquirySystemKey; label: string }[] {
  return ENQUIRY_SYSTEM_KEYS.map((key) => ({ key, label: SYSTEM_LABELS[market][key] }));
}

/** A product/family/model a user has flagged for a quote or technical enquiry — carried across pages. */
export type EnquiryItem = Readonly<{
  id: string;
  title: string;
  system: EnquirySystemKey;
  model?: string;
  categoryLabel?: string;
  sourceRoute?: string;
  /** Optional project quantity. Safe product context only; never contact data. */
  quantity?: string;
}>;

/** Safe, non-PII context captured from the page a user clicked an enquiry CTA on. */
export type EnquirySourceContext = Readonly<{
  system?: EnquirySystemKey;
  family?: string;
  model?: string;
  label?: string;
  industry?: string;
  industryLabel?: string;
  zone?: string;
  zoneLabel?: string;
  hotspot?: string;
  source?: string;
}>;

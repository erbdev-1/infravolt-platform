import type { MarketCode } from "@/modules/markets/types";

export type ConsentCopy = Readonly<{
  message: string;
  acceptLabel: string;
  rejectLabel: string;
  preferencesTriggerLabel: string;
}>;

const CONSENT_COPY: Readonly<Record<MarketCode, ConsentCopy>> = {
  uk: {
    message:
      "We use optional analytics cookies to understand how visitors use InfraVolt and improve the site. You can accept or reject analytics cookies.",
    acceptLabel: "Accept analytics",
    rejectLabel: "Reject",
    preferencesTriggerLabel: "Cookie settings",
  },
  ua: {
    message:
      "Ми використовуємо необов’язкові аналітичні файли cookie, щоб розуміти, як відвідувачі користуються InfraVolt, і покращувати сайт. Ви можете дозволити або відхилити аналітичні файли cookie.",
    acceptLabel: "Дозволити аналітику",
    rejectLabel: "Відхилити",
    preferencesTriggerLabel: "Налаштування cookie",
  },
};

export function consentCopyForMarket(market: MarketCode): ConsentCopy {
  return CONSENT_COPY[market];
}

import type { MarketCode } from "@/modules/markets/types";

/** Correct UK "1 item / 2 items" vs. Ukrainian 1/2-4/5+ plural-form count text, shared by every enquiry-count surface. */
export function enquiryItemCountLabel(count: number, market: MarketCode): string {
  if (market === "uk") return `${count} ${count === 1 ? "item" : "items"}`;

  const lastTwo = count % 100;
  const lastOne = count % 10;
  const noun =
    lastTwo >= 11 && lastTwo <= 14
      ? "позицій"
      : lastOne === 1
        ? "позиція"
        : lastOne >= 2 && lastOne <= 4
          ? "позиції"
          : "позицій";

  return `${count} ${noun}`;
}

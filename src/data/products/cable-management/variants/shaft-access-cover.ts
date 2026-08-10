import type { CableManagementVariant } from "../types";

// Shaft Access Cover is a custom / made-to-order product manufactured to
// project dimensions — it has no catalogue order-code table. The 60 rows
// previously here (GCMC-* ladder/roofed/vertical-bend covers) were the
// wrong dataset: those are real catalogue rows, but they belong to the
// GCMC ladder cover family, not to this product — see
// shaftAccessCoverContentForMarket in accessories-fixings-detail-content.ts
// for the custom-specification section rendered instead of a schedule.
export const SHAFT_ACCESS_COVER_VARIANTS: readonly CableManagementVariant[] = [];

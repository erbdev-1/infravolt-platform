import type { EarthingCategorySlug, EarthingProductVariant } from "../types";

import { CLAMPS_CONNECTORS_VARIANTS } from "./clamps-connectors";
import { CONDUCTORS_TAPES_VARIANTS } from "./conductors-tapes";
import { EARTHING_ELECTRODES_PLATES_VARIANTS } from "./earthing-electrodes-plates";
import { EQUIPOTENTIAL_EARTH_BARS_VARIANTS } from "./equipotential-earth-bars";
import { EXOTHERMIC_WELDING_VARIANTS } from "./exothermic-welding";
import { INSPECTION_GROUND_ENHANCEMENT_VARIANTS } from "./inspection-ground-enhancement";
import { LIGHTNING_PROTECTION_VARIANTS } from "./lightning-protection";
import { STATIC_EX_PROOF_GROUNDING_VARIANTS } from "./static-ex-proof-grounding";

// Sipariş/stok kodları pazara göre değişmez (İngilizce/Ukraynaca içerik
// gibi çevrilmez) — bu yüzden bu veri content.ts'in dışında, kategori
// slug'ına göre ayrı tutulur.
export const EARTHING_CATEGORY_VARIANTS: Readonly<
  Partial<Record<EarthingCategorySlug, Readonly<Record<string, readonly EarthingProductVariant[]>>>>
> = {
  "lightning-protection": LIGHTNING_PROTECTION_VARIANTS,
  "earthing-electrodes-plates": EARTHING_ELECTRODES_PLATES_VARIANTS,
  "conductors-tapes": CONDUCTORS_TAPES_VARIANTS,
  "clamps-connectors": CLAMPS_CONNECTORS_VARIANTS,
  "equipotential-earth-bars": EQUIPOTENTIAL_EARTH_BARS_VARIANTS,
  "exothermic-welding": EXOTHERMIC_WELDING_VARIANTS,
  "inspection-ground-enhancement": INSPECTION_GROUND_ENHANCEMENT_VARIANTS,
  "static-ex-proof-grounding": STATIC_EX_PROOF_GROUNDING_VARIANTS,
};

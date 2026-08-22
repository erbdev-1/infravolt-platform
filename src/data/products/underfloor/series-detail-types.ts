// Underfloor Cable Trunking Systems — per-series detail page content shape.
// One "series" (e.g. GDK Underfloor Junction Boxes) groups its catalogue
// rows into named subseries (e.g. GDK / GDK-Y / British system) so the
// spec table reads as organised families rather than one flat list.

import type { UnderfloorSeriesSlug } from "./types";

export type UnderfloorVariant = Readonly<{
  /** Catalogue model code, e.g. "GDK-31-Y". */
  model: string;
  /** Short technical product name, e.g. "Underfloor junction box". */
  productName: string;
  orderCode?: string;
  stockCode: string;
  dimensions?: string;
  weight?: string;
  /** Real, verified product photo — omitted when none exists in the
   * source extraction (renders as a text-only row, never a placeholder
   * image or invented photo). */
  image?: string;
  imageAlt?: string;
}>;

export type UnderfloorVariantGroup = Readonly<{
  name: string;
  variants: readonly UnderfloorVariant[];
}>;

export type UnderfloorSeriesDetail = Readonly<{
  slug: UnderfloorSeriesSlug;
  columnLabels: Readonly<{
    model: string;
    productName: string;
    orderCode: string;
    stockCode: string;
    dimensions: string;
    weight: string;
    action: string;
  }>;
  groups: readonly UnderfloorVariantGroup[];
}>;

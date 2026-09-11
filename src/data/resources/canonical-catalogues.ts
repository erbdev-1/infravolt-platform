import type { ResourceSystemKey } from "@/data/resources";
import { publicDocumentUrl } from "@/modules/storage/asset-url";

/**
 * Canonical Cloudflare R2 object paths for the six public product-system
 * catalogues. This is the single source of truth for every catalogue
 * download link on both markets (product/system pages and the Resources
 * catalogue cards) — never hardcode a catalogue path elsewhere; resolve it
 * through `canonicalCatalogueHref()` instead.
 */
const CANONICAL_CATALOGUE_PATHS: Record<ResourceSystemKey, string> = {
  busbar: "resources/catalogues/gersan-busbar-systems-catalogue.pdf",
  cable: "resources/catalogues/gersan-cable-management-systems-catalogue.pdf",
  earthing: "resources/catalogues/gersan-earthing-lightning-protection-systems-catalogue.pdf",
  gbus: "resources/catalogues/gersan-g-bus-automation-systems-catalogue.pdf",
  led: "resources/catalogues/gersan-led-systems-catalogue.pdf",
  underfloor: "resources/catalogues/gersan-underfloor-cable-trunking-catalogue.pdf",
};

export function canonicalCatalogueHref(key: ResourceSystemKey): string {
  return publicDocumentUrl(CANONICAL_CATALOGUE_PATHS[key]);
}

export function canonicalCatalogueFilename(key: ResourceSystemKey): string {
  const path = CANONICAL_CATALOGUE_PATHS[key];
  return path.slice(path.lastIndexOf("/") + 1);
}

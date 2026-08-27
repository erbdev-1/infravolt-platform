import { technicalResources, type ResourceSystemKey } from "@/data/resources";

export function canonicalCatalogueHref(key: ResourceSystemKey): string {
  const resource = technicalResources.find((item) => item.id === `catalogue-${key}`);
  if (!resource) {
    throw new Error(`No canonical catalogue resource found for "${key}"`);
  }
  return resource.downloadPath;
}

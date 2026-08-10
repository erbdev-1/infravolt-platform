import type { CableAccessoryDisplayGroup, CableManagementVariant } from "@/data/products/cable-management/types";

export type CableAccessoryGroup = Readonly<{
  slug: string;
  label: string;
  image?: string;
  count: number;
}>;

// Turns a family's own accessoryDisplayGroups config (see
// content.ts / types.ts) plus its real variants into the cards shown in
// "Compatible Accessories" — only real, catalogue-sourced counts and
// images are used; a group is only rendered once its computed count is > 0.
export function computeAccessoryGroups(
  variants: readonly CableManagementVariant[],
  displayGroups: readonly CableAccessoryDisplayGroup[],
): readonly CableAccessoryGroup[] {
  return displayGroups
    .map((group) => ({
      slug: group.slug,
      label: group.label,
      image: group.image,
      count: variants.filter((variant) => group.matches.includes(variant.accessoryGroup)).length,
    }))
    .filter((group) => group.count > 0);
}

export type BusbarCategory =
  | "lighting"
  | "power-distribution"
  | "high-power"
  | "special-environments";

export type BusbarConductor = "aluminium" | "copper";

export type BusbarSystem = Readonly<{
  slug: string;
  name: string;
  shortName: string;
  category: BusbarCategory;
  description: string;
  currentMin: number;
  currentMax: number;
  currentLabel: string;
  conductorOptions: readonly BusbarConductor[];
  conductorLabel: string;
  ipRating: string;
  applications: readonly string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
}>;

export type BusbarCatalogView = "all" | BusbarCategory | "components";

export type BusbarCategoryOption = Readonly<{
  value: BusbarCatalogView;
  label: string;
  description: string;
}>;

export type BusbarComponentGroup = Readonly<{
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}>;

import referenceDataJson from "./generated/references.json";
import cableReferenceListJson from "./generated/cable-reference-list.json";
import busbarCompaniesJson from "./generated/busbar-companies.json";
import ledSupplyPartnersJson from "./generated/led-supply-partners.json";

import { resolveOwnerCountry, resolveReferenceLocation } from "@/modules/references/geography";
import { englishReferenceText, transliterateTurkish } from "@/modules/references/english-display";
import type { MarketCode } from "@/modules/markets/types";

export const referenceSystemKeys = [
  "busbar",
  "cable-management",
  "earthing-lightning",
  "underfloor",
  "led-systems",
  "g-bus",
] as const;

export type ReferenceSystemKey = (typeof referenceSystemKeys)[number];

export type ReferenceCompany = Readonly<{
  id: string;
  name: string;
  logo?: string;
  logoIdentity?: string;
  sourcePage: number;
}>;

type SourceData = Readonly<{
  earthingLightning: {
    references: readonly Readonly<{
      id: string;
      reference: string;
      project: string;
      location: string;
      scope: string;
    }>[];
    companies: readonly ReferenceCompany[];
  };
  busbar: {
    customerProjects: readonly Readonly<{
      id: string;
      customer: string;
      project: string;
      location: string;
    }>[];
    projectContractors: readonly Readonly<{
      id: string;
      number: number;
      project: string;
      contractor: string;
      location: string;
    }>[];
  };
  cableManagement: {
    relationships: readonly Readonly<{
      id: string;
      contractor: string;
      project: string;
      owner: string;
    }>[];
    companies: readonly ReferenceCompany[];
  };
  underfloor: { companies: readonly ReferenceCompany[] };
  ledSystems: { companies: readonly ReferenceCompany[] };
  gBus: { companies: readonly ReferenceCompany[] };
}>;

export type ReferenceTableColumn = Readonly<{
  key: string;
  label: string;
}>;

export type ReferenceTableRow = Readonly<{
  id: string;
  cells: readonly string[];
}>;

/** Which geographic filter a table tab should expose — never both, never neither's wording. */
export type ReferenceGeography = "country" | "city-region";

export type ReferenceTab = Readonly<{
  id: string;
  label: string;
  heading: string;
  description: string;
  kind: "table" | "logos";
  columns?: readonly ReferenceTableColumn[];
  rows?: readonly ReferenceTableRow[];
  companies?: readonly ReferenceCompany[];
  /** Only set when a column has been reliably classified as country or city/region data. */
  geography?: ReferenceGeography;
  /** Which column key carries the geography value; defaults to "location" when `geography` is set. */
  geographyColumnKey?: string;
}>;

export type ReferenceSystem = Readonly<{
  key: ReferenceSystemKey;
  number: string;
  label: string;
  title: string;
  description: string;
  source: string;
  total: number;
  tabs: readonly ReferenceTab[];
}>;

export type ReferencesUiContent = Readonly<{
  metadata: { title: string; description: string };
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  selectorEyebrow: string;
  selectorHeading: string;
  selectorDescription: string;
  sourceLabel: string;
  cataloguedCountLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchCompaniesLabel: string;
  searchCompaniesPlaceholder: string;
  clearSearch: string;
  countryLabel: string;
  allCountriesLabel: string;
  cityRegionLabel: string;
  allCitiesRegionsLabel: string;
  referenceSingular: string;
  referencePlural: string;
  companySingular: string;
  companyPlural: string;
  noResultsTitle: string;
  noResultsBody: string;
  noDataBody: string;
  clearFiltersLabel: string;
  loadMore: string;
  showingLabel: string;
  catalogueMark: string;
  logoDirectoryLabel: string;
  referenceDirectoryLabel: string;
}>;

const sourceData = referenceDataJson as unknown as SourceData;

type CableReferenceListEntry = Readonly<{ id: string; project: string; location: string }>;
const cableReferenceList = cableReferenceListJson.references as unknown as readonly CableReferenceListEntry[];

type BusbarCompanyEntry = Readonly<{ name: string; reuseFrom?: string; logo?: string }>;
const busbarCompanyEntries = busbarCompaniesJson.companies as unknown as readonly BusbarCompanyEntry[];
const busbarCompanies: readonly ReferenceCompany[] = busbarCompanyEntries.map((entry, index) => {
  const reused = entry.reuseFrom ? sourceData.earthingLightning.companies.find((company) => company.id === entry.reuseFrom) : undefined;
  return {
    id: `busbar-company-${index + 1}`,
    name: entry.name,
    logo: entry.logo ?? reused?.logo,
    logoIdentity: reused?.logoIdentity,
    sourcePage: reused?.sourcePage ?? 161,
  };
});

type LedSupplyPartnerEntry = Readonly<{ name: string; logo: string }>;
const ledSupplyPartnerEntries = ledSupplyPartnersJson.companies as unknown as readonly LedSupplyPartnerEntry[];
const ledSupplyPartners: readonly ReferenceCompany[] = ledSupplyPartnerEntries.map((entry, index) => ({
  id: `led-supply-partner-${index + 1}`,
  name: entry.name,
  logo: entry.logo,
  sourcePage: 128,
}));

const RUSSIA_REFERENCE_PATTERN = /(?:\brussia(?:n)?\b|\brusya\b|\brossiya\b|\brossia\b|\bgersan-r\b|росси)/iu;
const RUSSIA_ONLY_COMPANY_NAMES = new Set(["ZAO GERSAN-R", "ЭнергоСервис"]);

function isRussiaPublicReference(...values: readonly (string | undefined)[]): boolean {
  return values.some((value) => {
    if (!value) return false;
    if (RUSSIA_REFERENCE_PATTERN.test(value)) return true;
    if (resolveOwnerCountry(value) === "Russia") return true;
    const resolved = resolveReferenceLocation(value);
    return resolved.kind === "country" && resolved.display === "Russia";
  });
}

function isRussiaOnlyCompany(company: ReferenceCompany): boolean {
  return (
    RUSSIA_ONLY_COMPANY_NAMES.has(company.name.trim()) ||
    isRussiaPublicReference(company.name, company.logoIdentity)
  );
}

const uiByMarket: Record<MarketCode, ReferencesUiContent> = {
  uk: {
    metadata: {
      title: "References | InfraVolt",
      description:
        "Search catalogue-sourced GERSAN project, customer, contractor and supplied-company references by system.",
    },
    breadcrumbHome: "Home",
    breadcrumbCurrent: "References",
    eyebrow: "Project reference directory",
    heading: "References",
    introduction:
      "Explore catalogue-sourced project, customer, contractor and supplied-company references across the systems represented by InfraVolt.",
    selectorEyebrow: "Directory",
    selectorHeading: "References by System",
    selectorDescription:
      "Choose a system to explore its catalogue-defined reference directory.",
    sourceLabel: "Catalogue source",
    cataloguedCountLabel: "catalogue references",
    searchLabel: "Search this reference directory",
    searchPlaceholder: "Search projects, companies or locations",
    searchCompaniesLabel: "Search Companies",
    searchCompaniesPlaceholder: "Search companies...",
    clearSearch: "Clear search",
    countryLabel: "Country",
    allCountriesLabel: "All Countries",
    cityRegionLabel: "City / Region",
    allCitiesRegionsLabel: "All Cities / Regions",
    referenceSingular: "reference",
    referencePlural: "references",
    companySingular: "company",
    companyPlural: "companies",
    noResultsTitle: "No references found",
    noResultsBody: "Try adjusting your search or filters.",
    noDataBody: "No catalogue data available for this view.",
    clearFiltersLabel: "Clear Filters",
    loadMore: "Load more",
    showingLabel: "Showing",
    catalogueMark: "Catalogue reference mark",
    logoDirectoryLabel: "Logo directory",
    referenceDirectoryLabel: "Reference Directory",
  },
  ua: {
    metadata: {
      title: "Референції | InfraVolt",
      description:
        "Пошук проєктів, замовників, підрядників і компаній за системами на основі каталогів GERSAN.",
    },
    breadcrumbHome: "Головна",
    breadcrumbCurrent: "Референції",
    eyebrow: "Каталог проєктних референцій",
    heading: "Референції",
    introduction:
      "Переглядайте референції проєктів, замовників, підрядників і компаній за системами, представленими InfraVolt.",
    selectorEyebrow: "Каталог",
    selectorHeading: "Референції за системами",
    selectorDescription:
      "Оберіть систему, щоб переглянути каталог референцій за цією системою.",
    sourceLabel: "Джерело каталогу",
    cataloguedCountLabel: "каталожних референцій",
    searchLabel: "Пошук у каталозі референцій",
    searchPlaceholder: "Пошук проєктів, компаній або локацій",
    searchCompaniesLabel: "Пошук компаній",
    searchCompaniesPlaceholder: "Пошук компаній...",
    clearSearch: "Очистити пошук",
    countryLabel: "Країна",
    allCountriesLabel: "Усі країни",
    cityRegionLabel: "Місто / Регіон",
    allCitiesRegionsLabel: "Усі міста / регіони",
    referenceSingular: "референція",
    referencePlural: "референцій",
    companySingular: "компанія",
    companyPlural: "компаній",
    noResultsTitle: "Референцій не знайдено",
    noResultsBody: "Змініть пошуковий запит або параметри фільтрації.",
    noDataBody: "Для цього розділу дані каталогу відсутні.",
    clearFiltersLabel: "Очистити фільтри",
    loadMore: "Показати більше",
    showingLabel: "Показано",
    catalogueMark: "Референційний знак у каталозі",
    logoDirectoryLabel: "Каталог логотипів",
    referenceDirectoryLabel: "Каталог референцій",
  },
};

const systemDescriptions: Record<MarketCode, Record<ReferenceSystemKey, string>> = {
  uk: {
    busbar: "Customer, project and location records from the Busbar catalogue, split by international and domestic scope.",
    "cable-management": "Worldwide project relationship records from the Cable Management catalogue.",
    "earthing-lightning": "International and domestic project references plus supplied-company marks.",
    underfloor: "Company marks from the GERSAN worldwide supplied-companies directory.",
    "led-systems": "Reference marks printed in the LED Systems catalogue.",
    "g-bus": "Named project reference marks printed in the current G-BUS catalogue.",
  },
  ua: {
    busbar: "Замовники, проєкти та локації з каталогу шинопроводів, розподілені за міжнародним і внутрішнім охопленням.",
    "cable-management": "Світові проєктні зв’язки з каталогу кабельних систем.",
    "earthing-lightning": "Міжнародні й регіональні проєкти та знаки компаній.",
    underfloor: "Знаки компаній із загального довідника GERSAN «Компанії, яким постачалася продукція у світі».",
    "led-systems": "Референційні знаки, надруковані в каталозі LED Systems.",
    "g-bus": "Іменовані референційні знаки з чинного каталогу G-BUS.",
  },
};

const systemNames: Record<MarketCode, Record<ReferenceSystemKey, { label: string; title: string }>> = {
  uk: {
    busbar: { label: "Busbar", title: "Busbar Systems" },
    "cable-management": { label: "Cable Management", title: "Cable Management" },
    "earthing-lightning": { label: "Earthing & Lightning", title: "Earthing & Lightning Protection" },
    underfloor: { label: "Underfloor", title: "Underfloor Cable Trunking" },
    "led-systems": { label: "LED Systems", title: "LED Systems" },
    "g-bus": { label: "G-BUS", title: "G-BUS Automation" },
  },
  ua: {
    busbar: { label: "Шинопроводи", title: "Шинопровідні системи" },
    "cable-management": { label: "Кабельні системи", title: "Кабельні системи" },
    "earthing-lightning": { label: "Заземлення та блискавкозахист", title: "Заземлення та блискавкозахист" },
    underfloor: { label: "Підпідлогові системи", title: "Підпідлогові кабельні системи" },
    "led-systems": { label: "LED-системи", title: "LED-системи" },
    "g-bus": { label: "G-BUS", title: "G-BUS Automation" },
  },
};

function tableRow(id: string, ...cells: string[]): ReferenceTableRow {
  return { id, cells };
}

export function referencesContentForMarket(market: MarketCode) {
  return uiByMarket[market];
}

export type ReferenceSector = Readonly<{
  id: string;
  title: string;
  image: string;
  isGlobal?: boolean;
  /** Undefined when no verified figure has been supplied for this sector — the card omits the stat row rather than showing an invented number. */
  referencesValue?: string;
  countriesValue?: string;
}>;

export type ReferenceSectorsContent = Readonly<{
  eyebrow: string;
  heading: string;
  description: string;
  cardReferencesLabel: string;
  cardCountryLabel: string;
  sectors: readonly ReferenceSector[];
}>;

// Sector titles/copy are UI-only groupings for visual navigation into the
// existing reference directory below — they are not derived from or linked
// to any per-project sector field in the source catalogue data (no such
// field exists), so sector cards scroll to the directory rather than filter
// it. See referenceSectorsForMarket callers for the scroll-only behaviour.
//
// Per-card References/Country figures are the market-approved sector-level
// counts supplied for this section (source: GERSAN reference visual). They
// are independent of the catalogue-sourced directory below and are not
// derived by counting per-project sector tags, since no such field exists.
// A sector with no verified figure supplied would have its stat row
// intentionally omitted rather than invented — see the ternary in
// references-page.tsx for that fallback.
const sectorImages: Record<string, string> = {
  global: "/assets/references/card/global.webp",
  "commercial-buildings": "/assets/references/card/sector-commercial-buildings.webp",
  "industrial-facilities": "/assets/references/card/sector-industrial-facilities.webp",
  "data-centres": "/assets/references/card/sector-data-centres.webp",
  "energy-utilities": "/assets/references/card/sector-energy-utilities.webp",
  "oil-gas": "/assets/references/card/sector-oil-gas.webp",
  airports: "/assets/references/card/sector-airports.webp",
  "rail-metro": "/assets/references/card/sector-rail-metro.webp",
  healthcare: "/assets/references/card/sector-healthcare.webp",
  "public-educational-infrastructure":
    "/assets/references/card/sector-public-educational-infrastructure.webp",
};

const sectorStats: Record<string, { references: string; countries: string } | undefined> = {
  global: { references: "20,000+", countries: "120+" },
  "commercial-buildings": { references: "3,000+", countries: "50+" },
  "energy-utilities": { references: "100+", countries: "40+" },
  airports: { references: "20+", countries: "5+" },
  "rail-metro": { references: "50+", countries: "10+" },
  "industrial-facilities": { references: "100+", countries: "20+" },
  "oil-gas": { references: "100+", countries: "20+" },
  healthcare: { references: "500+", countries: "20+" },
  "data-centres": { references: "200+", countries: "20+" },
  "public-educational-infrastructure": { references: "300+", countries: "30+" },
};

const sectorTitles: Record<MarketCode, Record<string, string>> = {
  uk: {
    global: "Global / GERSAN",
    "commercial-buildings": "Commercial Buildings",
    "energy-utilities": "Energy & Utilities",
    airports: "Airports",
    "rail-metro": "Rail & Metro",
    "industrial-facilities": "Industrial Facilities",
    "oil-gas": "Oil & Gas",
    healthcare: "Healthcare",
    "data-centres": "Data Centres",
    "public-educational-infrastructure": "Public & Educational Infrastructure",
  },
  ua: {
    global: "Глобально / GERSAN",
    "commercial-buildings": "Комерційні будівлі",
    "energy-utilities": "Енергетика та комунальні послуги",
    airports: "Аеропорти",
    "rail-metro": "Залізниця та метро",
    "industrial-facilities": "Промислові об'єкти",
    "oil-gas": "Нафта і газ",
    healthcare: "Охорона здоров'я",
    "data-centres": "Дата-центри",
    "public-educational-infrastructure": "Публічна та освітня інфраструктура",
  },
};

const sectorOrder = [
  "global",
  "commercial-buildings",
  "energy-utilities",
  "airports",
  "rail-metro",
  "industrial-facilities",
  "oil-gas",
  "healthcare",
  "data-centres",
  "public-educational-infrastructure",
] as const;

const sectorsHeaderByMarket: Record<MarketCode, Omit<ReferenceSectorsContent, "sectors">> = {
  uk: {
    eyebrow: "Sector coverage",
    heading: "References Across Critical Sectors",
    description:
      "Gersan electrical infrastructure systems are specified across commercial, industrial, transport, energy and mission-critical environments worldwide.",
    cardReferencesLabel: "References",
    cardCountryLabel: "Country",
  },
  ua: {
    eyebrow: "Охоплення за секторами",
    heading: "Референції в ключових секторах",
    description:
      "Системи електричної інфраструктури Gersan застосовуються в комерційних, промислових, транспортних, енергетичних та критично важливих об'єктах по всьому світу.",
    cardReferencesLabel: "Референцій",
    cardCountryLabel: "Країна",
  },
};

export function referenceSectorsForMarket(market: MarketCode): ReferenceSectorsContent {
  const titles = sectorTitles[market];
  return {
    ...sectorsHeaderByMarket[market],
    sectors: sectorOrder.map((id) => {
      const stats = sectorStats[id];
      return {
        id,
        title: titles[id],
        image: sectorImages[id],
        isGlobal: id === "global",
        referencesValue: stats?.references,
        countriesValue: stats?.countries,
      };
    }),
  };
}

export function isReferenceSystemKey(value: string | undefined): value is ReferenceSystemKey {
  return referenceSystemKeys.includes(value as ReferenceSystemKey);
}

export function referenceSystemsForMarket(market: MarketCode): readonly ReferenceSystem[] {
  const ua = market === "ua";
  const t = (uk: string, uaText: string) => (ua ? uaText : uk);
  const descriptions = systemDescriptions[market];
  const names = systemNames[market];
  const companiesSuppliedLabel = t("Companies Supplied Worldwide", "Компанії, яким постачалася продукція у світі");
  const worldwideCompanies = sourceData.earthingLightning.companies.filter(
    (company) => !isRussiaOnlyCompany(company),
  );
  const publicBusbarCompanies = busbarCompanies.filter((company) => !isRussiaOnlyCompany(company));
  const publicLedReferenceCompanies = sourceData.ledSystems.companies.filter(
    (company) => !isRussiaOnlyCompany(company),
  );
  const publicLedSupplyPartners = ledSupplyPartners.filter((company) => !isRussiaOnlyCompany(company));
  const publicGBusCompanies = sourceData.gBus.companies.filter((company) => !isRussiaOnlyCompany(company));
  const projectDisplay = (value: string) => (market === "uk" ? englishReferenceText(value) : value);
  const locationDisplay = (value: string) => {
    if (market !== "uk") return value;
    const resolved = resolveReferenceLocation(value);
    if (resolved.kind !== "unknown") return transliterateTurkish(resolved.display).replace(/\bTurkiye\b/gu, "Turkey");
    const ownerCountry = resolveOwnerCountry(value);
    return ownerCountry ? transliterateTurkish(ownerCountry).replace(/\bTurkiye\b/gu, "Turkey") : englishReferenceText(value);
  };
  const isTurkeyCountry = (value: string | undefined) => value === "Türkiye" || value === "Turkey";
  const isDomesticTurkeyLocation = (value: string) => {
    const resolved = resolveReferenceLocation(value);
    return resolved.kind === "turkiye" || (resolved.kind === "country" && isTurkeyCountry(resolved.display));
  };

  function worldwideCompaniesTab(): ReferenceTab {
    return {
      id: "worldwide-companies",
      label: companiesSuppliedLabel,
      heading: companiesSuppliedLabel,
      description: t(
        "Company marks from the GERSAN worldwide supplied-companies directory, shared across the manufacturer's catalogues.",
        "Знаки компаній із загального довідника GERSAN «Компанії, яким постачалася продукція у світі», спільного для каталогів виробника.",
      ),
      kind: "logos",
      companies: worldwideCompanies,
    };
  }

  function busbarCompaniesTab(): ReferenceTab {
    return {
      id: "worldwide-companies",
      label: companiesSuppliedLabel,
      heading: companiesSuppliedLabel,
      description: t(
        "Company marks from the Busbar catalogue's own, longer print of this directory.",
        "Знаки компаній із власного, повнішого друку цього довідника в каталозі шинопроводів.",
      ),
      kind: "logos",
      companies: publicBusbarCompanies,
    };
  }

  function ledSupplyPartnersTab(): ReferenceTab {
    return {
      id: "worldwide-companies",
      label: companiesSuppliedLabel,
      heading: t("Our Supply Partners", "Наші партнери-постачальники"),
      description: t(
        "LED component and technology supply partners printed in the LED Systems catalogue.",
        "Партнери з постачання LED-компонентів і технологій, надруковані в каталозі LED Systems.",
      ),
      kind: "logos",
      companies: publicLedSupplyPartners,
    };
  }

  // --- Busbar: no source-level international/domestic split exists, so the
  // two source tables are merged and classified with the geography resolver.
  const busbarUnified = [
    ...sourceData.busbar.customerProjects.map((item) => ({ id: item.id, who: item.customer, project: item.project, location: item.location })),
    ...sourceData.busbar.projectContractors.map((item) => ({ id: item.id, who: item.contractor, project: item.project, location: item.location })),
  ].filter((item) => !isRussiaPublicReference(item.who, item.project, item.location));
  const busbarInternational = busbarUnified.filter(
    (item) => resolveReferenceLocation(item.location).kind === "country" && !isDomesticTurkeyLocation(item.location),
  );
  const busbarDomestic = busbarUnified.filter((item) => isDomesticTurkeyLocation(item.location));
  const busbarColumns = [
    { key: "who", label: t("Customer / Contractor", "Замовник / Підрядник") },
    { key: "project", label: t("Project", "Проєкт") },
    { key: "location", label: t("Location", "Локація") },
  ];

  // --- Cable Management: two independent source tables cover International.
  // (1) the "Reference List - Cable Tray Systems" (PDF pages 180-183) is a
  // project/location list — 223 of its 274 entries resolve to a Turkish
  // city/region (-> Domestic), 10 to a genuine foreign country.
  // (2) the worldwide contractor/project/owner relationships table (pages
  // 163-179) is split by its resolved owner country. Türkiye rows belong to
  // Domestic / Regional; all other recognised countries are International.
  // The raw owner text remains the source for the displayed Location cell.
  const cableReferenceListInternational = cableReferenceList
    .filter(
      (item) =>
        !isRussiaPublicReference(item.project, item.location) &&
        resolveReferenceLocation(item.location).kind === "country" &&
        !isDomesticTurkeyLocation(item.location),
    )
    .map((item) => ({ id: item.id, project: item.project, location: item.location }));
  const cableRelationshipsInternational = sourceData.cableManagement.relationships
    .filter((item) => {
      if (isRussiaPublicReference(item.contractor, item.project, item.owner)) return false;
      const country = resolveOwnerCountry(item.owner);
      return country !== undefined && !isTurkeyCountry(country);
    })
    .map((item) => ({ id: item.id, project: item.project, location: item.owner }));
  const cableRelationshipsDomestic = sourceData.cableManagement.relationships
    .filter((item) => {
      if (isRussiaPublicReference(item.contractor, item.project, item.owner)) return false;
      const country = resolveOwnerCountry(item.owner);
      return isTurkeyCountry(country);
    })
    .map((item) => ({ id: item.id, project: item.project, location: item.owner }));
  const cableInternational = [...cableReferenceListInternational, ...cableRelationshipsInternational];
  const cableDomestic = [
    ...cableReferenceList.filter(
      (item) => !isRussiaPublicReference(item.project, item.location) && isDomesticTurkeyLocation(item.location),
    ),
    ...cableRelationshipsDomestic,
  ];
  const cableColumns = [
    { key: "project", label: t("Project", "Проєкт") },
    { key: "location", label: t("Location", "Локація") },
  ];

  // --- Earthing & Lightning: the source "scope" field is authoritative, but
  // Türkiye always belongs to Domestic / Regional. Domestic-scoped rows with
  // an unambiguous foreign country (e.g. Turkmenistan, Kazakhstan) are moved
  // in the opposite direction into International.
  const earthingIntlScoped = sourceData.earthingLightning.references.filter(
    (item) =>
      !isRussiaPublicReference(item.reference, item.project, item.location) &&
      item.scope === "international_project_references" &&
      !isDomesticTurkeyLocation(item.location),
  );
  const earthingDomesticScoped = sourceData.earthingLightning.references.filter(
    (item) =>
      !isRussiaPublicReference(item.reference, item.project, item.location) &&
      (item.scope !== "international_project_references" || isDomesticTurkeyLocation(item.location)),
  );
  const earthingReclassified = earthingDomesticScoped.filter(
    (item) => resolveReferenceLocation(item.location).kind === "country" && !isDomesticTurkeyLocation(item.location),
  );
  const earthingTrueDomestic = earthingDomesticScoped.filter(
    (item) => resolveReferenceLocation(item.location).kind !== "country" || isDomesticTurkeyLocation(item.location),
  );
  const earthingInternational = [...earthingIntlScoped, ...earthingReclassified];
  const earthingColumns = [
    { key: "project", label: t("Project Reference", "Референція проєкту") },
    { key: "location", label: t("Location", "Локація") },
  ];

  return [
    {
      key: "busbar",
      number: "01",
      label: names.busbar.label,
      title: names.busbar.title,
      description: descriptions.busbar,
      source: "GERSAN Busbar catalogue · PDF pages 161–192",
      total: busbarInternational.length + busbarDomestic.length + publicBusbarCompanies.length,
      tabs: [
        {
          id: "international",
          label: t("International", "Міжнародні"),
          heading: t("International References", "Міжнародні референції"),
          description: t(
            "International customer and project references sourced from the catalogue.",
            "Міжнародні референції замовників і проєктів з каталогу.",
          ),
          kind: "table",
          geography: "country",
          columns: busbarColumns,
          rows: busbarInternational.map((item) => tableRow(item.id, item.who, projectDisplay(item.project), locationDisplay(item.location))),
        },
        {
          id: "domestic-regional",
          label: t("Domestic / Regional", "Внутрішні / Регіональні"),
          heading: t("Domestic & Regional References", "Внутрішні та регіональні референції"),
          description: t(
            "Domestic and regional customer and project references sourced from the catalogue.",
            "Внутрішні та регіональні референції замовників і проєктів з каталогу.",
          ),
          kind: "table",
          geography: "city-region",
          columns: busbarColumns,
          rows: busbarDomestic.map((item) => tableRow(item.id, item.who, projectDisplay(item.project), locationDisplay(item.location))),
        },
        busbarCompaniesTab(),
      ],
    },
    {
      key: "cable-management",
      number: "02",
      label: names["cable-management"].label,
      title: names["cable-management"].title,
      description: descriptions["cable-management"],
      source: "GERSAN Cable Support catalogue · PDF pages 163–183",
      total: cableInternational.length + cableDomestic.length + worldwideCompanies.length,
      tabs: [
        {
          id: "international",
          label: t("International", "Міжнародні"),
          heading: t("International Project References", "Міжнародні проєктні референції"),
          description: t(
            "International project references from the catalogue's reference list and worldwide relationships table.",
            "Міжнародні проєктні референції зі списку каталогу та таблиці світових зв’язків.",
          ),
          kind: "table",
          geography: "country",
          columns: cableColumns,
          rows: cableInternational.map((item) => tableRow(item.id, projectDisplay(item.project), locationDisplay(item.location))),
        },
        {
          id: "domestic-regional",
          label: t("Domestic / Regional", "Внутрішні / Регіональні"),
          heading: t("Domestic & Regional References", "Внутрішні та регіональні референції"),
          description: t(
            "Domestic and regional project references from the catalogue's reference list and relationships table.",
            "Внутрішні та регіональні проєктні референції зі списку та таблиці зв’язків каталогу.",
          ),
          kind: "table",
          geography: "city-region",
          columns: cableColumns,
          rows: cableDomestic.map((item) => tableRow(item.id, projectDisplay(item.project), locationDisplay(item.location))),
        },
        worldwideCompaniesTab(),
      ],
    },
    {
      key: "earthing-lightning",
      number: "03",
      label: names["earthing-lightning"].label,
      title: names["earthing-lightning"].title,
      description: descriptions["earthing-lightning"],
      source: "GERSAN Earthing catalogue · PDF pages 124–142",
      total: earthingInternational.length + earthingTrueDomestic.length + worldwideCompanies.length,
      tabs: [
        {
          id: "international-projects",
          label: t("International", "Міжнародні"),
          heading: t("International Project References", "Міжнародні проєктні референції"),
          description: t(
            "International project references sourced from the catalogue.",
            "Міжнародні проєктні референції з каталогу.",
          ),
          kind: "table",
          geography: "country",
          columns: earthingColumns,
          rows: earthingInternational.map((item) => tableRow(item.id, projectDisplay(item.project || item.reference), locationDisplay(item.location))),
        },
        {
          id: "domestic-regional-projects",
          label: t("Domestic / Regional", "Внутрішні / Регіональні"),
          heading: t("Domestic & Regional Project References", "Внутрішні та регіональні проєктні референції"),
          description: t(
            "Domestic and regional references sourced from the catalogue.",
            "Внутрішні та регіональні референції з каталогу.",
          ),
          kind: "table",
          geography: "city-region",
          columns: earthingColumns,
          rows: earthingTrueDomestic.map((item) => tableRow(item.id, projectDisplay(item.project || item.reference), locationDisplay(item.location))),
        },
        {
          id: "worldwide-companies",
          label: companiesSuppliedLabel,
          heading: companiesSuppliedLabel,
          description: t(
            "Catalogue company marks, including source-limited marks where supplied.",
            "Знаки компаній із каталогу, включно з обмеженими джерелом знаками, де це застосовно.",
          ),
          kind: "logos",
          companies: worldwideCompanies,
        },
      ],
    },
    {
      key: "underfloor",
      number: "04",
      label: names.underfloor.label,
      title: names.underfloor.title,
      description: descriptions.underfloor,
      source: "GERSAN Underfloor catalogue · PDF pages 29–33",
      total: worldwideCompanies.length,
      tabs: [worldwideCompaniesTab()],
    },
    {
      key: "led-systems",
      number: "05",
      label: names["led-systems"].label,
      title: names["led-systems"].title,
      description: descriptions["led-systems"],
      source: "GERSAN LED Systems catalogue · PDF pages 127–128",
      total: publicLedReferenceCompanies.length + publicLedSupplyPartners.length,
      tabs: [
        {
          id: "some-of-our-references",
          label: t("Project References", "Референції проєктів"),
          heading: t("Project References", "Референції проєктів"),
          description: t(
            "Individual reference marks cropped directly from the catalogue source pages.",
            "Окремі референційні знаки, взяті безпосередньо з вихідних сторінок каталогу.",
          ),
          kind: "logos",
          companies: publicLedReferenceCompanies,
        },
        ledSupplyPartnersTab(),
      ],
    },
    {
      key: "g-bus",
      number: "06",
      label: names["g-bus"].label,
      title: names["g-bus"].title,
      description: descriptions["g-bus"],
      source: "G-BUS catalogue · current reference panel",
      total: publicGBusCompanies.length + worldwideCompanies.length,
      tabs: [
        {
          id: "reference-projects",
          label: t("Reference Projects", "Референційні проєкти"),
          heading: t("Reference Projects", "Референційні проєкти"),
          description: t(
            "Named project marks presented in the G-BUS catalogue.",
            "Іменовані знаки проєктів, представлені в каталозі G-BUS.",
          ),
          kind: "logos",
          companies: publicGBusCompanies,
        },
        worldwideCompaniesTab(),
      ],
    },
  ];
}

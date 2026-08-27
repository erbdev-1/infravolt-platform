import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

export const TRACK_DOWNLIGHT_CATEGORY_HREF = "/products/led-systems/track-downlight";
const ASSET_BASE = publicMediaUrl("products/led-lighting/series/track-downlight");
const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/track-downlight");
const CATEGORY_BACKGROUND = `${CATEGORY_ASSET_BASE}/hero/track-downlight-hero-background.webp`;
const PRODUCT_BASE = `${CATEGORY_ASSET_BASE}/product`;
const BACKGROUND_BASE = `${PRODUCT_BASE}/background`;
const PHOTOMETRIC_BASE = `${CATEGORY_ASSET_BASE}/photometric`;
const TECHNICAL_BASE = `${CATEGORY_ASSET_BASE}/technical`;
const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;

// Prepared per-family hero/photometric/technical assets (task: "update the
// existing LED Systems pages to use the new prepared assets"), mapped by
// verified filename + product geometry — see the per-family card image
// verification performed for the category page series list. One prepared
// set exists per Product Series route; sub-configurations within a route
// (e.g. CYL85 vs CYL70) share it rather than each getting its own, since
// only one prepared image/drawing exists per family.
const PREPARED_ASSETS: Record<string, { background: string; foreground: string; photometric: string; technical: string }> = {
  "cyl-track-spot-series": {
    background: `${BACKGROUND_BASE}/cyl-adjustable-track-spot-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/cyl-adjustable-track-spot-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/cyl-adjustable-photometric.png`,
    technical: `${TECHNICAL_BASE}/cyl-adjustable-track-spot-technical.png`,
  },
  "cytm-cyptm-magnetic-track-series": {
    background: `${BACKGROUND_BASE}/cytm-cyptm-magnetic-track-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/cytm-cyptm-magnetic-track-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/cytm-cyptm-beam-angles.webp`,
    technical: `${TECHNICAL_BASE}/cytm-cyptm-technical-drawing.webp`,
  },
  "cylp-pendant-track-series": {
    background: `${BACKGROUND_BASE}/cylp-pendant-track-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/cylp-pendant-track-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/cylp-pendant-track-beam-angles.png`,
    technical: `${TECHNICAL_BASE}/cylp-pendant-track-technical-drawing.png`,
  },
  "lnrt-linear-track-series": {
    background: `${BACKGROUND_BASE}/lnrt-linear-track-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/lnrt-linear-track-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/lnrt-linear-track-photometric-data.webp`,
    technical: `${TECHNICAL_BASE}/lnrt-linear-track-technical-drawing.webp`,
  },
  "stn-std-sty-track-spot-series": {
    background: `${BACKGROUND_BASE}/stn-std-sty-track-spot-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/stn-std-sty-track-spot-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/stn-std-sty-track-spot-beam-angles.webp`,
    technical: `${TECHNICAL_BASE}/stn-std-sty-track-spot-technical-drawing.webp`,
  },
  "boom-bolton-adjustable-downlights": {
    background: `${BACKGROUND_BASE}/ldb-boom-h-k-d2-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/ldb-boom-h-k-d2-hero-foreground-products.webp`,
    photometric: `${PHOTOMETRIC_BASE}/ldb-boom-h-k-d2-photometric-data.webp`,
    technical: `${TECHNICAL_BASE}/ldb-boom-h-k-d2-technical-dimensions.webp`,
  },
  "mcrs-recessed-downlights": {
    background: `${BACKGROUND_BASE}/mcrs-recessed-downlight-series-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/mcrs-recessed-downlight-series-hero-foreground-products.webp`,
    photometric: `${PHOTOMETRIC_BASE}/mcrs-recessed-downlight-series-photometric-data.webp`,
    technical: `${TECHNICAL_BASE}/mcrs-recessed-downlight-series-technical-dimensions.webp`,
  },
  // "Mercury H" is the catalogue name behind the MCRH round-downlight
  // family — verified against the source's own "MERCURY H3/H4/H5"
  // labelling; the prepared asset folder keeps the (slightly mis-typed)
  // "mcrs-mercury-h-series" filename prefix rather than "mcrh".
  "mcrh-downlights": {
    background: `${BACKGROUND_BASE}/mcrs-mercury-h-series-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/mcrs-mercury-h-series-hero-foreground-products.webp`,
    photometric: `${PHOTOMETRIC_BASE}/mcrs-mercury-h-series-photometric-data.webp`,
    technical: `${TECHNICAL_BASE}/mcrs-mercury-h-series-technical-dimensions.webp`,
  },
  "moon-jpt-downlights": {
    background: `${BACKGROUND_BASE}/moon-4-series-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/moon-4-series-hero-foreground-products.webp`,
    photometric: `${PHOTOMETRIC_BASE}/moon-4-series-photometric-data.webp`,
    technical: `${TECHNICAL_BASE}/moon-4-series-technical-dimensions.webp`,
  },
  "frame-multi-head-spotlights": {
    background: `${BACKGROUND_BASE}/frame-mercury-h3-series-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/frame-mercury-h3-series-hero-foreground-products.webp`,
    photometric: `${PHOTOMETRIC_BASE}/frame-mercury-h3-series-photometric-data.webp`,
    technical: `${TECHNICAL_BASE}/frame-mercury-h3-series-technical-dimensions.webp`,
  },
  // "Saturn" is the catalogue/internal name behind the STRN compact
  // downlight family — verified against the source's own "SATURN 6/8"
  // labelling on the prepared card and hero assets.
  "compact-standard-downlights": {
    background: `${BACKGROUND_BASE}/saturn-series-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/saturn-series-hero-foreground-products.webp`,
    photometric: `${PHOTOMETRIC_BASE}/saturn-series-photometric-data.webp`,
    technical: `${TECHNICAL_BASE}/saturn-series-technical-dimensions.webp`,
  },
};

const FAMILIES = [
  ["cyl-track-spot-series", "CYL Adjustable Track Spot Series", "CYL85 and CYL70 magnetic-track spotlights"],
  ["cytm-cyptm-magnetic-track-series", "CYTM / CYPTM Magnetic Track Series", "Direct and pendant magnetic-track spotlights"],
  ["cylp-pendant-track-series", "CYLP Pendant Track Series", "CYLP70 pendant magnetic-track lighting"],
  ["lnrt-linear-track-series", "LNRT Linear Track Series", "LNRT40 linear magnetic-track modules"],
  ["stn-std-sty-track-spot-series", "STN / STD / STY Track Spot Series", "Five catalogue track-spot configurations"],
  ["boom-bolton-adjustable-downlights", "BOOM & BOLTON Adjustable Downlights", "Adjustable recessed, surface and multi-head forms"],
  ["mcrs-recessed-downlights", "MCRS Recessed Downlight Series", "Eleven catalogue MCRS performance rows"],
  ["mcrh-downlights", "MCRH Downlight Series", "Round MCRH and catalogue-verified square MCRKS configurations"],
  ["moon-jpt-downlights", "MOON & JPT Downlights", "MOON 4 and JPT / JUPITER configurations"],
  ["frame-multi-head-spotlights", "FRAME Multi-Head Spotlights", "Mercury, BOOM and GU10 frame configurations"],
  ["compact-standard-downlights", "STRN & Compact Downlight Series", "STRN and SIGMA compact downlights"],
] as const;

// Single source of truth for the Track & Downlight warranty split — Track
// Lighting Systems (the first 5 families above) publish 7 years, Downlight
// Lighting Systems (the remaining 6) publish 5 years.
const TRACK_LIGHTING_SLUGS = new Set<string>([
  "cyl-track-spot-series",
  "cytm-cyptm-magnetic-track-series",
  "cylp-pendant-track-series",
  "lnrt-linear-track-series",
  "stn-std-sty-track-spot-series",
]);
function warrantyItem(ua: boolean, slug: string) {
  const years = TRACK_LIGHTING_SLUGS.has(slug) ? 7 : 5;
  return { icon: "warranty" as const, label: ua ? "Гарантія" : "Warranty", value: ua ? `${years} років гарантії` : `${years}-Year Warranty` };
}

function talkToTeam(ua: boolean) {
  return ua ? "Звернутися до нашої технічної команди" : "Talk to Our Technical Team";
}

const FAMILY_SUBTITLES_UA: Record<string, string> = {
  "cyl-track-spot-series": "Магнітно-трекові прожектори CYL85 та CYL70",
  "cytm-cyptm-magnetic-track-series": "Прямі та підвісні магнітно-трекові прожектори",
  "cylp-pendant-track-series": "Підвісне магнітно-трекове освітлення CYLP70",
  "lnrt-linear-track-series": "Лінійні магнітно-трекові модулі LNRT40",
  "stn-std-sty-track-spot-series": "П'ять каталожних конфігурацій трекових прожекторів",
  "boom-bolton-adjustable-downlights": "Регульовані вбудовані, накладні та багатоголові форми",
  "mcrs-recessed-downlights": "Одинадцять каталожних рядків продуктивності MCRS",
  "mcrh-downlights": "Круглий MCRH та каталожні квадратні конфігурації MCRKS",
  "moon-jpt-downlights": "Конфігурації MOON 4 та JPT / JUPITER",
  "frame-multi-head-spotlights": "Конфігурації Mercury, BOOM та GU10",
  "compact-standard-downlights": "Компактні даунлайти STRN та SIGMA",
};

function siblings(current: string, ua: boolean) {
  return FAMILIES.map(([slug, name, subtitle]) => ({ slug, name, subtitle: ua ? (FAMILY_SUBTITLES_UA[slug] ?? subtitle) : subtitle, ...(slug === current ? { isCurrent: true } : { href: `${TRACK_DOWNLIGHT_CATEGORY_HREF}/${slug}` }) }));
}

function filters(market: MarketCode, name: string): NonNullable<LedSeriesDetailContent["modelsFilters"]> {
  const ua = market === "ua";
  return {
    searchLabel: ua ? "Пошук" : "Search",
    searchPlaceholder: ua ? `Пошук за кодом ${name}` : `Search ${name} code`,
    powerFilterLabel: ua ? "Потужність" : "Power",
    allPowersLabel: ua ? "Усі потужності" : "All powers",
    clearFiltersLabel: ua ? "Очистити фільтри" : "Clear filters",
    noResultsLabel: ua ? "Жодна модель не відповідає цим фільтрам." : "No catalogue models match these filters.",
    downloadCsvLabel: ua ? "Завантажити CSV" : "Download CSV",
    mobileFiltersToggleLabel: ua ? "Фільтр моделей" : "Filter models",
    mobileApplyFiltersLabel: ua ? "Застосувати фільтри" : "Apply filters",
    mobileViewAllPrefix: ua ? "Показати всі" : "View all",
    mobileViewFilteredPrefix: ua ? "Показати відфільтровані" : "View filtered",
    mobileHidePrefix: ua ? "Приховати" : "Hide",
    modelsCountSuffix: ua ? "моделей" : "models",
    copyModelCodeAction: ua ? "Копіювати каталожний код" : "Copy model code",
    copiedLabel: ua ? "Скопійовано" : "Copied",
    enquiryColumnLabel: ua ? "Запит" : "Enquiry",
    enquiryAddAction: ua ? "Додати до запиту" : "Add to Enquiry",
    enquiryRemoveAction: ua ? "Прибрати" : "Remove",
  };
}

function shared(market: MarketCode, slug: string, title: string) {
  const ua = market === "ua";
  return {
    breadcrumbs: { home: ua ? "Головна" : "Home", products: ua ? "Продукція" : "Products", ledSystems: ua ? "LED-системи" : "LED Systems", category: ua ? "Трек і Downlight" : "Track & Downlight", current: title },
    backToCategoryLabel: ua ? "Назад до Track & Downlight" : "Back to Track & Downlight",
    technicalInformationHeading: ua ? "Технічна інформація" : "Technical Information",
    technicalAssurance: [],
    modelsHeading: ua ? "Моделі та технічний розклад" : "Models & Technical Schedule",
    controlsHeading: ua ? "Керування та системні опції" : "Controls & System Options",
    controlsIntroduction: ua ? "Наведені функції є каталожними проєктними опціями, а не стандартним обладнанням для кожного коду замовлення." : "Functions shown here are catalogue-listed project options, not standard equipment on every order code.",
    applicationsHeading: ua ? "Типові сфери застосування" : "Typical Applications",
    applicationCardsAlways: true,
    siblingFamiliesHeading: ua ? "Інші сімейства Track & Downlight" : "Other Track & Downlight Families",
    siblingViewSeriesLabel: ua ? "Переглянути серію" : "View Series",
    currentFamilyBadgeLabel: ua ? "Поточна серія" : "Current Family",
    siblingFamilies: siblings(slug, ua),
  } as const;
}

type Row = readonly [model: string, power: number, lumen?: string, efficacy?: string, dimensions?: string, beam?: string];
function makeModels(rows: readonly Row[], common: Omit<LedSeriesModel, "model" | "powerW" | "luminousFluxLm" | "efficiencyLmW" | "dimensions" | "lens">): readonly LedSeriesModel[] {
  return rows.map(([model, powerW, luminousFluxLm, efficiencyLmW, dimensions, lens]) => ({ ...common, model, powerW, ...(luminousFluxLm ? { luminousFluxLm } : {}), ...(efficiencyLmW ? { efficiencyLmW } : {}), ...(dimensions ? { dimensions } : {}), ...(lens ? { lens } : {}) }));
}

function trackApps(ua: boolean) {
  return [
    { icon: "retail", title: ua ? "Роздрібна торгівля та магазини" : "Retail & Stores", description: ua ? "Спрямоване акцентне освітлення для товарів і вітрин." : "Focused accent lighting for products and displays.", image: `${APPLICATION_IMAGE_BASE}/series-application-retail-stores.webp`, imageAlt: ua ? "Торговий інтер'єр, освітлений трековими та вбудованими світильниками" : "Retail interior illuminated by track and downlight products" },
    { icon: "shopping-centre", title: ua ? "Шоуруми" : "Showrooms", description: ua ? "Регульоване освітлення для презентації товару та фокусних точок." : "Adjustable lighting for product presentation and focal points.", image: `${APPLICATION_IMAGE_BASE}/lighting-application-showrooms.webp`, imageAlt: ua ? "Шоурум, освітлений регульованими трековими прожекторами" : "Showroom illuminated by adjustable track spotlights" },
    { icon: "public-square", title: ua ? "Галереї та виставки" : "Galleries & Exhibitions", description: ua ? "Точне акцентне освітлення для творів мистецтва та змінних експозицій." : "Precise accent lighting for artwork and changing displays.", image: `${APPLICATION_IMAGE_BASE}/series-application-galleris-exhibition.webp`, imageAlt: ua ? "Інтер'єр галереї, освітлений трековими прожекторами" : "Gallery interior illuminated by track spotlights" },
    { icon: "residential", title: ua ? "Готельні інтер'єри" : "Hospitality Interiors", description: ua ? "Трекове освітлення для рецепції, обідніх зон і гостьових приміщень." : "Track lighting for reception, dining and guest environments.", image: `${APPLICATION_IMAGE_BASE}/lighting-application-hospitality-interiors.webp`, imageAlt: ua ? "Лобі готелю, освітлене трековим освітленням" : "Hotel lobby illuminated by track lighting" },
    { icon: "office", title: ua ? "Комерційні інтер'єри" : "Commercial Interiors", description: ua ? "Гнучке акцентне та загальне освітлення для проєктних інтер'єрів." : "Flexible accent and general lighting for project interiors.", image: `${APPLICATION_IMAGE_BASE}/series-application-commercial-interior.webp`, imageAlt: ua ? "Комерційний інтер'єр, освітлений вбудованими світильниками" : "Commercial interior illuminated by recessed downlights" },
  ] as const;
}
function lnrtApps(ua: boolean) {
  return [
    { icon: "retail", title: ua ? "Роздрібна торгівля" : "Retail", description: ua ? "Неперервне трекове освітлення торгових залів." : "Continuous track-mounted lighting for sales floors.", image: `${APPLICATION_IMAGE_BASE}/series-application-retail-stores.webp`, imageAlt: ua ? "Торговий інтер'єр, освітлений трековими та вбудованими світильниками" : "Retail interior illuminated by track and downlight products" }, { icon: "office", title: ua ? "Офіси" : "Offices", description: ua ? "Рівномірне лінійне освітлення сучасних робочих просторів." : "Uniform linear lighting for modern workspaces." },
    { icon: "shopping-centre", title: ua ? "Комерційні інтер'єри" : "Commercial Interiors", description: ua ? "Лінійне освітлення комерційних зон циркуляції та спільних просторів." : "Linear illumination for commercial circulation and shared areas.", image: `${APPLICATION_IMAGE_BASE}/series-application-commercial-interior.webp`, imageAlt: ua ? "Комерційний інтер'єр, освітлений вбудованими світильниками" : "Commercial interior illuminated by recessed downlights" }, { icon: "residential", title: ua ? "Готельний бізнес" : "Hospitality", description: ua ? "Архітектурне лінійне світло для готельних інтер'єрів." : "Architectural linear light for hospitality interiors.", image: `${APPLICATION_IMAGE_BASE}/lighting-application-hospitality-interiors.webp`, imageAlt: ua ? "Лобі готелю, освітлене трековим освітленням" : "Hotel lobby illuminated by track lighting" },
    { icon: "public-square", title: ua ? "Архітектурні інтер'єри" : "Architectural Interiors", description: ua ? "Інтегровані лінійні трекові модулі для дизайнерських інтер'єрних рішень." : "Integrated linear track modules for designed interior schemes.", image: `${APPLICATION_IMAGE_BASE}/series-application-architectural-applications.webp`, imageAlt: ua ? "Архітектурний інтер'єр, освітлений вбудованими світильниками" : "Architectural interior illuminated by recessed downlights" },
  ] as const;
}
function downlightApps(ua: boolean) {
  return [
    { icon: "retail", title: ua ? "Роздрібна торгівля та магазини" : "Retail & Stores", description: ua ? "Вбудоване та регульоване освітлення торгових зон." : "Recessed and adjustable lighting for sales areas.", image: `${APPLICATION_IMAGE_BASE}/series-application-retail-stores.webp`, imageAlt: ua ? "Торговий інтер'єр, освітлений трековими та вбудованими світильниками" : "Retail interior illuminated by track and downlight products" }, { icon: "office", title: ua ? "Офіси" : "Offices", description: ua ? "Загальне та акцентне освітлення робочих просторів." : "General and accent lighting for workspaces." },
    { icon: "education", title: ua ? "Навчальні заклади" : "Educational Facilities", description: ua ? "Інтер'єрне освітлення класів і спільних навчальних зон." : "Interior lighting for classrooms and shared learning areas.", image: `${APPLICATION_IMAGE_BASE}/series-application-educational-facilities.webp`, imageAlt: ua ? "Клас, освітлений вбудованими світильниками" : "Classroom illuminated by recessed downlights" }, { icon: "corridor", title: ua ? "Лікарні" : "Hospitals", description: ua ? "Загальне освітлення для лікарняних коридорів і громадських зон." : "General lighting for hospital circulation and public areas.", image: `${APPLICATION_IMAGE_BASE}/series-application-hospitals.webp`, imageAlt: ua ? "Лікарняний коридор і рецепція, освітлені вбудованими світильниками" : "Hospital corridor and reception illuminated by recessed downlights" },
    { icon: "public-square", title: ua ? "Архітектурні застосування" : "Architectural Applications", description: ua ? "Проєктне даунлайт-освітлення для дизайнерських комерційних інтер'єрів." : "Project downlighting for designed commercial interiors.", image: `${APPLICATION_IMAGE_BASE}/series-application-architectural-applications.webp`, imageAlt: ua ? "Архітектурний інтер'єр, освітлений вбудованими світильниками" : "Architectural interior illuminated by recessed downlights" },
  ] as const;
}

function trackControls(ua: boolean) {
  return [{ icon: "control-dimmer", label: "1–10 V", secondaryLabel: ua ? "Доступна опція" : "Available option" }, { icon: "control-dali", label: "DALI", secondaryLabel: ua ? "Доступна опція" : "Available option" }, { icon: "control-touch-dim", label: "Touch-Dim", secondaryLabel: ua ? "Доступна опція" : "Available option" }, { icon: "control-casambi", label: "Casambi", secondaryLabel: ua ? "Доступна опція" : "Available option" }] as const;
}
function downlightControls(ua: boolean) {
  return [{ icon: "control-dali", label: "DALI", secondaryLabel: ua ? "Проєктна опція" : "Project option" }, { icon: "control-dimmer", label: "1–10 V", secondaryLabel: ua ? "Проєктна опція" : "Project option" }, { icon: "control-emergency", label: ua ? "Аварійний режим" : "Emergency", secondaryLabel: ua ? "Проєктна опція" : "Project option" }, { icon: "control-sensor", label: ua ? "Датчик" : "Sensor", secondaryLabel: ua ? "Проєктна опція" : "Project option" }] as const;
}

type ContentArgs = {
  slug: string; title: string; label: string; description: string; heroImage: string; heroImageAlt: string;
  rows: readonly Row[]; voltage: string; frequency?: string; temperature?: string; cri?: string; cct?: string; ip?: string; modelIp?: boolean;
  powerSummary: string; lumenSummary?: string; efficacySummary?: string; lightSource?: string; construction: string; installation: string;
  controls?: LedSeriesDetailContent["controlOptions"]; applications: LedSeriesDetailContent["applications"]; application?: { index: number; image: string; imageAlt: string };
  technicalAssets?: LedSeriesDetailContent["technicalAssets"]; familyTechnicalSection?: LedSeriesDetailContent["familyTechnicalSection"];
  modelsNote?: string; cta: string;
};

// Extracts the catalogue's own "Powder-coated ..." clause from a
// construction string for the Colour & Finish assurance row, rather than
// reusing the whole Construction & Installation value (already shown
// above) or inventing an unstated paint colour. Omitted (not guessed)
// when no such clause is present.
function finishFrom(construction: string): string | undefined {
  const match = /Powder-coated[^·]*/i.exec(construction);
  return match ? match[0].trim() : undefined;
}

function contentFor(args: ContentArgs, market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const applications = args.applications.map((item, index) => index === args.application?.index ? { ...item, image: args.application.image, imageAlt: args.application.imageAlt } : item);
  const modelIp = args.modelIp ?? args.voltage === "48 V DC";
  const prepared = PREPARED_ASSETS[args.slug];
  const finish = finishFrom(args.construction);
  return {
    ...shared(market, args.slug, args.title), metadata: { title: `${args.title} | InfraVolt`, description: ua ? `Каталожні технічні дані та розклад продукту ${args.label}.` : `Catalogue-verified ${args.label} product data and technical schedule.` },
    hero: { eyebrow: args.label, category: ua ? "Трек і Downlight" : "Track & Downlight", title: args.title, description: args.description, primaryAction: ua ? "Запросити технічний пакет" : "Request Technical Pack", secondaryAction: ua ? "Завантажити PDF-каталог" : "Download PDF Catalogue" },
    heroImage: prepared?.foreground ?? args.heroImage, heroImageAlt: args.heroImageAlt, heroBackgroundImage: prepared?.background ?? CATEGORY_BACKGROUND, heroBackgroundImageAlt: ua ? "Преміальний інтер'єр, освітлений трековими та вбудованими світильниками" : "Premium interior illuminated by track and downlight luminaires",
    technicalInformation: [
      { icon: "performance", title: ua ? "Продуктивність" : "Performance", values: [{ label: ua ? "Потужність" : "Power", value: args.powerSummary }, ...(args.lumenSummary ? [{ label: ua ? "Світловий потік" : "Luminous Flux", value: args.lumenSummary }] : []), ...(args.efficacySummary ? [{ label: ua ? "Каталожна ефективність" : "Catalogue Efficiency", value: args.efficacySummary }] : [])] },
      { icon: "light-quality", title: ua ? "Якість світла" : "Light Quality", values: [...(args.cri ? [{ label: "CRI", value: args.cri }] : []), ...(args.cct ? [{ label: ua ? "Колірна температура" : "Colour Temperature", value: args.cct }] : []), ...(args.lightSource ? [{ label: ua ? "Джерело світла" : "Light Source", value: args.lightSource }] : [])] },
      { icon: "protection-electrical", title: ua ? "Захист та електрика" : "Protection & Electrical", values: [{ label: ua ? "Напруга" : "Voltage", value: args.voltage }, ...(args.frequency ? [{ label: ua ? "Частота" : "Frequency", value: args.frequency }] : []), ...(args.ip ? [{ label: ua ? "Захист" : "Protection", value: args.ip }] : []), ...(args.temperature ? [{ label: ua ? "Робоча температура" : "Operating Temperature", value: args.temperature }] : [])] },
      { icon: "construction", title: ua ? "Конструкція та монтаж" : "Construction & Installation", values: [{ label: ua ? "Конструкція" : "Construction", value: args.construction }, { label: ua ? "Монтаж" : "Installation", value: args.installation }] },
    ],
    modelsIntroduction: ua ? `Точний каталожний розклад ${args.label}.` : `Exact ${args.label} catalogue schedule.`, models: makeModels(args.rows, { voltage: args.voltage, ...(args.frequency ? { frequency: args.frequency } : {}), ...(args.temperature ? { operatingTemperature: args.temperature } : {}), ...(args.cri ? { cri: args.cri } : {}), ...(args.cct ? { colourTemperature: args.cct } : {}), ...(args.ip && modelIp ? { ip: args.ip } : {}) }), modelsNote: args.modelsNote,
    modelsColumns: { model: ua ? "Модель / код каталогу" : "Model / Catalogue Code", power: ua ? "Потужність" : "Power", luminousFlux: args.rows.some((r) => r[2]) ? (ua ? "Світловий потік" : "Luminous Flux") : undefined, voltage: ua ? "Напруга" : "Voltage", frequency: args.frequency ? (ua ? "Частота" : "Frequency") : undefined, operatingTemperature: args.temperature ? (ua ? "Робоча темп." : "Operating Temp.") : undefined, efficiency: args.rows.some((r) => r[3]) ? (ua ? "Ефективність" : "Efficiency") : undefined, lens: args.rows.some((r) => r[5]) ? (ua ? "Опції променя" : "Beam Options") : undefined, cri: args.cri ? "CRI" : undefined, colourTemperature: args.cct ? "CCT" : undefined, dimensions: args.rows.some((r) => r[4]) ? (ua ? "Розміри" : "Dimensions") : undefined, ip: args.ip && modelIp ? "IP" : undefined }, modelsFilters: filters(market, args.label),
    familyTechnicalSection: args.familyTechnicalSection,
    controlOptions: args.controls ?? [],
    technicalAssurance: [
      ...(finish ? [{ icon: "colour-finish" as const, label: ua ? "Колір і покриття" : "Colour & Finish", value: finish }] : []),
      ...(args.ip ? [{ icon: "compliance" as const, label: ua ? "Відповідність" : "Compliance", value: args.ip }] : []),
      warrantyItem(ua, args.slug),
    ],
    ...(prepared ? {
      photometricHeading: ua ? "Фотометричні та технічні дані" : "Photometric & Technical Data",
      technicalAssets: [
        { title: ua ? "Фотометричні дані" : "Photometric Data", image: prepared.photometric, imageAlt: ua ? `Каталожні фотометричні дані ${args.title}` : `${args.title} catalogue photometric data` },
        { title: ua ? "Технічне креслення" : "Technical Drawing", image: prepared.technical, imageAlt: ua ? `Каталожне технічне креслення ${args.title}` : `${args.title} catalogue technical drawing` },
      ],
      dimensionNote: ua ? "Підготовлені каталожні фотометричні та габаритні довідкові матеріали — спільні для конфігурацій цієї продуктової серії." : "Prepared catalogue photometric and dimensional reference material — shared across configurations of this Product Series.",
    } : {}),
    applications, supportCta: { title: args.cta, description: ua ? "Обговоріть точну конфігурацію, вихід та проєктні опції з нашою технічною командою." : "Discuss the exact configuration, output and project options with our technical team.", action: talkToTeam(ua) },
  };
}

const CYL85: readonly Row[] = [["LDB-CYL85.20.02",20,"2,400 lm",">120 lm/W","85 × 235 × 258 mm","20° · 30° · 60°"],["LDB-CYL85.24.02",24,"2,880 lm",">120 lm/W","85 × 235 × 258 mm","20° · 30° · 60°"],["LDB-CYL85.28.02",28,"3,360 lm",">120 lm/W","85 × 235 × 258 mm","20° · 30° · 60°"],["LDB-CYL85.32.02",32,"3,840 lm",">120 lm/W","85 × 235 × 258 mm","20° · 30° · 60°"]];
const CYL70: readonly Row[] = [["LDB-CYL70.10.02",10,"1,200 lm",">120 lm/W","70 × 200 × 238 mm","24° · 36°"],["LDB-CYL70.15.02",15,"1,800 lm",">120 lm/W","70 × 200 × 238 mm","24° · 36°"],["LDB-CYL70.20.02",20,"2,400 lm",">120 lm/W","70 × 200 × 238 mm","24° · 36°"],["LDB-CYL70.24.02",24,"2,880 lm",">120 lm/W","70 × 200 × 238 mm","24° · 36°"]];
function cylContent(is70: boolean, market: MarketCode) { const label=is70?"CYL70":"CYL85"; return contentFor({ slug:"cyl-track-spot-series", title:"CYL Adjustable Track Spot Series", label, description:"Adjustable magnetic-track spotlights for precise accent and display lighting, available in CYL85 and CYL70 body sizes with configuration-specific beam options.", heroImage:`${ASSET_BASE}/cyl/${is70?"track-light-cyl70-product.webp":"track-light-cyl85-product.webp"}`, heroImageAlt:`${label} catalogue track spotlight`, rows:is70?CYL70:CYL85, voltage:"48 V DC", temperature:"−20 to +35 °C", cri:">80", cct:"2700–6500 K", ip:"IP20", powerSummary:is70?"10–24 W":"20–32 W", lumenSummary:is70?"1,200–2,880 lm":"2,400–3,840 lm", efficacySummary:">120 lm/W", lightSource:"COB LED", construction:"Powder-coated aluminium injection housing · aluminium reflector · extra-clear tempered glass or PC cover", installation:"Magnetic track adapter · adjustable", controls:trackControls(market==="ua"), applications:trackApps(market==="ua"), application:{index:2,image:`${ASSET_BASE}/cyl/track-light-cyl85-interior-application.webp`,imageAlt:"Catalogue interior illuminated by CYL85 track spotlights"}, technicalAssets:[{title:"Beam Options",image:`${ASSET_BASE}/cyl/${is70?"track-light-cyl70-beam-options.png":"track-light-cyl85-beam-options.png"}`,imageAlt:`${label} catalogue beam options`},{title:"Technical Drawing",image:`${ASSET_BASE}/cyl/${is70?"track-light-cyl70-cyptm60-technical-drawings.png":"track-light-cyl85-technical-drawing.png"}`,imageAlt:`${label} catalogue technical drawing`}], ...(is70?{familyTechnicalSection:{heading:"Retail Light Colour Options",introduction:"The catalogue also provides technical colour references; these do not replace the family's 2700–6500 K range.",settings:[{label:"1800 K",value:"Meat",description:"Catalogue retail light-colour reference."},{label:"2400 K",value:"Jewellery",description:"Catalogue retail light-colour reference."},{label:"6600 K",value:"Fish",description:"Catalogue retail light-colour reference."}],assets:[{title:"Retail Light Colour Reference",image:`${ASSET_BASE}/cyl/track-light-retail-light-color-options.png`,imageAlt:"CYL70 catalogue Meat, Jewellery and Fish light-colour references"}]}}:{}), cta:"Need a Track Spotlight Solution?" }, market); }
export function cylConfigurationsForMarket(market: MarketCode) { return [{id:"cyl85",label:"CYL85",content:cylContent(false, market)},{id:"cyl70",label:"CYL70",content:cylContent(true, market)}] as const; }

const CYTM: readonly Row[] = [["LDB-CYTM60.6.02",6,"784 lm",">128 lm/W","60 × 200 mm","24° · 34° · 48°"],["LDB-CYTM60.9.02",9,"1,089 lm",">128 lm/W","60 × 200 mm","24° · 34° · 48°"]];
const CYPTM: readonly Row[] = [["LDB-CYPTM60.6.01",6,"784 lm",">128 lm/W","60 × 200 mm","24° · 34° · 48°"],["LDB-CYPTM60.9.01",9,"1,089 lm",">128 lm/W","60 × 200 mm","24° · 34° · 48°"]];
function cytmContent(pendant:boolean, market: MarketCode){const label=pendant?"CYPTM60 Pendant":"CYTM60 Direct";return contentFor({slug:"cytm-cyptm-magnetic-track-series",title:"CYTM / CYPTM Magnetic Track Series",label,description:"Related but physically distinct direct and pendant magnetic-track spotlight configurations.",heroImage:`${ASSET_BASE}/cytm-cyptm/${pendant?"track-light-cyptm60-pendant-product.webp":"track-light-cytm60-product.webp"}`,heroImageAlt:`${label} catalogue product`,rows:pendant?CYPTM:CYTM,voltage:"48 V DC",temperature:"−20 to +35 °C",cri:">80",cct:"2700–6500 K",ip:"IP20",powerSummary:"6 or 9 W",lumenSummary:"784 or 1,089 lm",efficacySummary:">128 lm/W",lightSource:"COB LED",construction:"Powder-coated aluminium body · aluminium reflector",installation:pendant?"Magnetic track adapter · 1500 mm suspension":"Direct magnetic track adapter",controls:trackControls(market==="ua"),applications:trackApps(market==="ua"),technicalAssets:[{title:"Beam Options",image:`${ASSET_BASE}/cytm-cyptm/${pendant?"track-light-cyptm60-beam-options.png":"track-light-cytm60-beam-options.png"}`,imageAlt:`${label} beam options`},{title:"Technical Drawing",image:`${ASSET_BASE}/cytm-cyptm/${pendant?"track-light-cyl70-cyptm60-technical-drawings.png":"track-light-cytm60-cylp70-technical-drawings.png"}`,imageAlt:`${label} catalogue technical drawing`}],cta:"Planning a Magnetic Track Lighting System?"}, market);}
export function cytmCyptmConfigurationsForMarket(market:MarketCode){return[{id:"cytm60",label:"CYTM60",content:cytmContent(false, market)},{id:"cyptm60",label:"CYPTM60",content:cytmContent(true, market)}] as const;}

const CYLP: readonly Row[] = [["LDB-CYLP70.08.02",8,"960 lm",">120 lm/W","70 × 200 mm","24° · 36° · 45°"],["LDB-CYLP70.10.02",10,"1,200 lm",">120 lm/W","70 × 200 mm","24° · 36° · 45°"],["LDB-CYLP70.15.02",15,"1,800 lm",">120 lm/W","70 × 200 mm","24° · 36° · 45°"],["LDB-CYLP70.20.02",20,"2,400 lm",">120 lm/W","70 × 200 mm","24° · 36° · 45°"]];
export function cylpConfigurationsForMarket(market:MarketCode){const c=contentFor({slug:"cylp-pendant-track-series",title:"CYLP70 Pendant Track Series",label:"CYLP70",description:"Pendant magnetic-track family for focused vertical and decorative accent illumination.",heroImage:`${ASSET_BASE}/cylp/track-light-cylp70-product.webp`,heroImageAlt:"CYLP70 catalogue pendant track luminaire",rows:CYLP,voltage:"48 V DC",temperature:"−20 to +35 °C",cri:">80",cct:"2700–6500 K",ip:"IP20",powerSummary:"8–20 W",lumenSummary:"960–2,400 lm",efficacySummary:">120 lm/W",lightSource:"COB LED",construction:"Powder-coated aluminium body · aluminium reflector",installation:"Magnetic track adapter · 1500 mm cable",controls:trackControls(market==="ua"),applications:trackApps(market==="ua"),familyTechnicalSection:{heading:"Pendant Track Configuration",introduction:"The CYLP70 catalogue configuration combines magnetic-track connection with a suspended vertical luminaire.",settings:[{label:"Connection",value:"Magnetic track",description:"Dedicated 48 V DC track connection."},{label:"Suspension",value:"1500 mm cable",description:"Catalogue-stated suspension length."},{label:"Optics",value:"24° · 36° · 45°",description:"Multiple beam choices for vertical accent lighting."}],assets:[]},technicalAssets:[{title:"Beam Options",image:`${ASSET_BASE}/cylp/track-light-cylp70-beam-options.png`,imageAlt:"CYLP70 catalogue beam options"},{title:"Technical Drawing",image:`${ASSET_BASE}/cylp/track-light-cytm60-cylp70-technical-drawings.png`,imageAlt:"CYLP70 catalogue technical drawing"}],cta:"Need a Pendant Track Lighting Solution?"}, market);return[{id:"cylp70",label:"CYLP70",content:c}] as const;}

const LNRT:readonly Row[]=[["LDB-LNRT4060.13.02",13,"1,495 lm",">115 lm/W","40 × 600 × 80 mm"],["LDB-LNRT4090.20.02",20,"2,300 lm",">115 lm/W","40 × 900 × 80 mm"],["LDB-LNRT40120.27.02",27,"3,105 lm",">115 lm/W","40 × 1200 × 80 mm"],["LDB-LNRT40150.34.02",34,"3,910 lm",">115 lm/W","40 × 1500 × 80 mm"]];
export function lnrtConfigurationsForMarket(market:MarketCode){const c=contentFor({slug:"lnrt-linear-track-series",title:"LNRT40 Linear Track Series",label:"LNRT40",description:"Linear magnetic-track modules for continuous and uniform illumination within architectural track-lighting systems.",heroImage:`${ASSET_BASE}/lnrt/lnrt40-product.webp`,heroImageAlt:"LNRT40 catalogue linear track module",rows:LNRT,voltage:"48 V DC",cri:">80",cct:"3000–6500 K",ip:"IP20",powerSummary:"13–34 W",lumenSummary:"1,495–3,910 lm",efficacySummary:">115 lm/W",lightSource:"COB LED",construction:"Powder-coated aluminium housing · aluminium reflector",installation:"Magnetic track adapter",controls:trackControls(market==="ua"),applications:lnrtApps(market==="ua"),technicalAssets:[{title:"Technical Drawing",image:`${ASSET_BASE}/lnrt/lnrt40-stn120-drawings.png`,imageAlt:"Catalogue drawing panel containing the LNRT40 dimensional reference"}],cta:"Need a Linear Track Lighting Solution?"}, market);return[{id:"lnrt40",label:"LNRT40",content:c}] as const;}

const STN120:readonly Row[]=[["LDB-STN120.24.02",24,"2,880 lm",">120 lm/W","120 × 197 × 242 mm","20° · 30° · 40° · 60°"],["LDB-STN120.28.02",28,"3,360 lm",">120 lm/W","120 × 197 × 242 mm","20° · 30° · 40° · 60°"],["LDB-STN120.31.02",31,"3,720 lm",">120 lm/W","120 × 197 × 242 mm","20° · 30° · 40° · 60°"],["LDB-STN120.35.02",35,"4,200 lm",">120 lm/W","120 × 197 × 242 mm","20° · 30° · 40° · 60°"]];
const STN104:readonly Row[]=[["LDB-STN104.20.02",20,"2,400 lm",">120 lm/W","104 × 163 × 200 mm","20° · 30° · 40° · 60°"],["LDB-STN104.24.02",24,"2,880 lm",">120 lm/W","104 × 163 × 200 mm","20° · 30° · 40° · 60°"],["LDB-STN104.28.02",28,"3,360 lm",">120 lm/W","104 × 163 × 200 mm","20° · 30° · 40° · 60°"],["LDB-STN104.31.02",31,"3,720 lm",">120 lm/W","104 × 163 × 200 mm","20° · 30° · 40° · 60°"]];
const STN70:readonly Row[]=[["LDB-STN70.10.02",10,"1,200 lm",">120 lm/W","70 × 133 × 141 mm","20° · 30° · 40° · 60°"],["LDB-STN70.14.02",14,"1,680 lm",">120 lm/W","70 × 133 × 141 mm","20° · 30° · 40° · 60°"]];
const STD96:readonly Row[]=[["LDB-STD96.26.02",26,"2,990 lm",">115 lm/W","96 × 113 × 322 mm","15° · 24° · 36° · 45°"],["LDB-STD96.26.02",32,"3,680 lm",">115 lm/W","96 × 113 × 322 mm","15° · 24° · 36° · 45°"],["LDB-STD96.26.02",42,"4,830 lm",">115 lm/W","96 × 113 × 322 mm","15° · 24° · 36° · 45°"]];
const STY96:readonly Row[]=[["LDB-STY96.26.02",26,"2,990 lm",">115 lm/W","96 × 113 mm","15° · 24° · 36° · 45°"],["LDB-STY96.26.02",32,"3,680 lm",">115 lm/W","96 × 113 mm","15° · 24° · 36° · 45°"],["LDB-STY96.26.02",42,"4,830 lm",">115 lm/W","96 × 113 mm","15° · 24° · 36° · 45°"]];
function stnContent(id:"stn120"|"stn104"|"stn70"|"std96"|"sty96", market: MarketCode){const cfg={stn120:{label:"STN120",rows:STN120,image:"stn120-product.webp",beam:"stn120-beam-options.png",drawing:"lnrt40-stn120-drawings.png",power:"24–35 W",flux:"2,880–4,200 lm",eff:">120 lm/W"},stn104:{label:"STN104",rows:STN104,image:"stn104-product.webp",beam:"stn104-stn70-beam-options.png",drawing:"stn104-stn70-drawings.png",power:"20–31 W",flux:"2,400–3,720 lm",eff:">120 lm/W"},stn70:{label:"STN70",rows:STN70,image:"stn70-product.webp",beam:"stn104-stn70-beam-options.png",drawing:"stn104-stn70-drawings.png",power:"10 or 14 W",flux:"1,200 or 1,680 lm",eff:">120 lm/W"},std96:{label:"STD96",rows:STD96,image:"std96-product.webp",beam:"std96-sty96-beam-options.png",drawing:"std96-sty96-drawings.png",power:"26–42 W",flux:"2,990–4,830 lm",eff:">115 lm/W"},sty96:{label:"STY96",rows:STY96,image:"sty96-product.webp",beam:"std96-sty96-beam-options.png",drawing:"std96-sty96-drawings.png",power:"26–42 W",flux:"2,990–4,830 lm",eff:">115 lm/W"}}[id];return contentFor({slug:"stn-std-sty-track-spot-series",title:"STN / STD / STY Track Spot Series",label:cfg.label,description:"Commercial track-spot family with five genuine body and optical configurations.",heroImage:`${ASSET_BASE}/stn-std-sty/${cfg.image}`,heroImageAlt:`${cfg.label} catalogue track spotlight`,rows:cfg.rows,voltage:"48 V DC",cri:">80",cct:"2700–6500 K",ip:"IP20",powerSummary:cfg.power,lumenSummary:cfg.flux,efficacySummary:cfg.eff,lightSource:"COB LED",construction:"Powder-coated aluminium body · aluminium reflector",installation:"Magnetic track adapter · adjustable",controls:trackControls(market==="ua"),applications:trackApps(market==="ua"),technicalAssets:[{title:"Beam Options",image:`${ASSET_BASE}/stn-std-sty/${cfg.beam}`,imageAlt:`${cfg.label} catalogue beam options`},{title:"Technical Drawing",image:`${ASSET_BASE}/stn-std-sty/${cfg.drawing}`,imageAlt:`${cfg.label} catalogue technical drawing`}],modelsNote:id==="std96"||id==="sty96"?"The catalogue repeats the same published order code across its 26 W, 32 W and 42 W rows. Those source rows are intentionally preserved.":undefined,cta:"Need a Track Spot Solution?"}, market);}
export function stnConfigurationsForMarket(market:MarketCode){return(["stn120","stn104","stn70","std96","sty96"] as const).map((id)=>({id,label:id.toUpperCase(),content:stnContent(id, market)}));}

const BOOM_LED:readonly Row[]=[["LDB-BOOM H K D2",8,"592 lm","74+ lm/W","100 × 100 mm"]];
const BOOM_GU10:readonly Row[]=[["LDB-BOOM H K D2 (GU10)",4.5,"345 lm","76+ lm/W","100 × 100 mm"]];
const BOLTON:readonly Row[]=[["LDB-BLT2T-8",8,"748 lm","93+ lm/W","Ø73 mm"],["LDB-BLT2TGU10-4,5",4.5,"345 lm","76+ lm/W"],["LDB-BLT3T-20",20,"2,140 lm","107+ lm/W","Ø73 mm"],["LDB-BLT3T-28",28,"2,800 lm","100+ lm/W","Ø73 mm"]];
function boomContent(id:"led"|"gu10"|"bolton", market: MarketCode){const cfg={led:{label:"BOOM LED",rows:BOOM_LED,image:"p077-product-01.webp",source:"COB LED",install:"Recessed or surface-mounted adjustable BOOM body"},gu10:{label:"BOOM GU10",rows:BOOM_GU10,image:"p077-product-01.webp",source:"GU10 LED lamp",install:"Recessed or surface-mounted adjustable BOOM body"},bolton:{label:"BOLTON",rows:BOLTON,image:"p086-product-01.webp",source:"COB LED or GU10 by published row",install:"Pendant two- and three-head configurations · 1500 mm suspension"}}[id];return contentFor({slug:"boom-bolton-adjustable-downlights",title:"BOOM & BOLTON Adjustable Downlights",label:cfg.label,description:"Source-backed adjustable BOOM recessed and surface forms together with BOLTON multi-head pendant configurations.",heroImage:`${ASSET_BASE}/boom-bolton/${cfg.image}`,heroImageAlt:`${cfg.label} catalogue product`,rows:cfg.rows,voltage:"220–240 Vac",frequency:"50–60 Hz",temperature:"−20 to +35 °C",cri:"80+",cct:"2700–6500 K",powerSummary:id==="bolton"?"4.5–28 W":"4.5 or 8 W",lumenSummary:id==="bolton"?"345–2,800 lm":"345 or 592 lm",lightSource:cfg.source,construction:"Powder-coated die-cast aluminium recessed body · fabricated steel surface cover where specified · clear PMMA · optional tempered glass",installation:cfg.install,controls:downlightControls(market==="ua"),applications:downlightApps(market==="ua"),application:id==="bolton"?{index:4,image:`${ASSET_BASE}/boom-bolton/p086-application.webp`,imageAlt:"Catalogue corridor with BOLTON pendant downlights"}:undefined,familyTechnicalSection:{heading:"Adjustable Configurations",introduction:"The catalogue presents distinct BOOM and BOLTON physical arrangements.",settings:[{label:"BOOM Recessed",value:"Adjustable SA",description:"Die-cast aluminium recessed body."},{label:"BOOM Surface Mounted",value:"Adjustable SU",description:"Recessed body with fabricated steel surface cover."},{label:"Lamp Options",value:"LED / GU10",description:"COB performance is applied only to LED variants."},{label:"BOLTON",value:"Two / three heads",description:"Published pendant multi-head configurations."}],assets:[]},cta:"Need an Adjustable Downlight Solution?"}, market);}
export function boomBoltonConfigurationsForMarket(market:MarketCode){return[{id:"boom-led",label:"BOOM LED",content:boomContent("led", market)},{id:"boom-gu10",label:"BOOM GU10",content:boomContent("gu10", market)},{id:"bolton",label:"BOLTON",content:boomContent("bolton", market)}] as const;}

const MCRS:readonly Row[]=[["LDB-MCRS3-8",8,"856 lm","107+ lm/W"],["LDB-MCRS3-12",12,"1,272 lm","106+ lm/W"],["LDB-MCRS3-19",19,"1,843 lm","97+ lm/W"],["LDB-MCRS4-12",12,"1,332 lm","111+ lm/W"],["LDB-MCRS4-19",19,"1,957 lm","103+ lm/W"],["LDB-MCRS4-26",26,"2,834 lm","109+ lm/W"],["LDB-MCRS4-32",32,"3,104 lm","97+ lm/W"],["LDB-MCRS5-19",19,"1,634 lm","86+ lm/W"],["LDB-MCRS5-26",26,"2,340 lm","90+ lm/W"],["LDB-MCRS5-32",32,"2,784 lm","87+ lm/W"],["LDB-MCRS5-42",42,"3,276 lm","78+ lm/W"]];
export function mcrsConfigurationsForMarket(market:MarketCode){const c=contentFor({slug:"mcrs-recessed-downlights",title:"MCRS Recessed Downlight Series",label:"MCRS",description:"Recessed downlight family with eleven exact catalogue performance rows across three body sizes.",heroImage:`${ASSET_BASE}/mcrs/p078-product-01.webp`,heroImageAlt:"MCRS Mercury S3 catalogue recessed downlight",rows:MCRS,voltage:"220–240 Vac",frequency:"50–60 Hz",cri:"80+",cct:"2700–6500 K",powerSummary:"8–42 W",lumenSummary:"856–3,276 lm",efficacySummary:"78+ to 111+ lm/W by model",lightSource:"COB LED",construction:"Aluminium die-cast heatsink · powder-coated die-cast aluminium recessed body",installation:"Recessed",controls:downlightControls(market==="ua"),applications:downlightApps(market==="ua"),application:{index:0,image:`${ASSET_BASE}/mcrs/p078-application.webp`,imageAlt:"Catalogue café interior illuminated by MCRS downlights"},modelsNote:"IP20 / IP44 / IP54 / IP65 are family-page references and are not assigned to every individual order code.",cta:"Need an MCRS Downlight Solution?"}, market);return[{id:"mcrs",label:"MCRS",content:c}] as const;}

const MCRH:readonly Row[]=[["LDB-MCRH3-8",8,"856 lm","107+ lm/W"],["LDB-MCRH3-12",12,"1,272 lm","106+ lm/W"],["LDB-MCRH3-19",19,"1,843 lm","97+ lm/W"],["LDB-MCRH4-12",12,"1,332 lm","111+ lm/W"],["LDB-MCRH4-19",19,"1,957 lm","103+ lm/W"],["LDB-MCRH4-26",26,"2,834 lm","109+ lm/W"],["LDB-MCRH4-32",32,"3,104 lm","97+ lm/W"],["LDB-MCRH5-19",19,"1,634 lm","86+ lm/W"],["LDB-MCRH5-26",26,"2,340 lm","90+ lm/W"],["LDB-MCRH5-32",32,"2,784 lm","87+ lm/W"],["LDB-MCRH5-42",42,"3,276 lm","78+ lm/W"]];
const MCRKS:readonly Row[]=[["LDB-MCRKS3-8",8,"856 lm","107+ lm/W"],["LDB-MCRKS3-12",12,"1,272 lm","106+ lm/W"],["LDB-MCRKS3-19",19,"1,843 lm","97+ lm/W"],["LDB-MCRKS4-12",12,"1,332 lm","111+ lm/W"],["LDB-MCRKS4-19",19,"1,957 lm","103+ lm/W"],["LDB-MCRKS4-26",26,"2,834 lm","109+ lm/W"],["LDB-MCRKS4-32",32,"3,104 lm","97+ lm/W"],["LDB-MCRKS5-19",19,"1,634 lm","86+ lm/W"],["LDB-MCRKS5-26",26,"2,340 lm","90+ lm/W"],["LDB-MCRKS5-32",32,"2,784 lm","87+ lm/W"],["LDB-MCRKS5-42",42,"3,276 lm","78+ lm/W"]];
function mcrhContent(square:boolean, market: MarketCode){const label=square?"MCRKS Square":"MCRH Round";return contentFor({slug:"mcrh-downlights",title:"MCRH Downlight Series",label,description:"Catalogue-verified round MCRH and square MCRKS recessed downlight forms; no codes are inferred between the two tables.",heroImage:`${ASSET_BASE}/mcrh-mcrks/${square?"p081-product-01.webp":"p080-product-01.webp"}`,heroImageAlt:`${label} catalogue downlights`,rows:square?MCRKS:MCRH,voltage:"220–240 Vac",frequency:"50–60 Hz",temperature:"−20 to +35 °C",cri:"80+",cct:"2700–6500 K",powerSummary:"8–42 W",lumenSummary:"856–3,276 lm",efficacySummary:"78+ to 111+ lm/W by model",lightSource:"COB LED",construction:"Aluminium die-cast heatsink · powder-coated die-cast aluminium body",installation:"Recessed; surface-cover context where catalogue-supported",controls:downlightControls(market==="ua"),applications:downlightApps(market==="ua"),application:{index:square?4:0,image:`${ASSET_BASE}/mcrh-mcrks/${square?"p081-application.webp":"p080-application.webp"}`,imageAlt:`Catalogue interior using ${label} downlights`},modelsNote:"Family IP references are not converted into universal per-code protection ratings.",cta:"Need an MCRH or MCRKS Downlight Solution?"}, market);}
export function mcrhConfigurationsForMarket(market:MarketCode){return[{id:"mcrh",label:"MCRH Round",content:mcrhContent(false, market)},{id:"mcrks",label:"MCRKS Square",content:mcrhContent(true, market)}] as const;}

const MOON:readonly Row[]=[["LDB-MOON4-32",32,"2,528 lm","79+ lm/W","Ø178 mm"],["LDB-MOON4-42",42,"3,402 lm","81+ lm/W","Ø178 mm"]];
const JPT:readonly Row[]=[["LDB-JPT-32",32,"2,784 lm","87+ lm/W","Ø200 mm"],["LDB-JPT-42",42,"3,276 lm","78+ lm/W","Ø200 mm"]];
function moonContent(jpt:boolean, market: MarketCode){return contentFor({slug:"moon-jpt-downlights",title:"MOON & JPT Downlights",label:jpt?"JPT / JUPITER":"MOON 4",description:"MOON 4 recessed/surface forms and JPT / JUPITER recessed downlights, using their exact published order codes.",heroImage:jpt?`${ASSET_BASE}/moon-jpt/p082-product-02.webp`:`${CATEGORY_ASSET_BASE}/series/moon-jpt-product.webp`,heroImageAlt:jpt?"JPT / JUPITER catalogue downlight":"MOON 4 catalogue downlight",rows:jpt?JPT:MOON,voltage:"220–240 Vac",frequency:"50–60 Hz",cri:"80+",cct:"2700–6500 K",powerSummary:"32 or 42 W",lumenSummary:jpt?"2,784 or 3,276 lm":"2,528 or 3,402 lm",efficacySummary:jpt?"78+ or 87+ lm/W":"79+ or 81+ lm/W",lightSource:"COB LED",construction:"Powder-coated die-cast aluminium body · clear PMMA · optional tempered glass · aluminium reflector",installation:jpt?"Recessed":"MOON 4 SA / SU physical configurations",controls:downlightControls(market==="ua").slice(0,2),applications:downlightApps(market==="ua"),modelsNote:jpt?undefined:"SA and SU are catalogue physical configurations; ambiguous code-to-mounting mapping is not fabricated.",cta:"Need a General Downlight Solution?"}, market);}
export function moonJptConfigurationsForMarket(market:MarketCode){return[{id:"moon",label:"MOON 4",content:moonContent(false, market)},{id:"jpt",label:"JPT / JUPITER",content:moonContent(true, market)}] as const;}

const FRAME_MERCURY:readonly Row[]=[["LDB-FR1MRCH3-8",8,"856 lm","107+ lm/W","130 × 130 mm"],["LDB-FR2MRCH3-16",16,"1,712 lm","107+ lm/W","240 × 130 mm"],["LDB-FR2MRCH3-24",24,"2,544 lm","106+ lm/W","240 × 130 mm"],["LDB-FR2MRCH3-38",38,"3,686 lm","97+ lm/W","240 × 130 mm"],["LDB-FR3MRCH3-36",36,"3,492 lm","97+ lm/W","350 × 130 mm"],["LDB-FR3MRCH3-57",57,"5,529 lm","97+ lm/W","350 × 130 mm"],["LDB-FR1MRCH5-32",32,"2,784 lm","87+ lm/W","198 × 198 mm"],["LDB-FR2MRCH5-42",42,"3,276 lm","78+ lm/W","353 × 198 mm"],["LDB-FR2MRCH5-64",64,"5,568 lm","87+ lm/W","353 × 198 mm"],["LDB-FR2MRCH5-84",84,"6,552 lm","78+ lm/W","353 × 198 mm"],["LDB-FR3MRCH5-96",96,"8,352 lm","87+ lm/W","508 × 198 mm"],["LDB-FR3MRCH5-126",126,"9,828 lm","78+ lm/W","508 × 198 mm"]];
const FRAME_BOOM:readonly Row[]=[["LDB-FRAME 2 BOOM YD2",16,"1,184 lm","74+ lm/W","130 × 240 mm"],["LDB-FRAME 2 BOOM YD2 (GU10)",9,"690 lm","76+ lm/W","130 × 240 mm"],["LDB-FRAME 2 BOOM HD2",16,"1,184 lm","74+ lm/W","130 × 240 mm"],["LDB-FRAME 2 BOOM HD2 (GU10)",9,"690 lm","76+ lm/W","130 × 240 mm"]];
const FRAME_GU10:readonly Row[]=[["LDB-FRM1GU10-5",5,"380 lm","74+ lm/W","130 × 130 mm"],["LDB-FRM1GU10-8",8,"592 lm","76+ lm/W","130 × 130 mm"],["LDB-FRM2GU10-9",9,"690 lm","76+ lm/W","130 × 260 mm"],["LDB-FRM2GU10-16",16,"1,184 lm","74+ lm/W","130 × 260 mm"]];
function frameContent(id:"mercury"|"boom"|"gu10", market: MarketCode){const cfg={mercury:{label:"Mercury Frame",rows:FRAME_MERCURY,image:"p083-product-05.webp",power:"8–126 W",flux:"856–9,828 lm",source:"COB LED"},boom:{label:"FRAME + BOOM",rows:FRAME_BOOM,image:"p084-product-01.webp",power:"9 or 16 W",flux:"690 or 1,184 lm",source:"COB LED or GU10 by published row"},gu10:{label:"GU10 Frame",rows:FRAME_GU10,image:"p085-product-03.webp",power:"5–16 W",flux:"380–1,184 lm",source:"GU10 LED lamp"}}[id];return contentFor({slug:"frame-multi-head-spotlights",title:"FRAME Multi-Head Spotlights",label:cfg.label,description:"One-, two- and three-head recessed spotlight modules using complete source codes for Mercury, BOOM and GU10 configurations.",heroImage:`${ASSET_BASE}/frame/${cfg.image}`,heroImageAlt:`${cfg.label} catalogue product`,rows:cfg.rows,voltage:"220–240 Vac",frequency:"50–60 Hz",temperature:"−20 to +35 °C",cri:"80+",cct:"2700–6500 K",powerSummary:cfg.power,lumenSummary:cfg.flux,lightSource:cfg.source,construction:"Powder-coated die-cast aluminium body · clear PMMA · optional tempered glass · aluminium reflector",installation:"Recessed multi-head frame",controls:downlightControls(market==="ua"),applications:downlightApps(market==="ua"),cta:"Need a Multi-Head Display Lighting Solution?"}, market);}
export function frameConfigurationsForMarket(market:MarketCode){return[{id:"mercury",label:"Mercury Frame",content:frameContent("mercury", market)},{id:"boom",label:"FRAME + BOOM",content:frameContent("boom", market)},{id:"gu10",label:"GU10 Frame",content:frameContent("gu10", market)}] as const;}

const STRN:readonly Row[]=[["LDB-STRN6-8",8,"1,206 lm","67+ lm/W","Ø225 mm"],["LDB-STRN6-12",12,"1,408 lm","64+ lm/W","Ø225 mm"],["LDB-STRN6-15",15,"1,305 lm","69+ lm/W","Ø225 mm"],["LDB-STRN6-25",25,"1,600 lm","64+ lm/W","Ø225 mm"]];
const SIGMA:readonly Row[]=[["LDB-DW2-7",7,"875 lm","125+ lm/W","Ø90 mm"],["LDB-DW4-10",10,"1,250 lm","125+ lm/W","Ø122 mm"],["LDB-DW6-16",16,"2,112 lm","132+ lm/W","Ø175 mm"],["LDB-DW6-22",22,"2,904 lm","132+ lm/W","Ø175 mm"],["LDB-DW8-20",20,"2,750 lm","136+ lm/W","Ø225 mm"],["LDB-DW8-33",33,"4,290 lm","130+ lm/W","Ø225 mm"]];
function compactContent(sigma:boolean, market: MarketCode){return contentFor({slug:"compact-standard-downlights",title:"STRN & Compact Downlight Series",label:sigma?"SIGMA Compact":"STRN",description:"Source-backed STRN and SIGMA compact downlight configurations from catalogue pages 87 and 88.",heroImage:`${ASSET_BASE}/compact/${sigma?"p088-product-01.webp":"p087-product-01.webp"}`,heroImageAlt:sigma?"SIGMA compact recessed catalogue downlights":"STRN / SATURN 6 recessed catalogue downlight",rows:sigma?SIGMA:STRN,voltage:"220–240 Vac",frequency:"50–60 Hz",temperature:"−20 to +35 °C",cri:"80+",cct:"2700–6500 K",ip:sigma?"IP20 / IP40":undefined,powerSummary:sigma?"7–33 W":"8–25 W",lumenSummary:sigma?"875–4,290 lm":"1,206–1,600 lm",efficacySummary:sigma?"125+ to 136+ lm/W":"64+ to 69+ lm/W",lightSource:sigma?"Mid Power LED · backlit":"Mid Power LED",construction:sigma?"Powder-coated die-cast aluminium recessed body · fabricated steel surface cover · PS opal · optional PMMA / prismatic":"Aluminium die-cast heatsink · powder-coated die-cast aluminium recessed body",installation:sigma?"SIGMA SA recessed / SU surface mounted":"STRN recessed / surface forms",controls:sigma?downlightControls(market==="ua"):[],applications:downlightApps(market==="ua"),application:{index:sigma?4:1,image:`${ASSET_BASE}/compact/${sigma?"p088-application.webp":"p087-application.webp"}`,imageAlt:sigma?"Catalogue interior illuminated by SIGMA compact downlights":"Catalogue office illuminated by STRN downlights"},modelsNote:sigma?undefined:"No verified IP rating is assigned to the STRN order codes.",cta:"Need a Compact Downlight Solution?"}, market);}
export function compactConfigurationsForMarket(market:MarketCode){return[{id:"strn",label:"STRN",content:compactContent(false, market)},{id:"sigma",label:"SIGMA Compact",content:compactContent(true, market)}] as const;}

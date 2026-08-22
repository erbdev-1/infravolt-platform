import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

export const DECORATIVE_CATEGORY_HREF = "/products/led-systems/decorative-lighting";

const ASSET_BASE = "/assets/products/led-lighting/series/decorative";
const CATEGORY_ASSET_BASE = "/assets/products/led-lighting/category/decorative";
const PRODUCT_BASE = `${CATEGORY_ASSET_BASE}/product`;
const BACKGROUND_BASE = `${PRODUCT_BASE}/background`;
const PHOTOMETRIC_BASE = `${CATEGORY_ASSET_BASE}/photometric`;
const TECHNICAL_BASE = `${CATEGORY_ASSET_BASE}/technical`;

// Prepared per-family hero + photometric/technical assets. RN and VL are
// filed with their background/foreground roles swapped between the two
// folders on disk (the file literally named "...hero-product-transparent"
// sits inside product/background/, and vice versa) — referenced here by
// each file's own stated role, not by its containing folder (same
// established pattern as the panel-series IPNL asset comment).
const PREPARED_ASSETS: Record<string, { background: string; foreground: string; photometric: string; technical: string }> = {
  "rn-decorative-series": {
    background: `${PRODUCT_BASE}/rn-decorative-series-hero-background.webp`,
    foreground: `${BACKGROUND_BASE}/rn-decorative-series-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/rn-decorative-series-photometric-data-4k.png`,
    technical: `${TECHNICAL_BASE}/rn-decorative-series-technical-drawing-4k.png`,
  },
  "vl-decorative-series": {
    background: `${PRODUCT_BASE}/vl-decorative-series-hero-background.webp`,
    foreground: `${BACKGROUND_BASE}/vl-decorative-series-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/vl-decorative-series-photometric-data-4k.png`,
    technical: `${TECHNICAL_BASE}/vl-decorative-series-technical-drawing-4k.png`,
  },
  "round-ring-series": {
    background: `${BACKGROUND_BASE}/round-ring-series-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/round-ring-series-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/round-ring-series-photometric-data-4k.png`,
    technical: `${TECHNICAL_BASE}/round-ring-series-technical-drawing-4k.png`,
  },
  "square-ring-series": {
    background: `${BACKGROUND_BASE}/square-ring-series-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/square-ring-series-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/square-ring-series-photometric-data-4k.png`,
    technical: `${TECHNICAL_BASE}/square-ring-series-technical-drawing-4k.png`,
  },
  "up-down-architectural-ring-series": {
    background: `${BACKGROUND_BASE}/architectural-up-down-ring-series-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/architectural-up-down-ring-series-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/architectural-up-down-ring-series-photometric-data-4k.png`,
    technical: `${TECHNICAL_BASE}/architectural-up-down-ring-series-technical-drawing-4k.png`,
  },
  // The bollard/pole/landscape pages each cover several catalogue
  // sub-families on one route (BON/DEU/BRC, PYL/RZR/SCO/TTR/TRC/VK,
  // GER-LED7043/VK-QTPO/E100SQBL). One representative photometric/
  // technical pair is shown per page — the same simplification already
  // used for each page's single representative hero photo.
  "decorative-bollard-lighting": {
    background: `${BACKGROUND_BASE}/decorative-bollard-lighting-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/decorative-bollard-lighting-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/bollard-lighting/bon-photometric-data-4k.png`,
    technical: `${TECHNICAL_BASE}/bollard-lighting/bon-technical-drawing-4k.png`,
  },
  "decorative-pole-lighting": {
    background: `${BACKGROUND_BASE}/decorative-pole-lighting-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/decorative-pole-lighting-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/pole-lighting/ldb-vk-photometric-data-4k.png`,
    technical: `${TECHNICAL_BASE}/pole-lighting/ldb-vk-technical-drawing-4k.png`,
  },
  "park-landscape-pole-systems": {
    background: `${BACKGROUND_BASE}/park-landscape-pole-systems-hero-background.webp`,
    foreground: `${PRODUCT_BASE}/park-landscape-pole-systems-hero-product-transparent.webp`,
    photometric: `${PHOTOMETRIC_BASE}/landscape/ldb-vk-qtpo200-photometric-data-4k.png`,
    technical: `${TECHNICAL_BASE}/landscape/ldb-vk-qtpo200-technical-drawing-4k.png`,
  },
};

const FAMILIES = [
  ["rn-decorative-series", "RN Decorative Series", "Round interior decorative luminaires", "Круглі декоративні світильники для інтер'єру"],
  ["vl-decorative-series", "VL Decorative Series", "Compact wall-mounted decorative luminaire", "Компактний настінний декоративний світильник"],
  ["round-ring-series", "Round Ring Series", "Single, multiple and Orbit ring configurations", "Конфігурації Single, Multiple та Orbit"],
  ["square-ring-series", "Square Ring Series", "Single and double square-ring configurations", "Одинарна та подвійна квадратна конфігурації"],
  ["up-down-architectural-ring-series", "Up & Down / Architectural Ring Series", "Surface, suspended and up/down architectural rings", "Накладні, підвісні та Up/Down архітектурні кільця"],
  ["decorative-bollard-lighting", "Decorative Bollard Lighting", "BON, DEU and BRC outdoor bollards", "Вуличні стовпчики BON, DEU та BRC"],
  ["decorative-pole-lighting", "Decorative Pole Lighting", "Catalogue decorative pole families", "Каталожні серії декоративних опор"],
  ["park-landscape-pole-systems", "Park & Landscape Pole Systems", "Architectural park and landscape poles", "Архітектурні паркові та ландшафтні опори"],
] as const;

function siblings(current: string, market: MarketCode) {
  const ua = market === "ua";
  return FAMILIES.map(([slug, name, subtitleEn, subtitleUa]) => ({
    slug,
    name,
    subtitle: ua ? subtitleUa : subtitleEn,
    ...(slug === current
      ? { isCurrent: true }
      : { href: `${DECORATIVE_CATEGORY_HREF}/${slug}` }),
  }));
}

// Single source of truth for Decorative Lighting warranty terms — every
// family is 5 years except Decorative Bollard Lighting, which is 7.
function warrantyItem(ua: boolean, years: 5 | 7 = 5) {
  return { icon: "warranty" as const, label: ua ? "Гарантія" : "Warranty", value: ua ? `${years} років гарантії` : `${years}-Year Warranty` };
}

// Small shared translation surfaces reused across every family in this
// file — kept local to this file (single source of truth per file) rather
// than duplicated per-function, mirroring the established filters()/
// shared() pattern below.
function categoryLabel(ua: boolean) {
  return ua ? "Декоративне освітлення" : "Decorative Lighting";
}

function heroActions(ua: boolean) {
  return { primaryAction: ua ? "Запросити технічний пакет" : "Request Technical Pack", secondaryAction: ua ? "Завантажити PDF-каталог" : "Download PDF Catalogue" };
}

function photometricHeading(ua: boolean) {
  return ua ? "Фотометричні та технічні дані" : "Photometric & Technical Data";
}

function technicalAssetTitles(ua: boolean) {
  return { photometric: ua ? "Фотометричні дані" : "Photometric Data", drawing: ua ? "Технічне креслення" : "Technical Drawing" };
}

function preparedDimensionNote(ua: boolean) {
  return ua ? "Підготовлені каталожні фотометричні та габаритні довідкові матеріали." : "Prepared catalogue photometric and dimensional reference material.";
}

function talkToTeam(ua: boolean) {
  return ua ? "Звернутися до нашої технічної команди" : "Talk to Our Technical Team";
}

const CARD_TITLES = {
  performance: ["Performance", "Продуктивність"],
  "light-quality": ["Light Quality", "Якість світла"],
  electrical: ["Electrical", "Електрика"],
  "protection-electrical": ["Protection & Electrical", "Захист та електрика"],
  construction: ["Construction", "Конструкція"],
  "construction-installation": ["Construction & Installation", "Конструкція та монтаж"],
} as const;

function cardTitle(ua: boolean, key: keyof typeof CARD_TITLES) {
  const [en, uaText] = CARD_TITLES[key];
  return ua ? uaText : en;
}

function filters(market: MarketCode, title: string): NonNullable<LedSeriesDetailContent["modelsFilters"]> {
  const ua = market === "ua";
  return {
    searchLabel: ua ? "Пошук" : "Search",
    searchPlaceholder: ua ? `Пошук за кодом моделі ${title}` : `Search ${title} model code`,
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
    breadcrumbs: {
      home: ua ? "Головна" : "Home",
      products: ua ? "Продукція" : "Products",
      ledSystems: ua ? "LED-системи" : "LED Systems",
      category: categoryLabel(ua),
      current: title,
    },
    backToCategoryLabel: ua ? "Назад до декоративного освітлення" : "Back to Decorative Lighting",
    technicalInformationHeading: ua ? "Технічна інформація" : "Technical Information",
    technicalAssurance: [],
    modelsHeading: ua ? "Моделі та технічний розклад" : "Models & Technical Schedule",
    controlsHeading: ua ? "Керування та системні опції" : "Controls & System Options",
    controlsIntroduction: ua
      ? "Наведені опції є каталожними проєктними конфігураціями і не є стандартними для кожної моделі."
      : "Options shown are catalogue-listed project configurations and are not standard on every model.",
    applicationsHeading: ua ? "Типові сфери застосування" : "Typical Applications",
    applicationCardsAlways: true,
    siblingFamiliesHeading: ua ? "Інші сімейства декоративного освітлення" : "Other Decorative Lighting Families",
    siblingViewSeriesLabel: ua ? "Переглянути серію" : "View Series",
    currentFamilyBadgeLabel: ua ? "Поточна серія" : "Current Family",
    siblingFamilies: siblings(slug, market),
  } as const;
}

const ELECTRICAL = {
  voltage: "220–240 Vac",
  frequency: "50–60 Hz",
  operatingTemperature: "−20 to +35 °C",
} as const;

function model(
  code: string,
  powerW: number,
  luminousFluxLm: string,
  extras: Partial<LedSeriesModel> = {},
): LedSeriesModel {
  return {
    model: code,
    powerW,
    ...(luminousFluxLm ? { luminousFluxLm } : {}),
    ...ELECTRICAL,
    ...extras,
  };
}

function columns(market: MarketCode, options: {
  ip?: boolean;
  dimensions?: boolean;
  mounting?: boolean;
} = {}): NonNullable<LedSeriesDetailContent["modelsColumns"]> {
  const ua = market === "ua";
  return {
    model: ua ? "Модель / код каталогу" : "Model / Catalogue Code",
    power: ua ? "Потужність" : "Power",
    luminousFlux: ua ? "Світловий потік" : "Luminous Flux",
    voltage: ua ? "Напруга" : "Voltage",
    frequency: ua ? "Частота" : "Frequency",
    operatingTemperature: ua ? "Робоча темп." : "Operating Temp.",
    efficiency: ua ? "Ефективність" : "Efficiency",
    cri: "CRI",
    colourTemperature: "CCT",
    ...(options.mounting ? { mountingType: ua ? "Конфігурація" : "Configuration" } : {}),
    ...(options.dimensions ? { dimensions: ua ? "Розміри" : "Dimensions" } : {}),
    ...(options.ip ? { ip: "IP" } : {}),
  };
}

const INDOOR_APPLICATION_BASE = `${CATEGORY_ASSET_BASE}/applications`;
// "Educational Facilities" has no genuine match in the prepared category
// applications folder — offices-education.webp visually depicts an
// open-plan office/coworking space, not a classroom, so it is used only
// for "Offices" and the Educational Facilities card stays text-only
// rather than reusing an unrelated photo.
function indoorApplications(market: MarketCode) {
  const ua = market === "ua";
  return [
    { icon: "office", title: ua ? "Офіси" : "Offices", description: ua ? "Декоративне загальне освітлення офісів і спільних робочих просторів." : "Decorative general lighting for offices and shared workspaces.", image: `${INDOOR_APPLICATION_BASE}/decorative-lighting-application-offices-education.webp`, imageAlt: ua ? "Офіс відкритого планування, освітлений декоративними підвісними світильниками з кільцями" : "Open-plan office illuminated by decorative round-ring pendant luminaires" },
    { icon: "retail", title: ua ? "Роздрібна торгівля та магазини" : "Retail & Stores", description: ua ? "Акцентне та загальне освітлення магазинів і зон обслуговування клієнтів." : "Feature and general lighting for shops and customer areas.", image: `${INDOOR_APPLICATION_BASE}/decorative-lighting-application-retail-showrooms.webp`, imageAlt: ua ? "Торговий шоурум, освітлений декоративними світильниками" : "Retail showroom illuminated by decorative luminaires" },
    { icon: "education", title: ua ? "Навчальні заклади" : "Educational Facilities", description: ua ? "Декоративне освітлення навчальних і спільних приміщень." : "Decorative illumination for learning and communal interiors." },
    { icon: "shopping-centre", title: ua ? "Архітектурні інтер'єри" : "Architectural Interiors", description: ua ? "Каталожні декоративні форми для дизайнерських інтер'єрних просторів." : "Catalogue decorative forms for designed interior spaces.", image: `${INDOOR_APPLICATION_BASE}/decorative-lighting-application-hospitality-architectural-spaces.webp`, imageAlt: ua ? "Архітектурний інтер'єр, освітлений декоративними кільцевими світильниками" : "Architectural interior illuminated by decorative ring luminaires" },
  ] as const;
}

const OUTDOOR_APPLICATION_BASE = `${CATEGORY_ASSET_BASE}/applications`;
function outdoorApplications(market: MarketCode) {
  const ua = market === "ua";
  return [
    { icon: "parks", title: ua ? "Парки та сади" : "Parks & Gardens", description: ua ? "Декоративне зовнішнє освітлення парків, садів і озеленених територій." : "Decorative outdoor lighting for parks, gardens and planted areas.", image: `${OUTDOOR_APPLICATION_BASE}/decorative-bollard-lighting-application-parks-gardens.webp`, imageAlt: ua ? "Каталожні декоративні стовпчики в парку чи саду" : "Catalogue decorative bollard lighting in a park or garden setting" },
    { icon: "street", title: ua ? "Пішохідні зони" : "Pedestrian Areas", description: ua ? "Освітлення пішохідних маршрутів і громадських зон циркуляції." : "Lighting for pedestrian routes and public circulation spaces.", image: `${OUTDOOR_APPLICATION_BASE}/decorative-bollard-lighting-application-pedestrian-areas.webp`, imageAlt: ua ? "Каталожні декоративні стовпчики вздовж пішохідної зони" : "Catalogue decorative bollard lighting along a pedestrian area" },
    { icon: "corridor", title: ua ? "Тротуари та доріжки" : "Sidewalks & Pathways", description: ua ? "Низькорівневе або стовпчикове освітлення доріжок і тротуарів." : "Low-level or pole lighting for paths and sidewalks.", image: `${OUTDOOR_APPLICATION_BASE}/decorative-bollard-lighting-application-sidewalks-pathways.webp`, imageAlt: ua ? "Каталожні декоративні стовпчики вздовж тротуару чи доріжки" : "Catalogue decorative bollard lighting along a sidewalk or pathway" },
    { icon: "public-square", title: ua ? "Входи та громадські простори" : "Entrances & Public Spaces", description: ua ? "Декоративне освітлення підходів і громадських зон." : "Decorative illumination around approaches and public areas.", image: `${OUTDOOR_APPLICATION_BASE}/decorative-bollard-lighting-application-entrances-public-spaces.webp`, imageAlt: ua ? "Каталожні декоративні стовпчики біля громадського входу" : "Catalogue decorative bollard lighting at a public entrance" },
  ] as const;
}

function ringControls(ua: boolean) {
  return [
    { icon: "control-dali", label: "DALI", secondaryLabel: ua ? "Каталожна опція" : "Catalogue option" },
    { icon: "control-dimmer", label: "1–10 V", secondaryLabel: ua ? "Каталожна опція" : "Catalogue option" },
  ] as const;
}

function architecturalControls(ua: boolean) {
  return [
    ...ringControls(ua),
    { icon: "control-emergency", label: ua ? "Аварійний режим" : "Emergency", secondaryLabel: ua ? "Проєктна опція" : "Project option" },
    { icon: "control-sensor", label: ua ? "Датчик" : "Sensor", secondaryLabel: ua ? "Проєктна опція" : "Project option" },
  ] as const;
}

const RN_MODELS: readonly LedSeriesModel[] = [
  model("LDB-RN40.18.02", 18, "2,160 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K", dimensions: "400 × 80 mm" }),
  model("LDB-RN60.38.02", 38, "4,560 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K", dimensions: "600 × 80 mm" }),
  model("LDB-RN60.55.02", 55, "6,600 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K", dimensions: "600 × 80 mm" }),
  model("LDB-RN90.90.02", 90, "10,800 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K", dimensions: "900 × 80 mm" }),
  model("LDB-RN120.125.02", 125, "15,000 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K" }),
  model("LDB-RN1040.18.02", 18, "2,160 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K", dimensions: "400 × 100 mm" }),
  model("LDB-RN1060.38.02", 38, "4,560 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K", dimensions: "600 × 100 mm" }),
  model("LDB-RN1060.55.02", 55, "6,600 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K", dimensions: "600 × 100 mm" }),
  model("LDB-RN1090.90.02", 90, "10,800 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K", dimensions: "900 × 100 mm" }),
  model("LDB-RN10120.125.02", 125, "15,000 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K" }),
];

export function rnDecorativeContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const slug = "rn-decorative-series";
  const title = "RN Decorative Series";
  return {
    ...shared(market, slug, title),
    metadata: { title: `${title} | InfraVolt`, description: ua ? "Каталожні круглі декоративні світильники RN та технічний розклад." : "Catalogue-verified RN round decorative luminaires and technical schedule." },
    hero: { eyebrow: "RN · Decorative Series", category: categoryLabel(ua), title, description: ua ? "Круглі декоративні світильники з корпусом із порошково-пофарбованого алюмінію та опаловим розсіювачем для інтер'єрних проєктів." : "Round decorative luminaires with powder-coated aluminium bodies and opal diffuser options for interior projects.", ...heroActions(ua) },
    heroImage: PREPARED_ASSETS["rn-decorative-series"].foreground,
    heroImageAlt: ua ? "Каталожний круглий декоративний світильник RN" : "Catalogue RN round decorative luminaire",
    heroBackgroundImage: PREPARED_ASSETS["rn-decorative-series"].background,
    heroBackgroundImageAlt: ua ? "Архітектурний інтер'єр, освітлений декоративними світильниками" : "Architectural interior illuminated by decorative luminaires",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: ua ? "Потужність" : "Power", value: "18–125 W" }, { label: ua ? "Світловий потік" : "Luminous Flux", value: "2,160–15,000 lm" }, { label: ua ? "Ефективність" : "Efficiency", value: ">120 lm/W" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ">80" }, { label: ua ? "Колірна температура" : "Colour Temperature", value: "3000–6500 K" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Опаловий PS · опції PMMA / призматичний" : "PS opal · PMMA / prismatic options" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "electrical"), values: [{ label: ua ? "Живлення" : "Input", value: "220–240 V · 50–60 Hz" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−20 to +35 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction"), values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Корпус із порошково-пофарбованого литого алюмінію" : "Powder-coated aluminium die-cast body" }, { label: ua ? "Джерело світла" : "Light Source", value: ua ? "Midpower LED" : "Midpower LED" }] },
    ],
    modelsIntroduction: ua ? "Повний унікальний технічний розклад RN із каталожних сторінок серії Decorative." : "Complete unique RN model schedule from the Decorative Series source pages.",
    models: RN_MODELS,
    modelsColumns: columns(market, { dimensions: true }),
    modelsFilters: filters(market, "RN"),
    modelsNote: ua ? "Неоднозначні позначення діаметра для 125 Вт у вихідному джерелі свідомо пропущені, а не виправлені за припущенням." : "Ambiguous 125 W diameter strings in the extracted source are intentionally omitted rather than corrected by inference.",
    controlOptions: [],
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Корпус із порошково-пофарбованого литого алюмінію" : "Powder-coated aluminium die-cast body" },
      warrantyItem(ua),
    ],
    photometricHeading: photometricHeading(ua),
    technicalAssets: [
      { title: technicalAssetTitles(ua).photometric, image: PREPARED_ASSETS["rn-decorative-series"].photometric, imageAlt: ua ? "Каталожні фотометричні дані серії RN Decorative" : "RN Decorative Series catalogue photometric data" },
      { title: technicalAssetTitles(ua).drawing, image: PREPARED_ASSETS["rn-decorative-series"].technical, imageAlt: ua ? "Каталожне технічне креслення серії RN Decorative" : "RN Decorative Series catalogue technical drawing" },
    ],
    dimensionNote: preparedDimensionNote(ua),
    applicationImage: `${ASSET_BASE}/applications/decorative-interior.webp`,
    applicationImageAlt: ua ? "Каталожне застосування декоративного освітлення інтер'єру" : "Catalogue decorative interior application",
    applications: indoorApplications(market),
    supportCta: { title: ua ? "Потрібне рішення декоративного освітлення інтер'єру?" : "Need a Decorative Interior Lighting Solution?", description: ua ? "Обговоріть необхідний вихід RN, розмір і конфігурацію розсіювача з нашою технічною командою." : "Discuss the required RN output, size and diffuser configuration with our technical team.", action: talkToTeam(ua) },
  };
}

export function vlDecorativeContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const slug = "vl-decorative-series";
  const title = "VL Decorative Series";
  return {
    ...shared(market, slug, title),
    metadata: { title: `${title} | InfraVolt`, description: ua ? "Каталожний компактний декоративний світильник LDB-VL.12.02." : "Catalogue-verified LDB-VL.12.02 compact decorative luminaire." },
    hero: { eyebrow: "LDB-VL.12.02", category: categoryLabel(ua), title, description: ua ? "Компактний декоративний світильник із корпусом із порошково-пофарбованого алюмінію та опаловим розсіювачем." : "Compact decorative luminaire with a powder-coated aluminium body and opal diffuser system.", ...heroActions(ua) },
    heroImage: PREPARED_ASSETS["vl-decorative-series"].foreground,
    heroImageAlt: ua ? "Каталожний декоративний світильник LDB-VL.12.02" : "LDB-VL.12.02 catalogue decorative luminaire",
    heroBackgroundImage: PREPARED_ASSETS["vl-decorative-series"].background,
    heroBackgroundImageAlt: ua ? "Архітектурний інтер'єр, освітлений декоративними світильниками" : "Architectural interior illuminated by decorative luminaires",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: ua ? "Потужність" : "Power", value: "12 W" }, { label: ua ? "Світловий потік" : "Luminous Flux", value: "1,500 lm" }, { label: ua ? "Ефективність" : "Efficiency", value: ">125 lm/W" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ">80" }, { label: ua ? "Колірна температура" : "Colour Temperature", value: "3000–6500 K" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Опаловий PS · опції PMMA / призматичний" : "PS opal · PMMA / prismatic options" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "electrical"), values: [{ label: ua ? "Живлення" : "Input", value: "220–240 V · 50–60 Hz" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−20 to +35 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction"), values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Корпус із порошково-пофарбованого литого алюмінію" : "Powder-coated aluminium die-cast body" }, { label: ua ? "Розміри" : "Dimensions", value: "200 × 300 × 95 mm" }] },
    ],
    modelsIntroduction: ua ? "Точний каталожний технічний розклад VL." : "Exact VL catalogue model schedule.",
    models: [model("LDB-VL.12.02", 12, "1,500 lm", { efficiencyLmW: ">125 lm/W", cri: ">80", colourTemperature: "3000–6500 K", dimensions: "200 × 300 × 95 mm" })],
    modelsColumns: columns(market, { dimensions: true }),
    modelsFilters: filters(market, "VL"),
    controlOptions: [],
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Корпус із порошково-пофарбованого литого алюмінію" : "Powder-coated aluminium die-cast body" },
      warrantyItem(ua),
    ],
    photometricHeading: photometricHeading(ua),
    technicalAssets: [
      { title: technicalAssetTitles(ua).photometric, image: PREPARED_ASSETS["vl-decorative-series"].photometric, imageAlt: ua ? "Каталожні фотометричні дані серії VL Decorative" : "VL Decorative Series catalogue photometric data" },
      { title: technicalAssetTitles(ua).drawing, image: PREPARED_ASSETS["vl-decorative-series"].technical, imageAlt: ua ? "Каталожне технічне креслення серії VL Decorative" : "VL Decorative Series catalogue technical drawing" },
    ],
    dimensionNote: preparedDimensionNote(ua),
    applications: indoorApplications(market).slice(0, 4),
    supportCta: { title: ua ? "Плануєте вишукану схему декоративного освітлення?" : "Planning a Refined Decorative Lighting Scheme?", description: ua ? "Обговоріть застосування LDB-VL.12.02 та потрібне покриття з нашою технічною командою." : "Discuss the LDB-VL.12.02 application and finish requirement with our technical team.", action: talkToTeam(ua) },
  };
}

const ROUND_MODELS: readonly LedSeriesModel[] = [
  model("ROUND 1 RING 25", 27, "2,165 lm", { efficiencyLmW: "80+ lm/W", cri: "80+", ip: "IP40", dimensions: "Ø450 mm" }),
  model("ROUND 1 RING 25", 35, "2,806 lm", { efficiencyLmW: "80+ lm/W", cri: "80+", ip: "IP40", dimensions: "Ø600 mm" }),
  model("ROUND 1 RING 25", 45, "3,619 lm", { efficiencyLmW: "80+ lm/W", cri: "80+", ip: "IP40", dimensions: "Ø750 mm" }),
  model("ROUND 3 RING 25", 120, "8,803 lm", { efficiencyLmW: "73+ lm/W", cri: "80+", colourTemperature: "2700–6500 K", ip: "IP40", dimensions: "Ø450 / 600 / 750 mm" }),
  model("ROUND 3 RING 25 (ORBIT)", 96, "6,728 lm", { efficiencyLmW: "70+ lm/W", cri: "80+", colourTemperature: "2700–6500 K", ip: "IP40", dimensions: "Ø750 mm" }),
];

export function roundRingContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const slug = "round-ring-series";
  const title = "Round Ring Series";
  return {
    ...shared(market, slug, title),
    metadata: { title: `${title} | InfraVolt`, description: ua ? "Каталожні одинарні, багатокільцеві та Orbit круглі кільцеві світильники." : "Catalogue-verified single, multiple and Orbit round-ring luminaires." },
    hero: { eyebrow: "Single · Multiple · Orbit", category: categoryLabel(ua), title, description: ua ? "Підвісні круглі кільцеві світильники в одинарній, трикільцевій та Orbit каталожних конфігураціях." : "Suspended round-ring luminaires in single, three-ring and Orbit catalogue configurations.", ...heroActions(ua) },
    heroImage: PREPARED_ASSETS["round-ring-series"].foreground, heroImageAlt: ua ? "Каталожний підвісний світильник ROUND 3 RING 25" : "ROUND 3 RING 25 catalogue suspended luminaire", heroBackgroundImage: PREPARED_ASSETS["round-ring-series"].background, heroBackgroundImageAlt: ua ? "Архітектурний інтер'єр, освітлений декоративними кільцями" : "Architectural interior illuminated by decorative rings",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: ua ? "Потужність за каталогом" : "Catalogue Power", value: "27–120 W" }, { label: ua ? "Світловий потік" : "Luminous Flux", value: "2,165–8,803 lm" }, { label: ua ? "Ефективність моделі" : "Model Efficiency", value: "70+ to 80+ lm/W" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: "80+" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Високоефективний опаловий PC" : "High-efficiency PC opal" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: ua ? "Захист" : "Protection", value: "IP40" }, { label: ua ? "Живлення" : "Input", value: "220–240 V · 50–60 Hz" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−20 to +35 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction-installation"), values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Корпус із порошково-пофарбованого пресованого алюмінію" : "Powder-coated aluminium extrusion" }, { label: ua ? "Монтаж" : "Installation", value: ua ? "Підвісний" : "Suspended" }, { label: ua ? "Стандартний підвіс" : "Standard Suspension", value: "1500 mm" }] },
    ],
    modelsIntroduction: ua ? "Усі точні конфігурації Round Ring та каталожні рядки з PDF-сторінок 92–93." : "All exact Round Ring configurations and catalogue rows from PDF pages 92–93.", models: ROUND_MODELS, modelsColumns: columns(market, { dimensions: true, ip: true }), modelsFilters: filters(market, "Round Ring"),
    familyTechnicalSection: { heading: ua ? "Конфігурації кілець" : "Ring Configurations", introduction: ua ? "Сімейство поєднує три справжні каталожні конфігурації на одній сторінці серії." : "The family combines three genuine catalogue arrangements on one series page.", settings: [
      { label: ua ? "Одинарне кільце" : "Single Ring", value: "ROUND 1 RING 25", description: ua ? "Одне підвісне кільце в каталожних розмірах Ø450, Ø600 або Ø750 мм." : "One suspended ring in Ø450, Ø600 or Ø750 mm catalogue sizes." },
      { label: ua ? "Багатокільцеве" : "Multiple Ring", value: "ROUND 3 RING 25", description: ua ? "Три вирівняні кільця діаметром 450 / 600 / 750 мм." : "Three aligned rings in 450 / 600 / 750 mm diameters." },
      { label: "Orbit", value: "ROUND 3 RING 25 (ORBIT)", description: ua ? "Підвісна трикільцева конфігурація Orbit." : "Three-ring suspended Orbit arrangement." },
    ], assets: [] },
    controlOptions: ringControls(ua),
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Корпус із порошково-пофарбованого пресованого алюмінію" : "Powder-coated aluminium extrusion" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP40" },
      warrantyItem(ua),
    ],
    photometricHeading: photometricHeading(ua),
    technicalAssets: [
      { title: technicalAssetTitles(ua).photometric, image: PREPARED_ASSETS["round-ring-series"].photometric, imageAlt: ua ? "Каталожні фотометричні дані серії Round Ring" : "Round Ring Series catalogue photometric data" },
      { title: technicalAssetTitles(ua).drawing, image: PREPARED_ASSETS["round-ring-series"].technical, imageAlt: ua ? "Каталожне технічне креслення серії Round Ring" : "Round Ring Series catalogue technical drawing" },
    ],
    dimensionNote: preparedDimensionNote(ua),
    applicationImage: `${ASSET_BASE}/applications/round-ring-interior.webp`, applicationImageAlt: ua ? "Каталожне архітектурне застосування Round Ring" : "Catalogue round-ring architectural application",
    applications: indoorApplications(market),
    supportCta: { title: ua ? "Потрібне рішення освітлення Round Ring?" : "Need a Round Ring Lighting Solution?", description: ua ? "Обговоріть потрібну конфігурацію кілець, вихід і опцію керування з нашою технічною командою." : "Discuss the required ring arrangement, output and control option with our technical team.", action: talkToTeam(ua) },
  };
}

export function squareRingContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const slug = "square-ring-series";
  const title = "Square Ring Series";
  const models = [
    model("SQUARE 1 RING 25", 40, "3,207 lm", { efficiencyLmW: "80+ lm/W", cri: "80+", colourTemperature: "2700–6500 K", ip: "IP40", dimensions: "600 × 600 mm" }),
    model("SQUARE 2 RING 25", 75, "5,988 lm", { efficiencyLmW: "80+ lm/W", cri: "80+", colourTemperature: "2700–6500 K", ip: "IP40", dimensions: "600 × 600 mm" }),
  ];
  return {
    ...shared(market, slug, title),
    metadata: { title: `${title} | InfraVolt`, description: ua ? "Каталожні світильники SQUARE 1 RING 25 та SQUARE 2 RING 25." : "Catalogue-verified SQUARE 1 RING 25 and SQUARE 2 RING 25 luminaires." },
    hero: { eyebrow: "Single · Double", category: categoryLabel(ua), title, description: ua ? "Геометричні підвісні квадратні кільцеві світильники в точних одинарній та подвійній каталожних конфігураціях." : "Geometric suspended square-ring luminaires in exact single- and double-ring catalogue configurations.", ...heroActions(ua) },
    heroImage: PREPARED_ASSETS["square-ring-series"].foreground, heroImageAlt: ua ? "Каталожний підвісний світильник SQUARE 1 RING 25" : "SQUARE 1 RING 25 catalogue suspended luminaire", heroBackgroundImage: PREPARED_ASSETS["square-ring-series"].background, heroBackgroundImageAlt: ua ? "Архітектурний інтер'єр, освітлений декоративними кільцями" : "Architectural interior illuminated by decorative rings",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: ua ? "Потужність" : "Power", value: "40 W · 75 W" }, { label: ua ? "Світловий потік" : "Luminous Flux", value: "3,207 lm · 5,988 lm" }, { label: ua ? "Ефективність" : "Efficiency", value: "80+ lm/W" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: "80+" }, { label: ua ? "Колірна температура" : "Colour Temperature", value: "2700–6500 K" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Високоефективний опаловий PC" : "High-efficiency PC opal" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: ua ? "Захист" : "Protection", value: "IP40" }, { label: ua ? "Живлення" : "Input", value: "220–240 V · 50–60 Hz" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−20 to +35 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction-installation"), values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Корпус із порошково-пофарбованого пресованого алюмінію" : "Powder-coated aluminium extrusion" }, { label: ua ? "Монтаж" : "Installation", value: ua ? "Підвісний" : "Suspended" }, { label: ua ? "Стандартний підвіс" : "Standard Suspension", value: "1500 mm" }] },
    ],
    modelsIntroduction: ua ? "Повний точний розклад Square Ring з PDF-сторінки 94." : "Complete exact Square Ring schedule from PDF page 94.", models, modelsColumns: columns(market, { dimensions: true, ip: true }), modelsFilters: filters(market, "Square Ring"),
    familyTechnicalSection: { heading: ua ? "Геометричні конфігурації" : "Geometric Configurations", introduction: ua ? "Обидві справжні каталожні форми залишаються в одному маршруті сімейства." : "Both genuine catalogue forms remain within one family route.", settings: [
      { label: ua ? "Одинарна" : "Single", value: "SQUARE 1 RING 25", description: ua ? "Одна підсвічена квадратна рамка 600 × 600 мм." : "Single 600 × 600 mm illuminated square frame." },
      { label: ua ? "Подвійна" : "Double", value: "SQUARE 2 RING 25", description: ua ? "Дві підвісні квадратні рамки в каталожній конфігурації." : "Two suspended square frames in the catalogue arrangement." },
    ], assets: [] },
    controlOptions: ringControls(ua),
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Корпус із порошково-пофарбованого пресованого алюмінію" : "Powder-coated aluminium extrusion" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP40" },
      warrantyItem(ua),
    ],
    photometricHeading: photometricHeading(ua),
    technicalAssets: [
      { title: technicalAssetTitles(ua).photometric, image: PREPARED_ASSETS["square-ring-series"].photometric, imageAlt: ua ? "Каталожні фотометричні дані серії Square Ring" : "Square Ring Series catalogue photometric data" },
      { title: technicalAssetTitles(ua).drawing, image: PREPARED_ASSETS["square-ring-series"].technical, imageAlt: ua ? "Каталожне технічне креслення серії Square Ring" : "Square Ring Series catalogue technical drawing" },
    ],
    dimensionNote: preparedDimensionNote(ua),
    applications: indoorApplications(market),
    supportCta: { title: ua ? "Потрібне рішення геометричного кільцевого освітлення?" : "Need a Geometric Ring Lighting Solution?", description: ua ? "Обговоріть одинарну чи подвійну кільцеву конфігурацію з нашою технічною командою." : "Discuss the single- or double-ring configuration with our technical team.", action: talkToTeam(ua) },
  };
}

type ArchitecturalRow = readonly [string, number, string, string, string, string];

function architecturalRows(
  codes: readonly string[],
  powers: readonly number[],
  lumens: readonly string[],
  sizes: readonly string[],
  mountingType: string,
  efficiency: string,
): LedSeriesModel[] {
  return codes.map((code, index) => model(code, powers[index] ?? 0, lumens[index] ?? "", {
    efficiencyLmW: efficiency,
    cri: "80+",
    colourTemperature: "2700–6500 K",
    ip: "IP20 / IP40",
    dimensions: sizes[index],
    mountingType,
  }));
}

function upDownRows(rows: readonly ArchitecturalRow[]): LedSeriesModel[] {
  return rows.map(([code, downPower, powerDisplay, luminousFluxLm, dimensions, efficiency]) => model(code, downPower, luminousFluxLm, {
    powerDisplay,
    efficiencyLmW: efficiency,
    cri: "80+",
    colourTemperature: "2700–6500 K",
    ip: "IP20 / IP40",
    dimensions,
    mountingType: "UP&DOWN T",
  }));
}

const ARCHITECTURAL_MODELS: readonly LedSeriesModel[] = [
  ...architecturalRows(["26011101-070035", "26011102-071035", "26011103-072035", "26011104-073035", "26011105-074035"], [38, 50, 65, 80, 105], ["3,990 lm", "5,250 lm", "6,825 lm", "8,400 lm", "11,025 lm"], ["300 × 300 mm", "600 × 600 mm", "300 × 1200 mm", "600 × 1200 mm", "1200 × 1200 mm"], "SQUARE RING 55 SU", "105+ lm/W"),
  ...architecturalRows(["26011201-070035", "26011202-071035", "26011203-072035", "26011204-073035", "26011205-074035"], [38, 50, 65, 80, 105], ["3,990 lm", "5,250 lm", "6,825 lm", "8,400 lm", "11,025 lm"], ["300 × 300 mm", "600 × 600 mm", "300 × 1200 mm", "600 × 1200 mm", "1200 × 1200 mm"], "SQUARE RING 55 T", "105+ lm/W"),
  ...upDownRows([
    ["26111201-070035", 38, "12 W up / 38 W down", "1,300 lm up / 3,990 lm down", "300 × 300 mm", "105+ lm/W"],
    ["26111202-071035", 50, "17 W up / 50 W down", "1,750 lm up / 5,250 lm down", "600 × 600 mm", "105+ lm/W"],
    ["26111203-072035", 65, "21 W up / 65 W down", "2,200 lm up / 6,825 lm down", "300 × 1200 mm", "105+ lm/W"],
    ["26111204-073035", 80, "25 W up / 80 W down", "2,600 lm up / 8,400 lm down", "600 × 1200 mm", "105+ lm/W"],
    ["26111205-074035", 105, "31 W up / 105 W down", "3,250 lm up / 11,025 lm down", "1200 × 1200 mm", "105+ lm/W"],
  ]),
  ...architecturalRows(["25011101-070035", "25011102-071035", "25011103-072035"], [25, 42, 65], ["2,850 lm", "4,830 lm", "7,475 lm"], ["Ø400 mm", "Ø600 mm", "Ø900 mm"], "ROUND RING 80 SU", "114+ / 115+ lm/W"),
  ...architecturalRows(["25011201-070035", "25011202-071035", "25011203-072035"], [25, 42, 65], ["2,850 lm", "4,830 lm", "7,475 lm"], ["Ø400 mm", "Ø600 mm", "Ø900 mm"], "ROUND RING 80 T", "114+ / 115+ lm/W"),
  ...upDownRows([
    ["LDB 25211201-070035", 25, "9 W up / 25 W down", "970 lm up / 2,850 lm down", "Ø400 mm", "114+ lm/W"],
    ["LDB 25211202-071035", 42, "12 W up / 42 W down", "1,300 lm up / 4,830 lm down", "Ø600 mm", "115+ lm/W"],
    ["LDB 25211203-072035", 65, "16 W up / 65 W down", "1,650 lm up / 7,475 lm down", "Ø900 mm", "115+ lm/W"],
  ]),
  ...architecturalRows(["25611101-070035", "25611102-071035"], [63, 82], ["7,245 lm", "9,430 lm"], ["3 × 900 mm", "3 × 1200 mm"], "TRIGON RING 80 SU", "115+ lm/W"),
  ...architecturalRows(["25611201-070035", "25611202-071035"], [63, 82], ["7,245 lm", "9,430 lm"], ["3 × 900 mm", "3 × 1200 mm"], "TRIGON RING 80 T", "115+ lm/W"),
  ...upDownRows([
    ["LDB 25811201-070035", 63, "16 W up / 63 W down", "1,650 lm up / 7,245 lm down", "3 × 900 mm", "115+ lm/W"],
    ["LDB 25811202-071035", 82, "12 W up / 82 W down", "2,300 lm up / 9,430 lm down", "3 × 1200 mm", "115+ lm/W"],
  ]),
  ...architecturalRows(["26211101-070035", "26211102-071035", "26211103-072035"], [32, 45, 72], ["3,680 lm", "5,175 lm", "8,280 lm"], ["400 × 400 mm", "600 × 600 mm", "900 × 900 mm"], "SQUARE RING 80 SU", "115+ lm/W"),
  ...architecturalRows(["26211201-070035", "26211202-071035", "26211203-072035"], [32, 45, 72], ["3,680 lm", "5,175 lm", "8,280 lm"], ["400 × 400 mm", "600 × 600 mm", "900 × 900 mm"], "SQUARE RING 80 T", "115+ lm/W"),
  ...upDownRows([
    ["LDB 26411201-070035", 32, "9 W up / 32 W down", "783 lm up / 3,680 lm down", "400 × 400 mm", "115+ lm/W"],
    ["LDB 26411202-071035", 45, "16 W up / 45 W down", "1,424 lm up / 5,175 lm down", "600 × 600 mm", "115+ lm/W"],
    ["LDB 26411203-072035", 72, "25 W up / 72 W down", "2,225 lm up / 8,280 lm down", "900 × 900 mm", "115+ lm/W"],
  ]),
  ...architecturalRows(["LDB 25311101-070035"], [90], ["10,350 lm"], ["600 × 1200 mm"], "OBLONG RING 80 SU", "115+ lm/W"),
  ...architecturalRows(["LDB 25311201-070035"], [90], ["10,350 lm"], ["600 × 1200 mm"], "OBLONG RING 80 T", "115+ lm/W"),
  ...upDownRows([["LDB 25511201-070035", 90, "10 W up / 90 W down", "1,250 lm up / 10,350 lm down", "600 × 1200 mm", "115+ lm/W"]]),
  ...architecturalRows(["26511101-070035", "26511102-071035", "26511103-072035"], [16, 34, 60], ["2,000 lm", "4,250 lm", "7,500 lm"], ["6 × 400 mm", "6 × 600 mm", "6 × 900 mm"], "HEXAGON RING 80 SU", "125+ lm/W"),
  ...architecturalRows(["26511201-070035", "26511202-071035", "26511203-072035"], [16, 34, 60], ["2,000 lm", "4,250 lm", "7,500 lm"], ["6 × 400 mm", "6 × 600 mm", "6 × 900 mm"], "HEXAGON RING 80 T", "125+ lm/W"),
  ...upDownRows([
    ["LDB 26711201-070035", 16, "10 W up / 16 W down", "1,250 lm up / 2,000 lm down", "6 × 400 mm", "125+ lm/W"],
    ["LDB 26711202-071035", 34, "16 W up / 34 W down", "2,000 lm up / 4,250 lm down", "6 × 600 mm", "125+ lm/W"],
    ["LDB 26711203-072035", 60, "23 W up / 60 W down", "2,875 lm up / 7,500 lm down", "6 × 900 mm", "125+ lm/W"],
  ]),
];

export function architecturalRingContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const slug = "up-down-architectural-ring-series";
  const title = "Up & Down / Architectural Ring Series";
  return {
    ...shared(market, slug, title),
    metadata: { title: `${title} | InfraVolt`, description: ua ? "Каталожні накладні, підвісні та Up/Down архітектурні кільцеві конфігурації." : "Catalogue-verified surface, suspended and up/down architectural ring configurations." },
    hero: { eyebrow: "Surface · Suspended · Up & Down", category: categoryLabel(ua), title, description: ua ? "Пізніші архітектурні конфігурації Ring, що охоплюють квадратну, круглу, тригонну, видовжену та шестикутну геометрії з точними каталожними кодами." : "Later architectural Ring configurations covering square, round, trigon, oblong and hexagon geometries with exact catalogue stock codes.", ...heroActions(ua) },
    heroImage: PREPARED_ASSETS["up-down-architectural-ring-series"].foreground, heroImageAlt: ua ? "Каталожний архітектурний світильник SQUARE RING 55 Up & Down" : "SQUARE RING 55 architectural up-and-down catalogue luminaire", heroBackgroundImage: PREPARED_ASSETS["up-down-architectural-ring-series"].background, heroBackgroundImageAlt: ua ? "Архітектурний інтер'єр, освітлений декоративними кільцями" : "Architectural interior illuminated by decorative rings",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: ua ? "Опублікована потужність" : "Published Power", value: ua ? "16–105 Вт плюс окремі значення up/down" : "16–105 W plus separate up/down values" }, { label: ua ? "Ефективність" : "Efficiency", value: ua ? "105+ до 125+ лм/Вт залежно від конфігурації" : "105+ to 125+ lm/W by configuration" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: "80+" }, { label: ua ? "Колірна температура" : "Colour Temperature", value: "2700–6500 K" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Опаловий PS · опції PMMA / призматичний" : "PS opal · PMMA / prismatic options" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: ua ? "Захист" : "Protection", value: ua ? "IP20 / IP40 залежно від конфігурації" : "IP20 / IP40 by configuration" }, { label: ua ? "Живлення" : "Input", value: "220–240 V · 50–60 Hz" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−20 to +35 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction-installation"), values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Корпус із порошково-пофарбованого пресованого алюмінію" : "Powder-coated aluminium extrusion" }, { label: ua ? "Задня кришка" : "Back Cover", value: ua ? "Виготовлена сталь, де застосовується" : "Fabricated steel where applicable" }, { label: ua ? "Стандартний підвіс" : "Standard Suspension", value: ua ? "1500 мм, де застосовується" : "1500 mm where applicable" }] },
    ],
    modelsIntroduction: ua ? "Повний точний розклад кодів, зведений з каталожних PDF-сторінок 95–100." : "Complete exact stock-code schedule consolidated from catalogue PDF pages 95–100.", models: ARCHITECTURAL_MODELS, modelsColumns: columns(market, { dimensions: true, ip: true, mounting: true }), modelsFilters: { ...filters(market, "Architectural Ring"), mountingTypeFilterLabel: ua ? "Конфігурація" : "Configuration" },
    modelsNote: ua ? "Назви продуктів і пунктуація кодів збережені з джерела; SU, T та UP&DOWN T не розшифровуються поза каталожним формулюванням." : "Product names and stock-code punctuation are preserved from the source; SU, T and UP&DOWN T are not expanded beyond the catalogue wording.",
    familyTechnicalSection: { heading: ua ? "Розподіл світла та підвіс" : "Lighting Distribution & Suspension", introduction: ua ? "Каталог розрізняє накладні, підвісні та up/down конфігурації в кількох архітектурних геометріях." : "The catalogue distinguishes surface, suspended and up/down configurations across several architectural geometries.", settings: [
      { label: "SU", value: ua ? "Накладна конфігурація" : "Surface configuration", description: ua ? "Джерело підтверджує накладну форму поряд із відповідною геометрією." : "Source-backed surface form listed alongside the matching geometry." },
      { label: "T", value: ua ? "Підвісна конфігурація" : "Suspended configuration", description: ua ? "Підвісна форма зі стандартним тросом 1500 мм, де це вказано в джерелі." : "Suspended form with a 1500 mm standard wire where the source states it." },
      { label: "UP&DOWN T", value: ua ? "Окремий розподіл up/down" : "Separate up/down distribution", description: ua ? "Каталожні рядки зберігають окремі значення потужності та світлового потоку вгору й вниз." : "Catalogue rows retain separate upward and downward power and lumen values." },
    ], assets: [] },
    controlOptions: architecturalControls(ua),
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Корпус із порошково-пофарбованого пресованого алюмінію" : "Powder-coated aluminium extrusion" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: ua ? "IP20 / IP40 залежно від конфігурації" : "IP20 / IP40 by configuration" },
      warrantyItem(ua),
    ],
    photometricHeading: photometricHeading(ua),
    technicalAssets: [
      { title: technicalAssetTitles(ua).photometric, image: PREPARED_ASSETS["up-down-architectural-ring-series"].photometric, imageAlt: ua ? "Каталожні фотометричні дані серії Up & Down / Architectural Ring" : "Up & Down / Architectural Ring Series catalogue photometric data" },
      { title: technicalAssetTitles(ua).drawing, image: PREPARED_ASSETS["up-down-architectural-ring-series"].technical, imageAlt: ua ? "Каталожне технічне креслення серії Up & Down / Architectural Ring" : "Up & Down / Architectural Ring Series catalogue technical drawing" },
    ],
    dimensionNote: preparedDimensionNote(ua),
    applications: indoorApplications(market),
    supportCta: { title: ua ? "Плануєте архітектурну схему кільцевого освітлення?" : "Planning an Architectural Ring Lighting Scheme?", description: ua ? "Обговоріть геометрію, форму монтажу, розподіл up/down та проєктні опції з нашою технічною командою." : "Discuss geometry, mounting form, up/down distribution and project options with our technical team.", action: talkToTeam(ua) },
  };
}

const BOLLARD_MODELS: readonly LedSeriesModel[] = [
  model("LDB-BON.05.03", 5, "550 lm", { efficiencyLmW: ">110 lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP66", dimensions: "Ø120 × 1000 mm", mountingType: "BON" }),
  model("LDB-BON.09.03", 9, "990 lm", { efficiencyLmW: ">110 lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP66", dimensions: "Ø120 × 1000 mm", mountingType: "BON" }),
  model("LDB-BON.12.03", 12, "1,320 lm", { efficiencyLmW: ">110 lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP66", dimensions: "Ø120 × 1000 mm", mountingType: "BON" }),
  model("LDB-DEU.05.03", 5, "600 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP65", dimensions: "120 × 1000 mm", mountingType: "DEU" }),
  model("LDB-DEU.07.03", 7, "840 lm", { efficiencyLmW: ">120 lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP65", dimensions: "120 × 1000 mm", mountingType: "DEU" }),
  model("LDB-DEU.09.03", 9, "1,000 lm", { efficiencyLmW: ">111 lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP65", dimensions: "120 × 1000 mm", mountingType: "DEU" }),
  model("LDB-BRC.10.03", 12, "1,320 lm", { efficiencyLmW: ">110 lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP65", dimensions: "150 × 150 × 1000 mm", mountingType: "BRC" }),
  model("LDB-BRC.18.03", 18, "1,980 lm", { efficiencyLmW: ">110 lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP65", dimensions: "150 × 150 × 1000 mm", mountingType: "BRC" }),
];

export function decorativeBollardContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const slug = "decorative-bollard-lighting";
  const title = "Decorative Bollard Lighting";
  return {
    ...shared(market, slug, title),
    metadata: { title: `${title} | InfraVolt`, description: ua ? "Каталожні декоративні стовпчики BON, DEU та BRC." : "Catalogue-verified BON, DEU and BRC decorative bollards." },
    hero: { eyebrow: "BON · DEU · BRC", category: categoryLabel(ua), title, description: ua ? "Вуличні декоративні стовпчики для доріжок, входів та ландшафтних зон із даними захисту, специфічними для кожного сімейства каталогу." : "Outdoor decorative bollards for paths, entrances and landscape areas with family-specific catalogue protection data.", ...heroActions(ua) },
    heroImage: PREPARED_ASSETS["decorative-bollard-lighting"].foreground, heroImageAlt: ua ? "Каталожний декоративний стовпчик LDB-BON" : "LDB-BON catalogue decorative bollard", heroBackgroundImage: PREPARED_ASSETS["decorative-bollard-lighting"].background, heroBackgroundImageAlt: ua ? "Застосування декоративного зовнішнього освітлення" : "Decorative outdoor lighting application",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: ua ? "Потужність" : "Power", value: "5–18 W" }, { label: ua ? "Світловий потік" : "Luminous Flux", value: "550–1,980 lm" }, { label: ua ? "Ефективність" : "Efficiency", value: ua ? ">110 до >120 лм/Вт залежно від моделі" : ">110 to >120 lm/W by model" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ">80" }, { label: ua ? "Колірна температура" : "Colour Temperature", value: "3000–6500 K" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Опаловий PS · опції PMMA / призматичний" : "PS opal · PMMA / prismatic options" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: "BON", value: "IP66" }, { label: "DEU / BRC", value: "IP65" }, { label: ua ? "Живлення" : "Input", value: "220–240 V · 50–60 Hz" }] },
      { icon: "construction", title: cardTitle(ua, "construction-installation"), values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Корпус із порошково-пофарбованого литого алюмінію" : "Powder-coated aluminium die-cast body" }, { label: ua ? "Монтаж" : "Installation", value: ua ? "Наземний стовпчик" : "Ground-mounted bollard" }] },
    ],
    modelsIntroduction: ua ? "Повний точний розклад BON, DEU та BRC з PDF-сторінок 101–102." : "Complete exact BON, DEU and BRC catalogue schedule from PDF pages 101–102.", models: BOLLARD_MODELS, modelsColumns: columns(market, { dimensions: true, ip: true, mounting: true }), modelsFilters: { ...filters(market, "Decorative Bollard"), mountingTypeFilterLabel: ua ? "Сімейство" : "Family" },
    modelsNote: ua ? "LDB-BRC.10.03 збережено з опублікованим значенням 12 Вт; потужність не виводиться із суфікса коду." : "LDB-BRC.10.03 is preserved with its published 12 W value; power is not inferred from the code suffix.",
    controlOptions: [],
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Корпус із порошково-пофарбованого литого алюмінію" : "Powder-coated aluminium die-cast body" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP66 (BON) · IP65 (DEU / BRC)" },
      warrantyItem(ua, 7),
    ],
    photometricHeading: photometricHeading(ua),
    technicalAssets: [
      { title: technicalAssetTitles(ua).photometric, image: PREPARED_ASSETS["decorative-bollard-lighting"].photometric, imageAlt: ua ? "Каталожні фотометричні дані декоративного стовпчика LDB-BON" : "LDB-BON decorative bollard catalogue photometric data" },
      { title: technicalAssetTitles(ua).drawing, image: PREPARED_ASSETS["decorative-bollard-lighting"].technical, imageAlt: ua ? "Каталожне технічне креслення декоративного стовпчика LDB-BON" : "LDB-BON decorative bollard catalogue technical drawing" },
    ],
    dimensionNote: ua ? "Підготовлені каталожні фотометричні та габаритні довідкові матеріали для стовпчика BON; DEU та BRC використовують цей самий маршрут сімейства." : "Prepared catalogue photometric and dimensional reference material for the BON bollard; DEU and BRC share this family route.",
    applicationImage: `${ASSET_BASE}/applications/decorative-bollard.webp`, applicationImageAlt: ua ? "Каталожне застосування декоративного стовпчика в озелененій зоні" : "Catalogue decorative bollard application in a landscaped area",
    applications: outdoorApplications(market),
    supportCta: { title: ua ? "Потрібне рішення декоративних стовпчиків?" : "Need a Decorative Bollard Solution?", description: ua ? "Обговоріть сімейство BON, DEU або BRC та потрібний проєктний вихід з нашою технічною командою." : "Discuss the BON, DEU or BRC family and required project output with our technical team.", action: talkToTeam(ua) },
  };
}

type OutdoorRow = readonly [string, number, string, string, string, string];

function outdoorModels(rows: readonly OutdoorRow[]): LedSeriesModel[] {
  return rows.map(([code, powerW, flux, efficiency, dimensions, family]) => model(code, powerW, flux, {
    efficiencyLmW: efficiency,
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    ...(dimensions ? { dimensions } : {}),
    mountingType: family,
  }));
}

const POLE_MODELS = outdoorModels([
  ["LDB-PYL1.05.03", 5, "550 lm", ">110 lm/W", "120 × 1000 mm", "PYL1"], ["LDB-PYL1.09.03", 9, "990 lm", ">110 lm/W", "120 × 1000 mm", "PYL1"], ["LDB-PYL1.12.03", 12, "1,320 lm", ">110 lm/W", "120 × 1000 mm", "PYL1"],
  ["LDB-PYL2.10.03", 10, "1,000 lm", ">100 lm/W", "120 × 1000 mm", "PYL2"], ["LDB-PYL2.18.03", 18, "1,800 lm", ">100 lm/W", "120 × 1000 mm", "PYL2"], ["LDB-PYL2.24.03", 24, "2,400 lm", ">100 lm/W", "120 × 1000 mm", "PYL2"],
  ["LDB-RZRL.05.03", 5, "550 lm", ">110 lm/W", "80 × 150 × 1000 mm", "RZRL"], ["LDB-RZRL.09.03", 9, "990 lm", ">110 lm/W", "80 × 150 × 1000 mm", "RZRL"], ["LDB-RZRL.12.03", 12, "1,320 lm", ">110 lm/W", "80 × 150 × 1000 mm", "RZRL"],
  ["LDB-RZRT.10.03", 10, "1,100 lm", ">110 lm/W", "80 × 150 × 1000 mm", "RZRT"], ["LDB-RZRT.18.03", 18, "1,980 lm", ">110 lm/W", "80 × 150 × 1000 mm", "RZRT"], ["LDB-RZRT.24.03", 24, "2,640 lm", ">110 lm/W", "80 × 150 × 1000 mm", "RZRT"],
  ["LDB-SCO1.05.03", 5, "550 lm", ">110 lm/W", "120 × 120 × 1000 mm", "SCO1"], ["LDB-SCO1.09.03", 9, "990 lm", ">110 lm/W", "120 × 120 × 1000 mm", "SCO1"], ["LDB-SCO1.12.03", 12, "1,320 lm", ">110 lm/W", "120 × 120 × 1000 mm", "SCO1"],
  ["LDB-SCO2.10.03", 10, "1,000 lm", ">100 lm/W", "120 × 120 × 1000 mm", "SCO2"], ["LDB-SCO2.18.03", 18, "1,800 lm", ">100 lm/W", "120 × 120 × 1000 mm", "SCO2"], ["LDB-SCO2.24.03", 24, "2,400 lm", ">100 lm/W", "120 × 120 × 1000 mm", "SCO2"],
  ["LDB-TTR.05.03", 5, "550 lm", ">110 lm/W", "120 × 1000 mm", "TTR"], ["LDB-TTR.09.03", 9, "990 lm", ">110 lm/W", "120 × 1000 mm", "TTR"], ["LDB-TTR.12.03", 12, "1,320 lm", ">110 lm/W", "120 × 1000 mm", "TTR"],
  ["LDB-TRC.05.03", 5, "550 lm", ">110 lm/W", "150 × 150 × 150 × 1000 mm", "TRC"], ["LDB-TRC.09.03", 9, "990 lm", ">110 lm/W", "150 × 150 × 150 × 1000 mm", "TRC"], ["LDB-TRC.12.03", 12, "1,320 lm", ">110 lm/W", "150 × 150 × 150 × 1000 mm", "TRC"],
  ["LDB-VK-LPO36", 36, "3,924 lm", "109+ lm/W", "", "VK-LPO"], ["LDB-VK-LPO50", 50, "5,250 lm", "105+ lm/W", "", "VK-LPO"],
  ["LDB-VK-TPO72", 72, "7,848 lm", "109+ lm/W", "", "VK-TPO"], ["LDB-VK-TPO100", 100, "10,500 lm", "105+ lm/W", "", "VK-TPO"],
  ["LDB-VK-SQPO35", 35, "3,430 lm", "98+ lm/W", "", "VK-SQPO"], ["LDB-VK-SQPO50", 50, "5,250 lm", "105+ lm/W", "", "VK-SQPO"],
]);

export function decorativePoleContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const slug = "decorative-pole-lighting";
  const title = "Decorative Pole Lighting";
  return {
    ...shared(market, slug, title),
    metadata: { title: `${title} | InfraVolt`, description: ua ? "Каталожні серії декоративних опор із каталожних сторінок LEDBUS 103–108." : "Catalogue-verified decorative pole families from LEDBUS pages 103–108." },
    hero: { eyebrow: "PYL · RZR · SCO · TTR · TRC · VK", category: categoryLabel(ua), title, description: ua ? "Каталожний асортимент компактних декоративних колон і архітектурних опор для вуличних пішохідних проєктів." : "A catalogue-grounded range of compact decorative columns and architectural pole luminaires for outdoor pedestrian projects.", ...heroActions(ua) },
    heroImage: PREPARED_ASSETS["decorative-pole-lighting"].foreground, heroImageAlt: ua ? "Каталожна декоративна опора LDB-VK-LPO" : "LDB-VK-LPO catalogue decorative pole luminaire", heroBackgroundImage: PREPARED_ASSETS["decorative-pole-lighting"].background, heroBackgroundImageAlt: ua ? "Застосування декоративного зовнішнього освітлення" : "Decorative outdoor lighting application",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: ua ? "Опублікована потужність" : "Published Power", value: "5–100 W" }, { label: ua ? "Світловий потік" : "Luminous Flux", value: "550–10,500 lm" }, { label: ua ? "Ефективність" : "Efficiency", value: ua ? "98+ до >110 лм/Вт залежно від моделі" : "98+ to >110 lm/W by model" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ">80" }, { label: ua ? "Колірна температура" : "Colour Temperature", value: "3000–6500 K" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: ua ? "Захист" : "Protection", value: "IP65" }, { label: ua ? "Живлення" : "Input", value: "220–240 V · 50–60 Hz" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−20 to +35 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction-installation"), values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Порошково-пофарбована алюмінієва конструкція" : "Powder-coated aluminium construction" }, { label: ua ? "Монтаж" : "Installation", value: ua ? "Наземна декоративна колона / опора" : "Ground-mounted decorative column / pole" }] },
    ],
    modelsIntroduction: ua ? "Повний унікальний технічний розклад з каталожних PDF-сторінок 103–108, згрупований за справжнім префіксом джерела." : "Complete unique model schedule from catalogue PDF pages 103–108, grouped by genuine source prefix.", models: POLE_MODELS, modelsColumns: columns(market, { dimensions: true, ip: true, mounting: true }), modelsFilters: { ...filters(market, "Decorative Pole"), mountingTypeFilterLabel: ua ? "Сімейство" : "Family" },
    familyTechnicalSection: { heading: ua ? "Каталожні сімейства" : "Catalogue Families", introduction: ua ? "Кожен префікс визначає справжню каталожну геометрію; загальний шаблон коду не виводиться штучно." : "Each prefix identifies a genuine catalogue geometry; no umbrella order-code pattern is inferred.", settings: [
      { label: ua ? "Компактні колони" : "Compact Columns", value: "PYL · RZRL · RZRT · SCO · TTR · TRC", description: ua ? "Однометрові декоративні форми колон із потужністю та виходом, специфічними для моделі." : "One-metre decorative column forms with model-specific power and output." },
      { label: "VK-LPO", value: "36 W · 50 W", description: ua ? "Архітектурна серія опор з одним плечем." : "Single-arm architectural pole family." },
      { label: "VK-TPO / VK-SQPO", value: "35–100 W", description: ua ? "Каталожні конфігурації опор із двома плечима та квадратною колоною." : "Twin-arm and square-column catalogue pole configurations." },
    ], assets: [] },
    controlOptions: [],
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Порошково-пофарбована алюмінієва конструкція" : "Powder-coated aluminium construction" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP65" },
      warrantyItem(ua),
    ],
    photometricHeading: photometricHeading(ua),
    technicalAssets: [
      { title: technicalAssetTitles(ua).photometric, image: PREPARED_ASSETS["decorative-pole-lighting"].photometric, imageAlt: ua ? "Каталожні фотометричні дані декоративної опори LDB-VK-LPO" : "LDB-VK-LPO decorative pole catalogue photometric data" },
      { title: technicalAssetTitles(ua).drawing, image: PREPARED_ASSETS["decorative-pole-lighting"].technical, imageAlt: ua ? "Каталожне технічне креслення декоративної опори LDB-VK-LPO" : "LDB-VK-LPO decorative pole catalogue technical drawing" },
    ],
    dimensionNote: ua ? "Підготовлені каталожні фотометричні та габаритні довідкові матеріали для опори VK-LPO; інші каталожні сімейства використовують цей самий маршрут." : "Prepared catalogue photometric and dimensional reference material for the VK-LPO pole; other catalogue families share this family route.",
    applicationImage: `${ASSET_BASE}/applications/decorative-pole.webp`, applicationImageAlt: ua ? "Каталожне застосування декоративного освітлення опор" : "Catalogue decorative pole lighting application",
    applications: outdoorApplications(market),
    supportCta: { title: ua ? "Потрібне рішення декоративного освітлення опорами?" : "Need a Decorative Pole Lighting Solution?", description: ua ? "Обговоріть потрібне каталожне сімейство, вихід і проєктну конфігурацію з нашою технічною командою." : "Discuss the required catalogue family, output and project arrangement with our technical team.", action: talkToTeam(ua) },
  };
}

const PARK_MODELS: readonly LedSeriesModel[] = [
  model("GER-LED7043-1", 40, "", { ip: "IP65", dimensions: "300 cm height", mountingType: "GER-LED7043" }),
  model("GER-LED7043-2", 60, "", { ip: "IP65", dimensions: "400 cm height", mountingType: "GER-LED7043" }),
  model("GER-LED7043-3", 75, "", { ip: "IP65", dimensions: "500 cm height", mountingType: "GER-LED7043" }),
  model("LDB-VK-QTPO144", 144, "15,696 lm", { efficiencyLmW: "109+ lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP65", mountingType: "VK-QTPO" }),
  model("LDB-VK-QTPO200", 200, "21,000 lm", { efficiencyLmW: "105+ lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP65", mountingType: "VK-QTPO" }),
  model("LDB-VK-E100SQBL7512", 12, "1,320 lm", { efficiencyLmW: "110+ lm/W", cri: "80+", colourTemperature: "3000–6500 K", ip: "IP65", dimensions: "750 mm", mountingType: "E100SQBL" }),
  model("LDB-VK-E100SQBL9512", 12, "1,320 lm", { efficiencyLmW: "110+ lm/W", cri: "80+", colourTemperature: "3000–6500 K", ip: "IP65", dimensions: "950 mm", mountingType: "E100SQBL" }),
];

export function parkLandscapeContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const slug = "park-landscape-pole-systems";
  const title = "Park & Landscape Pole Systems";
  return {
    ...shared(market, slug, title),
    metadata: { title: `${title} | InfraVolt`, description: ua ? "Каталожні ландшафтні системи опор GER-LED7043, VK-QTPO та E100SQBL." : "Catalogue-verified GER-LED7043, VK-QTPO and E100SQBL landscape pole systems." },
    hero: { eyebrow: "GER-LED7043 · VK-QTPO · E100SQBL", category: categoryLabel(ua), title, description: ua ? "Архітектурні паркові та ландшафтні системи опор із точними каталожними кодами та розкладами, специфічними для кожного сімейства." : "Architectural park and landscape pole systems with exact catalogue codes and family-specific schedules.", ...heroActions(ua) },
    heroImage: PREPARED_ASSETS["park-landscape-pole-systems"].foreground, heroImageAlt: ua ? "Каталожна чотириголова ландшафтна опора LDB-VK-QTPO" : "LDB-VK-QTPO catalogue four-head landscape pole", heroBackgroundImage: PREPARED_ASSETS["park-landscape-pole-systems"].background, heroBackgroundImageAlt: ua ? "Застосування декоративного зовнішнього освітлення" : "Decorative outdoor lighting application",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: ua ? "Опублікована потужність" : "Published Power", value: "12–200 W" }, { label: ua ? "Вихід VK-QTPO" : "VK-QTPO Output", value: "15,696–21,000 lm" }, { label: ua ? "Вихід E100SQBL" : "E100SQBL Output", value: "1,320 lm" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ua ? ">80, де опубліковано" : ">80 where published" }, { label: ua ? "Колірна температура" : "Colour Temperature", value: ua ? "3000–6500 K, де опубліковано" : "3000–6500 K where published" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: ua ? "Захист" : "Protection", value: "IP65" }, { label: ua ? "Живлення" : "Input", value: "220–240 V · 50–60 Hz" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−20 to +35 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction-installation"), values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Порошково-пофарбований алюміній" : "Powder-coated aluminium" }, { label: ua ? "Монтаж" : "Installation", value: ua ? "Наземна паркова / ландшафтна опора" : "Ground-mounted park / landscape pole" }] },
    ],
    modelsIntroduction: ua ? "Повний точний розклад продукції з каталожних PDF-сторінок 109–110." : "Complete exact product schedule from catalogue PDF pages 109–110.", models: PARK_MODELS, modelsColumns: columns(market, { dimensions: true, ip: true, mounting: true }), modelsFilters: { ...filters(market, "Park & Landscape"), mountingTypeFilterLabel: ua ? "Сімейство" : "Family" },
    modelsNote: ua ? "Джерело GER-LED7043 публікує значення 300, 400 та 500 як висоту опори (см), а не значення світлового потоку." : "The GER-LED7043 source publishes 300, 400 and 500 as pole heights (cm), not luminous-flux values.",
    familyTechnicalSection: { heading: ua ? "Ландшафтні конфігурації" : "Landscape Configurations", introduction: ua ? "Сторінка зберігає три окремі каталожні групи продуктів, не вигадуючи спільне сімейство кодів." : "The page keeps three distinct catalogue product groups without inventing a shared order-code family.", settings: [
      { label: "GER-LED7043", value: "300 / 400 / 500 cm", description: ua ? "Алюмінієва серія LED-опор у трьох опублікованих висотах." : "Aluminium LED pole family in three published heights." },
      { label: "VK-QTPO", value: "144 W · 200 W", description: ua ? "Багатонапрямна система архітектурної опори." : "Multi-directional architectural pole-head system." },
      { label: "E100SQBL", value: "750 mm · 950 mm", description: ua ? "Компактна ландшафтна колона у двох точних каталожних кодах." : "Compact landscape column in two exact catalogue codes." },
    ], assets: [] },
    controlOptions: [],
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Порошково-пофарбований алюміній" : "Powder-coated aluminium" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP65" },
      warrantyItem(ua),
    ],
    photometricHeading: photometricHeading(ua),
    technicalAssets: [
      { title: technicalAssetTitles(ua).photometric, image: PREPARED_ASSETS["park-landscape-pole-systems"].photometric, imageAlt: ua ? "Каталожні фотометричні дані ландшафтної опори LDB-VK-QTPO" : "LDB-VK-QTPO landscape pole catalogue photometric data" },
      { title: technicalAssetTitles(ua).drawing, image: PREPARED_ASSETS["park-landscape-pole-systems"].technical, imageAlt: ua ? "Каталожне технічне креслення ландшафтної опори LDB-VK-QTPO" : "LDB-VK-QTPO landscape pole catalogue technical drawing" },
    ],
    dimensionNote: ua ? "Підготовлені каталожні фотометричні та габаритні довідкові матеріали для опори VK-QTPO; GER-LED7043 та E100SQBL використовують цей самий маршрут." : "Prepared catalogue photometric and dimensional reference material for the VK-QTPO pole; GER-LED7043 and E100SQBL share this family route.",
    applications: outdoorApplications(market),
    supportCta: { title: ua ? "Плануєте паркову чи ландшафтну схему освітлення?" : "Planning a Park or Landscape Lighting Scheme?", description: ua ? "Обговоріть сімейство опор, висоту та потрібний проєктний вихід з нашою технічною командою." : "Discuss the pole family, height and project output requirement with our technical team.", action: talkToTeam(ua) },
  };
}

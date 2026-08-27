import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

export const LINEAR_TRUNKING_CATEGORY_HREF = "/products/led-systems/linear-trunking-lighting";

const ASSET_BASE = "/assets/products/led-lighting/series/linear-trunking";
const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/linear-trunking");
const PRODUCT_HERO_BASE = `${CATEGORY_ASSET_BASE}/product`;
const PRODUCT_BACKGROUND_BASE = `${PRODUCT_HERO_BASE}/background`;
const PHOTOMETRIC_BASE = `${CATEGORY_ASSET_BASE}/photometric`;
const TECHNICAL_BASE = `${CATEGORY_ASSET_BASE}/technical`;
const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;

const LNR_LNRSA_HERO_IMAGE = `${PRODUCT_HERO_BASE}/linner-lnr-lnrsa-hero-product-transparent.webp`;
const LNR_LNRSA_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/linner-lnr-lnrsa-hero-background.webp`;
const LNR_LNRSA_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/linner-lnr-lnrsa-photometric-data.webp`;
const LNR_LNRSA_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/linner-lnr-lnrsa-technical-drawing.webp`;

const LNR55_HERO_IMAGE = `${PRODUCT_HERO_BASE}/linner-lnr55-hero-product-transparent.webp`;
const LNR55_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/linner-lnr55-hero-background.webp`;
const LNR55_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/linner-lnr55-photometric-data.webp`;
const LNR55_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/linner-lnr55-technical-drawing.webp`;

const LNR85_HERO_IMAGE = `${PRODUCT_HERO_BASE}/linner-lnr85-hero-product-transparent.webp`;
const LNR85_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/linner-lnr85-hero-background.webp`;
const LNR85_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/linner-lnr85-photometric-data.png`;
const LNR85_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/linner-lnr85-technical-drawing.png`;

const LNR105_HERO_IMAGE = `${PRODUCT_HERO_BASE}/linner-lnr105-hero-product-transparent.webp`;
const LNR105_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/linner-lnr105-hero-background.webp`;
// No category-level photometric/technical asset exists yet for LNR105; the per-configuration catalogue assets below are kept.

const LNR33D_HERO_IMAGE = `${PRODUCT_HERO_BASE}/linner-lnr33d-hero-product-transparent.webp`;
const LNR33D_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/linner-lnr33d-hero-background.webp`;
const LNR33D_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/linner-lnr33d-photometric-data.webp`;
const LNR33D_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/linner-lnr33d-technical-drawing.webp`;

const LW_WP_HERO_IMAGE = `${PRODUCT_HERO_BASE}/lw-wp-architectural-linear-hero-product-transparent.webp`;
const LW_WP_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/lw-wp-architectural-linear-hero-background.webp`;
const LW_WP_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/lw-wp-architectural-linear-photometric-data.webp`;
const LW_WP_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/lw-wp-architectural-linear-technical-drawing.webp`;

const MULTILINE_HERO_IMAGE = `${PRODUCT_HERO_BASE}/multiline45-continuous-trunking-hero-product-transparent.webp`;
const MULTILINE_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/multiline45-continuous-trunking-hero-background.webp`;
const MULTILINE_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/multiline45-photometric-data.webp`;
const MULTILINE_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/multiline45-technical-drawing.webp`;
const MULTILINE_SYSTEM_DIAGRAM_IMAGE = `${TECHNICAL_BASE}/multiline45-system-exploded-technical-diagram.webp`;

const FAMILIES = [
  { slug: "linner-lnr-lnrsa", name: "LINNER LNR / LNRSA", subtitleEn: "Suspended and surface-mounted 33 mm linear platform", subtitleUa: "Підвісна та накладна лінійна платформа 33 мм" },
  { slug: "linner-lnr55", name: "LINNER LNR55 Series", subtitleEn: "Recessed, surface and direct / indirect configurations", subtitleUa: "Вбудована, накладна та пряма/непряма конфігурації" },
  { slug: "linner-lnr85", name: "LINNER LNR85 Series", subtitleEn: "Surface-mounted opal architectural linear lighting", subtitleUa: "Накладне архітектурне лінійне освітлення з опаловим розсіювачем" },
  { slug: "linner-lnr105", name: "LINNER LNR105 Series", subtitleEn: "Rectangular and cylindrical architectural configurations", subtitleUa: "Прямокутні та циліндричні архітектурні конфігурації" },
  { slug: "linner-lnr33d", name: "LINNER LNR33D Series", subtitleEn: "Opal and louvered linear configurations", subtitleUa: "Опалові та реєчні лінійні конфігурації" },
  { slug: "lw-wp-architectural-linear", name: "LW & WP Architectural Linear Luminaires", subtitleEn: "LW55, LW280 and WP80 architectural families", subtitleUa: "Архітектурні серії LW55, LW280 та WP80" },
  { slug: "multiline-45", name: "MULTILINE 45 Continuous Trunking System", subtitleEn: "F and L continuous-row configurations", subtitleUa: "Конфігурації неперервного ряду F та L" },
] as const;

function siblingFamilies(current: string, ua: boolean) {
  return FAMILIES.map((family) => ({
    slug: family.slug,
    name: family.name,
    subtitle: ua ? family.subtitleUa : family.subtitleEn,
    ...(family.slug === current
      ? { isCurrent: true }
      : { href: `${LINEAR_TRUNKING_CATEGORY_HREF}/${family.slug}` }),
  }));
}

// Single source of truth for the Linear & Trunking warranty split — LW &
// WP Architectural Linear publishes 5 years; every other family in the
// category (the LINNER default and MULTILINE 45) publishes 7.
function warrantyItem(ua: boolean, years: 5 | 7 = 7) {
  return { icon: "warranty" as const, label: ua ? "Гарантія" : "Warranty", value: ua ? `${years} років гарантії` : `${years}-Year Warranty` };
}

function heroActions(ua: boolean) {
  return { primaryAction: ua ? "Запросити технічний пакет" : "Request Technical Pack", secondaryAction: ua ? "Завантажити PDF-каталог" : "Download PDF Catalogue" };
}

function talkToTeam(ua: boolean) {
  return ua ? "Звернутися до нашої технічної команди" : "Talk to Our Technical Team";
}

const CARD_TITLES = {
  performance: ["Performance", "Продуктивність"],
  "light-quality": ["Light Quality", "Якість світла"],
  "protection-electrical": ["Protection & Electrical", "Захист та електрика"],
  construction: ["Construction & Installation", "Конструкція та монтаж"],
  "construction-configuration": ["Construction & Configuration", "Конструкція та конфігурація"],
} as const;

function cardTitle(ua: boolean, key: keyof typeof CARD_TITLES) {
  const [en, uaText] = CARD_TITLES[key];
  return ua ? uaText : en;
}

const FIELD_LABELS = {
  power: ["Power", "Потужність"],
  luminousFlux: ["Luminous Flux", "Світловий потік"],
  efficiency: ["Efficiency", "Ефективність"],
  cri: ["CRI", "CRI"],
  colourTemperature: ["Colour Temperature", "Колірна температура"],
  diffuser: ["Diffuser", "Розсіювач"],
  voltage: ["Voltage", "Напруга"],
  voltageFrequency: ["Voltage / Frequency", "Напруга / частота"],
  protection: ["Protection", "Захист"],
  operatingTemperature: ["Operating Temperature", "Робоча температура"],
  housing: ["Housing", "Корпус"],
  installation: ["Installation", "Монтаж"],
  configuration: ["Configuration", "Конфігурація"],
} as const;

function field(ua: boolean, key: keyof typeof FIELD_LABELS) {
  const [en, uaText] = FIELD_LABELS[key];
  return ua ? uaText : en;
}

function modelsColumnsBase(ua: boolean) {
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
    dimensions: ua ? "Розміри" : "Dimensions",
    ip: "IP",
  };
}

function filters(market: MarketCode, placeholderUk: string, placeholderUa: string): NonNullable<LedSeriesDetailContent["modelsFilters"]> {
  const ua = market === "ua";
  return {
    searchLabel: ua ? "Пошук" : "Search",
    searchPlaceholder: ua ? placeholderUa : placeholderUk,
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
    breadcrumbs: { home: ua ? "Головна" : "Home", products: ua ? "Продукція" : "Products", ledSystems: ua ? "LED-системи" : "LED Systems", category: ua ? "Лінійне та магістральне освітлення" : "Linear & Trunking Lighting", current: title },
    backToCategoryLabel: ua ? "Назад до лінійного та магістрального освітлення" : "Back to Linear & Trunking Lighting",
    technicalInformationHeading: ua ? "Технічна інформація" : "Technical Information",
    // Housing material/finish is identical across every LINNER/LW/WP/
    // MULTILINE family ("Powder-coated aluminium extrusion" — see each
    // Construction & Installation card); IP compliance varies by family
    // and is overridden after this spread where the family states a
    // different value (LW & WP: IP20/IP40, MULTILINE 45: IP54).
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Порошково-фарбований алюмінієвий профіль" : "Powder-coated aluminium extrusion" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP40" },
      warrantyItem(ua),
    ],
    modelsHeading: ua ? "Моделі та технічний розклад" : "Models & Technical Schedule",
    controlsHeading: "",
    controlsIntroduction: "",
    controlOptions: [],
    photometricHeading: ua ? "Фотометричні та технічні дані" : "Photometric & Technical Data",
    applicationsHeading: ua ? "Типові сфери застосування" : "Typical Applications",
    applicationCardsAlways: true,
    siblingFamiliesHeading: ua ? "Інші серії лінійного та магістрального освітлення" : "Other Linear & Trunking Families",
    siblingViewSeriesLabel: ua ? "Переглянути серію" : "View Series",
    currentFamilyBadgeLabel: ua ? "Поточна серія" : "Current Family",
    siblingFamilies: siblingFamilies(slug, ua),
  } as const;
}

function applications(market: MarketCode) {
  const ua = market === "ua";
  return [
    { icon: "office", title: ua ? "Офіси" : "Offices", description: ua ? "Архітектурне лінійне освітлення офісів і сучасних робочих просторів." : "Architectural linear lighting for offices and modern workspaces.", image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-offices.webp`, imageAlt: ua ? "Офіс, освітлений лінійними світильниками LINNER" : "Office illuminated by LINNER linear lighting" },
    { icon: "education", title: ua ? "Навчальні приміщення" : "Education Spaces", description: ua ? "Лінійне освітлення класів і спільних навчальних середовищ." : "Linear illumination for classrooms and shared learning environments.", image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-education-spaces.webp`, imageAlt: ua ? "Навчальне приміщення, освітлене лінійними світильниками LINNER" : "Education space illuminated by LINNER linear lighting" },
    { icon: "corridor", title: ua ? "Коридори" : "Corridors", description: ua ? "Неперервне й рівномірне освітлення шляхів циркуляції." : "Continuous and uniform lighting for circulation routes.", image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-corridors.webp`, imageAlt: ua ? "Коридор, освітлений лінійними світильниками LINNER" : "Corridor illuminated by LINNER linear lighting" },
    { icon: "shopping-centre", title: ua ? "Комерційні інтер'єри" : "Commercial Interiors", description: ua ? "Підвісне, накладне та вбудоване освітлення комерційних інтер'єрів." : "Suspended, surface and recessed lighting for commercial interiors.", image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-commercial-interiors.webp`, imageAlt: ua ? "Комерційний інтер'єр, освітлений лінійними світильниками LINNER" : "Commercial interior illuminated by LINNER linear lighting" },
    { icon: "retail", title: ua ? "Роздрібна торгівля" : "Retail", description: ua ? "Лінійне освітлення торгових залів і клієнтських зон." : "Linear lighting for retail floors and customer-facing spaces.", image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-retail.webp`, imageAlt: ua ? "Торговий зал, освітлений лінійними світильниками LINNER" : "Retail floor illuminated by LINNER linear lighting" },
    { icon: "office", title: ua ? "Архітектурні робочі простори" : "Architectural Workspaces", description: ua ? "Проєктне освітлення для скоординованих архітектурних робочих просторів." : "Project lighting for coordinated architectural workplace schemes.", image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-architectural-workspaces.webp`, imageAlt: ua ? "Архітектурний робочий простір, освітлений лінійними світильниками LINNER" : "Architectural workspace illuminated by LINNER linear lighting" },
  ] as const;
}

type ModelBase = Omit<LedSeriesModel, "model" | "powerW" | "luminousFluxLm" | "dimensions" | "ceilingCut" | "powerDisplay">;
type ModelRow = readonly [model: string, powerW: number, luminousFlux: string, dimensions?: string, ceilingCut?: string, powerDisplay?: string];

function makeModels(rows: readonly ModelRow[], base: ModelBase): readonly LedSeriesModel[] {
  return rows.map(([model, powerW, luminousFluxLm, dimensions, ceilingCut, powerDisplay]) => ({
    ...base,
    model,
    powerW,
    luminousFluxLm,
    ...(dimensions ? { dimensions } : {}),
    ...(ceilingCut ? { ceilingCut } : {}),
    ...(powerDisplay ? { powerDisplay } : {}),
  }));
}

const LINNER_BASE: ModelBase = {
  voltage: "220–240 Vac",
  operatingTemperature: "−20 to +35 °C",
  efficiencyLmW: ">110 lm/W",
  cri: ">80",
  colourTemperature: "3000–6500 K",
  ip: "IP40",
};

const LINNER_115_BASE: ModelBase = { ...LINNER_BASE, efficiencyLmW: ">115 lm/W" };

const STANDARD_LUMENS = ["1,540 lm", "1,980 lm", "2,200 lm", "2,970 lm", "3,960 lm", "4,950 lm", "5,830 lm", "7,920 lm"] as const;
const HIGH_LUMENS = ["1,610 lm", "2,070 lm", "2,300 lm", "3,105 lm", "4,140 lm", "5,175 lm", "6,095 lm", "8,280 lm"] as const;

const LNR_ROWS: readonly ModelRow[] = [
  ["LDB-LNR3360.14.03", 14, STANDARD_LUMENS[0], "33 × 600 × 100 mm"], ["LDB-LNR3360.18.03", 18, STANDARD_LUMENS[1], "33 × 600 × 100 mm"],
  ["LDB-LNR3390.20.03", 20, STANDARD_LUMENS[2], "33 × 900 × 100 mm"], ["LDB-LNR33120.27.03", 27, STANDARD_LUMENS[3], "33 × 1200 × 100 mm"],
  ["LDB-LNR33120.36.03", 36, STANDARD_LUMENS[4], "33 × 1200 × 100 mm"], ["LDB-LNR33150.45.03", 45, STANDARD_LUMENS[5], "33 × 1500 × 100 mm"],
  ["LDB-LNR33240.53.03", 53, STANDARD_LUMENS[6], "33 × 2400 × 100 mm"], ["LDB-LNR33240.72.03", 72, STANDARD_LUMENS[7], "33 × 2400 × 100 mm"],
];
const LNRSA_ROWS: readonly ModelRow[] = [
  ["LDB-LNRSA3360.14.03", 14, STANDARD_LUMENS[0], "33 × 600 × 100 mm"], ["LDB-LNRSA3360.18.03", 18, STANDARD_LUMENS[1], "33 × 600 × 100 mm"],
  ["LDB-LNRSA3390.20.03", 20, STANDARD_LUMENS[2], "33 × 900 × 100 mm"], ["LDB-LNRSA33120.27.03", 27, STANDARD_LUMENS[3], "33 × 1200 × 100 mm"],
  ["LDB-LNRSA33120.36.03", 36, STANDARD_LUMENS[4], "33 × 1200 × 100 mm"], ["LDB-LNRSA33150.45.03", 45, STANDARD_LUMENS[5], "33 × 1500 × 100 mm"],
  ["LDB-LNRSA33240.53.03", 53, STANDARD_LUMENS[6], "33 × 2400 × 100 mm"], ["LDB-LNRSA33240.72.03", 72, STANDARD_LUMENS[7], "33 × 2400 × 100 mm"],
];

function lnrContent(surface: boolean, market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const label = surface ? "LNRSA Surface Mounted" : "LNR Suspended";
  return {
    ...shared(market, "linner-lnr-lnrsa", "LINNER LNR / LNRSA Linear Lighting Fixtures"),
    metadata: { title: "LINNER LNR / LNRSA Linear Lighting Fixtures | InfraVolt", description: ua ? "Каталожні підвісні LNR та накладні LNRSA архітектурні лінійні світильники 33 мм." : "Catalogue-verified suspended LNR and surface-mounted LNRSA 33 mm architectural linear luminaires." },
    hero: { eyebrow: label, category: ua ? "Лінійне та магістральне освітлення" : "Linear & Trunking Lighting", title: "LINNER LNR / LNRSA Linear Lighting Fixtures", description: ua ? "Тонка архітектурна лінійна платформа 33 мм, доступна в підвісній конфігурації LNR та накладній LNRSA для комерційних і проєктних інтер'єрів." : "Slim 33 mm architectural linear lighting platform available in suspended LNR and surface-mounted LNRSA configurations for commercial and project interiors.", ...heroActions(ua) },
    heroImage: LNR_LNRSA_HERO_IMAGE,
    heroImageAlt: ua ? "Лінійний світильник LINNER LNR / LNRSA" : "LINNER LNR / LNRSA linear luminaire", heroBackgroundImage: LNR_LNRSA_HERO_BACKGROUND_IMAGE, heroBackgroundImageAlt: ua ? "Комерційний інтер'єр із неперервним лінійним освітленням" : "Commercial interior with continuous linear lighting",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: field(ua, "power"), value: "14–72 W" }, { label: field(ua, "luminousFlux"), value: "1,540–7,920 lm" }, { label: field(ua, "efficiency"), value: ">110 lm/W" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ">80" }, { label: field(ua, "colourTemperature"), value: "3000–6500 K" }, { label: ua ? "LED" : "LED", value: "SMD LED" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "voltage"), value: "220–240 Vac" }, { label: field(ua, "protection"), value: "IP40" }, { label: field(ua, "operatingTemperature"), value: "−20 to +35 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction"), values: [{ label: field(ua, "housing"), value: ua ? "Порошково-пофарбований пресований алюміній" : "Powder-coated aluminium extrusion" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Опаловий PMMA" : "Opal PMMA" }, { label: field(ua, "installation"), value: surface ? (ua ? "Накладний монтаж" : "Surface mounted") : (ua ? "Підвісний · стандартний комплект 1,5 м" : "Suspended · 1.5 m standard kit") }] },
    ],
    modelsIntroduction: ua ? `Точний каталожний розклад ${label}. Повторюваний примітка про підвісний комплект не застосовується до опису монтажу LNRSA.` : `Exact ${label} catalogue schedule. The repeated suspension-kit note is not applied to the LNRSA installation description.`,
    models: makeModels(surface ? LNRSA_ROWS : LNR_ROWS, LINNER_BASE),
    modelsColumns: { ...modelsColumnsBase(ua), dimensions: ua ? "Розміри корпусу" : "Body Dimensions" },
    modelsFilters: filters(market, `Search ${surface ? "LNRSA" : "LNR"} model code`, `Пошук за кодом моделі ${surface ? "LNRSA" : "LNR"}`),
    technicalAssets: [{ title: ua ? "Фотометричні дані" : "Photometric Data", image: LNR_LNRSA_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Фотометричні дані LINNER LNR та LNRSA" : "LINNER LNR and LNRSA photometric data" }, { title: ua ? "Технічне креслення" : "Technical Drawing", image: LNR_LNRSA_TECHNICAL_IMAGE, imageAlt: ua ? "Технічне креслення LINNER LNR та LNRSA" : "LINNER LNR and LNRSA technical drawing" }],
    dimensionNote: ua ? "Фотометричні та технічні креслення, специфічні для сімейства LNR / LNRSA." : "Family-specific photometric and technical drawings for the LNR / LNRSA family.", applications: applications(market),
    supportCta: { title: ua ? "Плануєте проєкт лінійного освітлення?" : "Planning a Linear Lighting Project?", description: ua ? "Обговоріть підвісну чи накладну конфігурацію та потрібну довжину з нашою технічною командою." : "Discuss the suspended or surface-mounted configuration and required length with our technical team.", action: talkToTeam(ua) },
  };
}

export function lnrConfigurationsForMarket(market: MarketCode) {
  const ua = market === "ua";
  return [{ id: "lnr", label: ua ? "LNR підвісний" : "LNR Suspended", content: lnrContent(false, market) }, { id: "lnrsa", label: ua ? "LNRSA накладний" : "LNRSA Surface Mounted", content: lnrContent(true, market) }] as const;
}

const LNR55_RECESSED: readonly ModelRow[] = [
  ["LDB-LNR5560.14.01",14,STANDARD_LUMENS[0],"65 × 620 × 80 mm","60 × 610 mm"], ["LDB-LNR5560.18.01",18,STANDARD_LUMENS[1],"65 × 620 × 80 mm","60 × 610 mm"],
  ["LDB-LNR5590.20.01",20,STANDARD_LUMENS[2],"65 × 920 × 80 mm","60 × 910 mm"], ["LDB-LNR55120.27.01",27,STANDARD_LUMENS[3],"65 × 1220 × 80 mm","60 × 1210 mm"],
  ["LDB-LNR55120.36.01",36,STANDARD_LUMENS[4],"65 × 1220 × 80 mm","60 × 1210 mm"], ["LDB-LNR55150.45.01",45,STANDARD_LUMENS[5],"65 × 1520 × 80 mm","60 × 1510 mm"],
  ["LDB-LNR55240.53.01",53,STANDARD_LUMENS[6],"65 × 2420 × 80 mm","60 × 2410 mm"], ["LDB-LNR55240.72.01",72,STANDARD_LUMENS[7],"65 × 2420 × 80 mm","60 × 2410 mm"],
];
const LNR55_SURFACE: readonly ModelRow[] = [
  ["LDB-LNR5560.14.02",14,HIGH_LUMENS[0],"53 × 620 × 100 mm","55 × 600 × 80 mm"], ["LDB-LNR5560.18.02",18,HIGH_LUMENS[1],"53 × 620 × 100 mm","55 × 600 × 80 mm"],
  ["LDB-LNR5590.20.02",20,HIGH_LUMENS[2],"53 × 920 × 100 mm","55 × 900 × 80 mm"], ["LDB-LNR55120.27.02",27,HIGH_LUMENS[3],"53 × 1220 × 100 mm","55 × 1200 × 80 mm"],
  ["LDB-LNR55120.36.02",36,HIGH_LUMENS[4],"53 × 1220 × 100 mm","55 × 1200 × 80 mm"], ["LDB-LNR55150.45.02",45,HIGH_LUMENS[5],"53 × 1520 × 100 mm","55 × 1500 × 80 mm"],
  ["LDB-LNR55240.53.02",53,HIGH_LUMENS[6],"53 × 2420 × 100 mm","55 × 2400 × 80 mm"], ["LDB-LNR55240.72.02",72,HIGH_LUMENS[7],"53 × 2420 × 100 mm","55 × 2400 × 80 mm"],
];
const LNR55_UD: readonly ModelRow[] = [
  ["LDB-LNR55UD60.14.02",14,"2,990 lm total","55 × 600 × 80 mm",undefined,"14 W down / 12 W up"], ["LDB-LNR55UD60.18.02",18,"3,450 lm total","55 × 600 × 80 mm",undefined,"18 W down / 12 W up"],
  ["LDB-LNR55UD90.20.02",20,"4,025 lm total","55 × 900 × 80 mm",undefined,"20 W down / 15 W up"], ["LDB-LNR55UD120.27.02",27,"5,405 lm total","55 × 1200 × 80 mm",undefined,"27 W down / 20 W up"],
  ["LDB-LNR55UD120.36.02",36,"6,440 lm total","55 × 1200 × 80 mm",undefined,"36 W down / 20 W up"], ["LDB-LNR55UD150.45.02",45,"9,315 lm total","55 × 1500 × 80 mm",undefined,"45 W down / 36 W up"],
  ["LDB-LNR55UD240.53.02",53,"11,270 lm total","55 × 2400 × 80 mm",undefined,"53 W down / 45 W up"], ["LDB-LNR55UD240.72.02",72,"14,375 lm total","55 × 2400 × 80 mm",undefined,"72 W down / 53 W up"],
];

type Lnr55Configuration = "recessed" | "surface" | "direct-indirect";
function lnr55Content(configuration: Lnr55Configuration, market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const config = {
    recessed: { label: "Recessed Opal", labelUa: "Вбудований опаловий", rows: LNR55_RECESSED, base: LINNER_BASE, efficiency: ">110 lm/W", flux: "1,540–7,920 lm" },
    surface: { label: "Surface Mounted Opal", labelUa: "Накладний опаловий", rows: LNR55_SURFACE, base: LINNER_115_BASE, efficiency: ">115 lm/W", flux: "1,610–8,280 lm" },
    "direct-indirect": { label: "LNR55UD Direct / Indirect", labelUa: "LNR55UD пряме / непряме", rows: LNR55_UD, base: LINNER_115_BASE, efficiency: ">115 lm/W", flux: "2,990–14,375 lm total" },
  }[configuration];
  const label = ua ? config.labelUa : config.label;
  const direct = configuration === "direct-indirect";
  return {
    ...shared(market, "linner-lnr55", "LINNER LNR55 Series"), metadata: { title: "LINNER LNR55 Series | InfraVolt", description: ua ? "Каталожні вбудовані, накладні та прямі/непрямі архітектурні лінійні світильники LNR55." : "Catalogue-verified recessed, surface-mounted and direct/indirect LNR55 architectural linear luminaires." },
    hero: { eyebrow: label, category: ua ? "Лінійне та магістральне освітлення" : "Linear & Trunking Lighting", title: "LINNER LNR55 Series", description: ua ? "Архітектурне сімейство лінійного освітлення 55 мм із вбудованою, накладною та підвісною прямою/непрямою конфігураціями." : "Architectural 55 mm linear lighting family with recessed, surface-mounted and suspended direct/indirect configurations.", ...heroActions(ua) },
    heroImage: LNR55_HERO_IMAGE, heroImageAlt: ua ? "Лінійний світильник LINNER LNR55" : "LINNER LNR55 linear luminaire", heroBackgroundImage: LNR55_HERO_BACKGROUND_IMAGE, heroBackgroundImageAlt: ua ? "Комерційний інтер'єр із неперервним лінійним освітленням" : "Commercial interior with continuous linear lighting",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: direct ? (ua ? "Потужність вниз/вгору" : "Down / Up Power") : field(ua, "power"), value: direct ? "14 / 12 W to 72 / 53 W" : "14–72 W" }, { label: field(ua, "luminousFlux"), value: config.flux }, { label: field(ua, "efficiency"), value: config.efficiency }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ">80" }, { label: field(ua, "colourTemperature"), value: "3000–6500 K" }, { label: field(ua, "diffuser"), value: ua ? "Опаловий PMMA" : "Opal PMMA" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "voltage"), value: "220–240 Vac" }, { label: field(ua, "protection"), value: "IP40" }, { label: field(ua, "operatingTemperature"), value: "−20 to +35 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction"), values: [{ label: field(ua, "housing"), value: ua ? "Порошково-пофарбований пресований алюміній" : "Powder-coated aluminium extrusion" }, { label: field(ua, "configuration"), value: label }, ...(direct ? [{ label: ua ? "Підвіс" : "Suspension", value: ua ? "Стандартний комплект 1,5 м" : "1.5 m standard kit" }] : [])] },
    ],
    modelsIntroduction: ua ? `Точний розклад ${label}. ${direct ? "Значення потужності вниз і вгору залишаються окремими." : "Каталожні поля корпусу та стельового вирізу зберігаються окремо."}` : `Exact ${config.label} schedule. ${direct ? "Down and up powers remain separately stated." : "Catalogue body and ceiling-cut fields are preserved separately."}`,
    models: makeModels(config.rows, config.base), modelsColumns: { ...modelsColumnsBase(ua), power: direct ? (ua ? "Потужність вниз/вгору" : "Down / Up Power") : modelsColumnsBase(ua).power, luminousFlux: direct ? (ua ? "Загальний світловий потік" : "Total Luminous Flux") : modelsColumnsBase(ua).luminousFlux, dimensions: ua ? "Розміри корпусу" : "Body Dimensions", ceilingCut: configuration === "recessed" || configuration === "surface" ? (ua ? "Каталожне поле стельового вирізу" : "Catalogue Ceiling-Cut Field") : undefined }, modelsFilters: filters(market, "Search LNR55 model code", "Пошук за кодом моделі LNR55"),
    familyTechnicalSection: { heading: ua ? "Конфігурації освітлення" : "Lighting Configurations", introduction: ua ? "Каталог визначає три окремі конфігурації LNR55 в межах одного маршруту сімейства." : "The catalogue defines three distinct LNR55 arrangements on this single family route.", settings: [{ label: ua ? "Вбудований" : "Recessed", value: ua ? "Опаловий · >110 лм/Вт" : "Opal · >110 lm/W", description: ua ? "Вбудований корпус із каталожними значеннями стельового вирізу." : "Recessed body with catalogue ceiling-cut values." }, { label: ua ? "Накладний" : "Surface Mounted", value: ua ? "Опаловий · >115 лм/Вт" : "Opal · >115 lm/W", description: ua ? "Накладний корпус із власним опублікованим розкладом виходу." : "Surface-mounted body with its own published output schedule." }, { label: ua ? "Пряме / непряме" : "Direct / Indirect", value: ua ? "Окрема потужність вниз і вгору" : "Separate down and up power", description: ua ? "Підвісна конфігурація LNR55UD із загальним світловим потоком." : "Suspended LNR55UD configuration with total luminous flux." }], assets: [] },
    technicalAssets: [{ title: ua ? "Фотометричні дані" : "Photometric Data", image: LNR55_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Фотометричні дані LINNER LNR55" : "LINNER LNR55 photometric data" }, { title: ua ? "Технічне креслення" : "Technical Drawing", image: LNR55_TECHNICAL_IMAGE, imageAlt: ua ? "Технічне креслення LINNER LNR55" : "LINNER LNR55 technical drawing" }], dimensionNote: ua ? `Фотометричні та технічні креслення спільні для сімейства LNR55; каталожний розклад ${label} вище наводить точні значення на рівні моделі.` : `Photometric and technical drawings shown are shared across the LNR55 family; the ${config.label} catalogue schedule above lists the exact model-level values.`, applications: applications(market),
    supportCta: { title: ua ? "Потрібна конфігурація LNR55?" : "Need an LNR55 Configuration?", description: ua ? "Обговоріть спосіб монтажу, вимогу до прямого/непрямого освітлення та довжину моделі з нашою технічною командою." : "Discuss the mounting arrangement, direct/indirect requirement and model length with our technical team.", action: talkToTeam(ua) },
  };
}

export function lnr55ConfigurationsForMarket(market: MarketCode) {
  const ua = market === "ua";
  return [{ id: "recessed", label: ua ? "Вбудований опаловий" : "Recessed Opal", content: lnr55Content("recessed", market) }, { id: "surface", label: ua ? "Накладний опаловий" : "Surface Mounted Opal", content: lnr55Content("surface", market) }, { id: "direct-indirect", label: ua ? "LNR55UD пряме / непряме" : "LNR55UD Direct / Indirect", content: lnr55Content("direct-indirect", market) }] as const;
}

const LNR85_ROWS: readonly ModelRow[] = [
  ["LDB-LNR8560.14.02",14,HIGH_LUMENS[0],"105 × 620 × 85 mm","85 × 600 × 85 mm"], ["LDB-LNR8560.18.02",18,HIGH_LUMENS[1],"105 × 620 × 85 mm","85 × 600 × 85 mm"],
  ["LDB-LNR8590.20.02",20,HIGH_LUMENS[2],"105 × 920 × 85 mm","85 × 900 × 85 mm"], ["LDB-LNR85120.27.02",27,HIGH_LUMENS[3],"105 × 1220 × 85 mm","85 × 1200 × 85 mm"],
  ["LDB-LNR85120.36.02",36,HIGH_LUMENS[4],"105 × 1220 × 85 mm","85 × 1200 × 85 mm"], ["LDB-LNR85150.45.02",45,HIGH_LUMENS[5],"105 × 1520 × 85 mm","85 × 1500 × 85 mm"],
  ["LDB-LNR85240.53.02",53,HIGH_LUMENS[6],"105 × 2420 × 85 mm","85 × 2400 × 85 mm"], ["LDB-LNR85240.72.02",72,HIGH_LUMENS[7],"105 × 2420 × 85 mm","85 × 2400 × 85 mm"],
];

function lnr85Content(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  return {
  ...shared(market, "linner-lnr85", "LINNER LNR85 Series"), metadata: { title: "LINNER LNR85 Series | InfraVolt", description: ua ? "Каталожне восьмимодельне сімейство накладного архітектурного лінійного освітлення LNR85 з опаловим розсіювачем." : "Catalogue-verified eight-model LNR85 surface-mounted opal architectural linear lighting family." },
  hero: { eyebrow: ua ? "Накладний опаловий" : "Surface Mounted Opal", category: ua ? "Лінійне та магістральне освітлення" : "Linear & Trunking Lighting", title: "LINNER LNR85 Series", description: ua ? "Ширші накладні опалові лінійні світильники для архітектурного загального освітлення та комерційних інтер'єрів." : "Wider-profile surface-mounted opal linear luminaires for architectural general lighting and commercial interiors.", ...heroActions(ua) },
  heroImage: LNR85_HERO_IMAGE, heroImageAlt: ua ? "Накладний опаловий світильник LINNER LNR85" : "LINNER LNR85 surface-mounted opal luminaire", heroBackgroundImage: LNR85_HERO_BACKGROUND_IMAGE, heroBackgroundImageAlt: ua ? "Комерційний інтер'єр із неперервним лінійним освітленням" : "Commercial interior with continuous linear lighting",
  technicalInformation: [{ icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: field(ua, "power"), value: "14–72 W" }, { label: field(ua, "luminousFlux"), value: "1,610–8,280 lm" }, { label: field(ua, "efficiency"), value: ">115 lm/W" }] }, { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ">80" }, { label: field(ua, "colourTemperature"), value: "3000–6500 K" }, { label: field(ua, "diffuser"), value: ua ? "Опаловий PMMA" : "Opal PMMA" }] }, { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "voltage"), value: "220–240 Vac" }, { label: field(ua, "protection"), value: "IP40" }, { label: field(ua, "operatingTemperature"), value: "−20 to +35 °C" }] }, { icon: "construction", title: cardTitle(ua, "construction"), values: [{ label: field(ua, "housing"), value: ua ? "Порошково-пофарбований пресований алюміній" : "Powder-coated aluminium extrusion" }, { label: field(ua, "configuration"), value: ua ? "Накладний монтаж" : "Surface mounted" }, { label: ua ? "Ширина корпусу" : "Body Width", value: "105 mm" }] }],
  modelsIntroduction: ua ? "Точний восьмимодельний розклад LNR85. Необроблене поле джерела, позначене як стельовий виріз, зберігається без переінтерпретації як вимоги до монтажу." : "Exact eight-model LNR85 schedule. The raw source field labelled as ceiling cut is retained without reinterpreting it as an installation requirement.", models: makeModels(LNR85_ROWS, LINNER_115_BASE), modelsColumns: { ...modelsColumnsBase(ua), dimensions: ua ? "Розміри корпусу" : "Body Dimensions", ceilingCut: ua ? "Каталожне поле стельового вирізу" : "Catalogue Ceiling-Cut Field" }, modelsFilters: filters(market, "Search LNR85 model code", "Пошук за кодом моделі LNR85"),
  technicalAssets: [{ title: ua ? "Фотометричні дані" : "Photometric Data", image: LNR85_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Фотометричні дані LINNER LNR85" : "LINNER LNR85 photometric data" }, { title: ua ? "Технічне креслення" : "Technical Drawing", image: LNR85_TECHNICAL_IMAGE, imageAlt: ua ? "Технічне креслення LINNER LNR85" : "LINNER LNR85 technical drawing" }], dimensionNote: ua ? "Фотометричні та технічні креслення сімейства LNR85." : "LNR85 family photometric and technical drawings.", applications: applications(market), supportCta: { title: ua ? "Плануєте з LNR85?" : "Planning with LNR85?", description: ua ? "Обговоріть довжину моделі, вихід і вимоги накладного проєкту з нашою технічною командою." : "Discuss model length, output and surface-mounted project requirements with our technical team.", action: talkToTeam(ua) },
}; }
export function lnr85ConfigurationsForMarket(market: MarketCode) {
  const ua = market === "ua";
  return [{ id: "surface", label: ua ? "Накладний опаловий" : "Surface Mounted Opal", content: lnr85Content(market) }] as const;
}

const LNR105_SUSPENDED: readonly ModelRow[] = [
  ["LDB-LNR10560.14.02",14,HIGH_LUMENS[0],"105 × 620 × 85 mm"], ["LDB-LNR10560.18.02",18,HIGH_LUMENS[1],"105 × 620 × 85 mm"], ["LDB-LNR10590.20.02",20,HIGH_LUMENS[2],"105 × 920 × 85 mm"], ["LDB-LNR105120.27.02",27,HIGH_LUMENS[3],"105 × 1220 × 85 mm"], ["LDB-LNR105120.36.02",36,HIGH_LUMENS[4],"105 × 1220 × 85 mm"], ["LDB-LNR105150.45.02",45,HIGH_LUMENS[5],"105 × 1520 × 85 mm"], ["LDB-LNR105240.53.02",53,HIGH_LUMENS[6],"105 × 2420 × 85 mm"], ["LDB-LNR105240.72.02",72,HIGH_LUMENS[7],"105 × 2420 × 85 mm"],
];
const LNR105_RECESSED: readonly ModelRow[] = [
  ["LDB-LNR10560.14.01",14,STANDARD_LUMENS[0],"125 × 620 × 80 mm","115 × 610 mm"], ["LDB-LNR10560.18.01",18,STANDARD_LUMENS[1],"125 × 620 × 80 mm","115 × 610 mm"], ["LDB-LNR10590.20.01",20,STANDARD_LUMENS[2],"125 × 920 × 80 mm","115 × 910 mm"], ["LDB-LNR105120.27.01",27,STANDARD_LUMENS[3],"125 × 1220 × 80 mm","115 × 1210 mm"], ["LDB-LNR105120.36.01",36,STANDARD_LUMENS[4],"125 × 1220 × 80 mm","115 × 1210 mm"], ["LDB-LNR105150.45.01",45,STANDARD_LUMENS[5],"125 × 1520 × 80 mm","115 × 1510 mm"], ["LDB-LNR105240.53.01",53,STANDARD_LUMENS[6],"125 × 2420 × 80 mm","115 × 2410 mm"], ["LDB-LNR105240.72.01",72,STANDARD_LUMENS[7],"125 × 2420 × 80 mm","115 × 2410 mm"],
];
const LNR105_CYLINDRICAL: readonly ModelRow[] = [
  ["LDB-LNR10560.14.01",14,STANDARD_LUMENS[0]], ["LDB-LNR10560.18.01",18,STANDARD_LUMENS[1]], ["LDB-LNR10590.20.01",20,STANDARD_LUMENS[2]], ["LDB-LNR105120.27.01",27,STANDARD_LUMENS[3]],
  ["LDB-LNR105120.36.01",36,STANDARD_LUMENS[4]], ["LDB-LNR105150.45.01",45,STANDARD_LUMENS[5]], ["LDB-LNR105240.53.01",53,STANDARD_LUMENS[6]], ["LDB-LNR105240.72.01",72,STANDARD_LUMENS[7]],
];
type Lnr105Configuration = "suspended" | "recessed" | "cylindrical";
function lnr105Content(configuration: Lnr105Configuration, market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const config = {
    suspended: { label: "Rectangular Suspended", labelUa: "Прямокутний підвісний", rows: LNR105_SUSPENDED, base: LINNER_115_BASE, photometric: "linner-lnr105-photometric-data.png", drawing: "linner-lnr105-technical-drawings.png", efficiency: ">115 lm/W", installation: "Suspended · 1.5 m standard kit", installationUa: "Підвісний · стандартний комплект 1,5 м" },
    recessed: { label: "Rectangular Recessed", labelUa: "Прямокутний вбудований", rows: LNR105_RECESSED, base: LINNER_BASE, photometric: "linner-lnr105-photometric-data.png", drawing: "linner-lnr105-technical-drawings.png", efficiency: ">110 lm/W", installation: "Recessed", installationUa: "Вбудований" },
    cylindrical: { label: "Cylindrical Suspended", labelUa: "Циліндричний підвісний", rows: LNR105_CYLINDRICAL, base: LINNER_BASE, photometric: "linner-rectangular-and-cylindrical-photometric-data.png", drawing: "linner-rectangular-and-cylindrical-technical-drawings.png", efficiency: ">110 lm/W", installation: "Cylindrical suspended visual", installationUa: "Циліндричний підвісний варіант" },
  }[configuration];
  const label = ua ? config.labelUa : config.label;
  return {
    ...shared(market, "linner-lnr105", "LINNER LNR105 Series"), metadata: { title: "LINNER LNR105 Series | InfraVolt", description: ua ? "Каталожні конфігурації LNR105: прямокутна підвісна, вбудована та циліндрична підвісна." : "Catalogue-verified rectangular suspended, recessed and cylindrical suspended LNR105 configurations." },
    hero: { eyebrow: label, category: ua ? "Лінійне та магістральне освітлення" : "Linear & Trunking Lighting", title: "LINNER LNR105 Series", description: ua ? "Архітектурне лінійне сімейство з прямокутною підвісною, прямокутною вбудованою та каталожною циліндричною підвісною конфігураціями." : "Architectural linear family with rectangular suspended, rectangular recessed and catalogue-coded cylindrical suspended configurations.", ...heroActions(ua) }, heroImage: LNR105_HERO_IMAGE, heroImageAlt: ua ? "Лінійний світильник LINNER LNR105" : "LINNER LNR105 linear luminaire", heroBackgroundImage: LNR105_HERO_BACKGROUND_IMAGE, heroBackgroundImageAlt: ua ? "Комерційний інтер'єр із неперервним лінійним освітленням" : "Commercial interior with continuous linear lighting",
    technicalInformation: [{ icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: field(ua, "power"), value: "14–72 W" }, { label: field(ua, "luminousFlux"), value: configuration === "suspended" ? "1,610–8,280 lm" : "1,540–7,920 lm" }, { label: field(ua, "efficiency"), value: config.efficiency }] }, { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ">80" }, { label: field(ua, "colourTemperature"), value: "3000–6500 K" }, { label: field(ua, "diffuser"), value: ua ? "Опаловий PMMA" : "Opal PMMA" }] }, { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "voltage"), value: "220–240 Vac" }, { label: field(ua, "protection"), value: "IP40" }, { label: field(ua, "operatingTemperature"), value: "−20 to +35 °C" }] }, { icon: "construction", title: cardTitle(ua, "construction"), values: [{ label: field(ua, "housing"), value: ua ? "Порошково-пофарбований пресований алюміній" : "Powder-coated aluminium extrusion" }, { label: field(ua, "configuration"), value: ua ? config.installationUa : config.installation }, ...(configuration === "cylindrical" ? [{ label: ua ? "Фізичні поля" : "Physical Fields", value: ua ? "Неоднозначні поля пропущено" : "Ambiguous fields omitted" }] : [])] }],
    modelsIntroduction: configuration === "cylindrical" ? (ua ? "Циліндричне каталожне зображення повторно використовує опубліковані коди моделей LNR105 .01. Нові циліндричні коди чи значення діаметра не вводяться." : "The cylindrical catalogue visual reuses published LNR105 .01 model codes. No new cylindrical codes or diameter values are introduced.") : (ua ? `Точний розклад ${label}.` : `Exact ${config.label} schedule.`), models: makeModels(config.rows, config.base), modelsNote: configuration === "recessed" ? (ua ? "Повторювана примітка про підвісний комплект не подається як звичайна вимога до вбудованого монтажу." : "The repeated suspension-kit note is not presented as a normal recessed installation requirement.") : undefined,
    modelsColumns: { ...modelsColumnsBase(ua), dimensions: configuration === "cylindrical" ? undefined : (ua ? "Розміри корпусу" : "Body Dimensions"), ceilingCut: configuration === "recessed" ? (ua ? "Стельовий виріз" : "Ceiling Cut") : undefined }, modelsFilters: filters(market, "Search LNR105 model code", "Пошук за кодом моделі LNR105"),
    technicalAssets: [{ title: ua ? "Фотометричні дані" : "Photometric Data", image: `${ASSET_BASE}/lnr105/${config.photometric}`, imageAlt: ua ? `Каталожні фотометричні дані ${label}` : `${config.label} catalogue photometric data` }, { title: ua ? "Технічне креслення" : "Technical Drawing", image: `${ASSET_BASE}/lnr105/${config.drawing}`, imageAlt: ua ? `Каталожні технічні креслення ${label}` : `${config.label} catalogue technical drawings` }], dimensionNote: ua ? "Технічні панелі, специфічні для конфігурації; неоднозначні циліндричні розміри не перетворюються на структуровані значення." : "Configuration-aware catalogue technical panels; ambiguous cylindrical dimensions are not converted into structured values.", applications: applications(market), supportCta: { title: ua ? "Обираєте конфігурацію LNR105?" : "Selecting an LNR105 Configuration?", description: ua ? "Обговоріть прямокутну чи циліндричну форму та спосіб монтажу з нашою технічною командою." : "Discuss the rectangular or cylindrical form and mounting arrangement with our technical team.", action: talkToTeam(ua) },
  };
}
export function lnr105ConfigurationsForMarket(market: MarketCode) {
  const ua = market === "ua";
  return [{ id: "suspended", label: ua ? "Прямокутний підвісний" : "Rectangular Suspended", content: lnr105Content("suspended", market) }, { id: "recessed", label: ua ? "Прямокутний вбудований" : "Rectangular Recessed", content: lnr105Content("recessed", market) }, { id: "cylindrical", label: ua ? "Циліндричний підвісний" : "Cylindrical Suspended", content: lnr105Content("cylindrical", market) }] as const;
}

const LNR33D_RECESSED_OPAL: readonly ModelRow[] = [
  ["LDB-LNR33D60.14.02",14,STANDARD_LUMENS[0],"53 × 620 × 100 mm","43 × 610 mm"], ["LDB-LNR33D60.18.02",18,STANDARD_LUMENS[1],"53 × 620 × 100 mm","43 × 610 mm"], ["LDB-LNR33D90.20.02",20,STANDARD_LUMENS[2],"53 × 920 × 100 mm","43 × 910 mm"], ["LDB-LNR33D120.27.02",27,STANDARD_LUMENS[3],"53 × 1220 × 100 mm","43 × 1210 mm"], ["LDB-LNR33D120.36.02",36,STANDARD_LUMENS[4],"53 × 1220 × 100 mm","43 × 1210 mm"], ["LDB-LNR33D150.45.02",45,STANDARD_LUMENS[5],"53 × 1520 × 100 mm","43 × 1510 mm"], ["LDB-LNR33D240.53.02",53,STANDARD_LUMENS[6],"53 × 2420 × 100 mm","43 × 2410 mm"], ["LDB-LNR33D240.72.02",72,STANDARD_LUMENS[7],"53 × 2420 × 100 mm","43 × 2410 mm"],
];
const LNR33D_RECESSED_LOUVERED: readonly ModelRow[] = [
  ["LDB-LNR33D60.14.02",14,STANDARD_LUMENS[0],"53 × 620 × 100 mm","33 × 600 × 100 mm"], ["LDB-LNR33D60.18.02",18,STANDARD_LUMENS[1],"53 × 620 × 100 mm","33 × 600 × 100 mm"],
  ["LDB-LNR33D90.20.02",20,STANDARD_LUMENS[2],"53 × 920 × 100 mm","33 × 900 × 100 mm"], ["LDB-LNR33D120.27.02",27,STANDARD_LUMENS[3],"53 × 1220 × 100 mm","33 × 1200 × 100 mm"],
  ["LDB-LNR33D120.36.02",36,STANDARD_LUMENS[4],"53 × 1220 × 100 mm","33 × 1200 × 100 mm"], ["LDB-LNR33D150.45.02",45,STANDARD_LUMENS[5],"53 × 1520 × 100 mm","33 × 1500 × 100 mm"],
  ["LDB-LNR33D240.53.02",53,STANDARD_LUMENS[6],"53 × 2420 × 100 mm","33 × 2400 × 100 mm"], ["LDB-LNR33D240.72.02",72,STANDARD_LUMENS[7],"53 × 2420 × 100 mm","33 × 2400 × 100 mm"],
];
const LNR33D_SURFACE_LOUVERED: readonly ModelRow[] = [
  ["LDB-LNR33D60.14.01",14,STANDARD_LUMENS[0],"43 × 610 mm"], ["LDB-LNR33D60.18.01",18,STANDARD_LUMENS[1],"43 × 610 mm"], ["LDB-LNR33D90.20.01",20,STANDARD_LUMENS[2],"43 × 910 mm"], ["LDB-LNR33D120.27.01",27,STANDARD_LUMENS[3],"43 × 1210 mm"], ["LDB-LNR33120.36.01",36,STANDARD_LUMENS[4],"43 × 1210 mm"], ["LDB-LNR33D150.45.01",45,STANDARD_LUMENS[5],"43 × 1510 mm"], ["LDB-LNR33D240.53.01",53,STANDARD_LUMENS[6],"43 × 2410 mm"], ["LDB-LNR33D240.72.01",72,STANDARD_LUMENS[7],"43 × 2410 mm"],
];
type Lnr33dConfiguration = "recessed-opal" | "recessed-louvered" | "surface-louvered";
function lnr33dContent(configuration: Lnr33dConfiguration, market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const config = { "recessed-opal": { label: "Recessed Opal", labelUa: "Вбудований опаловий", rows: LNR33D_RECESSED_OPAL, optical: "Opal PMMA · optional prismatic / microprismatic", opticalUa: "Опаловий PMMA · опційно призматичний / мікропризматичний" }, "recessed-louvered": { label: "Recessed Louvered", labelUa: "Вбудований реєчний", rows: LNR33D_RECESSED_LOUVERED, optical: "Louvered optical module", opticalUa: "Реєчний оптичний модуль" }, "surface-louvered": { label: "Surface Mounted Louvered", labelUa: "Накладний реєчний", rows: LNR33D_SURFACE_LOUVERED, optical: "Louvered optical module", opticalUa: "Реєчний оптичний модуль" } }[configuration];
  const label = ua ? config.labelUa : config.label;
  return {
    ...shared(market, "linner-lnr33d", "LINNER LNR33D Series"), metadata: { title: "LINNER LNR33D Series | InfraVolt", description: ua ? "Каталожні вбудовані опалові, вбудовані реєчні та накладні реєчні світильники LNR33D." : "Catalogue-verified recessed opal, recessed louvered and surface-mounted louvered LNR33D luminaires." }, hero: { eyebrow: label, category: ua ? "Лінійне та магістральне освітлення" : "Linear & Trunking Lighting", title: "LINNER LNR33D Series", description: ua ? "Архітектурне лінійне сімейство з вбудованою опаловою, вбудованою реєчною та накладною реєчною конфігураціями." : "Architectural linear family with recessed opal, recessed louvered and surface-mounted louvered configurations.", ...heroActions(ua) }, heroImage: LNR33D_HERO_IMAGE, heroImageAlt: ua ? "Лінійний світильник LINNER LNR33D" : "LINNER LNR33D linear luminaire", heroBackgroundImage: LNR33D_HERO_BACKGROUND_IMAGE, heroBackgroundImageAlt: ua ? "Комерційний інтер'єр із неперервним лінійним освітленням" : "Commercial interior with continuous linear lighting",
    technicalInformation: [{ icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: field(ua, "power"), value: "14–72 W" }, { label: field(ua, "luminousFlux"), value: "1,540–7,920 lm" }, { label: field(ua, "efficiency"), value: ">110 lm/W" }] }, { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ">80" }, { label: field(ua, "colourTemperature"), value: "3000–6500 K" }, { label: ua ? "Оптична конфігурація" : "Optical Configuration", value: ua ? config.opticalUa : config.optical }] }, { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "voltage"), value: "220–240 Vac" }, { label: field(ua, "protection"), value: "IP40" }, { label: field(ua, "operatingTemperature"), value: "−20 to +35 °C" }] }, { icon: "construction", title: cardTitle(ua, "construction"), values: [{ label: field(ua, "housing"), value: ua ? "Порошково-пофарбований пресований алюміній" : "Powder-coated aluminium extrusion" }, { label: field(ua, "configuration"), value: label }, ...(configuration.includes("louvered") ? [{ label: ua ? "Розподіл" : "Distribution", value: ua ? "Контрольований розподіл світла та зоровий комфорт" : "Controlled light distribution and visual comfort" }] : [])] }],
    modelsIntroduction: ua ? "Точний розклад для конкретної конфігурації; числове значення засліплення не присвоюється." : "Exact configuration-specific schedule; no numerical glare value is assigned.", models: makeModels(config.rows, LINNER_BASE), modelsNote: configuration === "surface-louvered" ? (ua ? "Вихідний код 36 Вт зберігається точно як LDB-LNR33120.36.01." : "The 36 W source code is retained exactly as LDB-LNR33120.36.01.") : undefined, modelsColumns: { ...modelsColumnsBase(ua), dimensions: ua ? "Розміри корпусу" : "Body Dimensions", ceilingCut: configuration.startsWith("recessed") ? (ua ? "Стельовий виріз" : "Ceiling Cut") : undefined }, modelsFilters: filters(market, "Search LNR33D model code", "Пошук за кодом моделі LNR33D"),
    technicalAssets: [{ title: ua ? "Фотометричні дані" : "Photometric Data", image: LNR33D_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Фотометричні дані LINNER LNR33D" : "LINNER LNR33D photometric data" }, { title: ua ? "Технічне креслення" : "Technical Drawing", image: LNR33D_TECHNICAL_IMAGE, imageAlt: ua ? "Технічне креслення LINNER LNR33D" : "LINNER LNR33D technical drawing" }], dimensionNote: ua ? "Фотометричні та технічні креслення спільні для сімейства LNR33D." : "Photometric and technical drawings shown are shared across the LNR33D family.", applications: applications(market), supportCta: { title: ua ? "Потрібна оптична конфігурація LNR33D?" : "Need an LNR33D Optical Configuration?", description: ua ? "Обговоріть опалову чи реєчну оптику та вбудований чи накладний монтаж з нашою технічною командою." : "Discuss opal or louvered optics and recessed or surface mounting with our technical team.", action: talkToTeam(ua) },
  };
}
export function lnr33dConfigurationsForMarket(market: MarketCode) {
  const ua = market === "ua";
  return [{ id: "recessed-opal", label: ua ? "Вбудований опаловий" : "Recessed Opal", content: lnr33dContent("recessed-opal", market) }, { id: "recessed-louvered", label: ua ? "Вбудований реєчний" : "Recessed Louvered", content: lnr33dContent("recessed-louvered", market) }, { id: "surface-louvered", label: ua ? "Накладний реєчний" : "Surface Mounted Louvered", content: lnr33dContent("surface-louvered", market) }] as const;
}

const LW_BASE: ModelBase = { voltage: "220–240 Vac", frequency: "50–60 Hz", operatingTemperature: "−20 to +35 °C", efficiencyLmW: ">110 lm/W", cri: ">80", colourTemperature: "3000–6500 K", ip: "IP20 / IP40" };
const LW55_STANDARD: readonly ModelRow[] = [["LDB-LW55.15.02",15,"1,650 lm","55 × 600 × 80 mm"],["LDB-LW55.20.02",20,"2,200 lm","55 × 900 × 80 mm"],["LDB-LW55.27.02",27,"2,970 lm","55 × 1200 × 80 mm"],["LDB-LW55.34.02",34,"3,740 lm","55 × 1500 × 88 mm"]];
const LW55_DI: readonly ModelRow[] = [["LDB-LW55.13/15.02",15,"3,080 lm total","55 × 600 × 80 mm",undefined,"15 W direct / 13 W indirect"],["LDB-LW55.20/20.02",20,"4,400 lm total","55 × 900 × 80 mm",undefined,"20 W direct / 20 W indirect"],["LDB-LW55.26/27.02",27,"5,830 lm total","55 × 1200 × 80 mm",undefined,"27 W direct / 26 W indirect"],["LDB-LW55.32/34.02",34,"7,260 lm total","55 × 1500 × 80 mm",undefined,"34 W direct / 32 W indirect"]];
const LW280: readonly ModelRow[] = [["LDB-LW280.15.02",15,"1,650 lm","80 × 600 × 80 mm"],["LDB-LW280.20.02",20,"2,200 lm","80 × 900 × 80 mm"],["LDB-LW280.27.02",27,"2,970 lm","80 × 1200 × 80 mm"],["LDB-LW280.34.02",34,"3,740 lm","80 × 1500 × 80 mm"]];
const WP80_STANDARD: readonly ModelRow[] = [["LDB-WP80.16.02",16,"1,760 lm","300 × 200 × 80 mm"],["LDB-WP80.34.02",34,"3,740 lm","600 × 200 × 80 mm"]];
const WP80_DI: readonly ModelRow[] = [["LDB-WP80.10/16.02",16,"2,860 lm total","300 × 200 × 80 mm",undefined,"16 W direct / 10 W indirect"],["LDB-WP80.16/34.02",34,"5,500 lm total","600 × 200 × 80 mm",undefined,"34 W direct / 16 W indirect"]];
type LwConfiguration = "lw55-standard" | "lw55-di" | "lw280" | "wp80-standard" | "wp80-di";
function lwContent(configuration: LwConfiguration, market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const config = { "lw55-standard": { label: "LW55 Standard", labelUa: "LW55 стандарт", rows: LW55_STANDARD }, "lw55-di": { label: "LW55 Direct / Indirect", labelUa: "LW55 пряме / непряме", rows: LW55_DI }, lw280: { label: "LW280", labelUa: "LW280", rows: LW280 }, "wp80-standard": { label: "WP80 Standard", labelUa: "WP80 стандарт", rows: WP80_STANDARD }, "wp80-di": { label: "WP80 Direct / Indirect", labelUa: "WP80 пряме / непряме", rows: WP80_DI } }[configuration];
  const label = ua ? config.labelUa : config.label;
  const direct = configuration.endsWith("di");
  return {
    ...shared(market, "lw-wp-architectural-linear", "LW & WP Architectural Linear Luminaires"),
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Порошково-фарбований алюмінієвий профіль" : "Powder-coated aluminium extrusion" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP20 / IP40" },
      warrantyItem(ua, 5),
    ],
    metadata: { title: "LW & WP Architectural Linear Luminaires | InfraVolt", description: ua ? "Каталожні архітектурні світильники LW55, LW280 та WP80 із стандартними та прямими/непрямими варіантами." : "Catalogue-verified LW55, LW280 and WP80 architectural luminaires with standard and direct/indirect variants." }, hero: { eyebrow: label, category: ua ? "Лінійне та магістральне освітлення" : "Linear & Trunking Lighting", title: "LW & WP Architectural Linear Luminaires", description: ua ? "Архітектурні лінійні світильники форм LW55, LW280 та WP80, включно зі стандартними та прямими/непрямими конфігураціями, де це наведено в каталозі." : "Architectural linear luminaires spanning LW55, LW280 and WP80 forms, including standard and direct/indirect configurations where catalogued.", ...heroActions(ua) }, heroImage: LW_WP_HERO_IMAGE, heroImageAlt: ua ? "Архітектурний лінійний світильник LW та WP" : "LW & WP architectural linear luminaire", heroBackgroundImage: LW_WP_HERO_BACKGROUND_IMAGE, heroBackgroundImageAlt: ua ? "Комерційний інтер'єр із неперервним лінійним освітленням" : "Commercial interior with continuous linear lighting",
    technicalInformation: [{ icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: direct ? (ua ? "Пряма / непряма потужність" : "Direct / Indirect Power") : field(ua, "power"), value: direct ? (ua ? "Специфічно для конфігурації" : "Configuration-specific") : `${Math.min(...config.rows.map((row) => row[1]))}–${Math.max(...config.rows.map((row) => row[1]))} W` }, { label: field(ua, "efficiency"), value: ">110 lm/W" }, { label: ua ? "Каталожні моделі" : "Catalogue Models", value: String(config.rows.length) }] }, { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: ">80" }, { label: field(ua, "colourTemperature"), value: "3000–6500 K" }, { label: field(ua, "diffuser"), value: ua ? "Опаловий PMMA" : "Opal PMMA" }] }, { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "voltageFrequency"), value: "220–240 Vac · 50–60 Hz" }, { label: field(ua, "protection"), value: "IP20 / IP40" }, { label: field(ua, "operatingTemperature"), value: "−20 to +35 °C" }] }, { icon: "construction", title: cardTitle(ua, "construction"), values: [{ label: field(ua, "housing"), value: ua ? "Порошково-пофарбований пресований алюміній" : "Powder-coated aluminium extrusion" }, { label: field(ua, "configuration"), value: label }, { label: ua ? "Підвіс" : "Suspension", value: ua ? "Стандартний комплект 1,5 м" : "1.5 m standard kit" }] }],
    modelsIntroduction: ua ? `Точний розклад ${label}. ${direct ? "Пряма й непряма потужність та коди з косою рискою зберігаються." : "Опубліковані розміри залишаються незмінними."}` : `Exact ${config.label} schedule. ${direct ? "Direct and indirect powers and slash-formatted codes are preserved." : "Published dimensions remain unchanged."}`, models: makeModels(config.rows, LW_BASE), modelsNote: configuration === "lw55-standard" ? (ua ? "LDB-LW55.34.02 зберігає опубліковані розміри 55 × 1500 × 88 мм." : "LDB-LW55.34.02 retains the published 55 × 1500 × 88 mm dimension.") : undefined, modelsColumns: { ...modelsColumnsBase(ua), power: direct ? (ua ? "Пряма / непряма потужність" : "Direct / Indirect Power") : modelsColumnsBase(ua).power, luminousFlux: direct ? (ua ? "Загальний світловий потік" : "Total Luminous Flux") : modelsColumnsBase(ua).luminousFlux, frequency: ua ? "Частота" : "Frequency", ip: ua ? "Опублікований IP" : "Published IP" }, modelsFilters: filters(market, `Search ${config.label} model code`, `Пошук за кодом моделі ${label}`),
    familyTechnicalSection: { heading: ua ? "Опції керування, специфічні для серії" : "Series-Specific Control Options", introduction: ua ? "Каталог наводить їх як релевантні опції сімейства, а не одночасне стандартне обладнання для кожної конфігурації." : "The catalogue lists these as relevant family options, not simultaneous standard equipment on every configuration.", settings: [{ label: ua ? "Аналогове димування" : "Analogue Dimming", value: "1–10V", description: ua ? "Доступно там, де вказано для обраної проєктної серії." : "Available where specified for the selected project series." }, { label: ua ? "Цифрове керування" : "Digital Control", value: "DALI · Touch-Dim", description: ua ? "Опції керування, специфічні для серії, що конфігуруються." : "Series-specific configurable control options." }, { label: ua ? "Бездротове керування" : "Wireless Control", value: "Casambi", description: ua ? "Каталожна проєктна опція." : "Catalogue-listed project option." }], assets: [] },
    technicalAssets: [{ title: ua ? "Фотометричні дані" : "Photometric Data", image: LW_WP_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Фотометричні дані архітектурних лінійних світильників LW та WP" : "LW & WP architectural linear photometric data" }, { title: ua ? "Технічне креслення" : "Technical Drawing", image: LW_WP_TECHNICAL_IMAGE, imageAlt: ua ? "Технічне креслення архітектурних лінійних світильників LW та WP" : "LW & WP architectural linear technical drawing" }], dimensionNote: ua ? "Фотометричні та технічні креслення спільні для сімейства LW та WP." : "Photometric and technical drawings shown are shared across the LW & WP family.", applications: applications(market), supportCta: { title: ua ? "Плануєте архітектурну лінійну схему?" : "Planning an Architectural Linear Scheme?", description: ua ? "Обговоріть форму LW55, LW280 чи WP80 та релевантні опції керування з нашою технічною командою." : "Discuss the LW55, LW280 or WP80 form and relevant control options with our technical team.", action: talkToTeam(ua) },
  };
}
export function lwConfigurationsForMarket(market: MarketCode) {
  const ua = market === "ua";
  return [{ id: "lw55-standard", label: ua ? "LW55 стандарт" : "LW55 Standard", content: lwContent("lw55-standard", market) }, { id: "lw55-di", label: ua ? "LW55 пряме / непряме" : "LW55 Direct / Indirect", content: lwContent("lw55-di", market) }, { id: "lw280", label: "LW280", content: lwContent("lw280", market) }, { id: "wp80-standard", label: ua ? "WP80 стандарт" : "WP80 Standard", content: lwContent("wp80-standard", market) }, { id: "wp80-di", label: ua ? "WP80 пряме / непряме" : "WP80 Direct / Indirect", content: lwContent("wp80-di", market) }] as const;
}

const MULTILINE_BASE: ModelBase = { voltage: "220–240 Vac", frequency: "50–60 Hz", operatingTemperature: "−20 to +35 °C", cri: "80+", ip: "IP54" };
const MULTILINE_F: readonly ModelRow[] = [["LDB-MLT45-15",15,"1,800 lm","60 × 600 × 45 mm"],["LDB-MLT45-22",22,"2,640 lm","60 × 900 × 45 mm"],["LDB-MLT45-27",27,"3,240 lm","60 × 1200 × 45 mm"],["LDB-MLT45-33",33,"3,960 lm","60 × 1500 × 45 mm"],["LDB-MLT45-24",24,"2,880 lm","60 × 600 × 45 mm"],["LDB-MLT45-35",35,"4,200 lm","60 × 900 × 45 mm"],["LDB-MLT45-48",48,"5,760 lm","60 × 1200 × 45 mm"],["LDB-MLT45-61",61,"7,320 lm","60 × 1500 × 45 mm"]];
const MULTILINE_L: readonly ModelRow[] = [["LDB-MLT45-15",15,"2,025 lm","48 × 600 × 45 mm"],["LDB-MLT45-22",22,"2,700 lm","48 × 900 × 45 mm"],["LDB-MLT45-27",27,"3,645 lm","48 × 1200 × 45 mm"],["LDB-MLT45-33",33,"4,590 lm","48 × 1500 × 45 mm"],["LDB-MLT45-24",24,"3,240 lm","48 × 600 × 45 mm"],["LDB-MLT45-35",35,"4,995 lm","48 × 900 × 45 mm"],["LDB-MLT45-48",48,"6,480 lm","48 × 1200 × 45 mm"],["LDB-MLT45-61",61,"8,505 lm","48 × 1500 × 45 mm"]];
function multilineContent(lConfiguration: boolean, market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const label = lConfiguration ? "MULTILINE 45 L" : "MULTILINE 45 F";
  const efficiency = lConfiguration ? "135+ lm/W" : "120+ lm/W";
  const models = makeModels(lConfiguration ? MULTILINE_L : MULTILINE_F, { ...MULTILINE_BASE, efficiencyLmW: efficiency });
  return {
    ...shared(market, "multiline-45", "MULTILINE 45 Continuous Trunking Lighting System"),
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Порошково-фарбований алюмінієвий профіль" : "Powder-coated aluminium extrusion" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP54" },
      warrantyItem(ua),
    ],
    metadata: { title: "MULTILINE 45 Continuous Trunking Lighting System | InfraVolt", description: ua ? "Каталожні конфігурації системи неперервного ряду MULTILINE 45 F та L." : "Catalogue-verified MULTILINE 45 F and L continuous-row lighting system configurations." }, hero: { eyebrow: label, category: ua ? "Лінійне та магістральне освітлення" : "Linear & Trunking Lighting", title: "MULTILINE 45 Continuous Trunking Lighting System", description: ua ? "Система освітлення неперервного ряду на основі пресованого алюмінієвого корпусу та високоефективного опалового PC розсіювача, доступна в конфігураціях F та L для комерційних і неперервних освітлювальних застосувань." : "Continuous-row lighting system based on an aluminium extrusion body and high-efficiency PC opal diffuser, available in F and L configurations for commercial and continuous-lighting applications.", ...heroActions(ua) }, heroImage: MULTILINE_HERO_IMAGE, heroImageAlt: ua ? "Світильник неперервної системи MULTILINE 45" : "MULTILINE 45 continuous trunking luminaire", heroBackgroundImage: MULTILINE_HERO_BACKGROUND_IMAGE, heroBackgroundImageAlt: ua ? "Комерційний інтер'єр із неперервним лінійним освітленням" : "Commercial interior with continuous linear lighting",
    technicalInformation: [{ icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: field(ua, "power"), value: "15–61 W" }, { label: field(ua, "luminousFlux"), value: lConfiguration ? "2,025–8,505 lm" : "1,800–7,320 lm" }, { label: field(ua, "efficiency"), value: efficiency }] }, { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: "80+" }, { label: "LED", value: ua ? "Mid Power LED" : "Mid Power LED" }, { label: field(ua, "diffuser"), value: ua ? "Високоефективний опаловий PC" : "High-efficiency PC opal" }] }, { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "voltageFrequency"), value: "220–240 Vac · 50–60 Hz" }, { label: field(ua, "protection"), value: "IP54" }, { label: field(ua, "operatingTemperature"), value: "−20 to +35 °C" }] }, { icon: "construction", title: cardTitle(ua, "construction-configuration"), values: [{ label: field(ua, "housing"), value: ua ? "Порошково-пофарбований пресований алюміній" : "Powder-coated aluminium extrusion" }, { label: field(ua, "configuration"), value: label }, { label: ua ? "Ширина / висота корпусу" : "Body Width / Height", value: `${lConfiguration ? "48" : "60"} / 45 mm` }] }],
    modelsIntroduction: ua ? `Точний розклад ${label}. Повторно використані коди замовлення залишаються специфічними для конфігурації і не дедуплікуються між F та L.` : `Exact ${label} schedule. Reused order codes remain configuration-specific and are not deduplicated across F and L.`, models, modelsColumns: { ...modelsColumnsBase(ua), frequency: ua ? "Частота" : "Frequency" }, modelsFilters: filters(market, "Search MULTILINE 45 model code", "Пошук за кодом моделі MULTILINE 45"),
    familyTechnicalSection: { heading: ua ? "Система неперервного ряду" : "Continuous Trunking System", introduction: ua ? "Каталожна діаграма демонструє модульну концепцію неперервного ряду з окремими конфігураціями F та L." : "The catalogue diagram presents a modular continuous-row concept with distinct F and L configurations.", settings: [{ label: ua ? "Неперервний ряд" : "Continuous Row", value: ua ? "Модульний лінійний монтаж" : "Modular linear installation", description: ua ? "Секції світильника утворюють скоординований неперервний ряд освітлення." : "Luminaire sections form a coordinated continuous-lighting arrangement." }, { label: ua ? "Конфігурації" : "Configurations", value: "MULTILINE 45 F · MULTILINE 45 L", description: ua ? "Окремі ширини корпусу, розклади виходу та значення ефективності зберігаються." : "Separate body widths, output schedules and efficacy values are retained." }], assets: [{ title: ua ? "Схема системи" : "System Diagram", image: MULTILINE_SYSTEM_DIAGRAM_IMAGE, imageAlt: ua ? "Схема неперервної системи MULTILINE 45" : "MULTILINE 45 continuous trunking system diagram" }] },
    technicalAssets: [{ title: ua ? "Фотометричні дані" : "Photometric Data", image: MULTILINE_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Фотометричні дані MULTILINE 45" : "MULTILINE 45 photometric data" }, { title: ua ? "Технічне креслення" : "Technical Drawing", image: MULTILINE_TECHNICAL_IMAGE, imageAlt: ua ? "Технічне креслення MULTILINE 45" : "MULTILINE 45 technical drawing" }], dimensionNote: ua ? "Структуровані дані моделей замінюють знімок екрана каталожної технічної таблиці." : "Structured model data replaces the catalogue technical-table screenshot.", applications: [{ icon: "retail", title: ua ? "Роздрібна торгівля та супермаркети" : "Retail & Supermarkets", description: ua ? "Освітлення неперервного ряду для рядів роздрібної торгівлі та супермаркетів." : "Continuous-row lighting for retail and supermarket aisles.", image: `${APPLICATION_IMAGE_BASE}/multiline-45-supermarket-application.webp`, imageAlt: ua ? "Ряди супермаркету, освітлені MULTILINE 45" : "Supermarket aisles illuminated by MULTILINE 45" }, ...applications(market).slice(0, 3), { icon: "shopping-centre", title: ua ? "Комерційні інтер'єри" : "Commercial Interiors", description: ua ? "Неперервне лінійне освітлення для комерційних проєктних інтер'єрів." : "Continuous linear lighting for commercial project interiors.", image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-commercial-interiors.webp`, imageAlt: ua ? "Комерційний інтер'єр, освітлений неперервним лінійним освітленням" : "Commercial interior illuminated by continuous linear lighting" }, { icon: "lighting-control", title: ua ? "Проєктні зони з неперервним рядом" : "Continuous-Row Project Areas", description: ua ? "Проєктні зони, спроєктовані на основі модульної логіки неперервного освітлення." : "Project areas designed around modular continuous-lighting logic.", image: `${APPLICATION_IMAGE_BASE}/continuous-row-project-areas.webp`, imageAlt: ua ? "Проєктна зона з неперервним рядом, освітлена MULTILINE 45" : "Continuous-row project area illuminated by MULTILINE 45" }], supportCta: { title: ua ? "Плануєте систему освітлення неперервного ряду?" : "Planning a Continuous-Row Lighting System?", description: ua ? "Обговоріть конфігурацію F чи L, потрібні довжини та проєктну компоновку з нашою технічною командою." : "Discuss the F or L configuration, required lengths and project layout with our technical team.", action: talkToTeam(ua) },
  };
}
export function multilineConfigurationsForMarket(market: MarketCode) {
  return [{ id: "f", label: "MULTILINE 45 F", content: multilineContent(false, market) }, { id: "l", label: "MULTILINE 45 L", content: multilineContent(true, market) }] as const;
}

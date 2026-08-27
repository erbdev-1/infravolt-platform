import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

export const PANEL_CATEGORY_HREF = "/products/led-systems/panel-lighting";

const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/panel");
const PRODUCT_HERO_BASE = `${CATEGORY_ASSET_BASE}/product`;
const PRODUCT_BACKGROUND_BASE = `${PRODUCT_HERO_BASE}/background`;
const PHOTOMETRIC_BASE = `${CATEGORY_ASSET_BASE}/photometric`;
const TECHNICAL_BASE = `${CATEGORY_ASSET_BASE}/technical`;
const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;

const LED_BUS_PANEL_HERO_IMAGE = `${PRODUCT_HERO_BASE}/led-bus-panel-lighting-hero-product-transparent.webp`;
const LED_BUS_PANEL_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/led-bus-panel-lighting-hero-background.webp`;
const LED_BUS_PANEL_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/led-bus-panel-lighting-photometric-data.webp`;
const LED_BUS_PANEL_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/led-bus-panel-lighting-technical-drawing.webp`;

const DPNL_HERO_IMAGE = `${PRODUCT_HERO_BASE}/dpnl-series-hero-product-transparent.webp`;
const DPNL_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/dpnl-series-hero-background.webp`;
const DPNL_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/dpnl-series-photometric-data.webp`;
const DPNL_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/dpnl-series-technical-drawing.webp`;

const DRPNL_HERO_IMAGE = `${PRODUCT_HERO_BASE}/drpnl-series-hero-product-transparent.webp`;
const DRPNL_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/drpnl-series-hero-background.webp`;
const DRPNL_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/drpnl-series-photometric-data.webp`;
const DRPNL_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/drpnl-series-technical-drawing.webp`;

const HJPNL_HERO_IMAGE = `${PRODUCT_HERO_BASE}/hjpnl-series-hero-product-transparent.webp`;
const HJPNL_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/hjpnl-series-hero-background.webp`;
const HJPNL_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/hjpnl-series-photometric-data.webp`;
const HJPNL_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/hjpnl-series-technical-drawing.webp`;

// IPNL source files are filed under swapped names on disk (the file in
// product/ is the background photo; the file in product/background/ is
// the transparent product cut-out) — referenced here by their actual
// content, not their containing folder.
const IPNL_HERO_IMAGE = `${PRODUCT_BACKGROUND_BASE}/ipnl-series-hero-product-transparent.webp`;
const IPNL_HERO_BACKGROUND_IMAGE = `${PRODUCT_HERO_BASE}/ipnl-series-hero-background.webp`;
const IPNL_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/ipnl-series-photometric-data.webp`;
const IPNL_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/ipnl-series-technical-drawing.webp`;

// PNL family assets are filed on disk under the "pnpl" spelling.
const PNL_HERO_IMAGE = `${PRODUCT_HERO_BASE}/pnpl-series-hero-product-transparent.webp`;
const PNL_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/pnpl-series-hero-background.webp`;
const PNL_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/pnpl-series-photometric-data.webp`;
const PNL_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/pnpl-series-technical-drawing.webp`;

const TWPNL_HERO_IMAGE = `${PRODUCT_HERO_BASE}/twpnl-series-hero-product-transparent.webp`;
const TWPNL_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/twpnl-series-hero-background.webp`;
const TWPNL_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/twpnl-series-photometric-data.webp`;
const TWPNL_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/twpnl-series-technical-drawing.webp`;

const FAMILIES = [
  ["led-bus-panel-lighting-systems", "LED-BUS Panel Lighting Systems", "SA, SU and T panel configurations"],
  ["dpnl-series", "DPNL Series", "Recessed and surface-mounted panel family"],
  ["drpnl-series", "DRPNL Series", "Backlit recessed and surface-mounted panels"],
  ["hjpnl-series", "HJPNL Series", "IP65 / IP54 specialist panel family"],
  ["ipnl-series", "IPNL Series", "Slim square and rectangular panels"],
  ["pnl-series", "PNL Series", "Standard recessed and surface-mounted panels"],
  ["twpnl-series", "TWPNL Series", "Twin-linear recessed and surface-mounted panels"],
] as const;

function siblings(current: string) {
  return FAMILIES.map(([slug, name, subtitle]) => ({ slug, name, subtitle, ...(slug === current ? { isCurrent: true } : { href: `${PANEL_CATEGORY_HREF}/${slug}` }) }));
}

// Single source of truth for Panel Lighting warranty — every family in
// this category publishes the same 5-year term.
function warrantyItem(ua: boolean) {
  return { icon: "warranty" as const, label: ua ? "Гарантія" : "Warranty", value: ua ? "5 років гарантії" : "5-Year Warranty" };
}

function filters(market: MarketCode, name: string): NonNullable<LedSeriesDetailContent["modelsFilters"]> {
  const ua = market === "ua";
  return {
    searchLabel: ua ? "Пошук" : "Search",
    searchPlaceholder: ua ? `Пошук за кодом моделі ${name}` : `Search ${name} model code`,
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
    breadcrumbs: { home: ua ? "Головна" : "Home", products: ua ? "Продукція" : "Products", ledSystems: ua ? "LED-системи" : "LED Systems", category: ua ? "Панельне освітлення" : "Panel Lighting", current: title },
    backToCategoryLabel: ua ? "Назад до панельного освітлення" : "Back to Panel Lighting",
    technicalInformationHeading: ua ? "Технічна інформація" : "Technical Information",
    technicalAssurance: [],
    modelsHeading: ua ? "Моделі та технічний розклад" : "Models & Technical Schedule",
    controlsHeading: ua ? "Керування та системні опції" : "Controls & System Options",
    controlsIntroduction: ua ? "Функції керування є каталожними опціями та обираються відповідно до вимог проєкту." : "Control functions are catalogue options and are selected to suit the project requirement.",
    photometricHeading: ua ? "Фотометричні та технічні дані" : "Photometric & Technical Data",
    applicationsHeading: ua ? "Типові сфери застосування" : "Typical Applications",
    applicationCardsAlways: true,
    siblingFamiliesHeading: ua ? "Інші сімейства панельного освітлення" : "Other Panel Lighting Families",
    siblingViewSeriesLabel: ua ? "Переглянути серію" : "View Series",
    currentFamilyBadgeLabel: ua ? "Поточна серія" : "Current Family",
    siblingFamilies: siblings(slug),
  } as const;
}

function panelApplications(ua: boolean) {
  return [
    { icon: "office", title: ua ? "Офіси та робочі простори" : "Offices & Workspaces", description: ua ? "Загальне панельне освітлення офісів і робочих зон." : "General panel lighting for offices and work areas.", image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-offices-workspaces.webp`, imageAlt: ua ? "Офіс, освітлений LED-панелями" : "Office illuminated by LED panel lighting" },
    { icon: "education", title: ua ? "Освіта" : "Education", description: ua ? "Рівномірне освітлення класів і навчальних просторів." : "Uniform illumination for classrooms and learning spaces.", image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-education.webp`, imageAlt: ua ? "Клас, освітлений LED-панелями" : "Classroom illuminated by LED panel lighting" },
    { icon: "corridor", title: ua ? "Коридори та громадські зони" : "Corridors & Public Areas", description: ua ? "Панельне освітлення для зон циркуляції та спільних громадських інтер'єрів." : "Panel lighting for circulation and shared public interiors.", image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-corridors-public-areas.webp`, imageAlt: ua ? "Коридор, освітлений LED-панелями" : "Corridor illuminated by LED panel lighting" },
    { icon: "retail", title: ua ? "Роздрібні та комерційні інтер'єри" : "Retail & Commercial Interiors", description: ua ? "Загальне освітлення для роздрібних і комерційних просторів." : "General lighting for retail and commercial spaces.", image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-retail-commercial-interiors.webp`, imageAlt: ua ? "Роздрібний інтер'єр, освітлений LED-панелями" : "Retail interior illuminated by LED panel lighting" },
    { icon: "shopping-centre", title: ua ? "Ринки" : "Markets", description: ua ? "Широке панельне освітлення для ринкових приміщень." : "Broad panel illumination for market interiors.", image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-markets.webp`, imageAlt: ua ? "Ринкове приміщення, освітлене LED-панелями" : "Market interior illuminated by LED panel lighting" },
  ] as const;
}

type Row = readonly [string, number, string, string, string?, string?, string?];
function models(rows: readonly Row[], base: Omit<LedSeriesModel, "model" | "powerW" | "luminousFluxLm" | "dimensions" | "ceilingCut">): readonly LedSeriesModel[] {
  return rows.map(([model, powerW, luminousFluxLm, dimensions, ceilingCut, efficiencyLmW, ip]) => ({
    ...base,
    model,
    powerW,
    luminousFluxLm,
    dimensions,
    ...(ceilingCut ? { ceilingCut } : {}),
    ...(efficiencyLmW ? { efficiencyLmW } : {}),
    ...(ip ? { ip } : {}),
  }));
}

function columns(ua: boolean, ceilingCut = false): NonNullable<LedSeriesDetailContent["modelsColumns"]> {
  return { model: ua ? "Модель / код каталогу" : "Model / Catalogue Code", power: ua ? "Потужність" : "Power", luminousFlux: ua ? "Світловий потік" : "Luminous Flux", voltage: ua ? "Напруга" : "Voltage", operatingTemperature: ua ? "Робоча темп." : "Operating Temp.", efficiency: ua ? "Ефективність" : "Efficiency", cri: "CRI", colourTemperature: "CCT", dimensions: ua ? "Розміри корпусу" : "Body Dimensions", ...(ceilingCut ? { ceilingCut: ua ? "Стельовий виріз" : "Ceiling Cut" } : {}), ip: "IP" };
}

function panelControls(ua: boolean) {
  return [
    { icon: "control-dimmer", label: "1–10 V", secondaryLabel: ua ? "Опційно" : "Optional" },
    { icon: "control-dali", label: "DALI", secondaryLabel: ua ? "Опційно" : "Optional" },
    { icon: "control-touch-dim", label: "Touch-Dim", secondaryLabel: ua ? "Опційно" : "Optional" },
    { icon: "control-casambi", label: "Casambi", secondaryLabel: ua ? "Опційно" : "Optional" },
  ] as const;
}

function talkToTeam(ua: boolean) {
  return ua ? "Звернутися до нашої технічної команди" : "Talk to Our Technical Team";
}

const PANEL_BASE = { voltage: "220–240 Vac", operatingTemperature: "−20 to +35 °C", cri: ">80", colourTemperature: "3000–6500 K" } as const;

export function ledBusPanelContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const rows: readonly Row[] = [
    ["LDB-VKPNL-11", 11, "968 lm", "300 × 300 mm"], ["LDB-VKPNL-19", 19, "2,090 lm", "300 × 300 mm"],
    ["LDB-VKPNL-21", 21, "2,688 lm", "600 × 600 mm"], ["LDB-VKPNL-28", 28, "3,584 lm", "600 × 600 mm"],
    ["LDB-VKPNL-32", 32, "4,096 lm", "600 × 600 mm"], ["LDB-VKPNL-37", 37, "4,736 lm", "600 × 600 mm"],
    ["LDB-VKPNL-75", 75, "8,775 lm", "600 × 1200 mm"],
  ];
  return {
    ...shared(market, "led-bus-panel-lighting-systems", "LED-BUS Panel Lighting Systems"),
    metadata: { title: "LED-BUS Panel Lighting Systems | InfraVolt", description: ua ? "Каталожне сімейство панелей LED-BUS Panel SA, SU та T." : "Catalogue-verified LED-BUS Panel SA, SU and T lighting family." },
    hero: { eyebrow: "Panel SA · Panel SU · Panel T", category: ua ? "Панельне освітлення" : "Panel Lighting", title: "LED-BUS Panel Lighting Systems", description: ua ? "Базове сімейство панелей LED-BUS для вбудованих, накладних і підвісних проєктних конфігурацій." : "Core LED-BUS panel family for recessed, surface-mounted and suspended project configurations.", primaryAction: ua ? "Запросити технічний пакет" : "Request Technical Pack", secondaryAction: ua ? "Завантажити PDF-каталог" : "Download PDF Catalogue" },
    heroImage: LED_BUS_PANEL_HERO_IMAGE, heroImageAlt: ua ? "Світильники LED-BUS Panel SA, SU та T" : "LED-BUS Panel SA, SU and T luminaires", heroBackgroundImage: LED_BUS_PANEL_HERO_BACKGROUND_IMAGE, heroBackgroundImageAlt: ua ? "Сучасний інтер'єр, освітлений LED-панелями" : "Contemporary interior illuminated by LED panels",
    technicalInformation: [
      { icon: "performance", title: ua ? "Продуктивність" : "Performance", values: [{ label: ua ? "Потужність" : "Power", value: "11–75 W" }, { label: ua ? "Світловий потік" : "Luminous Flux", value: "968–8,775 lm" }] },
      { icon: "light-quality", title: ua ? "Якість світла" : "Light Quality", values: [{ label: "CRI", value: "80+" }, { label: ua ? "Колірна температура" : "Colour Temperature", value: "2700–6500 K" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Опаловий PS · опційно PMMA / призматичний" : "PS opal · optional PMMA / prismatic" }] },
      { icon: "protection-electrical", title: ua ? "Захист та електрика" : "Protection & Electrical", values: [{ label: ua ? "Напруга" : "Voltage", value: "220–240 Vac · 50–60 Hz" }, { label: ua ? "Захист" : "Protection", value: "IP40 / IP54" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−20 to +35 °C" }] },
      { icon: "construction", title: ua ? "Конструкція та монтаж" : "Construction & Installation", values: [{ label: ua ? "Корпус" : "Housing", value: ua ? "Порошково-пофарбована виготовлена сталь" : "Powder-coated fabricated steel" }, { label: ua ? "Конфігурації" : "Configurations", value: ua ? "Вбудована · накладна · підвісна" : "Recessed · Surface mounted · Suspended" }] },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Порошково-пофарбована виготовлена сталь" : "Powder-coated fabricated steel" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP40 / IP54" },
      warrantyItem(ua),
    ],
    modelsIntroduction: ua ? "Точний спільний каталожний розклад VKPNL. Повторювані значення люменів у колонці лм/Вт каталогу опущено як технічно ненадійні." : "Exact shared VKPNL catalogue schedule. The catalogue's repeated lumen values in its lm/W column are omitted as technically unreliable.",
    models: models(rows, { voltage: "220–240 Vac", operatingTemperature: "−20 to +35 °C", cri: "80+", colourTemperature: "2700–6500 K", ip: "IP40 / IP54" }),
    modelsColumns: { ...columns(ua), efficiency: undefined }, modelsFilters: filters(market, "LED-BUS Panel"),
    familyTechnicalSection: { heading: ua ? "Конфігурації панелей" : "Panel Configurations", introduction: ua ? "Каталог представляє один спільний технічний розклад VKPNL поряд із трьома формами монтажу." : "The catalogue presents one shared VKPNL model schedule alongside three installation forms.", settings: [
      { label: "Panel SA", value: ua ? "Вбудована" : "Recessed", description: ua ? "Вбудована конструкція панелі зі стельовим отвором." : "Recessed panel construction with a ceiling opening." },
      { label: "Panel SU", value: ua ? "Накладна" : "Surface mounted", description: ua ? "Накладна конструкція панелі." : "Surface-mounted panel construction." },
      { label: "Panel T", value: ua ? "Підвісна" : "Suspended", description: ua ? "Підвісна конструкція панелі зі стандартним підвісним тросом 1500 мм." : "Suspended panel construction with a 1500 mm standard suspension wire." },
    ], assets: [] },
    controlOptions: [{ icon: "control-dimmer", label: "0–10 V", secondaryLabel: ua ? "Опційно" : "Optional" }, { icon: "control-dali", label: "DALI", secondaryLabel: ua ? "Опційно" : "Optional" }],
    technicalAssets: [{ title: ua ? "Фотометричні дані" : "Photometric Data", image: LED_BUS_PANEL_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Фотометричні дані LED-BUS Panel" : "LED-BUS Panel photometric data" }, { title: ua ? "Технічне креслення" : "Technical Drawing", image: LED_BUS_PANEL_TECHNICAL_IMAGE, imageAlt: ua ? "Технічне креслення LED-BUS Panel" : "LED-BUS Panel technical drawing" }], dimensionNote: ua ? "Фотометричні та габаритні креслення спільні для сімейства LED-BUS Panel." : "Photometric and dimensional drawings shown are shared across the LED-BUS Panel family.",
    applications: panelApplications(ua).slice(0, 4),
    supportCta: { title: ua ? "Плануєте проєкт панельного освітлення?" : "Planning a Panel Lighting Project?", description: ua ? "Обговоріть потрібний формат панелі, спосіб монтажу та опцію керування з нашою технічною командою." : "Discuss the required panel format, mounting arrangement and control option with our technical team.", action: talkToTeam(ua) },
  };
}

const DPNL_SA: readonly Row[] = [
  ["LDB-DPNL3030SA.18.01",18,"1,800 lm","300 × 300 × 65 mm","275 × 275 mm",">100 lm/W"], ["LDB-DPNL3060SA.18.01",18,"1,800 lm","300 × 600 × 65 mm","275 × 575 mm",">100 lm/W"],
  ["LDB-DPNL30120SA.38.01",38,"3,800 lm","300 × 1200 × 65 mm","275 × 1175 mm",">100 lm/W"], ["LDB-DPNL6060SA.38.01",38,"3,800 lm","600 × 600 × 65 mm","575 × 575 mm",">100 lm/W"], ["LDB-DPNL60120SA.76.01",76,"7,600 lm","600 × 1200 × 65 mm","575 × 1175 mm",">100 lm/W"],
  ["LDB-DPNL3060SA.17.01",17,"1,955 lm","295 × 595 × 70 mm","275 × 575 mm",">115 lm/W"], ["LDB-DPNL6060SA.32.01",32,"3,680 lm","595 × 595 × 70 mm","575 × 575 mm",">115 lm/W"],
  ["LDB-DPNL30120SA.38.01",38,"4,370 lm","295 × 1195 × 70 mm","275 × 1175 mm",">115 lm/W"], ["LDB-DPNL30120SA.76.01",76,"8,740 lm","295 × 1195 × 70 mm","575 × 1175 mm",">115 lm/W"],
];
const DPNL_SU: readonly Row[] = [
  ["LDB-DPNL3030SU.18.01",18,"1,800 lm","295 × 595 × 65 mm",undefined,">100 lm/W"], ["LDB-DPNL3060SU.18.01",18,"1,800 lm","295 × 595 × 65 mm",undefined,">100 lm/W"], ["LDB-DPNL30120SU.38.01",38,"3,800 lm","295 × 1195 × 65 mm",undefined,">100 lm/W"], ["LDB-DPNL6060SU.38.01",38,"3,800 lm","595 × 595 × 65 mm",undefined,">100 lm/W"], ["LDB-DPNL60120SU.76.01",76,"7,600 lm","595 × 1195 × 65 mm",undefined,">100 lm/W"],
  ["LDB-DPNL3060SU.17.01",17,"1,955 lm","300 × 600 × 90 mm",undefined,">115 lm/W"], ["LDB-DPNL6060SU.32.01",32,"3,680 lm","600 × 600 × 90 mm",undefined,">115 lm/W"], ["LDB-DPNL30120SU.38.01",38,"4,370 lm","300 × 1200 × 90 mm",undefined,">115 lm/W"], ["LDB-DPNL30120SU.76.01",76,"8,740 lm","300 × 1200 × 90 mm",undefined,">115 lm/W"],
];

function standardContent(market: MarketCode, args: { slug: string; title: string; label: string; description: string; descriptionUa?: string; heroImage: string; heroBackgroundImage: string; imageAlt: string; rows: readonly Row[]; power: string; flux: string; efficiency: string; ip: string; installation: string; installationUa?: string; technicalImage: string; photometricImage: string; ceilingCut?: boolean; controls?: boolean; sdcm?: boolean; housing?: string | false; housingUa?: string; diffuser?: string; diffuserUa?: string; applications?: LedSeriesDetailContent["applications"]; applicationImage?: string; familyTechnicalSection?: LedSeriesDetailContent["familyTechnicalSection"]; technicalAssurance?: LedSeriesDetailContent["technicalAssurance"] }): LedSeriesDetailContent {
  const ua = market === "ua";
  const diffuser = ua ? (args.diffuserUa ?? "Опаловий PMMA · опційно призматичний / мікропризматичний") : (args.diffuser ?? "Opal PMMA · optional prismatic / microprismatic");
  const housing = ua ? (args.housingUa ?? "Порошково-пофарбований пресований алюміній") : (args.housing === false ? undefined : (args.housing ?? "Powder-coated aluminium extrusion"));
  return {
    ...shared(market, args.slug, args.title),
    metadata: { title: `${args.title} | InfraVolt`, description: ua ? `Каталожні світильники ${args.label} та технічний розклад.` : `Catalogue-verified ${args.label} panel luminaires and technical schedule.` },
    hero: { eyebrow: args.label, category: ua ? "Панельне освітлення" : "Panel Lighting", title: args.title, description: ua ? (args.descriptionUa ?? args.description) : args.description, primaryAction: ua ? "Запросити технічний пакет" : "Request Technical Pack", secondaryAction: ua ? "Завантажити PDF-каталог" : "Download PDF Catalogue" },
    heroImage: args.heroImage, heroImageAlt: args.imageAlt, heroBackgroundImage: args.heroBackgroundImage, heroBackgroundImageAlt: ua ? "Сучасний інтер'єр, освітлений LED-панелями" : "Contemporary interior illuminated by LED panels",
    technicalInformation: [
      { icon: "performance", title: ua ? "Продуктивність" : "Performance", values: [{ label: ua ? "Потужність" : "Power", value: args.power }, { label: ua ? "Світловий потік" : "Luminous Flux", value: args.flux }, { label: ua ? "Каталожна ефективність" : "Catalogue Efficiency", value: args.efficiency }] },
      { icon: "light-quality", title: ua ? "Якість світла" : "Light Quality", values: [{ label: "CRI", value: ">80" }, { label: ua ? "Колірна температура" : "Colour Temperature", value: "3000–6500 K" }, { label: ua ? "Розсіювач" : "Diffuser", value: diffuser }, ...(args.sdcm ? [{ label: ua ? "Колірна узгодженість" : "Colour Consistency", value: "SDCM ≤ 3" }] : [])] },
      { icon: "protection-electrical", title: ua ? "Захист та електрика" : "Protection & Electrical", values: [{ label: ua ? "Напруга" : "Voltage", value: "220–240 Vac · 50–60 Hz" }, { label: ua ? "Захист" : "Protection", value: args.ip }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−20 to +35 °C" }] },
      { icon: "construction", title: ua ? "Конструкція та монтаж" : "Construction & Installation", values: [
        ...(args.housing === false ? [] : [{ label: ua ? "Корпус" : "Housing", value: housing as string }]),
        { label: ua ? "Розсіювач" : "Diffuser", value: diffuser },
        { label: ua ? "Монтаж" : "Installation", value: ua ? (args.installationUa ?? args.installation) : args.installation },
        { label: ua ? "Джерело світла" : "Light Source", value: "SMD LED" },
      ] },
    ],
    // Colour & Finish reuses the exact same housing value already shown in
    // the Construction & Installation card above (omitted when the family
    // has no stated body material, e.g. DRPNL's housing: false); Compliance
    // reuses the family's own already-verified IP rating. Families with a
    // more specific assurance fact (HJPNL's LED lifetime basis, IPNL's
    // project-RAL note) pass their own technicalAssurance and win instead.
    technicalAssurance: args.technicalAssurance ?? [
      ...(args.housing === false ? [] : [{ icon: "colour-finish" as const, label: ua ? "Колір і покриття" : "Colour & Finish", value: housing as string }]),
      { icon: "compliance" as const, label: ua ? "Відповідність" : "Compliance", value: args.ip },
      warrantyItem(ua),
    ],
    modelsIntroduction: ua ? `Точний каталожний технічний розклад ${args.label}.` : `Exact ${args.label} catalogue model schedule.`, models: models(args.rows, { ...PANEL_BASE, efficiencyLmW: args.efficiency, ip: args.ip }), modelsColumns: columns(ua, args.ceilingCut), modelsFilters: filters(market, args.title.replace(" Series", "")),
    familyTechnicalSection: args.familyTechnicalSection,
    controlOptions: args.controls === false ? [] : panelControls(ua),
    technicalAssets: [{ title: ua ? "Фотометричні дані" : "Photometric Data", image: args.photometricImage, imageAlt: ua ? `Фотометричні дані ${args.title}` : `${args.title} photometric data` }, { title: ua ? "Технічне креслення" : "Technical Drawing", image: args.technicalImage, imageAlt: ua ? `Технічне креслення ${args.title}` : `${args.title} technical drawing` }], dimensionNote: ua ? `Фотометричні та технічні креслення спільні для сімейства ${args.title}.` : `Photometric and technical drawings shown are shared across the ${args.title} family.`,
    applications: args.applications ?? panelApplications(ua), ...(args.applicationImage ? { applicationImage: args.applicationImage, applicationImageAlt: ua ? "Каталожне застосування панельного освітлення" : "Catalogue panel lighting application" } : {}),
    supportCta: { title: ua ? `Обираєте конфігурацію ${args.title}?` : `Selecting a ${args.title} Configuration?`, description: ua ? "Обговоріть спосіб монтажу, вихід і проєктні опції з нашою технічною командою." : "Discuss the mounting arrangement, output and project options with our technical team.", action: talkToTeam(ua) },
  };
}

function dpnlContent(surface: boolean, market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const label = surface ? "DPNL SU Surface Mounted" : "DPNL SA Recessed";
  const base = standardContent(market, { slug: "dpnl-series", title: "DPNL Series", label, description: "Recessed SA and surface-mounted SU panel configurations with catalogue-specific output and body schedules.", descriptionUa: "Вбудовані SA та накладні SU конфігурації панелей із каталожно-специфічним виходом і розкладом корпусів.", heroImage: DPNL_HERO_IMAGE, heroBackgroundImage: DPNL_HERO_BACKGROUND_IMAGE, imageAlt: `${label} panel luminaire`, rows: surface ? DPNL_SU : DPNL_SA, power: "17–76 W", flux: "1,800–8,740 lm", efficiency: ">100 or >115 lm/W by catalogue row", ip: "IP20 / IP54", housing: "Electrostatic powder-coated aluminium injection body", housingUa: "Електростатично порошково-пофарбований литий алюмінієвий корпус", diffuser: "PS / PMMA opal · prismatic / microprismatic options", diffuserUa: "Опаловий PS / PMMA · опції призматичний / мікропризматичний", installation: surface ? "Surface mounted" : "Recessed", installationUa: surface ? "Накладний" : "Вбудований", technicalImage: DPNL_TECHNICAL_IMAGE, photometricImage: DPNL_PHOTOMETRIC_IMAGE, ceilingCut: !surface, applications: [
    ...panelApplications(ua).slice(0, 4), { icon: "airport", title: ua ? "Транспорт і зони очікування" : "Transport & Waiting Areas", description: ua ? "Панельне освітлення для аеропортів і громадських зон очікування." : "Panel lighting for airport and public waiting environments.", image: `${APPLICATION_IMAGE_BASE}/led-panel-airport-waiting-area-application.webp`, imageAlt: ua ? "Зона очікування аеропорту, освітлена вбудованими панелями DPNL" : "Airport waiting area illuminated by recessed DPNL panels" },
  ], sdcm: true, familyTechnicalSection: { heading: ua ? "Проєктні опції" : "Project Options", introduction: ua ? "Каталог DPNL наводить ці функції як опції, а не універсальне стандартне обладнання." : "The DPNL catalogue lists these functions as options rather than universal standard equipment.", settings: [
    { label: ua ? "Регульована колірна температура" : "Tunable White", value: ua ? "Опційно" : "Optional", description: ua ? "Проєктно обрана регульована конфігурація білого світла." : "Project-selected adjustable white-light configuration." },
    { label: ua ? "Датчик" : "Sensor", value: ua ? "Опційно" : "Optional", description: ua ? "Інтеграція датчика, де це вказано для проєкту." : "Sensor integration where specified for the project." },
    { label: ua ? "Аварійний режим" : "Emergency", value: ua ? "Опційно" : "Optional", description: ua ? "Аварійна конфігурація освітлення, де це вказано." : "Emergency-lighting configuration where specified." },
  ], assets: [] }, technicalAssurance: [
    { icon: "compliance", label: ua ? "Основа терміну служби LED" : "LED Lifetime Basis", value: "LM80 / TM21 · 50,000 h" }, { icon: "compliance", label: ua ? "Настанова з освітлення" : "Lighting Guidance", value: "LG7" }, { icon: "compliance", label: ua ? "Внутрішнє освітлення" : "Interior Lighting", value: "EN 12464" },
  ] });
  return { ...base, modelsNote: ua ? "Дані DPNL зведені з окремого каталожного джерела DPNL і суміжного джерела DPNL SU. Окремі опубліковані розклади 17/18 Вт, 32/38 Вт та >100/>115 залишаються окремими." : "DPNL records are consolidated from the dedicated DPNL catalogue source and the adjacent DPNL SU source. Distinct published 17/18 W, 32/38 W and >100/>115 schedules remain separate.", controlOptions: [...panelControls(ua), { icon: "control-sensor", label: ua ? "Датчик" : "Sensor", secondaryLabel: ua ? "Опційно" : "Optional" }, { icon: "control-emergency", label: ua ? "Аварійний режим" : "Emergency", secondaryLabel: ua ? "Опційно" : "Optional" }] };
}

export function dpnlConfigurationsForMarket(market: MarketCode) { return [{ id: "sa", label: "DPNL SA Recessed", content: dpnlContent(false, market) }, { id: "su", label: "DPNL SU Surface Mounted", content: dpnlContent(true, market) }] as const; }

const DRPNL_SA: readonly Row[] = [["LDB-DRPNL7575SA.30.01",30,"3,300 lm","734 × 734 × 117 mm","714 × 714 mm"],["LDB-DRPNL7575SA.40.01",40,"4,400 lm","734 × 734 × 117 mm","714 × 714 mm"]];
const DRPNL_SU: readonly Row[] = [["LDB-DRPNL7575SU.30.01",30,"3,300 lm","734 × 734 × 117 mm"],["LDB-DRPNL7575SU.40.01",40,"4,400 lm","734 × 734 × 117 mm"]];
function drpnlContent(surface: boolean, market: MarketCode) { return standardContent(market, { slug: "drpnl-series", title: "DRPNL Series", label: surface ? "DRPNL SU Surface Mounted" : "DRPNL SA Recessed", description: "Backlit 734 mm panel family in recessed SA and surface-mounted SU configurations.", descriptionUa: "Підсвічене ззаду сімейство панелей 734 мм у вбудованій SA та накладній SU конфігураціях.", heroImage: DRPNL_HERO_IMAGE, heroBackgroundImage: DRPNL_HERO_BACKGROUND_IMAGE, imageAlt: `DRPNL ${surface ? "SU" : "SA"} panel luminaire`, rows: surface ? DRPNL_SU : DRPNL_SA, power: "30 or 40 W", flux: "3,300 or 4,400 lm", efficiency: ">110 lm/W", ip: "IP20 / IP40", housing: false, diffuser: "Opal diffuser · prismatic / microprismatic options", diffuserUa: "Опаловий розсіювач · опції призматичний / мікропризматичний", installation: surface ? "Surface mounted" : "Recessed", installationUa: surface ? "Накладний" : "Вбудований", technicalImage: DRPNL_TECHNICAL_IMAGE, photometricImage: DRPNL_PHOTOMETRIC_IMAGE, ceilingCut: !surface }); }
export function drpnlConfigurationsForMarket(market: MarketCode) { return [{ id: "sa", label: "DRPNL SA Recessed", content: drpnlContent(false, market) }, { id: "su", label: "DRPNL SU Surface Mounted", content: drpnlContent(true, market) }] as const; }

const HJPNL_SA: readonly Row[] = [["LDB-HJPNL6060SA.38.01",38,"3,800 lm","595 × 595 × 82 mm","575 × 575 mm"],["LDB-HJPNL30120SA.38.01",38,"3,800 lm","295 × 1195 × 82 mm","275 × 1175 mm"],["LDB-HJPNL60120SA.76.01",76,"7,600 lm","595 × 1195 × 82 mm","575 × 1175 mm"]];
const HJPNL_SU: readonly Row[] = [["LDB-HJPNL6060SU.38.01",38,"3,800 lm","600 × 600 × 82 mm"],["LDB-HJPNL30120SU.38.01",38,"3,800 lm","300 × 1200 × 82 mm"],["LDB-HJPNL60120SU.76.01",76,"7,600 lm","600 × 1200 × 82 mm"]];
function hjpnlContent(surface: boolean, market: MarketCode) { const ua = market === "ua"; return standardContent(market, { slug: "hjpnl-series", title: "HJPNL Series", label: surface ? "HJPNL SU Surface Mounted" : "HJPNL SA Recessed", description: "Specialist IP65 / IP54 panel family with recessed and surface-mounted configurations.", descriptionUa: "Спеціалізоване сімейство панелей IP65 / IP54 у вбудованій та накладній конфігураціях.", heroImage: HJPNL_HERO_IMAGE, heroBackgroundImage: HJPNL_HERO_BACKGROUND_IMAGE, imageAlt: `HJPNL ${surface ? "SU" : "SA"} panel luminaire`, rows: surface ? HJPNL_SU : HJPNL_SA, power: "38–76 W", flux: "3,800–7,600 lm", efficiency: ">110 lm/W", ip: "IP65 / IP54", installation: surface ? "Surface mounted" : "Recessed", installationUa: surface ? "Накладний" : "Вбудований", technicalImage: HJPNL_TECHNICAL_IMAGE, photometricImage: HJPNL_PHOTOMETRIC_IMAGE, ceilingCut: !surface, sdcm: true, technicalAssurance: [{ icon: "compliance", label: ua ? "Основа терміну служби LED" : "LED Lifetime Basis", value: "LM80 / TM21 · 50,000 h" }, warrantyItem(ua)] }); }
export function hjpnlConfigurationsForMarket(market: MarketCode) { return [{ id: "sa", label: "HJPNL SA Recessed", content: hjpnlContent(false, market) }, { id: "su", label: "HJPNL SU Surface Mounted", content: hjpnlContent(true, market) }] as const; }

const IPNL_SA: readonly Row[] = [["LDB-IPNL3060SA.17.01",17,"1,700 lm","295 × 595 × 70 mm","275 × 575 mm"],["LDB-IPNL6060SA.32.01",32,"3,200 lm","595 × 595 × 70 mm","575 × 575 mm"],["LDB-IPNL30120SA.35.01",35,"3,500 lm","295 × 1195 × 70 mm","275 × 1175 mm"],["LDB-IPNL30120SA.70.01",70,"7,000 lm","295 × 1195 × 70 mm","275 × 1175 mm"]];
const IPNL_SU: readonly Row[] = [["LDB-IPNL3060SU.17.01",17,"1,700 lm","300 × 600 × 90 mm"],["LDB-IPNL6060SU.32.01",32,"3,200 lm","600 × 600 × 90 mm"],["LDB-IPNL30120SU.35.01",35,"3,500 lm","300 × 1200 × 90 mm"],["LDB-IPNL30120SU.70.01",70,"7,000 lm","300 × 1200 × 90 mm"]];
function ipnlContent(surface: boolean, market: MarketCode): LedSeriesDetailContent { const ua = market === "ua"; const result = standardContent(market, { slug: "ipnl-series", title: "IPNL Series", label: surface ? "IPNL SU Surface Mounted" : "IPNL SA Recessed", description: "Slim square and rectangular panel family for general project lighting.", descriptionUa: "Тонке сімейство квадратних і прямокутних панелей для загального проєктного освітлення.", heroImage: IPNL_HERO_IMAGE, heroBackgroundImage: IPNL_HERO_BACKGROUND_IMAGE, imageAlt: `IPNL ${surface ? "SU" : "SA"} panel luminaire`, rows: surface ? IPNL_SU : IPNL_SA, power: "17–70 W", flux: "1,700–7,000 lm", efficiency: surface ? ">100 lm/W" : ">110 lm/W", ip: "IP20 / IP54", installation: surface ? "Surface mounted" : "Recessed", installationUa: surface ? "Накладний" : "Вбудований", technicalImage: IPNL_TECHNICAL_IMAGE, photometricImage: IPNL_PHOTOMETRIC_IMAGE, ceilingCut: !surface }); return { ...result, technicalAssurance: [{ icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Кольори RAL за проєктною специфікацією" : "RAL colours where specified for the project" }, warrantyItem(ua)] }; }
export function ipnlConfigurationsForMarket(market: MarketCode) { return [{ id: "sa", label: "IPNL SA Recessed", content: ipnlContent(false, market) }, { id: "su", label: "IPNL SU Surface Mounted", content: ipnlContent(true, market) }] as const; }

const PNL_SA: readonly Row[] = [["LDB-PNL3030SA.18.01",18,"2,070 lm","295 × 295 × 65 mm"],["LDB-PNL3060SA.18.01",18,"2,070 lm","295 × 595 × 65 mm"],["LDB-PNL30120SA.38.01",38,"4,370 lm","295 × 1195 × 65 mm"],["LDB-PNL6060SA.38.01",38,"4,370 lm","595 × 595 × 65 mm"],["LDB-PNL60120SA.76.01",76,"8,740 lm","595 × 1195 × 65 mm"]];
const PNL_SU: readonly Row[] = [["LDB-PNL3030SU.18.01",18,"2,070 lm","300 × 300 × 65 mm"],["LDB-PNL3060SU.18.01",18,"2,070 lm","300 × 600 × 65 mm"],["LDB-PNL30120SU.38.01",38,"4,370 lm","300 × 1200 × 65 mm"],["LDB-PNL6060SU.38.01",38,"4,370 lm","600 × 600 × 65 mm"],["LDB-PNL60120SU.76.01",76,"8,740 lm","600 × 1200 × 65 mm"]];
function pnlContent(surface: boolean, market: MarketCode) { const ua = market === "ua"; const result = standardContent(market, { slug: "pnl-series", title: "PNL Series", label: surface ? "PNL SU Surface Mounted" : "PNL SA Recessed", description: "Standard panel family in recessed SA and surface-mounted SU forms for office and commercial interiors.", descriptionUa: "Стандартне сімейство панелей у вбудованій SA та накладній SU формах для офісних і комерційних інтер'єрів.", heroImage: PNL_HERO_IMAGE, heroBackgroundImage: PNL_HERO_BACKGROUND_IMAGE, imageAlt: `PNL ${surface ? "SU" : "SA"} panel luminaire`, rows: surface ? PNL_SU : PNL_SA, power: "18–76 W", flux: "2,070–8,740 lm", efficiency: ">115 lm/W", ip: "IP20 / IP40", installation: surface ? "Surface mounted" : "Recessed", installationUa: surface ? "Накладний" : "Вбудований", technicalImage: PNL_TECHNICAL_IMAGE, photometricImage: PNL_PHOTOMETRIC_IMAGE, sdcm: true }); return { ...result, modelsNote: surface ? undefined : (ua ? "Креслення джерела залишається доступним для габаритного довідника; неоднозначні зіставлення рядків стельового вирізу з каталогу свідомо пропущені зі структурованого розкладу." : "The source drawing remains available for dimensional reference; ambiguous catalogue ceiling-cut row associations are intentionally omitted from the structured schedule.") }; }
export function pnlConfigurationsForMarket(market: MarketCode) { return [{ id: "sa", label: "PNL SA Recessed", content: pnlContent(false, market) }, { id: "su", label: "PNL SU Surface Mounted", content: pnlContent(true, market) }] as const; }

const TWPNL_SA: readonly Row[] = [["LDB-TWPNL6060SA.18.01",18,"1,980 lm","595 × 595 × 25 mm","575 × 575 mm"],["LDB-TWPNL6060SA.36.01",36,"3,950 lm","595 × 595 × 25 mm","575 × 575 mm"],["LDB-TWPNL6060SA.54.01",54,"5,940 lm","595 × 595 × 25 mm","575 × 575 mm"]];
const TWPNL_SU: readonly Row[] = [["LDB-TWPNL6060SU.18.01",18,"1,980 lm","600 × 600 × 50 mm"],["LDB-TWPNL6060SU.36.01",36,"3,950 lm","600 × 600 × 50 mm"],["LDB-TWPNL6060SU.54.01",54,"5,940 lm","600 × 600 × 50 mm"]];
function twpnlContent(surface: boolean, market: MarketCode) { const ua = market === "ua"; return standardContent(market, { slug: "twpnl-series", title: "TWPNL Series", label: surface ? "TWPNL SU Surface Mounted" : "TWPNL SA Recessed", description: "600 × 600 twin-linear panel family with two parallel lighting modules.", descriptionUa: "Сімейство здвоєних лінійних панелей 600 × 600 з двома паралельними освітлювальними модулями.", heroImage: TWPNL_HERO_IMAGE, heroBackgroundImage: TWPNL_HERO_BACKGROUND_IMAGE, imageAlt: `TWPNL ${surface ? "SU" : "SA"} panel luminaire`, rows: surface ? TWPNL_SU : TWPNL_SA, power: "18–54 W", flux: "1,980–5,940 lm", efficiency: ">110 lm/W", ip: "IP20 / IP40", installation: surface ? "Surface mounted · 50 mm body depth" : "Recessed · 25 mm body depth", installationUa: surface ? "Накладний · глибина корпусу 50 мм" : "Вбудований · глибина корпусу 25 мм", technicalImage: TWPNL_TECHNICAL_IMAGE, photometricImage: TWPNL_PHOTOMETRIC_IMAGE, ceilingCut: !surface, sdcm: true, familyTechnicalSection: { heading: ua ? "Здвоєна лінійна конфігурація" : "Twin-Linear Configuration", introduction: ua ? "Каталог представляє два паралельні світлові модулі у вбудованій та накладній формах." : "The catalogue presents two parallel light modules in recessed and surface-mounted forms.", settings: [{ label: "TWPNL SA", value: ua ? "Вбудований · глибина 25 мм" : "Recessed · 25 mm depth", description: ua ? "Корпус 595 × 595 мм зі стельовим вирізом 575 × 575 мм." : "595 × 595 mm body with a 575 × 575 mm ceiling cut." }, { label: "TWPNL SU", value: ua ? "Накладний · глибина 50 мм" : "Surface mounted · 50 mm depth", description: ua ? "Накладний корпус 600 × 600 мм." : "600 × 600 mm surface-mounted body." }], assets: [] } }); }
export function twpnlConfigurationsForMarket(market: MarketCode) { return [{ id: "sa", label: "TWPNL SA Recessed", content: twpnlContent(false, market) }, { id: "su", label: "TWPNL SU Surface Mounted", content: twpnlContent(true, market) }] as const; }

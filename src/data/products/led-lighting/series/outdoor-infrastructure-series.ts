import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

export const OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF =
  "/products/led-systems/outdoor-infrastructure-lighting";

const ASSET_BASE = publicMediaUrl("products/led-lighting/series/outdoor-infrastructure");
const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/outdoor-infrastructure");
const PRODUCT_HERO_BASE = `${CATEGORY_ASSET_BASE}/product`;
const PRODUCT_BACKGROUND_BASE = `${PRODUCT_HERO_BASE}/background`;
const PHOTOMETRIC_BASE = `${CATEGORY_ASSET_BASE}/photometric`;
const TECHNICAL_BASE = `${CATEGORY_ASSET_BASE}/technical`;
const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;

const STREET_HERO_IMAGE = `${PRODUCT_HERO_BASE}/street-lighting-hero-foreground-products.webp`;
const STREET_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/street-lighting-hero-background.webp`;
const STREET_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/street-lighting-systems-photometric-distribution.webp`;
const STREET_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/street-lighting-systems-technical-dimensions.webp`;

const PROJECTOR_HERO_IMAGE = `${PRODUCT_HERO_BASE}/projector-floodlight-hero-foreground-products.webp`;
const PROJECTOR_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/projector-floodlight-hero-background.webp`;
const PROJECTOR_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/projector-floodlight-photometric-distribution.webp`;
const PROJECTOR_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/projector-floodlight-mounting-options-dimensions.webp`;

const KMX_HERO_IMAGE = `${PRODUCT_HERO_BASE}/canopy-lighting-hero-foreground-products.webp`;
const KMX_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/canopy-lighting-hero-background.webp`;
const KMX_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/canopy-lighting-photometric-data.png`;
const KMX_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/canopy-lighting-technical-drawing.png`;

const WALL_WASHER_HERO_IMAGE = `${PRODUCT_HERO_BASE}/wall-washer-hero-foreground-products.webp`;
const WALL_WASHER_HERO_BACKGROUND_IMAGE = `${PRODUCT_BACKGROUND_BASE}/wall-washer-hero-background.webp`;
const WALL_WASHER_PHOTOMETRIC_IMAGE = `${PHOTOMETRIC_BASE}/wall-washer-photometric-data.webp`;
const WALL_WASHER_TECHNICAL_IMAGE = `${TECHNICAL_BASE}/wall-washer-mounting-detail.webp`;

const ROUTES = {
  street: `${OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}/ger-led-street-lighting-systems`,
  projector: `${OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}/ger-led-projector-lighting-systems`,
  kmx: `${OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}/led-bus-ldb-kmx-canopy-lighting-systems`,
  tunnel: `${OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}/gsl-tunnel-lighting-systems`,
  wallWasher: `${OUTDOOR_INFRASTRUCTURE_CATEGORY_HREF}/ger-led-wall-washer-lighting-systems`,
} as const;

const FAMILIES = [
  { slug: "ger-led-street-lighting-systems", name: "GER-LED Street Lighting Systems", subtitleEn: "GSL100 and 730-GSL-D road-lighting configurations", subtitleUa: "Конфігурації дорожнього освітлення GSL100 та 730-GSL-D", href: ROUTES.street },
  { slug: "ger-led-projector-lighting-systems", name: "GER-LED Projector / Floodlight Lighting Systems", subtitleEn: "20–1000 W large-area projector configurations", subtitleUa: "Прожекторні конфігурації для великих площ 20–1000 Вт", href: ROUTES.projector },
  { slug: "led-bus-ldb-kmx-canopy-lighting-systems", name: "LED-BUS LDB-KMX Canopy Lighting Systems", subtitleEn: "100–400 W protected canopy luminaires", subtitleUa: "Захищені навісні світильники 100–400 Вт", href: ROUTES.kmx },
  { slug: "gsl-tunnel-lighting-systems", name: "GSL-TUNEL Lighting Systems", subtitleEn: "GSL-TUNEL and GSL-TUNEL CORNER", subtitleUa: "GSL-TUNEL та GSL-TUNEL CORNER", href: ROUTES.tunnel },
  { slug: "ger-led-wall-washer-lighting-systems", name: "GER-LED Wall Washer Lighting Systems", subtitleEn: "Standard and DMX architectural wall washing", subtitleUa: "Стандартне та DMX архітектурне заливаюче освітлення стін", href: ROUTES.wallWasher },
] as const;

function siblingFamilies(current: string, ua: boolean) {
  return FAMILIES.map((family) => {
    const base = { slug: family.slug, name: family.name, subtitle: ua ? family.subtitleUa : family.subtitleEn };
    return family.slug === current ? { ...base, isCurrent: true } : { ...base, href: family.href };
  });
}

// Single source of truth for the Outdoor & Infrastructure warranty split —
// Wall Washer publishes 5 years; every other family (Street, Projector,
// KMX Canopy) publishes 7.
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
  configuration: ["Configuration", "Конфігурація"],
  "construction-configuration": ["Construction / Configuration", "Конструкція / конфігурація"],
  "construction-mounting": ["Construction & Mounting", "Конструкція та монтаж"],
} as const;
function cardTitle(ua: boolean, key: keyof typeof CARD_TITLES) {
  const [en, uaText] = CARD_TITLES[key];
  return ua ? uaText : en;
}

const FIELD_LABELS = {
  power: ["Power", "Потужність"],
  luminousFlux: ["Luminous Flux", "Світловий потік"],
  efficiency: ["Efficiency", "Ефективність"],
  colourTemperature: ["Colour Temperature", "Колірна температура"],
  protection: ["Protection", "Захист"],
  voltage: ["Voltage", "Напруга"],
  voltageFrequency: ["Voltage / Frequency", "Напруга / частота"],
  powerFactor: ["Power Factor", "Коефіцієнт потужності"],
  operatingTemperature: ["Operating Temperature", "Робоча температура"],
  catalogueModels: ["Catalogue Models", "Каталожні моделі"],
  weight: ["Weight", "Маса"],
  application: ["Application", "Застосування"],
  dimensions: ["Dimensions", "Розміри"],
  cri: ["CRI", "CRI"],
} as const;
function field(ua: boolean, key: keyof typeof FIELD_LABELS) {
  const [en, uaText] = FIELD_LABELS[key];
  return ua ? uaText : en;
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
    breadcrumbs: {
      home: ua ? "Головна" : "Home",
      products: ua ? "Продукція" : "Products",
      ledSystems: ua ? "Системи LED-освітлення" : "LED Systems",
      category: ua ? "Зовнішнє освітлення та освітлення інфраструктури" : "Outdoor & Infrastructure Lighting",
      current: title,
    },
    backToCategoryLabel: ua ? "Назад до зовнішнього освітлення та освітлення інфраструктури" : "Back to Outdoor & Infrastructure Lighting",
    technicalInformationHeading: ua ? "Технічна інформація" : "Technical Information",
    technicalAssurance: [],
    modelsHeading: ua ? "Моделі та технічний розклад" : "Models & Technical Schedule",
    controlsHeading: "",
    controlsIntroduction: "",
    controlOptions: [],
    photometricHeading: ua ? "Фотометричні та технічні дані" : "Photometric & Technical Data",
    applicationsHeading: ua ? "Типові застосування" : "Typical Applications",
    applicationCardsAlways: true,
    compactApplicationsRow: true,
    siblingFamiliesHeading: ua ? "Інші серії зовнішнього освітлення та освітлення інфраструктури" : "Other Outdoor & Infrastructure Families",
    siblingViewSeriesLabel: ua ? "Переглянути серію" : "View Series",
    currentFamilyBadgeLabel: ua ? "Поточна серія" : "Current Family",
    siblingFamilies: siblingFamilies(slug, ua),
  } as const;
}

function streetApplications(ua: boolean) {
  return [
    { icon: "motorway", title: ua ? "Автомагістралі" : "Highways", description: ua ? "Ефективне дорожнє освітлення для автомагістралей та основних маршрутів інфраструктури." : "Efficient road lighting for highway and major-route infrastructure.", image: `${APPLICATION_IMAGE_BASE}/ger-led-street-lighting-road-application.webp`, imageAlt: ua ? "Міська дорога, освітлена вуличними світильниками GER-LED" : "Urban roadway illuminated by GER-LED street lighting" },
    { icon: "airport", title: ua ? "Аеропорти" : "Airports", description: ua ? "Освітлення доріг і громадських зон навколо інфраструктури аеропорту." : "Road and public-area lighting around airport infrastructure.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-airports-transport-facilities.webp`, imageAlt: ua ? "Транспортний вузол аеропорту, освітлений вуличними світильниками GER-LED" : "Airport transport facility illuminated by GER-LED street lighting" },
    { icon: "port", title: ua ? "Порти" : "Ports", description: ua ? "Освітлення портової інфраструктури та прилеглих громадських зон." : "Outdoor route and public-area lighting for port environments.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-ports.webp`, imageAlt: ua ? "Порт, освітлений вуличними світильниками GER-LED" : "Port illuminated by GER-LED street lighting" },
    { icon: "parks", title: ua ? "Парки та сади" : "Parks & Gardens", description: ua ? "Освітлення громадських парків, садів і пішохідних територій." : "Lighting for public parks, gardens and pedestrian surroundings.", image: `${APPLICATION_IMAGE_BASE}/street-lighting-application-parks-gardens.webp`, imageAlt: ua ? "Парк, освітлений вуличними світильниками GER-LED" : "Park illuminated by GER-LED street lighting" },
    { icon: "public-square", title: ua ? "Громадські площі" : "Public Squares", description: ua ? "Освітлення площ і спільних громадських просторів." : "Lighting for squares and shared civic spaces.", image: `${APPLICATION_IMAGE_BASE}/street-lighting-application-public-squares.webp`, imageAlt: ua ? "Громадська площа, освітлена вуличними світильниками GER-LED" : "Public square illuminated by GER-LED street lighting" },
    { icon: "residential", title: ua ? "Комерційні та житлові громадські зони" : "Commercial & Residential Public Areas", description: ua ? "Громадські маршрути навколо житлових масивів і торгових середовищ." : "Public routes around mass housing and shopping environments.", image: `${APPLICATION_IMAGE_BASE}/street-lighting-application-commercial-residential-public-areas.webp`, imageAlt: ua ? "Комерційна та житлова громадська зона, освітлена вуличними світильниками GER-LED" : "Commercial and residential public area illuminated by GER-LED street lighting" },
  ] as const;
}

const GSL100_STREET_MODELS: readonly LedSeriesModel[] = [
  ["GSL100-20W", 20, "3,480 lm", "174.0 lm/W", "5.0 kg"],
  ["GSL100-30W", 30, "4,640 lm", "154.7 lm/W", "5.0 kg"],
  ["GSL100-40W", 40, "6,250 lm", "156.3 lm/W", "5.0 kg"],
  ["GSL100-50W", 50, "8,320 lm", "166.4 lm/W", "5.0 kg"],
  ["GSL100-60W", 60, "8,800 lm", "146.7 lm/W", "5.0 kg"],
  ["GSL100-70W", 70, "9,900 lm", "141.4 lm/W", "5.2 kg"],
  ["GSL100-80W", 80, "10,280 lm", "128.5 lm/W", "5.2 kg"],
  ["GSL100-90W", 90, "11,860 lm", "131.8 lm/W", "5.2 kg"],
  ["GSL100-100W", 100, "14,500 lm", "145.0 lm/W", "5.35 kg"],
  ["GSL100-125W", 125, "17,800 lm", "142.4 lm/W", "5.35 kg"],
  ["GSL100-150W", 150, "21,000 lm", "140.0 lm/W", "5.35 kg"],
].map(([model, powerW, luminousFluxLm, efficiencyLmW, weightKg]) => ({
  model: model as string,
  powerW: powerW as number,
  luminousFluxLm: luminousFluxLm as string,
  efficiencyLmW: efficiencyLmW as string,
  voltage: "100–240 Vac",
  powerFactor: ">0.95",
  colourTemperature: "3000–6500 K",
  ip: "IP66",
  operatingTemperature: "−30 to +60 °C",
  weightKg: weightKg as string,
}));

const GSL_D_MODELS: readonly LedSeriesModel[] = [
  ["730-GSL-D20W", 20, "3,480 lm", "174.0 lm/W", "5.0 kg"],
  ["730-GSL-D30W", 30, "4,640 lm", "154.7 lm/W", "5.0 kg"],
  ["730-GSL-D40W", 40, "6,250 lm", "156.3 lm/W", "5.0 kg"],
  ["730-GSL-D50W", 50, "8,320 lm", "166.4 lm/W", "5.0 kg"],
  ["730-GSL-D60W", 60, "8,800 lm", "146.7 lm/W", "5.0 kg"],
  ["730-GSL-D70W", 70, "9,900 lm", "141.4 lm/W", "5.35 kg"],
  ["730-GSL-D80W", 80, "11,200 lm", "140.0 lm/W", "5.35 kg"],
  ["730-GSL-D90W", 90, "12,900 lm", "143.33 lm/W", "5.35 kg"],
  ["730-GSL-D100W", 100, "14,500 lm", "145.0 lm/W", "5.35 kg"],
  ["730-GSL-D110W", 110, "15,850 lm", "144.0 lm/W", "5.35 kg"],
  ["730-GSL-D125W", 125, "17,800 lm", "142.4 lm/W", "5.35 kg"],
  ["730-GSL-D150W", 150, "21,000 lm", "140.0 lm/W", "5.35 kg"],
].map(([model, powerW, luminousFluxLm, efficiencyLmW, weightKg]) => ({
  model: model as string,
  powerW: powerW as number,
  luminousFluxLm: luminousFluxLm as string,
  efficiencyLmW: efficiencyLmW as string,
  voltage: "100–240 Vac",
  cri: "75–85",
  colourTemperature: model === "730-GSL-D125W" ? "3000–6000 K" : "3000–6500 K",
  ip: "IP66",
  operatingTemperature: "−30 to +50 °C",
  weightKg: weightKg as string,
}));

function streetContent(configuration: "gsl100" | "gsl-d", market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const gsl100 = configuration === "gsl100";
  const label = gsl100 ? "GSL100" : "730-GSL-D";
  return {
    ...shared(market, "ger-led-street-lighting-systems", "GER-LED Street Lighting Systems"),
    metadata: { title: "GER-LED Street Lighting Systems | InfraVolt", description: ua ? "Каталожні вуличні світильники GSL100 та 730-GSL-D для автомагістралей, громадських просторів та міської інфраструктури." : "Catalogue-verified GSL100 and 730-GSL-D street luminaires for highways, public spaces and urban infrastructure." },
    hero: { eyebrow: label, category: ua ? "Зовнішнє освітлення та освітлення інфраструктури" : "Outdoor & Infrastructure Lighting", title: "GER-LED Street Lighting Systems", description: ua ? "Ефективні вуличні світильники GER-LED для автомагістралей, громадських просторів та міської інфраструктури, доступні в конфігураціях GSL100 та 730-GSL-D на кількох рівнях потужності." : "Efficient GER-LED street luminaires for highways, public spaces and urban infrastructure, available in GSL100 and 730-GSL-D configurations across multiple power levels.", ...heroActions(ua) },
    heroImage: STREET_HERO_IMAGE,
    heroImageAlt: ua ? "Вуличні світильники GER-LED" : "GER-LED street lighting luminaires",
    heroBackgroundImage: STREET_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: ua ? "Дорога, освітлена вуличними світильниками GER-LED" : "Road illuminated by GER-LED street luminaires",
    technicalInformation: gsl100 ? [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: field(ua, "power"), value: "20–150 W" }, { label: field(ua, "luminousFlux"), value: "3,480–21,000 lm" }, { label: field(ua, "efficiency"), value: "128.5–174.0 lm/W" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: field(ua, "colourTemperature"), value: "3000–6500 K" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "protection"), value: "IP66" }, { label: field(ua, "voltage"), value: "100–240 Vac" }, { label: field(ua, "powerFactor"), value: ">0.95" }, { label: field(ua, "operatingTemperature"), value: "−30 to +60 °C" }] },
      { icon: "construction", title: cardTitle(ua, "configuration"), values: [{ label: field(ua, "catalogueModels"), value: "11" }, { label: field(ua, "weight"), value: "5.0–5.35 kg" }, { label: field(ua, "application"), value: ua ? "Дорожня та громадська інфраструктура" : "Road and public infrastructure" }] },
    ] : [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: field(ua, "power"), value: "20–150 W" }, { label: field(ua, "luminousFlux"), value: "3,480–21,000 lm" }, { label: field(ua, "efficiency"), value: "140.0–174.0 lm/W" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: field(ua, "colourTemperature"), value: "3000–6500 K" }, { label: ua ? "Виняток для 125 Вт" : "125 W Exception", value: "3000–6000 K" }, { label: "CRI", value: "75–85" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "protection"), value: "IP66" }, { label: field(ua, "voltage"), value: "100–240 Vac" }, { label: field(ua, "operatingTemperature"), value: "−30 to +50 °C" }] },
      { icon: "construction", title: cardTitle(ua, "configuration"), values: [{ label: field(ua, "catalogueModels"), value: "12" }, { label: field(ua, "weight"), value: "5.0–5.35 kg" }, { label: field(ua, "application"), value: ua ? "Дорожня та громадська інфраструктура" : "Road and public infrastructure" }] },
    ],
    technicalAssurance: [
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP66" },
      warrantyItem(ua),
    ],
    modelsIntroduction: ua ? `Точний каталожний розклад ${label}. Значення температури та якості світла, специфічні для конфігурації, не поширюються на інший корпус вуличного світильника.` : `Exact ${label} catalogue schedule. The configuration-specific temperature and light-quality values are not shared with the other street body.`,
    models: gsl100 ? GSL100_STREET_MODELS : GSL_D_MODELS,
    modelsNote: gsl100 ? undefined : (ua ? "730-GSL-D125W зберігає специфічне каталожне значення 3000–6000 K; інші опубліковані моделі показують 3000–6500 K." : "730-GSL-D125W retains the catalogue-specific 3000–6000 K value; the other published models show 3000–6500 K."),
    modelsColumns: { model: ua ? "Модель / код каталогу" : "Model / Catalogue Code", power: field(ua, "power"), luminousFlux: field(ua, "luminousFlux"), voltage: field(ua, "voltage"), powerFactor: gsl100 ? (ua ? "Коеф. потужн." : "PF") : undefined, operatingTemperature: ua ? "Робоча темп." : "Operating Temp.", efficiency: field(ua, "efficiency"), cri: gsl100 ? undefined : "CRI", colourTemperature: "CCT", ip: "IP", weight: field(ua, "weight") },
    modelsFilters: filters(market, `Search ${label} model code`, `Пошук за кодом моделі ${label}`),
    technicalAssets: [
      { title: ua ? "Фотометричні дані" : "Photometric Data", image: STREET_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Діаграма фотометричного розподілу вуличного освітлення GER-LED" : "GER-LED street lighting photometric distribution diagram" },
      { title: ua ? "Технічне креслення" : "Technical Drawing", image: STREET_TECHNICAL_IMAGE, imageAlt: ua ? "Технічне креслення розмірів вуличного освітлення GER-LED" : "GER-LED street lighting technical dimensions drawing" },
    ],
    dimensionNote: ua ? `Технічні матеріали спільні для всього сімейства GER-LED Street Lighting; каталожний розклад ${label} вище наводить точні значення на рівні моделі.` : `Technical assets shown are shared across the GER-LED Street Lighting family; the ${label} catalogue schedule above lists the exact model-level values.`,
    applications: streetApplications(ua),
    supportCta: { title: ua ? "Плануєте проєкт вуличного освітлення?" : "Planning a Street Lighting Project?", description: ua ? "Обговоріть дорожнє середовище, рівень потужності та конфігурацію GER-LED з нашою технічною командою." : "Discuss the road environment, power level and GER-LED configuration with our technical team.", action: talkToTeam(ua) },
  };
}

export function streetLightingConfigurationsForMarket(market: MarketCode) {
  return [
    { id: "gsl100", label: "GSL100", content: streetContent("gsl100", market) },
    { id: "730-gsl-d", label: "730-GSL-D", content: streetContent("gsl-d", market) },
  ] as const;
}

function projectorApplications(ua: boolean) {
  return [
    { icon: "high-ceiling", title: ua ? "Стадіони" : "Stadiums", description: ua ? "Потужне освітлення для стадіонів і великих спортивних об'єктів." : "High-output illumination for stadium and large sports environments.", image: `${APPLICATION_IMAGE_BASE}/projector-lighting-application-stadiums.webp`, imageAlt: ua ? "Стадіон, освітлений прожекторами GER-LED" : "Stadium illuminated by GER-LED projector lighting" },
    { icon: "airport", title: ua ? "Аеропорти" : "Airports", description: ua ? "Освітлення великих площ для перонів аеропорту та прилеглих територій." : "Large-area lighting for airport aprons and transport surroundings.", image: `${ASSET_BASE}/projector/ger-led-projector-airport-application.webp`, imageAlt: ua ? "Перон аеропорту, освітлений прожекторами GER-LED" : "Airport apron illuminated by GER-LED projector lighting" },
    { icon: "port", title: ua ? "Порти" : "Ports", description: ua ? "Освітлення великих площ для портів і вантажних зон." : "Broad-area lighting for port and loading environments.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-ports.webp`, imageAlt: ua ? "Порт, освітлений прожекторами GER-LED" : "Port illuminated by GER-LED projector lighting" },
    { icon: "tunnel", title: ua ? "Залізнична та транспортна інфраструктура" : "Rail & Transport Infrastructure", description: ua ? "Прожекторне освітлення залізничних маршрутів і транспортної інфраструктури." : "Projector lighting for train routes and transport infrastructure.", image: `${APPLICATION_IMAGE_BASE}/projector-lighting-application-rail-transport-infrastructure.webp`, imageAlt: ua ? "Залізнична та транспортна інфраструктура, освітлена прожекторами GER-LED" : "Rail and transport infrastructure illuminated by GER-LED projector lighting" },
    { icon: "public-square", title: ua ? "Міські центри та громадські зони" : "City Centres & Public Areas", description: ua ? "Освітлення великих площ для міських центрів і громадських просторів." : "Large-area illumination for city centres and public spaces.", image: `${APPLICATION_IMAGE_BASE}/projector-lighting-application-city-centres-public-areas.webp`, imageAlt: ua ? "Міський центр, освітлений прожекторами GER-LED" : "City centre illuminated by GER-LED projector lighting" },
    { icon: "industrial-facility", title: ua ? "Великі зовнішні / промислові зони" : "Large Outdoor / Industrial Areas", description: ua ? "Помірне покриття великих площ для промислових і зовнішніх об'єктів." : "Conservative large-area coverage for industrial and outdoor sites.", image: `${APPLICATION_IMAGE_BASE}/projector-lighting-application-large-outdoor-industrial-areas.webp`, imageAlt: ua ? "Велика зовнішня промислова зона, освітлена прожекторами GER-LED" : "Large outdoor industrial area illuminated by GER-LED projector lighting" },
  ] as const;
}

function projectorModel(model: string, powerW: number, luminousFluxLm: string, efficiencyLmW: string, weightKg: string, ledQty?: number): LedSeriesModel {
  return { model, powerW, luminousFluxLm, efficiencyLmW, weightKg, ledQty, voltage: "100–240 Vac", frequency: "50–60 Hz", powerFactor: ">0.95", colourTemperature: "3000–6500 K", cri: "75–85", ip: "IP66", operatingTemperature: "−30 to +60 °C" };
}

const PROJECTOR_GSL100 = [
  projectorModel("GSL100-20W PJ", 20, "3,480 lm", "174.0 lm/W", "5.0 kg"),
  projectorModel("GSL100-30W PJ", 30, "4,640 lm", "154.7 lm/W", "5.0 kg"),
  projectorModel("GSL100-40W PJ", 40, "6,250 lm", "156.3 lm/W", "5.0 kg"),
  projectorModel("GSL100-50W PJ", 50, "8,320 lm", "166.4 lm/W", "5.0 kg"),
  projectorModel("GSL100-60W PJ", 60, "8,800 lm", "146.7 lm/W", "5.0 kg"),
  projectorModel("GSL100-70W PJ", 70, "9,900 lm", "141.4 lm/W", "5.2 kg"),
  projectorModel("GSL100-80W PJ", 80, "10,280 lm", "128.5 lm/W", "5.2 kg"),
  projectorModel("GSL100-90W PJ", 90, "11,860 lm", "131.8 lm/W", "5.2 kg"),
  projectorModel("GSL100-100W PJ", 100, "14,500 lm", "145.0 lm/W", "4.35 kg"),
  projectorModel("GSL100-125W PJ", 125, "17,800 lm", "142.4 lm/W", "5.35 kg"),
  projectorModel("GSL100-150W PJ", 150, "21,000 lm", "140.0 lm/W", "5.35 kg"),
] as const;

const PROJECTOR_GSL1_9 = [
  projectorModel("GSL1 35W PJ", 35, "5,000 lm", "142.9 lm/W", "8.0 kg", 8),
  projectorModel("GSL2 50W PJ", 50, "7,500 lm", "150.0 lm/W", "8.0 kg", 36),
  projectorModel("GSL3 70W PJ", 70, "12,250 lm", "175.0 lm/W", "8.0 kg", 48),
  projectorModel("GSL4 105W PJ", 100, "16,100 lm", "161.0 lm/W", "8.0 kg", 60),
  projectorModel("GSL5 125W PJ", 125, "20,500 lm", "164.0 lm/W", "9.0 kg", 64),
  projectorModel("GSL6 150W PJ", 150, "22,150 lm", "147.7 lm/W", "9.0 kg", 64),
  projectorModel("GSL7 185W PJ", 185, "24,500 lm", "132.4 lm/W", "9.0 kg", 80),
  projectorModel("GSL8 200W PJ", 200, "25,750 lm", "128.8 lm/W", "9.0 kg", 80),
  projectorModel("GSL9 250W PJ", 250, "29,500 lm", "118.0 lm/W", "9.0 kg", 80),
] as const;

const PROJECTOR_300_500 = [
  projectorModel("GSL 300W-PJ", 300, "48,700 lm", "162.3 lm/W", "18.5 kg"),
  projectorModel("GSL 400W-PJ", 400, "54,000 lm", "135.0 lm/W", "18.5 kg"),
  projectorModel("GSL 500W-PJ", 500, "68,000 lm", "136.0 lm/W", "18.5 kg"),
] as const;

const PROJECTOR_600_1000 = [
  projectorModel("GSL 600W-PJ", 600, "78,000 lm", "130.0 lm/W", "37.0 kg", 320),
  projectorModel("GSL 700W-PJ", 700, "89,110 lm", "127.3 lm/W", "37.0 kg", 320),
  projectorModel("GSL 800W-PJ", 800, "97,200 lm", "121.5 lm/W", "37.0 kg", 320),
  projectorModel("GSL 900W-PJ", 900, "106,200 lm", "118.0 lm/W", "37.0 kg", 320),
  projectorModel("GSL 1000W-PJ", 1000, "112,000 lm", "112.0 lm/W", "37.0 kg", 320),
] as const;

type ProjectorConfiguration = "gsl100" | "gsl1-9" | "300-500" | "600-1000";

function projectorContent(configuration: ProjectorConfiguration, market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const config = {
    gsl100: { label: "GSL100", models: PROJECTOR_GSL100, power: "20–150 W", flux: "3,480–21,000 lm", weight: "4.35–5.35 kg" },
    "gsl1-9": { label: "GSL1–GSL9", models: PROJECTOR_GSL1_9, power: "35–250 W", flux: "5,000–29,500 lm", weight: "8.0–9.0 kg" },
    "300-500": { label: "300–500 W", models: PROJECTOR_300_500, power: "300–500 W", flux: "48,700–68,000 lm", weight: "18.5 kg" },
    "600-1000": { label: "600–1000 W", models: PROJECTOR_600_1000, power: "600–1000 W", flux: "78,000–112,000 lm", weight: "37.0 kg" },
  }[configuration];
  const hasLedQty = configuration === "gsl1-9" || configuration === "600-1000";
  return {
    ...shared(market, "ger-led-projector-lighting-systems", "GER-LED Projector / Floodlight Lighting Systems"),
    metadata: { title: "GER-LED Projector / Floodlight Lighting Systems | InfraVolt", description: ua ? "Каталожні конфігурації прожекторів GER-LED від 20 Вт до 1000 Вт для стадіонів, транспортної інфраструктури та великих зовнішніх площ." : "Catalogue-verified GER-LED projector configurations from 20 W to 1000 W for stadiums, transport infrastructure and large outdoor areas." },
    hero: { eyebrow: config.label, category: ua ? "Зовнішнє освітлення та освітлення інфраструктури" : "Outdoor & Infrastructure Lighting", title: "GER-LED Projector / Floodlight Lighting Systems", description: ua ? "Потужні прожекторні системи GER-LED для великих зовнішніх площ, стадіонів, транспортної інфраструктури, промислових об'єктів та архітектурних застосувань, із кількома корпусними та потужнісними конфігураціями." : "High-output GER-LED projector systems for large outdoor areas, stadiums, transport infrastructure, industrial sites and architectural applications, with multiple body and power configurations.", ...heroActions(ua) },
    heroImage: PROJECTOR_HERO_IMAGE,
    heroImageAlt: ua ? "Прожекторні світильники GER-LED" : "GER-LED projector / floodlight luminaires",
    heroBackgroundImage: PROJECTOR_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: ua ? "Велика зовнішня площа, освітлена прожекторами GER-LED" : "Large outdoor area illuminated by GER-LED projector lighting",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: field(ua, "power"), value: config.power }, { label: field(ua, "luminousFlux"), value: config.flux }, { label: field(ua, "catalogueModels"), value: String(config.models.length) }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: field(ua, "colourTemperature"), value: "3000–6500 K" }, { label: "CRI", value: "75–85" }, ...(hasLedQty ? [{ label: ua ? "Кількість LED" : "LED Quantity", value: configuration === "600-1000" ? "320" : "8–80" }] : [])] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "protection"), value: "IP66" }, { label: field(ua, "voltageFrequency"), value: "100–240 Vac · 50–60 Hz" }, { label: field(ua, "powerFactor"), value: ">0.95" }, { label: field(ua, "operatingTemperature"), value: "−30 to +60 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction-configuration"), values: [{ label: cardTitle(ua, "configuration"), value: config.label }, { label: field(ua, "weight"), value: config.weight }, { label: ua ? "Оптика" : "Optics", value: ua ? "Високопродуктивні асиметричні лінзи" : "High-performance asymmetric lenses" }] },
    ],
    technicalAssurance: [
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP66" },
      warrantyItem(ua),
    ],
    modelsIntroduction: ua ? `Точний каталожний розклад прожекторів ${config.label}. Значення взято з джерела, специфічного для прожекторів, а не зі схоже названого сімейства вуличних світильників.` : `Exact ${config.label} projector catalogue schedule. Values come from the projector-specific source, not the similarly named street family.`,
    models: config.models,
    modelsNote: configuration === "gsl1-9" ? (ua ? "GSL4 105W PJ — точна назва моделі, хоча в опублікованому технічному розкладі вказано 100 Вт." : "GSL4 105W PJ is the exact model name while its published technical schedule states 100 W.") : undefined,
    modelsColumns: { model: ua ? "Модель / код каталогу" : "Model / Catalogue Code", power: field(ua, "power"), ledQty: hasLedQty ? (ua ? "Кількість LED" : "LED Qty") : undefined, luminousFlux: field(ua, "luminousFlux"), voltage: field(ua, "voltage"), frequency: ua ? "Частота" : "Frequency", powerFactor: ua ? "Коеф. потужн." : "PF", operatingTemperature: ua ? "Робоча темп." : "Operating Temp.", efficiency: field(ua, "efficiency"), cri: "CRI", colourTemperature: "CCT", ip: "IP", weight: field(ua, "weight") },
    modelsFilters: filters(market, `Search ${config.label} projector code`, `Пошук за кодом прожектора ${config.label}`),
    familyTechnicalSection: { heading: ua ? "Системні та проєктні опції" : "System & Project Options", introduction: ua ? "Конструктивні особливості підтверджені каталогом; функції зв'язку, датчиків і моніторингу є проєктними/системними опціями, а не стандартним обладнанням для кожного прожектора." : "Construction features are catalogue-backed; communication, sensing and monitoring functions are project/system options rather than standard equipment on every projector.", settings: [
      { label: ua ? "Підключення" : "Connection", value: ua ? "50 см вихідний кабель у гумовій ізоляції" : "50 cm rubber-insulated output cable", description: ua ? "Багатоконтактна система роз'ємів без гвинтів, паяння та стрічок." : "Multi-contact screwless, solderless and tapeless socket system." },
      { label: ua ? "Обслуговувана конструкція" : "Serviceable Structure", value: ua ? "Незалежні секції LED і драйвера" : "Independent LED and driver sections", description: ua ? "Знімна модульна конструкція LED з незалежною секцією драйвера." : "Plug-and-remove LED module structure with an independent driver section." },
      { label: ua ? "Оптичне регулювання" : "Optical Adjustment", value: ua ? "Асиметричні лінзи · регулювання кута за допомогою редуктора" : "Asymmetric lenses · geared angle adjustment", description: ua ? "Високопродуктивна оптика та регульований кут світильника, як заявлено в каталозі." : "High-performance optics and adjustable luminaire angle stated by the catalogue." },
      { label: ua ? "Проєктне керування" : "Project Controls", value: ua ? "Зв'язок по силовій лінії · Увімк./Вимк./Димування · сценарне керування" : "Power Line Communication · On / Off / Dim · scenario control", description: ua ? "Проєктно-залежні опції зв'язку та керування освітленням." : "Project-dependent communication and lighting-control options." },
      { label: ua ? "Проєктна інтеграція" : "Project Integration", value: "IP-камера · 3G · TCP/IP", description: ua ? "Проєктні/системні опції, а не універсальні вбудовані функції прожектора." : "Project/system options, not universal built-in projector functions." },
      { label: ua ? "Проєктний моніторинг" : "Project Monitoring", value: ua ? "Вологість / температура · рух / денне світло · статус несправностей" : "Humidity / temperature · motion / daylight · fault status", description: ua ? "Каталожні опції датчиків і моніторингу залежно від конфігурації проєкту." : "Catalogue-listed sensing and monitoring options subject to project configuration." },
    ], assets: [] },
    technicalAssets: [
      { title: ua ? "Фотометричні дані" : "Photometric Data", image: PROJECTOR_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Діаграма фотометричного розподілу прожекторів GER-LED" : "GER-LED projector / floodlight photometric distribution diagram" },
      { title: ua ? "Технічне креслення" : "Technical Drawing", image: PROJECTOR_TECHNICAL_IMAGE, imageAlt: ua ? "Креслення варіантів монтажу та розмірів прожекторів GER-LED" : "GER-LED projector / floodlight mounting options and dimensions drawing" },
    ],
    dimensionNote: ua ? `Технічні матеріали спільні для всього сімейства GER-LED Projector / Floodlight; каталожний розклад ${config.label} вище наводить точні значення на рівні моделі.` : `Technical assets shown are shared across the GER-LED Projector / Floodlight family; the ${config.label} catalogue schedule above lists the exact model-level values.`,
    applications: projectorApplications(ua),
    supportCta: { title: ua ? "Плануєте проєкт освітлення великої площі?" : "Planning a Large-Area Lighting Project?", description: ua ? "Обговоріть застосування, конфігурацію корпусу, рівень потужності та проєктні опції з нашою технічною командою." : "Discuss the application, body configuration, power level and project options with our technical team.", action: talkToTeam(ua) },
  };
}

export function projectorLightingConfigurationsForMarket(market: MarketCode) {
  return [
    { id: "gsl100", label: "GSL100", content: projectorContent("gsl100", market) },
    { id: "gsl1-9", label: "GSL1–GSL9", content: projectorContent("gsl1-9", market) },
    { id: "300-500", label: "300–500 W", content: projectorContent("300-500", market) },
    { id: "600-1000", label: "600–1000 W", content: projectorContent("600-1000", market) },
  ] as const;
}

const KMX_MODELS: readonly LedSeriesModel[] = [
  { model: "LED-BUS LDB-KMX2100", powerW: 100, luminousFluxLm: "12,500 lm", efficiencyLmW: ">125 lm/W", voltage: "220–240 Vac", colourTemperature: "3000–6500 K", ip: "IP66", ik: "IK08", dimensions: "230 × 345 × 90 mm", operatingTemperature: "−20 to +45 °C" },
  { model: "LED-BUS LDB-KMX2150", powerW: 150, luminousFluxLm: "18,750 lm", efficiencyLmW: ">125 lm/W", voltage: "220–240 Vac", colourTemperature: "3000–6500 K", ip: "IP66", ik: "IK08", dimensions: "230 × 345 × 90 mm", operatingTemperature: "−20 to +45 °C" },
  { model: "LED-BUS LDB-KMX3200", powerW: 200, luminousFluxLm: "25,000 lm", efficiencyLmW: ">125 lm/W", voltage: "220–240 Vac", colourTemperature: "3000–6500 K", ip: "IP66", ik: "IK08", dimensions: "315 × 345 × 90 mm", operatingTemperature: "−20 to +45 °C" },
  { model: "LED-BUS LDB-KMX3300", powerW: 300, luminousFluxLm: "37,500 lm", efficiencyLmW: ">125 lm/W", voltage: "220–240 Vac", colourTemperature: "3000–6500 K", ip: "IP66", ik: "IK08", dimensions: "315 × 345 × 90 mm", operatingTemperature: "−20 to +45 °C" },
  { model: "LED-BUS LDB-KMX4400", powerW: 400, luminousFluxLm: "50,000 lm", efficiencyLmW: ">125 lm/W", voltage: "220–240 Vac", colourTemperature: "3000–6500 K", ip: "IP66", ik: "IK08", dimensions: "400 × 345 × 90 mm", operatingTemperature: "−20 to +45 °C" },
];

type KmxConfiguration = "100-150" | "200-300" | "400";

function kmxApplications(ua: boolean) {
  return [
    { icon: "high-ceiling", title: ua ? "Навіси" : "Canopies", description: ua ? "Захищене освітлення для навісів і критих сервісних зон." : "Protected lighting for canopy and covered-service environments.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-canopies.webp`, imageAlt: ua ? "Навіс, освітлений світильниками LED-BUS LDB-KMX" : "Canopy illuminated by LED-BUS LDB-KMX lighting" },
    { icon: "airport", title: ua ? "Аеропорти та транспортні об'єкти" : "Airports & Transport Facilities", description: ua ? "Крита інфраструктура навколо аеропортів і транспортних об'єктів." : "Covered infrastructure around airport and transport facilities.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-airports-transport-facilities.webp`, imageAlt: ua ? "Транспортний об'єкт аеропорту, освітлений навісним освітленням LED-BUS LDB-KMX" : "Airport transport facility illuminated by LED-BUS LDB-KMX canopy lighting" },
    { icon: "port", title: ua ? "Порти" : "Ports", description: ua ? "Навісне та криве освітлення для портових зон." : "Canopy and covered-area lighting for port environments.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-ports.webp`, imageAlt: ua ? "Портовий навіс, освітлений світильниками LED-BUS LDB-KMX" : "Port canopy illuminated by LED-BUS LDB-KMX lighting" },
    { icon: "warehouse", title: ua ? "Крита інфраструктура" : "Covered Infrastructure", description: ua ? "Надійне освітлення для захищеної зовнішньої інфраструктури." : "Robust lighting for protected outdoor infrastructure.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-covered-infrastructure.webp`, imageAlt: ua ? "Крита інфраструктура, освітлена навісним освітленням LED-BUS LDB-KMX" : "Covered infrastructure illuminated by LED-BUS LDB-KMX canopy lighting" },
    { icon: "shopping-centre", title: ua ? "Великі громадські / комерційні зони" : "Large Public / Commercial Areas", description: ua ? "Криті громадські та комерційні проєктні середовища." : "Covered public and commercial project environments.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-large-public-commercial-areas.webp`, imageAlt: ua ? "Велика громадська комерційна зона, освітлена навісним освітленням LED-BUS LDB-KMX" : "Large public commercial area illuminated by LED-BUS LDB-KMX canopy lighting" },
  ] as const;
}

function kmxContent(configuration: KmxConfiguration, market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const config = {
    "100-150": { label: "100–150 W Body", labelUa: "Корпус 100–150 Вт", models: KMX_MODELS.slice(0, 2), dimensions: "230 × 345 × 90 mm" },
    "200-300": { label: "200–300 W Body", labelUa: "Корпус 200–300 Вт", models: KMX_MODELS.slice(2, 4), dimensions: "315 × 345 × 90 mm" },
    "400": { label: "400 W Body", labelUa: "Корпус 400 Вт", models: KMX_MODELS.slice(4), dimensions: "400 × 345 × 90 mm" },
  }[configuration];
  const label = ua ? config.labelUa : config.label;
  return {
    ...shared(market, "led-bus-ldb-kmx-canopy-lighting-systems", "LED-BUS LDB-KMX Canopy Lighting Systems"),
    metadata: { title: "LED-BUS LDB-KMX Canopy Lighting Systems | InfraVolt", description: ua ? "П'ять каталожних світильників LED-BUS LDB-KMX від 100 до 400 Вт з IP66, IK08 та конфігурованою оптикою й керуванням." : "Five catalogue-verified LED-BUS LDB-KMX canopy luminaires from 100–400 W with IP66, IK08 and configurable optics and controls." },
    hero: { eyebrow: label, category: ua ? "Зовнішнє освітлення та освітлення інфраструктури" : "Outdoor & Infrastructure Lighting", title: "LED-BUS LDB-KMX Canopy Lighting Systems", description: ua ? "Надійні навісні світильники для критої зовнішньої інфраструктури та вимогливих проєктних середовищ, із кількома рівнями потужності, захищеною конструкцією та конфігурованими оптичними/керувальними опціями." : "Robust canopy luminaires for covered outdoor infrastructure and demanding project environments, with multiple power levels, protected construction and configurable optical/control options.", ...heroActions(ua) },
    heroImage: KMX_HERO_IMAGE,
    heroImageAlt: ua ? "Навісний світильник LED-BUS LDB-KMX" : "LED-BUS LDB-KMX canopy luminaire",
    heroBackgroundImage: KMX_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: ua ? "Навіс, освітлений світильниками LED-BUS LDB-KMX" : "Canopy environment illuminated by LED-BUS LDB-KMX luminaires",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: ua ? "Обрана потужність" : "Selected Power", value: config.models.map((model) => `${model.powerW} W`).join(" · ") }, { label: field(ua, "efficiency"), value: ">125 lm/W" }, { label: field(ua, "luminousFlux"), value: config.models.map((model) => model.luminousFluxLm ?? "").join(" · ") }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: field(ua, "colourTemperature"), value: "3000–6500 K" }, { label: ua ? "Оптика" : "Optics", value: ua ? "Середній промінь · широкий промінь" : "Medium Beam · Wide Beam" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "protection"), value: "IP66 · IK08" }, { label: field(ua, "voltage"), value: "220–240 Vac" }, { label: field(ua, "operatingTemperature"), value: "−20 to +45 °C" }] },
      { icon: "construction", title: cardTitle(ua, "construction-configuration"), values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Литий алюміній" : "Aluminium die-cast" }, { label: ua ? "Передня рамка" : "Front Frame", value: ua ? "Виготовлена сталь" : "Fabricated steel" }, { label: field(ua, "dimensions"), value: config.dimensions }] },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Литий алюмінієвий корпус · передня рамка з виготовленої сталі" : "Aluminium die-cast body · fabricated steel front frame" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP66 · IK08" },
      warrantyItem(ua),
    ],
    modelsIntroduction: ua ? "Повний п'ятимодельний каталожний розклад LDB-KMX. Вибір корпусу змінює зображення продукту та відповідні технічні матеріали, не приховуючи моделі з розкладу сімейства." : "Complete five-model LDB-KMX catalogue schedule. The body selector changes the product visual and matching technical assets without hiding models from the family schedule.",
    models: KMX_MODELS,
    modelsColumns: { model: ua ? "Модель / код каталогу" : "Model / Catalogue Code", power: field(ua, "power"), luminousFlux: field(ua, "luminousFlux"), voltage: field(ua, "voltage"), operatingTemperature: ua ? "Робоча темп." : "Operating Temp.", efficiency: field(ua, "efficiency"), colourTemperature: "CCT", dimensions: field(ua, "dimensions"), ip: "IP", ik: "IK" },
    modelsFilters: filters(market, "Search LDB-KMX model code", "Пошук за кодом моделі LDB-KMX"),
    familyTechnicalSection: { heading: ua ? "Оптика та керування" : "Optics & Controls", introduction: ua ? "Каталожні оптичні та керувальні методи є конфігурованими опціями; вони не подаються як одночасно встановлене стандартне обладнання." : "Catalogue-listed optical and control methods are configurable options; they are not presented as simultaneously fitted standard equipment.", settings: [
      { label: ua ? "Оптичні опції" : "Optical Options", value: ua ? "Середній промінь · широкий промінь" : "Medium Beam · Wide Beam", description: ua ? "Доступні конфігурації променя для сімейства LDB-KMX." : "Available beam configurations listed for the LDB-KMX family." },
      { label: ua ? "Димування" : "Dimming", value: "1–10V · DALI", description: ua ? "Конфіговані опції керування для проєктних вимог." : "Configurable control options for project requirements." },
      { label: ua ? "Локальне / бездротове керування" : "Local / Wireless Control", value: "Touch-Dim · Casambi", description: ua ? "Каталожні доступні варіанти керування." : "Catalogue-listed available control choices." },
    ], assets: [] },
    technicalAssets: [
      { title: ua ? "Фотометричні дані" : "Photometric Data", image: KMX_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Фотометричні дані навісного освітлення LED-BUS LDB-KMX" : "LED-BUS LDB-KMX canopy photometric data" },
      { title: ua ? "Технічне креслення" : "Technical Drawing", image: KMX_TECHNICAL_IMAGE, imageAlt: ua ? "Технічне креслення навісного освітлення LED-BUS LDB-KMX" : "LED-BUS LDB-KMX canopy technical drawing" },
    ],
    dimensionNote: ua ? `Технічні матеріали спільні для сімейства LDB-KMX; розміри ${label} вище специфічні для конфігурації.` : `Technical assets shown are shared across the LDB-KMX family; the ${config.label} dimensions above are configuration-specific.`,
    applications: kmxApplications(ua),
    supportCta: { title: ua ? "Потрібне рішення навісного освітлення?" : "Need a Canopy Lighting Solution?", description: ua ? "Обговоріть розмір корпусу, потужність, промінь і конфігурацію керування з нашою технічною командою." : "Discuss the body size, power, beam and control configuration with our technical team.", action: talkToTeam(ua) },
  };
}

export function kmxLightingConfigurationsForMarket(market: MarketCode) {
  return [
    { id: "100-150", label: "100–150 W", content: kmxContent("100-150", market) },
    { id: "200-300", label: "200–300 W", content: kmxContent("200-300", market) },
    { id: "400", label: "400 W", content: kmxContent("400", market) },
  ] as const;
}

const WALL_STANDARD: readonly LedSeriesModel[] = [
  { model: "GSL-WWM12", powerW: 6, luminousFluxLm: "1,080 lm", voltage: "220 V AC", ip: "IP66", dimensions: "19 cm", weightKg: "0.8 kg" },
  { model: "GSL-WWM18", powerW: 12, luminousFluxLm: "1,440 lm", voltage: "220 V AC", ip: "IP66", dimensions: "34 cm", weightKg: "1.3 kg" },
  { model: "GSL-WWM24", powerW: 18, luminousFluxLm: "2,160 lm", voltage: "220 V AC", ip: "IP66", dimensions: "49 cm", weightKg: "1.8 kg" },
  { model: "GSL-WWM36", powerW: 24, luminousFluxLm: "2,880 lm", voltage: "220 V AC", ip: "IP66", dimensions: "64 cm", weightKg: "2.6 kg" },
  { model: "GSL-WWM48", powerW: 36, luminousFluxLm: "4,320 lm", voltage: "220 V AC", ip: "IP66", dimensions: "94 cm", weightKg: "3.1 kg" },
];

const WALL_DMX: readonly LedSeriesModel[] = [
  { model: "GSL-WWMX36-DMX", powerW: 48, luminousFluxLm: "5,760 lm", voltage: "220 V AC", ip: "IP66", dimensions: "124 cm", weightKg: "3.6 kg" },
  { model: "GSL-WWMX45-DMX22", powerW: 36, luminousFluxLm: "4PX", voltage: "220 V AC", ip: "IP66", dimensions: "94 cm", weightKg: "3.1 kg" },
  { model: "GSL-WWMX45-DMX22", powerW: 45, luminousFluxLm: "5PX", voltage: "220 V AC", ip: "IP66", dimensions: "116 cm", weightKg: "3.0 kg" },
];

const WALL_MODELS: readonly LedSeriesModel[] = [...WALL_STANDARD, ...WALL_DMX];

export function wallWasherSeriesContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  return {
    ...shared(market, "ger-led-wall-washer-lighting-systems", "GER-LED Wall Washer Lighting Systems"),
    metadata: { title: "GER-LED Wall Washer Lighting Systems | InfraVolt", description: ua ? "Каталожні стандартні та DMX світильники GER-LED wall washer для архітектурного фасадного та зовнішнього акцентного освітлення." : "Catalogue-verified standard and DMX GER-LED wall-washer luminaires for architectural facade and exterior accent lighting." },
    hero: { eyebrow: "GER-LED WALL WASHER", category: ua ? "Зовнішнє освітлення та освітлення інфраструктури" : "Outdoor & Infrastructure Lighting", title: "GER-LED Wall Washer Lighting Systems", description: ua ? "Лінійні архітектурні світильники заливаючого освітлення стін для фасадних і зовнішніх акцентних застосувань, з кількома довжинами, стандартними та DMX-кодованими конфігураціями." : "Linear architectural wall-washing luminaires for facade and exterior accent applications, with multiple lengths, standard and DMX-coded configurations.", ...heroActions(ua) },
    heroImage: WALL_WASHER_HERO_IMAGE,
    heroImageAlt: ua ? "Лінійний світильник GER-LED wall washer" : "GER-LED linear wall washer luminaire",
    heroBackgroundImage: WALL_WASHER_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: ua ? "Фасад будівлі, освітлений світильниками GER-LED wall washer" : "Building exterior illuminated by GER-LED wall-washer luminaires",
    technicalInformation: [
      { icon: "performance", title: cardTitle(ua, "performance"), values: [{ label: field(ua, "power"), value: "6–48 W" }, { label: ua ? "Довжина" : "Length", value: "19–124 cm" }, { label: ua ? "Дальність заливання" : "Wall-Washing Reach", value: "Up to 12 m" }] },
      { icon: "light-quality", title: cardTitle(ua, "light-quality"), values: [{ label: "CRI", value: "Ra >85" }, { label: ua ? "Колірна узгодженість" : "Colour Consistency", value: "3-step MacAdam" }, { label: field(ua, "application"), value: ua ? "Архітектурне заливаюче освітлення стін" : "Architectural wall washing" }] },
      { icon: "protection-electrical", title: cardTitle(ua, "protection-electrical"), values: [{ label: field(ua, "protection"), value: "IP66" }, { label: ua ? "Ударостійкість" : "Impact Resistance", value: "IK08" }, { label: ua ? "Робоча температура" : "Working Temperature", value: "−30 °C to +50 °C" }, { label: field(ua, "voltage"), value: "220 V AC" }] },
      { icon: "construction", title: cardTitle(ua, "construction-mounting"), values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Пресований алюміній" : "Aluminium extrusion" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "УФ-стійкий, ударостійкий PMMA" : "UV-resistant, impact-resistant PMMA" }, { label: ua ? "Монтаж" : "Mounting", value: ua ? "Бічний і прихований накладний" : "Side-surface and sub-surface" }] },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Пресований алюмінієвий корпус" : "Aluminium extrusion body" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP66 · IK08" },
      warrantyItem(ua, 5),
    ],
    sourceNote: ua ? "IP66 — основне значення специфікації, використане на цій сторінці. Каталог також показує піктограми конфігурацій IP20 / IP44 / IP66; це конфігураційні посилання, а не універсальні рейтинги для кожної моделі." : "IP66 is the main product-specification value used on this page. The catalogue also displays IP20 / IP44 / IP66 configuration icons; these are configuration references and are not universal ratings for every model.",
    modelsIntroduction: ua ? "Повний восьмирядковий каталожний розклад, що охоплює стандартні та DMX-кодовані варіанти wall washer. Повторювані рядки джерела та нотація полів джерела зберігаються без нормалізації." : "Complete eight-row catalogue schedule covering standard and DMX-coded wall-washer variants. Repeated source rows and source-field notation are preserved rather than normalised.",
    models: WALL_MODELS,
    modelsNote: ua ? "GSL-WWMX45-DMX22 з'являється в джерелі двічі з різними опублікованими конфігураціями. Обидва рядки збережено. 4PX та 5PX залишаються значеннями каталожного поля і не подаються як люмени." : "GSL-WWMX45-DMX22 appears twice in the source with different published configurations. Both rows are retained. 4PX and 5PX remain catalogue field values and are not presented as lumens.",
    modelsColumns: { model: ua ? "Модель / код каталогу" : "Model / Catalogue Code", power: field(ua, "power"), luminousFlux: ua ? "Каталожний вихід / поле джерела" : "Catalogue Output / Source Field", voltage: field(ua, "voltage"), dimensions: ua ? "Довжина" : "Length", ip: "IP", weight: field(ua, "weight") },
    modelsFilters: filters(market, "Search GER-LED wall-washer code", "Пошук за кодом GER-LED wall-washer"),
    familyTechnicalSection: { heading: ua ? "Архітектурне заливаюче освітлення стін" : "Architectural Wall-Washing", introduction: ua ? "Розроблено для архітектурних застосувань заливаючого освітлення стін; каталог вказує покриття фасаду до приблизно 12 м залежно від умов проєкту." : "Designed for architectural wall-washing applications, with the catalogue indicating facade coverage up to approximately 12 m depending on project conditions.", settings: [
      { label: ua ? "Дальність" : "Reach", value: "Up to 12 m", description: ua ? "Каталожне покриття заливаючого освітлення стін залежно від умов проєкту." : "Catalogue-indicated wall-washing coverage, subject to project conditions." },
      { label: ua ? "Монтаж" : "Mounting", value: ua ? "Бічний накладний · прихований накладний" : "Side-surface · sub-surface", description: ua ? "Два каталожні варіанти монтажу для архітектурної інтеграції." : "Two catalogue-listed mounting arrangements for architectural integration." },
      { label: ua ? "Конструкція" : "Construction", value: ua ? "Пресований алюмінієвий корпус" : "Aluminium extrusion body", description: ua ? "У поєднанні з УФ-стійким, ударостійким розсіювачем PMMA." : "Paired with a UV-resistant, impact-resistant PMMA diffuser." },
      { label: cardTitle(ua, "configuration"), value: ua ? "Стандартні · DMX-кодовані варіанти" : "Standard · DMX-coded variants", description: ua ? "Можливості керування залежать від обраного каталожного варіанта." : "Control capability follows the specified catalogue variant." },
    ], assets: [] },
    controlsHeading: ua ? "Керування та системні опції" : "Controls & System Options",
    controlsIntroduction: ua ? "Каталожні методи керування залежать від конфігурації і не подаються як стандартні для кожної моделі." : "Catalogue-listed control methods are configuration-dependent and are not presented as standard on every model.",
    controlOptions: [
      { icon: "control-dimmer", label: "1–10V", secondaryLabel: ua ? "Каталожна опція димування" : "Catalogue-listed dimming option" },
      { icon: "control-signal", label: ua ? "DMX-кодовані варіанти" : "DMX-coded variants", secondaryLabel: ua ? "Каталожні коди GSL-WWMX" : "GSL-WWMX catalogue codes" },
    ],
    technicalAssets: [
      { title: ua ? "Фотометричні дані" : "Photometric Data", image: WALL_WASHER_PHOTOMETRIC_IMAGE, imageAlt: ua ? "Фотометричні дані GER-LED wall washer" : "GER-LED wall washer photometric data" },
      { title: ua ? "Технічне / монтажне креслення" : "Technical / Mounting Drawing", image: WALL_WASHER_TECHNICAL_IMAGE, imageAlt: ua ? "Креслення деталей монтажу GER-LED wall washer" : "GER-LED wall washer mounting detail drawing" },
    ],
    dimensionNote: ua ? "Фотометричні та монтажні деталі показані для сімейства GER-LED Wall Washer; окремий розділ монтажу не використовується." : "Photometric and mounting detail shown for the GER-LED Wall Washer family; no separate installation section is used.",
    applications: [
      { icon: "office", title: ua ? "Фасад будівлі" : "Building Facade", description: ua ? "Лінійне заливаюче освітлення для зовнішнього фасаду будівлі." : "Linear wall washing for exterior building facade.", image: `${APPLICATION_IMAGE_BASE}/wall-washer-application-building-facade.webp`, imageAlt: ua ? "Фасад будівлі, освітлений GER-LED wall washer" : "Building facade illuminated by GER-LED wall washers" },
      { icon: "public-square", title: ua ? "Архітектурні стіни" : "Architectural Walls", description: ua ? "Акцентне освітлення зовнішніх архітектурних поверхонь." : "Accent illumination for exterior architectural surfaces.", image: `${APPLICATION_IMAGE_BASE}/wall-washer-application-architectural-walls.webp`, imageAlt: ua ? "Архітектурна стіна, освітлена GER-LED wall washer" : "Architectural wall illuminated by GER-LED wall washers" },
      { icon: "shopping-centre", title: ua ? "Торгові та комерційні будівлі" : "Shopping & Commercial Buildings", description: ua ? "Фасадне освітлення для торгових і комерційних середовищ." : "Facade lighting for shopping and commercial environments.", image: `${APPLICATION_IMAGE_BASE}/wall-washer-application-shopping-commercial-buildings.webp`, imageAlt: ua ? "Торгова та комерційна будівля, освітлена GER-LED wall washer" : "Shopping and commercial building illuminated by GER-LED wall washers" },
      { icon: "education", title: ua ? "Музеї та культурні будівлі" : "Museums & Cultural Buildings", description: ua ? "Архітектурне акцентне освітлення музеїв і культурних будівель." : "Architectural accent lighting for museums and cultural buildings.", image: `${APPLICATION_IMAGE_BASE}/wall-washer-application-museums-cultural-buildings.webp`, imageAlt: ua ? "Будівля музею, освітлена GER-LED wall washer" : "Museum building illuminated by GER-LED wall washers" },
      { icon: "public-square", title: ua ? "Релігійна / громадська архітектура" : "Religious / Civic Architecture", description: ua ? "Зовнішнє заливаюче освітлення релігійних і громадських об'єктів." : "Exterior wall washing for religious and civic sites.", image: `${APPLICATION_IMAGE_BASE}/wall-washer-application-religious-civic-architecture.webp`, imageAlt: ua ? "Релігійна будівля, освітлена GER-LED wall washer" : "Religious building illuminated by GER-LED wall washers" },
      { icon: "parks", title: ua ? "Зовнішнє акцентне освітлення" : "Exterior Accent Lighting", description: ua ? "Контрольоване зовнішнє акцентне освітлення для архітектурних проєктів." : "Controlled exterior accent illumination for architectural projects.", image: `${APPLICATION_IMAGE_BASE}/wall-washer-application-exterior-accent-lighting.webp`, imageAlt: ua ? "Зовнішнє акцентне освітлення GER-LED wall washer" : "Exterior accent lighting from GER-LED wall washers" },
    ],
    supportCta: { title: ua ? "Плануєте проєкт архітектурного заливаючого освітлення стін?" : "Planning an Architectural Wall-Washing Project?", description: ua ? "Обговоріть фасад, довжину, нотацію виходу та стандартну чи DMX-конфігурацію з нашою технічною командою." : "Discuss the facade, length, output notation and standard or DMX configuration with our technical team.", action: talkToTeam(ua) },
  };
}

import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/parking-waterproof");
const APPLICATION_ASSET_BASE = `${CATEGORY_ASSET_BASE}/applications`;
const CATEGORY_HREF = "/products/led-systems/parking-waterproof-lighting";

const MODELS: readonly LedSeriesModel[] = [
  { model: "LED-BUS LDB111", powerW: 11, luminousFluxLm: "1,750 lm", efficiencyLmW: "159.1 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "1.50 kg" },
  { model: "LED-BUS LDB118", powerW: 18, luminousFluxLm: "2,750 lm", efficiencyLmW: "152.8 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "1.50 kg" },
  { model: "LED-BUS LDB118-102", powerW: 18, luminousFluxLm: "2,750 lm", efficiencyLmW: "152.8 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.50 kg" },
  { model: "LED-BUS LDB118-120", powerW: 18, luminousFluxLm: "2,750 lm", efficiencyLmW: "152.8 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB118E-102", powerW: 18, luminousFluxLm: "2,450 lm", efficiencyLmW: "136.1 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB210", powerW: 20, luminousFluxLm: "2,675 lm", efficiencyLmW: "133.8 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB211", powerW: 22, luminousFluxLm: "3,130 lm", efficiencyLmW: "142.3 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB212", powerW: 24, luminousFluxLm: "3,230 lm", efficiencyLmW: "134.6 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.50 kg" },
  { model: "LED-BUS LDB212E-120", powerW: 24, luminousFluxLm: "3,130 lm", efficiencyLmW: "130.4 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB213", powerW: 26, luminousFluxLm: "3,750 lm", efficiencyLmW: "144.2 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.50 kg" },
  { model: "LED-BUS LDB213-120", powerW: 26, luminousFluxLm: "3,750 lm", efficiencyLmW: "144.2 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB215", powerW: 30, luminousFluxLm: "4,000 lm", efficiencyLmW: "133.3 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.50 kg" },
  { model: "LED-BUS LDB215-120", powerW: 30, luminousFluxLm: "4,000 lm", efficiencyLmW: "133.3 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB217-102", powerW: 34, luminousFluxLm: "5,033 lm", efficiencyLmW: "148.0 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.50 kg" },
  { model: "LED-BUS LDB218-120", powerW: 36, luminousFluxLm: "5,200 lm", efficiencyLmW: "144.4 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB220-152", powerW: 40, luminousFluxLm: "6,200 lm", efficiencyLmW: "155.0 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "3.15 kg" },
  { model: "LED-BUS LDB219", powerW: 38, luminousFluxLm: "5,750 lm", efficiencyLmW: "151.3 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB220-120", powerW: 40, luminousFluxLm: "5,800 lm", efficiencyLmW: "145.0 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB225", powerW: 50, luminousFluxLm: "7,150 lm", efficiencyLmW: "143.0 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB227", powerW: 54, luminousFluxLm: "8,500 lm", efficiencyLmW: "157.4 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB322-152", powerW: 66, luminousFluxLm: "9,500 lm", efficiencyLmW: "143.9 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "3.15 kg" },
  { model: "LED-BUS LDB235", powerW: 70, luminousFluxLm: "10,800 lm", efficiencyLmW: "154.3 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "2.75 kg" },
  { model: "LED-BUS LDB235-152", powerW: 70, luminousFluxLm: "10,800 lm", efficiencyLmW: "154.3 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "3.15 kg" },
  { model: "LED-BUS LDB235-350", powerW: 70, luminousFluxLm: "13,000 lm", efficiencyLmW: "185.7 lm/W", ip: "IP65", colourTemperature: "3000–6500 K", weightKg: "4.95 kg" },
].map((model) => ({ ...model, voltage: "220–240 Vac" }));

function siblingFamilies(current: string, market: MarketCode) {
  const ua = market === "ua";
  return [
    { slug: "led-bus-etange-carpark", name: "LED-BUS Etange Carpark", subtitle: ua ? "11–70 Вт · 24 моделі · IP65" : "11–70 W · 24 models · IP65", ...(current === "led-bus-etange-carpark" ? { isCurrent: true } : { href: `${CATEGORY_HREF}/led-bus-etange-carpark` }) },
    { slug: "led-bus-stepdim-waterproof", name: "LED-BUS StepDIM Waterproof", subtitle: ua ? "25–65 Вт · Радарний датчик 5,8 ГГц" : "25–65 W · 5.8 GHz radar sensor", ...(current === "led-bus-stepdim-waterproof" ? { isCurrent: true } : { href: `${CATEGORY_HREF}/led-bus-stepdim-waterproof` }) },
    { slug: "led-bus-etanj-pc", name: "LED-BUS Etanj PC", subtitle: ua ? "11–70 Вт · 18 моделей · IP65" : "11–70 W · 18 models · IP65", ...(current === "led-bus-etanj-pc" ? { isCurrent: true } : { href: `${CATEGORY_HREF}/led-bus-etanj-pc` }) },
  ];
}

const shared = {
  heroImage: `${CATEGORY_ASSET_BASE}/product/led-bus-etange-carpark-hero-product-transparent.webp`,
  heroBackgroundImage: `${CATEGORY_ASSET_BASE}/product/background/led-bus-etange-carpark-hero-background.webp`,
  models: MODELS,
  controlOptions: [
    { icon: "control-plc", label: "G-BUS PLC" },
    { icon: "control-dali", label: "DALI" },
    { icon: "control-touch-dim", label: "SwitchDIM" },
    { icon: "control-emergency", label: "Emergency Option" },
  ],
  technicalAssets: [
    { title: "Photometric Data", image: `${CATEGORY_ASSET_BASE}/photometric/led-bus-etange-technical-drawing-clean.png`, imageAlt: "Catalogue photometric distribution diagram for LED-BUS Etange Carpark" },
    { title: "Technical Drawing", image: `${CATEGORY_ASSET_BASE}/technical/led-bus-etange-photometric-data-clean.png`, imageAlt: "Catalogue technical drawing for LED-BUS Etange Carpark" },
  ],
} as const;

const content = {
  uk: {
    metadata: { title: "LED-BUS Etange Carpark | Parking & Waterproof Lighting | InfraVolt", description: "LED-BUS Etange Carpark IP65 linear lighting, with 24 catalogue models from 11–70 W." },
    breadcrumbs: { home: "Home", products: "Products", ledSystems: "LED Systems", category: "Parking & Waterproof Lighting", current: "LED-BUS Etange Carpark" },
    backToCategoryLabel: "Back to Parking & Waterproof Lighting",
    hero: { eyebrow: "LED-BUS ETANGE CARPARK", category: "Parking & Waterproof Lighting", title: "LED-BUS Etange Carpark", description: "IP65 linear LED luminaires for car parks, offices, retail, education spaces and corridors, with anodised construction and a satin opal PS diffuser.", primaryAction: "Request Technical Pack", secondaryAction: "Download PDF Catalogue" },
    ...shared,
    heroImageAlt: "LED-BUS Etange Carpark linear luminaire from the source catalogue",
    heroBackgroundImageAlt: "LED-BUS Etange Carpark luminaires installed in a covered car park",
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      { icon: "performance", title: "Performance", values: [{ label: "Power", value: "11–70 W" }, { label: "Luminous Flux", value: "1,750–13,000 lm" }, { label: "Efficiency", value: "130.4–185.7 lm/W" }] },
      { icon: "light-quality", title: "Light Quality", values: [{ label: "CCT", value: "3000–6500 K" }, { label: "Colour Tolerance", value: "MacAdam 3" }, { label: "Light Distribution", value: "Uniform illumination" }] },
      { icon: "protection-electrical", title: "Protection & Electrical", values: [{ label: "Supply", value: "220–240 Vac · 50–60 Hz" }, { label: "Power Factor", value: ">0.95" }, { label: "Protection", value: "IP65" }, { label: "Operating Temperature", value: "−20°C to +55°C" }] },
      { icon: "construction", title: "Construction", values: [{ label: "Body & End Covers", value: "Anodised" }, { label: "Finish", value: "Polyester electrostatic powder coating" }, { label: "Diffuser", value: "Satin opal PS" }] },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: "Colour & Finish", value: "White · Grey · Black · Other RAL colours on request" },
      { icon: "compliance", label: "Compliance", value: "IP65" },
      { icon: "warranty", label: "Warranty", value: "5-Year Warranty" },
    ],
    sourceNote: "Luminous-flux values are identified as reference values in the source catalogue.",
    modelsHeading: "Models & Technical Schedule",
    modelsIntroduction: "Complete 24-model catalogue schedule. Search, filter, copy an exact model code or add it to an enquiry.",
    modelsColumns: { model: "Model / Order Code", power: "Power", luminousFlux: "Luminous Flux", efficiency: "Efficiency", voltage: "Voltage", colourTemperature: "CCT", ip: "IP", weight: "Weight" },
    modelsFilters: { searchLabel: "Search", searchPlaceholder: "Search exact model code", powerFilterLabel: "Power", allPowersLabel: "All powers", weightFilterLabel: "Weight", clearFiltersLabel: "Clear filters", noResultsLabel: "No models match your search.", downloadCsvLabel: "Download CSV", mobileFiltersToggleLabel: "Filter & Search", mobileApplyFiltersLabel: "Apply Filters", mobileViewAllPrefix: "View All", mobileViewFilteredPrefix: "View", mobileHidePrefix: "Hide Models", modelsCountSuffix: "Models", copyModelCodeAction: "Copy model code", copiedLabel: "Copied", enquiryColumnLabel: "Enquiry", enquiryAddAction: "Add to Enquiry", enquiryRemoveAction: "Remove from Enquiry" },
    controlsHeading: "Controls & System Options",
    controlsIntroduction: "Catalogue-listed options for this family; final configuration is project-dependent.",
    photometricHeading: "Photometric & Technical Data",
    dimensionNote: "The source drawing uses a variable overall length L; catalogue code suffixes are not mapped to explicit dimensions on this page.",
    applicationsHeading: "Typical Applications",
    applications: [
      { icon: "parking", title: "Car Parks", description: "Covered parking areas requiring protected linear lighting.", image: `${APPLICATION_ASSET_BASE}/multi-storey-parking-application.webp`, imageAlt: "Covered car park interior beneath linear ceiling lighting" },
      { icon: "office", title: "Offices", description: "Linear general lighting for office and support spaces.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-offices.webp`, imageAlt: "Office interior illuminated by LED-BUS Etange Carpark linear lighting" },
      { icon: "retail", title: "Retail Spaces", description: "Uniform lighting for markets and retail interiors.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-markets-retail.webp`, imageAlt: "Retail interior illuminated by LED-BUS Etange Carpark linear lighting" },
      { icon: "education", title: "Education & Corridors", description: "Continuous lighting for education areas and circulation routes.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-education-corridors.webp`, imageAlt: "Education corridor illuminated by LED-BUS Etange Carpark linear lighting" },
    ],
    siblingFamiliesHeading: "Other Parking & Waterproof Families", siblingViewSeriesLabel: "View Series", currentFamilyBadgeLabel: "Current family", siblingFamilies: siblingFamilies("led-bus-etange-carpark", "uk"),
    supportCta: { title: "Planning a car-park lighting project?", description: "Request technical support for model selection, controls and project specification.", action: "Request Technical Support" },
  },
  ua: {
    metadata: { title: "LED-BUS Etange Carpark | Освітлення паркінгів та вологозахищене освітлення | InfraVolt", description: "Лінійне освітлення LED-BUS Etange Carpark IP65: 24 каталожні моделі 11–70 Вт." },
    breadcrumbs: { home: "Головна", products: "Продукція", ledSystems: "LED-системи", category: "Освітлення паркінгів та вологозахищене освітлення", current: "LED-BUS Etange Carpark" },
    backToCategoryLabel: "Назад до освітлення паркінгів",
    hero: { eyebrow: "LED-BUS ETANGE CARPARK", category: "Освітлення паркінгів та вологозахищене освітлення", title: "LED-BUS Etange Carpark", description: "Лінійні LED-світильники IP65 для паркінгів, офісів, магазинів, освітніх приміщень і коридорів з анодованою конструкцією та сатиновим опаловим PS-дифузором.", primaryAction: "Запросити технічний пакет", secondaryAction: "Завантажити PDF-каталог" },
    ...shared,
    heroImageAlt: "Лінійний світильник LED-BUS Etange Carpark із каталогу",
    heroBackgroundImageAlt: "Світильники LED-BUS Etange Carpark у критому паркінгу",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      { icon: "performance", title: "Продуктивність", values: [{ label: "Потужність", value: "11–70 Вт" }, { label: "Світловий потік", value: "1 750–13 000 лм" }, { label: "Ефективність", value: "130,4–185,7 лм/Вт" }] },
      { icon: "light-quality", title: "Якість світла", values: [{ label: "CCT", value: "3000–6500 K" }, { label: "Допуск кольору", value: "MacAdam 3" }, { label: "Розподіл", value: "Рівномірне освітлення" }] },
      { icon: "protection-electrical", title: "Захист та електрика", values: [{ label: "Живлення", value: "220–240 Vac · 50–60 Гц" }, { label: "Коефіцієнт потужності", value: ">0,95" }, { label: "Захист", value: "IP65" }, { label: "Робоча температура", value: "−20°C до +55°C" }] },
      { icon: "construction", title: "Конструкція", values: [{ label: "Корпус і кришки", value: "Анодовані" }, { label: "Покриття", value: "Поліестерне електростатичне порошкове" }, { label: "Дифузор", value: "Сатиновий опаловий PS" }] },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: "Колір і покриття", value: "Білий · Сірий · Чорний · Інші RAL на запит" },
      { icon: "compliance", label: "Відповідність", value: "IP65" },
      { icon: "warranty", label: "Гарантія", value: "5 років гарантії" },
    ],
    sourceNote: "Світлові потоки позначені в каталозі як довідкові значення.",
    modelsHeading: "Моделі та технічна таблиця",
    modelsIntroduction: "Повна каталожна таблиця з 24 моделей.",
    modelsColumns: { model: "Модель / код", power: "Потужність", luminousFlux: "Світловий потік", efficiency: "Ефективність", voltage: "Напруга", colourTemperature: "CCT", ip: "IP", weight: "Маса" },
    modelsFilters: { searchLabel: "Пошук", searchPlaceholder: "Точний код моделі", powerFilterLabel: "Потужність", allPowersLabel: "Усі потужності", weightFilterLabel: "Маса", clearFiltersLabel: "Очистити", noResultsLabel: "Моделей не знайдено.", downloadCsvLabel: "Завантажити CSV", mobileFiltersToggleLabel: "Фільтр і пошук", mobileApplyFiltersLabel: "Застосувати", mobileViewAllPrefix: "Показати всі", mobileViewFilteredPrefix: "Показати", mobileHidePrefix: "Сховати моделі", modelsCountSuffix: "Моделей", copyModelCodeAction: "Копіювати код", copiedLabel: "Скопійовано", enquiryColumnLabel: "Запит", enquiryAddAction: "Додати до запиту", enquiryRemoveAction: "Видалити із запиту" },
    controlsHeading: "Керування та системні опції", controlsIntroduction: "Опції, наведені в каталозі для цього сімейства; фінальна конфігурація залежить від проєкту.",
    photometricHeading: "Фотометричні та технічні дані", dimensionNote: "На кресленні загальна довжина позначена змінною L; суфікси кодів не зіставлені з точними розмірами.",
    applicationsHeading: "Типові застосування",
    applications: [
      { icon: "parking", title: "Паркінги", description: "Криті паркінги, де потрібне захищене лінійне освітлення.", image: `${APPLICATION_ASSET_BASE}/multi-storey-parking-application.webp`, imageAlt: "Критий паркінг із лінійним стельовим освітленням" },
      { icon: "office", title: "Офіси", description: "Лінійне загальне освітлення офісних і допоміжних приміщень.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-offices.webp`, imageAlt: "Офіс із лінійним освітленням LED-BUS Etange Carpark" },
      { icon: "retail", title: "Торговельні приміщення", description: "Рівномірне освітлення магазинів і торговельних інтер’єрів.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-markets-retail.webp`, imageAlt: "Торговельний інтер’єр із лінійним освітленням LED-BUS Etange Carpark" },
      { icon: "education", title: "Освіта та коридори", description: "Безперервне освітлення навчальних зон і шляхів руху.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-education-corridors.webp`, imageAlt: "Навчальний коридор із лінійним освітленням LED-BUS Etange Carpark" },
    ],
    siblingFamiliesHeading: "Інші сімейства паркінгового та вологозахищеного освітлення", siblingViewSeriesLabel: "Переглянути серію", currentFamilyBadgeLabel: "Поточне сімейство", siblingFamilies: siblingFamilies("led-bus-etange-carpark", "ua"),
    supportCta: { title: "Плануєте освітлення паркінгу?", description: "Запросіть технічну підтримку з вибору моделі, керування та специфікації.", action: "Запросити технічну підтримку" },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function ledBusEtangeCarparkContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel, LedSiblingFamily } from "../types";

const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/parking-waterproof");
const APPLICATION_ASSET_BASE = `${CATEGORY_ASSET_BASE}/applications`;
const CATEGORY_HREF = "/products/led-systems/parking-waterproof-lighting";

const MODELS: readonly LedSeriesModel[] = [
  { model: "730-LDB11-60/PC", powerW: 11, luminousFluxLm: "1,705 lm", efficiencyLmW: "155 lm/W" },
  { model: "730-LDB118-60/PC", powerW: 18, luminousFluxLm: "2,700 lm", efficiencyLmW: "150 lm/W" },
  { model: "730-LDB210-60/PC", powerW: 20, luminousFluxLm: "2,700 lm", efficiencyLmW: "135 lm/W" },
  { model: "730-LDB211-100/PC", powerW: 22, luminousFluxLm: "3,190 lm", efficiencyLmW: "145 lm/W" },
  { model: "730-LDB212-100/PC", powerW: 24, luminousFluxLm: "3,240 lm", efficiencyLmW: "135 lm/W" },
  { model: "730-LDB213-120/PC", powerW: 26, luminousFluxLm: "3,510 lm", efficiencyLmW: "135 lm/W" },
  { model: "730-LDB215-120/PC", powerW: 30, luminousFluxLm: "4,080 lm", efficiencyLmW: "136 lm/W" },
  { model: "730-LDB216-120/PC", powerW: 30, luminousFluxLm: "4,080 lm", efficiencyLmW: "136 lm/W" },
  { model: "730-LDB218-120/PC", powerW: 36, luminousFluxLm: "5,032 lm", efficiencyLmW: "148 lm/W" },
  { model: "730-LDB217-152/PC", powerW: 34, luminousFluxLm: "5,032 lm", efficiencyLmW: "148 lm/W" },
  { model: "730-LDB219-120/PC", powerW: 38, luminousFluxLm: "5,776 lm", efficiencyLmW: "152 lm/W" },
  { model: "730-LDB220-120/PC", powerW: 40, luminousFluxLm: "5,800 lm", efficiencyLmW: "145 lm/W" },
  { model: "730-LDB225-150/PC", powerW: 50, luminousFluxLm: "7,250 lm", efficiencyLmW: "145 lm/W" },
  { model: "730-LDB227-150/PC", powerW: 54, luminousFluxLm: "8,532 lm", efficiencyLmW: "158 lm/W" },
  { model: "730-LDB230-150/PC", powerW: 66, luminousFluxLm: "9,570 lm", efficiencyLmW: "145 lm/W" },
  { model: "730-LDB235-150/PC", powerW: 70, luminousFluxLm: "10,850 lm", efficiencyLmW: "155 lm/W" },
  { model: "730-LDB250-150/PC", powerW: 70, luminousFluxLm: "10,850 lm", efficiencyLmW: "155 lm/W" },
  { model: "730-LDB220-120-SD/PC", powerW: 70, luminousFluxLm: "10,850 lm", efficiencyLmW: "155 lm/W" },
].map((model) => ({ ...model, voltage: "220–240 Vac", ip: "IP65", colourTemperature: "3000–6500 K" }));

function siblings(current: string, ua: boolean): readonly LedSiblingFamily[] {
  return [
    { slug: "led-bus-etange-carpark", name: "LED-BUS Etange Carpark", subtitle: ua ? "11–70 Вт · 24 моделі · IP65" : "11–70 W · 24 models · IP65", ...(current === "led-bus-etange-carpark" ? { isCurrent: true } : { href: `${CATEGORY_HREF}/led-bus-etange-carpark` }) },
    { slug: "led-bus-stepdim-waterproof", name: "LED-BUS StepDIM Waterproof", subtitle: ua ? "25–65 Вт · Радарний датчик 5,8 ГГц" : "25–65 W · 5.8 GHz radar sensor", ...(current === "led-bus-stepdim-waterproof" ? { isCurrent: true } : { href: `${CATEGORY_HREF}/led-bus-stepdim-waterproof` }) },
    { slug: "led-bus-etanj-pc", name: "LED-BUS Etanj PC", subtitle: ua ? "11–70 Вт · 18 моделей · IP65" : "11–70 W · 18 models · IP65", ...(current === "led-bus-etanj-pc" ? { isCurrent: true } : { href: `${CATEGORY_HREF}/led-bus-etanj-pc` }) },
  ];
}

const shared = {
  heroImage: `${CATEGORY_ASSET_BASE}/product/led-bus-etanj-pc-hero-product-transparent.webp`,
  heroBackgroundImage: `${CATEGORY_ASSET_BASE}/product/background/led-bus-etanj-pc-hero-background.webp`,
  models: MODELS,
  controlOptions: [
    { icon: "control-dali", label: "DALI" },
    { icon: "control-touch-dim", label: "SwitchDIM" },
    { icon: "control-emergency", label: "Emergency Option" },
  ],
  technicalAssets: [
    { title: "Photometric Data", image: `${CATEGORY_ASSET_BASE}/photometric/led-bus-etanj-pc-photometric-data-clean.png`, imageAlt: "Catalogue photometric distribution diagram for LED-BUS Etanj PC" },
    { title: "Technical Drawing", image: `${CATEGORY_ASSET_BASE}/technical/led-bus-etanj-pc-technical-drawing-clean.png`, imageAlt: "Catalogue technical drawing for LED-BUS Etanj PC" },
  ],
} as const;

const filters = { searchLabel: "Search", searchPlaceholder: "Search exact model code", powerFilterLabel: "Power", allPowersLabel: "All powers", clearFiltersLabel: "Clear filters", noResultsLabel: "No models match your search.", downloadCsvLabel: "Download CSV", mobileFiltersToggleLabel: "Filter & Search", mobileApplyFiltersLabel: "Apply Filters", mobileViewAllPrefix: "View All", mobileViewFilteredPrefix: "View", mobileHidePrefix: "Hide Models", modelsCountSuffix: "Models", copyModelCodeAction: "Copy model code", copiedLabel: "Copied", enquiryColumnLabel: "Enquiry", enquiryAddAction: "Add to Enquiry", enquiryRemoveAction: "Remove from Enquiry" } as const;

const content = {
  uk: {
    metadata: { title: "LED-BUS Etanj PC | Parking & Waterproof Lighting | InfraVolt", description: "LED-BUS Etanj PC IP65 linear lighting, with 18 exact catalogue models from 11–70 W." },
    breadcrumbs: { home: "Home", products: "Products", ledSystems: "LED Systems", category: "Parking & Waterproof Lighting", current: "LED-BUS Etanj PC" },
    backToCategoryLabel: "Back to Parking & Waterproof Lighting",
    hero: { eyebrow: "LED-BUS ETANJ PC", category: "Parking & Waterproof Lighting", title: "LED-BUS Etanj PC", description: "IP65 linear LED luminaires for car parks, offices, markets, education spaces and corridors, with a powder-coated body and satin opal PS diffuser.", primaryAction: "Request Technical Pack", secondaryAction: "Download PDF Catalogue" },
    ...shared,
    heroImageAlt: "LED-BUS Etanj PC linear luminaire from the source catalogue", heroBackgroundImageAlt: "LED-BUS Etanj PC lighting in a covered car park",
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      { icon: "performance", title: "Performance", values: [{ label: "Power", value: "11–70 W" }, { label: "Luminous Flux", value: "1,705–10,850 lm" }, { label: "Efficiency", value: "135–158 lm/W" }] },
      { icon: "light-quality", title: "Light Quality", values: [{ label: "CCT", value: "3000–6500 K" }, { label: "Colour Tolerance", value: "MacAdam 3" }, { label: "Distribution", value: "Uniform illumination" }] },
      { icon: "protection-electrical", title: "Protection & Electrical", values: [{ label: "Supply", value: "220–240 Vac · 50–60 Hz" }, { label: "Power Factor", value: ">0.95" }, { label: "Protection", value: "IP65" }, { label: "Operating Temperature", value: "−20°C to +55°C" }] },
      { icon: "construction", title: "Construction", values: [{ label: "Body", value: "Polyester electrostatic powder coating" }, { label: "Diffuser", value: "Satin opal PS" }] },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: "Colour & Finish", value: "White · Grey · Other RAL colours on request" },
      { icon: "compliance", label: "Compliance", value: "IP65" },
      { icon: "warranty", label: "Warranty", value: "7-Year Warranty" },
    ],
    sourceNote: "The catalogue's CRI entry is internally inconsistent and is therefore not reproduced. Luminous-flux values are catalogue reference values.",
    modelsHeading: "Models & Technical Schedule", modelsIntroduction: "Complete 18-model catalogue schedule with exact order codes.",
    modelsColumns: { model: "Model / Order Code", power: "Power", luminousFlux: "Luminous Flux", efficiency: "Efficiency", voltage: "Voltage", colourTemperature: "CCT", ip: "IP" }, modelsFilters: filters,
    controlsHeading: "Controls & System Options", controlsIntroduction: "Catalogue-listed options for this family; final configuration is project-dependent.",
    photometricHeading: "Photometric & Technical Data", dimensionNote: "The source drawing uses a variable overall length L; no unverified model-to-dimension mapping is shown.",
    applicationsHeading: "Typical Applications", applications: [
      { icon: "parking", title: "Car Parks", description: "Protected linear lighting for covered parking areas.", image: `${APPLICATION_ASSET_BASE}/multi-storey-parking-application.webp`, imageAlt: "Covered car park interior beneath linear ceiling lighting" },
      { icon: "office", title: "Offices", description: "General linear lighting for office and support spaces.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-offices.webp`, imageAlt: "Office interior illuminated by protected linear LED lighting" },
      { icon: "retail", title: "Markets & Retail", description: "Uniform lighting for markets and retail interiors.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-markets-retail.webp`, imageAlt: "Retail interior illuminated by protected linear LED lighting" },
      { icon: "education", title: "Education & Corridors", description: "Continuous lighting for education areas and circulation routes.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-education-corridors.webp`, imageAlt: "Education corridor illuminated by protected linear LED lighting" },
    ],
    siblingFamiliesHeading: "Other Parking & Waterproof Families", siblingViewSeriesLabel: "View Series", currentFamilyBadgeLabel: "Current family", siblingFamilies: siblings("led-bus-etanj-pc", false),
    supportCta: { title: "Planning protected linear lighting?", description: "Request technical support for model selection, controls and project specification.", action: "Request Technical Support" },
  },
  ua: {
    metadata: { title: "LED-BUS Etanj PC | Освітлення паркінгів | InfraVolt", description: "Лінійне освітлення LED-BUS Etanj PC IP65: 18 точних каталожних моделей 11–70 Вт." },
    breadcrumbs: { home: "Головна", products: "Продукція", ledSystems: "LED-системи", category: "Освітлення паркінгів та вологозахищене освітлення", current: "LED-BUS Etanj PC" }, backToCategoryLabel: "Назад до освітлення паркінгів",
    hero: { eyebrow: "LED-BUS ETANJ PC", category: "Освітлення паркінгів та вологозахищене освітлення", title: "LED-BUS Etanj PC", description: "Лінійні LED-світильники IP65 для паркінгів, офісів, магазинів, навчальних приміщень і коридорів із порошковим покриттям корпусу та сатиновим опаловим PS-дифузором.", primaryAction: "Запросити технічний пакет", secondaryAction: "Завантажити PDF-каталог" },
    ...shared,
    heroImageAlt: "Лінійний світильник LED-BUS Etanj PC із каталогу", heroBackgroundImageAlt: "Освітлення LED-BUS Etanj PC у критому паркінгу",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      { icon: "performance", title: "Продуктивність", values: [{ label: "Потужність", value: "11–70 Вт" }, { label: "Світловий потік", value: "1 705–10 850 лм" }, { label: "Ефективність", value: "135–158 лм/Вт" }] },
      { icon: "light-quality", title: "Якість світла", values: [{ label: "CCT", value: "3000–6500 K" }, { label: "Допуск кольору", value: "MacAdam 3" }, { label: "Розподіл", value: "Рівномірне освітлення" }] },
      { icon: "protection-electrical", title: "Захист та електрика", values: [{ label: "Живлення", value: "220–240 Vac · 50–60 Гц" }, { label: "Коефіцієнт потужності", value: ">0,95" }, { label: "Захист", value: "IP65" }, { label: "Температура", value: "−20°C до +55°C" }] },
      { icon: "construction", title: "Конструкція", values: [{ label: "Корпус", value: "Поліестерне електростатичне порошкове покриття" }, { label: "Дифузор", value: "Сатиновий опаловий PS" }] },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: "Колір і покриття", value: "Білий · Сірий · Інші RAL на запит" },
      { icon: "compliance", label: "Відповідність", value: "IP65" },
      { icon: "warranty", label: "Гарантія", value: "7 років гарантії" },
    ], sourceNote: "Каталожний запис CRI внутрішньо суперечливий, тому його не відтворено. Світлові потоки є довідковими значеннями каталогу.",
    modelsHeading: "Моделі та технічна таблиця", modelsIntroduction: "Повна каталожна таблиця з 18 точними кодами.", modelsColumns: { model: "Модель / код", power: "Потужність", luminousFlux: "Світловий потік", efficiency: "Ефективність", voltage: "Напруга", colourTemperature: "CCT", ip: "IP" }, modelsFilters: { ...filters, searchLabel: "Пошук", searchPlaceholder: "Точний код моделі", powerFilterLabel: "Потужність", allPowersLabel: "Усі потужності", clearFiltersLabel: "Очистити", noResultsLabel: "Моделей не знайдено.", downloadCsvLabel: "Завантажити CSV", modelsCountSuffix: "Моделей" },
    controlsHeading: "Керування та системні опції", controlsIntroduction: "Каталожні опції для сімейства; остаточна конфігурація залежить від проєкту.", photometricHeading: "Фотометричні та технічні дані", dimensionNote: "На кресленні загальна довжина позначена змінною L; неперевірене зіставлення моделей і розмірів не показано.",
    applicationsHeading: "Типові застосування", applications: [
      { icon: "parking", title: "Паркінги", description: "Захищене лінійне освітлення критих паркінгів.", image: `${APPLICATION_ASSET_BASE}/multi-storey-parking-application.webp`, imageAlt: "Критий паркінг із лінійним стельовим освітленням" },
      { icon: "office", title: "Офіси", description: "Загальне лінійне освітлення офісів.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-offices.webp`, imageAlt: "Офіс із захищеним лінійним LED-освітленням" }, { icon: "retail", title: "Магазини", description: "Рівномірне освітлення торговельних приміщень.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-markets-retail.webp`, imageAlt: "Торговельний інтер’єр із захищеним лінійним LED-освітленням" }, { icon: "education", title: "Освіта та коридори", description: "Безперервне освітлення навчальних зон і шляхів руху.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-education-corridors.webp`, imageAlt: "Навчальний коридор із захищеним лінійним LED-освітленням" },
    ],
    siblingFamiliesHeading: "Інші сімейства", siblingViewSeriesLabel: "Переглянути серію", currentFamilyBadgeLabel: "Поточне сімейство", siblingFamilies: siblings("led-bus-etanj-pc", true), supportCta: { title: "Плануєте захищене лінійне освітлення?", description: "Запросіть підтримку з вибору моделі, керування та специфікації.", action: "Запросити технічну підтримку" },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function ledBusEtanjPcContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

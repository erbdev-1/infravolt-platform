import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel, LedSiblingFamily } from "../types";

const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/parking-waterproof");
const APPLICATION_ASSET_BASE = `${CATEGORY_ASSET_BASE}/applications`;
const STEPDIM_TECHNICAL_ASSET_BASE = `${CATEGORY_ASSET_BASE}/technical/stepdim`;
const CATEGORY_HREF = "/products/led-systems/parking-waterproof-lighting";

const MODELS: readonly LedSeriesModel[] = [
  { model: "LDB212-120", powerW: 25 },
  { model: "LDB217-120", powerW: 35 },
  { model: "LDB225-150", powerW: 50 },
  { model: "LDB230-150", powerW: 65 },
];

function siblings(current: string, ua: boolean): readonly LedSiblingFamily[] {
  return [
    { slug: "led-bus-etange-carpark", name: "LED-BUS Etange Carpark", subtitle: ua ? "11–70 Вт · 24 моделі · IP65" : "11–70 W · 24 models · IP65", ...(current === "led-bus-etange-carpark" ? { isCurrent: true } : { href: `${CATEGORY_HREF}/led-bus-etange-carpark` }) },
    { slug: "led-bus-stepdim-waterproof", name: "LED-BUS StepDIM Waterproof", subtitle: ua ? "25–65 Вт · Радарний датчик 5,8 ГГц" : "25–65 W · 5.8 GHz radar sensor", ...(current === "led-bus-stepdim-waterproof" ? { isCurrent: true } : { href: `${CATEGORY_HREF}/led-bus-stepdim-waterproof` }) },
    { slug: "led-bus-etanj-pc", name: "LED-BUS Etanj PC", subtitle: ua ? "11–70 Вт · 18 моделей · IP65" : "11–70 W · 18 models · IP65", ...(current === "led-bus-etanj-pc" ? { isCurrent: true } : { href: `${CATEGORY_HREF}/led-bus-etanj-pc` }) },
  ];
}

const shared = {
  heroImage: `${CATEGORY_ASSET_BASE}/product/led-bus-stepdim-waterproof-hero-product-transparent.webp`,
  heroBackgroundImage: `${CATEGORY_ASSET_BASE}/product/background/led-bus-stepdim-waterproof-hero-background.webp`,
  models: MODELS,
  controlOptions: [
    { icon: "control-sensor", label: "5.8 GHz Radar Sensor" },
    { icon: "control-dimmer", label: "Dimmable LED Driver" },
    { icon: "control-signal", label: "Daylight Threshold" },
  ],
  technicalAssets: [
    { title: "Photometric Data", image: `${CATEGORY_ASSET_BASE}/photometric/stepdim-photometric-data.png`, imageAlt: "Catalogue photometric data for LED-BUS StepDIM Waterproof" },
    { title: "Technical Data", image: `${CATEGORY_ASSET_BASE}/technical/stepdim-technical-data.png`, imageAlt: "Catalogue technical data for LED-BUS StepDIM Waterproof" },
  ],
} as const;

const commonFilters = {
  searchLabel: "Search", searchPlaceholder: "Search exact model code", powerFilterLabel: "Power", allPowersLabel: "All powers", clearFiltersLabel: "Clear filters", noResultsLabel: "No models match your search.", downloadCsvLabel: "Download CSV", mobileFiltersToggleLabel: "Filter & Search", mobileApplyFiltersLabel: "Apply Filters", mobileViewAllPrefix: "View All", mobileViewFilteredPrefix: "View", mobileHidePrefix: "Hide Models", modelsCountSuffix: "Models", copyModelCodeAction: "Copy model code", copiedLabel: "Copied", enquiryColumnLabel: "Enquiry", enquiryAddAction: "Add to Enquiry", enquiryRemoveAction: "Remove from Enquiry",
} as const;

const content = {
  uk: {
    metadata: { title: "LED-BUS StepDIM Waterproof | Parking & Waterproof Lighting | InfraVolt", description: "LED-BUS StepDIM Waterproof radar-controlled car-park lighting in four catalogue models from 25–65 W." },
    breadcrumbs: { home: "Home", products: "Products", ledSystems: "LED Systems", category: "Parking & Waterproof Lighting", current: "LED-BUS StepDIM Waterproof" },
    backToCategoryLabel: "Back to Parking & Waterproof Lighting",
    hero: { eyebrow: "LED-BUS STEPDIM WATERPROOF", category: "Parking & Waterproof Lighting", title: "LED-BUS StepDIM Waterproof", description: "Car-park lighting with an integrated 5.8 GHz radar sensor and dimmable LED driver for presence- and daylight-responsive operation.", primaryAction: "Request Technical Pack", secondaryAction: "Download PDF Catalogue" },
    ...shared,
    heroImageAlt: "Four LED-BUS StepDIM Waterproof catalogue luminaires with exact model codes and wattages",
    heroBackgroundImageAlt: "LED-BUS StepDIM Waterproof lighting installed in a car park",
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      { icon: "performance", title: "Product Range", values: [{ label: "Power", value: "25–65 W" }, { label: "Models", value: "4 catalogue models" }] },
      { icon: "construction", title: "Construction", values: [{ label: "Body", value: "Aluminium extrusion case" }, { label: "Diffuser", value: "Opal PMMA" }] },
      { icon: "control-system", title: "Control System", values: [{ label: "Driver", value: "Dimmable LED driver" }, { label: "Sensor", value: "Integrated 5.8 GHz radar" }] },
      { icon: "integration", title: "Detection", values: [{ label: "Detection Angle", value: "150°" }, { label: "Mounting Height", value: "5 m catalogue example" }, { label: "Maximum Span", value: "8 m" }] },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: "Colour & Finish", value: "Aluminium extrusion case" },
      { icon: "warranty", label: "Warranty", value: "5-Year Warranty" },
    ],
    modelsHeading: "Models & Technical Schedule",
    modelsIntroduction: "The complete four-model schedule exactly as listed in the source catalogue. Unspecified electrical and photometric fields are intentionally omitted.",
    modelsColumns: { model: "Model / Order Code", power: "Power" },
    modelsFilters: commonFilters,
    familyTechnicalSection: {
      heading: "StepDIM Sensor & Dimming Behaviour",
      introduction: "Catalogue-defined radar, daylight and standby settings for automatic car-park lighting operation.",
      settings: [
        { label: "Detection light", value: "50% or 100%", description: "Selectable light level when presence is detected." },
        { label: "Standby time", value: "5 s · 90 s · 5 min · 10 min", description: "Selectable hold time after detection." },
        { label: "Daylight threshold", value: "30–50 lux or disabled", description: "Daylight-dependent activation can be selected or disabled." },
        { label: "Inactive low level", value: "10% or 30%", description: "Selectable reduced output after the standby period." },
        { label: "After inactivity", value: "Off after 10 min or continuous low level", description: "The luminaire can switch off or remain at the selected 10%/30% level." },
      ],
      assets: [
        { title: "Control Settings", image: `${STEPDIM_TECHNICAL_ASSET_BASE}/led-bus-stepdim-waterproof-control-settings.png`, imageAlt: "Catalogue control settings for LED-BUS StepDIM Waterproof" },
        { title: "Component Detail", image: `${STEPDIM_TECHNICAL_ASSET_BASE}/led-bus-stepdim-waterproof-component-detail.png`, imageAlt: "Catalogue component detail for LED-BUS StepDIM Waterproof" },
        { title: "Sensor Coverage", image: `${STEPDIM_TECHNICAL_ASSET_BASE}/led-bus-stepdim-waterproof-sensor-coverage.png`, imageAlt: "Catalogue sensor coverage diagram for LED-BUS StepDIM Waterproof" },
        { title: "LED Module Installation", image: `${STEPDIM_TECHNICAL_ASSET_BASE}/led-bus-stepdim-waterproof-led-module-installation.png`, imageAlt: "Catalogue LED module installation detail for LED-BUS StepDIM Waterproof" },
      ],
    },
    controlsHeading: "Controls & System Options",
    controlsIntroduction: "Integrated catalogue hardware and selectable operating thresholds; final commissioning settings are project-specific.",
    photometricHeading: "Photometric & Technical Data",
    dimensionNote: "Dedicated StepDIM photometric, technical, component, control, installation and sensor-coverage assets are shown without inferred dimensions.",
    applicationsHeading: "Typical Applications",
    applications: [
      { icon: "parking", title: "Car Parks", description: "Presence- and daylight-responsive lighting for covered parking areas.", image: `${APPLICATION_ASSET_BASE}/multi-storey-parking-application.webp`, imageAlt: "Covered car park interior beneath linear ceiling lighting" },
      { icon: "office", title: "Offices", description: "Sensor-controlled linear lighting for office and support spaces.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-offices.webp`, imageAlt: "Office interior illuminated by linear LED lighting" },
      { icon: "retail", title: "Markets & Retail", description: "Responsive linear lighting for markets and retail interiors.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-markets-retail.webp`, imageAlt: "Market and retail interior illuminated by linear LED lighting" },
      { icon: "education", title: "Education & Corridors", description: "Presence-responsive lighting for education areas and circulation routes.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-education-corridors.webp`, imageAlt: "Education corridor illuminated by linear LED lighting" },
    ],
    siblingFamiliesHeading: "Other Parking & Waterproof Families", siblingViewSeriesLabel: "View Series", currentFamilyBadgeLabel: "Current family", siblingFamilies: siblings("led-bus-stepdim-waterproof", false),
    supportCta: { title: "Planning sensor-controlled car-park lighting?", description: "Request support with model selection and StepDIM operating settings.", action: "Request Technical Support" },
  },
  ua: {
    metadata: { title: "LED-BUS StepDIM Waterproof | Освітлення паркінгів | InfraVolt", description: "LED-BUS StepDIM Waterproof з радарним керуванням для паркінгів: чотири каталожні моделі 25–65 Вт." },
    breadcrumbs: { home: "Головна", products: "Продукція", ledSystems: "LED-системи", category: "Освітлення паркінгів та вологозахищене освітлення", current: "LED-BUS StepDIM Waterproof" },
    backToCategoryLabel: "Назад до освітлення паркінгів",
    hero: { eyebrow: "LED-BUS STEPDIM WATERPROOF", category: "Освітлення паркінгів та вологозахищене освітлення", title: "LED-BUS StepDIM Waterproof", description: "Освітлення паркінгів з інтегрованим радарним датчиком 5,8 ГГц і димованим LED-драйвером для реагування на присутність і денне світло.", primaryAction: "Запросити технічний пакет", secondaryAction: "Завантажити PDF-каталог" },
    ...shared,
    heroImageAlt: "Чотири каталожні світильники LED-BUS StepDIM Waterproof з точними кодами та потужністю",
    heroBackgroundImageAlt: "LED-BUS StepDIM Waterproof у паркінгу",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      { icon: "performance", title: "Діапазон", values: [{ label: "Потужність", value: "25–65 Вт" }, { label: "Моделі", value: "4 каталожні моделі" }] },
      { icon: "construction", title: "Конструкція", values: [{ label: "Корпус", value: "Екструдований алюміній" }, { label: "Розсіювач", value: "Опаловий PMMA" }] },
      { icon: "control-system", title: "Система керування", values: [{ label: "Драйвер", value: "Димований LED-драйвер" }, { label: "Датчик", value: "Інтегрований радар 5,8 ГГц" }] },
      { icon: "integration", title: "Виявлення", values: [{ label: "Кут", value: "150°" }, { label: "Висота монтажу", value: "5 м у прикладі каталогу" }, { label: "Максимальний діапазон", value: "8 м" }] },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: "Колір і покриття", value: "Екструдований алюмінієвий корпус" },
      { icon: "warranty", label: "Гарантія", value: "5 років гарантії" },
    ],
    modelsHeading: "Моделі та технічна таблиця", modelsIntroduction: "Повний перелік чотирьох моделей із каталогу. Ненаведені електричні та фотометричні параметри навмисно пропущено.",
    modelsColumns: { model: "Модель / код", power: "Потужність" }, modelsFilters: { ...commonFilters, searchLabel: "Пошук", searchPlaceholder: "Точний код моделі", powerFilterLabel: "Потужність", allPowersLabel: "Усі потужності", clearFiltersLabel: "Очистити", noResultsLabel: "Моделей не знайдено.", downloadCsvLabel: "Завантажити CSV", modelsCountSuffix: "Моделей" },
    familyTechnicalSection: {
      heading: "Датчик і димування StepDIM", introduction: "Каталожні налаштування радара, денного світла та режиму очікування.",
      settings: [
        { label: "Світло при виявленні", value: "50% або 100%", description: "Рівень при виявленні присутності." },
        { label: "Час очікування", value: "5 с · 90 с · 5 хв · 10 хв", description: "Період після виявлення." },
        { label: "Поріг денного світла", value: "30–50 лк або вимкнено", description: "Активацію за денним світлом можна вимкнути." },
        { label: "Низький рівень", value: "10% або 30%", description: "Знижений вихід після часу очікування." },
        { label: "Після бездіяльності", value: "Вимкнення через 10 хв або постійний низький рівень", description: "Вимкнення або робота на вибраному рівні 10%/30%." },
      ],
      assets: [
        { title: "Налаштування керування", image: `${STEPDIM_TECHNICAL_ASSET_BASE}/led-bus-stepdim-waterproof-control-settings.png`, imageAlt: "Каталожні налаштування керування LED-BUS StepDIM Waterproof" },
        { title: "Компоненти", image: `${STEPDIM_TECHNICAL_ASSET_BASE}/led-bus-stepdim-waterproof-component-detail.png`, imageAlt: "Каталожна деталізація компонентів LED-BUS StepDIM Waterproof" },
        { title: "Зона датчика", image: `${STEPDIM_TECHNICAL_ASSET_BASE}/led-bus-stepdim-waterproof-sensor-coverage.png`, imageAlt: "Каталожна схема зони дії датчика LED-BUS StepDIM Waterproof" },
        { title: "Монтаж LED-модуля", image: `${STEPDIM_TECHNICAL_ASSET_BASE}/led-bus-stepdim-waterproof-led-module-installation.png`, imageAlt: "Каталожна схема монтажу LED-модуля StepDIM Waterproof" },
      ],
    },
    controlsHeading: "Керування та системні опції", controlsIntroduction: "Інтегроване каталожне обладнання та вибір робочих порогів; налаштування залежать від проєкту.",
    photometricHeading: "Фотометричні та технічні дані",
    dimensionNote: "Показано спеціальні фотометричні, технічні, компонентні, керувальні, монтажні матеріали та схему зони датчика StepDIM без додавання непідтверджених розмірів.",
    applicationsHeading: "Типові застосування", applications: [
      { icon: "parking", title: "Паркінги", description: "Освітлення критих паркінгів із реакцією на присутність і денне світло.", image: `${APPLICATION_ASSET_BASE}/multi-storey-parking-application.webp`, imageAlt: "Критий паркінг із лінійним стельовим освітленням" },
      { icon: "office", title: "Офіси", description: "Сенсорне лінійне освітлення офісних і допоміжних приміщень.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-offices.webp`, imageAlt: "Офісний інтер’єр із лінійним LED-освітленням" },
      { icon: "retail", title: "Магазини та ринки", description: "Адаптивне лінійне освітлення торговельних приміщень.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-markets-retail.webp`, imageAlt: "Торговельний інтер’єр із лінійним LED-освітленням" },
      { icon: "education", title: "Освіта та коридори", description: "Освітлення навчальних зон і шляхів руху з реакцією на присутність.", image: `${APPLICATION_ASSET_BASE}/led-bus-etange-carpark-application-education-corridors.webp`, imageAlt: "Навчальний коридор із лінійним LED-освітленням" },
    ],
    siblingFamiliesHeading: "Інші сімейства", siblingViewSeriesLabel: "Переглянути серію", currentFamilyBadgeLabel: "Поточне сімейство", siblingFamilies: siblings("led-bus-stepdim-waterproof", true),
    supportCta: { title: "Плануєте сенсорне освітлення паркінгу?", description: "Запросіть допомогу з вибором моделі та налаштуваннями StepDIM.", action: "Запросити технічну підтримку" },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function ledBusStepdimWaterproofContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

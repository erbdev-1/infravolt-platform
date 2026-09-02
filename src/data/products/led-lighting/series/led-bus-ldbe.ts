import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

/** Real extracted LEDBUS catalogue assets. Shared across markets; only
 * copy is localized.
 *
 * Hero background/foreground: premium pre-generated assets sourced from
 * the shared Industrial & High-Bay category asset library
 * (category/industrial-high-bay/product and .../product/background) —
 * a real warehouse/logistics interior and the real, fully visible
 * LED-BUS LDBE fixture, already isolated and switched on with
 * neutral-white light. Replaces this file's earlier from-scratch
 * edge-feather/glow composite (now superseded) and the reused
 * application photo previously standing in as the hero background, now
 * that a dedicated, higher-quality pair exists for this family.
 *
 * Photometric/technical drawing: likewise sourced from the shared
 * category asset library's photometric/ and technical/ folders — higher
 * resolution renders of the same real catalogue photometric polar
 * diagram and technical drawing, replacing the small raw catalogue-scan
 * PNGs originally extracted directly from the source PDF. */
export const LED_BUS_LDBE_HERO_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldbe/led-bus-ldbe-hero-foreground.webp");
export const LED_BUS_LDBE_HERO_IMAGE_ALT =
  "LED-BUS LDBE luminaire, illuminated, angled view of the multi-lens diffuser panel";
export const LED_BUS_LDBE_HERO_BACKGROUND_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldbe/led-bus-ldbe-hero-background.webp");
export const LED_BUS_LDBE_HERO_BACKGROUND_IMAGE_ALT =
  "Warehouse and logistics facility interior with conveyor and pallet racking, lit by high-bay LED fixtures";
/** Typical Applications card grid — the LDBE family's own catalogue page
 * ships no dedicated application photography, so all 3 cards reuse real,
 * verified LEDBUS/GERSAN site-ready photography already used elsewhere on
 * the site (none repeated within this page's own grid): a large-span
 * industrial hall interior with staged crated goods on the floor
 * (Industrial Facilities, already used as the LED-BUS High Ceiling page's
 * "Warehouses & Storage" card), a genuine airport apron/ground-operations
 * scene (Aviation & Airports, already used as the LED-BUS High Ceiling
 * page's "Hangars" card), and a warehouse aisle with pallet racking and a
 * forklift (Logistics Facilities, already used as the Industrial &
 * High-Bay category page's "Warehouses & Logistics" card). */
export const LED_BUS_LDBE_APPLICATION_INDUSTRIAL_FACILITIES_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldbe/led-bus-ldbe-application-industrial-facilities.webp");
export const LED_BUS_LDBE_APPLICATION_AVIATION_AIRPORTS_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldbe/led-bus-ldbe-application-aviation-airports.webp");
export const LED_BUS_LDBE_APPLICATION_LOGISTICS_FACILITIES_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldbe/led-bus-ldbe-application-logistics-facilities.webp");
export const LED_BUS_LDBE_PHOTOMETRIC_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldbe/led-bus-ldbe-photometric.webp");
export const LED_BUS_LDBE_TECHNICAL_DRAWING_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldbe/led-bus-ldbe-technical-drawing.webp");

// Note: the real assembly-1..7 catalogue images remain on disk under
// public/assets/products/led-lighting/series/led-bus-ldbe/assembly/ — the
// "Assembly Details" gallery that referenced them was removed from this
// page per request; the mounting cards above already cover the same
// installation information without a separate image gallery.

const LENS = "30° / 60° / 90°";

const MODELS_UK: readonly LedSeriesModel[] = [
  { model: "LDB1E", powerW: 50, luminousFluxLm: "7,200 lm", lens: LENS, ip: "IP20 / IP65", dimensions: "30×60 cm", weightKg: "4.5 kg" },
  { model: "LDB2E", powerW: 75, luminousFluxLm: "10,800 lm", lens: LENS, ip: "IP20 / IP65", dimensions: "30×60 cm", weightKg: "4.5 kg" },
  { model: "LDB3E", powerW: 100, luminousFluxLm: "14,500 lm", lens: LENS, ip: "IP20 / IP65", dimensions: "30×60 cm", weightKg: "4.5 kg" },
  { model: "LDB4E", powerW: 125, luminousFluxLm: "18,000 lm", lens: LENS, ip: "IP20 / IP65", dimensions: "30×60 cm", weightKg: "4.5 kg" },
  { model: "LDB5E", powerW: 150, luminousFluxLm: "21,600 lm", lens: LENS, ip: "IP20 / IP65", dimensions: "30×90 cm", weightKg: "6.5 kg" },
  { model: "LDB6E", powerW: 175, luminousFluxLm: "25,500 lm", lens: LENS, ip: "IP20 / IP65", dimensions: "30×90 cm", weightKg: "6.5 kg" },
  { model: "LDB7E", powerW: 200, luminousFluxLm: "28,800 lm", lens: LENS, ip: "IP20 / IP65", dimensions: "30×120 cm", weightKg: "8.0 kg" },
  { model: "LDB8E", powerW: 250, luminousFluxLm: "37,000 lm", lens: LENS, ip: "IP20 / IP65", dimensions: "30×120 cm", weightKg: "8.0 kg" },
] as const;

const MODELS_UA: readonly LedSeriesModel[] = [
  { model: "LDB1E", powerW: 50, luminousFluxLm: "7 200 лм", lens: LENS, ip: "IP20 / IP65", dimensions: "30×60 см", weightKg: "4,5 кг" },
  { model: "LDB2E", powerW: 75, luminousFluxLm: "10 800 лм", lens: LENS, ip: "IP20 / IP65", dimensions: "30×60 см", weightKg: "4,5 кг" },
  { model: "LDB3E", powerW: 100, luminousFluxLm: "14 500 лм", lens: LENS, ip: "IP20 / IP65", dimensions: "30×60 см", weightKg: "4,5 кг" },
  { model: "LDB4E", powerW: 125, luminousFluxLm: "18 000 лм", lens: LENS, ip: "IP20 / IP65", dimensions: "30×60 см", weightKg: "4,5 кг" },
  { model: "LDB5E", powerW: 150, luminousFluxLm: "21 600 лм", lens: LENS, ip: "IP20 / IP65", dimensions: "30×90 см", weightKg: "6,5 кг" },
  { model: "LDB6E", powerW: 175, luminousFluxLm: "25 500 лм", lens: LENS, ip: "IP20 / IP65", dimensions: "30×90 см", weightKg: "6,5 кг" },
  { model: "LDB7E", powerW: 200, luminousFluxLm: "28 800 лм", lens: LENS, ip: "IP20 / IP65", dimensions: "30×120 см", weightKg: "8,0 кг" },
  { model: "LDB8E", powerW: 250, luminousFluxLm: "37 000 лм", lens: LENS, ip: "IP20 / IP65", dimensions: "30×120 см", weightKg: "8,0 кг" },
] as const;


const content = {
  uk: {
    metadata: {
      title: "LED-BUS LDBE Series Lighting Systems | Industrial & High-Bay Lighting | LED Systems | InfraVolt",
      description:
        "LED-BUS LDBE Series Lighting Systems — 8 catalogue models, 50–250 W, multi-lens 30°/60°/90° optics, IP20/IP65, for industrial, aviation and logistics facilities.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      category: "Industrial & High-Bay Lighting",
      current: "LED-BUS LDBE Series Lighting Systems",
    },
    backToCategoryLabel: "Back to Industrial & High-Bay Lighting",
    hero: {
      eyebrow: "LED SYSTEMS",
      category: "Industrial & High-Bay Lighting",
      title: "LED-BUS LDBE Series Lighting Systems",
      description:
        "Multi-lens industrial LED lighting engineered for industrial facilities, aviation and airport environments, and logistics applications, with selectable optical configurations and multiple mounting options.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    heroImage: LED_BUS_LDBE_HERO_IMAGE,
    heroImageAlt: LED_BUS_LDBE_HERO_IMAGE_ALT,
    heroBackgroundImage: LED_BUS_LDBE_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: LED_BUS_LDBE_HERO_BACKGROUND_IMAGE_ALT,
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      {
        icon: "performance",
        title: "Performance",
        values: [
          { label: "Power Range", value: "50–250 W" },
          { label: "Luminous Flux", value: "7,200–37,000 lm" },
          { label: "Models", value: "8 Variants" },
        ],
      },
      {
        icon: "light-quality",
        title: "Light Quality",
        values: [
          { label: "Multi-Lens Optical Structure" },
          { label: "Lens Options", value: "30° / 60° / 90°" },
          { label: "Visual Comfort" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Protection & Electrical",
        values: [
          { label: "IP20 / IP65" },
          { label: "Voltage", value: "110–240 Vac" },
          { label: "Frequency", value: "50–60 Hz" },
          { label: "Operating Temperature", value: "−30 to +60 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Construction & Installation",
        values: [
          { label: "Sizes", value: "30×60 / 30×90 / 30×120 cm" },
          { label: "Weight", value: "4.5–8.0 kg" },
          { label: "Mounting", value: "Cable Channel / Busbar / Adjustable Wall" },
        ],
      },
    ],
    technicalAssurance: [
      {
        icon: "colour-finish",
        label: "Colour & Finish",
        value: "White · Grey · Black · Custom RAL on request",
      },
      {
        icon: "compliance",
        label: "Compliance",
        value: "CE · RoHS compliant · IP20 / IP65",
      },
      {
        icon: "warranty",
        label: "Warranty",
        value: "5-Year Warranty",
      },
    ],
    modelsHeading: "Models & Technical Schedule",
    modelsIntroduction: "Eight verified catalogue models — search or filter by power or dimensions to find the right variant.",
    models: MODELS_UK,
    modelsColumns: {
      model: "Model / Catalogue Code",
      power: "Power",
      luminousFlux: "Luminous Flux",
      lens: "Lens",
      ip: "IP",
      dimensions: "Dimensions",
      weight: "Weight",
    },
    modelsFilters: {
      searchLabel: "Search",
      searchPlaceholder: "Search by model or catalogue code",
      powerFilterLabel: "Power",
      allPowersLabel: "All powers",
      dimensionsFilterLabel: "Dimensions",
      clearFiltersLabel: "Clear filters",
      noResultsLabel: "No models match your search.",
      downloadCsvLabel: "Download CSV",
      mobileFiltersToggleLabel: "Filter & Search",
      mobileApplyFiltersLabel: "Apply Filters",
      mobileViewAllPrefix: "View All",
      mobileViewFilteredPrefix: "View",
      mobileHidePrefix: "Hide Models",
      modelsCountSuffix: "Models",
      copyModelCodeAction: "Copy catalogue code",
      copiedLabel: "Copied",
      enquiryColumnLabel: "Enquiry",
      enquiryAddAction: "Add to Enquiry",
      enquiryRemoveAction: "Remove from Enquiry",
    },
    mountingHeading: "Mounting & Integration Options",
    mountingOptions: [
      {
        icon: "mounting-options",
        title: "Cable Channel Mounting",
        description: "Installation to cable-channel systems using catalogue-supported mounting arrangements.",
      },
      {
        icon: "busbar-connect",
        title: "Busbar Mounting",
        description: "Direct mounting to the busbar system using the catalogue-defined busbar assembly arrangement.",
      },
      {
        icon: "wall-mount",
        title: "Angle-Adjustable Wall Mounting",
        description: "Wall-mounted installation with adjustable-angle mounting hardware.",
      },
    ],
    controlsHeading: "Controls & System Options",
    controlsIntroduction: "Catalogue-listed control options — not every option is standard on every model.",
    controlOptions: [
      { icon: "control-dali", label: "DALI" },
      { icon: "control-dimmer", label: "SwitchDIM" },
      { icon: "control-signal", label: "1–10 V" },
      { icon: "control-emergency", label: "Emergency" },
      { icon: "control-sensor", label: "Sensor" },
    ],
    photometricHeading: "Photometric & Technical Data",
    technicalAssets: [
      {
        title: "Photometric Data",
        image: LED_BUS_LDBE_PHOTOMETRIC_IMAGE,
        imageAlt: "LED-BUS LDBE photometric polar distribution diagrams",
      },
      {
        title: "Technical Drawing",
        image: LED_BUS_LDBE_TECHNICAL_DRAWING_IMAGE,
        imageAlt: "LED-BUS LDBE technical drawing with cross-section dimensions",
      },
    ],
    dimensionNote:
      "Luminaire cross-section: 300 mm wide × approximately 46.80 mm high. Overall length L corresponds to each model's stated size (30×60 / 30×90 / 30×120 cm) — see the model table above for exact per-model dimensions.",
    applicationsHeading: "Typical Applications",
    applicationImage: LED_BUS_LDBE_APPLICATION_INDUSTRIAL_FACILITIES_IMAGE,
    applicationImageAlt: "Large-span industrial hall interior with staged crated goods, lit by high-bay LED fixtures",
    applications: [
      {
        icon: "industrial-facility",
        title: "Industrial Facilities",
        image: LED_BUS_LDBE_APPLICATION_INDUSTRIAL_FACILITIES_IMAGE,
        imageAlt: "Large-span industrial hall interior with staged crated goods, lit by high-bay LED fixtures",
        description: "Large-span industrial and production facilities.",
      },
      {
        icon: "hangar",
        title: "Aviation & Airports",
        image: LED_BUS_LDBE_APPLICATION_AVIATION_AIRPORTS_IMAGE,
        imageAlt: "Airport apron at night with a parked aircraft, ground service vehicles and control tower",
        description: "Airport ground-operations and aviation environments.",
      },
      {
        icon: "warehouse",
        title: "Logistics Facilities",
        image: LED_BUS_LDBE_APPLICATION_LOGISTICS_FACILITIES_IMAGE,
        imageAlt: "Warehouse aisle with pallet racking and a forklift, lit by high-bay LED fixtures",
        description: "Logistics aisles and high-bay storage halls.",
      },
    ],
    siblingFamiliesHeading: "Other Industrial & High-Bay Families",
    siblingViewSeriesLabel: "View Series",
    currentFamilyBadgeLabel: "Current family",
    siblingFamilies: [
      {
        slug: "led-bus-high-ceiling",
        name: "LED-BUS High Ceiling Lighting Systems",
        subtitle: "50–240 W · IP65",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-high-ceiling",
      },
      { slug: "led-bus-ldbe", name: "LED-BUS LDBE Series Lighting Systems", subtitle: "50–250 W · Multi-lens optics", isCurrent: true },
      {
        slug: "led-bus-ldbse",
        name: "LED-BUS LDBSE Series Lighting Systems",
        subtitle: "50–250 W · Slim body",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbse",
      },
      {
        slug: "led-bus-ldb-fl",
        name: "LED-BUS LDB-FL Series Lighting Systems",
        subtitle: "75–205 W · Tempered glass",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldb-fl",
      },
      {
        slug: "ger-led-industrial-high-ceiling",
        name: "GER-LED Industrial High Ceiling Lighting Systems",
        subtitle: "35–250 W · IP66",
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-industrial-high-ceiling",
      },
      {
        slug: "ger-led-high-ceiling",
        name: "GER-LED High Ceiling Lighting Systems",
        subtitle: "50–150 W · Recessed / surface",
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-high-ceiling",
      },
    ],
    supportCta: {
      title: "Need help selecting the right LDBE configuration?",
      description:
        "Our technical team can help with model selection, optical configuration, busbar or cable-channel integration, wall mounting and lighting controls.",
      action: "Request Technical Support",
    },
  },
  ua: {
    metadata: {
      title: "LED-BUS LDBE – промислове LED-освітлення | InfraVolt",
      description:
        "LED-BUS LDBE Series Lighting Systems — 8 каталожних моделей, 50–250 Вт, мультилінзова оптика 30°/60°/90°, IP20/IP65, для промислових, авіаційних та логістичних об'єктів.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "Системи LED-освітлення",
      category: "Промислове LED-освітлення для високих приміщень",
      current: "LED-BUS LDBE Series Lighting Systems",
    },
    backToCategoryLabel: "Назад до промислового LED-освітлення для високих приміщень",
    hero: {
      eyebrow: "СИСТЕМИ LED",
      category: "Промислове LED-освітлення для високих приміщень",
      title: "LED-BUS LDBE Series Lighting Systems",
      description:
        "Мультилінзове промислове LED-освітлення для промислових об'єктів, авіаційних та аеропортових середовищ, а також логістичних застосувань, з вибором оптичної конфігурації та кількома варіантами монтажу.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    heroImage: LED_BUS_LDBE_HERO_IMAGE,
    heroImageAlt: "Увімкнений світильник LED-BUS LDBE, ракурсний вигляд мультилінзової панелі розсіювача",
    heroBackgroundImage: LED_BUS_LDBE_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: "Складське та логістичне приміщення з конвеєром і стелажами для піддонів, освітлене високостельовими LED-світильниками",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      {
        icon: "performance",
        title: "Продуктивність",
        values: [
          { label: "Діапазон потужності", value: "50–250 Вт" },
          { label: "Світловий потік", value: "7 200–37 000 лм" },
          { label: "Моделі", value: "8 варіантів" },
        ],
      },
      {
        icon: "light-quality",
        title: "Якість світла",
        values: [
          { label: "Мультилінзова оптична структура" },
          { label: "Варіанти лінз", value: "30° / 60° / 90°" },
          { label: "Зоровий комфорт" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Захист та електрика",
        values: [
          { label: "IP20 / IP65" },
          { label: "Напруга", value: "110–240 В" },
          { label: "Частота", value: "50–60 Гц" },
          { label: "Робоча температура", value: "−30 до +60 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Конструкція та монтаж",
        values: [
          { label: "Розміри", value: "30×60 / 30×90 / 30×120 см" },
          { label: "Вага", value: "4,5–8,0 кг" },
          { label: "Монтаж", value: "Кабельний канал / Шинопровід / Регульований настінний" },
        ],
      },
    ],
    technicalAssurance: [
      {
        icon: "colour-finish",
        label: "Колір та оздоблення",
        value: "Білий · Сірий · Чорний · Індивідуальний RAL за запитом",
      },
      {
        icon: "compliance",
        label: "Відповідність стандартам",
        value: "CE · Відповідність RoHS · IP20 / IP65",
      },
      {
        icon: "warranty",
        label: "Гарантія",
        value: "5 років гарантії",
      },
    ],
    modelsHeading: "Моделі та технічний розклад",
    modelsIntroduction: "Вісім перевірених каталожних моделей — здійснюйте пошук або фільтруйте за потужністю чи розмірами.",
    models: MODELS_UA,
    modelsColumns: {
      model: "Модель / каталожний код",
      power: "Потужність",
      luminousFlux: "Світловий потік",
      lens: "Лінза",
      ip: "IP",
      dimensions: "Розміри",
      weight: "Вага",
    },
    modelsFilters: {
      searchLabel: "Пошук",
      searchPlaceholder: "Пошук за моделлю або каталожним кодом",
      powerFilterLabel: "Потужність",
      allPowersLabel: "Усі потужності",
      dimensionsFilterLabel: "Розміри",
      clearFiltersLabel: "Очистити фільтри",
      noResultsLabel: "Жодна модель не відповідає пошуку.",
      downloadCsvLabel: "Завантажити CSV",
      mobileFiltersToggleLabel: "Фільтр і пошук",
      mobileApplyFiltersLabel: "Застосувати фільтри",
      mobileViewAllPrefix: "Показати всі",
      mobileViewFilteredPrefix: "Показати",
      mobileHidePrefix: "Приховати моделі",
      modelsCountSuffix: "моделей",
      copyModelCodeAction: "Копіювати каталожний код",
      copiedLabel: "Скопійовано",
      enquiryColumnLabel: "Запит",
      enquiryAddAction: "Додати до запиту",
      enquiryRemoveAction: "Прибрати із запиту",
    },
    mountingHeading: "Варіанти монтажу та інтеграції",
    mountingOptions: [
      {
        icon: "mounting-options",
        title: "Монтаж на кабельний канал",
        description: "Монтаж на системи кабельних каналів з використанням каталожних варіантів кріплення.",
      },
      {
        icon: "busbar-connect",
        title: "Монтаж на шинопровід",
        description: "Пряме кріплення до системи шинопроводу за допомогою каталожного вузла кріплення.",
      },
      {
        icon: "wall-mount",
        title: "Регульований настінний монтаж",
        description: "Настінний монтаж з кріпленням регульованого кута нахилу.",
      },
    ],
    controlsHeading: "Керування та системні опції",
    controlsIntroduction: "Каталожні варіанти керування — не кожна опція є стандартною для кожної моделі.",
    controlOptions: [
      { icon: "control-dali", label: "DALI" },
      { icon: "control-dimmer", label: "SwitchDIM" },
      { icon: "control-signal", label: "1–10 В" },
      { icon: "control-emergency", label: "Аварійне освітлення" },
      { icon: "control-sensor", label: "Датчик" },
    ],
    photometricHeading: "Фотометричні та технічні дані",
    technicalAssets: [
      {
        title: "Фотометричні дані",
        image: LED_BUS_LDBE_PHOTOMETRIC_IMAGE,
        imageAlt: "Полярні діаграми фотометричного розподілу LED-BUS LDBE",
      },
      {
        title: "Технічне креслення",
        image: LED_BUS_LDBE_TECHNICAL_DRAWING_IMAGE,
        imageAlt: "Технічне креслення LED-BUS LDBE з розмірами поперечного перерізу",
      },
    ],
    dimensionNote:
      "Поперечний переріз світильника: 300 мм завширшки × приблизно 46,80 мм заввишки. Загальна довжина L відповідає заявленому розміру моделі (30×60 / 30×90 / 30×120 см) — точні розміри моделей див. у таблиці вище.",
    applicationsHeading: "Типові застосування",
    applicationImage: LED_BUS_LDBE_APPLICATION_INDUSTRIAL_FACILITIES_IMAGE,
    applicationImageAlt: "Промисловий об'єкт великого прольоту зі складованим упакованим вантажем, освітлений високостельовими LED-світильниками",
    applications: [
      {
        icon: "industrial-facility",
        title: "Промислові об'єкти",
        image: LED_BUS_LDBE_APPLICATION_INDUSTRIAL_FACILITIES_IMAGE,
        imageAlt: "Промисловий об'єкт великого прольоту зі складованим упакованим вантажем, освітлений високостельовими LED-світильниками",
        description: "Промислові та виробничі об'єкти великого прольоту.",
      },
      {
        icon: "hangar",
        title: "Авіація та аеропорти",
        image: LED_BUS_LDBE_APPLICATION_AVIATION_AIRPORTS_IMAGE,
        imageAlt: "Перон аеропорту вночі з припаркованим літаком, наземною технікою та вежею управління польотами",
        description: "Наземні операції аеропортів та авіаційні середовища.",
      },
      {
        icon: "warehouse",
        title: "Логістичні об'єкти",
        image: LED_BUS_LDBE_APPLICATION_LOGISTICS_FACILITIES_IMAGE,
        imageAlt: "Прохід складу зі стелажами для піддонів та навантажувачем, освітлений високостельовими LED-світильниками",
        description: "Логістичні проходи та складські зали з високими стелями.",
      },
    ],
    siblingFamiliesHeading: "Інші промислові серії та серії для високих приміщень",
    siblingViewSeriesLabel: "Переглянути серію",
    currentFamilyBadgeLabel: "Поточна серія",
    siblingFamilies: [
      {
        slug: "led-bus-high-ceiling",
        name: "LED-BUS High Ceiling Lighting Systems",
        subtitle: "50–240 Вт · IP65",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-high-ceiling",
      },
      { slug: "led-bus-ldbe", name: "LED-BUS LDBE Series Lighting Systems", subtitle: "50–250 Вт · Мультилінзова оптика", isCurrent: true },
      {
        slug: "led-bus-ldbse",
        name: "LED-BUS LDBSE Series Lighting Systems",
        subtitle: "50–250 Вт · Тонкий корпус",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbse",
      },
      {
        slug: "led-bus-ldb-fl",
        name: "LED-BUS LDB-FL Series Lighting Systems",
        subtitle: "75–205 Вт · Загартоване скло",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldb-fl",
      },
      {
        slug: "ger-led-industrial-high-ceiling",
        name: "GER-LED Industrial High Ceiling Lighting Systems",
        subtitle: "35–250 Вт · IP66",
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-industrial-high-ceiling",
      },
      {
        slug: "ger-led-high-ceiling",
        name: "GER-LED High Ceiling Lighting Systems",
        subtitle: "50–150 Вт · Врізний / накладний",
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-high-ceiling",
      },
    ],
    supportCta: {
      title: "Потрібна допомога з підбором конфігурації LDBE?",
      description:
        "Наша технічна команда допоможе з вибором моделі, оптичної конфігурації, інтеграції з шинопроводом чи кабельним каналом, настінним монтажем та керуванням освітленням.",
      action: "Запросити технічну підтримку",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function ledBusLdbeContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

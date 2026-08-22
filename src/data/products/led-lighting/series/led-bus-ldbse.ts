import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

/** Real extracted LEDBUS catalogue assets. Shared across markets; only
 * copy is localized.
 *
 * Hero background/foreground: premium pre-generated assets sourced from
 * the shared Industrial & High-Bay category asset library
 * (category/industrial&high-bay/product and .../product/background) —
 * a real industrial/logistics interior and the real, fully visible
 * LED-BUS LDBSE fixture, already isolated and switched on with
 * neutral-white light. Replaces this file's earlier from-scratch
 * flood-fill/glow composite (now superseded) and the reused application
 * photo previously standing in as the hero background, now that a
 * dedicated, higher-quality pair exists for this family.
 *
 * Photometric/technical drawing: likewise sourced from the shared
 * category asset library's photometric/ and technical/ folders — higher
 * resolution renders of the same real catalogue photometric polar
 * diagram and technical drawing, replacing the small raw catalogue-scan
 * PNGs originally extracted directly from the source PDF. */
export const LED_BUS_LDBSE_HERO_IMAGE =
  "/assets/products/led-lighting/series/led-bus-ldbse/led-bus-ldbse-hero-foreground.webp";
export const LED_BUS_LDBSE_HERO_IMAGE_ALT =
  "LED-BUS LDBSE luminaire, illuminated, angled view of the multi-lens diffuser strip";
export const LED_BUS_LDBSE_HERO_BACKGROUND_IMAGE =
  "/assets/products/led-lighting/series/led-bus-ldbse/led-bus-ldbse-hero-background.webp";
export const LED_BUS_LDBSE_HERO_BACKGROUND_IMAGE_ALT =
  "Industrial hangar interior with an aircraft visible in the background, lit by high-bay LED fixtures";
export const LED_BUS_LDBSE_APPLICATION_IMAGE =
  "/assets/products/led-lighting/series/led-bus-ldbse/led-bus-ldbse-industrial-application.webp";
export const LED_BUS_LDBSE_APPLICATION_IMAGE_ALT =
  "Large-span industrial facility interior lit by LED-BUS LDBSE high-bay fixtures";
export const LED_BUS_LDBSE_PHOTOMETRIC_IMAGE =
  "/assets/products/led-lighting/series/led-bus-ldbse/led-bus-ldbse-photometric.webp";
export const LED_BUS_LDBSE_TECHNICAL_DRAWING_IMAGE =
  "/assets/products/led-lighting/series/led-bus-ldbse/led-bus-ldbse-technical-drawing.webp";
/** Typical Applications card grid — Aviation & Airports and Logistics
 * Facilities photos. Real LEDBUS/GERSAN catalogue site-ready photography
 * reused from elsewhere on the site (the LDBSE family's own catalogue
 * page only ships one application photo — see above): a genuine airport
 * apron/ground-operations scene (Aviation & Airports, already used as the
 * LED-BUS High Ceiling page's "Hangars" card) and a warehouse aisle with
 * pallet racking and a forklift (Logistics Facilities, already used as
 * the Industrial & High-Bay category page's "Warehouses & Logistics"
 * card). Neither photo is reused twice within this page's own grid. */
export const LED_BUS_LDBSE_APPLICATION_AVIATION_AIRPORTS_IMAGE =
  "/assets/products/led-lighting/series/led-bus-ldbse/led-bus-ldbse-application-aviation-airports.webp";
export const LED_BUS_LDBSE_APPLICATION_LOGISTICS_FACILITIES_IMAGE =
  "/assets/products/led-lighting/series/led-bus-ldbse/led-bus-ldbse-application-logistics-facilities.webp";

const MODELS_UK: readonly LedSeriesModel[] = [
  { model: "LDBS1E", powerW: 50, luminousFluxLm: "6,750 lm", efficiencyLmW: "135 lm/W", ip: "IP20 / IP65", dimensions: "11×60 cm", weightKg: "2.00 kg" },
  { model: "LDBS2E", powerW: 75, luminousFluxLm: "10,200 lm", efficiencyLmW: "136 lm/W", ip: "IP20 / IP65", dimensions: "11×90 cm", weightKg: "2.65 kg" },
  { model: "LDBS3E", powerW: 100, luminousFluxLm: "13,800 lm", efficiencyLmW: "138 lm/W", ip: "IP20 / IP65", dimensions: "11×90 cm", weightKg: "2.85 kg" },
  { model: "LDBS4E", powerW: 125, luminousFluxLm: "17,500 lm", efficiencyLmW: "140 lm/W", ip: "IP20 / IP65", dimensions: "11×120 cm", weightKg: "3.50 kg" },
  { model: "LDBS5E", powerW: 150, luminousFluxLm: "21,750 lm", efficiencyLmW: "145 lm/W", ip: "IP20 / IP65", dimensions: "11×120 cm", weightKg: "3.50 kg" },
  { model: "LDBS6E", powerW: 175, luminousFluxLm: "24,900 lm", efficiencyLmW: "142.2 lm/W", ip: "IP20 / IP65", dimensions: "11×120 cm", weightKg: "3.50 kg" },
  { model: "LDBS7E", powerW: 200, luminousFluxLm: "29,200 lm", efficiencyLmW: "146 lm/W", ip: "IP20 / IP65", dimensions: "11×150 cm", weightKg: "4.80 kg" },
  { model: "LDBS8E", powerW: 250, luminousFluxLm: "37,000 lm", efficiencyLmW: "148 lm/W", ip: "IP20 / IP65", dimensions: "11×150 cm", weightKg: "4.80 kg" },
] as const;

const MODELS_UA: readonly LedSeriesModel[] = [
  { model: "LDBS1E", powerW: 50, luminousFluxLm: "6 750 лм", efficiencyLmW: "135 лм/Вт", ip: "IP20 / IP65", dimensions: "11×60 см", weightKg: "2,00 кг" },
  { model: "LDBS2E", powerW: 75, luminousFluxLm: "10 200 лм", efficiencyLmW: "136 лм/Вт", ip: "IP20 / IP65", dimensions: "11×90 см", weightKg: "2,65 кг" },
  { model: "LDBS3E", powerW: 100, luminousFluxLm: "13 800 лм", efficiencyLmW: "138 лм/Вт", ip: "IP20 / IP65", dimensions: "11×90 см", weightKg: "2,85 кг" },
  { model: "LDBS4E", powerW: 125, luminousFluxLm: "17 500 лм", efficiencyLmW: "140 лм/Вт", ip: "IP20 / IP65", dimensions: "11×120 см", weightKg: "3,50 кг" },
  { model: "LDBS5E", powerW: 150, luminousFluxLm: "21 750 лм", efficiencyLmW: "145 лм/Вт", ip: "IP20 / IP65", dimensions: "11×120 см", weightKg: "3,50 кг" },
  { model: "LDBS6E", powerW: 175, luminousFluxLm: "24 900 лм", efficiencyLmW: "142,2 лм/Вт", ip: "IP20 / IP65", dimensions: "11×120 см", weightKg: "3,50 кг" },
  { model: "LDBS7E", powerW: 200, luminousFluxLm: "29 200 лм", efficiencyLmW: "146 лм/Вт", ip: "IP20 / IP65", dimensions: "11×150 см", weightKg: "4,80 кг" },
  { model: "LDBS8E", powerW: 250, luminousFluxLm: "37 000 лм", efficiencyLmW: "148 лм/Вт", ip: "IP20 / IP65", dimensions: "11×150 см", weightKg: "4,80 кг" },
] as const;

const SUPPORT_REQUEST_HREF = "/uk-support?request=technical-pack&product=led-bus-ldbse";

const content = {
  uk: {
    metadata: {
      title: "LED-BUS LDBSE Series Lighting Systems | Industrial & High-Bay Lighting | LED Systems | InfraVolt",
      description:
        "LED-BUS LDBSE Series Lighting Systems — 8 catalogue models, 50–250 W, slim-profile multi-lens optics, 135–148 lm/W, IP20/IP65, for industrial, aviation and logistics facilities.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      category: "Industrial & High-Bay Lighting",
      current: "LED-BUS LDBSE Series Lighting Systems",
    },
    backToCategoryLabel: "Back to Industrial & High-Bay Lighting",
    hero: {
      eyebrow: "LED SYSTEMS",
      category: "Industrial & High-Bay Lighting",
      title: "LED-BUS LDBSE Series Lighting Systems",
      description:
        "Slim-profile industrial LED lighting with a multi-lens optical structure for industrial facilities, aviation and airport environments, and logistics applications, with multiple system-mounting options.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    heroImage: LED_BUS_LDBSE_HERO_IMAGE,
    heroImageAlt: LED_BUS_LDBSE_HERO_IMAGE_ALT,
    heroBackgroundImage: LED_BUS_LDBSE_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: LED_BUS_LDBSE_HERO_BACKGROUND_IMAGE_ALT,
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      {
        icon: "performance",
        title: "Performance",
        values: [
          { label: "Power Range", value: "50–250 W" },
          { label: "Luminous Flux", value: "6,750–37,000 lm" },
          { label: "Efficiency", value: "135–148 lm/W" },
        ],
      },
      {
        icon: "light-quality",
        title: "Light Quality",
        values: [
          { label: "Multi-Lens Optical Structure" },
          { label: "CRI", value: "75–85" },
          { label: "Models", value: "8 Variants" },
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
          { label: "Sizes", value: "11×60 / 11×90 / 11×120 / 11×150 cm" },
          { label: "Weight", value: "2.0–4.8 kg" },
          { label: "Mounting", value: "Cable Channel / Busbar / Adjustable Wall" },
        ],
      },
    ],
    technicalAssurance: [
      {
        icon: "colour-finish",
        label: "Colour & Finish",
        value: "White · Black · Custom RAL on request",
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
      efficiency: "Efficiency",
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
        image: LED_BUS_LDBSE_PHOTOMETRIC_IMAGE,
        imageAlt: "LED-BUS LDBSE photometric polar distribution diagrams",
      },
      {
        title: "Technical Drawing",
        image: LED_BUS_LDBSE_TECHNICAL_DRAWING_IMAGE,
        imageAlt: "LED-BUS LDBSE technical drawing with cross-section dimensions",
      },
    ],
    dimensionNote:
      "Luminaire cross-section: approximately 105 × 46.80 mm. Overall length L corresponds to each model's stated size (11×60 / 11×90 / 11×120 / 11×150 cm) — see the model table above for exact per-model dimensions.",
    applicationsHeading: "Typical Applications",
    applicationImage: LED_BUS_LDBSE_APPLICATION_IMAGE,
    applicationImageAlt: LED_BUS_LDBSE_APPLICATION_IMAGE_ALT,
    applications: [
      {
        icon: "industrial-facility",
        title: "Industrial Facilities",
        image: LED_BUS_LDBSE_APPLICATION_IMAGE,
        imageAlt: LED_BUS_LDBSE_APPLICATION_IMAGE_ALT,
        description: "Large-span industrial and production facilities.",
      },
      {
        icon: "hangar",
        title: "Aviation & Airports",
        image: LED_BUS_LDBSE_APPLICATION_AVIATION_AIRPORTS_IMAGE,
        imageAlt: "Airport apron at night with a parked aircraft, ground service vehicles and control tower",
        description: "Airport ground-operations and aviation environments.",
      },
      {
        icon: "warehouse",
        title: "Logistics Facilities",
        image: LED_BUS_LDBSE_APPLICATION_LOGISTICS_FACILITIES_IMAGE,
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
      {
        slug: "led-bus-ldbe",
        name: "LED-BUS LDBE Series Lighting Systems",
        subtitle: "50–250 W · Multi-lens optics",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbe",
      },
      { slug: "led-bus-ldbse", name: "LED-BUS LDBSE Series Lighting Systems", subtitle: "50–250 W · Slim body", isCurrent: true },
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
      title: "Need help selecting the right LDBSE configuration?",
      description:
        "Our technical team can help with model selection, busbar or cable-channel integration, wall mounting, controls and project specification.",
      action: "Request Technical Support",
    },
  },
  ua: {
    metadata: {
      title: "LED-BUS LDBSE Series Lighting Systems | Промислове освітлення та освітлення високих прольотів | Системи LED-освітлення | InfraVolt",
      description:
        "LED-BUS LDBSE Series Lighting Systems — 8 каталожних моделей, 50–250 Вт, тонкопрофільна мультилінзова оптика, 135–148 лм/Вт, IP20/IP65, для промислових, авіаційних та логістичних об'єктів.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "Системи LED-освітлення",
      category: "Промислове освітлення та освітлення високих прольотів",
      current: "LED-BUS LDBSE Series Lighting Systems",
    },
    backToCategoryLabel: "Назад до промислового освітлення та освітлення високих прольотів",
    hero: {
      eyebrow: "СИСТЕМИ LED",
      category: "Промислове освітлення та освітлення високих прольотів",
      title: "LED-BUS LDBSE Series Lighting Systems",
      description:
        "Тонкопрофільне промислове LED-освітлення з мультилінзовою оптичною структурою для промислових об'єктів, авіаційних та аеропортових середовищ, а також логістичних застосувань, з кількома системними варіантами монтажу.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    heroImage: LED_BUS_LDBSE_HERO_IMAGE,
    heroImageAlt: "Увімкнений світильник LED-BUS LDBSE, ракурсний вигляд мультилінзової смуги розсіювача",
    heroBackgroundImage: LED_BUS_LDBSE_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: "Інтер'єр промислового ангару з видимим літаком на задньому плані, освітлений високостельовими LED-світильниками",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      {
        icon: "performance",
        title: "Продуктивність",
        values: [
          { label: "Діапазон потужності", value: "50–250 Вт" },
          { label: "Світловий потік", value: "6 750–37 000 лм" },
          { label: "Ефективність", value: "135–148 лм/Вт" },
        ],
      },
      {
        icon: "light-quality",
        title: "Якість світла",
        values: [
          { label: "Мультилінзова оптична структура" },
          { label: "CRI", value: "75–85" },
          { label: "Моделі", value: "8 варіантів" },
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
          { label: "Розміри", value: "11×60 / 11×90 / 11×120 / 11×150 см" },
          { label: "Вага", value: "2,0–4,8 кг" },
          { label: "Монтаж", value: "Кабельний канал / Шинопровід / Регульований настінний" },
        ],
      },
    ],
    technicalAssurance: [
      {
        icon: "colour-finish",
        label: "Колір та оздоблення",
        value: "Білий · Чорний · Індивідуальний RAL за запитом",
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
      efficiency: "Ефективність",
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
        image: LED_BUS_LDBSE_PHOTOMETRIC_IMAGE,
        imageAlt: "Полярні діаграми фотометричного розподілу LED-BUS LDBSE",
      },
      {
        title: "Технічне креслення",
        image: LED_BUS_LDBSE_TECHNICAL_DRAWING_IMAGE,
        imageAlt: "Технічне креслення LED-BUS LDBSE з розмірами поперечного перерізу",
      },
    ],
    dimensionNote:
      "Поперечний переріз світильника: приблизно 105 × 46,80 мм. Загальна довжина L відповідає заявленому розміру моделі (11×60 / 11×90 / 11×120 / 11×150 см) — точні розміри моделей див. у таблиці вище.",
    applicationsHeading: "Типові застосування",
    applicationImage: LED_BUS_LDBSE_APPLICATION_IMAGE,
    applicationImageAlt: "Промисловий об'єкт великого прольоту, освітлений світильниками LED-BUS LDBSE",
    applications: [
      {
        icon: "industrial-facility",
        title: "Промислові об'єкти",
        image: LED_BUS_LDBSE_APPLICATION_IMAGE,
        imageAlt: "Промисловий об'єкт великого прольоту, освітлений світильниками LED-BUS LDBSE",
        description: "Промислові та виробничі об'єкти великого прольоту.",
      },
      {
        icon: "hangar",
        title: "Авіація та аеропорти",
        image: LED_BUS_LDBSE_APPLICATION_AVIATION_AIRPORTS_IMAGE,
        imageAlt: "Перон аеропорту вночі з припаркованим літаком, наземною технікою та вежею управління польотами",
        description: "Наземні операції аеропортів та авіаційні середовища.",
      },
      {
        icon: "warehouse",
        title: "Логістичні об'єкти",
        image: LED_BUS_LDBSE_APPLICATION_LOGISTICS_FACILITIES_IMAGE,
        imageAlt: "Прохід складу зі стелажами для піддонів та навантажувачем, освітлений високостельовими LED-світильниками",
        description: "Логістичні проходи та складські зали з високими стелями.",
      },
    ],
    siblingFamiliesHeading: "Інші промислові серії та серії високих прольотів",
    siblingViewSeriesLabel: "Переглянути серію",
    currentFamilyBadgeLabel: "Поточна серія",
    siblingFamilies: [
      {
        slug: "led-bus-high-ceiling",
        name: "LED-BUS High Ceiling Lighting Systems",
        subtitle: "50–240 Вт · IP65",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-high-ceiling",
      },
      {
        slug: "led-bus-ldbe",
        name: "LED-BUS LDBE Series Lighting Systems",
        subtitle: "50–250 Вт · Мультилінзова оптика",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbe",
      },
      { slug: "led-bus-ldbse", name: "LED-BUS LDBSE Series Lighting Systems", subtitle: "50–250 Вт · Тонкий корпус", isCurrent: true },
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
      title: "Потрібна допомога з підбором конфігурації LDBSE?",
      description:
        "Наша технічна команда допоможе з вибором моделі, інтеграції з шинопроводом чи кабельним каналом, настінним монтажем, керуванням та специфікацією проєкту.",
      action: "Запросити технічну підтримку",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function ledBusLdbseContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

export { SUPPORT_REQUEST_HREF as LED_BUS_LDBSE_SUPPORT_REQUEST_HREF };

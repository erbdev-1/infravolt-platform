import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

/** Real extracted LEDBUS catalogue assets. Shared across markets; only
 * copy is localized.
 *
 * Hero background/foreground: premium pre-generated assets sourced from
 * the shared Industrial & High-Bay category asset library
 * (category/industrial&high-bay/product and .../product/background) —
 * a real industrial warehouse interior and the real, fully visible
 * LED-BUS High Ceiling fixture, already isolated and switched on with
 * neutral-white light. Replaces this file's earlier from-scratch
 * flood-fill/glow composite (now superseded) now that a higher-quality
 * verified pair exists for this family.
 *
 * Photometric/technical drawing: likewise sourced from the shared
 * category asset library's photometric/ and technical/ folders — higher
 * resolution renders of the same real catalogue photometric polar
 * diagram and technical drawing, replacing the small raw catalogue-scan
 * PNGs originally extracted directly from the source PDF. */
export const LED_BUS_HIGH_CEILING_HERO_IMAGE =
  "/assets/products/led-lighting/series/led-bus-high-ceiling/led-bus-high-ceiling-hero-foreground.webp";
export const LED_BUS_HIGH_CEILING_HERO_IMAGE_ALT =
  "LED-BUS High Ceiling luminaire, illuminated, front view of the light-emitting diffuser";
export const LED_BUS_HIGH_CEILING_HERO_BACKGROUND_IMAGE =
  "/assets/products/led-lighting/series/led-bus-high-ceiling/led-bus-high-ceiling-hero-background.webp";
export const LED_BUS_HIGH_CEILING_HERO_BACKGROUND_IMAGE_ALT =
  "High-ceiling warehouse interior with visible industrial LED lighting fixtures";
export const LED_BUS_HIGH_CEILING_APPLICATION_IMAGE =
  "/assets/products/led-lighting/series/led-bus-high-ceiling/led-bus-high-ceiling-application.webp";
export const LED_BUS_HIGH_CEILING_APPLICATION_IMAGE_ALT =
  "High-ceiling warehouse storage area lit by LED-BUS High Ceiling luminaires";
/** Typical Applications card grid — Hangars and Aircraft Maintenance
 * photos. Real LEDBUS/GERSAN catalogue site-ready photography, sourced
 * from other families in the same extraction (the High Ceiling family's
 * own catalogue page only ships one application photo — see above) and
 * verified to genuinely depict the stated venue type: an airport apron/
 * ground-operations scene (Hangars) and an aircraft assembly/maintenance
 * hangar interior (Aircraft Maintenance). */
export const LED_BUS_HIGH_CEILING_APPLICATION_HANGARS_IMAGE =
  "/assets/products/led-lighting/series/led-bus-high-ceiling/led-bus-high-ceiling-application-hangars.webp";
export const LED_BUS_HIGH_CEILING_APPLICATION_AIRCRAFT_MAINTENANCE_IMAGE =
  "/assets/products/led-lighting/series/led-bus-high-ceiling/led-bus-high-ceiling-application-aircraft-maintenance.webp";
/** Real port/heavy-industry photo (container ship, gantry cranes, quay
 * floodlighting) — already used site-wide as the Industrial & High-Bay
 * category page's "Ports & Heavy Industry" application photo; copied
 * in for this series page's own Ports card. */
export const LED_BUS_HIGH_CEILING_APPLICATION_PORTS_IMAGE =
  "/assets/products/led-lighting/series/led-bus-high-ceiling/led-bus-high-ceiling-application-ports.webp";
export const LED_BUS_HIGH_CEILING_PHOTOMETRIC_IMAGE =
  "/assets/products/led-lighting/series/led-bus-high-ceiling/led-bus-high-ceiling-photometric.webp";
export const LED_BUS_HIGH_CEILING_TECHNICAL_DRAWING_IMAGE =
  "/assets/products/led-lighting/series/led-bus-high-ceiling/led-bus-high-ceiling-technical-drawing.webp";

const MODELS_UK: readonly LedSeriesModel[] = [
  { model: "LED-BUS LDB1-50", powerW: 50, luminousFluxLm: "6,600 lm", efficiencyLmW: "132.0 lm/W", ip: "IP65", weightKg: "6.0 kg" },
  { model: "LED-BUS LDB2-75", powerW: 75, luminousFluxLm: "11,880 lm", efficiencyLmW: "158.4 lm/W", ip: "IP65", weightKg: "6.0 kg" },
  { model: "LED-BUS LDB3-100", powerW: 100, luminousFluxLm: "15,290 lm", efficiencyLmW: "152.9 lm/W", ip: "IP65", weightKg: "7.5 kg" },
  { model: "LED-BUS LDB4-150", powerW: 150, luminousFluxLm: "21,750 lm", efficiencyLmW: "145.0 lm/W", ip: "IP65", weightKg: "8.75 kg" },
  { model: "LED-BUS LDB5-185", powerW: 185, luminousFluxLm: "26,300 lm", efficiencyLmW: "142.0 lm/W", ip: "IP65", weightKg: "9.2 kg" },
  { model: "LED-BUS LDB7-200", powerW: 200, luminousFluxLm: "28,200 lm", efficiencyLmW: "141.0 lm/W", ip: "IP65", weightKg: "9.2 kg" },
  { model: "LED-BUS LDB8-222", powerW: 222, luminousFluxLm: "31,750 lm", efficiencyLmW: "143.0 lm/W", ip: "IP65", weightKg: "9.2 kg" },
  { model: "LED-BUS LDB9-240", powerW: 240, luminousFluxLm: "33,600 lm", efficiencyLmW: "140.0 lm/W", ip: "IP65", weightKg: "9.2 kg" },
] as const;

const MODELS_UA: readonly LedSeriesModel[] = [
  { model: "LED-BUS LDB1-50", powerW: 50, luminousFluxLm: "6 600 лм", efficiencyLmW: "132,0 лм/Вт", ip: "IP65", weightKg: "6,0 кг" },
  { model: "LED-BUS LDB2-75", powerW: 75, luminousFluxLm: "11 880 лм", efficiencyLmW: "158,4 лм/Вт", ip: "IP65", weightKg: "6,0 кг" },
  { model: "LED-BUS LDB3-100", powerW: 100, luminousFluxLm: "15 290 лм", efficiencyLmW: "152,9 лм/Вт", ip: "IP65", weightKg: "7,5 кг" },
  { model: "LED-BUS LDB4-150", powerW: 150, luminousFluxLm: "21 750 лм", efficiencyLmW: "145,0 лм/Вт", ip: "IP65", weightKg: "8,75 кг" },
  { model: "LED-BUS LDB5-185", powerW: 185, luminousFluxLm: "26 300 лм", efficiencyLmW: "142,0 лм/Вт", ip: "IP65", weightKg: "9,2 кг" },
  { model: "LED-BUS LDB7-200", powerW: 200, luminousFluxLm: "28 200 лм", efficiencyLmW: "141,0 лм/Вт", ip: "IP65", weightKg: "9,2 кг" },
  { model: "LED-BUS LDB8-222", powerW: 222, luminousFluxLm: "31 750 лм", efficiencyLmW: "143,0 лм/Вт", ip: "IP65", weightKg: "9,2 кг" },
  { model: "LED-BUS LDB9-240", powerW: 240, luminousFluxLm: "33 600 лм", efficiencyLmW: "140,0 лм/Вт", ip: "IP65", weightKg: "9,2 кг" },
] as const;

const SUPPORT_REQUEST_HREF = "/uk-support?request=technical-pack&product=led-bus-high-ceiling";

const content = {
  uk: {
    metadata: {
      title: "LED-BUS High Ceiling Lighting Systems | Industrial & High-Bay Lighting | LED Systems | InfraVolt",
      description:
        "LED-BUS High Ceiling Lighting Systems — 8 catalogue models, 50–240 W, IP65, direct Gersan Lighting Busbar integration, for warehouses, hangars, ports and aircraft-maintenance areas.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      category: "Industrial & High-Bay Lighting",
      current: "LED-BUS High Ceiling Lighting Systems",
    },
    backToCategoryLabel: "Back to Industrial & High-Bay Lighting",
    hero: {
      eyebrow: "LED SYSTEMS",
      category: "Industrial & High-Bay Lighting",
      title: "LED-BUS High Ceiling Lighting Systems",
      description:
        "High-output industrial LED lighting designed for warehouses, hangars, ports, aircraft-maintenance areas and other high-ceiling environments, with direct Gersan Lighting Busbar integration and suspended installation options.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    heroImage: LED_BUS_HIGH_CEILING_HERO_IMAGE,
    heroImageAlt: LED_BUS_HIGH_CEILING_HERO_IMAGE_ALT,
    heroBackgroundImage: LED_BUS_HIGH_CEILING_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: LED_BUS_HIGH_CEILING_HERO_BACKGROUND_IMAGE_ALT,
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      {
        icon: "performance",
        title: "Performance",
        values: [
          { label: "Power Range", value: "50–240 W" },
          { label: "Luminous Flux", value: "6,600–33,600 lm" },
          { label: "Efficiency", value: "132–158.4 lm/W" },
        ],
      },
      {
        icon: "light-quality",
        title: "Light Quality",
        values: [
          { label: "Colour Temperature", value: "3000–6500 K" },
          { label: "Uniform Illumination" },
          { label: "Colour Tolerance", value: "MacAdam 3" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Protection & Electrical",
        values: [
          { label: "IP65" },
          { label: "Voltage", value: "110–240 V" },
          { label: "Power Factor", value: ">0.95" },
          { label: "Operating Temperature", value: "−30 to +60 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Construction & Installation",
        values: [
          { label: "Anodised Body & Covers" },
          { label: "Ultra-Clear Tempered Glass" },
          { label: "Direct Lighting Busbar Connection" },
          { label: "Steel-Wire Suspension" },
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
        value: "CE · RoHS compliant · IP65",
      },
      {
        icon: "warranty",
        label: "Warranty",
        value: "7-Year Warranty",
      },
    ],
    modelsHeading: "Models & Technical Schedule",
    modelsIntroduction: "Eight verified catalogue models — search or filter by power to find the right variant.",
    models: MODELS_UK,
    modelsColumns: {
      model: "Model / Catalogue Code",
      power: "Power",
      luminousFlux: "Luminous Flux",
      efficiency: "Efficiency",
      ip: "IP",
      weight: "Weight",
    },
    modelsFilters: {
      searchLabel: "Search",
      searchPlaceholder: "Search by model or catalogue code",
      powerFilterLabel: "Power",
      allPowersLabel: "All powers",
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
        icon: "busbar-connect",
        title: "Lighting Busbar Connection",
        description: "Direct connection to the Gersan Lighting Busbar system without requiring external connections.",
      },
      {
        icon: "suspension",
        title: "Steel-Wire Suspension",
        description: "Suspended installation using steel-wire support for high-ceiling applications.",
      },
      {
        icon: "mounting-options",
        title: "GL / GNL / Channel Mounting",
        description: "Catalogue-supported mounting arrangements using GL, GNL and channel components.",
      },
    ],
    controlsHeading: "Controls & Lighting Options",
    controlsIntroduction: "Catalogue-listed control and system options — not every option is standard on every model.",
    controlOptions: [
      { icon: "control-plc", label: "G-BUS PLC" },
      { icon: "control-dali", label: "DALI" },
      { icon: "control-dimmer", label: "SwitchDIM" },
      { icon: "control-signal", label: "1–10 V" },
      { icon: "control-emergency", label: "Emergency" },
      { icon: "control-sensor", label: "Sensor" },
    ],
    opticalOptionsHeading: "Optical Options",
    opticalOptions: [
      "Highly reflective reflectors in different angles and designs",
      "Ultra-clear tempered glass cover",
      "Transparent, frosted and diffuser cover options",
    ],
    photometricHeading: "Photometric & Technical Data",
    technicalAssets: [
      {
        title: "Photometric Data",
        image: LED_BUS_HIGH_CEILING_PHOTOMETRIC_IMAGE,
        imageAlt: "LED-BUS High Ceiling photometric polar distribution diagrams",
      },
      {
        title: "Technical Drawing",
        image: LED_BUS_HIGH_CEILING_TECHNICAL_DRAWING_IMAGE,
        imageAlt: "LED-BUS High Ceiling technical drawing with cross-section dimensions and GL/GNL/Channel mounting components",
      },
    ],
    dimensionNote:
      "Luminaire cross-section: approximately 135.75 × 74.37 mm. Overall length L varies by configuration; numerical model lengths are not stated in the source catalogue.",
    applicationsHeading: "Typical Applications",
    applicationImage: LED_BUS_HIGH_CEILING_APPLICATION_IMAGE,
    applicationImageAlt: LED_BUS_HIGH_CEILING_APPLICATION_IMAGE_ALT,
    applications: [
      {
        icon: "hangar",
        title: "Hangars",
        image: LED_BUS_HIGH_CEILING_APPLICATION_HANGARS_IMAGE,
        imageAlt: "Airport apron at night with a parked aircraft, ground service vehicles and control tower",
        description: "Aircraft storage and wide-span, high-ceiling spaces.",
      },
      {
        icon: "warehouse",
        title: "Warehouses & Storage",
        image: LED_BUS_HIGH_CEILING_APPLICATION_IMAGE,
        imageAlt: LED_BUS_HIGH_CEILING_APPLICATION_IMAGE_ALT,
        description: "Logistics aisles and high-bay storage halls.",
      },
      {
        icon: "port",
        title: "Ports",
        image: LED_BUS_HIGH_CEILING_APPLICATION_PORTS_IMAGE,
        imageAlt: "Container ship at a floodlit port quay with gantry cranes and heavy industry in the background",
        description: "Heavy-duty loading and port environments.",
      },
      {
        icon: "aircraft-maintenance",
        title: "Aircraft Maintenance",
        image: LED_BUS_HIGH_CEILING_APPLICATION_AIRCRAFT_MAINTENANCE_IMAGE,
        imageAlt: "Aircraft assembly and maintenance hangar interior with an overhead gantry crane and technician workstations",
        description: "Technical maintenance and inspection areas.",
      },
    ],
    siblingFamiliesHeading: "Other Industrial & High-Bay Families",
    siblingViewSeriesLabel: "View Series",
    currentFamilyBadgeLabel: "Current family",
    siblingFamilies: [
      { slug: "led-bus-high-ceiling", name: "LED-BUS High Ceiling Lighting Systems", subtitle: "50–240 W · IP65", isCurrent: true },
      {
        slug: "led-bus-ldbe",
        name: "LED-BUS LDBE Series Lighting Systems",
        subtitle: "50–250 W · Multi-lens optics",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbe",
      },
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
      title: "Need help selecting the right LED-BUS high-ceiling configuration?",
      description: "Our technical team can help with model selection, Lighting Busbar integration, mounting, controls and project specification.",
      action: "Request Technical Support",
    },
  },
  ua: {
    metadata: {
      title: "LED-BUS High Ceiling Lighting Systems | Промислове освітлення та освітлення високих прольотів | Системи LED-освітлення | InfraVolt",
      description:
        "LED-BUS High Ceiling Lighting Systems — 8 каталожних моделей, 50–240 Вт, IP65, пряма інтеграція з шинопроводом Gersan Lighting Busbar, для складів, ангарів, портів та зон обслуговування авіатехніки.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "Системи LED-освітлення",
      category: "Промислове освітлення та освітлення високих прольотів",
      current: "LED-BUS High Ceiling Lighting Systems",
    },
    backToCategoryLabel: "Назад до промислового освітлення та освітлення високих прольотів",
    hero: {
      eyebrow: "СИСТЕМИ LED",
      category: "Промислове освітлення та освітлення високих прольотів",
      title: "LED-BUS High Ceiling Lighting Systems",
      description:
        "Потужне промислове LED-освітлення для складів, ангарів, портів, зон обслуговування авіатехніки та інших приміщень з високими стелями, з прямою інтеграцією до шинопроводу Gersan Lighting Busbar та варіантами підвісного монтажу.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    heroImage: LED_BUS_HIGH_CEILING_HERO_IMAGE,
    heroImageAlt: "Увімкнений світильник LED-BUS High Ceiling, вигляд спереду на світловипромінюючий розсіювач",
    heroBackgroundImage: LED_BUS_HIGH_CEILING_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: "Складське приміщення з високими стелями з промисловими світильниками LED",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      {
        icon: "performance",
        title: "Продуктивність",
        values: [
          { label: "Діапазон потужності", value: "50–240 Вт" },
          { label: "Світловий потік", value: "6 600–33 600 лм" },
          { label: "Ефективність", value: "132–158,4 лм/Вт" },
        ],
      },
      {
        icon: "light-quality",
        title: "Якість світла",
        values: [
          { label: "Колірна температура", value: "3000–6500 K" },
          { label: "Рівномірне освітлення" },
          { label: "Колірна толерантність", value: "MacAdam 3" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Захист та електрика",
        values: [
          { label: "IP65" },
          { label: "Напруга", value: "110–240 В" },
          { label: "Коефіцієнт потужності", value: ">0,95" },
          { label: "Робоча температура", value: "−30 до +60 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Конструкція та монтаж",
        values: [
          { label: "Анодований корпус і кришки" },
          { label: "Надчисте загартоване скло" },
          { label: "Пряме підключення до шинопроводу" },
          { label: "Тросовий підвіс" },
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
        value: "CE · Відповідність RoHS · IP65",
      },
      {
        icon: "warranty",
        label: "Гарантія",
        value: "7 років гарантії",
      },
    ],
    modelsHeading: "Моделі та технічний розклад",
    modelsIntroduction: "Вісім перевірених каталожних моделей — здійснюйте пошук або фільтруйте за потужністю.",
    models: MODELS_UA,
    modelsColumns: {
      model: "Модель / каталожний код",
      power: "Потужність",
      luminousFlux: "Світловий потік",
      efficiency: "Ефективність",
      ip: "IP",
      weight: "Вага",
    },
    modelsFilters: {
      searchLabel: "Пошук",
      searchPlaceholder: "Пошук за моделлю або каталожним кодом",
      powerFilterLabel: "Потужність",
      allPowersLabel: "Усі потужності",
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
        icon: "busbar-connect",
        title: "Підключення до шинопроводу",
        description: "Пряме підключення до системи Gersan Lighting Busbar без потреби в зовнішніх з'єднаннях.",
      },
      {
        icon: "suspension",
        title: "Тросовий підвіс",
        description: "Підвісний монтаж за допомогою сталевого тросу для приміщень з високими стелями.",
      },
      {
        icon: "mounting-options",
        title: "Монтаж GL / GNL / Канал",
        description: "Каталожні варіанти монтажу з використанням компонентів GL, GNL та канальних елементів.",
      },
    ],
    controlsHeading: "Керування та варіанти освітлення",
    controlsIntroduction: "Каталожні варіанти керування та систем — не кожна опція є стандартною для кожної моделі.",
    controlOptions: [
      { icon: "control-plc", label: "G-BUS PLC" },
      { icon: "control-dali", label: "DALI" },
      { icon: "control-dimmer", label: "SwitchDIM" },
      { icon: "control-signal", label: "1–10 В" },
      { icon: "control-emergency", label: "Аварійне освітлення" },
      { icon: "control-sensor", label: "Датчик" },
    ],
    opticalOptionsHeading: "Оптичні опції",
    opticalOptions: [
      "Високовідбивні рефлектори різних кутів та конструкцій",
      "Кришка з надчистого загартованого скла",
      "Варіанти прозорої, матової та розсіювальної кришки",
    ],
    photometricHeading: "Фотометричні та технічні дані",
    technicalAssets: [
      {
        title: "Фотометричні дані",
        image: LED_BUS_HIGH_CEILING_PHOTOMETRIC_IMAGE,
        imageAlt: "Полярні діаграми фотометричного розподілу LED-BUS High Ceiling",
      },
      {
        title: "Технічне креслення",
        image: LED_BUS_HIGH_CEILING_TECHNICAL_DRAWING_IMAGE,
        imageAlt: "Технічне креслення LED-BUS High Ceiling з розмірами поперечного перерізу та компонентами монтажу GL/GNL/Канал",
      },
    ],
    dimensionNote:
      "Поперечний переріз світильника: приблизно 135,75 × 74,37 мм. Загальна довжина L залежить від конфігурації; числові значення довжини моделей у первинному каталозі не вказані.",
    applicationsHeading: "Типові застосування",
    applicationImage: LED_BUS_HIGH_CEILING_APPLICATION_IMAGE,
    applicationImageAlt: "Складське приміщення з високими стелями, освітлене світильниками LED-BUS High Ceiling",
    applications: [
      {
        icon: "hangar",
        title: "Ангари",
        image: LED_BUS_HIGH_CEILING_APPLICATION_HANGARS_IMAGE,
        imageAlt: "Перон аеропорту вночі з припаркованим літаком, наземною технікою та вежею управління польотами",
        description: "Зберігання повітряних суден і простори з високими стелями великого прольоту.",
      },
      {
        icon: "warehouse",
        title: "Склади та зберігання",
        image: LED_BUS_HIGH_CEILING_APPLICATION_IMAGE,
        imageAlt: "Складське приміщення з високими стелями, освітлене світильниками LED-BUS High Ceiling",
        description: "Логістичні проходи та складські зали з високими стелями.",
      },
      {
        icon: "port",
        title: "Порти",
        image: LED_BUS_HIGH_CEILING_APPLICATION_PORTS_IMAGE,
        imageAlt: "Контейнеровоз біля освітленого прожекторами портового причалу з портальними кранами та важкою промисловістю на задньому плані",
        description: "Вантажно-розвантажувальні роботи та портові середовища.",
      },
      {
        icon: "aircraft-maintenance",
        title: "Обслуговування авіатехніки",
        image: LED_BUS_HIGH_CEILING_APPLICATION_AIRCRAFT_MAINTENANCE_IMAGE,
        imageAlt: "Інтер'єр ангару для складання та обслуговування літаків з мостовим краном та робочими місцями техніків",
        description: "Технічне обслуговування та зони огляду.",
      },
    ],
    siblingFamiliesHeading: "Інші промислові серії та серії високих прольотів",
    siblingViewSeriesLabel: "Переглянути серію",
    currentFamilyBadgeLabel: "Поточна серія",
    siblingFamilies: [
      { slug: "led-bus-high-ceiling", name: "LED-BUS High Ceiling Lighting Systems", subtitle: "50–240 Вт · IP65", isCurrent: true },
      {
        slug: "led-bus-ldbe",
        name: "LED-BUS LDBE Series Lighting Systems",
        subtitle: "50–250 Вт · Мультилінзова оптика",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbe",
      },
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
      title: "Потрібна допомога з підбором конфігурації LED-BUS High Ceiling?",
      description: "Наша технічна команда допоможе з вибором моделі, інтеграцією з шинопроводом Lighting Busbar, монтажем, керуванням та специфікацією проєкту.",
      action: "Запросити технічну підтримку",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function ledBusHighCeilingContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

export { SUPPORT_REQUEST_HREF as LED_BUS_HIGH_CEILING_SUPPORT_REQUEST_HREF };

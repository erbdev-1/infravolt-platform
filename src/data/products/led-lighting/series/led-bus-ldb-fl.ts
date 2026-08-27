import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

/** Real LED-BUS LDB-FL assets. Shared across markets; only copy is
 * localized.
 *
 * Hero background/foreground: pre-generated, already-isolated assets
 * found under the Industrial & High-Bay category asset folder
 * (`.../category/industrial-high-bay/product/`) — a dark, premium
 * factory/manufacturing interior (background) and the real LDB-FL
 * fixture, fully visible with its fabricated-steel housing and 4 mm
 * tempered-glass cover, already reading as switched on with neutral-
 * white light against a transparent backdrop (foreground). Copied as-is
 * into this series' own asset folder; no further processing needed —
 * unlike High Ceiling/LDBE/LDBSE, no flood-fill/glow pass was required
 * here because these assets were already prepared to the same standard. */
export const LED_BUS_LDB_FL_HERO_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldb-fl/led-bus-ldb-fl-hero-foreground.webp");
export const LED_BUS_LDB_FL_HERO_IMAGE_ALT =
  "LED-BUS LDB-FL luminaire, illuminated, fabricated-steel housing with 4 mm tempered-glass cover";
export const LED_BUS_LDB_FL_HERO_BACKGROUND_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldb-fl/led-bus-ldb-fl-hero-background.webp");
export const LED_BUS_LDB_FL_HERO_BACKGROUND_IMAGE_ALT =
  "Dark industrial manufacturing facility interior with operational high-bay lighting";
/** The family's own verified catalogue application photo — a large-span
 * industrial/aircraft-assembly interior. Used for the "Industrial
 * Facilities" application card per the verified recommended_site_usage
 * in the catalogue extraction manifest. */
export const LED_BUS_LDB_FL_APPLICATION_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldb-fl/led-bus-ldb-fl-industrial-application.webp");
export const LED_BUS_LDB_FL_APPLICATION_IMAGE_ALT =
  "Large-span industrial facility interior with overhead crane, lit by high-bay LED fixtures";
/** Photometric/technical drawing: higher-resolution renders sourced from
 * the shared Industrial & High-Bay category asset library's
 * photometric/ and technical/ folders — the same real catalogue data,
 * replacing the small raw catalogue-scan PNGs originally extracted
 * directly from the source PDF. */
export const LED_BUS_LDB_FL_PHOTOMETRIC_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldb-fl/led-bus-ldb-fl-photometric.webp");
export const LED_BUS_LDB_FL_TECHNICAL_DRAWING_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldb-fl/led-bus-ldb-fl-technical-drawing.webp");
/** Typical Applications card grid — Aviation & Airports and Logistics
 * Facilities photos. LDB-FL's own catalogue page ships only one
 * application photo (above), so these reuse real, verified LEDBUS/
 * GERSAN site-ready photography already used elsewhere on the site: a
 * genuine airport apron/ground-operations scene (already used as High
 * Ceiling's "Hangars" and LDBSE's "Aviation & Airports" card) and a
 * warehouse aisle with pallet racking and a forklift (already used on
 * the category page and LDBSE's "Logistics Facilities" card). Neither
 * photo repeats within this page's own 3-card grid. */
export const LED_BUS_LDB_FL_APPLICATION_AVIATION_AIRPORTS_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldb-fl/led-bus-ldb-fl-application-aviation-airports.webp");
export const LED_BUS_LDB_FL_APPLICATION_LOGISTICS_FACILITIES_IMAGE =
  publicMediaUrl("products/led-lighting/series/led-bus-ldb-fl/led-bus-ldb-fl-application-logistics-facilities.webp");

/** Source-accuracy note (LED-BUS LDB-FL catalogue extraction, page 13):
 * the technical DRAWING clearly states the luminaire profile as
 * W 210 mm × H 75 mm, with overall length L = 1200 or 1500 mm. The
 * printed model TABLE on the same page instead shows "2100x1200x75" /
 * "2100x1500x75" — the leading "2100" conflicts with the drawing's
 * unambiguous 210 mm width and is treated as a table-printing artefact,
 * not a real 2.1 m fixture width. The dimensions below intentionally
 * follow the technical drawing (210 mm), matching the values already
 * verified in the catalogue extraction report
 * (led-bus-ldb-fl-series-lighting-systems-report.md, section 12). The
 * raw catalogue extraction files themselves are left untouched. */
const DIMENSIONS_SHORT: Record<"1200" | "1500", string> = {
  "1200": "210 × 1200 × 75 mm",
  "1500": "210 × 1500 × 75 mm",
};

/** Order-code note: the catalogue prints these as "73O-LDBxFL" — the
 * character between "73" and "-LDB" is visually ambiguous between
 * uppercase "O" and zero "0" in the source scan. The verified
 * extraction records it as "O"; that representation is kept as-is
 * rather than silently normalised to "0". See modelsNote below for the
 * user-facing equivalent of this note. */
const MODELS_UK: readonly LedSeriesModel[] = [
  { model: "73O-LDB1FL", powerW: 75, luminousFluxLm: "9,983 lm", efficiencyLmW: ">132 lm/W", cri: ">80", colourTemperature: "3000–6000 K", dimensions: DIMENSIONS_SHORT["1200"], length: "1200 mm" },
  { model: "73O-LDB2FL", powerW: 110, luminousFluxLm: "14,600 lm", efficiencyLmW: ">132 lm/W", cri: ">80", colourTemperature: "3000–6000 K", dimensions: DIMENSIONS_SHORT["1200"], length: "1200 mm" },
  { model: "73O-LDB3FL", powerW: 160, luminousFluxLm: "20,960 lm", efficiencyLmW: ">131 lm/W", cri: ">80", colourTemperature: "3000–6000 K", dimensions: DIMENSIONS_SHORT["1500"], length: "1500 mm" },
  { model: "73O-LDB4FL", powerW: 205, luminousFluxLm: "27,800 lm", efficiencyLmW: ">135 lm/W", cri: ">80", colourTemperature: "3000–6000 K", dimensions: DIMENSIONS_SHORT["1500"], length: "1500 mm" },
] as const;

const MODELS_UA: readonly LedSeriesModel[] = [
  { model: "73O-LDB1FL", powerW: 75, luminousFluxLm: "9 983 лм", efficiencyLmW: ">132 лм/Вт", cri: ">80", colourTemperature: "3000–6000 K", dimensions: DIMENSIONS_SHORT["1200"], length: "1200 мм" },
  { model: "73O-LDB2FL", powerW: 110, luminousFluxLm: "14 600 лм", efficiencyLmW: ">132 лм/Вт", cri: ">80", colourTemperature: "3000–6000 K", dimensions: DIMENSIONS_SHORT["1200"], length: "1200 мм" },
  { model: "73O-LDB3FL", powerW: 160, luminousFluxLm: "20 960 лм", efficiencyLmW: ">131 лм/Вт", cri: ">80", colourTemperature: "3000–6000 K", dimensions: DIMENSIONS_SHORT["1500"], length: "1500 мм" },
  { model: "73O-LDB4FL", powerW: 205, luminousFluxLm: "27 800 лм", efficiencyLmW: ">135 лм/Вт", cri: ">80", colourTemperature: "3000–6000 K", dimensions: DIMENSIONS_SHORT["1500"], length: "1500 мм" },
] as const;


const content = {
  uk: {
    metadata: {
      title: "LED-BUS LDB-FL Series Lighting Systems | Industrial & High-Bay Lighting | LED Systems | InfraVolt",
      description:
        "LED-BUS LDB-FL Series Lighting Systems — 4 catalogue models, 75–205 W, fabricated-steel housing, 4 mm tempered-glass cover, IP65, for industrial, aviation and logistics facilities.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      category: "Industrial & High-Bay Lighting",
      current: "LED-BUS LDB-FL Series Lighting Systems",
    },
    backToCategoryLabel: "Back to Industrial & High-Bay Lighting",
    hero: {
      eyebrow: "LED SYSTEMS",
      category: "Industrial & High-Bay Lighting",
      title: "LED-BUS LDB-FL Series Lighting Systems",
      description:
        "Rugged industrial LED lighting with a fabricated-steel housing, electrostatic powder-coated finish and 4 mm tempered-glass cover, engineered for industrial, aviation and logistics environments.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    heroImage: LED_BUS_LDB_FL_HERO_IMAGE,
    heroImageAlt: LED_BUS_LDB_FL_HERO_IMAGE_ALT,
    heroBackgroundImage: LED_BUS_LDB_FL_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: LED_BUS_LDB_FL_HERO_BACKGROUND_IMAGE_ALT,
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      {
        icon: "performance",
        title: "Performance",
        values: [
          { label: "Power Range", value: "75–205 W" },
          { label: "Luminous Flux", value: "9,983–27,800 lm" },
          { label: "Luminous Efficiency", value: ">131–>135 lm/W" },
          { label: "Models", value: "4 Variants" },
        ],
      },
      {
        icon: "light-quality",
        title: "Light Quality",
        values: [
          { label: "Colour Temperature", value: "3000–6000 K" },
          { label: "CRI", value: ">80" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Protection & Electrical",
        values: [
          { label: "IP65" },
          { label: "Voltage", value: "220–240 Vac" },
          { label: "Frequency", value: "50–60 Hz" },
          { label: "Operating Temperature", value: "−20 to +45 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Construction & Installation",
        values: [
          { label: "Fabricated Steel Housing" },
          { label: "Electrostatic Powder Coated" },
          { label: "4 mm Tempered Glass Cover" },
          { label: "Dimensions", value: "W 210 mm · H 75 mm · L 1200 / 1500 mm" },
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
        value: "CE · RoHS compliant · IP65",
      },
      {
        icon: "warranty",
        label: "Warranty",
        value: "5-Year Warranty",
      },
    ],
    modelsHeading: "Models & Technical Schedule",
    modelsIntroduction: "Four verified catalogue models — search or filter by power or length to find the right variant.",
    models: MODELS_UK,
    modelsNote:
      "Catalogue codes are reproduced from the source extraction. One printed character is visually ambiguous between ‘O’ and ‘0’; please confirm the final order code during enquiry.",
    modelsColumns: {
      model: "Model / Catalogue Code",
      power: "Power",
      luminousFlux: "Luminous Flux",
      efficiency: "Efficiency",
      cri: "CRI",
      colourTemperature: "Colour Temp.",
      dimensions: "Dimensions",
    },
    modelsFilters: {
      searchLabel: "Search",
      searchPlaceholder: "Search by model or catalogue code",
      powerFilterLabel: "Power",
      allPowersLabel: "All powers",
      lengthFilterLabel: "Length",
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
    controlsHeading: "Controls & System Options",
    controlsIntroduction: "Catalogue-listed switching, dimming and system options. Availability depends on project configuration.",
    controlOptions: [
      { icon: "control-dali", label: "DALI", secondaryLabel: "Lighting Control" },
      { icon: "control-signal", label: "1–10 V", secondaryLabel: "Analogue Dimming" },
      { icon: "control-touch-dim", label: "Touch-Dim", secondaryLabel: "Push Dimming" },
      { icon: "control-casambi", label: "Casambi", secondaryLabel: "Wireless Control" },
      { icon: "control-dimmer", label: "SwitchDIM", secondaryLabel: "Switching / Dimming" },
      { icon: "control-emergency", label: "Emergency", secondaryLabel: "Emergency Option" },
      { icon: "control-sensor", label: "Sensor", secondaryLabel: "Sensor Option" },
    ],
    photometricHeading: "Photometric & Technical Data",
    technicalAssets: [
      {
        title: "Photometric Data",
        image: LED_BUS_LDB_FL_PHOTOMETRIC_IMAGE,
        imageAlt: "LED-BUS LDB-FL photometric polar distribution diagrams",
      },
      {
        title: "Technical Drawing",
        image: LED_BUS_LDB_FL_TECHNICAL_DRAWING_IMAGE,
        imageAlt: "LED-BUS LDB-FL technical drawing with cross-section and length dimensions",
      },
    ],
    dimensionNote:
      "Luminaire profile: W 210 mm × H 75 mm (per the technical drawing). Overall length L corresponds to each model's stated size (1200 / 1500 mm) — see the model table above for exact per-model dimensions.",
    applicationsHeading: "Typical Applications",
    applicationImage: LED_BUS_LDB_FL_APPLICATION_IMAGE,
    applicationImageAlt: LED_BUS_LDB_FL_APPLICATION_IMAGE_ALT,
    applications: [
      {
        icon: "industrial-facility",
        title: "Industrial Facilities",
        image: LED_BUS_LDB_FL_APPLICATION_IMAGE,
        imageAlt: LED_BUS_LDB_FL_APPLICATION_IMAGE_ALT,
        description: "Industrial production and manufacturing environments.",
      },
      {
        icon: "hangar",
        title: "Aviation & Airports",
        image: LED_BUS_LDB_FL_APPLICATION_AVIATION_AIRPORTS_IMAGE,
        imageAlt: "Airport apron at night with a parked aircraft, ground service vehicles and control tower",
        description: "Large technical and aviation facilities requiring robust high-output lighting.",
      },
      {
        icon: "warehouse",
        title: "Logistics Facilities",
        image: LED_BUS_LDB_FL_APPLICATION_LOGISTICS_FACILITIES_IMAGE,
        imageAlt: "Warehouse aisle with pallet racking and a forklift, lit by high-bay LED fixtures",
        description: "Warehouse and logistics environments with demanding industrial lighting requirements.",
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
      {
        slug: "led-bus-ldbse",
        name: "LED-BUS LDBSE Series Lighting Systems",
        subtitle: "50–250 W · Slim body",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbse",
      },
      { slug: "led-bus-ldb-fl", name: "LED-BUS LDB-FL Series Lighting Systems", subtitle: "75–205 W · Tempered glass", isCurrent: true },
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
      title: "Need help selecting the right LDB-FL configuration?",
      description:
        "Our technical team can help with model selection, controls, dimensions and project specification.",
      action: "Request Technical Support",
    },
  },
  ua: {
    metadata: {
      title: "LED-BUS LDB-FL Series Lighting Systems | Промислове освітлення та освітлення високих прольотів | Системи LED-освітлення | InfraVolt",
      description:
        "LED-BUS LDB-FL Series Lighting Systems — 4 каталожні моделі, 75–205 Вт, фабрикований сталевий корпус, загартоване скло 4 мм, IP65, для промислових, авіаційних та логістичних об'єктів.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "Системи LED-освітлення",
      category: "Промислове освітлення та освітлення високих прольотів",
      current: "LED-BUS LDB-FL Series Lighting Systems",
    },
    backToCategoryLabel: "Назад до промислового освітлення та освітлення високих прольотів",
    hero: {
      eyebrow: "СИСТЕМИ LED",
      category: "Промислове освітлення та освітлення високих прольотів",
      title: "LED-BUS LDB-FL Series Lighting Systems",
      description:
        "Промислове LED-освітлення підвищеної міцності з фабрикованим сталевим корпусом, електростатичним порошковим покриттям та загартованим склом 4 мм, для промислових, авіаційних та логістичних середовищ.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    heroImage: LED_BUS_LDB_FL_HERO_IMAGE,
    heroImageAlt: "Увімкнений світильник LED-BUS LDB-FL, фабрикований сталевий корпус із загартованим склом 4 мм",
    heroBackgroundImage: LED_BUS_LDB_FL_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: "Інтер'єр темного промислового виробничого об'єкта з робочим освітленням високих прольотів",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      {
        icon: "performance",
        title: "Продуктивність",
        values: [
          { label: "Діапазон потужності", value: "75–205 Вт" },
          { label: "Світловий потік", value: "9 983–27 800 лм" },
          { label: "Світлова ефективність", value: ">131–>135 лм/Вт" },
          { label: "Моделі", value: "4 варіанти" },
        ],
      },
      {
        icon: "light-quality",
        title: "Якість світла",
        values: [
          { label: "Колірна температура", value: "3000–6000 K" },
          { label: "CRI", value: ">80" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Захист та електрика",
        values: [
          { label: "IP65" },
          { label: "Напруга", value: "220–240 В" },
          { label: "Частота", value: "50–60 Гц" },
          { label: "Робоча температура", value: "−20 до +45 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Конструкція та монтаж",
        values: [
          { label: "Фабрикований сталевий корпус" },
          { label: "Електростатичне порошкове покриття" },
          { label: "Загартоване скло 4 мм" },
          { label: "Розміри", value: "Ш 210 мм · В 75 мм · Д 1200 / 1500 мм" },
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
        value: "CE · Відповідність RoHS · IP65",
      },
      {
        icon: "warranty",
        label: "Гарантія",
        value: "5 років гарантії",
      },
    ],
    modelsHeading: "Моделі та технічний розклад",
    modelsIntroduction: "Чотири перевірені каталожні моделі — здійснюйте пошук або фільтруйте за потужністю чи довжиною.",
    models: MODELS_UA,
    modelsNote:
      "Каталожні коди наведено з джерела екстракції. Один надрукований символ візуально неоднозначний між ‘O’ та ‘0’; будь ласка, підтвердіть остаточний код замовлення під час запиту.",
    modelsColumns: {
      model: "Модель / каталожний код",
      power: "Потужність",
      luminousFlux: "Світловий потік",
      efficiency: "Ефективність",
      cri: "CRI",
      colourTemperature: "Колірна темп.",
      dimensions: "Розміри",
    },
    modelsFilters: {
      searchLabel: "Пошук",
      searchPlaceholder: "Пошук за моделлю або каталожним кодом",
      powerFilterLabel: "Потужність",
      allPowersLabel: "Усі потужності",
      lengthFilterLabel: "Довжина",
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
    controlsHeading: "Керування та системні опції",
    controlsIntroduction: "Каталожні варіанти перемикання, диммування та системні опції. Доступність залежить від конфігурації проєкту.",
    controlOptions: [
      { icon: "control-dali", label: "DALI", secondaryLabel: "Керування освітленням" },
      { icon: "control-signal", label: "1–10 В", secondaryLabel: "Аналогове диммування" },
      { icon: "control-touch-dim", label: "Touch-Dim", secondaryLabel: "Сенсорне диммування" },
      { icon: "control-casambi", label: "Casambi", secondaryLabel: "Бездротове керування" },
      { icon: "control-dimmer", label: "SwitchDIM", secondaryLabel: "Перемикання / диммування" },
      { icon: "control-emergency", label: "Аварійне освітлення", secondaryLabel: "Аварійна опція" },
      { icon: "control-sensor", label: "Датчик", secondaryLabel: "Опція датчика" },
    ],
    photometricHeading: "Фотометричні та технічні дані",
    technicalAssets: [
      {
        title: "Фотометричні дані",
        image: LED_BUS_LDB_FL_PHOTOMETRIC_IMAGE,
        imageAlt: "Полярні діаграми фотометричного розподілу LED-BUS LDB-FL",
      },
      {
        title: "Технічне креслення",
        image: LED_BUS_LDB_FL_TECHNICAL_DRAWING_IMAGE,
        imageAlt: "Технічне креслення LED-BUS LDB-FL з розмірами поперечного перерізу та довжини",
      },
    ],
    dimensionNote:
      "Профіль світильника: Ш 210 мм × В 75 мм (згідно з технічним кресленням). Загальна довжина L відповідає заявленому розміру моделі (1200 / 1500 мм) — точні розміри моделей див. у таблиці вище.",
    applicationsHeading: "Типові застосування",
    applicationImage: LED_BUS_LDB_FL_APPLICATION_IMAGE,
    applicationImageAlt: "Промисловий об'єкт великого прольоту з мостовим краном, освітлений високостельовими LED-світильниками",
    applications: [
      {
        icon: "industrial-facility",
        title: "Промислові об'єкти",
        image: LED_BUS_LDB_FL_APPLICATION_IMAGE,
        imageAlt: "Промисловий об'єкт великого прольоту з мостовим краном, освітлений високостельовими LED-світильниками",
        description: "Промислові виробничі середовища.",
      },
      {
        icon: "hangar",
        title: "Авіація та аеропорти",
        image: LED_BUS_LDB_FL_APPLICATION_AVIATION_AIRPORTS_IMAGE,
        imageAlt: "Перон аеропорту вночі з припаркованим літаком, наземною технікою та вежею управління польотами",
        description: "Великі технічні та авіаційні об'єкти, що потребують потужного надійного освітлення.",
      },
      {
        icon: "warehouse",
        title: "Логістичні об'єкти",
        image: LED_BUS_LDB_FL_APPLICATION_LOGISTICS_FACILITIES_IMAGE,
        imageAlt: "Прохід складу зі стелажами для піддонів та навантажувачем, освітлений високостельовими LED-світильниками",
        description: "Складські та логістичні середовища з підвищеними вимогами до промислового освітлення.",
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
      {
        slug: "led-bus-ldbse",
        name: "LED-BUS LDBSE Series Lighting Systems",
        subtitle: "50–250 Вт · Тонкий корпус",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbse",
      },
      { slug: "led-bus-ldb-fl", name: "LED-BUS LDB-FL Series Lighting Systems", subtitle: "75–205 Вт · Загартоване скло", isCurrent: true },
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
      title: "Потрібна допомога з підбором конфігурації LDB-FL?",
      description:
        "Наша технічна команда допоможе з вибором моделі, керуванням, розмірами та специфікацією проєкту.",
      action: "Запросити технічну підтримку",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function ledBusLdbFlContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

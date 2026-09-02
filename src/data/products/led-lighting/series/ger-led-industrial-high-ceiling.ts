import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

/** Real GER-LED Industrial High Ceiling assets. Shared across markets;
 * only copy is localized.
 *
 * Hero background/foreground: pre-generated, already-isolated assets
 * found under the Industrial & High-Bay category asset folder — a heavy
 * industrial production hall (background) and the real GER-LED
 * Industrial rectangular fixture, fully visible with its actual optical
 * layout, already reading as switched on with neutral-white light
 * against a transparent backdrop (foreground). Copied as-is into this
 * series' own asset folder; no further processing needed. */
export const GER_LED_INDUSTRIAL_HERO_IMAGE =
  publicMediaUrl("products/led-lighting/series/ger-led-industrial-high-ceiling/ger-led-industrial-high-ceiling-hero-foreground.webp");
export const GER_LED_INDUSTRIAL_HERO_IMAGE_ALT =
  "GER-LED Industrial High Ceiling luminaire, illuminated, rectangular housing with visible LED array";
export const GER_LED_INDUSTRIAL_HERO_BACKGROUND_IMAGE =
  publicMediaUrl("products/led-lighting/series/ger-led-industrial-high-ceiling/ger-led-industrial-high-ceiling-hero-background.webp");
export const GER_LED_INDUSTRIAL_HERO_BACKGROUND_IMAGE_ALT =
  "Heavy industrial production hall interior with operational high-bay LED lighting";
/** The family's own verified catalogue application photo — an
 * industrial roof/warehouse interior. Used for the "Warehouses"
 * application card per the verified recommended_site_usage in the
 * catalogue extraction manifest. */
export const GER_LED_INDUSTRIAL_APPLICATION_IMAGE =
  publicMediaUrl("products/led-lighting/series/ger-led-industrial-high-ceiling/ger-led-industrial-high-ceiling-application.webp");
export const GER_LED_INDUSTRIAL_APPLICATION_IMAGE_ALT =
  "Industrial warehouse roof structure lit by high-bay LED fixtures";
/** Photometric/technical drawing: higher-resolution renders sourced from
 * the shared Industrial & High-Bay category asset library's
 * photometric/ and technical/ folders — the same real catalogue data,
 * replacing the small raw catalogue-scan PNGs originally extracted
 * directly from the source PDF. */
export const GER_LED_INDUSTRIAL_PHOTOMETRIC_IMAGE =
  publicMediaUrl("products/led-lighting/series/ger-led-industrial-high-ceiling/ger-led-industrial-high-ceiling-photometric.webp");
export const GER_LED_INDUSTRIAL_TECHNICAL_DRAWING_IMAGE =
  publicMediaUrl("products/led-lighting/series/ger-led-industrial-high-ceiling/ger-led-industrial-high-ceiling-technical-drawing.webp");
/** Typical Applications card grid — all 6 grouped cards now reuse real,
 * verified LEDBUS/GERSAN site-ready photography (none repeated within
 * this page's own grid): a genuine aircraft-assembly/maintenance hangar
 * interior (Hangars & Aircraft Maintenance), a real port/quay scene
 * (Ports & Heavy Industry), a real petrochemical plant photo
 * (Petrochemical & Gas Stations), a generic industrial roof/factory-hall
 * photo (Flour Mills & Dye Plants — no dedicated flour-mill/dye-plant
 * photo exists in the asset library, so a genuinely generic
 * factory-interior photo is used rather than a mismatched specific one),
 * and a real coal-processing facility interior — conveyor, loader, coal
 * stockpile — under high-bay LED lighting (Coal & Mining). */
export const GER_LED_INDUSTRIAL_APPLICATION_HANGARS_IMAGE =
  publicMediaUrl("products/led-lighting/series/ger-led-industrial-high-ceiling/ger-led-industrial-high-ceiling-application-hangars-aircraft-maintenance.webp");
export const GER_LED_INDUSTRIAL_APPLICATION_PORTS_IMAGE =
  publicMediaUrl("products/led-lighting/series/ger-led-industrial-high-ceiling/ger-led-industrial-high-ceiling-application-ports-heavy-industry.webp");
export const GER_LED_INDUSTRIAL_APPLICATION_PETROCHEMICAL_IMAGE =
  publicMediaUrl("products/led-lighting/series/ger-led-industrial-high-ceiling/ger-led-industrial-high-ceiling-application-petrochemical-gas-stations.webp");
export const GER_LED_INDUSTRIAL_APPLICATION_FLOUR_DYE_IMAGE =
  publicMediaUrl("products/led-lighting/series/ger-led-industrial-high-ceiling/ger-led-industrial-high-ceiling-application-flour-dye.webp");
export const GER_LED_INDUSTRIAL_APPLICATION_COAL_MINING_IMAGE =
  publicMediaUrl("products/led-lighting/series/ger-led-industrial-high-ceiling/ger-led-industrial-high-ceiling-application-coal-mining.webp");

/** Source-accuracy note (GER-LED Industrial High Ceiling catalogue
 * extraction, page 14): the catalogue page's icon row visually shows
 * "220–240 V", while the 9-row technical model table — the structured,
 * per-model data source — gives "110–240 Vac" for all models. The
 * model-table value is used throughout this file's structured technical
 * data (Technical Information card + per-model spec), matching the
 * catalogue extraction report's own verified value. The raw catalogue
 * extraction files are left untouched; this is a display-layer choice,
 * not a correction to the source. */
const VOLTAGE = "110–240 Vac";

/** Order-code note: the catalogue's own model/order-code table lists
 * "GSL IND-75W" with a Power column value of 70 W — a source-catalogue
 * inconsistency (model label says "75W", table power value is 70 W).
 * Reproduced exactly as extracted; see modelsNote below for the
 * user-facing equivalent. */
const MODELS_UK: readonly LedSeriesModel[] = [
  { model: "GSL IND-35W", powerW: 35, ledQty: 8, luminousFluxLm: "5,000 lm", efficiencyLmW: "142.9 lm/W", weightKg: "6.5 kg" },
  { model: "GSL IND-50W", powerW: 50, ledQty: 36, luminousFluxLm: "7,500 lm", efficiencyLmW: "150.0 lm/W", weightKg: "6.5 kg" },
  { model: "GSL IND-75W", powerW: 70, ledQty: 48, luminousFluxLm: "11,500 lm", efficiencyLmW: "164.3 lm/W", weightKg: "6.5 kg" },
  { model: "GSL IND-100W", powerW: 100, ledQty: 60, luminousFluxLm: "14,500 lm", efficiencyLmW: "145.0 lm/W", weightKg: "6.5 kg" },
  { model: "GSL IND-125W", powerW: 125, ledQty: 64, luminousFluxLm: "18,750 lm", efficiencyLmW: "150.0 lm/W", weightKg: "7.0 kg" },
  { model: "GSL IND-150W", powerW: 150, ledQty: 64, luminousFluxLm: "22,750 lm", efficiencyLmW: "151.0 lm/W", weightKg: "7.0 kg" },
  { model: "GSL IND-185W", powerW: 185, ledQty: 80, luminousFluxLm: "27,800 lm", efficiencyLmW: "150.2 lm/W", weightKg: "7.0 kg" },
  { model: "GSL IND-200W", powerW: 200, ledQty: 80, luminousFluxLm: "29,750 lm", efficiencyLmW: "148.75 lm/W", weightKg: "7.0 kg" },
  { model: "GSL IND-250W", powerW: 250, ledQty: 80, luminousFluxLm: "37,600 lm", efficiencyLmW: "150.4 lm/W", weightKg: "7.0 kg" },
] as const;

const MODELS_UA: readonly LedSeriesModel[] = [
  { model: "GSL IND-35W", powerW: 35, ledQty: 8, luminousFluxLm: "5 000 лм", efficiencyLmW: "142,9 лм/Вт", weightKg: "6,5 кг" },
  { model: "GSL IND-50W", powerW: 50, ledQty: 36, luminousFluxLm: "7 500 лм", efficiencyLmW: "150,0 лм/Вт", weightKg: "6,5 кг" },
  { model: "GSL IND-75W", powerW: 70, ledQty: 48, luminousFluxLm: "11 500 лм", efficiencyLmW: "164,3 лм/Вт", weightKg: "6,5 кг" },
  { model: "GSL IND-100W", powerW: 100, ledQty: 60, luminousFluxLm: "14 500 лм", efficiencyLmW: "145,0 лм/Вт", weightKg: "6,5 кг" },
  { model: "GSL IND-125W", powerW: 125, ledQty: 64, luminousFluxLm: "18 750 лм", efficiencyLmW: "150,0 лм/Вт", weightKg: "7,0 кг" },
  { model: "GSL IND-150W", powerW: 150, ledQty: 64, luminousFluxLm: "22 750 лм", efficiencyLmW: "151,0 лм/Вт", weightKg: "7,0 кг" },
  { model: "GSL IND-185W", powerW: 185, ledQty: 80, luminousFluxLm: "27 800 лм", efficiencyLmW: "150,2 лм/Вт", weightKg: "7,0 кг" },
  { model: "GSL IND-200W", powerW: 200, ledQty: 80, luminousFluxLm: "29 750 лм", efficiencyLmW: "148,75 лм/Вт", weightKg: "7,0 кг" },
  { model: "GSL IND-250W", powerW: 250, ledQty: 80, luminousFluxLm: "37 600 лм", efficiencyLmW: "150,4 лм/Вт", weightKg: "7,0 кг" },
] as const;


const content = {
  uk: {
    metadata: {
      title: "GER-LED Industrial High Ceiling – Industrial LED | InfraVolt",
      description:
        "GER-LED Industrial High Ceiling Lighting Systems — 9 catalogue models, 35–250 W, IP66, modular plug-and-remove LED/driver construction, adjustable angle, smart integration, 7-year warranty.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      category: "Industrial & High-Bay Lighting",
      current: "GER-LED Industrial High Ceiling Lighting Systems",
    },
    backToCategoryLabel: "Back to Industrial & High-Bay Lighting",
    hero: {
      eyebrow: "LED SYSTEMS",
      category: "Industrial & High-Bay Lighting",
      title: "GER-LED Industrial High Ceiling Lighting Systems",
      description:
        "Heavy-duty industrial high-ceiling LED lighting with modular plug-and-remove LED and driver sections, adjustable fixture angle and advanced monitoring and control options for demanding industrial environments.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    heroImage: GER_LED_INDUSTRIAL_HERO_IMAGE,
    heroImageAlt: GER_LED_INDUSTRIAL_HERO_IMAGE_ALT,
    heroBackgroundImage: GER_LED_INDUSTRIAL_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: GER_LED_INDUSTRIAL_HERO_BACKGROUND_IMAGE_ALT,
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      {
        icon: "performance",
        title: "Performance",
        values: [
          { label: "Power Range", value: "35–250 W" },
          { label: "Luminous Flux", value: "5,000–37,600 lm" },
          { label: "Luminous Efficiency", value: "142.9–164.3 lm/W" },
          { label: "Models", value: "9 Variants" },
        ],
      },
      {
        icon: "light-quality",
        title: "Light Quality",
        values: [
          { label: "Colour Temperature", value: "3000–6500 K" },
          { label: "CRI", value: "75–85" },
          { label: "Optics", value: "High-Performance Asymmetric Lens" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Protection & Electrical",
        values: [
          { label: "IP66" },
          { label: "Voltage", value: VOLTAGE },
          { label: "Frequency", value: "50–60 Hz" },
          { label: "Operating Temperature", value: "−30 to +90 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Construction & Installation",
        values: [
          { label: "Independent LED Module" },
          { label: "Independent Driver Module" },
          { label: "Plug & Remove Socket" },
          { label: "Adjustable Gear Mechanism" },
        ],
      },
    ],
    technicalAssurance: [
      {
        icon: "colour-finish",
        label: "Colour & Finish",
        value: "PE58-7035 · Black · Custom RAL on request",
      },
      {
        icon: "compliance",
        label: "Compliance",
        value: "CE · RoHS compliant · IP66",
      },
      {
        icon: "warranty",
        label: "Warranty",
        value: "7-Year Warranty",
      },
    ],
    sourceNote:
      "Source catalogue states suitability for Zone 1 / Zone 2; certification details are not provided on this product page.",
    modelsHeading: "Models & Technical Schedule",
    modelsIntroduction: "Nine verified catalogue models — search or filter by power, LED quantity or weight to find the right variant.",
    models: MODELS_UK,
    modelsNote:
      "GSL IND-75W is reproduced exactly from the source catalogue; its corresponding catalogue power value is 70 W.",
    modelsColumns: {
      model: "Model / Catalogue Code",
      power: "Power",
      ledQty: "LED Qty",
      luminousFlux: "Luminous Flux",
      efficiency: "Efficiency",
      weight: "Weight",
    },
    modelsFilters: {
      searchLabel: "Search",
      searchPlaceholder: "Search by model or catalogue code",
      powerFilterLabel: "Power",
      allPowersLabel: "All powers",
      ledQtyFilterLabel: "LED Quantity",
      weightFilterLabel: "Weight",
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
    serviceabilityHeading: "Serviceability & Adjustment",
    serviceabilityIntroduction: "Modular luminaire construction designed for easier connection, servicing and fixture adjustment.",
    serviceabilityItems: [
      {
        icon: "connector",
        title: "Plug & Remove Socket",
        description: "Multi-contact screwless, solderless and tapeless socket system with a standard 50 cm rubber-insulated connection cable.",
      },
      {
        icon: "led-module",
        title: "Independent LED Module",
        description: "The LED section is independent from the fixture driver section and uses a plug-and-remove socket structure.",
      },
      {
        icon: "driver-module",
        title: "Independent Driver Module",
        description: "The driver section is independently arranged and uses a plug-and-remove connection structure.",
      },
      {
        icon: "adjustable-angle",
        title: "Adjustable Angle",
        description: "Fixture angle can be adjusted using the catalogue-defined special geared mechanism.",
      },
    ],
    controlsHeading: "Controls & Smart Integration",
    controlsIntroduction: "Catalogue-listed control, sensing and smart-integration capabilities; availability depends on project configuration.",
    controlsGroupLabel: "Lighting Controls",
    controlOptions: [
      { icon: "control-dali", label: "DALI" },
      { icon: "control-dimmer", label: "SwitchDIM" },
      { icon: "control-signal", label: "1–10 V" },
      { icon: "control-emergency", label: "Emergency" },
      { icon: "control-sensor", label: "Sensor" },
    ],
    smartIntegrationHeading: "Smart Integration",
    smartIntegrationItems: [
      { icon: "plc", label: "PLC", secondaryLabel: "Power Line Communication" },
      { icon: "camera", label: "IP Camera & 3G", secondaryLabel: "Camera + 3G Connectivity" },
      { icon: "network", label: "TCP/IP Network", secondaryLabel: "Network Integration" },
      { icon: "power-dim", label: "On / Off / Dim", secondaryLabel: "Switching & Dimming" },
      { icon: "environment", label: "Humidity & Temperature", secondaryLabel: "Environment Sensing" },
      { icon: "motion-daylight", label: "Motion & Daylight", secondaryLabel: "Sensing" },
      { icon: "fault-monitoring", label: "Fault Monitoring", secondaryLabel: "Diagnostics" },
      { icon: "scenario-control", label: "Scenario Control", secondaryLabel: "Automation" },
    ],
    photometricHeading: "Photometric & Technical Data",
    technicalAssets: [
      {
        title: "Photometric Data",
        image: GER_LED_INDUSTRIAL_PHOTOMETRIC_IMAGE,
        imageAlt: "GER-LED Industrial High Ceiling photometric polar distribution diagrams",
      },
      {
        title: "Technical Drawing",
        image: GER_LED_INDUSTRIAL_TECHNICAL_DRAWING_IMAGE,
        imageAlt: "GER-LED Industrial High Ceiling technical drawing",
      },
    ],
    dimensionNote: "Refer to the technical drawing for fixture dimensions.",
    applicationsHeading: "Typical Applications",
    applicationImage: GER_LED_INDUSTRIAL_APPLICATION_IMAGE,
    applicationImageAlt: GER_LED_INDUSTRIAL_APPLICATION_IMAGE_ALT,
    applications: [
      {
        icon: "hangar",
        title: "Hangars & Aircraft Maintenance",
        image: GER_LED_INDUSTRIAL_APPLICATION_HANGARS_IMAGE,
        imageAlt: "Aircraft assembly and maintenance hangar interior with an overhead gantry crane and technician workstations",
        description: "Aircraft hangars and technical maintenance facilities.",
      },
      {
        icon: "port",
        title: "Ports & Heavy Industry",
        image: GER_LED_INDUSTRIAL_APPLICATION_PORTS_IMAGE,
        imageAlt: "Container ship at a floodlit port quay with gantry cranes and heavy industry in the background",
        description: "Heavy-duty loading and port environments.",
      },
      {
        icon: "warehouse",
        title: "Warehouses",
        image: GER_LED_INDUSTRIAL_APPLICATION_IMAGE,
        imageAlt: GER_LED_INDUSTRIAL_APPLICATION_IMAGE_ALT,
        description: "Large-span warehouse and storage facilities.",
      },
      {
        icon: "petrochemical",
        title: "Petrochemical & Gas Stations",
        image: GER_LED_INDUSTRIAL_APPLICATION_PETROCHEMICAL_IMAGE,
        imageAlt: "Petrochemical plant with process towers and piping",
        description: "Petrochemical plants and fuel/gas station environments.",
      },
      {
        icon: "industrial-facility",
        title: "Flour Mills & Dye Plants",
        image: GER_LED_INDUSTRIAL_APPLICATION_FLOUR_DYE_IMAGE,
        imageAlt: "High-bay LED fixtures lighting a steel-framed industrial roof structure",
        description: "Flour mills, dye plants and similar production facilities.",
      },
      {
        icon: "mining",
        title: "Coal & Mining",
        image: GER_LED_INDUSTRIAL_APPLICATION_COAL_MINING_IMAGE,
        imageAlt: "Coal processing facility interior with a conveyor belt, wheel loader and coal stockpile under high-bay LED lighting",
        description: "Coal and mining sector facilities.",
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
        isCurrent: true,
      },
      {
        slug: "ger-led-high-ceiling",
        name: "GER-LED High Ceiling Lighting Systems",
        subtitle: "50–150 W · Recessed / surface",
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-high-ceiling",
      },
    ],
    supportCta: {
      title: "Need help selecting the right GER-LED industrial high-ceiling configuration?",
      description:
        "Our technical team can help with model selection, fixture adjustment, smart controls, sensing and project specification.",
      action: "Request Technical Support",
    },
  },
  ua: {
    metadata: {
      title: "GER-LED Industrial High Ceiling – промислове LED-освітлення | InfraVolt",
      description:
        "GER-LED Industrial High Ceiling Lighting Systems — 9 каталожних моделей, 35–250 Вт, IP66, модульна так-чіпна конструкція LED/драйвера, регульований кут, розумна інтеграція, 7 років гарантії.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "Системи LED-освітлення",
      category: "Промислове LED-освітлення для високих приміщень",
      current: "GER-LED Industrial High Ceiling Lighting Systems",
    },
    backToCategoryLabel: "Назад до промислового LED-освітлення для високих приміщень",
    hero: {
      eyebrow: "СИСТЕМИ LED",
      category: "Промислове LED-освітлення для високих приміщень",
      title: "GER-LED Industrial High Ceiling Lighting Systems",
      description:
        "Промислове LED-освітлення підвищеної потужності для високих стель з модульними так-чіпними секціями LED та драйвера, регульованим кутом світильника та розширеними опціями моніторингу й керування для складних промислових середовищ.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    heroImage: GER_LED_INDUSTRIAL_HERO_IMAGE,
    heroImageAlt: "Увімкнений світильник GER-LED Industrial High Ceiling, прямокутний корпус з видимою матрицею LED",
    heroBackgroundImage: GER_LED_INDUSTRIAL_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: "Інтер'єр важкого промислового виробничого цеху з робочим високостельовим LED-освітленням",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      {
        icon: "performance",
        title: "Продуктивність",
        values: [
          { label: "Діапазон потужності", value: "35–250 Вт" },
          { label: "Світловий потік", value: "5 000–37 600 лм" },
          { label: "Світлова ефективність", value: "142,9–164,3 лм/Вт" },
          { label: "Моделі", value: "9 варіантів" },
        ],
      },
      {
        icon: "light-quality",
        title: "Якість світла",
        values: [
          { label: "Колірна температура", value: "3000–6500 K" },
          { label: "CRI", value: "75–85" },
          { label: "Оптика", value: "Високопродуктивна асиметрична лінза" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Захист та електрика",
        values: [
          { label: "IP66" },
          { label: "Напруга", value: "110–240 В" },
          { label: "Частота", value: "50–60 Гц" },
          { label: "Робоча температура", value: "−30 до +90 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Конструкція та монтаж",
        values: [
          { label: "Незалежний LED-модуль" },
          { label: "Незалежний модуль драйвера" },
          { label: "Так-чіпний сокет" },
          { label: "Регульований зубчастий механізм" },
        ],
      },
    ],
    technicalAssurance: [
      {
        icon: "colour-finish",
        label: "Колір та оздоблення",
        value: "PE58-7035 · Чорний · Індивідуальний RAL за запитом",
      },
      {
        icon: "compliance",
        label: "Відповідність стандартам",
        value: "CE · Відповідність RoHS · IP66",
      },
      {
        icon: "warranty",
        label: "Гарантія",
        value: "7 років гарантії",
      },
    ],
    sourceNote:
      "У каталозі зазначено придатність для Zone 1 / Zone 2; дані сертифікації на цій сторінці продукту не наведено.",
    modelsHeading: "Моделі та технічний розклад",
    modelsIntroduction: "Дев'ять перевірених каталожних моделей — здійснюйте пошук або фільтруйте за потужністю, кількістю LED чи вагою.",
    models: MODELS_UA,
    modelsNote:
      "GSL IND-75W наведено точно за джерелом каталогу; відповідне каталожне значення потужності становить 70 Вт.",
    modelsColumns: {
      model: "Модель / каталожний код",
      power: "Потужність",
      ledQty: "К-сть LED",
      luminousFlux: "Світловий потік",
      efficiency: "Ефективність",
      weight: "Вага",
    },
    modelsFilters: {
      searchLabel: "Пошук",
      searchPlaceholder: "Пошук за моделлю або каталожним кодом",
      powerFilterLabel: "Потужність",
      allPowersLabel: "Усі потужності",
      ledQtyFilterLabel: "Кількість LED",
      weightFilterLabel: "Вага",
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
    serviceabilityHeading: "Обслуговування та регулювання",
    serviceabilityIntroduction: "Модульна конструкція світильника, розроблена для легшого підключення, обслуговування та регулювання.",
    serviceabilityItems: [
      {
        icon: "connector",
        title: "Так-чіпний сокет",
        description: "Багатоконтактна безгвинтова, безпаяльна та безстрічкова система сокета зі стандартним 50-сантиметровим кабелем у гумовій ізоляції.",
      },
      {
        icon: "led-module",
        title: "Незалежний LED-модуль",
        description: "Секція LED незалежна від секції драйвера світильника та має так-чіпну сокетну структуру.",
      },
      {
        icon: "driver-module",
        title: "Незалежний модуль драйвера",
        description: "Секція драйвера облаштована незалежно та має так-чіпну з'єднувальну структуру.",
      },
      {
        icon: "adjustable-angle",
        title: "Регульований кут",
        description: "Кут світильника можна регулювати за допомогою спеціального зубчастого механізму, визначеного каталогом.",
      },
    ],
    controlsHeading: "Керування та розумна інтеграція",
    controlsIntroduction: "Каталожні опції керування, датчиків та розумної інтеграції; доступність залежить від конфігурації проєкту.",
    controlsGroupLabel: "Керування освітленням",
    controlOptions: [
      { icon: "control-dali", label: "DALI" },
      { icon: "control-dimmer", label: "SwitchDIM" },
      { icon: "control-signal", label: "1–10 В" },
      { icon: "control-emergency", label: "Аварійне освітлення" },
      { icon: "control-sensor", label: "Датчик" },
    ],
    smartIntegrationHeading: "Розумна інтеграція",
    smartIntegrationItems: [
      { icon: "plc", label: "PLC", secondaryLabel: "Зв'язок по силових лініях" },
      { icon: "camera", label: "IP-камера та 3G", secondaryLabel: "Камера + 3G-зв'язок" },
      { icon: "network", label: "Мережа TCP/IP", secondaryLabel: "Мережева інтеграція" },
      { icon: "power-dim", label: "Увімк./Вимк./Диммування", secondaryLabel: "Перемикання та диммування" },
      { icon: "environment", label: "Вологість та температура", secondaryLabel: "Моніторинг середовища" },
      { icon: "motion-daylight", label: "Рух та денне світло", secondaryLabel: "Датчики" },
      { icon: "fault-monitoring", label: "Моніторинг несправностей", secondaryLabel: "Діагностика" },
      { icon: "scenario-control", label: "Сценарне керування", secondaryLabel: "Автоматизація" },
    ],
    photometricHeading: "Фотометричні та технічні дані",
    technicalAssets: [
      {
        title: "Фотометричні дані",
        image: GER_LED_INDUSTRIAL_PHOTOMETRIC_IMAGE,
        imageAlt: "Полярні діаграми фотометричного розподілу GER-LED Industrial High Ceiling",
      },
      {
        title: "Технічне креслення",
        image: GER_LED_INDUSTRIAL_TECHNICAL_DRAWING_IMAGE,
        imageAlt: "Технічне креслення GER-LED Industrial High Ceiling",
      },
    ],
    dimensionNote: "Розміри світильника див. на технічному кресленні.",
    applicationsHeading: "Типові застосування",
    applicationImage: GER_LED_INDUSTRIAL_APPLICATION_IMAGE,
    applicationImageAlt: "Промисловий склад з покрівельною конструкцією, освітлений високостельовими LED-світильниками",
    applications: [
      {
        icon: "hangar",
        title: "Ангари та обслуговування авіатехніки",
        image: GER_LED_INDUSTRIAL_APPLICATION_HANGARS_IMAGE,
        imageAlt: "Інтер'єр ангару для складання та обслуговування літаків з мостовим краном та робочими місцями техніків",
        description: "Ангари та об'єкти технічного обслуговування.",
      },
      {
        icon: "port",
        title: "Порти та важка промисловість",
        image: GER_LED_INDUSTRIAL_APPLICATION_PORTS_IMAGE,
        imageAlt: "Контейнеровоз біля освітленого прожекторами портового причалу з портальними кранами та важкою промисловістю на задньому плані",
        description: "Вантажно-розвантажувальні роботи та портові середовища.",
      },
      {
        icon: "warehouse",
        title: "Склади",
        image: GER_LED_INDUSTRIAL_APPLICATION_IMAGE,
        imageAlt: "Промисловий склад з покрівельною конструкцією, освітлений високостельовими LED-світильниками",
        description: "Складські об'єкти великого прольоту.",
      },
      {
        icon: "petrochemical",
        title: "Нафтохімія та АЗС",
        image: GER_LED_INDUSTRIAL_APPLICATION_PETROCHEMICAL_IMAGE,
        imageAlt: "Нафтохімічний завод з технологічними вежами та трубопроводами",
        description: "Нафтохімічні заводи та паливні/газові станції.",
      },
      {
        icon: "industrial-facility",
        title: "Борошномельні та фарбувальні підприємства",
        image: GER_LED_INDUSTRIAL_APPLICATION_FLOUR_DYE_IMAGE,
        imageAlt: "Високостельові LED-світильники освітлюють покрівельну конструкцію промислового об'єкта",
        description: "Борошномельні, фарбувальні та подібні виробничі об'єкти.",
      },
      {
        icon: "mining",
        title: "Вугільна та гірничодобувна промисловість",
        image: GER_LED_INDUSTRIAL_APPLICATION_COAL_MINING_IMAGE,
        imageAlt: "Інтер'єр вуглезбагачувальної фабрики зі стрічковим конвеєром, колісним навантажувачем і штабелем вугілля під високостельовим LED-освітленням",
        description: "Об'єкти вугільної та гірничодобувної галузі.",
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
        isCurrent: true,
      },
      {
        slug: "ger-led-high-ceiling",
        name: "GER-LED High Ceiling Lighting Systems",
        subtitle: "50–150 Вт · Врізний / накладний",
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-high-ceiling",
      },
    ],
    supportCta: {
      title: "Потрібна допомога з підбором конфігурації GER-LED Industrial High Ceiling?",
      description:
        "Наша технічна команда допоможе з вибором моделі, регулюванням світильника, розумним керуванням, датчиками та специфікацією проєкту.",
      action: "Запросити технічну підтримку",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function gerLedIndustrialHighCeilingContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

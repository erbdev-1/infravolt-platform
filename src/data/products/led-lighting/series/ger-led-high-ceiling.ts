import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

/** Real GER-LED High Ceiling assets. Shared across markets; only copy is
 * localized.
 *
 * Hero foreground: a composite built from two real, distinct crops of
 * the source catalogue page (LEDBUS-Ar-Ru(1).pdf, PDF page 15 / printed
 * pages 26–27) — the Recessed Ceiling configuration's product photo as
 * the main image, and the Surface Mounted configuration's rear
 * mounting-bracket photo as the smaller secondary image, both with the
 * white catalogue background removed. Hero background (a real
 * factory/warehouse interior) is unchanged.
 *
 * Photometric/technical-drawing assets: premium pre-generated renders
 * from the shared Industrial & High-Bay category asset library
 * (category/industrial&high-bay/photometric/recessed-ceiling,
 * .../photometric/Surface-Mounted, .../technical) — higher-resolution,
 * cleaner versions of the same real catalogue photometric polar
 * diagrams and technical drawings, replacing this file's earlier
 * from-source-PDF crops now that a dedicated, higher-quality set exists
 * for this family. Each configuration's own 5-graph beam-angle set (20°
 * / 60° / 90° / 120° / 130×60°) and its own dimensional drawing were
 * visually verified one by one before wiring in. */
export const GER_LED_HC_HERO_IMAGE =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-hero-foreground.webp";
export const GER_LED_HC_HERO_IMAGE_ALT =
  "GER-LED High Ceiling Ø434 mm luminaire — Recessed Ceiling configuration (main) and the Surface Mounted configuration's rear mounting bracket (inset)";
export const GER_LED_HC_HERO_BACKGROUND_IMAGE =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-hero-background.webp";
export const GER_LED_HC_HERO_BACKGROUND_IMAGE_ALT =
  "Modern factory and warehouse interior with high-ceiling LED lighting";

export const GER_LED_HC_RECESSED_DRAWING_IMAGE =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-recessed-drawing.webp";
export const GER_LED_HC_SURFACE_DRAWING_IMAGE =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-surface-drawing.webp";

const GER_LED_HC_RECESSED_PHOTOMETRIC_20 =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-recessed-photometric-20.webp";
const GER_LED_HC_RECESSED_PHOTOMETRIC_60 =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-recessed-photometric-60.webp";
const GER_LED_HC_RECESSED_PHOTOMETRIC_90 =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-recessed-photometric-90.webp";
const GER_LED_HC_RECESSED_PHOTOMETRIC_120 =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-recessed-photometric-120.webp";
const GER_LED_HC_RECESSED_PHOTOMETRIC_130X60 =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-recessed-photometric-130x60.webp";
const GER_LED_HC_SURFACE_PHOTOMETRIC_20 =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-surface-photometric-20.webp";
const GER_LED_HC_SURFACE_PHOTOMETRIC_60 =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-surface-photometric-60.webp";
const GER_LED_HC_SURFACE_PHOTOMETRIC_90 =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-surface-photometric-90.webp";
const GER_LED_HC_SURFACE_PHOTOMETRIC_120 =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-surface-photometric-120.webp";
const GER_LED_HC_SURFACE_PHOTOMETRIC_130X60 =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-surface-photometric-130x60.webp";

function recessedPhotometricOptions(alt: (angle: string) => string) {
  return [
    { id: "20", label: "20°", image: GER_LED_HC_RECESSED_PHOTOMETRIC_20, imageAlt: alt("20°") },
    { id: "60", label: "60°", image: GER_LED_HC_RECESSED_PHOTOMETRIC_60, imageAlt: alt("60°") },
    { id: "90", label: "90°", image: GER_LED_HC_RECESSED_PHOTOMETRIC_90, imageAlt: alt("90°") },
    { id: "120", label: "120°", image: GER_LED_HC_RECESSED_PHOTOMETRIC_120, imageAlt: alt("120°") },
    { id: "130x60", label: "130×60°", image: GER_LED_HC_RECESSED_PHOTOMETRIC_130X60, imageAlt: alt("130×60°") },
  ] as const;
}

function surfacePhotometricOptions(alt: (angle: string) => string) {
  return [
    { id: "20", label: "20°", image: GER_LED_HC_SURFACE_PHOTOMETRIC_20, imageAlt: alt("20°") },
    { id: "60", label: "60°", image: GER_LED_HC_SURFACE_PHOTOMETRIC_60, imageAlt: alt("60°") },
    { id: "90", label: "90°", image: GER_LED_HC_SURFACE_PHOTOMETRIC_90, imageAlt: alt("90°") },
    { id: "120", label: "120°", image: GER_LED_HC_SURFACE_PHOTOMETRIC_120, imageAlt: alt("120°") },
    { id: "130x60", label: "130×60°", image: GER_LED_HC_SURFACE_PHOTOMETRIC_130X60, imageAlt: alt("130×60°") },
  ] as const;
}

/** No dedicated application photo exists for this family in the
 * catalogue extraction (no site-ready/applications asset). All three
 * Typical Applications cards reuse real, verified LEDBUS/GERSAN
 * photography already used elsewhere on the site — three genuinely
 * distinct photos, none repeated within this page's own grid: a real
 * factory-hall roof structure (Factories), a warehouse aisle with
 * pallet racking and a forklift (Warehouses), and a large-span
 * industrial hall interior with staged crated goods at floor level
 * (High-Ceiling Applications, already used as the LED-BUS High Ceiling
 * page's "Warehouses & Storage" card) — chosen because the family's own
 * two roof-structure photos (this one and the one now used for
 * Factories) are near-identical shots of the same installation and
 * would have read as a duplicate. */
export const GER_LED_HC_APPLICATION_FACTORIES_IMAGE =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-application-factories.webp";
export const GER_LED_HC_APPLICATION_WAREHOUSES_IMAGE =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-application-warehouses.webp";
export const GER_LED_HC_APPLICATION_HIGH_CEILING_IMAGE =
  "/assets/products/led-lighting/series/ger-led-high-ceiling/ger-led-high-ceiling-application-high-ceiling-applications.webp";

/** Source-accuracy note (GER-LED High Ceiling catalogue extraction, page
 * 15): the specification text states an input voltage range of
 * "100–305 V", while the page's icon strip visually shows "220–240 V".
 * The specification-text value — the structured, explicitly-labelled
 * source — is used throughout this file's technical data, matching the
 * catalogue extraction report's own verified value. The raw catalogue
 * extraction files are left untouched; this is a display-layer choice,
 * not a correction to the source. */
const VOLTAGE = "100–305 Vac";

/** Order-code note: re-verified directly against the high-resolution
 * source catalogue page (order-code table, page 26/27) — the third
 * character is unambiguously a zero ("730-"), not a letter "O". The
 * earlier extraction pass could not distinguish the two from a lower-
 * resolution scan and defensively preserved "O"; this file now uses the
 * confirmed "730-" prefix throughout.
 *
 * 150 W note: the Recessed Ceiling and Surface Mounted 150 W variants
 * are genuinely different catalogue rows with different luminous-flux
 * values (18,754 lm vs 21,300 lm) — kept as two separate rows, never
 * merged. */
const MODELS_UK: readonly LedSeriesModel[] = [
  {
    model: "730-GSLIND150W PJ",
    mountingType: "Recessed Ceiling",
    powerW: 150,
    luminousFluxLm: "18,754 lm",
    efficiencyLmW: ">125 lm/W",
    cri: "80+",
    colourTemperature: "3000–6500 K",
    dimensions: "Ø434 mm",
  },
  {
    model: "730-GSLIND50W PJ SU",
    mountingType: "Surface Mounted",
    powerW: 50,
    luminousFluxLm: "7,250 lm",
    efficiencyLmW: "145 lm/W",
    cri: "80+",
    colourTemperature: "3000–6500 K",
    dimensions: "Ø434 mm",
  },
  {
    model: "730-GSLIND100W PJ SU",
    mountingType: "Surface Mounted",
    powerW: 100,
    luminousFluxLm: "14,000 lm",
    efficiencyLmW: "140 lm/W",
    cri: "80+",
    colourTemperature: "3000–6500 K",
    dimensions: "Ø434 mm",
  },
  {
    model: "730-GSLIND150W PJ SU",
    mountingType: "Surface Mounted",
    powerW: 150,
    luminousFluxLm: "21,300 lm",
    efficiencyLmW: "142 lm/W",
    cri: "80+",
    colourTemperature: "3000–6500 K",
    dimensions: "Ø434 mm",
  },
] as const;

const MODELS_UA: readonly LedSeriesModel[] = [
  {
    model: "730-GSLIND150W PJ",
    mountingType: "Врізний у стелю",
    powerW: 150,
    luminousFluxLm: "18 754 лм",
    efficiencyLmW: ">125 лм/Вт",
    cri: "80+",
    colourTemperature: "3000–6500 K",
    dimensions: "Ø434 мм",
  },
  {
    model: "730-GSLIND50W PJ SU",
    mountingType: "Накладний",
    powerW: 50,
    luminousFluxLm: "7 250 лм",
    efficiencyLmW: "145 лм/Вт",
    cri: "80+",
    colourTemperature: "3000–6500 K",
    dimensions: "Ø434 мм",
  },
  {
    model: "730-GSLIND100W PJ SU",
    mountingType: "Накладний",
    powerW: 100,
    luminousFluxLm: "14 000 лм",
    efficiencyLmW: "140 лм/Вт",
    cri: "80+",
    colourTemperature: "3000–6500 K",
    dimensions: "Ø434 мм",
  },
  {
    model: "730-GSLIND150W PJ SU",
    mountingType: "Накладний",
    powerW: 150,
    luminousFluxLm: "21 300 лм",
    efficiencyLmW: "142 лм/Вт",
    cri: "80+",
    colourTemperature: "3000–6500 K",
    dimensions: "Ø434 мм",
  },
] as const;

const SUPPORT_REQUEST_HREF = "/uk-support?request=technical-pack&product=ger-led-high-ceiling";

const content = {
  uk: {
    metadata: {
      title: "GER-LED High Ceiling Lighting Systems | Industrial & High-Bay Lighting | LED Systems | InfraVolt",
      description:
        "GER-LED High Ceiling Lighting Systems — 4 catalogue models, 50–150 W, Ø434 mm, recessed-ceiling and surface-mounted configurations, IP66, 7-year warranty.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      category: "Industrial & High-Bay Lighting",
      current: "GER-LED High Ceiling Lighting Systems",
    },
    backToCategoryLabel: "Back to Industrial & High-Bay Lighting",
    hero: {
      eyebrow: "LED SYSTEMS",
      category: "Industrial & High-Bay Lighting",
      title: "GER-LED High Ceiling Lighting Systems",
      description:
        "High-ceiling LED lighting system with recessed-ceiling and surface-mounted configurations, Ø434 mm construction, IP66 protection and dedicated optical options for factories, warehouses and other high-ceiling environments.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    heroImage: GER_LED_HC_HERO_IMAGE,
    heroImageAlt: GER_LED_HC_HERO_IMAGE_ALT,
    heroBackgroundImage: GER_LED_HC_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: GER_LED_HC_HERO_BACKGROUND_IMAGE_ALT,
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      {
        icon: "performance",
        title: "Performance",
        values: [
          { label: "Power Range", value: "50–150 W" },
          { label: "Luminous Flux", value: "7,250–21,300 lm" },
          { label: "Efficiency", value: ">125–145 lm/W" },
          { label: "Configurations", value: "4 Catalogue Variants" },
        ],
      },
      {
        icon: "light-quality",
        title: "Light Quality",
        values: [
          { label: "Colour Temperature", value: "3000–6500 K" },
          { label: "CRI", value: "80+" },
          { label: "Optics", value: "Special Lens Options" },
          { label: "Beam Distribution", value: "Different Beam Angles" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Protection & Electrical",
        values: [
          { label: "IP66" },
          { label: "Input Voltage", value: VOLTAGE },
          { label: "Frequency", value: "50–60 Hz" },
          { label: "Operating Temperature", value: "−20 to +45 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Construction & Installation",
        values: [
          { label: "Diameter", value: "Ø434 mm" },
          { label: "Body", value: "Electrostatic Powder-Coated Aluminium Die-Cast" },
          { label: "Frame", value: "Electrostatic Powder-Coated DKP Steel" },
          { label: "Installation", value: "Recessed Ceiling / Surface Mounted" },
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
        value: "CE · RoHS compliant · IP66",
      },
      {
        icon: "warranty",
        label: "Warranty",
        value: "7-Year Warranty",
      },
    ],
    modelsHeading: "Models & Technical Schedule",
    modelsIntroduction: "Four verified catalogue models — search or filter by mounting type or power to find the right variant.",
    models: MODELS_UK,
    modelsNote: "Catalogue codes are reproduced from the source extraction. Catalogue luminous-flux values are reference values and may be subject to revision.",
    modelsColumns: {
      mountingType: "Mounting Type",
      model: "Model / Catalogue Code",
      power: "Power",
      luminousFlux: "Luminous Flux",
      efficiency: "Efficiency",
      cri: "CRI",
      colourTemperature: "CCT",
      dimensions: "Dimensions",
    },
    modelsFilters: {
      searchLabel: "Search",
      searchPlaceholder: "Search by model or catalogue code",
      mountingTypeFilterLabel: "Mounting Type",
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
    controlsHeading: "Controls & System Options",
    controlsIntroduction: "Catalogue-listed lighting control and system options; availability depends on project configuration.",
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
        image: GER_LED_HC_RECESSED_PHOTOMETRIC_20,
        imageAlt: "GER-LED High Ceiling Recessed Ceiling configuration, 20° photometric distribution diagram",
      },
      {
        title: "Technical Drawing",
        image: GER_LED_HC_RECESSED_DRAWING_IMAGE,
        imageAlt: "GER-LED High Ceiling Recessed Ceiling configuration technical drawing",
      },
    ],
    technicalAssetVariantsDefaultId: "recessed",
    technicalAssetVariants: [
      {
        id: "recessed",
        label: "Recessed Ceiling",
        photometric: {
          title: "Photometric Data",
          image: GER_LED_HC_RECESSED_PHOTOMETRIC_20,
          imageAlt: "GER-LED High Ceiling Recessed Ceiling configuration, 20° photometric distribution diagram",
        },
        photometricOptions: recessedPhotometricOptions(
          (angle) => `GER-LED High Ceiling Recessed Ceiling configuration, ${angle} photometric distribution diagram`,
        ),
        drawing: {
          title: "Technical Drawing",
          image: GER_LED_HC_RECESSED_DRAWING_IMAGE,
          imageAlt: "GER-LED High Ceiling Recessed Ceiling configuration technical drawing",
        },
      },
      {
        id: "surface",
        label: "Surface Mounted",
        photometric: {
          title: "Photometric Data",
          image: GER_LED_HC_SURFACE_PHOTOMETRIC_20,
          imageAlt: "GER-LED High Ceiling Surface Mounted configuration, 20° photometric distribution diagram",
        },
        photometricOptions: surfacePhotometricOptions(
          (angle) => `GER-LED High Ceiling Surface Mounted configuration, ${angle} photometric distribution diagram`,
        ),
        drawing: {
          title: "Technical Drawing",
          image: GER_LED_HC_SURFACE_DRAWING_IMAGE,
          imageAlt: "GER-LED High Ceiling Surface Mounted configuration technical drawing",
        },
      },
    ],
    dimensionNote:
      "Diameter is verified at Ø434 mm for both configurations. Refer to the technical drawings above for full engineering dimensions per configuration.",
    applicationsHeading: "Typical Applications",
    applications: [
      {
        icon: "industrial-facility",
        title: "Factories",
        image: GER_LED_HC_APPLICATION_FACTORIES_IMAGE,
        imageAlt: "High-bay LED fixtures lighting a steel-framed industrial roof structure",
        description: "Industrial production environments requiring high-output ceiling lighting.",
      },
      {
        icon: "warehouse",
        title: "Warehouses",
        image: GER_LED_HC_APPLICATION_WAREHOUSES_IMAGE,
        imageAlt: "Warehouse aisle with pallet racking and a forklift, lit by high-bay LED fixtures",
        description: "Storage and logistics environments with high mounting heights.",
      },
      {
        icon: "high-ceiling",
        title: "High-Ceiling Applications",
        image: GER_LED_HC_APPLICATION_HIGH_CEILING_IMAGE,
        imageAlt: "Large-span industrial hall interior with staged crated goods, lit by high-bay LED fixtures",
        description: "Large-volume interior spaces requiring recessed-ceiling or surface-mounted LED lighting.",
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
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-industrial-high-ceiling",
      },
      { slug: "ger-led-high-ceiling", name: "GER-LED High Ceiling Lighting Systems", subtitle: "50–150 W · Recessed / surface", isCurrent: true },
    ],
    supportCta: {
      title: "Need help selecting the right GER-LED high-ceiling configuration?",
      description:
        "Our technical team can help you choose between recessed-ceiling and surface-mounted configurations, power levels, controls and project requirements.",
      action: "Request Technical Support",
    },
  },
  ua: {
    metadata: {
      title: "GER-LED High Ceiling Lighting Systems | Промислове освітлення та освітлення високих прольотів | Системи LED-освітлення | InfraVolt",
      description:
        "GER-LED High Ceiling Lighting Systems — 4 каталожні моделі, 50–150 Вт, Ø434 мм, врізна (стельова) та накладна конфігурації, IP66, 7 років гарантії.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "Системи LED-освітлення",
      category: "Промислове освітлення та освітлення високих прольотів",
      current: "GER-LED High Ceiling Lighting Systems",
    },
    backToCategoryLabel: "Назад до промислового освітлення та освітлення високих прольотів",
    hero: {
      eyebrow: "СИСТЕМИ LED",
      category: "Промислове освітлення та освітлення високих прольотів",
      title: "GER-LED High Ceiling Lighting Systems",
      description:
        "Система LED-освітлення для високих стель із врізною (стельовою) та накладною конфігураціями, конструкцією Ø434 мм, захистом IP66 та спеціальними оптичними опціями для заводів, складів та інших приміщень з високими стелями.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    heroImage: GER_LED_HC_HERO_IMAGE,
    heroImageAlt:
      "Світильник GER-LED High Ceiling Ø434 мм — врізна (стельова) конфігурація (основне зображення) та монтажний кронштейн накладної конфігурації (додаткове зображення)",
    heroBackgroundImage: GER_LED_HC_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: "Інтер'єр сучасного заводу та складу з високостельовим LED-освітленням",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      {
        icon: "performance",
        title: "Продуктивність",
        values: [
          { label: "Діапазон потужності", value: "50–150 Вт" },
          { label: "Світловий потік", value: "7 250–21 300 лм" },
          { label: "Ефективність", value: ">125–145 лм/Вт" },
          { label: "Конфігурації", value: "4 каталожні варіанти" },
        ],
      },
      {
        icon: "light-quality",
        title: "Якість світла",
        values: [
          { label: "Колірна температура", value: "3000–6500 K" },
          { label: "CRI", value: "80+" },
          { label: "Оптика", value: "Спеціальні варіанти лінз" },
          { label: "Розподіл променя", value: "Різні кути випромінювання" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Захист та електрика",
        values: [
          { label: "IP66" },
          { label: "Вхідна напруга", value: "100–305 В" },
          { label: "Частота", value: "50–60 Гц" },
          { label: "Робоча температура", value: "−20 до +45 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Конструкція та монтаж",
        values: [
          { label: "Діаметр", value: "Ø434 мм" },
          { label: "Корпус", value: "Електростатично порошково пофарбований алюмінієвий литий" },
          { label: "Рама", value: "Електростатично порошково пофарбована сталь DKP" },
          { label: "Монтаж", value: "Врізний у стелю / Накладний" },
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
        value: "CE · Відповідність RoHS · IP66",
      },
      {
        icon: "warranty",
        label: "Гарантія",
        value: "7 років гарантії",
      },
    ],
    modelsHeading: "Моделі та технічний розклад",
    modelsIntroduction: "Чотири перевірені каталожні моделі — здійснюйте пошук або фільтруйте за типом монтажу чи потужністю.",
    models: MODELS_UA,
    modelsNote: "Каталожні коди наведено з джерела екстракції. Значення світлового потоку в каталозі є довідковими і можуть підлягати уточненню.",
    modelsColumns: {
      mountingType: "Тип монтажу",
      model: "Модель / каталожний код",
      power: "Потужність",
      luminousFlux: "Світловий потік",
      efficiency: "Ефективність",
      cri: "CRI",
      colourTemperature: "CCT",
      dimensions: "Розміри",
    },
    modelsFilters: {
      searchLabel: "Пошук",
      searchPlaceholder: "Пошук за моделлю або каталожним кодом",
      mountingTypeFilterLabel: "Тип монтажу",
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
    controlsHeading: "Керування та системні опції",
    controlsIntroduction: "Каталожні опції керування освітленням та системи; доступність залежить від конфігурації проєкту.",
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
        image: GER_LED_HC_RECESSED_PHOTOMETRIC_20,
        imageAlt: "Діаграма фотометричного розподілу 20° GER-LED High Ceiling, врізна (стельова) конфігурація",
      },
      {
        title: "Технічне креслення",
        image: GER_LED_HC_RECESSED_DRAWING_IMAGE,
        imageAlt: "Технічне креслення GER-LED High Ceiling, врізна (стельова) конфігурація",
      },
    ],
    technicalAssetVariantsDefaultId: "recessed",
    technicalAssetVariants: [
      {
        id: "recessed",
        label: "Врізна (стельова)",
        photometric: {
          title: "Фотометричні дані",
          image: GER_LED_HC_RECESSED_PHOTOMETRIC_20,
          imageAlt: "Діаграма фотометричного розподілу 20° GER-LED High Ceiling, врізна (стельова) конфігурація",
        },
        photometricOptions: recessedPhotometricOptions(
          (angle) => `Діаграма фотометричного розподілу ${angle} GER-LED High Ceiling, врізна (стельова) конфігурація`,
        ),
        drawing: {
          title: "Технічне креслення",
          image: GER_LED_HC_RECESSED_DRAWING_IMAGE,
          imageAlt: "Технічне креслення GER-LED High Ceiling, врізна (стельова) конфігурація",
        },
      },
      {
        id: "surface",
        label: "Накладна",
        photometric: {
          title: "Фотометричні дані",
          image: GER_LED_HC_SURFACE_PHOTOMETRIC_20,
          imageAlt: "Діаграма фотометричного розподілу 20° GER-LED High Ceiling, накладна конфігурація",
        },
        photometricOptions: surfacePhotometricOptions(
          (angle) => `Діаграма фотометричного розподілу ${angle} GER-LED High Ceiling, накладна конфігурація`,
        ),
        drawing: {
          title: "Технічне креслення",
          image: GER_LED_HC_SURFACE_DRAWING_IMAGE,
          imageAlt: "Технічне креслення GER-LED High Ceiling, накладна конфігурація",
        },
      },
    ],
    dimensionNote:
      "Діаметр підтверджено як Ø434 мм для обох конфігурацій. Точні інженерні розміри кожної конфігурації див. на технічних кресленнях вище.",
    applicationsHeading: "Типові застосування",
    applications: [
      {
        icon: "industrial-facility",
        title: "Заводи",
        image: GER_LED_HC_APPLICATION_FACTORIES_IMAGE,
        imageAlt: "Високостельові LED-світильники освітлюють покрівельну конструкцію промислового об'єкта",
        description: "Промислові виробничі середовища, що потребують потужного стельового освітлення.",
      },
      {
        icon: "warehouse",
        title: "Склади",
        image: GER_LED_HC_APPLICATION_WAREHOUSES_IMAGE,
        imageAlt: "Прохід складу зі стелажами для піддонів та навантажувачем, освітлений високостельовими LED-світильниками",
        description: "Складські та логістичні середовища з великою висотою монтажу.",
      },
      {
        icon: "high-ceiling",
        title: "Приміщення з високими стелями",
        image: GER_LED_HC_APPLICATION_HIGH_CEILING_IMAGE,
        imageAlt: "Промисловий об'єкт великого прольоту зі складованим упакованим вантажем, освітлений високостельовими LED-світильниками",
        description: "Великооб'ємні внутрішні простори, що потребують врізного (стельового) або накладного LED-освітлення.",
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
      { slug: "ger-led-high-ceiling", name: "GER-LED High Ceiling Lighting Systems", subtitle: "50–150 Вт · Врізний / накладний", isCurrent: true },
    ],
    supportCta: {
      title: "Потрібна допомога з підбором конфігурації GER-LED High Ceiling?",
      description:
        "Наша технічна команда допоможе обрати між врізною (стельовою) та накладною конфігураціями, рівнями потужності, керуванням та вимогами проєкту.",
      action: "Запросити технічну підтримку",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function gerLedHighCeilingContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

export { SUPPORT_REQUEST_HREF as GER_LED_HIGH_CEILING_SUPPORT_REQUEST_HREF };

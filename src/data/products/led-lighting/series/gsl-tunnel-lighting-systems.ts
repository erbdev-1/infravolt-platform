import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

/** Real GSL-TUNEL / GSL-TUNEL CORNER assets. Shared across markets; only
 * copy is localized.
 *
 * Catalogue classification note: this family's printed catalogue page
 * header reads "GER-LED Industrial High Ceiling Lighting Systems" (a
 * layout/header carry-over from the preceding spread), but the actual
 * product titles on the page, the order-code prefixes ("GSL 600NM..." /
 * "GSL 600NMC..."), and the dedicated extraction/data source all
 * identify these as the separate "GSL-TUNEL" / "GSL-TUNEL CORNER"
 * family (LEDBUS-Ar-Ru(1).pdf, PDF page 16 / printed pages 28–29). Kept
 * here as its own family under Outdoor & Infrastructure Lighting rather
 * than merged into either GER-LED High Ceiling or GER-LED Industrial
 * High Ceiling, which are unrelated Ø434 mm / rectangular high-ceiling
 * families on different catalogue pages.
 *
 * All product/technical assets were cropped directly from the verified
 * source catalogue page pixels and visually confirmed one by one (same
 * discipline as the GER-LED High Ceiling asset correction). */
const TUNNEL_CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/outdoor-infrastructure");

export const GSL_TUNNEL_HERO_IMAGE =
  `${TUNNEL_CATEGORY_ASSET_BASE}/product/tunnel-lighting-hero-foreground-products.webp`;
export const GSL_TUNNEL_HERO_IMAGE_ALT =
  "GSL-TUNEL and GSL-TUNEL CORNER heavy-duty LED luminaires, illuminated — straight-body GSL-TUNEL (main) and angled-body GSL-TUNEL CORNER (inset)";
export const GSL_TUNNEL_HERO_BACKGROUND_IMAGE =
  `${TUNNEL_CATEGORY_ASSET_BASE}/product/background/tunnel-lighting-hero-background.webp`;
export const GSL_TUNNEL_HERO_BACKGROUND_IMAGE_ALT = "Floodlit night-time tunnel and heavy-industry infrastructure scene";
export const GSL_TUNNEL_PHOTOMETRIC_IMAGE =
  `${TUNNEL_CATEGORY_ASSET_BASE}/photometric/gsl-tunnel-photometric-data.webp`;
export const GSL_TUNNEL_DRAWING_IMAGE =
  `${TUNNEL_CATEGORY_ASSET_BASE}/technical/gsl-tunnel-technical-drawing.webp`;
export const GSL_TUNNEL_CORNER_PHOTOMETRIC_IMAGE =
  `${TUNNEL_CATEGORY_ASSET_BASE}/photometric/gsl-tunnel-corner-photometric-data.webp`;
export const GSL_TUNNEL_CORNER_DRAWING_IMAGE =
  `${TUNNEL_CATEGORY_ASSET_BASE}/technical/gsl-tunnel-corner-technical-drawing.webp`;
export const GSL_TUNNEL_APPLICATION_TUNNELS_IMAGE =
  `${TUNNEL_CATEGORY_ASSET_BASE}/applications/special-hazardous-application-tunnels.webp`;
export const GSL_TUNNEL_APPLICATION_PRISONS_IMAGE =
  `${TUNNEL_CATEGORY_ASSET_BASE}/applications/special-hazardous-application-prisons.webp`;
export const GSL_TUNNEL_APPLICATION_BIOGAS_IMAGE =
  `${TUNNEL_CATEGORY_ASSET_BASE}/applications/special-hazardous-application-biogas-facilities.webp`;
/** Typical Applications — Industrial Facilities, Ports and Coal
 * Enterprises reuse real, verified LEDBUS/GER-LED photography already
 * used elsewhere on the site; Tunnels, Prisons and Biogas Facilities use
 * the Outdoor & Infrastructure category's shared applications photos
 * (also used for the Special & Hazardous Environment Lighting family). */
export const GSL_TUNNEL_APPLICATION_INDUSTRIAL_IMAGE =
  publicMediaUrl("products/led-lighting/series/gsl-tunnel-lighting-systems/gsl-tunnel-lighting-systems-application-industrial.webp");
export const GSL_TUNNEL_APPLICATION_PORTS_IMAGE =
  publicMediaUrl("products/led-lighting/series/gsl-tunnel-lighting-systems/gsl-tunnel-lighting-systems-application-ports.webp");
export const GSL_TUNNEL_APPLICATION_COAL_IMAGE =
  publicMediaUrl("products/led-lighting/series/gsl-tunnel-lighting-systems/gsl-tunnel-lighting-systems-application-coal.webp");

/** Order-code note: the source catalogue prints the first GSL-TUNEL order
 * code with a space ("GSL 600 NM.25.02") while the other three rows in
 * the same table have no space ("GSL 900NM.37.02", etc.) — a genuine
 * in-catalogue typesetting inconsistency (confirmed against the
 * high-resolution source page), not an extraction error. Reproduced
 * exactly as printed rather than silently normalised. */
const MODELS_UK: readonly LedSeriesModel[] = [
  {
    model: "GSL 600 NM.25.02",
    mountingType: "GSL-TUNEL",
    powerW: 25,
    luminousFluxLm: "2,750 lm",
    efficiencyLmW: ">110 lm/W",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 600 × 200 mm",
    length: "600 mm",
  },
  {
    model: "GSL 900NM.37.02",
    mountingType: "GSL-TUNEL",
    powerW: 37,
    luminousFluxLm: "4,070 lm",
    efficiencyLmW: ">110 lm/W",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 900 × 200 mm",
    length: "900 mm",
  },
  {
    model: "GSL 1200NM.49.02",
    mountingType: "GSL-TUNEL",
    powerW: 49,
    luminousFluxLm: "5,390 lm",
    efficiencyLmW: ">110 lm/W",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 1200 × 200 mm",
    length: "1200 mm",
  },
  {
    model: "GSL 1500NM.60.02",
    mountingType: "GSL-TUNEL",
    powerW: 60,
    luminousFluxLm: "6,600 lm",
    efficiencyLmW: ">110 lm/W",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 1500 × 200 mm",
    length: "1500 mm",
  },
  {
    model: "GSL 600NMC.25.02",
    mountingType: "GSL-TUNEL CORNER",
    powerW: 25,
    luminousFluxLm: "2,750 lm",
    efficiencyLmW: ">110 lm/W",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 600 × 200 mm",
    length: "600 mm",
  },
  {
    model: "GSL 900NMC.37.02",
    mountingType: "GSL-TUNEL CORNER",
    powerW: 37,
    luminousFluxLm: "4,070 lm",
    efficiencyLmW: ">110 lm/W",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 900 × 200 mm",
    length: "900 mm",
  },
  {
    model: "GSL 1200NMC.49.02",
    mountingType: "GSL-TUNEL CORNER",
    powerW: 49,
    luminousFluxLm: "5,390 lm",
    efficiencyLmW: ">110 lm/W",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 1200 × 200 mm",
    length: "1200 mm",
  },
  {
    model: "GSL 1500NMC.60.02",
    mountingType: "GSL-TUNEL CORNER",
    powerW: 60,
    luminousFluxLm: "6,600 lm",
    efficiencyLmW: ">110 lm/W",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 1500 × 200 mm",
    length: "1500 mm",
  },
] as const;

const MODELS_UA: readonly LedSeriesModel[] = [
  {
    model: "GSL 600 NM.25.02",
    mountingType: "GSL-TUNEL",
    powerW: 25,
    luminousFluxLm: "2 750 лм",
    efficiencyLmW: ">110 лм/Вт",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 600 × 200 мм",
    length: "600 мм",
  },
  {
    model: "GSL 900NM.37.02",
    mountingType: "GSL-TUNEL",
    powerW: 37,
    luminousFluxLm: "4 070 лм",
    efficiencyLmW: ">110 лм/Вт",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 900 × 200 мм",
    length: "900 мм",
  },
  {
    model: "GSL 1200NM.49.02",
    mountingType: "GSL-TUNEL",
    powerW: 49,
    luminousFluxLm: "5 390 лм",
    efficiencyLmW: ">110 лм/Вт",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 1200 × 200 мм",
    length: "1200 мм",
  },
  {
    model: "GSL 1500NM.60.02",
    mountingType: "GSL-TUNEL",
    powerW: 60,
    luminousFluxLm: "6 600 лм",
    efficiencyLmW: ">110 лм/Вт",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 1500 × 200 мм",
    length: "1500 мм",
  },
  {
    model: "GSL 600NMC.25.02",
    mountingType: "GSL-TUNEL CORNER",
    powerW: 25,
    luminousFluxLm: "2 750 лм",
    efficiencyLmW: ">110 лм/Вт",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 600 × 200 мм",
    length: "600 мм",
  },
  {
    model: "GSL 900NMC.37.02",
    mountingType: "GSL-TUNEL CORNER",
    powerW: 37,
    luminousFluxLm: "4 070 лм",
    efficiencyLmW: ">110 лм/Вт",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 900 × 200 мм",
    length: "900 мм",
  },
  {
    model: "GSL 1200NMC.49.02",
    mountingType: "GSL-TUNEL CORNER",
    powerW: 49,
    luminousFluxLm: "5 390 лм",
    efficiencyLmW: ">110 лм/Вт",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 1200 × 200 мм",
    length: "1200 мм",
  },
  {
    model: "GSL 1500NMC.60.02",
    mountingType: "GSL-TUNEL CORNER",
    powerW: 60,
    luminousFluxLm: "6 600 лм",
    efficiencyLmW: ">110 лм/Вт",
    cri: ">80",
    colourTemperature: "3000–6500 K",
    ip: "IP65",
    dimensions: "102 × 1500 × 200 мм",
    length: "1500 мм",
  },
] as const;


const content = {
  uk: {
    metadata: {
      title: "GSL Tunnel Lighting Systems | Outdoor & Infrastructure Lighting | LED Systems | InfraVolt",
      description:
        "GSL Tunnel Lighting Systems — 8 catalogue models across GSL-TUNEL and GSL-TUNEL CORNER, 25–60 W, IP65, IK16, for tunnels, ports and other heavy-duty infrastructure environments.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      category: "Outdoor & Infrastructure Lighting",
      current: "GSL Tunnel Lighting Systems",
    },
    backToCategoryLabel: "Back to Outdoor & Infrastructure Lighting",
    hero: {
      eyebrow: "LED SYSTEMS",
      category: "Outdoor & Infrastructure Lighting",
      title: "GSL Tunnel Lighting Systems",
      description:
        "Heavy-duty LED tunnel lighting designed for vandal resistance and demanding infrastructure environments, available in standard and angled CORNER configurations.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    heroImage: GSL_TUNNEL_HERO_IMAGE,
    heroImageAlt: GSL_TUNNEL_HERO_IMAGE_ALT,
    heroBackgroundImage: GSL_TUNNEL_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: GSL_TUNNEL_HERO_BACKGROUND_IMAGE_ALT,
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      {
        icon: "performance",
        title: "Performance",
        values: [
          { label: "Power Range", value: "25–60 W" },
          { label: "Luminous Flux", value: "2,750–6,600 lm" },
          { label: "Efficiency", value: ">110 lm/W" },
          { label: "Variants", value: "8 Catalogue Models" },
        ],
      },
      {
        icon: "light-quality",
        title: "Light Quality",
        values: [
          { label: "Colour Temperature", value: "3000–6500 K" },
          { label: "CRI", value: ">80" },
          { label: "Optical Distribution", value: "Standard / Corner" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Protection & Electrical",
        values: [
          { label: "IP65" },
          { label: "IK16" },
          { label: "Voltage", value: "220–240 Vac" },
          { label: "Frequency", value: "50–60 Hz" },
          { label: "Operating Temperature", value: "−20 to +45 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Construction & Installation",
        values: [
          { label: "Heavy-Gauge Steel Housing" },
          { label: "Electrostatic Polyester Powder Coated" },
          { label: "Opal PC Diffuser" },
          { label: "Tamper-Resistant Construction" },
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
        value: "CE · RoHS compliant · IP65 · IK16",
      },
      {
        icon: "warranty",
        label: "Warranty",
        value: "7-Year Warranty",
      },
    ],
    modelsHeading: "Models & Technical Schedule",
    modelsIntroduction:
      "Eight verified catalogue models across both GSL-TUNEL configurations — search or filter by type, power or length to find the right variant.",
    models: MODELS_UK,
    modelsNote:
      "The first GSL-TUNEL order code is reproduced with the space shown in the source catalogue (“GSL 600 NM.25.02”); the other codes have no space, matching the printed table exactly. Catalogue luminous-flux values are reference values and may be subject to revision.",
    modelsColumns: {
      mountingType: "Type",
      model: "Model / Catalogue Code",
      power: "Power",
      luminousFlux: "Luminous Flux",
      efficiency: "Efficiency",
      cri: "CRI",
      colourTemperature: "CCT",
      ip: "IP",
      dimensions: "Dimensions",
    },
    modelsFilters: {
      searchLabel: "Search",
      searchPlaceholder: "Search by model or catalogue code",
      mountingTypeFilterLabel: "Type",
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
    controlsIntroduction:
      "Catalogue-listed lighting control and system options; availability depends on project configuration. Not all controls are standard equipment.",
    controlOptions: [
      { icon: "control-signal", label: "1–10 V" },
      { icon: "control-dali", label: "DALI" },
      { icon: "control-touch-dim", label: "Touch-Dim" },
      { icon: "control-casambi", label: "Casambi" },
    ],
    photometricHeading: "Photometric & Technical Data",
    technicalAssets: [
      {
        title: "Photometric Data",
        image: GSL_TUNNEL_PHOTOMETRIC_IMAGE,
        imageAlt: "GSL-TUNEL photometric polar distribution diagram",
      },
      {
        title: "Technical Drawing",
        image: GSL_TUNNEL_DRAWING_IMAGE,
        imageAlt: "GSL-TUNEL technical drawing showing W / H / L fixture dimensions",
      },
    ],
    technicalAssetVariantsDefaultId: "tunnel",
    technicalAssetVariants: [
      {
        id: "tunnel",
        label: "GSL-TUNEL",
        photometric: {
          title: "Photometric Data",
          image: GSL_TUNNEL_PHOTOMETRIC_IMAGE,
          imageAlt: "GSL-TUNEL photometric polar distribution diagram",
        },
        drawing: {
          title: "Technical Drawing",
          image: GSL_TUNNEL_DRAWING_IMAGE,
          imageAlt: "GSL-TUNEL technical drawing showing W / H / L fixture dimensions",
        },
      },
      {
        id: "corner",
        label: "GSL-TUNEL CORNER",
        photometric: {
          title: "Photometric Data",
          image: GSL_TUNNEL_CORNER_PHOTOMETRIC_IMAGE,
          imageAlt: "GSL-TUNEL CORNER photometric polar distribution diagram",
        },
        drawing: {
          title: "Technical Drawing",
          image: GSL_TUNNEL_CORNER_DRAWING_IMAGE,
          imageAlt: "GSL-TUNEL CORNER technical drawing showing the angled housing and W / H / L fixture dimensions",
        },
      },
    ],
    dimensionNote:
      "Cross-section is verified at 102 × 200 mm for both configurations; overall length varies by model (600 / 900 / 1200 / 1500 mm). Refer to the technical drawings above for full engineering dimensions per configuration.",
    applicationsHeading: "Typical Applications",
    applications: [
      {
        icon: "tunnel",
        title: "Tunnels",
        image: GSL_TUNNEL_APPLICATION_TUNNELS_IMAGE,
        imageAlt: "Tunnel interior illuminated by heavy-duty LED tunnel lighting",
        description: "Road and infrastructure tunnel lighting requiring vandal-resistant fixtures.",
      },
      {
        icon: "industrial-facility",
        title: "Industrial Facilities",
        image: GSL_TUNNEL_APPLICATION_INDUSTRIAL_IMAGE,
        imageAlt: "Large-span industrial hall interior with staged crated goods, lit by high-bay LED fixtures",
        description: "Heavy-duty industrial environments requiring rugged, tamper-resistant lighting.",
      },
      {
        icon: "prison",
        title: "Prisons",
        image: GSL_TUNNEL_APPLICATION_PRISONS_IMAGE,
        imageAlt: "Prison facility illuminated by vandal-resistant LED lighting",
        description: "Correctional facilities requiring vandal-resistant, tamper-proof lighting.",
      },
      {
        icon: "port",
        title: "Ports",
        image: GSL_TUNNEL_APPLICATION_PORTS_IMAGE,
        imageAlt: "Container ship at a floodlit port quay with gantry cranes and heavy industry in the background",
        description: "Heavy-duty loading and port environments exposed to demanding weather conditions.",
      },
      {
        icon: "mining",
        title: "Coal Enterprises",
        image: GSL_TUNNEL_APPLICATION_COAL_IMAGE,
        imageAlt: "Coal processing facility interior with a conveyor belt, wheel loader and coal stockpile under high-bay LED lighting",
        description: "Coal processing and handling facilities requiring rugged, vandal-resistant fixtures.",
      },
      {
        icon: "biogas",
        title: "Biogas Facilities",
        image: GSL_TUNNEL_APPLICATION_BIOGAS_IMAGE,
        imageAlt: "Biogas facility illuminated by durable outdoor-rated LED lighting",
        description: "Biogas plants and similar process facilities requiring durable outdoor-rated lighting.",
      },
    ],
    siblingFamiliesHeading: "Other Outdoor & Infrastructure Families",
    siblingViewSeriesLabel: "View Series",
    currentFamilyBadgeLabel: "Current family",
    siblingFamilies: [
      {
        slug: "ger-led-street-lighting-systems",
        name: "GER-LED Street Lighting Systems",
        subtitle: "GSL100 and 730-GSL-D road-lighting configurations",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-street-lighting-systems",
      },
      {
        slug: "ger-led-projector-lighting-systems",
        name: "GER-LED Projector / Floodlight Lighting Systems",
        subtitle: "20–1000 W large-area projector configurations",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-projector-lighting-systems",
      },
      {
        slug: "led-bus-ldb-kmx-canopy-lighting-systems",
        name: "LED-BUS LDB-KMX Canopy Lighting Systems",
        subtitle: "100–400 W protected canopy luminaires",
        href: "/products/led-systems/outdoor-infrastructure-lighting/led-bus-ldb-kmx-canopy-lighting-systems",
      },
      {
        slug: "gsl-tunnel-lighting-systems",
        name: "GSL Tunnel Lighting Systems",
        subtitle: "25–60 W · GSL-TUNEL / GSL-TUNEL CORNER",
        isCurrent: true,
      },
      {
        slug: "ger-led-wall-washer-lighting-systems",
        name: "GER-LED Wall Washer Lighting Systems",
        subtitle: "Standard and DMX architectural wall washing",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-wall-washer-lighting-systems",
      },
    ],
    supportCta: {
      title: "Need help selecting the right GSL-TUNEL configuration?",
      description:
        "Our technical team can help you choose between standard and corner configurations, power levels, controls and project requirements.",
      action: "Request Technical Support",
    },
  },
  ua: {
    metadata: {
      title: "GSL Tunnel Lighting – тунельне LED-освітлення | InfraVolt",
      description:
        "GSL Tunnel Lighting Systems — 8 каталожних моделей GSL-TUNEL та GSL-TUNEL CORNER, 25–60 Вт, IP65, IK16, для тунелів, портів та інших об'єктів важкої інфраструктури.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "Системи LED-освітлення",
      category: "Зовнішнє освітлення та освітлення інфраструктури",
      current: "GSL Tunnel Lighting Systems",
    },
    backToCategoryLabel: "Назад до зовнішнього освітлення та освітлення інфраструктури",
    hero: {
      eyebrow: "СИСТЕМИ LED",
      category: "Зовнішнє освітлення та освітлення інфраструктури",
      title: "GSL Tunnel Lighting Systems",
      description:
        "Потужне LED-освітлення тунелів, стійке до вандалізму та призначене для складних інфраструктурних умов, доступне у стандартній та кутовій конфігураціях CORNER.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    heroImage: GSL_TUNNEL_HERO_IMAGE,
    heroImageAlt:
      "Увімкнені світильники GSL-TUNEL та GSL-TUNEL CORNER — прямий корпус GSL-TUNEL (основне зображення) та кутовий корпус GSL-TUNEL CORNER (додаткове зображення)",
    heroBackgroundImage: GSL_TUNNEL_HERO_BACKGROUND_IMAGE,
    heroBackgroundImageAlt: "Освітлена вночі сцена порту та об'єктів важкої промислової інфраструктури",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      {
        icon: "performance",
        title: "Продуктивність",
        values: [
          { label: "Діапазон потужності", value: "25–60 Вт" },
          { label: "Світловий потік", value: "2 750–6 600 лм" },
          { label: "Ефективність", value: ">110 лм/Вт" },
          { label: "Варіанти", value: "8 каталожних моделей" },
        ],
      },
      {
        icon: "light-quality",
        title: "Якість світла",
        values: [
          { label: "Колірна температура", value: "3000–6500 K" },
          { label: "CRI", value: ">80" },
          { label: "Оптичний розподіл", value: "Стандартний / Кутовий" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Захист та електрика",
        values: [
          { label: "IP65" },
          { label: "IK16" },
          { label: "Напруга", value: "220–240 В" },
          { label: "Частота", value: "50–60 Гц" },
          { label: "Робоча температура", value: "−20 до +45 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Конструкція та монтаж",
        values: [
          { label: "Важкий сталевий корпус" },
          { label: "Електростатично порошково пофарбований поліестером" },
          { label: "Опаловий PC дифузор" },
          { label: "Конструкція, стійка до втручання" },
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
        value: "CE · Відповідність RoHS · IP65 · IK16",
      },
      {
        icon: "warranty",
        label: "Гарантія",
        value: "7 років гарантії",
      },
    ],
    modelsHeading: "Моделі та технічний розклад",
    modelsIntroduction:
      "Вісім перевірених каталожних моделей обох конфігурацій GSL-TUNEL — здійснюйте пошук або фільтруйте за типом, потужністю чи довжиною.",
    models: MODELS_UA,
    modelsNote:
      "Перший каталожний код GSL-TUNEL наведено з пробілом, як у першоджерелі каталогу (“GSL 600 NM.25.02”); інші коди без пробілу, точно як у надрукованій таблиці. Значення світлового потоку в каталозі є довідковими і можуть підлягати уточненню.",
    modelsColumns: {
      mountingType: "Тип",
      model: "Модель / каталожний код",
      power: "Потужність",
      luminousFlux: "Світловий потік",
      efficiency: "Ефективність",
      cri: "CRI",
      colourTemperature: "CCT",
      ip: "IP",
      dimensions: "Розміри",
    },
    modelsFilters: {
      searchLabel: "Пошук",
      searchPlaceholder: "Пошук за моделлю або каталожним кодом",
      mountingTypeFilterLabel: "Тип",
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
    controlsIntroduction:
      "Каталожні опції керування освітленням та системи; доступність залежить від конфігурації проєкту. Не всі опції керування є стандартним обладнанням.",
    controlOptions: [
      { icon: "control-signal", label: "1–10 В" },
      { icon: "control-dali", label: "DALI" },
      { icon: "control-touch-dim", label: "Touch-Dim" },
      { icon: "control-casambi", label: "Casambi" },
    ],
    photometricHeading: "Фотометричні та технічні дані",
    technicalAssets: [
      {
        title: "Фотометричні дані",
        image: GSL_TUNNEL_PHOTOMETRIC_IMAGE,
        imageAlt: "Полярна діаграма фотометричного розподілу GSL-TUNEL",
      },
      {
        title: "Технічне креслення",
        image: GSL_TUNNEL_DRAWING_IMAGE,
        imageAlt: "Технічне креслення GSL-TUNEL з розмірами W / H / L",
      },
    ],
    technicalAssetVariantsDefaultId: "tunnel",
    technicalAssetVariants: [
      {
        id: "tunnel",
        label: "GSL-TUNEL",
        photometric: {
          title: "Фотометричні дані",
          image: GSL_TUNNEL_PHOTOMETRIC_IMAGE,
          imageAlt: "Полярна діаграма фотометричного розподілу GSL-TUNEL",
        },
        drawing: {
          title: "Технічне креслення",
          image: GSL_TUNNEL_DRAWING_IMAGE,
          imageAlt: "Технічне креслення GSL-TUNEL з розмірами W / H / L",
        },
      },
      {
        id: "corner",
        label: "GSL-TUNEL CORNER",
        photometric: {
          title: "Фотометричні дані",
          image: GSL_TUNNEL_CORNER_PHOTOMETRIC_IMAGE,
          imageAlt: "Полярна діаграма фотометричного розподілу GSL-TUNEL CORNER",
        },
        drawing: {
          title: "Технічне креслення",
          image: GSL_TUNNEL_CORNER_DRAWING_IMAGE,
          imageAlt: "Технічне креслення GSL-TUNEL CORNER з кутовим корпусом та розмірами W / H / L",
        },
      },
    ],
    dimensionNote:
      "Переріз підтверджено як 102 × 200 мм для обох конфігурацій; загальна довжина залежить від моделі (600 / 900 / 1200 / 1500 мм). Точні інженерні розміри кожної конфігурації див. на технічних кресленнях вище.",
    applicationsHeading: "Типові застосування",
    applications: [
      {
        icon: "tunnel",
        title: "Тунелі",
        image: GSL_TUNNEL_APPLICATION_TUNNELS_IMAGE,
        imageAlt: "Тунель, освітлений потужними LED-світильниками для тунелів",
        description: "Освітлення дорожніх та інфраструктурних тунелів, що потребує стійких до вандалізму світильників.",
      },
      {
        icon: "industrial-facility",
        title: "Промислові об'єкти",
        image: GSL_TUNNEL_APPLICATION_INDUSTRIAL_IMAGE,
        imageAlt: "Промисловий об'єкт великого прольоту зі складованим упакованим вантажем, освітлений високостельовими LED-світильниками",
        description: "Об'єкти важкої промисловості, що потребують міцного, стійкого до втручання освітлення.",
      },
      {
        icon: "prison",
        title: "Виправні заклади",
        image: GSL_TUNNEL_APPLICATION_PRISONS_IMAGE,
        imageAlt: "Виправний заклад, освітлений стійкими до вандалізму LED-світильниками",
        description: "Виправні заклади, що потребують стійкого до вандалізму та втручання освітлення.",
      },
      {
        icon: "port",
        title: "Порти",
        image: GSL_TUNNEL_APPLICATION_PORTS_IMAGE,
        imageAlt: "Контейнеровоз біля освітленого причалу порту з портальними кранами та важкою промисловістю на фоні",
        description: "Об'єкти важкого вантаження та порти, що зазнають складних погодних умов.",
      },
      {
        icon: "mining",
        title: "Вугільні підприємства",
        image: GSL_TUNNEL_APPLICATION_COAL_IMAGE,
        imageAlt: "Інтер'єр вуглезбагачувальної фабрики зі стрічковим конвеєром, колісним навантажувачем і штабелем вугілля під високостельовим LED-освітленням",
        description: "Об'єкти переробки та обробки вугілля, що потребують міцних, стійких до вандалізму світильників.",
      },
      {
        icon: "biogas",
        title: "Біогазові об'єкти",
        image: GSL_TUNNEL_APPLICATION_BIOGAS_IMAGE,
        imageAlt: "Біогазовий об'єкт, освітлений довговічними LED-світильниками для зовнішніх умов",
        description: "Біогазові установки та подібні технологічні об'єкти, що потребують довговічного освітлення для зовнішніх умов.",
      },
    ],
    siblingFamiliesHeading: "Інші серії зовнішнього освітлення та освітлення інфраструктури",
    siblingViewSeriesLabel: "Переглянути серію",
    currentFamilyBadgeLabel: "Поточна серія",
    siblingFamilies: [
      {
        slug: "ger-led-street-lighting-systems",
        name: "GER-LED Street Lighting Systems",
        subtitle: "Конфігурації GSL100 і 730-GSL-D для дорожнього освітлення",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-street-lighting-systems",
      },
      {
        slug: "ger-led-projector-lighting-systems",
        name: "GER-LED Projector / Floodlight Lighting Systems",
        subtitle: "Конфігурації прожекторів 20–1000 Вт для великих площ",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-projector-lighting-systems",
      },
      {
        slug: "led-bus-ldb-kmx-canopy-lighting-systems",
        name: "LED-BUS LDB-KMX Canopy Lighting Systems",
        subtitle: "Захищені світильники для навісів 100–400 Вт",
        href: "/products/led-systems/outdoor-infrastructure-lighting/led-bus-ldb-kmx-canopy-lighting-systems",
      },
      {
        slug: "gsl-tunnel-lighting-systems",
        name: "GSL Tunnel Lighting Systems",
        subtitle: "25–60 Вт · GSL-TUNEL / GSL-TUNEL CORNER",
        isCurrent: true,
      },
      {
        slug: "ger-led-wall-washer-lighting-systems",
        name: "GER-LED Wall Washer Lighting Systems",
        subtitle: "Стандартне й DMX архітектурне фасадне освітлення",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-wall-washer-lighting-systems",
      },
    ],
    supportCta: {
      title: "Потрібна допомога з підбором конфігурації GSL-TUNEL?",
      description:
        "Наша технічна команда допоможе обрати між стандартною та кутовою конфігураціями, рівнями потужності, керуванням та вимогами проєкту.",
      action: "Запросити технічну підтримку",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function gslTunnelLightingSystemsContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

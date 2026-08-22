import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

const CATEGORY_ASSET_BASE = "/assets/products/led-lighting/category/smart-lighting&automation";
const APPLICATION_IMAGE_BASE = "/assets/products/led-lighting/category/outdorr&infrastructure/applications";

// Prepared studio/cutout assets (no baked-in catalogue chrome or callout
// text, unlike the original raw catalogue-page extracts under
// series/ger-led-smart-street-lighting/) — same GSL3 C70W camera-equipped
// luminaire, now clean enough for both markets.
export const GER_LED_SMART_STREET_HERO_IMAGE = `${CATEGORY_ASSET_BASE}/product/smart-street-lighting-integrated-360-camera-hero-product-transparent.webp`;
export const GER_LED_SMART_STREET_HERO_BACKGROUND = `${CATEGORY_ASSET_BASE}/product/smart-street-lighting-integrated-360-camera-hero-background.webp`;
const GER_LED_SMART_STREET_PHOTOMETRIC_IMAGE = `${CATEGORY_ASSET_BASE}/photometric/smart-street-lighting-integrated-360-camera-photometric-transparent.png`;
const GER_LED_SMART_STREET_DRAWING_IMAGE = `${CATEGORY_ASSET_BASE}/technical/smart-street-lighting-integrated-360-camera-technical-dimensions-4x.png`;

const MODELS: readonly LedSeriesModel[] = [
  {
    model: "GSL1 C35W",
    powerW: 35,
    ledQty: 8,
    luminousFluxLm: "5,000 lm",
    efficiencyLmW: "142.9 lm/W",
    cri: "75–85",
    colourTemperature: "3000–6500 K",
    ip: "IP66",
    weightKg: "8.0 kg",
  },
  {
    model: "GSL2 C50W",
    powerW: 50,
    ledQty: 36,
    luminousFluxLm: "7,500 lm",
    efficiencyLmW: "150.0 lm/W",
    cri: "75–85",
    colourTemperature: "3000–6500 K",
    ip: "IP66",
    weightKg: "8.0 kg",
  },
  {
    model: "GSL3 C70W",
    powerW: 70,
    ledQty: 48,
    luminousFluxLm: "12,250 lm",
    efficiencyLmW: "175.0 lm/W",
    cri: "75–85",
    colourTemperature: "3000–6500 K",
    ip: "IP66",
    weightKg: "8.0 kg",
  },
  {
    model: "GSL4 C105W",
    powerW: 100,
    ledQty: 60,
    luminousFluxLm: "16,100 lm",
    efficiencyLmW: "161.0 lm/W",
    cri: "75–85",
    colourTemperature: "3000–6500 K",
    ip: "IP66",
    weightKg: "8.0 kg",
  },
  {
    model: "GSL5 C125W",
    powerW: 125,
    ledQty: 64,
    luminousFluxLm: "20,500 lm",
    efficiencyLmW: "164.0 lm/W",
    cri: "75–85",
    colourTemperature: "3000–6500 K",
    ip: "IP66",
    weightKg: "9.0 kg",
  },
  {
    model: "GSL6 C150W",
    powerW: 150,
    ledQty: 64,
    luminousFluxLm: "22,150 lm",
    efficiencyLmW: "147.7 lm/W",
    cri: "75–85",
    colourTemperature: "3000–6500 K",
    ip: "IP66",
    weightKg: "9.0 kg",
  },
  {
    model: "GSL7 C185W",
    powerW: 185,
    ledQty: 80,
    luminousFluxLm: "24,500 lm",
    efficiencyLmW: "144.86 lm/W",
    cri: "75–85",
    colourTemperature: "3000–6500 K",
    ip: "IP66",
    weightKg: "9.0 kg",
  },
  {
    model: "GSL8 C200W",
    powerW: 200,
    ledQty: 80,
    luminousFluxLm: "25,750 lm",
    efficiencyLmW: "145 lm/W",
    cri: "75–85",
    colourTemperature: "3000–6500 K",
    ip: "IP66",
    weightKg: "9.0 kg",
  },
  {
    model: "GSL9 C250W",
    powerW: 250,
    ledQty: 80,
    luminousFluxLm: "29,500 lm",
    efficiencyLmW: "144 lm/W",
    cri: "75–85",
    colourTemperature: "3000–6500 K",
    ip: "IP66",
    weightKg: "9.0 kg",
  },
] as const;

const content = {
  uk: {
    metadata: {
      title: "GER-LED Smart Street Lighting | Smart Lighting & Automation | LED Systems | InfraVolt",
      description:
        "GER-LED Smart Street Lighting — nine GSL camera models from 35–250 W with an integrated 360° camera under glass, IP66 protection and catalogue-listed control options.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      category: "Smart Lighting & Automation",
      current: "GER-LED Smart Street Lighting",
    },
    backToCategoryLabel: "Back to Smart Lighting & Automation",
    hero: {
      eyebrow: "SMART STREET LIGHTING",
      category: "Smart Lighting & Automation",
      title: "GER-LED Smart Street Lighting",
      description:
        "GER-LED street luminaires combining LED road lighting with a 360° camera mounted under glass, across nine catalogue C-series models for roads, transport, public-space and infrastructure applications.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    heroImage: GER_LED_SMART_STREET_HERO_IMAGE,
    heroImageAlt: "GER-LED smart street luminaire with an integrated 360° camera under glass",
    heroBackgroundImage: GER_LED_SMART_STREET_HERO_BACKGROUND,
    heroBackgroundImageAlt: "GER-LED smart street luminaires illuminating an urban street at dusk",
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      {
        icon: "performance",
        title: "Performance",
        values: [
          { label: "Power Range", value: "35–250 W" },
          { label: "Luminous Flux", value: "5,000–29,500 lm" },
          { label: "Catalogue Models", value: "9" },
          { label: "Primary Visual", value: "GSL3 C70W · 12,250 lm" },
        ],
      },
      {
        icon: "light-quality",
        title: "Light Quality",
        values: [
          { label: "Colour Temperature", value: "3000–6500 K" },
          { label: "CRI", value: "75–85" },
          { label: "LED Quantity", value: "8–80" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Protection & Electrical",
        values: [
          { label: "Protection", value: "IP66" },
          { label: "Voltage", value: "110–240 Vac" },
          { label: "Frequency", value: "50–60 Hz" },
          { label: "Power Factor", value: ">0.95" },
          { label: "Operating Temperature", value: "−30 to +60 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Construction",
        values: [
          { label: "Body & Covers", value: "Anodised" },
          { label: "Finish", value: "Polyester electrostatic powder coating" },
          { label: "Diffuser", value: "High-transmission satin opal PS" },
          { label: "Weight", value: "8.0 / 9.0 kg by model" },
        ],
      },
    ],
    technicalAssurance: [
      {
        icon: "colour-finish",
        label: "Colour & Finish",
        value: "White · Grey · Black · Other RAL colours on request",
      },
      {
        icon: "compliance",
        label: "Compliance",
        value: "IP66",
      },
      {
        icon: "warranty",
        label: "Warranty",
        value: "7-Year Warranty",
      },
    ],
    sourceNote:
      "The technical table states 110–240 Vac while page icons show 220–240 V. This page preserves the table value and does not resolve the catalogue discrepancy. Luminous-flux values are marked as reference values in the source catalogue.",
    keyCapabilitiesHeading: "Smart Lighting Capabilities",
    keyCapabilitiesIntroduction:
      "The integrated camera is part of the C-series concept. Control and communication features shown as options depend on project configuration and are not presented as standard on every model.",
    keyCapabilities: [
      {
        icon: "camera",
        title: "Integrated 360° Camera",
        description: "The catalogue shows the camera mounted under glass in the lower luminaire housing.",
      },
      {
        icon: "power-dim",
        title: "Configurable Lighting Control",
        description: "DALI, 1–10 V and SwitchDIM appear as catalogue-listed control options.",
      },
      {
        icon: "network",
        title: "Project Communication Options",
        description: "The wider GER-LED street-lighting pages list PLC, 3G and TCP/IP as project-dependent smart options.",
      },
      {
        icon: "fault-monitoring",
        title: "Monitoring Options",
        description: "The wider family catalogue lists sensor input, fault reading and scenario control as configurable capabilities.",
      },
    ],
    modelsHeading: "Models & Technical Schedule",
    modelsIntroduction:
      "Nine camera-equipped C-series catalogue models. Search or filter by exact model code, power, LED quantity or weight.",
    models: MODELS,
    modelsNote:
      "GSL4 C105W is the exact catalogue model code, while its power column states 100 W. The GSL7–GSL9 luminous-flux and efficiency figures are reproduced exactly as printed, including their internal arithmetic inconsistency.",
    modelsColumns: {
      model: "Model / Catalogue Code",
      power: "Power",
      ledQty: "LED Qty",
      luminousFlux: "Luminous Flux",
      efficiency: "Efficiency",
      cri: "CRI",
      colourTemperature: "CCT",
      ip: "IP",
      weight: "Weight",
    },
    modelsFilters: {
      searchLabel: "Search",
      searchPlaceholder: "Search by exact GSL model code",
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
    photometricHeading: "Photometric & Technical Data",
    technicalAssets: [
      { title: "Photometric Data", image: GER_LED_SMART_STREET_PHOTOMETRIC_IMAGE, imageAlt: "GER-LED Smart Street Lighting catalogue polar photometric distribution diagram" },
      { title: "Technical Drawing", image: GER_LED_SMART_STREET_DRAWING_IMAGE, imageAlt: "GER-LED Smart Street Lighting catalogue technical dimensions drawing" },
    ],
    dimensionNote: "Technical assets extracted from the GER-LED Smart Street Lighting catalogue page; the model schedule above lists the exact per-model values.",
    controlsHeading: "Controls & System Options",
    controlsIntroduction:
      "Catalogue-listed protocols and system icons; availability is configuration- and project-dependent. They are not implied as standard equipment on every C-series luminaire.",
    controlsGroupLabel: "Lighting Controls",
    controlOptions: [
      { icon: "control-dali", label: "DALI" },
      { icon: "control-signal", label: "1–10 V" },
      { icon: "control-touch-dim", label: "SwitchDIM" },
      { icon: "control-emergency", label: "Emergency Option" },
      { icon: "control-sensor", label: "Sensor Option" },
    ],
    smartIntegrationHeading: "Project-Dependent Smart Options",
    smartIntegrationIntroduction:
      "The wider GER-LED street-lighting catalogue explicitly lists these smart functions as options. Final availability must be confirmed for the project and selected model.",
    smartIntegrationItems: [
      { icon: "camera", label: "IP Camera" },
      { icon: "wireless", label: "3G" },
      { icon: "network", label: "TCP/IP" },
      { icon: "plc", label: "PLC" },
      { icon: "power-dim", label: "On / Off / Dim" },
      { icon: "environment", label: "Humidity / Temperature" },
      { icon: "motion-daylight", label: "Motion / Daylight" },
      { icon: "fault-monitoring", label: "Fault Reading" },
      { icon: "scenario-control", label: "Scenario Control" },
    ],
    applicationsHeading: "Typical Applications",
    applications: [
      { icon: "port", title: "Ports", description: "Outdoor route and public-area lighting for port environments.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-ports.webp`, imageAlt: "Port illuminated by outdoor street lighting" },
      { icon: "airport", title: "Airports", description: "Road and public-area lighting around airport infrastructure.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-airports-transport-facilities.webp`, imageAlt: "Airport transport facility illuminated by outdoor street lighting" },
      { icon: "motorway", title: "Motorways", description: "Structured, high-performance lighting for major routes and motorways.", image: `${APPLICATION_IMAGE_BASE}/ger-led-street-lighting-road-application.webp`, imageAlt: "Urban roadway illuminated by GER-LED street lighting" },
      { icon: "parks", title: "Parks & Gardens", description: "Public-realm lighting for landscaped parks and garden areas.", image: `${APPLICATION_IMAGE_BASE}/street-lighting-application-parks-gardens.webp`, imageAlt: "Park illuminated by GER-LED street lighting" },
      { icon: "residential", title: "Residential Complexes", description: "Internal roads, walkways and communal areas within residential developments.", image: `${APPLICATION_IMAGE_BASE}/street-lighting-application-commercial-residential-public-areas.webp`, imageAlt: "Commercial and residential public area illuminated by GER-LED street lighting" },
      { icon: "shopping-centre", title: "Shopping Centres", description: "Access roads and circulation-area lighting for retail environments.", image: `${APPLICATION_IMAGE_BASE}/wall-washer-application-shopping-commercial-buildings.webp`, imageAlt: "Shopping and commercial building exterior illuminated by outdoor lighting" },
      { icon: "public-square", title: "Public Squares", description: "Lighting for urban squares and shared civic spaces.", image: `${APPLICATION_IMAGE_BASE}/street-lighting-application-public-squares.webp`, imageAlt: "Public square illuminated by GER-LED street lighting" },
    ],
    siblingFamiliesHeading: "Other Smart Lighting Families",
    siblingViewSeriesLabel: "View Series",
    currentFamilyBadgeLabel: "Current family",
    siblingFamilies: [
      {
        slug: "g-bus-plc-automation",
        name: "G-BUS PLC Automation",
        subtitle: "Powerline automation · 17 stock-coded entries",
        href: "/products/led-systems/smart-lighting-automation/g-bus-plc-automation",
      },
      {
        slug: "ger-led-smart-street-lighting",
        name: "GER-LED Smart Street Lighting",
        subtitle: "35–250 W · Integrated 360° camera",
        isCurrent: true,
      },
    ],
    supportCta: {
      title: "Planning a smart street-lighting project?",
      description:
        "Request technical support for model selection, camera integration, controls, photometric data and project-dependent communication options.",
      action: "Request Technical Support",
    },
  },
  ua: {
    metadata: {
      title: "Розумне вуличне освітлення GER-LED | Розумне освітлення та автоматизація | LED-системи | InfraVolt",
      description:
        "Розумне вуличне освітлення GER-LED — дев’ять моделей GSL 35–250 Вт із вбудованою камерою 360° під склом, IP66 та опціями керування з каталогу.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "LED-системи",
      category: "Розумне освітлення та автоматизація",
      current: "Розумне вуличне освітлення GER-LED",
    },
    backToCategoryLabel: "Назад до розумного освітлення та автоматизації",
    hero: {
      eyebrow: "РОЗУМНЕ ВУЛИЧНЕ ОСВІТЛЕННЯ",
      category: "Розумне освітлення та автоматизація",
      title: "Розумне вуличне освітлення GER-LED",
      description:
        "Вуличні світильники GER-LED поєднують LED-освітлення доріг із камерою 360° під склом у дев’яти моделях C-серії для доріг, транспорту, громадських просторів та інфраструктури.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    heroImage: GER_LED_SMART_STREET_HERO_IMAGE,
    heroImageAlt: "Розумний вуличний світильник GER-LED з інтегрованою камерою 360° під склом",
    heroBackgroundImage: GER_LED_SMART_STREET_HERO_BACKGROUND,
    heroBackgroundImageAlt: "Вуличні світильники GER-LED освітлюють міську вулицю в сутінках",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      {
        icon: "performance",
        title: "Продуктивність",
        values: [
          { label: "Потужність", value: "35–250 Вт" },
          { label: "Світловий потік", value: "5 000–29 500 лм" },
          { label: "Моделі", value: "9" },
          { label: "Основна модель", value: "GSL3 C70W · 12 250 лм" },
        ],
      },
      {
        icon: "light-quality",
        title: "Якість світла",
        values: [
          { label: "Колірна температура", value: "3000–6500 K" },
          { label: "CRI", value: "75–85" },
          { label: "Кількість LED", value: "8–80" },
        ],
      },
      {
        icon: "protection-electrical",
        title: "Захист та електрика",
        values: [
          { label: "Захист", value: "IP66" },
          { label: "Напруга", value: "110–240 Vac" },
          { label: "Частота", value: "50–60 Гц" },
          { label: "Коефіцієнт потужності", value: ">0,95" },
          { label: "Робоча температура", value: "−30 до +60 °C" },
        ],
      },
      {
        icon: "construction",
        title: "Конструкція",
        values: [
          { label: "Корпус і кришки", value: "Анодовані" },
          { label: "Покриття", value: "Поліестерне електростатичне порошкове" },
          { label: "Розсіювач", value: "Сатинований опаловий PS високої прозорості" },
          { label: "Вага", value: "8,0 / 9,0 кг залежно від моделі" },
        ],
      },
    ],
    technicalAssurance: [
      {
        icon: "colour-finish",
        label: "Колір та покриття",
        value: "Білий · Сірий · Чорний · Інші RAL за запитом",
      },
      {
        icon: "compliance",
        label: "Відповідність",
        value: "IP66",
      },
      {
        icon: "warranty",
        label: "Гарантія",
        value: "7 років гарантії",
      },
    ],
    sourceNote:
      "У технічній таблиці вказано 110–240 Vac, а в піктограмах сторінки — 220–240 V. Тут збережено значення таблиці без самостійного виправлення. Світловий потік позначено в каталозі як довідковий.",
    keyCapabilitiesHeading: "Можливості розумного освітлення",
    keyCapabilitiesIntroduction:
      "Вбудована камера належить до концепції C-серії. Функції керування та зв’язку залежать від конфігурації проєкту й не подані як стандартні для кожної моделі.",
    keyCapabilities: [
      {
        icon: "camera",
        title: "Вбудована камера 360°",
        description: "Каталог показує камеру під склом у нижній частині корпусу світильника.",
      },
      {
        icon: "power-dim",
        title: "Налаштовуване керування",
        description: "DALI, 1–10 V і SwitchDIM наведені як опції керування в каталозі.",
      },
      {
        icon: "network",
        title: "Опції зв’язку проєкту",
        description: "Для ширшого сімейства GER-LED у каталозі вказані PLC, 3G і TCP/IP як опції проєкту.",
      },
      {
        icon: "fault-monitoring",
        title: "Опції моніторингу",
        description: "Каталог сімейства наводить датчики, зчитування несправностей і сценарне керування як опції.",
      },
    ],
    modelsHeading: "Моделі та технічна таблиця",
    modelsIntroduction: "Дев’ять моделей C-серії з камерою. Пошук і фільтрація за точним кодом, потужністю, LED або вагою.",
    models: MODELS,
    modelsNote:
      "GSL4 C105W — точний код каталогу, хоча в колонці потужності вказано 100 W. Значення потоку й ефективності GSL7–GSL9 відтворено точно, включно з арифметичною неузгодженістю джерела.",
    modelsColumns: {
      model: "Модель / код каталогу",
      power: "Потужність",
      ledQty: "Кількість LED",
      luminousFlux: "Світловий потік",
      efficiency: "Ефективність",
      cri: "CRI",
      colourTemperature: "CCT",
      ip: "IP",
      weight: "Вага",
    },
    modelsFilters: {
      searchLabel: "Пошук",
      searchPlaceholder: "Пошук за точним кодом GSL",
      powerFilterLabel: "Потужність",
      allPowersLabel: "Усі потужності",
      ledQtyFilterLabel: "Кількість LED",
      weightFilterLabel: "Вага",
      clearFiltersLabel: "Очистити фільтри",
      noResultsLabel: "Немає моделей, що відповідають пошуку.",
      downloadCsvLabel: "Завантажити CSV",
      mobileFiltersToggleLabel: "Фільтр і пошук",
      mobileApplyFiltersLabel: "Застосувати фільтри",
      mobileViewAllPrefix: "Показати всі",
      mobileViewFilteredPrefix: "Показати",
      mobileHidePrefix: "Сховати моделі",
      modelsCountSuffix: "моделей",
      copyModelCodeAction: "Копіювати код каталогу",
      copiedLabel: "Скопійовано",
      enquiryColumnLabel: "Запит",
      enquiryAddAction: "Додати до запиту",
      enquiryRemoveAction: "Видалити із запиту",
    },
    photometricHeading: "Фотометричні та технічні дані",
    technicalAssets: [
      { title: "Фотометричні дані", image: GER_LED_SMART_STREET_PHOTOMETRIC_IMAGE, imageAlt: "Полярна фотометрична діаграма розподілу світла GER-LED Smart Street Lighting з каталогу" },
      { title: "Технічне креслення", image: GER_LED_SMART_STREET_DRAWING_IMAGE, imageAlt: "Технічне креслення розмірів GER-LED Smart Street Lighting з каталогу" },
    ],
    dimensionNote: "Технічні матеріали взято зі сторінки каталогу GER-LED Smart Street Lighting; точні значення для кожної моделі наведено в таблиці моделей вище.",
    controlsHeading: "Керування та системні опції",
    controlsIntroduction:
      "Протоколи й системні піктограми з каталогу залежать від конфігурації та проєкту. Вони не є стандартними для кожної моделі C-серії.",
    controlsGroupLabel: "Керування освітленням",
    controlOptions: [
      { icon: "control-dali", label: "DALI" },
      { icon: "control-signal", label: "1–10 V" },
      { icon: "control-touch-dim", label: "SwitchDIM" },
      { icon: "control-emergency", label: "Аварійна опція" },
      { icon: "control-sensor", label: "Опція датчика" },
    ],
    smartIntegrationHeading: "Розумні опції залежно від проєкту",
    smartIntegrationIntroduction:
      "Ширший каталог GER-LED прямо наводить ці функції як опції. Доступність потрібно підтвердити для моделі та проєкту.",
    smartIntegrationItems: [
      { icon: "camera", label: "IP-камера" },
      { icon: "wireless", label: "3G" },
      { icon: "network", label: "TCP/IP" },
      { icon: "plc", label: "PLC" },
      { icon: "power-dim", label: "Увімк. / Вимк. / Димування" },
      { icon: "environment", label: "Вологість / Температура" },
      { icon: "motion-daylight", label: "Рух / Денне світло" },
      { icon: "fault-monitoring", label: "Зчитування несправностей" },
      { icon: "scenario-control", label: "Сценарне керування" },
    ],
    applicationsHeading: "Типові застосування",
    applications: [
      { icon: "port", title: "Порти", description: "Освітлення портової інфраструктури та прилеглих громадських зон.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-ports.webp`, imageAlt: "Порт, освітлений зовнішнім вуличним освітленням" },
      { icon: "airport", title: "Аеропорти", description: "Освітлення доріг і громадських зон навколо інфраструктури аеропорту.", image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-airports-transport-facilities.webp`, imageAlt: "Транспортний вузол аеропорту, освітлений зовнішнім вуличним освітленням" },
      { icon: "motorway", title: "Автомагістралі", description: "Структуроване високоефективне освітлення для магістралей та основних трас.", image: `${APPLICATION_IMAGE_BASE}/ger-led-street-lighting-road-application.webp`, imageAlt: "Міська дорога, освітлена вуличними світильниками GER-LED" },
      { icon: "parks", title: "Парки та сади", description: "Освітлення громадського простору для ландшафтних парків і садових зон.", image: `${APPLICATION_IMAGE_BASE}/street-lighting-application-parks-gardens.webp`, imageAlt: "Парк, освітлений вуличними світильниками GER-LED" },
      { icon: "residential", title: "Житлові комплекси", description: "Внутрішні дороги, пішохідні зони та місця загального користування в житлових комплексах.", image: `${APPLICATION_IMAGE_BASE}/street-lighting-application-commercial-residential-public-areas.webp`, imageAlt: "Комерційна та житлова громадська зона, освітлена вуличними світильниками GER-LED" },
      { icon: "shopping-centre", title: "Торговельні центри", description: "Освітлення під'їзних доріг і зон циркуляції для торговельних об'єктів.", image: `${APPLICATION_IMAGE_BASE}/wall-washer-application-shopping-commercial-buildings.webp`, imageAlt: "Фасад торговельного об'єкта, освітлений зовнішнім освітленням" },
      { icon: "public-square", title: "Громадські площі", description: "Освітлення міських площ і спільних громадських просторів.", image: `${APPLICATION_IMAGE_BASE}/street-lighting-application-public-squares.webp`, imageAlt: "Громадська площа, освітлена вуличними світильниками GER-LED" },
    ],
    siblingFamiliesHeading: "Інші сімейства розумного освітлення",
    siblingViewSeriesLabel: "Переглянути серію",
    currentFamilyBadgeLabel: "Поточне сімейство",
    siblingFamilies: [
      {
        slug: "g-bus-plc-automation",
        name: "G-BUS PLC Automation",
        subtitle: "Автоматизація Powerline · 17 кодованих позицій",
        href: "/products/led-systems/smart-lighting-automation/g-bus-plc-automation",
      },
      {
        slug: "ger-led-smart-street-lighting",
        name: "GER-LED Smart Street Lighting",
        subtitle: "35–250 Вт · Вбудована камера 360°",
        isCurrent: true,
      },
    ],
    supportCta: {
      title: "Плануєте проєкт розумного вуличного освітлення?",
      description: "Запросіть підтримку щодо моделі, камери, керування, фотометрії та проєктних опцій зв’язку.",
      action: "Запросити технічну підтримку",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function gerLedSmartStreetLightingContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

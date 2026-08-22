import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSystemComponent } from "../types";

const ASSET_BASE = "/assets/products/led-lighting/series/g-bus-plc-automation";
const COMPONENT_BASE = `${ASSET_BASE}/components`;
const CATEGORY_ASSET_BASE = "/assets/products/led-lighting/category/smart-lighting&automation";
const APPLICATION_ASSET_BASE = `${CATEGORY_ASSET_BASE}/applications`;

// Prepared studio/cutout assets (real photography, no low-res clip-art
// render or reused generic factory-floor stock photo like the original
// series-folder hero pair) — same G-BUS receiver module shown open on the
// series card, plus a dedicated control-room background.
export const G_BUS_PLC_AUTOMATION_HERO_IMAGE = `${CATEGORY_ASSET_BASE}/product/smart-lighting-automation-control-module-hero-product-transparent.webp`;
export const G_BUS_PLC_AUTOMATION_HERO_BACKGROUND = `${CATEGORY_ASSET_BASE}/product/smart-lighting-automation-control-module-hero-background.webp`;

const COMPONENTS_UK: readonly LedSystemComponent[] = [
  {
    code: "730-RCV",
    category: "Receiver modules",
    description: "G-Bus Automation Receiver Module (On/Off)",
    image: `${COMPONENT_BASE}/receiver-input-module.webp`,
    imageAlt: "G-BUS receiver/input module catalogue thumbnail",
  },
  {
    code: "730-RCVRM",
    category: "Receiver modules",
    description: "G-Bus Automation Receiver DIN Rail Module (On/Off)",
    image: `${COMPONENT_BASE}/receiver-din-rail-module.webp`,
    imageAlt: "G-BUS DIN-rail receiver module catalogue thumbnail",
  },
  {
    code: "730-TRM",
    category: "Transmitter modules",
    description: "G-Bus Automation Transmitter Module",
    image: `${COMPONENT_BASE}/transmitter-rs485-dim-module.webp`,
    imageAlt: "G-BUS transmitter module catalogue thumbnail",
  },
  {
    code: "730-TRMRM",
    category: "Transmitter modules",
    description: "G-Bus Automation Transmitter DIN Rail Module",
    image: `${COMPONENT_BASE}/transmitter-din-rail-module.webp`,
    imageAlt: "G-BUS DIN-rail transmitter module catalogue thumbnail",
  },
  {
    code: "730-GBUSKP7",
    category: "Control interfaces",
    description: 'G-Bus Automation 7" TFT Touch Control Panel',
    image: `${COMPONENT_BASE}/tft-touch-panel-display.webp`,
    imageAlt: "G-BUS 7-inch TFT touch control panel catalogue thumbnail",
  },
  {
    code: "730-GBUSTP7",
    category: "Control interfaces",
    description: 'G-Bus Automation 7" Tablet Control Panel',
    image: `${COMPONENT_BASE}/tablet-control-panel.webp`,
    imageAlt: "G-BUS 7-inch tablet control panel catalogue thumbnail",
  },
  {
    code: "730-GBUSPLADP",
    category: "Powerline adapters",
    description: "G-Bus Powerline Network Adapter",
    image: `${COMPONENT_BASE}/powerline-network-adapter.webp`,
    imageAlt: "G-BUS powerline network adapter catalogue thumbnail",
  },
  {
    code: "730-GBUSPLADPRM",
    category: "Powerline adapters",
    description: "G-Bus Powerline DIN Rail Network Adapter",
    image: `${COMPONENT_BASE}/powerline-din-rail-network-adapter.webp`,
    imageAlt: "G-BUS DIN-rail powerline network adapter catalogue thumbnail",
  },
  {
    code: "730-INP",
    category: "Input & communication",
    description: "G-Bus Automation Input Module",
    image: `${COMPONENT_BASE}/receiver-input-module.webp`,
    imageAlt: "G-BUS input module catalogue thumbnail",
  },
  {
    code: "730-RCV485",
    category: "Input & communication",
    description: "G-Bus Automation RS485 Receiver Module",
    image: `${COMPONENT_BASE}/transmitter-rs485-dim-module.webp`,
    imageAlt: "G-BUS RS485 receiver module catalogue thumbnail",
  },
  {
    code: "730-DIM",
    category: "Lighting control",
    description: "G-Bus Automation DIM Ballast Control Module",
    image: `${COMPONENT_BASE}/transmitter-rs485-dim-module.webp`,
    imageAlt: "G-BUS DIM ballast control module catalogue thumbnail",
  },
  {
    code: "730-GBUSPC",
    category: "Computers & software",
    description: "G-Bus Automation Control PC",
    image: `${COMPONENT_BASE}/control-pc.webp`,
    imageAlt: "G-BUS control PC catalogue thumbnail",
  },
  {
    code: "730-GIS",
    category: "Sensors",
    description: "Daylight Sensor (OSRAM)",
    image: `${COMPONENT_BASE}/daylight-motion-sensor.webp`,
    imageAlt: "G-BUS daylight sensor catalogue thumbnail",
  },
  {
    code: "730-HS",
    category: "Sensors",
    description: "Move Sensor (OSRAM)",
    image: `${COMPONENT_BASE}/daylight-motion-sensor.webp`,
    imageAlt: "G-BUS motion sensor catalogue thumbnail",
  },
  {
    code: "730-GBUSTP7SW",
    category: "Computers & software",
    description: 'G-Bus Automation 7" TFT Touch Tablet PC Software',
  },
  {
    code: "730-GBUSPCSW",
    category: "Computers & software",
    description: "G-Bus Automation PC Control Software",
  },
  {
    code: "730-GBUSTDE",
    category: "Services",
    description: "Testing, Commissioning and Training — per day (accommodation and travel excluded)",
  },
] as const;

const COMPONENTS_UA: readonly LedSystemComponent[] = COMPONENTS_UK.map((item) => ({
  ...item,
  category:
    {
      "Receiver modules": "Приймальні модулі",
      "Transmitter modules": "Передавальні модулі",
      "Control interfaces": "Інтерфейси керування",
      "Powerline adapters": "Адаптери Powerline",
      "Input & communication": "Входи та зв’язок",
      "Lighting control": "Керування освітленням",
      "Computers & software": "Комп’ютери та ПЗ",
      Sensors: "Датчики",
      Services: "Послуги",
    }[item.category] ?? item.category,
})) as readonly LedSystemComponent[];

const content = {
  uk: {
    metadata: {
      title: "G-BUS PLC Automation | Smart Lighting & Automation | LED Systems | InfraVolt",
      description:
        "G-BUS PLC Automation — catalogue-verified powerline communication, control interfaces, DIN-rail modules, sensors and central control components.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      category: "Smart Lighting & Automation",
      current: "G-BUS PLC Automation",
    },
    backToCategoryLabel: "Back to Smart Lighting & Automation",
    hero: {
      eyebrow: "AUTOMATION & CONTROL SYSTEM",
      category: "Smart Lighting & Automation",
      title: "G-BUS PLC Automation",
      description:
        "A busbar-integrated automation system that carries two-way control and feedback over the power line, linking addressed receivers, transmitters, control interfaces, sensors and central software without a separate data cable.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    heroImage: G_BUS_PLC_AUTOMATION_HERO_IMAGE,
    heroImageAlt: "G-BUS receiver module housing opened to show the internal control electronics",
    heroBackgroundImage: G_BUS_PLC_AUTOMATION_HERO_BACKGROUND,
    heroBackgroundImageAlt: "Electrical control room with rack cabinets and a G-BUS control module, street lighting visible through the window",
    technicalInformationHeading: "Technical Information",
    technicalInformation: [
      {
        icon: "communication",
        title: "Communication",
        values: [
          { label: "Protocol", value: "Power Line Communication" },
          { label: "Direction", value: "Two-way communication" },
          { label: "Data Cabling", value: "No additional network line" },
        ],
      },
      {
        icon: "control-system",
        title: "Control Functions",
        values: [
          { label: "Switching", value: "On / Off" },
          { label: "Lighting", value: "Dimming" },
          { label: "Equipment", value: "Motor · Contactor · Circuit breaker" },
        ],
      },
      {
        icon: "integration",
        title: "System Integration",
        values: [
          { label: "Busbar Families", value: "GNL · GL · GGD · GS" },
          { label: "System Range", value: "25–6000 A busbar compatibility" },
          { label: "Mounting", value: "DIN rail · Main board · Tap-off box" },
        ],
      },
      {
        icon: "monitoring",
        title: "Monitoring & Access",
        values: [
          { label: "Feedback", value: "Temperature · Humidity · Electrical values" },
          { label: "Access", value: "Local network or internet" },
          { label: "Interfaces", value: 'PC · 7" TFT · 7" tablet' },
        ],
      },
    ],
    technicalAssurance: [],
    sourceNote:
      "The catalogue gives no per-module voltage, IP/IK rating, dimensions or weight. The 25–6000 A figure is system-level busbar compatibility, not a module current rating.",
    keyCapabilitiesHeading: "System Architecture / Key Capabilities",
    keyCapabilitiesIntroduction:
      "Catalogue-supported system functions only; final architecture and component selection depend on the connected busbar and controlled loads.",
    keyCapabilities: [
      {
        icon: "network",
        title: "Powerline Communication",
        description: "Transmitters and addressed receivers exchange control and feedback over the existing power conductors.",
      },
      {
        icon: "power-dim",
        title: "Switching & Dimming",
        description: "Catalogue functions include on/off control and DIM ballast lighting control.",
      },
      {
        icon: "motion-daylight",
        title: "Sensor Integration",
        description: "Stock-coded daylight and motion sensors are listed as system components.",
      },
      {
        icon: "fault-monitoring",
        title: "Central Feedback",
        description: "The system can return temperature, humidity and electrical measurement information to central software.",
      },
    ],
    modelsHeading: "Models & Components",
    modelsIntroduction:
      "All 17 stock-coded hardware, software, sensor and service entries shown in the G-BUS catalogue component table.",
    componentSchedule: {
      codeColumnLabel: "Stock Code",
      componentColumnLabel: "Catalogue Description",
      categoryColumnLabel: "Component Group",
      items: COMPONENTS_UK,
    },
    modelsNote:
      "The catalogue reuses thumbnails for 730-RCV / 730-INP, 730-TRM / 730-RCV485 / 730-DIM, and 730-GIS / 730-HS. Codes and descriptions above follow the printed stock-code table exactly.",
    controlsHeading: "Controls & Communication",
    controlsIntroduction:
      "The G-BUS control chain combines powerline transmitters and addressed receivers with local or networked user interfaces.",
    controlsGroupLabel: "Control Functions",
    controlOptions: [
      { icon: "control-plc", label: "Power Line Communication" },
      { icon: "control-signal", label: "On / Off Switching" },
      { icon: "control-dimmer", label: "DIM Ballast Control" },
      { icon: "control-sensor", label: "Daylight & Motion Sensors" },
    ],
    smartIntegrationHeading: "Central Communication",
    smartIntegrationIntroduction:
      "Catalogue architecture shows PC software, server connection, local-network or internet access, touch interfaces and RS485 receiving.",
    smartIntegrationItems: [
      { icon: "network", label: "Local Network / Internet" },
      { icon: "plc", label: "Central Control Software" },
      { icon: "wireless", label: '7" TFT / Tablet Interfaces' },
      { icon: "fault-monitoring", label: "Electrical & Environmental Feedback" },
    ],
    applicationsHeading: "Typical Applications",
    applicationImage: G_BUS_PLC_AUTOMATION_HERO_BACKGROUND,
    applicationImageAlt: "Automotive production facility used as the G-BUS catalogue application example",
    applications: [
      { icon: "industrial-facility", title: "Industrial Facilities", image: `${APPLICATION_ASSET_BASE}/industrial-facilities-application.webp`, imageAlt: "Automotive production line used as the G-BUS catalogue industrial-facility application" },
      { icon: "busbar-distribution", title: "Automated Busbar Distribution", image: `${APPLICATION_ASSET_BASE}/automated-busbar-distribution-application.webp`, imageAlt: "Industrial ceiling busbar power distribution track with integrated linear LED lighting" },
      { icon: "lighting-control", title: "Central Lighting Control", image: `${APPLICATION_ASSET_BASE}/central-lighting-control-application.webp`, imageAlt: "Wall-mounted central lighting control panel in an office corridor" },
      { icon: "network-monitoring", title: "Electrical & Environmental Monitoring", image: `${APPLICATION_ASSET_BASE}/smart-lighting-automation-electrical-environmental-monitoring-application.webp`, imageAlt: "Industrial plant electrical panel with a monitoring dashboard showing voltage, energy, temperature and humidity" },
    ],
    siblingFamiliesHeading: "Other Smart Lighting Families",
    siblingViewSeriesLabel: "View Series",
    currentFamilyBadgeLabel: "Current family",
    siblingFamilies: [
      {
        slug: "g-bus-plc-automation",
        name: "G-BUS PLC Automation",
        subtitle: "Powerline automation · 17 stock-coded entries",
        isCurrent: true,
      },
      {
        slug: "ger-led-smart-street-lighting",
        name: "GER-LED Smart Street Lighting",
        subtitle: "35–250 W · Integrated 360° camera",
        href: "/products/led-systems/smart-lighting-automation/ger-led-smart-street-lighting",
      },
    ],
    supportCta: {
      title: "Planning a G-BUS automation system?",
      description:
        "Request technical support for busbar compatibility, component selection, control interfaces, sensing and system architecture.",
      action: "Request Technical Support",
    },
  },
  ua: {
    metadata: {
      title: "Автоматизація G-BUS PLC | Розумне освітлення та автоматизація | LED-системи | InfraVolt",
      description:
        "Автоматизація G-BUS PLC — перевірені каталогом компоненти зв’язку через силову лінію, DIN-модулі, панелі керування, датчики та централізоване керування.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "LED-системи",
      category: "Розумне освітлення та автоматизація",
      current: "Автоматизація G-BUS PLC",
    },
    backToCategoryLabel: "Назад до розумного освітлення та автоматизації",
    hero: {
      eyebrow: "СИСТЕМА АВТОМАТИЗАЦІЇ ТА КЕРУВАННЯ",
      category: "Розумне освітлення та автоматизація",
      title: "Автоматизація G-BUS PLC",
      description:
        "Інтегрована із шинопроводом система автоматизації для двостороннього керування та зворотного зв’язку через силову лінію між адресними приймачами, передавачами, панелями, датчиками й центральним програмним забезпеченням без окремого кабелю даних.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    heroImage: G_BUS_PLC_AUTOMATION_HERO_IMAGE,
    heroImageAlt: "Відкритий корпус приймального модуля G-BUS із внутрішньою електронікою керування",
    heroBackgroundImage: G_BUS_PLC_AUTOMATION_HERO_BACKGROUND,
    heroBackgroundImageAlt: "Електрична диспетчерська з шафами обладнання та модулем керування G-BUS, за вікном видно вуличне освітлення",
    technicalInformationHeading: "Технічна інформація",
    technicalInformation: [
      {
        icon: "communication",
        title: "Зв’язок",
        values: [
          { label: "Протокол", value: "Power Line Communication" },
          { label: "Напрямок", value: "Двосторонній зв’язок" },
          { label: "Кабель даних", value: "Додаткова мережева лінія не потрібна" },
        ],
      },
      {
        icon: "control-system",
        title: "Функції керування",
        values: [
          { label: "Комутація", value: "Увімкнення / вимкнення" },
          { label: "Освітлення", value: "Димування" },
          { label: "Обладнання", value: "Двигун · Контактор · Вимикач" },
        ],
      },
      {
        icon: "integration",
        title: "Інтеграція системи",
        values: [
          { label: "Серії шинопроводів", value: "GNL · GL · GGD · GS" },
          { label: "Системний діапазон", value: "Сумісність 25–6000 A" },
          { label: "Монтаж", value: "DIN-рейка · Головний щит · Відгалужувальна коробка" },
        ],
      },
      {
        icon: "monitoring",
        title: "Моніторинг і доступ",
        values: [
          { label: "Зворотний зв’язок", value: "Температура · Вологість · Електричні значення" },
          { label: "Доступ", value: "Локальна мережа або інтернет" },
          { label: "Інтерфейси", value: 'ПК · 7" TFT · 7" планшет' },
        ],
      },
    ],
    technicalAssurance: [],
    sourceNote:
      "Каталог не наводить напругу, IP/IK, розміри чи вагу окремих модулів. 25–6000 A — сумісність системи шинопроводів, а не номінальний струм модуля.",
    keyCapabilitiesHeading: "Архітектура системи / ключові можливості",
    keyCapabilitiesIntroduction:
      "Лише функції, підтверджені каталогом; остаточна архітектура залежить від шинопроводу та керованих навантажень.",
    keyCapabilities: [
      {
        icon: "network",
        title: "Зв’язок через силову лінію",
        description: "Передавачі й адресні приймачі обмінюються командами та даними через силові провідники.",
      },
      {
        icon: "power-dim",
        title: "Комутація та димування",
        description: "Каталог підтримує увімкнення/вимкнення та керування DIM-баластом.",
      },
      {
        icon: "motion-daylight",
        title: "Інтеграція датчиків",
        description: "У таблиці компонентів наведені датчики денного світла й руху з окремими кодами.",
      },
      {
        icon: "fault-monitoring",
        title: "Центральний зворотний зв’язок",
        description: "До центрального ПЗ можуть передаватися температура, вологість та електричні вимірювання.",
      },
    ],
    modelsHeading: "Моделі та компоненти",
    modelsIntroduction: "Усі 17 позицій обладнання, ПЗ, датчиків і послуг із таблиці компонентів G-BUS.",
    componentSchedule: {
      codeColumnLabel: "Код",
      componentColumnLabel: "Опис у каталозі",
      categoryColumnLabel: "Група компонентів",
      items: COMPONENTS_UA,
    },
    modelsNote:
      "У каталозі повторно використані зображення для 730-RCV / 730-INP, 730-TRM / 730-RCV485 / 730-DIM і 730-GIS / 730-HS. Коди збережено точно.",
    controlsHeading: "Керування та зв’язок",
    controlsIntroduction:
      "Ланцюг G-BUS поєднує передавачі й адресні приймачі Powerline з локальними та мережевими інтерфейсами.",
    controlsGroupLabel: "Функції керування",
    controlOptions: [
      { icon: "control-plc", label: "Power Line Communication" },
      { icon: "control-signal", label: "Увімкнення / вимкнення" },
      { icon: "control-dimmer", label: "Керування DIM-баластом" },
      { icon: "control-sensor", label: "Датчики світла та руху" },
    ],
    smartIntegrationHeading: "Центральний зв’язок",
    smartIntegrationIntroduction:
      "Архітектура каталогу показує ПЗ для ПК, сервер, доступ через локальну мережу або інтернет, сенсорні панелі та RS485.",
    smartIntegrationItems: [
      { icon: "network", label: "Локальна мережа / інтернет" },
      { icon: "plc", label: "Центральне ПЗ керування" },
      { icon: "wireless", label: '7" TFT / планшет' },
      { icon: "fault-monitoring", label: "Електричний та екологічний зворотний зв’язок" },
    ],
    applicationsHeading: "Типові застосування",
    applicationImage: G_BUS_PLC_AUTOMATION_HERO_BACKGROUND,
    applicationImageAlt: "Автомобільне виробництво як приклад застосування G-BUS у каталозі",
    applications: [
      { icon: "industrial-facility", title: "Промислові об’єкти", image: `${APPLICATION_ASSET_BASE}/industrial-facilities-application.webp`, imageAlt: "Автомобільна виробнича лінія — приклад промислового застосування G-BUS" },
      { icon: "busbar-distribution", title: "Автоматизований шинопровідний розподіл", image: `${APPLICATION_ASSET_BASE}/automated-busbar-distribution-application.webp`, imageAlt: "Промислова стельова шина розподілу живлення з інтегрованим лінійним LED-освітленням" },
      { icon: "lighting-control", title: "Центральне керування освітленням", image: `${APPLICATION_ASSET_BASE}/central-lighting-control-application.webp`, imageAlt: "Настінна панель централізованого керування освітленням в офісному коридорі" },
      { icon: "network-monitoring", title: "Моніторинг електричних та екологічних значень", image: `${APPLICATION_ASSET_BASE}/smart-lighting-automation-electrical-environmental-monitoring-application.webp`, imageAlt: "Електрична панель промислового об'єкта з панеллю моніторингу напруги, енергії, температури та вологості" },
    ],
    siblingFamiliesHeading: "Інші сімейства розумного освітлення",
    siblingViewSeriesLabel: "Переглянути серію",
    currentFamilyBadgeLabel: "Поточне сімейство",
    siblingFamilies: [
      {
        slug: "g-bus-plc-automation",
        name: "G-BUS PLC Automation",
        subtitle: "Автоматизація Powerline · 17 кодованих позицій",
        isCurrent: true,
      },
      {
        slug: "ger-led-smart-street-lighting",
        name: "GER-LED Smart Street Lighting",
        subtitle: "35–250 Вт · Вбудована камера 360°",
        href: "/products/led-systems/smart-lighting-automation/ger-led-smart-street-lighting",
      },
    ],
    supportCta: {
      title: "Плануєте систему автоматизації G-BUS?",
      description: "Запросіть підтримку щодо сумісності шинопроводів, компонентів, панелей, датчиків та архітектури.",
      action: "Запросити технічну підтримку",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedSeriesDetailContent>>;

export function gBusPlcAutomationContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return content[market];
}

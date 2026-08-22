import type { BusbarHeroImage } from "@/data/products/busbar/series/types";
import type { MarketCode } from "@/modules/markets/types";

const IMAGE_BASE = "/assets/products/g-bus";

export type GBusModuleItem = Readonly<{
  name: string;
  stockCode: string;
  image?: string;
  imageAlt?: string;
}>;

export type GBusCompatibleSystem = Readonly<{
  name: string;
  slug: string;
  description: string;
}>;

export type GBusApplication = Readonly<{
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}>;

export type GBusDocument = Readonly<{
  title: string;
  description: string;
  fileLabel: string;
  href: string;
  downloadLabel: string;
}>;

export type GBusFact = Readonly<{
  value: string;
  label: string;
}>;

export type GBusPageContent = Readonly<{
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  breadcrumbs: Readonly<{
    home: string;
    current: string;
  }>;
  hero: Readonly<{
    eyebrow: string;
    heading: string;
    description: string;
    image: string;
    imageAlt: string;
    actionLabel: string;
    actionHref: string;
  }>;
  facts: readonly [GBusFact, GBusFact, GBusFact, GBusFact];
  overviewEyebrow: string;
  overviewHeading: string;
  overviewDescription: string;
  overviewHighlights: readonly string[];
  heroImages: readonly BusbarHeroImage[];
  heroPreviousLabel: string;
  heroNextLabel: string;
  heroGalleryLabel: string;
  heroFullscreenLabel: string;
  heroCloseLabel: string;
  modulesEyebrow: string;
  modulesHeading: string;
  modulesDescription: string;
  modules: readonly GBusModuleItem[];
  documentsTabLabel: string;
  documents: readonly GBusDocument[];
  compatibleEyebrow: string;
  compatibleHeading: string;
  compatibleDescription: string;
  compatibleSystems: readonly GBusCompatibleSystem[];
  applicationsEyebrow: string;
  applicationsHeading: string;
  applicationsDescription: string;
  applications: readonly GBusApplication[];
  projectSupport: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    action: string;
    href: string;
  }>;
}>;

const GBUS_CONTENT = {
  uk: {
    metadata: {
      title: "G-BUS Automation | InfraVolt",
      description:
        "G-BUS is Gersan's power-line automation and monitoring layer for compatible busbar systems, with remote monitoring, control and scheduling.",
    },
    breadcrumbs: {
      home: "Home",
      current: "G-BUS Automation",
    },
    hero: {
      eyebrow: "SMART AUTOMATION",
      heading: "Monitor and control your busbar network with G-BUS",
      description:
        "G-BUS is Gersan's automation and monitoring layer for compatible busbar systems—bringing visibility, control and intelligence to your power distribution network, communicating over the busbar itself with no separate data cable required.",
      image: `${IMAGE_BASE}/g-bus-automation-showcase.png`,
      imageAlt:
        "G-BUS Automation showcase with receiver modules, control panels and monitoring dashboard overlays",
      actionLabel: "Talk to our team",
      actionHref: "/contact?type=project&system=g-bus",
    },
    facts: [
      { value: "25–6000 A", label: "System compatibility" },
      { value: "4", label: "Compatible busbar systems" },
      { value: "17", label: "Modules & components" },
      { value: "Power-line", label: "Communication method" },
    ],
    overviewEyebrow: "Overview",
    overviewHeading: "How it works",
    overviewDescription:
      "G-BUS carries control and monitoring signals over the busbar's own power line, connecting a transmitter unit to pre-addressed receiver modules—no separate data cable required.",
    overviewHighlights: [
      "Transmitter unit isolates and connects your local network or server to the busbar's power line",
      "Control and monitoring data travels over the busbar's power line itself",
      "Pre-addressed receiver modules at the main board or tap-off boxes switch, dim and control connected loads",
      "Access the system from a local network or the internet, using G-BUS software on a PC, touch panel or tablet",
      "Zone-based control software groups receivers and devices by area—production, offices, lighting or parking",
      "Functions include on/off switching, dimming, motor/contactor/switch control and feedback such as temperature, humidity and electrical values",
    ],
    heroImages: [
      {
        image: `${IMAGE_BASE}/g-bus-software-interface.webp`,
        imageAlt:
          "G-BUS control software interface showing zone-based device grouping and control",
        label: "Control software",
        fit: "contain",
      },
      {
        image: `${IMAGE_BASE}/g-bus-automotive-factory-application.webp`,
        imageAlt: "G-BUS automation deployed above an automotive production line",
        label: "Automotive facility",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/g-bus-smart-receiver-cutaway.webp`,
        imageAlt: "G-BUS receiver module, cutaway product view",
        label: "Receiver module",
        fit: "contain",
      },
      {
        image: `${IMAGE_BASE}/g-bus-factory-floor-safety-lines.webp`,
        imageAlt: "Industrial factory floor with yellow safety lines",
        label: "Industrial facility",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/g-bus-assembly-line-rail-system.png`,
        imageAlt: "G-BUS receiver module mounted on an assembly line rail system",
        label: "Assembly line installation",
        fit: "cover",
      },
    ],
    heroPreviousLabel: "Previous image",
    heroNextLabel: "Next image",
    heroGalleryLabel: "G-BUS product gallery",
    heroFullscreenLabel: "View full screen",
    heroCloseLabel: "Close full-screen image",
    modulesEyebrow: "Modules & components",
    modulesHeading: "G-BUS modules, panels and sensors",
    modulesDescription:
      "Receiver and transmitter modules, control interfaces, power-line adapters, sensors, control software and commissioning services.",
    modules: [
      {
        name: "Receiver Module (On/Off)",
        stockCode: "730-RCV",
        image: `${IMAGE_BASE}/g-bus-receiver-input-module.webp`,
        imageAlt: "G-BUS receiver module",
      },
      {
        name: "Receiver DIN Rail Module (On/Off)",
        stockCode: "730-RCVRM",
        image: `${IMAGE_BASE}/g-bus-receiver-din-rail-module.webp`,
        imageAlt: "G-BUS DIN rail receiver module",
      },
      {
        name: "Transmitter Module",
        stockCode: "730-TRM",
        image: `${IMAGE_BASE}/g-bus-transmitter-rs485-dim-module.webp`,
        imageAlt: "G-BUS transmitter module",
      },
      {
        name: "Transmitter DIN Rail Module",
        stockCode: "730-TRMRM",
        image: `${IMAGE_BASE}/g-bus-transmitter-din-rail-module.webp`,
        imageAlt: "G-BUS DIN rail transmitter module",
      },
      {
        name: "TFT Touch Control Panel (7\")",
        stockCode: "730-GBUSKP7",
        image: `${IMAGE_BASE}/g-bus-tft-touch-panel.webp`,
        imageAlt: "G-BUS 7 inch TFT touch control panel",
      },
      {
        name: "Tablet Control Panel (7\")",
        stockCode: "730-GBUSTP7",
        image: `${IMAGE_BASE}/g-bus-tablet-control-panel.webp`,
        imageAlt: "G-BUS 7 inch tablet control panel",
      },
      {
        name: "Powerline Network Adapter",
        stockCode: "730-GBUSPLADP",
        image: `${IMAGE_BASE}/g-bus-powerline-network-adapter.webp`,
        imageAlt: "G-BUS powerline ethernet adapter",
      },
      {
        name: "Powerline DIN Rail Network Adapter",
        stockCode: "730-GBUSPLADPRM",
        image: `${IMAGE_BASE}/g-bus-powerline-din-rail-network-adapter.webp`,
        imageAlt: "G-BUS DIN rail powerline ethernet adapter",
      },
      {
        name: "Automation Input Module",
        stockCode: "730-INP",
        image: `${IMAGE_BASE}/g-bus-receiver-input-module.webp`,
        imageAlt: "G-BUS automation input module",
      },
      {
        name: "RS485 Receiver Module",
        stockCode: "730-RCV485",
        image: `${IMAGE_BASE}/g-bus-transmitter-rs485-dim-module.webp`,
        imageAlt: "G-BUS RS485 receiver module",
      },
      {
        name: "DIM Ballast Control Module",
        stockCode: "730-DIM",
        image: `${IMAGE_BASE}/g-bus-transmitter-rs485-dim-module.webp`,
        imageAlt: "G-BUS DIM ballast control module",
      },
      {
        name: "Automation Control PC",
        stockCode: "730-GBUSPC",
        image: `${IMAGE_BASE}/g-bus-control-pc.webp`,
        imageAlt: "G-BUS automation control PC",
      },
      {
        name: "Daylight Sensor (OSRAM)",
        stockCode: "730-GIS",
        image: `${IMAGE_BASE}/g-bus-daylight-motion-sensor.webp`,
        imageAlt: "G-BUS daylight sensor",
      },
      {
        name: "Motion Sensor (OSRAM)",
        stockCode: "730-HS",
        image: `${IMAGE_BASE}/g-bus-daylight-motion-sensor.webp`,
        imageAlt: "G-BUS motion sensor",
      },
      {
        name: "TFT Touch Tablet PC Software",
        stockCode: "730-GBUSTP7SW",
      },
      {
        name: "PC Control Software",
        stockCode: "730-GBUSPCSW",
      },
      {
        name: "Testing, Commissioning and Training (per day)",
        stockCode: "730-GBUSTDE",
      },
    ],
    documentsTabLabel: "Documentation",
    documents: [
      {
        title: "G-BUS Automation Catalogue",
        description:
          "Dedicated G-BUS product catalogue covering modules, control interfaces, wiring topologies and stock codes.",
        fileLabel: "PDF · 11.1 MB",
        href: "/assets/documents/g-bus/g-bus.pdf",
        downloadLabel: "Download catalogue",
      },
      {
        title: "Gersan Busbar Systems Catalogue",
        description:
          "Full product catalogue covering the G-BUS automation system alongside Gersan's busbar trunking systems, including stock codes and system diagrams.",
        fileLabel: "PDF · 25.1 MB",
        href: "/assets/documents/busbar/gersan-busbar-systems-catalogue.pdf",
        downloadLabel: "Download catalogue",
      },
    ],
    compatibleEyebrow: "Compatibility",
    compatibleHeading: "Compatible busbar systems",
    compatibleDescription:
      "G-BUS is compatible with selected Gersan busbar systems across the 25–6000 A range.",
    compatibleSystems: [
      {
        name: "GNL Lighting Busbar",
        slug: "gnl-lighting-busbar",
        description: "25–40 A lighting busbar trunking system.",
      },
      {
        name: "GL Lighting Busbar",
        slug: "gl-lighting-busbar",
        description: "40–100 A lighting busbar trunking system.",
      },
      {
        name: "GGD Medium Power Busbar",
        slug: "ggd-medium-power-busbar",
        description: "160–1000 A power distribution busbar system.",
      },
      {
        name: "GS Super Compact",
        slug: "gs-super-compact",
        description: "400–6300 A high-current busbar trunking system.",
      },
    ],
    applicationsEyebrow: "Applications",
    applicationsHeading: "Where G-BUS is used",
    applicationsDescription:
      "G-BUS adds remote monitoring, control and scheduling wherever a compatible busbar network distributes power.",
    applications: [
      {
        slug: "industrial-facilities",
        title: "Large industrial facilities",
        description:
          "Zone-based switching and monitoring for production lines and high-ceiling industrial facilities.",
        image: `${IMAGE_BASE}/g-bus-automotive-factory-application.webp`,
        imageAlt: "G-BUS automation deployed above an automotive production line",
      },
      {
        slug: "commercial-buildings",
        title: "Commercial Buildings",
        description:
          "Remote lighting and load control for offices, retail units and mixed-use commercial interiors.",
        image: "/assets/industries/cards/commercial-buildings.webp",
        imageAlt: "Illuminated commercial office towers at dusk",
      },
      {
        slug: "data-centres",
        title: "Data centres",
        description:
          "Continuous measurement and remote control of critical power distribution circuits.",
        image: "/assets/industries/cards/data-centres.webp",
        imageAlt: "Data centre server room with rows of server racks",
      },
      {
        slug: "warehouses-logistics",
        title: "Warehouses & Logistics",
        description:
          "Scheduled lighting and load switching above storage aisles and logistics operations.",
        image: "/assets/products/busbar/applications/busbar-application-warehouse.webp",
        imageAlt:
          "Industrial warehouse with continuous overhead lighting above storage and logistics areas",
      },
      {
        slug: "infrastructure-utilities",
        title: "Infrastructure & Utilities",
        description:
          "Remote monitoring and switching for utility plants and other essential-service facilities.",
        image: "/assets/industries/cards/infrastructure-utilities.webp",
        imageAlt: "Industrial utility plant with pumps and piping",
      },
    ],
    projectSupport: {
      eyebrow: "Engineering support",
      title: "Not sure if G-BUS fits your project?",
      description:
        "Share your busbar system, site conditions and monitoring requirements with our technical team.",
      action: "Talk to our team",
      href: "/contact?type=project&system=g-bus",
    },
  },
  ua: {
    metadata: {
      title: "G-BUS Automation | InfraVolt",
      description:
        "G-BUS — рівень автоматизації та моніторингу Gersan через енергетичну лінію для сумісних шинопровідних систем, з віддаленим моніторингом, керуванням та плануванням.",
    },
    breadcrumbs: {
      home: "Головна",
      current: "G-BUS Automation",
    },
    hero: {
      eyebrow: "РОЗУМНА АВТОМАТИЗАЦІЯ",
      heading: "Моніторинг і керування шинопроводом за допомогою G-BUS",
      description:
        "G-BUS — це рівень автоматизації та моніторингу Gersan для сумісних шинопровідних систем, що надає видимість, керування та інтелектуальні можливості вашій мережі розподілу живлення, використовуючи сам шинопровід для передачі даних без окремого кабелю.",
      image: `${IMAGE_BASE}/g-bus-automation-showcase.png`,
      imageAlt:
        "Вітрина G-BUS Automation з приймальними модулями, панелями керування та накладками моніторингу",
      actionLabel: "Зв'язатися з нашою командою",
      actionHref: "/contact?type=project&system=g-bus",
    },
    facts: [
      { value: "25–6000 А", label: "Сумісність систем" },
      { value: "4", label: "Сумісні шинопровідні системи" },
      { value: "17", label: "Модулі та компоненти" },
      { value: "Powerline", label: "Спосіб передачі даних" },
    ],
    overviewEyebrow: "Огляд",
    overviewHeading: "Як це працює",
    overviewDescription:
      "G-BUS передає сигнали керування та моніторингу через саму енергетичну лінію шинопроводу, з'єднуючи передавач із попередньо адресованими приймальними модулями — без окремого кабелю передачі даних.",
    overviewHighlights: [
      "Передавач забезпечує ізоляцію та підключення локальної мережі або сервера до енергетичної лінії шинопроводу",
      "Дані керування та моніторингу передаються через саму енергетичну лінію шинопроводу",
      "Попередньо адресовані приймальні модулі на головному щиті або у відгалужувальних коробках перемикають, димують та керують під'єднаними навантаженнями",
      "Доступ до системи через локальну мережу або інтернет, за допомогою програмного забезпечення G-BUS на ПК, сенсорній панелі або планшеті",
      "Програмне забезпечення для керування за зонами групує приймачі та пристрої за ділянками — виробництво, офіси, освітлення чи паркінг",
      "Функції: увімкнення/вимкнення, димування, керування двигуном/контактором/вимикачем та зворотний зв'язок — температура, вологість, електричні значення",
    ],
    heroImages: [
      {
        image: `${IMAGE_BASE}/g-bus-software-interface.webp`,
        imageAlt:
          "Інтерфейс програмного забезпечення G-BUS із групуванням пристроїв за зонами",
        label: "Програмне забезпечення",
        fit: "contain",
      },
      {
        image: `${IMAGE_BASE}/g-bus-automotive-factory-application.webp`,
        imageAlt: "G-BUS автоматизація над виробничою лінією автомобільного заводу",
        label: "Автомобільний завод",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/g-bus-smart-receiver-cutaway.webp`,
        imageAlt: "Приймальний модуль G-BUS, розріз продукту",
        label: "Приймальний модуль",
        fit: "contain",
      },
      {
        image: `${IMAGE_BASE}/g-bus-factory-floor-safety-lines.webp`,
        imageAlt: "Промислова заводська підлога з жовтою розміткою безпеки",
        label: "Промисловий об'єкт",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/g-bus-assembly-line-rail-system.png`,
        imageAlt: "Приймальний модуль G-BUS на рейковій системі складальної лінії",
        label: "Монтаж на складальній лінії",
        fit: "cover",
      },
    ],
    heroPreviousLabel: "Попереднє зображення",
    heroNextLabel: "Наступне зображення",
    heroGalleryLabel: "Галерея продукції G-BUS",
    heroFullscreenLabel: "Переглянути на весь екран",
    heroCloseLabel: "Закрити повноекранне зображення",
    modulesEyebrow: "Модулі та компоненти",
    modulesHeading: "Модулі, панелі та сенсори G-BUS",
    modulesDescription:
      "Приймальні та передавальні модулі, панелі керування, powerline адаптери, сенсори, програмне забезпечення та послуги введення в експлуатацію.",
    modules: [
      {
        name: "Приймальний модуль (On/Off)",
        stockCode: "730-RCV",
        image: `${IMAGE_BASE}/g-bus-receiver-input-module.webp`,
        imageAlt: "Приймальний модуль G-BUS",
      },
      {
        name: "Приймальний ray-модуль (On/Off)",
        stockCode: "730-RCVRM",
        image: `${IMAGE_BASE}/g-bus-receiver-din-rail-module.webp`,
        imageAlt: "Приймальний DIN ray модуль G-BUS",
      },
      {
        name: "Передавальний модуль",
        stockCode: "730-TRM",
        image: `${IMAGE_BASE}/g-bus-transmitter-rs485-dim-module.webp`,
        imageAlt: "Передавальний модуль G-BUS",
      },
      {
        name: "Передавальний DIN ray модуль",
        stockCode: "730-TRMRM",
        image: `${IMAGE_BASE}/g-bus-transmitter-din-rail-module.webp`,
        imageAlt: "Передавальний DIN ray модуль G-BUS",
      },
      {
        name: "Сенсорна TFT панель керування (7\")",
        stockCode: "730-GBUSKP7",
        image: `${IMAGE_BASE}/g-bus-tft-touch-panel.webp`,
        imageAlt: "7-дюймова сенсорна TFT панель керування G-BUS",
      },
      {
        name: "Планшетна панель керування (7\")",
        stockCode: "730-GBUSTP7",
        image: `${IMAGE_BASE}/g-bus-tablet-control-panel.webp`,
        imageAlt: "7-дюймова планшетна панель керування G-BUS",
      },
      {
        name: "Powerline Ethernet адаптер",
        stockCode: "730-GBUSPLADP",
        image: `${IMAGE_BASE}/g-bus-powerline-network-adapter.webp`,
        imageAlt: "Powerline ethernet адаптер G-BUS",
      },
      {
        name: "Powerline DIN ray Ethernet адаптер",
        stockCode: "730-GBUSPLADPRM",
        image: `${IMAGE_BASE}/g-bus-powerline-din-rail-network-adapter.webp`,
        imageAlt: "DIN ray powerline ethernet адаптер G-BUS",
      },
      {
        name: "Модуль входу автоматизації",
        stockCode: "730-INP",
        image: `${IMAGE_BASE}/g-bus-receiver-input-module.webp`,
        imageAlt: "Модуль входу автоматизації G-BUS",
      },
      {
        name: "RS485 приймальний модуль",
        stockCode: "730-RCV485",
        image: `${IMAGE_BASE}/g-bus-transmitter-rs485-dim-module.webp`,
        imageAlt: "RS485 приймальний модуль G-BUS",
      },
      {
        name: "Модуль керування DIM балластом",
        stockCode: "730-DIM",
        image: `${IMAGE_BASE}/g-bus-transmitter-rs485-dim-module.webp`,
        imageAlt: "Модуль керування DIM балластом G-BUS",
      },
      {
        name: "ПК керування автоматизацією",
        stockCode: "730-GBUSPC",
        image: `${IMAGE_BASE}/g-bus-control-pc.webp`,
        imageAlt: "ПК керування автоматизацією G-BUS",
      },
      {
        name: "Сенсор денного світла (OSRAM)",
        stockCode: "730-GIS",
        image: `${IMAGE_BASE}/g-bus-daylight-motion-sensor.webp`,
        imageAlt: "Сенсор денного світла G-BUS",
      },
      {
        name: "Сенсор руху (OSRAM)",
        stockCode: "730-HS",
        image: `${IMAGE_BASE}/g-bus-daylight-motion-sensor.webp`,
        imageAlt: "Сенсор руху G-BUS",
      },
      {
        name: "ПЗ для сенсорного планшета TFT",
        stockCode: "730-GBUSTP7SW",
      },
      {
        name: "ПЗ керування для ПК",
        stockCode: "730-GBUSPCSW",
      },
      {
        name: "Тестування, введення в експлуатацію та навчання (за день)",
        stockCode: "730-GBUSTDE",
      },
    ],
    documentsTabLabel: "Документація",
    documents: [
      {
        title: "Каталог автоматизації G-BUS",
        description:
          "Спеціальний каталог продукції G-BUS: модулі, панелі керування, схеми підключення та коди товарів.",
        fileLabel: "PDF · 11.1 MB",
        href: "/assets/documents/g-bus/g-bus.pdf",
        downloadLabel: "Завантажити каталог",
      },
      {
        title: "Каталог шинопровідних систем Gersan",
        description:
          "Повний каталог продукції, що охоплює систему автоматизації G-BUS разом із шинопровідними системами Gersan, включно з кодами товарів та схемами системи.",
        fileLabel: "PDF · 25.1 MB",
        href: "/assets/documents/busbar/gersan-busbar-systems-catalogue.pdf",
        downloadLabel: "Завантажити каталог",
      },
    ],
    compatibleEyebrow: "Сумісність",
    compatibleHeading: "Сумісні шинопровідні системи",
    compatibleDescription:
      "G-BUS сумісний з обраними шинопровідними системами Gersan у діапазоні 25–6000 А.",
    compatibleSystems: [
      {
        name: "Освітлювальний шинопровід GNL",
        slug: "gnl-lighting-busbar",
        description: "Освітлювальна шинопровідна система на 25–40 А.",
      },
      {
        name: "Освітлювальний шинопровід GL",
        slug: "gl-lighting-busbar",
        description: "Освітлювальна шинопровідна система на 40–100 А.",
      },
      {
        name: "Шинопровід GGD середньої потужності",
        slug: "ggd-medium-power-busbar",
        description: "Шинопровідна система розподілу живлення на 160–1000 А.",
      },
      {
        name: "GS Super Compact",
        slug: "gs-super-compact",
        description: "Високострумова шинопровідна система на 400–6300 А.",
      },
    ],
    applicationsEyebrow: "Застосування",
    applicationsHeading: "Де використовується G-BUS",
    applicationsDescription:
      "G-BUS додає віддалений моніторинг, керування та планування там, де сумісна шинопровідна мережа розподіляє живлення.",
    applications: [
      {
        slug: "industrial-facilities",
        title: "Великі промислові об'єкти",
        description:
          "Керування за зонами та моніторинг для виробничих ліній та промислових об'єктів з високими стелями.",
        image: `${IMAGE_BASE}/g-bus-automotive-factory-application.webp`,
        imageAlt: "G-BUS автоматизація над виробничою лінією автомобільного заводу",
      },
      {
        slug: "commercial-buildings",
        title: "Комерційні будівлі",
        description:
          "Віддалене керування освітленням та навантаженням для офісів, торгових приміщень та багатофункціональних об'єктів.",
        image: "/assets/industries/cards/commercial-buildings.webp",
        imageAlt: "Освітлені комерційні офісні вежі у сутінках",
      },
      {
        slug: "data-centres",
        title: "Дата-центри",
        description:
          "Безперервний вимір та віддалене керування критично важливими колами розподілу живлення.",
        image: "/assets/industries/cards/data-centres.webp",
        imageAlt: "Серверна зала дата-центру з рядами серверних стійок",
      },
      {
        slug: "warehouses-logistics",
        title: "Склади та логістика",
        description:
          "Плановане освітлення та перемикання навантаження над проходами складів і логістичними операціями.",
        image: "/assets/products/busbar/applications/busbar-application-warehouse.webp",
        imageAlt:
          "Промисловий склад з безперервним верхнім освітленням над зонами зберігання та логістики",
      },
      {
        slug: "infrastructure-utilities",
        title: "Інфраструктура та комунальне господарство",
        description:
          "Віддалений моніторинг та перемикання для комунальних об'єктів та інших об'єктів життєзабезпечення.",
        image: "/assets/industries/cards/infrastructure-utilities.webp",
        imageAlt: "Промисловий об'єкт комунального господарства з насосами та трубопроводами",
      },
    ],
    projectSupport: {
      eyebrow: "Інженерна підтримка",
      title: "Не впевнені, чи підходить G-BUS для вашого проєкту?",
      description:
        "Поділіться інформацією про вашу шинопровідну систему, умови об'єкта та вимоги до моніторингу з нашою технічною командою.",
      action: "Зв'язатися з нашою командою",
      href: "/contact?type=project&system=g-bus",
    },
  },
} as const satisfies Readonly<Record<MarketCode, GBusPageContent>>;

export function gBusContentForMarket(market: MarketCode): GBusPageContent {
  return GBUS_CONTENT[market];
}

import type { MarketCode } from "@/modules/markets/types";

import type { BusbarCatalogView } from "./types";

// Busbar kataloğunda kullanılan sabit uygulama kimlikleri.
export type BusbarApplicationId =
  | "data-centres"
  | "industrial-facilities"
  | "warehouses-logistics"
  | "commercial-buildings"
  | "transport-infrastructure"
  | "energy-utilities";

export type BusbarSystemSlug =
  | "gnl-lighting-busbar"
  | "gl-lighting-busbar"
  | "gm-low-power-busbar"
  | "ggd-medium-power-busbar"
  | "gs-compact-high-power-busbar"
  | "gr-resin-busbar";

type CategoryCopy = Readonly<{
  label: string;
  description: string;
}>;

type SystemCopy = Readonly<{
  name: string;
  description: string;
  conductorLabel: string;
  imageAlt: string;
}>;

type ApplicationCopy = Readonly<{
  id: BusbarApplicationId;
  title: string;
  description: string;
}>;

export type BusbarCatalogContent = Readonly<{
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  breadcrumbs: Readonly<{
    home: string;
    products: string;
    current: string;
  }>;
  hero: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
    videoLabel: string;
  }>;
  facts: readonly [
    Readonly<{ value: string; label: string }>,
    Readonly<{ value: string; label: string }>,
    Readonly<{ value: string; label: string }>,
    Readonly<{ value: string; label: string }>,
  ];
  sidebar: Readonly<{
    productGroups: string;
    filters: string;
    clearAll: string;
    conductor: string;
    allConductors: string;
    aluminium: string;
    copper: string;
    currentRange: string;
    allCurrentRanges: string;
    upTo100: string;
    from100To1000: string;
    above1000: string;
    ipRating: string;
    allIpRatings: string;
    includesIp55: string;
    includesIp68: string;
    technicalTitle: string;
    technicalDescription: string;
    technicalAction: string;
  }>;
  results: Readonly<{
    eyebrow: string;
    title: string;
    countOne: string;
    countFew: string;
    countMany: string;
    viewSystem: string;
    emptyTitle: string;
    emptyDescription: string;
    clearFilters: string;
  }>;
  applications: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;
    items: readonly ApplicationCopy[];
  }>;
  projectSupport: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  }>;
  categories: Readonly<Record<BusbarCatalogView, CategoryCopy>>;
  systems: Readonly<Record<BusbarSystemSlug, SystemCopy>>;
}>;

// İngiltere ve Ukrayna pazarları için iki dilli katalog metinleri.
export const BUSBAR_CATALOG_CONTENT = {
  uk: {
    metadata: {
      title: "Busbar systems for UK projects | InfraVolt",
      description:
        "Explore Gersan lighting, power-distribution, compact and cast-resin busbar systems with technical project support from InfraVolt.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      current: "Busbar Systems",
    },
    hero: {
      eyebrow: "",
      title: "Busbar Systems",
      description:
        "Engineered for safe, efficient and flexible electrical power distribution across commercial, industrial and critical-infrastructure projects.",
      primaryAction: "Explore systems",
      secondaryAction: "Request support",
      videoLabel: "Gersan busbar manufacturing and product systems",
    },
    facts: [
      { value: "25–6300 A", label: "Current range" },
      { value: "Aluminium & copper", label: "Conductor options" },
      { value: "IP50–IP68", label: "System protection options" },
      {
        value: "Project documentation",
        label: "Available for relevant systems",
      },
    ],
    sidebar: {
      productGroups: "Product groups",
      filters: "Filters",
      clearAll: "Clear all",
      conductor: "Conductor",
      allConductors: "All conductors",
      aluminium: "Aluminium",
      copper: "Copper",
      currentRange: "Current range",
      allCurrentRanges: "All current ranges",
      upTo100: "Up to 100 A",
      from100To1000: "100–1000 A",
      above1000: "Above 1000 A",
      ipRating: "IP rating",
      allIpRatings: "All IP ratings",
      includesIp55: "Includes IP55",
      includesIp68: "Includes IP68",
      technicalTitle: "Need technical information?",
      technicalDescription:
        "Request datasheets, drawings and documentation for your selected busbar system.",
      technicalAction: "Request technical pack",
    },
    results: {
      eyebrow: "",
      title: "Product Range",
      countOne: "system",
      countFew: "systems",
      countMany: "systems",
      viewSystem: "View system",
      emptyTitle: "No systems match these filters",
      emptyDescription: "Clear the filters or select another product group.",
      clearFilters: "Clear filters",
    },
    applications: {
      eyebrow: "Applications",
      title: "Engineered for demanding environments",
      introduction: "",
      items: [
        {
          id: "data-centres",
          title: "Data centres",
          description:
            "Reliable power distribution for high-density and mission-critical electrical infrastructure.",
        },
        {
          id: "industrial-facilities",
          title: "Industrial facilities",
          description:
            "Robust power distribution for manufacturing, process areas and production facilities.",
        },
        {
          id: "warehouses-logistics",
          title: "Warehouses & logistics",
          description:
            "Efficient lighting and power distribution for modern logistics and fulfilment operations.",
        },
        {
          id: "commercial-buildings",
          title: "Commercial buildings",
          description:
            "Safe, adaptable distribution for offices, retail, public and mixed-use buildings.",
        },
        {
          id: "transport-infrastructure",
          title: "Transport infrastructure",
          description:
            "Power distribution for rail, metro, airports, terminals and maintenance facilities.",
        },
        {
          id: "energy-utilities",
          title: "Energy & utilities",
          description:
            "Busbar solutions for utility buildings, generation facilities and essential service networks.",
        },
      ],
    },
    projectSupport: {
      eyebrow: "Engineering support",
      title: "Not sure which system fits your project?",
      description:
        "Share your current requirement, installation environment and project stage with our technical team.",
      action: "Talk to our team",
    },
    categories: {
      all: {
        label: "All systems",
        description: "View the complete product range",
      },
      lighting: {
        label: "Lighting & Low Power",
        description: "Lighting distribution and low-current applications",
      },
      "power-distribution": {
        label: "Power Distribution",
        description: "Low and medium-power electrical distribution",
      },
      "high-power": {
        label: "High Power",
        description: "Compact high-current power distribution",
      },
      "special-environments": {
        label: "Cast Resin",
        description: "IP68 cast-resin systems for demanding locations",
      },
      components: {
        label: "Components & Accessories",
        description: "Series-specific connection and installation components",
      },
    },
    systems: {
      "gnl-lighting-busbar": {
        name: "GNL Lighting Busbar",
        description:
          "Compact lighting busbar system for flexible lighting distribution and fixture connections.",
        conductorLabel: "Copper conductors",
        imageAlt: "Gersan GNL lighting busbar system",
      },
      "gl-lighting-busbar": {
        name: "GL Lighting Busbar",
        description:
          "Lighting busbar system with aluminium and copper conductor options for industrial and commercial projects.",
        conductorLabel: "Aluminium or copper",
        imageAlt: "Gersan GL lighting busbar system",
      },
      "gm-low-power-busbar": {
        name: "GM Low Power Busbar",
        description:
          "Low power busbar system for distributing electrical power across commercial and industrial facilities.",
        conductorLabel: "Aluminium or copper",
        imageAlt: "Gersan GM low power busbar system",
      },
      "ggd-medium-power-busbar": {
        name: "GGD Medium Power Busbar",
        description:
          "Modular medium-power distribution system with extensive feed, elbow, offset, expansion and tap-off options.",
        conductorLabel: "Aluminium or copper",
        imageAlt: "Gersan GGD medium power busbar system",
      },
      "gs-compact-high-power-busbar": {
        name: "GS Compact High Power Busbar",
        description:
          "Compact high-current busbar system for major infrastructure, transformer and switchboard connections.",
        conductorLabel: "Aluminium or copper",
        imageAlt: "Gersan GS compact high power busbar system",
      },
      "gr-resin-busbar": {
        name: "GR Resin Busbar",
        description:
          "IP68 resin-insulated busbar system developed for humid, saline and demanding operating environments.",
        conductorLabel: "Aluminium or copper",
        imageAlt: "Gersan GR resin busbar system",
      },
    },
  },
  ua: {
    metadata: {
      title: "Шинопровідні системи для проєктів в Україні | InfraVolt",
      description:
        "Огляд освітлювальних, силових, компактних і литих шинопровідних систем Gersan та технічна підтримка проєктів від InfraVolt.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      current: "Шинопровідні системи",
    },
    hero: {
      eyebrow: "",
      title: "Шинопровідні системи",
      description:
        "Рішення для безпечного, ефективного та гнучкого розподілу електроенергії в комерційних, промислових та критично важливих інфраструктурних проєктах.",
      primaryAction: "Оглянути системи",
      secondaryAction: "Запросити підтримку",
      videoLabel: "Виробництво та шинопровідні системи Gersan",
    },
    facts: [
      { value: "25–6300 A", label: "Діапазон струмів" },
      { value: "Алюміній і мідь", label: "Матеріали провідників" },
      { value: "IP50–IP68", label: "Варіанти ступеня захисту" },
      {
        value: "Проєктна документація",
        label: "Доступна для відповідних систем",
      },
    ],
    sidebar: {
      productGroups: "Групи продукції",
      filters: "Фільтри",
      clearAll: "Очистити",
      conductor: "Провідник",
      allConductors: "Усі провідники",
      aluminium: "Алюміній",
      copper: "Мідь",
      currentRange: "Діапазон струмів",
      allCurrentRanges: "Усі діапазони струмів",
      upTo100: "До 100 A",
      from100To1000: "100–1000 A",
      above1000: "Понад 1000 A",
      ipRating: "Ступінь захисту IP",
      allIpRatings: "Усі ступені захисту IP",
      includesIp55: "Включає IP55",
      includesIp68: "Включає IP68",
      technicalTitle: "Потрібна технічна інформація?",
      technicalDescription:
        "Запросіть технічні паспорти, креслення та документацію для обраної шинопровідної системи.",
      technicalAction: "Запросити технічний пакет",
    },
    results: {
      eyebrow: "",
      title: "Асортимент",
      countOne: "система",
      countFew: "системи",
      countMany: "систем",
      viewSystem: "Переглянути систему",
      emptyTitle: "За цими фільтрами систем не знайдено",
      emptyDescription: "Очистіть фільтри або виберіть іншу групу продукції.",
      clearFilters: "Очистити фільтри",
    },
    applications: {
      eyebrow: "Застосування",
      title: "Розроблено для складних умов експлуатації",
      introduction:
        "Перевірена платформа шинопроводів для відповідальних проєктів у різних галузях і сферах застосування.",
      items: [
        {
          id: "data-centres",
          title: "Центри обробки даних",
          description:
            "Надійний розподіл електроенергії для щільної та критично важливої електротехнічної інфраструктури.",
        },
        {
          id: "industrial-facilities",
          title: "Промислові об’єкти",
          description:
            "Надійний розподіл електроенергії для виробництва, технологічних зон і промислових підприємств.",
        },
        {
          id: "warehouses-logistics",
          title: "Склади та логістика",
          description:
            "Ефективний розподіл живлення й освітлення для сучасних складських і логістичних комплексів.",
        },
        {
          id: "commercial-buildings",
          title: "Комерційні будівлі",
          description:
            "Безпечний та гнучкий розподіл для офісів, торговельних, громадських і багатофункціональних будівель.",
        },
        {
          id: "transport-infrastructure",
          title: "Транспортна інфраструктура",
          description:
            "Розподіл електроенергії для залізниці, метро, аеропортів, терміналів і ремонтних об’єктів.",
        },
        {
          id: "energy-utilities",
          title: "Енергетика та комунальна інфраструктура",
          description:
            "Шинопровідні рішення для енергетичних об’єктів, генерації та мереж життєзабезпечення.",
        },
      ],
    },
    projectSupport: {
      eyebrow: "Інженерна підтримка",
      title: "Не впевнені, яка система підходить для вашого проєкту?",
      description:
        "Надайте нашій технічній команді вимоги до струму, умови монтажу та поточну стадію проєкту.",
      action: "Звернутися до команди",
    },
    categories: {
      all: {
        label: "Усі системи",
        description: "Переглянути повний асортимент",
      },
      lighting: {
        label: "Освітлення та мала потужність",
        description:
          "Розподіл освітлення та застосування з невеликими струмами",
      },
      "power-distribution": {
        label: "Розподіл електроенергії",
        description: "Розподіл малої та середньої потужності",
      },
      "high-power": {
        label: "Висока потужність",
        description: "Компактний розподіл великих струмів",
      },
      "special-environments": {
        label: "Лита ізоляція",
        description: "Системи IP68 для складних умов експлуатації",
      },
      components: {
        label: "Компоненти та аксесуари",
        description: "Компоненти підключення та монтажу для конкретних серій",
      },
    },
    systems: {
      "gnl-lighting-busbar": {
        name: "Освітлювальний шинопровід GNL",
        description:
          "Компактна система для гнучкого розподілу освітлення та підключення світильників.",
        conductorLabel: "Мідні провідники",
        imageAlt: "Освітлювальна шинопровідна система Gersan GNL",
      },
      "gl-lighting-busbar": {
        name: "Освітлювальний шинопровід GL",
        description:
          "Освітлювальна шинопровідна система з алюмінієвими або мідними провідниками для промислових і комерційних проєктів.",
        conductorLabel: "Алюміній або мідь",
        imageAlt: "Освітлювальна шинопровідна система Gersan GL",
      },
      "gm-low-power-busbar": {
        name: "Шинопровід низької потужності GM",
        description:
          "Система низької потужності для розподілу електроенергії в комерційних і промислових об’єктах.",
        conductorLabel: "Алюміній або мідь",
        imageAlt: "Шинопровідна система низької потужності Gersan GM",
      },
      "ggd-medium-power-busbar": {
        name: "Шинопровід середньої потужності GGD",
        description:
          "Модульна система розподілу електроенергії середньої потужності з широким вибором ввідних, кутових, зміщувальних, компенсаційних і відгалужувальних компонентів.",
        conductorLabel: "Алюміній або мідь",
        imageAlt: "Модульна шинопровідна система середньої потужності Gersan GGD",
      },
      "gs-compact-high-power-busbar": {
        name: "Компактний шинопровід високої потужності GS",
        description:
          "Компактна високострумова система для інфраструктурних об’єктів, трансформаторних і щитових підключень.",
        conductorLabel: "Алюміній або мідь",
        imageAlt: "Компактна шинопровідна система високої потужності Gersan GS",
      },
      "gr-resin-busbar": {
        name: "Шинопровід GR зі смоляною ізоляцією",
        description:
          "Шинопровідна система IP68 зі смоляною ізоляцією для вологих, солоних та інших складних умов експлуатації.",
        conductorLabel: "Алюміній або мідь",
        imageAlt: "Шинопровідна система Gersan GR зі смоляною ізоляцією",
      },
    },
  },
} as const satisfies Readonly<Record<MarketCode, BusbarCatalogContent>>;

// Aktif pazara ait içerik paketini döndürür.
export function busbarCatalogContentForMarket(
  market: MarketCode,
): BusbarCatalogContent {
  return BUSBAR_CATALOG_CONTENT[market];
}

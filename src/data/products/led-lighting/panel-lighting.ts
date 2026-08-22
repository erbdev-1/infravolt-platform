import type { MarketCode } from "@/modules/markets/types";

import type { LedCategoryDetailContent } from "./types";

const CATEGORY_ASSET_BASE = "/assets/products/led-lighting/category/panel";
const CARD_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/card`;
const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;

export const PANEL_LIGHTING_HERO_BACKGROUND =
  `${CATEGORY_ASSET_BASE}/hero/panel-lighting-hero-background.webp`;
export const PANEL_LIGHTING_HERO_BACKGROUND_ALT =
  "Contemporary office and public interior illuminated by recessed LED panels";
export const PANEL_LIGHTING_HERO_FOREGROUND =
  `${CATEGORY_ASSET_BASE}/hero/panel-lighting-hero-foreground-products.webp`;
export const PANEL_LIGHTING_HERO_FOREGROUND_ALT =
  "LED-BUS Panel, DPNL surface-mounted panel and DRPNL recessed backlit panel luminaires";
export const PANEL_LIGHTING_CATEGORY_CARD_IMAGE = PANEL_LIGHTING_HERO_BACKGROUND;
export const PANEL_LIGHTING_CATEGORY_CARD_IMAGE_ALT = PANEL_LIGHTING_HERO_BACKGROUND_ALT;
export const PANEL_LIGHTING_SUPPORT_CTA_IMAGE = PANEL_LIGHTING_HERO_BACKGROUND;
export const PANEL_LIGHTING_SUPPORT_CTA_IMAGE_ALT = PANEL_LIGHTING_HERO_BACKGROUND_ALT;

const content = {
  uk: {
    metadata: {
      title: "Panel Lighting | LED Systems | LEDBUS by Gersan | InfraVolt",
      description:
        "Explore seven catalogue-verified LED-BUS panel lighting families for commercial, office, public and project-based interiors.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      current: "Panel Lighting",
    },
    backToLedSystemsLabel: "Back to LED Systems",
    hero: {
      eyebrow: "LED SYSTEMS",
      title: "Panel Lighting",
      description:
        "Efficient panel lighting for commercial, office, public and project interiors, with recessed, surface-mounted and specialist configurations.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    technicalSnapshotHeading: "Category Overview",
    technicalSnapshot: [
      {
        icon: "power",
        label: "Installation Configurations",
        value: "Recessed · Surface Mounted",
        caption: "Family-specific configurations",
      },
      {
        icon: "output",
        label: "Uniform Illumination",
        value: "Broad general-lighting panel formats",
        caption: "Diffuser construction varies by series",
      },
      {
        icon: "protection",
        label: "Project Flexibility",
        value: "Multiple dimensions, powers and forms",
        caption: "Selected per catalogue family",
      },
      {
        icon: "control",
        label: "Optical & Visual Comfort",
        value: "Opal · Prismatic · Microprismatic",
        caption: "Series-specific options",
      },
    ],
    seriesHeading: "Product Series",
    seriesIntroduction:
      "Seven catalogue-defined panel families covering general, backlit, specialist, recessed, surface-mounted and twin-linear configurations.",
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: [
      {
        slug: "led-bus-panel-lighting-systems",
        href: "/products/led-systems/panel-lighting/led-bus-panel-lighting-systems",
        number: "01",
        name: "LED-BUS Panel Lighting Systems",
        description:
          "Core LED-BUS panel family grouping the catalogue SA, SU and T configurations for commercial and project-based interiors.",
        features: [
          { icon: "applications", label: "General Panel Lighting" },
          { icon: "mounting-options", label: "Multiple Panel Configurations" },
          { icon: "applications", label: "Commercial / Project Interiors" },
        ],
        image: `${CARD_IMAGE_BASE}/led-bus-panel-lighting-category-card.webp`,
        imageAlt: "LED-BUS SA, SU and T panel lighting products",
      },
      {
        slug: "dpnl-series",
        href: "/products/led-systems/panel-lighting/dpnl-series",
        number: "02",
        name: "DPNL Series",
        description:
          "Panel family containing catalogue recessed and surface-mounted forms across multiple panel dimensions and configurations.",
        features: [
          { icon: "mounting-options", label: "Recessed / Surface Configurations" },
          { icon: "efficiency", label: "High-Efficiency Panel Family" },
          { icon: "applications", label: "Multiple Dimensions" },
        ],
        image: `${CARD_IMAGE_BASE}/dpnl-series-category-card.webp`,
        imageAlt: "DPNL surface-mounted LED panel",
      },
      {
        slug: "drpnl-series",
        href: "/products/led-systems/panel-lighting/drpnl-series",
        number: "03",
        name: "DRPNL Series",
        description:
          "Backlit LED panel family represented by recessed and surface configurations in the verified DRPNL catalogue sources.",
        features: [
          { icon: "high-output", label: "Backlit Panel Construction" },
          { icon: "optics", label: "Uniform General Illumination" },
          { icon: "mounting-options", label: "Recessed / Surface Configurations" },
        ],
        image: `${CARD_IMAGE_BASE}/drpnl-series-category-card.webp`,
        imageAlt: "DRPNL recessed backlit LED panel",
      },
      {
        slug: "hjpnl-series",
        href: "/products/led-systems/panel-lighting/hjpnl-series",
        number: "04",
        name: "HJPNL Series",
        description:
          "Specialist panel family with surface and recessed catalogue variants for project-oriented general interior lighting.",
        features: [
          { icon: "applications", label: "Specialist Panel Configurations" },
          { icon: "mounting-options", label: "Surface / Recessed Variants" },
          { icon: "applications", label: "Project-Oriented Lighting" },
        ],
        image: `${CARD_IMAGE_BASE}/hjpnl-series-category-card.webp`,
        imageAlt: "HJPNL surface-mounted LED panel",
      },
      {
        slug: "ipnl-series",
        href: "/products/led-systems/panel-lighting/ipnl-series",
        number: "05",
        name: "IPNL Series",
        description:
          "Slim recessed panel family available in catalogue square and rectangular formats for general project lighting.",
        features: [
          { icon: "slim-body", label: "Slim Recessed Panel Family" },
          { icon: "applications", label: "Square / Rectangular Formats" },
          { icon: "applications", label: "General Project Lighting" },
        ],
        image: `${CARD_IMAGE_BASE}/ipnl-series-category-card.webp`,
        imageAlt: "IPNL recessed LED panel",
      },
      {
        slug: "pnl-series",
        href: "/products/led-systems/panel-lighting/pnl-series",
        number: "06",
        name: "PNL Series",
        description:
          "Standard panel family grouping the catalogue SA recessed and SU surface-mounted configurations for office and commercial interiors.",
        features: [
          { icon: "applications", label: "Standard Panel Family" },
          { icon: "mounting-options", label: "Recessed / Surface Mounted" },
          { icon: "applications", label: "Office / Commercial Lighting" },
        ],
        image: `${CARD_IMAGE_BASE}/pnpl-series-category-card.webp`,
        imageAlt: "PNL recessed LED panel",
      },
      {
        slug: "twpnl-series",
        href: "/products/led-systems/panel-lighting/twpnl-series",
        number: "07",
        name: "TWPNL Series",
        description:
          "Twin-linear panel family grouping recessed and surface catalogue configurations for architectural and general interior lighting.",
        features: [
          { icon: "multi-lens", label: "Twin-Linear Panel Design" },
          { icon: "mounting-options", label: "Recessed / Surface Configurations" },
          { icon: "applications", label: "Architectural / General Interiors" },
        ],
        image: `${CARD_IMAGE_BASE}/twpnl-series-category-card.webp`,
        imageAlt: "TWPNL recessed twin-linear LED panel",
      },
    ],
    applicationsHeading: "Typical Applications",
    applications: [
      {
        title: "Offices & Workspaces",
        description: "General panel illumination for workplaces, meeting areas and office environments.",
        image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-offices-workspaces .webp`,
        imageAlt: "Office illuminated by LED panel lighting",
      },
      {
        title: "Education",
        description: "Panel lighting for classrooms, teaching spaces and institutional interiors.",
        image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-education.webp`,
        imageAlt: "Classroom illuminated by LED panel lighting",
      },
      {
        title: "Healthcare & Public Interiors",
        description: "General panel lighting for corridors, waiting areas and public or service interiors.",
        image: `${APPLICATION_IMAGE_BASE}/led-panel-modern-public-interior-application.webp`,
        imageAlt: "Modern public interior illuminated by integrated panel lighting",
      },
      {
        title: "Retail & Commercial Spaces",
        description: "General panel lighting for commercial areas and customer-facing interiors.",
        image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-retail-commercial-interiors.webp`,
        imageAlt: "Retail interior illuminated by LED panel lighting",
      },
      {
        title: "Transport & Waiting Areas",
        description: "Panel lighting for airport, station and public waiting environments.",
        image: `${APPLICATION_IMAGE_BASE}/led-panel-airport-waiting-area-application.webp`,
        imageAlt: "Airport waiting area illuminated by recessed DPNL panels",
      },
    ],
    supportCta: {
      eyebrow: "Technical Support",
      title: "Need a Panel Lighting Solution?",
      description:
        "Our technical team can help identify the appropriate panel family for commercial, office, public and project-based interiors.",
      action: "Talk to Our Technical Team",
    },
  },
  ua: {
    metadata: {
      title: "Панельне освітлення | LED-системи | LEDBUS від Gersan | InfraVolt",
      description:
        "Сім каталожно підтверджених сімейств панельного освітлення LED-BUS для комерційних, офісних, громадських і проєктних інтер’єрів.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "LED-системи",
      current: "Панельне освітлення",
    },
    backToLedSystemsLabel: "Назад до LED-систем",
    hero: {
      eyebrow: "LED-СИСТЕМИ",
      title: "Панельне освітлення",
      description:
        "Ефективне панельне освітлення для комерційних, офісних, громадських і проєктних інтер’єрів у вбудованих, накладних і спеціалізованих конфігураціях.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    technicalSnapshotHeading: "Огляд категорії",
    technicalSnapshot: [
      {
        icon: "power",
        label: "Конфігурації монтажу",
        value: "Вбудований · Накладний",
        caption: "Конфігурації залежать від сімейства",
      },
      {
        icon: "output",
        label: "Рівномірне освітлення",
        value: "Широкі панельні формати загального світла",
        caption: "Конструкція розсіювача залежить від серії",
      },
      {
        icon: "protection",
        label: "Проєктна гнучкість",
        value: "Різні розміри, потужності та форми",
        caption: "Вибір відповідно до каталожного сімейства",
      },
      {
        icon: "control",
        label: "Оптика й візуальний комфорт",
        value: "Опал · Призматичний · Мікропризматичний",
        caption: "Опції залежать від серії",
      },
    ],
    seriesHeading: "Серії продукції",
    seriesIntroduction:
      "Сім каталожних сімейств загальних, backlit, спеціалізованих, вбудованих, накладних і twin-linear панелей.",
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: [
      {
        slug: "led-bus-panel-lighting-systems",
        href: "/products/led-systems/panel-lighting/led-bus-panel-lighting-systems",
        number: "01",
        name: "LED-BUS Panel Lighting Systems",
        description:
          "Основне сімейство панелей LED-BUS, що об’єднує каталожні конфігурації SA, SU і T для комерційних та проєктних інтер’єрів.",
        features: [
          { icon: "applications", label: "Загальне панельне освітлення" },
          { icon: "mounting-options", label: "Кілька конфігурацій панелей" },
          { icon: "applications", label: "Комерційні / проєктні інтер’єри" },
        ],
        image: `${CARD_IMAGE_BASE}/led-bus-panel-lighting-category-card.webp`,
        imageAlt: "Панельні світильники LED-BUS SA, SU і T",
      },
      {
        slug: "dpnl-series",
        href: "/products/led-systems/panel-lighting/dpnl-series",
        number: "02",
        name: "DPNL Series",
        description:
          "Сімейство вбудованих і накладних панелей у кількох каталожних розмірах і конфігураціях.",
        features: [
          { icon: "mounting-options", label: "Вбудовані / накладні конфігурації" },
          { icon: "efficiency", label: "Високоефективне сімейство панелей" },
          { icon: "applications", label: "Кілька розмірів" },
        ],
        image: `${CARD_IMAGE_BASE}/dpnl-series-category-card.webp`,
        imageAlt: "Накладна LED-панель DPNL",
      },
      {
        slug: "drpnl-series",
        href: "/products/led-systems/panel-lighting/drpnl-series",
        number: "03",
        name: "DRPNL Series",
        description:
          "Сімейство backlit LED-панелей у вбудованих і накладних конфігураціях із підтверджених джерел DRPNL.",
        features: [
          { icon: "high-output", label: "Конструкція backlit-панелі" },
          { icon: "optics", label: "Рівномірне загальне освітлення" },
          { icon: "mounting-options", label: "Вбудовані / накладні конфігурації" },
        ],
        image: `${CARD_IMAGE_BASE}/drpnl-series-category-card.webp`,
        imageAlt: "Вбудована backlit LED-панель DRPNL",
      },
      {
        slug: "hjpnl-series",
        href: "/products/led-systems/panel-lighting/hjpnl-series",
        number: "04",
        name: "HJPNL Series",
        description:
          "Спеціалізоване сімейство панелей із накладними та вбудованими каталожними варіантами для загального проєктного освітлення.",
        features: [
          { icon: "applications", label: "Спеціалізовані конфігурації панелей" },
          { icon: "mounting-options", label: "Накладні / вбудовані варіанти" },
          { icon: "applications", label: "Проєктне загальне освітлення" },
        ],
        image: `${CARD_IMAGE_BASE}/hjpnl-series-category-card.webp`,
        imageAlt: "Накладна LED-панель HJPNL",
      },
      {
        slug: "ipnl-series",
        href: "/products/led-systems/panel-lighting/ipnl-series",
        number: "05",
        name: "IPNL Series",
        description:
          "Сімейство тонких вбудованих панелей у каталожних квадратних і прямокутних форматах для загального проєктного освітлення.",
        features: [
          { icon: "slim-body", label: "Тонке вбудоване сімейство" },
          { icon: "applications", label: "Квадратні / прямокутні формати" },
          { icon: "applications", label: "Загальне проєктне освітлення" },
        ],
        image: `${CARD_IMAGE_BASE}/ipnl-series-category-card.webp`,
        imageAlt: "Вбудована LED-панель IPNL",
      },
      {
        slug: "pnl-series",
        href: "/products/led-systems/panel-lighting/pnl-series",
        number: "06",
        name: "PNL Series",
        description:
          "Стандартне сімейство панелей, що об’єднує каталожні вбудовані SA і накладні SU конфігурації для офісних та комерційних інтер’єрів.",
        features: [
          { icon: "applications", label: "Стандартне сімейство панелей" },
          { icon: "mounting-options", label: "Вбудований / накладний монтаж" },
          { icon: "applications", label: "Офісне / комерційне освітлення" },
        ],
        image: `${CARD_IMAGE_BASE}/pnpl-series-category-card.webp`,
        imageAlt: "Вбудована LED-панель PNL",
      },
      {
        slug: "twpnl-series",
        href: "/products/led-systems/panel-lighting/twpnl-series",
        number: "07",
        name: "TWPNL Series",
        description:
          "Сімейство twin-linear панелей у вбудованих і накладних конфігураціях для архітектурного та загального освітлення інтер’єрів.",
        features: [
          { icon: "multi-lens", label: "Twin-linear дизайн панелі" },
          { icon: "mounting-options", label: "Вбудовані / накладні конфігурації" },
          { icon: "applications", label: "Архітектурні / загальні інтер’єри" },
        ],
        image: `${CARD_IMAGE_BASE}/twpnl-series-category-card.webp`,
        imageAlt: "Вбудована twin-linear LED-панель TWPNL",
      },
    ],
    applicationsHeading: "Типові сфери застосування",
    applications: [
      {
        title: "Офіси й робочі простори",
        description: "Загальне панельне освітлення робочих місць, переговорних зон та офісних середовищ.",
        image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-offices-workspaces .webp`,
        imageAlt: "Офіс, освітлений панельними LED-світильниками",
      },
      {
        title: "Освіта",
        description: "Панельне освітлення класів, навчальних просторів та інституційних інтер’єрів.",
        image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-education.webp`,
        imageAlt: "Клас, освітлений панельними LED-світильниками",
      },
      {
        title: "Заклади охорони здоров’я й громадські інтер’єри",
        description: "Загальне панельне освітлення коридорів, зон очікування та громадських або сервісних інтер’єрів.",
        image: `${APPLICATION_IMAGE_BASE}/led-panel-modern-public-interior-application.webp`,
        imageAlt: "Сучасний громадський інтер’єр з інтегрованим панельним освітленням",
      },
      {
        title: "Роздрібні й комерційні простори",
        description: "Загальне панельне освітлення комерційних зон та інтер’єрів для відвідувачів.",
        image: `${APPLICATION_IMAGE_BASE}/panel-lighting-application-retail-commercial-interiors.webp`,
        imageAlt: "Роздрібний інтер’єр, освітлений панельними LED-світильниками",
      },
      {
        title: "Транспортні зони й зали очікування",
        description: "Панельне освітлення аеропортів, вокзалів та громадських зон очікування.",
        image: `${APPLICATION_IMAGE_BASE}/led-panel-airport-waiting-area-application.webp`,
        imageAlt: "Зона очікування аеропорту, освітлена вбудованими панелями DPNL",
      },
    ],
    supportCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібне рішення для панельного освітлення?",
      description:
        "Наша технічна команда допоможе вибрати відповідне сімейство панелей для комерційних, офісних, громадських і проєктних інтер’єрів.",
      action: "Звернутися до технічної команди",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedCategoryDetailContent>>;

export function panelLightingContentForMarket(market: MarketCode): LedCategoryDetailContent {
  return content[market];
}

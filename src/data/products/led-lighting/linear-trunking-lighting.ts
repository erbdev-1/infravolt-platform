import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedCategoryDetailContent } from "./types";

const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/linear-trunking");
const CARD_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/card`;
const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;

export const LINEAR_TRUNKING_HERO_BACKGROUND =
  `${CATEGORY_ASSET_BASE}/hero/linear-trunking-lighting-hero-background.webp`;
export const LINEAR_TRUNKING_HERO_BACKGROUND_ALT =
  "Contemporary commercial interior illuminated by continuous linear lighting";
export const LINEAR_TRUNKING_CATEGORY_CARD_IMAGE = LINEAR_TRUNKING_HERO_BACKGROUND;
export const LINEAR_TRUNKING_CATEGORY_CARD_IMAGE_ALT = LINEAR_TRUNKING_HERO_BACKGROUND_ALT;
export const LINEAR_TRUNKING_SUPPORT_CTA_IMAGE = LINEAR_TRUNKING_HERO_BACKGROUND;
export const LINEAR_TRUNKING_SUPPORT_CTA_IMAGE_ALT = LINEAR_TRUNKING_HERO_BACKGROUND_ALT;

const content = {
  uk: {
    metadata: {
      title: "Linear & Trunking Lighting | LED Systems | LEDBUS by Gersan | InfraVolt",
      description:
        "Explore catalogue-verified LED linear lighting systems — LINNER architectural linear luminaires and the MULTILINE 45 continuous-row trunking lighting system.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      current: "Linear & Trunking Lighting",
    },
    backToLedSystemsLabel: "Back to LED Systems",
    hero: {
      eyebrow: "LED SYSTEMS",
      title: "Linear & Trunking Lighting",
      description:
        "Flexible linear and continuous-row lighting for commercial, architectural and project interiors, with suspended, surface-mounted, recessed and direct/indirect configurations.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    technicalSnapshotHeading: "Category Overview",
    technicalSnapshot: [
      {
        icon: "power",
        label: "Mounting Flexibility",
        value: "Suspended · Surface · Recessed",
        caption: "Series-specific configurations",
      },
      {
        icon: "output",
        label: "Optical Options",
        value: "Opal · Prismatic · Louvered · Direct / Indirect",
        caption: "Availability varies by family",
      },
      {
        icon: "protection",
        label: "Architectural Construction",
        value: "Aluminium extrusion housings",
        caption: "Across the verified LINNER families",
      },
      {
        icon: "control",
        label: "Continuous-Row Capability",
        value: "MULTILINE 45 trunking system",
      },
    ],
    seriesHeading: "Product Series",
    seriesIntroduction:
      "Seven catalogue-defined families spanning narrow and wide architectural profiles, specialised optics and continuous-row trunking.",
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: [
      {
        slug: "linner-lnr-lnrsa",
        number: "01",
        name: "LINNER LNR / LNRSA",
        description:
          "One narrow-profile platform combining LNR suspended and LNRSA surface-mounted linear luminaires in an aluminium extrusion housing.",
        features: [
          { icon: "mounting-options", label: "Suspended / Surface Mounted" },
          { icon: "slim-body", label: "Slim 33 mm Profile Platform" },
          { icon: "optics", label: "Opal / Optional Prismatic Optics" },
        ],
        image: `${CARD_IMAGE_BASE}/linner-lnr-lnrsa-category-card.webp`,
        imageAlt: "LINNER LNR suspended linear luminaire",
        href: "/products/led-systems/linear-trunking-lighting/linner-lnr-lnrsa",
      },
      {
        slug: "linner-lnr55",
        number: "02",
        name: "LINNER LNR55 Series",
        description:
          "Architectural linear family grouping the catalogue-listed recessed, surface-mounted and supported direct/indirect configurations.",
        features: [
          { icon: "mounting-options", label: "Recessed / Surface Configurations" },
          { icon: "slim-body", label: "Architectural Linear Profile" },
          { icon: "optics", label: "Series-Specific Optical Options" },
        ],
        image: `${CARD_IMAGE_BASE}/linner-lnr55-category-card.webp`,
        imageAlt: "LINNER LNR55 surface-mounted opal linear luminaire",
        href: "/products/led-systems/linear-trunking-lighting/linner-lnr55",
      },
      {
        slug: "linner-lnr85",
        number: "03",
        name: "LINNER LNR85 Series",
        description:
          "Wider-profile surface-mounted linear family for architectural general lighting, represented by the catalogue opal configuration.",
        features: [
          { icon: "slim-body", label: "Wider Linear Profile" },
          { icon: "surface-mount", label: "Surface-Mounted Configuration" },
          { icon: "optics", label: "Opal Architectural Lighting" },
        ],
        image: `${CARD_IMAGE_BASE}/linner-lnr85-category-card.webp`,
        imageAlt: "LINNER LNR85 surface-mounted opal linear luminaire",
        href: "/products/led-systems/linear-trunking-lighting/linner-lnr85",
      },
      {
        slug: "linner-lnr105",
        number: "04",
        name: "LINNER LNR105 Series",
        description:
          "Versatile architectural family containing suspended and recessed linear luminaires plus supported rectangular and cylindrical body forms.",
        features: [
          { icon: "mounting-options", label: "Suspended / Recessed" },
          { icon: "applications", label: "Multiple Body Configurations" },
          { icon: "optics", label: "Opal Architectural Lighting" },
        ],
        image: `${CARD_IMAGE_BASE}/linner-lnr105-category-card.webp`,
        imageAlt: "LINNER LNR105 suspended linear luminaire",
        href: "/products/led-systems/linear-trunking-lighting/linner-lnr105",
      },
      {
        slug: "linner-lnr33d",
        number: "05",
        name: "LINNER LNR33D Series",
        description:
          "Linear family combining opal and louvered catalogue configurations in recessed and surface-mounted forms.",
        features: [
          { icon: "optics", label: "Opal & Louvered Optics" },
          { icon: "mounting-options", label: "Recessed / Surface Mounted" },
          { icon: "applications", label: "Glare-Conscious Configuration" },
        ],
        image: `${CARD_IMAGE_BASE}/linner-lnr33d-category-card.webp`,
        imageAlt: "LINNER LNR33D recessed louvered linear luminaire",
        href: "/products/led-systems/linear-trunking-lighting/linner-lnr33d",
      },
      {
        slug: "lw-wp-architectural-linear",
        number: "06",
        name: "LW & WP Architectural Linear Luminaires",
        description:
          "One architectural group for the catalogue LW55, LW280 and WP80 products, including standard and model-specific direct/indirect variants.",
        features: [
          { icon: "slim-body", label: "Architectural Linear Forms" },
          { icon: "optics", label: "Standard & Direct / Indirect Options" },
          { icon: "suspension", label: "Supported Suspended Configurations" },
        ],
        image: `${CARD_IMAGE_BASE}/lw-wp-architectural-linear-category-card.webp`,
        imageAlt: "LW55 architectural direct and indirect linear luminaire",
        href: "/products/led-systems/linear-trunking-lighting/lw-wp-architectural-linear",
      },
      {
        slug: "multiline-45",
        number: "07",
        name: "MULTILINE 45 Continuous Trunking System",
        description:
          "Continuous-row lighting system grouping the catalogue MULTILINE 45 F and MULTILINE 45 L configurations in an aluminium extrusion body.",
        features: [
          { icon: "busbar-connect", label: "Continuous-Row Trunking System" },
          { icon: "optics", label: "F & L Configurations" },
          { icon: "protection", label: "IP54" },
        ],
        image: `${CARD_IMAGE_BASE}/multiline45-continuous-trunking-category-card.webp`,
        imageAlt: "MULTILINE 45 L continuous trunking luminaire",
        href: "/products/led-systems/linear-trunking-lighting/multiline-45",
      },
    ],
    applicationsHeading: "Typical Applications",
    applications: [
      {
        title: "Offices & Workspaces",
        description: "Architectural suspended, recessed and surface linear lighting for working interiors.",
        image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-offices.webp`,
        imageAlt: "Office illuminated by LINNER linear lighting",
      },
      {
        title: "Retail & Supermarkets",
        description: "Linear lighting and MULTILINE continuous-row configurations for retail environments.",
        image: `${APPLICATION_IMAGE_BASE}/multiline-45-supermarket-application.webp`,
        imageAlt: "Supermarket aisles illuminated by MULTILINE 45 continuous-row lighting",
      },
      {
        title: "Corridors & Circulation Areas",
        description: "Continuous and uniform linear illumination for circulation spaces.",
        image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-corridors.webp`,
        imageAlt: "Corridor illuminated by LINNER linear lighting",
      },
      {
        title: "Commercial Interiors",
        description: "Linear lighting for lobbies, hospitality and shared commercial interiors.",
        image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-commercial-interiors.webp`,
        imageAlt: "Commercial interior illuminated by LINNER linear lighting",
      },
      {
        title: "Architectural Spaces",
        description: "Suspended, direct/indirect and specialised linear lighting configurations.",
        image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-architectural-workspaces.webp`,
        imageAlt: "Architectural workspace illuminated by LINNER linear lighting",
      },
    ],
    supportCta: {
      eyebrow: "Technical Support",
      title: "Need a Linear & Trunking Lighting Solution?",
      description:
        "Our technical team can help identify the right suspended, surface-mounted, recessed, architectural or continuous-row family for your project.",
      action: "Talk to Our Technical Team",
    },
  },
  ua: {
    metadata: {
      title: "Лінійне та магістральне освітлення | LED-системи | LEDBUS від Gersan | InfraVolt",
      description:
        "Каталожно підтверджені лінійні LED-світильники LINNER та магістральна система безперервного LED-освітлення MULTILINE 45.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "LED-системи",
      current: "Лінійне та магістральне освітлення",
    },
    backToLedSystemsLabel: "Назад до LED-систем",
    hero: {
      eyebrow: "LED-СИСТЕМИ",
      title: "Лінійне та магістральне освітлення",
      description:
        "Гнучкі лінійні та безперервні системи для комерційних, архітектурних і проєктних інтер’єрів у підвісному, накладному, вбудованому та прямому/непрямому виконанні.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    technicalSnapshotHeading: "Огляд категорії",
    technicalSnapshot: [
      {
        icon: "power",
        label: "Гнучкість монтажу",
        value: "Підвісний · Накладний · Вбудований",
        caption: "Конфігурації залежать від серії",
      },
      {
        icon: "output",
        label: "Оптичні варіанти",
        value: "Опал · Призматичний · Решітчастий · Прямий / непрямий",
        caption: "Доступність залежить від сімейства",
      },
      {
        icon: "protection",
        label: "Архітектурна конструкція",
        value: "Корпуси з екструдованого алюмінію",
        caption: "У підтверджених сімействах LINNER",
      },
      {
        icon: "control",
        label: "Безперервні світлові лінії",
        value: "Магістральна система MULTILINE 45",
      },
    ],
    seriesHeading: "Серії продукції",
    seriesIntroduction:
      "Сім каталожних сімейств: вузькі й широкі архітектурні профілі, спеціалізована оптика та безперервна магістральна система.",
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: [
      {
        slug: "linner-lnr-lnrsa",
        number: "01",
        name: "LINNER LNR / LNRSA",
        description:
          "Єдина вузькопрофільна платформа підвісних LNR і накладних LNRSA в корпусі з екструдованого алюмінію.",
        features: [
          { icon: "mounting-options", label: "Підвісний / накладний монтаж" },
          { icon: "slim-body", label: "Вузька 33-мм платформа" },
          { icon: "optics", label: "Опал / опційна призматична оптика" },
        ],
        image: `${CARD_IMAGE_BASE}/linner-lnr-lnrsa-category-card.webp`,
        imageAlt: "Підвісний лінійний світильник LINNER LNR",
        href: "/products/led-systems/linear-trunking-lighting/linner-lnr-lnrsa",
      },
      {
        slug: "linner-lnr55",
        number: "02",
        name: "LINNER LNR55 Series",
        description:
          "Архітектурне лінійне сімейство вбудованих, накладних і підтримуваних каталогом прямих/непрямих конфігурацій.",
        features: [
          { icon: "mounting-options", label: "Вбудовані / накладні конфігурації" },
          { icon: "slim-body", label: "Архітектурний лінійний профіль" },
          { icon: "optics", label: "Оптика залежно від серії" },
        ],
        image: `${CARD_IMAGE_BASE}/linner-lnr55-category-card.webp`,
        imageAlt: "Накладний опаловий світильник LINNER LNR55",
        href: "/products/led-systems/linear-trunking-lighting/linner-lnr55",
      },
      {
        slug: "linner-lnr85",
        number: "03",
        name: "LINNER LNR85 Series",
        description:
          "Накладне лінійне сімейство ширшого профілю для загального архітектурного освітлення в каталожному опаловому виконанні.",
        features: [
          { icon: "slim-body", label: "Ширший лінійний профіль" },
          { icon: "surface-mount", label: "Накладна конфігурація" },
          { icon: "optics", label: "Опалове архітектурне світло" },
        ],
        image: `${CARD_IMAGE_BASE}/linner-lnr85-category-card.webp`,
        imageAlt: "Накладний опаловий світильник LINNER LNR85",
        href: "/products/led-systems/linear-trunking-lighting/linner-lnr85",
      },
      {
        slug: "linner-lnr105",
        number: "04",
        name: "LINNER LNR105 Series",
        description:
          "Універсальне архітектурне сімейство підвісних і вбудованих світильників із підтримуваними прямокутними та циліндричними формами.",
        features: [
          { icon: "mounting-options", label: "Підвісний / вбудований монтаж" },
          { icon: "applications", label: "Кілька конфігурацій корпусу" },
          { icon: "optics", label: "Опалове архітектурне світло" },
        ],
        image: `${CARD_IMAGE_BASE}/linner-lnr105-category-card.webp`,
        imageAlt: "Підвісний лінійний світильник LINNER LNR105",
        href: "/products/led-systems/linear-trunking-lighting/linner-lnr105",
      },
      {
        slug: "linner-lnr33d",
        number: "05",
        name: "LINNER LNR33D Series",
        description:
          "Лінійне сімейство з опаловими й решітчастими каталожними конфігураціями у вбудованому та накладному виконанні.",
        features: [
          { icon: "optics", label: "Опалова й решітчаста оптика" },
          { icon: "mounting-options", label: "Вбудований / накладний монтаж" },
          { icon: "applications", label: "Конфігурації для візуального комфорту" },
        ],
        image: `${CARD_IMAGE_BASE}/linner-lnr33d-category-card.webp`,
        imageAlt: "Вбудований решітчастий світильник LINNER LNR33D",
        href: "/products/led-systems/linear-trunking-lighting/linner-lnr33d",
      },
      {
        slug: "lw-wp-architectural-linear",
        number: "06",
        name: "LW & WP Architectural Linear Luminaires",
        description:
          "Єдина архітектурна група каталожних LW55, LW280 і WP80 зі стандартними та залежними від моделі прямими/непрямими варіантами.",
        features: [
          { icon: "slim-body", label: "Архітектурні лінійні форми" },
          { icon: "optics", label: "Стандартні й прямі / непрямі варіанти" },
          { icon: "suspension", label: "Підтримувані підвісні конфігурації" },
        ],
        image: `${CARD_IMAGE_BASE}/lw-wp-architectural-linear-category-card.webp`,
        imageAlt: "Архітектурний світильник LW55 прямого й непрямого світла",
        href: "/products/led-systems/linear-trunking-lighting/lw-wp-architectural-linear",
      },
      {
        slug: "multiline-45",
        number: "07",
        name: "MULTILINE 45 Continuous Trunking System",
        description:
          "Система безперервних світлових ліній, що об’єднує каталожні конфігурації MULTILINE 45 F і MULTILINE 45 L в алюмінієвому корпусі.",
        features: [
          { icon: "busbar-connect", label: "Безперервна магістральна система" },
          { icon: "optics", label: "Конфігурації F і L" },
          { icon: "protection", label: "IP54" },
        ],
        image: `${CARD_IMAGE_BASE}/multiline45-continuous-trunking-category-card.webp`,
        imageAlt: "Магістральний світильник MULTILINE 45 L",
        href: "/products/led-systems/linear-trunking-lighting/multiline-45",
      },
    ],
    applicationsHeading: "Типові сфери застосування",
    applications: [
      {
        title: "Офіси й робочі простори",
        description: "Архітектурне підвісне, вбудоване та накладне лінійне освітлення робочих інтер’єрів.",
        image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-offices.webp`,
        imageAlt: "Офіс, освітлений лінійними світильниками LINNER",
      },
      {
        title: "Роздрібна торгівля й супермаркети",
        description: "Лінійне освітлення та безперервні конфігурації MULTILINE для торгових просторів.",
        image: `${APPLICATION_IMAGE_BASE}/multiline-45-supermarket-application.webp`,
        imageAlt: "Проходи супермаркету, освітлені безперервною системою MULTILINE 45",
      },
      {
        title: "Коридори й зони руху",
        description: "Безперервне й рівномірне лінійне освітлення просторів циркуляції.",
        image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-corridors.webp`,
        imageAlt: "Коридор, освітлений лінійними світильниками LINNER",
      },
      {
        title: "Комерційні інтер’єри",
        description: "Лінійне освітлення вестибюлів, готельних і спільних комерційних просторів.",
        image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-commercial-interiors.webp`,
        imageAlt: "Комерційний інтер’єр, освітлений лінійними світильниками LINNER",
      },
      {
        title: "Архітектурні простори",
        description: "Підвісні, прямі/непрямі та спеціалізовані лінійні конфігурації.",
        image: `${APPLICATION_IMAGE_BASE}/linner-lnr-lnrsa-application-architectural-workspaces.webp`,
        imageAlt: "Архітектурний робочий простір, освітлений лінійними світильниками LINNER",
      },
    ],
    supportCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібне рішення для лінійного або магістрального освітлення?",
      description:
        "Наша технічна команда допоможе вибрати підвісне, накладне, вбудоване, архітектурне або безперервне сімейство для вашого проєкту.",
      action: "Звернутися до технічної команди",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedCategoryDetailContent>>;

export function linearTrunkingLightingContentForMarket(market: MarketCode): LedCategoryDetailContent {
  return content[market];
}

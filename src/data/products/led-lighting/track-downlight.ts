import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedCategoryDetailContent } from "./types";

const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/track-downlight");
const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;
const CARD_BASE = `${CATEGORY_ASSET_BASE}/card`;
const TRACK_CARD_BASE = `${CARD_BASE}/track-lighting-systems`;
const DOWNLIGHT_CARD_BASE = `${CARD_BASE}/downlight-lighting-systems`;

export const TRACK_DOWNLIGHT_HERO_BACKGROUND =
  `${CATEGORY_ASSET_BASE}/hero/track-downlight-hero-background.webp`;
export const TRACK_DOWNLIGHT_HERO_BACKGROUND_ALT =
  "Premium retail interior illuminated by track spotlights and recessed downlights";
export const TRACK_DOWNLIGHT_HERO_FOREGROUND =
  `${CATEGORY_ASSET_BASE}/hero/track-downlight-hero-foreground-products.webp`;
export const TRACK_DOWNLIGHT_HERO_FOREGROUND_ALT =
  "CYL85 track spotlight, CYPTM60 magnetic track pendant and BOOM adjustable downlight";
export const TRACK_DOWNLIGHT_CATEGORY_CARD_IMAGE = TRACK_DOWNLIGHT_HERO_BACKGROUND;
export const TRACK_DOWNLIGHT_CATEGORY_CARD_IMAGE_ALT = TRACK_DOWNLIGHT_HERO_BACKGROUND_ALT;
export const TRACK_DOWNLIGHT_SUPPORT_CTA_IMAGE = TRACK_DOWNLIGHT_HERO_BACKGROUND;
export const TRACK_DOWNLIGHT_SUPPORT_CTA_IMAGE_ALT = TRACK_DOWNLIGHT_HERO_BACKGROUND_ALT;

const content = {
  uk: {
    metadata: {
      title: "Track & Downlight | LED Systems | LEDBUS by Gersan | InfraVolt",
      description:
        "Catalogue-verified track spotlights, magnetic and pendant track luminaires, recessed downlights and adjustable interior lighting families.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      current: "Track & Downlight",
    },
    backToLedSystemsLabel: "Back to LED Systems",
    hero: {
      eyebrow: "LED SYSTEMS",
      title: "Track & Downlight",
      description:
        "Flexible accent and general interior lighting through track spotlights, magnetic and pendant track luminaires, plus recessed and surface downlights.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    technicalSnapshotHeading: "Category Overview",
    technicalSnapshot: [
      {
        icon: "power",
        label: "Flexible Installation",
        value: "Track · Magnetic · Pendant · Recessed · Surface",
        caption: "Series-specific configurations",
      },
      {
        icon: "output",
        label: "Optical Control",
        value: "Adjustable · Reflector · Beam Options · General Light",
        caption: "Availability varies by family",
      },
      {
        icon: "protection",
        label: "Accent + General Lighting",
        value: "Display focus and broad interior illumination",
      },
      {
        icon: "control",
        label: "Project Flexibility",
        value: "Multiple dimensions, powers, optics and controls",
        caption: "Selected per catalogue series",
      },
    ],
    seriesHeading: "Product Series",
    seriesIntroduction:
      "Catalogue-defined Track and Downlight families presented within one consistent interior-lighting system.",
    seriesGroups: [
      {
        heading: "Track Lighting Systems",
        seriesSlugs: [
          "cyl-track-spot-series",
          "cytm-cyptm-magnetic-track-series",
          "cylp-pendant-track-series",
          "lnrt-linear-track-series",
          "stn-std-sty-track-spot-series",
        ],
      },
      {
        heading: "Downlight Lighting Systems",
        href: "/products/led-systems/track-downlight/downlight-lighting-systems",
        actionLabel: "View All Downlight Systems",
        seriesSlugs: [
          "boom-bolton-adjustable-downlights",
          "mcrs-recessed-downlights",
          "mcrh-downlights",
          "moon-jpt-downlights",
          "frame-multi-head-spotlights",
          "compact-standard-downlights",
        ],
      },
    ],
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: [
      {
        slug: "cyl-track-spot-series",
        href: "/products/led-systems/track-downlight/cyl-track-spot-series",
        number: "01",
        name: "CYL Adjustable Track Spot Series",
        description:
          "Adjustable CYL track spotlight family covering the catalogue CYL85 and CYL70 forms for focused interior accent lighting.",
        features: [
          { icon: "adjustable-angle", label: "Adjustable Accent Lighting" },
          { icon: "busbar-connect", label: "Magnetic Track" },
          { icon: "optics", label: "Multiple Beam Options" },
        ],
        image: `${TRACK_CARD_BASE}/cyl-adjustable-track-spot-category-card.webp`,
        imageAlt: "CYL85 adjustable track spotlight",
      },
      {
        slug: "cytm-cyptm-magnetic-track-series",
        href: "/products/led-systems/track-downlight/cytm-cyptm-magnetic-track-series",
        number: "02",
        name: "CYTM / CYPTM Magnetic Track Series",
        description:
          "One magnetic-track family grouping CYTM60 spot and CYPTM60 suspended pendant configurations without treating them as physically identical products.",
        features: [
          { icon: "busbar-connect", label: "Magnetic Track System" },
          { icon: "suspension", label: "Spot + Pendant Configurations" },
          { icon: "optics", label: "Multiple Beam Angles" },
        ],
        image: `${TRACK_CARD_BASE}/cytm-cyptm-magnetic-track-category-card.webp`,
        imageAlt: "CYPTM60 magnetic track pendant luminaire",
      },
      {
        slug: "cylp-pendant-track-series",
        href: "/products/led-systems/track-downlight/cylp-pendant-track-series",
        number: "03",
        name: "CYLP Pendant Track Series",
        description:
          "CYLP70 magnetic-track pendant family for focused vertical and decorative accent illumination within project interiors.",
        features: [
          { icon: "suspension", label: "Pendant Accent Lighting" },
          { icon: "busbar-connect", label: "Magnetic Track Mounting" },
          { icon: "optics", label: "Focused Vertical Illumination" },
        ],
        image: `${TRACK_CARD_BASE}/cylp-pendant-track-category-card.webp`,
        imageAlt: "CYLP70 magnetic track pendant luminaire",
      },
      {
        slug: "lnrt-linear-track-series",
        href: "/products/led-systems/track-downlight/lnrt-linear-track-series",
        number: "04",
        name: "LNRT Linear Track Series",
        description:
          "LNRT40 linear track family for architectural track-mounted lighting and continuous, uniform distribution along the luminaire body.",
        features: [
          { icon: "slim-body", label: "Linear Track Lighting" },
          { icon: "high-output", label: "Uniform Light Distribution" },
          { icon: "applications", label: "Architectural Track Lighting" },
        ],
        image: `${TRACK_CARD_BASE}/lnrt-linear-track-category-card.webp`,
        imageAlt: "LNRT40 linear track luminaire",
      },
      {
        slug: "stn-std-sty-track-spot-series",
        href: "/products/led-systems/track-downlight/stn-std-sty-track-spot-series",
        number: "05",
        name: "STN / STD / STY Track Spot Series",
        description:
          "Commercial track and accent lighting group combining the catalogue STN, STD and STY body and optical configurations.",
        features: [
          { icon: "applications", label: "Commercial Track Spotlights" },
          { icon: "adjustable-angle", label: "Adjustable Accent Lighting" },
          { icon: "optics", label: "Multiple Body / Optical Forms" },
        ],
        image: `${TRACK_CARD_BASE}/stn-std-sty-track-spot-category-card.webp`,
        imageAlt: "STN120 commercial track spotlight",
      },
      {
        slug: "boom-bolton-adjustable-downlights",
        href: "/products/led-systems/track-downlight/boom-bolton-adjustable-downlights",
        number: "06",
        name: "BOOM & BOLTON Adjustable Downlights",
        description:
          "Closely related adjustable downlight group containing recessed and surface BOOM configurations plus BOLTON two- and three-head forms.",
        features: [
          { icon: "adjustable-angle", label: "Adjustable Downlights" },
          { icon: "mounting-options", label: "Recessed / Surface" },
          { icon: "optics", label: "LED and GU10 Configurations" },
        ],
        image: `${DOWNLIGHT_CARD_BASE}/ldb-boom-h-k-d2-category-card.webp`,
        imageAlt: "BOOM and BOLTON adjustable downlight products",
      },
      {
        slug: "mcrs-recessed-downlights",
        href: "/products/led-systems/track-downlight/mcrs-recessed-downlights",
        number: "07",
        name: "MCRS Recessed Downlight Series",
        description:
          "Recessed downlight family spanning multiple catalogue body sizes and outputs, with protected configurations listed on family records.",
        features: [
          { icon: "surface-mount", label: "Recessed Downlight Family" },
          { icon: "applications", label: "Multiple Sizes / Outputs" },
          { icon: "protection", label: "Protected Source Configurations" },
        ],
        image: `${CARD_BASE}/mcrs-recessed-downlight-series-category-card.webp`,
        imageAlt: "MCRS recessed downlight",
      },
      {
        slug: "mcrh-downlights",
        href: "/products/led-systems/track-downlight/mcrh-downlights",
        number: "08",
        name: "MCRH Downlight Series",
        description:
          "One catalogue group for MCRH and MCRKS recessed downlight forms with die-cast aluminium construction and configuration-specific protection options.",
        features: [
          { icon: "rugged-body", label: "Die-Cast Aluminium Body" },
          { icon: "surface-mount", label: "Recessed Downlight Forms" },
          { icon: "protection", label: "Configuration-Specific Protection" },
        ],
        image: `${DOWNLIGHT_CARD_BASE}/mcrs-mercury-h-series-category-card.webp`,
        imageAlt: "MCRH and MCRKS recessed downlight products",
      },
      {
        slug: "moon-jpt-downlights",
        href: "/products/led-systems/track-downlight/moon-jpt-downlights",
        number: "09",
        name: "MOON & JPT Downlights",
        description:
          "MOON recessed and surface-mounted forms grouped with the catalogue JPT downlights for general and architectural interior lighting.",
        features: [
          { icon: "mounting-options", label: "Recessed / Surface Mounted" },
          { icon: "optics", label: "COB LED & Reflector Construction" },
          { icon: "applications", label: "General / Architectural Interiors" },
        ],
        image: `${CARD_BASE}/moon-4-series-category-card.webp`,
        imageAlt: "MOON and JPT downlight product",
      },
      {
        slug: "frame-multi-head-spotlights",
        href: "/products/led-systems/track-downlight/frame-multi-head-spotlights",
        number: "10",
        name: "FRAME Multi-Head Spotlights",
        description:
          "FRAME family of one-, two- and three-head recessed spotlight modules for adjustable accent and display lighting.",
        features: [
          { icon: "multi-lens", label: "Multi-Head Spotlight System" },
          { icon: "adjustable-angle", label: "Adjustable Accent Lighting" },
          { icon: "applications", label: "Display / Retail Applications" },
        ],
        image: `${CARD_BASE}/frame-mercury-h3-series-category-card.webp`,
        imageAlt: "FRAME two-head recessed spotlight module",
      },
      {
        slug: "compact-standard-downlights",
        href: "/products/led-systems/track-downlight/compact-standard-downlights",
        number: "11",
        name: "STRN & Compact Downlight Series",
        description:
          "Source-supported STRN and SIGMA compact downlights from catalogue pages 87–88, with their distinct model schedules and protection data kept separate.",
        features: [
          { icon: "mounting-options", label: "Recessed / Surface Forms" },
          { icon: "applications", label: "Multiple Standard Sizes" },
          { icon: "high-output", label: "Backlit LED Technology" },
        ],
        image: `${CARD_BASE}/saturn-series-category-card.webp`,
        imageAlt: "STRN catalogue recessed downlight",
      },
    ],
    applicationsHeading: "Typical Applications",
    applications: [
      {
        title: "Retail & Stores",
        description: "Focused track and downlight solutions for product presentation and general store illumination.",
        image: `${APPLICATION_IMAGE_BASE}/series-application-retail-stores.webp`,
        imageAlt: "Retail interior illuminated by catalogue track and downlight products",
      },
      {
        title: "Showrooms",
        description: "Adjustable accent lighting for displays, products and focal points.",      },
      {
        title: "Hotels & Hospitality",
        description: "Track, pendant and downlight solutions for lobbies, circulation and hospitality interiors.",      },
      {
        title: "Offices & Workspaces",
        description: "General and accent interior lighting using family-appropriate downlight solutions.",      },
      {
        title: "Galleries & Exhibition Spaces",
        description: "Precise track-based accent lighting for artwork, displays and changing layouts.",
        image: `${APPLICATION_IMAGE_BASE}/series-application-galleris-exhibition.webp`,
        imageAlt: "Gallery-style interior illuminated by CYL85 track spotlights",
      },
      {
        title: "Commercial Interiors",
        description: "Flexible recessed, surface and track-mounted lighting for project-based interiors.",
        image: `${APPLICATION_IMAGE_BASE}/series-application-commercial-interior.webp`,
        imageAlt: "Commercial interior illuminated by recessed downlights",
      },
    ],
    supportCta: {
      eyebrow: "Technical Support",
      title: "Need a Track & Downlight Solution?",
      description:
        "Our technical team can help select the appropriate track spotlight, magnetic or pendant track luminaire, recessed downlight or adjustable spotlight for your project.",
      action: "Talk to Our Technical Team",
    },
  },
  ua: {
    metadata: {
      title: "Трекове освітлення та даунлайти | LED-системи | LEDBUS від Gersan | InfraVolt",
      description:
        "Каталожно підтверджені трекові прожектори, магнітні й підвісні трекові світильники, вбудовані даунлайти та регульовані сімейства освітлення.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "LED-системи",
      current: "Трекове освітлення та даунлайти",
    },
    backToLedSystemsLabel: "Назад до LED-систем",
    hero: {
      eyebrow: "LED-СИСТЕМИ",
      title: "Трекове освітлення та даунлайти",
      description:
        "Гнучке акцентне й загальне освітлення інтер’єрів: трекові прожектори, магнітні та підвісні трекові світильники, вбудовані й накладні даунлайти.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    technicalSnapshotHeading: "Огляд категорії",
    technicalSnapshot: [
      {
        icon: "power",
        label: "Гнучкий монтаж",
        value: "Трек · Магнітний · Підвісний · Вбудований · Накладний",
        caption: "Конфігурації залежать від серії",
      },
      {
        icon: "output",
        label: "Оптичне керування",
        value: "Регульований · Рефлектор · Кути променя · Загальне світло",
        caption: "Доступність залежить від сімейства",
      },
      {
        icon: "protection",
        label: "Акцентне + загальне світло",
        value: "Підсвічування експозицій і широке освітлення інтер’єрів",
      },
      {
        icon: "control",
        label: "Проєктна гнучкість",
        value: "Різні розміри, потужності, оптика й керування",
        caption: "Вибір відповідно до каталожної серії",
      },
    ],
    seriesHeading: "Серії продукції",
    seriesIntroduction:
      "Каталожні сімейства Track і Downlight в одній узгодженій системі освітлення інтер’єрів.",
    seriesGroups: [
      {
        heading: "Системи трекового освітлення",
        seriesSlugs: [
          "cyl-track-spot-series",
          "cytm-cyptm-magnetic-track-series",
          "cylp-pendant-track-series",
          "lnrt-linear-track-series",
          "stn-std-sty-track-spot-series",
        ],
      },
      {
        heading: "Системи даунлайтів",
        href: "/products/led-systems/track-downlight/downlight-lighting-systems",
        actionLabel: "Переглянути всі системи даунлайтів",
        seriesSlugs: [
          "boom-bolton-adjustable-downlights",
          "mcrs-recessed-downlights",
          "mcrh-downlights",
          "moon-jpt-downlights",
          "frame-multi-head-spotlights",
          "compact-standard-downlights",
        ],
      },
    ],
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: [
      {
        slug: "cyl-track-spot-series",
        href: "/products/led-systems/track-downlight/cyl-track-spot-series",
        number: "01",
        name: "CYL Adjustable Track Spot Series",
        description: "Регульоване сімейство CYL85 і CYL70 для сфокусованого акцентного освітлення інтер’єрів.",
        features: [
          { icon: "adjustable-angle", label: "Регульоване акцентне світло" },
          { icon: "busbar-connect", label: "Магнітний трек" },
          { icon: "optics", label: "Кілька варіантів променя" },
        ],
        image: `${TRACK_CARD_BASE}/cyl-adjustable-track-spot-category-card.webp`,
        imageAlt: "Регульований трековий прожектор CYL85",
      },
      {
        slug: "cytm-cyptm-magnetic-track-series",
        href: "/products/led-systems/track-downlight/cytm-cyptm-magnetic-track-series",
        number: "02",
        name: "CYTM / CYPTM Magnetic Track Series",
        description: "Одне магнітне трекове сімейство прожекторів CYTM60 і підвісних конфігурацій CYPTM60.",
        features: [
          { icon: "busbar-connect", label: "Магнітна трекова система" },
          { icon: "suspension", label: "Прожекторні + підвісні конфігурації" },
          { icon: "optics", label: "Кілька кутів променя" },
        ],
        image: `${TRACK_CARD_BASE}/cytm-cyptm-magnetic-track-category-card.webp`,
        imageAlt: "Підвісний магнітний трековий світильник CYPTM60",
      },
      {
        slug: "cylp-pendant-track-series",
        href: "/products/led-systems/track-downlight/cylp-pendant-track-series",
        number: "03",
        name: "CYLP Pendant Track Series",
        description: "Сімейство магнітних трекових підвісів CYLP70 для сфокусованого вертикального й декоративного акцентного світла.",
        features: [
          { icon: "suspension", label: "Підвісне акцентне освітлення" },
          { icon: "busbar-connect", label: "Монтаж на магнітний трек" },
          { icon: "optics", label: "Сфокусоване вертикальне світло" },
        ],
        image: `${TRACK_CARD_BASE}/cylp-pendant-track-category-card.webp`,
        imageAlt: "Підвісний магнітний світильник CYLP70",
      },
      {
        slug: "lnrt-linear-track-series",
        href: "/products/led-systems/track-downlight/lnrt-linear-track-series",
        number: "04",
        name: "LNRT Linear Track Series",
        description: "Лінійне трекове сімейство LNRT40 для архітектурного освітлення з рівномірним розподілом уздовж корпусу.",
        features: [
          { icon: "slim-body", label: "Лінійне трекове освітлення" },
          { icon: "high-output", label: "Рівномірний розподіл світла" },
          { icon: "applications", label: "Архітектурне трекове світло" },
        ],
        image: `${TRACK_CARD_BASE}/lnrt-linear-track-category-card.webp`,
        imageAlt: "Лінійний трековий світильник LNRT40",
      },
      {
        slug: "stn-std-sty-track-spot-series",
        href: "/products/led-systems/track-downlight/stn-std-sty-track-spot-series",
        number: "05",
        name: "STN / STD / STY Track Spot Series",
        description: "Комерційна трекова група STN, STD і STY з різними конфігураціями корпусу й оптики.",
        features: [
          { icon: "applications", label: "Комерційні трекові прожектори" },
          { icon: "adjustable-angle", label: "Регульоване акцентне світло" },
          { icon: "optics", label: "Різні корпуси й оптика" },
        ],
        image: `${TRACK_CARD_BASE}/stn-std-sty-track-spot-category-card.webp`,
        imageAlt: "Комерційний трековий прожектор STN120",
      },
      {
        slug: "boom-bolton-adjustable-downlights",
        href: "/products/led-systems/track-downlight/boom-bolton-adjustable-downlights",
        number: "06",
        name: "BOOM & BOLTON Adjustable Downlights",
        description: "Група регульованих вбудованих і накладних BOOM та дво- і триголових форм BOLTON.",
        features: [
          { icon: "adjustable-angle", label: "Регульовані даунлайти" },
          { icon: "mounting-options", label: "Вбудовані / накладні" },
          { icon: "optics", label: "LED і GU10 конфігурації" },
        ],
        image: `${DOWNLIGHT_CARD_BASE}/ldb-boom-h-k-d2-category-card.webp`,
        imageAlt: "Регульовані даунлайти BOOM і BOLTON",
      },
      {
        slug: "mcrs-recessed-downlights",
        href: "/products/led-systems/track-downlight/mcrs-recessed-downlights",
        number: "07",
        name: "MCRS Recessed Downlight Series",
        description: "Сімейство вбудованих даунлайтів у кількох розмірах і вихідних конфігураціях із захищеними варіантами в каталозі.",
        features: [
          { icon: "surface-mount", label: "Вбудоване сімейство" },
          { icon: "applications", label: "Кілька розмірів / виходів" },
          { icon: "protection", label: "Захищені каталожні конфігурації" },
        ],
        image: `${CARD_BASE}/mcrs-recessed-downlight-series-category-card.webp`,
        imageAlt: "Вбудований даунлайт MCRS",
      },
      {
        slug: "mcrh-downlights",
        href: "/products/led-systems/track-downlight/mcrh-downlights",
        number: "08",
        name: "MCRH Downlight Series",
        description: "Каталожна група вбудованих MCRH і MCRKS з литою алюмінієвою конструкцією та захистом залежно від конфігурації.",
        features: [
          { icon: "rugged-body", label: "Литий алюмінієвий корпус" },
          { icon: "surface-mount", label: "Вбудовані форми" },
          { icon: "protection", label: "Захист залежно від конфігурації" },
        ],
        image: `${DOWNLIGHT_CARD_BASE}/mcrs-mercury-h-series-category-card.webp`,
        imageAlt: "Вбудовані даунлайти MCRH і MCRKS",
      },
      {
        slug: "moon-jpt-downlights",
        href: "/products/led-systems/track-downlight/moon-jpt-downlights",
        number: "09",
        name: "MOON & JPT Downlights",
        description: "Вбудовані й накладні MOON разом із каталожними JPT для загального та архітектурного освітлення.",
        features: [
          { icon: "mounting-options", label: "Вбудований / накладний монтаж" },
          { icon: "optics", label: "COB LED і рефлектор" },
          { icon: "applications", label: "Загальні / архітектурні інтер’єри" },
        ],
        image: `${CARD_BASE}/moon-4-series-category-card.webp`,
        imageAlt: "Даунлайт MOON і JPT",
      },
      {
        slug: "frame-multi-head-spotlights",
        href: "/products/led-systems/track-downlight/frame-multi-head-spotlights",
        number: "10",
        name: "FRAME Multi-Head Spotlights",
        description: "Сімейство вбудованих FRAME з одним, двома або трьома регульованими світловими модулями.",
        features: [
          { icon: "multi-lens", label: "Багатоголова система" },
          { icon: "adjustable-angle", label: "Регульоване акцентне світло" },
          { icon: "applications", label: "Вітрини / роздрібна торгівля" },
        ],
        image: `${CARD_BASE}/frame-mercury-h3-series-category-card.webp`,
        imageAlt: "Двоголовий вбудований прожектор FRAME",
      },
      {
        slug: "compact-standard-downlights",
        href: "/products/led-systems/track-downlight/compact-standard-downlights",
        number: "11",
        name: "STRN & Compact Downlight Series",
        description: "Підтверджені сторінками 87–88 даунлайти STRN і компактні SIGMA з окремими модельними графіками та характеристиками захисту.",
        features: [
          { icon: "mounting-options", label: "Вбудовані / накладні форми" },
          { icon: "applications", label: "Кілька стандартних розмірів" },
          { icon: "high-output", label: "Backlit LED Technology" },
        ],
        image: `${CARD_BASE}/saturn-series-category-card.webp`,
        imageAlt: "Каталожний вбудований даунлайт STRN",
      },
    ],
    applicationsHeading: "Типові сфери застосування",
    applications: [
      {
        title: "Роздрібна торгівля й магазини",
        description: "Сфокусоване трекове та загальне downlight-освітлення для презентації товарів.",
        image: `${APPLICATION_IMAGE_BASE}/series-application-retail-stores.webp`,
        imageAlt: "Торговий інтер’єр із трековим і downlight-освітленням",
      },
      {
        title: "Шоуруми",
        description: "Регульоване акцентне освітлення експозицій, продуктів і фокусних точок.",
      },
      {
        title: "Готелі й гостинність",
        description: "Трекові, підвісні й downlight-рішення для лобі, зон руху та гостинності.",
      },
      {
        title: "Офіси й робочі простори",
        description: "Загальне й акцентне освітлення інтер’єрів відповідними сімействами даунлайтів.",
      },
      {
        title: "Галереї й виставкові простори",
        description: "Точне трекове акцентне світло для творів, експозицій та змінних планувань.",
        image: `${APPLICATION_IMAGE_BASE}/series-application-galleris-exhibition.webp`,
        imageAlt: "Галерейний інтер’єр із трековими прожекторами CYL85",
      },
      {
        title: "Комерційні інтер’єри",
        description: "Гнучке вбудоване, накладне й трекове освітлення проєктних інтер’єрів.",
        image: `${APPLICATION_IMAGE_BASE}/series-application-commercial-interior.webp`,
        imageAlt: "Комерційний інтер’єр із вбудованими даунлайтами",
      },
    ],
    supportCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібне рішення Track & Downlight?",
      description:
        "Наша технічна команда допоможе вибрати трековий прожектор, магнітний або підвісний світильник, вбудований даунлайт чи регульований спот для вашого проєкту.",
      action: "Звернутися до технічної команди",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedCategoryDetailContent>>;

export function trackDownlightContentForMarket(market: MarketCode): LedCategoryDetailContent {
  return content[market];
}

export const DOWNLIGHT_SYSTEMS_HERO_BACKGROUND =
  `${APPLICATION_IMAGE_BASE}/series-application-retail-stores.webp`;
export const DOWNLIGHT_SYSTEMS_HERO_BACKGROUND_ALT =
  "Retail interior illuminated by catalogue recessed downlights";
export const DOWNLIGHT_SYSTEMS_HERO_FOREGROUND =
  `${DOWNLIGHT_CARD_BASE}/ldb-boom-h-k-d2-category-card.webp`;
export const DOWNLIGHT_SYSTEMS_HERO_FOREGROUND_ALT =
  "BOOM and BOLTON adjustable downlight products";

const DOWNLIGHT_SERIES_SLUGS = [
  "boom-bolton-adjustable-downlights",
  "mcrs-recessed-downlights",
  "mcrh-downlights",
  "moon-jpt-downlights",
  "frame-multi-head-spotlights",
  "compact-standard-downlights",
] as const;

export function downlightLightingSystemsContentForMarket(
  market: MarketCode,
): LedCategoryDetailContent {
  const parent = trackDownlightContentForMarket(market);
  const series = DOWNLIGHT_SERIES_SLUGS.flatMap((slug, index) => {
    const item = parent.series.find((candidate) => candidate.slug === slug);
    return item ? [{ ...item, number: String(index + 1).padStart(2, "0") }] : [];
  });

  if (market === "ua") {
    return {
      ...parent,
      metadata: {
        title: "Системи даунлайтів | LED-системи | InfraVolt",
        description:
          "Каталожно підтверджені вбудовані, накладні, регульовані та багатоголові системи даунлайтів.",
      },
      breadcrumbs: { ...parent.breadcrumbs, current: "Системи даунлайтів" },
      backToLedSystemsLabel: "Назад до Track & Downlight",
      hero: {
        ...parent.hero,
        eyebrow: "TRACK & DOWNLIGHT",
        title: "Системи даунлайтів",
        description:
          "Комплексний вибір вбудованих, накладних і регульованих даунлайтів для комерційних, торговельних, готельних та архітектурних інтер’єрів.",
      },
      technicalSnapshotHeading: "Огляд даунлайтів",
      technicalSnapshot: [
        { icon: "power", label: "Гнучкий монтаж", value: "Вбудовані · накладні · регульовані", caption: "Конфігурації залежать від серії" },
        { icon: "output", label: "Акцентне й загальне світло", value: "Освітлення експозицій і загальне освітлення інтер’єрів" },
        { icon: "protection", label: "Різні формати", value: "Одноголові · багатоголові · компактні · великі" },
        { icon: "control", label: "Опції серії", value: "Потужність, оптика, захист і керування залежать від сімейства" },
      ],
      seriesHeading: "Серії продукції в системах даунлайтів",
      seriesIntroduction:
        "Шість каталожно визначених сімейств даунлайтів із прямими посиланнями на детальні сторінки серій.",
      seriesGroups: [{ heading: "Системи даунлайтів", seriesSlugs: DOWNLIGHT_SERIES_SLUGS }],
      series,
      applicationsHeading: "Типові застосування",
      applications: [
        { title: "Роздрібні магазини", description: "Регульовані та вбудовані даунлайти для загального освітлення й презентації товарів.", image: parent.applications[0]?.image, imageAlt: parent.applications[0]?.imageAlt },
        { title: "Офіси й робочі простори", description: "Компактне вбудоване освітлення для робочих зон, переговорних і коридорів.", image: parent.applications[3]?.image, imageAlt: parent.applications[3]?.imageAlt },
        { title: "Готелі й гостинність", description: "Архітектурні даунлайти для лобі, гостьових і громадських просторів.", image: parent.applications[2]?.image, imageAlt: parent.applications[2]?.imageAlt },
        { title: "Освітні простори", description: "Загальне даунлайт-освітлення класів, коридорів та інституційних інтер’єрів." },
        { title: "Галереї й шоуруми", description: "Сфокусовані та багатоголові рішення для експозицій і демонстраційних зон.", image: parent.applications[1]?.image, imageAlt: parent.applications[1]?.imageAlt },
        { title: "Комерційні інтер’єри", description: "Гнучкі сімейства даунлайтів для проєктних комерційних просторів.", image: parent.applications[5]?.image, imageAlt: parent.applications[5]?.imageAlt },
      ],
      supportCta: {
        ...parent.supportCta,
        title: "Потрібне рішення для освітлення даунлайтами?",
        description:
          "Наша команда допоможе визначити відповідне вбудоване, регульоване або багатоголове сімейство для вашого проєкту.",
      },
    };
  }

  return {
    ...parent,
    metadata: {
      title: "Downlight Lighting Systems | LED Systems | InfraVolt",
      description:
        "Catalogue-verified recessed, surface-mounted, adjustable and multi-head Downlight lighting families.",
    },
    breadcrumbs: { ...parent.breadcrumbs, current: "Downlight Lighting Systems" },
    backToLedSystemsLabel: "Back to Track & Downlight",
    hero: {
      ...parent.hero,
      eyebrow: "TRACK & DOWNLIGHT",
      title: "Downlight Lighting Systems",
      description:
        "A comprehensive range of recessed, surface-mounted and adjustable downlight systems for commercial, retail, hospitality and architectural interiors.",
    },
    technicalSnapshotHeading: "Downlight Overview",
    technicalSnapshot: [
      { icon: "power", label: "Installation Flexibility", value: "Recessed · Surface-Mounted · Adjustable", caption: "Configurations vary by series" },
      { icon: "output", label: "Accent & General Lighting", value: "Focused display lighting and broad interior illumination" },
      { icon: "protection", label: "Multiple Product Formats", value: "Single-Head · Multi-Head · Compact · Larger Recessed" },
      { icon: "control", label: "Series-Specific Options", value: "Power, optics, protection and controls vary by family" },
    ],
    seriesHeading: "Product Series in Downlight Lighting Systems",
    seriesIntroduction:
      "Six catalogue-defined Downlight families with direct access to each completed Series Detail page.",
    seriesGroups: [{ heading: "Downlight Lighting Systems", seriesSlugs: DOWNLIGHT_SERIES_SLUGS }],
    series,
    applicationsHeading: "Typical Applications",
    applications: [
      { title: "Retail & Stores", description: "Adjustable and recessed downlight solutions for general lighting and product presentation.", image: parent.applications[0]?.image, imageAlt: parent.applications[0]?.imageAlt },
      { title: "Offices & Workspaces", description: "Compact recessed lighting solutions for workspaces, meeting rooms and circulation areas.", image: parent.applications[3]?.image, imageAlt: parent.applications[3]?.imageAlt },
      { title: "Hotels & Hospitality", description: "Architectural downlights for lobbies, hospitality spaces and guest-facing interiors.", image: parent.applications[2]?.image, imageAlt: parent.applications[2]?.imageAlt },
      { title: "Education Spaces", description: "General downlighting for classrooms, circulation and institutional interiors." },
      { title: "Galleries & Showrooms", description: "Focused and multi-head lighting solutions for displays, exhibitions and feature areas.", image: parent.applications[1]?.image, imageAlt: parent.applications[1]?.imageAlt },
      { title: "Commercial Interiors", description: "Flexible downlight families for project-based commercial interior lighting.", image: parent.applications[5]?.image, imageAlt: parent.applications[5]?.imageAlt },
    ],
    supportCta: {
      ...parent.supportCta,
      title: "Need a Downlight Lighting Solution?",
      description:
        "Our team can help identify the right recessed, adjustable or multi-head Downlight family for your project.",
    },
  };
}

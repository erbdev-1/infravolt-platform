import type { MarketCode } from "@/modules/markets/types";

import type { LedCategoryDetailContent } from "./types";

const ASSET_BASE = "/assets/products/led-lighting/category/special&hazardous";

export const SPECIAL_HAZARDOUS_HERO_BACKGROUND =
  `${ASSET_BASE}/hero/special-hazardous-environment-lighting-hero-background.webp`;
export const SPECIAL_HAZARDOUS_HERO_BACKGROUND_ALT =
  "Specialised industrial environment illuminated by protected technical luminaires";
export const SPECIAL_HAZARDOUS_HERO_FOREGROUND =
  `${ASSET_BASE}/hero/special-hazardous-environment-lighting-hero-foreground-products.webp`;
export const SPECIAL_HAZARDOUS_HERO_FOREGROUND_ALT =
  "GERSAN Exproof, Sera-LED, TEX-LED and AUTO-LED product families";
export const SPECIAL_HAZARDOUS_SUPPORT_CTA_IMAGE = SPECIAL_HAZARDOUS_HERO_BACKGROUND;
export const SPECIAL_HAZARDOUS_SUPPORT_CTA_IMAGE_ALT = SPECIAL_HAZARDOUS_HERO_BACKGROUND_ALT;

const SERIES_IMAGE_BASE = `${ASSET_BASE}/card`;
const APPLICATION_IMAGE_BASE = `${ASSET_BASE}/applications`;

const content = {
  uk: {
    metadata: {
      title: "Special & Hazardous Environment Lighting | LED Systems | InfraVolt",
      description:
        "Four real GERSAN lighting families for hazardous industrial areas, greenhouses, textile inspection and automotive paint control.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      current: "Special & Hazardous Environment Lighting",
    },
    backToLedSystemsLabel: "Back to LED Systems",
    hero: {
      eyebrow: "LED SYSTEMS",
      title: "Special & Hazardous Environment Lighting",
      description:
        "Application-specific lighting engineered for hazardous industrial areas, controlled growing environments, textile inspection and automotive paint control.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    technicalSnapshotHeading: "Category Overview",
    technicalSnapshot: [
      { icon: "power", label: "Specialist Portfolio", value: "Four catalogue families" },
      { icon: "output", label: "Application-Specific Light", value: "Exproof · Horticulture · Inspection" },
      { icon: "protection", label: "Protected Product Families", value: "Ratings verified per family", caption: "No universal category rating" },
      { icon: "control", label: "Operating Environments", value: "Industrial · Controlled · Specialised" },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction:
      "Four distinct catalogue families, each designed for its own specialised application environment.",
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: [
      {
        slug: "gersan-exproof-led-lighting-systems",
        href: "/products/led-systems/special-hazardous-environment-lighting/gersan-exproof-led-lighting-systems",
        number: "01",
        name: "GERSAN Exproof LED Lighting Systems",
        description:
          "Hazardous-area lighting family spanning the catalogue's GSL EXP and LED-BUS Exproof forms, including GSL EXP-150W and LED-BUS LDBEXP8.",
        features: [
          { icon: "applications", label: "Hazardous-Area Family" },
          { icon: "protection", label: "Family-Specific IP65 / IP66 References" },
          { icon: "rugged-body", label: "9 GSL EXP · 8 LED-BUS LDBEXP Models" },
        ],
        image: `${SERIES_IMAGE_BASE}/gersan-exproof-led-category-card.webp`,
        imageAlt: "LED-BUS Exproof catalogue luminaire product views",
      },
      {
        slug: "gersan-sera-led-greenhouse-luminaires",
        href: "/products/led-systems/special-hazardous-environment-lighting/gersan-sera-led-greenhouse-luminaires",
        number: "02",
        name: "GERSAN Sera-LED Greenhouse Luminaires",
        description:
          "LED-BUS-S80W and LED-BUS-S180W greenhouse luminaires for supplementary plant lighting in controlled agricultural environments.",
        features: [
          { icon: "applications", label: "Greenhouse Application" },
          { icon: "protection", label: "IP66" },
          { icon: "tempered-glass", label: "Aluminium Body · Tempered Glass" },
        ],
        image: `${SERIES_IMAGE_BASE}/gersan-sera-led-category-card.webp`,
        imageAlt: "GERSAN Sera-LED linear greenhouse luminaire",
      },
      {
        slug: "gersan-tex-led-lighting-systems",
        href: "/products/led-systems/special-hazardous-environment-lighting/gersan-tex-led-lighting-systems",
        number: "03",
        name: "GERSAN TEX-LED Lighting Systems",
        description:
          "Specialised industrial lighting for textile fabric and thread inspection, represented by three exact catalogue models.",
        features: [
          { icon: "applications", label: "Textile Inspection" },
          { icon: "protection", label: "IP66" },
          { icon: "high-output", label: "TEX-LED 3UV · 5UV · 10UV" },
        ],
        image: `${SERIES_IMAGE_BASE}/gersan-tex-led-category-card.webp`,
        imageAlt: "GERSAN TEX-LED linear textile-inspection luminaire",
      },
      {
        slug: "gersan-auto-led-lighting-systems",
        href: "/products/led-systems/special-hazardous-environment-lighting/gersan-auto-led-lighting-systems",
        number: "04",
        name: "GERSAN AUTO-LED Lighting Systems",
        description:
          "Automotive paint and surface inspection lighting for colour matching and identifying finish defects inside service environments.",
        features: [
          { icon: "applications", label: "Vehicle Paint Inspection" },
          { icon: "protection", label: "IP66" },
          { icon: "high-output", label: "AUTO-LED 3UV · 5UV · 10UV" },
        ],
        image: `${SERIES_IMAGE_BASE}/gersan-auto-led-category-card.webp`,
        imageAlt: "GERSAN AUTO-LED linear automotive paint-inspection luminaire",
      },
    ],
    applicationsHeading: "Typical Specialised Applications",
    applications: [
      {
        title: "Hazardous Industrial Areas",
        description: "Exproof-family lighting for catalogue-listed demanding industrial environments.",
        image: `${APPLICATION_IMAGE_BASE}/exproof-industrial-application.webp`,
        imageAlt: "Petrochemical industrial environment shown in the Exproof catalogue section",
      },
      {
        title: "Greenhouses",
        description: "Supplementary plant lighting where natural light is seasonally or daily insufficient.",
        image: `${APPLICATION_IMAGE_BASE}/sera-led-greenhouse-application.webp`,
        imageAlt: "Greenhouse rows illuminated by Sera-LED luminaires",
      },
      {
        title: "Controlled Growing Environments",
        description: "Application-specific light design for plant type and growing-space arrangement.",
        image: `${APPLICATION_IMAGE_BASE}/special-hazardous-controlled-growing-environments-application.webp`,
        imageAlt: "Controlled growing environment illuminated for plant cultivation",
      },
      {
        title: "Textile Production Inspection",
        description: "Specialised inspection lighting for fabric and thread quality-control processes.",
        image: `${APPLICATION_IMAGE_BASE}/special-hazardous-textile-production-inspection-application.webp`,
        imageAlt: "Textile factory production machinery from the TEX-LED catalogue section",
      },
      {
        title: "Thread Quality Control",
        description: "Inspection of thread defects that may not be visible under normal production lighting.",
        image: `${APPLICATION_IMAGE_BASE}/special-hazardous-thread-quality-control-application.webp`,
        imageAlt: "Thread inspection under specialised TEX-LED lighting",
      },
      {
        title: "Vehicle Paint Inspection",
        description: "Colour matching and surface-finish inspection before and after automotive painting.",
        image: `${APPLICATION_IMAGE_BASE}/special-hazardous-vehicle-paint-inspection-application.webp`,
        imageAlt: "Vehicle paint surface being inspected with AUTO-LED lighting",
      },
    ],
    supportCta: {
      eyebrow: "Technical Support",
      title: "Need help selecting lighting for a specialised environment?",
      description:
        "Our technical team can help identify the appropriate family for hazardous, controlled-growing, textile or automotive inspection requirements.",
      action: "Talk to Our Technical Team",
    },
  },
  ua: {
    metadata: {
      title: "Спеціальне освітлення та освітлення небезпечних зон | LED-системи | InfraVolt",
      description:
        "Чотири реальні сімейства GERSAN для небезпечних промислових зон, теплиць, текстильного контролю та контролю автомобільного фарбування.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "LED-системи",
      current: "Спеціальне освітлення та освітлення небезпечних зон",
    },
    backToLedSystemsLabel: "Назад до LED-систем",
    hero: {
      eyebrow: "LED-СИСТЕМИ",
      title: "Спеціальне освітлення та освітлення небезпечних зон",
      description:
        "Спеціалізоване освітлення для небезпечних промислових зон, контрольованого вирощування, текстильного контролю та контролю автомобільного фарбування.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    technicalSnapshotHeading: "Огляд категорії",
    technicalSnapshot: [
      { icon: "power", label: "Спеціалізований портфель", value: "Чотири каталожні сімейства" },
      { icon: "output", label: "Світло для конкретних завдань", value: "Exproof · Рослинництво · Контроль" },
      { icon: "protection", label: "Захищені сімейства", value: "Клас перевіряється для кожної серії", caption: "Без універсального рейтингу категорії" },
      { icon: "control", label: "Середовища використання", value: "Промислові · Контрольовані · Спеціальні" },
    ],
    seriesHeading: "Продуктові серії в цій системі",
    seriesIntroduction: "Чотири окремі каталожні сімейства для різних спеціалізованих середовищ.",
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: [
      {
        slug: "gersan-exproof-led-lighting-systems", href: "/products/led-systems/special-hazardous-environment-lighting/gersan-exproof-led-lighting-systems", number: "01", name: "GERSAN Exproof LED Lighting Systems",
        description: "Сімейство для небезпечних зон із каталожними формами GSL EXP та LED-BUS Exproof, включно з GSL EXP-150W і LED-BUS LDBEXP8.",
        features: [{ icon: "applications", label: "Сімейство для небезпечних зон" }, { icon: "protection", label: "Окремі посилання IP65 / IP66" }, { icon: "rugged-body", label: "9 GSL EXP · 8 LED-BUS LDBEXP моделей" }],
        image: `${SERIES_IMAGE_BASE}/gersan-exproof-led-category-card.webp`, imageAlt: "Каталожні світильники LED-BUS Exproof",
      },
      {
        slug: "gersan-sera-led-greenhouse-luminaires", href: "/products/led-systems/special-hazardous-environment-lighting/gersan-sera-led-greenhouse-luminaires", number: "02", name: "GERSAN Sera-LED Greenhouse Luminaires",
        description: "Тепличні світильники LED-BUS-S80W і LED-BUS-S180W для додаткового освітлення рослин у контрольованому середовищі.",
        features: [{ icon: "applications", label: "Тепличне застосування" }, { icon: "protection", label: "IP66" }, { icon: "tempered-glass", label: "Алюміній · Загартоване скло" }],
        image: `${SERIES_IMAGE_BASE}/gersan-sera-led-category-card.webp`, imageAlt: "Лінійний тепличний світильник GERSAN Sera-LED",
      },
      {
        slug: "gersan-tex-led-lighting-systems", href: "/products/led-systems/special-hazardous-environment-lighting/gersan-tex-led-lighting-systems", number: "03", name: "GERSAN TEX-LED Lighting Systems",
        description: "Спеціалізоване промислове освітлення для контролю тканин і ниток, представлене трьома точними каталожними моделями.",
        features: [{ icon: "applications", label: "Текстильний контроль" }, { icon: "protection", label: "IP66" }, { icon: "high-output", label: "TEX-LED 3UV · 5UV · 10UV" }],
        image: `${SERIES_IMAGE_BASE}/gersan-tex-led-category-card.webp`, imageAlt: "Лінійний світильник GERSAN TEX-LED",
      },
      {
        slug: "gersan-auto-led-lighting-systems", href: "/products/led-systems/special-hazardous-environment-lighting/gersan-auto-led-lighting-systems", number: "04", name: "GERSAN AUTO-LED Lighting Systems",
        description: "Освітлення для контролю автомобільної фарби, відповідності кольору та виявлення дефектів поверхні в сервісному середовищі.",
        features: [{ icon: "applications", label: "Контроль автомобільної фарби" }, { icon: "protection", label: "IP66" }, { icon: "high-output", label: "AUTO-LED 3UV · 5UV · 10UV" }],
        image: `${SERIES_IMAGE_BASE}/gersan-auto-led-category-card.webp`, imageAlt: "Лінійний світильник GERSAN AUTO-LED",
      },
    ],
    applicationsHeading: "Типові спеціалізовані застосування",
    applications: [
      { title: "Небезпечні промислові зони", description: "Освітлення сімейства Exproof для складних промислових середовищ із каталогу.", image: `${APPLICATION_IMAGE_BASE}/exproof-industrial-application.webp`, imageAlt: "Нафтохімічне промислове середовище з розділу Exproof" },
      { title: "Теплиці", description: "Додаткове освітлення рослин за недостатнього природного світла.", image: `${APPLICATION_IMAGE_BASE}/sera-led-greenhouse-application.webp`, imageAlt: "Теплиця зі світильниками Sera-LED" },
      { title: "Контрольоване вирощування", description: "Світловий дизайн відповідно до виду рослин і планування простору.", image: `${APPLICATION_IMAGE_BASE}/special-hazardous-controlled-growing-environments-application.webp`, imageAlt: "Контрольоване середовище вирощування з освітленням для рослин" },
      { title: "Контроль текстильного виробництва", description: "Спеціальне освітлення для перевірки якості тканин і ниток.", image: `${APPLICATION_IMAGE_BASE}/special-hazardous-textile-production-inspection-application.webp`, imageAlt: "Текстильне виробництво з розділу TEX-LED" },
      { title: "Контроль якості ниток", description: "Виявлення дефектів ниток, невидимих за звичайного освітлення.", image: `${APPLICATION_IMAGE_BASE}/special-hazardous-thread-quality-control-application.webp`, imageAlt: "Контроль ниток під освітленням TEX-LED" },
      { title: "Контроль автомобільної фарби", description: "Зіставлення кольорів і перевірка поверхні до та після фарбування.", image: `${APPLICATION_IMAGE_BASE}/special-hazardous-vehicle-paint-inspection-application.webp`, imageAlt: "Перевірка автомобільної фарби за допомогою AUTO-LED" },
    ],
    supportCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібна допомога з вибором освітлення для спеціалізованого середовища?",
      description: "Наша технічна команда допоможе визначити потрібне сімейство для небезпечних зон, вирощування, текстильного або автомобільного контролю.",
      action: "Звернутися до технічної команди",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedCategoryDetailContent>>;

export function specialHazardousEnvironmentLightingContentForMarket(
  market: MarketCode,
): LedCategoryDetailContent {
  return content[market];
}

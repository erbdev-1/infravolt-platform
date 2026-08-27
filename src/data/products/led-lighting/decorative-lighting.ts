import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedCategoryDetailContent } from "./types";

const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/decorative");
const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;
const CARD_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/card`;

export const DECORATIVE_LIGHTING_HERO_BACKGROUND =
  `${CATEGORY_ASSET_BASE}/hero/decorative-lighting-hero-background.webp`;
export const DECORATIVE_LIGHTING_HERO_BACKGROUND_ALT =
  "Architectural hospitality interior illuminated by decorative ring luminaires";
export const DECORATIVE_LIGHTING_HERO_FOREGROUND =
  `${CATEGORY_ASSET_BASE}/hero/decorative-lighting-hero-foreground-products.webp`;
export const DECORATIVE_LIGHTING_HERO_FOREGROUND_ALT =
  "ROUND 3 RING 25, SQUARE 2 RING 25 and SQUARE RING 55 UP&DOWN T decorative luminaires";
export const DECORATIVE_LIGHTING_CATEGORY_CARD_IMAGE =
  `${CATEGORY_ASSET_BASE}/card/decorative-lighting-category-card.webp`;
export const DECORATIVE_LIGHTING_CATEGORY_CARD_IMAGE_ALT =
  "Decorative ring luminaires in an architectural hospitality interior";
export const DECORATIVE_LIGHTING_SUPPORT_CTA_IMAGE = DECORATIVE_LIGHTING_HERO_BACKGROUND;
export const DECORATIVE_LIGHTING_SUPPORT_CTA_IMAGE_ALT = DECORATIVE_LIGHTING_HERO_BACKGROUND_ALT;

const ukSeries = [
  {
    slug: "rn-decorative-series",
    href: "/products/led-systems/decorative-lighting/rn-decorative-series",
    number: "01",
    name: "RN Decorative Series",
    description:
      "Round decorative luminaires for general illumination in contemporary interior projects.",
    features: [
      { icon: "surface-mount", label: "Round Architectural Form" },
      { icon: "optics", label: "Opal Diffuser" },
      { icon: "applications", label: "Interior General Lighting" },
    ],
    image: `${CARD_IMAGE_BASE}/rn-decorative-series-category-card.webp`,
    imageAlt: "Round RN decorative luminaire from the LEDBUS catalogue",
  },
  {
    slug: "vl-decorative-series",
    href: "/products/led-systems/decorative-lighting/vl-decorative-series",
    number: "02",
    name: "VL Decorative Series",
    description:
      "Compact decorative luminaire with a softly illuminated form for feature-led interiors.",
    features: [
      { icon: "slim-body", label: "Compact Decorative Form" },
      { icon: "optics", label: "Opal Diffuser" },
      { icon: "applications", label: "Feature Interior Lighting" },
    ],
    image: `${CARD_IMAGE_BASE}/vl-decorative-series-category-card.webp`,
    imageAlt: "Suspended VL decorative luminaire from the LEDBUS catalogue",
  },
  {
    slug: "round-ring-series",
    href: "/products/led-systems/decorative-lighting/round-ring-series",
    number: "03",
    name: "Round Ring Series",
    description:
      "Catalogue round-ring luminaires in single and multi-ring suspended compositions for architectural interiors.",
    features: [
      { icon: "suspension", label: "Suspended Ring Forms" },
      { icon: "multi-lens", label: "Single / Multi-Ring Designs" },
      { icon: "control", label: "Series-Specific Control Options" },
    ],
    image: `${CARD_IMAGE_BASE}/round-ring-series-category-card.webp`,
    imageAlt: "Three-ring suspended decorative luminaire",
  },
  {
    slug: "square-ring-series",
    href: "/products/led-systems/decorative-lighting/square-ring-series",
    number: "04",
    name: "Square Ring Series",
    description:
      "Geometric square-ring luminaires in catalogue single- and double-ring suspended configurations.",
    features: [
      { icon: "suspension", label: "Suspended Installation" },
      { icon: "optics", label: "Geometric Light Frame" },
      { icon: "applications", label: "Architectural Interiors" },
    ],
    image: `${CARD_IMAGE_BASE}/square-ring-series-category-card.webp`,
    imageAlt: "SQUARE RING 80 surface-mounted decorative luminaire",
  },
  {
    slug: "up-down-architectural-ring-series",
    href: "/products/led-systems/decorative-lighting/up-down-architectural-ring-series",
    number: "05",
    name: "Up & Down / Architectural Ring Series",
    description:
      "Architectural ring forms with catalogue up-and-down light distribution configurations.",
    features: [
      { icon: "high-output", label: "Up & Down Illumination" },
      { icon: "suspension", label: "Suspended Architectural Form" },
      { icon: "control", label: "Catalogue Control Options" },
    ],
    image: `${CARD_IMAGE_BASE}/architectural-up-down-ring-series-category-card.webp`,
    imageAlt: "SQUARE RING suspended up-and-down decorative luminaire",
  },
  {
    slug: "decorative-bollard-lighting",
    href: "/products/led-systems/decorative-lighting/decorative-bollard-lighting",
    number: "06",
    name: "Decorative Bollard Lighting",
    description:
      "Catalogue outdoor bollards for paths, entrances and landscape illumination, with protection defined by model.",
    features: [
      { icon: "rugged-body", label: "Outdoor Bollard Construction" },
      { icon: "protection", label: "Model-Specific IP Protection" },
      { icon: "applications", label: "Paths / Entrances" },
    ],
    image: `${CARD_IMAGE_BASE}/decorative-bollard-lighting-category-card.webp`,
    imageAlt: "Cylindrical IP66 decorative bollard luminaire",
  },
  {
    slug: "decorative-pole-lighting",
    href: "/products/led-systems/decorative-lighting/decorative-pole-lighting",
    number: "07",
    name: "Decorative Pole Lighting",
    description:
      "Architectural pole luminaires for pedestrian and public-space projects, including catalogue control options on selected models.",
    features: [
      { icon: "rugged-body", label: "Architectural Pole Form" },
      { icon: "control", label: "Model-Specific Control Options" },
      { icon: "protection", label: "Catalogue IP65 Configuration" },
    ],
    image: `${CARD_IMAGE_BASE}/decorative-pole-lighting-category-card.webp`,
    imageAlt: "Architectural LED decorative pole luminaire",
  },
  {
    slug: "park-landscape-pole-systems",
    href: "/products/led-systems/decorative-lighting/park-landscape-pole-systems",
    number: "08",
    name: "Park & Landscape Pole Systems",
    description:
      "Multi-directional decorative pole systems for parks, landscapes and public pedestrian areas.",
    features: [
      { icon: "multi-lens", label: "Multi-Directional Pole Heads" },
      { icon: "applications", label: "Parks / Public Spaces" },
      { icon: "protection", label: "Outdoor Construction" },
    ],
    image: `${CARD_IMAGE_BASE}/park-landscape-pole-systems-category-card.webp`,
    imageAlt: "Four-head park and landscape pole luminaire",
  },
] as const;

const uaSeriesDescriptions = [
  "Круглі декоративні світильники для загального освітлення сучасних інтер’єрних проєктів.",
  "Сімейство підвісних декоративних світильників із компактною світловою формою для акцентних інтер’єрів.",
  "Каталожні круглі кільцеві світильники в одинарних і багатокільцевих підвісних композиціях.",
  "Геометричні квадратні кільцеві світильники в каталожних накладних і підвісних конфігураціях.",
  "Архітектурні кільцеві форми з каталожними конфігураціями верхнього та нижнього світлорозподілу.",
  "Каталожні зовнішні боларди для доріжок, входів і ландшафтів із захистом, визначеним для кожної моделі.",
  "Архітектурні опори для пішохідних і громадських просторів із каталожними опціями керування для окремих моделей.",
  "Багатонапрямні декоративні опори для парків, ландшафтів і громадських пішохідних зон.",
] as const;

const uaSeriesFeatureLabels = [
  ["Кругла архітектурна форма", "Опаловий розсіювач", "Загальне освітлення інтер’єрів"],
  ["Підвісний монтаж", "Компактна декоративна форма", "Акцентне освітлення інтер’єрів"],
  ["Підвісні кільцеві форми", "Одинарні / багатокільцеві конструкції", "Опції керування залежать від серії"],
  ["Накладні / підвісні форми", "Геометрична світлова рамка", "Архітектурні інтер’єри"],
  ["Верхнє та нижнє освітлення", "Підвісна архітектурна форма", "Каталожні опції керування"],
  ["Зовнішня конструкція боларда", "IP-захист залежить від моделі", "Доріжки / входи"],
  ["Архітектурна форма опори", "Опції керування залежать від моделі", "Каталожна конфігурація IP65"],
  ["Багатонапрямні головки", "Парки / громадські простори", "Зовнішня конструкція"],
] as const;

const uaSeriesImageAlts = [
  "Круглий декоративний світильник RN із каталогу LEDBUS",
  "Підвісний декоративний світильник VL із каталогу LEDBUS",
  "Підвісний декоративний світильник із трьома кільцями",
  "Накладний декоративний світильник SQUARE RING 80",
  "Підвісний світильник SQUARE RING із верхнім і нижнім світлом",
  "Циліндричний декоративний болард IP66",
  "Архітектурна декоративна LED-опора",
  "Паркова й ландшафтна опора з чотирма головками",
] as const;

const uaSeries = ukSeries.map((series, seriesIndex) => ({
  ...series,
  description: uaSeriesDescriptions[seriesIndex] ?? series.description,
  imageAlt: uaSeriesImageAlts[seriesIndex] ?? series.imageAlt,
  features: series.features.map((feature, featureIndex) => ({
    ...feature,
    label: uaSeriesFeatureLabels[seriesIndex]?.[featureIndex] ?? feature.label,
  })),
}));

const content = {
  uk: {
    metadata: {
      title: "Decorative Lighting | LED Systems | LEDBUS by Gersan | InfraVolt",
      description:
        "Catalogue-verified decorative interior luminaires, architectural ring lighting, bollards and decorative pole systems.",
    },
    breadcrumbs: { home: "Home", products: "Products", ledSystems: "LED Systems", current: "Decorative Lighting" },
    backToLedSystemsLabel: "Back to LED Systems",
    hero: {
      eyebrow: "LED SYSTEMS",
      title: "Decorative Lighting",
      description:
        "Design-led interior luminaires, architectural ring forms and outdoor decorative pole systems for commercial, hospitality and landscape projects.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    technicalSnapshotHeading: "Category Overview",
    technicalSnapshot: [
      { icon: "power", label: "Decorative Forms", value: "Round · Square · Ring · Bollard · Pole", caption: "Forms vary by catalogue family" },
      { icon: "output", label: "Installation Flexibility", value: "Suspended · Surface · Outdoor Ground-Mounted", caption: "Series-specific configurations" },
      { icon: "protection", label: "Optical & Diffuser Design", value: "Opal diffusers and architectural light frames", caption: "According to product family" },
      { icon: "control", label: "Interior + Exterior", value: "Feature interiors, pedestrian areas and landscapes", caption: "Protection and controls vary by model" },
    ],
    seriesHeading: "Product Series",
    seriesIntroduction:
      "Eight catalogue-grounded decorative lighting families organised by interior, ring and outdoor use.",
    seriesGroups: [
      { heading: "Decorative Interior Luminaires", seriesSlugs: ["rn-decorative-series", "vl-decorative-series"] },
      { heading: "Decorative Ring Lighting", seriesSlugs: ["round-ring-series", "square-ring-series", "up-down-architectural-ring-series"] },
      { heading: "Outdoor Decorative Lighting", seriesSlugs: ["decorative-bollard-lighting", "decorative-pole-lighting", "park-landscape-pole-systems"] },
    ],
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: ukSeries,
    applicationsHeading: "Typical Applications",
    applications: [
      { title: "Commercial Interiors", description: "Decorative focal and general lighting for commercial interior schemes.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-commercial-interiors.webp`, imageAlt: "Catalogue decorative luminaires in a commercial interior" },
      { title: "Hospitality & Architectural Spaces", description: "Suspended rings and decorative forms for hospitality and architectural interiors.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-hospitality-architectural-spaces.webp`, imageAlt: "Catalogue round-ring luminaires in an architectural interior" },
      { title: "Retail & Showrooms", description: "Feature lighting for customer areas, displays and branded environments.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-retail-showrooms.webp`, imageAlt: "Catalogue decorative luminaires in a retail showroom interior" },
      { title: "Offices & Education", description: "Decorative and general interior lighting for shared work and learning spaces.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-offices-education.webp`, imageAlt: "Catalogue decorative luminaires in an office or education interior" },
      { title: "Entrances & Pedestrian Areas", description: "Outdoor pole and bollard lighting for approaches, paths and pedestrian zones.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-entrances-pedestrian-areas.webp`, imageAlt: "Catalogue decorative outdoor pole luminaires beside a pedestrian entrance" },
      { title: "Parks & Landscapes", description: "Decorative outdoor lighting for parks, planted areas and public landscapes.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-parks-landscapes.webp`, imageAlt: "Catalogue decorative pole lighting in an outdoor public-space project" },
    ],
    supportCta: {
      eyebrow: "Technical Support",
      title: "Need a Decorative Lighting Solution?",
      description: "Our technical team can help identify the appropriate interior decorative, ring, bollard or pole family for your project.",
      action: "Talk to Our Technical Team",
    },
  },
  ua: {
    metadata: {
      title: "Декоративне освітлення | LED-системи | LEDBUS від Gersan | InfraVolt",
      description: "Каталожно підтверджені декоративні світильники для інтер’єрів, кільцеве освітлення, боларди та декоративні опори.",
    },
    breadcrumbs: { home: "Головна", products: "Продукція", ledSystems: "LED-системи", current: "Декоративне освітлення" },
    backToLedSystemsLabel: "Назад до LED-систем",
    hero: {
      eyebrow: "LED-СИСТЕМИ",
      title: "Декоративне освітлення",
      description: "Дизайнерські інтер’єрні світильники, архітектурні кільцеві форми та зовнішні декоративні опори для комерційних, готельних і ландшафтних проєктів.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    technicalSnapshotHeading: "Огляд категорії",
    technicalSnapshot: [
      { icon: "power", label: "Декоративні форми", value: "Круглі · Квадратні · Кільцеві · Боларди · Опори", caption: "Форми залежать від каталожної серії" },
      { icon: "output", label: "Гнучкість монтажу", value: "Підвісний · Накладний · Наземний зовнішній", caption: "Конфігурації залежать від серії" },
      { icon: "protection", label: "Оптика та розсіювач", value: "Опалові розсіювачі й архітектурні світлові рамки", caption: "Відповідно до сімейства виробів" },
      { icon: "control", label: "Інтер’єр + екстер’єр", value: "Акцентні інтер’єри, пішохідні зони та ландшафти", caption: "Захист і керування залежать від моделі" },
    ],
    seriesHeading: "Серії продукції",
    seriesIntroduction: "Вісім підтверджених каталогом сімейств для інтер’єрного, кільцевого та зовнішнього декоративного освітлення.",
    seriesGroups: [
      { heading: "Декоративні інтер’єрні світильники", seriesSlugs: ["rn-decorative-series", "vl-decorative-series"] },
      { heading: "Декоративне кільцеве освітлення", seriesSlugs: ["round-ring-series", "square-ring-series", "up-down-architectural-ring-series"] },
      { heading: "Зовнішнє декоративне освітлення", seriesSlugs: ["decorative-bollard-lighting", "decorative-pole-lighting", "park-landscape-pole-systems"] },
    ],
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: uaSeries,
    applicationsHeading: "Типові сфери застосування",
    applications: [
      { title: "Комерційні інтер’єри", description: "Декоративне акцентне та загальне освітлення комерційних інтер’єрів.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-commercial-interiors.webp`, imageAlt: "Каталожні декоративні світильники в комерційному інтер’єрі" },
      { title: "Готельні й архітектурні простори", description: "Підвісні кільця та декоративні форми для готельних і архітектурних інтер’єрів.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-hospitality-architectural-spaces.webp`, imageAlt: "Каталожні кільцеві світильники в архітектурному інтер’єрі" },
      { title: "Роздрібна торгівля та шоуруми", description: "Акцентне освітлення клієнтських зон, експозицій і брендованих просторів.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-retail-showrooms.webp`, imageAlt: "Каталожні декоративні світильники в інтер'єрі шоуруму" },
      { title: "Офіси та освіта", description: "Декоративне й загальне освітлення спільних робочих та навчальних просторів.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-offices-education.webp`, imageAlt: "Каталожні декоративні світильники в офісному чи освітньому інтер'єрі" },
      { title: "Входи та пішохідні зони", description: "Зовнішні опори й боларди для підходів, доріжок та пішохідних зон.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-entrances-pedestrian-areas.webp`, imageAlt: "Каталожні декоративні опори біля пішохідного входу" },
      { title: "Парки та ландшафти", description: "Декоративне зовнішнє освітлення парків, зелених зон і громадських ландшафтів.", image: `${APPLICATION_IMAGE_BASE}/decorative-lighting-application-parks-landscapes.webp`, imageAlt: "Каталожне декоративне освітлення опорами у громадському просторі" },
    ],
    supportCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібне рішення декоративного освітлення?",
      description: "Наша технічна команда допоможе визначити відповідне сімейство інтер’єрних, кільцевих, болардних або опорних світильників.",
      action: "Звернутися до технічної команди",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedCategoryDetailContent>>;

export function decorativeLightingContentForMarket(market: MarketCode): LedCategoryDetailContent {
  return content[market];
}

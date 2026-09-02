import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedCategoryDetailContent } from "./types";

const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/emergency-guidance");
const CARD_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/card`;
const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;

export const EMERGENCY_GUIDANCE_HERO_BACKGROUND =
  `${CATEGORY_ASSET_BASE}/hero/emergency-guidance-lighting-hero-background.webp`;
export const EMERGENCY_GUIDANCE_HERO_BACKGROUND_ALT =
  "Professional building corridor with illuminated emergency exit guidance and emergency lighting";
export const EMERGENCY_GUIDANCE_HERO_FOREGROUND =
  `${CATEGORY_ASSET_BASE}/hero/emergency-guidance-lighting-hero-foreground-products.webp`;
export const EMERGENCY_GUIDANCE_HERO_FOREGROUND_ALT =
  "ARL and LPL emergency exit signs with an ELH emergency spotlight";
export const EMERGENCY_GUIDANCE_CATEGORY_CARD_IMAGE =
  `${CATEGORY_ASSET_BASE}/card/emergency-guidance-lighting-category-card.webp`;
export const EMERGENCY_GUIDANCE_CATEGORY_CARD_IMAGE_ALT =
  "Emergency exit guidance and route lighting in a public-building corridor";
export const EMERGENCY_GUIDANCE_SUPPORT_CTA_IMAGE = EMERGENCY_GUIDANCE_CATEGORY_CARD_IMAGE;
export const EMERGENCY_GUIDANCE_SUPPORT_CTA_IMAGE_ALT =
  EMERGENCY_GUIDANCE_CATEGORY_CARD_IMAGE_ALT;

const ukSeries = [
  {
    slug: "arl-exit-sign-series",
    number: "01",
    name: "ARL Exit Sign Series",
    description:
      "ARL exit-sign family, including source forms such as LDB ARL N1 DA 3H P.... and the corresponding /ST and /DL variants.",
    features: [
      { icon: "applications", label: "30 m Guidance Visibility" },
      { icon: "control", label: "Maintained / Non-Maintained Options" },
      { icon: "control", label: "DALI / Self-Test Variants" },
    ],
    image: `${CARD_IMAGE_BASE}/arl-exit-sign-series-category-card.webp`,
    imageAlt: "ARL emergency exit sign with catalogue mounting configurations",
    href: "/products/led-systems/emergency-guidance-lighting/arl-exit-sign-series",
  },
  {
    slug: "mal-exit-sign-series",
    number: "02",
    name: "MAL Exit Sign Series",
    description:
      "Compact MAL exit-sign family, including LDB MAL N1 DA 3H P...., maintained forms and source-identified /ST and /DL variants.",
    features: [
      { icon: "slim-body", label: "Compact Exit-Sign Family" },
      { icon: "control", label: "Maintained / Non-Maintained Variants" },
      { icon: "mounting-options", label: "Mounting / Monitoring Configurations" },
    ],
    image: `${CARD_IMAGE_BASE}/mal-exit-sign-series-category-card.webp`,
    imageAlt: "MAL emergency exit sign with wall, ceiling and suspended mounting configurations",
    href: "/products/led-systems/emergency-guidance-lighting/mal-exit-sign-series",
  },
  {
    slug: "hpl-exit-guidance-series",
    number: "03",
    name: "HPL Exit & Guidance Series",
    description:
      "HPL exit and directional-guidance family, including source forms such as LDB HPL N2 DA 3H P.... and the corresponding TD, /ST and /DL variants.",
    features: [
      { icon: "applications", label: "Directional Guidance Systems" },
      { icon: "mounting-options", label: "Rear-Wall / Ceiling Mounting" },
      { icon: "control", label: "Maintained / Monitored Variants" },
    ],
    image: `${CARD_IMAGE_BASE}/hpl-exit-guidance-series-category-card.webp`,
    imageAlt: "HPL catalogue emergency exit guidance sign",
    href: "/products/led-systems/emergency-guidance-lighting/hpl-exit-guidance-series",
  },
  {
    slug: "srs-exit-guidance-series",
    number: "04",
    name: "SRS Exit & Guidance Series",
    description:
      "SRS exit and directional-guidance family, including source forms such as LDB SRS N1 DA 3H P.... and the corresponding /ST and /DL variants.",
    features: [
      { icon: "applications", label: "Directional Guidance Systems" },
      { icon: "mounting-options", label: "Wall-Mounted Guidance" },
      { icon: "control", label: "Maintained / Monitored Variants" },
    ],
    image: `${CARD_IMAGE_BASE}/srs-exit-guidance-series-category-card.webp`,
    imageAlt: "SRS catalogue emergency exit guidance sign",
    href: "/products/led-systems/emergency-guidance-lighting/srs-exit-guidance-series",
  },
  {
    slug: "eml-twin-spot-emergency-lighting",
    number: "05",
    name: "EML Twin-Spot Emergency Lighting",
    description:
      "Twin-spot EML family covering verified models LDB EML 1021, LDB EML 1023, LDB EML/ST 323 and LDB EML/DL 323.",
    features: [
      { icon: "adjustable-angle", label: "Twin Adjustable Emergency Heads" },
      { icon: "efficiency", label: "1 h / 3 h Model Options" },
      { icon: "mounting-options", label: "Wall / Ceiling Lighting" },
    ],
    image: `${CARD_IMAGE_BASE}/eml-twin-spot-emergency-lighting-category-card.webp`,
    imageAlt: "EML twin-spot emergency luminaire with two adjustable LED heads",
    href: "/products/led-systems/emergency-guidance-lighting/eml-twin-spot-emergency-lighting",
  },
  {
    slug: "elh-high-output-emergency-spot-series",
    number: "06",
    name: "ELH High-Output Emergency Spot Series",
    description:
      "High-output ELH family from LDB ELHA 211 through LDB ELHC 523, with output and battery configurations defined per model.",
    features: [
      { icon: "high-output", label: "High-Output Emergency Lighting" },
      { icon: "multi-lens", label: "Multiple Lamp / Output Configurations" },
      { icon: "efficiency", label: "1 h / 3 h Model-Specific Operation" },
    ],
    image: `${CARD_IMAGE_BASE}/elh-high-output-emergency-spot-series-category-card.webp`,
    imageAlt: "ELH high-output emergency spotlight system with single and twin heads",
    href: "/products/led-systems/emergency-guidance-lighting/elh-high-output-emergency-spot-series",
  },
  {
    slug: "15w-emergency-linear-bulkhead-luminaires",
    number: "07",
    name: "15W Emergency Linear & Bulkhead Luminaires",
    description:
      "One website group for verified 15 W families including LDB INKL 15W HF 3H 4K, LDB INL 15W 4K and LDB NMSL 15W HF 3H 4K.",
    features: [
      { icon: "high-output", label: "15 W Emergency Families" },
      { icon: "surface-mount", label: "Linear / Bulkhead Forms" },
      { icon: "control", label: "Emergency / Normal-Lighting Variants" },
    ],
    image: `${CARD_IMAGE_BASE}/15w-emergency-linear-bulkhead-luminaires-category-card.webp`,
    imageAlt: "15 W emergency linear or bulkhead luminaire from the LEDBUS catalogue",
    href: "/products/led-systems/emergency-guidance-lighting/15w-emergency-linear-bulkhead-luminaires",
  },
] as const;

const uaDescriptions = [
  "Сімейство вихідних знаків ARL, включно з вихідними формами LDB ARL N1 DA 3H P.... та відповідними варіантами /ST і /DL.",
  "Компактне сімейство MAL, включно з LDB MAL N1 DA 3H P...., підтримуваними режимами й визначеними джерелом варіантами /ST та /DL.",
  "Сімейство вихідного та напрямного орієнтування HPL, включно з вихідними формами LDB HPL N2 DA 3H P.... та відповідними варіантами TD, /ST і /DL.",
  "Сімейство вихідного та напрямного орієнтування SRS, включно з вихідними формами LDB SRS N1 DA 3H P.... та відповідними варіантами /ST і /DL.",
  "Двопрожекторне сімейство EML із підтвердженими моделями LDB EML 1021, LDB EML 1023, LDB EML/ST 323 і LDB EML/DL 323.",
  "Високопотужне сімейство ELH від LDB ELHA 211 до LDB ELHC 523; світловий потік і батарея визначаються для кожної моделі.",
  "Єдина вебгрупа підтверджених сімейств 15 Вт, включно з LDB INKL 15W HF 3H 4K, LDB INL 15W 4K і LDB NMSL 15W HF 3H 4K.",
] as const;

const uaFeatureLabels = [
  ["Видимість орієнтування 30 м", "Підтримувані / непідтримувані режими", "Варіанти DALI / Self-Test"],
  ["Компактне сімейство знаків", "Підтримувані / непідтримувані варіанти", "Конфігурації монтажу / моніторингу"],
  ["Системи напрямного орієнтування", "Настінний / стельовий монтаж", "Підтримувані / контрольовані варіанти"],
  ["Системи напрямного орієнтування", "Настінний монтаж", "Підтримувані / контрольовані варіанти"],
  ["Дві регульовані аварійні головки", "Моделі на 1 год / 3 год", "Настінне / стельове освітлення"],
  ["Високопотужне аварійне освітлення", "Кілька конфігурацій ламп / потужності", "Робота 1 год / 3 год залежно від моделі"],
  ["Аварійні сімейства 15 Вт", "Лінійні / корпусні форми", "Аварійні / звичайні варіанти"],
] as const;

const uaSeries = ukSeries.map((series, seriesIndex) => ({
  ...series,
  description: uaDescriptions[seriesIndex] ?? series.description,
  features: series.features.map((feature, featureIndex) => ({
    ...feature,
    label: uaFeatureLabels[seriesIndex]?.[featureIndex] ?? feature.label,
  })),
}));

const content = {
  uk: {
    metadata: {
      title: "Emergency & Guidance Lighting | LED Systems | LEDBUS by Gersan | InfraVolt",
      description:
        "Catalogue-verified emergency lighting systems — exit signs, directional guidance, twin-spot systems, high-output emergency spots and 15 W emergency luminaires.",
    },
    breadcrumbs: { home: "Home", products: "Products", ledSystems: "LED Systems", current: "Emergency & Guidance Lighting" },
    backToLedSystemsLabel: "Back to LED Systems",
    hero: {
      eyebrow: "LED SYSTEMS",
      title: "Emergency & Guidance Lighting",
      description:
        "Emergency exit guidance, directional signage and emergency lighting systems designed to maintain visibility and support evacuation during mains failure.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    technicalSnapshotHeading: "Category Overview",
    technicalSnapshot: [
      { icon: "power", label: "Emergency Operation", value: "Maintained and non-maintained configurations", caption: "1 h / 3 h options on supported families" },
      { icon: "output", label: "Exit & Directional Guidance", value: "Multiple sign formats, pictograms and mounting forms", caption: "Viewing distance is family-specific" },
      { icon: "control", label: "Monitoring & Testing", value: "Family-specific monitoring and test options", caption: "DALI and Self-Test where supported" },
      { icon: "protection", label: "Emergency Energy & Status", value: "Family-specific battery and status systems", caption: "Chemistry and indication vary by product" },
    ],
    seriesHeading: "Product Series",
    seriesIntroduction:
      "Seven customer-facing emergency and guidance families selected from catalogue pages 111–124.",
    seriesGroups: [
      { heading: "Emergency Exit & Guidance Signs", seriesSlugs: ["arl-exit-sign-series", "mal-exit-sign-series", "hpl-exit-guidance-series", "srs-exit-guidance-series"] },
      { heading: "Emergency Lighting", seriesSlugs: ["eml-twin-spot-emergency-lighting", "elh-high-output-emergency-spot-series", "15w-emergency-linear-bulkhead-luminaires"] },
    ],
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: ukSeries,
    applicationsHeading: "Typical Applications",
    applications: [
      { title: "Escape Routes & Corridors", description: "Emergency guidance and illumination for designated evacuation paths and circulation routes.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-escape-routes-corridors.webp`, imageAlt: "Illuminated exit sign guiding along a corridor and stairwell" },
      { title: "Stairwells", description: "Emergency illumination and directional guidance for vertical escape routes.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-stairwells.webp`, imageAlt: "Exit signs and emergency lighting on a stairwell" },
      { title: "Exit Doors & Directional Points", description: "Exit signs and directional guidance at route changes and final exits.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-exit-doors-directional-points.webp`, imageAlt: "Directional exit signs at a corridor junction and exit door" },
      { title: "Open & Public Areas", description: "Emergency illumination for larger occupied interior spaces where visibility must be maintained.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-open-public-areas.webp`, imageAlt: "Exit signage in a large open public building atrium" },
      { title: "Commercial & Public Buildings", description: "Guidance and emergency lighting for offices, retail, education and public-building environments where appropriate.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-commercial-public-buildings.webp`, imageAlt: "Exit sign in a commercial office corridor" },
      { title: "Large & Critical Areas", description: "Higher-output emergency spotlight solutions for larger spaces and critical zones.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-large-critical-areas.webp`, imageAlt: "Emergency exit lighting in a large warehouse or industrial hall" },
    ],
    supportCta: {
      eyebrow: "Technical Support",
      title: "Need an Emergency & Guidance Lighting Solution?",
      description: "Our team can help identify the appropriate exit-sign, emergency luminaire or high-output emergency-lighting family for your project.",
      action: "Talk to Our Technical Team",
    },
  },
  ua: {
    metadata: {
      title: "Аварійне та евакуаційне освітлення | LED-системи | LEDBUS від Gersan | InfraVolt",
      description: "Системи аварійного освітлення LEDBUS від Gersan: світлові покажчики «ВИХІД», напрямні покажчики та аварійні LED-світильники для шляхів евакуації та зон безпеки.",
    },
    breadcrumbs: { home: "Головна", products: "Продукція", ledSystems: "LED-системи", current: "Аварійне та евакуаційне освітлення" },
    backToLedSystemsLabel: "Назад до LED-систем",
    hero: {
      eyebrow: "LED-СИСТЕМИ",
      title: "Аварійне та евакуаційне освітлення",
      description: "Вихідні та напрямні знаки й аварійні світильники для збереження видимості та підтримки евакуації у разі зникнення основного живлення.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    technicalSnapshotHeading: "Огляд категорії",
    technicalSnapshot: [
      { icon: "power", label: "Аварійна робота", value: "Підтримувані та непідтримувані конфігурації", caption: "Опції 1 год / 3 год у підтримуваних сімействах" },
      { icon: "output", label: "Вихідне й напрямне орієнтування", value: "Кілька форматів знаків, піктограм і монтажу", caption: "Дальність видимості залежить від сімейства" },
      { icon: "control", label: "Моніторинг і тестування", value: "Опції моніторингу й тестування залежать від сімейства", caption: "DALI та Self-Test, де підтримуються" },
      { icon: "protection", label: "Аварійна енергія та стан", value: "Батареї та індикація залежать від сімейства", caption: "Хімія й індикація відрізняються за виробом" },
    ],
    seriesHeading: "Серії продукції",
    seriesIntroduction: "Сім клієнтських сімейств аварійного та евакуаційного освітлення зі сторінок каталогу 111–124.",
    seriesGroups: [
      { heading: "Знаки виходу та евакуаційного орієнтування", seriesSlugs: ["arl-exit-sign-series", "mal-exit-sign-series", "hpl-exit-guidance-series", "srs-exit-guidance-series"] },
      { heading: "Аварійне освітлення", seriesSlugs: ["eml-twin-spot-emergency-lighting", "elh-high-output-emergency-spot-series", "15w-emergency-linear-bulkhead-luminaires"] },
    ],
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: uaSeries,
    applicationsHeading: "Типові сфери застосування",
    applications: [
      { title: "Шляхи евакуації та коридори", description: "Аварійне орієнтування й освітлення визначених шляхів евакуації та циркуляції.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-escape-routes-corridors.webp`, imageAlt: "Освітлений знак виходу вздовж коридору та сходової клітки" },
      { title: "Сходові клітки", description: "Аварійне освітлення та напрямне орієнтування вертикальних шляхів евакуації.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-stairwells.webp`, imageAlt: "Знаки виходу та аварійне освітлення на сходовій клітці" },
      { title: "Вихідні двері та напрямні точки", description: "Вихідні знаки й орієнтування в місцях зміни маршруту та біля кінцевих виходів.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-exit-doors-directional-points.webp`, imageAlt: "Напрямні знаки виходу на перехресті коридорів і біля дверей" },
      { title: "Відкриті та громадські зони", description: "Аварійне освітлення більших зайнятих внутрішніх просторів, де потрібно зберігати видимість.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-open-public-areas.webp`, imageAlt: "Знаки виходу у великому відкритому атріумі громадської будівлі" },
      { title: "Комерційні та громадські будівлі", description: "Орієнтування й аварійне освітлення офісів, торгівлі, освіти та громадських будівель, де доречно.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-commercial-public-buildings.webp`, imageAlt: "Знак виходу в коридорі комерційної офісної будівлі" },
      { title: "Великі та критичні зони", description: "Високопотужні аварійні прожектори для більших просторів і критичних зон.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-large-critical-areas.webp`, imageAlt: "Аварійне освітлення виходу у великому складському чи промисловому приміщенні" },
    ],
    supportCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібне рішення аварійного та евакуаційного освітлення?",
      description: "Наша команда допоможе визначити відповідне сімейство вихідних знаків, аварійних світильників або високопотужного аварійного освітлення.",
      action: "Звернутися до технічної команди",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedCategoryDetailContent>>;

export function emergencyGuidanceLightingContentForMarket(
  market: MarketCode,
): LedCategoryDetailContent {
  return content[market];
}

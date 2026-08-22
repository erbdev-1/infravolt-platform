import type { MarketCode } from "@/modules/markets/types";

import type { LedCategoryDetailContent } from "./types";

const CATEGORY_ASSET_BASE = "/assets/products/led-lighting/category/outdorr&infrastructure";
const CARD_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/card`;
const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;

export const OUTDOOR_INFRASTRUCTURE_HERO_BACKGROUND =
  `${CATEGORY_ASSET_BASE}/hero/outdoor-infrastructure-lighting-hero-background.webp`;
export const OUTDOOR_INFRASTRUCTURE_HERO_BACKGROUND_ALT =
  "Illuminated road, tunnel and large-area infrastructure at night";
export const OUTDOOR_INFRASTRUCTURE_HERO_FOREGROUND =
  `${CATEGORY_ASSET_BASE}/hero/outdoor-infrastructure-lighting-hero-foreground-products.webp`;
export const OUTDOOR_INFRASTRUCTURE_HERO_FOREGROUND_ALT =
  "GER-LED outdoor floodlight, projector and GSL-TUNEL lighting products";
export const OUTDOOR_INFRASTRUCTURE_SUPPORT_CTA_IMAGE = OUTDOOR_INFRASTRUCTURE_HERO_BACKGROUND;
export const OUTDOOR_INFRASTRUCTURE_SUPPORT_CTA_IMAGE_ALT = OUTDOOR_INFRASTRUCTURE_HERO_BACKGROUND_ALT;

const content = {
  uk: {
    metadata: {
      title: "Outdoor & Infrastructure Lighting | LED Systems | LEDBUS by Gersan | InfraVolt",
      description:
        "Explore catalogue-verified GER-LED and LED-BUS lighting families for roads, large outdoor areas, canopies, tunnels and architectural facade.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      current: "Outdoor & Infrastructure Lighting",
    },
    backToLedSystemsLabel: "Back to LED Systems",
    hero: {
      eyebrow: "LED SYSTEMS",
      title: "Outdoor & Infrastructure Lighting",
      description:
        "Purpose-built LED lighting families for roads, tunnels, canopies, large outdoor areas and architectural infrastructure.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    technicalSnapshotHeading: "Category Overview",
    technicalSnapshot: [
      {
        icon: "power",
        label: "Application Scope",
        value: "Roads · Tunnels · Large Areas",
      },
      {
        icon: "protection",
        label: "Outdoor Protection",
        value: "Series-specific IP / IK ratings",
        caption: "Verified per product family",
      },
      {
        icon: "output",
        label: "Optical Coverage",
        value: "Street · Flood · Tunnel · Canopy · Wall Wash",
      },
      {
        icon: "control",
        label: "System Flexibility",
        value: "Series-specific control and optical options",
      },
    ],
    seriesHeading: "Product Series",
    seriesIntroduction:
      "Five catalogue-defined families covering public roads, large-area projection, canopy, tunnel and facade lighting.",
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: [
      {
        slug: "ger-led-street-lighting-systems",
        number: "01",
        name: "GER-LED Street Lighting Systems",
        description:
          "Road-lighting family represented by catalogue GSL100 and 730-GSL-D variants for streets and urban infrastructure.",
        features: [
          { icon: "applications", label: "Road & Urban Infrastructure" },
          { icon: "protection", label: "IP66 Catalogue Families" },
          { icon: "optics", label: "Multiple Catalogue Variants" },
        ],
        image: `${CARD_IMAGE_BASE}/outdoor-infrastructure-street-lighting-category-card.webp`,
        imageAlt: "GER-LED GSL100 street lighting luminaire",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-street-lighting-systems",
      },
      {
        slug: "ger-led-projector-lighting-systems",
        number: "02",
        name: "GER-LED Projector / Floodlight Lighting Systems",
        description:
          "Projector and floodlight systems for airports, industrial yards and other large outdoor areas, offered across multiple catalogue configurations.",
        features: [
          { icon: "high-output", label: "Large-Area Floodlighting" },
          { icon: "applications", label: "Outdoor Infrastructure" },
          { icon: "optics", label: "Multiple Power & Optical Options" },
        ],
        image: `${CARD_IMAGE_BASE}/outdoor-infrastructure-projector-floodlight-category-card.webp`,
        imageAlt: "GER-LED GSL100 projector floodlight",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-projector-lighting-systems",
      },
      {
        slug: "led-bus-ldb-kmx-canopy-lighting-systems",
        number: "03",
        name: "LED-BUS LDB-KMX Canopy Lighting Systems",
        description:
          "Five-model LDB-KMX family for canopy and covered-infrastructure lighting: LDB-KMX2100, LDB-KMX2150, LDB-KMX3200, LDB-KMX3300 and LDB-KMX4400.",
        features: [
          { icon: "surface-mount", label: "Canopy Lighting" },
          { icon: "protection", label: "IP66 / IK08" },
          { icon: "optics", label: "Medium & Wide Beam Options" },
        ],
        image: `${CARD_IMAGE_BASE}/outdoor-infrastructure-canopy-lighting-category-card.webp`,
        imageAlt: "LED-BUS LDB-KMX canopy lighting luminaire",
        href: "/products/led-systems/outdoor-infrastructure-lighting/led-bus-ldb-kmx-canopy-lighting-systems",
      },
      {
        slug: "gsl-tunnel-lighting-systems",
        number: "04",
        name: "GSL-TUNEL Lighting Systems",
        description:
          "Heavy-duty GSL-TUNEL and GSL-TUNEL CORNER luminaires for tunnels, underpasses and demanding infrastructure environments.",
        features: [
          { icon: "rugged-body", label: "Vandal-Resistant IK16 Body" },
          { icon: "protection", label: "IP65" },
          { icon: "adjustable-angle", label: "Straight & Corner Formats" },
        ],
        image: `${CARD_IMAGE_BASE}/outdoor-infrastructure-tunnel-lighting-category-card.webp`,
        imageAlt: "GSL-TUNEL and GSL-TUNEL CORNER heavy-duty LED luminaires",
        imageBackground: "dark",
        href: "/products/led-systems/outdoor-infrastructure-lighting/gsl-tunnel-lighting-systems",
      },
      {
        slug: "ger-led-wall-washer-lighting-systems",
        number: "05",
        name: "GER-LED Wall Washer Lighting Systems",
        description:
          "Linear architectural lighting family for building facade, with standard and catalogue-listed DMX variants.",
        features: [
          { icon: "applications", label: "Facade Lighting" },
          { icon: "slim-body", label: "Aluminium Extrusion Body" },
          { icon: "control", label: "Standard & DMX Variants" },
        ],
        image: `${CARD_IMAGE_BASE}/outdoor-infrastructure-wall-washer-category-card.webp`,
        imageAlt: "GER-LED linear wall washer luminaire",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-wall-washer-lighting-systems",
      },
    ],
    applicationsHeading: "Typical Applications",
    applications: [
      {
        title: "Roads & Urban Infrastructure",
        description: "Street and roadway lighting for urban routes, access roads and public infrastructure.",
        image: `${APPLICATION_IMAGE_BASE}/ger-led-street-lighting-road-application.webp`,
        imageAlt: "Urban road illuminated by GER-LED street lighting",
      },
      {
        title: "Tunnels & Underpasses",
        description: "Robust linear lighting for tunnels, underpasses and enclosed transport routes.",
        image: `${APPLICATION_IMAGE_BASE}/special-hazardous-application-tunnels.webp`,
        imageAlt: "Tunnel interior illuminated by heavy-duty LED tunnel lighting",
      },
      {
        title: "Industrial Yards & Large Areas",
        description: "Projector and floodlighting coverage for airports, industrial yards and broad outdoor work areas.",
        image: `${APPLICATION_IMAGE_BASE}/ger-led-projector-large-area-application.webp`,
        imageAlt: "Airport apron illuminated by large-area projector lighting",
      },
      {
        title: "Canopies & Covered Infrastructure",
        description: "Dedicated canopy lighting for covered service, transport and industrial infrastructure.",
        image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-covered-infrastructure.webp`,
        imageAlt: "Covered infrastructure illuminated by canopy LED lighting",
      },
      {
        title: "Facade & Architectural Infrastructure",
        description: "Linear wall-washing for building facade and exterior architectural surfaces.",
        image: `${APPLICATION_IMAGE_BASE}/ger-led-wall-washer-building-application.webp`,
        imageAlt: "Building facade illuminated by GER-LED wall washer lighting",
      },
    ],
    supportCta: {
      eyebrow: "Technical Support",
      title: "Need help selecting the right outdoor lighting family?",
      description:
        "Our technical team can help identify the appropriate series, optics, mounting and control configuration for your project.",
      action: "Talk to Our Technical Team",
    },
  },
  ua: {
    metadata: {
      title: "Зовнішнє та інфраструктурне освітлення | LED-системи | LEDBUS від Gersan | InfraVolt",
      description:
        "Каталожно підтверджені системи GER-LED і LED-BUS для доріг, великих відкритих просторів, навісів, тунелів та архітектурних фасадів.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "LED-системи",
      current: "Зовнішнє та інфраструктурне освітлення",
    },
    backToLedSystemsLabel: "Назад до LED-систем",
    hero: {
      eyebrow: "LED-СИСТЕМИ",
      title: "Зовнішнє та інфраструктурне освітлення",
      description:
        "Спеціалізовані сімейства LED-освітлення для доріг, тунелів, навісів, великих відкритих просторів та архітектурної інфраструктури.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    technicalSnapshotHeading: "Огляд категорії",
    technicalSnapshot: [
      {
        icon: "power",
        label: "Сфери застосування",
        value: "Дороги · Тунелі · Великі простори",
      },
      {
        icon: "protection",
        label: "Зовнішній захист",
        value: "Клас IP / IK залежно від серії",
        caption: "Підтверджується для кожного сімейства",
      },
      {
        icon: "output",
        label: "Оптичні рішення",
        value: "Вуличне · Прожекторне · Тунельне · Для навісів · Фасадне",
      },
      {
        icon: "control",
        label: "Гнучкість систем",
        value: "Опції керування й оптики залежать від серії",
      },
    ],
    seriesHeading: "Серії продукції",
    seriesIntroduction:
      "П’ять каталожних сімейств для громадських доріг, великих просторів, навісів, тунелів і фасадів.",
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: [
      {
        slug: "ger-led-street-lighting-systems",
        number: "01",
        name: "GER-LED Street Lighting Systems",
        description:
          "Сімейство дорожнього освітлення, представлене каталожними варіантами GSL100 і 730-GSL-D для вулиць та міської інфраструктури.",
        features: [
          { icon: "applications", label: "Дороги й міська інфраструктура" },
          { icon: "protection", label: "Каталожні сімейства IP66" },
          { icon: "optics", label: "Кілька каталожних варіантів" },
        ],
        image: `${CARD_IMAGE_BASE}/outdoor-infrastructure-street-lighting-category-card.webp`,
        imageAlt: "Вуличний світильник GER-LED GSL100",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-street-lighting-systems",
      },
      {
        slug: "ger-led-projector-lighting-systems",
        number: "02",
        name: "GER-LED Projector / Floodlight Lighting Systems",
        description:
          "Прожекторні системи для аеропортів, промислових майданчиків та інших великих відкритих просторів у кількох каталожних конфігураціях.",
        features: [
          { icon: "high-output", label: "Освітлення великих просторів" },
          { icon: "applications", label: "Зовнішня інфраструктура" },
          { icon: "optics", label: "Різні потужності й оптика" },
        ],
        image: `${CARD_IMAGE_BASE}/outdoor-infrastructure-projector-floodlight-category-card.webp`,
        imageAlt: "Прожектор GER-LED GSL100",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-projector-lighting-systems",
      },
      {
        slug: "led-bus-ldb-kmx-canopy-lighting-systems",
        number: "03",
        name: "LED-BUS LDB-KMX Canopy Lighting Systems",
        description:
          "Сімейство LDB-KMX із п’яти моделей для навісів і критої інфраструктури: LDB-KMX2100, LDB-KMX2150, LDB-KMX3200, LDB-KMX3300 та LDB-KMX4400.",
        features: [
          { icon: "surface-mount", label: "Освітлення навісів" },
          { icon: "protection", label: "IP66 / IK08" },
          { icon: "optics", label: "Середній і широкий промінь" },
        ],
        image: `${CARD_IMAGE_BASE}/outdoor-infrastructure-canopy-lighting-category-card.webp`,
        imageAlt: "Світильник для навісів LED-BUS LDB-KMX",
        href: "/products/led-systems/outdoor-infrastructure-lighting/led-bus-ldb-kmx-canopy-lighting-systems",
      },
      {
        slug: "gsl-tunnel-lighting-systems",
        number: "04",
        name: "GSL-TUNEL Lighting Systems",
        description:
          "Посилені світильники GSL-TUNEL і GSL-TUNEL CORNER для тунелів, підземних переходів та складних інфраструктурних умов.",
        features: [
          { icon: "rugged-body", label: "Антивандальний корпус IK16" },
          { icon: "protection", label: "IP65" },
          { icon: "adjustable-angle", label: "Прямий і кутовий формати" },
        ],
        image: `${CARD_IMAGE_BASE}/outdoor-infrastructure-tunnel-lighting-category-card.webp`,
        imageAlt: "Посилені LED-світильники GSL-TUNEL і GSL-TUNEL CORNER",
        imageBackground: "dark",
        href: "/products/led-systems/outdoor-infrastructure-lighting/gsl-tunnel-lighting-systems",
      },
      {
        slug: "ger-led-wall-washer-lighting-systems",
        number: "05",
        name: "GER-LED Wall Washer Lighting Systems",
        description:
          "Лінійне архітектурне освітлення для фасадів будівель зі стандартними та зазначеними в каталозі варіантами DMX.",
        features: [
          { icon: "applications", label: "Фасадне освітлення" },
          { icon: "slim-body", label: "Корпус з екструдованого алюмінію" },
          { icon: "control", label: "Стандартні й DMX-варіанти" },
        ],
        image: `${CARD_IMAGE_BASE}/outdoor-infrastructure-wall-washer-category-card.webp`,
        imageAlt: "Лінійний світильник GER-LED Wall Washer",
        href: "/products/led-systems/outdoor-infrastructure-lighting/ger-led-wall-washer-lighting-systems",
      },
    ],
    applicationsHeading: "Типові сфери застосування",
    applications: [
      {
        title: "Дороги й міська інфраструктура",
        description: "Вуличне та дорожнє освітлення міських маршрутів, під’їзних доріг і громадської інфраструктури.",
        image: `${APPLICATION_IMAGE_BASE}/ger-led-street-lighting-road-application.webp`,
        imageAlt: "Міська дорога, освітлена вуличними світильниками GER-LED",
      },
      {
        title: "Тунелі й підземні переходи",
        description: "Надійне лінійне освітлення тунелів, підземних переходів і закритих транспортних маршрутів.",
        image: `${APPLICATION_IMAGE_BASE}/special-hazardous-application-tunnels.webp`,
        imageAlt: "Тунель, освітлений потужними LED-світильниками для тунелів",
      },
      {
        title: "Промислові майданчики й великі простори",
        description: "Прожекторне освітлення аеропортів, промислових майданчиків і великих відкритих робочих зон.",
        image: `${APPLICATION_IMAGE_BASE}/ger-led-projector-large-area-application.webp`,
        imageAlt: "Перон аеропорту, освітлений прожекторами великої площі",
      },
      {
        title: "Навіси й крита інфраструктура",
        description: "Спеціалізоване освітлення навісів для сервісної, транспортної та промислової інфраструктури.",
        image: `${APPLICATION_IMAGE_BASE}/canopy-lighting-application-covered-infrastructure.webp`,
        imageAlt: "Крита інфраструктура, освітлена світильниками для навісів",
      },
      {
        title: "Фасади й архітектурна інфраструктура",
        description: "Лінійне фасадне освітлення будівель та зовнішніх архітектурних поверхонь.",
        image: `${APPLICATION_IMAGE_BASE}/ger-led-wall-washer-building-application.webp`,
        imageAlt: "Фасад будівлі, освітлений світильниками GER-LED Wall Washer",
      },
    ],
    supportCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібна допомога з вибором сімейства зовнішнього освітлення?",
      description:
        "Наша технічна команда допоможе визначити відповідну серію, оптику, монтаж і конфігурацію керування для вашого проєкту.",
      action: "Звернутися до технічної команди",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedCategoryDetailContent>>;

export function outdoorInfrastructureLightingContentForMarket(market: MarketCode): LedCategoryDetailContent {
  return content[market];
}

import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedCategoryDetailContent } from "./types";

/** Parking & Waterproof Lighting category page.
 *
 * Hero background/foreground are the pre-generated assets already
 * prepared for this category under category/parking-waterproof/hero —
 * a real underground car-park interior (background, white LED light
 * only, no coloured emission) and a real product composite (foreground)
 * showing the three families below, switched on with neutral-white
 * light: LED-BUS Etange Carpark (dominant), LED-BUS StepDIM Waterproof
 * (secondary) and LED-BUS Etanj PC (supporting). */
export const PARKING_WATERPROOF_HERO_BACKGROUND =
  publicMediaUrl("products/led-lighting/category/parking-waterproof/hero/parking-waterproof-lighting-hero-background.webp");
export const PARKING_WATERPROOF_HERO_BACKGROUND_ALT = "Underground car park interior lit by linear LED luminaires along the ceiling";
export const PARKING_WATERPROOF_HERO_FOREGROUND =
  publicMediaUrl("products/led-lighting/category/parking-waterproof/hero/parking-waterproof-lighting-hero-foreground-products.webp");
export const PARKING_WATERPROOF_HERO_FOREGROUND_ALT =
  "LED-BUS Etange Carpark, StepDIM Waterproof and Etanj PC linear luminaires, illuminated";
export const PARKING_WATERPROOF_SUPPORT_CTA_IMAGE = PARKING_WATERPROOF_HERO_BACKGROUND;
export const PARKING_WATERPROOF_SUPPORT_CTA_IMAGE_ALT = PARKING_WATERPROOF_HERO_BACKGROUND_ALT;

/** Family-matched category-card assets supplied for this category. */
const SERIES_IMAGE_BASE = publicMediaUrl("products/led-lighting/category/parking-waterproof/card");
/** Family- and application-matched imagery supplied for this category. */
const APPLICATION_IMAGE_BASE = publicMediaUrl("products/led-lighting/category/parking-waterproof/applications");

const content = {
  uk: {
    metadata: {
      title: "Parking & Waterproof Lighting | LED Systems | LEDBUS by Gersan | InfraVolt",
      description:
        "Parking & Waterproof Lighting — LED-BUS Etange Carpark, StepDIM Waterproof and Etanj PC linear luminaires for car parks and demanding service environments, 11–70 W, IP65.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      current: "Parking & Waterproof Lighting",
    },
    backToLedSystemsLabel: "Back to LED Systems",
    hero: {
      eyebrow: "LED SYSTEMS",
      title: "Parking & Waterproof Lighting",
      description:
        "Durable linear LED lighting systems for parking, waterproof and other demanding service environments, engineered for continuous, reliable illumination.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    technicalSnapshotHeading: "Technical Information",
    technicalSnapshot: [
      { icon: "power", label: "Power Range", value: "11 – 70 W" },
      {
        icon: "output",
        label: "Luminous Output",
        value: "1,705 – 13,000 lm",
        caption: "Etange Carpark & Etanj PC",
      },
      {
        icon: "protection",
        label: "Protection",
        value: "IP65",
        caption: "Etange Carpark & Etanj PC",
      },
      {
        icon: "control",
        label: "Control & Mounting",
        value: "DALI · SwitchDIM · Radar Sensor",
        caption: "Varies by family",
      },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction: "Three real LED-BUS catalogue families covering the Parking & Waterproof Lighting range.",
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: [
      {
        slug: "led-bus-etange-carpark",
        href: "/products/led-systems/parking-waterproof-lighting/led-bus-etange-carpark",
        number: "01",
        name: "LED-BUS Etange Carpark",
        description:
          "Anodised linear luminaire for car parks, offices, retail and education spaces, 11–70 W across 24 catalogue models (e.g. LED-BUS LDB235-350), up to 185.7 lm/W.",
        features: [
          { icon: "protection", label: "IP65" },
          { icon: "efficiency", label: "Up to 185.7 lm/W" },
          { icon: "control", label: "G-BUS PLC / DALI / SwitchDIM" },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-etange-carpark-category-card.webp`,
        imageAlt: "LED-BUS Etange Carpark luminaire product view",
      },
      {
        slug: "led-bus-stepdim-waterproof",
        href: "/products/led-systems/parking-waterproof-lighting/led-bus-stepdim-waterproof",
        number: "02",
        name: "LED-BUS StepDIM Waterproof",
        description:
          "Radar-sensor linear waterproof luminaire with a dimmable driver, 25–65 W across four catalogue models (e.g. LDB225-150), for automatic presence-based car-park lighting.",
        features: [
          { icon: "control", label: "5.8 GHz Radar Sensor" },
          { icon: "mounting-options", label: "Flush / Surface Mount" },
          { icon: "applications", label: "150° Detection · 8 m Range" },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-stepdim-waterproof-category-card.webp`,
        imageAlt: "LED-BUS StepDIM Waterproof luminaire range, four catalogue models with model codes and wattages",
      },
      {
        slug: "led-bus-etanj-pc",
        href: "/products/led-systems/parking-waterproof-lighting/led-bus-etanj-pc",
        number: "03",
        name: "LED-BUS Etanj PC",
        description:
          "Polyester powder-coated linear luminaire for car parks, offices, retail and education spaces, 11–70 W across 18 catalogue models (e.g. 730-LDB225-150/PC), up to 158 lm/W.",
        features: [
          { icon: "protection", label: "IP65" },
          { icon: "efficiency", label: "Up to 158 lm/W" },
          { icon: "control", label: "DALI / SwitchDIM" },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-etanj-pc-category-card.webp`,
        imageAlt: "LED-BUS Etanj PC luminaire, front and angled product views",
      },
    ],
    applicationsHeading: "Typical Parking & Waterproof Applications",
    applications: [
      {
        title: "Car Parks",
        image: `${APPLICATION_IMAGE_BASE}/multi-storey-parking-application.webp`,
        imageAlt: "Covered car park interior beneath linear ceiling lighting",
      },
      {
        title: "Multi-Storey Parking",
        image: `${APPLICATION_IMAGE_BASE}/multi-storey-parking-application.webp`,
        imageAlt: "Multi-storey car park interior with parked cars beneath linear ceiling lighting",
      },
      {
        title: "Warehouses & Industrial Facilities",
        image: `${APPLICATION_IMAGE_BASE}/warehouses-industrial-application.webp`,
        imageAlt: "Warehouse interior with high-ceiling linear LED lighting",
      },
      {
        title: "Commercial & Service Areas",
        image: `${APPLICATION_IMAGE_BASE}/led-bus-etange-carpark-application-offices.webp`,
        imageAlt: "Office and service interior illuminated by linear LED lighting",
      },
    ],
    supportCta: {
      eyebrow: "Technical Support",
      title: "Need help selecting the right parking or waterproof lighting family?",
      description: "Our technical team can help with series selection, protection ratings, controls and project specification.",
      action: "Talk to Our Technical Team",
    },
  },
  ua: {
    metadata: {
      title: "Освітлення паркінгів та вологозахищене освітлення | Системи LED-освітлення | LEDBUS від Gersan | InfraVolt",
      description:
        "Освітлення паркінгів та вологозахищене освітлення — світильники LED-BUS Etange Carpark, StepDIM Waterproof та Etanj PC для паркінгів і складних сервісних приміщень, 11–70 Вт, IP65.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "Системи LED-освітлення",
      current: "Освітлення паркінгів та вологозахищене освітлення",
    },
    backToLedSystemsLabel: "Назад до систем LED-освітлення",
    hero: {
      eyebrow: "СИСТЕМИ LED",
      title: "Освітлення паркінгів та вологозахищене освітлення",
      description:
        "Довговічні лінійні системи LED-освітлення для паркінгів, вологозахищених та інших складних сервісних приміщень, розроблені для безперервного, надійного освітлення.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    technicalSnapshotHeading: "Технічна інформація",
    technicalSnapshot: [
      { icon: "power", label: "Діапазон потужності", value: "11 – 70 Вт" },
      {
        icon: "output",
        label: "Світловий потік",
        value: "1 705 – 13 000 лм",
        caption: "Etange Carpark та Etanj PC",
      },
      {
        icon: "protection",
        label: "Захист",
        value: "IP65",
        caption: "Etange Carpark та Etanj PC",
      },
      {
        icon: "control",
        label: "Керування та монтаж",
        value: "DALI · SwitchDIM · Радарний датчик",
        caption: "Залежить від серії",
      },
    ],
    seriesHeading: "Продуктові серії в цій системі",
    seriesIntroduction: "Три реальні каталожні серії LED-BUS, що охоплюють діапазон освітлення паркінгів та вологозахищеного освітлення.",
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: [
      {
        slug: "led-bus-etange-carpark",
        href: "/products/led-systems/parking-waterproof-lighting/led-bus-etange-carpark",
        number: "01",
        name: "LED-BUS Etange Carpark",
        description:
          "Еложований лінійний світильник для паркінгів, офісів, торгових та освітніх приміщень, 11–70 Вт у 24 каталожних моделях (напр. LED-BUS LDB235-350), до 185,7 лм/Вт.",
        features: [
          { icon: "protection", label: "IP65" },
          { icon: "efficiency", label: "До 185,7 лм/Вт" },
          { icon: "control", label: "G-BUS PLC / DALI / SwitchDIM" },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-etange-carpark-category-card.webp`,
        imageAlt: "Світильник LED-BUS Etange Carpark, вигляд продукту",
      },
      {
        slug: "led-bus-stepdim-waterproof",
        href: "/products/led-systems/parking-waterproof-lighting/led-bus-stepdim-waterproof",
        number: "02",
        name: "LED-BUS StepDIM Waterproof",
        description:
          "Лінійний вологозахищений світильник із радарним датчиком та димованим драйвером, 25–65 Вт у чотирьох каталожних моделях (напр. LDB225-150), для автоматичного освітлення паркінгів за присутністю.",
        features: [
          { icon: "control", label: "Радарний датчик 5,8 ГГц" },
          { icon: "mounting-options", label: "Врізний / накладний монтаж" },
          { icon: "applications", label: "Кут 150° · Дальність 8 м" },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-stepdim-waterproof-category-card.webp`,
        imageAlt: "Асортимент світильників LED-BUS StepDIM Waterproof, чотири каталожні моделі з кодами та потужністю",
      },
      {
        slug: "led-bus-etanj-pc",
        href: "/products/led-systems/parking-waterproof-lighting/led-bus-etanj-pc",
        number: "03",
        name: "LED-BUS Etanj PC",
        description:
          "Порошково-пофарбований лінійний світильник для паркінгів, офісів, торгових та освітніх приміщень, 11–70 Вт у 18 каталожних моделях (напр. 730-LDB225-150/PC), до 158 лм/Вт.",
        features: [
          { icon: "protection", label: "IP65" },
          { icon: "efficiency", label: "До 158 лм/Вт" },
          { icon: "control", label: "DALI / SwitchDIM" },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-etanj-pc-category-card.webp`,
        imageAlt: "Світильник LED-BUS Etanj PC, вигляд спереду та під кутом",
      },
    ],
    applicationsHeading: "Типові застосування паркінгів та вологозахищеного освітлення",
    applications: [
      {
        title: "Паркінги",
        image: `${APPLICATION_IMAGE_BASE}/multi-storey-parking-application.webp`,
        imageAlt: "Інтер'єр критого паркінгу з лінійним стельовим освітленням",
      },
      {
        title: "Багатоповерхові паркінги",
        image: `${APPLICATION_IMAGE_BASE}/multi-storey-parking-application.webp`,
        imageAlt: "Інтер'єр багатоповерхового паркінгу з припаркованими автомобілями під лінійним стельовим освітленням",
      },
      {
        title: "Склади та промислові об'єкти",
        image: `${APPLICATION_IMAGE_BASE}/warehouses-industrial-application.webp`,
        imageAlt: "Складське приміщення з високостельовим лінійним LED-освітленням",
      },
      {
        title: "Комерційні та сервісні приміщення",
        image: `${APPLICATION_IMAGE_BASE}/led-bus-etange-carpark-application-offices.webp`,
        imageAlt: "Офісне та сервісне приміщення з лінійним LED-освітленням",
      },
    ],
    supportCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібна допомога з підбором освітлення паркінгу чи вологозахищеного освітлення?",
      description: "Наша технічна команда допоможе з вибором серії, класом захисту, керуванням та специфікацією проєкту.",
      action: "Звернутися до технічної команди",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedCategoryDetailContent>>;

export function parkingWaterproofLightingContentForMarket(market: MarketCode): LedCategoryDetailContent {
  return content[market];
}

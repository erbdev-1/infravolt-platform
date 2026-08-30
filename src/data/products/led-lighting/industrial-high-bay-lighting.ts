import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { LedCategoryDetailContent } from "./types";

/** Real extracted LEDBUS catalogue photos — see
 * public/assets/products/led-lighting/category/industrial-high-bay. Shared
 * across markets; only copy is localized. Hero background/foreground are
 * deliberately separate layers (see led-category-detail-page.tsx) — never
 * flatten them into one image. */
export const INDUSTRIAL_HIGH_BAY_HERO_BACKGROUND =
  publicMediaUrl("products/led-lighting/category/industrial-high-bay/hero/industrial-high-bay-lighting-hero-background.webp");
export const INDUSTRIAL_HIGH_BAY_HERO_BACKGROUND_ALT =
  "Dark high-bay warehouse interior lit by round LED high-bay fixtures";
export const INDUSTRIAL_HIGH_BAY_HERO_FOREGROUND =
  publicMediaUrl("products/led-lighting/category/industrial-high-bay/hero/industrial-high-bay-lighting-hero-foreground-products.webp");
export const INDUSTRIAL_HIGH_BAY_HERO_FOREGROUND_ALT =
  "LEDBUS high-bay and floodlight luminaires from the Industrial & High-Bay Lighting range";
export const INDUSTRIAL_HIGH_BAY_CATEGORY_CARD_IMAGE =
  publicMediaUrl("products/led-lighting/category/industrial-high-bay/card/industrial-high-bay-lighting-category-card.webp");
export const INDUSTRIAL_HIGH_BAY_CATEGORY_CARD_IMAGE_ALT =
  "Warehouse aisle lit by LEDBUS high-bay fixtures, with pallet racking and a forklift";
export const INDUSTRIAL_HIGH_BAY_SUPPORT_CTA_IMAGE =
  publicMediaUrl("products/led-lighting/category/industrial-high-bay/applications/support-cta-application.webp");
export const INDUSTRIAL_HIGH_BAY_SUPPORT_CTA_IMAGE_ALT =
  "Large industrial high-bay hall lit by LED high-bay fixtures";

const SERIES_IMAGE_BASE =
  publicMediaUrl("products/led-lighting/category/industrial-high-bay/series");
const APPLICATION_IMAGE_BASE =
  publicMediaUrl("products/led-lighting/category/industrial-high-bay/applications");

const content = {
  uk: {
    metadata: {
      title:
        "Industrial & High-Bay Lighting | LED Systems | LEDBUS by Gersan | InfraVolt",
      description:
        "LEDBUS Industrial & High-Bay Lighting — six catalogue product series for factories, warehouses, hangars and logistics facilities, 35–250 W, IP20 to IP66.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      current: "Industrial & High-Bay Lighting",
    },
    backToLedSystemsLabel: "Back to LED Systems",
    hero: {
      eyebrow: "LED SYSTEMS",
      title: "Industrial & High-Bay Lighting",
      description:
        "High-output LED lighting systems engineered for factories, warehouses, hangars, logistics facilities and other high-ceiling industrial environments.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    technicalSnapshotHeading: "Technical Information",
    technicalSnapshot: [
      { icon: "power", label: "Power Range", value: "35 – 250 W" },
      { icon: "output", label: "Luminous Output", value: "5,000 – 37,600 lm" },
      {
        icon: "protection",
        label: "Protection",
        value: "IP20 / IP65 / IP66",
      },
      {
        icon: "control",
        label: "Control & Mounting",
        value: "DALI · 1–10 V · Touch-Dim",
      },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction:
      "Six real LEDBUS and GER-LED catalogue series covering the Industrial & High-Bay Lighting range.",
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: [
      {
        slug: "led-bus-high-ceiling",
        number: "01",
        name: "LED-BUS High Ceiling Lighting Systems",
        description:
          "Eight-model high-ceiling range (LDB1-50 to LDB9-240) in an anodised aluminium housing for warehouses and production halls.",
        features: [
          { icon: "busbar-connect", label: "Busbar Connected" },
          { icon: "suspension", label: "Steel-Wire Suspension" },
          { icon: "high-output", label: "High Output" },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-high-ceiling-series-product.webp`,
        imageAlt:
          "LED-BUS High Ceiling luminaire, angled and side product views",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-high-ceiling",
      },
      {
        slug: "led-bus-ldbe",
        number: "02",
        name: "LED-BUS LDBE Series Lighting Systems",
        description:
          "Multi-lens industrial luminaire family, LDB1E to LDB8E, with selectable 30° / 60° / 90° beam angles for high-ceiling installations.",
        features: [
          { icon: "optics", label: "30° / 60° / 90° Optics" },
          { icon: "multi-lens", label: "Multi-Lens Design" },
          {
            icon: "mounting-options",
            label: "Busbar / Cable Tray / Wall Mounting",
          },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-ldbe-series-product.webp`,
        imageAlt: "LED-BUS LDBE series luminaire product view",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbe",
      },
      {
        slug: "led-bus-ldbse",
        number: "03",
        name: "LED-BUS LDBSE Series Lighting Systems",
        description:
          "LDBS1E to LDBS8E series, a slimmer LDBE variant reaching up to 148 lm/W across the range.",
        features: [
          { icon: "slim-body", label: "Slim Body Design" },
          { icon: "efficiency", label: "High Efficiency" },
          {
            icon: "mounting-options",
            label: "Cable Tray / Busbar / Wall Mounting",
          },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-ldbse-series-product.webp`,
        imageAlt:
          "LED-BUS LDBSE series luminaire, front and rear product views",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbse",
      },
      {
        slug: "led-bus-ldb-fl",
        number: "04",
        name: "LED-BUS LDB-FL Series Lighting Systems",
        description:
          "73O-LDB1FL to 73O-LDB4FL, fabricated-steel high-bay floodlights with a 4 mm tempered-glass cover. 1-10V, DALI, Touch-Dim and Casambi control options are listed in the source catalogue.",
        features: [
          { icon: "tempered-glass", label: "Tempered Glass Housing" },
          { icon: "control", label: "DALI / 1–10 V / Casambi" },
          { icon: "rugged-body", label: "Rugged Industrial Body" },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-ldb-fl-series-product.webp`,
        imageAlt: "LED-BUS LDB-FL series floodlight product view",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldb-fl",
      },
      {
        slug: "ger-led-industrial-high-ceiling",
        number: "05",
        name: "GER-LED Industrial High Ceiling Lighting Systems",
        description:
          "Nine-model GSL IND range (GSL IND-35W to GSL IND-250W) for demanding high-ceiling industrial environments, IP66-rated throughout.",
        features: [
          { icon: "protection", label: "IP66" },
          { icon: "adjustable-angle", label: "Adjustable Angle" },
          {
            icon: "applications",
            label: "Factory / Hangar / Port / Petrochemical Use",
          },
        ],
        image: `${SERIES_IMAGE_BASE}/ger-led-industrial-high-ceiling-series-product.webp`,
        imageAlt:
          "GER-LED Industrial High Ceiling luminaire, close-up product view",
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-industrial-high-ceiling",
      },
      {
        slug: "ger-led-high-ceiling",
        number: "06",
        name: "GER-LED High Ceiling Lighting Systems",
        description:
          'Suspended and surface-mounted Ø434 mm high-ceiling luminaires, IP66-rated. Order codes in the source catalogue contain a character that cannot be reliably read as "O" or "0" — confirmed codes are available on request.',
        features: [
          { icon: "suspension", label: "Suspended Mounting" },
          { icon: "surface-mount", label: "Surface Mounted Option" },
          { icon: "protection", label: "IP66" },
        ],
        image: `${SERIES_IMAGE_BASE}/ger-led-high-ceiling-series-product.webp`,
        imageAlt: "GER-LED High Ceiling suspended luminaire product view",
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-high-ceiling",
      },
    ],
    applicationsHeading: "Typical Industrial Applications",
    applications: [
      {
        title: "Factory Halls",
        image: `${APPLICATION_IMAGE_BASE}/factory-halls-application.webp`,
        imageAlt:
          "High-bay LED fixtures lighting a steel-framed industrial roof structure",
      },
      {
        title: "Warehouses & Logistics",
        image: `${APPLICATION_IMAGE_BASE}/warehouses-logistics-application.webp`,
        imageAlt:
          "Warehouse aisle with pallet racking and a forklift, lit by high-bay LED fixtures",
      },
      {
        title: "Aircraft Hangars",
        image: `${APPLICATION_IMAGE_BASE}/aircraft-hangars-application.webp`,
        imageAlt:
          "Aircraft assembly hangar lit by overhead LED high-bay fixtures",
      },
      {
        title: "Ports & Heavy Industry",
        image: `${APPLICATION_IMAGE_BASE}/ports-heavy-industry-application-card.webp`,
        imageAlt: "",
      },
    ],
    supportCta: {
      eyebrow: "Technical Support",
      title: "Need help selecting the right industrial lighting family?",
      description:
        "Our technical team can help with series selection, mounting, controls and project specification.",
      action: "Talk to Our Technical Team",
    },
  },
  ua: {
    metadata: {
      title: "Промислове та високопролітне LED-освітлення | InfraVolt",
      description:
        "LEDBUS Промислове освітлення та освітлення високих прольотів — шість каталожних продуктових серій для заводів, складів, ангарів та логістичних об'єктів, 35–250 Вт, IP20–IP66.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "Системи LED-освітлення",
      current: "Промислове освітлення та освітлення високих прольотів",
    },
    backToLedSystemsLabel: "Назад до систем LED-освітлення",
    hero: {
      eyebrow: "СИСТЕМИ LED",
      title: "Промислове освітлення та освітлення високих прольотів",
      description:
        "Потужні системи LED-освітлення для заводів, складів, ангарів, логістичних об'єктів та інших приміщень з високими стелями.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    technicalSnapshotHeading: "Технічна інформація",
    technicalSnapshot: [
      { icon: "power", label: "Діапазон потужності", value: "35 – 250 Вт" },
      { icon: "output", label: "Світловий потік", value: "5 000 – 37 600 лм" },
      {
        icon: "protection",
        label: "Захист",
        value: "IP20 / IP65 / IP66",
      },
      {
        icon: "control",
        label: "Керування та монтаж",
        value: "DALI · 1–10 В · Touch-Dim",
      },
    ],
    seriesHeading: "Продуктові серії в цій системі",
    seriesIntroduction:
      "Шість реальних каталожних серій LEDBUS та GER-LED, що охоплюють діапазон промислового освітлення та освітлення високих прольотів.",
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: [
      {
        slug: "led-bus-high-ceiling",
        number: "01",
        name: "LED-BUS High Ceiling Lighting Systems",
        description:
          "Серія з восьми моделей (LDB1-50 – LDB9-240) в анодованому алюмінієвому корпусі для складів та виробничих цехів.",
        features: [
          { icon: "busbar-connect", label: "Підключення до шинопроводу" },
          { icon: "suspension", label: "Тросовий підвіс" },
          { icon: "high-output", label: "Висока потужність світлового потоку" },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-high-ceiling-series-product.webp`,
        imageAlt:
          "Світильник LED-BUS High Ceiling, ракурсний та бічний вигляд продукту",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-high-ceiling",
      },
      {
        slug: "led-bus-ldbe",
        number: "02",
        name: "LED-BUS LDBE Series Lighting Systems",
        description:
          "Промислова серія з мультилінзовою оптикою, LDB1E – LDB8E, з вибором кута розсіювання 30° / 60° / 90° для об'єктів з високими стелями.",
        features: [
          { icon: "optics", label: "Оптика 30° / 60° / 90°" },
          { icon: "multi-lens", label: "Мультилінзова конструкція" },
          {
            icon: "mounting-options",
            label: "Шинопровід / кабельна траса / стіна",
          },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-ldbe-series-product.webp`,
        imageAlt: "Світильник серії LED-BUS LDBE",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbe",
      },
      {
        slug: "led-bus-ldbse",
        number: "03",
        name: "LED-BUS LDBSE Series Lighting Systems",
        description:
          "Серія LDBS1E – LDBS8E, тонший варіант LDBE з ефективністю до 148 лм/Вт у межах діапазону.",
        features: [
          { icon: "slim-body", label: "Тонкий корпус" },
          { icon: "efficiency", label: "Висока ефективність" },
          {
            icon: "mounting-options",
            label: "Кабельна траса / шинопровід / стіна",
          },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-ldbse-series-product.webp`,
        imageAlt: "Світильник серії LED-BUS LDBSE, вигляд спереду та ззаду",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbse",
      },
      {
        slug: "led-bus-ldb-fl",
        number: "04",
        name: "LED-BUS LDB-FL Series Lighting Systems",
        description:
          "73O-LDB1FL – 73O-LDB4FL, прожектори високих прольотів зі сталевим корпусом та загартованим склом 4 мм. У каталозі вказані варіанти керування 1-10V, DALI, Touch-Dim та Casambi.",
        features: [
          { icon: "tempered-glass", label: "Корпус із загартованого скла" },
          { icon: "control", label: "DALI / 1–10 В / Casambi" },
          { icon: "rugged-body", label: "Міцний промисловий корпус" },
        ],
        image: `${SERIES_IMAGE_BASE}/led-bus-ldb-fl-series-product.webp`,
        imageAlt: "Прожектор серії LED-BUS LDB-FL",
        href: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldb-fl",
      },
      {
        slug: "ger-led-industrial-high-ceiling",
        number: "05",
        name: "GER-LED Industrial High Ceiling Lighting Systems",
        description:
          "Серія GSL IND з дев'яти моделей (GSL IND-35W – GSL IND-250W) для складних промислових об'єктів з високими стелями, з класом захисту IP66.",
        features: [
          { icon: "protection", label: "IP66" },
          { icon: "adjustable-angle", label: "Регульований кут нахилу" },
          {
            icon: "applications",
            label: "Заводи / ангари / порти / нафтохімія",
          },
        ],
        image: `${SERIES_IMAGE_BASE}/ger-led-industrial-high-ceiling-series-product.webp`,
        imageAlt:
          "Світильник GER-LED Industrial High Ceiling, вигляд крупним планом",
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-industrial-high-ceiling",
      },
      {
        slug: "ger-led-high-ceiling",
        number: "06",
        name: "GER-LED High Ceiling Lighting Systems",
        description:
          "Підвісні та накладні світильники Ø434 мм з класом захисту IP66. Один символ у кодах замовлення першоджерела каталогу неможливо однозначно розпізнати як «O» чи «0» — точні коди надаються за запитом.",
        features: [
          { icon: "suspension", label: "Підвісний монтаж" },
          { icon: "surface-mount", label: "Варіант накладного монтажу" },
          { icon: "protection", label: "IP66" },
        ],
        image: `${SERIES_IMAGE_BASE}/ger-led-high-ceiling-series-product.webp`,
        imageAlt: "Підвісний світильник GER-LED High Ceiling",
        href: "/products/led-systems/industrial-high-bay-lighting/ger-led-high-ceiling",
      },
    ],
    applicationsHeading: "Типові промислові застосування",
    applications: [
      {
        title: "Заводські цехи",
        image: `${APPLICATION_IMAGE_BASE}/factory-halls-application.webp`,
        imageAlt:
          "Світильники LED високих прольотів освітлюють сталевий каркас промислового даху",
      },
      {
        title: "Склади та логістика",
        image: `${APPLICATION_IMAGE_BASE}/warehouses-logistics-application.webp`,
        imageAlt:
          "Прохід складу зі стелажами та навантажувачем, освітлений світильниками LED високих прольотів",
      },
      {
        title: "Авіаційні ангари",
        image: `${APPLICATION_IMAGE_BASE}/aircraft-hangars-application.webp`,
        imageAlt:
          "Ангар для складання літаків, освітлений світильниками LED високих прольотів",
      },
      {
        title: "Порти та важка промисловість",
      },
    ],
    supportCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібна допомога з підбором промислового освітлення?",
      description:
        "Наша технічна команда допоможе з вибором серії, монтажем, керуванням та специфікацією проєкту.",
      action: "Звернутися до технічної команди",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedCategoryDetailContent>>;

export function industrialHighBayLightingContentForMarket(
  market: MarketCode,
): LedCategoryDetailContent {
  return content[market];
}

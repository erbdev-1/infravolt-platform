import type { MarketCode } from "@/modules/markets/types";

import type { CableMacroFamilyContent } from "./macro-family-types";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF } from "./content";
import type { CableFamilySiblingLink } from "./types";

const IMAGE_BASE = "/assets/products/cable-management";
const REQUEST_HREF = "/uk-support?request=technical-pack&product=cable-trays-trunking";

// Curated down to 6 cards (from the catalogue's real 11 series) so this
// section reads as a category overview, not a raw list — see the
// completion report for the full rationale. Consolidations:
//  - "Heavy Duty Cable Trays" is a single card spanning H=40/50/60/100mm
//    (+ GKT-CE) — those live as tabs on the unified detail page
//    (heavy-duty-cable-trays), not as separate cards here.
//  - "Marine & Lighting Fixture Cable Trays" combines the catalogue's one
//    real series of that name (it was always a single series, never two).
//  - "Strengthened Cable Trays" is a real 7th catalogue series but is
//    intentionally left off this curated 6-card set per the brief; it's
//    still real in the underlying catalogue (CABLE_MANAGEMENT_ALL_SERIES),
//    just not shown as its own card on this page.
// Order-code counts are real, verified row counts from catalog-source
// product-data.csv files. `catalogueName` stays in English in both
// markets, same convention as category-content.ts.
const CABLE_TRAYS_TRUNKING_CONTENT_BY_MARKET: Readonly<Record<MarketCode, CableMacroFamilyContent>> = {
  uk: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Cable Trays & Trunking" },
    ],
    eyebrow: "Cable Management Systems",
    title: "Cable Trays & Trunking",
    description:
      "Perforated, strengthened, heavy-duty and trunking systems for power, control and data cable routing.",
    requestPackAction: "Request Technical Pack",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Download PDF Catalogue",
      meta: "PDF Catalogue",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
    },
    heroImage: `${IMAGE_BASE}/cable-trays-trunking/hero/cable-trays-trunking-hero-transparent.png`,
    heroImageAlt: "Gersan heavy duty cable tray with tee and bend accessories, product photograph",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Applicable Standards",
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: "Materials & Finishes",
        value: ["Hot-Dip Galvanized", "Pregalvanized", "Corten-A", "Aluminium", "Stainless Steel"],
      },
      {
        icon: "system",
        label: "System Scope",
        value: ["Standard Duty", "Heavy Duty (H40–H100)", "Strengthened", "Marine", "Trunking"],
      },
      {
        icon: "support",
        label: "Engineering Support",
        value: ["Load & Support Data", "Technical Drawings", "Custom Dimensions", "Installation Guidance"],
      },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction:
      "Six core product families make up the Cable Trays & Trunking range — from standard-duty trays through to heavy-duty, marine and corrosion-resistant variants.",
    series: [
      {
        slug: "normal-type-cable-trays",
        label: "Normal Type Cable Trays",
        catalogueName: "Normal Type Cable Trays",
        description:
          "Standard-duty perforated cable trays for general power and control routing, plus the Strengthened line.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/normal-type-cable-trays-card.png`,
        imageAlt: "Gersan normal type cable trays with bend accessory, product photograph",
        orderCodeCount: 265,
        href: "/products/cable-support-systems/normal-type-cable-trays",
      },
      {
        slug: "heavy-duty-cable-trays",
        label: "Heavy Duty Cable Trays",
        catalogueName: "Heavy Duty Cable Trays (H=40–100mm, GKT-CE)",
        description: "High-load-capacity perforated and covered trays, H=40 to H=100 mm edge heights in one system.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/heavy-duty-cable-trays-card.png`,
        imageAlt: "Gersan heavy duty cable trays in four widths, product photograph",
        orderCodeCount: 682,
        href: "/products/cable-support-systems/heavy-duty-cable-trays",
      },
      {
        slug: "cable-tray-clamping-lid",
        label: "Cable Tray With Clamping Lid",
        catalogueName: "Cable Tray With Clamping Lid",
        description: "Tray system with a clamp-fit cover for fully enclosed cable routing.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/cable-tray-with-clamping-lid-card.png`,
        imageAlt: "Gersan cable tray with clamping lid cover, product photograph",
        orderCodeCount: 146,
        href: "/products/cable-support-systems/cable-tray-clamping-lid",
      },
      {
        slug: "pregalvanized-trunking-system",
        label: "Pregalvanized Trunking System",
        catalogueName: "Quick Fix Pregalvanized Cable Trunking",
        description: "Quick-fix pregalvanized trunking for fast, tool-light installation.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/quick-fix-pregalvanized-cable-trunking-card.png`,
        imageAlt: "Gersan pregalvanized trunking system with corner and straight sections, product photograph",
        orderCodeCount: 131,
        href: "/products/cable-support-systems/pregalvanized-trunking-system",
      },
      {
        slug: "marine-lighting-fixture-cable-trays",
        label: "Marine & Lighting Fixture Cable Trays",
        catalogueName: "Marine Type and Lighting Fixture Type Cable Trays",
        description: "Marine-rated and lighting-fixture-type trays for corrosive and coastal environments.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/lighting-fixture-cable-trays-card.png`,
        imageAlt:
          "Gersan lighting-fixture-type cable tray with hexagonal junction and bend accessories, product photograph",
        orderCodeCount: 26,
        href: "/products/cable-support-systems/marine-lighting-fixture-cable-trays",
      },
      {
        slug: "aluminium-cable-trays",
        label: "Aluminium Cable Trays",
        catalogueName: "Aluminium Cable Trays and Accessories",
        description: "Lightweight aluminium tray system for corrosion-sensitive environments.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/aluminium-cable-trays-card.png`,
        imageAlt: "Gersan aluminium cable trays and bend accessory, product photograph",
        orderCodeCount: 192,
        href: "/products/cable-support-systems/aluminium-cable-trays",
      },
    ],
    compatibleHeading: "Compatible Systems",
    compatibleIntroduction:
      "Cable trays and trunking are carried and fixed by these support systems, and route alongside these other containment types.",
    compatibleSystems: [
      {
        label: "Support & Hanging Systems",
        description: "Support profiles, brackets, consoles and threaded rods that carry these trays.",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        label: "Cable Ladders",
        description: "High-capacity ladder systems for demanding industrial cable installations.",
        href: "/products/cable-support-systems/cable-ladders",
      },
      {
        label: "Wire-Mesh Systems",
        description: "Lightweight ventilated wire-mesh containment for flexible cable routing.",
        href: "/products/cable-support-systems/wire-mesh-systems",
      },
    ],
    supportHeading: "Need help selecting a cable tray system?",
    supportDescription:
      "Get technical support with tray sizing, load ratings, materials, finishes and project-specific configurations.",
    supportAction: "Request Technical Support",
    supportHref: REQUEST_HREF,
  },
  ua: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Кабельні лотки та короби" },
    ],
    eyebrow: "Кабеленесучі системи",
    title: "Кабельні лотки та короби",
    description:
      "Перфоровані, посилені, важкого типу та коробчасті системи для прокладання силових, контрольних та інформаційних кабелів.",
    requestPackAction: "Запросити технічний пакет",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Завантажити PDF-каталог",
      meta: "PDF-каталог",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Завантажити PDF-каталог систем кабельної підтримки Gersan",
    },
    heroImage: `${IMAGE_BASE}/cable-trays-trunking/hero/cable-trays-trunking-hero-transparent.png`,
    heroImageAlt: "Кабельний лоток Gersan важкого типу з трійником та поворотним елементом, фото продукту",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Застосовні стандарти",
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: "Матеріали та покриття",
        value: ["Гаряче цинкування", "Прегальванізація", "Corten-A", "Алюміній", "Нержавіюча сталь"],
      },
      {
        icon: "system",
        label: "Обсяг системи",
        value: ["Стандартний тип", "Важкий тип (H40–H100)", "Посилений", "Морський", "Короби"],
      },
      {
        icon: "support",
        label: "Інженерна підтримка",
        value: ["Дані навантаження та опор", "Технічні креслення", "Індивідуальні розміри", "Настанови з монтажу"],
      },
    ],
    seriesHeading: "Серії продукції цієї системи",
    seriesIntroduction:
      "Шість основних продуктових родин складають асортимент кабельних лотків та коробів — від стандартних лотків до важкого типу, морського та корозійностійкого виконання.",
    series: [
      {
        slug: "normal-type-cable-trays",
        label: "Кабельні лотки стандартного типу",
        catalogueName: "Normal Type Cable Trays",
        description:
          "Перфоровані кабельні лотки стандартного типу для загального прокладання силових і контрольних кабелів, а також лінійка посиленого типу.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/normal-type-cable-trays-card.png`,
        imageAlt: "Кабельні лотки Gersan стандартного типу з поворотним елементом, фото продукту",
        orderCodeCount: 265,
        href: "/products/cable-support-systems/normal-type-cable-trays",
      },
      {
        slug: "heavy-duty-cable-trays",
        label: "Кабельні лотки важкого типу",
        catalogueName: "Heavy Duty Cable Trays (H=40–100mm, GKT-CE)",
        description:
          "Перфоровані та закриті лотки високої несучої здатності, висота борту H=40 до H=100 мм в одній системі.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/heavy-duty-cable-trays-card.png`,
        imageAlt: "Кабельні лотки Gersan важкого типу чотирьох ширин, фото продукту",
        orderCodeCount: 682,
        href: "/products/cable-support-systems/heavy-duty-cable-trays",
      },
      {
        slug: "cable-tray-clamping-lid",
        label: "Кабельний лоток із затискною кришкою",
        catalogueName: "Cable Tray With Clamping Lid",
        description: "Система лотків із затискною кришкою для повністю закритого прокладання кабелів.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/cable-tray-with-clamping-lid-card.png`,
        imageAlt: "Кабельний лоток Gersan із затискною кришкою, фото продукту",
        orderCodeCount: 146,
        href: "/products/cable-support-systems/cable-tray-clamping-lid",
      },
      {
        slug: "pregalvanized-trunking-system",
        label: "Прегальванізована коробчаста система",
        catalogueName: "Quick Fix Pregalvanized Cable Trunking",
        description: "Прегальванізовані короби швидкого монтажу без спеціального інструменту.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/quick-fix-pregalvanized-cable-trunking-card.png`,
        imageAlt: "Прегальванізована коробчаста система Gersan з кутовими та прямими секціями, фото продукту",
        orderCodeCount: 131,
        href: "/products/cable-support-systems/pregalvanized-trunking-system",
      },
      {
        slug: "marine-lighting-fixture-cable-trays",
        label: "Кабельні лотки морського та освітлювального типу",
        catalogueName: "Marine Type and Lighting Fixture Type Cable Trays",
        description: "Лотки морського класу та освітлювального типу для агресивних і прибережних середовищ.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/lighting-fixture-cable-trays-card.png`,
        imageAlt: "Кабельний лоток Gersan освітлювального типу з шестигранним з'єднанням та поворотними елементами, фото продукту",
        orderCodeCount: 26,
        href: "/products/cable-support-systems/marine-lighting-fixture-cable-trays",
      },
      {
        slug: "aluminium-cable-trays",
        label: "Алюмінієві кабельні лотки",
        catalogueName: "Aluminium Cable Trays and Accessories",
        description: "Легка алюмінієва лоткова система для середовищ, чутливих до корозії.",
        image: `${IMAGE_BASE}/cable-trays-trunking/card/aluminium-cable-trays-card.png`,
        imageAlt: "Алюмінієві кабельні лотки Gersan з поворотним елементом, фото продукту",
        orderCodeCount: 192,
        href: "/products/cable-support-systems/aluminium-cable-trays",
      },
    ],
    compatibleHeading: "Сумісні системи",
    compatibleIntroduction:
      "Кабельні лотки та короби несуться та фіксуються цими опорними системами, а також прокладаються поруч з іншими типами захисту кабелів.",
    compatibleSystems: [
      {
        label: "Системи опор та підвісу",
        description: "Опорні профілі, кронштейни, консолі та різьбові шпильки, що несуть ці лотки.",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        label: "Кабельні драбини",
        description: "Високопродуктивні драбинкові системи для відповідальних промислових кабельних монтажів.",
        href: "/products/cable-support-systems/cable-ladders",
      },
      {
        label: "Дротяні лоткові системи",
        description: "Легкі вентильовані дротяні лоткові системи для гнучкого прокладання кабелів.",
        href: "/products/cable-support-systems/wire-mesh-systems",
      },
    ],
    supportHeading: "Потрібна допомога з підбором системи кабельних лотків?",
    supportDescription:
      "Отримайте технічну підтримку з підбору розмірів лотків, розрахунку навантаження, матеріалів, покриттів та індивідуальних конфігурацій проєкту.",
    supportAction: "Запросити технічну підтримку",
    supportHref: REQUEST_HREF,
  },
};

export function cableTraysTrunkingContentForMarket(market: MarketCode): CableMacroFamilyContent {
  return CABLE_TRAYS_TRUNKING_CONTENT_BY_MARKET[market];
}

// Icon for the photo-free "icon" sibling-card style (siblingCardVariant
// "icon" — see CableFamilySiblingIconName) — keyed by slug since these 6
// cards don't otherwise carry a per-series icon field.
const SIBLING_ICON_BY_SLUG: Readonly<Record<string, CableFamilySiblingLink["icon"]>> = {
  "normal-type-cable-trays": "ladder",
  "heavy-duty-cable-trays": "ladder",
  "cable-tray-clamping-lid": "cover",
  "pregalvanized-trunking-system": "profile",
  "marine-lighting-fixture-cable-trays": "ladder",
  "aluminium-cable-trays": "ladder",
};

// The same 6 curated cards shown on this macro page's own "Product Series
// in This System" grid, reshaped for the compact "Other Cable Tray &
// Trunking Families" section each of those 6 family pages shows instead
// (see cable-variant-family-template.tsx) — one canonical source so the
// two can never drift apart. `subtitle` reuses each card's own real
// `description` text (already reviewed/approved copy, not new content);
// `orderCodeCount` is the same real, verified count shown on the macro
// page's own card.
export function cableTraysTrunkingSiblingFamilies(market: MarketCode): readonly CableFamilySiblingLink[] {
  return CABLE_TRAYS_TRUNKING_CONTENT_BY_MARKET[market].series.map((series) => ({
    slug: series.slug,
    name: series.label,
    image: series.image,
    imageAlt: series.imageAlt,
    subtitle: series.description,
    orderCodeCount: series.orderCodeCount,
    icon: SIBLING_ICON_BY_SLUG[series.slug],
  }));
}

import type { MarketCode } from "@/modules/markets/types";

import type { CableMacroFamilyContent } from "./macro-family-types";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF } from "./content";

const IMAGE_BASE = "/assets/products/cable-management";
const REQUEST_HREF = "/uk-support?request=technical-pack&product=wire-mesh-systems";

// Only one catalogue series maps to this macro group — Wire-Mesh Cable
// Ladders (see category-content.ts) — with a real family image but no
// extracted product-data.csv yet, so `orderCodeCount`/`href` are absent
// (never invented). No "Choose by ..." section — a single series has no
// real distinguishing choice to route to yet.
const WIRE_MESH_SYSTEMS_CONTENT_BY_MARKET: Readonly<Record<MarketCode, CableMacroFamilyContent>> = {
  uk: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Wire-Mesh Systems" },
    ],
    eyebrow: "Cable Management Systems",
    title: "Wire-Mesh Systems",
    description:
      "Lightweight ventilated wire-mesh containment for flexible cable routing and rapid, tool-light installation.",
    requestPackAction: "Request Technical Pack",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Download PDF Catalogue",
      meta: "PDF Catalogue",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
    },
    heroImage: `${IMAGE_BASE}/wire-mesh-cable-systems/hero/wire-mesh-systems-transparent-hero.png`,
    heroImageAlt: "Gersan wire-mesh cable tray system, product photograph",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Applicable Standards",
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: "Materials & Finishes",
        value: ["Hot-Dip Galvanized", "Stainless Steel"],
      },
      {
        icon: "system",
        label: "System Scope",
        value: ["Wire-Mesh Cable Ladders", "Ventilated Containment", "Flexible Routing"],
      },
      {
        icon: "support",
        label: "Engineering Support",
        value: ["Load & Support Data", "Technical Drawings", "Custom Dimensions", "Installation Guidance"],
      },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction:
      "Wire-Mesh Cable Ladders make up this range — an open, ventilated tray for lightweight and flexible cable routing.",
    series: [
      {
        slug: "wire-mesh-cable-ladders",
        label: "Wire-Mesh Cable Ladders",
        catalogueName: "Wire-Mesh Cable Ladders",
        description: "Open wire-mesh tray for ventilated, flexible cable routing with rapid installation.",
        image: `${IMAGE_BASE}/wire-mesh-cable-systems/family/wire-mesh-cable-system.webp`,
        imageAlt: "Gersan wire-mesh cable tray system, technical catalogue drawing",
      },
    ],
    compatibleHeading: "Compatible Systems",
    compatibleIntroduction:
      "Wire-mesh trays are carried and fixed by these support systems, and route alongside these other containment types.",
    compatibleSystems: [
      {
        label: "Support & Hanging Systems",
        description: "Support profiles, brackets, consoles and threaded rods that carry these trays.",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        label: "Cable Trays & Trunking",
        description: "Perforated, heavy-duty and trunking systems for heavier cable routing.",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        label: "Cable Ladders",
        description: "High-capacity ladder systems for demanding industrial cable installations.",
        href: "/products/cable-support-systems/cable-ladders",
      },
    ],
    supportHeading: "Need help selecting a wire-mesh system?",
    supportDescription:
      "Get technical support with tray sizing, load ratings, materials, finishes and project-specific configurations.",
    supportAction: "Request Technical Support",
    supportHref: REQUEST_HREF,
  },
  ua: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Дротяні лоткові системи" },
    ],
    eyebrow: "Кабеленесучі системи",
    title: "Дротяні лоткові системи",
    description:
      "Легкі вентильовані дротяні лоткові системи для гнучкого прокладання кабелів та швидкого монтажу без спеціального інструменту.",
    requestPackAction: "Запросити технічний пакет",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Завантажити PDF-каталог",
      meta: "PDF-каталог",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Завантажити PDF-каталог систем кабельної підтримки Gersan",
    },
    heroImage: `${IMAGE_BASE}/wire-mesh-cable-systems/hero/wire-mesh-systems-transparent-hero.png`,
    heroImageAlt: "Дротяний кабельний лоток Gersan, фото продукту",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Застосовні стандарти",
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: "Матеріали та покриття",
        value: ["Гаряче цинкування", "Нержавіюча сталь"],
      },
      {
        icon: "system",
        label: "Обсяг системи",
        value: ["Дротяні кабельні драбини", "Вентильований захист", "Гнучке прокладання"],
      },
      {
        icon: "support",
        label: "Інженерна підтримка",
        value: ["Дані навантаження та опор", "Технічні креслення", "Індивідуальні розміри", "Настанови з монтажу"],
      },
    ],
    seriesHeading: "Серії продукції цієї системи",
    seriesIntroduction:
      "Дротяні кабельні драбини складають цей асортимент — відкритий вентильований лоток для легкого та гнучкого прокладання кабелів.",
    series: [
      {
        slug: "wire-mesh-cable-ladders",
        label: "Дротяні кабельні драбини",
        catalogueName: "Wire-Mesh Cable Ladders",
        description: "Відкритий дротяний лоток для вентильованого, гнучкого прокладання кабелів зі швидким монтажем.",
        image: `${IMAGE_BASE}/wire-mesh-cable-systems/family/wire-mesh-cable-system.webp`,
        imageAlt: "Дротяний кабельний лоток Gersan, технічне креслення з каталогу",
      },
    ],
    compatibleHeading: "Сумісні системи",
    compatibleIntroduction:
      "Дротяні лотки несуться та фіксуються цими опорними системами, а також прокладаються поруч з іншими типами захисту кабелів.",
    compatibleSystems: [
      {
        label: "Системи опор та підвісу",
        description: "Опорні профілі, кронштейни, консолі та різьбові шпильки, що несуть ці лотки.",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        label: "Кабельні лотки та короби",
        description: "Перфоровані, важкого типу та коробчасті системи для важчого прокладання кабелів.",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        label: "Кабельні драбини",
        description: "Високопродуктивні драбинкові системи для відповідальних промислових кабельних монтажів.",
        href: "/products/cable-support-systems/cable-ladders",
      },
    ],
    supportHeading: "Потрібна допомога з підбором дротяної лоткової системи?",
    supportDescription:
      "Отримайте технічну підтримку з підбору розмірів лотків, розрахунку навантаження, матеріалів, покриттів та індивідуальних конфігурацій проєкту.",
    supportAction: "Запросити технічну підтримку",
    supportHref: REQUEST_HREF,
  },
};

export function wireMeshSystemsContentForMarket(market: MarketCode): CableMacroFamilyContent {
  return WIRE_MESH_SYSTEMS_CONTENT_BY_MARKET[market];
}

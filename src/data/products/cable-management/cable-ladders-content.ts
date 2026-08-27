import { publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import type { CableMacroFamilyContent } from "./macro-family-types";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF } from "./content";

const IMAGE_BASE = publicMediaUrl("products/cable-management");
const REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "cable-ladders",
  source: "/products/cable-support-systems",
});

// None of the four series in this macro group has an extracted
// catalog-source folder yet (no product-data.csv for C-Profile Rung,
// Heavy Duty, GCMC or GMIE ladders), so every `orderCodeCount` is
// intentionally absent — never invented. Only one family image exists
// (cable-ladders/family/c-profile-cable-ladder.webp, already used on the
// category page's Explore card); the other three render the "Image on
// request" placeholder. No "Choose by ..." section either — with zero
// series having a real detail page, every option would fall back to the
// same request-form link, which isn't a real distinguishing choice.
const CABLE_LADDERS_CONTENT_BY_MARKET: Readonly<Record<MarketCode, CableMacroFamilyContent>> = {
  uk: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Cable Ladders" },
    ],
    eyebrow: "Cable Management Systems",
    title: "Cable Ladders",
    description:
      "High-capacity ladder systems and directional accessories for demanding industrial cable installations.",
    requestPackAction: "Request Technical Pack",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Download PDF Catalogue",
      meta: "PDF Catalogue",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
    },
    heroImage: `${IMAGE_BASE}/cable-ladders/hero/cable-ladders-transparent-hero.png`,
    heroImageAlt: "Gersan cable ladders in three widths with a horizontal bend accessory, product photograph",
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
        value: ["C-Profile Rung", "Heavy Duty", "Concave-Convex (GCMC)", "GMIE Type"],
      },
      {
        icon: "support",
        label: "Engineering Support",
        value: ["Load & Support Data", "Technical Drawings", "Custom Dimensions", "Installation Guidance"],
      },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction:
      "Four catalogue series make up the Cable Ladders range — rung, heavy-duty, concave-convex and GMIE-type ladders with their directional accessories.",
    series: [
      {
        slug: "cable-ladder-c-profile-rung",
        label: "Cable Ladder With C-Profile Rung",
        catalogueName: "Cable Ladder With C-Profile Rung",
        description: "C-profile rung ladder system with a full range of directional accessories.",
        image: `${IMAGE_BASE}/cable-ladders/family/cable-ladder-c-profile-rung-card.png`,
        imageAlt: "Gersan C-profile rung cable ladder, technical catalogue drawing",
        orderCodeCount: 621,
        href: "/products/cable-support-systems/cable-ladder-c-profile-rung",
      },
      {
        slug: "heavy-duty-cable-ladders",
        label: "Heavy Duty Type Cable Ladders",
        catalogueName: "Heavy Duty Type Cable Ladders",
        description: "Heavy-duty ladder construction for demanding industrial cable loads.",
        image: `${IMAGE_BASE}/cable-ladders/family/heavy-duty-cable-ladders-card.png`,
        imageAlt: "Gersan heavy duty type cable ladder, product photograph",
        orderCodeCount: 455,
        href: "/products/cable-support-systems/heavy-duty-cable-ladders",
      },
      {
        slug: "gcmc-concave-convex-ladder",
        label: "GCMC Concave-Convex Ladder and Covers",
        catalogueName: "GCMC Concave-Convex Ladder and Covers",
        description: "Concave and convex ladder sections with matching covers for level changes.",
        image: `${IMAGE_BASE}/cable-ladders/family/gcmc-concave-convex-ladder-covers-card.png`,
        imageAlt: "Gersan GCMC concave-convex cable ladder, product photograph",
        orderCodeCount: 382,
        href: "/products/cable-support-systems/gcmc-concave-convex-ladder",
      },
      {
        slug: "gmie-cable-ladders",
        label: "GMIE Type Cable Ladders",
        catalogueName: "GMIE Type Cable Ladders",
        description: "GMIE-type ladder system with its accessory range.",
        image: `${IMAGE_BASE}/cable-ladders/family/gmie-type-cable-ladders-card.png`,
        imageAlt: "Gersan GMIE type cable ladder, product photograph",
        orderCodeCount: 0,
        href: "/products/cable-support-systems/gmie-cable-ladders",
      },
    ],
    compatibleHeading: "Compatible Systems",
    compatibleIntroduction:
      "Cable ladders are carried and fixed by these support systems, and route alongside these other containment types.",
    compatibleSystems: [
      {
        label: "Support & Hanging Systems",
        description: "Support profiles, brackets, consoles and threaded rods that carry these ladders.",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        label: "Cable Trays & Trunking",
        description: "Perforated, heavy-duty and trunking systems for lighter cable routing.",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        label: "Wire-Mesh Systems",
        description: "Lightweight ventilated wire-mesh containment for flexible cable routing.",
        href: "/products/cable-support-systems/wire-mesh-systems",
      },
    ],
    supportHeading: "Need help selecting a cable ladder system?",
    supportDescription:
      "Get technical support with ladder sizing, load ratings, materials, finishes and project-specific configurations.",
    supportAction: "Request Technical Support",
    supportHref: REQUEST_HREF,
  },
  ua: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Кабельні драбини" },
    ],
    eyebrow: "Кабеленесучі системи",
    title: "Кабельні драбини",
    description:
      "Високопродуктивні драбинкові системи та напрямні аксесуари для відповідальних промислових кабельних монтажів.",
    requestPackAction: "Запросити технічний пакет",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Завантажити PDF-каталог",
      meta: "PDF-каталог",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Завантажити PDF-каталог систем кабельної підтримки Gersan",
    },
    heroImage: `${IMAGE_BASE}/cable-ladders/hero/cable-ladders-transparent-hero.png`,
    heroImageAlt: "Кабельні драбини Gersan трьох ширин з горизонтальним поворотним елементом, фото продукту",
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
        value: ["Сходинка з C-профілю", "Важкий тип", "Увігнуто-опуклі (GCMC)", "Тип GMIE"],
      },
      {
        icon: "support",
        label: "Інженерна підтримка",
        value: ["Дані навантаження та опор", "Технічні креслення", "Індивідуальні розміри", "Настанови з монтажу"],
      },
    ],
    seriesHeading: "Серії продукції цієї системи",
    seriesIntroduction:
      "Чотири серії каталогу складають асортимент кабельних драбин — сходинкові, важкого типу, увігнуто-опуклі та драбини типу GMIE з відповідними напрямними аксесуарами.",
    series: [
      {
        slug: "cable-ladder-c-profile-rung",
        label: "Кабельна драбина зі сходинкою з C-профілю",
        catalogueName: "Cable Ladder With C-Profile Rung",
        description: "Драбинкова система зі сходинкою з C-профілю з повним асортиментом напрямних аксесуарів.",
        image: `${IMAGE_BASE}/cable-ladders/family/cable-ladder-c-profile-rung-card.png`,
        imageAlt: "Кабельна драбина Gersan зі сходинкою з C-профілю, технічне креслення з каталогу",
        orderCodeCount: 621,
        href: "/products/cable-support-systems/cable-ladder-c-profile-rung",
      },
      {
        slug: "heavy-duty-cable-ladders",
        label: "Кабельні драбини важкого типу",
        catalogueName: "Heavy Duty Type Cable Ladders",
        description: "Конструкція драбини важкого типу для відповідальних промислових кабельних навантажень.",
        image: `${IMAGE_BASE}/cable-ladders/family/heavy-duty-cable-ladders-card.png`,
        imageAlt: "Кабельна драбина Gersan важкого типу, фото продукту",
        orderCodeCount: 455,
        href: "/products/cable-support-systems/heavy-duty-cable-ladders",
      },
      {
        slug: "gcmc-concave-convex-ladder",
        label: "Увігнуто-опукла драбина GCMC та кришки",
        catalogueName: "GCMC Concave-Convex Ladder and Covers",
        description: "Увігнуті та опуклі секції драбини з відповідними кришками для зміни рівня.",
        image: `${IMAGE_BASE}/cable-ladders/family/gcmc-concave-convex-ladder-covers-card.png`,
        imageAlt: "Кабельна драбина Gersan GCMC увігнуто-опукла, фото продукту",
        orderCodeCount: 382,
        href: "/products/cable-support-systems/gcmc-concave-convex-ladder",
      },
      {
        slug: "gmie-cable-ladders",
        label: "Кабельні драбини типу GMIE",
        catalogueName: "GMIE Type Cable Ladders",
        description: "Драбинкова система типу GMIE з відповідним асортиментом аксесуарів.",
        image: `${IMAGE_BASE}/cable-ladders/family/gmie-type-cable-ladders-card.png`,
        imageAlt: "Кабельна драбина Gersan типу GMIE, фото продукту",
        orderCodeCount: 0,
        href: "/products/cable-support-systems/gmie-cable-ladders",
      },
    ],
    compatibleHeading: "Сумісні системи",
    compatibleIntroduction:
      "Кабельні драбини несуться та фіксуються цими опорними системами, а також прокладаються поруч з іншими типами захисту кабелів.",
    compatibleSystems: [
      {
        label: "Системи опор та підвісу",
        description: "Опорні профілі, кронштейни, консолі та різьбові шпильки, що несуть ці драбини.",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        label: "Кабельні лотки та короби",
        description: "Перфоровані, важкого типу та коробчасті системи для легшого прокладання кабелів.",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        label: "Дротяні лоткові системи",
        description: "Легкі вентильовані дротяні лоткові системи для гнучкого прокладання кабелів.",
        href: "/products/cable-support-systems/wire-mesh-systems",
      },
    ],
    supportHeading: "Потрібна допомога з підбором системи кабельних драбин?",
    supportDescription:
      "Отримайте технічну підтримку з підбору розмірів драбин, розрахунку навантаження, матеріалів, покриттів та індивідуальних конфігурацій проєкту.",
    supportAction: "Запросити технічну підтримку",
    supportHref: REQUEST_HREF,
  },
};

export function cableLaddersContentForMarket(market: MarketCode): CableMacroFamilyContent {
  return CABLE_LADDERS_CONTENT_BY_MARKET[market];
}

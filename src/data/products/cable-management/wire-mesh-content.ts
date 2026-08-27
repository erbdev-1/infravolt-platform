import { publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import { CABLE_SUPPORT_CATALOGUE_PDF_HREF } from "./content";
import type { CableManagementFamilyContent } from "./types";
import type { CableVariantFamilyTemplateContent } from "./variant-family-template-types";

const IMAGE_BASE = publicMediaUrl("products/cable-management/wire-mesh-cable-systems");
const REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "cable-management-wire-mesh-systems",
  source: "/products/cable-support-systems",
});

function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

function wireMeshScheduleContent(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "wire-mesh-systems",
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Wire-Mesh Cable Trays", "Сітчасті кабельні лотки"),
    titleQualifier: "TTK · TTK-A · TTK-B · TTK-C · TTK-L",
    description: t(
      market,
      "Open wire-mesh cable-tray systems for ventilated, lightweight and flexible cable routing, available in multiple tray heights and widths with matching jointing and support accessories.",
      "Відкриті сітчасті кабельні лотки для вентильованого, легкого та гнучкого прокладання кабелів, доступні з різною висотою й шириною лотка та сумісними з'єднувальними й опорними елементами.",
    ),
    image: `${IMAGE_BASE}/family/wire-mesh-cable-system.webp`,
    imageAlt: t(
      market,
      "Gersan wire-mesh cable tray, technical catalogue visual",
      "Сітчастий кабельний лоток Gersan, технічне зображення з каталогу",
    ),
    breadcrumbs: [
      { label: t(market, "Home", "Головна"), href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Wire-Mesh Cable Trays", "Сітчасті кабельні лотки") },
    ],
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: t(market, "Download PDF Catalogue", "Завантажити PDF-каталог"),
      meta: t(market, "PDF Catalogue", "PDF-каталог"),
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: t(
        market,
        "Download the Gersan Cable Support Systems PDF catalogue",
        "Завантажити PDF-каталог систем кабельної підтримки Gersan",
      ),
    },
    technicalSnapshot: [],
    relatedFamiliesHeading: "",
    relatedFamilies: [],
    scheduleHeading: t(
      market,
      "Order Codes & Technical Schedule",
      "Коди замовлення та технічна таблиця",
    ),
    scheduleIntroduction: t(
      market,
      "The schedule combines 24 wire-mesh tray variants, three jointing pieces and six GTKD support consoles drawn from the Gersan Cable Support catalogue. Tray weights are shown in kg/m and jointing-piece weights in kg/unit. Catalogue configuration examples include 90° bends, tee connections and reducers without separate unsupported order codes.",
      "Таблиця об'єднує 24 варіанти сітчастих лотків, три з'єднувальні елементи та шість опорних консолей GTKD з каталогу Gersan Cable Support. Вагу лотків наведено в кг/м, а з'єднувальних елементів — у кг/шт. Каталожні приклади конфігурацій охоплюють повороти 90°, трійникові з'єднання та редукції без окремих непідтверджених кодів замовлення.",
    ),
    standardLabel: "BS EN 61537 / IEC 61537",
    scheduleColumnLabels: {
      family: t(market, "Family", "Серія"),
      type: t(market, "Type", "Тип"),
      stockCode: t(market, "Order Code", "Код замовлення"),
      width: t(market, "Width / A (mm)", "Ширина / A (мм)"),
      height: t(market, "Height (mm)", "Висота (мм)"),
      thickness: t(market, "Wire / e / Thickness (mm)", "Дріт / e / товщина (мм)"),
      length: t(market, "Length (mm)", "Довжина (мм)"),
      weight: t(market, "Approx. Weight", "Прибл. вага"),
    },
    accessoriesHeading: t(market, "Accessories & Supports", "Аксесуари та опори"),
    accessoriesIntroduction: t(
      market,
      "Catalogue-backed jointing pieces and GTKD support consoles are included in the schedule under their own Type filter. Catalogue configuration examples also cover 90° bends, tee connections and reducers without assigning unsupported order codes.",
      "Каталожні з'єднувальні елементи та опорні консолі GTKD включено до таблиці з окремим фільтром типу. Приклади конфігурацій у каталозі також охоплюють повороти 90°, трійникові з'єднання та редукції без додавання непідтверджених кодів замовлення.",
    ),
    accessoryDisplayGroups: [],
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: [],
    supportHeading: t(
      market,
      "Need help selecting the right cable management solution?",
      "Потрібна допомога з вибором правильного кабеленесучого рішення?",
    ),
    supportDescription: t(
      market,
      "Our technical team can support product selection, load requirements, installation coordination and project-specific configurations.",
      "Наша технічна команда допоможе з вибором продукції, вимогами до навантаження, координацією монтажу та конфігураціями для конкретного проєкту.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: REQUEST_HREF,
  };
}

export function wireMeshSystemsContentForMarket(
  market: MarketCode,
): CableVariantFamilyTemplateContent {
  const scheduleContent = wireMeshScheduleContent(market);

  return {
    breadcrumbs: [
      { label: t(market, "Home", "Головна"), href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Wire-Mesh Cable Trays", "Сітчасті кабельні лотки") },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Wire-Mesh Cable Trays", "Сітчасті кабельні лотки"),
    heroDescription: scheduleContent.description,
    heroImage: `${IMAGE_BASE}/hero/wire-mesh-systems-transparent-hero.png`,
    heroImageAlt: t(
      market,
      "Gersan wire-mesh cable tray system",
      "Система сітчастих кабельних лотків Gersan",
    ),
    heroVisualMode: "frameless",
    requestPackAction: scheduleContent.requestPackAction,
    requestPackHref: scheduleContent.requestPackHref,
    catalogueDocument: scheduleContent.catalogueDocument,
    technicalSnapshot: [
      {
        icon: "shield",
        label: t(market, "Applicable Standards", "Застосовні стандарти"),
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [
          t(market, "Hot-dip galvanised steel / wire", "Сталь / дріт гарячого цинкування"),
          t(market, "Optional SS 304 / SS 316 stainless wire", "Опційний нержавіючий дріт SS 304 / SS 316"),
        ],
      },
      {
        icon: "system",
        label: t(market, "Key Parameters", "Основні параметри"),
        value: [
          t(market, "Multiple tray heights", "Кілька варіантів висоти лотка"),
          t(market, "85–604 mm A dimension", "Розмір A 85–604 мм"),
          t(market, "4 mm wire specification", "Дріт 4 мм"),
          t(market, "Open ventilated construction", "Відкрита вентильована конструкція"),
        ],
      },
      {
        icon: "support",
        label: t(market, "Engineering Support", "Інженерна підтримка"),
        value: [
          t(market, "Load & support data", "Дані щодо навантаження та опор"),
          t(market, "Jointing accessories", "З'єднувальні аксесуари"),
          t(market, "Support consoles", "Опорні консолі"),
          t(market, "Installation guidance", "Рекомендації з монтажу"),
        ],
      },
    ],
    hideMaterialFilter: true,
    tabsHeading: t(market, "Wire-Mesh range", "Асортимент сітчастих лотків"),
    tabs: [
      {
        id: "all-wire-mesh",
        tabLabel: t(market, "All Wire-Mesh", "Усі сітчасті лотки"),
        content: scheduleContent,
        verifiedData: true,
      },
    ],
    supportHeading: scheduleContent.supportHeading,
    supportDescription: scheduleContent.supportDescription,
    supportAction: scheduleContent.supportAction,
    supportHref: scheduleContent.supportHref,
  };
}

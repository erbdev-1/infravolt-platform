import { publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import { cableTraysTrunkingSiblingFamilies } from "./cable-trays-trunking-content";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF, heavyDutyCableTraysH60ContentForMarket } from "./content";
import type { CableAccessoryDisplayGroup, CableManagementFamilyContent, CableManagementFamilySlug } from "./types";
import type { CableVariantFamilyTemplateContent } from "./variant-family-template-types";

const IMAGE_BASE = publicMediaUrl("products/cable-management");

function requestHrefFor(familySuffix: string): string {
  return buildEnquiryHref("technical-document", {
    system: "cable-management",
    family: `cable-management${familySuffix}`,
    source: "/products/cable-support-systems",
  });
}

function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

// Real accessory relationships from the family's own catalogue rows (see
// variants/normal-type-cable-trays.ts) — no per-accessory photos exist yet
// for this family (unlike heavy-duty-cable-trays-h60/accessories/), so
// every group renders without `image` and the compact card shows a
// neutral placeholder instead of a mismatched or invented photo.
function normalTypeAccessoryDisplayGroups(market: MarketCode): readonly CableAccessoryDisplayGroup[] {
  return [
    {
      slug: "flat-bends",
      label: t(market, "Flat Bends", "Плоскі повороти"),
      matches: ["90° Flat Bend", "90° Flat Bend Radius 300", "90° Flat Bend Radius 450", "90° Flat Bend Radius 600", "135° Flat Bend"],
    },
    { slug: "tees", label: t(market, "Tee Pieces", "Трійники"), matches: ["Tees “T”"] },
    { slug: "crossings", label: t(market, "Crossings (4-Way)", "Хрестовини (4-сторонні)"), matches: ["Crossing Element"] },
    {
      slug: "reducers",
      label: t(market, "Reducers", "Редукції"),
      matches: ["Normal Type Duct Reducer", "Normal Type Duct Right Reducer", "Normal Type Duct Left Reducer"],
    },
    {
      slug: "reducer-covers",
      label: t(market, "Reducer Covers", "Кришки редукцій"),
      matches: [
        "Normal Type Duct Reducer Cover",
        "Normal Type Duct Right Reducer Cover",
        "Normal Type Duct Left Reducer Cover",
      ],
    },
    { slug: "vertical-bends", label: t(market, "Vertical Bends", "Вертикальні повороти"), matches: ["Outside Vertical Bend", "Inside Vertical Bend"] },
    { slug: "jointing-pieces", label: t(market, "Jointing Pieces", "З'єднувальні елементи"), matches: ["Jointing Piece"] },
  ];
}

export function normalTypeCableTraysContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "normal-type-cable-trays",
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Normal Type Cable Trays", "Кабельні лотки стандартного типу"),
    titleQualifier: "H = 40 mm",
    description: t(
      market,
      "Standard-duty perforated and covered cable trays for general power and control cable routing in commercial and light-industrial installations. 50–600 mm width range, with a full range of bends, reducers, vertical bends and jointing pieces in the same system.",
      "Перфоровані та закриті кабельні лотки стандартного типу для прокладки силових та контрольних кабелів на комерційних та легких промислових об'єктах. Діапазон ширини 50–600 мм, з повним асортиментом поворотів, редукцій, вертикальних поворотів та з'єднувальних елементів в одній системі.",
    ),
    image: `${IMAGE_BASE}/normal-type-cable-trays/family/normal-type-cable-tray-h40.webp`,
    imageAlt: t(
      market,
      "Gersan normal type cable tray, h=40 mm, technical catalogue drawing",
      "Кабельний лоток Gersan стандартного типу, h=40 мм, технічне креслення з каталогу",
    ),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки") },
      { label: t(market, "Normal Type Cable Trays", "Кабельні лотки стандартного типу") },
    ],
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: requestHrefFor("-normal-type-cable-trays"),
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
    technicalSnapshot: [
      { icon: "shield", label: t(market, "Applicable Standards", "Застосовні стандарти"), value: ["BS EN 61537", "IEC 61537"] },
      { icon: "layers", label: t(market, "Material & Finish", "Матеріал та покриття"), value: [t(market, "Steel, Hot-Dip Galvanized", "Сталь, гаряче цинкування")] },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Perforated & Covered Options", "Перфоровані та закриті варіанти"),
          t(market, "50–600 mm Width Range", "Діапазон ширини 50–600 мм"),
          t(market, "H=40 mm Edge Height", "Висота борту H=40 мм"),
          t(market, "Full Accessory Range", "Повний асортимент аксесуарів"),
        ],
      },
      {
        icon: "support",
        label: t(market, "Engineering Support", "Інженерна підтримка"),
        value: [
          t(market, "Load & Support Data", "Дані навантаження та опор"),
          t(market, "Technical Drawings", "Технічні креслення"),
          t(market, "Custom Dimensions", "Індивідуальні розміри"),
          t(market, "Installation Guidance", "Настанови з монтажу"),
        ],
      },
    ],
    relatedFamiliesHeading: t(market, "Product families in this category", "Продуктові сімейства в цій категорії"),
    relatedFamilies: heavyDutyCableTraysH60ContentForMarket(market).relatedFamilies,
    scheduleHeading: t(market, "Order Codes & Technical Schedule", "Коди замовлення та технічна таблиця"),
    scheduleIntroduction: t(
      market,
      "Every model, stock code, dimension and weight below is drawn directly from the Gersan Cable Support catalogue.",
      "Кожна модель, код складу, розмір та вага нижче взяті безпосередньо з каталогу Gersan Cable Support.",
    ),
    standardLabel: "BS EN 61537",
    accessoriesHeading: t(market, "Compatible Accessories", "Сумісні аксесуари"),
    accessoriesIntroduction: t(
      market,
      "Bends, reducers, vertical bends and jointing pieces from the same h=40 mm system.",
      "Повороти, редукції, вертикальні повороти та з'єднувальні елементи з тієї ж системи h=40 мм.",
    ),
    accessoryDisplayGroups: normalTypeAccessoryDisplayGroups(market),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(
      market,
      "Need help selecting the right cable management solution?",
      "Потрібна допомога з підбором кабеленесучого рішення?",
    ),
    supportDescription: t(
      market,
      "Our technical team can support product selection, load requirements, installation coordination and project-specific configurations.",
      "Наша технічна команда допоможе з підбором продукції, вимогами до навантаження, координацією монтажу та індивідуальними конфігураціями проєкту.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: requestHrefFor("-normal-type-cable-trays"),
  };
}

// The Strengthened line has no accessory-type rows in its own catalogue
// data (see variants/strengthened-cable-trays-h*.ts) — straight tray
// lengths only, across 4 edge heights — so Compatible Accessories simply
// doesn't render for these tabs (no fabricated relationship to Normal
// Type's own accessories, which the source catalogue doesn't state).
function strengthenedContent(
  market: MarketCode,
  heightLabel: string,
  slug: CableManagementFamilySlug,
): CableManagementFamilyContent {
  return {
    slug,
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Strengthened Cable Trays", "Кабельні лотки посиленого типу"),
    titleQualifier: `H = ${heightLabel} mm`,
    description: t(
      market,
      `Reinforced-profile cable trays for heavier load spans, in the h=${heightLabel} mm edge height.`,
      `Кабельні лотки з посиленим профілем для важчих навантажень, висота борту h=${heightLabel} мм.`,
    ),
    image: `${IMAGE_BASE}/normal-type-cable-trays/family/normal-type-cable-tray-h40.webp`,
    imageAlt: t(market, "Gersan cable tray, technical catalogue drawing", "Кабельний лоток Gersan, технічне креслення з каталогу"),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки") },
      { label: t(market, "Normal Type Cable Trays", "Кабельні лотки стандартного типу") },
      { label: t(market, `Strengthened H = ${heightLabel} mm`, `Посилений тип H = ${heightLabel} мм`) },
    ],
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: requestHrefFor(`-strengthened-cable-trays-h${heightLabel}`),
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
    technicalSnapshot: [
      { icon: "shield", label: t(market, "Applicable Standards", "Застосовні стандарти"), value: ["BS EN 61537", "IEC 61537"] },
      { icon: "layers", label: t(market, "Material & Finish", "Матеріал та покриття"), value: [t(market, "Aluminium", "Алюміній")] },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [t(market, `H=${heightLabel} mm Edge Height`, `Висота борту H=${heightLabel} мм`), t(market, "Reinforced Profile", "Посилений профіль")],
      },
      {
        icon: "support",
        label: t(market, "Engineering Support", "Інженерна підтримка"),
        value: [
          t(market, "Load & Support Data", "Дані навантаження та опор"),
          t(market, "Technical Drawings", "Технічні креслення"),
          t(market, "Custom Dimensions", "Індивідуальні розміри"),
          t(market, "Installation Guidance", "Настанови з монтажу"),
        ],
      },
    ],
    relatedFamiliesHeading: t(market, "Product families in this category", "Продуктові сімейства в цій категорії"),
    relatedFamilies: heavyDutyCableTraysH60ContentForMarket(market).relatedFamilies,
    scheduleHeading: t(market, "Order Codes & Technical Schedule", "Коди замовлення та технічна таблиця"),
    scheduleIntroduction: t(
      market,
      "Every model, stock code, dimension and weight below is drawn directly from the Gersan Cable Support catalogue.",
      "Кожна модель, код складу, розмір та вага нижче взяті безпосередньо з каталогу Gersan Cable Support.",
    ),
    standardLabel: "BS EN 61537",
    accessoriesHeading: t(market, "Compatible Accessories", "Сумісні аксесуари"),
    accessoriesIntroduction: "",
    accessoryDisplayGroups: [],
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(
      market,
      "Need help selecting the right cable management solution?",
      "Потрібна допомога з підбором кабеленесучого рішення?",
    ),
    supportDescription: t(
      market,
      "Our technical team can support product selection, load requirements, installation coordination and project-specific configurations.",
      "Наша технічна команда допоможе з підбором продукції, вимогами до навантаження, координацією монтажу та індивідуальними конфігураціями проєкту.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: requestHrefFor(`-strengthened-cable-trays-h${heightLabel}`),
  };
}

export function strengthenedCableTraysH40ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return strengthenedContent(market, "40", "strengthened-cable-trays-h40");
}
export function strengthenedCableTraysH50ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return strengthenedContent(market, "50", "strengthened-cable-trays-h50");
}
export function strengthenedCableTraysH60ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return strengthenedContent(market, "60", "strengthened-cable-trays-h60");
}
export function strengthenedCableTraysH100ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return strengthenedContent(market, "100", "strengthened-cable-trays-h100");
}

export function normalTypeStrengthenedTemplateContentForMarket(market: MarketCode): CableVariantFamilyTemplateContent {
  return {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки"), href: "/products/cable-support-systems/cable-trays-trunking" },
      { label: t(market, "Normal Type Cable Trays", "Кабельні лотки стандартного типу") },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Normal Type Cable Trays", "Кабельні лотки стандартного типу"),
    // Variant-independent by design — Normal Type vs Strengthened, and edge
    // height within Strengthened, are chosen via the selector below.
    heroDescription: t(
      market,
      "Standard-duty perforated and covered cable trays for general power and control cable routing, plus the reinforced Strengthened line for heavier load spans. Normal Type covers 50–600 mm widths at h=40 mm; Strengthened is available in h=40 to h=100 mm edge heights.",
      "Перфоровані та закриті кабельні лотки стандартного типу для прокладки силових та контрольних кабелів, а також посилена лінія для важчих навантажень. Стандартний тип охоплює ширину 50–600 мм при h=40 мм; посилений тип доступний у висотах борту h=40–100 мм.",
    ),
    heroImage: `${IMAGE_BASE}/cable-trays-trunking/card/normal-type-cable-trays-transparent-card.png`,
    heroImageAlt: t(
      market,
      "Gersan normal type cable trays with bend accessory, product photograph",
      "Кабельні лотки Gersan стандартного типу з поворотним елементом, фото продукту",
    ),
    heroVisualMode: "frameless",
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: requestHrefFor("-normal-type-cable-trays"),
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
    technicalSnapshot: [
      { icon: "shield", label: t(market, "Applicable Standards", "Застосовні стандарти"), value: ["BS EN 61537", "IEC 61537"] },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [
          t(market, "Steel, Hot-Dip Galvanized (Normal Type)", "Сталь, гаряче цинкування (стандартний тип)"),
          t(market, "Aluminium (Strengthened)", "Алюміній (посилений тип)"),
        ],
      },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Perforated & Covered Options", "Перфоровані та закриті варіанти"),
          t(market, "50–600 mm Width Range", "Діапазон ширини 50–600 мм"),
          t(market, "H=40–100 mm Edge Heights", "Висота борту H=40–100 мм"),
          t(market, "Full Accessory Range", "Повний асортимент аксесуарів"),
        ],
      },
      {
        icon: "support",
        label: t(market, "Engineering Support", "Інженерна підтримка"),
        value: [
          t(market, "Load & Support Data", "Дані навантаження та опор"),
          t(market, "Technical Drawings", "Технічні креслення"),
          t(market, "Custom Dimensions", "Індивідуальні розміри"),
          t(market, "Installation Guidance", "Настанови з монтажу"),
        ],
      },
    ],
    tabsHeading: t(market, "Select Product Variant", "Оберіть варіант продукту"),
    tabs: [
      {
        id: "normal-type",
        tabLabel: t(market, "Normal Type", "Стандартний тип"),
        content: normalTypeCableTraysContentForMarket(market),
        verifiedData: true,
      },
      {
        id: "strengthened-h40",
        tabLabel: t(market, "Strengthened H = 40", "Посилений H = 40"),
        content: strengthenedCableTraysH40ContentForMarket(market),
        verifiedData: true,
      },
      {
        id: "strengthened-h50",
        tabLabel: t(market, "Strengthened H = 50", "Посилений H = 50"),
        content: strengthenedCableTraysH50ContentForMarket(market),
        verifiedData: true,
      },
      {
        id: "strengthened-h60",
        tabLabel: t(market, "Strengthened H = 60", "Посилений H = 60"),
        content: strengthenedCableTraysH60ContentForMarket(market),
        verifiedData: true,
      },
      {
        id: "strengthened-h100",
        tabLabel: t(market, "Strengthened H = 100", "Посилений H = 100"),
        content: strengthenedCableTraysH100ContentForMarket(market),
        verifiedData: true,
      },
    ],
    siblingFamiliesHeading: t(market, "Other Cable Tray & Trunking Families", "Інші родини кабельних лотків та коробів"),
    siblingFamilies: cableTraysTrunkingSiblingFamilies(market),
    siblingCardVariant: "icon",
    currentFamilySlug: "normal-type-cable-trays",
    supportHeading: t(
      market,
      "Need help selecting the right cable management solution?",
      "Потрібна допомога з підбором кабеленесучого рішення?",
    ),
    supportDescription: t(
      market,
      "Our technical team can support product selection, load requirements, installation coordination and project-specific configurations.",
      "Наша технічна команда допоможе з підбором продукції, вимогами до навантаження, координацією монтажу та індивідуальними конфігураціями проєкту.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: requestHrefFor("-normal-type-cable-trays"),
  };
}

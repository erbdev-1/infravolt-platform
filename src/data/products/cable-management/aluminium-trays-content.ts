import { publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import { cableTraysTrunkingSiblingFamilies } from "./cable-trays-trunking-content";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF, heavyDutyCableTraysH60ContentForMarket } from "./content";
import type { CableAccessoryDisplayGroup, CableManagementFamilyContent, CableManagementFamilySlug } from "./types";
import type { CableVariantFamilyTemplateContent } from "./variant-family-template-types";

const IMAGE_BASE = publicMediaUrl("products/cable-management");
const REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "cable-management-aluminium-cable-trays",
  source: "/products/cable-support-systems",
});

function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

// No per-accessory photos exist yet for this family — every group renders
// without `image` and the compact card shows a neutral placeholder instead
// of a mismatched photo. Real GNM/GNM-A/GNM-B/GNM-C structural sub-series
// (see variants/aluminium-cable-trays-h70-core.ts) stay visible via their
// own Model codes in the schedule rather than becoming extra tabs.
function aluminiumAccessoryDisplayGroups(market: MarketCode): readonly CableAccessoryDisplayGroup[] {
  return [
    {
      slug: "flat-bends",
      label: t(market, "Flat Bends", "Плоскі повороти"),
      matches: ["90° Flat Bend Element (6063 Aluminium Alloy)", "135° Flat Bend Element (6063 Aluminium Alloy)"],
    },
    { slug: "tees", label: t(market, "Tee Pieces", "Трійники"), matches: ['Tees "T" Element (6063 Aluminium Alloy)'] },
    { slug: "crossings", label: t(market, "Crossings (4-Way)", "Хрестовини (4-сторонні)"), matches: ["Crossing Element (6063 Aluminium Alloy)"] },
    {
      slug: "vertical-bends",
      label: t(market, "Vertical Bends", "Вертикальні повороти"),
      matches: ["Inside Vertical Element (6063 Aluminium Alloy)", "Outside Vertical Element (6063 Aluminium Alloy)"],
    },
    {
      slug: "covers",
      label: t(market, "Covers", "Кришки"),
      matches: [
        "Cover For Cable Tray (5754 Aluminium Alloy)",
        "90° Flat Bend Element Cover (5754) Aluminium Alloy",
        "135° Flat Bend Element Cover (5754 Aluminium Alloy)",
        'Tees "T" Element Cover (5754) Aluminium Alloy',
        "Crossing Element Cover (5754) Aluminium Alloy",
        "Inside Vertical Element Cover (5754) Aluminium Alloy",
        "Outside Vertical Element Cover (5754) Aluminium Alloy",
      ],
    },
    { slug: "separators", label: t(market, "Separators", "Розділювачі"), matches: ["Seperator (5754 Aluminium Alloy)"] },
    { slug: "cover-clamps", label: t(market, "Cover Clamps", "Затискачі кришок"), matches: ["Cover Clamps (5754 Alüminyum Alloy)"] },
  ];
}

function aluminiumContent(market: MarketCode, heightLabel: string, slug: CableManagementFamilySlug): CableManagementFamilyContent {
  return {
    slug,
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Aluminium Cable Trays", "Алюмінієві кабельні лотки"),
    titleQualifier: `H = ${heightLabel} mm`,
    description: t(
      market,
      `Lightweight aluminium profile cable trays, h=${heightLabel} mm, 200–600 mm width range, with bends, tees, crossings, vertical bends, covers and separators in the same system.`,
      `Легкі кабельні лотки з алюмінієвого профілю, h=${heightLabel} мм, діапазон ширини 200–600 мм, з поворотами, трійниками, хрестовинами, вертикальними поворотами, кришками та розділювачами в одній системі.`,
    ),
    image: `${IMAGE_BASE}/aluminium-cable-trays/family/aluminium-cable-tray.webp`,
    imageAlt: t(
      market,
      "Gersan aluminium cable tray, technical catalogue drawing",
      "Алюмінієвий кабельний лоток Gersan, технічне креслення з каталогу",
    ),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки") },
      { label: t(market, "Aluminium Cable Trays", "Алюмінієві кабельні лотки") },
      { label: `H = ${heightLabel} mm` },
    ],
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: `${REQUEST_HREF}-h${heightLabel}`,
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
      { icon: "layers", label: t(market, "Material & Finish", "Матеріал та покриття"), value: [t(market, "Aluminium (6063 / 5754 Alloy)", "Алюміній (сплав 6063 / 5754)")] },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Lightweight Profile", "Легкий профіль"),
          t(market, "200–600 mm Width Range", "Діапазон ширини 200–600 мм"),
          t(market, `H=${heightLabel} mm Edge Height`, `Висота борту H=${heightLabel} мм`),
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
      `Bends, tees, crossings, vertical bends, covers and separators from the same h=${heightLabel} mm system.`,
      `Повороти, трійники, хрестовини, вертикальні повороти, кришки та розділювачі з тієї ж системи h=${heightLabel} мм.`,
    ),
    accessoryDisplayGroups: aluminiumAccessoryDisplayGroups(market),
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
    supportHref: `${REQUEST_HREF}-h${heightLabel}`,
  };
}

export function aluminiumCableTraysH70ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return aluminiumContent(market, "70", "aluminium-cable-trays-h70");
}
export function aluminiumCableTraysH100ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return aluminiumContent(market, "100", "aluminium-cable-trays-h100");
}

export function aluminiumCableTraysTemplateContentForMarket(market: MarketCode): CableVariantFamilyTemplateContent {
  return {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки"), href: "/products/cable-support-systems/cable-trays-trunking" },
      { label: t(market, "Aluminium Cable Trays", "Алюмінієві кабельні лотки") },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Aluminium Cable Trays", "Алюмінієві кабельні лотки"),
    heroDescription: t(
      market,
      "Lightweight aluminium profile cable trays for installations where weight matters, in h=70 and h=100 mm edge heights, with a full range of bends, tees, crossings, vertical bends, covers and separators in the same system.",
      "Легкі кабельні лотки з алюмінієвого профілю для об'єктів, де важлива вага, у висотах борту h=70 та h=100 мм, з повним асортиментом поворотів, трійників, хрестовин, вертикальних поворотів, кришок та розділювачів в одній системі.",
    ),
    heroImage: `${IMAGE_BASE}/cable-trays-trunking/card/aluminium-cable-trays-transparent-card.png`,
    heroImageAlt: t(
      market,
      "Gersan aluminium cable trays and bend accessory, product photograph",
      "Алюмінієві кабельні лотки Gersan з поворотним елементом, фото продукту",
    ),
    heroVisualMode: "frameless",
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
    technicalSnapshot: [
      { icon: "shield", label: t(market, "Applicable Standards", "Застосовні стандарти"), value: ["BS EN 61537", "IEC 61537"] },
      { icon: "layers", label: t(market, "Material & Finish", "Матеріал та покриття"), value: [t(market, "Aluminium (6063 / 5754 Alloy)", "Алюміній (сплав 6063 / 5754)")] },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Lightweight Profile", "Легкий профіль"),
          t(market, "200–600 mm Width Range", "Діапазон ширини 200–600 мм"),
          t(market, "H=70–100 mm Edge Heights", "Висота борту H=70–100 мм"),
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
      { id: "h70", tabLabel: "H = 70", content: aluminiumCableTraysH70ContentForMarket(market), verifiedData: true },
      { id: "h100", tabLabel: "H = 100", content: aluminiumCableTraysH100ContentForMarket(market), verifiedData: true },
    ],
    siblingFamiliesHeading: t(market, "Other Cable Tray & Trunking Families", "Інші родини кабельних лотків та коробів"),
    siblingFamilies: cableTraysTrunkingSiblingFamilies(market),
    siblingCardVariant: "icon",
    currentFamilySlug: "aluminium-cable-trays",
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
    supportHref: REQUEST_HREF,
  };
}

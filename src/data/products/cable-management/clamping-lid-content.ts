import type { MarketCode } from "@/modules/markets/types";

import { cableTraysTrunkingSiblingFamilies } from "./cable-trays-trunking-content";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF, heavyDutyCableTraysH60ContentForMarket } from "./content";
import type { CableAccessoryDisplayGroup, CableManagementFamilyContent } from "./types";
import type { CableVariantFamilyTemplateContent } from "./variant-family-template-types";

const IMAGE_BASE = "/assets/products/cable-management";
const REQUEST_HREF = "/uk-support?request=technical-pack&product=cable-management-cable-tray-clamping-lid";

function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

// Real accessory relationships from the family's own catalogue rows (see
// variants/cable-tray-clamping-lid.ts) — no per-accessory photos exist yet
// for this family, so every group renders without `image` and the compact
// card shows a neutral placeholder instead of a mismatched photo.
function clampingLidAccessoryDisplayGroups(market: MarketCode): readonly CableAccessoryDisplayGroup[] {
  return [
    { slug: "flat-bends", label: t(market, "Flat Bends", "Плоскі повороти"), matches: ["90° With Clamping Flat Bend Lid"] },
    { slug: "tees", label: t(market, "Tee Pieces", "Трійники"), matches: ['Tee "T" With Clamping'] },
    { slug: "crossings", label: t(market, "Crossings (4-Way)", "Хрестовини (4-сторонні)"), matches: ["Crossing With Clamping Lid"] },
    { slug: "vertical-bends", label: t(market, "Vertical Bends", "Вертикальні повороти"), matches: ["Inside and Outside Vertical With Clamping Lid"] },
    { slug: "covers", label: t(market, "Covers", "Кришки"), matches: ["Cover for Cable Tray"] },
    { slug: "roofed-covers", label: t(market, "Roofed Covers", "Дахові кришки"), matches: ["Duct Type Roofed Cover"] },
    { slug: "cover-clamps", label: t(market, "Cover Clamps", "Затискачі кришок"), matches: ["Cover Clamps"] },
    { slug: "cable-separators", label: t(market, "Cable Separators", "Кабельні розділювачі"), matches: ["Seperatör (Kanal) / Seperator (Cable)"] },
    { slug: "ladder-separators", label: t(market, "Ladder Separators", "Розділювачі драбин"), matches: ["Seperator (Ladder)"] },
    { slug: "end-caps", label: t(market, "End Caps", "Торцеві заглушки"), matches: ["End Cap"] },
  ];
}

// The catalogue's only straight tray-body order codes for this family are
// h=100 mm (see variants/cable-tray-clamping-lid.ts) — its bends, tees,
// crossings and vertical accessories are separately catalogued across
// h=60/70/100 mm compatible variants (real model-suffix distinction:
// no suffix = h60, "A" = h70, "B" = h100), visible via the schedule
// table's own Height column. No h=40/50 tray-body data exists, so this
// page has a single tab (no fabricated variant selector) rather than the
// full H40/50/60/70/100 spread — see the completion notes.
export function cableTrayClampingLidContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "cable-tray-clamping-lid",
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Cable Tray With Clamping Lid", "Кабельний лоток із затискною кришкою"),
    titleQualifier: "H = 100 mm",
    description: t(
      market,
      "Press-fit clamping-lid cable trays for fast tool-free lid installation, in perforated and non-perforated straight lengths at h=100 mm, with bends, tees, crossings and vertical accessories available in h=60/70/100 mm compatible variants.",
      "Кабельні лотки із затискною кришкою для швидкого монтажу без інструментів, перфоровані та закриті прямі секції h=100 мм, з поворотами, трійниками, хрестовинами та вертикальними аксесуарами у сумісних варіантах h=60/70/100 мм.",
    ),
    image: `${IMAGE_BASE}/cable-trays-trunking/card/cable-tray-with-clamping-lid-card.png`,
    imageAlt: t(market, "Gersan cable tray with clamping lid, product photograph", "Кабельний лоток Gersan із затискною кришкою, фото продукту"),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби") },
      { label: t(market, "Cable Tray With Clamping Lid", "Кабельний лоток із затискною кришкою") },
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
    technicalSnapshot: [
      { icon: "shield", label: t(market, "Applicable Standards", "Застосовні стандарти"), value: ["BS EN 61537", "IEC 61537"] },
      { icon: "layers", label: t(market, "Material & Finish", "Матеріал та покриття"), value: [t(market, "Aluminium", "Алюміній")] },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Tool-Free Clamping Lid", "Затискна кришка без інструментів"),
          t(market, "Perforated & Non-Perforated", "Перфоровані та закриті"),
          t(market, "50–600 mm Width Range", "Діапазон ширини 50–600 мм"),
          t(market, "H=60–100 mm Accessory Range", "Аксесуари для висот H=60–100 мм"),
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
      "Bends, tees, crossings, vertical bends, covers and separators from the same system.",
      "Повороти, трійники, хрестовини, вертикальні повороти, кришки та розділювачі з тієї ж системи.",
    ),
    accessoryDisplayGroups: clampingLidAccessoryDisplayGroups(market),
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
    supportHref: REQUEST_HREF,
  };
}

// Single tab — see the comment on cableTrayClampingLidContentForMarket above
// for why no H40/50/60/70/100 selector is shown (no such tray-body data
// exists in the source catalogue). CableVariantFamilyTemplate hides the
// selector automatically when there's only one tab.
export function clampingLidTemplateContentForMarket(market: MarketCode): CableVariantFamilyTemplateContent {
  const familyContent = cableTrayClampingLidContentForMarket(market);

  return {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби"), href: "/products/cable-support-systems/cable-trays-trunking" },
      { label: t(market, "Cable Tray With Clamping Lid", "Кабельний лоток із затискною кришкою") },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Cable Tray With Clamping Lid", "Кабельний лоток із затискною кришкою"),
    heroDescription: familyContent.description,
    heroImage: `${IMAGE_BASE}/cable-trays-trunking/card/cable-tray-with-clamping-lid-transparent-card.png`,
    heroImageAlt: t(
      market,
      "Gersan cable tray with clamping lid cover, product photograph",
      "Кабельний лоток Gersan із затискною кришкою, фото продукту",
    ),
    heroVisualMode: "frameless",
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: REQUEST_HREF,
    catalogueDocument: familyContent.catalogueDocument,
    technicalSnapshot: familyContent.technicalSnapshot,
    tabsHeading: t(market, "Select Product Variant", "Оберіть варіант продукту"),
    tabs: [
      {
        id: "h100",
        tabLabel: "H = 100",
        content: familyContent,
        verifiedData: true,
      },
    ],
    siblingFamiliesHeading: t(market, "Other Cable Tray & Trunking Families", "Інші родини кабельних лотків та коробів"),
    siblingFamilies: cableTraysTrunkingSiblingFamilies(market),
    siblingCardVariant: "icon",
    currentFamilySlug: "cable-tray-clamping-lid",
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

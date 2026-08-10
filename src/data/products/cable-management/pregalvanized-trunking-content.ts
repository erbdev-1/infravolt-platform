import type { MarketCode } from "@/modules/markets/types";

import { cableTraysTrunkingSiblingFamilies } from "./cable-trays-trunking-content";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF, heavyDutyCableTraysH60ContentForMarket } from "./content";
import type { CableAccessoryDisplayGroup, CableManagementFamilyContent, CableManagementFamilySlug } from "./types";
import type { CableVariantFamilyTemplateContent } from "./variant-family-template-types";

const IMAGE_BASE = "/assets/products/cable-management";
const REQUEST_HREF = "/uk-support?request=technical-pack&product=cable-management-pregalvanized-trunking-system";

function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

// No per-accessory photos exist yet for this family — every group renders
// without `image` and the compact card shows a neutral placeholder instead
// of a mismatched photo. Two source rows whose product name was corrupted
// during PDF extraction (a duplicated page-header artifact with no
// recoverable English name) and ten generic, height-ambiguous "Quick Fix
// Pregalvanized Cable Trunking" rows (no "(h=XX)" suffix, so they can't be
// confidently assigned to one of the four height tabs) are excluded from
// every tab's dataset — see variants/pregalvanized-trunking-h*.ts.
function accessoryGroups(
  market: MarketCode,
  names: {
    flatBend: string;
    bend45?: string;
    tee: string;
    crossing: string;
    internalBend: string;
    externalBend: string;
    externalBend45: string;
    reducer?: string;
  },
): readonly CableAccessoryDisplayGroup[] {
  const groups: CableAccessoryDisplayGroup[] = [
    { slug: "flat-bends", label: t(market, "Flat Bends", "Плоскі повороти"), matches: [names.flatBend] },
    { slug: "tees", label: t(market, "Tee Pieces", "Трійники"), matches: [names.tee] },
    { slug: "crossings", label: t(market, "Crossings", "Хрестовини"), matches: [names.crossing] },
    { slug: "internal-bends", label: t(market, "Internal Bends", "Внутрішні повороти"), matches: [names.internalBend] },
    { slug: "external-bends", label: t(market, "External Bends", "Зовнішні повороти"), matches: [names.externalBend] },
    { slug: "external-bends-45", label: t(market, "45° External Bends", "45° зовнішні повороти"), matches: [names.externalBend45] },
    { slug: "end-caps", label: t(market, "End Caps", "Торцеві заглушки"), matches: ["End Cap Elements For Quick Fix Pregalvanized Cable Trunking"] },
    {
      slug: "jointing-pieces",
      label: t(market, "Jointing Pieces", "З'єднувальні елементи"),
      matches: ["Jointing Pieces For Quick Fix Pregalvanized Cable Trunking"],
    },
  ];
  if (names.bend45) groups.splice(1, 0, { slug: "bends-45", label: t(market, "45° Bends", "45° повороти"), matches: [names.bend45] });
  if (names.reducer) groups.push({ slug: "reducers", label: t(market, "Reducers", "Редукції"), matches: [names.reducer] });
  return groups;
}

function pregalvanizedContent(
  market: MarketCode,
  heightLabel: string,
  slug: CableManagementFamilySlug,
  widthRange: string,
  accessoryDisplayGroups: readonly CableAccessoryDisplayGroup[],
): CableManagementFamilyContent {
  return {
    slug,
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Pregalvanized Trunking System", "Прегальванізована система коробів"),
    titleQualifier: `H = ${heightLabel} mm`,
    description: t(
      market,
      `Quick-fix pregalvanized cable trunking, h=${heightLabel} mm, ${widthRange} mm width range, with bends, tees, crossings, end caps and jointing pieces in the same system.`,
      `Швидкомонтажний прегальванізований кабельний короб, h=${heightLabel} мм, діапазон ширини ${widthRange} мм, з поворотами, трійниками, хрестовинами, торцевими заглушками та з'єднувальними елементами в одній системі.`,
    ),
    image: `${IMAGE_BASE}/pregalvanized-trunking-system/family/pregalvanized-trunking-system.webp`,
    imageAlt: t(
      market,
      "Gersan pregalvanized trunking system, exploded assembly overview",
      "Прегальванізована система коробів Gersan, розібраний вигляд збірки",
    ),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби") },
      { label: t(market, "Pregalvanized Trunking System", "Прегальванізована система коробів") },
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
      { icon: "layers", label: t(market, "Material & Finish", "Матеріал та покриття"), value: [t(market, "Aluminium", "Алюміній")] },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Quick-Fix Assembly", "Швидкомонтажна збірка"),
          t(market, `${widthRange} mm Width Range`, `Діапазон ширини ${widthRange} мм`),
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
      `Bends, tees, crossings, end caps and jointing pieces from the same h=${heightLabel} mm system.`,
      `Повороти, трійники, хрестовини, торцеві заглушки та з'єднувальні елементи з тієї ж системи h=${heightLabel} мм.`,
    ),
    accessoryDisplayGroups,
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

export function pregalvanizedTrunkingH50ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return pregalvanizedContent(
    market,
    "50",
    "pregalvanized-trunking-h50",
    "45–200",
    accessoryGroups(market, {
      flatBend: "90° Bend Elements Quick Fix Pregalvanized Cable Trunking (h=50)",
      tee: 'Tee "T" Elements Quick Fix Pregalvanized Cable Trunking (h=50)',
      crossing: "Crossing Elements Quick Fix Pregalvanized Cable Trunking (h=50mm)",
      internalBend: "Internal Bend Elements Quick Fix Pregalvanized Cable Trunking (H=50)",
      externalBend: "Enternal Bend Elements Quick Fix Pregalvanized Cable Trunking (h=50 mm)",
      externalBend45: "45° Enternal Bend Elements Quick Fix Pregalvanized Cable Trunking (H=50)",
      reducer: "Reducer",
    }),
  );
}

export function pregalvanizedTrunkingH75ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return pregalvanizedContent(
    market,
    "75",
    "pregalvanized-trunking-h75",
    "95–200",
    accessoryGroups(market, {
      flatBend: "90° Bend Elements Quick Fix Pregalvanized Cable Trunking (h=75)",
      bend45: "45° Bend Elements Quick Fix Pregalvanized Cable Trunking (h=75)",
      tee: 'Tee "T" Elements Quick Fix Pregalvanized Cable Trunking (h=75)',
      crossing: "Crossing Elements Quick Fix Pregalvanized Cable Trunking (h=75mm)",
      internalBend: "Internal Bend Elements Quick Fix Pregalvanized Cable Trunking (h=75)",
      externalBend: "Enternal Bend Elements Quick Fix Pregalvanized Cable Trunking (h=75 mm)",
      externalBend45: "45° Enternal Bend Elements Quick Fix Pregalvanized Cable Trunking (H=75)",
    }),
  );
}

export function pregalvanizedTrunkingH100ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return pregalvanizedContent(
    market,
    "100",
    "pregalvanized-trunking-h100",
    "95–200",
    accessoryGroups(market, {
      flatBend: "90° Bend Elements Quick Fix Pregalvanized Cable Trunking (h=100)",
      bend45: "45° Bend Elements Quick Fix Pregalvanized Cable Trunking (h=100)",
      tee: 'Tee "T" Elements Quick Fix Pregalvanized Cable Trunking (h=100)',
      crossing: "Crossing Elements Quick Fix Pregalvanized Cable Trunking (h=100 mm)",
      internalBend: "Internal Bend Elements Quick Fix Pregalvanized Cable Trunking (h=100 mm)",
      externalBend: "Enternal Bend Elements Quick Fix Pregalvanized Cable Trunking (h=100 mm)",
      externalBend45: "45° Enternal Bend Elements Quick Fix Pregalvanized Cable Trunking (H=100)",
    }),
  );
}

export function pregalvanizedTrunkingH150ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return pregalvanizedContent(
    market,
    "150",
    "pregalvanized-trunking-h150",
    "145–200",
    accessoryGroups(market, {
      flatBend: "90° Bend Elements Quick Fix Pregalvanized Cable Trunking (h=150)",
      bend45: "45° Bend Elements Quick Fix Pregalvanized Cable Trunking (h=150)",
      tee: 'Tee "T" Elements Quick Fix Pregalvanized Cable Trunking (h=150)',
      crossing: "Crossing Elements Quick Fix Pregalvanized Cable Trunking (h=150 mm)",
      internalBend: "Internal Bend Elements Quick Fix Pregalvanized Cable Trunking (h=150 mm)",
      externalBend: "Enternal Bend Elements Quick Fix Pregalvanized Cable Trunking (h=150mm)",
      externalBend45: "45° Enternal Bend Elements Quick Fix Pregalvanized Cable Trunking (H=150)",
    }),
  );
}

export function pregalvanizedTrunkingTemplateContentForMarket(market: MarketCode): CableVariantFamilyTemplateContent {
  return {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби"), href: "/products/cable-support-systems/cable-trays-trunking" },
      { label: t(market, "Pregalvanized Trunking System", "Прегальванізована система коробів") },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Pregalvanized Trunking System", "Прегальванізована система коробів"),
    heroDescription: t(
      market,
      "Quick-fix pregalvanized cable trunking for fast, tool-light installation, in h=50 to h=150 mm edge heights, with a full range of bends, tees, crossings, end caps and jointing pieces in the same system.",
      "Швидкомонтажний прегальванізований кабельний короб для швидкого монтажу з мінімумом інструменту, у висотах борту h=50–150 мм, з повним асортиментом поворотів, трійників, хрестовин, торцевих заглушок та з'єднувальних елементів в одній системі.",
    ),
    heroImage: `${IMAGE_BASE}/cable-trays-trunking/card/quick-fix-pregalvanized-cable-trunking-transparent-card.png`,
    heroImageAlt: t(
      market,
      "Gersan pregalvanized trunking system with corner and straight sections, product photograph",
      "Прегальванізована коробчаста система Gersan з кутовими та прямими секціями, фото продукту",
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
    // Not shown by default (default off unless a family has genuinely mixed
    // materials worth filtering by) — this family is consistently aluminium.
    technicalSnapshot: [
      { icon: "shield", label: t(market, "Applicable Standards", "Застосовні стандарти"), value: ["BS EN 61537", "IEC 61537"] },
      { icon: "layers", label: t(market, "Material & Finish", "Матеріал та покриття"), value: [t(market, "Aluminium", "Алюміній")] },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Quick-Fix Assembly", "Швидкомонтажна збірка"),
          t(market, "45–200 mm Width Range", "Діапазон ширини 45–200 мм"),
          t(market, "H=50–150 mm Edge Heights", "Висота борту H=50–150 мм"),
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
      { id: "h50", tabLabel: "H = 50", content: pregalvanizedTrunkingH50ContentForMarket(market), verifiedData: true },
      { id: "h75", tabLabel: "H = 75", content: pregalvanizedTrunkingH75ContentForMarket(market), verifiedData: true },
      { id: "h100", tabLabel: "H = 100", content: pregalvanizedTrunkingH100ContentForMarket(market), verifiedData: true },
      { id: "h150", tabLabel: "H = 150", content: pregalvanizedTrunkingH150ContentForMarket(market), verifiedData: true },
    ],
    siblingFamiliesHeading: t(market, "Other Cable Tray & Trunking Families", "Інші родини кабельних лотків та коробів"),
    siblingFamilies: cableTraysTrunkingSiblingFamilies(market),
    siblingCardVariant: "icon",
    currentFamilySlug: "pregalvanized-trunking-system",
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

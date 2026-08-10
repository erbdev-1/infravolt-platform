import type { MarketCode } from "@/modules/markets/types";

import type { CableAccessoryDisplayGroup, CableManagementFamilyContent, CableManagementLabels } from "./types";

const IMAGE_BASE = "/assets/products/cable-management";

// Real file, already in the repo at this path (not /public/documents/... and
// not duplicated anywhere) — see public/assets/documents/cable-support/.
// Follows the same convention as busbar/g-bus/earthing-lightning catalogues.
export const CABLE_SUPPORT_CATALOGUE_PDF_HREF =
  "/assets/documents/cable-support/cable_support.pdf";

// Picks the right-language string for a given market — used throughout
// this file (and the other cable-management *-content.ts files) instead
// of full duplicate {uk:{...}, ua:{...}} object literals, because so much
// of this product line's content is cross-referenced between files
// (HEAVY_DUTY_CABLE_TRAYS_H60_CONTENT.relatedFamilies/.resources are
// reused by five other families) — a per-field picker keeps the English
// and Ukrainian copy for each string next to each other and avoids
// duplicating entire 90-line object literals (and the copy-paste drift
// that invites). The category and macro-family pages (category-content.ts,
// support-hanging-content.ts, ...) use the literal Record<MarketCode, T>
// form instead since they're each used exactly once and don't cross-
// reference each other's content.
function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

const HEAVY_DUTY_ACCESSORY_IMAGE_BASE = "/assets/products/cable-management/heavy-duty-cable-trays-h60/accessories";
const HEAVY_DUTY_H40_ACCESSORY_IMAGE_BASE =
  "/assets/products/cable-management/cable-trays-trunking/compatible-systems";

// Real accessory photos only exist for the h=60mm series (reused across
// h=50mm) and, separately, the h=40mm series has its own real photo set —
// see the two image bases above. `matches` values are the catalogue's own
// English accessoryGroup strings (from variants/*.ts, generated from
// product-data.csv) and are never translated — they're a data-matching
// key, not display text.
function heavyDutyAccessoryDisplayGroups(
  market: MarketCode,
  imageBase: string,
): readonly CableAccessoryDisplayGroup[] {
  return [
    {
      slug: "flat-bends",
      label: t(market, "Flat Bends", "Горизонтальні повороти"),
      image: `${imageBase}/${imageBase === HEAVY_DUTY_ACCESSORY_IMAGE_BASE ? "heavy-duty-90-degree-flat-bend-90r-h60" : "heavy-duty-flat-bend-h40"}.webp`,
      matches: ["Flat Bend", "135° Flat Bend", "Radiused Flat Bend"],
    },
    {
      slug: "tees",
      label: t(market, "Tee Pieces", "Трійники"),
      image: `${imageBase}/${imageBase === HEAVY_DUTY_ACCESSORY_IMAGE_BASE ? "heavy-duty-tee-90r-h60" : "heavy-duty-tee-piece-h40"}.webp`,
      matches: ["Tee", "Vertical Tee"],
    },
    {
      slug: "crossings",
      label: t(market, "Crossings (4-Way)", "Хрестовини (4-сторонні)"),
      image: `${imageBase}/${imageBase === HEAVY_DUTY_ACCESSORY_IMAGE_BASE ? "heavy-duty-crossing-90r-h60" : "heavy-duty-crossing-h40"}.webp`,
      matches: ["Crossing"],
    },
    {
      slug: "reducers",
      label: t(market, "Reducers", "Редукції"),
      image: `${imageBase}/${imageBase === HEAVY_DUTY_ACCESSORY_IMAGE_BASE ? "heavy-duty-center-reducer-h60" : "heavy-duty-reducer-h40"}.webp`,
      matches: ["Middle Reducer", "Right Reducer", "Left Reducer"],
    },
    {
      slug: "reducer-covers",
      label: t(market, "Reducer Covers", "Кришки редукцій"),
      image: `${imageBase}/${imageBase === HEAVY_DUTY_ACCESSORY_IMAGE_BASE ? "heavy-duty-center-reducer-cover-h60" : "heavy-duty-reducer-cover-h40"}.webp`,
      matches: ["Middle Reducer Cover", "Right Reducer Cover", "Left Reducer Cover"],
    },
    {
      slug: "vertical-bends",
      label: t(market, "Vertical Bends", "Вертикальні повороти"),
      image: `${imageBase}/${imageBase === HEAVY_DUTY_ACCESSORY_IMAGE_BASE ? "heavy-duty-outside-vertical-bend-matrix-h60" : "heavy-duty-vertical-bends-h40"}.webp`,
      matches: ["Inside Vertical Bend", "Outside Vertical Bend", "Vertical Bend / Cover"],
    },
    {
      slug: "jointing-pieces",
      label: t(market, "Jointing Pieces", "З'єднувальні елементи"),
      image: `${imageBase}/${imageBase === HEAVY_DUTY_ACCESSORY_IMAGE_BASE ? "heavy-duty-jointing-piece-h60" : "heavy-duty-jointing-pieces-h40"}.webp`,
      matches: ["Jointing Piece"],
    },
  ];
}

// Real catalogue row counts (see catalog-source/cable-support/**/*-product-data.csv)
// — used for the "Product families in this category" cards, shared by
// every Heavy Duty tab (H40/50/60/100/GKT-CE).
function heavyDutyRelatedFamilies(market: MarketCode): CableManagementFamilyContent["relatedFamilies"] {
  return [
    {
      slug: "heavy-duty-cable-trays-h40",
      name: t(market, "Heavy Duty Cable Trays — H = 40 mm", "Кабельні лотки важкого типу — H = 40 мм"),
      image: `${IMAGE_BASE}/heavy-duty-cable-trays-h40/family/heavy-duty-cable-tray-h40.webp`,
      imageAlt: t(
        market,
        "Gersan heavy duty cable tray, h=40 mm, technical catalogue drawing",
        "Кабельний лоток Gersan важкого типу, h=40 мм, технічне креслення з каталогу",
      ),
      orderCodeCount: 229,
    },
    {
      slug: "heavy-duty-cable-trays-h50",
      name: t(market, "Heavy Duty Cable Trays — H = 50 mm", "Кабельні лотки важкого типу — H = 50 мм"),
      image: `${IMAGE_BASE}/heavy-duty-cable-trays-h50/family/heavy-duty-cable-tray-h50.webp`,
      imageAlt: t(
        market,
        "Gersan heavy duty cable tray, h=50 mm, technical catalogue drawing",
        "Кабельний лоток Gersan важкого типу, h=50 мм, технічне креслення з каталогу",
      ),
      orderCodeCount: 229,
    },
    {
      slug: "heavy-duty-cable-trays-h60",
      name: t(market, "Heavy Duty Cable Trays — H = 60 mm", "Кабельні лотки важкого типу — H = 60 мм"),
      image: `${IMAGE_BASE}/heavy-duty-cable-trays-h60/family/heavy-duty-cable-tray-h60.webp`,
      imageAlt: t(
        market,
        "Gersan heavy duty cable tray, h=60 mm, technical catalogue drawing",
        "Кабельний лоток Gersan важкого типу, h=60 мм, технічне креслення з каталогу",
      ),
      orderCodeCount: 224,
    },
    {
      slug: "heavy-duty-cable-trays-h100",
      name: t(market, "Heavy Duty Cable Trays — H = 100 mm", "Кабельні лотки важкого типу — H = 100 мм"),
      image: `${IMAGE_BASE}/heavy-duty-cable-trays-h100/family/heavy-duty-cable-tray-h100-system.webp`,
      imageAlt: t(
        market,
        "Gersan heavy duty cable tray h=100 mm system, installation overview",
        "Система кабельного лотка Gersan важкого типу h=100 мм, огляд монтажу",
      ),
      orderCodeCount: 172,
    },
    {
      slug: "normal-type-cable-trays",
      name: t(market, "Normal Type Cable Trays", "Кабельні лотки стандартного типу"),
      image: `${IMAGE_BASE}/normal-type-cable-trays/family/normal-type-cable-tray-h40.webp`,
      imageAlt: t(
        market,
        "Gersan normal type cable tray, h=40 mm, technical catalogue drawing",
        "Кабельний лоток Gersan стандартного типу, h=40 мм, технічне креслення з каталогу",
      ),
      orderCodeCount: 354,
    },
    {
      slug: "strengthened-cable-trays",
      name: t(market, "Strengthened Cable Trays", "Кабельні лотки посиленого типу"),
      orderCodeCount: 69,
    },
    {
      slug: "pregalvanized-trunking-system",
      name: t(market, "Pregalvanized Trunking System", "Прегальванізована коробчаста система"),
      image: `${IMAGE_BASE}/pregalvanized-trunking-system/family/pregalvanized-trunking-system.webp`,
      imageAlt: t(
        market,
        "Gersan pregalvanized trunking system, exploded assembly overview",
        "Прегальванізована коробчаста система Gersan, вигляд у розібраному стані",
      ),
      orderCodeCount: 143,
    },
  ];
}

// Shared across every Heavy Duty tab — the one real, downloadable PDF
// catalogue plus five services with no artifact yet (renders disabled,
// never a fabricated link) — see CableManagementResource.
function heavyDutyResources(market: MarketCode): CableManagementFamilyContent["resources"] {
  return [
    {
      label: t(market, "Full PDF Catalogue", "Повний PDF-каталог"),
      description: t(
        market,
        "Complete Gersan Cable Support Systems catalogue, including this family.",
        "Повний каталог систем кабельної підтримки Gersan, включно з цією серією.",
      ),
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      download: true,
    },
    {
      label: t(market, "Load & Support Data", "Дані навантаження та опор"),
      description: t(market, "Span and load tables for this series.", "Таблиці прогонів і навантажень для цієї серії."),
      unavailable: true,
    },
    {
      label: t(market, "Installation Guide", "Інструкція з монтажу"),
      description: t(
        market,
        "Mounting system overview and assembly guidance.",
        "Огляд системи монтажу та настанови зі збирання.",
      ),
      unavailable: true,
    },
    {
      label: t(market, "Technical Drawings", "Технічні креслення"),
      description: t(
        market,
        "Dimensioned drawings for individual order codes.",
        "Розмірні креслення для окремих кодів замовлення.",
      ),
      unavailable: true,
    },
    {
      label: t(market, "Materials & Finishes", "Матеріали та покриття"),
      description: t(
        market,
        "Optional coatings and material variants for this family.",
        "Додаткові покриття та варіанти матеріалів для цієї серії.",
      ),
      unavailable: true,
    },
    {
      label: t(market, "Certificates", "Сертифікати"),
      description: t(market, "Standards compliance documentation.", "Документація відповідності стандартам."),
      unavailable: true,
    },
  ];
}

// Only used by heavyDutyCableTraysH60ContentForMarket — H40/H50/H100/GKT-CE
// all inherit this same array by spreading H60's own result rather than
// calling this again.
function heavyDutyTechnicalSnapshot(market: MarketCode): CableManagementFamilyContent["technicalSnapshot"] {
  return [
    {
      icon: "shield",
      label: t(market, "Applicable Standards", "Застосовні стандарти"),
      value: ["BS EN 61537", "IEC 61537"],
    },
    {
      icon: "layers",
      label: t(market, "Materials & Finishes", "Матеріали та покриття"),
      value: [
        t(market, "Hot-Dip Galvanized", "Гаряче цинкування"),
        t(market, "Pregalvanized", "Прегальванізація"),
        "Corten-A",
        t(market, "Aluminium", "Алюміній"),
        t(market, "Stainless Steel", "Нержавіюча сталь"),
      ],
    },
    {
      icon: "system",
      label: t(market, "Product Scope", "Обсяг продукції"),
      value: [
        t(market, "Straight Lengths", "Прямі секції"),
        t(market, "Flat Bends", "Горизонтальні повороти"),
        t(market, "Covers", "Кришки"),
        t(market, "Reducers", "Редукції"),
        t(market, "Tees & Crossings", "Трійники та хрестовини"),
        t(market, "Jointing Pieces", "З'єднувальні елементи"),
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
  ];
}

export function heavyDutyCableTraysH60ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "heavy-duty-cable-trays-h60",
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Heavy Duty Cable Trays", "Кабельні лотки важкого типу"),
    titleQualifier: "H = 60 mm",
    description: t(
      market,
      "High-load-capacity cable trays engineered for power and control cable installations in industrial, commercial and infrastructure projects. The h=60 mm series covers perforated and covered straight lengths from 50-600 mm width, with a full range of bends, tees, crossings and reducers in the same system.",
      "Кабельні лотки високої несучої здатності, розроблені для монтажу силових та контрольних кабелів на промислових, комерційних та інфраструктурних об'єктах. Серія h=60 мм охоплює перфоровані та закриті прямі секції шириною 50–600 мм з повним асортиментом поворотів, трійників, хрестовин та редукцій в одній системі.",
    ),
    image: `${IMAGE_BASE}/heavy-duty-cable-trays-h60/family/heavy-duty-cable-tray-h60.webp`,
    imageAlt: t(
      market,
      "Gersan heavy duty cable tray, h=60 mm, technical catalogue drawing",
      "Кабельний лоток Gersan важкого типу, h=60 мм, технічне креслення з каталогу",
    ),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби") },
      { label: t(market, "Heavy Duty Cable Trays", "Кабельні лотки важкого типу") },
      { label: "H = 60 mm" },
    ],
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: "/uk-support?request=technical-pack&product=cable-management-heavy-duty-cable-trays-h60",
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
    technicalSnapshot: heavyDutyTechnicalSnapshot(market),
    relatedFamiliesHeading: t(market, "Product families in this category", "Серії продукції цієї категорії"),
    relatedFamilies: heavyDutyRelatedFamilies(market),
    scheduleHeading: t(market, "Order Codes & Technical Schedule", "Коди замовлення та технічна специфікація"),
    scheduleIntroduction: t(
      market,
      "Every model, stock code, dimension and weight below is drawn directly from the Gersan Cable Support catalogue.",
      "Кожна модель, код товару, розмір та вага нижче взяті безпосередньо з каталогу Gersan Cable Support.",
    ),
    standardLabel: "BS EN 61537",
    accessoriesHeading: t(market, "Compatible Accessories", "Сумісні аксесуари"),
    accessoriesIntroduction: t(
      market,
      "Bends, tees, crossings, reducers and jointing pieces from the same h=60 mm system, drawn from the same catalogue family.",
      "Повороти, трійники, хрестовини, редукції та з'єднувальні елементи цієї ж системи h=60 мм з того самого каталогу.",
    ),
    accessoryDisplayGroups: heavyDutyAccessoryDisplayGroups(market, HEAVY_DUTY_ACCESSORY_IMAGE_BASE),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyResources(market),
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
    supportHref: "/uk-support?request=technical-pack&product=cable-management-heavy-duty-cable-trays-h60",
  };
}

export function heavyDutyCableTraysH40ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  const h60 = heavyDutyCableTraysH60ContentForMarket(market);

  return {
    ...h60,
    slug: "heavy-duty-cable-trays-h40",
    titleQualifier: "H = 40 mm",
    description: t(
      market,
      "High-load-capacity cable trays engineered for power and control cable installations in industrial, commercial and infrastructure projects. The h=40 mm series covers perforated and covered straight lengths from 50-600 mm width, with a full range of bends, tees, crossings and reducers in the same system.",
      "Кабельні лотки високої несучої здатності, розроблені для монтажу силових та контрольних кабелів на промислових, комерційних та інфраструктурних об'єктах. Серія h=40 мм охоплює перфоровані та закриті прямі секції шириною 50–600 мм з повним асортиментом поворотів, трійників, хрестовин та редукцій в одній системі.",
    ),
    image: `${IMAGE_BASE}/heavy-duty-cable-trays-h40/family/heavy-duty-cable-tray-h40.webp`,
    imageAlt: t(
      market,
      "Gersan heavy duty cable tray, h=40 mm, technical catalogue drawing",
      "Кабельний лоток Gersan важкого типу, h=40 мм, технічне креслення з каталогу",
    ),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби") },
      { label: t(market, "Heavy Duty Cable Trays", "Кабельні лотки важкого типу") },
      { label: "H = 40 mm" },
    ],
    requestPackHref: "/uk-support?request=technical-pack&product=cable-management-heavy-duty-cable-trays-h40",
    accessoriesIntroduction: t(
      market,
      "Bends, tees, crossings, reducers and jointing pieces from the same h=40 mm system, drawn from the same catalogue family.",
      "Повороти, трійники, хрестовини, редукції та з'єднувальні елементи цієї ж системи h=40 мм з того самого каталогу.",
    ),
    accessoryDisplayGroups: heavyDutyAccessoryDisplayGroups(market, HEAVY_DUTY_H40_ACCESSORY_IMAGE_BASE),
    supportHref: "/uk-support?request=technical-pack&product=cable-management-heavy-duty-cable-trays-h40",
  };
}

export function heavyDutyCableTraysH50ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  const h60 = heavyDutyCableTraysH60ContentForMarket(market);

  return {
    ...h60,
    slug: "heavy-duty-cable-trays-h50",
    titleQualifier: "H = 50 mm",
    description: t(
      market,
      "High-load-capacity cable trays engineered for power and control cable installations in industrial, commercial and infrastructure projects. The h=50 mm series covers perforated and covered straight lengths from 50-600 mm width, with a full range of bends, tees, crossings and reducers in the same system.",
      "Кабельні лотки високої несучої здатності, розроблені для монтажу силових та контрольних кабелів на промислових, комерційних та інфраструктурних об'єктах. Серія h=50 мм охоплює перфоровані та закриті прямі секції шириною 50–600 мм з повним асортиментом поворотів, трійників, хрестовин та редукцій в одній системі.",
    ),
    image: `${IMAGE_BASE}/heavy-duty-cable-trays-h50/family/heavy-duty-cable-tray-h50.webp`,
    imageAlt: t(
      market,
      "Gersan heavy duty cable tray, h=50 mm, technical catalogue drawing",
      "Кабельний лоток Gersan важкого типу, h=50 мм, технічне креслення з каталогу",
    ),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби") },
      { label: t(market, "Heavy Duty Cable Trays", "Кабельні лотки важкого типу") },
      { label: "H = 50 mm" },
    ],
    requestPackHref: "/uk-support?request=technical-pack&product=cable-management-heavy-duty-cable-trays-h50",
    accessoriesIntroduction: t(
      market,
      "Bends, tees, crossings, reducers and jointing pieces from the same h=50 mm system, drawn from the same catalogue family.",
      "Повороти, трійники, хрестовини, редукції та з'єднувальні елементи цієї ж системи h=50 мм з того самого каталогу.",
    ),
    accessoryDisplayGroups: heavyDutyAccessoryDisplayGroups(market, HEAVY_DUTY_ACCESSORY_IMAGE_BASE),
    supportHref: "/uk-support?request=technical-pack&product=cable-management-heavy-duty-cable-trays-h50",
  };
}

// H=100mm and GKT-CE have a verified order-code dataset (see
// variants/index.ts and variants/heavy-duty-cable-trays-h100.ts /
// heavy-duty-cable-trays-gkt-ce.ts). `image` isn't rendered anywhere for
// these two (they only appear as tabs inside the Heavy Duty Cable Trays
// template, not as standalone family pages), so GKT-CE reuses the real
// H=100mm system photograph rather than inventing one.
export function heavyDutyCableTraysH100ContentForMarket(market: MarketCode): CableManagementFamilyContent {
  const h60 = heavyDutyCableTraysH60ContentForMarket(market);

  return {
    ...h60,
    slug: "heavy-duty-cable-trays-h100",
    titleQualifier: "H = 100 mm",
    description: t(
      market,
      "High-load-capacity cable trays engineered for power and control cable installations in industrial, commercial and infrastructure projects. The h=100 mm series covers perforated and covered straight lengths, with a full range of bends, tees, crossings and reducers in the same system.",
      "Кабельні лотки високої несучої здатності, розроблені для монтажу силових та контрольних кабелів на промислових, комерційних та інфраструктурних об'єктах. Серія h=100 мм охоплює перфоровані та закриті прямі секції з повним асортиментом поворотів, трійників, хрестовин та редукцій в одній системі.",
    ),
    image: `${IMAGE_BASE}/heavy-duty-cable-trays-h100/family/heavy-duty-cable-tray-h100-system.webp`,
    imageAlt: t(
      market,
      "Gersan heavy duty cable tray, h=100 mm system, installation overview",
      "Кабельний лоток Gersan важкого типу, система h=100 мм, огляд монтажу",
    ),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби") },
      { label: t(market, "Heavy Duty Cable Trays", "Кабельні лотки важкого типу") },
      { label: "H = 100 mm" },
    ],
    requestPackHref: "/uk-support?request=technical-pack&product=cable-management-heavy-duty-cable-trays-h100",
    scheduleIntroduction: t(
      market,
      "Full order-code schedule for the h=100 mm series, verified against the source catalogue.",
      "Повна специфікація кодів замовлення для серії h=100 мм, перевірена за первинним каталогом.",
    ),
    accessoriesIntroduction: t(
      market,
      "Bends, tees, crossings, reducers and jointing pieces from the same h=100 mm system, drawn from the same catalogue family.",
      "Повороти, трійники, хрестовини, редукції та з'єднувальні елементи цієї ж системи h=100 мм з того самого каталогу.",
    ),
    supportHref: "/uk-support?request=technical-pack&product=cable-management-heavy-duty-cable-trays-h100",
  };
}

export function heavyDutyCableTraysGktCeContentForMarket(market: MarketCode): CableManagementFamilyContent {
  const h60 = heavyDutyCableTraysH60ContentForMarket(market);

  return {
    ...h60,
    slug: "heavy-duty-cable-trays-gkt-ce",
    titleQualifier: "GKT-CE",
    description: t(
      market,
      "High-load-capacity cable trays engineered for power and control cable installations in industrial, commercial and infrastructure projects.",
      "Кабельні лотки високої несучої здатності, розроблені для монтажу силових та контрольних кабелів на промислових, комерційних та інфраструктурних об'єктах.",
    ),
    image: `${IMAGE_BASE}/heavy-duty-cable-trays-h100/family/heavy-duty-cable-tray-h100-system.webp`,
    imageAlt: t(
      market,
      "Gersan heavy duty cable tray system, installation overview",
      "Система кабельного лотка Gersan важкого типу, огляд монтажу",
    ),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби") },
      { label: t(market, "Heavy Duty Cable Trays", "Кабельні лотки важкого типу") },
      { label: "GKT-CE" },
    ],
    requestPackHref: "/uk-support?request=technical-pack&product=cable-management-heavy-duty-cable-trays-gkt-ce",
    scheduleIntroduction: t(
      market,
      "The full order-code schedule for this series is being re-verified against the source catalogue. Please contact our technical team to request the schedule directly.",
      "Повна специфікація кодів замовлення для цієї серії переопрацьовується. Будь ласка, зверніться до нашої технічної команди, щоб запросити специфікацію безпосередньо.",
    ),
    accessoriesIntroduction: t(
      market,
      "Bends, tees, crossings, reducers and jointing pieces from the same GKT-CE system.",
      "Повороти, трійники, хрестовини, редукції та з'єднувальні елементи цієї ж системи GKT-CE.",
    ),
    supportHref: "/uk-support?request=technical-pack&product=cable-management-heavy-duty-cable-trays-gkt-ce",
  };
}

const CABLE_MANAGEMENT_LABELS_BY_MARKET: Readonly<Record<MarketCode, CableManagementLabels>> = {
  uk: {
    searchLabel: "Search order codes",
    searchPlaceholder: "Search model, stock code, width or dimension",
    clearSearchAction: "Clear search",
    materialFilterLabel: "Filter by material",
    allMaterialsLabel: "All materials",
    showingLabel: "Showing",
    ofLabel: "of",
    countSuffix: "order codes",
    matchingCountSuffix: "matching codes",
    noResults: "No matching order codes",
    downloadCsvAction: "Download CSV",
    downloadAllCsvAction: "Download all as CSV",
    copyStockCodeAction: "Copy stock code",
    copiedLabel: "Copied",
    columnModel: "Model",
    columnStockCode: "Stock Code",
    columnWidth: "Width (mm)",
    columnHeight: "Height (mm)",
    columnThickness: "Thickness (mm)",
    columnLength: "Length (mm)",
    columnWeight: "Weight",
    columnMaterial: "Material / Finish",
    columnAction: "Action",
    enquiryAddAction: "Add to enquiry",
    enquiryRemoveAction: "Remove",
    currentFamilyLabel: "Current family",
    viewOrderCodesAction: "View order codes",
    viewProductAction: "View Product",
    viewAllAccessoriesAction: "View all accessories",
    comingSoonLabel: "Technical data on request",
    backToCableTraysTrunkingLabel: "Back to Cable Trays & Trunking",
    dataOnRequestLabel: "Data on request",
    productVariantLabel: "Product Variant",
    technicalInformationSuffix: "technical information",
    viewSeriesLabel: "View series →",
    sizeVariantCountSuffix: "size variants",
    onRequestLabel: "On Request",
    mobileViewAllResultsPrefix: "View All",
    mobileViewFilteredResultsPrefix: "View",
    mobileHideResultsPrefix: "Hide",
    mobileOrderCodesLabel: "Order Codes",
    mobileSizeVariantsLabel: "Size Variants",
    removeFilterAction: "Remove filter",
  },
  ua: {
    searchLabel: "Пошук кодів замовлення",
    searchPlaceholder: "Пошук за моделлю, кодом, шириною чи розміром",
    clearSearchAction: "Очистити пошук",
    materialFilterLabel: "Фільтр за матеріалом",
    allMaterialsLabel: "Усі матеріали",
    showingLabel: "Показано",
    ofLabel: "з",
    countSuffix: "кодів замовлення",
    matchingCountSuffix: "відповідних кодів",
    noResults: "Відповідних кодів замовлення не знайдено",
    downloadCsvAction: "Завантажити CSV",
    downloadAllCsvAction: "Завантажити всі як CSV",
    copyStockCodeAction: "Копіювати код",
    copiedLabel: "Скопійовано",
    columnModel: "Модель",
    columnStockCode: "Код товару",
    columnWidth: "Ширина (мм)",
    columnHeight: "Висота (мм)",
    columnThickness: "Товщина (мм)",
    columnLength: "Довжина (мм)",
    columnWeight: "Вага",
    columnMaterial: "Матеріал / покриття",
    columnAction: "Дія",
    enquiryAddAction: "Додати до запиту",
    enquiryRemoveAction: "Видалити",
    currentFamilyLabel: "Поточна серія",
    viewOrderCodesAction: "Переглянути коди замовлення",
    viewProductAction: "Переглянути продукт",
    viewAllAccessoriesAction: "Переглянути всі аксесуари",
    comingSoonLabel: "Технічні дані на запит",
    backToCableTraysTrunkingLabel: "До кабельних лотків та коробів",
    dataOnRequestLabel: "Дані на запит",
    productVariantLabel: "Варіант продукту",
    technicalInformationSuffix: "технічна інформація",
    viewSeriesLabel: "Переглянути серію →",
    sizeVariantCountSuffix: "варіантів розміру",
    onRequestLabel: "За запитом",
    mobileViewAllResultsPrefix: "Переглянути всі",
    mobileViewFilteredResultsPrefix: "Переглянути",
    mobileHideResultsPrefix: "Приховати",
    mobileOrderCodesLabel: "Коди замовлення",
    mobileSizeVariantsLabel: "Варіанти розміру",
    removeFilterAction: "Видалити фільтр",
  },
};

export function cableManagementLabelsForMarket(market: MarketCode): CableManagementLabels {
  return CABLE_MANAGEMENT_LABELS_BY_MARKET[market];
}

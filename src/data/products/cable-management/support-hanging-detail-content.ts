import { publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import { CABLE_SUPPORT_CATALOGUE_PDF_HREF, heavyDutyCableTraysH60ContentForMarket } from "./content";
import type { CableAccessoryDisplayGroup, CableManagementFamilyContent } from "./types";

const IMAGE_BASE = publicMediaUrl("products/cable-management");

function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

const REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "support-hanging-systems",
  source: "/products/cable-support-systems",
});

function relatedSupportFamilies(market: MarketCode): CableManagementFamilyContent["relatedFamilies"] {
  return [
    {
      slug: "npi-80-support-system",
      name: t(market, "NPI-80 Support Systems", "Опорні системи NPI-80"),
      image: `${IMAGE_BASE}/npi-80-support-system/card/npi-80-support-systems-card.png`,
      imageAlt: t(market, "Gersan NPI-80 support system components — profile, bracket and jointing pieces", "Компоненти опорної системи Gersan NPI-80 — профіль, кронштейн та з'єднувальні елементи"),
      orderCodeCount: 122,
      subtitle: t(market, "Hanger profiles, brackets & fixings", "Профілі підвісу, кронштейни та кріплення"),
      icon: "support",
    },
    {
      slug: "u-z-l-w-profile-hanging-systems",
      name: t(market, "U / Z / L / W Profiles", "Профілі U / Z / L / W"),
      image: `${IMAGE_BASE}/npi-80-support-system/card/uzlw-profiles-brackets-card.png`,
      imageAlt: t(market, "Gersan U-Z-L-W profile and bracket hanging components", "Компоненти профілів та кронштейнів Gersan U-Z-L-W"),
      orderCodeCount: 76,
      subtitle: t(market, "Profile & bracket hanging components", "Профільні та кронштейнові компоненти підвісу"),
      icon: "profile",
    },
    {
      slug: "threaded-rod-tray-carriers",
      name: t(market, "Threaded Rod & Special Hanging Systems", "Системи на різьбових шпильках та спеціальні підвіси"),
      image: `${IMAGE_BASE}/npi-80-support-system/card/tray-carriers-threaded-rod-hanging-systems-card.png`,
      imageAlt: t(market, "Gersan threaded-rod tray carrier suspended from a ceiling fixing, with hook accessory", "Кабеленесучий елемент Gersan на різьбовій шпильці, підвішений до стельового кріплення, з гаком"),
      orderCodeCount: 55,
      subtitle: t(market, "Threaded-rod tray carriers & hooks", "Кабеленесучі елементи на шпильках та гаки"),
      icon: "hanging-rod",
    },
    {
      slug: "c-profile-support-systems",
      name: t(market, "C-Profile Support Systems", "Опорні системи C-профіль"),
      image: `${IMAGE_BASE}/npi-80-support-system/card/c-profile-support-systems-card.png`,
      imageAlt: t(market, "Gersan C profile support components — profiles, console bracket and fixing bolt", "Опорні компоненти Gersan C-профіль — профілі, консольний кронштейн та фіксувальний болт"),
      orderCodeCount: 238,
      subtitle: t(market, "Profiles, console brackets & fixing bolts", "Профілі, консольні кронштейни та фіксувальні болти"),
      icon: "c-profile",
    },
    {
      slug: "threaded-rods-anchors-fixings",
      name: t(market, "Threaded Rods, Anchors & Fixings", "Різьбові шпильки, анкери та кріплення"),
      image: `${IMAGE_BASE}/npi-80-support-system/card/threaded-rods-anchors-fixings-card.png`,
      imageAlt: t(market, "Gersan threaded rod, wedge anchor, washers and hex nuts fixing set", "Комплект кріплення Gersan: різьбова шпилька, клиновий анкер, шайби та шестигранні гайки"),
      orderCodeCount: 95,
      subtitle: t(market, "Rods, wedge anchors & fixing sets", "Шпильки, клинові анкери та комплекти кріплення"),
      icon: "anchor",
    },
  ];
}

function supportHangingAccessoryDisplayGroups(): readonly CableAccessoryDisplayGroup[] {
  return [];
}

export function npi80SupportSystemContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "npi-80-support-system",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Support & Hanging Systems", "Системи опор та підвісу"), href: "/products/cable-support-systems/support-hanging-systems" },
      { label: "NPI-80 Support System" },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: "NPI-80 Support System",
    titleQualifier: "(122 Items)",
    description: t(
      market,
      "Hanger profiles, brackets and fixing elements for cable carriers and ladders.",
      "Профілі підвісу, кронштейни та кріпильні елементи для кабельних носіїв та драбин.",
    ),
    image: `${IMAGE_BASE}/npi-80-support-system/card/npi-80-support-systems-transparent-card.png`,
    imageAlt: t(
      market,
      "Gersan NPI-80 support system components — profile, bracket and jointing pieces",
      "Компоненти опорної системи Gersan NPI-80 — профіль, кронштейн та з'єднувальні елементи",
    ),
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
      {
        icon: "shield",
        label: t(market, "Applicable Standards", "Застосовні стандарти"),
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [t(market, "Hot-Dip Galvanized Steel", "Гарячого цинкування сталь")],
      },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Support Profiles", "Опорні профілі"),
          t(market, "GK Brackets", "Кронштейни GK"),
          t(market, "Ceiling Fixings", "Стельові кріплення"),
          t(market, "Connection Elements", "З'єднувальні елементи"),
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
    relatedFamilies: relatedSupportFamilies(market),
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
      "Supporting and hanging components from this system.",
      "Компоненти опор та підвісів з цієї системи.",
    ),
    accessoryDisplayGroups: supportHangingAccessoryDisplayGroups(),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(market, "Need help selecting support systems?", "Потрібна допомога з підбором систем опор?"),
    supportDescription: t(
      market,
      "Our technical team can help with sizing, load ratings, installation details and project-specific configurations.",
      "Наша технічна команда допоможе з розрахунками, розрахунками навантаження та конфігураціями проєкту.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: REQUEST_HREF,
  };
}

export function uzlwProfileHangingSystemsContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "u-z-l-w-profile-hanging-systems",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Support & Hanging Systems", "Системи опор та підвісу"), href: "/products/cable-support-systems/support-hanging-systems" },
      { label: "U-Z-L-W Profile and Bracket Hanging Systems" },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: "U-Z-L-W Profile and Bracket Hanging Systems",
    titleQualifier: "(76 Items)",
    description: t(
      market,
      "Profile and console hanging elements for wall- and ceiling-mounted cable routing.",
      "Профільні та консольні елементи підвісу для прокладання кабелів на стінах та стелях.",
    ),
    image: `${IMAGE_BASE}/npi-80-support-system/card/uzlw-profiles-brackets-transparent-card.png`,
    imageAlt: t(
      market,
      "Gersan U-Z-L-W profile and bracket hanging components",
      "Компоненти профілів та кронштейнів Gersan U-Z-L-W",
    ),
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
      {
        icon: "shield",
        label: t(market, "Applicable Standards", "Застосовні стандарти"),
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [t(market, "Hot-Dip Galvanized Steel & Pregalvanized", "Гарячого цинкування сталь та прегальванізована")],
      },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "U-Profile Elements", "U-профільні елементи"),
          t(market, "Z-Profile Elements", "Z-профільні елементи"),
          t(market, "Console Brackets", "Консольні кронштейни"),
          t(market, "Pregalvanized Option", "Варіант прегальванізації"),
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
    relatedFamilies: relatedSupportFamilies(market),
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
      "Supporting and hanging components from this system.",
      "Компоненти опор та підвісів з цієї системи.",
    ),
    accessoryDisplayGroups: supportHangingAccessoryDisplayGroups(),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(market, "Need help selecting profile systems?", "Потрібна допомога з вибором профільних систем?"),
    supportDescription: t(
      market,
      "Our technical team can assist with profile selection, bracket sizing and installation planning.",
      "Наша технічна команда допоможе з вибором профілів та плануванням монтажу.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: REQUEST_HREF,
  };
}

export function threadedRodTrayCarriersContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "threaded-rod-tray-carriers",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Support & Hanging Systems", "Системи опор та підвісу"), href: "/products/cable-support-systems/support-hanging-systems" },
      { label: "Tray Carriers Used With Threaded Rods" },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: "Tray Carriers Used With Threaded Rods",
    titleQualifier: "(48 Items)",
    description: t(
      market,
      "Threaded-rod tray carriers and beam fixing units for ceiling/structural steel mounting.",
      "Кріплення лотків із різьбовими шпильками та блоки кріплення до балок для монтажу на стелях/конструкційній сталі.",
    ),
    image: `${IMAGE_BASE}/npi-80-support-system/card/tray-carriers-threaded-rod-hanging-systems-transparent-card.png`,
    imageAlt: t(
      market,
      "Gersan threaded-rod tray carrier suspended from a ceiling fixing, with hook accessory",
      "Кабеленесучий елемент Gersan на різьбовій шпильці, підвішений до стельового кріплення, з гаком",
    ),
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
      {
        icon: "shield",
        label: t(market, "Applicable Standards", "Застосовні стандарти"),
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [t(market, "Hot-Dip Galvanized Steel", "Гарячого цинкування сталь")],
      },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Tray Carriers", "Кріплення лотків"),
          t(market, "Beam Fixing Units", "Блоки кріплення до балок"),
          t(market, "Seismic Hooks", "Сейсмостійкі гаки"),
          t(market, "Thread Suspension", "Підвіс на різьбовій шпильці"),
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
    relatedFamilies: relatedSupportFamilies(market),
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
      "Supporting and hanging components from this system.",
      "Компоненти опор та підвісів з цієї системи.",
    ),
    accessoryDisplayGroups: supportHangingAccessoryDisplayGroups(),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(market, "Need help with suspended systems?", "Потрібна допомога з підвішеними системами?"),
    supportDescription: t(
      market,
      "Our technical team can assist with structural load calculations and installation coordination.",
      "Наша технічна команда допоможе з розрахунками конструкційних навантажень та координацією монтажу.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: REQUEST_HREF,
  };
}

export function cProfileSupportSystemsContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "c-profile-support-systems",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Support & Hanging Systems", "Системи опор та підвісу"), href: "/products/cable-support-systems/support-hanging-systems" },
      { label: "C Profile Support and Mounting Elements" },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: "C Profile Support and Mounting Elements",
    titleQualifier: "(238 Items)",
    description: t(
      market,
      "Single and combined C-profiles, consoles and fixing elements for versatile support applications.",
      "Одиничні та комбіновані C-профілі, консолі та кріпильні елементи для багатогранних застосувань опори.",
    ),
    image: `${IMAGE_BASE}/npi-80-support-system/card/c-profile-support-systems-transparent-card.png`,
    imageAlt: t(
      market,
      "Gersan C profile support components — profiles, console bracket and fixing bolt",
      "Опорні компоненти Gersan C-профіль — профілі, консольний кронштейн та фіксувальний болт",
    ),
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
      {
        icon: "shield",
        label: t(market, "Applicable Standards", "Застосовні стандарти"),
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [t(market, "Hot-Dip Galvanized Steel", "Гарячого цинкування сталь")],
      },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Single C-Profiles", "Одинарні C-профілі"),
          t(market, "Combined C-Profiles", "Комбіновані C-профілі"),
          t(market, "Console Brackets", "Консольні кронштейни"),
          t(market, "Embedded Carriers", "Закладні носії"),
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
    relatedFamilies: relatedSupportFamilies(market),
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
      "Supporting and hanging components from this system.",
      "Компоненти опор та підвісів з цієї системи.",
    ),
    accessoryDisplayGroups: supportHangingAccessoryDisplayGroups(),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(market, "Need help with C-profile systems?", "Потрібна допомога з системами C-профілю?"),
    supportDescription: t(
      market,
      "Our technical team can help with profile selection, console configuration and load verification.",
      "Наша технічна команда допоможе з вибором профілів та перевіркою навантажень.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: REQUEST_HREF,
  };
}

export function threadedRodsAnchorsFixingsContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "threaded-rods-anchors-fixings",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Support & Hanging Systems", "Системи опор та підвісу"), href: "/products/cable-support-systems/support-hanging-systems" },
      { label: "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector" },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: "Threaded Rods, Anchors & Fixings",
    titleQualifier: "(95 Items)",
    description: t(
      market,
      "Threaded rods, wedge anchors, bolt sets and plastic protectors used to complete support installations.",
      "Різьбові шпильки, клинові якорі, комплекти болтів та пластикові захисники для завершення монтажу опор.",
    ),
    image: `${IMAGE_BASE}/npi-80-support-system/card/threaded-rods-anchors-fixings-transparent-card.png`,
    imageAlt: t(
      market,
      "Gersan threaded rod, wedge anchor, washers and hex nuts fixing set",
      "Комплект кріплення Gersan: різьбова шпилька, клиновий анкер, шайби та шестигранні гайки",
    ),
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
      {
        icon: "shield",
        label: t(market, "Applicable Standards", "Застосовні стандарти"),
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [t(market, "Hot-Dip Galvanized Steel & Stainless Steel", "Гарячого цинкування сталь та нержавіюча сталь")],
      },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Threaded Rods", "Різьбові шпильки"),
          t(market, "Wedge Anchors", "Клинові якорі"),
          t(market, "Bolt Sets", "Комплекти болтів"),
          t(market, "Plastic Protectors", "Пластикові захисники"),
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
    relatedFamilies: relatedSupportFamilies(market),
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
      "Supporting and hanging components from this system.",
      "Компоненти опор та підвісів з цієї системи.",
    ),
    accessoryDisplayGroups: supportHangingAccessoryDisplayGroups(),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(market, "Need help with fasteners and anchors?", "Потрібна допомога з кріпленнями та якорями?"),
    supportDescription: t(
      market,
      "Our technical team can assist with fastener selection, anchor sizing and installation methods.",
      "Наша технічна команда допоможе з вибором кріпленнями та методами монтажу.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: REQUEST_HREF,
  };
}

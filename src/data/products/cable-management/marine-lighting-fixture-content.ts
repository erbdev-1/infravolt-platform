import type { MarketCode } from "@/modules/markets/types";

import { cableTraysTrunkingSiblingFamilies } from "./cable-trays-trunking-content";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF, heavyDutyCableTraysH60ContentForMarket } from "./content";
import type { CableAccessoryDisplayGroup, CableManagementFamilyContent } from "./types";
import type { CableVariantFamilyTemplateContent } from "./variant-family-template-types";

const IMAGE_BASE = "/assets/products/cable-management";
const REQUEST_HREF_BASE = "/uk-support?request=technical-pack&product=cable-management";

function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

// Marine Type has no accessory-type rows in its own catalogue data — a
// low-profile h=15 mm tray, straight lengths only (see
// variants/marine-type-cable-trays.ts) — so Compatible Accessories simply
// doesn't render for that tab.
export function marineTypeCableTraysContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "marine-type-cable-trays",
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Marine Type Cable Trays", "Кабельні лотки морського типу"),
    titleQualifier: "H = 15 mm",
    description: t(
      market,
      "Low-profile marine-type cable trays, h=15 mm, for shipboard and marine-environment cable routing where a shallow tray profile is required.",
      "Низькопрофільні кабельні лотки морського типу, h=15 мм, для прокладки кабелів на суднах та в морському середовищі, де потрібен неглибокий профіль лотка.",
    ),
    image: `${IMAGE_BASE}/cable-trays-trunking/card/lighting-fixture-cable-trays-card.png`,
    imageAlt: t(market, "Gersan cable tray, technical catalogue drawing", "Кабельний лоток Gersan, технічне креслення з каталогу"),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби") },
      { label: t(market, "Marine & Lighting Fixture Cable Trays", "Кабельні лотки морського та освітлювального типу") },
      { label: t(market, "Marine Type", "Морський тип") },
    ],
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: `${REQUEST_HREF_BASE}-marine-type-cable-trays`,
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
          t(market, "Low-Profile H=15 mm", "Низький профіль H=15 мм"),
          t(market, "50–400 mm Width Range", "Діапазон ширини 50–400 мм"),
          t(market, "Marine Environment", "Морське середовище"),
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
    supportHref: `${REQUEST_HREF_BASE}-marine-type-cable-trays`,
  };
}

function lightingFixtureAccessoryDisplayGroups(market: MarketCode): readonly CableAccessoryDisplayGroup[] {
  return [
    {
      slug: "threaded-rod-elements",
      label: t(market, "Threaded Rod Mounting Elements", "Елементи кріплення на різьбовій штанзі"),
      matches: ["Lighting Fixture Element-Used With Threaded Rods"],
    },
  ];
}

export function lightingFixtureCableTraysContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "lighting-fixture-cable-trays",
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Lighting Fixture Type Cable Trays", "Кабельні лотки освітлювального типу"),
    titleQualifier: "H = 40–60 mm",
    description: t(
      market,
      "Application-specific cable trays for lighting fixture installations, 100 mm width, in h=40/50/60 mm edge heights, with threaded-rod mounting elements for suspended installation.",
      "Спеціалізовані кабельні лотки для монтажу освітлювальних приладів, ширина 100 мм, у висотах борту h=40/50/60 мм, з елементами кріплення на різьбовій штанзі для підвісного монтажу.",
    ),
    image: `${IMAGE_BASE}/cable-trays-trunking/card/lighting-fixture-cable-trays-card.png`,
    imageAlt: t(
      market,
      "Gersan lighting fixture type cable tray, product photograph",
      "Кабельний лоток Gersan освітлювального типу, фото продукту",
    ),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи") },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби") },
      { label: t(market, "Marine & Lighting Fixture Cable Trays", "Кабельні лотки морського та освітлювального типу") },
      { label: t(market, "Lighting Fixture Type", "Освітлювальний тип") },
    ],
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: `${REQUEST_HREF_BASE}-lighting-fixture-cable-trays`,
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
          t(market, "100 mm Width", "Ширина 100 мм"),
          t(market, "H=40–60 mm Edge Heights", "Висота борту H=40–60 мм"),
          t(market, "Threaded-Rod Mounting", "Кріплення на різьбовій штанзі"),
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
      "Threaded-rod mounting elements from the same system.",
      "Елементи кріплення на різьбовій штанзі з тієї ж системи.",
    ),
    accessoryDisplayGroups: lightingFixtureAccessoryDisplayGroups(market),
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
    supportHref: `${REQUEST_HREF_BASE}-lighting-fixture-cable-trays`,
  };
}

// Marine Type and Lighting Fixture Type are each their own low-profile /
// application-specific tray family in the source catalogue (see
// variants/marine-type-cable-trays.ts and lighting-fixture-cable-trays-body.ts)
// — merged onto one detail page per the brief rather than two top-level
// category cards. No merged hero asset exists yet, so the hero uses the
// same real Lighting Fixture card photo as both tabs' own images until a
// dedicated combined render is supplied — see the completion notes.
export function marineLightingFixtureTemplateContentForMarket(market: MarketCode): CableVariantFamilyTemplateContent {
  return {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби"), href: "/products/cable-support-systems/cable-trays-trunking" },
      { label: t(market, "Marine & Lighting Fixture Cable Trays", "Кабельні лотки морського та освітлювального типу") },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Marine & Lighting Fixture Cable Trays", "Кабельні лотки морського та освітлювального типу"),
    heroDescription: t(
      market,
      "Two application-specific tray systems: low-profile Marine Type trays (h=15 mm) for shipboard and marine-environment routing, and Lighting Fixture Type trays (h=40–60 mm, 100 mm width) with threaded-rod mounting for suspended lighting installations.",
      "Дві спеціалізовані системи лотків: низькопрофільні лотки морського типу (h=15 мм) для прокладки на суднах та в морському середовищі, та лотки освітлювального типу (h=40–60 мм, ширина 100 мм) з кріпленням на різьбовій штанзі для підвісного монтажу освітлення.",
    ),
    heroImage: `${IMAGE_BASE}/cable-trays-trunking/card/lighting-fixture-cable-trays-transparent-card.png`,
    heroImageAlt: t(
      market,
      "Gersan lighting-fixture-type cable tray with hexagonal junction and bend accessories, product photograph",
      "Кабельний лоток Gersan освітлювального типу з шестигранним з'єднанням та поворотними елементами, фото продукту",
    ),
    heroVisualMode: "frameless",
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: `${REQUEST_HREF_BASE}-marine-lighting-fixture-cable-trays`,
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
          t(market, "Marine Type H=15 mm", "Морський тип H=15 мм"),
          t(market, "Lighting Fixture Type H=40–60 mm", "Освітлювальний тип H=40–60 мм"),
          t(market, "Application-Specific Systems", "Спеціалізовані системи"),
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
      { id: "marine", tabLabel: t(market, "Marine Type", "Морський тип"), content: marineTypeCableTraysContentForMarket(market), verifiedData: true },
      {
        id: "lighting-fixture",
        tabLabel: t(market, "Lighting Fixture Type", "Освітлювальний тип"),
        content: lightingFixtureCableTraysContentForMarket(market),
        verifiedData: true,
      },
    ],
    siblingFamiliesHeading: t(market, "Other Cable Tray & Trunking Families", "Інші родини кабельних лотків та коробів"),
    siblingFamilies: cableTraysTrunkingSiblingFamilies(market),
    siblingCardVariant: "icon",
    currentFamilySlug: "marine-lighting-fixture-cable-trays",
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
    supportHref: `${REQUEST_HREF_BASE}-marine-lighting-fixture-cable-trays`,
  };
}

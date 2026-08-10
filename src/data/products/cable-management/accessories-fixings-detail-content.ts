import type { MarketCode } from "@/modules/markets/types";

import { CABLE_SUPPORT_CATALOGUE_PDF_HREF, heavyDutyCableTraysH60ContentForMarket } from "./content";
import type { CableAccessoryDisplayGroup, CableManagementFamilyContent, CableSizeVariant } from "./types";
import { ALUMINIUM_CABLE_CLEATS_SIZE_VARIANTS } from "./variants/aluminium-cable-cleats-sizes";
import { CABLE_CROCHETS_VARIANTS } from "./variants/cable-crochets";
import { CABLE_DRUM_SUPPORT_EQUIPMENT_VARIANTS } from "./variants/cable-drum-support-equipment";
import { COVER_CABLE_TRAY_COVER_CLAMPS_VARIANTS } from "./variants/cover-cable-tray-cover-clamps";
import { GRANITE_MOUNTING_ELEMENTS_VARIANTS } from "./variants/granite-mounting-elements";
import { MECHANICAL_DILATATION_ELEMENT_VARIANTS } from "./variants/mechanical-dilatation-element";
import { REDUCERS_VARIANTS } from "./variants/reducers";
import { SCREW_SETS_THREADED_RODS_ANCHORS_VARIANTS } from "./variants/screw-sets-threaded-rods-anchors";
import { SEPARATOR_END_CAP_LEVEL_DIRECTION_CHANGER_VARIANTS } from "./variants/separator-end-cap-level-direction-changer";

const IMAGE_BASE = "/assets/products/cable-management";
const HERO_IMAGE = `${IMAGE_BASE}/accessories-fixings/hero/threaded-rods-anchors-fixings-transparent-card.png`;
const REQUEST_HREF = "/uk-support?request=technical-pack&product=accessories-fixings";

function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

function relatedAccessoriesFixingsFamilies(market: MarketCode): CableManagementFamilyContent["relatedFamilies"] {
  return [
    {
      slug: "screw-sets-threaded-rods-anchors",
      name: t(market, "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector & Galvanized Paint", "Комплекти гвинтів, різьбові шпильки, сталеві анкери, пластикова захисна стрічка та цинконаповнена фарба"),
      image: `${IMAGE_BASE}/accessories-fixings/hero/threaded-rods-anchors-fixings-card.png`,
      imageAlt: t(market, "Gersan threaded rod, wedge anchor, washers and hex nuts fixing set", "Комплект кріплення Gersan: різьбова шпилька, клиновий анкер, шайби та шестигранні гайки"),
      orderCodeCount: SCREW_SETS_THREADED_RODS_ANCHORS_VARIANTS.length,
      subtitle: t(market, "Screw sets, rods, anchors, paint & more", "Гвинти, шпильки, анкери, фарба та інше"),
      icon: "anchor",
    },
    {
      slug: "cover-cable-tray-cover-clamps",
      name: t(market, "Cover for Cable Tray & Cover Clamps", "Кришка для кабельного лотка та затискачі кришок"),
      image: `${IMAGE_BASE}/accessories-fixings/family/cable-tray-cover-and-cover-clamps.png`,
      imageAlt: t(market, "Gersan cable tray cover and cover clamp, product photograph", "Кришка кабельного лотка та затискач кришки Gersan, фото продукту"),
      orderCodeCount: COVER_CABLE_TRAY_COVER_CLAMPS_VARIANTS.length,
      subtitle: t(market, "Covers, roofed covers & cover clamps", "Кришки, дахові кришки та затискачі кришок"),
      icon: "cover",
    },
    {
      slug: "reducers",
      name: t(market, "Reducers", "Редукції"),
      image: `${IMAGE_BASE}/accessories-fixings/family/reducers.png`,
      imageAlt: t(market, "Gersan cable tray reducer, product photograph", "Редукція кабельного лотка Gersan, фото продукту"),
      orderCodeCount: REDUCERS_VARIANTS.length,
      subtitle: t(market, "Width-transition reducers between tray sizes", "Редукції переходу між ширинами лотків"),
      icon: "pipe",
    },
    {
      slug: "separator-end-cap-level-direction-changer",
      name: t(market, "Separator, End Cap, Level Changer & Direction Changer", "Розділювач, торцева заглушка, елемент зміни рівня та напрямку"),
      image: `${IMAGE_BASE}/accessories-fixings/family/seperator-end-cap-level-changer-direction-changer.png`,
      imageAlt: t(market, "Gersan cable tray separator and end cap, product photograph", "Розділювач та торцева заглушка кабельного лотка Gersan, фото продукту"),
      orderCodeCount: SEPARATOR_END_CAP_LEVEL_DIRECTION_CHANGER_VARIANTS.length,
      subtitle: t(market, "Separators, end caps & level/direction changers", "Розділювачі, заглушки та елементи зміни рівня/напрямку"),
      icon: "profile",
    },
    {
      slug: "aluminium-cable-cleats",
      name: t(market, "Aluminium Cable Cleats", "Алюмінієві кабельні кліти"),
      image: `${IMAGE_BASE}/accessories-fixings/family/aluminium-cable-cleats.png`,
      imageAlt: t(market, "Gersan aluminium cable cleat, product photograph", "Алюмінієва кабельна кліта Gersan, фото продукту"),
      orderCodeCount: ALUMINIUM_CABLE_CLEATS_SIZE_VARIANTS.length,
      countLabel: t(
        market,
        `${ALUMINIUM_CABLE_CLEATS_SIZE_VARIANTS.length} size variants`,
        `${ALUMINIUM_CABLE_CLEATS_SIZE_VARIANTS.length} варіантів розміру`,
      ),
      subtitle: t(market, "Single & double bolt cable cleats", "Одно- та двоболтові кабельні кліти"),
      icon: "anchor",
    },
    {
      slug: "cable-crochets",
      name: t(market, "Cable Crochets (C-Profile / Angle)", "Кабельні кроше (C-профіль / кутник)"),
      image: `${IMAGE_BASE}/accessories-fixings/family/cable-crochets-c-profile-angle.png`,
      imageAlt: t(market, "Gersan cable crochet, product photograph", "Кабельний кроше Gersan, фото продукту"),
      orderCodeCount: CABLE_CROCHETS_VARIANTS.length,
      subtitle: t(market, "C-profile & angle crochets for direct support", "Кроше C-профілю та кутника для прямої підтримки"),
      icon: "hanging-rod",
    },
    {
      slug: "granite-mounting-elements",
      name: t(market, "Granite Mounting Elements", "Елементи кріплення до граніту"),
      image: `${IMAGE_BASE}/accessories-fixings/family/granite-mounting-elements.png`,
      imageAlt: t(market, "Gersan granite mounting element, product photograph", "Елемент кріплення до граніту Gersan, фото продукту"),
      orderCodeCount: GRANITE_MOUNTING_ELEMENTS_VARIANTS.length,
      subtitle: t(market, "Fixing elements for granite & stone surfaces", "Елементи кріплення до гранітних та кам'яних поверхонь"),
      icon: "anchor",
    },
    {
      slug: "cable-drum-support-equipment",
      name: t(market, "Cable Drum Support Equipment", "Обладнання для підтримки кабельних барабанів"),
      image: `${IMAGE_BASE}/accessories-fixings/family/cable-drum-support-equipment.png`,
      imageAlt: t(market, "Gersan cable drum support equipment, product photograph", "Обладнання для підтримки кабельного барабана Gersan, фото продукту"),
      orderCodeCount: CABLE_DRUM_SUPPORT_EQUIPMENT_VARIANTS.length,
      subtitle: t(market, "Support for holding & paying out cable drums", "Опора для утримання та розмотування кабельних барабанів"),
      icon: "support",
    },
    {
      slug: "mechanical-dilatation-element",
      name: t(market, "Mechanical Dilatation Element", "Механічний дилатаційний елемент"),
      image: `${IMAGE_BASE}/accessories-fixings/family/mechanical-dilatation-element.png`,
      imageAlt: t(market, "Gersan mechanical dilatation element, product photograph", "Механічний дилатаційний елемент Gersan, фото продукту"),
      orderCodeCount: MECHANICAL_DILATATION_ELEMENT_VARIANTS.length,
      subtitle: t(market, "Expansion-joint elements for thermal movement", "Елементи компенсаційного шва для термічного розширення"),
      icon: "profile",
    },
    {
      slug: "shaft-access-cover",
      name: t(market, "Shaft Access Cover", "Кришка шахтного доступу"),
      image: `${IMAGE_BASE}/accessories-fixings/family/shaft-access-cover.png`,
      imageAlt: t(market, "Gersan shaft access cover, product photograph", "Кришка шахтного доступу Gersan, фото продукту"),
      orderCodeCount: 0,
      countLabel: t(market, "Made to Order", "Виготовлення на замовлення"),
      subtitle: t(market, "Custom, made-to-order shaft access cover", "Індивідуальна кришка шахтного доступу на замовлення"),
      icon: "cover",
    },
  ];
}

function accessoriesFixingsDisplayGroups(): readonly CableAccessoryDisplayGroup[] {
  return [];
}

function baseTechnicalSnapshot(
  market: MarketCode,
  keyFeatures: readonly string[],
  materialFinish: { uk: readonly string[]; ua: readonly string[] },
) {
  return [
    {
      icon: "shield" as const,
      label: t(market, "Applicable Standards", "Застосовні стандарти"),
      value: ["BS EN 61537", "IEC 61537"],
    },
    {
      icon: "layers" as const,
      label: t(market, "Material & Finish", "Матеріал та покриття"),
      value: market === "ua" ? materialFinish.ua : materialFinish.uk,
    },
    {
      icon: "system" as const,
      label: t(market, "Key Features", "Основні характеристики"),
      value: keyFeatures,
    },
    {
      icon: "support" as const,
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

function baseContent(
  market: MarketCode,
  args: Readonly<{
    slug: CableManagementFamilyContent["slug"];
    breadcrumbLabel: string;
    title: string;
    titleQualifier: string;
    description: { uk: string; ua: string };
    keyFeatures: readonly string[];
    materialFinish: { uk: readonly string[]; ua: readonly string[] };
    supportHeading: { uk: string; ua: string };
    supportDescription: { uk: string; ua: string };
    hrefSuffix: string;
    /** Set for every series with its own verified transparent hero render
     * (see accessories-fixings/family/). Screw Sets, Threaded Rods, Steel
     * Anchors & Plastic Strip Protector is the one series that omits this —
     * its own dedicated transparent asset happens to already be HERO_IMAGE
     * (see accessories-fixings/hero/), so the default already resolves
     * correctly for it. */
    heroImage?: string;
    heroImageAlt?: { uk: string; ua: string };
    /** Overrides the default "Order Codes & Technical Schedule" heading —
     * used by families whose schedule section isn't a normal order-code
     * table (Shaft Access Cover's custom-spec note, Aluminium Cable
     * Cleats' size-variant table). */
    scheduleHeading?: { uk: string; ua: string };
    scheduleIntroduction?: { uk: string; ua: string };
    /** Real, catalogue-verified size variants with no order/stock code —
     * see aluminium-cable-cleats-sizes.ts. */
    sizeVariants?: readonly CableSizeVariant[];
    /** Explanatory paragraphs for a genuinely custom / made-to-order family
     * with no catalogue order-code table at all — see shaft-access-cover. */
    customSpecNote?: { uk: readonly string[]; ua: readonly string[] };
  }>,
): CableManagementFamilyContent {
  return {
    slug: args.slug,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Accessories & Fixings", "Аксесуари та кріплення"), href: "/products/cable-support-systems/accessories-fixings" },
      { label: args.breadcrumbLabel },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: args.title,
    titleQualifier: args.titleQualifier,
    description: t(market, args.description.uk, args.description.ua),
    image: args.heroImage ?? HERO_IMAGE,
    imageAlt: args.heroImageAlt
      ? t(market, args.heroImageAlt.uk, args.heroImageAlt.ua)
      : t(market, "Gersan cable management accessories and fixings, product photograph", "Аксесуари та кріплення Gersan для кабеленесучих систем, фото продукту"),
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
    technicalSnapshot: baseTechnicalSnapshot(market, args.keyFeatures, args.materialFinish),
    relatedFamiliesHeading: t(market, "Product families in this category", "Продуктові сімейства в цій категорії"),
    relatedFamilies: relatedAccessoriesFixingsFamilies(market),
    scheduleHeading: args.scheduleHeading
      ? t(market, args.scheduleHeading.uk, args.scheduleHeading.ua)
      : t(market, "Order Codes & Technical Schedule", "Коди замовлення та технічна таблиця"),
    scheduleIntroduction: args.scheduleIntroduction
      ? t(market, args.scheduleIntroduction.uk, args.scheduleIntroduction.ua)
      : t(
          market,
          "Every model, stock code, dimension and weight below is drawn directly from the Gersan Cable Support catalogue.",
          "Кожна модель, код складу, розмір та вага нижче взяті безпосередньо з каталогу Gersan Cable Support.",
        ),
    standardLabel: "BS EN 61537",
    sizeVariants: args.sizeVariants,
    customSpecNote: args.customSpecNote ? (market === "ua" ? args.customSpecNote.ua : args.customSpecNote.uk) : undefined,
    accessoriesHeading: t(market, "Compatible Accessories", "Сумісні аксесуари"),
    accessoriesIntroduction: t(
      market,
      "Fixing hardware and installation accessories from the same system.",
      "Кріпильна фурнітура та монтажні аксесуари з тієї ж системи.",
    ),
    accessoryDisplayGroups: accessoriesFixingsDisplayGroups(),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(market, args.supportHeading.uk, args.supportHeading.ua),
    supportDescription: t(market, args.supportDescription.uk, args.supportDescription.ua),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: `${REQUEST_HREF}-${args.hrefSuffix}`,
  };
}

export function screwSetsThreadedRodsAnchorsContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return baseContent(market, {
    slug: "screw-sets-threaded-rods-anchors",
    breadcrumbLabel: "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector, Galvanized Paint",
    title: "Screw Sets, Threaded Rods, Steel Anchors & Plastic Strip Protector",
    titleQualifier: `(${SCREW_SETS_THREADED_RODS_ANCHORS_VARIANTS.length} Items)`,
    description: {
      uk: "Screw sets, threaded rods, steel anchors, plastic strip protector and galvanized paint for general fixing and touch-up across every cable management system.",
      ua: "Комплекти гвинтів, різьбові шпильки, сталеві анкери, пластикова захисна стрічка та цинконаповнена фарба для загального кріплення та підфарбування в усіх кабеленесучих системах.",
    },
    keyFeatures: [
      t(market, "Screw Sets (DIN 933)", "Комплекти гвинтів (DIN 933)"),
      t(market, "Threaded Rods (DIN 975)", "Різьбові шпильки (DIN 975)"),
      t(market, "Steel Anchors", "Сталеві анкери"),
      t(market, "Plastic Strip Protector", "Пластикова захисна стрічка"),
      t(market, "Galvanized Paint & Zinc Spray", "Цинконаповнена фарба та цинковий спрей"),
    ],
    materialFinish: {
      uk: ["Steel (GEOMET / Electrogalvanized)", "Stainless Steel (304-316)", "Plastic", "Zinc-Rich Galvanizing Paint"],
      ua: ["Сталь (GEOMET / електроцинкування)", "Нержавіюча сталь (304-316)", "Пластик", "Цинконаповнена фарба"],
    },
    supportHeading: { uk: "Need help with fasteners and anchors?", ua: "Потрібна допомога з кріпленнями та анкерами?" },
    supportDescription: {
      uk: "Our technical team can assist with fastener selection, anchor sizing and installation methods.",
      ua: "Наша технічна команда допоможе з вибором кріплення, підбором анкерів та методами монтажу.",
    },
    hrefSuffix: "screw-sets",
  });
}

export function coverCableTrayCoverClampsContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return baseContent(market, {
    slug: "cover-cable-tray-cover-clamps",
    breadcrumbLabel: "Cover for Cable Tray and Cover Clamps",
    title: "Cover for Cable Tray & Cover Clamps",
    titleQualifier: `(${COVER_CABLE_TRAY_COVER_CLAMPS_VARIANTS.length} Items)`,
    description: {
      uk: "Covers, duct-type roofed covers and cover clamps for enclosing cable tray runs.",
      ua: "Кришки, дахові кришки коробчастого типу та затискачі кришок для закриття кабельних лотків.",
    },
    keyFeatures: [
      t(market, "Cover for Cable Tray", "Кришка кабельного лотка"),
      t(market, "Duct Type Roofed Cover", "Дахова кришка коробчастого типу"),
      t(market, "Cover Clamps (GKK / GKK-A)", "Затискачі кришок (GKK / GKK-A)"),
    ],
    materialFinish: {
      uk: ["Aluminium"],
      ua: ["Алюміній"],
    },
    supportHeading: { uk: "Need help with covers and clamps?", ua: "Потрібна допомога з кришками та затискачами?" },
    supportDescription: {
      uk: "Our technical team can help with cover selection, clamp spacing and enclosure planning.",
      ua: "Наша технічна команда допоможе з вибором кришок, кроком затискачів та плануванням закриття.",
    },
    hrefSuffix: "covers-clamps",
    heroImage: `${IMAGE_BASE}/accessories-fixings/family/cable-tray-cover-and-cover-clamps-transparent.png`,
    heroImageAlt: {
      uk: "Gersan cable tray cover and cover clamp, product photograph",
      ua: "Кришка кабельного лотка та затискач кришки Gersan, фото продукту",
    },
  });
}

export function reducersContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return baseContent(market, {
    slug: "reducers",
    breadcrumbLabel: "Reducers",
    title: "Reducers",
    titleQualifier: `(${REDUCERS_VARIANTS.length} Items)`,
    description: {
      uk: "Width-transition reducers for stepping down between cable tray and trunking sizes, covering Normal Type and Strengthened (h=40/50/60/100 mm) cable tray widths.",
      ua: "Редукції для переходу між ширинами кабельних лотків та коробів, що охоплюють кабельні лотки стандартного типу та посиленого типу (h=40/50/60/100 мм).",
    },
    keyFeatures: [
      t(market, "Width-Transition Reducers", "Редукції переходу ширини"),
      t(market, "Normal Type Compatible", "Сумісні зі стандартним типом"),
      t(market, "Strengthened h=40–100 mm Compatible", "Сумісні з посиленим типом h=40–100 мм"),
      t(market, "3000 mm Standard Length", "Стандартна довжина 3000 мм"),
    ],
    materialFinish: {
      uk: ["Aluminium"],
      ua: ["Алюміній"],
    },
    supportHeading: { uk: "Need help selecting a reducer?", ua: "Потрібна допомога з підбором редукції?" },
    supportDescription: {
      uk: "Our technical team can help match the right reducer to your tray widths and heights.",
      ua: "Наша технічна команда допоможе підібрати правильну редукцію для ваших ширин та висот лотків.",
    },
    hrefSuffix: "reducers",
    heroImage: `${IMAGE_BASE}/accessories-fixings/family/reducers-transparent.png`,
    heroImageAlt: {
      uk: "Gersan cable tray reducer, product photograph",
      ua: "Редукція кабельного лотка Gersan, фото продукту",
    },
  });
}

export function separatorEndCapLevelDirectionChangerContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return baseContent(market, {
    slug: "separator-end-cap-level-direction-changer",
    breadcrumbLabel: "Separator, End Cap, Level Changer, Direction Changer",
    title: "Separator, End Cap, Level Changer & Direction Changer",
    titleQualifier: `(${SEPARATOR_END_CAP_LEVEL_DIRECTION_CHANGER_VARIANTS.length} Items)`,
    description: {
      uk: "Compartment separators, end caps, cover clamps and level/direction-changing elements for organizing and terminating cable tray runs.",
      ua: "Розділювачі відсіків, торцеві заглушки, затискачі кришок та елементи зміни рівня/напрямку для організації та завершення кабельних лотків.",
    },
    keyFeatures: [
      t(market, "Separators (Cable / Ladder)", "Розділювачі (кабель / драбина)"),
      t(market, "End Caps", "Торцеві заглушки"),
      t(market, "Level Changers", "Елементи зміни рівня"),
      t(market, "Direction Changers", "Елементи зміни напрямку"),
    ],
    materialFinish: {
      uk: ["Aluminium"],
      ua: ["Алюміній"],
    },
    supportHeading: { uk: "Need help with separators and level changers?", ua: "Потрібна допомога з розділювачами та елементами зміни рівня?" },
    supportDescription: {
      uk: "Our technical team can help with compartmentalization, termination and level-transition planning.",
      ua: "Наша технічна команда допоможе з поділом на відсіки, завершенням та плануванням переходів рівня.",
    },
    hrefSuffix: "separator-end-cap",
    heroImage: `${IMAGE_BASE}/accessories-fixings/family/seperator-end-cap-level-changer-direction-changer-transparent.png`,
    heroImageAlt: {
      uk: "Gersan cable tray separator and end cap, product photograph",
      ua: "Розділювач та торцева заглушка кабельного лотка Gersan, фото продукту",
    },
  });
}

export function aluminiumCableCleatsContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return baseContent(market, {
    slug: "aluminium-cable-cleats",
    breadcrumbLabel: "Aluminium Cable Cleats",
    title: "Aluminium Cable Cleats",
    titleQualifier: t(
      market,
      `(${ALUMINIUM_CABLE_CLEATS_SIZE_VARIANTS.length} Size Variants)`,
      `(${ALUMINIUM_CABLE_CLEATS_SIZE_VARIANTS.length} варіантів розміру)`,
    ),
    description: {
      uk: "Single and double bolt fixing type aluminium cleats (GATFC, GATFC (SP), GACC) for securing single and trefoil cable groups along a route, across 10–155 mm clamping diameters depending on sub-series. The catalogue publishes no order or stock code for individual size variants — every size below confirms on request.",
      ua: "Алюмінієві кліти з одинарним та подвійним болтовим кріпленням (GATFC, GATFC (SP), GACC) для фіксації одинарних та трифазних груп кабелів уздовж траси, у діапазоні діаметрів затискання 10–155 мм залежно від підсерії. Каталог не публікує код замовлення чи складу для окремих варіантів розміру — кожен розмір нижче уточнюється за запитом.",
    },
    keyFeatures: [
      t(market, "Single Bolt Fixing (GATFC / GATFC SP)", "Одноболтове кріплення (GATFC / GATFC SP)"),
      t(market, "Double Bolt Fixing (GACC)", "Двоболтове кріплення (GACC)"),
      t(market, "Trefoil Type (GATFC SP)", "Трифазний тип (GATFC SP)"),
      t(market, "10–155 mm Clamping Range", "Діапазон затискання 10–155 мм"),
    ],
    materialFinish: {
      uk: ["Aluminium"],
      ua: ["Алюміній"],
    },
    scheduleHeading: {
      uk: "Available Sizes & Technical Schedule",
      ua: "Доступні розміри та технічна таблиця",
    },
    scheduleIntroduction: {
      uk: "Every size variant and dimension below is drawn directly from the Gersan Cable Support catalogue. No order or stock code is published for this series — confirm the code for your selected size with our technical team.",
      ua: "Кожен варіант розміру та розмірне значення нижче взяті безпосередньо з каталогу Gersan Cable Support. Для цієї серії код замовлення чи складу не публікується — уточніть код для обраного розміру в нашої технічної команди.",
    },
    sizeVariants: ALUMINIUM_CABLE_CLEATS_SIZE_VARIANTS,
    supportHeading: { uk: "Need help selecting cable cleats?", ua: "Потрібна допомога з підбором кабельних кліт?" },
    supportDescription: {
      uk: "Our technical team can confirm sizing and order codes for your specific cable diameter.",
      ua: "Наша технічна команда підтвердить розміри та коди замовлення для вашого конкретного діаметра кабелю.",
    },
    hrefSuffix: "cable-cleats",
    heroImage: `${IMAGE_BASE}/accessories-fixings/family/aluminium-cable-cleats-transparent.png`,
    heroImageAlt: {
      uk: "Gersan aluminium cable cleat, product photograph",
      ua: "Алюмінієва кабельна кліта Gersan, фото продукту",
    },
  });
}

export function cableCrochetsContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return baseContent(market, {
    slug: "cable-crochets",
    breadcrumbLabel: "Cable Crochets",
    title: "Cable Crochets (C-Profile / Angle)",
    titleQualifier: `(${CABLE_CROCHETS_VARIANTS.length} Items)`,
    description: {
      uk: "C-profile and angle crochets for direct cable support off structure, in standard aluminium and antimagnetic (Cr-Ni stainless steel) variants.",
      ua: "Кроше C-профілю та кутника для прямої підтримки кабелю на конструкції, у стандартному алюмінієвому та антимагнітному (нержавіюча сталь Cr-Ni) варіантах.",
    },
    keyFeatures: [
      t(market, "C-Profile Crochets", "Кроше C-профілю"),
      t(market, "Angle Crochets", "Кутникові кроше"),
      t(market, "Antimagnetic (Cr-Ni) Variant", "Антимагнітний варіант (Cr-Ni)"),
      t(market, "Direct Structural Support", "Пряма конструктивна підтримка"),
    ],
    materialFinish: {
      uk: ["Aluminium", "Stainless Steel (Cr-Ni)"],
      ua: ["Алюміній", "Нержавіюча сталь (Cr-Ni)"],
    },
    supportHeading: { uk: "Need help selecting cable crochets?", ua: "Потрібна допомога з підбором кабельних кроше?" },
    supportDescription: {
      uk: "Our technical team can help match the right crochet to your structural fixing points.",
      ua: "Наша технічна команда допоможе підібрати правильний кроше для ваших точок кріплення.",
    },
    hrefSuffix: "cable-crochets",
    heroImage: `${IMAGE_BASE}/accessories-fixings/family/cable-crochets-c-profile-angle-transparent.png`,
    heroImageAlt: {
      uk: "Gersan cable crochet, product photograph",
      ua: "Кабельний кроше Gersan, фото продукту",
    },
  });
}

export function graniteMountingElementsContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return baseContent(market, {
    slug: "granite-mounting-elements",
    breadcrumbLabel: "Granite Mounting Elements",
    title: "Granite Mounting Elements",
    titleQualifier: `(${GRANITE_MOUNTING_ELEMENTS_VARIANTS.length} Items)`,
    description: {
      uk: "Mounting elements for fixing support systems into granite and stone surfaces, with optional pregalvanized, Corten-A, aluminium and stainless steel (SS304-316) finishes.",
      ua: "Елементи кріплення для монтажу опорних систем у гранітні та кам'яні поверхні, з опціями покриття: прегальванізація, Corten-A, алюміній та нержавіюча сталь (SS304-316).",
    },
    keyFeatures: [
      t(market, "Granite & Stone Fixing", "Кріплення до граніту та каменю"),
      t(market, "Mounting Elements", "Елементи кріплення"),
      t(market, "Mounting Profiles", "Профілі кріплення"),
      t(market, "Optional Corrosion-Resistant Finishes", "Опційні корозійностійкі покриття"),
    ],
    materialFinish: {
      uk: ["Hot-Dip Galvanized Steel", "Optional: Pregalvanized, Corten-A, Aluminium, Stainless Steel (304-316)"],
      ua: ["Сталь гарячого цинкування", "Опційно: прегальванізація, Corten-A, алюміній, нержавіюча сталь (304-316)"],
    },
    supportHeading: { uk: "Need help with granite fixing?", ua: "Потрібна допомога з кріпленням до граніту?" },
    supportDescription: {
      uk: "Our technical team can help with granite/stone fixing details and finish selection.",
      ua: "Наша технічна команда допоможе з деталями кріплення до граніту/каменю та вибором покриття.",
    },
    hrefSuffix: "granite-mounting",
    heroImage: `${IMAGE_BASE}/accessories-fixings/family/granite-mounting-elements-transparent.png`,
    heroImageAlt: {
      uk: "Gersan granite mounting element, product photograph",
      ua: "Елемент кріплення до граніту Gersan, фото продукту",
    },
  });
}

export function cableDrumSupportEquipmentContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return baseContent(market, {
    slug: "cable-drum-support-equipment",
    breadcrumbLabel: "Cable Drum Support Equipment",
    title: "Cable Drum Support Equipment",
    titleQualifier: `(${CABLE_DRUM_SUPPORT_EQUIPMENT_VARIANTS.length} Items)`,
    description: {
      uk: "Support equipment for holding and paying out cable drums during installation, including tubular and standard type cable pulling reels and return extension elements.",
      ua: "Обладнання для підтримки та розмотування кабельних барабанів під час монтажу, включно з трубчастими та стандартними тяговими котушками та подовжувальними елементами повороту.",
    },
    keyFeatures: [
      t(market, "Cable Drum Support (5 Ton)", "Підтримка кабельного барабана (5 тонн)"),
      t(market, "Tubular Type Pulling Reels", "Трубчасті тягові котушки"),
      t(market, "Standard Type Pulling Reels", "Стандартні тягові котушки"),
      t(market, "Return Extension Elements", "Подовжувальні елементи повороту"),
    ],
    materialFinish: {
      uk: ["Hot-Dip Galvanized Steel"],
      ua: ["Сталь гарячого цинкування"],
    },
    supportHeading: { uk: "Need help with cable pulling equipment?", ua: "Потрібна допомога з обладнанням для протягування кабелю?" },
    supportDescription: {
      uk: "Our technical team can help plan drum handling and pulling equipment for your installation.",
      ua: "Наша технічна команда допоможе спланувати обладнання для роботи з барабанами та протягування кабелю.",
    },
    hrefSuffix: "cable-drum",
    heroImage: `${IMAGE_BASE}/accessories-fixings/family/cable-drum-support-equipment-transparent.png`,
    heroImageAlt: {
      uk: "Gersan cable drum support equipment, product photograph",
      ua: "Обладнання для підтримки кабельного барабана Gersan, фото продукту",
    },
  });
}

export function mechanicalDilatationElementContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return baseContent(market, {
    slug: "mechanical-dilatation-element",
    breadcrumbLabel: "Mechanical Dilatation Element",
    title: "Mechanical Dilatation Element",
    titleQualifier: `(${MECHANICAL_DILATATION_ELEMENT_VARIANTS.length} Items)`,
    description: {
      uk: "G1-EXP expansion-joint elements accommodating thermal movement along a cable tray containment run, h=40–100 mm.",
      ua: "Елементи компенсаційного шва G1-EXP для компенсації термічного розширення уздовж кабельного лотка, h=40–100 мм.",
    },
    keyFeatures: [
      t(market, "Expansion Joint Elements (G1-EXP)", "Елементи компенсаційного шва (G1-EXP)"),
      t(market, "h=40–100 mm Compatible", "Сумісні з h=40–100 мм"),
      t(market, "Standard & A-Series Widths", "Стандартна та A-серія ширин"),
      t(market, "Thermal Movement Accommodation", "Компенсація термічного розширення"),
    ],
    materialFinish: {
      uk: ["Aluminium"],
      ua: ["Алюміній"],
    },
    supportHeading: { uk: "Need help with expansion joints?", ua: "Потрібна допомога з компенсаційними швами?" },
    supportDescription: {
      uk: "Our technical team can help plan dilatation joint spacing for long containment runs.",
      ua: "Наша технічна команда допоможе спланувати крок компенсаційних швів для довгих трас.",
    },
    hrefSuffix: "dilatation",
    heroImage: `${IMAGE_BASE}/accessories-fixings/family/mechanical-dilatation-element-transparent.png`,
    heroImageAlt: {
      uk: "Gersan mechanical dilatation element, product photograph",
      ua: "Механічний дилатаційний елемент Gersan, фото продукту",
    },
  });
}

export function shaftAccessCoverContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return baseContent(market, {
    slug: "shaft-access-cover",
    breadcrumbLabel: "Shaft Access Cover",
    title: "Shaft Access Cover",
    titleQualifier: t(market, "(Made to Order)", "(Виготовлення на замовлення)"),
    description: {
      uk: "A custom, made-to-order access cover for cable shafts and vertical routing points, manufactured to your project's exact opening dimensions rather than supplied from a fixed catalogue size run.",
      ua: "Індивідуальна кришка шахтного доступу для кабельних шахт та вертикальних точок прокладання, виготовлена за точними розмірами отвору вашого проєкту, а не за фіксованим каталожним рядом розмірів.",
    },
    keyFeatures: [
      t(market, "Custom Project Dimensions", "Індивідуальні розміри проєкту"),
      t(market, "Made to Order", "Виготовлення на замовлення"),
      t(market, "Shaft & Riser Access", "Доступ до шахт та стояків"),
      t(market, "Engineering Consultation", "Інженерна консультація"),
    ],
    materialFinish: {
      uk: ["Confirmed at Technical Consultation"],
      ua: ["Уточнюється на технічній консультації"],
    },
    scheduleHeading: {
      uk: "Custom Dimensions & Project Specification",
      ua: "Індивідуальні розміри та специфікація проєкту",
    },
    scheduleIntroduction: {
      uk: "Shaft Access Cover is manufactured to the required project dimensions rather than sold as a fixed catalogue order-code range — there is no standard schedule to browse here.",
      ua: "Кришка шахтного доступу виготовляється за необхідними розмірами проєкту, а не продається як фіксований каталожний ряд кодів замовлення — стандартної таблиці тут немає.",
    },
    customSpecNote: {
      uk: [
        "Shaft Access Cover is a custom, made-to-order product: Gersan manufactures each cover to the opening dimensions your project requires, rather than from a published catalogue order-code range.",
        "Share your shaft or riser opening dimensions with our technical team and we will confirm the specification, lead time and pricing for your project.",
      ],
      ua: [
        "Кришка шахтного доступу — це індивідуальний продукт, що виготовляється на замовлення: Gersan виготовляє кожну кришку за розмірами отвору, необхідними для вашого проєкту, а не з опублікованого каталожного ряду кодів замовлення.",
        "Надайте розміри отвору вашої шахти чи стояка нашій технічній команді, і ми підтвердимо специфікацію, термін виготовлення та вартість для вашого проєкту.",
      ],
    },
    supportHeading: { uk: "Need a custom shaft access cover?", ua: "Потрібна індивідуальна кришка шахтного доступу?" },
    supportDescription: {
      uk: "Send us your shaft or riser opening dimensions and our technical team will confirm the specification for your project.",
      ua: "Надішліть нам розміри отвору вашої шахти чи стояка, і наша технічна команда підтвердить специфікацію для вашого проєкту.",
    },
    hrefSuffix: "shaft-cover",
    heroImage: `${IMAGE_BASE}/accessories-fixings/family/shaft-access-cover-transparent.png`,
    heroImageAlt: {
      uk: "Gersan shaft access cover, product photograph",
      ua: "Кришка шахтного доступу Gersan, фото продукту",
    },
  });
}

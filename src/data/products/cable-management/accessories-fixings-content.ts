import { publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import type { CableMacroFamilyContent } from "./macro-family-types";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF } from "./content";
import { CABLE_CROCHETS_VARIANTS } from "./variants/cable-crochets";
import { CABLE_DRUM_SUPPORT_EQUIPMENT_VARIANTS } from "./variants/cable-drum-support-equipment";
import { COVER_CABLE_TRAY_COVER_CLAMPS_VARIANTS } from "./variants/cover-cable-tray-cover-clamps";
import { GRANITE_MOUNTING_ELEMENTS_VARIANTS } from "./variants/granite-mounting-elements";
import { MECHANICAL_DILATATION_ELEMENT_VARIANTS } from "./variants/mechanical-dilatation-element";
import { REDUCERS_VARIANTS } from "./variants/reducers";
import { SCREW_SETS_THREADED_RODS_ANCHORS_VARIANTS } from "./variants/screw-sets-threaded-rods-anchors";
import { SEPARATOR_END_CAP_LEVEL_DIRECTION_CHANGER_VARIANTS } from "./variants/separator-end-cap-level-direction-changer";

const IMAGE_BASE = publicMediaUrl("products/cable-management");
const REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "accessories-fixings",
  source: "/products/cable-support-systems",
});

// Ten catalogue series map to this macro group (see category-content.ts).
// All ten now have a real, dedicated card image (see
// accessories-fixings/family/ and .../hero/threaded-rods-anchors-fixings-card.png
// for Screw Sets specifically) — no placeholder cards left. orderCodeCount
// is computed from each family's own real variants array (see
// variants/screw-sets-threaded-rods-anchors.ts and siblings), never
// hardcoded — see accessories-fixings-detail-content.ts for the full
// per-family catalogue audit. Aluminium Cable Cleats and Shaft Access Cover
// are the two exceptions: Aluminium Cable Cleats' catalogue rows are real
// size variants with no stock/order code at all, and Shaft Access Cover is
// a made-to-order product with no catalogue schedule — both omit
// orderCodeCount here (renders "Order codes on request") rather than a
// misleading "0". No "Choose by ..." section here (not part of this macro
// page's design).
const ACCESSORIES_FIXINGS_CONTENT_BY_MARKET: Readonly<Record<MarketCode, CableMacroFamilyContent>> = {
  uk: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Accessories & Fixings" },
    ],
    eyebrow: "Cable Management Systems",
    title: "Accessories & Fixings",
    description:
      "Covers, reducers, separators, joints, clamps, anchors and installation accessories for complete cable-system integration.",
    requestPackAction: "Request Technical Pack",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Download PDF Catalogue",
      meta: "PDF Catalogue",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
    },
    heroImage: `${IMAGE_BASE}/accessories-fixings/hero/threaded-rods-anchors-fixings-transparent-card.png`,
    heroImageAlt: "Gersan threaded rod, wedge anchor, washers and hex nuts fixing set, product photograph",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Applicable Standards",
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: "Materials & Finishes",
        value: ["Hot-Dip Galvanized", "Aluminium", "Stainless Steel"],
      },
      {
        icon: "system",
        label: "System Scope",
        value: ["Covers & Reducers", "Separators & Joints", "Clamps & Anchors", "Fixings"],
      },
      {
        icon: "support",
        label: "Engineering Support",
        value: ["Load & Support Data", "Technical Drawings", "Custom Dimensions", "Installation Guidance"],
      },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction:
      "Ten catalogue series make up the Accessories & Fixings range — covers, reducers, separators, joints, clamps, anchors and installation fixings used across every Cable Management System.",
    series: [
      {
        slug: "screw-sets-threaded-rods-anchors",
        label: "Screw Sets, Threaded Rods, Steel Anchors & Plastic Strip Protector",
        catalogueName: "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector, Galvanized Paint",
        description: "Screw sets, threaded rods, steel anchors, plastic strip protector and galvanized paint for general fixing.",
        image: `${IMAGE_BASE}/accessories-fixings/hero/threaded-rods-anchors-fixings-card.png`,
        imageAlt: "Gersan threaded rod, wedge anchor, washers and hex nuts fixing set",
        orderCodeCount: SCREW_SETS_THREADED_RODS_ANCHORS_VARIANTS.length,
        href: "/products/cable-support-systems/screw-sets-threaded-rods-anchors",
      },
      {
        slug: "cover-cable-tray-cover-clamps",
        label: "Cover for Cable Tray & Cover Clamps",
        catalogueName: "Cover for Cable Tray and Cover Clamps",
        description: "Covers, duct-type roofed covers and clamping hardware for enclosing cable tray runs.",
        image: `${IMAGE_BASE}/accessories-fixings/family/cable-tray-cover-and-cover-clamps.png`,
        imageAlt: "Gersan cable tray cover and cover clamp, product photograph",
        orderCodeCount: COVER_CABLE_TRAY_COVER_CLAMPS_VARIANTS.length,
        href: "/products/cable-support-systems/cover-cable-tray-cover-clamps",
      },
      {
        slug: "reducers",
        label: "Reducers",
        catalogueName: "Reducers",
        description: "Width-transition reducers for stepping down between tray or trunking sizes.",
        image: `${IMAGE_BASE}/accessories-fixings/family/reducers.png`,
        imageAlt: "Gersan cable tray reducer, product photograph",
        orderCodeCount: REDUCERS_VARIANTS.length,
        href: "/products/cable-support-systems/reducers",
      },
      {
        slug: "separator-end-cap-level-direction-changer",
        label: "Separator, End Cap, Level Changer & Direction Changer",
        catalogueName: "Separator, End Cap, Level Changer, Direction Changer",
        description: "Compartment separators, end caps and level/direction-changing elements.",
        image: `${IMAGE_BASE}/accessories-fixings/family/seperator-end-cap-level-changer-direction-changer.png`,
        imageAlt: "Gersan cable tray separator and end cap, product photograph",
        orderCodeCount: SEPARATOR_END_CAP_LEVEL_DIRECTION_CHANGER_VARIANTS.length,
        href: "/products/cable-support-systems/separator-end-cap-level-direction-changer",
      },
      {
        slug: "aluminium-cable-cleats",
        label: "Aluminium Cable Cleats",
        catalogueName: "Aluminium Cable Cleats",
        description: "Aluminium cleats for securing and spacing cables along a route — real size variants, order codes on request.",
        image: `${IMAGE_BASE}/accessories-fixings/family/aluminium-cable-cleats.png`,
        imageAlt: "Gersan aluminium cable cleat, product photograph",
        href: "/products/cable-support-systems/aluminium-cable-cleats",
      },
      {
        slug: "cable-crochets",
        label: "Cable Crochets (C-Profile / Angle)",
        catalogueName: "Cable Crochets (C Profile / Angle)",
        description: "C-profile and angle crochets for direct cable support off structure.",
        image: `${IMAGE_BASE}/accessories-fixings/family/cable-crochets-c-profile-angle.png`,
        imageAlt: "Gersan cable crochet, product photograph",
        orderCodeCount: CABLE_CROCHETS_VARIANTS.length,
        href: "/products/cable-support-systems/cable-crochets",
      },
      {
        slug: "granite-mounting-elements",
        label: "Granite Mounting Elements",
        catalogueName: "Granite Mounting Elements",
        description: "Mounting elements for fixing support systems into granite and stone surfaces.",
        image: `${IMAGE_BASE}/accessories-fixings/family/granite-mounting-elements.png`,
        imageAlt: "Gersan granite mounting element, product photograph",
        orderCodeCount: GRANITE_MOUNTING_ELEMENTS_VARIANTS.length,
        href: "/products/cable-support-systems/granite-mounting-elements",
      },
      {
        slug: "cable-drum-support-equipment",
        label: "Cable Drum Support Equipment",
        catalogueName: "Cable Drum Support Equipment",
        description: "Support equipment for holding and paying out cable drums during installation.",
        image: `${IMAGE_BASE}/accessories-fixings/family/cable-drum-support-equipment.png`,
        imageAlt: "Gersan cable drum support equipment, product photograph",
        orderCodeCount: CABLE_DRUM_SUPPORT_EQUIPMENT_VARIANTS.length,
        href: "/products/cable-support-systems/cable-drum-support-equipment",
      },
      {
        slug: "mechanical-dilatation-element",
        label: "Mechanical Dilatation Element",
        catalogueName: "Mechanical Dilatation Element",
        description: "G1-EXP expansion-joint elements accommodating thermal movement along a containment run.",
        image: `${IMAGE_BASE}/accessories-fixings/family/mechanical-dilatation-element.png`,
        imageAlt: "Gersan mechanical dilatation element, product photograph",
        orderCodeCount: MECHANICAL_DILATATION_ELEMENT_VARIANTS.length,
        href: "/products/cable-support-systems/mechanical-dilatation-element",
      },
      {
        slug: "shaft-access-cover",
        label: "Shaft Access Cover",
        catalogueName: "Shaft Access Cover",
        description: "Custom, made-to-order access covers for cable shafts and vertical routing points.",
        image: `${IMAGE_BASE}/accessories-fixings/family/shaft-access-cover.png`,
        imageAlt: "Gersan shaft access cover, product photograph",
        href: "/products/cable-support-systems/shaft-access-cover",
      },
    ],
    compatibleHeading: "Compatible Systems",
    compatibleIntroduction:
      "These accessories and fixings are used across the following containment and support systems.",
    compatibleSystems: [
      {
        label: "Support & Hanging Systems",
        description: "Support profiles, brackets, consoles and threaded rods that use these fixings.",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        label: "Cable Tray Systems",
        description: "Perforated, heavy-duty and trunking systems that use these covers and reducers.",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        label: "Conduit & Pipe Systems",
        description: "Conduit and pipe systems fixed with the same clamps and fixings.",
        href: "/products/cable-support-systems/conduit-pipe-systems",
      },
    ],
    supportHeading: "Need help selecting the right accessories or fixings?",
    supportDescription:
      "Get technical support with fixing selection, load ratings, materials, finishes and project-specific configurations.",
    supportAction: "Request Technical Support",
    supportHref: REQUEST_HREF,
  },
  ua: {
    breadcrumbs: [
      { label: "Головна", href: "/" },
      { label: "Кабеленесучі системи", href: "/products/cable-support-systems" },
      { label: "Аксесуари та кріплення" },
    ],
    eyebrow: "Кабеленесучі системи",
    title: "Аксесуари та кріплення",
    description:
      "Кришки, редукції, роздільники, з'єднувачі, затискачі, анкери та монтажні аксесуари для повної інтеграції кабельної системи.",
    requestPackAction: "Запросити технічний пакет",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Завантажити PDF-каталог",
      meta: "PDF-каталог",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Завантажити PDF-каталог систем кабельної підтримки Gersan",
    },
    heroImage: `${IMAGE_BASE}/accessories-fixings/hero/threaded-rods-anchors-fixings-transparent-card.png`,
    heroImageAlt: "Комплект кріплення Gersan: різьбова шпилька, клиновий анкер, шайби та шестигранні гайки, фото продукту",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Застосовні стандарти",
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: "Матеріали та покриття",
        value: ["Гаряче цинкування", "Алюміній", "Нержавіюча сталь"],
      },
      {
        icon: "system",
        label: "Обсяг системи",
        value: ["Кришки та редукції", "Роздільники та з'єднувачі", "Затискачі та анкери", "Кріплення"],
      },
      {
        icon: "support",
        label: "Інженерна підтримка",
        value: ["Дані навантаження та опор", "Технічні креслення", "Індивідуальні розміри", "Настанови з монтажу"],
      },
    ],
    seriesHeading: "Серії продукції цієї системи",
    seriesIntroduction:
      "Десять серій каталогу складають асортимент аксесуарів та кріплення — кришки, редукції, роздільники, з'єднувачі, затискачі, анкери та монтажне кріплення, що використовуються в усіх кабеленесучих системах.",
    series: [
      {
        slug: "screw-sets-threaded-rods-anchors",
        label: "Комплекти гвинтів, різьбові шпильки, сталеві анкери та пластикова захисна стрічка",
        catalogueName: "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector, Galvanized Paint",
        description:
          "Комплекти гвинтів, різьбові шпильки, сталеві анкери, пластикова захисна стрічка та цинконаповнена фарба для загального кріплення.",
        image: `${IMAGE_BASE}/accessories-fixings/hero/threaded-rods-anchors-fixings-card.png`,
        imageAlt: "Комплект кріплення Gersan: різьбова шпилька, клиновий анкер, шайби та шестигранні гайки",
        orderCodeCount: SCREW_SETS_THREADED_RODS_ANCHORS_VARIANTS.length,
        href: "/products/cable-support-systems/screw-sets-threaded-rods-anchors",
      },
      {
        slug: "cover-cable-tray-cover-clamps",
        label: "Кришка для кабельного лотка та затискачі кришки",
        catalogueName: "Cover for Cable Tray and Cover Clamps",
        description: "Кришки, дахові кришки коробчастого типу та затискне кріплення для закриття кабельних лотків.",
        image: `${IMAGE_BASE}/accessories-fixings/family/cable-tray-cover-and-cover-clamps.png`,
        imageAlt: "Кришка кабельного лотка та затискач кришки Gersan, фото продукту",
        orderCodeCount: COVER_CABLE_TRAY_COVER_CLAMPS_VARIANTS.length,
        href: "/products/cable-support-systems/cover-cable-tray-cover-clamps",
      },
      {
        slug: "reducers",
        label: "Редукції",
        catalogueName: "Reducers",
        description: "Редукції для переходу між лотками або коробами різної ширини.",
        image: `${IMAGE_BASE}/accessories-fixings/family/reducers.png`,
        imageAlt: "Редукція кабельного лотка Gersan, фото продукту",
        orderCodeCount: REDUCERS_VARIANTS.length,
        href: "/products/cable-support-systems/reducers",
      },
      {
        slug: "separator-end-cap-level-direction-changer",
        label: "Роздільник, торцева заглушка, елемент зміни рівня та напрямку",
        catalogueName: "Separator, End Cap, Level Changer, Direction Changer",
        description: "Роздільники відсіків, торцеві заглушки та елементи зміни рівня/напрямку.",
        image: `${IMAGE_BASE}/accessories-fixings/family/seperator-end-cap-level-changer-direction-changer.png`,
        imageAlt: "Розділювач та торцева заглушка кабельного лотка Gersan, фото продукту",
        orderCodeCount: SEPARATOR_END_CAP_LEVEL_DIRECTION_CHANGER_VARIANTS.length,
        href: "/products/cable-support-systems/separator-end-cap-level-direction-changer",
      },
      {
        slug: "aluminium-cable-cleats",
        label: "Алюмінієві кабельні тримачі",
        catalogueName: "Aluminium Cable Cleats",
        description: "Алюмінієві тримачі для фіксації та розведення кабелів уздовж траси — реальні варіанти розмірів, коди замовлення за запитом.",
        image: `${IMAGE_BASE}/accessories-fixings/family/aluminium-cable-cleats.png`,
        imageAlt: "Алюмінієва кабельна кліта Gersan, фото продукту",
        href: "/products/cable-support-systems/aluminium-cable-cleats",
      },
      {
        slug: "cable-crochets",
        label: "Кабельні гачки (C-профіль / кутовий)",
        catalogueName: "Cable Crochets (C Profile / Angle)",
        description: "Гачки з C-профілю та кутові гачки для прямої підтримки кабелю від конструкції.",
        image: `${IMAGE_BASE}/accessories-fixings/family/cable-crochets-c-profile-angle.png`,
        imageAlt: "Кабельний кроше Gersan, фото продукту",
        orderCodeCount: CABLE_CROCHETS_VARIANTS.length,
        href: "/products/cable-support-systems/cable-crochets",
      },
      {
        slug: "granite-mounting-elements",
        label: "Елементи кріплення до граніту",
        catalogueName: "Granite Mounting Elements",
        description: "Елементи кріплення опорних систем до гранітних та кам'яних поверхонь.",
        image: `${IMAGE_BASE}/accessories-fixings/family/granite-mounting-elements.png`,
        imageAlt: "Елемент кріплення до граніту Gersan, фото продукту",
        orderCodeCount: GRANITE_MOUNTING_ELEMENTS_VARIANTS.length,
        href: "/products/cable-support-systems/granite-mounting-elements",
      },
      {
        slug: "cable-drum-support-equipment",
        label: "Обладнання для підтримки кабельних барабанів",
        catalogueName: "Cable Drum Support Equipment",
        description: "Опорне обладнання для утримання та розмотування кабельних барабанів під час монтажу.",
        image: `${IMAGE_BASE}/accessories-fixings/family/cable-drum-support-equipment.png`,
        imageAlt: "Обладнання для підтримки кабельного барабана Gersan, фото продукту",
        orderCodeCount: CABLE_DRUM_SUPPORT_EQUIPMENT_VARIANTS.length,
        href: "/products/cable-support-systems/cable-drum-support-equipment",
      },
      {
        slug: "mechanical-dilatation-element",
        label: "Механічний деформаційний елемент",
        catalogueName: "Mechanical Dilatation Element",
        description: "Деформаційні елементи G1-EXP, що компенсують теплове розширення вздовж траси захисту кабелю.",
        image: `${IMAGE_BASE}/accessories-fixings/family/mechanical-dilatation-element.png`,
        imageAlt: "Механічний дилатаційний елемент Gersan, фото продукту",
        orderCodeCount: MECHANICAL_DILATATION_ELEMENT_VARIANTS.length,
        href: "/products/cable-support-systems/mechanical-dilatation-element",
      },
      {
        slug: "shaft-access-cover",
        label: "Кришка ревізійного люка шахти",
        catalogueName: "Shaft Access Cover",
        description: "Індивідуальні кришки шахтного доступу, виготовлені на замовлення за розмірами проєкту.",
        image: `${IMAGE_BASE}/accessories-fixings/family/shaft-access-cover.png`,
        imageAlt: "Кришка шахтного доступу Gersan, фото продукту",
        href: "/products/cable-support-systems/shaft-access-cover",
      },
    ],
    compatibleHeading: "Сумісні системи",
    compatibleIntroduction: "Ці аксесуари та кріплення використовуються в наступних системах захисту та опор кабелів.",
    compatibleSystems: [
      {
        label: "Системи опор та підвісу",
        description: "Опорні профілі, кронштейни, консолі та різьбові шпильки, що використовують це кріплення.",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        label: "Кабельні лотки",
        description: "Перфоровані, важкого типу та коробчасті системи, що використовують ці кришки та редукції.",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        label: "Трубні та кабелепровідні системи",
        description: "Кабелепровідні та трубні системи, що фіксуються тими самими затискачами та кріпленням.",
        href: "/products/cable-support-systems/conduit-pipe-systems",
      },
    ],
    supportHeading: "Потрібна допомога з підбором аксесуарів чи кріплення?",
    supportDescription:
      "Отримайте технічну підтримку з підбору кріплення, розрахунку навантаження, матеріалів, покриттів та індивідуальних конфігурацій проєкту.",
    supportAction: "Запросити технічну підтримку",
    supportHref: REQUEST_HREF,
  },
};

export function accessoriesFixingsContentForMarket(market: MarketCode): CableMacroFamilyContent {
  return ACCESSORIES_FIXINGS_CONTENT_BY_MARKET[market];
}

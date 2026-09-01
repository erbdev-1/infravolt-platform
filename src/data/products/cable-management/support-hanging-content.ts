import { publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import type { CableMacroFamilyContent } from "./macro-family-types";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF } from "./content";

const IMAGE_BASE = publicMediaUrl("products/cable-management");
const REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "support-hanging-systems",
  source: "/products/cable-support-systems",
});

// Every series entry, order-code count and material below is taken from
// catalog-source/cable-support/{NPI-80 Support System, U-Z-L-W Profile and
// Bracket Hanging Systems, Tijle Kanal Taşıyıcı - Özel Askı Sistemleri,
// Dikey T Elemanları  Vertical, C Profil - Profil Destek ve Bağlantı
// Elemanları}/*-report.md and *-product-data.csv (row counts = data rows,
// header excluded). None of the five has its own detail page yet, so
// `href` is intentionally absent on every series card — see
// CableSupportSeriesCard. `catalogueName` (the manufacturer's own series
// designation) stays in English in both markets, same convention as
// category-content.ts.
const SUPPORT_HANGING_SYSTEMS_CONTENT_BY_MARKET: Readonly<Record<MarketCode, CableMacroFamilyContent>> = {
  uk: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Support & Hanging Systems" },
    ],
    eyebrow: "Cable Management Systems",
    title: "Support & Hanging Systems",
    description:
      "Cable tray and cable ladder support systems — profiles, brackets, consoles, threaded rods and suspension components engineered for secure wall, ceiling and structural cable management installations.",
    requestPackAction: "Request Technical Pack",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Download PDF Catalogue",
      meta: "PDF Catalogue",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
    },
    heroImage: `${IMAGE_BASE}/npi-80-support-system/hero/support-hanging-systems-transparent-hero.png`,
    heroImageAlt:
      "Gersan ceiling-mounted support system with threaded rods, profile and cable tray installed together",
    technicalSnapshot: [
      {
        icon: "system",
        label: "Support Types",
        value: ["Wall Brackets", "Ceiling Supports", "Profiles", "Threaded Rod Systems"],
      },
      {
        icon: "layers",
        label: "Mounting",
        value: ["Wall", "Ceiling", "Floor", "Multi-Level"],
      },
      {
        icon: "shield",
        label: "Materials & Finishes",
        value: ["Hot-Dip Galvanized", "Electrogalvanized", "Pregalvanized", "Aluminium", "Stainless Steel"],
      },
      {
        icon: "support",
        label: "Engineering Support",
        value: ["Load Data", "Support Spacing", "Installation Details", "Custom Fabrication"],
      },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction:
      "Five catalogue series make up the Support & Hanging Systems range — profiles, brackets, threaded-rod hardware and fixing elements for every mounting condition.",
    series: [
      {
        slug: "npi-80-support-system",
        label: "NPI-80 Support Systems",
        catalogueName: "NPI-80 Support System",
        description:
          "Hanger profiles, GK brackets, ceiling fixing plates and stair elements for cable carriers and cable ladders.",
        image: `${IMAGE_BASE}/npi-80-support-system/card/npi-80-support-systems-card.png`,
        imageAlt: "Gersan NPI-80 support system components — profile, bracket and jointing pieces",
        orderCodeCount: 122,
        href: "/products/cable-support-systems/npi-80-support-system",
      },
      {
        slug: "u-z-l-w-profile-hanging-systems",
        label: "U / Z / L / W Profiles",
        catalogueName: "U-Z-L-W Profile and Bracket Hanging Systems",
        description:
          "Profile and console hanging elements for wall- and ceiling-mounted cable routing, including a pregalvanized option.",
        image: `${IMAGE_BASE}/npi-80-support-system/card/uzlw-profiles-brackets-card.png`,
        imageAlt: "Gersan U-Z-L-W profile and bracket hanging components",
        orderCodeCount: 76,
        href: "/products/cable-support-systems/u-z-l-w-profile-hanging-systems",
      },
      {
        slug: "threaded-rod-tray-carriers",
        label: "Threaded Rod & Special Hanging Systems",
        catalogueName: "Tray Carriers Used With Threaded Rods — Special Brackets",
        description:
          "Threaded-rod tray carriers and beam fixing units for ceiling/structural steel mounting, plus special brackets including a seismic hook option.",
        image: `${IMAGE_BASE}/npi-80-support-system/card/tray-carriers-threaded-rod-hanging-systems-card.png`,
        imageAlt: "Gersan threaded-rod tray carrier suspended from a ceiling fixing, with hook accessory",
        orderCodeCount: 55,
        href: "/products/cable-support-systems/threaded-rod-tray-carriers",
      },
      {
        slug: "c-profile-support-systems",
        label: "C-Profile Support Systems",
        catalogueName: "C Profile — Support and Mounting Elements",
        description:
          "Single and combined C-profiles, consoles and fixing elements, including an embedded (cast-in) floor/structural carrier.",
        image: `${IMAGE_BASE}/npi-80-support-system/card/c-profile-support-systems-card.png`,
        imageAlt: "Gersan C profile support components — profiles, console bracket and fixing bolt",
        orderCodeCount: 238,
        href: "/products/cable-support-systems/c-profile-support-systems",
      },
      {
        slug: "threaded-rods-anchors-fixings",
        label: "Threaded Rods, Anchors & Fixings",
        catalogueName: "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector",
        description:
          "Threaded rods, wedge anchors, bolt sets and plastic strip protectors used to fix and complete a support installation.",
        image: `${IMAGE_BASE}/npi-80-support-system/card/threaded-rods-anchors-fixings-card.png`,
        imageAlt: "Gersan threaded rod, wedge anchor, washers and hex nuts fixing set",
        orderCodeCount: 95,
        href: "/products/cable-support-systems/threaded-rods-anchors-fixings",
      },
    ],
    chooseHeading: "Choose by Installation Type",
    chooseIntroduction: "Get in touch about the right fixing arrangement for your installation type.",
    chooseOptions: [
      {
        label: "Ceiling Suspension",
        description: "Ceiling fixing plates and threaded-rod/beam-hung carriers.",
        href: REQUEST_HREF,
      },
      {
        label: "Wall-Mounted Support",
        description: "Wall brackets and profile consoles.",
        href: REQUEST_HREF,
      },
      {
        label: "Floor / Structural Support",
        description: "Embedded, cast-in structural carriers.",
        href: REQUEST_HREF,
      },
    ],
    compatibleHeading: "Compatible Systems",
    compatibleIntroduction:
      "Support & Hanging products form the structural installation layer for these cable-containment systems.",
    compatibleSystems: [
      {
        label: "Cable Tray Systems",
        description: "Perforated, heavy-duty and trunking systems carried by these support profiles and brackets.",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        label: "Cable Ladder Systems",
        description: "High-capacity ladder systems for demanding industrial cable installations.",
        href: "/products/cable-support-systems/cable-ladders",
      },
      {
        label: "Wire-Mesh Systems",
        description: "Lightweight ventilated wire-mesh containment for flexible cable routing.",
        href: "/products/cable-support-systems/wire-mesh-systems",
      },
    ],
    supportHeading: "Need help configuring a support system?",
    supportDescription:
      "Get technical support with profile selection, brackets, suspension arrangements, support spacing and project-specific configurations.",
    supportAction: "Request Technical Support",
    supportHref: REQUEST_HREF,
  },
  ua: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Системи опор та підвісу" },
    ],
    eyebrow: "Кабеленесучі системи",
    title: "Системи опор та підвісу",
    description:
      "Опорні профілі, кронштейни, консолі, різьбові шпильки та підвісні компоненти, розроблені для надійного настінного, стельового та конструктивного монтажу кабельних систем.",
    requestPackAction: "Запросити технічний пакет",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Завантажити PDF-каталог",
      meta: "PDF-каталог",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Завантажити PDF-каталог систем кабельної підтримки Gersan",
    },
    heroImage: `${IMAGE_BASE}/npi-80-support-system/hero/support-hanging-systems-transparent-hero.png`,
    heroImageAlt: "Стельова опорна система Gersan із різьбовими шпильками, профілем та кабельним лотком у зборі",
    technicalSnapshot: [
      {
        icon: "system",
        label: "Типи опор",
        value: ["Настінні кронштейни", "Стельові опори", "Профілі", "Системи різьбових шпильок"],
      },
      {
        icon: "layers",
        label: "Монтаж",
        value: ["Стіна", "Стеля", "Підлога", "Багаторівневий"],
      },
      {
        icon: "shield",
        label: "Матеріали та покриття",
        value: ["Гаряче цинкування", "Електроцинкування", "Прегальванізація", "Алюміній", "Нержавіюча сталь"],
      },
      {
        icon: "support",
        label: "Інженерна підтримка",
        value: ["Дані навантаження", "Крок опор", "Деталі монтажу", "Виготовлення на замовлення"],
      },
    ],
    seriesHeading: "Серії продукції цієї системи",
    seriesIntroduction:
      "П'ять серій каталогу складають асортимент систем опор та підвісу — профілі, кронштейни, кріплення для різьбових шпильок та фіксувальні елементи для будь-яких умов монтажу.",
    series: [
      {
        slug: "npi-80-support-system",
        label: "Опорні системи NPI-80",
        catalogueName: "NPI-80 Support System",
        description:
          "Підвісні профілі, кронштейни GK, стельові фіксувальні пластини та сходинкові елементи для кабеленесучих конструкцій і кабельних драбин.",
        image: `${IMAGE_BASE}/npi-80-support-system/card/npi-80-support-systems-card.png`,
        imageAlt: "Компоненти опорної системи Gersan NPI-80 — профіль, кронштейн та з'єднувальні елементи",
        orderCodeCount: 122,
        href: "/products/cable-support-systems/npi-80-support-system",
      },
      {
        slug: "u-z-l-w-profile-hanging-systems",
        label: "Профілі U / Z / L / W",
        catalogueName: "U-Z-L-W Profile and Bracket Hanging Systems",
        description:
          "Профільні та консольні підвісні елементи для настінного та стельового прокладання кабелів, включно з варіантом прегальванізації.",
        image: `${IMAGE_BASE}/npi-80-support-system/card/uzlw-profiles-brackets-card.png`,
        imageAlt: "Компоненти профілів та кронштейнів Gersan U-Z-L-W",
        orderCodeCount: 76,
        href: "/products/cable-support-systems/u-z-l-w-profile-hanging-systems",
      },
      {
        slug: "threaded-rod-tray-carriers",
        label: "Системи на різьбових шпильках та спеціальні підвіси",
        catalogueName: "Tray Carriers Used With Threaded Rods — Special Brackets",
        description:
          "Кабеленесучі елементи на різьбових шпильках та балкові фіксувальні вузли для стельового/конструктивного монтажу, а також спеціальні кронштейни, включно із сейсмостійким гаком.",
        image: `${IMAGE_BASE}/npi-80-support-system/card/tray-carriers-threaded-rod-hanging-systems-card.png`,
        imageAlt: "Кабеленесучий елемент Gersan на різьбовій шпильці, підвішений до стельового кріплення, з гаком",
        orderCodeCount: 55,
        href: "/products/cable-support-systems/threaded-rod-tray-carriers",
      },
      {
        slug: "c-profile-support-systems",
        label: "Опорні системи C-профіль",
        catalogueName: "C Profile — Support and Mounting Elements",
        description:
          "Одинарні та комбіновані C-профілі, консолі та фіксувальні елементи, включно із закладним (вбетонованим) конструктивним елементом.",
        image: `${IMAGE_BASE}/npi-80-support-system/card/c-profile-support-systems-card.png`,
        imageAlt: "Опорні компоненти Gersan C-профіль — профілі, консольний кронштейн та фіксувальний болт",
        orderCodeCount: 238,
        href: "/products/cable-support-systems/c-profile-support-systems",
      },
      {
        slug: "threaded-rods-anchors-fixings",
        label: "Різьбові шпильки, анкери та кріплення",
        catalogueName: "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector",
        description:
          "Різьбові шпильки, клинові анкери, комплекти болтів та пластикові захисні стрічки для фіксації та завершення опорного монтажу.",
        image: `${IMAGE_BASE}/npi-80-support-system/card/threaded-rods-anchors-fixings-card.png`,
        imageAlt: "Комплект кріплення Gersan: різьбова шпилька, клиновий анкер, шайби та шестигранні гайки",
        orderCodeCount: 95,
        href: "/products/cable-support-systems/threaded-rods-anchors-fixings",
      },
    ],
    chooseHeading: "Оберіть за типом монтажу",
    chooseIntroduction: "Зв'яжіться з нами, щоб підібрати оптимальну схему кріплення для вашого типу монтажу.",
    chooseOptions: [
      {
        label: "Стельовий підвіс",
        description: "Стельові фіксувальні пластини та кабеленесучі елементи на різьбових шпильках/балках.",
        href: REQUEST_HREF,
      },
      {
        label: "Настінна опора",
        description: "Настінні кронштейни та профільні консолі.",
        href: REQUEST_HREF,
      },
      {
        label: "Підлогова / конструктивна опора",
        description: "Закладні (вбетоновані) конструктивні елементи.",
        href: REQUEST_HREF,
      },
    ],
    compatibleHeading: "Сумісні системи",
    compatibleIntroduction:
      "Продукція для опор та підвісу формує конструктивний рівень монтажу для цих кабеленесучих систем.",
    compatibleSystems: [
      {
        label: "Кабельні лотки та короби",
        description: "Перфоровані, важкого типу та коробчасті системи, які несуть ці опорні профілі та кронштейни.",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        label: "Кабельні драбини",
        description: "Високопродуктивні драбинкові системи для відповідальних промислових кабельних монтажів.",
        href: "/products/cable-support-systems/cable-ladders",
      },
      {
        label: "Дротяні лоткові системи",
        description: "Легкі вентильовані дротяні лоткові системи для гнучкого прокладання кабелів.",
        href: "/products/cable-support-systems/wire-mesh-systems",
      },
    ],
    supportHeading: "Потрібна допомога з підбором опорної системи?",
    supportDescription:
      "Отримайте технічну підтримку з підбору профілю, кронштейнів, схем підвісу, кроку опор та індивідуальних конфігурацій проєкту.",
    supportAction: "Запросити технічну підтримку",
    supportHref: REQUEST_HREF,
  },
};

export function supportHangingSystemsContentForMarket(market: MarketCode): CableMacroFamilyContent {
  return SUPPORT_HANGING_SYSTEMS_CONTENT_BY_MARKET[market];
}

import { publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import type { CableManagementCatalogueSeries, CableManagementCategoryContent } from "./category-types";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF } from "./content";

const IMAGE_BASE = publicMediaUrl("products/cable-management");
const REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "cable-management-systems",
  source: "/products/cable-support-systems",
});

// Every row below corresponds 1:1 to a row in
// catalog-source/cable-support/catalog-map.md (the catalogue's own
// authoritative index — 36 rows total). Two rows are intentionally
// excluded because they are not product series: "Transport and Storage"
// (row 11, handling instructions) and "Certificates and References"
// (row 36, documentation) — see CATEGORY_CONTENT.resources for where those
// belong instead. All 34 remaining product series are mapped here; none
// are dropped, only grouped for navigation. `name` is the manufacturer's
// own catalogue series designation — kept in English in both markets, the
// same way a model code or standard reference isn't translated — and this
// array is only ever used to COUNT series per macro group (see
// cable-category-page.tsx), never rendered as visible text, so it isn't
// duplicated per market.
export const CABLE_MANAGEMENT_ALL_SERIES: readonly CableManagementCatalogueSeries[] = [
  // Support & Hanging Systems
  { name: "NPI-80 Support System", macroGroup: "support-hanging-systems" },
  { name: "U-Z-L-W Profile and Bracket Hanging Systems", macroGroup: "support-hanging-systems" },
  { name: "Tray Carriers Used With Threaded Rods — Special Brackets", macroGroup: "support-hanging-systems" },
  { name: "Vertical Tee Support", macroGroup: "support-hanging-systems" },
  { name: "C Profile — Support and Mounting Elements", macroGroup: "support-hanging-systems" },

  // Cable Trays & Trunking
  { name: "Normal Type Cable Trays", macroGroup: "cable-trays-trunking" },
  {
    name: "Heavy Duty Cable Trays — H = 40 mm",
    macroGroup: "cable-trays-trunking",
  },
  {
    name: "Heavy Duty Cable Trays — H = 50 mm",
    macroGroup: "cable-trays-trunking",
  },
  {
    name: "Heavy Duty Cable Trays — H = 60 mm",
    macroGroup: "cable-trays-trunking",
    href: "/products/cable-support-systems/heavy-duty-cable-trays?variant=h60",
  },
  {
    name: "Heavy Duty Cable Trays — H = 100 mm",
    macroGroup: "cable-trays-trunking",
  },
  { name: "Strengthened Cable Trays", macroGroup: "cable-trays-trunking" },
  { name: "Marine Type and Lighting Fixture Type Cable Trays", macroGroup: "cable-trays-trunking" },
  { name: "Cable Tray With Clamping Lid", macroGroup: "cable-trays-trunking" },
  { name: "Pregalvanized Trunking System", macroGroup: "cable-trays-trunking" },
  { name: "Aluminium Cable Trays", macroGroup: "cable-trays-trunking" },
  { name: "GKT-CE Heavy Duty Type Cable Trays", macroGroup: "cable-trays-trunking" },

  // Cable Ladders
  { name: "Cable Ladder With C-Profile Rung", macroGroup: "cable-ladders" },
  { name: "Heavy Duty Type Cable Ladders", macroGroup: "cable-ladders" },
  { name: "GCMC Concave-Convex Ladder and Covers", macroGroup: "cable-ladders" },
  { name: "GMIE Type Cable Ladders", macroGroup: "cable-ladders" },

  // Wire-Mesh Systems
  { name: "Wire-Mesh Cable Ladders", macroGroup: "wire-mesh-systems" },

  // Conduit & Pipe Systems
  { name: "Socket and Fuse Fixing Unit on the Tray — Pipe System", macroGroup: "conduit-pipe-systems" },
  { name: "Pipe Clamps — With Rubber Insulation, for Threaded Rods", macroGroup: "conduit-pipe-systems" },
  { name: "EMT / IMC / RSC Conduit Systems", macroGroup: "conduit-pipe-systems" },

  // Accessories & Fixings
  { name: "Granite Mounting Elements", macroGroup: "accessories-fixings" },
  { name: "Cable Drum Support Equipment", macroGroup: "accessories-fixings" },
  {
    name: "Screw Sets, Threaded Rods, Steel Anchors, Plastic Strip Protector",
    macroGroup: "accessories-fixings",
  },
  { name: "Aluminium Cable Cleats", macroGroup: "accessories-fixings" },
  { name: "Reducers", macroGroup: "accessories-fixings" },
  { name: "Cover for Cable Tray and Cover Clamps", macroGroup: "accessories-fixings" },
  { name: "Separator, End Cap, Level Changer, Direction Changer", macroGroup: "accessories-fixings" },
  { name: "Mechanical Dilatation Element", macroGroup: "accessories-fixings" },
  { name: "Cable Crochets (C Profile / Angle)", macroGroup: "accessories-fixings" },
  { name: "Shaft Access Cover", macroGroup: "accessories-fixings" },
];

// Same bilingual convention as src/data/products/earthing-lightning/content.ts
// and src/data/products/busbar/catalog-content.ts — one object keyed by
// MarketCode, a full parallel copy of the whole content tree per market,
// selected once via cableManagementCategoryContentForMarket(market).
const CABLE_MANAGEMENT_CATEGORY_CONTENT_BY_MARKET: Readonly<Record<MarketCode, CableManagementCategoryContent>> = {
  uk: {
    homeLabel: "Home",
    backHomeLabel: "Back to Home Page",
    technicalSnapshotLabel: "Cable Management Systems technical snapshot",
    seriesCountSuffix: "product series",
    comingSoonLabel: "Coming soon",
    eyebrow: "Product Category",
    title: "Cable Management Systems",
    metaTitle: "Cable Management Systems UK",
    description:
      "Engineered cable containment, cable support and management systems — trays, ladders, trunking, support profiles, conduit systems and fixing accessories — for safe, efficient and coordinated cable routing across industrial, commercial and infrastructure projects.",
    requestPackAction: "Request Technical Pack",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Download PDF Catalogue",
      meta: "PDF Catalogue",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
    },
    heroVideoLabel: "Gersan Cable Support Systems manufacturing and hot-dip galvanizing process",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Applicable Standards",
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: "Materials & Finishes",
        value: ["Hot-Dip Galvanized", "Pregalvanized", "Aluminium", "Stainless Steel"],
      },
      {
        icon: "system",
        label: "System Scope",
        value: ["Cable Trays", "Cable Ladders", "Support Systems", "Conduit Systems"],
      },
      {
        icon: "support",
        label: "Project Support",
        value: ["Load Selection", "Technical Data", "Custom Fabrication", "Installation Guidance"],
      },
    ],
    exploreHeading: "Explore Cable Management Systems",
    exploreIntroduction:
      "Browse complete cable-routing, support and containment systems organised by application and construction type.",
    macroGroups: [
      {
        slug: "support-hanging-systems",
        index: 1,
        title: "Support & Hanging Systems",
        description:
          "Profiles, brackets, consoles, threaded rods, ceiling supports and suspension elements for secure cable-system installation.",
        image: `${IMAGE_BASE}/npi-80-support-system/hero/support-hanging-systems-hero.png`,
        imageAlt: "Gersan ceiling-mounted support system with threaded rods, profile and cable tray installed together",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        slug: "cable-trays-trunking",
        index: 2,
        title: "Cable Tray Systems",
        description:
          "Perforated, strengthened, heavy-duty and trunking systems for power, control and data cable routing.",
        image: `${IMAGE_BASE}/cable-trays-trunking/hero/able-trays-trunking-hero.png`,
        imageAlt: "Gersan heavy duty cable tray with tee and bend accessories, product photograph",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        slug: "cable-ladders",
        index: 3,
        title: "Cable Ladder Systems",
        description:
          "High-capacity ladder systems and directional accessories for demanding industrial cable installations.",
        image: `${IMAGE_BASE}/cable-ladders/hero/cable-ladders-hero.png`,
        imageAlt: "Gersan galvanized cable ladder system with bend accessory, product photograph",
        href: "/products/cable-support-systems/cable-ladders",
      },
      {
        slug: "wire-mesh-systems",
        index: 4,
        title: "Wire-Mesh Cable Trays",
        description:
          "Lightweight ventilated wire-mesh containment systems for flexible cable routing and rapid installation.",
        image: `${IMAGE_BASE}/wire-mesh-cable-systems/hero/wire-mesh-systems-hero.png`,
        imageAlt: "Gersan wire-mesh cable tray system, product photograph",
        href: "/products/cable-support-systems/wire-mesh-systems",
      },
      {
        slug: "conduit-pipe-systems",
        index: 5,
        title: "Conduit & Pipe Systems",
        description:
          "Metallic and flexible conduit systems, fittings and clamps for mechanical cable protection and structured routing.",
        image: `${IMAGE_BASE}/conduit-pipe-systems/hero/conduit-pipe-systems-hero.png`,
        imageAlt: "Gersan galvanized steel conduit, flexible conduit and fitting, product photograph",
        href: "/products/cable-support-systems/conduit-pipe-systems",
      },
      {
        slug: "accessories-fixings",
        index: 6,
        title: "Accessories & Fixings",
        description:
          "Covers, reducers, separators, joints, clamps, anchors and installation accessories for complete system integration.",
        image: `${IMAGE_BASE}/accessories-fixings/hero/threaded-rods-anchors-fixings-card.png`,
        imageAlt: "Gersan threaded rod, wedge anchor, washers and hex nuts fixing set, product photograph",
        href: "/products/cable-support-systems/accessories-fixings",
      },
    ],
    decisionHelperHeading: "Which System Do You Need?",
    decisionHelperIntroduction:
      "Not sure where to start? Match your project requirement to the right cable management system.",
    // Every `href` is a real destination: the one built family-detail page
    // where it applies, otherwise the technical-pack request form. No
    // filtered-search links — there is no in-page browse/search surface
    // (Browse All Product Series) to land those on.
    decisionScenarios: [
      {
        scenario: "Heavy-duty power distribution",
        recommendation: "Heavy Duty Cable Trays — H = 60 mm",
        description:
          "High-load-capacity perforated and covered trays for demanding power distribution, 50–600 mm width.",
        ctaLabel: "View Heavy Duty Trays",
        href: "/products/cable-support-systems/heavy-duty-cable-trays?variant=h60",
      },
      {
        scenario: "Standard power & control routing",
        recommendation: "Normal Type Cable Trays",
        description:
          "Standard-duty perforated trays for general power and control cable routing in commercial and light industrial installations.",
        ctaLabel: "View Normal Type Trays",
        href: "/products/cable-support-systems/normal-type-cable-trays",
      },
      {
        scenario: "Corrosive, washdown or marine environments",
        recommendation: "Marine Type & Aluminium Cable Trays",
        description:
          "Marine-rated and lightweight aluminium trays engineered for corrosion resistance in coastal, marine and washdown environments.",
        ctaLabel: "View Marine Type Trays",
        href: "/products/cable-support-systems/marine-lighting-fixture-cable-trays?variant=marine",
      },
      {
        scenario: "High cable volume, long support spans",
        recommendation: "Cable Ladders",
        description:
          "High-capacity ladder systems for demanding industrial installations with heavy cable loading and longer support spans.",
        ctaLabel: "View Cable Ladders",
        href: "/products/cable-support-systems/cable-ladders",
      },
      {
        scenario: "Fast, tool-light installation",
        recommendation: "Wire-Mesh Systems",
        description:
          "Ventilated, lightweight wire-mesh containment for flexible cable routing and rapid on-site installation.",
        ctaLabel: "View Wire-Mesh Systems",
        href: "/products/cable-support-systems/wire-mesh-systems",
      },
      {
        scenario: "Custom or non-standard dimensions",
        recommendation: "Custom Fabrication Support",
        description:
          "Project-specific dimensions, brackets and fabricated elements engineered to your exact requirements.",
        ctaLabel: "Request Custom Fabrication",
        href: REQUEST_HREF,
      },
    ],
    applicationsHeading: "Where Cable Management Systems Are Used",
    applicationsIntroduction:
      "See how Gersan cable trays, ladders and support systems are specified across major sectors — explore the full application map for typical products, zones and quantities.",
    // 8 sectors — one card per set of industry imagery in
    // public/assets/industries/cards/. `href` is only set for sectors with
    // a real, built Application Map route (see
    // src/app/(public)/application-map/**); the rest render as non-link
    // "coming soon" cards rather than a link to a page that doesn't exist.
    applications: [
      {
        slug: "data-centres",
        title: "Data Centres",
        description:
          "Structured cable routing for server halls, electrical rooms and mechanical plant — coordinated with power and cooling infrastructure.",
        image: publicMediaUrl("industries/cards/data-centres.webp"),
        imageAlt: "Data centre server hall with structured cable routing",
        href: "/application-map",
        viewLabel: "View Map",
      },
      {
        slug: "healthcare",
        title: "Healthcare",
        description:
          "Reliable containment for critical power, life-safety and medical equipment circuits across clinical and back-of-house areas.",
        image: publicMediaUrl("industries/cards/healthcare.webp"),
        imageAlt: "Healthcare facility electrical and medical equipment room",
        href: "/application-map/healthcare",
        viewLabel: "View Map",
      },
      {
        slug: "education-public-sector",
        title: "Education & Public Sector",
        description:
          "Coordinated cable routing for classrooms, laboratories, sports halls and campus-wide infrastructure.",
        image: publicMediaUrl("industries/cards/education-public-sector.webp"),
        imageAlt: "Education campus building with coordinated cable infrastructure",
        href: "/application-map/education-public-sector",
        viewLabel: "View Map",
      },
      {
        slug: "industrial-facilities",
        title: "Industrial Facilities",
        description:
          "Heavy-duty trays and ladders for production lines, process areas and control rooms in demanding industrial environments.",
        image: publicMediaUrl("industries/cards/industrial-facilities.webp"),
        imageAlt: "Industrial facility production line with overhead cable containment",
        href: "/application-map/industrial-facility",
        viewLabel: "View Map",
      },
      {
        slug: "commercial-buildings",
        title: "Commercial Buildings",
        description:
          "Concealed and exposed cable routing for office floors, risers and plant rooms in commercial developments.",
        image: publicMediaUrl("industries/cards/commercial-buildings.webp"),
        imageAlt: "Commercial office building with coordinated cable infrastructure",
        href: "/application-map/commercial-building",
        viewLabel: "View Map",
      },
      {
        slug: "infrastructure-utilities",
        title: "Infrastructure & Utilities",
        description:
          "Cable containment for substations, pumping stations and utility plant in demanding outdoor environments.",
        image: publicMediaUrl("industries/cards/infrastructure-utilities.webp"),
        imageAlt: "Utility substation with outdoor cable infrastructure",
        href: "/application-map/infrastructure-utilities",
        viewLabel: "View Map",
      },
      {
        slug: "renewable-energy",
        title: "Renewable Energy",
        description:
          "Cable routing for solar, wind and battery storage installations, from grid connection to plant control.",
        image: publicMediaUrl("industries/cards/renewable-energy.webp"),
        imageAlt: "Renewable energy site with grid-connection cable infrastructure",
        href: "/application-map/renewable-energy",
        viewLabel: "View Map",
      },
      {
        slug: "transport-infrastructure",
        title: "Transport Infrastructure",
        description:
          "Cable management for airports, rail stations and transport hubs handling high service volumes.",
        image: publicMediaUrl("industries/cards/transport-infrastructure.webp"),
        imageAlt: "Transport hub with coordinated cable infrastructure",
        href: "/application-map/transport-infrastructure",
        viewLabel: "View Map",
      },
    ],
    allSeries: CABLE_MANAGEMENT_ALL_SERIES,
    provideHeading: "What We Provide",
    provideIntroduction:
      "Practical engineering support for every stage of your cable-management project — from initial selection through to installation.",
    // All cards render the same plain (non-link) way — the catalogue is
    // still downloadable from the hero and final CTA buttons, so this grid
    // stays a consistent "what we offer" summary rather than mixing one
    // clickable card into an otherwise static row.
    provide: [
      {
        label: "Technical Catalogue",
        description: "Complete Gersan Cable Support Systems catalogue — every series in this category.",
      },
      {
        label: "System Selection Support",
        description: "Guidance matching tray, ladder, trunking or support type to your project requirements.",
      },
      {
        label: "Load & Span Guidance",
        description: "Support spacing and load-capacity advice for your installation.",
      },
      {
        label: "Custom Fabrication",
        description: "Project-specific dimensions and fabricated elements engineered to your requirements.",
      },
      {
        label: "Installation Guidance",
        description: "Mounting and assembly support from our engineering team.",
      },
      {
        label: "Certificates & Compliance",
        description: "Standards documentation for BS EN 61537 / IEC 61537 on request.",
      },
    ],
    supportHeading: "Engineering support for complete cable-management projects",
    supportDescription:
      "Get support with system selection, loading requirements, support spacing, materials, finishes and project-specific configurations.",
    supportAction: "Request Technical Support",
    supportHref: REQUEST_HREF,
  },
  ua: {
    homeLabel: "Головна",
    backHomeLabel: "На головну сторінку",
    technicalSnapshotLabel: "Технічний огляд кабеленесучих систем",
    seriesCountSuffix: "серій продукції",
    comingSoonLabel: "Незабаром",
    eyebrow: "Категорія продукції",
    title: "Кабеленесучі системи",
    description:
      "Кабеленесучі системи та системи прокладання кабелю — кабельні лотки, драбини, короби, опорні профілі, трубні системи та кріпильні аксесуари — для безпечного, ефективного та скоординованого прокладання кабелів на промислових, комерційних та інфраструктурних об'єктах.",
    requestPackAction: "Запросити технічний пакет",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Завантажити PDF-каталог",
      meta: "PDF-каталог",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Завантажити PDF-каталог систем кабельної підтримки Gersan",
    },
    heroVideoLabel: "Виробництво систем кабельної підтримки Gersan та процес гарячого цинкування",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Застосовні стандарти",
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: "Матеріали та покриття",
        value: ["Гаряче цинкування", "Прегальванізація", "Алюміній", "Нержавіюча сталь"],
      },
      {
        icon: "system",
        label: "Обсяг системи",
        value: ["Кабельні лотки", "Кабельні драбини", "Опорні системи", "Трубні системи"],
      },
      {
        icon: "support",
        label: "Підтримка проєкту",
        value: ["Підбір навантаження", "Технічні дані", "Виготовлення на замовлення", "Настанови з монтажу"],
      },
    ],
    exploreHeading: "Огляд кабеленесучих систем",
    exploreIntroduction:
      "Перегляньте повний асортимент систем прокладання, опори та захисту кабелів, згрупованих за застосуванням і типом конструкції.",
    macroGroups: [
      {
        slug: "support-hanging-systems",
        index: 1,
        title: "Системи опор та підвісу",
        description:
          "Профілі, кронштейни, консолі, різьбові шпильки, стельові опори та підвісні елементи для надійного монтажу кабельних систем.",
        image: `${IMAGE_BASE}/npi-80-support-system/hero/support-hanging-systems-hero.png`,
        imageAlt: "Стельова опорна система Gersan із різьбовими шпильками, профілем та кабельним лотком у зборі",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        slug: "cable-trays-trunking",
        index: 2,
        title: "Кабельні лотки",
        description:
          "Перфоровані, посилені, важкого типу та коробчасті системи для прокладання силових, контрольних та інформаційних кабелів.",
        image: `${IMAGE_BASE}/cable-trays-trunking/hero/able-trays-trunking-hero.png`,
        imageAlt: "Кабельний лоток Gersan важкого типу з трійником та поворотним елементом, фото продукту",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        slug: "cable-ladders",
        index: 3,
        title: "Кабельні драбини",
        description:
          "Високопродуктивні драбинкові системи та напрямні аксесуари для відповідальних промислових кабельних монтажів.",
        image: `${IMAGE_BASE}/cable-ladders/hero/cable-ladders-hero.png`,
        imageAlt: "Оцинкована кабельна драбина Gersan з поворотним елементом, фото продукту",
        href: "/products/cable-support-systems/cable-ladders",
      },
      {
        slug: "wire-mesh-systems",
        index: 4,
        title: "Дротяні кабельні лотки",
        description:
          "Легкі вентильовані дротяні лоткові системи для гнучкого прокладання кабелів і швидкого монтажу.",
        image: `${IMAGE_BASE}/wire-mesh-cable-systems/hero/wire-mesh-systems-hero.png`,
        imageAlt: "Дротяний кабельний лоток Gersan, фото продукту",
        href: "/products/cable-support-systems/wire-mesh-systems",
      },
      {
        slug: "conduit-pipe-systems",
        index: 5,
        title: "Трубні та кабелепровідні системи",
        description:
          "Металеві та гнучкі кабелепроводи, фітинги та затискачі для механічного захисту кабелів та впорядкованого прокладання.",
        image: `${IMAGE_BASE}/conduit-pipe-systems/hero/conduit-pipe-systems-hero.png`,
        imageAlt: "Оцинкований сталевий кабелепровід Gersan, гнучкий кабелепровід та фітинг, фото продукту",
        href: "/products/cable-support-systems/conduit-pipe-systems",
      },
      {
        slug: "accessories-fixings",
        index: 6,
        title: "Аксесуари та кріплення",
        description:
          "Кришки, редукції, роздільники, з'єднувачі, затискачі, анкери та монтажні аксесуари для повної інтеграції системи.",
        image: `${IMAGE_BASE}/accessories-fixings/hero/threaded-rods-anchors-fixings-card.png`,
        imageAlt: "Комплект кріплення Gersan: різьбова шпилька, клиновий анкер, шайби та шестигранні гайки, фото продукту",
        href: "/products/cable-support-systems/accessories-fixings",
      },
    ],
    decisionHelperHeading: "Яка система вам потрібна?",
    decisionHelperIntroduction:
      "Не знаєте, з чого почати? Підберіть потрібну кабеленесучу систему відповідно до вимог вашого проєкту.",
    decisionScenarios: [
      {
        scenario: "Розподіл потужної електроенергії",
        recommendation: "Кабельні лотки важкого типу — H = 60 мм",
        description:
          "Перфоровані та закриті лотки високої несучої здатності для відповідального розподілу електроенергії, ширина 50–600 мм.",
        ctaLabel: "Переглянути лотки важкого типу",
        href: "/products/cable-support-systems/heavy-duty-cable-trays?variant=h60",
      },
      {
        scenario: "Стандартне прокладання силових та контрольних кіл",
        recommendation: "Кабельні лотки стандартного типу",
        description:
          "Перфоровані лотки стандартного типу для загального прокладання силових і контрольних кабелів на комерційних та легких промислових об'єктах.",
        ctaLabel: "Переглянути лотки стандартного типу",
        href: "/products/cable-support-systems/normal-type-cable-trays",
      },
      {
        scenario: "Агресивні, вологі або морські середовища",
        recommendation: "Лотки морського типу та алюмінієві лотки",
        description:
          "Лотки морського класу та легкі алюмінієві лотки, розроблені для стійкості до корозії в прибережних, морських і вологих середовищах.",
        ctaLabel: "Переглянути лотки морського типу",
        href: "/products/cable-support-systems/marine-lighting-fixture-cable-trays?variant=marine",
      },
      {
        scenario: "Великий обсяг кабелів, довгі прогони опор",
        recommendation: "Кабельні драбини",
        description:
          "Високопродуктивні драбинкові системи для відповідальних промислових монтажів зі значним кабельним навантаженням і довшими прогонами опор.",
        ctaLabel: "Переглянути кабельні драбини",
        href: "/products/cable-support-systems/cable-ladders",
      },
      {
        scenario: "Швидкий монтаж без спеціального інструменту",
        recommendation: "Дротяні лоткові системи",
        description:
          "Вентильовані, легкі дротяні лоткові системи для гнучкого прокладання кабелів і швидкого монтажу на об'єкті.",
        ctaLabel: "Переглянути дротяні лоткові системи",
        href: "/products/cable-support-systems/wire-mesh-systems",
      },
      {
        scenario: "Нестандартні або індивідуальні розміри",
        recommendation: "Виготовлення на замовлення",
        description:
          "Індивідуальні розміри, кронштейни та виготовлені елементи, розроблені під ваші точні вимоги.",
        ctaLabel: "Запросити виготовлення на замовлення",
        href: REQUEST_HREF,
      },
    ],
    applicationsHeading: "Де застосовуються кабеленесучі системи",
    applicationsIntroduction:
      "Дізнайтеся, як кабельні лотки, драбини та опорні системи Gersan застосовуються в основних галузях — перегляньте повну карту застосувань з типовими продуктами, зонами та кількостями.",
    applications: [
      {
        slug: "data-centres",
        title: "Дата-центри",
        description:
          "Структуроване прокладання кабелів для серверних залів, електрощитових і механічних приміщень — узгоджене з інфраструктурою живлення та охолодження.",
        image: publicMediaUrl("industries/cards/data-centres.webp"),
        imageAlt: "Серверний зал дата-центру зі структурованим прокладанням кабелів",
        href: "/application-map",
        viewLabel: "Переглянути карту",
      },
      {
        slug: "healthcare",
        title: "Охорона здоров'я",
        description:
          "Надійний захист відповідальних силових, аварійних та медичних електричних кіл у клінічних та допоміжних зонах.",
        image: publicMediaUrl("industries/cards/healthcare.webp"),
        imageAlt: "Електрощитова та приміщення медичного обладнання закладу охорони здоров'я",
        href: "/application-map/healthcare",
        viewLabel: "Переглянути карту",
      },
      {
        slug: "education-public-sector",
        title: "Освіта та державний сектор",
        description:
          "Скоординоване прокладання кабелів для аудиторій, лабораторій, спортивних залів та інфраструктури кампусів.",
        image: publicMediaUrl("industries/cards/education-public-sector.webp"),
        imageAlt: "Будівля навчального кампусу зі скоординованою кабельною інфраструктурою",
        href: "/application-map/education-public-sector",
        viewLabel: "Переглянути карту",
      },
      {
        slug: "industrial-facilities",
        title: "Промислові об'єкти",
        description:
          "Лотки та драбини важкого типу для виробничих ліній, технологічних зон і диспетчерських приміщень у складних промислових умовах.",
        image: publicMediaUrl("industries/cards/industrial-facilities.webp"),
        imageAlt: "Виробнича лінія промислового об'єкта з надземним кабельним захистом",
        href: "/application-map/industrial-facility",
        viewLabel: "Переглянути карту",
      },
      {
        slug: "commercial-buildings",
        title: "Комерційні будівлі",
        description:
          "Приховане та відкрите прокладання кабелів для офісних поверхів, стояків та технічних приміщень комерційних об'єктів.",
        image: publicMediaUrl("industries/cards/commercial-buildings.webp"),
        imageAlt: "Комерційна офісна будівля зі скоординованою кабельною інфраструктурою",
        href: "/application-map/commercial-building",
        viewLabel: "Переглянути карту",
      },
      {
        slug: "infrastructure-utilities",
        title: "Інфраструктура та комунальні підприємства",
        description:
          "Захист кабелів для підстанцій, насосних станцій та комунальних об'єктів у складних зовнішніх умовах.",
        image: publicMediaUrl("industries/cards/infrastructure-utilities.webp"),
        imageAlt: "Підстанція комунального підприємства із зовнішньою кабельною інфраструктурою",
        href: "/application-map/infrastructure-utilities",
        viewLabel: "Переглянути карту",
      },
      {
        slug: "renewable-energy",
        title: "Відновлювана енергетика",
        description:
          "Прокладання кабелів для сонячних, вітрових та накопичувальних установок — від приєднання до мережі до керування станцією.",
        image: publicMediaUrl("industries/cards/renewable-energy.webp"),
        imageAlt: "Об'єкт відновлюваної енергетики з кабельною інфраструктурою приєднання до мережі",
        href: "/application-map/renewable-energy",
        viewLabel: "Переглянути карту",
      },
      {
        slug: "transport-infrastructure",
        title: "Транспортна інфраструктура",
        description:
          "Кабельні системи для аеропортів, залізничних станцій та транспортних вузлів зі значними обсягами обслуговування.",
        image: publicMediaUrl("industries/cards/transport-infrastructure.webp"),
        imageAlt: "Транспортний вузол зі скоординованою кабельною інфраструктурою",
        href: "/application-map/transport-infrastructure",
        viewLabel: "Переглянути карту",
      },
    ],
    allSeries: CABLE_MANAGEMENT_ALL_SERIES,
    provideHeading: "Що ми пропонуємо",
    provideIntroduction:
      "Практична інженерна підтримка на кожному етапі вашого проєкту кабельних систем — від первинного підбору до монтажу.",
    provide: [
      {
        label: "Технічний каталог",
        description: "Повний каталог систем кабельної підтримки Gersan — усі серії цієї категорії.",
      },
      {
        label: "Підтримка з підбору системи",
        description: "Консультація з підбору типу лотка, драбини, короба чи опори під вимоги вашого проєкту.",
      },
      {
        label: "Розрахунок навантаження та прогонів",
        description: "Рекомендації з кроку опор і несучої здатності для вашого монтажу.",
      },
      {
        label: "Виготовлення на замовлення",
        description: "Індивідуальні розміри та виготовлені елементи, розроблені під ваші вимоги.",
      },
      {
        label: "Настанови з монтажу",
        description: "Підтримка з монтажу та збирання від нашої інженерної команди.",
      },
      {
        label: "Сертифікати та відповідність",
        description: "Документація відповідності стандартам BS EN 61537 / IEC 61537 на запит.",
      },
    ],
    supportHeading: "Інженерна підтримка для комплексних проєктів кабельних систем",
    supportDescription:
      "Отримайте підтримку з підбору системи, вимог до навантаження, кроку опор, матеріалів, покриттів та індивідуальних конфігурацій проєкту.",
    supportAction: "Запросити технічну підтримку",
    supportHref: REQUEST_HREF,
  },
};

export function cableManagementCategoryContentForMarket(market: MarketCode): CableManagementCategoryContent {
  return CABLE_MANAGEMENT_CATEGORY_CONTENT_BY_MARKET[market];
}

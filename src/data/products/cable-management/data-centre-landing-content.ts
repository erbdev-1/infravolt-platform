import type { MarketCode } from "@/modules/markets/types";
import { buildEnquiryHref } from "@/modules/enquiry/routing";

// Data Centre Cable Management — Phase 2 commercial/SEO landing page. This
// is an application/commercial landing page ("data centre" is a use case),
// not a new Gersan product family, so it deliberately lives in its own
// content file rather than the individual family content files it links
// to (cable-trays-trunking-content.ts, cable-ladders-content.ts,
// wire-mesh-content.ts, support-hanging-content.ts) or
// category-content.ts (the Cable Management hub).
//
// Every fact below is transcribed from existing, already-shipped
// repository sources:
// - data/products/cable-management/category-content.ts (category
//   description, standards snapshot, the "Data Centres" application card
//   description: "Structured cable routing for server halls, electrical
//   rooms and mechanical plant — coordinated with power and cooling
//   infrastructure.")
// - data/products/cable-management/wire-mesh-content.ts,
//   cable-ladders-content.ts, cable-trays-trunking-content.ts,
//   support-hanging-content.ts (per-family titles, descriptions and
//   technical snapshots)
// - modules/application-map/data-centre.ts (the Data Centre Application
//   Map's own zone hotspot text — wire-mesh cable tray explicitly shown
//   above the server hall's rack rows, cable ladder explicitly shown on
//   the electrical riser, cable management generally routing power/control
//   cabling through the main electrical room, generator hall and cooling
//   plant/pump room)
//
// No Tier/Uptime Institute claims, no fire-survival/arc-fault/seismic
// ratings, no unverified load/span figures, and no InfraVolt
// manufacturing/certification claims are made anywhere in this file.

const SOURCE_ROUTE = "/products/cable-support-systems/data-centre-cable-management";
const REQUEST_QUOTE_HREF = buildEnquiryHref("quote", {
  system: "cable-management",
  family: "data-centre-cable-management",
  source: SOURCE_ROUTE,
});
const REQUEST_DOCUMENTATION_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "data-centre-cable-management",
  source: SOURCE_ROUTE,
});

export type DataCentreCableManagementSystemRow = Readonly<{
  system: string;
  role: string;
  constructionNote: string;
  href: string;
}>;

export type DataCentreCableManagementFaqItem = Readonly<{
  question: string;
  answer: string;
}>;

export type DataCentreCableManagementLandingContent = Readonly<{
  metadata: Readonly<{ title: string; description: string }>;
  breadcrumbs: Readonly<{
    home: string;
    products: string;
    cableManagement: string;
    current: string;
  }>;
  entityStatement: string;
  hero: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    primaryActionHref: string;
    secondaryAction: string;
    secondaryActionHref: string;
    tertiaryAction: string;
    tertiaryActionHref: string;
  }>;
  directAnswer: Readonly<{
    heading: string;
    answer: string;
  }>;
  useCasesHeading: string;
  useCases: readonly Readonly<{ title: string; description: string }>[];
  comparison: Readonly<{
    heading: string;
    introduction: string;
    columnLabels: Readonly<{
      system: string;
      role: string;
      constructionNote: string;
      action: string;
    }>;
    rows: readonly DataCentreCableManagementSystemRow[];
  }>;
  checklistHeading: string;
  checklist: readonly string[];
  standardsNote: Readonly<{
    heading: string;
    note: string;
    actionLabel: string;
    actionHref: string;
  }>;
  faqHeading: string;
  faq: readonly DataCentreCableManagementFaqItem[];
  applicationMap: Readonly<{
    heading: string;
    description: string;
    linkLabel: string;
  }>;
  relatedSystems: Readonly<{
    heading: string;
    description: string;
    linkLabel: string;
    linkHref: string;
  }>;
  projectCta: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    action: string;
    actionHref: string;
    secondaryAction: string;
    secondaryActionHref: string;
  }>;
}>;

const content = {
  uk: {
    metadata: {
      title: "Data Centre Cable Management Systems UK | InfraVolt",
      description:
        "Gersan cable management and containment systems for UK data centres, including wire-mesh cable trays, cable ladders, cable tray systems and support/hanging systems, with technical project support from InfraVolt.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      cableManagement: "Cable Management Systems",
      current: "Data Centre Cable Management",
    },
    entityStatement:
      "Gersan manufactures the cable management systems shown on this page. InfraVolt supports UK and Ukraine projects with system selection, technical-commercial coordination and enquiries.",
    hero: {
      eyebrow: "DATA CENTRE CABLE CONTAINMENT",
      title: "Data Centre Cable Management Systems",
      description:
        "Wire-mesh cable trays, cable ladders, cable tray systems and support/hanging systems route power, control and data cabling through data hall, riser, electrical room and plant spaces — coordinated with the power and cooling infrastructure around them. InfraVolt provides technical-commercial project support for UK data centre projects.",
      primaryAction: "Request Quote",
      primaryActionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Compare Systems",
      secondaryActionHref: "#system-comparison",
      tertiaryAction: "Explore the Data Centre Application Map",
      tertiaryActionHref: "/application-map",
    },
    directAnswer: {
      heading: "What cable management systems are relevant to data centre projects?",
      answer:
        "Wire-Mesh Cable Trays provide flexible, open overhead structured-cabling routes above server rack rows. Cable Ladder Systems carry high-capacity routes, including electrical riser routing between floors. Cable Tray Systems route power, control and data cabling through electrical rooms, plant spaces and general service routes. Support & Hanging Systems — profiles, brackets, consoles and threaded rods — carry all of the above on walls, ceilings, floors or structural steelwork. No single system replaces the others; the right choice depends on the route and load.",
    },
    useCasesHeading: "Data Centre Cable Routing Use Cases",
    useCases: [
      {
        title: "Data Hall — overhead structured cabling",
        description:
          "Wire-Mesh Cable Trays route structured cabling above the server rack rows in an open, ventilated construction, matching the Data Centre Application Map's own data hall reference.",
      },
      {
        title: "Electrical Riser — floor-to-floor cable routing",
        description:
          "Cable Ladder Systems route power and data cabling alongside the busbar riser between floors, carrying high-capacity runs through the vertical electrical riser.",
      },
      {
        title: "Main Electrical / UPS Room",
        description:
          "Cable Management routes carry power and control cabling overhead between switchgear, UPS equipment and adjoining rooms — the specific tray, ladder or wire-mesh construction is selected per project.",
      },
      {
        title: "Generator Hall and Cooling Plant routes",
        description:
          "Overhead cable-management routes connect generators, switchgear, chillers and pumps to distribution panels. Route, cable load, support arrangement and material/finish are selected per project — no environmental rating is assumed.",
      },
      {
        title: "Structural support layer",
        description:
          "Support & Hanging Systems — profiles, brackets, consoles, threaded rods and suspension components — carry tray, ladder and wire-mesh routes from walls, ceilings, floors or structural steelwork.",
      },
    ],
    comparison: {
      heading: "System Comparison",
      introduction:
        "Four Gersan cable management systems are relevant to data centre cable routing, each suited to a different role. None is a universal replacement for the others.",
      columnLabels: {
        system: "System",
        role: "Data-centre role",
        constructionNote: "Construction / selection note",
        action: "Product page",
      },
      rows: [
        {
          system: "Wire-Mesh Cable Trays",
          role: "Flexible overhead structured cabling — strongest evidence for data hall routes above rack rows",
          constructionNote: "Open, ventilated, lightweight construction; multiple tray heights with matching jointing and support accessories",
          href: "/products/cable-support-systems/wire-mesh-systems",
        },
        {
          system: "Cable Ladder Systems",
          role: "High-capacity routes, including electrical riser routing between floors",
          constructionNote: "C-Profile Rung, Heavy Duty, GCMC and GMIE Type scope, with directional accessories",
          href: "/products/cable-support-systems/cable-ladders",
        },
        {
          system: "Cable Tray Systems",
          role: "Power, control and data cable routing through electrical rooms, plant spaces and general service routes",
          constructionNote: "Perforated, strengthened, heavy-duty and trunking variants, selected per project",
          href: "/products/cable-support-systems/cable-trays-trunking",
        },
        {
          system: "Support & Hanging Systems",
          role: "Structural support layer that carries tray, ladder and wire-mesh containment",
          constructionNote: "Profiles, brackets, consoles and threaded rods for wall, ceiling, floor and multi-level mounting",
          href: "/products/cable-support-systems/support-hanging-systems",
        },
      ],
    },
    checklistHeading: "Project Selection Checklist",
    checklist: [
      "Route location: data hall, electrical riser, electrical room or plant area",
      "Cable type: power, control or data",
      "Required cable capacity and project load data",
      "Tray, ladder or wire-mesh construction",
      "Support arrangement and support spacing",
      "Wall, ceiling, floor or structural mounting",
      "Material and finish",
      "Route access and maintenance requirements",
      "Technical drawings and installation guidance required",
    ],
    standardsNote: {
      heading: "Technical Standards & Documentation",
      note:
        "The current Gersan Cable Management category documentation lists BS EN 61537 and IEC 61537 as applicable standards. Product-family applicability, load data, material/finish and installation details should be confirmed against the relevant technical documentation for the project.",
      actionLabel: "Request Technical Pack",
      actionHref: REQUEST_DOCUMENTATION_HREF,
    },
    faqHeading: "Common Questions",
    faq: [
      {
        question: "What cable management systems are relevant to data centre projects?",
        answer:
          "Wire-Mesh Cable Trays for data hall overhead routing, Cable Ladder Systems for high-capacity and riser routes, Cable Tray Systems for electrical room and plant routing, and Support & Hanging Systems to carry all of them.",
      },
      {
        question: "When is wire-mesh cable tray used in a data centre?",
        answer:
          "Wire-mesh cable tray is used for flexible, open, ventilated overhead structured-cabling routes — most commonly above server rack rows in the data hall.",
      },
      {
        question: "Where are cable ladders relevant in a data centre?",
        answer:
          "Cable ladders are relevant for high-capacity routes, including the electrical riser, where they route power and data cabling between floors.",
      },
      {
        question: "What supports cable trays and cable ladders?",
        answer:
          "Support & Hanging Systems — profiles, brackets, consoles and threaded rods — carry cable tray, cable ladder and wire-mesh routes from walls, ceilings, floors or structural steelwork.",
      },
      {
        question: "Which standards are listed for Gersan cable management systems?",
        answer:
          "The current Gersan Cable Management category documentation lists BS EN 61537 and IEC 61537 as applicable standards. Confirm applicability against the relevant technical documentation for your project.",
      },
      {
        question: "Does InfraVolt manufacture Gersan cable management systems?",
        answer:
          "No. Gersan is the manufacturer. InfraVolt is the distributor and market representative, and the technical-commercial project contact for UK and Ukraine.",
      },
      {
        question: "How can I request technical data or a project quotation?",
        answer:
          "Use the Request Quote or Request Technical Pack links on this page to send your requirement to InfraVolt's technical team.",
      },
    ],
    applicationMap: {
      heading: "See These Systems in Context",
      description:
        "The Data Centre Application Map is an interactive visual showing where Cable Management and InfraVolt's other product families may be used across a data centre — from the main electrical room and data hall to the electrical riser and cooling plant.",
      linkLabel: "Explore the Data Centre Application Map",
    },
    relatedSystems: {
      heading: "Related Data Centre System",
      description:
        "Power distribution busbar systems are a separate InfraVolt product family, also used across the same data centre zones as the cable management routes on this page.",
      linkLabel: "View Data Centre Busbar Systems",
      linkHref: "/products/busbar/data-centre-busbar",
    },
    projectCta: {
      eyebrow: "PROJECT SUPPORT",
      title: "Planning Cable Containment for a Data Centre Project?",
      description:
        "Share your current route, cable load and project stage with our technical team.",
      action: "Request Quote",
      actionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Request Technical Pack",
      secondaryActionHref: REQUEST_DOCUMENTATION_HREF,
    },
  },
  ua: {
    metadata: {
      title: "Кабеленесучі системи для центрів обробки даних (ЦОД) | InfraVolt",
      description:
        "Кабеленесучі системи Gersan для центрів обробки даних (ЦОД): дротяні та металеві кабельні лотки, кабельні драбини, опорні й підвісні системи з технічною підтримкою InfraVolt.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      cableManagement: "Кабеленесучі системи",
      current: "Кабеленесучі системи для ЦОД",
    },
    entityStatement:
      "Gersan виробляє кабеленесучі системи, представлені на цій сторінці. InfraVolt супроводжує проєкти у Великій Британії та Україні: підбір систем, технічно-комерційна координація та обробка запитів.",
    hero: {
      eyebrow: "КАБЕЛЬНІ СИСТЕМИ ДЛЯ ЦОД",
      title: "Кабеленесучі системи для центрів обробки даних",
      description:
        "Дротяні кабельні лотки, кабельні драбини, кабельні лотки та опорно-підвісні системи прокладають силові, керуючі та інформаційні кабелі через серверну залу, стояки, електрощитові та технічні приміщення — узгоджено з інфраструктурою живлення та охолодження. InfraVolt забезпечує технічно-комерційну підтримку проєктів у Великій Британії та Україні.",
      primaryAction: "Запросити комерційну пропозицію",
      primaryActionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Порівняти системи",
      secondaryActionHref: "#system-comparison",
      tertiaryAction: "Переглянути карту застосувань ЦОД",
      tertiaryActionHref: "/application-map",
    },
    directAnswer: {
      heading: "Які кабеленесучі системи підходять для проєктів центрів обробки даних?",
      answer:
        "Дротяні (сітчасті) кабельні лотки забезпечують гнучкі відкриті надземні траси структурованого кабелю над рядами серверних стійок. Кабельні драбини несуть високопотужні траси, зокрема прокладання кабелів між поверхами через електротехнічний стояк. Кабельні лотки прокладають силові, керуючі та інформаційні кабелі через електрощитові, технічні приміщення та загальні маршрути. Опорні та підвісні системи — профілі, кронштейни, консолі та різьбові шпильки — несуть усі перелічені вище системи. Жодна система не замінює інші повністю — вибір залежить від траси та навантаження.",
    },
    useCasesHeading: "Типові застосування прокладання кабелів у ЦОД",
    useCases: [
      {
        title: "Серверна зала — надземне структуроване прокладання",
        description:
          "Дротяні кабельні лотки прокладають структурований кабель над рядами серверних стійок у відкритій, вентильованій конструкції — відповідно до власного опису серверної зали на карті застосувань ЦОД.",
      },
      {
        title: "Електротехнічний стояк — прокладання між поверхами",
        description:
          "Кабельні драбини прокладають силові та інформаційні кабелі поруч із шинопровідним стояком між поверхами, несучи високопотужні траси через вертикальний електротехнічний стояк.",
      },
      {
        title: "Головне електротехнічне приміщення / приміщення ДБЖ",
        description:
          "Кабеленесучі траси прокладають силові та керуючі кабелі над обладнанням між розподільними пристроями, ДБЖ та суміжними приміщеннями — конкретна конструкція лотка, драбини чи дротяного лотка обирається за проєктом.",
      },
      {
        title: "Траси зали генераторів і холодильного центру",
        description:
          "Надземні кабеленесучі траси з'єднують генератори, розподільні пристрої, чилери та насоси з розподільними щитами. Траса, навантаження кабелю, спосіб опори та матеріал/покриття обираються за проєктом — жоден клас захисту середовища тут не передбачається.",
      },
      {
        title: "Опорний конструктивний шар",
        description:
          "Опорні та підвісні системи — профілі, кронштейни, консолі, різьбові шпильки та підвісні компоненти — несуть траси кабельних лотків, драбин і дротяних лотків від стін, стель, підлоги чи будівельних конструкцій.",
      },
    ],
    comparison: {
      heading: "Порівняння систем",
      introduction:
        "Чотири кабеленесучі системи Gersan застосовні до прокладання кабелів у ЦОД, кожна — для своєї ролі. Жодна з них не є універсальною заміною інших.",
      columnLabels: {
        system: "Система",
        role: "Роль у ЦОД",
        constructionNote: "Конструкція / критерій вибору",
        action: "Сторінка продукту",
      },
      rows: [
        {
          system: "Дротяні кабельні лотки",
          role: "Гнучке надземне структуроване прокладання — найсильніша доказова база для трас серверної зали над рядами стійок",
          constructionNote: "Відкрита, вентильована, легка конструкція; кілька висот лотка з відповідними елементами з'єднання та опорами",
          href: "/products/cable-support-systems/wire-mesh-systems",
        },
        {
          system: "Кабельні драбини",
          role: "Високопотужні траси, зокрема прокладання через електротехнічний стояк між поверхами",
          constructionNote: "Асортимент C-профіль/сходинка, важкого типу, GCMC та GMIE із напрямними аксесуарами",
          href: "/products/cable-support-systems/cable-ladders",
        },
        {
          system: "Кабельні лотки",
          role: "Прокладання силових, керуючих та інформаційних кабелів через електрощитові, технічні приміщення та загальні маршрути",
          constructionNote: "Перфоровані, посилені, важкого типу та коробчасті варіанти, обираються за проєктом",
          href: "/products/cable-support-systems/cable-trays-trunking",
        },
        {
          system: "Опорні та підвісні системи",
          role: "Конструктивний опорний шар, що несе лотки, драбини та дротяні лотки",
          constructionNote: "Профілі, кронштейни, консолі та різьбові шпильки для настінного, стельового, підлогового та багаторівневого монтажу",
          href: "/products/cable-support-systems/support-hanging-systems",
        },
      ],
    },
    checklistHeading: "Чек-лист вибору для проєкту",
    checklist: [
      "Розташування траси: серверна зала, електротехнічний стояк, електрощитова чи технічне приміщення",
      "Тип кабелю: силовий, керуючий чи інформаційний",
      "Необхідна пропускна здатність та проєктні дані навантаження",
      "Конструкція лотка, драбини чи дротяного лотка",
      "Спосіб опори та крок опор",
      "Настінний, стельовий, підлоговий чи конструктивний монтаж",
      "Матеріал і покриття",
      "Доступ до траси та вимоги до обслуговування",
      "Необхідні технічні креслення та інструкції з монтажу",
    ],
    standardsNote: {
      heading: "Технічні стандарти та документація",
      note:
        "Чинна документація категорії кабеленесучих систем Gersan зазначає BS EN 61537 та IEC 61537 як застосовні стандарти. Застосовність для конкретної продуктової лінійки, дані навантаження, матеріал/покриття та деталі монтажу слід підтверджувати за відповідною технічною документацією проєкту.",
      actionLabel: "Запросити технічний пакет",
      actionHref: REQUEST_DOCUMENTATION_HREF,
    },
    faqHeading: "Поширені запитання",
    faq: [
      {
        question: "Які кабеленесучі системи підходять для проєктів центрів обробки даних?",
        answer:
          "Дротяні кабельні лотки — для надземного прокладання в серверній залі, кабельні драбини — для високопотужних і стоякових трас, кабельні лотки — для прокладання в електрощитових і технічних приміщеннях, опорні та підвісні системи — щоб нести всі перелічені системи.",
      },
      {
        question: "Коли в ЦОД застосовують дротяні кабельні лотки?",
        answer:
          "Дротяні кабельні лотки застосовують для гнучких, відкритих, вентильованих надземних трас структурованого кабелю — найчастіше над рядами серверних стійок у серверній залі.",
      },
      {
        question: "Де в ЦОД доречні кабельні драбини?",
        answer:
          "Кабельні драбини доречні для високопотужних трас, зокрема електротехнічного стояка, де вони прокладають силові та інформаційні кабелі між поверхами.",
      },
      {
        question: "Що є опорою для кабельних лотків і драбин?",
        answer:
          "Опорні та підвісні системи — профілі, кронштейни, консолі та різьбові шпильки — несуть траси кабельних лотків, драбин і дротяних лотків від стін, стель, підлоги чи будівельних конструкцій.",
      },
      {
        question: "Які стандарти зазначені для кабеленесучих систем Gersan?",
        answer:
          "Чинна документація категорії кабеленесучих систем Gersan зазначає BS EN 61537 та IEC 61537 як застосовні стандарти. Підтверджуйте застосовність за відповідною технічною документацією вашого проєкту.",
      },
      {
        question: "Чи виробляє InfraVolt кабеленесучі системи Gersan?",
        answer:
          "Ні. Виробником є Gersan. InfraVolt є дистриб'ютором і представником на ринку, а також технічно-комерційним контактом для проєктів у Великій Британії та Україні.",
      },
      {
        question: "Як замовити технічні дані або комерційну пропозицію по проєкту?",
        answer:
          "Скористайтеся посиланнями «Запросити комерційну пропозицію» або «Запросити технічний пакет» на цій сторінці, щоб надіслати запит технічній команді InfraVolt.",
      },
    ],
    applicationMap: {
      heading: "Ці системи в контексті проєкту",
      description:
        "Карта застосувань центру обробки даних — це інтерактивна візуалізація, яка показує, де кабеленесучі системи та інші продуктові системи InfraVolt можуть застосовуватися в межах ЦОД — від головного електротехнічного приміщення та серверної зали до електротехнічного стояка й холодильного центру.",
      linkLabel: "Переглянути карту застосувань ЦОД",
    },
    relatedSystems: {
      heading: "Суміжна система для ЦОД",
      description:
        "Шинопровідні системи розподілу живлення — окрема продуктова лінійка InfraVolt, що також застосовується в тих самих зонах ЦОД, що й кабеленесучі траси на цій сторінці.",
      linkLabel: "Переглянути шинопроводи для ЦОД",
      linkHref: "/products/busbar/data-centre-busbar",
    },
    projectCta: {
      eyebrow: "ПІДТРИМКА ПРОЄКТУ",
      title: "Плануєте кабеленесучі системи для проєкту ЦОД?",
      description:
        "Поділіться з нашою технічною командою поточною трасою, навантаженням кабелю та стадією проєкту.",
      action: "Запросити комерційну пропозицію",
      actionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Запросити технічний пакет",
      secondaryActionHref: REQUEST_DOCUMENTATION_HREF,
    },
  },
} as const satisfies Readonly<Record<MarketCode, DataCentreCableManagementLandingContent>>;

export function dataCentreCableManagementLandingContentForMarket(
  market: MarketCode,
): DataCentreCableManagementLandingContent {
  return content[market];
}

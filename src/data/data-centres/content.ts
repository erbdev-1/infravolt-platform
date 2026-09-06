import type { MarketCode } from "@/modules/markets/types";
import { buildEnquiryHref } from "@/modules/enquiry/routing";

// Data Centre Electrical Infrastructure Hub — Phase 2 sector overview page.
// This is the main Data Centre authority/navigation page, sitting above the
// three completed Data Centre detail pages and the interactive Application
// Map. It deliberately does not repeat their full technical content — see
// each card's "points" below, which are short evidence-backed excerpts, not
// full copies.
//
// Every fact below is transcribed from existing, already-shipped repository
// sources:
// - data/products/busbar/data-centre-landing-content.ts (GS/GGD/GR current
//   ranges and roles)
// - data/products/cable-management/data-centre-landing-content.ts (the 4
//   cable-management systems and their data-centre roles, and the exact
//   BS EN 61537 / IEC 61537 standards-note wording)
// - data/products/earthing-lightning/data-centre-landing-content.ts (the 5
//   earthing/bonding families and their roles, and the exact IEC/EN 62561
//   Series / IEC 62305 / BS 7430 standards-note wording)
// - modules/application-map/data-centre.ts (the 8 canonical Data Centre
//   zones — names only, no invented parameters — and the 3 additional
//   product families also shown in the map: Underfloor Cable Trunking, LED
//   Systems, EV Charging Systems)
//
// The Data Centre Busbar page does not itself quote a specific product
// standard, so this hub does not invent one for busbar — see standards.
// busbarNote below, which states that fact rather than fabricating a
// standard reference.
//
// No Tier/Uptime Institute claims, no zero-downtime/hyperscale/AI-ready
// claims, no guaranteed fault-current/earth-resistance performance, no
// blanket certification claims, and no InfraVolt manufacturing/
// certification/design-of-record claims are made anywhere in this file.

const SOURCE_ROUTE = "/data-centres";
const REQUEST_QUOTE_HREF = buildEnquiryHref("quote", {
  family: "data-centres",
  source: SOURCE_ROUTE,
});
const REQUEST_DOCUMENTATION_HREF = buildEnquiryHref("technical-document", {
  family: "data-centres",
  source: SOURCE_ROUTE,
});

export type DataCentreHubCoreSystemCard = Readonly<{
  title: string;
  purpose: string;
  points: readonly string[];
  linkLabel: string;
  href: string;
}>;

export type DataCentreHubFaqItem = Readonly<{
  question: string;
  answer: string;
  linkLabel?: string;
  linkHref?: string;
}>;

export type DataCentreHubClusterLink = Readonly<{
  label: string;
  href: string;
}>;

export type DataCentreInfrastructureHubContent = Readonly<{
  metadata: Readonly<{ title: string; description: string }>;
  breadcrumbs: Readonly<{ home: string; current: string }>;
  entityStatement: string;
  hero: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    primaryActionHref: string;
    secondaryAction: string;
    secondaryActionHref: string;
  }>;
  directAnswer: Readonly<{ heading: string; answer: string }>;
  coreSystemsHeading: string;
  coreSystemsIntroduction: string;
  coreSystems: readonly [
    DataCentreHubCoreSystemCard,
    DataCentreHubCoreSystemCard,
    DataCentreHubCoreSystemCard,
  ];
  zones: Readonly<{
    heading: string;
    introduction: string;
    ctaLabel: string;
    additionalSystemsNote: string;
  }>;
  applicationMapCta: Readonly<{
    heading: string;
    description: string;
    linkLabel: string;
  }>;
  projectCoordination: Readonly<{
    heading: string;
    introduction: string;
    checklist: readonly string[];
    disclaimer: string;
  }>;
  standards: Readonly<{
    heading: string;
    introduction: string;
    busbarLabel: string;
    busbarNote: string;
    cableManagementLabel: string;
    cableManagementNote: string;
    earthingLabel: string;
    earthingNote: string;
    closingNote: string;
  }>;
  faqHeading: string;
  faq: readonly [
    DataCentreHubFaqItem,
    DataCentreHubFaqItem,
    DataCentreHubFaqItem,
    DataCentreHubFaqItem,
    DataCentreHubFaqItem,
    DataCentreHubFaqItem,
    DataCentreHubFaqItem,
  ];
  clusterNavigation: Readonly<{
    heading: string;
    description: string;
    links: readonly DataCentreHubClusterLink[];
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
      title: "Data Centre Electrical Infrastructure Systems UK | InfraVolt",
      description:
        "Explore Gersan busbar, cable management, earthing and bonding systems for UK data centres, with application mapping, technical documentation and project support from InfraVolt.",
    },
    breadcrumbs: {
      home: "Home",
      current: "Data Centres",
    },
    entityStatement:
      "Gersan manufactures the busbar, cable management, and earthing and lightning-protection systems referenced across this hub. InfraVolt supports UK and Ukraine data centre projects with product selection, technical documentation and technical-commercial coordination — InfraVolt is not the designer, certifier or installer of record for a project.",
    hero: {
      eyebrow: "DATA CENTRE ELECTRICAL INFRASTRUCTURE",
      title: "Data Centre Electrical Infrastructure Systems",
      description:
        "Gersan busbar, cable management, and earthing and bonding systems support the electrical infrastructure of a data centre — from power distribution to cable routing and equipment bonding. InfraVolt provides technical-commercial project support across UK and Ukraine data centre projects.",
      primaryAction: "Request Quote",
      primaryActionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Explore the Data Centre Application Map",
      secondaryActionHref: "/application-map",
    },
    directAnswer: {
      heading: "What electrical infrastructure does a data centre project combine?",
      answer:
        "A data-centre electrical-infrastructure package can combine structured power distribution (busbar), cable routing and containment, and earthing and equipotential bonding. These are three separate Gersan product families, each covered on its own dedicated page. InfraVolt supports product review, technical documentation and technical-commercial coordination for these systems; the exact system design, certification and installation remain the responsibility of the project's appointed engineers and contractors. No single combination fits every project.",
    },
    coreSystemsHeading: "Three Core Infrastructure Systems",
    coreSystemsIntroduction:
      "Each system below is covered in full on its own dedicated Data Centre page — this hub summarises the role of each without repeating that detail.",
    coreSystems: [
      {
        title: "Data Centre Busbar Systems",
        purpose:
          "Structured power distribution from transformer and switchboard connections through to downstream tap-off points.",
        points: [
          "GS Super Compact (400–6300 A) for high-current transformer and switchboard connections",
          "GGD Medium Power (160–1000 A) for horizontal distribution, vertical risers and tap-off runs",
          "GR Cast Resin (500–6300 A) considered where resin-insulated, IP68 construction is specified",
        ],
        linkLabel: "View Data Centre Busbar Systems",
        href: "/products/busbar/data-centre-busbar",
      },
      {
        title: "Data Centre Cable Management Systems",
        purpose: "Cable routing and containment through data hall, riser, electrical room and plant spaces.",
        points: [
          "Wire-Mesh Cable Trays for open overhead structured cabling above server rack rows",
          "Cable Ladder Systems for high-capacity routes, including the electrical riser",
          "Cable Tray Systems and Support & Hanging Systems for general routing and structural support",
        ],
        linkLabel: "View Data Centre Cable Management",
        href: "/products/cable-support-systems/data-centre-cable-management",
      },
      {
        title: "Data Centre Earthing & Bonding Systems",
        purpose: "Equipment, rack and containment bonding, plus external lightning protection where specified.",
        points: [
          "Equipotential Earth Bars provide common bonding points for equipment and technical spaces",
          "Conductors, clamps and connectors bond racks, panels and cable containment to the earthing system",
          "Lightning Protection Products form the external lightning-protection system where a project specifies one",
        ],
        linkLabel: "View Data Centre Earthing & Bonding",
        href: "/products/earthing-and-lightning-protection/data-centre-earthing",
      },
    ],
    zones: {
      heading: "Data Centre Zones",
      introduction:
        "The Data Centre Application Map covers 8 zones — from the main electrical and UPS room and data hall to the electrical riser, generator hall, cooling plant, NOC control room, utility intake and parking & EV services — showing where each product family is used across the site.",
      ctaLabel: "Explore the Data Centre Application Map",
      additionalSystemsNote:
        "The map also shows Underfloor Cable Trunking, LED Systems and EV Charging Systems as additional product families used across these zones.",
    },
    applicationMapCta: {
      heading: "See These Systems in Context",
      description:
        "The Data Centre Application Map is an interactive visual showing where busbar, cable management, earthing and the other InfraVolt product families may be used across a data centre site.",
      linkLabel: "Open the Data Centre Application Map",
    },
    projectCoordination: {
      heading: "Project Coordination Checklist",
      introduction:
        "A short checklist for bringing InfraVolt into the technical-commercial conversation on a data centre project.",
      checklist: [
        "Relevant zones and load context for the project",
        "Cable routes across data hall, riser, electrical room and plant areas",
        "Equipment, rack, panel and containment bonding points",
        "Riser and plant-room interfaces between systems",
        "Material, finish and installation-environment requirements",
        "Technical data and drawings required for specification",
        "Bill of quantities / specification review",
        "Quotation and technical-commercial coordination with InfraVolt",
      ],
      disclaimer:
        "Final design approval, certification and installation responsibility remain with the project's appointed engineers, certifiers and contractors.",
    },
    standards: {
      heading: "Standards & Documentation Scope",
      introduction:
        "Standards applicability varies by product family and by project — the summary below reuses only the wording already published on each system's own Data Centre page.",
      busbarLabel: "Busbar Systems",
      busbarNote:
        "The Data Centre Busbar page does not quote a specific product standard for GS, GGD or GR — confirm current rating, conductor and construction details directly against the relevant Gersan technical documentation.",
      cableManagementLabel: "Cable Management Systems",
      cableManagementNote:
        "The current Gersan Cable Management category documentation lists BS EN 61537 and IEC 61537 as applicable standards. Product-family applicability, load data, material/finish and installation details should be confirmed against the relevant technical documentation for the project.",
      earthingLabel: "Earthing & Bonding Systems",
      earthingNote:
        "The current Gersan Earthing & Lightning Protection documentation references IEC/EN 62561 Series, IEC 62305 and BS 7430 across relevant product families. Exact applicability, material selection, conductor/electrode arrangement and project requirements should be confirmed against the relevant technical documentation and project design.",
      closingNote:
        "No single standard covers a full data centre electrical-infrastructure package — confirm applicability against each system's own technical documentation and the project's design.",
    },
    faqHeading: "Common Questions",
    faq: [
      {
        question: "What electrical infrastructure systems are relevant to a data centre?",
        answer:
          "Busbar systems for structured power distribution, cable management systems for cable routing and containment, and earthing and bonding systems for equipment, rack and containment bonding — each covered on its own dedicated Data Centre page.",
      },
      {
        question: "When is busbar used in a data centre?",
        answer:
          "Busbar is used for transformer and switchboard connections, horizontal and vertical power distribution, and tap-off distribution along a run — see the Data Centre Busbar page for the current three-system range.",
        linkLabel: "View Data Centre Busbar Systems",
        linkHref: "/products/busbar/data-centre-busbar",
      },
      {
        question: "What cable management systems are used in data centres?",
        answer:
          "Wire-mesh cable trays, cable ladders, cable trays and support/hanging systems route power, control and data cabling through the data hall, riser, electrical room and plant spaces — see the Data Centre Cable Management page for the full comparison.",
        linkLabel: "View Data Centre Cable Management",
        linkHref: "/products/cable-support-systems/data-centre-cable-management",
      },
      {
        question: "How are racks, panels and cable containment bonded?",
        answer:
          "Equipotential earth bars provide common bonding points, and conductors, clamps and connectors bond racks, distribution panels and cable containment to the facility's earthing system — see the Data Centre Earthing & Bonding page for the full comparison.",
        linkLabel: "View Data Centre Earthing & Bonding",
        linkHref: "/products/earthing-and-lightning-protection/data-centre-earthing",
      },
      {
        question: "Which standards are referenced by relevant Gersan systems?",
        answer:
          "Cable management references BS EN 61537 and IEC 61537; earthing and lightning protection references IEC/EN 62561 Series, IEC 62305 and BS 7430; the Data Centre Busbar page does not quote a specific standard. Applicability varies by product family and project — see the Standards & Documentation section above.",
      },
      {
        question: "Does InfraVolt manufacture Gersan products?",
        answer:
          "No. Gersan is the manufacturer. InfraVolt is the distributor and market representative, and the technical-commercial project contact for UK and Ukraine.",
      },
      {
        question: "How can I request technical data, project support or a quotation?",
        answer:
          "Use the Request Quote or Request Technical Pack links on this page, or on any of the three Data Centre system pages, to send your requirement to InfraVolt's technical team.",
        linkLabel: "Request Quote",
        linkHref: REQUEST_QUOTE_HREF,
      },
    ],
    clusterNavigation: {
      heading: "Data Centre System Pages",
      description: "Continue to a specific system page or the interactive Application Map.",
      links: [
        { label: "Data Centre Busbar Systems", href: "/products/busbar/data-centre-busbar" },
        {
          label: "Data Centre Cable Management Systems",
          href: "/products/cable-support-systems/data-centre-cable-management",
        },
        {
          label: "Data Centre Earthing & Bonding Systems",
          href: "/products/earthing-and-lightning-protection/data-centre-earthing",
        },
        { label: "Data Centre Application Map", href: "/application-map" },
      ],
    },
    projectCta: {
      eyebrow: "PROJECT SUPPORT",
      title: "Planning Electrical Infrastructure for a Data Centre Project?",
      description:
        "Share your current zones, systems and project stage with our technical team — we'll help route your requirement to the right system pages and technical documentation.",
      action: "Request Quote",
      actionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Request Technical Pack",
      secondaryActionHref: REQUEST_DOCUMENTATION_HREF,
    },
  },
  ua: {
    metadata: {
      title: "Електротехнічна інфраструктура для ЦОД | InfraVolt",
      description:
        "Системи Gersan для електротехнічної інфраструктури центрів обробки даних (ЦОД): шинопроводи, кабеленесучі системи, заземлення та зрівнювання потенціалів з технічною підтримкою InfraVolt.",
    },
    breadcrumbs: {
      home: "Головна",
      current: "Центри обробки даних",
    },
    entityStatement:
      "Gersan виробляє шинопровідні, кабеленесучі системи та системи заземлення й блискавкозахисту, представлені на цьому огляді. InfraVolt супроводжує проєкти у Великій Британії та Україні: підбір продукції, технічна документація та технічно-комерційна координація — InfraVolt не є проєктувальником, органом сертифікації чи монтажною організацією проєкту.",
    hero: {
      eyebrow: "ЕЛЕКТРОТЕХНІЧНА ІНФРАСТРУКТУРА ЦОД",
      title: "Електротехнічна інфраструктура для центрів обробки даних",
      description:
        "Шинопровідні, кабеленесучі системи Gersan та системи заземлення й зрівнювання потенціалів забезпечують електротехнічну інфраструктуру центру обробки даних — від розподілу живлення до прокладання кабелів і вирівнювання потенціалів обладнання. InfraVolt надає технічно-комерційну підтримку проєктів у Великій Британії та Україні.",
      primaryAction: "Запросити комерційну пропозицію",
      primaryActionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Переглянути карту застосувань ЦОД",
      secondaryActionHref: "/application-map",
    },
    directAnswer: {
      heading: "Яку електротехнічну інфраструктуру поєднує проєкт ЦОД?",
      answer:
        "Пакет електротехнічної інфраструктури ЦОД може поєднувати структурований розподіл живлення (шинопровід), прокладання й огородження кабелів та заземлення й зрівнювання потенціалів. Це три окремі продуктові лінійки Gersan, кожна представлена на власній сторінці. InfraVolt підтримує підбір продукції, технічну документацію та технічно-комерційну координацію цих систем; саме проєктне рішення, сертифікація та монтаж залишаються відповідальністю призначених інженерів і підрядників проєкту. Жодне єдине поєднання не підходить для всіх проєктів.",
    },
    coreSystemsHeading: "Три основні інфраструктурні системи",
    coreSystemsIntroduction:
      "Кожна система нижче повністю висвітлена на власній сторінці для ЦОД — цей огляд лише узагальнює роль кожної, не повторюючи деталей.",
    coreSystems: [
      {
        title: "Шинопроводи для ЦОД",
        purpose:
          "Структурований розподіл живлення від трансформаторних і щитових підключень до точок відгалуження.",
        points: [
          "GS Super Compact (400–6300 А) — для потужних трансформаторних і щитових підключень",
          "GGD середньої потужності (160–1000 А) — для горизонтального розподілу, вертикальних стояків і відгалужень",
          "GR з литою ізоляцією (500–6300 А) — розглядається, коли вимагається конструкція класу IP68",
        ],
        linkLabel: "Переглянути шинопроводи для ЦОД",
        href: "/products/busbar/data-centre-busbar",
      },
      {
        title: "Кабеленесучі системи для ЦОД",
        purpose:
          "Прокладання та огородження кабелів через серверну залу, стояк, електрощитову та технічні приміщення.",
        points: [
          "Дротяні кабельні лотки — для надземного структурованого прокладання над рядами стійок",
          "Кабельні драбини — для високопотужних трас, зокрема електротехнічного стояка",
          "Кабельні лотки та опорні й підвісні системи — для загального прокладання та конструктивної опори",
        ],
        linkLabel: "Переглянути кабеленесучі системи для ЦОД",
        href: "/products/cable-support-systems/data-centre-cable-management",
      },
      {
        title: "Заземлення та зрівнювання потенціалів для ЦОД",
        purpose:
          "Вирівнювання потенціалів обладнання, стійок і кабельних трас, а також зовнішній блискавкозахист там, де це передбачено.",
        points: [
          "Шини зрівнювання потенціалів — спільні точки приєднання для обладнання та технічних приміщень",
          "Провідники, клеми та з'єднувачі приєднують стійки, щити та кабельні траси до системи заземлення",
          "Компоненти блискавкозахисту формують зовнішню систему блискавкозахисту, якщо це передбачено проєктом",
        ],
        linkLabel: "Переглянути заземлення для ЦОД",
        href: "/products/earthing-and-lightning-protection/data-centre-earthing",
      },
    ],
    zones: {
      heading: "Зони центру обробки даних",
      introduction:
        "Карта застосувань ЦОД охоплює 8 зон — від головного електротехнічного приміщення / ДБЖ та серверної зали до електротехнічного стояка, зали генераторів, холодильного центру, диспетчерської (NOC), вузла вводу живлення та паркінгу й зарядної інфраструктури — показуючи, де застосовується кожна продуктова лінійка на об'єкті.",
      ctaLabel: "Переглянути карту застосувань ЦОД",
      additionalSystemsNote:
        "Карта також показує підпідлогові кабельні короби, системи освітлення LED та системи зарядки електромобілів як додаткові продуктові лінійки в цих зонах.",
    },
    applicationMapCta: {
      heading: "Ці системи в контексті проєкту",
      description:
        "Карта застосувань центру обробки даних — це інтерактивна візуалізація, яка показує, де шинопроводи, кабеленесучі системи, заземлення та інші продуктові системи InfraVolt можуть застосовуватися в межах об'єкта ЦОД.",
      linkLabel: "Відкрити карту застосувань ЦОД",
    },
    projectCoordination: {
      heading: "Чек-лист координації проєкту",
      introduction:
        "Короткий чек-лист для початку технічно-комерційної розмови з InfraVolt щодо проєкту ЦОД.",
      checklist: [
        "Відповідні зони та контекст навантаження проєкту",
        "Кабельні траси через серверну залу, стояк, електрощитову та технічні приміщення",
        "Точки приєднання обладнання, стійок, щитів і кабельних трас",
        "Інтерфейси між стояком, технічними приміщеннями та іншими системами",
        "Вимоги до матеріалу, покриття та умов монтажу",
        "Технічні дані та креслення, необхідні для специфікації",
        "Перевірка відомості обсягів робіт / специфікації",
        "Комерційна пропозиція та технічно-комерційна координація з InfraVolt",
      ],
      disclaimer:
        "Остаточне затвердження проєктного рішення, сертифікація та відповідальність за монтаж залишаються за призначеними інженерами, органами сертифікації та підрядниками проєкту.",
    },
    standards: {
      heading: "Стандарти та обсяг документації",
      introduction:
        "Застосовність стандартів залежить від продуктової лінійки та проєкту — підсумок нижче використовує лише формулювання, вже опубліковані на власній сторінці кожної системи для ЦОД.",
      busbarLabel: "Шинопроводи",
      busbarNote:
        "Сторінка шинопроводів для ЦОД не наводить конкретного стандарту для GS, GGD чи GR — підтверджуйте номінальний струм, провідник і конструктивні деталі безпосередньо за відповідною технічною документацією Gersan.",
      cableManagementLabel: "Кабеленесучі системи",
      cableManagementNote:
        "Чинна документація категорії кабеленесучих систем Gersan зазначає BS EN 61537 та IEC 61537 як застосовні стандарти. Застосовність для конкретної продуктової лінійки, дані навантаження, матеріал/покриття та деталі монтажу слід підтверджувати за відповідною технічною документацією проєкту.",
      earthingLabel: "Заземлення та зрівнювання потенціалів",
      earthingNote:
        "Чинна документація Gersan «Заземлення та блискавкозахист» зазначає серію IEC/EN 62561, IEC 62305 та BS 7430 як застосовні стандарти для відповідних продуктових груп. Точну застосовність, вибір матеріалу, схему провідників/електродів та проєктні вимоги слід підтверджувати за відповідною технічною документацією та проєктним рішенням.",
      closingNote:
        "Жоден єдиний стандарт не охоплює весь пакет електротехнічної інфраструктури ЦОД — підтверджуйте застосовність за технічною документацією кожної системи та проєктним рішенням.",
    },
    faqHeading: "Поширені запитання",
    faq: [
      {
        question: "Які системи електротехнічної інфраструктури підходять для ЦОД?",
        answer:
          "Шинопроводи — для структурованого розподілу живлення, кабеленесучі системи — для прокладання й огородження кабелів, системи заземлення та зрівнювання потенціалів — для вирівнювання потенціалів обладнання, стійок і кабельних трас — кожна представлена на власній сторінці для ЦОД.",
      },
      {
        question: "Коли в ЦОД застосовують шинопровід?",
        answer:
          "Шинопровід застосовують для трансформаторних і щитових підключень, горизонтального та вертикального розподілу живлення, а також розподілу через відгалуження вздовж траси — див. сторінку шинопроводів для ЦОД щодо чинного асортименту з трьох систем.",
        linkLabel: "Переглянути шинопроводи для ЦОД",
        linkHref: "/products/busbar/data-centre-busbar",
      },
      {
        question: "Які кабеленесучі системи застосовують у ЦОД?",
        answer:
          "Дротяні кабельні лотки, кабельні драбини, кабельні лотки та опорно-підвісні системи прокладають силові, керуючі та інформаційні кабелі через серверну залу, стояк, електрощитову та технічні приміщення — див. сторінку кабеленесучих систем для ЦОД щодо повного порівняння.",
        linkLabel: "Переглянути кабеленесучі системи для ЦОД",
        linkHref: "/products/cable-support-systems/data-centre-cable-management",
      },
      {
        question: "Як вирівнюють потенціали стійок, щитів і кабельних трас?",
        answer:
          "Шини зрівнювання потенціалів забезпечують спільні точки приєднання, а провідники, клеми та з'єднувачі приєднують стійки, розподільні щити та кабельні траси до системи заземлення об'єкта — див. сторінку заземлення для ЦОД щодо повного порівняння.",
        linkLabel: "Переглянути заземлення для ЦОД",
        linkHref: "/products/earthing-and-lightning-protection/data-centre-earthing",
      },
      {
        question: "Які стандарти зазначені для відповідних систем Gersan?",
        answer:
          "Кабеленесучі системи зазначають BS EN 61537 та IEC 61537; заземлення та блискавкозахист — серію IEC/EN 62561, IEC 62305 та BS 7430; сторінка шинопроводів для ЦОД не наводить конкретного стандарту. Застосовність залежить від продуктової лінійки та проєкту — див. розділ «Стандарти та обсяг документації» вище.",
      },
      {
        question: "Чи виробляє InfraVolt продукцію Gersan?",
        answer:
          "Ні. Виробником є Gersan. InfraVolt є дистриб'ютором і представником на ринку, а також технічно-комерційним контактом для проєктів у Великій Британії та Україні.",
      },
      {
        question: "Як замовити технічні дані, підтримку проєкту чи комерційну пропозицію?",
        answer:
          "Скористайтеся посиланнями «Запросити комерційну пропозицію» або «Запросити технічний пакет» на цій сторінці або на будь-якій із трьох сторінок систем для ЦОД, щоб надіслати запит технічній команді InfraVolt.",
        linkLabel: "Запросити комерційну пропозицію",
        linkHref: REQUEST_QUOTE_HREF,
      },
    ],
    clusterNavigation: {
      heading: "Сторінки систем для ЦОД",
      description: "Перейдіть до конкретної системи або інтерактивної карти застосувань.",
      links: [
        { label: "Шинопроводи для ЦОД", href: "/products/busbar/data-centre-busbar" },
        {
          label: "Кабеленесучі системи для ЦОД",
          href: "/products/cable-support-systems/data-centre-cable-management",
        },
        {
          label: "Заземлення та зрівнювання потенціалів для ЦОД",
          href: "/products/earthing-and-lightning-protection/data-centre-earthing",
        },
        { label: "Карта застосувань ЦОД", href: "/application-map" },
      ],
    },
    projectCta: {
      eyebrow: "ПІДТРИМКА ПРОЄКТУ",
      title: "Плануєте електротехнічну інфраструктуру для проєкту ЦОД?",
      description:
        "Поділіться з нашою технічною командою поточними зонами, системами та стадією проєкту — ми допоможемо направити ваш запит до потрібних сторінок систем і технічної документації.",
      action: "Запросити комерційну пропозицію",
      actionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Запросити технічний пакет",
      secondaryActionHref: REQUEST_DOCUMENTATION_HREF,
    },
  },
} as const satisfies Readonly<Record<MarketCode, DataCentreInfrastructureHubContent>>;

export function dataCentreInfrastructureHubContentForMarket(
  market: MarketCode,
): DataCentreInfrastructureHubContent {
  return content[market];
}

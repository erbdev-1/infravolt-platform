import type { MarketCode } from "@/modules/markets/types";
import { buildEnquiryHref } from "@/modules/enquiry/routing";

// Data Centre Earthing & Bonding — Phase 2 commercial/SEO landing page.
// This is an application/commercial landing page ("data centre" is a use
// case), not a new Gersan product family, so it deliberately lives in its
// own content file rather than the Earthing & Lightning Protection hub
// (category-content.ts equivalent for this product line, content.ts) that
// it links to.
//
// Every fact below is transcribed from existing, already-shipped
// repository sources:
// - data/products/earthing-lightning/content.ts (hub technicalSnapshot
//   standards list — IEC/EN 62561 Series, IEC 62305, BS 7430 — materials
//   list, the "Data Centres" application card description: "Low-resistance
//   earthing and equipotential bonding supporting sensitive electrical and
//   IT infrastructure.", and each of the 5 linked category descriptions/
//   technicalSnapshot standards used in the comparison table below)
// - modules/application-map/data-centre.ts (the Data Centre Application
//   Map's own earthing-lightning family applicationPoints/benefits, and
//   the exact per-zone hotspot usedHereFor text for Main Electrical/UPS
//   Room, Data Hall, Electrical Riser, Generator Hall, Cooling Plant,
//   NOC/Control Room, Utility Intake and Parking & EV Services)
//
// No numeric earth-resistance targets, no Tier/Uptime Institute claims,
// no blanket certification statements, and no InfraVolt manufacturing/
// certification claims are made anywhere in this file.

const SOURCE_ROUTE = "/products/earthing-and-lightning-protection/data-centre-earthing";
const REQUEST_QUOTE_HREF = buildEnquiryHref("quote", {
  system: "earthing-lightning",
  family: "data-centre-earthing",
  source: SOURCE_ROUTE,
});
const REQUEST_DOCUMENTATION_HREF = buildEnquiryHref("technical-document", {
  system: "earthing-lightning",
  family: "data-centre-earthing",
  source: SOURCE_ROUTE,
});

export type DataCentreEarthingSystemRow = Readonly<{
  system: string;
  role: string;
  selectionNote: string;
  href: string;
}>;

export type DataCentreEarthingFaqItem = Readonly<{
  question: string;
  answer: string;
}>;

export type DataCentreEarthingRelatedLink = Readonly<{
  label: string;
  href: string;
}>;

export type DataCentreEarthingLandingContent = Readonly<{
  metadata: Readonly<{ title: string; description: string }>;
  breadcrumbs: Readonly<{
    home: string;
    products: string;
    earthingLightning: string;
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
      selectionNote: string;
      action: string;
    }>;
    rows: readonly DataCentreEarthingSystemRow[];
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
  faq: readonly DataCentreEarthingFaqItem[];
  applicationMap: Readonly<{
    heading: string;
    description: string;
    linkLabel: string;
  }>;
  relatedSystems: Readonly<{
    heading: string;
    description: string;
    links: readonly DataCentreEarthingRelatedLink[];
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
      title: "Data Centre Earthing & Bonding Systems UK | InfraVolt",
      description:
        "Gersan earthing, equipotential bonding and lightning protection components for UK data centres, including earth bars, conductors, clamps and electrodes, with technical project support from InfraVolt.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      earthingLightning: "Earthing & Lightning Protection",
      current: "Data Centre Earthing",
    },
    entityStatement:
      "Gersan manufactures the earthing and lightning-protection components shown on this page. InfraVolt supports UK and Ukraine projects with product selection, technical-commercial coordination and enquiries.",
    hero: {
      eyebrow: "DATA CENTRE EARTHING & BONDING",
      title: "Data Centre Earthing & Bonding Systems",
      description:
        "Equipotential earth bars, conductors and earthing tapes, clamps and connectors, earthing electrodes and plates, and lightning protection products support equipment and rack bonding within electrical and technical spaces, and form part of a data centre's external earthing and lightning-protection network. InfraVolt provides technical-commercial project support for UK data centre projects.",
      primaryAction: "Request Quote",
      primaryActionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Compare Systems",
      secondaryActionHref: "#system-comparison",
      tertiaryAction: "Explore the Data Centre Application Map",
      tertiaryActionHref: "/application-map",
    },
    directAnswer: {
      heading: "What earthing and bonding systems are relevant to data centre projects?",
      answer:
        "Equipotential Earth Bars provide common bonding points for equipment and technical spaces. Conductors & Earthing Tapes carry the bonding and earthing runs between them. Clamps & Connectors make the equipment, conductor, containment and test connections that hold the system together. Earthing Electrodes & Plates provide the earth-termination points where the project design requires them. Lightning Protection Products form the external lightning-protection system where a project specifies one. No single family covers every requirement — the right combination depends on the project's own earthing and bonding design.",
    },
    useCasesHeading: "Data Centre Bonding Use Cases",
    useCases: [
      {
        title: "Data Hall — rack and cabinet bonding",
        description:
          "Server racks and cabinets are bonded to the facility's earthing system, matching the Data Centre Application Map's own data hall reference.",
      },
      {
        title: "Main Electrical Room / UPS Room — equipment bonding",
        description:
          "Switchgear, UPS and distribution equipment are bonded to the facility's earthing system within the main electrical and UPS room.",
      },
      {
        title: "Electrical Riser — floor-by-floor bonding",
        description:
          "The busbar riser and cable containment are bonded to the facility's earthing system at each floor level as the riser passes through the building.",
      },
      {
        title: "Generator Hall, Cooling Plant and NOC — equipment and panel bonding",
        description:
          "Generators, switchgear and distribution panels in the generator hall; the control panel, chillers and pumps in the cooling plant and pump room; and the server rack and distribution panel in the NOC control room are each bonded to the facility's earthing system.",
      },
      {
        title: "Utility Intake — transformer and switchgear bonding",
        description:
          "The transformer and incoming switchgear at the utility intake are bonded to the facility's earthing system, alongside the external distribution panel and EV charging equipment in the parking and EV services area.",
      },
      {
        title: "Building external lightning protection",
        description:
          "External lightning protection — air termination, down-conductor and earth-termination components — is a separate system from internal equipotential bonding, forming part of the building's external earthing and lightning-protection network where a project specifies it.",
      },
    ],
    comparison: {
      heading: "System Comparison",
      introduction:
        "Five Gersan earthing and lightning-protection families are relevant to data centre earthing and bonding, each suited to a different role. None is a universal replacement for the others.",
      columnLabels: {
        system: "System",
        role: "Data-centre role",
        selectionNote: "Selection / documentation note",
        action: "Product page",
      },
      rows: [
        {
          system: "Equipotential Earth Bars",
          role: "Common bonding points for equipment and technical spaces",
          selectionNote:
            "Copper, tinned copper and galvanized bars in single and double disconnecting-link configurations; custom lengths available; IEC/EN 62561 Series referenced",
          href: "/products/earthing-and-lightning-protection/equipotential-earth-bars",
        },
        {
          system: "Conductors & Earthing Tapes",
          role: "Bonding and earthing runs between bonding points",
          selectionNote:
            "Copper, aluminium and galvanized conductor and tape options for above-ground and below-ground routing; IEC/EN 62561 Series referenced",
          href: "/products/earthing-and-lightning-protection/conductors-tapes",
        },
        {
          system: "Clamps & Connectors",
          role: "Equipment, conductor, containment and test connections",
          selectionNote:
            "Electrode, conductor, transition and test clamps; cable-tray fixing clamps bond cable trays; cable lugs terminate conductors at earth bars and equipment; IEC/EN 62561 Series referenced",
          href: "/products/earthing-and-lightning-protection/clamps-connectors",
        },
        {
          system: "Earthing Electrodes & Plates",
          role: "Earth-termination points where the project design requires them",
          selectionNote:
            "Copper, copper-bonded steel and galvanized solutions; IEC/EN 62561-2, BS 7430 and IEEE 80 referenced for this category",
          href: "/products/earthing-and-lightning-protection/earthing-electrodes-plates",
        },
        {
          system: "Lightning Protection Products",
          role: "External lightning-protection system where a project specifies one",
          selectionNote:
            "Air termination rods, mounting bases and down-conductor fixing components; IEC/EN 62561 Series and IEC 62305 referenced",
          href: "/products/earthing-and-lightning-protection/lightning-protection",
        },
      ],
    },
    checklistHeading: "Project Selection Checklist",
    checklist: [
      "Equipment, rack and panel bonding points required",
      "Data hall, electrical room, riser or external interface location",
      "Common equipotential bonding arrangement for the space",
      "Conductor and bar material",
      "Connection type, accessibility and test points",
      "Cable-containment bonding requirements",
      "Earth electrode or termination points, where the project design requires them",
      "External lightning-protection interface, where specified",
      "Corrosion and dissimilar-metal consideration",
      "Drawings, product data and installation guidance required",
    ],
    standardsNote: {
      heading: "Technical Standards & Documentation",
      note:
        "The current Gersan Earthing & Lightning Protection documentation references IEC/EN 62561 Series, IEC 62305 and BS 7430 across relevant product families. Exact applicability, material selection, conductor/electrode arrangement and project requirements should be confirmed against the relevant technical documentation and project design.",
      actionLabel: "Request Technical Pack",
      actionHref: REQUEST_DOCUMENTATION_HREF,
    },
    faqHeading: "Common Questions",
    faq: [
      {
        question: "What earthing and bonding systems are relevant to data centres?",
        answer:
          "Equipotential Earth Bars for common bonding points, Conductors & Earthing Tapes for bonding runs, Clamps & Connectors for equipment and containment connections, Earthing Electrodes & Plates for earth-termination where required, and Lightning Protection Products for the external lightning-protection system where specified.",
      },
      {
        question: "Why are equipotential earth bars used?",
        answer:
          "Equipotential earth bars provide a common bonding point that equipment, containment and other conductive parts connect to, supporting electrical safety and equipotential bonding within a technical space.",
      },
      {
        question: "How are server racks and cabinets bonded?",
        answer:
          "Server racks and cabinets in the data hall are bonded to the facility's earthing system using conductors, clamps and connectors terminating at an earth bar, matching the Data Centre Application Map's own data hall reference.",
      },
      {
        question: "How is cable containment bonded?",
        answer:
          "Cable-tray fixing clamps bond cable trays into the earthing system, and cable lugs terminate conductors at earth bars and equipment — the same clamp and connector families used for other equipment bonding.",
      },
      {
        question: "Which standards are referenced?",
        answer:
          "The current Gersan Earthing & Lightning Protection documentation references IEC/EN 62561 Series, IEC 62305 and BS 7430 across relevant product families. Confirm exact applicability against the relevant technical documentation for your project.",
      },
      {
        question: "Does InfraVolt manufacture Gersan earthing products?",
        answer:
          "No. Gersan is the manufacturer. InfraVolt is the distributor and market representative, and the technical-commercial project contact for UK and Ukraine.",
      },
      {
        question: "How do I request technical data or a quotation?",
        answer:
          "Use the Request Quote or Request Technical Pack links on this page to send your requirement to InfraVolt's technical team.",
      },
    ],
    applicationMap: {
      heading: "See These Systems in Context",
      description:
        "The Data Centre Application Map is an interactive visual showing where Earthing & Lightning Protection and InfraVolt's other product families may be used across a data centre — from the main electrical room and data hall to the electrical riser, generator hall and utility intake.",
      linkLabel: "Explore the Data Centre Application Map",
    },
    relatedSystems: {
      heading: "Related Data Centre Systems",
      description:
        "Power distribution busbar and cable management systems are separate InfraVolt product families, also used across the same data centre zones as the earthing and bonding components on this page.",
      links: [
        { label: "View Data Centre Busbar Systems", href: "/products/busbar/data-centre-busbar" },
        {
          label: "View Data Centre Cable Management",
          href: "/products/cable-support-systems/data-centre-cable-management",
        },
      ],
    },
    projectCta: {
      eyebrow: "PROJECT SUPPORT",
      title: "Planning Earthing and Bonding for a Data Centre Project?",
      description:
        "Share your current bonding requirement, project stage and technical documentation needs with our technical team.",
      action: "Request Quote",
      actionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Request Technical Pack",
      secondaryActionHref: REQUEST_DOCUMENTATION_HREF,
    },
  },
  ua: {
    metadata: {
      title: "Заземлення та зрівнювання потенціалів для ЦОД | InfraVolt",
      description:
        "Компоненти Gersan для заземлення, зрівнювання потенціалів і блискавкозахисту центрів обробки даних (ЦОД): шини заземлення, провідники, затискачі та електроди з технічною підтримкою InfraVolt.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      earthingLightning: "Заземлення та блискавкозахист",
      current: "Заземлення для ЦОД",
    },
    entityStatement:
      "Gersan виробляє компоненти заземлення та блискавкозахисту, представлені на цій сторінці. InfraVolt супроводжує проєкти у Великій Британії та Україні: підбір продукції, технічно-комерційна координація та обробка запитів.",
    hero: {
      eyebrow: "ЗАЗЕМЛЕННЯ ТА ЗРІВНЮВАННЯ ПОТЕНЦІАЛІВ ДЛЯ ЦОД",
      title: "Заземлення та зрівнювання потенціалів для центрів обробки даних",
      description:
        "Шини зрівнювання потенціалів, провідники та стрічки заземлення, клеми та з'єднувачі, електроди й пластини заземлення та компоненти блискавкозахисту забезпечують зрівнювання потенціалів обладнання та стійок в електротехнічних і технічних приміщеннях, а також входять до зовнішньої мережі заземлення та блискавкозахисту центру обробки даних. InfraVolt забезпечує технічно-комерційну підтримку проєктів у Великій Британії та Україні.",
      primaryAction: "Запросити комерційну пропозицію",
      primaryActionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Порівняти системи",
      secondaryActionHref: "#system-comparison",
      tertiaryAction: "Переглянути карту застосувань ЦОД",
      tertiaryActionHref: "/application-map",
    },
    directAnswer: {
      heading: "Які системи заземлення та зрівнювання потенціалів підходять для проєктів ЦОД?",
      answer:
        "Шини зрівнювання потенціалів забезпечують спільні точки приєднання для обладнання та технічних приміщень. Провідники та стрічки заземлення прокладають траси зрівнювання потенціалів і заземлення між ними. Клеми та з'єднувачі виконують приєднання обладнання, провідників, кабельних трас та тестових точок, що утримують систему разом. Електроди та пластини заземлення забезпечують точки заземлення там, де цього вимагає проєктне рішення. Компоненти блискавкозахисту формують зовнішню систему блискавкозахисту, якщо проєктом вона передбачена. Жодна з цих продуктових груп не покриває всі вимоги самостійно — конкретне поєднання залежить від власного проєкту заземлення та зрівнювання потенціалів.",
    },
    useCasesHeading: "Типові застосування зрівнювання потенціалів у ЦОД",
    useCases: [
      {
        title: "Серверна зала — вирівнювання потенціалів стійок і шаф",
        description:
          "Серверні стійки та шафи приєднуються до системи заземлення об'єкта — відповідно до власного опису серверної зали на карті застосувань ЦОД.",
      },
      {
        title: "Головне електротехнічне приміщення / приміщення ДБЖ — вирівнювання потенціалів обладнання",
        description:
          "Розподільні пристрої, ДБЖ та розподільне обладнання приєднуються до системи заземлення об'єкта в межах головного електротехнічного приміщення та приміщення ДБЖ.",
      },
      {
        title: "Електротехнічний стояк — вирівнювання потенціалів на кожному поверсі",
        description:
          "Шинопровідний стояк та кабельні траси приєднуються до системи заземлення об'єкта на кожному поверсі, через який проходить стояк.",
      },
      {
        title: "Зала генераторів, холодильний центр і диспетчерська (NOC) — вирівнювання потенціалів обладнання та щитів",
        description:
          "Генератори, розподільні пристрої та щити в залі генераторів; щит керування, чилери та насоси в холодильному центрі та насосній; серверна шафа та розподільна панель у диспетчерській (NOC) — кожен вузол приєднується до системи заземлення об'єкта.",
      },
      {
        title: "Вузол вводу — вирівнювання потенціалів на вводі",
        description:
          "Трансформатор та вхідні розподільні пристрої на вузлі вводу приєднуються до системи заземлення об'єкта, так само як зовнішня розподільна шафа та обладнання зарядних станцій у зоні паркування.",
      },
      {
        title: "Зовнішній блискавкозахист будівлі",
        description:
          "Зовнішній блискавкозахист — стрижні уловлювання, струмовідводи та компоненти заземлення — є окремою системою від внутрішнього зрівнювання потенціалів і входить до зовнішньої мережі заземлення та блискавкозахисту будівлі там, де це передбачено проєктом.",
      },
    ],
    comparison: {
      heading: "Порівняння систем",
      introduction:
        "П'ять продуктових груп Gersan для заземлення та блискавкозахисту застосовні до заземлення та зрівнювання потенціалів у ЦОД, кожна — для своєї ролі. Жодна з них не є універсальною заміною інших.",
      columnLabels: {
        system: "Система",
        role: "Роль у ЦОД",
        selectionNote: "Критерій вибору / документація",
        action: "Сторінка продукту",
      },
      rows: [
        {
          system: "Шини зрівнювання потенціалів",
          role: "Спільні точки приєднання для обладнання та технічних приміщень",
          selectionNote:
            "Мідні, луджені мідні та оцинковані шини в одинарній та подвійній конфігурації роз'єднувальних перемичок; можливе виготовлення нестандартної довжини; застосовна серія IEC/EN 62561",
          href: "/products/earthing-and-lightning-protection/equipotential-earth-bars",
        },
        {
          system: "Провідники та стрічки заземлення",
          role: "Траси зрівнювання потенціалів та заземлення між точками приєднання",
          selectionNote:
            "Мідні, алюмінієві та оцинковані варіанти провідника й стрічки для надземної та підземної прокладки; застосовна серія IEC/EN 62561",
          href: "/products/earthing-and-lightning-protection/conductors-tapes",
        },
        {
          system: "Клеми та з'єднувачі",
          role: "Приєднання обладнання, провідників, кабельних трас і тестових точок",
          selectionNote:
            "Клеми для електродів, провідників, перехідні та тестові клеми; клеми кріплення кабельних лотків приєднують лотки до системи заземлення; кабельні наконечники завершують провідники на шинах заземлення та обладнанні; застосовна серія IEC/EN 62561",
          href: "/products/earthing-and-lightning-protection/clamps-connectors",
        },
        {
          system: "Електроди та пластини заземлення",
          role: "Точки заземлення там, де цього вимагає проєктне рішення",
          selectionNote:
            "Мідні, мідно-плаковані та оцинковані рішення; для цієї категорії застосовні IEC/EN 62561-2, BS 7430 та IEEE 80",
          href: "/products/earthing-and-lightning-protection/earthing-electrodes-plates",
        },
        {
          system: "Компоненти блискавкозахисту",
          role: "Зовнішня система блискавкозахисту, якщо проєктом вона передбачена",
          selectionNote:
            "Стрижні уловлювання, монтажні основи та кріпильні компоненти струмовідводів; застосовні серія IEC/EN 62561 та IEC 62305",
          href: "/products/earthing-and-lightning-protection/lightning-protection",
        },
      ],
    },
    checklistHeading: "Чек-лист вибору для проєкту",
    checklist: [
      "Необхідні точки приєднання обладнання, стійок і щитів",
      "Розташування: серверна зала, електротехнічне приміщення, стояк чи зовнішній вузол",
      "Спільна схема зрівнювання потенціалів для приміщення",
      "Матеріал провідника та шини",
      "Тип з'єднання, доступність і тестові точки",
      "Вимоги до приєднання кабельних трас",
      "Точки заземлення чи електроди, якщо цього вимагає проєктне рішення",
      "Інтерфейс із зовнішнім блискавкозахистом, якщо передбачено",
      "Врахування корозії та контакту різнорідних металів",
      "Необхідні креслення, технічні дані та інструкції з монтажу",
    ],
    standardsNote: {
      heading: "Технічні стандарти та документація",
      note:
        "Чинна документація Gersan «Заземлення та блискавкозахист» зазначає серію IEC/EN 62561, IEC 62305 та BS 7430 як застосовні стандарти для відповідних продуктових груп. Точну застосовність, вибір матеріалу, схему провідників/електродів та проєктні вимоги слід підтверджувати за відповідною технічною документацією та проєктним рішенням.",
      actionLabel: "Запросити технічний пакет",
      actionHref: REQUEST_DOCUMENTATION_HREF,
    },
    faqHeading: "Поширені запитання",
    faq: [
      {
        question: "Які системи заземлення та зрівнювання потенціалів підходять для ЦОД?",
        answer:
          "Шини зрівнювання потенціалів — для спільних точок приєднання, провідники та стрічки заземлення — для трас зрівнювання потенціалів, клеми та з'єднувачі — для приєднання обладнання та кабельних трас, електроди й пластини заземлення — для точок заземлення там, де це потрібно, компоненти блискавкозахисту — для зовнішньої системи блискавкозахисту, якщо вона передбачена.",
      },
      {
        question: "Навіщо застосовують шини зрівнювання потенціалів?",
        answer:
          "Шини зрівнювання потенціалів забезпечують спільну точку приєднання, до якої підключається обладнання, кабельні траси та інші провідні частини, підтримуючи електробезпеку та зрівнювання потенціалів у технічному приміщенні.",
      },
      {
        question: "Як приєднують серверні стійки та шафи?",
        answer:
          "Серверні стійки та шафи в серверній залі приєднуються до системи заземлення об'єкта за допомогою провідників, клем і з'єднувачів, що завершуються на шині заземлення — відповідно до власного опису серверної зали на карті застосувань ЦОД.",
      },
      {
        question: "Як приєднують кабельні траси?",
        answer:
          "Клеми кріплення кабельних лотків приєднують кабельні лотки до системи заземлення, а кабельні наконечники завершують провідники на шинах заземлення та обладнанні — ті самі родини клем і з'єднувачів, що й для іншого приєднання обладнання.",
      },
      {
        question: "Які стандарти зазначені?",
        answer:
          "Чинна документація Gersan «Заземлення та блискавкозахист» зазначає серію IEC/EN 62561, IEC 62305 та BS 7430 як застосовні стандарти для відповідних продуктових груп. Підтверджуйте точну застосовність за відповідною технічною документацією вашого проєкту.",
      },
      {
        question: "Чи виробляє InfraVolt продукцію Gersan для заземлення?",
        answer:
          "Ні. Виробником є Gersan. InfraVolt є дистриб'ютором і представником на ринку, а також технічно-комерційним контактом для проєктів у Великій Британії та Україні.",
      },
      {
        question: "Як замовити технічні дані або комерційну пропозицію?",
        answer:
          "Скористайтеся посиланнями «Запросити комерційну пропозицію» або «Запросити технічний пакет» на цій сторінці, щоб надіслати запит технічній команді InfraVolt.",
      },
    ],
    applicationMap: {
      heading: "Ці системи в контексті проєкту",
      description:
        "Карта застосувань центру обробки даних — це інтерактивна візуалізація, яка показує, де заземлення та блискавкозахист й інші продуктові системи InfraVolt можуть застосовуватися в межах ЦОД — від головного електротехнічного приміщення та серверної зали до електротехнічного стояка, зали генераторів і вузла вводу.",
      linkLabel: "Переглянути карту застосувань ЦОД",
    },
    relatedSystems: {
      heading: "Суміжні системи для ЦОД",
      description:
        "Шинопровідні системи розподілу живлення та кабеленесучі системи — окремі продуктові лінійки InfraVolt, що також застосовуються в тих самих зонах ЦОД, що й компоненти заземлення та зрівнювання потенціалів на цій сторінці.",
      links: [
        { label: "Переглянути шинопроводи для ЦОД", href: "/products/busbar/data-centre-busbar" },
        {
          label: "Переглянути кабеленесучі системи для ЦОД",
          href: "/products/cable-support-systems/data-centre-cable-management",
        },
      ],
    },
    projectCta: {
      eyebrow: "ПІДТРИМКА ПРОЄКТУ",
      title: "Плануєте заземлення та зрівнювання потенціалів для проєкту ЦОД?",
      description:
        "Поділіться з нашою технічною командою поточними вимогами до приєднання, стадією проєкту та потребами в технічній документації.",
      action: "Запросити комерційну пропозицію",
      actionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Запросити технічний пакет",
      secondaryActionHref: REQUEST_DOCUMENTATION_HREF,
    },
  },
} as const satisfies Readonly<Record<MarketCode, DataCentreEarthingLandingContent>>;

export function dataCentreEarthingLandingContentForMarket(
  market: MarketCode,
): DataCentreEarthingLandingContent {
  return content[market];
}

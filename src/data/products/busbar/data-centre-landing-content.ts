import type { MarketCode } from "@/modules/markets/types";
import { buildEnquiryHref } from "@/modules/enquiry/routing";

// Data Centre Busbar — Phase 2 commercial/SEO landing page. This is an
// application/commercial landing page ("data centre" is a use case), not a
// new Gersan product series, so it deliberately lives in its own content
// file rather than data/products/busbar/systems.ts or catalog-content.ts.
//
// Every current-range, conductor-option and joint/construction fact below is
// transcribed from the existing, already-shipped repository sources:
// - data/products/busbar/systems.ts (BUSBAR_SYSTEMS — current ranges, IP
//   ratings, applications)
// - data/products/busbar/series/gs.ts, ggd.ts, gr.ts (system descriptions —
//   "400 A to 6300 A ... transformer and switchboard connections ...
//   aluminium (GSA) and copper (GSC) ... bolt-on and plug-in joint options";
//   "160 A to 1000 A ... aluminium (GGD-A, up to 1000 A) and copper
//   (GGD-C, up to 800 A) ... one-bolt monoblock joint system ... vertical
//   riser hangers for rising main installations ... tap-off accessories";
//   "fully resin-insulated, IP68 ... 500 A to 6300 A ... humid, saline and
//   corrosive operating environments ... aluminium (GR-A, up to 5000 A) and
//   copper (GR-C, up to 6300 A) ... welded-free elbow accessories and a
//   bolt-on connection joint")
// - modules/application-map/data-centre.ts (the same three systems are the
//   only busbar series actually used across the Data Centre Application
//   Map's zones: GGD for the main electrical room/server hall/riser/
//   generator hall, GS for the utility intake/transformer interface, GR for
//   the cooling plant/pump room's humid, wash-down environment)
//
// No load/fire/arc-fault ratings, no "Tier" claims, no monitoring/redundancy
// claims and no InfraVolt manufacturing/certification claims are made
// anywhere in this file.

const SOURCE_ROUTE = "/products/busbar/data-centre-busbar";
const REQUEST_QUOTE_HREF = buildEnquiryHref("quote", {
  system: "busbar",
  family: "data-centre-busbar",
  source: SOURCE_ROUTE,
});
const REQUEST_DOCUMENTATION_HREF = buildEnquiryHref("technical-document", {
  system: "busbar",
  family: "data-centre-busbar",
  source: SOURCE_ROUTE,
});

export type DataCentreBusbarSystemRow = Readonly<{
  system: string;
  currentRange: string;
  conductorOptions: string;
  role: string;
  protectionNote: string;
  href: string;
}>;

export type DataCentreBusbarFaqItem = Readonly<{
  question: string;
  answer: string;
}>;

export type DataCentreBusbarLandingContent = Readonly<{
  metadata: Readonly<{ title: string; description: string }>;
  breadcrumbs: Readonly<{
    home: string;
    products: string;
    busbar: string;
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
      currentRange: string;
      conductorOptions: string;
      role: string;
      protectionNote: string;
      action: string;
    }>;
    rows: readonly DataCentreBusbarSystemRow[];
  }>;
  whyBusbarHeading: string;
  whyBusbar: readonly string[];
  checklistHeading: string;
  checklist: readonly string[];
  faqHeading: string;
  faq: readonly DataCentreBusbarFaqItem[];
  applicationMap: Readonly<{
    heading: string;
    description: string;
    linkLabel: string;
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
      title: "Data Centre Busbar Trunking Systems UK | InfraVolt",
      description:
        "Gersan busbar trunking systems for UK data centre power distribution — GS high-current, GGD medium-power and GR cast-resin systems, with technical project support from InfraVolt.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      busbar: "Busbar Trunking Systems",
      current: "Data Centre Busbar",
    },
    entityStatement:
      "Gersan manufactures the busbar systems shown on this page. InfraVolt supports UK and Ukraine projects with product selection, technical-commercial coordination and enquiries.",
    hero: {
      eyebrow: "DATA CENTRE POWER DISTRIBUTION",
      title: "Data Centre Busbar Trunking Systems",
      description:
        "GS high-current, GGD medium-power and GR cast-resin busbar trunking systems support power distribution across UK data centre projects — from transformer and switchboard connections to structured tap-off distribution. InfraVolt provides technical-commercial project support throughout.",
      primaryAction: "Request Quote",
      primaryActionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Compare Busbar Systems",
      secondaryActionHref: "#system-comparison",
      tertiaryAction: "Explore the Data Centre Application Map",
      tertiaryActionHref: "/application-map",
    },
    directAnswer: {
      heading: "What busbar systems are relevant to data centre projects?",
      answer:
        "GS Super Compact (400–6300 A) is used for high-current distribution and transformer and switchboard connections. GGD Medium Power (160–1000 A) is used for medium-power distribution, rising-main installations and tap-off distribution. GR Cast Resin (500–6300 A) is considered where the installation environment or project specification calls for resin-insulated, IP68 construction.",
    },
    useCasesHeading: "Data Centre Power Distribution Use Cases",
    useCases: [
      {
        title: "Transformer-to-switchboard and main high-current connections",
        description:
          "GS Super Compact provides the short, high-current connection between a transformer and the incoming switchboard, with bolt-on and plug-in joint options and a dedicated range of transformer and panel connection accessories.",
      },
      {
        title: "Main horizontal power distribution",
        description:
          "GGD Medium Power runs horizontally from switchgear to downstream distribution boards, with an extensive range of feed, elbow, offset and expansion accessories.",
      },
      {
        title: "Vertical rising-main distribution",
        description:
          "GGD's dedicated vertical riser hangers support rising-main installations that distribute power floor by floor through an electrical riser.",
      },
      {
        title: "Downstream tap-off distribution",
        description:
          "GGD's tap-off accessories provide connection points along a run — for example above rack rows or at each floor of a riser — without additional branch cabling back to a distribution board.",
      },
      {
        title: "Humid and demanding operating environments",
        description:
          "GR Cast Resin's fully resin-insulated, IP68 construction is considered for humid, saline or corrosive conditions, such as a cooling plant or pump room, where that level of protection is specified.",
      },
    ],
    comparison: {
      heading: "System Comparison",
      introduction:
        "Three Gersan busbar systems are relevant to data centre power distribution, each suited to a different current range and role. None is a universal replacement for the others.",
      columnLabels: {
        system: "System",
        currentRange: "Current range",
        conductorOptions: "Conductor options",
        role: "Role in data centre distribution",
        protectionNote: "Construction / protection note",
        action: "Product page",
      },
      rows: [
        {
          system: "GS Super Compact",
          currentRange: "400–6300 A",
          conductorOptions: "Aluminium (GSA) or copper (GSC)",
          role: "High-current distribution; transformer and switchboard connections",
          protectionNote: "Bolt-on and plug-in joint options",
          href: "/products/busbar/gs-super-compact",
        },
        {
          system: "GGD Medium Power",
          currentRange: "160–1000 A",
          conductorOptions: "Aluminium (GGD-A, up to 1000 A) or copper (GGD-C, up to 800 A)",
          role: "Medium-power distribution; rising mains and tap-off distribution",
          protectionNote: "One-bolt monoblock joint system",
          href: "/products/busbar/ggd-medium-power-busbar",
        },
        {
          system: "GR Cast Resin",
          currentRange: "500–6300 A",
          conductorOptions: "Aluminium (GR-A, up to 5000 A) or copper (GR-C, up to 6300 A)",
          role: "Considered where resin-insulated, IP68 construction is required by environment or specification",
          protectionNote: "IP68; welded-free elbow accessories",
          href: "/products/busbar/gr-cast-resin",
        },
      ],
    },
    whyBusbarHeading: "Why Busbar / Project Considerations",
    whyBusbar: [
      "Compact, high-current distribution in a smaller footprint than an equivalent cable bundle for the same current rating.",
      "Tap-off flexibility where supported, giving connection points along a run without additional branch cabling.",
      "Structured, serviceable installation — GGD's one-bolt monoblock joints and GS/GR's bolt-on and plug-in options keep a run inspectable and easy to extend.",
      "Dedicated transformer and switchboard connection options on GS for the main incoming power path.",
      "Conductor, current and environment selection — aluminium or copper conductor options and, where required, GR's IP68 resin-insulated construction let the system be matched to the project's specification.",
    ],
    checklistHeading: "Project Selection Checklist",
    checklist: [
      "Required current rating for the distribution run",
      "Conductor preference: aluminium or copper",
      "Route: main horizontal distribution or vertical riser",
      "Tap-off requirements along the run",
      "Transformer or switchboard connection requirements",
      "Installation environment and required protection/IP level",
      "Project documentation needed for specification",
    ],
    faqHeading: "Common Questions",
    faq: [
      {
        question: "What busbar systems are relevant to data centre projects?",
        answer:
          "GS Super Compact for high-current distribution and transformer/switchboard connections, GGD Medium Power for medium-power distribution, rising mains and tap-off, and GR Cast Resin where resin-insulated IP68 construction is required.",
      },
      {
        question: "Which Gersan system covers high-current data centre distribution?",
        answer:
          "GS Super Compact, rated 400–6300 A, is used for high-current distribution and transformer and switchboard connections.",
      },
      {
        question: "When is GGD relevant in a data centre?",
        answer:
          "GGD Medium Power (160–1000 A) is relevant for main horizontal distribution, vertical rising-main installations between floors, and downstream tap-off distribution.",
      },
      {
        question: "When would GR Cast Resin be considered?",
        answer:
          "GR Cast Resin (500–6300 A) is considered when the installation environment or project specification calls for fully resin-insulated, IP68 construction — for example in humid or corrosive conditions.",
      },
      {
        question: "Does InfraVolt manufacture Gersan busbar systems?",
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
        "The Data Centre Application Map is an interactive visual showing where Busbar and InfraVolt's other product families may be used across a data centre — from the utility intake and main electrical room to the server hall and cooling plant.",
      linkLabel: "Explore the Data Centre Application Map",
    },
    projectCta: {
      eyebrow: "PROJECT SUPPORT",
      title: "Planning Busbar Distribution for a Data Centre Project?",
      description:
        "Share your current requirement, installation environment and project stage with our technical team.",
      action: "Request Quote",
      actionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Request Technical Pack",
      secondaryActionHref: REQUEST_DOCUMENTATION_HREF,
    },
  },
  ua: {
    metadata: {
      title: "Шинопроводи для центрів обробки даних (ЦОД) | InfraVolt",
      description:
        "Силові шинопроводи Gersan для розподілу електроенергії в центрах обробки даних (ЦОД): GS високої потужності, GGD середньої потужності та GR з литою ізоляцією, з технічною підтримкою InfraVolt.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      busbar: "Магістральні та силові шинопроводи",
      current: "Шинопроводи для ЦОД",
    },
    entityStatement:
      "Gersan виробляє шинопровідні системи, представлені на цій сторінці. InfraVolt супроводжує проєкти у Великій Британії та Україні: підбір продукції, технічно-комерційна координація та обробка запитів.",
    hero: {
      eyebrow: "РОЗПОДІЛ ЖИВЛЕННЯ В ЦОД",
      title: "Шинопроводи для центрів обробки даних",
      description:
        "Силові шинопроводи Gersan — GS високої потужності, GGD середньої потужності та GR з литою ізоляцією — застосовуються для розподілу електроенергії в центрах обробки даних: від трансформаторних і щитових підключень до структурованого розподілу через відгалуження. InfraVolt забезпечує технічно-комерційну підтримку проєктів.",
      primaryAction: "Запросити комерційну пропозицію",
      primaryActionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Порівняти шинопровідні системи",
      secondaryActionHref: "#system-comparison",
      tertiaryAction: "Переглянути карту застосувань ЦОД",
      tertiaryActionHref: "/application-map",
    },
    directAnswer: {
      heading: "Які шинопроводи підходять для проєктів центрів обробки даних?",
      answer:
        "GS Super Compact (400–6300 А) застосовується для розподілу потужного струму та трансформаторних і щитових підключень. GGD середньої потужності (160–1000 А) застосовується для розподілу середньої потужності, магістральних вертикальних трас і розподілу через відгалуження. GR з литою ізоляцією (500–6300 А) розглядається, коли умови експлуатації або технічне завдання проєкту вимагають конструкції з литою ізоляцією класу IP68.",
    },
    useCasesHeading: "Типові застосування розподілу живлення в ЦОД",
    useCases: [
      {
        title: "Трансформаторно-щитові та головні високострумові підключення",
        description:
          "GS Super Compact забезпечує коротке високострумове з'єднання між трансформатором і вхідним щитом, з болтовими та роз'ємними варіантами з'єднання й спеціальним асортиментом трансформаторних і щитових компонентів підключення.",
      },
      {
        title: "Головний горизонтальний розподіл живлення",
        description:
          "GGD середньої потужності прокладається горизонтально від розподільних пристроїв до підключених розподільних щитів, з широким асортиментом ввідних, кутових, зміщувальних і компенсаційних компонентів.",
      },
      {
        title: "Вертикальний магістральний розподіл",
        description:
          "Спеціальні кронштейни GGD для вертикальних стояків підтримують магістральні (rising main) інсталяції, що розподіляють живлення поверх за поверхом через електротехнічний стояк.",
      },
      {
        title: "Розподіл через відгалуження",
        description:
          "Відгалужувальні компоненти GGD створюють точки підключення вздовж траси — наприклад, над рядами стійок або на кожному поверсі стояка — без додаткового кабелю до розподільного щита.",
      },
      {
        title: "Вологі та складні умови експлуатації",
        description:
          "Повністю залита смолою конструкція GR з литою ізоляцією класу IP68 розглядається для вологих, солоних чи корозійних умов — наприклад, у холодильному центрі чи насосній, — коли такий рівень захисту передбачено технічним завданням.",
      },
    ],
    comparison: {
      heading: "Порівняння систем",
      introduction:
        "Три шинопровідні системи Gersan застосовні до розподілу живлення в ЦОД, кожна — для свого діапазону струму й ролі. Жодна з них не є універсальною заміною інших.",
      columnLabels: {
        system: "Система",
        currentRange: "Діапазон струму",
        conductorOptions: "Варіанти провідника",
        role: "Роль у розподілі живлення ЦОД",
        protectionNote: "Конструкція / клас захисту",
        action: "Сторінка продукту",
      },
      rows: [
        {
          system: "GS Super Compact",
          currentRange: "400–6300 А",
          conductorOptions: "Алюміній (GSA) або мідь (GSC)",
          role: "Розподіл потужного струму; трансформаторні та щитові підключення",
          protectionNote: "Болтові та роз'ємні варіанти з'єднання",
          href: "/products/busbar/gs-super-compact",
        },
        {
          system: "GGD середньої потужності",
          currentRange: "160–1000 А",
          conductorOptions: "Алюміній (GGD-A, до 1000 А) або мідь (GGD-C, до 800 А)",
          role: "Розподіл середньої потужності; магістральні траси та відгалуження",
          protectionNote: "Моноблочне з'єднання на один болт",
          href: "/products/busbar/ggd-medium-power-busbar",
        },
        {
          system: "GR з литою ізоляцією",
          currentRange: "500–6300 А",
          conductorOptions: "Алюміній (GR-A, до 5000 А) або мідь (GR-C, до 6300 А)",
          role: "Розглядається, коли конструкція з литою ізоляцією класу IP68 вимагається умовами експлуатації чи технічним завданням",
          protectionNote: "IP68; беззварювальні кутові елементи",
          href: "/products/busbar/gr-cast-resin",
        },
      ],
    },
    whyBusbarHeading: "Чому шинопровід / проєктні міркування",
    whyBusbar: [
      "Компактний розподіл потужного струму в меншому об'ємі, ніж еквівалентний кабельний пучок на той самий струм.",
      "Гнучкість відгалужень там, де вона підтримується, — точки підключення вздовж траси без додаткового кабелю.",
      "Структурований, придатний для обслуговування монтаж — моноблочні з'єднання на один болт у GGD та болтові й роз'ємні варіанти у GS/GR полегшують огляд і розширення траси.",
      "Спеціальні варіанти трансформаторного та щитового підключення в GS для головної траси вводу живлення.",
      "Вибір провідника, струму та середовища експлуатації — алюмінієве або мідне виконання та, за потреби, залита смолою конструкція GR класу IP68 дозволяють підібрати систему під технічне завдання проєкту.",
    ],
    checklistHeading: "Чек-лист вибору для проєкту",
    checklist: [
      "Необхідний номінальний струм траси",
      "Матеріал провідника: алюміній чи мідь",
      "Траса: головний горизонтальний розподіл чи вертикальний стояк",
      "Вимоги до відгалужень уздовж траси",
      "Вимоги до трансформаторного чи щитового підключення",
      "Умови експлуатації та необхідний клас захисту (IP)",
      "Проєктна документація, необхідна для специфікації",
    ],
    faqHeading: "Поширені запитання",
    faq: [
      {
        question: "Які шинопроводи підходять для проєктів центрів обробки даних?",
        answer:
          "GS Super Compact — для розподілу потужного струму й трансформаторних/щитових підключень, GGD середньої потужності — для розподілу середньої потужності, магістральних трас і відгалужень, GR з литою ізоляцією — коли вимагається конструкція класу IP68.",
      },
      {
        question: "Яка система Gersan забезпечує розподіл потужного струму в ЦОД?",
        answer:
          "GS Super Compact, розрахований на 400–6300 А, застосовується для розподілу потужного струму та трансформаторних і щитових підключень.",
      },
      {
        question: "Коли GGD доречний у проєкті ЦОД?",
        answer:
          "GGD середньої потужності (160–1000 А) доречний для головного горизонтального розподілу, вертикальних магістральних інсталяцій між поверхами та розподілу через відгалуження.",
      },
      {
        question: "Коли розглядається GR з литою ізоляцією?",
        answer:
          "GR з литою ізоляцією (500–6300 А) розглядається, коли умови експлуатації або технічне завдання проєкту вимагають повністю залитої смолою конструкції класу IP68 — наприклад, у вологих чи корозійних умовах.",
      },
      {
        question: "Чи виробляє InfraVolt шинопровідні системи Gersan?",
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
        "Карта застосувань центру обробки даних — це інтерактивна візуалізація, яка показує, де шинопроводи та інші продуктові системи InfraVolt можуть застосовуватися в межах ЦОД — від вузла вводу живлення та головного електротехнічного приміщення до серверної зали й холодильного центру.",
      linkLabel: "Переглянути карту застосувань ЦОД",
    },
    projectCta: {
      eyebrow: "ПІДТРИМКА ПРОЄКТУ",
      title: "Плануєте розподіл живлення через шинопровід для проєкту ЦОД?",
      description:
        "Поділіться з нашою технічною командою поточними вимогами до струму, умовами монтажу та стадією проєкту.",
      action: "Запросити комерційну пропозицію",
      actionHref: REQUEST_QUOTE_HREF,
      secondaryAction: "Запросити технічний пакет",
      secondaryActionHref: REQUEST_DOCUMENTATION_HREF,
    },
  },
} as const satisfies Readonly<Record<MarketCode, DataCentreBusbarLandingContent>>;

export function dataCentreBusbarLandingContentForMarket(
  market: MarketCode,
): DataCentreBusbarLandingContent {
  return content[market];
}

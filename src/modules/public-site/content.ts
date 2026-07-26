import type { MarketCode } from "@/modules/markets/types";

type NavigationItem = Readonly<{
  href: `#${string}`;
  label: string;
}>;

type ContentCard = Readonly<{
  title: string;
  description: string;
}>;

type ProcessStep = ContentCard;

type SevenSystems = readonly [
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
];

type SixSectors = readonly [
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
];

type FourSteps = readonly [ProcessStep, ProcessStep, ProcessStep, ProcessStep];

export type PublicSiteContent = Readonly<{
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  shell: Readonly<{
    skipLink: string;
    navigationLabel: string;
    mobileNavigationLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    marketLabel: string;
    marketName: string;
    localeName: string;
    utilityMessage: string;
    brandDescriptor: string;
    navigation: readonly NavigationItem[];
    headerCta: NavigationItem;
    footerDescription: string;
    footerSystemsLabel: string;
    footerMarketLabel: string;
    footerRights: string;
  }>;
  hero: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: NavigationItem;
    secondaryAction: NavigationItem;
    diagramEyebrow: string;
    diagramTitle: string;
    diagramItems: readonly [string, string, string];
  }>;
  systems: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;
    items: SevenSystems;
  }>;
  sectors: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;
    items: SixSectors;
  }>;
  support: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;
    steps: FourSteps;
  }>;
  manufacturer: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    assurance: string;
    visualLabel: string;
  }>;
  contact: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: NavigationItem;
    secondaryAction: NavigationItem;
  }>;
}>;

// Sabit sözleşme, iki markette aynı zorunlu section ve item sayılarını derleme anında korur.
export const PUBLIC_SITE_CONTENT = {
  uk: {
    metadata: {
      title: "Electrical infrastructure systems | InfraVolt",
      description:
        "Electrical infrastructure product systems, technical coordination and project supply support for UK projects.",
    },
    shell: {
      skipLink: "Skip to main content",
      navigationLabel: "Primary navigation",
      mobileNavigationLabel: "Mobile navigation",
      openMenuLabel: "Open navigation menu",
      closeMenuLabel: "Close navigation menu",
      marketLabel: "Current market",
      marketName: "United Kingdom",
      localeName: "English",
      utilityMessage:
        "Electrical infrastructure systems for demanding project environments",
      brandDescriptor: "Electrical infrastructure",
      navigation: [
        { href: "#systems", label: "Product systems" },
        { href: "#sectors", label: "Sectors" },
        { href: "#support", label: "Project support" },
        { href: "#manufacturer", label: "Gersan systems" },
      ],
      headerCta: { href: "#contact", label: "Discuss a project" },
      footerDescription:
        "A focused route to electrical infrastructure systems, technical information and coordinated project supply.",
      footerSystemsLabel: "Explore",
      footerMarketLabel: "Market",
      footerRights: "InfraVolt. Project-owned content.",
    },
    hero: {
      eyebrow: "Electrical infrastructure · Project supply",
      title:
        "Electrical infrastructure systems for projects that cannot afford uncertainty.",
      description:
        "InfraVolt helps project teams navigate system selection, coordinate technical information and prepare electrical infrastructure requirements for a clear commercial response.",
      primaryAction: { href: "#systems", label: "Explore product systems" },
      secondaryAction: { href: "#contact", label: "Request project support" },
      diagramEyebrow: "Project pathway",
      diagramTitle: "From requirements to a coordinated response",
      diagramItems: [
        "System selection",
        "Technical coordination",
        "Project supply",
      ],
    },
    systems: {
      eyebrow: "Product systems",
      title: "A connected view of electrical infrastructure",
      introduction:
        "Explore the high-level system families intended for the InfraVolt catalogue. Technical specifications and availability will be published only from verified product sources.",
      items: [
        {
          title: "Busbar Systems",
          description:
            "Structured power distribution routes for commercial, industrial and infrastructure environments.",
        },
        {
          title: "Cable Support Systems",
          description:
            "Cable tray, ladder and support-system families for coordinated electrical routes.",
        },
        {
          title: "Distribution Panels",
          description:
            "Panel-system categories for organised electrical distribution requirements.",
        },
        {
          title: "Earthing and Lightning Protection",
          description:
            "System families supporting planned earthing and lightning-protection routes.",
        },
        {
          title: "Underfloor Systems",
          description:
            "Flexible service-distribution approaches for modern occupied spaces.",
        },
        {
          title: "Lighting Busbar and Industrial Lighting",
          description:
            "Electrical distribution and lighting-system categories for industrial settings.",
        },
        {
          title: "EV Charging Infrastructure",
          description:
            "Infrastructure categories for coordinated electric-vehicle charging projects.",
        },
      ],
    },
    sectors: {
      eyebrow: "Project environments",
      title: "Built around the way infrastructure projects are specified",
      introduction:
        "Different environments place different demands on routing, coordination and delivery. InfraVolt organises system discovery around the project context.",
      items: [
        {
          title: "Commercial Buildings",
          description:
            "Coordinated electrical routes for workplaces, mixed-use and high-occupancy buildings.",
        },
        {
          title: "Data Centres",
          description:
            "System discovery for dense, continuity-focused technical environments.",
        },
        {
          title: "Industrial Facilities",
          description:
            "Infrastructure categories for production, logistics and process environments.",
        },
        {
          title: "Transport and Infrastructure",
          description:
            "Project contexts spanning terminals, rail, public assets and connected infrastructure.",
        },
        {
          title: "Energy and Utilities",
          description:
            "Electrical-system pathways for energy and essential-service environments.",
        },
        {
          title: "Healthcare and Education",
          description:
            "Clear system coordination for complex public and institutional buildings.",
        },
      ],
    },
    support: {
      eyebrow: "Technical and project support",
      title: "A clear route from project need to commercial response",
      introduction:
        "The support process is designed to keep requirements, system options and technical information connected without implying design approval or certification services.",
      steps: [
        {
          title: "Share project requirements",
          description:
            "Outline the environment, programme and electrical infrastructure need.",
        },
        {
          title: "Review system options",
          description:
            "Identify relevant product-system families for further evaluation.",
        },
        {
          title: "Coordinate technical information",
          description:
            "Bring the available technical material into a structured project conversation.",
        },
        {
          title: "Prepare a commercial response",
          description:
            "Develop a clear supply response against the confirmed project scope.",
        },
      ],
    },
    manufacturer: {
      eyebrow: "Manufacturer systems",
      title: "Gersan electrical infrastructure systems",
      description:
        "The future InfraVolt catalogue is intended to present relevant Gersan electrical infrastructure system families in a clear, project-focused structure.",
      assurance:
        "Product details, documents, claims and media will appear only after their source, applicability and publication rights have been verified.",
      visualLabel: "Structured system information",
    },
    contact: {
      eyebrow: "Start with the project",
      title: "Bring clarity to your next infrastructure requirement.",
      description:
        "Review the project-support pathway and the system families relevant to your brief. A dedicated enquiry workflow will follow in its authorised delivery increment.",
      primaryAction: { href: "#support", label: "Review the support process" },
      secondaryAction: { href: "#systems", label: "Explore product systems" },
    },
  },
  ua: {
    metadata: {
      title: "Системи електричної інфраструктури | InfraVolt",
      description:
        "Системи електричної інфраструктури, координація технічної інформації та підтримка проєктного постачання для України.",
    },
    shell: {
      skipLink: "Перейти до основного вмісту",
      navigationLabel: "Основна навігація",
      mobileNavigationLabel: "Мобільна навігація",
      openMenuLabel: "Відкрити навігаційне меню",
      closeMenuLabel: "Закрити навігаційне меню",
      marketLabel: "Поточний ринок",
      marketName: "Україна",
      localeName: "Українська",
      utilityMessage:
        "Системи електричної інфраструктури для вимогливих проєктних середовищ",
      brandDescriptor: "Електрична інфраструктура",
      navigation: [
        { href: "#systems", label: "Системи продукції" },
        { href: "#sectors", label: "Галузі" },
        { href: "#support", label: "Підтримка проєктів" },
        { href: "#manufacturer", label: "Системи Gersan" },
      ],
      headerCta: { href: "#contact", label: "Обговорити проєкт" },
      footerDescription:
        "Зрозумілий шлях до систем електричної інфраструктури, технічної інформації та узгодженого проєктного постачання.",
      footerSystemsLabel: "Огляд",
      footerMarketLabel: "Ринок",
      footerRights: "InfraVolt. Вміст належить проєкту.",
    },
    hero: {
      eyebrow: "Електрична інфраструктура · Проєктне постачання",
      title:
        "Системи електричної інфраструктури для проєктів, у яких невизначеність неприпустима.",
      description:
        "InfraVolt допомагає проєктним командам орієнтуватися у виборі систем, узгоджувати технічну інформацію та формувати вимоги до електричної інфраструктури для чіткої комерційної відповіді.",
      primaryAction: { href: "#systems", label: "Оглянути системи продукції" },
      secondaryAction: { href: "#contact", label: "Запросити підтримку проєкту" },
      diagramEyebrow: "Шлях проєкту",
      diagramTitle: "Від вимог до узгодженої відповіді",
      diagramItems: [
        "Вибір систем",
        "Технічна координація",
        "Проєктне постачання",
      ],
    },
    systems: {
      eyebrow: "Системи продукції",
      title: "Цілісний погляд на електричну інфраструктуру",
      introduction:
        "Ознайомтеся з основними групами систем, запланованими для каталогу InfraVolt. Технічні характеристики та доступність публікуватимуться лише на основі перевірених джерел.",
      items: [
        {
          title: "Шинопровідні системи",
          description:
            "Структуровані рішення для розподілу електроенергії у комерційних, промислових та інфраструктурних середовищах.",
        },
        {
          title: "Системи кабельних трас",
          description:
            "Групи кабельних лотків, драбин і опор для узгодженого прокладання електричних мереж.",
        },
        {
          title: "Розподільні щити",
          description:
            "Категорії щитових систем для організованих потреб розподілу електроенергії.",
        },
        {
          title: "Заземлення та блискавкозахист",
          description:
            "Групи систем для запланованих контурів заземлення та блискавкозахисту.",
        },
        {
          title: "Підпідлогові системи",
          description:
            "Гнучкі підходи до розподілу інженерних мереж у сучасних приміщеннях.",
        },
        {
          title: "Освітлювальні шинопроводи та промислове освітлення",
          description:
            "Категорії систем електророзподілу та освітлення для промислових середовищ.",
        },
        {
          title: "Інфраструктура заряджання електромобілів",
          description:
            "Категорії інфраструктури для узгоджених проєктів заряджання електромобілів.",
        },
      ],
    },
    sectors: {
      eyebrow: "Проєктні середовища",
      title: "Відповідно до логіки проєктування інфраструктурних об’єктів",
      introduction:
        "Кожне середовище має власні вимоги до прокладання мереж, координації та постачання. InfraVolt організовує пошук систем навколо контексту проєкту.",
      items: [
        {
          title: "Комерційні будівлі",
          description:
            "Узгоджені електричні мережі для офісних, багатофункціональних і завантажених будівель.",
        },
        {
          title: "Центри обробки даних",
          description:
            "Пошук систем для щільних технічних середовищ із фокусом на безперервності.",
        },
        {
          title: "Промислові об’єкти",
          description:
            "Категорії інфраструктури для виробничих, логістичних і технологічних середовищ.",
        },
        {
          title: "Транспорт та інфраструктура",
          description:
            "Контексти проєктів для терміналів, залізниці, громадських і пов’язаних інфраструктурних об’єктів.",
        },
        {
          title: "Енергетика та комунальна інфраструктура",
          description:
            "Шляхи вибору електричних систем для енергетики та критично важливих сервісів.",
        },
        {
          title: "Охорона здоров’я та освіта",
          description:
            "Чітка координація систем для складних громадських та інституційних будівель.",
        },
      ],
    },
    support: {
      eyebrow: "Технічна та проєктна підтримка",
      title: "Зрозумілий шлях від потреби проєкту до комерційної відповіді",
      introduction:
        "Процес підтримки поєднує вимоги, варіанти систем і технічну інформацію, не створюючи враження надання послуг із затвердження проєкту чи сертифікації.",
      steps: [
        {
          title: "Поділіться вимогами проєкту",
          description:
            "Окресліть середовище, графік і потреби електричної інфраструктури.",
        },
        {
          title: "Розгляньте варіанти систем",
          description:
            "Визначте відповідні групи систем продукції для подальшого опрацювання.",
        },
        {
          title: "Узгодьте технічну інформацію",
          description:
            "Структуруйте доступні технічні матеріали для предметного обговорення проєкту.",
        },
        {
          title: "Підготуйте комерційну відповідь",
          description:
            "Сформуйте чітку пропозицію постачання відповідно до підтвердженого обсягу проєкту.",
        },
      ],
    },
    manufacturer: {
      eyebrow: "Системи виробника",
      title: "Системи електричної інфраструктури Gersan",
      description:
        "Майбутній каталог InfraVolt має представити відповідні групи систем електричної інфраструктури Gersan у зрозумілій структурі, орієнтованій на потреби проєкту.",
      assurance:
        "Деталі продукції, документи, твердження та медіа з’являться лише після перевірки джерел, застосовності та прав на публікацію.",
      visualLabel: "Структурована інформація про системи",
    },
    contact: {
      eyebrow: "Почніть із проєкту",
      title: "Додайте ясності наступній інфраструктурній вимозі.",
      description:
        "Ознайомтеся зі шляхом проєктної підтримки та групами систем, що відповідають вашому запиту. Окремий процес звернення буде реалізовано у відповідному авторизованому етапі.",
      primaryAction: { href: "#support", label: "Переглянути процес підтримки" },
      secondaryAction: { href: "#systems", label: "Оглянути системи продукції" },
    },
  },
} as const satisfies Readonly<Record<MarketCode, PublicSiteContent>>;

export function publicSiteContentForMarket(
  market: MarketCode,
): PublicSiteContent {
  return PUBLIC_SITE_CONTENT[market];
}

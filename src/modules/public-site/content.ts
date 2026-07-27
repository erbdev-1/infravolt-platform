import type {
  CapabilityId,
  IndustryId,
  ProductId,
} from "@/modules/public-site/assets";
import type { MarketCode } from "@/modules/markets/types";

type AnchorLink = Readonly<{
  href: `#${string}`;
  label: string;
}>;

type ExternalLink = Readonly<{
  href: `https://${string}`;
  label: string;
  accessibleLabel: string;
}>;

type ContentCard = Readonly<{
  title: string;
  description: string;
}>;

type CapabilityItem = Readonly<{
  id: CapabilityId;
  title: string;
}>;

type ProductItem = ContentCard &
  Readonly<{
    id: ProductId;
    imageAlt: string;
  }>;

type IndustryItem = ContentCard &
  Readonly<{
    id: IndustryId;
    imageAlt: string;
  }>;

type Navigation = readonly [
  AnchorLink,
  AnchorLink,
  AnchorLink,
  AnchorLink,
  AnchorLink,
  AnchorLink,
  AnchorLink,
  AnchorLink,
];

type FourCapabilities = readonly [
  CapabilityItem,
  CapabilityItem,
  CapabilityItem,
  CapabilityItem,
];

type SixProducts = readonly [
  ProductItem,
  ProductItem,
  ProductItem,
  ProductItem,
  ProductItem,
  ProductItem,
];

type EightIndustries = readonly [
  IndustryItem,
  IndustryItem,
  IndustryItem,
  IndustryItem,
  IndustryItem,
  IndustryItem,
  IndustryItem,
  IndustryItem,
];

type FourSteps = readonly [ContentCard, ContentCard, ContentCard, ContentCard];

type ThreeFacts = readonly [ContentCard, ContentCard, ContentCard];

type FiveDocumentTypes = readonly [string, string, string, string, string];

export type PublicSiteContent = Readonly<{
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  shell: Readonly<{
    navigationLabel: string;
    mobileNavigationLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    marketLabel: string;
    marketName: string;
    localeName: string;
    brandDescriptor: string;
    relationshipLabel?: string;
    navigation: Navigation;
    footerDescription: string;
    footerProductLabel: string;
    footerResourceLabel: string;
    footerCompanyLabel: string;
    footerProducts: readonly AnchorLink[];
    footerResources: readonly AnchorLink[];
    footerCompany: readonly AnchorLink[];
    footerMarketLabel: string;
  }>;
  hero: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    relationshipLabel?: string;
    primaryAction: AnchorLink;
    secondaryAction: AnchorLink;
    videoLabel: string;
    playLabel: string;
    pauseLabel: string;
    fallback: string;
  }>;
  capabilities: FourCapabilities;
  products: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;
    items: SixProducts;
  }>;
  industries: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;
    imageDisclosure: string;
    items: EightIndustries;
  }>;
  applicationMap: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    connections: readonly [string, string, string];
    action: AnchorLink;
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
    mediaOwnership: string;
    videoLabel: string;
    playLabel: string;
    pauseLabel: string;
    fallback: string;
    facts: ThreeFacts;
    listingLabel: string;
    listingStatement: string;
    internalAction: AnchorLink;
    externalAction: ExternalLink;
  }>;
  technicalDocuments: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    items: FiveDocumentTypes;
    action: AnchorLink;
  }>;
  contact: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: AnchorLink;
    secondaryAction: AnchorLink;
  }>;
  certifications: Readonly<{
    title: string;
    description: string;
    markLabelSuffix: string;
    scopeNote: string;
  }>;
}>;

// Sabit tuple sözleşmeleri, iki markette zorunlu bölüm ve öğe paritesini derleme anında korur.
export const PUBLIC_SITE_CONTENT = {
  uk: {
    metadata: {
      title: "Electrical infrastructure systems and project supply | InfraVolt",
      description:
        "Gersan electrical infrastructure systems, technical documentation and project-support coordination for the UK market.",
    },
    shell: {
      navigationLabel: "Primary navigation",
      mobileNavigationLabel: "Mobile navigation",
      openMenuLabel: "Open navigation menu",
      closeMenuLabel: "Close navigation menu",
      marketLabel: "Market",
      marketName: "United Kingdom",
      localeName: "en-GB",
      brandDescriptor: "Electrical infrastructure",
      relationshipLabel: "Official UK Representative",
      navigation: [
        { href: "#top", label: "Home" },
        { href: "#about-gersan", label: "About" },
        { href: "#product-systems", label: "Gersan Products" },
        { href: "#industries", label: "Industries" },
        { href: "#technical-documents", label: "Technical Documents" },
        { href: "#contact", label: "Dealer / Trade Account" },
        { href: "#project-support", label: "Project Support" },
        { href: "#contact", label: "Contact" },
      ],
      footerDescription:
        "Electrical infrastructure systems, technical documentation and coordinated project-supply support for the UK market.",
      footerProductLabel: "Product Systems",
      footerResourceLabel: "Project Resources",
      footerCompanyLabel: "Company",
      footerProducts: [
        { href: "#product-systems", label: "Busbar Systems" },
        { href: "#product-systems", label: "Cable Management" },
        {
          href: "#product-systems",
          label: "Earthing & Lightning Protection",
        },
        { href: "#product-systems", label: "Distribution Systems" },
      ],
      footerResources: [
        { href: "#industries", label: "Industries" },
        { href: "#technical-documents", label: "Technical Documents" },
        { href: "#project-support", label: "Project Support" },
        { href: "#contact", label: "Dealer / Trade Account" },
      ],
      footerCompany: [
        { href: "#about-gersan", label: "About" },
        { href: "#contact", label: "Contact" },
      ],
      footerMarketLabel: "Serving",
    },
    hero: {
      eyebrow: "Electrical infrastructure • Project supply",
      title: "Electrical infrastructure systems for demanding projects.",
      description:
        "InfraVolt supplies Gersan busbar, cable management, earthing, distribution and project-support solutions for the UK market.",
      relationshipLabel: "Official UK Representative",
      primaryAction: {
        href: "#product-systems",
        label: "Explore Product Systems",
      },
      secondaryAction: {
        href: "#project-support",
        label: "Request Project Support",
      },
      videoLabel: "Gersan electrical infrastructure manufacturing overview",
      playLabel: "Play homepage video",
      pauseLabel: "Pause homepage video",
      fallback:
        "The manufacturing overview video is unavailable. The poster image remains visible.",
    },
    capabilities: [
      { id: "documentation", title: "Technical Documentation" },
      { id: "project-support", title: "Project Support" },
      { id: "specification", title: "Specification Assistance" },
      { id: "market", title: "UK Market Coverage" },
    ],
    products: {
      eyebrow: "Product systems",
      title: "Electrical infrastructure, organised around the project",
      introduction:
        "Explore the principal system families available for project review. Detailed performance, compliance and availability information remains controlled by verified product documentation.",
      items: [
        {
          id: "busbar",
          title: "Busbar Systems",
          description:
            "Structured power-distribution systems for commercial, industrial and infrastructure environments.",
          imageAlt: "Gersan busbar trunking system product view",
        },
        {
          id: "cable-management",
          title: "Cable Tray & Ladder Systems",
          description:
            "Cable-management routes for coordinated power, control and data installations.",
          imageAlt: "Gersan cable tray system product view",
        },
        {
          id: "earthing-lightning",
          title: "Earthing & Lightning Protection",
          description:
            "System families for planned earthing, bonding and lightning-protection requirements.",
          imageAlt: "Earthing and bonding system components",
        },
        {
          id: "underfloor",
          title: "Underfloor Systems",
          description:
            "Flexible service-distribution pathways for modern occupied spaces.",
          imageAlt:
            "Representative support-system components for underfloor service routes",
        },
        {
          id: "led-bus lighting",
          title: "Lighting & Automation Systems",
          description:
            "LED-BUS lighting distribution and G-BUS automation for switching, dimming, scheduling and intelligent control.",
          imageAlt: "Lighting busbar and luminaire product view",
        },
        {
          id: "ev-charging",
          title: "EV Charging Systems",
          description:
            "AC and DC electric vehicle charging solutions for commercial, residential and infrastructure projects.",
          imageAlt: "Gersan electric vehicle charging systems",
        },
      ],
    },
    industries: {
      eyebrow: "Industries we serve",
      title: "Infrastructure systems shaped by the operating environment",
      introduction:
        "Each project environment brings different routing, continuity, access and documentation needs. These sector views help frame the right system conversation.",
      imageDisclosure:
        "Illustrative application view — not an InfraVolt project photograph.",
      items: [
        {
          id: "data-centres",
          title: "Data Centres",
          description:
            "System coordination for dense, continuity-focused technical environments.",
          imageAlt:
            "Illustrative data-centre server hall showing electrical service routes",
        },
        {
          id: "commercial-buildings",
          title: "Commercial Buildings",
          description:
            "Adaptable electrical pathways for workplaces and mixed-use buildings.",
          imageAlt:
            "Illustrative commercial office floor showing electrical service routes",
        },
        {
          id: "industrial-facilities",
          title: "Industrial Facilities",
          description:
            "Robust routing and distribution contexts for production environments.",
          imageAlt:
            "Illustrative industrial production line showing electrical infrastructure",
        },
        {
          id: "infrastructure-utilities",
          title: "Infrastructure & Utilities",
          description:
            "Coordinated system contexts for essential services and public assets.",
          imageAlt:
            "Illustrative utilities pumping station showing electrical systems",
        },
        {
          id: "renewable-energy",
          title: "Renewable Energy",
          description:
            "Electrical protection and routing contexts for renewable installations.",
          imageAlt:
            "Illustrative solar installation with electrical enclosure and cable routes",
        },
        {
          id: "healthcare",
          title: "Healthcare",
          description:
            "Clear infrastructure coordination for complex clinical environments.",
          imageAlt:
            "Illustrative healthcare ward showing electrical distribution routes",
        },
        {
          id: "transport-infrastructure",
          title: "Transport Infrastructure",
          description:
            "System discovery for terminals and connected transport environments.",
          imageAlt:
            "Illustrative airport public concourse showing electrical service routes",
        },
        {
          id: "education-public-sector",
          title: "Education & Public Sector",
          description:
            "Adaptable electrical pathways for institutional and civic buildings.",
          imageAlt:
            "Illustrative education library showing electrical service routes",
        },
      ],
    },
    applicationMap: {
      eyebrow: "Application map",
      title: "Connect each project zone to suitable system families",
      description:
        "Application mapping brings the building environment, electrical routes and relevant product-system families into one structured project view.",
      connections: [
        "Select the project environment",
        "Review critical electrical zones",
        "Identify systems for detailed evaluation",
      ],
      action: { href: "#industries", label: "Explore Applications" },
    },
    support: {
      eyebrow: "Technical project support",
      title: "A structured pathway from requirement to supply planning",
      introduction:
        "InfraVolt coordinates product selection and technical information without implying regulated design approval, certification or installation services.",
      steps: [
        {
          title: "Understand project requirements",
          description:
            "Establish the environment, programme and electrical infrastructure brief.",
        },
        {
          title: "Select suitable product systems",
          description:
            "Identify relevant system families for technical and commercial review.",
        },
        {
          title: "Coordinate technical documentation",
          description:
            "Bring available product information into a controlled project process.",
        },
        {
          title: "Support quotation and supply planning",
          description:
            "Prepare the confirmed scope for a clear commercial response.",
        },
      ],
    },
    manufacturer: {
      eyebrow: "Manufacturing partner",
      title: "Established manufacturing capability behind every system",
      description:
        "For more than 45 years, Gersan has developed electrical infrastructure systems and materials designed to carry, connect and protect electrical conductors across demanding applications.",
      mediaOwnership:
        "Factory facilities, production footage and manufacturing capabilities shown here belong to Gersan Elektrik Ticaret ve Sanayi A.Ş., not InfraVolt.",
      videoLabel: "Gersan factory and production overview",
      playLabel: "Play Gersan manufacturing video",
      pauseLabel: "Pause Gersan manufacturing video",
      fallback:
        "The Gersan manufacturing video is unavailable. The poster image remains visible.",
      facts: [
        {
          title: "45+ Years",
          description: "Electrical systems manufacturing experience",
        },
        {
          title: "Borsa İstanbul",
          description: "Publicly listed as GEREL",
        },
        {
          title: "Certified Operations",
          description: "ISO 9001 • ISO 14001 • ISO 45001",
        },
      ],
      listingLabel: "Publicly listed industrial manufacturer",
      listingStatement:
        "Gersan Elektrik Ticaret ve Sanayi A.Ş. is listed on Borsa İstanbul under the ticker GEREL.",
      internalAction: { href: "#product-systems", label: "Explore Gersan" },
      externalAction: {
        href: "https://kap.org.tr/tr/sirket-finansal-bilgileri/964-gersan-elektrik-ticaret-ve-sanayi-a-s",
        label: "View Official Disclosures",
        accessibleLabel:
          "View official Gersan disclosures on the external KAP website (opens in a new tab)",
      },
    },
    technicalDocuments: {
      eyebrow: "Controlled document support",
      title: "Technical information aligned to the project",
      description:
        "Project-specific technical material is provided through a controlled document process so that source, applicability and version can be checked.",
      items: [
        "Datasheets",
        "Product certificates",
        "Test documentation",
        "Installation guidance",
        "BIM / CAD resources",
      ],
      action: {
        href: "#contact",
        label: "Request Technical Documentation",
      },
    },
    contact: {
      eyebrow: "Project enquiry",
      title: "Planning an electrical infrastructure project?",
      description:
        "Share your system requirements, project stage and documentation needs with the InfraVolt team.",
      primaryAction: {
        href: "#project-support",
        label: "Request Project Support",
      },
      secondaryAction: {
        href: "#footer-company",
        label: "Contact InfraVolt",
      },
    },
    certifications: {
      title: "Quality you can rely on",
      description:
        "Selected Gersan systems are supported by verified manufacturer and product documentation.",
      markLabelSuffix: "Gersan manufacturer or relevant product documentation",
      scopeNote:
        "Applicability varies by system. LOVAG–ACAE applies only to relevant tested Gersan busbar ranges.",
    },
  },
  ua: {
    metadata: {
      title:
        "Системи електричної інфраструктури та проєктне постачання | InfraVolt",
      description:
        "Системи електричної інфраструктури Gersan, технічна документація та підтримка проєктного постачання для України.",
    },
    shell: {
      navigationLabel: "Основна навігація",
      mobileNavigationLabel: "Мобільна навігація",
      openMenuLabel: "Відкрити навігаційне меню",
      closeMenuLabel: "Закрити навігаційне меню",
      marketLabel: "Ринок",
      marketName: "Україна",
      localeName: "uk-UA",
      brandDescriptor: "Електрична інфраструктура",
      navigation: [
        { href: "#top", label: "Головна" },
        { href: "#about-gersan", label: "Про Gersan" },
        { href: "#product-systems", label: "Продукція Gersan" },
        { href: "#industries", label: "Галузі" },
        { href: "#technical-documents", label: "Технічні документи" },
        { href: "#contact", label: "Дилерам / Торговий акаунт" },
        { href: "#project-support", label: "Підтримка проєктів" },
        { href: "#contact", label: "Контакти" },
      ],
      footerDescription:
        "Системи електричної інфраструктури, технічна документація та узгоджена підтримка проєктного постачання для України.",
      footerProductLabel: "Системи продукції",
      footerResourceLabel: "Ресурси для проєктів",
      footerCompanyLabel: "Компанія",
      footerProducts: [
        { href: "#product-systems", label: "Шинопровідні системи" },
        { href: "#product-systems", label: "Кабельні траси" },
        {
          href: "#product-systems",
          label: "Заземлення та блискавкозахист",
        },
        { href: "#product-systems", label: "Системи розподілу" },
      ],
      footerResources: [
        { href: "#industries", label: "Галузі" },
        { href: "#technical-documents", label: "Технічні документи" },
        { href: "#project-support", label: "Підтримка проєктів" },
        { href: "#contact", label: "Дилерам / Торговий акаунт" },
      ],
      footerCompany: [
        { href: "#about-gersan", label: "Про Gersan" },
        { href: "#contact", label: "Контакти" },
      ],
      footerMarketLabel: "Ринок",
    },
    hero: {
      eyebrow: "Електрична інфраструктура • Проєктне постачання",
      title: "Системи електричної інфраструктури для складних проєктів.",
      description:
        "InfraVolt допомагає проєктним командам в Україні добирати шинопровідні системи Gersan, кабельні траси, рішення для заземлення, розподілу електроенергії та технічної підтримки.",
      primaryAction: {
        href: "#product-systems",
        label: "Оглянути системи продукції",
      },
      secondaryAction: {
        href: "#project-support",
        label: "Запросити підтримку проєкту",
      },
      videoLabel: "Огляд виробництва систем електричної інфраструктури Gersan",
      playLabel: "Відтворити відео на головній сторінці",
      pauseLabel: "Призупинити відео на головній сторінці",
      fallback:
        "Відео про виробництво недоступне. Зображення постера залишається видимим.",
    },
    capabilities: [
      { id: "documentation", title: "Технічна документація" },
      { id: "project-support", title: "Підтримка проєктів" },
      { id: "specification", title: "Підтримка специфікацій" },
      { id: "market", title: "Орієнтація на українські проєкти" },
    ],
    products: {
      eyebrow: "Системи продукції",
      title: "Електрична інфраструктура в контексті проєкту",
      introduction:
        "Ознайомтеся з основними групами систем для проєктного опрацювання. Детальні дані про характеристики, відповідність і доступність надаються лише з перевіреної документації.",
      items: [
        {
          id: "busbar",
          title: "Шинопровідні системи",
          description:
            "Структурований розподіл електроенергії для комерційних, промислових та інфраструктурних об’єктів.",
          imageAlt: "Вигляд шинопровідної системи Gersan",
        },
        {
          id: "cable-management",
          title: "Кабельні лотки та драбини",
          description:
            "Кабельні траси для узгодженого прокладання силових, контрольних та інформаційних мереж.",
          imageAlt: "Вигляд кабельного лотка Gersan",
        },
        {
          id: "earthing-lightning",
          title: "Заземлення та блискавкозахист",
          description:
            "Групи систем для запланованих контурів заземлення, зрівнювання потенціалів і блискавкозахисту.",
          imageAlt: "Компоненти системи заземлення та зрівнювання потенціалів",
        },
        {
          id: "underfloor",
          title: "Підпідлогові системи",
          description:
            "Гнучкі шляхи розподілу інженерних мереж у сучасних приміщеннях.",
          imageAlt:
            "Приклад опорних компонентів для підпідлогових інженерних трас",
        },
        {
          id: "led-bus lighting",
          title: "Системи освітлення та автоматизації",
          description:
            "Системи LED-BUS та автоматизація G-BUS для керування, димування, планування й інтелектуального контролю освітлення.",
          imageAlt: "Вигляд освітлювального шинопроводу та світильника",
        },
        {
          id: "ev-charging",
          title: "Системи заряджання електромобілів",
          description:
            "Рішення для заряджання електромобілів змінним і постійним струмом для комерційних, житлових та інфраструктурних проєктів.",
          imageAlt: "Системи заряджання електромобілів Gersan",
        },
      ],
    },
    industries: {
      eyebrow: "Галузі застосування",
      title: "Системи відповідно до умов експлуатації об’єкта",
      introduction:
        "Кожне проєктне середовище має власні вимоги до прокладання мереж, безперервності, доступу й документації. Галузеві приклади допомагають визначити контекст систем.",
      imageDisclosure:
        "Ілюстративне зображення застосування — не фотографія проєкту InfraVolt.",
      items: [
        {
          id: "data-centres",
          title: "Центри обробки даних",
          description:
            "Координація систем для щільних технічних середовищ із фокусом на безперервності.",
          imageAlt:
            "Ілюстративний серверний зал із маршрутами інженерних мереж",
        },
        {
          id: "commercial-buildings",
          title: "Комерційні будівлі",
          description:
            "Адаптивні електричні траси для офісних і багатофункціональних будівель.",
          imageAlt:
            "Ілюстративний офісний поверх із маршрутами інженерних мереж",
        },
        {
          id: "industrial-facilities",
          title: "Промислові об’єкти",
          description:
            "Контексти прокладання мереж і розподілу електроенергії у виробничих середовищах.",
          imageAlt:
            "Ілюстративна виробнича лінія з електричною інфраструктурою",
        },
        {
          id: "infrastructure-utilities",
          title: "Інфраструктура та комунальні об’єкти",
          description:
            "Узгоджені системні контексти для критичних сервісів і громадських активів.",
          imageAlt: "Ілюстративна насосна станція з електричними системами",
        },
        {
          id: "renewable-energy",
          title: "Відновлювана енергетика",
          description:
            "Контексти електричного захисту й прокладання мереж для відновлюваної енергетики.",
          imageAlt:
            "Ілюстративна сонячна установка з електричною шафою та кабельними трасами",
        },
        {
          id: "healthcare",
          title: "Охорона здоров’я",
          description:
            "Чітка координація інфраструктури для складних клінічних середовищ.",
          imageAlt:
            "Ілюстративна лікарняна палата з маршрутами електричних мереж",
        },
        {
          id: "transport-infrastructure",
          title: "Транспортна інфраструктура",
          description:
            "Пошук систем для терміналів і пов’язаних транспортних середовищ.",
          imageAlt:
            "Ілюстративний пасажирський простір аеропорту з інженерними мережами",
        },
        {
          id: "education-public-sector",
          title: "Освіта та громадський сектор",
          description:
            "Адаптивні електричні шляхи для освітніх і громадських будівель.",
          imageAlt: "Ілюстративна бібліотека з маршрутами інженерних мереж",
        },
      ],
    },
    applicationMap: {
      eyebrow: "Карта застосувань",
      title: "Поєднайте зони проєкту з відповідними групами систем",
      description:
        "Карта застосувань об’єднує середовище будівлі, маршрути електричних мереж і відповідні групи продукції в одному структурованому огляді.",
      connections: [
        "Оберіть проєктне середовище",
        "Перегляньте критичні електричні зони",
        "Визначте системи для детального опрацювання",
      ],
      action: { href: "#industries", label: "Оглянути застосування" },
    },
    support: {
      eyebrow: "Технічна підтримка проєктів",
      title: "Структурований шлях від вимог до планування постачання",
      introduction:
        "InfraVolt координує вибір продукції та технічну інформацію, не створюючи враження надання регульованих послуг із затвердження проєкту, сертифікації чи монтажу.",
      steps: [
        {
          title: "Зрозуміти вимоги проєкту",
          description:
            "Визначити середовище, програму та потреби електричної інфраструктури.",
        },
        {
          title: "Обрати відповідні системи",
          description:
            "Відібрати групи систем для технічного й комерційного опрацювання.",
        },
        {
          title: "Узгодити технічну документацію",
          description:
            "Організувати доступну інформацію про продукцію в контрольованому проєктному процесі.",
        },
        {
          title: "Підтримати планування пропозиції та постачання",
          description:
            "Підготувати підтверджений обсяг для чіткої комерційної відповіді.",
        },
      ],
    },
    manufacturer: {
      eyebrow: "Виробничий партнер",
      title: "Перевірені виробничі можливості для кожної системи",
      description:
        "Понад 45 років Gersan розробляє системи та матеріали електричної інфраструктури для передавання, з’єднання й захисту електричних провідників у складних сферах застосування.",
      mediaOwnership:
        "Показані виробничі об’єкти, кадри та можливості належать Gersan Elektrik Ticaret ve Sanayi A.Ş., а не InfraVolt.",
      videoLabel: "Огляд виробничих об’єктів і процесів Gersan",
      playLabel: "Відтворити відео про виробництво Gersan",
      pauseLabel: "Призупинити відео про виробництво Gersan",
      fallback:
        "Відео про виробництво Gersan недоступне. Зображення постера залишається видимим.",
      facts: [
        {
          title: "45+ років",
          description: "Досвід виробництва електричних систем",
        },
        {
          title: "Borsa İstanbul",
          description: "Публічна компанія з тикером GEREL",
        },
        {
          title: "Сертифіковані операції",
          description: "ISO 9001 • ISO 14001 • ISO 45001",
        },
      ],
      listingLabel: "Публічна промислова компанія",
      listingStatement:
        "Gersan Elektrik Ticaret ve Sanayi A.Ş. котирується на Borsa İstanbul під тикером GEREL.",
      internalAction: { href: "#product-systems", label: "Оглянути Gersan" },
      externalAction: {
        href: "https://kap.org.tr/tr/sirket-finansal-bilgileri/964-gersan-elektrik-ticaret-ve-sanayi-a-s",
        label: "Офіційні розкриття",
        accessibleLabel:
          "Переглянути офіційні розкриття Gersan на зовнішньому сайті KAP (відкриється в новій вкладці)",
      },
    },
    technicalDocuments: {
      eyebrow: "Контрольована технічна підтримка",
      title: "Технічна інформація відповідно до потреб проєкту",
      description:
        "Матеріали для конкретного проєкту надаються через контрольований процес, щоб перевірити джерело, застосовність і версію документа.",
      items: [
        "Технічні паспорти",
        "Сертифікати продукції",
        "Протоколи випробувань",
        "Настанови з монтажу",
        "Ресурси BIM / CAD",
      ],
      action: {
        href: "#contact",
        label: "Запросити технічну документацію",
      },
    },
    contact: {
      eyebrow: "Проєктний запит",
      title: "Плануєте проєкт електричної інфраструктури?",
      description:
        "Повідомте команді InfraVolt про потрібні системи, стадію проєкту та вимоги до документації.",
      primaryAction: {
        href: "#project-support",
        label: "Запросити підтримку проєкту",
      },
      secondaryAction: {
        href: "#footer-company",
        label: "Зв’язатися з InfraVolt",
      },
    },
    certifications: {
      title: "Якість, на яку можна покластися",
      description:
        "Окремі системи Gersan підтверджені документацією виробника та продукції.",
      markLabelSuffix:
        "документація виробника Gersan або відповідної продукції",
      scopeNote:
        "Застосовність залежить від системи. LOVAG–ACAE стосується лише відповідних випробуваних шинопровідних систем Gersan.",
    },
  },
} as const satisfies Readonly<Record<MarketCode, PublicSiteContent>>;

export function publicSiteContentForMarket(
  market: MarketCode,
): PublicSiteContent {
  return PUBLIC_SITE_CONTENT[market];
}

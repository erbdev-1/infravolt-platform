import type {
  CapabilityId,
  IndustryId,
  ProductId,
} from "@/modules/public-site/assets";
import type { MarketCode } from "@/modules/markets/types";

type AnchorLink = Readonly<{
  href: `#${string}` | `/${string}`;
  label: string;
}>;

type PageLink = Readonly<{
  href: `/${string}`;
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

type SupportServiceId = "engineering" | "warehouse" | "showroom" | "logistics";

type SupportService = ContentCard &
  Readonly<{
    id: SupportServiceId;
    points: readonly string[];
  }>;

type FourSupportServices = readonly [
  SupportService,
  SupportService,
  SupportService,
  SupportService,
];

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

type FiveFacts = readonly [
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
];
type FiveTechnicalDocumentItems = readonly [
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
  ContentCard,
];

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
    actionLabel: string;
    imageDisclosure: string;
    items: EightIndustries;
  }>;
  applicationMap: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    previewTitle: string;
    previewZones: readonly [string, string, string];
    connections: readonly [string, string, string];
    action: PageLink;
  }>;

  support: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;

    showroom: Readonly<{
      eyebrow: string;
      title: string;
      description: string;
      status: string;
      imageAlt: string;
    }>;

    warehouse: Readonly<{
      eyebrow: string;
      title: string;
      description: string;
      status: string;
      imageAlt: string;
    }>;

    services: FourSupportServices;

    overviewAction: AnchorLink;
    primaryAction: AnchorLink;
    secondaryAction: AnchorLink;

    disclaimer: string;
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
    facts: FiveFacts;
    factoryImageAlt: string;
    facilityLabel: string;
    qualityLabel: string;
    qualityNote: string;
    listingLabel: string;
    listingStatement: string;
    internalAction: AnchorLink;
    externalAction: ExternalLink;
  }>;
  technicalDocuments: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    items: FiveTechnicalDocumentItems;
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
        { href: "/uk-support", label: "UK Support" },
        { href: "#contact", label: "Dealer / Trade Account" },
        { href: "#technical-documents", label: "Resources" },
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
      actionLabel: "View application map",
      imageDisclosure:
        "Sector image shown for application context — not presented as an InfraVolt-delivered project.",
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
      eyebrow: "Featured application map",
      title: "See how electrical systems connect across a Data Centre",
      description:
        "Explore critical project zones, review relevant Gersan system families and move from the building environment to suitable technical solutions.",
      previewTitle: "Data Centre",
      previewZones: ["Overview", "Gray Space", "White Space"],
      connections: [
        "Select a project zone",
        "Review relevant Gersan system families",
        "Request technical support",
      ],
      action: {
        href: "/applications/data-centres",
        label: "Open Data Centre Application Map",
      },
    },

    support: {
      eyebrow: "UK support & operations",

      title:
        "Local technical support backed by showroom, stock and supply capability",

      introduction:
        "InfraVolt is developing a UK support platform for Gersan electrical infrastructure systems, combining product-level engineering support, physical product demonstrations, stock planning and coordinated project delivery.",

      showroom: {
        eyebrow: "Showroom concept",
        title: "UK showroom & technical demonstration",
        description:
          "A planned environment for reviewing Gersan systems, accessories and installation concepts across busbar, cable support, earthing, underfloor, lighting, automation and EV charging applications.",
        status:
          "Planned showroom concept — opening and appointment details will be announced.",
        imageAlt:
          "Concept visual of a Gersan and InfraVolt electrical infrastructure showroom",
      },

      warehouse: {
        eyebrow: "UK operations base",
        title: "Stock, warehouse and project call-off planning",
        description:
          "A proposed UK operations location supporting stock planning, project reservations, phased call-offs and coordinated delivery for confirmed project requirements.",
        status:
          "Proposed operations facility — stock profile and operational dates are being finalised.",
        imageAlt:
          "Exterior view of the proposed UK stock and operations facility",
      },

      services: [
        {
          id: "engineering",
          title: "Engineering & specification support",
          description:
            "Product-level review of drawings, BOQ, specifications and project requirements.",
          points: [
            "System and accessory matching",
            "Technical submittal coordination",
            "CAD and BIM document support",
          ],
        },
        {
          id: "warehouse",
          title: "UK stock & warehouse planning",
          description:
            "Structured availability planning for fast-moving products and project-specific requirements.",
          points: [
            "Project stock reservations",
            "Phased call-off planning",
            "Availability updates",
          ],
        },
        {
          id: "showroom",
          title: "Showroom & product demonstration",
          description:
            "Physical review of core systems, components and installation concepts.",
          points: [
            "Busbar and tap-off systems",
            "Cable support and earthing",
            "Underfloor, lighting and EV systems",
          ],
        },
        {
          id: "logistics",
          title: "Project logistics & supply",
          description:
            "Commercial and operational coordination from confirmed scope to delivery.",
          points: [
            "Quotation coordination",
            "Lead-time planning",
            "Delivery and after-sales support",
          ],
        },
      ],

      overviewAction: {
        href: "/uk-support",
        label: "Explore UK Support",
      },

      primaryAction: {
        href: "#contact",
        label: "Discuss a project",
      },

      secondaryAction: {
        href: "#technical-documents",
        label: "Review technical documents",
      },

      disclaimer:
        "InfraVolt provides product-level engineering, specification and supply coordination. Final design approval, certification and installation responsibility remains with the appointed project professionals.",
    },

    manufacturer: {
      eyebrow: "Manufacturing partner",
      title: "Built on more than 45 years of manufacturing experience",
      description:
        "Gersan develops and manufactures electrical infrastructure systems for commercial, industrial and critical infrastructure projects worldwide.",
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
          description: "Manufacturing experience",
        },
        {
          title: "55,000 m²",
          description: "Manufacturing facility",
        },
        {
          title: "750+",
          description: "Specialist staff",
        },
        {
          title: "90+ Countries",
          description: "International export network",
        },
        {
          title: "GEREL",
          description: "Listed on Borsa İstanbul",
        },
      ],
      factoryImageAlt:
        "Exterior of the Gersan electrical systems manufacturing facility in Türkiye",
      facilityLabel: "Gersan manufacturing facility • Türkiye",
      qualityLabel: "Testing, compliance & quality",
      qualityNote:
        "Selected Gersan systems are supported by international testing, product and management-system documentation. Applicability varies by product family.",
      listingLabel: "Publicly listed industrial manufacturer",
      listingStatement:
        "Gersan Elektrik Ticaret ve Sanayi A.Ş. is listed on Borsa İstanbul under the ticker GEREL.",
      internalAction: {
        href: "/about/gersan",
        label: "Discover Gersan",
      },
      externalAction: {
        href: "https://kap.org.tr/tr/sirket-finansal-bilgileri/964-gersan-elektrik-ticaret-ve-sanayi-a-s",
        label: "View Official Disclosures",
        accessibleLabel:
          "View official Gersan disclosures on the external KAP website (opens in a new tab)",
      },
    },
    technicalDocuments: {
      eyebrow: "Technical resources",
      title: "Project-ready technical documentation",
      description:
        "Verified datasheets, certificates, test reports, installation guidance and BIM/CAD resources supplied for the relevant system and project stage.",

      items: [
        {
          title: "Datasheets",
          description:
            "Product data, dimensions, materials and technical characteristics.",
        },
        {
          title: "Certificates & Test Reports",
          description:
            "Available compliance and testing documentation for relevant product ranges.",
        },
        {
          title: "Installation Guidance",
          description:
            "System, accessory and component installation information.",
        },
        {
          title: "BIM / CAD Resources",
          description:
            "Revit, IFC, DWG and technical drawings for project coordination.",
        },
        {
          title: "Specification Support",
          description:
            "Documentation support for BOQ, submittals and technical project review.",
        },
      ],

      action: {
        href: "#contact",
        label: "Request Technical Pack",
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
        { href: "/uk-support", label: "Підтримка у Великій Британії" },
        { href: "#contact", label: "Дилерам / Торговий акаунт" },
        { href: "#technical-documents", label: "Ресурси" },
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
      actionLabel: "Переглянути карту застосувань",
      imageDisclosure:
        "Зображення показано для галузевого контексту — воно не подається як проєкт, реалізований InfraVolt",
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
      eyebrow: "Інтерактивна карта застосувань",
      title:
        "Подивіться, як електричні системи взаємодіють у центрі обробки даних",
      description:
        "Оберіть критичну зону об’єкта, перегляньте відповідні системи Gersan і перейдіть від середовища будівлі до відповідного технічного рішення.",
      previewTitle: "Центр обробки даних",
      previewZones: ["Огляд", "Сіра зона", "Біла зона"],
      connections: [
        "Оберіть зону проєкту",
        "Перегляньте відповідні системи Gersan",
        "Запросіть технічну підтримку",
      ],
      action: {
        href: "/applications/data-centres",
        label: "Відкрити карту центру обробки даних",
      },
    },

    support: {
      eyebrow: "Підтримка та операційна база у Великій Британії",

      title:
        "Локальна технічна підтримка, шоурум, складське планування та постачання",

      introduction:
        "InfraVolt розвиває британську платформу підтримки систем електричної інфраструктури Gersan, яка поєднуватиме технічний супровід продукції, демонстрацію систем, складське планування та координоване постачання.",

      showroom: {
        eyebrow: "Концепція шоуруму",
        title: "Британський шоурум і технічна демонстрація",
        description:
          "Запланований простір для ознайомлення із системами Gersan, компонентами та принципами монтажу шинопроводів, кабельних трас, заземлення, підпідлогових, освітлювальних і зарядних систем.",
        status:
          "Концепція запланованого шоуруму — дати відкриття та відвідування буде оголошено пізніше.",
        imageAlt:
          "Концептуальне зображення шоуруму електротехнічних систем Gersan та InfraVolt",
      },

      warehouse: {
        eyebrow: "Операційна база у Великій Британії",
        title: "Планування запасів, складу та проєктних поставок",
        description:
          "Запропонована британська операційна база для планування запасів, резервування продукції, поетапних відвантажень і координованої доставки.",
        status:
          "Запропонований операційний об’єкт — асортимент запасів і дати запуску уточнюються.",
        imageAlt:
          "Зовнішній вигляд запропонованої британської складської та операційної бази",
      },

      services: [
        {
          id: "engineering",
          title: "Технічна підтримка та специфікації",
          description:
            "Опрацювання креслень, BOQ, специфікацій і вимог до продукції.",
          points: [
            "Добір систем і аксесуарів",
            "Координація технічних подань",
            "Підтримка CAD і BIM документів",
          ],
        },
        {
          id: "warehouse",
          title: "Планування британського складу",
          description:
            "Планування доступності продукції для регулярних і проєктних потреб.",
          points: [
            "Резервування запасів",
            "Поетапні відвантаження",
            "Оновлення доступності",
          ],
        },
        {
          id: "showroom",
          title: "Шоурум і демонстрація продукції",
          description:
            "Фізичне ознайомлення із системами, компонентами та принципами монтажу.",
          points: [
            "Шинопроводи й відгалужувальні блоки",
            "Кабельні системи та заземлення",
            "Підпідлогові, освітлювальні та EV системи",
          ],
        },
        {
          id: "logistics",
          title: "Проєктна логістика та постачання",
          description:
            "Комерційна й операційна координація від підтвердженого обсягу до доставки.",
          points: [
            "Координація пропозиції",
            "Планування термінів",
            "Доставка та післяпродажна підтримка",
          ],
        },
      ],
      overviewAction: {
        href: "/uk-support",
        label: "Детальніше про підтримку у Великій Британії",
      },
      primaryAction: {
        href: "#contact",
        label: "Обговорити проєкт",
      },

      secondaryAction: {
        href: "#technical-documents",
        label: "Переглянути технічні документи",
      },

      disclaimer:
        "InfraVolt забезпечує підтримку на рівні продукції, специфікацій і постачання. Остаточне проєктування, затвердження, сертифікація та монтаж залишаються відповідальністю призначених проєктних фахівців.",
    },

    manufacturer: {
      eyebrow: "Виробничий партнер",
      title: "Понад 45 років досвіду виробництва електричної інфраструктури",
      description:
        "Gersan розробляє та виробляє системи електричної інфраструктури для комерційних, промислових і критично важливих проєктів у всьому світі.",
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
          description: "Досвід виробництва",
        },
        {
          title: "55 000 м²",
          description: "Виробничий комплекс",
        },
        {
          title: "750+",
          description: "Кваліфікованих фахівців",
        },
        {
          title: "90+ країн",
          description: "Міжнародна експортна мережа",
        },
        {
          title: "GEREL",
          description: "Лістинг на Borsa İstanbul",
        },
      ],
      factoryImageAlt:
        "Зовнішній вигляд виробничого комплексу електротехнічних систем Gersan у Туреччині",
      facilityLabel: "Виробничий комплекс Gersan • Туреччина",
      qualityLabel: "Випробування, відповідність і якість",
      qualityNote:
        "Окремі системи Gersan підтверджені міжнародною випробувальною, продуктовою та управлінською документацією. Застосовність залежить від групи продукції.",
      listingLabel: "Публічна промислова компанія",
      listingStatement:
        "Gersan Elektrik Ticaret ve Sanayi A.Ş. котирується на Borsa İstanbul під тикером GEREL.",
      internalAction: {
        href: "/about/gersan",
        label: "Дізнатися більше про Gersan",
      },
      externalAction: {
        href: "https://kap.org.tr/tr/sirket-finansal-bilgileri/964-gersan-elektrik-ticaret-ve-sanayi-a-s",
        label: "Офіційні розкриття",
        accessibleLabel:
          "Переглянути офіційні розкриття Gersan на зовнішньому сайті KAP (відкриється в новій вкладці)",
      },
    },
    technicalDocuments: {
      eyebrow: "Технічні ресурси",
      title: "Технічна документація для проєкту",
      description:
        "Перевірені технічні паспорти, сертифікати, протоколи випробувань, монтажні матеріали та BIM/CAD ресурси для відповідної системи й стадії проєкту.",

      items: [
        {
          title: "Технічні паспорти",
          description:
            "Дані про продукцію, розміри, матеріали та технічні характеристики.",
        },
        {
          title: "Сертифікати та випробування",
          description:
            "Документація щодо відповідності та випробувань відповідних груп продукції.",
        },
        {
          title: "Настанови з монтажу",
          description:
            "Інформація про монтаж систем, аксесуарів і компонентів.",
        },
        {
          title: "Ресурси BIM / CAD",
          description: "Моделі Revit, файли IFC, DWG і технічні креслення.",
        },
        {
          title: "Підтримка специфікацій",
          description:
            "Документація для BOQ, технічних подань і перевірки проєкту.",
        },
      ],

      action: {
        href: "#contact",
        label: "Запросити технічний пакет",
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

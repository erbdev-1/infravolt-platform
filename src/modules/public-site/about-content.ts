import type { MarketCode } from "@/modules/markets/types";

type AnchorLink = Readonly<{
  href: `#${string}` | `/${string}`;
  label: string;
}>;

type Capability = Readonly<{
  title: string;
  description: string;
}>;

export type AboutPageContent = Readonly<{
  metadata: Readonly<{ title: string; description: string }>;
  hero: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: AnchorLink;
    secondaryAction: AnchorLink;
    markets: readonly string[];
  }>;
  whoWeAre: Readonly<{
    label: string;
    descriptor: string;
    statement: string;
    supportingParagraph: string;
    capabilities: readonly Capability[];
  }>;
  relationship: Readonly<{
    label: string;
    title: string;
    introduction: string;
    gersan: Readonly<{
      descriptor: string;
      description: string;
      items: readonly string[];
    }>;
    panels: readonly Readonly<{
      id: "uk" | "ua";
      title: string;
      descriptor: string;
      copy: string;
      supportItems: readonly string[];
    }>[];
  }>;
  aboutGersan: Readonly<{
    label: string;
    title: string;
    qualityLabel: string;
    paragraphs: readonly string[];
    imageAlt: string;
    mediaOwnership: string;
    readMoreLabel: string;
    readLessLabel: string;
  }>;
  footprint: Readonly<{
    label: string;
    title: string;
    introduction: string;
    locations: readonly Readonly<{
      number: string;
      city: string;
      role: string;
      country: string;
    }>[];
  }>;
  scale: Readonly<{
    title: string;
    metrics: readonly Readonly<{ value: string; label: string }>[];
  }>;
  process: Readonly<{
    label: string;
    title: string;
    steps: readonly Readonly<{ number: string; title: string; description: string }>[];
  }>;
  finalCta: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: AnchorLink;
    secondaryAction: AnchorLink;
  }>;
}>;

const ABOUT_PAGE_CONTENT: Readonly<Record<MarketCode, AboutPageContent>> = {
  uk: {
    metadata: {
      title: "About InfraVolt | UK & Ukraine Electrical Infrastructure Distribution",
      description:
        "InfraVolt connects GERSAN electrical infrastructure manufacturing and engineering capability with local distribution and project support across the United Kingdom and Ukraine.",
    },
    hero: {
      eyebrow: "About InfraVolt",
      title: "Local Expertise\nGlobal Engineering Capability",
      description:
        "InfraVolt connects GERSAN manufacturing and engineering capability with local distribution, technical coordination and project support across the United Kingdom and Ukraine.",
      primaryAction: { href: "/#product-systems", label: "Explore Our Systems" },
      secondaryAction: { href: "/contact?type=general", label: "Contact Team" },
      markets: ["United Kingdom", "Ukraine"],
    },
    whoWeAre: {
      label: "Who We Are",
      descriptor: "Electrical Infrastructure Distribution & Technical Support",
      statement:
        "InfraVolt supports engineered electrical infrastructure projects across the United Kingdom and Ukraine",
      supportingParagraph:
        "We help contractors, consultants and project teams turn project requirements into practical product selections, coordinated technical information, quotations and local supply support.",
      capabilities: [
        {
          title: "UK Market Support",
          description: "Local coordination for enquiries, quotations and technical requirements.",
        },
        {
          title: "Ukraine Market Support",
          description: "Local commercial and technical support for infrastructure projects.",
        },
        {
          title: "Technical Coordination",
          description: "Product information, documentation and system-level support.",
        },
        {
          title: "Product Supply Support",
          description: "Coordination from requirement through quotation and supply.",
        },
      ],
    },
    relationship: {
      label: "Manufacturer & Distributor",
      title: "One Engineering Platform\nTwo Local Markets",
      introduction:
        "GERSAN provides the manufacturing and engineering platform, while InfraVolt provides local distribution, technical coordination and project support across the United Kingdom and Ukraine.",
      gersan: {
        descriptor: "Manufacturing & Engineering Platform",
        description:
          "Engineering, manufacturing, R&D, testing and technical documentation for electrical infrastructure systems.",
        items: [
          "Product Engineering",
          "Manufacturing",
          "R&D",
          "Testing",
          "Technical Documentation",
          "Electrical Infrastructure Systems",
        ],
      },
      panels: [
        {
          id: "uk",
          title: "United Kingdom",
          descriptor: "Distribution & Project Support",
          copy: "Local coordination for contractors, consultants and project teams, from initial enquiry and product selection through quotation and technical documentation.",
          supportItems: [
            "Contractor & Consultant Support",
            "Quotations & Product Selection",
            "Technical Documentation",
          ],
        },
        {
          id: "ua",
          title: "Ukraine",
          descriptor: "Distribution & Project Support",
          copy: "Local coordination for contractors, consultants and project teams, from initial enquiry and product selection through quotation and technical documentation.",
          supportItems: [
            "Contractor & Consultant Support",
            "Quotations & Product Selection",
            "Technical Documentation",
          ],
        },
      ],
    },
    aboutGersan: {
      label: "About GERSAN",
      title: "Engineering & Manufacturing Since 1980",
      qualityLabel: "Testing, Compliance & Quality",
      paragraphs: [
        "GERSAN Elektrik Ticaret ve Sanayi A.Ş. is the manufacturing and engineering partner behind the electrical infrastructure systems supplied by InfraVolt in the United Kingdom and Ukraine.",
        "Its manufacturing portfolio covers busbar systems, cable carrier and support systems, earthing and lightning protection, panel and rack cabinets, EV charging systems, automation, LED-BUS lighting, underfloor systems and engineered steel support solutions.",
        "GERSAN combines manufacturing with in-house engineering, product development and technical support. Its specialist technical and academic teams provide project-focused solutions from product development and selection through to application support and documentation.",
        "Testing and technical verification are supported by the company's own laboratory facilities, where selected type tests referenced within IEC / TS EN 61439 are carried out using dedicated test equipment. Production is supported by international standards and certification frameworks including IEC, BS, EN, TSE, ISO and CE requirements.",
        "With products supplied for projects across multiple international markets, GERSAN combines established manufacturing capability with engineering, testing and technical documentation for electrical infrastructure applications.",
      ],
      imageAlt: "Exterior of the GERSAN electrical systems manufacturing facility in Türkiye",
      mediaOwnership: "GERSAN manufacturing facility, Türkiye.",
      readMoreLabel: "Read more",
      readLessLabel: "Read less",
    },
    footprint: {
      label: "Manufacturing Footprint",
      title: "Manufacturing Capability Across Türkiye and Oman",
      introduction:
        "GERSAN's electrical infrastructure systems are supported by an established manufacturing network across Türkiye and Oman.",
      locations: [
        {
          number: "01",
          city: "Tuzla, Istanbul",
          role: "Head Office & Factory",
          country: "Türkiye",
        },
        {
          number: "02",
          city: "Çaycuma, Zonguldak",
          role: "Manufacturing Facility",
          country: "Türkiye",
        },
        {
          number: "03",
          city: "Sultanate of Oman",
          role: "GERSAN Electric LLC",
          country: "Manufacturing Facility",
        },
      ],
    },
    scale: {
      title: "Corporate Credibility",
      metrics: [
        { value: "45+", label: "Years of Experience" },
        { value: "750+", label: "Expert Staff" },
        { value: "GEREL", label: "Borsa Istanbul" },
        { value: "GERLF", label: "OTCQX Best Market" },
      ],
    },
    process: {
      label: "Project Support",
      title: "From Requirement to Supply",
      steps: [
        {
          number: "01",
          title: "Project Requirement",
          description: "We review the application, technical requirement and project context.",
        },
        {
          number: "02",
          title: "Product & System Selection",
          description: "Suitable GERSAN systems and configurations are identified.",
        },
        {
          number: "03",
          title: "Technical & Commercial Coordination",
          description: "Documentation, specifications and quotations are coordinated.",
        },
        {
          number: "04",
          title: "Supply & Ongoing Support",
          description: "InfraVolt supports order coordination and ongoing technical requirements.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Work With InfraVolt",
      title: "Working on an Electrical Infrastructure Project?",
      description:
        "Talk to InfraVolt about product selection, technical documentation, quotations and project supply requirements in the United Kingdom or Ukraine.",
      primaryAction: { href: "/contact?type=project", label: "Discuss Your Project" },
      secondaryAction: { href: "/contact?type=quote", label: "Request a Quote" },
    },
  },
  ua: {
    metadata: {
      title: "Про InfraVolt | Дистрибуція електроінфраструктурних систем у Великій Британії та Україні",
      description:
        "InfraVolt поєднує виробничі та інженерні можливості GERSAN із локальною дистрибуцією та підтримкою проєктів у Великій Британії й Україні.",
    },
    hero: {
      eyebrow: "Про InfraVolt",
      title: "Локальна експертиза\nГлобальні інженерні можливості",
      description:
        "InfraVolt поєднує виробничі та інженерні можливості GERSAN із локальною дистрибуцією, технічною координацією та підтримкою проєктів у Великій Британії й Україні.",
      primaryAction: { href: "/#product-systems", label: "Переглянути наші системи" },
      secondaryAction: { href: "/contact?type=general", label: "Зв'язатися з командою" },
      markets: ["Велика Британія", "Україна"],
    },
    whoWeAre: {
      label: "Хто ми",
      descriptor: "Дистрибуція електротехнічної інфраструктури та технічна підтримка",
      statement:
        "InfraVolt підтримує проєкти інженерної електротехнічної інфраструктури у Великій Британії та Україні",
      supportingParagraph:
        "Ми допомагаємо підрядникам, консультантам і проєктним командам перетворювати вимоги проєкту на практичний вибір продукції, координуючи технічну інформацію, комерційні пропозиції та локальне постачання.",
      capabilities: [
        {
          title: "Підтримка ринку Великої Британії",
          description: "Локальна координація запитів, пропозицій і технічних вимог.",
        },
        {
          title: "Підтримка ринку України",
          description: "Локальна комерційна й технічна підтримка інфраструктурних проєктів.",
        },
        {
          title: "Технічна координація",
          description: "Інформація про продукцію, документація та підтримка на рівні систем.",
        },
        {
          title: "Підтримка постачання продукції",
          description: "Координація від вимоги й пропозиції до постачання.",
        },
      ],
    },
    relationship: {
      label: "Виробник і дистриб'ютор",
      title: "Єдина інженерна платформа\nДва локальні ринки",
      introduction:
        "GERSAN забезпечує виробничу та інженерну платформу, а InfraVolt — локальну дистрибуцію, технічну координацію та підтримку проєктів у Великій Британії та Україні.",
      gersan: {
        descriptor: "Платформа виробництва та інжинірингу",
        description:
          "Проєктування, виробництво, дослідження, випробування й технічна документація для систем електротехнічної інфраструктури.",
        items: [
          "Проєктування продукції",
          "Виробництво",
          "Дослідження та розробка",
          "Випробування",
          "Технічна документація",
          "Системи електричної інфраструктури",
        ],
      },
      panels: [
        {
          id: "uk",
          title: "Велика Британія",
          descriptor: "Дистрибуція та підтримка проєктів",
          copy: "Локальна координація для підрядників, консультантів і проєктних команд — від першого запиту та вибору продукції до пропозиції й технічної документації.",
          supportItems: [
            "Підтримка підрядників і консультантів",
            "Комерційні пропозиції та вибір продукції",
            "Технічна документація",
          ],
        },
        {
          id: "ua",
          title: "Україна",
          descriptor: "Дистрибуція та підтримка проєктів",
          copy: "Локальна координація для підрядників, консультантів і проєктних команд — від першого запиту та вибору продукції до пропозиції й технічної документації.",
          supportItems: [
            "Підтримка підрядників і консультантів",
            "Комерційні пропозиції та вибір продукції",
            "Технічна документація",
          ],
        },
      ],
    },
    aboutGersan: {
      label: "Про GERSAN",
      title: "Інжиніринг і виробництво з 1980 року",
      qualityLabel: "Випробування, відповідність і якість",
      paragraphs: [
        "GERSAN Elektrik Ticaret ve Sanayi A.Ş. — виробничий та інженерний партнер, що стоїть за системами електричної інфраструктури, які InfraVolt постачає у Великій Британії та Україні.",
        "Виробничий портфель компанії охоплює шинопровідні системи, системи кабеленесучих конструкцій, системи заземлення та блискавкозахисту, панельні та стійкові шафи, системи зарядки електромобілів, автоматизацію, освітлення LED-BUS, підпідлогові системи та інженерні сталеві опорні рішення.",
        "GERSAN поєднує виробництво з власним інжинірингом, розробкою продукції та технічною підтримкою. Спеціалізовані технічні та науково-технічні команди компанії пропонують проєктно орієнтовані рішення — від розробки та вибору продукції до підтримки застосування та документації.",
        "Випробування та технічну верифікацію забезпечують власні лабораторні потужності компанії, де за допомогою спеціалізованого обладнання проводяться окремі типові випробування, передбачені IEC / TS EN 61439. Виробництво відповідає міжнародним стандартам і сертифікаційним вимогам, зокрема IEC, BS, EN, TSE, ISO та CE.",
        "Постачаючи продукцію для проєктів на багатьох міжнародних ринках, GERSAN поєднує усталені виробничі можливості з інжинірингом, випробуваннями та технічною документацією для застосувань в електротехнічній інфраструктурі.",
      ],
      imageAlt: "Зовнішній вигляд виробничого комплексу електротехнічних систем GERSAN у Туреччині",
      mediaOwnership: "Виробничий комплекс GERSAN, Туреччина.",
      readMoreLabel: "Читати більше",
      readLessLabel: "Читати менше",
    },
    footprint: {
      label: "Виробничі потужності",
      title: "Виробничі можливості в Туреччині та Омані",
      introduction:
        "Системи електричної інфраструктури GERSAN підтримує сформована виробнича мережа в Туреччині та Омані.",
      locations: [
        {
          number: "01",
          city: "Тузла, Стамбул",
          role: "Головний офіс і завод",
          country: "Туреччина",
        },
        {
          number: "02",
          city: "Чайджума, Зонгулдак",
          role: "Виробничий комплекс",
          country: "Туреччина",
        },
        {
          number: "03",
          city: "Султанат Оман",
          role: "GERSAN Electric LLC",
          country: "Виробничий комплекс",
        },
      ],
    },
    scale: {
      title: "Корпоративна надійність",
      metrics: [
        { value: "45+", label: "Років досвіду" },
        { value: "750+", label: "Кваліфікованих фахівців" },
        { value: "GEREL", label: "Borsa Istanbul" },
        { value: "GERLF", label: "OTCQX Best Market" },
      ],
    },
    process: {
      label: "Підтримка проєктів",
      title: "Від вимоги до постачання",
      steps: [
        {
          number: "01",
          title: "Вимога проєкту",
          description: "Ми розглядаємо застосування, технічну вимогу та контекст проєкту.",
        },
        {
          number: "02",
          title: "Вибір продукції та системи",
          description: "Визначаємо відповідні системи та конфігурації GERSAN.",
        },
        {
          number: "03",
          title: "Технічна та комерційна координація",
          description: "Координуємо документацію, специфікації та комерційні пропозиції.",
        },
        {
          number: "04",
          title: "Постачання та подальша підтримка",
          description: "InfraVolt підтримує координацію замовлення та подальші технічні потреби.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Працюйте з InfraVolt",
      title: "Працюєте над проєктом електричної інфраструктури?",
      description:
        "Обговоріть з InfraVolt вибір продукції, технічну документацію, комерційні пропозиції та вимоги до постачання проєкту у Великій Британії чи Україні.",
      primaryAction: { href: "/contact?type=project", label: "Обговорити ваш проєкт" },
      secondaryAction: { href: "/contact?type=quote", label: "Запросити пропозицію" },
    },
  },
} as const;

export function aboutPageContentForMarket(market: MarketCode): AboutPageContent {
  return ABOUT_PAGE_CONTENT[market];
}

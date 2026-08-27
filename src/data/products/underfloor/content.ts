import type { MarketCode } from "@/modules/markets/types";

import {
  UNDERFLOOR_APPLICATION_IMAGES,
  UNDERFLOOR_HUB_HERO_FOREGROUND,
  UNDERFLOOR_SERIES_ASSETS,
} from "./assets";
import type { UnderfloorHubContent } from "./types";

/** Underfloor Cable Trunking Systems — category hub page.
 *
 * Source: catalog-source/underfloor-catalog/underfloor-catalog-extraction
 * (underfloor.pdf, 36 pages, 85 verified product/data rows). Real
 * families per the extraction's own report ("Main families"): GDK /
 * GDK-Y / GDK ING underfloor junction boxes, GDKF socket/data/telephone
 * accessories, GDK solid and perforated underfloor cable trays, GDKE /
 * GDKS / GDKD tray accessories, GYDK raised-floor trunking and covers,
 * GOR aluminium trunking and accessories — six genuinely distinct card
 * groups, matched 1:1 to that list rather than an invented grouping.
 *
 * The page uses the final project-prepared application background,
 * transparent product foreground and one dedicated category-card asset
 * for each of the six source-faithful product groups. */
export const UNDERFLOOR_HERO_VISUAL_IMAGE = UNDERFLOOR_HUB_HERO_FOREGROUND;
export const UNDERFLOOR_HERO_VISUAL_IMAGE_ALT =
  "Underfloor junction boxes and cable tray product composition";

const content = {
  uk: {
    metadata: {
      title: "Underfloor Cable Trunking Systems | InfraVolt",
      description:
        "Underfloor Cable Trunking Systems — GDK junction boxes, GDKF socket & data accessories, GDK cable trays, GYDK raised-floor trunking and GOR aluminium trunking for flexible underfloor service distribution.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      current: "Underfloor Cable Trunking Systems",
    },
    backToHomeLabel: "Back to home",
    hero: {
      eyebrow: "UNDERFLOOR CABLE TRUNKING",
      title: "Underfloor Cable Trunking Systems",
      description:
        "Flexible underfloor power and data distribution solutions for modern commercial interiors, providing accessible and adaptable service routing beneath the finished floor.",
      primaryAction: "Explore Series",
      secondaryAction: "Request Support",
    },
    heroVisualImage: UNDERFLOOR_HERO_VISUAL_IMAGE,
    heroVisualImageAlt: UNDERFLOOR_HERO_VISUAL_IMAGE_ALT,
    overviewHeading: "Technical Overview",
    overview: [
      {
        icon: "distribution",
        title: "Flexible Floor Distribution",
        description: "Power and data services can be distributed beneath the finished floor using modular trunking and access components.",
      },
      {
        icon: "integration",
        title: "Power & Data Integration",
        description: "Integrated routing supports electrical and communication services within commercial floor layouts.",
      },
      {
        icon: "access",
        title: "Modular Floor Access",
        description: "Floor boxes and access points provide service availability close to workstations and equipment.",
      },
      {
        icon: "adaptable",
        title: "Adaptable Commercial Layouts",
        description:
          "Underfloor distribution supports changing office and commercial layouts without relying exclusively on fixed perimeter services.",
      },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction: "Six verified catalogue families covering the Underfloor Cable Trunking range.",
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: [
      {
        slug: "underfloor-junction-boxes",
        number: "01",
        name: "GDK Underfloor Junction Boxes",
        description:
          "Floor-set junction and distribution boxes for power and data outlets, including GDK, GDK-Y and the British-system (ING) variant.",
        features: [
          { icon: "configuration", label: "GDK / GDK-Y / British System (ING)" },
          { icon: "capacity", label: "19 Catalogue Models" },
          { icon: "mounting", label: "Set Into Finished Floor" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["underfloor-junction-boxes"].categoryCard,
        imageAlt: "GDK-31-Y underfloor junction box, open lid showing the internal socket compartment",
        href: "/products/underfloor-systems/underfloor-junction-boxes",
      },
      {
        slug: "socket-data-accessories",
        number: "02",
        name: "GDKF Socket & Data Accessories",
        description: "Power, earthed, data (RJ-45) and telephone (RJ-11/RJ12) socket inserts and blank plates for GDK and GOR housings.",
        features: [
          { icon: "configuration", label: "Power / Data / Telephone Inserts" },
          { icon: "capacity", label: "16 Catalogue Models" },
          { icon: "mounting", label: "Fits GDK & GOR Housings" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["socket-data-accessories"].categoryCard,
        imageAlt: "GDKF-402 earthed socket accessory, front view",
        href: "/products/underfloor-systems/socket-data-accessories",
      },
      {
        slug: "underfloor-cable-trays",
        number: "03",
        name: "GDK Underfloor Cable Trays",
        description: "Solid and perforated underfloor cable trays in three widths, with matching joining, end-cap and 90° riser accessories.",
        features: [
          { icon: "configuration", label: "Solid or Perforated" },
          { icon: "capacity", label: "6 Catalogue Models" },
          { icon: "material", label: "180 / 240 / 300 mm Widths" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["underfloor-cable-trays"].categoryCard,
        imageAlt: "GDK-24-B perforated underfloor cable tray",
        href: "/products/underfloor-systems/underfloor-cable-trays",
      },
      {
        slug: "raised-floor-trunking",
        number: "04",
        name: "GYDK Raised-Floor Trunking",
        description: "In-cavity floor trunking and matching covers in five widths and three heights, for raised-access floor cable routing.",
        features: [
          { icon: "configuration", label: "5 Widths × 3 Heights" },
          { icon: "capacity", label: "20 Catalogue Models" },
          { icon: "material", label: "GYDK Trunking + Covers" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["raised-floor-trunking"].categoryCard,
        imageAlt: "GYDK raised-floor trunking category composition",
        href: "/products/underfloor-systems/raised-floor-trunking",
      },
      {
        slug: "aluminium-trunking",
        number: "05",
        name: "GOR Aluminium Trunking",
        description: "Single, double-compartment and back-to-back aluminium surface trunking with matching bends, covers and end caps.",
        features: [
          { icon: "configuration", label: "Single / Double / Back-to-Back" },
          { icon: "capacity", label: "13 Catalogue Models" },
          { icon: "material", label: "Anodised Aluminium" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["aluminium-trunking"].categoryCard,
        imageAlt: "GOR-02 double-compartment aluminium trunking profile",
        href: "/products/underfloor-systems/aluminium-trunking",
      },
      {
        slug: "tray-accessories",
        number: "06",
        name: "GDK Tray Accessories",
        description: "Joining straps, end caps and 90° risers (GDKE / GDKS / GDKD) for the GDK underfloor cable tray range.",
        features: [
          { icon: "configuration", label: "Joining Strap / End Cap / 90° Riser" },
          { icon: "capacity", label: "11 Catalogue Models" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["tray-accessories"].categoryCard,
        imageAlt: "GDKD-18 90° riser accessory for GDK underfloor cable trays",
        href: "/products/underfloor-systems/tray-accessories",
      },
    ],
    systemHeading: "How the Underfloor System Works",
    systemIntroduction: "The catalogue's own underfloor system layout, shown as three connected stages.",
    systemSteps: [
      {
        icon: "trunking",
        title: "Distribution Trunking",
        description: "GOR aluminium trunking or GYDK raised-floor trunking routes cables beneath or within the finished floor.",
      },
      {
        icon: "junction",
        title: "Underfloor Junction Box",
        description: "GDK junction boxes are set into the floor at service points, connecting to the trunking run.",
      },
      {
        icon: "outlet",
        title: "Socket & Data Outlet",
        description: "GDKF power, data and telephone inserts fit the junction box, providing the final connection point.",
      },
    ],
    constructionHeading: "Construction & System Options",
    constructionOptions: [
      {
        title: "Solid or Perforated Cable Trays",
        description: "GDK underfloor cable trays are available without holes (solid) or with holes (perforated) in matching widths.",
      },
      {
        title: "Standard, Mid or High-Cavity Trunking",
        description: "GYDK raised-floor trunking is available in 50 mm, 60 mm and 100 mm heights across five widths.",
      },
      {
        title: "Single, Double or Back-to-Back Trunking",
        description: "GOR aluminium trunking is available as single-compartment, double-compartment or two-sided back-to-back profiles.",
      },
      {
        title: "GDK or British-System Junction Boxes",
        description: "Underfloor junction boxes are available in the standard GDK configuration or the British-system (ING) variant.",
      },
    ],
    applicationsHeading: "Typical Applications",
    applications: [
      { icon: "office", title: "Offices & Workspaces", description: "Flexible power and data access across open-plan and cellular office floor layouts.", image: UNDERFLOOR_APPLICATION_IMAGES.office, imageAlt: "Underfloor services in a modern office workspace" },
      { icon: "commercial-building", title: "Commercial Buildings", description: "Underfloor service distribution for mixed-use and multi-tenant commercial interiors.", image: UNDERFLOOR_APPLICATION_IMAGES["commercial-building"], imageAlt: "Underfloor services in a commercial building" },
      { icon: "meeting-room", title: "Meeting & Conference Spaces", description: "Floor-level power and data access for reconfigurable meeting and presentation layouts.", image: UNDERFLOOR_APPLICATION_IMAGES["meeting-room"], imageAlt: "Underfloor services in a meeting and conference space" },
      { icon: "education", title: "Education Facilities", description: "Underfloor routing for power and data services across classrooms and study spaces.", image: UNDERFLOOR_APPLICATION_IMAGES.education, imageAlt: "Underfloor services in an education facility" },
      { icon: "retail", title: "Retail Interiors", description: "Adaptable floor access for point-of-sale, display and equipment power requirements.", image: UNDERFLOOR_APPLICATION_IMAGES.retail, imageAlt: "Underfloor services in a retail interior" },
      { icon: "flexible-workspace", title: "Control & Flexible Work Areas", description: "Service distribution that supports frequently reconfigured desking and equipment layouts.", image: UNDERFLOOR_APPLICATION_IMAGES["flexible-workspace"], imageAlt: "Underfloor services in a control and flexible work area" },
    ],
    supportCta: {
      eyebrow: "PROJECT SUPPORT",
      title: "Planning an Underfloor Cable Distribution System?",
      description: "Our team can help identify the right trunking, floor-access and service-distribution configuration for your project.",
      action: "Talk to Our Technical Team",
    },
    seriesDetail: {
      backLabel: "Back to Underfloor Cable Trunking Systems",
      codesCountSuffix: "catalogue codes",
      addToEnquiryLabel: "Add to Enquiry",
      removeFromEnquiryLabel: "Remove from Enquiry",
      modelsCountSuffix: "models",
      showMoreAction: "Show more",
      relatedSeriesHeading: "Related Series",
    },
  },
  ua: {
    metadata: {
      title: "Системи підпідлогового кабельного каналу | InfraVolt",
      description:
        "Системи підпідлогового кабельного каналу — коробки GDK, розетково-інформаційні аксесуари GDKF, лотки GDK, підвищені канали GYDK та алюмінієві канали GOR для гнучкого розподілу служб під підлогою.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      current: "Системи підпідлогового кабельного каналу",
    },
    backToHomeLabel: "На головну",
    hero: {
      eyebrow: "ПІДПІДЛОГОВИЙ КАБЕЛЬНИЙ КАНАЛ",
      title: "Системи підпідлогового кабельного каналу",
      description:
        "Гнучкі рішення розподілу живлення та даних під підлогою для сучасних комерційних приміщень, що забезпечують доступну та адаптовану прокладку служб під готовою підлогою.",
      primaryAction: "Переглянути серії",
      secondaryAction: "Запросити підтримку",
    },
    heroVisualImage: UNDERFLOOR_HERO_VISUAL_IMAGE,
    heroVisualImageAlt:
      "Композиція підпідлогових розподільних коробок і кабельних лотків",
    overviewHeading: "Технічний огляд",
    overview: [
      {
        icon: "distribution",
        title: "Гнучкий розподіл під підлогою",
        description: "Служби живлення та даних можна розподіляти під готовою підлогою за допомогою модульних каналів та точок доступу.",
      },
      {
        icon: "integration",
        title: "Інтеграція живлення та даних",
        description: "Інтегрована прокладка підтримує електричні та комунікаційні служби в комерційних планувальних рішеннях підлоги.",
      },
      {
        icon: "access",
        title: "Модульний доступ до підлоги",
        description: "Підлогові коробки та точки доступу забезпечують доступність служб поблизу робочих місць та обладнання.",
      },
      {
        icon: "adaptable",
        title: "Адаптовані комерційні планування",
        description:
          "Розподіл під підлогою підтримує зміну офісних та комерційних планувань, не покладаючись виключно на фіксовані периметральні служби.",
      },
    ],
    seriesHeading: "Продуктові серії в цій системі",
    seriesIntroduction: "Шість перевірених каталожних серій, що охоплюють діапазон підпідлогового кабельного каналу.",
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: [
      {
        slug: "underfloor-junction-boxes",
        number: "01",
        name: "GDK Підпідлогові розподільні коробки",
        description: "Вбудовані в підлогу розподільні коробки для розеток живлення та даних, включно з GDK, GDK-Y та британським варіантом (ING).",
        features: [
          { icon: "configuration", label: "GDK / GDK-Y / Британська система (ING)" },
          { icon: "capacity", label: "19 каталожних моделей" },
          { icon: "mounting", label: "Вбудовується в готову підлогу" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["underfloor-junction-boxes"].categoryCard,
        imageAlt: "Підпідлогова розподільна коробка GDK-31-Y, відкрита кришка з внутрішнім відсіком для розеток",
        href: "/products/underfloor-systems/underfloor-junction-boxes",
      },
      {
        slug: "socket-data-accessories",
        number: "02",
        name: "GDKF Розетково-інформаційні аксесуари",
        description: "Вставки розеток живлення, із заземленням, даних (RJ-45) та телефону (RJ-11/RJ12), а також заглушки для корпусів GDK і GOR.",
        features: [
          { icon: "configuration", label: "Живлення / Дані / Телефон" },
          { icon: "capacity", label: "16 каталожних моделей" },
          { icon: "mounting", label: "Підходить для GDK та GOR" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["socket-data-accessories"].categoryCard,
        imageAlt: "Аксесуар розетки із заземленням GDKF-402, вигляд спереду",
        href: "/products/underfloor-systems/socket-data-accessories",
      },
      {
        slug: "underfloor-cable-trays",
        number: "03",
        name: "GDK Підпідлогові кабельні лотки",
        description: "Суцільні та перфоровані підпідлогові кабельні лотки трьох ширин з відповідними елементами з'єднання, заглушками та поворотами 90°.",
        features: [
          { icon: "configuration", label: "Суцільний або перфорований" },
          { icon: "capacity", label: "6 каталожних моделей" },
          { icon: "material", label: "Ширина 180 / 240 / 300 мм" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["underfloor-cable-trays"].categoryCard,
        imageAlt: "Перфорований підпідлоговий кабельний лоток GDK-24-B",
        href: "/products/underfloor-systems/underfloor-cable-trays",
      },
      {
        slug: "raised-floor-trunking",
        number: "04",
        name: "GYDK Канали для підвищеної підлоги",
        description: "Заглиблений канал для підвищеної підлоги та відповідні кришки п'яти ширин і трьох висот для прокладки кабелів під фальшпідлогою.",
        features: [
          { icon: "configuration", label: "5 ширин × 3 висоти" },
          { icon: "capacity", label: "20 каталожних моделей" },
          { icon: "material", label: "Канал GYDK + кришки" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["raised-floor-trunking"].categoryCard,
        imageAlt: "Композиція категорії підпідлогових каналів GYDK",
        href: "/products/underfloor-systems/raised-floor-trunking",
      },
      {
        slug: "aluminium-trunking",
        number: "05",
        name: "GOR Алюмінієвий канал",
        description: "Одно-, двовідсіковий та спина до спини алюмінієвий накладний канал з відповідними поворотами, кришками та заглушками.",
        features: [
          { icon: "configuration", label: "Один / Два відсіки / Спина до спини" },
          { icon: "capacity", label: "13 каталожних моделей" },
          { icon: "material", label: "Еложований алюміній" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["aluminium-trunking"].categoryCard,
        imageAlt: "Профіль двовідсікового алюмінієвого каналу GOR-02",
        href: "/products/underfloor-systems/aluminium-trunking",
      },
      {
        slug: "tray-accessories",
        number: "06",
        name: "GDK Аксесуари для лотків",
        description: "Елементи з'єднання, заглушки та повороти 90° (GDKE / GDKS / GDKD) для асортименту підпідлогових кабельних лотків GDK.",
        features: [
          { icon: "configuration", label: "З'єднання / Заглушка / Поворот 90°" },
          { icon: "capacity", label: "11 каталожних моделей" },
        ],
        image: UNDERFLOOR_SERIES_ASSETS["tray-accessories"].categoryCard,
        imageAlt: "Аксесуар повороту 90° GDKD-18 для підпідлогових кабельних лотків GDK",
        href: "/products/underfloor-systems/tray-accessories",
      },
    ],
    systemHeading: "Як працює підпідлогова система",
    systemIntroduction: "Власна схема підпідлогової системи з каталогу, показана як три пов'язані етапи.",
    systemSteps: [
      {
        icon: "trunking",
        title: "Розподільний канал",
        description: "Алюмінієвий канал GOR або канал підвищеної підлоги GYDK прокладає кабелі під готовою підлогою або в її порожнині.",
      },
      {
        icon: "junction",
        title: "Підпідлогова розподільна коробка",
        description: "Розподільні коробки GDK вбудовуються в підлогу в точках обслуговування, з'єднуючись з трасою каналу.",
      },
      {
        icon: "outlet",
        title: "Розетка живлення та даних",
        description: "Вставки живлення, даних та телефону GDKF встановлюються в розподільну коробку, забезпечуючи кінцеву точку підключення.",
      },
    ],
    constructionHeading: "Конструкція та варіанти системи",
    constructionOptions: [
      {
        title: "Суцільні або перфоровані кабельні лотки",
        description: "Підпідлогові кабельні лотки GDK доступні без отворів (суцільні) або з отворами (перфоровані) у відповідних ширинах.",
      },
      {
        title: "Стандартна, середня або висока порожнина каналу",
        description: "Канал для підвищеної підлоги GYDK доступний висотою 50 мм, 60 мм та 100 мм у п'яти ширинах.",
      },
      {
        title: "Одно-, двовідсіковий або спина до спини канал",
        description: "Алюмінієвий канал GOR доступний як одновідсіковий, двовідсіковий або двосторонній профіль спина до спини.",
      },
      {
        title: "Розподільні коробки GDK або британської системи",
        description: "Підпідлогові розподільні коробки доступні в стандартній конфігурації GDK або британському варіанті (ING).",
      },
    ],
    applicationsHeading: "Типові застосування",
    applications: [
      { icon: "office", title: "Офіси та робочі простори", description: "Гнучкий доступ до живлення та даних у відкритих та кабінетних офісних планувань.", image: UNDERFLOOR_APPLICATION_IMAGES.office, imageAlt: "Підпідлогові служби в сучасному офісному просторі" },
      { icon: "commercial-building", title: "Комерційні будівлі", description: "Розподіл служб під підлогою для багатофункціональних та багатоорендних комерційних приміщень.", image: UNDERFLOOR_APPLICATION_IMAGES["commercial-building"], imageAlt: "Підпідлогові служби в комерційній будівлі" },
      { icon: "meeting-room", title: "Переговорні та конференц-зали", description: "Доступ до живлення та даних на рівні підлоги для гнучких переговорних та презентаційних планувань.", image: UNDERFLOOR_APPLICATION_IMAGES["meeting-room"], imageAlt: "Підпідлогові служби в переговорному та конференц-просторі" },
      { icon: "education", title: "Освітні заклади", description: "Прокладка під підлогою для служб живлення та даних у класних кімнатах та навчальних просторах.", image: UNDERFLOOR_APPLICATION_IMAGES.education, imageAlt: "Підпідлогові служби в освітньому закладі" },
      { icon: "retail", title: "Роздрібні приміщення", description: "Адаптований доступ до підлоги для потреб живлення торгових точок, вітрин та обладнання.", image: UNDERFLOOR_APPLICATION_IMAGES.retail, imageAlt: "Підпідлогові служби в роздрібному інтер’єрі" },
      { icon: "flexible-workspace", title: "Зони гнучкої роботи та керування", description: "Розподіл служб, що підтримує часто змінювані планування робочих місць та обладнання.", image: UNDERFLOOR_APPLICATION_IMAGES["flexible-workspace"], imageAlt: "Підпідлогові служби в зоні керування та гнучкої роботи" },
    ],
    supportCta: {
      eyebrow: "ПІДТРИМКА ПРОЄКТУ",
      title: "Плануєте систему підпідлогового кабельного розподілу?",
      description: "Наша команда допоможе визначити правильну конфігурацію каналів, доступу до підлоги та розподілу служб для вашого проєкту.",
      action: "Звернутися до технічної команди",
    },
    seriesDetail: {
      backLabel: "До систем підпідлогового кабельного каналу",
      codesCountSuffix: "каталожних кодів",
      addToEnquiryLabel: "Додати до запиту",
      removeFromEnquiryLabel: "Прибрати із запиту",
      modelsCountSuffix: "моделей",
      showMoreAction: "Показати ще",
      relatedSeriesHeading: "Пов'язані серії",
    },
  },
} as const satisfies Readonly<Record<MarketCode, UnderfloorHubContent>>;

export function underfloorHubContentForMarket(market: MarketCode): UnderfloorHubContent {
  return content[market];
}

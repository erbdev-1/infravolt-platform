import { PRODUCT_FAMILY_NUMBERS } from "./types";

import type {
  ApplicationMap,
  Hotspot,
  OverviewHotspot,
  ProductFamily,
  Zone,
} from "./types";

const IMAGE_BASE = "/assets/application-map/infrastructure-utilities";

export const INFRASTRUCTURE_UTILITIES_ZONE_IDS = [
  "water-treatment-plant",
  "pumping-station",
  "power-distribution-building",
  "transformer-connection",
  "electrical-substation-yard",
  "water-storage-tanks",
  "outdoor-infrastructure",
  "control-operations-building",
] as const;

export type InfrastructureUtilitiesZoneId =
  (typeof INFRASTRUCTURE_UTILITIES_ZONE_IDS)[number];

const PRODUCT_FAMILIES = [
  {
    id: "cable-management",
    number: PRODUCT_FAMILY_NUMBERS["cable-management"],
    content: {
      uk: {
        name: "Cable Management Systems",
        applicationPoints: [
          "Routes power and control cabling between switchgear, process plant and outdoor utility infrastructure",
          "Supports structured cabling across treatment, pumping and distribution facilities",
        ],
        benefits: [
          "Organised, serviceable cable routing across utility sites",
          "Supports structured expansion as process and distribution equipment changes",
          "Reduces cable clutter in high-traffic plant and yard areas",
        ],
        actions: [
          {
            label: "Request Technical Pack",
            href: "/uk-support?request=technical-pack&product=cable-management",
            type: "request",
          },
          {
            label: "Request Quote",
            href: "/uk-support?request=quote&product=cable-management",
            type: "request",
          },
          {
            label: "Ask a Technical Question",
            href: "/uk-support?request=technical-question&product=cable-management",
            type: "question",
          },
        ],
      },
      ua: {
        name: "Системи кабельного менеджменту",
        applicationPoints: [
          "Прокладання силових та керуючих кабелів між розподільними пристроями, технологічним обладнанням та зовнішньою інфраструктурою",
          "Підтримка структурованого кабелювання на очисних, насосних та розподільних об'єктах",
        ],
        benefits: [
          "Впорядковане, зручне для обслуговування прокладання кабелів на об'єктах комунальної інфраструктури",
          "Підтримка структурованого розширення при зміні технологічного та розподільного обладнання",
          "Менше кабельного безладу в завантажених технічних зонах",
        ],
        actions: [
          {
            label: "Запросити технічний пакет",
            href: "/uk-support?request=technical-pack&product=cable-management",
            type: "request",
          },
          {
            label: "Запросити комерційну пропозицію",
            href: "/uk-support?request=quote&product=cable-management",
            type: "request",
          },
          {
            label: "Поставити технічне питання",
            href: "/uk-support?request=technical-question&product=cable-management",
            type: "question",
          },
        ],
      },
    },
  },
  {
    id: "busbar",
    number: PRODUCT_FAMILY_NUMBERS.busbar,
    content: {
      uk: {
        name: "Busbar Systems",
        image: "/assets/products/busbar/gs/card/gs-main-transparent-product.webp",
        imageAlt: "GS Super Compact busbar system main product view",
        applicationPoints: [
          "Distributes power between switchgear, distribution boards and downstream utility equipment",
          "Provides a compact alternative to large cable bundles in high-current runs",
        ],
        benefits: [
          "Compact, high-current power distribution",
          "Flexible tap-off points for downstream connections",
          "Reduced installation time versus equivalent cabling",
        ],
        actions: [
          {
            label: "Explore Busbar Systems",
            href: "/products/busbar",
            type: "page",
          },
          {
            label: "Request Quote",
            href: "/uk-support?request=quote&product=busbar",
            type: "request",
          },
        ],
      },
      ua: {
        name: "Шинопровідні системи",
        image: "/assets/products/busbar/gs/card/gs-main-transparent-product.webp",
        imageAlt: "Шинопровідна система GS Super Compact — вигляд основного продукту",
        applicationPoints: [
          "Розподіл живлення між розподільними пристроями, щитами та підключеним обладнанням об'єкта",
          "Компактна альтернатива великим кабельним пучкам на високострумових трасах",
        ],
        benefits: [
          "Компактний розподіл потужного струму",
          "Гнучкі точки підключення для нижчого обладнання",
          "Менший час монтажу порівняно з еквівалентним кабелем",
        ],
        actions: [
          {
            label: "Переглянути шинопровідні системи",
            href: "/products/busbar",
            type: "page",
          },
          {
            label: "Запросити комерційну пропозицію",
            href: "/uk-support?request=quote&product=busbar",
            type: "request",
          },
        ],
      },
    },
  },
  {
    id: "underfloor",
    number: PRODUCT_FAMILY_NUMBERS.underfloor,
    content: {
      uk: {
        name: "Underfloor Cable Trunking",
        applicationPoints: [
          "Routes power and data cabling beneath a raised access floor in control and technical rooms",
          "Keeps cable runs organised and accessible for maintenance as equipment changes",
        ],
        benefits: [
          "Concealed, tidy cable distribution beneath the floor void",
          "Supports structured moves, adds and changes",
        ],
        actions: [
          {
            label: "Request Technical Pack",
            href: "/uk-support?request=technical-pack&product=underfloor",
            type: "request",
          },
          {
            label: "Request Quote",
            href: "/uk-support?request=quote&product=underfloor",
            type: "request",
          },
          {
            label: "Ask a Technical Question",
            href: "/uk-support?request=technical-question&product=underfloor",
            type: "question",
          },
        ],
      },
      ua: {
        name: "Підпідлогові кабельні короби",
        applicationPoints: [
          "Прокладання силових та інформаційних кабелів під фальшпідлогою в диспетчерських та технічних приміщеннях",
          "Впорядковані, доступні для обслуговування кабельні траси при зміні обладнання",
        ],
        benefits: [
          "Приховане, охайне розведення кабелів у підпідлоговому просторі",
          "Підтримка структурованих переміщень та змін",
        ],
        actions: [
          {
            label: "Запросити технічний пакет",
            href: "/uk-support?request=technical-pack&product=underfloor",
            type: "request",
          },
          {
            label: "Запросити комерційну пропозицію",
            href: "/uk-support?request=quote&product=underfloor",
            type: "request",
          },
          {
            label: "Поставити технічне питання",
            href: "/uk-support?request=technical-question&product=underfloor",
            type: "question",
          },
        ],
      },
    },
  },
  {
    id: "earthing-lightning",
    number: PRODUCT_FAMILY_NUMBERS["earthing-lightning"],
    content: {
      uk: {
        name: "Earthing & Lightning Protection",
        applicationPoints: [
          "Provides equipment and enclosure bonding within process, plant and technical spaces",
          "Forms part of the facility's external earthing and lightning-protection network",
        ],
        benefits: [
          "Supports electrical safety and equipotential bonding",
          "Helps protect process and control equipment from lightning-related transients",
        ],
        actions: [
          {
            label: "Request Technical Pack",
            href: "/uk-support?request=technical-pack&product=earthing-lightning",
            type: "request",
          },
          {
            label: "Request Quote",
            href: "/uk-support?request=quote&product=earthing-lightning",
            type: "request",
          },
          {
            label: "Ask a Technical Question",
            href: "/uk-support?request=technical-question&product=earthing-lightning",
            type: "question",
          },
        ],
      },
      ua: {
        name: "Заземлення та блискавкозахист",
        applicationPoints: [
          "Забезпечує вирівнювання потенціалів обладнання та шаф у технологічних та технічних приміщеннях",
          "Є частиною зовнішньої мережі заземлення та блискавкозахисту об'єкта",
        ],
        benefits: [
          "Підтримка електробезпеки та вирівнювання потенціалів",
          "Захист технологічного та керуючого обладнання від імпульсних перенапруг, пов'язаних з блискавкою",
        ],
        actions: [
          {
            label: "Запросити технічний пакет",
            href: "/uk-support?request=technical-pack&product=earthing-lightning",
            type: "request",
          },
          {
            label: "Запросити комерційну пропозицію",
            href: "/uk-support?request=quote&product=earthing-lightning",
            type: "request",
          },
          {
            label: "Поставити технічне питання",
            href: "/uk-support?request=technical-question&product=earthing-lightning",
            type: "question",
          },
        ],
      },
    },
  },
  {
    id: "led-systems",
    number: PRODUCT_FAMILY_NUMBERS["led-systems"],
    content: {
      uk: {
        name: "LED Systems",
        applicationPoints: [
          "Supports LED luminaire lighting across process, plant, control and outdoor utility areas",
        ],
        benefits: [
          "Adaptable lighting layout for changing utility-site use",
          "Straightforward installation and maintenance",
        ],
        actions: [
          {
            label: "Request Technical Pack",
            href: "/uk-support?request=technical-pack&product=led-systems",
            type: "request",
          },
          {
            label: "Request Quote",
            href: "/uk-support?request=quote&product=led-systems",
            type: "request",
          },
          {
            label: "Ask a Technical Question",
            href: "/uk-support?request=technical-question&product=led-systems",
            type: "question",
          },
        ],
      },
      ua: {
        name: "Системи освітлення LED",
        applicationPoints: [
          "Підтримка LED освітлення у технологічних, технічних, диспетчерських та зовнішніх зонах об'єкта",
        ],
        benefits: [
          "Гнучке компонування освітлення при зміні використання території об'єкта",
          "Простий монтаж та обслуговування",
        ],
        actions: [
          {
            label: "Запросити технічний пакет",
            href: "/uk-support?request=technical-pack&product=led-systems",
            type: "request",
          },
          {
            label: "Запросити комерційну пропозицію",
            href: "/uk-support?request=quote&product=led-systems",
            type: "request",
          },
          {
            label: "Поставити технічне питання",
            href: "/uk-support?request=technical-question&product=led-systems",
            type: "question",
          },
        ],
      },
    },
  },
  {
    id: "ev-charging",
    number: PRODUCT_FAMILY_NUMBERS["ev-charging"],
    content: {
      uk: {
        name: "EV Charging Systems",
        applicationPoints: [
          "Supports electric-vehicle charging infrastructure at staff and visitor parking areas",
        ],
        benefits: [
          "Supports on-site EV charging as part of the wider facility power distribution design",
        ],
        actions: [
          {
            label: "Request Technical Pack",
            href: "/uk-support?request=technical-pack&product=ev-charging",
            type: "request",
          },
          {
            label: "Request Quote",
            href: "/uk-support?request=quote&product=ev-charging",
            type: "request",
          },
          {
            label: "Ask a Technical Question",
            href: "/uk-support?request=technical-question&product=ev-charging",
            type: "question",
          },
        ],
      },
      ua: {
        name: "Системи зарядки електромобілів",
        applicationPoints: [
          "Підтримка інфраструктури зарядки електромобілів на паркінгах для персоналу та відвідувачів",
        ],
        benefits: [
          "Підтримка зарядки електромобілів на об'єкті як частини загальної системи розподілу живлення",
        ],
        actions: [
          {
            label: "Запросити технічний пакет",
            href: "/uk-support?request=technical-pack&product=ev-charging",
            type: "request",
          },
          {
            label: "Запросити комерційну пропозицію",
            href: "/uk-support?request=quote&product=ev-charging",
            type: "request",
          },
          {
            label: "Поставити технічне питання",
            href: "/uk-support?request=technical-question&product=ev-charging",
            type: "question",
          },
        ],
      },
    },
  },
] as const satisfies readonly ProductFamily[];

// ---------------------------------------------------------------------------
// Busbar ürün override'ları — Industrial Facilities'teki (industrial-facility.ts)
// aynı dört gerçek Gersan ürünü ve aynı override deseni. Bu sektörde busbar
// yalnız üç somut serideki (GGD, GS, GR) ve GNL/LEDBUS'taki gibi kullanılır;
// içerik industrial-facility.ts ile bilinçli olarak birebir aynıdır (aynı
// gerçek katalog verisi, bkz. src/data/products/busbar/series/*.ts).
// ---------------------------------------------------------------------------

type BusbarOverrideFields = Pick<
  Hotspot,
  | "nameOverride"
  | "imageOverride"
  | "imageAltOverride"
  | "actionsOverride"
  | "applicationPointsOverride"
  | "benefitsOverride"
>;

const GGD_OVERRIDE: BusbarOverrideFields = {
  nameOverride: {
    uk: "GGD Medium Power Busbar",
    ua: "Шинопровід GGD Medium Power",
  },
  imageOverride: "/assets/products/busbar/ggd/card/ggd-main-transparent-product.webp",
  imageAltOverride: {
    uk: "GGD medium power busbar system cutaway view",
    ua: "Шинопровідна система GGD Medium Power — розріз продукту",
  },
  applicationPointsOverride: {
    uk: [
      "Distributes medium-current power between switchgear, distribution boards and downstream utility equipment",
      "Modular one-bolt joint system with an extensive range of elbow, offset, expansion and tap-off accessories",
    ],
    ua: [
      "Розподіл потужного струму середнього рівня між розподільними пристроями, щитами та підключеним обладнанням об'єкта",
      "Модульна система з'єднання з широким асортиментом кутових, зсувних та відгалужувальних аксесуарів",
    ],
  },
  benefitsOverride: {
    uk: [
      "Medium-current power distribution for utility switchgear line-ups",
      "Extensive tap-off and accessory range",
      "Reduced installation time versus equivalent cabling",
    ],
    ua: [
      "Розподіл потужного струму середнього рівня для ряду розподільних пристроїв об'єкта",
      "Широкий вибір відгалужень та аксесуарів",
      "Менший час монтажу порівняно з еквівалентним кабелем",
    ],
  },
  actionsOverride: {
    uk: [
      { label: "Explore GGD Busbar System", href: "/products/busbar", type: "page" },
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/ggd-medium-power-busbar",
        type: "page",
      },
      { label: "View G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      { label: "Переглянути шинопровід GGD", href: "/products/busbar", type: "page" },
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/ggd-medium-power-busbar",
        type: "page",
      },
      { label: "Переглянути G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Запросити комерційну пропозицію",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
  },
};

const GS_OVERRIDE: BusbarOverrideFields = {
  nameOverride: {
    uk: "GS Super Compact",
    ua: "Шинопровід GS Super Compact",
  },
  imageOverride: "/assets/products/busbar/gs/card/gs-main-transparent-product.webp",
  imageAltOverride: {
    uk: "GS Super Compact busbar system main product view",
    ua: "Шинопровідна система GS Super Compact — вигляд основного продукту",
  },
  applicationPointsOverride: {
    uk: [
      "Provides high-current power distribution between transformers, switchboards and external distribution equipment",
      "Compact enclosed housing suited to external, utility-yard and plant-room connection points",
    ],
    ua: [
      "Розподіл потужного струму між трансформаторами, розподільними щитами та зовнішнім розподільним обладнанням",
      "Компактний закритий корпус, придатний для зовнішніх точок підключення та технічних приміщень",
    ],
  },
  benefitsOverride: {
    uk: [
      "Compact, high-current power distribution",
      "Flexible tap-off points for downstream connections",
      "Reduced installation time versus equivalent cabling",
    ],
    ua: [
      "Компактний розподіл потужного струму",
      "Гнучкі точки підключення для нижчого обладнання",
      "Менший час монтажу порівняно з еквівалентним кабелем",
    ],
  },
  actionsOverride: {
    uk: [
      { label: "Explore GS Busbar System", href: "/products/busbar", type: "page" },
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/gs-super-compact",
        type: "page",
      },
      { label: "View G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      { label: "Переглянути шинопровід GS", href: "/products/busbar", type: "page" },
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/gs-super-compact",
        type: "page",
      },
      { label: "Переглянути G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Запросити комерційну пропозицію",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
  },
};

const GR_OVERRIDE: BusbarOverrideFields = {
  nameOverride: {
    uk: "GR Cast Resin Busbar",
    ua: "Шинопровід GR Cast Resin",
  },
  imageOverride: "/assets/products/busbar/gr/card/gr-main-transparent-product.webp",
  imageAltOverride: {
    uk: "GR Cast Resin busbar system main product view",
    ua: "Шинопровідна система GR Cast Resin — вигляд основного продукту",
  },
  applicationPointsOverride: {
    uk: [
      "Provides IP68 cast-resin insulated power distribution for humid, corrosive and washdown process environments",
      "Distributes power to pumps and motors in water and process utility buildings",
    ],
    ua: [
      "Розподіл живлення з литою ізоляцією класу IP68 для вологих, агресивних та мийних технологічних середовищ",
      "Розподіл живлення до насосів та двигунів у будівлях водопостачання та технологічних об'єктах",
    ],
  },
  benefitsOverride: {
    uk: [
      "Sealed, moisture and chemical-resistant busbar insulation",
      "Rated for humid, saline and demanding operating environments",
      "Reduced installation time versus equivalent cabling",
    ],
    ua: [
      "Герметична, стійка до вологи та хімічних речовин ізоляція шинопроводу",
      "Розрахований на вологі, солоні та складні експлуатаційні умови",
      "Менший час монтажу порівняно з еквівалентним кабелем",
    ],
  },
  actionsOverride: {
    uk: [
      { label: "Explore GR Busbar System", href: "/products/busbar", type: "page" },
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/gr-cast-resin",
        type: "page",
      },
      { label: "View G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      { label: "Переглянути шинопровід GR", href: "/products/busbar", type: "page" },
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/gr-cast-resin",
        type: "page",
      },
      { label: "Переглянути G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Запросити комерційну пропозицію",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
  },
};

const GNL_OVERRIDE: BusbarOverrideFields = {
  nameOverride: {
    uk: "GNL Lighting Busbar",
    ua: "Освітлювальний шинопровід GNL",
  },
  imageOverride:
    "/assets/products/busbar/gnl/products/gnl-hero-energy-transparent.webp",
  imageAltOverride: {
    uk: "GNL lighting busbar with blue and orange energy trails",
    ua: "Освітлювальний шинопровід GNL — вигляд основного продукту",
  },
  applicationPointsOverride: {
    uk: [
      "Energises lighting circuits along a slim overhead trunking run, with quick-connect tap-off points for each luminaire",
      "Simplifies reconfiguration of lighting layouts as control-room and operations-building use changes",
    ],
    ua: [
      "Живлення освітлювальних кіл через тонкий надземний шинопровід зі швидкими точками підключення для кожного світильника",
      "Спрощує перепланування освітлення при зміні використання диспетчерської та адміністративної будівлі",
    ],
  },
  benefitsOverride: {
    uk: [
      "Slim, low-profile lighting-circuit distribution",
      "Quick-connect tap-off points for each luminaire",
      "Simple reconfiguration as layouts change",
    ],
    ua: [
      "Тонкий, низькопрофільний розподіл освітлювальних кіл",
      "Швидкі точки підключення для кожного світильника",
      "Просте перепланування при зміні розкладки",
    ],
  },
  actionsOverride: {
    uk: [
      { label: "Explore GNL Busbar System", href: "/products/busbar", type: "page" },
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/gnl-lighting-busbar",
        type: "page",
      },
      { label: "View G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      { label: "Переглянути шинопровід GNL", href: "/products/busbar", type: "page" },
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/gnl-lighting-busbar",
        type: "page",
      },
      { label: "Переглянути G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Запросити комерційну пропозицію",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
  },
};

function hotspot(
  id: string,
  productFamilyId: Hotspot["productFamilyId"],
  x: number,
  y: number,
  labelUk: string,
  labelUa: string,
  usedHereForUk: string,
  usedHereForUa: string,
): Hotspot {
  return {
    id,
    productFamilyId,
    x,
    y,
    accessibleLabel: { uk: labelUk, ua: labelUa },
    usedHereFor: { uk: usedHereForUk, ua: usedHereForUa },
  };
}

function busbarHotspot(
  id: string,
  x: number,
  y: number,
  labelSuffixUk: string,
  labelSuffixUa: string,
  usedHereForUk: string,
  usedHereForUa: string,
  override: BusbarOverrideFields,
): Hotspot {
  return {
    id,
    productFamilyId: "busbar",
    x,
    y,
    accessibleLabel: {
      uk: `Busbar Systems, ${labelSuffixUk}`,
      ua: `Шинопровідні системи, ${labelSuffixUa}`,
    },
    usedHereFor: { uk: usedHereForUk, ua: usedHereForUa },
    ...override,
  };
}

const ZONES = [
  {
    id: "water-treatment-plant",
    number: 1,
    image: `${IMAGE_BASE}/zones/infrastructure-utilities-water-treatment-plant.webp`,
    imageAlt: {
      uk: "Water treatment plant walkway with an open cable tray, a wall-mounted panel and a copper earthing bar with bonding conductors",
      ua: "Технологічний майданчик станції водоочищення з відкритим кабельним лотком, настінним щитом та мідною шиною заземлення",
    },
    content: {
      uk: { name: "Water Treatment Plant" },
      ua: { name: "Станція водоочищення" },
    },
    approvedProductFamilyIds: ["cable-management", "earthing-lightning", "led-systems"],
    hotspots: [
      hotspot(
        "water-treatment-plant-cable-management",
        "cable-management",
        55,
        75,
        "Cable Management Systems, wall-side cable tray",
        "Системи кабельного менеджменту, кабельний лоток біля стіни",
        "Routing grouped power and control cabling from the wall-mounted panel to the treatment-process equipment.",
        "Прокладання силових та керуючих кабелів від настінного щита до технологічного обладнання очищення.",
      ),
      hotspot(
        "water-treatment-plant-earthing",
        "earthing-lightning",
        93,
        30,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Bonding the wall-mounted panel and process structure to the facility's earthing system.",
        "Вирівнювання потенціалів настінного щита та технологічної конструкції із системою заземлення об'єкта.",
      ),
      hotspot(
        "water-treatment-plant-led-systems",
        "led-systems",
        29,
        10,
        "LED Systems, outdoor floodlight",
        "Системи освітлення LED, зовнішній прожектор",
        "Providing general area lighting along the treatment-process walkway.",
        "Забезпечення загального освітлення технологічного майданчика.",
      ),
    ],
  },
  {
    id: "pumping-station",
    number: 2,
    image: `${IMAGE_BASE}/zones/infrastructure-utilities-pumping-station.webp`,
    imageAlt: {
      uk: "Pumping station with a black cast-resin busbar feeding a row of pump motors, an overhead cable tray, a copper earthing bar and linear LED lighting",
      ua: "Насосна станція з шинопроводом литої ізоляції для ряду насосів, надземним кабельним лотком, мідною шиною заземлення та лінійним LED освітленням",
    },
    content: {
      uk: { name: "Pumping Station" },
      ua: { name: "Насосна станція" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "pumping-station-cable-management",
        "cable-management",
        88,
        16,
        "Cable Management Systems, overhead cable ladder",
        "Системи кабельного менеджменту, надземна кабельна драбина",
        "Routing power and control cabling above the service corridor, separate from the busbar run.",
        "Прокладання силових та керуючих кабелів над службовим коридором, окремо від траси шинопроводу.",
      ),
      busbarHotspot(
        "pumping-station-busbar",
        35,
        18,
        "GR Cast Resin",
        "GR Cast Resin",
        "GR Cast Resin Busbar feeds each pump motor through a sealed, chemical-resistant vertical drop.",
        "Шинопровід GR Cast Resin живить кожен насосний двигун через герметичне вертикальне відгалуження, стійке до хімічних речовин.",
        GR_OVERRIDE,
      ),
      hotspot(
        "pumping-station-earthing",
        "earthing-lightning",
        10,
        45,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Providing the main equipotential bonding point for the pump line-up.",
        "Забезпечення головної точки вирівнювання потенціалів для ряду насосів.",
      ),
      hotspot(
        "pumping-station-led-systems",
        "led-systems",
        85,
        8,
        "LED Systems, linear ceiling luminaire",
        "Системи освітлення LED, лінійний стельовий світильник",
        "Providing general lighting across the pumping station.",
        "Забезпечення загального освітлення насосної станції.",
      ),
    ],
  },
  {
    id: "power-distribution-building",
    number: 3,
    image: `${IMAGE_BASE}/zones/infrastructure-utilities-power-distribution-building.png`,
    imageAlt: {
      uk: "Power distribution building with an enclosed medium-power busbar run along the left wall, an overhead cable tray, LED lighting and a copper earthing bar",
      ua: "Будівля розподілу електроенергії із закритим шинопроводом середньої потужності вздовж лівої стіни, надземним кабельним лотком, освітленням LED та мідною шиною заземлення",
    },
    content: {
      uk: { name: "Power Distribution Building" },
      ua: { name: "Будівля розподілу електроенергії" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "power-distribution-building-cable-management",
        "cable-management",
        88,
        10,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing grouped power and control cabling above the switchgear line-up.",
        "Прокладання силових та керуючих кабелів над рядом розподільних пристроїв.",
      ),
      busbarHotspot(
        "power-distribution-building-busbar",
        15,
        13,
        "GGD Medium Power",
        "GGD Medium Power",
        "GGD Medium Power Busbar distributes power along the switchgear line-up through an enclosed overhead trunking run.",
        "Шинопровід GGD Medium Power розподіляє живлення вздовж ряду розподільних пристроїв через закритий надземний шинопровід.",
        GGD_OVERRIDE,
      ),
      hotspot(
        "power-distribution-building-earthing",
        "earthing-lightning",
        93,
        75,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Bonding the switchgear line-up to the facility's earthing system.",
        "Вирівнювання потенціалів ряду розподільних пристроїв із системою заземлення об'єкта.",
      ),
      hotspot(
        "power-distribution-building-led-systems",
        "led-systems",
        52,
        6,
        "LED Systems, ceiling luminaire",
        "Системи освітлення LED, стельовий світильник",
        "Providing general lighting across the power distribution building.",
        "Забезпечення загального освітлення будівлі розподілу електроенергії.",
      ),
    ],
  },
  {
    id: "transformer-connection",
    number: 4,
    image: `${IMAGE_BASE}/zones/infrastructure-utilities-transformer-connection.webp`,
    imageAlt: {
      uk: "Transformer connection area with a compact enclosed busbar bridge between the transformer and the electrical building, an overhead cable tray and a bonding conductor",
      ua: "Зона трансформаторного підключення з компактним закритим шинопровідним містком між трансформатором та електротехнічною будівлею, надземним кабельним лотком та провідником заземлення",
    },
    content: {
      uk: { name: "Transformer Connection" },
      ua: { name: "Трансформаторне підключення" },
    },
    approvedProductFamilyIds: ["cable-management", "busbar", "earthing-lightning"],
    hotspots: [
      hotspot(
        "transformer-connection-cable-management",
        "cable-management",
        80,
        8,
        "Cable Management Systems, open overhead cable tray",
        "Системи кабельного менеджменту, відкритий надземний кабельний лоток",
        "Routing control and auxiliary cabling above the transformer-to-building connection area, separate from the busbar.",
        "Прокладання керуючих та допоміжних кабелів над зоною підключення трансформатора, окремо від шинопроводу.",
      ),
      busbarHotspot(
        "transformer-connection-busbar",
        42,
        15,
        "GS Super Compact",
        "GS Super Compact",
        "GS Super Compact connects the transformer to the electrical building through a compact enclosed busbar bridge.",
        "Шинопровід GS Super Compact з'єднує трансформатор з електротехнічною будівлею через компактний закритий шинопровідний місток.",
        GS_OVERRIDE,
      ),
      hotspot(
        "transformer-connection-earthing",
        "earthing-lightning",
        88,
        80,
        "Earthing & Lightning Protection, bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення",
        "Bonding the electrical building's distribution cabinet to the facility's earthing system.",
        "Вирівнювання потенціалів розподільної шафи електротехнічної будівлі із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "electrical-substation-yard",
    number: 5,
    image: `${IMAGE_BASE}/zones/infrastructure-utilities-electrical-substation-yard.webp`,
    imageAlt: {
      uk: "Open electrical substation yard with a metallic cable route running along the ground and visible copper earthing conductors on the gravel",
      ua: "Відкрита територія електропідстанції з металевою кабельною трасою на землі та видимими мідними провідниками заземлення на гравії",
    },
    content: {
      uk: { name: "Electrical Substation Yard" },
      ua: { name: "Територія електропідстанції" },
    },
    approvedProductFamilyIds: ["cable-management", "earthing-lightning"],
    hotspots: [
      hotspot(
        "electrical-substation-yard-cable-management",
        "cable-management",
        30,
        68,
        "Cable Management Systems, ground-level cable route",
        "Системи кабельного менеджменту, кабельна траса на рівні землі",
        "Routing auxiliary and control cabling around the yard perimeter between switchgear positions.",
        "Прокладання допоміжних та керуючих кабелів по периметру території між позиціями розподільних пристроїв.",
      ),
      hotspot(
        "electrical-substation-yard-earthing",
        "earthing-lightning",
        18,
        88,
        "Earthing & Lightning Protection, earthing grid conductor",
        "Заземлення та блискавкозахист, провідник контуру заземлення",
        "Forming part of the substation's earthing grid, bonding switchgear structures across the yard.",
        "Частина контуру заземлення підстанції, вирівнювання потенціалів конструкцій розподільних пристроїв по всій території.",
      ),
    ],
  },
  {
    id: "water-storage-tanks",
    number: 6,
    image: `${IMAGE_BASE}/zones/infrastructure-utilities-water-storage-tanks.webp`,
    imageAlt: {
      uk: "Water storage tank area with a black cable route running along the front of the tanks and a copper bonding bar on the concrete wall",
      ua: "Зона резервуарів для зберігання води з чорною кабельною трасою вздовж резервуарів та мідною шиною заземлення на бетонній стіні",
    },
    content: {
      uk: { name: "Water Storage & Tanks" },
      ua: { name: "Резервуари зберігання води" },
    },
    approvedProductFamilyIds: ["cable-management", "earthing-lightning"],
    hotspots: [
      hotspot(
        "water-storage-tanks-cable-management",
        "cable-management",
        55,
        65,
        "Cable Management Systems, tank-front cable route",
        "Системи кабельного менеджменту, кабельна траса перед резервуарами",
        "Routing power and control cabling along the front of the storage-tank area to the local distribution cabinet.",
        "Прокладання силових та керуючих кабелів вздовж зони резервуарів до місцевої розподільної шафи.",
      ),
      hotspot(
        "water-storage-tanks-earthing",
        "earthing-lightning",
        14,
        62,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Bonding the concrete plant wall and adjoining cable route to the facility's earthing system.",
        "Вирівнювання потенціалів бетонної стіни та прилеглої кабельної траси із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "outdoor-infrastructure",
    number: 7,
    image: `${IMAGE_BASE}/zones/infrastructure-utilities-outdoor-infrastructure.webp`,
    imageAlt: {
      uk: "Outdoor utility corridor at dusk with an elevated cable ladder carrying grouped cables and an LED area-lighting column",
      ua: "Зовнішній технічний коридор у сутінках з піднятою кабельною драбиною та опорою LED освітлення території",
    },
    content: {
      uk: { name: "Outdoor Infrastructure" },
      ua: { name: "Зовнішня інфраструктура" },
    },
    approvedProductFamilyIds: ["cable-management", "led-systems"],
    hotspots: [
      hotspot(
        "outdoor-infrastructure-cable-management",
        "cable-management",
        25,
        20,
        "Cable Management Systems, elevated cable ladder",
        "Системи кабельного менеджменту, піднята кабельна драбина",
        "Routing grouped power and control cabling along the elevated service route between plant buildings.",
        "Прокладання силових та керуючих кабелів по піднятій технічній трасі між будівлями об'єкта.",
      ),
      hotspot(
        "outdoor-infrastructure-led-systems",
        "led-systems",
        91,
        8,
        "LED Systems, area-lighting column head",
        "Системи освітлення LED, головка опори освітлення території",
        "Providing general area lighting along the outdoor utility corridor.",
        "Забезпечення загального освітлення зовнішнього технічного коридору.",
      ),
    ],
  },
  {
    id: "control-operations-building",
    number: 8,
    image: `${IMAGE_BASE}/zones/infrastructure-utilities-control-operations-building.webp`,
    imageAlt: {
      uk: "Control and operations building with a slim overhead lighting busbar feeding LED luminaires, a separate open cable tray, an opened raised-floor trunking section and a bonding conductor",
      ua: "Диспетчерська та адміністративна будівля з тонким надземним освітлювальним шинопроводом для LED світильників, окремим відкритим кабельним лотком, відкритою секцією коробів під фальшпідлогою та провідником заземлення",
    },
    content: {
      uk: { name: "Control & Operations Building" },
      ua: { name: "Диспетчерська та адміністративна будівля" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "underfloor",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "control-operations-building-cable-management",
        "cable-management",
        15,
        8,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and data cabling above the technical cabinet, distinct from the lighting busbar.",
        "Прокладання силових та інформаційних кабелів над технічною шафою, окремо від освітлювального шинопроводу.",
      ),
      busbarHotspot(
        "control-operations-building-busbar",
        68,
        5,
        "GNL Lighting Busbar",
        "GNL Lighting Busbar",
        "GNL Lighting Busbar distributes power along the control room ceiling and provides organised tap-off connections for the luminaire line.",
        "Освітлювальний шинопровід GNL розподіляє живлення вздовж стелі диспетчерської та забезпечує впорядковані точки підключення для лінії світильників.",
        GNL_OVERRIDE,
      ),
      hotspot(
        "control-operations-building-underfloor",
        "underfloor",
        58,
        85,
        "Underfloor Cable Trunking, raised-floor cable route",
        "Підпідлогові кабельні короби, кабельна траса під фальшпідлогою",
        "Routing power and data cabling beneath the raised access floor to the technical cabinet and workstations.",
        "Прокладання силових та інформаційних кабелів під фальшпідлогою до технічної шафи та робочих місць.",
      ),
      hotspot(
        "control-operations-building-earthing",
        "earthing-lightning",
        12,
        80,
        "Earthing & Lightning Protection, bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення",
        "Bonding the technical cabinet and structural column to the facility's earthing system.",
        "Вирівнювання потенціалів технічної шафи та конструктивної колони із системою заземлення об'єкта.",
      ),
      hotspot(
        "control-operations-building-led-systems",
        "led-systems",
        85,
        12,
        "LED Systems, linear luminaire",
        "Системи освітлення LED, лінійний світильник",
        "Providing general lighting across the control room, fed from the overhead lighting busbar.",
        "Забезпечення загального освітлення диспетчерської, яке живиться від надземного освітлювального шинопроводу.",
      ),
    ],
  },
] as const satisfies readonly Zone<InfrastructureUtilitiesZoneId>[];

function overviewHotspot(
  id: string,
  zoneId: InfrastructureUtilitiesZoneId,
  x: number,
  y: number,
  labelUk: string,
  labelUa: string,
): OverviewHotspot<InfrastructureUtilitiesZoneId> {
  return {
    id,
    zoneId,
    x,
    y,
    accessibleLabel: { uk: labelUk, ua: labelUa },
  };
}

const OVERVIEW = {
  image: `${IMAGE_BASE}/overview/infrastructure-utilities-application-map-overview.webp`,
  imageAlt: {
    uk: "Aerial view of an infrastructure and utilities site showing the water treatment basins, pumping station, electrical buildings, substation yard and storage tanks",
    ua: "Вигляд з висоти на об'єкт інфраструктури та комунального господарства з басейнами водоочищення, насосною станцією, електротехнічними будівлями, підстанцією та резервуарами",
  },
  hotspots: [
    overviewHotspot(
      "overview-water-treatment-plant",
      "water-treatment-plant",
      75,
      38,
      "Water Treatment Plant",
      "Станція водоочищення",
    ),
    overviewHotspot(
      "overview-pumping-station",
      "pumping-station",
      52,
      50,
      "Pumping Station",
      "Насосна станція",
    ),
    overviewHotspot(
      "overview-power-distribution-building",
      "power-distribution-building",
      80,
      45,
      "Power Distribution Building",
      "Будівля розподілу електроенергії",
    ),
    overviewHotspot(
      "overview-transformer-connection",
      "transformer-connection",
      58,
      80,
      "Transformer Connection",
      "Трансформаторне підключення",
    ),
    overviewHotspot(
      "overview-electrical-substation-yard",
      "electrical-substation-yard",
      58,
      72,
      "Electrical Substation Yard",
      "Територія електропідстанції",
    ),
    overviewHotspot(
      "overview-water-storage-tanks",
      "water-storage-tanks",
      75,
      20,
      "Water Storage & Tanks",
      "Резервуари зберігання води",
    ),
    overviewHotspot(
      "overview-outdoor-infrastructure",
      "outdoor-infrastructure",
      18,
      68,
      "Outdoor Infrastructure",
      "Зовнішня інфраструктура",
    ),
    overviewHotspot(
      "overview-control-operations-building",
      "control-operations-building",
      32,
      32,
      "Control & Operations Building",
      "Диспетчерська та адміністративна будівля",
    ),
  ],
} as const;

export const INFRASTRUCTURE_UTILITIES_APPLICATION_MAP = {
  overview: OVERVIEW,
  zones: ZONES,
  productFamilies: PRODUCT_FAMILIES,
} as const satisfies ApplicationMap<InfrastructureUtilitiesZoneId>;

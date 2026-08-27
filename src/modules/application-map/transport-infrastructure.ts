import { publicMediaUrl } from "@/modules/storage/asset-url";
import { PRODUCT_FAMILY_NUMBERS } from "./types";

import type {
  ApplicationMap,
  Hotspot,
  OverviewHotspot,
  ProductFamily,
  Zone,
} from "./types";

const IMAGE_BASE = publicMediaUrl("application-map/transport-infrastructure");

// NOT: Prompt sekiz bölge istiyor (bkz. prompt.md #2), ancak
// "airport-electrical-riser-service-shaft.webp" deposunda MEVCUT DEĞİL —
// yalnızca ilgisiz bir kompozit illüstrasyon ("1.webp") var, gerçek bir
// riser/service-shaft fotoğrafı değil. Prompt'un kendi talimatına uyularak
// ("do not substitute... report the missing asset clearly") bu bölge
// uydurma bir görselle eklenmedi; gerçek varlık sağlandığında ZONE_IDS'e
// "electrical-riser-service-shaft" eklenip bu dosyaya yeni bir Zone girişi
// yazılmalı. Şimdilik yedi bölge tam ve doğrulanmış durumda.
export const TRANSPORT_INFRASTRUCTURE_ZONE_IDS = [
  "main-electrical-room",
  "terminal-concourse-passenger-services",
  "baggage-handling-conveyor-hall",
  "central-plant-room",
  "transformer-utility-power-interface",
  "airfield-apron-infrastructure",
  "parking-fleet-ev-charging",
] as const;

export type TransportInfrastructureZoneId =
  (typeof TRANSPORT_INFRASTRUCTURE_ZONE_IDS)[number];

const PRODUCT_FAMILIES = [
  {
    id: "cable-management",
    number: PRODUCT_FAMILY_NUMBERS["cable-management"],
    content: {
      uk: {
        name: "Cable Management Systems",
        applicationPoints: [
          "Routes power and control cabling between switchgear, terminal services and airside infrastructure",
          "Supports structured cabling across electrical rooms, concourse ceilings and apron service routes",
        ],
        benefits: [
          "Organised, serviceable cable routing across the terminal and airside estate",
          "Supports structured expansion as terminal fit-out and airside equipment change",
          "Reduces cable clutter in ceiling voids and outdoor service routes",
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
          "Прокладання силових та керуючих кабелів між розподільними пристроями, термінальними службами та інфраструктурою аеродрому",
          "Підтримка структурованого кабелювання в електротехнічних приміщеннях, стелях залу очікування та трасах обслуговування перону",
        ],
        benefits: [
          "Впорядковане, зручне для обслуговування прокладання кабелів по всьому терміналу та аеродрому",
          "Підтримка структурованого розширення при зміні облаштування терміналу та аеродромного обладнання",
          "Менше кабельного безладу в стельових просторах та зовнішніх трасах обслуговування",
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
        image: publicMediaUrl("products/busbar/gs/card/gs-main-transparent-product.webp"),
        imageAlt: "GS Super Compact busbar system main product view",
        applicationPoints: [
          "Distributes power between switchgear, distribution boards and downstream terminal equipment",
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
        image: publicMediaUrl("products/busbar/gs/card/gs-main-transparent-product.webp"),
        imageAlt: "Шинопровідна система GS Super Compact — вигляд основного продукту",
        applicationPoints: [
          "Розподіл живлення між розподільними пристроями, щитами та підключеним обладнанням терміналу",
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
          "Routes power and data cabling beneath a raised access floor across terminal public areas",
          "Keeps cable runs organised and accessible for maintenance as gate and check-in layouts change",
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
          "Прокладання силових та інформаційних кабелів під фальшпідлогою в громадських зонах терміналу",
          "Впорядковані, доступні для обслуговування кабельні траси при зміні розкладки стійок реєстрації та виходів",
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
          "Provides equipment and enclosure bonding within electrical rooms, plant rooms and airside compounds",
          "Forms part of the airport's earthing and lightning-protection network",
        ],
        benefits: [
          "Supports electrical safety and equipotential bonding",
          "Helps protect terminal and airside equipment from lightning-related transients",
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
          "Забезпечує вирівнювання потенціалів обладнання та шаф в електротехнічних приміщеннях, технічних залах та зонах аеродрому",
          "Є частиною мережі заземлення та блискавкозахисту аеропорту",
        ],
        benefits: [
          "Підтримка електробезпеки та вирівнювання потенціалів",
          "Захист обладнання терміналу та аеродрому від імпульсних перенапруг, пов'язаних з блискавкою",
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
          "Supports LED luminaire lighting across electrical rooms, terminal concourses and airside areas",
        ],
        benefits: [
          "Adaptable lighting layout for changing terminal and airside use",
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
          "Підтримка LED освітлення в електротехнічних приміщеннях, залах терміналу та зонах аеродрому",
        ],
        benefits: [
          "Гнучке компонування освітлення при зміні використання терміналу та аеродрому",
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
          "Supports electric-vehicle charging infrastructure at staff, fleet and passenger parking areas",
        ],
        benefits: [
          "Supports on-site EV charging as part of the wider airport power distribution design",
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
          "Підтримка інфраструктури зарядки електромобілів на паркінгах персоналу, парку та пасажирів",
        ],
        benefits: [
          "Підтримка зарядки електромобілів на об'єкті як частини загальної системи розподілу живлення аеропорту",
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
// Busbar ürün override'ları — dört gerçek seri: GGD Medium Power, GS Super
// Compact, GR Cast Resin ve GNL Lighting Busbar (LEDBUS). İçerik diğer
// sektörlerle (Commercial Building, Industrial Facility, Data Centre) aynı
// gerçek katalog verisine dayanır — bkz. src/data/products/busbar/series/*.
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
  imageOverride: publicMediaUrl("products/busbar/ggd/card/ggd-main-transparent-product.webp"),
  imageAltOverride: {
    uk: "GGD medium power busbar system cutaway view",
    ua: "Шинопровідна система GGD Medium Power — розріз продукту",
  },
  applicationPointsOverride: {
    uk: [
      "Distributes medium-current power between switchgear, distribution boards and downstream terminal equipment",
      "Modular one-bolt joint system with an extensive range of elbow, offset, expansion and tap-off accessories",
    ],
    ua: [
      "Розподіл потужного струму середнього рівня між розподільними пристроями, щитами та підключеним обладнанням терміналу",
      "Модульна система з'єднання з широким асортиментом кутових, зсувних та відгалужувальних аксесуарів",
    ],
  },
  benefitsOverride: {
    uk: [
      "Medium-current power distribution for terminal switchgear line-ups",
      "Extensive tap-off and accessory range",
      "Reduced installation time versus equivalent cabling",
    ],
    ua: [
      "Розподіл потужного струму середнього рівня для рядів розподільних щитів терміналу",
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
  imageOverride: publicMediaUrl("products/busbar/gs/card/gs-main-transparent-product.webp"),
  imageAltOverride: {
    uk: "GS Super Compact busbar system main product view",
    ua: "Шинопровідна система GS Super Compact — вигляд основного продукту",
  },
  applicationPointsOverride: {
    uk: [
      "Provides high-current power distribution between the transformer and the electrical-service building",
      "Compact enclosed housing suited to external, airside and plant-room connection points",
    ],
    ua: [
      "Розподіл потужного струму між трансформатором та електротехнічною будівлею",
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
  imageOverride: publicMediaUrl("products/busbar/gr/card/gr-main-transparent-product.webp"),
  imageAltOverride: {
    uk: "GR Cast Resin busbar system main product view",
    ua: "Шинопровідна система GR Cast Resin — вигляд основного продукту",
  },
  applicationPointsOverride: {
    uk: [
      "Provides IP68 cast-resin insulated power distribution for the central plant room's pumps, motors and chillers",
      "Sealed construction suited to humid and washdown plant-room environments",
    ],
    ua: [
      "Розподіл живлення з литою ізоляцією класу IP68 для насосів, двигунів та чилерів центрального технічного залу",
      "Герметична конструкція, розрахована на вологі умови технічного приміщення",
    ],
  },
  benefitsOverride: {
    uk: [
      "Sealed, moisture and chemical-resistant busbar insulation",
      "Rated for humid and demanding plant-room environments",
      "Reduced installation time versus equivalent cabling",
    ],
    ua: [
      "Герметична, стійка до вологи та хімічних речовин ізоляція шинопроводу",
      "Розрахований на вологі та складні умови технічного приміщення",
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
    publicMediaUrl("products/busbar/gnl/products/gnl-hero-energy-transparent.webp"),
  imageAltOverride: {
    uk: "GNL lighting busbar with blue and orange energy trails",
    ua: "Освітлювальний шинопровід GNL — вигляд основного продукту",
  },
  applicationPointsOverride: {
    uk: [
      "Energises the concourse lighting circuit along a slim overhead trunking run, with quick-connect tap-off points for each luminaire",
      "Simplifies reconfiguration of lighting layouts as gate and check-in areas change",
    ],
    ua: [
      "Живлення освітлювального кола залу очікування через тонкий надземний шинопровід зі швидкими точками підключення для кожного світильника",
      "Спрощує перепланування освітлення при зміні зон реєстрації та виходів",
    ],
  },
  benefitsOverride: {
    uk: [
      "Slim, low-profile lighting-circuit distribution",
      "Quick-connect tap-off points for each luminaire",
      "Simple reconfiguration as concourse layouts change",
    ],
    ua: [
      "Тонкий, низькопрофільний розподіл освітлювальних кіл",
      "Швидкі точки підключення для кожного світильника",
      "Просте перепланування при зміні розкладки залу очікування",
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
    id: "main-electrical-room",
    number: 1,
    image: `${IMAGE_BASE}/zones/airport-main-electrical-room.webp`,
    imageAlt: {
      uk: "Airport main electrical room with an enclosed medium-power busbar above the switchgear line-up, an overhead cable tray and a copper earthing bar",
      ua: "Головне електротехнічне приміщення аеропорту із закритим шинопроводом середньої потужності над рядом розподільних щитів, надземним кабельним лотком та мідною шиною заземлення",
    },
    content: {
      uk: { name: "Main Electrical Room" },
      ua: { name: "Головне електротехнічне приміщення" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "main-electrical-room-cable-management",
        "cable-management",
        55,
        8,
        "Cable Management Systems, overhead wire-mesh tray",
        "Системи кабельного менеджменту, надземний сітчастий лоток",
        "Routing power and control cabling above the distribution panel line-up.",
        "Прокладання силових та керуючих кабелів над рядом розподільних щитів.",
      ),
      busbarHotspot(
        "main-electrical-room-busbar",
        25,
        18,
        "GGD Medium Power",
        "GGD Medium Power",
        "GGD Medium Power Busbar distributes power along the switchgear line-up through an enclosed overhead trunking run.",
        "Шинопровід GGD Medium Power розподіляє живлення вздовж ряду розподільних щитів через закритий надземний шинопровід.",
        GGD_OVERRIDE,
      ),
      hotspot(
        "main-electrical-room-earthing",
        "earthing-lightning",
        6,
        42,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Providing the main equipotential bonding point for the switchgear line-up.",
        "Забезпечення головної точки вирівнювання потенціалів для ряду розподільних щитів.",
      ),
      hotspot(
        "main-electrical-room-led-systems",
        "led-systems",
        83,
        18,
        "LED Systems, linear luminaire",
        "Системи освітлення LED, лінійний світильник",
        "Providing general lighting for the main electrical room.",
        "Забезпечення загального освітлення головного електротехнічного приміщення.",
      ),
    ],
  },
  {
    id: "terminal-concourse-passenger-services",
    number: 2,
    image: `${IMAGE_BASE}/zones/airport-terminal-concourse-passenger-services.webp`,
    imageAlt: {
      uk: "Terminal concourse with an open overhead cable tray, a slim lighting busbar feeding linear LED luminaires, and an opened raised-floor cable route",
      ua: "Зал очікування терміналу з відкритим надземним кабельним лотком, тонким освітлювальним шинопроводом для лінійних LED світильників та відкритою кабельною трасою під фальшпідлогою",
    },
    content: {
      uk: { name: "Terminal Concourse & Passenger Services" },
      ua: { name: "Зал очікування та обслуговування пасажирів" },
    },
    // Bu bölgede fotoğrafta net bir bakır topraklama barı veya sarı-yeşil
    // bonding iletken görülmüyor; proje talimatı gereği (bkz. prompt.md)
    // kategori 4 yalnız görsel olarak doğrulanabildiğinde eklenir — burada
    // eklenmedi.
    approvedProductFamilyIds: ["cable-management", "busbar", "underfloor", "led-systems"],
    hotspots: [
      hotspot(
        "terminal-concourse-cable-management",
        "cable-management",
        20,
        10,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and data cabling above the concourse, distinct from the lighting busbar.",
        "Прокладання силових та інформаційних кабелів над залом очікування, окремо від освітлювального шинопроводу.",
      ),
      busbarHotspot(
        "terminal-concourse-busbar",
        48,
        9,
        "GNL Lighting Busbar",
        "GNL Lighting Busbar",
        "GNL Lighting Busbar distributes power along the concourse ceiling and provides organised tap-off connections for the luminaire line.",
        "Освітлювальний шинопровід GNL розподіляє живлення вздовж стелі залу очікування та забезпечує впорядковані точки підключення для лінії світильників.",
        GNL_OVERRIDE,
      ),
      hotspot(
        "terminal-concourse-underfloor",
        "underfloor",
        65,
        80,
        "Underfloor Cable Trunking, raised-floor cable route",
        "Підпідлогові кабельні короби, кабельна траса під фальшпідлогою",
        "Routing power and data cabling beneath the raised access floor to passenger service points.",
        "Прокладання силових та інформаційних кабелів під фальшпідлогою до пунктів обслуговування пасажирів.",
      ),
      hotspot(
        "terminal-concourse-led-systems",
        "led-systems",
        75,
        12,
        "LED Systems, linear luminaire",
        "Системи освітлення LED, лінійний світильник",
        "Providing general lighting across the terminal concourse, fed from the overhead lighting busbar.",
        "Забезпечення загального освітлення залу очікування, яке живиться від надземного освітлювального шинопроводу.",
      ),
    ],
  },
  {
    id: "baggage-handling-conveyor-hall",
    number: 3,
    image: `${IMAGE_BASE}/zones/airport-baggage-handling-conveyor-hall.webp`,
    imageAlt: {
      uk: "Baggage handling hall with an overhead cable ladder above the conveyor line, an enclosed medium-power busbar with tap-off boxes, a copper earthing bar and LED lighting",
      ua: "Зала обробки багажу з надземною кабельною драбиною над конвеєрною лінією, закритим шинопроводом середньої потужності з відгалуженнями, мідною шиною заземлення та освітленням LED",
    },
    content: {
      uk: { name: "Baggage Handling & Conveyor Hall" },
      ua: { name: "Зала обробки багажу" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "baggage-handling-cable-management",
        "cable-management",
        20,
        10,
        "Cable Management Systems, overhead cable ladder",
        "Системи кабельного менеджменту, надземна кабельна драбина",
        "Routing power and control cabling above the conveyor line to local feeders.",
        "Прокладання силових та керуючих кабелів над конвеєрною лінією до місцевих щитів.",
      ),
      busbarHotspot(
        "baggage-handling-busbar",
        65,
        16,
        "GGD Medium Power",
        "GGD Medium Power",
        "GGD Medium Power Busbar runs along the hall wall, feeding local conveyor control panels through floor-level tap-off boxes.",
        "Шинопровід GGD Medium Power прокладено вздовж стіни зали, живлячи місцеві щити керування конвеєром через відгалуження.",
        GGD_OVERRIDE,
      ),
      hotspot(
        "baggage-handling-earthing",
        "earthing-lightning",
        92,
        76,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Bonding the conveyor control panels and local distribution equipment to the building's earthing system.",
        "Вирівнювання потенціалів щитів керування конвеєром та місцевого розподільного обладнання із системою заземлення будівлі.",
      ),
      hotspot(
        "baggage-handling-led-systems",
        "led-systems",
        12,
        8,
        "LED Systems, high-bay luminaire",
        "Системи освітлення LED, промисловий світильник",
        "Providing general lighting across the baggage handling hall.",
        "Забезпечення загального освітлення зали обробки багажу.",
      ),
    ],
  },
  {
    id: "central-plant-room",
    number: 4,
    image: `${IMAGE_BASE}/zones/airport-central-plant-room.webp`,
    imageAlt: {
      uk: "Central plant room with a black cast-resin busbar feeding pump motors and chillers, an overhead wire-mesh tray, LED lighting and a labelled main earth bar",
      ua: "Центральний технічний зал із шинопроводом литої ізоляції для насосів та чилерів, надземним сітчастим лотком, освітленням LED та позначеною головною шиною заземлення",
    },
    content: {
      uk: { name: "Central Plant Room" },
      ua: { name: "Центральний технічний зал" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "central-plant-room-cable-management",
        "cable-management",
        80,
        15,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing control and power cabling above the plant room, separate from the busbar.",
        "Прокладання керуючих та силових кабелів над технічним залом, окремо від шинопроводу.",
      ),
      busbarHotspot(
        "central-plant-room-busbar",
        15,
        12,
        "GR Cast Resin",
        "GR Cast Resin",
        "GR Cast Resin Busbar distributes high-power feed to the pump motors and chillers through a sealed, chemical-resistant enclosure.",
        "Шинопровід GR Cast Resin розподіляє потужне живлення до насосних двигунів та чилерів через герметичний, стійкий до хімічних речовин корпус.",
        GR_OVERRIDE,
      ),
      hotspot(
        "central-plant-room-earthing",
        "earthing-lightning",
        94,
        68,
        "Earthing & Lightning Protection, main earth bar",
        "Заземлення та блискавкозахист, головна шина заземлення",
        "Providing the main equipotential bonding point for the plant room's pumps, chillers and switchgear.",
        "Забезпечення головної точки вирівнювання потенціалів для насосів, чилерів та розподільних щитів технічного залу.",
      ),
      hotspot(
        "central-plant-room-led-systems",
        "led-systems",
        81,
        10,
        "LED Systems, linear luminaire",
        "Системи освітлення LED, лінійний світильник",
        "Providing general lighting across the central plant room.",
        "Забезпечення загального освітлення центрального технічного залу.",
      ),
    ],
  },
  {
    id: "transformer-utility-power-interface",
    number: 5,
    image: `${IMAGE_BASE}/zones/airport-transformer-utility-power-interface.webp`,
    imageAlt: {
      uk: "Transformer and utility power interface with a compact enclosed busbar bridge between the transformer and the electrical-service building, an overhead cable tray and a bonding conductor",
      ua: "Трансформаторний вузол з компактним закритим шинопровідним містком між трансформатором та електротехнічною будівлею, надземним кабельним лотком та провідником заземлення",
    },
    content: {
      uk: { name: "Transformer & Utility Power Interface" },
      ua: { name: "Трансформаторний вузол живлення" },
    },
    approvedProductFamilyIds: ["cable-management", "busbar", "earthing-lightning"],
    hotspots: [
      hotspot(
        "transformer-interface-cable-management",
        "cable-management",
        88,
        13,
        "Cable Management Systems, auxiliary cable tray",
        "Системи кабельного менеджменту, допоміжний кабельний лоток",
        "Routing auxiliary and control cabling along the electrical-service building wall, separate from the busbar.",
        "Прокладання допоміжних та керуючих кабелів вздовж стіни електротехнічної будівлі, окремо від шинопроводу.",
      ),
      busbarHotspot(
        "transformer-interface-busbar",
        35,
        22,
        "GS Super Compact",
        "GS Super Compact",
        "GS Super Compact connects the transformer output to the electrical-service building through a compact enclosed busbar bridge.",
        "Шинопровід GS Super Compact з'єднує вихід трансформатора з електротехнічною будівлею через компактний закритий шинопровідний місток.",
        GS_OVERRIDE,
      ),
      hotspot(
        "transformer-interface-earthing",
        "earthing-lightning",
        92,
        78,
        "Earthing & Lightning Protection, bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення",
        "Bonding the electrical-service building to the transformer compound's earthing system.",
        "Вирівнювання потенціалів електротехнічної будівлі із системою заземлення трансформаторного вузла.",
      ),
    ],
  },
  {
    id: "airfield-apron-infrastructure",
    number: 6,
    image: `${IMAGE_BASE}/zones/airport-airfield-apron-infrastructure.webp`,
    imageAlt: {
      uk: "Airfield apron at dusk with a protected external cable route, a high-mast LED luminaire and a bonding connection at the base of a service post",
      ua: "Перон аеродрому в сутінках із захищеною зовнішньою кабельною трасою, високощогловим LED світильником та з'єднанням заземлення біля основи технічної стійки",
    },
    content: {
      uk: { name: "Airfield & Apron Infrastructure" },
      ua: { name: "Інфраструктура аеродрому та перону" },
    },
    approvedProductFamilyIds: ["cable-management", "earthing-lightning", "led-systems"],
    hotspots: [
      hotspot(
        "airfield-apron-cable-management",
        "cable-management",
        25,
        80,
        "Cable Management Systems, protected external cable route",
        "Системи кабельного менеджменту, захищена зовнішня кабельна траса",
        "Routing power and control cabling along the protected apron-side cable route.",
        "Прокладання силових та керуючих кабелів вздовж захищеної кабельної траси перону.",
      ),
      hotspot(
        "airfield-apron-earthing",
        "earthing-lightning",
        63,
        88,
        "Earthing & Lightning Protection, bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення",
        "Bonding the apron service post to the airfield's earthing system.",
        "Вирівнювання потенціалів технічної стійки перону із системою заземлення аеродрому.",
      ),
      hotspot(
        "airfield-apron-led-systems",
        "led-systems",
        70,
        12,
        "LED Systems, high-mast luminaire head",
        "Системи освітлення LED, головка високощоглового світильника",
        "Providing area lighting across the apron and aircraft stands.",
        "Забезпечення освітлення перону та місць стоянки повітряних суден.",
      ),
    ],
  },
  {
    id: "parking-fleet-ev-charging",
    number: 7,
    image: `${IMAGE_BASE}/zones/airport-parking-fleet-ev-charging.webp`,
    imageAlt: {
      uk: "Parking and fleet EV charging canopy with a galvanised overhead feeder tray, a copper earthing bar, canopy LED lighting and a row of EV chargers",
      ua: "Навіс для зарядки електромобілів парку з оцинкованим надземним кабельним лотком, мідною шиною заземлення, освітленням LED навісу та рядом зарядних станцій",
    },
    content: {
      uk: { name: "Parking, Fleet & EV Charging" },
      ua: { name: "Паркінг, автопарк та зарядка електромобілів" },
    },
    approvedProductFamilyIds: ["cable-management", "earthing-lightning", "led-systems", "ev-charging"],
    hotspots: [
      hotspot(
        "parking-fleet-ev-charging-cable-management",
        "cable-management",
        25,
        10,
        "Cable Management Systems, overhead feeder tray",
        "Системи кабельного менеджменту, надземний лоток живлення",
        "Feeding power from the distribution cabinet to the EV charging canopy.",
        "Живлення від розподільної шафи до навісу зарядних станцій електромобілів.",
      ),
      hotspot(
        "parking-fleet-ev-charging-earthing",
        "earthing-lightning",
        35,
        58,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Bonding the distribution cabinet to the facility's earthing system.",
        "Вирівнювання потенціалів розподільної шафи із системою заземлення об'єкта.",
      ),
      hotspot(
        "parking-fleet-ev-charging-led-systems",
        "led-systems",
        73,
        13,
        "LED Systems, canopy luminaire",
        "Системи освітлення LED, світильник навісу",
        "Providing area lighting beneath the EV charging canopy.",
        "Забезпечення освітлення під навісом зарядних станцій електромобілів.",
      ),
      hotspot(
        "parking-fleet-ev-charging-ev-charging",
        "ev-charging",
        63,
        50,
        "EV Charging Systems, charge point",
        "Системи зарядки електромобілів, зарядна станція",
        "Providing power distribution to EV charging points for staff and fleet vehicles.",
        "Розподіл живлення до зарядних станцій електромобілів для персоналу та автопарку.",
      ),
    ],
  },
] as const satisfies readonly Zone<TransportInfrastructureZoneId>[];

function overviewHotspot(
  id: string,
  zoneId: TransportInfrastructureZoneId,
  x: number,
  y: number,
  labelUk: string,
  labelUa: string,
): OverviewHotspot<TransportInfrastructureZoneId> {
  return {
    id,
    zoneId,
    x,
    y,
    accessibleLabel: { uk: labelUk, ua: labelUa },
  };
}

const OVERVIEW = {
  image: `${IMAGE_BASE}/overview/airport-application-map-overview.webp`,
  imageAlt: {
    uk: "Aerial night view of an airport campus showing the terminal building, plant and utility buildings, transformer compound, apron and EV charging canopy",
    ua: "Нічний вигляд з висоти на територію аеропорту з будівлею терміналу, технічними будівлями, трансформаторним вузлом, пероном та навісом зарядки електромобілів",
  },
  hotspots: [
    overviewHotspot(
      "overview-main-electrical-room",
      "main-electrical-room",
      42,
      47,
      "Main Electrical Room",
      "Головне електротехнічне приміщення",
    ),
    overviewHotspot(
      "overview-terminal-concourse-passenger-services",
      "terminal-concourse-passenger-services",
      63,
      28,
      "Terminal Concourse & Passenger Services",
      "Зал очікування та обслуговування пасажирів",
    ),
    overviewHotspot(
      "overview-baggage-handling-conveyor-hall",
      "baggage-handling-conveyor-hall",
      75,
      35,
      "Baggage Handling & Conveyor Hall",
      "Зала обробки багажу",
    ),
    overviewHotspot(
      "overview-central-plant-room",
      "central-plant-room",
      70,
      52,
      "Central Plant Room",
      "Центральний технічний зал",
    ),
    overviewHotspot(
      "overview-transformer-utility-power-interface",
      "transformer-utility-power-interface",
      58,
      58,
      "Transformer & Utility Power Interface",
      "Трансформаторний вузол живлення",
    ),
    overviewHotspot(
      "overview-airfield-apron-infrastructure",
      "airfield-apron-infrastructure",
      50,
      10,
      "Airfield & Apron Infrastructure",
      "Інфраструктура аеродрому та перону",
    ),
    overviewHotspot(
      "overview-parking-fleet-ev-charging",
      "parking-fleet-ev-charging",
      76,
      76,
      "Parking, Fleet & EV Charging",
      "Паркінг, автопарк та зарядка електромобілів",
    ),
  ],
} as const;

export const TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP = {
  overview: OVERVIEW,
  zones: ZONES,
  productFamilies: PRODUCT_FAMILIES,
} as const satisfies ApplicationMap<TransportInfrastructureZoneId>;

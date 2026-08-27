import { publicMediaUrl } from "@/modules/storage/asset-url";
import { PRODUCT_FAMILY_NUMBERS } from "./types";

import type {
  ApplicationMap,
  Hotspot,
  OverviewHotspot,
  ProductFamily,
  Zone,
} from "./types";

const IMAGE_BASE = publicMediaUrl("application-map/renewable-energy");

export const RENEWABLE_ENERGY_ZONE_IDS = [
  "main-electrical-room",
  "bess-power-conversion-distribution",
  "solar-inverter-transformer-interface",
  "wind-turbine-tower-base",
  "hydro-turbine-pump-hall",
  "grid-connection-substation",
  "control-monitoring-building",
  "ev-charging-integration",
] as const;

export type RenewableEnergyZoneId = (typeof RENEWABLE_ENERGY_ZONE_IDS)[number];

const PRODUCT_FAMILIES = [
  {
    id: "cable-management",
    number: PRODUCT_FAMILY_NUMBERS["cable-management"],
    content: {
      uk: {
        name: "Cable Management Systems",
        applicationPoints: [
          "Routes power and control cabling between switchgear, generation equipment and site electrical buildings",
          "Supports structured cabling across electrical rooms, plant halls and outdoor generation areas",
        ],
        benefits: [
          "Organised, serviceable cable routing across the generation site",
          "Supports structured expansion as generation and storage capacity changes",
          "Reduces cable clutter in plant rooms and outdoor service routes",
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
          "Прокладання силових та керуючих кабелів між розподільними пристроями, генеруючим обладнанням та електротехнічними будівлями об'єкта",
          "Підтримка структурованого кабелювання в електротехнічних приміщеннях, технічних залах та зовнішніх зонах генерації",
        ],
        benefits: [
          "Впорядковане, зручне для обслуговування прокладання кабелів на об'єкті генерації",
          "Підтримка структурованого розширення при зміні потужності генерації та накопичення",
          "Менше кабельного безладу в технічних залах та зовнішніх трасах обслуговування",
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
          "Distributes power between switchgear, distribution boards and downstream generation equipment",
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
          "Розподіл живлення між розподільними пристроями, щитами та підключеним генеруючим обладнанням",
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
          "Routes power and data cabling beneath a raised access floor in the control and monitoring building",
          "Keeps cable runs organised and accessible for maintenance as monitoring equipment changes",
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
          "Прокладання силових та інформаційних кабелів під фальшпідлогою в диспетчерській будівлі",
          "Впорядковані, доступні для обслуговування кабельні траси при зміні моніторингового обладнання",
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
          "Provides equipment and enclosure bonding within electrical rooms, plant halls and outdoor compounds",
          "Forms part of the generation site's earthing and lightning-protection network",
        ],
        benefits: [
          "Supports electrical safety and equipotential bonding",
          "Helps protect generation and storage equipment from lightning-related transients",
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
          "Забезпечує вирівнювання потенціалів обладнання та шаф в електротехнічних приміщеннях, технічних залах та зовнішніх зонах",
          "Є частиною мережі заземлення та блискавкозахисту об'єкта генерації",
        ],
        benefits: [
          "Підтримка електробезпеки та вирівнювання потенціалів",
          "Захист генеруючого та накопичувального обладнання від імпульсних перенапруг, пов'язаних з блискавкою",
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
          "Supports LED luminaire lighting across electrical rooms, plant halls and outdoor compounds",
        ],
        benefits: [
          "Adaptable lighting layout for changing generation-site use",
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
          "Підтримка LED освітлення в електротехнічних приміщеннях, технічних залах та зовнішніх зонах об'єкта",
        ],
        benefits: [
          "Гнучке компонування освітлення при зміні використання об'єкта генерації",
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
          "Supports electric-vehicle charging infrastructure at staff and fleet parking areas, integrated with on-site generation",
        ],
        benefits: [
          "Supports on-site EV charging as part of the wider generation-site power distribution design",
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
          "Підтримка інфраструктури зарядки електромобілів на паркінгах персоналу та автопарку, інтегрованої з генерацією на об'єкті",
        ],
        benefits: [
          "Підтримка зарядки електромобілів на об'єкті як частини загальної системи розподілу живлення об'єкта генерації",
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
// sektörlerle (Commercial Building, Airport, Industrial Facility) aynı
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
      "Distributes medium-current power between switchgear, distribution boards and downstream generation equipment",
      "Modular one-bolt joint system with an extensive range of elbow, offset, expansion and tap-off accessories",
    ],
    ua: [
      "Розподіл потужного струму середнього рівня між розподільними пристроями, щитами та підключеним генеруючим обладнанням",
      "Модульна система з'єднання з широким асортиментом кутових, зсувних та відгалужувальних аксесуарів",
    ],
  },
  benefitsOverride: {
    uk: [
      "Medium-current LV power distribution from switchgear to downstream distribution",
      "Extensive tap-off and accessory range",
      "Reduced installation time versus equivalent cabling",
    ],
    ua: [
      "Розподіл потужного струму середнього рівня від розподільних пристроїв до підключеного обладнання",
      "Широкий вибір відгалужень та аксесуарів",
      "Менший час монтажу порівняно з еквівалентним кабелем",
    ],
  },
  actionsOverride: {
    uk: [
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/ggd-medium-power-busbar",
        type: "page",
      },
      { label: "Explore Busbar Systems", href: "/products/busbar", type: "page" },
      { label: "View G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/ggd-medium-power-busbar",
        type: "page",
      },
      { label: "Переглянути шинопровід GGD", href: "/products/busbar", type: "page" },
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
      "Provides a short, compact power connection between the inverter/transformer output and the LV electrical-service building",
      "Compact enclosed housing suited to external, generation-yard and plant-room connection points",
    ],
    ua: [
      "Коротке компактне з'єднання живлення між виходом інвертора/трансформатора та НН електротехнічною будівлею",
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
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/gs-super-compact",
        type: "page",
      },
      { label: "Explore Busbar Systems", href: "/products/busbar", type: "page" },
      { label: "View G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/gs-super-compact",
        type: "page",
      },
      { label: "Переглянути шинопровід GS", href: "/products/busbar", type: "page" },
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
      "Provides IP68 cast-resin insulated power distribution for the hydro generating hall's turbines and large rotating equipment",
      "Sealed construction suited to humid pump/turbine-hall environments",
    ],
    ua: [
      "Розподіл живлення з литою ізоляцією класу IP68 для турбін та великого обертового обладнання гідрогенеруючої зали",
      "Герметична конструкція, розрахована на вологі умови насосно-турбінної зали",
    ],
  },
  benefitsOverride: {
    uk: [
      "Sealed, moisture and chemical-resistant busbar insulation",
      "Rated for humid, high-current generator-hall environments",
      "Reduced installation time versus equivalent cabling",
    ],
    ua: [
      "Герметична, стійка до вологи та хімічних речовин ізоляція шинопроводу",
      "Розрахований на вологі умови зали з потужним генеруючим обладнанням",
      "Менший час монтажу порівняно з еквівалентним кабелем",
    ],
  },
  actionsOverride: {
    uk: [
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/gr-cast-resin",
        type: "page",
      },
      { label: "Explore Busbar Systems", href: "/products/busbar", type: "page" },
      { label: "View G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/gr-cast-resin",
        type: "page",
      },
      { label: "Переглянути шинопровід GR", href: "/products/busbar", type: "page" },
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
      "Energises the control room lighting circuit along a slim overhead trunking run, with quick-connect tap-off points for each luminaire",
      "Simplifies reconfiguration of lighting layouts as monitoring desks and racks change",
    ],
    ua: [
      "Живлення освітлювального кола диспетчерської через тонкий надземний шинопровід зі швидкими точками підключення для кожного світильника",
      "Спрощує перепланування освітлення при зміні розкладки робочих місць та шаф",
    ],
  },
  benefitsOverride: {
    uk: [
      "Slim, low-profile lighting-circuit distribution",
      "Quick-connect tap-off points for each luminaire",
      "Simple reconfiguration as control room layouts change",
    ],
    ua: [
      "Тонкий, низькопрофільний розподіл освітлювальних кіл",
      "Швидкі точки підключення для кожного світильника",
      "Просте перепланування при зміні розкладки диспетчерської",
    ],
  },
  actionsOverride: {
    uk: [
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/gnl-lighting-busbar",
        type: "page",
      },
      { label: "Explore Busbar Systems", href: "/products/busbar", type: "page" },
      { label: "View G-BUS Automation", href: "/products/g-bus", type: "page" },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/gnl-lighting-busbar",
        type: "page",
      },
      { label: "Переглянути шинопровід GNL", href: "/products/busbar", type: "page" },
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
    image: `${IMAGE_BASE}/zones/renewable-energy-main-electrical-room.webp`,
    imageAlt: {
      uk: "Main electrical room with an enclosed medium-power busbar above the switchgear line-up, an overhead cable tray and a copper earthing bar",
      ua: "Головне електротехнічне приміщення із закритим шинопроводом середньої потужності над рядом розподільних щитів, надземним кабельним лотком та мідною шиною заземлення",
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
        16,
        16,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and control cabling above the distribution panel line-up.",
        "Прокладання силових та керуючих кабелів над рядом розподільних щитів.",
      ),
      busbarHotspot(
        "main-electrical-room-busbar",
        73,
        30,
        "GGD Medium Power",
        "GGD Medium Power",
        "GGD Medium Power Busbar distributes power along the switchgear line-up through an enclosed overhead trunking run.",
        "Шинопровід GGD Medium Power розподіляє живлення вздовж ряду розподільних щитів через закритий надземний шинопровід.",
        GGD_OVERRIDE,
      ),
      hotspot(
        "main-electrical-room-earthing",
        "earthing-lightning",
        88,
        59,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Providing the main equipotential bonding point for the switchgear line-up.",
        "Забезпечення головної точки вирівнювання потенціалів для ряду розподільних щитів.",
      ),
      hotspot(
        "main-electrical-room-led-systems",
        "led-systems",
        35,
        15,
        "LED Systems, linear luminaire",
        "Системи освітлення LED, лінійний світильник",
        "Providing general lighting for the main electrical room.",
        "Забезпечення загального освітлення головного електротехнічного приміщення.",
      ),
    ],
  },
  {
    id: "bess-power-conversion-distribution",
    number: 2,
    image: `${IMAGE_BASE}/zones/renewable-energy-bess-power-conversion-distribution.webp`,
    imageAlt: {
      uk: "Battery energy storage power conversion room with an enclosed medium-power busbar above the PCS/distribution cabinets, an overhead cable tray and a copper earthing bar",
      ua: "Приміщення перетворення живлення накопичувача енергії із закритим шинопроводом середньої потужності над шафами PCS/розподілу, надземним кабельним лотком та мідною шиною заземлення",
    },
    content: {
      uk: { name: "BESS Power Conversion & Distribution" },
      ua: { name: "Перетворення та розподіл живлення BESS" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "bess-power-conversion-cable-management",
        "cable-management",
        63,
        14,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and control cabling above the PCS and distribution cabinets.",
        "Прокладання силових та керуючих кабелів над шафами PCS та розподілу.",
      ),
      busbarHotspot(
        "bess-power-conversion-busbar",
        69,
        32,
        "GGD Medium Power",
        "GGD Medium Power",
        "GGD Medium Power Busbar distributes power between the PCS cabinets, local feeders and LV distribution.",
        "Шинопровід GGD Medium Power розподіляє живлення між шафами PCS, місцевими фідерами та НН розподілом.",
        GGD_OVERRIDE,
      ),
      hotspot(
        "bess-power-conversion-earthing",
        "earthing-lightning",
        87,
        61,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Bonding the PCS and distribution cabinets to the facility's earthing system.",
        "Вирівнювання потенціалів шаф PCS та розподілу із системою заземлення об'єкта.",
      ),
      hotspot(
        "bess-power-conversion-led-systems",
        "led-systems",
        23,
        17,
        "LED Systems, linear luminaire",
        "Системи освітлення LED, лінійний світильник",
        "Providing general lighting across the power conversion room.",
        "Забезпечення загального освітлення приміщення перетворення живлення.",
      ),
    ],
  },
  {
    id: "solar-inverter-transformer-interface",
    number: 3,
    image: `${IMAGE_BASE}/zones/renewable-energy-solar-inverter-transformer-interface.webp`,
    imageAlt: {
      uk: "Solar PV inverter and transformer interface with a compact enclosed busbar bridge between the transformer and the electrical-service building, a low-level cable route and a copper earthing bar",
      ua: "Інтерфейс інвертора та трансформатора сонячної електростанції з компактним закритим шинопровідним містком між трансформатором та електротехнічною будівлею, кабельною трасою на нижньому рівні та мідною шиною заземлення",
    },
    content: {
      uk: { name: "Solar PV Inverter & Transformer Interface" },
      ua: { name: "Інтерфейс інвертора та трансформатора СЕС" },
    },
    approvedProductFamilyIds: ["cable-management", "busbar", "earthing-lightning"],
    hotspots: [
      hotspot(
        "solar-inverter-cable-management",
        "cable-management",
        51,
        75,
        "Cable Management Systems, low-level cable route",
        "Системи кабельного менеджменту, кабельна траса на нижньому рівні",
        "Routing power and control cabling at low level between the inverter, transformer and electrical-service building.",
        "Прокладання силових та керуючих кабелів на нижньому рівні між інвертором, трансформатором та електротехнічною будівлею.",
      ),
      busbarHotspot(
        "solar-inverter-busbar",
        58,
        24,
        "GS Super Compact",
        "GS Super Compact",
        "GS Super Compact connects the transformer output to the electrical-service building through a compact enclosed busbar bridge.",
        "Шинопровід GS Super Compact з'єднує вихід трансформатора з електротехнічною будівлею через компактний закритий шинопровідний місток.",
        GS_OVERRIDE,
      ),
      hotspot(
        "solar-inverter-earthing",
        "earthing-lightning",
        57,
        87,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Bonding the inverter, transformer and cable route to the facility's earthing system.",
        "Вирівнювання потенціалів інвертора, трансформатора та кабельної траси із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "wind-turbine-tower-base",
    number: 4,
    image: `${IMAGE_BASE}/zones/renewable-energy-wind-turbine-tower-base.webp`,
    imageAlt: {
      uk: "Wind turbine tower base and converter room with a compact enclosed busbar bridge, an overhead cable tray, LED lighting and a copper earthing bar",
      ua: "Основа вежі вітрогенератора та приміщення перетворювача з компактним закритим шинопровідним містком, надземним кабельним лотком, освітленням LED та мідною шиною заземлення",
    },
    content: {
      uk: { name: "Wind Turbine Tower Base & Converter Room" },
      ua: { name: "Основа вежі вітрогенератора та приміщення перетворювача" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "wind-turbine-cable-management",
        "cable-management",
        33,
        9,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and control cabling around the tower base, distinct from the busbar bridge.",
        "Прокладання силових та керуючих кабелів навколо основи вежі, окремо від шинопровідного містка.",
      ),
      busbarHotspot(
        "wind-turbine-busbar",
        68,
        20,
        "GS Super Compact",
        "GS Super Compact",
        "GS Super Compact connects the converter output to the transformer through a compact enclosed busbar bridge.",
        "Шинопровід GS Super Compact з'єднує вихід перетворювача з трансформатором через компактний закритий шинопровідний місток.",
        GS_OVERRIDE,
      ),
      hotspot(
        "wind-turbine-earthing",
        "earthing-lightning",
        48,
        69,
        "Earthing & Lightning Protection, tower-base bonding point",
        "Заземлення та блискавкозахист, точка заземлення основи вежі",
        "Bonding the tower structure and converter cabinet to the turbine's earthing system.",
        "Вирівнювання потенціалів конструкції вежі та шафи перетворювача із системою заземлення турбіни.",
      ),
      hotspot(
        "wind-turbine-led-systems",
        "led-systems",
        69,
        6,
        "LED Systems, ceiling luminaire",
        "Системи освітлення LED, стельовий світильник",
        "Providing general lighting within the tower base room.",
        "Забезпечення загального освітлення приміщення основи вежі.",
      ),
    ],
  },
  {
    id: "hydro-turbine-pump-hall",
    number: 5,
    image: `${IMAGE_BASE}/zones/renewable-energy-hydro-turbine-pump-hall.webp`,
    imageAlt: {
      uk: "Hydro turbine hall with black cast-resin busbar phase bars and silver joint blocks feeding the generators, an overhead cable ladder, LED lighting and a copper earthing bar",
      ua: "Зала гідротурбін з чорними фазними шинами шинопроводу литої ізоляції та срібними з'єднувальними блоками для генераторів, надземною кабельною драбиною, освітленням LED та мідною шиною заземлення",
    },
    content: {
      uk: { name: "Hydro Turbine & Pump Hall" },
      ua: { name: "Зала гідротурбін та насосів" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "hydro-turbine-cable-management",
        "cable-management",
        43,
        8,
        "Cable Management Systems, overhead cable ladder",
        "Системи кабельного менеджменту, надземна кабельна драбина",
        "Routing power and control cabling above the generator hall, separate from the busbar.",
        "Прокладання силових та керуючих кабелів над залою генераторів, окремо від шинопроводу.",
      ),
      busbarHotspot(
        "hydro-turbine-busbar",
        34,
        43,
        "GR Cast Resin",
        "GR Cast Resin",
        "GR Cast Resin Busbar carries high-current output from the hydro generators through a sealed, chemical-resistant enclosure.",
        "Шинопровід GR Cast Resin передає потужний струм від гідрогенераторів через герметичний, стійкий до хімічних речовин корпус.",
        GR_OVERRIDE,
      ),
      hotspot(
        "hydro-turbine-earthing",
        "earthing-lightning",
        20,
        75,
        "Earthing & Lightning Protection, copper bonding route",
        "Заземлення та блискавкозахист, траса заземлення",
        "Bonding the generator hall's busbar structure and equipment to the facility's earthing system.",
        "Вирівнювання потенціалів конструкції шинопроводу та обладнання зали генераторів із системою заземлення об'єкта.",
      ),
      hotspot(
        "hydro-turbine-led-systems",
        "led-systems",
        71,
        10,
        "LED Systems, industrial luminaire",
        "Системи освітлення LED, промисловий світильник",
        "Providing general lighting across the hydro turbine and pump hall.",
        "Забезпечення загального освітлення зали гідротурбін та насосів.",
      ),
    ],
  },
  {
    id: "grid-connection-substation",
    number: 6,
    image: `${IMAGE_BASE}/zones/renewable-energy-grid-connection-substation.webp`,
    imageAlt: {
      uk: "Outdoor grid connection substation with a galvanised external cable trench, a floodlight on a pole and a copper down-conductor at the lightning mast",
      ua: "Зовнішня підстанція приєднання до мережі з оцинкованою зовнішньою кабельною траншеєю, прожектором на опорі та мідним провідником блискавковідводу на щоглі",
    },
    content: {
      uk: { name: "Grid Connection Substation" },
      ua: { name: "Підстанція приєднання до мережі" },
    },
    // GS/GGD/GR/GNL benzeri kapalı InfraVolt/Gersan busbar sistemi bu
    // görselde YOK — yalnız açık havada birincil iletkenler ve izolatörler
    // görülüyor. Proje talimatı gereği (bkz. prompt.md #9) bu bölgeye
    // busbar hotspot'ı eklenmedi.
    approvedProductFamilyIds: ["cable-management", "earthing-lightning", "led-systems"],
    hotspots: [
      hotspot(
        "grid-connection-cable-management",
        "cable-management",
        52,
        77,
        "Cable Management Systems, external cable trench",
        "Системи кабельного менеджменту, зовнішня кабельна траншея",
        "Routing power and control cabling along the substation's external cable trench.",
        "Прокладання силових та керуючих кабелів вздовж зовнішньої кабельної траншеї підстанції.",
      ),
      hotspot(
        "grid-connection-earthing",
        "earthing-lightning",
        87,
        53,
        "Earthing & Lightning Protection, down-conductor and test link",
        "Заземлення та блискавкозахист, провідник блискавковідводу та випробувальна клема",
        "Providing the down-conductor and test-link connection for the substation's lightning-protection mast.",
        "Забезпечення провідника блискавковідводу та випробувальної клеми щогли блискавкозахисту підстанції.",
      ),
      hotspot(
        "grid-connection-led-systems",
        "led-systems",
        22,
        27,
        "LED Systems, area floodlight",
        "Системи освітлення LED, прожектор території",
        "Providing area lighting across the substation compound.",
        "Забезпечення освітлення території підстанції.",
      ),
    ],
  },
  {
    id: "control-monitoring-building",
    number: 7,
    image: `${IMAGE_BASE}/zones/renewable-energy-control-monitoring-building.webp`,
    imageAlt: {
      uk: "Control and monitoring room with a slim lighting busbar feeding LED luminaires, a separate overhead cable tray, an opened raised-floor trunking section and a copper earthing bar beside the technical rack",
      ua: "Диспетчерська з тонким освітлювальним шинопроводом для LED світильників, окремим надземним кабельним лотком, відкритою секцією коробів під фальшпідлогою та мідною шиною заземлення біля технічної шафи",
    },
    content: {
      uk: { name: "Control & Monitoring Building" },
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
        "control-monitoring-cable-management",
        "cable-management",
        39,
        12,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and data cabling above the control room, distinct from the lighting busbar.",
        "Прокладання силових та інформаційних кабелів над диспетчерською, окремо від освітлювального шинопроводу.",
      ),
      busbarHotspot(
        "control-monitoring-busbar",
        58,
        20,
        "GNL Lighting Busbar",
        "GNL Lighting Busbar",
        "GNL Lighting Busbar distributes power along the control room ceiling and provides organised tap-off connections for the luminaire line.",
        "Освітлювальний шинопровід GNL розподіляє живлення вздовж стелі диспетчерської та забезпечує впорядковані точки підключення для лінії світильників.",
        GNL_OVERRIDE,
      ),
      hotspot(
        "control-monitoring-underfloor",
        "underfloor",
        59,
        83,
        "Underfloor Cable Trunking, raised-floor cable route",
        "Підпідлогові кабельні короби, кабельна траса під фальшпідлогою",
        "Routing power and data cabling beneath the raised access floor to the monitoring desks.",
        "Прокладання силових та інформаційних кабелів під фальшпідлогою до робочих місць диспетчерів.",
      ),
      hotspot(
        "control-monitoring-earthing",
        "earthing-lightning",
        22,
        68,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Bonding the technical rack to the building's earthing system.",
        "Вирівнювання потенціалів технічної шафи із системою заземлення будівлі.",
      ),
      hotspot(
        "control-monitoring-led-systems",
        "led-systems",
        72,
        16,
        "LED Systems, linear luminaire",
        "Системи освітлення LED, лінійний світильник",
        "Providing general lighting across the control room, fed from the overhead lighting busbar.",
        "Забезпечення загального освітлення диспетчерської, яке живиться від надземного освітлювального шинопроводу.",
      ),
    ],
  },
  {
    id: "ev-charging-integration",
    number: 8,
    image: `${IMAGE_BASE}/zones/renewable-energy-ev-charging-integration.webp`,
    imageAlt: {
      uk: "EV charging area integrated with the generation site, with a protected feeder route from the distribution cabinet, a copper earthing bar, an outdoor LED luminaire and a row of EV chargers",
      ua: "Зона зарядки електромобілів, інтегрована з об'єктом генерації, із захищеною трасою живлення від розподільної шафи, мідною шиною заземлення, зовнішнім LED світильником та рядом зарядних станцій",
    },
    content: {
      uk: { name: "EV Charging & Renewable Integration" },
      ua: { name: "Зарядка електромобілів та інтеграція з ВДЕ" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "earthing-lightning",
      "led-systems",
      "ev-charging",
    ],
    hotspots: [
      hotspot(
        "ev-charging-cable-management",
        "cable-management",
        36,
        80,
        "Cable Management Systems, protected feeder route",
        "Системи кабельного менеджменту, захищена траса живлення",
        "Feeding power from the distribution cabinet to the EV charging points.",
        "Живлення від розподільної шафи до зарядних станцій електромобілів.",
      ),
      hotspot(
        "ev-charging-earthing",
        "earthing-lightning",
        19,
        75,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Bonding the distribution cabinet to the facility's earthing system.",
        "Вирівнювання потенціалів розподільної шафи із системою заземлення об'єкта.",
      ),
      hotspot(
        "ev-charging-led-systems",
        "led-systems",
        84,
        7,
        "LED Systems, outdoor luminaire",
        "Системи освітлення LED, зовнішній світильник",
        "Providing area lighting across the EV charging area.",
        "Забезпечення освітлення зони зарядки електромобілів.",
      ),
      hotspot(
        "ev-charging-ev-charging",
        "ev-charging",
        58,
        50,
        "EV Charging Systems, charge point",
        "Системи зарядки електромобілів, зарядна станція",
        "Providing power distribution to EV charging points integrated with the generation site.",
        "Розподіл живлення до зарядних станцій електромобілів, інтегрованих з об'єктом генерації.",
      ),
    ],
  },
] as const satisfies readonly Zone<RenewableEnergyZoneId>[];

function overviewHotspot(
  id: string,
  zoneId: RenewableEnergyZoneId,
  x: number,
  y: number,
  labelUk: string,
  labelUa: string,
): OverviewHotspot<RenewableEnergyZoneId> {
  return {
    id,
    zoneId,
    x,
    y,
    accessibleLabel: { uk: labelUk, ua: labelUa },
  };
}

const OVERVIEW = {
  image: `${IMAGE_BASE}/overview/renewable-energy-application-map-overview.webp`,
  imageAlt: {
    uk: "Aerial night view of a renewable energy generation site showing the main electrical building, BESS containers, solar field, wind turbines, hydro generating building, substation and control building",
    ua: "Нічний вигляд з висоти на об'єкт відновлюваної генерації з головною електротехнічною будівлею, контейнерами BESS, сонячним полем, вітрогенераторами, гідрогенеруючою будівлею, підстанцією та диспетчерською будівлею",
  },
  hotspots: [
    overviewHotspot(
      "overview-main-electrical-room",
      "main-electrical-room",
      36,
      55,
      "Main Electrical Room",
      "Головне електротехнічне приміщення",
    ),
    overviewHotspot(
      "overview-bess-power-conversion-distribution",
      "bess-power-conversion-distribution",
      42,
      41,
      "BESS Power Conversion & Distribution",
      "Перетворення та розподіл живлення BESS",
    ),
    overviewHotspot(
      "overview-solar-inverter-transformer-interface",
      "solar-inverter-transformer-interface",
      68,
      28,
      "Solar PV Inverter & Transformer Interface",
      "Інтерфейс інвертора та трансформатора СЕС",
    ),
    overviewHotspot(
      "overview-wind-turbine-tower-base",
      "wind-turbine-tower-base",
      84,
      27,
      "Wind Turbine Tower Base & Converter Room",
      "Основа вежі вітрогенератора та приміщення перетворювача",
    ),
    overviewHotspot(
      "overview-hydro-turbine-pump-hall",
      "hydro-turbine-pump-hall",
      71,
      68,
      "Hydro Turbine & Pump Hall",
      "Зала гідротурбін та насосів",
    ),
    overviewHotspot(
      "overview-grid-connection-substation",
      "grid-connection-substation",
      89,
      48,
      "Grid Connection Substation",
      "Підстанція приєднання до мережі",
    ),
    overviewHotspot(
      "overview-control-monitoring-building",
      "control-monitoring-building",
      73,
      39,
      "Control & Monitoring Building",
      "Диспетчерська та адміністративна будівля",
    ),
    overviewHotspot(
      "overview-ev-charging-integration",
      "ev-charging-integration",
      69,
      50,
      "EV Charging & Renewable Integration",
      "Зарядка електромобілів та інтеграція з ВДЕ",
    ),
  ],
} as const;

export const RENEWABLE_ENERGY_APPLICATION_MAP = {
  overview: OVERVIEW,
  zones: ZONES,
  productFamilies: PRODUCT_FAMILIES,
} as const satisfies ApplicationMap<RenewableEnergyZoneId>;

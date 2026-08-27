import { publicMediaUrl } from "@/modules/storage/asset-url";
import { PRODUCT_FAMILY_NUMBERS } from "./types";

import type {
  ApplicationMap,
  Hotspot,
  OverviewHotspot,
  ProductFamily,
  Zone,
} from "./types";

const IMAGE_BASE = publicMediaUrl("application-map/commercial-building");

export const COMMERCIAL_BUILDING_ZONE_IDS = [
  "main-electrical-room",
  "office-floor-lighting",
  "underfloor-distribution",
  "vertical-riser-service-shaft",
  "rooftop-plant",
  "external-utilities-yard",
  "parking-ev-charging",
] as const;

export type CommercialBuildingZoneId =
  (typeof COMMERCIAL_BUILDING_ZONE_IDS)[number];

const PRODUCT_FAMILIES = [
  {
    id: "cable-management",
    number: PRODUCT_FAMILY_NUMBERS["cable-management"],
    content: {
      uk: {
        name: "Cable Management Systems",
        applicationPoints: [
          "Routes power and data cabling between switchgear, floor distribution and building service areas",
          "Supports structured cabling above office floors, service shafts and rooftop plant",
        ],
        benefits: [
          "Organised, serviceable cable routing across the building",
          "Supports structured expansion as tenant fit-out and floor layouts change",
          "Reduces cable clutter in ceiling voids and service risers",
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
          "Прокладання силових та інформаційних кабелів між розподільними пристроями, розподілом по поверху та технічними зонами будівлі",
          "Підтримка структурованого кабелювання над офісними поверхами, технічними стояками та дахoвим обладнанням",
        ],
        benefits: [
          "Впорядковане, зручне для обслуговування прокладання кабелів по всій будівлі",
          "Підтримка структурованого розширення при зміні орендарського облаштування та планування поверхів",
          "Менше кабельного безладу в стельових просторах та технічних стояках",
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
          "Distributes power between switchgear, distribution boards and downstream building equipment",
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
          "Розподіл живлення між розподільними пристроями, щитами та підключеним обладнанням будівлі",
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
          "Routes power and data cabling beneath a raised access floor across office and technical areas",
          "Keeps cable runs organised and accessible for maintenance as desk and equipment layouts change",
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
          "Прокладання силових та інформаційних кабелів під фальшпідлогою в офісних та технічних зонах",
          "Впорядковані, доступні для обслуговування кабельні траси при зміні розкладки робочих місць та обладнання",
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
          "Provides equipment and enclosure bonding within electrical, riser and rooftop plant spaces",
          "Forms part of the building's earthing and lightning-protection network",
        ],
        benefits: [
          "Supports electrical safety and equipotential bonding",
          "Helps protect building equipment from lightning-related transients",
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
          "Забезпечує вирівнювання потенціалів обладнання та шаф в електротехнічних приміщеннях, стояках та на даху",
          "Є частиною мережі заземлення та блискавкозахисту будівлі",
        ],
        benefits: [
          "Підтримка електробезпеки та вирівнювання потенціалів",
          "Захист обладнання будівлі від імпульсних перенапруг, пов'язаних з блискавкою",
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
          "Supports LED luminaire lighting across electrical rooms, office floors and external areas",
        ],
        benefits: [
          "Adaptable lighting layout for changing office and tenant fit-out",
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
          "Підтримка LED освітлення в електротехнічних приміщеннях, на офісних поверхах та зовнішніх зонах",
        ],
        benefits: [
          "Гнучке компонування освітлення при зміні облаштування офісу",
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
          "Supports on-site EV charging as part of the wider building power distribution design",
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
          "Підтримка зарядки електромобілів на об'єкті як частини загальної системи розподілу живлення будівлі",
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
// Busbar ürün override'ları — bu sektörde SADECE üç gerçek seri kullanılır:
// GGD Medium Power, GS Super Compact ve GNL Lighting Busbar (aydınlatma
// hattı, "LEDBUS" olarak anılır). GR Cast Resin bilinçli olarak YOKTUR —
// proje talimatı bu sektörde GR'yi yasaklıyor (endüstriyel proses/tank
// çiftliği/pompa uygulamalarına ait). İçerik industrial-facility.ts /
// data-centre.ts ile aynı gerçek katalog verisine dayanır.
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
      "Distributes medium-current power between switchgear, distribution boards and downstream building equipment",
      "Modular one-bolt joint system with an extensive range of elbow, offset, expansion and tap-off accessories",
    ],
    ua: [
      "Розподіл потужного струму середнього рівня між розподільними пристроями, щитами та підключеним обладнанням будівлі",
      "Модульна система з'єднання з широким асортиментом кутових, зсувних та відгалужувальних аксесуарів",
    ],
  },
  benefitsOverride: {
    uk: [
      "Medium-current power distribution for building switchgear and floor-by-floor risers",
      "Extensive tap-off and accessory range",
      "Reduced installation time versus equivalent cabling",
    ],
    ua: [
      "Розподіл потужного струму середнього рівня для щитів будівлі та поверхових стояків",
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
      "Provides high-current power distribution between external building services equipment and the main building",
      "Compact enclosed housing suited to external, service-yard and plant-room connection points",
    ],
    ua: [
      "Розподіл потужного струму між зовнішнім технічним обладнанням будівлі та головною будівлею",
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
      "Energises the office lighting circuit along a slim overhead trunking run, with quick-connect tap-off points for each luminaire",
      "Simplifies reconfiguration of lighting layouts as desk and tenant fit-out changes",
    ],
    ua: [
      "Живлення офісного освітлювального кола через тонкий надземний шинопровід зі швидкими точками підключення для кожного світильника",
      "Спрощує перепланування освітлення при зміні розкладки робочих місць та облаштування орендаря",
    ],
  },
  benefitsOverride: {
    uk: [
      "Slim, low-profile lighting-circuit distribution",
      "Quick-connect tap-off points for each luminaire",
      "Simple reconfiguration as office layouts change",
    ],
    ua: [
      "Тонкий, низькопрофільний розподіл освітлювальних кіл",
      "Швидкі точки підключення для кожного світильника",
      "Просте перепланування при зміні розкладки офісу",
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
    image: `${IMAGE_BASE}/zones/commercial-building-main-electrical-room.webp`,
    imageAlt: {
      uk: "Main electrical room with an enclosed medium-power busbar above the switchgear line-up, an overhead cable tray, LED tube lighting and a copper earthing bar",
      ua: "Головне електротехнічне приміщення із закритим шинопроводом середньої потужності над рядом розподільних щитів, надземним кабельним лотком, LED освітленням та мідною шиною заземлення",
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
        25,
        8,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and control cabling above the distribution panel line-up.",
        "Прокладання силових та керуючих кабелів над рядом розподільних щитів.",
      ),
      busbarHotspot(
        "main-electrical-room-busbar",
        65,
        13,
        "GGD Medium Power",
        "GGD Medium Power",
        "GGD Medium Power Busbar distributes power along the switchgear line-up through an enclosed overhead trunking run.",
        "Шинопровід GGD Medium Power розподіляє живлення вздовж ряду розподільних щитів через закритий надземний шинопровід.",
        GGD_OVERRIDE,
      ),
      hotspot(
        "main-electrical-room-earthing",
        "earthing-lightning",
        93,
        87,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Providing the main equipotential bonding point for the switchgear line-up.",
        "Забезпечення головної точки вирівнювання потенціалів для ряду розподільних щитів.",
      ),
      hotspot(
        "main-electrical-room-led-systems",
        "led-systems",
        3,
        15,
        "LED Systems, wall-mounted luminaire",
        "Системи освітлення LED, настінний світильник",
        "Providing general lighting for the main electrical room.",
        "Забезпечення загального освітлення головного електротехнічного приміщення.",
      ),
    ],
  },
  {
    id: "office-floor-lighting",
    number: 2,
    image: `${IMAGE_BASE}/zones/commercial-building-office-floor-lighting.webp`,
    imageAlt: {
      uk: "Open-plan office floor with an overhead cable tray, a slim lighting busbar feeding linear LED luminaires, and an opened raised-floor cable route beneath a desk",
      ua: "Офісний поверх відкритого планування з надземним кабельним лотком, тонким освітлювальним шинопроводом для лінійних LED світильників та відкритою кабельною трасою під фальшпідлогою під столом",
    },
    content: {
      uk: { name: "Office Floor & Lighting" },
      ua: { name: "Офісний поверх та освітлення" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "underfloor",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "office-floor-lighting-cable-management",
        "cable-management",
        18,
        6,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and data cabling above the office floor, distinct from the lighting busbar.",
        "Прокладання силових та інформаційних кабелів над офісним поверхом, окремо від освітлювального шинопроводу.",
      ),
      busbarHotspot(
        "office-floor-lighting-busbar",
        42,
        15,
        "GNL Lighting Busbar",
        "GNL Lighting Busbar",
        "GNL Lighting Busbar distributes power along the office ceiling and provides organised tap-off connections for the luminaire line.",
        "Освітлювальний шинопровід GNL розподіляє живлення вздовж стелі офісу та забезпечує впорядковані точки підключення для лінії світильників.",
        GNL_OVERRIDE,
      ),
      hotspot(
        "office-floor-lighting-underfloor",
        "underfloor",
        48,
        88,
        "Underfloor Cable Trunking, raised-floor cable route",
        "Підпідлогові кабельні короби, кабельна траса під фальшпідлогою",
        "Routing power and data cabling beneath the raised access floor to desk positions.",
        "Прокладання силових та інформаційних кабелів під фальшпідлогою до робочих місць.",
      ),
      hotspot(
        "office-floor-lighting-led-systems",
        "led-systems",
        75,
        20,
        "LED Systems, linear luminaire",
        "Системи освітлення LED, лінійний світильник",
        "Providing general lighting across the office floor, fed from the overhead lighting busbar.",
        "Забезпечення загального освітлення офісного поверху, яке живиться від надземного освітлювального шинопроводу.",
      ),
    ],
  },
  {
    id: "underfloor-distribution",
    number: 3,
    image: `${IMAGE_BASE}/zones/commercial-building-underfloor-distribution.webp`,
    imageAlt: {
      uk: "Opened raised-floor void showing a wire-mesh cable basket, an enclosed underfloor trunking run with a junction box, and a green-yellow bonding conductor",
      ua: "Відкритий простір під фальшпідлогою з дротяним кабельним лотком, закритим підпідловим коробом з розподільною коробкою та жовто-зеленим провідником заземлення",
    },
    content: {
      uk: { name: "Underfloor Distribution" },
      ua: { name: "Розподіл під фальшпідлогою" },
    },
    approvedProductFamilyIds: ["cable-management", "underfloor", "earthing-lightning"],
    hotspots: [
      hotspot(
        "underfloor-distribution-cable-management",
        "cable-management",
        15,
        45,
        "Cable Management Systems, wire-mesh cable basket",
        "Системи кабельного менеджменту, дротяний кабельний лоток",
        "Routing separate power and data cabling alongside the underfloor trunking run.",
        "Прокладання окремих силових та інформаційних кабелів поруч із коробом під фальшпідлогою.",
      ),
      hotspot(
        "underfloor-distribution-underfloor",
        "underfloor",
        50,
        45,
        "Underfloor Cable Trunking, enclosed floor trunking",
        "Підпідлогові кабельні короби, закритий короб",
        "Distributing power beneath the raised floor to a junction box and local floor outlets.",
        "Розподіл живлення під фальшпідлогою до розподільної коробки та локальних підпідлогових виходів.",
      ),
      hotspot(
        "underfloor-distribution-earthing",
        "earthing-lightning",
        48,
        88,
        "Earthing & Lightning Protection, bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення",
        "Bonding the underfloor trunking and junction box to the building's earthing system.",
        "Вирівнювання потенціалів короба та розподільної коробки під фальшпідлогою із системою заземлення будівлі.",
      ),
    ],
  },
  {
    id: "vertical-riser-service-shaft",
    number: 4,
    image: `${IMAGE_BASE}/zones/commercial-building-vertical-riser-service-shaft.webp`,
    imageAlt: {
      uk: "Multi-level vertical service shaft with a vertical cable ladder, an enclosed busbar riser with floor-level tap-off boxes, and a bonding conductor at a distribution cabinet",
      ua: "Багатоповерховий вертикальний технічний стояк з вертикальною кабельною драбиною, закритим шинопровідним стояком з відгалуженнями на кожному поверсі та провідником заземлення біля розподільної шафи",
    },
    content: {
      uk: { name: "Vertical Riser / Service Shaft" },
      ua: { name: "Вертикальний стояк / технічна шахта" },
    },
    approvedProductFamilyIds: ["cable-management", "busbar", "earthing-lightning"],
    hotspots: [
      hotspot(
        "vertical-riser-cable-management",
        "cable-management",
        10,
        50,
        "Cable Management Systems, vertical cable ladder",
        "Системи кабельного менеджменту, вертикальна кабельна драбина",
        "Routing power and data cabling vertically between floors, alongside the busbar riser.",
        "Прокладання силових та інформаційних кабелів вертикально між поверхами поруч із шинопровідним стояком.",
      ),
      busbarHotspot(
        "vertical-riser-busbar",
        47,
        40,
        "GGD Medium Power",
        "GGD Medium Power",
        "GGD Medium Power Busbar rises vertically through the service shaft with a tap-off point at each floor level.",
        "Шинопровід GGD Medium Power піднімається вертикально через технічну шахту з відгалуженням на кожному поверсі.",
        GGD_OVERRIDE,
      ),
      hotspot(
        "vertical-riser-earthing",
        "earthing-lightning",
        60,
        48,
        "Earthing & Lightning Protection, floor-level bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення на поверсі",
        "Bonding the busbar tap-off box and local distribution cabinet to the building's earthing system.",
        "Вирівнювання потенціалів відгалуження шинопроводу та місцевої розподільної шафи із системою заземлення будівлі.",
      ),
    ],
  },
  {
    id: "rooftop-plant",
    number: 5,
    image: `${IMAGE_BASE}/zones/commercial-building-rooftop-plant.webp`,
    imageAlt: {
      uk: "Rooftop plant deck with a raised metallic cable tray between the HVAC units and electrical enclosures, and a green-yellow bonding conductor",
      ua: "Дахова технічна платформа з піднятим металевим кабельним лотком між установками HVAC та електротехнічними шафами, а також жовто-зеленим провідником заземлення",
    },
    content: {
      uk: { name: "Rooftop Plant" },
      ua: { name: "Дахове технічне обладнання" },
    },
    approvedProductFamilyIds: ["cable-management", "earthing-lightning"],
    hotspots: [
      hotspot(
        "rooftop-plant-cable-management",
        "cable-management",
        50,
        78,
        "Cable Management Systems, raised rooftop cable tray",
        "Системи кабельного менеджменту, піднятий дахoвий кабельний лоток",
        "Routing power and control cabling between the rooftop plant enclosures at low level.",
        "Прокладання силових та керуючих кабелів між дахoвими технічними шафами на нижньому рівні.",
      ),
      hotspot(
        "rooftop-plant-earthing",
        "earthing-lightning",
        83,
        82,
        "Earthing & Lightning Protection, bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення",
        "Bonding the rooftop plant enclosures and pipework to the building's earthing system.",
        "Вирівнювання потенціалів дахoвих технічних шаф та трубопроводів із системою заземлення будівлі.",
      ),
    ],
  },
  {
    id: "external-utilities-yard",
    number: 6,
    image: `${IMAGE_BASE}/zones/commercial-building-external-utilities-yard.webp`,
    imageAlt: {
      uk: "External building services yard with a low-level open cable tray, a compact enclosed busbar connecting the control panel to the outdoor enclosure, and a bonding conductor",
      ua: "Зовнішня технічна зона будівлі з відкритим кабельним лотком на нижньому рівні, компактним закритим шинопроводом між щитом керування та зовнішньою шафою та провідником заземлення",
    },
    content: {
      uk: { name: "External Utilities / Building Service Yard" },
      ua: { name: "Зовнішня технічна зона будівлі" },
    },
    approvedProductFamilyIds: ["cable-management", "busbar", "earthing-lightning"],
    hotspots: [
      hotspot(
        "external-utilities-yard-cable-management",
        "cable-management",
        25,
        85,
        "Cable Management Systems, low-level open cable tray",
        "Системи кабельного менеджменту, відкритий кабельний лоток на нижньому рівні",
        "Routing power and control cabling from the control panel to the building at low level.",
        "Прокладання силових та керуючих кабелів від щита керування до будівлі на нижньому рівні.",
      ),
      busbarHotspot(
        "external-utilities-yard-busbar",
        55,
        60,
        "GS Super Compact",
        "GS Super Compact",
        "GS Super Compact connects the external control panel to the outdoor distribution enclosure through a compact enclosed busbar.",
        "Шинопровід GS Super Compact з'єднує зовнішній щит керування із зовнішньою розподільною шафою через компактний закритий шинопровід.",
        GS_OVERRIDE,
      ),
      hotspot(
        "external-utilities-yard-earthing",
        "earthing-lightning",
        35,
        75,
        "Earthing & Lightning Protection, bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення",
        "Bonding the external control panel to the building's earthing system.",
        "Вирівнювання потенціалів зовнішнього щита керування із системою заземлення будівлі.",
      ),
    ],
  },
  {
    id: "parking-ev-charging",
    number: 7,
    image: `${IMAGE_BASE}/zones/commercial-building-parking-ev-charging.webp`,
    imageAlt: {
      uk: "Building car park at dusk with EV charge points on the building wall, an overhead conduit feeder route and a wall-mounted LED luminaire",
      ua: "Паркінг будівлі в сутінках із зарядними станціями для електромобілів на стіні будівлі, надземною трасою живлення та настінним LED світильником",
    },
    content: {
      uk: { name: "Parking & EV Charging" },
      ua: { name: "Паркінг та зарядка електромобілів" },
    },
    approvedProductFamilyIds: ["cable-management", "led-systems", "ev-charging"],
    hotspots: [
      hotspot(
        "parking-ev-charging-cable-management",
        "cable-management",
        80,
        35,
        "Cable Management Systems, building feeder conduit route",
        "Системи кабельного менеджменту, траса живлення будівлі",
        "Feeding power from the building's service riser to the EV charge points along the wall.",
        "Живлення від технічного стояка будівлі до зарядних станцій електромобілів вздовж стіни.",
      ),
      hotspot(
        "parking-ev-charging-led-systems",
        "led-systems",
        95,
        38,
        "LED Systems, wall-mounted luminaire",
        "Системи освітлення LED, настінний світильник",
        "Providing area lighting across the car park adjacent to the EV charge points.",
        "Забезпечення освітлення паркінгу біля зарядних станцій електромобілів.",
      ),
      hotspot(
        "parking-ev-charging-ev-charging",
        "ev-charging",
        33,
        60,
        "EV Charging Systems, charge point",
        "Системи зарядки електромобілів, зарядна станція",
        "Providing power distribution to EV charging points at the building's car park.",
        "Розподіл живлення до зарядних станцій електромобілів на паркінгу будівлі.",
      ),
    ],
  },
] as const satisfies readonly Zone<CommercialBuildingZoneId>[];

function overviewHotspot(
  id: string,
  zoneId: CommercialBuildingZoneId,
  x: number,
  y: number,
  labelUk: string,
  labelUa: string,
): OverviewHotspot<CommercialBuildingZoneId> {
  return {
    id,
    zoneId,
    x,
    y,
    accessibleLabel: { uk: labelUk, ua: labelUa },
  };
}

const OVERVIEW = {
  image: `${IMAGE_BASE}/overview/commercial-building-application-map-overview.webp`,
  imageAlt: {
    uk: "Night-time cutaway view of a modern commercial office building showing the electrical room, office floors, vertical service shaft, rooftop plant, external service yard and car park",
    ua: "Нічний розріз сучасної офісної будівлі з електротехнічним приміщенням, офісними поверхами, вертикальною технічною шахтою, дахoвим обладнанням, зовнішньою технічною зоною та паркінгом",
  },
  hotspots: [
    overviewHotspot(
      "overview-main-electrical-room",
      "main-electrical-room",
      78,
      19,
      "Main Electrical Room",
      "Головне електротехнічне приміщення",
    ),
    overviewHotspot(
      "overview-office-floor-lighting",
      "office-floor-lighting",
      60,
      32,
      "Office Floor & Lighting",
      "Офісний поверх та освітлення",
    ),
    overviewHotspot(
      "overview-underfloor-distribution",
      "underfloor-distribution",
      68,
      68,
      "Underfloor Distribution",
      "Розподіл під фальшпідлогою",
    ),
    overviewHotspot(
      "overview-vertical-riser-service-shaft",
      "vertical-riser-service-shaft",
      92,
      45,
      "Vertical Riser / Service Shaft",
      "Вертикальний стояк / технічна шахта",
    ),
    overviewHotspot(
      "overview-rooftop-plant",
      "rooftop-plant",
      54,
      8,
      "Rooftop Plant",
      "Дахове технічне обладнання",
    ),
    overviewHotspot(
      "overview-external-utilities-yard",
      "external-utilities-yard",
      91,
      83,
      "External Utilities / Building Service Yard",
      "Зовнішня технічна зона будівлі",
    ),
    overviewHotspot(
      "overview-parking-ev-charging",
      "parking-ev-charging",
      36,
      85,
      "Parking & EV Charging",
      "Паркінг та зарядка електромобілів",
    ),
  ],
} as const;

export const COMMERCIAL_BUILDING_APPLICATION_MAP = {
  overview: OVERVIEW,
  zones: ZONES,
  productFamilies: PRODUCT_FAMILIES,
} as const satisfies ApplicationMap<CommercialBuildingZoneId>;

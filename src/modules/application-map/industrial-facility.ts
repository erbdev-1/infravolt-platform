import { PRODUCT_FAMILY_NUMBERS } from "./types";

import type {
  ApplicationMap,
  Hotspot,
  OverviewHotspot,
  ProductFamily,
  Zone,
} from "./types";

const IMAGE_BASE = "/assets/application-map/industrial-facility";

// ---------------------------------------------------------------------------
// Industrial Facilities bölge kimlikleri — Data Centre'den bağımsız, kendi
// sektörüne özgü sabit bir küme. types.ts'teki genel Zone<TZoneId>/
// Overview<TZoneId> modeli bu kimliklerle somutlaştırılır.
// ---------------------------------------------------------------------------

export const INDUSTRIAL_FACILITY_ZONE_IDS = [
  "main-electrical-room",
  "production-line",
  "process-area",
  "control-room",
  "external-utilities-yard",
  "tank-farm",
  "warehouse-logistics-hall",
  "transformer-connection",
  "pump-motor-room",
  "factory-lighting-assembly-hall",
  "industrial-street-loading-yard",
] as const;

export type IndustrialFacilityZoneId =
  (typeof INDUSTRIAL_FACILITY_ZONE_IDS)[number];

// ---------------------------------------------------------------------------
// Ürün aileleri — sabit 1-6 numaralandırma. "Busbar Systems" (numara 2) bu
// sektörde ÖZEL bir durum: fiziksel olarak dört farklı gerçek Gersan ürünü
// (GS Super Compact, GGD Medium Power, GR Cast Resin, GNL Lighting Busbar)
// aynı aile numarası altında görünüyor. Sol seçici ve hotspot ETİKETİ her
// zaman bu jenerik aile adını ("Busbar Systems") kullanır; PANELİN kendisi
// (görsel, başlık, CTA'lar, application points, benefits) her hotspot'ta
// BUSBAR_PRODUCT_OVERRIDES üzerinden somut ürüne göre override edilir (bkz.
// aşağıdaki ZONES). Bu yüzden bu aile içeriği yalnız hiçbir override
// verilmemiş teorik bir varsayılan olarak kalır — pratikte her zone kendi
// override'ını taşır.
// ---------------------------------------------------------------------------

const PRODUCT_FAMILIES = [
  {
    id: "cable-management",
    number: PRODUCT_FAMILY_NUMBERS["cable-management"],
    content: {
      uk: {
        name: "Cable Management Systems",
        applicationPoints: [
          "Routes power and control cabling between switchgear, process equipment and production machinery",
          "Supports structured cabling above production lines, plant rooms and outdoor process areas",
        ],
        benefits: [
          "Organised, serviceable cable routing across industrial facilities",
          "Supports structured expansion as production lines and process equipment change",
          "Reduces cable clutter in high-traffic industrial and process areas",
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
          "Прокладання силових та керуючих кабелів між розподільними пристроями, технологічним обладнанням та виробничими лініями",
          "Підтримка структурованого кабелювання над виробничими лініями, технічними приміщеннями та зовнішніми технологічними зонами",
        ],
        benefits: [
          "Впорядковане, зручне для обслуговування прокладання кабелів на промислових об'єктах",
          "Підтримка структурованого розширення при зміні виробничих ліній та технологічного обладнання",
          "Менше кабельного безладу в завантажених промислових та технологічних зонах",
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
          "Distributes power between switchgear, distribution boards and downstream industrial equipment",
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
          "Розподіл живлення між розподільними пристроями, щитами та підключеним промисловим обладнанням",
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
          "Supports LED luminaire lighting across production, plant and technical areas",
        ],
        benefits: [
          "Adaptable lighting layout for changing industrial space use",
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
          "Підтримка LED освітлення у виробничих, технічних та технологічних зонах",
        ],
        benefits: [
          "Гнучке компонування освітлення при зміні призначення промислового простору",
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
// Busbar ürün override'ları — dört gerçek Gersan busbar ürünü. Her biri
// gerçek katalog verisinden alınmıştır (bkz. src/data/products/busbar/
// series/{gs,ggd,gr,gnl}.ts ve catalog-content.ts). "Explore"/"View Relevant
// Busbar Series"/"View G-BUS Automation"/"Request Quote" dörtlü CTA deseni
// projede kurulan sabit busbar aksiyon şablonudur (bkz. Healthcare/Education
// GL override'ları).
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
      "Distributes medium-current power between switchgear, distribution boards and downstream production machinery",
      "Modular one-bolt joint system with an extensive range of elbow, offset, expansion and tap-off accessories",
    ],
    ua: [
      "Розподіл потужного струму середнього рівня між розподільними пристроями, щитами та підключеним виробничим обладнанням",
      "Модульна система з'єднання з широким асортиментом кутових, зсувних та відгалужувальних аксесуарів",
    ],
  },
  benefitsOverride: {
    uk: [
      "Medium-current power distribution for industrial process and production loads",
      "Extensive tap-off and accessory range for reconfigurable production layouts",
      "Reduced installation time versus equivalent cabling",
    ],
    ua: [
      "Розподіл потужного струму середнього рівня для технологічних та виробничих навантажень",
      "Широкий вибір відгалужень та аксесуарів для гнучкого перепланування виробництва",
      "Менший час монтажу порівняно з еквівалентним кабелем",
    ],
  },
  actionsOverride: {
    uk: [
      {
        label: "Explore GGD Busbar System",
        href: "/products/busbar",
        type: "page",
      },
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/ggd-medium-power-busbar",
        type: "page",
      },
      {
        label: "View G-BUS Automation",
        href: "/products/g-bus",
        type: "page",
      },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      {
        label: "Переглянути шинопровід GGD",
        href: "/products/busbar",
        type: "page",
      },
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/ggd-medium-power-busbar",
        type: "page",
      },
      {
        label: "Переглянути G-BUS Automation",
        href: "/products/g-bus",
        type: "page",
      },
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
      {
        label: "Explore GS Busbar System",
        href: "/products/busbar",
        type: "page",
      },
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/gs-super-compact",
        type: "page",
      },
      {
        label: "View G-BUS Automation",
        href: "/products/g-bus",
        type: "page",
      },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      {
        label: "Переглянути шинопровід GS",
        href: "/products/busbar",
        type: "page",
      },
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/gs-super-compact",
        type: "page",
      },
      {
        label: "Переглянути G-BUS Automation",
        href: "/products/g-bus",
        type: "page",
      },
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
      "Distributes power to pumps, motors, tank-farm and outdoor process equipment",
    ],
    ua: [
      "Розподіл живлення з литою ізоляцією класу IP68 для вологих, агресивних та мийних технологічних середовищ",
      "Розподіл живлення до насосів, двигунів, резервуарного парку та зовнішнього технологічного обладнання",
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
      {
        label: "Explore GR Busbar System",
        href: "/products/busbar",
        type: "page",
      },
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/gr-cast-resin",
        type: "page",
      },
      {
        label: "View G-BUS Automation",
        href: "/products/g-bus",
        type: "page",
      },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      {
        label: "Переглянути шинопровід GR",
        href: "/products/busbar",
        type: "page",
      },
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/gr-cast-resin",
        type: "page",
      },
      {
        label: "Переглянути G-BUS Automation",
        href: "/products/g-bus",
        type: "page",
      },
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
      "Simplifies reconfiguration of lighting layouts as production and storage areas change",
    ],
    ua: [
      "Живлення освітлювальних кіл через тонкий надземний шинопровід зі швидкими точками підключення для кожного світильника",
      "Спрощує перепланування освітлення при зміні виробничих та складських зон",
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
      {
        label: "Explore GNL Busbar System",
        href: "/products/busbar",
        type: "page",
      },
      {
        label: "View Relevant Busbar Series",
        href: "/products/busbar/gnl-lighting-busbar",
        type: "page",
      },
      {
        label: "View G-BUS Automation",
        href: "/products/g-bus",
        type: "page",
      },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
    ua: [
      {
        label: "Переглянути шинопровід GNL",
        href: "/products/busbar",
        type: "page",
      },
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: "/products/busbar/gnl-lighting-busbar",
        type: "page",
      },
      {
        label: "Переглянути G-BUS Automation",
        href: "/products/g-bus",
        type: "page",
      },
      {
        label: "Запросити комерційну пропозицію",
        href: "/uk-support?request=quote&product=busbar",
        type: "request",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Bölgeler — her biri kendi temiz sahne görseline ve onaylı ürün ailesi alt
// kümesine sahiptir. Yalnız fotoğrafta görsel olarak inandırıcı olan ürün
// aileleri onaylanmıştır (bkz. proje genelindeki "technically defensible
// hotspot" ilkesi). Busbar hotspot'ları BusbarOverrideFields'ı spread ederek
// somut ürün kimliğini taşır; accessibleLabel HER ZAMAN jenerik "Busbar
// Systems" kalır (sol seçici/hotspot etiketi tutarlılığı için).
// ---------------------------------------------------------------------------

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

// "labelSuffix" yalnız erişilebilirlik (aria-label) amaçlıdır — hotspot'un
// GÖRÜNÜR tek içeriği numaradır (bkz. ApplicationHotspot), bu yüzden ek
// bilgi ekranda ayrı bir metin olarak belirmez. Bir zone'da aynı aileye ait
// birden fazla busbar hotspot'u olduğunda ekran okuyucu/klavye kullanıcının
// hangisinin hangisi olduğunu ayırt edebilmesi için gereklidir (diğer
// hotspot'larda kullanılan "Busbar Systems, overhead distribution
// trunking" gibi açıklayıcı virgül-sonrası desenle tutarlı).
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
    image: `${IMAGE_BASE}/zones/industrial-main-electrical-room.webp`,
    imageAlt: {
      uk: "Main electrical room with an enclosed medium-power busbar trunking run, overhead cable tray and a copper earthing bar",
      ua: "Головне електротехнічне приміщення із закритим шинопроводом середньої потужності, надземним кабельним лотком та мідною шиною заземлення",
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
        65,
        8,
        "Cable Management Systems, overhead wire mesh tray",
        "Системи кабельного менеджменту, надземний сітчастий лоток",
        "Routing power and control cabling above the distribution panel line-up.",
        "Прокладання силових та керуючих кабелів над рядом розподільних щитів.",
      ),
      busbarHotspot(
        "main-electrical-room-busbar",
        35,
        12,
        "GGD Medium Power",
        "GGD Medium Power",
        "GGD Medium Power Busbar distributes power along the switchgear line-up through an enclosed overhead trunking run.",
        "Шинопровід GGD Medium Power розподіляє живлення вздовж ряду розподільних щитів через закритий надземний шинопровід.",
        GGD_OVERRIDE,
      ),
      hotspot(
        "main-electrical-room-earthing",
        "earthing-lightning",
        62,
        68,
        "Earthing & Lightning Protection, main copper bonding bar",
        "Заземлення та блискавкозахист, головна мідна шина заземлення",
        "Providing the main equipotential bonding point for switchgear and distribution equipment in this room.",
        "Забезпечення головної точки вирівнювання потенціалів для розподільних пристроїв у цьому приміщенні.",
      ),
      hotspot(
        "main-electrical-room-led-systems",
        "led-systems",
        80,
        6,
        "LED Systems, ceiling light fitting",
        "Системи освітлення LED, стельовий світильник",
        "Providing general lighting for the main electrical room.",
        "Забезпечення загального освітлення головного електротехнічного приміщення.",
      ),
    ],
  },
  {
    id: "production-line",
    number: 2,
    image: `${IMAGE_BASE}/zones/industrial-production-line.webp`,
    imageAlt: {
      uk: "Production line hall with an enclosed power busbar, a slim overhead lighting busbar feeding LED luminaires, a cable ladder and bonding conductor",
      ua: "Виробничий цех із закритим силовим шинопроводом, тонким надземним освітлювальним шинопроводом для LED світильників, кабельною драбиною та провідником заземлення",
    },
    content: {
      uk: { name: "Production Line" },
      ua: { name: "Виробнича лінія" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "production-line-cable-management",
        "cable-management",
        35,
        8,
        "Cable Management Systems, overhead cable ladder",
        "Системи кабельного менеджменту, надземна кабельна драбина",
        "Routing power and control cabling above the production line to local machine panels.",
        "Прокладання силових та керуючих кабелів над виробничою лінією до місцевих щитів обладнання.",
      ),
      busbarHotspot(
        "production-line-busbar-ggd",
        16,
        18,
        "GGD Medium Power",
        "GGD Medium Power",
        "GGD Medium Power Busbar supplies production machinery and local distribution panels along the line.",
        "Шинопровід GGD Medium Power живить виробниче обладнання та місцеві розподільні щити вздовж лінії.",
        GGD_OVERRIDE,
      ),
      busbarHotspot(
        "production-line-busbar-gnl",
        60,
        34,
        "GNL Lighting Busbar",
        "GNL Lighting Busbar",
        "GNL Lighting Busbar distributes power along the production hall ceiling and provides organised tap-off connections for luminaires and lighting circuits.",
        "Освітлювальний шинопровід GNL розподіляє живлення вздовж стелі виробничого цеху та забезпечує впорядковані точки підключення для світильників і освітлювальних кіл.",
        GNL_OVERRIDE,
      ),
      hotspot(
        "production-line-led-systems",
        "led-systems",
        30,
        40,
        "LED Systems, high-bay luminaire",
        "Системи освітлення LED, промисловий світильник",
        "Providing general lighting across the production line, fed from the overhead lighting busbar.",
        "Забезпечення загального освітлення виробничої лінії, яке живиться від надземного освітлювального шинопроводу.",
      ),
      hotspot(
        "production-line-earthing",
        "earthing-lightning",
        10,
        90,
        "Earthing & Lightning Protection, machine panel bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення щита обладнання",
        "Providing an equipotential bonding connection at the base of a production-line control panel.",
        "Забезпечення з'єднання вирівнювання потенціалів біля основи щита керування виробничою лінією.",
      ),
    ],
  },
  {
    id: "process-area",
    number: 3,
    image: `${IMAGE_BASE}/zones/industrial-process-area-v2.webp`,
    imageAlt: {
      uk: "Outdoor process area with a black cast-resin busbar run, an overhead cable tray and a green-yellow bonding conductor",
      ua: "Зовнішня технологічна зона з чорним шинопроводом литої ізоляції, надземним кабельним лотком та жовто-зеленим провідником заземлення",
    },
    content: {
      uk: { name: "Process Area" },
      ua: { name: "Технологічна зона" },
    },
    approvedProductFamilyIds: ["cable-management", "busbar", "earthing-lightning"],
    hotspots: [
      hotspot(
        "process-area-cable-management",
        "cable-management",
        15,
        8,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and control cabling above the process skid to the local control panel.",
        "Прокладання силових та керуючих кабелів над технологічним модулем до місцевого щита керування.",
      ),
      busbarHotspot(
        "process-area-busbar",
        48,
        10,
        "GR Cast Resin",
        "GR Cast Resin",
        "GR Cast Resin Busbar distributes power along the process structure in a sealed, chemical-resistant enclosure.",
        "Шинопровід GR Cast Resin розподіляє живлення вздовж технологічної конструкції в герметичному, стійкому до хімічних речовин корпусі.",
        GR_OVERRIDE,
      ),
      hotspot(
        "process-area-earthing",
        "earthing-lightning",
        16,
        90,
        "Earthing & Lightning Protection, equipment bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення обладнання",
        "Providing a visible equipotential bonding conductor at the base of the process control panel.",
        "Забезпечення видимого провідника вирівнювання потенціалів біля основи щита керування технологічним процесом.",
      ),
    ],
  },
  {
    id: "control-room",
    number: 4,
    image: `${IMAGE_BASE}/zones/industrial-control-room.webp`,
    imageAlt: {
      uk: "Control room with a slim lighting busbar feeding LED luminaires, an overhead cable tray and an opened raised-floor cable route",
      ua: "Диспетчерська з тонким освітлювальним шинопроводом для LED світильників, надземним кабельним лотком та відкритою кабельною трасою під фальшпідлогою",
    },
    content: {
      uk: { name: "Control Room" },
      ua: { name: "Диспетчерська" },
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
        "control-room-cable-management",
        "cable-management",
        80,
        16,
        "Cable Management Systems, overhead wire mesh tray",
        "Системи кабельного менеджменту, надземний сітчастий лоток",
        "Routing power and data cabling above the control room workstations.",
        "Прокладання силових та інформаційних кабелів над робочими місцями диспетчерської.",
      ),
      busbarHotspot(
        "control-room-busbar",
        50,
        20,
        "GNL Lighting Busbar",
        "GNL Lighting Busbar",
        "GNL Lighting Busbar distributes power along the control room ceiling and provides organised tap-off connections for luminaires and lighting circuits.",
        "Освітлювальний шинопровід GNL розподіляє живлення вздовж стелі диспетчерської та забезпечує впорядковані точки підключення для світильників і освітлювальних кіл.",
        GNL_OVERRIDE,
      ),
      hotspot(
        "control-room-underfloor",
        "underfloor",
        50,
        90,
        "Underfloor Cable Trunking, raised-floor cable route",
        "Підпідлогові кабельні короби, кабельна траса під фальшпідлогою",
        "Routing power and data cabling beneath the raised access floor to the switchgear cabinet and workstations.",
        "Прокладання силових та інформаційних кабелів під фальшпідлогою до щита та робочих місць.",
      ),
      hotspot(
        "control-room-earthing",
        "earthing-lightning",
        32,
        63,
        "Earthing & Lightning Protection, switchgear bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення щита",
        "Providing a visible equipotential bonding conductor beside the control room switchgear cabinet.",
        "Забезпечення видимого провідника вирівнювання потенціалів біля щита диспетчерської.",
      ),
      hotspot(
        "control-room-led-systems",
        "led-systems",
        38,
        11,
        "LED Systems, ceiling luminaire",
        "Системи освітлення LED, стельовий світильник",
        "Providing general lighting across the control room, fed from the overhead lighting busbar.",
        "Забезпечення загального освітлення диспетчерської, яке живиться від надземного освітлювального шинопроводу.",
      ),
    ],
  },
  {
    id: "external-utilities-yard",
    number: 5,
    image: `${IMAGE_BASE}/zones/industrial-external-utilities-yard-v2.webp`,
    imageAlt: {
      uk: "External utilities yard with an open cable tray, a compact enclosed busbar riser, an earthing bar and EV charging points",
      ua: "Зовнішня технічна зона з відкритим кабельним лотком, компактним закритим шинопроводом-стояком, шиною заземлення та зарядними станціями для електромобілів",
    },
    content: {
      uk: { name: "External Utilities Yard" },
      ua: { name: "Зовнішня технічна зона" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "ev-charging",
    ],
    hotspots: [
      hotspot(
        "external-utilities-yard-cable-management",
        "cable-management",
        15,
        25,
        "Cable Management Systems, open cable tray",
        "Системи кабельного менеджменту, відкритий кабельний лоток",
        "Routing power and control cabling along the building's external service gantry.",
        "Прокладання силових та керуючих кабелів вздовж зовнішньої технічної естакади будівлі.",
      ),
      busbarHotspot(
        "external-utilities-yard-busbar",
        62,
        58,
        "GS Super Compact",
        "GS Super Compact",
        "GS Super Compact distributes power from the building's external riser to the yard's EV charging and distribution equipment.",
        "Шинопровід GS Super Compact розподіляє живлення від зовнішнього стояка будівлі до зарядних станцій та розподільного обладнання зони.",
        GS_OVERRIDE,
      ),
      hotspot(
        "external-utilities-yard-earthing",
        "earthing-lightning",
        44,
        80,
        "Earthing & Lightning Protection, external bonding point",
        "Заземлення та блискавкозахист, зовнішня точка вирівнювання потенціалів",
        "Bonding the external distribution enclosure and service pipework to the facility's earthing system.",
        "Вирівнювання потенціалів зовнішньої розподільної шафи та технічних трубопроводів із системою заземлення об'єкта.",
      ),
      hotspot(
        "external-utilities-yard-ev-charging",
        "ev-charging",
        68,
        66,
        "EV Charging Systems, charge point",
        "Системи зарядки електромобілів, зарядна станція",
        "Providing power distribution to EV charging points at the facility's external car park.",
        "Розподіл живлення до зарядних станцій електромобілів на зовнішньому паркінгу об'єкта.",
      ),
    ],
  },
  {
    id: "tank-farm",
    number: 6,
    image: `${IMAGE_BASE}/zones/industrial-tank-farm-v2.webp`,
    imageAlt: {
      uk: "Tank farm with an elevated cable ladder, a black cast-resin busbar riser and a copper earthing bar with bonding conductors",
      ua: "Резервуарний парк з піднятою кабельною драбиною, шинопроводом литої ізоляції та мідною шиною заземлення з провідниками",
    },
    content: {
      uk: { name: "Tank Farm" },
      ua: { name: "Резервуарний парк" },
    },
    approvedProductFamilyIds: ["cable-management", "busbar", "earthing-lightning"],
    hotspots: [
      busbarHotspot(
        "tank-farm-busbar",
        35,
        15,
        "GR Cast Resin",
        "GR Cast Resin",
        "GR Cast Resin Busbar feeds the tank farm's local distribution cabinet through a sealed, chemical-resistant riser.",
        "Шинопровід GR Cast Resin живить місцеву розподільну шафу резервуарного парку через герметичний, стійкий до хімічних речовин стояк.",
        GR_OVERRIDE,
      ),
      hotspot(
        "tank-farm-cable-management",
        "cable-management",
        27,
        45,
        "Cable Management Systems, elevated cable ladder",
        "Системи кабельного менеджменту, піднята кабельна драбина",
        "Routing power and control cabling on an elevated ladder above the tank farm pipe rack.",
        "Прокладання силових та керуючих кабелів по піднятій драбині над трубопровідною естакадою резервуарного парку.",
      ),
      hotspot(
        "tank-farm-earthing",
        "earthing-lightning",
        23,
        90,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Providing the main equipotential bonding point for the tank farm's local distribution cabinet.",
        "Забезпечення головної точки вирівнювання потенціалів для місцевої розподільної шафи резервуарного парку.",
      ),
    ],
  },
  {
    id: "warehouse-logistics-hall",
    number: 7,
    image: `${IMAGE_BASE}/zones/industrial-warehouse-logistics-hall.webp`,
    imageAlt: {
      uk: "Warehouse and logistics hall with an overhead cable tray, an enclosed power busbar and a slim lighting busbar feeding high-bay LED luminaires",
      ua: "Складський та логістичний цех з надземним кабельним лотком, закритим силовим шинопроводом та тонким освітлювальним шинопроводом для промислових LED світильників",
    },
    content: {
      uk: { name: "Warehouse / Logistics Hall" },
      ua: { name: "Склад / логістичний цех" },
    },
    approvedProductFamilyIds: ["cable-management", "busbar", "led-systems"],
    hotspots: [
      hotspot(
        "warehouse-logistics-hall-cable-management",
        "cable-management",
        50,
        12,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and data cabling along the warehouse ceiling apex to loading-dock distribution panels.",
        "Прокладання силових та інформаційних кабелів вздовж коника даху складу до розподільних щитів навантажувальних доків.",
      ),
      busbarHotspot(
        "warehouse-logistics-hall-busbar-ggd",
        60,
        20,
        "GGD Medium Power",
        "GGD Medium Power",
        "GGD Medium Power Busbar supplies conveyor equipment, machinery and regional distribution points across the warehouse.",
        "Шинопровід GGD Medium Power живить конвеєрне обладнання, техніку та регіональні точки розподілу на складі.",
        GGD_OVERRIDE,
      ),
      busbarHotspot(
        "warehouse-logistics-hall-busbar-gnl",
        78,
        30,
        "GNL Lighting Busbar",
        "GNL Lighting Busbar",
        "GNL Lighting Busbar distributes power along the warehouse ceiling and provides organised tap-off connections for the high-bay luminaires.",
        "Освітлювальний шинопровід GNL розподіляє живлення вздовж стелі складу та забезпечує впорядковані точки підключення для промислових світильників.",
        GNL_OVERRIDE,
      ),
      hotspot(
        "warehouse-logistics-hall-led-systems",
        "led-systems",
        35,
        32,
        "LED Systems, high-bay luminaire",
        "Системи освітлення LED, промисловий світильник",
        "Providing general lighting across the warehouse floor, fed from the overhead lighting busbar.",
        "Забезпечення загального освітлення складської зони, яке живиться від надземного освітлювального шинопроводу.",
      ),
    ],
  },
  {
    id: "transformer-connection",
    number: 8,
    image: `${IMAGE_BASE}/zones/industrial-transformer-connection-v2.webp`,
    imageAlt: {
      uk: "Transformer connection room with a compact enclosed busbar riser between the transformer and LV switchboard, an overhead cable tray and a bonding conductor",
      ua: "Приміщення трансформаторного підключення з компактним закритим шинопроводом-стояком між трансформатором та НН щитом, надземним кабельним лотком та провідником заземлення",
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
        15,
        12,
        "Cable Management Systems, open cable tray",
        "Системи кабельного менеджменту, відкритий кабельний лоток",
        "Routing control and auxiliary cabling above the transformer bay, separate from the busbar riser.",
        "Прокладання керуючих та допоміжних кабелів над трансформаторним відсіком, окремо від шинопроводу-стояка.",
      ),
      busbarHotspot(
        "transformer-connection-busbar",
        62,
        18,
        "GS Super Compact",
        "GS Super Compact",
        "GS Super Compact connects the transformer to the LV switchboard through a compact enclosed busbar riser.",
        "Шинопровід GS Super Compact з'єднує трансформатор з НН щитом через компактний закритий шинопровід-стояк.",
        GS_OVERRIDE,
      ),
      hotspot(
        "transformer-connection-earthing",
        "earthing-lightning",
        68,
        72,
        "Earthing & Lightning Protection, bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення",
        "Bonding the transformer and LV switchboard to the facility's earthing system.",
        "Вирівнювання потенціалів трансформатора та НН щита із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "pump-motor-room",
    number: 9,
    image: `${IMAGE_BASE}/zones/industrial-pump-motor-room.webp`,
    imageAlt: {
      uk: "Pump and motor room with black cast-resin busbar drops feeding each motor, an overhead wire mesh tray, a copper bonding bar and linear LED lighting",
      ua: "Насосно-моторне приміщення з відгалуженнями шинопроводу литої ізоляції до кожного двигуна, надземним сітчастим лотком, мідною шиною заземлення та лінійним LED освітленням",
    },
    content: {
      uk: { name: "Pump & Motor Room" },
      ua: { name: "Насосно-моторне приміщення" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "pump-motor-room-cable-management",
        "cable-management",
        8,
        8,
        "Cable Management Systems, overhead wire mesh tray",
        "Системи кабельного менеджменту, надземний сітчастий лоток",
        "Routing power and control cabling above the pump and motor line-up.",
        "Прокладання силових та керуючих кабелів над рядом насосів та двигунів.",
      ),
      busbarHotspot(
        "pump-motor-room-busbar",
        55,
        35,
        "GR Cast Resin",
        "GR Cast Resin",
        "GR Cast Resin Busbar feeds each pump and motor through a sealed, vertically dropped riser section.",
        "Шинопровід GR Cast Resin живить кожен насос та двигун через герметичний вертикальний відгалужувальний стояк.",
        GR_OVERRIDE,
      ),
      hotspot(
        "pump-motor-room-earthing",
        "earthing-lightning",
        10,
        68,
        "Earthing & Lightning Protection, copper bonding bar",
        "Заземлення та блискавкозахист, мідна шина заземлення",
        "Providing the main equipotential bonding point for the pump and motor installation.",
        "Забезпечення головної точки вирівнювання потенціалів для насосно-моторної установки.",
      ),
      hotspot(
        "pump-motor-room-led-systems",
        "led-systems",
        45,
        8,
        "LED Systems, linear ceiling luminaire",
        "Системи освітлення LED, лінійний стельовий світильник",
        "Providing general lighting across the pump and motor room.",
        "Забезпечення загального освітлення насосно-моторного приміщення.",
      ),
    ],
  },
  {
    id: "factory-lighting-assembly-hall",
    number: 10,
    image: `${IMAGE_BASE}/zones/industrial-factory-lighting-assembly-hall.webp`,
    imageAlt: {
      uk: "Factory assembly hall with a slim overhead lighting busbar feeding linear LED luminaires, a wire mesh cable tray and a bonding conductor",
      ua: "Складальний цех з тонким надземним освітлювальним шинопроводом для лінійних LED світильників, сітчастим кабельним лотком та провідником заземлення",
    },
    content: {
      uk: { name: "Factory Lighting & Assembly Hall" },
      ua: { name: "Складальний цех" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "factory-lighting-assembly-hall-cable-management",
        "cable-management",
        20,
        15,
        "Cable Management Systems, overhead wire mesh tray",
        "Системи кабельного менеджменту, надземний сітчастий лоток",
        "Routing power and data cabling along the assembly hall side wall.",
        "Прокладання силових та інформаційних кабелів вздовж бічної стіни складального цеху.",
      ),
      busbarHotspot(
        "factory-lighting-assembly-hall-busbar",
        55,
        25,
        "GNL Lighting Busbar",
        "GNL Lighting Busbar",
        "GNL Lighting Busbar distributes power along the assembly hall ceiling and provides organised tap-off connections for luminaires and lighting circuits.",
        "Освітлювальний шинопровід GNL розподіляє живлення вздовж стелі складального цеху та забезпечує впорядковані точки підключення для світильників і освітлювальних кіл.",
        GNL_OVERRIDE,
      ),
      hotspot(
        "factory-lighting-assembly-hall-earthing",
        "earthing-lightning",
        13,
        62,
        "Earthing & Lightning Protection, bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення",
        "Bonding the wall-mounted distribution enclosure to the facility's earthing system.",
        "Вирівнювання потенціалів настінної розподільної шафи із системою заземлення об'єкта.",
      ),
      hotspot(
        "factory-lighting-assembly-hall-led-systems",
        "led-systems",
        68,
        20,
        "LED Systems, linear luminaire",
        "Системи освітлення LED, лінійний світильник",
        "Providing general lighting across the assembly hall, fed from the overhead lighting busbar.",
        "Забезпечення загального освітлення складального цеху, яке живиться від надземного освітлювального шинопроводу.",
      ),
    ],
  },
  {
    id: "industrial-street-loading-yard",
    number: 11,
    image: `${IMAGE_BASE}/zones/industrial-street-loading-yard.webp`,
    imageAlt: {
      uk: "Industrial street and loading yard at dusk with a building service cable feeder, an external bonding connection and an LED street-lighting column",
      ua: "Промислова вулиця та зона навантаження у сутінках з кабельним живленням будівлі, зовнішнім з'єднанням заземлення та опорою LED вуличного освітлення",
    },
    content: {
      uk: { name: "Industrial Street & Loading Yard" },
      ua: { name: "Промислова вулиця та зона навантаження" },
    },
    approvedProductFamilyIds: ["cable-management", "earthing-lightning", "led-systems"],
    hotspots: [
      hotspot(
        "industrial-street-loading-yard-cable-management",
        "cable-management",
        88,
        65,
        "Cable Management Systems, building service feeder route",
        "Системи кабельного менеджменту, кабельне живлення будівлі",
        "Feeding power from the building's protected service area to the external distribution enclosure.",
        "Живлення від захищеної технічної зони будівлі до зовнішньої розподільної шафи.",
      ),
      hotspot(
        "industrial-street-loading-yard-earthing",
        "earthing-lightning",
        86,
        80,
        "Earthing & Lightning Protection, feeder-cabinet bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення розподільної шафи",
        "Bonding the external feeder cabinet to the facility's protected earthing connection.",
        "Вирівнювання потенціалів зовнішньої розподільної шафи із захищеним з'єднанням заземлення об'єкта.",
      ),
      hotspot(
        "industrial-street-loading-yard-led-systems",
        "led-systems",
        13,
        10,
        "LED Systems, street-lighting column head",
        "Системи освітлення LED, головка опори вуличного освітлення",
        "Providing general area lighting along the industrial street and loading yard.",
        "Забезпечення загального освітлення промислової вулиці та зони навантаження.",
      ),
    ],
  },
] as const satisfies readonly Zone<IndustrialFacilityZoneId>[];

// ---------------------------------------------------------------------------
// Overview — aerial fotoğrafta tüm 11 bölge için tıklanabilir bölge
// hotspot'ları. Bu tek gece havadan çekimi 11 bölgenin TÜMÜNÜ görsel olarak
// ayırt edilebilir şekilde göstermiyor: Production Line, Control Room,
// Pump & Motor Room ve Factory Lighting & Assembly Hall büyük beyaz bina
// gövdesinin İÇİNDE kalan iç mekanlar olduğu için dıştan birbirinden veya
// diğer iç mekanlardan ayırt edilemiyor. Kullanıcının açık onayıyla
// ("seçenek C"), bu dört bölge için koordinatlar en makul dış yapıya
// (büyük beyaz bina ve onun proses/tank tarafındaki komşuluğu) YAKLAŞIK
// olarak yerleştirildi — bu net bir görsel kanıta dayanmaz, yalnızca
// makul bir tahmindir. Aşağıda APPROXIMATE olarak işaretli dört hotspot
// bu kategoridedir; gerçek bir bina/görsel kanıt bulunursa (ör. yeni bir
// overview fotoğrafı) buradaki koordinatlar güncellenmelidir.
// ---------------------------------------------------------------------------

function overviewHotspot(
  id: string,
  zoneId: IndustrialFacilityZoneId,
  x: number,
  y: number,
  labelUk: string,
  labelUa: string,
): OverviewHotspot<IndustrialFacilityZoneId> {
  return {
    id,
    zoneId,
    x,
    y,
    accessibleLabel: { uk: labelUk, ua: labelUa },
  };
}

const OVERVIEW = {
  image: `${IMAGE_BASE}/overview/industrial-facility-application-map-overview.webp`,
  imageAlt: {
    uk: "Aerial night view of an industrial process facility showing the main building, tank farm, external utilities yard and site roads",
    ua: "Нічний вигляд з висоти на промисловий об'єкт з головною будівлею, резервуарним парком, зовнішньою технічною зоною та дорогами об'єкта",
  },
  hotspots: [
    overviewHotspot(
      "overview-main-electrical-room",
      "main-electrical-room",
      53,
      52,
      "Main Electrical Room",
      "Головне електротехнічне приміщення",
    ),
    overviewHotspot(
      "overview-process-area",
      "process-area",
      50,
      38,
      "Process Area",
      "Технологічна зона",
    ),
    overviewHotspot(
      "overview-external-utilities-yard",
      "external-utilities-yard",
      58,
      60,
      "External Utilities Yard",
      "Зовнішня технічна зона",
    ),
    overviewHotspot(
      "overview-tank-farm",
      "tank-farm",
      83,
      32,
      "Tank Farm",
      "Резервуарний парк",
    ),
    overviewHotspot(
      "overview-warehouse-logistics-hall",
      "warehouse-logistics-hall",
      45,
      15,
      "Warehouse / Logistics Hall",
      "Склад / логістичний цех",
    ),
    overviewHotspot(
      "overview-transformer-connection",
      "transformer-connection",
      68,
      63,
      "Transformer Connection",
      "Трансформаторне підключення",
    ),
    overviewHotspot(
      "overview-industrial-street-loading-yard",
      "industrial-street-loading-yard",
      30,
      75,
      "Industrial Street & Loading Yard",
      "Промислова вулиця та зона навантаження",
    ),
    // APPROXIMATE (bkz. yukarıdaki not) — büyük beyaz bina gövdesi içinde
    // kalan, dıştan ayırt edilemeyen dört iç mekan.
    overviewHotspot(
      "overview-production-line",
      "production-line",
      35,
      21,
      "Production Line",
      "Виробнича лінія",
    ),
    overviewHotspot(
      "overview-control-room",
      "control-room",
      42,
      31,
      "Control Room",
      "Диспетчерська",
    ),
    overviewHotspot(
      "overview-factory-lighting-assembly-hall",
      "factory-lighting-assembly-hall",
      58,
      20,
      "Factory Lighting & Assembly Hall",
      "Складальний цех",
    ),
    overviewHotspot(
      "overview-pump-motor-room",
      "pump-motor-room",
      64,
      29,
      "Pump & Motor Room",
      "Насосно-моторне приміщення",
    ),
  ],
} as const;

export const INDUSTRIAL_FACILITY_APPLICATION_MAP = {
  overview: OVERVIEW,
  zones: ZONES,
  productFamilies: PRODUCT_FAMILIES,
} as const satisfies ApplicationMap<IndustrialFacilityZoneId>;

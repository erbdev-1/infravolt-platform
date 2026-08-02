import { PRODUCT_FAMILY_NUMBERS } from "./types";

import type {
  DataCentreApplicationMap,
  Hotspot,
  OverviewHotspot,
  ProductFamily,
  Zone,
} from "./types";

const IMAGE_BASE = "/assets/application-map/data-centre";

// ---------------------------------------------------------------------------
// Ürün aileleri — InfraVolt'un mevcut altı ürün ailesi. Sahne bağlamından
// bağımsız, sabit içerik (isim, uygulama noktaları, faydalar, aksiyonlar).
// ---------------------------------------------------------------------------

const PRODUCT_FAMILIES = [
  {
    id: "cable-management",
    number: PRODUCT_FAMILY_NUMBERS["cable-management"],
    content: {
      uk: {
        name: "Cable Management Systems",
        applicationPoints: [
          "Routes power and data cabling between electrical rooms, plant areas and technical corridors",
          "Supports overhead cable runs above server halls and along service routes",
        ],
        benefits: [
          "Organised, serviceable cable routing",
          "Supports structured expansion as load increases",
          "Reduces cable clutter and improves airflow",
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
          "Прокладання силових та інформаційних кабелів між електротехнічними приміщеннями, технічними зонами та коридорами",
          "Підтримка надземних кабельних трас над серверними залами та вздовж технічних маршрутів",
        ],
        benefits: [
          "Впорядковане, зручне для обслуговування прокладання кабелів",
          "Підтримка структурованого розширення при зростанні навантаження",
          "Менше кабельного безладу, кращий повітрообмін",
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
          "Distributes power between switchgear, distribution boards and downstream equipment",
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
      },
      ua: {
        name: "Шинопровідні системи",
        image: "/assets/products/busbar/gs/card/gs-main-transparent-product.webp",
        imageAlt: "Шинопровідна система GS Super Compact — вигляд основного продукту",
        applicationPoints: [
          "Розподіл живлення між розподільними пристроями, щитами та підключеним обладнанням",
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
    },
  },
  {
    id: "underfloor",
    number: PRODUCT_FAMILY_NUMBERS.underfloor,
    content: {
      uk: {
        name: "Underfloor Cable Trunking",
        applicationPoints: [
          "Routes power and data cabling beneath a raised access floor",
          "Keeps cable runs organised and accessible for maintenance",
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
          "Прокладання силових та інформаційних кабелів під фальшпідлогою",
          "Впорядковані, доступні для обслуговування кабельні траси",
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
          "Provides equipment and rack bonding within electrical and technical spaces",
          "Forms part of the building's external earthing and lightning-protection network",
        ],
        benefits: [
          "Supports electrical safety and equipotential bonding",
          "Helps protect equipment from lightning-related transients",
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
          "Забезпечує вирівнювання потенціалів обладнання та стійок в електротехнічних і технічних приміщеннях",
          "Є частиною зовнішньої мережі заземлення та блискавкозахисту будівлі",
        ],
        benefits: [
          "Підтримка електробезпеки та вирівнювання потенціалів",
          "Захист обладнання від імпульсних перенапруг, пов'язаних з блискавкою",
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
          "Supports lighting distribution across technical, plant and service areas",
        ],
        benefits: [
          "Adaptable lighting layout for changing space use",
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
          "Підтримка розподілу освітлення у технічних, інженерних та сервісних зонах",
        ],
        benefits: [
          "Гнучке компонування освітлення при зміні призначення простору",
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
          "Supports electric-vehicle charging infrastructure at parking and external service areas",
        ],
        benefits: [
          "Supports on-site EV charging as part of the wider power distribution design",
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
          "Підтримка інфраструктури зарядки електромобілів на паркінгах та зовнішніх сервісних зонах",
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
// Bölgeler — her biri kendi temiz sahne görseline ve onaylı ürün ailesi
// alt kümesine sahiptir. Hotspot numaraları PRODUCT_FAMILY_NUMBERS ile
// senkron kalır (aynı numara her yerde aynı aileyi temsil eder).
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

const ZONES = [
  {
    id: "main-electrical-room",
    number: 1,
    image: `${IMAGE_BASE}/zones/data-centre-main-electrical-room.webp`,
    imageAlt: {
      uk: "Main electrical room with switchgear, overhead cable containment and busbar trunking",
      ua: "Головне електротехнічне приміщення з розподільними щитами, надземним кабельним лотком та шинопроводом",
    },
    content: {
      uk: { name: "Main Electrical Room" },
      ua: { name: "Головне електротехнічне приміщення" },
    },
    approvedProductFamilyIds: ["busbar", "cable-management", "earthing-lightning"],
    hotspots: [
      hotspot(
        "main-electrical-room-busbar",
        "busbar",
        60,
        18,
        "Busbar Systems, overhead distribution run",
        "Шинопровідні системи, надземна розподільна траса",
        "Distributing incoming power from switchgear to downstream distribution equipment within the main electrical room.",
        "Розподіл вхідного живлення від розподільних пристроїв до підключеного обладнання в межах головного електротехнічного приміщення.",
      ),
      hotspot(
        "main-electrical-room-cable-management",
        "cable-management",
        24,
        14,
        "Cable Management Systems, overhead route",
        "Системи кабельного менеджменту, надземна траса",
        "Routing power and control cabling overhead between switchgear, distribution equipment and adjoining rooms.",
        "Прокладання силових та керуючих кабелів над рівнем підлоги між розподільними пристроями, обладнанням та суміжними приміщеннями.",
      ),
      hotspot(
        "main-electrical-room-earthing",
        "earthing-lightning",
        86,
        80,
        "Earthing & Lightning Protection, equipment bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів обладнання",
        "Bonding switchgear and distribution equipment to the facility's earthing system.",
        "Вирівнювання потенціалів розподільних пристроїв та обладнання із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "server-hall",
    number: 2,
    image: `${IMAGE_BASE}/zones/data-centre-server-hall.webp`,
    imageAlt: {
      uk: "Server hall with rack rows and overhead cable containment and lighting",
      ua: "Серверна зала з рядами стійок, надземним кабельним лотком та освітленням",
    },
    content: {
      uk: { name: "Server Hall" },
      ua: { name: "Серверна зала" },
    },
    approvedProductFamilyIds: ["cable-management", "led-systems", "earthing-lightning"],
    hotspots: [
      hotspot(
        "server-hall-cable-management",
        "cable-management",
        16,
        22,
        "Cable Management Systems, overhead rack route",
        "Системи кабельного менеджменту, надземна траса над стійками",
        "Routing structured cabling and power feeds above server rack rows.",
        "Прокладання структурованих кабелів та живлення над рядами серверних стійок.",
      ),
      hotspot(
        "server-hall-led-systems",
        "led-systems",
        50,
        8,
        "LED Systems, aisle lighting",
        "Системи освітлення LED, освітлення проходу",
        "Providing general lighting along the server hall access aisle.",
        "Забезпечення загального освітлення вздовж проходу серверної зали.",
      ),
      hotspot(
        "server-hall-earthing",
        "earthing-lightning",
        9,
        64,
        "Earthing & Lightning Protection, rack bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів стійок",
        "Bonding server racks and cabinets to the facility's earthing system.",
        "Вирівнювання потенціалів серверних стійок і шаф із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "raised-floor-services",
    number: 3,
    image: `${IMAGE_BASE}/zones/data-centre-raised-floor-services.webp`,
    imageAlt: {
      uk: "Raised floor void with underfloor trunking, cable routes and earthing connections",
      ua: "Простір під фальшпідлогою з підпідловими коробами, кабельними трасами та точками заземлення",
    },
    content: {
      uk: { name: "Raised Floor Services" },
      ua: { name: "Інженерні мережі під фальшпідлогою" },
    },
    approvedProductFamilyIds: ["underfloor", "cable-management", "earthing-lightning"],
    hotspots: [
      hotspot(
        "raised-floor-underfloor",
        "underfloor",
        30,
        45,
        "Underfloor Cable Trunking, rack feed route",
        "Підпідлогові кабельні короби, траса живлення до стійок",
        "Routing power and data cabling beneath the raised access floor to server rack positions.",
        "Прокладання силових та інформаційних кабелів під фальшпідлогою до місць розташування серверних стійок.",
      ),
      hotspot(
        "raised-floor-cable-management",
        "cable-management",
        66,
        60,
        "Cable Management Systems, underfloor service corridor",
        "Системи кабельного менеджменту, службовий коридор під підлогою",
        "Supporting additional cable routes within the raised-floor void.",
        "Підтримка додаткових кабельних трас у просторі під фальшпідлогою.",
      ),
      hotspot(
        "raised-floor-earthing",
        "earthing-lightning",
        24,
        86,
        "Earthing & Lightning Protection, underfloor bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів під підлогою",
        "Bonding underfloor distribution equipment to the facility's earthing system.",
        "Вирівнювання потенціалів розподільного обладнання під фальшпідлогою із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "mechanical-electrical-plant-room",
    number: 4,
    image: `${IMAGE_BASE}/zones/data-centre-mechanical-electrical-plant-room.webp`,
    imageAlt: {
      uk: "Mechanical and electrical plant room with pumps, control panels and overhead cable containment",
      ua: "Механічне та електротехнічне приміщення з насосами, щитами керування та надземним кабельним лотком",
    },
    content: {
      uk: { name: "Mechanical / Electrical Plant Room" },
      ua: { name: "Механічне / електротехнічне приміщення" },
    },
    // Bu görselde net bir kapalı busbar hattı veya belirgin bonding
    // iletken görülmediği için ilgili aileler bilinçli olarak dışarıda
    // bırakıldı (bkz. proje talimatı: sadece görsel olarak inandırıcıysa ekle).
    approvedProductFamilyIds: ["cable-management", "led-systems"],
    hotspots: [
      hotspot(
        "plant-room-cable-management",
        "cable-management",
        22,
        12,
        "Cable Management Systems, overhead plant route",
        "Системи кабельного менеджменту, надземна траса над обладнанням",
        "Routing control and power cabling above mechanical plant equipment.",
        "Прокладання керуючих та силових кабелів над механічним обладнанням.",
      ),
      hotspot(
        "plant-room-led-systems",
        "led-systems",
        54,
        9,
        "LED Systems, plant room lighting",
        "Системи освітлення LED, освітлення технічного приміщення",
        "Providing general lighting within the mechanical and electrical plant room.",
        "Забезпечення загального освітлення в механічному та електротехнічному приміщенні.",
      ),
    ],
  },
  {
    id: "rooftop-cooling-electrical",
    number: 5,
    image: `${IMAGE_BASE}/zones/data-centre-rooftop-cooling-electrical.webp`,
    imageAlt: {
      uk: "Rooftop cooling and electrical enclosures with cable containment and lightning air terminals",
      ua: "Дахові холодильні та електротехнічні шафи з кабельним лотком та блискавкоприймачами",
    },
    content: {
      uk: { name: "Rooftop Cooling & Electrical" },
      ua: { name: "Дахове охолодження та електрообладнання" },
    },
    approvedProductFamilyIds: ["cable-management", "earthing-lightning"],
    hotspots: [
      hotspot(
        "rooftop-cable-management",
        "cable-management",
        24,
        76,
        "Cable Management Systems, rooftop route",
        "Системи кабельного менеджменту, дахова траса",
        "Routing power and control cabling between rooftop cooling units and electrical enclosures.",
        "Прокладання силових та керуючих кабелів між дахoвими холодильними установками та електротехнічними шафами.",
      ),
      hotspot(
        "rooftop-earthing",
        "earthing-lightning",
        88,
        14,
        "Earthing & Lightning Protection, rooftop air terminal",
        "Заземлення та блискавкозахист, дахoвий блискавкоприймач",
        "Providing lightning-protection conductors and bonding for rooftop equipment.",
        "Забезпечення провідників блискавкозахисту та вирівнювання потенціалів дахового обладнання.",
      ),
    ],
  },
  {
    id: "external-utility-area",
    number: 6,
    image: `${IMAGE_BASE}/zones/data-centre-external-utility-enclosure.webp`,
    imageAlt: {
      uk: "External utility area with outdoor enclosures, overhead cable containment and a lightning air terminal",
      ua: "Зовнішня комунальна зона із зовнішніми шафами, надземним кабельним лотком та блискавкоприймачем",
    },
    content: {
      uk: { name: "External Utility Area" },
      ua: { name: "Зовнішня комунальна зона" },
    },
    approvedProductFamilyIds: ["cable-management", "earthing-lightning"],
    hotspots: [
      hotspot(
        "external-utility-cable-management",
        "cable-management",
        64,
        26,
        "Cable Management Systems, external route",
        "Системи кабельного менеджменту, зовнішня траса",
        "Routing power and control cabling between external enclosures and the building.",
        "Прокладання силових та керуючих кабелів між зовнішніми шафами та будівлею.",
      ),
      hotspot(
        "external-utility-earthing",
        "earthing-lightning",
        39,
        11,
        "Earthing & Lightning Protection, external air terminal",
        "Заземлення та блискавкозахист, зовнішній блискавкоприймач",
        "Providing external earthing and lightning-protection connections for the utility area.",
        "Забезпечення зовнішніх з'єднань заземлення та блискавкозахисту для комунальної зони.",
      ),
    ],
  },
  {
    id: "parking-ev-services",
    number: 7,
    image: `${IMAGE_BASE}/zones/data-centre-ev-charging-external-services.webp`,
    imageAlt: {
      uk: "Parking area with EV charging points, canopy lighting and external electrical enclosures",
      ua: "Паркінг із зарядними станціями для електромобілів, освітленням навісу та зовнішніми електрошафами",
    },
    content: {
      uk: { name: "Parking & EV Services" },
      ua: { name: "Паркінг та зарядна інфраструктура" },
    },
    approvedProductFamilyIds: [
      "ev-charging",
      "cable-management",
      "led-systems",
      "earthing-lightning",
    ],
    hotspots: [
      hotspot(
        "parking-ev-charging",
        "ev-charging",
        15,
        56,
        "EV Charging Systems, charge point row",
        "Системи зарядки електромобілів, ряд зарядних станцій",
        "Providing power distribution to EV charging points across the parking area.",
        "Розподіл живлення до зарядних станцій електромобілів на паркінгу.",
      ),
      hotspot(
        "parking-cable-management",
        "cable-management",
        80,
        26,
        "Cable Management Systems, external panel route",
        "Системи кабельного менеджменту, траса до зовнішніх шаф",
        "Routing power cabling from the building to EV charging points and external panels.",
        "Прокладання силових кабелів від будівлі до зарядних станцій та зовнішніх шаф.",
      ),
      hotspot(
        "parking-led-systems",
        "led-systems",
        18,
        13,
        "LED Systems, canopy lighting",
        "Системи освітлення LED, освітлення навісу",
        "Providing area lighting across the parking and EV charging canopy.",
        "Забезпечення освітлення території паркінгу та навісу зарядних станцій.",
      ),
      hotspot(
        "parking-earthing",
        "earthing-lightning",
        90,
        62,
        "Earthing & Lightning Protection, external enclosure bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів зовнішніх шаф",
        "Bonding EV charging equipment and external enclosures to the facility's earthing system.",
        "Вирівнювання потенціалів обладнання зарядних станцій та зовнішніх шаф із системою заземлення об'єкта.",
      ),
    ],
  },
] as const satisfies readonly Zone[];

// ---------------------------------------------------------------------------
// Overview — yedi bölgeye geçiş için tıklanabilir bölge hotspot'ları.
// ---------------------------------------------------------------------------

function overviewHotspot(
  id: string,
  zoneId: OverviewHotspot["zoneId"],
  x: number,
  y: number,
  labelUk: string,
  labelUa: string,
): OverviewHotspot {
  return {
    id,
    zoneId,
    x,
    y,
    accessibleLabel: { uk: labelUk, ua: labelUa },
  };
}

const OVERVIEW = {
  image: `${IMAGE_BASE}/overview/data-centre-overview.webp`,
  imageAlt: {
    uk: "Conceptual cutaway view of a Data Centre showing electrical, mechanical, server and external service areas",
    ua: "Концептуальний розріз центру обробки даних з електротехнічними, механічними, серверними та зовнішніми зонами",
  },
  hotspots: [
    overviewHotspot(
      "overview-main-electrical-room",
      "main-electrical-room",
      25,
      58,
      "Main Electrical Room",
      "Головне електротехнічне приміщення",
    ),
    overviewHotspot(
      "overview-server-hall",
      "server-hall",
      58,
      42,
      "Server Hall",
      "Серверна зала",
    ),
    overviewHotspot(
      "overview-raised-floor-services",
      "raised-floor-services",
      70,
      52,
      "Raised Floor Services",
      "Інженерні мережі під фальшпідлогою",
    ),
    overviewHotspot(
      "overview-mechanical-electrical-plant-room",
      "mechanical-electrical-plant-room",
      33,
      76,
      "Mechanical / Electrical Plant Room",
      "Механічне / електротехнічне приміщення",
    ),
    overviewHotspot(
      "overview-rooftop-cooling-electrical",
      "rooftop-cooling-electrical",
      45,
      11,
      "Rooftop Cooling & Electrical",
      "Дахове охолодження та електрообладнання",
    ),
    overviewHotspot(
      "overview-external-utility-area",
      "external-utility-area",
      90,
      66,
      "External Utility Area",
      "Зовнішня комунальна зона",
    ),
    overviewHotspot(
      "overview-parking-ev-services",
      "parking-ev-services",
      9,
      86,
      "Parking & EV Services",
      "Паркінг та зарядна інфраструктура",
    ),
  ],
} as const;

export const DATA_CENTRE_APPLICATION_MAP = {
  overview: OVERVIEW,
  zones: ZONES,
  productFamilies: PRODUCT_FAMILIES,
} as const satisfies DataCentreApplicationMap;

import { PRODUCT_FAMILY_NUMBERS } from "./types";

import type {
  ApplicationMap,
  Hotspot,
  OverviewHotspot,
  ProductFamily,
  Zone,
} from "./types";

const IMAGE_BASE = "/assets/application-map/healthcare";

// ---------------------------------------------------------------------------
// Healthcare bölge kimlikleri — Data Centre'den bağımsız, kendi sektörüne
// özgü sabit bir küme. types.ts'teki genel Zone<TZoneId>/Overview<TZoneId>
// modeli bu kimliklerle somutlaştırılır.
// ---------------------------------------------------------------------------

export const HEALTHCARE_ZONE_IDS = [
  "main-electrical-room",
  "operating-theatre",
  "medical-equipment-room",
  "patient-ward",
  "rooftop-plant",
  "ambulance-bay-external-services",
  "underfloor-services",
  "parking-ev-external-lighting",
] as const;

export type HealthcareZoneId = (typeof HEALTHCARE_ZONE_IDS)[number];

// ---------------------------------------------------------------------------
// Ürün aileleri — InfraVolt'un mevcut altı ürün ailesi, Healthcare bağlamına
// uyarlanmış açıklamalarla. Aksiyon linkleri ürün bazlıdır (sektörden
// bağımsız), bu yüzden Data Centre ile aynı href yapısını kullanır.
// ---------------------------------------------------------------------------

const PRODUCT_FAMILIES = [
  {
    id: "cable-management",
    number: PRODUCT_FAMILY_NUMBERS["cable-management"],
    content: {
      uk: {
        name: "Cable Management Systems",
        applicationPoints: [
          "Routes power and data cabling between clinical, technical and plant areas",
          "Supports structured cabling above patient-care and diagnostic spaces",
        ],
        benefits: [
          "Organised, serviceable cable routing in clinical environments",
          "Supports structured expansion as equipment and services change",
          "Reduces cable clutter in patient-facing and technical areas",
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
          "Прокладання силових та інформаційних кабелів між клінічними, технічними та інженерними зонами",
          "Підтримка структурованого кабелювання над зонами догляду за пацієнтами та діагностики",
        ],
        benefits: [
          "Впорядковане, зручне для обслуговування прокладання кабелів у клінічному середовищі",
          "Підтримка структурованого розширення при зміні обладнання та послуг",
          "Менше кабельного безладу в зонах, що контактують з пацієнтами",
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
          "Distributes power between switchgear, distribution boards and downstream clinical equipment",
          "Provides a compact alternative to large cable bundles in high-current risers",
        ],
        benefits: [
          "Compact, high-current power distribution",
          "Flexible tap-off points for downstream connections",
          "Reduced installation time versus equivalent cabling",
        ],
        actions: [
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
      },
      ua: {
        name: "Шинопровідні системи",
        image: "/assets/products/busbar/gs/card/gs-main-transparent-product.webp",
        imageAlt: "Шинопровідна система GS Super Compact — вигляд основного продукту",
        applicationPoints: [
          "Розподіл живлення між розподільними пристроями, щитами та підключеним клінічним обладнанням",
          "Компактна альтернатива великим кабельним пучкам на високострумових стояках",
        ],
        benefits: [
          "Компактний розподіл потужного струму",
          "Гнучкі точки підключення для нижчого обладнання",
          "Менший час монтажу порівняно з еквівалентним кабелем",
        ],
        actions: [
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
          "Keeps cable runs organised and accessible for maintenance in technical areas",
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
          "Впорядковані, доступні для обслуговування кабельні траси в технічних зонах",
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
          "Provides equipment and enclosure bonding within clinical and technical spaces",
          "Forms part of the building's external earthing and lightning-protection network",
        ],
        benefits: [
          "Supports electrical safety and equipotential bonding",
          "Helps protect sensitive medical equipment from lightning-related transients",
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
          "Забезпечує вирівнювання потенціалів обладнання та шаф у клінічних і технічних приміщеннях",
          "Є частиною зовнішньої мережі заземлення та блискавкозахисту будівлі",
        ],
        benefits: [
          "Підтримка електробезпеки та вирівнювання потенціалів",
          "Захист чутливого медичного обладнання від імпульсних перенапруг, пов'язаних з блискавкою",
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
          "Supports lighting distribution across clinical, diagnostic and ward areas",
        ],
        benefits: [
          "Adaptable lighting layout for changing clinical space use",
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
          "Підтримка розподілу освітлення у клінічних, діагностичних та палатних зонах",
        ],
        benefits: [
          "Гнучке компонування освітлення при зміні призначення клінічного простору",
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
// Bölgeler — her biri kendi temiz sahne görseline ve onaylı ürün ailesi alt
// kümesine sahiptir. Yalnız fotoğrafta görsel olarak inandırıcı olan ürün
// aileleri onaylanmıştır (bkz. proje genelindeki "technically defensible
// hotspot" ilkesi).
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
    image: `${IMAGE_BASE}/zones/healthcare-main-electrical-room.webp`,
    imageAlt: {
      uk: "Main electrical room with switchgear panels, an overhead busbar trunking run, cable basket and a copper earthing bar",
      ua: "Головне електротехнічне приміщення з розподільними щитами, надземним шинопроводом, кабельним лотком та мідною шиною заземлення",
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
        18,
        9,
        "Cable Management Systems, overhead cable basket tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and control cabling above the main switchgear line-up.",
        "Прокладання силових та керуючих кабелів над рядом головних розподільних щитів.",
      ),
      hotspot(
        "main-electrical-room-busbar",
        "busbar",
        55,
        20,
        "Busbar Systems, overhead distribution trunking",
        "Шинопровідні системи, надземний розподільний шинопровід",
        "High-current power distribution between the switchgear and downstream distribution equipment via an overhead busbar trunking run.",
        "Розподіл потужного струму між розподільними щитами та підключеним нижчим обладнанням через надземний шинопровід.",
      ),
      hotspot(
        "main-electrical-room-earthing",
        "earthing-lightning",
        88,
        80,
        "Earthing & Lightning Protection, main bonding bar",
        "Заземлення та блискавкозахист, головна шина вирівнювання потенціалів",
        "Providing the main equipotential bonding point for switchgear and distribution equipment in this room.",
        "Забезпечення головної точки вирівнювання потенціалів для розподільних пристроїв у цьому приміщенні.",
      ),
      hotspot(
        "main-electrical-room-led-systems",
        "led-systems",
        27,
        13,
        "LED Systems, ceiling-mounted linear lighting",
        "Системи освітлення LED, стельові лінійні світильники",
        "Providing organised power distribution for the ceiling-mounted linear lighting installation in this technical room.",
        "Забезпечення впорядкованого розподілу живлення для стельових лінійних світильників у цьому технічному приміщенні.",
      ),
    ],
  },
  {
    id: "operating-theatre",
    number: 2,
    // Cerrahi salon fotoğrafında ameliyat lambaları, hasta monitörleri ve
    // anestezi cihazı gibi genel tıbbi ekipman görünüyor — bunlar Gersan/
    // InfraVolt ürünü DEĞİL. Teknik olarak doğrulanabilir tek şey, tavana
    // monte edilmiş lineer aydınlatma armatürüdür; bu yüzden yalnızca LED
    // Systems (numara 5) için savunulabilir bir hotspot ekleniyor.
    image: `${IMAGE_BASE}/zones/healthcare-operating-theatre.webp`,
    imageAlt: {
      uk: "Operating theatre with ceiling-mounted linear lighting above surgical equipment",
      ua: "Операційна зала зі стельовими лінійними світильниками над хірургічним обладнанням",
    },
    content: {
      uk: { name: "Operating Theatre" },
      ua: { name: "Операційна зала" },
    },
    approvedProductFamilyIds: ["led-systems"],
    hotspots: [
      hotspot(
        "operating-theatre-led-systems",
        "led-systems",
        30,
        8,
        "LED Systems, ceiling-mounted linear lighting",
        "Системи освітлення LED, стельові лінійні світильники",
        "Providing general lighting distribution across the theatre suite ceiling, separate from the surgical light pendants.",
        "Забезпечення загального розподілу освітлення по стелі операційної зали, окремо від хірургічних світильників.",
      ),
    ],
  },
  {
    id: "medical-equipment-room",
    number: 3,
    image: `${IMAGE_BASE}/zones/healthcare-medical-imaging-room.webp`,
    imageAlt: {
      uk: "Raised-floor service corridor outside a medical imaging suite, with underfloor cable trunking, a floor distribution box and visible earthing conductors",
      ua: "Службовий коридор з фальшпідлогою поруч із кабінетом медичної візуалізації, з підпідловими кабельними коробами, розподільною коробкою та видимими провідниками заземлення",
    },
    content: {
      uk: { name: "Medical Imaging Room" },
      ua: { name: "Кабінет медичної візуалізації" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "underfloor",
      "earthing-lightning",
    ],
    hotspots: [
      hotspot(
        "medical-equipment-room-cable-management",
        "cable-management",
        67,
        53,
        "Cable Management Systems, underfloor distribution box",
        "Системи кабельного менеджменту, розподільна коробка під підлогою",
        "Distributing power and data cabling from a floor-level junction box to adjoining underfloor routes.",
        "Розподіл силових та інформаційних кабелів від напільної розподільної коробки до суміжних підпідлогових трас.",
      ),
      hotspot(
        "medical-equipment-room-underfloor",
        "underfloor",
        80,
        78,
        "Underfloor Cable Trunking, raised-floor cable tray",
        "Підпідлогові кабельні короби, кабельний лоток під фальшпідлогою",
        "Routing power and data cabling beneath the raised access floor serving the imaging suite.",
        "Прокладання силових та інформаційних кабелів під фальшпідлогою для кабінету візуалізації.",
      ),
      hotspot(
        "medical-equipment-room-earthing",
        "earthing-lightning",
        58,
        62,
        "Earthing & Lightning Protection, underfloor bonding conductors",
        "Заземлення та блискавкозахист, провідники заземлення під підлогою",
        "Providing visible equipotential bonding conductors within the underfloor cable route.",
        "Забезпечення видимих провідників вирівнювання потенціалів у підпідловій кабельній трасі.",
      ),
    ],
  },
  {
    id: "patient-ward",
    number: 4,
    image: `${IMAGE_BASE}/zones/healthcare-patient-ward.webp`,
    imageAlt: {
      uk: "Patient ward with bed-head trunking and recessed ceiling lighting",
      ua: "Палата пацієнтів з трункінгом узголів'я ліжка та вбудованим стельовим освітленням",
    },
    content: {
      uk: { name: "Patient Ward" },
      ua: { name: "Палата пацієнтів" },
    },
    approvedProductFamilyIds: ["cable-management", "led-systems"],
    hotspots: [
      hotspot(
        "patient-ward-cable-management",
        "cable-management",
        92,
        47,
        "Cable Management Systems, bed-head trunking",
        "Системи кабельного менеджменту, трункінг узголів'я ліжка",
        "Distributing power, data and nurse-call connections along the bed-head of each patient bay.",
        "Розподіл живлення, даних та виклику медсестри вздовж узголів'я кожного ліжка пацієнта.",
      ),
      hotspot(
        "patient-ward-led-systems",
        "led-systems",
        50,
        9,
        "LED Systems, ward lighting",
        "Системи освітлення LED, освітлення палати",
        "Providing general and task lighting across the patient ward.",
        "Забезпечення загального та функціонального освітлення в палаті пацієнтів.",
      ),
    ],
  },
  {
    id: "rooftop-plant",
    number: 5,
    image: `${IMAGE_BASE}/zones/healthcare-rooftop-plant.webp`,
    imageAlt: {
      uk: "Rooftop plant area with an air-handling unit, overhead cable ladder and an air-terminal pole",
      ua: "Дахова технічна зона з вентиляційною установкою, надземною кабельною драбиною та щоглою блискавкоприймача",
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
        25,
        17,
        "Cable Management Systems, rooftop cable route",
        "Системи кабельного менеджменту, дахова кабельна траса",
        "Routing power and control cabling between rooftop plant equipment and electrical enclosures.",
        "Прокладання силових та керуючих кабелів між дахoвим технічним обладнанням та електротехнічними шафами.",
      ),
      hotspot(
        "rooftop-plant-earthing",
        "earthing-lightning",
        72,
        8,
        "Earthing & Lightning Protection, rooftop air terminal",
        "Заземлення та блискавкозахист, дахoвий блискавкоприймач",
        "Providing lightning-protection conductors and bonding for rooftop plant equipment.",
        "Забезпечення провідників блискавкозахисту та вирівнювання потенціалів дахового обладнання.",
      ),
    ],
  },
  {
    id: "ambulance-bay-external-services",
    number: 6,
    image: `${IMAGE_BASE}/zones/healthcare-ambulance-bay-external-services.webp`,
    imageAlt: {
      uk: "Ambulance bay with a standby generator and external electrical enclosures with an overhead cable route",
      ua: "Зона під'їзду швидкої допомоги з резервним генератором та зовнішніми електрошафами з надземною кабельною трасою",
    },
    content: {
      uk: { name: "Ambulance Bay & External Services" },
      ua: { name: "Зона швидкої допомоги та зовнішні мережі" },
    },
    approvedProductFamilyIds: ["cable-management", "earthing-lightning"],
    hotspots: [
      hotspot(
        "ambulance-bay-cable-management",
        "cable-management",
        80,
        15,
        "Cable Management Systems, external route",
        "Системи кабельного менеджменту, зовнішня траса",
        "Routing power and control cabling between the building and external electrical enclosures.",
        "Прокладання силових та керуючих кабелів між будівлею та зовнішніми електрошафами.",
      ),
      hotspot(
        "ambulance-bay-earthing",
        "earthing-lightning",
        76,
        88,
        "Earthing & Lightning Protection, external bonding point",
        "Заземлення та блискавкозахист, зовнішня точка вирівнювання потенціалів",
        "Bonding the external electrical enclosures and standby generator to the facility's earthing system.",
        "Вирівнювання потенціалів зовнішніх електрошаф та резервного генератора із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "underfloor-services",
    number: 7,
    // Bu görselde gerçek bir fallş döşeme/underfloor sistemi görünmüyor —
    // tavana monte edilmiş delikli kablo tepsisi ve duvara monte edilmiş
    // elektrik şafı gösteren bir teknik servis koridoru. Bu yüzden bölge
    // "Cable Service Corridor" olarak adlandırıldı ve Underfloor Cable
    // Trunking hotspot'u kaldırıldı. Koridor tavanında iki ayrı armatür
    // görünüyor: biri genel LED aydınlatma, diğeri numaralandırılmış
    // Busbar Systems hotspot'u ile ilişkilendirildi (tıklanınca aynı panel
    // içindeki GL aydınlatma şinopodu bağlantısına da erişilebiliyor).
    image: `${IMAGE_BASE}/zones/healthcare-underfloor-services.webp`,
    imageAlt: {
      uk: "Technical service corridor with an overhead perforated cable tray, wall-mounted electrical enclosure, visible bonding conductors and ceiling-mounted light fittings",
      ua: "Технічний службовий коридор з надземним перфорованим кабельним лотком, настінною електрошафою, видимими провідниками заземлення та стельовими світильниками",
    },
    content: {
      uk: { name: "Cable Service Corridor" },
      ua: { name: "Технічний кабельний коридор" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "underfloor-services-cable-management",
        "cable-management",
        52,
        12,
        "Cable Management Systems, overhead perforated cable tray",
        "Системи кабельного менеджменту, надземний перфорований кабельний лоток",
        "Routing power and data cabling along the technical service corridor to adjoining clinical areas.",
        "Прокладання силових та інформаційних кабелів вздовж технічного коридору до суміжних клінічних зон.",
      ),
      hotspot(
        "underfloor-services-earthing",
        "earthing-lightning",
        92,
        25,
        "Earthing & Lightning Protection, bonding conductor",
        "Заземлення та блискавкозахист, провідник заземлення",
        "Providing a visible equipotential bonding conductor within the corridor cable route.",
        "Забезпечення видимого провідника вирівнювання потенціалів у кабельній трасі коридору.",
      ),
      hotspot(
        "underfloor-services-led-systems",
        "led-systems",
        39,
        46,
        "LED Systems, corridor light fitting",
        "Системи освітлення LED, світильник коридору",
        "Providing general lighting along the technical service corridor.",
        "Забезпечення загального освітлення вздовж технічного службового коридору.",
      ),
      {
        id: "underfloor-services-busbar",
        productFamilyId: "busbar",
        x: 45,
        y: 51,
        accessibleLabel: {
          uk: "Busbar Systems, corridor light fitting",
          ua: "Шинопровідні системи, світильник коридору",
        },
        usedHereFor: {
          uk: "GL Lighting Busbar distributes power along the service corridor and provides organised tap-off connections for luminaires and lighting circuits.",
          ua: "Освітлювальний шинопровід GL розподіляє живлення вздовж службового коридору та забезпечує впорядковані точки підключення для світильників і освітлювальних кіл.",
        },
        // Bu koridordaki gerçek ürün GL Lighting Busbar'dır (GS Super
        // Compact değil) — bu yüzden panel görseli/CTA'ları aile
        // varsayılanı yerine bu override'ları kullanır.
        imageOverride: "/assets/products/busbar/gl/card/gl-main-product.webp",
        imageAltOverride: {
          uk: "GL lighting busbar system main product view",
          ua: "Освітлювальний шинопровід GL — вигляд основного продукту",
        },
        actionsOverride: {
          uk: [
            {
              label: "Explore GL Busbar System",
              href: "/products/busbar",
              type: "page",
            },
            {
              label: "View Relevant Busbar Series",
              href: "/products/busbar/gl-lighting-busbar",
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
              label: "Переглянути шинопровід GL",
              href: "/products/busbar",
              type: "page",
            },
            {
              label: "Переглянути відповідну серію шинопроводу",
              href: "/products/busbar/gl-lighting-busbar",
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
    ],
  },
  {
    id: "parking-ev-external-lighting",
    number: 8,
    image: `${IMAGE_BASE}/zones/healthcare-parking-ev-external-lighting.webp`,
    imageAlt: {
      uk: "Hospital car park at dusk with EV charging points, an external electrical enclosure and street lighting",
      ua: "Лікарняний паркінг у сутінках із зарядними станціями для електромобілів, зовнішньою електрошафою та вуличним освітленням",
    },
    content: {
      uk: { name: "Parking, EV & External Lighting" },
      ua: { name: "Паркінг, зарядка та зовнішнє освітлення" },
    },
    approvedProductFamilyIds: ["ev-charging", "cable-management", "led-systems"],
    hotspots: [
      hotspot(
        "parking-ev-charging",
        "ev-charging",
        78,
        72,
        "EV Charging Systems, charge point",
        "Системи зарядки електромобілів, зарядна станція",
        "Providing power distribution to EV charging points across the car park.",
        "Розподіл живлення до зарядних станцій електромобілів на паркінгу.",
      ),
      hotspot(
        "parking-cable-management",
        "cable-management",
        43,
        60,
        "Cable Management Systems, external distribution enclosure",
        "Системи кабельного менеджменту, зовнішня розподільна шафа",
        "Feeding power from an external distribution enclosure to the EV charging points.",
        "Живлення зарядних станцій електромобілів від зовнішньої розподільної шафи.",
      ),
      hotspot(
        "parking-led-systems",
        "led-systems",
        52,
        15,
        "LED Systems, external area lighting",
        "Системи освітлення LED, зовнішнє освітлення території",
        "Providing general area lighting across the car park.",
        "Забезпечення загального освітлення території паркінгу.",
      ),
    ],
  },
] as const satisfies readonly Zone<HealthcareZoneId>[];

// ---------------------------------------------------------------------------
// Overview — altı bölgeye geçiş için tıklanabilir bölge hotspot'ları.
// ---------------------------------------------------------------------------

function overviewHotspot(
  id: string,
  zoneId: HealthcareZoneId,
  x: number,
  y: number,
  labelUk: string,
  labelUa: string,
): OverviewHotspot<HealthcareZoneId> {
  return {
    id,
    zoneId,
    x,
    y,
    accessibleLabel: { uk: labelUk, ua: labelUa },
  };
}

const OVERVIEW = {
  image: `${IMAGE_BASE}/overview/healthcare-application-map-overview.webp`,
  imageAlt: {
    uk: "Conceptual cutaway view of a hospital building showing electrical, surgical, diagnostic, ward and external service areas",
    ua: "Концептуальний розріз лікарняної будівлі з електротехнічними, хірургічними, діагностичними, палатними та зовнішніми зонами",
  },
  hotspots: [
    overviewHotspot(
      "overview-main-electrical-room",
      "main-electrical-room",
      42,
      70,
      "Main Electrical Room",
      "Головне електротехнічне приміщення",
    ),
    overviewHotspot(
      "overview-operating-theatre",
      "operating-theatre",
      45,
      47,
      "Operating Theatre",
      "Операційна зала",
    ),
    overviewHotspot(
      "overview-medical-equipment-room",
      "medical-equipment-room",
      68,
      48,
      "Medical Imaging Room",
      "Кабінет медичної візуалізації",
    ),
    overviewHotspot(
      "overview-patient-ward",
      "patient-ward",
      32,
      26,
      "Patient Ward",
      "Палата пацієнтів",
    ),
    overviewHotspot(
      "overview-rooftop-plant",
      "rooftop-plant",
      55,
      10,
      "Rooftop Plant",
      "Дахове технічне обладнання",
    ),
    overviewHotspot(
      "overview-ambulance-bay-external-services",
      "ambulance-bay-external-services",
      15,
      75,
      "Ambulance Bay & External Services",
      "Зона швидкої допомоги та зовнішні мережі",
    ),
    overviewHotspot(
      "overview-underfloor-services",
      "underfloor-services",
      83,
      78,
      "Cable Service Corridor",
      "Технічний кабельний коридор",
    ),
    overviewHotspot(
      "overview-parking-ev-external-lighting",
      "parking-ev-external-lighting",
      15,
      90,
      "Parking, EV & External Lighting",
      "Паркінг, зарядка та зовнішнє освітлення",
    ),
  ],
} as const;

export const HEALTHCARE_APPLICATION_MAP = {
  overview: OVERVIEW,
  zones: ZONES,
  productFamilies: PRODUCT_FAMILIES,
} as const satisfies ApplicationMap<HealthcareZoneId>;

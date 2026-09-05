import { publicMediaUrl } from "@/modules/storage/asset-url";

import { PRODUCT_FAMILY_NUMBERS } from "./types";

import type {
  DataCentreApplicationMap,
  Hotspot,
  OverviewHotspot,
  ProductFamily,
  Zone,
} from "./types";

const IMAGE_BASE = publicMediaUrl("application-map/data-centre");

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
            label: "Data Centre Cable Management",
            href: "/products/cable-support-systems/data-centre-cable-management",
            type: "page",
          },
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
            label: "Кабеленесучі системи для ЦОД",
            href: "/products/cable-support-systems/data-centre-cable-management",
            type: "page",
          },
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
        image: publicMediaUrl("products/busbar/gs/card/gs-main-transparent-product.webp"),
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

// Bölge sahnelerindeki busbar hotspot'ları için gerçek ürün serisi CTA
// override'ı — panel başlığı her zaman "Busbar Systems" ailesi adında
// kalır (bkz. types.ts Hotspot.nameOverride notu), yalnız CTA hedefi o
// bölgede gerçekten kullanılan seriye göre değişir. Buton sırası sabit:
// önce "View Relevant Busbar Series" (o seriye), sonra "Explore Busbar
// Systems" (genel kategori), en altta "Request Quote".
function busbarSeriesActions(slug: string) {
  return {
    uk: [
      {
        label: "View Relevant Busbar Series",
        href: `/products/busbar/${slug}`,
        type: "page" as const,
      },
      {
        label: "Explore Busbar Systems",
        href: "/products/busbar",
        type: "page" as const,
      },
      {
        label: "Data Centre Busbar Systems",
        href: "/products/busbar/data-centre-busbar",
        type: "page" as const,
      },
      {
        label: "Request Quote",
        href: "/uk-support?request=quote&product=busbar",
        type: "request" as const,
      },
    ],
    ua: [
      {
        label: "Переглянути відповідну серію шинопроводу",
        href: `/products/busbar/${slug}`,
        type: "page" as const,
      },
      {
        label: "Переглянути шинопровідні системи",
        href: "/products/busbar",
        type: "page" as const,
      },
      {
        label: "Шинопроводи для ЦОД",
        href: "/products/busbar/data-centre-busbar",
        type: "page" as const,
      },
      {
        label: "Запросити комерційну пропозицію",
        href: "/uk-support?request=quote&product=busbar",
        type: "request" as const,
      },
    ],
  };
}

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
    image: `${IMAGE_BASE}/zones/data-centre-main-electrical-ups-room.webp`,
    imageAlt: {
      uk: "Main electrical / UPS room with overhead busbar trunking, cable ladder and a copper earthing bar",
      ua: "Головне електротехнічне приміщення / приміщення ДБЖ з надземним шинопроводом, кабельним лотком та мідною шиною заземлення",
    },
    content: {
      uk: { name: "Main Electrical / UPS Room" },
      ua: { name: "Головне електротехнічне приміщення / ДБЖ" },
    },
    approvedProductFamilyIds: ["busbar", "cable-management", "led-systems", "earthing-lightning"],
    hotspots: [
      {
        ...hotspot(
          "main-electrical-room-busbar",
          "busbar",
          75,
          20,
          "Busbar Systems, overhead distribution run",
          "Шинопровідні системи, надземна розподільна траса",
          "Distributing incoming power from switchgear to downstream distribution and UPS equipment within the main electrical room.",
          "Розподіл вхідного живлення від розподільних пристроїв до підключеного обладнання та ДБЖ у межах головного електротехнічного приміщення.",
        ),
        // Bu bölgede kullanılan gerçek seri: GGD Medium Power.
        imageOverride: publicMediaUrl("products/busbar/ggd/card/ggd-main-transparent-product.webp"),
        imageAltOverride: {
          uk: "GGD medium power busbar system cutaway view",
          ua: "Розрізний вигляд шинопровідної системи GGD",
        },
        applicationPointsOverride: {
          uk: [
            "GGD Medium Power busbar trunking (160 A–1000 A) carries power from the main switchgear to the UPS and downstream distribution boards.",
            "One-bolt monoblock joints along the run give fast, reliable tap-off connections without additional cabling.",
          ],
          ua: [
            "Шинопровід GGD Medium Power (160–1000 А) передає живлення від головних розподільних пристроїв до ДБЖ та підключених розподільних щитів.",
            "Монобло́чні з'єднання на один болт уздовж траси забезпечують швидкі й надійні відгалуження без додаткового кабелю.",
          ],
        },
        benefitsOverride: {
          uk: [
            "Compact, high-current distribution in aluminium (GGD-A) or copper (GGD-C) conductor variants",
            "Flexible tap-off points sized to the room's switchgear and UPS layout",
            "Faster to install and reconfigure than an equivalent cable run",
          ],
          ua: [
            "Компактний розподіл потужного струму в алюмінієвому (GGD-A) або мідному (GGD-C) виконанні",
            "Гнучкі точки підключення під конкретне розташування розподільних пристроїв і ДБЖ",
            "Швидший монтаж і зміна конфігурації порівняно з еквівалентним кабелем",
          ],
        },
        actionsOverride: busbarSeriesActions("ggd-medium-power-busbar"),
      },
      hotspot(
        "main-electrical-room-cable-management",
        "cable-management",
        30,
        16,
        "Cable Management Systems, overhead route",
        "Системи кабельного менеджменту, надземна траса",
        "Routing power and control cabling overhead between switchgear, UPS equipment and adjoining rooms.",
        "Прокладання силових та керуючих кабелів над рівнем підлоги між розподільними пристроями, ДБЖ та суміжними приміщеннями.",
      ),
      hotspot(
        "main-electrical-room-led-systems",
        "led-systems",
        68,
        8,
        "LED Systems, room lighting",
        "Системи освітлення LED, освітлення приміщення",
        "Providing general lighting along the main electrical / UPS room access aisle.",
        "Забезпечення загального освітлення вздовж проходу головного електротехнічного приміщення / приміщення ДБЖ.",
      ),
      hotspot(
        "main-electrical-room-earthing",
        "earthing-lightning",
        90,
        72,
        "Earthing & Lightning Protection, equipment bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів обладнання",
        "Bonding switchgear, UPS and distribution equipment to the facility's earthing system.",
        "Вирівнювання потенціалів розподільних пристроїв, ДБЖ та обладнання із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "server-hall",
    number: 2,
    image: `${IMAGE_BASE}/zones/data-centre-data-hall-overhead-power-distribution.webp`,
    imageAlt: {
      uk: "Data hall with server rack rows, overhead busbar trunking and wire-mesh cable tray",
      ua: "Серверна зала з рядами стійок, надземним шинопроводом та дротяним кабельним лотком",
    },
    content: {
      uk: { name: "Data Hall" },
      ua: { name: "Серверна зала" },
    },
    approvedProductFamilyIds: ["busbar", "cable-management", "led-systems", "earthing-lightning"],
    hotspots: [
      {
        ...hotspot(
          "server-hall-busbar",
          "busbar",
          42,
          11,
          "Busbar Systems, overhead distribution run",
          "Шинопровідні системи, надземна розподільна траса",
          "Distributing power along the rack rows via overhead busbar trunking with rack-level tap-off points.",
          "Розподіл живлення вздовж рядів стійок через надземний шинопровід з відгалуженнями на рівні стійок.",
        ),
        // Bu bölgede kullanılan gerçek seri: GGD Medium Power (ana güç
        // hattı). Konum: kırmızı tap-off kutuları arasında, kanalın kendi
        // gövdesi üzerinde — boş tavan alanında değil.
        imageOverride: publicMediaUrl("products/busbar/ggd/card/ggd-main-transparent-product.webp"),
        imageAltOverride: {
          uk: "GGD medium power busbar system cutaway view",
          ua: "Розрізний вигляд шинопровідної системи GGD",
        },
        applicationPointsOverride: {
          uk: [
            "GGD Medium Power busbar trunking runs the length of the rack rows, with a tap-off point above each rack position.",
            "One-bolt monoblock joints keep the run serviceable as racks are added or moved.",
          ],
          ua: [
            "Шинопровід GGD Medium Power прокладено вздовж рядів стійок з точкою підключення над кожною позицією стійки.",
            "Монобло́чні з'єднання на один болт зберігають трасу зручною для обслуговування при додаванні чи переміщенні стійок.",
          ],
        },
        benefitsOverride: {
          uk: [
            "High-current power distribution along the full rack row from a single busbar run",
            "Tap-off points positioned at rack level, no branch cabling back to a distribution board",
            "Supports rack additions and layout changes without re-cabling the row",
          ],
          ua: [
            "Розподіл потужного струму вздовж усього ряду стійок з однієї шинопровідної траси",
            "Точки підключення на рівні стійок без потреби у зворотному кабелі до щита",
            "Підтримка додавання стійок і зміни розкладки без перекладання кабелю ряду",
          ],
        },
        actionsOverride: busbarSeriesActions("ggd-medium-power-busbar"),
      },
      {
        ...hotspot(
          "server-hall-busbar-led",
          "busbar",
          90,
          14,
          "Busbar Systems, lighting busbar line",
          "Шинопровідні системи, лінія освітлювального шинопроводу",
          "Feeding the aisle LED luminaire line from a separate lighting busbar run, distinct from the main power busbar overhead.",
          "Живлення лінії LED-світильників проходу від окремого освітлювального шинопроводу, відмінного від основного силового шинопроводу над головою.",
        ),
        // İkinci "2" numaralı hotspot — aynı bölgede AYNI aile (busbar)
        // içinde farklı somut ürün: ana güç hattı (yukarıdaki hotspot) GGD
        // Medium Power, bu ise aydınlatma hattını besleyen GNL Lighting
        // Busbar (LEDBUS). nameOverride bilinçli olarak verildi — aynı
        // bölgede iki "Busbar Systems" girişini seçim listesinde (ve panel
        // başlığında) ayırt edebilmek için (bkz. ApplicationProductChooser).
        nameOverride: {
          uk: "LED Busbar (GNL Lighting Busbar)",
          ua: "LED-шинопровід (GNL Lighting Busbar)",
        },
        imageOverride: publicMediaUrl("products/busbar/gnl/products/gnl-hero-energy-transparent.webp"),
        imageAltOverride: {
          uk: "GNL lighting busbar with blue and orange energy trails",
          ua: "Освітлювальна шинопровідна система GNL із синіми та помаранчевими світловими лініями",
        },
        applicationPointsOverride: {
          uk: [
            "GNL lighting busbar (25 A/40 A) energises the aisle LED luminaire line, separately from the main GGD power run.",
            "3 m aluminium-housing elements with lighting fixture jacks let luminaires plug directly into the run.",
          ],
          ua: [
            "Освітлювальний шинопровід GNL (25/40 А) живить лінію LED-світильників проходу окремо від основної силової траси GGD.",
            "3-метрові елементи в алюмінієвому корпусі з роз'ємами для світильників дозволяють підключати їх безпосередньо до траси.",
          ],
        },
        benefitsOverride: {
          uk: [
            "Slim aluminium trunking feeds the LED line without separate branch cabling to each fixture",
            "Copper conductors with silver-plated contacts for a reliable low-current connection",
            "Kept visually and electrically separate from the main power busbar run",
          ],
          ua: [
            "Тонкий алюмінієвий короб живить лінію LED-світильників без окремого кабелю до кожного з них",
            "Мідні провідники з посрібленими контактами для надійного з'єднання при малому струмі",
            "Візуально та електрично відокремлений від основної силової шинопровідної траси",
          ],
        },
        actionsOverride: busbarSeriesActions("gnl-lighting-busbar"),
      },
      hotspot(
        "server-hall-cable-management",
        "cable-management",
        14,
        24,
        "Cable Management Systems, overhead rack route",
        "Системи кабельного менеджменту, надземна траса над стійками",
        "Routing structured cabling above the server rack rows in wire-mesh cable tray.",
        "Прокладання структурованих кабелів над рядами серверних стійок у дротяному кабельному лотку.",
      ),
      hotspot(
        "server-hall-led-systems",
        "led-systems",
        78,
        10,
        "LED Systems, aisle lighting",
        "Системи освітлення LED, освітлення проходу",
        "Providing general lighting along the data hall access aisle.",
        "Забезпечення загального освітлення вздовж проходу серверної зали.",
      ),
      hotspot(
        "server-hall-earthing",
        "earthing-lightning",
        5,
        85,
        "Earthing & Lightning Protection, rack bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів стійок",
        "Bonding server racks and cabinets to the facility's earthing system.",
        "Вирівнювання потенціалів серверних стійок і шаф із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "electrical-riser-floor-distribution",
    number: 3,
    image: `${IMAGE_BASE}/zones/data-centre-electrical-riser-floor-distribution.webp`,
    imageAlt: {
      uk: "Multi-level electrical riser with a vertical busbar trunking run, cable ladder and floor-by-floor earthing connections",
      ua: "Багатоповерховий електротехнічний стояк з вертикальним шинопроводом, кабельним лотком та точками заземлення на кожному поверсі",
    },
    content: {
      uk: { name: "Electrical Riser / Floor Distribution" },
      ua: { name: "Електротехнічний стояк / розподіл по поверхах" },
    },
    // Bu bölge eskiden fallı taban (raised floor) boşluğuna karşılık
    // geliyordu; yeni fotoğraf dikey bir busbar riser hattını gösteriyor,
    // bu yüzden "underfloor" ailesi yerine görsel olarak doğrulanmış
    // busbar/kablo yönetimi/topraklama aileleri onaylandı.
    approvedProductFamilyIds: ["busbar", "cable-management", "earthing-lightning"],
    hotspots: [
      {
        ...hotspot(
          "electrical-riser-busbar",
          "busbar",
          49,
          46,
          "Busbar Systems, vertical riser run",
          "Шинопровідні системи, вертикальний стояк",
          "Distributing power vertically between floors via a busbar riser with a tap-off point at each level.",
          "Вертикальний розподіл живлення між поверхами через шинопровідний стояк з відгалуженням на кожному рівні.",
        ),
        // Bu bölgede kullanılan gerçek seri: GGD Medium Power.
        imageOverride: publicMediaUrl("products/busbar/ggd/card/ggd-main-transparent-product.webp"),
        imageAltOverride: {
          uk: "GGD medium power busbar system cutaway view",
          ua: "Розрізний вигляд шинопровідної системи GGD",
        },
        applicationPointsOverride: {
          uk: [
            "GGD Medium Power busbar riser distributes power vertically between floors, with a tap-off point at each level.",
            "One-bolt monoblock joints at each floor junction keep the riser serviceable without shutting down other levels.",
          ],
          ua: [
            "Шинопровідний стояк GGD Medium Power розподіляє живлення вертикально між поверхами з точкою підключення на кожному рівні.",
            "Монобло́чні з'єднання на один болт у кожному місці стику поверху дозволяють обслуговувати стояк без відключення інших поверхів.",
          ],
        },
        benefitsOverride: {
          uk: [
            "Single vertical busbar run replaces multiple floor-by-floor cable risers",
            "Tap-off point at every level for local distribution boards",
            "Aluminium or copper conductor variants rated up to 1000 A",
          ],
          ua: [
            "Одна вертикальна шинопровідна траса замінює кілька поверхових кабельних стояків",
            "Точка підключення на кожному поверсі для локальних розподільних щитів",
            "Алюмінієве або мідне виконання на струм до 1000 А",
          ],
        },
        actionsOverride: busbarSeriesActions("ggd-medium-power-busbar"),
      },
      hotspot(
        "electrical-riser-cable-management",
        "cable-management",
        41,
        28,
        "Cable Management Systems, riser cable ladder",
        "Системи кабельного менеджменту, кабельний лоток стояка",
        "Routing power and data cabling alongside the busbar riser between floors.",
        "Прокладання силових та інформаційних кабелів поруч із шинопровідним стояком між поверхами.",
      ),
      hotspot(
        "electrical-riser-earthing",
        "earthing-lightning",
        33,
        48,
        "Earthing & Lightning Protection, floor-by-floor bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів на кожному поверсі",
        "Bonding the busbar riser and cable containment to the facility's earthing system at each floor level.",
        "Вирівнювання потенціалів шинопровідного стояка та кабельних трас із системою заземлення об'єкта на кожному поверсі.",
      ),
    ],
  },
  {
    id: "generator-resilient-power-hall",
    number: 4,
    image: `${IMAGE_BASE}/zones/data-centre-generator-resilient-power-hall.webp`,
    imageAlt: {
      uk: "Generator hall with standby generators, distribution switchgear, overhead busbar trunking and a copper earthing bar",
      ua: "Зала генераторів з резервними генераторами, розподільними щитами, надземним шинопроводом та мідною шиною заземлення",
    },
    content: {
      uk: { name: "Generator / Resilient Power Hall" },
      ua: { name: "Зала генераторів / резервного живлення" },
    },
    approvedProductFamilyIds: ["busbar", "cable-management", "led-systems", "earthing-lightning"],
    hotspots: [
      {
        ...hotspot(
          "generator-hall-busbar",
          "busbar",
          78,
          20,
          "Busbar Systems, overhead distribution run",
          "Шинопровідні системи, надземна розподільна траса",
          "Distributing generator and switchgear output along the plant room wall to downstream distribution panels.",
          "Розподіл живлення від генераторів та розподільних пристроїв вздовж стіни технічного приміщення до підключених щитів.",
        ),
        // Bu bölgede kullanılan gerçek seri: GGD Medium Power.
        imageOverride: publicMediaUrl("products/busbar/ggd/card/ggd-main-transparent-product.webp"),
        imageAltOverride: {
          uk: "GGD medium power busbar system cutaway view",
          ua: "Розрізний вигляд шинопровідної системи GGD",
        },
        applicationPointsOverride: {
          uk: [
            "GGD Medium Power busbar carries generator output from the ATS/switchgear to the main distribution boards.",
            "One-bolt monoblock joints give a structured, inspectable connection path across the generator hall.",
          ],
          ua: [
            "Шинопровід GGD Medium Power передає вихідну потужність генераторів від АВР/розподільних пристроїв до головних розподільних щитів.",
            "Монобло́чні з'єднання на один болт утворюють структуровану, придатну для огляду трасу через залу генераторів.",
          ],
        },
        benefitsOverride: {
          uk: [
            "High-current path between generator switchgear, ATS and main distribution",
            "Aluminium or copper conductor variants rated up to 1000 A",
            "Tap-off points sized to the hall's distribution panel layout",
          ],
          ua: [
            "Траса потужного струму між розподільними пристроями генераторів, АВР і головним розподілом",
            "Алюмінієве або мідне виконання на струм до 1000 А",
            "Точки підключення під розташування розподільних щитів зали",
          ],
        },
        actionsOverride: busbarSeriesActions("ggd-medium-power-busbar"),
      },
      hotspot(
        "generator-hall-cable-management",
        "cable-management",
        35,
        12,
        "Cable Management Systems, overhead plant route",
        "Системи кабельного менеджменту, надземна траса над обладнанням",
        "Routing control and power cabling overhead between generators, switchgear and distribution panels.",
        "Прокладання керуючих та силових кабелів над обладнанням між генераторами, розподільними пристроями та щитами.",
      ),
      hotspot(
        "generator-hall-led-systems",
        "led-systems",
        72,
        7,
        "LED Systems, plant hall lighting",
        "Системи освітлення LED, освітлення зали",
        "Providing general lighting within the generator and resilient power hall.",
        "Забезпечення загального освітлення в залі генераторів та резервного живлення.",
      ),
      hotspot(
        "generator-hall-earthing",
        "earthing-lightning",
        92,
        78,
        "Earthing & Lightning Protection, equipment bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів обладнання",
        "Bonding generators, switchgear and distribution panels to the facility's earthing system.",
        "Вирівнювання потенціалів генераторів, розподільних пристроїв та щитів із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "cooling-plant-pump-room",
    number: 5,
    image: `${IMAGE_BASE}/zones/data-centre-cooling-plant-pump-room.webp`,
    imageAlt: {
      uk: "Cooling plant and pump room with chillers, circulation pumps, busbar trunking and a copper earthing bar",
      ua: "Холодильний центр та насосна з чилерами, циркуляційними насосами, шинопроводом та мідною шиною заземлення",
    },
    content: {
      uk: { name: "Cooling Plant / Pump Room" },
      ua: { name: "Холодильний центр / насосна" },
    },
    approvedProductFamilyIds: ["busbar", "cable-management", "led-systems", "earthing-lightning"],
    hotspots: [
      {
        ...hotspot(
          "cooling-plant-busbar",
          "busbar",
          44,
          15,
          "Busbar Systems, overhead distribution run",
          "Шинопровідні системи, надземна розподільна траса",
          "Distributing power from the control panel to chillers and circulation pumps via overhead busbar trunking.",
          "Розподіл живлення від щита керування до чилерів і циркуляційних насосів через надземний шинопровід.",
        ),
        // Bu bölgede kullanılan gerçek seri: GR Cast Resin.
        imageOverride: publicMediaUrl("products/busbar/gr/card/gr-main-transparent-product.webp"),
        imageAltOverride: {
          uk: "GR Cast Resin busbar system main product view",
          ua: "Шинопровідна система GR Cast Resin — вигляд основного продукту",
        },
        applicationPointsOverride: {
          uk: [
            "GR Cast Resin busbar trunking (500 A–6300 A) carries high-power distribution between the control panel and the chiller and pump motors.",
            "Fully resin-insulated, IP68 construction suited to the humid, wash-down conditions of a cooling plant room.",
          ],
          ua: [
            "Шинопровід GR Cast Resin (500–6300 А) забезпечує розподіл потужного струму між щитом керування та двигунами чилерів і насосів.",
            "Повністю залита смолою конструкція IP68, розрахована на вологі умови мийки в насосній/холодильному центрі.",
          ],
        },
        benefitsOverride: {
          uk: [
            "IP68-rated, fully resin-insulated conductors resist moisture and corrosion",
            "Aluminium (GR-A) or copper (GR-C) conductor variants up to 6300 A",
            "Welded-free elbow accessories and a bolt-on joint for a serviceable run",
          ],
          ua: [
            "Повністю залиті смолою провідники класу IP68 стійкі до вологи та корозії",
            "Алюмінієве (GR-A) або мідне (GR-C) виконання на струм до 6300 А",
            "Беззварювальні кутові елементи та болтове з'єднання для зручного обслуговування",
          ],
        },
        actionsOverride: busbarSeriesActions("gr-cast-resin"),
      },
      hotspot(
        "cooling-plant-cable-management",
        "cable-management",
        82,
        10,
        "Cable Management Systems, overhead plant route",
        "Системи кабельного менеджменту, надземна траса над обладнанням",
        "Routing control and power cabling above the chillers and pump sets.",
        "Прокладання керуючих та силових кабелів над чилерами та насосними агрегатами.",
      ),
      hotspot(
        "cooling-plant-led-systems",
        "led-systems",
        68,
        13,
        "LED Systems, plant room lighting",
        "Системи освітлення LED, освітлення технічного приміщення",
        "Providing general lighting within the cooling plant and pump room.",
        "Забезпечення загального освітлення в холодильному центрі та насосній.",
      ),
      hotspot(
        "cooling-plant-earthing",
        "earthing-lightning",
        8,
        82,
        "Earthing & Lightning Protection, equipment bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів обладнання",
        "Bonding the control panel, chillers and pumps to the facility's earthing system.",
        "Вирівнювання потенціалів щита керування, чилерів та насосів із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "noc-control-room",
    number: 6,
    image: `${IMAGE_BASE}/zones/data-centre-noc-control-room.webp`,
    imageAlt: {
      uk: "NOC control room with a monitoring wall, overhead cable tray, a raised floor void with underfloor trunking and a copper earthing bar",
      ua: "Диспетчерська (NOC) з моніторинговою стіною, надземним кабельним лотком, простором під фальшпідлогою з коробами та мідною шиною заземлення",
    },
    content: {
      uk: { name: "NOC / Control Room" },
      ua: { name: "Диспетчерська (NOC)" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "underfloor",
      "led-systems",
      "earthing-lightning",
    ],
    hotspots: [
      hotspot(
        "noc-control-room-cable-management",
        "cable-management",
        30,
        5,
        "Cable Management Systems, overhead route",
        "Системи кабельного менеджменту, надземна траса",
        "Routing structured and power cabling overhead above the monitoring desks and server rack.",
        "Прокладання структурованих та силових кабелів над робочими місцями операторів і серверною шафою.",
      ),
      {
        ...hotspot(
          "noc-control-room-busbar",
          "busbar",
          42,
          22,
          "Busbar Systems, lighting distribution line",
          "Шинопровідні системи, лінія освітлювального живлення",
          "Feeding the LED luminaire line and floor-supply points from a slim lighting busbar run above the workstations.",
          "Живлення лінії LED-світильників та точок підключення під підлогою від тонкого освітлювального шинопроводу над робочими місцями.",
        ),
        // Bu bölgede kullanılan gerçek seri: GNL Lighting Busbar (LEDBUS).
        imageOverride: publicMediaUrl("products/busbar/gnl/products/gnl-hero-energy-transparent.webp"),
        imageAltOverride: {
          uk: "GNL lighting busbar with blue and orange energy trails",
          ua: "Освітлювальна шинопровідна система GNL із синіми та помаранчевими світловими лініями",
        },
        applicationPointsOverride: {
          uk: [
            "GNL lighting busbar (25 A/40 A) energises the LED luminaire line and raised-floor supply points across the control room.",
            "3 m aluminium-housing elements with lighting fixture jacks let luminaires plug directly into the run.",
          ],
          ua: [
            "Освітлювальний шинопровід GNL (25/40 А) живить лінію LED-світильників та точки підключення під фальшпідлогою в диспетчерській.",
            "3-метрові елементи в алюмінієвому корпусі з роз'ємами для світильників дозволяють підключати їх безпосередньо до траси.",
          ],
        },
        benefitsOverride: {
          uk: [
            "Slim aluminium trunking feeds the LED line without separate branch cabling to each fixture",
            "Copper conductors with silver-plated contacts for a reliable low-current connection",
            "Compact enough to run alongside overhead cable tray in a technical office space",
          ],
          ua: [
            "Тонкий алюмінієвий короб живить лінію LED-світильників без окремого кабелю до кожного з них",
            "Мідні провідники з посрібленими контактами для надійного з'єднання при малому струмі",
            "Достатньо компактний, щоб прокладатися поруч із надземним кабельним лотком у технічному приміщенні",
          ],
        },
        actionsOverride: busbarSeriesActions("gnl-lighting-busbar"),
      },
      hotspot(
        "noc-control-room-led-systems",
        "led-systems",
        68,
        19,
        "LED Systems, control room lighting",
        "Системи освітлення LED, освітлення диспетчерської",
        "Providing general lighting across the NOC control room from the same lighting busbar-fed luminaire line.",
        "Забезпечення загального освітлення в диспетчерській (NOC) від тієї ж лінії світильників, підключеної до освітлювального шинопроводу.",
      ),
      hotspot(
        "noc-control-room-underfloor",
        "underfloor",
        60,
        86,
        "Underfloor Cable Trunking, raised floor route",
        "Підпідлогові кабельні короби, траса під фальшпідлогою",
        "Routing power and data cabling beneath the raised access floor to the server rack and workstations.",
        "Прокладання силових та інформаційних кабелів під фальшпідлогою до серверної шафи та робочих місць.",
      ),
      hotspot(
        "noc-control-room-earthing",
        "earthing-lightning",
        92,
        56,
        "Earthing & Lightning Protection, rack bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів шафи",
        "Bonding the server rack and distribution panel to the facility's earthing system.",
        "Вирівнювання потенціалів серверної шафи та розподільної панелі із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "external-utility-area",
    number: 7,
    image: `${IMAGE_BASE}/zones/data-centre-utility-intake-transformer-interface.webp`,
    imageAlt: {
      uk: "Utility intake area with an outdoor transformer, an overhead busbar bridge and a copper earthing bar at the building interface",
      ua: "Зона вводу живлення із зовнішнім трансформатором, надземним шинопровідним містком та мідною шиною заземлення на вводі в будівлю",
    },
    content: {
      uk: { name: "Utility Intake & Transformer Interface" },
      ua: { name: "Вузол вводу живлення та трансформаторний інтерфейс" },
    },
    approvedProductFamilyIds: ["busbar", "cable-management", "earthing-lightning"],
    hotspots: [
      {
        ...hotspot(
          "external-utility-busbar",
          "busbar",
          58,
          12,
          "Busbar Systems, overhead intake run",
          "Шинопровідні системи, надземна траса вводу",
          "Carrying power from the outdoor transformer to the building's incoming switchgear via an overhead busbar bridge.",
          "Передача живлення від зовнішнього трансформатора до вхідних розподільних пристроїв будівлі через надземний шинопровідний місток.",
        ),
        // Bu bölgede kullanılan gerçek seri: GS Super Compact.
        imageOverride: publicMediaUrl("products/busbar/gs/card/gs-main-transparent-product.webp"),
        imageAltOverride: {
          uk: "GS Super Compact busbar system main product view",
          ua: "Шинопровідна система GS Super Compact — вигляд основного продукту",
        },
        applicationPointsOverride: {
          uk: [
            "GS Super Compact busbar (400 A–6300 A) carries the short, high-current connection from the outdoor transformer to the building's incoming switchgear.",
            "IP68-rated construction suited to an outdoor transformer bridge.",
          ],
          ua: [
            "Шинопровід GS Super Compact (400–6300 А) забезпечує коротке високострумове з'єднання від зовнішнього трансформатора до вхідних розподільних пристроїв будівлі.",
            "Виконання класу IP68, розраховане на зовнішній трансформаторний місток.",
          ],
        },
        benefitsOverride: {
          uk: [
            "High-current transformer-to-switchboard connection in a compact footprint",
            "Aluminium (GSA) or copper (GSC) conductor variants up to 6300 A",
            "Bolt-on and plug-in joint options for a dedicated transformer connection",
          ],
          ua: [
            "Високострумове з'єднання трансформатор-щит у компактному виконанні",
            "Алюмінієве (GSA) або мідне (GSC) виконання на струм до 6300 А",
            "Болтові та роз'ємні варіанти з'єднання для трансформаторного підключення",
          ],
        },
        actionsOverride: busbarSeriesActions("gs-super-compact"),
      },
      hotspot(
        "external-utility-cable-management",
        "cable-management",
        64,
        28,
        "Cable Management Systems, building entry route",
        "Системи кабельного менеджменту, траса вводу в будівлю",
        "Routing control and power cabling from the transformer bridge into the building.",
        "Прокладання керуючих та силових кабелів від містка трансформатора всередину будівлі.",
      ),
      hotspot(
        "external-utility-earthing",
        "earthing-lightning",
        88,
        60,
        "Earthing & Lightning Protection, intake bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів на вводі",
        "Bonding the transformer and incoming switchgear to the facility's earthing system.",
        "Вирівнювання потенціалів трансформатора та вхідних розподільних пристроїв із системою заземлення об'єкта.",
      ),
    ],
  },
  {
    id: "parking-ev-services",
    number: 8,
    image: `${IMAGE_BASE}/zones/data-centre-external-infrastructure-ev-charging.webp`,
    imageAlt: {
      uk: "Parking area with EV charging points under a canopy, overhead cable containment and a copper earthing bar at the distribution panel",
      ua: "Паркінг із зарядними станціями для електромобілів під навісом, надземним кабельним лотком та мідною шиною заземлення біля розподільної шафи",
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
        75,
        56,
        "EV Charging Systems, charge point row",
        "Системи зарядки електромобілів, ряд зарядних станцій",
        "Providing power distribution to EV charging points beneath the parking canopy.",
        "Розподіл живлення до зарядних станцій електромобілів під навісом паркінгу.",
      ),
      hotspot(
        "parking-cable-management",
        "cable-management",
        38,
        35,
        "Cable Management Systems, external panel route",
        "Системи кабельного менеджменту, траса до зовнішньої шафи",
        "Routing power cabling from the distribution panel to the EV charging points and canopy.",
        "Прокладання силових кабелів від розподільної шафи до зарядних станцій та навісу.",
      ),
      hotspot(
        "parking-led-systems",
        "led-systems",
        70,
        29,
        "LED Systems, canopy lighting",
        "Системи освітлення LED, освітлення навісу",
        "Providing area lighting across the parking and EV charging canopy.",
        "Забезпечення освітлення території паркінгу та навісу зарядних станцій.",
      ),
      hotspot(
        "parking-earthing",
        "earthing-lightning",
        12,
        68,
        "Earthing & Lightning Protection, panel bonding",
        "Заземлення та блискавкозахист, вирівнювання потенціалів шафи",
        "Bonding the external distribution panel and EV charging equipment to the facility's earthing system.",
        "Вирівнювання потенціалів зовнішньої розподільної шафи та обладнання зарядних станцій із системою заземлення об'єкта.",
      ),
    ],
  },
] as const satisfies readonly Zone[];

// ---------------------------------------------------------------------------
// Overview — sekiz bölgeye geçiş için tıklanabilir bölge hotspot'ları.
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
    uk: "Aerial night view of a Data Centre campus showing the substation, main building, generator hall and EV charging area",
    ua: "Нічний вигляд з висоти на кампус центру обробки даних із підстанцією, головною будівлею, залою генераторів та зоною зарядки електромобілів",
  },
  hotspots: [
    overviewHotspot(
      "overview-main-electrical-room",
      "main-electrical-room",
      55,
      40,
      "Main Electrical / UPS Room",
      "Головне електротехнічне приміщення / ДБЖ",
    ),
    overviewHotspot(
      "overview-server-hall",
      "server-hall",
      72,
      26,
      "Data Hall",
      "Серверна зала",
    ),
    overviewHotspot(
      "overview-electrical-riser-floor-distribution",
      "electrical-riser-floor-distribution",
      64,
      33,
      "Electrical Riser / Floor Distribution",
      "Електротехнічний стояк / розподіл по поверхах",
    ),
    overviewHotspot(
      "overview-generator-resilient-power-hall",
      "generator-resilient-power-hall",
      72,
      55,
      "Generator / Resilient Power Hall",
      "Зала генераторів / резервного живлення",
    ),
    overviewHotspot(
      "overview-cooling-plant-pump-room",
      "cooling-plant-pump-room",
      85,
      32,
      "Cooling Plant / Pump Room",
      "Холодильний центр / насосна",
    ),
    overviewHotspot(
      "overview-noc-control-room",
      "noc-control-room",
      73,
      45,
      "NOC / Control Room",
      "Диспетчерська (NOC)",
    ),
    overviewHotspot(
      "overview-external-utility-area",
      "external-utility-area",
      31,
      54,
      "Utility Intake & Transformer Interface",
      "Вузол вводу живлення та трансформаторний інтерфейс",
    ),
    overviewHotspot(
      "overview-parking-ev-services",
      "parking-ev-services",
      71,
      // Alt galeri şeridinin kapladığı alanla çakışmaması için 70'te tutulur.
      70,
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

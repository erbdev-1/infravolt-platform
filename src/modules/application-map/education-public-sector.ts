import { publicMediaUrl } from "@/modules/storage/asset-url";
import { PRODUCT_FAMILY_NUMBERS } from "./types";

import type {
  ApplicationMap,
  Hotspot,
  OverviewHotspot,
  ProductFamily,
  Zone,
} from "./types";

const IMAGE_BASE = publicMediaUrl("application-map/education-public-sector");

// ---------------------------------------------------------------------------
// Education & Public Sector bölge kimlikleri — Data Centre'den bağımsız,
// kendi sektörüne özgü sabit bir küme. types.ts'teki genel
// Zone<TZoneId>/Overview<TZoneId> modeli bu kimliklerle somutlaştırılır.
// ---------------------------------------------------------------------------

export const EDUCATION_PUBLIC_SECTOR_ZONE_IDS = [
  "main-electrical-room",
  "classroom",
  "laboratory",
  "library",
  "sports-hall",
  "rooftop-plant",
  "ev-charging-area",
  "campus-street-lighting",
] as const;

export type EducationPublicSectorZoneId =
  (typeof EDUCATION_PUBLIC_SECTOR_ZONE_IDS)[number];

// ---------------------------------------------------------------------------
// Ürün aileleri — InfraVolt'un mevcut altı ürün ailesi, Education & Public
// Sector bağlamına uyarlanmış açıklamalarla. Aksiyon linkleri ürün bazlıdır
// (sektörden bağımsız), bu yüzden diğer sektörlerle aynı href yapısını
// kullanır.
// ---------------------------------------------------------------------------

const PRODUCT_FAMILIES = [
  {
    id: "cable-management",
    number: PRODUCT_FAMILY_NUMBERS["cable-management"],
    content: {
      uk: {
        name: "Cable Management Systems",
        applicationPoints: [
          "Routes power and data cabling between classrooms, laboratories and technical plant areas",
          "Supports structured cabling above teaching, library and administrative spaces",
        ],
        benefits: [
          "Organised, serviceable cable routing across campus buildings",
          "Supports structured expansion as classroom and campus technology needs change",
          "Reduces cable clutter in teaching and public-facing areas",
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
          "Прокладання силових та інформаційних кабелів між навчальними класами, лабораторіями та технічними приміщеннями",
          "Підтримка структурованого кабелювання над навчальними, бібліотечними та адміністративними приміщеннями",
        ],
        benefits: [
          "Впорядковане, зручне для обслуговування прокладання кабелів у будівлях кампусу",
          "Підтримка структурованого розширення при зміні навчальних технологій та потреб кампусу",
          "Менше кабельного безладу в навчальних та публічних зонах",
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
          "Distributes power between switchgear, distribution boards and downstream campus equipment",
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
        image: publicMediaUrl("products/busbar/gs/card/gs-main-transparent-product.webp"),
        imageAlt: "Шинопровідна система GS Super Compact — вигляд основного продукту",
        applicationPoints: [
          "Розподіл живлення між розподільними пристроями, щитами та підключеним обладнанням кампусу",
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
          "Routes power and data cabling beneath a raised access floor in classrooms and library spaces",
          "Keeps cable runs organised and accessible for maintenance as room layouts change",
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
          "Прокладання силових та інформаційних кабелів під фальшпідлогою навчальних класів та бібліотечних приміщень",
          "Впорядковані, доступні для обслуговування кабельні траси при зміні планування приміщень",
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
          "Provides equipment and enclosure bonding within technical and plant spaces",
          "Forms part of the building's external earthing and lightning-protection network",
        ],
        benefits: [
          "Supports electrical safety and equipotential bonding",
          "Helps protect campus electrical and IT equipment from lightning-related transients",
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
          "Забезпечує вирівнювання потенціалів обладнання та шаф у технічних та інженерних приміщеннях",
          "Є частиною зовнішньої мережі заземлення та блискавкозахисту будівлі",
        ],
        benefits: [
          "Підтримка електробезпеки та вирівнювання потенціалів",
          "Захист електротехнічного та ІТ-обладнання кампусу від імпульсних перенапруг, пов'язаних з блискавкою",
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
          "Supports lighting distribution across classrooms, halls and library areas",
        ],
        benefits: [
          "Adaptable lighting layout for changing teaching-space use",
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
          "Підтримка розподілу освітлення у навчальних класах, залах та бібліотечних зонах",
        ],
        benefits: [
          "Гнучке компонування освітлення при зміні призначення навчального простору",
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
          "Supports on-site EV charging as part of the wider campus power distribution design",
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
          "Підтримка зарядки електромобілів на території кампусу як частини загальної системи розподілу живлення",
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
    image: `${IMAGE_BASE}/zones/education-main-electrical-room.webp`,
    imageAlt: {
      uk: "Main electrical room with switchgear panels, an overhead busbar trunking run, cable tray and a copper earthing bar",
      ua: "Головне електротехнічне приміщення з розподільними щитами, надземним шинопроводом, кабельним лотком та мідною шиною заземлення",
    },
    content: {
      uk: { name: "Main Electrical Room" },
      ua: { name: "Головне електротехнічне приміщення" },
    },
    approvedProductFamilyIds: ["cable-management", "busbar", "earthing-lightning"],
    hotspots: [
      hotspot(
        "main-electrical-room-cable-management",
        "cable-management",
        80,
        12,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and control cabling above the distribution board line-up.",
        "Прокладання силових та керуючих кабелів над рядом розподільних щитів.",
      ),
      hotspot(
        "main-electrical-room-busbar",
        "busbar",
        30,
        15,
        "Busbar Systems, overhead distribution trunking",
        "Шинопровідні системи, надземний розподільний шинопровід",
        "Distributing power along the switchgear line-up through an overhead busbar trunking run.",
        "Розподіл живлення вздовж ряду розподільних щитів через надземний шинопровід.",
      ),
      hotspot(
        "main-electrical-room-earthing",
        "earthing-lightning",
        82,
        82,
        "Earthing & Lightning Protection, main bonding bar",
        "Заземлення та блискавкозахист, головна шина вирівнювання потенціалів",
        "Providing the main equipotential bonding point for switchgear and distribution equipment in this room.",
        "Забезпечення головної точки вирівнювання потенціалів для розподільних пристроїв у цьому приміщенні.",
      ),
    ],
  },
  {
    id: "classroom",
    number: 2,
    // Tavandaki delikli ray/traşe üzerinde doğrudan aydınlatma armatürleri
    // asılı — bu, düz bir kablo tepsisinden farklı olarak GL Lighting
    // Busbar (aydınlatma şinopodu) için teknik olarak savunulabilir bir
    // görsel. Bu yüzden Busbar hotspot'u burada GL'ye özel override taşıyor
    // (bkz. underfloor-services-busbar örneği, healthcare.ts).
    image: `${IMAGE_BASE}/zones/education-classroom.webp`,
    imageAlt: {
      uk: "Classroom with an overhead cable tray, a ceiling-mounted lighting track and a raised access floor showing underfloor cable trunking",
      ua: "Навчальний клас з надземним кабельним лотком, стельовою освітлювальною трасою та фальшпідлогою з видимими підпідловими кабельними коробами",
    },
    content: {
      uk: { name: "Classroom" },
      ua: { name: "Навчальний клас" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "busbar",
      "underfloor",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "classroom-cable-management",
        "cable-management",
        13,
        8,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and data cabling from the distribution board into the classroom ceiling void.",
        "Прокладання силових та інформаційних кабелів від розподільного щита до стельового простору класу.",
      ),
      {
        id: "classroom-busbar",
        productFamilyId: "busbar",
        x: 35,
        y: 18,
        accessibleLabel: {
          uk: "Busbar Systems, ceiling lighting track",
          ua: "Шинопровідні системи, стельова освітлювальна траса",
        },
        usedHereFor: {
          uk: "GL Lighting Busbar distributes power along the classroom ceiling and provides organised tap-off connections for luminaires and lighting circuits.",
          ua: "Освітлювальний шинопровід GL розподіляє живлення вздовж стелі навчального класу та забезпечує впорядковані точки підключення для світильників і освітлювальних кіл.",
        },
        imageOverride:
          publicMediaUrl("products/busbar/gl/card/gl-main-product.webp"),
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
      hotspot(
        "classroom-underfloor",
        "underfloor",
        16,
        90,
        "Underfloor Cable Trunking, raised-floor cable tray",
        "Підпідлогові кабельні короби, кабельний лоток під фальшпідлогою",
        "Routing power and data cabling beneath the raised access floor to classroom floor boxes.",
        "Прокладання силових та інформаційних кабелів під фальшпідлогою до напільних розподільних коробок класу.",
      ),
      hotspot(
        "classroom-led-systems",
        "led-systems",
        43,
        6,
        "LED Systems, pendant light fitting",
        "Системи освітлення LED, підвісний світильник",
        "Providing general and task lighting across the classroom.",
        "Забезпечення загального та функціонального освітлення навчального класу.",
      ),
    ],
  },
  {
    id: "laboratory",
    number: 3,
    image: `${IMAGE_BASE}/zones/education-laboratory.webp`,
    imageAlt: {
      uk: "Teaching laboratory with an overhead cable tray, pendant task lighting and a wall-mounted distribution panel",
      ua: "Навчальна лабораторія з надземним кабельним лотком, підвісним функціональним освітленням та настінною розподільною шафою",
    },
    content: {
      uk: { name: "Laboratory" },
      ua: { name: "Лабораторія" },
    },
    approvedProductFamilyIds: [
      "cable-management",
      "earthing-lightning",
      "led-systems",
    ],
    hotspots: [
      hotspot(
        "laboratory-cable-management",
        "cable-management",
        45,
        10,
        "Cable Management Systems, overhead cable tray",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and data cabling above the laboratory benches to service points at each workstation.",
        "Прокладання силових та інформаційних кабелів над лабораторними столами до точок підключення кожного робочого місця.",
      ),
      hotspot(
        "laboratory-led-systems",
        "led-systems",
        22,
        22,
        "LED Systems, pendant task lighting",
        "Системи освітлення LED, підвісне функціональне освітлення",
        "Providing task lighting along the laboratory bench runs.",
        "Забезпечення функціонального освітлення вздовж лабораторних столів.",
      ),
      hotspot(
        "laboratory-earthing",
        "earthing-lightning",
        88,
        78,
        "Earthing & Lightning Protection, bonding terminal",
        "Заземлення та блискавкозахист, клема заземлення",
        "Providing an equipotential bonding point for the distribution panel serving the laboratory.",
        "Забезпечення точки вирівнювання потенціалів для розподільної шафи лабораторії.",
      ),
    ],
  },
  {
    id: "library",
    number: 4,
    image: `${IMAGE_BASE}/zones/education-library.webp`,
    imageAlt: {
      uk: "Library reading area with overhead cable containment, pendant lighting and a raised access floor",
      ua: "Зона читального залу бібліотеки з надземним кабельним лотком, підвісним освітленням та фальшпідлогою",
    },
    content: {
      uk: { name: "Library" },
      ua: { name: "Бібліотека" },
    },
    approvedProductFamilyIds: ["cable-management", "underfloor", "led-systems"],
    hotspots: [
      hotspot(
        "library-cable-management",
        "cable-management",
        63,
        8,
        "Cable Management Systems, overhead cable containment",
        "Системи кабельного менеджменту, надземний кабельний лоток",
        "Routing power and data cabling above the library reading and shelving areas.",
        "Прокладання силових та інформаційних кабелів над зонами читання та книжковими стелажами бібліотеки.",
      ),
      hotspot(
        "library-led-systems",
        "led-systems",
        77,
        13,
        "LED Systems, pendant light fitting",
        "Системи освітлення LED, підвісний світильник",
        "Providing general lighting across the library reading areas.",
        "Забезпечення загального освітлення зон читання бібліотеки.",
      ),
      hotspot(
        "library-underfloor",
        "underfloor",
        16,
        90,
        "Underfloor Cable Trunking, raised-floor cable tray",
        "Підпідлогові кабельні короби, кабельний лоток під фальшпідлогою",
        "Routing power and data cabling beneath the raised access floor to library floor boxes.",
        "Прокладання силових та інформаційних кабелів під фальшпідлогою до напільних розподільних коробок бібліотеки.",
      ),
    ],
  },
  {
    id: "sports-hall",
    number: 5,
    image: `${IMAGE_BASE}/zones/education-sports-hall.webp`,
    imageAlt: {
      uk: "Sports hall with a wall-mounted cable tray and overhead linear LED lighting",
      ua: "Спортивна зала з настінним кабельним лотком та надземним лінійним LED освітленням",
    },
    content: {
      uk: { name: "Sports Hall" },
      ua: { name: "Спортивна зала" },
    },
    approvedProductFamilyIds: ["cable-management", "led-systems"],
    hotspots: [
      hotspot(
        "sports-hall-cable-management",
        "cable-management",
        20,
        18,
        "Cable Management Systems, wall-mounted cable tray",
        "Системи кабельного менеджменту, настінний кабельний лоток",
        "Routing power and control cabling along the sports hall perimeter wall to lighting and distribution equipment.",
        "Прокладання силових та керуючих кабелів вздовж периметральної стіни спортивної зали до освітлення та розподільного обладнання.",
      ),
      hotspot(
        "sports-hall-led-systems",
        "led-systems",
        55,
        15,
        "LED Systems, linear high-bay lighting",
        "Системи освітлення LED, лінійне освітлення високих приміщень",
        "Providing general lighting across the sports hall.",
        "Забезпечення загального освітлення спортивної зали.",
      ),
    ],
  },
  {
    id: "rooftop-plant",
    number: 6,
    image: `${IMAGE_BASE}/zones/education-rooftop-plant.webp`,
    imageAlt: {
      uk: "Rooftop plant area with air-handling units, a cable ladder and a lightning air-terminal mast",
      ua: "Дахова технічна зона з вентиляційними установками, кабельною драбиною та щоглою блискавкоприймача",
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
        70,
        "Cable Management Systems, rooftop cable ladder",
        "Системи кабельного менеджменту, дахова кабельна драбина",
        "Routing power and control cabling between rooftop plant equipment on a perforated cable ladder.",
        "Прокладання силових та керуючих кабелів між даховим технічним обладнанням по перфорованій кабельній драбині.",
      ),
      hotspot(
        "rooftop-plant-earthing",
        "earthing-lightning",
        62,
        15,
        "Earthing & Lightning Protection, air-terminal mast",
        "Заземлення та блискавкозахист, щогла блискавкоприймача",
        "Providing a lightning air-terminal connection point for the rooftop plant area.",
        "Забезпечення точки підключення щогли блискавкоприймача для дахової технічної зони.",
      ),
    ],
  },
  {
    id: "ev-charging-area",
    number: 7,
    image: `${IMAGE_BASE}/zones/education-ev-charging-area.webp`,
    imageAlt: {
      uk: "Campus car park with EV charging points, an external electrical enclosure and area lighting",
      ua: "Паркінг кампусу з зарядними станціями для електромобілів, зовнішньою електрошафою та освітленням території",
    },
    content: {
      uk: { name: "EV Charging Area" },
      ua: { name: "Зона зарядки електромобілів" },
    },
    approvedProductFamilyIds: ["ev-charging", "cable-management", "led-systems"],
    hotspots: [
      hotspot(
        "ev-charging-area-ev-charging",
        "ev-charging",
        10,
        60,
        "EV Charging Systems, charge point",
        "Системи зарядки електромобілів, зарядна станція",
        "Providing power distribution to EV charging points across the campus car park.",
        "Розподіл живлення до зарядних станцій електромобілів на паркінгу кампусу.",
      ),
      hotspot(
        "ev-charging-area-cable-management",
        "cable-management",
        90,
        60,
        "Cable Management Systems, external distribution enclosure",
        "Системи кабельного менеджменту, зовнішня розподільна шафа",
        "Feeding power from an external distribution enclosure to the EV charging points.",
        "Живлення зарядних станцій електромобілів від зовнішньої розподільної шафи.",
      ),
      hotspot(
        "ev-charging-area-led-systems",
        "led-systems",
        47,
        15,
        "LED Systems, external area lighting",
        "Системи освітлення LED, зовнішнє освітлення території",
        "Providing general area lighting across the car park and approach pathway.",
        "Забезпечення загального освітлення паркінгу та підхідної доріжки.",
      ),
    ],
  },
  {
    id: "campus-street-lighting",
    number: 8,
    image: `${IMAGE_BASE}/zones/education-campus-street-lighting.webp`,
    imageAlt: {
      uk: "Campus pathway at dusk with LED street lighting and an external electrical enclosure",
      ua: "Доріжка кампусу в сутінках з LED вуличним освітленням та зовнішньою електрошафою",
    },
    content: {
      uk: { name: "Campus Street Lighting" },
      ua: { name: "Вуличне освітлення кампусу" },
    },
    approvedProductFamilyIds: ["led-systems", "cable-management"],
    hotspots: [
      hotspot(
        "campus-street-lighting-led-systems",
        "led-systems",
        20,
        25,
        "LED Systems, street light fitting",
        "Системи освітлення LED, вуличний світильник",
        "Providing general area lighting along the campus pathway.",
        "Забезпечення загального освітлення вздовж доріжки кампусу.",
      ),
      hotspot(
        "campus-street-lighting-cable-management",
        "cable-management",
        27,
        62,
        "Cable Management Systems, external distribution enclosure",
        "Системи кабельного менеджменту, зовнішня розподільна шафа",
        "Feeding power to street lighting columns from an external distribution enclosure.",
        "Живлення опор вуличного освітлення від зовнішньої розподільної шафи.",
      ),
    ],
  },
] as const satisfies readonly Zone<EducationPublicSectorZoneId>[];

// ---------------------------------------------------------------------------
// Overview — sekiz bölgeye geçiş için tıklanabilir bölge hotspot'ları.
// ---------------------------------------------------------------------------

function overviewHotspot(
  id: string,
  zoneId: EducationPublicSectorZoneId,
  x: number,
  y: number,
  labelUk: string,
  labelUa: string,
): OverviewHotspot<EducationPublicSectorZoneId> {
  return {
    id,
    zoneId,
    x,
    y,
    accessibleLabel: { uk: labelUk, ua: labelUa },
  };
}

const OVERVIEW = {
  image: `${IMAGE_BASE}/overview/education-public-sector-application-map-overview.webp`,
  imageAlt: {
    uk: "Aerial view of an education and public sector campus showing academic, library, sports and technical service areas",
    ua: "Вигляд з висоти на кампус освітнього та громадського сектору з навчальними, бібліотечними, спортивними та технічними зонами",
  },
  hotspots: [
    overviewHotspot(
      "overview-main-electrical-room",
      "main-electrical-room",
      54,
      68,
      "Main Electrical Room",
      "Головне електротехнічне приміщення",
    ),
    overviewHotspot(
      "overview-classroom",
      "classroom",
      40,
      20,
      "Classroom",
      "Навчальний клас",
    ),
    overviewHotspot(
      "overview-laboratory",
      "laboratory",
      58,
      27,
      "Laboratory",
      "Лабораторія",
    ),
    overviewHotspot(
      "overview-library",
      "library",
      20,
      27,
      "Library",
      "Бібліотека",
    ),
    overviewHotspot(
      "overview-sports-hall",
      "sports-hall",
      75,
      18,
      "Sports Hall",
      "Спортивна зала",
    ),
    overviewHotspot(
      "overview-rooftop-plant",
      "rooftop-plant",
      70,
      40,
      "Rooftop Plant",
      "Дахове технічне обладнання",
    ),
    overviewHotspot(
      "overview-ev-charging-area",
      "ev-charging-area",
      40,
      52,
      "EV Charging Area",
      "Зона зарядки електромобілів",
    ),
    overviewHotspot(
      "overview-campus-street-lighting",
      "campus-street-lighting",
      88,
      55,
      "Campus Street Lighting",
      "Вуличне освітлення кампусу",
    ),
  ],
} as const;

export const EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP = {
  overview: OVERVIEW,
  zones: ZONES,
  productFamilies: PRODUCT_FAMILIES,
} as const satisfies ApplicationMap<EducationPublicSectorZoneId>;

import { publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import { CABLE_SUPPORT_CATALOGUE_PDF_HREF, heavyDutyCableTraysH60ContentForMarket } from "./content";
import type { CableAccessoryDisplayGroup, CableManagementFamilyContent } from "./types";

const IMAGE_BASE = publicMediaUrl("products/cable-management");

function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

const REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "conduit-pipe-systems",
  source: "/products/cable-support-systems",
});

function relatedConduitPipeFamilies(market: MarketCode): CableManagementFamilyContent["relatedFamilies"] {
  return [
    {
      slug: "emt-imc-rsc-conduit-systems",
      name: t(market, "EMT / IMC / RSC Conduit Systems", "Кабелепровідні системи EMT / IMC / RSC"),
      image: `${IMAGE_BASE}/conduit-pipe-systems/card/emt-imc-rsc-conduit-systems.png`,
      imageAlt: t(market, "Gersan EMT threadless steel conduit tube, technical catalogue drawing", "Безрізьбова сталева труба EMT Gersan, технічне креслення з каталогу"),
      orderCodeCount: 220,
      subtitle: t(market, "Threadless & threaded galvanized steel conduit", "Безрізьбові та різьбові оцинковані сталеві труби"),
      icon: "pipe",
    },
    {
      slug: "socket-fuse-fixing-unit",
      name: t(market, "Socket and Fuse Fixing Unit on the Tray", "Вузол кріплення розетки та запобіжника на лотку"),
      image: `${IMAGE_BASE}/conduit-pipe-systems/card/socket-and-fuse-fixing-unit-on-the-tray.png`,
      imageAlt: t(market, "Gersan socket and fuse fixing unit pipe system, product photograph", "Трубна система вузла кріплення розетки та запобіжника Gersan, фото продукту"),
      orderCodeCount: 22,
      subtitle: t(market, "Pipe-mounted socket & fuse fixing unit", "Трубний вузол кріплення розетки та запобіжника"),
      icon: "anchor",
    },
    {
      slug: "pipe-clamps",
      name: t(market, "Pipe Clamps", "Трубні затискачі"),
      image: `${IMAGE_BASE}/conduit-pipe-systems/card/pipe-clamps.png`,
      imageAlt: t(market, "Gersan rubber-insulated pipe clamp for threaded rods, product photograph", "Трубний затискач Gersan з гумовою ізоляцією для різьбових шпильок, фото продукту"),
      orderCodeCount: 63,
      subtitle: t(market, "Rubber-insulated clamps for threaded rods", "Затискачі з гумовою ізоляцією для різьбових шпильок"),
      icon: "c-profile",
    },
  ];
}

function conduitPipeAccessoryDisplayGroups(): readonly CableAccessoryDisplayGroup[] {
  return [];
}

export function emtImcRscConduitSystemsContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "emt-imc-rsc-conduit-systems",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Conduit & Pipe Systems", "Трубні та кабелепровідні системи"), href: "/products/cable-support-systems/conduit-pipe-systems" },
      { label: "EMT / IMC / RSC Conduit Systems" },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: "EMT / IMC / RSC Conduit Systems",
    titleQualifier: "(220 Items)",
    description: t(
      market,
      "Threadless (EMT) and threaded (IMC/RSC) galvanized steel conduit systems with matching connectors, couplings, elbows, clamps and bushings.",
      "Безрізьбові (EMT) та різьбові (IMC/RSC) оцинковані сталеві кабелепроводи з відповідними з'єднувачами, муфтами, коліна та втулками.",
    ),
    image: `${IMAGE_BASE}/conduit-pipe-systems/card/emt-imc-rsc-conduit-systems-transparent.png`,
    imageAlt: t(
      market,
      "Gersan galvanized steel conduit bundle, flexible conduit and connector fitting, product photograph",
      "Пучок оцинкованих сталевих кабелепроводів Gersan, гнучкий кабелепровід та з'єднувальний фітинг, фото продукту",
    ),
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: t(market, "Download PDF Catalogue", "Завантажити PDF-каталог"),
      meta: t(market, "PDF Catalogue", "PDF-каталог"),
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: t(
        market,
        "Download the Gersan Cable Support Systems PDF catalogue",
        "Завантажити PDF-каталог систем кабельної підтримки Gersan",
      ),
    },
    technicalSnapshot: [
      {
        icon: "shield",
        label: t(market, "Applicable Standards", "Застосовні стандарти"),
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [t(market, "Galvanized Steel / Hot-Dip Galvanized Steel", "Оцинкована сталь / гарячого цинкування сталь")],
      },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "EMT Threadless Tube", "Безрізьбова труба EMT"),
          t(market, "IMC / RSC Threaded Conduit", "Різьбовий кабелепровід IMC / RSC"),
          t(market, "Connectors & Couplings", "З'єднувачі та муфти"),
          t(market, "Bushings & End Caps", "Втулки та заглушки"),
        ],
      },
      {
        icon: "support",
        label: t(market, "Engineering Support", "Інженерна підтримка"),
        value: [
          t(market, "Load & Support Data", "Дані навантаження та опор"),
          t(market, "Technical Drawings", "Технічні креслення"),
          t(market, "Custom Dimensions", "Індивідуальні розміри"),
          t(market, "Installation Guidance", "Настанови з монтажу"),
        ],
      },
    ],
    relatedFamiliesHeading: t(market, "Product families in this category", "Продуктові сімейства в цій категорії"),
    relatedFamilies: relatedConduitPipeFamilies(market),
    scheduleHeading: t(market, "Order Codes & Technical Schedule", "Коди замовлення та технічна таблиця"),
    scheduleIntroduction: t(
      market,
      "Every model, stock code, dimension and weight below is drawn directly from the Gersan Cable Support catalogue.",
      "Кожна модель, код складу, розмір та вага нижче взяті безпосередньо з каталогу Gersan Cable Support.",
    ),
    standardLabel: "BS EN 61537",
    accessoriesHeading: t(market, "Compatible Accessories", "Сумісні аксесуари"),
    accessoriesIntroduction: t(
      market,
      "Connectors, couplings, elbows, clamps, bushings and end caps from the same conduit system.",
      "З'єднувачі, муфти, коліна, затискачі, втулки та заглушки з тієї ж кабелепровідної системи.",
    ),
    accessoryDisplayGroups: conduitPipeAccessoryDisplayGroups(),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(market, "Need help selecting a conduit system?", "Потрібна допомога з підбором кабелепровідної системи?"),
    supportDescription: t(
      market,
      "Our technical team can help with conduit sizing, fittings, materials, finishes and project-specific configurations.",
      "Наша технічна команда допоможе з підбором розмірів кабелепроводу, фітингів, матеріалів та покриттів.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: `${REQUEST_HREF}-emt-imc-rsc`,
  };
}

export function socketFuseFixingUnitContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "socket-fuse-fixing-unit",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Conduit & Pipe Systems", "Трубні та кабелепровідні системи"), href: "/products/cable-support-systems/conduit-pipe-systems" },
      { label: "Socket and Fuse Fixing Unit on the Tray" },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Socket and Fuse Fixing Unit on the Tray", "Вузол кріплення розетки та запобіжника на лотку"),
    titleQualifier: "(22 Items)",
    description: t(
      market,
      "Pipe-system fixing units, socket plates, circuit breaker plates and pipe accessories for mounting sockets and fuses directly on the cable tray.",
      "Вузли кріплення трубної системи, розеткові плати, плати автоматичних вимикачів та трубні аксесуари для монтажу розеток і запобіжників безпосередньо на лотку.",
    ),
    image: `${IMAGE_BASE}/conduit-pipe-systems/card/socket-and-fuse-fixing-unit-on-the-tray-transparent.png`,
    imageAlt: t(market, "Gersan socket and fuse fixing unit pipe system, product photograph", "Трубна система вузла кріплення розетки та запобіжника Gersan, фото продукту"),
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: t(market, "Download PDF Catalogue", "Завантажити PDF-каталог"),
      meta: t(market, "PDF Catalogue", "PDF-каталог"),
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: t(
        market,
        "Download the Gersan Cable Support Systems PDF catalogue",
        "Завантажити PDF-каталог систем кабельної підтримки Gersan",
      ),
    },
    technicalSnapshot: [
      {
        icon: "shield",
        label: t(market, "Applicable Standards", "Застосовні стандарти"),
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [t(market, "Hot-Dip Galvanized Steel", "Гарячого цинкування сталь")],
      },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Socket & Breaker Plates", "Розеткові плати та плати вимикачів"),
          t(market, "Tray Fixing Pieces", "Елементи кріплення до лотка"),
          t(market, "Pipe Elbows & Connectors", "Коліна та з'єднувачі труб"),
          t(market, "Floor Fixings", "Кріплення до підлоги"),
        ],
      },
      {
        icon: "support",
        label: t(market, "Engineering Support", "Інженерна підтримка"),
        value: [
          t(market, "Load & Support Data", "Дані навантаження та опор"),
          t(market, "Technical Drawings", "Технічні креслення"),
          t(market, "Custom Dimensions", "Індивідуальні розміри"),
          t(market, "Installation Guidance", "Настанови з монтажу"),
        ],
      },
    ],
    relatedFamiliesHeading: t(market, "Product families in this category", "Продуктові сімейства в цій категорії"),
    relatedFamilies: relatedConduitPipeFamilies(market),
    scheduleHeading: t(market, "Order Codes & Technical Schedule", "Коди замовлення та технічна таблиця"),
    scheduleIntroduction: t(
      market,
      "Every model, stock code, dimension and weight below is drawn directly from the Gersan Cable Support catalogue.",
      "Кожна модель, код складу, розмір та вага нижче взяті безпосередньо з каталогу Gersan Cable Support.",
    ),
    standardLabel: "BS EN 61537",
    accessoriesHeading: t(market, "Compatible Accessories", "Сумісні аксесуари"),
    accessoriesIntroduction: t(
      market,
      "Pipe fixing and connection components from the same system.",
      "Компоненти кріплення та з'єднання труб з тієї ж системи.",
    ),
    accessoryDisplayGroups: conduitPipeAccessoryDisplayGroups(),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(market, "Need help with tray-mounted fixing units?", "Потрібна допомога з лотковими фіксувальними вузлами?"),
    supportDescription: t(
      market,
      "Our technical team can assist with fixing unit selection, layout planning and installation coordination.",
      "Наша технічна команда допоможе з підбором фіксувальних вузлів, плануванням та координацією монтажу.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: `${REQUEST_HREF}-socket-fuse`,
  };
}

export function pipeClampsContentForMarket(market: MarketCode): CableManagementFamilyContent {
  return {
    slug: "pipe-clamps",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      { label: t(market, "Conduit & Pipe Systems", "Трубні та кабелепровідні системи"), href: "/products/cable-support-systems/conduit-pipe-systems" },
      { label: "Pipe Clamps" },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Pipe Clamps", "Трубні затискачі"),
    titleQualifier: "(63 Items)",
    description: t(
      market,
      "Rubber-insulated and standard pipe clamps, U bolts and heavy duty head clamps for mounting conduit on threaded rods and structural steel.",
      "Трубні затискачі з гумовою ізоляцією та стандартні, U-подібні болти та затискачі важкого типу для монтажу кабелепроводу на різьбових шпильках та конструкційній сталі.",
    ),
    image: `${IMAGE_BASE}/conduit-pipe-systems/card/pipe-clamps-transparent.png`,
    imageAlt: t(market, "Gersan rubber-insulated pipe clamp for threaded rods, product photograph", "Трубний затискач Gersan з гумовою ізоляцією для різьбових шпильок, фото продукту"),
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: t(market, "Download PDF Catalogue", "Завантажити PDF-каталог"),
      meta: t(market, "PDF Catalogue", "PDF-каталог"),
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: t(
        market,
        "Download the Gersan Cable Support Systems PDF catalogue",
        "Завантажити PDF-каталог систем кабельної підтримки Gersan",
      ),
    },
    technicalSnapshot: [
      {
        icon: "shield",
        label: t(market, "Applicable Standards", "Застосовні стандарти"),
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [t(market, "Hot-Dip Galvanized Steel (Optional Pregalvanized, Corten-A, Aluminium, SS304-316)", "Гарячого цинкування сталь (за бажанням: прегальванізація, Corten-A, алюміній, SS304-316)")],
      },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "One & Two Side Fixed Clamps", "Затискачі з одно- та двостороннім кріпленням"),
          t(market, "Rubber Insulation", "Гумова ізоляція"),
          t(market, "U Bolts", "U-подібні болти"),
          t(market, "Heavy Duty Head Clamps", "Затискачі важкого типу"),
        ],
      },
      {
        icon: "support",
        label: t(market, "Engineering Support", "Інженерна підтримка"),
        value: [
          t(market, "Load & Support Data", "Дані навантаження та опор"),
          t(market, "Technical Drawings", "Технічні креслення"),
          t(market, "Custom Dimensions", "Індивідуальні розміри"),
          t(market, "Installation Guidance", "Настанови з монтажу"),
        ],
      },
    ],
    relatedFamiliesHeading: t(market, "Product families in this category", "Продуктові сімейства в цій категорії"),
    relatedFamilies: relatedConduitPipeFamilies(market),
    scheduleHeading: t(market, "Order Codes & Technical Schedule", "Коди замовлення та технічна таблиця"),
    scheduleIntroduction: t(
      market,
      "Every model, stock code, dimension and weight below is drawn directly from the Gersan Cable Support catalogue.",
      "Кожна модель, код складу, розмір та вага нижче взяті безпосередньо з каталогу Gersan Cable Support.",
    ),
    standardLabel: "BS EN 61537",
    accessoriesHeading: t(market, "Compatible Accessories", "Сумісні аксесуари"),
    accessoriesIntroduction: t(
      market,
      "Fixing hardware from the same pipe clamp system.",
      "Кріпильна фурнітура з тієї ж системи трубних затискачів.",
    ),
    accessoryDisplayGroups: conduitPipeAccessoryDisplayGroups(),
    resourcesHeading: t(market, "Technical Resources", "Технічні ресурси"),
    resources: heavyDutyCableTraysH60ContentForMarket(market).resources,
    supportHeading: t(market, "Need help selecting pipe clamps?", "Потрібна допомога з підбором трубних затискачів?"),
    supportDescription: t(
      market,
      "Our technical team can assist with clamp sizing, material selection and installation methods.",
      "Наша технічна команда допоможе з підбором розмірів затискачів, матеріалів та методів монтажу.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: `${REQUEST_HREF}-pipe-clamps`,
  };
}

import type { MarketCode } from "@/modules/markets/types";

import type { CableMacroFamilyContent } from "./macro-family-types";
import { CABLE_SUPPORT_CATALOGUE_PDF_HREF } from "./content";

const IMAGE_BASE = "/assets/products/cable-management";
const REQUEST_HREF = "/uk-support?request=technical-pack&product=conduit-pipe-systems";

// Three catalogue series map to this macro group (see category-content.ts):
// Socket and Fuse Fixing Unit on the Tray, Pipe Clamps, and EMT/IMC/RSC
// Conduit Systems. Only EMT/IMC/RSC has a real family image
// (emt-imc-rsc-conduit-systems/family/); the other two render the "Image
// on request" placeholder. All three now have real extracted
// product-data.csv datasets (see variants/emt-imc-rsc-conduit-systems.ts,
// variants/socket-fuse-fixing-unit.ts, variants/pipe-clamps.ts) and route
// to a real detail page — orderCodeCount/href reflect that. Still no
// "Choose by ..." section here (not part of this macro page's design).
const CONDUIT_PIPE_SYSTEMS_CONTENT_BY_MARKET: Readonly<Record<MarketCode, CableMacroFamilyContent>> = {
  uk: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Conduit & Pipe Systems" },
    ],
    eyebrow: "Cable Management Systems",
    title: "Conduit & Pipe Systems",
    description:
      "Metallic and flexible conduit systems, fittings and clamps for mechanical cable protection and structured routing.",
    requestPackAction: "Request Technical Pack",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Download PDF Catalogue",
      meta: "PDF Catalogue",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Download the Gersan Cable Support Systems PDF catalogue",
    },
    heroImage: `${IMAGE_BASE}/conduit-pipe-systems/hero/conduit-pipe-systems-transparenthero.png`,
    heroImageAlt: "Gersan galvanized steel conduit, flexible conduit and fitting, product photograph",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Applicable Standards",
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: "Materials & Finishes",
        value: ["Hot-Dip Galvanized", "Steel"],
      },
      {
        icon: "system",
        label: "System Scope",
        value: ["EMT / IMC / RSC Conduit", "Pipe Clamps", "Tray-Mounted Fixing Units"],
      },
      {
        icon: "support",
        label: "Engineering Support",
        value: ["Load & Support Data", "Technical Drawings", "Custom Dimensions", "Installation Guidance"],
      },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction:
      "Three catalogue series make up the Conduit & Pipe Systems range — EMT/IMC/RSC conduit, tray-mounted fixing units and pipe clamps.",
    series: [
      {
        slug: "emt-imc-rsc-conduit-systems",
        label: "EMT / IMC / RSC Conduit Systems",
        catalogueName: "EMT / IMC / RSC Conduit Systems",
        description: "Threadless and threaded galvanized steel conduit systems with matching fittings.",
        image: `${IMAGE_BASE}/conduit-pipe-systems/card/emt-imc-rsc-conduit-systems.png`,
        imageAlt: "Gersan EMT threadless steel conduit tube, technical catalogue drawing",
        orderCodeCount: 220,
        href: "/products/cable-support-systems/emt-imc-rsc-conduit-systems",
      },
      {
        slug: "socket-fuse-fixing-unit",
        label: "Socket and Fuse Fixing Unit on the Tray",
        catalogueName: "Socket and Fuse Fixing Unit on the Tray — Pipe System",
        description: "Pipe-system fixing unit for mounting sockets and fuses directly on the cable tray.",
        image: `${IMAGE_BASE}/conduit-pipe-systems/card/socket-and-fuse-fixing-unit-on-the-tray.png`,
        imageAlt: "Gersan socket and fuse fixing unit pipe system, product photograph",
        orderCodeCount: 22,
        href: "/products/cable-support-systems/socket-fuse-fixing-unit",
      },
      {
        slug: "pipe-clamps",
        label: "Pipe Clamps",
        catalogueName: "Pipe Clamps — With Rubber Insulation, for Threaded Rods",
        description: "Rubber-insulated pipe clamps for mounting conduit on threaded rods.",
        image: `${IMAGE_BASE}/conduit-pipe-systems/card/pipe-clamps.png`,
        imageAlt: "Gersan rubber-insulated pipe clamp for threaded rods, product photograph",
        orderCodeCount: 63,
        href: "/products/cable-support-systems/pipe-clamps",
      },
    ],
    compatibleHeading: "Compatible Systems",
    compatibleIntroduction:
      "Conduit and pipe systems are carried and fixed by these support systems, and route alongside these other containment types.",
    compatibleSystems: [
      {
        label: "Support & Hanging Systems",
        description: "Support profiles, brackets, consoles and threaded rods that carry this conduit.",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        label: "Cable Trays & Trunking",
        description: "Perforated, heavy-duty and trunking systems for wider cable routing.",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        label: "Accessories & Fixings",
        description: "Bends, reducers, covers, clamps, anchors and installation accessories.",
        href: "/products/cable-support-systems/accessories-fixings",
      },
    ],
    supportHeading: "Need help selecting a conduit or pipe system?",
    supportDescription:
      "Get technical support with conduit sizing, fittings, materials, finishes and project-specific configurations.",
    supportAction: "Request Technical Support",
    supportHref: REQUEST_HREF,
  },
  ua: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cable Management Systems", href: "/products/cable-support-systems" },
      { label: "Трубні та кабелепровідні системи" },
    ],
    eyebrow: "Кабеленесучі системи",
    title: "Трубні та кабелепровідні системи",
    description:
      "Металеві та гнучкі кабелепроводи, фітинги та затискачі для механічного захисту кабелів та впорядкованого прокладання.",
    requestPackAction: "Запросити технічний пакет",
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: "Завантажити PDF-каталог",
      meta: "PDF-каталог",
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: "Завантажити PDF-каталог систем кабельної підтримки Gersan",
    },
    heroImage: `${IMAGE_BASE}/conduit-pipe-systems/hero/conduit-pipe-systems-transparenthero.png`,
    heroImageAlt: "Оцинкований сталевий кабелепровід Gersan, гнучкий кабелепровід та фітинг, фото продукту",
    technicalSnapshot: [
      {
        icon: "shield",
        label: "Застосовні стандарти",
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: "Матеріали та покриття",
        value: ["Гаряче цинкування", "Сталь"],
      },
      {
        icon: "system",
        label: "Обсяг системи",
        value: ["Кабелепровід EMT / IMC / RSC", "Трубні затискачі", "Лоткові фіксувальні вузли"],
      },
      {
        icon: "support",
        label: "Інженерна підтримка",
        value: ["Дані навантаження та опор", "Технічні креслення", "Індивідуальні розміри", "Настанови з монтажу"],
      },
    ],
    seriesHeading: "Серії продукції цієї системи",
    seriesIntroduction:
      "Три серії каталогу складають асортимент трубних та кабелепровідних систем — кабелепровід EMT/IMC/RSC, лоткові фіксувальні вузли та трубні затискачі.",
    series: [
      {
        slug: "emt-imc-rsc-conduit-systems",
        label: "Кабелепровідні системи EMT / IMC / RSC",
        catalogueName: "EMT / IMC / RSC Conduit Systems",
        description: "Безрізьбові та різьбові оцинковані сталеві кабелепроводи з відповідними фітингами.",
        image: `${IMAGE_BASE}/conduit-pipe-systems/card/emt-imc-rsc-conduit-systems.png`,
        imageAlt: "Безрізьбова сталева труба EMT Gersan, технічне креслення з каталогу",
        orderCodeCount: 220,
        href: "/products/cable-support-systems/emt-imc-rsc-conduit-systems",
      },
      {
        slug: "socket-fuse-fixing-unit",
        label: "Вузол кріплення розетки та запобіжника на лотку",
        catalogueName: "Socket and Fuse Fixing Unit on the Tray — Pipe System",
        description: "Вузол кріплення трубної системи для монтажу розеток і запобіжників безпосередньо на лотку.",
        image: `${IMAGE_BASE}/conduit-pipe-systems/card/socket-and-fuse-fixing-unit-on-the-tray.png`,
        imageAlt: "Трубна система вузла кріплення розетки та запобіжника Gersan, фото продукту",
        orderCodeCount: 22,
        href: "/products/cable-support-systems/socket-fuse-fixing-unit",
      },
      {
        slug: "pipe-clamps",
        label: "Трубні затискачі",
        catalogueName: "Pipe Clamps — With Rubber Insulation, for Threaded Rods",
        description: "Трубні затискачі з гумовою ізоляцією для монтажу кабелепроводу на різьбових шпильках.",
        image: `${IMAGE_BASE}/conduit-pipe-systems/card/pipe-clamps.png`,
        imageAlt: "Трубний затискач Gersan з гумовою ізоляцією для різьбових шпильок, фото продукту",
        orderCodeCount: 63,
        href: "/products/cable-support-systems/pipe-clamps",
      },
    ],
    compatibleHeading: "Сумісні системи",
    compatibleIntroduction:
      "Кабелепровідні та трубні системи несуться та фіксуються цими опорними системами, а також прокладаються поруч з іншими типами захисту кабелів.",
    compatibleSystems: [
      {
        label: "Системи опор та підвісу",
        description: "Опорні профілі, кронштейни, консолі та різьбові шпильки, що несуть цей кабелепровід.",
        href: "/products/cable-support-systems/support-hanging-systems",
      },
      {
        label: "Кабельні лотки та короби",
        description: "Перфоровані, важкого типу та коробчасті системи для ширшого прокладання кабелів.",
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      {
        label: "Аксесуари та кріплення",
        description: "Поворотні елементи, редукції, кришки, затискачі, анкери та монтажні аксесуари.",
        href: "/products/cable-support-systems/accessories-fixings",
      },
    ],
    supportHeading: "Потрібна допомога з підбором кабелепровідної чи трубної системи?",
    supportDescription:
      "Отримайте технічну підтримку з підбору розмірів кабелепроводу, фітингів, матеріалів, покриттів та індивідуальних конфігурацій проєкту.",
    supportAction: "Запросити технічну підтримку",
    supportHref: REQUEST_HREF,
  },
};

export function conduitPipeSystemsContentForMarket(market: MarketCode): CableMacroFamilyContent {
  return CONDUIT_PIPE_SYSTEMS_CONTENT_BY_MARKET[market];
}

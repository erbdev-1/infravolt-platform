import type { BusbarSystemDetailByMarket } from "./types";

const SPEC_COLUMNS = [
  { id: "gm-100", label: "GM 100A" },
  { id: "gm-160", label: "GM 160A" },
  { id: "gm-250", label: "GM 250A" },
  { id: "gm-400", label: "GM 400A" },
] as const;

const IMAGE_BASE = "/assets/products/busbar/gm";
const APPLICATION_IMAGE_BASE = "/assets/products/busbar/applications";

export const GM_SYSTEM_DETAIL = {
  uk: {
    slug: "gm-low-power-busbar",
    categoryEyebrow: "Low Power Busbar System",
    heroDescription:
      "GM is a 100 A to 400 A low-power busbar trunking system designed for industrial power and lighting distribution, built from 3 m aluminium-housing elements with aluminium or copper conductors and a hard-fixing bar joint system rated to IP55.",
    heroFeatureImage: `${IMAGE_BASE}/card/gm-main-product-transparent.webp`,
    heroFeatureImageAlt: "GM medium power busbar system main product view",
    heroImages: [
      {
        image: `${IMAGE_BASE}/applications/gm-main-product-01.webp`,
        imageAlt: "GM medium power busbar system",
        label: "GM busbar system",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gm-main-product-02.webp`,
        imageAlt: "GM medium power busbar system detail view",
        label: "GM busbar detail",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gm-industrial-lighting-application.png`,
        imageAlt: "GM busbar installed in an industrial lighting application",
        label: "Industrial application",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gm-busbar-cutaway.webp`,
        imageAlt: "GM busbar system cutaway showing internal conductor arrangement",
        label: "Conductor detail",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gm-system-overview-render.webp`,
        imageAlt: "GM busbar system overview render",
        label: "System overview",
        fit: "contain",
      },
    ],
    heroPreviousLabel: "Previous image",
    heroNextLabel: "Next image",
    heroGalleryLabel: "GM product gallery",
    heroFullscreenLabel: "View full screen",
    heroCloseLabel: "Close full-screen image",
    facts: [
      { value: "100–400 A", label: "Current rating" },
      { value: "IP55", label: "Protection degree" },
      { value: "1000 V", label: "Insulation voltage (Ui)" },
      { value: "3000 mm", label: "Standard element length" },
    ],
    overviewEyebrow: "Overview",
    overviewHighlights: [
      "Aluminium or copper conductor options (GMA / GMC) to suit power and budget requirements",
      "Aluminium housing with hard-fixing bar joint system requiring 30 Nm tightening torque",
      "Available in P+N+E+(AL housing) and 3P+N+E+(AL housing) configurations with 2–5 conductor options",
      "16 A plug-in lighting fixture jacks with a glass-fuse protected variant and 1000 mm standard cable",
      "MCB-type tap-off boxes for protected sub-circuit connections up to 3×32 A",
      "Clean Earth (CE) and PEC grounding variants available across all accessories",
      "Wide range of accessories with full international certification and CE marking",
      "Recommended support hanger spacing of 1500–2000 mm",
    ],
    applicationsEyebrow: "Applications",
    applicationsHeading: "Where GM is used",
    applicationsDescription:
      "GM provides robust, continuous power and lighting distribution for industrial environments where higher current capacity and broad accessory choice are required.",
    applications: [
      {
        slug: "industrial-facilities",
        title: "Industrial facilities & workshops",
        description:
          "High-current lighting and power connections for production areas, workshops and high-ceiling industrial spaces requiring 100–400 A capacity.",
        image: `${APPLICATION_IMAGE_BASE}/busbar-application-manufacturing.webp`,
        imageAlt:
          "Manufacturing facility with continuous lighting above production machinery",
      },
      {
        slug: "warehouses-logistics",
        title: "Warehouses & logistics",
        description:
          "Continuous power and lighting distribution above storage aisles, picking areas and logistics operations.",
        image: `${APPLICATION_IMAGE_BASE}/busbar-application-warehouse.webp`,
        imageAlt:
          "Industrial warehouse with continuous overhead lighting above storage and logistics areas",
      },
      {
        slug: "commercial-buildings",
        title: "Retail & commercial buildings",
        description:
          "Adaptable power distribution for supermarkets, showrooms, retail units and commercial interiors.",
        image: `${APPLICATION_IMAGE_BASE}/busbar-application-retail.webp`,
        imageAlt:
          "Retail interior with adaptable overhead power and lighting distribution",
      },
    ],
    technicalDataEyebrow: "Technical data",
    technicalDataHeading: "Ratings & specification",
    parameterHeading: "Parameter",
    specColumns: SPEC_COLUMNS,
    specRows: [
      {
        parameter: "Rated current (In)",
        values: {
          "gm-100": "100 A",
          "gm-160": "160 A",
          "gm-250": "225 (250) A",
          "gm-400": "315 (400) A",
        },
      },
      {
        parameter: "Insulation voltage (Ui)",
        values: {
          "gm-100": "1000 V",
          "gm-160": "1000 V",
          "gm-250": "1000 V",
          "gm-400": "1000 V",
        },
      },
      {
        parameter: "Rated operational voltage (Ue)",
        values: {
          "gm-100": "690 V",
          "gm-160": "690 V",
          "gm-250": "690 V",
          "gm-400": "690 V",
        },
      },
      {
        parameter: "Frequency (fn)",
        values: {
          "gm-100": "50/60 Hz",
          "gm-160": "50/60 Hz",
          "gm-250": "50/60 Hz",
          "gm-400": "50/60 Hz",
        },
      },
      {
        parameter: "Short-circuit withstand current, 1s (Icw)",
        values: {
          "gm-100": "3.5 kA rms",
          "gm-160": "6 kA rms",
          "gm-250": "12.5 kA rms",
          "gm-400": "15 kA rms",
        },
      },
      {
        parameter: "Peak withstand current (Ipk)",
        values: {
          "gm-100": "5.25 kA",
          "gm-160": "9 kA",
          "gm-250": "18.75 kA",
          "gm-400": "22.5 kA",
        },
      },
      {
        parameter: "Phase resistance (R20)",
        values: {
          "gm-100": "0.49 mΩ/m",
          "gm-160": "0.32 mΩ/m",
          "gm-250": "0.25 mΩ/m",
          "gm-400": "0.19 mΩ/m",
        },
      },
      {
        parameter: "Phase resistance (Rl)",
        values: {
          "gm-100": "0.58 mΩ/m",
          "gm-160": "0.38 mΩ/m",
          "gm-250": "0.29 mΩ/m",
          "gm-400": "0.23 mΩ/m",
        },
      },
      {
        parameter: "Phase reactance (Xl)",
        values: {
          "gm-100": "0.20 mΩ/m",
          "gm-160": "0.13 mΩ/m",
          "gm-250": "0.10 mΩ/m",
          "gm-400": "0.08 mΩ/m",
        },
      },
      {
        parameter: "Phase impedance (Zl)",
        values: {
          "gm-100": "0.61 mΩ/m",
          "gm-160": "0.40 mΩ/m",
          "gm-250": "0.30 mΩ/m",
          "gm-400": "0.06 mΩ/m",
        },
      },
      {
        parameter: "Phase conductor cross-section",
        values: {
          "gm-100": "25 (50) mm²",
          "gm-160": "50 (75) mm²",
          "gm-250": "75 (100) mm²",
          "gm-400": "100 (125) mm²",
        },
      },
      {
        parameter: "Neutral conductor cross-section",
        values: {
          "gm-100": "25 (50) mm²",
          "gm-160": "50 (75) mm²",
          "gm-250": "75 (100) mm²",
          "gm-400": "100 (125) mm²",
        },
      },
      {
        parameter: "Aluminium housing cross-section (SPE)",
        values: {
          "gm-100": "300 mm²",
          "gm-160": "300 mm²",
          "gm-250": "300 mm²",
          "gm-400": "300 mm²",
        },
      },
      {
        parameter: "Conductor material",
        values: {
          "gm-100": "Aluminium (GMA)",
          "gm-160": "Aluminium (GMA) / Copper (GMC)",
          "gm-250": "Aluminium (GMA) / Copper (GMC)",
          "gm-400": "Aluminium (GMA) / Copper (GMC)",
        },
      },
      {
        parameter: "Protection degree",
        values: {
          "gm-100": "IP55",
          "gm-160": "IP55",
          "gm-250": "IP55",
          "gm-400": "IP55",
        },
      },
      {
        parameter: "Standard element length",
        values: {
          "gm-100": "3000 mm",
          "gm-160": "3000 mm",
          "gm-250": "3000 mm",
          "gm-400": "3000 mm",
        },
      },
      {
        parameter: "Lighting fixture jack current",
        values: {
          "gm-100": "16 A",
          "gm-160": "16 A",
          "gm-250": "16 A",
          "gm-400": "16 A",
        },
      },
    ],
    componentsEyebrow: "System components",
    componentsHeadingPrefix: "Components for",
    components: [
      {
        slug: "standard-length-element",
        name: "Standard Length Element",
        orderCode:
          "GMA 10033 / 10035 / 16033 / 16035 / 22533 / 22535 / 40033 / 40035 · GMC 16033 / 16035 / 22533 / 22535 / 40033 / 40035",
        description:
          "3 m aluminium-housing busbar element in P+N+E+(AL housing) and 3P+N+E+(AL housing) configurations, available with aluminium (GMA) or copper (GMC) conductors.",
        image: `${IMAGE_BASE}/components/gm-standard-length-element-pnpe.webp`,
        imageAlt: "GM standard length busbar element",
      },
      {
        slug: "feed-unit-left",
        name: "Feed Unit — Left",
        orderCode: "GMA EF41 / GMC EF41",
        description:
          "Left-hand feed unit for supplying the busbar run; available in PEC, Clean Earth (CE) and ACK grounding variants.",
        image: `${IMAGE_BASE}/components/gm-feed-unit-left.webp`,
        imageAlt: "GM left feed unit",
      },
      {
        slug: "feed-unit-right",
        name: "Feed Unit — Right",
        orderCode: "GMA EF42 / GMC EF42",
        description:
          "Right-hand feed unit for supplying the busbar run; available in PEC, Clean Earth (CE) and ACK grounding variants.",
        image: `${IMAGE_BASE}/components/gm-feed-unit-right.webp`,
        imageAlt: "GM right feed unit",
      },
      {
        slug: "centre-feed-unit",
        name: "Centre Feed Unit",
        orderCode: "GMA EF43 / GMC EF43",
        description:
          "3P+N+1/2 PE centre-feed unit for supplying the busbar run from a mid-span point; available in PEC, CE and ACK variants.",
        image: `${IMAGE_BASE}/components/gm-centre-feed-unit.webp`,
        imageAlt: "GM centre feed unit",
      },
      {
        slug: "flexible-joint",
        name: "Flexible Joint for Elbow",
        orderCode: "GMA 160FX / GMC 225FX",
        description:
          "1000 mm flexible joint used to change direction where a rigid elbow is not practical; available in PEC, CE and ACK grounding variants.",
        image: `${IMAGE_BASE}/components/gm-flexible-joint-main.webp`,
        imageAlt: "GM flexible joint for elbow",
      },
      {
        slug: "lighting-fixture-jack",
        name: "Lighting Fixture Jack",
        orderCode: "GM 16L1 / 16L2 / 16L3 / 16L4-1",
        description:
          "16 A plug-in tap-off jack for connecting lighting fixtures along the busbar run; standard cable length 1000 mm.",
        image: `${IMAGE_BASE}/components/gm-lighting-fixture-jack.webp`,
        imageAlt: "GM lighting fixture jack",
      },
      {
        slug: "glass-fuse-jack",
        name: "Lighting Fixture Jack with Glass Fuse",
        orderCode: "GM 16F1 / 16F2 / 16F3 / 16F4-1",
        description:
          "16 A plug-in tap-off jack with integrated glass-fuse protection; available in PEC, CE and ACK grounding variants.",
        image: `${IMAGE_BASE}/components/gm-glass-fuse-jack.webp`,
        imageAlt: "GM lighting fixture jack with glass fuse",
      },
      {
        slug: "mcb-tap-off-box",
        name: "MCB Tap-Off Box",
        orderCode: "GM F32W / GM F32G",
        description:
          "3×32 A MCB-type tap-off box for protected sub-circuit connections from the busbar run.",
        image: `${IMAGE_BASE}/components/gm-mcb-tap-off-box.webp`,
        imageAlt: "GM MCB tap-off box",
      },
      {
        slug: "end-cap",
        name: "End Cap",
        orderCode: "GM EC40",
        description: "Closes the open end of a feed unit at the end of a run.",
        image: `${IMAGE_BASE}/components/gm-end-cap.webp`,
        imageAlt: "GM end cap",
      },
      {
        slug: "joint-cover",
        name: "IP55 Joint Cover",
        orderCode: "GM ALC",
        description:
          "Covers each element joint to restore IP55 and mechanical protection.",
        image: `${IMAGE_BASE}/components/gm-joint-cover.webp`,
        imageAlt: "GM IP55 joint cover",
      },
      {
        slug: "fixture-fixing-hanger",
        name: "Lighting Fixture Fixing Hanger",
        orderCode: "GM SSU1 / SSU2",
        description:
          "Hanger for fixing lighting fixtures to the busbar system.",
        image: `${IMAGE_BASE}/components/gm-fixture-fixing-hanger-ssu2.webp`,
        imageAlt: "GM lighting fixture fixing hanger",
      },
      {
        slug: "busbar-fixing-hanger",
        name: "Busbar Fixing Hanger",
        orderCode: "GM SSU3",
        description:
          "Support hanger for the busbar run; recommended spacing is 1500–2000 mm.",
        image: `${IMAGE_BASE}/components/gm-busbar-fixing-hanger-ssu3.webp`,
        imageAlt: "GM busbar fixing hanger",
      },
    ],
    documentsTabLabel: "Documents",
    documents: [
      {
        title: "Gersan Busbar Systems Catalogue",
        description:
          "Full product catalogue covering all Gersan busbar trunking systems, including GM technical data, order codes and dimensional drawings.",
        fileLabel: "PDF · 25.1 MB",
        href: "/assets/documents/busbar/gersan-busbar-systems-catalogue.pdf",
        downloadLabel: "Download catalogue",
      },
      {
        title: "GM Installation Guide",
        description:
          "Quick reference for joining two GM busbar elements: alignment, hard-fixing bar joint tightening torque and closing the IP55 joint cover.",
        fileLabel: "PDF",
        href: `${IMAGE_BASE}/installation/GM_Busbar_Installation_Guide.pdf`,
        downloadLabel: "Download installation guide",
      },
    ],
    requestQuoteHref: "/uk-support?product=gm-low-power-busbar",
    requestDocumentationHref: "/#technical-documents",
  },
  ua: {
    slug: "gm-low-power-busbar",
    categoryEyebrow: "Шинопровідна система низької потужності",
    heroDescription:
      "GM — шинопровідна система на 100–400 А для промислового розподілу живлення та освітлення. Виготовляється з 3-метрових елементів в алюмінієвому корпусі з алюмінієвими або мідними провідниками та жорсткою барною системою зʼєднання із захистом IP55.",
    heroFeatureImage: `${IMAGE_BASE}/card/gm-main-product-transparent.webp`,
    heroFeatureImageAlt:
      "Шинопровідна система GM середньої потужності — вигляд основного продукту",
    heroImages: [
      {
        image: `${IMAGE_BASE}/applications/gm-main-product-01.webp`,
        imageAlt: "Шинопровідна система GM середньої потужності",
        label: "Шинопровідна система GM",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gm-main-product-02.webp`,
        imageAlt: "Детальний вигляд шинопровідної системи GM",
        label: "Деталь шинопроводу GM",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gm-industrial-lighting-application.png`,
        imageAlt: "Шинопровід GM у промисловому освітленні",
        label: "Промислове застосування",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gm-busbar-cutaway.webp`,
        imageAlt:
          "Розрізний вигляд шинопроводу GM із внутрішнім розташуванням провідників",
        label: "Деталь провідників",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gm-system-overview-render.webp`,
        imageAlt: "Загальна схема системи шинопроводу GM",
        label: "Схема системи",
        fit: "contain",
      },
    ],
    heroPreviousLabel: "Попереднє зображення",
    heroNextLabel: "Наступне зображення",
    heroGalleryLabel: "Галерея продукції GM",
    heroFullscreenLabel: "Переглянути на весь екран",
    heroCloseLabel: "Закрити повноекранне зображення",
    facts: [
      { value: "100–400 А", label: "Номінальний струм" },
      { value: "IP55", label: "Ступінь захисту" },
      { value: "1000 В", label: "Ізоляційна напруга (Ui)" },
      { value: "3000 мм", label: "Стандартна довжина елемента" },
    ],
    overviewEyebrow: "Огляд",
    overviewHighlights: [
      "Алюмінієві або мідні провідники (GMA / GMC) на вибір залежно від потужності та бюджету",
      "Алюмінієвий корпус із жорсткою барною системою зʼєднання, що потребує затяжки 30 Нм",
      "Конфігурації P+N+E+(AL корпус) та 3P+N+E+(AL корпус) з варіантами від 2 до 5 провідників",
      "Штепсельні відгалужувальні вузли для світильників на 16 А зі скляним запобіжником та стандартним кабелем 1000 мм",
      "Відгалужувальні коробки типу MCB для захищеного підключення підсхем до 3×32 А",
      "Варіанти заземлення Clean Earth (CE) та PEC доступні для всіх аксесуарів",
      "Широкий асортимент аксесуарів, повна міжнародна сертифікація та маркування CE",
      "Рекомендована відстань між опорними підвісами — 1500–2000 мм",
    ],
    applicationsEyebrow: "Застосування",
    applicationsHeading: "Де використовується GM",
    applicationsDescription:
      "GM забезпечує надійний безперервний розподіл живлення та освітлення для промислових середовищ, де потрібні підвищена потужність та широкий вибір аксесуарів.",
    applications: [
      {
        slug: "industrial-facilities",
        title: "Промислові обʼєкти та майстерні",
        description:
          "Підключення освітлення та живлення великих струмів у виробничих зонах та промислових приміщеннях із ємністю 100–400 А.",
        image: `${APPLICATION_IMAGE_BASE}/busbar-application-manufacturing.webp`,
        imageAlt:
          "Виробниче приміщення з безперервним освітленням над обладнанням",
      },
      {
        slug: "warehouses-logistics",
        title: "Склади та логістичні центри",
        description:
          "Безперервний розподіл живлення та освітлення над складськими проходами та логістичними ділянками.",
        image: `${APPLICATION_IMAGE_BASE}/busbar-application-warehouse.webp`,
        imageAlt:
          "Промисловий склад із безперервним освітленням над стелажами",
      },
      {
        slug: "commercial-buildings",
        title: "Торговельні та комерційні приміщення",
        description:
          "Адаптивний розподіл живлення для супермаркетів, шоурумів та комерційних інтерʼєрів.",
        image: `${APPLICATION_IMAGE_BASE}/busbar-application-retail.webp`,
        imageAlt:
          "Торговельне приміщення з адаптивною системою розподілу живлення",
      },
    ],
    technicalDataEyebrow: "Технічні дані",
    technicalDataHeading: "Параметри та характеристики",
    parameterHeading: "Параметр",
    specColumns: SPEC_COLUMNS,
    specRows: [
      { parameter: "Номінальний струм (In)", values: { "gm-100": "100 А", "gm-160": "160 А", "gm-250": "225 (250) А", "gm-400": "315 (400) А" } },
      { parameter: "Ізоляційна напруга (Ui)", values: { "gm-100": "1000 В", "gm-160": "1000 В", "gm-250": "1000 В", "gm-400": "1000 В" } },
      { parameter: "Номінальна робоча напруга (Ue)", values: { "gm-100": "690 В", "gm-160": "690 В", "gm-250": "690 В", "gm-400": "690 В" } },
      { parameter: "Частота (fn)", values: { "gm-100": "50/60 Гц", "gm-160": "50/60 Гц", "gm-250": "50/60 Гц", "gm-400": "50/60 Гц" } },
      { parameter: "Струм короткого замикання, 1 с (Icw)", values: { "gm-100": "3,5 кА, діюче", "gm-160": "6 кА, діюче", "gm-250": "12,5 кА, діюче", "gm-400": "15 кА, діюче" } },
      { parameter: "Піковий витримуваний струм (Ipk)", values: { "gm-100": "5,25 кА", "gm-160": "9 кА", "gm-250": "18,75 кА", "gm-400": "22,5 кА" } },
      { parameter: "Опір фази (R20)", values: { "gm-100": "0,49 мОм/м", "gm-160": "0,32 мОм/м", "gm-250": "0,25 мОм/м", "gm-400": "0,19 мОм/м" } },
      { parameter: "Опір фази (Rl)", values: { "gm-100": "0,58 мОм/м", "gm-160": "0,38 мОм/м", "gm-250": "0,29 мОм/м", "gm-400": "0,23 мОм/м" } },
      { parameter: "Реактивний опір фази (Xl)", values: { "gm-100": "0,20 мОм/м", "gm-160": "0,13 мОм/м", "gm-250": "0,10 мОм/м", "gm-400": "0,08 мОм/м" } },
      { parameter: "Повний опір фази (Zl)", values: { "gm-100": "0,61 мОм/м", "gm-160": "0,40 мОм/м", "gm-250": "0,30 мОм/м", "gm-400": "0,06 мОм/м" } },
      { parameter: "Переріз фазного провідника", values: { "gm-100": "25 (50) мм²", "gm-160": "50 (75) мм²", "gm-250": "75 (100) мм²", "gm-400": "100 (125) мм²" } },
      { parameter: "Переріз нульового провідника", values: { "gm-100": "25 (50) мм²", "gm-160": "50 (75) мм²", "gm-250": "75 (100) мм²", "gm-400": "100 (125) мм²" } },
      { parameter: "Переріз алюмінієвого корпусу (SPE)", values: { "gm-100": "300 мм²", "gm-160": "300 мм²", "gm-250": "300 мм²", "gm-400": "300 мм²" } },
      { parameter: "Матеріал провідника", values: { "gm-100": "Алюміній (GMA)", "gm-160": "Алюміній (GMA) / Мідь (GMC)", "gm-250": "Алюміній (GMA) / Мідь (GMC)", "gm-400": "Алюміній (GMA) / Мідь (GMC)" } },
      { parameter: "Ступінь захисту", values: { "gm-100": "IP55", "gm-160": "IP55", "gm-250": "IP55", "gm-400": "IP55" } },
      { parameter: "Стандартна довжина елемента", values: { "gm-100": "3000 мм", "gm-160": "3000 мм", "gm-250": "3000 мм", "gm-400": "3000 мм" } },
      { parameter: "Струм відгалужувального вузла", values: { "gm-100": "16 А", "gm-160": "16 А", "gm-250": "16 А", "gm-400": "16 А" } },
    ],
    componentsEyebrow: "Компоненти системи",
    componentsHeadingPrefix: "Компоненти для",
    components: [
      { slug: "standard-length-element", name: "Стандартний елемент", orderCode: "GMA 10033 / 10035 / 16033 / 16035 / 22533 / 22535 / 40033 / 40035 · GMC 16033 / 16035 / 22533 / 22535 / 40033 / 40035", description: "3-метровий елемент шинопроводу в алюмінієвому корпусі в конфігураціях P+N+E+(AL корпус) та 3P+N+E+(AL корпус), з алюмінієвими (GMA) або мідними (GMC) провідниками.", image: `${IMAGE_BASE}/components/gm-standard-length-element-pnpe.webp`, imageAlt: "Стандартний елемент шинопроводу GM" },
      { slug: "feed-unit-left", name: "Ввідний елемент — лівий", orderCode: "GMA EF41 / GMC EF41", description: "Лівий ввідний елемент для живлення лінії шинопроводу; доступний у варіантах PEC, CE та ACK.", image: `${IMAGE_BASE}/components/gm-feed-unit-left.webp`, imageAlt: "Лівий ввідний елемент GM" },
      { slug: "feed-unit-right", name: "Ввідний елемент — правий", orderCode: "GMA EF42 / GMC EF42", description: "Правий ввідний елемент для живлення лінії шинопроводу; доступний у варіантах PEC, CE та ACK.", image: `${IMAGE_BASE}/components/gm-feed-unit-right.webp`, imageAlt: "Правий ввідний елемент GM" },
      { slug: "centre-feed-unit", name: "Центральний ввідний елемент", orderCode: "GMA EF43 / GMC EF43", description: "Центральний ввідний елемент 3P+N+1/2 PE для живлення лінії з проміжної точки.", image: `${IMAGE_BASE}/components/gm-centre-feed-unit.webp`, imageAlt: "Центральний ввідний елемент GM" },
      { slug: "flexible-joint", name: "Гнучкий зʼєднувач для кута", orderCode: "GMA 160FX / GMC 225FX", description: "Гнучкий зʼєднувач довжиною 1000 мм для зміни напрямку траси.", image: `${IMAGE_BASE}/components/gm-flexible-joint-main.webp`, imageAlt: "Гнучкий зʼєднувач GM для кута" },
      { slug: "lighting-fixture-jack", name: "Відгалужувальний вузол для світильника", orderCode: "GM 16L1 / 16L2 / 16L3 / 16L4-1", description: "Штепсельний відгалужувальний вузол на 16 А; стандартна довжина кабелю — 1000 мм.", image: `${IMAGE_BASE}/components/gm-lighting-fixture-jack.webp`, imageAlt: "Відгалужувальний вузол GM для світильника" },
      { slug: "glass-fuse-jack", name: "Відгалужувальний вузол зі скляним запобіжником", orderCode: "GM 16F1 / 16F2 / 16F3 / 16F4-1", description: "Штепсельний відгалужувальний вузол на 16 А з вбудованим скляним запобіжником.", image: `${IMAGE_BASE}/components/gm-glass-fuse-jack.webp`, imageAlt: "Відгалужувальний вузол GM зі скляним запобіжником" },
      { slug: "mcb-tap-off-box", name: "Відгалужувальна коробка типу MCB", orderCode: "GM F32W / GM F32G", description: "Відгалужувальна коробка типу MCB на 3×32 А.", image: `${IMAGE_BASE}/components/gm-mcb-tap-off-box.webp`, imageAlt: "Відгалужувальна коробка GM типу MCB" },
      { slug: "end-cap", name: "Заглушка", orderCode: "GM EC40", description: "Закриває відкритий кінець ввідного елемента в кінці лінії.", image: `${IMAGE_BASE}/components/gm-end-cap.webp`, imageAlt: "Заглушка GM" },
      { slug: "joint-cover", name: "Кришка зʼєднання IP55", orderCode: "GM ALC", description: "Закриває кожне зʼєднання елементів, відновлюючи захист IP55.", image: `${IMAGE_BASE}/components/gm-joint-cover.webp`, imageAlt: "Кришка зʼєднання IP55 GM" },
      { slug: "fixture-fixing-hanger", name: "Підвіс для кріплення світильника", orderCode: "GM SSU1 / SSU2", description: "Підвіс для кріплення світильників до системи шинопроводу.", image: `${IMAGE_BASE}/components/gm-fixture-fixing-hanger-ssu2.webp`, imageAlt: "Підвіс GM для кріплення світильника" },
      { slug: "busbar-fixing-hanger", name: "Підвіс для кріплення шинопроводу", orderCode: "GM SSU3", description: "Опорний підвіс; рекомендована відстань — 1500–2000 мм.", image: `${IMAGE_BASE}/components/gm-busbar-fixing-hanger-ssu3.webp`, imageAlt: "Підвіс GM для кріплення шинопроводу" },
    ],
    documentsTabLabel: "Документи",
    documents: [
      {
        title: "Каталог шинопровідних систем Gersan",
        description:
          "Повний каталог з усіма шинопровідними системами Gersan, включно з технічними даними GM.",
        fileLabel: "PDF · 25,1 МБ",
        href: "/assets/documents/busbar/gersan-busbar-systems-catalogue.pdf",
        downloadLabel: "Завантажити каталог",
      },
      {
        title: "Інструкція з монтажу GM",
        description:
          "Короткий довідник із з'єднання двох елементів шинопроводу GM: вирівнювання, момент затяжки барної системи з'єднання та закриття кришки IP55.",
        fileLabel: "PDF",
        href: `${IMAGE_BASE}/installation/GM_Busbar_Installation_Guide.pdf`,
        downloadLabel: "Завантажити інструкцію з монтажу",
      },
    ],
    requestQuoteHref: "/uk-support?product=gm-low-power-busbar",
    requestDocumentationHref: "/#technical-documents",
  },
} as const satisfies BusbarSystemDetailByMarket;

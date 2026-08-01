import type { BusbarSystemDetailByMarket } from "./types";

const SPEC_COLUMNS = [
  { id: "gnl-25", label: "GNL 25A" },
  { id: "gnl-40", label: "GNL 40A" },
] as const;

const IMAGE_BASE = "/assets/products/busbar/gnl";

export const GNL_SYSTEM_DETAIL = {
  uk: {
    slug: "gnl-lighting-busbar",
    categoryEyebrow: "Lighting Busbar System",
    heroDescription:
      "GNL is a 25 A and 40 A lighting busbar trunking system for energising lighting circuits and raised-floor supply points, built from 3 m aluminium-housing elements with copper conductors and silver-plated contacts.",
    heroImages: [
      {
        accentGlow: true,
        image: `${IMAGE_BASE}/products/gnl-standard-length-element-dali.png`,
        imageAlt: "GNL lighting busbar DALI standard length element",
      },
      {
        accentGlow: true,
        image: `${IMAGE_BASE}/products/gnl-standard-length-element-pnpe.png`,
        imageAlt: "GNL lighting busbar standard length element",
      },
      {
        image: `${IMAGE_BASE}/products/gnl-application-installation-01.png`,
        imageAlt: "GNL lighting busbar installed above racking with cable trays",
      },
      {
        image: `${IMAGE_BASE}/products/gnl-application-installation-02.png`,
        imageAlt: "GNL lighting busbar installed in a high-ceiling industrial facility",
      },
      {
        image: `${IMAGE_BASE}/products/gnl-busbar-cutaway-drawing-hero.png`,
        imageAlt: "GNL lighting busbar cutaway drawing showing internal conductor layout",
      },
    ],
    heroPreviousLabel: "Previous image",
    heroNextLabel: "Next image",
    facts: [
      { value: "25–40 A", label: "Current rating" },
      { value: "IP55", label: "Protection degree" },
      { value: "690 V", label: "Insulation voltage (Ui)" },
      { value: "3000 mm", label: "Standard element length" },
    ],
    overviewEyebrow: "Overview",
    overviewHighlights: [
      "Aluminium housing with copper conductors and silver-plated connection contacts",
      "Aluminium body also gives a decorative finish and can serve as an additional PE (Pec) conductor",
      "Available in P+N+PEc, 3P+N+E (aluminium housing) and DALI configurations, with 2–5 conductor options",
      "Plug-in lighting fixture jacks rated 10 A, with a glass-fuse protected variant",
      "Modular, tight-fitting joint system with IP55-protected joints and a dedicated joint cover",
      "Wide range of accessories, full international certification and CE marking",
      "Recommended support hanger spacing of 1500–2000 mm",
    ],
    technicalDataEyebrow: "Technical data",
    technicalDataHeading: "Ratings & specification",
    parameterHeading: "Parameter",
    specColumns: SPEC_COLUMNS,
    specRows: [
      {
        parameter: "Rated current (In)",
        values: { "gnl-25": "25 A", "gnl-40": "40 A" },
      },
      {
        parameter: "Insulation voltage (Ui)",
        values: { "gnl-25": "690 V", "gnl-40": "690 V" },
      },
      {
        parameter: "Rated operational voltage (Ue)",
        values: { "gnl-25": "690 V", "gnl-40": "690 V" },
      },
      {
        parameter: "Frequency (fn)",
        values: { "gnl-25": "50/60 Hz", "gnl-40": "50/60 Hz" },
      },
      {
        parameter: "Short-circuit withstand current, 1s (Icw)",
        values: { "gnl-25": "2.5 kA rms", "gnl-40": "2.5 kA rms" },
      },
      {
        parameter: "Peak withstand current (Ipk)",
        values: { "gnl-25": "3.75 kA", "gnl-40": "3.75 kA" },
      },
      {
        parameter: "Phase resistance (R20)",
        values: { "gnl-25": "7.2 mΩ/m", "gnl-40": "4.5 mΩ/m" },
      },
      {
        parameter: "Phase resistance (Rl)",
        values: { "gnl-25": "9.6 mΩ/m", "gnl-40": "6.03 mΩ/m" },
      },
      {
        parameter: "Phase reactance (Xl)",
        values: { "gnl-25": "12 mΩ/m", "gnl-40": "7.5 mΩ/m" },
      },
      {
        parameter: "Phase impedance (Zl)",
        values: { "gnl-25": "15.3 mΩ/m", "gnl-40": "9.6 mΩ/m" },
      },
      {
        parameter: "Phase conductor cross-section",
        values: { "gnl-25": "2.5 mm²", "gnl-40": "4 mm²" },
      },
      {
        parameter: "Neutral conductor cross-section",
        values: { "gnl-25": "2.5 mm²", "gnl-40": "4 mm²" },
      },
      {
        parameter: "Aluminium housing cross-section (SPE)",
        values: { "gnl-25": "153.60 mm²", "gnl-40": "153.60 mm²" },
      },
      {
        parameter: "Conductor material",
        values: { "gnl-25": "Copper", "gnl-40": "Copper" },
      },
      {
        parameter: "Protection degree",
        values: { "gnl-25": "IP55", "gnl-40": "IP55" },
      },
      {
        parameter: "Standard element length",
        values: { "gnl-25": "3000 mm", "gnl-40": "3000 mm" },
      },
      {
        parameter: "Lighting fixture jack current",
        values: { "gnl-25": "10 A", "gnl-40": "10 A" },
      },
    ],
    componentsEyebrow: "System components",
    componentsHeadingPrefix: "Components for",
    components: [
      {
        slug: "standard-length-element",
        name: "Standard Length Element",
        orderCode: "GNL 2533 / 2535 / 25355 / 4033 / 4035 / 40355",
        description:
          "3 m aluminium busbar element available in P+N+PEc, 3P+N+E (aluminium housing) and DALI configurations.",
        image: `${IMAGE_BASE}/products/gnl-standard-length-element-pnpe.png`,
        imageAlt: "GNL standard length busbar element",
      },
      {
        slug: "feed-unit-left",
        name: "Feed Unit — Left",
        orderCode: "GNL EF41",
        description: "Left-hand feed unit for supplying the busbar run.",
        image: `${IMAGE_BASE}/components/gnl-feed-unit-left.webp`,
        imageAlt: "GNL left feed unit",
      },
      {
        slug: "feed-unit-right",
        name: "Feed Unit — Right",
        orderCode: "GNL EF42",
        description: "Right-hand feed unit for supplying the busbar run.",
        image: `${IMAGE_BASE}/components/gnl-feed-unit-right.webp`,
        imageAlt: "GNL right feed unit",
      },
      {
        slug: "centre-feed-unit",
        name: "Centre Feed Unit",
        orderCode: "GNL EF43",
        description:
          "3P+N+1/2 PE centre-feed unit for supplying the busbar run from a mid-span point.",
        image: `${IMAGE_BASE}/components/gnl-centre-feed-unit.webp`,
        imageAlt: "GNL centre feed unit",
      },
      {
        slug: "flexible-joint",
        name: "Flexible Joint for Elbow",
        orderCode: "GNL 40FX",
        description:
          "Flexible joint used to change direction where a rigid elbow is not practical.",
        image: `${IMAGE_BASE}/components/gnl-flexible-joint.webp`,
        imageAlt: "GNL flexible joint for elbow",
      },
      {
        slug: "lighting-fixture-jack",
        name: "Lighting Fixture Jack",
        orderCode: "GNL 10L1–10L4",
        description:
          "10 A plug-in tap-off jack for connecting lighting fixtures along the busbar run.",
        image: `${IMAGE_BASE}/components/gnl-lighting-fixture-jack.webp`,
        imageAlt: "GNL lighting fixture jack",
      },
      {
        slug: "glass-fuse-jack",
        name: "Lighting Fixture Jack with Glass Fuse",
        orderCode: "GNL 10F1–10F4",
        description:
          "10 A plug-in tap-off jack with integrated glass-fuse protection.",
        image: `${IMAGE_BASE}/components/gnl-glass-fuse-jack.webp`,
        imageAlt: "GNL lighting fixture jack with glass fuse",
      },
      {
        slug: "end-cap",
        name: "End Cap",
        orderCode: "GNL EC40 / EC41",
        description: "Closes the open end of a feed unit at the end of a run.",
        image: `${IMAGE_BASE}/components/gnl-end-cap.webp`,
        imageAlt: "GNL end cap",
      },
      {
        slug: "joint-cover",
        name: "IP55 Joint Cover",
        orderCode: "GNL ALC",
        description:
          "Covers each element joint to restore IP55 and mechanical protection.",
        image: `${IMAGE_BASE}/components/gnl-joint-cover.webp`,
        imageAlt: "GNL IP55 joint cover",
      },
      {
        slug: "fixture-fixing-hanger",
        name: "Lighting Fixture Fixing Hanger",
        orderCode: "GNL SSU1 / SSU2",
        description: "Hanger for fixing lighting fixtures to the busbar system.",
        image: `${IMAGE_BASE}/components/gnl-fixture-fixing-hanger-ssu2.webp`,
        imageAlt: "GNL lighting fixture fixing hanger",
      },
      {
        slug: "busbar-fixing-hanger",
        name: "Busbar Fixing Hanger",
        orderCode: "GNL SSU3",
        description:
          "Support hanger for the busbar run; recommended spacing is 1500–2000 mm.",
        image: `${IMAGE_BASE}/components/gnl-busbar-fixing-hanger-ssu3.webp`,
        imageAlt: "GNL busbar fixing hanger",
      },
    ],
    documentsTabLabel: "Documents",
    documents: [
      {
        title: "Gersan Busbar Systems Catalogue",
        description:
          "Full product catalogue covering all Gersan busbar trunking systems, including GNL technical data, order codes and dimensional drawings.",
        fileLabel: "PDF · 25.1 MB",
        href: "/assets/documents/busbar/gersan-busbar-systems-catalogue.pdf",
        downloadLabel: "Download catalogue",
      },
      {
        title: "GNL Installation Guide",
        description:
          "Quick reference for joining two GNL busbar elements: alignment, M4 fixing and joint set, and closing the IP55 joint cover.",
        fileLabel: "PDF · 375 KB",
        href: `${IMAGE_BASE}/installation/GNL_Busbar_Installation_Guide.pdf`,
        downloadLabel: "Download installation guide",
      },
    ],
    requestQuoteHref: "/uk-support?product=gnl-lighting-busbar",
    requestDocumentationHref: "/#technical-documents",
  },
  ua: {
    slug: "gnl-lighting-busbar",
    categoryEyebrow: "Освітлювальна шинопровідна система",
    heroDescription:
      "GNL — освітлювальна шинопровідна система на 25 А та 40 А для живлення освітлювальних кіл і точок підключення в фальшпідлогах. Виготовляється з 3-метрових елементів в алюмінієвому корпусі з мідними провідниками та посрібленими контактами.",
    heroImages: [
      {
        accentGlow: true,
        image: `${IMAGE_BASE}/products/gnl-standard-length-element-dali.png`,
        imageAlt: "Стандартний елемент шинопроводу GNL, варіант DALI",
      },
      {
        accentGlow: true,
        image: `${IMAGE_BASE}/products/gnl-standard-length-element-pnpe.png`,
        imageAlt: "Стандартний елемент шинопроводу GNL",
      },
      {
        image: `${IMAGE_BASE}/products/gnl-application-installation-01.png`,
        imageAlt:
          "Освітлювальна шинопровідна система GNL над стелажами з кабельними лотками",
      },
      {
        image: `${IMAGE_BASE}/products/gnl-application-installation-02.png`,
        imageAlt:
          "Освітлювальна шинопровідна система GNL, встановлена на промисловому об'єкті з високими стелями",
      },
      {
        image: `${IMAGE_BASE}/products/gnl-busbar-cutaway-drawing-hero.png`,
        imageAlt:
          "Креслення в розрізі шинопроводу GNL з внутрішнім розташуванням провідників",
      },
    ],
    heroPreviousLabel: "Попереднє зображення",
    heroNextLabel: "Наступне зображення",
    facts: [
      { value: "25–40 А", label: "Номінальний струм" },
      { value: "IP55", label: "Ступінь захисту" },
      { value: "690 В", label: "Ізоляційна напруга (Ui)" },
      { value: "3000 мм", label: "Стандартна довжина елемента" },
    ],
    overviewEyebrow: "Огляд",
    overviewHighlights: [
      "Алюмінієвий корпус з мідними провідниками та посрібленими контактами з'єднання",
      "Алюмінієвий корпус також надає декоративний вигляд і може слугувати додатковим провідником PE (Pec)",
      "Доступна в конфігураціях P+N+PEc, 3P+N+E (алюмінієвий корпус) та DALI, з 2–5 варіантами провідників",
      "Штепсельні відгалужувальні вузли для світильників на 10 А, є варіант із захистом скляним запобіжником",
      "Модульна, щільна система з'єднання із захистом IP55 та спеціальною кришкою з'єднання",
      "Широкий асортимент аксесуарів, повна міжнародна сертифікація та маркування CE",
      "Рекомендована відстань між опорними підвісами — 1500–2000 мм",
    ],
    technicalDataEyebrow: "Технічні дані",
    technicalDataHeading: "Параметри та характеристики",
    parameterHeading: "Параметр",
    specColumns: SPEC_COLUMNS,
    specRows: [
      {
        parameter: "Номінальний струм (In)",
        values: { "gnl-25": "25 А", "gnl-40": "40 А" },
      },
      {
        parameter: "Ізоляційна напруга (Ui)",
        values: { "gnl-25": "690 В", "gnl-40": "690 В" },
      },
      {
        parameter: "Номінальна робоча напруга (Ue)",
        values: { "gnl-25": "690 В", "gnl-40": "690 В" },
      },
      {
        parameter: "Частота (fn)",
        values: { "gnl-25": "50/60 Гц", "gnl-40": "50/60 Гц" },
      },
      {
        parameter: "Струм короткого замикання, 1с (Icw)",
        values: { "gnl-25": "2.5 кА, діюче", "gnl-40": "2.5 кА, діюче" },
      },
      {
        parameter: "Пікова витримувана напруга струму (Ipk)",
        values: { "gnl-25": "3.75 кА", "gnl-40": "3.75 кА" },
      },
      {
        parameter: "Опір фази (R20)",
        values: { "gnl-25": "7.2 мОм/м", "gnl-40": "4.5 мОм/м" },
      },
      {
        parameter: "Опір фази (Rl)",
        values: { "gnl-25": "9.6 мОм/м", "gnl-40": "6.03 мОм/м" },
      },
      {
        parameter: "Реактивний опір фази (Xl)",
        values: { "gnl-25": "12 мОм/м", "gnl-40": "7.5 мОм/м" },
      },
      {
        parameter: "Повний опір фази (Zl)",
        values: { "gnl-25": "15.3 мОм/м", "gnl-40": "9.6 мОм/м" },
      },
      {
        parameter: "Переріз фазного провідника",
        values: { "gnl-25": "2.5 мм²", "gnl-40": "4 мм²" },
      },
      {
        parameter: "Переріз нульового провідника",
        values: { "gnl-25": "2.5 мм²", "gnl-40": "4 мм²" },
      },
      {
        parameter: "Переріз алюмінієвого корпусу (SPE)",
        values: { "gnl-25": "153.60 мм²", "gnl-40": "153.60 мм²" },
      },
      {
        parameter: "Матеріал провідника",
        values: { "gnl-25": "Мідь", "gnl-40": "Мідь" },
      },
      {
        parameter: "Ступінь захисту",
        values: { "gnl-25": "IP55", "gnl-40": "IP55" },
      },
      {
        parameter: "Стандартна довжина елемента",
        values: { "gnl-25": "3000 мм", "gnl-40": "3000 мм" },
      },
      {
        parameter: "Струм відгалужувального вузла",
        values: { "gnl-25": "10 А", "gnl-40": "10 А" },
      },
    ],
    componentsEyebrow: "Компоненти системи",
    componentsHeadingPrefix: "Компоненти для",
    components: [
      {
        slug: "standard-length-element",
        name: "Стандартний елемент",
        orderCode: "GNL 2533 / 2535 / 25355 / 4033 / 4035 / 40355",
        description:
          "3-метровий алюмінієвий елемент шинопроводу в конфігураціях P+N+PEc, 3P+N+E (алюмінієвий корпус) та DALI.",
        image: `${IMAGE_BASE}/products/gnl-standard-length-element-pnpe.png`,
        imageAlt: "Стандартний елемент шинопроводу GNL",
      },
      {
        slug: "feed-unit-left",
        name: "Ввідний елемент — лівий",
        orderCode: "GNL EF41",
        description: "Лівий ввідний елемент для живлення лінії шинопроводу.",
        image: `${IMAGE_BASE}/components/gnl-feed-unit-left.webp`,
        imageAlt: "Лівий ввідний елемент GNL",
      },
      {
        slug: "feed-unit-right",
        name: "Ввідний елемент — правий",
        orderCode: "GNL EF42",
        description: "Правий ввідний елемент для живлення лінії шинопроводу.",
        image: `${IMAGE_BASE}/components/gnl-feed-unit-right.webp`,
        imageAlt: "Правий ввідний елемент GNL",
      },
      {
        slug: "centre-feed-unit",
        name: "Центральний ввідний елемент",
        orderCode: "GNL EF43",
        description:
          "Центральний ввідний елемент 3P+N+1/2 PE для живлення лінії з проміжної точки.",
        image: `${IMAGE_BASE}/components/gnl-centre-feed-unit.webp`,
        imageAlt: "Центральний ввідний елемент GNL",
      },
      {
        slug: "flexible-joint",
        name: "Гнучкий з'єднувач для кута",
        orderCode: "GNL 40FX",
        description:
          "Гнучкий з'єднувач для зміни напрямку траси там, де жорсткий кутовий елемент непрактичний.",
        image: `${IMAGE_BASE}/components/gnl-flexible-joint.webp`,
        imageAlt: "Гнучкий з'єднувач GNL для кута",
      },
      {
        slug: "lighting-fixture-jack",
        name: "Відгалужувальний вузол для світильника",
        orderCode: "GNL 10L1–10L4",
        description:
          "Штепсельний відгалужувальний вузол на 10 А для підключення світильників уздовж лінії шинопроводу.",
        image: `${IMAGE_BASE}/components/gnl-lighting-fixture-jack.webp`,
        imageAlt: "Відгалужувальний вузол GNL для світильника",
      },
      {
        slug: "glass-fuse-jack",
        name: "Відгалужувальний вузол зі скляним запобіжником",
        orderCode: "GNL 10F1–10F4",
        description:
          "Штепсельний відгалужувальний вузол на 10 А з вбудованим скляним запобіжником.",
        image: `${IMAGE_BASE}/components/gnl-glass-fuse-jack.webp`,
        imageAlt: "Відгалужувальний вузол GNL зі скляним запобіжником",
      },
      {
        slug: "end-cap",
        name: "Заглушка",
        orderCode: "GNL EC40 / EC41",
        description: "Закриває відкритий кінець ввідного елемента в кінці лінії.",
        image: `${IMAGE_BASE}/components/gnl-end-cap.webp`,
        imageAlt: "Заглушка GNL",
      },
      {
        slug: "joint-cover",
        name: "Кришка з'єднання IP55",
        orderCode: "GNL ALC",
        description:
          "Закриває кожне з'єднання елементів, відновлюючи захист IP55 та механічний захист.",
        image: `${IMAGE_BASE}/components/gnl-joint-cover.webp`,
        imageAlt: "Кришка з'єднання IP55 GNL",
      },
      {
        slug: "fixture-fixing-hanger",
        name: "Підвіс для кріплення світильника",
        orderCode: "GNL SSU1 / SSU2",
        description: "Підвіс для кріплення світильників до системи шинопроводу.",
        image: `${IMAGE_BASE}/components/gnl-fixture-fixing-hanger-ssu2.webp`,
        imageAlt: "Підвіс GNL для кріплення світильника",
      },
      {
        slug: "busbar-fixing-hanger",
        name: "Підвіс для кріплення шинопроводу",
        orderCode: "GNL SSU3",
        description:
          "Опорний підвіс для лінії шинопроводу; рекомендована відстань — 1500–2000 мм.",
        image: `${IMAGE_BASE}/components/gnl-busbar-fixing-hanger-ssu3.webp`,
        imageAlt: "Підвіс GNL для кріплення шинопроводу",
      },
    ],
    documentsTabLabel: "Документи",
    documents: [
      {
        title: "Каталог шинопровідних систем Gersan",
        description:
          "Повний каталог продукції з усіма шинопровідними системами Gersan, включно з технічними даними GNL, кодами замовлення та кресленнями розмірів.",
        fileLabel: "PDF · 25.1 МБ",
        href: "/assets/documents/busbar/gersan-busbar-systems-catalogue.pdf",
        downloadLabel: "Завантажити каталог",
      },
      {
        title: "Інструкція з монтажу GNL",
        description:
          "Короткий довідник із з'єднання двох елементів шинопроводу GNL: вирівнювання, кріплення M4 з комплектом з'єднання та закриття кришки IP55.",
        fileLabel: "PDF · 375 КБ",
        href: `${IMAGE_BASE}/installation/GNL_Busbar_Installation_Guide.pdf`,
        downloadLabel: "Завантажити інструкцію з монтажу",
      },
    ],
    requestQuoteHref: "/uk-support?product=gnl-lighting-busbar",
    requestDocumentationHref: "/#technical-documents",
  },
} as const satisfies BusbarSystemDetailByMarket;

import type { BusbarSystemDetailByMarket } from "./types";

const SPEC_COLUMNS = [
  { id: "gl-40", label: "GL 40A" },
  { id: "gl-63", label: "GL 63A" },
  { id: "gl-100", label: "GL 100A" },
] as const;

const IMAGE_BASE = "/assets/products/busbar/gl";

export const GL_SYSTEM_DETAIL = {
  uk: {
    slug: "gl-lighting-busbar",
    categoryEyebrow: "Lighting Busbar System",
    heroDescription:
      "GL is a 40 A to 100 A lighting busbar trunking system designed for industrial and commercial lighting distribution, built from 3 m aluminium-housing elements with aluminium or copper conductors and silver-plated contacts.",
    heroFeatureImage: `${IMAGE_BASE}/card/gl-main-product.webp`,
    heroFeatureImageAlt: "GL lighting busbar system main product view",
    heroImages: [
      {
        image: `${IMAGE_BASE}/applications/gl-main-product-01.webp`,
        imageAlt: "GL lighting busbar system",
        label: "GL busbar system",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gl-main-product-02.webp`,
        imageAlt: "GL lighting busbar system detail view",
        label: "GL busbar detail",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gl-industrial-application-01.webp`,
        imageAlt: "GL lighting busbar installed in an industrial facility",
        label: "Industrial installation",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gl-application-installation-.png`,
        imageAlt: "GL lighting busbar installation",
        label: "Installation",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gl-system-overview-drawing.png`,
        imageAlt: "GL busbar system overview drawing",
        label: "System overview",
        fit: "contain",
      },
    ],
    heroPreviousLabel: "Previous image",
    heroNextLabel: "Next image",
    heroGalleryLabel: "GL product gallery",
    heroFullscreenLabel: "View full screen",
    heroCloseLabel: "Close full-screen image",
    facts: [
      { value: "40–100 A", label: "Current rating" },
      { value: "IP55", label: "Protection degree" },
      { value: "690 V", label: "Insulation voltage (Ui)" },
      { value: "3000 mm", label: "Standard element length" },
    ],
    overviewEyebrow: "Overview",
    overviewHighlights: [
      "Aluminium or copper conductor options (GLA / GLC) to suit project requirements",
      "Aluminium housing with silver-plated connection contacts for reliable, low-resistance joints",
      "Available in P+N+E+(AL housing) and 3P+N+E+(AL housing) configurations with 2–5 conductor options",
      "16 A plug-in lighting fixture jacks with a glass-fuse protected variant",
      "MCB-type tap-off boxes for protected sub-circuit connections",
      "Modular tight-fitting joint system with IP55-protected joints and a dedicated joint cover",
      "Wide range of accessories with full international certification and CE marking",
      "Recommended support hanger spacing of 1500–2000 mm",
    ],
    applicationsEyebrow: "Applications",
    applicationsHeading: "Where GL is used",
    applicationsDescription:
      "GL provides flexible, continuous lighting distribution for industrial and commercial environments where higher current ratings and a choice of conductor material are required.",
    applications: [
      {
        slug: "retail-supermarkets",
        title: "Retail & Supermarkets",
        description:
          "Adaptable lighting distribution for supermarkets, showrooms and retail units.",
        image: "/assets/products/busbar/applications/busbar-application-retail.webp",
        imageAlt: "Retail interior with adaptable overhead lighting distribution",
      },
      {
        slug: "warehouses-logistics",
        title: "Warehouses & Logistics",
        description:
          "Continuous lighting distribution above storage aisles, picking areas and logistics operations.",
        image: "/assets/products/busbar/applications/busbar-application-warehouse.webp",
        imageAlt:
          "Industrial warehouse with continuous overhead lighting above storage and logistics areas",
      },
      {
        slug: "commercial-buildings",
        title: "Commercial Buildings",
        description:
          "Adaptable lighting distribution for offices, retail units and mixed-use commercial interiors.",
        image: "/assets/industries/cards/commercial-buildings.webp",
        imageAlt: "Illuminated commercial office towers at dusk",
      },
      {
        slug: "industrial-facilities",
        title: "Industrial Facilities",
        description:
          "Flexible lighting connections for production areas, workshops and high-ceiling industrial spaces requiring 40–100 A capacity.",
        image: "/assets/industries/cards/industrial-facilities.webp",
        imageAlt: "Industrial production facility interior",
      },
      {
        slug: "education-public-sector",
        title: "Education & Public Sector",
        description:
          "Continuous, low-maintenance lighting distribution for institutional and civic buildings.",
        image: "/assets/industries/cards/education-public-sector.webp",
        imageAlt: "University building lighting distribution context",
      },
    ],
    technicalDataEyebrow: "Technical data",
    technicalDataHeading: "Ratings & specification",
    parameterHeading: "Parameter",
    specColumns: SPEC_COLUMNS,
    specRows: [
      {
        parameter: "Rated current (In)",
        values: { "gl-40": "40 A", "gl-63": "63 A", "gl-100": "100 A" },
      },
      {
        parameter: "Insulation voltage (Ui)",
        values: { "gl-40": "690 V", "gl-63": "690 V", "gl-100": "690 V" },
      },
      {
        parameter: "Rated operational voltage (Ue)",
        values: { "gl-40": "690 V", "gl-63": "690 V", "gl-100": "690 V" },
      },
      {
        parameter: "Frequency (fn)",
        values: {
          "gl-40": "50/60 Hz",
          "gl-63": "50/60 Hz",
          "gl-100": "50/60 Hz",
        },
      },
      {
        parameter: "Short-circuit withstand current, 1s (Icw)",
        values: {
          "gl-40": "3 kA rms",
          "gl-63": "3 kA rms",
          "gl-100": "3.5 kA rms",
        },
      },
      {
        parameter: "Peak withstand current (Ipk)",
        values: { "gl-40": "4.5 kA", "gl-63": "4.5 kA", "gl-100": "5.25 kA" },
      },
      {
        parameter: "Phase resistance (R20)",
        values: {
          "gl-40": "1.8 mΩ/m",
          "gl-63": "1.28 mΩ/m",
          "gl-100": "0.9 mΩ/m",
        },
      },
      {
        parameter: "Phase resistance (Rl)",
        values: {
          "gl-40": "2.41 mΩ/m",
          "gl-63": "1.71 mΩ/m",
          "gl-100": "1.2 mΩ/m",
        },
      },
      {
        parameter: "Phase reactance (Xl)",
        values: {
          "gl-40": "0.98 mΩ/m",
          "gl-63": "0.7 mΩ/m",
          "gl-100": "0.43 mΩ/m",
        },
      },
      {
        parameter: "Phase impedance (Zl)",
        values: {
          "gl-40": "2.61 mΩ/m",
          "gl-63": "1.85 mΩ/m",
          "gl-100": "1.3 mΩ/m",
        },
      },
      {
        parameter: "Phase conductor cross-section",
        values: { "gl-40": "10 mm²", "gl-63": "14 mm²", "gl-100": "26 mm²" },
      },
      {
        parameter: "Neutral conductor cross-section",
        values: { "gl-40": "10 mm²", "gl-63": "14 mm²", "gl-100": "26 mm²" },
      },
      {
        parameter: "Aluminium housing cross-section (SPE)",
        values: {
          "gl-40": "280 mm²",
          "gl-63": "280 mm²",
          "gl-100": "280 mm²",
        },
      },
      {
        parameter: "Conductor material",
        values: {
          "gl-40": "Aluminium (GLA)",
          "gl-63": "Aluminium (GLA) / Copper (GLC)",
          "gl-100": "Copper (GLC)",
        },
      },
      {
        parameter: "Protection degree",
        values: { "gl-40": "IP55", "gl-63": "IP55", "gl-100": "IP55" },
      },
      {
        parameter: "Standard element length",
        values: {
          "gl-40": "3000 mm",
          "gl-63": "3000 mm",
          "gl-100": "3000 mm",
        },
      },
      {
        parameter: "Lighting fixture jack current",
        values: { "gl-40": "16 A", "gl-63": "16 A", "gl-100": "16 A" },
      },
    ],
    componentsEyebrow: "System components",
    componentsHeadingPrefix: "Components for",
    components: [
      {
        slug: "standard-length-element",
        name: "Standard Length Element",
        orderCode: "GLA 4033 / 4035 / 6333 / 6335 · GLC 6333 / 6335 / 10033 / 10035",
        description:
          "3 m aluminium-housing busbar element in P+N+E+(AL housing) and 3P+N+E+(AL housing) configurations, available with aluminium or copper conductors.",
        image: `${IMAGE_BASE}/components/gl-standard-length-element-pnpe.webp`,
        imageAlt: "GL standard length busbar element",
      },
      {
        slug: "feed-unit-left",
        name: "Feed Unit — Left",
        orderCode: "GLA EF41 / GLC EF41",
        description: "Left-hand feed unit for supplying the busbar run.",
        image: `${IMAGE_BASE}/components/gl-feed-unit-left.webp`,
        imageAlt: "GL left feed unit",
      },
      {
        slug: "feed-unit-right",
        name: "Feed Unit — Right",
        orderCode: "GLA EF42 / GLC EF42",
        description: "Right-hand feed unit for supplying the busbar run.",
        image: `${IMAGE_BASE}/components/gl-feed-unit-right.webp`,
        imageAlt: "GL right feed unit",
      },
      {
        slug: "centre-feed-unit",
        name: "Centre Feed Unit",
        orderCode: "GLA EF43 / GLC EF43",
        description:
          "3P+N+1/2 PE centre-feed unit for supplying the busbar run from a mid-span point.",
        image: `${IMAGE_BASE}/components/gl-centre-feed-unit.webp`,
        imageAlt: "GL centre feed unit",
      },
      {
        slug: "flexible-joint",
        name: "Flexible Joint for Elbow",
        orderCode: "GLA 63FX / GLC 160FX",
        description:
          "Flexible joint used to change direction where a rigid elbow is not practical.",
        image: `${IMAGE_BASE}/components/gl-flexible-joint.webp`,
        imageAlt: "GL flexible joint for elbow",
      },
      {
        slug: "lighting-fixture-jack",
        name: "Lighting Fixture Jack",
        orderCode: "GL 16L1–16L4",
        description:
          "16 A plug-in tap-off jack for connecting lighting fixtures along the busbar run.",
        image: `${IMAGE_BASE}/components/gl-lighting-fixture-jack.webp`,
        imageAlt: "GL lighting fixture jack",
      },
      {
        slug: "glass-fuse-jack",
        name: "Lighting Fixture Jack with Glass Fuse",
        orderCode: "GL 16F1–16F4",
        description:
          "16 A plug-in tap-off jack with integrated glass-fuse protection.",
        image: `${IMAGE_BASE}/components/gl-glass-fuse-jack.webp`,
        imageAlt: "GL lighting fixture jack with glass fuse",
      },
      {
        slug: "mcb-tap-off-box",
        name: "MCB Tap-Off Box",
        orderCode: "GL F32W / GL F32G",
        description:
          "MCB-type tap-off box for protected sub-circuit connections from the busbar run.",
        image: `${IMAGE_BASE}/components/gl-mcb-tap-off-box.webp`,
        imageAlt: "GL MCB tap-off box",
      },
      {
        slug: "end-cap",
        name: "End Cap",
        orderCode: "GL EC40",
        description: "Closes the open end of a feed unit at the end of a run.",
        image: `${IMAGE_BASE}/components/gl-end-cap.webp`,
        imageAlt: "GL end cap",
      },
      {
        slug: "joint-cover",
        name: "IP55 Joint Cover",
        orderCode: "GL ALC",
        description:
          "Covers each element joint to restore IP55 and mechanical protection.",
        image: `${IMAGE_BASE}/components/gl-joint-cover.webp`,
        imageAlt: "GL IP55 joint cover",
      },
      {
        slug: "fixture-fixing-hanger",
        name: "Lighting Fixture Fixing Hanger",
        orderCode: "GL SSU1 / SSU2",
        description:
          "Hanger for fixing lighting fixtures to the busbar system.",
        image: `${IMAGE_BASE}/components/gl-fixture-fixing-hanger-ssu2.webp`,
        imageAlt: "GL lighting fixture fixing hanger",
      },
      {
        slug: "busbar-fixing-hanger",
        name: "Busbar Fixing Hanger",
        orderCode: "GL SSU3",
        description:
          "Support hanger for the busbar run; recommended spacing is 1500–2000 mm.",
        image: `${IMAGE_BASE}/components/gl-busbar-fixing-hanger-ssu3.webp`,
        imageAlt: "GL busbar fixing hanger",
      },
    ],
    documentsTabLabel: "Documents",
    documents: [
      {
        title: "Gersan Busbar Systems Catalogue",
        description:
          "Full product catalogue covering all Gersan busbar trunking systems, including GL technical data, order codes and dimensional drawings.",
        fileLabel: "PDF · 25.1 MB",
        href: "/assets/documents/busbar/gersan-busbar-systems-catalogue.pdf",
        downloadLabel: "Download catalogue",
      },
      {
        title: "GL Installation Guide",
        description:
          "Quick reference for joining two GL busbar elements: alignment, M5 fixing and joint set, and closing the IP55 joint cover.",
        fileLabel: "PDF",
        href: `${IMAGE_BASE}/installation/GL_Busbar_Installation_Guide.pdf`,
        downloadLabel: "Download installation guide",
      },
    ],
    requestQuoteHref: "/uk-support?product=gl-lighting-busbar",
    requestDocumentationHref: "/#technical-documents",
  },
  ua: {
    slug: "gl-lighting-busbar",
    categoryEyebrow: "Освітлювальна шинопровідна система",
    heroDescription:
      "GL — освітлювальна шинопровідна система на 40 А–100 А для промислового та комерційного освітлення. Виготовляється з 3-метрових елементів в алюмінієвому корпусі з алюмінієвими або мідними провідниками та посрібленими контактами.",
    heroFeatureImage: `${IMAGE_BASE}/card/gl-main-product.webp`,
    heroFeatureImageAlt:
      "Освітлювальна шинопровідна система GL — вигляд основного продукту",
    heroImages: [
      {
        image: `${IMAGE_BASE}/applications/gl-main-product-01.webp`,
        imageAlt: "Освітлювальна шинопровідна система GL",
        label: "Шинопровідна система GL",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gl-main-product-02.webp`,
        imageAlt: "Детальний вигляд шинопроводу GL",
        label: "Деталь шинопроводу GL",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gl-industrial-application-01.webp`,
        imageAlt: "Шинопровід GL у промисловому приміщенні",
        label: "Промисловий монтаж",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gl-application-installation-.png`,
        imageAlt: "Монтаж шинопроводу GL",
        label: "Монтаж",
        fit: "cover",
      },
      {
        image: `${IMAGE_BASE}/applications/gl-system-overview-drawing.png`,
        imageAlt: "Загальна схема системи шинопроводу GL",
        label: "Схема системи",
        fit: "contain",
      },
    ],
    heroPreviousLabel: "Попереднє зображення",
    heroNextLabel: "Наступне зображення",
    heroGalleryLabel: "Галерея продукції GL",
    heroFullscreenLabel: "Переглянути на весь екран",
    heroCloseLabel: "Закрити повноекранне зображення",
    facts: [
      { value: "40–100 А", label: "Номінальний струм" },
      { value: "IP55", label: "Ступінь захисту" },
      { value: "690 В", label: "Ізоляційна напруга (Ui)" },
      { value: "3000 мм", label: "Стандартна довжина елемента" },
    ],
    overviewEyebrow: "Огляд",
    overviewHighlights: [
      "Алюмінієві або мідні провідники (GLA / GLC) на вибір залежно від вимог проєкту",
      "Алюмінієвий корпус з посрібленими контактами з'єднання для надійного малоопорного з'єднання",
      "Конфігурації P+N+E+(AL корпус) та 3P+N+E+(AL корпус) з варіантами від 2 до 5 провідників",
      "Штепсельні відгалужувальні вузли для світильників на 16 А, є варіант із захистом скляним запобіжником",
      "Відгалужувальні коробки типу MCB для захищеного підключення підсхем",
      "Модульна щільна система з'єднання із захистом IP55 та спеціальною кришкою з'єднання",
      "Широкий асортимент аксесуарів, повна міжнародна сертифікація та маркування CE",
      "Рекомендована відстань між опорними підвісами — 1500–2000 мм",
    ],
    applicationsEyebrow: "Застосування",
    applicationsHeading: "Де використовується GL",
    applicationsDescription:
      "GL забезпечує гнучкий безперервний розподіл живлення освітлення для промислових і комерційних середовищ, де потрібні вищі номінальні струми та вибір матеріалу провідника.",
    applications: [
      {
        slug: "retail-supermarkets",
        title: "Роздрібна торгівля та супермаркети",
        description:
          "Адаптивний розподіл освітлення для супермаркетів, шоурумів та торговельних приміщень.",
        image: "/assets/products/busbar/applications/busbar-application-retail.webp",
        imageAlt: "Торговельне приміщення з адаптивною системою стельового освітлення",
      },
      {
        slug: "warehouses-logistics",
        title: "Склади та логістичні центри",
        description:
          "Безперервний розподіл освітлення над складськими проходами, зонами комплектування та логістичними ділянками.",
        image: "/assets/products/busbar/applications/busbar-application-warehouse.webp",
        imageAlt:
          "Промисловий склад із безперервним освітленням над стелажами та логістичними зонами",
      },
      {
        slug: "commercial-buildings",
        title: "Комерційні будівлі",
        description:
          "Адаптивний розподіл освітлення для офісів, торговельних приміщень та багатофункціональних комерційних об'єктів.",
        image: "/assets/industries/cards/commercial-buildings.webp",
        imageAlt: "Освітлені комерційні офісні вежі в сутінках",
      },
      {
        slug: "industrial-facilities",
        title: "Промислові об'єкти",
        description:
          "Гнучке підключення освітлення у виробничих зонах, майстернях та промислових приміщеннях із потужністю 40–100 А.",
        image: "/assets/industries/cards/industrial-facilities.webp",
        imageAlt: "Інтер'єр промислового виробничого об'єкта",
      },
      {
        slug: "education-public-sector",
        title: "Освіта та державний сектор",
        description:
          "Безперервний, невибагливий до обслуговування розподіл освітлення для навчальних та громадських будівель.",
        image: "/assets/industries/cards/education-public-sector.webp",
        imageAlt: "Університетська будівля — контекст розподілу освітлення",
      },
    ],
    technicalDataEyebrow: "Технічні дані",
    technicalDataHeading: "Параметри та характеристики",
    parameterHeading: "Параметр",
    specColumns: SPEC_COLUMNS,
    specRows: [
      {
        parameter: "Номінальний струм (In)",
        values: { "gl-40": "40 А", "gl-63": "63 А", "gl-100": "100 А" },
      },
      {
        parameter: "Ізоляційна напруга (Ui)",
        values: { "gl-40": "690 В", "gl-63": "690 В", "gl-100": "690 В" },
      },
      {
        parameter: "Номінальна робоча напруга (Ue)",
        values: { "gl-40": "690 В", "gl-63": "690 В", "gl-100": "690 В" },
      },
      {
        parameter: "Частота (fn)",
        values: {
          "gl-40": "50/60 Гц",
          "gl-63": "50/60 Гц",
          "gl-100": "50/60 Гц",
        },
      },
      {
        parameter: "Струм короткого замикання, 1с (Icw)",
        values: {
          "gl-40": "3 кА, діюче",
          "gl-63": "3 кА, діюче",
          "gl-100": "3.5 кА, діюче",
        },
      },
      {
        parameter: "Пікова витримувана напруга струму (Ipk)",
        values: {
          "gl-40": "4.5 кА",
          "gl-63": "4.5 кА",
          "gl-100": "5.25 кА",
        },
      },
      {
        parameter: "Опір фази (R20)",
        values: {
          "gl-40": "1.8 мОм/м",
          "gl-63": "1.28 мОм/м",
          "gl-100": "0.9 мОм/м",
        },
      },
      {
        parameter: "Опір фази (Rl)",
        values: {
          "gl-40": "2.41 мОм/м",
          "gl-63": "1.71 мОм/м",
          "gl-100": "1.2 мОм/м",
        },
      },
      {
        parameter: "Реактивний опір фази (Xl)",
        values: {
          "gl-40": "0.98 мОм/м",
          "gl-63": "0.7 мОм/м",
          "gl-100": "0.43 мОм/м",
        },
      },
      {
        parameter: "Повний опір фази (Zl)",
        values: {
          "gl-40": "2.61 мОм/м",
          "gl-63": "1.85 мОм/м",
          "gl-100": "1.3 мОм/м",
        },
      },
      {
        parameter: "Переріз фазного провідника",
        values: {
          "gl-40": "10 мм²",
          "gl-63": "14 мм²",
          "gl-100": "26 мм²",
        },
      },
      {
        parameter: "Переріз нульового провідника",
        values: {
          "gl-40": "10 мм²",
          "gl-63": "14 мм²",
          "gl-100": "26 мм²",
        },
      },
      {
        parameter: "Переріз алюмінієвого корпусу (SPE)",
        values: {
          "gl-40": "280 мм²",
          "gl-63": "280 мм²",
          "gl-100": "280 мм²",
        },
      },
      {
        parameter: "Матеріал провідника",
        values: {
          "gl-40": "Алюміній (GLA)",
          "gl-63": "Алюміній (GLA) / Мідь (GLC)",
          "gl-100": "Мідь (GLC)",
        },
      },
      {
        parameter: "Ступінь захисту",
        values: { "gl-40": "IP55", "gl-63": "IP55", "gl-100": "IP55" },
      },
      {
        parameter: "Стандартна довжина елемента",
        values: {
          "gl-40": "3000 мм",
          "gl-63": "3000 мм",
          "gl-100": "3000 мм",
        },
      },
      {
        parameter: "Струм відгалужувального вузла",
        values: { "gl-40": "16 А", "gl-63": "16 А", "gl-100": "16 А" },
      },
    ],
    componentsEyebrow: "Компоненти системи",
    componentsHeadingPrefix: "Компоненти для",
    components: [
      {
        slug: "standard-length-element",
        name: "Стандартний елемент",
        orderCode: "GLA 4033 / 4035 / 6333 / 6335 · GLC 6333 / 6335 / 10033 / 10035",
        description:
          "3-метровий елемент шинопроводу в алюмінієвому корпусі в конфігураціях P+N+E+(AL корпус) та 3P+N+E+(AL корпус), з алюмінієвими або мідними провідниками.",
        image: `${IMAGE_BASE}/components/gl-standard-length-element-pnpe.webp`,
        imageAlt: "Стандартний елемент шинопроводу GL",
      },
      {
        slug: "feed-unit-left",
        name: "Ввідний елемент — лівий",
        orderCode: "GLA EF41 / GLC EF41",
        description: "Лівий ввідний елемент для живлення лінії шинопроводу.",
        image: `${IMAGE_BASE}/components/gl-feed-unit-left.webp`,
        imageAlt: "Лівий ввідний елемент GL",
      },
      {
        slug: "feed-unit-right",
        name: "Ввідний елемент — правий",
        orderCode: "GLA EF42 / GLC EF42",
        description: "Правий ввідний елемент для живлення лінії шинопроводу.",
        image: `${IMAGE_BASE}/components/gl-feed-unit-right.webp`,
        imageAlt: "Правий ввідний елемент GL",
      },
      {
        slug: "centre-feed-unit",
        name: "Центральний ввідний елемент",
        orderCode: "GLA EF43 / GLC EF43",
        description:
          "Центральний ввідний елемент 3P+N+1/2 PE для живлення лінії з проміжної точки.",
        image: `${IMAGE_BASE}/components/gl-centre-feed-unit.webp`,
        imageAlt: "Центральний ввідний елемент GL",
      },
      {
        slug: "flexible-joint",
        name: "Гнучкий з'єднувач для кута",
        orderCode: "GLA 63FX / GLC 160FX",
        description:
          "Гнучкий з'єднувач для зміни напрямку траси там, де жорсткий кутовий елемент непрактичний.",
        image: `${IMAGE_BASE}/components/gl-flexible-joint.webp`,
        imageAlt: "Гнучкий з'єднувач GL для кута",
      },
      {
        slug: "lighting-fixture-jack",
        name: "Відгалужувальний вузол для світильника",
        orderCode: "GL 16L1–16L4",
        description:
          "Штепсельний відгалужувальний вузол на 16 А для підключення світильників уздовж лінії шинопроводу.",
        image: `${IMAGE_BASE}/components/gl-lighting-fixture-jack.webp`,
        imageAlt: "Відгалужувальний вузол GL для світильника",
      },
      {
        slug: "glass-fuse-jack",
        name: "Відгалужувальний вузол зі скляним запобіжником",
        orderCode: "GL 16F1–16F4",
        description:
          "Штепсельний відгалужувальний вузол на 16 А з вбудованим скляним запобіжником.",
        image: `${IMAGE_BASE}/components/gl-glass-fuse-jack.webp`,
        imageAlt: "Відгалужувальний вузол GL зі скляним запобіжником",
      },
      {
        slug: "mcb-tap-off-box",
        name: "Відгалужувальна коробка типу MCB",
        orderCode: "GL F32W / GL F32G",
        description:
          "Відгалужувальна коробка типу MCB для захищеного підключення підсхем від лінії шинопроводу.",
        image: `${IMAGE_BASE}/components/gl-mcb-tap-off-box.webp`,
        imageAlt: "Відгалужувальна коробка GL типу MCB",
      },
      {
        slug: "end-cap",
        name: "Заглушка",
        orderCode: "GL EC40",
        description:
          "Закриває відкритий кінець ввідного елемента в кінці лінії.",
        image: `${IMAGE_BASE}/components/gl-end-cap.webp`,
        imageAlt: "Заглушка GL",
      },
      {
        slug: "joint-cover",
        name: "Кришка з'єднання IP55",
        orderCode: "GL ALC",
        description:
          "Закриває кожне з'єднання елементів, відновлюючи захист IP55 та механічний захист.",
        image: `${IMAGE_BASE}/components/gl-joint-cover.webp`,
        imageAlt: "Кришка з'єднання IP55 GL",
      },
      {
        slug: "fixture-fixing-hanger",
        name: "Підвіс для кріплення світильника",
        orderCode: "GL SSU1 / SSU2",
        description:
          "Підвіс для кріплення світильників до системи шинопроводу.",
        image: `${IMAGE_BASE}/components/gl-fixture-fixing-hanger-ssu2.webp`,
        imageAlt: "Підвіс GL для кріплення світильника",
      },
      {
        slug: "busbar-fixing-hanger",
        name: "Підвіс для кріплення шинопроводу",
        orderCode: "GL SSU3",
        description:
          "Опорний підвіс для лінії шинопроводу; рекомендована відстань — 1500–2000 мм.",
        image: `${IMAGE_BASE}/components/gl-busbar-fixing-hanger-ssu3.webp`,
        imageAlt: "Підвіс GL для кріплення шинопроводу",
      },
    ],
    documentsTabLabel: "Документи",
    documents: [
      {
        title: "Каталог шинопровідних систем Gersan",
        description:
          "Повний каталог продукції з усіма шинопровідними системами Gersan, включно з технічними даними GL, кодами замовлення та кресленнями розмірів.",
        fileLabel: "PDF · 25.1 МБ",
        href: "/assets/documents/busbar/gersan-busbar-systems-catalogue.pdf",
        downloadLabel: "Завантажити каталог",
      },
      {
        title: "Інструкція з монтажу GL",
        description:
          "Короткий довідник із з'єднання двох елементів шинопроводу GL: вирівнювання, кріплення M5 з комплектом з'єднання та закриття кришки IP55.",
        fileLabel: "PDF",
        href: `${IMAGE_BASE}/installation/GL_Busbar_Installation_Guide.pdf`,
        downloadLabel: "Завантажити інструкцію з монтажу",
      },
    ],
    requestQuoteHref: "/uk-support?product=gl-lighting-busbar",
    requestDocumentationHref: "/#technical-documents",
  },
} as const satisfies BusbarSystemDetailByMarket;

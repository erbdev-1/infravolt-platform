import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import { EMERGENCY_GUIDANCE_HERO_BACKGROUND, EMERGENCY_GUIDANCE_HERO_BACKGROUND_ALT } from "../emergency-guidance-lighting";
import type { LedSeriesApplicationItem, LedSeriesDetailContent, LedSeriesModel } from "../types";

export const EMERGENCY_GUIDANCE_CATEGORY_HREF = "/products/led-systems/emergency-guidance-lighting";

// Hero product photos — dedicated, prepared per-family transparent
// product cutouts and environment backgrounds under the category's
// product/ and product/background/ folders (verified by visual
// inspection: real isolated product renders and matching real interior
// environment photography, not raw catalogue crops or placeholders).
const CATEGORY_ASSET_BASE = publicMediaUrl("products/led-lighting/category/emergency-guidance");
const PRODUCT_BASE = `${CATEGORY_ASSET_BASE}/product`;
const BACKGROUND_BASE = `${PRODUCT_BASE}/background`;
const PICTOGRAMS_BASE = `${CATEGORY_ASSET_BASE}/pictograms`;
const DIMENSIONS_BASE = `${CATEGORY_ASSET_BASE}/dimensions`;

const ARL_HERO_IMAGE = `${PRODUCT_BASE}/arl-exit-sign-series-hero-product-transparent.webp`;
const ARL_HERO_BACKGROUND = `${BACKGROUND_BASE}/arl-exit-sign-series-hero-background.webp`;
const MAL_HERO_IMAGE = `${PRODUCT_BASE}/mal-exit-sign-series-hero-product-transparent.webp`;
const MAL_HERO_BACKGROUND = `${BACKGROUND_BASE}/mal-exit-sign-series-hero-background.webp`;
const HPL_HERO_IMAGE = `${PRODUCT_BASE}/hpl-exit-guidance-series-hero-product-transparent.webp`;
const HPL_HERO_BACKGROUND = `${BACKGROUND_BASE}/hpl-exit-guidance-series-hero-background.webp`;
const SRS_HERO_IMAGE = `${PRODUCT_BASE}/srs-exit-guidance-series-hero-product-transparent.webp`;
const SRS_HERO_BACKGROUND = `${BACKGROUND_BASE}/srs-exit-guidance-series-hero-background.webp`;
const EML_HERO_IMAGE = `${PRODUCT_BASE}/eml-twin-spot-emergency-lighting-hero-product-transparent.webp`;
const EML_HERO_BACKGROUND = `${BACKGROUND_BASE}/eml-twin-spot-emergency-lighting-hero-background.webp`;
const ELH_HERO_IMAGE = `${PRODUCT_BASE}/elh-high-output-emergency-spot-series-hero-product-transparent.webp`;
const ELH_HERO_BACKGROUND = `${BACKGROUND_BASE}/elh-high-output-emergency-spot-series-hero-background.webp`;
const LINEAR_BULKHEAD_HERO_IMAGE = `${PRODUCT_BASE}/15w-emergency-linear-bulkhead-luminaires-hero-product-transparent.webp`;
const LINEAR_BULKHEAD_HERO_BACKGROUND = `${BACKGROUND_BASE}/15w-emergency-linear-bulkhead-luminaires-hero-background.webp`;

const HERO_BACKGROUND_BY_SLUG: Record<string, string> = {
  "arl-exit-sign-series": ARL_HERO_BACKGROUND,
  "mal-exit-sign-series": MAL_HERO_BACKGROUND,
  "hpl-exit-guidance-series": HPL_HERO_BACKGROUND,
  "srs-exit-guidance-series": SRS_HERO_BACKGROUND,
  "eml-twin-spot-emergency-lighting": EML_HERO_BACKGROUND,
  "elh-high-output-emergency-spot-series": ELH_HERO_BACKGROUND,
  "15w-emergency-linear-bulkhead-luminaires": LINEAR_BULKHEAD_HERO_BACKGROUND,
};

// Pictograms folder assets are genuine exit-sign pictogram/mounting-code
// reference sheets only for the four signage families (verified by visual
// inspection). The EML, ELH and 15W files filed in the same folder are a
// twin-spot spacing table, a response-time/mounting diagram and a motion-
// sensor detection-method diagram respectively — real technical content,
// but not pictograms — so those three families show Dimensions only.
const PICTOGRAMS_BY_SLUG: Record<string, string> = {
  "arl-exit-sign-series": `${PICTOGRAMS_BASE}/arl-exit-sign-pictograms.webp`,
  "mal-exit-sign-series": `${PICTOGRAMS_BASE}/mal-exit-sign-series-pictograms-technical-4x.png`,
  "hpl-exit-guidance-series": `${PICTOGRAMS_BASE}/hpl-exit-guidance-series-pictograms-technical-4x.png`,
  "srs-exit-guidance-series": `${PICTOGRAMS_BASE}/srs-exit-guidance-series-pictograms-technical-4x.png`,
};

const DIMENSIONS_BY_SLUG: Record<string, string> = {
  "arl-exit-sign-series": `${DIMENSIONS_BASE}/arl-exit-sign-dimensions-technical-4x.png`,
  "mal-exit-sign-series": `${DIMENSIONS_BASE}/mal-exit-sign-series-dimensions-technical-4x.png`,
  "hpl-exit-guidance-series": `${DIMENSIONS_BASE}/hpl-exit-guidance-series-dimensions-technical-4x.png`,
  "srs-exit-guidance-series": `${DIMENSIONS_BASE}/srs-exit-guidance-series-dimensions-technical-4x.png`,
  "eml-twin-spot-emergency-lighting": `${DIMENSIONS_BASE}/eml-twin-spot-emergency-lighting-dimensions-technical-4x.png`,
  "elh-high-output-emergency-spot-series": `${DIMENSIONS_BASE}/elh-high-output-emergency-spot-series-dimensions-technical-4x.png`,
  "15w-emergency-linear-bulkhead-luminaires": `${DIMENSIONS_BASE}/15w-emergency-linear-bulkhead-luminaires-dimensions-technical-4x.webp`,
};

function technicalAssetsFor(market: MarketCode, slug: string): LedSeriesDetailContent["technicalAssets"] {
  const ua = market === "ua";
  const pictogram = PICTOGRAMS_BY_SLUG[slug];
  const dimensions = DIMENSIONS_BY_SLUG[slug];
  const assets: NonNullable<LedSeriesDetailContent["technicalAssets"]>[number][] = [];
  if (pictogram) {
    assets.push({ title: ua ? "Піктограми" : "Pictograms", image: pictogram, imageAlt: ua ? "Аркуш піктограм і кодів монтажу з каталогу" : "Catalogue pictogram and mounting-code reference sheet" });
  }
  if (dimensions) {
    assets.push({ title: ua ? "Розміри" : "Dimensions", image: dimensions, imageAlt: ua ? "Каталожне креслення розмірів" : "Catalogue dimensional drawing" });
  }
  return assets;
}

const SIBLINGS = [
  ["arl-exit-sign-series", "ARL Exit Sign Series", "Wall / ceiling exit signs"],
  ["mal-exit-sign-series", "MAL Exit Sign Series", "Compact exit sign family"],
  ["hpl-exit-guidance-series", "HPL Exit & Guidance Series", "Directional exit guidance"],
  ["srs-exit-guidance-series", "SRS Exit & Guidance Series", "Directional exit guidance"],
  ["eml-twin-spot-emergency-lighting", "EML Twin-Spot Emergency Lighting", "Twin adjustable emergency heads"],
  ["elh-high-output-emergency-spot-series", "ELH High-Output Emergency Spot Series", "High-output emergency spotlights"],
  ["15w-emergency-linear-bulkhead-luminaires", "15W Emergency Linear & Bulkhead Luminaires", "Linear & bulkhead forms"],
] as const;

function siblings(current: string) {
  return SIBLINGS.map(([slug, name, subtitle]) => ({
    slug,
    name,
    subtitle,
    ...(slug === current ? { isCurrent: true } : { href: `${EMERGENCY_GUIDANCE_CATEGORY_HREF}/${slug}` }),
  }));
}

function shared(market: MarketCode, slug: string, title: string) {
  const ua = market === "ua";
  return {
    breadcrumbs: {
      home: ua ? "Головна" : "Home",
      products: ua ? "Продукція" : "Products",
      ledSystems: ua ? "LED-системи" : "LED Systems",
      category: ua ? "Аварійне та евакуаційне освітлення" : "Emergency & Guidance Lighting",
      current: title,
    },
    backToCategoryLabel: ua ? "Назад до аварійного та евакуаційного освітлення" : "Back to Emergency & Guidance Lighting",
    technicalInformationHeading: ua ? "Технічна інформація" : "Technical Information",
    modelsHeading: ua ? "Моделі та технічний розклад" : "Models & Technical Schedule",
    controlsHeading: ua ? "Керування та моніторинг" : "Controls & Monitoring",
    // Emergency & Guidance uses Pictograms + Dimensions instead of the
    // normal Photometric Data / Technical Drawing pairing (task brief §8).
    photometricHeading: ua ? "Піктограми та розміри" : "Pictograms & Dimensional Data",
    technicalAssets: technicalAssetsFor(market, slug),
    dimensionNote: ua
      ? "Зображення відтворені точно з підготовлених каталожних матеріалів; необроблені скріншоти сторінок каталогу не використовуються."
      : "Images are reproduced exactly from the prepared catalogue reference material — raw catalogue-page screenshots are not used.",
    applicationsHeading: ua ? "Типові сфери застосування" : "Typical Applications",
    applicationCardsAlways: true,
    siblingFamiliesHeading: ua ? "Інші сімейства аварійного та евакуаційного освітлення" : "Other Emergency & Guidance Lighting Families",
    siblingViewSeriesLabel: ua ? "Переглянути серію" : "View Series",
    currentFamilyBadgeLabel: ua ? "Поточна серія" : "Current Family",
    siblingFamilies: siblings(slug),
    heroBackgroundImage: HERO_BACKGROUND_BY_SLUG[slug] ?? EMERGENCY_GUIDANCE_HERO_BACKGROUND,
    heroBackgroundImageAlt: EMERGENCY_GUIDANCE_HERO_BACKGROUND_ALT,
  };
}

// Single source of truth for the Emergency & Guidance Lighting warranty
// period — every family in this category publishes the same term, so the
// value lives here once rather than being repeated per family.
const WARRANTY_YEARS = 5;
function warrantyItem(ua: boolean) {
  return { icon: "warranty" as const, label: ua ? "Гарантія" : "Warranty", value: ua ? `${WARRANTY_YEARS} років гарантії` : `${WARRANTY_YEARS}-Year Warranty` };
}

function filters(market: MarketCode, name: string): NonNullable<LedSeriesDetailContent["modelsFilters"]> {
  const ua = market === "ua";
  return {
    searchLabel: ua ? "Пошук" : "Search",
    searchPlaceholder: ua ? `Пошук за кодом моделі ${name}` : `Search ${name} model code`,
    powerFilterLabel: ua ? "Потужність" : "Power",
    allPowersLabel: ua ? "Усі потужності" : "All powers",
    clearFiltersLabel: ua ? "Очистити фільтри" : "Clear filters",
    noResultsLabel: ua ? "Жодна модель не відповідає цим фільтрам." : "No catalogue models match these filters.",
    downloadCsvLabel: ua ? "Завантажити CSV" : "Download CSV",
    mobileFiltersToggleLabel: ua ? "Фільтр моделей" : "Filter models",
    mobileApplyFiltersLabel: ua ? "Застосувати фільтри" : "Apply filters",
    mobileViewAllPrefix: ua ? "Показати всі" : "View all",
    mobileViewFilteredPrefix: ua ? "Показати відфільтровані" : "View filtered",
    mobileHidePrefix: ua ? "Приховати" : "Hide",
    modelsCountSuffix: ua ? "моделей" : "models",
    copyModelCodeAction: ua ? "Копіювати каталожний код" : "Copy model code",
    copiedLabel: ua ? "Скопійовано" : "Copied",
    enquiryColumnLabel: ua ? "Запит" : "Enquiry",
    enquiryAddAction: ua ? "Додати до запиту" : "Add to Enquiry",
    enquiryRemoveAction: ua ? "Прибрати" : "Remove",
  };
}

/* =========================================================
   Exit-sign families — ARL, MAL, HPL, SRS. All four share the
   catalogue's common exit-sign spec template (verified identically
   across every inspected page-111-118 crop: LED source, 220/230 Vac
   50/60 Hz, <3 W, 6500 K, 24 h charge, 0-40°C, Maintained/Non-
   Maintained, 1 h/3 h duration options, LiFePO4/Ni-Cd battery
   options, green charge indicator, test switch, DALI central
   monitoring, white powder-coated DKP sheet-metal body) plus the
   catalogue's verified mounting set (DA = rear wall / WM, DY = side
   wall / SM, TD = ceiling / CM, plus an unlabelled ceiling rod/chain
   diagram shown on every exit-sign page). Per-family differences
   (viewing distance, standards, mounting split) are applied only
   where the source explicitly supports them — see inline notes.
   ========================================================= */

const EXIT_SIGN_MOUNTING = (ua: boolean) => [
  { icon: "wall-mount" as const, title: ua ? "Настінний монтаж (DA / DY)" : "Wall Mounting (DA / DY)", description: ua ? "Заднє (DA) або бічне (DY) настінне кріплення." : "Rear-of-wall (DA) or side-of-wall (DY) mounting." },
  { icon: "mounting-options" as const, title: ua ? "Стельовий монтаж (TD)" : "Ceiling Mounting (TD)", description: ua ? "Пряме кріплення до стелі." : "Direct surface mounting to the ceiling." },
  { icon: "suspension" as const, title: ua ? "Підвіс на тязі / ланцюзі" : "Ceiling Rod / Chain", description: ua ? "Підвісний монтаж на стельовій тязі або ланцюзі." : "Suspended installation on a ceiling rod or chain." },
];

const EXIT_SIGN_CONTROLS = [
  { icon: "control-dali" as const, label: "DALI", secondaryLabel: "Central Monitoring" },
  { icon: "control-emergency" as const, label: "Test Switch" },
];

type Row3 = readonly [string, "N" | "M"];
function exitSignModels(rows: readonly Row3[]): readonly LedSeriesModel[] {
  return rows.map(([model]) => ({
    model,
    powerW: 3,
    powerDisplay: "<3 W",
    colourTemperature: "6500 K",
    voltage: "220/230 Vac",
    frequency: "50/60 Hz",
    operatingTemperature: "0 to +40 °C",
  }));
}

const APPLICATION_IMAGE_BASE = `${CATEGORY_ASSET_BASE}/applications`;

function exitSignApplications(ua: boolean): readonly LedSeriesApplicationItem[] {
  return [
    { icon: "corridor", title: ua ? "Шляхи евакуації та коридори" : "Escape Routes & Corridors", description: ua ? "Орієнтування на визначених шляхах евакуації та в коридорах." : "Guidance along designated escape routes and circulation corridors.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-escape-routes-corridors.webp`, imageAlt: ua ? "Освітлений знак виходу вздовж коридору та сходової клітки" : "Illuminated exit sign guiding along a corridor and stairwell" },
    { icon: "office", title: ua ? "Громадські будівлі" : "Public Buildings", description: ua ? "Орієнтування в громадських і комерційних будівлях." : "Exit guidance for public and commercial buildings.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-public-buildings.webp`, imageAlt: ua ? "Знак виходу в коридорі громадської будівлі" : "Exit guidance sign in a public-building corridor" },
    { icon: "education", title: ua ? "Комерційні будівлі" : "Commercial Buildings", description: ua ? "Орієнтування в офісних і комерційних приміщеннях." : "Exit guidance for office and commercial interiors.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-commercial-buildings.webp`, imageAlt: ua ? "Знак виходу в коридорі комерційної будівлі" : "Exit guidance sign in a commercial-building corridor" },
    { icon: "airport", title: ua ? "Транспортні та транзитні зони" : "Transport / Circulation Areas", description: ua ? "Орієнтування у транспортних і транзитних зонах." : "Guidance for transport and high-circulation areas.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-transport-circulation-areas.webp`, imageAlt: ua ? "Знак виходу в транспортній чи транзитній зоні" : "Exit guidance sign in a transport or circulation area" },
  ];
}

function exitSignContent(market: MarketCode, args: {
  slug: string;
  title: string;
  eyebrow: string;
  description: Readonly<{ uk: string; ua: string }>;
  heroImage: string;
  heroImageAlt: string;
  models: readonly Row3[];
  modelsColumns?: LedSeriesDetailContent["modelsColumns"];
  mountingType?: (model: string) => string | undefined;
  viewingDistance?: string;
  technicalAssurance: LedSeriesDetailContent["technicalAssurance"];
  modelsNote?: Readonly<{ uk: string; ua: string }>;
  supportTitle: Readonly<{ uk: string; ua: string }>;
}): LedSeriesDetailContent {
  const ua = market === "ua";
  const models = exitSignModels(args.models).map((m) => {
    const mountingType = args.mountingType?.(m.model);
    return mountingType ? { ...m, mountingType } : m;
  });

  return {
    ...shared(market, args.slug, args.title),
    metadata: {
      title: `${args.title} | Emergency & Guidance Lighting | LED Systems | InfraVolt`,
      description: `${args.title} — catalogue-verified LEDBUS emergency exit-sign models with exact order codes and technical schedule.`,
    },
    hero: {
      eyebrow: args.eyebrow,
      category: ua ? "Аварійне та евакуаційне освітлення" : "Emergency & Guidance Lighting",
      title: args.title,
      description: ua ? args.description.ua : args.description.uk,
      primaryAction: ua ? "Запросити технічний пакет" : "Request Technical Pack",
      secondaryAction: ua ? "Завантажити PDF-каталог" : "Download PDF Catalogue",
    },
    heroImage: args.heroImage,
    heroImageAlt: args.heroImageAlt,
    technicalInformation: [
      {
        icon: "performance",
        title: ua ? "Аварійна робота" : "Emergency Performance",
        values: [
          { label: ua ? "Джерело світла" : "Light Source", value: "LED" },
          { label: ua ? "Потужність" : "Power", value: "<3 W" },
          { label: ua ? "Час заряду" : "Charge Time", value: "24 h" },
          { label: ua ? "Тривалість" : "Duration", value: "1 h / 3 h" },
        ],
      },
      {
        icon: "light-quality",
        title: ua ? "Світло та орієнтування" : "Light & Guidance",
        values: [
          { label: ua ? "Колірна температура" : "Colour Temperature", value: "6500 K" },
          ...(args.viewingDistance ? [{ label: ua ? "Дальність видимості" : "Viewing Distance", value: args.viewingDistance }] : []),
          { label: ua ? "Режим" : "Configuration", value: ua ? "Підтримуваний / непідтримуваний" : "Maintained / Non-Maintained" },
        ],
      },
      {
        icon: "protection-electrical",
        title: ua ? "Захист та електрика" : "Protection & Electrical",
        values: [
          { label: ua ? "Живлення" : "Voltage", value: "220/230 Vac · 50/60 Hz" },
          { label: ua ? "Робоча температура" : "Operating Temperature", value: "0 to +40 °C" },
          { label: ua ? "Батарея" : "Battery", value: "LiFePO4 / Ni-Cd" },
        ],
      },
      {
        icon: "construction",
        title: ua ? "Конструкція та монтаж" : "Construction & Installation",
        values: [
          { label: ua ? "Корпус" : "Body", value: ua ? "Порошково-фарбований лист DKP, білий" : "Powder-coated DKP sheet metal, white" },
          { label: ua ? "Індикація" : "Indication", value: ua ? "Зелений індикатор заряду" : "Green charge indicator" },
        ],
      },
    ],
    technicalAssurance: [...args.technicalAssurance, warrantyItem(ua)],
    modelsIntroduction: ua
      ? `Перевірені каталожні коди моделей ${args.title}.`
      : `Catalogue-verified ${args.title} order codes.`,
    models,
    modelsColumns: args.modelsColumns ?? {
      model: ua ? "Модель / каталожний код" : "Model / Catalogue Code",
      power: ua ? "Потужність" : "Power",
      voltage: ua ? "Напруга" : "Voltage",
      frequency: ua ? "Частота" : "Frequency",
      colourTemperature: "CCT",
      operatingTemperature: ua ? "Робоча температура" : "Operating Temp.",
    },
    modelsFilters: filters(market, args.title.replace(/ (Exit Sign|Exit & Guidance) Series/, "")),
    ...(args.modelsNote ? { modelsNote: ua ? args.modelsNote.ua : args.modelsNote.uk } : {}),
    mountingHeading: ua ? "Варіанти монтажу" : "Mounting Options",
    mountingOptions: EXIT_SIGN_MOUNTING(ua),
    controlsIntroduction: ua
      ? "Каталожні варіанти моніторингу та тестування — не кожна опція є стандартною для кожної моделі."
      : "Catalogue-listed monitoring and test options — not every option is standard on every model.",
    controlOptions: EXIT_SIGN_CONTROLS,
    applications: exitSignApplications(ua),
    supportCta: {
      title: ua ? args.supportTitle.ua : args.supportTitle.uk,
      description: ua
        ? "Наша технічна команда допоможе з підбором моделі, монтажем і специфікацією проєкту."
        : "Our technical team can help with model selection, mounting and project specification.",
      action: ua ? "Запросити технічну підтримку" : "Request Technical Support",
    },
  };
}

export function arlExitSignContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return exitSignContent(market, {
    slug: "arl-exit-sign-series",
    title: "ARL Exit Sign Series",
    eyebrow: "ARL Series",
    description: {
      uk: "Wall and ceiling-mounted LED exit-sign family with maintained and non-maintained configurations, 1 h/3 h emergency duration and DALI central-monitoring options.",
      ua: "Сімейство настінних і стельових LED-знаків виходу з підтримуваними та непідтримуваними режимами, тривалістю аварійної роботи 1 год/3 год та опціями централізованого моніторингу DALI.",
    },
    heroImage: ARL_HERO_IMAGE,
    heroImageAlt: "ARL LED exit sign, illuminated green pictogram with wall and ceiling mounting diagrams",
    models: [
      ["LDB ARL N1 DA 3H P....", "N"],
      ["LDB ARL M1 DA 3H P....", "M"],
      ["LDB ARL/ST N1 DA 3H P....", "N"],
      ["LDB ARL/ST M1 DA 3H P....", "M"],
      ["LDB ARL/DL M1 DA 3H P....", "M"],
    ],
    viewingDistance: "30 m",
    technicalAssurance: [
      { icon: "colour-finish", label: "Colour & Finish", value: "White powder-coated DKP sheet metal" },
      { icon: "compliance", label: "Compliance", value: "EN 60598-2-22 · EN 61347-2-7 · EN 61347-2-13 · EN 62384" },
    ],
    modelsNote: {
      uk: "Codes ending in N1 or M1 denote Non-Maintained and Maintained configurations.",
      ua: "Коди, що закінчуються на N1 або M1, позначають непідтримуваний та підтримуваний режими відповідно.",
    },
    supportTitle: { uk: "Need an ARL Exit Sign Solution?", ua: "Потрібне рішення ARL Exit Sign?" },
  });
}

export function malExitSignContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return exitSignContent(market, {
    slug: "mal-exit-sign-series",
    title: "MAL Exit Sign Series",
    eyebrow: "MAL Series",
    description: {
      uk: "Compact LED exit-sign family with maintained and non-maintained configurations, 1 h/3 h emergency duration and DALI central-monitoring options.",
      ua: "Компактне сімейство LED-знаків виходу з підтримуваними та непідтримуваними режимами, тривалістю аварійної роботи 1 год/3 год та опціями централізованого моніторингу DALI.",
    },
    heroImage: MAL_HERO_IMAGE,
    heroImageAlt: "MAL LED exit sign, illuminated green pictogram with wall and ceiling mounting diagrams",
    models: [
      ["LDB MAL N1 DA 3H P....", "N"],
      ["LDB MAL M1 DA 3H P....", "M"],
      ["LDB MAL/ST N1 DA 3H P....", "N"],
      ["LDB MAL/ST M1 DA 3H P....", "M"],
      ["LDB MAL/DL M1 DA 3H P....", "M"],
    ],
    // MAL's source viewing-distance figure varies by configuration in the
    // catalogue extraction and is not mapped exactly to this model set —
    // omitted rather than reusing ARL's 30 m figure (see task brief §7).
    technicalAssurance: [
      { icon: "colour-finish", label: "Colour & Finish", value: "White powder-coated DKP sheet metal" },
    ],
    modelsNote: {
      uk: "Codes ending in N1 or M1 denote Non-Maintained and Maintained configurations.",
      ua: "Коди, що закінчуються на N1 або M1, позначають непідтримуваний та підтримуваний режими відповідно.",
    },
    supportTitle: { uk: "Need a MAL Exit Sign Solution?", ua: "Потрібне рішення MAL Exit Sign?" },
  });
}

export function hplExitGuidanceContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return exitSignContent(market, {
    slug: "hpl-exit-guidance-series",
    title: "HPL Exit & Guidance Series",
    eyebrow: "HPL Series",
    description: {
      uk: "Wall and ceiling-mounted LED exit and directional-guidance family with maintained and non-maintained configurations and DA/TD mounting variants.",
      ua: "Сімейство настінних і стельових LED-знаків виходу та напрямного орієнтування з підтримуваними та непідтримуваними режимами й варіантами монтажу DA/TD.",
    },
    heroImage: HPL_HERO_IMAGE,
    heroImageAlt: "HPL LED exit and guidance sign, illuminated green pictogram, suspended ceiling bracket mounting",
    models: [
      ["LDB HPL N2 DA 3H P....", "N"],
      ["LDB HPL M2 DA 3H P....", "M"],
      ["LDB HPL N2 TD 3H P....", "N"],
      ["LDB HPL M2 TD 3H P....", "M"],
      ["LDB HPL/ST M2 DA 3H P....", "M"],
      ["LDB HPL/DL M2 DA 3H P....", "M"],
    ],
    mountingType: (model) => (model.includes(" TD ") ? "Ceiling (TD)" : model.includes(" DA ") ? "Rear Wall (DA)" : undefined),
    modelsColumns: {
      model: "Model / Catalogue Code",
      power: "Power",
      mountingType: "Mounting",
      colourTemperature: "CCT",
      voltage: "Voltage",
      operatingTemperature: "Operating Temp.",
    },
    // HPL's source viewing-distance figure is not mapped to this model set
    // — omitted rather than inheriting ARL's figure (see task brief §8).
    technicalAssurance: [
      { icon: "colour-finish", label: "Colour & Finish", value: "White powder-coated DKP sheet metal" },
    ],
    modelsNote: {
      uk: "Codes ending in N2 or M2 denote Non-Maintained and Maintained configurations; DA and TD denote rear-wall and ceiling mounting.",
      ua: "Коди, що закінчуються на N2 або M2, позначають непідтримуваний та підтримуваний режими; DA і TD позначають настінний (задній) та стельовий монтаж.",
    },
    supportTitle: { uk: "Planning an Emergency Guidance System?", ua: "Плануєте систему аварійного орієнтування?" },
  });
}

export function srsExitGuidanceContentForMarket(market: MarketCode): LedSeriesDetailContent {
  return exitSignContent(market, {
    slug: "srs-exit-guidance-series",
    title: "SRS Exit & Guidance Series",
    eyebrow: "SRS Series",
    description: {
      uk: "Wall-mounted LED exit and directional-guidance family with maintained and non-maintained configurations and DALI central-monitoring options.",
      ua: "Сімейство настінних LED-знаків виходу та напрямного орієнтування з підтримуваними та непідтримуваними режимами й опціями централізованого моніторингу DALI.",
    },
    heroImage: SRS_HERO_IMAGE,
    heroImageAlt: "SRS LED exit and guidance sign in a rugged cylindrical cage housing with illuminated green pictogram",
    models: [
      ["LDB SRS N1 DA 3H P....", "N"],
      ["LDB SRS M1 DA 3H P....", "M"],
      ["LDB SRS/ST N1 DA 3H P....", "N"],
      ["LDB SRS/ST M1 DA 3H P....", "M"],
      ["LDB SRS/DL M1 DA 3H P....", "M"],
    ],
    // SRS sits in the same catalogue section as the distinct SAROS Exproof
    // exit-sign range; no verified code/product mapping ties SRS to Ex-
    // rated (Ex d / IP66 / Zone) claims, so none are made here (task §9).
    // The source's viewing-distance text is likewise unresolved for SRS
    // and is omitted rather than guessed.
    technicalAssurance: [
      { icon: "colour-finish", label: "Colour & Finish", value: "White powder-coated DKP sheet metal" },
    ],
    modelsNote: {
      uk: "Codes ending in N1 or M1 denote Non-Maintained and Maintained configurations.",
      ua: "Коди, що закінчуються на N1 або M1, позначають непідтримуваний та підтримуваний режими відповідно.",
    },
    supportTitle: { uk: "Need an SRS Emergency Guidance Solution?", ua: "Потрібне рішення SRS Emergency Guidance?" },
  });
}

/* =========================================================
   EML Twin-Spot Emergency Lighting
   ========================================================= */

type EmlRow = readonly [string, 10 | 3, "1h" | "3h"];
const EML_ROWS: readonly EmlRow[] = [
  ["LDB EML 1021", 10, "1h"],
  ["LDB EML 1023", 10, "3h"],
  ["LDB EML/ST 323", 3, "3h"],
  ["LDB EML/DL 323", 3, "3h"],
];

export function emlTwinSpotContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const models: readonly LedSeriesModel[] = EML_ROWS.map(([model, headW, duration]) => ({
    model,
    powerW: headW * 2,
    powerDisplay: `2 × ${headW} W`,
    luminousFluxLm: headW === 10 ? "650 lm" : "180 lm",
    // `dimensions` column relabelled "Duration" below — EML has no body
    // dimensions in the source and this keeps the schedule to real,
    // catalogue-verified fields without extending the shared type.
    dimensions: duration === "1h" ? "1 h" : "3 h",
    voltage: "220/230 Vac",
    frequency: "50/60 Hz",
    colourTemperature: "6500 K",
  }));

  return {
    ...shared(market, "eml-twin-spot-emergency-lighting", "EML Twin-Spot Emergency Lighting"),
    metadata: {
      title: "EML Twin-Spot Emergency Lighting | Emergency & Guidance Lighting | LED Systems | InfraVolt",
      description: "EML Twin-Spot Emergency Lighting — 4 catalogue-verified models, 2×3 W/2×10 W, 1 h/3 h, adjustable twin emergency heads.",
    },
    hero: {
      eyebrow: "EML Series",
      category: ua ? "Аварійне та евакуаційне освітлення" : "Emergency & Guidance Lighting",
      title: "EML Twin-Spot Emergency Lighting",
      description: ua
        ? "Двопрожекторні аварійні світильники з регульованими LED-головками, підвіс на стіну чи стелю та варіантами тривалості 1 год/3 год."
        : "Twin-spot emergency luminaire with adjustable LED heads, wall or ceiling mounting and 1 h/3 h duration options.",
      primaryAction: ua ? "Запросити технічний пакет" : "Request Technical Pack",
      secondaryAction: ua ? "Завантажити PDF-каталог" : "Download PDF Catalogue",
    },
    heroImage: EML_HERO_IMAGE,
    heroImageAlt: "EML twin-spot emergency luminaire with two adjustable round LED heads and status-indicator front panel",
    technicalInformation: [
      {
        icon: "performance",
        title: ua ? "Аварійна робота" : "Emergency Operation",
        values: [
          { label: ua ? "Потужність" : "Power", value: "2 × 3 W / 2 × 10 W" },
          { label: ua ? "Тривалість" : "Duration", value: "1 h / 3 h" },
          { label: ua ? "Час заряду" : "Charge", value: ua ? "Автоматичний" : "Automatic" },
        ],
      },
      {
        icon: "light-quality",
        title: ua ? "Світловий вихід" : "Light Output",
        values: [
          { label: ua ? "Аварійний світловий потік (10 Вт)" : "Emergency-Mode Light Output (10 W)", value: "650 lm" },
          { label: ua ? "Аварійний світловий потік (3 Вт)" : "Emergency-Mode Light Output (3 W)", value: "180 lm" },
          { label: ua ? "Колірна температура" : "Colour Temperature", value: "6500 K" },
        ],
      },
      {
        icon: "protection-electrical",
        title: ua ? "Захист та електрика" : "Protection & Electrical",
        values: [
          { label: ua ? "Живлення" : "Voltage", value: "220/230 Vac · 50/60 Hz" },
          { label: "IP40" },
          { label: ua ? "IP65 за запитом" : "IP65 available on request" },
        ],
      },
      {
        icon: "construction",
        title: ua ? "Конструкція та монтаж" : "Construction & Installation",
        values: [
          { label: ua ? "Корпус" : "Body", value: ua ? "Порошково-фарбований лист DKP, білий" : "Powder-coated DKP sheet metal, white" },
          { label: ua ? "Головки" : "Lamp Heads", value: ua ? "Полікарбонатні, регульовані" : "Polycarbonate, adjustable" },
        ],
      },
    ],
    // Old category mockup listed a universal IP20 — the verified catalogue
    // source gives IP40 as standard, with IP65 available on request; both
    // are shown above rather than presented as universally applicable.
    technicalAssurance: [
      { icon: "colour-finish", label: "Colour & Finish", value: "White powder-coated DKP sheet metal" },
      { icon: "compliance", label: "Compliance", value: "EN 60598-2-22 · EN 61347-2-7 · EN 60925" },
      warrantyItem(ua),
    ],
    modelsHeading: ua ? "Моделі та технічний розклад" : "Models & Technical Schedule",
    modelsIntroduction: ua
      ? "Чотири перевірені каталожні моделі EML із заявленим аварійним світловим потоком на головку."
      : "Four catalogue-verified EML models with published emergency-mode light output per head.",
    models,
    modelsColumns: {
      model: ua ? "Модель / каталожний код" : "Model / Catalogue Code",
      power: ua ? "Потужність" : "Power",
      luminousFlux: ua ? "Аварійний світловий потік" : "Emergency-Mode Light Output",
      dimensions: ua ? "Тривалість" : "Duration",
      voltage: ua ? "Напруга" : "Voltage",
      colourTemperature: "CCT",
    },
    modelsFilters: filters(market, "EML"),
    familyTechnicalSection: {
      heading: ua ? "Двопрожекторна аварійна робота" : "Twin-Spot Emergency Operation",
      introduction: ua
        ? "Ключові каталожно підтверджені характеристики родини EML."
        : "Key catalogue-verified characteristics of the EML family.",
      settings: [
        { label: ua ? "Регульовані головки" : "Adjustable Heads", value: ua ? "Вгору / вниз / вліво / вправо" : "Up / Down / Left / Right", description: ua ? "Незалежне регулювання кожної LED-головки." : "Each LED head adjusts independently." },
        { label: ua ? "Монтаж" : "Mounting", value: ua ? "Стіна або стеля" : "Wall or Ceiling", description: ua ? "Придатний для настінного та стельового монтажу." : "Suitable for wall or ceiling installation." },
        { label: ua ? "Конфігурація" : "Duration Options", value: "1 h / 3 h", description: ua ? "Тривалість аварійної роботи залежить від моделі." : "Emergency duration is set per model." },
        { label: ua ? "Моніторинг" : "Monitoring & Test", value: ua ? "DALI, тестовий перемикач" : "DALI, Test Switch", description: ua ? "Централізований моніторинг DALI та ручне тестування." : "DALI central monitoring and manual test switch." },
      ],
      assets: [],
    },
    controlsIntroduction: ua
      ? "Каталожні варіанти моніторингу та тестування — не кожна опція є стандартною для кожної моделі."
      : "Catalogue-listed monitoring and test options — not every option is standard on every model.",
    controlOptions: [
      { icon: "control-dali", label: "DALI", secondaryLabel: "Central Monitoring" },
      { icon: "control-emergency", label: "Test Switch" },
    ],
    applications: [
      { icon: "corridor", title: ua ? "Шляхи евакуації" : "Escape Routes", description: ua ? "Аварійне освітлення визначених шляхів евакуації." : "Emergency illumination for designated escape routes.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-escape-routes-corridors.webp`, imageAlt: ua ? "Освітлений знак виходу вздовж коридору та сходової клітки" : "Illuminated exit sign guiding along a corridor and stairwell" },
      { icon: "high-ceiling", title: ua ? "Відкриті зони" : "Open Areas", description: ua ? "Аварійне освітлення великих внутрішніх приміщень." : "Emergency illumination for larger open interior spaces.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-open-public-areas.webp`, imageAlt: ua ? "Знаки виходу у великому відкритому атріумі громадської будівлі" : "Exit signage in a large open public building atrium" },
      { icon: "corridor", title: ua ? "Сходові клітки" : "Stairwells", description: ua ? "Аварійне освітлення вертикальних шляхів евакуації." : "Emergency illumination for vertical escape routes.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-stairwells.webp`, imageAlt: ua ? "Знаки виходу та аварійне освітлення на сходовій клітці" : "Exit signs and emergency lighting on a stairwell" },
      { icon: "industrial-facility", title: ua ? "Промислові та технічні зони" : "Industrial / Utility Areas", description: ua ? "Аварійне освітлення промислових і технічних приміщень." : "Emergency illumination for industrial and utility interiors.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-industrial-utility-areas.webp`, imageAlt: ua ? "Аварійне освітлення в промисловій чи технічній зоні" : "Emergency lighting in an industrial or utility area" },
    ],
    supportCta: {
      title: ua ? "Потрібне рішення двопрожекторного аварійного освітлення?" : "Need a Twin-Spot Emergency Lighting Solution?",
      description: ua
        ? "Наша технічна команда допоможе з підбором моделі, монтажем і специфікацією проєкту."
        : "Our technical team can help with model selection, mounting and project specification.",
      action: ua ? "Запросити технічну підтримку" : "Request Technical Support",
    },
  };
}

/* =========================================================
   ELH High-Output Emergency Spot Series
   ========================================================= */

type ElhRow = readonly [string, string, number, string, string, string, string];
const ELH_ROWS: readonly ElhRow[] = [
  ["LDB ELHA 211", "1 × 20 W", 20, "300 lm", "12 V/7 Ah", "3 h", "3 kg"],
  ["LDB ELHA 511", "1 × 50 W", 50, "875 lm", "12 V/7 Ah", "3 h", "3 kg"],
  ["LDB ELHA 221", "2 × 20 W", 40, "300 lm", "12 V/7 Ah", "1 h", "7 kg"],
  ["LDB ELHB 223", "2 × 20 W", 40, "600 lm", "2 × 12 V/7 Ah", "3 h", "8 kg"],
  ["LDB ELHB 521", "2 × 50 W", 100, "1,750 lm", "2 × 12 V/7 Ah", "1 h", "10 kg"],
  ["LDB ELHC 523", "2 × 50 W", 100, "1,750 lm", "4 × 12 V/7 Ah", "3 h", "12 kg"],
];

export function elhHighOutputContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const models: readonly LedSeriesModel[] = ELH_ROWS.map(([model, powerDisplay, powerW, flux, battery, duration, weight]) => ({
    model,
    powerW,
    powerDisplay,
    luminousFluxLm: flux,
    // `dimensions` relabelled "Duration" and `cri` relabelled "Battery"
    // below — ELH has no catalogue dimensions/CRI data; this keeps the
    // schedule to real, catalogue-verified figures without extending the
    // shared type with new emergency-only fields.
    dimensions: duration,
    cri: battery,
    weightKg: weight,
    voltage: "220/230 Vac",
    frequency: "50/60 Hz",
    colourTemperature: "6500 K",
  }));

  return {
    ...shared(market, "elh-high-output-emergency-spot-series", "ELH High-Output Emergency Spot Series"),
    metadata: {
      title: "ELH High-Output Emergency Spot Series | Emergency & Guidance Lighting | LED Systems | InfraVolt",
      description: "ELH High-Output Emergency Spot Series — 6 catalogue-verified models, single and twin-head, 300–1,750 lm, 1 h/3 h, Pb battery.",
    },
    hero: {
      eyebrow: "ELH Series",
      category: ua ? "Аварійне та евакуаційне освітлення" : "Emergency & Guidance Lighting",
      title: "ELH High-Output Emergency Spot Series",
      description: ua
        ? "Високопотужні аварійні прожектори з одинарною або двома головками, для великих і критичних зон."
        : "High-output emergency spotlights in single and twin-head configurations for larger and critical areas.",
      primaryAction: ua ? "Запросити технічний пакет" : "Request Technical Pack",
      secondaryAction: ua ? "Завантажити PDF-каталог" : "Download PDF Catalogue",
    },
    heroImage: ELH_HERO_IMAGE,
    heroImageAlt: "ELH high-output emergency spotlight system with twin sealed-beam heads and separate battery-backed spotlight unit",
    technicalInformation: [
      {
        icon: "performance",
        title: ua ? "Продуктивність" : "Performance",
        values: [
          { label: ua ? "Потужність" : "Power", value: "20–100 W" },
          { label: ua ? "Світловий потік" : "Luminous Flux", value: "300–1,750 lm" },
          { label: ua ? "Тривалість" : "Duration", value: "1 h / 3 h" },
        ],
      },
      {
        icon: "light-quality",
        title: ua ? "Конфігурація головок" : "Head Configuration",
        values: [
          { label: ua ? "Одинарна або подвійна головка" : "Single or Twin Head" },
          { label: ua ? "Колірна температура" : "Colour Temperature", value: "6500 K" },
        ],
      },
      {
        icon: "protection-electrical",
        title: ua ? "Захист та електрика" : "Protection & Electrical",
        values: [
          { label: ua ? "Живлення" : "Voltage", value: "220/230 Vac · 50/60 Hz" },
          { label: ua ? "Батарея" : "Battery", value: "Pb · 12 V/7 Ah – 4 × 12 V/7 Ah" },
        ],
      },
      {
        icon: "construction",
        title: ua ? "Конструкція та монтаж" : "Construction & Installation",
        values: [
          { label: ua ? "Корпус" : "Body", value: ua ? "Порошково-фарбований метал" : "Powder-coated metal" },
          { label: ua ? "Вага" : "Weight", value: "3–12 kg" },
        ],
      },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: "Colour & Finish", value: ua ? "Білий фарбований корпус" : "White painted body" },
      { icon: "compliance", label: "Compliance", value: "EN 60598-2-22" },
      warrantyItem(ua),
    ],
    modelsIntroduction: ua
      ? "Шість перевірених каталожних моделей ELH з точними значеннями світлового потоку, батареї та ваги."
      : "Six catalogue-verified ELH models with exact published luminous flux, battery and weight figures.",
    models,
    modelsColumns: {
      model: ua ? "Модель / каталожний код" : "Model / Catalogue Code",
      power: ua ? "Потужність" : "Power",
      luminousFlux: ua ? "Світловий потік" : "Luminous Flux",
      dimensions: ua ? "Тривалість" : "Duration",
      cri: ua ? "Батарея" : "Battery",
      weight: ua ? "Вага" : "Weight",
    },
    modelsFilters: filters(market, "ELH"),
    modelsNote: ua
      ? "Значення світлового потоку відтворені точно з каталогу; наприклад, LDB ELHA 221 (2×20 Вт) наведено як 300 лм без арифметичного коригування."
      : "Luminous-flux values are transcribed exactly from the catalogue — e.g. LDB ELHA 221 (2×20 W) is published as 300 lm and is not arithmetic-corrected.",
    familyTechnicalSection: {
      heading: ua ? "Конфігурації світлового потоку та батареї" : "Output & Battery Configurations",
      introduction: ua
        ? "Шість підтверджених конфігурацій ELH охоплюють одно- та двоголовкові варіанти з різною тривалістю та батареєю."
        : "Six catalogue-verified ELH configurations span single- and twin-head variants with different duration and battery pairings.",
      settings: [
        { label: ua ? "Діапазон світлового потоку" : "Output Range", value: "300–1,750 lm", description: ua ? "Одно- та двоголовкові конфігурації в межах родини ELH." : "Single- and twin-head configurations across the ELH family." },
        { label: ua ? "Діапазон батареї" : "Battery Range", value: "12 V/7 Ah – 4 × 12 V/7 Ah", description: ua ? "Конфігурація Pb-батареї масштабується зі світловим потоком і тривалістю." : "Pb battery configuration scales with output and duration." },
        { label: ua ? "Тривалість" : "Duration", value: "1 h / 3 h", description: ua ? "Тривалість аварійної роботи встановлюється для кожної моделі — див. таблицю нижче." : "Emergency duration is set per model — see the schedule below." },
      ],
      assets: [],
    },
    controlsIntroduction: ua
      ? "Каталожні варіанти тестування — не кожна опція є стандартною для кожної моделі."
      : "Catalogue-listed test options — not every option is standard on every model.",
    controlOptions: [{ icon: "control-emergency", label: "Test Switch" }],
    applications: [
      { icon: "corridor", title: ua ? "Шляхи евакуації" : "Escape Routes", description: ua ? "Аварійне освітлення визначених шляхів евакуації." : "Emergency illumination for designated escape routes.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-escape-routes-corridors.webp`, imageAlt: ua ? "Освітлений знак виходу вздовж коридору та сходової клітки" : "Illuminated exit sign guiding along a corridor and stairwell" },
      { icon: "high-ceiling", title: ua ? "Відкриті зони" : "Open Areas", description: ua ? "Аварійне освітлення великих внутрішніх приміщень." : "Emergency illumination for larger open interior spaces.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-open-public-areas.webp`, imageAlt: ua ? "Знаки виходу у великому відкритому атріумі громадської будівлі" : "Exit signage in a large open public building atrium" },
      { icon: "corridor", title: ua ? "Сходові клітки" : "Stairwells", description: ua ? "Аварійне освітлення вертикальних шляхів евакуації." : "Emergency illumination for vertical escape routes.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-stairwells.webp`, imageAlt: ua ? "Знаки виходу та аварійне освітлення на сходовій клітці" : "Exit signs and emergency lighting on a stairwell" },
      { icon: "industrial-facility", title: ua ? "Критичні зони циркуляції" : "Critical Circulation Areas", description: ua ? "Високопотужне аварійне освітлення для критичних зон." : "High-output emergency illumination for critical circulation zones.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-large-critical-areas.webp`, imageAlt: ua ? "Аварійне освітлення виходу у великому складському чи промисловому приміщенні" : "Emergency exit lighting in a large warehouse or industrial hall" },
    ],
    supportCta: {
      title: ua ? "Потрібне рішення високопотужного аварійного освітлення?" : "Need a High-Output Emergency Lighting Solution?",
      description: ua
        ? "Наша технічна команда допоможе з підбором моделі, конфігурацією батареї та специфікацією проєкту."
        : "Our technical team can help with model selection, battery configuration and project specification.",
      action: ua ? "Запросити технічну підтримку" : "Request Technical Support",
    },
  };
}

/* =========================================================
   15W Emergency Linear & Bulkhead Luminaires — a website
   grouping of the verified INKL/INL linear and NMSL bulkhead
   15 W families (task brief §12). Kept as one combined,
   real-code model schedule rather than one invented family code.
   ========================================================= */

type LinearBulkheadRow = readonly [string, boolean];
const LINEAR_BULKHEAD_ROWS: readonly LinearBulkheadRow[] = [
  ["LDB INKL 15W HF 3H 4K", true],
  ["LDB INL 15W HF 4K", false],
  ["LDB INL 15W 4K", false],
  ["LDB NMSL 15W HF 3H 4K", true],
  ["LDB NMSL 15W HF 4K", false],
  ["LDB NMSL 15W 4K", false],
];

export function emergencyLinearBulkheadContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const models: readonly LedSeriesModel[] = LINEAR_BULKHEAD_ROWS.map(([model, emergency]) => ({
    model,
    powerW: 15,
    powerDisplay: "15 W",
    luminousFluxLm: emergency ? "150 lm (3 h emergency)" : "1,200 lm",
    colourTemperature: "4000 K",
    operatingTemperature: "−5 to +55 °C",
    voltage: "220/230 Vac",
    frequency: "50/60 Hz",
  }));

  return {
    ...shared(market, "15w-emergency-linear-bulkhead-luminaires", "15W Emergency Linear & Bulkhead Luminaires"),
    metadata: {
      title: "15W Emergency Linear & Bulkhead Luminaires | Emergency & Guidance Lighting | LED Systems | InfraVolt",
      description: "15W Emergency Linear & Bulkhead Luminaires — 6 catalogue-verified INKL/INL/NMSL order codes, 4000 K, opal diffuser.",
    },
    hero: {
      eyebrow: "INKL · INL · NMSL",
      category: ua ? "Аварійне та евакуаційне освітлення" : "Emergency & Guidance Lighting",
      title: "15W Emergency Linear & Bulkhead Luminaires",
      description: ua
        ? "15-ватні лінійні (INKL/INL) та корпусні (NMSL) світильники з термооброблюваним опаловим розсіювачем і варіантами аварійної роботи 3 год."
        : "15 W linear (INKL/INL) and bulkhead (NMSL) luminaires with a heat-treated opal diffuser and 3-hour emergency variants.",
      primaryAction: ua ? "Запросити технічний пакет" : "Request Technical Pack",
      secondaryAction: ua ? "Завантажити PDF-каталог" : "Download PDF Catalogue",
    },
    heroImage: LINEAR_BULKHEAD_HERO_IMAGE,
    heroImageAlt: "15 W emergency bulkhead luminaire with heat-treated opal diffuser",
    technicalInformation: [
      {
        icon: "performance",
        title: ua ? "Продуктивність" : "Performance",
        values: [
          { label: ua ? "Потужність" : "Power", value: "15 W" },
          { label: ua ? "Світловий потік (норм.)" : "Light Output (Normal)", value: "1,200 lm" },
          { label: ua ? "Світловий потік (аварійний, 3 год)" : "Light Output (3 h Emergency)", value: "150 lm" },
        ],
      },
      {
        icon: "light-quality",
        title: ua ? "Якість світла" : "Light Quality",
        values: [
          { label: ua ? "Колірна температура" : "Colour Temperature", value: "4000 K" },
          { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Термооброблений опаловий" : "Heat-treated opal" },
        ],
      },
      {
        icon: "protection-electrical",
        title: ua ? "Захист та електрика" : "Protection & Electrical",
        values: [
          { label: ua ? "Живлення" : "Voltage", value: "220/230 Vac · 50/60 Hz" },
          { label: ua ? "Робоча температура" : "Operating Temperature", value: "−5 to +55 °C" },
          { label: ua ? "Затримка" : "Delay", value: "<18 s" },
          { label: ua ? "Споживання в режимі заряду" : "Standby / Charge Power", value: "<2 W" },
        ],
      },
      {
        icon: "construction",
        title: ua ? "Конструкція та монтаж" : "Construction & Installation",
        values: [
          { label: ua ? "Корпус" : "Body", value: ua ? "Білий фарбований лист металу" : "White painted sheet metal" },
          { label: ua ? "Висота монтажу" : "Mounting Height", value: "~2.8–4 m" },
        ],
      },
    ],
    technicalAssurance: [
      { icon: "colour-finish", label: "Colour & Finish", value: ua ? "Білий фарбований лист металу" : "White painted sheet metal" },
      warrantyItem(ua),
    ],
    modelsIntroduction: ua
      ? "Шість перевірених каталожних кодів INKL, INL та NMSL 15 Вт."
      : "Six catalogue-verified INKL, INL and NMSL 15 W order codes.",
    models,
    modelsColumns: {
      model: ua ? "Модель / каталожний код" : "Model / Catalogue Code",
      power: ua ? "Потужність" : "Power",
      luminousFlux: ua ? "Світловий потік" : "Light Output",
      colourTemperature: "CCT",
      operatingTemperature: ua ? "Робоча температура" : "Operating Temp.",
    },
    modelsFilters: filters(market, "15W Emergency"),
    modelsNote: ua
      ? "Код INKL відтворено точно з каталогу і не змінено на INL."
      : "The INKL code is transcribed exactly as printed in the catalogue and is not corrected to INL.",
    familyTechnicalSection: {
      heading: ua ? "Лінійні та корпусні форми" : "Linear & Bulkhead Forms",
      introduction: ua
        ? "Одна вебгрупа для двох підтверджених каталожних форм-факторів 15 Вт."
        : "One website grouping covering two verified 15 W catalogue form factors.",
      settings: [
        { label: ua ? "Лінійна (INKL / INL)" : "Linear (INKL / INL)", value: ua ? "3 коди" : "3 codes", description: ua ? "Лінійний корпус із HF та аварійним 3-годинним варіантом." : "Linear body form, with HF and 3-hour emergency variants." },
        { label: ua ? "Корпусна (NMSL)" : "Bulkhead (NMSL)", value: ua ? "3 коди" : "3 codes", description: ua ? "Корпусна форма з тими самими варіантами HF та 3 год." : "Bulkhead body form, with the same HF and 3-hour variants." },
      ],
      assets: [],
    },
    controlsIntroduction: ua
      ? "Каталожні варіанти — не кожна опція є стандартною для кожного коду."
      : "Catalogue-listed options — not every option is standard on every code.",
    controlOptions: [{ icon: "control-emergency", label: ua ? "Аварійний / звичайний варіант" : "Emergency / Normal Variant" }],
    applications: [
      { icon: "corridor", title: ua ? "Коридори" : "Corridors", description: ua ? "Загальне та аварійне освітлення коридорів." : "General and emergency illumination for corridors.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-escape-routes-corridors.webp`, imageAlt: ua ? "Освітлений знак виходу вздовж коридору та сходової клітки" : "Illuminated exit sign guiding along a corridor and stairwell" },
      { icon: "corridor", title: ua ? "Сходові клітки" : "Stairwells", description: ua ? "Аварійне освітлення сходових кліток." : "Emergency illumination for stairwells.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-stairwells.webp`, imageAlt: ua ? "Знаки виходу та аварійне освітлення на сходовій клітці" : "Exit signs and emergency lighting on a stairwell" },
      { icon: "office", title: ua ? "Шляхи евакуації" : "Escape Routes", description: ua ? "Аварійне освітлення визначених шляхів евакуації." : "Emergency illumination for designated escape routes.", image: `${APPLICATION_IMAGE_BASE}/emergency-guidance-application-exit-doors-directional-points.webp`, imageAlt: ua ? "Напрямні знаки виходу на перехресті коридорів і біля дверей" : "Directional exit signs at a corridor junction and exit door" },
      { icon: "industrial-facility", title: ua ? "Технічні зони" : "Service Areas", description: ua ? "Освітлення технічних і допоміжних приміщень." : "Lighting for service and utility areas." },
    ],
    supportCta: {
      title: ua ? "Потрібне рішення лінійного або корпусного аварійного освітлення?" : "Need an Emergency Linear or Bulkhead Solution?",
      description: ua
        ? "Наша технічна команда допоможе з підбором форм-фактора, монтажем і специфікацією проєкту."
        : "Our technical team can help with form-factor selection, mounting and project specification.",
      action: ua ? "Запросити технічну підтримку" : "Request Technical Support",
    },
  };
}

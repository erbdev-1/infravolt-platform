import type { MarketCode } from "@/modules/markets/types";

import type { LedSeriesDetailContent, LedSeriesModel } from "../types";

export const SPECIAL_HAZARDOUS_CATEGORY_HREF =
  "/products/led-systems/special-hazardous-environment-lighting";

const CATEGORY_ASSET_BASE = "/assets/products/led-lighting/category/special&hazardous";
const APPLICATION_ASSET_BASE = `${CATEGORY_ASSET_BASE}/applications`;

const ROUTES = {
  exproof: `${SPECIAL_HAZARDOUS_CATEGORY_HREF}/gersan-exproof-led-lighting-systems`,
  sera: `${SPECIAL_HAZARDOUS_CATEGORY_HREF}/gersan-sera-led-greenhouse-luminaires`,
  tex: `${SPECIAL_HAZARDOUS_CATEGORY_HREF}/gersan-tex-led-lighting-systems`,
  auto: `${SPECIAL_HAZARDOUS_CATEGORY_HREF}/gersan-auto-led-lighting-systems`,
} as const;

const FAMILIES = [
  { slug: "gersan-exproof-led-lighting-systems", name: "GERSAN Exproof LED Lighting Systems", subtitleEn: "LED-BUS LDBEXP and GSL EXP configurations", subtitleUa: "Конфігурації LED-BUS LDBEXP та GSL EXP", href: ROUTES.exproof },
  { slug: "gersan-sera-led-greenhouse-luminaires", name: "GERSAN SERA-LED Greenhouse Luminaires", subtitleEn: "Plant-specific greenhouse lighting", subtitleUa: "Тепличне освітлення, специфічне для рослин", href: ROUTES.sera },
  { slug: "gersan-tex-led-lighting-systems", name: "GERSAN TEX-LED Lighting Systems", subtitleEn: "UV 360 nm textile inspection", subtitleUa: "Текстильний контроль UV 360 нм", href: ROUTES.tex },
  { slug: "gersan-auto-led-lighting-systems", name: "GERSAN AUTO-LED Lighting Systems", subtitleEn: "Automotive paint and finish inspection", subtitleUa: "Контроль автомобільної фарби та покриття", href: ROUTES.auto },
] as const;

function siblingFamilies(current: string, ua: boolean) {
  return FAMILIES.map((family) => {
    const base = { slug: family.slug, name: family.name, subtitle: ua ? family.subtitleUa : family.subtitleEn };
    return family.slug === current ? { ...base, isCurrent: true } : { ...base, href: family.href };
  });
}

// Single source of truth for the Special & Hazardous warranty split —
// Ex-Proof and TEX-LED publish 5 years; SERA-LED and AUTO-LED publish 7.
function warrantyItem(ua: boolean, years: 5 | 7) {
  return { icon: "warranty" as const, label: ua ? "Гарантія" : "Warranty", value: ua ? `${years} років гарантії` : `${years}-Year Warranty` };
}

function heroActions(ua: boolean) {
  return { primaryAction: ua ? "Запросити технічний пакет" : "Request Technical Pack", secondaryAction: ua ? "Завантажити PDF-каталог" : "Download PDF Catalogue" };
}

function talkToTeam(ua: boolean) {
  return ua ? "Звернутися до нашої технічної команди" : "Talk to Our Technical Team";
}

function filters(market: MarketCode, placeholderUk: string, placeholderUa: string): NonNullable<LedSeriesDetailContent["modelsFilters"]> {
  const ua = market === "ua";
  return {
    searchLabel: ua ? "Пошук" : "Search",
    searchPlaceholder: ua ? placeholderUa : placeholderUk,
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

function shared(market: MarketCode, slug: string, title: string) {
  const ua = market === "ua";
  return {
    breadcrumbs: {
      home: ua ? "Головна" : "Home",
      products: ua ? "Продукція" : "Products",
      ledSystems: ua ? "LED-системи" : "LED Systems",
      category: ua ? "Спеціалізоване та вибухозахищене освітлення" : "Special & Hazardous Environment Lighting",
      current: title,
    },
    backToCategoryLabel: ua ? "Назад до спеціалізованого та вибухозахищеного освітлення" : "Back to Special & Hazardous Environment Lighting",
    technicalInformationHeading: ua ? "Технічна інформація" : "Technical Information",
    technicalAssurance: [],
    modelsHeading: ua ? "Моделі та технічний розклад" : "Models & Technical Schedule",
    controlsHeading: "",
    controlsIntroduction: "",
    controlOptions: [],
    photometricHeading: ua ? "Фотометричні та технічні дані" : "Photometric & Technical Data",
    applicationsHeading: ua ? "Типові сфери застосування" : "Typical Applications",
    compactApplicationsRow: true,
    siblingFamiliesHeading: ua ? "Інші сімейства спеціалізованого та вибухозахищеного освітлення" : "Other Special & Hazardous Environment Families",
    siblingViewSeriesLabel: ua ? "Переглянути серію" : "View Series",
    currentFamilyBadgeLabel: ua ? "Поточна серія" : "Current Family",
    siblingFamilies: siblingFamilies(slug, ua),
  } as const;
}

const LDBEXP_MODELS: readonly LedSeriesModel[] = [
  ["LED-BUS LDBEXP1", 50, "6,600 lm", "132.0 lm/W", "6.0 kg"],
  ["LED-BUS LDBEXP2", 75, "11,880 lm", "158.4 lm/W", "6.0 kg"],
  ["LED-BUS LDBEXP3", 100, "15,290 lm", "152.9 lm/W", "7.5 kg"],
  ["LED-BUS LDBEXP4", 150, "21,750 lm", "145.0 lm/W", "8.75 kg"],
  ["LED-BUS LDBEXP5", 185, "26,300 lm", "142.0 lm/W", "9.2 kg"],
  ["LED-BUS LDBEXP6", 200, "28,200 lm", "141.0 lm/W", "9.2 kg"],
  ["LED-BUS LDBEXP7", 222, "31,750 lm", "143.0 lm/W", "9.2 kg"],
  ["LED-BUS LDBEXP8", 240, "33,600 lm", "140.0 lm/W", "9.2 kg"],
].map(([model, powerW, luminousFluxLm, efficiencyLmW, weightKg]) => ({
  model: model as string,
  powerW: powerW as number,
  luminousFluxLm: luminousFluxLm as string,
  efficiencyLmW: efficiencyLmW as string,
  voltage: "110–240 Vac",
  colourTemperature: "3000–6500 K",
  ip: "IP65",
  powerFactor: ">0.95",
  operatingTemperature: "−30 to +60 °C",
  weightKg: weightKg as string,
}));

const GSL_EXP_MODELS: readonly LedSeriesModel[] = [
  ["GSL EXP-35W", 35, 8, "5,000 lm", "142.9 lm/W", "6.5 kg"],
  ["GSL EXP-50W", 50, 36, "7,500 lm", "150.0 lm/W", "6.5 kg"],
  ["GSL EXP-75W", 70, 48, "11,500 lm", "164.3 lm/W", "6.5 kg"],
  ["GSL EXP-100W", 100, 60, "14,500 lm", "145.0 lm/W", "6.5 kg"],
  ["GSL EXP-125W", 125, 64, "18,750 lm", "150.0 lm/W", "7.0 kg"],
  ["GSL EXP-150W", 150, 64, "22,750 lm", "151.0 lm/W", "7.0 kg"],
  ["GSL EXP-185 W", 185, 80, "27,800 lm", "150.2 lm/W", "7.0 kg"],
  ["GSL EXP-200W", 200, 80, "29,750 lm", "148.75 lm/W", "7.0 kg"],
  ["GSL EXP-250W", 250, 80, "37,600 lm", "150.4 lm/W", "7.0 kg"],
].map(([model, powerW, ledQty, luminousFluxLm, efficiencyLmW, weightKg]) => ({
  model: model as string,
  powerW: powerW as number,
  ledQty: ledQty as number,
  luminousFluxLm: luminousFluxLm as string,
  efficiencyLmW: efficiencyLmW as string,
  voltage: "110–240 Vac",
  frequency: "50–60 Hz",
  cri: "75–85",
  colourTemperature: "3000–6500 K",
  ip: "IP66",
  operatingTemperature: "−30 to +90 °C",
  weightKg: weightKg as string,
}));

function exproofApplications(ua: boolean) {
  return [
    { icon: "aircraft-maintenance", title: ua ? "Ангари та обслуговування літаків" : "Hangars & Aircraft Maintenance", description: ua ? "Каталожні середовища обслуговування літаків та ангарів." : "Catalogue-listed aircraft maintenance and hangar environments.", image: `${APPLICATION_ASSET_BASE}/exproof-application-hangars-aircraft-maintenance.webp`, imageAlt: ua ? "Ангар обслуговування літаків, освітлений для застосувань Exproof" : "Aircraft maintenance hangar illuminated for Exproof applications" },
    { icon: "port", title: ua ? "Порти та важка промисловість" : "Ports & Heavy Industry", description: ua ? "Вимогливі застосування освітлення портів і важкої промисловості." : "Demanding port and heavy-industry lighting applications.", image: `${APPLICATION_ASSET_BASE}/exproof-application-ports-heavy-industry.webp`, imageAlt: ua ? "Застосування освітлення Exproof в порту та важкій промисловості" : "Port and heavy-industry Exproof lighting application" },
    { icon: "warehouse", title: ua ? "Склади" : "Warehouses", description: ua ? "Захищене освітлення для промислових складських середовищ." : "Protected lighting for industrial storage environments.", image: `${APPLICATION_ASSET_BASE}/exproof-application-warehouses.webp`, imageAlt: ua ? "Промисловий склад, освітлений Exproof" : "Industrial warehouse Exproof lighting application" },
    { icon: "petrochemical", title: ua ? "Нафтохімія та АЗС" : "Petrochemical & Gas Stations", description: ua ? "Каталожні застосування для нафтохімічних об'єктів та АЗС." : "Catalogue-listed petrochemical and filling-station applications.", image: `${APPLICATION_ASSET_BASE}/exproof-industrial-application.webp`, imageAlt: ua ? "Небезпечна промислова зона, освітлена Exproof" : "Hazardous industrial area illuminated by Exproof lighting" },
    { icon: "industrial-facility", title: ua ? "Борошномельні та барвникові заводи" : "Flour Mills & Dye Plants", description: ua ? "Спеціалізоване освітлення для каталожних зон обробки." : "Specialist lighting for catalogue-listed processing areas.", image: `${APPLICATION_ASSET_BASE}/exproof-application-flour-mills-dye-plants.webp`, imageAlt: ua ? "Борошномельний та барвниковий завод, освітлений Exproof" : "Flour mill and dye-plant Exproof lighting application" },
    { icon: "mining", title: ua ? "Вугілля та гірничодобувна промисловість" : "Coal & Mining", description: ua ? "Освітлення для каталожних застосувань вугільної та гірничодобувної промисловості." : "Lighting for catalogue-listed coal and mining applications.", image: `${APPLICATION_ASSET_BASE}/exproof-application-coal-mining.webp`, imageAlt: ua ? "Вугільне та гірниче застосування Exproof" : "Coal and mining Exproof lighting application" },
  ] as const;
}

function exproofContent(configuration: "ldbexp" | "gsl", market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const ldbexp = configuration === "ldbexp";
  const modelName = ldbexp ? "LED-BUS LDBEXP" : "GSL EXP";
  return {
    ...shared(market, "gersan-exproof-led-lighting-systems", "GERSAN Exproof LED Lighting Systems"),
    metadata: {
      title: "GERSAN Exproof LED Lighting Systems | InfraVolt",
      description: ua ? "Каталожні конфігурації освітлення LED-BUS LDBEXP та GSL EXP для вимогливих промислових і небезпечних застосувань." : "Catalogue-verified LED-BUS LDBEXP and GSL EXP lighting configurations for demanding industrial and hazardous-area applications.",
    },
    hero: {
      eyebrow: modelName,
      category: ua ? "Спеціалізоване та вибухозахищене освітлення" : "Special & Hazardous Environment Lighting",
      title: "GERSAN Exproof LED Lighting Systems",
      description: ua ? "Промислові рішення LED-освітлення для вимогливих і небезпечних застосувань, з конфігураціями LED-BUS та GSL EXP для різних вимог монтажу та виходу." : "Industrial LED lighting solutions for demanding and hazardous-area applications, with LED-BUS and GSL EXP configurations for different installation and output requirements.",
      ...heroActions(ua),
    },
    heroImage: `${CATEGORY_ASSET_BASE}/product/gersan-exproof-led-hero-product-transparent.webp`,
    heroImageAlt: ldbexp ? (ua ? "Каталожні ракурси продукту LED-BUS LDBEXP" : "LED-BUS LDBEXP catalogue product views") : (ua ? "Світильник GSL EXP із каталогу GERSAN" : "GSL EXP luminaire extracted from the GERSAN catalogue"),
    heroBackgroundImage: `${CATEGORY_ASSET_BASE}/product/background/gersan-exproof-led-hero-background.webp`,
    heroBackgroundImageAlt: ua ? "Нафтохімічне промислове застосування з каталогу GERSAN Exproof" : "Petrochemical industrial application from the GERSAN Exproof catalogue",
    technicalInformation: ldbexp ? [
      { icon: "performance", title: ua ? "Продуктивність" : "Performance", values: [{ label: ua ? "Потужність" : "Power", value: "50–240 W" }, { label: ua ? "Світловий потік" : "Luminous Flux", value: "6,600–33,600 lm" }, { label: ua ? "Ефективність" : "Efficiency", value: "132.0–158.4 lm/W" }] },
      { icon: "light-quality", title: ua ? "Якість світла" : "Light Quality", values: [{ label: ua ? "Колірна температура" : "Colour Temperature", value: "3000–6500 K" }, { label: ua ? "Відбивачі" : "Reflectors", value: ua ? "Каталожні опції" : "Catalogue-listed options" }] },
      { icon: "protection-electrical", title: ua ? "Захист та середовище" : "Protection & Environment", values: [{ label: ua ? "Модельний розклад" : "Model Schedule", value: "IP65" }, { label: ua ? "Напруга" : "Voltage", value: "110–240 Vac" }, { label: ua ? "Коефіцієнт потужності" : "Power Factor", value: ">0.95" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−30 to +60 °C" }] },
      { icon: "construction", title: ua ? "Конструкція та системні опції" : "Construction & System Options", values: [{ label: ua ? "Корпус / кришки" : "Body / Covers", value: ua ? "Анодований" : "Anodized" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Ударостійке та термостійке ультрапрозоре загартоване скло" : "Pressure and heat-resistant ultra-clear tempered glass" }, { label: ua ? "Підключення" : "Connection", value: ua ? "Освітлювальний шинопровід Gersan або кабельна система" : "Gersan Lighting Busbar or cabled system" }] },
    ] : [
      { icon: "performance", title: ua ? "Продуктивність" : "Performance", values: [{ label: ua ? "Потужність" : "Power", value: "35–250 W" }, { label: ua ? "Світловий потік" : "Luminous Flux", value: "5,000–37,600 lm" }, { label: ua ? "Ефективність" : "Efficiency", value: "142.9–164.3 lm/W" }] },
      { icon: "light-quality", title: ua ? "Якість світла" : "Light Quality", values: [{ label: ua ? "Колірна температура" : "Colour Temperature", value: "3000–6500 K" }, { label: "CRI", value: "75–85" }, { label: ua ? "Кількість LED" : "LED Quantity", value: "8–80" }] },
      { icon: "protection-electrical", title: ua ? "Захист та середовище" : "Protection & Environment", values: [{ label: ua ? "Захист" : "Protection", value: "IP66" }, { label: ua ? "Напруга / частота" : "Voltage / Frequency", value: "110–240 Vac · 50–60 Hz" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−30 to +90 °C" }] },
      { icon: "construction", title: ua ? "Конструкція та системні опції" : "Construction & System Options", values: [{ label: ua ? "Проєктне керування" : "Project Controls", value: "PLC · On/Off · Dim" }, { label: ua ? "Проєктний зв'язок" : "Project Communication", value: "3G · TCP/IP" }, { label: ua ? "Моніторинг" : "Monitoring", value: ua ? "Опції датчиків і контролю несправностей" : "Sensor and fault-monitoring options" }] },
    ],
    sourceNote: ldbexp
      ? (ua ? "Структурований розклад LED-BUS LDBEXP використовує каталожне табличне значення IP65; сусідня рекламна графіка показує IP66. Каталог вказує придатність для застосувань Zone 1 / Zone 2." : "The structured LED-BUS LDBEXP schedule uses the catalogue table value IP65; nearby feature artwork shows IP66. Catalogue states suitability for Zone 1 / Zone 2 applications.")
      : (ua ? "Каталог вказує придатність для застосувань Zone 1 / Zone 2. Можливості зв'язку, датчиків і моніторингу є проєктними/системними опціями, а не стандартними функціями кожного світильника GSL EXP." : "Catalogue states suitability for Zone 1 / Zone 2 applications. Communication, sensing and monitoring capabilities are project/system options, not standard features of every GSL EXP luminaire."),
    modelsIntroduction: ua ? `Точний каталожний розклад ${modelName}. Пошук і фільтрація за кодом моделі або опублікованою потужністю.` : `Exact ${modelName} catalogue schedule. Search and filter by model code or published power.`,
    models: ldbexp ? LDBEXP_MODELS : GSL_EXP_MODELS,
    modelsNote: ldbexp ? undefined : (ua ? "GSL EXP-185 W зберігає каталожний пробіл. GSL EXP-75W — точний код моделі, тоді як опублікована технічна таблиця вказує 70 Вт." : "GSL EXP-185 W preserves the catalogue spacing. GSL EXP-75W is the exact model code while the published technical table lists 70 W."),
    modelsColumns: {
      model: ua ? "Модель / код каталогу" : "Model / Catalogue Code", power: ua ? "Потужність" : "Power", ledQty: ldbexp ? undefined : (ua ? "Кількість LED" : "LED Qty"), luminousFlux: ua ? "Світловий потік" : "Luminous Flux", voltage: ua ? "Напруга" : "Voltage", frequency: ldbexp ? undefined : (ua ? "Частота" : "Frequency"), powerFactor: ldbexp ? (ua ? "Коеф. потужн." : "PF") : undefined, operatingTemperature: ua ? "Робоча темп." : "Operating Temp.", efficiency: ua ? "Ефективність" : "Efficiency", cri: ldbexp ? undefined : "CRI", colourTemperature: "CCT", ip: "IP", weight: ua ? "Маса" : "Weight",
    },
    modelsFilters: filters(market, `Search ${modelName} code`, `Пошук за кодом ${modelName}`),
    familyTechnicalSection: {
      heading: ua ? "Конструкція та системні опції" : "Construction & System Options",
      introduction: ldbexp ? (ua ? "Каталожно підтверджені варіанти конструкції та підключення для конфігурації LED-BUS LDBEXP." : "Catalogue-backed construction and connection choices for the LED-BUS LDBEXP configuration.") : (ua ? "Каталожні можливості GSL EXP подані як проєктні/системні опції, а не універсальне стандартне обладнання." : "Catalogue-listed GSL EXP capabilities shown as project/system options rather than universal standard equipment."),
      settings: ldbexp ? [
        { label: ua ? "Конструкція" : "Construction", value: ua ? "Анодований корпус і кришки" : "Anodized body and covers", description: ua ? "Наведено опції ударостійкого й термостійкого ультрапрозорого загартованого скла та відбивача." : "Pressure- and heat-resistant ultra-clear tempered glass and reflector options are listed." },
        { label: ua ? "Підключення" : "Connection", value: ua ? "Освітлювальний шинопровід або кабельна система" : "Lighting busbar or cabled system", description: ua ? "Показано підключення до освітлювального шинопроводу Gersan та опцію кабельної системи." : "Connection to Gersan Lighting Busbar and a cabled-system option are shown." },
        { label: ua ? "Керування" : "Controls", value: "G-BUS PLC · DALI · SwitchDIM", description: ua ? "Каталожні системні/керувальні опції, також доступні аварійні опції." : "Catalogue-listed system/control options, with emergency options also available." },
        { label: ua ? "Конфігурація" : "Configuration", value: ua ? "Різні розміри за запитом" : "Different sizes on request", description: ua ? "Каталожна опція конструкції залежно від запиту." : "Catalogue request-dependent construction option." },
      ] : [
        { label: ua ? "Керування освітленням" : "Lighting Control", value: ua ? "Зв'язок по силовій лінії · Увімк./Вимк. · Димування" : "Power Line Communication · On/Off · Dim", description: ua ? "Проєктні/системні опції конфігурації в каталозі." : "Project/system configuration options in the catalogue." },
        { label: ua ? "Зв'язок" : "Communication", value: "IP-камера · 3G · TCP/IP", description: ua ? "Проєктно-залежні можливості інтеграції." : "Project-dependent integration capabilities." },
        { label: ua ? "Датчики" : "Sensing", value: ua ? "Вологість · Температура · Рух · Денне світло" : "Humidity · Temperature · Motion · Daylight", description: ua ? "Проєктні опції датчиків, а не стандартне обладнання для кожної моделі." : "Project sensor options rather than standard equipment on every model." },
        { label: ua ? "Моніторинг" : "Monitoring", value: ua ? "Контроль несправностей · Сценарне керування" : "Fault monitoring · Scenario control", description: ua ? "Каталожні проєктні/системні функції." : "Catalogue-listed project/system functions." },
      ],
      assets: [],
    },
    technicalAssurance: ldbexp ? [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Анодований корпус і кришки" : "Anodized body and covers" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP65 · Zone 1 / Zone 2" },
      warrantyItem(ua, 5),
    ] : [
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP66 · Zone 1 / Zone 2" },
      warrantyItem(ua, 5),
    ],
    technicalAssets: [
      { title: ua ? "Фотометричні дані" : "Photometric Data", image: `${CATEGORY_ASSET_BASE}/photometric/gersan-exproof-led-photometric-data.png`, imageAlt: ua ? "Фотометрична діаграма GERSAN Exproof LED" : "GERSAN Exproof LED photometric diagram" },
      { title: ua ? "Технічне креслення" : "Technical Drawing", image: `${CATEGORY_ASSET_BASE}/technical/gersan-exproof-led-technical-drawing.png`, imageAlt: ua ? "Технічне креслення GERSAN Exproof LED" : "GERSAN Exproof LED technical drawing" },
    ],
    dimensionNote: ua ? `Технічні матеріали взято з каталожної сторінки для обраної конфігурації ${modelName}.` : `Technical assets extracted from the catalogue page for the selected ${modelName} configuration.`,
    applications: exproofApplications(ua),
    supportCta: { title: ua ? "Потрібне рішення освітлення Exproof?" : "Need an Exproof Lighting Solution?", description: ua ? "Обговоріть застосування, конфігурацію моделі та проєктні опції з нашою технічною командою." : "Discuss the application, model configuration and project options with our technical team.", action: talkToTeam(ua) },
  };
}

export function exproofSeriesContentForMarket(market: MarketCode) {
  return { ldbexp: exproofContent("ldbexp", market), gslExp: exproofContent("gsl", market) };
}

const SERA_MODELS: readonly LedSeriesModel[] = [
  { model: "LED-BUS-S80W", powerW: 80, voltage: "110–240 Vac", frequency: "50–60 Hz", powerFactor: ">0.95", ledQty: 24, colourTemperature: "D.B", ip: "IP66", dimensions: "50 cm", operatingTemperature: "−30 to +60 °C", weightKg: "5.5 kg" },
  { model: "LED-BUS-S180W", powerW: 100, voltage: "110–240 Vac", frequency: "50–60 Hz", powerFactor: ">0.95", ledQty: 32, colourTemperature: "D.B", ip: "IP66", dimensions: "102 cm", operatingTemperature: "−30 to +60 °C", weightKg: "6.5 kg" },
];

export function seraLedSeriesContentForMarket(market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  return {
    ...shared(market, "gersan-sera-led-greenhouse-luminaires", "GERSAN SERA-LED Greenhouse Luminaires"),
    metadata: { title: "GERSAN SERA-LED Greenhouse Luminaires | InfraVolt", description: ua ? "Каталожні тепличні світильники SERA-LED для освітлення, специфічного для рослин." : "Catalogue-verified SERA-LED horticultural luminaires for plant-specific greenhouse lighting." },
    hero: { eyebrow: "SERA-LED", category: ua ? "Спеціалізоване та вибухозахищене освітлення" : "Special & Hazardous Environment Lighting", title: "GERSAN SERA-LED Greenhouse Luminaires", description: ua ? "Освітлення зі спектром і довжиною хвилі, специфічними для рослин, для теплиць, додаткового освітлення та застосувань штучного вирощування." : "Plant-specific spectrum and wavelength lighting for greenhouse, supplemental-lighting and artificial-light cultivation applications.", ...heroActions(ua) },
    heroImage: `${CATEGORY_ASSET_BASE}/product/gersan-sera-led-hero-product-transparent.webp`,
    heroImageAlt: ua ? "Лінійний тепличний світильник GERSAN SERA-LED з каталогу" : "GERSAN SERA-LED linear greenhouse luminaire from the catalogue",
    heroBackgroundImage: `${CATEGORY_ASSET_BASE}/product/background/gersan-sera-led-hero-background.webp`,
    heroBackgroundImageAlt: ua ? "Ряди теплиці, освітлені світильниками SERA-LED" : "Greenhouse rows illuminated by SERA-LED luminaires",
    technicalInformation: [
      { icon: "performance", title: ua ? "Агротехнічний вихід" : "Horticultural Output", values: [{ label: ua ? "Спектр" : "Spectrum", value: ua ? "Індивідуальний/запитаний спектр і довжини хвиль для рослин" : "Custom/requested plant spectrum and wavelengths" }, { label: ua ? "Освітлення" : "Illumination", value: ua ? "Рівномірне" : "Uniform" }, { label: ua ? "Застосування" : "Use", value: ua ? "Додаткове або штучне освітлення рослин" : "Supplemental or artificial plant lighting" }] },
      { icon: "light-quality", title: ua ? "Електрика" : "Electrical", values: [{ label: ua ? "Напруга" : "Voltage", value: "110–240 Vac" }, { label: ua ? "Частота" : "Frequency", value: "50–60 Hz" }, { label: ua ? "Коефіцієнт потужності" : "Power Factor", value: ">0.95" }] },
      { icon: "protection-electrical", title: ua ? "Захист" : "Protection", values: [{ label: ua ? "Захист" : "Protection", value: "IP66" }, { label: ua ? "Середовище" : "Environment", value: ua ? "Внутрішнє / зовнішнє" : "Indoor / outdoor" }, { label: ua ? "Стійкість" : "Resistance", value: ua ? "Вологість і вода" : "Humidity and water" }] },
      { icon: "construction", title: ua ? "Конструкція" : "Construction", values: [{ label: ua ? "Корпус" : "Body", value: ua ? "Анодований пресований або литий алюміній" : "Anodized extruded or injection aluminium" }, { label: ua ? "Оптична кришка" : "Optical Cover", value: ua ? "Ультрапрозоре загартоване скло" : "Ultra-clear tempered glass" }, { label: ua ? "Система" : "System", value: ua ? "Конфігурація шинопроводу або кабельна · заявлено Plug-N-Play" : "Busbar or cabled configuration · Plug-N-Play statement" }] },
    ],
    modelsIntroduction: ua ? "Два точні каталожні позначення моделей зі збереженими значеннями технічної таблиці." : "Two exact catalogue model designations with the technical-table values preserved.",
    models: SERA_MODELS,
    modelsNote: ua ? "Позначення моделі збережено точно як опубліковано; каталожний технічний розклад LED-BUS-S180W вказує 100 Вт. D.B збережено як каталожна нотація." : "Model designation retained exactly as published; the LED-BUS-S180W catalogue technical schedule lists 100 W. D.B is preserved as catalogue notation.",
    modelsColumns: { model: ua ? "Модель / код каталогу" : "Model / Catalogue Code", power: ua ? "Потужність" : "Power", voltage: ua ? "Напруга" : "Voltage", frequency: ua ? "Частота" : "Frequency", powerFactor: ua ? "Коеф. потужн." : "PF", ledQty: ua ? "Кількість LED" : "LED Qty", colourTemperature: ua ? "CCT / спектр" : "CCT / Spectrum", ip: "IP", dimensions: ua ? "Довжина" : "Length", operatingTemperature: ua ? "Робоча темп." : "Operating Temp.", weight: ua ? "Маса" : "Weight" },
    modelsFilters: filters(market, "Search SERA-LED model code", "Пошук за кодом моделі SERA-LED"),
    familyTechnicalSection: { heading: ua ? "Агротехнічний спектр і застосування" : "Horticultural Spectrum & Application", introduction: ua ? "SERA-LED призначений для забезпечення рішень спектра та довжини хвилі, специфічних для рослин, коли природного сезонного чи денного світла недостатньо." : "SERA-LED is intended to provide plant-specific spectrum and wavelength solutions where natural seasonal or daily light is insufficient.", settings: [
      { label: ua ? "Стадії росту" : "Growth Stages", value: ua ? "Вегетативний ріст і цвітіння" : "Vegetative growth and flowering", description: ua ? "Каталог обговорює освітлення рослин на різних стадіях росту." : "The catalogue discusses plant lighting across growth stages." },
      { label: ua ? "Групи культур" : "Crop Groups", value: ua ? "Овочі · Фрукти · Квіти" : "Vegetables · Fruit · Flowers", description: ua ? "Каталожні застосування вирощування без вигаданих рецептів для культур." : "Catalogue-listed growing applications without invented crop recipes." },
      { label: ua ? "Роль освітлення" : "Lighting Role", value: ua ? "Додаткове або штучне світло" : "Supplemental or artificial light", description: ua ? "Для контрольованого вирощування, де природного світла недостатньо." : "For controlled cultivation where natural light is insufficient." },
      { label: ua ? "Дизайн спектра" : "Spectrum Design", value: ua ? "Запитаний спектр / довжина хвилі" : "Requested spectrum / wavelength", description: ua ? "Проєктно-залежний дизайн спектра, заявлений у каталозі." : "Project-dependent spectrum design stated by the catalogue." },
    ], assets: [] },
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Анодований пресований або литий алюміній" : "Anodized extruded or injection aluminium" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP66" },
      warrantyItem(ua, 7),
    ],
    technicalAssets: [
      { title: ua ? "Агротехнічний спектр" : "Horticultural Spectrum", image: `${CATEGORY_ASSET_BASE}/photometric/gersan-sera-led-spectrum-chart.png`, imageAlt: ua ? "Спектральна діаграма SERA-LED" : "SERA-LED horticultural spectrum chart" },
      { title: ua ? "Технічне креслення" : "Technical Drawing", image: `${CATEGORY_ASSET_BASE}/technical/gersan-sera-led-technical-drawing.png`, imageAlt: ua ? "Габаритне та монтажне креслення SERA-LED" : "SERA-LED dimensional and mounting drawing" },
    ],
    dimensionNote: ua ? "Спектр і технічне креслення взято з каталожної сторінки SERA-LED." : "Spectrum and technical drawing extracted from the SERA-LED catalogue page.",
    applications: [
      { icon: "parks", title: ua ? "Комерційні теплиці" : "Commercial Greenhouses", description: ua ? "Додаткове освітлення рослин у комерційних тепличних середовищах." : "Supplemental plant lighting in commercial greenhouse environments.", image: `${APPLICATION_ASSET_BASE}/sera-led-greenhouse-application.webp`, imageAlt: ua ? "Комерційна теплиця, освітлена світильниками SERA-LED" : "Commercial greenhouse illuminated by SERA-LED luminaires" },
      { icon: "industrial-facility", title: ua ? "Вирощування овочів" : "Vegetable Production", description: ua ? "Світло, специфічне для рослин, для застосувань вирощування овочів." : "Plant-specific light for vegetable growing applications.", image: `${APPLICATION_ASSET_BASE}/sera-led-application-vegetable-production.webp`, imageAlt: ua ? "Вирощування овочів під тепличним освітленням SERA-LED" : "Vegetable production under SERA-LED greenhouse lighting" },
      { icon: "parks", title: ua ? "Фруктові культури" : "Fruit Crops", description: ua ? "Запитані рішення спектра для вирощування фруктів." : "Requested spectrum solutions for fruit cultivation.", image: `${APPLICATION_ASSET_BASE}/sera-led-application-fruit-crops.webp`, imageAlt: ua ? "Фруктові культури під тепличним освітленням SERA-LED" : "Fruit crops under SERA-LED greenhouse lighting" },
      { icon: "parks", title: ua ? "Вирощування квітів і декоративних рослин" : "Flower & Ornamental Growing", description: ua ? "Світлова підтримка для вирощування квітів і декоративних рослин." : "Light support for flowering and ornamental growing.", image: `${APPLICATION_ASSET_BASE}/sera-led-application-flower-ornamental-growing.webp`, imageAlt: ua ? "Вирощування квітів і декоративних рослин під освітленням SERA-LED" : "Flower and ornamental growing under SERA-LED lighting" },
      { icon: "warehouse", title: ua ? "Зони розсади / розмноження" : "Seedling / Propagation Areas", description: ua ? "Зони з контрольованим освітленням для підтримки раннього росту рослин." : "Controlled-light areas supporting early plant growth.", image: `${APPLICATION_ASSET_BASE}/sera-led-application-seedling-propagation.webp`, imageAlt: ua ? "Зона розсади під освітленням SERA-LED" : "Seedling propagation area under SERA-LED lighting" },
      { icon: "lighting-control", title: ua ? "Додаткове та штучне освітлення" : "Supplemental & Artificial Lighting", description: ua ? "Світло там, де денного чи сезонного природного світла недостатньо." : "Light where daily or seasonal natural light is insufficient.", image: `${APPLICATION_ASSET_BASE}/special-hazardous-controlled-growing-environments-application.webp`, imageAlt: ua ? "Контрольоване середовище вирощування, освітлене для культивації рослин" : "Controlled growing environment illuminated for plant cultivation" },
    ],
    supportCta: { title: ua ? "Плануєте проєкт тепличного освітлення?" : "Planning a Greenhouse Lighting Project?", description: ua ? "Обговоріть середовище культур, запит на спектр і конфігурацію SERA-LED з нашою технічною командою." : "Discuss the crop environment, spectrum request and SERA-LED configuration with our technical team.", action: talkToTeam(ua) },
  };
}

function inspectionModels(prefix: "TEX" | "AUTO"): readonly LedSeriesModel[] {
  const powers = prefix === "TEX" ? [3, 5, 10] : [10, 20, 30];
  const leds = prefix === "TEX" ? [3, 5, 10] : [10, 20, 30];
  return ["3UV", "5UV", "10UV"].map((suffix, index) => ({
    model: `${prefix}-LED ${suffix}`, powerW: powers[index]!, voltage: "100–240 Vac", frequency: "50–60 Hz", powerFactor: ">0.95", ledQty: leds[index]!, colourTemperature: "UV-360NM", ip: "IP66", dimensions: index === 2 ? "102 cm" : "50 cm", operatingTemperature: "−30 to +60 °C", weightKg: "3.0 kg",
  }));
}

function inspectionApplications(tex: boolean, ua: boolean) {
  return tex ? [
    { icon: "industrial-facility", title: ua ? "Контроль тканини" : "Fabric Inspection", description: ua ? "Контроль дефектів тканини під УФ-світлом 360 нм." : "Inspection for fabric faults under UV 360 nm violet light.", image: `${APPLICATION_ASSET_BASE}/special-hazardous-textile-production-inspection-application.webp`, imageAlt: ua ? "Контроль текстильного виробництва під спеціалізованим освітленням" : "Textile production inspection under specialised lighting" },
    { icon: "warehouse", title: ua ? "Контроль нитки" : "Thread Inspection", description: ua ? "Контроль дефектів нитки, не видимих при звичайному освітленні." : "Inspection of thread faults not visible under normal light.", image: `${APPLICATION_ASSET_BASE}/special-hazardous-thread-quality-control-application.webp`, imageAlt: ua ? "Контроль якості нитки під спеціалізованим освітленням" : "Thread quality-control inspection under specialised lighting" },
    { icon: "industrial-facility", title: ua ? "Виявлення дефектів перед виробництвом" : "Pre-Production Defect Detection", description: ua ? "Перевірка якості перед подальшою обробкою матеріалу." : "Quality checks before material progresses through manufacturing.", image: `${APPLICATION_ASSET_BASE}/tex-led-application-pre-production-defect-detection.webp`, imageAlt: ua ? "Виявлення дефектів текстилю TEX-LED перед виробництвом" : "TEX-LED pre-production textile defect-detection application" },
    { icon: "lighting-control", title: ua ? "Станції контролю якості текстилю" : "Textile Quality-Control Stations", description: ua ? "Спеціалізовані позиції контролю тканини та нитки." : "Dedicated fabric and thread inspection positions.", image: `${APPLICATION_ASSET_BASE}/tex-led-application-quality-control-stations.webp`, imageAlt: ua ? "Станція контролю якості текстилю TEX-LED" : "TEX-LED textile quality-control station" },
  ] as const : [
    { icon: "industrial-facility", title: ua ? "Контроль автомобільної фарби" : "Automotive Paint Inspection", description: ua ? "Контрольований огляд автомобільного лакофарбового покриття." : "Controlled inspection of automotive paint finish.", image: `${APPLICATION_ASSET_BASE}/special-hazardous-vehicle-paint-inspection-application.webp`, imageAlt: ua ? "Контроль фарбування автомобіля під освітленням AUTO-LED" : "Vehicle paint inspection under AUTO-LED lighting" },
    { icon: "lighting-control", title: ua ? "Підбір кольору" : "Colour Matching", description: ua ? "Підтримує оцінку кольору та варіантів під контрольованим світлом." : "Supports colour and variant evaluation under controlled light.", image: `${APPLICATION_ASSET_BASE}/auto-led-application-colour-matching.webp`, imageAlt: ua ? "Застосування підбору кольору автомобіля AUTO-LED" : "AUTO-LED automotive colour-matching application" },
    { icon: "industrial-facility", title: ua ? "Контроль поверхні перед фарбуванням" : "Pre-Paint Surface Inspection", description: ua ? "Перевірка поверхні перед нанесенням фарби." : "Surface checks before paint application.", image: `${APPLICATION_ASSET_BASE}/auto-led-application-pre-paint-surface-inspection.webp`, imageAlt: ua ? "Контроль поверхні перед фарбуванням AUTO-LED" : "AUTO-LED pre-paint surface-inspection application" },
    { icon: "parking", title: ua ? "Виявлення дефектів після фарбування" : "Post-Paint Defect Detection", description: ua ? "Контроль патьоків, голограм і слідів шліфування." : "Inspection for ripple, hologram and sanding marks.", image: `${APPLICATION_ASSET_BASE}/auto-led-application-post-paint-defect-detection.webp`, imageAlt: ua ? "Виявлення дефектів після фарбування AUTO-LED" : "AUTO-LED post-paint defect-detection application" },
    { icon: "warehouse", title: ua ? "Кузовні та ремонтні майстерні" : "Body & Repair Workshops", description: ua ? "Зони контролю ремонту фарби та відновлення покриття." : "Paint repair and refinishing inspection areas.", image: `${APPLICATION_ASSET_BASE}/auto-led-application-body-repair-workshops.webp`, imageAlt: ua ? "Кузовна ремонтна майстерня AUTO-LED" : "AUTO-LED body-repair workshop application" },
    { icon: "parking", title: ua ? "Пости обслуговування / відновлення покриття" : "Vehicle Service / Refinishing Bays", description: ua ? "Контрольоване освітлення для сервісних середовищ." : "Controlled inspection lighting for service environments.", image: `${APPLICATION_ASSET_BASE}/auto-led-application-vehicle-service-refinishing-bays.webp`, imageAlt: ua ? "Пост обслуговування та відновлення покриття AUTO-LED" : "AUTO-LED vehicle service and refinishing bay application" },
  ] as const;
}

function inspectionContent(kind: "tex" | "auto", market: MarketCode): LedSeriesDetailContent {
  const ua = market === "ua";
  const tex = kind === "tex";
  const slug = tex ? "gersan-tex-led-lighting-systems" : "gersan-auto-led-lighting-systems";
  const title = tex ? "GERSAN TEX-LED Lighting Systems" : "GERSAN AUTO-LED Lighting Systems";
  return {
    ...shared(market, slug, title),
    metadata: { title: `${title} | InfraVolt`, description: tex ? (ua ? "Каталожне УФ-освітлення 360 нм для контролю тканини та виявлення дефектів нитки." : "Catalogue-verified UV 360 nm textile inspection lighting for fabric and thread fault detection.") : (ua ? "Каталожне освітлення для контролю автомобільної фарби, кольору та якості поверхні." : "Catalogue-verified automotive paint, colour and surface-quality inspection lighting.") },
    hero: { eyebrow: tex ? "TEX-LED" : "AUTO-LED", category: ua ? "Спеціалізоване та вибухозахищене освітлення" : "Special & Hazardous Environment Lighting", title, description: tex ? (ua ? "УФ-освітлення для контролю текстилю з каталожним УФ-світлом 360 нм для виявлення дефектів тканини та нитки." : "UV-based textile inspection lighting using catalogue-specified UV 360 nm violet light to identify fabric and thread faults.") : (ua ? "Контрольоване освітлення для оцінки автомобільної фарби, підбору кольору та контролю якості поверхні." : "Controlled inspection lighting for automotive paint evaluation, colour matching and surface-quality control."), ...heroActions(ua) },
    heroImage: `${CATEGORY_ASSET_BASE}/product/gersan-${tex ? "tex" : "auto"}-led-hero-product-transparent.webp`,
    heroImageAlt: tex ? (ua ? "Лінійний світильник GERSAN TEX-LED для контролю текстилю" : "GERSAN TEX-LED linear textile-inspection luminaire") : (ua ? "Лінійний світильник GERSAN AUTO-LED для контролю автомобільної фарби" : "GERSAN AUTO-LED linear automotive paint-inspection luminaire"),
    heroBackgroundImage: `${CATEGORY_ASSET_BASE}/product/background/gersan-${tex ? "tex" : "auto"}-led-hero-background.webp`,
    heroBackgroundImageAlt: tex ? (ua ? "Застосування контролю текстилю з каталогу TEX-LED" : "Textile inspection application from the TEX-LED catalogue") : (ua ? "Застосування контролю фарби автомобіля з каталогу AUTO-LED" : "Vehicle paint inspection application from the AUTO-LED catalogue"),
    technicalInformation: [
      { icon: "performance", title: tex ? (ua ? "Інспекційне світло" : "Inspection Light") : (ua ? "Контроль фарби" : "Paint Inspection"), values: tex ? [{ label: ua ? "Довжина хвилі" : "Wavelength", value: ua ? "УФ 360 нм фіолетове світло" : "UV 360 nm violet light" }, { label: ua ? "Призначення" : "Purpose", value: ua ? "Контроль дефектів тканини та нитки" : "Fabric and thread fault inspection" }, { label: ua ? "Освітлення" : "Illumination", value: ua ? "Рівномірне" : "Uniform" }] : [{ label: ua ? "Призначення" : "Purpose", value: ua ? "Контроль кольору / варіанту та фарби" : "Colour / variant and paint inspection" }, { label: ua ? "Перевірки поверхні" : "Surface Checks", value: ua ? "Патьоки · Голограми · Сліди шліфування" : "Ripple · Hologram · Sanding marks" }, { label: ua ? "Застосування" : "Use", value: ua ? "До та після фарбування" : "Before and after painting" }] },
      { icon: "light-quality", title: ua ? "Електрика" : "Electrical", values: [{ label: ua ? "Напруга" : "Voltage", value: "100–240 Vac" }, { label: ua ? "Частота" : "Frequency", value: "50–60 Hz" }, { label: ua ? "Коефіцієнт потужності" : "Power Factor", value: ">0.95" }] },
      { icon: "protection-electrical", title: ua ? "Захист" : "Protection", values: [{ label: ua ? "Захист" : "Protection", value: "IP66" }, { label: ua ? "Робоча температура" : "Operating Temperature", value: "−30 to +60 °C" }] },
      { icon: "construction", title: ua ? "Конструкція" : "Construction", values: [{ label: ua ? "Корпус / кришки" : "Body / Covers", value: ua ? "Анодований" : "Anodized" }, { label: ua ? "Розсіювач" : "Diffuser", value: ua ? "Сатинований опаловий PS високого пропускання" : "High-transmission satin PS opal" }, { label: ua ? "Конфігурація" : "Configuration", value: tex ? (ua ? "Кабельна · нестандартні розміри за запитом" : "Cabled · custom sizes on request") : (ua ? "Рівномірне інспекційне освітлення" : "Uniform inspection illumination") }] },
    ],
    modelsIntroduction: ua ? `Три точні каталожні моделі ${tex ? "TEX-LED" : "AUTO-LED"}. Суфікси моделей і значення потужності з технічної таблиці зберігаються окремо.` : `Three exact ${tex ? "TEX-LED" : "AUTO-LED"} catalogue models. Model suffixes and technical-table power values are kept separate.`,
    models: inspectionModels(tex ? "TEX" : "AUTO"),
    modelsColumns: { model: ua ? "Модель / код каталогу" : "Model / Catalogue Code", power: ua ? "Потужність" : "Power", voltage: ua ? "Напруга" : "Voltage", frequency: ua ? "Частота" : "Frequency", powerFactor: ua ? "Коеф. потужн." : "PF", ledQty: ua ? "Кількість LED" : "LED Qty", colourTemperature: ua ? "Світло" : "Light", ip: "IP", dimensions: ua ? "Довжина" : "Length", operatingTemperature: ua ? "Робоча темп." : "Operating Temp.", weight: ua ? "Маса" : "Weight" },
    modelsFilters: filters(market, `Search ${tex ? "TEX-LED" : "AUTO-LED"} model code`, `Пошук за кодом моделі ${tex ? "TEX-LED" : "AUTO-LED"}`),
    familyTechnicalSection: tex ? {
      heading: ua ? "УФ-контроль текстилю" : "UV Textile Inspection", introduction: ua ? "TEX-LED створений для перевірки дефектів тканини та нитки, які можуть бути непомітними при звичайному освітленні, перед подальшою обробкою виробу." : "TEX-LED is produced for checking faults in fabric and threads that may not be visible under normal light before the product progresses through manufacturing.", settings: [
        { label: ua ? "Інспекційне світло" : "Inspection Light", value: ua ? "УФ 360 нм фіолетове світло" : "UV 360 nm violet light", description: ua ? "Точна каталожна довжина хвилі для контролю." : "The exact catalogue-stated inspection wavelength." },
        { label: ua ? "Об'єкт контролю" : "Inspection Target", value: ua ? "Дефекти тканини та нитки" : "Fabric and thread faults", description: ua ? "Підтримує виявлення дефектів, не видимих при звичайному світлі." : "Supports detection of faults not visible under normal light." },
        { label: ua ? "Етап процесу" : "Process Point", value: ua ? "Перед подальшим виробництвом" : "Before further manufacturing", description: ua ? "Призначено для контролю якості на виробництві." : "Intended for production quality-control inspection." },
      ], assets: [],
    } : {
      heading: ua ? "Контроль фарби та підбір кольору" : "Paint Inspection & Colour Matching", introduction: ua ? "AUTO-LED розроблений для підтримки оцінки кольору під контрольованим інспекційним світлом до, під час і після фарбування автомобіля." : "AUTO-LED is designed to support colour evaluation under controlled inspection lighting before, during and after automotive paint work.", settings: [
        { label: ua ? "Оцінка кольору" : "Colour Evaluation", value: ua ? "Підбір кольору та варіанту" : "Colour and variant selection", description: ua ? "Підтримує контрольований підбір кольору без заяв про числову точність." : "Supports controlled colour matching without claiming numerical accuracy." },
        { label: ua ? "Контроль поверхні" : "Surface Inspection", value: ua ? "Патьоки · Голограми · Сліди шліфування" : "Ripple · Hologram · Sanding marks", description: ua ? "Каталожні дефекти покриття для контролю." : "Catalogue-listed finish defects for inspection." },
        { label: ua ? "Етапи процесу" : "Process Stages", value: ua ? "Контроль до фарбування та пофарбованих ділянок" : "Pre-paint and painted-area inspection", description: ua ? "Контроль до та після фарбування." : "Inspection before and after painting." },
        { label: ua ? "Ремонт" : "Repair", value: ua ? "Підтримка ремонту та відновлення покриття" : "Repair and refinishing support", description: ua ? "Призначено для зменшення переробки під час ремонту/відновлення." : "Intended to help reduce rework during repair/refinishing." },
      ], assets: [],
    },
    technicalAssurance: [
      { icon: "colour-finish", label: ua ? "Колір і покриття" : "Colour & Finish", value: ua ? "Анодований корпус і кришки" : "Anodized body and covers" },
      { icon: "compliance", label: ua ? "Відповідність" : "Compliance", value: "IP66" },
      warrantyItem(ua, tex ? 5 : 7),
    ],
    technicalAssets: [
      { title: ua ? "Опромінення / фотометричні дані" : "Irradiance / Photometric Data", image: `${CATEGORY_ASSET_BASE}/photometric/gersan-${tex ? "tex" : "auto"}-led-irradiance-range-chart.png`, imageAlt: ua ? `Каталожна діаграма діапазону опромінення ${tex ? "TEX-LED" : "AUTO-LED"}` : `${tex ? "TEX-LED" : "AUTO-LED"} catalogue irradiance-range chart` },
      { title: ua ? "Технічне креслення" : "Technical Drawing", image: `${CATEGORY_ASSET_BASE}/technical/gersan-${tex ? "tex" : "auto"}-led-technical-drawing.png`, imageAlt: ua ? `Каталожне технічне креслення ${tex ? "TEX-LED" : "AUTO-LED"}` : `${tex ? "TEX-LED" : "AUTO-LED"} catalogue technical drawing` },
    ],
    dimensionNote: ua ? `Технічні матеріали взято з каталожної сторінки ${tex ? "TEX-LED" : "AUTO-LED"}.` : `Technical assets extracted from the ${tex ? "TEX-LED" : "AUTO-LED"} catalogue page.`,
    applications: inspectionApplications(tex, ua),
    supportCta: { title: tex ? (ua ? "Потрібне рішення освітлення для контролю текстилю?" : "Need a Textile Inspection Lighting Solution?") : (ua ? "Потрібне рішення для контролю автомобільної фарби?" : "Need an Automotive Paint Inspection Solution?"), description: ua ? `Обговоріть вимогу ${tex ? "контролю якості текстилю" : "контролю фарби та кольору"} з нашою технічною командою.` : `Discuss the ${tex ? "textile quality-control" : "paint and colour-inspection"} requirement with our technical team.`, action: talkToTeam(ua) },
  };
}

export function texLedSeriesContentForMarket(market: MarketCode) { return inspectionContent("tex", market); }
export function autoLedSeriesContentForMarket(market: MarketCode) { return inspectionContent("auto", market); }

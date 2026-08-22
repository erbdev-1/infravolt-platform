import generatedResources from "./resources.generated.json";

import type { MarketCode } from "@/modules/markets/types";

export type ResourceType = "certificate" | "catalogue" | "technical";
export type ResourceSystemKey = "busbar" | "cable" | "earthing" | "underfloor" | "led" | "gbus";

export type TechnicalResource = Readonly<{
  id: string;
  title: string;
  productSystem: string;
  productSystemKey: ResourceSystemKey;
  documentType: ResourceType;
  documentSubtype?: string;
  issuer?: string;
  documentNumber?: string;
  sourceCatalogue?: string;
  sourcePages?: string;
  downloadPath: string;
  fileType: "PDF";
  fileSize: string;
  fileSizeBytes: number;
  searchText: string;
  sortOrder: number;
}>;

export type ResourcesUiContent = Readonly<{
  metadata: { title: string; description: string };
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  browseLabel: string;
  requestLabel: string;
  overview: readonly [
    { type: "certificate"; title: string; description: string; action: string },
    { type: "catalogue"; title: string; description: string; action: string },
    { type: "technical"; title: string; description: string; action: string },
  ];
  libraryEyebrow: string;
  libraryHeading: string;
  libraryDescription: string;
  searchLabel: string;
  searchPlaceholder: string;
  clearSearch: string;
  documentTypeLabel: string;
  typeLabels: Record<ResourceType, string>;
  productSystemLabel: string;
  allSystems: string;
  systemLabels: Record<ResourceSystemKey, string>;
  resultSingular: string;
  resultPlural: string;
  noResults: string;
  resetFiltersLabel: string;
  downloadLabel: string;
  referenceNumberLabel: string;
  showingLabel: string;
  loadMoreLabel: string;
  sourceNote: string;
  requestEyebrow: string;
  requestHeading: string;
  requestDescription: string;
  requestItems: readonly string[];
  requestAction: string;
}>;

const CONTENT = {
  uk: {
    metadata: {
      title: "Technical Resources | InfraVolt",
      description: "Download product catalogues, certificates, test reports and technical documents for InfraVolt electrical infrastructure systems.",
    },
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Technical Resources",
    eyebrow: "Resources",
    heading: "Technical Resources",
    introduction: "Access downloadable product catalogues, certificates, test reports and technical documents for InfraVolt and GERSAN electrical infrastructure systems.",
    browseLabel: "Browse Resources",
    requestLabel: "Request Technical Information",
    overview: [
      { type: "certificate", title: "Certificates & Test Reports", description: "Access catalogue-derived certificates, test confirmations, conformity documents and test reports.", action: "Browse Certificates" },
      { type: "catalogue", title: "Product Catalogues", description: "Download product-system catalogues for the current InfraVolt product range.", action: "Browse Catalogues" },
      { type: "technical", title: "Technical Documents", description: "Download installation, engineering and product technical documentation available from the source catalogues.", action: "Browse Technical Documents" },
    ],
    libraryEyebrow: "Downloads",
    libraryHeading: "Resource Library",
    libraryDescription: "Search and filter available technical resources by product system and document type.",
    searchLabel: "Search resources",
    searchPlaceholder: "Search resources...",
    clearSearch: "Clear",
    documentTypeLabel: "Document type",
    typeLabels: { certificate: "Certificates & Test Reports", catalogue: "Product Catalogues", technical: "Technical Documents" },
    productSystemLabel: "Product system",
    allSystems: "All Systems",
    systemLabels: { busbar: "Busbar Systems", cable: "Cable Management", earthing: "Earthing & Lightning Protection", underfloor: "Underfloor Cable Trunking", led: "LED Systems", gbus: "Smart Lighting & Automation" },
    resultSingular: "resource",
    resultPlural: "resources",
    noResults: "No resources match the selected filters.",
    resetFiltersLabel: "Reset filters",
    downloadLabel: "Download",
    referenceNumberLabel: "Ref.",
    showingLabel: "Showing",
    loadMoreLabel: "Load more",
    sourceNote: "Documents are reproduced from the source catalogues supplied for this project. Confirm applicability and current status for your project before use.",
    requestEyebrow: "Additional files",
    requestHeading: "Request Technical Information",
    requestDescription: "Need CAD, BIM, IES/LDT or another technical file? Tell us the product system and project requirement so the correct material can be coordinated.",
    requestItems: ["CAD / DWG", "BIM / Revit", "IES / LDT", "Additional dimensions", "Installation information", "Product datasheets"],
    requestAction: "Request Technical Information",
  },
  ua: {
    metadata: {
      title: "Технічні ресурси | InfraVolt",
      description: "Завантажуйте каталоги продукції, сертифікати, протоколи випробувань і технічні документи для систем електричної інфраструктури InfraVolt.",
    },
    breadcrumbHome: "Головна",
    breadcrumbCurrent: "Технічні ресурси",
    eyebrow: "Ресурси",
    heading: "Технічні ресурси",
    introduction: "Завантажуйте каталоги продукції, сертифікати, протоколи випробувань і технічні документи для систем електричної інфраструктури InfraVolt та GERSAN.",
    browseLabel: "Переглянути ресурси",
    requestLabel: "Запросити технічну інформацію",
    overview: [
      { type: "certificate", title: "Сертифікати та протоколи випробувань", description: "Каталожні сертифікати, підтвердження відповідності та протоколи випробувань.", action: "Переглянути сертифікати" },
      { type: "catalogue", title: "Каталоги продукції", description: "Каталоги систем для актуального асортименту InfraVolt.", action: "Переглянути каталоги" },
      { type: "technical", title: "Технічні документи", description: "Монтажна, інженерна та технічна документація з вихідних каталогів.", action: "Переглянути документи" },
    ],
    libraryEyebrow: "Завантаження",
    libraryHeading: "Бібліотека ресурсів",
    libraryDescription: "Шукайте та фільтруйте технічні ресурси за системою продукції й типом документа.",
    searchLabel: "Пошук ресурсів",
    searchPlaceholder: "Пошук ресурсів...",
    clearSearch: "Очистити",
    documentTypeLabel: "Тип документа",
    typeLabels: { certificate: "Сертифікати та випробування", catalogue: "Каталоги продукції", technical: "Технічні документи" },
    productSystemLabel: "Система продукції",
    allSystems: "Усі системи",
    systemLabels: { busbar: "Шинопровідні системи", cable: "Кабельні системи", earthing: "Заземлення та блискавкозахист", underfloor: "Підпідлогові кабельні системи", led: "LED-системи", gbus: "Розумне освітлення й автоматизація" },
    resultSingular: "ресурс",
    resultPlural: "ресурсів",
    noResults: "За вибраними фільтрами ресурсів не знайдено.",
    resetFiltersLabel: "Скинути фільтри",
    downloadLabel: "Завантажити",
    referenceNumberLabel: "№",
    showingLabel: "Показано",
    loadMoreLabel: "Показати ще",
    sourceNote: "Документи відтворено з вихідних каталогів, наданих для цього проєкту. Перед використанням підтвердьте застосовність і актуальний статус для вашого проєкту.",
    requestEyebrow: "Додаткові файли",
    requestHeading: "Запросити технічну інформацію",
    requestDescription: "Потрібні CAD, BIM, IES/LDT або інші технічні файли? Вкажіть систему продукції та вимоги проєкту, щоб ми підібрали правильні матеріали.",
    requestItems: ["CAD / DWG", "BIM / Revit", "IES / LDT", "Додаткові розміри", "Інформація з монтажу", "Технічні паспорти"],
    requestAction: "Запросити технічну інформацію",
  },
} as const satisfies Record<MarketCode, ResourcesUiContent>;

export const technicalResources = generatedResources.resources as unknown as readonly TechnicalResource[];

export function resourcesContentForMarket(market: MarketCode): ResourcesUiContent {
  return CONTENT[market];
}

import type { MarketCode } from "@/modules/markets/types";

export type ApplicationMapPageContent = Readonly<{
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  breadcrumbs: Readonly<{
    home: string;
    current: string;
  }>;
  // İki satırlı başlık: sektör adı + "Application Map" (bkz. header CSS'i,
  // text-transform:uppercase ile görsel olarak büyük harfe çevrilir).
  headingSector: string;
  headingSuffix: string;
  introduction: string;
  overviewThumbnailLabel: string;
  zoneNavigationLabel: string;
  zonePreviousLabel: string;
  zoneNextLabel: string;
  productNavigationLabel: string;
  // Bölge sayfasında, kullanıcı bu oturumda henüz bir ürün/hotspot
  // seçmediyse gösterilen tek seferlik ilk-ziyaret ipucu metni.
  zoneHintLabel: string;
  // Bölge modunda "genel görünüme dön" (sayfadan çıkmaz, yalnız durumu
  // sıfırlar); overview modunda ise gerçek bir önceki sayfaya/route'a gider.
  backToOverviewLabel: string;
  backToMapsLabel: string;
  // Geri butonunun üzerinde görünen kısa etiket (erişilebilir isim ise
  // daha açıklayıcı backTo*Label değerlerini kullanmaya devam eder).
  backShortLabel: string;
  brandMarkLabel: string;
  resetViewLabel: string;
  fullscreenLabel: string;
  exitFullscreenLabel: string;
  panel: Readonly<{
    usedHereForHeading: string;
    applicationPointsHeading: string;
    benefitsHeading: string;
    closeLabel: string;
    // Bir zone'da aynı ürün ailesine ait birden fazla somut ürün varsa
    // (ör. Busbar Systems altında GGD + GNL), sol seçiciden açılan seçim
    // listesinin üst başlığı.
    chooseProductHeading: string;
  }>;
}>;

const APPLICATION_MAP_CONTENT = {
  uk: {
    metadata: {
      title: "Data Centre Application Map | InfraVolt",
      description:
        "Explore where InfraVolt electrical-infrastructure product systems can support cable routing, power distribution, lighting, earthing, lightning protection and EV charging across a modern Data Centre environment.",
    },
    breadcrumbs: {
      home: "Home",
      current: "Application Map",
    },
    headingSector: "Data Centre",
    headingSuffix: "Application Map",
    introduction:
      "Explore InfraVolt product systems across a modern\nData Centre environment.",
    overviewThumbnailLabel: "Overview",
    zoneNavigationLabel: "Data Centre zones",
    zonePreviousLabel: "Show previous zones",
    zoneNextLabel: "Show next zones",
    productNavigationLabel: "InfraVolt product families",
    zoneHintLabel: "Select a system to explore",
    backToOverviewLabel: "Back to Overview",
    backToMapsLabel: "Back to Application Maps",
    backShortLabel: "Back",
    brandMarkLabel: "InfraVolt home",
    resetViewLabel: "Reset View",
    fullscreenLabel: "Fullscreen",
    exitFullscreenLabel: "Exit Fullscreen",
    panel: {
      usedHereForHeading: "Used here for",
      applicationPointsHeading: "Application points",
      benefitsHeading: "Key benefits",
      closeLabel: "Close product information",
      chooseProductHeading: "Available systems in this zone",
    },
  },
  ua: {
    metadata: {
      title: "Карта застосувань центру обробки даних | InfraVolt",
      description:
        "Дізнайтеся, де системи електротехнічної інфраструктури InfraVolt можуть підтримати прокладання кабелів, розподіл живлення, освітлення, заземлення, блискавкозахист та зарядку електромобілів у сучасному центрі обробки даних.",
    },
    breadcrumbs: {
      home: "Головна",
      current: "Карта застосувань",
    },
    headingSector: "Центр обробки даних",
    headingSuffix: "Карта застосувань",
    introduction:
      "Дізнайтеся, де застосовуються системи InfraVolt у сучасному\nцентрі обробки даних.",
    overviewThumbnailLabel: "Огляд",
    zoneNavigationLabel: "Зони центру обробки даних",
    zonePreviousLabel: "Показати попередні зони",
    zoneNextLabel: "Показати наступні зони",
    productNavigationLabel: "Продуктові сімейства InfraVolt",
    zoneHintLabel: "Оберіть систему, щоб дізнатися більше",
    backToOverviewLabel: "До огляду",
    backToMapsLabel: "До карт застосувань",
    backShortLabel: "Назад",
    brandMarkLabel: "Головна сторінка InfraVolt",
    resetViewLabel: "Скинути вигляд",
    fullscreenLabel: "На весь екран",
    exitFullscreenLabel: "Вийти з повноекранного режиму",
    panel: {
      usedHereForHeading: "Застосування тут",
      applicationPointsHeading: "Точки застосування",
      benefitsHeading: "Основні переваги",
      closeLabel: "Закрити інформацію про продукт",
      chooseProductHeading: "Доступні системи в цій зоні",
    },
  },
} as const satisfies Readonly<Record<MarketCode, ApplicationMapPageContent>>;

export function applicationMapContentForMarket(
  market: MarketCode,
): ApplicationMapPageContent {
  return APPLICATION_MAP_CONTENT[market];
}

import type { ApplicationMapPageContent } from "./content";

import type { MarketCode } from "@/modules/markets/types";

// Education & Public Sector sayfasının arayüz metinleri — content.ts'teki
// Data Centre içeriğiyle aynı ApplicationMapPageContent şeklini kullanır.
// Genel arayüz metinleri (Reset View, Fullscreen, panel başlıkları vb.)
// kasıtlı olarak content.ts ile birebir aynıdır; yalnız sektöre özgü
// alanlar (başlık, tanıtım metni, bölge navigasyon etiketi, meta veri)
// farklıdır.
const EDUCATION_PUBLIC_SECTOR_CONTENT = {
  uk: {
    metadata: {
      title: "Education & Public Sector Application Map | InfraVolt",
      description:
        "Explore where InfraVolt electrical-infrastructure product systems can support cable routing, power distribution, lighting and earthing across a modern education and public sector campus.",
    },
    breadcrumbs: {
      home: "Home",
      current: "Application Map",
    },
    headingSector: "Education & Public Sector",
    headingSuffix: "Application Map",
    overviewHeadingPrimary: "Education & Public Sector",
    overviewHeadingSecondary: "Application Map",
    introduction:
      "Explore InfraVolt product systems across a modern\neducation and public sector campus.",
    overviewThumbnailLabel: "Overview",
    zoneNavigationLabel: "Campus zones",
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
      exploreSystemLabel: "Explore {system} →",
    },
  },
  ua: {
    metadata: {
      title: "Карта застосувань для освіти та громадського сектору | InfraVolt",
      description:
        "Дізнайтеся, де системи електротехнічної інфраструктури InfraVolt можуть підтримати прокладання кабелів, розподіл живлення, освітлення та заземлення в сучасному кампусі освітнього та громадського сектору.",
    },
    breadcrumbs: {
      home: "Головна",
      current: "Карта застосувань",
    },
    headingSector: "Освіта та громадський сектор",
    headingSuffix: "Карта застосувань",
    overviewHeadingPrimary: "Карта застосувань",
    overviewHeadingSecondary: "освіти та громадського сектору",
    introduction:
      "Дізнайтеся, де застосовуються системи InfraVolt у сучасному\nкампусі освітнього та громадського сектору.",
    overviewThumbnailLabel: "Огляд",
    zoneNavigationLabel: "Зони кампусу",
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
      exploreSystemLabel: "Переглянути {system} →",
    },
  },
} as const satisfies Readonly<Record<MarketCode, ApplicationMapPageContent>>;

export function educationPublicSectorApplicationMapContentForMarket(
  market: MarketCode,
): ApplicationMapPageContent {
  return EDUCATION_PUBLIC_SECTOR_CONTENT[market];
}

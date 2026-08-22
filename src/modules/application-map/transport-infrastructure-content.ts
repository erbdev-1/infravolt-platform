import type { ApplicationMapPageContent } from "./content";

import type { MarketCode } from "@/modules/markets/types";

const TRANSPORT_INFRASTRUCTURE_CONTENT = {
  uk: {
    metadata: {
      title: "Airport Application Map | InfraVolt",
      description:
        "Explore where InfraVolt electrical-infrastructure product systems can support cable routing, power distribution, lighting and earthing across a modern airport terminal.",
    },
    breadcrumbs: {
      home: "Home",
      current: "Application Map",
    },
    headingSector: "Airport",
    headingSuffix: "Application Map",
    overviewHeadingPrimary: "Airport",
    overviewHeadingSecondary: "Application Map",
    introduction:
      "Explore InfraVolt product systems across a modern\nairport terminal.",
    overviewThumbnailLabel: "Overview",
    zoneNavigationLabel: "Airport zones",
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
      title: "Карта застосувань для аеропорту | InfraVolt",
      description:
        "Дізнайтеся, де системи електротехнічної інфраструктури InfraVolt можуть підтримати прокладання кабелів, розподіл живлення, освітлення та заземлення в сучасному терміналі аеропорту.",
    },
    breadcrumbs: {
      home: "Головна",
      current: "Карта застосувань",
    },
    headingSector: "Аеропорт",
    headingSuffix: "Карта застосувань",
    overviewHeadingPrimary: "Карта застосувань",
    overviewHeadingSecondary: "аеропорту",
    introduction:
      "Дізнайтеся, де застосовуються системи InfraVolt в сучасному\nтерміналі аеропорту.",
    overviewThumbnailLabel: "Огляд",
    zoneNavigationLabel: "Зони аеропорту",
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

export function transportInfrastructureApplicationMapContentForMarket(
  market: MarketCode,
): ApplicationMapPageContent {
  return TRANSPORT_INFRASTRUCTURE_CONTENT[market];
}

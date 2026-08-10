import type { ApplicationMapPageContent } from "./content";

import type { MarketCode } from "@/modules/markets/types";

const INFRASTRUCTURE_UTILITIES_CONTENT = {
  uk: {
    metadata: {
      title: "Infrastructure & Utilities Application Map | InfraVolt",
      description:
        "Explore where InfraVolt electrical-infrastructure product systems can support cable routing, power distribution, lighting and earthing across a modern infrastructure and utilities site.",
    },
    breadcrumbs: {
      home: "Home",
      current: "Application Map",
    },
    headingSector: "Infrastructure & Utilities",
    headingSuffix: "Application Map",
    introduction:
      "Explore InfraVolt product systems across a modern\ninfrastructure and utilities site.",
    overviewThumbnailLabel: "Overview",
    zoneNavigationLabel: "Site zones",
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
      title: "Карта застосувань для інфраструктури та комунального господарства | InfraVolt",
      description:
        "Дізнайтеся, де системи електротехнічної інфраструктури InfraVolt можуть підтримати прокладання кабелів, розподіл живлення, освітлення та заземлення на сучасному об'єкті інфраструктури та комунального господарства.",
    },
    breadcrumbs: {
      home: "Головна",
      current: "Карта застосувань",
    },
    headingSector: "Інфраструктура та комунальне господарство",
    headingSuffix: "Карта застосувань",
    introduction:
      "Дізнайтеся, де застосовуються системи InfraVolt на сучасному\nоб'єкті інфраструктури та комунального господарства.",
    overviewThumbnailLabel: "Огляд",
    zoneNavigationLabel: "Зони об'єкта",
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

export function infrastructureUtilitiesApplicationMapContentForMarket(
  market: MarketCode,
): ApplicationMapPageContent {
  return INFRASTRUCTURE_UTILITIES_CONTENT[market];
}

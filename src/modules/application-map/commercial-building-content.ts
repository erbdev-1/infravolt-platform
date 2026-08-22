import type { ApplicationMapPageContent } from "./content";

import type { MarketCode } from "@/modules/markets/types";

const COMMERCIAL_BUILDING_CONTENT = {
  uk: {
    metadata: {
      title: "Commercial Building Application Map | InfraVolt",
      description:
        "Explore where InfraVolt electrical-infrastructure product systems can support cable routing, power distribution, lighting and earthing across a modern commercial office building.",
    },
    breadcrumbs: {
      home: "Home",
      current: "Application Map",
    },
    headingSector: "Commercial Building",
    headingSuffix: "Application Map",
    overviewHeadingPrimary: "Commercial Building",
    overviewHeadingSecondary: "Application Map",
    introduction:
      "Explore InfraVolt product systems across a modern\ncommercial office building.",
    overviewThumbnailLabel: "Overview",
    zoneNavigationLabel: "Building zones",
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
      title: "Карта застосувань для офісної будівлі | InfraVolt",
      description:
        "Дізнайтеся, де системи електротехнічної інфраструктури InfraVolt можуть підтримати прокладання кабелів, розподіл живлення, освітлення та заземлення в сучасній офісній будівлі.",
    },
    breadcrumbs: {
      home: "Головна",
      current: "Карта застосувань",
    },
    headingSector: "Офісна будівля",
    headingSuffix: "Карта застосувань",
    overviewHeadingPrimary: "Карта застосувань",
    overviewHeadingSecondary: "офісної будівлі",
    introduction:
      "Дізнайтеся, де застосовуються системи InfraVolt в сучасній\nофісній будівлі.",
    overviewThumbnailLabel: "Огляд",
    zoneNavigationLabel: "Зони будівлі",
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

export function commercialBuildingApplicationMapContentForMarket(
  market: MarketCode,
): ApplicationMapPageContent {
  return COMMERCIAL_BUILDING_CONTENT[market];
}

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
  heading: string;
  introduction: string;
  overviewInstructions: string;
  sceneDisclaimer: string;
  zoneNavigationLabel: string;
  productNavigationLabel: string;
  backToOverviewLabel: string;
  panel: Readonly<{
    usedHereForHeading: string;
    applicationPointsHeading: string;
    benefitsHeading: string;
    closeLabel: string;
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
    heading: "Data Centre Application Map",
    introduction:
      "Explore where InfraVolt electrical-infrastructure product systems can support cable routing, power distribution, lighting, earthing, lightning protection and EV charging across a modern Data Centre environment.",
    overviewInstructions:
      "Select a highlighted area of the building, or choose a zone below, to see relevant InfraVolt product systems.",
    sceneDisclaimer: "Data centre application visualisation",
    zoneNavigationLabel: "Data Centre zones",
    productNavigationLabel: "InfraVolt product families",
    backToOverviewLabel: "Back to Overview",
    panel: {
      usedHereForHeading: "Used here for",
      applicationPointsHeading: "Application points",
      benefitsHeading: "Key benefits",
      closeLabel: "Close product information",
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
    heading: "Карта застосувань центру обробки даних",
    introduction:
      "Дізнайтеся, де системи електротехнічної інфраструктури InfraVolt можуть підтримати прокладання кабелів, розподіл живлення, освітлення, заземлення, блискавкозахист та зарядку електромобілів у сучасному центрі обробки даних.",
    overviewInstructions:
      "Оберіть виділену зону будівлі або одну із зон нижче, щоб побачити відповідні системи InfraVolt.",
    sceneDisclaimer: "Візуалізація застосування в центрі обробки даних",
    zoneNavigationLabel: "Зони центру обробки даних",
    productNavigationLabel: "Продуктові сімейства InfraVolt",
    backToOverviewLabel: "Повернутися до огляду",
    panel: {
      usedHereForHeading: "Застосування тут",
      applicationPointsHeading: "Точки застосування",
      benefitsHeading: "Основні переваги",
      closeLabel: "Закрити інформацію про продукт",
    },
  },
} as const satisfies Readonly<Record<MarketCode, ApplicationMapPageContent>>;

export function applicationMapContentForMarket(
  market: MarketCode,
): ApplicationMapPageContent {
  return APPLICATION_MAP_CONTENT[market];
}

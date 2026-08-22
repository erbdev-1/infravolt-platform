import type { MarketCode } from "@/modules/markets/types";

export type TradeAccountStatusContent = Readonly<{
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  logoLabel: string;
  eyebrow: string;
  status: string;
  title: string;
  description: string;
  secondaryDescription: string;
  featureHeading: string;
  features: readonly string[];
  meantimeLabel: string;
  meantimeBody: string;
  primaryAction: Readonly<{ href: string; label: string }>;
  secondaryAction: Readonly<{ href: string; label: string }>;
}>;

const CONTENT: Record<MarketCode, TradeAccountStatusContent> = {
  uk: {
    metadata: {
      title: "Trade Account — In Development | InfraVolt",
      description:
        "InfraVolt's dedicated trade account service is being prepared for professional contractors, project buyers and commercial customers.",
    },
    logoLabel: "InfraVolt home",
    eyebrow: "Trade Account",
    status: "In Development",
    title: "Trade Account Access Is Coming Soon",
    description:
      "We are currently preparing InfraVolt's dedicated trade account service for professional contractors, project buyers and commercial customers.",
    secondaryDescription:
      "The service is being designed to provide a more streamlined way to manage commercial enquiries, project quotations and account-based support.",
    featureHeading: "What to expect",
    features: [
      "Dedicated trade account access",
      "Commercial pricing and quotation support",
      "Project quotation management",
      "Technical documentation access",
      "Account-based purchasing support",
    ],
    meantimeLabel: "In the meantime",
    meantimeBody:
      "Professional contractors and project buyers can continue to contact our commercial team for quotations, project support and technical information.",
    primaryAction: {
      href: "/contact?type=general",
      label: "Contact Our Commercial Team →",
    },
    secondaryAction: {
      href: "/contact?type=quote",
      label: "Request a Quote →",
    },
  },
  ua: {
    metadata: {
      title: "Торговий акаунт — у розробці | InfraVolt",
      description:
        "InfraVolt готує спеціалізований сервіс торгового акаунта для професійних підрядників, проєктних закупівельників і комерційних клієнтів.",
    },
    logoLabel: "Головна сторінка InfraVolt",
    eyebrow: "Торговий акаунт",
    status: "У розробці",
    title: "Доступ до торгового акаунта незабаром",
    description:
      "Ми готуємо спеціалізований сервіс торгового акаунта InfraVolt для професійних підрядників, проєктних закупівельників і комерційних клієнтів.",
    secondaryDescription:
      "Сервіс створюється для зручнішого керування комерційними запитами, проєктними пропозиціями та підтримкою на основі акаунта.",
    featureHeading: "Що планується",
    features: [
      "Доступ до спеціалізованого торгового акаунта",
      "Підтримка комерційних цін і пропозицій",
      "Керування проєктними пропозиціями",
      "Доступ до технічної документації",
      "Підтримка закупівель через акаунт",
    ],
    meantimeLabel: "Тим часом",
    meantimeBody:
      "Професійні підрядники та проєктні закупівельники можуть і надалі звертатися до нашої комерційної команди щодо пропозицій, підтримки проєктів і технічної інформації.",
    primaryAction: {
      href: "/contact?type=general",
      label: "Зв'язатися з комерційною командою →",
    },
    secondaryAction: {
      href: "/contact?type=quote",
      label: "Запросити пропозицію →",
    },
  },
};

export function tradeAccountStatusContentForMarket(
  market: MarketCode,
): TradeAccountStatusContent {
  return CONTENT[market];
}

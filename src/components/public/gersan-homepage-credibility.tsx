import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Section } from "@/components/ui/section";
import {
  getGersanMarketData,
  type GersanMarketQuote,
  type MarketMovement,
} from "@/modules/market-data/gersan";
import { GERSAN_COMPANY_ASSETS } from "@/modules/public-site/assets";

import type { PublicSiteContent } from "@/modules/public-site/content";

type GersanHomepageCredibilityProps = Readonly<{
  content: PublicSiteContent["manufacturerCredibility"];
}>;

type MarketCardProps = Readonly<{
  accessibleLabel: string;
  directionLabels: PublicSiteContent["manufacturerCredibility"]["marketDataLabels"];
  href: `https://${string}`;
  quote: GersanMarketQuote;
}>;

const MOVEMENT_SYMBOLS: Readonly<Record<MarketMovement, string>> = {
  down: "▼",
  flat: "—",
  up: "▲",
};

function decimal(value: number): string {
  return Math.abs(value).toFixed(2);
}

function signedDecimal(value: number): string {
  if (value > 0) return `+${decimal(value)}`;
  if (value < 0) return `-${decimal(value)}`;
  return decimal(value);
}

function marketCardAriaLabel(
  quote: GersanMarketQuote,
  accessibleLabel: string,
  labels: MarketCardProps["directionLabels"],
): string {
  if (
    quote.price === null ||
    quote.percentChange === null ||
    quote.movement === null
  ) {
    return `${accessibleLabel}. ${labels.unavailable}.`;
  }

  const direction = labels[quote.movement];
  const absoluteChange =
    quote.change === null ? "" : ` ${signedDecimal(quote.change)},`;
  return `${accessibleLabel}. ${direction}:${absoluteChange} ${signedDecimal(quote.percentChange)}%.`;
}

function MarketCard({
  accessibleLabel,
  directionLabels,
  href,
  quote,
}: MarketCardProps) {
  const hasPrice = quote.price !== null;
  const hasMovement =
    quote.percentChange !== null &&
    quote.movement !== null;

  return (
    <a
      aria-label={marketCardAriaLabel(quote, accessibleLabel, directionLabels)}
      className="gersan-market-card"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="gersan-market-card__header">
        <span>{quote.exchange} · {quote.symbol}</span>
        <span aria-hidden="true" className="gersan-market-card__external">↗</span>
      </span>

      <strong className="gersan-market-card__price">
        {hasPrice
          ? `${quote.currency === "TRY" ? "₺" : "$"}${quote.price.toFixed(2)}`
          : "—"}
      </strong>

      <span
        className={`gersan-market-card__change gersan-market-card__change--${
          quote.movement ?? "unavailable"
        }`}
      >
        {hasMovement ? (
          <>
            <span aria-hidden="true">{MOVEMENT_SYMBOLS[quote.movement!]}</span>
            <span>{quote.change === null ? "—" : signedDecimal(quote.change)}</span>
            <span>({signedDecimal(quote.percentChange!)}%)</span>
          </>
        ) : (
          <>
            <span>—</span>
            <span>(—)</span>
          </>
        )}
      </span>
    </a>
  );
}

// Desktop (>=80rem) uses a 2-column CSS Grid: content-top/content-bottom are
// both pinned to column 1 (stacked), the factory figure spans column 2 across
// both rows. Below 80rem the same three blocks become a simple flex column,
// so DOM order (content-top, figure, content-bottom) is what drives the
// required tablet/mobile reading order: eyebrow/heading/intro, image, proof
// strip, CTAs — without any JS viewport detection or duplicated markup.
export async function GersanHomepageCredibility({
  content,
}: GersanHomepageCredibilityProps) {
  const marketData = await getGersanMarketData();

  return (
    <Section className="gersan-credibility" tone="muted">
      <Container size="wide">
        <div className="gersan-credibility__grid">
          <div className="gersan-credibility__content-top">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2>{content.title}</h2>
            <p className="gersan-credibility__description">
              {content.description}
            </p>
          </div>

          <figure className="gersan-credibility__media">
            <Image
              alt={content.factoryImageAlt}
              fill
              sizes="(min-width: 80rem) 48vw, (min-width: 48rem) 92vw, 100vw"
              src={GERSAN_COMPANY_ASSETS.zonguldakFactory}
            />
            <div aria-hidden="true" className="gersan-credibility__media-overlay" />
          </figure>

          <div className="gersan-credibility__content-bottom">
            <dl className="gersan-credibility__proof">
              {content.proofPoints.map((value) => (
                <div key={value}>
                  <dt>{value}</dt>
                </div>
              ))}
            </dl>

            <div className="gersan-credibility__actions">
              <LinkButton
                aria-label={content.primaryAction.accessibleLabel}
                href={content.primaryAction.href}
                rel="noopener noreferrer"
                target="_blank"
                variant="primary"
              >
                {content.primaryAction.label}
                <span aria-hidden="true">↗</span>
              </LinkButton>

              <div className="gersan-credibility__market-grid">
                <MarketCard
                  accessibleLabel={content.bistAction.accessibleLabel}
                  directionLabels={content.marketDataLabels}
                  href={content.bistAction.href}
                  quote={marketData.gerel}
                />

                <MarketCard
                  accessibleLabel={content.otcAction.accessibleLabel}
                  directionLabels={content.marketDataLabels}
                  href={content.otcAction.href}
                  quote={marketData.gerlf}
                />
              </div>

            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

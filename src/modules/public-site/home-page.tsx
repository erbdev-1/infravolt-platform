import { publicMediaUrl } from "@/modules/storage/asset-url";

import Image from "next/image";

import { AccessibleVideo } from "@/components/public/accessible-video";
import { GersanHomepageCredibility } from "@/components/public/gersan-homepage-credibility";
import { TechnicalResourcesPreview } from "@/components/public/technical-resources-preview";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { TrackedCtaLink } from "@/modules/analytics/tracked-cta-link";
import { localeForMarket } from "@/modules/markets/locale";
import {
  INDUSTRY_ASSETS,
  MEDIA_ASSETS,
  PRODUCT_ASSETS,
  PRODUCT_PAGE_HREFS,
} from "@/modules/public-site/assets";
import { publicSiteContentForMarket } from "@/modules/public-site/content";

import type { MarketCode } from "@/modules/markets/types";

type HomePageViewProps = Readonly<{
  market: MarketCode;
}>;

const HERO_BADGES = [
  {
    id: "cable-management",
    src: publicMediaUrl("media/hero-badges/cable-management.webp"),
    label: "Cable Management Systems",
    className: "hero-badge--cable",
    href: "#product-systems",
  },
  {
    id: "busbar",
    src: publicMediaUrl("media/hero-badges/busbar-systems.webp"),
    label: "Busbar Systems",
    className: "hero-badge--busbar",
    href: "#product-systems",
  },
  {
    id: "underfloor",
    src: publicMediaUrl("media/hero-badges/underfloor-cable-trunking.webp"),
    label: "Underfloor Cable Trunking",
    className: "hero-badge--underfloor",
    href: "#product-systems",
  },
  {
    id: "earthing",
    src: publicMediaUrl("media/hero-badges/earthing-lightning-protection.webp"),
    label: "Earthing and Lightning Protection",
    className: "hero-badge--earthing",
    href: "#product-systems",
  },
  {
    id: "led",
    src: publicMediaUrl("media/hero-badges/led-systems.webp"),
    label: "LED Systems",
    className: "hero-badge--led",
    href: "#product-systems",
  },
  {
    id: "ev-charging",
    src: publicMediaUrl("media/hero-badges/ev-charging-systems.webp"),
    label: "EV Charging Systems",
    className: "hero-badge--ev",
    href: "#product-systems",
  },
] as const;

// Onaylı yerel WebP/SVG dosyaları yayına hazırdır; unoptimized kullanımı yeniden kodlama hatasıyla görsellerin kaybolmasını önler.
export function HomePageView({ market }: HomePageViewProps) {
  const content = publicSiteContentForMarket(market);
  const locale = localeForMarket(market);

  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <AccessibleVideo
          className="hero__video"
          desktopSource={MEDIA_ASSETS.hero.videoDesktop}
          fallback={content.hero.fallback}
          label={content.hero.videoLabel}
          mobileSource={MEDIA_ASSETS.hero.videoMobile}
          pauseLabel={content.hero.pauseLabel}
          playLabel={content.hero.playLabel}
          poster={MEDIA_ASSETS.hero.poster}
        />

        <div aria-hidden="true" className="hero__overlay" />

        <Container className="hero__content" size="wide">
          <div className="hero__copy">
            <p className="eyebrow">{content.hero.eyebrow}</p>

            {content.hero.relationshipLabel ? (
              <p className="relationship-label">
                {content.hero.relationshipLabel}
              </p>
            ) : null}

            <h1 id="hero-title">
              {content.hero.titleLeadPhrase ? (
                <>
                  <span className="hero__title-lead">
                    {content.hero.titleLeadPhrase}
                  </span>
                  {content.hero.title.slice(content.hero.titleLeadPhrase.length)}
                </>
              ) : (
                content.hero.title
              )}
            </h1>

            <p className="hero__description">{content.hero.description}</p>

            <div className="button-group">
              <LinkButton
                href={content.hero.primaryAction.href}
                variant="accent"
              >
                {content.hero.primaryAction.label}
              </LinkButton>

              <TrackedCtaLink
                ctaLocation="home_hero"
                ctaName="request_project_support"
                href={content.hero.secondaryAction.href}
                locale={locale}
                market={market}
                variant="light-outline"
              >
                {content.hero.secondaryAction.label}
              </TrackedCtaLink>
            </div>
          </div>

          <div className="hero__visual">
            <span
              aria-hidden="true"
              className="hero__visual-arc hero__visual-arc--blue"
            />

            <span
              aria-hidden="true"
              className="hero__visual-arc hero__visual-arc--red"
            />

            <span aria-hidden="true" className="hero__connector" />

            <div className="hero__badges">
              {HERO_BADGES.map((badge) => (
                <a
                  aria-label={`Explore ${badge.label}`}
                  className={`hero-badge ${badge.className}`}
                  href="#product-systems"
                  key={badge.id}
                >
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="hero-badge__image"
                    height={1024}
                    priority={badge.id === "busbar"}
                    src={badge.src}
                    unoptimized
                    width={1024}
                  />
                </a>
              ))}
            </div>

            <div className="hero__value-strip">
              <span>One Partner</span>
              <span>Six Product Groups</span>
              <span>Complete Project Support</span>
            </div>
          </div>
        </Container>
      </section>

      <GersanHomepageCredibility content={content.manufacturerCredibility} />

      <Section className="products-section" id="product-systems" tone="white">
        <Container size="wide">
          <div className="section-heading products-heading">
            <div className="products-heading__eyebrow">
              <Image
                alt="Gersan"
                className="products-heading__logo"
                height={28}
                src="/assets/brand/gersan-logo.png"
                unoptimized
                width={126}
              />

              <span>{content.products.eyebrow}</span>
            </div>

            <h2>{content.products.title}</h2>

            <p className="section-heading__introduction">
              {content.products.introduction}
            </p>
          </div>
          <div className="product-grid">
            {content.products.items.map((item) => {
              const asset = PRODUCT_ASSETS[item.id];
              const href =
                PRODUCT_PAGE_HREFS[item.id as keyof typeof PRODUCT_PAGE_HREFS];
              const isExternal = href.startsWith("http");

              return (
                <a
                  aria-label={`Explore ${item.title}`}
                  className="product-card"
                  href={href}
                  key={item.id}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  target={isExternal ? "_blank" : undefined}
                >
                  <div className="product-card__media">
                    <Image
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      src={asset.image}
                      unoptimized
                    />
                  </div>

                  <div className="product-card__content">
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="product-card__icon"
                      height={38}
                      src={asset.icon}
                      unoptimized
                      width={38}
                    />

                    <div className="product-card__copy">
                      <div className="product-card__title-row">
                        <h3>{item.title}</h3>
                      </div>

                      <p>{item.description}</p>
                    </div>
                  </div>

                  <span aria-hidden="true" className="product-card__action">
                    <span>Explore System</span>
                    <span>→</span>
                  </span>
                </a>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="industries-section" id="industries" tone="muted">
        <Container size="wide">
          <SectionHeading
            eyebrow={content.industries.eyebrow}
            introduction={content.industries.introduction}
            title={content.industries.title}
          />
          <div className="industry-grid">
            {content.industries.items.map((item) => (
              <article className="industry-card" key={item.id}>
                <a
                  aria-label={`${content.industries.actionLabel}: ${item.title}`}
                  className="industry-card__link"
                  href={item.href}
                >
                  <div className="industry-card__media">
                    <Image
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      src={INDUSTRY_ASSETS[item.id].image}
                      unoptimized
                    />
                  </div>

                  <div className="industry-card__content">
                    <div className="industry-card__copy">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <span aria-hidden="true" className="industry-card__action">
                      <span>{content.industries.actionLabel}</span>
                      <span className="industry-card__arrow">→</span>
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <TechnicalResourcesPreview content={content.technicalDocuments} />
    </main>
  );
}

import Image from "next/image";

import { AccessibleVideo } from "@/components/public/accessible-video";
import type { ProductId } from "@/modules/public-site/assets";
import { DATA_CENTRE_APPLICATION_MAP } from "@/modules/application-map/data-centre";
import { UKSupportPreview } from "@/components/public/uk-support-preview";
import { TechnicalResourcesPreview } from "@/components/public/technical-resources-preview";
import { GersanManufacturerPreview } from "@/components/public/gersan-manufacturer-preview";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import {
  INDUSTRY_ASSETS,
  MEDIA_ASSETS,
  PRODUCT_ASSETS,
} from "@/modules/public-site/assets";
import { publicSiteContentForMarket } from "@/modules/public-site/content";

import type { MarketCode } from "@/modules/markets/types";

type HomePageViewProps = Readonly<{
  market: MarketCode;
}>;

const PRODUCT_PAGE_HREFS = {
  busbar: "/products/busbar",
  "cable-management": "/products/cable-support-systems",
  "earthing-lightning": "/products/earthing-and-lightning-protection",
  underfloor: "/products/underfloor-systems",
  "led-bus lighting": "/products/lighting-busbar",
  "ev-charging": "/products/ev-charging",
} as const satisfies Readonly<Record<ProductId, string>>;

const FEATURED_APPLICATION_SCENE = DATA_CENTRE_APPLICATION_MAP.overview;

const HERO_BADGES = [
  {
    id: "cable-management",
    src: "/assets/media/hero-badges/cable-management.webp",
    label: "Cable Management Systems",
    className: "hero-badge--cable",
    href: "#product-systems",
  },
  {
    id: "busbar",
    src: "/assets/media/hero-badges/busbar-systems.webp",
    label: "Busbar Systems",
    className: "hero-badge--busbar",
    href: "#product-systems",
  },
  {
    id: "underfloor",
    src: "/assets/media/hero-badges/underfloor-cable-trunking.webp",
    label: "Underfloor Cable Trunking",
    className: "hero-badge--underfloor",
    href: "#product-systems",
  },
  {
    id: "earthing",
    src: "/assets/media/hero-badges/earthing-lightning-protection.webp",
    label: "Earthing and Lightning Protection",
    className: "hero-badge--earthing",
    href: "#product-systems",
  },
  {
    id: "led",
    src: "/assets/media/hero-badges/led-systems.webp",
    label: "LED Systems",
    className: "hero-badge--led",
    href: "#product-systems",
  },
  {
    id: "ev-charging",
    src: "/assets/media/hero-badges/ev-charging-systems.webp",
    label: "EV Charging Systems",
    className: "hero-badge--ev",
    href: "#product-systems",
  },
] as const;

// Onaylı yerel WebP/SVG dosyaları yayına hazırdır; unoptimized kullanımı yeniden kodlama hatasıyla görsellerin kaybolmasını önler.
export function HomePageView({ market }: HomePageViewProps) {
  const content = publicSiteContentForMarket(market);

  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <AccessibleVideo
          className="hero__video"
          fallback={content.hero.fallback}
          label={content.hero.videoLabel}
          pauseLabel={content.hero.pauseLabel}
          playLabel={content.hero.playLabel}
          poster={MEDIA_ASSETS.hero.poster}
          source={MEDIA_ASSETS.hero.video}
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

            <h1 id="hero-title">{content.hero.title}</h1>

            <p className="hero__description">{content.hero.description}</p>

            <div className="button-group">
              <LinkButton
                href={content.hero.primaryAction.href}
                variant="accent"
              >
                {content.hero.primaryAction.label}
                <span aria-hidden="true">→</span>
              </LinkButton>

              <LinkButton
                href={content.hero.secondaryAction.href}
                variant="light-outline"
              >
                {content.hero.secondaryAction.label}
                <span aria-hidden="true">→</span>
              </LinkButton>
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

              return (
                <a
                  aria-label={`Explore ${item.title}`}
                  className="product-card"
                  href={href}
                  key={item.id}
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

      <Section
        className="application-section"
        id="application-map"
        tone="white"
      >
        <Container className="application-feature__grid" size="wide">
          <div className="application-feature__copy">
            <SectionHeading
              eyebrow={content.applicationMap.eyebrow}
              introduction={content.applicationMap.description}
              title={content.applicationMap.title}
            />

            <ul className="application-feature__steps">
              {content.applicationMap.connections.map((item) => (
                <li key={item}>
                  <span
                    aria-hidden="true"
                    className="application-feature__step-marker"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <LinkButton
              className="application-feature__button"
              href={content.applicationMap.action.href}
            >
              <span>{content.applicationMap.action.label}</span>
              <span aria-hidden="true">→</span>
            </LinkButton>
          </div>

          <a
            aria-label={content.applicationMap.action.label}
            className="application-preview"
            href={content.applicationMap.action.href}
          >
            <div className="application-preview__toolbar">
              <strong>{content.applicationMap.previewTitle}</strong>
              <span>{content.applicationMap.previewZones[0]}</span>
            </div>

            <div className="application-preview__scene">
              <Image
                alt={FEATURED_APPLICATION_SCENE.imageAlt[market]}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                src={FEATURED_APPLICATION_SCENE.image}
                unoptimized
              />

              <div
                aria-hidden="true"
                className="application-preview__overlay"
              />

              {FEATURED_APPLICATION_SCENE.hotspots
                .slice(0, 4)
                .map((hotspot) => (
                  <span
                    aria-hidden="true"
                    className="application-preview__hotspot"
                    key={hotspot.id}
                    style={{
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                    }}
                  >
                    <span className="application-preview__hotspot-dot" />

                    <span className="application-preview__hotspot-label">
                      {hotspot.accessibleLabel[market]}
                    </span>
                  </span>
                ))}
            </div>

            <div className="application-preview__footer">
              <div aria-hidden="true" className="application-preview__zones">
                {content.applicationMap.previewZones.map((zone, index) => (
                  <span
                    className={
                      index === 0
                        ? "application-preview__zone application-preview__zone--active"
                        : "application-preview__zone"
                    }
                    key={zone}
                  >
                    {zone}
                  </span>
                ))}
              </div>

              <span className="application-preview__action">
                <span>{content.applicationMap.action.label}</span>
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </a>
        </Container>
      </Section>

      <UKSupportPreview content={content.support} />

      <GersanManufacturerPreview content={content.manufacturer} />

      <TechnicalResourcesPreview content={content.technicalDocuments} />

      <section className="contact-section" id="contact">
        <Container className="contact-section__inner" size="wide">
          <div>
            <p className="eyebrow">{content.contact.eyebrow}</p>
            <h2>{content.contact.title}</h2>
            <p>{content.contact.description}</p>
          </div>
          <div className="button-group">
            <LinkButton
              href={content.contact.primaryAction.href}
              variant="accent"
            >
              {content.contact.primaryAction.label}
            </LinkButton>
            <LinkButton
              href={content.contact.secondaryAction.href}
              variant="secondary"
            >
              {content.contact.secondaryAction.label}
            </LinkButton>
          </div>
        </Container>
      </section>
    </main>
  );
}

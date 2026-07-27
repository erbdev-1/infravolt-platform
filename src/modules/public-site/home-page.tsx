import Image from "next/image";

import { AccessibleVideo } from "@/components/public/accessible-video";
import type { ProductId } from "@/modules/public-site/assets";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import {
  CERTIFICATION_ASSETS,
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
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <small>{content.industries.imageDisclosure}</small>
                </div>
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
        <Container className="application-grid" size="wide">
          <div className="application-copy">
            <SectionHeading
              eyebrow={content.applicationMap.eyebrow}
              introduction={content.applicationMap.description}
              title={content.applicationMap.title}
            />
            <ol>
              {content.applicationMap.connections.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
            <LinkButton href={content.applicationMap.action.href}>
              {content.applicationMap.action.label}
            </LinkButton>
          </div>
          <div aria-hidden="true" className="application-visual">
            {content.industries.items.slice(0, 3).map((item, index) => (
              <div
                className={`application-visual__image application-visual__image--${index + 1}`}
                key={item.id}
              >
                <Image
                  alt=""
                  fill
                  sizes="(min-width: 768px) 24vw, 70vw"
                  src={INDUSTRY_ASSETS[item.id].image}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="support-section" id="project-support" tone="navy">
        <Container size="wide">
          <SectionHeading
            eyebrow={content.support.eyebrow}
            introduction={content.support.introduction}
            title={content.support.title}
          />
          <ol className="process-grid">
            {content.support.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="manufacturer-section" id="about-gersan" tone="white">
        <Container className="manufacturer-grid" size="wide">
          <div className="manufacturer-media">
            <AccessibleVideo
              fallback={content.manufacturer.fallback}
              label={content.manufacturer.videoLabel}
              pauseLabel={content.manufacturer.pauseLabel}
              playLabel={content.manufacturer.playLabel}
              poster={MEDIA_ASSETS.aboutGersan.poster}
              source={MEDIA_ASSETS.aboutGersan.video}
            />
            <p>{content.manufacturer.mediaOwnership}</p>
          </div>
          <div className="manufacturer-content">
            <p className="eyebrow">{content.manufacturer.eyebrow}</p>
            <h2>{content.manufacturer.title}</h2>
            <p className="manufacturer-content__introduction">
              {content.manufacturer.description}
            </p>
            <dl className="corporate-facts">
              {content.manufacturer.facts.map((fact) => (
                <div key={fact.title}>
                  <dt>{fact.title}</dt>
                  <dd>{fact.description}</dd>
                </div>
              ))}
            </dl>
            <div className="listing-statement">
              <strong>{content.manufacturer.listingLabel}</strong>
              <p>{content.manufacturer.listingStatement}</p>
            </div>
            <div className="button-group">
              <LinkButton href={content.manufacturer.internalAction.href}>
                {content.manufacturer.internalAction.label}
              </LinkButton>
              <a
                aria-label={content.manufacturer.externalAction.accessibleLabel}
                className="button-link button-link--external"
                href={content.manufacturer.externalAction.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {content.manufacturer.externalAction.label}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        className="technical-documents-section"
        id="technical-documents"
        tone="muted"
      >
        <Container className="technical-documents-grid" size="wide">
          <div>
            <SectionHeading
              eyebrow={content.technicalDocuments.eyebrow}
              introduction={content.technicalDocuments.description}
              title={content.technicalDocuments.title}
            />
            <LinkButton href={content.technicalDocuments.action.href}>
              {content.technicalDocuments.action.label}
            </LinkButton>
          </div>
          <ul>
            {content.technicalDocuments.items.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

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

      <section
        aria-labelledby="certification-heading"
        className="certification-strip"
      >
        <Container className="certification-strip__inner" size="wide">
          <div className="certification-strip__copy">
            <h2 id="certification-heading">{content.certifications.title}</h2>
            <p>{content.certifications.description}</p>
          </div>
          <div className="certification-strip__marks">
            {/* İşaretler InfraVolt sertifikası değildir; kapsam notu ürünlere toplu uygunluk atfedilmesini önler. */}
            {CERTIFICATION_ASSETS.map((mark) => (
              <div className="certification-mark" key={mark.label}>
                <Image
                  alt={`${mark.label} — ${content.certifications.markLabelSuffix}`}
                  fill
                  sizes="180px"
                  src={mark.image}
                  unoptimized
                />
              </div>
            ))}
          </div>
          <p className="certification-strip__scope">
            {content.certifications.scopeNote}
          </p>
        </Container>
      </section>
    </main>
  );
}

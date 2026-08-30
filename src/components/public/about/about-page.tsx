import Image from "next/image";
import type { CSSProperties } from "react";
import { preload } from "react-dom";

import { AboutGersanCopy } from "@/components/public/about/about-gersan-copy";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Section } from "@/components/ui/section";
import { aboutPageContentForMarket } from "@/modules/public-site/about-content";
import {
  GERSAN_COMPANY_ASSETS,
  GERSAN_QUALITY_ASSETS,
} from "@/modules/public-site/assets";
import { publicMediaUrl } from "@/modules/storage/asset-url";

import type { MarketCode } from "@/modules/markets/types";

import styles from "./about-page.module.css";

const FOOTPRINT_IMAGES = [
  GERSAN_COMPANY_ASSETS.tuzlaFactory,
  GERSAN_COMPANY_ASSETS.zonguldakFactory,
  GERSAN_COMPANY_ASSETS.omanFactory,
] as const;

const MARKET_PANEL_BACKGROUND_ASSETS: Record<MarketCode, string> = {
  uk: "company/infravolt-uk-market-card-background.webp",
  ua: "company/infravolt-ukraine-market-card-background.webp",
};

const QUALITY_MARKS = [
  { id: "lovag", label: "LOVAG", image: GERSAN_QUALITY_ASSETS.lovag },
  { id: "asta", label: "ASTA", image: GERSAN_QUALITY_ASSETS.asta },
  { id: "cesi", label: "CESI", image: GERSAN_QUALITY_ASSETS.cesi },
  {
    id: "iph-berlin",
    label: "IPH Berlin",
    image: GERSAN_QUALITY_ASSETS.iphBerlin,
  },
  { id: "kema", label: "KEMA", image: GERSAN_QUALITY_ASSETS.kema },
  { id: "tse", label: "TSE", image: GERSAN_QUALITY_ASSETS.tse },
  { id: "ce", label: "CE", image: GERSAN_QUALITY_ASSETS.ce },
  { id: "ul", label: "UL", image: GERSAN_QUALITY_ASSETS.ul },
  { id: "tuv", label: "TÜV", image: GERSAN_QUALITY_ASSETS.tuv },
  {
    id: "iso-management-systems",
    label: "ISO 9001, ISO 14001 and ISO 45001",
    image: GERSAN_QUALITY_ASSETS.isoManagementSystems,
  },
] as const;

type AboutPageViewProps = Readonly<{
  market: MarketCode;
}>;

const HERO_BACKGROUND_DESKTOP_URL = publicMediaUrl("company/about-hero-background.webp");
const HERO_BACKGROUND_MOBILE_URL = publicMediaUrl("company/about-hero-background-mobile.webp");

export function AboutPageView({ market }: AboutPageViewProps) {
  const content = aboutPageContentForMarket(market);
  const heroStyle = {
    "--hero-background-image": `url(${HERO_BACKGROUND_DESKTOP_URL})`,
    "--hero-mobile-background-image": `url(${HERO_BACKGROUND_MOBILE_URL})`,
  } as CSSProperties;

  // Confirmed LCP element (see docs/performance audit) — preload only the
  // variant the current viewport will actually use, matching the .hero
  // background-image media query below, so we never fetch both.
  preload(HERO_BACKGROUND_DESKTOP_URL, { as: "image", media: "(min-width: 48rem)" });
  preload(HERO_BACKGROUND_MOBILE_URL, { as: "image", media: "(max-width: 47.99rem)" });

  return (
    <main className={styles.page} id="main-content">
      <section
        aria-labelledby="about-hero-title"
        className={styles.hero}
        style={heroStyle}
      >
        <div aria-hidden="true" className={styles.heroBackdrop} />

        <Container className={styles.heroInner} size="wide">
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>{content.hero.eyebrow}</p>
            <h1 id="about-hero-title">{content.hero.title}</h1>
            <p className={styles.heroDescription}>{content.hero.description}</p>

            <div className={styles.heroActions}>
              <LinkButton href={content.hero.primaryAction.href} variant="accent">
                {content.hero.primaryAction.label}
                <span aria-hidden="true">→</span>
              </LinkButton>
              <LinkButton href={content.hero.secondaryAction.href} variant="light-outline">
                {content.hero.secondaryAction.label}
              </LinkButton>
            </div>

            <div aria-hidden="true" className={styles.heroMarkets}>
              {content.hero.markets.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>

          <div aria-hidden="true" className={styles.heroVisual}>
            <span className={styles.heroVisualGrid} />
            <span className={styles.heroVisualGlow} />
            <span className={`${styles.heroVisualNode} ${styles.heroVisualNode1}`} />
            <span className={`${styles.heroVisualNode} ${styles.heroVisualNode2}`} />
            <span className={`${styles.heroVisualNode} ${styles.heroVisualNode3}`} />
            <span className={styles.heroVisualRing} />
          </div>
        </Container>
      </section>

      <Section className={styles.whoWeAre} tone="muted">
        <Container size="wide">
          <div className={styles.whoWeAreGrid}>
            <div className={styles.whoWeAreBrand}>
              <p className="eyebrow">{content.whoWeAre.label}</p>
              <Image
                alt="InfraVolt"
                className={styles.whoWeAreLogo}
                height={235}
                sizes="(min-width: 768px) 13rem, 11rem"
                src={publicMediaUrl("brand/infravolt-wordmark-primary.webp")}
                unoptimized
                width={1040}
              />
              <p className={styles.whoWeAreDescriptor}>{content.whoWeAre.descriptor}</p>
            </div>
            <div className={styles.whoWeAreCopy}>
              <h2>{content.whoWeAre.statement}</h2>
              <span aria-hidden="true" className={styles.whoWeAreStatementAccent} />
              <p>{content.whoWeAre.supportingParagraph}</p>
            </div>
            <ul className={styles.whoWeAreCapabilities}>
              {content.whoWeAre.capabilities.map((capability) => (
                <li key={capability.title}>
                  <span aria-hidden="true" />
                  <div>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.whoWeAreActions}>
              <a href={content.hero.primaryAction.href}>
                {content.hero.primaryAction.label}
              </a>
              <a href={content.hero.secondaryAction.href}>
                {content.hero.secondaryAction.label}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section className={styles.relationshipEcosystem} tone="muted">
        <Container size="wide">
          <div className={styles.sectionHeading}>
            <p className="eyebrow">{content.relationship.label}</p>
            <h2>{content.relationship.title}</h2>
            <p className="section-heading__introduction">{content.relationship.introduction}</p>
          </div>

          <div className={styles.ecosystemFlow}>
            <article
              className={styles.gersanPlatform}
              style={
                {
                  "--gersan-platform-background-image": `url(${publicMediaUrl("company/gersan-market-card-background.webp")})`,
                  "--gersan-platform-motif-mobile-image": `url(${publicMediaUrl("company/gersan-market-card-motif-mobile.png")})`,
                } as CSSProperties
              }
            >
              <span aria-hidden="true" className={styles.gersanPlatformTexture} />
              <div className={styles.gersanPlatformHeader}>
                <Image
                  alt="GERSAN"
                  className={styles.gersanPlatformLogo}
                  height={132}
                  sizes="(min-width: 768px) 12rem, 10rem"
                  src="/assets/brand/gersan-logo.png"
                  unoptimized
                  width={583}
                />
                <div>
                  <p>{content.relationship.gersan.descriptor}</p>
                  <span>{content.relationship.gersan.description}</span>
                </div>
              </div>
              <ul className={styles.gersanCapabilityGrid}>
                {content.relationship.gersan.items.map((item, index) => (
                  <li key={item}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
            </article>

            <div className={styles.marketsGrid}>
              {content.relationship.panels.map((panel) => (
                <article
                  className={styles.marketPanel}
                  data-market={panel.id}
                  key={panel.id}
                  style={
                    {
                      "--market-panel-background-image": `url(${publicMediaUrl(MARKET_PANEL_BACKGROUND_ASSETS[panel.id])})`,
                    } as CSSProperties
                  }
                >
                  <div className={styles.marketPanelHeader}>
                    <div className={styles.marketPanelBrandRow}>
                      <span className={styles.marketMark}>{panel.id.toUpperCase()}</span>
                      <Image
                        alt="InfraVolt"
                        className={styles.marketPanelLogo}
                        height={235}
                        sizes="6.5rem"
                        src={publicMediaUrl("brand/infravolt-wordmark-transparent.webp")}
                        unoptimized
                        width={1040}
                      />
                      <h3>{panel.title}</h3>
                    </div>
                    <p className={styles.marketDescriptor}>{panel.descriptor}</p>
                  </div>
                  <p className={styles.marketCopy}>{panel.copy}</p>
                  <ul className={styles.marketSupportList}>
                    {panel.supportItems.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className={styles.aboutGersanSection} tone="white">
        <Container size="wide">
          <div className={styles.aboutGersanGrid}>
            <div className={styles.aboutGersanVisualColumn}>
              <figure className={styles.aboutGersanMedia}>
                <Image
                  alt={content.aboutGersan.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  src={GERSAN_COMPANY_ASSETS.tuzlaFactory}
                />
              </figure>

              <section
                aria-labelledby="about-gersan-quality-title"
                className={styles.aboutGersanQuality}
              >
                <h3 id="about-gersan-quality-title">
                  {content.aboutGersan.qualityLabel}
                </h3>
                <div className={styles.aboutGersanQualityGrid}>
                  {QUALITY_MARKS.map((mark) => (
                    <div className={styles.aboutGersanQualityCard} key={mark.id}>
                      <Image
                        alt={mark.label}
                        className={styles.aboutGersanQualityLogo}
                        height={72}
                        src={mark.image}
                        unoptimized
                        width={180}
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <AboutGersanCopy
              eyebrow={content.aboutGersan.label}
              paragraphs={content.aboutGersan.paragraphs}
              readLessLabel={content.aboutGersan.readLessLabel}
              readMoreLabel={content.aboutGersan.readMoreLabel}
              title={content.aboutGersan.title}
            />
          </div>
        </Container>
      </Section>

      <section aria-labelledby="corporate-credibility-title" className={styles.scale}>
        <Container size="wide">
          <h2 className={styles.visuallyHidden} id="corporate-credibility-title">
            {content.scale.title}
          </h2>
          <div className={styles.scaleGrid}>
            {content.scale.metrics.map((metric) => (
              <div className={styles.scaleMetric} key={metric.label}>
                <span className={styles.scaleValue}>{metric.value}</span>
                <span className={styles.scaleLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section className={styles.footprintSection} tone="muted">
        <Container size="wide">
          <div className={styles.sectionHeading}>
            <p className="eyebrow">{content.footprint.label}</p>
            <h2>{content.footprint.title}</h2>
            <p className="section-heading__introduction">{content.footprint.introduction}</p>
          </div>

          <ol className={styles.footprintGrid}>
            {content.footprint.locations.map((location, index) => (
              <li className={styles.footprintCard} key={location.number}>
                <figure className={styles.footprintCardMedia}>
                  <Image
                    alt={`${location.city} — ${location.role}`}
                    fill
                    sizes="(min-width: 64rem) 32vw, (min-width: 48rem) 46vw, 100vw"
                    src={FOOTPRINT_IMAGES[index] ?? FOOTPRINT_IMAGES[0]}
                  />
                  <span aria-hidden="true" className={styles.footprintCardNumber}>
                    {location.number}
                  </span>
                </figure>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className={styles.projectSupport} tone="white">
        <Container size="wide">
          <div className={styles.sectionHeading}>
            <p className="eyebrow">{content.process.label}</p>
            <h2>{content.process.title}</h2>
          </div>

          <ol className={styles.processTimeline}>
            {content.process.steps.map((step) => (
              <li className={styles.processStep} key={step.number}>
                <div className={styles.processStepHead}>
                  <span className={styles.processNumber}>{step.number}</span>
                  <span aria-hidden="true" className={styles.processAccent} />
                  <h3>{step.title}</h3>
                </div>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <section className={styles.finalCta} id="final-cta">
        <Container className={styles.finalCtaInner} size="wide">
          <div>
            <p className={styles.finalCtaEyebrow}>{content.finalCta.eyebrow}</p>
            <h2>{content.finalCta.title}</h2>
            <p>{content.finalCta.description}</p>
          </div>
          <div className={styles.finalCtaActions}>
            <LinkButton href={content.finalCta.primaryAction.href} variant="accent">
              {content.finalCta.primaryAction.label}
              <span aria-hidden="true">→</span>
            </LinkButton>
            <LinkButton href={content.finalCta.secondaryAction.href} variant="secondary">
              {content.finalCta.secondaryAction.label}
            </LinkButton>
          </div>
        </Container>
      </section>
    </main>
  );
}

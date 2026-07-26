import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";

import { publicSiteContentForMarket } from "@/modules/public-site/content";

import type { MarketCode } from "@/modules/markets/types";

type HomePageViewProps = Readonly<{
  market: MarketCode;
}>;

function SystemGraphic({ index }: Readonly<{ index: number }>) {
  return (
    <span aria-hidden="true" className="system-graphic">
      <span className="system-graphic__rail" />
      <span className="system-graphic__rail" />
      <span className="system-graphic__node">
        {String(index + 1).padStart(2, "0")}
      </span>
    </span>
  );
}

export function HomePageView({ market }: HomePageViewProps) {
  const content = publicSiteContentForMarket(market);

  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <Container className="hero__grid" size="wide">
          <div className="hero__content">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1 id="hero-title">{content.hero.title}</h1>
            <p className="hero__description">{content.hero.description}</p>
            <div className="button-group">
              <LinkButton href={content.hero.primaryAction.href}>
                {content.hero.primaryAction.label}
              </LinkButton>
              <LinkButton
                href={content.hero.secondaryAction.href}
                variant="secondary"
              >
                {content.hero.secondaryAction.label}
              </LinkButton>
            </div>
          </div>

          <div aria-hidden="true" className="hero-diagram">
            <div className="hero-diagram__heading">
              <span>{content.hero.diagramEyebrow}</span>
              <strong>{content.hero.diagramTitle}</strong>
            </div>
            <ol>
              {content.hero.diagramItems.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </ol>
            <div className="hero-diagram__lines">
              <span />
              <span />
              <span />
            </div>
          </div>
        </Container>
      </section>

      <Section id="systems" tone="white">
        <Container size="wide">
          <SectionHeading
            eyebrow={content.systems.eyebrow}
            introduction={content.systems.introduction}
            title={content.systems.title}
          />
          <div className="system-grid">
            {content.systems.items.map((item, index) => (
              <article className="system-card" key={item.title}>
                <SystemGraphic index={index} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="sectors" tone="muted">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow={content.sectors.eyebrow}
            introduction={content.sectors.introduction}
            title={content.sectors.title}
          />
          <div className="sector-grid">
            {content.sectors.items.map((item, index) => (
              <article className="sector-card" key={item.title}>
                <span aria-hidden="true" className="sector-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="support-section" id="support" tone="navy">
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

      <Section id="manufacturer" tone="white">
        <Container className="manufacturer-grid" size="wide">
          <div>
            <SectionHeading
              eyebrow={content.manufacturer.eyebrow}
              title={content.manufacturer.title}
            />
            <p className="manufacturer-grid__description">
              {content.manufacturer.description}
            </p>
            <p className="assurance-note">
              <span aria-hidden="true">i</span>
              {content.manufacturer.assurance}
            </p>
          </div>
          <div aria-hidden="true" className="manufacturer-visual">
            <span className="manufacturer-visual__label">
              {content.manufacturer.visualLabel}
            </span>
            <span className="manufacturer-visual__line manufacturer-visual__line--one" />
            <span className="manufacturer-visual__line manufacturer-visual__line--two" />
            <span className="manufacturer-visual__line manufacturer-visual__line--three" />
            <span className="manufacturer-visual__block manufacturer-visual__block--one" />
            <span className="manufacturer-visual__block manufacturer-visual__block--two" />
          </div>
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
    </main>
  );
}

import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { COMPANY_ASSETS } from "@/modules/public-site/assets";

import type { PublicSiteContent } from "@/modules/public-site/content";

type SupportContent = PublicSiteContent["support"];
type SupportService = SupportContent["services"][number];
type SupportServiceId = SupportService["id"];

type UKSupportHubProps = Readonly<{
  content: SupportContent;
}>;

function SupportIcon({
  id,
}: Readonly<{
  id: SupportServiceId;
}>) {
  if (id === "engineering") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path
          d="M4 19 15.5 7.5m-8-2 2-2 11 11-2 2-11-11ZM3 21l4.5-1.2L4.2 16.5 3 21Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (id === "warehouse") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path
          d="m3 9 9-5 9 5v11H3V9Zm4 11v-7h10v7M7 10h10"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (id === "showroom") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path
          d="M4 5h16v11H4V5Zm5 15h6m-3-4v4M8 9h8m-8 3h5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path
        d="M3 6h11v10H3V6Zm11 4h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function UKSupportHub({ content }: UKSupportHubProps) {
  return (
    <Section className="uk-support-section" id="project-support" tone="navy">
      <Container size="wide">
        <div className="uk-support-header">
          <SectionHeading
            eyebrow={content.eyebrow}
            introduction={content.introduction}
            title={content.title}
          />

          <div className="uk-support-header__actions">
            <LinkButton href={content.primaryAction.href} variant="accent">
              {content.primaryAction.label}
            </LinkButton>

            <LinkButton
              href={content.secondaryAction.href}
              variant="light-outline"
            >
              {content.secondaryAction.label}
            </LinkButton>
          </div>
        </div>

        <div className="uk-support-layout">
          <article className="uk-support-showroom">
            <div className="uk-support-showroom__media">
              <Image
                alt={content.showroom.imageAlt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                src={COMPANY_ASSETS.showroom.image}
                unoptimized
              />

              <div
                aria-hidden="true"
                className="uk-support-showroom__overlay"
              />
            </div>

            <div className="uk-support-showroom__content">
              <span className="uk-support-status">
                {content.showroom.eyebrow}
              </span>

              <h3>{content.showroom.title}</h3>

              <p>{content.showroom.description}</p>

              <small>{content.showroom.status}</small>
            </div>
          </article>

          <div className="uk-support-services">
            {content.services.map((service) => (
              <article className="uk-support-card" key={service.id}>
                <div className="uk-support-card__icon">
                  <SupportIcon id={service.id} />
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <article className="uk-support-warehouse">
          <div className="uk-support-warehouse__media">
            <Image
              alt={content.warehouse.imageAlt}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={COMPANY_ASSETS.warehouse.image}
              unoptimized
            />

            <div aria-hidden="true" className="uk-support-warehouse__overlay" />
          </div>

          <div className="uk-support-warehouse__content">
            <span className="uk-support-status">
              {content.warehouse.eyebrow}
            </span>

            <h3>{content.warehouse.title}</h3>

            <p>{content.warehouse.description}</p>

            <small>{content.warehouse.status}</small>

            <LinkButton href={content.primaryAction.href} variant="accent">
              {content.primaryAction.label}
            </LinkButton>
          </div>
        </article>

        <p className="uk-support-disclaimer">{content.disclaimer}</p>
      </Container>
    </Section>
  );
}

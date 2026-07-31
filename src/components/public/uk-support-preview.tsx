import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Section } from "@/components/ui/section";
import { COMPANY_ASSETS } from "@/modules/public-site/assets";

import type { PublicSiteContent } from "@/modules/public-site/content";

import styles from "./uk-support-preview.module.css";

type UKSupportPreviewProps = Readonly<{
  content: PublicSiteContent["support"];
}>;

export function UKSupportPreview({ content }: UKSupportPreviewProps) {
  return (
    <Section className={styles.section} id="project-support" tone="navy">
      <Container className={styles.grid} size="wide">
        <div className={styles.content}>
          <p className="eyebrow">{content.eyebrow}</p>

          <h2>{content.title}</h2>

          <p className={styles.introduction}>{content.introduction}</p>

          <ul className={styles.services}>
            {content.services.map((service) => (
              <li key={service.id}>
                <span aria-hidden="true" />
                {service.title}
              </li>
            ))}
          </ul>

          <LinkButton href={content.overviewAction.href} variant="accent">
            {content.overviewAction.label}
            <span aria-hidden="true">→</span>
          </LinkButton>
        </div>

        <div className={styles.visual}>
          <div className={styles.showroom}>
            <Image
              alt={content.showroom.imageAlt}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={COMPANY_ASSETS.showroom.image}
              unoptimized
            />
          </div>
          <div className={styles.warehouse}>
            <Image
              alt={content.warehouse.imageAlt}
              fill
              sizes="(min-width: 1024px) 25vw, 70vw"
              src={COMPANY_ASSETS.warehouse.image}
              unoptimized
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

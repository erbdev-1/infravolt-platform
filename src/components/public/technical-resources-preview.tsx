import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Section } from "@/components/ui/section";
import { TECHNICAL_RESOURCE_ICONS } from "@/modules/public-site/assets";

import type { PublicSiteContent } from "@/modules/public-site/content";

import styles from "./technical-resources-preview.module.css";

type TechnicalResourcesPreviewProps = Readonly<{
  content: PublicSiteContent["technicalDocuments"];
}>;

const RESOURCE_ICONS = [
  TECHNICAL_RESOURCE_ICONS.datasheets,
  TECHNICAL_RESOURCE_ICONS.certificatesTests,
  TECHNICAL_RESOURCE_ICONS.installationGuidance,
  TECHNICAL_RESOURCE_ICONS.bimCad,
  TECHNICAL_RESOURCE_ICONS.specificationSupport,
] as const;

export function TechnicalResourcesPreview({
  content,
}: TechnicalResourcesPreviewProps) {
  return (
    <Section className={styles.section} id="technical-documents" tone="muted">
      <Container className={styles.grid} size="wide">
        <div className={styles.content}>
          <p className="eyebrow">{content.eyebrow}</p>

          <h2>{content.title}</h2>

          <p className={styles.introduction}>{content.description}</p>

          <LinkButton href={content.action.href}>
            {content.action.label}
            <span aria-hidden="true">→</span>
          </LinkButton>
        </div>

        <div className={styles.cards}>
          {content.items.map((item, index) => {
            const isWide = index === content.items.length - 1;
            const icon = RESOURCE_ICONS[index];

            return (
              <article
                className={[styles.card, isWide ? styles.cardWide : ""]
                  .filter(Boolean)
                  .join(" ")}
                key={item.title}
              >
                <span aria-hidden="true" className={styles.cardAccent} />

                <div className={styles.cardHeading}>
                  <Image
                    alt=""
                    aria-hidden="true"
                    className={styles.cardIcon}
                    height={26}
                    src={icon}
                    unoptimized
                    width={26}
                  />

                  <h3>{item.title}</h3>
                </div>

                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

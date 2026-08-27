import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Section } from "@/components/ui/section";
import {
  GERSAN_COMPANY_ASSETS,
  GERSAN_QUALITY_ASSETS,
} from "@/modules/public-site/assets";

import type { PublicSiteContent } from "@/modules/public-site/content";

import styles from "./gersan-manufacturer-preview.module.css";

type GersanManufacturerPreviewProps = Readonly<{
  content: PublicSiteContent["manufacturer"];
}>;

const QUALITY_MARKS = [
  {
    id: "lovag",
    label: "LOVAG",
    image: GERSAN_QUALITY_ASSETS.lovag,
  },
  {
    id: "asta",
    label: "ASTA",
    image: GERSAN_QUALITY_ASSETS.asta,
  },
  {
    id: "cesi",
    label: "CESI",
    image: GERSAN_QUALITY_ASSETS.cesi,
  },
  {
    id: "iph-berlin",
    label: "IPH Berlin",
    image: GERSAN_QUALITY_ASSETS.iphBerlin,
  },
  {
    id: "kema",
    label: "KEMA",
    image: GERSAN_QUALITY_ASSETS.kema,
  },
  {
    id: "tse",
    label: "TSE",
    image: GERSAN_QUALITY_ASSETS.tse,
  },
  {
    id: "ce",
    label: "CE",
    image: GERSAN_QUALITY_ASSETS.ce,
  },
  {
    id: "ul",
    label: "UL",
    image: GERSAN_QUALITY_ASSETS.ul,
  },
  {
    id: "tuv",
    label: "TÜV",
    image: GERSAN_QUALITY_ASSETS.tuv,
  },
  {
    id: "iso-management-systems",
    label: "ISO 9001, ISO 14001 and ISO 45001",
    image: GERSAN_QUALITY_ASSETS.isoManagementSystems,
  },
] as const;

export function GersanManufacturerPreview({
  content,
}: GersanManufacturerPreviewProps) {
  return (
    <Section className={styles.section} id="about-gersan" tone="white">
      <Container size="wide">
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className="eyebrow">{content.eyebrow}</p>

            <h2>{content.title}</h2>

            <p className={styles.introduction}>{content.description}</p>

            <dl className={styles.facts}>
              {content.facts.map((fact) => (
                <div key={fact.title}>
                  <dt>{fact.title}</dt>
                  <dd>{fact.description}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.actions}>
              <LinkButton href={content.internalAction.href}>
                {content.internalAction.label}
              </LinkButton>

              <LinkButton
                aria-label={content.externalAction.accessibleLabel}
                href={content.externalAction.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {content.externalAction.label}
                <span aria-hidden="true">↗</span>
              </LinkButton>
            </div>
          </div>

          <figure className={styles.media}>
            <Image
              alt={content.factoryImageAlt}
              fill
              priority={false}
              sizes="(min-width: 1280px) 52vw, (min-width: 768px) 50vw, 100vw"
              src={GERSAN_COMPANY_ASSETS.factoryExterior}
              unoptimized
            />

            <div aria-hidden="true" className={styles.mediaOverlay} />

            <figcaption className={styles.mediaCaption}>
              <span aria-hidden="true" />
              {content.facilityLabel}
            </figcaption>
          </figure>
        </div>

        <div className={styles.quality}>
          <div className={styles.qualityHeading}>
            <p>{content.qualityLabel}</p>
          </div>

          <div className={styles.logoGrid}>
            {QUALITY_MARKS.map((mark) => (
              <div className={styles.logoCard} key={mark.id}>
                <Image
                  alt={mark.label}
                  className={styles.logoImage}
                  height={72}
                  src={mark.image}
                  style={{
                    height: "auto",
                    width: "auto",
                  }}
                  unoptimized
                  width={180}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

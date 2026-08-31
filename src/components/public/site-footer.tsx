"use client";

import { InfraVoltLogo } from "@/components/brand/infravolt-logo";
import { FooterNavAccordion } from "@/components/public/footer-nav-accordion";
import { Container } from "@/components/ui/container";
import { consentCopyForMarket } from "@/modules/analytics/consent-copy";
import { openConsentPreferences } from "@/modules/analytics/consent-store";
import { trackCtaClick } from "@/modules/analytics/tracker";
import { localeForMarket } from "@/modules/markets/locale";
import { PRODUCT_PAGE_HREFS } from "@/modules/public-site/assets";

import type { CSSProperties } from "react";
import type { MarketCode } from "@/modules/markets/types";
import type { PublicSiteContent } from "@/modules/public-site/content";

type SiteFooterProps = Readonly<{
  content: PublicSiteContent["shell"];
  market: MarketCode;
}>;

const FOOTER_CTA_HREF = "/contact?type=project";

// Icons only, per explicit instruction — no real profile URLs exist yet,
// so these are non-interactive (not <a>) rather than links to nowhere.
// Wrap in <a href="..."> once real LinkedIn/Instagram/YouTube URLs exist.
const SOCIAL_ICONS = [
  {
    label: "LinkedIn",
    color: "#0A66C2",
    path: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect height="12" width="4" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Instagram",
    color: "#E1306C",
    path: (
      <>
        <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    label: "YouTube",
    color: "#FF0000",
    path: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </>
    ),
  },
] as const;

export function SiteFooter({ content, market }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const locale = localeForMarket(market);
  const consentCopy = consentCopyForMarket(market);

  function handleFooterCtaClick() {
    trackCtaClick(
      { market, locale },
      { cta_name: "footer_discuss_project", cta_location: "footer" },
    );
  }

  const productLinks = content.footerProducts.map((item) => {
    const href = PRODUCT_PAGE_HREFS[item.id];
    return { href, label: item.label, isExternal: href.startsWith("http") };
  });
  const resourceLinks = content.footerResources.map((item) => ({
    href: item.href,
    label: item.label,
  }));
  const companyLinks = content.footerCompany.map((item) => ({
    href: item.href,
    label: item.label,
  }));

  return (
    <footer className="site-footer">
      <Container className="site-footer__grid" size="wide">
        <div className="site-footer__brand">
          <InfraVoltLogo
            accessibleLabel={`InfraVolt ${content.marketName}`}
            href="/"
            placement="footer"
            variant="transparent"
          />
          <p>{content.footerDescription}</p>
          {content.relationshipLabel ? (
            <p className="site-footer__relationship">
              {content.relationshipLabel}
            </p>
          ) : null}
          {content.registeredOffice ? (
            <address className="site-footer__registered-office">
              <span className="site-footer__registered-office-label">
                {content.registeredOffice.label}
              </span>
              {content.registeredOffice.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          ) : null}
        </div>

        <FooterNavAccordion
          groups={[
            {
              className: "site-footer__products",
              label: content.footerProductLabel,
              links: productLinks,
            },
            {
              className: "site-footer__resources",
              label: content.footerResourceLabel,
              links: resourceLinks,
            },
            {
              className: "site-footer__company",
              htmlId: "footer-company",
              label: content.footerCompanyLabel,
              links: companyLinks,
            },
          ]}
        />

        <div className="site-footer__cta">
          <p className="site-footer__cta-label">{content.footerCtaLabel}</p>
          <p className="site-footer__cta-copy">{content.footerCtaCopy}</p>
          <a className="site-footer__cta-action" href={FOOTER_CTA_HREF} onClick={handleFooterCtaClick}>
            {content.footerCtaActionLabel}
            <span aria-hidden="true">→</span>
          </a>

          <div className="site-footer__social">
            {SOCIAL_ICONS.map((icon) => (
              <span
                aria-label={icon.label}
                className="site-footer__social-icon"
                key={icon.label}
                role="img"
                style={{ "--social-icon-color": icon.color } as CSSProperties}
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  {icon.path}
                </svg>
              </span>
            ))}
          </div>
        </div>
      </Container>

      <div className="site-footer__legal">
        <Container className="site-footer__legal-inner" size="wide">
          <div className="site-footer__legal-meta">
            <p className="site-footer__copyright">© {currentYear} InfraVolt</p>
            <p className="site-footer__market">
              {content.footerMarketLabel}: {content.marketName} ·{" "}
              {content.localeName}
            </p>
          </div>

          <button
            className="site-footer__consent-trigger"
            onClick={() => openConsentPreferences()}
            type="button"
          >
            {consentCopy.preferencesTriggerLabel}
          </button>
        </Container>
      </div>
    </footer>
  );
}

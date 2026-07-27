import { BrandMark } from "@/components/public/brand-mark";
import { Container } from "@/components/ui/container";

import type { PublicSiteContent } from "@/modules/public-site/content";

type SiteFooterProps = Readonly<{
  content: PublicSiteContent["shell"];
}>;

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid" size="wide">
        <div className="site-footer__brand">
          <BrandMark descriptor={content.brandDescriptor} inverse />
          <p>{content.footerDescription}</p>
          {content.relationshipLabel ? (
            <p className="site-footer__relationship">
              {content.relationshipLabel}
            </p>
          ) : null}
        </div>
        <div>
          <p className="site-footer__label">{content.footerProductLabel}</p>
          <nav aria-label={content.footerProductLabel}>
            {content.footerProducts.map((item) => (
              <a href={item.href} key={`${item.href}-${item.label}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="site-footer__label">{content.footerResourceLabel}</p>
          <nav aria-label={content.footerResourceLabel}>
            {content.footerResources.map((item) => (
              <a href={item.href} key={`${item.href}-${item.label}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div id="footer-company">
          <p className="site-footer__label">{content.footerCompanyLabel}</p>
          <nav aria-label={content.footerCompanyLabel}>
            {content.footerCompany.map((item) => (
              <a href={item.href} key={`${item.href}-${item.label}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
      <Container className="site-footer__market" size="wide">
        <p>
          {content.footerMarketLabel}: {content.marketName} ·{" "}
          {content.localeName}
        </p>
      </Container>
    </footer>
  );
}

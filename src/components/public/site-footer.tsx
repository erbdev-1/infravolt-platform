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
        </div>
        <div>
          <p className="site-footer__label">{content.footerSystemsLabel}</p>
          <nav aria-label={content.footerSystemsLabel}>
            {content.navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="site-footer__label">{content.footerMarketLabel}</p>
          <p>{content.marketName}</p>
          <p>{content.localeName}</p>
        </div>
      </Container>
      <Container className="site-footer__legal" size="wide">
        <p>
          © {new Date().getFullYear()} {content.footerRights}
        </p>
      </Container>
    </footer>
  );
}

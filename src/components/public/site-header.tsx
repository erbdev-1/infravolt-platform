import { BrandMark } from "@/components/public/brand-mark";
import { MobileNavigation } from "@/components/public/mobile-navigation";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";

import type { PublicSiteContent } from "@/modules/public-site/content";

type SiteHeaderProps = Readonly<{
  content: PublicSiteContent["shell"];
}>;

export function SiteHeader({ content }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="utility-bar">
        <Container className="utility-bar__inner" size="wide">
          <p>{content.utilityMessage}</p>
          <p>
            <span>{content.marketLabel}:</span> {content.marketName}
            <span aria-hidden="true"> · </span>
            {content.localeName}
          </p>
        </Container>
      </div>

      <Container className="site-header__inner" size="wide">
        <BrandMark descriptor={content.brandDescriptor} />
        <nav
          aria-label={content.navigationLabel}
          className="desktop-navigation"
        >
          {content.navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <LinkButton
          className="site-header__cta"
          href={content.headerCta.href}
          variant="accent"
        >
          {content.headerCta.label}
        </LinkButton>
        <MobileNavigation content={content} />
      </Container>
    </header>
  );
}

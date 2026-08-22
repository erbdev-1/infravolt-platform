"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { InfraVoltLogo } from "@/components/brand/infravolt-logo";
import { MobileNavigation } from "@/components/public/mobile-navigation";
import { Container } from "@/components/ui/container";
import { PRODUCT_ENQUIRY_REVIEW_HREF } from "@/modules/enquiry/routing";
import { useEnquiryItems } from "@/modules/enquiry/store";

import type { PublicSiteContent } from "@/modules/public-site/content";

type SiteHeaderProps = Readonly<{
  content: PublicSiteContent["shell"];
}>;

function splitNavigationHref(href: string) {
  const hashIndex = href.indexOf("#");

  if (hashIndex < 0) {
    return {
      path: href,
      hash: "",
    };
  }

  return {
    path: href.slice(0, hashIndex) || "/",
    hash: href.slice(hashIndex),
  };
}

export function SiteHeader({ content }: SiteHeaderProps) {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("#top");
  const enquiryCount = useEnquiryItems().length;

  useEffect(() => {
    const updateActiveLink = () => {
      setActiveHash(window.location.hash || "#top");
    };

    updateActiveLink();

    window.addEventListener("hashchange", updateActiveLink);

    return () => {
      window.removeEventListener("hashchange", updateActiveLink);
    };
  }, []);

  return (
    <header className="site-header">
      <Container className="site-header__inner" size="wide">
        <div className="site-header__brand">
          <InfraVoltLogo
            accessibleLabel={`InfraVolt ${content.marketName} home`}
            href="/"
            placement="header"
          />

          {content.relationshipLabel ? (
            <span className="site-header__relationship">
              {content.relationshipLabel}
            </span>
          ) : null}
        </div>

        <nav
          aria-label={content.navigationLabel}
          className="desktop-navigation"
        >
          {content.navigation.map((item) => {
            const isContact = item.href === "/contact";
            const target = splitNavigationHref(item.href);

            const isActive = target.hash
              ? pathname === target.path && activeHash === target.hash
              : pathname === target.path;

            const className = [
              isActive ? "desktop-navigation__active" : "",
              isContact ? "desktop-navigation__contact" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <a
                className={className || undefined}
                href={item.href}
                key={`${item.href}-${item.label}`}
                onClick={() => {
                  if (target.hash) {
                    setActiveHash(target.hash);
                  }
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {enquiryCount > 0 ? (
          <a
            aria-label={`${content.enquiryLabel} (${enquiryCount})`}
            className="site-header__enquiry"
            href={PRODUCT_ENQUIRY_REVIEW_HREF}
          >
            {content.enquiryLabel}
            <span aria-hidden="true" className="site-header__enquiry-count">
              {enquiryCount}
            </span>
          </a>
        ) : null}

        <div className="site-header__commercial-actions">
          <a
            className="site-header__commercial-primary"
            href="/commercial-partners"
          >
            {content.commercialPartnersLabel}
          </a>
          <a className="site-header__trade-account" href="/trade-account">
            {content.tradeAccountLabel}
            <span>{content.soonLabel}</span>
          </a>
        </div>

        <MobileNavigation content={content} enquiryCount={enquiryCount} />
      </Container>
    </header>
  );
}

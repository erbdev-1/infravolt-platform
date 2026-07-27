"use client";

import { useEffect, useState } from "react";

import { InfraVoltLogo } from "@/components/brand/infravolt-logo";
import { MobileNavigation } from "@/components/public/mobile-navigation";
import { Container } from "@/components/ui/container";

import type { PublicSiteContent } from "@/modules/public-site/content";

type SiteHeaderProps = Readonly<{
  content: PublicSiteContent["shell"];
}>;

export function SiteHeader({ content }: SiteHeaderProps) {
  const [activeHref, setActiveHref] = useState("#top");

  useEffect(() => {
    const updateActiveLink = () => {
      setActiveHref(window.location.hash || "#top");
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
            const isDealer = item.label === "Dealer / Trade Account";
            const isContact = item.label === "Contact";

            const label = isDealer ? "References" : item.label;
            const href = isDealer ? "/references" : item.href;

            const isActive = activeHref === href;

            const className = [
              isActive ? "desktop-navigation__active" : "",
              isContact ? "desktop-navigation__contact" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <a
                className={className || undefined}
                href={href}
                key={`${href}-${label}`}
                onClick={() => {
                  if (href.startsWith("#")) {
                    setActiveHref(href);
                  }
                }}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <a className="desktop-navigation__dealer" href="/dealer">
          Dealer / Trade Account
        </a>

        <MobileNavigation content={content} />
      </Container>
    </header>
  );
}

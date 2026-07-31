"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { InfraVoltLogo } from "@/components/brand/infravolt-logo";
import { MobileNavigation } from "@/components/public/mobile-navigation";
import { Container } from "@/components/ui/container";

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
            const isDealer = item.label === "Dealer / Trade Account";
            const isContact =
              item.label === "Contact" || item.label === "Контакти";

            const label = isDealer ? "References" : item.label;
            const href = isDealer ? "/references" : item.href;
            const target = splitNavigationHref(href);

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
                href={href}
                key={`${href}-${label}`}
                onClick={() => {
                  if (target.hash) {
                    setActiveHash(target.hash);
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

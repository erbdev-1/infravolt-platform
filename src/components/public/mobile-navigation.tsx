"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { PublicSiteContent } from "@/modules/public-site/content";

type MobileNavigationProps = Readonly<{
  content: PublicSiteContent["shell"];
}>;

export function MobileNavigation({ content }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const mediaQuery = window.matchMedia("(min-width: 80rem)");

    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const closeMenu = () => {
      setIsOpen(false);
      buttonRef.current?.focus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleViewportChange);

    // Menü kapanırken sayfanın önceki scroll davranışını aynen geri yükler.
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, [isOpen]);

  return (
    <div className="mobile-navigation">
      <button
        aria-controls={dialogId}
        aria-expanded={isOpen}
        aria-label={isOpen ? content.closeMenuLabel : content.openMenuLabel}
        className="menu-button"
        onClick={() => setIsOpen((current) => !current)}
        ref={buttonRef}
        type="button"
      >
        <span aria-hidden="true" className="menu-button__icon">
          <span />
          <span />
          <span />
        </span>
      </button>

      {isOpen ? (
        <div className="mobile-navigation__panel" id={dialogId}>
          <nav aria-label={content.mobileNavigationLabel}>
            {content.navigation.map((item, index) => (
              <a
                href={item.href}
                key={`${item.href}-${item.label}`}
                onClick={() => setIsOpen(false)}
                ref={index === 0 ? firstLinkRef : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-navigation__market">
            <span>{content.marketLabel}</span>
            <strong>{content.marketName}</strong>
            <small>{content.localeName}</small>
          </div>
          {content.relationshipLabel ? (
            <p className="mobile-navigation__relationship">
              {content.relationshipLabel}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";

import { PRODUCT_ENQUIRY_REVIEW_HREF } from "@/modules/enquiry/routing";

import type { PublicSiteContent } from "@/modules/public-site/content";

type MobileNavigationProps = Readonly<{
  content: PublicSiteContent["shell"];
  enquiryCount: number;
}>;

export function MobileNavigation({ content, enquiryCount }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const mediaQuery = window.matchMedia("(min-width: 88rem)");

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
          <div className="mobile-navigation__commercial-actions">
            <p>{content.commercialGroupLabel}</p>
            <a
              className="mobile-navigation__commercial-primary"
              href="/commercial-partners"
              onClick={() => setIsOpen(false)}
            >
              {content.commercialPartnersLabel}
              <span aria-hidden="true">→</span>
            </a>
            <a
              className="mobile-navigation__trade-account"
              href="/trade-account"
              onClick={() => setIsOpen(false)}
            >
              {content.tradeAccountLabel}
              <span>{content.soonLabel}</span>
            </a>
          </div>

          {enquiryCount > 0 ? (
            <a
              aria-label={`${content.enquiryLabel} (${enquiryCount})`}
              className="mobile-navigation__enquiry"
              href={PRODUCT_ENQUIRY_REVIEW_HREF}
              onClick={() => setIsOpen(false)}
            >
              {content.enquiryLabel}
              <span aria-hidden="true">{enquiryCount}</span>
            </a>
          ) : null}

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

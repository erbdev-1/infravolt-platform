"use client";

import { useId, useState } from "react";

type FooterNavLink = Readonly<{
  href: string;
  label: string;
  isExternal?: boolean;
}>;

type FooterNavAccordionGroupProps = Readonly<{
  className?: string;
  htmlId?: string;
  label: string;
  links: readonly FooterNavLink[];
  isOpen: boolean;
  onToggle: () => void;
}>;

function FooterNavAccordionGroup({
  className,
  htmlId,
  label,
  links,
  isOpen,
  onToggle,
}: FooterNavAccordionGroupProps) {
  const idPrefix = useId();
  const panelId = `${idPrefix}-panel`;
  const triggerId = `${idPrefix}-trigger`;

  return (
    <div className={className} data-accordion-open={isOpen} id={htmlId}>
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="site-footer__accordion-trigger"
        id={triggerId}
        onClick={onToggle}
        type="button"
      >
        <span className="site-footer__label">{label}</span>
        <span aria-hidden="true" className="site-footer__accordion-icon" />
      </button>

      <div
        aria-labelledby={triggerId}
        className="site-footer__accordion-panel"
        id={panelId}
        role="region"
      >
        <div className="site-footer__accordion-panel-inner">
          <nav aria-label={label}>
            {links.map((item) => (
              <a
                href={item.href}
                key={`${item.href}-${item.label}`}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                target={item.isExternal ? "_blank" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export function FooterNavAccordion({
  groups,
}: Readonly<{
  groups: readonly Readonly<{
    className: string;
    htmlId?: string;
    label: string;
    links: readonly FooterNavLink[];
  }>[];
}>) {
  // Mobile-only behaviour: at most one group open at a time. On desktop the
  // panels are always visible regardless of this state (see .site-footer__
  // accordion-panel's min-width:48rem override in globals.css), so this
  // state has no visual effect there.
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  return (
    <>
      {groups.map((group) => (
        <FooterNavAccordionGroup
          className={group.className}
          htmlId={group.htmlId}
          isOpen={openLabel === group.label}
          key={group.label}
          label={group.label}
          links={group.links}
          onToggle={() =>
            setOpenLabel((current) => (current === group.label ? null : group.label))
          }
        />
      ))}
    </>
  );
}

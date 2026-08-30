"use client";

import type { ComponentPropsWithoutRef } from "react";

import { trackCtaClick } from "./tracker";

import type { LocaleCode, MarketCode } from "@/modules/markets/types";

/**
 * A tiny client-boundary wrapper so Server Component pages (e.g. the
 * homepage) can render an analytics-tracked CTA anchor without the whole
 * page becoming a Client Component — only this leaf does.
 */
type TrackedCtaLinkProps = ComponentPropsWithoutRef<"a"> & {
  market: MarketCode;
  locale: LocaleCode;
  ctaName: string;
  ctaLocation: string;
  productFamily?: string;
  productSlug?: string;
  /** Mirrors LinkButton's variant vocabulary so the tracked link looks identical to its untracked sibling. */
  variant?: "primary" | "secondary" | "accent" | "light-outline";
};

export function TrackedCtaLink({
  market,
  locale,
  ctaName,
  ctaLocation,
  productFamily,
  productSlug,
  variant = "primary",
  className,
  onClick,
  ...anchorProps
}: TrackedCtaLinkProps) {
  const classes = ["button-link", `button-link--${variant}`, className].filter(Boolean).join(" ");

  return (
    <a
      {...anchorProps}
      className={classes}
      onClick={(event) => {
        trackCtaClick(
          { market, locale },
          { cta_name: ctaName, cta_location: ctaLocation, product_family: productFamily, product_slug: productSlug },
        );
        onClick?.(event);
      }}
    />
  );
}

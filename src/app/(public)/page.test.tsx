import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PublicSiteShell } from "@/components/public/public-site-shell";
import { MEDIA_ASSETS } from "@/modules/public-site/assets";
import { publicSiteContentForMarket } from "@/modules/public-site/content";
import { HomePageView } from "@/modules/public-site/home-page";

describe("HomePage", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(
      () => undefined,
    );
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it.each(["uk", "ua"] as const)(
    "renders the complete %s market page with equivalent structure",
    (market) => {
      const content = publicSiteContentForMarket(market);
      const { container } = render(
        <PublicSiteShell market={market}>
          <HomePageView market={market} />
        </PublicSiteShell>,
      );

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: content.hero.title,
        }),
      ).toBeInTheDocument();
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("navigation", {
          name: content.shell.navigationLabel,
        }),
      ).toBeInTheDocument();

      const products = container.querySelector("#product-systems");
      const industries = container.querySelector("#industries");

      expect(products).not.toBeNull();
      expect(industries).not.toBeNull();

      const productLinks = within(products as HTMLElement).getAllByRole("link");

      expect(productLinks).toHaveLength(content.products.items.length);

      for (const link of productLinks) {
        expect(link).toHaveAttribute("href");
      }
      for (const item of content.products.items) {
        expect(
          within(products as HTMLElement).getByRole("heading", {
            level: 3,
            name: item.title,
          }),
        ).toBeInTheDocument();
      }
      for (const item of content.industries.items) {
        expect(
          within(industries as HTMLElement).getByRole("heading", {
            level: 3,
            name: item.title,
          }),
        ).toBeInTheDocument();
      }

      const fragmentLinks = [
        ...container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
      ];
      expect(fragmentLinks.length).toBeGreaterThan(0);

      for (const link of fragmentLinks) {
        expect(
          container.querySelector(link.getAttribute("href") ?? ""),
        ).not.toBeNull();
      }

      const videos = container.querySelectorAll("video");

      expect(videos).toHaveLength(1);
      expect(
        container.querySelector(
          `source[src="${MEDIA_ASSETS.hero.video}"][type="video/mp4"]`,
        ),
      ).not.toBeNull();

      // Six-badge hero overview + value strip is the credibility/overview
      // content actually rendered on the current homepage hero (the older
      // certifications strip and manufacturer/disclosures block this test
      // used to check were removed in the hero/product-systems redesign).
      const heroBadgeLabels = [
        "Cable Management Systems",
        "Busbar Systems",
        "Underfloor Cable Trunking",
        "Earthing and Lightning Protection",
        "LED Systems",
        "EV Charging Systems",
      ];
      const hero = container.querySelector(".hero") as HTMLElement;

      for (const label of heroBadgeLabels) {
        expect(
          within(hero).getByRole("link", { name: `Explore ${label}` }),
        ).toHaveAttribute("href", "#product-systems");
      }

      expect(screen.getByText("One Partner")).toBeInTheDocument();
      expect(screen.getByText("Six Product Groups")).toBeInTheDocument();
      expect(screen.getByText("Complete Project Support")).toBeInTheDocument();

      expect(container.textContent).not.toMatch(/\b(?:GOST|EAC|UKCA|RoHS)\b/u);

      const pageText = (container.textContent ?? "").toLocaleLowerCase("uk-UA");

      const forbiddenClaims = [
        "exclusive distributor",
        "officially authorised distributor",
        "certified partner",
        "russia",
        "kaliningrad",
        "ексклюзивний дистриб’ютор",
        "ексклюзивний дистриб'ютор",
        "офіційний дистриб’ютор",
        "офіційний дистриб'ютор",
        "сертифікований партнер",
        "росія",
        "росії",
        "російський",
        "російська",
        "калінінград",
      ];

      for (const forbiddenClaim of forbiddenClaims) {
        expect(pageText).not.toContain(
          forbiddenClaim.toLocaleLowerCase("uk-UA"),
        );
      }

      if (market === "uk") {
        expect(
          screen.getAllByText("Official UK Representative").length,
        ).toBeGreaterThan(0);
      } else {
        expect(
          screen.queryByText("Official UK Representative"),
        ).not.toBeInTheDocument();
      }

      // Technical Resources Preview is the current final homepage section
      // (the manufacturer/external-disclosures block this test used to
      // check is no longer rendered — see the hero-badge assertion above).
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: content.technicalDocuments.title,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", {
          name: content.technicalDocuments.action.label,
        }),
      ).toHaveAttribute("href", content.technicalDocuments.action.href);
    },
  );

  it("does not autoplay video when reduced motion is requested", () => {
    render(<HomePageView market="uk" />);

    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
  });

  it("provides a keyboard-operable mobile navigation", async () => {
    const user = userEvent.setup();
    const matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    vi.stubGlobal("matchMedia", matchMedia);

    render(
      <PublicSiteShell market="uk">
        <HomePageView market="uk" />
      </PublicSiteShell>,
    );

    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu",
    });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(menuButton);

    expect(
      screen.getByRole("button", { name: "Close navigation menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.getByRole("button", { name: "Open navigation menu" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveFocus();
  });
});

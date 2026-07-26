import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PublicSiteShell } from "@/components/public/public-site-shell";
import { HomePageView } from "@/modules/public-site/home-page";
import { publicSiteContentForMarket } from "@/modules/public-site/content";

describe("HomePage", () => {
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
      expect(screen.getAllByRole("article")).toHaveLength(13);
      expect(
        screen.getByRole("navigation", {
          name: content.shell.navigationLabel,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getAllByRole("link", { name: content.shell.headerCta.label })
          .length,
      ).toBeGreaterThan(0);

      const fragmentLinks = [
        ...container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
      ];
      expect(fragmentLinks.length).toBeGreaterThan(0);

      for (const link of fragmentLinks) {
        expect(
          container.querySelector(link.getAttribute("href") ?? ""),
        ).not.toBeNull();
      }

      expect(container.textContent).not.toMatch(
        /\b(distributor|official(?:ly)? authorised|exclusive|certified partner|russia|kaliningrad)\b|дистриб|росі|калінінград/iu,
      );
    },
  );

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

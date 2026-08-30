import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let currentPathname = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => currentPathname,
}));

import { AnalyticsProvider } from "./analytics-provider";
import { resetGtagLifecycleForTests } from "./gtag";

function scriptTags(): HTMLScriptElement[] {
  return Array.from(document.querySelectorAll("script[data-ga-measurement-id]"));
}

function eventPushes(name: string): unknown[][] {
  return (window.dataLayer ?? []).filter(
    (entry): entry is unknown[] => Array.isArray(entry) && entry[0] === "event" && entry[1] === name,
  );
}

beforeEach(() => {
  currentPathname = "/";
  window.localStorage.clear();
  resetGtagLifecycleForTests();
  window.dataLayer = [];
  document.querySelectorAll("script[data-ga-measurement-id]").forEach((el) => el.remove());
  vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-5CF79FYEG3");
  Object.defineProperty(window, "location", {
    value: { ...window.location, hostname: "infravolt.co.uk" },
    writable: true,
  });
});

afterEach(() => {
  document.querySelectorAll("script[data-ga-measurement-id]").forEach((el) => el.remove());
});

describe("AnalyticsProvider — first visit, no decision yet", () => {
  it("renders children and shows the consent banner", () => {
    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept analytics" })).toBeInTheDocument();
  });

  it("does not load gtag.js before the visitor accepts", () => {
    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    expect(scriptTags()).toHaveLength(0);
  });

  it("does not send a page_view before consent is granted", () => {
    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    expect(eventPushes("page_view")).toHaveLength(0);
  });
});

describe("AnalyticsProvider — Accept", () => {
  it("loads gtag.js exactly once and fires a single page_view with market/locale on accept", async () => {
    const user = userEvent.setup();
    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Accept analytics" }));

    await waitFor(() => expect(scriptTags()).toHaveLength(1));
    await waitFor(() => expect(eventPushes("page_view")).toHaveLength(1));
    expect(eventPushes("page_view")[0]).toEqual([
      "event",
      "page_view",
      { market: "uk", locale: "en-GB", source_path: "/" },
    ]);
  });

  it("hides the banner after accepting", async () => {
    const user = userEvent.setup();
    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Accept analytics" }));

    expect(screen.queryByRole("button", { name: "Accept analytics" })).not.toBeInTheDocument();
  });

  it("attaches the Ukrainian market/locale for the UA banner", async () => {
    const user = userEvent.setup();
    render(
      <AnalyticsProvider market="ua">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Дозволити аналітику" }));

    await waitFor(() => expect(eventPushes("page_view")).toHaveLength(1));
    expect(eventPushes("page_view")[0]?.[2]).toMatchObject({ market: "ua", locale: "uk-UA" });
  });
});

describe("AnalyticsProvider — Reject", () => {
  it("never loads gtag.js", async () => {
    const user = userEvent.setup();
    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Reject" }));

    expect(scriptTags()).toHaveLength(0);
  });

  it("hides the banner after rejecting", async () => {
    const user = userEvent.setup();
    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Reject" }));

    expect(screen.queryByRole("button", { name: "Reject" })).not.toBeInTheDocument();
  });

  it("persists the denial so a later mount (simulated reload) does not show the banner or load the script", async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Reject" }));
    unmount();

    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "Accept analytics" })).not.toBeInTheDocument();
    });
    expect(scriptTags()).toHaveLength(0);
  });
});

describe("AnalyticsProvider — withdrawal after acceptance", () => {
  it("stops further page_view emission once the user rejects after having accepted", async () => {
    const user = userEvent.setup();
    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Accept analytics" }));
    await waitFor(() => expect(eventPushes("page_view")).toHaveLength(1));

    // Reopen preferences via the same mechanism the footer trigger uses,
    // then withdraw consent.
    const { openConsentPreferences } = await import("./consent-store");
    openConsentPreferences();
    await user.click(await screen.findByRole("button", { name: "Reject" }));

    const pushesAfterWithdrawal = eventPushes("page_view").length;

    // Simulate a route change after withdrawal — no new page_view should fire.
    currentPathname = "/about";
    render(
      <AnalyticsProvider market="uk">
        <p>Other content</p>
      </AnalyticsProvider>,
    );

    expect(eventPushes("page_view")).toHaveLength(pushesAfterWithdrawal);
  });
});

describe("AnalyticsProvider — persisted acceptance respected on a later page load", () => {
  it("auto-activates and fires page_view without showing the banner when consent was already granted", async () => {
    const { grantAnalyticsConsent } = await import("./consent-store");
    grantAnalyticsConsent();

    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    await waitFor(() => expect(scriptTags()).toHaveLength(1));
    await waitFor(() => expect(eventPushes("page_view")).toHaveLength(1));
    expect(screen.queryByRole("button", { name: "Accept analytics" })).not.toBeInTheDocument();
  });
});

describe("AnalyticsProvider — disallowed host", () => {
  it("does not load gtag.js even after acceptance when the hostname is not an allowed production host", async () => {
    Object.defineProperty(window, "location", {
      value: { ...window.location, hostname: "uk.infravolt.localhost" },
      writable: true,
    });
    const user = userEvent.setup();
    render(
      <AnalyticsProvider market="uk">
        <p>Page content</p>
      </AnalyticsProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Accept analytics" }));

    expect(scriptTags()).toHaveLength(0);
  });
});

describe("AnalyticsProvider — SPA route change page_view (no duplicates)", () => {
  it("fires a new page_view on route change but does not duplicate for the same path", async () => {
    const { grantAnalyticsConsent } = await import("./consent-store");
    grantAnalyticsConsent();

    const { rerender } = render(
      <AnalyticsProvider market="uk">
        <p>Home</p>
      </AnalyticsProvider>,
    );
    await waitFor(() => expect(eventPushes("page_view")).toHaveLength(1));

    // Re-render with the same pathname — must not duplicate.
    rerender(
      <AnalyticsProvider market="uk">
        <p>Home</p>
      </AnalyticsProvider>,
    );
    expect(eventPushes("page_view")).toHaveLength(1);

    // Real route change — must fire a second, distinct page_view.
    currentPathname = "/about";
    rerender(
      <AnalyticsProvider market="uk">
        <p>About</p>
      </AnalyticsProvider>,
    );
    await waitFor(() => expect(eventPushes("page_view")).toHaveLength(2));
    expect(eventPushes("page_view")[1]?.[2]).toMatchObject({ source_path: "/about" });
  });
});

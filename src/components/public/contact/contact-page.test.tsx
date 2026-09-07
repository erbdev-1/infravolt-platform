import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { ContactPage } from "./contact-page";

beforeEach(() => {
  window.localStorage.clear();
});

describe("ContactPage — hero contact-details panel", () => {
  it("renders the UK contact-details panel with a real email", () => {
    render(<ContactPage initialContext={{}} initialType="general" market="uk" />);

    expect(screen.getByText("info@infravolt.co.uk")).toBeInTheDocument();
  });

  it("renders the UA contact-details panel with the approved market email", () => {
    render(<ContactPage initialContext={{}} initialType="general" market="ua" />);

    expect(screen.getByText("info@infravolt.com.ua")).toBeInTheDocument();
  });
});

describe("ContactPage — UA Odesa office address (Phase: UA Odesa address)", () => {
  it("UA Contact page renders the email and the exact Odesa postal address, in a semantic <address> element", () => {
    const { container } = render(<ContactPage initialContext={{}} initialType="general" market="ua" />);

    expect(screen.getByText("info@infravolt.com.ua")).toBeInTheDocument();
    expect(screen.getByText("Офіс в Одесі")).toBeInTheDocument();
    expect(screen.getByText("вул. Рішельєвська, 40")).toBeInTheDocument();
    expect(screen.getByText("Одеса, Одеська область")).toBeInTheDocument();
    expect(screen.getByText("65000, Україна")).toBeInTheDocument();

    const address = container.querySelector("address");
    expect(address).not.toBeNull();
    expect(address?.textContent).toContain("вул. Рішельєвська, 40");
    // Never a map link.
    expect(address?.querySelector("a")).toBeNull();
  });

  it("UK Contact page does not render the Odesa address", () => {
    const { container } = render(<ContactPage initialContext={{}} initialType="general" market="uk" />);

    expect(container.textContent).not.toContain("Рішельєвська");
    expect(container.textContent).not.toContain("Одеса");
    expect(container.querySelector("address")).toBeNull();
  });
});

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { ContactPage } from "./contact-page";

beforeEach(() => {
  window.localStorage.clear();
});

describe("ContactPage — hero contact-details panel", () => {
  it("renders the UK contact-details panel with a real email", () => {
    render(<ContactPage initialContext={{}} initialType="general" market="uk" />);

    expect(screen.getByText("info@infravolt.co.uk")).toBeInTheDocument();
  });

  it("never renders an empty Contact Details panel for UA (no approved email exists yet)", () => {
    const { container } = render(<ContactPage initialContext={{}} initialType="general" market="ua" />);

    expect(container.querySelector('[class*="heroContactPanel"]')).not.toBeInTheDocument();
  });
});

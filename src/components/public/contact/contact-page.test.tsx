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

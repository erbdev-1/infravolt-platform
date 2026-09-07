import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { publicSiteContentForMarket } from "@/modules/public-site/content";

import { SiteFooter } from "./site-footer";

describe("SiteFooter — UA Odesa office address (Phase: UA Odesa address)", () => {
  it("UA footer shows the neutral office label and the exact Odesa address lines", () => {
    const content = publicSiteContentForMarket("ua");
    render(<SiteFooter content={content.shell} market="ua" />);

    expect(screen.getByText("Офіс в Одесі")).toBeInTheDocument();
    expect(screen.getByText("вул. Рішельєвська, 40")).toBeInTheDocument();
    expect(screen.getByText("Одеса, Одеська область")).toBeInTheDocument();
    expect(screen.getByText("65000, Україна")).toBeInTheDocument();
    // Never labelled with a stronger legal/commercial status.
    expect(screen.queryByText(/Registered Office/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Юридична адреса/i)).not.toBeInTheDocument();
  });

  it("UA footer renders the address exactly once (no duplication)", () => {
    const content = publicSiteContentForMarket("ua");
    const { container } = render(<SiteFooter content={content.shell} market="ua" />);

    expect(container.querySelectorAll("address")).toHaveLength(1);
  });

  it("UA content model carries officeAddress but not registeredOffice", () => {
    const content = publicSiteContentForMarket("ua");

    expect(content.shell.officeAddress).toEqual({
      label: "Офіс в Одесі",
      lines: ["вул. Рішельєвська, 40", "Одеса, Одеська область", "65000, Україна"],
    });
    expect(content.shell.registeredOffice).toBeUndefined();
  });
});

describe("SiteFooter — UK registered office is unchanged and carries no Odesa/Ukraine address", () => {
  it("UK footer still shows the existing Registered Office block, unchanged", () => {
    const content = publicSiteContentForMarket("uk");
    render(<SiteFooter content={content.shell} market="uk" />);

    expect(screen.getByText("Registered Office")).toBeInTheDocument();
    expect(screen.getByText("HTS Building, Tyne View Terrace")).toBeInTheDocument();
    expect(screen.getByText("Wallsend, Tyne and Wear")).toBeInTheDocument();
    expect(screen.getByText("NE28 6SG, United Kingdom")).toBeInTheDocument();
  });

  it("UK footer contains no Odesa or Ukraine address text", () => {
    const content = publicSiteContentForMarket("uk");
    const { container } = render(<SiteFooter content={content.shell} market="uk" />);

    expect(container.textContent).not.toContain("Рішельєвська");
    expect(container.textContent).not.toContain("Одеса");
    expect(container.textContent).not.toContain("Одеська");
    expect(container.querySelectorAll("address")).toHaveLength(1);
  });

  it("UK content model carries registeredOffice but not officeAddress", () => {
    const content = publicSiteContentForMarket("uk");

    expect(content.shell.registeredOffice).toBeDefined();
    expect(content.shell.officeAddress).toBeUndefined();
  });
});

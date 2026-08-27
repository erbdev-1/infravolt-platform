import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { commercialPartnersContentForMarket } from "@/modules/public-site/commercial-partners-content";

import { CommercialPartnerApplicationForm } from "./commercial-partner-application-form";

const submitMock = vi.fn();

vi.mock("@/modules/enquiry/commercial-partner-application", async () => {
  const actual = await vi.importActual<typeof import("@/modules/enquiry/commercial-partner-application")>(
    "@/modules/enquiry/commercial-partner-application",
  );
  return { ...actual, submitCommercialPartnerApplication: (...args: unknown[]) => submitMock(...args) };
});

const UK_CONTENT = commercialPartnersContentForMarket("uk");
const UA_CONTENT = commercialPartnersContentForMarket("ua");

function renderForm(market: "uk" | "ua" = "uk") {
  const content = market === "uk" ? UK_CONTENT : UA_CONTENT;
  return render(<CommercialPartnerApplicationForm content={content} market={market} />);
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Company Name/), "Acme Contractors Ltd");
  await user.selectOptions(screen.getByLabelText(/Business Type/), "electrical-contractor");
  await user.selectOptions(screen.getByLabelText(/Partnership Interest/), "contractor-partner");
  await user.click(screen.getByRole("checkbox", { name: "Nationwide UK" }));
  await user.selectOptions(screen.getByLabelText(/Territory Scale/), "region");
  await user.click(screen.getByRole("checkbox", { name: "Busbar Systems" }));
  await user.type(screen.getByLabelText(/Full Name/), "Jordan Smith");
  await user.type(screen.getByLabelText(/Job Title/), "Procurement Manager");
  await user.type(screen.getByLabelText(/Work Email/), "jordan@acme-contractors.co.uk");
  await user.type(screen.getByLabelText(/Phone/), "+44 20 1234 5678");
  await user.click(screen.getByRole("checkbox", { name: /confirm that the information provided is accurate/ }));
}

beforeEach(() => {
  submitMock.mockReset();
  submitMock.mockResolvedValue({ ok: false, error: "not-configured" });
});

describe("CommercialPartnerApplicationForm — required vs optional fields", () => {
  it("requires company name, business type, partnership interest, coverage, territory scale, product systems, contact details and declaration", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: "Submit Commercial Partner Application" }));

    expect(await screen.findAllByText("This field is required.")).not.toHaveLength(0);
    expect(screen.getByText("Please confirm the declaration before submitting.")).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it("does not require website, company location, years trading, requested regions/cities or industry interests", async () => {
    const user = userEvent.setup();
    renderForm();
    await fillRequiredFields(user);

    await user.click(screen.getByRole("button", { name: "Submit Commercial Partner Application" }));

    expect(submitMock).toHaveBeenCalledTimes(1);
    const draft = submitMock.mock.calls[0][0];
    expect(draft.website).toBe("");
    expect(draft.companyLocation).toBe("");
    expect(draft.yearsTrading).toBe("");
    expect(draft.industryInterests).toEqual([]);
  });
});

describe("CommercialPartnerApplicationForm — business type → partnership interest", () => {
  it("never offers a distributor role as an applicant option, for any business type", () => {
    const businessTypes = UK_CONTENT.sections.businessProfile.businessTypeOptions.map((option) => option.value);
    const allPartnershipLabels = UK_CONTENT.sections.businessProfile.partnershipInterestOptions.map((option) =>
      option.label.toLowerCase(),
    );

    expect(businessTypes.length).toBeGreaterThan(0);
    expect(allPartnershipLabels.some((label) => label.includes("distributor"))).toBe(false);
  });

  it("filters Partnership Interest options once a Business Type is chosen, and clears an invalid selection when Business Type changes", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.selectOptions(screen.getByLabelText(/Business Type/), "dealer-reseller");
    await user.selectOptions(screen.getByLabelText(/Partnership Interest/), "authorised-dealer");

    const partnershipSelect = screen.getByLabelText(/Partnership Interest/) as HTMLSelectElement;
    expect(partnershipSelect.value).toBe("authorised-dealer");

    // "authorised-dealer" is not a valid option for consultant/specifier —
    // switching Business Type must clear it rather than silently keep it.
    await user.selectOptions(screen.getByLabelText(/Business Type/), "consultant-specifier");
    expect(partnershipSelect.value).toBe("");

    const remainingOptions = within(partnershipSelect).getAllByRole("option").map((option) => option.textContent);
    expect(remainingOptions).not.toContain("Authorised Dealer");
  });
});

describe("CommercialPartnerApplicationForm — territory scale taxonomy", () => {
  it("offers the UK territory scale in city / region / multi-region / nationwide order", () => {
    const options = UK_CONTENT.sections.businessProfile.territoryTypeOptions.map((option) => option.label);
    expect(options).toEqual(["City / Local Area", "Region", "Multi-Region", "Nationwide Trade Partner"]);
  });

  it("offers the UA territory scale in city / oblast / multi-oblast / nationwide order", () => {
    const options = UA_CONTENT.sections.businessProfile.territoryTypeOptions.map((option) => option.label);
    expect(options).toEqual(["Місто", "Область", "Кілька областей", "Національний торговий партнер"]);
  });
});

describe("CommercialPartnerApplicationForm — coverage vs requested territory", () => {
  it("keeps current coverage and requested territory as two distinct sections of the draft", async () => {
    const user = userEvent.setup();
    renderForm();
    await fillRequiredFields(user);
    const requestedRegionsGroup = screen.getByRole("group", { name: "Requested Regions" });
    await user.click(within(requestedRegionsGroup).getByRole("checkbox", { name: "London & South East" }));

    await user.click(screen.getByRole("button", { name: "Submit Commercial Partner Application" }));

    const draft = submitMock.mock.calls[0][0];
    expect(draft.currentSalesServiceCoverage).toEqual(["Nationwide UK"]);
    expect(draft.requestedDealershipTerritory).toEqual({ scale: "region", regions: ["London & South East"], cities: "" });
  });
});

describe("CommercialPartnerApplicationForm — data contract", () => {
  it("submits market, sourcePath and the canonical product system taxonomy without asking the user to choose a market", async () => {
    const user = userEvent.setup();
    renderForm("uk");
    await fillRequiredFields(user);

    await user.click(screen.getByRole("button", { name: "Submit Commercial Partner Application" }));

    const draft = submitMock.mock.calls[0][0];
    expect(draft.market).toBe("uk");
    expect(draft.sourcePath).toBe("/commercial-partners");
    expect(draft.type).toBe("commercial-partner");
    expect(screen.queryByLabelText(/market/i)).not.toBeInTheDocument();
  });

  it("offers the canonical six product systems", () => {
    expect(UK_CONTENT.sections.productSystems.options).toEqual([
      "Busbar Systems",
      "Cable Management Systems",
      "Underfloor Systems",
      "Earthing & Lightning Protection",
      "LED Systems",
      "EV Charging",
    ]);
  });
});

describe("CommercialPartnerApplicationForm — submission behaviour", () => {
  it("never fabricates success while the backend stub reports not-configured", async () => {
    const user = userEvent.setup();
    renderForm();
    await fillRequiredFields(user);

    await user.click(screen.getByRole("button", { name: "Submit Commercial Partner Application" }));

    expect(await screen.findByText("We couldn't submit your application.")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows a reference number and announces success accessibly once the backend confirms", async () => {
    submitMock.mockResolvedValue({ ok: true, referenceNo: "CP-2026-000045" });
    const user = userEvent.setup();
    renderForm();
    await fillRequiredFields(user);

    await user.click(screen.getByRole("button", { name: "Submit Commercial Partner Application" }));

    const successPanel = await screen.findByRole("status");
    expect(within(successPanel).getByText("Application Received")).toBeInTheDocument();
    expect(within(successPanel).getByText("CP-2026-000045")).toBeInTheDocument();
    expect(within(successPanel).getByText(/does not constitute appointment/)).toBeInTheDocument();
  });
});

describe("CommercialPartnerApplicationForm — declaration wording", () => {
  it("makes clear that submission is not appointment and requires InfraVolt review + written confirmation", () => {
    expect(UK_CONTENT.declaration.statement).toMatch(/does not constitute appointment/);
    expect(UK_CONTENT.declaration.statement).toMatch(/review by InfraVolt and written confirmation/);
  });
});

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CONTACT_PRODUCT_SYSTEMS } from "@/modules/enquiry/product-catalog";
import { addEnquiryItem } from "@/modules/enquiry/store";
import type { EnquiryItem } from "@/modules/enquiry/types";
import { contactPageContentForMarket } from "@/modules/public-site/contact-content";

import { EnquiryWorkspace } from "./enquiry-workspace";

const submitEnquiryMock = vi.fn();

vi.mock("@/modules/enquiry/draft", async () => {
  const actual = await vi.importActual<typeof import("@/modules/enquiry/draft")>("@/modules/enquiry/draft");
  return { ...actual, submitEnquiry: (...args: unknown[]) => submitEnquiryMock(...args) };
});

const UK_CONTENT = contactPageContentForMarket("uk");
const UA_CONTENT = contactPageContentForMarket("ua");

function renderWorkspace(overrides: Partial<Parameters<typeof EnquiryWorkspace>[0]> = {}) {
  return render(
    <EnquiryWorkspace
      content={UK_CONTENT}
      initialContext={{}}
      initialType="general"
      market="uk"
      {...overrides}
    />,
  );
}

async function fillContactDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/First Name/), "Alex");
  await user.type(screen.getByLabelText(/Last Name/), "Morgan");
  await user.type(screen.getByLabelText(/Company/), "Acme Contractors");
  await user.type(screen.getByLabelText(/Business Email/), "alex@acme-contractors.co.uk");
}

beforeEach(() => {
  window.localStorage.clear();
  submitEnquiryMock.mockReset();
  submitEnquiryMock.mockResolvedValue({ ok: false, error: "not-configured" });
});

describe("EnquiryWorkspace — contact fields", () => {
  it("requires First Name, Last Name, Company and Email, but not Job Title or Phone", async () => {
    const user = userEvent.setup();
    renderWorkspace();

    await user.type(screen.getByLabelText(/Subject/), "General question");
    await user.type(screen.getByLabelText(/^Message/), "Just checking something.");
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(await screen.findByLabelText(/First Name/)).toHaveAttribute("aria-required", "true");
    expect(screen.getByLabelText(/Last Name/)).toHaveAttribute("aria-required", "true");
    expect(screen.getByLabelText(/Company/)).toHaveAttribute("aria-required", "true");
    expect(screen.getByLabelText(/Business Email/)).toHaveAttribute("aria-required", "true");
    expect(screen.getByLabelText(/Job Title/)).not.toHaveAttribute("aria-required", "true");
    expect(screen.getByLabelText("Phone")).not.toHaveAttribute("aria-required", "true");
    expect(submitEnquiryMock).not.toHaveBeenCalled();
  });

  it("rejects a malformed email address with a distinct error message", async () => {
    const user = userEvent.setup();
    renderWorkspace();

    await user.type(screen.getByLabelText(/First Name/), "Alex");
    await user.type(screen.getByLabelText(/Last Name/), "Morgan");
    await user.type(screen.getByLabelText(/Company/), "Acme");
    await user.type(screen.getByLabelText(/Business Email/), "not-an-email");
    await user.type(screen.getByLabelText(/Subject/), "Subject");
    await user.type(screen.getByLabelText(/^Message/), "Message body");
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    expect(submitEnquiryMock).not.toHaveBeenCalled();
  });

  it("marks Job Title as optional in its label", () => {
    renderWorkspace();

    const jobTitleLabel = screen.getByText(/Job Title \/ Position/).closest("label");
    expect(within(jobTitleLabel as HTMLElement).getByText("(optional)")).toBeInTheDocument();
  });
});

describe("EnquiryWorkspace — General Enquiry", () => {
  it("requires Subject and Message, and includes Subject in the submitted draft", async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await fillContactDetails(user);

    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));
    expect(await screen.findAllByText("Subject")).not.toHaveLength(0);
    expect(submitEnquiryMock).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText(/Subject/), "Pricing question");
    await user.type(screen.getByLabelText(/^Message/), "Can you help with pricing?");
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(submitEnquiryMock).toHaveBeenCalledTimes(1);
    const draft = submitEnquiryMock.mock.calls[0][0];
    expect(draft.subject).toBe("Pricing question");
    expect(draft.type).toBe("general");
    expect(draft.message).toBe("Can you help with pricing?");
  });
});

describe("EnquiryWorkspace — Product Enquiry", () => {
  it("requires at least one selected product before it will submit", async () => {
    const user = userEvent.setup();
    renderWorkspace({ initialType: "product" });
    await fillContactDetails(user);
    await user.type(screen.getByLabelText(/Requirement \/ Question/), "Need a quote for this.");

    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(await screen.findByText("Add at least one product to your enquiry.")).toBeInTheDocument();
    expect(submitEnquiryMock).not.toHaveBeenCalled();
  });

  it("preserves selected items and their quantity in the submitted draft", async () => {
    const item: EnquiryItem = {
      id: "cable-management:cable-ladders:GKT-100",
      title: "GKT-100 Cable Ladder",
      system: "cable-management",
      model: "GKT-100",
      categoryLabel: "Cable Ladders",
      sourceRoute: "/products/cable-support-systems/cable-ladders",
      quantity: "4",
    };
    addEnquiryItem(item);

    const user = userEvent.setup();
    renderWorkspace({ initialType: "product" });
    await fillContactDetails(user);
    await user.type(screen.getByLabelText(/Requirement \/ Question/), "Need four of these.");
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(submitEnquiryMock).toHaveBeenCalledTimes(1);
    const draft = submitEnquiryMock.mock.calls[0][0];
    expect(draft.selectedItems).toEqual([item]);
    expect(draft.selectedItems[0].quantity).toBe("4");
  });
});

describe("EnquiryWorkspace — Technical Information", () => {
  it("requires at least one information type OR a message, not both", async () => {
    const user = userEvent.setup();
    renderWorkspace({ initialType: "technical" });
    await fillContactDetails(user);

    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));
    expect(await screen.findByText(/Select at least one information type/)).toBeInTheDocument();
    expect(submitEnquiryMock).not.toHaveBeenCalled();

    await user.click(screen.getByRole("checkbox", { name: "Dimensions" }));
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(submitEnquiryMock).toHaveBeenCalledTimes(1);
  });

  it("also accepts a free-text message with no checkboxes selected", async () => {
    const user = userEvent.setup();
    renderWorkspace({ initialType: "technical" });
    await fillContactDetails(user);

    await user.type(screen.getByLabelText("Message"), "What's the IP rating on this range?");
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(submitEnquiryMock).toHaveBeenCalledTimes(1);
  });
});

describe("EnquiryWorkspace — Technical Documents", () => {
  it("requires at least one document type OR additional information", async () => {
    const user = userEvent.setup();
    renderWorkspace({ initialType: "technical-document" });
    await fillContactDetails(user);

    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));
    expect(await screen.findByText(/Select at least one document type/)).toBeInTheDocument();
    expect(submitEnquiryMock).not.toHaveBeenCalled();

    await user.click(screen.getByRole("checkbox", { name: "Datasheet" }));
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(submitEnquiryMock).toHaveBeenCalledTimes(1);
  });

  it("does not show the attachments section (a document request, not an upload)", () => {
    renderWorkspace({ initialType: "technical-document" });

    expect(screen.queryByText("Attach Project Files")).not.toBeInTheDocument();
  });
});

describe("EnquiryWorkspace — attachment upload disabled", () => {
  it("never renders the file upload button/dropzone for a type that previously showed it", () => {
    renderWorkspace({ initialType: "quote" });

    expect(screen.queryByText("Attach Project Files")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Upload Files" })).not.toBeInTheDocument();
  });

  it("shows the email-instead note near the message/details area", () => {
    renderWorkspace({ initialType: "quote" });

    expect(
      screen.getByText(/Please email them to info@infravolt.co.uk and include your enquiry reference/),
    ).toBeInTheDocument();
  });
});

describe("EnquiryWorkspace — Project Support", () => {
  it("renders the canonical project-type/industry options", () => {
    renderWorkspace({ initialType: "project" });

    const select = screen.getByLabelText("Project Type / Industry");
    const options = within(select).getAllByRole("option").map((option) => option.textContent);

    expect(options).toEqual([
      "Select an option",
      "Commercial Buildings",
      "Industrial & Manufacturing",
      "Data Centres",
      "Renewable Energy",
      "Transport & Infrastructure",
      "Other",
    ]);
  });

  it("lets the user toggle interested systems and submit", async () => {
    const user = userEvent.setup();
    renderWorkspace({ initialType: "project" });
    await fillContactDetails(user);
    await user.type(screen.getByLabelText(/Requirement \/ Question/), "Discuss a new build.");

    await user.click(screen.getByRole("checkbox", { name: "Busbar Systems" }));
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(submitEnquiryMock).toHaveBeenCalledTimes(1);
    expect(submitEnquiryMock.mock.calls[0][0].project.interestedSystems).toEqual(["Busbar Systems"]);
  });
});

describe("EnquiryWorkspace — successful submission", () => {
  it("shows a reference number, announces it accessibly, and clears the basket only after success", async () => {
    addEnquiryItem({
      id: "cable-management:cable-ladders:GKT-100",
      title: "GKT-100 Cable Ladder",
      system: "cable-management",
      sourceRoute: "/products/cable-support-systems/cable-ladders",
    });
    submitEnquiryMock.mockResolvedValue({ ok: true, referenceNo: "IV-2026-000123" });

    const user = userEvent.setup();
    renderWorkspace({ initialType: "product" });
    await fillContactDetails(user);
    await user.type(screen.getByLabelText(/Requirement \/ Question/), "Please quote.");
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    const successPanel = await screen.findByRole("status");
    expect(within(successPanel).getByText("Enquiry Received")).toBeInTheDocument();
    expect(within(successPanel).getByText("IV-2026-000123")).toBeInTheDocument();
    expect(
      within(successPanel).getByText(/You can send supporting documents by email.*quote reference IV-2026-000123/),
    ).toBeInTheDocument();
  });

  it("never fabricates a success state while the backend stub reports not-configured", async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await fillContactDetails(user);
    await user.type(screen.getByLabelText(/Subject/), "Subject");
    await user.type(screen.getByLabelText(/^Message/), "Message");
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(await screen.findByText("We couldn't send your enquiry.")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("does not clear the basket when submission fails", async () => {
    addEnquiryItem({
      id: "cable-management:cable-ladders:GKT-100",
      title: "GKT-100 Cable Ladder",
      system: "cable-management",
      sourceRoute: "/products/cable-support-systems/cable-ladders",
    });

    const user = userEvent.setup();
    renderWorkspace({ initialType: "product" });
    await fillContactDetails(user);
    await user.type(screen.getByLabelText(/Requirement \/ Question/), "Please quote.");
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    await screen.findByText("We couldn't send your enquiry.");
    expect(screen.getByText("GKT-100 Cable Ladder")).toBeInTheDocument();
  });
});

describe("EnquiryWorkspace — privacy notice", () => {
  it("renders a data-processing notice near the submit action", () => {
    renderWorkspace();

    expect(
      screen.getByText(/InfraVolt may use the information provided to respond to your request/),
    ).toBeInTheDocument();
  });
});

describe("Contact — Ukrainian localisation", () => {
  it("uses the localised Project Support label and helper text", () => {
    renderWorkspace({ content: UA_CONTENT, market: "ua", initialType: "project" });

    expect(screen.getByRole("radio", { name: /Підтримка проєкту/ })).toBeInTheDocument();
  });
});

describe("Contact — product system taxonomy", () => {
  it("includes EV Charging as a primary Contact product system", () => {
    expect(CONTACT_PRODUCT_SYSTEMS).toContain("ev-charging");
  });

  it("does not expose G-BUS as a primary Contact product system", () => {
    expect(CONTACT_PRODUCT_SYSTEMS).not.toContain("g-bus");
  });
});

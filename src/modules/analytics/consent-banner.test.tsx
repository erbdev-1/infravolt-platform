import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ConsentBanner } from "./consent-banner";

describe("ConsentBanner — UK / en-GB", () => {
  it("renders the exact approved English copy and labels", () => {
    render(<ConsentBanner market="uk" onAccept={vi.fn()} onReject={vi.fn()} />);

    expect(
      screen.getByText(
        "We use optional analytics cookies to understand how visitors use InfraVolt and improve the site. You can accept or reject analytics cookies.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept analytics" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject" })).toBeInTheDocument();
  });

  it("calls onAccept when Accept is clicked, and never onReject", async () => {
    const onAccept = vi.fn();
    const onReject = vi.fn();
    const user = userEvent.setup();
    render(<ConsentBanner market="uk" onAccept={onAccept} onReject={onReject} />);

    await user.click(screen.getByRole("button", { name: "Accept analytics" }));

    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onReject).not.toHaveBeenCalled();
  });

  it("calls onReject when Reject is clicked, and never onAccept", async () => {
    const onAccept = vi.fn();
    const onReject = vi.fn();
    const user = userEvent.setup();
    render(<ConsentBanner market="uk" onAccept={onAccept} onReject={onReject} />);

    await user.click(screen.getByRole("button", { name: "Reject" }));

    expect(onReject).toHaveBeenCalledTimes(1);
    expect(onAccept).not.toHaveBeenCalled();
  });

  it("both actions are real <button type=button> elements (no dark-pattern disabled/hidden reject)", () => {
    render(<ConsentBanner market="uk" onAccept={vi.fn()} onReject={vi.fn()} />);

    const accept = screen.getByRole("button", { name: "Accept analytics" });
    const reject = screen.getByRole("button", { name: "Reject" });
    expect(accept).toBeEnabled();
    expect(reject).toBeEnabled();
    expect(accept).toHaveAttribute("type", "button");
    expect(reject).toHaveAttribute("type", "button");
  });

  it("is keyboard reachable via normal tab order", async () => {
    const user = userEvent.setup();
    render(<ConsentBanner market="uk" onAccept={vi.fn()} onReject={vi.fn()} />);

    await user.tab();
    expect(screen.getByRole("button", { name: "Reject" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Accept analytics" })).toHaveFocus();
  });
});

describe("ConsentBanner — UA / uk-UA", () => {
  it("renders the exact approved Ukrainian copy and labels", () => {
    render(<ConsentBanner market="ua" onAccept={vi.fn()} onReject={vi.fn()} />);

    expect(
      screen.getByText(
        "Ми використовуємо необов’язкові аналітичні файли cookie, щоб розуміти, як відвідувачі користуються InfraVolt, і покращувати сайт. Ви можете дозволити або відхилити аналітичні файли cookie.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Дозволити аналітику" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Відхилити" })).toBeInTheDocument();
  });

  it("calls onAccept for the Ukrainian accept button", async () => {
    const onAccept = vi.fn();
    const user = userEvent.setup();
    render(<ConsentBanner market="ua" onAccept={onAccept} onReject={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Дозволити аналітику" }));

    expect(onAccept).toHaveBeenCalledTimes(1);
  });
});

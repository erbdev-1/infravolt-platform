import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import RouteError from "./error";

describe("RouteError", () => {
  it("keeps internal error details hidden and exposes an accessible retry", async () => {
    const reset = vi.fn();
    const user = userEvent.setup();

    render(
      <RouteError
        error={new Error("INTERNAL_VALUE_MUST_NOT_RENDER")}
        reset={reset}
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Something went wrong",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("INTERNAL_VALUE_MUST_NOT_RENDER"),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(reset).toHaveBeenCalledOnce();
  });
});

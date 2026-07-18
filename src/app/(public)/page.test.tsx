import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("HomePage", () => {
  it("exposes the public foundation through semantic page structure", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "InfraVolt" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent(
      "Engineering foundation for the UK and Ukraine application.",
    );
  });
});

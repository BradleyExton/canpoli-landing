import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DemoModules } from "./DemoModules";

describe("DemoModules", () => {
  it("renders demo cards", () => {
    render(<DemoModules />);

    expect(screen.getByText("Interactive Demos")).toBeInTheDocument();
    expect(screen.getByText("Address Lookup")).toBeInTheDocument();
    expect(screen.getAllByText("Coming Soon")).toHaveLength(3);
  });
});

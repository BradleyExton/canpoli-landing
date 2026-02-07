import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Features } from "./Features";

describe("Features", () => {
  it("renders section title and feature items", () => {
    render(<Features />);

    expect(screen.getByText("Built for Civic Builders")).toBeInTheDocument();
    expect(screen.getByText("Coordinate Lookup")).toBeInTheDocument();
    expect(screen.getByText("Ridings + Parties")).toBeInTheDocument();
  });
});

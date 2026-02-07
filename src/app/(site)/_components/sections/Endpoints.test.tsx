import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Endpoints } from "./Endpoints";

describe("Endpoints", () => {
  it("renders endpoint cards and routes", () => {
    render(<Endpoints />);

    expect(screen.getByText("Core Endpoints")).toBeInTheDocument();
    expect(screen.getByText("Lookup")).toBeInTheDocument();
    expect(screen.getByText("GET /v1/parties")).toBeInTheDocument();
  });
});

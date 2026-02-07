import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataSources } from "./DataSources";

describe("DataSources", () => {
  it("renders source cards and visit links", () => {
    render(<DataSources />);

    expect(screen.getByText("Data Sources")).toBeInTheDocument();
    expect(screen.getByText("House of Commons Open Data")).toBeInTheDocument();

    const visitLinks = screen.getAllByText("Visit");
    expect(visitLinks).toHaveLength(2);
  });
});

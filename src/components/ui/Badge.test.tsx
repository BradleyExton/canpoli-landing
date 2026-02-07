import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders content with level styles", () => {
    render(<Badge level="federal">Federal</Badge>);

    const badge = screen.getByText("Federal");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain("var(--federal)");
  });
});

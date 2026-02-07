import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children and applies classes", () => {
    render(
      <Card hover className="custom-class">
        <span>Card Content</span>
      </Card>
    );

    expect(screen.getByText("Card Content")).toBeInTheDocument();

    const container = screen.getByText("Card Content").parentElement;
    expect(container).toHaveClass("custom-class");
    expect(container).toHaveClass("hover:-translate-y-1");
  });
});

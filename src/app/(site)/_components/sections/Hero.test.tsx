import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Hero } from "./Hero";
describe("Hero", () => {
  it("renders API base host and CTA metadata", () => {
    render(<Hero />);

    expect(screen.getByText(/api\.canpoli\.dev\/v1/i)).toBeInTheDocument();

    const docsLink = screen.getByText("Read the Docs");
    const demoLink = screen.getByText("Try the API");

    expect(docsLink).toHaveAttribute("data-track-event", "cta_click");
    expect(docsLink).toHaveAttribute("data-track-location", "hero");
    expect(docsLink).toHaveAttribute("data-track-target", "docs");

    expect(demoLink).toHaveAttribute("data-track-event", "cta_click");
    expect(demoLink).toHaveAttribute("data-track-location", "hero");
    expect(demoLink).toHaveAttribute("data-track-target", "demo");
  });
});

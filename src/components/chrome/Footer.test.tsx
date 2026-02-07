import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders key links", () => {
    render(<Footer />);

    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Data: House of Commons")).toBeInTheDocument();
  });

  it("adds tracking metadata to GitHub link", () => {
    render(<Footer />);

    const gitHubLink = screen.getByText("GitHub");
    expect(gitHubLink).toHaveAttribute("data-track-event", "github_click");
    expect(gitHubLink).toHaveAttribute("data-track-location", "footer");
  });
});

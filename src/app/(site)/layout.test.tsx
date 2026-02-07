import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/components/chrome/Header", () => ({
  Header: () => <div>Header</div>,
}));

vi.mock("@/components/chrome/Footer", () => ({
  Footer: () => <div>Footer</div>,
}));

import SiteLayout from "./layout";

describe("Site layout", () => {
  it("renders header, footer, and children", () => {
    render(
      <SiteLayout>
        <div>Content</div>
      </SiteLayout>
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

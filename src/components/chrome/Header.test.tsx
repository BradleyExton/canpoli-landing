import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

vi.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }: { children: ReactNode }) => <>{children}</>,
  SignedOut: ({ children }: { children: ReactNode }) => <>{children}</>,
  SignInButton: ({ children }: { children: ReactNode }) => <>{children}</>,
  UserButton: () => <div data-testid="user-button" />,
}));

import { Header } from "./Header";

describe("Header", () => {
  it("renders navigation with tracking metadata", async () => {
    const user = userEvent.setup();
    render(<Header />);

    expect(screen.getByText("Try It")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();

    const tryItLink = screen.getByText("Try It");
    const gitHubLink = screen.getByText("GitHub");

    expect(tryItLink).toHaveAttribute("data-track-event", "nav_click");
    expect(tryItLink).toHaveAttribute("data-track-target", "demo");
    expect(gitHubLink).toHaveAttribute("data-track-event", "github_click");
    expect(gitHubLink).toHaveAttribute("data-track-location", "header");

    await user.click(tryItLink);
    await user.click(gitHubLink);
  });
});

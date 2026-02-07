import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./_components/AccountClient", () => ({
  AccountClient: () => <div>AccountClient</div>,
}));

vi.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }: { children: ReactNode }) => <>{children}</>,
  SignedOut: ({ children }: { children: ReactNode }) => <>{children}</>,
  SignInButton: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

import AccountPage from "./page";

describe("Account page", () => {
  it("renders account content", () => {
    render(<AccountPage />);

    expect(screen.getByText("AccountClient")).toBeInTheDocument();
    expect(screen.getByText("Sign in to view your account")).toBeInTheDocument();
  });
});

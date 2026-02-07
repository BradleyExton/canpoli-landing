import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import BillingSuccessPage from "./page";

describe("Billing success page", () => {
  it("renders success messaging", () => {
    render(<BillingSuccessPage />);

    expect(screen.getByText("Subscription activated")).toBeInTheDocument();
    expect(screen.getByText("Go to account")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ApiDocs } from "./ApiDocs";

describe("ApiDocs", () => {
  it("toggles TypeScript types visibility", async () => {
    const user = userEvent.setup();
    render(<ApiDocs />);

    const showButton = screen.getByRole("button", { name: /show typescript types/i });
    expect(showButton).toBeInTheDocument();

    await user.click(showButton);

    expect(
      screen.getByRole("button", { name: /hide typescript types/i })
    ).toBeInTheDocument();
  });
});

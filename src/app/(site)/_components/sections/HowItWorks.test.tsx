import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { HowItWorks } from "./HowItWorks";
describe("HowItWorks", () => {
  beforeEach(() => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      ...globalThis.navigator,
      clipboard: { writeText },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("copies the example code and exposes tracking metadata", async () => {
    const user = userEvent.setup();
    render(<HowItWorks />);

    const copyButton = screen.getByRole("button", { name: "Copy" });
    expect(copyButton).toHaveAttribute("data-track-event", "code_copy");
    expect(copyButton).toHaveAttribute("data-track-context", "how_it_works_example");

    await user.click(copyButton);

    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from "@/lib/analytics";
import { AnalyticsListener } from "./AnalyticsListener";

describe("AnalyticsListener", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("tracks clicks on elements with data-track-event", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <AnalyticsListener />
        <button data-track-event="cta_click" data-track-target="docs">
          Read the Docs
        </button>
      </div>
    );

    await user.click(document.querySelector("button") as HTMLElement);

    expect(trackEvent).toHaveBeenCalledWith("cta_click", { target: "docs" });
  });

  it("supports event delegation via closest", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <AnalyticsListener />
        <button data-track-event="nav_click" data-track-location="header">
          <span>Nav</span>
        </button>
      </div>
    );

    await user.click(document.querySelector("span") as HTMLElement);

    expect(trackEvent).toHaveBeenCalledWith("nav_click", { location: "header" });
  });

  it("ignores clicks without tracking metadata", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <AnalyticsListener />
        <button>Plain</button>
      </div>
    );

    await user.click(document.querySelector("button") as HTMLElement);

    expect(trackEvent).not.toHaveBeenCalled();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from "@/lib/analytics";

describe("Demo", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("renders the offline demo response when enabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_MODE", "offline");
    vi.resetModules();

    const { Demo } = await import("./Demo");
    const user = userEvent.setup();

    render(<Demo />);

    expect(
      screen.getByText(/Click "Find MP" to see results/i)
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Find MP" }));

    expect(await screen.findByText("Example MP")).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith("demo_request", { source: "button" });
    expect(trackEvent).toHaveBeenCalledWith("demo_success", { mode: "offline" });
  });

  it("updates coordinates when a quick location is selected", async () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_MODE", "offline");
    vi.resetModules();

    const { Demo } = await import("./Demo");
    const user = userEvent.setup();

    render(<Demo />);

    await user.click(screen.getByRole("button", { name: "Toronto" }));

    expect(screen.getByPlaceholderText("e.g., 45.4215")).toHaveValue("43.6532");
    expect(screen.getByPlaceholderText("e.g., -75.6972")).toHaveValue("-79.3832");
  });

  it("fetches live data and renders the response", async () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_MODE", "live");
    vi.resetModules();

    const { Demo } = await import("./Demo");
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        hoc_id: 1002,
        name: "Live MP",
        is_active: true,
        party: { name: "Demo Party" },
        riding: { name: "Demo Riding", province: "Ontario" },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<Demo />);

    await user.click(screen.getByRole("button", { name: "Find MP" }));

    expect(await screen.findByText("Live MP")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalled();
    expect(trackEvent).toHaveBeenCalledWith("demo_request", { source: "button" });
    expect(trackEvent).toHaveBeenCalledWith("demo_success", { status: 200 });
  });

  it("handles fetch errors gracefully", async () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_MODE", "live");
    vi.resetModules();

    const { Demo } = await import("./Demo");
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Server Error",
      text: async () => "Server Error",
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<Demo />);

    await user.click(screen.getByRole("button", { name: "Find MP" }));

    expect(await screen.findByText("HTTP 500: Server Error")).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith("demo_error", { status: 500 });
  });

  it("tracks network errors and shows a fallback message", async () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_MODE", "live");
    vi.resetModules();

    const { Demo } = await import("./Demo");
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockRejectedValueOnce(new TypeError("Network error"));
    vi.stubGlobal("fetch", fetchMock);

    render(<Demo />);

    await user.click(screen.getByRole("button", { name: "Find MP" }));

    expect(await screen.findByText(/Network error/i)).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith("demo_error", { status: 0 });
  });

  it("updates latitude and longitude inputs", async () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_MODE", "offline");
    vi.resetModules();

    const { Demo } = await import("./Demo");
    const user = userEvent.setup();

    render(<Demo />);

    const latInput = screen.getByPlaceholderText("e.g., 45.4215");
    const lngInput = screen.getByPlaceholderText("e.g., -75.6972");

    await user.clear(latInput);
    await user.type(latInput, "12.34");
    await user.clear(lngInput);
    await user.type(lngInput, "-56.78");

    expect(latInput).toHaveValue("12.34");
    expect(lngInput).toHaveValue("-56.78");
  });
});

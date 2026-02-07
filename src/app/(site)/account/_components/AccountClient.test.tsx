import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

let tokenValue: string | null = "test-token";
const getToken = vi.fn(() => Promise.resolve(tokenValue));

vi.mock("@clerk/nextjs", () => ({
  useAuth: () => ({
    getToken,
  }),
}));

import { AccountClient } from "./AccountClient";

describe("AccountClient", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    tokenValue = "test-token";
    getToken.mockClear();
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => "Not found",
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads with no key and no usage", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      });

    render(<AccountClient />);

    expect(await screen.findByText("No key yet")).toBeInTheDocument();
    expect(screen.getByText("Current billing period")).toBeInTheDocument();
    expect(fetchMock.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it("renders key and usage when available", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          api_key: "ck_live_123",
          key_prefix: "ck_live",
          masked_key: "ck_live...abcd",
          active: true,
          created_at: "2024-01-01T00:00:00Z",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          usage_count: 1200,
          limit_per_minute: 500,
        }),
      });

    render(<AccountClient />);

    expect(await screen.findByText("ck_live...abcd")).toBeInTheDocument();
    expect(screen.getByText("1,200")).toBeInTheDocument();
    expect(screen.getByText("Limit: 500 req/min")).toBeInTheDocument();
    expect(screen.getByText("Your new key (shown once):")).toBeInTheDocument();
  });

  it("formats the usage period range", async () => {
    const periodStart = "2024-01-01T00:00:00Z";
    const periodEnd = "2024-02-01T00:00:00Z";
    const expectedRange = `${new Date(periodStart).toLocaleDateString()} → ${new Date(
      periodEnd
    ).toLocaleDateString()}`;

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          key_prefix: "ck_live",
          masked_key: "ck_live...abcd",
          active: true,
          created_at: "2024-01-01T00:00:00Z",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          usage_count: 50,
          period_start: periodStart,
          period_end: periodEnd,
          limit_per_minute: 500,
        }),
      });

    render(<AccountClient />);

    expect(await screen.findByText(expectedRange)).toBeInTheDocument();
  });

  it("rotates an API key", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          api_key: "ck_new_1234",
          key_prefix: "ck_new",
          created_at: "2024-01-02T00:00:00Z",
        }),
      });

    const user = userEvent.setup();
    render(<AccountClient />);

    await screen.findByText("No key yet");
    await user.click(screen.getByRole("button", { name: "Rotate Key" }));

    expect(await screen.findByText("Your new key (shown once):")).toBeInTheDocument();
    expect(screen.getByText("ck_new_1234")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/v1/account/api-key/rotate"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("copies the new API key to clipboard", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          api_key: "ck_copy_123",
          key_prefix: "ck_copy",
          masked_key: "ck_copy...abcd",
          active: true,
          created_at: "2024-01-01T00:00:00Z",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          usage_count: 0,
          limit_per_minute: 500,
        }),
      });

    let writeTextSpy: ReturnType<typeof vi.spyOn> | null = null;
    const originalClipboard = navigator.clipboard;
    if (navigator.clipboard) {
      writeTextSpy = vi
        .spyOn(navigator.clipboard, "writeText")
        .mockResolvedValue(undefined as never);
    } else {
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText },
      });
      writeTextSpy = vi.spyOn(navigator.clipboard, "writeText");
    }

    const user = userEvent.setup();
    render(<AccountClient />);

    await screen.findByText("Your new key (shown once):");
    const copyButton = await screen.findByRole("button", { name: "Copy" });
    await user.click(copyButton);

    expect(writeTextSpy).toHaveBeenCalledWith("ck_copy_123");

    if (writeTextSpy) {
      writeTextSpy.mockRestore();
    }
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: originalClipboard,
    });
  });

  it("starts checkout and redirects", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ url: "https://example.com/checkout" }),
      });

    const originalLocation = window.location;
    const locationStub = { href: "http://localhost" } as Location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: locationStub,
    });

    const user = userEvent.setup();
    render(<AccountClient />);

    await screen.findByText("No key yet");
    await user.click(screen.getByRole("button", { name: "Upgrade" }));

    await waitFor(() => {
      expect(locationStub.href).toBe("https://example.com/checkout");
    });

    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  it("opens the billing portal", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ url: "https://example.com/portal" }),
      });

    const originalLocation = window.location;
    const locationStub = { href: "http://localhost" } as Location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: locationStub,
    });

    const user = userEvent.setup();
    render(<AccountClient />);

    await screen.findByText("No key yet");
    await user.click(screen.getByRole("button", { name: "Manage Billing" }));

    await waitFor(() => {
      expect(locationStub.href).toBe("https://example.com/portal");
    });

    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  it("shows an error when auth token is missing", async () => {
    tokenValue = null;

    render(<AccountClient />);

    expect(await screen.findByText("Missing auth token")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows a checkout error when the request fails", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => "",
      });

    const user = userEvent.setup();
    render(<AccountClient />);

    await screen.findByText("No key yet");
    await user.click(screen.getByRole("button", { name: "Upgrade" }));

    expect(await screen.findByText("Request failed (500)")).toBeInTheDocument();
  });

  it("shows a portal error when the request fails", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not found",
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => "Bad request",
      });

    const user = userEvent.setup();
    render(<AccountClient />);

    await screen.findByText("No key yet");
    await user.click(screen.getByRole("button", { name: "Manage Billing" }));

    expect(await screen.findByText("Bad request")).toBeInTheDocument();
  });
});

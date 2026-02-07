import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ConsentBanner } from "./ConsentBanner";

describe("ConsentBanner", () => {
  beforeEach(() => {
    const storage = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
      removeItem: (key: string) => {
        storage.delete(key);
      },
      clear: () => {
        storage.clear();
      },
      key: (index: number) => Array.from(storage.keys())[index] ?? null,
      get length() {
        return storage.size;
      },
    });
    (window as { gtag?: unknown }).gtag = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("accepts consent and updates analytics", async () => {
    const user = userEvent.setup();
    render(<ConsentBanner />);

    await user.click(screen.getByRole("button", { name: "Accept" }));

    expect(localStorage.getItem("ga_consent")).toBe("granted");
    await waitFor(() => {
      expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
        analytics_storage: "granted",
      });
    });
  });

  it("declines consent and updates analytics", async () => {
    const user = userEvent.setup();
    render(<ConsentBanner />);

    await user.click(screen.getByRole("button", { name: "Decline" }));

    expect(localStorage.getItem("ga_consent")).toBe("denied");
    await waitFor(() => {
      expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
        analytics_storage: "denied",
      });
    });
  });

  it("reacts to storage events", async () => {
    render(<ConsentBanner />);

    localStorage.setItem("ga_consent", "granted");
    window.dispatchEvent(new StorageEvent("storage", { key: "ga_consent" }));

    await waitFor(() => {
      expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
        analytics_storage: "granted",
      });
    });
  });

  it("does not render when consent is already stored", () => {
    localStorage.setItem("ga_consent", "granted");
    const { container } = render(<ConsentBanner />);

    expect(container).toBeEmptyDOMElement();
  });
});

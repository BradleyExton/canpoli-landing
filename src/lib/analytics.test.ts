import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { trackEvent } from "./analytics";

describe("trackEvent", () => {
  const originalWindow = globalThis.window;
  const originalGtag = (originalWindow as { gtag?: unknown }).gtag;

  beforeEach(() => {
    delete (window as { gtag?: unknown }).gtag;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    const currentWindow = globalThis.window;
    if (originalGtag) {
      (currentWindow as { gtag?: unknown }).gtag = originalGtag;
    } else {
      delete (currentWindow as { gtag?: unknown }).gtag;
    }
    vi.restoreAllMocks();
  });

  it("no-ops when window is undefined", () => {
    vi.stubGlobal("window", undefined as unknown as Window);

    expect(() => trackEvent("cta_click", { location: "hero" })).not.toThrow();
  });

  it("no-ops when gtag is not present", () => {
    expect(() => trackEvent("cta_click", { location: "hero" })).not.toThrow();
  });

  it("sends event when gtag is available", () => {
    const gtag = vi.fn();
    (window as { gtag?: unknown }).gtag = gtag;

    trackEvent("cta_click", { location: "hero" });

    expect(gtag).toHaveBeenCalledWith("event", "cta_click", { location: "hero" });
  });
});

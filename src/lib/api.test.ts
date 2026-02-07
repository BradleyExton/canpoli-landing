import { describe, it, expect, vi, afterEach } from "vitest";

describe("api", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses default API_BASE_URL when env is not set", async () => {
    const original = process.env.NEXT_PUBLIC_API_BASE_URL;
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
    vi.resetModules();

    const mod = await import("./api");

    expect(mod.API_BASE_URL).toBe("https://api.canpoli.dev");

    if (original !== undefined) {
      process.env.NEXT_PUBLIC_API_BASE_URL = original;
    }
  });

  it("uses env API_BASE_URL when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://example.test");
    vi.resetModules();

    const mod = await import("./api");

    expect(mod.API_BASE_URL).toBe("https://example.test");
  });

  it("strips protocol for API_BASE_HOST", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://example.com");
    vi.resetModules();

    const mod = await import("./api");

    expect(mod.API_BASE_HOST).toBe("example.com");
  });

  it("builds representatives lookup URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://example.com");
    vi.resetModules();

    const mod = await import("./api");

    expect(mod.representativesLookupUrl("1", "2")).toBe(
      "https://example.com/v1/representatives/lookup?lat=1&lng=2"
    );
  });
});

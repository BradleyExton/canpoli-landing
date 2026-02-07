import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const nextResponseNext = vi.fn(() => ({ type: "next" }));
const handler = vi.fn(() => ({ type: "clerk" }));
const clerkMiddlewareMock = vi.fn(() => handler);

vi.mock("next/server", () => ({
  NextResponse: {
    next: nextResponseNext,
  },
}));

vi.mock("@clerk/nextjs/server", () => ({
  clerkMiddleware: clerkMiddlewareMock,
}));

describe("middleware", () => {
  beforeEach(() => {
    nextResponseNext.mockClear();
    handler.mockClear();
    clerkMiddlewareMock.mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("bypasses clerk middleware when configured", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("CLERK_BYPASS_MIDDLEWARE", "true");
    vi.resetModules();

    const { default: middleware } = await import("./middleware");

    const result = middleware({} as never, {} as never);

    expect(nextResponseNext).toHaveBeenCalledTimes(1);
    expect(handler).not.toHaveBeenCalled();
    expect(result).toEqual({ type: "next" });
  });

  it("delegates to clerk middleware when not bypassed", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CLERK_BYPASS_MIDDLEWARE", "false");
    vi.resetModules();

    const { default: middleware } = await import("./middleware");

    const result = middleware({} as never, {} as never);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(nextResponseNext).not.toHaveBeenCalled();
    expect(result).toEqual({ type: "clerk" });
  });
});

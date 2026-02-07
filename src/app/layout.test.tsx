import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next/font/google", () => ({
  DM_Sans: () => ({ variable: "--font-dm-sans" }),
  DM_Mono: () => ({ variable: "--font-dm-mono" }),
  Fraunces: () => ({ variable: "--font-fraunces" }),
}));

vi.mock("next/script", () => ({
  default: (props: { id?: string; src?: string }) => (
    <script data-testid={props.id ?? "next-script"} data-src={props.src ?? ""} />
  ),
}));

vi.mock("@clerk/nextjs", () => ({
  ClerkProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid="clerk-provider">{children}</div>
  ),
}));

vi.mock("@/components/chrome/AnalyticsListener", () => ({
  AnalyticsListener: () => <div data-testid="analytics-listener" />,
}));

vi.mock("@/components/chrome/ConsentBanner", () => ({
  ConsentBanner: () => <div data-testid="consent-banner" />,
}));

describe("RootLayout", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("renders children and analytics without GA scripts by default", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    vi.resetModules();

    const { default: RootLayout } = await import("./layout");

    const html = renderToStaticMarkup(
      <RootLayout>
        <div>Child</div>
      </RootLayout>
    );

    expect(html).toContain("Child");
    expect(html).toContain("analytics-listener");
    expect(html).not.toContain("consent-banner");
    expect(html).not.toContain("ga4-init");
  });

  it("renders GA scripts and consent banner when configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    vi.resetModules();

    const { default: RootLayout } = await import("./layout");

    const html = renderToStaticMarkup(
      <RootLayout>
        <div>Child</div>
      </RootLayout>
    );

    expect(html).toContain("consent-banner");
    expect(html).toContain("ga4-init");
  });
});

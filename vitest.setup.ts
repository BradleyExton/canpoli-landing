import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority,
    ...rest
  }: {
    src: string;
    alt?: string;
    priority?: boolean;
  }) => React.createElement("img", { src, alt, ...rest }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string | { pathname?: string };
    children: React.ReactNode;
  }) =>
    React.createElement(
      "a",
      { href: typeof href === "string" ? href : href.pathname ?? "", ...props },
      children
    ),
}));

afterEach(() => {
  cleanup();
});

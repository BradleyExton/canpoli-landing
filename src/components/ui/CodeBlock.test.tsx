import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from "@/lib/analytics";
import { CodeBlock } from "./CodeBlock";

describe("CodeBlock", () => {
  beforeEach(() => {
    vi.stubGlobal("navigator", {
      ...globalThis.navigator,
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("highlights bash and supports copy", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CodeBlock
        code={`# comment\ncurl https://example.com\nhello`}
        language="bash"
        title="Curl"
        eventContext="bash_test"
      />
    );

    expect(container.querySelector('.text-\\[var\\(--code-comment\\)\\]'))
      .toBeInTheDocument();
    expect(container.querySelector('.text-\\[var\\(--code-function\\)\\]'))
      .toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Copy" }));

    expect(trackEvent).toHaveBeenCalledWith("code_copy", { context: "bash_test" });
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it("highlights javascript keywords", () => {
    const { container } = render(
      <CodeBlock
        code={`const value = "hi";\nreturn value;`}
        language="typescript"
      />
    );

    expect(container.querySelector('.text-\\[var\\(--code-keyword\\)\\]'))
      .toBeInTheDocument();
  });

  it("highlights json with inline styles", () => {
    const { container } = render(
      <CodeBlock
        code={JSON.stringify({ ok: true, count: 3, name: "demo" }, null, 2)}
        language="json"
      />
    );

    expect(container.innerHTML).toContain("var(--code-key)");
    expect(container.innerHTML).toContain("var(--code-string)");
    expect(container.innerHTML).toContain("var(--code-number)");
    expect(container.innerHTML).toContain("var(--code-constant)");
  });
});

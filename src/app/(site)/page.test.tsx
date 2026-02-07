import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./_components/sections/Hero", () => ({ Hero: () => <div>Hero</div> }));
vi.mock("./_components/sections/Demo", () => ({ Demo: () => <div>Demo</div> }));
vi.mock("./_components/sections/Features", () => ({ Features: () => <div>Features</div> }));
vi.mock("./_components/sections/HowItWorks", () => ({ HowItWorks: () => <div>HowItWorks</div> }));
vi.mock("./_components/sections/Endpoints", () => ({ Endpoints: () => <div>Endpoints</div> }));
vi.mock("./_components/sections/ApiDocs", () => ({ ApiDocs: () => <div>ApiDocs</div> }));
vi.mock("./_components/sections/DataSources", () => ({ DataSources: () => <div>DataSources</div> }));

import Home from "./page";

describe("Home page", () => {
  it("renders the page sections", () => {
    render(<Home />);

    expect(screen.getByText("Hero")).toBeInTheDocument();
    expect(screen.getByText("Demo")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("HowItWorks")).toBeInTheDocument();
    expect(screen.getByText("Endpoints")).toBeInTheDocument();
    expect(screen.getByText("ApiDocs")).toBeInTheDocument();
    expect(screen.getByText("DataSources")).toBeInTheDocument();
  });
});

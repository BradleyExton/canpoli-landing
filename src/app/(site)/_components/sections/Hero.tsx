import { ParliamentIllustration } from "../illustrations/ParliamentIllustration";
import { API_BASE_HOST } from "@/lib/api";

export function Hero() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="animate-fade-in-up inline-flex items-center gap-3 bg-white/70 border border-[var(--border)] px-4 py-2 rounded-full text-[12px] font-semibold text-[var(--stone)] mb-7">
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
            Parliament-grade federal data
            <span className="hidden sm:inline text-[var(--stone)]/60">•</span>
            <span className="hidden sm:inline font-mono text-[11px] text-[var(--stone)]/80">
              {API_BASE_HOST}/v1
            </span>
          </div>

          <h1 className="animate-fade-in-up-delay-1 font-serif text-5xl md:text-6xl lg:text-[74px] font-bold tracking-tight leading-[1.05] mb-6">
            Heritage-grade data for the{' '}
            <span className="relative inline-block text-[var(--maple)]">
              <span className="relative z-10">House of Commons</span>
              <span className="absolute left-0 -bottom-2 h-3 w-full bg-[var(--maple)]/15 blur-[1px] z-0" />
            </span>
          </h1>

          <p className="animate-fade-in-up-delay-2 text-xl text-[var(--stone)] mb-8 max-w-[580px]">
            A modern API for Canadian MPs, ridings, and parties, built on official Parliament
            data. Lookup by coordinates or browse clean, filterable lists.
          </p>

          <div className="animate-fade-in-up-delay-2 flex flex-wrap justify-center lg:justify-start gap-2 mb-8 text-xs text-[var(--stone)]">
            <span className="px-3 py-1.5 rounded-full bg-white/70 border border-[var(--border)]">
              No API keys
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/70 border border-[var(--border)]">
              JSON responses
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/70 border border-[var(--border)]">
              Rate limited
            </span>
          </div>

          <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#docs"
              data-track-event="cta_click"
              data-track-location="hero"
              data-track-target="docs"
              className="px-7 py-3.5 bg-[var(--maple)] hover:bg-[var(--maple-dark)] text-white font-semibold rounded-[12px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Read the Docs
            </a>
            <a
              href="#demo"
              data-track-event="cta_click"
              data-track-location="hero"
              data-track-target="demo"
              className="px-7 py-3.5 bg-white/70 border border-[var(--border)] hover:border-[var(--ink)] text-[var(--ink)] font-semibold rounded-[12px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Try the API
            </a>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-4 text-left">
            <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--stone)]">
                Quickstart
              </div>
              <div className="mt-2 font-mono text-sm text-[var(--ink)]">
                GET /v1/representatives/lookup
              </div>
              <div className="mt-1 text-xs text-[var(--stone)]">
                lat, lng → current MP + riding
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--stone)]">
                Built For
              </div>
              <div className="mt-2 text-sm font-semibold text-[var(--ink)]">
                Civic products and research teams
              </div>
              <div className="mt-1 text-xs text-[var(--stone)]">
                Federal data without the crawl
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up-delay-2">
          <ParliamentIllustration />
        </div>
      </div>
    </section>
  );
}

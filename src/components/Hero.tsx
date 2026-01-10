export function Hero() {
  return (
    <section className="py-24 md:py-28 text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Live Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 bg-[var(--cream)] px-4 py-2 rounded-full text-[13px] font-medium text-[var(--stone)] mb-8">
          <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
          API Live at api.canpoli.dev
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up-delay-1 font-serif text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tight leading-[1.05] mb-6">
          Know Your{' '}
          <span className="text-[var(--maple)]">Representatives</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up-delay-2 text-xl text-[var(--stone)] mb-12 max-w-[560px] mx-auto">
          One API call. All levels of Canadian government. Get federal, provincial, and municipal representatives for any location.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#demo"
            className="px-7 py-3.5 bg-[var(--ink)] hover:bg-[#333] text-white font-semibold rounded-[10px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Try the API
          </a>
          <a
            href="https://github.com/BradleyExton/canpoli-api"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 bg-transparent border-[1.5px] border-[rgba(0,0,0,0.15)] hover:border-[var(--ink)] text-[var(--ink)] font-semibold rounded-[10px] transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

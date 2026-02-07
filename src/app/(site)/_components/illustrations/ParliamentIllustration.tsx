import Image from 'next/image';

export function ParliamentIllustration() {
  return (
    <div className="relative">
      <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-[rgba(197,34,47,0.12)] blur-2xl" />
      <div className="absolute -bottom-8 -left-6 w-40 h-40 rounded-full bg-[rgba(138,77,47,0.12)] blur-2xl" />
      <div className="relative bg-white/70 backdrop-blur border border-[var(--border)] rounded-[28px] p-6 shadow-[0_20px_60px_rgba(28,28,28,0.12)]">
        <Image
          src="/hero-illustration.png"
          alt="Stylized Parliament of Canada illustration"
          width={640}
          height={520}
          className="w-full h-auto rounded-2xl"
          priority
        />

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 rounded-xl border border-[var(--border)] bg-white px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--stone)]">
              Data Source
            </div>
            <div className="mt-1 text-sm font-semibold text-[var(--ink)]">
              Parliament of Canada
            </div>
          </div>
          <div className="flex-1 rounded-xl border border-[var(--border)] bg-white px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--stone)]">
              Coverage
            </div>
            <div className="mt-1 text-sm font-semibold text-[var(--ink)]">
              Federal ridings nationwide
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

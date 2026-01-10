import Link from 'next/link';

export function Header() {
  return (
    <header className="py-6 border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[var(--maple)] rounded-lg flex items-center justify-center text-white font-mono text-sm font-medium">
              🍁
            </div>
            <span className="font-serif text-xl font-semibold text-[var(--ink)] tracking-tight">
              Civic Context
            </span>
          </Link>

          <nav className="flex items-center gap-8">
            <a
              href="#demo"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-[15px] font-medium transition-colors"
            >
              Try It
            </a>
            <a
              href="#features"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-[15px] font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="https://github.com/BradleyExton/canpoli-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-[15px] font-medium transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/BradleyExton/canpoli-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-sm transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://represent.opennorth.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-sm transition-colors"
            >
              Data: Open North
            </a>
          </div>

          {/* Attribution */}
          <div className="text-center md:text-right">
            <p className="text-sm text-[var(--stone)]">
              Open source. MIT License.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

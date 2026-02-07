"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="py-5 border-b border-[var(--border)] bg-white/60 backdrop-blur">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[var(--maple)] rounded-lg flex items-center justify-center text-white font-mono text-sm font-medium">
              🍁
            </div>
            <span className="font-serif text-xl font-semibold text-[var(--ink)] tracking-tight">
              CanPoli API
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <a
              href="#demo"
              data-track-event="nav_click"
              data-track-target="demo"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-[15px] font-medium transition-colors"
            >
              Try It
            </a>
            <a
              href="#features"
              data-track-event="nav_click"
              data-track-target="features"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-[15px] font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#endpoints"
              data-track-event="nav_click"
              data-track-target="endpoints"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-[15px] font-medium transition-colors"
            >
              Endpoints
            </a>
            <a
              href="#docs"
              data-track-event="nav_click"
              data-track-target="docs"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-[15px] font-medium transition-colors"
            >
              Docs
            </a>
            <a
              href="#sources"
              data-track-event="nav_click"
              data-track-target="sources"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-[15px] font-medium transition-colors"
            >
              Data
            </a>
            <a
              href="https://github.com/BradleyExton/canpoli-api"
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="github_click"
              data-track-location="header"
              className="text-[var(--stone)] hover:text-[var(--ink)] text-[15px] font-medium transition-colors"
            >
              GitHub
            </a>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-[15px] font-medium text-[var(--ink)] border border-[var(--border)] px-3 py-1.5 rounded-full hover:bg-[var(--ink)] hover:text-white transition-colors">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3">
                <Link
                  href="/account"
                  className="text-[15px] font-medium text-[var(--ink)] border border-[var(--border)] px-3 py-1.5 rounded-full hover:bg-[var(--ink)] hover:text-white transition-colors"
                >
                  Account
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  );
}

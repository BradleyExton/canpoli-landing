"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { AccountClient } from "./_components/AccountClient";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <main className="max-w-[1100px] mx-auto px-6 py-16 space-y-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--stone)]">Account</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-[var(--ink)] mt-3">
            API key, usage, and billing
          </h1>
          <p className="text-[var(--stone)] mt-4 text-base max-w-2xl">
            Manage your CanPoli API access and keep track of your subscription usage.
          </p>
        </div>

        <SignedOut>
          <div className="rounded-3xl border border-[var(--border)] bg-white p-8 space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--ink)]">
              Sign in to view your account
            </h2>
            <p className="text-[var(--stone)]">
              You’ll be able to see your API key, usage, and billing history.
            </p>
            <SignInButton mode="modal">
              <button className="text-sm font-medium px-4 py-2 rounded-full bg-[var(--ink)] text-white hover:opacity-90">
                Sign in
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <AccountClient />
        </SignedIn>
      </main>
    </div>
  );
}

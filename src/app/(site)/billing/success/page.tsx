import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <main className="max-w-[900px] mx-auto px-6 py-20 space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--stone)]">Payment</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-[var(--ink)]">
          Subscription activated
        </h1>
        <p className="text-[var(--stone)] max-w-2xl">
          Thanks for upgrading. Your API key is now active. Head to your account to
          retrieve the key and track usage.
        </p>
        <Link
          href="/account"
          className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-full bg-[var(--ink)] text-white hover:opacity-90"
        >
          Go to account
        </Link>
      </main>
    </div>
  );
}

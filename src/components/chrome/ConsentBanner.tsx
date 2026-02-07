'use client';

import { useEffect, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'ga_consent';

type ConsentState = 'granted' | 'denied';
type ConsentSnapshot = ConsentState | null;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(state: ConsentState) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', { analytics_storage: state });
}

const listeners = new Set<() => void>();

function readConsent(): ConsentSnapshot {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(STORAGE_KEY) as ConsentState | null;
}

function subscribeConsent(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  listeners.add(callback);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener('storage', handleStorage);

  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', handleStorage);
  };
}

function notifyConsentChange() {
  listeners.forEach((listener) => listener());
}

function setStoredConsent(state: ConsentState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, state);
  notifyConsentChange();
}

export function ConsentBanner() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const visible = consent === null;

  useEffect(() => {
    if (!consent) return;
    updateConsent(consent);
  }, [consent]);

  const accept = () => {
    setStoredConsent('granted');
  };

  const decline = () => {
    setStoredConsent('denied');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(920px,94vw)] -translate-x-1/2 rounded-2xl border border-[var(--border)] bg-white/95 p-4 shadow-[0_20px_60px_rgba(28,28,28,0.18)] backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--ink)]">
            Analytics consent
          </p>
          <p className="text-xs text-[var(--stone)]">
            We use privacy-friendly analytics to understand usage of the API docs and demo.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs font-semibold text-[var(--ink)] border border-[var(--border)] rounded-full hover:bg-[var(--ink)] hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs font-semibold text-white bg-[var(--maple)] hover:bg-[var(--maple-dark)] rounded-full transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

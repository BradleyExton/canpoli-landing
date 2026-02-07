"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { API_BASE_URL } from "@/lib/api";

type ApiKeyResponse = {
  api_key?: string | null;
  key_prefix: string;
  masked_key: string;
  active: boolean;
  created_at: string;
  revoked_at?: string | null;
  last_used_at?: string | null;
};

type UsageResponse = {
  usage_count: number;
  period_start?: string | null;
  period_end?: string | null;
  limit_per_minute: number;
};

type ApiKeyRotateResponse = {
  api_key: string;
  key_prefix: string;
  created_at: string;
};

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function AccountClient() {
  const { getToken } = useAuth();
  const [apiKey, setApiKey] = useState<ApiKeyResponse | null>(null);
  const [usage, setUsage] = useState<UsageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionBusy, setActionBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authHeaders = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      throw new Error("Missing auth token");
    }
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }, [getToken]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = await authHeaders();
      const apiKeyRes = await fetch(`${API_BASE_URL}/v1/account/api-key`, { headers });
      if (apiKeyRes.status === 404) {
        setApiKey(null);
      } else if (apiKeyRes.ok) {
        const apiKeyData = (await apiKeyRes.json()) as ApiKeyResponse;
        setApiKey(apiKeyData);
      } else {
        throw new Error(await apiKeyRes.text());
      }
      try {
        const usageRes = await fetch(`${API_BASE_URL}/v1/account/usage`, { headers });
        if (usageRes.status === 404) {
          setUsage(null);
        } else if (usageRes.ok) {
          const usageData = (await usageRes.json()) as UsageResponse;
          setUsage(usageData);
        } else {
          throw new Error(await usageRes.text());
        }
      } catch {
        setUsage(null);
      }
    } catch (err) {
      setApiKey(null);
      setUsage(null);
      setError(err instanceof Error ? err.message : "Failed to load account data");
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const rotateKey = async () => {
    setActionBusy(true);
    setError(null);
    try {
      const headers = await authHeaders();
      const data = await fetchJson<ApiKeyRotateResponse>(
        `${API_BASE_URL}/v1/account/api-key/rotate`,
        {
          method: "POST",
          headers,
        }
      );
      setApiKey({
        api_key: data.api_key,
        key_prefix: data.key_prefix,
        masked_key: `${data.key_prefix}...`,
        active: true,
        created_at: data.created_at,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to rotate API key");
    } finally {
      setActionBusy(false);
    }
  };

  const startCheckout = async () => {
    setActionBusy(true);
    setError(null);
    try {
      const headers = await authHeaders();
      const { url } = await fetchJson<{ url: string }>(`${API_BASE_URL}/v1/billing/checkout`, {
        method: "POST",
        headers,
      });
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout");
      setActionBusy(false);
    }
  };

  const openPortal = async () => {
    setActionBusy(true);
    setError(null);
    try {
      const headers = await authHeaders();
      const { url } = await fetchJson<{ url: string }>(`${API_BASE_URL}/v1/billing/portal`, {
        method: "POST",
        headers,
      });
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to open portal");
      setActionBusy(false);
    }
  };

  const usageRange = useMemo(() => {
    if (!usage?.period_start || !usage?.period_end) {
      return "Current billing period";
    }
    const start = new Date(usage.period_start).toLocaleDateString();
    const end = new Date(usage.period_end).toLocaleDateString();
    return `${start} → ${end}`;
  }, [usage]);

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-3xl border border-[var(--border)] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--stone)]">API Key</p>
            <h2 className="text-xl font-semibold text-[var(--ink)] mt-2">
              {loading ? "Loading…" : apiKey?.masked_key || "No key yet"}
            </h2>
            {apiKey?.api_key && (
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[var(--stone)]">
                <span>
                  Your new key (shown once):{" "}
                  <span className="font-mono text-[var(--ink)]">{apiKey.api_key}</span>
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(apiKey.api_key || "")}
                  className="text-xs font-medium border border-[var(--border)] px-2.5 py-1 rounded-full hover:bg-[var(--ink)] hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
          <button
            onClick={rotateKey}
            disabled={actionBusy}
            className="text-sm font-medium border border-[var(--border)] px-4 py-2 rounded-full hover:bg-[var(--ink)] hover:text-white transition-colors disabled:opacity-60"
          >
            Rotate Key
          </button>
        </div>
        <p className="text-sm text-[var(--stone)]">
          Send this key via <span className="font-mono">X-API-Key</span> header to unlock 500
          req/min.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--stone)]">Usage</p>
          <h3 className="text-2xl font-semibold text-[var(--ink)]">
            {loading ? "—" : usage ? usage.usage_count.toLocaleString() : "0"}
          </h3>
          <p className="text-sm text-[var(--stone)]">{usageRange}</p>
          <p className="text-sm text-[var(--stone)]">
            Limit: {usage?.limit_per_minute ?? 500} req/min
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--stone)]">Billing</p>
          <p className="text-sm text-[var(--stone)]">
            Manage your subscription, update payment methods, or cancel anytime.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={startCheckout}
              disabled={actionBusy}
              className="text-sm font-medium px-4 py-2 rounded-full bg-[var(--ink)] text-white hover:opacity-90 disabled:opacity-60"
            >
              Upgrade
            </button>
            <button
              onClick={openPortal}
              disabled={actionBusy}
              className="text-sm font-medium border border-[var(--border)] px-4 py-2 rounded-full hover:bg-[var(--ink)] hover:text-white transition-colors disabled:opacity-60"
            >
              Manage Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

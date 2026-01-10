'use client';

import { useState } from 'react';

const QUICK_LOCATIONS = [
  { name: 'Ottawa', lat: 45.4215, lng: -75.6972 },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832 },
  { name: 'Montreal', lat: 45.5017, lng: -73.5673 },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207 },
  { name: 'Calgary', lat: 51.0447, lng: -114.0719 },
];

interface Representative {
  name: string;
  riding: string;
  party: string | null;
  email?: string | null;
  photo_url?: string;
  profile_url?: string;
}

interface ApiResponse {
  representatives: {
    federal: Representative | null;
    provincial: Representative | null;
    municipal: Representative | null;
  };
  location: {
    lat: number;
    lng: number;
  };
}

export function Demo() {
  const [lat, setLat] = useState('45.4215');
  const [lng, setLng] = useState('-75.6972');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.canpoli.dev/civic/?lat=${lat}&lng=${lng}`
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const setLocation = (location: { lat: number; lng: number }) => {
    setLat(location.lat.toString());
    setLng(location.lng.toString());
  };

  const formatJson = (obj: unknown) => {
    return JSON.stringify(obj, null, 2);
  };

  const levelColors = {
    federal: 'border-l-[var(--federal)]',
    provincial: 'border-l-[var(--provincial)]',
    municipal: 'border-l-[var(--municipal)]',
  };

  return (
    <section id="demo" className="py-16 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="animate-fade-in-up-delay-4 bg-white rounded-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-[var(--ink)] px-6 py-4 flex items-center gap-3">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 bg-white/10 px-4 py-2 rounded-lg font-mono text-[13px] text-white/80">
              api.canpoli.dev/civic/
            </div>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[rgba(0,0,0,0.06)]">
            {/* Input Panel */}
            <div className="p-8">
              <h3 className="font-serif text-lg font-semibold mb-6">Enter Coordinates</h3>

              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-[13px] font-medium text-[var(--stone)] uppercase tracking-wider mb-2">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white border-[1.5px] border-[rgba(0,0,0,0.1)] rounded-[10px] font-mono text-base focus:outline-none focus:ring-0 focus:border-[var(--maple)] focus:shadow-[0_0_0_3px_rgba(213,43,30,0.1)] transition-all"
                    placeholder="e.g., 45.4215"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[var(--stone)] uppercase tracking-wider mb-2">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white border-[1.5px] border-[rgba(0,0,0,0.1)] rounded-[10px] font-mono text-base focus:outline-none focus:ring-0 focus:border-[var(--maple)] focus:shadow-[0_0_0_3px_rgba(213,43,30,0.1)] transition-all"
                    placeholder="e.g., -75.6972"
                  />
                </div>
              </div>

              {/* Quick Locations */}
              <div className="flex flex-wrap gap-2 mb-6">
                {QUICK_LOCATIONS.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => setLocation(loc)}
                    className="px-3.5 py-2 text-[13px] font-medium bg-[var(--cream)] hover:bg-[var(--ink)] hover:text-white text-[var(--stone)] rounded-lg transition-colors"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>

              <button
                onClick={handleFetch}
                disabled={loading}
                className="w-full px-6 py-3.5 bg-[var(--maple)] hover:bg-[var(--maple-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-[10px] transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Fetching...
                  </span>
                ) : (
                  'Fetch Representatives'
                )}
              </button>
            </div>

            {/* Output Panel */}
            <div className="bg-[#1E1E1E] p-8 min-h-[400px] font-mono text-[13px] leading-[1.7] text-[#E5E5E5] overflow-auto">
              {error ? (
                <div className="text-red-400">
                  <span className="text-[#6A9955]">{'// Error'}</span>
                  <br />
                  {error}
                </div>
              ) : response ? (
                <div className="space-y-4">
                  {/* Representative Cards */}
                  {(['federal', 'provincial', 'municipal'] as const).map((level) => {
                    const rep = response.representatives[level];
                    if (!rep) return null;

                    return (
                      <div
                        key={level}
                        className={`bg-white/5 rounded-xl p-4 border-l-[3px] ${levelColors[level]}`}
                      >
                        <div className="text-[11px] uppercase tracking-[0.1em] text-white/60 mb-2">
                          {level}
                        </div>
                        <div className="text-white font-medium text-base">
                          {rep.name}
                        </div>
                        <div className="text-white/70 text-xs mt-1">
                          {rep.party || 'Independent'} · {rep.riding}
                        </div>
                      </div>
                    );
                  })}

                  {/* Raw JSON */}
                  <details className="mt-6">
                    <summary className="text-white/50 cursor-pointer hover:text-white/80 transition-colors">
                      View raw JSON response
                    </summary>
                    <pre className="mt-2 text-xs text-white/60 overflow-auto whitespace-pre-wrap">
                      {formatJson(response)}
                    </pre>
                  </details>
                </div>
              ) : (
                <div className="text-white/70">
                  <span className="text-[#6A9955]">
                    {'// Click "Fetch Representatives" to see results'}
                  </span>
                  <br />
                  <br />
                  <span className="text-[#D4D4D4]">{'{'}</span>
                  <br />
                  {'  '}
                  <span className="text-[#9CDCFE]">&quot;representatives&quot;</span>
                  <span className="text-[#D4D4D4]">: {'{'}</span>
                  <br />
                  {'    '}
                  <span className="text-[#9CDCFE]">&quot;federal&quot;</span>
                  <span className="text-[#D4D4D4]">: {'{ ... }'}</span>
                  <span className="text-[#D4D4D4]">,</span>
                  <br />
                  {'    '}
                  <span className="text-[#9CDCFE]">&quot;provincial&quot;</span>
                  <span className="text-[#D4D4D4]">: {'{ ... }'}</span>
                  <span className="text-[#D4D4D4]">,</span>
                  <br />
                  {'    '}
                  <span className="text-[#9CDCFE]">&quot;municipal&quot;</span>
                  <span className="text-[#D4D4D4]">: {'{ ... }'}</span>
                  <br />
                  {'  '}
                  <span className="text-[#D4D4D4]">{'}'}</span>
                  <span className="text-[#D4D4D4]">,</span>
                  <br />
                  {'  '}
                  <span className="text-[#9CDCFE]">&quot;location&quot;</span>
                  <span className="text-[#D4D4D4]">: {'{'}</span>
                  <br />
                  {'    '}
                  <span className="text-[#9CDCFE]">&quot;lat&quot;</span>
                  <span className="text-[#D4D4D4]">: </span>
                  <span className="text-[#B5CEA8]">45.4215</span>
                  <span className="text-[#D4D4D4]">,</span>
                  <br />
                  {'    '}
                  <span className="text-[#9CDCFE]">&quot;lng&quot;</span>
                  <span className="text-[#D4D4D4]">: </span>
                  <span className="text-[#B5CEA8]">-75.6972</span>
                  <br />
                  {'  '}
                  <span className="text-[#D4D4D4]">{'}'}</span>
                  <br />
                  <span className="text-[#D4D4D4]">{'}'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

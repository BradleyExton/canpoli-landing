'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { API_BASE_HOST, representativesLookupUrl } from '@/lib/api';

const QUICK_LOCATIONS = [
  { name: 'Ottawa', lat: 45.4215, lng: -75.6972 },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832 },
  { name: 'Montreal', lat: 45.5017, lng: -73.5673 },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207 },
  { name: 'Calgary', lat: 51.0447, lng: -114.0719 },
];

interface Party {
  name: string;
  short_name?: string | null;
  color?: string | null;
}

interface Riding {
  id: number;
  name: string;
  province: string;
  fed_number?: number | null;
}

interface Representative {
  hoc_id: number;
  first_name?: string | null;
  last_name?: string | null;
  name: string;
  honorific?: string | null;
  email?: string | null;
  phone?: string | null;
  photo_url?: string | null;
  profile_url?: string | null;
  is_active: boolean;
  party?: Party | null;
  riding?: Riding | null;
}

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE ?? 'live';
const isOfflineDemo = DEMO_MODE === 'offline';

const sampleResponse: Representative = {
  hoc_id: 1001,
  first_name: 'Example',
  last_name: 'MP',
  name: 'Example MP',
  honorific: 'Hon.',
  email: 'example.mp@parl.gc.ca',
  phone: '613-555-0199',
  photo_url: 'https://www.ourcommons.ca/Members/en/1001/photo',
  profile_url: 'https://www.ourcommons.ca/Members/en/1001',
  is_active: true,
  party: {
    name: 'Liberal',
    short_name: 'LPC',
    color: '#D71920',
  },
  riding: {
    id: 42,
    name: 'Ottawa Centre',
    province: 'Ontario',
    fed_number: 35075,
  },
};

export function Demo() {
  const [lat, setLat] = useState('45.4215');
  const [lng, setLng] = useState('-75.6972');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<Representative | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    trackEvent("demo_request", { source: "button" });

    try {
      if (isOfflineDemo) {
        setResponse(sampleResponse);
        trackEvent("demo_success", { mode: "offline" });
        return;
      }

      const res = await fetch(representativesLookupUrl(lat, lng));

      if (!res.ok) {
        trackEvent("demo_error", { status: res.status });
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data);
      trackEvent("demo_success", { status: res.status });
    } catch (err) {
      if (err instanceof TypeError) {
        trackEvent("demo_error", { status: 0 });
      }
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
  const getPartyLabel = (rep: Representative) => {
    if (!rep.party) return 'Independent';
    return rep.party.short_name
      ? `${rep.party.name} (${rep.party.short_name})`
      : rep.party.name;
  };

  const getRidingLabel = (rep: Representative) => {
    if (!rep.riding) return 'Riding unavailable';
    return `${rep.riding.name} · ${rep.riding.province}`;
  };

  return (
    <section id="demo" className="py-16 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="animate-fade-in-up-delay-4 bg-white/70 border border-[var(--border)] rounded-[24px] shadow-[0_20px_60px_rgba(28,28,28,0.12)] overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-[var(--slate)] px-6 py-4 flex items-center gap-3">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 bg-white/10 px-4 py-2 rounded-lg font-mono text-[13px] text-white/80">
              {API_BASE_HOST}/v1/representatives/lookup
            </div>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            {/* Input Panel */}
            <div className="p-8">
              <h3 className="font-serif text-lg font-semibold mb-6">Find an MP by Coordinates</h3>

              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-[13px] font-medium text-[var(--stone)] uppercase tracking-wider mb-2">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white border-[1.5px] border-[var(--border)] rounded-[12px] font-mono text-base focus:outline-none focus:ring-0 focus:border-[var(--maple)] focus:shadow-[0_0_0_3px_rgba(197,34,47,0.15)] transition-all"
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
                    className="w-full px-4 py-3.5 bg-white border-[1.5px] border-[var(--border)] rounded-[12px] font-mono text-base focus:outline-none focus:ring-0 focus:border-[var(--maple)] focus:shadow-[0_0_0_3px_rgba(197,34,47,0.15)] transition-all"
                    placeholder="e.g., -75.6972"
                  />
                </div>
              </div>

              {/* Quick Locations */}
              <div className="flex flex-wrap gap-2 mb-6">
                {QUICK_LOCATIONS.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => {
                      setLocation(loc);
                      trackEvent("quick_location_select", { city: loc.name });
                    }}
                    className="px-3.5 py-2 text-[13px] font-medium bg-[var(--cream)] hover:bg-[var(--slate)] hover:text-white text-[var(--stone)] rounded-lg transition-colors"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>

              <button
                onClick={handleFetch}
                disabled={loading}
                className="w-full px-6 py-3.5 bg-[var(--maple)] hover:bg-[var(--maple-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-[12px] transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Fetching...
                  </span>
                ) : (
                  'Find MP'
                )}
              </button>
            </div>

            {/* Output Panel */}
            <div className="bg-[var(--ink)] p-8 min-h-[400px] font-mono text-[13px] leading-[1.7] text-white/80 overflow-auto">
              {error ? (
                <div className="text-red-400">
                  <span className="text-[var(--code-comment)]">{'// Error'}</span>
                  <br />
                  {error}
                </div>
              ) : response ? (
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border-l-[3px] border-l-[var(--maple)]">
                    <div className="text-[11px] uppercase tracking-[0.1em] text-white/60 mb-2">
                      Federal MP
                    </div>
                    <div className="text-white font-medium text-base">
                      {response.name}
                    </div>
                    <div className="text-white/70 text-xs mt-1">
                      {getPartyLabel(response)} · {getRidingLabel(response)}
                    </div>
                    <div className="mt-3 text-white/60 text-xs space-y-1">
                      <div>HoC ID: {response.hoc_id}</div>
                      {response.email && (
                        <div>
                          Email:{' '}
                          <a
                            href={`mailto:${response.email}`}
                            className="text-white/80 hover:text-white"
                          >
                            {response.email}
                          </a>
                        </div>
                      )}
                      {response.phone && <div>Phone: {response.phone}</div>}
                      {response.profile_url && (
                        <div>
                          Profile:{' '}
                          <a
                            href={response.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-white"
                          >
                            ourcommons.ca
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

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
                  <span className="text-[var(--code-comment)]">
                    {'// Click "Find MP" to see results'}
                  </span>
                  <br />
                  <br />
                  <span className="text-white/70">{'{'}</span>
                  <br />
                  {'  '}
                  <span className="text-[var(--code-key)]">&quot;hoc_id&quot;</span>
                  <span className="text-white/70">: </span>
                  <span className="text-[var(--code-number)]">1001</span>
                  <span className="text-white/70">,</span>
                  <br />
                  {'  '}
                  <span className="text-[var(--code-key)]">&quot;name&quot;</span>
                  <span className="text-white/70">: </span>
                  <span className="text-[var(--code-string)]">&quot;Example MP&quot;</span>
                  <span className="text-white/70">,</span>
                  <br />
                  {'  '}
                  <span className="text-[var(--code-key)]">&quot;party&quot;</span>
                  <span className="text-white/70">: {'{'}</span>
                  <br />
                  {'    '}
                  <span className="text-[var(--code-key)]">&quot;name&quot;</span>
                  <span className="text-white/70">: </span>
                  <span className="text-[var(--code-string)]">&quot;Liberal&quot;</span>
                  <span className="text-white/70">,</span>
                  <br />
                  {'    '}
                  <span className="text-[var(--code-key)]">&quot;short_name&quot;</span>
                  <span className="text-white/70">: </span>
                  <span className="text-[var(--code-string)]">&quot;LPC&quot;</span>
                  <br />
                  {'  '}
                  <span className="text-white/70">{'}'}</span>
                  <span className="text-white/70">,</span>
                  <br />
                  {'  '}
                  <span className="text-[var(--code-key)]">&quot;riding&quot;</span>
                  <span className="text-white/70">: {'{'}</span>
                  <br />
                  {'    '}
                  <span className="text-[var(--code-key)]">&quot;id&quot;</span>
                  <span className="text-white/70">: </span>
                  <span className="text-[var(--code-number)]">42</span>
                  <span className="text-white/70">,</span>
                  <br />
                  {'    '}
                  <span className="text-[var(--code-key)]">&quot;name&quot;</span>
                  <span className="text-white/70">: </span>
                  <span className="text-[var(--code-string)]">&quot;Ottawa Centre&quot;</span>
                  <span className="text-white/70">,</span>
                  <br />
                  {'    '}
                  <span className="text-[var(--code-key)]">&quot;province&quot;</span>
                  <span className="text-white/70">: </span>
                  <span className="text-[var(--code-string)]">&quot;Ontario&quot;</span>
                  <br />
                  {'  '}
                  <span className="text-white/70">{'}'}</span>
                  <br />
                  <span className="text-white/70">{'}'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { CodeBlock } from "@/components/ui/CodeBlock";
import { API_BASE_URL } from '@/lib/api';

const exampleResponse = `{
  "hoc_id": 1001,
  "first_name": "Example",
  "last_name": "MP",
  "name": "Example MP",
  "honorific": "Hon.",
  "email": "example.mp@parl.gc.ca",
  "phone": "613-555-0199",
  "photo_url": "https://www.ourcommons.ca/Members/en/1001/photo",
  "profile_url": "https://www.ourcommons.ca/Members/en/1001",
  "is_active": true,
  "party": {
    "name": "Liberal",
    "short_name": "LPC",
    "color": "#D71920"
  },
  "riding": {
    "id": 42,
    "name": "Ottawa Centre",
    "province": "Ontario",
    "fed_number": 35075
  }
}`;

const typeDefinitions = `interface RepresentativeResponse {
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
}

interface PartyResponse {
  name: string;
  short_name?: string | null;
  color?: string | null;
}

interface RidingResponse {
  id: number;
  name: string;
  province: string;
  fed_number?: number | null;
}

interface RepresentativeDetailResponse extends RepresentativeResponse {
  party?: PartyResponse | null;
  riding?: RidingResponse | null;
}

interface RepresentativeListResponse {
  representatives: RepresentativeDetailResponse[];
  total: number;
  limit: number;
  offset: number;
}`;

export function ApiDocs() {
  const [showTypes, setShowTypes] = useState(false);

  return (
    <section id="docs" className="py-20 bg-[var(--surface)]/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">API Reference</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Lookup MPs by coordinates or browse federal data with filters
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Endpoint</h3>
            <div className="bg-[var(--code-bg)] rounded-xl p-4 border border-[var(--border)] font-mono">
              <span className="text-[#C586C0]">GET</span>{' '}
              <span className="text-[var(--text-primary)]">
                {API_BASE_URL}/v1/representatives/lookup
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Parameters</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                      Parameter
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                      Type
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                      Required
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-mono text-sm text-[var(--accent)]">
                      lat
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-[var(--text-secondary)]">
                      float
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-medium px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded">
                        Yes
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Latitude (-90 to 90)
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-mono text-sm text-[var(--accent)]">
                      lng
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-[var(--text-secondary)]">
                      float
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-medium px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded">
                        Yes
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Longitude (-180 to 180)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Response Schema</h3>
              <button
                onClick={() => setShowTypes(!showTypes)}
                className="text-sm text-[var(--accent)] hover:underline"
              >
                {showTypes ? 'Hide TypeScript types' : 'Show TypeScript types'}
              </button>
            </div>

            {showTypes && (
              <div className="mb-6">
                <CodeBlock
                  code={typeDefinitions}
                  language="typescript"
                  title="types.ts"
                  eventContext="api_docs_types"
                />
              </div>
            )}

            <p className="text-[var(--text-secondary)] mb-4">
              The lookup response returns a single federal MP with nested party and riding data.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Example Response</h3>
            <CodeBlock
              code={exampleResponse}
              language="json"
              title="Response"
              eventContext="api_docs_response"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Error Responses</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                      Status
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-mono text-sm text-yellow-400">
                      422
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Validation error - Invalid latitude or longitude values
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-mono text-sm text-yellow-400">
                      404
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Riding or representative not found for coordinates
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-mono text-sm text-yellow-400">
                      429
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Rate limit exceeded
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-mono text-sm text-yellow-400">
                      501
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Postal code lookup not implemented
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

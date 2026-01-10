'use client';

import { useState } from 'react';
import { CodeBlock } from './ui/CodeBlock';

const exampleResponse = `{
  "representatives": {
    "federal": {
      "name": "Yasir Naqvi",
      "riding": "Ottawa Centre",
      "party": "Liberal",
      "email": "yasir.naqvi@parl.gc.ca",
      "hoc_person_id": 105689,
      "honorific": "The Honourable",
      "province": "Ontario",
      "photo_url": "https://...",
      "profile_url": "https://...",
      "openparliament_url": "https://openparliament.ca/politicians/yasir-naqvi/",
      "ministerial_role": null,
      "committees": [
        {
          "name": "Standing Committee on Justice and Human Rights",
          "role": "Member"
        }
      ],
      "bills_sponsored": [...],
      "recent_votes": [...]
    },
    "provincial": {
      "name": "Joel Harden",
      "riding": "Ottawa Centre",
      "party": "NDP",
      "email": "jharden-qp@ndp.on.ca"
    },
    "municipal": {
      "name": "Ariel Troster",
      "riding": "Somerset Ward",
      "party": null,
      "email": "ariel.troster@ottawa.ca"
    }
  },
  "location": {
    "lat": 45.4215,
    "lng": -75.6972
  }
}`;

const typeDefinitions = `interface CivicContextResponse {
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

interface Representative {
  // Core fields (all levels)
  name: string;
  riding: string;
  party: string | null;
  email: string | null;

  // Federal MP enrichment only
  hoc_person_id?: number;
  honorific?: string;
  province?: string;
  photo_url?: string;
  profile_url?: string;
  ministerial_role?: MinisterialRole | null;
  parliamentary_secretary_role?: ParliamentarySecretaryRole | null;
  committees?: Committee[];
  parliamentary_associations?: ParliamentaryAssociation[];
  openparliament_url?: string;
  bills_sponsored?: Bill[];
  recent_votes?: VoteRecord[];
}

interface MinisterialRole {
  title: string;
  organization?: string;
}

interface Committee {
  name: string;
  role: string;
}

interface Bill {
  number: string;
  name: string;
  session: string;
  introduced_date: string;
  status: string;
}

interface VoteRecord {
  vote_number: number;
  session: string;
  date: string;
  description: string;
  result: string;
  member_vote: string;
}`;

export function ApiDocs() {
  const [showTypes, setShowTypes] = useState(false);

  return (
    <section id="docs" className="py-20 bg-[var(--surface)]/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">API Reference</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Everything you need to integrate the Civic Context API
          </p>
        </div>

        <div className="space-y-12">
          {/* Endpoint */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Endpoint</h3>
            <div className="bg-[var(--code-bg)] rounded-xl p-4 border border-[var(--border)] font-mono">
              <span className="text-[#C586C0]">GET</span>{' '}
              <span className="text-[var(--text-primary)]">
                https://api.canpoli.dev/civic/
              </span>
            </div>
          </div>

          {/* Parameters */}
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

          {/* Response Schema */}
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
                <CodeBlock code={typeDefinitions} language="typescript" title="types.ts" />
              </div>
            )}

            <p className="text-[var(--text-secondary)] mb-4">
              The response includes representatives for each level of government at the specified location.
              Federal MPs include enriched data from the House of Commons and OpenParliament.
            </p>
          </div>

          {/* Example Response */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Example Response</h3>
            <CodeBlock code={exampleResponse} language="json" title="Response" />
          </div>

          {/* Error Responses */}
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
                      503
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Upstream service unavailable - Data source temporarily unreachable
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-mono text-sm text-yellow-400">
                      504
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Upstream timeout - Request to data source timed out
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

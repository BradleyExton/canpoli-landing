import { Card } from './ui/Card';

const sources = [
  {
    name: 'Represent API',
    organization: 'Open North',
    description: 'Base representative data for federal, provincial, and municipal governments across Canada.',
    url: 'https://represent.opennorth.ca/',
  },
  {
    name: 'House of Commons Open Data',
    organization: 'Parliament of Canada',
    description: 'MP enrichment including photos, committees, parliamentary associations, and roles.',
    url: 'https://www.ourcommons.ca/en/open-data',
  },
  {
    name: 'OpenParliament.ca',
    organization: 'Michael Mulley',
    description: 'Legislative activity including bills sponsored, voting records, and debate participation.',
    url: 'https://openparliament.ca/',
  },
];

export function DataSources() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Data Sources</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Built on trusted open data from these organizations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sources.map((source, index) => (
            <Card key={index} hover className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">{source.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {source.organization}
                </p>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {source.description}
              </p>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline"
              >
                Visit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

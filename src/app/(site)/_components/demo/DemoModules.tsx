import { Card } from "@/components/ui/Card";

const demos = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Address Lookup',
    description: 'Enter any Canadian address to find your elected representatives at all levels of government.',
    status: 'Coming Soon',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'Interactive Map',
    description: 'Click anywhere on the map of Canada to see who represents that area.',
    status: 'Coming Soon',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'MP Directory',
    description: 'Browse all federal MPs with search, filter by party or province, and view detailed profiles.',
    status: 'Coming Soon',
  },
];

export function DemoModules() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Demos</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            More ways to explore Canadian civic data
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <Card key={index} className="p-6 relative overflow-hidden">
              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)] rounded-full">
                  {demo.status}
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-[var(--border)]/50 text-[var(--text-secondary)] flex items-center justify-center mb-5">
                {demo.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">{demo.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {demo.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

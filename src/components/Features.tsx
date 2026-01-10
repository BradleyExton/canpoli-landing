const features = [
  {
    icon: '📍',
    title: 'Location-Based',
    description: 'Pass any Canadian latitude/longitude coordinates and get back the relevant elected officials for that exact location.',
    iconBg: 'rgba(213,43,30,0.1)',
  },
  {
    icon: '🏛️',
    title: 'All Levels',
    description: 'Returns representatives from federal, provincial, and municipal governments in a single unified response.',
    iconBg: 'rgba(43,93,174,0.1)',
  },
  {
    icon: '⚡',
    title: 'Fast & Cached',
    description: 'DynamoDB-backed caching ensures quick responses. Serverless architecture scales automatically.',
    iconBg: 'rgba(42,125,79,0.1)',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-[var(--cream)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold tracking-tight mb-4">Built for Civic Apps</h2>
          <p className="text-[var(--stone)] text-lg">
            Everything you need to integrate Canadian political data
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ backgroundColor: feature.iconBg }}
              >
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-[var(--stone)] text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { IconLookup, IconRepresentatives, IconRidings } from "../icons/Icons";

const features = [
  {
    icon: IconLookup,
    title: 'Coordinate Lookup',
    description: 'Resolve any Canadian lat/lng to the current federal MP using PostGIS riding boundaries.',
    iconBg: 'rgba(197,34,47,0.12)',
  },
  {
    icon: IconRepresentatives,
    title: 'Ridings + Parties',
    description: 'Every MP includes party metadata and riding details. Browse ridings and parties directly.',
    iconBg: 'rgba(45,60,71,0.12)',
  },
  {
    icon: IconRidings,
    title: 'Filterable Lists',
    description: 'Paginated endpoints for MPs and ridings with province and party filters built in.',
    iconBg: 'rgba(138,77,47,0.12)',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold tracking-tight mb-4">Built for Civic Builders</h2>
          <p className="text-[var(--stone)] text-lg">
            A Canadian data foundation that feels modern, reliable, and human
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/70 border border-[var(--border)] p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(28,28,28,0.12)]"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[var(--ink)] mb-5"
                style={{ backgroundColor: feature.iconBg }}
              >
                <feature.icon className="w-6 h-6" />
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

import { IconLookup, IconRepresentatives, IconRidings, IconParties } from "../icons/Icons";
import { EndpointsIllustration } from "../illustrations/EndpointsIllustration";

const endpoints = [
  {
    icon: IconLookup,
    title: 'Lookup',
    description: 'Find the current MP for any coordinates with PostGIS-powered lookup.',
    routes: ['GET /v1/representatives/lookup?lat=&lng='],
    colorClass: 'border-t-[var(--maple)]',
  },
  {
    icon: IconRepresentatives,
    title: 'Representatives',
    description: 'List MPs with filters or fetch a single MP by House of Commons ID.',
    routes: ['GET /v1/representatives', 'GET /v1/representatives/{hoc_id}'],
    colorClass: 'border-t-[var(--provincial)]',
  },
  {
    icon: IconRidings,
    title: 'Ridings',
    description: 'Browse all federal ridings or pull one with the current MP attached.',
    routes: ['GET /v1/ridings', 'GET /v1/ridings/{id}'],
    colorClass: 'border-t-[var(--municipal)]',
  },
  {
    icon: IconParties,
    title: 'Parties',
    description: 'Fetch the list of political parties with short names and colors.',
    routes: ['GET /v1/parties'],
    colorClass: 'border-t-[var(--federal)]',
  },
];

export function Endpoints() {
  return (
    <section id="endpoints" className="py-24 bg-[var(--slate)] text-white relative overflow-hidden">
      <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[rgba(197,34,47,0.18)] blur-3xl" />
      <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-[rgba(138,77,47,0.18)] blur-3xl" />
      <div className="absolute top-8 right-0 w-[320px] md:w-[420px] text-white/20 pointer-events-none">
        <EndpointsIllustration />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold tracking-tight mb-4">
            Core Endpoints
          </h2>
          <p className="text-white/60 text-lg">
            Everything you need to query MPs, ridings, and parties
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {endpoints.map((endpoint, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl bg-white/[0.06] border border-white/[0.12] border-t-[3px] ${endpoint.colorClass} text-left shadow-[0_16px_40px_rgba(0,0,0,0.25)]`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
                <endpoint.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{endpoint.title}</h3>
              <p className="text-white/60 text-[15px] mb-5">
                {endpoint.description}
              </p>
              <div className="flex flex-col gap-2">
                {endpoint.routes.map((route) => (
                  <span
                    key={route}
                    className="px-3 py-1.5 bg-white/[0.08] rounded-md text-[12px] font-mono text-white/80"
                  >
                    {route}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

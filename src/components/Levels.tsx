const levels = [
  {
    icon: '🏛️',
    title: 'Federal',
    description: 'Members of Parliament representing ridings in the House of Commons',
    roles: ['MP'],
    colorClass: 'border-t-[var(--federal)]',
  },
  {
    icon: '🏢',
    title: 'Provincial',
    description: 'Provincial and territorial legislators across all regions',
    roles: ['MPP', 'MLA', 'MNA', 'MHA'],
    colorClass: 'border-t-[var(--provincial)]',
  },
  {
    icon: '🏘️',
    title: 'Municipal',
    description: 'City councillors and local representatives for your ward',
    roles: ['Councillor', 'Mayor'],
    colorClass: 'border-t-[var(--municipal)]',
  },
];

export function Levels() {
  return (
    <section className="py-24 bg-[var(--ink)] text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold tracking-tight mb-4">
            Three Levels of Government
          </h2>
          <p className="text-white/60 text-lg">
            Comprehensive coverage across Canada&apos;s political landscape
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] border-t-[3px] ${level.colorClass} text-center`}
            >
              <div className="text-4xl mb-5">{level.icon}</div>
              <h3 className="font-serif text-2xl font-semibold mb-3">{level.title}</h3>
              <p className="text-white/60 text-[15px] mb-5">{level.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {level.roles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1.5 bg-white/[0.08] rounded-md text-[13px] font-medium"
                  >
                    {role}
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

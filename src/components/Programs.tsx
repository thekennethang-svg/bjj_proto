const PROGRAMS = [
  {
    name: 'Fundamentals',
    audience: 'Complete beginners, no experience needed',
    description:
      'A structured introduction to BJJ positions, escapes, and submissions. You will learn how to move, defend, and think on the mat.',
    bullets: [
      'Safe, controlled drilling environment',
      'Positional sparring introduced gradually',
      'Small class sizes',
      'No prior fitness level required',
    ],
  },
  {
    name: 'All Levels Open Mat',
    audience: 'Students with 3+ months of training',
    description:
      'Live rolling sessions with structured rounds and coaching feedback. Open to all belt levels.',
    bullets: [
      'Supervised sparring',
      'Coach-led technique reviews',
      'Community-focused environment',
      'Gi and No-Gi options',
    ],
  },
  {
    name: 'Competition Prep',
    audience: 'Students preparing for tournaments',
    description:
      'Intensive training cycles aligned with the competition calendar. Focused on strategy, conditioning, and mental preparation.',
    bullets: [
      'Periodized training blocks',
      'Match analysis',
      'Strength and conditioning guidance',
      'Open to blue belt and above',
    ],
  },
];

export default function Programs() {
  return (
    <section id="programs" className="border-b border-border py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">
            Training
          </p>
          <h2 className="font-black uppercase tracking-widest text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
            What We Offer
          </h2>
          <p className="mt-5 text-text-secondary text-base md:text-lg max-w-xl">
            Three structured programs designed to meet you at your current level and
            move you forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROGRAMS.map((program) => (
            <div
              key={program.name}
              className="bg-surface border-t-2 border-accent border-x border-b border-border p-8 flex flex-col transition-colors duration-200 hover:bg-surface-hover"
            >
              <h3 className="font-black uppercase tracking-widest text-white text-xl mb-3">
                {program.name}
              </h3>
              <p className="text-accent text-xs uppercase tracking-widest font-medium mb-5">
                {program.audience}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {program.description}
              </p>
              <ul className="space-y-3 mt-auto">
                {program.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-white">
                    <svg
                      className="mt-0.5 shrink-0 text-accent"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M3 8.5l3.5 3.5L13 4.5" strokeLinecap="square" />
                    </svg>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

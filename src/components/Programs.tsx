import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import SectionHeading from './SectionHeading';

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
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.1 });

  return (
    <section
      id="programs"
      ref={ref}
      className="border-b border-border py-24 md:py-32 bg-bg"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          category="Training"
          title="What We Offer"
          subtitle="Three structured programs designed to meet you at your current level and move you forward."
          isVisible={isVisible}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PROGRAMS.map((program, index) => (
            <div
              key={program.name}
              style={{ transitionDelay: `${index * 120}ms` }}
              className={`bg-surface border-t-2 border-accent border-x border-b border-border/80 p-8 md:p-10 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/60 hover-glow ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              <h3 className="font-black uppercase tracking-widest text-white text-xl mb-3">
                {program.name}
              </h3>
              <p className="text-accent text-xs uppercase tracking-widest font-semibold mb-5">
                {program.audience}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-8">
                {program.description}
              </p>
              <ul className="space-y-3.5 mt-auto">
                {program.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-sm text-white/90"
                  >
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

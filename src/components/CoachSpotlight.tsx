import { Award, ShieldCheck, Users, CheckCircle2, Flame } from 'lucide-react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import AmbientGlow from './AmbientGlow';
import SectionHeading from './SectionHeading';

interface CoachSpotlightProps {
  onBookClick: () => void;
}

const COACH_CREDENTIALS = [
  {
    icon: Award,
    title: '3rd Degree Black Belt',
    desc: 'Certified under recognized Brazilian Jiu Jitsu lineage with over 18 years on the mats.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety-First Pedagogy',
    desc: 'Structured, progressive instruction that eliminates dangerous ego rolls and prioritizes joint health.',
  },
  {
    icon: Users,
    title: '400+ Students Mentored',
    desc: 'Guiding complete novices on day one to podium finishes at regional and national championships.',
  },
  {
    icon: Flame,
    title: 'Active Competition Experience',
    desc: 'Battle-tested mechanics continuously refined against top-tier international competition.',
  },
];

export default function CoachSpotlight({ onBookClick }: CoachSpotlightProps) {
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.15 });

  return (
    <section
      id="coach"
      ref={ref}
      className="relative border-b border-border py-24 md:py-32 bg-bg overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <AmbientGlow
        size="lg"
        className="top-1/2 left-10 -translate-y-1/2 opacity-25"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          category="Head Coach & Founder"
          title="Meet Professor Nick Roberts"
          subtitle="Real technique. No shortcuts. A coach who leads from the front every single day."
          isVisible={isVisible}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait with Athletic Framing */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer border & subtle glow */}
              <div className="relative border-2 border-border/80 bg-surface p-2 shadow-2xl">
                {/* Accent Corner Brackets */}
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-accent" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-accent" />
                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-accent" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-accent" />

                {/* Portrait Image */}
                <div className="overflow-hidden bg-black aspect-[9/16] max-h-[580px] sm:max-h-[640px] relative">
                  <img
                    src="/coach-nick.jpg"
                    alt="Professor Nick Roberts — 3rd Degree Black Belt, Origin BJJ Head Coach"
                    className="w-full h-full object-cover object-top contrast-110 grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-[1.01] hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />

                  {/* Floating Badge on Portrait */}
                  <div className="absolute bottom-4 left-4 right-4 bg-bg/90 backdrop-blur-md border border-border p-3.5">
                    <p className="text-accent text-[11px] font-bold uppercase tracking-widest mb-0.5">
                      Origin Brazilian Jiu Jitsu
                    </p>
                    <p className="text-white text-base font-black uppercase tracking-wide">
                      Professor Nick Roberts
                    </p>
                    <p className="text-text-secondary text-xs">
                      3rd Degree Black Belt · Head Coach
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Lineage */}
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Rank Callout */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-raised border border-accent/40 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>3rd Degree Black Belt · 18+ Years Experience</span>
            </div>

            {/* Coach Quote */}
            <div className="relative pl-6 border-l-2 border-accent mb-8">
              <blockquote className="font-sans italic text-white text-lg md:text-xl leading-relaxed">
                "The mat is an honest mirror. No egos, no shortcuts—just consistent work,
                mutual respect, and clear, undeniable progression."
              </blockquote>
              <cite className="block mt-3 text-xs uppercase tracking-widest text-text-secondary font-bold not-italic">
                — Professor Nick Roberts
              </cite>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-text-secondary text-sm md:text-base leading-relaxed mb-8">
              <p>
                Nick founded Origin Brazilian Jiu Jitsu with a single governing principle:{' '}
                <strong className="text-white">
                  world-class grappling accessible to anyone willing to put in the honest work.
                </strong>{' '}
                Whether you are stepping into a gym for the first time in your life or preparing for an
                international podium, Nick’s coaching is built on patience, mechanics, and unwavering attention to detail.
              </p>
              <p>
                Under his leadership, Origin has fostered a culture where training partners protect one another,
                questions are encouraged, and progress is earned through structured understanding rather than sheer force.
              </p>
            </div>

            {/* Key Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {COACH_CREDENTIALS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 bg-surface border border-border/80 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon size={16} className="text-accent shrink-0" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onBookClick}
                className="bg-accent text-black font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-white transition-all duration-200 text-center shadow-[0_0_15px_rgba(232,197,71,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                Book a Free Class with Nick
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
                <CheckCircle2 size={14} className="text-accent" />
                <span>Zero experience needed · Loaner Gi provided</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

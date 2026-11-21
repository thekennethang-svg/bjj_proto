import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { useCountUp } from '../hooks/useCountUp';
import AmbientGlow from './AmbientGlow';
import SectionHeading from './SectionHeading';

function StatCounterItem({
  value,
  label,
  animate,
}: {
  value: string;
  label: string;
  animate: boolean;
}) {
  const isNumeric = value.includes('+');
  const targetNum = isNumeric ? parseInt(value.replace('+', ''), 10) : 0;
  const counted = useCountUp(targetNum, 1400, animate);

  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <p className="font-black text-accent text-4xl md:text-5xl tracking-tight leading-none">
        {isNumeric ? `${counted}+` : value}
      </p>
      <p className="mt-3 text-sm font-medium uppercase tracking-widest text-white">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.15 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-b border-border py-24 md:py-32 overflow-hidden"
    >
      {/* Soft Ambient Glow */}
      <AmbientGlow
        size="md"
        className="top-1/2 right-10 -translate-y-1/2 opacity-30"
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Text Story with Fade-and-Rise */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <SectionHeading
              category="The Academy"
              title="Built on the Mat"
              isVisible={isVisible}
            />
            <div className="space-y-5 text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                Origin Brazilian Jiu Jitsu was founded in 2025 with a simple goal: to
                provide honest, structured training for adults who want to improve on
                and off the mat. No egos, no hype — just consistent work and clear
                progression.
              </p>
              <p>
                Head coach Professor Nick Roberts is a 3rd degree black belt with 18
                years of teaching experience. His approach emphasises fundamentals,
                positional understanding, and a training environment where every
                student is given the time to develop.
              </p>
              <p>
                Whether you are walking in for your first class or preparing for a
                competition, the room is built to support your progress. Gi and No-Gi
                are both part of the curriculum, and all levels are welcome.
              </p>
              <p>
                We train with purpose and grow with discipline. That is the standard,
                and it applies to everyone who steps on the mat.
              </p>
            </div>
          </div>

          {/* Right: Layered Stat Block with Real Photo & Animated Numbers */}
          <div
            className={`lg:pl-8 transition-all duration-700 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative border-t-2 border-accent border-x border-b border-border bg-surface-raised p-8 md:p-10 h-full flex flex-col justify-between overflow-hidden hover-glow">
              {/* Subtle background photo texture inside the stat block */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80"
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover object-center grayscale contrast-150 opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/90 to-surface-raised/80" />
              </div>

              {/* Stat list */}
              <div className="relative z-10 divide-y divide-border">
                <StatCounterItem
                  value="18+"
                  label="Years Teaching"
                  animate={isVisible}
                />
                <StatCounterItem
                  value="400+"
                  label="Students Trained"
                  animate={isVisible}
                />
                <StatCounterItem
                  value="Weekly"
                  label="Gi & No-Gi Classes"
                  animate={isVisible}
                />
              </div>

              {/* Gym Meta footer */}
              <div className="relative z-10 mt-8 pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/90 font-semibold">
                    Hanley, Stoke On Trent
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-text-secondary">
                    Founded 2025
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold px-2.5 py-1 border border-accent/30 bg-accent/5">
                    Official Academy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

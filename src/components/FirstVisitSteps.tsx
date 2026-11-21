import { Shield, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import AmbientGlow from './AmbientGlow';
import SectionHeading from './SectionHeading';

interface FirstVisitStepsProps {
  onBookClick: () => void;
}

const STEPS = [
  {
    step: '01',
    title: 'Book Your Free Spot',
    description:
      'Choose any beginner-friendly Fundamentals or All-Levels class from our schedule. No credit card, no registration fee, and no contract required.',
    details: [
      'Takes 30 seconds online',
      'Choose any weekday or weekend slot',
      'Immediate instant confirmation',
    ],
  },
  {
    step: '02',
    title: 'Arrive & Suit Up',
    description:
      'Arrive 10 minutes before class. We provide a clean, sanitized loaner Gi (uniform) or rashguard free of charge. Coach Nick will show you around and introduce you.',
    details: [
      'Free loaner Gi provided',
      'Showers & changing rooms available',
      'Zero prep or fitness level required',
    ],
  },
  {
    step: '03',
    title: 'Safe, Structured Mat Time',
    description:
      'Step onto the mats and pair with an experienced senior student. You will practice controlled core movements and basic techniques. No forced sparring.',
    details: [
      'Paired with supportive teammates',
      'Paced strictly to your comfort',
      'Focus on defense and mechanics',
    ],
  },
];

export default function FirstVisitSteps({ onBookClick }: FirstVisitStepsProps) {
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.15 });

  return (
    <section
      id="first-visit"
      ref={ref}
      className="relative border-b border-border py-24 md:py-32 bg-bg overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <AmbientGlow
        size="lg"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          category="First Visit Guide"
          title="What to Expect on Day One"
          subtitle="We know stepping into a martial arts gym for the first time can be intimidating. Here is exactly what happens when you train with us."
          isVisible={isVisible}
          centered
        />

        {/* 3 Step Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {STEPS.map((item, index) => {
            return (
              <div
                key={item.step}
                className={`relative bg-surface-raised border border-border p-8 flex flex-col justify-between transition-all duration-700 ease-out hover:border-accent/40 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step Number Watermark Accent */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-mono text-accent">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary bg-surface px-2 py-0.5 border border-border">
                    Step {index + 1} of 3
                  </span>
                </div>

                <div className="flex-1 mb-6">
                  <h3 className="text-xl font-black uppercase tracking-wide text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <ul className="space-y-2.5">
                    {item.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-xs text-white/90"
                      >
                        <Check size={14} className="text-accent shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border/60">
                  <span className="text-[11px] uppercase tracking-wider text-accent font-semibold inline-flex items-center gap-1">
                    Beginner Approved <Check size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Callout Bar */}
        <div className="bg-surface border border-accent/30 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 border border-accent/30 text-accent shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wide text-base mb-1">
                Zero Ego & Safety First Guarantee
              </h4>
              <p className="text-sm text-text-secondary max-w-xl">
                You will not be asked to do anything you aren't comfortable with. Everyone on the mats
                was once a beginner on day one.
              </p>
            </div>
          </div>

          <button
            onClick={onBookClick}
            className="w-full md:w-auto bg-accent text-black font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-white transition-all duration-200 shrink-0 inline-flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(232,197,71,0.2)]"
          >
            <Sparkles size={16} />
            <span>Claim Your Free First Class</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

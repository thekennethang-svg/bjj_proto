import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import AmbientGlow from './AmbientGlow';
import SectionHeading from './SectionHeading';

interface PricingProps {
  onBookClick: () => void;
}

const MEMBERSHIP_BENEFITS = [
  'Unlimited classes (Gi and No-Gi)',
  'Access to all program levels based on experience',
  'Open mat sessions included',
  'No contracts — cancel anytime',
  'Gi uniform (kimono) available for purchase separately at the front desk',
];

export default function Pricing({ onBookClick }: PricingProps) {
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.1 });

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative border-b border-border py-24 md:py-32 overflow-hidden bg-bg"
    >
      {/* Atmospheric Glow behind Pricing Card */}
      <AmbientGlow
        size="lg"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          category="Membership"
          title="Simple, Honest Pricing"
          subtitle="One membership. Everything included. No hidden fees and no long-term contracts."
          isVisible={isVisible}
          centered
        />

        <div
          className={`max-w-md mx-auto transition-all duration-700 delay-150 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          {/* Card with top accent bar, raised surface, and subtle hover glow */}
          <div className="bg-surface-raised border-t-2 border-accent border-x border-b border-border/80 p-8 md:p-10 transition-all duration-300 hover-glow hover:border-accent/50 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-accent text-xs uppercase tracking-widest font-bold">
                Unlimited Membership
              </p>
              <span className="text-[10px] uppercase tracking-widest text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 font-medium">
                No Contract
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-black text-white text-5xl tracking-tight">
                £50
              </span>
              <span className="text-text-secondary text-sm">/month</span>
            </div>

            <div className="h-px bg-border my-6" />

            <ul className="space-y-4 mb-8">
              {MEMBERSHIP_BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm text-white/90 leading-relaxed"
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
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onBookClick}
              className="w-full bg-accent text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-none hover:bg-white transition-all duration-200 shadow-[0_0_15px_rgba(232,197,71,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              Book Your Free Class
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-text-secondary text-base leading-relaxed max-w-sm mx-auto">
              Not ready to commit? Your first class is completely free. No card
              required. Just show up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

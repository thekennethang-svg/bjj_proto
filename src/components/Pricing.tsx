interface PricingProps {
  onBookClick: () => void;
}

const MEMBERSHIP_BENEFITS = [
  'Unlimited classes (Gi and No-Gi)',
  'Access to all program levels based on experience',
  'Open mat sessions included',
  'No contracts — cancel anytime with 30 days notice',
  'Gi uniform (kimono) available for purchase separately at the front desk',
];

export default function Pricing({ onBookClick }: PricingProps) {
  return (
    <section id="pricing" className="border-b border-border py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">
            Membership
          </p>
          <h2 className="font-black uppercase tracking-widest text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
            Simple, Honest Pricing
          </h2>
          <p className="mt-5 text-text-secondary text-base md:text-lg max-w-xl mx-auto">
            One membership. Everything included. No hidden fees and no long-term
            contracts.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-surface border border-border p-8 md:p-10">
            <p className="text-accent text-xs uppercase tracking-widest font-bold mb-4">
              Membership
            </p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-black text-white text-5xl tracking-tight">$149</span>
              <span className="text-text-secondary text-sm">/month</span>
            </div>
            <div className="h-px bg-border my-6" />
            <ul className="space-y-4 mb-8">
              {MEMBERSHIP_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-white leading-relaxed">
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
              className="w-full bg-accent text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-none hover:bg-white transition-colors duration-200"
            >
              Book Your Free Class
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-sm mx-auto">
              Not ready to commit? Your first class is completely free. No card
              required. Just show up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

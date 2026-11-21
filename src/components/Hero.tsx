import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import AmbientGlow from './AmbientGlow';
import TrustSignals from './TrustSignals';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.1 });

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden border-b border-border bg-bg"
    >
      {/* 1. Hairline architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-hairline-grid opacity-75"
      />

      {/* 2. Low-opacity real photography background (WCAG AA compliant) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=80"
          alt=""
          loading="eager"
          className="w-full h-full object-cover object-center grayscale contrast-125 opacity-20"
        />
        {/* Dark protective overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/80" />
        <div className="absolute inset-0 bg-bg/40 backdrop-blur-[0.5px]" />
      </div>

      {/* 3. Faint atmospheric radial glows */}
      <AmbientGlow
        size="lg"
        className="top-1/4 -left-20 animate-pulse-subtle -translate-y-1/2"
      />
      <AmbientGlow
        size="md"
        className="bottom-1/3 right-0 opacity-40"
      />

      {/* 4. Typographic "BJJ" Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-black uppercase tracking-tight text-white opacity-[0.03] text-[34vw] leading-none whitespace-nowrap">
          BJJ
        </span>
      </div>

      {/* 5. Main Hero Content with fade-and-rise */}
      <div
        className={`relative max-w-6xl mx-auto px-6 lg:px-8 w-full pt-28 pb-24 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="text-accent text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
          <span className="w-2.5 h-0.5 bg-accent inline-block" />
          Origin Brazilian Jiu Jitsu
        </p>

        {/* Strengthened Headline */}
        <h1 className="font-black uppercase tracking-tight sm:tracking-widest text-white text-5xl sm:text-7xl md:text-8xl leading-[0.92] mb-8 max-w-5xl">
          Your First Class
          <br />
          Is Free.
        </h1>

        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-text-secondary font-normal leading-relaxed mb-10">
          Origin offers structured Brazilian Jiu-Jitsu training for adults at every
          level — from your first day on the mat to competition preparation. Based in
          Hanley, Stoke On Trent.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={onBookClick}
            className="bg-accent text-black font-bold uppercase tracking-widest text-sm md:text-base px-9 py-4 rounded-none hover:bg-white transition-all duration-200 shadow-[0_0_20px_rgba(232,197,71,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >
            Book Your Free Class
          </button>
        </div>

        {/* Trust Signals Strip */}
        <TrustSignals />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="flex flex-col items-center gap-2 text-text-secondary">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <svg
            width="14"
            height="22"
            viewBox="0 0 14 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="0.75" y="0.75" width="12.5" height="20.5" rx="0" />
            <line
              x1="7"
              y1="4"
              x2="7"
              y2="8"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

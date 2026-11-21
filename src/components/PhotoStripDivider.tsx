import { useIntersectionReveal } from '../hooks/useIntersectionReveal';

export default function PhotoStripDivider() {
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="relative w-full h-44 sm:h-52 md:h-60 overflow-hidden border-y border-border select-none"
    >
      {/* Background Photography with High Contrast & Desaturation */}
      <img
        src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=80"
        alt=""
        loading="lazy"
        className={`w-full h-full object-cover object-center grayscale contrast-125 transition-transform duration-1000 ease-out ${
          isVisible ? 'scale-100' : 'scale-105'
        }`}
      />

      {/* Dark Film Overlays */}
      <div className="absolute inset-0 bg-bg/85 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      {/* Subtle Athletic Watermark / Mottos */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <p className="text-center font-black uppercase tracking-[0.25em] text-white/40 text-xs sm:text-sm md:text-base max-w-xl">
          Purpose · Discipline · Progression
        </p>
      </div>
    </section>
  );
}

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden border-b border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-black uppercase tracking-tight text-white opacity-[0.03] text-[34vw] leading-none whitespace-nowrap">
          BJJ
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 w-full pt-24 pb-24">
        <p className="text-accent text-sm font-bold uppercase tracking-widest mb-6">
          Origin Brazilian Jiu Jitsu
        </p>
        <h1 className="font-black uppercase tracking-widest text-white text-5xl sm:text-6xl md:text-7xl leading-[0.95] mb-8 max-w-4xl">
          Your First Class
          <br />
          Is Free.
        </h1>
        <p className="max-w-2xl text-lg text-text-secondary font-normal leading-relaxed mb-10">
          Origin offers structured Brazilian Jiu-Jitsu training for adults at every
          level — from your first day on the mat to competition preparation. Based in
          Hanley, Stoke On Trent.
        </p>
        <button
          onClick={onBookClick}
          className="bg-accent text-black font-bold uppercase tracking-widest text-sm md:text-base px-8 py-4 rounded-none hover:bg-white transition-colors duration-200"
        >
          Book Your Free Class
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="flex flex-col items-center gap-2 text-text-secondary">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="0.75" y="0.75" width="12.5" height="20.5" rx="0" />
            <line x1="7" y1="4" x2="7" y2="8" strokeLinecap="round" className="animate-pulse" />
          </svg>
        </div>
      </div>
    </section>
  );
}

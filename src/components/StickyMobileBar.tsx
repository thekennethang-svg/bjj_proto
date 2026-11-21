import { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface StickyMobileBarProps {
  onBookClick: () => void;
  isBookingOpen: boolean;
}

export default function StickyMobileBar({
  onBookClick,
  isBookingOpen,
}: StickyMobileBarProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 400px (hero viewport)
      setScrolledPastHero(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not show on desktop, or before scrolling past hero, or when modal is open
  if (!scrolledPastHero || isBookingOpen) {
    return null;
  }

  return (
    <aside
      aria-label="Quick action navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-bg/95 backdrop-blur-md border-t border-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {/* Directions Action */}
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Origin+BJJ+Stoke-on-Trent"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 bg-surface border border-border text-white text-xs font-bold uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
          aria-label="Get directions to Origin BJJ in Google Maps"
        >
          <MapPin size={14} className="text-accent shrink-0" />
          <span>Directions</span>
        </a>

        {/* Primary Booking Action */}
        <button
          onClick={onBookClick}
          className="flex-[2] inline-flex items-center justify-center gap-2 py-3 px-4 bg-accent text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_12px_rgba(232,197,71,0.25)]"
        >
          <Calendar size={14} className="shrink-0" />
          <span>Book Free Class</span>
        </button>
      </div>
    </aside>
  );
}

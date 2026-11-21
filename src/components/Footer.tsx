interface FooterProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Coach', href: '#coach' },
  { label: 'Programs', href: '#programs' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer({ onBookClick }: FooterProps) {
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-bg py-16 md:py-20 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 items-start">
          {/* Brand Column (3 cols on desktop) */}
          <div className="lg:col-span-3">
            <p className="font-black uppercase tracking-widest text-white text-base mb-3">
              Origin Brazilian Jiu Jitsu
            </p>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Train with purpose. Grow with discipline.
            </p>
          </div>

          {/* Navigation Column (2 cols on desktop) */}
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit & Directions Column (3 cols on desktop) */}
          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
              Visit
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Origin BJJ Stoke-on-Trent
              <br />
              Hanley, Stoke-on-Trent
            </p>
            <div className="flex flex-col items-start gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Origin+BJJ+Stoke-on-Trent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors group"
                aria-label="Get directions to Origin BJJ in Google Maps (opens in a new tab)"
              >
                <span>Get Directions</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                    strokeLinecap="square"
                  />
                </svg>
              </a>
              <button
                onClick={onBookClick}
                className="text-white text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors"
              >
                Book Your Free Class →
              </button>
            </div>
          </div>

          {/* Interactive Google Map (4 cols on desktop, stacked on mobile) */}
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-widest text-accent font-bold">
                Location Map
              </p>
              <a
                href="https://www.google.com/maps/place/Origin+BJJ+Stoke-on-Trent/@53.0300125,-2.1741747,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-widest text-text-secondary hover:text-accent transition-colors"
                aria-label="Open Origin BJJ on full Google Maps page"
              >
                Expand Map ↗
              </a>
            </div>
            <div className="relative w-full h-[180px] sm:h-[200px] rounded-sm overflow-hidden border border-border/80 bg-surface-raised shadow-md group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2399.4631797317065!2d-2.1741747236135!3d53.03001249834557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a430035de81e9%3A0x26a96b6585af99b4!2sOrigin%20BJJ%20Stoke-on-Trent!5e0!3m2!1sen!2suk!4v1795271408255!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Origin BJJ Stoke-on-Trent Location Map"
                className="w-full h-full filter contrast-[1.05] grayscale-[0.25] hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-text-secondary">
            © 2025 Origin Brazilian Jiu Jitsu. Hanley, Stoke On Trent.
          </p>
          <p className="text-xs text-text-secondary">
            Founded 2025. Head coach Professor Nick Roberts, 3rd Degree Black Belt.
          </p>
        </div>
      </div>
    </footer>
  );
}

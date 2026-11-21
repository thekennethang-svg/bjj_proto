import { useEffect, useState } from 'react';

interface NavbarProps {
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

export default function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur-sm border-b border-border' : 'bg-bg'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center py-1 group focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          aria-label="Origin Brazilian Jiu Jitsu - Home"
        >
          <img
            src="/logo.png"
            alt="Origin Brazilian Jiu Jitsu"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-all duration-200 group-hover:opacity-90 group-hover:scale-[1.02]"
            loading="eager"
            decoding="async"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-sm font-medium tracking-wide text-text-secondary hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={onBookClick}
            className="bg-accent text-black font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-none hover:bg-white transition-colors duration-200"
          >
            Book a Free Class
          </button>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="square" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="square" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-bg">
          <ul className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block py-3 text-sm font-medium tracking-wide text-text-secondary hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onBookClick();
                }}
                className="w-full bg-accent text-black font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-none hover:bg-white transition-colors duration-200"
              >
                Book a Free Class
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

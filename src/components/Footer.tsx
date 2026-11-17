interface FooterProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
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
    <footer className="bg-bg py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-black uppercase tracking-widest text-white text-base mb-3">
              Origin Brazilian Jiu Jitsu
            </p>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Train with purpose. Grow with discipline.
            </p>
          </div>

          <div>
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

          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
              Visit
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Hanley, Stoke On Trent
            </p>
            <button
              onClick={onBookClick}
              className="mt-4 text-accent text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              Book Your Free Class →
            </button>
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

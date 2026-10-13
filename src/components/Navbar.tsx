import { useEffect, useState } from 'react';
import { Menu, X, Wine } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const links = [
  { href: '#inicio', es: 'Inicio', en: 'Home' },
  { href: '#nosotros', es: 'Nosotros', en: 'About' },
  { href: '#carta', es: 'Carta', en: 'Menu' },
  { href: '#galeria', es: 'Galería', en: 'Gallery' },
  { href: '#contacto', es: 'Contacto', en: 'Contact' },
];

export default function Navbar() {
  const { lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const reserveLabel = lang === 'es' ? 'Reservar Mesa' : 'Book a Table';
  const menuLabel = lang === 'es' ? 'Menú' : 'Menu';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-neutral-900/95 backdrop-blur-md py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 group">
          <Wine className="w-7 h-7 text-primary-400 group-hover:text-primary-300 transition-colors" />
          <span className="font-serif text-2xl font-semibold text-white tracking-wide hidden sm:inline">
            Mesón el Trocadero
          </span>
          <span className="font-serif text-2xl font-semibold text-white tracking-wide sm:hidden">
            El Trocadero
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-neutral-200 hover:text-primary-400 transition-colors relative group"
                >
                  {lang === 'es' ? l.es : l.en}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          <LanguageSwitcher dark />

          <a
            href="#contacto"
            className="inline-flex items-center px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/30"
          >
            {reserveLabel}
          </a>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher dark />
          <button
            className="text-white"
            onClick={() => setOpen(!open)}
            aria-label={menuLabel}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-neutral-900/98 backdrop-blur-md border-t border-neutral-700 animate-fade-in-down">
          <ul className="px-6 py-6 space-y-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg font-medium text-neutral-200 hover:text-primary-400 transition-colors"
                >
                  {lang === 'es' ? l.es : l.en}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="block text-center px-5 py-3 bg-primary-500 text-white text-sm font-medium rounded-full"
              >
                {reserveLabel}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

import { Wine, Instagram, MapPin, Phone } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';

export default function Footer() {
  const { lang } = useLang();

  const t = {
    es: {
      desc: 'Auténtica cocina tradicional española en el sur de Madrid. Un mesón donde la tradición y el sabor se encuentran.',
      linksTitle: 'Enlaces',
      contactTitle: 'Contacto',
      rights: 'Todos los derechos reservados.',
      madeIn: 'Página web diseñada por FR Web Designing',
      links: ['Inicio', 'Nosotros', 'Carta', 'Galería', 'Contacto'],
    },
    en: {
      desc: 'Authentic traditional Spanish cuisine in southern Madrid. A mesón where tradition and flavor meet.',
      linksTitle: 'Links',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
      madeIn: 'Made with love in Madrid',
      links: ['Home', 'About', 'Menu', 'Gallery', 'Contact'],
    },
  }[lang];

  const hrefs = ['#inicio', '#nosotros', '#carta', '#galeria', '#contacto'];

  return (
    <footer className="bg-neutral-950 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wine className="w-6 h-6 text-primary-400" />
              <span className="font-serif text-xl font-semibold text-white">Mesón el Trocadero</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              {t.desc}
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">{t.linksTitle}</h4>
            <ul className="space-y-2">
              {t.links.map((label, i) => (
                <li key={hrefs[i]}>
                  <a href={hrefs[i]} className="text-neutral-500 hover:text-primary-400 transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">{t.contactTitle}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-neutral-500 text-sm">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>C. de Fuente de Lima, 1, Latina, 28024 Madrid</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-500 text-sm">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="tel:+34618461855" className="hover:text-primary-400 transition-colors">+34 618 461 855</a>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a href="https://www.instagram.com/bar_el_trocadero" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary-500 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Mesón el Trocadero. {t.rights}
          </p>
          <p className="text-neutral-600 text-sm">
            {t.madeIn}
          </p>
        </div>
      </div>
    </footer>
  );
}

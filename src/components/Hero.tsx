import { ChevronDown, UtensilsCrossed, Wine } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';

export default function Hero() {
  const { lang } = useLang();

  const t = {
    es: {
      subtitle: 'Cocina Tradicional Española · Madrid',
      desc: 'Sabores auténticos de la cocina española en un ambiente cálido y acogedor. Tapas, paellas, carnes a la brasa y la mejor selección de vinos.',
      viewMenu: 'Ver la Carta',
      reserve: 'Reservar Mesa',
      seeMore: 'Ver más',
      alt: 'Interior del Mesón el Trocadero',
    },
    en: {
      subtitle: 'Traditional Spanish Cuisine · Madrid',
      desc: 'Authentic flavors of Spanish cuisine in a warm and cozy atmosphere. Tapas, paellas, grilled meats and the finest selection of wines.',
      viewMenu: 'View Menu',
      reserve: 'Book a Table',
      seeMore: 'See more',
      alt: 'Interior of Mesón el Trocadero',
    },
  }[lang];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/13012150/pexels-photo-13012150.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt={t.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="animate-fade-in-down">
          <p className="text-primary-300 font-sans text-sm uppercase tracking-[0.3em] mb-4 text-shadow">
            {t.subtitle}
          </p>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-white leading-tight mb-6 animate-fade-in-up text-shadow">
          Mesón el <span className="italic font-medium text-primary-300">Trocadero</span>
        </h1>

        <p className="text-neutral-100 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 animate-fade-in-up leading-relaxed text-shadow" style={{ animationDelay: '0.2s' }}>
          {t.desc}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="#carta"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/30"
          >
            <UtensilsCrossed className="w-5 h-5" />
            {t.viewMenu}
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium rounded-full border border-white/30 transition-all duration-300 hover:scale-105"
          >
            <Wine className="w-5 h-5" />
            {t.reserve}
          </a>
        </div>
      </div>

      <a
        href="#nosotros"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
        aria-label={t.seeMore}
      >
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
}

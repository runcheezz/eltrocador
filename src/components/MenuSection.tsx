import { useLang } from '@/i18n/LangContext';
import { useReveal } from '@/hooks/useReveal';

export default function MenuSection() {
  const { lang } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const t = {
    es: {
      label: 'Nuestra Propuesta',
      heading: 'La Carta',
      desc: 'Consulta nuestra carta completa y descubre nuestras raciones, pescados y platos para compartir.',
      imageAlt: 'Carta completa de El Trocadero',
      specialtiesLabel: 'Especialidades de la casa',
      specialties: 'Rabo de toro al vino tinto · Torreznos con revolcona',
    },
    en: {
      label: 'Our Proposal',
      heading: 'The Menu',
      desc: 'Browse our complete menu and discover our sharing plates, fish and generous dishes.',
      imageAlt: 'Complete El Trocadero menu',
      specialtiesLabel: 'House specialties',
      specialties: 'Oxtail in red wine sauce · Torreznos with revolcona potatoes',
    },
  }[lang];

  return (
    <section id="carta" className="bg-neutral-900 px-6 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <div ref={ref} className={`mb-12 text-center ${visible ? 'visible' : ''} reveal`}>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-primary-400">
            {t.label}
          </p>
          <h2 className="mb-4 font-serif text-4xl font-light text-white md:text-5xl">
            <span className="italic text-primary-400">{t.heading}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            {t.desc}
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-primary-500/30 bg-primary-500/10 px-6 py-5 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary-300">
            {t.specialtiesLabel}
          </p>
          <p className="font-serif text-xl text-white md:text-2xl">
            {t.specialties}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800 shadow-2xl shadow-black/30">
          <img
            src="/images/image.png"
            alt={t.imageAlt}
            className="block h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

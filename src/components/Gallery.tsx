import { useLang } from '@/i18n/LangContext';
import { useReveal } from '@/hooks/useReveal';

export default function Gallery() {
  const { lang } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const t = {
    es: {
      label: 'Un vistazo',
      heading: 'Galería',
      desc: 'Descubre algunos de nuestros platos y el ambiente que nos hace únicos.',
      alts: [
        'Selección de tapas variadas',
        'Paella de marisco',
        'Carne a la brasa con guarnición',
        'Copa de vino tinto',
        'Carnes a la brasa',
        'Paellas recién hechas',
      ],
    },
    en: {
      label: 'A glimpse',
      heading: 'Gallery',
      desc: 'Discover some of our dishes and the atmosphere that makes us unique.',
      alts: [
        'Assorted tapas selection',
        'Seafood paella',
        'Grilled meat with side dish',
        'Glass of red wine',
        'Charcoal grilled meats',
        'Freshly made paellas',
      ],
    },
  }[lang];

  const images = [
    { src: 'https://images.pexels.com/photos/14009278/pexels-photo-14009278.jpeg?auto=compress&cs=tinysrgb&w=800', span: 'md:col-span-2 md:row-span-2' },
    { src: 'https://images.pexels.com/photos/36878061/pexels-photo-36878061.jpeg?auto=compress&cs=tinysrgb&w=600', span: '' },
    { src: 'https://images.pexels.com/photos/27643017/pexels-photo-27643017.jpeg?auto=compress&cs=tinysrgb&w=600', span: '' },
    { src: 'https://images.pexels.com/photos/8473179/pexels-photo-8473179.jpeg?auto=compress&cs=tinysrgb&w=600', span: '' },
    { src: 'https://images.pexels.com/photos/3997609/pexels-photo-3997609.jpeg?auto=compress&cs=tinysrgb&w=600', span: '' },
    { src: 'https://images.pexels.com/photos/13207675/pexels-photo-13207675.jpeg?auto=compress&cs=tinysrgb&w=600', span: '' },
  ];

  return (
    <section id="galeria" className="py-24 md:py-32 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`text-center mb-14 ${visible ? 'visible' : ''} reveal`}>
          <p className="text-primary-600 text-sm uppercase tracking-[0.25em] font-medium mb-4">
            {t.label}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-neutral-900 mb-4">
            <span className="italic text-primary-600">{t.heading}</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={t.alts[i]}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/30 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Flame, Heart, Leaf } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { useReveal } from '@/hooks/useReveal';

export default function About() {
  const { lang } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const t = {
    es: {
      label: 'Nuestra Historia',
      heading: 'Tradición que se sabe ',
      headingAccent: 'en cada bocado',
      p1: 'En el corazón del sur de Madrid, Mesón el Trocadero es mucho más que un restaurante: es un encuentro con la auténtica cocina española. Desde nuestros inicios, hemos mantenido viva la esencia del mesón tradicional.',
      p2: 'Cada plato que sale de nuestra cocina cuenta una historia. Trabajamos con productos de proximidad, recetas heredadas de nuestras abuelas y el mimo de un equipo que ama lo que hace.',
      p3: 'Ven a disfrutar de una experiencia gastronómica en un ambiente cálido, donde te sentirás como en casa. Porque para nosotros, cada cliente es parte de la familia del Trocadero.',
      years: 'Años de tradición',
      alt: 'Platos de tapas en el Mesón el Trocadero',
      values: [
        { title: 'Cocina a la Brasa', text: 'Carnes y pescados preparados a la brasa con el auténtico sabor de la tradición española.' },
        { title: 'Ingredientes Frescos', text: 'Seleccionamos cada día los mejores productos de mercado para garantizarte la máxima calidad.' },
        { title: 'Recetas Caseras', text: 'Platos elaborados con recetas tradicionales transmitidas de generación en generación.' },
      ],
    },
    en: {
      label: 'Our Story',
      heading: 'Tradition you can taste ',
      headingAccent: 'in every bite',
      p1: 'In the heart of southern Madrid, Mesón el Trocadero is much more than a restaurant: it is an encounter with authentic Spanish cuisine. Since our beginnings, we have kept the essence of the traditional mesón alive.',
      p2: 'Every dish that leaves our kitchen tells a story. We work with locally sourced products, recipes inherited from our grandmothers, and the care of a team that loves what they do.',
      p3: 'Come and enjoy a gastronomic experience in a warm atmosphere, where you will feel right at home. Because for us, every customer is part of the Trocadero family.',
      years: 'Years of tradition',
      alt: 'Tapas dishes at Mesón el Trocadero',
      values: [
        { title: 'Charcoal Grilling', text: 'Meats and fish prepared over charcoal with the authentic flavor of Spanish tradition.' },
        { title: 'Fresh Ingredients', text: 'We select the best market products every day to guarantee the highest quality.' },
        { title: 'Homemade Recipes', text: 'Dishes made with traditional recipes passed down from generation to generation.' },
      ],
    },
  }[lang];

  const icons = [Flame, Leaf, Heart];

  return (
    <section id="nosotros" className="py-24 md:py-32 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`grid lg:grid-cols-2 gap-16 items-center ${visible ? 'visible' : ''} reveal`}>
          <div>
            <p className="text-primary-600 text-sm uppercase tracking-[0.25em] font-medium mb-4">
              {t.label}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-neutral-900 mb-6 leading-tight">
              {t.heading}<span className="italic text-primary-600">{t.headingAccent}</span>
            </h2>
            <div className="space-y-5 text-neutral-600 leading-relaxed text-lg">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-neutral-900/15">
              <img
                src="https://images.pexels.com/photos/14009279/pexels-photo-14009279.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt={t.alt}
                className="w-full h-[520px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white px-8 py-6 rounded-xl shadow-xl hidden md:block">
              <p className="font-serif text-4xl font-semibold">+15</p>
              <p className="text-sm uppercase tracking-wider text-primary-100">{t.years}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {t.values.map((v, i) => {
            const Icon = icons[i];
            return (
              <div
                key={v.title}
                className="text-center p-8 rounded-2xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-300 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary-500 mb-5 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-neutral-900 mb-3">{v.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{v.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

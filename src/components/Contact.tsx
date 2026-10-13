import { Clock, MapPin, Phone, Instagram } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { useReveal } from '@/hooks/useReveal';
import ReservationForm from '@/components/ReservationForm';

export default function Contact() {
  const { lang } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const t = {
    es: {
      label: 'Visítanos',
      heading: 'Contacto',
      headingSuffix: ' y Reservas',
      desc: 'Estaremos encantados de recibirte. Reserva tu mesa o ven a conocernos.',
      addressTitle: 'Dirección',
      addressLine1: 'C. de Fuente de Lima, 1, Latina, 28024 Madrid',
      addressLine2: '28026 Madrid, España',
      phoneTitle: 'Teléfono',
      hoursTitle: 'Horario',
      closed: 'Cerrado',
      mapTitle: 'Ubicación del Mesón el Trocadero',
      viewMaps: 'Ver en Google Maps',
      days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    },
    en: {
      label: 'Visit us',
      heading: 'Contact',
      headingSuffix: ' & Reservations',
      desc: 'We would be delighted to welcome you. Book your table or come and meet us.',
      addressTitle: 'Address',
      addressLine1: 'C. de Fuente de Lima, 1, Latina, 28024 Madrid',
      addressLine2: '28026 Madrid, Spain',
      phoneTitle: 'Phone',
      
      hoursTitle: 'Opening Hours',
      closed: 'Closed',
      mapTitle: 'Location of Mesón el Trocadero',
      viewMaps: 'View on Google Maps',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
  }[lang];

  const hours = [
    { time: t.closed },
    { time: '13:00 - 16:30 · 20:00 - 23:30' },
    { time: '13:00 - 16:30 · 20:00 - 23:30' },
    { time: '13:00 - 16:30 · 20:00 - 23:30' },
    { time: '13:00 - 16:30 · 20:00 - 00:00' },
    { time: '13:00 - 17:00 · 20:00 - 00:00' },
    { time: '13:00 - 17:00' },
  ];

  return (
    <section id="contacto" className="py-24 md:py-32 bg-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`text-center mb-14 ${visible ? 'visible' : ''} reveal`}>
          <p className="text-primary-400 text-sm uppercase tracking-[0.25em] font-medium mb-4">
            {t.label}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
            <span className="italic text-primary-400">{t.heading}</span>{t.headingSuffix}
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            {t.desc}
          </p>
        </div>

        <ReservationForm />

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-white mb-1">{t.addressTitle}</h3>
                <p className="text-neutral-400">{t.addressLine1}</p>
                <p className="text-neutral-400">{t.addressLine2}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-white mb-1">{t.phoneTitle}</h3>
                <a href="tel:+34618461855" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  +34 618 461 855
                </a>
                <p className="text-neutral-500 text-sm mt-1">{t.phoneNote}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700">
              <div className="flex items-center gap-3 mb-5">
                <Clock className="w-6 h-6 text-primary-400" />
                <h3 className="font-serif text-xl font-medium text-white">{t.hoursTitle}</h3>
              </div>
              <ul className="space-y-2.5">
                {hours.map((h, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="text-neutral-300">{t.days[i]}</span>
                    <span className={`text-right ${h.time === t.closed ? 'text-red-400' : 'text-neutral-400'}`}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/bar_el_trocadero"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 hover:bg-primary-500 text-neutral-400 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-full min-h-[400px] border border-neutral-700 bg-neutral-800">
              <iframe
                title={t.mapTitle}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-3.7350%2C40.3740%2C-3.7150%2C40.3940&layer=mapnik&marker=40.3840%2C-3.7250"
                className="w-full h-full min-h-[400px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/XbguJJHNRjH4zD3YA"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full transition-all duration-300 hover:scale-105"
            >
              {t.viewMaps}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

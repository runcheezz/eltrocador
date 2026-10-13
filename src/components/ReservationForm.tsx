import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { CalendarDays, CheckCircle2, Clock3, Users, Calendar as CalendarIcon } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { getBookedTimes, createReservation, reservationsConfigured } from '@/lib/reservations';
import { sendReservationEmails, emailConfigured } from '@/lib/email';

const timeSlots = [
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
];

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function formatDateDisplay(iso: string, lang: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export default function ReservationForm() {
  const { lang } = useLang();
  const [date, setDate] = useState(getToday);
  const [time, setTime] = useState('');
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const t = useMemo(() => ({
    es: {
      label: 'Reserva tu mesa',
      heading: 'Una mesa te espera',
      desc: 'Elige el día y la hora que prefieras. Cada horario admite una sola reserva.',
      date: 'Día', time: 'Hora', people: 'Personas', name: 'Nombre', email: 'Correo electrónico', phone: 'Teléfono',
      chooseTime: 'Selecciona una hora', reserve: 'Confirmar reserva', loading: 'Comprobando disponibilidad…',
      unavailable: 'No disponible', success: 'Hemos recibido tu solicitud. Te contactaremos para confirmar la reserva.',
      failure: 'No hemos podido completar la reserva. Prueba con otra hora o inténtalo de nuevo.',
      slotTaken: 'Esa hora ya ha sido reservada. Por favor, elige otra.',
      emailWarning: 'Tu reserva se ha registrado, pero no se pudo enviar el correo de confirmación.',
      notConfigured: 'El sistema de reservas aún no está configurado. Contacta con el restaurante.',
    },
    en: {
      label: 'Book your table',
      heading: 'A table awaits',
      desc: 'Choose your preferred day and time. Each time slot accepts one reservation only.',
      date: 'Date', time: 'Time', people: 'Guests', name: 'Name', email: 'Email address', phone: 'Phone',
      chooseTime: 'Select a time', reserve: 'Confirm reservation', loading: 'Checking availability…',
      unavailable: 'Unavailable', success: 'Your request has been received. We will contact you to confirm the booking.',
      failure: 'We could not complete the reservation. Try another time or try again.',
      slotTaken: 'That time slot has already been booked. Please choose another.',
      emailWarning: 'Your reservation was registered, but the confirmation email could not be sent.',
      notConfigured: 'The reservation system is not yet configured. Please contact the restaurant.',
    },
  }[lang]), [lang]);

  useEffect(() => {
    let active = true;
    setLoadingTimes(true);
    setError('');
    setTime('');

    if (!reservationsConfigured) {
      setError(t.notConfigured);
      setLoadingTimes(false);
      return () => {
        active = false;
      };
    }

    getBookedTimes(date)
      .then((booked) => {
        if (!active) return;
        setBookedTimes(booked);
        setLoadingTimes(false);
      })
      .catch(() => {
        if (!active) return;
        setBookedTimes([]);
        setLoadingTimes(false);
      });

    return () => {
      active = false;
    };
  }, [date, t.notConfigured]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    if (!reservationsConfigured) {
      setError(t.notConfigured);
      setSubmitting(false);
      return;
    }

    try {
      await createReservation({
        date,
        time,
        name,
        email,
        phone,
        partySize,
      });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : '';
      if (errMsg === 'slot_taken') {
        setError(t.slotTaken);
        setBookedTimes((current) => [...current, time]);
        setTime('');
      } else {
        setError(t.failure);
      }
      setSubmitting(false);
      return;
    }

    setMessage(t.success);
    setName('');
    setEmail('');
    setPhone('');
    setPartySize('2');
    setTime('');
    setBookedTimes((current) => [...current, time]);

    if (emailConfigured) {
      try {
        await sendReservationEmails({
          guest_name: name,
          guest_email: email,
          guest_phone: phone,
          party_size: partySize,
          reservation_date: date,
          reservation_time: time,
        });
      } catch {
        setError(t.emailWarning);
      }
    }

    setSubmitting(false);
  }

  const selectedDateLabel = formatDateDisplay(date, lang);
  const availableCount = timeSlots.filter((s) => !bookedTimes.includes(s)).length;

  return (
    <div className="mb-16 rounded-3xl border border-primary-500/30 bg-neutral-800/70 p-6 md:p-10">
      <div className="mb-8 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-primary-400">{t.label}</p>
        <h3 className="mb-3 font-serif text-3xl text-white md:text-4xl">{t.heading}</h3>
        <p className="text-neutral-400">{t.desc}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-5 md:grid-cols-3">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-neutral-300"><CalendarDays className="h-4 w-4 text-primary-400" />{t.date}</span>
            <input required type="date" min={getToday()} value={date} onChange={(event) => setDate(event.target.value)} className="booking-input" />
          </label>
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-neutral-300"><Clock3 className="h-4 w-4 text-primary-400" />{t.time}</span>
            <select required value={time} onChange={(event) => setTime(event.target.value)} disabled={loadingTimes} className="booking-input">
              <option value="">{loadingTimes ? t.loading : t.chooseTime}</option>
              {timeSlots.map((slot) => <option key={slot} value={slot} disabled={bookedTimes.includes(slot)}>{slot}{bookedTimes.includes(slot) ? ` — ${t.unavailable}` : ''}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-neutral-300"><Users className="h-4 w-4 text-primary-400" />{t.people}</span>
            <select required value={partySize} onChange={(event) => setPartySize(event.target.value)} className="booking-input">
              {Array.from({ length: 12 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>{number}</option>)}
            </select>
          </label>
        </div>

        {selectedDateLabel && reservationsConfigured && (
          <div className="flex items-center gap-2 rounded-xl bg-neutral-900/60 px-4 py-3 text-sm text-neutral-400">
            <CalendarIcon className="h-4 w-4 text-primary-400" />
            <span className="capitalize">{selectedDateLabel}</span>
            <span className="ml-auto text-neutral-500">
              {availableCount} {lang === 'es' ? 'horas disponibles' : 'slots available'}
            </span>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-3">
          <input required value={name} onChange={(event) => setName(event.target.value)} placeholder={t.name} className="booking-input" />
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t.email} className="booking-input" />
          <input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder={t.phone} className="booking-input" />
        </div>

        <button type="submit" disabled={submitting || !time} className="rounded-full bg-primary-500 px-7 py-3 font-medium text-white transition-all hover:scale-[1.02] hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50">
          {submitting ? t.loading : t.reserve}
        </button>
        {message && <p className="flex items-center gap-2 text-sm text-accent-300"><CheckCircle2 className="h-4 w-4" />{message}</p>}
        {error && <p className="text-sm text-red-300">{error}</p>}
      </form>
    </div>
  );
}

import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_BUSINESS = import.meta.env.VITE_EMAILJS_TEMPLATE_BUSINESS;
const TEMPLATE_CUSTOMER = import.meta.env.VITE_EMAILJS_TEMPLATE_CUSTOMER;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const isConfigured = Boolean(SERVICE_ID && TEMPLATE_BUSINESS && TEMPLATE_CUSTOMER && PUBLIC_KEY);

if (isConfigured) {
  emailjs.init({ publicKey: PUBLIC_KEY });
}

export interface ReservationEmailData {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  party_size: string;
  reservation_date: string;
  reservation_time: string;
  [key: string]: string;
}

export async function sendReservationEmails(data: ReservationEmailData): Promise<void> {
  if (!isConfigured) {
    throw new Error('email-not-configured');
  }

  await Promise.all([
    emailjs.send(SERVICE_ID!, TEMPLATE_BUSINESS!, data),
    emailjs.send(SERVICE_ID!, TEMPLATE_CUSTOMER!, {
      ...data,
      to_email: data.guest_email,
    }),
  ]);
}

export { isConfigured as emailConfigured };

const API_URL = '/api/reservations';

export const reservationsConfigured = true;

interface BookedTimesResponse {
  bookedTimes: string[];
}

interface CreateReservationResponse {
  success: boolean;
  error?: string;
}

export interface ReservationData {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  partySize: string;
}

export async function getBookedTimes(date: string): Promise<string[]> {
  const res = await fetch(`${API_URL}?date=${encodeURIComponent(date)}`);
  if (!res.ok) throw new Error('fetch-failed');

  const data: BookedTimesResponse = await res.json();
  return data.bookedTimes ?? [];
}

export async function createReservation(data: ReservationData): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, partySize: Number(data.partySize) }),
  });

  const result: CreateReservationResponse = await res.json().catch(() => ({ success: false }));
  if (!res.ok || !result.success) {
    throw new Error(result.error ?? 'create-failed');
  }
}

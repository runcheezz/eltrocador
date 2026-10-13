import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { reservations } from "../../db/schema.js";

const TIME_SLOTS = [
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30",
];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isUniqueViolation(err: unknown): boolean {
  let current: unknown = err;
  while (current && typeof current === "object") {
    if ((current as { code?: string }).code === "23505") return true;
    current = (current as { cause?: unknown }).cause;
  }
  return false;
}

export default async (req: Request) => {
  if (req.method === "GET") {
    const date = new URL(req.url).searchParams.get("date") ?? "";
    if (!DATE_RE.test(date)) {
      return Response.json({ error: "invalid_date" }, { status: 400 });
    }
    const rows = await db
      .select({ time: reservations.time })
      .from(reservations)
      .where(eq(reservations.date, date));
    return Response.json({ bookedTimes: rows.map((r) => r.time) });
  }

  if (req.method === "POST") {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return Response.json({ success: false, error: "invalid_body" }, { status: 400 });
    }

    const date = String(body.date ?? "");
    const time = String(body.time ?? "");
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const partySize = Number(body.partySize);

    const today = new Date().toISOString().split("T")[0];
    if (
      !DATE_RE.test(date) || date < today ||
      !TIME_SLOTS.includes(time) ||
      !name || !email || !phone ||
      !Number.isInteger(partySize) || partySize < 1 || partySize > 12
    ) {
      return Response.json({ success: false, error: "invalid_data" }, { status: 400 });
    }

    try {
      await db.insert(reservations).values({ date, time, name, email, phone, partySize });
    } catch (err) {
      if (isUniqueViolation(err)) {
        return Response.json({ success: false, error: "slot_taken" }, { status: 409 });
      }
      throw err;
    }

    return Response.json({ success: true }, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/reservations",
};

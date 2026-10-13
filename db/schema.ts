import { pgTable, serial, text, integer, timestamp, date, uniqueIndex } from "drizzle-orm/pg-core";

export const reservations = pgTable(
  "reservations",
  {
    id: serial().primaryKey(),
    date: date().notNull(),
    time: text().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    phone: text().notNull(),
    partySize: integer("party_size").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  // Una sola reserva por franja horaria: la base de datos rechaza duplicados
  (table) => [uniqueIndex("reservations_date_time_unique").on(table.date, table.time)],
);

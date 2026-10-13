CREATE TABLE "reservations" (
	"id" serial PRIMARY KEY,
	"date" date NOT NULL,
	"time" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"party_size" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "reservations_date_time_unique" ON "reservations" ("date","time");
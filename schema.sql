-- D1 schema, applied idempotently by src/index.js#ensureSchema on each
-- request. Kept here as reference / for running manually via the D1
-- console if needed.

CREATE TABLE IF NOT EXISTS rsvps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  submitted_at TEXT NOT NULL,
  code TEXT NOT NULL,
  household TEXT,
  email TEXT,
  songs TEXT,
  message TEXT
);

CREATE TABLE IF NOT EXISTS rsvp_guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rsvp_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  attending TEXT NOT NULL,
  starter TEXT,
  "main" TEXT,
  pudding TEXT,
  dietary TEXT,
  FOREIGN KEY (rsvp_id) REFERENCES rsvps(id)
);

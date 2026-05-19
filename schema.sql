-- D1 schema, applied idempotently by src/index.js#ensureSchema on each
-- request that touches the DB. Kept here as reference / for running
-- manually via the D1 console if needed.

-- One row per submitted RSVP (one per household).
CREATE TABLE IF NOT EXISTS rsvps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  submitted_at TEXT NOT NULL,
  code TEXT NOT NULL,
  household TEXT,
  email TEXT,
  songs TEXT,
  message TEXT
);

-- One row per named guest within an RSVP — attending flag + meal choices.
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

-- The invitation codes themselves: one row per code, household name + the
-- pre-filled list of guest names (stored as a JSON array). Source of truth
-- for the gate's POST /api/lookup endpoint and the admin Codes tab.
CREATE TABLE IF NOT EXISTS guest_codes (
  code TEXT PRIMARY KEY,
  household TEXT NOT NULL,
  guests TEXT NOT NULL,    -- JSON array, e.g. '["Leigh Nile","Philip Nile"]'
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

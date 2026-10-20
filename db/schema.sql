-- D1 schema for the Must-be features F1 to F4. Matches the D1 Schema section of context/ARCHITECTURE.md.
-- D1 enforces foreign keys by default.

DROP TABLE IF EXISTS moments;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS accounts;

-- F1: usernames and emails are unique regardless of capitalization (F1-2).
CREATE TABLE accounts (
  id            INTEGER PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE COLLATE NOCASE,
  username      TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- F1-1 signs a person in after sign-up, so logins need somewhere to live.
-- Only a hash of the session token is stored; the token itself stays in the browser cookie.
CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL
);

-- F2-1 and F2-3: one reusable invite link per trip, stored only as a hash.
CREATE TABLE trips (
  id                INTEGER PRIMARY KEY,
  name              TEXT NOT NULL CHECK (length(trim(name)) > 0),
  creator_id        INTEGER NOT NULL REFERENCES accounts(id),
  invite_token_hash TEXT NOT NULL UNIQUE,
  created_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

-- The composite key prevents joining the same trip twice.
CREATE TABLE members (
  trip_id    INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  joined_at  TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (trip_id, account_id)
);

-- F3: only a member can add to a trip, and a moment needs at least one of photo, note, or place (F3-3).
CREATE TABLE moments (
  id             INTEGER PRIMARY KEY,
  trip_id        INTEGER NOT NULL,
  author_id      INTEGER NOT NULL,
  photo_data_url TEXT,
  note           TEXT,
  place          TEXT,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (trip_id, author_id) REFERENCES members(trip_id, account_id) ON DELETE CASCADE,
  CHECK (
    length(trim(coalesce(photo_data_url, ''))) > 0
    OR length(trim(coalesce(note, ''))) > 0
    OR length(trim(coalesce(place, ''))) > 0
  )
);

-- F4-1 lists a trip's moments in added order.
CREATE INDEX moments_by_trip ON moments (trip_id, created_at, id);

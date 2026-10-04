CREATE TABLE IF NOT EXISTS discovery_runs (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  data TEXT NOT NULL
);
INSERT OR IGNORE INTO schema_migrations VALUES(2,datetime('now'));

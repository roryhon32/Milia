PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY, company TEXT NOT NULL, stage TEXT NOT NULL, score INTEGER NOT NULL DEFAULT 0 CHECK(score BETWEEN 0 AND 100),
  priority TEXT NOT NULL DEFAULT 'LOW', created_at TEXT NOT NULL, updated_at TEXT NOT NULL, next_action_at TEXT,
  last_contact_at TEXT, attempts INTEGER NOT NULL DEFAULT 0, data TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS interactions (
  id TEXT PRIMARY KEY, lead_id TEXT NOT NULL REFERENCES leads(id), kind TEXT NOT NULL, created_at TEXT NOT NULL, data TEXT NOT NULL
);
CREATE TRIGGER IF NOT EXISTS interactions_no_update BEFORE UPDATE ON interactions BEGIN SELECT RAISE(ABORT,'immutable_history'); END;
CREATE TRIGGER IF NOT EXISTS interactions_no_delete BEFORE DELETE ON interactions BEGIN SELECT RAISE(ABORT,'immutable_history'); END;
CREATE TABLE IF NOT EXISTS audit_events (id TEXT PRIMARY KEY, lead_id TEXT, event TEXT NOT NULL, created_at TEXT NOT NULL, data TEXT NOT NULL);
CREATE TRIGGER IF NOT EXISTS audit_no_update BEFORE UPDATE ON audit_events BEGIN SELECT RAISE(ABORT,'immutable_audit'); END;
CREATE TRIGGER IF NOT EXISTS audit_no_delete BEFORE DELETE ON audit_events BEGIN SELECT RAISE(ABORT,'immutable_audit'); END;
CREATE TABLE IF NOT EXISTS queue_state (id INTEGER PRIMARY KEY CHECK(id=1), released_at TEXT, lead_id TEXT);
INSERT OR IGNORE INTO queue_state(id) VALUES(1);
CREATE TABLE IF NOT EXISTS chat_sessions (id TEXT PRIMARY KEY, lead_id TEXT NOT NULL REFERENCES leads(id), expires_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, reset_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);
INSERT OR IGNORE INTO schema_migrations VALUES(1,datetime('now'));

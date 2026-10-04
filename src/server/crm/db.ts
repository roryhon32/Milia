import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import initSqlJs, { type Database, type SqlValue } from "sql.js";

type Store = { db: Database; file: string };
const globalStore = globalThis as typeof globalThis & {
  miliaDb?: Promise<Store>;
};
export async function database(): Promise<Store> {
  if (!globalStore.miliaDb)
    globalStore.miliaDb = (async () => {
      const url = process.env.DATABASE_URL || "file:./data/milia.sqlite";
      if (!url.startsWith("file:"))
        throw new Error("Este adaptador requer DATABASE_URL=file:...");
      const file = path.resolve(
        /* turbopackIgnore: true */ process.cwd(),
        url.slice(5),
      );
      fs.mkdirSync(path.dirname(file), { recursive: true });
      const wasmBinary = Uint8Array.from(
        fs.readFileSync(
          path.join(process.cwd(), "node_modules/sql.js/dist/sql-wasm.wasm"),
        ),
      ).buffer;
      const SQL = await initSqlJs({ wasmBinary });
      const db = fs.existsSync(file)
        ? new SQL.Database(fs.readFileSync(file))
        : new SQL.Database();
      db.run(
        fs.readFileSync(
          path.join(process.cwd(), "migrations/001_crm.sql"),
          "utf8",
        ),
      );
      const store = { db, file };
      db.run(fs.readFileSync(path.join(process.cwd(), "migrations/002_discovery.sql"), "utf8"));
      persist(store);
      return store;
    })();
  return globalStore.miliaDb;
}
function persist(store: Store) {
  const temp = `${store.file}.tmp`;
  fs.writeFileSync(temp, store.db.export(), { mode: 0o600 });
  fs.renameSync(temp, store.file);
}
export function query<T extends Record<string, unknown>>(
  db: Database,
  sql: string,
  args: SqlValue[] = [],
): T[] {
  const statement = db.prepare(sql);
  try {
    statement.bind(args);
    const rows: T[] = [];
    while (statement.step()) rows.push(statement.getAsObject() as T);
    return rows;
  } finally {
    statement.free();
  }
}
export async function write<T>(fn: (db: Database) => T): Promise<T> {
  const store = await database();
  store.db.run("BEGIN IMMEDIATE");
  try {
    const result = fn(store.db);
    store.db.run("COMMIT");
    persist(store);
    return result;
  } catch (e) {
    try {
      store.db.run("ROLLBACK");
    } catch {}
    throw e;
  }
}
export function audit(
  db: Database,
  event: string,
  leadId: string | null = null,
  data: Record<string, unknown> = {},
) {
  db.run("INSERT INTO audit_events VALUES(?,?,?,?,?)", [
    randomUUID(),
    leadId,
    event,
    new Date().toISOString(),
    JSON.stringify(data),
  ]);
}
export function interaction(
  db: Database,
  leadId: string,
  kind: string,
  data: Record<string, unknown>,
) {
  db.run("INSERT INTO interactions VALUES(?,?,?,?,?)", [
    randomUUID(),
    leadId,
    kind,
    new Date().toISOString(),
    JSON.stringify(data),
  ]);
  audit(db, kind, leadId);
}

export async function resetTestDatabase() {
  if (process.env.NODE_ENV !== "test") throw new Error("Somente testes");
  if (globalStore.miliaDb) (await globalStore.miliaDb).db.close();
  delete globalStore.miliaDb;
}

import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = mkdtempSync(path.join(os.tmpdir(), "milia-crm-tests-"));
try {
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", "--test", "tests/crm.test.ts"],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: "test",
        DATABASE_URL: `file:${path.join(dir, "test.sqlite")}`,
        CRM_ADMIN_PASSWORD: "test-password-only-1234",
        CRM_SESSION_SECRET:
          "test-session-secret-for-isolated-tests-only-123456",
        APP_ORIGIN: "http://localhost:3000",
        OPENAI_API_KEY: "",
      },
    },
  );
  process.exitCode = result.status || 0;
} finally {
  rmSync(dir, { recursive: true, force: true });
}

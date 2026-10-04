import { cpSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
for (const [folder, output, target] of [['Arquiteture','out','lumiere'], ['Solar','dist','solar']]) {
  const cwd = path.join(root,'portfolio',folder);
  const result = spawnSync(process.execPath,[process.env.npm_execpath,'run','build'],{cwd,stdio:'inherit'});
  if (result.status !== 0) process.exit(result.status ?? 1);
  const destination = path.join(root,'public','portfolio',target);
  mkdirSync(destination,{recursive:true});
  cpSync(path.join(cwd,output),destination,{recursive:true});
}

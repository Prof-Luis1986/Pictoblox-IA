import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, 'src/data/sourceManifest.json'), 'utf8'));
const auditManifest = JSON.parse(readFileSync(join(root, 'internal/sb3-audit-manifest.json'), 'utf8'));
for (const activity of manifest.activities.filter(a => a.internalSb3)) {
  const outer = join(root, activity.tomo === 2 ? 'Actividades de Laboratorio 2.zip' : 'Actividades de Laboratorio (1).zip');
  const extracted = join(mkdtempSync(join(tmpdir(), 'pictoblox-sb3-')), 'project.sb3');
  const member = spawnSync('unzip', ['-p', outer, activity.internalSb3], { encoding: null, maxBuffer: 50 * 1024 * 1024 });
  assert.equal(member.status, 0, `Cannot extract ${activity.internalSb3}`);
  await writeFile(extracted, member.stdout);
  const project = spawnSync('unzip', ['-p', extracted, 'project.json'], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  assert.equal(project.status, 0, `project.json missing: ${activity.internalSb3}`);
  const parsed = JSON.parse(project.stdout);
  assert.ok(Array.isArray(parsed.targets), `Invalid project.json: ${activity.internalSb3}`);
  const blockCount = parsed.targets.reduce((total, target) => total + Object.keys(target.blocks || {}).length, 0);
  assert.equal(auditManifest[activity.id].blockCount, blockCount, `Stale SB3 audit: ${activity.id}`);
}
console.log('All internal .sb3 references contain readable project.json files.');

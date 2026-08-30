import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, 'src/data/sourceManifest.json'), 'utf8'));
const bookTranscriptions = JSON.parse(readFileSync(join(root, 'src/data/bookTranscriptions.json'), 'utf8'));
const activityTranscriptions = JSON.parse(readFileSync(join(root, 'src/data/sourceTranscriptions.json'), 'utf8'));
const embeddedVisuals = JSON.parse(readFileSync(join(root, 'src/data/pdfEmbeddedVisuals.json'), 'utf8'));
const walk = dir => existsSync(dir) ? readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]) : [];
const publicFiles = walk(join(root, 'public'));

assert.equal(manifest.sources.find(s => s.file.includes('Aprende IA'))?.pages, 109);
assert.equal(manifest.sources.find(s => s.file.includes('Casas Inteligentes'))?.pages, 87);
assert.deepEqual(manifest.activities.filter(a => a.tomo === 1 && !a.id.includes('extra')).map(a => a.number), [1, 2, 3, 4, 5, 6]);
assert.deepEqual(manifest.activities.filter(a => a.tomo === 2).map(a => a.number), [1, 2, 5, 6, 7, 8]);
assert.equal(manifest.activities.length, 13);
for (const source of manifest.sources) {
  const digest = createHash('sha256').update(readFileSync(join(root, source.file))).digest('hex');
  assert.equal(digest, source.sha256, `Source file changed: ${source.file}`);
}
assert.equal(bookTranscriptions['aprende-ia-jugando'].pages.length, 109, 'Tomo 1 transcription is incomplete');
assert.equal(bookTranscriptions['ia-casas-inteligentes'].pages.length, 87, 'Tomo 2 transcription is incomplete');
for (const book of Object.values(bookTranscriptions)) {
  book.pages.forEach((page, index) => {
    assert.equal(page.sourcePage, index + 1, `Non-sequential transcription page in ${book.sourceFile}`);
    assert.ok(page.text.length > 0 || page.imageOnly === true, `Unclassified empty transcription: ${book.sourceFile}, page ${page.sourcePage}`);
    const capture = join(root, 'internal/source-page-captures', page.image.replace(/^\/resources\/pdf-captures\//, ''));
    assert.ok(existsSync(capture) && statSync(capture).size > 0, `Missing source image: ${page.image}`);
  });
}
for (const [key, pageVisuals] of Object.entries(embeddedVisuals)) {
  const [, sourcePage] = key.split(':');
  for (const visual of pageVisuals) {
    assert.equal(String(visual.sourcePage), sourcePage, `Visual provenance mismatch: ${visual.path}`);
    const visualPath = join(root, 'internal/all-pdf-embedded-visuals', visual.path.replace(/^\/resources\/pdf-block-crops\//, ''));
    assert.ok(existsSync(visualPath) && statSync(visualPath).size > 0, `Missing embedded visual: ${visual.path}`);
  }
}
for (const activity of manifest.activities) {
  assert.ok(activity.title && activity.sourceFile && Array.isArray(activity.sections), `Manifest incomplete: ${activity.id}`);
  if (activity.startPage) assert.ok(activity.endPage >= activity.startPage, `Invalid page range: ${activity.id}`);
  if (activity.startPage) {
    const transcription = activityTranscriptions[activity.id];
    assert.ok(transcription, `Missing activity transcription: ${activity.id}`);
    assert.deepEqual(transcription.pages.map(page => page.sourcePage), Array.from({ length: activity.endPage - activity.startPage + 1 }, (_, i) => activity.startPage + i), `Activity page coverage mismatch: ${activity.id}`);
  }
}

assert.equal(publicFiles.filter(f => f.endsWith('.sb3')).length, 0, 'No .sb3 may exist below public/');
assert.equal(publicFiles.filter(f => f.split('/').some(p => p.startsWith('._')) || f.includes('/__MACOSX/')).length, 0, 'macOS metadata leaked into public/');
for (const [tome, pages] of [['tomo1', 109], ['tomo2', 87]]) {
  for (let page = 1; page <= pages; page++) {
    const capture = join(root, 'internal/source-page-captures', tome, `page-${String(page).padStart(3, '0')}.webp`);
    assert.ok(existsSync(capture) && statSync(capture).size > 0, `Missing capture: ${tome} page ${page}`);
  }
}
for (const source of ['src/data/practicesDataTomo1.ts', 'src/data/practicesDataTomo2.ts', 'src/data/additionalResourcePractices.ts']) {
  const text = readFileSync(join(root, source), 'utf8');
  for (const url of text.matchAll(/fileUrl:\s*'([^']+)'/g)) {
    const path = join(root, 'public', decodeURIComponent(url[1]).replace(/^\//, ''));
    assert.ok(existsSync(path) && statSync(path).size > 0, `Broken public resource: ${url[1]}`);
  }
}
const sourceCode = walk(join(root, 'src')).map(f => readFileSync(f, 'utf8')).join('\n');
assert.ok(!sourceCode.includes('/resources/sb3/'), 'Student bundle references a public sb3 URL');
assert.ok(!readFileSync(join(root, 'src/data/allPractices.ts'), 'utf8').includes('inferBlockSnippets'), 'Block inference must remain disabled');
assert.ok(!readFileSync(join(root, 'src/data/allPractices.ts'), 'utf8').includes('sb3ProjectVisuals'), 'Manual SB3 block reconstructions must not reach the student bundle');
const studentContent = readFileSync(join(root, 'src/data/studentActivityContent.json'), 'utf8');
assert.ok(!/Roboticoss|roboticoss\.com|\.pdf/i.test(studentContent), 'Student activity content exposes source provenance');
for (const source of manifest.sources.filter(s => s.type === 'zip')) {
  assert.equal(spawnSync('unzip', ['-tqq', join(root, source.file)]).status, 0, `Invalid ZIP: ${source.file}`);
}
if (existsSync(join(root, 'dist'))) assert.equal(walk(join(root, 'dist')).filter(f => f.endsWith('.sb3')).length, 0, 'A .sb3 was included in dist/');
if (existsSync(join(root, 'dist'))) {
  const bundledText = walk(join(root, 'dist')).filter(f => /\.(?:html|js|css|json)$/.test(f)).map(f => readFileSync(f, 'utf8')).join('\n');
  assert.ok(!/Roboticoss|roboticoss\.com|Inteligencia Artificial Educativa[^\n]*\.pdf/i.test(bundledText), 'Student bundle exposes publisher or source-file provenance');
  assert.ok(!/\bVer Video\b|Apoyo en video|video de apoyo|Nombre del Laboratorio/i.test(bundledText), 'Student bundle exposes omitted repetitive or video-support content');
}
console.log('Source audit passed: 12 PDF activities + 1 archive-only activity; public resources protected.');

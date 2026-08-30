import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = process.cwd();
const service = readFileSync(`${root}/src/services/appscript.ts`, 'utf8');
const server = readFileSync(`${root}/google-apps-script/Code.gs`, 'utf8');
const modal = readFileSync(`${root}/src/components/SubmitPracticeModal.tsx`, 'utf8');
const types = readFileSync(`${root}/src/types/index.ts`, 'utf8');

assert.ok(service.includes("EVIDENCE_DRIVE_FOLDER_ID = '18RU-WTqq8D67cuAdCVFC4ahQbQ7CSAkL'"), 'Evidence Drive folder differs from the authorized folder');
assert.ok(server.includes('DriveApp.getFolderById(EVIDENCE_FOLDER_ID)'), 'Apps Script does not save evidence to Drive');
assert.ok(server.includes('folder.createFile(Utilities.newBlob'), 'Apps Script does not create image files');
assert.ok(server.includes('delete data.evidenceAttachments'), 'Raw Base64 evidence remains in report data');
assert.ok(server.includes('saveTeacherReport(data, grade, evidenceLinks)'), 'Teacher report does not receive Drive links');
assert.ok(modal.includes('accept="image/png,image/jpeg,image/webp"'), 'File picker accepts unsupported or unspecified formats');
assert.ok(modal.includes('selected.length > 3') && modal.includes('4 * 1024 * 1024'), 'Client limits are missing');
assert.ok(modal.includes('evidenceAttachments: undefined'), 'Raw images can remain in the session receipt');
assert.ok(!modal.includes('sessionStorage.setItem') && !modal.includes('localStorage.setItem') && !modal.includes("writeSessionValue('evidence"), 'Evidence is persisted in browser storage');
assert.ok(types.includes('interface EvidenceAttachment'), 'Evidence payload type is missing');

console.log('Evidence audit passed: optional images are memory-only, validated, uploaded to the authorized Drive folder, and linked in the teacher report.');

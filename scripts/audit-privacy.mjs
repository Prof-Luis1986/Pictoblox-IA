import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const root = process.cwd();
const openQuestions = readFileSync(`${root}/src/components/OpenQuestionsSection.tsx`, 'utf8');
const submitModal = readFileSync(`${root}/src/components/SubmitPracticeModal.tsx`, 'utf8');
const app = readFileSync(`${root}/src/App.tsx`, 'utf8');
const firebase = readFileSync(`${root}/src/services/firebase.ts`, 'utf8');
for (const [name, code] of [['OpenQuestionsSection', openQuestions], ['SubmitPracticeModal', submitModal], ['App', app], ['firebase', firebase]]) {
  assert.ok(!code.includes('localStorage'), `${name} must not use localStorage for academic data`);
}
assert.ok(!readFileSync(`${root}/src/services/appscript.ts`, 'utf8').includes('percentageToPrivateGrade'), 'Private grading exists in the client');
assert.ok(app.includes('clearAcademicSession()'), 'Session-clear button is not connected to academic cleanup');
assert.ok(app.includes("window.location.hash = '#/'"), 'Cleanup must return to the home page');
assert.ok(readFileSync(`${root}/src/components/Header.tsx`, 'utf8').includes('Terminar y borrar sesión'), 'Required visible session cleanup label is missing');
assert.ok(readFileSync(`${root}/src/components/Footer.tsx`, 'utf8').includes('Tu trabajo se conserva solamente durante esta sesión.'), 'Student session explanation is missing');

class MemoryStorage {
  data = new Map();
  get length() { return this.data.size; }
  key(index) { return [...this.data.keys()][index] ?? null; }
  getItem(key) { return this.data.has(key) ? this.data.get(key) : null; }
  setItem(key, value) { this.data.set(key, String(value)); }
  removeItem(key) { this.data.delete(key); }
}
globalThis.window = { sessionStorage: new MemoryStorage() };
globalThis.crypto ??= { randomUUID: () => 'test-id' };
const source = readFileSync(`${root}/src/services/sessionStorage.ts`, 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const session = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

session.writeSessionValue('open_questions:test', { answer: 'private' });
session.saveSessionIdentity('Alumno', '5A');
session.saveSessionProgress({ studentId: 'student-test', studentName: 'Alumno', studentGroup: '5A', completedPractices: { test: { completed: true } }, badgesEarned: [] });
window.sessionStorage.setItem('non_academic_preference', 'keep');
session.clearAcademicSession();
assert.equal([...window.sessionStorage.data.keys()].filter(key => key.startsWith(session.ACADEMIC_SESSION_PREFIX)).length, 0, 'Academic data survived cleanup');
assert.equal(window.sessionStorage.getItem('non_academic_preference'), 'keep', 'Cleanup removed a non-academic preference');

window.sessionStorage.setItem(`${session.ACADEMIC_SESSION_PREFIX}progress`, '{corrupt');
const recovered = session.loadSessionProgress();
assert.deepEqual(recovered.completedPractices, {}, 'Corrupt progress did not recover safely');
assert.equal(window.sessionStorage.getItem(`${session.ACADEMIC_SESSION_PREFIX}progress`), null, 'Corrupt session key was not removed');

assert.ok(!session.clearAcademicSession.toString().includes('firebase'), 'Cleanup must not delete confirmed external deliveries');
console.log('Privacy audit passed: academic state is tab-session scoped and cleanup is complete.');

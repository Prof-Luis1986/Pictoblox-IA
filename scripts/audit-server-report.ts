import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const server = readFileSync('google-apps-script/Code.gs', 'utf8');
const client = [readFileSync('src/services/appscript.ts', 'utf8'), readFileSync('src/components/SubmitPracticeModal.tsx', 'utf8')].join('\n');
const packageJson = readFileSync('package.json', 'utf8');
const lock = readFileSync('package-lock.json', 'utf8');

for (const forbidden of ['teacherGrade', 'teacherReportPdf', 'calculateTeacherGrade', 'percentageToPrivateGrade', 'generateTeacherReportPdf', 'blobToBase64', 'uploadTeacherReport', 'jsPDF', 'application/pdf']) assert.ok(!client.includes(forbidden), `Client contains private report implementation: ${forbidden}`);
assert.ok(!packageJson.includes('jspdf') && !lock.includes('node_modules/jspdf'), 'jsPDF remains installed');
for (const required of ['calculateTeacherGrade', 'percentageToPrivateGrade', 'createTeacherReportDocument', 'exportTeacherReportAsPdf', 'saveTeacherReport', 'DocumentApp.create', 'MimeType.PDF', 'setTrashed(true)', 'DriveApp.getFolderById(EVIDENCE_FOLDER_ID).createFile']) assert.ok(server.includes(required), `Server report is missing ${required}`);
assert.ok(!server.includes('setSharing') && !server.includes('ANYONE'), 'Teacher report is shared publicly');
assert.ok(server.includes("to: RECIPIENTS.join(',')") && !server.includes('data.recipients'), 'Report link recipients are not server-controlled');
assert.ok(server.includes("return jsonResponse({ status: 'success', message: 'Práctica recibida correctamente.', submissionId: submissionId, evidenceCount: 0 })"), 'Browser response is not minimal');
assert.ok(!server.includes('teacherReportLink') && !server.includes('fileName: fileName'), 'Browser response may expose private report metadata');
assert.ok(server.indexOf('const report = saveTeacherReport') < server.indexOf("return jsonResponse({ status: 'success'"), 'Server confirms before report creation');
assert.ok(server.includes("if (data.steps.length > 0 && !data.steps.every(step => step.completed === true))"), 'Server does not reject incomplete technical steps');
assert.ok(server.includes("data.steps.length === 0 && data.practiceId !== 't1-extra-act7'"), 'Zero-step exception is not restricted to Fruta Ninja');
assert.ok(server.includes("['grade', 'privateGrade', 'percentage', 'weights', 'teacherGrade', 'quizScore']"), 'Server accepts calculated grades from the client');
assert.ok(server.includes('createdFileIds.push(file.getId())') && server.includes('createdEvidenceIds.forEach(trashFile)'), 'Partial evidence files are not cleaned transactionally');

const sandbox: any = {
  console,
  ContentService: { MimeType: { JSON: 'json' }, createTextOutput(payload: string) { return { payload, setMimeType() { return this; } }; } },
  DocumentApp: { create() { throw new Error('Fallo simulado del reporte'); }, ParagraphHeading: {} },
  DriveApp: { getFileById() { throw new Error('No existe'); } }
};
vm.createContext(sandbox);
vm.runInContext(`${server}\nthis.calculateTeacherGrade = calculateTeacherGrade; this.percentageToPrivateGrade = percentageToPrivateGrade; this.validateSubmission = validateSubmission; this.doPost = doPost;`, sandbox);
for (const [percentage, expected] of [[30, 6], [31, 7], [60, 7], [61, 8], [80, 8], [81, 9], [99, 9], [100, 10]]) assert.equal(sandbox.percentageToPrivateGrade(percentage), expected);
const data = { steps: [{ completed: true }], progressWall: { availableStages: [{ id: 'problem' }], respondedStageIds: ['problem'], responses: {} }, openQuestions: { availableQuestions: [], answers: {} }, quizAnswers: [], experiments: [], reflectionPrompt: '', reflectionAnswer: '' };
const grade = sandbox.calculateTeacherGrade(data);
assert.equal(Math.round(grade.components.reduce((sum: number, component: any) => sum + component.weight, 0)), 100);
assert.deepEqual(Array.from(grade.components, (component: any) => component.id), ['steps', 'wall']);
const validSubmission = { submissionId: 'sub-test', studentName: 'Alumno', studentGroup: '5A', studentDate: '2026-08-30', practiceId: 't1-act1', steps: [{ stepNumber: 1, title: 'Paso', completed: true }], progressWall: { availableStages: [], respondedStageIds: [], responses: {} }, openQuestions: { availableQuestions: [], answers: {} }, quizAnswers: [], experiments: [] };
assert.throws(() => sandbox.validateSubmission({ ...validSubmission, steps: [{ stepNumber: 1, title: 'Paso', completed: false }] }), /pasos técnicos/i);
assert.doesNotThrow(() => sandbox.validateSubmission({ ...validSubmission, practiceId: 't1-extra-act7', steps: [] }));
assert.throws(() => sandbox.validateSubmission({ ...validSubmission, grade: 10 }), /resultados calculados/i);
const failedReportResponse = sandbox.doPost({ postData: { contents: JSON.stringify(validSubmission) } });
assert.equal(JSON.parse(failedReportResponse.payload).status, 'error', 'Report failure returned a false confirmation');
console.log('Server report audit passed: private grading and PDF generation stay in Apps Script, weights redistribute, cleanup is transactional, and the browser response is minimal.');

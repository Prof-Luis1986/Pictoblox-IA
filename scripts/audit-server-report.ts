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
assert.ok(server.indexOf('const report = saveTeacherReport') < server.indexOf('properties.setProperty(submissionPropertyKey(submissionId)') && server.indexOf('properties.setProperty(submissionPropertyKey(submissionId)') < server.lastIndexOf("return jsonResponse({ status: 'success'"), 'New delivery confirms before report creation');
assert.ok(server.includes("!rule.isFreeChallenge && !data.steps.every(step => step.completed === true)"), 'Server does not reject incomplete technical steps');
assert.ok(server.includes('rule.steps.length === 0 && !rule.isFreeChallenge'), 'Zero-step exception is not restricted to Fruta Ninja');
assert.ok(server.includes("['grade', 'privateGrade', 'percentage', 'weights', 'teacherGrade', 'quizScore']"), 'Server accepts calculated grades from the client');
assert.ok(server.includes('createdFileIds.push(file.getId())') && server.includes('createdEvidenceIds.forEach(trashFile)'), 'Partial evidence files are not cleaned transactionally');
assert.ok(server.includes('const PRACTICE_RULES') && (server.match(/practiceId:/g) || []).length === 13, 'Private catalog does not contain exactly 13 activities');
assert.ok(server.includes('LockService.getScriptLock()') && server.includes('PropertiesService.getScriptProperties()'), 'Duplicate protection is missing');

const propertyStore: Record<string, string> = {};
let documentCreateCount = 0;
const sandbox: any = {
  console,
  ContentService: { MimeType: { JSON: 'json' }, createTextOutput(payload: string) { return { payload, setMimeType() { return this; } }; } },
  DocumentApp: { create() { documentCreateCount += 1; throw new Error('Fallo simulado del reporte'); }, ParagraphHeading: {} },
  DriveApp: { getFileById() { throw new Error('No existe'); } },
  LockService: { getScriptLock() { let locked = false; return { waitLock() { locked = true; }, hasLock() { return locked; }, releaseLock() { locked = false; } }; } },
  PropertiesService: { getScriptProperties() { return { getProperty(key: string) { return propertyStore[key] || null; }, setProperty(key: string, value: string) { propertyStore[key] = value; }, getProperties() { return { ...propertyStore }; }, deleteProperty(key: string) { delete propertyStore[key]; } }; } }
};
vm.createContext(sandbox);
vm.runInContext(`${server}\nthis.calculateTeacherGrade = calculateTeacherGrade; this.percentageToPrivateGrade = percentageToPrivateGrade; this.validateSubmission = validateSubmission; this.doPost = doPost; this.rules = PRACTICE_RULES;`, sandbox);
for (const [percentage, expected] of [[30, 6], [31, 7], [60, 7], [61, 8], [80, 8], [81, 9], [99, 9], [100, 10]]) assert.equal(sandbox.percentageToPrivateGrade(percentage), expected);
const makeSubmission = (practiceId = 't1-act1') => { const rule = sandbox.rules[practiceId]; return { submissionId: 'sub-test', studentName: 'Alumno', studentGroup: '5A', studentDate: '2026-08-30', practiceId, steps: Array.from(rule.steps, (stepNumber: number) => ({ stepNumber, title: 'Texto no confiable', completed: true })), progressWall: { availableStages: [], respondedStageIds: ['problem','idea','design','prototype','error','redesign'], responses: {} }, openQuestions: { availableQuestions: [], answers: {} }, quizAnswers: Array.from(rule.quiz, (question: any) => ({ questionId: question.id, selectedOptionIndex: -1, answered: true, isCorrect: true, questionText: 'Manipulado', selectedOptionText: 'Manipulado' })), experiments: Array.from(rule.experiments, (id: string) => ({ experimentId: id })), reflectionPrompt: '', reflectionAnswer: '' } };
assert.throws(() => sandbox.validateSubmission({ ...makeSubmission('t1-act3'), steps: [{ stepNumber: 1, title: 'Paso', completed: true }] }), /números de pasos/i);
assert.throws(() => sandbox.validateSubmission({ ...makeSubmission(), steps: [...makeSubmission().steps, { stepNumber: 99, title: 'Inventado', completed: true }] }), /números de pasos/i);
assert.throws(() => sandbox.validateSubmission({ ...makeSubmission(), steps: [{ ...makeSubmission().steps[0] }, { ...makeSubmission().steps[0] }, ...makeSubmission().steps.slice(2)] }), /repetidos/i);
assert.throws(() => sandbox.validateSubmission({ ...makeSubmission(), practiceId: 'desconocida' }), /practiceId desconocido/i);
assert.doesNotThrow(() => sandbox.validateSubmission(makeSubmission('t1-extra-act7')));
assert.throws(() => sandbox.validateSubmission({ ...makeSubmission(), steps: [] }), /números de pasos/i);
assert.throws(() => sandbox.validateSubmission({ ...makeSubmission(), grade: 10 }), /resultados calculados/i);

const manipulatedQuiz = makeSubmission();
manipulatedQuiz.quizAnswers[0].selectedOptionIndex = sandbox.rules['t1-act1'].quiz[0].correctIndex;
manipulatedQuiz.quizAnswers[0].isCorrect = false;
const quizValidated = sandbox.validateSubmission(manipulatedQuiz);
assert.equal(manipulatedQuiz.quizAnswers[0].isCorrect, true, 'Client isCorrect was trusted');
assert.throws(() => sandbox.validateSubmission({ ...makeSubmission(), quizAnswers: [{ questionId: 'inventada', selectedOptionIndex: 0 }] }), /cuestionario desconocida/i);
const missingQuiz = makeSubmission(); missingQuiz.quizAnswers = [missingQuiz.quizAnswers[0]]; sandbox.validateSubmission(missingQuiz);
assert.equal(missingQuiz.quizAnswers[1].answered, false); assert.equal(missingQuiz.quizAnswers[1].selectedOptionText, 'Sin responder');

const emptyWall = makeSubmission(); const emptyWallValidated = sandbox.validateSubmission(emptyWall); const emptyWallGrade = sandbox.calculateTeacherGrade(emptyWall, emptyWallValidated.rule);
const wallComponent = emptyWallGrade.components.find((component: any) => component.id === 'wall');
assert.equal(wallComponent.completed, 1, 'Client respondedStageIds was trusted or empty stages counted');
const openRuleSubmission = makeSubmission('t1-act3'); openRuleSubmission.openQuestions.availableQuestions = []; const openValidated = sandbox.validateSubmission(openRuleSubmission); const openGrade = sandbox.calculateTeacherGrade(openRuleSubmission, openValidated.rule); assert.equal(openGrade.components.find((component: any) => component.id === 'openQuestions').available, 4);
assert.throws(() => sandbox.validateSubmission({ ...makeSubmission(), experiments: [{ experimentId: 'inventado' }] }), /Experimento desconocido/i);
const reflectionSubmission = makeSubmission(); reflectionSubmission.reflectionPrompt = ''; const reflectionValidated = sandbox.validateSubmission(reflectionSubmission); const reflectionGrade = sandbox.calculateTeacherGrade(reflectionSubmission, reflectionValidated.rule); assert.equal(reflectionGrade.components.find((component: any) => component.id === 'experimentsReflection').available, 1);
assert.equal(Math.round(reflectionGrade.components.reduce((sum: number, component: any) => sum + component.weight, 0)), 100);

const validSubmission = makeSubmission();
propertyStore['confirmed_submission:sub-test'] = String(Date.now());
const duplicateResponse = sandbox.doPost({ postData: { contents: JSON.stringify(validSubmission) } });
assert.equal(JSON.parse(duplicateResponse.payload).status, 'success'); assert.equal(documentCreateCount, 0, 'Duplicate submission created another report');
delete propertyStore['confirmed_submission:sub-test'];
const failedReportResponse = sandbox.doPost({ postData: { contents: JSON.stringify(validSubmission) } });
assert.equal(JSON.parse(failedReportResponse.payload).status, 'error', 'Report failure returned a false confirmation');
console.log('Server report audit passed: private grading and PDF generation stay in Apps Script, weights redistribute, cleanup is transactional, and the browser response is minimal.');

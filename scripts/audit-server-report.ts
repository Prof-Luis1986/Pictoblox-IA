import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
import { getSubmissionMissingRequirements } from '../src/services/submissionEligibility';

const server = readFileSync('google-apps-script/Code.gs', 'utf8');
const client = [readFileSync('src/services/appscript.ts', 'utf8'), readFileSync('src/components/SubmitPracticeModal.tsx', 'utf8')].join('\n');
const distSource = readdirSync('dist/assets').filter(name => name.endsWith('.js')).map(name => readFileSync(`dist/assets/${name}`, 'utf8')).join('\n');
const packageJson = readFileSync('package.json', 'utf8');
const packageLock = readFileSync('package-lock.json', 'utf8');
const warnings: string[] = [];
const propertyStore: Record<string, string> = {};
let documentCreateCount = 0;
let evidenceFolderAccessCount = 0;
let mailCount = 0;
let lockWaitCount = 0;
const sandbox: any = {
  console: { warn(message: string) { warnings.push(message); }, error() {} },
  ContentService: { MimeType: { JSON: 'json' }, createTextOutput(payload: string) { return { payload, setMimeType() { return this; } }; } },
  DocumentApp: { create() { documentCreateCount += 1; throw new Error('Fallo simulado del reporte'); }, ParagraphHeading: {} },
  DriveApp: { getFileById() { throw new Error('No existe'); }, getFolderById() { evidenceFolderAccessCount += 1; throw new Error('No debe crear archivos duplicados'); } },
  MailApp: { sendEmail() { mailCount += 1; } },
  LockService: { getScriptLock() { let locked = false; return { waitLock() { lockWaitCount += 1; locked = true; }, hasLock() { return locked; }, releaseLock() { locked = false; } }; } },
  PropertiesService: { getScriptProperties() { return { getProperty(key: string) { return propertyStore[key] || null; }, setProperty(key: string, value: string) { propertyStore[key] = value; }, getProperties() { return { ...propertyStore }; }, deleteProperty(key: string) { delete propertyStore[key]; } }; } }
};
vm.createContext(sandbox);
vm.runInContext(`${server}\nObject.assign(this,{calculateTeacherGrade,percentageToPrivateGrade,validateSubmission,doPost,isWallStageComplete,rules:PRACTICE_RULES});`, sandbox);

const makeSubmission = (practiceId = 't1-act1') => {
  const rule = sandbox.rules[practiceId];
  return {
    submissionId: 'sub-test', studentName: 'Alumno', studentGroup: '5A', studentDate: '2026-08-30', practiceId,
    steps: Array.from(rule.steps, (stepNumber: number) => ({ stepNumber, title: 'Texto no confiable', completed: true })),
    progressWall: { availableStages: [], respondedStageIds: ['problem','idea','design','prototype','error','redesign'], responses: {} as Record<string, string> },
    openQuestions: { availableQuestions: [], answers: {} as Record<string, string> },
    quizAnswers: Array.from(rule.quiz, (question: any) => ({ questionId: question.id, selectedOptionIndex: -1, answered: true, isCorrect: true, questionText: 'Manipulado', selectedOptionText: 'Manipulado' })),
    experiments: Array.from(rule.experiments, (id: string) => ({ experimentId: id, selectedOption: '', notesOrAnswer: '' })),
    reflectionPrompt: '', reflectionAnswer: ''
  };
};
const grade = (submission: any) => { const validated = sandbox.validateSubmission(submission); return sandbox.calculateTeacherGrade(submission, validated.rule); };
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));
const tests: Array<{ name: string; run: () => void }> = [];
const test = (name: string, run: () => void) => tests.push({ name, run });

test('1 practiceId desconocido se rechaza', () => assert.throws(() => sandbox.validateSubmission({ ...makeSubmission(), practiceId: 'desconocida' }), /practiceId desconocido/i));
test('2 práctica de 12 pasos con uno se rechaza', () => assert.throws(() => sandbox.validateSubmission({ ...makeSubmission('t1-act3'), steps: [{ stepNumber: 1, title: '', completed: true }] }), /números de pasos/i));
test('3 paso faltante se rechaza', () => { const value = makeSubmission(); value.steps.pop(); assert.throws(() => sandbox.validateSubmission(value), /números de pasos/i); });
test('4 paso adicional se rechaza', () => { const value = makeSubmission(); value.steps.push({ stepNumber: 99, title: '', completed: true }); assert.throws(() => sandbox.validateSubmission(value), /números de pasos/i); });
test('5 paso repetido se rechaza', () => { const value = makeSubmission(); value.steps[1] = { ...value.steps[0] }; assert.throws(() => sandbox.validateSubmission(value), /repetidos/i); });
test('6 paso incompleto se rechaza', () => { const value = makeSubmission(); value.steps[0].completed = false; assert.throws(() => sandbox.validateSubmission(value), /no están completos/i); });
test('7 sólo Fruta Ninja acepta cero pasos', () => { assert.doesNotThrow(() => sandbox.validateSubmission(makeSubmission('t1-extra-act7'))); const regular = makeSubmission(); regular.steps = []; assert.throws(() => sandbox.validateSubmission(regular)); });
test('8 Fruta Ninja no recibe instrucciones inventadas', () => { const source = readFileSync('src/data/progressWallData.ts', 'utf8'); assert.ok(source.includes('FRUTA_NINJA_PROGRESS_WALL')); assert.ok(source.includes('instructions: [], relatedStepNumbers: []')); });
test('9 isCorrect del cliente se ignora', () => { const value = makeSubmission(); value.quizAnswers[0].selectedOptionIndex = 1; value.quizAnswers[0].isCorrect = false; sandbox.validateSubmission(value); assert.equal(value.quizAnswers[0].isCorrect, true); });
test('10 respuesta correcta usa clave privada', () => { const value = makeSubmission(); value.quizAnswers[0].selectedOptionIndex = sandbox.rules['t1-act1'].quiz[0].correctIndex; sandbox.validateSubmission(value); assert.equal(value.quizAnswers[0].isCorrect, true); });
test('11 respuesta incorrecta se calcula incorrecta', () => { const value = makeSubmission(); value.quizAnswers[0].selectedOptionIndex = 0; sandbox.validateSubmission(value); assert.equal(value.quizAnswers[0].isCorrect, false); });
test('12 pregunta ausente queda sin responder', () => { const value = makeSubmission(); value.quizAnswers = [value.quizAnswers[0]]; sandbox.validateSubmission(value); assert.deepEqual({ answered: value.quizAnswers[1].answered, text: value.quizAnswers[1].selectedOptionText }, { answered: false, text: 'Sin responder' }); });
test('13 pregunta desconocida no otorga puntos', () => { const value = makeSubmission(); value.quizAnswers.push({ questionId: 'inventada', selectedOptionIndex: 0, answered: true, isCorrect: true, questionText: '', selectedOptionText: '' }); const result = grade(value); assert.equal(result.components.find((c: any) => c.id === 'quiz').completed, 0); });
test('14 pregunta repetida no suma puntos', () => { const value = makeSubmission(); value.quizAnswers[0].selectedOptionIndex = 1; value.quizAnswers.push(clone(value.quizAnswers[0])); const result = grade(value); assert.equal(result.components.find((c: any) => c.id === 'quiz').completed, 1); });
test('15 respondedStageIds del cliente se ignora', () => { const value = makeSubmission(); const result = grade(value); assert.equal(result.components.find((c: any) => c.id === 'wall').completed, 1); });
test('16 etapa vacía no cuenta', () => assert.equal(sandbox.isWallStageComplete('problem', {}, makeSubmission().steps), false));
test('17 etapa parcial queda incompleta', () => assert.equal(sandbox.isWallStageComplete('error', { 'error:outcome': 'found', 'error:unexpected': 'x' }, makeSubmission().steps), false));
test('18 etapa completa cuenta', () => assert.equal(sandbox.isWallStageComplete('error', { 'error:outcome': 'worked', 'error:test_method': 'x', 'error:expected': 'x', 'error:actual': 'x', 'error:evidence': 'x' }, makeSubmission().steps), true));
test('19 availableQuestions no elimina esperadas', () => { const value = makeSubmission('t1-act3'); value.openQuestions.availableQuestions = []; const result = grade(value); assert.equal(result.components.find((c: any) => c.id === 'openQuestions').available, 4); });
test('20 pregunta abierta vacía no bloquea', () => assert.doesNotThrow(() => sandbox.validateSubmission(makeSubmission())));
test('21 cuestionario vacío no bloquea', () => { const value = makeSubmission(); value.quizAnswers = []; assert.doesNotThrow(() => sandbox.validateSubmission(value)); });
test('22 experimento vacío no bloquea', () => assert.doesNotThrow(() => sandbox.validateSubmission(makeSubmission('t1-act3'))));
test('23 reflexión vacía no bloquea', () => assert.doesNotThrow(() => sandbox.validateSubmission(makeSubmission('t1-act1'))));
test('24 evidencias ausentes no bloquean', () => { const value = makeSubmission(); assert.equal('evidenceAttachments' in value, false); assert.doesNotThrow(() => sandbox.validateSubmission(value)); });
test('25 identificadores opcionales desconocidos no bloquean', () => { const value = makeSubmission('t1-act3'); value.progressWall.responses['unknown:value'] = 'x'; value.openQuestions.answers.unknown = 'x'; value.quizAnswers.push({ questionId: 'unknown', selectedOptionIndex: 0, answered: true, isCorrect: true, questionText: '', selectedOptionText: '' }); value.experiments.push({ experimentId: 'unknown', selectedOption: 'x', notesOrAnswer: '' }); assert.doesNotThrow(() => sandbox.validateSubmission(value)); });
test('26 ponderaciones suman 100', () => { const result = grade(makeSubmission()); assert.ok(Math.abs(result.components.reduce((sum: number, c: any) => sum + c.weight, 0) - 100) < 0.0001); });
test('27 secciones inexistentes redistribuyen', () => { const result = grade(makeSubmission('t1-extra-act7')); assert.deepEqual(Array.from(result.components, (c: any) => c.id), ['wall']); assert.equal(result.components[0].weight, 100); });
test('28 cliente no elimina secciones para redistribuir', () => { const value = makeSubmission('t1-act3'); value.openQuestions.availableQuestions = []; value.quizAnswers = []; value.experiments = []; const result = grade(value); assert.deepEqual(Array.from(result.components, (c: any) => c.id), ['steps','wall','openQuestions','quiz','experimentsReflection']); });
test('29 escala cubre todos los límites', () => { for (const [input, expected] of [[30,6],[31,7],[60,7],[61,8],[80,8],[81,9],[99,9],[100,10]]) assert.equal(sandbox.percentageToPrivateGrade(input), expected); });
test('30 Google Doc temporal se crea en servidor', () => assert.ok(server.includes('DocumentApp.create(')));
test('31 PDF se exporta en servidor', () => assert.ok(server.includes('getAs(MimeType.PDF)')));
test('32 PDF usa carpeta autorizada', () => assert.ok(server.includes('DriveApp.getFolderById(EVIDENCE_FOLDER_ID).createFile(pdfBlob)')));
test('33 documento temporal va a papelera', () => assert.ok(server.includes('DriveApp.getFileById(documentId).setTrashed(true)')));
test('34 no se modifican permisos públicos', () => assert.ok(!server.includes('setSharing') && !server.includes('ANYONE')));
test('35 enlace sólo se envía a RECIPIENTS', () => assert.ok(server.includes("to: RECIPIENTS.join(',')") && !server.includes('data.recipients')));
test('36 fallo del reporte devuelve error', () => { delete propertyStore['confirmed_submission:sub-test']; const response = sandbox.doPost({ postData: { contents: JSON.stringify(makeSubmission()) } }); assert.equal(JSON.parse(response.payload).status, 'error'); });
test('37 archivos parciales tienen limpieza transaccional', () => assert.ok(server.includes('createdEvidenceIds.forEach(trashFile)') && server.includes('trashFile(reportFileId)') && server.includes('trashFile(temporaryDocumentId)')));
test('38 duplicado no crea otro PDF', () => { propertyStore['confirmed_submission:sub-test'] = String(Date.now()); documentCreateCount = 0; sandbox.doPost({ postData: { contents: JSON.stringify(makeSubmission()) } }); assert.equal(documentCreateCount, 0); });
test('39 duplicado no crea evidencias', () => { propertyStore['confirmed_submission:sub-test'] = String(Date.now()); evidenceFolderAccessCount = 0; sandbox.doPost({ postData: { contents: JSON.stringify(makeSubmission()) } }); assert.equal(evidenceFolderAccessCount, 0); });
test('40 duplicado no reenvía correo', () => { propertyStore['confirmed_submission:sub-test'] = String(Date.now()); mailCount = 0; sandbox.doPost({ postData: { contents: JSON.stringify(makeSubmission()) } }); assert.equal(mailCount, 0); });
test('41 solicitudes iguales pasan por bloqueo único', () => { propertyStore['confirmed_submission:sub-test'] = String(Date.now()); lockWaitCount = 0; sandbox.doPost({ postData: { contents: JSON.stringify(makeSubmission()) } }); sandbox.doPost({ postData: { contents: JSON.stringify(makeSubmission()) } }); assert.equal(lockWaitCount, 2); assert.equal(documentCreateCount, 0); });
test('42 respuesta no contiene información privada', () => { propertyStore['confirmed_submission:sub-test'] = String(Date.now()); const response = JSON.parse(sandbox.doPost({ postData: { contents: JSON.stringify(makeSubmission()) } }).payload); assert.deepEqual(Object.keys(response).sort(), ['evidenceCount','message','status','submissionId']); });
test('43 escala ausente de src y dist', () => assert.ok(!client.includes('percentageToPrivateGrade') && !distSource.includes('percentageToPrivateGrade')));
test('44 ponderaciones ausentes de src y dist', () => assert.ok(!client.includes('baseWeight') && !distSource.includes('baseWeight')));
test('45 jsPDF no está instalado', () => assert.ok(!packageJson.includes('jspdf') && !packageLock.includes('node_modules/jspdf')));
test('46 navegador no genera PDF', () => assert.ok(!client.includes('generateTeacherReportPdf') && !client.includes('application/pdf')));
test('47 no existe descarga de PDF', () => assert.ok(!client.includes('downloadReceiptPdf') && !client.includes('URL.createObjectURL') && !client.includes('window.open')));
test('48 respuestas opcionales no bloquean', () => assert.deepEqual(getSubmissionMissingRequirements({ isFreeChallenge: false, totalSteps: 1, completedSteps: [1], completedWallStages: [], openQuestionsComplete: false }), []));
test('49 pasos incompletos sí bloquean', () => assert.equal(getSubmissionMissingRequirements({ isFreeChallenge: false, totalSteps: 2, completedSteps: [1], completedWallStages: [], openQuestionsComplete: false }).length, 1));
test('50 no hay sb3 en public o dist', () => { const walk = (path: string): string[] => readdirSync(path, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(`${path}/${entry.name}`) : [`${path}/${entry.name}`]); assert.equal([...walk('public'), ...walk('dist')].filter(path => path.endsWith('.sb3')).length, 0); });

assert.equal(tests.length, 50, 'La auditoría debe contener exactamente 50 pruebas');
for (const entry of tests) entry.run();
assert.ok(warnings.length > 0, 'Las anomalías opcionales no se registraron internamente');
console.log(`Server security audit passed: ${tests.length}/50 pruebas superadas.`);

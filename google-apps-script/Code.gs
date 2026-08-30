const RECIPIENTS = ['lmartinez@isb.edu.mx', 'dolidos2022@gmail.com'];
const EVIDENCE_FOLDER_ID = '18RU-WTqq8D67cuAdCVFC4ahQbQ7CSAkL';
const MAX_IMAGES = 3;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = { 'image/png': true, 'image/jpeg': true, 'image/webp': true };
const COMPONENT_DEFINITIONS = [
  { id: 'steps', label: 'Pasos técnicos', baseWeight: 50 },
  { id: 'wall', label: 'Muro del Progreso', baseWeight: 25 },
  { id: 'openQuestions', label: 'Preguntas abiertas', baseWeight: 10 },
  { id: 'quiz', label: 'Cuestionario', baseWeight: 10 },
  { id: 'experimentsReflection', label: 'Experimentos y reflexión', baseWeight: 5 }
];
const WALL_STAGE_IDS = ['problem', 'idea', 'design', 'prototype', 'error', 'redesign'];
const WALL_RESPONSE_KEYS = ['problem:problem','idea:possible_ideas','idea:selected_idea','design:design','prototype:prototype','error:outcome','error:unexpected','error:step','error:expected','error:actual','error:cause','error:test_method','error:evidence','redesign:redesign_choice','redesign:correction','redesign:improvement','redesign:new_test','redesign:result','redesign:conclusion','redesign:future_improvement'];
const PRACTICE_RULES = {
  't1-act1': { practiceId: 't1-act1', steps: [1,2,3,4], stages: WALL_STAGE_IDS, openQuestions: ['t1a1-q1'], quiz: [{ id: 'q1-1', correctIndex: 1, optionCount: 4 }, { id: 'q1-2', correctIndex: 2, optionCount: 4 }], experiments: [], hasReflection: true, isFreeChallenge: false, allowZeroSteps: false },
  't1-act2': { practiceId: 't1-act2', steps: [1,2,3,4,5,6,7,8,9], stages: WALL_STAGE_IDS, openQuestions: ['t1a2-q1'], quiz: [{ id: 'q2-1', correctIndex: 1, optionCount: 4 }, { id: 'q2-2', correctIndex: 1, optionCount: 4 }], experiments: [], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false },
  't1-act3': { practiceId: 't1-act3', steps: [1,2,3,4,5,6,7,8,9,10,11,12], stages: WALL_STAGE_IDS, openQuestions: ['t1a3-q1','t1a3-q2','t1a3-q3','t1a3-q4'], quiz: [{ id: 'q3-1', correctIndex: 1, optionCount: 4 }, { id: 'q3-2', correctIndex: 1, optionCount: 4 }], experiments: ['exp3-1','exp3-2','exp3-3','exp3-4'], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false },
  't1-act4': { practiceId: 't1-act4', steps: [1,2,3,4,5,6,7,8], stages: WALL_STAGE_IDS, openQuestions: ['t1a4-q1','t1a4-q2','t1a4-q3','t1a4-q4'], quiz: [{ id: 'q4-1', correctIndex: 1, optionCount: 4 }, { id: 'q4-2', correctIndex: 1, optionCount: 4 }], experiments: ['exp4-1','exp4-2','exp4-3','exp4-4'], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false },
  't1-act5': { practiceId: 't1-act5', steps: [1,2,3,4,5,6], stages: WALL_STAGE_IDS, openQuestions: ['t1a5-q1','t1a5-q2','t1a5-q3','t1a5-q4'], quiz: [{ id: 'q5-1', correctIndex: 1, optionCount: 4 }, { id: 'q5-2', correctIndex: 0, optionCount: 4 }], experiments: ['exp5-1','exp5-2','exp5-3'], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false },
  't1-act6': { practiceId: 't1-act6', steps: [1,2,3,4,5,6,7], stages: WALL_STAGE_IDS, openQuestions: ['t1a6-q1'], quiz: [{ id: 'q6-1', correctIndex: 0, optionCount: 4 }, { id: 'q6-2', correctIndex: 1, optionCount: 4 }], experiments: [], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false },
  't1-extra-act7': { practiceId: 't1-extra-act7', steps: [], stages: WALL_STAGE_IDS, openQuestions: [], quiz: [], experiments: [], hasReflection: false, isFreeChallenge: true, allowZeroSteps: true },
  't2-act1': { practiceId: 't2-act1', steps: [1,2,3,4,5,6,7,8,9], stages: WALL_STAGE_IDS, openQuestions: ['t2a1-q1','t2a1-q2'], quiz: [{ id: 'q-t2-1-1', correctIndex: 1, optionCount: 4 }], experiments: [], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false },
  't2-act2': { practiceId: 't2-act2', steps: [1,2,3,4,5,6,7,8,9,10,11,12], stages: WALL_STAGE_IDS, openQuestions: ['t2a2-q1','t2a2-q2','t2a2-q3','t2a2-q4'], quiz: [{ id: 'q-t2-2-1', correctIndex: 1, optionCount: 4 }], experiments: ['t2-exp2-1','t2-exp2-2'], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false },
  't2-act5': { practiceId: 't2-act5', steps: [1,2,3,4,5,6], stages: WALL_STAGE_IDS, openQuestions: ['t2a5-q1','t2a5-q2','t2a5-q3','t2a5-q4'], quiz: [{ id: 'q-t2-5-1', correctIndex: 1, optionCount: 4 }, { id: 'q-t2-5-2', correctIndex: 1, optionCount: 4 }], experiments: ['t2-exp5-1','t2-exp5-2','t2-exp5-3'], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false },
  't2-act6': { practiceId: 't2-act6', steps: [1,2,3,4,5,6], stages: WALL_STAGE_IDS, openQuestions: ['t2a6-q1','t2a6-q2'], quiz: [{ id: 'q-t2-6-1', correctIndex: 1, optionCount: 4 }, { id: 'q-t2-6-2', correctIndex: 1, optionCount: 4 }], experiments: [], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false },
  't2-act7': { practiceId: 't2-act7', steps: [1,2,3,4,5,6,7,8,9], stages: WALL_STAGE_IDS, openQuestions: [], quiz: [{ id: 'q-t2-7-1', correctIndex: 1, optionCount: 4 }, { id: 'q-t2-7-2', correctIndex: 1, optionCount: 4 }], experiments: [], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false },
  't2-act8': { practiceId: 't2-act8', steps: [1,2,3,4,5,6,7,8,9], stages: WALL_STAGE_IDS, openQuestions: ['t2a8-q1','t2a8-q2','t2a8-q3','t2a8-q4'], quiz: [{ id: 'q-t2-8-1', correctIndex: 1, optionCount: 4 }, { id: 'q-t2-8-2', correctIndex: 0, optionCount: 4 }], experiments: ['t2-exp8-1','t2-exp8-2'], hasReflection: false, isFreeChallenge: false, allowZeroSteps: false }
};

function doGet() {
  return jsonResponse({ status: 'ok', service: 'PictoBlox IA Educativa', timestamp: new Date().toISOString() });
}

function doPost(e) {
  let createdEvidenceIds = [];
  let reportFileId = '';
  let temporaryDocumentId = '';
  let submissionId = '';
  let processingStage = 'request';
  let lock = null;
  try {
    if (!e || !e.postData || !e.postData.contents) throw new Error('Solicitud vacía.');
    const data = JSON.parse(e.postData.contents);
    processingStage = 'validation';
    const validated = validateSubmission(data);
    submissionId = validated.submissionId;
    lock = LockService.getScriptLock();
    lock.waitLock(30000);
    const properties = PropertiesService.getScriptProperties();
    purgeExpiredSubmissionIds(properties);
    if (properties.getProperty(submissionPropertyKey(submissionId))) {
      return jsonResponse({ status: 'success', message: 'Práctica recibida correctamente.', submissionId: submissionId, evidenceCount: 0 });
    }
    processingStage = 'evidence';
    const evidenceLinks = saveEvidenceFiles(data.evidenceAttachments || [], data, createdEvidenceIds);
    delete data.evidenceAttachments;
    processingStage = 'grading';
    const grade = calculateTeacherGrade(data, validated.rule);
    processingStage = 'report';
    const report = saveTeacherReport(data, grade, evidenceLinks);
    reportFileId = report.fileId;
    temporaryDocumentId = report.temporaryDocumentId;
    processingStage = 'record';
    appendSpreadsheetRecord(data, evidenceLinks);
    processingStage = 'confirmation';
    properties.setProperty(submissionPropertyKey(submissionId), String(Date.now()));
    return jsonResponse({ status: 'success', message: 'Práctica recibida correctamente.', submissionId: submissionId, evidenceCount: 0 });
  } catch (error) {
    trashFile(reportFileId);
    trashFile(temporaryDocumentId);
    createdEvidenceIds.forEach(trashFile);
    console.error('Entrega ' + (submissionId || 'sin submissionId') + ': ' + error.message);
    return jsonResponse({ status: 'error', message: 'No fue posible procesar la entrega. Código: ' + processingStage + '.', errorCode: processingStage, submissionId: submissionId });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function validateSubmission(data) {
  const submissionId = boundedText(data.submissionId, 100, true);
  boundedText(data.studentName, 100, true);
  boundedText(data.studentGroup, 60, true);
  boundedText(data.studentDate, 20, true);
  const practiceId = boundedText(data.practiceId, 80, true);
  const rule = PRACTICE_RULES[practiceId];
  if (!rule) throw new Error('practiceId desconocido.');
  ['grade', 'privateGrade', 'percentage', 'weights', 'teacherGrade', 'quizScore'].forEach(function(field) {
    if (Object.prototype.hasOwnProperty.call(data, field)) throw new Error('El cliente no puede enviar resultados calculados.');
  });
  if (!Array.isArray(data.steps)) throw new Error('Pasos inválidos.');
  const receivedStepNumbers = data.steps.map(function(step) {
    if (!step || !Number.isFinite(Number(step.stepNumber)) || typeof step.title !== 'string' || typeof step.completed !== 'boolean') throw new Error('Paso inválido.');
    return Number(step.stepNumber);
  });
  if (unique(receivedStepNumbers).length !== receivedStepNumbers.length) throw new Error('Hay pasos repetidos.');
  if (!sameNumberSet(receivedStepNumbers, rule.steps)) throw new Error('Los números de pasos no corresponden a la práctica.');
  if (!rule.isFreeChallenge && !data.steps.every(step => step.completed === true)) throw new Error('Los pasos técnicos no están completos.');
  if (rule.steps.length === 0 && !rule.allowZeroSteps) throw new Error('Sólo el reto libre puede omitir pasos.');
  if (!data.progressWall || !Array.isArray(data.progressWall.availableStages) || !Array.isArray(data.progressWall.respondedStageIds) || !isPlainObject(data.progressWall.responses)) throw new Error('Muro inválido.');
  if (!data.openQuestions || !Array.isArray(data.openQuestions.availableQuestions) || !isPlainObject(data.openQuestions.answers)) throw new Error('Preguntas abiertas inválidas.');
  if (!Array.isArray(data.quizAnswers) || !Array.isArray(data.experiments)) throw new Error('Secciones académicas inválidas.');
  normalizeAcademicData(data, rule);
  return { submissionId: submissionId, rule: rule };
}

function normalizeAcademicData(data, rule) {
  Object.keys(data.progressWall.responses).forEach(key => {
    if (!WALL_RESPONSE_KEYS.includes(key)) { warnOptionalAnomaly(data.submissionId, 'Respuesta desconocida del Muro: ' + key); delete data.progressWall.responses[key]; return; }
    data.progressWall.responses[key] = boundedText(data.progressWall.responses[key], 3000, false);
  });
  data.progressWall.availableStages = rule.stages.map(id => ({ id: id, title: id.toUpperCase() }));
  data.progressWall.respondedStageIds = [];
  Object.keys(data.openQuestions.answers).forEach(key => {
    if (!rule.openQuestions.includes(key)) { warnOptionalAnomaly(data.submissionId, 'Pregunta abierta desconocida: ' + key); delete data.openQuestions.answers[key]; return; }
    data.openQuestions.answers[key] = boundedText(data.openQuestions.answers[key], 3000, false);
  });
  data.openQuestions.availableQuestions = rule.openQuestions.map(id => ({ id: id, question: id }));
  const receivedQuizIds = data.quizAnswers.map(answer => boundedText(answer && answer.questionId, 100, true));
  if (unique(receivedQuizIds).length !== receivedQuizIds.length) warnOptionalAnomaly(data.submissionId, 'Hay preguntas de cuestionario repetidas.');
  receivedQuizIds.forEach(id => { if (!rule.quiz.some(question => question.id === id)) warnOptionalAnomaly(data.submissionId, 'Pregunta de cuestionario desconocida: ' + id); });
  const receivedById = {};
  data.quizAnswers.forEach(answer => { if (rule.quiz.some(question => question.id === answer.questionId) && !receivedById[answer.questionId]) receivedById[answer.questionId] = answer; });
  data.quizAnswers = rule.quiz.map(function(question) {
    const received = receivedById[question.id];
    if (!received) return { questionId: question.id, selectedOptionIndex: -1, selectedOptionText: 'Sin responder', answered: false, isCorrect: null };
    const selected = Number(received.selectedOptionIndex);
    if (!Number.isInteger(selected) || selected < -1 || selected >= question.optionCount) { warnOptionalAnomaly(data.submissionId, 'Índice fuera de rango: ' + question.id); return { questionId: question.id, selectedOptionIndex: -1, selectedOptionText: 'Sin responder', answered: false, isCorrect: null }; }
    const answered = selected >= 0;
    return { questionId: question.id, selectedOptionIndex: selected, selectedOptionText: answered ? 'Opción ' + (selected + 1) : 'Sin responder', answered: answered, isCorrect: answered ? selected === question.correctIndex : null };
  });
  const receivedExperimentIds = data.experiments.map(experiment => boundedText(experiment && experiment.experimentId, 100, true));
  if (unique(receivedExperimentIds).length !== receivedExperimentIds.length) warnOptionalAnomaly(data.submissionId, 'Hay experimentos repetidos.');
  receivedExperimentIds.forEach(id => { if (!rule.experiments.includes(id)) warnOptionalAnomaly(data.submissionId, 'Experimento desconocido: ' + id); });
  const experimentsById = {};
  data.experiments.forEach(experiment => { if (rule.experiments.includes(experiment.experimentId) && !experimentsById[experiment.experimentId]) experimentsById[experiment.experimentId] = experiment; });
  data.experiments = rule.experiments.map(function(id) {
    const received = experimentsById[id] || {};
    return { experimentId: id, title: id, selectedOption: boundedText(received.selectedOption, 1000, false), notesOrAnswer: boundedText(received.notesOrAnswer, 3000, false) };
  });
  data.reflectionPrompt = rule.hasReflection ? 'Reflexión' : '';
  data.reflectionAnswer = rule.hasReflection ? boundedText(data.reflectionAnswer, 3000, false) : '';
}

function calculateTeacherGrade(data, rule) {
  const respondedStageIds = rule.stages.filter(stageId => isWallStageComplete(stageId, data.progressWall.responses, data.steps));
  const openCompleted = rule.openQuestions.filter(id => boundedText(data.openQuestions.answers[id], 3000, false).trim()).length;
  const quizAnswers = data.quizAnswers;
  const experiments = data.experiments;
  const hasReflection = rule.hasReflection;
  const counts = {
    steps: { completed: data.steps.filter(step => step.completed === true).length, available: data.steps.length },
    wall: { completed: respondedStageIds.length, available: rule.stages.length },
    openQuestions: { completed: openCompleted, available: rule.openQuestions.length },
    quiz: { completed: quizAnswers.filter(answer => answer.isCorrect === true).length, available: rule.quiz.length },
    experimentsReflection: { completed: experiments.filter(experiment => boundedText(experiment.notesOrAnswer || experiment.selectedOption, 3000, false).trim()).length + (hasReflection && data.reflectionAnswer.trim() ? 1 : 0), available: rule.experiments.length + (hasReflection ? 1 : 0) }
  };
  const definitions = COMPONENT_DEFINITIONS.filter(component => counts[component.id].available > 0);
  const baseTotal = definitions.reduce((sum, component) => sum + component.baseWeight, 0);
  let assignedWeight = 0;
  const components = definitions.map(function(component, index) {
    const count = counts[component.id];
    const weight = index === definitions.length - 1 ? 100 - assignedWeight : component.baseWeight / baseTotal * 100;
    assignedWeight += weight;
    return { id: component.id, label: component.label, completed: count.completed, available: count.available, weight: weight, points: weight * count.completed / count.available };
  });
  const percentage = Math.round(components.reduce((sum, component) => sum + component.points, 0));
  return { percentage: percentage, grade: percentageToPrivateGrade(percentage), components: components };
}

function percentageToPrivateGrade(percentage) {
  if (percentage <= 30) return 6;
  if (percentage <= 60) return 7;
  if (percentage <= 80) return 8;
  if (percentage < 100) return 9;
  return 10;
}

function saveTeacherReport(data, grade, evidenceLinks) {
  let documentId = '';
  let pdfFileId = '';
  try {
    const document = createTeacherReportDocument(data, grade, evidenceLinks);
    documentId = document.getId();
    document.saveAndClose();
    const fileName = buildTeacherReportFileName(data);
    const pdfBlob = exportTeacherReportAsPdf(documentId, fileName);
    const pdfFile = DriveApp.getFolderById(EVIDENCE_FOLDER_ID).createFile(pdfBlob);
    pdfFileId = pdfFile.getId();
    DriveApp.getFileById(documentId).setTrashed(true);
    MailApp.sendEmail({ to: RECIPIENTS.join(','), subject: 'Reporte privado del docente - ' + boundedText(data.submissionId, 100, true), htmlBody: '<p>La práctica fue procesada correctamente.</p><p><a href="' + escapeHtml(pdfFile.getUrl()) + '">Abrir reporte privado</a></p>', name: 'PictoBlox IA Educativa' });
    return { fileId: pdfFileId, temporaryDocumentId: documentId };
  } catch (error) {
    trashFile(pdfFileId);
    trashFile(documentId);
    throw error;
  }
}

function createTeacherReportDocument(data, grade, evidenceLinks) {
  const document = DocumentApp.create('Reporte privado del docente - ' + boundedText(data.submissionId, 100, true));
  const body = document.getBody();
  body.appendParagraph('Reporte privado del docente').setHeading(DocumentApp.ParagraphHeading.TITLE);
  appendKeyValueTable(body, [['Alumno', data.studentName], ['Grupo', data.studentGroup], ['Fecha', data.studentDate], ['Curso', data.courseTitle], ['Práctica', data.practiceNumber + ': ' + data.practiceTitle], ['submissionId', data.submissionId], ['Porcentaje', grade.percentage + '%'], ['Calificación', String(grade.grade)]]);
  body.appendParagraph('Ponderaciones').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendTable([['Componente', 'Completados', 'Disponibles', 'Peso', 'Puntos']].concat(grade.components.map(component => [component.label, String(component.completed), String(component.available), component.weight.toFixed(2) + '%', component.points.toFixed(2)])));
  appendSection(body, 'Pasos técnicos', data.steps.map(step => (step.completed ? 'COMPLETADO - ' : 'PENDIENTE - ') + 'Paso ' + step.stepNumber));
  appendSection(body, 'Muro del Progreso', formatWallAnswers(data));
  appendSection(body, 'Preguntas abiertas', formatOpenAnswers(data));
  appendSection(body, 'Cuestionario', data.quizAnswers.map((answer, index) => (index + 1) + '. ' + answer.questionId + ': ' + (answer.answered ? answer.selectedOptionText + ' - ' + (answer.isCorrect ? 'Correcta' : 'Incorrecta') : 'Sin responder')));
  appendSection(body, 'Experimentos', data.experiments.filter(experiment => experiment.notesOrAnswer || experiment.selectedOption).map(experiment => experiment.title + ': ' + (experiment.notesOrAnswer || experiment.selectedOption)));
  appendSection(body, 'Reflexión', data.reflectionAnswer ? [data.reflectionAnswer] : []);
  appendSection(body, 'Evidencias', evidenceLinks.map(evidence => evidence.name + ': ' + evidence.url));
  body.appendParagraph('Reporte privado para uso exclusivo del docente.').setItalic(true);
  return document;
}

function exportTeacherReportAsPdf(documentId, fileName) {
  return DriveApp.getFileById(documentId).getAs(MimeType.PDF).setName(fileName);
}

function saveEvidenceFiles(attachments, data, createdFileIds) {
  if (!Array.isArray(attachments) || attachments.length === 0) return [];
  if (attachments.length > MAX_IMAGES) throw new Error('Demasiadas evidencias.');
  const folder = DriveApp.getFolderById(EVIDENCE_FOLDER_ID);
  return attachments.map(function(attachment, index) {
    if (!attachment || !ALLOWED_IMAGE_TYPES[attachment.mimeType]) throw new Error('Tipo de imagen no permitido.');
    const bytes = Utilities.base64Decode(attachment.base64Data || '');
    if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new Error('Tamaño de imagen inválido.');
    const extension = attachment.mimeType === 'image/png' ? '.png' : attachment.mimeType === 'image/webp' ? '.webp' : '.jpg';
    const name = [safeFilePart(data.studentName), safeFilePart(data.studentGroup), safeFilePart(data.studentDate), safeFilePart(data.practiceId), safeFilePart(data.submissionId), index + 1].join('_') + extension;
    const file = folder.createFile(Utilities.newBlob(bytes, attachment.mimeType, name));
    createdFileIds.push(file.getId());
    return { id: file.getId(), name: file.getName(), url: file.getUrl() };
  });
}

function formatWallAnswers(data) {
  return data.progressWall.availableStages.map(function(stage) {
    const values = Object.keys(data.progressWall.responses).filter(key => key.indexOf(stage.id + ':') === 0).map(key => data.progressWall.responses[key]).filter(value => String(value || '').trim());
    return values.length ? stage.title + ': ' + values.join(' | ') : '';
  }).filter(Boolean);
}

function formatOpenAnswers(data) {
  return data.openQuestions.availableQuestions.map(question => {
    const answer = String(data.openQuestions.answers[question.id] || '').trim();
    return answer ? question.question + ': ' + answer : '';
  }).filter(Boolean);
}

function appendSection(body, heading, lines) {
  body.appendParagraph(heading).setHeading(DocumentApp.ParagraphHeading.HEADING1);
  if (!lines.length) body.appendParagraph('Sección sin respuestas'); else lines.forEach(line => body.appendParagraph(String(line)));
}

function appendKeyValueTable(body, rows) { body.appendTable(rows.map(row => [String(row[0]), boundedText(row[1], 1000, false)])); }
function isWallStageComplete(stageId, responses, steps) {
  const has = fieldId => Boolean(boundedText(responses[stageId + ':' + fieldId], 3000, false).trim());
  if (stageId === 'problem') return has('problem');
  if (stageId === 'idea') return has('selected_idea');
  if (stageId === 'design') return has('design');
  if (stageId === 'prototype') return steps.every(step => step.completed === true);
  if (stageId === 'error') {
    const outcome = boundedText(responses['error:outcome'], 40, false);
    return outcome === 'found'
      ? ['unexpected','step','expected','actual','cause'].every(has)
      : outcome === 'worked' && ['test_method','expected','actual','evidence'].every(has);
  }
  if (stageId === 'redesign') {
    const choice = boundedText(responses['redesign:redesign_choice'], 40, false);
    return choice === 'correction'
      ? ['correction','new_test','result'].every(has)
      : choice === 'improvement'
        ? ['improvement','new_test','result'].every(has)
        : choice === 'none' && ['conclusion','future_improvement'].every(has);
  }
  return false;
}
function sameNumberSet(received, expected) { if (received.length !== expected.length) return false; const sortedReceived = received.slice().sort((a, b) => a - b); const sortedExpected = expected.slice().sort((a, b) => a - b); return sortedReceived.every((number, index) => number === sortedExpected[index]); }
function submissionPropertyKey(submissionId) { return 'confirmed_submission:' + submissionId; }
function purgeExpiredSubmissionIds(properties) { const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000; const stored = properties.getProperties(); Object.keys(stored).forEach(key => { if (key.indexOf('confirmed_submission:') === 0 && Number(stored[key]) < cutoff) properties.deleteProperty(key); }); }
function warnOptionalAnomaly(submissionId, message) { console.warn('Entrega ' + boundedText(submissionId, 100, false) + ': ' + message); }
function buildTeacherReportFileName(data) { return ['Reporte_Docente_Practica', safeFilePart(String(data.practiceNumber || '').replace(/[^0-9]/g, '') || data.practiceNumber), safeFilePart(data.studentName), safeFilePart(data.studentGroup), safeFilePart(data.studentDate), safeFilePart(data.submissionId)].join('_') + '.pdf'; }
function boundedText(value, maxLength, required) { const text = String(value === undefined || value === null ? '' : value).trim().substring(0, maxLength); if (required && !text) throw new Error('Dato obligatorio ausente.'); return text; }
function safeFilePart(value) { return boundedText(value, 70, false).replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]+/g, '_') || 'sin_dato'; }
function unique(values) { return values.filter((value, index) => values.indexOf(value) === index); }
function isPlainObject(value) { return value && typeof value === 'object' && !Array.isArray(value); }
function trashFile(fileId) { if (!fileId) return; try { DriveApp.getFileById(fileId).setTrashed(true); } catch (error) { console.warn('No se pudo limpiar archivo: ' + error.message); } }
function escapeHtml(value) { return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); }
function appendSpreadsheetRecord(data, evidenceLinks) { try { const spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); if (!spreadsheet) return; const sheet = spreadsheet.getActiveSheet(); if (sheet.getLastRow() === 0) sheet.appendRow(['Fecha', 'Alumno', 'Grupo', 'Práctica', 'Pasos', 'Evidencias']); sheet.appendRow([data.formattedDate || new Date().toLocaleString(), data.studentName, data.studentGroup, data.practiceTitle, data.steps.filter(step => step.completed).length + '/' + data.steps.length, evidenceLinks.length]); } catch (error) { console.warn('No se registró en hoja: ' + error.message); } }
function jsonResponse(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }

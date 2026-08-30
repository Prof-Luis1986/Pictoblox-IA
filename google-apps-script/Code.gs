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

function doGet() {
  return jsonResponse({ status: 'ok', service: 'PictoBlox IA Educativa', timestamp: new Date().toISOString() });
}

function doPost(e) {
  let createdEvidenceIds = [];
  let reportFileId = '';
  let temporaryDocumentId = '';
  let submissionId = '';
  try {
    if (!e || !e.postData || !e.postData.contents) throw new Error('Solicitud vacía.');
    const data = JSON.parse(e.postData.contents);
    submissionId = validateSubmission(data);
    const evidenceLinks = saveEvidenceFiles(data.evidenceAttachments || [], data, createdEvidenceIds);
    delete data.evidenceAttachments;
    const grade = calculateTeacherGrade(data);
    const report = saveTeacherReport(data, grade, evidenceLinks);
    reportFileId = report.fileId;
    temporaryDocumentId = report.temporaryDocumentId;
    appendSpreadsheetRecord(data, evidenceLinks);
    return jsonResponse({ status: 'success', message: 'Práctica recibida correctamente.', submissionId: submissionId, evidenceCount: 0 });
  } catch (error) {
    trashFile(reportFileId);
    trashFile(temporaryDocumentId);
    createdEvidenceIds.forEach(trashFile);
    console.error('Entrega ' + (submissionId || 'sin submissionId') + ': ' + error.message);
    return jsonResponse({ status: 'error', message: 'No fue posible procesar la entrega.', submissionId: submissionId });
  }
}

function validateSubmission(data) {
  const submissionId = boundedText(data.submissionId, 100, true);
  boundedText(data.studentName, 100, true);
  boundedText(data.studentGroup, 60, true);
  boundedText(data.studentDate, 20, true);
  boundedText(data.practiceId, 80, true);
  ['grade', 'privateGrade', 'percentage', 'weights', 'teacherGrade', 'quizScore'].forEach(function(field) {
    if (Object.prototype.hasOwnProperty.call(data, field)) throw new Error('El cliente no puede enviar resultados calculados.');
  });
  if (!Array.isArray(data.steps)) throw new Error('Pasos inválidos.');
  data.steps.forEach(function(step) {
    if (!step || !Number.isFinite(Number(step.stepNumber)) || typeof step.title !== 'string' || typeof step.completed !== 'boolean') throw new Error('Paso inválido.');
    boundedText(step.title, 200, true);
  });
  if (data.steps.length === 0 && data.practiceId !== 't1-extra-act7') throw new Error('La práctica no contiene pasos verificables.');
  if (data.steps.length > 0 && !data.steps.every(step => step.completed === true)) throw new Error('Los pasos técnicos no están completos.');
  if (!data.progressWall || !Array.isArray(data.progressWall.availableStages) || !Array.isArray(data.progressWall.respondedStageIds) || !isPlainObject(data.progressWall.responses)) throw new Error('Muro inválido.');
  if (!data.openQuestions || !Array.isArray(data.openQuestions.availableQuestions) || !isPlainObject(data.openQuestions.answers)) throw new Error('Preguntas abiertas inválidas.');
  if (!Array.isArray(data.quizAnswers) || !Array.isArray(data.experiments)) throw new Error('Secciones académicas inválidas.');
  limitAcademicText(data);
  return submissionId;
}

function limitAcademicText(data) {
  Object.keys(data.progressWall.responses).forEach(key => { data.progressWall.responses[key] = boundedText(data.progressWall.responses[key], 3000, false); });
  Object.keys(data.openQuestions.answers).forEach(key => { data.openQuestions.answers[key] = boundedText(data.openQuestions.answers[key], 3000, false); });
  data.quizAnswers.forEach(answer => {
    answer.questionText = boundedText(answer.questionText, 800, false);
    answer.selectedOptionText = boundedText(answer.selectedOptionText, 800, false);
    answer.answered = answer.answered === true;
    answer.isCorrect = answer.answered ? answer.isCorrect === true : null;
  });
  data.experiments.forEach(experiment => {
    experiment.title = boundedText(experiment.title, 300, false);
    experiment.selectedOption = boundedText(experiment.selectedOption, 1000, false);
    experiment.notesOrAnswer = boundedText(experiment.notesOrAnswer, 3000, false);
  });
  data.reflectionAnswer = boundedText(data.reflectionAnswer, 3000, false);
}

function calculateTeacherGrade(data) {
  const availableStageIds = unique(data.progressWall.availableStages.map(stage => boundedText(stage.id, 40, false)).filter(Boolean));
  const respondedStageIds = unique(data.progressWall.respondedStageIds.map(String)).filter(id => availableStageIds.includes(id));
  const availableQuestions = unique(data.openQuestions.availableQuestions.map(question => boundedText(question.id, 100, false)).filter(Boolean));
  const openCompleted = availableQuestions.filter(id => boundedText(data.openQuestions.answers[id], 3000, false).trim()).length;
  const quizAnswers = data.quizAnswers;
  const experiments = data.experiments;
  const hasReflection = Boolean(boundedText(data.reflectionPrompt, 1000, false));
  const counts = {
    steps: { completed: data.steps.filter(step => step.completed === true).length, available: data.steps.length },
    wall: { completed: respondedStageIds.length, available: availableStageIds.length },
    openQuestions: { completed: openCompleted, available: availableQuestions.length },
    quiz: { completed: quizAnswers.filter(answer => answer.answered === true && answer.isCorrect === true).length, available: quizAnswers.length },
    experimentsReflection: { completed: experiments.filter(experiment => boundedText(experiment.notesOrAnswer || experiment.selectedOption, 3000, false).trim()).length + (hasReflection && data.reflectionAnswer.trim() ? 1 : 0), available: experiments.length + (hasReflection ? 1 : 0) }
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
  appendSection(body, 'Pasos técnicos', data.steps.map(step => (step.completed ? 'COMPLETADO - ' : 'PENDIENTE - ') + 'Paso ' + step.stepNumber + ': ' + step.title));
  appendSection(body, 'Muro del Progreso', formatWallAnswers(data));
  appendSection(body, 'Preguntas abiertas', formatOpenAnswers(data));
  appendSection(body, 'Cuestionario', data.quizAnswers.map((answer, index) => (index + 1) + '. ' + answer.questionText + ': ' + (answer.answered ? answer.selectedOptionText + ' - ' + (answer.isCorrect ? 'Correcta' : 'Incorrecta') : 'Sin responder')));
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
function buildTeacherReportFileName(data) { return ['Reporte_Docente_Practica', safeFilePart(String(data.practiceNumber || '').replace(/[^0-9]/g, '') || data.practiceNumber), safeFilePart(data.studentName), safeFilePart(data.studentGroup), safeFilePart(data.studentDate), safeFilePart(data.submissionId)].join('_') + '.pdf'; }
function boundedText(value, maxLength, required) { const text = String(value === undefined || value === null ? '' : value).trim().substring(0, maxLength); if (required && !text) throw new Error('Dato obligatorio ausente.'); return text; }
function safeFilePart(value) { return boundedText(value, 70, false).replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]+/g, '_') || 'sin_dato'; }
function unique(values) { return values.filter((value, index) => values.indexOf(value) === index); }
function isPlainObject(value) { return value && typeof value === 'object' && !Array.isArray(value); }
function trashFile(fileId) { if (!fileId) return; try { DriveApp.getFileById(fileId).setTrashed(true); } catch (error) { console.warn('No se pudo limpiar archivo: ' + error.message); } }
function escapeHtml(value) { return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); }
function appendSpreadsheetRecord(data, evidenceLinks) { try { const spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); if (!spreadsheet) return; const sheet = spreadsheet.getActiveSheet(); if (sheet.getLastRow() === 0) sheet.appendRow(['Fecha', 'Alumno', 'Grupo', 'Práctica', 'Pasos', 'Evidencias']); sheet.appendRow([data.formattedDate || new Date().toLocaleString(), data.studentName, data.studentGroup, data.practiceTitle, data.steps.filter(step => step.completed).length + '/' + data.steps.length, evidenceLinks.length]); } catch (error) { console.warn('No se registró en hoja: ' + error.message); } }
function jsonResponse(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }

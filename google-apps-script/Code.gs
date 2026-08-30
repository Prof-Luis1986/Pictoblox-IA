const RECIPIENTS = ['lmartinez@isb.edu.mx', 'dolidos2022@gmail.com'];
const EVIDENCE_FOLDER_ID = '18RU-WTqq8D67cuAdCVFC4ahQbQ7CSAkL';
const MAX_IMAGES = 3;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = {
  'image/png': true,
  'image/jpeg': true,
  'image/webp': true
};

function doGet() {
  return jsonResponse({
    status: 'ok',
    service: 'PictoBlox IA Educativa',
    timestamp: new Date().toISOString()
  });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('La solicitud no contiene datos.');
    }

    const data = JSON.parse(e.postData.contents);
    if (data.action === 'uploadReceiptPdf') return uploadReceiptPdf(data);
    const studentName = cleanText(data.studentName || 'Alumno sin nombre', 100);
    const practiceNumber = cleanText(data.practiceNumber || 'Práctica', 80);
    const practiceTitle = cleanText(data.practiceTitle || 'Práctica de IA', 160);
    const recipients = RECIPIENTS.join(',');

    const evidenceLinks = saveEvidenceFiles(
      data.evidenceAttachments || [],
      data,
      studentName
    );

    // Evita conservar o reenviar el contenido Base64 en el reporte.
    delete data.evidenceAttachments;
    data.evidenceLinks = evidenceLinks;

    const quizScore = data.quizScore !== undefined ? data.quizScore + '%' : 'N/A';
    const subject = 'Práctica completada: ' + studentName + ' - ' + practiceNumber + ' (' + quizScore + ')';

    MailApp.sendEmail({
      to: recipients,
      subject: subject,
      htmlBody: buildHtmlReport(data),
      name: 'PictoBlox IA Educativa'
    });

    appendSpreadsheetRecord(data, evidenceLinks);

    return jsonResponse({
      status: 'success',
      message: 'Práctica recibida y evidencias guardadas.',
      submissionId: data.submissionId || Utilities.getUuid(),
      evidenceCount: evidenceLinks.length,
      evidenceLinks: evidenceLinks
    });
  } catch (error) {
    console.error(error);
    return jsonResponse({
      status: 'error',
      message: 'Error al procesar la entrega: ' + error.message
    });
  }
}

function saveEvidenceFiles(attachments, data, studentName) {
  if (!Array.isArray(attachments) || attachments.length === 0) return [];
  if (attachments.length > MAX_IMAGES) {
    throw new Error('Sólo se permiten ' + MAX_IMAGES + ' imágenes por entrega.');
  }

  const folder = DriveApp.getFolderById(EVIDENCE_FOLDER_ID);
  const safeStudent = safeFilePart(studentName, 50);
  const safeGroup = safeFilePart(data.studentGroup || 'sin_grupo', 40);
  const safeDate = safeFilePart(data.studentDate || new Date().toISOString().substring(0, 10), 20);
  const safePractice = safeFilePart(data.practiceId || 'practica', 40);
  const safeSubmission = safeFilePart(data.submissionId || Utilities.getUuid(), 80);

  return attachments.map(function (attachment, index) {
    if (!attachment || !ALLOWED_IMAGE_TYPES[attachment.mimeType]) {
      throw new Error('Una evidencia tiene un formato no permitido.');
    }

    const bytes = Utilities.base64Decode(attachment.base64Data || '');
    if (!bytes.length) throw new Error('Una imagen está vacía.');
    if (bytes.length > MAX_IMAGE_BYTES) {
      throw new Error('Una imagen supera el límite de 4 MB.');
    }

    const extension = attachment.mimeType === 'image/png'
      ? '.png'
      : attachment.mimeType === 'image/webp'
        ? '.webp'
        : '.jpg';
    const fileName = safeStudent + '_' + safeGroup + '_' + safeDate + '_' + safePractice + '_' + safeSubmission + '_' + (index + 1) + extension;
    const blob = Utilities.newBlob(bytes, attachment.mimeType, fileName);
    const file = folder.createFile(blob);

    return {
      id: file.getId(),
      name: file.getName(),
      url: file.getUrl()
    };
  });
}

function uploadReceiptPdf(data) {
  try {
    if (!data.submissionId || data.mimeType !== 'application/pdf' || !data.base64Data) throw new Error('Comprobante PDF inválido.');
    const bytes = Utilities.base64Decode(data.base64Data);
    if (bytes.length > 10 * 1024 * 1024) throw new Error('El PDF supera el límite de 10 MB.');
    const fileName = safeFilePart(String(data.fileName || 'comprobante').replace(/\.pdf$/i, ''), 180) + '.pdf';
    const file = DriveApp.getFolderById(EVIDENCE_FOLDER_ID).createFile(Utilities.newBlob(bytes, 'application/pdf', fileName));
    return jsonResponse({ status: 'success', message: 'Comprobante PDF guardado en Drive.', submissionId: data.submissionId, evidenceCount: 1, evidenceLinks: [{ id: file.getId(), name: file.getName(), url: file.getUrl() }] });
  } catch (error) {
    return jsonResponse({ status: 'error', message: 'No se pudo guardar el PDF: ' + error.message, submissionId: data.submissionId || '' });
  }
}

function buildHtmlReport(data) {
  const studentName = escapeHtml(data.studentName || 'Alumno sin nombre');
  const studentGroup = escapeHtml(data.studentGroup || 'No especificado');
  const practiceNumber = escapeHtml(data.practiceNumber || 'Práctica');
  const practiceTitle = escapeHtml(data.practiceTitle || '');
  const courseTitle = escapeHtml(data.courseTitle || 'PictoBlox IA Educativa');
  const formattedDate = escapeHtml(data.formattedDate || new Date().toLocaleString());
  const completed = Number(data.completedStepsCount || 0);
  const total = Number(data.totalSteps || 0);

  let html = '<div style="font-family:Arial,sans-serif;background:#0f172a;color:#f8fafc;padding:20px">';
  html += '<div style="max-width:680px;margin:auto;background:#020617;border:1px solid #334155;border-radius:16px;overflow:hidden">';
  html += '<div style="padding:24px;background:#064e3b;border-bottom:2px solid #10b981">';
  html += '<h1 style="margin:0;color:#6ee7b7;font-size:22px">' + practiceNumber + ': ' + practiceTitle + '</h1>';
  html += '<p style="color:#cbd5e1">' + courseTitle + '</p></div>';
  html += '<div style="padding:22px">';
  html += reportCard('DATOS DEL ALUMNO',
    '<p><b>Nombre:</b> ' + studentName + '</p>' +
    '<p><b>Grupo:</b> ' + studentGroup + '</p>' +
    '<p><b>Fecha:</b> ' + formattedDate + '</p>' +
    '<p><b>Pasos completados:</b> ' + completed + ' de ' + total + '</p>');

  if (data.studentNotes) {
    html += reportCard('COMENTARIOS DEL ALUMNO', '<p>' + escapeHtml(data.studentNotes) + '</p>');
  }

  if (Array.isArray(data.quizAnswers) && data.quizAnswers.length) {
    let quizHtml = '<p><b>Calificación:</b> ' + escapeHtml(String(data.quizScore || 0)) + '%</p>';
    data.quizAnswers.forEach(function (question, index) {
      quizHtml += '<div style="margin-top:10px;padding:10px;background:#020617;border-left:3px solid ' + (!question.answered ? '#64748b' : question.isCorrect ? '#10b981' : '#f43f5e') + '">';
      quizHtml += '<b>' + (index + 1) + '. ' + escapeHtml(question.questionText || '') + '</b>';
      quizHtml += '<p>Respuesta: ' + escapeHtml(question.answered ? (question.selectedOptionText || '') : 'Sin responder') + '</p></div>';
    });
    html += reportCard('RESULTADOS DEL CUESTIONARIO', quizHtml);
  }

  if (Array.isArray(data.experiments) && data.experiments.length) {
    let experimentHtml = '';
    data.experiments.forEach(function (experiment) {
      experimentHtml += '<p><b>' + escapeHtml(experiment.title || '') + ':</b> ' + escapeHtml(experiment.notesOrAnswer || experiment.selectedOption || 'Sin respuesta') + '</p>';
    });
    html += reportCard('EXPERIMENTOS', experimentHtml);
  }

  if (data.reflectionAnswer) {
    html += reportCard('REFLEXIÓN', '<p>' + escapeHtml(data.reflectionAnswer) + '</p>');
  }

  if (Array.isArray(data.evidenceLinks) && data.evidenceLinks.length) {
    let evidenceHtml = '<p>Las imágenes se guardaron en la carpeta de evidencias del curso:</p><ul>';
    data.evidenceLinks.forEach(function (evidence) {
      evidenceHtml += '<li><a style="color:#34d399" href="' + escapeHtml(evidence.url) + '">' + escapeHtml(evidence.name) + '</a></li>';
    });
    evidenceHtml += '</ul>';
    html += reportCard('CAPTURAS E IMÁGENES DE EVIDENCIA', evidenceHtml);
  }

  html += '</div><div style="padding:16px;text-align:center;color:#64748b;border-top:1px solid #1e293b">PictoBlox IA Educativa</div>';
  html += '</div></div>';
  return html;
}

function appendSpreadsheetRecord(data, evidenceLinks) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) return;
    const sheet = spreadsheet.getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Fecha', 'Alumno', 'Grupo', 'Práctica', 'Pasos', 'Calificación', 'Comentarios', 'Evidencias']);
    }
    sheet.appendRow([
      data.formattedDate || new Date().toLocaleString(),
      data.studentName || '',
      data.studentGroup || '',
      data.practiceTitle || '',
      (data.completedStepsCount || 0) + '/' + (data.totalSteps || 0),
      data.quizScore !== undefined ? data.quizScore : '',
      data.studentNotes || '',
      evidenceLinks.map(function (item) { return item.url; }).join('\n')
    ]);
  } catch (error) {
    console.warn('No se registró en una hoja de cálculo: ' + error.message);
  }
}

function reportCard(title, content) {
  return '<div style="margin-bottom:16px;padding:16px;background:#0f172a;border:1px solid #1e293b;border-radius:12px">' +
    '<h2 style="margin:0 0 10px;color:#38bdf8;font-size:15px">' + title + '</h2>' + content + '</div>';
}

function cleanText(value, maxLength) {
  return String(value || '').trim().substring(0, maxLength);
}

function safeFilePart(value, maxLength) {
  return String(value || '')
    .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]+/g, '_')
    .substring(0, maxLength) || 'archivo';
}

function escapeHtml(value) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

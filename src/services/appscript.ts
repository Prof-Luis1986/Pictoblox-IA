import { PracticeSubmissionPayload, SubmissionResult } from '../types';
import { classifySubmissionServerPayload, classifyUnreadableResponse } from './submissionConfirmation';

export const DESTINATION_EMAILS = ['lmartinez@isb.edu.mx', 'dolidos2022@gmail.com'];
export const EVIDENCE_DRIVE_FOLDER_ID = '18RU-WTqq8D67cuAdCVFC4ahQbQ7CSAkL';

export const DEFAULT_APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz0GBLsHlOUUZQltKg8vIfE3nU9JZChx1SDhdFzDjGZ_NYS8Mpw-OinaODREaI5PKXsDg/exec';

/**
 * Returns the configured Google Apps Script Web App URL.
 */
export const getAppScriptUrl = (): string => {
  const envUrl = ((import.meta as any).env?.VITE_APPSCRIPT_WEBAPP_URL || '') as string;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.trim();
  }
  return DEFAULT_APPSCRIPT_URL;
};

/**
 * Generates the HTML body for the email sent to teachers.
 */
export const generateEmailHtml = (payload: PracticeSubmissionPayload): string => {
  const scoreBadgeColor = (payload.quizScore ?? 0) >= 70 ? '#10b981' : '#f59e0b';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 680px; margin: 0 auto; background-color: #020617; border: 1px solid #334155; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%); padding: 30px 24px; border-bottom: 2px solid #10b981; }
    .header h1 { margin: 0 0 8px 0; font-size: 22px; color: #34d399; font-weight: 800; }
    .header p { margin: 0; font-size: 14px; color: #cbd5e1; }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #34d399; border-radius: 999px; font-size: 12px; font-weight: bold; margin-top: 10px; }
    .content { padding: 24px; }
    .card { background-color: #0f172a; border: 1px solid #1e293b; border-radius: 14px; padding: 18px; margin-bottom: 20px; }
    .card h2 { margin-top: 0; margin-bottom: 12px; font-size: 16px; color: #38bdf8; border-bottom: 1px solid #334155; padding-bottom: 8px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 13px; }
    .info-item { background: #020617; padding: 10px; border-radius: 8px; border: 1px solid #1e293b; }
    .info-label { font-size: 11px; color: #94a3b8; font-weight: bold; text-transform: uppercase; }
    .info-val { font-size: 14px; color: #f8fafc; font-weight: 600; margin-top: 2px; }
    .quiz-item { background: #020617; border: 1px solid #1e293b; border-radius: 10px; padding: 14px; margin-bottom: 12px; }
    .quiz-item.correct { border-left: 4px solid #10b981; }
    .quiz-item.incorrect { border-left: 4px solid #f43f5e; }
    .quiz-question { font-size: 14px; font-weight: bold; color: #e2e8f0; margin-bottom: 8px; }
    .quiz-ans { font-size: 13px; margin: 4px 0; }
    .tag-correct { color: #34d399; font-weight: bold; }
    .tag-incorrect { color: #fb7185; font-weight: bold; }
    .exp-item { background: #020617; border: 1px solid #1e293b; border-radius: 10px; padding: 12px; margin-bottom: 10px; }
    .exp-title { font-size: 13px; font-weight: bold; color: #38bdf8; }
    .exp-text { font-size: 13px; color: #cbd5e1; margin-top: 4px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; background: #020617; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">🤖 PICTOBLOX IA EDUCATIVA</span>
      <h1>${payload.practiceNumber}: ${payload.practiceTitle}</h1>
      <p>${payload.courseTitle} • Tomo 1</p>
    </div>

    <div class="content">
      <!-- Student Info Card -->
      <div class="card">
        <h2>👤 DATOS DEL ALUMNO</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Nombre Completo</div>
            <div class="info-val">${payload.studentName}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Grado / Grupo / Matrícula</div>
            <div class="info-val">${payload.studentGroup || 'No especificado'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Fecha y Hora de Entrega</div>
            <div class="info-val">${payload.formattedDate}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Pasos Completados</div>
            <div class="info-val">${payload.completedStepsCount} de ${payload.totalSteps} pasos (${Math.round((payload.completedStepsCount / (payload.totalSteps || 1)) * 100)}%)</div>
          </div>
        </div>
        ${payload.studentNotes ? `
          <div style="margin-top: 12px; padding: 10px; background: #020617; border-radius: 8px; border: 1px solid #334155; font-size: 13px;">
            <div class="info-label">Comentarios o dudas del alumno:</div>
            <div style="color: #cbd5e1; margin-top: 4px;">"${payload.studentNotes}"</div>
          </div>
        ` : ''}
      </div>

      <!-- Test / Quiz Results -->
      ${payload.quizAnswers && payload.quizAnswers.length > 0 ? `
        <div class="card">
          <h2>📝 RESULTADOS DEL TEST DE VALIDACIÓN</h2>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; background: #020617; padding: 12px; border-radius: 10px; border: 1px solid #334155;">
            <span style="font-size: 14px; color: #cbd5e1;">Calificación Obtenida:</span>
            <span style="font-size: 20px; font-weight: 800; color: ${scoreBadgeColor};">${payload.quizScore ?? 0}% (${payload.quizCorrectAnswers || 0} correctas; ${payload.quizAnsweredQuestions || 0}/${payload.quizTotalQuestions || 0} respondidas)</span>
          </div>

          ${payload.quizAnswers.map((q, i) => `
            <div class="quiz-item ${!q.answered ? '' : q.isCorrect ? 'correct' : 'incorrect'}">
              <div class="quiz-question">${i + 1}. ${q.questionText}</div>
              <div class="quiz-ans">
                <strong>Respuesta del Alumno:</strong> 
                <span class="${!q.answered ? '' : q.isCorrect ? 'tag-correct' : 'tag-incorrect'}">
                  ${q.answered ? `${q.selectedOptionText} (${q.isCorrect ? '✓ Correcto' : '✗ Incorrecto'})` : 'Sin responder'}
                </span>
              </div>
              ${q.answered && !q.isCorrect ? `
                <div class="quiz-ans" style="color: #94a3b8;">
                  <strong>Respuesta Correcta:</strong> ${q.correctOptionText}
                </div>
              ` : ''}
              <div style="font-size: 12px; color: #64748b; margin-top: 6px; font-style: italic;">
                Explicación: ${q.explanation}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Experiments Card -->
      ${payload.experiments && payload.experiments.length > 0 ? `
        <div class="card">
          <h2>🧪 RESULTADOS DE EXPERIMENTOS Y LABORATORIO</h2>
          ${payload.experiments.map((exp, i) => `
            <div class="exp-item">
              <div class="exp-title">Experimento ${i + 1}: ${exp.title}</div>
              <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">${exp.instruction}</div>
              ${exp.selectedOption ? `
                <div class="exp-text"><strong>Opción seleccionada:</strong> ${exp.selectedOption}</div>
              ` : ''}
              ${exp.notesOrAnswer ? `
                <div class="exp-text"><strong>Respuesta / Observaciones:</strong> ${exp.notesOrAnswer}</div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Reflection Card -->
      ${payload.reflectionAnswer || payload.reflectionPrompt ? `
        <div class="card">
          <h2>💡 REFLEXIÓN Y CONCLUSIÓN</h2>
          ${payload.reflectionPrompt ? `
            <div style="font-size: 13px; color: #94a3b8; margin-bottom: 6px;">
              <strong>Pregunta:</strong> ${payload.reflectionPrompt}
            </div>
          ` : ''}
          ${payload.reflectionAnswer ? `
            <div style="font-size: 14px; color: #e2e8f0; background: #020617; padding: 12px; border-radius: 8px; border: 1px solid #334155;">
              "${payload.reflectionAnswer}"
            </div>
          ` : ''}
        </div>
      ` : ''}
      ${payload.evidenceAttachments && payload.evidenceAttachments.length > 0 ? `
        <div class="card">
          <h2>📷 EVIDENCIAS ADJUNTAS</h2>
          <p>${payload.evidenceAttachments.length} imagen(es) enviadas para guardarse en la carpeta de Drive del curso.</p>
        </div>
      ` : ''}
    </div>

    <div class="footer">
      <p>Reporte generado automáticamente por la plataforma educativa PictoBlox IA.</p>
      <p>Destinatarios: ${payload.recipients.join(', ')}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

/**
 * Generates copy-paste ready Google Apps Script (Code.gs) for deployment.
 */
export const generateAppsScriptCode = (): string => {
  return `/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: PictoBlox IA Educativa - Receptor de Prácticas
 * =========================================================================
 *
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. Abre https://script.google.com/ y crea un "Nuevo proyecto".
 * 2. Pega todo este código en el archivo 'Código.gs' (reemplazando cualquier contenido previo).
 * 3. Haz clic en "Implementar" (Deploy) > "Nueva implementación" (New deployment).
 * 4. Selecciona tipo: "Aplicación web" (Web app).
 * 5. Configura:
 *    - Ejecutar como: "Yo" (tu cuenta de Google).
 *    - Quién tiene acceso: "Cualquier persona" (Anyone - sin necesidad de iniciar sesión).
 * 6. Haz clic en "Implementar" y autoriza los permisos de Gmail / MailApp y Google Drive.
 * 7. Copia la URL de la aplicación web generada (termina en /exec) y pégala en la plataforma.
 * =========================================================================
 */

const RECIPIENTS = ["lmartinez@isb.edu.mx", "dolidos2022@gmail.com"];
const EVIDENCE_FOLDER_ID = "18RU-WTqq8D67cuAdCVFC4ahQbQ7CSAkL";

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "ok",
      service: "PictoBlox IA Educativa - Apps Script Receptor",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    if (data.action === "uploadTeacherReport") return uploadTeacherReport(data);

    var studentName = data.studentName || "Alumno Desconocido";
    var practiceTitle = data.practiceTitle || "Práctica de IA";
    var practiceNumber = data.practiceNumber || "Práctica";
    var courseTitle = data.courseTitle || "PictoBlox IA Educativa";
    var quizScore = data.quizScore !== undefined ? data.quizScore + "%" : "N/A";
    data.evidenceLinks = saveEvidenceFiles(data.evidenceAttachments || [], data, studentName);
    delete data.evidenceAttachments;
    
    // Asunto del correo
    var subject = "🎓 Práctica Completada: " + studentName + " - " + practiceNumber + " (" + quizScore + ")";
    
    // Los destinatarios son exclusivamente los definidos en el servidor.
    // Nunca se aceptan direcciones recibidas desde el cliente.
    var emailList = RECIPIENTS.join(",");

    // Construcción del correo HTML
    var htmlBody = buildHtmlReport(data);

    // Envío del correo mediante MailApp
    MailApp.sendEmail({
      to: emailList,
      subject: subject,
      htmlBody: htmlBody,
      name: "PictoBlox IA Educativa"
    });

    // Opcional: Registrar en hoja de cálculo si está vinculada
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      if (ss) {
        var sheet = ss.getActiveSheet();
        if (sheet.getLastRow() === 0) {
          sheet.appendRow(["Fecha", "Alumno", "Grupo", "Práctica", "Pasos", "Quiz Score", "Comentarios"]);
        }
        sheet.appendRow([
          data.formattedDate || new Date().toLocaleString(),
          studentName,
          data.studentGroup || "",
          practiceTitle,
          (data.completedStepsCount || 0) + "/" + (data.totalSteps || 0),
          quizScore,
          data.studentNotes || ""
        ]);
      }
    } catch (sheetErr) {
      Logger.log("Nota: No hay Google Sheet vinculado o permisos omitidos: " + sheetErr.message);
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Práctica recibida y correos enviados exitosamente a " + emailList,
        submissionId: data.submissionId || Utilities.getUuid(),
        evidenceCount: data.evidenceLinks.length,
        evidenceLinks: data.evidenceLinks
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error en doPost: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: "Error al procesar entrega: " + error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function saveEvidenceFiles(attachments, data, studentName) {
  if (!attachments || attachments.length === 0) return [];
  if (attachments.length > 3) throw new Error("Solo se permiten 3 imágenes por entrega.");
  var folder = DriveApp.getFolderById(EVIDENCE_FOLDER_ID);
  var allowedTypes = { "image/png": true, "image/jpeg": true, "image/webp": true };
  var safeStudent = String(studentName || "Alumno").replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]+/g, "_").substring(0, 50);
  var safeGroup = String(data.studentGroup || "sin_grupo").replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]+/g, "_").substring(0, 40);
  var safeDate = String(data.studentDate || new Date().toISOString().substring(0, 10)).replace(/[^a-zA-Z0-9_-]+/g, "_");
  var safePractice = String(data.practiceId || "practica").replace(/[^a-zA-Z0-9_-]+/g, "_").substring(0, 40);
  var submission = String(data.submissionId || Utilities.getUuid()).replace(/[^a-zA-Z0-9_-]+/g, "_");
  return attachments.map(function(attachment, index) {
    if (!allowedTypes[attachment.mimeType]) throw new Error("Tipo de imagen no permitido.");
    var bytes = Utilities.base64Decode(attachment.base64Data || "");
    if (bytes.length > 4 * 1024 * 1024) throw new Error("Una imagen supera el límite de 4 MB.");
    var originalExtension = attachment.mimeType === "image/png" ? ".png" : attachment.mimeType === "image/webp" ? ".webp" : ".jpg";
    var fileName = safeStudent + "_" + safeGroup + "_" + safeDate + "_" + safePractice + "_" + submission + "_" + (index + 1) + originalExtension;
    var blob = Utilities.newBlob(bytes, attachment.mimeType, fileName);
    var file = folder.createFile(blob);
    return { name: file.getName(), url: file.getUrl(), id: file.getId() };
  });
}

function uploadTeacherReport(data) {
  try {
    if (!data.submissionId) throw new Error("submissionId obligatorio.");
    if (data.mimeType !== "application/pdf") throw new Error("MIME inválido.");
    if (!data.base64Data) throw new Error("Base64 obligatorio.");
    var bytes = Utilities.base64Decode(data.base64Data);
    if (!bytes.length) throw new Error("El reporte está vacío.");
    if (bytes.length > 10 * 1024 * 1024) throw new Error("El PDF supera el límite de 10 MB.");
    var safeName = String(data.fileName || "Reporte_Docente.pdf").replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_.-]+/g, "_");
    var file = DriveApp.getFolderById(EVIDENCE_FOLDER_ID).createFile(Utilities.newBlob(bytes, "application/pdf", safeName));
    MailApp.sendEmail({ to: RECIPIENTS.join(","), subject: "Reporte privado del docente — " + data.submissionId, htmlBody: '<p>El reporte privado está disponible en Drive:</p><p><a href="' + file.getUrl() + '">Abrir reporte docente</a></p>', name: "PictoBlox IA Educativa" });
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Reporte docente guardado.", submissionId: data.submissionId })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No se pudo guardar el reporte docente.", submissionId: data.submissionId || "" })).setMimeType(ContentService.MimeType.JSON);
  }
}

function buildHtmlReport(data) {
  var scoreBadgeColor = (data.quizScore || 0) >= 70 ? "#10b981" : "#f59e0b";
  var stepsPercent = Math.round(((data.completedStepsCount || 0) / (data.totalSteps || 1)) * 100);

  var html = '<div style="font-family: Arial, sans-serif; background: #0f172a; color: #f8fafc; padding: 20px;">';
  html += '<div style="max-width: 650px; margin: 0 auto; background: #020617; border: 1px solid #334155; border-radius: 16px; overflow: hidden;">';
  
  // Header
  html += '<div style="background: linear-gradient(135deg, #064e3b, #0f172a); padding: 24px; border-bottom: 2px solid #10b981;">';
  html += '<div style="display:inline-block; padding: 4px 10px; background: rgba(16,185,129,0.2); border: 1px solid #10b981; border-radius: 20px; font-size: 11px; font-weight: bold; color: #34d399; margin-bottom: 8px;">PICTOBLOX IA EDUCATIVA</div>';
  html += '<h1 style="margin: 0 0 6px 0; font-size: 20px; color: #34d399;">' + (data.practiceNumber || "Práctica") + ': ' + (data.practiceTitle || "") + '</h1>';
  html += '<p style="margin: 0; font-size: 13px; color: #94a3b8;">' + (data.courseTitle || "") + '</p>';
  html += '</div>';

  html += '<div style="padding: 20px;">';

  // Datos alumno
  html += '<div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 16px;">';
  html += '<h3 style="margin: 0 0 10px 0; font-size: 14px; color: #38bdf8; border-bottom: 1px solid #334155; padding-bottom: 6px;">👤 DATOS DEL ALUMNO</h3>';
  html += '<p style="margin: 4px 0; font-size: 13px;"><strong>Nombre:</strong> ' + (data.studentName || "") + '</p>';
  html += '<p style="margin: 4px 0; font-size: 13px;"><strong>Grado/Grupo:</strong> ' + (data.studentGroup || "No especificado") + '</p>';
  html += '<p style="margin: 4px 0; font-size: 13px;"><strong>Fecha:</strong> ' + (data.formattedDate || new Date().toLocaleString()) + '</p>';
  html += '<p style="margin: 4px 0; font-size: 13px;"><strong>Pasos Realizados:</strong> ' + (data.completedStepsCount || 0) + ' de ' + (data.totalSteps || 0) + ' (' + stepsPercent + '%)</p>';
  if (data.studentNotes) {
    html += '<p style="margin: 8px 0 0 0; padding: 8px; background: #020617; border-radius: 6px; font-size: 12px; color: #cbd5e1;"><strong>Comentarios del alumno:</strong> "' + data.studentNotes + '"</p>';
  }
  html += '</div>';

  // Quiz
  if (data.quizAnswers && data.quizAnswers.length > 0) {
    html += '<div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 16px;">';
    html += '<h3 style="margin: 0 0 10px 0; font-size: 14px; color: #38bdf8; border-bottom: 1px solid #334155; padding-bottom: 6px;">📝 TEST DE CONCEPTOS (SCORE: ' + (data.quizScore || 0) + '%)</h3>';
    for (var i = 0; i < data.quizAnswers.length; i++) {
      var q = data.quizAnswers[i];
      var borderCol = !q.answered ? "#64748b" : q.isCorrect ? "#10b981" : "#f43f5e";
      html += '<div style="background: #020617; border-left: 3px solid ' + borderCol + '; border-radius: 6px; padding: 10px; margin-bottom: 8px; font-size: 12px;">';
      html += '<p style="margin: 0 0 4px 0; font-weight: bold; color: #e2e8f0;">' + (i+1) + '. ' + q.questionText + '</p>';
      html += '<p style="margin: 2px 0; color: ' + (!q.answered ? "#94a3b8" : q.isCorrect ? "#34d399" : "#fb7185") + ';">Respuesta Alumno: ' + (q.answered ? q.selectedOptionText + ' (' + (q.isCorrect ? "Correcto" : "Incorrecto") + ')' : 'Sin responder') + '</p>';
      if (q.answered && !q.isCorrect) {
        html += '<p style="margin: 2px 0; color: #94a3b8;">Correcta: ' + q.correctOptionText + '</p>';
      }
      html += '</div>';
    }
    html += '</div>';
  }

  // Experimentos
  if (data.experiments && data.experiments.length > 0) {
    html += '<div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 16px;">';
    html += '<h3 style="margin: 0 0 10px 0; font-size: 14px; color: #38bdf8; border-bottom: 1px solid #334155; padding-bottom: 6px;">🧪 EXPERIMENTOS Y LABORATORIO</h3>';
    for (var j = 0; j < data.experiments.length; j++) {
      var exp = data.experiments[j];
      html += '<div style="background: #020617; border-radius: 6px; padding: 10px; margin-bottom: 8px; font-size: 12px;">';
      html += '<p style="margin: 0 0 2px 0; font-weight: bold; color: #38bdf8;">' + exp.title + '</p>';
      if (exp.selectedOption) html += '<p style="margin: 2px 0;">Opción: ' + exp.selectedOption + '</p>';
      if (exp.notesOrAnswer) html += '<p style="margin: 2px 0; color: #cbd5e1;">Respuestas / Notas: ' + exp.notesOrAnswer + '</p>';
      html += '</div>';
    }
    html += '</div>';
  }

  // Reflexión
  if (data.reflectionAnswer) {
    html += '<div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 16px;">';
    html += '<h3 style="margin: 0 0 8px 0; font-size: 14px; color: #38bdf8;">💡 REFLEXIÓN DEL ALUMNO</h3>';
    html += '<p style="margin: 0; font-size: 13px; color: #e2e8f0; font-style: italic;">"' + data.reflectionAnswer + '"</p>';
    html += '</div>';
  }

  if (data.evidenceLinks && data.evidenceLinks.length > 0) {
    html += '<div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 16px;">';
    html += '<h3 style="margin: 0 0 8px 0; font-size: 14px; color: #38bdf8;">📷 CAPTURAS E IMÁGENES DE EVIDENCIA</h3>';
    for (var k = 0; k < data.evidenceLinks.length; k++) {
      var evidence = data.evidenceLinks[k];
      html += '<p style="margin: 6px 0;"><a style="color: #34d399;" href="' + evidence.url + '">' + evidence.name + '</a></p>';
    }
    html += '</div>';
  }

  html += '</div>';
  html += '<div style="text-align: center; padding: 14px; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b;">Enviado a: ' + RECIPIENTS.join(", ") + '</div>';
  html += '</div></div>';

  return html;
}
`;
};

/**
 * Submits the complete practice payload to Google Apps Script.
 */
export const submitPracticeToAppScript = async (
  payload: PracticeSubmissionPayload
): Promise<SubmissionResult> => {
  const endpoint = getAppScriptUrl();

  if (!endpoint || !endpoint.startsWith('https://script.google.com/')) {
    return {
      state: 'failed',
      message: 'El servicio de entregas no está configurado. Avisa a tu profesor.'
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const unreadable = classifyUnreadableResponse(response.type);
    if (unreadable) return unreadable;
    if (!response.ok) return { state: 'failed', message: `El servidor respondió con el estado ${response.status}.` };
    let server: any;
    try { server = await response.json(); } catch { return { state: 'pending', message: 'Entrega enviada, pendiente de confirmación' }; }
    return classifySubmissionServerPayload(payload.submissionId, server);
  } catch (fetchErr) {
    console.error('No se pudo contactar el receptor de Apps Script:', fetchErr);
    return {
      state: 'failed',
      message: 'No se pudo enviar la práctica. Revisa tu conexión e inténtalo nuevamente.'
    };
  }
};

export const uploadTeacherReportToAppScript = async (submissionId: string, fileName: string, base64Data: string): Promise<SubmissionResult> => {
  try {
    const response = await fetch(getAppScriptUrl(), { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'uploadTeacherReport', submissionId, fileName, mimeType: 'application/pdf', base64Data }) });
    if (!response.ok || response.type === 'opaque') return { state: 'pending', message: 'Reporte docente pendiente.' };
    const server = await response.json();
    if (server.status !== 'success' || server.submissionId !== submissionId) return { state: 'failed', message: 'No se confirmó el reporte docente.' };
    return { state: 'confirmed', message: 'Reporte docente guardado.', submissionId };
  } catch { return { state: 'failed', message: 'No se confirmó el reporte docente.' }; }
};

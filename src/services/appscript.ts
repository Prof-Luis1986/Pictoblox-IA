import { PracticeSubmissionPayload } from '../types';

export const DESTINATION_EMAILS = ['lmartinez@isb.edu.mx', 'dolidos2022@gmail.com'];

export const DEFAULT_APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw3fiqcEkpN3E0Y2LwWAMx5CqrJGRGIawA-UUF_7Uy0cmAAEJoHjbs-iPpn_tIC6_XXkw/exec';

const LOCAL_STORAGE_KEY_URL = 'PICTOBLOX_APPSCRIPT_URL';

/**
 * Returns the configured Google Apps Script Web App URL.
 */
export const getAppScriptUrl = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_URL);
    if (saved && saved.trim() !== '') {
      return saved.trim();
    }
  }
  const envUrl = ((import.meta as any).env?.VITE_APPSCRIPT_WEBAPP_URL || '') as string;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.trim();
  }
  return DEFAULT_APPSCRIPT_URL;
};

/**
 * Saves a custom Google Apps Script Web App URL.
 */
export const setAppScriptUrl = (url: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY_URL, url.trim());
  }
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
            <span style="font-size: 20px; font-weight: 800; color: ${scoreBadgeColor};">${payload.quizScore ?? 0}% (${payload.quizCorrectAnswers || 0}/${payload.quizTotalQuestions || 0} Aciertos)</span>
          </div>

          ${payload.quizAnswers.map((q, i) => `
            <div class="quiz-item ${q.isCorrect ? 'correct' : 'incorrect'}">
              <div class="quiz-question">${i + 1}. ${q.questionText}</div>
              <div class="quiz-ans">
                <strong>Respuesta del Alumno:</strong> 
                <span class="${q.isCorrect ? 'tag-correct' : 'tag-incorrect'}">
                  ${q.selectedOptionText} (${q.isCorrect ? '✓ Correcto' : '✗ Incorrecto'})
                </span>
              </div>
              ${!q.isCorrect ? `
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
 * 6. Haz clic en "Implementar", autoriza los permisos de Gmail / MailApp.
 * 7. Copia la URL de la aplicación web generada (termina en /exec) y pégala en la plataforma.
 * =========================================================================
 */

const RECIPIENTS = ["lmartinez@isb.edu.mx", "dolidos2022@gmail.com"];

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

    var studentName = data.studentName || "Alumno Desconocido";
    var practiceTitle = data.practiceTitle || "Práctica de IA";
    var practiceNumber = data.practiceNumber || "Práctica";
    var courseTitle = data.courseTitle || "PictoBlox IA Educativa";
    var quizScore = data.quizScore !== undefined ? data.quizScore + "%" : "N/A";
    
    // Asunto del correo
    var subject = "🎓 Práctica Completada: " + studentName + " - " + practiceNumber + " (" + quizScore + ")";
    
    // Destinatarios configurados o recibidos en el payload
    var emailList = data.recipients && data.recipients.length > 0 ? data.recipients.join(",") : RECIPIENTS.join(",");

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
        submissionId: data.submissionId || Utilities.getUuid()
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
      var borderCol = q.isCorrect ? "#10b981" : "#f43f5e";
      html += '<div style="background: #020617; border-left: 3px solid ' + borderCol + '; border-radius: 6px; padding: 10px; margin-bottom: 8px; font-size: 12px;">';
      html += '<p style="margin: 0 0 4px 0; font-weight: bold; color: #e2e8f0;">' + (i+1) + '. ' + q.questionText + '</p>';
      html += '<p style="margin: 2px 0; color: ' + (q.isCorrect ? "#34d399" : "#fb7185") + ';">Respuesta Alumno: ' + q.selectedOptionText + ' (' + (q.isCorrect ? "Correcto" : "Incorrecto") + ')</p>';
      if (!q.isCorrect) {
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
): Promise<{ success: boolean; message: string; id?: string }> => {
  const endpoint = getAppScriptUrl();

  if (!endpoint || !endpoint.startsWith('https://script.google.com/')) {
    return {
      success: false,
      message: 'El servicio de entregas no está configurado. Avisa a tu profesor.'
    };
  }

  try {
    // Apps Script responde mediante una redirección. El modo no-cors permite que
    // el navegador entregue el POST sin exponer la respuesta a los alumnos.
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return {
      success: true,
      message: `Entrega recibida para enviarse a ${payload.recipients.join(' y ')}.`,
      id: payload.submissionId
    };
  } catch (fetchErr) {
    console.error('No se pudo contactar el receptor de Apps Script:', fetchErr);
    return {
      success: false,
      message: 'No se pudo enviar la práctica. Revisa tu conexión e inténtalo nuevamente.'
    };
  }
};

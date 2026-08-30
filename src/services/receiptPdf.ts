import { jsPDF } from 'jspdf';
import { ConfirmedEvidence, Practice, PracticeSubmissionPayload } from '../types';
import { OPEN_QUESTIONS_BY_PRACTICE } from '../data/openQuestionsData';

export interface ReceiptPdfInput {
  payload: PracticeSubmissionPayload;
  practice: Practice;
  wallResponses: Record<string, string>;
  openQuestionAnswers: Record<string, string>;
  evidenceLinks: ConfirmedEvidence[];
  evidenceCount: number;
}

export interface GeneratedReceiptPdf { blob: Blob; fileName: string; pageCount: number; }

const safePart = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 70) || 'sin_dato';

export const buildReceiptFileName = (payload: PracticeSubmissionPayload) => {
  const number = safePart(payload.practiceNumber.replace(/[^0-9]/g, '') || payload.practiceNumber);
  return `Practica_${number}_${safePart(payload.studentName)}_${safePart(payload.studentGroup)}_${safePart(payload.studentDate)}_${safePart(payload.submissionId)}.pdf`;
};

export const generateConfirmedReceiptPdf = (input: ReceiptPdfInput): GeneratedReceiptPdf => {
  const { payload, practice, wallResponses, openQuestionAnswers, evidenceLinks, evidenceCount } = input;
  if (!payload.submissionId) throw new Error('La entrega no tiene identificador confirmado.');
  const doc = new jsPDF({ unit: 'pt', format: 'letter', orientation: 'portrait' });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const margin = 48;
  const bottom = 54;
  let y = 52;

  const footer = () => {
    const pages = doc.getNumberOfPages();
    for (let page = 1; page <= pages; page += 1) {
      doc.setPage(page); doc.setFontSize(8); doc.setTextColor(90);
      doc.text(`Fecha: ${payload.studentDate}  |  ID: ${payload.submissionId}`, margin, height - 24);
      doc.text(`Página ${page} de ${pages}`, width - margin, height - 24, { align: 'right' });
    }
  };
  const newPageIfNeeded = (needed = 40) => { if (y + needed > height - bottom) { doc.addPage(); y = 48; } };
  const title = (text: string) => { newPageIfNeeded(44); doc.setFillColor(15, 118, 110); doc.roundedRect(margin, y - 16, width - margin * 2, 28, 5, 5, 'F'); doc.setTextColor(255); doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text(text, margin + 10, y + 2); y += 30; };
  const paragraph = (text: string) => { doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(30); const lines = doc.splitTextToSize(text || 'Sin respuesta.', width - margin * 2); lines.forEach((line: string) => { newPageIfNeeded(15); doc.text(line, margin, y); y += 14; }); y += 6; };
  const item = (label: string, value: string) => { doc.setFont('helvetica', 'bold'); paragraph(`${label}: ${value || 'Sin respuesta.'}`); };

  doc.setFillColor(2, 6, 23); doc.rect(0, 0, width, 104, 'F'); doc.setTextColor(52, 211, 153); doc.setFont('helvetica', 'bold'); doc.setFontSize(19); doc.text('PICTOBLOX IA EDUCATIVA', margin, 42); doc.setTextColor(255); doc.setFontSize(15); doc.text(payload.practiceTitle, margin, 70); doc.setFontSize(10); doc.text(payload.courseTitle, margin, 90); y = 128;
  title('DATOS DE LA ENTREGA CONFIRMADA');
  item('Alumno', payload.studentName); item('Grupo', payload.studentGroup); item('Fecha indicada', payload.studentDate); item('Fecha y hora de entrega', payload.formattedDate); item('Práctica', `${payload.practiceNumber}: ${payload.practiceTitle}`); item('Identificador', payload.submissionId); item('Estado', 'CONFIRMADA');
  title('OBJETIVO O PROBLEMA'); paragraph(wallResponses['problem:problem'] || practice.description);
  title('MURO DEL PROGRESO');
  (practice.progressWallStages || []).forEach(stage => { const choice = stage.id === 'error' ? wallResponses['error:outcome'] : stage.id === 'redesign' ? wallResponses['redesign:redesign_choice'] : ''; const answers = [choice, ...(stage.responseFields || []).map(field => wallResponses[`${stage.id}:${field.id}`])].filter(Boolean); item(stage.title, answers.join('\n') || 'Sin respuesta.'); });
  title('PASOS TÉCNICOS'); practice.steps.forEach(step => paragraph(`${payload.steps.find(item => item.stepNumber === step.stepNumber)?.completed ? 'COMPLETADO' : 'PENDIENTE'} - Paso ${step.stepNumber}: ${step.title}`));
  title('PREGUNTAS ABIERTAS'); (OPEN_QUESTIONS_BY_PRACTICE[practice.id] || []).forEach(question => item(question.question, openQuestionAnswers[question.id])); if (!Object.keys(openQuestionAnswers).length) paragraph('Esta práctica no contiene preguntas abiertas.');
  if (payload.experiments?.length) { title('EXPERIMENTOS Y OBSERVACIONES'); payload.experiments.forEach(exp => item(exp.title, exp.notesOrAnswer || exp.selectedOption || 'Sin respuesta.')); }
  if (payload.quizAnswers?.length) { title('CUESTIONARIO'); payload.quizAnswers.forEach((answer, index) => item(`${index + 1}. ${answer.questionText}`, answer.selectedOptionText)); if (payload.quizScore !== undefined) item('Resultado', `${payload.quizScore}%`); }
  if (payload.reflectionAnswer) { title('REFLEXIÓN O CONCLUSIÓN'); paragraph(payload.reflectionAnswer); }
  title('EVIDENCIAS CONFIRMADAS'); item('Cantidad total', String(evidenceCount)); evidenceLinks.forEach(link => { item('Archivo', link.name); paragraph(link.url); });
  title('CONSTANCIA'); paragraph('Este documento es una copia de la práctica realizada. La recepción fue confirmada por el sistema.');
  footer();
  return { blob: doc.output('blob'), fileName: buildReceiptFileName(payload), pageCount: doc.getNumberOfPages() };
};

export const downloadReceiptPdf = (receipt: GeneratedReceiptPdf) => {
  const url = URL.createObjectURL(receipt.blob);
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = receipt.fileName; anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
};

export const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1] || ''); reader.onerror = () => reject(new Error('No se pudo preparar el PDF para Drive.')); reader.readAsDataURL(blob);
});

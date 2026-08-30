import { jsPDF } from 'jspdf';
import { ConfirmedEvidence, Practice, PracticeSubmissionPayload } from '../types';
import { OPEN_QUESTIONS_BY_PRACTICE } from '../data/openQuestionsData';
import { TeacherGradeResult } from './teacherGrade';

export interface TeacherReportPdfInput {
  payload: PracticeSubmissionPayload;
  practice: Practice;
  wallResponses: Record<string, string>;
  openQuestionAnswers: Record<string, string>;
  evidenceLinks: ConfirmedEvidence[];
  grade: TeacherGradeResult;
  confirmedAt: string;
}

export interface GeneratedTeacherReportPdf { blob: Blob; fileName: string; pageCount: number; }
const safePart = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 70) || 'sin_dato';
export const buildTeacherReportFileName = (payload: PracticeSubmissionPayload) => `Reporte_Docente_Practica_${safePart(payload.practiceNumber.replace(/[^0-9]/g, '') || payload.practiceNumber)}_${safePart(payload.studentName)}_${safePart(payload.studentGroup)}_${safePart(payload.studentDate)}_${safePart(payload.submissionId)}.pdf`;

export const generateTeacherReportPdf = (input: TeacherReportPdfInput): GeneratedTeacherReportPdf => {
  const { payload, practice, wallResponses, openQuestionAnswers, evidenceLinks, grade, confirmedAt } = input;
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const width = doc.internal.pageSize.getWidth(); const height = doc.internal.pageSize.getHeight(); const margin = 46; let y = 48;
  const page = (needed = 35) => { if (y + needed > height - 48) { doc.addPage(); y = 48; } };
  const title = (text: string) => { page(42); doc.setFillColor(15, 118, 110); doc.roundedRect(margin, y - 15, width - margin * 2, 27, 5, 5, 'F'); doc.setTextColor(255); doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.text(text, margin + 9, y + 2); y += 30; };
  const text = (value: string) => { doc.setTextColor(30); doc.setFont('helvetica', 'normal'); doc.setFontSize(9); const lines = doc.splitTextToSize(value, width - margin * 2); lines.forEach((line: string) => { page(13); doc.text(line, margin, y); y += 13; }); y += 4; };
  const item = (label: string, value: string) => text(`${label}: ${value}`);
  const empty = () => text('Sección sin respuestas');

  doc.setFont('helvetica', 'bold'); doc.setFontSize(18); doc.setTextColor(15, 118, 110); doc.text('REPORTE PRIVADO DEL DOCENTE', margin, y); y += 24;
  item('Alumno', payload.studentName); item('Grupo', payload.studentGroup); item('Fecha', payload.studentDate); item('Curso', payload.courseTitle); item('Práctica', `${payload.practiceNumber}: ${payload.practiceTitle}`); item('submissionId confirmado', payload.submissionId); item('Fecha y hora de confirmación', confirmedAt); item('Porcentaje total de avance', `${grade.percentage}%`); item('Calificación privada', String(grade.grade));
  title('DESGLOSE DE PONDERACIONES');
  text('Componente | Completados | Disponibles | Peso | Puntos obtenidos');
  grade.components.forEach(component => text(`${component.label} | ${component.completed} | ${component.available} | ${component.weight.toFixed(2)}% | ${component.points.toFixed(2)}`));
  title('PASOS TÉCNICOS'); practice.steps.length ? practice.steps.forEach(step => text(`${payload.steps.find(entry => entry.stepNumber === step.stepNumber)?.completed ? 'COMPLETADO' : 'PENDIENTE'} — Paso ${step.stepNumber}: ${step.title}`)) : empty();
  title('MURO DEL PROGRESO');
  const wall = (practice.progressWallStages || []).map(stage => ({ stage, answers: [stage.id === 'error' ? wallResponses['error:outcome'] : stage.id === 'redesign' ? wallResponses['redesign:redesign_choice'] : '', ...(stage.responseFields || []).map(field => wallResponses[`${stage.id}:${field.id}`])].filter(Boolean) })).filter(entry => entry.answers.length);
  wall.length ? wall.forEach(entry => item(entry.stage.title, entry.answers.join('\n'))) : empty();
  title('PREGUNTAS ABIERTAS'); const open = (OPEN_QUESTIONS_BY_PRACTICE[practice.id] || []).filter(question => openQuestionAnswers[question.id]?.trim()); open.length ? open.forEach(question => item(question.question, openQuestionAnswers[question.id])) : empty();
  title('CUESTIONARIO'); payload.quizAnswers?.length ? payload.quizAnswers.forEach((answer, index) => item(`${index + 1}. ${answer.questionText}`, answer.answered ? `${answer.selectedOptionText} — ${answer.isCorrect ? 'Correcta' : 'Incorrecta'}` : 'Sin responder')) : empty();
  title('EXPERIMENTOS'); const experiments = (payload.experiments || []).filter(experiment => experiment.notesOrAnswer || experiment.selectedOption); experiments.length ? experiments.forEach(experiment => item(experiment.title, experiment.notesOrAnswer || experiment.selectedOption || '')) : empty();
  title('REFLEXIÓN'); payload.reflectionAnswer ? text(payload.reflectionAnswer) : empty();
  title('EVIDENCIAS DE DRIVE'); evidenceLinks.length ? evidenceLinks.forEach(evidence => item(evidence.name, evidence.url)) : empty();
  title('PRIVACIDAD'); text('Reporte privado para uso exclusivo del docente.');
  return { blob: doc.output('blob'), fileName: buildTeacherReportFileName(payload), pageCount: doc.getNumberOfPages() };
};

export const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1] || ''); reader.onerror = () => reject(new Error('No se pudo preparar el reporte docente.')); reader.readAsDataURL(blob);
});

import React, { useEffect, useState } from 'react';
import {
  X,
  Send,
  Mail,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Practice,
  Course,
  StudentProgress,
  PracticeSubmissionPayload,
  QuizAnswerSubmission,
  ExperimentSubmission,
  StepSubmission,
  EvidenceAttachment,
  SubmissionState,
  ProgressWallStageId
} from '../types';
import {
  DESTINATION_EMAILS,
  submitPracticeToAppScript
} from '../services/appscript';
import { getSessionStudentDate, getSessionStudentGroup, getSessionStudentName, loadProgressWallState, saveSessionIdentity, saveSessionStudentDate } from '../services/sessionStorage';
import { hasIncompleteOptionalResponses } from '../services/submissionEligibility';

interface SubmitPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  practice: Practice;
  course: Course;
  progress: StudentProgress;
  quizAnswers?: Record<string, number>;
  experimentNotes?: Record<string, string>;
  simulatorCompleted?: boolean;
  wallResponses: Record<string, string>;
  wallCompletedStages: ProgressWallStageId[];
  openQuestionAnswers: Record<string, string>;
  openQuestions: Array<{ id: string; question: string }>;
  missingRequirements: string[];
  onSubmissionSuccess: (payload: PracticeSubmissionPayload) => void;
}

export const SubmitPracticeModal: React.FC<SubmitPracticeModalProps> = ({
  isOpen,
  onClose,
  practice,
  course,
  progress,
  quizAnswers = {},
  experimentNotes = {},
  simulatorCompleted = false,
  wallResponses,
  wallCompletedStages,
  openQuestionAnswers,
  openQuestions,
  missingRequirements,
  onSubmissionSuccess
}) => {
  const [studentName, setStudentName] = useState(
    progress.studentName === 'Estudiante' ? getSessionStudentName() : (progress.studentName || getSessionStudentName())
  );
  const [studentGroup, setStudentGroup] = useState(
    progress.studentGroup || getSessionStudentGroup()
  );
  const [studentNotes, setStudentNotes] = useState('');
  const [studentReflection, setStudentReflection] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState | 'idle'>('idle');
  const [submittedPayload, setSubmittedPayload] = useState<PracticeSubmissionPayload | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [studentDate, setStudentDate] = useState(getSessionStudentDate() || new Date().toISOString().substring(0, 10));
  const [showOptionalWarning, setShowOptionalWarning] = useState(false);
  
  useEffect(() => { const clearSubmission = () => setSubmittedPayload(null); window.addEventListener('academic-session-cleared', clearSubmission); return () => window.removeEventListener('academic-session-cleared', clearSubmission); }, []);
  useEffect(() => {
    if (!isOpen) return;
    setStudentName(getSessionStudentName() || (progress.studentName === 'Estudiante' ? '' : progress.studentName));
    setStudentGroup(getSessionStudentGroup() || progress.studentGroup);
    setStudentDate(getSessionStudentDate() || new Date().toISOString().substring(0, 10));
  }, [isOpen, progress.studentGroup, progress.studentName]);

  if (!isOpen) return null;

  const completedSteps = progress.completedPractices[practice.id]?.stepsCompleted || [];
  const stepsCount = completedSteps.length;
  const totalSteps = practice.steps.length;
  const progressWallState = loadProgressWallState(practice.id);
  const isSubmitting = submissionState === 'preparing' || submissionState === 'sending';
  const wallTotal = practice.progressWallStages?.length || 0;
  const wallCompletedCount = wallCompletedStages.length;
  const openQuestionTotal = openQuestions.length;
  const openAnsweredCount = Object.values(openQuestionAnswers).filter(answer => answer.trim()).length;
  const quizAnsweredCount = Object.keys(quizAnswers).filter(questionId => quizAnswers[questionId] !== undefined).length;
  const quizTotal = practice.quizQuestions?.length || 0;
  const experimentAnsweredCount = (practice.experiments || []).filter(experiment => (
    (experimentNotes[experiment.id] || experimentNotes[`${experiment.id}_notes`] || '').trim()
  )).length;
  const experimentTotal = practice.experiments?.length || 0;
  const hasIncompleteOptionalSections = hasIncompleteOptionalResponses({
    wallCompleted: wallCompletedCount,
    wallTotal,
    openAnswered: openAnsweredCount,
    openTotal: openQuestionTotal,
    quizAnswered: quizAnsweredCount,
    quizTotal,
    experimentAnswered: experimentAnsweredCount,
    experimentTotal,
    hasReflectionPrompt: Boolean(practice.reflection),
    reflectionAnswer: studentReflection
  });

  const handleSubmit = async (continueWithIncompleteOptional = false) => {
    if (missingRequirements.length) { setErrorMessage(`Falta completar: ${missingRequirements.join('; ')}.`); return; }
    if (!studentName.trim()) {
      setErrorMessage('Por favor escribe tu nombre completo para que tus profesores puedan identificarte.');
      return;
    }
    if (!studentGroup.trim()) { setErrorMessage('Por favor escribe tu grupo.'); return; }
    if (!studentDate) { setErrorMessage('Por favor selecciona la fecha.'); return; }
    if (hasIncompleteOptionalSections && !continueWithIncompleteOptional) {
      setErrorMessage(null);
      setShowOptionalWarning(true);
      return;
    }

    setShowOptionalWarning(false);
    setErrorMessage(null);
    setSubmissionState('preparing');
    let evidenceAttachments: EvidenceAttachment[];
    try {
      evidenceAttachments = await Promise.all(evidenceFiles.map(file => new Promise<EvidenceAttachment>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ fileName: file.name, mimeType: file.type as EvidenceAttachment['mimeType'], base64Data: String(reader.result).split(',')[1] || '' });
        reader.onerror = () => reject(new Error(`No se pudo leer ${file.name}`));
        reader.readAsDataURL(file);
      })));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudieron preparar las imágenes.');
      return;
    }
    setSubmissionState('sending');
    saveSessionIdentity(studentName.trim(), studentGroup.trim());
    saveSessionStudentDate(studentDate);

    // Build Quiz Answer Details
    const quizAnswerList: QuizAnswerSubmission[] = (practice.quizQuestions || []).map(q => {
      const selectedIdx = quizAnswers[q.id] ?? -1;
      const answered = selectedIdx >= 0;
      const isCorrect = answered ? selectedIdx === q.correctOptionIndex : null;
      return {
        questionId: q.id,
        questionText: q.question,
        selectedOptionIndex: selectedIdx,
        selectedOptionText: selectedIdx >= 0 ? q.options[selectedIdx] : 'Sin responder',
        answered,
        isCorrect
      };
    });

    // Build Experiment Submissions
    const experimentList: ExperimentSubmission[] = (practice.experiments || []).map(exp => {
      const selected = experimentNotes[exp.id] || '';
      const notes = experimentNotes[`${exp.id}_notes`] || '';
      return {
        experimentId: exp.id,
        title: exp.title,
        instruction: exp.instruction,
        selectedOption: selected || undefined,
        questionPrompt: exp.questionPrompt || undefined,
        notesOrAnswer: notes || selected || undefined
      };
    });

    // Build Steps list
    const stepList: StepSubmission[] = practice.steps.map(s => ({
      stepNumber: s.stepNumber,
      title: s.title,
      completed: completedSteps.includes(s.stepNumber)
    }));

    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const payload: PracticeSubmissionPayload = {
      submissionId: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      studentName: studentName.trim(),
      studentGroup: studentGroup.trim() || 'General',
      studentDate,
      studentNotes: studentNotes.trim() || undefined,
      practiceId: practice.id,
      practiceTitle: practice.title,
      practiceNumber: practice.practiceNumber || `Práctica ${practice.number}`,
      courseId: course.id,
      courseTitle: course.title,
      timestamp: now.toISOString(),
      formattedDate,
      steps: stepList,
      progressWall: {
        availableStages: (practice.progressWallStages || []).map(stage => ({ id: stage.id, title: stage.title })),
        respondedStageIds: wallCompletedStages,
        responses: wallResponses
      },
      openQuestions: { availableQuestions: openQuestions, answers: openQuestionAnswers },
      evidenceAttachments: evidenceAttachments.length ? evidenceAttachments : undefined,
      simulatorCompleted,
      quizAnswers: quizAnswerList,
      experiments: experimentList,
      reflectionPrompt: practice.reflection || undefined,
      reflectionAnswer: studentReflection.trim() || undefined,
      status: 'COMPLETADO'
    };

    try {
      const res = await submitPracticeToAppScript(payload);
      setSubmissionState(res.state);

      if (res.state === 'confirmed' && res.submissionId === payload.submissionId) {
        const localReceipt = { ...payload, evidenceAttachments: undefined };
        setSubmittedPayload(localReceipt);
        onSubmissionSuccess(localReceipt);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else if (res.state === 'failed') {
        setErrorMessage(res.message || 'No se pudo enviar la práctica. Intenta nuevamente.');
      }
    } catch (err: any) {
      setSubmissionState('failed');
      setErrorMessage('Error al enviar la información: ' + (err?.message || 'Revisa tu conexión.'));
    }
  };

  return (
    <div
      id="submit-practice-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in text-slate-200"
      onClick={onClose}
    >
      <div
        id="submit-practice-modal-container"
        className="relative w-full max-w-2xl bg-slate-950 border border-emerald-500/40 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg">
              🚀
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400">
                  ¡Hora de entregar tu trabajo!
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white font-sans">
                Enviar Tarea a tus Maestros
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-2xl transition"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 font-sans">
          {submittedPayload ? (
            /* Success State */
            <div className="text-center py-6 space-y-5 animate-fade-in">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-300 text-slate-950 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(16,185,129,0.5)] text-4xl animate-bounce">
                🎉
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-black text-white font-sans">Tu práctica fue recibida correctamente.</h4>
                <p className="text-xs text-emerald-300">Identificador: {submittedPayload.submissionId}</p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition transform hover:scale-105"
              >
                ⭐ ¡Entendido, volver a la práctica!
              </button>
            </div>
          ) : (
            /* Submission Form */
            <div className="space-y-6">
              {/* Destination Emails Banner & Delivery status */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-emerald-300 block text-sm">
                      Destinatarios de entrega de evidencias:
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1 text-xs">
                      {DESTINATION_EMAILS.map((email, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300 font-bold"
                        >
                          ✉️ {email}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/40">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Servicio de Correo de Google Apps Script Activo
                  </span>
                </div>
              </div>

              {/* Student Identity Form */}
              <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>👤</span> Tus Datos de Estudiante
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">
                      👦 Tu Nombre y Apellidos <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      placeholder="Ej. Mateo García López"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 ring-2 ring-transparent focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 block">
                      🏫 Tu Grado y Grupo <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={studentGroup}
                      onChange={e => setStudentGroup(e.target.value)}
                      placeholder="Ej. 5º Grado - Grupo B"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 ring-2 ring-transparent focus:ring-emerald-500/20"
                    />
                  </div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-slate-200 block">📅 Fecha <span className="text-rose-400">*</span></label><input type="date" value={studentDate} onChange={event => { setStudentDate(event.target.value); saveSessionStudentDate(event.target.value); }} className="student-date-input w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-hidden focus:border-emerald-500" /></div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-slate-200 block">
                    💬 Mensaje o duda para tu maestro (opcional):
                  </label>
                  <textarea
                    rows={2}
                    value={studentNotes}
                    onChange={e => setStudentNotes(e.target.value)}
                    placeholder="Escribe aquí si tuviste alguna duda o lo que más te gustó de la práctica..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 resize-none"
                  />
                </div>
              </div>

              {/* Summary to send */}
              <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30">
                <div>
                  <h4 className="text-sm font-bold text-cyan-200">📷 Capturas o imágenes de evidencia (opcional)</h4>
                  <p className="mt-1 text-xs text-slate-400">Puedes adjuntar hasta 3 imágenes PNG, JPG o WebP. Se enviarán únicamente cuando confirmes la entrega y se guardarán en la carpeta de Drive del curso.</p>
                </div>
                <input type="file" accept="image/png,image/jpeg,image/webp" multiple
                  onChange={event => {
                    const selected = Array.from(event.currentTarget.files || []) as File[];
                    const invalid = selected.find(file => file.size > 4 * 1024 * 1024);
                    if (invalid) { setErrorMessage(`La imagen ${invalid.name} supera el límite de 4 MB.`); event.target.value = ''; return; }
                    if (selected.length > 3) { setErrorMessage('Puedes adjuntar como máximo 3 imágenes.'); event.target.value = ''; return; }
                    setErrorMessage(null); setEvidenceFiles(selected);
                  }}
                  className="block w-full text-xs text-slate-300 file:mr-3 file:rounded-xl file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-bold file:text-slate-950 hover:file:bg-cyan-400" />
                {evidenceFiles.length > 0 && <ul className="space-y-1 text-xs text-slate-300">{evidenceFiles.map(file => <li key={`${file.name}-${file.size}`}>✓ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>)}</ul>}
              </div>

              <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-violet-950/30 border border-violet-500/30 text-xs">
                <h4 className="font-bold text-violet-200 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Resumen privado de tu Muro del Progreso
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(practice.progressWallStages || []).map(stage => (
                    <div key={stage.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="font-black text-emerald-300">{stage.title}</span>
                      <p className="mt-1 text-slate-300 whitespace-pre-wrap">
                        {(stage.responseFields || []).map(field => progressWallState.responses[`${stage.id}:${field.id}`]).filter(Boolean).join('\n\n') || 'Sin respuesta todavía.'}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400">Revísalo antes de continuar. Se conserva durante esta sesión y las respuestas que hayas escrito se incluirán en el comprobante de la entrega confirmada.</p>
              </div>

              <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                <h4 className="font-bold text-cyan-300 flex items-center gap-1.5 text-xs">
                  <FileText className="w-4 h-4 text-cyan-400" /> Resumen de lo que se va a enviar:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-xs block">Pasos de la actividad:</span>
                    <span className="font-bold text-white text-sm">{stepsCount} de {totalSteps} pasos completados</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-xs block">Muro del Progreso:</span>
                    <span className="font-bold text-white text-sm">{wallCompletedCount} de {wallTotal} etapas respondidas</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-xs block">Preguntas abiertas:</span>
                    <span className="font-bold text-white text-sm">{openAnsweredCount} de {openQuestionTotal} respondidas</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-xs block">Cuestionario:</span>
                    <span className="font-bold text-white text-sm">{quizAnsweredCount} de {quizTotal} respondidas</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-xs block">Evidencias:</span>
                    <span className="font-bold text-white text-sm">{evidenceFiles.length} de 3 imágenes</span>
                  </div>
                </div>
              </div>

              {showOptionalWarning && (
                <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500/60 space-y-3" role="alert">
                  <div className="flex items-start gap-2 text-amber-100">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black">Hay apartados opcionales sin responder.</p>
                      <p className="mt-1 text-xs text-amber-200">Puedes regresar para completarlos o continuar. Las respuestas vacías no impedirán la entrega ni se marcarán como incorrectas.</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs">
                      Regresar y completar respuestas
                    </button>
                    <button type="button" onClick={() => void handleSubmit(true)} className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                      Continuar y enviar
                    </button>
                  </div>
                </div>
              )}

              {/* Reflection question if present */}
              {practice.reflection && (
                <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                  <label className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Pregunta de reflexión:
                  </label>
                  <p className="text-slate-300 italic text-xs">"{practice.reflection}"</p>
                  <textarea
                    rows={2}
                    value={studentReflection}
                    onChange={e => setStudentReflection(e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 resize-none"
                  />
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/90 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-2 font-bold animate-shake">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {submissionState === 'pending' && <div className="p-4 rounded-xl bg-amber-950 border border-amber-500 text-amber-200 font-bold">Entrega enviada, pendiente de confirmación. No se registró como entregada y no se generó comprobante.</div>}

            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!submittedPayload && (
          <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition"
            >
              Cancelar
            </button>

            <button
              onClick={() => void handleSubmit(false)}
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-50 text-slate-950 text-sm sm:text-base font-black rounded-2xl flex items-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.5)] transform hover:scale-105 active:scale-95 transition-all ring-4 ring-emerald-500/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>{submissionState === 'preparing' ? 'Preparando entrega…' : 'Enviando tarea a tus maestros…'}</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>🚀 ¡ENVIAR MI TAREA AHORA!</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

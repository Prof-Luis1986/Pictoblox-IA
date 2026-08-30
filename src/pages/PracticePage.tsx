import React, { useEffect, useState } from 'react';
import { getPracticeById, getAdjacentPractices, ALL_PRACTICES } from '../data/allPractices';
import { COURSES_DATA } from '../data/coursesData';
import { StudentProgress, PracticeSubmissionPayload } from '../types';
import { PracticeHeader } from '../components/PracticeHeader';
import { StepViewer } from '../components/StepViewer';
import { InteractiveBlockSimulation } from '../components/InteractiveBlockSimulation';
import { QuizComponent } from '../components/QuizComponent';
import { ExperimentSection } from '../components/ExperimentSection';
import { GlossaryTooltip } from '../components/GlossaryTooltip';
import { SubmitPracticeModal } from '../components/SubmitPracticeModal';
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Award,
  CheckCircle2,
  Save,
  BookOpen,
  Check,
  Terminal,
  Activity,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  Info,
  Send,
  Mail,
  ShieldCheck
  ,Download
  ,FolderOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticePageProps {
  practiceId: string;
  progress: StudentProgress;
  onUpdateProgress: (updated: Partial<StudentProgress>) => void;
  onOpenProgressModal?: () => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  practiceId,
  progress,
  onUpdateProgress,
  onOpenProgressModal
}) => {
  const practice = getPracticeById(practiceId);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isPracticeListOpen, setIsPracticeListOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [quizAnswersState, setQuizAnswersState] = useState<Record<string, number>>({});
  const [simulationCompleted, setSimulationCompleted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [practiceId]);

  if (!practice) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white font-mono">// PRÁCTICA NO ENCONTRADA</h2>
        <p className="text-xs text-slate-400">El identificador "{practiceId}" no existe en la base de datos.</p>
        <a href="#/" className="inline-block px-4 py-2 bg-emerald-500 text-slate-950 rounded-2xl text-xs font-mono font-bold shadow-xs">
          // VOLVER AL INICIO
        </a>
      </div>
    );
  }

  const course = COURSES_DATA.find(c => c.id === practice.courseId) || COURSES_DATA[0];
  const allCoursePractices = ALL_PRACTICES.filter(p => p.courseId === course.id);
  const { prev, next } = getAdjacentPractices(practice.id);
  const practiceProgress = progress.completedPractices[practice.id];
  const isCompleted = !!practiceProgress?.completed;
  const completedSteps = practiceProgress?.stepsCompleted || [];
  const allStepsCompleted = practice.steps.every(step => completedSteps.includes(step.stepNumber));
  const lastSubmittedAt = practiceProgress?.lastSubmittedAt;

  // Find the section this practice belongs to
  const parentSection = course.sections.find(sec => sec.practices.includes(practice.id)) || course.sections[0];

  // Toggle single step completion
  const handleToggleStep = (stepNumber: number) => {
    const currentSteps = practiceProgress?.stepsCompleted || [];
    const exists = currentSteps.includes(stepNumber);
    const updatedSteps = exists
      ? currentSteps.filter(s => s !== stepNumber)
      : [...currentSteps, stepNumber];

    const allStepsDone = updatedSteps.length === practice.steps.length;

    const newCompletedPractices = {
      ...progress.completedPractices,
      [practice.id]: {
        completed: allStepsDone || isCompleted,
        quizScore: practiceProgress?.quizScore,
        quizAnswers: practiceProgress?.quizAnswers || quizAnswersState,
        stepsCompleted: updatedSteps,
        experimentNotes: practiceProgress?.experimentNotes,
        lastUpdated: new Date().toISOString(),
        lastSubmittedAt: practiceProgress?.lastSubmittedAt,
        submissionPayload: practiceProgress?.submissionPayload
      }
    };

    let updatedBadges = [...progress.badgesEarned];
    if (allStepsDone && !updatedBadges.includes(practice.badgeAwarded)) {
      updatedBadges.push(practice.badgeAwarded);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }

    onUpdateProgress({
      completedPractices: newCompletedPractices,
      badgesEarned: updatedBadges
    });
  };

  // Toggle full practice completion
  const handleToggleCompleted = () => {
    const nextState = !isCompleted;
    const allStepNums = practice.steps.map(s => s.stepNumber);

    const newCompletedPractices = {
      ...progress.completedPractices,
      [practice.id]: {
        completed: nextState,
        quizScore: practiceProgress?.quizScore,
        quizAnswers: practiceProgress?.quizAnswers || quizAnswersState,
        stepsCompleted: nextState ? allStepNums : [],
        experimentNotes: practiceProgress?.experimentNotes,
        lastUpdated: new Date().toISOString(),
        lastSubmittedAt: practiceProgress?.lastSubmittedAt,
        submissionPayload: practiceProgress?.submissionPayload
      }
    };

    let updatedBadges = [...progress.badgesEarned];
    if (nextState && !updatedBadges.includes(practice.badgeAwarded)) {
      updatedBadges.push(practice.badgeAwarded);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }

    onUpdateProgress({
      completedPractices: newCompletedPractices,
      badgesEarned: updatedBadges
    });
  };

  // Save Quiz Score and Answers
  const handleSaveQuizScore = (score: number) => {
    const newCompletedPractices = {
      ...progress.completedPractices,
      [practice.id]: {
        completed: practiceProgress?.completed || false,
        quizScore: score,
        quizAnswers: practiceProgress?.quizAnswers || quizAnswersState,
        stepsCompleted: practiceProgress?.stepsCompleted || [],
        experimentNotes: practiceProgress?.experimentNotes,
        lastUpdated: new Date().toISOString(),
        lastSubmittedAt: practiceProgress?.lastSubmittedAt,
        submissionPayload: practiceProgress?.submissionPayload
      }
    };

    let updatedBadges = [...progress.badgesEarned];
    if (score >= 70 && !updatedBadges.includes(`${practice.badgeAwarded} - Experto`)) {
      updatedBadges.push(`${practice.badgeAwarded} - Experto`);
    }

    onUpdateProgress({
      completedPractices: newCompletedPractices,
      badgesEarned: updatedBadges
    });
  };

  const handleSaveQuizAnswers = (answers: Record<string, number>, score: number) => {
    setQuizAnswersState(answers);
    const newCompletedPractices = {
      ...progress.completedPractices,
      [practice.id]: {
        completed: practiceProgress?.completed || false,
        quizScore: score,
        quizAnswers: answers,
        stepsCompleted: practiceProgress?.stepsCompleted || [],
        experimentNotes: practiceProgress?.experimentNotes,
        lastUpdated: new Date().toISOString(),
        lastSubmittedAt: practiceProgress?.lastSubmittedAt,
        submissionPayload: practiceProgress?.submissionPayload
      }
    };

    onUpdateProgress({
      completedPractices: newCompletedPractices
    });
  };

  // Save Experiment Notes
  const handleSaveExperimentAnswers = (answers: Record<string, string>) => {
    const newCompletedPractices = {
      ...progress.completedPractices,
      [practice.id]: {
        completed: practiceProgress?.completed || false,
        quizScore: practiceProgress?.quizScore,
        quizAnswers: practiceProgress?.quizAnswers || quizAnswersState,
        stepsCompleted: practiceProgress?.stepsCompleted || [],
        experimentNotes: answers,
        lastUpdated: new Date().toISOString(),
        lastSubmittedAt: practiceProgress?.lastSubmittedAt,
        submissionPayload: practiceProgress?.submissionPayload
      }
    };

    onUpdateProgress({
      completedPractices: newCompletedPractices
    });
  };

  // Handle successful Apps Script submission
  const handleSubmissionSuccess = (payload: PracticeSubmissionPayload) => {
    const allStepNums = practice.steps.map(s => s.stepNumber);
    const newCompletedPractices = {
      ...progress.completedPractices,
      [practice.id]: {
        completed: true,
        quizScore: payload.quizScore ?? practiceProgress?.quizScore,
        quizAnswers: practiceProgress?.quizAnswers || quizAnswersState,
        stepsCompleted: practiceProgress?.stepsCompleted?.length ? practiceProgress.stepsCompleted : allStepNums,
        experimentNotes: practiceProgress?.experimentNotes,
        lastUpdated: new Date().toISOString(),
        lastSubmittedAt: payload.formattedDate,
        submissionPayload: payload
      }
    };

    let updatedBadges = [...progress.badgesEarned];
    if (!updatedBadges.includes(practice.badgeAwarded)) {
      updatedBadges.push(practice.badgeAwarded);
    }

    onUpdateProgress({
      studentName: payload.studentName,
      studentGroup: payload.studentGroup,
      completedPractices: newCompletedPractices,
      badgesEarned: updatedBadges
    });
  };

  // Simulator Type Mapping
  const getSimulationType = (): 'pattern' | 'face_detect' | 'mouse_cat' | 'flappy' | 'space_battle' | 'face_train_door' | 'voice_light' | null => {
    if (practice.id === 't1-act1') return 'pattern';
    if (practice.id === 't1-act2') return 'face_detect';
    if (practice.id === 't1-act3') return 'face_detect';
    if (practice.id === 't1-act4') return 'mouse_cat';
    if (practice.id === 't1-act5') return 'flappy';
    if (practice.id === 't1-act6') return 'space_battle';
    if (practice.id === 't2-act1' || practice.id === 't2-act2') return 'face_detect';
    if (practice.id === 't2-act5' || practice.id === 't2-act6') return 'face_train_door';
    if (practice.id === 't2-act7' || practice.id === 't2-act8') return 'voice_light';
    return null;
  };

  const simulationType = getSimulationType();

  return (
    <div className="space-y-8 py-6 animate-fade-in text-slate-200">
      {/* Breadcrumbs & Quick Selector Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap font-mono text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="#/"
            className="text-slate-400 hover:text-emerald-400 transition"
          >
            Inicio
          </a>
          <span className="text-slate-600">/</span>
          <a
            href={`#/curso/${course.id}`}
            className="text-slate-400 hover:text-emerald-400 transition"
          >
            {course.title}
          </a>
          <span className="text-slate-600">/</span>
          <span className="text-emerald-400 font-bold">
            {practice.practiceNumber || `Práctica ${practice.number}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick practice selector dropdown button */}
          <div className="relative">
            <button
              onClick={() => setIsPracticeListOpen(!isPracticeListOpen)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white rounded-xl flex items-center gap-1.5 transition"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-400" />
              <span>TODAS LAS PRÁCTICAS</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isPracticeListOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-2.5 z-50 max-h-96 overflow-y-auto space-y-1">
                <div className="px-2.5 py-1.5 text-[11px] text-slate-400 font-mono border-b border-slate-900">
                  // SELECCIONA UNA PÁGINA DE PRÁCTICA:
                </div>
                {allCoursePractices.map(p => {
                  const pDone = !!progress.completedPractices[p.id]?.completed;
                  const isCurrent = p.id === practice.id;

                  return (
                    <a
                      key={p.id}
                      href={`#/practica/${p.id}`}
                      onClick={() => setIsPracticeListOpen(false)}
                      className={`p-2 rounded-xl flex items-center justify-between text-xs transition ${
                        isCurrent
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold'
                          : 'hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <span className="truncate pr-2 font-sans">
                        {p.practiceNumber || `Práctica ${p.number}`}: {p.title}
                      </span>
                      {pDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {onOpenProgressModal && (
            <button
              onClick={onOpenProgressModal}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition"
              title="Guardar o sincronizar tu progreso"
            >
              <Save className="w-3.5 h-3.5 text-emerald-400" />
              <span>GUARDAR PROGRESO</span>
            </button>
          )}

          <a
            href="#/glosario"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-teal-500/30 text-teal-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>GLOSARIO IA</span>
          </a>
        </div>
      </div>

      {/* Narrative & Concepts Intro Card for this Section */}
      {parentSection && parentSection.concepts && parentSection.concepts.length > 0 && (
        <div className="rounded-3xl bg-slate-950 border border-slate-850 overflow-hidden shadow-sm">
          <button
            onClick={() => setIsIntroOpen(!isIntroOpen)}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-base shrink-0">
                📖
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  {parentSection.title}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                  Fundamentos y Contexto de la Lección
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>{isIntroOpen ? 'OCULTAR' : 'LEER HISTORIA Y CONCEPTOS'}</span>
              {isIntroOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {isIntroOpen && (
            <div className="p-6 sm:p-7 border-t border-slate-900 bg-slate-950/90 space-y-6 animate-fade-in font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {parentSection.concepts.map((concept, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <h4 className="text-sm sm:text-base font-bold text-emerald-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{concept.title}</span>
                    </h4>
                    <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {concept.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                    {concept.keyPoints && (
                      <div className="pt-2 border-t border-slate-800/80 space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 font-mono uppercase">
                          // PUNTOS CLAVE:
                        </span>
                        <ul className="space-y-1">
                          {concept.keyPoints.map((point, kIdx) => (
                            <li key={kIdx} className="text-xs text-emerald-400/90 flex items-start gap-1.5 font-mono">
                              <span className="text-emerald-500">›</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Practice Header & Banner */}
      <PracticeHeader
        practice={practice}
        courseTitle={course.title}
        isCompleted={isCompleted}
        onToggleCompleted={handleToggleCompleted}
        onOpenSubmitModal={allStepsCompleted ? () => setIsSubmitModalOpen(true) : undefined}
        lastSubmittedAt={lastSubmittedAt}
      />

      {practice.resources && practice.resources.length > 0 && (
        <section className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <FolderOpen className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Materiales para construir la práctica</h2>
              <p className="text-sm text-slate-400">Descarga únicamente los personajes, fondos o documentos indicados en cada paso.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {practice.resources.map(resource => (
              <a
                key={resource.id}
                href={resource.fileUrl}
                download={resource.fileName}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white group-hover:text-cyan-300 transition">{resource.name}</h3>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">{resource.howToUse}</p>
                  </div>
                  <Download className="w-5 h-5 text-cyan-400 shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Simulation Playground */}
      {simulationType && (
        <InteractiveBlockSimulation
          type={simulationType}
          onCompleted={() => {
            setSimulationCompleted(true);
            if (!isCompleted) {
              handleToggleStep(1);
            }
          }}
        />
      )}

      {/* Step by Step Viewer */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧩</span> {practice.steps.some(s => (s.blockImage && s.blockImage.trim() !== '') || (s.blockCodeSnippets && s.blockCodeSnippets.length > 0) || !!s.blockExplanation) ? 'Guía de Programación Paso a Paso' : 'Pasos de la Actividad'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {practice.steps.some(s => (s.blockImage && s.blockImage.trim() !== '') || (s.blockCodeSnippets && s.blockCodeSnippets.length > 0) || !!s.blockExplanation) ? (
                <>Arrastra y une los bloques en <GlossaryTooltip term="PictoBlox" /> siguiendo cada paso.</>
              ) : (
                <>Sigue las instrucciones del laboratorio para completar el reto.</>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30">
            <span>✅ Pasos listos: {completedSteps.length} de {practice.steps.length}</span>
          </div>
        </div>

        <StepViewer
          steps={practice.steps}
          completedStepNumbers={completedSteps}
          onToggleStep={handleToggleStep}
        />
      </section>

      {/* What You Learned Card */}
      {practice.conclusion && practice.conclusion.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center text-xl shrink-0">
              🧠
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">💡 Resumen de la Lección</span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                ¿Qué aprendiste en esta práctica?
              </h3>
            </div>
          </div>

          <div className="space-y-2.5 text-sm text-slate-300 leading-relaxed">
            {practice.conclusion.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {practice.reflection && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm space-y-1">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" /> Pregunta para pensar y reflexionar:
              </span>
              <p className="text-slate-300 italic">"{practice.reflection}"</p>
            </div>
          )}
        </section>
      )}

      {/* Interactive Experiments Section */}
      {practice.experiments && practice.experiments.length > 0 && (
        <ExperimentSection
          practiceId={practice.id}
          experiments={practice.experiments}
          initialAnswers={practiceProgress?.experimentNotes}
          onSaveAnswers={handleSaveExperimentAnswers}
        />
      )}

      {/* Checking Quiz Component */}
      {practice.quizQuestions && practice.quizQuestions.length > 0 && (
        <QuizComponent
          practiceId={practice.id}
          questions={practice.quizQuestions}
          initialScore={practiceProgress?.quizScore}
          initialAnswers={practiceProgress?.quizAnswers || quizAnswersState}
          onSaveScore={handleSaveQuizScore}
          onSaveAnswers={handleSaveQuizAnswers}
        />
      )}

      {/* Google Apps Script Submission Big Banner */}
      <section className={`p-6 sm:p-8 rounded-3xl border-2 space-y-5 ${allStepsCompleted ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'bg-slate-900/80 border-slate-700'}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Entrega a Maestros
              </span>
              <span className="text-slate-400">
                Calificación y Reporte Digital
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
              {allStepsCompleted ? '¡Terminaste! Ya puedes enviar tu tarea ✉️' : 'Completa todos los pasos antes de enviar'}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {allStepsCompleted
                ? 'Revisa tus respuestas y envía tu trabajo al maestro.'
                : `Llevas ${completedSteps.length} de ${practice.steps.length} pasos terminados. Regresa a la guía y marca cada paso cuando lo completes.`}
            </p>

            {lastSubmittedAt && (
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ÚLTIMA ENTREGA ENVIADA: {lastSubmittedAt}</span>
              </div>
            )}
          </div>

          <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
            <button
              id="btn-submit-practice-bottom"
              onClick={() => setIsSubmitModalOpen(true)}
              disabled={!allStepsCompleted}
              className="px-8 py-5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 hover:from-emerald-300 hover:to-teal-300 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-slate-950 text-base font-black rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all"
            >
              <Send className="w-5 h-5" />
              <span>{!allStepsCompleted ? `FALTAN ${practice.steps.length - completedSteps.length} PASOS` : lastSubmittedAt ? 'VOLVER A ENVIAR TAREA' : 'ENVIAR TAREA AL MAESTRO'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
        {prev ? (
          <a
            id="nav-prev-practice"
            href={`#/practica/${prev.id}`}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 text-xs sm:text-sm font-semibold flex items-center justify-center sm:justify-start gap-2.5 transition"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <span className="text-[10px] text-slate-500 block">⬅️ Anterior</span>
              <span>{prev.practiceNumber}: {prev.title}</span>
            </div>
          </a>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          {onOpenProgressModal && (
            <button
              onClick={onOpenProgressModal}
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2 transition"
              title="Guardar progreso actual"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span>Guardar</span>
            </button>
          )}

          {next ? (
            <a
              id="nav-next-practice"
              href={`#/practica/${next.id}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center sm:justify-end gap-2.5 shadow-lg transition"
            >
              <div className="text-right">
                <span className="text-[10px] text-slate-950/70 block font-sans">Siguiente Práctica ➡️</span>
                <span>{next.practiceNumber}: {next.title}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </a>
          ) : (
            <a
              href={`#/curso/${course.id}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>🏆 Finalizar y Ver Certificado</span>
            </a>
          )}
        </div>
      </div>

      {/* Apps Script Submission Modal */}
      <SubmitPracticeModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        practice={practice}
        course={course}
        progress={progress}
        quizAnswers={practiceProgress?.quizAnswers || quizAnswersState}
        quizScore={practiceProgress?.quizScore}
        experimentNotes={practiceProgress?.experimentNotes}
        simulatorCompleted={simulationCompleted}
        onSubmissionSuccess={handleSubmissionSuccess}
      />
    </div>
  );
};

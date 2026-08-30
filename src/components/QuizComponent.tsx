import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types';

interface QuizComponentProps {
  practiceId: string;
  questions: QuizQuestion[];
  initialScore?: number;
  initialAnswers?: Record<string, number>;
  onSaveScore: (score: number) => void;
  onSaveAnswers?: (answers: Record<string, number>, score: number) => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  practiceId,
  questions,
  initialScore,
  initialAnswers,
  onSaveScore,
  onSaveAnswers
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(initialAnswers || {});
  const [submitted, setSubmitted] = useState<boolean>(initialScore !== undefined);
  const [score, setScore] = useState<number>(initialScore || 0);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    const updated = { ...selectedAnswers, [questionId]: optionIndex };
    setSelectedAnswers(updated);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);
    onSaveScore(calculatedScore);
    if (onSaveAnswers) {
      onSaveAnswers(selectedAnswers, calculatedScore);
    }

    if (calculatedScore >= 70) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    if (onSaveAnswers) {
      onSaveAnswers({}, 0);
    }
  };

  const allAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div id="practice-quiz-container" className="my-8 p-6 sm:p-8 rounded-3xl cyber-card text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              // TEST DE VALIDACIÓN Y CONCEPTOS
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Comprobación de lógica algorítmica y conceptos de Inteligencia Artificial
            </p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900 border border-emerald-500/30">
            <Award className={`w-4 h-4 ${score >= 70 ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span className="text-xs font-mono font-bold text-white">
              SCORE: {score}%
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctOptionIndex;

          return (
            <div
              key={q.id}
              id={`quiz-question-${q.id}`}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-sans"
            >
              <h4 className="text-sm font-bold text-white flex items-start gap-2.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold font-mono shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <span className="pt-0.5">{q.question}</span>
              </h4>

              <div className="space-y-2 pt-1 font-sans">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  let buttonStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500/40 hover:bg-slate-850';

                  if (submitted) {
                    if (optIdx === q.correctOptionIndex) {
                      buttonStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 line-through';
                    } else {
                      buttonStyle = 'bg-slate-950 border-slate-900 text-slate-600 opacity-50';
                    }
                  } else if (isSelected) {
                    buttonStyle = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]';
                  }

                  return (
                    <button
                      key={optIdx}
                      id={`quiz-${q.id}-opt-${optIdx}`}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm flex items-center justify-between transition ${buttonStyle}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono font-bold text-slate-400">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </span>

                      {submitted && optIdx === q.correctOptionIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="p-3.5 mt-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
                  <span className="font-bold text-emerald-400 block">// EXPLICACIÓN TÉCNICA:</span>
                  <span className="font-sans">{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3 font-mono">
        {!submitted ? (
          <button
            id="btn-submit-quiz"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs sm:text-sm font-bold rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.25)] transition"
          >
            COMPROBAR RESPUESTAS
          </button>
        ) : (
          <button
            id="btn-retry-quiz"
            onClick={handleRetry}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs sm:text-sm font-semibold rounded-2xl flex items-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" /> REINTENTAR TEST
          </button>
        )}

        <p className="text-xs text-slate-400">
          {submitted
            ? score >= 70
              ? '✨ ¡Excelente rendimiento en el laboratorio!'
              : '// Repasa los bloques y vuelve a intentar el test.'
            : '// Selecciona una opción para cada pregunta.'}
        </p>
      </div>
    </div>
  );
};

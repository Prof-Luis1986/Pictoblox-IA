import React, { useEffect, useState } from 'react';
import { MessageCircleQuestion, Save, CheckCircle2 } from 'lucide-react';
import { OPEN_QUESTIONS_BY_PRACTICE } from '../data/openQuestionsData';
import { readSessionValue, writeSessionValue } from '../services/sessionStorage';

export const OpenQuestionsSection: React.FC<{ practiceId: string; onAnswersChange?: (answers: Record<string, string>, complete: boolean) => void }> = ({ practiceId, onAnswersChange }) => {
  const questions = OPEN_QUESTIONS_BY_PRACTICE[practiceId] || [];
  const storageKey = `open_questions:${practiceId}`;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const loaded = readSessionValue<Record<string, string>>(storageKey, {});
      setAnswers(loaded);
      onAnswersChange?.(loaded, questions.every(question => Boolean(loaded[question.id]?.trim())));
    } catch {
      setAnswers({});
    }
    setSaved(false);
  }, [storageKey]); // callback intentionally follows the practice key

  if (!questions.length) return null;

  const saveAnswers = () => {
    writeSessionValue(storageKey, answers);
    onAnswersChange?.(answers, questions.every(question => Boolean(answers[question.id]?.trim())));
    setSaved(true);
  };

  return (
    <section className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-violet-500/35 space-y-5" aria-labelledby="open-questions-title">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
          <MessageCircleQuestion className="w-6 h-6 text-violet-300" />
        </div>
        <div>
          <h2 id="open-questions-title" className="text-xl sm:text-2xl font-black text-white">Preguntas abiertas</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {questions.map(item => (
          <label key={item.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <span className="block text-sm font-bold text-white">{item.question}</span>
            <textarea
              value={answers[item.id] || ''}
              onChange={event => { const next = { ...answers, [item.id]: event.target.value }; setAnswers(next); writeSessionValue(storageKey, next); onAnswersChange?.(next, questions.every(question => Boolean(next[question.id]?.trim()))); setSaved(false); }}
              rows={4}
              placeholder="Escribe aquí tu respuesta..."
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
            />
          </label>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={saveAnswers} className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-400 transition">
          <Save className="w-4 h-4" /> Guardar mis respuestas
        </button>
        {saved && <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-300"><CheckCircle2 className="w-4 h-4" /> Respuestas guardadas en este dispositivo</span>}
      </div>
    </section>
  );
};

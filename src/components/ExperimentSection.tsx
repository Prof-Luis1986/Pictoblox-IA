import React, { useState } from 'react';
import { FlaskConical, Save, Check, Sparkles, Terminal } from 'lucide-react';
import { ExperimentItem } from '../types';

interface ExperimentSectionProps {
  practiceId: string;
  experiments: ExperimentItem[];
  initialAnswers?: Record<string, string>;
  onSaveAnswers: (answers: Record<string, string>) => void;
}

export const ExperimentSection: React.FC<ExperimentSectionProps> = ({
  practiceId,
  experiments,
  initialAnswers = {},
  onSaveAnswers
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleOptionChange = (expId: string, value: string) => {
    const updated = { ...answers, [expId]: value };
    setAnswers(updated);
    onSaveAnswers(updated);
  };

  const handleTextChange = (expId: string, text: string) => {
    const updated = { ...answers, [`${expId}_notes`]: text };
    setAnswers(updated);
    onSaveAnswers(updated);
  };

  const handleManualSave = () => {
    onSaveAnswers(answers);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  if (!experiments || experiments.length === 0) return null;

  return (
    <div id="practice-experiments-container" className="my-8 p-6 sm:p-7 rounded-3xl cyber-card text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              // LABORATORIO EXPERIMENTAL Y TEST DE ESTRÉS
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Modifica parámetros, iluminación y condiciones para analizar la respuesta del modelo de IA
            </p>
          </div>
        </div>

        <button
          onClick={handleManualSave}
          className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.3)] transition"
        >
          {savedMessage ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
          <span>{savedMessage ? '[GUARDADO]' : 'GUARDAR RESULTADOS'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiments.map((exp, index) => {
          const selectedOption = answers[exp.id] || '';
          const notes = answers[`${exp.id}_notes`] || '';

          return (
            <div
              key={exp.id}
              id={`experiment-card-${exp.id}`}
              className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 font-mono">
                  <span className="w-5 h-5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">
                    0{index + 1}
                  </span>
                  <span>{exp.title}</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-sans">
                  {exp.instruction}
                </p>
              </div>

              {exp.options && exp.options.length > 0 && (
                <div className="space-y-1.5 pt-1 font-sans">
                  {exp.options.map((opt, oIdx) => (
                    <label
                      key={oIdx}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                        selectedOption === opt
                          ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 font-medium'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`exp-radio-${exp.id}`}
                        value={opt}
                        checked={selectedOption === opt}
                        onChange={() => handleOptionChange(exp.id, opt)}
                        className="text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-700"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {exp.questionPrompt && (
                <div className="pt-2 font-mono">
                  <label className="text-[11px] text-slate-400 block mb-1">
                    // {exp.questionPrompt}
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => handleTextChange(exp.id, e.target.value)}
                    placeholder="Escribe lo que observaste en el modelo..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

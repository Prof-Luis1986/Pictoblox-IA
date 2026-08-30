import React, { useEffect, useMemo, useState } from 'react';
import { Check, ChevronRight, ClipboardList, LockKeyhole } from 'lucide-react';
import { Practice, ProgressWallStageId } from '../types';
import { emptyProgressWallState, loadProgressWallState, saveProgressWallState } from '../services/sessionStorage';

const colors: Record<ProgressWallStageId, string> = {
  problem: 'border-rose-400/60 text-rose-200 bg-rose-950/50',
  idea: 'border-amber-400/60 text-amber-200 bg-amber-950/50',
  design: 'border-sky-400/60 text-sky-200 bg-sky-950/50',
  prototype: 'border-violet-400/60 text-violet-200 bg-violet-950/50',
  error: 'border-orange-400/60 text-orange-200 bg-orange-950/50',
  redesign: 'border-emerald-400/60 text-emerald-200 bg-emerald-950/50'
};

export const ProgressWall: React.FC<{ practice: Practice }> = ({ practice }) => {
  const stages = useMemo(() => practice.progressWallStages || [], [practice.progressWallStages]);
  const [state, setState] = useState(() => stages.length ? loadProgressWallState(practice.id) : emptyProgressWallState());

  useEffect(() => setState(stages.length ? loadProgressWallState(practice.id) : emptyProgressWallState()), [practice.id, stages.length]);
  useEffect(() => { if (stages.length) saveProgressWallState(practice.id, state); }, [practice.id, stages.length, state]);

  if (!stages.length) return null;
  const currentIndex = Math.max(0, stages.findIndex(stage => stage.id === state.currentStageId));
  const current = stages[currentIndex];
  const isComplete = state.completedStageIds.includes(current.id);

  const selectStage = (id: ProgressWallStageId, index: number) => {
    if (index <= currentIndex || state.completedStageIds.includes(id)) setState(previous => ({ ...previous, currentStageId: id }));
  };

  const completeAndContinue = () => {
    const completedStageIds = state.completedStageIds.includes(current.id) ? state.completedStageIds : [...state.completedStageIds, current.id];
    const next = stages[Math.min(currentIndex + 1, stages.length - 1)];
    setState(previous => ({ ...previous, completedStageIds, currentStageId: next.id }));
  };

  return (
    <section id="muro-del-progreso" className="rounded-3xl bg-slate-950 border border-slate-700 overflow-hidden shadow-xl">
      <header className="p-5 sm:p-6 border-b border-slate-800">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tu proceso de creación</span>
            <h2 className="text-xl sm:text-2xl font-black text-white">Muro del Progreso</h2>
            <p className="mt-1 text-sm text-slate-400">Piensa, construye, prueba y mejora. Tus respuestas son privadas y duran sólo esta sesión.</p>
          </div>
          <span className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 px-3 py-2 rounded-xl border border-slate-700">
            <LockKeyhole className="w-4 h-4 text-emerald-400" /> Guardado privado
          </span>
        </div>

        <div data-progress-wall-indicator className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {stages.map((stage, index) => {
            const completed = state.completedStageIds.includes(stage.id);
            const active = stage.id === current.id;
            const enabled = index <= currentIndex || completed;
            return (
              <button key={stage.id} type="button" onClick={() => selectStage(stage.id, index)} disabled={!enabled}
                className={`min-h-16 px-3 py-2 rounded-2xl border text-left transition ${colors[stage.id]} ${active ? 'ring-2 ring-white/80 scale-[1.02]' : ''} ${enabled ? 'hover:brightness-125' : 'opacity-45 cursor-not-allowed'}`}
                aria-current={active ? 'step' : undefined}>
                <span className="flex items-center gap-1 text-[10px] font-bold opacity-80">ETAPA {index + 1} {completed && <Check className="w-3 h-3" />}</span>
                <span className="block mt-1 text-xs sm:text-sm font-black">{stage.title}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="p-5 sm:p-7 space-y-5">
        <div>
          <span className={`inline-block px-3 py-1 rounded-full border text-xs font-black ${colors[current.id]}`}>{current.title}</span>
          <h3 className="mt-3 text-xl font-black text-white">{current.guidingQuestion}</h3>
        </div>

        {current.instructions.length > 0 && (
          <ul className="grid gap-2 text-sm text-slate-300">
            {current.instructions.map(instruction => <li key={instruction} className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" /><span>{instruction}</span></li>)}
          </ul>
        )}

        {current.relatedStepNumbers.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-xs font-bold text-slate-400 uppercase">Pasos técnicos relacionados</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {current.relatedStepNumbers.map(number => <a key={number} href={`#step-pill-${number}`} className="px-3 py-1.5 rounded-xl bg-slate-800 text-emerald-300 text-xs font-bold hover:bg-slate-700">Paso {number}</a>)}
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {(current.responseFields || []).map(field => (
            <label key={field.id} className="text-sm font-bold text-slate-200">
              {field.prompt}
              <textarea rows={field.multiline ? 3 : 1} value={state.responses[`${current.id}:${field.id}`] || ''}
                onChange={event => setState(previous => ({ ...previous, responses: { ...previous.responses, [`${current.id}:${field.id}`]: event.target.value } }))}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 text-sm font-normal text-white outline-none focus:border-emerald-400 resize-y"
                placeholder="Escribe con tus propias palabras…" />
            </label>
          ))}
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={completeAndContinue} className="px-5 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm flex items-center gap-2">
            {isComplete ? 'Continuar' : 'Marcar etapa como terminada'} <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {state.completedStageIds.length > 0 && (
          <details className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <summary className="cursor-pointer font-bold text-white flex items-center gap-2"><ClipboardList className="w-4 h-4 text-emerald-400" /> Resumen privado del Muro del Progreso</summary>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {stages.map(stage => <div key={stage.id} className="rounded-xl bg-slate-950 p-3"><h4 className="text-xs font-black text-emerald-300">{stage.title}</h4><p className="mt-1 text-xs text-slate-300 whitespace-pre-wrap">{(stage.responseFields || []).map(field => state.responses[`${stage.id}:${field.id}`]).filter(Boolean).join('\n\n') || 'Sin respuesta todavía.'}</p></div>)}
            </div>
            <p className="mt-3 text-xs text-slate-500">Este resumen no se incluye automáticamente en la entrega al docente.</p>
          </details>
        )}
      </div>
    </section>
  );
};

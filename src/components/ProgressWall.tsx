import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Check, LockKeyhole } from 'lucide-react';
import { Practice, ProgressWallStage, ProgressWallStageId } from '../types';
import { emptyProgressWallState, loadProgressWallState, ProgressWallSessionState, saveProgressWallState } from '../services/sessionStorage';

const colors: Record<ProgressWallStageId, string> = {
  problem: 'border-rose-400/60 text-rose-200 bg-rose-950/50', idea: 'border-amber-400/60 text-amber-200 bg-amber-950/50',
  design: 'border-sky-400/60 text-sky-200 bg-sky-950/50', prototype: 'border-violet-400/60 text-violet-200 bg-violet-950/50',
  error: 'border-orange-400/60 text-orange-200 bg-orange-950/50', redesign: 'border-emerald-400/60 text-emerald-200 bg-emerald-950/50'
};
type WallContextValue = { practice: Practice; stages: ProgressWallStage[]; state: ProgressWallSessionState; completed: ProgressWallStageId[]; setCurrent: (id: ProgressWallStageId) => void; setResponse: (stageId: ProgressWallStageId, fieldId: string, value: string) => void };
const WallContext = createContext<WallContextValue | null>(null);
const useWall = () => { const value = useContext(WallContext); if (!value) throw new Error('Progress Wall components require ProgressWallProvider'); return value; };
const hasText = (value?: string) => Boolean(value?.trim());
export const isProgressStageComplete = (stage: ProgressWallStage, responses: Record<string, string>, completedSteps: number[]) => {
  const answer = (fieldId: string) => responses[`${stage.id}:${fieldId}`];
  if (stage.id === 'problem') return hasText(answer('problem'));
  if (stage.id === 'idea') return hasText(answer('selected_idea'));
  if (stage.id === 'design') return hasText(answer('design'));
  if (stage.id === 'prototype') return stage.relatedStepNumbers.length > 0 ? stage.relatedStepNumbers.every(number => completedSteps.includes(number)) : hasText(answer('prototype'));
  if (stage.id === 'error') return answer('outcome') === 'found'
    ? hasText(answer('unexpected')) && hasText(answer('step')) && hasText(answer('expected')) && hasText(answer('actual')) && hasText(answer('cause'))
    : answer('outcome') === 'worked' && hasText(answer('test_method')) && hasText(answer('expected')) && hasText(answer('actual')) && hasText(answer('evidence'));
  return answer('redesign_choice') === 'correction'
    ? hasText(answer('correction')) && hasText(answer('new_test')) && hasText(answer('result'))
    : answer('redesign_choice') === 'improvement'
      ? hasText(answer('improvement')) && hasText(answer('new_test')) && hasText(answer('result'))
      : answer('redesign_choice') === 'none' && hasText(answer('conclusion')) && hasText(answer('future_improvement'));
};

export const ProgressWallProvider: React.FC<{ practice: Practice; completedSteps: number[]; onProgressChange?: (completed: ProgressWallStageId[], responses: Record<string, string>) => void; children: React.ReactNode }> = ({ practice, completedSteps, onProgressChange, children }) => {
  const stages = useMemo(() => practice.progressWallStages || [], [practice.progressWallStages]);
  const [state, setState] = useState(() => stages.length ? loadProgressWallState(practice.id) : emptyProgressWallState());
  useEffect(() => setState(stages.length ? loadProgressWallState(practice.id) : emptyProgressWallState()), [practice.id, stages.length]);
  const completed = useMemo(() => stages.filter(stage => isProgressStageComplete(stage, state.responses, completedSteps)).map(stage => stage.id), [completedSteps, stages, state.responses]);
  useEffect(() => { if (stages.length) saveProgressWallState(practice.id, { ...state, completedStageIds: completed }); }, [completed, practice.id, stages.length, state]);
  useEffect(() => { onProgressChange?.(completed, state.responses); }, [completed, onProgressChange, state.responses]);
  const value: WallContextValue = { practice, stages, state, completed, setCurrent: id => setState(previous => ({ ...previous, currentStageId: id })), setResponse: (stageId, fieldId, response) => setState(previous => ({ ...previous, responses: { ...previous.responses, [`${stageId}:${fieldId}`]: response } })) };
  return <WallContext.Provider value={value}>{children}</WallContext.Provider>;
};

export const ProgressWallIndicator: React.FC = () => {
  const { stages, state, completed, setCurrent } = useWall();
  if (!stages.length) return null;
  const goTo = (id: ProgressWallStageId) => { setCurrent(id); window.requestAnimationFrame(() => document.getElementById(`muro-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })); };
  return <nav aria-label="Muro del Progreso" className="sticky top-20 z-30 rounded-2xl bg-slate-950/95 border border-slate-700 p-3 shadow-xl backdrop-blur">
    <div className="flex items-center justify-between gap-3 mb-2 px-1"><strong className="text-xs text-white">Muro del Progreso</strong><span className="flex items-center gap-1 text-[10px] text-slate-400"><LockKeyhole className="w-3 h-3" /> Privado durante esta sesión</span></div>
    <div data-progress-wall-indicator className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">{stages.map((stage, index) => { const done = completed.includes(stage.id); const active = state.currentStageId === stage.id; return <button key={stage.id} type="button" onClick={() => goTo(stage.id)} aria-current={active ? 'step' : undefined} className={`min-h-11 px-2 py-1.5 rounded-xl border text-left transition ${colors[stage.id]} ${active ? 'ring-2 ring-white/80' : 'hover:brightness-125'}`}><span className="flex items-center gap-1 text-[9px] opacity-75">{index + 1} {done && <Check className="w-3 h-3" />}</span><span className="block text-[11px] sm:text-xs font-black">{stage.title}</span></button>; })}</div>
  </nav>;
};

export const ProgressWallStageSection: React.FC<{ stageId: ProgressWallStageId; children?: React.ReactNode }> = ({ stageId, children }) => {
  const { stages, state, completed, setCurrent, setResponse } = useWall();
  const stage = stages.find(item => item.id === stageId);
  if (!stage) return <>{children}</>;
  const done = completed.includes(stage.id);
  return <section id={`muro-${stage.id}`} data-progress-stage={stage.id} className={`scroll-mt-40 rounded-3xl border p-5 sm:p-6 space-y-5 ${colors[stage.id]}`} onFocus={() => setCurrent(stage.id)}>
    <header className="flex items-start justify-between gap-3"><div><span className="text-[10px] font-black tracking-wider">MURO DEL PROGRESO · {stage.title}</span><h2 className="mt-1 text-lg sm:text-xl font-black text-white">{stage.guidingQuestion}</h2></div><span className="shrink-0 rounded-full border border-current/40 px-2 py-1 text-[10px] font-bold">{done ? '✓ Evidencia registrada' : 'En proceso'}</span></header>
    {stage.instructions.length > 0 && stage.id !== 'prototype' && <ul className="grid gap-1.5 text-sm text-slate-200">{stage.instructions.map(text => <li key={text}>• {text}</li>)}</ul>}
    {children}
    {stage.id === 'error' && <ChoiceFields title="Selecciona el resultado de tu prueba" value={state.responses['error:outcome'] || ''} options={[['found', 'Encontré un error'], ['worked', 'Todo funcionó correctamente']]} onChange={value => setResponse('error', 'outcome', value)} />}
    {stage.id === 'redesign' && <ChoiceFields title="Selecciona qué ocurrió después de probar" value={state.responses['redesign:redesign_choice'] || ''} options={[['correction', 'Realicé una corrección'], ['improvement', 'Agregué una mejora'], ['none', 'No fue necesario modificarlo']]} onChange={value => setResponse('redesign', 'redesign_choice', value)} />}
    {(stage.responseFields || []).length > 0 && <div className="grid gap-4 rounded-2xl bg-slate-950/55 p-4 border border-white/10">{(stage.responseFields || []).filter(field => isFieldVisible(stage.id, field.id, state.responses)).map(field => <label key={field.id} className="text-sm font-bold text-slate-100">{field.prompt}<textarea rows={field.multiline ? 3 : 1} value={state.responses[`${stage.id}:${field.id}`] || ''} onChange={event => setResponse(stage.id, field.id, event.target.value)} onFocus={() => setCurrent(stage.id)} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 p-3 text-sm font-normal text-white outline-none focus:border-emerald-300 resize-y" placeholder="Escribe con tus propias palabras…" /></label>)}</div>}
    {stage.id === 'prototype' && stage.relatedStepNumbers.length > 0 && <p className="text-xs text-slate-200">El Prototipo se completa automáticamente al terminar sus {stage.relatedStepNumbers.length} pasos técnicos. No puede marcarse manualmente.</p>}
  </section>;
};

const ChoiceFields: React.FC<{ title: string; value: string; options: string[][]; onChange: (value: string) => void }> = ({ title, value, options, onChange }) => <fieldset className="rounded-2xl bg-slate-950/55 p-4 border border-white/10"><legend className="text-sm font-bold text-white">{title}</legend><div className="mt-3 flex flex-wrap gap-3">{options.map(([id, label]) => <label key={id} className="flex items-center gap-2 text-sm text-slate-100"><input type="radio" checked={value === id} onChange={() => onChange(id)} /> {label}</label>)}</div></fieldset>;

const isFieldVisible = (stageId: ProgressWallStageId, fieldId: string, responses: Record<string, string>) => {
  if (stageId === 'error') {
    const outcome = responses['error:outcome'];
    return outcome === 'found' ? ['unexpected', 'step', 'expected', 'actual', 'cause'].includes(fieldId) : outcome === 'worked' ? ['test_method', 'expected', 'actual', 'evidence'].includes(fieldId) : false;
  }
  if (stageId === 'redesign') {
    const choice = responses['redesign:redesign_choice'];
    return choice === 'correction' ? ['correction', 'new_test', 'result'].includes(fieldId) : choice === 'improvement' ? ['improvement', 'new_test', 'result'].includes(fieldId) : choice === 'none' ? ['conclusion', 'future_improvement'].includes(fieldId) : false;
  }
  return true;
};

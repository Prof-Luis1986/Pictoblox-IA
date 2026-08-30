import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, AlertTriangle, Lightbulb, List, Layers, Sparkles, Terminal } from 'lucide-react';
import { PracticeStep } from '../types';
import { BlockDiagram } from './BlockDiagram';

interface StepViewerProps {
  steps: PracticeStep[];
  completedStepNumbers: number[];
  onToggleStep: (stepNumber: number) => void;
}

export const StepViewer: React.FC<StepViewerProps> = ({
  steps,
  completedStepNumbers,
  onToggleStep
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'guided' | 'all'>('guided');
  const stepCardRef = useRef<HTMLDivElement>(null);
  const hasNavigatedRef = useRef(false);

  const currentStep = steps[currentStepIndex];

  const nextStep = () => {
    if (!completedStepNumbers.includes(currentStep.stepNumber)) {
      onToggleStep(currentStep.stepNumber);
    }
    if (currentStepIndex < steps.length - 1) {
      hasNavigatedRef.current = true;
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      hasNavigatedRef.current = true;
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (viewMode === 'guided' && hasNavigatedRef.current) {
      window.requestAnimationFrame(() => {
        stepCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [currentStepIndex, viewMode]);

  return (
    <div id="steps-container" className="my-8 space-y-5">
      {/* Mode Selector and Quick Step Pills Bento Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl cyber-card shadow-xs">
        <div className="flex items-center gap-2 flex-wrap font-mono">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
            // PASOS:
          </span>
          {steps.map((step, idx) => {
            const isCompleted = completedStepNumbers.includes(step.stepNumber);
            const isCurrent = currentStepIndex === idx && viewMode === 'guided';

            return (
              <button
                key={step.stepNumber}
                id={`step-pill-${step.stepNumber}`}
                onClick={() => {
                  hasNavigatedRef.current = true;
                  setCurrentStepIndex(idx);
                  setViewMode('guided');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition border ${
                  isCurrent
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : isCompleted
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
                title={`Paso ${step.stepNumber}: ${step.title}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Circle className="w-3.5 h-3.5 opacity-40" />
                )}
                <span>PASO {step.stepNumber}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800 shrink-0 font-mono">
          <button
            id="btn-mode-guided"
            onClick={() => setViewMode('guided')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition ${
              viewMode === 'guided'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>MODO GUIADO</span>
          </button>

          <button
            id="btn-mode-all"
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition ${
              viewMode === 'all'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>VER TODOS</span>
          </button>
        </div>
      </div>

      {/* RENDER GUIDED MODE */}
      {viewMode === 'guided' && currentStep && (
        <div
          ref={stepCardRef}
          id={`guided-step-${currentStep.stepNumber}`}
          className="p-6 sm:p-8 rounded-3xl cyber-card space-y-6 animate-fade-in scroll-mt-28"
        >
          <div className="rounded-2xl bg-emerald-950/70 border border-emerald-500/40 p-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-lg sm:text-xl font-black text-white">Paso {currentStepIndex + 1} de {steps.length}</span>
              <span className="text-sm font-bold text-emerald-300">{Math.round(((currentStepIndex + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800" aria-label={`Progreso: paso ${currentStepIndex + 1} de ${steps.length}`}>
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300" style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
          {/* Step Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4 font-mono">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-bold border border-emerald-500/40">
                PASO {currentStep.stepNumber} DE {steps.length}
                </span>
                {currentStep.targetSprite && (
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
                    SPRITE: {currentStep.targetSprite}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
                {currentStep.title}
              </h3>
            </div>

            <button
              id={`btn-toggle-step-${currentStep.stepNumber}`}
              onClick={() => onToggleStep(currentStep.stepNumber)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition ${
                completedStepNumbers.includes(currentStep.stepNumber)
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              {completedStepNumbers.includes(currentStep.stepNumber) ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>[PASO COMPLETADO]</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-500" />
                  <span>MARCAR HECHO</span>
                </>
              )}
            </button>
          </div>

          {/* Step Instructions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              // INSTRUCCIONES DETALLADAS DE ENSAMBLAJE:
            </h4>
            <div className="space-y-2 text-sm text-slate-300 leading-relaxed font-sans">
              {currentStep.instructions.map((inst, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90">
                  <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-mono shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{inst}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Block Diagram & Visualizer */}
          <BlockDiagram
            stepNumber={currentStep.stepNumber}
            title={currentStep.title}
            imageSrc={currentStep.blockImage}
            snippets={currentStep.blockCodeSnippets}
            blockExplanation={currentStep.blockExplanation}
            tip={currentStep.tip}
          />

          {/* Warnings & Callouts */}
          {currentStep.warning && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-400 font-mono block mb-0.5">// ADVERTENCIA DEL SISTEMA:</span>
                <span className="font-sans">{currentStep.warning}</span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-5 mt-6 font-mono">
            <button
              id="btn-prev-step"
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-800 text-slate-300 text-xs sm:text-sm font-semibold rounded-2xl flex items-center gap-2 transition"
            >
              <ChevronLeft className="w-4 h-4" /> ANTERIOR
            </button>

            <span className="text-xs text-slate-500 font-mono">
              PASO {currentStepIndex + 1} / {steps.length}
            </span>

            <button
              id="btn-next-step"
              onClick={nextStep}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold rounded-2xl flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition"
            >
              {currentStepIndex === steps.length - 1 ? 'TERMINAR GUÍA' : `LISTO, IR AL PASO ${currentStepIndex + 2}`} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* RENDER ALL STEPS MODE */}
      {viewMode === 'all' && (
        <div className="space-y-6">
          {steps.map(step => {
            const isCompleted = completedStepNumbers.includes(step.stepNumber);

            return (
              <div
                key={step.stepNumber}
                id={`all-step-${step.stepNumber}`}
                className="p-6 sm:p-7 rounded-3xl cyber-card space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      PASO {step.stepNumber}
                    </span>
                    <h3 className="text-base font-bold text-white font-sans">
                      {step.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => onToggleStep(step.stepNumber)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                      isCompleted
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>[HECHO]</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>MARCAR HECHO</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 font-sans">
                  {step.instructions.map((inst, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">›</span>
                      <span>{inst}</span>
                    </p>
                  ))}
                </div>

                <BlockDiagram
                  stepNumber={step.stepNumber}
                  title={step.title}
                  imageSrc={step.blockImage}
                  snippets={step.blockCodeSnippets}
                  blockExplanation={step.blockExplanation}
                  tip={step.tip}
                />

                {step.warning && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{step.warning}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

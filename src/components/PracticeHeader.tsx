import React from 'react';
import { Shield, Layers, Camera, Sparkles, CheckCircle2, ChevronRight, Send, Mail, Rocket, Award, Clock } from 'lucide-react';
import { Practice } from '../types';

interface PracticeHeaderProps {
  practice: Practice;
  courseTitle: string;
  isCompleted: boolean;
  onToggleCompleted: () => void;
  onOpenSubmitModal?: () => void;
  lastSubmittedAt?: string;
}

export const PracticeHeader: React.FC<PracticeHeaderProps> = ({
  practice,
  courseTitle,
  isCompleted,
  onToggleCompleted,
  onOpenSubmitModal,
  lastSubmittedAt
}) => {
  const isModule1 = practice.courseId === 'aprende-ia-jugando';
  const hasExtensions = practice.pictobloxExtensions && practice.pictobloxExtensions.length > 0;

  return (
    <div id="practice-header" className="space-y-4">
      {/* Friendly Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-400 flex-wrap">
        <a href="#/" className="hover:text-emerald-400 transition">🏠 Inicio</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <a href={`#/curso/${practice.courseId}`} className="hover:text-emerald-400 transition">{courseTitle}</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-emerald-300 font-bold">{practice.practiceNumber}: {practice.title}</span>
      </nav>

      {/* Main Title Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className={`px-3 py-1 font-black rounded-full text-xs ${
                isModule1 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}>
                {practice.practiceNumber}
              </span>
              <span className="px-3 py-1 bg-slate-800 text-slate-200 font-semibold rounded-full border border-slate-700 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {practice.estimatedDurationMinutes} min
              </span>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-full border border-amber-500/40 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-400" />
                {practice.badgeAwarded}
              </span>
              {lastSubmittedAt && (
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-full border border-emerald-500/40 flex items-center gap-1.5 animate-pulse">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  ¡Entregado a tus maestros!
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-sans">
              {practice.title}
            </h1>

            {practice.challengeTitle && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-bold">
                <span>🎯 Reto:</span>
                <span>{practice.challengeTitle}</span>
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {practice.description}
            </p>
          </div>

          {/* Action buttons for Student - Big & Kid-Friendly */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            {onOpenSubmitModal && (
              <button
                id="btn-open-submit-modal"
                onClick={onOpenSubmitModal}
                className="px-6 py-4 rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:scale-105 active:scale-95 transition-all ring-4 ring-emerald-500/30"
              >
                <Rocket className="w-5 h-5 animate-bounce" />
                <span>🚀 ENVIAR TAREA AL MAESTRO</span>
              </button>
            )}

            <button
              id="btn-toggle-complete-practice"
              onClick={onToggleCompleted}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
                isCompleted
                  ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isCompleted ? '⭐ ¡Actividad Completada!' : 'Marcar como completada'}</span>
            </button>
          </div>
        </div>

        {/* Requirements & Objectives */}
        <div className={`mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 ${hasExtensions ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'} gap-4 text-xs font-sans`}>
          {/* Objectives */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
              <Sparkles className="w-4 h-4 text-emerald-400" /> ¿Qué vamos a aprender hoy?:
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {practice.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Extensions (only if used in this practice) */}
          {hasExtensions && (
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-bold text-teal-400 flex items-center gap-1.5 text-xs">
                <Layers className="w-4 h-4 text-teal-400" /> Bloques especiales a usar:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {practice.pictobloxExtensions.map((ext, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-900 border border-teal-500/40 text-teal-300 rounded-xl text-xs font-bold shadow-xs"
                  >
                    🧩 {ext}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                💡 Actívalos con el botón (+) en la esquina inferior de PictoBlox.
              </p>
            </div>
          )}

          {/* Privacy & Materials */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <div>
              <span className="font-bold text-amber-400 flex items-center gap-1.5 mb-1 text-xs">
                <Camera className="w-4 h-4 text-amber-400" /> Materiales necesarios:
              </span>
              <p className="text-slate-300">{practice.requiredMaterials.join(', ')}</p>
            </div>

            <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-1.5 border-t border-slate-800">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Seguro para niños: La cámara procesa todo en tu computadora.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

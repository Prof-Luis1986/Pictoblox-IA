import React, { useState } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { ALL_PRACTICES } from '../data/allPractices';
import { StudentProgress, Course } from '../types';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronRight,
  Award,
  Sparkles,
  Layers,
  Download,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Terminal,
  Cpu,
  Eye,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CoursePageProps {
  courseId: string;
  progress: StudentProgress;
}

export const CoursePage: React.FC<CoursePageProps> = ({ courseId, progress }) => {
  const course = COURSES_DATA.find(c => c.id === courseId) || COURSES_DATA[0];
  const practices = ALL_PRACTICES.filter(p => p.courseId === course.id);
  const completedPracticeIds = Object.keys(progress.completedPractices);

  const completedCount = practices.filter(p => completedPracticeIds.includes(p.id)).length;
  const isCourseFinished = completedCount === practices.length && practices.length > 0;
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [course.sections[0]?.id || '']: true
  });

  const toggleSection = (secId: string) => {
    setExpandedSections(prev => ({ ...prev, [secId]: !prev[secId] }));
  };

  const handleCelebrateCertificate = () => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  const isModule1 = course.id === 'aprende-ia-jugando';

  return (
    <div className="space-y-8 py-8 animate-fade-in text-slate-200">
      {/* Back button */}
      <div>
        <a
          href="#/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> // VOLVER AL PANEL PRINCIPAL
        </a>
      </div>

      {/* Course Banner Cyber Bento Card */}
      <div className={`p-8 sm:p-10 rounded-3xl bg-slate-950 border ${isModule1 ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]'} relative overflow-hidden`}>
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2.5 flex-wrap font-mono">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isModule1 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/40'}`}>
              {course.edition} • {practices.length} PRÁCTICAS ACTIVAS
            </span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-400">
              STATUS: ONLINE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
            {course.title}
          </h1>

          <p className="text-xs sm:text-sm font-mono text-emerald-400">
            {course.subtitle}
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            {course.description}
          </p>

          {/* Progress Tracker HUD */}
          <div className="pt-4 max-w-md space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Progreso del Módulo:</span>
              <span className="font-bold text-white">
                {completedCount} de {practices.length} prácticas ({Math.round((completedCount / practices.length) * 100)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                style={{ width: `${(completedCount / practices.length) * 100}%` }}
                className={`h-full rounded-full transition-all duration-500 shadow-sm ${isModule1 ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]'}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CERTIFICATE BANNER IF COMPLETED */}
      {isCourseFinished && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center text-3xl shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              🎓
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">// CERTIFICACIÓN DESBLOQUEADA</span>
              <h3 className="text-xl font-black text-white font-sans">
                Has completado el 100% de {course.title}
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Has dominado todos los algoritmos, bloques y experimentos de este módulo interactivo.
              </p>
            </div>
          </div>

          <button
            onClick={handleCelebrateCertificate}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs sm:text-sm rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2 shrink-0 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>¡CELEBRAR LOGRO!</span>
          </button>
        </div>
      )}

      {/* SECTIONS & PRACTICES BREAKDOWN */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white font-mono flex items-center gap-2">
          <span className="text-emerald-400">//</span> ARQUITECTURA TEMÁTICA Y PRÁCTICAS
        </h2>

        <div className="space-y-6">
          {course.sections.map(section => {
            const isExpanded = !!expandedSections[section.id];
            const sectionPractices = practices.filter(p => section.practices.includes(p.id));

            return (
              <div
                key={section.id}
                id={`section-container-${section.id}`}
                className="rounded-3xl cyber-card overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
                >
                  <div className="space-y-1 pr-4">
                    <span className={`text-xs font-mono font-bold ${isModule1 ? 'text-emerald-400' : 'text-cyan-400'}`}>
                      FASE 0{section.sectionNumber} // SISTEMA
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
                      {section.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-1 font-sans">
                      {section.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                      {sectionPractices.length} {sectionPractices.length === 1 ? 'práctica' : 'prácticas'}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-400" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {/* Section Content & Concepts */}
                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-slate-800/80 space-y-6 animate-fade-in">
                    {/* Theoretical Concepts */}
                    {section.concepts && section.concepts.length > 0 && (
                      <div className="space-y-4 pt-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono block">
                          // FUNDAMENTOS TÉCNICOS:
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {section.concepts.map((concept, cIdx) => (
                            <div
                              key={cIdx}
                              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3"
                            >
                              <h4 className="text-sm font-bold text-emerald-300 font-mono flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-emerald-400" />
                                <span>{concept.title}</span>
                              </h4>

                              <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed font-sans">
                                {concept.content.map((para, pIdx) => (
                                  <p key={pIdx}>{para}</p>
                                ))}
                              </div>

                              {concept.keyPoints && (
                                <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/20 space-y-1 text-xs text-slate-300 font-mono">
                                  <span className="font-bold text-emerald-400 block text-[11px]">// Protocolos clave:</span>
                                  {concept.keyPoints.map((kp, kIdx) => (
                                    <div key={kIdx} className="text-[11px] text-slate-400">
                                      {kp}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Practices list */}
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono block">
                        // PRÁCTICAS DE ESTA FASE:
                      </span>

                      <div className="space-y-3">
                        {sectionPractices.map(practice => {
                          const isDone = completedPracticeIds.includes(practice.id);

                          return (
                            <a
                              key={practice.id}
                              href={`#/practica/${practice.id}`}
                              className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800/90 hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group transition"
                            >
                              <div className="flex items-start gap-3.5">
                                <div className="mt-0.5">
                                  {isDone ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition" />
                                  )}
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap font-mono">
                                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                                      isModule1 ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                                    }`}>
                                      {practice.practiceNumber}
                                    </span>
                                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition font-sans">
                                      {practice.title}
                                    </h4>
                                  </div>
                                  <p className="text-xs text-slate-400 line-clamp-1 font-sans">
                                    {practice.description}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center font-mono">
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" /> {practice.estimatedDurationMinutes} min
                                </span>
                                <span className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                                  isDone
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-slate-900 group-hover:bg-emerald-500 text-slate-300 group-hover:text-slate-950 border border-slate-800 group-hover:border-emerald-500'
                                }`}>
                                  <span>{isDone ? 'REPASAR' : 'INICIAR'}</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
